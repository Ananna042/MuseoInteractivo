export function crearParedes() {
  const sala = document.createElement("div");

  sala.classList.add("sala");

  // Medidas internas de la sala
  const limites = {
    izquierda: 15,
    arriba: 15,
    derecha: 1005,
    abajo: 505
  };

  sala.limites = limites;

  return sala;
}