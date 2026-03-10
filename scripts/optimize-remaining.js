#!/usr/bin/env node
/**
 * Optimize remaining unused source images → assets/images/gallery/
 * Run: node scripts/optimize-remaining.js
 */

const sharp  = require('sharp');
const fs     = require('fs');
const path   = require('path');

const BASE = path.join(__dirname, '..');
const GALLERY_OUT = path.join(BASE, 'assets', 'images', 'gallery');
fs.mkdirSync(GALLERY_OUT, { recursive: true });

const IMAGE_MAP = [
  // ── Directional Signage (18 hash-named real project photos) ──────────────
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/08b39603ac0d8855c72aedd0f105c1be.jpg', out: 'assets/images/gallery/directional-arrows-post.webp',        alt: 'Directional arrow post signage', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/0ee65514b7ce35798cf4052a3818366f.jpg', out: 'assets/images/gallery/directional-blade-sign.webp',           alt: 'Blade wayfinding sign installation', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/22f7b85e353890704439195f2785f3e2.jpg', out: 'assets/images/gallery/directional-hanging-sign.webp',          alt: 'Hanging directional signage', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/24824492726cdba28692c46427d5c71e.jpg', out: 'assets/images/gallery/directional-overhead-sign.webp',         alt: 'Overhead ceiling directional sign', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/2693396f86df39b0155b0eb3de1c0337.jpg', out: 'assets/images/gallery/directional-floor-guide.webp',           alt: 'Floor guide directional sign', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/2adda6d007d9d9b8e3579b5e0f2120cf.jpg', out: 'assets/images/gallery/directional-pole-sign.webp',             alt: 'Pole mounted directional signage', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/2b70d40d2fe90048839b21198a42c3a5.jpg', out: 'assets/images/gallery/directional-wall-mount.webp',            alt: 'Wall mounted wayfinding sign', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/3723c1d6ce6e39c9089d9455a710de1f.jpg', out: 'assets/images/gallery/directional-pedestrian-guide.webp',      alt: 'Pedestrian wayfinding guide sign', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/3be544631be069cb2b5b022f2e70eecd.jpg', out: 'assets/images/gallery/directional-campus-sign.webp',           alt: 'Campus directional sign system', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/6fe71a85ae3e7c9dca3f28093f8e1b5c.jpg', out: 'assets/images/gallery/directional-parking-sign.webp',          alt: 'Parking directional sign Dubai', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/8ccc183ee5c0a3268a8b4cf390a5298f.jpg', out: 'assets/images/gallery/directional-stairway-sign.webp',         alt: 'Stairway directional indicator sign', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/8e04bf6b2e8f18b1ca218f6cb3a76cf3.jpg', out: 'assets/images/gallery/directional-lobby-sign.webp',            alt: 'Corporate lobby directional sign', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/8f2bcc25d3559f2e5169c8b6a0f21507.jpg', out: 'assets/images/gallery/directional-exit-sign.webp',             alt: 'Exit directional sign installation', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/8fd5819df8951946dc91b455b55d67ef.jpg', out: 'assets/images/gallery/directional-reception-guide.webp',       alt: 'Reception area wayfinding guide', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/972f2117c85b17d76bcf0d4f55d9b57d.jpg', out: 'assets/images/gallery/directional-carpark-system.webp',        alt: 'Carpark wayfinding sign system', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/9a41764c4091974437cc0785fc9e29dd.jpg', out: 'assets/images/gallery/directional-road-sign.webp',             alt: 'Road directional sign UAE', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/a2606a843c44d688b799b99279e5f385.jpg', out: 'assets/images/gallery/directional-hospital-sign.webp',         alt: 'Hospital directional wayfinding sign', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/DIRECTIONAL SIGNAGE/a65e10ca442306bad74c7b2c6d8ad8fd.jpg', out: 'assets/images/gallery/directional-bilingual-sign.webp',        alt: 'Bilingual Arabic English directional sign', quality: 78, maxW: 1200 },

  // ── LED Facades (3 more RAKEZ views) ─────────────────────────────────────
  { src: 'assets/images/komachime/LED FACADES/rakez2.png',   out: 'assets/images/gallery/led-facade-rakez-detail.webp',  alt: 'RAKEZ LED facade detail view',       quality: 80, maxW: 1400 },
  { src: 'assets/images/komachime/LED FACADES/RAKEZ21.png',  out: 'assets/images/gallery/led-facade-rakez-night.webp',   alt: 'RAKEZ LED facade night illumination', quality: 80, maxW: 1400 },
  { src: 'assets/images/komachime/LED FACADES/rakez3.png',   out: 'assets/images/gallery/led-facade-rakez-wide.webp',    alt: 'RAKEZ LED building facade wide view', quality: 80, maxW: 1400 },

  // ── Sign Boards (WhatsApp project photos + more) ──────────────────────────
  { src: 'assets/images/komachime/SIGN BOARDS/Talal Restaurant Arrow 3.jpg',                    out: 'assets/images/gallery/signage-talal-restaurant.webp',       alt: 'Talal restaurant directional arrow sign',       quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/SIGN BOARDS/Untitled-1.png',                                  out: 'assets/images/gallery/signage-custom-fabrication.webp',     alt: 'Custom fabricated sign board UAE',              quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/SIGN BOARDS/WhatsApp Image 2026-01-24 at 10.03.06 (1).jpeg',  out: 'assets/images/gallery/signage-installation-a.webp',         alt: 'Commercial signage installation Dubai',         quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/SIGN BOARDS/WhatsApp Image 2026-01-24 at 10.03.09 - Copy.jpeg',out:'assets/images/gallery/signage-installation-b.webp',         alt: 'Branded signage installation project',          quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/SIGN BOARDS/WhatsApp Image 2026-01-24 at 10.03.09.jpeg',       out: 'assets/images/gallery/signage-installation-c.webp',        alt: 'Exterior signage installation UAE',             quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/SIGN BOARDS/WhatsApp Image 2026-01-30 at 14.22.17.jpeg',       out: 'assets/images/gallery/signage-retail-board.webp',          alt: 'Retail shop front sign board',                  quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/SIGN BOARDS/WhatsApp Image 2026-02-05 at 09.46.09 (1).jpeg',   out: 'assets/images/gallery/signage-corporate-fascia.webp',      alt: 'Corporate fascia signage project',              quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/SIGN BOARDS/WhatsApp Image 2026-02-25 at 11.33.46.jpeg',       out: 'assets/images/gallery/signage-illuminated-board.webp',     alt: 'Illuminated sign board installation',           quality: 78, maxW: 1200 },

  // ── Silhouette work ──────────────────────────────────────────────────────
  { src: 'assets/images/komachime/SILHOUTTE/WhatsApp Image 2026-01-24 at 10.03.06 (1).jpeg', out: 'assets/images/gallery/silhouette-cutout-1.webp', alt: 'Stainless steel silhouette cutout signage', quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/SILHOUTTE/WhatsApp Image 2026-01-24 at 10.03.07.jpeg',     out: 'assets/images/gallery/silhouette-cutout-2.webp', alt: 'Metal silhouette branding installation',    quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/SILHOUTTE/WhatsApp Image 2026-01-24 at 10.03.08.jpeg',     out: 'assets/images/gallery/silhouette-cutout-3.webp', alt: 'Decorative silhouette sign detail',          quality: 78, maxW: 1200 },
  { src: 'assets/images/komachime/SILHOUTTE/WhatsApp Image 2026-01-24 at 10.03.09.jpeg',     out: 'assets/images/gallery/silhouette-cutout-4.webp', alt: 'Custom silhouette cut-out branding',         quality: 78, maxW: 1200 },

  // ── Vehicle Graphics (remaining) ─────────────────────────────────────────
  { src: 'assets/images/komachime/VEHICLE GRAPHICS/back.jpg',       out: 'assets/images/gallery/vehicle-rear-wrap.webp',      alt: 'Vehicle rear panel wrap design',         quality: 78, maxW: 1400 },
  { src: 'assets/images/komachime/VEHICLE GRAPHICS/HAVEN FIRE.png', out: 'assets/images/gallery/vehicle-haven-fire-wrap.webp', alt: 'Haven Fire vehicle graphics branding',   quality: 80, maxW: 1400 },
  { src: 'assets/images/komachime/VEHICLE GRAPHICS/KSB.png',        out: 'assets/images/gallery/vehicle-ksb-branding.webp',   alt: 'KSB vehicle branding graphics',          quality: 80, maxW: 1400 },

  // ── Printing (remaining) ─────────────────────────────────────────────────
  { src: 'assets/images/komachime/PRINTING/WhatsApp Image 2026-02-21 at .jpeg',   out: 'assets/images/gallery/printing-site-hoarding.webp', alt: 'Site hoarding printed graphics UAE', quality: 78, maxW: 1200 },

  // ── Racking & Shelving (remaining including speciality types) ─────────────
  { src: 'assets/images/komachime/RACKING & SHELVING/Cantilever Rack.png',          out: 'assets/images/gallery/racking-cantilever.webp',      alt: 'Cantilever racking system for long goods',     quality: 80, maxW: 1200 },
  { src: 'assets/images/komachime/RACKING & SHELVING/Mobile Rack.png',              out: 'assets/images/gallery/racking-mobile.webp',           alt: 'Mobile compact racking system',                quality: 80, maxW: 1200 },
  { src: 'assets/images/komachime/RACKING & SHELVING/a clean, modern rack.png',     out: 'assets/images/gallery/racking-modern-design.webp',    alt: 'Modern industrial racking solution',           quality: 80, maxW: 1200 },
  { src: 'assets/images/komachime/RACKING & SHELVING/a professional PNG i.png',     out: 'assets/images/gallery/racking-professional-setup.webp',alt: 'Professional warehouse racking setup',         quality: 80, maxW: 1200 },
  { src: 'assets/images/komachime/RACKING & SHELVING/illustration of a gr.png',     out: 'assets/images/gallery/racking-guide-illustration.webp',alt: 'Racking system guide illustration',            quality: 80, maxW: 1200 },
  { src: 'assets/images/komachime/RACKING & SHELVING/illustration of a Gu.png',     out: 'assets/images/gallery/racking-heavy-duty.webp',       alt: 'Heavy duty racking system diagram',            quality: 80, maxW: 1200 },

  // ── Interiors – Flooring (remaining) ─────────────────────────────────────
  { src: 'assets/images/komachime/FLOORING/office-vinyl-flooring.jpg',                                         out: 'assets/images/gallery/flooring-vinyl-office.webp',     alt: 'Office vinyl flooring installation UAE',       quality: 78, maxW: 1400 },
  { src: 'assets/images/komachime/FLOORING/pool decking.jpg',                                                   out: 'assets/images/gallery/flooring-pool-decking.webp',     alt: 'Pool deck outdoor flooring project',           quality: 78, maxW: 1400 },
  { src: 'assets/images/komachime/FLOORING/revetement-de-sol-pour-lindustrie-swisstrax-scaled.jpg',             out: 'assets/images/gallery/flooring-industrial-tile.webp',  alt: 'Industrial modular floor tile system',         quality: 78, maxW: 1400 },

  // ── Interiors – Interior Design (remaining) ───────────────────────────────
  { src: 'assets/images/komachime/interior design/Asian-Walnut-Tobacco-Road-3-4-x-5--Hand-Scraped-Solid-Hardwood-Flooring---24.22-sqft-ctn-Elk-Mountain-1655230473.jpg',
    out: 'assets/images/gallery/interior-hardwood-flooring.webp', alt: 'Hardwood flooring interior fit-out', quality: 78, maxW: 1400 },
  { src: 'assets/images/komachime/interior design/outdoor-backyard-pergola-ideas-designs-10.jpg', out: 'assets/images/gallery/interior-pergola-structure.webp',  alt: 'Outdoor pergola design and installation', quality: 78, maxW: 1400 },
  { src: 'assets/images/komachime/interior design/shadefx-4.jpg',                                 out: 'assets/images/gallery/interior-shade-structure.webp',    alt: 'Shade structure and canopy installation',quality: 78, maxW: 1400 },

  // ── Office Setup (remaining) ──────────────────────────────────────────────
  { src: 'assets/images/komachime/OFFICE SETUP/ayt.png',                                out: 'assets/images/gallery/interior-office-partition.webp',  alt: 'Office partition fit-out Dubai',              quality: 80, maxW: 1400 },
  { src: 'assets/images/komachime/OFFICE SETUP/dff.png',                                out: 'assets/images/gallery/interior-office-furniture.webp',  alt: 'Office furniture and interior setup',         quality: 80, maxW: 1400 },
  { src: 'assets/images/komachime/OFFICE SETUP/Warehouse-Fit-Out-Spot-Promotions-scaled.jpg', out: 'assets/images/gallery/interior-warehouse-fitout.webp', alt: 'Warehouse interior fit-out project', quality: 78, maxW: 1400 },

  // ── Exhibition & Events (remaining) ──────────────────────────────────────
  { src: 'assets/images/komachime/EXHIBITION & EVENTS/cONMIX.png', out: 'assets/images/gallery/events-conmix-branding.webp', alt: 'Conmix exhibition branding display', quality: 80, maxW: 1200 },
];

