// Page shell: <head> (SEO, social cards, JSON-LD), header with mega menus, mobile menu,
// search sheet and footer. The research notes use their own quiet shell (hubPage) with no shop
// links, no prices and no scripts (marketing/AWARENESS-ENGINE.md §3.4 and §10, HF-02 to HF-13).
'use strict';
const { esc, money } = require('../lib/util');
const { I, mock, bandOf } = require('./bits');

function jsonld(obj) { return `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`; }

function head(ctx, pg) {
  const S = ctx.cfg.site;
  const url = S.url + pg.path;
  const title = pg.title;
  const og = pg.ogImage || ctx.assets.ogDefault;
  const robots = pg.noindex ? '<meta name="robots" content="noindex, follow">' : '';
  const alt = pg.noindex ? '' : `<link rel="alternate" hreflang="en" href="${url}"><link rel="alternate" hreflang="x-default" href="${url}">`;
  const hub = !!pg.hub;
  const ld = (pg.jsonld || []).map(jsonld).join('\n');
  return `<!doctype html>
<html lang="en" data-page="${esc(pg.key || '')}" data-nav="${esc(pg.nav || '')}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(pg.description)}">
<link rel="canonical" href="${url}">
${alt}
${robots}
<meta name="color-scheme" content="light">
<meta name="theme-color" content="#FFFFFF">
<meta property="og:site_name" content="${esc(S.name)}">
<meta property="og:type" content="${pg.ogType || 'website'}">
<meta property="og:title" content="${esc(pg.ogTitle || title)}">
<meta property="og:description" content="${esc(pg.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(pg.ogAlt || S.name)}">
<meta property="og:locale" content="${S.locale}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${ctx.assets.fontPreload.map(f => `<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin>`).join('\n')}
<link rel="stylesheet" href="${ctx.assets.fontsCss}">
<link rel="stylesheet" href="${ctx.assets.css}">
${hub ? '' : `<script src="${ctx.assets.js}" defer></script>`}
${ld}
</head>`;
}

function analytics(ctx, pg) {
  if (pg.hub) return '';
  const t = ctx.env.analyticsToken;
  if (!t) return '<!-- Cloudflare Web Analytics: set PBP_CF_ANALYTICS_TOKEN in Cloudflare Pages to add the cookieless beacon (site/DEPLOY.md). No other tracking. -->';
  return `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify({ token: t })}'></script>`;
}

// ---------- header ----------
function ageTabs(ctx) {
  return '<ul class="age-tabs">' + ctx.cfg.bands.map(b => {
    const n = ctx.countBand(b.key);
    return n ? `<li><a class="age-tab c-${b.color}" href="/shop/ages/${b.key}/"><span class="t">${b.label}</span><span class="n">${b.name}<small>${b.label} ${b.unit}</small></span><span class="c">${n}</span></a></li>`
      : `<li><span class="age-tab age-tab--off c-${b.color}"><span class="t">${b.label}</span><span class="n">${b.name}<small>coming later</small></span><span class="c">0</span></span></li>`;
  }).join('') + '</ul>';
}
function typeLinks(ctx) {
  return '<ul class="mega-list">' + ctx.cfg.types.map(t => `<li><a href="${t.path}">${esc(t.label)}<small class="num">${ctx.countType(t.key)}</small></a></li>`).join('') + '</ul>';
}

