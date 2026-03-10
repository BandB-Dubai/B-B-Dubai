# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for **Komachi Middle East** (komachime.com), a Dubai-based retail and F&B brand environment company. Operated by B&B Dubai Advertising LLC. Deployed via GitHub Pages with a custom domain.

## Development

No build step, package manager, or dependencies. Open `index.html` directly in a browser, or serve locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Architecture

Three-file site:

- **`index.html`** — All HTML structure (~500 lines)
- **`assets/css/styles.css`** — All styling using CSS custom properties (~700 lines)
- **`assets/js/main.js`** — All JavaScript (scroll reveal, nav, tabs, gallery filter, contact form)

### HTML sections (in order)
Header (sticky dark nav) → Hero (full-screen dark) → About → Services (tabs) → Why Choose Us → Gallery (filterable grid) → Clients (marquee) → Contact (form + map) → Footer

### CSS design tokens (`:root`)
- Dark navy: `--c-navy-900: #090E1A`, `--c-navy-950: #060A14`
- Gold accent: `--c-accent: #F5A623`
- Orange CTA: `--c-orange: #F97316`
- Display font: Barlow Condensed; Body font: Plus Jakarta Sans
- Responsive breakpoints: 1200px, 1024px, 900px, 768px, 600px, 480px
- Scroll-reveal: `.reveal-section` and `.reveal-card` get `.in-view` class via IntersectionObserver

### JavaScript (`assets/js/main.js`)
- Sticky header shadow on scroll
- Mobile nav toggle (`.open` class on `#main-nav` + `#nav-toggle`)
- Active nav link highlighting via scroll position
- Scroll reveal (IntersectionObserver on `.reveal-section` / `.reveal-card`)
- Services tabs: `.tab-btn[data-tab]` ↔ `.services-panel[data-panel]`
- Gallery filter: `.filter-btn[data-filter]` toggles `.hidden` on `.gallery-item[data-category]`
- Contact form: preventDefault → mailto fallback → show `#form-success`

## Assets

- `assets/images/komachime/` — Portfolio images organized by service category (DIRECTIONAL SIGNAGE, SIGN BOARDS, VEHICLE GRAPHICS, RACKING & SHELVING, etc.)
- `assets/images/OUR CLIENTS/` — Client logos (PNG files, 19 logos)
- `assets/images/komachi-logo.png` — Main Komachi logo
- `B&Blogo.jpeg` — B&B Dubai logo (at root, not in assets/)
- `assets/profile/komachi-profile.pdf` — Company profile PDF (download target)
- `CNAME` — Contains `komachime.com` for GitHub Pages custom domain routing; do not modify

## Deployment

Push to `main` branch → GitHub Pages auto-deploys. No CI/CD pipeline.
