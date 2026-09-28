// Product page (DESIGN-SYSTEM §3 "Product page blocks"): breadcrumb, gallery, title, mini ruler,
// format radio cards with prices, one filled buy button (or an honest "Available soon"), ship line,
// "Also sold at", the book's inside, the Grown-up corner band, details, FAQ and "Next for your child's age".
'use strict';
const { esc, money, typo } = require('../lib/util');
const { I, card, crumbs, miniRuler, faq, buy, storeName } = require('../partials/bits');
const seo = require('../lib/seo');

function galleryItems(ctx, p) {
  const base = `products/${p.dir}/`;
  const fs = require('fs'), path = require('path');
  const has = rel => fs.existsSync(path.join(ctx.ROOT, base, rel));
  // A picture a product lane is re-rendering right now is left out of this build, not fatal.
  const gal = p.gallery.filter(g => {
    const need = g.spread || [g.pdf || g.src].filter(Boolean);
    const ok = need.every(has);
    if (!ok && ctx.warn) ctx.warn(`${p.slug}: gallery picture missing (${need.join(', ')}), left out`);
    return ok;
  });
  return gal.map((g, i) => {
    const alt = g.altFrom ? p.listing[g.altFrom] : g.alt;
    if (g.css) return { kind: 'css', alt };
    if (g.spread) return { kind: 'spread', alt, srcs: g.spread.map(s => base + s) };
    if (g.pdf) return { kind: 'page', alt, src: { pdf: base + g.pdf, page: g.page } };
    const kind = /mockup|picker/.test(g.src) ? 'photo' : (/cover/.test(g.src) ? 'cover' : 'page');
    return { kind, alt, src: base + g.src };
  });
}

function gallery(ctx, p) {
  const items = galleryItems(ctx, p);
  const big = (src, alt, eager) => ctx.img.pic({ src, widths: [640, 1100, 1600], sizes: '(max-width: 1060px) 100vw, 56vw', alt, eager, priority: eager });
  const slides = items.map((it, i) => {
    let inner;
    if (it.kind === 'css') inner = require('../partials/bits').workbook(p, { label: it.alt });
    else if (it.kind === 'photo') inner = big(it.src, it.alt, i === 0);
    else if (it.kind === 'spread') inner = `<div class="spread">${it.srcs.map((s, k) => ctx.img.pic({ src: s, widths: [480, 800], sizes: '(max-width: 1060px) 46vw, 26vw', alt: k === 0 ? it.alt : '', eager: i === 0 })).join('')}</div>`;
    else inner = `<div class="flat-page ${it.kind === 'cover' ? 'is-cover' : ''}">${ctx.img.pic({ src: it.src, widths: [480, 900, 1300], sizes: '(max-width: 1060px) 80vw, 40vw', alt: it.alt, eager: i === 0 })}</div>`;
    return `<figure class="slide surface g-${it.kind === 'photo' ? 'wash' : p.ground} slide--${it.kind}" id="slide-${i}" data-slide="${i}"${i ? ' hidden' : ''}>${inner}</figure>`;
  }).join('\n');
  const thumbs = items.length > 1 ? `<div class="thumbs" role="group" aria-label="Pictures of ${esc(p.name)}">${items.map((it, i) => {
    const src = it.kind === 'spread' ? it.srcs[0] : it.src;
    return `<button type="button" aria-pressed="${i === 0}" aria-controls="slide-${i}" data-thumb="${i}"><span class="visually-hidden">Picture ${i + 1} of ${items.length}</span>${ctx.img.pic({ src, widths: [160], alt: '' })}</button>`;
  }).join('')}</div>` : '';
  const note = p.cfg.note ? `<p class="stage-cap">${esc(p.cfg.note)}</p>` : '';
  return `<div class="pdp-gallery" data-gallery>${thumbs}<div class="stage">${slides}${note}</div></div>`;
}

