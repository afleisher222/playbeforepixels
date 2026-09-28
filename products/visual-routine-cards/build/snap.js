// Screenshot selected .page elements: node snap.js <in.html> <outdir> <n,n,n> [scale]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'); const fs = require('fs');
(async () => {
  const [inp, out, list, sc] = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: +(sc || 1) });
  await p.goto('file://' + path.resolve(inp), { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  fs.mkdirSync(out, { recursive: true });
  const els = await p.$$('.page, .li');
  for (const n of list.split(',').map(Number)) await els[n - 1].screenshot({ path: path.join(out, `p${String(n).padStart(3, '0')}.png`) });
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
