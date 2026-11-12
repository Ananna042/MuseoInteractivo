import "./estilos/sala1.css";
import "./estilos/hud.css";

import { crearParedes, AMPLIACION } from "./salas/sala1/paredes.js";
import { crearPersonaje } from "./general/personaje.js";
import { crearVidas } from "./general/vidas.js";
import { mostrarPantalla } from "./general/pantallas.js";
import { NIVELES } from "./general/niveles.js";
import { iniciarObras } from "./salas/sala1/obras.js";
import { crearNPC } from "./salas/sala1/npcs.js";
import { crearEncuentroNPC } from "./salas/sala1/mision-npc.js";
import { crearMision } from "./salas/sala1/mision.js";
import { crearMusicos } from "./salas/sala1/musicos.js";


const app = document.querySelector("#app");
const sala = crearParedes();

const musicos = crearMusicos();
musicos.elementos.forEach(m => sala.appendChild(m));
sala.obstaculos.push(...musicos.obstaculos);

// Caja de colisión de otra entidad (mismo tamaño que `tamaño` en personaje.js / npcs.js)
const MARGEN_X = 15;
const MARGEN_Y = 15;

const caja = (e) => {
  const { x, y } = e.obtenerPosicion();
  return {
    x: x - MARGEN_X,
    y: y - MARGEN_Y,
    ancho: 30 + MARGEN_X * 2,
    alto: 30 + MARGEN_Y * 2,
  };
};

const choca = (a, b) =>
  a.x < b.x + b.ancho && a.x + a.ancho > b.x &&
  a.y < b.y + b.alto && a.y + a.alto > b.y;

// =========================
// JUGADOR + NPCs
// =========================
const IMAGENES_NPCS = [
  "/npcuno.png", "/npcdos.png", "/npctres.png", "/npccuatro.png",
  "/npccinco.png", "/npcseis.png", "/npcsiete.png", "/npcocho.png", "/npcnueve.png", "/npcdiez.png",
];

const npcs = [];
const usuario = crearPersonaje(sala.limites, sala.obstaculos, () => npcs.map(caja));

// Punto random libre: fuera de obstáculos, del jugador y de otros NPC
function posicionAleatoria() {
  const { izquierda, derecha, arriba, abajo } = sala.limites;
  const ocupados = [...sala.obstaculos, ...npcs.map(caja), caja(usuario)];

  for (let i = 0; i < 500; i++) {
    const x = izquierda + Math.random() * (derecha - 30 - izquierda);
    const y = arriba + Math.random() * (abajo - 30 - arriba);
    const prueba = { x: x - MARGEN_X, y: y - MARGEN_Y, ancho: 60, alto: 60 };
    if (!ocupados.some(o => choca(prueba, o))) return { x: Math.round(x), y: Math.round(y) };
  }
  return { x: 700, y: 350 };
}

IMAGENES_NPCS.forEach((imagen) => {
  const { x, y } = posicionAleatoria();

  let npc = null; // tiene que ser let: crearNPC llama al callback antes de terminar
  npc = crearNPC(
    sala.limites,
    sala.obstaculos,
    () => [caja(usuario), ...npcs.filter(n => n !== npc).map(caja)],
    { imagen, x, y }
  );

  npcs.push(npc);
  sala.appendChild(npc);
});

sala.appendChild(usuario);

// =========================
// MUNDO: zona ampliada (izquierda) + la sala de siempre (derecha)
// =========================
const ANCHO_SALA = 1400;
const ANCHO_MUNDO = AMPLIACION + ANCHO_SALA;

const mundo = document.createElement("div");
mundo.className = "mundo";
mundo.style.width = `${ANCHO_MUNDO}px`;

const ampliacion = document.createElement("div");
ampliacion.className = "ampliacion";
ampliacion.style.width = `${AMPLIACION}px`;

// Tramos de piso + pared. Se alternan en espejo para que no se note la unión.
const TRAMOS = Math.ceil(AMPLIACION / ANCHO_SALA);
for (let i = 0; i < TRAMOS; i++) {
  const tramo = document.createElement("div");
  tramo.className = "tramo";
  if ((TRAMOS - 1 - i) % 2 === 0) tramo.classList.add("espejo");
  ampliacion.appendChild(tramo);
}

// La sala queda a la derecha: sus coordenadas no cambian, la zona nueva usa x negativas
sala.style.left = `${AMPLIACION}px`;

mundo.appendChild(ampliacion);
mundo.appendChild(sala);
app.appendChild(mundo);

// =========================
// CÁMARA: sigue al personaje con suavidad
// =========================
const SUAVIDAD_CAMARA = 0.15;
let camaraX = null;