function formats(ctx, p) {
  const opts = p.formats.map((f, i) => {
    const off = !!f.planned;
    const first = p.formats.findIndex(x => !x.planned);
    return `<label class="fmt-opt${off ? ' is-off' : ''}">
      <input type="radio" name="format" value="${f.id}"${i === first ? ' checked' : ''}${off ? ' disabled' : ''}
        data-price="${off ? '' : f.price}" data-buy="${esc(f.buyUrl || '')}" data-store="${esc(storeName(ctx, f.buyKey))}" data-ship="${esc(f.ship || '')}">
      <span><b>${esc(f.label)}</b><small>${esc(typo(f.detail || ''))}</small>${off ? `<small class="fmt-later">${esc(f.planned)}</small>` : ''}</span>
      <span class="price num">${off ? '<span class="later">Later</span>' : money(f.price)}</span>
    </label>`;
  }).join('');
  return `<fieldset class="formats"><legend>Choose a format</legend>${opts}</fieldset>`;
}

function wordExplorer(ctx, p) {
  const W = ctx.words;
  if (!W || !p.cfg.wordExplorer) return '';
  const off = p.cfg.wordPageOffset || 0;
  const pageSrc = i => `products/${p.dir}/${p.cfg.wordPages.replace('{n}', String(i + off).padStart(2, '0'))}`;
  const first = 2;
  const cue = { act: 'Act it', say: 'Say it', sign: 'Sign it' };
  const w = W[first];
  const data = W.map((x, i) => ({ w: x.w, cue: (cue[x.cue[0]] || 'Try it') + ': ' + x.cue[1], tip: x.tip, page: i + off, img: ctx.img.url(pageSrc(i), 800) }));
  return `<section class="section word-sec" aria-labelledby="words-h">
  <div class="wrap inside-grid">
    <div class="inside-copy">
      <p class="eyebrow">Look inside</p>
      <h2 class="h2" id="words-h">Tap a word to see its page.</h2>
      <p class="lede">Each of the ${W.length} words has one big picture, a sound, sign or move to copy, and a tip for the grown-up reading along.</p>
      <ul class="words" data-words>${W.map((x, i) => `<li><button type="button" class="wbtn" aria-pressed="${i === first}" data-word="${i}" aria-controls="word-out">${esc(x.w)}</button></li>`).join('')}</ul>
    </div>
    <div class="word-out" id="word-out" aria-live="polite">
      <div class="wo-page">${ctx.img.pic({ src: pageSrc(first), widths: [480, 800], sizes: '(max-width: 1060px) 70vw, 30vw', alt: `The page for “${w.w}”.`, attrs: 'data-wo-img' })}</div>
      <div class="wo-card">
        <p class="wo-meta"><span data-wo-page>Page ${first + off}</span><span>Grown-up tip</span></p>
        <p class="wo-word word" data-wo-word>${esc(w.w)}</p>
        <p class="wo-cue" data-wo-cue>${esc((cue[w.cue[0]] || 'Try it') + ': ' + w.cue[1])}</p>
        <p class="wo-tip" data-wo-tip><b>${esc(w.tip[0])}</b> ${esc(w.tip[1])}</p>
      </div>
    </div>
  </div>
  <script type="application/json" data-words-json>${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
</section>`;
}

function grownUpBand(ctx, p) {
  const W = ctx.words;
  if (!W || !p.cfg.wordExplorer) return '';
  const pick = [0, 2, 6, 11, 16, 21].map(i => W[i]).filter(Boolean);
  return `<section class="gu-band on-ink" aria-labelledby="gu-h">
  <div class="wrap">
    <div class="gu-head"><p class="eyebrow">Grown-up corner</p><h2 class="h2" id="gu-h">A tip on every page, word for word.</h2></div>
    <ol class="gu-tips">${pick.map(w => `<li><p class="gu-w word">${esc(w.w)}</p><p class="gu-t"><b>${esc(w.tip[0])}</b> ${esc(w.tip[1])}</p></li>`).join('')}</ol>
  </div>
</section>`;
}

