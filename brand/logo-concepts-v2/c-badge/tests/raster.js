// Renders the c-badge test PNGs with Playwright Chromium.
//   node tests/raster.js [jobs.json]      (default: tests/jobs.json, written by tests/make_tests.py)
// Job kinds: {svg, png, w, h, bg?, scheme?}  -> the SVG rasterised at exactly w x h px (no resampling)
//            {html, png, w, h, scale?}         -> an HTML page screenshot
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const jf = process.argv[2] || path.join(__dirname, 'jobs.json');
  const jobs = JSON.parse(fs.readFileSync(jf));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  for (const j of jobs) {
    const ctx = await browser.newContext({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: j.scale || 1,
                                           colorScheme: j.scheme || 'light' });
    const page = await ctx.newPage();
    if (j.svg) {
      const html = `<!doctype html><html><body style="margin:0;background:${j.bg || 'transparent'}">` +
                   `<img src="file://${path.resolve(j.svg)}" style="display:block;width:${j.w}px;height:${j.h}px"></body></html>`;
      const tmp = path.join(path.dirname(path.resolve(j.png)), '.tmp-' + path.basename(j.png) + '.html');
      fs.writeFileSync(tmp, html);
      await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
      await page.screenshot({ path: j.png, omitBackground: !j.bg });
      fs.unlinkSync(tmp);
    } else {
      await page.goto('file://' + path.resolve(j.html), { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: j.png });
    }
    await ctx.close();
  }
  await browser.close();
  console.log('rendered', jobs.length);
})().catch(e => { console.error(e); process.exit(1); });
