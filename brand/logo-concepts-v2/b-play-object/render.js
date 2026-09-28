// Renders the PNGs listed in a jobs file with Playwright Chromium.
//   node render.js jobs.json
// job: { file: "page.html" (relative to this folder), out: "x.png", w, h, scale?, dark?: true (prefers-color-scheme: dark) }
const path = require('path'); const fs = require('fs');
let pw;
try { pw = require('/home/user/playbeforepixels/node_modules/playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }
const HERE = __dirname;
(async () => {
  const jobs = JSON.parse(fs.readFileSync(path.resolve(process.argv[2] || path.join(HERE, 'jobs.json')), 'utf8'));
  const browser = await pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => pw.chromium.launch());
  for (const j of jobs) {
    const page = await browser.newPage({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: j.scale || 1,
                                         colorScheme: j.dark ? 'dark' : 'light' });
    await page.goto('file://' + path.resolve(HERE, j.file), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.resolve(HERE, j.out), omitBackground: !!j.transparent });
    await page.close();
    console.log('rendered', j.out);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
