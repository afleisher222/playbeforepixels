// Small shared pieces of markup: icons, product objects, cards, rulers, forms, FAQ, breadcrumbs.
'use strict';
const { esc, money } = require('../lib/util');

const I = {
  chev: '<svg class="chev" viewBox="0 0 10 10" aria-hidden="true" focusable="false"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M15.5 15.5l5 5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 7h18M3 12h18M3 17h12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  x: '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  arr: '<span class="arr" aria-hidden="true">→</span>',
  truck: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2 6h12v10H2zM14 10h4l4 3v3h-8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6" cy="17.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="17.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  down: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3v12m-5-5l5 5 5-5M4 20h16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  reg: '<svg class="reg" viewBox="0 0 22 22" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="11" cy="11" r="2.4" fill="currentColor"/><path d="M11 0v22M0 11h22" stroke="currentColor" stroke-width="1"/></svg>'
};

const bandOf = (cfg, k) => cfg.bands.find(b => b.key === k);

// ---------- product "photography": real covers as paper objects ----------
function coverSrc(p) {
  const c = p.cover || { src: 'cover.png' };
  return c.pdf ? { pdf: `products/${p.dir}/${c.pdf}`, page: c.page || 1 } : `products/${p.dir}/${c.src}`;
}
function workbook(p, o = {}) {
  const days = Array.from({ length: 30 }, (_, i) => `<i${i < 6 ? ' class="done"' : ''}></i>`).join('');
  return `<div class="obj m-workbook"${o.label ? ` role="img" aria-label="${esc(o.label)}"` : ' aria-hidden="true"'}><small>Written program · by email</small><b>30 Days of Back-and-Forth</b><span class="wb-line">One short lesson and one easy play a day</span><span class="days">${days}</span></div>`;
}
function mock(ctx, p, o = {}) {
  if (p.mock === 'workbook-css') return workbook(p, o);
  const img = ctx.img.pic({ src: coverSrc(p), widths: o.widths || [360, 720], sizes: o.sizes || '(max-width: 760px) 40vw, 18vw', alt: o.alt || '', eager: o.eager });
  const kind = p.mock || 'sheet';
  if (kind === 'book') return `<div class="obj m-book"><div class="edge"></div><div class="face">${img}</div></div>`;
  if (kind === 'guide') return `<div class="obj m-book m-guide"><div class="edge"></div><div class="face">${img}</div></div>`;
  if (kind === 'workbook') return `<div class="obj m-book m-guide m-work"><div class="edge"></div><div class="face">${img}</div></div>`;
  return `<div class="obj m-sheet"><div class="under"></div><div class="face">${img}</div></div>`;
}
function stack(ctx, parts, o = {}) {
  const faces = parts.slice(0, 4).map((x, i) => x.p.mock === 'workbook-css' ? `<div class="face f${i + 1} face--wb">${workbook(x.p)}</div>` : `<div class="face f${i + 1}">${ctx.img.pic({ src: coverSrc(x.p), widths: [300, 600], sizes: '(max-width: 760px) 30vw, 12vw', alt: '' })}</div>`).join('');
  return `<div class="obj m-stack n${Math.min(parts.length, 4)}"${o.label ? ` role="img" aria-label="${esc(o.label)}"` : ''}>${faces}</div>`;
}

const priceText = p => (p.priced.length > 1 ? '<small>from </small>' : '') + `<span class="num">${money(p.minPrice)}</span>`;

function ageDots(ctx, bands, text) {
  const dots = bands.map(k => `<i class="dot-${bandOf(ctx.cfg, k).color}"></i>`).join('');
  return `<span class="ages">${dots ? `<span class="age-dots" aria-hidden="true">${dots}</span>` : ''}<span>Ages ${esc(text)}</span></span>`;
}

// ---------- product card ----------
function card(ctx, p, o = {}) {
  const h = 'h' + (o.h || 3);
  const isBundle = !!p.parts;
  const surface = isBundle ? stack(ctx, p.parts) : mock(ctx, p, { sizes: o.sizes });
  const price = isBundle ? `<span class="num">${money(p.price)}</span>` : priceText(p);
  const types = isBundle ? 'bundles' : p.types.join(' ');
  return `<li class="p-card" data-types="${types}" data-ages="${p.bands.join(' ')}" data-price="${isBundle ? p.price : p.minPrice}" data-lo="${p.range ? p.range[0] : (p.ageText ? parseInt(p.ageText, 10) : 0)}" data-order="${o.order || 0}">
  <div class="surface g-${p.ground}">${surface}</div>
  <${h} class="p-title"><a href="${p.url}">${esc(p.name)}</a></${h}>
  <p class="line">${esc(p.line)}</p>
  <div class="foot"><span class="price">${price}</span>${ageDots(ctx, p.bands, p.ageText)}</div>
  ${p.available ? '' : '<p class="soon-tag">Available soon</p>'}
</li>`;
}

