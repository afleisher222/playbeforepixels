const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const ROOT = '/home/user/playbeforepixels/site-concepts/B-toy-shop-bold/';
const U = f => 'file://' + ROOT + f;
let fails = 0, passes = 0;
function ok(c, m) { if (c) { passes++; } else { fails++; console.log('FAIL:', m); } }
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const active = () => p.evaluate(() => { const a = document.activeElement; return (a.id || '') + '|' + (a.className || '') + '|' + (a.textContent || '').trim().slice(0, 40); });

  // --- skip link
  await p.goto(U('index.html')); await p.waitForTimeout(150);
  await p.keyboard.press('Tab');
  ok((await active()).includes('skip'), 'first Tab focuses skip link: ' + await active());
  await p.keyboard.press('Enter'); await p.waitForTimeout(100);
  ok((await active()).startsWith('main'), 'skip link moves focus to main: ' + await active());

  // --- mega menu by click + Escape
  const shopBtn = p.locator('button[aria-controls="mm-shop"]');
  await shopBtn.click();
  ok(await shopBtn.getAttribute('aria-expanded') === 'true', 'Shop mega opens on click');
  ok(await p.locator('#mm-shop').isVisible(), 'mega panel visible');
  await p.screenshot({ path: ROOT + 'shots/state-mega-1440.png' });
  await p.keyboard.press('Escape'); await p.waitForTimeout(250);
  ok(await shopBtn.getAttribute('aria-expanded') === 'false', 'Escape closes mega');
  ok((await active()).includes('Shop'), 'focus returns to Shop button: ' + await active());
  // keyboard ArrowDown opens and focuses first link, ArrowRight moves to Books
  await shopBtn.focus(); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(100);
  ok((await active()).includes('mega-age'), 'ArrowDown focuses first mega link: ' + await active());
  await p.keyboard.press('Escape'); await p.waitForTimeout(100);
  await p.keyboard.press('ArrowRight');
  ok((await active()).includes('Books'), 'ArrowRight moves to Books: ' + await active());
  // hover opens Research
  await p.locator('button[aria-controls="mm-research"]').hover(); await p.waitForTimeout(350);
  ok(await p.locator('#mm-research').evaluate(e => e.classList.contains('is-open')), 'hover opens Research menu');
  await p.mouse.move(700, 800); await p.waitForTimeout(500);
  ok(!(await p.locator('#mm-research').evaluate(e => e.classList.contains('is-open'))), 'leaving header closes menu');
  // tab out of open mega closes it
  await shopBtn.click(); await p.locator('#mm-shop a').last().focus();
  await p.keyboard.press('Tab'); await p.keyboard.press('Tab'); await p.keyboard.press('Tab'); await p.waitForTimeout(100);

  // --- mega link navigates to filtered shop
  await p.goto(U('index.html')); await shopBtn.click();
  await p.locator('#mm-shop a[href="shop.html#age=1-3"]').click(); await p.waitForLoadState(); await p.waitForTimeout(200);
  ok((await p.textContent('[data-title]')).includes('1–3'), 'age link filters shop: ' + await p.textContent('[data-title]'));
  ok((await p.textContent('[data-count]')) === '6 products', 'count for 1–3: ' + await p.textContent('[data-count]'));
  ok((await p.textContent('[data-crumbs]')).includes('Ages 1–3'), 'breadcrumb reflects filter');
  // same-page mega link (type) updates filter and closes mega
  await p.locator('button[aria-controls="mm-shop"]').click();
  await p.locator('#mm-shop a[href="shop.html#type=printables"]').click(); await p.waitForTimeout(250);
  ok((await p.textContent('[data-title]')).includes('Printables'), 'same-page type link updates: ' + await p.textContent('[data-title]'));
  ok(!(await p.locator('#mm-shop').evaluate(e => e.classList.contains('is-open'))), 'mega closes after same-page link');
  // filter buttons
  await p.click('.fa[data-age=""]'); await p.click('.ft-chip[data-type=""]'); await p.waitForTimeout(100);
  ok((await p.textContent('[data-count]')) === '15 products', 'clear filters shows all: ' + await p.textContent('[data-count]'));
  await p.click('.fa[data-age="8-12"]'); await p.waitForTimeout(100);
  ok(p.url().endsWith('#age=8-12'), 'filter writes hash: ' + p.url());
  await p.click('.ft-chip[data-type="board-books"]'); await p.waitForTimeout(100);
  ok(await p.locator('[data-empty]').isVisible(), 'empty state for 8-12 board books');
  await p.click('[data-clear2]'); await p.waitForTimeout(100);
  ok((await p.textContent('[data-count]')) === '15 products', 'empty-state clear works');

  // --- quick view: open, trap, escape, focus return
  const tile = p.locator('.ptile[data-qv="tablet-slept"]');
  await tile.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
  ok(await p.locator('#qv').evaluate(e => e.classList.contains('is-open')), 'quick view opens with Enter');
  ok((await active()).startsWith('qv-h'), 'focus on quick view heading: ' + await active());
  for (let i = 0; i < 12; i++) await p.keyboard.press('Tab');
  ok(await p.evaluate(() => document.getElementById('qv').contains(document.activeElement)), 'focus trapped in quick view');
  await p.screenshot({ path: ROOT + 'shots/state-quickview-1440.png' });
  await p.keyboard.press('Escape'); await p.waitForTimeout(350);
  ok(!(await p.locator('#qv').evaluate(e => e.classList.contains('is-open'))), 'Escape closes quick view');
  ok(await p.evaluate(() => document.activeElement.getAttribute('data-qv')) === 'tablet-slept', 'focus returns to tile');
  // deep link opens quick view
  await p.goto(U('shop.html#type=cards&p=talk-back-cards')); await p.waitForTimeout(400);
  ok(await p.locator('#qv').evaluate(e => e.classList.contains('is-open')), 'deep link #p= opens quick view');
  ok((await p.textContent('[data-title]')).includes('Card deck'), 'deep link keeps type filter');
  await p.click('#qv [data-close]'); await p.waitForTimeout(300);
  ok(!p.url().includes('p='), 'closing quick view clears p from hash: ' + p.url());

  // --- cart: add from quick view, persist across pages
  await p.evaluate(() => localStorage.clear());
  await p.goto(U('shop.html#p=printables-0-5')); await p.waitForTimeout(400);
  await p.click('#qv [type=submit]'); await p.waitForTimeout(400);
  ok(await p.locator('#cart').evaluate(e => e.classList.contains('is-open')), 'add opens cart drawer');
  ok((await p.textContent('[data-cart-count]')) === '1', 'cart count 1');
  await p.keyboard.press('Escape'); await p.waitForTimeout(350);
  ok(!(await p.locator('#cart').evaluate(e => e.classList.contains('is-open'))), 'Escape closes cart');
  await p.goto(U('product.html')); await p.waitForTimeout(200);
  ok((await p.textContent('[data-cart-count]')) === '1', 'cart persists across pages');
  await p.check('input[value="trio"]', { force: true }); await p.waitForTimeout(50);
  ok((await p.textContent('[data-price]')).includes('34.99'), 'format change updates price: ' + await p.textContent('[data-price]'));
  await p.click('#buy [data-step="1"]'); await p.click('#buy [type=submit]'); await p.waitForTimeout(400);
  ok((await p.textContent('[data-cart-count]')) === '3', 'qty 2 trio added, count 3: ' + await p.textContent('[data-cart-count]'));
  await p.screenshot({ path: ROOT + 'shots/state-cart-1440.png' });
  for (let i = 0; i < 15; i++) await p.keyboard.press('Tab');
  ok(await p.evaluate(() => document.getElementById('cart').contains(document.activeElement)), 'focus trapped in cart');
  await p.click('[data-q="1"][data-d="1"]'); await p.waitForTimeout(80);
  ok((await p.textContent('[data-cart-count]')) === '4', 'qty stepper in cart');
  await p.click('[data-rm="0"]'); await p.waitForTimeout(80);
  ok((await p.textContent('[data-cart-count]')) === '3', 'remove line');
  await p.click('[data-checkout]'); ok(await p.locator('[data-checkout-msg]').isVisible(), 'checkout message shows');
  await p.click('[data-layer-scrim]', { position: { x: 200, y: 400 } }); await p.waitForTimeout(350);
  ok(!(await p.locator('#cart').evaluate(e => e.classList.contains('is-open'))), 'scrim click closes cart');
  // gallery + spreads
  await p.click('.gal-thumbs button:nth-child(4)');
  ok((await p.getAttribute('[data-gal-img]', 'src')).includes('p05'), 'gallery thumb swaps image');
  await p.click('[data-sp="1"]'); await p.waitForTimeout(700);
  ok((await p.textContent('[data-sp-count]')).startsWith('2'), 'spread next: ' + await p.textContent('[data-sp-count]'));

  // --- search
  await p.click('.search-btn'); await p.waitForTimeout(300);
  ok((await active()).includes('') && await p.evaluate(() => document.activeElement.matches('[data-search-input]')), 'search input focused');
  await p.keyboard.type('printable'); await p.waitForTimeout(100);
  const nres = await p.locator('[data-sres] a[data-qv], [data-sres] a[href="product.html"]').count();
  ok(nres === 4, 'search results for printable: ' + nres);
  await p.screenshot({ path: ROOT + 'shots/state-search-1440.png' });
  await p.keyboard.press('Enter'); await p.waitForLoadState(); await p.waitForTimeout(300);
  ok(p.url().includes('shop.html#q=printable') && (await p.textContent('[data-count]')) === '4 products', 'search submit filters shop: ' + p.url());

  // --- currency
  await p.selectOption('#cur-ft', 'GBP'); await p.waitForTimeout(100);
  const pr = await p.locator('.ptile .pr span[data-usd]').first().textContent();
  ok(pr.includes('£') && pr.includes('≈'), 'currency switch: ' + pr);
  ok(await p.inputValue('#cur-util') === 'GBP', 'currency selects stay in sync');
  await p.selectOption('#cur-ft', 'USD');

  // --- research TOC anchors
  await p.goto(U('research.html#briefs')); await p.waitForTimeout(300);
  await p.click('.brief summary'); ok(await p.locator('.brief').first().evaluate(d => d.open), 'brief expands');

  // --- about forms
  await p.goto(U('about.html#contact')); await p.fill('#c-email', 'a@b.co'); await p.fill('#c-msg', 'hello'); await p.click('#contact [type=submit]');
  ok(await p.locator('#contact [data-ok]').isVisible(), 'contact form confirmation');

  // --- mobile menu
  const m = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const mp = await m.newPage(); mp.on('pageerror', e => errs.push('mobile: ' + e.message));
  const mact = () => mp.evaluate(() => { const a = document.activeElement; return (a.className || a.tagName) + '|' + (a.textContent || '').trim().slice(0, 30); });
  await mp.goto(U('index.html')); await mp.waitForTimeout(150);
  await mp.tap('.menu-btn'); await mp.waitForTimeout(400);
  ok(await mp.locator('#mnav').evaluate(e => e.classList.contains('is-open')), 'tap opens mobile menu');
  ok(await mp.getAttribute('.menu-btn', 'aria-expanded') === 'true', 'menu button aria-expanded');
  ok(await mp.evaluate(() => document.querySelector('main').inert), 'page behind menu is inert');
  await mp.tap('[aria-controls="acc-shop"]'); await mp.waitForTimeout(200);
  ok(await mp.locator('#acc-shop').isVisible(), 'accordion opens by tap');
  await mp.screenshot({ path: ROOT + 'shots/state-mobile-menu-390.png' });
  for (let i = 0; i < 40; i++) await mp.keyboard.press('Tab');
  ok(await mp.evaluate(() => document.getElementById('mnav').contains(document.activeElement)), 'focus trapped in mobile menu (forward)');
  for (let i = 0; i < 45; i++) await mp.keyboard.press('Shift+Tab');
  ok(await mp.evaluate(() => document.getElementById('mnav').contains(document.activeElement)), 'focus trapped in mobile menu (backward)');
  await mp.keyboard.press('Escape'); await mp.waitForTimeout(400);
  ok(!(await mp.locator('#mnav').evaluate(e => e.classList.contains('is-open'))), 'Escape closes mobile menu');
  ok((await mact()).includes('menu-btn'), 'focus returns to menu button: ' + await mact());
  ok(!(await mp.evaluate(() => document.querySelector('main').inert)), 'inert removed after close');
  // keyboard open
  await mp.focus('.menu-btn'); await mp.keyboard.press('Enter'); await mp.waitForTimeout(400);
  ok((await mact()).includes('logo') || (await mact()).includes('xbtn'), 'keyboard open focuses inside menu: ' + await mact());
  await mp.tap('#mnav [data-close]'); await mp.waitForTimeout(400);
  ok(!(await mp.locator('#mnav').evaluate(e => e.classList.contains('is-open'))), 'close button closes menu');
  // navigate from mobile menu
  await mp.tap('.menu-btn'); await mp.waitForTimeout(400); if (await mp.getAttribute('[aria-controls="acc-shop"]', 'aria-expanded') !== 'true') await mp.tap('[aria-controls="acc-shop"]'); await mp.waitForTimeout(150);
  await mp.tap('#acc-shop .age-chip[href="shop.html#age=3-5"]'); await mp.waitForLoadState(); await mp.waitForTimeout(300);
  ok((await mp.textContent('[data-title]')).includes('3–5'), 'mobile menu age chip navigates: ' + await mp.textContent('[data-title]'));
  // mobile menu on shop, same-page link closes menu and filters
  await mp.tap('.menu-btn'); await mp.waitForTimeout(400);
  await mp.tap('#acc-shop a[href="shop.html#type=merch"]'); await mp.waitForTimeout(400);
  ok(!(await mp.locator('#mnav').evaluate(e => e.classList.contains('is-open'))) && (await mp.textContent('[data-title]')).includes('Merch'), 'same-page mobile link closes menu + filters');
  // mobile cart
  await mp.tap('.cart-btn'); await mp.waitForTimeout(400);
  ok(await mp.locator('#cart').evaluate(e => e.classList.contains('is-open')), 'mobile cart opens');
  await mp.screenshot({ path: ROOT + 'shots/state-mobile-cart-390.png' });
  await mp.tap('#cart [data-close]'); await mp.waitForTimeout(400);
  // mobile horizontal overflow
  for (const f of ['index.html', 'product.html', 'shop.html', 'research.html', 'about.html']) {
    await mp.goto(U(f)); await mp.waitForTimeout(150);
    const sw = await mp.evaluate(() => { window.scrollTo(400, window.scrollY); const x = window.scrollX; window.scrollTo(0, 0); return x; });
    ok(sw === 0, f + ' no horizontal scroll at 390: ' + sw);
    await p.goto(U(f)); await p.waitForTimeout(100);
    const sw2 = await p.evaluate(() => { window.scrollTo(400, window.scrollY); const x = window.scrollX; window.scrollTo(0, 0); return x; });
    ok(sw2 === 0, f + ' no horizontal scroll at 1440: ' + sw2);
  }

  // --- dead link crawl
  const routes = /^(age=(0-1|1-3|3-5|5-8|8-12)|type=[\w-]+|p=[\w-]+|q=.*)(&.*)?$/;
  for (const f of ['index.html', 'product.html', 'shop.html', 'research.html', 'about.html']) {
    await p.goto(U(f)); await p.waitForTimeout(150);
    await p.evaluate(() => { document.querySelector('[data-search-input]').value = 'a'; document.querySelector('[data-search-input]').dispatchEvent(new Event('input')); });
    const hrefs = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')));
    const ids = {};
    for (const h of new Set(hrefs)) {
      if (/^https?:/.test(h)) { ok(false, f + ' external link present: ' + h); continue; }
      const [file, hash] = h.split('#'); const target = file || f;
      ok(fs.existsSync(ROOT + target), f + ' -> missing file ' + h);
      if (hash) {
        if (routes.test(hash) && target === 'shop.html') continue;
        if (!ids[target]) { const q = await b.newPage(); await q.goto(U(target)); await q.waitForTimeout(100); ids[target] = await q.evaluate(() => [...document.querySelectorAll('[id]')].map(e => e.id)); await q.close(); }
        ok(ids[target].includes(hash), f + ' -> dead anchor ' + h);
      }
    }
    // product ids referenced by data-qv exist
    const qvs = await p.evaluate(() => [...document.querySelectorAll('[data-qv]')].map(a => a.getAttribute('data-qv')).filter(id => !PBP.byId(id)));
    ok(qvs.length === 0, f + ' unknown data-qv: ' + qvs);
  }
  ok(errs.length === 0, 'console/page errors: ' + errs.join(' | '));
  console.log(`\n${passes} passed, ${fails} failed`);
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
