export function crearParedes() {
  const sala = document.createElement("div");

  sala.classList.add("sala");

  const limites = {
    izquierda: 45,
    derecha: 1383,
    arriba: 53,
    abajo: 506,
  };

  const obstaculos = [
    { x: 0, y: 0, ancho: 1400, alto: 100 },
  ];

  sala.limites = limites;
  sala.obstaculos = obstaculos;

  

  return sala;
}