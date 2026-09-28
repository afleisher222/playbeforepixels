// Interiors for "100 Screen-Free Plays for Ages 0–5".  node book.js
// FOUNDER: the text of every page lives here and in plays.js. Rewrite it in your own words (see listing.json "human_todo");
// your edits, choices and ordering are the human-authored part of the book. Every draft stays in git.
const fs = require('fs');
const path = require('path');
const CH = require('./chars.js');
const { ART, UI } = require('./icons.js');
const { P, BANDS, MOVES, WHERE } = require('./plays.js');
const X = require('./parts.js');
const { C } = CH;
const { OUT, BONUS, COPY, FONTS, W, BC, esc, pad2, qrSvg, SCENES, ico, playCard, ownCard, fld, VERSION, fromLabel } = X;
const { TIRED } = require('./plays.js');

// bw: grayscale paperback interior · low: low-ink edition (white grounds, line art) · etsy: marketplace edition with no URL or QR code
// (CUSTOMER-VOICE rules 1–4) · extras: the four bonus planner pages and type-in fields of the digital editions.
const PB = { pw: 8.25, ph: 10.25, bt: .125, bb: .125, bo: .125, bi: .125, m: { t: .5, b: .55, o: .5, i: .7 } };
const LT = { pw: 8.5, ph: 11, bt: 0, bb: 0, bo: 0, bi: 0, m: { t: .55, b: .6, o: .6, i: .6 } };
const A4 = { pw: 8.27, ph: 11.69, bt: 0, bb: 0, bo: 0, bi: 0, m: { t: .6, b: .65, o: .55, i: .55 } };
const VARIANTS = {
  print: Object.assign({ file: 'source.html', bw: true, extras: false, label: 'Paperback interior, 8 x 10 in trim + 0.125 in bleed (brand spec)' }, PB),
  kdp: Object.assign({}, PB, { file: 'source-kdp.html', pw: 8.125, bi: 0, bw: true, extras: false, label: 'Paperback interior, KDP 8 x 10 in with bleed = 8.125 x 10.25 in' }),
  letter: Object.assign({ file: 'source-color-letter.html', bw: false, extras: true, label: 'Digital edition, Color, US Letter' }, LT),
  a4: Object.assign({ file: 'source-color-a4.html', bw: false, extras: true, label: 'Digital edition, Color, A4' }, A4),
  'letter-low': Object.assign({ file: 'source-lowink-letter.html', bw: false, low: true, extras: true, label: 'Digital edition, Low-ink, US Letter' }, LT),
  'a4-low': Object.assign({ file: 'source-lowink-a4.html', bw: false, low: true, extras: true, label: 'Digital edition, Low-ink, A4' }, A4),
  'etsy-letter': Object.assign({ file: 'source-etsy-color-letter.html', bw: false, etsy: true, extras: true, label: 'Etsy edition, Color, US Letter' }, LT),
  'etsy-a4': Object.assign({ file: 'source-etsy-color-a4.html', bw: false, etsy: true, extras: true, label: 'Etsy edition, Color, A4' }, A4),
  'etsy-letter-low': Object.assign({ file: 'source-etsy-lowink-letter.html', bw: false, low: true, etsy: true, extras: true, label: 'Etsy edition, Low-ink, US Letter' }, LT),
  'etsy-a4-low': Object.assign({ file: 'source-etsy-lowink-a4.html', bw: false, low: true, etsy: true, extras: true, label: 'Etsy edition, Low-ink, A4' }, A4),
};
let V = VARIANTS.letter; // the variant being assembled

// ---------------------------------------------------------------- black-and-white conversion (KDP B/W interior)
function toGray(html) {
  return html.replace(/(?<![\w-])#([0-9a-fA-F]{6})(?![\w-])/g, (m, h) => {
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    let L = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    if (L < 70) L = 26; // ink -> near-black
    else if (L > 225 && L < 255) L = Math.max(L - 6, 228); // tints stay light but visible
    const x = L.toString(16).padStart(2, '0'); return '#' + x + x + x;
  });
}

