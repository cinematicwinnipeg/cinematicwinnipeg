# Cinematic Winnipeg — cinematicwinnipeg.ca

Marketing site for **Cinematic Winnipeg**: event photography, film and drone coverage in Winnipeg, Manitoba.
Built with [Astro](https://astro.build) as a static site and deployed on Netlify. The contact form uses Netlify Forms.

The original design handoff (tokens, layouts, interactions, deployment brief) is in [`design/HANDOFF.md`](design/HANDOFF.md).
The HTML prototypes in `design/` are a reference only; they aren't part of the build.

## Pages

| Route        | File                       |
| ------------ | -------------------------- |
| `/`          | `src/pages/index.astro`    |
| `/services`  | `src/pages/services.astro` |
| `/portfolio` | `src/pages/portfolio.astro`|
| `/contact`   | `src/pages/contact.astro`  |
| `/thanks`    | `src/pages/thanks.astro` (shown after the form is sent; not indexed) |
| 404          | `src/pages/404.astro`      |

## Local development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # production build into dist/
npm run preview   # serve the production build
npm run check     # type-check .astro/.ts files
```

The first build takes a minute or two because every photo is encoded to AVIF, WebP and JPEG at several sizes.
Later builds reuse the cache in `node_modules/.astro`.

## Editing content

| What                                   | Where                                   |
| -------------------------------------- | --------------------------------------- |
| Portfolio photos, titles, categories   | `src/content/portfolio.yaml`            |
| Service copy and photos                | `src/data/services.ts`                  |
| Home hero, "Recent events", Instagram grid | `src/data/home.ts`                  |
| Email, Instagram, show/hide Instagram section | `src/data/site.ts` (`showInstagram`) |
| Colours and shared styles              | `src/styles/global.css`                 |

**Portfolio.** Each entry in `portfolio.yaml` has a `title`, a `category` (Galas, Corporate, Golf, Festivals or Aerial,
which drives the filter chips), an `image` path and `alt` text. The order in the file is the order on the page.
The titles are still placeholders, so swap in the real event names. If a category is misspelled or a photo path is
wrong, the build fails with a message pointing at the entry.

**Adding photos.** Put the original JPEG in `src/assets/photos/` with a descriptive name (e.g. `spring-gala-stage.jpg`)
and reference it from the YAML or data files. Don't resize it yourself: the build does that.

## Photos and performance

Photos go through `astro:assets` (`src/components/Photo.astro`):

- AVIF and WebP `<source>`s with a JPEG fallback, at 640 / 1024 / 1600 px wide (the hero also asks for 2400).
  Sizes larger than the original are skipped, so the hero currently tops out at its 1920 px source.
- Everything below the fold is lazy-loaded. The hero loads eagerly with `fetchpriority="high"` and an AVIF preload.
- Encoder quality is set in `astro.config.mjs` (AVIF 55, WebP 76, JPEG 78 with mozjpeg).
- Built files under `/_astro/` are fingerprinted and cached for a year (see `netlify.toml`).

The font (Plus Jakarta Sans, variable) is self-hosted through `@fontsource-variable/plus-jakarta-sans`.

## Contact form (Netlify Forms)

The form in `src/pages/contact.astro` is a plain HTML form that Netlify picks up at deploy time:

- `name="enquiry"`, `method="POST"`, `data-netlify="true"`, `action="/thanks"`
- a hidden `form-name` input and a `bot-field` honeypot (`netlify-honeypot="bot-field"`)
- the coverage checkboxes share the name `coverage[]` so Netlify keeps every ticked option

After the first deploy, in the Netlify dashboard:

1. **Forms → enable form detection** (new sites have it switched off). Then redeploy so the `enquiry` form is registered.
2. **Forms → Form notifications → Add notification → Email notification** to `cinematicwinnipeg@gmail.com` for the
   `enquiry` form.
3. Send a test enquiry from the live site and check it appears under **Forms** and arrives by email.

## Deploying on Netlify

1. Netlify → **Add new site → Import an existing project** → pick this GitHub repo.
   Build settings come from `netlify.toml` (`npm run build`, publish `dist`, Node 22).
2. Set up the form as described above.
3. **Domain management → Add a domain**: add `cinematicwinnipeg.ca` (primary) and `www.cinematicwinnipeg.ca`.
   Remove the domain from Adobe Portfolio first. Then either switch the registrar's nameservers to Netlify DNS, or
   add an `A` record for the apex pointing at Netlify's load balancer and a `CNAME` for `www` pointing at
   `<your-site>.netlify.app`. HTTPS is provisioned automatically once DNS resolves.

## SEO

- Per-page titles, meta descriptions and canonical URLs (`src/layouts/Base.astro`)
- Open Graph / Twitter card image: `public/og-image.jpg` (1200 × 630, logo on black with the hero photo)
- `LocalBusiness` JSON-LD (Winnipeg, MB; email; Instagram)
- `sitemap-index.xml` via `@astrojs/sitemap` (excludes `/thanks` and 404), referenced from `public/robots.txt`
- Favicons built from the iris mark: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192/512.png`

## Open items for the owner

- Real event names for the portfolio entries.
- Whether to add a showreel video to the hero later (YouTube/Vimeo embed, muted loop).
- If the old Adobe Portfolio had pages people link to, add `[[redirects]]` for them in `netlify.toml`.
