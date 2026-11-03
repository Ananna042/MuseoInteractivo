const tareas = [
  { id: 1, texto: "Responder 1ra pregunta" },
  { id: 2, texto: "Responder 2da pregunta" },
  { id: 3, texto: "Responder 3ra pregunta" },
];

export function crearChecklist(titulo = "Tareas") {
  const panel = document.createElement("div");
  panel.className = "checklist";

  panel.innerHTML = `
    <div class="checklist-titulo">${titulo}</div>
    ${tareas.map(t => `
      <div class="checklist-item" data-id="${t.id}">
        <div class="check-circulo">
          <svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6"/></svg>
        </div>
        <div class="checklist-texto">${t.texto}</div>
      </div>
    `).join("")}
  `;
  return panel;
}

export function completarTarea(id) {
  document.querySelector(`.checklist-item[data-id="${id}"]`)?.classList.add("completado");
}

export function reiniciarTareas() {
  document.querySelectorAll(".checklist-item").forEach(i => i.classList.remove("completado"));
}