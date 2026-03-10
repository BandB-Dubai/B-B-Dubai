#!/usr/bin/env node
/**
 * Komachi Middle East — Image Optimization Script
 *
 * Compresses and converts portfolio images to WebP.
 * Originals in /komachime/ and /OUR CLIENTS/ are NEVER modified.
 * Outputs go to assets/images/gallery/ and assets/images/clients/
 *
 * Usage: node scripts/optimize-images.js
 */

const sharp  = require('sharp');
const fs     = require('fs');
const path   = require('path');

const BASE = path.resolve(__dirname, '..');

// ─── IMAGE MAP ────────────────────────────────────────────────────────────────
// src  : path relative to BASE (original file — never modified)
// out  : path relative to BASE (optimized output)
// quality : WebP quality 0-100
// maxW : resize to this max width (px) if image is wider; null = no resize
// ─────────────────────────────────────────────────────────────────────────────
const IMAGE_MAP = [

  // ── LOGOS ──────────────────────────────────────────────────────────────────
  {
    src:     'B&Blogo.jpeg',
    out:     'assets/images/bb-dubai-logo.webp',
    quality: 85,
    maxW:    300,
    alt:     'B&B Dubai Advertising LLC logo',
  },

  // ── GALLERY — SIGNAGE ──────────────────────────────────────────────────────
  {
    src:     'assets/images/komachime/SIGN BOARDS/signage.jpg',
    out:     'assets/images/gallery/signage-led-board.webp',
    quality: 78, maxW: 1400,
    alt:     'LED signage board installation Dubai',
  },
  {
    src:     'assets/images/komachime/SIGN BOARDS/Aster.jpg',
    out:     'assets/images/gallery/signage-aster-hospital.webp',
    quality: 78, maxW: 1400,
    alt:     'Aster hospital exterior signage',
  },
  {
    src:     'assets/images/komachime/SIGN BOARDS/SULTAN-01.png',
    out:     'assets/images/gallery/signage-sultan-branding.webp',
    quality: 80, maxW: 1400,
    alt:     'Sultan retail branding signage',
  },
  {
    src:     'assets/images/komachime/SIGN BOARDS/Final.jpg',
    out:     'assets/images/gallery/signage-storefront.webp',
    quality: 78, maxW: 1400,
    alt:     'Fabricated storefront sign board',
  },
  {
    src:     'assets/images/komachime/SIGN BOARDS/zain.jpg',
    out:     'assets/images/gallery/signage-zain-telecom.webp',
    quality: 78, maxW: 1400,
    alt:     'Zain telecom signage installation',
  },
  {
    src:     'assets/images/komachime/SIGN BOARDS/AGCARS.png',
    out:     'assets/images/gallery/signage-agcars.webp',
    quality: 80, maxW: 1400,
    alt:     'AG Cars dealership signage',
  },
  {
    src:     'assets/images/komachime/SIGN BOARDS/Reception Sign.jpg',
    out:     'assets/images/gallery/signage-reception.webp',
    quality: 78, maxW: 1400,
    alt:     'Corporate reception sign board',
  },
  {
    src:     'assets/images/komachime/LED FACADES/rakez.png',
    out:     'assets/images/gallery/led-facade-rakez.webp',
    quality: 82, maxW: 1400,
    alt:     'RAKEZ LED building facade daytime',
  },
  {
    src:     'assets/images/komachime/LED FACADES/RAKEZ RED.png',
    out:     'assets/images/gallery/led-facade-rakez-illuminated.webp',
    quality: 82, maxW: 1400,
    alt:     'RAKEZ LED building facade illuminated night',
  },
  {
    src:     'assets/images/komachime/DIRECTIONAL SIGNAGE/SJHUFJUN.png',
    out:     'assets/images/gallery/directional-signage-wayfinding.webp',
    quality: 80, maxW: 1400,
    alt:     'Directional wayfinding signage system',
  },

  // ── GALLERY — PRINTING ─────────────────────────────────────────────────────
  {
    src:     'assets/images/komachime/PRINTING/Cahai kappi front.jpg',
    out:     'assets/images/gallery/printing-cafe-branding.webp',
    quality: 78, maxW: 1400,
    alt:     'Cafe brand printed graphics packaging',
  },
  {
    src:     'assets/images/komachime/PRINTING/30258560059229078_f8d0.jpg',
    out:     'assets/images/gallery/printing-large-format.webp',
    quality: 78, maxW: 1400,
    alt:     'Large format digital print output',
  },
  {
    src:     'assets/images/komachime/PRINTING/WhatsApp Image 2025-01-14 at 11.26.47 AM.jpeg',
    out:     'assets/images/gallery/printing-digital-print.webp',
    quality: 78, maxW: 1400,
    alt:     'Digital printing project Dubai',
  },
  {
    src:     'assets/images/komachime/PRINTING/WhatsApp Image 2025-02-05 at 8.09.48 AM.jpeg',
    out:     'assets/images/gallery/printing-banner-display.webp',
    quality: 78, maxW: 1400,
    alt:     'Printed banner and display stand',
  },
  {
    src:     'assets/images/komachime/PRINTING/WhatsApp Image 2026-02-21 at 08.35.42.jpeg',
    out:     'assets/images/gallery/printing-outdoor.webp',
    quality: 78, maxW: 1400,
    alt:     'Outdoor weatherproof print signage',
  },

  // ── GALLERY — VEHICLE GRAPHICS ─────────────────────────────────────────────
  {
    src:     'assets/images/komachime/VEHICLE GRAPHICS/BigBus.jpg',
    out:     'assets/images/gallery/vehicle-big-bus-wrap.webp',
    quality: 78, maxW: 1400,
    alt:     'Big Bus Dubai full vehicle wrap',
  },
  {
    src:     'assets/images/komachime/VEHICLE GRAPHICS/DUBAI TAXI.png',
    out:     'assets/images/gallery/vehicle-dubai-taxi-wrap.webp',
    quality: 80, maxW: 1400,
    alt:     'Dubai Taxi vehicle graphics branding',
  },
  {
    src:     'assets/images/komachime/VEHICLE GRAPHICS/mockup.jpg',
    out:     'assets/images/gallery/vehicle-wrap-mockup.webp',
    quality: 78, maxW: 1400,
    alt:     'Vehicle wrap design mockup rendering',
  },
  {
    src:     'assets/images/komachime/VEHICLE GRAPHICS/BIKE INSTALL.jpg',
    out:     'assets/images/gallery/vehicle-bike-graphics.webp',
    quality: 78, maxW: 1400,
    alt:     'Bike graphics vinyl installation',
  },
  {
    src:     'assets/images/komachime/VEHICLE GRAPHICS/side 1.jpg',
    out:     'assets/images/gallery/vehicle-side-wrap-1.webp',
    quality: 78, maxW: 1400,
    alt:     'Commercial vehicle side graphics wrap',
  },
  {
    src:     'assets/images/komachime/VEHICLE GRAPHICS/side 2.jpg',
    out:     'assets/images/gallery/vehicle-side-wrap-2.webp',
    quality: 78, maxW: 1400,
    alt:     'Vehicle branding side panel wrap',
  },

  // ── GALLERY — RACKING & STORAGE ────────────────────────────────────────────
  {
    src:     'assets/images/komachime/RACKING & SHELVING/racking.jpg',
    out:     'assets/images/gallery/racking-warehouse-system.webp',
    quality: 78, maxW: 1400,
    alt:     'Industrial warehouse racking system',
  },
  {
    src:     'assets/images/komachime/RACKING & SHELVING/racking 2.jpg',
    out:     'assets/images/gallery/racking-selective-pallet.webp',
    quality: 78, maxW: 1400,
    alt:     'Selective pallet racking installation',
  },
  {
    src:     'assets/images/komachime/RACKING & SHELVING/racking 3.jpg',
    out:     'assets/images/gallery/racking-high-bay-storage.webp',
    quality: 78, maxW: 1400,
    alt:     'High bay storage racking Dubai',
  },
  {
    src:     'assets/images/komachime/RACKING & SHELVING/image-5-scaled.jpg',
    out:     'assets/images/gallery/racking-mezzanine-floor.webp',
    quality: 78, maxW: 1400,
    alt:     'Warehouse mezzanine floor system',
  },
  {
    src:     'assets/images/komachime/RACKING & SHELVING/19071506040813.jpg',
    out:     'assets/images/gallery/racking-storage-installation.webp',
    quality: 78, maxW: 1400,
    alt:     'Storage racking installation UAE',
  },

  // ── GALLERY — INTERIORS ────────────────────────────────────────────────────
  {
    src:     'assets/images/komachime/interior design/interior.jpg',
    out:     'assets/images/gallery/interior-office-fit-out.webp',
    quality: 78, maxW: 1400,
    alt:     'Commercial office interior fit-out',
  },
  {
    src:     'assets/images/komachime/interior design/ceiling.jpg',
    out:     'assets/images/gallery/interior-ceiling-design.webp',
    quality: 78, maxW: 1400,
    alt:     'Decorative ceiling design installation',
  },
  {
    src:     'assets/images/komachime/interior design/ceiling 2.jpg',
    out:     'assets/images/gallery/interior-ceiling-installation.webp',
    quality: 78, maxW: 1400,
    alt:     'Commercial ceiling cladding project',
  },
  {
    src:     'assets/images/komachime/FLOORING/flooring.jpg',
    out:     'assets/images/gallery/flooring-commercial-vinyl.webp',
    quality: 78, maxW: 1400,
    alt:     'Commercial vinyl flooring installation',
  },
  {
    src:     'assets/images/komachime/OFFICE SETUP/Office-Mezzanine-in-Warehouse-scaled.jpg',
    out:     'assets/images/gallery/interior-office-mezzanine.webp',
    quality: 78, maxW: 1400,
    alt:     'Office mezzanine setup in warehouse',
  },
  {
    src:     'assets/images/komachime/FLOORING/carpet.jpg',
    out:     'assets/images/gallery/flooring-carpet-tile.webp',
    quality: 78, maxW: 1400,
    alt:     'Carpet tile flooring for office',
  },

  // ── GALLERY — EVENTS ───────────────────────────────────────────────────────
  {
    // 16 MB source — heavy resize + compress
    src:     'assets/images/komachime/EXHIBITION & EVENTS/conmix.jpg',
    out:     'assets/images/gallery/events-conmix-exhibition.webp',
    quality: 72, maxW: 1200,
    alt:     'Conmix exhibition stand design and build',
  },
  {
    src:     'assets/images/komachime/EXHIBITION & EVENTS/Ramsan stand.jpg',
    out:     'assets/images/gallery/events-exhibition-stand.webp',
    quality: 78, maxW: 1400,
    alt:     'Custom exhibition stand construction',
  },
  {
    src:     'assets/images/komachime/EXHIBITION & EVENTS/WhatsApp Image 2026-03-06 at 09.39.01.jpeg',
    out:     'assets/images/gallery/events-trade-show-display.webp',
    quality: 78, maxW: 1400,
    alt:     'Trade show display setup Dubai',
  },

  // ── CLIENT LOGOS ───────────────────────────────────────────────────────────
  { src: 'assets/images/OUR CLIENTS/AL GHURAIR.png',      out: 'assets/images/clients/client-al-ghurair.webp',       quality: 85, maxW: 400, alt: 'Al Ghurair logo' },
  { src: 'assets/images/OUR CLIENTS/AL KHAYAM.png',       out: 'assets/images/clients/client-al-khayam.webp',        quality: 85, maxW: 400, alt: 'Al Khayam logo' },
  { src: 'assets/images/OUR CLIENTS/AL RASHIDEEN.png',    out: 'assets/images/clients/client-al-rashideen.webp',     quality: 85, maxW: 400, alt: 'Al Rashideen logo' },
  { src: 'assets/images/OUR CLIENTS/ASTER.png',           out: 'assets/images/clients/client-aster-hospitals.webp',  quality: 85, maxW: 400, alt: 'Aster Hospitals logo' },
  { src: 'assets/images/OUR CLIENTS/BIG BUS.png',         out: 'assets/images/clients/client-big-bus-dubai.webp',    quality: 85, maxW: 400, alt: 'Big Bus Dubai logo' },
  { src: 'assets/images/OUR CLIENTS/CAR TAXI.png',        out: 'assets/images/clients/client-car-taxi.webp',         quality: 85, maxW: 400, alt: 'Car Taxi logo' },
  { src: 'assets/images/OUR CLIENTS/CONMIX.png',          out: 'assets/images/clients/client-conmix.webp',           quality: 85, maxW: 400, alt: 'Conmix Ltd logo' },
  { src: 'assets/images/OUR CLIENTS/D TAXI.png',          out: 'assets/images/clients/client-dubai-taxi.webp',       quality: 85, maxW: 400, alt: 'Dubai Taxi logo' },
  { src: 'assets/images/OUR CLIENTS/DCC.png',             out: 'assets/images/clients/client-dubai-contracting.webp',quality: 85, maxW: 400, alt: 'Dubai Contracting Company logo' },
  { src: 'assets/images/OUR CLIENTS/deep sea logo.png',   out: 'assets/images/clients/client-deep-sea-food.webp',    quality: 85, maxW: 400, alt: 'Deep Sea Food Company logo' },
  { src: 'assets/images/OUR CLIENTS/ECC.png',             out: 'assets/images/clients/client-ecc.webp',              quality: 85, maxW: 400, alt: 'ECC logo' },
  { src: 'assets/images/OUR CLIENTS/GERMAN.png',          out: 'assets/images/clients/client-german-gulf.webp',      quality: 85, maxW: 400, alt: 'German Gulf Enterprises logo' },
  { src: 'assets/images/OUR CLIENTS/GMGT.png',            out: 'assets/images/clients/client-gmgt.webp',             quality: 85, maxW: 400, alt: 'GMGT logo' },
  { src: 'assets/images/OUR CLIENTS/KSB.png',             out: 'assets/images/clients/client-ksb-energy.webp',       quality: 85, maxW: 400, alt: 'KSB World Class Energy logo' },
  { src: 'assets/images/OUR CLIENTS/MDT.png',             out: 'assets/images/clients/client-mdt.webp',              quality: 85, maxW: 400, alt: 'MDT logo' },
  { src: 'assets/images/OUR CLIENTS/MUNCIPALITY.png',     out: 'assets/images/clients/client-dubai-municipality.webp',quality: 85, maxW: 400, alt: 'Dubai Municipality logo' },
  { src: 'assets/images/OUR CLIENTS/ROMANA.png',          out: 'assets/images/clients/client-romana-water.webp',     quality: 85, maxW: 400, alt: 'Romana Water logo' },
  { src: 'assets/images/OUR CLIENTS/SONAS.png',           out: 'assets/images/clients/client-sonas.webp',            quality: 85, maxW: 400, alt: 'Sonas logo' },
  { src: 'assets/images/OUR CLIENTS/TALAL.png',           out: 'assets/images/clients/client-talal-group.webp',      quality: 85, maxW: 400, alt: 'Talal Group logo' },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function fmt(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return Math.round(bytes / 1024) + ' KB';
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🚀  Komachi Image Optimizer\n' + '─'.repeat(60));

  const log    = [];
  let totalIn  = 0;
  let totalOut = 0;
  let errors   = 0;

  for (const item of IMAGE_MAP) {
    const srcAbs = path.join(BASE, item.src);
    const outAbs = path.join(BASE, item.out);

    // Ensure output dir exists
    fs.mkdirSync(path.dirname(outAbs), { recursive: true });

    if (!fs.existsSync(srcAbs)) {
      console.error(`  ✗  NOT FOUND: ${item.src}`);
      errors++;
      log.push({ src: item.src, out: item.out, error: 'Source not found' });
      continue;
    }

    const srcSize = fs.statSync(srcAbs).size;

    try {
      let pipeline = sharp(srcAbs).rotate(); // auto-fix EXIF orientation

      if (item.maxW) {
        pipeline = pipeline.resize(item.maxW, null, { withoutEnlargement: true });
      }

      await pipeline
        .webp({ quality: item.quality, effort: 4 })
        .toFile(outAbs);

      const outSize = fs.statSync(outAbs).size;
      const saved   = srcSize - outSize;
      const pct     = ((saved / srcSize) * 100).toFixed(1);

      totalIn  += srcSize;
      totalOut += outSize;

      const tag = saved > 0 ? '✓' : '~';
      const label = path.basename(item.out).padEnd(42);
      console.log(`  ${tag}  ${label}  ${fmt(srcSize).padStart(8)} → ${fmt(outSize).padStart(7)}  (${pct}% saved)`);

      log.push({
        src:     item.src,
        out:     item.out,
        alt:     item.alt,
        srcSize: fmt(srcSize),
        outSize: fmt(outSize),
        saved:   pct + '%',
      });

    } catch (err) {
      console.error(`  ✗  ERROR: ${item.src}\n     ${err.message}`);
      errors++;
      log.push({ src: item.src, out: item.out, error: err.message });
    }
  }

  // ── Write JSON map ──────────────────────────────────────────────────────────
  const mapPath = path.join(BASE, 'scripts', 'image-map.json');
  fs.writeFileSync(mapPath, JSON.stringify(log, null, 2));

  // ── Summary ─────────────────────────────────────────────────────────────────
  const totalSaved = totalIn - totalOut;
  console.log('\n' + '─'.repeat(60));
  console.log(`  Images processed : ${IMAGE_MAP.length - errors} / ${IMAGE_MAP.length}`);
  console.log(`  Errors           : ${errors}`);
  console.log(`  Total input      : ${fmt(totalIn)}`);
  console.log(`  Total output     : ${fmt(totalOut)}`);
  console.log(`  Total saved      : ${fmt(totalSaved)} (${((totalSaved / totalIn) * 100).toFixed(1)}%)`);
  console.log(`  Map written to   : scripts/image-map.json`);
  console.log('─'.repeat(60) + '\n');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
