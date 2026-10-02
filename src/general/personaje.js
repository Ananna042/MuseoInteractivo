export function crearPersonaje(limites, obstaculos = []) {
  const usuario = document.createElement("div");
  usuario.classList.add("usuario");

  let posicionX = 1100;
  let posicionY = 250;

  const velocidad = 10;

  // Caja REAL de colisión
  const tamaño = 30;

  // Tamaño VISUAL del personaje
  const TAMAÑO_VISUAL = 70;
  const OFFSET_VISUAL = (TAMAÑO_VISUAL - tamaño) / 2;

  const CELDA = 362;
  const ESCALA = TAMAÑO_VISUAL / CELDA;

  const FILA = { abajo: 0, izquierda: 1, derecha: 2, arriba: 3 };
  const COLUMNA_IDLE = 1;
  const COLUMNAS_CAMINATA = [0, 2];
  const DURACION_FRAME = 200;

  let direccionActual = "abajo";
  let frameCaminataIndex = 0;
  let timeoutIdle = null;
  let ultimoCambioFrame = 0;

  usuario.style.backgroundImage = "url('/personajefinal.png')";
  usuario.style.width = `${TAMAÑO_VISUAL}px`;
  usuario.style.height = `${TAMAÑO_VISUAL}px`;
  usuario.style.backgroundSize = `${CELDA * 3 * ESCALA}px ${CELDA * 4 * ESCALA}px`;
  usuario.style.backgroundRepeat = "no-repeat";

  function actualizarSprite(fila, columna) {
    const x = -(columna * CELDA * ESCALA);
    const y = -(fila * CELDA * ESCALA);
    usuario.style.backgroundPosition = `${x}px ${y}px`;
  }

  function ponerIdle() {
    actualizarSprite(FILA[direccionActual], COLUMNA_IDLE);
  }

  function avanzarFrameCaminata() {
    const ahora = Date.now();
    if (ahora - ultimoCambioFrame >= DURACION_FRAME) {
      frameCaminataIndex = (frameCaminataIndex + 1) % COLUMNAS_CAMINATA.length;
      actualizarSprite(FILA[direccionActual], COLUMNAS_CAMINATA[frameCaminataIndex]);
      ultimoCambioFrame = ahora;
    }
    clearTimeout(timeoutIdle);
    timeoutIdle = setTimeout(ponerIdle, 150);
  }

  function actualizarPosicionVisual() {
    usuario.style.left = `${posicionX - OFFSET_VISUAL}px`;
    usuario.style.top = `${posicionY - OFFSET_VISUAL}px`;
  }

  function hayColision(rectA, rectB) {
    return (
      rectA.x < rectB.x + rectB.ancho &&
      rectA.x + rectA.ancho > rectB.x &&
      rectA.y < rectB.y + rectB.alto &&
      rectA.y + rectA.alto > rectB.y
    );
  }

  // Mueve un solo eje (x o y) y, si choca, encaja el personaje
  // justo contra el borde del obstáculo (sin dejar espacio de sobra).
  function moverEje(eje, delta) {
    let nuevaX = posicionX;
    let nuevaY = posicionY;

    if (eje === "x") nuevaX += delta;
    else nuevaY += delta;

    // límites de la sala
    nuevaX = Math.max(limites.izquierda, Math.min(nuevaX, limites.derecha - tamaño));
    nuevaY = Math.max(limites.arriba, Math.min(nuevaY, limites.abajo - tamaño));

    let caja = { x: nuevaX, y: nuevaY, ancho: tamaño, alto: tamaño };

    for (const obs of obstaculos) {
      if (hayColision(caja, obs)) {
        if (eje === "x") {
          // si me muevo hacia la derecha, encajo justo a la izquierda del obstáculo
          // si me muevo hacia la izquierda, encajo justo a la derecha del obstáculo
          nuevaX = delta > 0 ? obs.x - tamaño : obs.x + obs.ancho;
        } else {
          nuevaY = delta > 0 ? obs.y - tamaño : obs.y + obs.alto;
        }
        caja = { x: nuevaX, y: nuevaY, ancho: tamaño, alto: tamaño };
      }
    }

    posicionX = nuevaX;
    posicionY = nuevaY;
  }

  function moverPersonaje(tecla) {
    let seMovio = false;

    if (tecla === "ArrowUp" || tecla === "w") {
      moverEje("y", -velocidad);
      direccionActual = "arriba";
      seMovio = true;
    }
    if (tecla === "ArrowDown" || tecla === "s") {
      moverEje("y", velocidad);
      direccionActual = "abajo";
      seMovio = true;
    }
    if (tecla === "ArrowLeft" || tecla === "a") {
      moverEje("x", -velocidad);
      direccionActual = "izquierda";
      seMovio = true;
    }
    if (tecla === "ArrowRight" || tecla === "d") {
      moverEje("x", velocidad);
      direccionActual = "derecha";
      seMovio = true;
    }

    actualizarPosicionVisual();

    if (seMovio) {
      avanzarFrameCaminata();
    }
  }

  document.addEventListener("keydown", (evento) => {
    moverPersonaje(evento.key);
  });

  actualizarPosicionVisual();
  ponerIdle();



  usuario.obtenerPosicion = () => {
    return {
      x: posicionX,
      y: posicionY
    };
  };

  return usuario;
}