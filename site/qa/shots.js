// Screenshots of every page template at desktop and phone width into site/shots/.
// Usage: node site/qa/shots.js [pathFilter] [widths]   e.g. node site/qa/shots.js / 1440,390
'use strict';
const path = require('path');
const fs = require('fs');
const { start } = require('./serve');
const pw = (() => { for (const m of ['playwright', '/opt/node22/lib/node_modules/playwright']) { try { return require(m); } catch (e) {} } throw new Error('Playwright not found'); })();

const PAGES = ['/shop/visual-routine-cards/', '/shop/bored-play-cards/', '/', '/shop/', '/shop/ages/1-3/', '/shop/bundles/', '/shop/board-up-go-more/', '/shop/toddler-busy-book/', '/30-days/', '/free/', '/about/', '/help/', '/contact/', '/licenses/', '/privacy/', '/research/', '/bonus/board-up-go-more/', '/404.html', '/search/?q=print'];
const name = p => (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/[/?=.]+/g, '-'));

(async () => {
  const filter = process.argv[2];
  const widths = (process.argv[3] || '1440,390').split(',').map(Number);
  const server = await start(0);
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await pw.chromium.launch({ executablePath: fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined }).catch(() => pw.chromium.launch());
  const out = path.resolve(__dirname, '..', 'shots');
  fs.mkdirSync(out, { recursive: true });
  for (const w of widths) {
    const mobile = w < 800;
    const ctx = await browser.newContext({ viewport: { width: w, height: mobile ? 844 : 900 }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    for (const p of PAGES.filter(x => !filter || x === filter || filter === 'all')) {
      await page.goto(base + p, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { await document.fonts.ready; for (const i of document.images) { i.loading = 'eager'; } await new Promise(r => setTimeout(r, 300)); });
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } window.scrollTo(0, 0); });
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))));
      await page.waitForTimeout(200);
      await page.screenshot({ path: path.join(out, `${name(p)}-${w}.png`), fullPage: true });
    }
    await ctx.close();
  }
  await browser.close();
  server.close();
  console.log('shots written to site/shots/');
})().catch(e => { console.error(e); process.exit(1); });
