import "./estilos/sala1.css";

import { crearParedes } from "./assets/sala1/escenario/paredes.js";
import { crearUsuario } from "./assets/sala1/personajes/usuario.js";

const app = document.querySelector("#app");

const sala = crearParedes();

const usuario = crearUsuario(sala.limites);

sala.appendChild(usuario);

app.appendChild(sala);
