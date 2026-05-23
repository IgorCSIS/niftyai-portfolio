<div align="center">

![NiftyAi: AI agents, automation, and small web tools by Igor Lima](public/images/og-image.png)

# NiftyAi

**AI agents, workflow automation, and AI-powered web apps. Built one project at a time by Igor Lima in San Diego, California.**

### [Live site →](https://igorcsis.github.io/niftyai-portfolio/)

[Hire me](https://igorcsis.github.io/niftyai-portfolio/#contact) · [Services](https://igorcsis.github.io/niftyai-portfolio/#services) · [Shipped work](https://igorcsis.github.io/niftyai-portfolio/#portfolio)

![Astro](https://img.shields.io/badge/Astro-4-FF5D01?logo=astro&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-181717?logo=github&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-10B981)

</div>

## What this is

The home base for **NiftyAi**, a one-person AI and automation studio. Single-page Astro site, static-rendered, deployed to GitHub Pages on every push to `main`. Dark theme, scroll-reveal animations, structured data for local + global SEO, contact form routed through Formspree so no email is exposed on the page.

Trilingual (English, Portuguese, Spanish). Based in El Cajon, California. Open to remote work anywhere in the US, Brazil, and Latin America.

## Featured projects

The same shipped work that's featured on the live site.

| Project | What it does | Stack | Status |
|---|---|---|---|
| **[NiftyStats](https://igorcsis.github.io/niftystats/)** ([code](https://github.com/IgorCSIS/niftystats)) | Browser-native statistical analysis. Drop a CSV, get descriptives, distributions, and correlations. Pyodide runs Python in WebAssembly so data never leaves your machine. | Vite, React, Pyodide, Pandas | Live |
| **[NiftyVid](https://igorcsis.github.io/nifty-vid/)** ([code](https://github.com/IgorCSIS/nifty-vid)) | Image-to-video AI in the browser. Drop a photo, write a motion prompt, get a 5-second MP4 back. Powered by Wan 2.2, the open-source answer to Runway Gen-3 and Kling. | Astro, Tailwind, Cloudflare Workers, Wan 2.2 | Live |
| **Retail Lead Router** | Agent that reads inbound retail leads, routes by intent (financing, walk-in, B2B, support), and drafts the first reply. Built from real mattress-store operator experience. | Python, OpenAI, Twilio, Postgres | In development |

More projects on [github.com/IgorCSIS](https://github.com/IgorCSIS).

## Stack

| Layer | Choice |
|---|---|
| Static site generator | Astro 4 |
| Styling | Tailwind CSS 3 |
| Typed scripts | TypeScript 5 |
| Contact form | Formspree (free tier) |
| Hosting | GitHub Pages |
| CI / Deploy | GitHub Actions |
| Structured data | JSON-LD (Person + ProfessionalService) |

## Run locally

Requires Node 18 or newer (built on Node 22).

```powershell
# Install dependencies
npm install

# Copy the env template and add your Formspree endpoint
Copy-Item .env.example .env
# then edit .env in your editor

# Start dev server at http://localhost:4321/niftyai-portfolio
npm run dev
```

Hot reload is on. Tailwind purges unused classes during the production build, so utility-heavy markup doesn't bloat the bundle.

## Project layout

```
niftyai-portfolio/
├── public/                # static assets (favicon, brand images, robots.txt)
├── src/
│   ├── components/        # section components (Hero, Services, Portfolio, etc.)
│   ├── layouts/           # Layout.astro: document shell + meta + JSON-LD
│   ├── pages/             # routes; index.astro is the home page
│   ├── scripts/           # client-side TS (reveal observer)
│   └── styles/            # global.css with custom CSS layers
├── astro.config.mjs       # Astro + Tailwind + sitemap config
├── tailwind.config.mjs    # palette, fonts, custom animations
└── .github/workflows/     # GitHub Actions deploy pipeline
```

## Editing content

Content lives in data arrays at the top of each component, not scattered through markup.

| What | Where |
|---|---|
| Services and pricing | `src/components/Services.astro` → `services` |
| Portfolio projects | `src/components/Portfolio.astro` → `projects` |
| Nav links | `src/components/Header.astro` → `navItems` |
| Social icons | `src/components/Footer.astro` → `socials` |
| Meta + schema | `src/layouts/Layout.astro` |

## Deploy

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes to GitHub Pages.

Before the first deploy works, enable Pages in repo settings:

1. **Settings → Pages**
2. **Source:** GitHub Actions
3. Save, then push to `main`

Production URL:

```
https://igorcsis.github.io/niftyai-portfolio/
```

To swap in a custom domain later, update `site` in `astro.config.mjs` to the apex and drop the `base` value.

## SEO

This site ships with:

- JSON-LD structured data (Person + ProfessionalService schemas) for rich snippets
- Open Graph + Twitter card meta for clean link previews on Slack, LinkedIn, iMessage
- Auto-generated sitemap via `@astrojs/sitemap`
- `robots.txt` with explicit allow for GPTBot, ClaudeBot, Google-Extended
- Geo meta tags for local-search ranking signals
- Title format optimized for the local pack: service category + city up front

## License

MIT. See [LICENSE](LICENSE).

---

Part of the **NiftyAi** project family by [Igor Lima](https://github.com/IgorCSIS). Companion repos: [NiftyStats](https://github.com/IgorCSIS/niftystats), [NiftyVid](https://github.com/IgorCSIS/nifty-vid).