function fmt(bytes) {
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
  return Math.round(bytes / 1024) + ' KB';
}

async function run() {
  let ok = 0, fail = 0;
  let totalSrc = 0, totalOut = 0;

  for (const { src, out, alt, quality, maxW } of IMAGE_MAP) {
    const srcPath = path.join(BASE, src);
    const outPath = path.join(BASE, out);

    if (!fs.existsSync(srcPath)) {
      console.warn(`  SKIP (missing): ${src}`);
      fail++;
      continue;
    }

    const srcSize = fs.statSync(srcPath).size;

    try {
      await sharp(srcPath)
        .resize(maxW, null, { withoutEnlargement: true })
        .webp({ quality })
        .toFile(outPath);

      const outSize = fs.statSync(outPath).size;
      const pct = (((srcSize - outSize) / srcSize) * 100).toFixed(1);
      totalSrc += srcSize;
      totalOut += outSize;
      console.log(`  ✓  ${path.basename(out)}  ${fmt(srcSize)} → ${fmt(outSize)} (${pct}% saved)`);
      ok++;
    } catch (err) {
      console.error(`  ✗  ${src}: ${err.message}`);
      fail++;
    }
  }

  const totalPct = (((totalSrc - totalOut) / totalSrc) * 100).toFixed(1);
  console.log(`\n${ok} optimised, ${fail} failed — ${fmt(totalSrc)} → ${fmt(totalOut)} (${totalPct}% saved)`);
}

run().catch(err => { console.error(err); process.exit(1); });