// ---------------------------------------------------------------- CSS
function css(v) {
  return `
@page { size: ${v.pw}in ${v.ph}in; margin: 0 }
:root { --pw:${v.pw}in; --ph:${v.ph}in; --bt:${v.bt}in; --bb:${v.bb}in; --bo:${v.bo}in; --bi:${v.bi}in; --mt:${v.m.t}in; --mb:${v.m.b}in; --mo:${v.m.o}in; --mi:${v.m.i}in;
  --ink:${C.ink}; --wash:${C.wash}; --tomato:${C.tomato}; --sun:${C.sun}; --sky:${C.sky}; --grass:${C.grass}; --plum:${C.plum};
  --tTomato:${C.tTomato}; --tSun:${C.tSun}; --tSky:${C.tSky}; --tGrass:${C.tGrass}; --tPlum:${C.tPlum}; --line:#C9D1DE; --soft:#5A6478 }
* { box-sizing: border-box; margin: 0; padding: 0 }
html, body { background: #FFFFFF }
body { font-family: "Nunito Sans", "Helvetica Neue", Arial, sans-serif; color: var(--ink); font-size: 10.4pt; line-height: 1.4; -webkit-print-color-adjust: exact; print-color-adjust: exact; font-variant-numeric: lining-nums }
@media screen { body { background: #E6E9EF } .page { margin: 16px auto; box-shadow: 0 1px 6px rgba(0,0,0,.15) } }
.page { width: var(--pw); height: var(--ph); position: relative; overflow: hidden; page-break-after: always; break-after: page; background: #FFFFFF }
.bleedbg { position: absolute; inset: 0 }
.live { position: absolute; top: calc(var(--bt) + var(--mt)); bottom: calc(var(--bb) + var(--mb)); display: flex; flex-direction: column }
.recto .live { left: calc(var(--bi) + var(--mi)); right: calc(var(--bo) + var(--mo)) }
.verso .live { left: calc(var(--bo) + var(--mo)); right: calc(var(--bi) + var(--mi)) }
.folio { position: absolute; bottom: calc(var(--bb) + .24in); font-size: 8pt; color: var(--soft); display: flex; gap: .12in; align-items: center; letter-spacing: .02em }
.recto .folio { right: calc(var(--bo) + var(--mo)) }
.verso .folio { left: calc(var(--bo) + var(--mo)); flex-direction: row-reverse }
.folio b { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 10pt; color: var(--ink) }
.ico { display: inline-block; vertical-align: -0.14em; flex: none; color: var(--ink) }
.ico.big { width: 1.5em; height: 1.5em }
h1, h2, h3, .display { font-family: "Bricolage Grotesque", "Nunito Sans", sans-serif; font-weight: 800; letter-spacing: -0.01em; line-height: 1.05 }
h1 { font-size: 30pt; margin-bottom: .14in }
h2 { font-size: 15pt; margin-bottom: .05in }
.lede { font-size: 11.5pt; line-height: 1.45; max-width: 5.9in; margin-bottom: .2in }
.eyebrow { font-size: 8pt; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: var(--soft); margin-bottom: .06in }
.hand { font-family: "Caveat", cursive; font-weight: 700 }
.small { font-size: 8.4pt; line-height: 1.4; color: var(--soft) }

/* running head on play pages */
.rhead { display: flex; justify-content: space-between; align-items: center; padding-bottom: .1in; border-bottom: 1.5px solid var(--ink); margin-bottom: .04in; font-size: 8.4pt; font-weight: 700 }
.rhead .chip { display: inline-flex; align-items: center; gap: .08in }
.rhead .chip i { font-style: normal; font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 10pt; padding: .02in .12in; border-radius: 99px }
.plays { flex: 1; display: flex; flex-direction: column; justify-content: space-between }
.play { flex: 1; padding: .12in 0 .1in; display: flex; flex-direction: column; justify-content: space-evenly; gap: .07in }
.play + .play { border-top: 1.5px dashed var(--line) }
.phead { display: flex; gap: .2in; align-items: center }
.disc { position: relative; flex: none }
.disc svg { display: block }
.badge { position: absolute; left: -.04in; top: -.02in; font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 12.5pt; min-width: .44in; height: .44in; border-radius: 99px; display: flex; align-items: center; justify-content: center; border: 2.5px solid #FFFFFF }
.ptitle { flex: 1; min-width: 0 }
.kicker { font-size: 8pt; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--soft); display: flex; align-items: center; gap: .1in }
.agepill { font-size: 8.4pt; letter-spacing: .02em; text-transform: none; color: var(--ink); padding: .015in .1in; border-radius: 99px; font-weight: 800 }
.play h3 { font-size: 20pt; margin: .03in 0 .07in }
.meta { display: flex; flex-wrap: wrap; gap: .06in .2in; font-size: 8.9pt; font-weight: 700; margin-bottom: .06in }
.meta span { display: inline-flex; align-items: center; gap: .05in }
.meta .ico { width: 1.25em; height: 1.25em }
.drops { display: inline-flex; gap: 0 } .drops .ico { width: 1.15em; height: 1.15em; color: var(--sky) }
.need { display: flex; gap: .07in; font-size: 9.8pt; align-items: baseline }
.need .ico { width: 1.2em; height: 1.2em; align-self: center }
.how { font-size: 10.8pt; line-height: 1.42 }
.grow { font-size: 10pt; line-height: 1.4; padding-left: .12in; border-left: 3px solid var(--line) }
.eh { display: grid; grid-template-columns: 1fr 1fr; gap: .22in; font-size: 9.4pt; line-height: 1.36 }
.eh p { padding-left: .1in; border-left: 3px solid var(--line) }
.best { letter-spacing: .02em; text-transform: none; font-weight: 700; color: var(--soft) }
.nbuy { margin-left: auto; flex: none; display: inline-flex; align-items: center; gap: .04in; font-size: 7.8pt; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; padding: .02in .09in; border: 1.3px solid var(--ink); border-radius: 99px; align-self: center }
.nbuy .ico { width: 1.1em !important; height: 1.1em !important }
.tired { display: grid; grid-template-columns: 1fr 1fr; gap: .16in .22in; flex: 1 }
.tcard { border: 1.5px solid var(--line); border-radius: .14in; padding: .1in .14in; display: flex; flex-direction: column; justify-content: space-between; gap: .04in; font-size: 9.2pt; line-height: 1.34 }
.tcard h3 { font-size: 14pt; margin: 0 }
.tcard .tline { font-size: 11pt }
.talk { display: flex; gap: .12in; align-items: center; padding: .1in .16in; border-radius: .14in }
.talk .ico { color: var(--ink) }
.tlab { font-size: 7.8pt; font-weight: 800; letter-spacing: .12em; text-transform: uppercase }
.tlab span { letter-spacing: .04em; text-transform: none; font-weight: 700; color: var(--soft) }
.tline { font-family: "Fredoka", "Nunito Sans", sans-serif; font-weight: 600; font-size: 14pt; line-height: 1.25 }
.safe { display: flex; gap: .08in; font-size: 9.2pt; line-height: 1.38; align-items: flex-start }
.safe .ico { width: 1.25em; height: 1.25em; color: var(--grass); margin-top: .01in }
/* editable blanks */
.field { display: block; border-bottom: 1.2px solid var(--line); height: .3in; flex: 1 }
.field.big { height: .42in }
.field.inl { display: inline-block; width: .9in; height: .2in; vertical-align: bottom; border-bottom-color: var(--ink); opacity: .6 }
.field.multi { height: .75in; background: repeating-linear-gradient(to bottom, transparent 0, transparent calc(.3in - 1.2px), var(--line) calc(.3in - 1.2px), var(--line) .3in) }
.own .need, .own .safe { align-items: flex-end }
.own .meta { gap: .04in .07in; font-size: 8.4pt } .own .meta .tick { width: 1em; height: 1em }
.own .talk .field { border-bottom-color: rgba(29,41,64,.35) }
.lineh { display: flex; margin: .02in 0 .08in }

/* generic content pages */
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: .2in .28in }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: .18in }
.card { border-radius: .16in; padding: .18in .2in }
.card p { font-size: 9.8pt }
.list { list-style: none }
.list li { display: flex; gap: .12in; padding: .085in 0; border-bottom: 1px solid var(--line); font-size: 10pt; align-items: flex-start }
.list li:last-child { border-bottom: 0 }
.num { flex: none; width: .3in; height: .3in; border-radius: 99px; display: inline-flex; align-items: center; justify-content: center; font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 10pt }
.chipn { display: inline-flex; align-items: center; justify-content: center; min-width: .3in; height: .24in; padding: 0 .05in; border-radius: 99px; font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 8.6pt; margin: 0 .03in .05in 0 }
.boxnote { border: 1.5px solid var(--ink); border-radius: .14in; padding: .14in .18in; font-size: 9.2pt }
.spacer { flex: 1 }
${v.bw ? `
/* black-and-white interior: labels in ink so small type keeps 4.5:1 contrast */
.eh b, .play .grow b { color: var(--ink) !important }
` : ''}
${v.low ? `
/* ---- low-ink edition: white grounds, no full-bleed tints, line art to color (CUSTOMER-VOICE rule 1) ---- */
.bleedbg { display: none }
.live [style*="background"]:not(svg):not(.qrbox) { background: #FFFFFF !important; box-shadow: inset 0 0 0 1.3px #9AA5B8 }
.live [style*="color:#FFFFFF"], .live [style*="color: #FFFFFF"] { color: var(--ink) !important }
.talk, .card, .boxnote, .badge { background: #FFFFFF !important }
.badge { color: var(--ink) !important; box-shadow: 0 0 0 1.5px var(--ink) }
.artdefs symbol *, svg.scene *, svg.scene { fill: #FFFFFF !important; stroke: ${C.ink} !important; stroke-width: 1.2px !important; stroke-linejoin: round; vector-effect: non-scaling-stroke }
.artdefs symbol [fill="${C.ink}"], svg.scene [fill="${C.ink}"] { fill: ${C.ink} !important }
.artdefs symbol .ck, svg.scene .ck { display: none }
svg.scene text { fill: ${C.ink} !important; stroke: none !important }
.drops .ico { color: var(--ink) } .safe .ico { color: var(--ink) }
` : ''}
`;
}

// ---------------------------------------------------------------- page scaffolding
const pages = []; // {kind, html, title?, bg?, noFolio?, band?}
function pg(o) { pages.push(o); return o; }
const chipN = n => { const p = P[n - 1]; const b = BC[p.band]; return `<span class="chipn" style="background:${b.t}">${n}</span>`; };
const playRef = n => `<b>${esc(P[n - 1].t)}</b> ${chipN(n)}`;

// prep budget for page 1 and the listing (CUSTOMER-VOICE rule 8)
const PREPN = [0, 1, 2].map(k => P.filter(p => p.prep === k).length);
const PREPLINE = `Prep budget: no prep for ${PREPN[0]} plays, about 2 minutes for ${PREPN[1]} and about 10 minutes for ${PREPN[2]}. ${P.filter(p => !p.buy).length} plays need nothing to buy.`;

// ---- front matter
function titlePage() {
  return pg({ kind: 'title', noFolio: true, html: `
  <div class="bleedbg" style="background:${C.tTomato}"></div>
  <div class="live" style="align-items:center;text-align:center;justify-content:center">
    <div class="display" style="font-size:120pt;line-height:.85;color:${C.tomato}">100</div>
    <div class="display" style="font-size:34pt;margin-top:.08in">Screen-Free Plays</div>
    <div class="display" style="font-size:22pt;margin-top:.1in">for Ages 0–5</div>
    <p style="font-size:12pt;margin-top:.26in;max-width:4.8in">Easy, low-prep play and talk ideas for babies, toddlers and preschoolers, sorted by age</p>
    <div style="display:flex;gap:.12in;margin-top:.3in">${BANDS.map(b => `<span class="display" style="background:${BC[b.key].c};color:${BC[b.key].fg};font-size:13pt;padding:.07in .18in;border-radius:99px">${b.label}</span>`).join('')}</div>
    <p style="font-size:10.4pt;margin-top:.26in;font-weight:700">${PREPLINE}</p>
    <div class="spacer" style="flex:0 0 .7in"></div>
    <img src="../../brand/logo/lockup-horizontal.svg" alt="Play Before Pixels" style="height:.62in">
    ${V.etsy ? '' : '<p style="font-size:9.4pt;margin-top:.1in;font-weight:700">playbeforepixels.com</p>'}
  </div>` });
}
function copyrightPage() {
  return pg({ kind: 'copyright', noFolio: true, html: `
  <div class="live" style="justify-content:flex-end;font-size:8.6pt;line-height:1.5">
    <p style="font-family:'Bricolage Grotesque';font-weight:800;font-size:12pt">100 Screen-Free Plays for Ages 0–5</p>
    <p>Easy, low-prep play and talk ideas for babies, toddlers and preschoolers, sorted by age</p>
    <p style="margin-top:.12in">First edition, 2026 · ${VERSION}${V.bw ? ' · Black-and-white interior' : V.low ? ' · Low-ink edition' : ' · Full-color edition'}</p>
    <p style="margin-top:.12in;font-weight:800">${COPY}</p>
    <p>All rights reserved. No part of this book may be reproduced or shared without written permission, except short quotations in reviews. Buyers of the PDF edition may print pages for use in their own household.</p>
    <p style="margin-top:.12in">Published by AlphaPlay LLC, doing business as Play Before Pixels${V.etsy ? '. Questions? Send us a message through Etsy.' : ' · playbeforepixels.com · Contact: through the form at playbeforepixels.com'}</p>
    ${V.bw ? `<div style="display:flex;gap:.16in;align-items:center;margin-top:.14in;border:1.5px solid ${C.ink};border-radius:.12in;padding:.1in .14in"><div style="flex:none">${qrSvg(72)}</div><p><b>This paperback has a black-and-white interior.</b> Get the play pages in full color, free: scan the code or visit ${BONUS}. We only ask for an email and your child’s birth month and year.</p></div>` : ''}
    <div style="display:flex;gap:.24in;align-items:flex-end;margin-top:.16in">
      <div style="width:2in;height:1.2in;border:1.5px dashed ${C.ink};display:flex;align-items:center;justify-content:center;text-align:center;font-weight:800;font-size:8pt;letter-spacing:.08em">ISBN / barcode<br>(founder to add)</div>
      <div><p><b>ISBN (paperback):</b> ____________________</p><p><b>ISBN (PDF):</b> not required</p><p><b>Printed book only:</b> the founder adds the ISBN here before upload.</p></div>
    </div>
    <p style="margin-top:.16in"><b>Please read.</b> This book offers play ideas and general parent education. It is not medical, developmental or professional advice, and it does not diagnose, treat or prevent any condition. Every play is meant to be done with a grown-up right there. Ages are a guide: you know your child best, so skip or change any play that does not feel right. Always follow the safety notes and the "Safety first" page.</p>
    <p style="margin-top:.1in">No brands, apps, devices, products, schools or programs are named, reviewed or endorsed in this book. Any object shown is generic.</p>
    <p style="margin-top:.1in">Research sources are listed on the "Sources" page.</p>
    <p style="margin-top:.1in">Every play follows our published safety rules (the "Safety first" page). ${V.bw ? 'Printed on demand.' : 'Print what you need for use in your own home.'}</p>
  </div>` });
}
function contentsPage() {
  return pg({ kind: 'contents', html: (num) => {
    const row = (t, n, col) => `<li style="display:flex;align-items:baseline;gap:.1in;padding:.058in 0;border-bottom:1px solid var(--line)">${col ? `<span class="num" style="background:${col.c};color:${col.fg}">${col.label}</span>` : '<span style="width:.3in"></span>'}<span style="flex:1;font-size:11pt;font-weight:${col ? 800 : 600}">${t}</span><b style="font-family:'Bricolage Grotesque'">${n}</b></li>`;
    const front = ['A note before you start', 'How to use this book', 'Talk while you play: six easy moves', 'Safety first', 'Why play? Why talk?', 'Quick finder: a play for every moment', 'Set up for easy play', 'The pantry list'];
    const back = ['Tired-grown-up plays', 'A sample screen-free day', 'Swap it for your age and your energy', 'When screens are on anyway', 'The 100-play tracker', 'Our play week', 'Sources', BONUST()];
    return `<div class="live"><div class="eyebrow">Inside</div><h1>Contents</h1>
      <ul style="list-style:none">
        ${front.map(t => row(t, num(t))).join('')}
        ${BANDS.map(b => row(`Ages ${b.label} · ${b.long} <span style="font-weight:600;color:var(--soft)">· plays ${b.from}–${b.to}</span>`, num('band-' + b.key), Object.assign({ label: b.label }, BC[b.key]))).join('')}
        ${back.map(t => row(t, num(t))).join('')}
      </ul></div>`;
  } });
}
function notePage() {
  // FOUNDER: rewrite this note in your own words before publishing (human authorship).
  return pg({ kind: 'text', title: 'A note before you start', html: `
  <div class="live">
    <div class="eyebrow">Hello</div><h1>A note before you start</h1>
    <div data-founder="rewrite" style="font-size:12pt;line-height:1.6;max-width:5.6in">
      <p>This book is for ordinary days: rainy mornings, long afternoons and the ten minutes before dinner. You don’t need special toys, a craft cupboard or a perfect plan. Most of these plays use a cup, a box, a sock or nothing at all.</p>
      <p style="margin-top:.14in">You don’t need to do all 100, either. Pick one that fits your child’s age and your energy today. Try it, talk while you play, and see what your child does with it. Some plays will be a hit and some will flop. Both are fine.</p>
      <p style="margin-top:.14in">The best part is the back-and-forth. You say something, your child answers with a look, a sound or a word, and you answer back. That’s the whole idea.</p>
      <p style="margin-top:.14in">Have fun, and go easy on yourself.</p>
    </div>
    <div class="hand" style="font-size:24pt;margin-top:.24in;color:${C.tomato}">Play Before Pixels</div>
    <div class="spacer"></div>
    <svg class="scene" viewBox="70 140 460 360" style="width:4.4in;align-self:center">${SCENES.b1()}</svg>
  </div>` });
}
function howPage() {
  const item = (icon, t, d) => `<li>${icon}<div><b>${t}</b><br><span style="color:var(--soft)">${d}</span></div></li>`;
  const sample = P[20];
  return pg({ kind: 'text', title: 'How to use this book', html: `
  <div class="live">
    <div class="eyebrow">The plan</div><h1>How to use this book</h1>
    <p class="lede" style="margin-bottom:.14in">The 100 plays are sorted into four age bands. Start with your child’s band, then look one band either side: children don’t read the labels, and a favorite play can last for years.</p>
    <div style="display:flex;gap:.12in;margin-bottom:.16in">${BANDS.map(b => `<div class="card" style="flex:1;background:${BC[b.key].t};padding:.12in .14in"><div class="display" style="font-size:20pt">${b.label}</div><div style="font-size:8.6pt;font-weight:700">${b.long}<br>Plays ${b.from}–${b.to}</div></div>`).join('')}</div>
    <h2>Every play has the same parts</h2>
    <ul class="list howgrid" style="margin-bottom:.14in;display:grid;grid-template-columns:1fr 1fr;column-gap:.3in">
      ${item(`<span class="num" style="background:${C.tGrass}">21</span>`, 'Number and starting age', '"From 12 mo" is the youngest age the play suits. "Best for" gives the usual range. You know your child best.')}
      ${item(ico('clock', '', '.3in'), 'Prep time', 'No prep, about 2 minutes, or about 10 minutes of setting up.')}
      ${item(`<span style="width:.3in;display:inline-flex">${drops(1)}</span>`, 'Mess level', 'No drops: no mess. One drop: a little mess. Two drops: messy (lay down a towel).')}
      ${item(ico('timer', '', '.3in'), 'Play time', 'About 5, about 10, or 20 minutes or more. Many children play longer or shorter, and both are fine.')}
      ${item(ico('pin', '', '.3in'), 'Where', 'Indoors, outdoors, bath time, kitchen, waiting and car, wind-down or big energy.')}
      ${item(ico('bag', '', '.3in'), 'You need', `Everyday things. ${P.filter(p => !p.buy).length} plays carry the <b>Nothing to buy</b> badge; the pantry list shows what to gather.`)}
      ${item(`<span class="num" style="background:${C.tSun}">±</span>`, 'Make it easier, make it harder', 'One way to make the play simpler today and one way to stretch it next time.')}
      ${item(ico('talk', '', '.3in'), 'Talk while you play', 'A line to say, tagged with one of six easy talk moves (next page).')}
      ${item(`<span style="color:${C.grass}">${ico('shield', '', '.3in')}</span>`, 'Safety note', 'Read it every time. The full rules are on the "Safety first" page.')}
      ${item(`<span class="num" style="background:${C.tPlum}">2</span>`, 'Too tired today?', 'Turn to <b>Tired-grown-up plays</b>: 2 minutes, no setup, played from the couch or the floor.')}
    </ul>
    <div class="boxnote" style="display:flex;gap:.16in;align-items:center"><div class="display" style="font-size:26pt;color:${C.tomato}">3</div><div><b>Three plays a day is a great day.</b> One in the morning, one outside and one to wind down. Most children love 2 or 3 of these plays and ask for them again and again; that’s normal. If interest fades, stop, and try another day.</div></div>
  </div>` });
  function drops(l) { return X.drops(l); }
}
function movesPage() {
  const ex = { wait: '“Ready, set… (wait) …go!”', see: '“You’re stirring. Stir, stir, stir.”', add: 'Child: “Ball.” You: “Red ball!”', choice: '“Bubbles or blocks?”', lead: '“Oh, Teddy goes in the box! In he goes.”', sing: '“Wave bye-bye… bye-bye, bath!”' };
  const cols = [C.sky, C.grass, C.sun, C.tomato, C.plum, C.sky];
  return pg({ kind: 'text', title: 'Talk while you play: six easy moves', html: `
  <div class="live">
    <div class="eyebrow">Talk while you play</div><h1>Six easy moves</h1>
    <p class="lede">Every play has a talk line tagged with one of these moves. They are plain, everyday ways to take turns talking. There is nothing to memorize: pick one and try it today.</p>
    <div class="grid2" style="flex:1">
      ${Object.keys(MOVES).map((k, i) => `<div class="card" style="background:${[C.tSky, C.tGrass, C.tSun, C.tTomato, C.tPlum, C.tSky][i]};display:flex;flex-direction:column;gap:.06in">
        <div style="display:flex;align-items:center;gap:.1in"><span class="num" style="background:${cols[i]};color:${i === 2 ? C.ink : W}">${i + 1}</span><h2 style="margin:0">${MOVES[k].name}</h2></div>
        <p>${MOVES[k].tip}</p>
        <div class="tline" style="font-size:12pt;margin-top:auto">${ex[k]}</div></div>`).join('')}
    </div>
    <p class="small" style="margin-top:.14in">Any answer counts: a look, a smile, a point, a sound, a sign, a tap on a talking device or a word. If your child doesn’t answer, that’s fine too. Say the word yourself, smile and keep playing.</p>
    <p style="margin-top:.08in;font-weight:800;font-size:10pt">Talk, sing and read in the language you know best. Every language counts.</p>
  </div>` });
}
function safetyPage() {
  const rule = (t, d) => `<li><span class="num" style="background:${C.tGrass};color:${C.ink}">${ico('shield', '', '.2in')}</span><div><b>${t}</b> ${d}</div></li>`;
  return pg({ kind: 'text', title: 'Safety first', html: `
  <div class="live">
    <div class="eyebrow">Every play, every time</div><h1>Safety first</h1>
    <div style="display:flex;gap:.24in;align-items:center;background:${C.tSun};border-radius:.16in;padding:.16in .2in;margin-bottom:.12in">
      <svg class="scene" viewBox="0 0 120 150" style="width:.95in;flex:none"><ellipse cx="60" cy="22" rx="34" ry="12" fill="${C.s2}"/><ellipse cx="60" cy="22" rx="24" ry="7" fill="${C.tSun}"/><path d="M26 22V124C26 138 94 138 94 124V22C94 30 26 30 26 22Z" fill="${C.s2}"/><circle cx="60" cy="84" r="14" fill="${C.tomato}"/><path d="M52 76l16 16M68 76L52 92" stroke="${W}" stroke-width="4" stroke-linecap="round"/></svg>
      <div><h2>The toilet-paper tube test</h2><p style="font-size:10.2pt">For children under 3: if something fits through a toilet-paper tube (about 1.25 in or 3.2 cm across), it is too small to play with. Check toys, lids, food and anything a big sibling leaves out.</p></div>
    </div>
    <ul class="list">
      ${rule('A grown-up is always right there.', 'Every play in this book is for doing together, not for leaving a child alone with.')}
      ${rule('No balloons for children under 8.', 'Uninflated or popped balloons are a choking risk.')}
      ${rule('No cords or strings long enough to wrap around a neck.', 'That includes blind and curtain cords, ribbons, costume ties and charger cables.')}
      ${rule('Water: stay within arm’s reach.', 'Even shallow water, even for a moment. Tip out tubs, buckets and bowls as soon as play ends.')}
      ${rule('Food: soft, small and sitting down.', 'No whole grapes, nuts, popcorn, raw apple or hard candy for toddlers. Cut food into small, soft pieces.')}
      ${rule('Button batteries and small magnets stay locked away.', 'Swallowing one is an emergency. Keep battery covers screwed shut.')}
      ${rule('Outdoors: traffic, sun and water first.', 'Stay where you can see each other. No berries, mushrooms or small stones in hands or mouths.')}
      ${rule('Sleep safely.', 'Tummy time only while your baby is awake and watched. Babies sleep on their backs, in a clear crib.')}
    </ul>
    <div class="spacer"></div>
    <div class="boxnote"><b>In an emergency</b> call your local emergency number (911 in the US). If you think your child has swallowed something harmful, call Poison Control (1-800-222-1222 in the US) or your local poison center. Ages in this book are a guide: if a play does not feel safe for your child, skip it or change it.</div>
  </div>` });
}
function whyPage() {
  return pg({ kind: 'text', title: 'Why play? Why talk?', html: (num) => `
  <div class="live">
    <div class="eyebrow">The why, in plain words</div><h1>Why play? Why talk?</h1>
    <p class="lede">You don’t need to be a teacher or buy anything special. Everyday play and talk, a few minutes at a time, is something every family can do.</p>
    <div style="display:flex;flex-direction:column;gap:.16in">
      <div class="card" style="background:${C.tSky}"><h2>Back-and-forth is the heart of it</h2><p>Taking turns (you say something, your child answers with a look, a sound or a word, and you answer back) is the simplest thing in this book, and the one we come back to on every page. A 2024 study linked more screen time at age 3 with fewer adult words, fewer child sounds and fewer back-and-forth turns at home each day (Brushe and colleagues, <i>JAMA Pediatrics</i>). That is a link, not proof that screens cause it. It is a good reminder that everyday conversation is worth making room for.</p></div>
      <div class="card" style="background:${C.tGrass}"><h2>Moving counts</h2><p>The World Health Organization (2019) recommends that children aged 1 to 4 spend at least 180 minutes a day in a variety of physical activities, spread through the day. Babies do well with plenty of floor play, including tummy time while awake. Look for plays marked <b>Big energy</b> in the Quick finder.</p></div>
      <div class="card" style="background:${C.tSun}"><h2>Screens, gently</h2><p>The same WHO guidelines say that sedentary screen time is not recommended for babies under 1 or for 1-year-olds, and that for 2- to 4-year-olds it should be no more than 1 hour a day, with less being better. Real life has screens in it. Turn to <b>When screens are on anyway</b> (page ${num('When screens are on anyway')}) for friendly, practical ideas.</p></div>
    </div>
    <div class="spacer"></div>
    <div class="boxnote">This book is parent education, not medical advice. If you ever have questions about how your child is growing, moving or talking, ask your child’s doctor. In the US, every state runs a free early intervention program for babies and toddlers, and your child’s doctor can point you to it.</div>
  </div>` });
}
function finderPage() {
  const cats = [
    ['Nothing needed', 'No materials at all', P.filter(p => !p.mat.length).map(p => p.n)],
    ['Big energy', 'Rainy-day wiggles, indoors and out', P.filter(p => p.where.includes('move')).map(p => p.n)],
    ['Outdoors', 'Garden, park, path and puddles', P.filter(p => p.where.includes('out')).map(p => p.n)],
    ['In the kitchen', 'Play while you cook and tidy', P.filter(p => p.where.includes('kitchen')).map(p => p.n)],
    ['Bath time', 'Always within arm’s reach', P.filter(p => p.where.includes('bath')).map(p => p.n)],
    ['Waiting & car', 'Queues, waiting rooms, passenger seats', P.filter(p => p.where.includes('go')).map(p => p.n)],
    ['Wind-down', 'Calm plays for before bed', P.filter(p => p.where.includes('bed')).map(p => p.n)],
    ['10-minute setups', 'Worth it for a long afternoon', P.filter(p => p.prep === 2).map(p => p.n)],
  ];
  return pg({ kind: 'text', title: 'Quick finder: a play for every moment', html: `
  <div class="live">
    <div class="eyebrow">Quick finder</div><h1>A play for every moment</h1>
    <p class="lede" style="margin-bottom:.14in">Find the moment, then pick a number from your child’s band: ${BANDS.map(b => `<span class="chipn" style="background:${BC[b.key].t}">${b.from}–${b.to}</span>ages ${b.label}`).join(' · ')}</p>
    <div style="display:flex;flex-direction:column;flex:1;justify-content:space-between">
    ${cats.map(([t, d, ns]) => `<div style="border-top:1.5px solid var(--ink);padding-top:.07in"><div style="display:flex;align-items:baseline;gap:.12in;margin-bottom:.05in"><h2 style="margin:0;font-size:13pt">${t}</h2><span class="small">${d} · ${ns.length} plays</span></div><div>${ns.map(chipN).join('')}</div></div>`).join('')}
    </div>
  </div>` });
}
function setupPage() {
  return pg({ kind: 'text', title: 'Set up for easy play', html: `
  <div class="live">
    <div class="eyebrow">Before you start</div><h1>Set up for easy play</h1>
    <p class="lede">A little setup makes play easy to start on a busy day. None of this needs buying: look in your cupboards and recycling first.</p>
    <div class="grid2" style="margin-bottom:.2in">
      <div class="card" style="background:${C.tPlum}"><h2>A play basket</h2><p>Keep a basket of everyday play things within easy reach. When you need a play fast, it’s already there. See the list for each age below.</p></div>
      <div class="card" style="background:${C.tSky}"><h2>Rotate, don’t buy</h2><p>Keep 6 to 8 toys out and put the rest away. Swap a few each week. Old toys feel new again.</p></div>
      <div class="card" style="background:${C.tGrass}"><h2>A "yes" space</h2><p>One safe corner where everything in reach is fine to touch, so you can say "yes" more and "no" less.</p></div>
      <div class="card" style="background:${C.tSun}"><h2>Bored is OK</h2><p>Children don’t need entertaining every minute. Playing alone nearby while you cook or rest counts as play too.</p></div>
    </div>
    <h2>What to keep in the basket</h2>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.14in;margin-top:.08in">
      ${BANDS.map(b => `<div><div class="display" style="background:${BC[b.key].c};color:${BC[b.key].fg};border-radius:.1in;padding:.05in .1in;font-size:12pt;margin-bottom:.06in">Ages ${b.label}</div><ul style="list-style:none;font-size:9pt;line-height:1.35">${b.kit.map(k => `<li style="padding:.04in 0;border-bottom:1px solid var(--line)">${esc(k)}</li>`).join('')}</ul></div>`).join('')}
    </div>
    <p class="small" style="margin-top:.14in">For children under 3, every item must pass the toilet-paper tube test. Check the basket often for broken or small pieces.</p>
    <div class="spacer"></div>
    <div style="display:flex;justify-content:space-between">${['basket', 'blocks', 'ball', 'book', 'cup', 'pot', 'box'].map((a, i) => `<svg class="scene" viewBox="-60 -60 120 120" style="width:.8in;height:.8in"><circle r="58" fill="${[C.tSun, C.tSky, C.tTomato, C.tGrass, C.tPlum, C.tSky, C.tSun][i]}"/><use href="#a-${a}" transform="scale(.8)"/></svg>`).join('')}</div>
  </div>` });
}

// Pantry list: about 25 household things the plays use (CUSTOMER-VOICE rule 13; rule-4 safe for under-3s)
function pantryPage() {
  const groups = [
    ['Kitchen', C.tSun, ['plastic cups', 'a big bowl or bucket', 'pots with lids', 'a wooden spoon', 'plastic tubs with lids', 'rolled oats', 'paper plates', 'a clean dish towel']],
    ['Around the house', C.tSky, ['a blanket', 'pillows and sofa cushions', 'washcloths', 'clean socks', 'a pillowcase', 'a laundry basket', 'a flashlight']],
    ['Recycling', C.tGrass, ['cardboard boxes, big and small', 'an empty tissue box', 'a shoebox', 'big plastic lids', 'paper bags']],
    ['Paper and toys', C.tPlum, ['paper', 'crayons (chunky for under-3s)', 'board books', 'a soft ball bigger than a fist', 'a teddy or doll']],
  ];
  const buy = ['an unbreakable baby mirror', 'clear contact paper', 'bubble solution and a wand', 'painter’s tape', 'chunky sidewalk chalk', 'store-bought play dough']; // what the plays without the badge need
  const n = groups.reduce((a, g) => a + g[2].length, 0);
  return pg({ kind: 'text', title: 'The pantry list', html: `
  <div class="live">
    <div class="eyebrow">Nothing to buy</div><h1>The pantry list</h1>
    <p class="lede" style="margin-bottom:.14in">${P.filter(p => !p.buy).length} of the 100 plays carry the <span class="nbuy" style="margin:0 .02in">${ico('home')} Nothing to buy</span> badge. They use only things like these ${n}, which most homes already have. Gather a few into the play basket and you’re ready.</p>
    <div class="grid2" style="margin-bottom:.14in;gap:.14in .22in">
      ${groups.map(([h, bg, items]) => `<div class="card" style="background:${bg};padding:.12in .18in"><h2 style="font-size:13pt">${h}</h2><ul style="list-style:none;font-size:10pt;margin-top:.04in">${items.map(t => `<li style="display:flex;gap:.08in;align-items:center;padding:.03in 0;border-bottom:1px solid rgba(29,41,64,.12)"><svg width=".17in" height=".17in" style="flex:none"><use href="#u-check" color="${C.ink}"/></svg>${esc(t)}</li>`).join('')}</ul></div>`).join('')}
    </div>
    <div class="boxnote" style="margin-bottom:.14in"><b>For children under 3:</b> everything must pass the toilet-paper tube test. No dried beans, rice, pasta, buttons, coins, bottle caps, marker caps or other small items, and no plastic bags.</div>
    <div class="card" style="border:1.5px solid var(--line)"><h2>Worth picking up, if you like</h2><p>The other ${P.filter(p => p.buy).length} plays each need one of these ${buy.length} low-cost things: ${buy.map(esc).join(', ')}. None of them is needed to enjoy the rest of the book.</p></div>
  </div>` });
}

// ---- bands
function bandOpener(b) {
  const col = BC[b.key];
  return pg({ kind: 'opener', band: b.key, title: 'band-' + b.key, noFolio: true, html: `
  <div class="bleedbg" style="background:${col.t}"></div>
  <div class="live" style="align-items:center;text-align:center">
    <div class="eyebrow" style="margin-top:.2in">Plays ${b.from}–${b.to}</div>
    <div class="display" style="font-size:96pt;line-height:.9">${b.label}</div>
    <div class="display" style="font-size:20pt;margin-top:.06in">${b.long}</div>
    <div class="spacer"></div>
    <svg class="scene" viewBox="80 110 440 420" style="width:5in;height:auto">${SCENES[b.key]()}</svg>
    <div class="spacer"></div>
    <div class="display" style="font-size:22pt;max-width:5in">${esc(b.title)}</div>
    <div class="spacer" style="flex:.4"></div>
  </div>` });
}
function glancePage(b) {
  const col = BC[b.key];
  const lean = { b0: 'wait', b1: 'add', b2: 'choice', b3: 'lead' }[b.key];
  const list = P.filter(p => p.band === b.key);
  return pg({ kind: 'text', band: b.key, html: `
  <div class="live">
    <div class="eyebrow">Ages ${b.label} · ${b.long}</div><h1>This stage at a glance</h1>
    <div class="grid2" style="margin-bottom:.16in;gap:.14in .28in">
      ${b.glance.map(([t, d], i) => `<div style="display:flex;gap:.12in"><span class="num" style="background:${col.c};color:${col.fg}">${i + 1}</span><div><b style="font-size:11pt">${t}</b><br><span style="font-size:9.8pt">${d}</span></div></div>`).join('')}
    </div>
    <div style="display:flex;gap:.2in;margin-bottom:.14in">
      <div class="card" style="flex:1.2;background:${col.t};padding:.14in .18in"><div class="eyebrow" style="color:var(--ink)">Talk move to lean on</div><h2>${MOVES[lean].name}</h2><p>${MOVES[lean].tip}</p></div>
      <div class="card" style="flex:1;border:1.5px solid var(--line)"><div class="eyebrow">Play basket</div><p>${b.kit.map(esc).join(' · ')}</p></div>
    </div>
    <h2>In this chapter</h2>
    <div style="columns:2;column-gap:.3in;font-size:9.6pt;margin-top:.06in">
      ${list.map(p => `<div style="display:flex;gap:.08in;align-items:center;padding:.02in 0;break-inside:avoid;border-bottom:1px solid var(--line)"><span class="chipn" style="background:${col.t};margin:0;height:.22in">${p.n}</span><span style="flex:1">${esc(p.t)}</span><span class="small">${esc(p.age)}</span></div>`).join('')}
    </div>
    <div class="spacer"></div>
    <p class="small" style="margin-top:.12in;border-top:1px solid var(--line);padding-top:.08in">Every child grows at their own pace, and ages here are a guide, not a deadline. If you have questions about how your child is growing, moving or talking, ask your child’s doctor.</p>
  </div>` });
}
function rhead(b, a, z) {
  const col = BC[b.key];
  return `<div class="rhead"><span class="chip"><i style="background:${col.c};color:${col.fg}">${b.label}</i>${b.long}</span><span>Plays ${a}${z && z !== a ? '–' + z : ''}</span></div>`;
}
function playPages(b) {
  const list = P.filter(p => p.band === b.key);
  for (let i = 0; i < list.length; i += 2) {
    const a = list[i], z = list[i + 1];
    pg({ kind: 'plays', band: b.key, plays: [a.n, z && z.n].filter(Boolean), html: `<div class="live">${rhead(b, a.n, z && z.n)}<div class="plays">${playCard(a)}${z ? playCard(z) : ownCard(`own-${b.key}-0`, b.key)}</div></div>` });
  }
  pg({ kind: 'plays', band: b.key, html: `<div class="live">${rhead(b, 'your own', '').replace('Plays your own', 'Your own plays')}<div class="plays">${ownCard(`own-${b.key}-1`, b.key)}${ownCard(`own-${b.key}-2`, b.key)}</div></div>` });
}

// ---- back matter
// Tired-grown-up plays: 2 minutes, no setup, from the couch or the floor (CUSTOMER-VOICE rule 14)
function tiredPages() {
  const card = t => `<div class="tcard">
    <div class="kicker"><span class="agepill" style="background:${C.tPlum}">${fromLabel(t.from)}</span> 2 min · no setup</div>
    <h3>${esc(t.t)}</h3>
    <div><b>You need:</b> ${esc(t.need)}</div>
    <p>${esc(t.how)}</p>
    <div class="talk" style="background:${C.tPlum};padding:.07in .12in">${ico('talk', '', '.24in')}<div class="tline">${esc(t.talk)}</div></div>
    <div class="safe">${ico('shield')}<span><b>Safety:</b> ${esc(t.safe)}</span></div></div>`;
  pg({ kind: 'text', title: 'Tired-grown-up plays', html: `
  <div class="live">
    <div class="eyebrow">2 minutes · no setup · from the couch or the floor</div><h1 style="margin-bottom:.08in">Tired-grown-up plays</h1>
    <p style="font-size:10.4pt;margin-bottom:.14in">Some days you have nothing left, and that’s normal. These plays count just as much. Sit or lie down, do one, and call it a win.</p>
    <div class="tired">${TIRED.slice(0, 6).map(card).join('')}</div>
  </div>` });
  pg({ kind: 'text', html: `
  <div class="live">
    <div class="eyebrow">Tired-grown-up plays, continued</div>
    <div class="tired" style="margin-top:.06in">${TIRED.slice(6).map(card).join('')}</div>
    <div class="boxnote" style="margin-top:.14in"><b>Also good from the couch:</b> ${[1, 19, 27, 66, 84, 95].map(n => `${esc(P[n - 1].t)} ${chipN(n)}`).join(' ')}. And every play in the book has a <b>Make it easier</b> line when energy is low.</div>
  </div>` });
}
const BONUST = () => V.etsy ? 'What’s next' : 'Your free bonus and what’s next';
function sampleDay() {
  const rows = [
    ['7:00', 'Wake up and get dressed', 'Sing along as you go.', [40]],
    ['7:30', 'Breakfast', 'Offer two choices and wait.', [37]],
    ['8:15', 'Tidy the kitchen together', 'Your child plays at your feet.', [43, 11]],
    ['9:00', 'Outside', 'A walk, the park or the garden.', [41, 26]],
    ['10:15', 'Snack and a book', 'Point, name and let them turn pages.', [19]],
    ['10:45', 'Big energy', 'Before lunch, when wiggles peak.', [30, 52]],
    ['11:30', 'Lunch, then nap or quiet rest', 'Rest counts. So does a cup of tea for you.', []],
    ['2:30', 'Pretend play', 'Join in with a small role.', [48, 65]],
    ['3:30', 'Out and about', 'Errands become games.', [70, 28]],
    ['4:30', 'Free play nearby', 'Your child plays alone while you cook. That counts.', []],
    ['5:30', 'Dinner and bath', 'Always within arm’s reach in the bath.', [8, 60]],
    ['6:45', 'Wind-down', 'Same order, same songs, every night.', [59, 16]],
  ];
  return pg({ kind: 'text', title: 'A sample screen-free day', html: `
  <div class="live">
    <div class="eyebrow">For a toddler, about 18 months to 3 years</div><h1>A sample screen-free day</h1>
    <p class="lede" style="margin-bottom:.12in">This is a sample, not a schedule. Real days wobble. Pick one or two ideas and keep what works.</p>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;border-left:3px solid ${C.tomato};margin-left:.5in;padding-left:.2in">
      ${rows.map(([t, a, d, ns]) => `<div style="position:relative;display:flex;gap:.16in;align-items:baseline">
        <span style="position:absolute;left:-.82in;width:.5in;text-align:right" class="display">${t}</span>
        <span style="position:absolute;left:-.285in;top:.06in;width:.15in;height:.15in;border-radius:99px;background:${ns.length ? C.tomato : W};border:3px solid ${C.tomato}"></span>
        <div style="flex:1"><b style="font-size:10.8pt">${a}</b> <span style="font-size:9.6pt;color:var(--soft)">${d}</span></div>
        <div style="text-align:right;font-size:9.2pt">${ns.map(n => `${esc(P[n - 1].t)} ${chipN(n)}`).join(' ')}</div></div>`).join('')}
    </div>
    <div class="boxnote" style="margin-top:.16in;background:${C.tSun};border:0"><b>Three short plays is a great day.</b> The rest is ordinary life with you nearby, and that is plenty.</div>
  </div>` });
}
function swapDay() {
  const col = (b, rows) => `<div class="card" style="background:${BC[b].t}"><div class="display" style="font-size:16pt;margin-bottom:.04in">${rows.h}</div><ul class="list">${rows.r.map(([t, ns]) => `<li style="display:block;padding:.06in 0;font-size:9.4pt"><b style="font-size:10pt">${t}:</b> ${ns.map(n => `${esc(P[n - 1].t)} ${chipN(n)}`).join(' ')}</li>`).join('')}</ul></div>`;
  return pg({ kind: 'text', title: 'Swap it for your age and your energy', html: `
  <div class="live">
    <div class="eyebrow">Make the day fit</div><h1>Swap it for your age and your energy</h1>
    <div class="grid2" style="margin-bottom:.18in">
      ${col('b0', { h: 'A baby day (0–1)', r: [['Morning cuddle', [1, 3]], ['Floor time', [2, 9]], ['Kitchen time', [11, 20]], ['Bath and bed', [8, 16]]] })}
      ${col('b3', { h: 'A preschool day (3–5)', r: [['Morning', [100, 76]], ['Outside', [74, 80]], ['Afternoon project', [71, 72]], ['Bedtime', [95, 77]]] })}
    </div>
    <div class="card" style="background:${C.tPlum};margin-bottom:.16in"><h2>Low-energy grown-up? These plays let you sit or lie down.</h2>
      <p style="margin-top:.04in">${[1, 19, 27, 65, 66, 75, 84, 95].map(n => `${esc(P[n - 1].t)} ${chipN(n)}`).join(' ')}</p></div>
    <div class="card" style="border:1.5px solid var(--line)"><h2>Tricky moments, ready plays</h2>
      <ul class="list">
        <li><b style="width:1.7in;flex:none">Waiting for dinner</b><span>${[43, 48, 58].map(n => `${esc(P[n - 1].t)} ${chipN(n)}`).join(' ')}</span></li>
        <li><b style="width:1.7in;flex:none">In a waiting room</b><span>${[73, 84, 54].map(n => `${esc(P[n - 1].t)} ${chipN(n)}`).join(' ')}</span></li>
        <li><b style="width:1.7in;flex:none">Baby asleep, big sibling awake</b><span>${[77, 91, 87].map(n => `${esc(P[n - 1].t)} ${chipN(n)}`).join(' ')}</span></li>
        <li><b style="width:1.7in;flex:none">Rainy afternoon</b><span>${[50, 72, 71].map(n => `${esc(P[n - 1].t)} ${chipN(n)}`).join(' ')}</span></li>
      </ul></div>
  </div>` });
}
function screensPage() {
  const tip = (i, t, d) => `<div style="display:flex;gap:.12in"><span class="num" style="background:${[C.sky, C.grass, C.sun, C.tomato, C.plum, C.sky, C.grass, C.sun][i]};color:${[2, 7].includes(i) ? C.ink : W}">${i + 1}</span><div><b style="font-size:10.6pt">${t}</b><br><span style="font-size:9.6pt">${d}</span></div></div>`;
  return pg({ kind: 'text', title: 'When screens are on anyway', html: `
  <div class="live">
    <div class="eyebrow">No guilt, just ideas</div><h1>When screens are on anyway</h1>
    <p class="lede">Screens are part of family life. This book isn’t about being perfect. It’s about adding more play and talk around the screen time you already have.</p>
    <div class="grid2" style="gap:.22in .3in;margin-bottom:.2in">
      ${tip(0, 'Watch together when you can.', 'Sit with your child, talk about what you see, sing the songs and link it to real life: "A red bus! Like the one we saw."')}
      ${tip(1, 'Choose slow and simple.', 'Calmer shows with one story at a time are easier to talk about than fast, busy ones.')}
      ${tip(2, 'Background TV off.', 'When nobody is really watching, switch it off. It’s hard to talk and play over it.')}
      ${tip(3, 'Warn, then land.', '"Two more minutes, then Pillow Mountain!" Have the next play ready so the switch feels like a treat.')}
      ${tip(4, 'Give screens a spot in the day.', 'A regular time, say while dinner cooks, that doesn’t grow or shrink with chores or behavior. Meals and the hour before bed make easy screen-free spots.')}
      ${tip(5, 'Video calls are different.', 'A call with Grandma is a real back-and-forth conversation. Help your child wave, show and tell.')}
      ${tip(6, 'Give phones a spot too.', 'A basket by the door during play time makes it easier for everyone to join in.')}
      ${tip(7, 'Tomorrow is a new day.', 'A show while you shower or cook is ordinary life. Pick one play tomorrow and carry on.')}
    </div>
    <div class="card" style="background:${C.tSky}"><div class="eyebrow" style="color:var(--ink)">What the guidelines say</div>
      <p><b>World Health Organization (2019):</b> sedentary screen time is not recommended for babies under 1 or 1-year-olds; for 2- to 4-year-olds, no more than 1 hour a day, and less is better.</p>
      <p style="margin-top:.06in"><b>American Academy of Pediatrics (2016):</b> for children younger than 18 months, avoid screen media other than video-chatting; for ages 2 to 5, limit screen use to 1 hour a day of high-quality programming, ideally watched together.</p></div>
    <div class="spacer"></div>
    <svg class="scene" viewBox="0 0 600 170" style="width:5in;align-self:center"><rect x="40" y="150" width="520" height="14" rx="7" fill="${C.tPlum}"/><rect x="90" y="118" width="170" height="34" rx="17" fill="${C.plum}"/><g transform="translate(175 70) scale(.9) rotate(-8)"><use href="#tablet-sleeping"/></g><text x="228" y="40" font-family="Caveat" font-weight="700" font-size="34" fill="${C.ink}">z z z</text><g transform="translate(420 96) scale(.9)"><use href="#book-open"/></g><g transform="translate(330 118) scale(.55)"><use href="#a-blocks"/></g></svg>
    <p class="small" style="text-align:center;margin-top:.04in">Even the tablet likes a rest. Sometimes.</p>
  </div>` });
}
function trackerPage() {
  const col = (from, to) => `<div style="display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:repeat(${to - from + 1},1fr)">${P.slice(from - 1, to).map(p => `<div style="display:flex;align-items:center;gap:.06in;min-height:0;border-bottom:1px solid var(--line);font-size:8.4pt"><svg width=".17in" height=".17in" style="flex:none"><use href="#u-check" color="${C.ink}"/></svg><span class="chipn" style="background:${BC[p.band].t};margin:0;min-width:.28in;height:.2in;font-size:7.8pt">${p.n}</span><span style="flex:1;min-width:0;line-height:1.08;font-size:7.9pt">${esc(p.t)}</span></div>`).join('')}</div>`;
  return pg({ kind: 'text', title: 'The 100-play tracker', html: `
  <div class="live">
    <div class="eyebrow">Tick them off</div><h1 style="margin-bottom:.06in">The 100-play tracker</h1>
    <p style="font-size:9.8pt;margin-bottom:.12in">Color in a circle each time you try a play. Star your favorites to come back to.</p>
    <div style="flex:1;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.16in">${col(1, 25)}${col(26, 50)}${col(51, 75)}${col(76, 100)}</div>
  </div>` });
}
function plannerPage(colorKey = 'tomato', start = 'Monday', extra = false) {
  const days = start === 'Monday' ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const c = C[colorKey], t = C['t' + colorKey[0].toUpperCase() + colorKey.slice(1)];
  const id = `plan-${colorKey}-${start.toLowerCase()}`;
  return pg({ kind: 'text', title: extra ? null : 'Our play week', extra, html: `
  <div class="live">
    <div class="eyebrow">${extra ? `Printable extra · ${start} start` : 'Plan it, try it'}</div><h1 style="margin-bottom:.06in">Our play week</h1>
    <div style="display:flex;gap:.2in;align-items:flex-end;margin-bottom:.14in;font-size:9.8pt"><span style="flex:none"><b>Week of</b></span>${fld(id + '-week')}<span style="flex:none"><b>Our star play</b></span>${fld(id + '-star')}</div>
    <div style="display:grid;grid-template-columns:1.15in .7in 1fr 1.7in;font-size:8pt;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);padding:0 .1in .05in">
      <span>Day</span><span>Play #</span><span>Play and talk line</span><span>Best moment</span></div>
    <div style="flex:1;display:flex;flex-direction:column;gap:.08in">
      ${days.map((d, i) => `<div style="flex:1;display:grid;grid-template-columns:1.15in .7in 1fr 1.7in;align-items:stretch;background:${i % 2 ? W : t};border-radius:.12in;padding:.04in .1in;border:${i % 2 ? `1.5px solid ${t}` : '0'}">
        <span class="display" style="font-size:13pt;align-self:center;color:${colorKey === 'sun' ? C.ink : c}">${d}</span>
        <span style="display:flex;align-items:flex-end;padding-bottom:.06in;padding-right:.1in">${fld(`${id}-${i}-n`)}</span><span style="display:flex;align-items:flex-end;padding-bottom:.06in;padding-right:.14in">${fld(`${id}-${i}-play`)}</span><span style="display:flex">${fld(`${id}-${i}-best`)}</span></div>`).join('')}
    </div>
    <p class="small" style="margin-top:.1in">Tip: plan three plays a day at most. Leave room for boredom, naps and the unexpected.${extra ? ' Type into the lines in free Adobe Acrobat Reader, or print and write.' : V.extras ? ' More planners, with Monday and Sunday starts, are at the back of this file.' : ' A Sunday-start version comes with your free bonus.'}</p>
  </div>` });
}
function sourcesPage() {
  return pg({ kind: 'text', title: 'Sources', html: `
  <div class="live">
    <div class="eyebrow">Where the facts come from</div><h1>Sources</h1>
    <ul class="list" style="font-size:9.8pt">
      <li><div>World Health Organization. <i>Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age.</i> Geneva: WHO; 2019.</div></li>
      <li><div>American Academy of Pediatrics, Council on Communications and Media. Media and Young Minds. <i>Pediatrics.</i> 2016;138(5):e20162591.</div></li>
      <li><div>Brushe ME, et al. Screen time and parent-child talk when children are aged 12 to 36 months. <i>JAMA Pediatrics.</i> 2024;178(4):369–375.</div></li>
    </ul>
    <p class="small" style="margin-top:.1in">These sources describe links (associations) found in research and public-health guidance. They are not claims about any single child, and nothing in this book is a treatment or a promise of any result.</p>
    <div class="card" style="background:${C.tGrass};margin-top:.2in">
      <h2>How these plays were chosen</h2>
      <p>Every play uses everyday things, takes ten minutes or less to set up, and follows the rules on the "Safety first" page: a grown-up right there, the toilet-paper tube test for under-3s, no balloons, no long cords or strings, water always supervised and no choking-risk foods. Each one comes with something to say, because the talk is the point.</p>
    </div>
    <div class="spacer"></div>
    <svg class="scene" viewBox="40 250 520 240" style="width:4.2in;align-self:center">${X.sceneCover()}</svg>
    <div class="spacer"></div>
    <div class="card" style="background:${C.wash}">
      <h2>About Play Before Pixels</h2>
      <p>Play Before Pixels makes calm, practical play-and-talk resources for families with young children: books, printables and card sets built around one simple idea. The first years are built on talk, touch and play, so let’s make room for plenty of back-and-forth.</p>
      <p style="margin-top:.08in">Play ideas are general parent education. They are not professional or clinical advice.</p>
    </div>
    <div style="margin-top:.2in;display:flex;justify-content:space-between;align-items:flex-end"><img src="../../brand/logo/lockup-horizontal.svg" alt="Play Before Pixels" style="height:.5in"><span class="small">${COPY}</span></div>
  </div>` });
}
function bonusPage() {
  const next = [
    ['I’m Bored Play Cards', '150 age-banded play cards with a talk prompt on every card', 'note-sq', C.tSun],
    ['Visual Routine Cards', '200+ picture cards for mornings, meals and bedtime', 'list', C.tSky],
    ['Up! Go! More!', 'A talk-along first-words book for ages 0–3', 'ball', C.tGrass],
  ];
  const cards = `<div class="grid3">${next.map(([t, d, a, bg]) => `<div class="card" style="background:${bg};text-align:center"><svg class="scene" viewBox="-60 -60 120 120" style="width:1in;height:1in"><circle r="58" fill="#FFFFFF"/><use href="#a-${a}" transform="scale(.8)"/></svg><div class="display" style="font-size:13pt;margin:.06in 0 .04in">${t}</div><p style="font-size:9pt">${d}</p></div>`).join('')}</div>`;
  if (V.etsy) return pg({ kind: 'text', title: BONUST(), html: `
  <div class="live">
    <div class="eyebrow">Thank you</div><h1>What’s next</h1>
    <p class="lede">Thank you for playing along. When your child is ready for something new, these are made to go with this book.</p>
    ${cards}
    <div class="card" style="background:${C.wash};margin-top:.3in"><h2>Where to find them</h2><p>Look for the Play Before Pixels shop on Etsy. Your files stay in your Etsy account under Purchases, so you can download them again at any time.</p></div>
    <div class="spacer"></div>
    <p class="small" style="text-align:center">${COPY}</p>
  </div>` });
  return pg({ kind: 'text', title: BONUST(), html: `
  <div class="live">
    <div class="eyebrow">A gift for you</div><h1>Your free bonus</h1>
    <div style="display:flex;gap:.3in;align-items:center;background:${C.tTomato};border-radius:.18in;padding:.24in">
      <div class="qrbox" style="background:#FFFFFF;border-radius:.12in;padding:.08in;flex:none">${qrSvg(150)}</div>
      <div><p style="font-size:11pt;margin-bottom:.08in">Scan the code or visit</p><p class="display" style="font-size:15pt;margin-bottom:.12in;word-break:break-all">${BONUS}</p>
      <ul style="font-size:9.8pt;padding-left:.18in"><li>The play pages in full color, to print or keep on your phone</li><li>The Sunday-start play week planner</li><li>Printable "play of the day" cards</li><li>Three new plays each month for your child’s age</li></ul>
      <p class="small" style="margin-top:.08in">We only ask for your email and your child’s birth month and year, never a name. Unsubscribe anytime.</p></div>
    </div>
    <h2 style="margin-top:.32in;margin-bottom:.12in">What’s next from Play Before Pixels</h2>
    ${cards}
    <div class="spacer"></div>
    <p class="small" style="text-align:center">Find them all at playbeforepixels.com</p>
  </div>` });
}
function notesPage() {
  return pg({ kind: 'notes', title: null, html: `
  <div class="live"><div class="eyebrow">Notes</div><h1>Favorites and funny moments</h1>
  <div style="flex:1;background:repeating-linear-gradient(to bottom, transparent 0, transparent calc(.36in - 1.2px), var(--line) calc(.36in - 1.2px), var(--line) .36in)"></div></div>` });
}

// ---------------------------------------------------------------- assemble
let MAP = null; // page map for the listing images (extras.js)
function assemble(v) {
  pages.length = 0;
  V = v;
  titlePage(); copyrightPage(); contentsPage(); notePage(); howPage(); movesPage(); safetyPage(); whyPage(); finderPage(); setupPage(); pantryPage();
  for (const b of BANDS) {
    if (pages.length % 2 === 1) notesPage(); // opener must land on a right-hand (odd) page
    bandOpener(b); glancePage(b); playPages(b);
  }
  if (pages.length % 2 === 1) notesPage();
  tiredPages(); sampleDay(); swapDay(); screensPage(); trackerPage(); plannerPage('tomato', 'Monday'); sourcesPage(); bonusPage();
  if (v.extras) { plannerPage('sky', 'Monday', true); plannerPage('grass', 'Sunday', true); plannerPage('plum', 'Sunday', true); plannerPage('sun', 'Monday', true); }
  while (pages.length % 2 === 1 || (!v.extras && pages.length < 80)) notesPage();
  // page numbers for contents
  const index = {};
  pages.forEach((p, i) => { if (p.title && !index[p.title]) index[p.title] = i + 1; });
  const num = t => index[t] || '?';
  MAP = { titles: index, plays: {}, extras: [], count: pages.length };
  pages.forEach((p, i) => { (p.plays || []).forEach(n => { MAP.plays[n] = i + 1; }); if (p.extra) MAP.extras.push(i + 1); });
  return pages.map((p, i) => {
    const side = i % 2 === 0 ? 'recto' : 'verso';
    const html = typeof p.html === 'function' ? p.html(num) : p.html;
    const folio = p.noFolio ? '' : `<div class="folio"><span>100 Screen-Free Plays · ${VERSION}${v.extras && !v.etsy ? ' · playbeforepixels.com' : ''}</span><b>${i + 1}</b></div>`;
    return `<section class="page ${side} k-${p.kind}" data-page="${i + 1}">${html}${folio}</section>`;
  }).join('\n');
}

function doc(v) {
  const body = assemble(v);
  const defs = `<svg class="artdefs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${CH.SYMBOLS.join('')}${ART.join('')}</defs></svg><svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${UI.join('')}</defs></svg>`;
  let html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>100 Screen-Free Plays for Ages 0–5 · ${v.label}</title>
<link rel="stylesheet" href="${FONTS}">
<style>${css(v)}
.sk{fill:var(--sk)} .hr{fill:var(--hr)} .sh{fill:var(--sh)} .pa{fill:var(--pa)} .so{fill:var(--so)} .hw{fill:var(--hw)} .ck{fill:${C.tomato};opacity:.28}</style></head>
<body>
<!-- ${COPY} Built by build/book.js; edit plays.js / book.js and rebuild, never this file. -->
${defs}
${body}
</body></html>`;
  if (v.bw) html = toGray(html).replace(/lockup-horizontal\.svg/g, 'lockup-horizontal-black.svg');
  return { html, count: pages.length, map: MAP };
}

if (require.main === module) {
  const only = process.argv[2];
  for (const [k, v] of Object.entries(VARIANTS)) {
    if (only && only !== k) continue;
    const { html, count, map } = doc(v);
    fs.writeFileSync(path.join(OUT, v.file), html);
    if (k === 'letter' || k === 'kdp') fs.writeFileSync(path.join(__dirname, `pagemap-${k}.json`), JSON.stringify(map, null, 1));
    console.log(v.file, count, 'pages');
  }
}
module.exports = { VARIANTS, doc, toGray, PREPLINE };