function megaShop(ctx) {
  const free = ctx.cfg.free;
  const pic = ctx.img.pic({ src: `products/${free.preview}`, widths: [360, 720], sizes: '240px', alt: '' });
  return `<div class="mega" id="mega-shop"><div class="wrap mega-inner mega-inner--shop">
    <div><h2>Shop by age</h2>${ageTabs(ctx)}</div>
    <div><h2>Shop by type</h2>${typeLinks(ctx)}<p class="mega-all"><a class="link" href="/shop/">Everything we make ${I.arr}</a></p></div>
    <a class="mega-feature" href="/free/"><div class="surface g-sky-t"><div class="obj m-sheet"><div class="under"></div><div class="face">${pic}</div></div></div>
      <span><span class="kicker">Free printable</span><strong>${esc(free.title)}</strong><span class="meta">Seven easy plays, a screen-spot plan and a tracker</span></span></a>
  </div></div>`;
}
function megaBooks(ctx) {
  const books = ctx.products.filter(p => p.types.includes('books')).slice(0, 4);
  return `<div class="mega" id="mega-books"><div class="wrap mega-inner mega-inner--books">
    <div><h2>Our books</h2><ul class="shelf">${books.map(b => `<li><a href="${b.url}"><div class="surface g-${b.ground}">${mock(ctx, b, { sizes: '180px', widths: [240, 480] })}</div><span><b>${esc(b.name)}</b><small>Ages ${esc(b.ageText)} · ${b.priced.length > 1 ? 'from ' : ''}${money(b.minPrice)}</small></span></a></li>`).join('')}</ul></div>
    <div class="mega-note"><h2>How our books work</h2><p>Every page has something for the child and a short tip for the grown-up reading along. Books are printed when you order them and shipped by the printer.</p>
      <p class="mega-all"><a class="link" href="/shop/books/">All books ${I.arr}</a></p></div>
  </div></div>`;
}
function megaPrintables(ctx) {
  const pr = ctx.products.filter(p => p.types.includes('printables'));
  return `<div class="mega" id="mega-printables"><div class="wrap mega-inner mega-inner--print">
    <div><h2>Printables</h2><ul class="mega-list mega-list--price">${pr.map(p => {
      const f = p.formats.find(x => x.id === 'pdf') || p.priced[0];
      return `<li><a href="${p.url}"><span>${esc(p.name)}</span><small>${esc(p.ageText)}</small><b class="num">${money(f.price)}</b></a></li>`;
    }).join('')}</ul></div>
    <div><h2>Bundles</h2><ul class="mega-list mega-list--price">${ctx.bundles.map(b => `<li><a href="${b.url}"><span>${esc(b.name)}</span><small>${b.parts.length} PDFs</small><b class="num">${money(b.price)}</b></a></li>`).join('')}</ul>
      <div class="mega-note mega-note--frame"><h2>How printables work</h2><p>Plain PDFs in US Letter and A4, in color and low-ink. You print at home or at a print shop, as often as your family needs.</p></div>
      <p class="mega-all"><a class="link" href="/shop/printables/">All printables ${I.arr}</a></p></div>
  </div></div>`;
}

const NAV = [
  ['shop', 'Shop', 'mega-shop', megaShop],
  ['books', 'Books', 'mega-books', megaBooks],
  ['printables', 'Printables', 'mega-printables', megaPrintables]
];

function header(ctx, pg) {
  const cur = pg.nav || '';
  return `<a class="skip-link" href="#main">Skip to content</a>
<div class="utility"><div class="wrap">
  <p>${ctx.anyAvailable ? 'Printables download instantly. Books are printed to order.' : 'Our shop opens soon. Everything here is ready to browse.'}</p>
  <nav aria-label="Help"><a href="/help/">Help center</a><a href="/contact/">Contact</a></nav>
</div></div>
<header class="site-header">
  <div class="mast-row"><div class="wrap masthead">
    <a class="brand" href="/"><img src="/assets/brand/lockup-horizontal.svg" alt="Play Before Pixels, home" width="262" height="32"></a>
    <nav class="primary-nav" aria-label="Main">
      <ul>
        ${NAV.map(([k, label, id, fn]) => `<li><button class="nav-top${cur === k ? ' is-current' : ''}" type="button" aria-expanded="false" aria-controls="${id}" data-mega="${id}">${label} ${I.chev}</button>${fn(ctx)}</li>`).join('\n        ')}
        <li><a class="nav-top${cur === 'free' ? ' is-current' : ''}" href="/free/"${cur === 'free' ? ' aria-current="page"' : ''}>Free printable</a></li>
        <li><a class="nav-top${cur === 'about' ? ' is-current' : ''}" href="/about/"${cur === 'about' ? ' aria-current="page"' : ''}>About</a></li>
      </ul>
    </nav>
    <div class="tools">
      <a class="tool-btn" href="/search/" data-open-search aria-label="Search" aria-keyshortcuts="/">${I.search}<span class="search-label" aria-hidden="true">Search</span><kbd aria-hidden="true">/</kbd></a>
      <button class="tool-btn menu-btn" type="button" data-open-menu aria-haspopup="dialog" aria-controls="mnav" aria-expanded="false">${I.menu}<span>Menu</span></button>
    </div>
  </div></div>
  <div class="nav-scrim" data-nav-scrim></div>
</header>`;
}