// ---------- rulers ----------
function miniRuler(ctx, bands, ageText) {
  const B = ctx.cfg.bands;
  return `<div class="mini-ruler"><p class="label"><span>Age band</span><b>${esc(ageText)} years</b></p>
  <div class="bar" aria-hidden="true">${B.map(b => `<span class="${bands.includes(b.key) ? 'on' : ''}" style="--c:var(--${b.color})"></span>`).join('')}</div>
  <div class="labels" aria-hidden="true">${B.map(b => `<span class="${bands.includes(b.key) ? 'on' : ''}">${b.label}</span>`).join('')}</div></div>`;
}

// ---------- forms ----------
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function signup(ctx, o = {}) {
  const id = o.id || 'su';
  const action = ctx.env.emailFormAction;
  const hosted = ctx.links.newsletter_form;
  const years = []; for (let y = 2026; y >= 2014; y--) years.push(y);
  const live = !!action;
  const tone = o.tone || 'ink';
  const intro = o.intro ? `<p class="su-intro">${o.intro}</p>` : '';
  if (!live && hosted) {
    return `<div class="signup signup--${tone}">${intro}<a class="btn ${tone === 'ink' ? 'btn--light' : ''}" href="${esc(hosted)}">Sign up on our newsletter page ${I.arr}</a>
    <p class="su-note">We ask for an email and, if you like, your child’s birth month. Never a name.</p></div>`;
  }
  const dis = live ? '' : ' disabled';
  return `<form class="signup signup--${tone}${live ? '' : ' is-soon'}" ${live ? `action="${esc(action)}" method="post"` : 'action="#" data-soon'} aria-describedby="${id}-state">
  ${intro}
  <fieldset${dis}>
    <legend class="visually-hidden">${esc(o.legend || 'Email sign-up')}</legend>
    <div class="su-row">
      <div class="field"><label for="${id}-email">Email</label><input id="${id}-email" type="email" name="email" autocomplete="email" inputmode="email" required></div>
      <button class="btn ${tone === 'ink' ? 'btn--light' : ''}" type="submit">${live ? esc(o.button || 'Sign me up') : 'Sign-up opens soon'}</button>
    </div>
    <div class="su-row su-row--2">
      <div class="field"><label for="${id}-m">Child’s birth month <span class="opt">(optional)</span></label><select id="${id}-m" name="birth_month" autocomplete="off"><option value="">Month</option>${MONTHS.map(m => `<option>${m}</option>`).join('')}</select></div>
      <div class="field"><label for="${id}-y">Birth year <span class="opt">(optional)</span></label><select id="${id}-y" name="birth_year" autocomplete="off"><option value="">Year</option>${years.map(y => `<option>${y}</option>`).join('')}</select></div>
    </div>
    ${o.source ? `<input type="hidden" name="source" value="${esc(o.source)}">` : ''}
  </fieldset>
  <p class="su-state" id="${id}-state" role="status">${live
    ? 'We ask for an email and, if you like, your child’s birth month and year. Never a name. Unsubscribe in one click. <a href="/privacy/">Privacy</a>'
    : '<b>Sign-up opens soon.</b> The form is switched off until our email service is connected, so nothing typed here is sent or saved. We will only ever ask for an email and, if you like, your child’s birth month and year. Never a name.'}</p>
</form>`;
}

// ---------- FAQ ----------
function faq(items, o = {}) {
  return `<div class="faq"${o.id ? ` id="${o.id}"` : ''}>${items.map((q, i) => `<details${q.id ? ` id="${q.id}"` : ''}${o.open === i ? ' open' : ''}><summary>${q.qHtml || esc(q.q)}</summary><div class="a">${q.aHtml || `<p>${esc(q.a)}</p>`}</div></details>`).join('')}</div>`;
}

// ---------- breadcrumbs ----------
function crumbs(trail) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${trail.map((t, i) => i === trail.length - 1
    ? `<li><span aria-current="page">${esc(t.name)}</span></li>`
    : `<li><a href="${t.url}">${esc(t.name)}</a></li>`).join('')}</ol></nav>`;
}

// Buy area: one filled button when a link exists, otherwise an honest "Available soon" block.
function buy(ctx, fmt, o = {}) {
  if (fmt && fmt.buyUrl) {
    const where = storeName(ctx, fmt.buyKey);
    return `<a class="btn btn--grow" href="${esc(fmt.buyUrl)}" rel="noopener" data-buy>Buy${where ? ' on ' + esc(where) : ''} · <span class="num" data-buy-price>${money(fmt.price)}</span> ${I.arr}</a>`;
  }
  return `<div class="soon" data-soon-block><p class="soon-pill">Available soon</p><p class="soon-note">${o.note || 'Our shop opens soon. Nothing can be bought or charged yet.'}</p></div>`;
}
function storeName(ctx, key) {
  if (!key) return '';
  for (const [prefix, label] of Object.entries(ctx.cfg.storeLabels)) if (key === prefix || key.startsWith(prefix)) return label;
  return '';
}

function tbd(label) { return `<span class="tbd">${esc(label)}</span>`; }

module.exports = { I, workbook, mock, stack, card, miniRuler, signup, faq, crumbs, buy, storeName, ageDots, priceText, coverSrc, bandOf, tbd, MONTHS };
