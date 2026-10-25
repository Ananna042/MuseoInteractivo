// Obra con datos pendientes: ya tiene su posición y su tecla, solo falta completar
// imagenReal, titulo, autor y datos cuando los tengas.
const pendiente = (id, x, y, width, height) => ({
  id, x, y, width, height,
  imagenReal: null,
  titulo: 'Próximamente',
  autor: '',
  datos: [],
});

// y de las obras de las paredes de abajo = --pared-y (sala1.css) + 10
const Y_ABAJO = 313;

const obras = [
  // ---------- Pared de arriba ----------
  {
    id: 'primerobra',
    x: 44, y: 10, width: 95, height: 125,
    imagenReal: '/obrareal1.png',
    titulo: 'Le Moulin de la Galette',
    autor: 'Autor: Gogh, Vicent van',
    datos: [
      { etiqueta: 'Origen', valor: 'Galerie Thannhauser (Berlin)' },
      { etiqueta: 'Fecha', valor: 'ca 1886-1887' },
      { etiqueta: 'Período', valor: 'Arte Siglo XIX (1800-1910)' },
      { etiqueta: 'Escuela', valor: 'Francesa S.XIX' },
      { etiqueta: 'Técnica', valor: 'Óleo' },
      { etiqueta: 'Objeto', valor: 'Pintura' },
      { etiqueta: 'Estilo', valor: 'Impresionismo' },
      { etiqueta: 'Género', valor: 'Paisaje' },
      { etiqueta: 'Soporte', valor: 'Sobre papel entelado' },
      { etiqueta: 'Medidas', valor: '61 x 50cm' },
    ],
  },
  pendiente('segundaobra', 182, 10, 148, 125),
  pendiente('terceraobra', 374, 10, 91, 125),
  pendiente('cuartaobra', 508, 10, 201, 125),
  pendiente('quintaobra', 752, 10, 182, 125),
  pendiente('sextaobra', 978, 10, 193, 125),
  pendiente('septimaobra', 1214, 10, 142, 125),

  // ---------- Pared de abajo izquierda ----------
  pendiente('octavaobra', 38, Y_ABAJO, 143, 135),
  pendiente('onceavaobra', 220, Y_ABAJO, 214, 135),

  // ---------- Pared de abajo derecha ----------
  pendiente('decimaobra', 969, Y_ABAJO, 201, 135),
  pendiente('novenaobra', 1211, Y_ABAJO, 148, 135),

  // =====================================================================
  //  PARED DE ARRIBA, ZONA AMPLIADA (a la izquierda de 'primerobra')
  //  obra12 ... obra23, de izquierda a derecha.
  //  Las x son negativas porque quedan a la izquierda de la sala.
  //
  //  >>> PARA QUIEN CARGA LA INFORMACIÓN <<<
  //  Para completar una obra, reemplazá su línea `pendiente(...)` por un
  //  objeto como el de 'primerobra' (más arriba), con:
  //      imagenReal  -> ruta de la imagen en grande (ej: '/obrareal12.png')
  //      titulo      -> título de la obra
  //      autor       -> 'Autor: Apellido, Nombre'
  //      datos       -> lista de { etiqueta, valor }
  //
  //  NO TOCAR: id, x, y, width, height. Son la posición de la obra en la
  //  pared; si se cambian, la letra "E" aparece en el lugar equivocado.
  //  Ejemplo para obra12 (copiá, pegá y cambiá solo lo marcado):
  //
  //    {
  //      id: 'obra12', x: -2144, y: 10, width: 144, height: 125,   // <- no tocar
  //      imagenReal: '/obrareal12.png',                            // <- completar
  //      titulo: '...',                                            // <- completar
  //      autor: 'Autor: ...',                                      // <- completar
  //      datos: [ { etiqueta: 'Fecha', valor: '...' } ],           // <- completar
  //    },
  // =====================================================================
  pendiente('obra12', -2144, 10, 144, 125),
  pendiente('obra13', -1956, 10, 91, 125),
  pendiente('obra14', -1822, 10, 104, 125),
  pendiente('obra15', -1674, 10, 176, 125),
  pendiente('obra16', -1455, 10, 160, 125),
  pendiente('obra17', -1252, 10, 125, 125),
  pendiente('obra18', -1083, 10, 166, 125),
  pendiente('obra19', -874, 10, 107, 125),
  pendiente('obra20', -723, 10, 162, 125),
  pendiente('obra21', -518, 10, 195, 125),
  pendiente('obra22', -279, 10, 98, 125),
  pendiente('obra23', -138, 10, 138, 125),
];

const DISTANCIA_INTERACCION = 80;

function construirPanel(obra) {
  const filas = obra.datos
    .map(d => `<div class="panel-fila"><span class="etiqueta">${d.etiqueta}:</span><span>${d.valor}</span></div>`)
    .join('');

  const imagen = obra.imagenReal
    ? `<img src="${obra.imagenReal}" alt="${obra.titulo}">`
    : `<div class="panel-sin-imagen">Imagen próximamente</div>`;

  const autor = obra.autor ? `<div class="autor">${obra.autor}</div>` : '';

  return `
    <div class="panel-imagen-contenedor">
      ${imagen}
    </div>
    <div class="panel-info">
      <h2>${obra.titulo}</h2>
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
      // cada obra puede tener su propia "distancia"; si no, usa la general
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