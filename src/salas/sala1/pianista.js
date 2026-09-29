const COLUMNAS = 4;
const TAMANO_FRAME = 70; // debe coincidir con el width/height del CSS

// duraciones más largas (antes eran muy rápidas, por eso se sentía brusco)
const DURACIONES = [440, 440, 220, 220, 220, 220, 220, 160];

export function iniciarPianista() {
  const pianista = document.getElementById('pianista');
  let frameActual = 0;

  function animar() {
    const col = frameActual % COLUMNAS;
    const fila = Math.floor(frameActual / COLUMNAS);

    pianista.style.backgroundPosition = `-${col * TAMANO_FRAME}px -${fila * TAMANO_FRAME}px`;

    frameActual = (frameActual + 1) % DURACIONES.length;
    setTimeout(animar, DURACIONES[frameActual]);
  }

  animar();
}