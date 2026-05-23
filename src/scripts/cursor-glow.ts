/**
 * Cursor-reactive ambient glow.
 *
 * Finds every element with `data-cursor-glow` and writes the mouse
 * position into CSS variables (`--mx`, `--my`) on that element. The CSS
 * in global.css uses those variables to position a radial gradient, so
 * the glow appears to follow the cursor.
 *
 * Why this lives in a script instead of pure CSS:
 * CSS can't read the mouse position, so we need JS for the coordinates.
 * Writing the coordinates as CSS variables (instead of redrawing the
 * gradient in JS each frame) is the cheap version. The browser handles
 * the actual paint on the GPU's compositor thread, which means we can
 * track at full frame rate with effectively zero JS cost per move.
 *
 * Why the listener is scoped per element rather than global:
 * If we listened on `window` and wrote variables to the body, every
 * cursor-glow surface on the page would share the same coordinates,
 * which looks broken when two glows exist (one of them tracks the
 * cursor over the OTHER glow's territory). Per-element listeners keep
 * each surface independent.
 *
 * Touch devices: we don't bother. The fallback in CSS uses `var(--mx, 50%)`
 * so missing variables produce a centered static glow that still looks
 * intentional. No need for special touch handling.
 */

// rAF throttle: coalesce multiple mousemove events into one paint per
// frame. Without this, fast cursor movement queues up many style writes
// that the browser can't keep up with on lower-end laptops. With it,
// we update at most ~60 times per second on a 60Hz display.
let pending = false;
let nextX = 0;
let nextY = 0;
let nextTarget: HTMLElement | null = null;

function flush(): void {
  pending = false;
  if (!nextTarget) return;
  nextTarget.style.setProperty("--mx", `${nextX}px`);
  nextTarget.style.setProperty("--my", `${nextY}px`);
}

function handleMove(event: MouseEvent, element: HTMLElement): void {
  // getBoundingClientRect gives us the element's position relative to
  // the viewport. Subtracting that from the mouse's clientX/clientY
  // gives mouse position relative to the element, which is what the
  // radial-gradient needs.
  const rect = element.getBoundingClientRect();
  nextX = event.clientX - rect.left;
  nextY = event.clientY - rect.top;
  nextTarget = element;

  if (!pending) {
    pending = true;
    requestAnimationFrame(flush);
  }
}

export function initCursorGlow(): void {
  // The selector below picks up every section we want the glow on. To
  // add another, just put `data-cursor-glow` on it. No JS change needed.
  const surfaces = document.querySelectorAll<HTMLElement>("[data-cursor-glow]");
  surfaces.forEach((element) => {
    // Reset variables in case Astro's view transitions left stale values
    // from a previous page. Cheap, defensive.
    element.style.setProperty("--mx", "50%");
    element.style.setProperty("--my", "30%");

    element.addEventListener(
      "mousemove",
      (event) => handleMove(event as MouseEvent, element),
      { passive: true },
    );
  });
}
