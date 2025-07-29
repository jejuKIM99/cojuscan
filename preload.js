// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // --- Window Controls ---
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  onWindowMaximized: (callback) => ipcRenderer.on('window-maximized', callback),
  onWindowUnmaximized: (callback) => ipcRenderer.on('window-unmaximized', callback),

  // --- Core Functionality ---
  selectDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
  startSimpleScan: (payload) => ipcRenderer.invoke('scan:simple', payload),
  startPrecisionScan: (projectPath, filesToScan) => ipcRenderer.invoke('scan:precision', projectPath, filesToScan),
  onScanProgress: (callback) => {
    const listener = (_event, value) => callback(value);
    ipcRenderer.on('scan:progress', listener);
    // Return a function to remove the listener to prevent memory leaks
    return () => ipcRenderer.removeListener('scan:progress', listener);
  },
  
  // --- URL Scan Functionality ---
  startUrlScan: (url, verificationToken) => ipcRenderer.invoke('url:scan', { url, verificationToken }),
  onUrlScanProgress: (callback) => {
    const listener = (_event, value) => callback(value);
    ipcRenderer.on('url-scan:progress', listener);
    // Return a function to remove the listener
    return () => ipcRenderer.removeListener('url-scan:progress', listener);
  },
  addVerifiedUrl: (userId, url, token) => ipcRenderer.invoke('url:verified:add', { userId, url, token }),
  deleteVerifiedUrl: (id) => ipcRenderer.invoke('url:verified:delete', id),
  // GitHub 인증 및 저장소 관리 (신규)
  startGitHubAuth: () => ipcRenderer.invoke('github:auth:start'),
  getGitHubUser: () => ipcRenderer.invoke('github:user:get'),
  logoutGitHub: () => ipcRenderer.invoke('github:auth:logout'),
  getGitHubRepos: () => ipcRenderer.invoke('github:repos:get'),
  getGitHubBranches: (repoFullName) => ipcRenderer.invoke('github:branches:get', repoFullName),
  importGitHubRepo: (repo, branch) => ipcRenderer.invoke('github:repo:import', { repo, branch }),

  // --- App Info ---
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),

  // --- Settings ---
  getSetting: (key) => ipcRenderer.invoke('settings:get', key),
  setSetting: (key, value) => ipcRenderer.invoke('settings:set', key, value),

  // --- PDF Export ---
  exportToPDF: (data) => ipcRenderer.invoke('export:pdf', data),
  onRenderReportData: (callback) => ipcRenderer.on('render-report-data', (event, ...args) => callback(...args)),
  reportReadyForPDF: () => ipcRenderer.send('report-ready-for-pdf'),

  exportTheme: (themeData) => ipcRenderer.invoke('theme:export', themeData),
  importTheme: () => ipcRenderer.invoke('theme:import'),

  // --- Theme Store ---
  fetchThemeStore: (table) => ipcRenderer.invoke('theme-store:fetch', table),
  uploadTheme: (data) => ipcRenderer.invoke('theme-store:upload', data),
  deleteFreeTheme: (data) => ipcRenderer.invoke('theme-store:delete-free', data),
  updateFreeTheme: (themeData) => ipcRenderer.invoke('theme-store:update-free', themeData),
  downloadBackgroundImage: (imageUrl) => ipcRenderer.invoke('theme:download-background-image', imageUrl),
  deleteBackgroundImage: (fileUrl) => ipcRenderer.invoke('theme:delete-background-image', fileUrl),

  // --- Renderer State for Quit ---
  onGetRendererState: (callback) => ipcRenderer.on('get-renderer-state', callback),
  sendRendererStateForQuit: (state) => ipcRenderer.send('renderer-state-for-quit', state),

  // --- URL 목록 가져오기 (신규) ---
  fetchVerifiedUrls: (userId) => ipcRenderer.invoke('url:verified:fetch', userId),

  // --- 환경 상태 확인 (신규) ---
  getEnvStatus: () => ipcRenderer.invoke('getEnvStatus'),
  openPathInExplorer: (path) => ipcRenderer.invoke('openPathInExplorer', path), // 추가

  // --- Splash Screen Progress (신규) ---
  onSplashProgress: (callback) => ipcRenderer.on('splash-progress', (event, progress, text) => callback(progress, text)),

  // --- Splash Screen (Installation) ---
  installDependencies: () => ipcRenderer.send('install-dependencies'),
  onInstallationRequired: (callback) => ipcRenderer.on('installation-required', (event, items, pythonZipSize) => callback(items, pythonZipSize)),
  onInstallationProgress: (callback) => ipcRenderer.on('installation-progress', (event, ...args) => callback(...args)),
  onInstallationComplete: (callback) => ipcRenderer.on('installation-complete', (event, ...args) => callback(...args)),
  onInstallationError: (callback) => ipcRenderer.on('installation-error', (event, ...args) => callback(...args)),
});