function siteFaq(ctx, p) {
  const out = [];
  const pdf = p.priced.some(f => f.id === 'pdf');
  const printed = p.priced.some(f => f.id !== 'pdf' && f.id !== 'program');
  if (pdf) out.push({ q: 'How does the download work?', aHtml: '<p>Right after checkout you get a download link on screen and by email. The files are plain PDFs, so they open on a phone, tablet or computer. Print at “Actual size” or “100%”.</p>' });
  if (printed) out.push({ q: 'How does a printed book reach me?', aHtml: '<p>Each copy is printed when you order it and shipped by the printer, with tracking by email. The time to print and deliver is shown at checkout before you pay.</p>' });
  if (p.slug === 'course-screen-reset') out.push({ q: 'How does the program arrive?', aHtml: '<p>Day 1 and the workbook arrive by email right after checkout. After that, one lesson comes each morning. Nothing is live, so you can read at your own pace.</p>' });
  out.push({ q: 'What can I do with it?', aHtml: '<p>Use it with your own household, as often as you like. Please share a link to this page rather than the files. <a href="/licenses/">License terms</a></p>' });
  out.push({ q: 'What if something is wrong?', aHtml: '<p>Our <a href="/shipping-returns/">shipping and returns page</a> sets out exactly what happens if a file is broken, a book arrives damaged, or something isn’t as described.</p>' });
  return out;
}

