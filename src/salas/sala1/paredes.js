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
  const TERCERA_X = -AMPLIACION + 0;
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


    // ===== Esculturas (las 7 nuevas, todas con el mismo pedestal) =====
  // Tienen que coincidir con el CSS: todas "auto 130px" (102 x 130 px)
   // ===== Esculturas (las 7 nuevas, todas con el mismo pedestal) =====
  // Tienen que coincidir con el CSS: todas "auto 130px" (102 x 130 px)
   // ===== Esculturas (las 7 nuevas, todas con el mismo pedestal) =====
  // Tienen que coincidir con el CSS: todas "auto 130px" (102 x 130 px)
  const ESC_ALTO = 130;     // = "auto 130px" del CSS
  const ESC_OFFSET_X = 2240; // = left: -2240px de .sala::before (las del ::before)
  const ESC_Y = 350;         // = --esc-y

  // Medidas comunes de los PNG (1008 x 1284, celda de 12px)
  const IMG_ALTO = 1284;
  const BLOQUE_X0 = 240;    // borde izquierdo del bloque
  const BLOQUE_X1 = 768;    // borde derecho del bloque
  const TOPE_ESC = 288;     // tope común de todas las esculturas (fila 24)
  const FONDO_PED = 1260;   // base del pedestal

  // Márgenes de colisión de las esculturas
  const MARGEN_LADO_ESC = 6;       // colchón a los costados
  const MARGEN_ARRIBA_ESC = 16;    // más = el personaje se frena más lejos por arriba
  const RECORTE_ABAJO_ESC = 25;     // más = el personaje se acerca más por abajo

  function colisionEscultura(x, y) {
    const s = ESC_ALTO / IMG_ALTO;
    const arriba = y + TOPE_ESC * s - MARGEN_ARRIBA_ESC;
    const abajo = y + FONDO_PED * s - RECORTE_ABAJO_ESC;
    return {
      x: Math.round(x + BLOQUE_X0 * s - MARGEN_LADO_ESC),
      y: Math.round(arriba),
      ancho: Math.round((BLOQUE_X1 - BLOQUE_X0) * s + MARGEN_LADO_ESC * 2),
      alto: Math.round(abajo - arriba),
    };
  }

  const esculturas = [
    // sala (pantalla del piano)
    colisionEscultura(650, 200),                              // escultura2
    colisionEscultura(650, 390),                              // escultura1

    // pantalla del medio
    colisionEscultura(1680 - ESC_OFFSET_X, ESC_Y),            // escultura3
    colisionEscultura(1940 - ESC_OFFSET_X, ESC_Y),            // escultura4

    // pantalla de la izquierda (al lado del piano)
    colisionEscultura(590 - ESC_OFFSET_X, ESC_Y),             // escultura5
    colisionEscultura(790 - ESC_OFFSET_X, ESC_Y + 35),        // escultura6 (más abajo)
    colisionEscultura(990 - ESC_OFFSET_X, ESC_Y),             // escultura7
  ];


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
    ...esculturas,
  ];

  sala.limites = limites;
  sala.obstaculos = obstaculos;

  return sala;
}