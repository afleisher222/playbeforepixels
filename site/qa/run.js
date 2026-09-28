#!/usr/bin/env node
// Play Before Pixels site QA (deploy gate). Runs against site/dist served like Cloudflare Pages.
//
//   node site/build.js && node site/qa/run.js          (exit 0 = pass)
//   node site/qa/run.js --quick                        (1440 and 390 only)
//
// Every page in the build, at 1440, 768, 390 and 360 px (768 and below with touch and mobile
// emulation): no horizontal overflow, no console errors or failed requests, every image loads,
// one h1 and no skipped heading levels, text contrast (WCAG 2.1 AA) against the real background,
// target sizes, names on buttons and links. Then: every internal link and #fragment resolves,
// every printed URL resolves (ops/TESTS/printed-urls.md), buy buttons stay hidden while
// commerce/links.js is empty, and interaction tests for the skip link, keyboard focus rings,
// mega menus, the mobile menu (focus trap, inert page, Escape), search, shop filters with Back,
// the product gallery and format picker. Results: site/qa/last-run.json.
'use strict';
const fs = require('fs');
const path = require('path');
const { start } = require('./serve');
const pw = (() => { for (const m of ['playwright', '/opt/node22/lib/node_modules/playwright']) { try { return require(m); } catch (e) {} } throw new Error('Playwright not found (npm i -g playwright)'); })();

const DIST = path.resolve(__dirname, '..', 'dist');
const ROOT = path.resolve(__dirname, '..', '..');
const QUICK = process.argv.includes('--quick');
const WIDTHS = QUICK ? [1440, 390] : [1440, 768, 390, 360];
const report = JSON.parse(fs.readFileSync(path.join(DIST, '.build-report.json'), 'utf8'));
const PAGES = report.pages;
const results = { pass: 0, fail: 0, failures: [] };
const ok = (cond, what) => { if (cond) results.pass++; else { results.fail++; results.failures.push(what); console.log('  FAIL', what); } };

