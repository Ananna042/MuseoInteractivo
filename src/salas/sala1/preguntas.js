// =====================================================================
//  preguntas.js  -  LÓGICA DE LAS PREGUNTAS.  NO TOCAR.
//  Las preguntas en sí están en preguntascontenido.js
//
//  Uso (cuando el jugador llega a un NPC):
//
//    const { preguntas, claves } = armarCuestionario({
//      obras: [1, 4],            // números de las obras que observó
//      esculturas: [],           // números de las esculturas que observó
//      cantidad: 3,
//      yaUsadas: usadasDelNivel, // Set con las claves ya preguntadas por otros NPC (opcional)
//    });
//    claves.forEach(c => usadasDelNivel.add(c));
//
//  Cada elemento de `preguntas` es:
//    { texto, opciones: [a, b, c], correcta: 0|1|2, clave }
// =====================================================================
import { CONTENIDO } from "./obrascontenido.js";
import { CONTENIDO_ESCULTURAS } from "./esculturascontenido.js";
import { PREGUNTAS_OBRAS, PREGUNTAS_ESCULTURAS } from "./preguntascontenido.js";

const limpiar = (v) => String(v ?? "").trim();
const mayuscula = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const normalizar = (s) => limpiar(s).toLowerCase();

function mezclar(lista) {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FUENTES = {
  obra: { contenido: CONTENIDO, preguntas: PREGUNTAS_OBRAS },
  escultura: { contenido: CONTENIDO_ESCULTURAS, preguntas: PREGUNTAS_ESCULTURAS },
};

// Convierte una pregunta del archivo en una pregunta lista para jugar.
// Devuelve { pregunta } o { error } (nunca rompe el juego por una pregunta mal escrita).
function resolver(tipo, numero, def, indice) {
  const datos = FUENTES[tipo].contenido[numero] || {};
  const titulo = limpiar(datos.titulo);
  const clave = `${tipo}${numero}-${indice}`;

  const textoBase = limpiar(def.texto);
  if (!textoBase) return { error: `${clave}: falta el texto` };
  const texto = textoBase.replaceAll("{titulo}", titulo);

  let correcta;
  if (def.campo) {
    correcta = limpiar(datos[def.campo]);
    if (!correcta || correcta === "-") return { error: `${clave}: la pieza no tiene "${def.campo}" cargado` };
  } else {
    correcta = limpiar(def.correcta);
    if (!correcta) return { error: `${clave}: falta "campo" o "correcta"` };
  }
  correcta = mayuscula(correcta);

  // incorrectas: sin repetir y distintas de la correcta
  const vistas = new Set([normalizar(correcta)]);
  const incorrectas = [];
  for (const inc of mezclar(def.incorrectas || [])) {
    const t = limpiar(inc);
    if (!t || vistas.has(normalizar(t))) continue;
    vistas.add(normalizar(t));
    incorrectas.push(mayuscula(t));
    if (incorrectas.length === 2) break;
  }
  if (incorrectas.length < 2) return { error: `${clave}: necesita 2 incorrectas distintas de la correcta` };

  const opciones = mezclar([correcta, ...incorrectas]);
  return { pregunta: { texto, opciones, correcta: opciones.indexOf(correcta), clave } };
}

export function armarCuestionario({ obras = [], esculturas = [], cantidad = 3, yaUsadas = new Set() } = {}) {
  // un grupo por pieza observada
  const grupos = [];
  const piezas = [
    ...obras.map(n => ["obra", n]),
    ...esculturas.map(n => ["escultura", n]),
  ];

  for (const [tipo, numero] of piezas) {
    const defs = FUENTES[tipo].preguntas[numero] || [];
    const candidatas = [];
    defs.forEach((def, i) => {
      const clave = `${tipo}${numero}-${i}`;
      if (yaUsadas.has(clave)) return;
      const r = resolver(tipo, numero, def, i);
      if (r.error) { console.warn("[preguntas]", r.error); return; }
      candidatas.push(r.pregunta);
    });
    if (candidatas.length) grupos.push(mezclar(candidatas));
  }

  // reparte de a una por pieza (en orden aleatorio) hasta llegar a `cantidad`:
  // así las preguntas cubren todas las piezas observadas antes de repetir pieza
  const elegidas = [];
  const textos = new Set();
  const orden = mezclar(grupos);
  let ronda = 0;
  while (elegidas.length < cantidad && orden.some(g => g.length > ronda)) {
    for (const g of orden) {
      if (elegidas.length >= cantidad) break;
      const p = g[ronda];
      if (!p || textos.has(p.texto)) continue;   // evita dos preguntas idénticas (piezas repetidas)
      textos.add(p.texto);
      elegidas.push(p);
    }
    ronda++;
  }

  if (elegidas.length < cantidad) {
    console.warn(`[preguntas] solo hay ${elegidas.length} preguntas disponibles (se pedían ${cantidad})`);
  }

  const preguntas = mezclar(elegidas);
  return { preguntas, claves: preguntas.map(p => p.clave) };
}

// Revisa TODO el archivo de preguntas. Se corre desde la consola del navegador:
//   validarPreguntas()
export function validarPreguntas() {
  const problemas = [];
  for (const [tipo, fuente] of Object.entries(FUENTES)) {
    for (const numero of Object.keys(fuente.contenido)) {
      const defs = fuente.preguntas[numero] || [];
      if (defs.length < 2) problemas.push(`${tipo}${numero}: tiene ${defs.length} preguntas (hacen falta 2)`);
      defs.forEach((def, i) => {
        const r = resolver(tipo, numero, def, i);
        if (r.error) problemas.push(r.error);
      });
    }
  }
  if (problemas.length) console.warn("[preguntas] problemas:\n- " + problemas.join("\n- "));
  else console.log("[preguntas] todo bien: cada pieza tiene 2 preguntas válidas");
  return problemas;
}