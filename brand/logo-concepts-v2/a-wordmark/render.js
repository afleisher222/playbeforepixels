// Renders every PNG for direction A with Playwright Chromium.
//   node render.js            -> runs src/jobs.json (written by `python3 build.py`)
// Each job: { src: file (html or svg), out: png, w, h, scale, scheme: 'light' | 'dark' }
// Favicon rasters are taken at true size (16x16, 32x32 viewport, scale 1) so the PNG is exactly what a tab shows.
const path = require('path'); const fs = require('fs');
let pw; try { pw = require('/home/user/playbeforepixels/node_modules/playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }
const HERE = __dirname;
(async () => {
  const jobs = JSON.parse(fs.readFileSync(path.join(HERE, 'src', 'jobs.json'), 'utf8'));
  const browser = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => pw.chromium.launch());
  for (const j of jobs) {
    const ctx = await browser.newContext({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: j.scale || 1, colorScheme: j.scheme || 'light' });
    const page = await ctx.newPage();
    await page.goto('file://' + path.resolve(HERE, j.src), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await page.waitForTimeout(60);
    fs.mkdirSync(path.dirname(path.resolve(HERE, j.out)), { recursive: true });
    await page.screenshot({ path: path.resolve(HERE, j.out), omitBackground: !!j.transparent });
    await ctx.close();
    console.log('rendered', j.out);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
