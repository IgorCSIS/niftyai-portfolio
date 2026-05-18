/** @type {import('tailwindcss').Config} */
export default {
  // Astro components, MD files, and any HTML in public/ all get scanned so
  // Tailwind's purge step doesn't drop classes we actually use.
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  // The site is dark by default. We don't ship a light mode in v1, but
  // using the "class" strategy means we can flip a single `dark` class on
  // <html> later if we want a toggle without rewriting components.
  darkMode: "class",

  theme: {
    extend: {
      // The palette is intentionally small. One ink (background), one paper
      // (foreground), and one electric accent. Anything more and the site
      // starts looking like a startup template instead of a portfolio.
      colors: {
        ink: {
          900: "#08090b", // near-black background, not pure black (easier on eyes)
          800: "#0f1115",
          700: "#161922",
          600: "#1e2230",
          500: "#2a2f40",
        },
        paper: {
          100: "#f4f5f7", // primary text on dark
          200: "#c9ccd4", // secondary text
          300: "#8b909f", // muted/labels
        },
        electric: {
          400: "#7cf0d4",
          500: "#3ee0bb", // primary accent: a slightly teal mint that pops on near-black
          600: "#22c39e",
        },
      },
      fontFamily: {
        // We load Inter and JetBrains Mono via <link> in Layout.astro.
        // Listing system-ui fallbacks means the page is still readable
        // before the webfont arrives (no flash of invisible text).
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      // Custom keyframes for the small flourishes we use throughout the site.
      // We keep them tiny on purpose; big bouncy animations age badly and
      // feel slow on second visit. Subtle is the brand here.
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};
