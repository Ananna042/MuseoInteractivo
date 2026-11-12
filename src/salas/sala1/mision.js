// =====================================================================
//  mision.js  -  PANEL DE MISIÓN + etapas + temporizadores
//
//  Etapas:   espera -> observacion -> busqueda -> quiz   (o "perdido")
//
//  Uso desde main.js:
//    const mision = crearMision({ nivel: 1, alPerder: (motivo) => ... });
//    mision.iniciar();                 // muestra el ícono y arranca el tiempo de observación
//
//  Lo que se llama desde afuera:
//    mision.registrarObra(id)          // al cerrar el panel de una obra (paso 3)
//    mision.registrarEscultura(id)     // idem con esculturas
//    mision.npcEncontrado()            // cuando el jugador llega al NPC (paso 4)
//
//  Los dos temporizadores son independientes y NUNCA se pausan:
//  corren aunque el jugador esté leyendo una obra.
// =====================================================================
import { NIVELES } from "../../general/niveles.js";

// true  = el jugador cumple la cantidad de piezas y IGUAL tiene que esperar a que termine el
//         tiempo de observación: recién ahí se verifica y empieza la búsqueda del NPC.
// false = apenas cumple la cantidad, empieza la búsqueda del NPC (se saltea el tiempo que sobra).
const ESPERAR_FIN_OBSERVACION = true;

const pad = (n) => String(n).padStart(2, "0");
const formatear = (seg) => `${pad(Math.floor(seg / 60))}:${pad(seg % 60)}`;

