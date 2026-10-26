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

  // Pared del medio de la 3ra pantalla (la de más a la izquierda del mapa).
  // tercerapared.png mide 933px y se dibuja a 943px (mismo estirado que las otras paredes)
  const TERCERA_ANCHO = 943;
  const TERCERA_X = -AMPLIACION + (SALA_ANCHO - TERCERA_ANCHO) / 2;  // centrada en esa pantalla

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



    // Bancas de la pantalla del medio (tienen que coincidir con .sala::after en el CSS)
  const BANCA_CANTIDAD = 3;
  const BANCA_ANCHO = 210;
  const BANCA_Y = 210;
  const BANCA_MARGEN_ARRIBA = 5;   // colchón propio de las bancas (probá 0 a 10)
  const BANCA_MARGEN_IMG = 66 * (BANCA_ANCHO / 600);       // margen transparente de banca.png
  const BANCA_VISIBLE_ANCHO = 468 * (BANCA_ANCHO / 600);
  const BANCA_VISIBLE_ALTO = 156 * (BANCA_ANCHO / 600);    // antes tenía 100
  const BANCA_HUECO = (SALA_ANCHO - BANCA_CANTIDAD * BANCA_ANCHO) / (BANCA_CANTIDAD + 1);

  const bancas = [];
  for (let i = 0; i < BANCA_CANTIDAD; i++) {
    const xImagen = -SALA_ANCHO + BANCA_HUECO + i * (BANCA_ANCHO + BANCA_HUECO);
    bancas.push({
      x: Math.round(xImagen + BANCA_MARGEN_IMG - MARGEN_LADO),
      y: Math.round(BANCA_Y + BANCA_MARGEN_IMG - BANCA_MARGEN_ARRIBA),
      ancho: Math.round(BANCA_VISIBLE_ANCHO + MARGEN_LADO * 2),
      alto: Math.round(BANCA_VISIBLE_ALTO + BANCA_MARGEN_ARRIBA),
    });
  }







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

    // tercera pared: queda libre por los dos lados, así que lleva colchón en ambos
    {
      x: TERCERA_X - MARGEN_LADO,
      y: PARED_Y - MARGEN_ARRIBA,
      ancho: TERCERA_ANCHO + MARGEN_LADO * 2,
      alto: PARED_ALTO + MARGEN_ARRIBA,
    },

        ...bancas,


  ];

  sala.limites = limites;
  sala.obstaculos = obstaculos;

  return sala;
}