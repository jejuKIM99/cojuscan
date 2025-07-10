// main.js
const { app, BrowserWindow, ipcMain, dialog, net, shell } = require('electron');
const path =require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const { spawn } = require('child_process');
const { URL } = require('url');
const Store = require('electron-store');
const { scanContent, vulnerabilityPatterns } = require('./scanner.js');
const os = require('os');
const crypto = require('crypto');

const gotTheLock = app.requestSingleInstanceLock();
let mainWindow;

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
    const url = commandLine.pop();
    if (url && url.startsWith('cojuscan://')) {
        app.emit('open-url', event, url);
    }
  });
}

const store = new Store();

// 이 Client ID는 프록시 서버의 환경 변수에 설정되므로, 여기서도 일치시켜주는 것이 좋습니다.
process.env.GITHUB_CLIENT_ID = 'Ov23lioAXZ3X5DQKfu2i';
const GITHUB_REDIRECT_URI = 'cojuscan://auth/callback';

const IS_WINDOWS = process.platform === 'win32';
const isPackaged = app.isPackaged;
const RESOURCES_PATH = isPackaged ? process.resourcesPath : __dirname;
const LOCAL_PYTHON_DIR = path.join(RESOURCES_PATH, '.py-semgrep');
const LOCAL_SEMGREP_EXE = path.join(LOCAL_PYTHON_DIR, 'Scripts', 'semgrep.exe');

if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient('cojuscan', process.execPath, [path.resolve(process.argv[1])]);
    }
} else {
    app.setAsDefaultProtocolClient('cojuscan');
}

const codeExtensions = new Set([
    '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.vue', '.svelte', '.py', '.pyw',
    '.java', '.class', '.jar', '.kt', '.kts', '.scala', '.groovy', '.c', '.cpp', '.h', '.hpp',
    '.cs', '.dll', '.vb', '.php', '.phtml', '.html', '.htm', '.xhtml', '.css', '.scss', 
    '.less', '.sass', '.go', '.rs', '.swift', '.m', '.mm', '.rb', '.rbw', '.pl', '.pm', 
    '.sh', '.bash', '.zsh', '.ps1', '.psm1', '.lua', '.dart', '.json', '.yml', '.yaml', 
    '.xml', '.toml', '.ini', '.cfg', '.conf', '.env', 'dockerfile', 'jenkinsfile', 
    '.tf', '.hcl', '.graphql', '.gql', '.sql', '.ddl', '.erl', '.hrl', '.ex', '.exs', 
    '.elm', '.zig', '.nim', '.cr', '.md', '.markdown'
]);

function readDirectoryStructure(dir, rootDir = dir) {
    const results = [];
    try {
        const list = fs.readdirSync(dir);
        for (const file of list) {
            const absolutePath = path.join(dir, file);
            const relativePath = path.relative(rootDir, absolutePath);
            if (['node_modules', '.git', '.vscode', 'dist', 'build', '.next', '.idea', '.venv', '__pycache__', '.py-semgrep'].includes(file)) continue;

            const stat = fs.statSync(absolutePath);
            if (stat && stat.isDirectory()) {
                results.push({ name: file, type: 'directory', path: relativePath, children: readDirectoryStructure(absolutePath, rootDir) });
            } else {
                if (codeExtensions.has(path.extname(file).toLowerCase()) || codeExtensions.has(file.toLowerCase())) {
                    results.push({ name: file, type: 'file', path: relativePath });
                }
            }
        }
    } catch (error) { console.error(`디렉토리를 읽을 수 없습니다: ${dir}`, error); }
    return results.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'directory' ? -1 : 1;
    });
}

const mapSeverity = (semgrepSeverity) => {
    switch (semgrepSeverity) {
        case 'ERROR': return 'High';
        case 'WARNING': return 'Medium';
        case 'INFO': return 'Low';
        default: return 'Low';
    }
};

