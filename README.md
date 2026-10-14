# Handoff: Cinematic Winnipeg — Marketing Website (cinematicwinnipeg.ca)

## Overview
A 4-page marketing site for **Cinematic Winnipeg**, an event photography / film / drone business in Winnipeg, Manitoba. It replaces the owner's current Adobe Portfolio site at **cinematicwinnipeg.ca**. Its main job is getting enquiries for galas, corporate events, golf tournaments, fundraisers, festivals and carnivals.

**Goal of this handoff:** build the site as a real project, push it to GitHub, deploy it on **Netlify**, make the contact form work (Netlify Forms), and point **cinematicwinnipeg.ca** at it.

## About the Design Files
The files in `design/` are **design references created in HTML**. They are prototypes that show the intended look and behaviour, not production code to copy. `Website.dc.html` runs on a small custom runtime (`support.js`) with `{{ }}` template holes and an `<image-slot>` web component. **Do not ship that runtime.** Recreate the design in a proper static-site setup.

To view the reference, serve the `design/` folder locally (`npx serve design`) and open `Website.dc.html`.

**Recommended stack** (no existing codebase): **Astro** (static output) or plain HTML/CSS/JS built with Vite. Use real routes, no client-side page switching:
- `/` Home
- `/services`
- `/portfolio`
- `/contact`
- `/thanks` (form success page)

Keep the JS small: it's only needed for the animations, the portfolio filter and the coverage chips.

## Fidelity
**High-fidelity.** Final colours, typography, spacing, copy and interactions. Recreate it pixel-accurately.

## Design Tokens

### Colours
| Token | Hex | Use |
|---|---|---|
| ink-black | `#0f0e0d` | Dark section background, header, footer |
| panel-dark | `#1b1916` | Image placeholder background on dark sections |
| rule-dark | `#26231f` / `#2a2622` | Hairlines on dark sections |
| cream | `#fbf8f2` | Light section background, text on dark |
| cream-2 | `#ece6da` | Image placeholder background on light sections |
| rule-light | `#e3dccf` / `#d9d1c0` | Hairlines, input borders on light |
| ink | `#1e1c19` | Body text on light |
| ink-2 | `#55504a` | Secondary text on light |
| stone | `#b8b1a5` / `#d8d2c6` | Secondary text on dark |
| muted | `#8a8175` / `#6f675b` | Labels, legal text |
| gold | `#c9a458` | Brand gold: logo, CTA buttons, accents on dark |
| gold-light | `#e0c07a` | Button hover, hero eyebrow |
| gold-deep | `#a8853c` | Gold accents on cream (better contrast) |

### Typography
- **Font:** Plus Jakarta Sans (Google Fonts), weights 300/400/500/600/700. Self-host it in production (e.g. `@fontsource/plus-jakarta-sans`).
- **Display H1:** 500, `clamp(40px, 6.4vw, 88px)`, line-height 1.02, letter-spacing −0.02em. Inner pages use `clamp(38px, 5vw, 68px)`.
- **H2:** 500, `clamp(30px, 3.6vw, 46px)`, line-height 1.12, letter-spacing −0.02em.
- **Eyebrow labels:** 600, 12px, uppercase, letter-spacing 0.3em, gold.
- **Body:** 15–18px, line-height 1.6–1.7.
- **Buttons / nav:** 600, 12–13px, uppercase, letter-spacing 0.18–0.2em.
- Use `text-wrap: pretty` on headings and paragraphs.

### Spacing / layout
- Content max-width is **1240px**, side padding 28px.
- Section vertical padding is 100–110px.
- Grid gaps: 10 / 14 / 28 / 56 / 64px.
- Button radius 2px. Chips radius 40px. No shadows except the button hover glow.

## Logo
The mark is an **iris/aperture**: 6 gold bars rotated in 60° steps around a centre. In the reference it's built from CSS. **Export it as an inline SVG component in production.**

Geometry at 32px (header size). Each bar is 2.4 × 14.55px, centred, then `rotate(n·60°) translateX(8.4px) translateY(−2.42px)` for n = 0…5.

