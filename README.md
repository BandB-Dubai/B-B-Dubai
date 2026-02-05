## B&B Dubai Advertising LLC – Portfolio Site

This repository contains the static portfolio website for **B&B Dubai Advertising LLC**, designed to be deployed on GitHub Pages.

### Structure

- **`index.html`**: Single‑page portfolio with sections for:
  - Hero / introduction
  - About
  - Services
  - Selected work / portfolio
  - Clients & partners
  - Contact / enquiry form (mailto link)
- **`assets/css/styles.css`**: Global layout, typography, responsive navigation and styling for all sections.
- **Images in root**:
  - `b&blogo.png` – primary B&B Dubai logo used in header and clients section
  - `komachi png.png` – Komachi Middle East logo used in portfolio and clients section
  - `Screenshot_2022-07-18_at_11.31.46_1200x1200.jpg` – hero/portfolio image
- **`CNAME`**: Custom domain configuration for GitHub Pages (keep this file as is if you are using a custom domain).

### Local Development

No build step is required; this is a pure HTML/CSS site.

1. Open `index.html` directly in your browser, or
2. Serve the folder with a simple HTTP server, for example:

```bash
cd /Users/ajayjose/Documents/B-B-Dubai
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

### Deployment (GitHub Pages)

1. Push this folder to a GitHub repository.
2. In GitHub, enable **GitHub Pages** (Settings → Pages) from the `main` branch and root folder.
3. If you have a custom domain:
   - Set your DNS `CNAME` record to the GitHub Pages domain.
   - Ensure the `CNAME` file in this repo contains exactly your custom domain name.

### Customisation Tips

- Update text content in the relevant sections of `index.html` (About, Services, Portfolio, Clients, Contact).
- Replace image files with updated assets while keeping the same file names, or adjust image paths in `index.html` if you introduce new filenames.
- Colours, spacing and layout can be tweaked in `assets/css/styles.css`.
