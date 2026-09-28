// Canva-ready PNG export: every card, art-only (transparent), blank frames, chart backgrounds.
// node export-png.js <outdir>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'); const fs = require('fs');
const { card, CSS, DEFS, COLORWAYS } = require('./card.js');
const { CARDS, CATS } = require('./cards.js');
const { A } = require('./art.js');
const OUT = path.resolve(process.argv[2] || 'tmp/canva');
const font = path.resolve(__dirname, '../../../brand/fonts/fonts.css');
const colors = [['sun', 'morning'], ['tomato', 'meals'], ['sky', 'play'], ['grass', 'outside'], ['plum', 'reading'], ['ink', 'bedtime']];
const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="file://${font}"><style>${CSS}
body{background:transparent} .wrap{display:flex;flex-wrap:wrap;gap:8px;width:1300px}
.artonly{width:360px;height:300px;display:block}
.card .lab.empty{}
</style></head><body>${DEFS}
<div class="wrap">${CARDS.map((c, i) => `<div class="exp-card" data-name="${String(i + 1).padStart(3, '0')}-${c.id}">${card(c, 'rainbow')}</div>`).join('')}</div>
<div class="wrap">${CARDS.map((c, i) => `<svg class="artonly" data-name="${String(i + 1).padStart(3, '0')}-${c.id}" viewBox="0 0 120 100">${A[c.art]()}</svg>`).join('')}</div>
<div class="wrap">${COLORWAYS.flatMap(cw => (cw.id === 'rainbow' || cw.id === 'soft' ? colors : [['', 'words']]).map(([cn, cat]) => {
  const base = { id: 'b', cat, art: null, label: '' };
  const disc = `<svg class="art" viewBox="0 0 120 100"><circle class="disc" cx="60" cy="52" r="44"/></svg>`;
  const nm = `frame-${cw.id}${cn ? '-' + cn : ''}`;
  return `<div class="exp-frame" data-name="${nm}">${card(base, cw.id, { blankArt: true }).replace(/<svg class="art"[\s\S]*?<\/svg>/, disc)}</div>`;
})).join('')}</div>
</body></html>`;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = path.join(__dirname, 'tmp', 'export.html'); fs.writeFileSync(tmp, html);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 3 });
  await p.goto('file://' + tmp, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  await p.addStyleTag({ content: '.card .lab.blank.empty::after{display:none}' });
  const dirs = { cards: path.join(OUT, '1-cards-rainbow'), art: path.join(OUT, '2-art-only-transparent'), frames: path.join(OUT, '3-blank-card-frames') };
  Object.values(dirs).forEach(d => fs.mkdirSync(d, { recursive: true }));
  for (const el of await p.$$('.exp-card')) { const n = await el.getAttribute('data-name'); await (await el.$('.card')).screenshot({ path: path.join(dirs.cards, n + '.png'), omitBackground: true }); }
  for (const el of await p.$$('.exp-frame')) { const n = await el.getAttribute('data-name'); await (await el.$('.card')).screenshot({ path: path.join(dirs.frames, n + '.png'), omitBackground: true }); }
  const p2 = await b.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 2 });
  await p2.goto('file://' + tmp, { waitUntil: 'networkidle' });
  for (const el of await p2.$$('.artonly')) { const n = await el.getAttribute('data-name'); await el.screenshot({ path: path.join(dirs.art, n + '.png'), omitBackground: true }); }
  // chart backgrounds from the editable HTML (titles left empty for your own text)
  for (const paper of ['letter', 'a4']) {
    const d = path.join(OUT, `4-chart-backgrounds-${paper}`); fs.mkdirSync(d, { recursive: true });
    const p3 = await b.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 1.5 });
    await p3.goto('file://' + path.join(__dirname, `editable-${paper}.html`), { waitUntil: 'networkidle' }); await p3.evaluate(() => document.fonts.ready);
    const pages = await p3.$$('.page.chart');
    let i = 0;
    for (const el of pages) { i++; const foot = await el.$eval('.foot span', s => s.textContent); const cls = await el.getAttribute('class'); const cw = (cls.match(/cw-([a-z]+)-page/) || [, 'x'])[1]; const slug = cw + '-' + foot.split('·').slice(0, 2).join('-').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').replace(/-move-each-card.*$/, '').replace(/-turn-the-page-sideways$/, ''); await el.screenshot({ path: path.join(d, `${String(i).padStart(2, '0')}-${slug}.png`) }); }
    await p3.close();
  }
  await b.close();
  console.log('exported to', OUT);
})().catch(e => { console.error(e); process.exit(1); });
