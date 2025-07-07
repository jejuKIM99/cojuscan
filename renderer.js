// renderer.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Translations ---
    const translations = {
        ko: {
            codeExplorer: "Code Explorer",
            selectDirectory: "디렉토리 선택",
            searchFilesPlaceholder: "파일 검색...",
            selectAll: "전체 선택",
            deselectAll: "전체 해제",
            selectProjectFolder: "프로젝트 폴더를 선택하세요.",
            vulnerabilityScan: "취약점 검사",
            startSimpleScan: "단순 검사",
            startPrecisionScan: "정밀 검사",
            progress: "진행률",
            startScanToSeeResults: "검사를 시작하여 취약점 결과를 확인하세요.",
            helpTitle: "도움말",
            detectableVulnerabilities: "탐지 가능 취약점 (단순 검사 기준)",
            clickVulnerabilityToSeeDetails: "왼쪽 목록에서 취약점 항목을 클릭하여 설명을 확인하세요.",
            supportedExtensions: "지원 확장자",
            scanInProgress: "검사 중...",
            scanComplete: "검사 완료",
            noVulnerabilitiesFound: "선택한 파일에서 취약점이 발견되지 않았습니다.",
            clean: "안전!",
            securityScore: "보안 점수",
            found: "개 발견",
            ignore: "무시",
            ignored: "무시됨",
            recommendation: "권장 사항",
            directoryLoadError: "디렉토리를 불러오지 못했습니다.",
            scanError: "스캔 중 오류 발생",
            semgrepNotFoundTitle: "Semgrep 설치 필요",
            semgrepNotFound: "정밀 검사를 사용하려면 Semgrep 엔진이 필요합니다. 시스템에 설치되어 있지 않은 것 같습니다.",
            semgrepInstallInstruction: "터미널에서 'python -m pip install semgrep' 명령어를 실행하여 설치하세요. 설치 후 프로그램을 다시 시작해야 할 수 있습니다."
        },
        en: {
            codeExplorer: "Code Explorer",
            selectDirectory: "Select Directory",
            searchFilesPlaceholder: "Search files...",
            selectAll: "Select All",
            deselectAll: "Deselect All",
            selectProjectFolder: "Select a project folder.",
            vulnerabilityScan: "Vulnerability Scan",
            startSimpleScan: "Simple Scan",
            startPrecisionScan: "Precision Scan",
            progress: "Progress",
            startScanToSeeResults: "Start a scan to see vulnerability results.",
            helpTitle: "Help",
            detectableVulnerabilities: "Detectable Vulnerabilities (Simple Scan basis)",
            clickVulnerabilityToSeeDetails: "Click a vulnerability from the list on the left to see details.",
            supportedExtensions: "Supported Extensions",
            scanInProgress: "Scanning...",
            scanComplete: "Scan Complete",
            noVulnerabilitiesFound: "No vulnerabilities found in selected files.",
            clean: "Clean!",
            securityScore: "Security Score",
            found: "found",
            ignore: "Ignore",
            ignored: "Ignored",
            recommendation: "Recommendation",
            directoryLoadError: "Failed to load the directory.",
            scanError: "An error occurred during the scan",
            semgrepNotFoundTitle: "Semgrep Installation Required",
            semgrepNotFound: "The Precision Scan feature requires the Semgrep engine, which does not appear to be installed on your system.",
            semgrepInstallInstruction: "Please install it by running 'python -m pip install semgrep' in your terminal. You may need to restart the application after installation."
        }
    };
    let currentLang = 'ko';
    let appInfo = null;

    const setLanguage = (lang) => {
        if (!['ko', 'en'].includes(lang)) lang = 'ko';
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
        if (!helpModal.classList.contains('hidden')) {
            populateHelpModal();
        }
    };

    // --- Element Selectors ---
    const appVersionSpan = document.getElementById('app-version');
    const maximizeIcon = document.getElementById('maximize-icon');
    const unmaximizeIcon = document.getElementById('unmaximize-icon');
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const extensionsList = document.getElementById('extensions-list');
    const vulnerabilitiesList = document.getElementById('vulnerabilities-list');
    const vulnDetailsPanel = document.getElementById('vuln-details-panel');
    const selectDirBtn = document.getElementById('select-dir-btn');
    const startSimpleScanBtn = document.getElementById('start-scan-simple-btn');
    const startPrecisionScanBtn = document.getElementById('start-scan-precision-btn');
    const fileTreeContainer = document.getElementById('file-tree-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const resultsContainer = document.getElementById('results-container');
    const searchInput = document.getElementById('search-input');
    const selectAllBtn = document.getElementById('select-all-btn');
    const deselectAllBtn = document.getElementById('deselect-all-btn');
    
    let projectPath = '';
    const ignoredFindings = new Set();
    let progressUnsubscribe = null;

    // --- Async Initialization ---
    async function initializeApp() {
        try {
            appInfo = await window.electronAPI.getAppInfo();
            const savedLang = await window.electronAPI.getSetting('language');

            if (appInfo && appInfo.version) {
                appVersionSpan.textContent = `v${appInfo.version}`;
            }
            
            if (savedLang) {
                setLanguage(savedLang);
            } else if (appInfo && appInfo.locale) {
                const osLang = appInfo.locale.startsWith('ko') ? 'ko' : 'en';
                setLanguage(osLang);
            } else {
                setLanguage('ko');
            }

        } catch (error) {
            console.error("Error initializing app:", error);
            appVersionSpan.textContent = 'v-.-.-';
            setLanguage('en');
        }
    }

    // --- Window & Language Controls ---
    document.getElementById('minimize-btn').addEventListener('click', () => window.electronAPI.minimizeWindow());
    document.getElementById('maximize-btn').addEventListener('click', () => window.electronAPI.maximizeWindow());
    document.getElementById('close-btn').addEventListener('click', () => window.electronAPI.closeWindow());
    
    window.electronAPI.onWindowMaximized(() => {
        maximizeIcon.classList.add('hidden');
        unmaximizeIcon.classList.remove('hidden');
    });
    window.electronAPI.onWindowUnmaximized(() => {
        maximizeIcon.classList.remove('hidden');
        unmaximizeIcon.classList.add('hidden');
    });

    langBtn.addEventListener('click', () => langDropdown.classList.toggle('hidden'));
    document.addEventListener('click', (e) => {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.add('hidden');
        }
    });
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = e.target.dataset.lang;
            setLanguage(newLang);
            window.electronAPI.setSetting('language', newLang);
            langDropdown.classList.add('hidden');
        });
    });

    // --- Help Modal ---
    const extColorMap = {
        'js|jsx|ts|tsx|vue|svelte': '#f0db4f', 'py|pyw': '#306998', 'java|kt|scala|groovy': '#b07219', 'cs|vb': '#68217a', 'c|cpp|h|hpp': '#00599c', 'go': '#00add8', 'rs': '#dea584', 'rb': '#cc342d', 'php': '#777bb4', 'html|htm': '#e34c26', 'css|scss|less|sass': '#264de4', 'sh|bash|zsh|ps1': '#4EAA25', 'sql': '#e38c00', 'json|yml|yaml|xml|toml': '#6b7280', 'tf|hcl|dockerfile': '#2396ed',
    };
    const getExtensionColor = (ext) => {
        const cleanExt = ext.replace('.', '');
        for (const key in extColorMap) {
            if (key.split('|').includes(cleanExt)) return extColorMap[key];
        }
        return '#007ec6';
    };
    const getExtensionShield = (ext) => `<span class="ext-shield" style="background-color: ${getExtensionColor(ext)};">${ext}</span>`;

    const populateHelpModal = () => {
        if (!appInfo) return;
        extensionsList.innerHTML = appInfo.extensions.sort().map(ext => getExtensionShield(ext)).join('');
        
        const vulnerabilitiesByCategory = appInfo.vulnerabilities.reduce((acc, v) => {
            const category = currentLang === 'en' ? v.category_en : v.category;
            acc[category] = acc[category] || [];
            acc[category].push(v);
            return acc;
        }, {});
        
        vulnerabilitiesList.innerHTML = Object.entries(vulnerabilitiesByCategory).sort((a,b) => a[0].localeCompare(b[0])).map(([category, vulns]) => `
            <div>
                <h4 class="font-bold text-lg text-green-400">${category}</h4>
                <div class="pl-2 flex flex-col space-y-1 mt-1">
                    ${vulns.sort((a,b) => (currentLang === 'en' ? a.name_en : a.name).localeCompare(currentLang === 'en' ? b.name_en : b.name)).map(v => {
                        const name = currentLang === 'en' ? v.name_en : v.name;
                        const details = currentLang === 'en' ? v.details_en : v.details;
                        const recommendation = currentLang === 'en' ? v.recommendation_en : v.recommendation_ko;
                        return `<div class="vuln-item text-gray-300 hover:bg-gray-700 p-1 rounded-md cursor-pointer" data-name="${escapeHtml(name)}" data-details="${escapeHtml(details)}" data-recommendation="${escapeHtml(recommendation)}">${name}</div>`
                    }).join('')}
                </div>
            </div>
        `).join('');
    };

    helpBtn.addEventListener('click', () => {
        populateHelpModal();
        helpModal.classList.remove('hidden');
    });

    vulnerabilitiesList.addEventListener('click', (e) => {
        const item = e.target.closest('.vuln-item');
        if (!item) return;
        vulnerabilitiesList.querySelectorAll('.vuln-item').forEach(el => el.classList.remove('bg-green-800', 'text-white'));
        item.classList.add('bg-green-800', 'text-white');
        const name = item.dataset.name;
        const details = item.dataset.details;
        const recommendation = item.dataset.recommendation;
        vulnDetailsPanel.innerHTML = `
            <h4 class="font-bold text-lg text-green-400 mb-2">${name}</h4>
            <p class="text-gray-300 text-sm mb-4">${details}</p>
            <h5 class="font-semibold text-green-400">${translations[currentLang].recommendation}</h5>
            <p class="text-gray-300 text-sm">${recommendation}</p>
        `;
    });

    closeModalBtn.addEventListener('click', () => helpModal.classList.add('hidden'));
    helpModal.addEventListener('click', (e) => { if (e.target === helpModal) helpModal.classList.add('hidden'); });

    // --- Core App Logic ---
    selectDirBtn.addEventListener('click', async () => {
        const data = await window.electronAPI.selectDirectory();
        if (data && data.tree) {
            projectPath = data.path;
            fileTreeContainer.innerHTML = '';
            const treeElement = createTreeElement(data.tree);
            fileTreeContainer.appendChild(treeElement);
            updateScanButtonState();
        } else {
            fileTreeContainer.innerHTML = `<p class="text-gray-500 text-center py-10">${translations[currentLang].directoryLoadError}</p>`;
        }
    });

    function createTreeElement(nodes) {
        const ul = document.createElement('ul');
        if (!nodes || nodes.length === 0) return ul;
        nodes.forEach(node => {
            const li = document.createElement('li');
            li.className = 'my-1';
            li.dataset.path = node.path;
            if (node.type === 'directory') {
                li.dataset.type = 'directory';
                const label = document.createElement('div');
                label.className = 'folder-label flex items-center p-1 rounded-md hover:bg-gray-800';
                const toggler = document.createElement('span'); toggler.className = 'toggler';
                const icon = document.createElement('span'); icon.className = 'folder-icon';
                const textSpan = document.createElement('span'); textSpan.textContent = node.name;
                label.append(toggler, icon, textSpan);
                li.appendChild(label);
                const childrenUl = createTreeElement(node.children);
                childrenUl.className = 'hidden';
                li.appendChild(childrenUl);
                label.addEventListener('click', () => {
                   childrenUl.classList.toggle('hidden');
                   toggler.classList.toggle('open');
                });
            } else {
                li.dataset.type = 'file';
                const label = document.createElement('label');
                label.className = 'flex items-center cursor-pointer p-1 rounded-md hover:bg-gray-800';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'mr-2 form-checkbox h-4 w-4 bg-gray-900 border-gray-600 rounded focus:ring-green-500 focus:ring-offset-0';
                const icon = document.createElement('span'); icon.className = 'file-icon';
                const textSpan = document.createElement('span'); textSpan.textContent = node.name;
                label.append(checkbox, icon, textSpan);
                li.appendChild(label);
            }
            ul.appendChild(li);
        });
        return ul;
    }
    
    fileTreeContainer.addEventListener('change', (e) => { if (e.target.type === 'checkbox') updateScanButtonState(); });
    
    function updateScanButtonState() {
        const isFileSelected = !!fileTreeContainer.querySelector('input[type="checkbox"]:checked');
        startSimpleScanBtn.disabled = !isFileSelected;
        startPrecisionScanBtn.disabled = !isFileSelected;
    }

    selectAllBtn.addEventListener('click', () => setAllCheckboxes(true));
    deselectAllBtn.addEventListener('click', () => setAllCheckboxes(false));
    
    function setAllCheckboxes(checked) {
        fileTreeContainer.querySelectorAll('li[data-type="file"] input[type="checkbox"]').forEach(cb => cb.checked = checked);
        updateScanButtonState();
    }

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        fileTreeContainer.querySelectorAll('li[data-type="file"]').forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(searchTerm) ? '' : 'none';
        });
    });

    startSimpleScanBtn.addEventListener('click', () => performScan('simple'));
    startPrecisionScanBtn.addEventListener('click', () => performScan('precision'));

    async function performScan(scanType) {
        const checkedFiles = Array.from(fileTreeContainer.querySelectorAll('li[data-type="file"] input[type="checkbox"]:checked')).map(cb => cb.closest('li').dataset.path);
        if (checkedFiles.length === 0) return;

        ignoredFindings.clear();
        startSimpleScanBtn.disabled = true;
        startPrecisionScanBtn.disabled = true;
        selectDirBtn.disabled = true;
        fileTreeContainer.style.pointerEvents = 'none';

        resultsContainer.innerHTML = `<p class="text-gray-400 text-center py-10 animate-pulse">${translations[currentLang].scanInProgress}</p>`;
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
        
        if (progressUnsubscribe) progressUnsubscribe();
        progressUnsubscribe = window.electronAPI.onScanProgress(({ progress, file }) => {
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${progress}% - ${file}`;
        });

        try {
            const results = await window.electronAPI.startScan(scanType, { projectPath, filesToScan: checkedFiles });
            displayResults(results);
        } catch (error) {
            console.error('Scan error:', error);
            if (error.message === 'SEMGREP_NOT_FOUND') {
                resultsContainer.innerHTML = `
                    <div class="text-center py-10 px-4">
                        <h3 class="text-2xl font-bold text-yellow-400 mb-3">${translations[currentLang].semgrepNotFoundTitle}</h3>
                        <p class="text-gray-300 mb-4">${translations[currentLang].semgrepNotFound}</p>
                        <p class="text-gray-400">${translations[currentLang].semgrepInstallInstruction}</p>
                        <code class="block bg-gray-900 text-green-400 p-3 rounded-md mt-4 text-left">python -m pip install semgrep</code>
                    </div>
                `;
            } else {
                resultsContainer.innerHTML = `<p class="text-red-400 text-center py-10">${translations[currentLang].scanError}: ${error.message}</p>`;
            }
        } finally {
            selectDirBtn.disabled = false;
            fileTreeContainer.style.pointerEvents = 'auto';
            updateScanButtonState();
            progressText.textContent = translations[currentLang].scanComplete;
            progressBar.style.width = '100%';
            if (progressUnsubscribe) {
                progressUnsubscribe();
                progressUnsubscribe = null;
            }
        }
    }

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        const filesWithFindings = Object.keys(results);
        if (filesWithFindings.length === 0) {
            resultsContainer.innerHTML = `<div class="text-center py-10"><h3 class="text-2xl font-bold text-green-400 mb-2">${translations[currentLang].clean}</h3><p class="text-gray-300">${translations[currentLang].noVulnerabilitiesFound}</p><h3 class="text-2xl font-bold mt-4">${translations[currentLang].securityScore}: <span class="text-green-400">100 / 100</span></h3></div>`;
            return;
        }
        const resultAccordion = document.createElement('div');
        resultAccordion.id = 'result-accordion';
        filesWithFindings.forEach(file => {
            const findings = results[file];
            const fileContainer = document.createElement('div');
            fileContainer.className = 'mb-2 bg-[#111] rounded-lg overflow-hidden border border-[var(--border-color)]';
            const fileHeader = document.createElement('button');
            fileHeader.className = 'w-full text-left p-3 bg-gray-800 hover:bg-gray-700 focus:outline-none flex justify-between items-center transition-colors';
            fileHeader.innerHTML = `<span class="font-bold text-gray-100">${file}</span><span class="bg-red-500 text-white text-xs font-bold mr-2 px-2.5 py-0.5 rounded-full">${findings.length} ${translations[currentLang].found}</span>`;
            const findingsContainer = document.createElement('div');
            findingsContainer.className = 'p-4 hidden bg-[#1a1a1a]';
            fileHeader.addEventListener('click', () => findingsContainer.classList.toggle('hidden'));
            findings.forEach((finding) => {
                const findingId = `${file}-${finding.line}-${finding.id}`;
                const findingCard = document.createElement('div');
                findingCard.id = findingId;
                findingCard.dataset.severity = finding.severity;
                const severityStyles = { High: { border: 'border-red-500', bg: 'bg-red-500' }, Medium: { border: 'border-yellow-500', bg: 'bg-yellow-500' }, Low: { border: 'border-blue-500', bg: 'bg-blue-500' } };
                const style = severityStyles[finding.severity] || { border: 'border-gray-500', bg: 'bg-gray-500' };
                
                // Correctly select translated fields based on current language
                const name = currentLang === 'en' ? (finding.name_en || finding.name) : finding.name;
                const category = currentLang === 'en' ? (finding.category_en || finding.category) : finding.category;
                const recommendation = currentLang === 'en' ? (finding.recommendation_en || 'N/A') : (finding.recommendation_ko || 'N/A');
                const description = finding.description; // Use the specific description from the scan
                
                findingCard.className = `border-l-4 ${style.border} p-3 mb-3 rounded-r-lg bg-[#0D0D0D] transition-opacity`;
                findingCard.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="text-lg font-semibold text-gray-100">${name}</h4>
                        <div class="flex items-center flex-shrink-0">
                            <span class="text-xs font-medium px-2 py-1 rounded-md mr-2 bg-gray-600 text-gray-200">${category || 'General'}</span>
                            <span class="text-sm font-medium px-2 py-1 rounded-md mr-2 ${style.bg} text-white">${finding.severity}</span>
                            <button class="ignore-btn text-xs bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded">${translations[currentLang].ignore}</button>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-2 text-sm">${description}</p>
                    <div class="bg-black bg-opacity-40 p-3 rounded-md font-mono text-sm text-yellow-300 overflow-x-auto">
                        <code>Line ${finding.line}: ${escapeHtml(finding.code)}</code>
                    </div>
                    <p class="text-gray-300 mt-3 text-sm"><span class="font-semibold text-green-400">${translations[currentLang].recommendation}:</span> ${recommendation}</p>
                `;
                findingCard.querySelector('.ignore-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    ignoredFindings.add(findingId);
                    findingCard.classList.add('opacity-40');
                    e.target.disabled = true;
                    e.target.textContent = translations[currentLang].ignored;
                    recalculateScore();
                });
                findingsContainer.appendChild(findingCard);
            });
            fileContainer.append(fileHeader, findingsContainer);
            resultAccordion.appendChild(fileContainer);
        });
        const scoreElement = document.createElement('div');
        scoreElement.id = 'score-element';
        scoreElement.className = 'text-center my-4';
        resultsContainer.appendChild(scoreElement);
        resultsContainer.appendChild(resultAccordion);
        recalculateScore();
    }

    function recalculateScore() {
        let totalScore = 100;
        const severityScores = { High: 15, Medium: 5, Low: 1 };
        const allFindings = document.querySelectorAll('#result-accordion [data-severity]');
        allFindings.forEach(findingCard => {
            if (!ignoredFindings.has(findingCard.id)) {
                totalScore -= severityScores[findingCard.dataset.severity] || 0;
            }
        });
        totalScore = Math.max(0, totalScore);
        const scoreColor = totalScore > 80 ? 'text-green-400' : totalScore > 50 ? 'text-yellow-400' : 'text-red-400';
        const scoreElement = document.getElementById('score-element');
        if(scoreElement) {
            scoreElement.innerHTML = `<h3 class="text-2xl font-bold">${translations[currentLang].securityScore}: <span class="${scoreColor}">${totalScore} / 100</span></h3>`;
        }
    }

    function escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return '';
        return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    // --- Run Initialization ---
    initializeApp();
});
