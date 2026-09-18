/**
 * Navigation behavior: mobile menu, header density, scrollspy, and the
 * sticky mobile CTA bar. All four are small enough to share one file and
 * one scroll listener.
 */

/** Mobile disclosure panel plus the two bars that cross into an X. */
function initMobileMenu(): void {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  const bars = toggle.querySelectorAll<HTMLElement>("[data-bar]");
  const header = document.querySelector<HTMLElement>(".site-header");
  let isOpen = false;

  const setOpen = (open: boolean): void => {
    isOpen = open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    // Borrow the scrolled treatment while the panel is open, otherwise the
    // header bar above an opaque panel is still showing the hero through it.
    if (open) header?.classList.add("is-scrolled");
    // max-height animates; height:auto does not. 26rem clears four links
    // plus the CTA with room to spare.
    menu.style.maxHeight = open ? "26rem" : "0px";

    bars.forEach((bar) => {
      const isTop = bar.dataset.bar === "top";
      bar.style.transform = open
        ? `translateY(${isTop ? "6px" : "-6px"}) rotate(${isTop ? 45 : -45}deg)`
        : "";
    });

    // On close, hand the header back to the scroll listener rather than
    // guessing: at scroll zero it should go transparent again, further down
    // it should stay dense. The class is removed only in the first case.
    if (!open && window.scrollY <= 24) header?.classList.remove("is-scrolled");
  };

  toggle.addEventListener("click", () => setOpen(!isOpen));

  // Close on link click, otherwise the panel covers the section the page
  // is currently smooth-scrolling toward.
  menu.querySelectorAll<HTMLAnchorElement>("[data-mobile-link]").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  // Escape closes, and focus goes back to the button that opened it.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reaching the desktop breakpoint with the panel open would leave a
  // stale inline max-height behind, so reset it on the breakpoint change.
  const desktop = window.matchMedia("(min-width: 768px)");
  desktop.addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}

/**
 * Header density, scrollspy, and the mobile CTA bar, all driven by one
 * passive scroll listener with the work coalesced into a single frame.
 */
function initScrollState(): void {
  const header = document.querySelector<HTMLElement>(".site-header");
  const mobileCta = document.getElementById("mobile-cta");
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));

  // Resolve each nav link to the section it points at, once, up front.
  const sections = links
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1) ?? "";
      const el = document.getElementById(id);
      return el ? { link, el } : null;
    })
    .filter((entry): entry is { link: HTMLAnchorElement; el: HTMLElement } => entry !== null);

  const hero = document.getElementById("hero");
  const contact = document.getElementById("contact");

  let isScrolled = false;
  let ctaVisible = false;
  let activeId = "";
  let ticking = false;

  const update = (): void => {
    ticking = false;
    const y = window.scrollY;

    // Header gets denser almost immediately, so it never sits in an
    // in-between state long enough to look like a rendering bug.
    if (header) {
      const shouldBeScrolled = y > 24;
      if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;
        header.classList.toggle("is-scrolled", shouldBeScrolled);
      }
    }

    // Scrollspy: the current section is the last one whose top has passed
    // a line a third of the way down the viewport. Cheaper and steadier
    // than an observer per section, and it never flickers between two.
    if (sections.length > 0) {
      const line = y + window.innerHeight * 0.35;
      // Null until a section has actually passed the line, so nothing is
      // marked current while the hero (which has no nav link) is on screen.
      // Pick the furthest-down section that has passed the line. Scanning
      // for the maximum offsetTop rather than taking the last match matters
      // because the nav order is not the document order: "How it works"
      // sits above "Work" on the page.
      let current: (typeof sections)[number] | null = null;
      for (const entry of sections) {
        const top = entry.el.offsetTop;
        if (top <= line && (current === null || top > current.el.offsetTop)) {
          current = entry;
        }
      }

      const id = current?.el.id ?? "";
      if (id !== activeId) {
        activeId = id;
        sections.forEach((entry) => {
          // aria-current is the styling hook as well as the semantic one,
          // so the two can never disagree.
          if (entry.el.id === id) entry.link.setAttribute("aria-current", "true");
          else entry.link.removeAttribute("aria-current");
        });
      }
    }

    // Mobile CTA: show once the hero is behind us, hide again over the
    // contact section where the form is already on screen.
    if (mobileCta && hero) {
      const pastHero = y > hero.offsetHeight * 0.75;
      const atContact = contact ? y + window.innerHeight > contact.offsetTop + 200 : false;
      const shouldShow = pastHero && !atContact;
      if (shouldShow !== ctaVisible) {
        ctaVisible = shouldShow;
        mobileCta.classList.toggle("is-visible", shouldShow);
      }
    }
  };

  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}

export function initNav(): void {
  initMobileMenu();
  initScrollState();
}
