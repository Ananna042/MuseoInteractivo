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
      incorrectas: ["Cézanne, Paul", "Renoir, Pierre-Auguste"] },
    { campo: "soporte", texto: "¿Sobre qué soporte está pintada «{titulo}»?",
      incorrectas: ["Sobre tabla", "Sobre cartón"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["ca 1910-1912", "ca 1790-1792"] },
  ],

  // ---------------- 2 · La berge de La Seine ----------------
  2: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Pissarro, Camille", "Degas, Edgar"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1925", "1760"] },
    { campo: "escuela", texto: "¿A qué escuela pertenece «{titulo}»?",
      incorrectas: ["Española S.XIX", "Italiana S.XIX"] },
  ],

  // ---------------- 3 · Jesus en el Huerto de los Olivos ----------------
  3: [
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Impresionismo", "Cubismo"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Paisaje"] },
    { campo: "escuela", texto: "¿A qué escuela pertenece «{titulo}»?",
      incorrectas: ["Italiana S.XVII", "Flamenca S.XVII"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1700-1707", "1500-1507"] },
  ],

  // ---------------- 4 · Sin pan y sin trabajo ----------------
  4: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Sívori, Eduardo", "Schiaffino, Eduardo"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1921", "1867"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Paisaje, retrato", "Naturaleza muerta, mitológico"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Impresionismo, luminismo", "Barroco, manierismo"] },
  ],

  // ---------------- 5 · En la costa de Valencia ----------------
  5: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Zuloaga, Ignacio", "Rusiñol, Santiago"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1920", "1872"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato, religioso", "Naturaleza muerta, histórico"] },
  ],

  // ---------------- 6 · La vuelta del Malón ----------------
  6: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Pueyrredón, Prilidiano", "Blanes, Juan Manuel"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1935", "1860"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato, mitológico", "Paisaje, social"] },
  ],

  // ---------------- 7 · Nubes en la sierra ----------------
  7: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Giudici, Reynaldo", "Sívori, Eduardo"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["c. 1950", "c. 1850"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Barroco", "Surrealismo"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Religioso"] },
  ],

  // ---------------- 8 · Quietud del lago ----------------
  8: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Spilimbergo, Lino Enea", "Pettoruti, Emilio"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1951", "1888"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Barroco", "Surrealismo"] },
  ],

  // ---------------- 9 · Al solcito ----------------
  9: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Spilimbergo, Lino Enea", "Quinquela Martín, Benito"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato, religioso", "Naturaleza muerta, mitológico"] },
    { campo: "escuela", texto: "¿A qué escuela pertenece «{titulo}»?",
      incorrectas: ["Francesa S.XX", "Italiana S.XX"] },
  ],

  // ---------------- 10 · Le Pont d´Argenteuil (El Puente de Argenteuil) ----------------
  10: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Pissarro, Camille", "Manet, Édouard"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1912", "1840"] },
    { campo: "origen", texto: "¿Cómo llegó «{titulo}» al museo?",
      incorrectas: ["Compra del museo, 1948", "Donación Hirsch, 1983"] },
  ],

  // ---------------- 11 · Los Ópalos ----------------
  11: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Nonell, Isidre", "Casas, Ramón"] },
    { campo: "escuela", texto: "¿A qué escuela pertenece «{titulo}»?",
      incorrectas: ["Francesa S.XX", "Argentina S.XX"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Naturaleza muerta"] },
  ],

  // ---------------- 12 · El Riachuelo ----------------
  12: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Quinquela Martín, Benito", "Pettoruti, Emilio"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Naturaleza muerta"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1952", "1881"] },
  ],

  // ---------------- 13 · Pupo ----------------
  13: [
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Óleo", "Grabado"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Paisaje"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["ca. 1965", "ca. 1880"] },
  ],

  // ---------------- 14 · La presentación ----------------
  14: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Gramajo Gutiérrez, Alfredo", "Quirós, Cesáreo Bernaldo de"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1943", "1890"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Realismo, naturalismo", "Abstracción, constructivismo"] },
  ],

  // ---------------- 15 · Ruehende Schiffe (Barcos en reposo) ----------------
  15: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Kandinsky, Wassily", "Mondrian, Piet"] },
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Óleo", "Acuarela"] },
    { campo: "escuela", texto: "¿A qué escuela pertenece «{titulo}»?",
      incorrectas: ["Alemana S.XX", "Francesa S.XX"] },
  ],

  // ---------------- 16 · Retrato de Marguerite-Elisabeth Forest de Largillière y su hijo Nicolás ----------------
  16: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Rigaud, Hyacinthe", "Watteau, Antoine"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Impresionismo", "Cubismo"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Paisaje", "Naturaleza muerta"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["ca. 1850", "ca. 1590"] },
  ],

  // ---------------- 17 · La niña sentada ----------------
  17: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Basaldúa, Héctor", "Spilimbergo, Lino Enea"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1952", "1905"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Abstracción, geometría", "Naturalismo, realismo"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Paisaje", "Religioso"] },
  ],

  // ---------------- 18 · Bords de rivière (Orillas del río) ----------------
  18: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Pissarro, Camille", "Degas, Edgar"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1912", "1840"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Naturaleza muerta"] },
  ],

  // ---------------- 19 · La Coiffure (El peinado) ----------------
  19: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Cassatt, Mary", "Gonzalès, Eva"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1921", "1860"] },
    { campo: "origen", texto: "¿Cómo llegó «{titulo}» al museo?",
      incorrectas: ["Donación Mercedes Santamarina, 1970", "Adquisición Torcuato Di Tella, 1971"] },
  ],

  // ---------------- 20 · Adan y Eva Nº 2 ----------------
  20: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Noé, Luis Felipe", "Macció, Rómulo"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1928", "1991"] },
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Acuarela, tinta", "Témpera, carbonilla"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Impresionismo", "Surrealismo"] },
  ],

  // ---------------- 21 · Músicos ambulantes ----------------
  21: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Boldini, Giovanni", "Segantini, Giovanni"] },
    { campo: "escuela", texto: "¿A qué escuela pertenece «{titulo}»?",
      incorrectas: ["Española S.XIX", "Francesa S.XIX"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["ca. 1920-1922", "ca. 1750-1752"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Religioso"] },
  ],

  // ---------------- 22 · Le bain de Vénus (El baño de Venus) ----------------
  22: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Moreau, Gustave", "Puvis de Chavannes, Pierre"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Paisaje"] },
    { campo: "soporte", texto: "¿Sobre qué soporte está pintada «{titulo}»?",
      incorrectas: ["Sobre tela", "Sobre papel"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["ca. 1850-1853", "ca. 1950-1953"] },
  ],

  // ---------------- 23 · Violettes et azalées (Violetas y azaleas) ----------------
  23: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Manet, Édouard", "Cézanne, Paul"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Paisaje"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1910", "1840"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Cubismo", "Barroco"] },
  ],

  // ---------------- 24 · Julieta Courbet a la edad de diez años ----------------
  24: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Millet, Jean-François", "Daumier, Honoré"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Paisaje", "Mitológico"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["ca. 1900", "ca. 1780"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Impresionismo, luminismo", "Barroco, manierismo"] },
  ],

  // ---------------- 25 · Intimidad de un tímido ----------------
  25: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Noé, Luis Felipe", "Macció, Rómulo"] },
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Óleo, esmalte sintético", "Acuarela, tinta china"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato, histórico", "Paisaje, costumbres"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1928", "1991"] },
  ],

  // ---------------- 26 · Calle de La Boca ó Calle Magallanes ----------------
  26: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Quinquela Martín, Benito", "Lacámera, Fortunato"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1955", "1902"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato, costumbres", "Naturaleza muerta, mitológico"] },
    { campo: "soporte", texto: "¿Sobre qué soporte está pintada «{titulo}»?",
      incorrectas: ["Sobre tela", "Sobre tabla"] },
  ],

  // ---------------- 27 · Procesión sorprendida por la lluvia ----------------
  27: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Madrazo, Raimundo de", "Rosales, Eduardo"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1910-1911", "1790-1791"] },
    { campo: "escuela", texto: "¿A qué escuela pertenece «{titulo}»?",
      incorrectas: ["Italiana S.XIX", "Francesa S.XIX"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Paisaje"] },
  ],

  // ---------------- 28 · Las parvas (la pampa de hoy) ----------------
  28: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Sívori, Eduardo", "Fader, Fernando"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1945", "1880"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Cubismo", "Barroco"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Naturaleza muerta"] },
  ],

  // ---------------- 29 · Mañana de invierno ----------------
  29: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Quirós, Cesáreo Bernaldo de", "Pettoruti, Emilio"] },
    { campo: "origen", texto: "¿Cómo llegó «{titulo}» al museo?",
      incorrectas: ["Adquisición Segundo Premio Salón Nacional de Artes Plásticas, 1926", "Donación Mercedes Santamarina, 1970"] },
    { campo: "escuela", texto: "¿A qué escuela pertenece «{titulo}»?",
      incorrectas: ["Francesa S.XX", "Italiana S.XX"] },
  ],

  // ---------------- 30 · Nocturno abstracto o Abstracción en azul y rojo ----------------
  30: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Maldonado, Tomás", "Hlito, Alfredo"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1912", "1985"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Impresionismo", "Realismo"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Paisaje"] },
  ],

  // ---------------- 31 · Señora Manuela Suárez Lastra de Garmendia ----------------
  31: [
    { campo: "autor", texto: "¿Quién pintó «{titulo}»?",
      incorrectas: ["Sívori, Eduardo", "Pueyrredón, Prilidiano"] },
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Óleo", "Témpera"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato masculino", "Paisaje"] },
    { campo: "soporte", texto: "¿Sobre qué soporte está pintada «{titulo}»?",
      incorrectas: ["Sobre tela", "Sobre tabla"] },
  ],

};

