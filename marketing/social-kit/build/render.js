#!/usr/bin/env node
// Renders each .piece of src/kit.html at its own size (viewport = piece size, so large banners are captured whole).
const path = require('path');
const { chromium } = (() => { for (const m of ['/opt/node22/lib/node_modules/playwright', 'playwright']) { try { return require(m); } catch (e) {} } throw new Error('no playwright'); })();
(async () => {
  const kit = path.resolve(__dirname, '..');
  const pieces = require(path.join(kit, 'src', 'pieces.json'));
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  for (const p of pieces) {
    const page = await b.newPage({ viewport: { width: p.w, height: p.h } });
    await page.goto('file://' + path.join(kit, 'src', 'kit.html'), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(id => { for (const s of document.querySelectorAll('.piece')) s.style.display = s.id === id ? 'flex' : 'none'; }, p.f);
    await page.screenshot({ path: path.join(kit, p.f), clip: { x: 0, y: 0, width: p.w, height: p.h } });
    await page.close();
  }
  await b.close();
  console.log(pieces.length + ' pieces rendered');
})();
