// =====================================================================
//  mision-npc.js  -  ENCUENTRO CON EL NPC + QUIZ
//
//  El quiz SOLO se abre si:
//    1) la misión está en la etapa de búsqueda (ya observó las piezas pedidas), y
//    2) el jugador llega al NPC que es el objetivo.
//  Chocar con cualquier otro NPC, o con el objetivo antes de tiempo, no hace nada.
//
//  Reglas del quiz:
//    - 3 preguntas de 3 opciones, sacadas de las piezas que el jugador observó
//    - cada error resta 1 vida y se pasa a la siguiente pregunta (no se repite)
//    - el NPC se considera completado al contestar las 3 (si el jugador sigue con vidas)
//
//  Uso:
//    const encuentro = crearEncuentroNPC({ usuario, mision, vidas, alTerminarQuiz });
//    encuentro.activar(npcObjetivo);   // cuando empieza la búsqueda
//    encuentro.cancelar();             // si el jugador pierde (Game Over)
// =====================================================================
import { armarCuestionario } from "./preguntas.js";

const CANTIDAD_PREGUNTAS = 3;

export function crearEncuentroNPC({
  usuario,
  mision,
  vidas,
  alTerminarQuiz = () => {},
  distancia = 70,
}) {
  const yaUsadas = new Set();       // preguntas ya hechas en este nivel (para no repetirlas con otro NPC)
  let objetivo = null;
  let enQuiz = false;
  let cancelado = false;
  let overlayActual = null;

  // ---------- quiz ----------
  function abrirQuiz(preguntas) {
    const overlay = document.createElement("div");
    overlay.className = "quiz-overlay";
    const panel = document.createElement("div");
    panel.className = "quiz-panel";
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    overlayActual = overlay;

    let indice = 0;
    let aciertos = 0;

    function mostrarPregunta() {
      const p = preguntas[indice];
      panel.innerHTML = `
        <div class="quiz-progreso">Pregunta ${indice + 1} de ${preguntas.length}</div>
        <div class="quiz-pregunta"></div>
        <div class="quiz-opciones"></div>
        <div class="quiz-feedback"></div>
      `;
      panel.querySelector(".quiz-pregunta").textContent = p.texto;
      const contenedor = panel.querySelector(".quiz-opciones");
      p.opciones.forEach((texto, i) => {
        const btn = document.createElement("button");
        btn.textContent = texto;
        btn.addEventListener("click", () => responder(i, btn));
        contenedor.appendChild(btn);
      });
    }

    function responder(i, btn) {
      if (cancelado) return;
      const p = preguntas[indice];
      const botones = panel.querySelectorAll(".quiz-opciones button");
      botones.forEach(b => (b.disabled = true));

      const acerto = i === p.correcta;
      btn.classList.add(acerto ? "correcta" : "incorrecta");
      botones[p.correcta].classList.add("correcta");
      panel.querySelector(".quiz-feedback").textContent = acerto ? "¡Correcto!" : "Ups, no era esa.";

      if (acerto) {
        aciertos++;
      } else {
        vidas.perder();            // error = -1 vida (si era la última, salta el Game Over y se cancela todo)
        if (cancelado) return;
      }

      setTimeout(() => {
        if (cancelado) return;
        indice++;
        if (indice < preguntas.length) mostrarPregunta();
        else terminar();
      }, 1200);
    }

    function terminar() {
      panel.innerHTML = `
        <div class="quiz-pregunta"></div>
        <button class="quiz-cerrar">Continuar</button>
      `;
      panel.querySelector(".quiz-pregunta").textContent =
        aciertos === preguntas.length
          ? "¡Perfecto! Respondiste las 3 preguntas correctamente."
          : `Acertaste ${aciertos} de ${preguntas.length}.`;
      panel.querySelector(".quiz-cerrar").addEventListener("click", () => {
        overlay.remove();
        overlayActual = null;
        enQuiz = false;
        usuario.reanudar();
        objetivo?.reanudar();
        alTerminarQuiz({ aciertos, total: preguntas.length });
      });
    }

    mostrarPregunta();
  }

  // ---------- vigilar la distancia al NPC objetivo ----------
  function revisar() {
    if (cancelado || !objetivo || enQuiz) return;

    const estado = mision.obtenerEstado();
    if (estado === "busqueda") {
      const a = usuario.obtenerPosicion();
      const b = objetivo.obtenerPosicion();
      if (Math.hypot(a.x - b.x, a.y - b.y) < distancia) return empezar(a);
    } else if (estado !== "observacion") {
      return;     // perdió / terminó: ya no hay nada que vigilar
    }
    requestAnimationFrame(revisar);
  }

  function empezar(posJugador) {
    enQuiz = true;
    mision.npcEncontrado();                  // frena el tiempo de búsqueda
    usuario.pausar();
    objetivo.detener(posJugador.x, posJugador.y);

    const { obras, esculturas } = mision.obtenerObservadas();
    const { preguntas, claves } = armarCuestionario({
      obras, esculturas, cantidad: CANTIDAD_PREGUNTAS, yaUsadas,
    });
    claves.forEach(c => yaUsadas.add(c));
    abrirQuiz(preguntas);
  }

  return {
    activar(npc) {
      objetivo = npc;
      enQuiz = false;
      requestAnimationFrame(revisar);
    },
    cancelar() {
      cancelado = true;
      overlayActual?.remove();
      overlayActual = null;
    },
  };
}