// Background Matrix merah
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#f00";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

// Viewer logic
const urlInput = document.getElementById("urlInput");
const fetchBtn = document.getElementById("fetchBtn");
const proxyBtn = document.getElementById("proxyBtn");
const renderBtn = document.getElementById("renderBtn");
const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyBtn");
const sourceCode = document.getElementById("sourceCode");
const preview = document.getElementById("preview");
const debug = document.getElementById("debug");

async function fetchSource(useProxy = false) {
  let url = urlInput.value.trim();
  if (!url.startsWith("http")) url = "https://" + url;

  let fetchUrl = url;
  if (useProxy) fetchUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);

  try {
    debug.innerText = "Mengambil source dari: " + fetchUrl;
    const res = await fetch(fetchUrl);
    if (!res.ok) throw new Error("Gagal mengambil: " + res.status);
    const text = await res.text();
    sourceCode.value = text;
    debug.innerText = "Berhasil mengambil source dari " + url;
  } catch (e) {
    debug.innerText = "Error: " + e.message;
  }
}

fetchBtn.onclick = () => fetchSource(false);
proxyBtn.onclick = () => fetchSource(true);
renderBtn.onclick = () => {
  preview.srcdoc = sourceCode.value;
  debug.innerText = "Preview dirender dari editor.";
};
downloadBtn.onclick = () => {
  const blob = new Blob([sourceCode.value], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "source.html";
  a.click();
};
copyBtn.onclick = () => {
  sourceCode.select();
  document.execCommand("copy");
  debug.innerText = "Source code disalin ke clipboard.";
};

// Music control
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
let playing = false;

musicBtn.onclick = () => {
  if (playing) {
    bgMusic.pause();
    musicBtn.innerText = "▶ Play Music";
  } else {
    bgMusic.play();
    musicBtn.innerText = "⏸ Pause Music";
  }
  playing = !playing;
};