module.exports = function product(ctx, p) {
  const trail = [{ name: 'Home', url: '/' }, { name: 'Shop', url: '/shop/' }];
  const t = ctx.cfg.types.find(x => p.types[0] === x.key);
  if (t && t.key !== 'course') trail.push({ name: t.label, url: t.path });
  trail.push({ name: p.name, url: p.url });
  const f0 = p.priced[0];
  const fmtsHtml = p.formats.length > 1 ? formats(ctx, p) : `<p class="one-format"><b>${esc(f0.label)}</b><span>${esc(typo(f0.detail || ''))}</span></p>`;
  const also = p.also.length ? `<div class="also"><p class="also-h">Also sold at</p><ul>${p.also.map(a => `<li><a href="${esc(a.url)}" rel="noopener" target="_blank">${esc(storeName(ctx, a.key) || a.key)}<span class="visually-hidden"> (opens in a new tab)</span></a></li>`).join('')}</ul></div>` : '';
  const assure = [
    p.priced.some(f => f.id === 'pdf') ? 'Plain PDFs in US Letter and A4, color and low-ink' : null,
    p.types.includes('books') ? 'Read together with a grown-up; paper pages, keep away from mouths' : null,
    'Every play follows our published safety rules',
    'Parent education, not medical advice'
  ].filter(Boolean).slice(0, 3);

  const buyBox = `<div class="pdp-buy">
    ${p.series ? `<p class="eyebrow">${esc(p.series)}</p>` : `<p class="eyebrow">${esc(t ? t.label : 'Shop')}</p>`}
    <h1 class="h1 pdp-h1">${esc(p.name)}</h1>
    <p class="pdp-sub">${esc(typo(p.line))}</p>
    <div class="pdp-price"><span class="price num" data-price-out>${money(f0.price)}</span>${p.priced.length > 1 ? `<span class="meta"> · ${p.priced.length} formats</span>` : ''}</div>
    <div class="pdp-age">${miniRuler(ctx, p.bands, p.ageText)}</div>
    ${fmtsHtml}
    <div class="buy-row" data-buy-row>${buy(ctx, f0, { note: p.slug === 'course-screen-reset' ? 'The program opens soon. Nothing can be bought or charged yet.' : undefined })}</div>
    <p class="ship-line">${p.priced.some(f => f.id !== 'pdf' && f.id !== 'program') ? I.truck : I.down}<span data-ship>${esc(f0.ship || '')}</span></p>
    ${also}
    <ul class="assure">${assure.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
  </div>`;

  const long = p.long.map((para, i) => `<p${i === 0 && /^[A-Za-z]/.test(para) ? ' class="dropcap"' : ''}>${esc(typo(para))}</p>`).join('');
  const inside = `<section class="section about-p" aria-labelledby="about-h">
  <div class="wrap about-grid">
    <div class="about-copy">
      <p class="eyebrow">About this ${p.types.includes('books') ? 'book' : p.slug === 'course-screen-reset' ? 'program' : 'printable'}</p>
      <h2 class="h2" id="about-h">${esc(typo(p.short.split(/(?<=[.!?])\s/)[0]))}</h2>
      <div class="prose">${long}</div>
    </div>
    <div class="about-list">
      <h3 class="h3">What you get</h3>
      <ul class="ticks">${p.bullets.map(b => `<li>${esc(typo(b))}</li>`).join('')}</ul>
    </div>
  </div>
</section>`;

  const L = p.listing;
  const rows = [];
  for (const f of p.formats) rows.push([f.label, typo(f.detail || '') + (f.planned ? ` (${f.planned})` : '')]);
  rows.push(['Ages', `${p.ageText}${p.types.includes('books') ? ', read together with a grown-up' : ''}`]);
  rows.push(['Language', 'English']);
  rows.push(['Made by', 'Play Before Pixels, a trade name of AlphaPlay LLC']);
  if (p.made) rows.push(['How it was made', p.made.charAt(0).toUpperCase() + p.made.slice(1)]);
  const details = `<section class="section section--wash details" aria-labelledby="det-h">
  <div class="wrap details-grid">
    <div>
      <p class="eyebrow">Details</p>
      <h2 class="h2" id="det-h">The small print, in plain words.</h2>
      <dl class="colophon-table">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
        ${p.isbn ? '<div><dt>ISBN</dt><dd>Given when the printed book is released</dd></div>' : ''}
      </dl>
    </div>
    <div>
      <h3 class="h3 faq-h">Questions</h3>
      ${faq([...p.faq.map(q => ({ q: typo(q.q), a: typo(q.a) })), ...siteFaq(ctx, p)])}
    </div>
  </div>
</section>`;

  const next = p.next.length ? `<section class="section next" aria-labelledby="next-h">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow">Next for your child’s age</p><h2 class="h2" id="next-h">Goes well with this.</h2></div><a class="link" href="/shop/">See everything ${I.arr}</a></div>
    <ul class="p-grid p-grid--4">${p.next.map(n => card(ctx, n, { h: 3 })).join('\n')}</ul>
  </div>
</section>` : '';

  const body = `<div class="wrap">${crumbs(trail)}</div>
<section class="wrap pdp" aria-label="${esc(p.name)}">
  ${gallery(ctx, p)}
  ${buyBox}
</section>
${wordExplorer(ctx, p)}
${inside}
${grownUpBand(ctx, p)}
${details}
${next}`;

  const imgSrc = p.gallery[0] && p.gallery[0].src ? `products/${p.dir}/${p.gallery[0].src}` : require('../partials/bits').coverSrc(p);
  const og = p.mock === 'workbook-css' ? ctx.assets.ogDefault : ctx.img.og(imgSrc);
  const allFaq = [...p.faq.map(q => ({ q: typo(q.q), a: typo(q.a) })), ...siteFaq(ctx, p).map(q => ({ q: q.q, a: q.aHtml.replace(/<[^>]+>/g, '') }))];
  return ctx.page({
    key: 'product', path: p.url, nav: p.types.includes('books') ? 'books' : p.types.includes('printables') ? 'printables' : 'shop',
    title: p.seoTitle, description: p.seoDescription, ogType: 'product', ogImage: og, ogAlt: p.alt,
    jsonld: [seo.breadcrumbs(ctx, trail), seo.product(ctx, p, og), seo.faqPage(allFaq)]
  }, body);
};
