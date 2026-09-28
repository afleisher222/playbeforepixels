// Renders every PNG for concept D with Playwright Chromium (/opt/pw-browsers/chromium).
//   node render.js      runs src/jobs.json, which `python3 build.py` writes
// Each job: { src, out, w, h, transparent? }. Favicon rasters are taken at true size (16x16 / 32x32 viewport,
// device scale 1), so the PNG is exactly what a browser tab paints.
const path = require('path'); const fs = require('fs');
let pw; try { pw = require('/home/user/playbeforepixels/node_modules/playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }
const HERE = __dirname;
(async () => {
  const jobs = JSON.parse(fs.readFileSync(path.join(HERE, 'src', 'jobs.json'), 'utf8'));
  const browser = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  for (const j of jobs) {
    const ctx = await browser.newContext({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto('file://' + path.resolve(HERE, j.src), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await page.waitForTimeout(80);
    await page.screenshot({ path: path.resolve(HERE, j.out), omitBackground: !!j.transparent });
    await ctx.close();
    console.log('rendered', j.out);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
