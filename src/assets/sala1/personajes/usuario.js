export function crearUsuario(limites) {
  const usuario = document.createElement("div");

  usuario.classList.add("usuario");

  let posicionX = 400;
  let posicionY = 250;

  const velocidad = 5;
  const tamaño = 30;

  function moverUsuario(tecla) {
    if (tecla === "ArrowUp" || tecla === "w") {
      posicionY -= velocidad;
    }

    if (tecla === "ArrowDown" || tecla === "s") {
      posicionY += velocidad;
    }

    if (tecla === "ArrowLeft" || tecla === "a") {
      posicionX -= velocidad;
    }

    if (tecla === "ArrowRight" || tecla === "d") {
      posicionX += velocidad;
    }

    // Límites horizontales
    if (posicionX < 0) {
      posicionX = 0;
    }

    if (posicionX > limites.derecha - tamaño) {
      posicionX = limites.derecha - tamaño;
    }

    // Límites verticales
    if (posicionY < 0) {
      posicionY = 0;
    }

    if (posicionY > limites.abajo - tamaño) {
      posicionY = limites.abajo - tamaño;
    }

    usuario.style.left = `${posicionX}px`;
    usuario.style.top = `${posicionY}px`;
  }

  document.addEventListener("keydown", (evento) => {
    moverUsuario(evento.key);
  });

  usuario.style.left = `${posicionX}px`;
  usuario.style.top = `${posicionY}px`;

  return usuario;
}