- **Wordmark:** "CINEMATIC" in 600 weight, letter-spacing 0.14em, cream. Below it, "WINNIPEG" in 500 weight at **0.4× the size** of CINEMATIC, letter-spacing 0.62em, gold. The left edges of the C and the W must line up (≈1px nudge on WINNIPEG). Gap between the lines is 6px; gap between mark and wordmark is 12px.
- **Header lockup:** mark 32px, CINEMATIC 18px, WINNIPEG 7.2px.
- **Footer lockup:** mark 40px, CINEMATIC 22px, WINNIPEG 8px.
- `design/Cinematic Winnipeg Logo.dc.html` has the full brand sheet (primary / cream / mono lockups).
- `design/sig-mark.png` is a raster of the mark. Use it for the favicon / apple-touch-icon / OG image source.

## Screens / Views

### Global header (sticky)
- Background `rgba(15,14,13,.92)` with `backdrop-filter: blur(10px)`, 1px bottom border `#26231f`, padding 18px 28px.
- Left: the logo lockup, which links to `/`.
- Right: nav links **Home, Services, Portfolio, Contact** (12px, 500, uppercase, 0.2em). Inactive links are `#b8b1a5`; the active link is `#fbf8f2` with a 1px gold underline. Hover is cream.
- Then a gold CTA button **"Book an event"** that goes to `/contact`.
- A **scroll-progress hairline** (1px, gold) sits along the bottom edge of the header and scales on X from 0 to 1 with page scroll.
- **Mobile (<760px):** collapse the nav into a menu button and drawer. The reference only wraps, so design this to match.

### Home `/`
1. **Hero:** min-height 88vh, content aligned bottom-left.
   - Full-bleed photo: `photos-1791944825514-clnf.jpg`, the gala stage performance.
   - Two overlays on top of it:
     - `linear-gradient(90deg, rgba(15,14,13,.78) 0%, rgba(15,14,13,.35) 55%, transparent 80%)`
     - `linear-gradient(180deg, rgba(15,14,13,.55) 0%, rgba(15,14,13,.45) 40%, rgba(15,14,13,.94) 100%)`
   - Eyebrow: "Photography · Film · Aerial — Winnipeg, Manitoba" in `#e0c07a`.
   - H1: "Large events, captured like a film."
   - Sub (18px, `#d8d2c6`, max 560px): "Galas, corporate events, festivals and carnivals — covered from the ground and the sky, delivered fast."
   - Buttons: gold solid **"Book your event"** → `/contact`; outline **"View work"** → `/portfolio` (1px border `rgba(251,248,242,.4)`, cream border on hover).
2. **What we cover** (cream background)
   - Eyebrow "What we cover".
   - H2: "Built for events with hundreds of guests and one chance to get it right."
   - Link "All services →".
   - 3 cards in a `repeat(auto-fit, minmax(280px,1fr))` grid with 28px gap. Each card is a 4:5 image, a number (01–03, gold-deep), a 22px title and a blurb:
     - **01 Galas & Corporate:** "Galas, fundraisers, golf tournaments, grand openings and company events — candid, stage and sponsor coverage."
     - **02 Festivals & Carnivals:** "Multi-day, high-energy events covered end to end, with fast turnaround for social and sponsors."
     - **03 Aerial / Drone:** "Licensed drone photo and video that shows the full scale of your venue and crowd."
   - The whole card links to `/services`. Images are set in `Website.dc.html` (search `const services`).
3. **Selected work** (black background)
   - H2 "Recent events" and link "Full portfolio →".
   - 12-column grid with 14px gap. Tiles span 7 / 5 / 4 / 8 columns. The first is 16:10, the third is 1:1, and the other two have min-height 240px.
   - Photos: `…834076-ttbl` (reception), `…825531-n9af` (150th anniversary), `…825481-8bpx` (cultural dancers), and `…067406-8ncg` (carnival aerial).
4. **Instagram** (cream background, toggleable)
   - Eyebrow "On Instagram", H2 "@cinematicwinnipeg", link "Follow →".
   - 6 square tiles in a `minmax(160px,1fr)` grid with 10px gap. Each tile links to https://instagram.com/cinematicwinnipeg.
   - Keep it a **static curated grid** (photos listed in `insta:` in the JS). Do not use the deprecated Instagram Basic Display API. A Behold.so widget is an option later.

