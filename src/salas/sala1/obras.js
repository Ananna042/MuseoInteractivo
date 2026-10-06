const obras = [
  {
    id: 'primerobra',
    x: 100, y: 10, width: 95, height: 125,
    imagenReal: '/obrareal1.png',
    titulo: 'Título de la obra',
    autor: 'Autor',
    datos: [
      { etiqueta: 'Origen', valor: '—' },
      { etiqueta: 'Fecha', valor: '—' },
      { etiqueta: 'Período', valor: '—' },
      { etiqueta: 'Escuela', valor: '—' },
      { etiqueta: 'Técnica', valor: '—' },
      { etiqueta: 'Objeto', valor: '—' },
      { etiqueta: 'Estilo', valor: '—' },
      { etiqueta: 'Género', valor: '—' },
      { etiqueta: 'Soporte', valor: '—' },
      { etiqueta: 'Medidas', valor: '—' },
    ],
  },
];

const DISTANCIA_INTERACCION = 80;

function construirPanel(obra) {
  const filas = obra.datos
    .map(d => `<div class="panel-fila"><span class="etiqueta">${d.etiqueta}:</span><span>${d.valor}</span></div>`)
    .join('');

  return `
    <div class="panel-imagen-contenedor">
      <img src="${obra.imagenReal}" alt="${obra.titulo}">
    </div>
    <div class="panel-info">
      <h2>${obra.titulo}</h2>
      <div class="autor">${obra.autor}</div>
      ${filas}
    </div>
  `;
}

export function iniciarObras(sala, usuario) {
  const prompt = document.createElement('div');
  prompt.className = 'prompt-interaccion tecla';
  prompt.textContent = 'E';
  sala.appendChild(prompt);

  const overlay = document.createElement('div');
  overlay.className = 'overlay-obra';

  const panel = document.createElement('div');
  panel.className = 'panel-obra';
  overlay.appendChild(panel);

  const volverAviso = document.createElement('div');
  volverAviso.className = 'volver-aviso';
  volverAviso.innerHTML = 'Volvé atrás con <span class="tecla">E</span>';
  overlay.appendChild(volverAviso);

  document.body.appendChild(overlay);

  let obraActual = null;
  let panelAbierto = false;

  function actualizar() {
    const salaRect = sala.getBoundingClientRect();
    const usuarioRect = usuario.getBoundingClientRect();

    const usuarioX = usuarioRect.left - salaRect.left + usuarioRect.width / 2;
    const usuarioY = usuarioRect.top - salaRect.top + usuarioRect.height / 2;

    let obraCercana = null;
    let menorDistancia = Infinity;

    for (const obra of obras) {
      const centroX = obra.x + obra.width / 2;
      const centroY = obra.y + obra.height / 2;
      const dx = usuarioX - centroX;
      const dy = usuarioY - centroY;
      const distancia = Math.sqrt(dx * dx + dy * dy);

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        obraCercana = obra;
      }
    }

    if (!panelAbierto) {
      if (obraCercana && menorDistancia < DISTANCIA_INTERACCION) {
        prompt.style.display = 'inline-flex';
        prompt.style.left = `${obraCercana.x + obraCercana.width / 2}px`;
        prompt.style.top = `${obraCercana.y + obraCercana.height + 10}px`;
        obraActual = obraCercana;
      } else {
        prompt.style.display = 'none';
        obraActual = null;
      }
    }

    requestAnimationFrame(actualizar);
  }

  actualizar();

  document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'e') {
      if (panelAbierto) {
        overlay.classList.remove('activo');
        panelAbierto = false;
      } else if (obraActual) {
        panel.innerHTML = construirPanel(obraActual);
        overlay.classList.add('activo');
        panelAbierto = true;
      }
    }
  });
}