// Renders every PNG of the logo kit with Playwright Chromium.
//   node raster.js [jobs.json]        (default: jobs.json next to this file, written by build.py)
// Paths inside jobs.json are relative to the jobs file, so the kit renders the same from any checkout.
// Job kinds: {svg, png, w, h, bg?, scheme?}  -> the SVG rasterised at exactly w x h px (transparent unless bg)
//            {html, png, w, h, scale?}         -> a screenshot of an HTML page (written by guide.py)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const jf = path.resolve(process.argv[2] || path.join(__dirname, 'jobs.json'));
  const base = path.dirname(jf);
  const jobs = JSON.parse(fs.readFileSync(jf, 'utf8'));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  for (const j of jobs) {
    const out = path.resolve(base, j.png);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const ctx = await browser.newContext({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: j.scale || 1,
                                           colorScheme: j.scheme || 'light' });
    const page = await ctx.newPage();
    if (j.svg) {
      const src = 'data:image/svg+xml;base64,' + fs.readFileSync(path.resolve(base, j.svg)).toString('base64');
      await page.setContent(`<!doctype html><html><head><style>html,body{margin:0;background:${j.bg || 'transparent'}}` +
                            `img{display:block;width:${j.w}px;height:${j.h}px}</style></head><body><img src="${src}"></body></html>`);
      await page.waitForFunction(() => document.images[0].complete);
      await page.screenshot({ path: out, omitBackground: !j.bg, clip: { x: 0, y: 0, width: j.w, height: j.h } });
    } else {
      await page.goto('file://' + path.resolve(base, j.html), { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: out });
    }
    await ctx.close();
  }
  await browser.close();
  console.log('rendered', jobs.length, 'PNGs');
})().catch(e => { console.error(e); process.exit(1); });