function mobileNav(ctx) {
  const acc = (id, title, body) => `<div class="acc"><h2 class="acc-h"><button class="acc-btn" type="button" aria-expanded="false" aria-controls="${id}">${title}<span class="pm" aria-hidden="true"></span></button></h2><div class="acc-panel" id="${id}" hidden>${body}</div></div>`;
  const list = items => '<ul>' + items.map(([u, t, m]) => `<li><a href="${u}">${esc(t)}${m ? ` <small class="meta">${esc(m)}</small>` : ''}</a></li>`).join('') + '</ul>';
  const books = ctx.products.filter(p => p.types.includes('books'));
  const prints = ctx.products.filter(p => p.types.includes('printables'));
  return `<div class="scrim" data-scrim="mnav"></div>
<div class="drawer drawer--left mnav" id="mnav" role="dialog" aria-modal="true" aria-labelledby="mnav-title" data-dialog hidden>
  <div class="drawer-head"><a class="brand" href="/"><img src="/assets/brand/lockup-horizontal.svg" alt="Play Before Pixels, home" width="213" height="26"></a><h2 class="visually-hidden" id="mnav-title">Menu</h2><button class="x-btn" type="button" data-close aria-label="Close menu">${I.x}</button></div>
  <div class="drawer-body">
    <p class="eyebrow m-ages-h" id="m-ages-h">Shop by age</p>
    <ul class="m-ages" aria-labelledby="m-ages-h">${ctx.cfg.bands.map(b => ctx.countBand(b.key)
      ? `<li><a class="m-age c-${b.color}" href="/shop/ages/${b.key}/"><b>${b.label}</b><small>${b.name}</small></a></li>`
      : `<li><span class="m-age m-age--off c-${b.color}"><b>${b.label}</b><small>later</small></span></li>`).join('')}</ul>
    <a class="mnav-search" href="/search/" data-open-search>${I.search}Search books, printables, answers</a>
    ${acc('m-shop', 'Shop', list([...ctx.cfg.types.map(t => [t.path, t.label, String(ctx.countType(t.key))]), ['/shop/', 'Everything we make']]))}
    ${acc('m-books', 'Books', list([...books.map(b => [b.url, b.name, b.ageText]), ['/shop/books/', 'All books']]))}
    ${acc('m-printables', 'Printables', list([...prints.map(b => [b.url, b.name, money((b.formats.find(x => x.id === 'pdf') || b.priced[0]).price)]), ['/shop/bundles/', 'Bundles'], ['/shop/printables/', 'All printables']]))}
    <div class="acc"><a class="acc-btn" href="/free/">Free printable</a></div>
    <div class="acc"><a class="acc-btn" href="/about/">About</a></div>
  </div>
  <div class="drawer-foot mnav-foot"><a href="/help/">Help center</a><a href="/contact/">Contact</a><a href="/research/">Research notes</a></div>
</div>`;
}

function searchSheet() {
  return `<div class="scrim" data-scrim="search"></div>
<div class="search-sheet" id="search" role="dialog" aria-modal="true" aria-label="Search the site" data-dialog hidden>
  <div class="wrap">
    <form class="search-bar" role="search" action="/search/" method="get" data-search-form>
      <label>${I.search}<span class="visually-hidden">Search</span><input type="search" name="q" placeholder="Search books, printables, answers" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="search-results" aria-autocomplete="list" data-search-input></label>
      <button class="x-btn" type="button" data-close aria-label="Close search">${I.x}</button>
    </form>
    <div class="search-results" id="search-results" role="listbox" aria-label="Results" data-search-results></div>
  </div>
</div>`;
}

