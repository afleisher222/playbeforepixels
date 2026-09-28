#!/usr/bin/env node
// Play Before Pixels site build. Node >= 20, standard library only (pictures are made by
// site/tools/images.py with Pillow + PyMuPDF and cached in site/assets/img/).
//
//   node site/build.js            -> site/dist/  (the Cloudflare Pages output directory)
//   node site/build.js --preview  -> same, but robots.txt says "Disallow: /" and every page is noindex
//
// Inputs: products/*/listing*.json, commerce/links.js, site/config.json, legal/*.md,
// content/research-hub/**/*.md (publish: true only), seo/articles/*.md (status: published and
// publish_gate: none only), brand/logo/*, brand/fonts/*.
// The build fails (exit 1) on: a listing missing a title, price or alt text; a shown price that
// is not in listing.json; banned words; autism keywords outside /research/; 5–12 (G1) wording
// while that gate is closed; internal placeholders; coaching offers; an internal link or image
// with no target; missing or duplicate titles and descriptions.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { load } = require('./src/lib/data');
const { Images } = require('./src/lib/images');
const { esc, write, mkdirp, exists, frontMatter, markdown } = require('./src/lib/util');
const chrome = require('./src/partials/chrome');
const bits = require('./src/partials/bits');
const home = require('./src/templates/home');
const shop = require('./src/templates/shop');
const product = require('./src/templates/product');
const pages = require('./src/templates/pages');
const legal = require('./src/templates/legal');
const seo = require('./src/lib/seo');

const t0 = Date.now();
// Cloudflare Pages sets CF_PAGES_BRANCH; any branch other than main builds as a noindex preview.
const PREVIEW = process.argv.includes('--preview') || (!!process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main');
const log = (...a) => console.log('[build]', ...a);
const D = load();
const { ROOT, SITE, config: C } = D;
const DIST = path.join(SITE, 'dist');
const fail = [];
const warn = [...D.warnings];
fail.push(...D.errors);
if (fail.length) { console.error('Build stopped:\n - ' + fail.join('\n - ')); process.exit(1); }

// ---------- fresh output ----------
fs.rmSync(DIST, { recursive: true, force: true });
mkdirp(DIST);
const hash = s => crypto.createHash('sha1').update(s).digest('hex').slice(0, 10);
const copy = (from, to) => { mkdirp(path.dirname(to)); fs.copyFileSync(from, to); };

// ---------- static assets ----------
// Fonts: brand/fonts/fonts.css (static instances, print-safe) is copied unchanged with every file it names.
const fontsCss = fs.readFileSync(path.join(ROOT, 'brand/fonts/fonts.css'), 'utf8');
for (const m of fontsCss.matchAll(/url\("?(static\/[^")]+)"?\)/g)) copy(path.join(ROOT, 'brand/fonts', m[1]), path.join(DIST, 'assets/fonts', m[1]));
fs.writeFileSync(path.join(DIST, 'assets/fonts/fonts.css'), fontsCss);
// Logo: only the adopted Maker's Seal files in brand/logo/.
for (const f of ['lockup-horizontal.svg', 'lockup-horizontal-reverse.svg', 'lockup-stacked.svg', 'mark.svg', 'mark-small.svg', 'wordmark.svg']) copy(path.join(ROOT, 'brand/logo', f), path.join(DIST, 'assets/brand', f));
copy(path.join(ROOT, 'brand/logo/png/mark-512.png'), path.join(DIST, 'assets/brand/mark-512.png'));
copy(path.join(ROOT, 'brand/logo/og-image-1200x630.png'), path.join(DIST, 'assets/brand/og-image.png'));
copy(path.join(ROOT, 'brand/logo/favicon.svg'), path.join(DIST, 'favicon.svg'));
copy(path.join(ROOT, 'brand/logo/favicon.ico'), path.join(DIST, 'favicon.ico'));
copy(path.join(ROOT, 'brand/logo/png/apple-touch-icon-180.png'), path.join(DIST, 'apple-touch-icon.png'));
copy(path.join(ROOT, 'brand/logo/png/favicon-48.png'), path.join(DIST, 'favicon-48.png'));
fs.writeFileSync(path.join(DIST, 'site.webmanifest'), JSON.stringify({
  name: C.site.name, short_name: C.site.name, start_url: '/', display: 'browser', background_color: '#FFFFFF', theme_color: '#FFFFFF',
  icons: [{ src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }, { src: '/assets/brand/mark-512.png', sizes: '512x512', type: 'image/png' }]
}, null, 1));

// CSS and JS: concatenated, comments stripped, file names carry a content hash.
const cssSrc = ['tokens', 'base', 'components', 'pages'].map(n => fs.readFileSync(path.join(SITE, 'src/styles', n + '.css'), 'utf8')).join('\n')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n\s*\n+/g, '\n');
const jsSrc = fs.readFileSync(path.join(SITE, 'src/js/site.js'), 'utf8');
const cssName = `/assets/site.${hash(cssSrc)}.css`, jsName = `/assets/site.${hash(jsSrc)}.js`;
write(path.join(DIST, cssName), cssSrc);
write(path.join(DIST, jsName), jsSrc);

