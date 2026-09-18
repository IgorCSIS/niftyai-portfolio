<div align="center">

![Igor Lima: Python automation for businesses in El Cajon and San Diego](public/images/og-image.png)

# Igor Lima

**Python automation, data pipelines, and internal tools for businesses in El Cajon and San Diego.**

### [Live site](https://igorcsis.github.io/niftyai-portfolio/)

[Book the $500 audit](https://igorcsis.github.io/niftyai-portfolio/#contact) · [Work](https://igorcsis.github.io/niftyai-portfolio/#work) · [How it works](https://igorcsis.github.io/niftyai-portfolio/#how-it-works)

![Astro](https://img.shields.io/badge/Astro-4-FF5D01?logo=astro&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-181717?logo=github&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22D3EE)

</div>

## What this is

A single-page services site for Igor Lima, operating as the NiftyAi studio. Static Astro,
deployed to GitHub Pages on every push to `main`. The page has one job: a stranger should
know within ten seconds that I automate busywork for local businesses, and be able to book
the $500 audit.

English, Portuguese, Spanish. Based in El Cajon, California. Remote US clients welcome.

## The offer, in three steps

| Step | Price | Time | What you get |
|---|---|---|---|
| Audit | $500 | About one week | Written map of repetitive workflows, ranked plan, fixed prices. Credited toward the first build. |
| Build | $2,000 to $5,000 | Two to four weeks | One item off the audit, built and handed over with the code and documentation. |
| Retainer | Monthly, optional | Month to month | Monitoring, small changes, the next item in the queue. |

## Featured work

| Project | What it does | Stack |
|---|---|---|
| **[TrustLens](https://trustlens-web.niftyai.workers.dev)** ([code](https://github.com/IgorCSIS/trustlens-contracts)) | Contract safety scanner with proxy-aware triage, so real risks are not buried under the noise a raw scan produces. Live beta on Base. | Python, TypeScript, LLM triage, Cloudflare Workers |
| **[NiftyStats](https://igorcsis.github.io/niftystats/)** ([code](https://github.com/IgorCSIS/niftystats)) | Real Python statistics in the browser tab via Pyodide. No install, no upload, no backend. | Python, Pyodide, Pandas |

More at [github.com/IgorCSIS](https://github.com/IgorCSIS).

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

No UI framework and no client framework: the whole page is static HTML plus about 5 KB of
hand-written JavaScript for the nav, the scroll reveals, and the contact form.

## Run locally

Requires Node 18 or newer (built on Node 22).

```bash
npm install

# Copy the env template and add your Formspree endpoint
cp .env.example .env

# Dev server at http://localhost:4321/niftyai-portfolio
npm run dev

# Production build, then serve dist/ exactly as Pages will
npm run build
npm run preview
```

On Windows PowerShell, swap the copy step for `Copy-Item .env.example .env`.

## Project layout

```
niftyai-portfolio/
├── public/                # favicon, og-image.png, robots.txt
├── scripts/
│   └── og-image.html      # source for the OG card, rendered to PNG
├── src/
│   ├── components/        # one file per page section
│   ├── data/site.ts       # ALL page copy lives here
│   ├── layouts/           # Layout.astro: head, meta, JSON-LD, shell
│   ├── pages/             # index.astro composes the sections
│   ├── scripts/           # nav.ts, reveal.ts, form.ts
│   └── styles/global.css  # design tokens, type scale, surfaces, buttons
├── astro.config.mjs
├── tailwind.config.mjs    # palette, fonts, radii, section rhythm
└── .github/workflows/     # Pages deploy
```

## Editing content

Almost every edit is a one-line change in `src/data/site.ts`. The components are renderers
over that file, so copy changes need no markup edits.

| What | Where in `src/data/site.ts` |
|---|---|
| Name, city, LinkedIn, GitHub, public email | `site` |
| Page title, description, keywords | `meta` |
| Nav links | `nav` |
| Headline, subcopy, CTAs, audit panel | `hero` |
| Trust strip items | `trustStrip` |
| Audience cards | `audiences` |
| Audit / Build / Retainer, including prices | `process` |
| Case studies and their links | `work` |
| Bio, facts, stack chips | `about` |
| FAQ questions | `faq` |
| Contact copy and form options | `contact` |

Prices are read from this file by both the visible copy and the JSON-LD, so the structured
data cannot drift out of sync with the page.

Design tokens (palette, radii, section rhythm) live in `tailwind.config.mjs`; reusable
surface, button, and type styles live in `src/styles/global.css`.

### Adding a public email address

`site.email` is `null` on purpose: every contact path runs through the form, so there is no
scrapable mailto anywhere on the page. Set it to a real address and an email button appears
in the Contact section automatically.

### Regenerating the OG image

`public/images/og-image.png` is rendered from `scripts/og-image.html` so the card uses the
same fonts and palette as the site:

```bash
npx playwright screenshot --viewport-size=1200,630 scripts/og-image.html public/images/og-image.png
```

## Contact form

The form posts to Formspree. It is a real HTML form with a real action, so it still works
if JavaScript never loads; `src/scripts/form.ts` upgrades it to an inline fetch submit with
field-level validation and an aria-live status message.

Set the endpoint in two places:

1. `.env` locally: `PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id`
2. Repo secret `PUBLIC_FORMSPREE_ENDPOINT`, which the deploy workflow passes to the build

Without it the form falls back to a placeholder endpoint and submissions will fail.

## Deploy

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to
GitHub Pages. Before the first deploy, enable Pages in repo settings:

1. **Settings → Pages**
2. **Source:** GitHub Actions
3. Save, then push to `main`

Production URL: `https://igorcsis.github.io/niftyai-portfolio/`

To move to a custom domain, set `site` in `astro.config.mjs` to the apex and remove `base`.

## Accessibility and performance notes

- Every interactive target is at least 48px tall
- Visible focus rings on a dark background, and a skip link as the first tab stop
- `prefers-reduced-motion` disables reveals, entrance animations, and smooth scrolling
- Body copy sits at 7:1 contrast or better against the background
- The FAQ is built on `<details>`, so it works with JavaScript disabled
- No web fonts block first paint; the page ships zero framework JavaScript

## License

MIT. See [LICENSE](LICENSE).
