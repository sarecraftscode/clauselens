/* ── Theme ── */
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
let isDark = !window.matchMedia("(prefers-color-scheme: light)").matches;

function applyTheme() {
  html.setAttribute("data-theme", isDark ? "dark" : "light");
  themeIcon.textContent = isDark ? "🌙" : "☀️";
  themeLabel.textContent = isDark ? "Sombre" : "Clair";
}
applyTheme();
themeToggle.addEventListener("click", () => {
  isDark = !isDark;
  applyTheme();
});

/* ── Modal ── */
const modalOverlay = document.getElementById("modalOverlay");
const btnLegal = document.getElementById("btnLegal");
const modalClose = document.getElementById("modalClose");
const modalCloseBtn = document.getElementById("modalCloseBtn");

function openModal() {
  modalOverlay.classList.add("visible");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modalOverlay.classList.remove("visible");
  document.body.style.overflow = "";
}

btnLegal.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ── App ── */
const WEBHOOK_URL = "http://localhost:5678/webhook-test/clause-lens";
let activeMethod = "pdf";
let selectedFile = null;

const btnPdf = document.getElementById("btnPdf");
const btnText = document.getElementById("btnText");
const pdfPanel = document.getElementById("pdfPanel");
const textPanel = document.getElementById("textPanel");
const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
const btnClearText = document.getElementById("btnClearText");
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const fileChosen = document.getElementById("fileChosen");
const fileName = document.getElementById("fileName");
const fileClear = document.getElementById("fileClear");
const btnAnalyse = document.getElementById("btnAnalyse");
const loader = document.getElementById("loader");
const errorBox = document.getElementById("errorBox");
const errorMsg = document.getElementById("errorMsg");
const resultSection = document.getElementById("result-section");
const resultBadge = document.getElementById("resultBadge");
const resultContent = document.getElementById("result-content");
const btnReset = document.getElementById("btnReset");

/* Method toggle */
function setMethod(m) {
  activeMethod = m;
  btnPdf.classList.toggle("active", m === "pdf");
  btnText.classList.toggle("active", m === "text");
  pdfPanel.classList.toggle("visible", m === "pdf");
  textPanel.classList.toggle("visible", m === "text");
}
btnPdf.addEventListener("click", () => setMethod("pdf"));
btnText.addEventListener("click", () => setMethod("text"));

/* Char counter */
textInput.addEventListener("input", () => {
  const n = textInput.value.length;
  charCount.textContent =
    n.toLocaleString("fr-FR") + " caractère" + (n > 1 ? "s" : "");
});
btnClearText.addEventListener("click", () => {
  textInput.value = "";
  charCount.textContent = "0 caractère";
  textInput.focus();
});

/* File */
function setFile(file) {
  if (!file || file.type !== "application/pdf") {
    showError("Veuillez sélectionner un fichier PDF valide.");
    return;
  }
  selectedFile = file;
  fileName.textContent = file.name;
  fileChosen.classList.add("visible");
  hideError();
}
fileInput.addEventListener("change", (e) => {
  if (e.target.files[0]) setFile(e.target.files[0]);
});
fileClear.addEventListener("click", () => {
  selectedFile = null;
  fileInput.value = "";
  fileChosen.classList.remove("visible");
});
["dragenter", "dragover"].forEach((e) =>
  dropZone.addEventListener(e, (ev) => {
    ev.preventDefault();
    dropZone.classList.add("dragging");
  }),
);
["dragleave", "drop"].forEach((e) =>
  dropZone.addEventListener(e, (ev) => {
    ev.preventDefault();
    dropZone.classList.remove("dragging");
  }),
);
dropZone.addEventListener("drop", (e) => {
  const f = e.dataTransfer.files[0];
  if (f) setFile(f);
});

/* Helpers */
function showError(msg) {
  errorMsg.textContent = msg;
  errorBox.classList.add("visible");
}
function hideError() {
  errorBox.classList.remove("visible");
}
function setLoading(v) {
  loader.classList.toggle("visible", v);
  btnAnalyse.disabled = v;
}

