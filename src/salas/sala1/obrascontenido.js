// =====================================================================
//  ARCHIVO PARA COMPLETAR LA INFORMACIÓN DE LAS OBRAS
//  (este es el ÚNICO archivo que hay que tocar)
//
//  CÓMO SE USA
//  1. Buscá el bloque de tu obra (OBRA 2, OBRA 3, ... OBRA 31).
//  2. Escribí el texto ENTRE los dos acentos graves ``  (tecla ` )
//     Ejemplo:   titulo: `La noche estrellada`,
//  3. Lo que no sepas, dejalo vacío: ``  y simplemente no aparece.
//  4. Si el titulo queda vacío, la obra sigue mostrando "Próximamente".
//
//  REGLAS PARA NO ROMPER NADA
//  - No borres comas, llaves { } ni los acentos graves ``.
//  - No cambies los nombres de la izquierda (titulo, autor, fecha...).
//  - En el autor escribí solo el nombre: `Gogh, Vicent van`
//    (la palabra "Autor:" se agrega sola).
//  - Podés usar comillas " ' y tildes sin problema.
//  - No uses el símbolo ` ni la combinación ${ dentro del texto.
//
//  LAS IMÁGENES se buscan solas: la obra 2 usa /obrareal2.png,
//  la obra 3 usa /obrareal3.png, etc. hasta la 31.
// =====================================================================

