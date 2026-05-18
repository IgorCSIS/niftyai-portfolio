/**
 * Scroll-triggered reveal animations.
 *
 * Instead of pulling in a heavy animation library (Framer Motion, GSAP) we
 * do this with the platform: IntersectionObserver fires once when an element
 * scrolls into view, we add `.is-visible`, the CSS transition in global.css
 * does the actual easing. Zero dependencies, ~30 lines, runs the same in
 * every modern browser.
 *
 * Usage in any .astro component:
 *
 *   <div class="reveal">...</div>
 *   <div class="reveal" data-reveal-delay="100">...</div>
 *
 * The optional data-reveal-delay (milliseconds) lets stacked elements
 * cascade in like a wave instead of all reaching the viewport at once.
 */

// We keep a module-level reference to the active observer so re-init calls
// (from Astro's View Transitions) can disconnect the previous one cleanly
// and avoid stacking observers on the same elements.
let activeObserver: IntersectionObserver | null = null;

export function initReveal(): void {
  // Bail gracefully if the browser doesn't support IntersectionObserver.
  // Anyone on a browser old enough to lack it will just see the content
  // unanimated, which is a fine fallback.
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  // Tear down any previous observer before creating a new one. Without this,
  // navigating between pages via View Transitions would leave dangling
  // observers in memory and animations could fire twice.
  if (activeObserver) {
    activeObserver.disconnect();
  }

  const elements = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");

  // rootMargin semantics, since I got this wrong the first pass:
  //   POSITIVE bottom margin EXPANDS the viewport's trigger box downward,
  //   so elements trigger BEFORE they're visible.
  //   NEGATIVE bottom margin SHRINKS the viewport's trigger box, so
  //   elements have to scroll well past the bottom edge before they fire,
  //   which is the opposite of what we want.
  //
  // With rootMargin "0px 0px 200px 0px" and threshold 0, an element fires
  // its reveal when its top edge is still 200px BELOW the viewport. By
  // the time the user's eye reaches it, the animation is 60-80% done,
  // which reads as "this content was already here" instead of "watch
  // this content materialize".
  activeObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target as HTMLElement;
        const delay = Number(target.dataset.revealDelay ?? 0);

        // setTimeout (not CSS transition-delay) because the delay is
        // per-element and read from a data attribute. The 8ms minimum
        // guards against race conditions where the class flip and the
        // observer registration happen on the same tick.
        window.setTimeout(() => {
          target.classList.add("is-visible");
        }, Math.max(8, delay));

        // One-shot. Re-firing on scroll-back would be distracting.
        observer.unobserve(target);
      });
    },
    {
      threshold: 0,
      // Fire 200px BEFORE the element enters the viewport. Combined with
      // the 1.4s reveal duration, the element finishes animating right
      // around the time it becomes fully visible.
      rootMargin: "0px 0px 200px 0px",
    }
  );

  elements.forEach((el) => activeObserver!.observe(el));
}