### Services `/services`
- Intro band (black background): eyebrow "Services", H1 "Photo, film and drone coverage for events that matter."
- **3 alternating sections** (light / dark / light). Each is a 2-column grid (`minmax(min(100%,440px),1fr)`, 56px gap) with a 4:3 image on one side and the text on the other:
  - Number, then an H2.
  - Body copy.
  - A bullet list: each row has a 6px gold diamond, 14px vertical padding and 1px rules.
  - A CTA **"Enquire about {short}"** → `/contact`.
- Copy for all three sections is in `serviceDetail` in the JS:
  - **Galas & Corporate Events:** includes golf tournaments.
  - **Festivals & Carnivals:** image `photos-1791944067423-aw50.jpeg`.
  - **Aerial / Drone.**

### Portfolio `/portfolio`
- Cream background. Eyebrow "Portfolio", H1 "The work".
- **Filter chips:** All / Galas / Corporate / Golf / Festivals / Aerial. Active chip is ink background with cream text; inactive is transparent with a `#d9d1c0` border.
- Grid `repeat(auto-fill, minmax(260px,1fr))` with 14px gap. Each item is a 4:5 image, a 15px/600 title on the left and the category (11px, uppercase, gold-deep) on the right.
- **Data:** `allWork` array in the JS has 25 items with id, title, cat and src. `order` sets the display order for "All".
- **Titles are placeholders** (e.g. "Fundraising gala"). The owner will supply real event names, so keep the data in one JSON/Markdown collection that's easy to edit.
- **Optional:** add a lightbox on click.

### Contact `/contact`
- Black background, 2-column grid (`minmax(min(100%,380px),1fr)`, 64px gap).
- **Left column:**
  - Eyebrow "Book an event", H1 "Tell us about your event."
  - Paragraph: "Share the date, venue and what you need. We'll reply within one business day with availability and a quote."
  - Contact rows: EMAIL cinematicwinnipeg@gmail.com and INSTAGRAM @cinematicwinnipeg.
  - **The phone number was deliberately removed. Do not add it.**
- **Right column:** a cream card (padding 40px) holding the form:
  - Name* (text), Email* (email), Phone (text), Event type (select: Gala, Corporate event, Festival / carnival, Wedding, Drone / aerial only, Other), Event date (date), Venue (text).
  - **Coverage needed:** toggle chips for Photography (on by default), Video and Drone. Implement as checkboxes styled as chips.
  - Details (textarea, 5 rows).
  - Submit button **"Send enquiry"** (ink background, cream text).
- **Success state:** eyebrow "Received", heading "Thank you — we'll be in touch within one business day.", link "Send another".

### Global CTA band + footer (every page)
- **Gold band** (`#c9a458`): "Planning an event in Manitoba?" with a black button **"Check availability"** → `/contact`.
- **Footer** (black background):
  - Logo lockup.
  - PAGES column with the nav links.
  - CONTACT column: email and Instagram.
  - Bottom row: "© 2026 Cinematic Winnipeg" and "cinematicwinnipeg.ca · Winnipeg, Manitoba".

## Interactions & Animations
Respect `prefers-reduced-motion`: turn all of these off. The reference code for them is in `componentDidMount` / `animate()` in `Website.dc.html`.
- **Scroll reveal:** section headers fade and slide up: opacity 0→1, translateY 32px→0, 1000ms, `cubic-bezier(.2,.7,.2,1)`. Trigger with IntersectionObserver (threshold 0.12, rootMargin `0px 0px -6% 0px`).
- **Staggered grids:** the children of each grid (service cards, work tiles, Instagram, portfolio, services sections, contact columns, hero text lines) reveal the same way, 110ms apart, capped at 8 steps.
- **Hero image:**
  - On load it goes from scale 1.14 / opacity 0, to 1.04 / opacity 1 at 35%, to scale 1. Duration 9s, `cubic-bezier(.25,.6,.3,1)`.
  - Parallax: `translate: 0 (scrollY × 0.25)px`. The image box is inset −6% at the top to allow for the movement.
