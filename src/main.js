import "./estilos/sala1.css";

import { crearParedes } from "./salas/sala1/paredes.js";
import { crearPersonaje } from "./general/personaje.js";
import { iniciarPianista } from './salas/sala1/pianista.js';

const app = document.querySelector("#app");
const sala = crearParedes();
const usuario = crearPersonaje(sala.limites, sala.obstaculos);


sala.appendChild(usuario);
app.appendChild(sala);

iniciarPianista();


const musica = new Audio("/musicasalauno.mp3");

musica.loop = true;
musica.volume = 0.4;

document.addEventListener("keydown", () => {
  console.log("TECLA DETECTADA");
  musica.play()
    .then(() => console.log("MÚSICA REPRODUCIÉNDOSE"))
    .catch(error => console.error("ERROR DE AUDIO:", error));
}, { once: true });