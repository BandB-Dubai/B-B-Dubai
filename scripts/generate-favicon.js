#!/usr/bin/env node
/**
 * Generate favicons from assets/images/komachi-logo.png
 * Run: node scripts/generate-favicon.js
 *
 * Outputs (all in project root):
 *   favicon-16x16.png
 *   favicon-32x32.png
 *   apple-touch-icon.png  (180×180)
 *   favicon.ico           (32×32 raw RGBA wrapped as .ico)
 */

const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const ROOT = path.join(__dirname, '..');
const SRC  = path.join(ROOT, 'assets', 'images', 'komachi-logo.png');

async function run() {
  if (!fs.existsSync(SRC)) {
    console.error('Source not found:', SRC);
    process.exit(1);
  }

  const tasks = [
    { size: 16,  out: 'favicon-16x16.png' },
    { size: 32,  out: 'favicon-32x32.png'  },
    { size: 180, out: 'apple-touch-icon.png' },
  ];

  for (const { size, out } of tasks) {
    const dest = path.join(ROOT, out);
    await sharp(SRC)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(dest);
    const kb = (fs.statSync(dest).size / 1024).toFixed(1);
    console.log(`  ✓  ${out}  (${size}×${size}, ${kb} KB)`);
  }

  // favicon.ico — write a minimal ICO file containing the 32×32 PNG
  // ICO format: ICONDIR (6 bytes) + ICONDIRENTRY (16 bytes) + PNG data
  const pngBuf = await sharp(SRC)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);  // reserved
  icoHeader.writeUInt16LE(1, 2);  // type: ICO
  icoHeader.writeUInt16LE(1, 4);  // image count

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);            // width  (0 = 256)
  entry.writeUInt8(32, 1);            // height
  entry.writeUInt8(0, 2);             // color count
  entry.writeUInt8(0, 3);             // reserved
  entry.writeUInt16LE(1, 4);          // color planes
  entry.writeUInt16LE(32, 6);         // bits per pixel
  entry.writeUInt32LE(pngBuf.length, 8);  // image size
  entry.writeUInt32LE(22, 12);        // offset to image data (6 + 16)

  const icoBuf = Buffer.concat([icoHeader, entry, pngBuf]);
  const icoDest = path.join(ROOT, 'favicon.ico');
  fs.writeFileSync(icoDest, icoBuf);
  const icoKb = (icoBuf.length / 1024).toFixed(1);
  console.log(`  ✓  favicon.ico  (32×32, ${icoKb} KB)`);

  console.log('\nAll favicons generated.');
}

run().catch(err => { console.error(err); process.exit(1); });
