const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { initDatabase, insertReminder, getAllReminders, getReminderById, deleteReminder, closeDatabase } = require('./database');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');

  // Open DevTools in development (optional)
  // mainWindow.webContents.openDevTools();
}

// Set up IPC handlers for database operations
function setupIPCHandlers() {
  // Handle saving a reminder
  ipcMain.handle('save-reminder', async (event, information) => {
    try {
      const result = await insertReminder(information);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error saving reminder:', error);
      return { success: false, error: error.message };
    }
  });

  // Handle getting all reminders
  ipcMain.handle('get-all-reminders', async () => {
    try {
      const reminders = await getAllReminders();
      return { success: true, data: reminders };
    } catch (error) {
      console.error('Error getting reminders:', error);
      return { success: false, error: error.message };
    }
  });

  // Handle getting a single reminder
  ipcMain.handle('get-reminder', async (event, id) => {
    try {
      const reminder = await getReminderById(id);
      return { success: true, data: reminder };
    } catch (error) {
      console.error('Error getting reminder:', error);
      return { success: false, error: error.message };
    }
  });

  // Handle deleting a reminder
  ipcMain.handle('delete-reminder', async (event, id) => {
    try {
      const success = await deleteReminder(id);
      return { success: success };
    } catch (error) {
      console.error('Error deleting reminder:', error);
      return { success: false, error: error.message };
    }
  });
}

app.whenReady().then(async () => {
  // Initialize database
  await initDatabase();

  // Set up IPC handlers
  setupIPCHandlers();

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Close database when app is quitting
app.on('before-quit', () => {
  closeDatabase();
});
