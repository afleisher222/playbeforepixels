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
    title = type.key === 'books' ? 'Talk-Along Books to Read Together | Play Before Pixels' : 'Printables for Families: Play Cards, Busy Books, Routines';
    desc = type.key === 'books'
      ? 'Talk-along and read-aloud picture books with a grown-up tip on every page, printed to order. For babies to age 7.'
      : 'Printable play cards, routine cards and busy-book pages in US Letter and A4, in color and low-ink. Print at home tonight.';
  } else {
    name = 'Everything we make';
    lede = 'Talk-along books, printables and a written course, sorted by age. Pick an age or a type to narrow it down.';
    path = '/shop/';
    title = 'Shop Talk-Along Books, Printables and Play Cards';
    desc = 'Books, printables, bundles and a written course for families, sorted by age. Instant downloads; books printed to order.';
  }
  return { band, type, shown, all, name, lede, path, title, desc };
}

function render(ctx, state) {
  const C = ctx.cfg;
  const v = view(ctx, state);
  const trail = [{ name: 'Home', url: '/' }, { name: 'Shop', url: '/shop/' }];
  if (v.band || v.type) trail.push({ name: v.name, url: v.path });
  const tabs = [`<li><a href="/shop/${v.type && v.type.key !== 'bundles' && v.type.key !== 'course' ? v.type.key + '/' : ''}" class="tab tab--all" data-f-age=""${!v.band ? ' aria-current="true"' : ''}><b>All ages</b><span>0–12</span></a></li>`,
    ...C.bands.map(b => ctx.countBand(b.key)
      ? `<li><a href="/shop/ages/${b.key}/" class="tab r-${b.color}" data-f-age="${b.key}"${v.band && v.band.key === b.key ? ' aria-current="true"' : ''}><b>${b.label}</b><span>${b.name}</span></a></li>`
      : `<li><span class="tab tab--off r-${b.color}"><b>${b.label}</b><span>coming later</span></span></li>`)].join('');
  const chip = (key, label, href) => `<a class="chip" href="${href}" data-f-type="${key}" aria-pressed="${(v.type ? v.type.key : '') === key}">${label}</a>`;
  const chips = [chip('', 'All types', v.band ? `/shop/ages/${v.band.key}/` : '/shop/'),
    ...C.types.map(t => chip(t.key, esc(t.label), t.key === 'books' || t.key === 'printables' ? t.path : `/shop/?type=${t.key}`))].join('');

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
  </section>
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
