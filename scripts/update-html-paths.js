#!/usr/bin/env node
/**
 * Update index.html to use optimized WebP image paths.
 * Run: node scripts/update-html-paths.js
 */

const fs = require('fs');
const path = require('path');

const HTML_FILE = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(HTML_FILE, 'utf8');

// ── Replacements map: old src value → new src value ──────────────────────────
const replacements = [
  // B&B logo (3 occurrences)
  ['B&amp;Blogo.jpeg', 'assets/images/bb-dubai-logo.webp'],

  // Gallery — Sign Boards
  ['assets/images/komachime/SIGN%20BOARDS/signage.jpg',         'assets/images/gallery/signage-led-board.webp'],
  ['assets/images/komachime/SIGN%20BOARDS/Aster.jpg',           'assets/images/gallery/signage-aster-hospital.webp'],
  ['assets/images/komachime/SIGN%20BOARDS/SULTAN-01.png',       'assets/images/gallery/signage-sultan-branding.webp'],
  ['assets/images/komachime/SIGN%20BOARDS/Final.jpg',           'assets/images/gallery/signage-storefront.webp'],
  ['assets/images/komachime/SIGN%20BOARDS/zain.jpg',            'assets/images/gallery/signage-zain-telecom.webp'],
  ['assets/images/komachime/SIGN%20BOARDS/AGCARS.png',          'assets/images/gallery/signage-agcars.webp'],
  ['assets/images/komachime/SIGN%20BOARDS/Reception%20Sign.jpg','assets/images/gallery/signage-reception.webp'],

  // Gallery — LED Facades
  ['assets/images/komachime/LED%20FACADES/rakez.png',           'assets/images/gallery/led-facade-rakez.webp'],
  ['assets/images/komachime/LED%20FACADES/RAKEZ%20RED.png',     'assets/images/gallery/led-facade-rakez-illuminated.webp'],

  // Gallery — Directional Signage
  ['assets/images/komachime/DIRECTIONAL%20SIGNAGE/SJHUFJUN.png','assets/images/gallery/directional-signage-wayfinding.webp'],

  // Gallery — Printing
  ['assets/images/komachime/PRINTING/Cahai%20kappi%20front.jpg',                              'assets/images/gallery/printing-cafe-branding.webp'],
  ['assets/images/komachime/PRINTING/30258560059229078_f8d0.jpg',                             'assets/images/gallery/printing-large-format.webp'],
  ['assets/images/komachime/PRINTING/WhatsApp%20Image%202025-01-14%20at%2011.26.47%20AM.jpeg','assets/images/gallery/printing-digital-print.webp'],
  ['assets/images/komachime/PRINTING/WhatsApp%20Image%202025-02-05%20at%208.09.48%20AM.jpeg', 'assets/images/gallery/printing-banner-display.webp'],
  ['assets/images/komachime/PRINTING/WhatsApp%20Image%202026-02-21%20at%2008.35.42.jpeg',     'assets/images/gallery/printing-outdoor.webp'],

  // Gallery — Vehicle Graphics
  ['assets/images/komachime/VEHICLE%20GRAPHICS/BigBus.jpg',       'assets/images/gallery/vehicle-big-bus-wrap.webp'],
  ['assets/images/komachime/VEHICLE%20GRAPHICS/DUBAI%20TAXI.png', 'assets/images/gallery/vehicle-dubai-taxi-wrap.webp'],
  ['assets/images/komachime/VEHICLE%20GRAPHICS/mockup.jpg',        'assets/images/gallery/vehicle-wrap-mockup.webp'],
  ['assets/images/komachime/VEHICLE%20GRAPHICS/BIKE%20INSTALL.jpg','assets/images/gallery/vehicle-bike-graphics.webp'],
  ['assets/images/komachime/VEHICLE%20GRAPHICS/side%201.jpg',      'assets/images/gallery/vehicle-side-wrap-1.webp'],
  ['assets/images/komachime/VEHICLE%20GRAPHICS/side%202.jpg',      'assets/images/gallery/vehicle-side-wrap-2.webp'],

  // Gallery — Racking & Shelving
  ['assets/images/komachime/RACKING%20%26%20SHELVING/racking.jpg',          'assets/images/gallery/racking-warehouse-system.webp'],
  ['assets/images/komachime/RACKING%20%26%20SHELVING/racking%202.jpg',      'assets/images/gallery/racking-selective-pallet.webp'],
  ['assets/images/komachime/RACKING%20%26%20SHELVING/racking%203.jpg',      'assets/images/gallery/racking-high-bay-storage.webp'],
  ['assets/images/komachime/RACKING%20%26%20SHELVING/image-5-scaled.jpg',   'assets/images/gallery/racking-mezzanine-floor.webp'],
  ['assets/images/komachime/RACKING%20%26%20SHELVING/19071506040813.jpg',   'assets/images/gallery/racking-storage-installation.webp'],

  // Gallery — Interior Design / Flooring / Office Setup
  ['assets/images/komachime/interior%20design/interior.jpg',                          'assets/images/gallery/interior-office-fit-out.webp'],
  ['assets/images/komachime/interior%20design/ceiling.jpg',                           'assets/images/gallery/interior-ceiling-design.webp'],
  ['assets/images/komachime/interior%20design/ceiling%202.jpg',                       'assets/images/gallery/interior-ceiling-installation.webp'],
  ['assets/images/komachime/FLOORING/flooring.jpg',                                   'assets/images/gallery/flooring-commercial-vinyl.webp'],
  ['assets/images/komachime/OFFICE%20SETUP/Office-Mezzanine-in-Warehouse-scaled.jpg', 'assets/images/gallery/interior-office-mezzanine.webp'],
  ['assets/images/komachime/FLOORING/carpet.jpg',                                     'assets/images/gallery/flooring-carpet-tile.webp'],

  // Gallery — Exhibition & Events
  ['assets/images/komachime/EXHIBITION%20%26%20EVENTS/conmix.jpg',                                    'assets/images/gallery/events-conmix-exhibition.webp'],
  ['assets/images/komachime/EXHIBITION%20%26%20EVENTS/Ramsan%20stand.jpg',                             'assets/images/gallery/events-exhibition-stand.webp'],
  ['assets/images/komachime/EXHIBITION%20%26%20EVENTS/WhatsApp%20Image%202026-03-06%20at%2009.39.01.jpeg','assets/images/gallery/events-trade-show-display.webp'],

  // Client logos (appear twice each — both marquee sets)
  ['assets/images/OUR%20CLIENTS/AL%20GHURAIR.png',  'assets/images/clients/client-al-ghurair.webp'],
  ['assets/images/OUR%20CLIENTS/AL%20KHAYAM.png',   'assets/images/clients/client-al-khayam.webp'],
  ['assets/images/OUR%20CLIENTS/AL%20RASHIDEEN.png','assets/images/clients/client-al-rashideen.webp'],
  ['assets/images/OUR%20CLIENTS/ASTER.png',         'assets/images/clients/client-aster-hospitals.webp'],
  ['assets/images/OUR%20CLIENTS/BIG%20BUS.png',     'assets/images/clients/client-big-bus-dubai.webp'],
  ['assets/images/OUR%20CLIENTS/CAR%20TAXI.png',    'assets/images/clients/client-car-taxi.webp'],
  ['assets/images/OUR%20CLIENTS/CONMIX.png',        'assets/images/clients/client-conmix.webp'],
  ['assets/images/OUR%20CLIENTS/D%20TAXI.png',      'assets/images/clients/client-dubai-taxi.webp'],
  ['assets/images/OUR%20CLIENTS/DCC.png',           'assets/images/clients/client-dubai-contracting.webp'],
  ['assets/images/OUR%20CLIENTS/deep%20sea%20logo.png','assets/images/clients/client-deep-sea-food.webp'],
  ['assets/images/OUR%20CLIENTS/ECC.png',           'assets/images/clients/client-ecc.webp'],
  ['assets/images/OUR%20CLIENTS/GERMAN.png',        'assets/images/clients/client-german-gulf.webp'],
  ['assets/images/OUR%20CLIENTS/GMGT.png',          'assets/images/clients/client-gmgt.webp'],
  ['assets/images/OUR%20CLIENTS/KSB.png',           'assets/images/clients/client-ksb-energy.webp'],
  ['assets/images/OUR%20CLIENTS/MDT.png',           'assets/images/clients/client-mdt.webp'],
  ['assets/images/OUR%20CLIENTS/MUNCIPALITY.png',   'assets/images/clients/client-dubai-municipality.webp'],
  ['assets/images/OUR%20CLIENTS/ROMANA.png',        'assets/images/clients/client-romana-water.webp'],
  ['assets/images/OUR%20CLIENTS/SONAS.png',         'assets/images/clients/client-sonas.webp'],
  ['assets/images/OUR%20CLIENTS/TALAL.png',         'assets/images/clients/client-talal-group.webp'],
];