/* ── Accordion ── */
function initAccordion() {
  const sections = resultContent.querySelectorAll("section");
  if (!sections.length) return;

  const ctrl = document.createElement("div");
  ctrl.className = "cr-controls";
  ctrl.innerHTML =
    '<button class="cr-ctrl-btn" id="crExpandAll">↓ Tout déplier</button>' +
    '<button class="cr-ctrl-btn" id="crCollapseAll">↑ Tout replier</button>';
  resultContent.querySelector("section").before(ctrl);

  sections.forEach((sec, i) => {
    const h2 = sec.querySelector("h2");
    if (!h2) return;

    const body = document.createElement("div");
    body.className = "cr-body";
    while (h2.nextSibling) body.appendChild(h2.nextSibling);
    sec.appendChild(body);

    const chev = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    chev.setAttribute("class", "cr-chevron");
    chev.setAttribute("width", "16");
    chev.setAttribute("height", "16");
    chev.setAttribute("viewBox", "0 0 16 16");
    chev.setAttribute("fill", "none");
    chev.innerHTML =
      '<path d="M3 6l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
    h2.appendChild(chev);

    if (i === 0) sec.classList.add("open");

    h2.addEventListener("click", () => sec.classList.toggle("open"));
  });

  document
    .getElementById("crExpandAll")
    ?.addEventListener("click", () =>
      sections.forEach((s) => s.classList.add("open")),
    );
  document
    .getElementById("crCollapseAll")
    ?.addEventListener("click", () =>
      sections.forEach((s) => s.classList.remove("open")),
    );
}

/* ── Analyse ── */
btnAnalyse.addEventListener("click", async () => {
  hideError();
  resultSection.classList.remove("visible");

  if (activeMethod === "pdf" && !selectedFile) {
    showError(
      "Veuillez sélectionner un fichier PDF avant de lancer l'analyse.",
    );
    return;
  }
  if (activeMethod === "text") {
    const txt = textInput.value.trim();
    if (!txt) {
      showError("Veuillez coller le texte de vos conditions générales.");
      return;
    }
  }

  setLoading(true);
  const t0 = performance.now();
  try {
    let response;
    if (activeMethod === "pdf") {
      const form = new FormData();
      form.append("source", "pdfFile");
      form.append("file", selectedFile, selectedFile.name);
      response = await fetch(WEBHOOK_URL, { method: "POST", body: form });
    } else {
      response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "raw",
          text: textInput.value.trim(),
        }),
      });
    }

    if (!response.ok) throw new Error("server_error");

    const ct = response.headers.get("content-type") || "";
    let html;
    if (ct.includes("application/json")) {
      const json = await response.json();
      html =
        json.html ||
        json.result ||
        json.content ||
        JSON.stringify(json, null, 2);
    } else {
      html = await response.text();
    }

    const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
    resultContent.innerHTML = html;
    initAccordion();

    document.getElementById("resultTiming").textContent = `⏱ ${elapsed} s`;
    resultBadge.textContent =
      activeMethod === "pdf"
        ? selectedFile.name
        : `Texte collé (${textInput.value.trim().length.toLocaleString("fr-FR")} car.)`;
    resultSection.classList.add("visible");
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (err) {
    showError(
      "Une erreur est survenue lors de l'analyse. Veuillez réessayer dans quelques instants.",
    );
  } finally {
    setLoading(false);
  }
});

/* ── Reset ── */
btnReset.addEventListener("click", () => {
  resultSection.classList.remove("visible");
  resultContent.innerHTML = "";
  hideError();
  selectedFile = null;
  fileInput.value = "";
  fileChosen.classList.remove("visible");
  textInput.value = "";
  charCount.textContent = "0 caractère";
  window.scrollTo({ top: 0, behavior: "smooth" });
});
