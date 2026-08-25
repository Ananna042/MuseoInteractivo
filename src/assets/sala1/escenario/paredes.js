export function crearParedes() {
  const sala = document.createElement("div");

  sala.classList.add("sala");

  // Medidas internas de la sala
  const limites = {
    izquierda: 0,
    arriba: 0,
    derecha: 800,
    abajo: 500,
  };

  sala.limites = limites;

  return sala;
}
