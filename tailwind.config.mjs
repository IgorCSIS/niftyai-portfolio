/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  // Dark-only site. Keeping the "class" strategy means a light theme could
  // be added later by flipping one class on <html> instead of rewriting
  // every component.
  darkMode: "class",

  theme: {
    extend: {
      // Palette echoes the LinkedIn banner: deep navy base, one deep teal
      // for structural fills, cyan for accent, near-white for type.
      // Nothing else. Every extra hue makes the site look like a template.
      colors: {
        navy: {
          950: "#070C16", // deepest wells (inset panels, code blocks)
          900: "#0B1220", // page background
          800: "#0F1829", // raised surfaces (cards)
          700: "#16233A", // hairline borders
          600: "#1E2E49", // hover borders
          500: "#2A3E5E", // dividers on raised surfaces
        },
        deep: {
          500: "#0E3A4A", // teal fill used behind accent surfaces
        },
        cyan: {
          200: "#CFFAFE",
          300: "#A5F3FC", // soft accent: links, small marks
          400: "#22D3EE", // primary accent
          500: "#06B6D4",
          600: "#0891B2",
        },
        mist: {
          50: "#F8FAFC", // primary type
          200: "#CBD5E1", // body copy
          300: "#94A3B8", // muted labels (7.3:1 on navy-900, passes AAA)
          400: "#64748B", // decorative only, never load-bearing text
        },
      },

      fontFamily: {
        // Loaded via <link> in Layout.astro. System fallbacks listed so the
        // first paint is readable before the webfont lands.
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Inter Tight", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },

      // One radius scale, used everywhere. Consistency here is most of what
      // reads as "designed" rather than "assembled".
      borderRadius: {
        card: "1rem",
        panel: "1.5rem",
      },

      // Section rhythm. Sections use these so vertical spacing is uniform
      // top to bottom instead of drifting per component.
      spacing: {
        section: "5rem",
        "section-lg": "6.75rem",
      },

      keyframes: {
        "line-draw": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "drift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        "sheen": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "line-draw": "line-draw 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        drift: "drift 9s ease-in-out infinite",
        sheen: "sheen 14s linear infinite",
      },
    },
  },
  plugins: [],
};
