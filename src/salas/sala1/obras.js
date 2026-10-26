// =====================================================================
//  obras.js  -  LÓGICA Y POSICIONES.  NO TOCAR.
//  La información de cada obra se completa en obras-contenido.js
// =====================================================================
import { CONTENIDO } from './obrascontenido.js';

// y de las obras de las paredes de abajo = --pared-y (sala1.css) + 10
const Y_ABAJO = 313;

// [numero, id, x, y, width, height]
const POSICIONES = [
  // ---------- Pared de arriba ----------
  [1, 'primerobra', 44, 10, 95, 125],
  [2, 'segundaobra', 182, 10, 148, 125],
  [3, 'terceraobra', 374, 10, 91, 125],
  [4, 'cuartaobra', 508, 10, 201, 125],
  [5, 'quintaobra', 752, 10, 182, 125],
  [6, 'sextaobra', 978, 10, 193, 125],
  [7, 'septimaobra', 1214, 10, 142, 125],

  // ---------- Pared de abajo izquierda ----------
  [8, 'octavaobra', 38, Y_ABAJO, 143, 125],
  [11, 'onceavaobra', 220, Y_ABAJO, 214, 125],

  // ---------- Pared de abajo derecha ----------
  [10, 'decimaobra', 969, Y_ABAJO, 201, 125],
  [9, 'novenaobra', 1211, Y_ABAJO, 148, 125],

  // ---------- Zona ampliada, pared de arriba (x negativas) ----------
  [12, 'obra12', -2144, 10, 144, 125],
  [13, 'obra13', -1956, 10, 91, 125],
  [14, 'obra14', -1822, 10, 104, 125],
  [15, 'obra15', -1674, 10, 176, 125],
  [16, 'obra16', -1455, 10, 160, 125],
  [17, 'obra17', -1252, 10, 125, 125],
  [18, 'obra18', -1083, 10, 166, 125],
  [19, 'obra19', -874, 10, 107, 125],
  [20, 'obra20', -723, 10, 162, 125],
  [21, 'obra21', -518, 10, 195, 125],
  [22, 'obra22', -279, 10, 98, 125],
  [23, 'obra23', -138, 10, 138, 125],

  // ---------- Última pantalla, pared de arriba ----------
  [24, 'obra24', -2756, 10, 100, 125],
  [25, 'obra25', -2612, 10, 97, 125],
  [26, 'obra26', -2471, 10, 145, 125],
  [31, 'obra31', -2282, 10, 94, 125],

  // ---------- Última pantalla, pared del medio ----------
  [27, 'obra27', -2525, Y_ABAJO, 195, 125],
  [28, 'obra28', -2284, Y_ABAJO, 153, 125],
  [29, 'obra29', -2085, Y_ABAJO, 166, 125],
  [30, 'obra30', -1873, Y_ABAJO, 198, 125],
];

// Etiquetas que se muestran, en este orden (clave en CONTENIDO -> texto)
const CAMPOS = [
  ['origen', 'Origen'],
  ['fecha', 'Fecha'],
  ['periodo', 'Período'],
  ['escuela', 'Escuela'],
  ['tecnica', 'Técnica'],
  ['objeto', 'Objeto'],
  ['estilo', 'Estilo'],
  ['genero', 'Género'],
  ['soporte', 'Soporte'],
  ['medidas', 'Medidas'],
];

const limpiar = (v) => String(v ?? '').trim();

// Distancia de interacción propia para una obra (si no está acá, usa 80).
// Útil para cuadros anchos, donde desde el borde cuesta que aparezca la E.
// Ejemplo:  onceavaobra: 110,
const DISTANCIAS = {
};

function armarObra([numero, id, x, y, width, height]) {
  const c = CONTENIDO[numero] || {};
  const titulo = limpiar(c.titulo);
  const autor = limpiar(c.autor);

  if (!titulo) {
    return { id, x, y, width, height, distancia: DISTANCIAS[id], imagenReal: null, titulo: 'Próximamente', autor: '', datos: [] };
  }

  return {
    id, x, y, width, height, distancia: DISTANCIAS[id],
    imagenReal: `/obrareal${numero}.png`,
    titulo,
    autor: autor ? `Autor: ${autor}` : '',
    datos: CAMPOS
      .map(([clave, etiqueta]) => ({ etiqueta, valor: limpiar(c[clave]) }))
      .filter(d => d.valor),
  };
}

const obras = POSICIONES.map(armarObra);

const DISTANCIA_INTERACCION = 80;

// Evita que un texto con < > & " rompa el panel
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, ch => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
));

function construirPanel(obra) {
  const filas = obra.datos
    .map(d => `<div class="panel-fila"><span class="etiqueta">${esc(d.etiqueta)}:</span><span>${esc(d.valor)}</span></div>`)
    .join('');

  const imagen = obra.imagenReal
    ? `<img src="${esc(obra.imagenReal)}" alt="${esc(obra.titulo)}">`
    : `<div class="panel-sin-imagen">Imagen próximamente</div>`;

  const autor = obra.autor ? `<div class="autor">${esc(obra.autor)}</div>` : '';

  return `
    <div class="panel-imagen-contenedor">
      ${imagen}
    </div>
    <div class="panel-info">
      <h2>${esc(obra.titulo)}</h2>
      ${autor}
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
  let rafId = 0;

  function cerrar() {
    overlay.classList.remove('activo');
    panelAbierto = false;
  }

  function actualizar() {
    const salaRect = sala.getBoundingClientRect();
    const usuarioRect = usuario.getBoundingClientRect();

    const usuarioX = usuarioRect.left - salaRect.left + usuarioRect.width / 2;
    const usuarioY = usuarioRect.top - salaRect.top + usuarioRect.height / 2;

    let obraCercana = null;
    let menorDistancia = Infinity;

    for (const obra of obras) {
      const dx = usuarioX - (obra.x + obra.width / 2);
      const dy = usuarioY - (obra.y + obra.height / 2);
      const distancia = Math.sqrt(dx * dx + dy * dy);

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        obraCercana = obra;
      }
    }

    if (!panelAbierto) {
      const limite = obraCercana?.distancia ?? DISTANCIA_INTERACCION;

      if (obraCercana && menorDistancia < limite) {
        prompt.style.display = 'inline-flex';
        prompt.style.left = `${obraCercana.x + obraCercana.width / 2}px`;
        prompt.style.top = `${obraCercana.y + obraCercana.height + 10}px`;
        obraActual = obraCercana;
      } else {
        prompt.style.display = 'none';
        obraActual = null;
      }
    }

    rafId = requestAnimationFrame(actualizar);
  }

  actualizar();

  function alTocarTecla(event) {
    if (event.repeat) return;
    if (['INPUT', 'TEXTAREA'].includes(event.target?.tagName)) return;

    const tecla = event.key.toLowerCase();

    if (tecla === 'escape' && panelAbierto) {
      cerrar();
    } else if (tecla === 'e') {
      if (panelAbierto) {
        cerrar();
      } else if (obraActual) {
        panel.innerHTML = construirPanel(obraActual);
        overlay.classList.add('activo');
        panelAbierto = true;
      }
    }
  }

  document.addEventListener('keydown', alTocarTecla);

  // Clic en el fondo oscuro también cierra
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) cerrar();
  });

  // Por si algún día hay que reiniciar la sala
  return function detener() {
    cancelAnimationFrame(rafId);
    document.removeEventListener('keydown', alTocarTecla);
    overlay.remove();
    prompt.remove();
  };
}