function loadIconsAsDataUris() {
    const iconDir = path.join(RESOURCES_PATH, 'build', 'icon');
    const icons = {};
    try {
        const files = fs.readdirSync(iconDir);
        for (const file of files) {
            if (file.endsWith('.svg')) {
                const filePath = path.join(iconDir, file);
                const fileData = fs.readFileSync(filePath, 'utf8');
                const svgDataUri = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(fileData)}`;
                icons[file] = svgDataUri;
            }
        }
    } catch (error) {
        console.error('아이콘을 로드할 수 없습니다:', error);
    }
    return icons;
}

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 940,
        minHeight: 560,
        frame: false,
        titleBarStyle: 'hidden',
        backgroundColor: '#0a0a0a',
        icon: path.join(__dirname, 'build', 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        show: false,
    });
  
    mainWindow.once('ready-to-show', () => mainWindow.show());

    ipcMain.on('minimize-window', () => mainWindow.minimize());
    ipcMain.on('maximize-window', () => {
        if (mainWindow.isMaximized()) mainWindow.unmaximize();
        else mainWindow.maximize();
    });
    ipcMain.on('close-window', () => mainWindow.close());
    mainWindow.on('maximize', () => mainWindow.webContents.send('window-maximized'));
    mainWindow.on('unmaximize', () => mainWindow.webContents.send('window-unmaximized'));

    let githubAccessToken = null;
    
    // =================================================================
    // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ 수정된 부분 시작 ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
    // =================================================================
    let isAuthInProgress = false; // 인증 진행 상태를 추적하는 잠금 변수

    function base64URLEncode(str) {
        return str.toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }
    function sha256(buffer) {
        return crypto.createHash('sha256').update(buffer).digest();
    }

    ipcMain.handle('github:auth:start', async () => {
        // 이미 인증이 진행 중이면 새로 시작하지 않음
        if (isAuthInProgress) {
            console.log('An authentication process is already in progress.');
            throw new Error('인증이 이미 진행중입니다.');
        }
        isAuthInProgress = true; // 인증 시작, 잠금 설정

        // 이 변수들은 이제 이 함수의 지역 변수가 되어 다른 호출에 의해 덮어써지지 않습니다.
        const githubAuthState = base64URLEncode(crypto.randomBytes(16));
        const rawVerifier = crypto.randomBytes(32);
        const codeVerifier = base64URLEncode(rawVerifier);
        const challengeBuffer = sha256(codeVerifier);
        const codeChallenge = base64URLEncode(challengeBuffer);
        
        const authUrl = new URL('https://github.com/login/oauth/authorize');
        authUrl.searchParams.append('client_id', process.env.GITHUB_CLIENT_ID);
        authUrl.searchParams.append('redirect_uri', GITHUB_REDIRECT_URI);
        authUrl.searchParams.append('scope', 'repo,user');
        authUrl.searchParams.append('state', githubAuthState);
        authUrl.searchParams.append('code_challenge', codeChallenge);
        authUrl.searchParams.append('code_challenge_method', 'S256');

        await shell.openExternal(authUrl.toString());

        return new Promise((resolve, reject) => {
            const handleAuthCallback = async (event, url) => {
                // 이 콜백 핸들러는 한 번만 실행되어야 합니다.
                app.removeListener('open-url', handleAuthCallback);
                
                const raw_code = /code=([^&]*)/.exec(url) || null;
                const code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
                const returnedState = /state=([^&]*)/.exec(url) || null;
                const state = (returnedState && returnedState.length > 1) ? returnedState[1] : null;

                if (code && state === githubAuthState) {
                    try {
                        const proxyUrl = 'https://cojuscanproxy.vercel.app/api/auth';
                        const tokenResponse = await net.fetch(proxyUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ code, code_verifier: codeVerifier }),
                        });
                        const tokenData = await tokenResponse.json();
                        githubAccessToken = tokenData.access_token;

                        if (githubAccessToken) {
                           store.set('githubAccessToken', githubAccessToken);
                           resolve({ success: true });
                        } else {
                           reject(new Error(tokenData.error || 'Failed to get access token from proxy.'));
                        }
                    } catch (error) {
                        reject(error);
                    } finally {
                        isAuthInProgress = false; // 인증 종료, 잠금 해제
                    }
                } else {
                    reject(new Error('GitHub auth state mismatch or no code found.'));
                    isAuthInProgress = false; // 인증 실패, 잠금 해제
                }
            };

            // 이 리스너는 현재 인증 흐름에 대해서만 동작합니다.
            app.on('open-url', handleAuthCallback);

            // 타임아웃 처리: 5분 내에 인증이 완료되지 않으면 실패 처리
            setTimeout(() => {
                app.removeListener('open-url', handleAuthCallback);
                if (isAuthInProgress) { // 아직도 인증이 진행 중이라면 타임아웃 처리
                    reject(new Error('GitHub authentication timed out.'));
                    isAuthInProgress = false; // 타임아웃, 잠금 해제
                }
            }, 300000); 
        });
    });
    // =================================================================
    // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ 수정된 부분 끝 ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
    // =================================================================
    
    ipcMain.handle('github:user:get', async () => {
        if (!githubAccessToken) {
            githubAccessToken = store.get('githubAccessToken');
            if(!githubAccessToken) return null;
        }
        try {
            const response = await net.fetch('https://api.github.com/user', {
                headers: { 'Authorization': `token ${githubAccessToken}`, 'Accept': 'application/vnd.github.v3+json' }
            });
            if (!response.ok) throw new Error(`GitHub API Error: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch GitHub user:', error);
            githubAccessToken = null;
            store.delete('githubAccessToken');
            return null;
        }
    });

    ipcMain.handle('github:auth:logout', async () => {
        githubAccessToken = null;
        store.delete('githubAccessToken');
        return { success: true };
    });

    ipcMain.handle('github:repos:get', async () => {
         if (!githubAccessToken) return [];
         try {
            let allRepos = [];
            let page = 1;
            while(true) {
                const response = await net.fetch(`https://api.github.com/user/repos?per_page=100&page=${page}`, {
                     headers: { 'Authorization': `token ${githubAccessToken}` }
                });
                if (!response.ok) throw new Error(`GitHub API Error: ${response.statusText}`);
                const repos = await response.json();
                if (repos.length === 0) break;
                allRepos = allRepos.concat(repos);
                page++;
            }
            return allRepos;
        } catch(e) {
            console.error(e); return [];
        }
    });
    
    ipcMain.handle('github:branches:get', async (event, repoFullName) => {
        if (!githubAccessToken) return [];
        try {
            const response = await net.fetch(`https://api.github.com/repos/${repoFullName}/branches`, {
                headers: { 'Authorization': `token ${githubAccessToken}` }
            });
            if (!response.ok) throw new Error(`GitHub API Error: ${response.statusText}`);
            return await response.json();
        } catch(e) {
            console.error(e); return [];
        }
    });

    ipcMain.handle('github:repo:import', async (event, { repo, branch }) => {
        if (!githubAccessToken) return null;
        const currentWindow = BrowserWindow.fromWebContents(event.sender);
    
        const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cojuscan-'));
        
        try {
            currentWindow.webContents.send('scan:progress', { progress: 10, file: '브랜치 정보 확인 중...' });
            const branchResponse = await net.fetch(`https://api.github.com/repos/${repo.full_name}/branches/${branch.name}`, { headers: { 'Authorization': `token ${githubAccessToken}` } });
            if (!branchResponse.ok) throw new Error('Could not fetch branch info.');
            const branchData = await branchResponse.json();
            const treeSha = branchData.commit.commit.tree.sha;
    
            currentWindow.webContents.send('scan:progress', { progress: 25, file: '파일 목록 가져오는 중...' });
            const treeResponse = await net.fetch(`https://api.github.com/repos/${repo.full_name}/git/trees/${treeSha}?recursive=1`, { headers: { 'Authorization': `token ${githubAccessToken}` } });
            if (!treeResponse.ok) throw new Error('Could not fetch file tree.');
            const treeData = await treeResponse.json();
    
            const filesToDownload = treeData.tree.filter(item => item.type === 'blob');
            const totalFiles = filesToDownload.length;
    
            for (let i = 0; i < totalFiles; i++) {
                const file = filesToDownload[i];
                const progress = 40 + Math.round((i / totalFiles) * 60);
                currentWindow.webContents.send('scan:progress', { progress, file: `다운로드 중: ${file.path}` });
    
                const fileResponse = await net.fetch(file.url, { headers: { 'Authorization': `token ${githubAccessToken}` } });
                if (!fileResponse.ok) continue;
                const blobData = await fileResponse.json();
    
                const content = Buffer.from(blobData.content, blobData.encoding);
                const filePath = path.join(tempDir, file.path);
                fs.mkdirSync(path.dirname(filePath), { recursive: true });
                fs.writeFileSync(filePath, content);
            }

            return { path: tempDir, tree: readDirectoryStructure(tempDir), repoName: repo.full_name };
        } catch (error) {
            console.error('GitHub repo import failed:', error);
            fs.rmSync(tempDir, { recursive: true, force: true });
            throw error;
        }
    });

    ipcMain.handle('scan:start', async (event, scanType, { projectPath, filesToScan }) => {
        const currentWindow = BrowserWindow.fromWebContents(event.sender);
        
        if (scanType === 'simple') {
            const results = {};
            const totalFiles = filesToScan.length;
            for (let i = 0; i < totalFiles; i++) {
                const file = filesToScan[i];
                const filePath = path.join(projectPath, file);
                try {
                    const content = fs.readFileSync(filePath, 'utf-8');
                    const findings = scanContent(content);
                    if (findings.length > 0) results[file] = findings;
                } catch (error) { console.error(`파일 읽기 오류: ${filePath}`, error); }
                const progress = Math.round(((i + 1) / totalFiles) * 100);
                if(currentWindow) currentWindow.webContents.send('scan:progress', { progress, file });
            }
            return results;
        } 
        else if (scanType === 'precision') {
            if (filesToScan.length === 0) return {};
            const command = IS_WINDOWS && fs.existsSync(LOCAL_SEMGREP_EXE) ? LOCAL_SEMGREP_EXE : 'semgrep';
            const rulesMap = new Map(vulnerabilityPatterns.map(p => [p.id, p]));

            return new Promise((resolve, reject) => {
                const fullFilePaths = filesToScan.map(f => path.join(projectPath, f));
                const args = ['scan', '--json', '--config=auto', ...fullFilePaths];
                if(currentWindow) currentWindow.webContents.send('scan:progress', { progress: 10, file: '정밀 분석 엔진 시작 중...' });
                const semgrep = spawn(command, args, { cwd: projectPath });
                
                semgrep.on('error', (err) => {
                    if (err.code === 'ENOENT') {
                        return reject(new Error('SEMGREP_NOT_FOUND'));
                    }
                    return reject(err);
                });

                let jsonData = '';
                let errorData = '';
                semgrep.stdout.on('data', (data) => { jsonData += data.toString(); });
                semgrep.stderr.on('data', (data) => { errorData += data.toString(); });

                semgrep.on('close', (code) => {
                    // Semgrep은 취약점을 찾으면 종료 코드 1을 반환합니다. 코드 1까지는 정상 처리로 간주해야 합니다.
                    if (code > 1) { 
                        console.error(`Semgrep 스캔 프로세스가 코드 ${code}로 종료되었습니다: ${errorData}`);
                        const filteredError = errorData.split('\n').filter(line => 
                            !line.includes('UserWarning: pkg_resources is deprecated') && 
                            !line.includes('(ca-certs): Ignored 1 trust anchors') &&
                            line.trim() !== ''
                        ).join('\n').trim();

                        let finalErrorMessage = `스캔 엔진(Semgrep)이 오류 코드 ${code}로 비정상 종료되었습니다. 로컬 Python 환경이 손상되었을 수 있습니다. 앱을 재설치하거나 수동으로 Semgrep을 설치해보세요.`;
                        if (filteredError) {
                            finalErrorMessage = `스캔 실패. 상세: ${filteredError}`;
                        }
                        
                        return reject(new Error(finalErrorMessage));
                    }

                    if(currentWindow) currentWindow.webContents.send('scan:progress', { progress: 90, file: '결과 분석 중...' });
                    try {
                        if (jsonData.trim() === '') {
                             // 종료 코드가 0 또는 1 이지만 JSON 출력이 없는 경우, 발견된 취약점이 없는 것으로 간주하고 빈 객체를 반환합니다.
                            return resolve({});
                        }
                        const parsedOutput = JSON.parse(jsonData);
                        const results = {};
                        const fileContentsCache = new Map();
                        
                        parsedOutput.results.forEach(finding => {
                            const relativePath = path.relative(projectPath, finding.path);
                            if (!results[relativePath]) results[relativePath] = [];
                            
                            let lines = fileContentsCache.get(finding.path);
                            if (!lines) {
                                try {
                                    lines = fs.readFileSync(finding.path, 'utf-8').split('\n');
                                    fileContentsCache.set(finding.path, lines);
                                } catch (e) {
                                    console.error(`파일을 읽을 수 없습니다 ${finding.path}: ${e}`);
                                    lines = [];
                                }
                            }
                            
                            const lineContent = lines[finding.start.line - 1] || '';
                            
                            let ruleInfo = Array.from(rulesMap.values()).find(p => p.semgrepId === finding.check_id);
                            if (!ruleInfo) {
                                ruleInfo = rulesMap.get(finding.check_id) || 
                                           Array.from(rulesMap.values()).find(p => p.id && finding.check_id.includes(p.id));
                            }

                            const semgrepMeta = finding.extra.metadata || {};

                            results[relativePath].push({
                                id: finding.check_id,
                                line: finding.start.line,
                                code: lineContent.trim(),
                                description: ruleInfo ? ruleInfo.description : finding.extra.message,
                                description_en: ruleInfo ? (ruleInfo.details_en || ruleInfo.description) : finding.extra.message,
                                severity: mapSeverity(finding.extra.severity),
                                name: ruleInfo ? ruleInfo.name : (semgrepMeta.name || finding.check_id),
                                name_en: ruleInfo ? ruleInfo.name_en : (semgrepMeta.name || finding.check_id),
                                category: ruleInfo ? ruleInfo.category : (semgrepMeta.category || 'Unknown'),
                                category_en: ruleInfo ? ruleInfo.category_en : (semgrepMeta.category || 'Unknown'),
                                recommendation_ko: ruleInfo ? ruleInfo.recommendation_ko : (semgrepMeta.recommendation || 'N/A'),
                                recommendation_en: ruleInfo ? ruleInfo.recommendation_en : (semgrepMeta.recommendation || 'N/A'),
                            });
                        });
                        resolve(results);
                    } catch (e) {
                        console.error("Semgrep 스캔 JSON 파싱 실패:", e, `\nJSON Data: ${jsonData}`);
                        reject(new Error('스캔 결과 파싱에 실패했습니다.'));
                    }
                });
            });
        }
    });
    
    ipcMain.handle('url:scan', async (event, { url, verificationToken }) => {
        const currentWindow = BrowserWindow.fromWebContents(event.sender);
        const sendProgress = (progress, text) => {
            if (currentWindow && !currentWindow.isDestroyed()) {
                currentWindow.webContents.send('url-scan:progress', { progress, text });
            }
        };
        const hiddenWin = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: false, contextIsolation: false } });

        try {
            sendProgress(10, `소유권 확인을 위해 페이지 로드 중...`);
            await hiddenWin.loadURL(url);
            const htmlContent = await hiddenWin.webContents.executeJavaScript('document.documentElement.outerHTML');
            
            const verificationTag = `<meta name="cojuscan-verification" content="${verificationToken}">`;
            if (!htmlContent.includes(verificationTag)) {
                throw new Error('VERIFICATION_FAILED');
            }

            sendProgress(30, `cojuscan.js 파일 탐색 중...`);
            const mainUrl = new URL(url);
            const cojuscanUrl = new URL('/cojuscan/cojuscan.js', mainUrl.origin).href;
            
            const cojuscanContent = await new Promise((resolve, reject) => {
                const request = net.request({ url: cojuscanUrl });
                let body = '';
                request.on('response', (response) => {
                    if (response.statusCode >= 400) return reject(new Error(`COJUSCAN_JS_NOT_FOUND`));
                    response.on('data', (chunk) => { body += chunk.toString(); });
                    response.on('end', () => resolve(body));
                    response.on('error', (error) => reject(error));
                });
                request.end();
            });

            sendProgress(50, `분석 대상 파일 목록 파싱 중...`);
            const comprehensiveImportRegex = /import(?:[\s\S]*?from)?\s*['"](.[^'"]+)['"]/g;

            const filePaths = new Set();
            let match;

            while ((match = comprehensiveImportRegex.exec(cojuscanContent)) !== null) {
                filePaths.add(match[1]);
            }

            const fileList = Array.from(filePaths);
            if (fileList.length === 0) {
                 sendProgress(100, '분석할 파일이 없습니다.');
                 return {};
            }

            const results = {};
            const totalFiles = fileList.length;

            for (let i = 0; i < totalFiles; i++) {
                const filePath = fileList[i];
                const progress = 60 + Math.round(((i + 1) / totalFiles) * 40);
                const resultKey = path.basename(filePath);
                sendProgress(progress, `${resultKey} 분석 중...`);

                try {
                    const fileUrl = new URL(filePath, mainUrl.href).href;
                    const fileContent = await new Promise((resolve, reject) => {
                        const request = net.request({ url: fileUrl });
                        let body = '';
                        request.on('response', (response) => {
                             if (response.statusCode >= 400) return reject(new Error(`HTTP ${response.statusCode}`));
                             response.on('data', (chunk) => { body += chunk.toString(); });
                             response.on('end', () => resolve(body));
                             response.on('error', (error) => reject(error));
                        });
                        request.end();
                    });
                    
                    const findings = scanContent(fileContent);
                    if (findings.length > 0) {
                        if (!results[filePath]) results[filePath] = [];
                        results[filePath].push(...findings);
                    }
                } catch(e) {
                    console.error(`'${filePath}' 파일 분석 실패:`, e.message);
                    if (!results[filePath]) results[filePath] = [];
                    results[filePath].push({
                        id: 'fetch-error',
                        name: '파일 로드 실패', name_en: 'File Load Failed',
                        description: `'${filePath}' 파일의 내용을 가져올 수 없습니다. 경로를 확인하세요.`,
                        description_en: `Could not fetch content for '${filePath}'. Check the path.`,
                        severity: 'Low', line: 1, code: e.message
                    });
                }
            }
            sendProgress(100, '분석 완료!');
            return results;
        } catch (error) {
            console.error('URL 스캔 오류:', error);
            throw error;
        } finally {
            if (hiddenWin && !hiddenWin.isDestroyed()) {
                hiddenWin.close();
            }
        }
    });

    ipcMain.handle('theme:export', async (event, themeData) => {
        const { name, theme } = themeData;
        if (!name || !theme) {
            return { success: false, message: '잘못된 테마 데이터입니다.' };
        }
        const { canceled, filePath } = await dialog.showSaveDialog({
            title: '테마 내보내기',
            defaultPath: `Cojuscan-Theme-${name}.json`,
            filters: [{ name: 'JSON 파일', extensions: ['json'] }]
        });
        if (canceled || !filePath) {
            return { success: false, message: '내보내기를 취소했습니다.' };
        }
        try {
            fs.writeFileSync(filePath, JSON.stringify({ name, theme, isShared: true }, null, 2));
            return { success: true };
        } catch (error) {
            console.error('테마 내보내기 실패:', error);
            return { success: false, message: `파일 저장에 실패했습니다: ${error.message}` };
        }
    });
    
    ipcMain.handle('theme:import', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog({
            title: '공유 테마 불러오기',
            properties: ['openFile'],
            filters: [{ name: 'JSON 파일', extensions: ['json'] }]
        });
        if (canceled || filePaths.length === 0) {
            return null;
        }
        try {
            const fileContent = fs.readFileSync(filePaths[0], 'utf-8');
            const themeData = JSON.parse(fileContent);
            if (typeof themeData.name !== 'string' || typeof themeData.theme !== 'object' || themeData.name.trim() === '') {
                throw new Error('잘못된 테마 파일 형식입니다.');
            }
            themeData.isShared = true;
            return themeData;
        } catch (error) {
            console.error('테마 불러오기 실패:', error);
            return null;
        }
    });

    ipcMain.handle('dialog:openDirectory', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] });
        if (canceled || filePaths.length === 0) return null;
        const dirPath = filePaths[0];
        try {
            return { path: dirPath, tree: readDirectoryStructure(dirPath) };
        } catch (error) { console.error('디렉토리 읽기 오류:', error); return null; }
    });
    
    ipcMain.handle('get-app-info', () => {
        return {
            version: app.getVersion(),
            locale: app.getLocale(),
            extensions: Array.from(codeExtensions),
            vulnerabilities: vulnerabilityPatterns.map(v => ({ 
                name: v.name, category: v.category, details: v.details,
                name_en: v.name_en, details_en: v.details_en, category_en: v.category_en,
                recommendation_ko: v.recommendation_ko, recommendation_en: v.recommendation_en
            })),
            icons: loadIconsAsDataUris()
        };
    });

    ipcMain.handle('settings:get', (event, key) => store.get(key));
    ipcMain.handle('settings:set', (event, key, value) => {
        try {
            store.set(key, value);
            return { success: true };
        } catch (error) {
            console.error(`'${key}' 설정 저장 실패:`, error);
            return { success: false, error: error.message };
        }
    });
    
    ipcMain.handle('export:pdf', async (event, data) => {
        const reportWindow = new BrowserWindow({
            width: 800,
            height: 1120,
            show: false, 
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                contextIsolation: true,
                nodeIntegration: false,
            }
        });
        ipcMain.once('report-ready-for-pdf', async () => {
            try {
                const { canceled, filePath } = await dialog.showSaveDialog({
                    title: 'Save Report as PDF',
                    defaultPath: `cojuscan-report-${Date.now()}.pdf`,
                    filters: [{ name: 'PDF Documents', extensions: ['pdf'] }]
                });

                if (!canceled && filePath) {
                    const pdfData = await reportWindow.webContents.printToPDF({
                        marginsType: 0,
                        printBackground: true,
                    });
                    fs.writeFileSync(filePath, pdfData);
                }
            } catch (error) {
                console.error('PDF 저장 실패:', error);
            } finally {
                reportWindow.close();
            }
        });

        await reportWindow.loadFile('report.html');
        
        let logoDataUri = '';
        try {
            const logoPath = path.join(RESOURCES_PATH, 'build', 'icon.ico');
            const logoData = fs.readFileSync(logoPath).toString('base64');
            logoDataUri = `data:image/x-icon;base64,${logoData}`;
        } catch (e) {
            console.error("로고 파일을 읽을 수 없습니다.", e);
        }
        
        const finalData = {...data, logoData: logoDataUri};
        reportWindow.webContents.send('render-report-data', finalData);
    });

    mainWindow.loadFile('index.html');
};

let isQuitting = false;

app.on('before-quit', (event) => {
    if (isQuitting) {
        return;
    }
    event.preventDefault();
    console.log('종료 신호 감지. 렌더러 상태 저장을 시작합니다.');
    const mainWindow = BrowserWindow.getAllWindows()[0];

    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('get-renderer-state');
    }

    ipcMain.once('renderer-state-for-quit', (e, state) => {
        console.log('렌더러로부터 받은 상태:', Object.keys(state));
        try {
            for (const [key, value] of Object.entries(state)) {
                if (value !== undefined) {
                    store.set(key, value);
                }
            }
            console.log('모든 상태를 성공적으로 저장했습니다.');
        } catch (error) {
            console.error('종료 전 상태 저장 실패:', error);
        } finally {
            isQuitting = true;
            app.quit();
        }
    });

    setTimeout(() => {
        if (!isQuitting) {
            console.log('렌더러 응답 시간 초과. 강제 종료합니다.');
            isQuitting = true;
            app.quit();
        }
    }, 5000);
});

app.whenReady().then(createWindow);
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });