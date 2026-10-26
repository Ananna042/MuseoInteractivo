// =========================
// MÚSICOS: sprites animados que tocan en un lugar fijo de la sala
// Las coordenadas son las de la sala (0 = borde izquierdo de la sala original).
// La 2da pantalla va de x = -1400 a x = 0, así que su centro es x = -700.
// =========================

// Misma escala que el personaje (su celda de 362px se muestra a 70px),
// así todos los sprites mantienen el mismo tamaño de píxel en pantalla.
const ESCALA = 75 / 362;

// Lista de músicos. Para sumar otro, agregá un objeto más.
//   imagen / celdaAncho / celdaAlto : la hoja y el tamaño de cada cuadro (en px de la imagen)
//   columnas / filas                : cómo está armada la grilla de cuadros
//   inicio (opcional)               : cuadros que se muestran UNA sola vez al arrancar, antes del bucle
//   secuencia                       : cuadros que se repiten en bucle (0 = arriba a la izquierda, se lee por filas)
//   duracionFrame                   : ms que dura cada cuadro
//   centroX                         : x del centro del músico en la sala
//   pies                            : y de la línea de los pies (la base del dibujo)
//   colision                        : caja que no se puede atravesar
//                                     (ancho, alto, y cuánto sube desde la base: desdePies)
const MUSICOS = [
  {
    id: "violinista",
    imagen: "/musico1.png",
    celdaAncho: 330,
    celdaAlto: 390,
    columnas: 3,
    filas: 1,
    secuencia: [0, 1, 2, 1],
    duracionFrame: 220,
    centroX: -700,                       // centro de la 2da pantalla
    pies: 520,                         // mitad de la altura de la sala + 35
    colision: { ancho: 50, alto: 80, desdePies: 10},
  },
  {
    id: "pianista",
    imagen: "/musico2.png",
    celdaAncho: 730,
    celdaAlto: 910,
    columnas: 2,
    filas: 2,
    inicio: [0],                         // el 1er cuadro se muestra solo al comienzo
    secuencia: [1, 2, 3],                // y el bucle usa los otros 3
    duracionFrame: 420,
    centroX: -843,                       // a la izquierda del guitarrista, con 40px de aire entre los dos
    pies: 555,                      // misma línea de pies que el guitarrista
    // el dibujo mide ~141x176 en pantalla, con 8px de margen: la caja cubre casi todo
    colision: { ancho: 125, alto: 190, desdePies: 8 },
  },
];

function crearMusico(config) {
  const { imagen, celdaAncho, celdaAlto, columnas, filas, inicio = [], secuencia, duracionFrame, centroX, pies } = config;

  // tamaño del cuadro en pantalla (redondeado para que no se vea borroso)
  const ancho = Math.round(celdaAncho * ESCALA);
  const alto = Math.round(celdaAlto * ESCALA);

  const el = document.createElement("div");
  el.classList.add("musico");
  el.style.position = "absolute";
  el.style.width = `${ancho}px`;
  el.style.height = `${alto}px`;
  el.style.left = `${centroX - ancho / 2}px`;
  el.style.top = `${pies - alto}px`;
  el.style.backgroundImage = `url('${imagen}')`;
  el.style.backgroundSize = `${ancho * columnas}px ${alto * filas}px`;
  el.style.backgroundRepeat = "no-repeat";
  el.style.pointerEvents = "none";

  function mostrarCuadro(numero) {
    const columna = numero % columnas;
    const fila = Math.floor(numero / columnas);
    el.style.backgroundPosition = `${-(columna * ancho)}px ${-(fila * alto)}px`;
  }

  // Cuadros del arranque (una sola vez) seguidos del bucle
  let enInicio = inicio.length > 0;
  let indice = 0;
  let ultimoCambio = performance.now();
  mostrarCuadro(enInicio ? inicio[0] : secuencia[0]);

  function animar(ahora) {
    if (ahora - ultimoCambio >= duracionFrame) {
      if (enInicio) {
        indice++;
        if (indice >= inicio.length) {   // terminó el arranque: pasa al bucle
          enInicio = false;
          indice = 0;
        }
      } else {
        indice = (indice + 1) % secuencia.length;
      }
      mostrarCuadro(enInicio ? inicio[indice] : secuencia[indice]);
      ultimoCambio = ahora;
    }
    requestAnimationFrame(animar);
  }
  requestAnimationFrame(animar);

  return el;
}

export function crearMusicos() {
  const elementos = MUSICOS.map(crearMusico);

  // Caja de colisión de cada músico: ni el personaje ni los NPCs la atraviesan.
  const obstaculos = MUSICOS.map(({ centroX, pies, colision }) => ({
    x: centroX - colision.ancho / 2,
    y: pies - colision.desdePies - colision.alto,
    ancho: colision.ancho,
    alto: colision.alto,
  }));

  return { elementos, obstaculos };
}