// ---------- context ----------
const img = new Images({ root: ROOT, outDir: path.join(SITE, 'assets/img'), base: '/assets/img/' });
const qaFile = path.join(SITE, 'qa/last-run.json');
const ctx = {
  ROOT, cfg: C, env: D.env, links: D.links, products: D.products, bundles: D.bundles, bySlug: D.bySlug,
  words: D.words, course: D.course, gates: D.gates, img, warn: m => warn.push(m),
  anyAvailable: D.products.some(p => p.available),
  countBand: k => D.products.filter(p => p.bands.includes(k)).length + D.bundles.filter(b => b.bands.includes(k)).length,
  countType: k => k === 'bundles' ? D.bundles.length : D.products.filter(p => p.types.includes(k)).length,
  assets: {
    css: cssName, js: jsName, fontsCss: '/assets/fonts/fonts.css',
    fontPreload: ['/assets/fonts/static/bricolage-grotesque-800-opsz96-latin.woff2', '/assets/fonts/static/nunito-sans-400-opsz12-latin.woff2'],
    ogDefault: C.site.url + '/assets/brand/og-image.png'
  }
};
ctx.page = (pg, body) => chrome.page(ctx, { ...pg, noindex: pg.noindex || PREVIEW }, body);
ctx.hubPage = (pg, body) => chrome.hubPage(ctx, { ...pg, noindex: pg.noindex || PREVIEW }, body);

