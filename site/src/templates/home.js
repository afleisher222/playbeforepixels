// Home: six sections (DESIGN-SYSTEM §8, with the grafts): book-spread hero, saturated age ruler,
// full-width picture-book band, printables on the cutting mat, the free printable and the course,
// and the colophon.
'use strict';
const { esc, money } = require('../lib/util');
const { I, mock, bandOf } = require('../partials/bits');
const seo = require('../lib/seo');

module.exports = function home(ctx) {
  const C = ctx.cfg;
  // First hero candidate whose product is shown wins (a held product drops out, never shown for sale).
  const H = C.home.heroes.find(h => ctx.bySlug[h.slug]);
  if (!H) throw new Error('site/config.json home.heroes: no candidate product is shown');
  const hp = ctx.bySlug[H.slug];
  const [pa, pb] = H.pages;
  const W = ctx.words || [];
  const maxAge = Math.max(...ctx.products.map(p => p.range ? p.range[1] : 0));
  const heroFmt = (H.format && hp.priced.find(f => f.id === H.format)) || hp.priced[0];

  const pageImg = (src, alt, eager) => ctx.img.pic({ src: `products/${hp.dir}/${src}`, widths: [600, 1000, 1400], sizes: '(max-width: 1060px) 50vw, 32vw', alt, eager, priority: eager });
  const pn = s => +(/p(\d+)/.exec(s) || [0, 0])[1];
  let tips, alts;
  if (H.tips) {
    tips = H.tips.map(([k, b, t]) => `<p class="tip"><span class="tip-k">${esc(k)}</span><b>${esc(b)}</b> ${esc(t)}</p>`).join('');
    alts = H.alts.map(a => `${a} From ${hp.name}.`);
  } else {
    const w1 = W[H.words[0]] || {}, w2 = W[H.words[1]] || {};
    const tip = (w, n) => w.tip ? `<p class="tip"><span class="tip-k">Page ${n} · “${esc(w.w)}”</span><b>${esc(w.tip[0])}</b> ${esc(w.tip[1])}</p>` : '';
    tips = tip(w1, pn(pa)) + tip(w2, pn(pb));
    alts = [`The page for “${w1.w || ''}” in ${hp.name}`, `The page for “${w2.w || ''}” in ${hp.name}`];
  }
  const eyebrow = H.eyebrow ? esc(H.eyebrow) : `Talk-along books &amp; paper play · ages 0–${maxAge}`;
  const h1 = H.h1 || 'One word<br>for them.<br><span class="hl">One tip</span><br>for you.';
  const lede = H.lede ? esc(H.lede) : 'Books and printables where every page gives your child something to say, and gives you one small way to keep the talk going.';

  const hero = `<section class="hero" aria-labelledby="hero-h">
  <div class="wrap hero-grid">
    <div class="hero-title">
      <p class="eyebrow">${eyebrow}</p>
      <h1 class="display" id="hero-h">${h1}</h1>
      <p class="lede">${lede}</p>
      <div class="hero-cta"><a class="btn" href="/shop/">Shop by age ${I.arr}</a><a class="link" href="${hp.url}">See inside ${esc(hp.name)}</a></div>
    </div>
    <figure class="hero-spread">
      <div class="spread-wrap"><div class="spread crop">${pageImg(pa, alts[0], true)}${pageImg(pb, alts[1], true)}</div></div>
      <figcaption>
        <div class="tips">${tips}</div>
        <p class="spec-strip"><b>${esc(hp.name)}</b><span>${esc(heroFmt.label)}</span><span>${esc(heroFmt.detail.split(' · ')[0])}</span><span>Ages ${esc(hp.ageText)}</span><span class="num">${money(heroFmt.price)}</span><span class="${hp.available ? 'ok' : 'soon-inline'}">${hp.available ? 'In stock' : 'Available soon'}</span></p>
      </figcaption>
    </figure>
  </div>
</section>`;

  // ---- 2. Shop by age: the saturated ruler ----
  const minor = { '0-1': 12, '1-3': 4, '3-5': 4, '5-8': 3, '8-12': 4 };
  const ruler = `<section class="section section--wash ages-sec" aria-labelledby="ages-h">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow">Shop by age</p><h2 class="h2" id="ages-h">Start where your child is.</h2></div>
      <p class="lede measure">Everything we make sits on one scale, from first words in the baby months to big questions at the dinner table.</p>
    </div>
    <ol class="ruler">
      ${C.bands.map((b, i) => {
        const n = ctx.countBand(b.key);
        const p = [].concat(C.home.rulerShelf[b.key] || []).map(s => ctx.bySlug[s]).find(Boolean) || ctx.products.find(q => q.bands.includes(b.key) && q.types.includes('books')) || ctx.products.find(q => q.bands.includes(b.key));
        const obj = p && n ? `<span class="shelf-obj">${mock(ctx, p, { sizes: '160px', widths: [240, 480] })}</span>` : '<span class="shelf-obj shelf-obj--empty"></span>';
        const inner = `${obj}<span class="scale" style="--ticks:${minor[b.key] || 4}"><span class="num0">${b.lo}</span>${i === C.bands.length - 1 ? `<span class="end">${b.hi}</span>` : ''}</span>
          <span class="band-l"><b>${b.label}<small> ${b.unit}</small></b><span>${b.name}<small>${n ? `${n} to choose from` : 'coming later'}</small></span></span>`;
        return `<li class="r-${b.color}" style="--span:${b.hi - b.lo}">${n ? `<a class="seg" href="/shop/ages/${b.key}/">${inner}</a>` : `<span class="seg seg--off">${inner}</span>`}</li>`;
      }).join('\n      ')}
    </ol>
    ${ctx.gates.ages5to12.open ? '' : '<p class="ruler-note">Books and printables for ages 5 to 12 are on the way. Until then, everything here is for babies, toddlers and preschoolers.</p>'}
  </div>
</section>`;

  // ---- 3. Full-width picture-book band ----
  const BC = C.home.bandCandidates.find(b => ctx.bySlug[b.slug]);
  if (!BC) throw new Error('site/config.json home.bandCandidates: no candidate product is shown');
  const bp = ctx.bySlug[BC.slug];
  const [ba, bb] = BC.pages;
  const bandFmt = bp.priced[0];
  const bImg = (src, alt) => ctx.img.pic({ src: `products/${bp.dir}/${src}`, widths: [720, 1100, 1600], sizes: '50vw', alt });
  const band = `<section class="book-band on-ink" aria-labelledby="band-h">
  <figure class="band-spread">
    <div class="band-pages">${bImg(ba, '')}${bImg(bb, '')}</div>
    <figcaption class="wrap band-cap">
      <div class="museum">
        <p class="eyebrow">${esc(BC.eyebrow)} · ages ${esc(bp.ageText)}</p>
        <h2 class="h2" id="band-h">${esc(bp.name)}</h2>
        <p class="m-quote">${esc(BC.quote)}</p>
      </div>
      <dl class="museum-label">
        <div><dt>${esc(BC.label[0])}</dt><dd>${esc(BC.label[1])}</dd></div>
        <div><dt>Edition</dt><dd>${esc(bandFmt.label)}, ${esc(bandFmt.detail.split(' · ')[0])}</dd></div>
        <div><dt>Price</dt><dd class="num">${money(bandFmt.price)}${bp.available ? '' : ' · available soon'}</dd></div>
      </dl>
      <p class="band-link"><a class="link" href="${bp.url}">Look inside the book ${I.arr}</a></p>
    </figcaption>
  </figure>
</section>`;

  // ---- 4. Printables on the cutting mat ----
  const mat = C.home.mat.map(s => ctx.bySlug[s]).filter(Boolean);
  const pdfPrice = p => (p.formats.find(f => f.id === 'pdf') || p.priced[0]).price;
  const sheets = mat.slice(0, 3);
  const matSec = `<section class="section mat on-ink" aria-labelledby="print-h">
  <div class="mat-ruler" aria-hidden="true">${Array.from({ length: 24 }, (_, i) => `<span>${i + 1}</span>`).join('')}</div>
  <div class="wrap mat-grid">
    <div class="mat-copy">
      <p class="eyebrow">Printables</p>
      <h2 class="h2" id="print-h">Print tonight.<br>Play tomorrow.</h2>
      <p class="lede">Plain PDFs in US Letter and A4, in color and low-ink, with a one-page grown-up guide. Every card and page carries a talk line and a safety note.</p>
      <ul class="mat-list">
        ${mat.map(p => `<li><a href="${p.url}"><span>${esc(p.name)}</span><small>Ages ${esc(p.ageText)}</small><b class="num">${money(pdfPrice(p))}</b></a></li>`).join('\n        ')}
        ${ctx.bundles.slice(0, 2).map(b => `<li><a href="${b.url}"><span>${esc(b.name)}</span><small>${b.parts.length} PDFs</small><b class="num">${money(b.price)}</b></a></li>`).join('\n        ')}
      </ul>
      <a class="link" href="/shop/printables/">All printables ${I.arr}</a>
    </div>
    <div class="mat-table" aria-hidden="true">
      ${sheets.map((p, i) => `<div class="mt-sheet mt-${i + 1}">${ctx.img.pic({ src: `products/${p.dir}/${(p.cover && p.cover.src) || 'cover.png'}`, widths: [400, 800], sizes: '(max-width: 1060px) 40vw, 22vw', alt: '' })}<span class="tag tag-${i + 1}"><b class="num">${money(pdfPrice(p))}</b><span>PDF · ages ${esc(p.ageText)}</span></span></div>`).join('\n      ')}
      <p class="hand mt-note">cut on the dashed line, laminate if you like</p>
    </div>
  </div>
</section>`;

  // ---- 5. Free printable, then the course ----
  const free = C.free;
  const course = ctx.bySlug['course-screen-reset'];
  const freeSec = `<section class="section start-free" aria-labelledby="free-h">
  <div class="wrap free-grid">
    <div class="free-visual">
      <div class="surface g-sky-t free-surface"><div class="obj m-sheet big-sheet"><div class="under"></div><div class="face">${ctx.img.pic({ src: `products/${free.preview}`, widths: [480, 960], sizes: '(max-width: 1060px) 70vw, 34vw', alt: 'Page one of the free printable: our screen spot and a seven-day tracker.' })}</div></div>
      <p class="hand free-note">free, and yours to keep</p></div>
    </div>
    <div class="free-copy">
      <p class="eyebrow">Start free</p>
      <h2 class="h2" id="free-h">Seven days of play first.</h2>
      <p class="lede">Seven easy plays with things you already have, a simple screen-spot plan and a tracker for the fridge. Nothing to buy, nothing to ban.</p>
      <a class="btn" href="/free/">Get the free printable ${I.arr}</a>
      ${course ? `<div class="course-note">
        <p class="kicker">Want the whole month?</p>
        <p><a class="course-link" href="${course.url}"><b>${esc(course.name)}</b></a> is a written program: one short lesson and one easy play each morning for 30 days, by email, with a printable workbook. No videos, no calls. <span class="num">${money(course.minPrice)}</span>${course.available ? '' : ', opening soon'}.</p>
      </div>` : ''}
    </div>
  </div>
</section>`;

  // ---- 6. Colophon ----
  const colophon = `<section class="section section--wash colophon-sec" aria-labelledby="col-h">
  <div class="wrap col-grid">
    <div class="col-lead">
      <p class="eyebrow" id="col-h">Colophon</p>
      <p class="col-big">Founded by a parent and educator.</p>
      <p>We make things you can hold: books, cards and printable pages. No apps, no accounts, no coaching and no live sessions. Just paper, talk and play.</p>
      <p class="col-links"><a class="link" href="/about/">About us ${I.arr}</a><a class="link" href="/research/">Research notes ${I.arr}</a></p>
      <p class="col-figure"><b class="num">194</b>fewer conversational turns per day, linked with screen time at 36 months (Brushe ME et al., <i>JAMA Pediatrics</i> 2024). An association, not proof that screens cause it.</p>
    </div>
    <dl class="col-table">
      <div><dt>Made by</dt><dd>Play Before Pixels, a trade name of AlphaPlay LLC</dd></div>
      <div><dt>Books</dt><dd>Printed to order, one copy at a time, and shipped by the printer</dd></div>
      <div><dt>Printables</dt><dd>Plain PDFs, US Letter and A4, color and low-ink</dd></div>
      <div><dt>Ages</dt><dd>Sorted on one scale, from the baby months up</dd></div>
      <div><dt>Type</dt><dd>Bricolage Grotesque, Nunito Sans, Fredoka and Caveat</dd></div>
      <div><dt>Advice</dt><dd>Parent education, not medical advice. Questions about development go to your child’s doctor.</dd></div>
    </dl>
  </div>
</section>`;

  const body = [hero, ruler, band, matSec, freeSec, colophon].join('\n');
  return ctx.page({
    key: 'home', path: '/', nav: '',
    title: 'Play Before Pixels: Talk, Play and Read Before Screens',
    description: 'Talk-along books, printables and a written course for families with young children, sorted by age. Fewer screens, more back-and-forth.',
    ogImage: ctx.assets.ogDefault, ogAlt: 'Play Before Pixels',
    jsonld: [seo.organization(ctx), seo.website(ctx)]
  }, body);
};
