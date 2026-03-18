const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { execFile } = require("child_process");
const path = require("path");
const Store = require("electron-store").default;

const store = new Store();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    icon: path.join(__dirname, "assets", "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("index.html");
  win.maximize();
}

ipcMain.handle("load-config", () => {
        return {
          javaHome: store.get("javaHome", ""),
          source: store.get("source", ""),
          output: store.get("output", "")
        };
});

ipcMain.handle("select-directory", async () => {
  const result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  return result.canceled ? "" : result.filePaths[0];
});

ipcMain.handle("select-file", async () => {
  const result = await dialog.showOpenDialog({
    filters: [{ name: "jrxml", extensions: ["jrxml"] }],
    properties: ["openFile"]
  });
  return result.canceled ? "" : result.filePaths[0];
});

ipcMain.handle("compile", async (_, data) => {
  return new Promise((resolve) => {
        store.set("javaHome", data.javaHome);
        store.set("source", data.source);
        store.set("output", data.output);

        const javaBase = path.join(process.resourcesPath, "java");

        execFile(
                path.join(data.javaHome, "bin", "java"),
                [
                        "-cp",
                        `${javaBase};${path.join(javaBase, "lib", "*")}`,
                        "CompileJrxml",
                        data.source,
                        data.output
                ],
                { windowsHide: true },
                (error, stdout, stderr) => {
                        if (error) {
                                resolve({ success: false, error: stderr || error.message });
                        } else {
                                resolve({ success: true });
                        }
                }
        );
  });
});

app.whenReady().then(createWindow);