// ---------- pages ----------
const out = new Map();          // url path -> { html, index }
const put = (p, html, o = {}) => { if (out.has(p)) fail.push('two pages want ' + p); out.set(p, { html, index: !o.noindex && !/name="robots" content="noindex/.test(html) }); };

put('/', home(ctx));
put('/shop/', shop.render(ctx, {}));
for (const t of C.types.filter(t => t.key !== 'course')) put(t.path, shop.render(ctx, { type: t.key }));
for (const b of C.bands) if (ctx.countBand(b.key)) put(`/shop/ages/${b.key}/`, shop.render(ctx, { age: b.key }));
for (const p of D.products) put(p.url, product(ctx, p));
put('/free/', pages.free(ctx));
put('/about/', pages.about(ctx));
put('/help/', pages.help(ctx));
put('/contact/', pages.contact(ctx));
put('/licenses/', pages.licenses(ctx));
for (const k of ['privacy', 'terms', 'disclaimer', 'shipping', 'disclosures']) put(legal.PAGES[k].path, legal.policy(ctx, k));
const qa = exists(qaFile) ? JSON.parse(fs.readFileSync(qaFile, 'utf8')) : null;
put('/accessibility/', pages.accessibility(ctx, qa));
const R = pages.research(ctx);
put('/research/', R.html);
for (const hp of R.pages) { const a = pages.hubArticle(ctx, hp); put(a.url, a.html); }
put('/search/', pages.search(ctx), { noindex: true });
put('/thank-you/', pages.thanks(ctx), { noindex: true });
put('/404.html', pages.notFound(ctx), { noindex: true });
const bonusSlugs = [...new Set([...C.bonusPages, ...Object.keys(D.bonusNames)])].sort();
for (const s of bonusSlugs) put(`/bonus/${s}/`, pages.bonus(ctx, s), { noindex: true });

// SEO articles: only status "published" with publish_gate "none" are built (none today).
const artDir = path.join(ROOT, 'seo/articles');
const articles = exists(artDir) ? fs.readdirSync(artDir).filter(f => f.endsWith('.md')).map(f => ({ f, ...frontMatter(fs.readFileSync(path.join(artDir, f), 'utf8')) })) : [];
const liveArticles = articles.filter(a => a.data.status === 'published' && a.data.publish_gate === 'none' && a.data.lang !== 'es');
for (const a of liveArticles) {
  const url = a.data.url;
  const hub = url.startsWith('/research/');
  const trail = [{ name: 'Home', url: '/' }, { name: a.data.title, url }];
  const body = `<div class="wrap">${bits.crumbs(trail)}</div><article class="wrap doc"><header class="doc-head"><h1 class="h1">${esc(a.data.title)}</h1><p class="meta">Last reviewed ${esc(a.data.last_reviewed || '')}</p></header><div class="prose doc-body">${markdown(a.body.replace(/^# [^\n]*\n/, '')).replace(/<h1/g, '<h2').replace(/<\/h1>/g, '</h2>')}</div></article>`;
  const pg = { key: 'article', path: url, title: a.data.title, description: a.data.meta_description, ogType: 'article', jsonld: [seo.breadcrumbs(ctx, trail)] };
  put(url, hub ? ctx.hubPage(pg, body) : ctx.page(pg, body));
}
log(`articles: ${liveArticles.length} of ${articles.length} built (the rest are drafts or gated)`);

// ---------- pictures ----------
const swap = img.finalize({ siteUrl: C.site.url, log });
for (const [p, v] of out) v.html = swap(v.html);
const used = new Set();
for (const v of out.values()) for (const m of v.html.matchAll(/\/assets\/img\/([\w.-]+)/g)) used.add(m[1]);

// ---------- search index ----------
const helpItems = pages.helpData(ctx).flatMap(s => s.qs.map(q => ({ g: 'a', t: q.q, k: q.a + ' ' + s.h, u: `/help/#${s.id}`, m: `Help · ${s.h}` })));
const thumb = p => { if (p.mock === 'workbook-css') return ''; const tok = img.url(bits.coverSrc(p), 160); return swap(tok); };
const searchIndex = {
  items: [
    ...D.products.map(p => ({ g: 'p', t: p.name, k: [p.line, p.short, p.types.join(' '), 'ages ' + p.ageText, p.formats.map(f => f.label).join(' ')].join(' '), u: p.url, m: `Ages ${p.ageText} · ${p.formats.filter(f => !f.planned).map(f => f.label).join(', ')}`, p: (p.priced.length > 1 ? 'from ' : '') + require('./src/lib/util').money(p.minPrice), i: thumb(p) })),
    ...D.bundles.map(b => ({ g: 'p', t: b.name, k: b.line + ' bundle set gift ' + b.parts.map(x => x.p.name).join(' '), u: b.url, m: `${b.parts.length} printables · ages ${b.ageText}`, p: require('./src/lib/util').money(b.price), i: thumb(b.parts[0].p) })),
    { g: 'g', t: C.free.title + ' (free printable)', k: 'free printable seven days plays tracker screen spot', u: '/free/', m: 'Free printable' },
    { g: 'g', t: 'Licenses', k: 'license personal family classroom school site share', u: '/licenses/', m: 'What you may do with our files' },
    { g: 'g', t: 'Shipping, returns and refunds', k: 'shipping returns refund damaged delivery', u: '/shipping-returns/', m: 'Policy (draft)' },
    { g: 'g', t: 'Contact', k: 'contact email write message', u: '/contact/', m: 'Write to us' },
    { g: 'g', t: 'About us', k: 'about who founder parent educator', u: '/about/', m: 'Founded by a parent and educator' },
    { g: 'g', t: 'Accessibility statement', k: 'accessibility large print screen reader format', u: '/accessibility/', m: 'What we tested' },
    { g: 'g', t: 'Privacy policy', k: 'privacy data email delete unsubscribe', u: '/privacy/', m: 'Policy (draft)' },
    ...helpItems
  ],
  suggest: [...C.bands.filter(b => ctx.countBand(b.key)).map(b => ({ t: `Ages ${b.label}`, u: `/shop/ages/${b.key}/` })), { t: 'Books', u: '/shop/books/' }, { t: 'Printables', u: '/shop/printables/' }, { t: 'Free printable', u: '/free/' }]
};
for (const it of searchIndex.items) if (it.i) for (const m of it.i.matchAll(/\/assets\/img\/([\w.-]+)/g)) used.add(m[1]);
write(path.join(DIST, 'assets/search.json'), JSON.stringify(searchIndex));
for (const n of used) copy(path.join(SITE, 'assets/img', n), path.join(DIST, 'assets/img', n));

// ---------- redirects (printed URLs must keep working) ----------
const redirects = C.redirects.map(([a, b]) => [a, b]);
redirects.push(['/free/7-days-of-play-first', '/free/'], ['/free/7-days-of-play-first/', '/free/']);
for (const p of D.hidden) if (!out.has(`/shop/${p.slug}/`)) { /* held products get no page */ }
const redirLines = ['# Written by site/build.js. Printed and emailed URLs that must keep working (ops/TESTS/printed-urls.md).', ...redirects.map(([a, b]) => `${a} ${b} 301`)];
fs.writeFileSync(path.join(DIST, '_redirects'), redirLines.join('\n') + '\n');
// Static fallback pages for hosts without _redirects (and for the local QA server).
for (const [from, to] of redirects) {
  if (!from.endsWith('/') || out.has(from)) continue;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved</title><meta name="robots" content="noindex"><link rel="canonical" href="${C.site.url}${to.split('#')[0]}"><meta http-equiv="refresh" content="0; url=${to}"></head><body><p>This page has moved to <a href="${to}">${to}</a>.</p></body></html>`;
  write(path.join(DIST, from, 'index.html'), html);
}
fs.writeFileSync(path.join(DIST, '_headers'), [
  '/*', '  X-Content-Type-Options: nosniff', '  Referrer-Policy: strict-origin-when-cross-origin', '  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()', '  X-Frame-Options: SAMEORIGIN',
  '/assets/*', '  Cache-Control: public, max-age=31536000, immutable',
  '/assets/search.json', '  Cache-Control: public, max-age=3600',
  '/assets/fonts/fonts.css', '  Cache-Control: public, max-age=86400'
].join('\n') + '\n');

// ---------- write pages ----------
for (const [p, v] of out) write(path.join(DIST, p.endsWith('/') ? p + 'index.html' : p), v.html);

// ---------- sitemap and robots ----------
const today = new Date().toISOString().slice(0, 10);
const indexable = [...out].filter(([p, v]) => v.index && p !== '/404.html').map(([p]) => p).sort();
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexable.map(p => `  <url><loc>${C.site.url}${p}</loc><lastmod>${today}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${C.site.url}${p}"/><xhtml:link rel="alternate" hreflang="x-default" href="${C.site.url}${p}"/></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(DIST, 'robots.txt'), PREVIEW ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nDisallow: /search/\nDisallow: /bonus/\nDisallow: /thank-you/\n\nSitemap: ${C.site.url}/sitemap.xml\n`);

// ---------- checks ----------
const textOf = html => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<template[\s\S]*?<\/template>/g, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ');
const attrText = html => [...html.matchAll(/\s(?:alt|title|aria-label|content|placeholder)="([^"]*)"/g)].map(m => m[1]).join(' ');
const NEG = /\b(not|no|isn’t|aren’t|never|nor|without)\b[^.]{0,90}$/i;
const titles = new Map(), descs = new Map();
for (const [p, v] of out) {
  const h = v.html;
  const txt = textOf(h) + ' ' + attrText(h);
  const where = `page ${p}`;
  for (const m of txt.matchAll(/\b(therapy|therapies|cure[sd]?|heal|reverse[sd]?|speech delay|late talker|catch up)\b/gi)) {
    const before = txt.slice(Math.max(0, m.index - 110), m.index);
    if (!NEG.test(before)) fail.push(`${where}: banned word "${m[0]}" …${before.slice(-60)}${m[0]}…`);
  }
  if (/clinically proven|was \$|\bsale ends\b|only \d+ left/i.test(txt)) fail.push(`${where}: banned pricing or claim wording`);
  if (!p.startsWith('/research/') && /autis|\bASD\b/i.test(txt + h.replace(/<[^>]*>/g, ' '))) fail.push(`${where}: autism keyword outside /research/`);
  if (/\bFOUNDER\b|PLACEHOLDER|\[VERIFY\]|\bTODO\b|lorem ipsum|UNVERIFIED|\{\{/.test(txt)) fail.push(`${where}: internal placeholder text`);
  if (!C.gates.ages5to12.open && /\b[0-4]\s*–\s*12\b(?!\s*months)|\b5\s*–\s*12\b|\b9\s*–\s*12\b/.test(txt)) fail.push(`${where}: ages 5–12 wording while that gate is closed: ${(/.{0,50}\b(?:[0-4]|5|9)\s*–\s*12\b.{0,30}/.exec(txt) || [''])[0]}`);
  for (const m of txt.matchAll(/coach/gi)) { const before = txt.slice(Math.max(0, m.index - 110), m.index); if (!NEG.test(before)) fail.push(`${where}: coaching wording "${txt.slice(m.index - 40, m.index + 30)}"`); }
  if (/\b(MCPS|Montgomery County|MCEA|MSEA)\b/.test(txt)) fail.push(`${where}: excluded organization named`);
  // SEO basics
  const title = (/<title>([^<]*)<\/title>/.exec(h) || [])[1];
  const desc = (/<meta name="description" content="([^"]*)"/.exec(h) || [])[1];
  if (!title) fail.push(`${where}: no <title>`); else { if (titles.has(title) && v.index) fail.push(`${where}: duplicate title (also ${titles.get(title)})`); titles.set(title, p); if (title.replace(/&amp;/g, '&').length > 60) warn.push(`${where}: title is ${title.length} characters`); }
  if (!desc) fail.push(`${where}: no meta description`); else { if (descs.has(desc) && v.index) fail.push(`${where}: duplicate description (also ${descs.get(desc)})`); descs.set(desc, p); if (desc.replace(/&amp;/g, '&').length > 160) warn.push(`${where}: description is ${desc.length} characters`); }
  if (!/<link rel="canonical" href="https:\/\/playbeforepixels\.com\//.test(h)) fail.push(`${where}: no canonical`);
  if ((h.match(/<h1[\s>]/g) || []).length !== 1) fail.push(`${where}: ${(h.match(/<h1[\s>]/g) || []).length} h1 elements`);
  if (/"@type":"(Review|AggregateRating)"/.test(h)) fail.push(`${where}: review markup`);
  if (/booking/i.test(h.replace(/<[^>]+>/g, '')) && D.links.booking) fail.push(`${where}: booking link rendered`);
  // Every internal link and image has a target.
  const ids = new Set([...h.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
  for (const m of h.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) {
    const [pathPart, frag] = m[1].split('#');
    const u = pathPart.split('?')[0];
    if (!u) { if (frag && !ids.has(frag)) fail.push(`${where}: in-page link #${frag} has no target`); continue; }
    const f = path.join(DIST, u);
    const ok = exists(f) && fs.statSync(f).isFile() || exists(path.join(f, 'index.html')) || redirects.some(([a]) => a === u);
    if (!ok) fail.push(`${where}: link or image ${m[1]} has no target`);
    else if (frag && out.has(u) && !new RegExp(`\\sid="${frag}"`).test(out.get(u).html)) fail.push(`${where}: ${m[1]} has no #${frag} on that page`);
  }
}
// Printed URLs (ops/TESTS/printed-urls.md) must each resolve to a page or a redirect.
const printed = fs.readFileSync(path.join(ROOT, 'ops/TESTS/printed-urls.md'), 'utf8');
const printedPaths = [...new Set(printed.split('\n').filter(l => /^\|/.test(l)).flatMap(l => [...l.matchAll(/`(\/[a-z0-9/_-]*)`/g)].map(m => m[1])))];
const resolves = u => { const n = u.endsWith('/') ? u : u + '/'; return out.has(u) || out.has(n) || redirects.some(([a]) => a === u || a === n); };
const printedMissing = printedPaths.filter(u => !resolves(u));
if (printedMissing.length) fail.push('printed URLs with no page or redirect: ' + printedMissing.join(', '));

// ---------- report ----------
write(path.join(DIST, '.build-report.json'), JSON.stringify({ built: new Date().toISOString(), preview: PREVIEW, pages: [...out.keys()].sort(), indexable: indexable.length, redirects: redirects.length, printedChecked: printedPaths.length, hidden: D.hidden, warnings: warn }, null, 1));
for (const w of warn) console.warn('[warn]', w);
if (fail.length) { console.error(`\nBuild FAILED (${fail.length}):\n - ` + [...new Set(fail)].join('\n - ')); process.exit(1); }
log(`${out.size} pages (${indexable.length} in the sitemap), ${redirects.length} redirects, ${used.size} pictures, ${printedPaths.length} printed URLs resolve · ${((Date.now() - t0) / 1000).toFixed(1)}s → site/dist/`);
