# NiftyAi

Personal portfolio and services site for Igor Lima. AI agents, automations, and small web tools, packaged as scoped engagements people can hire me for.

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), deployed free on GitHub Pages via GitHub Actions.

## Stack

- **Astro 4** for the static site generator. Ships near-zero JS by default, which is exactly what a portfolio needs.
- **Tailwind CSS 3** for styling, with a small custom palette in `tailwind.config.mjs`.
- **TypeScript** for the small bits of client JS (scroll reveals, mobile nav).
- **Formspree** as the contact-form backend so we don't need to host one.
- **GitHub Pages** for hosting. Custom domain later if we want one.

## Local development

You need Node 18+ installed (Node 22 is what this was built on).

```powershell
# Install dependencies
npm install

# Copy the env example and fill in your Formspree endpoint
Copy-Item .env.example .env
# then edit .env

# Start the dev server at http://localhost:4321
npm run dev
```

The dev server hot-reloads on save. Tailwind classes purge correctly during the production build, so you can use any utility classes you want without worrying about bundle size.

## Project layout

```
niftyai-portfolio/
  public/              static assets served as-is (favicon, images)
  src/
    components/        Astro components, one per section
    layouts/           Layout.astro: doc shell, head, header, footer
    pages/             routes; index.astro is the home page
    scripts/           tiny client TS (reveal.ts)
    styles/            global.css with Tailwind layers and custom CSS
  astro.config.mjs     Astro + Tailwind config; sets the site + base path
  tailwind.config.mjs  palette, fonts, custom animations
  .github/workflows/   GitHub Actions deploy pipeline
```

## Editing content

Everything that's likely to change lives in data arrays at the top of each component, not scattered through JSX:

- Services: `src/components/Services.astro`, the `services` array
- Portfolio projects: `src/components/Portfolio.astro`, the `projects` array
- Nav links: `src/components/Header.astro`, the `navItems` array
- Socials: `src/components/Footer.astro`, the `socials` array

To swap the portrait placeholder for a real photo, drop your image into `public/` and replace the `IL` initials block in `About.astro` with an `<img>` tag.

## Deploy

The site auto-deploys to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`. After the first push, enable Pages in repo settings:

1. Go to **Settings -> Pages**
2. Under **Source**, pick **GitHub Actions**
3. Push to `main`. The Actions run takes about 90 seconds.

Live URL after the first successful deploy:

```
https://igorcsis.github.io/niftyai-portfolio
```

If/when you point a custom domain at the site, update the `site` value in `astro.config.mjs` to the apex and remove the `base`.

## License

MIT, see `LICENSE`.
