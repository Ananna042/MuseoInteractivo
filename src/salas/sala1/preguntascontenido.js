// =====================================================================
//  PREGUNTAS DE LAS OBRAS Y ESCULTURAS  (solo datos)
//
//  Cada pieza tiene 2 preguntas. Cada pregunta tiene 3 opciones:
//    - la CORRECTA se toma sola de la información de la pieza
//      (obrascontenido.js / esculturascontenido.js), según el "campo"
//    - las 2 INCORRECTAS las escribís vos en "incorrectas"
//
//  CÓMO SE USA
//  - "campo" dice de dónde sale la respuesta correcta:
//      autor, fecha, tecnica, estilo, genero, escuela, periodo, soporte, objeto, origen
//  - {titulo} en el texto se cambia solo por el título de la pieza.
//  - Si cambiás la info de una pieza, la respuesta correcta se actualiza sola.
//    Lo único que hay que revisar es que ninguna "incorrecta" quede igual
//    a la nueva respuesta correcta.
//  - Podés poner más de 2 incorrectas: el juego elige 2 al azar cada vez.
//  - Para una pregunta que no salga de un campo, en vez de "campo" escribí
//    correcta: "la respuesta"   (y dejá el texto completo, sin {titulo} si no lo necesitás)
//
//  REGLAS PARA NO ROMPER NADA
//  - No borres comas, llaves { } ni corchetes [ ].
//  - Usá comillas dobles "  " para los textos.
//  - Que las incorrectas tengan el mismo formato que la correcta
//    (ej.: autores como "Apellido, Nombre"), así no se nota cuál es.
//
//  Las claves (1, 2, 3...) son el NÚMERO de la pieza, igual que en el contenido.
// =====================================================================

export const PREGUNTAS_OBRAS = {

  // ---------------- 1 · Le Moulin de la Galette ----------------
  1: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Monet, Claude", "Cézanne, Paul"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Cubismo", "Barroco"] },
  ],

  // ---------------- 2 · La berge de La Seine ----------------
  2: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Sisley, Alfred", "Renoir, Pierre-Auguste"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1865", "1897"] },
  ],

  // ---------------- 3 · Jesus en el Huerto de los Olivos ----------------
  3: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Velázquez, Diego", "Goya y Lucientes, Francisco"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Paisaje", "Retrato"] },
  ],

  // ---------------- 4 · Sin pan y sin trabajo ----------------
  4: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Berni, Antonio", "Pueyrredón, Prilidiano"] },
    { campo: "escuela", texto: "¿A qué escuela pertenece «{titulo}»?",
      incorrectas: ["Francesa S.XIX", "Española S.XVII"] },
  ],

  // ---------------- 5 · En la costa de Valencia ----------------
  5: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Zuloaga, Ignacio", "Rusiñol, Santiago"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1871", "1924"] },
  ],

  // ---------------- 6 · La vuelta del Malón ----------------
  6: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Blanes, Juan Manuel", "Quinquela Martín, Benito"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Impresionismo, simbolismo", "Cubismo, futurismo"] },
  ],

  // ---------------- 7 · Paisaje junto al río ----------------
  7: [
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Cubismo", "Barroco"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Naturaleza muerta"] },
  ],

  // ---------------- 8 · Quietud del lago ----------------
  8: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Fader, Fernando", "Spilimbergo, Lino Enea"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1898", "1946"] },
  ],

  // ---------------- 9 · Al solcito ----------------
  9: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Quirós, Cesáreo Bernaldo de", "Pettoruti, Emilio"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Barroco", "Surrealismo"] },
  ],

  // ---------------- 10 · Le Pont d´Argenteuil (El Puente de Argenteuil) ----------------
  10: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Renoir, Pierre-Auguste", "Degas, Edgar"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1862", "1899"] },
  ],

  // ---------------- 11 · Los Ópalos ----------------
  11: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Zuloaga, Ignacio", "Rusiñol, Santiago"] },
    { campo: "escuela", texto: "¿A qué escuela pertenece «{titulo}»?",
      incorrectas: ["Argentina S.XX", "Francesa S.XIX"] },
  ],

  // ---------------- 12 · El Riachuelo ----------------
  12: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Quinquela Martín, Benito", "Spilimbergo, Lino Enea"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Paisaje rural", "Retrato"] },
  ],

  // ---------------- 13 · Pupo ----------------
  13: [
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Óleo", "Grabado"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Realismo, academicismo", "Impresionismo, luminismo"] },
  ],

  // ---------------- 14 · La presentación ----------------
  14: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Quirós, Cesáreo Bernaldo de", "Pettoruti, Emilio"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1895", "1936"] },
  ],

  // ---------------- 15 · Ruehende Schiffe (Barcos en reposo) ----------------
  15: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Kandinsky, Wassily", "Mondrian, Piet"] },
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Óleo", "Acuarela"] },
  ],

  // ---------------- 16 · Retrato de Marguerite-Elisabeth Forest de Largillière y su hijo Nicolás ----------------
  16: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Rigaud, Hyacinthe", "Watteau, Jean-Antoine"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Paisaje", "Naturaleza muerta"] },
  ],

  // ---------------- 17 · La niña sentada ----------------
  17: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Pettoruti, Emilio", "Berni, Antonio"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1905", "1952"] },
  ],

  // ---------------- 18 · Bords de rivière (Orillas del río) ----------------
  18: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Pissarro, Camille", "Renoir, Pierre-Auguste"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1851", "1899"] },
  ],

  // ---------------- 19 · La Coiffure (El peinado) ----------------
  19: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Cassatt, Mary Stevenson", "Gonzalès, Eva"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1872", "1911"] },
  ],

  // ---------------- 20 · La Coiffure (El peinado) ----------------
  20: [
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Cubismo", "Barroco"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Paisaje", "Retrato"] },
  ],

  // ---------------- 21 · Atardecer en el campo ----------------
  21: [
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Barroco", "Surrealismo"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Naturaleza muerta"] },
  ],

  // ---------------- 22 · Retrato de una joven ----------------
  22: [
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Paisaje", "Naturaleza muerta"] },
    { campo: "escuela", texto: "¿A qué escuela pertenece «{titulo}»?",
      incorrectas: ["Argentina S.XX", "Española S.XVIII"] },
  ],

  // ---------------- 23 · Naturaleza muerta con flores ----------------
  23: [
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Paisaje"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Impresionismo", "Cubismo"] },
  ],

  // ---------------- 24 · La plaza del pueblo ----------------
  24: [
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Paisaje rural", "Retrato"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Cubismo", "Surrealismo"] },
  ],

  // ---------------- 25 · Composición geométrica ----------------
  25: [
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Realismo", "Impresionismo"] },
    { campo: "periodo", texto: "¿A qué período corresponde «{titulo}»?",
      incorrectas: ["Arte Siglo XX (1910-1945)", "Arte Siglo XX (1970-2000)"] },
  ],

  // ---------------- 26 · Figuras en el jardín ----------------
  26: [
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Realismo", "Cubismo"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Paisaje urbano", "Retrato"] },
  ],

  // ---------------- 27 · Puerto al amanecer ----------------
  27: [
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Naturaleza muerta"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["ca. 1930", "ca. 1990"] },
  ],

  // ---------------- 28 · Mujer junto a la ventana ----------------
  28: [
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Óleo", "Acuarela"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Paisaje", "Naturaleza muerta"] },
  ],

  // ---------------- 29 · Paisaje de montaña ----------------
  29: [
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Naturaleza muerta"] },
    { campo: "periodo", texto: "¿A qué período corresponde «{titulo}»?",
      incorrectas: ["Arte Siglo XX (1945-1970)", "Arte Siglo XXI"] },
  ],

  // ---------------- 30 · Composición en azul ----------------
  30: [
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Óleo", "Témpera"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Realismo", "Barroco"] },
  ],

  // ---------------- 31 · Memorias de la ciudad ----------------
  31: [
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Óleo", "Acuarela"] },
    { campo: "periodo", texto: "¿A qué período corresponde «{titulo}»?",
      incorrectas: ["Arte Siglo XX (1970-2000)", "Arte Siglo XIX (1800-1910)"] },
  ],
};

