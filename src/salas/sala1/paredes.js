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
     
  // --- Nueva pared en L (izquierda) ---
  { x: 0, y: -55, ancho: 63, alto: 300 },      // parte vertical (el lado fino)
  { x: 0, y: 262, ancho: 593, alto: 120 },     // parte frontal (donde están las obras 2-6)

   // --- Segunda L (derecha) ---
  { x: 1100, y: 262, ancho: 700, alto: 100 }, 
                  
  
  // paredcuarta.png (la más larga)
  { x: 843, y: 365, ancho: 257, alto: 120 }, 
      // paredtercera.png (0la más corta)


  { x: 1063, y: 262, ancho: 20, alto: 220 },     // segundalineavertical.png (el conector)


];

  sala.limites = limites;
  sala.obstaculos = obstaculos;

  

  return sala;
}
