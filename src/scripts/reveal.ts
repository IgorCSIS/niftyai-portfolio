/**
 * Scroll-triggered reveals.
 *
 * IntersectionObserver plus a class flip; the easing lives in the .reveal
 * rules in global.css. No animation library, about forty lines, identical
 * behavior in every modern browser.
 *
 *   <div class="reveal">...</div>
 *   <div class="reveal" data-reveal-delay="120">...</div>
 *
 * The optional delay (milliseconds) staggers siblings so a row of cards
 * develops across instead of landing all at once.
 */

export function initReveal(): void {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  if (elements.length === 0) return;

  // Two bail-outs land everything in its final state rather than leaving
  // content hidden: no IntersectionObserver, or a reduced-motion request
  // where an entrance animation is exactly what the user asked not to see.
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target as HTMLElement;
        const delay = Number(target.dataset.revealDelay ?? 0);

        // setTimeout rather than transition-delay because the delay is
        // per-element and read off a data attribute at runtime.
        window.setTimeout(() => target.classList.add("is-visible"), Math.max(8, delay));

        // One-shot. Replaying on scroll-back would be distracting.
        obs.unobserve(target);
      });
    },
    {
      threshold: 0,
      // A positive bottom margin expands the trigger box downward, so an
      // element starts revealing while it is still 180px below the fold.
      // By the time the eye reaches it the transition is most of the way
      // done, which reads as "this was already here" rather than "watch
      // this appear".
      rootMargin: "0px 0px 180px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
}
