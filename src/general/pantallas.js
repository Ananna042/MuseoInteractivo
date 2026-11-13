// =====================================================================
//  pantallas.js  -  PANTALLAS A TODO EL ANCHO (Game Over, Nivel completado, Victoria)
//
//  Uso:
//    mostrarPantalla({
//      tono: "mal",                 // "mal" (rojo), "bien" (verde) o "victoria" (dorado con confeti)
//      titulo: "GAME OVER",
//      mensaje: "Te quedaste sin vidas.",
//      detalle: "Nivel 1",          // opcional, línea chica
//      boton: "Volver a empezar",
//      alBoton: () => location.reload(),
//    });
//
//  El botón también se activa con Enter o con la barra espaciadora.
//  Está por encima de todo (quiz, panel de obras, HUD).
// =====================================================================

export function mostrarPantalla({
  tono = "mal",
  titulo = "",
  mensaje = "",
  detalle = "",
  boton = "Continuar",
  alBoton = () => {},
} = {}) {
  const overlay = document.createElement("div");
  overlay.className = `pantalla-overlay ${tono}`;
  overlay.innerHTML = `
    <div class="pantalla-caja">
      <div class="pantalla-titulo"></div>
      <div class="pantalla-mensaje"></div>
      <div class="pantalla-detalle"></div>
      <button class="pantalla-boton" type="button"></button>
    </div>
  `;
  overlay.querySelector(".pantalla-titulo").textContent = titulo;
  overlay.querySelector(".pantalla-mensaje").textContent = mensaje;
  overlay.querySelector(".pantalla-detalle").textContent = detalle;
  const btn = overlay.querySelector(".pantalla-boton");
  btn.textContent = boton;

  // victoria: lluvia de confeti pixelado detrás de la caja
  if (tono === "victoria") {
    const colores = ["#ffd34d", "#ff6b6b", "#5fd38d", "#6cb8ff", "#ff9ee0", "#ffffff"];
    for (let i = 0; i < 36; i++) {
      const c = document.createElement("span");
      c.className = "confeti";
      c.style.left = `${Math.random() * 100}%`;
      c.style.background = colores[i % colores.length];
      c.style.animationDuration = `${2.2 + Math.random() * 2.4}s`;
      c.style.animationDelay = `${-Math.random() * 4}s`;
      overlay.appendChild(c);
    }
  }

  let usada = false;
  function activar() {
    if (usada) return;
    usada = true;
    document.removeEventListener("keydown", alTecla, true);
    alBoton();
  }
  function alTecla(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      activar();
    }
  }

  btn.addEventListener("click", activar);
  // en fase de captura, para que la E / flechas del juego no se cuelen mientras está la pantalla
  document.addEventListener("keydown", alTecla, true);

  document.body.appendChild(overlay);
  btn.focus();

  return {
    cerrar() {
      document.removeEventListener("keydown", alTecla, true);
      overlay.remove();
    },
  };
}