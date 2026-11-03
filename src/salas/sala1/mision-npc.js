import { completarTarea, reiniciarTareas } from "./mision.js";

const OBRA = {
  titulo: "Le Moulin de la Galette",
  estilo: "Impresionismo",
  tecnica: "Óleo",
};

const PREGUNTAS = [
  {
    texto: `¿Quién pintó "${OBRA.titulo}"?`,
    opciones: ["Claude Monet", "Vincent van Gogh", "Paul Cézanne"],
    correcta: 1,
  },
  {
    texto: "¿A qué estilo pertenece la obra?",
    opciones: ["Cubismo", "Barroco", OBRA.estilo],
    correcta: 2,
  },
  {
    texto: "¿Qué técnica se usó para pintarla?",
    opciones: ["Acuarela", OBRA.tecnica, "Escultura en bronce"],
    correcta: 1,
  },
];

function abrirQuiz(onTerminar) {
  const overlay = document.createElement("div");
  overlay.className = "quiz-overlay";
  const panel = document.createElement("div");
  panel.className = "quiz-panel";
  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  let indice = 0;
  let aciertos = 0;
  reiniciarTareas(); // cada intento empieza de cero

  function mostrarPregunta() {
    const p = PREGUNTAS[indice];
    panel.innerHTML = `
      <div class="quiz-progreso">Pregunta ${indice + 1} de ${PREGUNTAS.length}</div>
      <div class="quiz-pregunta">${p.texto}</div>
      <div class="quiz-opciones"></div>
      <div class="quiz-feedback"></div>
    `;
    const contenedor = panel.querySelector(".quiz-opciones");
    p.opciones.forEach((texto, i) => {
      const btn = document.createElement("button");
      btn.textContent = texto;
      btn.addEventListener("click", () => responder(i, btn));
      contenedor.appendChild(btn);
    });
  }

  function responder(i, btn) {
    const p = PREGUNTAS[indice];
    const botones = panel.querySelectorAll(".quiz-opciones button");
    botones.forEach(b => (b.disabled = true));

    const acerto = i === p.correcta;
    if (acerto) {
      aciertos++;
      completarTarea(indice + 1);
    }
    btn.classList.add(acerto ? "correcta" : "incorrecta");
    botones[p.correcta].classList.add("correcta");
    panel.querySelector(".quiz-feedback").textContent = acerto ? "¡Correcto!" : "Ups, no era esa.";

    setTimeout(() => {
      indice++;
      if (indice < PREGUNTAS.length) mostrarPregunta();
      else terminar();
    }, 1200);
  }

  function terminar() {
    const aprobo = aciertos === PREGUNTAS.length;
    panel.innerHTML = `
      <div class="quiz-pregunta">${
        aprobo
          ? "🎉 ¡Felicitaciones! Respondiste las 3 preguntas correctamente."
          : `Acertaste ${aciertos} de ${PREGUNTAS.length}. ¡Mirá bien la obra y volvé a intentarlo!`
      }</div>
      <button class="quiz-cerrar">Continuar</button>
    `;
    panel.querySelector(".quiz-cerrar").addEventListener("click", () => {
      overlay.remove();
      onTerminar(aprobo);
    });
  }

  mostrarPregunta();
}

export function iniciarMisionNPC({ usuario, npc, mision, distancia = 70 }) {
  let completada = false;
  let enQuiz = false;
  let puedeReintentar = true;

  function revisar() {
    if (completada) return;

    const a = usuario.obtenerPosicion();
    const b = npc.obtenerPosicion();
    const d = Math.hypot(a.x - b.x, a.y - b.y);

    if (!enQuiz && puedeReintentar && d < distancia) {
      enQuiz = true;
      puedeReintentar = false;
      usuario.pausar();
      npc.detener(a.x, a.y);

      abrirQuiz((aprobo) => {
        enQuiz = false;
        usuario.reanudar();
        npc.reanudar();
        if (aprobo) {
          completada = true;
          mision.completar();
        }
      });
    }

    if (!enQuiz && d > distancia * 2) puedeReintentar = true;

    requestAnimationFrame(revisar);
  }
  revisar();
}