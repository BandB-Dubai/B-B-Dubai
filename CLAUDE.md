# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for **Komachi Middle East** (komachime.com), a Dubai-based retail and F&B brand environment company. Operated by B&B Dubai Advertising LLC. Deployed via GitHub Pages with a custom domain.

## Development

No build step required. Open `index.html` directly in a browser, or serve locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

### Image optimization (one-off script)

When new source images are added under `assets/images/komachime/` or `assets/images/OUR CLIENTS/`, regenerate the optimized WebP outputs:

```bash
npm install          # installs sharp (only needed once)
node scripts/optimize-images.js
node scripts/optimize-remaining.js   # for extra directional/silhouette images
```

`sharp` is the only dev dependency (`package.json`). The scripts never modify originals.

## Architecture

Three-file site:

- **`index.html`** — All HTML structure (~530 lines)
- **`assets/css/styles.css`** — All styling using CSS custom properties (~700 lines)
- **`assets/js/main.js`** — All JavaScript (scroll reveal, nav, tabs, gallery filter, contact form)

### HTML sections (in order)
Header (sticky dark nav) → Hero (full-screen dark) → About → Services (tabs) → Why Choose Us → Gallery (filterable grid) → Clients (marquee) → Contact (form + map) → Footer

### CSS design tokens (`:root`)
- Dark navy: `--c-navy-900: #090E1A`, `--c-navy-950: #060A14`
- Gold accent: `--c-accent: #F5A623`
- Orange CTA: `--c-orange: #F97316`
- Display font: Barlow Condensed; Body font: Plus Jakarta Sans (both loaded from Google Fonts)
- Lucide icons loaded via CDN: `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`
- Responsive breakpoints: 1200px, 1024px, 900px, 768px, 600px, 480px
- Scroll-reveal: `.reveal-section` and `.reveal-card` get `.in-view` class via IntersectionObserver

### JavaScript (`assets/js/main.js`)
- Sticky header shadow on scroll
- Mobile nav toggle (`.open` class on `#main-nav` + `#nav-toggle`)
- Active nav link highlighting via scroll position
- Scroll reveal (IntersectionObserver on `.reveal-section` / `.reveal-card`)
- Services tabs: `.tab-btn[data-tab]` ↔ `.services-panel[data-panel]`
- Gallery filter: `.filter-btn[data-filter]` toggles `.hidden` on `.gallery-item[data-category]`
- Contact form: preventDefault → mailto (`hello@komachime.com`) → show `#form-success`

## Image asset layout (two-tier)

**Source images** (originals, never modified — not referenced directly by HTML):
- `assets/images/komachime/<CATEGORY>/` — Portfolio images by service category
- `assets/images/OUR CLIENTS/` — Client logos (PNG, 19 logos)

**Optimized outputs** (WebP, referenced by `index.html`):
- `assets/images/gallery/` — Gallery images (converted from `komachime/`)
- `assets/images/clients/` — Client logos (converted from `OUR CLIENTS/`)
- `assets/images/komachi-logo.png` — Main Komachi logo
- `assets/images/bb-dubai-logo.png` — B&B Dubai logo (optimized from `B&Blogo.jpeg`)
- `assets/images/20years.png` — "20+ years" badge used in About section

The mapping from source → output is defined in `scripts/optimize-images.js` (`IMAGE_MAP` array) and `scripts/optimize-remaining.js`. The scripts also write `scripts/image-map.json` as a log after each run.

## Other files

- `assets/profile/komachi-profile.pdf` — Company profile PDF (download target)
- `CNAME` — Contains `komachime.com` for GitHub Pages custom domain routing; **do not modify**
- `Land-Coming Soon` — Unused legacy file; do not reference it

## Deployment

Push to `main` branch → GitHub Pages auto-deploys. No CI/CD pipeline.
