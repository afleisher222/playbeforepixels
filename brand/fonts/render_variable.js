#!/usr/bin/env node
// render_variable.js - render a page to PDF exactly as brand/render.js does, but with the OLD
// variable brand fonts: every request for brand/fonts/fonts.css is answered with
// brand/fonts/fonts-variable.css. Used only to make "before" files for comparisons
// (brand/fonts/compare_pdfs.py). Nothing on disk changes.
//
// Usage (repo root):  node brand/fonts/render_variable.js <input.html> <output.pdf> [widthIn heightIn]
const { chromium } = (() => { for (const m of ['/opt/node22/lib/node_modules/playwright', 'playwright', require('path').join(require('child_process').execSync('npm root -g').toString().trim(), 'playwright')]) { try { return require(m); } catch (e) {} } throw new Error('Playwright not found: run bash ops/cloud/bootstrap.sh'); })();
const path = require('path'); const fs = require('fs');
const FONTS = path.resolve(__dirname);
(async () => {
  const [input, output, a, b] = process.argv.slice(2);
  if (!input || !output) { console.log('usage: node brand/fonts/render_variable.js <input.html> <output.pdf> [widthIn heightIn]'); process.exit(2); }
  const variableCss = fs.readFileSync(path.join(FONTS, 'fonts-variable.css'), 'utf8')
    // fonts-variable.css uses relative url("x.woff2"); make them absolute so they resolve from anywhere.
    .replace(/url\("([^"/]+\.woff2)"\)/g, (m, f) => `url("file://${path.join(FONTS, f)}")`);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const page = await browser.newPage();
  let swapped = 0;
  // Match by path suffix, so a page in a copied tree (brand/ symlinked) is swapped too.
  await page.route(u => u.protocol === 'file:' && decodeURI(u.pathname).endsWith('/brand/fonts/fonts.css'), route => {
    swapped++;
    route.fulfill({ status: 200, contentType: 'text/css', body: variableCss });
  });
  await page.goto('file://' + path.resolve(input), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const opts = { path: output, printBackground: true, preferCSSPageSize: true };
  if (a && b) { opts.width = a + 'in'; opts.height = b + 'in'; opts.preferCSSPageSize = false; }
  await page.pdf(opts);
  await browser.close();
  if (!swapped) { console.error('fonts.css was never requested: nothing swapped'); process.exit(1); }
  console.log(`${output}: rendered with fonts-variable.css (${swapped} request swapped)`);
})().catch(e => { console.error(e); process.exit(1); });
