// install-semgrep.js
const { exec } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');
const https = require('https');
const extract = require('extract-zip');

const IS_WINDOWS = os.platform() === 'win32';
const PYTHON_DIR = path.join(__dirname, '.py-semgrep');
const PYTHON_EXE = path.join(PYTHON_DIR, 'python.exe');
const PIP_EXE = path.join(PYTHON_DIR, 'Scripts', 'pip.exe');
const SEMGREP_EXE = path.join(PYTHON_DIR, 'Scripts', 'semgrep.exe');

// --- Logging Utilities ---
const logInfo = (message) => console.log(`[INFO] ${message}`);
const logSuccess = (message) => console.log(`✅ ${message}`);
const logError = (message) => console.error(`🔴 ${message}`);
const logAttempt = (message) => console.log(`▶ ${message}`);

/**
 * Executes a shell command and returns it as a Promise.
 * @param {string} command The command to execute.
 * @returns {Promise<{success: boolean, stdout: string, stderr: string}>}
 */
function runCommand(command) {
    return new Promise((resolve) => {
        exec(command, { encoding: 'utf8' }, (error, stdout, stderr) => {
            if (error) {
                resolve({ success: false, stdout, stderr: stderr || error.message });
            } else {
                resolve({ success: true, stdout, stderr });
            }
        });
    });
}

/**
 * Downloads a file from a URL to a specified path.
 * @param {string} url The URL to download from.
 * @param {string} dest The destination path.
 * @returns {Promise<void>}
 */
function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                return reject(new Error(`Download failed with status code: ${response.statusCode}`));
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve());
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

/**
 * Modifies the ._pth file in the embedded Python distribution to include site-packages.
 * This is crucial for pip and its packages to be recognized.
 */
function enableSitePackages() {
    const pthFiles = fs.readdirSync(PYTHON_DIR).filter(f => f.endsWith('._pth'));
    if (pthFiles.length === 0) {
        logError('Could not find the ._pth file in the Python directory. Pip modules may not be found.');
        return;
    }
    const pthPath = path.join(PYTHON_DIR, pthFiles[0]);
    try {
        let content = fs.readFileSync(pthPath, 'utf8');
        // Ensure 'import site' is not commented out.
        if (content.includes('#import site')) {
            content = content.replace(/#import site/g, 'import site');
            fs.writeFileSync(pthPath, content);
            logSuccess(`Enabled site-packages in ${pthFiles[0]} for module discovery.`);
        } else if (!content.includes('import site')) {
            content += '\nimport site';
            fs.writeFileSync(pthPath, content);
            logSuccess(`Added 'import site' to ${pthFiles[0]} for module discovery.`);
        }
    } catch (error) {
        logError(`Failed to modify ${pthPath}: ${error.message}`);
    }
}

/**
 * Shows the final manual installation message if everything fails.
 */
function showManualInstallMessage() {
    logError('--------------------------------------------------');
    logError('자동 설치 실패: Semgrep 설치에 최종적으로 실패했습니다.');
    logError('정밀 검사 기능을 사용하려면 수동 설치가 필요합니다.');
    logInfo('');
    logInfo('1. Python 설치: https://www.python.org/downloads/');
    logInfo('   (설치 시 "Add Python to PATH" 옵션을 반드시 체크하세요.)');
    logInfo('');
    logInfo('2. 터미널(명령 프롬프트)에서 다음 명령어 실행:');
    logInfo('   pip install semgrep');
    logError('--------------------------------------------------');
}

/**
 * Main installation logic.
 */
async function main() {
    logInfo('Cojuscan Post-install: Semgrep 의존성 확인 시작...');

    if (fs.existsSync(SEMGREP_EXE)) {
        logSuccess('로컬 Semgrep가 이미 설치되어 있습니다. 설정 완료.');
        return;
    }

    if (!IS_WINDOWS) {
        logInfo('Windows가 아닌 환경에서는 수동 설치가 필요합니다.');
        showManualInstallMessage();
        return;
    }

    try {
        if (!fs.existsSync(PYTHON_EXE)) {
            logAttempt('독립 실행형 Python 다운로드 중... (시간이 걸릴 수 있습니다)');
            const pythonVersion = '3.11.9';
            const pythonUrl = `https://www.python.org/ftp/python/${pythonVersion}/python-${pythonVersion}-embed-amd64.zip`;
            const zipPath = path.join(__dirname, 'python-embed.zip');
            
            await downloadFile(pythonUrl, zipPath);
            logSuccess('Python 다운로드 완료.');

            logAttempt('Python 압축 해제 중...');
            if (!fs.existsSync(PYTHON_DIR)) fs.mkdirSync(PYTHON_DIR);
            await extract(zipPath, { dir: PYTHON_DIR });
            fs.unlinkSync(zipPath);
            logSuccess('Python 압축 해제 완료.');
            
            enableSitePackages(); // Enable site packages after extraction.
        } else {
            logSuccess('로컬 Python이 이미 존재합니다.');
        }

        if (!fs.existsSync(PIP_EXE)) {
            logAttempt('pip 설치 스크립트 다운로드 중...');
            const getPipUrl = 'https://bootstrap.pypa.io/get-pip.py';
            const getPipPath = path.join(PYTHON_DIR, 'get-pip.py');
            await downloadFile(getPipUrl, getPipPath);
            logSuccess('pip 설치 스크립트 다운로드 완료.');

            logAttempt('로컬 Python 환경에 pip 설치 중...');
            const pipInstallResult = await runCommand(`"${PYTHON_EXE}" "${getPipPath}"`);
            if (!pipInstallResult.success) {
                throw new Error(`pip 설치 실패:\n${pipInstallResult.stderr}`);
            }
            fs.unlinkSync(getPipPath);
            logSuccess('pip 설치 완료.');
        } else {
            logSuccess('로컬 pip가 이미 존재합니다.');
        }

        logAttempt('로컬 pip를 이용해 Semgrep 설치 중... (시간이 많이 걸릴 수 있습니다)');
        const semgrepInstallResult = await runCommand(`"${PIP_EXE}" install --upgrade semgrep`);
        if (!semgrepInstallResult.success) {
            throw new Error(`Semgrep 설치 실패:\n${semgrepInstallResult.stderr}`);
        }

        logSuccess('🎉 Semgrep가 성공적으로 설치되었습니다! 이제 모든 기능을 사용할 수 있습니다.');

    } catch (error) {
        logError(`설치 중 오류 발생: ${error.message}`);
        showManualInstallMessage();
        if (fs.existsSync(PYTHON_DIR)) {
            try {
                fs.rmSync(PYTHON_DIR, { recursive: true, force: true });
                logInfo('실패한 설치 디렉토리를 정리했습니다.');
            } catch (rmError) {
                logError(`실패한 설치 디렉토리 정리 중 오류 발생: ${rmError.message}`);
            }
        }
    }
}

main();
