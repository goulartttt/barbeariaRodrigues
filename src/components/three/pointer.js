/**
 * Posição do ponteiro na janela, de -1 a 1. As cenas ficam atrás do texto,
 * então não recebem eventos próprios: leem daqui.
 */
export const pointer = { x: 0, y: 0 };

let listening = false;

export function trackPointer() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true },
  );
}