// ---------- in-page audit (runs in the browser) ----------
function audit(opts) {
  const out = { overflow: 0, h1: 0, skips: [], contrast: [], small: [], noname: [], badImg: [] };
  const de = document.documentElement;
  out.overflow = de.scrollWidth - de.clientWidth;
  out.h1 = document.querySelectorAll('h1').length;
  let last = 0;
  for (const h of document.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
    if (h.closest('[hidden], template, .mega, .drawer, .search-sheet')) continue;
    const lv = +h.tagName[1];
    if (last && lv > last + 1) out.skips.push(`${h.tagName} "${h.textContent.trim().slice(0, 40)}" after h${last}`);
    last = lv;
  }
  for (const img of document.images) if (!img.complete || !img.naturalWidth) out.badImg.push(img.currentSrc || img.src);
  // contrast
  const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
  const blend = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
  function bgOf(el) {
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
    }
    let bg = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) bg = blend(layers[i], bg);
    return bg;
  }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  let n;
  while ((n = walker.nextNode())) {
    if (!n.nodeValue.trim()) continue;
    const el = n.parentElement;
    if (!el || seen.has(el)) continue;
    seen.add(el);
    if (el.closest('[hidden], template, script, style, noscript, [aria-hidden="true"], .visually-hidden, fieldset[disabled], .mega:not(.is-open), .drawer:not(.is-open), .search-sheet:not(.is-open), .skip-link, option, select')) continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || +cs.opacity === 0) continue;
    let op = 1; for (let e = el; e; e = e.parentElement) op *= +getComputedStyle(e).opacity;
    let fg = parse(cs.color); if (!fg) continue;
    fg = { ...fg, a: fg.a * op };
    const bg = bgOf(el);
    const c = blend(fg, bg);
    const L1 = lum(c), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const size = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 700;
    const large = size >= 24 || (bold && size >= 18.66);
    const need = large ? 3 : 4.5;
    if (ratio + 0.01 < need) out.contrast.push(`${ratio.toFixed(2)} < ${need} "${n.nodeValue.trim().slice(0, 40)}" (${el.tagName.toLowerCase()}.${String(el.className).slice(0, 30)})`);
  }
  // target size (WCAG 2.5.8: 24 × 24, inline links in sentences are exempt) and names
  for (const el of document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button]')) {
    if (el.closest('[hidden], template, .mega:not(.is-open), .drawer:not(.is-open), .search-sheet:not(.is-open), fieldset[disabled]')) continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden') continue;
    const inline = el.tagName === 'A' && cs.display === 'inline' && el.parentElement && /^(P|LI|DD|TD|SPAN|SMALL|B|STRONG|EM|I)$/.test(el.parentElement.tagName) && el.parentElement.textContent.trim().length > el.textContent.trim().length + 3;
    const covered = el.matches('.p-card .p-title a') || (el.tagName === 'INPUT' && el.closest('label'));
    if (!inline && !covered && !el.classList.contains('skip-link') && (r.height < 24 || r.width < 24)) out.small.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(r.width)}×${Math.round(r.height)}`);
    if (opts.touch && el.matches('.tool-btn, .menu-btn, .x-btn, .chip, .m-age, .acc-btn, .f-cols a, .f-base nav a, .crumbs a') && r.height < 44 - 0.5) out.small.push(`touch ${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 30)}" ${Math.round(r.height)}px tall (needs 44)`);
    const name = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || (el.querySelector('img') && el.querySelector('img').alt) || (el.labels && el.labels[0] && el.labels[0].textContent) || '').trim();
    if (!name && !el.getAttribute('aria-labelledby')) out.noname.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 30)}`);
  }
  for (const img of document.images) if (!img.hasAttribute('alt')) out.noname.push('img without alt ' + img.src);
  return out;
}

async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const i of document.images) i.loading = 'eager';
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 25)); }
    window.scrollTo(0, 0);
    await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 4000); })));
  });
}

(async () => {
  const t0 = Date.now();
  const server = await start(0);
  const base = 'http://127.0.0.1:' + server.address().port;
  const exe = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
  const browser = await pw.chromium.launch({ executablePath: exe });
  const links = new Set();

  // ---------- 1. every page at every width ----------
  for (const w of WIDTHS) {
    const touch = w <= 768;
    const ctx = await browser.newContext({ viewport: { width: w, height: touch ? (w > 500 ? 1024 : 844) : 900 }, isMobile: touch, hasTouch: touch });
    const page = await ctx.newPage();
    let errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push(String(e)));
    page.on('requestfailed', r => errors.push('request failed ' + r.url()));
    page.on('response', r => { if (r.url().startsWith(base) && r.status() >= 400 && !r.url().endsWith('/404.html')) errors.push(`HTTP ${r.status()} ${r.url()}`); });
    console.log(`width ${w}${touch ? ' (touch)' : ''}: ${PAGES.length} pages`);
    for (const p of PAGES) {
      errors = [];
      const resp = await page.goto(base + p, { waitUntil: 'networkidle' });
      ok(resp.status() === 200 || (p === '/404.html' && resp.status() === 200), `${p} @${w}: HTTP ${resp.status()}`);
      await settle(page);
      const a = await page.evaluate(audit, { touch });
      ok(a.overflow <= 0, `${p} @${w}: horizontal overflow ${a.overflow}px`);
      ok(a.h1 === 1, `${p} @${w}: ${a.h1} h1 elements`);
      ok(!a.skips.length, `${p} @${w}: skipped heading levels: ${a.skips.join('; ')}`);
      ok(!a.badImg.length, `${p} @${w}: broken images: ${a.badImg.slice(0, 3).join(', ')}`);
      ok(!a.contrast.length, `${p} @${w}: contrast: ${a.contrast.slice(0, 4).join(' | ')}`);
      ok(!a.small.length, `${p} @${w}: small targets: ${a.small.slice(0, 4).join(' | ')}`);
      ok(!a.noname.length, `${p} @${w}: unnamed controls: ${a.noname.slice(0, 4).join(', ')}`);
      ok(!errors.length, `${p} @${w}: console or network errors: ${errors.slice(0, 3).join(' | ')}`);
      if (w === WIDTHS[0]) for (const h of await page.$$eval('a[href], link[rel=canonical]', els => els.map(e => e.getAttribute('href')))) links.add(JSON.stringify([p, h]));
    }
    await ctx.close();
  }

  // ---------- 2. links, fragments, printed URLs, redirects ----------
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const req = ctx.request;
  const cache = new Map();
  const fetchPage = async u => { if (!cache.has(u)) { const r = await req.get(base + u); cache.set(u, { status: r.status(), url: r.url(), html: await r.text() }); } return cache.get(u); };
  let internal = 0;
  for (const s of links) {
    const [from, href] = JSON.parse(s);
    if (/^(https?:)?\/\//.test(href) && !href.startsWith('https://playbeforepixels.com')) continue;
    if (/^(mailto|tel):/.test(href)) continue;
    const u = href.replace('https://playbeforepixels.com', '');
    const [pth, frag] = u.split('#');
    internal++;
    const target = pth ? await fetchPage(pth) : await fetchPage(from);
    ok(target.status === 200, `link ${href} on ${from}: HTTP ${target.status}`);
    if (frag) ok(new RegExp(`id="${frag}"`).test(target.html), `link ${href} on ${from}: no #${frag}`);
  }
  console.log(`links: ${internal} internal links checked`);
  const printed = fs.readFileSync(path.join(ROOT, 'ops/TESTS/printed-urls.md'), 'utf8').split('\n').filter(l => l.startsWith('|')).flatMap(l => [...l.matchAll(/`(\/[a-z0-9/_-]*)`/g)].map(m => m[1]));
  for (const u of new Set(printed)) {
    for (const v of new Set([u, u.endsWith('/') ? u.slice(0, -1) || '/' : u + '/'])) {
      const r = await req.get(base + v);
      ok(r.status() === 200, `printed URL ${v}: HTTP ${r.status()}`);
    }
  }
  const lic = await req.get(base + '/license', { maxRedirects: 0 });
  ok(lic.status() === 301 && /\/licenses\/$/.test(lic.headers().location || ''), '/license is a 301 to /licenses/');
  const nf = await req.get(base + '/no-such-page/');
  ok(nf.status() === 404, '/no-such-page/ returns 404');
  // buy buttons hidden while links.js is empty
  const linksJs = fs.readFileSync(path.join(ROOT, 'commerce/links.js'), 'utf8');
  if (!/:\s*"https:\/\//.test(linksJs)) {
    for (const p of PAGES.filter(x => x.startsWith('/shop/') && x.split('/').length === 4 || x === '/30-days/')) {
      const h = (await fetchPage(p)).html;
      if (!/class="pdp"/.test(h)) continue;
      ok(!/data-buy[ >]/.test(h) && /Available soon/.test(h), `${p}: buy button hidden and "Available soon" shown`);
    }
  }
  const home = (await fetchPage('/')).html;
  ok(!/googletagmanager|facebook\.net|fbq\(|gtag\(|hotjar|doubleclick/i.test(home), 'no tracking pixels');
  ok(/"@type":"Organization"/.test(home) && !/"@type":"(Review|AggregateRating)"/.test(home), 'Organization JSON-LD, no review markup');
  const sm = await (await req.get(base + '/sitemap.xml')).text();
  ok(!/\/bonus\/|\/search\/|thank-you/.test(sm) && /<loc>https:\/\/playbeforepixels\.com\/<\/loc>/.test(sm), 'sitemap lists indexable pages only');
  const rb = await (await req.get(base + '/robots.txt')).text();
  ok(/Sitemap: https:\/\/playbeforepixels\.com\/sitemap\.xml/.test(rb), 'robots.txt points at the sitemap');
  await ctx.close();

  // ---------- 2b. every glyph is drawn by a brand font (like ops/TESTS/check_fonts.js, over HTTP) ----------
  {
    const BRAND = /^(Bricolage Grotesque|Nunito Sans|Fredoka|Caveat)/i;
    const c = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await c.newPage();
    const cdp = await c.newCDPSession(page);
    for (const p of ['/', '/shop/', '/shop/board-up-go-more/', '/30-days/', '/shop/bundles/', '/free/', '/help/', '/privacy/', '/research/', '/404.html']) {
      await page.goto(base + p, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
      const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
      const bad = new Map();
      const walk = async n => {
        if (n.nodeType === 1 && ['SCRIPT', 'STYLE', 'TEMPLATE', 'NOSCRIPT', 'HEAD'].includes(n.nodeName)) return;
        if (n.nodeType === 1 && (n.children || []).some(k => k.nodeType === 3 && k.nodeValue.trim())) {
          try {
            const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId: n.nodeId });
            for (const f of fonts) if (!BRAND.test(f.familyName)) bad.set(f.familyName, (bad.get(f.familyName) || 0) + f.glyphCount);
          } catch (e) { /* hidden nodes have no layout */ }
        }
        for (const k of n.children || []) await walk(k);
      };
      await walk(root);
      ok(!bad.size, `${p}: glyphs drawn by non-brand fonts: ${[...bad].map(([f, g]) => f + ' ×' + g).join(', ')}`);
    }
    await c.close();
  }

  // ---------- 3. interaction: desktop ----------
  {
    const c = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await c.newPage();
    const errs = []; page.on('pageerror', e => errs.push(String(e)));
    await page.goto(base + '/shop/ages/1-3/');
    await page.keyboard.press('Tab');
    ok(await page.evaluate(() => document.activeElement.classList.contains('skip-link')), 'skip link is the first Tab stop');
    await page.keyboard.press('Enter');
    ok(await page.evaluate(() => document.activeElement.id === 'main' && location.pathname === '/shop/ages/1-3/' && !location.hash), 'skip link focuses <main> and keeps the URL');
    await page.keyboard.press('Tab');
    ok(await page.evaluate(() => document.getElementById('main').contains(document.activeElement)), 'next Tab lands inside main');
    // focus rings on the first 80 stops of each template
    for (const p of ['/', '/shop/', '/shop/board-up-go-more/', '/help/', '/free/', '/contact/', '/research/', '/privacy/']) {
      await page.goto(base + p);
      let missing = [];
      for (let i = 0; i < 80; i++) {
        await page.keyboard.press('Tab');
        const r = await page.evaluate(() => {
          const e = document.activeElement; if (!e || e === document.body) return null;
          const cs = getComputedStyle(e); const pb = getComputedStyle(e, '::before');
          const ring = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2) || (pb.outlineStyle !== 'none' && parseFloat(pb.outlineWidth) >= 2) || /rgb/.test(cs.boxShadow);
          return ring ? null : `${e.tagName.toLowerCase()}.${String(e.className).slice(0, 30)} "${(e.textContent || '').trim().slice(0, 20)}"`;
        });
        if (r) missing.push(r);
      }
      ok(!missing.length, `${p}: visible focus ring on the first 80 Tab stops: ${missing.slice(0, 3).join(' | ')}`);
    }
    // mega menus
    await page.goto(base + '/');
    for (const id of ['mega-shop', 'mega-books', 'mega-printables']) {
      const btn = page.locator(`[data-mega="${id}"]`);
      await btn.click();
      ok(await btn.getAttribute('aria-expanded') === 'true' && await page.locator('#' + id).isVisible(), `${id}: click opens`);
      await page.waitForTimeout(250);
      const ca = await page.evaluate(audit, { touch: false });
      ok(!ca.contrast.length, `${id}: contrast inside the open panel: ${ca.contrast.slice(0, 3).join(' | ')}`);
      await page.keyboard.press('Escape');
      ok(await btn.getAttribute('aria-expanded') === 'false' && await page.evaluate(i => document.activeElement.getAttribute('data-mega') === i, id), `${id}: Escape closes and returns focus`);
      await btn.focus(); await page.keyboard.press('Enter');
      ok(await btn.getAttribute('aria-expanded') === 'true', `${id}: Enter opens`);
      await page.keyboard.press('Tab');
      ok(await page.evaluate(i => document.getElementById(i).contains(document.activeElement), id), `${id}: Tab moves into the open panel`);
      await page.keyboard.press('Escape');
      await btn.focus(); await page.keyboard.press('ArrowDown');
      ok(await page.evaluate(i => document.getElementById(i).contains(document.activeElement), id), `${id}: ArrowDown focuses the first link`);
      await page.mouse.click(700, 860);
      ok(await btn.getAttribute('aria-expanded') === 'false', `${id}: outside click closes`);
      await btn.hover(); await page.waitForTimeout(160); await btn.click();
      ok(await btn.getAttribute('aria-expanded') === 'true', `${id}: hover then click keeps it open`);
      await page.keyboard.press('Escape'); await page.mouse.move(700, 880); await page.waitForTimeout(300);
    }
    // a link inside a panel navigates
    await page.locator('[data-mega="mega-shop"]').click();
    await Promise.all([page.waitForNavigation(), page.locator('#mega-shop a[href="/shop/ages/1-3/"]').click()]);
    ok(new URL(page.url()).pathname === '/shop/ages/1-3/', 'mega panel link navigates');
    // search
    await page.goto(base + '/');
    await page.keyboard.press('/');
    await page.waitForTimeout(350);
    ok(await page.evaluate(() => document.activeElement.matches('[data-search-input]')), '"/" opens search with the input focused');
    await page.keyboard.type('print');
    await page.waitForSelector('#search [role=option]');
    await page.keyboard.press('ArrowDown');
    const ad = await page.getAttribute('[data-search-input]', 'aria-activedescendant');
    ok(!!ad, 'ArrowDown sets aria-activedescendant');
    const href = await page.getAttribute('#' + ad, 'href');
    await Promise.all([page.waitForNavigation(), page.keyboard.press('Enter')]);
    ok(page.url().endsWith(href), 'Enter opens the highlighted result');
    await page.goto(base + '/');
    await page.keyboard.press('/'); await page.waitForTimeout(300);
    await page.keyboard.type('refund');
    await Promise.all([page.waitForNavigation(), page.keyboard.press('Enter')]);
    ok(/\/search\/\?q=refund/.test(page.url()), 'Enter with no highlight opens the results page');
    await page.waitForSelector('[data-search-page-results] a');
    ok(await page.locator('[data-search-page-results] a').count() > 0, 'results page lists matches (help answers included)');
    await page.goto(base + '/');
    await page.keyboard.press('/'); await page.waitForTimeout(300);
    await page.keyboard.press('Escape'); await page.waitForTimeout(300);
    ok(await page.evaluate(() => document.getElementById('search').hidden && document.activeElement.matches('[data-open-search]')), 'Escape closes search and returns focus');
    // shop filters: state in the URL, Back restores
    await page.goto(base + '/shop/');
    await page.click('.age-rail [data-f-age="1-3"]');
    ok(new URL(page.url()).pathname === '/shop/ages/1-3/' && /1–3/.test(await page.textContent('h1')) && /1–3/.test(await page.title()), 'age filter updates URL, h1 and title');
    await page.click('[data-f-type="books"]');
    ok(/age=1-3/.test(page.url()) && /type=books/.test(page.url()) && /Books/.test(await page.textContent('h1')), 'age + type filter combine in the URL');
    const n = await page.locator('[data-shop-grid] .p-card:not([hidden])').count();
    ok(n > 0, 'combined filter shows products');
    await page.goBack();
    ok(new URL(page.url()).pathname === '/shop/ages/1-3/' && /1–3/.test(await page.textContent('h1')), 'Back restores the previous filter');
    await page.goBack();
    ok(new URL(page.url()).pathname === '/shop/' && /Everything/.test(await page.textContent('h1')), 'Back again restores all');
    await page.selectOption('[data-sort]', 'low');
    const prices = await page.$$eval('[data-shop-grid] .p-card:not([hidden])', els => els.map(e => +e.dataset.price));
    ok(prices.every((p, i) => !i || p >= prices[i - 1]), 'sort by price works');
    await page.goto(base + '/shop/');
    const more = page.locator('[data-show-more]');
    if (await more.isVisible()) { await more.click(); ok(await page.locator('[data-shop-grid] .p-card[hidden]').count() === 0, '"Show all" reveals every card'); }
    const emptyCombo = await page.evaluate(() => { const cards = [...document.querySelector('[data-all-cards]').content.querySelectorAll('.p-card')]; for (const a of ['0-1', '1-3', '3-5']) for (const t of ['books', 'printables', 'bundles']) if (!cards.some(c => (' ' + c.dataset.ages + ' ').includes(' ' + a + ' ') && (' ' + c.dataset.types + ' ').includes(' ' + t + ' '))) return `?age=${a}&type=${t}`; return null; });
    if (emptyCombo) {
      await page.goto(base + '/shop/' + emptyCombo);
      ok(await page.locator('[data-shop-empty]').isVisible(), 'empty state shows for a combination with nothing');
      await page.click('[data-reset]');
      ok(/Everything/.test(await page.textContent('h1')), 'reset shows everything');
    } else console.log('  (every age and type combination has products; empty state not reachable today)');
    // product gallery and formats
    await page.goto(base + '/shop/guide-100-plays/');
    await page.focus('[data-thumb="0"]'); await page.keyboard.press('ArrowRight');
    ok(await page.evaluate(() => !document.querySelector('[data-slide="1"]').hidden && document.activeElement.dataset.thumb === '1'), 'gallery thumbnails work with arrow keys');
    await page.check('input[name=format][value=pdf]');
    ok(/\$9\.99/.test(await page.textContent('[data-price-out]')) && /download/i.test(await page.textContent('[data-ship]')), 'format change updates price and ship line');
    await page.goto(base + '/shop/board-up-go-more/');
    await page.click('[data-word="0"]');
    ok(/hi/.test(await page.textContent('[data-wo-word]')), 'word explorer shows the chosen word');
    ok(!errs.length, 'no script errors during desktop interaction: ' + errs.join(' | '));
    await c.close();
  }

  // ---------- 4. interaction: phone (touch) ----------
  for (const w of [390, 360]) {
    const c = await browser.newContext({ viewport: { width: w, height: 844 }, isMobile: true, hasTouch: true });
    const page = await c.newPage();
    for (const p of ['/', '/shop/', '/shop/toddler-busy-book/']) {
      await page.goto(base + p);
      ok(await page.getAttribute('[data-open-search]', 'aria-label') === 'Search' && (await page.locator('.menu-btn').innerText()).includes('Menu') || await page.evaluate(() => document.querySelector('.menu-btn').textContent.trim() === 'Menu'), `${p} @${w}: header buttons named Search and Menu`);
      await page.tap('.menu-btn');
      await page.waitForTimeout(350);
      ok(await page.locator('#mnav').isVisible(), `${p} @${w}: menu opens by tap`);
      const ma = await page.evaluate(audit, { touch: true });
      ok(!ma.contrast.length && !ma.small.length, `${p} @${w}: open menu contrast and targets: ${[...ma.contrast, ...ma.small].slice(0, 3).join(' | ')}`);
      ok(await page.evaluate(() => document.querySelector('main').inert && document.body.classList.contains('is-locked')), `${p} @${w}: page behind is inert and scroll locked`);
      let outside = 0;
      for (let i = 0; i < 40; i++) { await page.keyboard.press('Tab'); if (!(await page.evaluate(() => document.getElementById('mnav').contains(document.activeElement)))) outside++; }
      for (let i = 0; i < 25; i++) { await page.keyboard.press('Shift+Tab'); if (!(await page.evaluate(() => document.getElementById('mnav').contains(document.activeElement)))) outside++; }
      ok(outside === 0, `${p} @${w}: focus stays inside the menu (${outside} escapes)`);
      await page.keyboard.press('Escape'); await page.waitForTimeout(350);
      ok(await page.evaluate(() => document.getElementById('mnav').hidden && document.activeElement.classList.contains('menu-btn')), `${p} @${w}: Escape closes and returns focus to Menu`);
      await page.tap('.menu-btn'); await page.waitForTimeout(350);
      await page.tap('#mnav [data-close]'); await page.waitForTimeout(350);
      ok(await page.evaluate(() => document.getElementById('mnav').hidden), `${p} @${w}: ✕ closes the menu`);
      await page.tap('.menu-btn'); await page.waitForTimeout(350);
      const acc = page.locator('#mnav .acc-btn[aria-controls="m-books"]');
      if ((await acc.getAttribute('aria-expanded')) !== 'true') { await acc.tap(); }
      ok(await acc.getAttribute('aria-expanded') === 'true' && await page.locator('#m-books').isVisible(), `${p} @${w}: accordion opens by tap`);
      await Promise.all([page.waitForNavigation(), page.tap('#mnav .m-age[href="/shop/ages/3-5/"]')]);
      ok(new URL(page.url()).pathname === '/shop/ages/3-5/', `${p} @${w}: Menu → age chip reaches the filtered shop in two taps`);
    }
    await page.goto(base + '/shop/');
    const first = await page.locator('[data-shop-grid] .p-card .price').first().boundingBox();
    ok(first && first.y + first.height <= 844 * 2, `@${w}: first price within the first two screens on the phone shop`);
    await c.close();
  }

  await browser.close();
  server.close();
  const summary = { date: new Date().toISOString().slice(0, 10), pages: PAGES.length, widths: WIDTHS, pass: results.pass, fail: results.fail, seconds: Math.round((Date.now() - t0) / 1000), failures: results.failures };
  fs.writeFileSync(path.join(__dirname, 'last-run.json'), JSON.stringify(summary, null, 1) + '\n');
  console.log(`\nQA: ${results.pass} passed, ${results.fail} failed (${summary.seconds}s). Details: site/qa/last-run.json`);
  process.exit(results.fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
