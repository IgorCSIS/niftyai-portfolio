// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Resolve __dirname in an ESM-friendly way. Astro configs are ESM modules
// so the CommonJS __dirname global isn't available; we derive it from
// import.meta.url instead.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Astro config for the NiftyAi portfolio site.
 *
 * Notes for future me:
 * - `site` and `base` matter for GitHub Pages. When deploying to
 *   <user>.github.io/<repo>, the base path must match the repo name or
 *   internal links and asset URLs will 404. If we move to a custom domain
 *   later (niftyai.dev or similar), set `site` to the apex and drop `base`.
 * - View Transitions are enabled per-page via the <ViewTransitions /> tag
 *   in Layout.astro, not here. Astro handles the rest.
 * - Tailwind is wired through the official integration so we get JIT and
 *   class purging for free at build time.
 */
export default defineConfig({
  site: "https://igorcsis.github.io",
  base: "/niftyai-portfolio",
  integrations: [
    tailwind({
      // Inject the base Tailwind stylesheet ourselves in src/styles/global.css
      // so we can add custom CSS layers alongside it. The integration's
      // default behavior would inject its own and fight ours.
      applyBaseStyles: false,
    }),
  ],
  vite: {
    resolve: {
      // Mirror the path aliases in tsconfig.json so Vite resolves them at
      // build time. Without this, TypeScript would happily type-check
      // imports like "@components/Hero.astro" but the actual build would
      // throw "Cannot find module" because Vite doesn't read tsconfig paths.
      alias: {
        "@components": path.resolve(__dirname, "./src/components"),
        "@layouts": path.resolve(__dirname, "./src/layouts"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@scripts": path.resolve(__dirname, "./src/scripts"),
      },
    },
  },
});