let count = 0;
for (const [oldSrc, newSrc] of replacements) {
  const before = html;
  // Replace all occurrences (global)
  html = html.split(oldSrc).join(newSrc);
  const diff = (html.match(new RegExp(newSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (before !== html) {
    console.log(`  ✓  ${diff}× ${oldSrc.split('/').pop()} → ${newSrc.split('/').pop()}`);
    count++;
  } else {
    console.warn(`  ✗  NOT FOUND: ${oldSrc}`);
  }
}

// ── Add decoding="async" to all lazy-loaded images that don't have it ────────
// Match <img ... loading="lazy" ... > and add decoding="async" after loading="lazy"
const beforeDecoding = html;
html = html.replace(/(<img\b[^>]*?)(\bloading="lazy"\b)([^>]*?>)/g, (match, pre, loading, rest) => {
  if (match.includes('decoding=')) return match; // already has decoding
  return `${pre}${loading} decoding="async"${rest}`;
});
const decodingAdded = (html.match(/decoding="async"/g) || []).length;
const decodingBefore = (beforeDecoding.match(/decoding="async"/g) || []).length;
console.log(`\n  ✓  decoding="async" added to ${decodingAdded - decodingBefore} images`);

fs.writeFileSync(HTML_FILE, html, 'utf8');
console.log(`\nDone — ${count} path replacements applied to index.html`);