function actualizarCamara() {
  const { x } = usuario.obtenerPosicion();
  const centroJugador = AMPLIACION + x + MARGEN_X;
  const anchoPantalla = window.innerWidth;

  const objetivo = Math.max(0, Math.min(centroJugador - anchoPantalla / 2, ANCHO_MUNDO - anchoPantalla));

  camaraX = camaraX === null ? objetivo : camaraX + (objetivo - camaraX) * SUAVIDAD_CAMARA;
  mundo.style.transform = `translateX(${-Math.round(camaraX)}px)`;

  requestAnimationFrame(actualizarCamara);
}
actualizarCamara();

// =========================
// VIDAS
// =========================
const NIVEL_ACTUAL = 1;

const vidas = crearVidas({
  alSinVidas: () => gameOver("vidas"),
});

// =========================
// GAME OVER (las 3 formas de perder)
// =========================
const MOTIVOS_DERROTA = {
  observacion: "Se acabó el tiempo y no observaste todas las piezas.",
  busqueda: "No encontraste al NPC a tiempo.",
  vidas: "Te quedaste sin vidas.",
};

let juegoTerminado = false;

function gameOver(motivo) {
  if (juegoTerminado) return;
  juegoTerminado = true;

  mision.detener();
  encuentro.cancelar();
  usuario.pausar();

  mostrarPantalla({
    tono: "mal",
    titulo: "GAME OVER",
    mensaje: MOTIVOS_DERROTA[motivo] ?? "Perdiste.",
    detalle: `Nivel ${NIVEL_ACTUAL}`,
    boton: "Volver a empezar",
    alBoton: () => location.reload(),     // empieza todo de nuevo
  });
}

// =========================
// NPC OBJETIVO: pistas para encontrarlo
// Agregá una línea por NPC. Solo los que tienen pista pueden ser el objetivo.
// =========================
const PISTAS_NPC = {
  "/npccinco.png": "la chica de pelo rosa",
  // "/npcuno.png": "el chico de ...",
  // "/npcdos.png": "...",
};

function empezarBusquedaNPC() {
  const candidatos = IMAGENES_NPCS.filter(img => PISTAS_NPC[img]);
  const imagen = candidatos[Math.floor(Math.random() * candidatos.length)];
  const npc = npcs[IMAGENES_NPCS.indexOf(imagen)];

  mision.fijarPista(PISTAS_NPC[imagen]);
  encuentro.activar(npc);          // recién ahora se habilita el encuentro con ese NPC
}

// =========================
// MISIÓN DEL NIVEL (panel + temporizadores)
// =========================
const mision = crearMision({
  nivel: NIVEL_ACTUAL,
  alPerder: gameOver,                               // se acabó el tiempo (observación o búsqueda)
  alCompletarObservacion: empezarBusquedaNPC,
});

// SOLO PARA PROBAR desde la consola:
//   mision.registrarObra(1)   mision.registrarObra(2)   vidas.perder()
window.mision = mision;
window.vidas = vidas;

// el ícono aparece a los 5 segundos y ahí arranca el tiempo de observación
setTimeout(() => mision.iniciar(), 5000);

// =========================
// ENCUENTRO CON EL NPC (quiz)
// =========================
function nivelCompletado() {
  mision.completar();
  vidas.ganar();                                    // completar un nivel recupera 1 vida (tope 5)

  const nivel = NIVELES.find(n => n.numero === NIVEL_ACTUAL);
  mostrarPantalla({
    tono: "bien",
    titulo: `¡NIVEL ${NIVEL_ACTUAL} COMPLETADO!`,
    mensaje: nivel.mensajeFinal,
    detalle: "Los próximos niveles vienen pronto.",
    boton: "Jugar de nuevo",
    alBoton: () => location.reload(),
  });
}

const encuentro = crearEncuentroNPC({
  usuario,
  mision,
  vidas,
  alTerminarQuiz: nivelCompletado,
});

// al cerrar el panel de una obra/escultura, la misión la cuenta (y se dibuja el check)
const obrasUI = iniciarObras(sala, usuario, {
  alObservar: (pieza) =>
    pieza.tipo === "obra"
      ? mision.registrarObra(pieza.numero)
      : mision.registrarEscultura(pieza.numero),
});

// =========================
// MÚSICA
// =========================
const musica = new Audio("/musicasalauno.mp3");
musica.loop = true;
musica.volume = 0.4;

const eventosActivacion = ["keydown", "pointerdown", "click", "touchstart"];

function iniciarMusica() {
  musica.play()
    .then(() => {
      console.log("MÚSICA REPRODUCIÉNDOSE");
      eventosActivacion.forEach(ev => document.removeEventListener(ev, iniciarMusica));
    })
    .catch(() => {
      // Todavía no hubo una activación válida: seguimos esperando el próximo evento
    });
}

eventosActivacion.forEach(ev => document.addEventListener(ev, iniciarMusica));