// QA: finds cards and pages whose content overflows or runs off.  node build/check.js <file.html> [more.html ...]
// Checks: card body vs flags/footer, header / meta / flag rows running out of the card, 3-line titles,
// content pages (.cpin) that overflow, and any element whose text is wider than its box.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  let bad = 0;
  for (const f of process.argv.slice(2)) {
    const page = await browser.newPage();
    await page.goto('file://' + path.resolve(f), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const res = await page.evaluate(() => {
      const out = []; let minSlack = 999;
      document.querySelectorAll('.card:not(.back)').forEach((c, i) => {
        if (c.closest('.fan') || c.classList.contains('marked')) return; // rotated cover fan / annotated sample
        const p = c.querySelector('.panel'); const bd = c.querySelector('.bd'); const fl = c.querySelector('.fl');
        const pr = p.getBoundingClientRect(), br = bd.getBoundingClientRect(), fr = fl.getBoundingClientRect(), ft = c.querySelector('.ft').getBoundingClientRect();
        const slack = fr.top - br.bottom; minSlack = Math.min(minSlack, slack);
        const t = (c.querySelector('h3') || {}).textContent || '(blank)';
        if (slack < 3 || ft.bottom > pr.bottom + 0.5) out.push({ i, t, slack: Math.round(slack) });
        const h3 = c.querySelector('h3'); if (h3 && h3.getBoundingClientRect().height > 40) out.push({ i, t, titleLines: 3 });
        for (const sel of ['.hd', '.meta', '.fl']) { const e = c.querySelector(sel); if (e && e.scrollWidth > e.clientWidth + 1) out.push({ i, t, wide: sel, by: e.scrollWidth - e.clientWidth }); }
        c.querySelectorAll('.age,.en,.fg').forEach(e => { if (e.scrollWidth > e.clientWidth + 1) out.push({ i, t, wide: e.className }); });
      });
      const pages = [];
      document.querySelectorAll('.page').forEach((pg, pi) => {
        const c = pg.querySelector('.cpin');
        if (c && c.scrollHeight > c.clientHeight + 1) pages.push({ page: pi + 1, over: c.scrollHeight - c.clientHeight });
        const r = pg.getBoundingClientRect();
        pg.querySelectorAll('h1,h2,h3,h4,p,span,b,div').forEach(e => {
          if (e.closest('.card')) return;
          const q = e.getBoundingClientRect(); if (!q.width) return;
          if (q.right > r.right + 1 || q.bottom > r.bottom + 1 || q.left < r.left - 1) pages.push({ page: pi + 1, offPage: e.className || e.tagName, text: (e.textContent || '').slice(0, 40) });
        });
      });
      return { out, minSlack: Math.round(minSlack), pages: pages.slice(0, 30) };
    });
    const n = res.out.length + res.pages.length; bad += n;
    console.log(path.basename(f), n ? 'PROBLEMS' : 'ok', 'minSlack', res.minSlack, n ? JSON.stringify({ cards: res.out, pages: res.pages }, null, 1) : '');
    await page.close();
  }
  await browser.close();
  process.exit(bad ? 1 : 0);
})();
