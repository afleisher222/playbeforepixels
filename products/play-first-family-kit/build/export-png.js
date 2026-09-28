// Canva-ready PNGs of every blank/fillable page, named by page key.
//   node export-png.js <in.html> <outdir> <suffix> [scale]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'); const fs = require('fs');
(async () => {
  const [inp, dir, suf, sc] = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: +(sc || 2.5) });
  await p.goto('file://' + path.resolve(inp), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  fs.mkdirSync(dir, { recursive: true });
  const els = await p.$$('.page.canva');
  const names = { clBlank: 'checklist-blank-tomato-monday', board: 'play-first-board', helpB: 'helping-jobs-blank-monday', helpEnd: 'helping-jobs-blank-sunday', choresB: 'family-jobs-blank-monday', choresEnd: 'family-jobs-blank-sunday', tokensB: 'together-tokens-blank', posterB: 'family-play-rules-blank', plan: 'family-plan-1', plan2: 'family-plan-2', plan3: 'family-plan-3', trackerB: '30-day-tracker-blank' };
  for (const el of els) {
    const k = await el.getAttribute('data-key');
    const m = k.match(/^clBlank(tomato|sky|grass|plum)(mon|sun)$/);
    const n = names[k] || (m ? `checklist-blank-${m[1]}-${m[2] === 'mon' ? 'monday' : 'sunday'}` : k);
    await el.screenshot({ path: path.join(dir, `${n}-${suf}.png`) });
  }
  console.log(els.length + ' PNGs -> ' + dir);
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
