const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    titleBarStyle: "hidden",
    titleBarOverlay: false,
    skipTaskbar: true,
    webPreferences: {
      contextIsolation: true,
      devTools: false,
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");

  globalShortcut.register("CommandOrControl+L", () => {
    mainWindow.setIgnoreMouseEvents(false);
  });
  globalShortcut.register("CommandOrControl+B", () => {
    mainWindow.setIgnoreMouseEvents(true);
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("will-quit", () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
