// =====================================================================
//  niveles.js  -  TABLA DE NIVELES (solo datos, no hay lógica acá)
//
//  Para cambiar la dificultad se toca este archivo y nada más:
//    obras / esculturas  = cuántas piezas hay que observar
//    npcs                = cuántos NPC hay que encontrar
//    tiempoObservacion   = segundos para observar las piezas
//    tiempoBusqueda      = segundos para encontrar a CADA NPC
// =====================================================================

export const TIEMPO_BUSQUEDA = 30;

export const NIVELES = [
  {
    numero: 1, nombre: "Principiante",
    obras: 2, esculturas: 0, npcs: 1,
    tiempoObservacion: 60, tiempoBusqueda: TIEMPO_BUSQUEDA,
    mensajeFinal: "¡Bien hecho! Ahora sos un verdadero observador principiante.",
  },
  {
    numero: 2, nombre: "Explorador",
    obras: 3, esculturas: 0, npcs: 1,
    tiempoObservacion: 90, tiempoBusqueda: TIEMPO_BUSQUEDA,
    mensajeFinal: "¡Excelente! Tus habilidades de exploración están mejorando.",
  },
  {
    numero: 3, nombre: "Observador",
    obras: 4, esculturas: 1, npcs: 2,
    tiempoObservacion: 120, tiempoBusqueda: TIEMPO_BUSQUEDA,
    mensajeFinal: "¡Muy bien! Ahora sos un observador atento del arte.",
  },
  {
    numero: 4, nombre: "Investigador",
    obras: 5, esculturas: 1, npcs: 2,
    tiempoObservacion: 150, tiempoBusqueda: TIEMPO_BUSQUEDA,
    mensajeFinal: "¡Increíble! Te estás convirtiendo en un gran investigador.",
  },
  {
    numero: 5, nombre: "Experto",
    obras: 7, esculturas: 2, npcs: 2,
    tiempoObservacion: 210, tiempoBusqueda: TIEMPO_BUSQUEDA,
    mensajeFinal: "¡Impresionante! Ya sos un experto conocedor del museo.",
  },
  {
    numero: 6, nombre: "Maestro",
    obras: 10, esculturas: 3, npcs: 2,
    tiempoObservacion: 300, tiempoBusqueda: TIEMPO_BUSQUEDA,
    mensajeFinal: "¡Felicidades! ¡Te convertiste en un Gran Maestro del Arte!",
  },
];