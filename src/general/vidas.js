// =====================================================================
//  vidas.js  -  HUD de vidas (corazón pixel art + número, arriba a la izquierda)
//  Es general: sirve para cualquier sala.
//
//  Uso:
//    const vidas = crearVidas({ alSinVidas: () => ... });
//    vidas.perder();      // -1 vida (animación de golpe)
//    vidas.ganar();       // +1 vida (nunca pasa de MAX_VIDAS)
//    vidas.reiniciar();   // vuelve a MAX_VIDAS
//    vidas.obtener();     // cantidad actual
// =====================================================================

export const MAX_VIDAS = 5;

export function crearVidas({ alSinVidas = () => {} } = {}) {
  let cantidad = MAX_VIDAS;

  const hud = document.createElement("div");
  hud.className = "hud-vidas";
  hud.innerHTML = `
    <img class="hud-corazon" src="/corazon.png" alt="Vidas">
    <span class="hud-vidas-numero"></span>
  `;
  const numero = hud.querySelector(".hud-vidas-numero");
  document.body.appendChild(hud);

  function pintar() {
    numero.textContent = cantidad;
  }

  function animar(clase) {
    hud.classList.remove("perdiendo", "ganando");
    void hud.offsetWidth; // fuerza a que la animación arranque de nuevo
    hud.classList.add(clase);
  }

  pintar();

  return {
    obtener: () => cantidad,

    perder() {
      if (cantidad <= 0) return;
      cantidad--;
      pintar();
      animar("perdiendo");
      if (cantidad === 0) alSinVidas();
    },

    ganar() {
      if (cantidad >= MAX_VIDAS) return;
      cantidad++;
      pintar();
      animar("ganando");
    },

    reiniciar() {
      cantidad = MAX_VIDAS;
      pintar();
    },

    elemento: hud,
  };
}