// Reproductor con audio real desde un archivo local ("song.mp3").
// Mantiene la UI personalizada estilo Spotify.

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const fill = document.getElementById("fill");
const curTime = document.getElementById("curTime");
const bar = document.getElementById("bar");
const totalTimeEl = document.getElementById("totalTime");

function fmt(sec) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function render() {
  const dur = audio.duration || 0;
  fill.style.width = (dur ? (audio.currentTime / dur) * 100 : 0) + "%";
  curTime.textContent = fmt(audio.currentTime);
  if (totalTimeEl) totalTimeEl.textContent = fmt(dur);
}

function setPlayingUI(playing) {
  playBtn.textContent = playing ? "⏸" : "▶";
  playBtn.title = playing ? "Pausar" : "Reproducir";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) audio.play();
  else audio.pause();
});

audio.addEventListener("play", () => setPlayingUI(true));
audio.addEventListener("pause", () => setPlayingUI(false));
audio.addEventListener("ended", () => setPlayingUI(false));
audio.addEventListener("timeupdate", render);
audio.addEventListener("loadedmetadata", render);

// clic en la barra para saltar
bar.addEventListener("click", (e) => {
  const rect = bar.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  if (audio.duration) audio.currentTime = ratio * audio.duration;
  render();
});

render();
