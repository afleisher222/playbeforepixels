// Navigation QA for concept C. usage: node _tools/qa.js
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'); const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const PAGES = ['index.html', 'product.html', 'shop.html', 'research.html', 'info.html'];
const url = (f) => 'file://' + path.join(ROOT, f);
let fails = 0, passes = 0;
const ok = (c, m) => { if (c) { passes++; } else { fails++; console.log('  FAIL', m); } };

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

  // ---- 1. Links: every local href resolves; every hash resolves to an id or a known shop route
  const cat = await (async () => { await page.goto(url('index.html')); return page.evaluate(() => ({ ids: PBP_CATALOG.map(p => p.id), bands: PBP_BANDS.map(b => b.key), types: PBP_TYPES.map(t => t.key), cols: Object.keys(PBP_COLLECTIONS) })); })();
  const idsByPage = {};
  for (const f of PAGES) { await page.goto(url(f)); idsByPage[f] = await page.evaluate(() => [...document.querySelectorAll('[id]')].map(e => e.id)); }
  for (const f of PAGES) {
    await page.goto(url(f));
    const hrefs = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')));
    for (const h of new Set(hrefs)) {
      if (/^(https?:|mailto:)/.test(h)) continue;
      const [file, hash] = h.split('#'); const target = file || f;
      ok(PAGES.includes(target), `${f}: link to missing page ${h}`);
      if (hash !== undefined && hash !== '') {
        if (target === 'shop.html' && hash.includes('=')) {
          for (const kv of hash.split('&')) {
            const [k, v] = kv.split('=');
            const valid = k === 'age' ? cat.bands.includes(v) : k === 'type' ? cat.types.includes(v) : k === 'c' ? cat.cols.includes(v) : k === 'item' ? cat.ids.includes(v) : k === 'q' ? v.length > 0 : false;
            ok(valid, `${f}: bad shop route ${h}`);
          }
        } else ok((idsByPage[target] || []).includes(hash), `${f}: hash target missing ${h}`);
      }
    }
    ok(await page.evaluate(() => document.querySelectorAll('h1').length === 1), `${f}: exactly one h1`);
    ok(await page.evaluate(() => !!document.querySelector('.crumbs') || document.body.dataset.page === 'home'), `${f}: breadcrumbs`);
    ok(await page.evaluate(() => [...document.images].every(i => i.complete && i.naturalWidth > 0)), `${f}: all images load`);
    ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${f}: no horizontal scroll (1440)`);
  }
  console.log('links checked');

  // ---- 2. Skip link
  await page.goto(url('index.html'));
  await page.keyboard.press('Tab');
  ok(await page.evaluate(() => document.activeElement.classList.contains('skip-link')), 'skip link is first tab stop');
  await page.keyboard.press('Enter');
  ok(await page.evaluate(() => document.activeElement.id === 'main'), 'skip link moves focus to <main>');
  await page.keyboard.press('Tab');
  ok(await page.evaluate(() => document.querySelector('main').contains(document.activeElement)), 'Tab after skip lands inside main');
  await page.goto(url('shop.html#age=3-5')); await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
  ok(await page.evaluate(() => document.activeElement.id === 'main' && location.hash === '#age=3-5'), 'skip link keeps shop filter in URL');

  // ---- 3. Desktop mega menus
  for (const id of ['mega-shop', 'mega-books', 'mega-teach', 'mega-research']) {
    await page.goto(url('index.html'));
    const btn = page.locator(`[data-mega="${id}"]`);
    await btn.click();
    ok(await page.locator('#' + id).evaluate(e => e.classList.contains('is-open') && getComputedStyle(e).visibility === 'visible'), `${id} opens on click`);
    ok(await btn.getAttribute('aria-expanded') === 'true', `${id} aria-expanded true`);
    await page.keyboard.press('Escape');
    ok(await page.locator('#' + id).evaluate(e => !e.classList.contains('is-open')), `${id} closes on Escape`);
    ok(await page.evaluate(i => document.activeElement.getAttribute('data-mega') === i, id), `${id} Escape returns focus`);
    // keyboard: ArrowDown opens + focuses first link, Tab stays in order
    await btn.focus(); await page.keyboard.press('ArrowDown');
    ok(await page.evaluate(i => document.getElementById(i).contains(document.activeElement), id), `${id} ArrowDown focuses into panel`);
    await page.keyboard.press('Tab');
    ok(await page.evaluate(i => document.getElementById(i).contains(document.activeElement), id), `${id} Tab stays in panel`);
    // click outside closes
    await page.mouse.click(700, 880);
    ok(await page.locator('#' + id).evaluate(e => !e.classList.contains('is-open')), `${id} closes on outside click`);
  }
  // hover intent
  await page.goto(url('index.html'));
  await page.hover('[data-mega="mega-books"]'); await page.waitForTimeout(250);
  ok(await page.locator('#mega-books').evaluate(e => e.classList.contains('is-open')), 'books opens on hover');
  await page.hover('#mega-books .shelf a >> nth=1'); await page.waitForTimeout(300);
  ok(await page.locator('#mega-books').evaluate(e => e.classList.contains('is-open')), 'books stays open moving into panel');
  await page.click('#mega-books .shelf a >> nth=1');
  await page.waitForTimeout(400);
  ok(page.url().includes('shop.html#item=tablet-slept'), 'mega link navigates');
  ok(await page.locator('#qv').evaluate(e => e.classList.contains('is-open')), 'quick view opens from deep link');
  await page.keyboard.press('Escape'); await page.waitForTimeout(100);
  ok(!page.url().includes('item='), 'closing quick view clears item from URL');
  // Tab from a mega trigger to the next without opening leaves no panel open
  await page.goto(url('shop.html'));
  await page.click('[data-mega="mega-shop"]');
  await page.click('#mega-shop a[href="shop.html#age=3-5"]'); await page.waitForTimeout(200);
  ok(await page.evaluate(() => location.hash === '#age=3-5' && document.querySelector('[data-shop-title]').textContent.includes('3–5')), 'same-page mega link filters shop');
  ok(await page.locator('#mega-shop').evaluate(e => !e.classList.contains('is-open')), 'mega closes after same-page link');

  // ---- 4. Shop filters, history, quick view, quick add
  await page.goto(url('shop.html'));
  const vis = () => page.evaluate(() => [...document.querySelectorAll('.p-card')].filter(c => !c.hidden).length);
  ok(await vis() === 8, 'shop shows 8 before See all');
  await page.click('[data-show-more]');
  ok(await vis() === 16, 'show all reveals 16');
  await page.click('.tab[data-age="1-3"]'); await page.waitForTimeout(100);
  ok(page.url().endsWith('#age=1-3'), 'age tab updates hash');
  const n13 = await page.evaluate(() => PBP_CATALOG.filter(p => p.ages.includes('1-3')).length);
  ok(await vis() === Math.min(n13, 16), 'age filter count');
  await page.click('[data-col="printables"]'); await page.waitForTimeout(100);
  ok(page.url().includes('c=printables') && page.url().includes('age=1-3'), 'type chip combines with age');
  await page.goBack(); await page.waitForTimeout(150);
  ok(page.url().endsWith('#age=1-3'), 'back button restores previous filter');
  ok(await page.evaluate(() => document.querySelector('[data-col="printables"]').getAttribute('aria-pressed')) === 'false', 'chip state follows back');
  await page.selectOption('[data-sort]', 'low'); await page.waitForTimeout(100);
  const prices = await page.evaluate(() => [...document.querySelectorAll('.p-card')].filter(c => !c.hidden).map(c => +c.dataset.price));
  ok(prices.every((p, i) => i === 0 || prices[i - 1] <= p), 'sort low→high');
  await page.goto(url('shop.html#type=merch&age=0-1'));
  ok(await page.locator('[data-shop-empty]').isVisible(), 'empty state shows');
  await page.click('[data-reset]'); await page.waitForTimeout(100);
  ok(await vis() >= 8, 'reset shows products');
  // quick add + toast
  await page.goto(url('shop.html'));
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} }); await page.reload();
  await page.click('.p-card[data-id="play-talk-cards"] [data-add]');
  ok(await page.locator('[data-cart-count]').first().textContent() === '1', 'quick add updates count');
  ok(await page.locator('[data-toast]').evaluate(e => e.classList.contains('is-on')), 'toast shows');
  // quick view via card title
  await page.click('[data-show-more]');
  await page.click('.p-card[data-id="classroom-pack"] .p-title a'); await page.waitForTimeout(350);
  ok(await page.locator('#qv').evaluate(e => e.classList.contains('is-open')), 'card opens quick view');
  ok(await page.evaluate(() => document.getElementById('qv').contains(document.activeElement)), 'focus moves into quick view');
  await page.click('#qv .fmt-opt >> nth=1');
  await page.click('[data-qv-add]'); await page.waitForTimeout(350);
  ok(await page.locator('#cart').evaluate(e => e.classList.contains('is-open')), 'quick view add opens cart');
  ok((await page.locator('#cart .fmt').allTextContents()).some(t => t.includes('Whole-school')), 'chosen format in cart');

  // ---- 5. Cart drawer: focus trap, qty, persistence across pages
  for (let i = 0; i < 25; i++) await page.keyboard.press('Tab');
  ok(await page.evaluate(() => document.getElementById('cart').contains(document.activeElement)), 'cart traps Tab');
  for (let i = 0; i < 5; i++) await page.keyboard.press('Shift+Tab');
  ok(await page.evaluate(() => document.getElementById('cart').contains(document.activeElement)), 'cart traps Shift+Tab');
  await page.click('#cart [data-q="0"][data-d="1"]');
  ok(await page.locator('[data-cart-count]').first().textContent() === '3', 'qty + updates count');
  await page.keyboard.press('Escape'); await page.waitForTimeout(100);
  ok(await page.locator('#cart').evaluate(e => !e.classList.contains('is-open')), 'cart closes on Escape');
  await page.goto(url('product.html'));
  ok(await page.locator('[data-cart-count]').first().textContent() === '3', 'cart persists across pages');
  await page.click('.fmt-opt >> nth=1');
  ok((await page.locator('[data-product-price]').textContent()).includes('11.99'), 'format changes price');
  await page.click('[data-qty-d="1"]');
  ok((await page.locator('[data-add-price]').textContent()).includes('23.98'), 'qty updates add button');
  await page.click('[data-product-add]'); await page.waitForTimeout(350);
  ok(await page.locator('[data-cart-count]').first().textContent() === '5', 'product add updates count');
  await page.click('.scrim.is-open', { position: { x: 20, y: 400 } }); await page.waitForTimeout(350);
  ok(await page.locator('#cart').evaluate(e => !e.classList.contains('is-open')), 'cart closes on scrim click');
  // gallery + word explorer
  await page.click('[data-thumb="p09"]');
  ok(await page.locator('[data-slide="p09"]').isVisible(), 'gallery thumb switches slide');
  await page.keyboard.press('ArrowRight');
  ok(await page.locator('[data-slide="p19"]').isVisible(), 'gallery arrow keys');
  await page.click('[data-word="16"]');
  ok((await page.locator('[data-w-word]').textContent()) === 'more', 'word explorer updates');
  // currency
  await page.selectOption('.utility [data-currency]', 'GBP'); await page.waitForTimeout(100);
  ok((await page.locator('[data-product-price]').textContent()).includes('£'), 'currency converts prices');
  await page.selectOption('.utility [data-currency]', 'USD');

  // ---- 6. Search
  await page.goto(url('research.html'));
  await page.keyboard.press('/'); await page.waitForTimeout(150);
  ok(await page.locator('#search').evaluate(e => e.classList.contains('is-open')), '/ opens search');
  ok(await page.evaluate(() => document.activeElement.hasAttribute('data-search-input')), 'search input focused');
  await page.keyboard.type('board');
  ok(await page.locator('#search [role="option"]').count() > 0, 'search returns results');
  await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); await page.waitForTimeout(400);
  ok(/product\.html|shop\.html/.test(page.url()), 'search Enter navigates: ' + page.url());
  await page.click('[data-open-search]'); await page.keyboard.type('purchase order');
  ok((await page.locator('#search [role="option"]').allTextContents()).some(t => /purchase|Licenses/i.test(t)), 'search finds help answers');
  await page.keyboard.press('Escape');
  ok(await page.locator('#search').evaluate(e => !e.classList.contains('is-open')), 'search closes on Escape');
  // Enter with nothing highlighted goes to the filtered shop results page
  await page.goto(url('index.html')); await page.keyboard.press('/'); await page.keyboard.type('cards'); await page.keyboard.press('Enter'); await page.waitForTimeout(400);
  ok(page.url().endsWith('shop.html#q=cards'), 'search Enter without a highlight opens shop results: ' + page.url());
  ok(await page.evaluate(() => document.querySelector('[data-shop-title]').textContent.includes('cards') && document.title.startsWith('Results for')), 'shop results heading and title follow the query');
  ok(await page.evaluate(() => [...document.querySelectorAll('.p-card')].filter(c => !c.hidden).length >= 2), 'shop results show matching products');
  await page.click('.tab[data-age="3-5"]'); await page.waitForTimeout(100);
  ok(page.url().includes('q=cards') && page.url().includes('age=3-5'), 'age filter narrows search results');
  // Cart announces additions and syncs across tabs
  await page.goto(url('shop.html')); await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} }); await page.reload();
  const other = await ctx.newPage(); await other.goto(url('research.html'));
  await page.click('.p-card[data-id="play-talk-cards"] [data-add]'); await page.waitForTimeout(250);
  ok(/Added 52 Play & Talk Cards, PDF, to your cart/.test(await page.locator('[data-announce]').textContent()), 'cart add is announced to screen readers');
  ok(await page.locator('[data-cart-btn]').getAttribute('aria-label') === 'Cart, 1 item', 'cart button name includes the count');
  await other.waitForTimeout(250);
  ok(await other.locator('[data-cart-count]').first().textContent() === '1', 'cart syncs to another open tab');
  await other.close();

  // ---- 7. Info page: hash opens answer, help filter, contact suggestions
  await page.goto(url('info.html#shipping'));
  ok(await page.evaluate(() => document.getElementById('shipping').open), 'footer #shipping opens answer');
  await page.fill('[data-help-search]', 'A4');
  ok(await page.evaluate(() => [...document.querySelectorAll('.help-faq details')].filter(d => !d.hidden).length) >= 1, 'help search filters');
  await page.fill('[data-contact-msg]', 'my download link never arrived');
  ok(await page.locator('[data-contact-sugg]').isVisible(), 'contact shows matching answers');

  // ---- 8. Mobile menu: open, focus trap, accordion, Escape, resize
  const m = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const mp = await m.newPage(); mp.on('pageerror', e => errors.push('mobile: ' + e.message));
  for (const f of PAGES) {
    await mp.goto(url(f));
    ok(await mp.evaluate(() => innerWidth === 390 && document.documentElement.scrollWidth <= 390), `${f}: no horizontal scroll / viewport widening (390)`);
  }
  for (const f of PAGES) {
    await mp.goto(url(f));
    const names = await mp.evaluate(() => ['[data-open-search]', '[data-cart-btn]', '[data-open-menu]'].map(s => { const e = document.querySelector(s); return e.getAttribute('aria-label') || e.innerText.trim(); }));
    ok(names[0] === 'Search' && /^Cart, \d+ items?$/.test(names[1]) && /Menu/.test(names[2]), `${f}: header buttons have names at 390 (${names.join(' | ')})`);
    const small = await mp.evaluate(() => [...document.querySelectorAll('.f-cols a, .f-base nav a, .crumbs a')].filter(a => a.getClientRects().length && a.getBoundingClientRect().height < 44).length);
    ok(small === 0, `${f}: footer and breadcrumb links are 44px tall on touch (${small} short)`);
  }
  // Two taps: Menu, then an age chip, from any page
  for (const f of ['index.html', 'product.html', 'research.html']) {
    await mp.goto(url(f)); await mp.tap('[data-open-menu]'); await mp.waitForTimeout(350);
    await mp.tap('#mnav .m-age[href="shop.html#age=1-3"]'); await mp.waitForTimeout(500);
    ok(mp.url().endsWith('shop.html#age=1-3') && await mp.evaluate(() => document.querySelector('[data-shop-title]').textContent.includes('1–3')), `${f}: Menu → 1–3 reaches the filtered shop in two taps`);
  }
  const firstPrice = await mp.evaluate(() => { const c = [...document.querySelectorAll('.p-card')].find(c => !c.hidden); return c.querySelector('.price').getBoundingClientRect().top; });
  ok(firstPrice < 844, `first price visible on the first phone screen of the filtered shop (top ${Math.round(firstPrice)}px)`);
  await mp.goto(url('index.html'));
  await mp.tap('[data-open-menu]'); await mp.waitForTimeout(350);
  ok(await mp.locator('#mnav').evaluate(e => e.classList.contains('is-open')), 'mobile menu opens on tap');
  ok(await mp.locator('[data-open-menu]').getAttribute('aria-expanded') === 'true', 'menu button aria-expanded');
  ok(await mp.evaluate(() => document.getElementById('mnav').contains(document.activeElement)), 'focus moved into menu');
  ok(await mp.evaluate(() => document.querySelector('main').inert === true), 'page behind is inert');
  await mp.tap('[aria-controls="m-shop"]');
  ok(await mp.locator('#m-shop').isVisible(), 'accordion opens');
  for (let i = 0; i < 40; i++) await mp.keyboard.press('Tab');
  ok(await mp.evaluate(() => document.getElementById('mnav').contains(document.activeElement)), 'menu traps focus');
  await mp.keyboard.press('Escape'); await mp.waitForTimeout(350);
  ok(await mp.locator('#mnav').evaluate(e => !e.classList.contains('is-open')), 'Escape closes menu');
  ok(await mp.evaluate(() => document.activeElement.hasAttribute('data-open-menu')), 'focus returns to Menu button');
  ok(await mp.evaluate(() => document.querySelector('main').inert === false), 'page restored after close');
  await mp.tap('[data-open-menu]'); await mp.waitForTimeout(350);
  await mp.tap('#mnav .x-btn'); await mp.waitForTimeout(350);
  ok(await mp.locator('#mnav').evaluate(e => !e.classList.contains('is-open')), 'close button closes menu');
  await mp.tap('[data-open-menu]'); await mp.waitForTimeout(350);
  await mp.tap('[aria-controls="m-teach"]');
  await mp.tap('#m-teach a[href="shop.html#item=group-kit"]'); await mp.waitForTimeout(500);
  ok(mp.url().includes('shop.html#item=group-kit'), 'mobile menu link navigates');
  ok(await mp.locator('#qv').evaluate(e => e.classList.contains('is-open')), 'mobile deep link opens quick view');
  await mp.tap('#qv .x-btn'); await mp.waitForTimeout(350);
  // mobile menu → search from inside menu
  await mp.tap('[data-open-menu]'); await mp.waitForTimeout(350);
  await mp.tap('#mnav .mnav-search'); await mp.waitForTimeout(350);
  ok(await mp.locator('#search').evaluate(e => e.classList.contains('is-open')) && await mp.locator('#mnav').evaluate(e => !e.classList.contains('is-open')), 'menu hands off to search');
  await mp.keyboard.press('Escape');
  // mobile same-page link inside menu closes the menu
  await mp.goto(url('shop.html'));
  await mp.tap('[data-open-menu]'); await mp.waitForTimeout(350);
  await mp.tap('#mnav a.age-tab[href="shop.html#age=5-8"]'); await mp.waitForTimeout(400);
  ok(await mp.locator('#mnav').evaluate(e => !e.classList.contains('is-open')) && mp.url().endsWith('#age=5-8'), 'same-page menu link closes menu and filters');
  ok(await mp.evaluate(() => !document.body.classList.contains('is-locked')), 'scroll unlocked after menu');

  await mp.goto(url('product.html')); await mp.tap('[data-product-add]'); await mp.waitForTimeout(450);
  ok(await mp.evaluate(() => { const r = document.getElementById('cart').getBoundingClientRect(); const f = document.querySelector('[data-cart-foot]').getBoundingClientRect(); return r.left >= 0 && r.right <= 390 && f.bottom <= innerHeight + 1; }), 'mobile cart drawer fits screen incl. checkout');
  ok(errors.length === 0, 'no console errors: ' + errors.join(' | '));
  console.log(`\n${passes} passed, ${fails} failed`);
  await b.close(); process.exit(fails ? 1 : 0);
})();
