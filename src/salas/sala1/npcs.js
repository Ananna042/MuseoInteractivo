export function crearNPC(limites, obstaculos = []) {
  const npc = document.createElement("div");
  npc.classList.add("npc");

  let posicionX = 700;
  let posicionY = 350;

  const velocidad = 2;

  const tamaño = 30;
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
  let ultimoCambioFrame = 0;

  npc.style.backgroundImage = "url('/npcuno.png')";
  npc.style.width = `${TAMAÑO_VISUAL}px`;
  npc.style.height = `${TAMAÑO_VISUAL}px`;
  npc.style.backgroundSize = `${CELDA * 3 * ESCALA}px ${CELDA * 4 * ESCALA}px`;
  npc.style.backgroundRepeat = "no-repeat";

  function actualizarSprite(fila, columna) {
    const x = -(columna * CELDA * ESCALA);
    const y = -(fila * CELDA * ESCALA);
    npc.style.backgroundPosition = `${x}px ${y}px`;
  }

  function ponerIdle() {
    actualizarSprite(FILA[direccionActual], COLUMNA_IDLE);
  }

  function avanzarFrameCaminata(ahora) {
    if (ahora - ultimoCambioFrame >= DURACION_FRAME) {
      frameCaminataIndex = (frameCaminataIndex + 1) % COLUMNAS_CAMINATA.length;
      actualizarSprite(FILA[direccionActual], COLUMNAS_CAMINATA[frameCaminataIndex]);
      ultimoCambioFrame = ahora;
    }
  }

  function actualizarPosicionVisual() {
    npc.style.left = `${posicionX - OFFSET_VISUAL}px`;
    npc.style.top = `${posicionY - OFFSET_VISUAL}px`;
  }

  function hayColision(rectA, rectB) {
    return (
      rectA.x < rectB.x + rectB.ancho &&
      rectA.x + rectA.ancho > rectB.x &&
      rectA.y < rectB.y + rectB.alto &&
      rectA.y + rectA.alto > rectB.y
    );
  }

  function moverEje(eje, delta) {
    let nuevaX = posicionX;
    let nuevaY = posicionY;

    if (eje === "x") nuevaX += delta;
    else nuevaY += delta;

    nuevaX = Math.max(limites.izquierda, Math.min(nuevaX, limites.derecha - tamaño));
    nuevaY = Math.max(limites.arriba, Math.min(nuevaY, limites.abajo - tamaño));

    const caja = { x: nuevaX, y: nuevaY, ancho: tamaño, alto: tamaño };

    for (const obs of obstaculos) {
      if (hayColision(caja, obs)) {
        return false;
      }
    }

    posicionX = nuevaX;
    posicionY = nuevaY;
    return true;
  }

  // --- Movimiento aleatorio (wander) ---
  const direcciones = ["arriba", "abajo", "izquierda", "derecha"];
  let direccionWander = null;
  let enPausa = false;
  let tiempoRestante = 0;

  function puedeMover(eje, delta) {
    let nuevaX = posicionX;
    let nuevaY = posicionY;
    if (eje === "x") nuevaX += delta;
    else nuevaY += delta;

    nuevaX = Math.max(limites.izquierda, Math.min(nuevaX, limites.derecha - tamaño));
    nuevaY = Math.max(limites.arriba, Math.min(nuevaY, limites.abajo - tamaño));

    const caja = { x: nuevaX, y: nuevaY, ancho: tamaño, alto: tamaño };
    return !obstaculos.some(obs => hayColision(caja, obs));
  }

  function direccionLibre(direccion) {
    const pasoPrueba = 5;
    if (direccion === "arriba") return puedeMover("y", -pasoPrueba);
    if (direccion === "abajo") return puedeMover("y", pasoPrueba);
    if (direccion === "izquierda") return puedeMover("x", -pasoPrueba);
    if (direccion === "derecha") return puedeMover("x", pasoPrueba);
    return false;
  }

  function elegirNuevaAccion() {
    const disponibles = direcciones.filter(direccionLibre);

    if (disponibles.length === 0) {
      enPausa = true;
      tiempoRestante = 500;
      ponerIdle();
      return;
    }

    if (Math.random() < 0.3) {
      enPausa = true;
      tiempoRestante = 1000 + Math.random() * 2000;
      ponerIdle();
    } else {
      enPausa = false;
      direccionWander = disponibles[Math.floor(Math.random() * disponibles.length)];
      direccionActual = direccionWander;
      tiempoRestante = 800 + Math.random() * 1500;
    }
  }

  elegirNuevaAccion();

  let ultimoFrame = performance.now();

  function loop(ahora) {
    const delta = ahora - ultimoFrame;
    ultimoFrame = ahora;

    if (enPausa) {
      tiempoRestante -= delta;
      if (tiempoRestante <= 0) elegirNuevaAccion();
    } else {
      let seMovio = false;
      if (direccionWander === "arriba") seMovio = moverEje("y", -velocidad);
      if (direccionWander === "abajo") seMovio = moverEje("y", velocidad);
      if (direccionWander === "izquierda") seMovio = moverEje("x", -velocidad);
      if (direccionWander === "derecha") seMovio = moverEje("x", velocidad);

      if (!seMovio) {
        elegirNuevaAccion();
      } else {
        avanzarFrameCaminata(ahora);
        tiempoRestante -= delta;
        if (tiempoRestante <= 0) elegirNuevaAccion();
      }
    }

    actualizarPosicionVisual();
    requestAnimationFrame(loop);
  }

  actualizarPosicionVisual();
  ponerIdle();
  requestAnimationFrame(loop);

  npc.obtenerPosicion = () => ({ x: posicionX, y: posicionY });

  return npc;
}