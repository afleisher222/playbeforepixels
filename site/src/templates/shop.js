// Shop and its pre-rendered filter pages: /shop/, /shop/books/, /shop/printables/, /shop/ages/<band>/.
// Every filter is a real link (works with JS off). With JS, filters apply in place, can be combined,
// keep their state in the URL, and Back restores them.
'use strict';
const { esc } = require('../lib/util');
const { I, card, crumbs } = require('../partials/bits');
const seo = require('../lib/seo');

const LIMIT = 8;

function items(ctx) {
  return [...ctx.products, ...ctx.bundles.map(b => ({ ...b, types: ['bundles'], ground: b.ground }))];
}

function view(ctx, state) {
  const C = ctx.cfg;
  const band = state.age && C.bands.find(b => b.key === state.age);
  const type = state.type && C.types.find(t => t.key === state.type);
  const all = items(ctx);
  const shown = all.filter(p => (!band || p.bands.includes(band.key)) && (!type || p.types.includes(type.key)));
  let name, lede, path, title, desc;
  if (band) {
    name = `Ages ${band.label}: ${band.name.toLowerCase()}`;
    lede = `Books, printables and plays chosen for ${band.label} ${band.unit}. Everything is sorted on one age scale, so you can start where your child is.`;
    path = `/shop/ages/${band.key}/`;
    title = `Books and Printables for Ages ${band.label} | Play Before Pixels`;
    desc = `Talk-along books, printables and play ideas for ${band.name.toLowerCase()} (ages ${band.label}), sorted by age. Every item explains the why in plain words.`;
  } else if (type) {
    name = type.label;
    lede = type.lede;
    path = type.path;
    title = { books: 'Talk-Along Books to Read Together | Play Before Pixels', printables: 'Printables for Families: Play Cards, Busy Books, Routines', bundles: 'Printable Play Bundles, One Plain Price | Play Before Pixels' }[type.key];
    desc = {
      books: 'Talk-along and read-aloud picture books with a grown-up tip on every page, printed to order. For babies to age 7.',
      printables: 'Printable play cards, routine cards and busy-book pages in US Letter and A4, in color and low-ink. Print at home tonight.',
      bundles: 'Sets of our printables for young children at one plain price below the parts. Every part and every price listed, no “was” prices.'
    }[type.key];
  } else {
    name = 'Everything we make';
    lede = 'Talk-along books, printables and a written course, sorted by age. Pick an age or a type to narrow it down.';
    path = '/shop/';
    title = 'Shop Talk-Along Books, Printables and Play Cards';
    desc = 'Books, printables, bundles and a written course for families, sorted by age. Instant downloads; books printed to order.';
  }
  return { band, type, shown, all, name, lede, path, title, desc };
}

function bundleDetails(ctx) {
  const { stack, buy } = require('../partials/bits');
  const { money } = require('../lib/util');
  return `<section class="section bundles-sec" aria-labelledby="bd-h">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow">What is in each set</p><h2 class="h2" id="bd-h">Every part, every price.</h2></div>
      <p class="lede measure">Each set is a fixed group of our printables at one plain price, below the parts’ everyday prices added up. No countdowns, no “was” prices.</p></div>
    <div class="bd-list">
    ${ctx.bundles.map(b => `<article class="bd" id="${b.id}" aria-labelledby="${b.id}-h">
      <div class="surface g-${b.ground} bd-vis">${stack(ctx, b.parts, { label: 'The printables in ' + b.name })}</div>
      <div class="bd-copy">
        <p class="eyebrow">${b.parts.length} sets${(b.freeParts || []).length ? ' + play coupons, included' : ''} · ages ${esc(b.ageText)}</p>
        <h3 class="h2 bd-h" id="${b.id}-h">${esc(b.name)}</h3>
        <p class="lede">${esc(b.line)}</p>
        <table class="price-table"><caption class="visually-hidden">What is in ${esc(b.name)}</caption>
          <thead><tr><th scope="col">Part</th><th scope="col">Format</th><th scope="col" class="r">On its own</th></tr></thead>
          <tbody>${b.parts.map(x => `<tr><th scope="row"><a href="${x.p.url}">${esc(x.p.name)}</a></th><td>${esc(x.f.label)}</td><td class="r num">${money(x.f.price)}</td></tr>`).join('')}${(b.freeParts || []).map(x => `<tr><th scope="row"><a href="${x.p.url}">${esc(x.p.name)}</a></th><td>Included in the set</td><td class="r">Not counted</td></tr>`).join('')}</tbody>
          <tfoot><tr><th scope="row">The set</th><td>One price for everything above</td><td class="r num">${money(b.price)}</td></tr></tfoot>
        </table>
        ${b.buyUrl ? `<a class="btn" href="${esc(b.buyUrl)}" rel="noopener">Buy the set · ${money(b.price)}</a>` : '<div class="soon"><p class="soon-pill">Available soon</p><p class="soon-note">The set goes on sale together with its parts. Nothing can be bought or charged yet.</p></div>'}
      </div>
    </article>`).join('\n')}
    </div>
  </div>
</section>`;
}