function footer(ctx, pg = {}) {
  const sign = !['free', 'bonus'].includes(pg.key);
  const S = ctx.cfg.site;
  const follow = Object.entries(ctx.cfg.social).filter(([k]) => ctx.links[k]).map(([k, n]) => `<li><a href="${esc(ctx.links[k])}" rel="noopener me">${esc(n)}</a></li>`).join('');
  const stores = Object.entries(ctx.cfg.stores).filter(([k]) => ctx.links[k]).map(([k, n]) => `<li><a href="${esc(ctx.links[k])}" rel="noopener">${esc(n)}</a></li>`).join('');
  const col = (h, items) => `<div><h2>${h}</h2><ul>${items.map(([u, t]) => `<li><a href="${u}">${t}</a></li>`).join('')}</ul></div>`;
  return `<footer class="footer on-ink">
  <div class="wrap">
    <div class="f-top${sign ? '' : ' f-top--nosign'}">
      ${sign ? `<div class="f-sign">
        <h2>Three plays for your child’s age, once a month.</h2>
        <p>One printable page, matched to your child’s age. Just an email; add a birth month if you like. No names, ever.</p>
        ${require('./bits').signup(ctx, { id: 'fsu', tone: 'ink', source: 'footer', button: 'Send me the plays' })}
      </div>` : ''}
      <nav class="f-cols" aria-label="Footer">
        ${col('Shop by age', [...ctx.cfg.bands.filter(b => ctx.countBand(b.key)).map(b => [`/shop/ages/${b.key}/`, `Ages ${b.label}`]), ['/shop/', 'Everything']])}
        ${col('Shop by type', [...ctx.cfg.types.map(t => [t.path, esc(t.label)]), ['/free/', 'Free printable']])}
        ${col('Help', [['/help/', 'Help center'], ['/contact/', 'Contact'], ['/shipping-returns/', 'Shipping &amp; returns'], ['/licenses/', 'Licenses'], ['/accessibility/', 'Accessibility']])}
        ${col('About', [['/about/', 'About us'], ['/research/', 'Research notes'], ['/privacy/', 'Privacy'], ['/terms/', 'Terms'], ['/disclaimer/', 'Disclaimer'], ['/disclosures/', 'Disclosures']])}
      </nav>
    </div>
    ${follow || stores ? `<div class="f-mid">${follow ? `<div><h2 class="f-mini">Follow</h2><ul class="socials">${follow}</ul></div>` : ''}${stores ? `<div><h2 class="f-mini">Also sold at</h2><ul class="socials">${stores}</ul></div>` : ''}</div>` : ''}
    <div class="f-base">
      <div class="brandline"><img src="/assets/brand/lockup-horizontal-reverse.svg" alt="Play Before Pixels" width="197" height="24" loading="lazy"><span>${esc(S.copyright)}</span></div>
      <nav aria-label="Legal"><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/accessibility/">Accessibility</a><a href="/shipping-returns/">Shipping &amp; returns</a><a href="/licenses/">Licenses</a></nav>
    </div>
    <p class="f-colophon">${I.reg}<span>${esc(S.colophon)}</span></p>
  </div>
</footer>`;
}

function page(ctx, pg, body) {
  return `${head(ctx, pg)}
<body class="${pg.bodyClass || ''}">
${header(ctx, pg)}
<main id="main" tabindex="-1">
${body}
</main>
${footer(ctx, pg)}
${mobileNav(ctx)}
${searchSheet()}
${analytics(ctx, pg)}
</body>
</html>
`;
}

// Research notes: quiet shell. Logo goes to /research/; only hub and policy links; no scripts.
function hubPage(ctx, pg, body) {
  const S = ctx.cfg.site;
  return `${head(ctx, { ...pg, hub: true })}
<body class="hub" data-page="${esc(pg.key || '')}">
<a class="skip-link" href="#main">Skip to content</a>
<header class="hub-header"><div class="wrap hub-mast">
  <a class="brand" href="/research/"><img src="/assets/brand/lockup-horizontal.svg" alt="Play Before Pixels ${esc(S.hubName)}" width="262" height="32"></a>
  <nav aria-label="Research notes"><a href="/research/" aria-current="page">${esc(S.hubName)}</a><a href="/about/">Who we are</a></nav>
</div></header>
<main id="main" tabindex="-1">
${body}
</main>
<footer class="hub-footer"><div class="wrap">
  <p class="hub-who">Published by Play Before Pixels (AlphaPlay LLC), which sells play materials. We are not clinicians. <a href="/about/">How we work</a></p>
  <nav aria-label="Policies"><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/disclaimer/">Disclaimer</a><a href="/accessibility/">Accessibility</a></nav>
  <p class="hub-copy">${esc(S.copyright)}</p>
</div></footer>
</body>
</html>
`;
}

module.exports = { head, header, footer, mobileNav, searchSheet, page, hubPage, jsonld, ageTabs };