- **Logo iris:** on load it animates from rotate(−180°) scale(.3) opacity 0 to rest, 1600ms, `cubic-bezier(.16,1,.3,1)`. On hovering the lockup it rotates 0→60° over 900ms (`cubic-bezier(.65,0,.35,1)`); 60° symmetry makes the turn seamless.
- **Image hover:** the image scales to 1.06 and brightens to 1.08, 1.4s ease-out. The tile has overflow hidden.
- **Gold buttons:** on hover they change to background `#e0c07a`, move up 2px (translateY −2px), and get a glow (`box-shadow 0 10px 30px -10px rgba(201,164,88,.6)`). Transition .3s.

## Netlify Deployment (the owner's main ask)
1. **Create a GitHub repo** (e.g. `cinematic-winnipeg-site`) and push the project.
2. **Connect it on Netlify:** Netlify → Add new site → Import from GitHub. For Astro the build is `npm run build` and the publish directory is `dist`. Add a `netlify.toml`.
3. **Netlify Forms** for the contact form:
   - Add `name="enquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field"` to the `<form>`.
   - Add a hidden `form-name` input and a honeypot field.
   - Set `action="/thanks"`.
   - In the Netlify UI, set up **email notifications to cinematicwinnipeg@gmail.com** (Forms → Notifications).
4. **Custom domain:** in Netlify → Domain management, add `cinematicwinnipeg.ca` and `www.cinematicwinnipeg.ca`. At the registrar, either switch nameservers to Netlify DNS or add an A record (apex → Netlify load balancer) and a CNAME (`www` → `<site>.netlify.app`). HTTPS will provision automatically. Remove the domain from Adobe Portfolio first.
5. **Images:** the source files are 1920px JPEGs, often 2–4 MB.
   - Generate responsive AVIF/WebP with `astro:assets` / `<Picture>`, or with `sharp` at build time.
   - Widths: 640 / 1024 / 1600 / 2400 (hero only).
   - Lazy-load everything below the fold. Preload the hero image.
6. **SEO:**
   - Titles like "Cinematic Winnipeg — Event Photography, Film & Drone | Winnipeg, MB".
   - Meta descriptions.
   - OG image: logo on black plus the hero photo.
   - `LocalBusiness` JSON-LD (Winnipeg, MB; email; Instagram sameAs).
   - `sitemap.xml`.
   - Favicon built from the iris mark.

## State Management
- **Portfolio:** the active filter (`'All' | 'Galas' | 'Corporate' | 'Golf' | 'Festivals' | 'Aerial'`). A small vanilla script or an Astro island is enough.
- **Contact:** coverage checkboxes (native form state). The success state lives on the `/thanks` page.
- **Instagram section:** shown or hidden by a config flag (currently shown).

## Assets
All photos are the owner's own work, uploaded in this session. They live in `design/uploads/`. Rename them to descriptive slugs when importing (e.g. `gala-stage-performance.jpg`). Which photo goes where is defined in `Website.dc.html`:
- hero: `photos-1791944825514-clnf.jpg`
- home grid: `…834076-ttbl`, `…825531-n9af`, `…825481-8bpx`
- service images: `const services` and `serviceDetail`
- portfolio: `allWork`
- Instagram: `insta`

The `.jpeg` files (`photos-17919440…`) are from the **Carnival 2026** set, including two aerials (`…067406-8ncg`, `…067454-9495`). The `.jpg` files are galas, corporate events, a grand opening and golf tournaments.

## Files
- `design/Website.dc.html`: the full 4-page site reference (template + logic class at the bottom).
- `design/Cinematic Winnipeg Logo.dc.html`: the logo brand sheet.
- `design/sig-mark.png`: raster of the iris mark.
- `design/support.js`, `design/image-slot.js`: the prototype runtime, needed only to view the reference.
- `design/uploads/`: the 25 photos used on the site.

## Open items for the owner
- Real event names for the portfolio items.
- Whether to add a showreel video to the hero later (YouTube/Vimeo embed, muted loop).