// =====================================================================
//  ESCULTURAS
// =====================================================================

export const PREGUNTAS_ESCULTURAS = {

  // ---------------- 1 · Niña con trenzas ----------------
  1: [
    { campo: "autor", texto: "¿Quién hizo «{titulo}»?",
      incorrectas: ["Mora, Lola", "Yrurtia, Rogelio"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["ca. 1890", "ca. 1720"] },
    { campo: "soporte", texto: "¿De qué material está hecha «{titulo}»?",
      incorrectas: ["Mármol", "Bronce"] },
  ],

  // ---------------- 2 · Triangulación ----------------
  2: [
    { campo: "autor", texto: "¿Quién hizo «{titulo}»?",
      incorrectas: ["Badii, Libero", "Iommi, Enio"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Realista", "Figurativo"] },
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Bronce", "Mármol"] },
  ],

  // ---------------- 3 · Cabeza de Septimio Severo ----------------
  3: [
    { campo: "autor", texto: "¿Quién hizo «{titulo}»?",
      incorrectas: ["Rodin, René François Auguste", "Cafferata, Francisco"] },
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Modelado, vaciado", "Talla en madera, policromía"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Figura ecuestre", "Torso femenino"] },
  ],

  // ---------------- 4 · Estudio para manos [Estudio para El secreto] ----------------
  4: [
    { campo: "autor", texto: "¿Quién hizo «{titulo}»?",
      incorrectas: ["Claudel, Camille Rosalie", "Bourdelle, Émile Antoine"] },
    { campo: "tecnica", texto: "¿Qué técnica se usó en «{titulo}»?",
      incorrectas: ["Yeso patinado", "Mármol pulido"] },
    { campo: "origen", texto: "¿Cómo llegó «{titulo}» al museo?",
      incorrectas: ["Donación Hirsch, 1983", "Adquisición Torcuato Di Tella, 1971"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato", "Figura ecuestre"] },
  ],

  // ---------------- 5 · Diana ----------------
  5: [
    { campo: "autor", texto: "¿Quién hizo «{titulo}»?",
      incorrectas: ["Bartholdi, Frédéric Auguste", "Carpeaux, Jean-Baptiste"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Cubista", "Barroco"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato, religioso", "Paisaje, costumbres"] },
    { campo: "soporte", texto: "¿De qué material está hecha «{titulo}»?",
      incorrectas: ["Mármol blanco", "Yeso policromado"] },
  ],

  // ---------------- 6 · Busto de esclavo ----------------
  6: [
    { campo: "autor", texto: "¿Quién hizo «{titulo}»?",
      incorrectas: ["Correa Morales, Lucio", "Mora, Lola"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["ca. 1950", "ca. 1720"] },
    { campo: "soporte", texto: "¿De qué material está hecha «{titulo}»?",
      incorrectas: ["Mármol", "Yeso"] },
    { campo: "genero", texto: "¿A qué género pertenece «{titulo}»?",
      incorrectas: ["Retrato oficial", "Mitológico"] },
  ],

  // ---------------- 7 · Jinete a caballo ----------------
  7: [
    { campo: "autor", texto: "¿Quién hizo «{titulo}»?",
      incorrectas: ["Moore, Henry", "Giacometti, Alberto"] },
    { campo: "fecha", texto: "¿De qué fecha es «{titulo}»?",
      incorrectas: ["1912", "1988"] },
    { campo: "origen", texto: "¿Cómo llegó «{titulo}» al museo?",
      incorrectas: ["Donación Mercedes Santamarina, 1970", "Donación Hirsch, 1983"] },
    { campo: "estilo", texto: "¿A qué estilo pertenece «{titulo}»?",
      incorrectas: ["Abstracto", "Cubista"] },
  ],

};