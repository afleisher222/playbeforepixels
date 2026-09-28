// Rasterize SVG files to PNG with Chromium (transparent unless the SVG paints a background).
// Usage: node raster.js jobs.json   where jobs = [{svg, png, w, h}]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'); const path = require('path');
(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const page = await browser.newPage({ viewport: { width: 400, height: 400 }, deviceScaleFactor: 1 });
  for (const j of jobs) {
    await page.setViewportSize({ width: j.w, height: j.h });
    const src = 'data:image/svg+xml;base64,' + fs.readFileSync(j.svg).toString('base64');
    await page.setContent(`<html><head><style>html,body{margin:0;background:transparent}img{display:block;width:${j.w}px;height:${j.h}px}</style></head><body><img src="${src}"></body></html>`);
    await page.waitForFunction(() => document.images[0].complete);
    await page.screenshot({ path: j.png, omitBackground: true, clip: { x: 0, y: 0, width: j.w, height: j.h } });
  }
  await browser.close();
  console.log('rasterized', jobs.length);
})().catch(e => { console.error(e); process.exit(1); });
