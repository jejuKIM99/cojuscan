// renderer.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Translations ---
    const translations = {
        ko: {
            codeExplorer: "Code Explorer", selectDirectory: "디렉토리 선택", searchFilesPlaceholder: "파일 검색...", selectAll: "전체 선택", deselectAll: "전체 해제", selectProjectFolder: "프로젝트 폴더를 선택하세요.", vulnerabilityScan: "취약점 검사", startSimpleScan: "단순 검사", startPrecisionScan: "정밀 검사", progress: "진행률", startScanToSeeResults: "검사를 시작하여 취약점 결과를 확인하세요.", helpTitle: "도움말", detectableVulnerabilities: "탐지 가능 취약점 (단순 검사 기준)", clickVulnerabilityToSeeDetails: "왼쪽 목록에서 취약점 항목을 클릭하여 설명을 확인하세요.", supportedExtensions: "지원 확장자", scanInProgress: "검사 중...", scanComplete: "검사 완료", noVulnerabilitiesFound: "선택한 파일에서 취약점이 발견되지 않았습니다.", clean: "안전!", securityScore: "보안 점수", found: "개 발견", ignore: "무시", ignored: "무시됨", recommendation: "권장 사항", directoryLoadError: "디렉토리를 불러오지 못했습니다.", scanError: "스캔 중 오류 발생", semgrepNotFoundTitle: "Semgrep 설치 필요", semgrepNotFound: "정밀 검사를 사용하려면 Semgrep 엔진이 필요합니다. 시스템에 설치되어 있지 않은 것 같습니다.", semgrepInstallInstruction: "터미널에서 'python -m pip install semgrep' 명령어를 실행하여 설치하세요. 설치 후 프로그램을 다시 시작해야 할 수 있습니다.", exportReport: "보고서 출력", themeEditorTitle: "테마 편집기", themeNamePlaceholder: "테마 이름을 입력하세요", addTheme: "추가", close: "닫기", addCustomTheme: "커스텀 테마 추가", deleteTheme: "삭제", deleteConfirm: "정말 삭제하시겠습니까?", themeLimitError: "커스텀 테마는 최대 3개까지 저장할 수 있습니다. 기존 테마를 삭제해주세요.", themeNameExistsError: "같은 이름의 테마가 이미 존재합니다.", themeNameEmptyError: "테마 이름은 비워둘 수 없습니다.", hoverPreview: "호버 미리보기", activePreview: "활성화 미리보기",
            themeVarGroups: {
                "기본": ['--main-bg', '--secondary-bg', '--border-color'],
                "텍스트 & 강조": ['--text-color', '--text-color-dark', '--accent-color', '--link-color'],
                "버튼": ['--button-primary-bg', '--button-primary-hover-bg', '--button-secondary-bg', '--button-secondary-hover-bg', '--button-danger-bg', '--button-danger-hover-bg'],
                "검사 버튼": ['--button-scan-simple-bg', '--button-scan-simple-hover-bg', '--button-scan-precision-bg', '--button-scan-precision-hover-bg', '--button-scan-text'],
                "비활성 & 기타": ['--button-disabled-bg', '--button-disabled-text', '--input-bg', '--progress-bar-bg'],
                "컴포넌트": ['--scrollbar-thumb-color', '--scrollbar-track-color', '--severity-high-color', '--severity-medium-color', '--severity-low-color', '--code-bg', '--code-text']
            },
            themeVarNames: {
                '--main-bg': '메인 배경', '--secondary-bg': '보조 배경', '--accent-color': '강조 색상', '--text-color': '기본 텍스트', '--text-color-dark': '보조 텍스트', '--border-color': '테두리', '--button-primary-bg': '주요 버튼', '--button-primary-hover-bg': '주요 버튼 (호버)', '--button-primary-text': '주요 버튼 텍스트', '--button-secondary-bg': '보조 버튼', '--button-secondary-hover-bg': '보조 버튼 (호버)', '--button-scan-simple-bg': '단순 검사 버튼', '--button-scan-simple-hover-bg': '단순 검사 (호버)', '--button-scan-precision-bg': '정밀 검사 버튼', '--button-scan-precision-hover-bg': '정밀 검사 (호버)', '--button-scan-text': '검사 버튼 텍스트', '--button-danger-bg': '위험 버튼', '--button-danger-hover-bg': '위험 버튼 (호버)', '--button-disabled-bg': '비활성 버튼', '--button-disabled-text': '비활성 버튼 텍스트', '--input-bg': '입력창 배경', '--progress-bar-bg': '진행률 바', '--scrollbar-thumb-color': '스크롤바 막대', '--scrollbar-track-color': '스크롤바 트랙', '--severity-high-color': '심각도 (높음)', '--severity-medium-color': '심각도 (중간)', '--severity-low-color': '심각도 (낮음)', '--code-bg': '코드 블록 배경', '--code-text': '코드 블록 텍스트', '--link-color': '링크 색상',
            }
        },
        en: {
            codeExplorer: "Code Explorer", selectDirectory: "Select Directory", searchFilesPlaceholder: "Search files...", selectAll: "Select All", deselectAll: "Deselect All", selectProjectFolder: "Select a project folder.", vulnerabilityScan: "Vulnerability Scan", startSimpleScan: "Simple Scan", startPrecisionScan: "Precision Scan", progress: "Progress", startScanToSeeResults: "Start a scan to see vulnerability results.", helpTitle: "Help", detectableVulnerabilities: "Detectable Vulnerabilities (Simple Scan basis)", clickVulnerabilityToSeeDetails: "Click a vulnerability from the list on the left to see details.", supportedExtensions: "Supported Extensions", scanInProgress: "Scanning...", scanComplete: "Scan Complete", noVulnerabilitiesFound: "No vulnerabilities found in selected files.", clean: "Clean!", securityScore: "Security Score", found: "found", ignore: "Ignore", ignored: "Ignored", recommendation: "Recommendation", directoryLoadError: "Failed to load the directory.", scanError: "An error occurred during the scan", semgrepNotFoundTitle: "Semgrep Installation Required", semgrepNotFound: "The Precision Scan feature requires the Semgrep engine, which does not appear to be installed on your system.", semgrepInstallInstruction: "Please install it by running 'python -m pip install semgrep' in your terminal. You may need to restart the application after installation.", exportReport: "Export Report", themeEditorTitle: "Theme Editor", themeNamePlaceholder: "Enter theme name", addTheme: "Add", close: "Close", addCustomTheme: "Add Custom Theme", deleteTheme: "Delete", deleteConfirm: "Are you sure you want to delete?", themeLimitError: "You can save up to 3 custom themes. Please delete an existing one.", themeNameExistsError: "A theme with the same name already exists.", themeNameEmptyError: "Theme name cannot be empty.", hoverPreview: "Hover Preview", activePreview: "Active Preview",
            themeVarGroups: {
                "General": ['--main-bg', '--secondary-bg', '--border-color'],
                "Text & Accent": ['--text-color', '--text-color-dark', '--accent-color', '--link-color'],
                "Buttons": ['--button-primary-bg', '--button-primary-hover-bg', '--button-secondary-bg', '--button-secondary-hover-bg', '--button-danger-bg', '--button-danger-hover-bg'],
                "Scan Buttons": ['--button-scan-simple-bg', '--button-scan-simple-hover-bg', '--button-scan-precision-bg', '--button-scan-precision-hover-bg', '--button-scan-text'],
                "State & Misc": ['--button-disabled-bg', '--button-disabled-text', '--input-bg', '--progress-bar-bg'],
                "Components": ['--scrollbar-thumb-color', '--scrollbar-track-color', '--severity-high-color', '--severity-medium-color', '--severity-low-color', '--code-bg', '--code-text']
            },
            themeVarNames: {
                '--main-bg': 'Main BG', '--secondary-bg': 'Secondary BG', '--accent-color': 'Accent', '--text-color': 'Text', '--text-color-dark': 'Muted Text', '--border-color': 'Border', '--button-primary-bg': 'Primary Button', '--button-primary-hover-bg': 'Primary Button (Hover)', '--button-primary-text': 'Primary Button Text', '--button-secondary-bg': 'Secondary Button', '--button-secondary-hover-bg': 'Secondary Button (Hover)', '--button-scan-simple-bg': 'Simple Scan Button', '--button-scan-simple-hover-bg': 'Simple Scan (Hover)', '--button-scan-precision-bg': 'Precision Scan Button', '--button-scan-precision-hover-bg': 'Precision Scan (Hover)', '--button-scan-text': 'Scan Button Text', '--button-danger-bg': 'Danger Button', '--button-danger-hover-bg': 'Danger Button (Hover)', '--button-disabled-bg': 'Disabled Button', '--button-disabled-text': 'Disabled Button Text', '--input-bg': 'Input BG', '--progress-bar-bg': 'Progress Bar', '--scrollbar-thumb-color': 'Scrollbar Thumb', '--scrollbar-track-color': 'Scrollbar Track', '--severity-high-color': 'Severity (High)', '--severity-medium-color': 'Severity (Medium)', '--severity-low-color': 'Severity (Low)', '--code-bg': 'Code Block BG', '--code-text': 'Code Block Text', '--link-color': 'Link Color',
            }
        }
    };
    let currentLang = 'ko';
    let appInfo = null;
    let iconDataMap = {};

    // --- Element Selectors ---
    const getEl = (id) => document.getElementById(id);
    const appVersionSpan = getEl('app-version');
    const maximizeIcon = getEl('maximize-icon');
    const unmaximizeIcon = getEl('unmaximize-icon');
    const langBtn = getEl('lang-btn');
    const langDropdown = getEl('lang-dropdown');
    const helpBtn = getEl('help-btn');
    const helpModal = getEl('help-modal');
    const closeModalBtn = getEl('close-modal-btn');
    const extensionsList = getEl('extensions-list');
    const vulnerabilitiesList = getEl('vulnerabilities-list');
    const vulnDetailsPanel = getEl('vuln-details-panel');
    const selectDirBtn = getEl('select-dir-btn');
    const startSimpleScanBtn = getEl('start-scan-simple-btn');
    const startPrecisionScanBtn = getEl('start-scan-precision-btn');
    const fileTreeContainer = getEl('file-tree-container');
    const progressBar = getEl('progress-bar');
    const progressText = getEl('progress-text');
    const resultsContainer = getEl('results-container');
    const searchInput = getEl('search-input');
    const selectAllBtn = getEl('select-all-btn');
    const deselectAllBtn = getEl('deselect-all-btn');
    const exportPdfBtn = getEl('export-pdf-btn');
    
    // --- Theme Elements ---
    const themeBtn = getEl('theme-btn');
    const themeDropdown = getEl('theme-dropdown');
    const dynamicThemeStyles = getEl('dynamic-theme-styles');
    const themeEditorPanel = getEl('theme-editor-panel');
    const themeEditorProperties = getEl('theme-editor-properties');
    const closeThemeEditorBtn = getEl('close-theme-editor-btn');
    const saveThemeBtn = getEl('save-theme-btn');
    const customThemeNameInput = getEl('custom-theme-name');
    const themeEditorMessage = getEl('theme-editor-message');
    const hoverPreviewToggle = getEl('hover-preview-toggle');
    const activePreviewToggle = getEl('active-preview-toggle');

    let projectPath = '';
    let currentScanResults = null;
    let currentSecurityScore = 0;
    const ignoredFindings = new Set();
    let progressUnsubscribe = null;
    let currentFileTree = null;

    // =================================================================
    // THEME MANAGEMENT
    // =================================================================
    const themes = {
        Cojus: {
            '--main-bg': '#0D0D0D', '--secondary-bg': '#1A1A1A', '--accent-color': '#00FF41', '--text-color': '#E0E0E0', '--text-color-dark': '#9ca3af', '--border-color': '#2a2a2a', '--button-primary-bg': '#166534', '--button-primary-hover-bg': '#15803d', '--button-primary-text': '#ffffff', '--button-secondary-bg': '#374151', '--button-secondary-hover-bg': '#4b5563', '--button-scan-simple-bg': '#2563eb', '--button-scan-simple-hover-bg': '#3b82f6', '--button-scan-precision-bg': '#16a34a', '--button-scan-precision-hover-bg': '#22c55e', '--button-scan-text': '#ffffff', '--button-danger-bg': '#dc2626', '--button-danger-hover-bg': '#ef4444', '--button-disabled-bg': '#4b5563', '--button-disabled-text': '#9ca3af', '--input-bg': '#1f2937', '--progress-bar-bg': '#00FF41', '--scrollbar-thumb-color': '#00FF41', '--scrollbar-track-color': '#1A1A1A', '--severity-high-color': '#ef4444', '--severity-medium-color': '#f59e0b', '--severity-low-color': '#3b82f6', '--code-bg': 'rgba(0,0,0,0.4)', '--code-text': '#facc15', '--link-color': '#3b82f6',
        },
        StarLight: {
            '--main-bg': '#000000', '--secondary-bg': '#111111', '--accent-color': '#00e5ff', '--text-color': '#e0e0e0', '--text-color-dark': '#888888', '--border-color': '#222222', '--button-primary-bg': '#005f6b', '--button-primary-hover-bg': '#008c9e', '--button-primary-text': '#ffffff', '--button-secondary-bg': '#2a2a2a', '--button-secondary-hover-bg': '#3a3a3a', '--button-scan-simple-bg': '#0077b6', '--button-scan-simple-hover-bg': '#0096c7', '--button-scan-precision-bg': '#00b5a4', '--button-scan-precision-hover-bg': '#00d4c2', '--button-scan-text': '#ffffff', '--button-danger-bg': '#b60045', '--button-danger-hover-bg': '#d60051', '--button-disabled-bg': '#333333', '--button-disabled-text': '#777777', '--input-bg': '#1f1f1f', '--progress-bar-bg': '#00e5ff', '--scrollbar-thumb-color': '#00e5ff', '--scrollbar-track-color': '#111111', '--severity-high-color': '#ff4d6d', '--severity-medium-color': '#ffaf00', '--severity-low-color': '#00e5ff', '--code-bg': 'rgba(0, 229, 255, 0.1)', '--code-text': '#ade8f4', '--link-color': '#00e5ff',
        },
        PlumDark: {
            '--main-bg': '#0c0b0f', '--secondary-bg': '#1d1924', '--accent-color': '#cc99cc', '--text-color': '#e0e0e0', '--text-color-dark': '#a9a1b3', '--border-color': '#332d3b', '--button-primary-bg': '#5c3d5c', '--button-primary-hover-bg': '#754d75', '--button-primary-text': '#ffffff', '--button-secondary-bg': '#3c3547', '--button-secondary-hover-bg': '#4d445a', '--button-scan-simple-bg': '#8e44ad', '--button-scan-simple-hover-bg': '#9b59b6', '--button-scan-precision-bg': '#663366', '--button-scan-precision-hover-bg': '#7d3f7d', '--button-scan-text': '#ffffff', '--button-danger-bg': '#a13a53', '--button-danger-hover-bg': '#b84461', '--button-disabled-bg': '#4a4155', '--button-disabled-text': '#888094', '--input-bg': '#2b2533', '--progress-bar-bg': '#cc99cc', '--scrollbar-thumb-color': '#cc99cc', '--scrollbar-track-color': '#1d1924', '--severity-high-color': '#e74c3c', '--severity-medium-color': '#f39c12', '--severity-low-color': '#3498db', '--code-bg': 'rgba(204, 153, 204, 0.1)', '--code-text': '#e1bee7', '--link-color': '#cc99cc',
        }
    };
    let customThemes = {};
    let activeThemeName = 'Cojus';
    let isThemeEditMode = false;
    let themeToRestore = 'Cojus';

    const applyTheme = (themeName) => {
        const allThemes = { ...themes, ...customThemes };
        const theme = allThemes[themeName];
        if (!theme) {
            console.error(`Theme "${themeName}" not found. Reverting to default.`);
            applyTheme('Cojus');
            return;
        }
        document.documentElement.style.cssText = '';
        const themeCSSText = `:root { ${Object.entries(theme).map(([key, value]) => `${key}: ${value};`).join(' ')} }`;
        dynamicThemeStyles.textContent = themeCSSText;
        activeThemeName = themeName;
    };

    const saveAndApplyTheme = (themeName) => {
        applyTheme(themeName);
        window.electronAPI.setSetting('activeTheme', themeName);
    };
    
    const populateThemeDropdown = () => {
        themeDropdown.innerHTML = '';
        
        Object.keys(themes).forEach(name => {
            const item = document.createElement('a');
            item.href = '#';
            item.className = 'block px-4 py-2 text-sm text-[var(--text-color)] hover:bg-[var(--button-secondary-hover-bg)]';
            item.textContent = name;
            item.addEventListener('click', (e) => { e.preventDefault(); saveAndApplyTheme(name); themeDropdown.classList.add('hidden'); });
            themeDropdown.appendChild(item);
        });

        themeDropdown.appendChild(document.createElement('hr')).className = 'border-t border-[var(--border-color)] my-1';

        Object.keys(customThemes).forEach(name => {
            const item = document.createElement('div');
            item.className = 'flex justify-between items-center px-4 py-2 text-sm text-[var(--text-color)] hover:bg-[var(--button-secondary-hover-bg)]';
            
            const nameSpan = document.createElement('a');
            nameSpan.href = '#';
            nameSpan.textContent = name;
            nameSpan.className = 'flex-grow';
            nameSpan.addEventListener('click', (e) => { e.preventDefault(); saveAndApplyTheme(name); themeDropdown.classList.add('hidden'); });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.title = translations[currentLang].deleteTheme;
            deleteBtn.className = 'ml-2 text-red-500 hover:text-red-400 font-bold';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                if (confirm(translations[currentLang].deleteConfirm)) {
                    delete customThemes[name];
                    window.electronAPI.setSetting('customThemes', customThemes);
                    populateThemeDropdown();
                    if (activeThemeName === name) saveAndApplyTheme('Cojus');
                }
            };
            item.append(nameSpan, deleteBtn);
            themeDropdown.appendChild(item);
        });

        const addCustomBtn = document.createElement('a');
        addCustomBtn.href = '#';
        addCustomBtn.className = 'block px-4 py-2 text-sm text-[var(--accent-color)] hover:bg-[var(--button-secondary-hover-bg)]';
        addCustomBtn.textContent = `+ ${translations[currentLang].addCustomTheme}`;
        addCustomBtn.addEventListener('click', (e) => { e.preventDefault(); themeDropdown.classList.add('hidden'); enterThemeEditMode(); });
        themeDropdown.appendChild(addCustomBtn);
    };

    const enterThemeEditMode = () => {
        isThemeEditMode = true;
        themeToRestore = activeThemeName;
        document.body.classList.add('theme-editing-active');
        themeEditorPanel.classList.remove('hidden');
        customThemeNameInput.value = '';
        themeEditorMessage.textContent = '';
        
        const currentThemeObject = { ...themes, ...customThemes }[activeThemeName];
        
        Object.entries(currentThemeObject).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
        
        themeEditorProperties.innerHTML = '';
        const themeVarGroups = translations[currentLang].themeVarGroups;

        for(const groupName in themeVarGroups) {
            const groupWrapper = document.createElement('div');
            groupWrapper.className = 'border-r border-gray-700 pr-4 last:border-r-0';

            const groupTitle = document.createElement('h4');
            groupTitle.textContent = groupName;
            groupTitle.className = 'text-sm font-bold text-[#00FF41] mb-2 col-span-full';
            groupWrapper.appendChild(groupTitle);

            themeVarGroups[groupName].forEach(key => {
                const value = currentThemeObject[key];
                const propContainer = document.createElement('div');
                propContainer.className = 'flex items-center justify-between text-xs mb-1';

                const label = document.createElement('label');
                label.textContent = translations[currentLang].themeVarNames[key] || key;
                label.className = 'text-[#9ca3af] mr-2 truncate';
                label.title = translations[currentLang].themeVarNames[key] || key;

                const colorInput = document.createElement('input');
                colorInput.type = 'color';
                colorInput.value = value;
                colorInput.className = 'p-0 border-none rounded bg-transparent w-6 h-6 cursor-pointer';
                
                colorInput.addEventListener('input', (e) => {
                    document.documentElement.style.setProperty(key, e.target.value);
                }, false);
                
                propContainer.append(label, colorInput);
                groupWrapper.appendChild(propContainer);
            });
            themeEditorProperties.appendChild(groupWrapper);
        }
        
        progressBar.style.width = '100%';
        progressText.textContent = '100% - Theme Editing';

        const dummyFileItems = Array.from({length: 15}, (_, i) => `<li class="my-1" data-type="file"><label class="flex items-center p-1"><input type="checkbox" ${i % 3 === 0 ? 'checked' : ''} class="mr-2 form-checkbox"><span>dummy_file_${i+1}.js</span></label></li>`).join('');
        fileTreeContainer.innerHTML = `<p class="text-[var(--text-color-dark)] text-center py-2">Theme Editing Preview</p><ul>${dummyFileItems}</ul>`;
        
        const dummyResultItems = Array.from({length: 15}, (_, i) => `
            <div class="border-l-4 p-3 mb-3 rounded-r-lg bg-[var(--main-bg)]" style="border-color: var(${i % 3 === 0 ? '--severity-high-color' : i % 3 === 1 ? '--severity-medium-color' : '--severity-low-color'})">
                <h4 class="text-lg font-semibold">Severity Finding ${i+1}</h4>
                <div class="bg-[var(--code-bg)] p-2 my-1 rounded-md font-mono text-sm text-[var(--code-text)]"><code>Line ${42+i}: some_dummy_code();</code></div>
            </div>`).join('');
        resultsContainer.innerHTML = dummyResultItems;

        hoverPreviewToggle.checked = false;
        activePreviewToggle.checked = false;
        toggleButtonPreviews();
    };
    
    const toggleButtonPreviews = () => {
        const isHover = hoverPreviewToggle.checked;
        const isActive = activePreviewToggle.checked;

        const scanButtons = [startSimpleScanBtn, startPrecisionScanBtn];
        scanButtons.forEach(btn => {
            btn.classList.remove('preview-active');
            btn.disabled = !isActive;
            if (isActive) {
                btn.classList.add('preview-active');
            }
        });
        
        const hoverButtons = [
            { el: selectDirBtn, cls: 'preview-hover-primary' },
            { el: selectAllBtn, cls: 'preview-hover-secondary' },
            { el: deselectAllBtn, cls: 'preview-hover-secondary' },
            { el: exportPdfBtn, cls: 'preview-hover-danger' },
            { el: startSimpleScanBtn, cls: 'preview-hover-simple' },
            { el: startPrecisionScanBtn, cls: 'preview-hover-precision' },
        ];

        hoverButtons.forEach(item => {
            item.el.classList.remove(item.cls);
            if(isHover) {
                // 활성화 미리보기가 켜져있을 때만 검사 버튼에 호버 적용
                if (scanButtons.includes(item.el)) {
                    if (isActive) {
                        item.el.classList.add(item.cls);
                    }
                } else {
                    item.el.classList.add(item.cls);
                }
            }
        });
    };

    hoverPreviewToggle.addEventListener('change', toggleButtonPreviews);
    activePreviewToggle.addEventListener('change', toggleButtonPreviews);

    // ================== [수정된 부분 시작] ==================
    const exitThemeEditMode = (restore = true) => {
        // 1. 미리보기 토글의 상태를 먼저 초기화합니다.
        hoverPreviewToggle.checked = false;
        activePreviewToggle.checked = false;

        // 2. 초기화된 상태를 버튼에 즉시 반영하여 미리보기 스타일을 제거합니다.
        toggleButtonPreviews();
        
        isThemeEditMode = false;
        document.body.classList.remove('theme-editing-active');
        themeEditorPanel.classList.add('hidden');
        
        if (restore) {
            applyTheme(themeToRestore);
        }
        
        restoreUIState();
    };
    // ================== [수정된 부분 끝] ====================
    
    const saveCustomTheme = () => {
        const name = customThemeNameInput.value.trim();
        themeEditorMessage.textContent = '';

        if (!name) { themeEditorMessage.textContent = translations[currentLang].themeNameEmptyError; return; }
        if (themes[name] || customThemes[name]) { themeEditorMessage.textContent = translations[currentLang].themeNameExistsError; return; }
        if (Object.keys(customThemes).length >= 3) { themeEditorMessage.textContent = translations[currentLang].themeLimitError; return; }

        const newTheme = {};
        const baseThemeKeys = Object.keys(themes['Cojus']);
        baseThemeKeys.forEach(key => {
            newTheme[key] = document.documentElement.style.getPropertyValue(key).trim() || getComputedStyle(document.documentElement).getPropertyValue(key).trim();
        });

        customThemes[name] = newTheme;
        window.electronAPI.setSetting('customThemes', customThemes);
        populateThemeDropdown();
        saveAndApplyTheme(name);
        exitThemeEditMode(false);
    };

    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.add('hidden');
        themeDropdown.classList.toggle('hidden');
    });

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.add('hidden');
        langDropdown.classList.toggle('hidden');
    });

    closeThemeEditorBtn.addEventListener('click', () => exitThemeEditMode());
    saveThemeBtn.addEventListener('click', saveCustomTheme);

    // =================================================================
    // LANGUAGE MANAGEMENT & INITIALIZATION
    // =================================================================

    const setLanguage = (lang) => {
        if (!['ko', 'en'].includes(lang)) lang = 'ko';
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                 el.textContent = translations[lang][key];
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
        if (!helpModal.classList.contains('hidden')) {
            populateHelpModal();
        }
        if (currentScanResults) {
            displayResults(currentScanResults);
        }
        populateThemeDropdown();
    };
    
    langDropdown.addEventListener('click', (e) => {
        const target = e.target.closest('.lang-option');
        if (target) {
            e.preventDefault();
            const newLang = target.dataset.lang;
            if (currentLang !== newLang) {
                setLanguage(newLang);
                window.electronAPI.setSetting('language', newLang);
            }
            langDropdown.classList.add('hidden');
        }
    });

    const populateLangDropdown = () => {
        langDropdown.innerHTML = '';
        const langOptions = { ko: "한국어", en: "English" };
        Object.entries(langOptions).forEach(([langCode, langName]) => {
            const option = document.createElement('a');
            option.href = '#';
            option.className = 'lang-option block px-4 py-2 text-sm text-[var(--text-color)] hover:bg-[var(--button-secondary-hover-bg)]';
            option.dataset.lang = langCode;
            option.textContent = langName;
            langDropdown.appendChild(option);
        });
    }

    async function initializeApp() {
        try {
            appInfo = await window.electronAPI.getAppInfo();
            const savedLang = await window.electronAPI.getSetting('language');
            const savedTheme = await window.electronAPI.getSetting('activeTheme');
            const savedCustomThemes = await window.electronAPI.getSetting('customThemes');
            
            if (savedCustomThemes) customThemes = savedCustomThemes;

            applyTheme(savedTheme || 'Cojus');
            
            if (appInfo && appInfo.icons) iconDataMap = appInfo.icons;
            if (appInfo && appInfo.version) appVersionSpan.textContent = `v${appInfo.version}`;
            
            populateLangDropdown();
            if (savedLang) {
                setLanguage(savedLang);
            } else if (appInfo && appInfo.locale) {
                setLanguage(appInfo.locale.startsWith('ko') ? 'ko' : 'en');
            } else {
                setLanguage('ko');
            }
            
            populateThemeDropdown();

        } catch (error) {
            console.error("Error initializing app:", error);
            appVersionSpan.textContent = 'v-.-.-';
            applyTheme('Cojus');
            setLanguage('en');
        }
    }

    // --- Window & UI Controls ---
    document.getElementById('minimize-btn').addEventListener('click', () => window.electronAPI.minimizeWindow());
    document.getElementById('maximize-btn').addEventListener('click', () => window.electronAPI.maximizeWindow());
    document.getElementById('close-btn').addEventListener('click', () => window.electronAPI.closeWindow());
    
    window.electronAPI.onWindowMaximized(() => { maximizeIcon.classList.add('hidden'); unmaximizeIcon.classList.remove('hidden'); });
    window.electronAPI.onWindowUnmaximized(() => { maximizeIcon.classList.remove('hidden'); unmaximizeIcon.classList.add('hidden'); });

    document.addEventListener('click', (e) => {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) langDropdown.classList.add('hidden');
        if (!themeBtn.contains(e.target) && !themeDropdown.contains(e.target) && !e.target.closest('#theme-dropdown')) themeDropdown.classList.add('hidden');
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
                <h4 class="font-bold text-lg text-[var(--accent-color)]">${category}</h4>
                <div class="pl-2 flex flex-col space-y-1 mt-1">
                    ${vulns.sort((a,b) => (currentLang === 'en' ? a.name_en : a.name).localeCompare(currentLang === 'en' ? b.name_en : b.name)).map(v => {
                        const name = currentLang === 'en' ? v.name_en : v.name;
                        const details = currentLang === 'en' ? v.details_en : v.details;
                        const recommendation = currentLang === 'en' ? v.recommendation_en : v.recommendation_ko;
                        return `<div class="vuln-item text-[var(--text-color)] hover:bg-[var(--button-secondary-hover-bg)] p-1 rounded-md cursor-pointer" data-name="${escapeHtml(name)}" data-details="${escapeHtml(details)}" data-recommendation="${escapeHtml(recommendation)}">${name}</div>`
                    }).join('')}
                </div>
            </div>
        `).join('');
    };

    helpBtn.addEventListener('click', () => { populateHelpModal(); helpModal.classList.remove('hidden'); });

    vulnerabilitiesList.addEventListener('click', (e) => {
        const item = e.target.closest('.vuln-item');
        if (!item) return;
        vulnerabilitiesList.querySelectorAll('.vuln-item').forEach(el => el.classList.remove('bg-[var(--button-primary-bg)]', 'text-white'));
        item.classList.add('bg-[var(--button-primary-bg)]', 'text-white');
        const name = item.dataset.name;
        const details = item.dataset.details;
        const recommendation = item.dataset.recommendation;
        vulnDetailsPanel.innerHTML = `
            <h4 class="font-bold text-lg text-[var(--accent-color)] mb-2">${name}</h4>
            <p class="text-[var(--text-color)] text-sm mb-4">${details}</p>
            <h5 class="font-semibold text-[var(--accent-color)]">${translations[currentLang].recommendation}</h5>
            <p class="text-[var(--text-color)] text-sm">${recommendation}</p>
        `;
    });

    closeModalBtn.addEventListener('click', () => helpModal.classList.add('hidden'));
    helpModal.addEventListener('click', (e) => { if (e.target === helpModal) helpModal.classList.add('hidden'); });

    // --- Core App Logic ---
    const restoreUIState = () => {
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
        
        if (currentFileTree) {
            fileTreeContainer.innerHTML = '';
            fileTreeContainer.appendChild(createTreeElement(currentFileTree));
            updateScanButtonState();
        } else {
            fileTreeContainer.innerHTML = `<p class="text-[var(--text-color-dark)] text-center py-10" data-i18n="selectProjectFolder">${translations[currentLang].selectProjectFolder}</p>`;
        }

        if (currentScanResults) {
            displayResults(currentScanResults);
        } else {
            resultsContainer.innerHTML = `<p class="text-[var(--text-color-dark)] text-center py-10" data-i18n="startScanToSeeResults">${translations[currentLang].startScanToSeeResults}</p>`;
        }
        
        startSimpleScanBtn.disabled = !fileTreeContainer.querySelector('input[type="checkbox"]:checked');
        startPrecisionScanBtn.disabled = !fileTreeContainer.querySelector('input[type="checkbox"]:checked');
    }

    selectDirBtn.addEventListener('click', async () => {
        if (isThemeEditMode) return;
        const data = await window.electronAPI.selectDirectory();
        if (data && data.tree) {
            projectPath = data.path;
            currentFileTree = data.tree;
            fileTreeContainer.innerHTML = '';
            fileTreeContainer.appendChild(createTreeElement(currentFileTree));
            updateScanButtonState();
        } else {
            fileTreeContainer.innerHTML = `<p class="text-[var(--text-color-dark)] text-center py-10">${translations[currentLang].directoryLoadError}</p>`;
        }
    });

    const fileIconMap = {
        '.html': 'html.svg', '.css': 'css.svg', '.js': 'javascript.svg', '.scss': 'scss.svg', '.vue': 'vue.svg', '.php': 'php.svg', '.json': 'json.svg', '.py': 'python.svg', '.ts': 'typescript.svg', '.jsx': 'react.svg', '.tsx': 'react.svg', '.java': 'java.svg', '.env': 'env.svg', '.md': 'markdown.svg',
    };

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
                label.className = 'folder-label flex items-center p-1 rounded-md hover:bg-[var(--button-secondary-hover-bg)]';
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
                label.className = 'flex items-center cursor-pointer p-1 rounded-md hover:bg-[var(--button-secondary-hover-bg)]';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'mr-2 form-checkbox h-4 w-4 bg-gray-900 border-gray-600 rounded focus:ring-green-500 focus:ring-offset-0';
                
                const iconSpan = document.createElement('span');
                iconSpan.className = 'file-icon';
                
                const ext = ('.' + node.name.split('.').pop()).toLowerCase();
                const iconFilename = fileIconMap[ext];

                if (iconFilename && iconDataMap[iconFilename]) {
                    const img = document.createElement('img');
                    img.src = iconDataMap[iconFilename];
                    img.className = 'w-4 h-4';
                    iconSpan.appendChild(img);
                } else {
                    iconSpan.innerHTML = '📄';
                }
                
                const textSpan = document.createElement('span'); textSpan.textContent = node.name;
                label.append(checkbox, iconSpan, textSpan);
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
        exportPdfBtn.classList.add('hidden');
        currentScanResults = null;
        startSimpleScanBtn.disabled = true;
        startPrecisionScanBtn.disabled = true;
        selectDirBtn.disabled = true;
        fileTreeContainer.style.pointerEvents = 'none';

        resultsContainer.innerHTML = `<p class="text-[var(--text-color-dark)] text-center py-10 animate-pulse">${translations[currentLang].scanInProgress}</p>`;
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
        
        if (progressUnsubscribe) progressUnsubscribe();
        progressUnsubscribe = window.electronAPI.onScanProgress(({ progress, file }) => {
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}% - ${file}`;
        });

        try {
            const results = await window.electronAPI.startScan(scanType, { projectPath, filesToScan: checkedFiles });
            currentScanResults = results;
            displayResults(results);
            if(scanType === 'precision') {
                exportPdfBtn.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Scan error:', error);
            if (error.message === 'SEMGREP_NOT_FOUND') {
                resultsContainer.innerHTML = `
                    <div class="text-center py-10 px-4">
                        <h3 class="text-2xl font-bold text-yellow-400 mb-3">${translations[currentLang].semgrepNotFoundTitle}</h3>
                        <p class="text-[var(--text-color)] mb-4">${translations[currentLang].semgrepNotFound}</p>
                        <p class="text-[var(--text-color-dark)]">${translations[currentLang].semgrepInstallInstruction}</p>
                        <code class="block bg-black text-[var(--accent-color)] p-3 rounded-md mt-4 text-left">python -m pip install semgrep</code>
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
            resultsContainer.innerHTML = `<div class="text-center py-10"><h3 class="text-2xl font-bold text-[var(--accent-color)] mb-2">${translations[currentLang].clean}</h3><p class="text-[var(--text-color)]">${translations[currentLang].noVulnerabilitiesFound}</p><h3 class="text-2xl font-bold mt-4">${translations[currentLang].securityScore}: <span class="text-[var(--accent-color)]">100 / 100</span></h3></div>`;
            return;
        }
        const resultAccordion = document.createElement('div');
        resultAccordion.id = 'result-accordion';
        filesWithFindings.forEach(file => {
            const findings = results[file];
            const fileContainer = document.createElement('div');
            fileContainer.className = 'mb-2 bg-[#111] rounded-lg overflow-hidden border border-[var(--border-color)]';
            const fileHeader = document.createElement('button');
            fileHeader.className = 'w-full text-left p-3 bg-[var(--button-secondary-bg)] hover:bg-[var(--button-secondary-hover-bg)] focus:outline-none flex justify-between items-center transition-colors';
            fileHeader.innerHTML = `<span class="font-bold text-gray-100">${file}</span><span class="bg-[var(--button-danger-bg)] text-white text-xs font-bold mr-2 px-2.5 py-0.5 rounded-full">${findings.length} ${translations[currentLang].found}</span>`;
            const findingsContainer = document.createElement('div');
            findingsContainer.className = 'p-4 hidden bg-[var(--secondary-bg)]';
            fileHeader.addEventListener('click', () => findingsContainer.classList.toggle('hidden'));
            findings.forEach((finding) => {
                const findingId = `${file}-${finding.line}-${finding.id}`;
                const findingCard = document.createElement('div');
                findingCard.id = findingId;
                findingCard.dataset.severity = finding.severity;
                const severityStyles = { High: { border: 'border-[var(--severity-high-color)]', bg: 'bg-[var(--severity-high-color)]' }, Medium: { border: 'border-[var(--severity-medium-color)]', bg: 'bg-[var(--severity-medium-color)]' }, Low: { border: 'border-[var(--severity-low-color)]', bg: 'bg-[var(--severity-low-color)]' } };
                const style = severityStyles[finding.severity] || { border: 'border-gray-500', bg: 'bg-gray-500' };
                
                const name = currentLang === 'en' ? (finding.name_en || finding.name) : finding.name;
                const category = currentLang === 'en' ? (finding.category_en || 'General') : (finding.category || '일반');
                const recommendation = currentLang === 'en' ? (finding.recommendation_en || 'N/A') : (finding.recommendation_ko || 'N/A');
                const description = currentLang === 'en' ? (finding.description_en || finding.details_en || finding.description) : finding.description;
                
                findingCard.className = `border-l-4 ${style.border} p-3 mb-3 rounded-r-lg bg-[var(--main-bg)] transition-opacity`;
                findingCard.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="text-lg font-semibold text-gray-100">${name}</h4>
                        <div class="flex items-center flex-shrink-0">
                            <span class="text-xs font-medium px-2 py-1 rounded-md mr-2 bg-gray-600 text-gray-200">${category}</span>
                            <span class="text-sm font-medium px-2 py-1 rounded-md mr-2 ${style.bg} text-white">${finding.severity}</span>
                            <button class="ignore-btn text-xs bg-[var(--button-secondary-bg)] hover:bg-[var(--button-secondary-hover-bg)] px-2 py-1 rounded">${translations[currentLang].ignore}</button>
                        </div>
                    </div>
                    <p class="text-[var(--text-color-dark)] mb-2 text-sm">${description}</p>
                    <div class="bg-[var(--code-bg)] p-3 rounded-md font-mono text-sm text-[var(--code-text)] overflow-x-auto">
                        <code>Line ${finding.line}: ${escapeHtml(finding.code)}</code>
                    </div>
                    <p class="text-[var(--text-color)] mt-3 text-sm"><span class="font-semibold text-[var(--accent-color)]">${translations[currentLang].recommendation}:</span> ${recommendation}</p>
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
        currentSecurityScore = Math.max(0, totalScore);
        const scoreColor = currentSecurityScore > 80 ? 'text-[var(--accent-color)]' : currentSecurityScore > 50 ? 'text-[var(--severity-medium-color)]' : 'text-[var(--severity-high-color)]';
        const scoreElement = document.getElementById('score-element');
        if(scoreElement) {
            scoreElement.innerHTML = `<h3 class="text-2xl font-bold">${translations[currentLang].securityScore}: <span class="${scoreColor}">${currentSecurityScore} / 100</span></h3>`;
        }
    }

    exportPdfBtn.addEventListener('click', () => {
        if (!currentScanResults || !appInfo) {
            console.error("보고서를 생성할 검사 결과나 앱 정보가 없습니다.");
            return;
        }
        window.electronAPI.exportToPDF({
            results: currentScanResults,
            score: currentSecurityScore,
            projectPath: projectPath,
            lang: currentLang,
            version: appInfo.version,
            ignored: Array.from(ignoredFindings)
        });
    });

    function escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return '';
        return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    // --- Run Initialization ---
    initializeApp();
});