export function crearMision({
  niveles = NIVELES,
  nivel = 1,
  alPerder = () => {},
  alCompletarObservacion = () => {},
} = {}) {
  const config = niveles.find(n => n.numero === nivel);

  // ---------- estado ----------
  let estado = "espera";            // espera | observacion | busqueda | quiz | perdido
  let motivoDerrota = "";
  let pista = "";                   // descripción del NPC a buscar (la fija main.js)
  let finObservacion = 0;           // momentos (ms) en que vence cada temporizador
  let finBusqueda = 0;
  let intervalo = null;
  const vistas = { obra: new Set(), escultura: new Set() };

  // ---------- elementos ----------
  const panel = document.createElement("div");
  panel.className = "mision-panel";
  panel.innerHTML = `
    <button class="mision-icono" type="button" tabindex="-1" aria-label="Misión">
      <img src="/iconomision.png" alt="">
      <span class="mision-mini"></span>
    </button>
    <div class="mision-tarjeta"></div>
  `;
  const icono = panel.querySelector(".mision-icono");
  const mini = panel.querySelector(".mision-mini");
  const tarjeta = panel.querySelector(".mision-tarjeta");
  document.body.appendChild(panel);

  // ---------- utilidades ----------
  const restante = (fin) => Math.max(0, Math.ceil((fin - Date.now()) / 1000));

  function requeridas(tipo) {
    return tipo === "obra" ? config.obras : config.esculturas;
  }
  function contadas(tipo) {
    return Math.min(vistas[tipo].size, requeridas(tipo));
  }
  function observacionCumplida() {
    return contadas("obra") >= config.obras && contadas("escultura") >= config.esculturas;
  }

  function textoObjetivo() {
    const partes = [];
    if (config.obras) partes.push(`${config.obras} ${config.obras === 1 ? "obra" : "obras"}`);
    if (config.esculturas) partes.push(`${config.esculturas} ${config.esculturas === 1 ? "escultura" : "esculturas"}`);
    return `Observá ${partes.join(" y ")}`;
  }

  function filaTiempo(seg) {
    const urgente = seg <= 10 ? " urgente" : "";
    return `<div class="mision-fila"><span>Tiempo:</span><span class="mision-tiempo${urgente}">${formatear(seg)}</span></div>`;
  }

  function filasProgreso() {
    let html = "";
    if (config.obras) {
      html += `<div class="mision-fila"><span>Obras observadas:</span><span>${contadas("obra")}/${config.obras}</span></div>`;
    }
    if (config.esculturas) {
      html += `<div class="mision-fila"><span>Esculturas:</span><span>${contadas("escultura")}/${config.esculturas}</span></div>`;
    }
    return html;
  }

  // ---------- dibujo ----------
  function pintar() {
    const titulo = `<div class="mision-titulo">Nivel ${config.numero} · ${config.nombre}</div>`;
    let cuerpo = "";
    let miniTexto = "";
    let urgente = false;

    if (estado === "observacion") {
      const s = restante(finObservacion);
      const listo = observacionCumplida();
      cuerpo = `<div class="mision-objetivo${listo ? " listo" : ""}">${listo ? "¡Listo! Esperá a que termine el tiempo." : textoObjetivo()}</div>${filasProgreso()}${filaTiempo(s)}`;
      miniTexto = formatear(s);
      urgente = s <= 10;
    } else if (estado === "busqueda") {
      const s = restante(finBusqueda);
      const objetivoNPC = pista ? `¡Buscá a ${pista}!` : "¡Encontrá al NPC!";
      cuerpo = `<div class="mision-objetivo">${objetivoNPC}</div>
                <div class="mision-fila hecho"><span>Observación:</span><span>✓</span></div>
                ${filaTiempo(s)}`;
      miniTexto = formatear(s);
      urgente = s <= 10;
    } else if (estado === "quiz") {
      cuerpo = `<div class="mision-objetivo">¡Lo encontraste! Respondé sus preguntas.</div>`;
    } else if (estado === "completado") {
      cuerpo = `<div class="mision-objetivo listo">¡Nivel completado!</div>`;
    } else if (estado === "perdido") {
      const motivo = motivoDerrota === "observacion"
        ? "No llegaste a observar todas las piezas."
        : "No encontraste al NPC a tiempo.";
      cuerpo = `<div class="mision-objetivo perdido">¡Se acabó el tiempo!</div><div class="mision-detalle">${motivo}</div>`;
    }

    tarjeta.innerHTML = titulo + cuerpo;
    mini.textContent = miniTexto;
    mini.classList.toggle("urgente", urgente);
  }

  // ---------- temporizadores ----------
  function iniciarBusqueda() {
    estado = "busqueda";
    finBusqueda = Date.now() + config.tiempoBusqueda * 1000;
    panel.classList.add("llamar");              // aviso de objetivo nuevo
    pintar();
    alCompletarObservacion();
  }

  function tic() {
    if (estado === "observacion" && restante(finObservacion) <= 0) {
      // se acabó el tiempo de observación: se verifica si cumplió
      return observacionCumplida() ? iniciarBusqueda() : perder("observacion");
    }
    if (estado === "busqueda" && restante(finBusqueda) <= 0) return perder("busqueda");
    pintar();
  }

  function detenerTemporizadores() {
    clearInterval(intervalo);
    intervalo = null;
  }

  function perder(motivo) {
    if (["perdido", "terminado", "completado"].includes(estado)) return;
    estado = "perdido";
    motivoDerrota = motivo;
    detenerTemporizadores();
    pintar();
    alPerder(motivo);
  }

  // ---------- abrir / cerrar ----------
  function abrir() {
    panel.classList.add("abierto");
    panel.classList.remove("llamar");
  }
  function alternar() {
    panel.classList.toggle("abierto");
    panel.classList.remove("llamar");
    icono.blur();   // para que las flechas / E no actúen sobre el botón
  }
  icono.addEventListener("click", alternar);

  // ---------- API ----------
  return {
    iniciar() {
      if (estado !== "espera") return;
      estado = "observacion";
      finObservacion = Date.now() + config.tiempoObservacion * 1000;
      pintar();
      panel.classList.add("visible", "llamar");   // aparece y "llama la atención" hasta el primer clic
      intervalo = setInterval(tic, 250);
    },

    registrarObra(id) {
      return registrar("obra", id);
    },
    registrarEscultura(id) {
      return registrar("escultura", id);
    },

    fijarPista(texto) {
      pista = texto;
      pintar();
    },

    // para cuando el juego termina por otro motivo (ej. sin vidas)
    detener() {
      detenerTemporizadores();
      if (estado !== "completado") estado = "terminado";
    },

    // el jugador respondió el quiz del NPC: nivel completo
    completar() {
      detenerTemporizadores();
      estado = "completado";
      pintar();
    },

    obtenerObservadas: () => ({
      obras: [...vistas.obra],
      esculturas: [...vistas.escultura],
    }),

    npcEncontrado() {
      if (estado !== "busqueda") return;
      estado = "quiz";
      detenerTemporizadores();
      pintar();
    },

    obtenerEstado: () => estado,
    obtenerProgreso: () => ({ obras: contadas("obra"), esculturas: contadas("escultura") }),
    elemento: panel,
  };

  function registrar(tipo, id) {
    if (estado !== "observacion") return false;
    if (vistas[tipo].has(id)) return false;       // cada pieza cuenta una sola vez por nivel
    if (contadas(tipo) >= requeridas(tipo)) return false;   // ya alcanzó las de este tipo: no suma

    vistas[tipo].add(id);

    if (observacionCumplida() && !ESPERAR_FIN_OBSERVACION) {
      iniciarBusqueda();
    } else {
      pintar();
    }
    return true;
  }
}