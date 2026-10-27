import "./estilos/sala1.css";

import { crearParedes, AMPLIACION } from "./salas/sala1/paredes.js";
import { crearPersonaje } from "./general/personaje.js";
import { iniciarObras } from "./salas/sala1/obras.js";
import { crearNPC } from "./salas/sala1/npcs.js";
import { crearChecklist } from "./salas/sala1/mision.js"; // ajustá la ruta a donde lo tengas
import { crearMusicos } from "./salas/sala1/musicos.js";

const app = document.querySelector("#app");
const sala = crearParedes();


// justo después de: const sala = crearParedes();
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

// Cada uno ve al otro como un obstáculo (no se empujan, simplemente no se atraviesan)
const usuario = crearPersonaje(sala.limites, sala.obstaculos, () => [caja(npc)]);
const npc = crearNPC(sala.limites, sala.obstaculos, () => [caja(usuario)]);

sala.appendChild(usuario);
sala.appendChild(npc);

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
const SUAVIDAD_CAMARA = 0.15; // 1 = pegada al personaje, más chico = más suave
let camaraX = null;

function actualizarCamara() {
  const { x } = usuario.obtenerPosicion();
  const centroJugador = AMPLIACION + x + MARGEN_X; // centro del personaje en el mundo
  const anchoPantalla = window.innerWidth;

  // la cámara no se sale del mapa (ni por la izquierda ni por la derecha)
  const objetivo = Math.max(0, Math.min(centroJugador - anchoPantalla / 2, ANCHO_MUNDO - anchoPantalla));

  camaraX = camaraX === null ? objetivo : camaraX + (objetivo - camaraX) * SUAVIDAD_CAMARA;
  mundo.style.transform = `translateX(${-Math.round(camaraX)}px)`;

  requestAnimationFrame(actualizarCamara);
}
actualizarCamara();

// Checklist directo en body, para que position: fixed funcione bien
document.body.appendChild(crearChecklist());
document.querySelectorAll(".checklist-item").forEach(item => {
  item.addEventListener("click", () => item.classList.toggle("completado"));
});

iniciarObras(sala, usuario);

// ...el resto igual (música)

const musica = new Audio("/musicasalauno.mp3");
musica.loop = true;
musica.volume = 0.4;

document.addEventListener("keydown", () => {
  console.log("TECLA DETECTADA");
  musica.play()
    .then(() => console.log("MÚSICA REPRODUCIÉNDOSE"))
    .catch(error => console.error("ERROR DE AUDIO:", error));
}, { once: true });

