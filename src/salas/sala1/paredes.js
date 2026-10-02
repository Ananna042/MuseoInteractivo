export function crearParedes() {
  const sala = document.createElement("div");

  sala.classList.add("sala");

  const limites = {
    izquierda: 40,
    derecha: 1395,
    arriba: 53,
    abajo: 622,
  };

  const obstaculos = [
    { x: 0, y: 0, ancho: 1400, alto: 150 },
  ];

  sala.limites = limites;
  sala.obstaculos = obstaculos;

  

  return sala;
}