// Interaction-state screenshots, produced by real clicks/taps.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'); const ROOT = path.resolve(__dirname, '..');
const u = f => 'file://' + path.join(ROOT, f); const out = f => path.join(ROOT, 'shots', f);
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const m = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true })).newPage();
  await m.goto(u('index.html')); await m.evaluate(() => document.fonts.ready);
  await m.tap('[data-open-menu]'); await m.waitForTimeout(450);
  await m.screenshot({ path: out('state-mobile-menu-390.png') });
  await m.tap('[aria-controls="m-shop"]'); await m.waitForTimeout(200);
  await m.screenshot({ path: out('state-mobile-menu-shop-open-390.png') });
  await m.tap('#mnav .x-btn'); await m.waitForTimeout(400);
  await m.goto(u('product.html')); await m.tap('[data-product-add]'); await m.waitForTimeout(450);
  await m.screenshot({ path: out('state-mobile-cart-390.png') });
  const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await d.goto(u('index.html')); await d.evaluate(() => document.fonts.ready);
  for (const id of ['mega-shop', 'mega-books', 'mega-teach', 'mega-research']) {
    await d.click(`[data-mega="${id}"]`); await d.waitForTimeout(350);
    await d.screenshot({ path: out(`state-${id}-1440.png`) });
    await d.keyboard.press('Escape'); await d.mouse.move(700, 880); await d.waitForTimeout(300);
  }
  await d.keyboard.press('/'); await d.waitForTimeout(200); await d.keyboard.type('talk');
  await d.waitForTimeout(250); await d.screenshot({ path: out('state-search-1440.png') });
  await d.keyboard.press('Escape');
  await d.goto(u('shop.html#age=1-3')); await d.waitForTimeout(300);
  await d.click('.p-card:not([hidden]) [data-add] >> nth=0'); await d.waitForTimeout(100);
  await d.click('.p-card[data-id="bundle-little"] .p-title a'); await d.waitForTimeout(450);
  await d.screenshot({ path: out('state-shop-quickview-1440.png') });
  await d.click('[data-qv-add]'); await d.waitForTimeout(450);
  await d.screenshot({ path: out('state-cart-1440.png') });
  await b.close();
})();
