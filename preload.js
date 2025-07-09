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
  startScan: (scanType, payload) => ipcRenderer.invoke('scan:start', scanType, payload),
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

  // --- App Info ---
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),

  // --- Settings ---
  getSetting: (key) => ipcRenderer.invoke('settings:get', key),
  setSetting: (key, value) => ipcRenderer.send('settings:set', { key, value }),

  // --- PDF Export ---
  exportToPDF: (data) => ipcRenderer.invoke('export:pdf', data),
  onRenderReportData: (callback) => ipcRenderer.on('render-report-data', (event, ...args) => callback(...args)),
  reportReadyForPDF: () => ipcRenderer.send('report-ready-for-pdf'),
});
