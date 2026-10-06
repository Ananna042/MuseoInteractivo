import "./estilos/sala1.css";

import { crearParedes } from "./salas/sala1/paredes.js";
import { crearPersonaje } from "./general/personaje.js";
import { iniciarObras } from "./salas/sala1/obras.js";
import { crearNPC } from "./salas/sala1/npcs.js";
import { crearChecklist } from "./salas/sala1/mision.js"; // ajustá la ruta a donde lo tengas

const app = document.querySelector("#app");
const sala = crearParedes();
const usuario = crearPersonaje(sala.limites, sala.obstaculos);
const npc = crearNPC(sala.limites, sala.obstaculos);

sala.appendChild(usuario);
sala.appendChild(npc);
app.appendChild(sala);

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