export const CONTENIDO = {

  // ---------------- OBRA 1 (ya está completa) ----------------
  1: {
    titulo: `Le Moulin de la Galette`,
    autor: `Gogh, Vicent van`,
    origen: `Galerie Thannhauser (Berlin)`,
    fecha: `ca 1886-1887`,
    periodo: `Arte Siglo XIX (1800-1910)`,
    escuela: `Francesa S.XIX`,
    tecnica: `Óleo`,
    objeto: `Pintura`,
    estilo: `Impresionismo`,
    genero: `Paisaje`,
    soporte: `Sobre papel entelado`,
    medidas: `61 x 50cm`,
  },

  // ---------------- OBRA 2 ----------------
  2: {
    titulo: `La berge de La Seine`,
    autor: `Monet, Claude`,
    origen: `Exposición Internacional de Arte del Centenario`,
    fecha: `1880`,
    periodo: 'Arte Siglo XIX (1800-1910)', 
    escuela: `Francesa S.XIX`,
    tecnica: `Óleo`, 
    objeto: `Pintura`,
    estilo: `impresionismo`, 
    genero: `paisaje`,
    soporte: `Sobre tela`, 
    medidas: `60 x 73 cm. Con marco: 84 x 97 cm.`,
  },

  // ---------------- OBRA 3 ----------------
  3: 
  {
    titulo: `Jesus en el Huerto de los Olivos`,
    autor: `Greco, El [ Theotokópoulos, Doménikos ]`,
    origen: `Kompaniet, Nordiska (Buenos Aires)`,
    fecha: `1600-1607`,
    periodo: 'Arte Siglo XII al Siglo XVIII', 
    escuela: `Española S.XVII`,
    tecnica: `Óleo`, 
    objeto: `Pintura`,
    estilo: `manierismo`, 
    genero: `religioso`,
    soporte: `Sobre tela`, 
    medidas: `108 x 76 cm. - Marco: 135, 5 x 103 cm.`,
  },

  // ---------------- OBRA 4 ----------------
  4:
  {
    titulo:  `Sin pan y sin trabajo`,
    autor:   `Cárcova, Ernesto de la`,
    origen:  `De la Cárcova, Ernesto`,
    fecha:   `1894`,
    periodo: 'Arte Siglo XIX (1800-1910)', 
    escuela: `Argentina S.XIX`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `naturalismo, realismo`, 
    genero:  `social, salón`,
    soporte: `Sobre tela`, 
    medidas: `125,5 x 216 cm.`,
  },
  // ---------------- OBRA 5 ----------------
  5: {
    titulo:  `En la costa de Valencia`,
    autor:   `Sorolla y Bastida, Joaquín`,
    origen:  `Piñero, Parmenio T.`,
    fecha:   `1898`,
    periodo: 'Arte Siglo XIX (1800-1910)', 
    escuela: `Española S.XIX / S.XX`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `impresionismo, postimpresionismo, regionalismo, luminismo`, 
    genero:  `costumbres, paisaje`,
    soporte: `Sobre tela`, 
    medidas: `57 x 88,5 cm. Marco: 85 x 114,5 x 7 cm.`,
  },

  // ---------------- OBRA 6 ----------------
  6: {
    titulo:  `La vuelta del Malón`,
    autor:   `Della Valle, Ángel`,
    origen:  `a Sociedad Estímulo de Bellas Artes (Buenos Aires)`,
    fecha:   `1892`,
    periodo: 'Arte Siglo XIX (1800-1910)', 
    escuela: `Argentina S.XIX`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `naturalismo, académico`, 
    genero:  `costumbres, histórico`,
    soporte: `Sobre tela`, 
    medidas: `186,5 x 292 cm.`,
  },


    // ---------------- OBRA 7 ----------------
  // ⚠️ INFORMACIÓN INVENTADA PROVISIONAL
  7: {
    titulo: `Paisaje junto al río`,
    autor: `Autor desconocido`,
    origen: `Colección particular`,
    fecha: `ca. 1900`,
    periodo: `Arte Siglo XIX (1800-1910)`,
    escuela: `Europea S.XIX`,
    tecnica: `Óleo`,
    objeto: `Pintura`,
    estilo: `Impresionismo`,
    genero: `Paisaje`,
    soporte: `Sobre tela`,
    medidas: `65 x 90 cm.`,
  },

  // ---------------- OBRA 8 ----------------
  8: 
  {
    titulo:  `Quietud del lago`,
    autor:   `Panozzi, Américo`,
    origen:  `Adquisición Galería Witcomb, 1922`,
    fecha:   `1922`,
    periodo: 'Arte Siglo XX (1910-1945)', 
    escuela: `Argentina S.XX`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `postimpresionismo`, 
    genero:  `Paisaje`,
    soporte: `Sobre tela`, 
    medidas: `70,5 x 80,5 cm`,
  },
  // ---------------- OBRA 9 ----------------
  9:  {
    titulo:  `Al solcito`,
    autor:   `Fader, Fernando`,
    origen:  `Adquisición Galería Müller, 1936`,
    fecha:   `1922`,
    periodo: 'Arte Siglo XX (1910-1945)', 
    escuela: `Argentina S.XX`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `Postimpresionismo`, 
    genero:  `Costumbrista, paisaje`,
    soporte: `Sobre tela`, 
    medidas: `100 x 120 cm`,
  },
  // ---------------- OBRA 10 ----------------
  10: {
    titulo:  `Le Pont d´Argenteuil (El Puente de Argenteuil)`,
    autor:   `Monet, Claude`,
    origen:  `Donación Mercedes Santamarina, 1970`,
    fecha:   `1875`,
    periodo: 'Arte Siglo XIX (1800-1910)', 
    escuela: `Francesa S.XIX`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `Impresionismo`, 
    genero:  `Paisaje`,
    soporte: `Sobre tela`, 
    medidas: `60 x 100 cm.`,
  },

  // ---------------- OBRA 11 ----------------
  11: {
    titulo:  `Los Ópalos`,
    autor:   `Anglada Camarasa, Hermenegildo`,
    origen:  `Vila y Prades, Julio`,
    fecha:   `-`,
    periodo: 'Arte Siglo XIX (1800-1910)', 
    escuela: `Española S.XX`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `Figuración, simbolismo, regionalismo`, 
    genero:  `Costumbres`,
    soporte: `Sobre tela`, 
    medidas: `85,5 x 151,5 cm. - Marco: 117,5 x 182,5 cm.`,
  },

  // ---------------- OBRA 12 ----------------
  12: {
    titulo:  `El Riachuelo`,
    autor:   `Collivadino, Pío`,
    origen:  `Salón Nacional de Artes Plásticas`,
    fecha:   `1916`,
    periodo: 'Arte Siglo XIX (1800-1910)', 
    escuela: `Argentina S.XX`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `Impresionismo, postimpresionismo`, 
    genero:  `Paisaje urbano`,
    soporte: `Sobre tela`, 
    medidas: `72,3 x 84,5 cm.`,
  },

  // ---------------- OBRA 13 ----------------
  13:  {
    titulo:  `Pupo`,
    autor:   `Xul Solar, Alejandro (Schulz Solari, Oscar Agustín Alejandro)`,
    origen:  `Donación, Fundación Antorchas.1989`,
    fecha:   `ca. 1920`,
    periodo: 'Arte Siglo XX (1910-1945)', 
    escuela: `Argentina S.XX`,
    tecnica: `Acuarela`, 
    objeto:  `Pintura`,
    estilo:  `expresionismo, vanguardias regionales`, 
    genero:  `misticismo`,
    soporte: `Sobre papel montado sobre cartulina`, 
    medidas: `21,5 x 15,5 cm. Con marco: 54,5 x 42,5 cm.`,
  },

  // ---------------- OBRA 14 ----------------
  14:  {
    titulo:  `La presentación`,
    autor:   `Thibon de Libian, Valentín`,
    origen:  `Comisión Nacional de Bellas Artes`,
    fecha:   `1918`,
    periodo: 'Arte Siglo XX (1910-1945)', 
    escuela: `Argentina S.XX`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `figuración, postimpresionismo`, 
    genero:  `costumbres, postimpresionismo`,
    soporte: `Sobre tela`, 
    medidas: `76 x 64 cm.`,
  },

  // ---------------- OBRA 15 ----------------
  15:  {
    titulo:  `Ruehende Schiffe (Barcos en reposo)`,
    autor:   `Klee, Paul`,
    origen:  `Adquisición Torcuato Di Tella (Fundación e Instituto), 1971`,
    fecha:   `1927`,
    periodo: 'Arte Siglo XX (1910-1945)', 
    escuela: `Suiza S.XX`,
    tecnica: `Témpera`, 
    objeto:  `Pintura`,
    estilo:  `abstracción`, 
    genero:  `Bauhaus, geometría, constructivismo`,
    soporte: `Sobre carton`, 
    medidas: `47,5 x 64,5 cm.`,
  },


  // ---------------- OBRA 16 ----------------
  16: {
    titulo:  `Retrato de Marguerite-Elisabeth Forest de Largillière y su hijo Nicolás`,
    autor:   `Largillière, Nicolás de`,
    origen:  `Adquisición a Galería Wildenstein (Buenos Aires) con subsidio del Fondo Nacional de las Artes, 1968`,
    fecha:   `ca. 1712`,
    periodo: 'Arte Siglo XII al Siglo XVIII', 
    escuela: `Francesa S.XVIII`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `Barroco`, 
    genero:  `Retrato`,
    soporte: `Sobre tela`, 
    medidas: `89 x 116 cm..`,
  },

  // ---------------- OBRA 17 ----------------
  17: {
    titulo:  `La niña sentada`,
    autor:   `Schiavoni, Augusto`,
    origen:  `Donación María Laura Schiavoni, 1977`,
    fecha:   `1929`,
    periodo: 'Arte Siglo XX (1910-1945)', 
    escuela: `Argentina S.XX`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `Figuración, retorno al orden`, 
    genero:  `Retrato`,
    soporte: `Sobre tela`, 
    medidas: `100 x 100 cm. - Marco: 103,5 x 103,5 cm.`,
  },

  // ---------------- OBRA 18 ----------------

  18:  {
    titulo:  `Bords de rivière (Orillas del río)`,
    autor:   `Sisley, Alfred`,
    origen:  `Donación, Bemberg, María Luisa. 1985`,
    fecha:   `1874`,
    periodo: 'Arte Siglo XX (1910-1945)', 
    escuela: `Francesa S.XIX`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `Impresionismo`, 
    genero:  `Paisaje`,
    soporte: `Sobre tela`, 
    medidas: `66,4 x 91,8 cm. - Marco: 91 x 116 cm.`,
  },

  

  // ---------------- OBRA 19 ----------------
  19: {
    titulo:  `La Coiffure (El peinado)`,
    autor:   `Morisot, Berthe Marie Pauline`,
    origen:  `Legado Zuberbühler de Aceval, 1964`,
    fecha:   `1894`,
    periodo: 'Arte Siglo XIX (1800-1910)', 
    escuela: `Francesa S.XIX`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `Impresionismo`, 
    genero:  `Costumbres`,
    soporte: `Sobre tela`, 
    medidas: `55 x 46 cm.`,
  },

  // ---------------- OBRA 20 ----------------
  20: {
    titulo:  `La Coiffure (El peinado)`,
    autor:   `Morisot, Berthe Marie Pauline`,
    origen:  `Legado Zuberbühler de Aceval, 1964`,
    fecha:   `1894`,
    periodo: 'Arte Siglo XIX (1800-1910)', 
    escuela: `Francesa S.XIX`,
    tecnica: `Óleo`, 
    objeto:  `Pintura`,
    estilo:  `Impresionismo`, 
    genero:  `Costumbres`,
    soporte: `Sobre tela`, 
    medidas: `55 x 46 cm.`,
  },



  // ---------------- OBRA 21 ----------------
  // ⚠️ INFORMACIÓN INVENTADA PROVISIONAL
  21: {
    titulo: `Atardecer en el campo`,
    autor: `Autor desconocido`,
    origen: `Colección particular`,
    fecha: `ca. 1910`,
    periodo: `Arte Siglo XX (1910-1945)`,
    escuela: `Argentina S.XX`,
    tecnica: `Óleo`,
    objeto: `Pintura`,
    estilo: `Postimpresionismo`,
    genero: `Paisaje`,
    soporte: `Sobre tela`,
    medidas: `70 x 90 cm.`,
  },

  // ---------------- OBRA 22 ----------------
  // ⚠️ INFORMACIÓN INVENTADA PROVISIONAL
  22: {
    titulo: `Retrato de una joven`,
    autor: `Autor desconocido`,
    origen: `Donación particular`,
    fecha: `ca. 1920`,
    periodo: `Arte Siglo XX (1910-1945)`,
    escuela: `Francesa S.XX`,
    tecnica: `Óleo`,
    objeto: `Pintura`,
    estilo: `Figuración`,
    genero: `Retrato`,
    soporte: `Sobre tela`,
    medidas: `80 x 60 cm.`,
  },

  // ---------------- OBRA 23 ----------------
  // ⚠️ INFORMACIÓN INVENTADA PROVISIONAL
  23: {
    titulo: `Naturaleza muerta con flores`,
    autor: `Autor desconocido`,
    origen: `Adquisición particular`,
    fecha: `ca. 1930`,
    periodo: `Arte Siglo XX (1910-1945)`,
    escuela: `Argentina S.XX`,
    tecnica: `Óleo`,
    objeto: `Pintura`,
    estilo: `Realismo`,
    genero: `Naturaleza muerta`,
    soporte: `Sobre tela`,
    medidas: `60 x 75 cm.`,
  },

  // ---------------- OBRA 24 ----------------
  // ⚠️ INFORMACIÓN INVENTADA PROVISIONAL
  24: {
    titulo: `La plaza del pueblo`,
    autor: `Autor desconocido`,
    origen: `Colección particular`,
    fecha: `ca. 1940`,
    periodo: `Arte Siglo XX (1910-1945)`,
    escuela: `Argentina S.XX`,
    tecnica: `Óleo`,
    objeto: `Pintura`,
    estilo: `Realismo`,
    genero: `Paisaje urbano`,
    soporte: `Sobre tela`,
    medidas: `75 x 100 cm.`,
  },

  // ---------------- OBRA 25 ----------------
  // ⚠️ INFORMACIÓN INVENTADA PROVISIONAL
  25: {
    titulo: `Composición geométrica`,
    autor: `Autor desconocido`,
    origen: `Donación particular`,
    fecha: `ca. 1950`,
    periodo: `Arte Siglo XX (1945-1970)`,
    escuela: `Argentina S.XX`,
    tecnica: `Óleo`,
    objeto: `Pintura`,
    estilo: `Abstracción geométrica`,
    genero: `Abstracto`,
    soporte: `Sobre tela`,
    medidas: `80 x 80 cm.`,
  },

  // ---------------- OBRA 26 ----------------
  // ⚠️ INFORMACIÓN INVENTADA PROVISIONAL
  26: {
    titulo: `Figuras en el jardín`,
    autor: `Autor desconocido`,
    origen: `Colección particular`,
    fecha: `ca. 1955`,
    periodo: `Arte Siglo XX (1945-1970)`,
    escuela: `Europea S.XX`,
    tecnica: `Óleo`,
    objeto: `Pintura`,
    estilo: `Expresionismo`,
    genero: `Costumbres`,
    soporte: `Sobre tela`,
    medidas: `90 x 70 cm.`,
  },

  // ---------------- OBRA 27 ----------------
  // ⚠️ INFORMACIÓN INVENTADA PROVISIONAL
  27: {
    titulo: `Puerto al amanecer`,
    autor: `Autor desconocido`,
    origen: `Adquisición particular`,
    fecha: `ca. 1960`,
    periodo: `Arte Siglo XX (1945-1970)`,
    escuela: `Argentina S.XX`,
    tecnica: `Óleo`,
    objeto: `Pintura`,
    estilo: `Realismo`,
    genero: `Paisaje`,
    soporte: `Sobre tela`,
    medidas: `65 x 95 cm.`,
  },

  // ---------------- OBRA 28 ----------------
  // ⚠️ INFORMACIÓN INVENTADA PROVISIONAL
  28: {
    titulo: `Mujer junto a la ventana`,
    autor: `Autor desconocido`,
    origen: `Colección particular`,
    fecha: `ca. 1970`,
    periodo: `Arte Siglo XX (1945-1970)`,
    escuela: `Argentina S.XX`,
    tecnica: `Acrílico`,
    objeto: `Pintura`,
    estilo: `Figuración`,
    genero: `Retrato`,
    soporte: `Sobre tela`,
    medidas: `100 x 70 cm.`,
  },

  // ---------------- OBRA 29 ----------------
  // ⚠️ INFORMACIÓN INVENTADA PROVISIONAL
  29: {
    titulo: `Paisaje de montaña`,
    autor: `Autor desconocido`,
    origen: `Donación particular`,
    fecha: `ca. 1980`,
    periodo: `Arte Siglo XX (1970-2000)`,
    escuela: `Argentina S.XX`,
    tecnica: `Óleo`,
    objeto: `Pintura`,
    estilo: `Figuración`,
    genero: `Paisaje`,
    soporte: `Sobre tela`,
    medidas: `80 x 110 cm.`,
  },

  // ---------------- OBRA 30 ----------------
  // ⚠️ INFORMACIÓN INVENTADA PROVISIONAL
  30: {
    titulo: `Composición en azul`,
    autor: `Autor desconocido`,
    origen: `Colección particular`,
    fecha: `ca. 1990`,
    periodo: `Arte Siglo XX (1970-2000)`,
    escuela: `Argentina S.XX`,
    tecnica: `Acrílico`,
    objeto: `Pintura`,
    estilo: `Abstracción`,
    genero: `Abstracto`,
    soporte: `Sobre tela`,
    medidas: `90 x 90 cm.`,
  },

  // ---------------- OBRA 31 ----------------
  // ⚠️ INFORMACIÓN INVENTADA PROVISIONAL
  31: {
    titulo: `Memorias de la ciudad`,
    autor: `Autor desconocido`,
    origen: `Adquisición particular`,
    fecha: `ca. 2000`,
    periodo: `Arte Siglo XXI`,
    escuela: `Argentina S.XXI`,
    tecnica: `Técnica mixta`,
    objeto: `Pintura`,
    estilo: `Contemporáneo`,
    genero: `Paisaje urbano`,
    soporte: `Sobre tela`,
    medidas: `100 x 120 cm.`,
  },

};
