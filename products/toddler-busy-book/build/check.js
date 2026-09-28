// QA for the Toddler Busy Book. node build/check.js <file.html>
// Checks: every page's .live content stays inside the live area; grown-up boxes don't overflow;
// every cut piece is >= 1.75 in on its shortest side; every activity page has a talk line and a safety note;
// banned words never appear.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const BANNED = /\b(therapy|therapist|autism|autistic|adhd|speech delay|late talker|catch up|clinically|cure|heal|reverse|diagnos(?!e, treat)|rewir|addict|toxic|zombie|safety-checked|certified|safe for all ages)\b/i;
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const page = await browser.newPage({ viewport: { width: 1000, height: 1200 } });
  await page.goto('file://' + path.resolve(process.argv[2]), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const res = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('.page').forEach((pg, i) => {
      const n = i + 1, live = pg.querySelector('.live'); if (!live) return;
      const L = live.getBoundingClientRect();
      live.querySelectorAll('*').forEach(el => {
        if (el.closest('svg') && el.tagName.toLowerCase() !== 'svg') return;
        const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
        if (el.closest('.play') || el.closest('.grid') || el.closest('.cover-bg')) return;
        if (r.right > L.right + 1.5 || r.bottom > L.bottom + 1.5 || r.left < L.left - 1.5 || r.top < L.top - 1.5) out.push({ page: n, el: el.className || el.tagName, over: [Math.round(r.right - L.right), Math.round(r.bottom - L.bottom)] });
      });
      live.querySelectorAll('.box,.talk,.card,.qa div,.fl').forEach(el => { if (el.scrollHeight > el.clientHeight + 2) out.push({ page: n, overflow: el.className, by: el.scrollHeight - el.clientHeight }); });
      const gu = live.querySelector('.gu'), ft = live.querySelector('.ft');
      if (gu && ft) { const last = [...gu.children].pop().getBoundingClientRect(); if (last.bottom > ft.getBoundingClientRect().top - 2) out.push({ page: n, guOverlapsFooter: Math.round(last.bottom - ft.getBoundingClientRect().top) }); }
      if (pg.dataset.act) { if (!live.querySelector('.talk q')) out.push({ page: n, missing: 'talk line' }); if (!/Play together/.test(live.querySelector('.safe')?.textContent || '')) out.push({ page: n, missing: 'supervision note' }); }
      const how = live.querySelector('.tt'), play = live.querySelector('.play');
      if (how && play && how.getBoundingClientRect().bottom > play.getBoundingClientRect().top - 6) out.push({ page: n, titleTouchesPlay: Math.round(how.getBoundingClientRect().bottom - play.getBoundingClientRect().top) });
      // every piece's art must stay inside its own cut cell (nothing crosses a cut line)
      live.querySelectorAll('svg.pieces').forEach(sv => { const cw = +sv.dataset.cellW, ch = +sv.dataset.cellH; [...sv.children].filter(g => g.tagName === 'g' && g.getAttribute('transform') && !g.querySelector('[clip-path]')).forEach((g, k) => { const b = g.getBBox(); if (b.x < -1 || b.y < -1 || b.x + b.width > cw + 1 || b.y + b.height > ch + 1) out.push({ page: n, pieceArtCrossesCut: k + 1, bbox: [b.x, b.y, b.width, b.height].map(Math.round) }); }); });
      const keep = live.querySelector('.keep'), grid = live.querySelector('.grid');
      if (keep && grid && grid.getBoundingClientRect().bottom - 10 > keep.getBoundingClientRect().top - 4) out.push({ page: n, gridOverlapsKeep: true });
    });
    const pieces = [...document.querySelectorAll('svg.pieces')].map(s => Math.min(+s.dataset.cellW, +s.dataset.cellH) / 96);
    if (document.body.classList.contains('etsy')) { if (/playbeforepixels\.com|https?:/i.test(document.body.innerText)) out.push({ etsyEditionShowsUrl: true }); if ([...document.querySelectorAll('svg.qr')].some(q => q.getClientRects().length)) out.push({ etsyEditionShowsQr: true }); }
    return { out, pages: document.querySelectorAll('.page').length, minPieceIn: Math.min(...pieces), sheets: pieces.length, text: document.body.innerText };
  });
  const bad = res.text.match(new RegExp(BANNED.source, 'gi'));
  console.log(JSON.stringify({ pages: res.pages, sheets: res.sheets, minPieceIn: res.minPieceIn, problems: res.out.slice(0, 40), problemCount: res.out.length, bannedWords: bad || [] }, null, 1));
  await browser.close();
  if (res.minPieceIn < 1.75 || res.out.length || bad) process.exitCode = 1;
})();
