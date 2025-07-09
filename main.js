// main.js
const { app, BrowserWindow, ipcMain, dialog, net } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const { spawn } = require('child_process');
const { URL } = require('url');
const Store = require('electron-store');
const { scanContent, vulnerabilityPatterns } = require('./scanner.js');

const store = new Store();

const IS_WINDOWS = process.platform === 'win32';
const isPackaged = app.isPackaged;
const RESOURCES_PATH = isPackaged ? process.resourcesPath : __dirname;
const LOCAL_PYTHON_DIR = path.join(RESOURCES_PATH, '.py-semgrep');
const LOCAL_SEMGREP_EXE = path.join(LOCAL_PYTHON_DIR, 'Scripts', 'semgrep.exe');

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
    const mainWindow = new BrowserWindow({
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
                    if (code > 1) { 
                        console.error(`Semgrep 스캔 프로세스가 코드 ${code}로 종료되었습니다: ${errorData}`);
                        const filteredError = errorData.split('\n').filter(line => 
                            !line.includes('UserWarning: pkg_resources is deprecated') && 
                            !line.includes('(ca-certs): Ignored 1 trust anchors')
                        ).join('\n').trim();
                        const finalErrorMessage = filteredError || `스캔 엔진(Semgrep)이 오류 코드 ${code}로 종료되었습니다.`;
                        return reject(new Error(`스캔 실패. 상세: ${finalErrorMessage}`));
                    }
                    if(currentWindow) currentWindow.webContents.send('scan:progress', { progress: 90, file: '결과 분석 중...' });
                    try {
                        if (jsonData.trim() === '') {
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
    
    // URL Scan Handler based on cojuscan.js
    ipcMain.handle('url:scan', async (event, { url, verificationToken }) => {
        const currentWindow = BrowserWindow.fromWebContents(event.sender);
        const sendProgress = (progress, text) => {
            if (currentWindow && !currentWindow.isDestroyed()) {
                currentWindow.webContents.send('url-scan:progress', { progress, text });
            }
        };

        const hiddenWin = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: false, contextIsolation: false } });

        try {
            // 1. Verify ownership
            sendProgress(10, `소유권 확인을 위해 페이지 로드 중...`);
            await hiddenWin.loadURL(url);
            const htmlContent = await hiddenWin.webContents.executeJavaScript('document.documentElement.outerHTML');
            
            const verificationTag = `<meta name="cojuscan-verification" content="${verificationToken}">`;
            if (!htmlContent.includes(verificationTag)) {
                throw new Error('VERIFICATION_FAILED');
            }

            // 2. Find and fetch cojuscan.js
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

            // 3. Parse imports from cojuscan.js (MODIFIED)
            sendProgress(50, `분석 대상 파일 목록 파싱 중...`);
            const importRegex = /import\s+.*\s+from\s+['"](.+?)['"]/g;
            const dynamicImportRegex = /import\s*\(\s*['"](.+?)['"]\s*\)/g;
            const bareImportRegex = /import\s+['"](.+?)['"];/g; // <<< THIS LINE IS NEW
            
            const filePaths = new Set();
            let match;

            while ((match = importRegex.exec(cojuscanContent)) !== null) filePaths.add(match[1]);
            while ((match = dynamicImportRegex.exec(cojuscanContent)) !== null) filePaths.add(match[1]);
            while ((match = bareImportRegex.exec(cojuscanContent)) !== null) filePaths.add(match[1]); // <<< THIS LINE IS NEW

            const fileList = Array.from(filePaths);
            if (fileList.length === 0) {
                 sendProgress(100, '분석할 파일이 없습니다.');
                 return {};
            }

            // 4. Fetch and scan each file
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
    ipcMain.on('settings:set', (event, { key, value }) => store.set(key, value));
    
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

app.whenReady().then(createWindow);
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });