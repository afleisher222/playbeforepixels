// QA: finds content that runs into the footer zone or off the page, and measures every cut piece.
//   node check.js out/*.html
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  let bad = 0;
  for (const f of process.argv.slice(2)) {
    const p = await b.newPage({ viewport: { width: 1400, height: 1000 } });
    await p.emulateMedia({ media: 'print' });
    await p.goto('file://' + path.resolve(f), { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const res = await p.evaluate(() => {
      const out = []; const cut = [];
      document.querySelectorAll('.page').forEach((pg, i) => {
        const pr = pg.getBoundingClientRect(); const limitB = pr.bottom - 0.47 * 96, limitR = pr.right - 0.45 * 96, limitL = pr.left + 0.45 * 96, limitT = pr.top + 0.45 * 96;
        pg.querySelectorAll('*').forEach(el => {
          if (el.closest('.ft') || el.closest('svg') && el.tagName !== 'svg') return;
          const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
          if (r.bottom > limitB + 1 || r.right > limitR + 1 || r.left < limitL - 1 || r.top < limitT - 1) out.push(`p${i + 1} ${el.tagName}.${(el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || ''} b=${((r.bottom - pr.top) / 96).toFixed(2)} r=${((r.right - pr.left) / 96).toFixed(2)}`);
          if (el.scrollHeight > el.clientHeight + 2 && getComputedStyle(el).overflow !== 'visible' && el.tagName !== 'svg') out.push(`p${i + 1} overflow ${el.className}`);
        });
        pg.querySelectorAll('[data-cut]').forEach(el => { const r = el.getBoundingClientRect(); cut.push(Math.min(r.width, r.height) / 96); });
      });
      return { out, minCut: cut.length ? Math.min(...cut) : null, nCut: cut.length };
    });
    const uniq = [...new Set(res.out)];
    console.log(path.basename(f), uniq.length ? 'ISSUES' : 'ok', res.nCut ? `cut pieces ${res.nCut}, smallest ${res.minCut.toFixed(3)} in` : '');
    uniq.slice(0, 15).forEach(x => console.log('   ', x)); bad += uniq.length;
    await p.close();
  }
  await b.close(); process.exit(bad ? 1 : 0);
})();
