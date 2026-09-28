// Screenshots of interactive states (mega menu, mobile menu, search) into site/shots/.
'use strict';
const path = require('path');
const fs = require('fs');
const { start } = require('./serve');
const pw = (() => { for (const m of ['playwright', '/opt/node22/lib/node_modules/playwright']) { try { return require(m); } catch (e) {} } throw new Error('Playwright not found'); })();
(async () => {
  const server = await start(0);
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await pw.chromium.launch({ executablePath: fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined });
  const out = path.resolve(__dirname, '..', 'shots');
  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const id of ['mega-shop', 'mega-books', 'mega-printables']) {
    await d.goto(base + '/'); await d.click(`[data-mega="${id}"]`); await d.waitForTimeout(400);
    await d.screenshot({ path: path.join(out, `state-${id}-1440.png`) });
  }
  await d.goto(base + '/'); await d.keyboard.press('/'); await d.waitForTimeout(300); await d.keyboard.type('cards'); await d.waitForTimeout(400);
  await d.screenshot({ path: path.join(out, 'state-search-1440.png') });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const m = await ctx.newPage();
  await m.goto(base + '/shop/'); await m.tap('.menu-btn'); await m.waitForTimeout(500);
  await m.screenshot({ path: path.join(out, 'state-mobile-menu-390.png') });
  await browser.close(); server.close();
})();
