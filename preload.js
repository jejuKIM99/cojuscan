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

  // --- GitHub Functionality (NEW) ---
  startGitHubAuth: () => ipcRenderer.invoke('github:auth:start'),
  getGitHubUser: () => ipcRenderer.invoke('github:user:get'),
  logoutGitHub: () => ipcRenderer.invoke('github:auth:logout'),
  getGitHubRepos: () => ipcRenderer.invoke('github:repos:get'),
  getGitHubBranches: (repo) => ipcRenderer.invoke('github:branches:get', repo),
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
  updateFreeTheme: (data) => ipcRenderer.invoke('theme-store:update-free', data),

  onGetRendererState: (callback) => ipcRenderer.on('get-renderer-state', callback),
  sendRendererStateForQuit: (state) => ipcRenderer.send('renderer-state-for-quit', state),
});