function render(ctx, state) {
  const C = ctx.cfg;
  const v = view(ctx, state);
  const trail = [{ name: 'Home', url: '/' }, { name: 'Shop', url: '/shop/' }];
  if (v.band || v.type) trail.push({ name: v.name, url: v.path });
  const maxAge = Math.max(...C.bands.filter(b => ctx.countBand(b.key)).map(b => b.hi));
  const tabs = [`<li><a href="${v.type ? v.type.path : '/shop/'}" class="tab tab--all" data-f-age=""${!v.band ? ' aria-current="true"' : ''}><b>All</b><span>ages 0–${maxAge}</span></a></li>`,
    ...C.bands.map(b => ctx.countBand(b.key)
      ? `<li><a href="/shop/ages/${b.key}/" class="tab r-${b.color}" data-f-age="${b.key}"${v.band && v.band.key === b.key ? ' aria-current="true"' : ''}><b>${b.label}</b><span>${b.name}</span></a></li>`
      : `<li><span class="tab tab--off r-${b.color}"><b>${b.label}</b><span>coming later</span></span></li>`)].join('');
  const chip = (key, label, href) => `<a class="chip" href="${href}" data-f-type="${key}" aria-pressed="${(v.type ? v.type.key : '') === key}">${label}</a>`;
  const chips = [chip('', 'All types', v.band ? `/shop/ages/${v.band.key}/` : '/shop/'),
    ...C.types.filter(t => t.key !== 'course').map(t => chip(t.key, esc(t.label), t.path))].join('');

  const cards = v.shown.map((p, i) => card(ctx, p, { h: 2, order: i, sizes: '(max-width: 760px) 40vw, (max-width: 1060px) 26vw, 18vw' }));
  const first = cards.slice(0, LIMIT).join('\n');
  const rest = cards.slice(LIMIT);
  // All cards (for in-place filtering with JS) travel in a template, so each page stays crawlable
  // and JS can filter across the whole catalog.
  const allCards = v.all.map((p, i) => card(ctx, p, { h: 2, order: i, sizes: '(max-width: 760px) 40vw, (max-width: 1060px) 26vw, 18vw' })).join('\n');

  const body = `<header class="shop-head"><div class="wrap">
    ${crumbs(trail).replace('<nav class="crumbs"', '<nav class="crumbs" data-crumbs')}
    <div class="shop-title"><h1 class="h1" data-shop-title>${esc(v.name)}</h1><p class="lede" data-shop-lede>${esc(v.lede)}</p></div>
  </div></header>
  <div class="shop-controls"><div class="wrap">
    <nav class="age-rail" aria-label="Filter by age"><ol class="tabs">${tabs}</ol></nav>
    <div class="filter-row">
      <div class="type-chips" role="group" aria-label="Filter by type">${chips}</div>
      <div class="sort"><p class="count num" data-shop-count aria-live="polite">${v.shown.length} ${v.shown.length === 1 ? 'thing' : 'things'}</p>
        <label class="select-inline" data-sort-wrap hidden><span>Sort</span><select data-sort><option value="featured">Featured</option><option value="age">Youngest first</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option></select></label></div>
    </div>
  </div></div>
  <section class="wrap shop-grid-wrap" aria-label="Products" data-shop data-base-age="${v.band ? v.band.key : ''}" data-base-type="${v.type ? v.type.key : ''}">
    <ul class="p-grid" data-shop-grid>
${first}
    </ul>
    ${rest.length ? `<details class="more-static" data-more-static><summary class="btn btn--light more-btn">Show all ${v.shown.length}</summary><ul class="p-grid p-grid--more">${rest.join('\n')}</ul></details>` : ''}
    <p class="more-wrap" hidden data-show-more-wrap><button class="btn btn--light more-btn" type="button" data-show-more>Show all <span>0</span></button></p>
    <div class="shop-empty" data-shop-empty hidden>
      <p class="hand">Nothing here yet.</p>
      <p>We don’t make that combination yet. Try another age, or see everything.</p>
      <a class="link" href="/shop/" data-reset>Show everything ${I.arr}</a>
    </div>
    <template data-all-cards>${allCards}</template>
    <script type="application/json" data-shop-cfg>${JSON.stringify({
      limit: LIMIT, allName: 'Everything we make', allLede: view(ctx, {}).lede, titleBase: 'Shop | Play Before Pixels',
      bands: Object.fromEntries(C.bands.filter(b => ctx.countBand(b.key)).map(b => [b.key, { label: b.label, name: `Ages ${b.label}: ${b.name.toLowerCase()}`, lede: view(ctx, { age: b.key }).lede }])),
      types: Object.fromEntries(C.types.filter(t => t.key !== 'course').map(t => [t.key, { label: t.label, path: t.path, lede: t.lede }]))
    }).replace(/</g, '\\u003c')}</script>
  </section>
  ${v.type && v.type.key === 'bundles' ? bundleDetails(ctx) : ''}
  <section class="section section--wash shop-help" aria-labelledby="sh-h">
    <div class="wrap sh-grid">
      <div><p class="eyebrow">Before you buy</p><h2 class="h2" id="sh-h">Plain answers, one click away.</h2></div>
      <div>
        <p class="lede">How downloads arrive, how to print at home, how printed-to-order books ship, what the license lets your family do, and what happens if something goes wrong.</p>
        <p class="sh-links"><a class="link" href="/help/#downloads">Downloads and printing ${I.arr}</a><a class="link" href="/shipping-returns/">Shipping and returns ${I.arr}</a><a class="link" href="/licenses/">Licenses ${I.arr}</a></p>
      </div>
    </div>
  </section>`;
  return ctx.page({
    key: 'shop', path: v.path, nav: 'shop', title: v.title, description: v.desc,
    jsonld: [seo.breadcrumbs(ctx, trail), { '@context': 'https://schema.org', '@type': 'CollectionPage', name: v.name, url: ctx.cfg.site.url + v.path, isPartOf: { '@id': ctx.cfg.site.url + '/#site' } }]
  }, body);
}

module.exports = { render, view, LIMIT };
