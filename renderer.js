const status = document.getElementById("status");

window.addEventListener("DOMContentLoaded", async () => {
  const config = await window.api.loadConfig();
  if (config.javaHome) javaHome.value = config.javaHome;
  if (config.source) jrxmlFile.value = config.source;
  if (config.output) outputDir.value = config.output;
});

async function selectJava() {
  const value = await window.api.selectDirectory();
  if (value) javaHome.value = value;
}

async function selectJrxml() {
  const value = await window.api.selectFile();
  if (value) jrxmlFile.value = value;
}

async function selectOutput() {
  const value = await window.api.selectDirectory();
  if (value) outputDir.value = value;
}

async function compile() {
  status.textContent = "Compilando...";
  status.className = "status";

  const result = await window.api.compile({
    javaHome: javaHome.value,
    source: jrxmlFile.value,
    output: outputDir.value
  });

  if (result.success) {
    status.textContent = "Compilação concluída com sucesso!";
    status.classList.add("success");
  } else {
    status.textContent = "Erro na compilação";
    status.classList.add("error");
    showModal(result.error);
  }
}

function showModal(message) {
  document.getElementById("modalMessage").textContent = message;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}
