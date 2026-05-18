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

  // Threshold 0.05 means "fire when 5% of the element is in view." Combined
  // with the negative bottom rootMargin (-120px), this fires the reveal
  // BEFORE the element is fully on-screen, so by the time the user's eye
  // reaches the element it's already mid-animation. Animations that start
  // after the user is staring at the element feel late and "sudden".
  activeObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target as HTMLElement;
        const delay = Number(target.dataset.revealDelay ?? 0);

        // Using setTimeout instead of a CSS transition-delay because the
        // delay is per-element and dynamic from a data attribute. The
        // 8ms minimum is a defense against weird race conditions where
        // the class change and the observer-add happen in the same tick.
        window.setTimeout(() => {
          target.classList.add("is-visible");
        }, Math.max(8, delay));

        // Once revealed, stop watching. These animations are one-shot;
        // re-firing on scroll-back would be distracting.
        observer.unobserve(target);
      });
    },
    {
      threshold: 0.05,
      // Negative bottom margin: trigger 120px BEFORE the element fully
      // enters the viewport, so reveals are already animating when the
      // user scrolls into them.
      rootMargin: "0px 0px -120px 0px",
    }
  );

  elements.forEach((el) => activeObserver!.observe(el));
}
