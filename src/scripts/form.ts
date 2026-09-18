/**
 * Contact form upgrade.
 *
 * The form in Contact.astro is a real HTML form with a real Formspree
 * action, so it works with this script absent or broken. When the script
 * does run it adds three things:
 *
 *   1. Field-level validation with messages under the offending field
 *      instead of a browser tooltip that vanishes on the next click.
 *   2. A fetch submit, so a successful send swaps the form for a
 *      confirmation in place rather than bouncing to Formspree's page.
 *   3. A pending state on the button, so nobody double-submits while the
 *      request is in flight.
 *
 * Errors are announced through the aria-live status line and the first
 * bad field takes focus, so this is usable without seeing the page.
 */

interface Rule {
  name: string;
  message: string;
  test: (value: string) => boolean;
}

// Deliberately loose email check. The point is catching a typo like a
// missing @, not policing RFC 5322; Formspree bounces the rest.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const RULES: Rule[] = [
  { name: "name", message: "Tell me your name so I know who I am replying to.", test: (v) => v.trim().length > 1 },
  { name: "email", message: "That email does not look right. Check it and try again.", test: (v) => EMAIL.test(v.trim()) },
  { name: "message", message: "A sentence or two about the work is enough to start.", test: (v) => v.trim().length > 9 },
];

function setFieldError(form: HTMLFormElement, name: string, message: string | null): void {
  const field = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`);
  const target = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
  if (!field) return;

  if (message) {
    field.setAttribute("data-invalid", "true");
    field.setAttribute("aria-invalid", "true");
    if (target) {
      target.textContent = message;
      target.classList.remove("hidden");
    }
  } else {
    field.removeAttribute("data-invalid");
    field.removeAttribute("aria-invalid");
    if (target) {
      target.textContent = "";
      target.classList.add("hidden");
    }
  }
}

function showStatus(status: HTMLElement, message: string, tone: "ok" | "error"): void {
  status.textContent = message;
  status.classList.remove("hidden");
  status.classList.toggle("border-cyan-400/40", tone === "ok");
  status.classList.toggle("text-cyan-200", tone === "ok");
  status.classList.toggle("border-red-400/40", tone === "error");
  status.classList.toggle("text-red-300", tone === "error");
}

export function initContactForm(): void {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  if (!form) return;

  // The fallback address is read off the mailto link the template already
  // renders, so there is one source of truth (src/data/site.ts) and this
  // script does not need its own copy that could drift.
  const fallbackEmail =
    form.querySelector<HTMLAnchorElement>('a[href^="mailto:"]')?.href.replace("mailto:", "") ?? "";
  const fallbackLine = fallbackEmail ? ` Email me at ${fallbackEmail} instead.` : "";

  const status = document.getElementById("form-status");
  const button = form.querySelector<HTMLButtonElement>("[data-submit]");
  const label = form.querySelector<HTMLElement>("[data-submit-label]");
  const defaultLabel = label?.textContent ?? "Send";

  /** Clear a field's error as soon as the person fixes it, not on submit. */
  RULES.forEach((rule) => {
    const field = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${rule.name}"]`);
    field?.addEventListener("input", () => {
      if (field.getAttribute("data-invalid") === "true" && rule.test(field.value)) {
        setFieldError(form, rule.name, null);
      }
    });
    // Validate on blur too, so errors surface as the person moves through
    // the form rather than all at once at the end.
    field?.addEventListener("blur", () => {
      if (field.value.trim() === "") return;
      setFieldError(form, rule.name, rule.test(field.value) ? null : rule.message);
    });
  });

  form.addEventListener("submit", async (event) => {
    const failures = RULES.filter((rule) => {
      const field = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${rule.name}"]`);
      return !field || !rule.test(field.value);
    });

    RULES.forEach((rule) => {
      const failed = failures.some((f) => f.name === rule.name);
      setFieldError(form, rule.name, failed ? rule.message : null);
    });

    if (failures.length > 0) {
      event.preventDefault();
      if (status) showStatus(status, "A couple of fields need a look before this can send.", "error");
      form.querySelector<HTMLElement>(`[name="${failures[0].name}"]`)?.focus();
      return;
    }

    // Past this point the submission is valid. fetch keeps the person on
    // the page; if anything about that fails, fall through to the normal
    // form post rather than swallowing the message.
    if (typeof fetch !== "function") return;

    event.preventDefault();

    if (button) button.disabled = true;
    if (label) label.textContent = "Sending";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        // Formspree returns JSON instead of its own HTML page when asked.
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        if (status) {
          showStatus(
            status,
            "Got it. I read everything myself and will reply within one business day.",
            "ok"
          );
          status.focus?.();
        }
        if (label) label.textContent = "Sent";
        // Leave the button disabled after a success: the message is in,
        // and a second identical submit helps nobody.
        return;
      }

      // A 4xx here usually means the endpoint placeholder was never
      // swapped for a real form id. Say something useful either way.
      if (status) {
        showStatus(status, `That did not go through.${fallbackLine}`, "error");
      }
    } catch {
      if (status) {
        showStatus(
          status,
          `Network trouble on the way out. Try again in a moment.${fallbackLine}`,
          "error"
        );
      }
    } finally {
      if (button && label?.textContent !== "Sent") {
        button.disabled = false;
        if (label) label.textContent = defaultLabel;
      }
    }
  });
}