export const PREGUNTAS_ESCULTURAS = {

  // ---------------- 1 · Cabeza de niña ----------------
  1: [
    { campo: "objeto", texto: "¿Qué representa «{titulo}»?",
      incorrectas: ["Figura de cuerpo entero", "Un animal"] },
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Fundición", "Talla directa en piedra"] },
  ],

  // ---------------- 2 · Composición abstracta ----------------
  2: [
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Figurativo", "Realista"] },
    { campo: "soporte", texto: "¿De qué material está hecha «{titulo}»?",
      incorrectas: ["Mármol", "Madera"] },
  ],

  // ---------------- 3 · Busto de hombre barbudo ----------------
  3: [
    { campo: "objeto", texto: "¿Qué representa «{titulo}»?",
      incorrectas: ["Figura ecuestre", "Manos humanas"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Mitológico", "Escultura abstracta"] },
  ],

  // ---------------- 4 · Las manos ----------------
  4: [
    { campo: "objeto", texto: "¿Qué representa «{titulo}»?",
      incorrectas: ["Busto humano", "Figura ecuestre"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Abstracto", "Cubista"] },
  ],

  // ---------------- 5 · Diana con la luna ----------------
  5: [
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Religioso"] },
    { campo: "objeto", texto: "¿Qué representa «{titulo}»?",
      incorrectas: ["Busto humano", "Figura ecuestre"] },
  ],

  // ---------------- 6 · Busto de bronce ----------------
  6: [
    { campo: "soporte", texto: "¿De qué material está hecha «{titulo}»?",
      incorrectas: ["Mármol", "Yeso"] },
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Talla directa en piedra", "Ensamblaje de piezas"] },
  ],

  // ---------------- 7 · Caballo y jinete ----------------
  7: [
    { campo: "objeto", texto: "¿Qué representa «{titulo}»?",
      incorrectas: ["Busto humano", "Manos humanas"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Mitológico"] },
  ],
};