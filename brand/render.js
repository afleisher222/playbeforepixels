// Usage:
//   node render.js pdf  <input.html> <output.pdf> [widthIn] [heightIn]   (default 8.5x11in; page size may also come from CSS @page)
//   node render.js png  <input.html> <output.png> [widthPx] [heightPx] [scale]  (screenshot of the viewport; fullPage if heightPx=0)
//   node render.js pages <input.html> <outdir> <selector> [scale]         (one PNG per element matching selector, e.g. ".page")
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'); const fs = require('fs');
(async () => {
  const [mode, input, output, a, b, c] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const url = 'file://' + path.resolve(input);
  if (mode === 'pdf') {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const opts = { path: output, printBackground: true, preferCSSPageSize: true };
    if (a && b) { opts.width = a + 'in'; opts.height = b + 'in'; opts.preferCSSPageSize = false; }
    await page.pdf(opts);
  } else if (mode === 'png') {
    const w = +(a || 1200), h = +(b || 0), s = +(c || 1);
    const page = await browser.newPage({ viewport: { width: w, height: h || 900 }, deviceScaleFactor: s });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: output, fullPage: !h });
  } else if (mode === 'pages') {
    const sel = a || '.page', s = +(b || 1);
    const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: s });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    fs.mkdirSync(output, { recursive: true });
    const els = await page.$$(sel);
    for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: path.join(output, `p${String(i + 1).padStart(2, '0')}.png`) });
    console.log(els.length + ' pages');
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
