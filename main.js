const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");

if (require("electron-squirrel-startup")) app.quit();

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    icon: path.join(__dirname, "assets/icon"),
    minWidth: 910,
    minHeight: 500,
  });

  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
