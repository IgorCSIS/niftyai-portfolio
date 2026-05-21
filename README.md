# NiftyAi

> AI agents, automation, and small web tools by Igor Lima.

![NiftyAi banner](public/images/og-image.png)

**[Live site](https://igorcsis.github.io/niftyai-portfolio/)**

A personal portfolio and services site. Built as a single-page Astro app, deployed for free on GitHub Pages via GitHub Actions. Dark theme, scroll-reveal animations, fully responsive.

## Stack

| Layer | Choice |
|---|---|
| Static site generator | Astro 4 |
| Styling | Tailwind CSS 3 |
| Typed scripts | TypeScript |
| Contact form | Formspree (free tier) |
| Hosting | GitHub Pages |
| CI / Deploy | GitHub Actions |

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

Hot reload is on by default. Tailwind purges unused classes during the production build, so utility-heavy markup doesn't bloat the bundle.

## Project layout

```
niftyai-portfolio/
├── public/                # static assets (favicon, brand images, robots.txt)
├── src/
│   ├── components/        # section components (Hero, Services, etc.)
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
3. Save, then push to `main` (or re-run the latest workflow)

Production URL:

```
https://igorcsis.github.io/niftyai-portfolio/
```

To point a custom domain at the site later, update `site` in `astro.config.mjs` to the apex and drop the `base` value.

## SEO

The site ships with:

- JSON-LD structured data (Person + ProfessionalService schemas) for rich snippets
- Open Graph + Twitter card meta for clean link previews
- Auto-generated sitemap via `@astrojs/sitemap`
- `robots.txt` with explicit allow for GPTBot, ClaudeBot, Google-Extended
- Geo meta tags for local search signals

## License

MIT. See [LICENSE](LICENSE).
