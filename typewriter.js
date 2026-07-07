// Efecto máquina de escribir: la carta se va escribiendo sola, párrafo por
// párrafo, con un cursor parpadeante. Un clic sobre la carta la revela toda.

(function () {
  const letter = document.querySelector(".letter");
  const els = [...letter.querySelectorAll("h2, p")];
  const texts = els.map((e) => e.textContent.replace(/\s+/g, " ").trim());

  // limpiar y ocultar todo lo que aún no se ha escrito
  els.forEach((e) => {
    e.textContent = "";
    e.classList.add("pending");
  });
  letter.classList.add("typing");

  const caret = document.createElement("span");
  caret.className = "caret";

  const SPEED = 24;   // ms por carácter
  let ei = 0;         // índice de elemento (párrafo)
  let ci = 0;         // índice de carácter
  let finished = false;

  function type() {
    if (finished) return;
    if (ei >= els.length) return end();

    const el = els[ei];
    const txt = texts[ei];

    if (ci === 0) {
      el.classList.remove("pending");
      el.appendChild(caret);
    }

    if (ci < txt.length) {
      const ch = txt[ci];
      el.insertBefore(document.createTextNode(ch), caret);
      ci++;
      letter.scrollTop = letter.scrollHeight;

      // pausas naturales en la puntuación
      let delay = SPEED + Math.random() * 30;
      if (".!?".includes(ch)) delay = SPEED * 16;
      else if (",;:…".includes(ch)) delay = SPEED * 7;
      setTimeout(type, delay);
    } else {
      ei++;
      ci = 0;
      setTimeout(type, SPEED * 12); // pausa entre párrafos
    }
  }

  function end() {
    finished = true;
    caret.remove();
    letter.classList.remove("typing");
  }

  // clic: revelar toda la carta al instante
  function revealAll() {
    if (finished) return;
    finished = true;
    els.forEach((e, i) => {
      e.classList.remove("pending");
      e.textContent = texts[i];
    });
    caret.remove();
    letter.classList.remove("typing");
    letter.scrollTop = 0;
  }
  letter.addEventListener("click", revealAll);

  type();
})();
