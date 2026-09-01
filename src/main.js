import "./estilos/sala1.css";

import { crearParedes } from "./salas/sala1/paredes.js";
import { crearPersonaje } from "./general/personaje.js";

const app = document.querySelector("#app");

const sala = crearParedes();

const usuario = crearPersonaje(sala.limites);

sala.appendChild(usuario);

app.appendChild(sala);