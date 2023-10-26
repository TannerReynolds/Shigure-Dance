const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  getCurrentWindow: () => ipcRenderer.send("get-current-window"),
});
