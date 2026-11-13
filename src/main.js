import "./estilos/sala1.css";
import "./estilos/hud.css";
import "./estilos/intro.css";

import { crearParedes, AMPLIACION } from "./salas/sala1/paredes.js";
import { crearPersonaje } from "./general/personaje.js";
import { crearVidas } from "./general/vidas.js";
import { mostrarPantalla } from "./general/pantallas.js";
import { mostrarIntro } from "./general/intro.js";
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
let nivelActual = 1;

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
    detalle: `Nivel ${nivelActual}`,
    boton: "Volver a empezar",
    alBoton: () => location.reload(),     // empieza todo de nuevo (nivel 1, 5 vidas)
  });
}

// =========================
// NPC DE CADA NIVEL
// Los NPC se usan en orden: el nivel 1 usa npcuno, el 2 npcdos, el 3 npctres y npccuatro, etc.
// (la cantidad por nivel sale de `npcs` en niveles.js).
//
// PISTAS_NPC: la descripción que se muestra en el panel. Si un NPC no tiene pista,
// el panel dice "¡Buscá al NPC 1!" (el número es su orden: npcuno = 1 ... npcdiez = 10).
// =========================





const PISTAS_NPC = {
 // "/npcuno.png": "al chico de ...",


 "/npcuno.png": "a la chica de pelo negro y abrigo morado",
 "/npcdos.png": "al señor de pelo marron y pantalones morados",
 "/npctres.png": "a la chica de anteojos rosas y ropa azul",
 "/npccuatro.png": "a la chica de pelo marron corto y ropa naranja",
 "/npccinco.png": "a la chica de pelo rosa",
 "/npcseis.png": "al chico de pelo marron y buzo azul",
 "/npcsiete.png": "a la chica de pelo negro largo y moño rosa",
 "/npcocho.png": "al chico de peinado enorme y shorts naranja",
 "/npcnueve.png": "al chico alien",
 "/npcdiez.png": "al señor rubio de flequillo largo  ",


 // "/npcdos.png": "al ...",
};





let colaNPC = [];        // NPC que faltan encontrar en este nivel

function armarColaNPC(numeroNivel) {
  const antes = NIVELES.filter(n => n.numero < numeroNivel).reduce((t, n) => t + n.npcs, 0);
  const cantidad = NIVELES.find(n => n.numero === numeroNivel).npcs;
  colaNPC = IMAGENES_NPCS.slice(antes, antes + cantidad).map((imagen, i) => ({
    imagen,
    orden: antes + i + 1,
    npc: npcs[antes + i],
  }));
}

function buscarSiguienteNPC() {
  const { imagen, orden, npc } = colaNPC.shift();
  mision.fijarPista(PISTAS_NPC[imagen] ?? `al NPC ${orden}`);
  encuentro.activar(npc);          // recién ahora se habilita el encuentro con ese NPC
}

// =========================
// MISIÓN DEL NIVEL (panel + temporizadores)
// =========================
const mision = crearMision({
  nivel: nivelActual,
  alPerder: gameOver,                               // se acabó el tiempo (observación o búsqueda)
  alCompletarObservacion: buscarSiguienteNPC,
});

// SOLO PARA PROBAR desde la consola:
//   mision.registrarObra(1)   mision.registrarObra(2)   vidas.perder()
window.mision = mision;
window.vidas = vidas;
window.npcs = npcs;
window.usuario = usuario;

function empezarNivel() {
  armarColaNPC(nivelActual);
  mision.iniciar();
}

// pantalla de inicio: el juego (música + misión) arranca recién con el click / Enter
mostrarIntro({
  alEmpezar: () => {
    iniciarMusica();                       // el click o Enter cuenta como activación del usuario
    setTimeout(empezarNivel, 5000);        // 5 s después de empezar aparece el ícono y corre el tiempo
  },
});

// =========================
// ENCUENTRO CON EL NPC (quiz) Y PASO DE NIVEL
// =========================
function nivelCompletado() {
  mision.completar();
  vidas.ganar();                                    // completar un nivel recupera 1 vida (tope 5)

  const nivel = NIVELES.find(n => n.numero === nivelActual);
  const hayOtro = NIVELES.some(n => n.numero === nivelActual + 1);

  if (!hayOtro) {
    mostrarPantalla({
      tono: "victoria",
      titulo: "¡GANASTE!",
      mensaje: nivel.mensajeFinal,
      detalle: `Completaste los ${NIVELES.length} niveles con ${vidas.obtener()} ${vidas.obtener() === 1 ? "vida" : "vidas"}.`,
      boton: "Volver a empezar",
      alBoton: () => location.reload(),
    });
    return;
  }

  mostrarPantalla({
    tono: "bien",
    titulo: `¡NIVEL ${nivelActual} COMPLETADO!`,
    mensaje: nivel.mensajeFinal,
    detalle: "Ganaste 1 vida.",
    boton: `Ir al nivel ${nivelActual + 1}`,
    alBoton: () => {
      document.querySelector(".pantalla-overlay")?.remove();
      pasarAlNivel(nivelActual + 1);
    },
  });
}

function pasarAlNivel(numero) {
  nivelActual = numero;
  encuentro.reiniciar();
  obrasUI.reiniciarMarcas();                        // se borran los checks de las piezas
  mision.cargarNivel(numero);
  setTimeout(empezarNivel, 3000);                   // 3 s para ubicarse antes de que corra el tiempo
}

const encuentro = crearEncuentroNPC({
  usuario,
  mision,
  vidas,
  alTerminarQuiz: () => {
    if (colaNPC.length) {                           // nivel con 2 NPC: falta el segundo
      mision.siguienteBusqueda();
      buscarSiguienteNPC();
    } else {
      nivelCompletado();
    }
  },
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