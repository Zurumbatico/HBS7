// Portada de entrada: al pulsar "Leer", inicia la música y la escritura
// de la carta, y desvanece la portada. El clic satisface el requisito de
// interacción del navegador para reproducir audio.

(function () {
  const intro = document.getElementById("intro");
  const openBtn = document.getElementById("openBtn");
  const audio = document.getElementById("audio");

  function open() {
    if (audio) audio.play().catch(() => {});
    window.dispatchEvent(new Event("start-letter"));
    intro.classList.add("hide");
    setTimeout(() => intro.remove(), 750);
    openBtn.removeEventListener("click", open);
  }

  openBtn.addEventListener("click", open);
})();
