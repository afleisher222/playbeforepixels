// Measures the play-21 card in the Letter color edition so listing image 2's callouts point at the right rows.
//   node measure.js   (make.sh runs it after book.js, before extras.js) -> anatomy.json
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'); const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const pg = await b.newPage({ viewport: { width: 1000, height: 1200 } });
  await pg.goto('file://' + path.join(__dirname, '..', 'source-color-letter.html'), { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  const r = await pg.evaluate(() => {
    const card = document.getElementById('play-21'); const page = card.closest('.page');
    const P = page.getBoundingClientRect();
    const mid = sel => { const e = card.querySelector(sel).getBoundingClientRect(); return Math.round((e.top + e.bottom) / 2 - P.top); };
    const c = card.getBoundingClientRect();
    return { page: +page.dataset.page, top: Math.round(c.top - P.top), bottom: Math.round(c.bottom - P.top), kicker: mid('.kicker'), meta: mid('.meta'), how: mid('.how'), eh: mid('.eh'), talk: mid('.talk'), safe: mid('.safe') };
  });
  fs.writeFileSync(path.join(__dirname, 'anatomy.json'), JSON.stringify(r));
  console.log('anatomy', JSON.stringify(r));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
