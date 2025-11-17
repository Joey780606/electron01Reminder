// Preload script
// This script runs before the web page is loaded
// It can be used to expose Node.js APIs to the renderer process safely

const { contextBridge, ipcRenderer } = require('electron');

// Expose database API to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Save a reminder to the database
  saveReminder: (information) => ipcRenderer.invoke('save-reminder', information),

  // Get all reminders
  getAllReminders: () => ipcRenderer.invoke('get-all-reminders'),

  // Get a single reminder by id
  getReminder: (id) => ipcRenderer.invoke('get-reminder', id),

  // Delete a reminder
  deleteReminder: (id) => ipcRenderer.invoke('delete-reminder', id)
});

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
