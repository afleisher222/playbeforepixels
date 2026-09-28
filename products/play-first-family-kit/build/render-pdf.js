// Same engine and settings as brand/render.js "pdf" mode, plus a tagged (accessible) PDF.
//   node render-pdf.js <in.html> <out.pdf>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
(async () => {
  const [input, output] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(input), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: output, printBackground: true, preferCSSPageSize: true, tagged: true });
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
