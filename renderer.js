// renderer.js
document.addEventListener('DOMContentLoaded', () => {
    // --- 번역 ---
    const translations = {
        ko: {
            codeExplorer: "Code Explorer", selectDirectory: "디렉토리 선택", searchFilesPlaceholder: "파일 검색...", selectAll: "전체 선택", deselectAll: "전체 해제", selectProjectFolder: "프로젝트 폴더를 선택하세요.", vulnerabilityScan: "취약점 검사", startSimpleScan: "단순 검사", startPrecisionScan: "정밀 검사", progress: "진행률", startScanToSeeResults: "검사를 시작하여 취약점 결과를 확인하세요.", helpTitle: "도움말", detectableVulnerabilities: "탐지 가능 취약점 (단순 검사 기준)", clickVulnerabilityToSeeDetails: "왼쪽 목록에서 취약점 항목을 클릭하여 설명을 확인하세요.", supportedExtensions: "지원 확장자", scanInProgress: "검사 중... ", scanComplete: "검사 완료", noVulnerabilitiesFound: "선택한 파일에서 취약점이 발견되지 않았습니다.", clean: "안전!", securityScore: "보안 점수", found: "개 발견", ignore: "무시", ignored: "무시됨", recommendation: "권장 사항", directoryLoadError: "디렉토리를 불러오지 못했습니다.", scanError: "스캔 중 오류 발생", semgrepNotFoundTitle: "Semgrep 설치 필요", semgrepNotFound: "정밀 검사를 사용하려면 Semgrep 엔진이 필요합니다. 시스템에 설치되어 있지 않은 것 같습니다.", semgrepInstallInstruction: "터미널에서 'python -m pip install semgrep' 명령어를 실행하여 설치하세요. 설치 후 프로그램을 다시 시작해야 할 수 있습니다.", exportReport: "보고서 출력", themeEditorTitle: "테마 편집기", themeNamePlaceholder: "테마 이름을 입력하세요", addTheme: "추가", close: "닫기", addCustomTheme: "커스텀 테마 추가", deleteTheme: "삭제", deleteConfirm: "정말 삭제하시겠습니까?", themeLimitError: "커스텀 테마는 최대 3개까지 저장할 수 있습니다. 기존 테마를 삭제해주세요.", themeNameExistsError: "같은 이름의 테마가 이미 존재합니다.", themeNameEmptyError: "테마 이름은 비워둘 수 없습니다.", hoverPreview: "호버", activePreview: "활성화", helpModalPreview: "도움말", urlModalPreview: "URL모달",
            scanOptions: "검사 옵션", ignoreIntegrity: "리소스 무결성 검증 누락 무시", ignoreConsoleLogs: "console.log 경고 무시", ignoreCorsWildcard: "CORS 와일드카드 정책 무시",
            // URL Scan Translations
            startUrlScan: "URL 분석", urlScanTitle: "URL 취약점 분석", urlScanInfoTitle: "주의사항", urlScanInfoCase1Title: "✅ 분석 가능한 경우", urlScanInfoCase1Desc: "HTML, CSS, JavaScript 파일들이 서버에 개별 파일로 배포된 정적 웹사이트. (예: 순수 HTML/CSS/JS, Jekyll, Hugo 기반 사이트)", urlScanInfoCase2Title: "⚠️ 부분적으로 분석 가능한 경우", urlScanInfoCase2Desc: "리액트(React), Vue 등 빌드 과정을 거치는 사이트. 이 경우 빌드된 최종 JavaScript 파일 하나만 분석됩니다. 원본 소스 코드를 분석하려면 '디렉토리 선택' 기능을 사용하세요.", urlScanInfoReasonTitle: "이유", urlScanInfoReasonDesc: "URL 분석은 실제 사용자가 브라우저로 보는 배포된 파일들만 접근할 수 있습니다. 개발용 소스코드(`src` 폴더 등)는 서버에 배포되지 않으므로 URL로 직접 접근하여 분석할 수 없습니다.", urlScanStep1: "1단계: 분석 환경 준비", urlScanSubStep1Title: "메타태그 삽입", urlScanSubStep1Desc: "분석할 사이트의 &lt;head&gt; 태그 안에 아래 메타 태그를 추가하세요.", urlScanSubStep2Title: "cojuscan.js 생성", urlScanSubStep2Desc: "사이트의 루트 경로에 아래와 같이 폴더와 파일을 생성하세요.", urlScanSubStep3Title: "파일 경로 추가 및 배포", urlScanSubStep3Desc: "생성한 cojuscan.js 파일에 분석할 모든 파일의 경로를 추가하세요. 아래 형식들을 지원합니다.", copied: "복사되었습니다!", urlScanStep2: "2단계: URL 입력 및 검사", urlScanStep2Desc: "사이트 배포가 완료되었다면, 분석할 URL을 입력하고 검사를 시작하세요. (예: https://example.com)", startScanAction: "검사 시작", verificationFailed: "소유권 확인 실패. 메타 태그가 정확히 삽입되었는지 확인하세요.", urlFetchFailed: "URL을 가져올 수 없습니다. 주소를 확인하거나 서버 상태를 점검하세요.", invalidUrl: "유효한 URL을 입력해주세요. (https://로 시작)", cojuscanJsNotFound: "`cojuscan/cojuscan.js` 파일을 찾을 수 없습니다. 파일이 정확한 위치에 있고, 서버에서 접근 가능한지 확인하세요.", verifiedUrlListTitle: "검증된 URL 목록", noVerifiedUrls: "검증된 URL이 없습니다.", rescan: "재검사", urlScanResourcesTitle: "URL 분석 리소스", noAnalyzedResources: "분석된 리소스가 없습니다.", notFound: "찾을 수 없음", pathLabel: "경로", versionLabel: "버전",
            Python: "Python", Pip: "Pip", Semgrep: "Semgrep",
            // New Theme Translations
            editTheme: "Edit", exportTheme: "Export", importSharedTheme: "공유 테마 불러오기", sharedThemesTitle: "공유 테마", sharedThemeLimitError: "공유 테마는 최대 3개까지 추가할 수 있습니다.", themeImportError: "테마를 불러오는 데 실패했습니다. 파일이 손상되었거나 형식이 올바르지 않을 수 있습니다.", themeImportSuccess: "테마를 성공적으로 불러왔습니다!", themeNameReadonlyError: "수정 중인 테마의 이름은 변경할 수 없습니다.", themeEdit: "테마 수정", sharedThemeTooltip: "공유된 테마 (수정 불가)", saveChanges: "변경사항 저장",
            // GitHub Translations (NEW)
            selectGithub: "GitHub 저장소",
            githubModalTitle: "GitHub Repository 선택",
            githubStep1: "1단계: GitHub 연동",
            githubStep1Desc: "Cojuscan이 비공개 레포지토리를 포함한 당신의 레포지토리 목록을 불러올 수 있도록 GitHub 계정을 연동하세요.",
            githubLogin: "GitHub 계정으로 연동",
            githubLoggedIn: "연동된 계정:",
            githubLogout: "연동 해제",
            githubStep2: "2단계: 레포지토리 선택",
            githubRepoSearch: "레포지토리 검색...",
            githubStep3: "3단계: 브랜치 선택",
            nextStep: "다음",
            import: "가져오기",
            authSuccess: "인증 성공!",
            fetchingRepos: "레포지토리 목록을 가져오는 중...",
            fetchingBranches: "브랜치 목록을 가져오는 중...",
            downloadingRepo: "레포지토리 다운로드 중...",
            githubAuthFailed: "GitHub 인증에 실패했습니다.",
            // URL List Migration
            migrateUrlsTitle: "기존 URL 목록 연동",
            migrateUrlsDesc: "이전에 저장된 검증된 URL 목록이 있습니다. GitHub 계정에 연동하여 다른 컴퓨터에서도 사용할 수 있도록 하시겠습니까?",
            migrateUrlsConfirm: "예, 연동합니다",
            migrateUrlsCancel: "아니요, 나중에 할게요",
            migrateUrlsSuccess: "URL 목록이 성공적으로 연동되었습니다!",
            migrateUrlsError: "URL 목록 연동 중 오류가 발생했습니다.",

            // Theme Store
            themeStoreTitle: "테마 스토어",
            cojusSpecial: "Cojus-Special",
            freeThemes: "Free",
            uploadTheme: "테마 업로드",
            themeUploadTitle: "테마 업로드",
            themeName: "테마 이름",
            nickname: "닉네임",
            password: "비밀번호",
            previewImage: "대표 이미지 (JPG, JPEG, WEBP)",
            themeFile: "테마 파일 (*.json)",
            cancel: "취소",
            submit: "제출",
            uploadSuccess: "테마가 성공적으로 업로드되었습니다!",
            uploadError: "업로드 실패:",
            fetchingThemes: "테마 목록을 불러오는 중...",
            noThemesFound: "테마가 없습니다.",
            downloadAndApply: "다운로드 & 적용",
            downloading: "다운로드 중...",
            invalidFileType: "잘못된 파일 형식입니다.",
            searchPlaceholder: "검색어를 입력하세요...",
            title: "제목",
            nickname: "닉네임",
            passwordConfirmTitle: "비밀번호 확인",
            confirm: "확인",

            themeVarGroups: {
                "제목 표시줄": ['--title-bar-bg', '--title-bar-text-color', '--title-bar-version-text-color', '--title-bar-button-color', '--title-bar-button-hover-bg', '--title-bar-close-button-hover-bg', '--title-bar-close-button-hover-color'], "배경 & 테두리": ['--main-bg', '--secondary-bg', '--border-color'], "텍스트 & 링크": ['--text-color', '--text-color-dark', '--accent-color', '--link-color'], "기본 버튼": ['--button-primary-bg', '--button-primary-hover-bg', '--button-primary-text', '--button-secondary-bg', '--button-secondary-hover-bg', '--button-danger-bg', '--button-danger-hover-bg'], "검사 버튼": ['--button-scan-simple-bg', '--button-scan-simple-hover-bg', '--button-scan-precision-bg', '--button-scan-precision-hover-bg', '--button-scan-text'], "URL 검사 버튼": ['--button-url-scan-bg', '--button-url-scan-hover-bg', '--button-url-scan-text'], "URL 모달": ['--url-modal-border-color', '--url-modal-header-color', '--url-modal-progress-bar-bg'], "UI 컴포넌트": ['--progress-bar-bg', '--scrollbar-thumb-color', '--scrollbar-track-color', '--severity-high-color', '--severity-medium-color', '--severity-low-color', '--code-bg', '--code-text'], "도움말 모달": ['--help-modal-text-color', '--help-modal-details-bg', '--help-modal-details-text-color'], "상태 & 기타": ['--button-disabled-bg', '--button-disabled-text', '--input-bg'],
            },
            themeVarNames: {
                '--main-bg': '메인 배경', '--secondary-bg': '보조 배경', '--accent-color': '강조 색상', '--text-color': '기본 텍스트', '--text-color-dark': '보조 텍스트', '--border-color': '테두리', '--button-primary-bg': '주요 버튼', '--button-primary-hover-bg': '주요 버튼 (호버)', '--button-primary-text': '주요 버튼 텍스트', '--button-secondary-bg': '보조 버튼', '--button-secondary-hover-bg': '보조 버튼 (호버)', '--button-scan-simple-bg': '단순 검사 버튼', '--button-scan-simple-hover-bg': '단순 검사 (호버)', '--button-scan-precision-bg': '정밀 검사 버튼', '--button-scan-precision-hover-bg': '정밀 검사 (호버)', '--button-scan-text': '검사 버튼 텍스트', '--button-danger-bg': '위험 버튼', '--button-danger-hover-bg': '위험 버튼 (호버)', '--button-disabled-bg': '비활성 버튼', '--button-disabled-text': '비활성 버튼 텍스트', '--input-bg': '입력창 배경', '--progress-bar-bg': '진행률 바', '--scrollbar-thumb-color': '스크롤바 막대', '--scrollbar-track-color': '스크롤바 트랙', '--severity-high-color': '심각도 (높음)', '--severity-medium-color': '심각도 (중간)', '--severity-low-color': '심각도 (낮음)', '--code-bg': '코드 블록 배경', '--code-text': '코드 블록 텍스트', '--link-color': '링크 색상', '--help-modal-text-color': '도움말 모달 텍스트', '--help-modal-details-bg': '도움말 설명 배경', '--help-modal-details-text-color': '도움말 설명 텍스트', '--title-bar-bg': '제목 표시줄 배경', '--title-bar-text-color': '제목', '--title-bar-version-text-color': '버전 텍스트', '--title-bar-button-color': '버튼 아이콘', '--title-bar-button-hover-bg': '버튼 배경(호버)', '--title-bar-close-button-hover-bg': '닫기 버튼 배경(호버)', '--title-bar-close-button-hover-color': '닫기 버튼 아이콘(호버)', '--button-url-scan-bg': 'URL 검사 버튼', '--button-url-scan-hover-bg': 'URL 검사 (호버)', '--button-url-scan-text': 'URL 검사 텍스트', '--url-modal-border-color': 'URL 모달 테두리', '--url-modal-header-color': 'URL 모달 헤더', '--url-modal-progress-bar-bg': 'URL 모달 진행률 바',
            }
        },
        en: {
            codeExplorer: "Code Explorer", selectDirectory: "Select Directory", searchFilesPlaceholder: "Search files...", selectAll: "Select All", deselectAll: "Deselect All", selectProjectFolder: "Select a project folder.", vulnerabilityScan: "Vulnerability Scan", startSimpleScan: "Simple Scan", startPrecisionScan: "Precision Scan", progress: "Progress", startScanToSeeResults: "Start a scan to see vulnerability results.", helpTitle: "Help", detectableVulnerabilities: "Detectable Vulnerabilities (Simple Scan basis)", clickVulnerabilityToSeeDetails: "Click a vulnerability from the list on the left to see details.", supportedExtensions: "Supported Extensions", scanInProgress: "Scanning...", scanComplete: "Scan Complete", noVulnerabilitiesFound: "No vulnerabilities found in selected files.", clean: "Clean!", securityScore: "Security Score", found: "found", ignore: "Ignore", ignored: "Ignored", recommendation: "Recommendation", directoryLoadError: "Failed to load the directory.", scanError: "An error occurred during the scan", semgrepNotFoundTitle: "Semgrep Installation Required", semgrepNotFound: "The Precision Scan feature requires the Semgrep engine, which does not appear to be installed on your system.", semgrepInstallInstruction: "Please install it by running 'python -m pip install semgrep' in your terminal. You may need to restart the application after installation.", exportReport: "Export Report", themeEditorTitle: "Theme Editor", themeNamePlaceholder: "Enter theme name", addTheme: "Add", close: "Close", addCustomTheme: "Add Custom Theme", deleteTheme: "Delete", deleteConfirm: "Are you sure you want to delete?", themeLimitError: "You can save up to 3 custom themes. Please delete an existing one.", themeNameExistsError: "A theme with the same name already exists.", themeNameEmptyError: "Theme name cannot be empty.", hoverPreview: "Hover", activePreview: "Active", helpModalPreview: "Help", urlModalPreview: "URL Modal",
            scanOptions: "Scan Options", ignoreIntegrity: "Ignore Missing Integrity Checks", ignoreConsoleLogs: "Ignore console.log Warnings", ignoreCorsWildcard: "Ignore CORS Wildcard Policy",
            // URL Scan Translations
            startUrlScan: "URL Scan", urlScanTitle: "URL Vulnerability Scan", urlScanInfoTitle: "Please Note", urlScanInfoCase1Title: "✅ Fully Scannable Cases", urlScanInfoCase1Desc: "Static websites where HTML, CSS, and JavaScript files are deployed individually. (e.g., pure HTML/CSS/JS, Jekyll, or Hugo-based sites).", urlScanInfoCase2Title: "⚠️ Partially Scannable Cases", urlScanInfoCase2Desc: "Sites that go through a build process, like React or Vue. In this case, only the final bundled JavaScript file will be analyzed. To analyze the original source code, please use the 'Select Directory' feature.", urlScanInfoReasonTitle: "The Reason", urlScanInfoReasonDesc: "URL scanning can only access files that are publicly deployed and visible to a user's browser. Development source code (like the `src` folder) is not deployed to the server and thus cannot be accessed directly via a URL.", urlScanStep1: "Step 1: Prepare for Analysis", urlScanSubStep1Title: "Insert Meta Tag", urlScanSubStep1Desc: "Add the meta tag below to your site's &lt;head&gt; tag.", urlScanSubStep2Title: "Create cojuscan.js", urlScanSubStep2Desc: "Create the folder and file in your site's root directory as shown below.", urlScanSubStep3Title: "Add File Paths & Deploy", urlScanSubStep3Desc: "In the created cojuscan.js file, add the paths of all files to be analyzed. The following formats are supported.", copied: "Copied!", urlScanStep2: "Step 2: Enter URL and Scan", urlScanStep2Desc: "Once the site is deployed, enter the URL to analyze and start the scan. (e.g., https://example.com)", startScanAction: "Start Scan", verificationFailed: "Ownership verification failed. Please ensure the meta tag is inserted correctly.", urlFetchFailed: "Could not fetch the URL. Check the address or server status.", invalidUrl: "Please enter a valid URL (starting with https://).", cojuscanJsNotFound: "Could not find `cojuscan/cojuscan.js`. Please ensure the file is in the correct location and accessible on the server.", verifiedUrlListTitle: "Verified URL List", noVerifiedUrls: "No verified URLs.", rescan: "Re-scan", urlScanResourcesTitle: "URL Scan Resources", noAnalyzedResources: "No resources analyzed.",
            // New Theme Translations
            editTheme: "Edit", exportTheme: "Export", importSharedTheme: "Import Shared Theme", sharedThemesTitle: "Shared Themes", sharedThemeLimitError: "You can add up to 3 shared themes.", themeImportError: "Failed to import theme. The file may be corrupt or in the wrong format.", themeImportSuccess: "Theme imported successfully!", themeNameReadonlyError: "The name of a theme being edited cannot be changed.", themeEdit: "Edit Theme", sharedThemeTooltip: "Shared theme (not editable)", saveChanges: "Save Changes",
            // GitHub Translations (NEW)
            selectGithub: "GitHub Repository",
            githubModalTitle: "Select GitHub Repository",
            githubStep1: "Step 1: Connect to GitHub",
            githubStep1Desc: "Connect your GitHub account to allow Cojuscan to fetch your list of repositories, including private ones.",
            githubLogin: "Connect with GitHub",
            githubLoggedIn: "Connected as:",
            githubLogout: "Disconnect",
            githubStep2: "Step 2: Select Repository",
            githubRepoSearch: "Search repositories...",
            githubStep3: "Step 3: Select Branch",
            nextStep: "Next",
            import: "Import",
            authSuccess: "Authentication successful!",
            fetchingRepos: "Fetching repositories...",
            fetchingBranches: "Fetching branches...",
            downloadingRepo: "Downloading repository...",
            githubAuthFailed: "GitHub authentication failed.",
            // URL List Migration
            migrateUrlsTitle: "Migrate Existing URLs",
            migrateUrlsDesc: "You have previously saved verified URLs. Would you like to migrate them to your GitHub account for use on other computers?",
            migrateUrlsConfirm: "Yes, migrate them",
            migrateUrlsCancel: "No, maybe later",
            migrateUrlsSuccess: "URLs successfully migrated!",
            migrateUrlsError: "An error occurred during URL migration.",

            // Theme Store
            themeStoreTitle: "Theme Store",
            cojusSpecial: "Cojus-Special",
            freeThemes: "Free",
            uploadTheme: "Upload Theme",
            themeUploadTitle: "Theme Upload",
            themeName: "Theme Name",
            nickname: "Nickname",
            password: "Password",
            previewImage: "Preview Image (JPG, JPEG, WEBP)",
            themeFile: "Theme File (*.json)",
            cancel: "Cancel",
            submit: "Submit",
            uploadSuccess: "Theme uploaded successfully!",
            uploadError: "Upload failed:",
            fetchingThemes: "Fetching themes...",
            noThemesFound: "No themes found.",
            downloadAndApply: "Download & Apply",
            downloading: "Downloading...",
            invalidFileType: "Invalid file type.",
            searchPlaceholder: "Enter search term...",
            title: "Title",
            nickname: "Nickname",
            passwordConfirmTitle: "Password Confirmation",
            confirm: "Confirm",

            themeVarGroups: {
                "Title Bar": ['--title-bar-bg', '--title-bar-text-color', '--title-bar-version-text-color', '--title-bar-button-color', '--title-bar-button-hover-bg', '--title-bar-close-button-hover-bg', '--title-bar-close-button-hover-color'], "Background & Borders": ['--main-bg', '--secondary-bg', '--border-color'], "Text & Links": ['--text-color', '--text-color-dark', '--accent-color', '--link-color'], "Standard Buttons": ['--button-primary-bg', '--button-primary-hover-bg', '--button-primary-text', '--button-secondary-bg', '--button-secondary-hover-bg', '--button-danger-bg', '--button-danger-hover-bg'], "Scan Buttons": ['--button-scan-simple-bg', '--button-scan-simple-hover-bg', '--button-scan-precision-bg', '--button-scan-precision-hover-bg', '--button-scan-text'], "URL Scan Buttons": ['--button-url-scan-bg', '--button-url-scan-hover-bg', '--button-url-scan-text'], "URL Modal": ['--url-modal-border-color', '--url-modal-header-color', '--url-modal-progress-bar-bg'], "UI Components": ['--progress-bar-bg', '--scrollbar-thumb-color', '--scrollbar-track-color', '--severity-high-color', '--severity-medium-color', '--severity-low-color', '--code-bg', '--code-text'], "Help Modal": ['--help-modal-text-color', '--help-modal-details-bg', '--help-modal-details-text-color'], "State & Misc": ['--button-disabled-bg', '--button-disabled-text', '--input-bg'],
            },
            themeVarNames: {
                '--main-bg': 'Main BG', '--secondary-bg': 'Secondary BG', '--accent-color': 'Accent', '--text-color': 'Text', '--text-color-dark': 'Muted Text', '--border-color': 'Border', '--button-primary-bg': 'Primary Button', '--button-primary-hover-bg': 'Primary Button (Hover)', '--button-primary-text': 'Primary Button Text', '--button-secondary-bg': 'Secondary Button', '--button-secondary-hover-bg': 'Secondary Button (Hover)', '--button-scan-simple-bg': 'Simple Scan Button', '--button-scan-simple-hover-bg': 'Simple Scan (Hover)', '--button-scan-precision-bg': 'Precision Scan Button', '--button-scan-precision-hover-bg': 'Precision Scan (Hover)', '--button-scan-text': 'Scan Button Text', '--button-danger-bg': 'Danger Button', '--button-danger-hover-bg': 'Danger Button (Hover)', '--button-disabled-bg': 'Disabled Button', '--button-disabled-text': 'Disabled Button Text', '--input-bg': 'Input BG', '--progress-bar-bg': 'Progress Bar', '--scrollbar-thumb-color': 'Scrollbar Thumb', '--scrollbar-track-color': 'Scrollbar Track', '--severity-high-color': 'Severity (High)', '--severity-medium-color': 'Severity (Medium)', '--severity-low-color': 'Severity (Low)', '--code-bg': 'Code Block BG', '--code-text': 'Code Block Text', '--link-color': 'Link Color', '--help-modal-text-color': 'Modal Text', '--help-modal-details-bg': 'Modal Details BG', '--help-modal-details-text-color': 'Modal Details Text', '--title-bar-bg': 'Title Bar BG', '--title-bar-text-color': 'Title Text', '--title-bar-version-text-color': 'Version Text', '--title-bar-button-color': 'Button Icon', '--title-bar-button-hover-bg': 'Button BG (Hover)', '--title-bar-close-button-hover-bg': 'Close BG (Hover)', '--title-bar-close-button-hover-color': 'Close Icon (Hover)', '--button-url-scan-bg': 'URL Scan Button', '--button-url-scan-hover-bg': 'URL Scan (Hover)', '--button-url-scan-text': 'URL Scan Text', '--url-modal-border-color': 'URL Modal Border', '--url-modal-header-color': 'URL Modal Header', '--url-modal-progress-bar-bg': 'URL Modal Progress',
            }
        }
    };

    let currentLang = 'ko';
    let appInfo = null;
    let iconDataMap = {};

    // --- 요소 선택자 ---
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

    // --- 스캔 옵션 요소 ---
    const scanOptionsToggle = getEl('scan-options-toggle');
    const scanOptionsDropdown = getEl('scan-options-dropdown');
    const ignoreIntegrityCheck = getEl('ignore-integrity-check');
    const ignoreConsoleLogCheck = getEl('ignore-console-log-check');
    const ignoreCorsWildcardCheck = getEl('ignore-cors-wildcard-check');
    
    // --- URL 스캔 요소 ---
    const startUrlScanBtn = getEl('start-scan-url-btn');
    const urlScanModal = getEl('url-scan-modal');
    const closeUrlModalBtn = getEl('close-url-modal-btn');
    const urlScanMetaTagContainer = getEl('url-scan-meta-tag-container');
    const urlScanMetaTagSpan = getEl('url-scan-meta-tag');
    const copyFeedbackSpan = getEl('copy-feedback');
    const urlScanInput = getEl('url-scan-input');
    const urlScanStartBtn = getEl('url-scan-start-btn');
    const urlScanProgressContainer = getEl('url-scan-progress-container');
    const urlScanProgressBar = getEl('url-scan-progress-bar');
    const urlScanProgressText = getEl('url-scan-progress-text');
    const urlScanErrorMessage = getEl('url-scan-error-message');
    const verifiedUrlListContainer = getEl('verified-url-list');
    const urlScanCodeBlockContainer = getEl('url-scan-code-block-container');
    const urlScanCodeBlock = getEl('url-scan-code-block');
    const codeBlockCopyFeedback = getEl('code-block-copy-feedback');
    const urlScanInfoBtn = getEl('url-scan-info-btn');
    const urlScanInfoPanel = getEl('url-scan-info-panel');
    const urlScanMainContent = getEl('url-scan-main-content');

    // --- GitHub 스캔 요소 (신규) ---
    const selectGithubBtn = getEl('select-github-btn');
    const githubModal = getEl('github-modal');
    const closeGithubModalBtn = getEl('close-github-modal-btn');
    const githubStep1 = getEl('github-step-1');
    const githubStep2 = getEl('github-step-2');
    const githubStep3 = getEl('github-step-3');
    const githubLoginBtn = getEl('github-login-btn');
    const githubUserInfo = getEl('github-user-info');
    const githubUsername = getEl('github-username');
    const githubLogoutBtn = getEl('github-logout-btn');
    const githubRepoSearch = getEl('github-repo-search');
    const githubRepoList = getEl('github-repo-list');
    const githubBranchList = getEl('github-branch-list');
    const githubModalFooter = getEl('github-modal-footer');
    const githubLoading = getEl('github-loading');
    const githubLoadingText = getEl('github-loading-text');
    const githubActionButtons = getEl('github-action-buttons');
    const githubNextStepBtn = getEl('github-next-step-btn');
    const githubImportBtn = getEl('github-import-btn');

    // --- 환경 상태 모달 요소 ---
    const envStatusBtn = getEl('env-status-btn');
    const envStatusModal = getEl('env-status-modal');
    const closeEnvStatusModalBtn = getEl('close-env-status-modal-btn');
    const envStatusContent = getEl('env-status-content');
    
    // --- 테마 요소 ---
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
    const helpModalPreviewToggle = getEl('help-modal-preview-toggle');
    const urlModalPreviewToggle = getEl('url-modal-preview-toggle');
    const themeEditorTitleEl = getEl('theme-editor-title');

    // --- 테마 스토어 요소 ---
    const themeStoreBtn = getEl('theme-store-btn');
    const themeStoreModal = getEl('theme-store-modal');
    const closeThemeStoreBtn = getEl('close-theme-store-btn');
    const cojusSpecialTab = getEl('cojus-special-tab');
    const freeThemesTab = getEl('free-themes-tab');
    const themeStoreContent = getEl('theme-store-content');
    const uploadThemeBtn = getEl('upload-theme-btn');
    const themeUploadModal = getEl('theme-upload-modal');
    const closeThemeUploadBtn = getEl('close-theme-upload-btn');
    const themeUploadForm = getEl('theme-upload-form');
    const cancelUploadBtn = getEl('cancel-upload-btn');
    const uploadErrorMessage = getEl('upload-error-message');
    const themeSearchContainer = getEl('theme-search-container');
    const themeSearchType = getEl('theme-search-type');
    const themeSearchInput = getEl('theme-search-input');
    const themeSearchBtn = getEl('theme-search-btn');

    // --- 비밀번호 확인 모달 요소 ---
    const passwordConfirmModal = getEl('password-confirm-modal');
    const closePasswordConfirmModalBtn = getEl('close-password-confirm-modal-btn');
    const passwordConfirmInput = getEl('password-confirm-input');
    const passwordConfirmErrorMessage = getEl('password-confirm-error-message');
    const passwordConfirmCancelBtn = getEl('password-confirm-cancel-btn');
    const passwordConfirmSubmitBtn = getEl('password-confirm-submit-btn');

    // --- URL 마이그레이션 모달 요소 (신규) ---
    const urlMigrationModal = getEl('url-migration-modal');
    const migrateUrlsConfirmBtn = getEl('migrate-urls-confirm-btn');
    const migrateUrlsCancelBtn = getEl('migrate-urls-cancel-btn');

    let projectPath = '';
    let currentScannedUrl = ''; 
    let currentScanResults = null;
    let currentFilteredScanResults = null;
    let currentSecurityScore = 0;
    const ignoredFindings = new Set();
    let progressUnsubscribe = null;
    let urlProgressUnsubscribe = null;
    let currentFileTree = null;
    let newUrlVerificationToken = '';
    let verifiedUrls = []; // 로컬 저장소의 verifiedUrls
    let githubUser = null; // GitHub 사용자 정보

    // --- GitHub 상태 (신규) ---
    let githubCurrentStep = 1;
    let githubRepos = [];
    let selectedRepo = null;
    let selectedBranch = null;

    // =================================================================
    // 테마 관리
    // =================================================================
    const themes = {
        Cojus: {
            '--main-bg': '#0D0D0D', '--secondary-bg': '#1A1A1A', '--accent-color': '#00FF41', '--text-color': '#E0E0E0', '--text-color-dark': '#9ca3af', '--border-color': '#2a2a2a', '--button-primary-bg': '#166534', '--button-primary-hover-bg': '#15803d', '--button-primary-text': '#ffffff', '--button-secondary-bg': '#374151', '--button-secondary-hover-bg': '#4b5563', '--button-scan-simple-bg': '#2563eb', '--button-scan-simple-hover-bg': '#3b82f6', '--button-scan-precision-bg': '#16a34a', '--button-scan-precision-hover-bg': '#22c55e', '--button-scan-text': '#ffffff', '--button-danger-bg': '#dc2626', '--button-danger-hover-bg': '#ef4444', '--button-disabled-bg': '#4b5563', '--button-disabled-text': '#9ca3af', '--input-bg': '#1f2937', '--progress-bar-bg': '#00FF41', '--scrollbar-thumb-color': '#00FF41', '--scrollbar-track-color': '#1A1A1A', '--severity-high-color': '#ef4444', '--severity-medium-color': '#f59e0b', '--severity-low-color': '#3b82f6', '--code-bg': 'rgba(0,0,0,0.4)', '--code-text': '#facc15', '--link-color': '#3b82f6',
            '--help-modal-text-color': '#E0E0E0', '--help-modal-details-bg': '#000000', '--help-modal-details-text-color': '#E0E0E0',
            '--title-bar-bg': '#000000', '--title-bar-text-color': '#E0E0E0', '--title-bar-version-text-color': '#9ca3af', '--title-bar-button-color': '#E0E0E0', '--title-bar-button-hover-bg': '#374151', '--title-bar-close-button-hover-bg': '#dc2626', '--title-bar-close-button-hover-color': '#FFFFFF',
            '--button-url-scan-bg': '#8b5cf6', '--button-url-scan-hover-bg': '#7c3aed', '--button-url-scan-text': '#ffffff',
            '--url-modal-border-color': '#8b5cf6', '--url-modal-header-color': '#a78bfa', '--url-modal-progress-bar-bg': '#8b5cf6',
            '--background-filter-color': '#ffffffba'
        },
        StarLight: {
            '--main-bg': '#000000', '--secondary-bg': '#111111', '--accent-color': '#00e5ff', '--text-color': '#e0e0e0', '--text-color-dark': '#888888', '--border-color': '#222222', '--button-primary-bg': '#005f6b', '--button-primary-hover-bg': '#008c9e', '--button-primary-text': '#ffffff', '--button-secondary-bg': '#2a2a2a', '--button-secondary-hover-bg': '#3a3a3a', '--button-scan-simple-bg': '#0077b6', '--button-scan-simple-hover-bg': '#0096c7', '--button-scan-precision-bg': '#00b5a4', '--button-scan-precision-hover-bg': '#00d4c2', '--button-scan-text': '#ffffff', '--button-danger-bg': '#b60045', '--button-danger-hover-bg': '#d60051', '--button-disabled-bg': '#333333', '--button-disabled-text': '#777777', '--input-bg': '#1f1f1f', '--progress-bar-bg': '#00e5ff', '--scrollbar-thumb-color': '#00e5ff', '--scrollbar-track-color': '#111111', '--severity-high-color': '#ff4d6d', '--severity-medium-color': '#ffaf00', '--severity-low-color': '#00e5ff', '--code-bg': 'rgba(0, 229, 255, 0.1)', '--code-text': '#ade8f4', '--link-color': '#00e5ff',
            '--help-modal-text-color': '#e0e0e0', '--help-modal-details-bg': '#080808', '--help-modal-details-text-color': '#e0e0e0',
            '--title-bar-bg': '#000000', '--title-bar-text-color': '#e0e0e0', '--title-bar-version-text-color': '#888888', '--title-bar-button-color': '#e0e0e0', '--title-bar-button-hover-bg': '#3a3a3a', '--title-bar-close-button-hover-bg': '#b60045', '--title-bar-close-button-hover-color': '#FFFFFF',
            '--button-url-scan-bg': '#00a9e0', '--button-url-scan-hover-bg': '#00c3ff', '--button-url-scan-text': '#ffffff',
            '--url-modal-border-color': '#00e5ff', '--url-modal-header-color': '#70d8ff', '--url-modal-progress-bar-bg': '#00a9e0',
        },
        PlumDark: {
            '--main-bg': '#0c0b0f', '--secondary-bg': '#1d1924', '--accent-color': '#cc99cc', '--text-color': '#e0e0e0', '--text-color-dark': '#a9a1b3', '--border-color': '#332d3b', '--button-primary-bg': '#5c3d5c', '--button-primary-hover-bg': '#754d75', '--button-primary-text': '#ffffff', '--button-secondary-bg': '#3c3547', '--button-secondary-hover-bg': '#4d445a', '--button-scan-simple-bg': '#8e44ad', '--button-scan-simple-hover-bg': '#9b59b6', '--button-scan-precision-bg': '#663366', '--button-scan-precision-hover-bg': '#7d3f7d', '--button-scan-text': '#ffffff', '--button-danger-bg': '#a13a53', '--button-danger-hover-bg': '#b84461', '--button-disabled-bg': '#4a4155', '--button-disabled-text': '#888094', '--input-bg': '#2b2533', '--progress-bar-bg': '#cc99cc', '--scrollbar-thumb-color': '#cc99cc', '--scrollbar-track-color': '#1d1924', '--severity-high-color': '#e74c3c', '--severity-medium-color': '#f39c12', '--severity-low-color': '#3498db', '--code-bg': 'rgba(204, 153, 204, 0.1)', '--code-text': '#e1bee7', '--link-color': '#cc99cc',
            '--help-modal-text-color': '#e0e0e0', '--help-modal-details-bg': '#100e14', '--help-modal-details-text-color': '#e0e0e0',
            '--title-bar-bg': '#0c0b0f', '--title-bar-text-color': '#e0e0e0', '--title-bar-version-text-color': '#a9a1b3', '--title-bar-button-color': '#e0e0e0', '--title-bar-button-hover-bg': '#4d445a', '--title-bar-close-button-hover-bg': '#a13a53', '--title-bar-close-button-hover-color': '#FFFFFF',
            '--button-url-scan-bg': '#9b59b6', '--button-url-scan-hover-bg': '#8e44ad', '--button-url-scan-text': '#ffffff',
            '--url-modal-border-color': '#cc99cc', '--url-modal-header-color': '#d1a1d1', '--url-modal-progress-bar-bg': '#9b59b6',
        }
    };
    let customThemes = {};
    let sharedThemes = {};
    let activeThemeName = 'Cojus';
    let isThemeEditMode = false;
    let editingThemeName = null; // 현재 편집 중인 테마를 추적
    let themeToRestore = 'Cojus';

    // 헥스 코드를 RGB로 변환하는 헬퍼 함수
    const hexToRgb = (hex) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    };

    const applyTheme = (themeName) => {
        const allThemes = { ...themes, ...customThemes, ...sharedThemes };
        const themeObject = allThemes[themeName];
        if (!themeObject) {
            console.error(`테마 "${themeName}"를 찾을 수 없습니다. 기본값으로 되돌립니다.`);
            applyTheme('Cojus');
            return;
        }

        const themeProperties = themeObject.theme && typeof themeObject.theme === 'object' ? themeObject.theme : themeObject;

        // 각 테마 속성을 document.documentElement (즉 :root)에 직접 CSS 변수로 설정
        for (const key in themeProperties) {
            if (themeProperties.hasOwnProperty(key)) {
                document.documentElement.style.setProperty(key, themeProperties[key]);
            }
        }
        activeThemeName = themeName;

        // 메인 배경 밝기에 따라 파일 목록 오버레이 색상 결정
        const mainBgColor = themeProperties['--main-bg'];
        let overlayRgb = '0, 0, 0'; // 밝은 배경의 기본값은 검정
        if (mainBgColor) {
            let r, g, b;
            if (mainBgColor.startsWith('#')) {
                const rgb = hexToRgb(mainBgColor);
                if (rgb) [r, g, b] = rgb.split(',').map(Number);
            } else if (mainBgColor.startsWith('rgb')) {
                const match = mainBgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (match) [r, g, b] = match.slice(1).map(Number);
            }

            if (r !== undefined) {
                // 휘도 계산 (인지되는 밝기)
                const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                if (luminance > 0.5) { // 배경이 밝으면 어두운 오버레이 사용
                    overlayRgb = '0, 0, 0';
                } else { // 배경이 어두우면 밝은 오버레이 사용
                    overlayRgb = '255, 255, 255';
                }
            }
        }
        document.documentElement.style.setProperty('--file-list-overlay-rgb', overlayRgb);

        // 특별 테마 배경 처리
        document.body.classList.remove('cojus-special-background'); // 이전 구현 정리
        document.body.style.backgroundImage = '';

        const imageUrlToUse = themeObject.local_background_image_url || themeObject.background_image_url;

        if (themeObject.isSpecial && imageUrlToUse) {
            // Windows에서는 경로 구분자를 \로 사용해야 CSS에서 제대로 인식합니다.
            const cssFriendlyUrl = imageUrlToUse.replace(/\\/g, '/');
            document.documentElement.style.setProperty('--special-theme-bg-url', `url('file://${cssFriendlyUrl}')`);
            fileTreeContainer.classList.add('cojus-special-background');
        } else {
            document.documentElement.style.setProperty('--special-theme-bg-url', 'none');
            fileTreeContainer.classList.remove('cojus-special-background');
        }
    };

    const saveAndApplyTheme = (themeName) => {
        applyTheme(themeName);
        window.electronAPI.setSetting('activeTheme', themeName);
    };

    const populateThemeDropdown = () => {
        themeDropdown.innerHTML = '';
        const createSeparator = () => {
            const hr = document.createElement('hr');
            hr.className = 'border-t border-[var(--border-color)] my-1';
            themeDropdown.appendChild(hr);
        };
    
        // 기본 테마
        Object.keys(themes).forEach(name => {
            const item = document.createElement('a');
            item.href = '#';
            item.className = 'block px-4 py-2 text-sm text-[var(--text-color)] hover:bg-[var(--button-secondary-hover-bg)]';
            item.textContent = name;
            item.addEventListener('click', (e) => { e.preventDefault(); saveAndApplyTheme(name); themeDropdown.classList.add('hidden'); });
            themeDropdown.appendChild(item);
        });
    
        // 커스텀 테마
        if (Object.keys(customThemes).length > 0) {
            createSeparator();
            Object.keys(customThemes).forEach(name => {
                const item = document.createElement('div');
                item.className = 'flex justify-between items-center text-sm text-[var(--text-color)] hover:bg-[var(--button-secondary-hover-bg)] group';
                
                // 긴 테마 이름 애니메이션
                const nameLink = document.createElement('a');
                nameLink.href = '#';
                // 이 'a' 태그는 애니메이션의 컨테이너 역할을 합니다.
                nameLink.className = 'block py-2 px-4 theme-name-container';
                nameLink.title = name; // 호버 툴팁에 전체 이름 표시
                nameLink.addEventListener('click', (e) => { e.preventDefault(); saveAndApplyTheme(name); themeDropdown.classList.add('hidden'); });

                // 텍스트를 담고 애니메이션될 내부 span
                const nameText = document.createElement('span');
                nameText.textContent = name;
                nameText.className = 'theme-name-text';

                nameLink.appendChild(nameText);
    
                const btnGroup = document.createElement('div');
                // 버튼 그룹이 찌그러지지 않도록 보장
                btnGroup.className = 'pr-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0';
                
                const btnClasses = 'text-xs px-1.5 py-0.5 rounded mx-0.5';
                const editBtn = document.createElement('button');
                editBtn.textContent = translations[currentLang].editTheme;
                editBtn.className = `${btnClasses} bg-blue-600 hover:bg-blue-500`;
                editBtn.onclick = (e) => { e.stopPropagation(); themeDropdown.classList.add('hidden'); enterThemeEditMode(name); };
    
                const exportBtn = document.createElement('button');
                exportBtn.textContent = translations[currentLang].exportTheme;
                exportBtn.className = `${btnClasses} bg-green-600 hover:bg-green-500`;
                exportBtn.onclick = (e) => { e.stopPropagation(); handleExportTheme(name); };
    
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '×';
                deleteBtn.title = translations[currentLang].deleteTheme;
                deleteBtn.className = `${btnClasses} bg-red-600 hover:bg-red-500 font-bold`;
                deleteBtn.onclick = (e) => { e.stopPropagation(); handleDeleteTheme(name, 'custom'); };
                
                btnGroup.append(editBtn, exportBtn, deleteBtn);
                // 이전 'nameSpan'을 새 'nameLink'로 교체
                item.append(nameLink, btnGroup);
                themeDropdown.appendChild(item);
            });
        }
    
        // 공유 테마
        if (Object.keys(sharedThemes).length > 0) {
            createSeparator();
            const title = document.createElement('div');
            title.textContent = translations[currentLang].sharedThemesTitle;
            title.className = 'px-4 pt-2 pb-1 text-xs font-bold text-[var(--text-color-dark)]';
            themeDropdown.appendChild(title);
            Object.keys(sharedThemes).forEach(name => {
                const item = document.createElement('div');
                item.className = 'flex justify-between items-center text-sm text-[var(--text-color)] hover:bg-[var(--button-secondary-hover-bg)] group';
                
                const nameSpan = document.createElement('a');
                nameSpan.href = '#';
                nameSpan.className = 'flex-grow px-4 py-2 flex items-center';
                nameSpan.innerHTML = `${name} <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 7zm2 7a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>`;
                nameSpan.title = translations[currentLang].sharedThemeTooltip;
                nameSpan.addEventListener('click', (e) => { e.preventDefault(); saveAndApplyTheme(name); themeDropdown.classList.add('hidden'); });
    
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '×';
                deleteBtn.title = translations[currentLang].deleteTheme;
                deleteBtn.className = 'mr-2 font-bold text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity';
                deleteBtn.onclick = (e) => { e.stopPropagation(); handleDeleteTheme(name, 'shared'); };
                
                item.append(nameSpan, deleteBtn);
                themeDropdown.appendChild(item);
            });
        }
    
        createSeparator();
        
        // 액션 버튼
        const addCustomBtn = document.createElement('a');
        addCustomBtn.href = '#';
        addCustomBtn.className = 'block px-4 py-2 text-sm text-[var(--accent-color)] hover:bg-[var(--button-secondary-hover-bg)]';
        addCustomBtn.textContent = `+ ${translations[currentLang].addCustomTheme}`;
        addCustomBtn.addEventListener('click', (e) => { e.preventDefault(); themeDropdown.classList.add('hidden'); enterThemeEditMode(); });
        themeDropdown.appendChild(addCustomBtn);
        
        const importBtn = document.createElement('a');
        importBtn.href = '#';
        importBtn.className = 'block px-4 py-2 text-sm text-[var(--accent-color)] hover:bg-[var(--button-secondary-hover-bg)]';
        importBtn.textContent = `+ ${translations[currentLang].importSharedTheme}`;
        importBtn.addEventListener('click', (e) => { e.preventDefault(); themeDropdown.classList.add('hidden'); handleImportTheme(); });
        themeDropdown.appendChild(importBtn);
    };

    const enterThemeEditMode = (themeNameToEdit = null) => {
        isThemeEditMode = true;
        editingThemeName = themeNameToEdit;
        themeToRestore = activeThemeName;

        let baseThemeName;
        if (editingThemeName) {
            themeEditorTitleEl.textContent = translations[currentLang].themeEdit;
            saveThemeBtn.textContent = translations[currentLang].saveChanges;
            customThemeNameInput.value = editingThemeName;
            customThemeNameInput.readOnly = true;
            customThemeNameInput.classList.add('bg-gray-700', 'cursor-not-allowed');
            baseThemeName = editingThemeName;
        } else {
            themeEditorTitleEl.textContent = translations[currentLang].addCustomTheme;
            saveThemeBtn.textContent = translations[currentLang].addTheme;
            baseThemeName = activeThemeName;
        }

        document.body.classList.add('theme-editing-active');
        themeEditorPanel.classList.remove('hidden');
        themeEditorMessage.textContent = '';
        
        if (!editingThemeName) {
            setTimeout(() => {
                customThemeNameInput.value = '';
                customThemeNameInput.readOnly = false;
                customThemeNameInput.classList.remove('bg-gray-700', 'cursor-not-allowed');
                customThemeNameInput.focus();
            }, 0); 
        }

        const currentThemeObject = { ...themes, ...customThemes, ...sharedThemes }[baseThemeName];
        
        Object.entries(currentThemeObject).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
        
        themeEditorProperties.innerHTML = '';
        const themeVarGroups = translations[currentLang].themeVarGroups;

        for(const groupName in themeVarGroups) {
            const groupWrapper = document.createElement('div');
            groupWrapper.className = 'pr-4';

            const groupTitle = document.createElement('h4');
            groupTitle.textContent = groupName;
            groupTitle.className = 'text-sm font-bold text-[#00FF41] mb-2 col-span-full border-b border-gray-700 pb-1';
            groupWrapper.appendChild(groupTitle);

            themeVarGroups[groupName].forEach(key => {
                const value = currentThemeObject[key] || '#ffffff';
                const propContainer = document.createElement('div');
                propContainer.className = 'flex items-center justify-between text-xs mb-1.5';

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
                <h4 class="text-lg font-semibold">${'Severity Finding ' + (i+1)}</h4>
                <div class="bg-[var(--code-bg)] p-2 my-1 rounded-md font-mono text-sm text-[var(--code-text)]"><code>Line ${42+i}: some_dummy_code();</code></div>
            </div>`).join('');
        resultsContainer.innerHTML = dummyResultItems;

        populateHelpModal();
        renderVerifiedUrlList();

        hoverPreviewToggle.checked = false;
        activePreviewToggle.checked = false;
        helpModalPreviewToggle.checked = false;
        urlModalPreviewToggle.checked = false;
        toggleButtonPreviews();
    };

    const exitThemeEditMode = (restore = true) => {
        isThemeEditMode = false;
        editingThemeName = null;
        document.body.classList.remove('theme-editing-active');
        themeEditorPanel.classList.add('hidden');

        customThemeNameInput.value = ''; // 입력창의 텍스트를 비웁니다.
        customThemeNameInput.readOnly = false; // 읽기 전용 속성을 해제합니다.
        customThemeNameInput.classList.remove('bg-gray-700', 'cursor-not-allowed'); // 비활성화 스타일을 제거합니다.

        hoverPreviewToggle.checked = false;
        activePreviewToggle.checked = false;
        helpModalPreviewToggle.checked = false;
        urlModalPreviewToggle.checked = false;
        
        if (restore) {
            applyTheme(themeToRestore);
        }
        
        restoreUIState();
    };
    
    const saveCustomTheme = async () => {
        const name = customThemeNameInput.value.trim();
        themeEditorMessage.textContent = '';
    
        if (editingThemeName && name !== editingThemeName) {
            themeEditorMessage.textContent = translations[currentLang].themeNameReadonlyError;
            return;
        }
    
        if (!editingThemeName) { // 새 테마에 대해서만 확인
            if (!name) { themeEditorMessage.textContent = translations[currentLang].themeNameEmptyError; return; }
            if (themes[name] || customThemes[name] || sharedThemes[name]) { themeEditorMessage.textContent = translations[currentLang].themeNameExistsError; return; }
            if (Object.keys(customThemes).length >= 3) { themeEditorMessage.textContent = translations[currentLang].themeLimitError; return; }
        }
    
        const themeToSave = {};
        const baseThemeKeys = Object.keys(themes['Cojus']);
        baseThemeKeys.forEach(key => {
            themeToSave[key] = document.documentElement.style.getPropertyValue(key).trim() || getComputedStyle(document.documentElement).getPropertyValue(key).trim();
        });
    
        const themeName = editingThemeName || name;
        customThemes[themeName] = themeToSave;
    
        await window.electronAPI.setSetting('customThemes', customThemes);
        populateThemeDropdown();
        saveAndApplyTheme(themeName);
        exitThemeEditMode(false);
    };

    const handleExportTheme = async (themeName) => {
        const themeData = { name: themeName, theme: customThemes[themeName] };
        const result = await window.electronAPI.exportTheme(themeData);
        if (!result.success) {
            alert(result.message);
        }
    };

    const handleImportTheme = async () => {
        if (Object.keys(sharedThemes).length >= 3) {
            alert(translations[currentLang].sharedThemeLimitError);
            return;
        }

        const importedData = await window.electronAPI.importTheme();
        if (importedData && importedData.name && importedData.theme) {
            const { name, theme } = importedData;
            if (themes[name] || customThemes[name] || sharedThemes[name]) {
                alert(translations[currentLang].themeNameExistsError);
                return;
            }
            sharedThemes[name] = theme;
            await window.electronAPI.setSetting('sharedThemes', sharedThemes);
            alert(translations[currentLang].themeImportSuccess);
            populateThemeDropdown();
        } else if (importedData !== null) { // Null은 사용자가 취소했음을 의미
            alert(translations[currentLang].themeImportError);
        }
    };

    const handleDeleteTheme = async (themeName, themeType) => {
        // 커스텀 confirm 모달을 사용하도록 변경
        const confirmDelete = await showConfirmModal(`${themeName} ${translations[currentLang].deleteConfirm}`);
        if (!confirmDelete) return;

        if (themeType === 'custom') {
            delete customThemes[themeName];
            await window.electronAPI.setSetting('customThemes', customThemes);
        } else if (themeType === 'shared') {
            const themeToDelete = sharedThemes[themeName];
            if (themeToDelete && themeToDelete.local_background_image_url) {
                await window.electronAPI.deleteBackgroundImage(themeToDelete.local_background_image_url);
            }
            delete sharedThemes[themeName];
            await window.electronAPI.setSetting('sharedThemes', sharedThemes);
        }

        populateThemeDropdown();
        if (activeThemeName === themeName) {
            saveAndApplyTheme('Cojus');
        }
    };
    
    const toggleButtonPreviews = () => {
        const isHover = hoverPreviewToggle.checked;
        const isActive = activePreviewToggle.checked;

        const scanButtons = [startSimpleScanBtn, startPrecisionScanBtn, startUrlScanBtn];
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
            { el: startUrlScanBtn, cls: 'preview-hover-url' },
        ];

        hoverButtons.forEach(item => {
            item.el.classList.remove(item.cls);
            if(isHover) {
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

    helpModalPreviewToggle.addEventListener('change', () => {
        if (helpModalPreviewToggle.checked) {
            helpModal.classList.remove('hidden');
        } else {
            helpModal.classList.add('hidden');
        }
    });

    urlModalPreviewToggle.addEventListener('change', () => {
        if (urlModalPreviewToggle.checked) {
            urlScanModal.classList.remove('hidden');
        } else {
            urlScanModal.classList.add('hidden');
        }
    });

    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.add('hidden');
        scanOptionsDropdown.classList.add('hidden');
        themeDropdown.classList.toggle('hidden');
    });

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.add('hidden');
        scanOptionsDropdown.classList.add('hidden');
        langDropdown.classList.toggle('hidden');
    });

    closeThemeEditorBtn.addEventListener('click', () => exitThemeEditMode());
    saveThemeBtn.addEventListener('click', saveCustomTheme);

    // =================================================================
    // 테마 스토어
    // =================================================================
    let activeThemeTab = 'cojustheme';

    const switchThemeTab = (tab) => {
        activeThemeTab = tab;
        if (tab === 'cojustheme') {
            cojusSpecialTab.classList.add('border-[var(--accent-color)]', 'text-[var(--accent-color)]');
            cojusSpecialTab.classList.remove('border-transparent', 'text-[var(--text-color-dark)]');
            freeThemesTab.classList.add('border-transparent', 'text-[var(--text-color-dark)]');
            freeThemesTab.classList.remove('border-[var(--accent-color)]', 'text-[var(--accent-color)]');
            uploadThemeBtn.classList.add('hidden');
            themeSearchContainer.classList.add('hidden');
        } else {
            freeThemesTab.classList.add('border-[var(--accent-color)]', 'text-[var(--accent-color)]');
            freeThemesTab.classList.remove('border-transparent', 'text-[var(--text-color-dark)]');
            cojusSpecialTab.classList.add('border-transparent', 'text-[var(--text-color-dark)]');
            cojusSpecialTab.classList.remove('border-[var(--accent-color)]', 'text-[var(--accent-color)]');
            uploadThemeBtn.classList.remove('hidden');
            themeSearchContainer.classList.remove('hidden');
        }
        themeSearchInput.value = ''; // 탭 전환 시 검색어 초기화
        fetchAndDisplayThemes();
    };

    const fetchAndDisplayThemes = async (searchTerm = '', searchType = 'title') => {
        themeStoreContent.innerHTML = `<p class="text-center py-10">${translations[currentLang].fetchingThemes}</p>`;
        try {
            let themes = await window.electronAPI.fetchThemeStore(activeThemeTab);

            if (searchTerm) {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                themes = themes.filter(theme => {
                    if (searchType === 'title') {
                        return theme.name.toLowerCase().includes(lowerCaseSearchTerm);
                    } else if (searchType === 'nickname') {
                        return theme.nickname && theme.nickname.toLowerCase().includes(lowerCaseSearchTerm);
                    }
                    return false;
                });
            }

            if (themes.length === 0) {
                themeStoreContent.innerHTML = `<p class="text-center py-10">${translations[currentLang].noThemesFound}</p>`;
                return;
            }

            themeStoreContent.innerHTML = '';
            const grid = document.createElement('div');
            grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';

            for (const theme of themes) {
                const card = document.createElement('div');
                card.className = 'bg-[var(--main-bg)] rounded-lg border border-[var(--border-color)] overflow-hidden flex flex-col';
                
                let actionButtonsHtml = '';
                if (activeThemeTab === 'freetheme') {
                    actionButtonsHtml = `
                        <div class="absolute">
                            <div class="relative group">
                                <button class="p-1 rounded-full hover:bg-[var(--button-secondary-hover-bg)] focus:outline-none theme-actions-btn" data-theme-id="${theme.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-[var(--text-color)]"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                                </button>
                                <div class="theme-actions-dropdown hidden absolute left-0 mt-2 w-32 bg-[var(--secondary-bg)] border border-[var(--border-color)] rounded-md shadow-lg z-10">
                                    <button class="block w-full text-left px-4 py-2 text-sm text-[var(--text-color)] hover:bg-[var(--button-secondary-hover-bg)] edit-free-theme-btn" data-theme-id="${theme.id}" data-theme-name="${theme.name}" data-theme-nickname="${theme.nickname}" data-theme-json-url="${theme.json_url}" data-theme-image-url="${theme.image_url}">${translations[currentLang].editTheme}</button>
                                    <button class="block w-full text-left px-4 py-2 text-sm text-[var(--text-color)] hover:bg-[var(--button-secondary-hover-bg)] delete-free-theme-btn" data-theme-id="${theme.id}" data-theme-name="${theme.name}">${translations[currentLang].deleteTheme}</button>
                                </div>
                            </div>
                        </div>
                    `;
                }

                const isCojusSpecial = activeThemeTab === 'cojustheme';
                const eventBadge = isCojusSpecial ? '<span class="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">EVENT</span>' : '';

                card.innerHTML = `
                    <div class="relative">
                        <img src="${theme.image_url}" alt="${theme.name}" class="w-full h-40 object-cover">
                        ${eventBadge}
                    </div>
                    <div class="p-4 flex flex-col flex-grow">
                        <h3 class="text-lg font-bold text-[var(--text-color)] truncate">${theme.name}</h3>
                        ${activeThemeTab === 'freetheme' ? `<p class="text-sm text-[var(--text-color-dark)] mt-1">by ${theme.nickname}</p>` : ''}
                        <div class="mt-auto pt-4">
                            <button class="download-theme-btn w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200" data-json-url="${theme.json_url}" data-theme-name="${theme.name}" data-is-special="${isCojusSpecial}" data-background-image-url="${theme.background_image_url || ''}">${translations[currentLang].downloadAndApply}</button>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            }
            themeStoreContent.appendChild(grid);

            // 새 버튼에 이벤트 리스너 추가
            if (activeThemeTab === 'freetheme') {
                themeStoreContent.querySelectorAll('.theme-actions-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const dropdown = button.closest('.group').querySelector('.theme-actions-dropdown');
                        // 다른 모든 열린 드롭다운 닫기
                        document.querySelectorAll('.theme-actions-dropdown').forEach(d => {
                            if (d !== dropdown) d.classList.add('hidden');
                        });
                        dropdown.classList.toggle('hidden');
                    });
                });

                themeStoreContent.querySelectorAll('.edit-free-theme-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const themeData = {
                            id: button.dataset.themeId,
                            name: button.dataset.themeName,
                            nickname: button.dataset.themeNickname,
                            json_url: button.dataset.themeJsonUrl,
                            image_url: button.dataset.themeImageUrl
                        };
                        button.closest('.theme-actions-dropdown').classList.add('hidden');

                        const verifyPasswordAndOpen = async (password) => {
                            try {
                                // 비밀번호 확인을 위해 변경사항 없이 업데이트 시도
                                const result = await window.electronAPI.updateFreeTheme({
                                    id: themeData.id,
                                    name: themeData.name,
                                    nickname: themeData.nickname,
                                    password: password,
                                    imageFile: null,
                                    jsonFile: null,
                                });

                                if (result.success) {
                                    // 성공 시 수정 모달 열기
                                    openThemeUploadModalForEdit(themeData, password);
                                } else {
                                    // 실패 시 비밀번호 모달 다시 열고 에러 표시
                                    passwordConfirmErrorMessage.textContent = result.message || '비밀번호가 일치하지 않습니다.';
                                    passwordConfirmInput.value = '';
                                    passwordConfirmModal.classList.remove('hidden');
                                    // 콜백을 다시 설정하여 재시도 가능하게 함
                                    passwordConfirmCallback = verifyPasswordAndOpen;
                                }
                            } catch (error) {
                                alert(`인증 중 오류 발생: ${error.message}`);
                            }
                        };

                        promptPasswordAndExecute(verifyPasswordAndOpen);
                    });
                });

                themeStoreContent.querySelectorAll('.delete-free-theme-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const themeId = button.dataset.themeId;
                        const themeName = button.dataset.themeName;
                        // 비밀번호 확인 후 삭제 처리 함수 호출
                        promptPasswordAndExecute((password) => handleDeleteFreeTheme(themeId, themeName, password));
                        button.closest('.theme-actions-dropdown').classList.add('hidden');
                    });
                });

                // 문서의 다른 곳을 클릭하면 드롭다운 닫기
                document.addEventListener('click', (e) => {
                    if (!e.target.closest('.theme-actions-dropdown') && !e.target.closest('.theme-actions-btn')) {
                        document.querySelectorAll('.theme-actions-dropdown').forEach(d => d.classList.add('hidden'));
                    }
                });
            }

        } catch (error) {
            console.error('테마 가져오기 오류:', error);
            themeStoreContent.innerHTML = `<p class="text-red-400 text-center py-10">${error.message}</p>`;
        }
    };

    themeStoreContent.addEventListener('click', async (e) => {
        const downloadBtn = e.target.closest('.download-theme-btn');
        if (downloadBtn) {
            const themeName = downloadBtn.dataset.themeName;
            const jsonUrl = downloadBtn.dataset.jsonUrl;
            const isSpecial = downloadBtn.dataset.isSpecial === 'true';
            const backgroundImageUrl = downloadBtn.dataset.backgroundImageUrl;

            if (themes[themeName] || customThemes[themeName] || sharedThemes[themeName]) {
                alert(translations[currentLang].themeNameExistsError);
                return;
            }

            if (Object.keys(sharedThemes).length >= 3) {
                alert(translations[currentLang].sharedThemeLimitError);
                return;
            }

            downloadBtn.disabled = true;
            downloadBtn.textContent = translations[currentLang].downloading;

            try {
                // 1. 테마 JSON 파일 다운로드
                const response = await fetch(jsonUrl);
                if (!response.ok) throw new Error('테마 파일 다운로드 실패.');
                const themeFileData = await response.json();

                if (!themeFileData.theme || typeof themeFileData.theme !== 'object') {
                    throw new Error('잘못된 테마 파일 형식');
                }

                // 2. 특별 테마인 경우 배경 이미지 로컬 다운로드
                let localBackgroundImageUrl = null;
                if (isSpecial && backgroundImageUrl) {
                    try {
                        localBackgroundImageUrl = await window.electronAPI.downloadBackgroundImage(backgroundImageUrl);
                    } catch (imgError) {
                        console.error('배경 이미지 다운로드 실패, 이미지 없이 진행:', imgError);
                        // 선택적으로 사용자에게 배경 다운로드 실패를 알림
                    }
                }

                // 3. 저장할 전체 테마 객체 구성
                const themeToStore = {
                    name: themeName,
                    theme: themeFileData.theme,
                    isSpecial: isSpecial,
                    // 원본 및 로컬 URL 모두 저장
                    background_image_url: backgroundImageUrl || null,
                    local_background_image_url: localBackgroundImageUrl
                };

                // 4. 테마 저장 및 적용
                sharedThemes[themeName] = themeToStore;
                await window.electronAPI.setSetting('sharedThemes', sharedThemes);
                populateThemeDropdown();
                saveAndApplyTheme(themeName);
                themeStoreModal.classList.add('hidden');

            } catch (error) {
                console.error('테마 다운로드 또는 적용 실패:', error);
                alert(error.message);
            } finally {
                downloadBtn.disabled = false;
                downloadBtn.textContent = translations[currentLang].downloadAndApply;
            }
        }
    });

    themeStoreBtn.addEventListener('click', () => {
        themeStoreModal.classList.remove('hidden');
        switchThemeTab('cojustheme');
    });

    closeThemeStoreBtn.addEventListener('click', () => themeStoreModal.classList.add('hidden'));
    cojusSpecialTab.addEventListener('click', () => switchThemeTab('cojustheme'));
    freeThemesTab.addEventListener('click', () => switchThemeTab('freetheme'));

    uploadThemeBtn.addEventListener('click', () => {
        themeUploadModal.classList.remove('hidden');
        themeUploadForm.reset();
        uploadErrorMessage.textContent = '';
    });

    closeThemeUploadBtn.addEventListener('click', () => themeUploadModal.classList.add('hidden'));
    cancelUploadBtn.addEventListener('click', () => themeUploadModal.classList.add('hidden'));

    let currentEditingTheme = null; // 편집 중인 테마를 저장

    const openThemeUploadModalForEdit = (themeData, password = '') => {
        currentEditingTheme = { ...themeData, password: password };
        getEl('upload-theme-name').value = themeData.name;
        getEl('upload-nickname').value = themeData.nickname;
        // 보안상의 이유로 비밀번호 및 파일 입력은 미리 채우지 않음
        getEl('upload-password').value = '';
        getEl('upload-image-file').value = ''; // 파일 입력 지우기
        getEl('upload-json-file').value = ''; // 파일 입력 지우기

        // 편집을 위해 모달 제목 및 제출 버튼 텍스트 변경
        getEl('themeUploadTitle').textContent = translations[currentLang].editTheme; // 이 번역 키가 있다고 가정
        getEl('submit-upload-btn').textContent = translations[currentLang].saveChanges; // 이 번역 키가 있다고 가정

        themeUploadModal.classList.remove('hidden');
        uploadErrorMessage.textContent = '';
    };

    const handleDeleteFreeTheme = async (themeId, themeName, password) => {
        try {
            const result = await window.electronAPI.deleteFreeTheme({ id: themeId, password: password });
            if (result.success) {
                alert(`${themeName} 테마가 성공적으로 삭제되었습니다.`);
                fetchAndDisplayThemes(); // 목록 새로고침
            } else {
                throw new Error(result.message || '테마 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('삭제 오류:', error);
            alert(`테마 삭제 중 오류 발생: ${error.message}`);
        }
    };

    themeUploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        uploadErrorMessage.textContent = '';
        const submitBtn = e.target.querySelector('#submit-upload-btn');
        submitBtn.disabled = true;

        const name = getEl('upload-theme-name').value;
        const nickname = getEl('upload-nickname').value;
        const password = getEl('upload-password').value;
        const imageFile = getEl('upload-image-file').files[0];
        const jsonFile = getEl('upload-json-file').files[0];

        if (!name || !nickname || !password) { // 편집 시 파일은 선택 사항
            uploadErrorMessage.textContent = '테마 이름, 닉네임, 비밀번호는 필수 입력입니다.';
            submitBtn.disabled = false;
            return;
        }

        try {
            let result;
            if (currentEditingTheme) {
                // 기존 테마 편집
                result = await window.electronAPI.updateFreeTheme({
                    id: currentEditingTheme.id,
                    name, nickname, password: currentEditingTheme.password,
                    imageFile: imageFile ? { path: imageFile.path, type: imageFile.type } : null,
                    jsonFile: jsonFile ? { path: jsonFile.path, type: jsonFile.type } : null,
                });
            } else {
                // 새 테마 업로드
                if (!imageFile || !jsonFile) {
                    uploadErrorMessage.textContent = '새 테마 업로드 시에는 대표 이미지와 테마 파일이 필수입니다.';
                    submitBtn.disabled = false;
                    return;
                }
                result = await window.electronAPI.uploadTheme({
                    name, nickname, password,
                    imageFile: { path: imageFile.path, type: imageFile.type },
                    jsonFile: { path: jsonFile.path, type: jsonFile.type },
                });
            }

            if (result.success) {
                alert(translations[currentLang].uploadSuccess);
                themeUploadModal.classList.add('hidden');
                fetchAndDisplayThemes(); // 목록 새로고침
            } else {
                throw new Error(result.message || '업로드/수정 실패');
            }
        } catch (error) {
            console.error('업로드/편집 오류:', error);
            uploadErrorMessage.textContent = `${translations[currentLang].uploadError} ${error.message}`;
        } finally {
            submitBtn.disabled = false;
            // 수정 실패 시 상태를 초기화하지 않도록 수정
            if (!uploadErrorMessage.textContent || uploadErrorMessage.textContent.trim() === '') {
                currentEditingTheme = null; // 성공 시에만 초기화
                // 원래 모달 제목 및 버튼 텍스트 복원
                getEl('themeUploadTitle').textContent = translations[currentLang].themeUploadTitle;
                getEl('submit-upload-btn').textContent = translations[currentLang].submit;
            }
        }
    });

    themeSearchBtn.addEventListener('click', () => {
        const searchTerm = themeSearchInput.value.trim();
        const searchType = themeSearchType.value;
        fetchAndDisplayThemes(searchTerm, searchType);
    });

    themeSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            themeSearchBtn.click();
        }
    });

    // =================================================================
    // 비밀번호 확인 모달
    // =================================================================
    let passwordConfirmCallback = null;

    const promptPasswordAndExecute = (callback) => {
        passwordConfirmCallback = callback;
        passwordConfirmInput.value = '';
        passwordConfirmErrorMessage.textContent = '';
        passwordConfirmModal.classList.remove('hidden');
    };

    closePasswordConfirmModalBtn.addEventListener('click', () => {
        passwordConfirmModal.classList.add('hidden');
        passwordConfirmCallback = null;
    });

    passwordConfirmCancelBtn.addEventListener('click', () => {
        passwordConfirmModal.classList.add('hidden');
        passwordConfirmCallback = null;
    });

    passwordConfirmSubmitBtn.addEventListener('click', () => {
        const password = passwordConfirmInput.value;
        if (!password) {
            passwordConfirmErrorMessage.textContent = '비밀번호를 입력해주세요.';
            return;
        }
        passwordConfirmModal.classList.add('hidden');
        if (passwordConfirmCallback) {
            passwordConfirmCallback(password);
        }
        passwordConfirmCallback = null;
    });

    passwordConfirmInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            passwordConfirmSubmitBtn.click();
        }
    });

    // 커스텀 확인 모달 (네이티브 alert/confirm 대체)
    const showConfirmModal = (message) => {
        return new Promise(resolve => {
            const modalHtml = `
                <div id="custom-confirm-modal" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div class="bg-[var(--secondary-bg)] rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col border-2 border-[var(--accent-color)]">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-bold text-[var(--accent-color)]">확인</h2>
                            <button class="text-2xl text-[var(--text-color-dark)] hover:text-white close-btn">&times;</button>
                        </div>
                        <p class="text-[var(--text-color)] mb-6">${message}</p>
                        <div class="flex justify-end space-x-2">
                            <button class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg cancel-btn">취소</button>
                            <button class="bg-[var(--button-primary-bg)] hover:bg-[var(--button-primary-hover-bg)] text-white font-bold py-2 px-4 rounded-lg confirm-btn">확인</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            const modal = getEl('custom-confirm-modal');

            const cleanup = () => {
                modal.remove();
            };

            modal.querySelector('.confirm-btn').addEventListener('click', () => {
                resolve(true);
                cleanup();
            });
            modal.querySelector('.cancel-btn').addEventListener('click', () => {
                resolve(false);
                cleanup();
            });
            modal.querySelector('.close-btn').addEventListener('click', () => {
                resolve(false);
                cleanup();
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    resolve(false);
                    cleanup();
                }
            });
        });
    };

    // =================================================================
    // URL 마이그레이션 모달
    // =================================================================
    const showUrlMigrationModal = () => {
        urlMigrationModal.classList.remove('hidden');
    };

    const hideUrlMigrationModal = () => {
        urlMigrationModal.classList.add('hidden');
    };

    migrateUrlsConfirmBtn.addEventListener('click', async () => {
        hideUrlMigrationModal();
        if (!githubUser) {
            // GitHub 로그인이 안 되어 있으면 로그인 요청
            const authConfirmed = await showConfirmModal(translations[currentLang].githubLogin);
            if (authConfirmed) {
                try {
                    await window.electronAPI.startGitHubAuth();
                    githubUser = await window.electronAPI.getGitHubUser(); // 다시 사용자 정보 가져오기
                    if (githubUser) {
                        await migrateLocalUrlsToSupabase(githubUser.id);
                    } else {
                        showConfirmModal(translations[currentLang].githubAuthFailed);
                    }
                } catch (error) {
                    console.error('GitHub 인증 실패:', error);
                    showConfirmModal(translations[currentLang].githubAuthFailed);
                }
            }
        } else {
            await migrateLocalUrlsToSupabase(githubUser.id);
        }
    });

    migrateUrlsCancelBtn.addEventListener('click', () => {
        hideUrlMigrationModal();
        // 사용자가 마이그레이션을 취소해도 로컬 URL 목록은 유지
        renderVerifiedUrlList();
    });

    const migrateLocalUrlsToSupabase = async (userId) => {
        try {
            for (const urlEntry of verifiedUrls) {
                await window.electronAPI.addVerifiedUrl(userId, urlEntry.url, urlEntry.token);
            }
            // 마이그레이션 성공 후 로컬 저장소 비우기
            verifiedUrls = [];
            await window.electronAPI.setSetting('verifiedUrls', []);
            await fetchVerifiedUrlsFromSupabase(); // Supabase에서 최신 목록 다시 불러오기
            showConfirmModal(translations[currentLang].migrateUrlsSuccess);
        } catch (error) {
            console.error('URL 마이그레이션 중 오류 발생:', error);
            showConfirmModal(`${translations[currentLang].migrateUrlsError}: ${error.message}`);
        }
    };

    const fetchVerifiedUrlsFromSupabase = async () => {
        if (githubUser) {
            const result = await window.electronAPI.fetchVerifiedUrls(githubUser.id);
            if (result.success) {
                verifiedUrls = result.data;
            } else {
                console.error('Supabase에서 검증된 URL을 불러오는 데 실패했습니다:', result.message);
                verifiedUrls = []; // 실패 시 목록 초기화
            }
        } else {
            verifiedUrls = []; // GitHub 로그인 안 되어 있으면 비움
        }
        renderVerifiedUrlList();
    };


    // =================================================================
    // 언어 관리 및 초기화
    // =================================================================

    const setLanguage = (lang) => {
        if (!['ko', 'en'].includes(lang)) lang = 'ko';
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                 el.innerHTML = translations[lang][key];
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        if (!isThemeEditMode) {
            if (!helpModal.classList.contains('hidden')) {
                populateHelpModal();
            }
            if (!envStatusModal.classList.contains('hidden')) {
                populateEnvStatusModal();
            }
            if (currentScanResults) {
                displayResults(currentScanResults);
            }
            populateThemeDropdown();
            renderVerifiedUrlList();
        }
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
            // 1. 모든 설정을 개별적으로 로드하여 안정성을 높입니다.
            appInfo = await window.electronAPI.getAppInfo();
            const settingPromises = await Promise.allSettled([
                window.electronAPI.getSetting('language'),
                window.electronAPI.getSetting('activeTheme'),
                window.electronAPI.getSetting('customThemes'), // customThemes를 불러옵니다.
                window.electronAPI.getSetting('sharedThemes'),
                window.electronAPI.getSetting('verifiedUrls')
            ]);

            const getSettledValue = (result) => result.status === 'fulfilled' ? result.value : null;

            const savedLang = getSettledValue(settingPromises[0]);
            const savedTheme = getSettledValue(settingPromises[1]);
            let savedCustomThemes = getSettledValue(settingPromises[2]); // let으로 변경
            const savedSharedThemes = getSettledValue(settingPromises[3]);
            const savedVerifiedUrls = getSettledValue(settingPromises[4]);

            // 불러온 customThemes가 객체(Object)가 아니거나 null일 경우, 빈 객체로 강제 초기화하여 데이터 오염을 막습니다.
            if (typeof savedCustomThemes !== 'object' || savedCustomThemes === null || Array.isArray(savedCustomThemes)) {
                console.log('손상된 customThemes 데이터를 감지하여 빈 객체로 초기화합니다.');
                savedCustomThemes = {};
            }

            // 2. 불러온 데이터로 전역 변수를 설정합니다.
            customThemes = savedCustomThemes; // 이제 항상 안전한 객체입니다.
            if (savedSharedThemes) sharedThemes = savedSharedThemes;
            
            if (appInfo && appInfo.icons) iconDataMap = appInfo.icons;
            if (appInfo && appInfo.version) appVersionSpan.textContent = `v${appInfo.version}`;

            // 3. GitHub 사용자 정보 로드 및 URL 목록 처리
            githubUser = await window.electronAPI.getGitHubUser();

            if (savedVerifiedUrls && savedVerifiedUrls.length > 0) {
                // 기존 로컬 URL 목록이 존재하고 GitHub에 로그인되어 있지 않거나,
                // GitHub에 로그인되어 있지만 아직 마이그레이션하지 않은 경우
                if (!githubUser) {
                    verifiedUrls = savedVerifiedUrls; // 로컬 목록 사용
                    showUrlMigrationModal(); // 마이그레이션 여부 묻기
                } else {
                    // GitHub에 로그인되어 있으면 Supabase에서 URL 목록 가져오기 시도
                    const result = await window.electronAPI.fetchVerifiedUrls(githubUser.id);
                    if (result.success && result.data.length > 0) {
                        verifiedUrls = result.data; // Supabase 목록 사용
                        // 로컬 목록과 Supabase 목록이 다르면 마이그레이션 제안
                        const localUrlsSet = new Set(savedVerifiedUrls.map(u => u.url));
                        const supabaseUrlsSet = new Set(result.data.map(u => u.url));
                        const needsMigration = savedVerifiedUrls.some(u => !supabaseUrlsSet.has(u.url));
                        if (needsMigration) {
                            showUrlMigrationModal();
                        } else {
                            // 로컬 목록이 Supabase 목록과 동일하거나 Supabase에 이미 다 있으면 로컬 목록 비우기
                            await window.electronAPI.setSetting('verifiedUrls', []);
                        }
                    } else {
                        // Supabase에 목록이 없으면 로컬 목록 사용 및 마이그레이션 제안
                        verifiedUrls = savedVerifiedUrls;
                        showUrlMigrationModal();
                    }
                }
            } else if (githubUser) {
                // 로컬 목록은 없지만 GitHub에 로그인되어 있으면 Supabase에서 목록 가져오기
                await fetchVerifiedUrlsFromSupabase();
            } else {
                // 둘 다 없으면 빈 목록
                verifiedUrls = [];
            }
            
            // 4. UI를 그립니다.
            populateLangDropdown();
            
            const initialLang = savedLang || (appInfo?.locale?.startsWith('ko') ? 'ko' : 'en');
            setLanguage(initialLang);
            
            applyTheme(savedTheme || 'Cojus');
            populateThemeDropdown();

        } catch (error) {
            console.error("initializeApp에서 심각한 오류 발생:", error);
            // 오류 발생 시 최소한의 기본값으로 설정
            customThemes = {}; // 오류 시에도 객체로 초기화
            populateLangDropdown();
            setLanguage('en');
            applyTheme('Cojus');
            populateThemeDropdown();
        }
    }


    // --- 창 및 UI 컨트롤 ---
    document.getElementById('minimize-btn').addEventListener('click', () => window.electronAPI.minimizeWindow());
    document.getElementById('maximize-btn').addEventListener('click', () => window.electronAPI.maximizeWindow());
    document.getElementById('close-btn').addEventListener('click', () => window.electronAPI.closeWindow());
    
    window.electronAPI.onWindowMaximized(() => { maximizeIcon.classList.add('hidden'); unmaximizeIcon.classList.remove('hidden'); });
    window.electronAPI.onWindowUnmaximized(() => { maximizeIcon.classList.remove('hidden'); unmaximizeIcon.classList.add('hidden'); });

    document.addEventListener('click', (e) => {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) langDropdown.classList.add('hidden');
        if (!themeBtn.contains(e.target) && !themeDropdown.contains(e.target) && !e.target.closest('#theme-dropdown')) themeDropdown.classList.add('hidden');
        if (!scanOptionsToggle.contains(e.target) && !scanOptionsDropdown.contains(e.target)) {
            scanOptionsDropdown.classList.add('hidden');
            scanOptionsToggle.classList.remove('open');
        }
    });

    // --- 스캔 옵션 드롭다운 ---
    scanOptionsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.add('hidden');
        themeDropdown.classList.add('hidden');
        scanOptionsDropdown.classList.toggle('hidden');
        scanOptionsToggle.classList.toggle('open');
    });

    const refilterResults = () => {
        if (currentScanResults) {
            displayResults(currentScanResults);
        }
    };

    ignoreIntegrityCheck.addEventListener('change', refilterResults);
    ignoreConsoleLogCheck.addEventListener('change', refilterResults);
    ignoreCorsWildcardCheck.addEventListener('change', refilterResults);

    // --- 도움말 모달 ---
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
                        return `<div class="vuln-item text-[var(--help-modal-text-color)] hover:bg-[var(--button-secondary-hover-bg)] p-1 rounded-md cursor-pointer" data-name="${escapeHtml(name)}" data-details="${escapeHtml(details)}" data-recommendation="${escapeHtml(recommendation)}">${name}</div>`
                    }).join('')}
                </div>
            </div>
        `).join('');

        vulnDetailsPanel.innerHTML = `<p data-i18n="clickVulnerabilityToSeeDetails">${translations[currentLang].clickVulnerabilityToSeeDetails}</p>`;
    };

    helpBtn.addEventListener('click', () => { 
        if(isThemeEditMode) return;
        populateHelpModal(); 
        helpModal.classList.remove('hidden'); 
    });

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
            <p class="text-sm mb-4">${details}</p>
            <h5 class="font-semibold text-[var(--accent-color)]">${translations[currentLang].recommendation}</h5>
            <p class="text-sm">${recommendation}</p>
        `;
    });

    closeModalBtn.addEventListener('click', () => helpModal.classList.add('hidden'));
    helpModal.addEventListener('click', (e) => { if (e.target === helpModal) helpModal.classList.add('hidden'); });

    // --- URL 스캔 모달 로직 ---
    urlScanInfoBtn.addEventListener('click', () => {
        urlScanInfoPanel.classList.toggle('w-1/3');
        urlScanInfoPanel.classList.toggle('w-0');
        urlScanInfoPanel.classList.toggle('p-4');
        urlScanInfoPanel.classList.toggle('p-0');
        urlScanMainContent.classList.toggle('w-full');
        urlScanMainContent.classList.toggle('w-2/3');
    });

    startUrlScanBtn.addEventListener('click', () => {
        if(urlScanInfoPanel.classList.contains('w-1/3')) {
            urlScanInfoBtn.click();
        }
        
        newUrlVerificationToken = crypto.randomUUID();
        urlScanMetaTagSpan.textContent = `<meta name="cojuscan-verification" content="${newUrlVerificationToken}">`;
        
        urlScanInput.value = '';
        urlScanErrorMessage.textContent = '';
        urlScanProgressContainer.classList.add('hidden');
        urlScanProgressBar.style.width = '0%';
        urlScanProgressText.textContent = '';
        urlScanStartBtn.disabled = false;

        renderVerifiedUrlList();
        urlScanModal.classList.remove('hidden');
    });

    closeUrlModalBtn.addEventListener('click', () => urlScanModal.classList.add('hidden'));
    urlScanModal.addEventListener('click', (e) => { if (e.target === urlScanModal) urlScanModal.classList.add('hidden'); });

    urlScanMetaTagContainer.addEventListener('click', () => {
        navigator.clipboard.writeText(urlScanMetaTagSpan.textContent).then(() => {
            copyFeedbackSpan.textContent = translations[currentLang].copied;
            copyFeedbackSpan.classList.remove('opacity-0');
            setTimeout(() => {
                copyFeedbackSpan.classList.add('opacity-0');
            }, 2000);
        });
    });

    urlScanCodeBlockContainer.addEventListener('click', () => {
        const codeText = Array.from(urlScanCodeBlock.childNodes)
            .map(node => node.textContent)
            .join('')
            .replace(/^\s*\/\/\s*cojuscan\.js\s*\n/, '');

        navigator.clipboard.writeText(codeText.trim()).then(() => {
            codeBlockCopyFeedback.textContent = translations[currentLang].copied;
            codeBlockCopyFeedback.classList.remove('opacity-0');
            setTimeout(() => {
                codeBlockCopyFeedback.classList.add('opacity-0');
            }, 2000);
        });
    });

    const renderVerifiedUrlList = async () => {
        verifiedUrlListContainer.innerHTML = '';
        if (verifiedUrls.length === 0) {
            verifiedUrlListContainer.innerHTML = `<p class="text-sm text-[var(--text-color-dark)] text-center py-4" data-i18n="noVerifiedUrls">${translations[currentLang].noVerifiedUrls}</p>`;
            return;
        }

        verifiedUrls.forEach(itemData => {
            const item = document.createElement('div');
            item.className = 'flex justify-between items-center p-2 rounded-md hover:bg-[var(--button-secondary-hover-bg)]';
            
            const urlSpan = document.createElement('span');
            urlSpan.className = 'text-sm truncate flex-grow mr-2';
            urlSpan.textContent = itemData.url;
            urlSpan.title = itemData.url;

            const btnGroup = document.createElement('div');
            btnGroup.className = 'flex-shrink-0';

            const rescanBtn = document.createElement('button');
            rescanBtn.className = 'text-xs bg-[var(--button-primary-bg)] hover:bg-[var(--button-primary-hover-bg)] px-2 py-1 rounded mr-1';
            rescanBtn.textContent = translations[currentLang].rescan;
            rescanBtn.onclick = () => {
                urlScanInput.value = itemData.url;
                handleUrlScan();
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'text-xs bg-[var(--button-danger-bg)] hover:bg-[var(--button-danger-hover-bg)] px-2 py-1 rounded';
            deleteBtn.textContent = '×';
            deleteBtn.onclick = async () => {
                const confirmDelete = await showConfirmModal(`'${itemData.url}' ${translations[currentLang].deleteConfirm}`);
                if (confirmDelete) {
                    if (githubUser) {
                        const result = await window.electronAPI.deleteVerifiedUrl(itemData.id);
                        if (result.success) {
                            verifiedUrls = verifiedUrls.filter(u => u.id !== itemData.id);
                        } else {
                            console.error('URL 삭제 실패:', result.message);
                            alert('URL 삭제에 실패했습니다.');
                        }
                    } else {
                        verifiedUrls = verifiedUrls.filter(u => u.url !== itemData.url);
                        await window.electronAPI.setSetting('verifiedUrls', verifiedUrls);
                    }
                    renderVerifiedUrlList();
                }
            };
            
            btnGroup.append(rescanBtn, deleteBtn);
            item.append(urlSpan, btnGroup);
            verifiedUrlListContainer.appendChild(item);
        });
    };

    const handleUrlScan = async () => {
        const url = urlScanInput.value.trim();
        if (!url || !url.startsWith('https://')) {
            urlScanErrorMessage.textContent = translations[currentLang].invalidUrl;
            return;
        }

        urlScanErrorMessage.textContent = '';
        urlScanStartBtn.disabled = true;
        startSimpleScanBtn.disabled = true;
        startPrecisionScanBtn.disabled = true;
        startUrlScanBtn.disabled = true; // URL 스캔 중에는 URL 스캔 버튼도 비활성화
        selectDirBtn.disabled = true;
        selectGithubBtn.disabled = true;
        fileTreeContainer.style.pointerEvents = 'none';

        urlScanProgressContainer.classList.remove('hidden');

        if (urlProgressUnsubscribe) urlProgressUnsubscribe();
        urlProgressUnsubscribe = window.electronAPI.onUrlScanProgress(({ progress, text }) => {
            urlScanProgressBar.style.width = `${progress}%`;
            urlScanProgressText.textContent = text;
        });

        let tokenToSend;
        let isNewVerification = false;
        const existingUrlEntry = verifiedUrls.find(item => item.url === url);

        if (existingUrlEntry) {
            tokenToSend = existingUrlEntry.token;
        } else {
            tokenToSend = newUrlVerificationToken;
            isNewVerification = true;
        }

        try {
            currentScannedUrl = url;
            const results = await window.electronAPI.startUrlScan(url, tokenToSend);
            
            if (isNewVerification) {
                if (githubUser) {
                    const addResult = await window.electronAPI.addVerifiedUrl(githubUser.id, url, tokenToSend);
                    if (addResult.success) {
                        verifiedUrls.push(addResult.data);
                    } else {
                        console.error('Supabase에 URL 추가 실패:', addResult.message);
                    }
                } else {
                    verifiedUrls.push({ url: url, token: tokenToSend });
                    await window.electronAPI.setSetting('verifiedUrls', verifiedUrls);
                }
                renderVerifiedUrlList(); 
            }

            currentScanResults = results;
            currentFilteredScanResults = null;
            projectPath = '';
            currentFileTree = null;
            displayUrlResources(Object.keys(results), url);
            displayResults(results);
            
            if (Object.keys(currentFilteredScanResults).length > 0) {
                exportPdfBtn.classList.remove('hidden');
            } else {
                exportPdfBtn.classList.add('hidden');
            }
            
            urlScanModal.classList.add('hidden');
        } catch (error) {
            console.error('URL 스캔 오류:', error);
            if (error.message.includes('VERIFICATION_FAILED')) {
                urlScanErrorMessage.textContent = translations[currentLang].verificationFailed;
            } else if (error.message.includes('URL_FETCH_FAILED')) {
                urlScanErrorMessage.textContent = translations[currentLang].urlFetchFailed;
            } else if (error.message.includes('COJUSCAN_JS_NOT_FOUND')) {
                urlScanErrorMessage.textContent = translations[currentLang].cojuscanJsNotFound;
            } else {
                urlScanErrorMessage.textContent = translations[currentLang].scanError;
            }
        } finally {
            // 스캔 완료 후 모든 버튼과 UI 요소를 다시 활성화
            urlScanStartBtn.disabled = false;
            startSimpleScanBtn.disabled = false;
            startPrecisionScanBtn.disabled = false;
            startUrlScanBtn.disabled = false;
            selectDirBtn.disabled = false;
            selectGithubBtn.disabled = false;
            fileTreeContainer.style.pointerEvents = 'auto';

            updateScanButtonState(); // 파일 선택 상태에 따라 스캔 버튼 활성화 여부 업데이트
            if (urlProgressUnsubscribe) {
                urlProgressUnsubscribe();
                urlProgressUnsubscribe = null;
            }
        }
    };

    urlScanStartBtn.addEventListener('click', handleUrlScan);
    
    // --- GITHUB 모달 로직 (신규) ---
    const resetGitHubModal = () => {
        githubCurrentStep = 1;
        selectedRepo = null;
        selectedBranch = null;

        githubStep1.classList.remove('hidden');
        githubStep2.classList.add('hidden');
        githubStep3.classList.add('hidden');

        githubRepoList.innerHTML = '';
        githubBranchList.innerHTML = '';
        githubRepoSearch.value = '';

        githubNextStepBtn.classList.remove('hidden');
        githubImportBtn.classList.add('hidden');
        githubNextStepBtn.disabled = !githubUser;
        githubImportBtn.disabled = true;

        githubLoading.classList.add('hidden');
        githubActionButtons.classList.remove('hidden');
    };

    // --- 환경 상태 모달 로직 ---
    const populateEnvStatusModal = async () => {
        const status = await window.electronAPI.getEnvStatus();
        envStatusContent.innerHTML = '';

        for (const [key, value] of Object.entries(status)) {
            const item = document.createElement('div');
            item.className = 'p-3 bg-[var(--main-bg)] rounded-lg flex flex-col';
            
            const header = document.createElement('div');
            header.className = 'flex items-center justify-between mb-1';

            const name = document.createElement('span');
            name.className = 'font-bold text-[var(--text-color)]';
            name.textContent = translations[currentLang][key] || key; // 번역 적용

            const statusText = document.createElement('span');
            statusText.className = `px-2 py-1 rounded-full text-xs font-semibold ${value.installed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`;
            statusText.textContent = value.installed ? translations[currentLang].installed : translations[currentLang].notFound; // 번역 적용

            header.append(name, statusText);
            item.appendChild(header);

            const pathText = document.createElement('p');
            pathText.className = 'text-xs text-[var(--text-color-dark)] mt-1 cursor-pointer hover:underline'; // 클릭 가능하도록 스타일 추가
            pathText.textContent = `${translations[currentLang].pathLabel}: ${value.path}`; // 번역 적용
            pathText.title = value.path; // 툴팁으로 전체 경로 표시
            pathText.addEventListener('click', () => {
                if (value.path) {
                    window.electronAPI.openPathInExplorer(value.path); // 새 IPC 호출
                }
            });
            item.appendChild(pathText);

            const versionText = document.createElement('p');
            versionText.className = 'text-xs text-[var(--text-color-dark)]';
            versionText.textContent = `${translations[currentLang].versionLabel}: ${value.version}`; // 번역 적용
            item.appendChild(versionText);

            envStatusContent.appendChild(item);
        }
    };

    envStatusBtn.addEventListener('click', async () => {
        await populateEnvStatusModal();
        envStatusModal.classList.remove('hidden');
    });

    closeEnvStatusModalBtn.addEventListener('click', () => {
        envStatusModal.classList.add('hidden');
    });

    envStatusModal.addEventListener('click', (e) => {
        if (e.target === envStatusModal) {
            envStatusModal.classList.add('hidden');
        }
    });

    const updateGitHubUserState = async () => {
        setGitHubLoading(true, '계정 정보 확인 중...');
        try {
            githubUser = await window.electronAPI.getGitHubUser();
            if (githubUser) {
                githubUsername.textContent = githubUser.login;
                githubLoginBtn.classList.add('hidden');
                githubUserInfo.classList.remove('hidden');
                githubNextStepBtn.disabled = false;
            } else {
                githubLoginBtn.classList.remove('hidden');
                githubUserInfo.classList.add('hidden');
                githubNextStepBtn.disabled = true;
            }
        } finally {
            setGitHubLoading(false);
        }
    };

    const setGitHubLoading = (isLoading, text = '') => {
        if (isLoading) {
            githubLoadingText.textContent = text;
            githubLoading.classList.remove('hidden');
            githubActionButtons.classList.add('hidden');
        } else {
            githubLoading.classList.add('hidden');
            githubActionButtons.classList.remove('hidden');
        }
    };

    selectGithubBtn.addEventListener('click', async () => {
        if (isThemeEditMode) return;
        resetGitHubModal();
        githubModal.classList.remove('hidden');
        await updateGitHubUserState();
    });

    closeGithubModalBtn.addEventListener('click', () => {
        githubModal.classList.add('hidden');
    });
    githubModal.addEventListener('click', (e) => {
        if (e.target === githubModal) githubModal.classList.add('hidden');
    });

    githubLoginBtn.addEventListener('click', async () => {
        setGitHubLoading(true, 'GitHub 인증을 기다리는 중...');
        try {
            await window.electronAPI.startGitHubAuth();
            await updateGitHubUserState();
            // GitHub 인증 성공 후 URL 목록 다시 불러오기
            await fetchVerifiedUrlsFromSupabase();
        } catch (error) {
            console.error(error);
            alert(translations[currentLang].githubAuthFailed);
            setGitHubLoading(false);
        }
    });

    githubLogoutBtn.addEventListener('click', async () => {
        await window.electronAPI.logoutGitHub();
        githubUser = null;
        await updateGitHubUserState();
        // GitHub 로그아웃 후 로컬 URL 목록으로 전환
        verifiedUrls = await window.electronAPI.getSetting('verifiedUrls') || [];
        renderVerifiedUrlList();
    });

    githubNextStepBtn.addEventListener('click', async () => {
        if (githubCurrentStep === 1) {
            setGitHubLoading(true, translations[currentLang].fetchingRepos);
            try {
                githubRepos = await window.electronAPI.getGitHubRepos();
                githubRepos.sort((a,b) => new Date(b.pushed_at) - new Date(a.pushed_at));
                populateRepoList(githubRepos);
                githubStep1.classList.add('hidden');
                githubStep2.classList.remove('hidden');
                githubCurrentStep = 2;
                githubNextStepBtn.disabled = true;
            } finally {
                setGitHubLoading(false);
            }
        } else if (githubCurrentStep === 2) {
            setGitHubLoading(true, translations[currentLang].fetchingBranches);
            try {
                const branches = await window.electronAPI.getGitHubBranches(selectedRepo.full_name);
                populateBranchList(branches);
                githubStep2.classList.add('hidden');
                githubStep3.classList.remove('hidden');
                githubCurrentStep = 3;
                githubNextStepBtn.classList.add('hidden');
                githubImportBtn.classList.remove('hidden');
                githubImportBtn.disabled = true;
            } finally {
                setGitHubLoading(false);
            }
        }
    });

    githubImportBtn.addEventListener('click', async () => {
        setGitHubLoading(true, translations[currentLang].downloadingRepo);
        if (progressUnsubscribe) progressUnsubscribe();
        progressUnsubscribe = window.electronAPI.onScanProgress(({ progress, file }) => {
            setGitHubLoading(true, `${file} (${Math.round(progress)}%)`);
        });

        try {
            const data = await window.electronAPI.importGitHubRepo(selectedRepo, selectedBranch);
            if (data && data.tree) {
                // 표시용으로 레포 이름 사용, 스캔용으로 임시 경로 사용
                projectPath = data.path; 
                currentScannedUrl = data.repoName; // 보고서 제목용으로 사용

                currentFileTree = data.tree;
                fileTreeContainer.innerHTML = '';
                fileTreeContainer.appendChild(createTreeElement(currentFileTree));
                updateScanButtonState();
                resultsContainer.innerHTML = `<p class="text-[var(--text-color-dark)] text-center py-10" data-i18n="startScanToSeeResults">${translations[currentLang].startScanToSeeResults}</p>`;
                currentScanResults = null;
                currentFilteredScanResults = null;
                exportPdfBtn.classList.add('hidden');
                githubModal.classList.add('hidden');
            }
        } catch (error) {
            console.error(error);
            alert('저장소 가져오기 실패.');
        } finally {
            if (progressUnsubscribe) {
                progressUnsubscribe();
                progressUnsubscribe = null;
            }
            setGitHubLoading(false);
        }
    });
    
    const populateRepoList = (repos) => {
        githubRepoList.innerHTML = '';
        repos.forEach(repo => {
            const item = document.createElement('div');
            item.className = 'p-2 rounded-md cursor-pointer hover:bg-[var(--button-secondary-hover-bg)] flex justify-between items-center';
            item.innerHTML = `
                <div>
                    <p class="font-semibold">${repo.name}</p>
                    <p class="text-xs text-[var(--text-color-dark)]">${repo.full_name}</p>
                </div>
                ${repo.private ? `<span class="text-xs bg-red-800 text-white px-2 py-0.5 rounded-full">Private</span>` : ''}
            `;
            item.addEventListener('click', () => {
                selectedRepo = repo;
                githubRepoList.querySelectorAll('.bg-blue-600').forEach(el => el.classList.remove('bg-blue-600'));
                item.classList.add('bg-blue-600');
                githubNextStepBtn.disabled = false;
            });
            githubRepoList.appendChild(item);
        });
    };
    
    githubRepoSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filteredRepos = githubRepos.filter(repo => repo.full_name.toLowerCase().includes(term));
        populateRepoList(filteredRepos);
    });

    const populateBranchList = (branches) => {
        githubBranchList.innerHTML = '';
        branches.forEach(branch => {
            const item = document.createElement('div');
            item.className = 'p-2 rounded-md cursor-pointer hover:bg-[var(--button-secondary-hover-bg)]';
            item.textContent = branch.name;
            item.addEventListener('click', () => {
                selectedBranch = branch;
                githubBranchList.querySelectorAll('.bg-blue-600').forEach(el => el.classList.remove('bg-blue-600'));
                item.classList.add('bg-blue-600');
                githubImportBtn.disabled = false;
            });
            githubBranchList.appendChild(item);
        });
    };

    // --- 핵심 앱 로직 ---
    const restoreUIState = () => {
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
        currentScannedUrl = '';
        
        if (currentFileTree) {
            fileTreeContainer.innerHTML = '';
            fileTreeContainer.appendChild(createTreeElement(currentFileTree));
        } else {
            fileTreeContainer.innerHTML = `<p class="text-[var(--text-color-dark)] text-center py-10" data-i18n="selectProjectFolder">${translations[currentLang].selectProjectFolder}</p>`;
        }

        if (currentScanResults) {
            displayResults(currentScanResults);
        } else {
            resultsContainer.innerHTML = `<p class="text-[var(--text-color-dark)] text-center py-10" data-i18n="startScanToSeeResults">${translations[currentLang].startScanToSeeResults}</p>`;
        }
        
        updateScanButtonState();
    };

    selectDirBtn.addEventListener('click', async () => {
        if (isThemeEditMode) return;
        const data = await window.electronAPI.selectDirectory();
        if (data && data.tree) {
            projectPath = data.path;
            currentScannedUrl = '';
            currentFileTree = data.tree;
            fileTreeContainer.innerHTML = '';
            fileTreeContainer.appendChild(createTreeElement(currentFileTree));
            updateScanButtonState();
            resultsContainer.innerHTML = `<p class="text-[var(--text-color-dark)] text-center py-10" data-i18n="startScanToSeeResults">${translations[currentLang].startScanToSeeResults}</p>`;
            currentScanResults = null;
            currentFilteredScanResults = null;
            exportPdfBtn.classList.add('hidden');
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

    function displayUrlResources(resourcePaths, scannedUrl) {
        fileTreeContainer.innerHTML = ''; 
        
        const container = document.createElement('div');
        container.className = 'p-2';

        const title = document.createElement('h2');
        title.className = 'text-[var(--accent-color)] font-bold mb-1 text-lg';
        title.setAttribute('data-i18n', 'urlScanResourcesTitle');
        title.textContent = translations[currentLang].urlScanResourcesTitle;

        const urlEl = document.createElement('p');
        urlEl.className = 'text-xs text-[var(--text-color-dark)] mb-3 truncate';
        urlEl.textContent = scannedUrl;
        urlEl.title = scannedUrl;

        container.appendChild(title);
        container.appendChild(urlEl);

        const ul = document.createElement('ul');

        if (!resourcePaths || resourcePaths.length === 0) {
            const p = document.createElement('p');
            p.className = 'text-[var(--text-color-dark)] text-center py-10';
            p.setAttribute('data-i18n', 'noAnalyzedResources');
            p.textContent = translations[currentLang].noAnalyzedResources;
            ul.appendChild(p);
        } else {
            resourcePaths.sort().forEach(path => {
                const li = document.createElement('li');
                li.className = 'flex items-center p-1 rounded-md my-1';

                const iconSpan = document.createElement('span');
                iconSpan.className = 'file-icon';

                const ext = '.' + path.split('.').pop().toLowerCase();
                let iconFilename = fileIconMap[ext];

                if (path.endsWith('/')) {
                    iconFilename = fileIconMap['.html'];
                }

                if (iconFilename && iconDataMap[iconFilename]) {
                    const img = document.createElement('img');
                    img.src = iconDataMap[iconFilename];
                    img.className = 'w-4 h-4';
                    iconSpan.appendChild(img);
                } else {
                    iconSpan.innerHTML = '📄';
                }

                const textSpan = document.createElement('span');
                textSpan.textContent = path;
                textSpan.className = 'ml-2 text-sm truncate';
                textSpan.title = path;

                li.append(iconSpan, textSpan);
                ul.appendChild(li);
            });
        }
        container.appendChild(ul);
        fileTreeContainer.appendChild(container);
    }
    
    fileTreeContainer.addEventListener('change', (e) => { if (e.target.type === 'checkbox') updateScanButtonState(); });
    
    function updateScanButtonState() {
        const isFileSelected = !!fileTreeContainer.querySelector('input[type="checkbox"]:checked');
        startSimpleScanBtn.disabled = !isFileSelected;
        startPrecisionScanBtn.disabled = !isFileSelected;
        startUrlScanBtn.disabled = false;
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
        currentFilteredScanResults = null;
        startSimpleScanBtn.disabled = true;
        startPrecisionScanBtn.disabled = true;
        startUrlScanBtn.disabled = true;
        selectDirBtn.disabled = true;
        selectGithubBtn.disabled = true;
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
            // GitHub 스캔의 경우 currentScannedUrl을 지우지 않음
            let results;
            if (scanType === 'simple') {
                results = await window.electronAPI.startSimpleScan({ projectPath, filesToScan: checkedFiles });
            } else if (scanType === 'precision') {
                results = await window.electronAPI.startPrecisionScan(projectPath, checkedFiles);
            }
            currentScanResults = results;
            displayResults(results);
            if(scanType === 'precision' && Object.keys(currentFilteredScanResults).length > 0) {
                exportPdfBtn.classList.remove('hidden');
            }
        } catch (error) {
            console.error('스캔 오류:', error);
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
            selectGithubBtn.disabled = false; // GitHub 버튼 다시 활성화
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
        const filtered = {};
        const shouldIgnoreIntegrity = ignoreIntegrityCheck.checked;
        const shouldIgnoreConsole = ignoreConsoleLogCheck.checked;
        const shouldIgnoreCors = ignoreCorsWildcardCheck.checked;

        for (const file in results) {
            const findings = results[file].filter(finding => {
                const primaryId = finding.id;
                if (shouldIgnoreIntegrity && primaryId.includes('missing-integrity')) return false;
                if (shouldIgnoreConsole && primaryId === 'unsafe-formatstring') return false;
                if (shouldIgnoreCors && primaryId === 'cors_wildcard') return false;
                return true;
            });

            if (findings.length > 0) {
                filtered[file] = findings;
            }
        }
        currentFilteredScanResults = filtered;
        
        resultsContainer.innerHTML = '';
        const filesWithFindings = Object.keys(currentFilteredScanResults);
        
        const scoreElement = document.createElement('div');
        scoreElement.id = 'score-element';
        scoreElement.className = 'text-center my-4';
        resultsContainer.appendChild(scoreElement);

        if (filesWithFindings.length === 0) {
            resultsContainer.innerHTML = `<div class="text-center py-10"><h3 class="text-2xl font-bold text-[var(--accent-color)]">${translations[currentLang].clean}</h3><p class="text-[var(--text-color)]">${translations[currentLang].noVulnerabilitiesFound}</p><h3 class="text-2xl font-bold mt-4">${translations[currentLang].securityScore}: <span class="text-[var(--accent-color)]">100 / 100</span></h3></div>`;
            recalculateScore();
            return;
        }

        const resultAccordion = document.createElement('div');
        resultAccordion.id = 'result-accordion';
        filesWithFindings.forEach(file => {
            const findings = currentFilteredScanResults[file];
            const fileContainer = document.createElement('div');
            fileContainer.className = 'mb-2 bg-[#111] rounded-lg overflow-hidden border border-[var(--border-color)]';
            const fileHeader = document.createElement('button');
            fileHeader.className = 'w-full text-left p-3 bg-[var(--button-secondary-bg)] hover:bg-[var(--button-secondary-hover-bg)] focus:outline-none flex justify-between items-center transition-colors';
            fileHeader.innerHTML = `<span class="font-bold" style="color: var(--text-color);">${file}</span><span class="bg-[var(--button-danger-bg)] text-white text-xs font-bold mr-2 px-2.5 py-0.5 rounded-full">${findings.length} ${translations[currentLang].found}</span>`;
            const findingsContainer = document.createElement('div');
            findingsContainer.className = 'p-4 hidden bg-[var(--secondary-bg)]';
            fileHeader.addEventListener('click', () => findingsContainer.classList.toggle('hidden'));
            findings.forEach((finding) => {
                const findingId = `${file}-${finding.line}-${finding.id}`;
                findingCard = document.createElement('div');
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
                        <h4 class="text-lg font-semibold">${name}</h4>
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
        
        resultsContainer.appendChild(resultAccordion);
        recalculateScore();
    }

    function recalculateScore() {
        let totalScore = 100;
        const severityScores = { High: 15, Medium: 5, Low: 1 };
        
        if (currentFilteredScanResults) {
            for (const file in currentFilteredScanResults) {
                for (const finding of currentFilteredScanResults[file]) {
                    const findingId = `${file}-${finding.line}-${finding.id}`;
                    if (!ignoredFindings.has(findingId)) {
                        totalScore -= severityScores[finding.severity] || 0;
                    }
                }
            }
        }

        currentSecurityScore = Math.max(0, totalScore);
        const scoreColor = currentSecurityScore > 80 ? 'text-[var(--accent-color)]' : currentSecurityScore > 50 ? 'text-[var(--severity-medium-color)]' : 'text-[var(--severity-high-color)]';
        const scoreElement = document.getElementById('score-element');
        if(scoreElement) {
            scoreElement.innerHTML = `<h3 class="text-2xl font-bold">${translations[currentLang].securityScore}: <span class="${scoreColor}">${currentSecurityScore} / 100</span></h3>`;
        }
    }

    exportPdfBtn.addEventListener('click', () => {
        if (!currentFilteredScanResults || !appInfo) {
            console.error("보고서를 생성할 검사 결과나 앱 정보가 없습니다.");
            return;
        }
        window.electronAPI.exportToPDF({
            results: currentFilteredScanResults,
            score: currentSecurityScore,
            projectPath: currentScannedUrl || projectPath,
            lang: currentLang,
            version: appInfo.version,
            ignored: Array.from(ignoredFindings)
        });
    });

    function escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return '';
        return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    // --- 초기화 실행 ---
    initializeApp();
    window.electronAPI.onGetRendererState(() => {
        console.log('메인 프로세스로부터 상태 저장 요청을 받았습니다. 현재 상태를 전송합니다.');
        // 저장해야 할 모든 상태를 하나의 객체로 모읍니다.
        const currentState = {
            language: currentLang,
            activeTheme: activeThemeName,
            customThemes: customThemes,
            sharedThemes: sharedThemes,
            verifiedUrls: verifiedUrls // verifiedUrls도 저장 상태에 포함
            // 필요하다면 다른 설정 값들도 추가할 수 있습니다.
        };
        // 수집한 상태 객체를 메인 프로세스로 보냅니다.
        window.electronAPI.sendRendererStateForQuit(currentState);
    });
});
