#!/usr/bin/env node
// Layout check: in every pin (or social-kit piece), nothing in .art/header overlaps the footer, and nothing leaves the frame.
//   node marketing/pins/build/check-layout.js <file.html> <selector>
const path = require('path');
const { chromium } = (() => { for (const m of ['/opt/node22/lib/node_modules/playwright', 'playwright']) { try { return require(m); } catch (e) {} } throw new Error('no playwright'); })();
(async () => {
  const [file, sel = '.pin'] = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const p = await b.newPage({ viewport: { width: 1400, height: 1000 } });
  await p.goto('file://' + path.resolve(file), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const bad = await p.evaluate(sel => {
    const out = [];
    for (const pin of document.querySelectorAll(sel)) {
      const pr = pin.getBoundingClientRect();
      const foot = pin.querySelector('footer');
      const fr = foot ? foot.getBoundingClientRect() : null;
      for (const el of pin.querySelectorAll('header *, .art *, .chips, .freeline, .sub, .safe')) {
        if (el.closest('footer')) continue;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        if (r.left < pr.left - 1 || r.right > pr.right + 1 || r.top < pr.top - 1 || r.bottom > pr.bottom + 1) out.push(`${pin.id}: ${el.className || el.tagName} leaves the frame`);
        else if (fr && r.bottom > fr.top + 2 && !el.classList.contains('shot')) out.push(`${pin.id}: ${el.className || el.tagName} overlaps the footer by ${Math.round(r.bottom - fr.top)}px`);
        else if (fr && el.classList.contains('shot') && r.bottom > fr.top + 30) out.push(`${pin.id}: image overlaps the footer by ${Math.round(r.bottom - fr.top)}px`);
      }
      for (const t of pin.querySelectorAll('h1,.sub,.q,.li-t b,.li-t em,.kick,.chips span,.thumbrow span')) if (t.scrollWidth > t.clientWidth + 1) out.push(`${pin.id}: text wider than its box: ${t.textContent.slice(0, 40)}`);
    }
    return [...new Set(out)];
  }, sel);
  await b.close();
  if (bad.length) { console.log('LAYOUT PROBLEMS\n' + bad.join('\n')); process.exit(1); }
  console.log('layout ok: ' + file);
})();
