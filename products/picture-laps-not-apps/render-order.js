// render-order.js — turns one built order folder into print PDFs, and refuses if any name or message does not fit.
// Usage: node build.js --order <order.json> --out <dir>   then   node render-order.js <dir> [--pages]
// Writes <dir>/interior.pdf and <dir>/cover.pdf, updates <dir>/check.json with the fit results.
// Exit codes: 0 ok · 5 something did not fit (send to the review queue; do not print) · 1 render error.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const dir = path.resolve(process.argv[2] || '.');
  const wantPages = process.argv.includes('--pages');
  const check = JSON.parse(fs.readFileSync(path.join(dir, 'check.json'), 'utf8'));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const fit = {};
  for (const [src, out] of [['interior.html', 'interior.pdf'], ['cover-wrap.html', 'cover.pdf']]) {
    const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
    await page.goto('file://' + path.join(dir, src), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-fit'));
    fit[src] = await page.evaluate(() => window.__fit);
    await page.pdf({ path: path.join(dir, out), printBackground: true, preferCSSPageSize: true });
    if (wantPages && src === 'interior.html') {
      fs.mkdirSync(path.join(dir, 'pages'), { recursive: true });
      const els = await page.$$('.page');
      for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: path.join(dir, 'pages', `p${String(i + 1).padStart(2, '0')}.png`) });
    }
    await page.close();
  }
  await browser.close();
  const failed = Object.values(fit).flat().filter((r) => !r.ok);
  const shrunk = Object.values(fit).flat().filter((r) => r.shrunk > 0).map((r) => `${r.id} → ${(r.px * 0.75).toFixed(1)}pt`);
  Object.assign(check, { fit_ok: failed.length === 0, fit_failed: failed.map((r) => r.id), fit_shrunk: shrunk, rendered_at: new Date().toISOString() });
  fs.writeFileSync(path.join(dir, 'check.json'), JSON.stringify(check, null, 2));
  console.log(`${check.order_id}: fit ${failed.length ? 'FAILED on ' + failed.map((r) => r.id).join(', ') : 'ok'}${shrunk.length ? ' (shrunk: ' + shrunk.join('; ') + ')' : ''}`);
  process.exit(failed.length ? 5 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
