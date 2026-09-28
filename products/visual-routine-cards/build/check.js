// QA: finds content that runs into the footer zone or off the page (safe zone 0.45 in), measures every cut piece
// (.cardwrap cards and .slabel storage labels) and fails if any is under 1.5 in (CUSTOMER-VOICE rule 18),
// and fails if an Etsy-edition file contains the website, the short link or a QR code (gate #16).
//   node check.js out/*.html
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'); const fs = require('fs');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  let bad = 0;
  for (const f of process.argv.slice(2)) {
    const src = fs.readFileSync(f, 'utf8');
    if (/etsy/.test(path.basename(f)) && /playbeforepixels\.com|QR code/i.test(src.replace(/<svg[^>]*aria-label="Play Before Pixels"/g, ''))) { console.log(path.basename(f), 'ETSY EDITION CONTAINS URL OR QR'); bad++; }
    const p = await b.newPage({ viewport: { width: 1400, height: 1000 } });
    await p.emulateMedia({ media: 'print' });
    await p.goto('file://' + path.resolve(f), { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const res = await p.evaluate(() => {
      const out = []; const cut = [];
      document.querySelectorAll('.page').forEach((pg, i) => {
        const pr = pg.getBoundingClientRect(); const limitB = pr.bottom - 0.45 * 96, limitR = pr.right - 0.45 * 96, limitL = pr.left + 0.45 * 96, limitT = pr.top + 0.45 * 96;
        pg.querySelectorAll('*').forEach(el => {
          if (el.closest('.foot') || (el.closest('svg') && el.tagName !== 'svg')) return;
          if (el.closest('.cardwrap') && !el.classList.contains('cardwrap')) return; // card internals are checked by the card's own box
          const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
          if (r.bottom > limitB + 1 || r.right > limitR + 1 || r.left < limitL - 1 || r.top < limitT - 1) out.push(`p${i + 1} ${el.tagName}.${(el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || ''} b=${((r.bottom - pr.top) / 96).toFixed(2)} r=${((r.right - pr.left) / 96).toFixed(2)}`);
          const cs = getComputedStyle(el);
          if (el.tagName !== 'svg' && cs.overflow !== 'visible' && !el.classList.contains('page') && !el.classList.contains('card') && el.scrollHeight > el.clientHeight + 2) out.push(`p${i + 1} overflow ${el.className}`);
        });
        // text that is wider than its box (clipped labels)
        pg.querySelectorAll('.card .lab, .tile, .band, .tipbar, .slabel, h1, h2, h3').forEach(el => { if (el.scrollWidth > el.clientWidth + 2) out.push(`p${i + 1} text wider than box: ${el.className || el.tagName} "${el.textContent.trim().slice(0, 30)}"`); });
        const fr = pg.querySelectorAll('.foot .fr'); fr.forEach(r => { if (r.scrollWidth > r.clientWidth + 1) out.push(`p${i + 1} footer too long`); });
        pg.querySelectorAll('.cardwrap, .slabel').forEach(el => { const r = el.getBoundingClientRect(); cut.push(Math.min(r.width, r.height) / 96); });
      });
      return { out, minCut: cut.length ? Math.min(...cut) : null, nCut: cut.length };
    });
    const uniq = [...new Set(res.out)];
    if (res.minCut !== null && res.minCut < 1.5) { uniq.push(`CUT PIECE UNDER 1.5 in: ${res.minCut.toFixed(3)} in`); }
    console.log(path.basename(f), uniq.length ? 'ISSUES' : 'ok', res.nCut ? `cut pieces ${res.nCut}, smallest ${res.minCut.toFixed(3)} in` : '');
    uniq.slice(0, 25).forEach(x => console.log('   ', x)); bad += uniq.length;
    await p.close();
  }
  await b.close(); process.exit(bad ? 1 : 0);
})();
