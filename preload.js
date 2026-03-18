const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  selectDirectory: () => ipcRenderer.invoke("select-directory"),
  selectFile: () => ipcRenderer.invoke("select-file"),
  compile: (data) => ipcRenderer.invoke("compile", data),
  loadConfig: () => ipcRenderer.invoke("load-config")
});
