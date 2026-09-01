export function crearPersonaje(limites) {
  const usuario = document.createElement("div");

  usuario.classList.add("usuario");

  let posicionX = 500;
  let posicionY = 250;

  const velocidad = 10;
  const tamaño = 30;

  function moverPersonaje(tecla) {
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
if (posicionX < limites.izquierda) {
  posicionX = limites.izquierda;
}
if (posicionX > limites.derecha - tamaño) {
  posicionX = limites.derecha - tamaño;
}

// Límites verticales
if (posicionY < limites.arriba) {
  posicionY = limites.arriba;
}
if (posicionY > limites.abajo - tamaño) {
  posicionY = limites.abajo - tamaño;
}


    usuario.style.left = `${posicionX}px`;
    usuario.style.top = `${posicionY}px`;
  }

  document.addEventListener("keydown", (evento) => {
    moverPersonaje(evento.key);
  });

  usuario.style.left = `${posicionX}px`;
  usuario.style.top = `${posicionY}px`;

  return usuario;
}
