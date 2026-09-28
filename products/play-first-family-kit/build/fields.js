// Measures every [data-field] element (PDF points, top-left origin) so finish.py can add real form fields.
//   node fields.js <in.html> <out.json>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'); const fs = require('fs');
(async () => {
  const [inp, out] = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1400, height: 1000 } });
  await p.emulateMedia({ media: 'print' });
  await p.goto('file://' + path.resolve(inp), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const fields = await p.evaluate(() => {
    const pages = [...document.querySelectorAll('.page')];
    return [...document.querySelectorAll('[data-field]')].map(el => {
      const pg = el.closest('.page'); const pi = pages.indexOf(pg);
      const pr = pg.getBoundingClientRect(), r = el.getBoundingClientRect(); const k = 0.75;
      return { name: el.dataset.field + '_p' + (pi + 1), type: el.dataset.ftype || 'text', size: +(el.dataset.fsize || 0), multi: !!el.dataset.multi,
        align: el.dataset.falign === undefined ? 0 : +el.dataset.falign, page: pi,
        x0: (r.left - pr.left) * k, y0: (r.top - pr.top) * k, x1: (r.right - pr.left) * k, y1: (r.bottom - pr.top) * k };
    });
  });
  const names = new Set(); fields.forEach(f => { if (names.has(f.name)) throw new Error('duplicate ' + f.name); names.add(f.name); });
  fs.writeFileSync(out, JSON.stringify(fields)); console.log(path.basename(inp), fields.length + ' fields');
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
