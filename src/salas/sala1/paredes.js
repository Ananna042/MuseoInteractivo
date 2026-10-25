// Cuánto crece el mapa hacia la izquierda (en px). 2800 = 2 pantallas más de 1400 → mapa de 4200px (el triple).
export const AMPLIACION = 2800;

export function crearParedes() {
  const sala = document.createElement("div");

  sala.classList.add("sala");

  // Tiene que coincidir con --pared-y en sala1.css
  const PARED_Y = 303;

  // Medidas de cada pared nueva (el ancho es el mismo que en el CSS: 472px)
  const PARED_ANCHO = 472;
  const PARED_ALTO = 120;   // igual que la pared de arriba
  const SALA_ANCHO = 1400;

  // Colchón extra de colisión en las paredes nuevas
  const MARGEN_ARRIBA = 20; // el personaje se frena antes por arriba
  const MARGEN_LADO = 8;    // y antes en los bordes que dan al hueco

  // Las coordenadas siguen siendo las de la sala original (0 = borde izquierdo de la sala).
  // La zona ampliada queda en x negativas: de -AMPLIACION a 0.
  const limites = {
    izquierda: 8 - AMPLIACION,   // nuevo borde izquierdo (antes 29)
    derecha: 1392,
    arriba: 53,
    abajo: 583,
  };

  const obstaculos = [
    // pared de arriba: ahora recorre todo el mapa, ampliación incluida
    { x: -AMPLIACION, y: 0, ancho: SALA_ANCHO + AMPLIACION, alto: 120 },

    // pared nueva izquierda: crece hacia arriba y hacia el hueco (derecha)
    {
      x: 0,
      y: PARED_Y - MARGEN_ARRIBA,
      ancho: PARED_ANCHO + MARGEN_LADO,
      alto: PARED_ALTO + MARGEN_ARRIBA,
    },

    // pared nueva derecha: crece hacia arriba y hacia el hueco (izquierda)
    {
      x: SALA_ANCHO - PARED_ANCHO - MARGEN_LADO,
      y: PARED_Y - MARGEN_ARRIBA,
      ancho: PARED_ANCHO + MARGEN_LADO,
      alto: PARED_ALTO + MARGEN_ARRIBA,
    },
  ];

  sala.limites = limites;
  sala.obstaculos = obstaculos;

  return sala;
}