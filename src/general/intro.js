// =====================================================================
//  intro.js  -  PANTALLA DE INICIO ("PRESS START")
//
//  Se muestra arriba de todo el juego. Con un click, Enter o la barra espaciadora:
//    1) hace un fundido a negro (0,5 s) y se quita
//    2) llama a alEmpezar() -> ahí arranca la música y la misión
//
//  Mientras está visible, el teclado NO llega al juego (no se mueve el personaje).
//
//  Uso:
//    mostrarIntro({ alEmpezar: () => ... });
// =====================================================================

const FUENTE = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
const LETRAS_1 = "PRESS";
const LETRAS_2 = "START";

const fila = (texto) =>
  `<span class="intro-fila">${[...texto].map(l => `<span class="intro-l">${l}</span>`).join("")}</span>`;

export function mostrarIntro({ alEmpezar = () => {} } = {}) {
  if (!document.querySelector(`link[href="${FUENTE}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FUENTE;
    document.head.appendChild(link);
  }

  const overlay = document.createElement("div");
  overlay.className = "intro";
  overlay.innerHTML = `
    <main class="intro-contenido">
      <div class="intro-subtitulo">MUSEO ADVENTURE</div>

      <div class="intro-titulo-caja">
        <h1 class="intro-titulo" aria-label="PRESS START">${fila(LETRAS_1)}${fila(LETRAS_2)}</h1>
        ${[1, 2, 3, 4, 5, 6, 7].map(n => `<span class="intro-destello d${n}"></span>`).join("")}
      </div>

      <div class="intro-press">PRESS START!</div>
      <div class="intro-credito">PROYECTO GRUPAL 6to B - ESCUELA TECNICA UBA</div>
    </main>
  `;
  document.body.appendChild(overlay);

  let salio = false;

  function empezar() {
    if (salio) return;
    salio = true;
    window.removeEventListener("keydown", alTecla, true);
    overlay.classList.add("saliendo");
    alEmpezar();
    setTimeout(() => overlay.remove(), 500);
  }

  // en fase de captura y en window: se adelanta a cualquier otro listener del juego
  function alTecla(e) {
    e.stopPropagation();
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      empezar();
    }
  }

  overlay.addEventListener("click", empezar);
  window.addEventListener("keydown", alTecla, true);
}