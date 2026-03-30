const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");
const Store = require("electron-store").default;

const store = new Store();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    icon: path.join(__dirname, "assets", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("index.html");
  win.maximize();
}

// Handlers do IPC
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

    const javaExec = path.join(data.javaHome, "bin", "java");

    const javaBase = app.isPackaged
      ? path.join(process.resourcesPath, "java")
      : path.join(__dirname, "java");

    const classPath = `${javaBase}:${path.join(javaBase, "lib", "*")}`;
    
    let sourceFileToCompile = data.source;

    try {
      /* Alguns arquivos .jrxml possuem este import, que não é necessário para a compilação, 
      mas que não está presente na versão 3.5.3 do jasperreports e causa erros de compilação no linux.
      Para evitar modificações dos arquivos originais, para linux será criado um arquivo temporário
      sem esse import e este será apagado no final da execução.
      */
      const content = fs.readFileSync(data.source, "utf-8")
        .replace(/<import value="net\.sf\.jasperreports\.export\.xls\.\*"\s*\/>/g, "");
      
      sourceFileToCompile = path.join(os.tmpdir(), path.basename(data.source));
      fs.writeFileSync(sourceFileToCompile, content);

      execFile(
        javaExec,
        ["-cp", classPath, "CompileJrxml", sourceFileToCompile, data.output],
        {
          env: {
            JAVA_HOME: data.javaHome,
            PATH: `${path.join(data.javaHome, "bin")}:${process.env.PATH}`
          }, 
        },
        (error, stdout, stderr) => {
          // Tenta apagar o arquivo temporário
          try { if (fs.existsSync(sourceFileToCompile)) fs.unlinkSync(sourceFileToCompile); } catch (e) {}

          if (error) {
            resolve({ success: false, error: stderr || error.message });
          } else {
            resolve({ success: true });
          }
        }
      );
    } catch (err) {
      resolve({ success: false, error: "Erro ao processar arquivo: " + err.message });
    }
  });
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});
