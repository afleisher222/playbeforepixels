// Batch renderer: the same Chromium and settings as brand/render.js ("pdf", "pages", "png"), run as one
// browser session for many files, plus two extras: a tagged (accessible) PDF, and a measurement of every
// [data-field] box so finish.py can add real form fields.
//   node render.js jobs.json
// jobs.json: [{ "html": "...", "pdf": "...", "fields": "...json", "pages": {"dir": "...", "scale": 1},
//               "png": {"out": "...", "w": 1600, "h": 1200, "scale": 1} }, ...]
'use strict';
const path = require('path');
const fs = require('fs');
const { chromium } = (() => {
  for (const m of ['/opt/node22/lib/node_modules/playwright', 'playwright']) { try { return require(m); } catch (e) { /* next */ } }
  throw new Error('Playwright not found: run bash ops/cloud/bootstrap.sh');
})();

(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  for (const j of jobs) {
    const url = 'file://' + path.resolve(j.html);
    if (j.pdf || j.fields) {
      const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
      await page.emulateMedia({ media: 'print' });
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      if (j.fields) {
        const fields = await page.evaluate(() => {
          const pages = [...document.querySelectorAll('.page')];
          return [...document.querySelectorAll('[data-field]')].map(el => {
            const pg = el.closest('.page'); const pi = pages.indexOf(pg);
            const pr = pg.getBoundingClientRect(), r = el.getBoundingClientRect(); const k = 0.75;
            return { name: el.dataset.field, type: el.dataset.ftype || 'text', size: +(el.dataset.fsize || 0), multi: !!el.dataset.multi,
              align: el.dataset.falign === undefined ? 0 : +el.dataset.falign, page: pi,
              x0: (r.left - pr.left) * k, y0: (r.top - pr.top) * k, x1: (r.right - pr.left) * k, y1: (r.bottom - pr.top) * k };
          });
        });
        const seen = new Set();
        for (const f of fields) { if (seen.has(f.name)) throw new Error(`${j.html}: duplicate field ${f.name}`); seen.add(f.name); }
        fs.writeFileSync(j.fields, JSON.stringify(fields));
      }
      if (j.pdf) await page.pdf({ path: j.pdf, printBackground: true, preferCSSPageSize: true, tagged: true });
      await page.close();
    }
    if (j.pages) {
      const s = j.pages.scale || 1;
      const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: s });
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      fs.mkdirSync(j.pages.dir, { recursive: true });
      for (const f of fs.readdirSync(j.pages.dir)) if (/^p\d+\.png$/.test(f)) fs.unlinkSync(path.join(j.pages.dir, f));
      const els = await page.$$(j.pages.selector || '.page');
      for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: path.join(j.pages.dir, `p${String(i + 1).padStart(2, '0')}.png`) });
      await page.close();
    }
    if (j.png) {
      const page = await browser.newPage({ viewport: { width: j.png.w, height: j.png.h }, deviceScaleFactor: j.png.scale || 1 });
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: j.png.out });
      await page.close();
    }
    process.stdout.write('.');
  }
  await browser.close();
  console.log(` ${jobs.length} job(s)`);
})().catch(e => { console.error(e); process.exit(1); });
