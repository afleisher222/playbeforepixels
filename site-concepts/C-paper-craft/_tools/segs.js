// Review helper: full-page screenshot split into viewport-height segments.
// usage: node _tools/segs.js <page.html[?query]> <outprefix> <width> <segHeight> [scale]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
(async () => {
  const [input, out, w, sh, sc] = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const p = await b.newPage({ viewport: { width: +w, height: +sh }, deviceScaleFactor: +(sc || 1) });
  const [file, q] = input.split('?');
  await p.goto('file://' + path.resolve(file) + (q ? '?' + q : ''), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const sw = await p.evaluate(() => document.documentElement.scrollWidth);
  console.log('height', H, 'scrollWidth', sw);
  let i = 0;
  for (let y = 0; y < H; y += +sh) { await p.screenshot({ path: `${out}-${String(++i).padStart(2, '0')}.png`, fullPage: true, clip: { x: 0, y, width: +w, height: Math.min(+sh, H - y) } }); }
  console.log(i, 'segments');
  await b.close();
})();
