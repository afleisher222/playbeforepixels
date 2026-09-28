// Visual Routine Cards — page builder.
//   node build/build.js  -> writes source.html (own-store Color, US Letter) + build/out/*.html for every file we ship.
// Editions (marketing/CUSTOMER-VOICE.md rules 1–4, ops/COMPLIANCE-GATE.md #16 and #19):
//   store = our own shop: website in every footer, QR to the free bonus.
//   etsy  = Etsy upload: no URL, no short link, no QR code anywhere.
//   color = Rainbow, Soft and Navy colorways · low = Low-ink file (Simple colorway: white cards, no tinted grounds).
// Fillable fields (free Adobe Acrobat Reader) are merged into every Color and Low-ink file (rule 3).
// FOUNDER-EDIT markers show where the founder should rewrite copy in her own words (human authorship).
const fs = require('fs');
const path = require('path');
const B = require('./base.js');
const { A } = require('./art.js');
const { CATS, CAT, CARDS } = require('./cards.js');
const { card, CSS: CARD_CSS, DEFS, COLORWAYS, esc } = require('./card.js');
const { C } = B;
const ROOT = path.resolve(__dirname, '..');
const BUILD = __dirname;
const OUTDIR = path.join(__dirname, 'out');
const BRAND = path.resolve(ROOT, '../../brand');

const PAPER = {
  letter: { id: 'letter', name: 'US Letter', w: 8.5, h: 11, css: '8.5in 11in', cssL: '11in 8.5in' },
  a4: { id: 'a4', name: 'A4', w: 8.2677, h: 11.6929, css: '210mm 297mm', cssL: '297mm 210mm' },
};
const COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';
const VERSION = 'Version 1.0 · September 2026';
const PREP = 'About 20 minutes to prep one routine, then reusable';
const BONUS = 'playbeforepixels.com/bonus/visual-routine-cards';
const SITE = 'playbeforepixels.com';
const YOUNG = CARDS.filter(c => !c.cat.startsWith('bk-'));
const BIG = CARDS.filter(c => c.cat.startsWith('bk-'));
const STARTER = CARDS.filter(c => c.starter);
const N_ALL = CARDS.length, N_YOUNG = YOUNG.length, N_BIG = BIG.length, N_START = STARTER.length;
// Second copies of high-use cards (CUSTOMER-VOICE rule 24)
const SECOND = ['morning-brush-teeth', 'bedtime-brush-teeth', 'morning-shoes-on', 'meals-wash-hands', 'morning-potty', 'meals-snack', 'morning-get-dressed', 'words-all-done', 'words-first', 'words-then', 'screens-play-first', 'screens-screens-later'];
const byId = id => { const c = CARDS.find(x => x.id === id); if (!c) throw new Error('no card ' + id); return c; };

// ---------------- logo (supplied files only; brand/BRAND.md "Logo") ----------------
const svgFile = f => fs.readFileSync(path.join(BRAND, 'logo', f), 'utf8').replace(/<\?xml[^>]*>/, '').replace(/<title>.*?<\/title>/, '').replace(/ width="\d+" height="\d+"/, '');
const LOGO = { lock: svgFile('lockup-horizontal.svg'), lockK: svgFile('lockup-horizontal-black.svg'), word: svgFile('wordmark.svg'), wordK: svgFile('wordmark-black.svg') };
const sized = (svg, h) => svg.replace('<svg', `<svg style="height:${h};width:auto;display:block" aria-label="Play Before Pixels"`);

// ---------------- build context ----------------
// X = { paper, store, low, tier }  (set by buildDoc before any page is made)
let X = { paper: 'letter', store: true, low: false, tier: 'full' };
let QR = '';
let PAGENO = 0;
const gcw = () => (X.low ? 'simple' : 'rainbow'); // colorway for sample cards on guide pages
const wordmark = (h = '11px') => sized(X.low ? LOGO.wordK : LOGO.word, h);
const lockup = (h = '.42in') => sized(X.low ? LOGO.lockK : LOGO.lock, h);

// ---------------- helpers ----------------
const chunk = (arr, n) => { const o = []; for (let i = 0; i < arr.length; i += n) o.push(arr.slice(i, i + n)); return o; };
const art = (key, w = 60) => `<svg class="ico" viewBox="0 0 120 100" style="width:${w}px;height:${w * 100 / 120}px" aria-hidden="true">${A[key]()}</svg>`;
function page(inner, { cls = '', foot = true, note = '', style = '', land = false } = {}) {
  PAGENO++;
  const f = foot ? `<div class="foot"><div class="fr"><span>${note || 'Print at 100% (Actual size). Cards are 2.2 in / 5.6 cm square.'}</span><span class="fb">${wordmark('8.5px')}${X.store ? `<span>${SITE}</span>` : ''}</span></div><div class="fr"><span>${COPY} Personal &amp; family use.</span><span>${VERSION} · ${PAGENO}</span></div></div>` : '';
  return `<section class="page ${land ? 'land ' : ''}${cls}" style="${style}">${inner}${f}</section>`;
}
function theme(cw, c, t) {
  const on = c === C.sun ? C.ink : '#fff';
  if (cw === 'rainbow') return `--hc:${c};--ht:${on};--sb:#fff;--sl:${c};--acc:${c};--pn:${t};--num:${c};--numt:${on}`;
  if (cw === 'soft') return `--hc:${t};--ht:${C.ink};--sb:#fff;--sl:${c};--acc:${c};--pn:${t};--num:${c};--numt:${on}`;
  if (cw === 'navy') return `--hc:${C.ink};--ht:#fff;--sb:#fff;--sl:${C.ink};--acc:${c};--pn:${C.wash};--num:${C.ink};--numt:#fff`;
  return `--hc:#fff;--ht:${C.ink};--sb:#fff;--sl:${C.ink};--acc:${C.ink};--pn:#fff;--num:#fff;--numt:${C.ink}`; // simple (low-ink)
}
const cwName = id => COLORWAYS.find(c => c.id === id).name;
const CUT = 'Cut on the gray lines · Grown-up keeps the pieces · Cards are 2.2 in / 5.6 cm, big-piece size for under-3s';
const DOTS = 'Ages 3+: check dots before each play; remove any that lift · Under 3: no dots';

// ---------------- CSS ----------------
function css(paper) {
  const P = PAPER[paper];
  return `<link rel="stylesheet" href="FONTHREF">
<style>
@page { size: ${P.css}; margin: 0 }
@page land { size: ${P.cssL}; margin: 0 }
${CARD_CSS}
.page{width:${P.w}in;height:${P.h}in;position:relative;overflow:hidden;break-after:page;page-break-after:always;background:#fff}
.page.land{page:land;width:${P.h}in;height:${P.w}in}
.page:last-child{break-after:auto;page-break-after:auto}
.in{position:absolute;left:.5in;right:.5in;top:.5in;bottom:.5in;display:flex;flex-direction:column}
.foot{position:absolute;left:.5in;right:.5in;bottom:.17in;display:flex;flex-direction:column;gap:2px;font-size:7.2px;line-height:1.2;color:#56627A;font-weight:600}
.foot .fr{display:flex;justify-content:space-between;align-items:center;gap:12px;white-space:nowrap}
.foot .fb{display:flex;align-items:center;gap:7px;font-weight:800;color:${C.ink}}
h1,h2,h3{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;letter-spacing:-.02em;margin:0;color:${C.ink}}
p{margin:0}
.kicker{font-weight:800;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:#C8431F}
.low .kicker{color:${C.ink}}
/* ---- card pages ---- */
.ph{display:flex;align-items:center;justify-content:space-between;height:.3in;margin-bottom:.12in}
.ph .sec{display:flex;align-items:center;gap:8px;font-weight:800;font-size:11px}
.chip{display:inline-block;font-size:8.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:3px 8px;border-radius:99px;background:${C.wash};color:${C.ink}}
.chip.age{background:${C.ink};color:#fff}
.low .chip{background:#fff;border:1px solid ${C.ink}}
.low .chip.age{background:#fff;color:${C.ink};border:1.5px solid ${C.ink}}
.grid{display:grid;grid-template-columns:repeat(3,2.2in);grid-auto-rows:2.2in;gap:.17in .17in;justify-content:center;align-content:start}
.page.cards .in{justify-content:flex-start}
.cardwrap{position:relative;width:2.2in;height:2.2in}
.cardwrap::after{content:"";position:absolute;inset:-.045in;border:.6px solid #C9D2E0;border-radius:.21in;pointer-events:none}
/* ---- guide pages ---- */
.g-title{font-size:30px;line-height:1.02;margin:6px 0 10px}
.g-lede{font-size:13px;line-height:1.5;max-width:6.2in}
.g-grid{display:grid;gap:12px}
.tile{border-radius:16px;padding:14px 16px;background:var(--t,${C.wash})}
.tile h3{font-size:15px;margin:0 0 4px;letter-spacing:-.01em}
.tile p{font-size:11.2px;line-height:1.45}
.low .tile{background:#fff!important;border:1.5px solid #C9D2E0}
.big{font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600;font-size:34px;line-height:1;color:var(--c,${C.ink})}
.low .big{color:${C.ink}}
.note{font-size:10px;line-height:1.45;color:#4A566D}
.safety{border-radius:14px;padding:12px 14px;border:2px solid ${C.tomato};background:#fff}
.safety h3{font-size:13px;color:#C8431F;margin-bottom:3px}
.low .safety{border-color:${C.ink}} .low .safety h3{color:${C.ink}}
.safety li,.safety p{font-size:10.4px;line-height:1.45}
ul.tight{margin:4px 0 0;padding-left:16px}
ul.tight li{margin:2px 0}
.hand{font-family:"Caveat",cursive;font-weight:700}
/* ---- charts ---- */
.chart .in{align-items:center}
.band{width:100%;border-radius:18px;background:var(--hc);color:var(--ht);display:flex;align-items:center;gap:14px;padding:0 18px;position:relative}
.cw-simple-page .band{border:2px solid ${C.ink}}
.band h2{color:inherit;font-size:30px;line-height:1}
.band .sub{font-size:11px;font-weight:700;opacity:.85;margin-top:3px}
.band .name{margin-left:auto;display:flex;align-items:flex-end;gap:6px;font-size:11px;font-weight:800;min-width:1.9in}
.band .name i{flex:1;border-bottom:2px solid currentColor;opacity:.55;height:18px}
.fl{display:inline-block;border-bottom:2px dashed currentColor;opacity:.6}
.slot{width:2.3in;height:2.3in;border-radius:.2in;border:2px dashed var(--sl);background:var(--sb);position:relative;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.slot .dot{width:.62in;height:.62in;border-radius:50%;background:var(--pn);display:flex;align-items:center;justify-content:center;text-align:center;font-size:6.6px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#6B778C;line-height:1.15}
.cw-simple-page .slot .dot{border:1px solid #C9D2E0}
.vstrip .slot{width:2.28in;height:2.28in}
.slot .n{position:absolute;left:-.1in;top:-.1in;width:.36in;height:.36in;border-radius:50%;background:var(--num);color:var(--numt);font-family:"Fredoka",sans-serif;font-weight:600;font-size:15px;display:flex;align-items:center;justify-content:center}
.cw-simple-page .slot .n{border:2px solid ${C.ink}}
.tipbar{width:100%;display:flex;align-items:center;gap:10px;border-radius:14px;background:var(--pn);padding:8px 14px;font-size:10.5px;line-height:1.4}
.cw-simple-page .tipbar{border:1.5px solid ${C.ink}}
.tipbar b{font-weight:800}
.tipbar .lab{flex:0 0 auto;font-weight:800;font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:${C.ink};opacity:.75}
.check{width:.3in;height:.3in;border-radius:50%;border:2px solid var(--sl);background:#fff}
.cw-simple-page .check{border-color:${C.ink}}
/* checklist */
.cl{width:100%;border-collapse:separate;border-spacing:0 .06in}
.cl th{font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:0 0 2px;color:${C.ink}}
.cl td{background:var(--pn);height:.9in;padding:0}
.cl td:first-child{border-radius:14px 0 0 14px;padding-left:8px}
.cl td:last-child{border-radius:0 14px 14px 0}
.cw-simple-page .cl td{background:#fff;border-top:1.5px solid ${C.ink};border-bottom:1.5px solid ${C.ink}}
.cw-simple-page .cl td:first-child{border-left:1.5px solid ${C.ink}}
.cw-simple-page .cl td:last-child{border-right:1.5px solid ${C.ink}}
.cl .task{display:flex;align-items:center;gap:9px;font-family:"Fredoka",sans-serif;font-weight:600;font-size:15.5px;width:2.75in}
.cl .task .ico{flex:0 0 auto;background:#fff;border-radius:10px}
.cl .task .blankline{flex:1;border-bottom:1.5px solid #9AA6BA;height:22px;margin-right:10px}
.cl .dayc{text-align:center;width:.55in}
.cl .dayc .check{margin:0 auto;width:.36in;height:.36in}
/* extras */
.pocket{border:2px dashed #9AA6BA;border-radius:6px;position:relative}
.slabel{height:1.62in;border-radius:12px;border:.6px solid #C9D2E0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center;padding:6px}
.slabel .nm{font-family:Fredoka,sans-serif;font-weight:600;font-size:14px;line-height:1.05}
.slabel .ag{font-size:8px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#56627A}
/* cover */
.cover .in{justify-content:space-between}
.cv-panel{flex:1;border-radius:26px;background:${C.tSun};position:relative;overflow:hidden;padding:.45in .45in .35in;display:flex;flex-direction:column}
.low .cv-panel{background:#fff;border:2px solid ${C.ink}}
.cv-title{font-size:58px;line-height:.92;letter-spacing:-.035em}
.cv-title .num{color:${C.tomato}}
.low .cv-title .num{color:${C.ink}}
.cv-sub{font-size:16px;font-weight:800;margin-top:12px;max-width:4.6in;line-height:1.3}
.cv-fan{position:relative;flex:1;margin-top:.1in}
.cv-fan .card{position:absolute;box-shadow:0 10px 24px rgba(29,41,64,.14)}
.low .cv-fan .card{box-shadow:none}
.cv-meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.cv-meta span{background:#fff;border-radius:99px;padding:5px 11px;font-size:10.5px;font-weight:800}
.low .cv-meta span{border:1px solid ${C.ink}}
.cv-prep{display:inline-flex;align-items:center;gap:6px;margin-top:10px;font-size:11px;font-weight:800}
/* index */
.idx{column-count:4;column-gap:.22in;font-size:8.5px;line-height:1.32}
.idx h4{font-family:"Nunito Sans",sans-serif;font-size:8px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;margin:7px 0 3px;break-after:avoid;display:flex;align-items:flex-start;gap:6px}
.idx h4 i{width:10px;height:10px;border-radius:3px;background:var(--c);display:inline-block;flex:0 0 auto;margin-top:1px}
.low .idx h4 i{background:#fff;border:1.5px solid ${C.ink}}
.idx h4 em{font-style:normal;white-space:nowrap;opacity:.6;margin-left:auto}
.idx div{display:flex;justify-content:space-between;gap:6px}
.idx div span:last-child{color:#6B778C;font-weight:700}
/* toc table */
.toc{width:100%;border-collapse:collapse;font-size:10.5px}
.toc td{padding:4px 6px;border-bottom:1px solid #E3E8F0;vertical-align:top}
.toc td:last-child{text-align:right;font-weight:800;white-space:nowrap}
.toc tr.h td{font-weight:800;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#56627A;border-bottom:2px solid ${C.ink}}
.sw{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;vertical-align:-1px;box-shadow:inset 0 0 0 1px rgba(29,41,64,.25)}
/* Low-ink file: line art children can colour (CUSTOMER-VOICE rule 1). Ink-filled details (eyes, clock hands) stay ink; every
   other shape becomes white with a thin ink outline. Applies to the shared symbols and to inline art. */
.low defs symbol *:not(g):not([fill="#1D2940"]):not([fill="none"]),
.low .card .art *:not(g):not(use):not([fill="#1D2940"]):not([fill="none"]):not(.disc),
.low svg.ico *:not(g):not(use):not([fill="#1D2940"]):not([fill="none"]),
.low .band svg *:not(g):not(use):not([fill="#1D2940"]):not([fill="none"]),
.low .la *:not(g):not(use):not([fill="#1D2940"]):not([fill="none"]){fill:#FFFFFF!important;stroke:${C.ink}!important;stroke-width:1.3px!important;vector-effect:non-scaling-stroke;opacity:1!important}
.low defs symbol [fill="none"][stroke], .low .card .art [fill="none"][stroke], .low svg.ico [fill="none"][stroke], .low .band svg [fill="none"][stroke], .low .la [fill="none"][stroke]{stroke:${C.ink}!important}
.low .card .art text, .low svg.ico text, .low .la text{stroke-width:.9px!important}
/* fields */
[data-field]{position:relative}
/* start here */
.sh-files{width:100%;border-collapse:collapse;font-size:10.5px}
.sh-files td{padding:5px 6px;border-bottom:1px solid #E3E8F0;vertical-align:top}
.sh-files td:first-child{font-weight:800;white-space:nowrap}
</style>`;
}

// ---------------- card pages ----------------
const header = (left, cw) => `<div class="ph"><span class="sec">${left}</span><span class="sec"><span class="chip">${cwName(cw)}</span>${wordmark('11px')}</span></div>`;
function cardPages(list, cw, { age }) {
  return chunk(list, 12).map(g => {
    const cats = [...new Set(g.map(c => c.cat))].map(id => CAT[id].name);
    const cells = g.map(c => `<div class="cardwrap">${card(c, cw)}</div>`);
    const fillCat = g[g.length - 1].cat;
    for (let i = g.length; i < 12; i++) cells.push(`<div class="cardwrap">${card({ id: 'blank', cat: fillCat, art: null, label: '' }, cw, { blankArt: true, blankLabel: true, field: `fill_${i}` })}</div>`);
    const ageChip = g.every(c => CAT[c.cat].age === 'all ages') ? 'All ages' : age;
    return page(`<div class="in">${header(`<span class="chip age">${ageChip}</span>${esc(cats.join(' · '))}`, cw)}<div class="grid">${cells.join('')}</div></div>`, { cls: 'cards', note: CUT });
  });
}
function blankCardPage(cw) {
  const cells = [];
  for (let i = 0; i < 12; i++) {
    const cat = cw === 'rainbow' ? ['morning', 'meals', 'play', 'reading'][Math.floor(i / 3)] : 'words';
    cells.push(`<div class="cardwrap">${card({ id: 'blank', cat, art: null, label: '' }, cw, { blankArt: true, blankLabel: true, field: `blank_${i + 1}` })}</div>`);
  }
  return page(`<div class="in">${header(`<span class="chip age">All ages</span>Blank cards: draw it or glue a photo, then write or type the word`, cw)}<div class="grid">${cells.join('')}</div></div>`, { cls: 'cards', note: `${CUT} · Type labels in free Adobe Acrobat Reader` });
}
function secondCopiesPage(cw, ids = SECOND) {
  const cells = ids.map(id => `<div class="cardwrap">${card(byId(id), cw)}</div>`);
  return page(`<div class="in">${header(`<span class="chip age">All ages</span>Second copies of the cards families use most`, cw)}<div class="grid">${cells.join('')}</div></div>`, { cls: 'cards', note: CUT });
}
function wordFreePages(list, cw) {
  return chunk(list, 12).map((g, gi) => {
    const cells = g.map(c => `<div class="cardwrap">${card(c, cw, { blankLabel: true, field: `wf_${c.id.replace(/-/g, '_')}` })}</div>`);
    for (let i = g.length; i < 12; i++) cells.push(`<div class="cardwrap">${card({ id: 'blank', cat: g[g.length - 1].cat, art: null, label: '' }, cw, { blankArt: true, blankLabel: true, field: `wf_blank_${gi}_${i}` })}</div>`);
    const cats = [...new Set(g.map(c => c.cat))].map(id => CAT[id].name).join(' · ');
    return page(`<div class="in">${header(`<span class="chip age">Word-free</span>${esc(cats)}`, cw)}<div class="grid">${cells.join('')}</div></div>`, { cls: 'cards', note: 'Word-free cards: use as they are, write a word, or type one in Acrobat Reader · Grown-up keeps the pieces · 2.2 in cards' });
  });
}
function photoPage(cw) {
  const cells = [];
  for (let i = 0; i < 9; i++) cells.push(`<div class="cardwrap">${card({ id: 'photo', cat: cw === 'rainbow' ? ['morning', 'play', 'bedtime'][i % 3] : 'words', art: null, label: '' }, cw, { photo: true, blankLabel: true, field: `photo_${i + 1}` })}</div>`);
  const steps = `<div class="tile" style="grid-column:1/-1;--t:${C.wash};display:flex;gap:.25in;align-items:flex-start">
    <div style="flex:0 0 1.6in"><h3>Photo cards</h3><p class="note">For the things only your family has: your front door, the car seat, grandma's house, the family pet.</p></div>
    <p style="flex:1;font-size:11px;line-height:1.5"><b>1. Snap</b> a photo of the real thing, close up and in good light.<br><b>2. Print</b> it about 1.6 × 1.4 in (4 × 3.5 cm): a wallet-size photo print trimmed down works, or print the photo on plain paper at that size.<br><b>3. Glue</b> it inside the dashed frame with a glue stick and let it dry flat.<br><b>4. Label</b> by hand, or type in Acrobat Reader before printing this page. Then laminate and cut.</p></div>`;
  return page(`<div class="in">${header(`<span class="chip age">All ages</span>Photo-frame cards: print, glue, laminate`, cw)}<div class="grid" style="grid-auto-rows:auto">${cells.join('')}${steps}</div></div>`, { cls: 'cards', note: `${CUT} · Glue photos before laminating` });
}

// ---------------- charts ----------------
const TIP = {
  strip: ['Say what you see.', 'As your child moves a card: "Teeth — all done! Next is… shoes."'],
  horiz: ['Pause and wait.', 'Point to the next card and wait a few seconds. Let them tell you what comes next.'],
  ft: ['Offer a choice.', 'Hold up two play cards for the "then" spot: "Blocks or bubbles?" A point is a real answer.'],
  morning: ['Follow their lead.', 'Let your child pick the order of two steps. Their plan, their pride.'],
  bedtime: ['Sing and gesture.', 'Hum the same short song for each step. Same song, same order, every night.'],
  today: ['Repeat and add one word.', 'If they say "park," you say "park today!" One word more than they said.'],
};
const tipbar = k => `<div class="tipbar"><span class="lab">Talk tip</span><span><b>${TIP[k][0]}</b> ${TIP[k][1]}</span></div>`;
const slot = (n, lbl = 'ages 3+<br>dot here') => `<div class="slot">${n ? `<span class="n">${n}</span>` : ''}<span class="dot">${lbl}</span></div>`;
const nameLine = field => `<span class="name">Name <i${field ? ` data-field="${field}" data-fsize="12"` : ''}></i></span>`;
// a write-in line that is also a fillable field (blank charts)
const fillIn = (field, w, h, size, color, extra = '', align = 0) => `<span class="fl" style="width:${w};height:${h};${extra}" data-field="${field}" data-fsize="${size}" data-falign="${align}" data-fcolor="${color}"></span>`;
const onBand = (cw, light) => (cw === 'simple' || cw === 'soft' || light ? C.ink : '#FFFFFF');

function chartStrip(cw, o = {}) { // Layout 1: vertical strips — My steps / All done
  const col = (title, c, t, isDone, fid) => `<div class="vstrip" style="${theme(cw, c, t)};width:2.95in;display:flex;flex-direction:column;align-items:center;gap:.06in">
    <div class="band" style="height:.55in;justify-content:center;padding:0 10px">${o.fields ? fillIn(fid, '2.4in', '.36in', 18, onBand(cw), '', 1) : `<h2 style="font-size:22px">${title}</h2>`}</div>
    ${[1, 2, 3, 4].map(n => slot(isDone ? null : n, isDone ? 'done<br>goes here' : undefined)).join('')}
  </div>`;
  return page(`<div class="in" style="flex-direction:row;justify-content:center;gap:.35in;align-items:flex-start">
    ${col('My steps', C.sky, C.tSky, false, 'strip_title_1')}${col('All done!', C.grass, C.tGrass, true, 'strip_title_2')}</div>`, { cls: `chart cw-${cw}-page${o.fields ? ' blankchart' : ''}`, note: `Layout 1 · Vertical strips${o.fields ? ' · blank' : ''} · ${DOTS}` });
}
function chartHoriz(cw, o = {}) { // Layout 2: horizontal strips (landscape page)
  const strip = (labels, c, t, fid) => `<div style="${theme(cw, c, t)};display:flex;gap:.18in">${labels.map((l, i) => `<div style="display:flex;flex-direction:column;align-items:center;gap:.06in"><span class="band" style="height:.4in;width:2.3in;justify-content:center;padding:0;border-radius:10px">${o.fields ? fillIn(`${fid}_${i + 1}`, '1.9in', '.3in', 14, onBand(cw), '', 1) : `<b style="font-family:Fredoka,sans-serif;font-weight:600;font-size:16px">${l}</b>`}</span>${slot(null)}</div>`).join('')}</div>`;
  return page(`<div class="in" style="gap:.22in;align-items:center;justify-content:center">
    ${strip(['First', 'Next', 'Then', 'Last'], C.sky, C.tSky, 'hs1')}
    <div style="width:100%;border-top:2px dashed #C9D2E0"></div>
    ${strip(['Now', 'Next', 'Later', 'All done'], C.plum, C.tPlum, 'hs2')}
  </div>`, { land: true, cls: `chart cw-${cw}-page${o.fields ? ' blankchart' : ''}`, note: `Layout 2 · Horizontal strips${o.fields ? ' · blank' : ''} · Cut on the dashed line · ${DOTS}` });
}
function chartFirstThen(cw) { // Layout 3: first–then board (landscape page)
  const P2 = (lbl, c, t) => `<div style="${theme(cw, c, t)};flex:1;height:100%;border-radius:22px;background:var(--pn);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.18in;${cw === 'simple' ? `border:2px solid ${C.ink}` : ''}">
    <div class="band" style="height:.72in;width:auto;padding:0 .35in;border-radius:99px"><h2 style="font-size:34px;font-family:Fredoka,sans-serif;font-weight:600;letter-spacing:0">${lbl}</h2></div>${slot(null)}</div>`;
  const arrow = `<svg viewBox="-34 -26 68 52" style="width:.8in;flex:0 0 auto" aria-hidden="true"><path d="M-30-8H6V-22L32 0 6 22V8H-30Z" fill="${cw === 'simple' ? C.ink : C.tomato}" stroke="${cw === 'simple' ? C.ink : C.tomato}" stroke-width="6" stroke-linejoin="round"/></svg>`;
  return page(`<div class="in" style="gap:.2in;align-items:center">
    <div style="display:flex;gap:.2in;align-items:center;width:100%;flex:1">${P2('First', C.tomato, C.tTomato)}${arrow}${P2('Then', C.grass, C.tGrass)}</div>
    <div style="${theme(cw, C.sun, C.tSun)};width:100%">${tipbar('ft')}</div>
  </div>`, { land: true, cls: `chart cw-${cw}-page`, note: `Layout 3 · First–then board · Try "Play first" then "Screens later" · ${DOTS}` });
}
function chartRoutine(cw, kind, o = {}) { // Layouts 4 + 5: morning and bedtime charts
  const m = kind === 'morning';
  const c = m ? C.sun : C.plum, t = m ? C.tSun : C.tPlum;
  const bandStyle = m ? '' : (cw === 'rainbow' ? `--hc:${C.ink};--ht:#fff` : '');
  const titleColor = m ? (cw === 'navy' ? '#FFFFFF' : C.ink) : onBand(cw);
  const deco = `<svg viewBox="0 0 120 100" style="width:1.05in;height:.9in;flex:0 0 auto">${m ? A.openCurtains() : A.sleep()}</svg>`;
  const title = o.fields ? fillIn(`${kind}_title`, '3in', '.42in', 22, titleColor) : `<h2>${m ? 'Good morning!' : 'Good night!'}</h2>`;
  return page(`<div class="in" style="${theme(cw, c, t)};gap:.16in">
    <div class="band" style="height:1.15in;${bandStyle}">${deco}<div>${title}<div class="sub">${m ? 'My morning, one picture at a time' : 'My bedtime, one picture at a time'}</div></div>${nameLine(o.fields ? `${kind}_name` : null)}</div>
    <div style="display:grid;grid-template-columns:repeat(3,2.3in);gap:.15in .15in">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => slot(n)).join('')}</div>
    <div class="tipbar"><span class="lab">All done</span><span>When every card is done, we: <span class="hand" style="font-size:17px;display:inline-block;min-width:2in;height:22px;border-bottom:1.5px solid #9AA6BA;vertical-align:bottom"${o.fields ? ` data-field="${kind}_together" data-fsize="12" data-falign="0"` : ''}>${o.fields ? '' : (m ? 'play blocks together!' : 'read one more book')}</span></span></div>
    ${tipbar(m ? 'morning' : 'bedtime')}
  </div>`, { cls: `chart cw-${cw}-page${o.fields ? ' blankchart' : ''}`, note: `Layout ${m ? 4 : 5} · ${m ? 'Morning' : 'Bedtime'} chart${o.fields ? ' · blank' : ''} · Use only the steps you need · ${DOTS}` });
}
function chartToday(cw, start, o = {}) { // Layout 6: Today board, Monday or Sunday start
  const days = start === 'mon' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekend = d => d === 'Sat' || d === 'Sun';
  const cols = [['Morning', C.sun, C.tSun], ['Afternoon', C.sky, C.tSky], ['Evening', C.plum, C.tPlum]];
  const title = o.fields ? fillIn(`today_title_${start}`, '3in', '.42in', 22, onBand(cw)) : '<h2>Today is…</h2>';
  return page(`<div class="in" style="${theme(cw, C.grass, C.tGrass)};gap:.11in">
    <div class="band" style="height:.8in"><svg viewBox="0 0 120 100" style="width:.8in;height:.67in;flex:0 0 auto">${A.wToday()}</svg><div>${title}<div class="sub">Clip or stick the marker on today</div></div>${nameLine(o.fields ? `today_name_${start}` : null)}</div>
    <div style="display:flex;gap:.07in;width:100%">${days.map(d => `<div style="flex:1;height:.55in;border-radius:12px;background:${cw === 'simple' ? '#fff' : (weekend(d) ? 'var(--pn)' : C.wash)};border:${cw === 'simple' ? `1.5px solid ${C.ink}` : '0'};display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Fredoka,sans-serif;font-weight:600;font-size:16px">${d}<span style="width:.16in;height:.16in;border-radius:50%;border:1.5px dashed #9AA6BA;margin-top:3px"></span></div>`).join('')}</div>
    <div style="display:flex;gap:.15in">${cols.map(([l, c, t]) => `<div style="${theme(cw, c, t)};display:flex;flex-direction:column;align-items:center;gap:.08in"><div class="band" style="height:.4in;justify-content:center;padding:0;border-radius:10px"><b style="font-family:Fredoka,sans-serif;font-weight:600;font-size:16px">${l}</b></div>${slot(null)}${slot(null)}</div>`).join('')}</div>
    <div style="${theme(cw, C.tomato, C.tTomato)};display:flex;gap:.15in;width:100%;align-items:stretch">
      ${slot(null, 'something<br>special')}
      <div style="flex:1;border-radius:18px;background:var(--pn);${cw === 'simple' ? `border:1.5px solid ${C.ink};` : ''}padding:.12in .18in;display:flex;flex-direction:column;gap:.08in">
        <b style="font-size:10px;letter-spacing:.14em;text-transform:uppercase">Weather today · circle one</b>
        <div style="display:flex;justify-content:space-between">${[['Sunny', A.fsun()], ['Cloudy', A.fcloud()], ['Rainy', A.frain()], ['Snowy', A.fsnow()]].map(([l, a]) => `<div style="text-align:center"><div style="width:.9in;height:.9in;border-radius:50%;background:#fff;${cw === 'simple' ? `border:1.5px solid ${C.ink};` : ''}display:flex;align-items:center;justify-content:center"><svg class="la" viewBox="0 0 120 100" style="width:.76in;height:.64in">${a}</svg></div><div style="font-family:Fredoka,sans-serif;font-weight:600;font-size:13px;margin-top:2px">${l}</div></div>`).join('')}</div>
        <div style="font-size:10.5px;display:flex;gap:6px;align-items:flex-end;margin-top:auto"><b>Who I'll see today:</b><span style="flex:1;border-bottom:1.5px solid #9AA6BA;height:18px"${o.fields ? ` data-field="today_who_${start}" data-fsize="11" data-falign="0"` : ''}></span></div>
      </div>
    </div>
    ${tipbar('today')}
  </div>`, { cls: `chart cw-${cw}-page${o.fields ? ' blankchart' : ''}`, note: `Layout 6 · Today board, ${start === 'mon' ? 'Monday' : 'Sunday'} start${o.fields ? ' · blank' : ''} · ${DOTS}` });
}
const CL_TASKS = {
  morning: [['alarm', 'Wake up on time'], ['makeBedBig', 'Make my bed'], ['dressedBig', 'Get dressed'], ['breakfastBig', 'Eat breakfast'], ['floss', 'Brush & floss'], ['hair', 'Do my hair'], ['waterBottle', 'Fill water bottle'], ['backpackDoor', 'Backpack by the door']],
  evening: [['unpackBag', 'Unpack my bag'], ['homework', 'Homework'], ['reading20', 'Read 20 minutes'], ['outsideTime', 'Outside time'], ['helpDinner', 'Help make dinner'], ['shower', 'Shower'], ['layOut', 'Lay out clothes'], ['devicesSleep', 'Devices sleep outside']],
};
function checklist(cw, kind, start, o = {}) { // 5–12 weekly checklists (pre-filled, or blank + fillable)
  const m = kind === 'morning';
  const days = start === 'mon' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const c = m ? C.sun : C.sky, t = m ? C.tSun : C.tSky;
  const f = o.blank;
  const rows = CL_TASKS[kind].map(([a, l], i) => {
    const task = f ? `<span class="ico" style="width:.5in;height:.42in;display:inline-block"></span><span class="blankline" data-field="cl_${kind}_${start}_task${i + 1}" data-fsize="12" data-falign="0"></span>` : `${art(a, 56)}<span>${esc(l)}</span>`;
    return `<tr><td><div class="task">${task}</div></td>${days.map((d, j) => `<td class="dayc"><div class="check"${f ? ` data-field="cl_${kind}_${start}_r${i + 1}_d${j + 1}" data-ftype="check"` : ''}></div></td>`).join('')}</tr>`;
  }).join('');
  // CUSTOMER-VOICE rule 26: the screen spot is fixed in the day; it never depends on the list.
  return page(`<div class="in" style="${theme(cw, c, t)};gap:.12in">
    <div class="band" style="height:.95in"><svg viewBox="0 0 120 100" style="width:.95in;height:.8in;flex:0 0 auto">${m ? A.alarm() : A.readInBed()}</svg><div><h2 style="font-size:26px">${m ? 'My morning checklist' : 'After school & evening'}</h2><div class="sub">Ages 5–12 · Week of <span style="display:inline-block;width:1.1in;height:14px;border-bottom:1.5px solid currentColor;opacity:.7;vertical-align:-2px"${f ? ` data-field="cl_${kind}_${start}_week" data-fsize="10" data-falign="0"` : ''}></span></div></div>${nameLine(f ? `cl_${kind}_${start}_name` : null)}</div>
    <table class="cl"><tr><th style="text-align:left;padding-left:8px">${f ? 'My jobs (write your own)' : 'My jobs'}</th>${days.map(d => `<th>${d}</th>`).join('')}</tr>${rows}</table>
    <div class="tipbar"><span class="lab">Our day</span><span><b>Screens have their own spot in our day:</b> <span class="hand" style="font-size:16px;display:inline-block;min-width:1.5in;height:20px;border-bottom:1.5px solid #9AA6BA;vertical-align:bottom"${f ? ` data-field="cl_${kind}_${start}_spot" data-fsize="11" data-falign="0"` : ''}>${f ? '' : 'after dinner'}</span>. Same spot every day, list or no list.</span></div>
  </div>`, { cls: `chart cw-${cw}-page${f ? ' blankchart' : ''}`, note: `Big-kid ${m ? 'morning' : 'evening'} checklist · ${start === 'mon' ? 'Monday' : 'Sunday'} start · ${f ? 'Blank: type or write your own jobs' : 'Pre-filled'} · Laminate and use a dry-erase marker` });
}
const prefilledCharts = cw => [chartStrip(cw), chartHoriz(cw), chartFirstThen(cw), chartRoutine(cw, 'morning'), chartRoutine(cw, 'bedtime'), chartToday(cw, 'mon'), chartToday(cw, 'sun'),
  checklist(cw, 'morning', 'mon'), checklist(cw, 'morning', 'sun'), checklist(cw, 'evening', 'mon'), checklist(cw, 'evening', 'sun')];
const blankCharts = cw => [chartStrip(cw, { fields: true }), chartHoriz(cw, { fields: true }), chartRoutine(cw, 'morning', { fields: true }), chartRoutine(cw, 'bedtime', { fields: true }), chartToday(cw, 'mon', { fields: true }), chartToday(cw, 'sun', { fields: true }),
  checklist(cw, 'morning', 'mon', { blank: true }), checklist(cw, 'morning', 'sun', { blank: true }), checklist(cw, 'evening', 'mon', { blank: true }), checklist(cw, 'evening', 'sun', { blank: true })];

// ---------------- extras ----------------
function extrasPage() {
  const cw = gcw();
  const marker = (c) => `<div class="card cw-${cw}" style="--c:${c};--t:${C.wash};--on:#fff;width:2.2in;height:2.2in"><svg class="art" viewBox="0 0 120 100"><circle class="disc" cx="60" cy="52" r="44"/>${A.wToday()}</svg><div class="lab" style="font-size:18px">Today</div></div>`;
  const flap = `display:flex;align-items:center;justify-content:center;font-size:7.5px;font-weight:800;letter-spacing:.1em;color:#6B778C;background:${X.low ? '#fff' : C.wash}`;
  return page(`<div class="in" style="gap:.16in">
    <div><span class="kicker">Extras</span><h2 style="font-size:24px;margin-top:2px">Today markers and an All done pocket</h2></div>
    <div style="display:flex;gap:.25in;align-items:flex-start">
      <div class="cardwrap">${marker(C.tomato)}</div><div class="cardwrap">${marker(C.grass)}</div>
      <div style="flex:1" class="note"><b style="color:${C.ink}">Today markers.</b> Cut out and laminate. Ages 3+: stick a velcro dot on the back and move it along the day chips on the Today board. Under 3: lay it on the chip.<br><br><b style="color:${C.ink}">All done pocket.</b> Cut on the dashed line. Fold the three glue flaps back along the gray lines and glue them to the chart or the wall, leaving the top open. Finished cards drop inside. No dots needed, so it suits under-3s.</div>
    </div>
    <div class="pocket" style="height:3.1in;display:flex;align-items:stretch;border-bottom:none;border-radius:6px 6px 0 0">
      <div style="width:.5in;border-right:1.5px solid #C9D2E0;writing-mode:vertical-rl;${flap}">GLUE FLAP</div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;background:${X.low ? '#fff' : C.tGrass}">
        <svg viewBox="-30 -30 60 60" style="width:.9in;height:.9in"><circle r="26" fill="${X.low ? '#fff' : C.grass}" ${X.low ? `stroke="${C.ink}" stroke-width="3"` : ''}/><path d="M-12 0L-3 9 13-9" stroke="${X.low ? C.ink : '#fff'}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div style="font-family:Fredoka,sans-serif;font-weight:600;font-size:34px;margin-top:6px">All done!</div></div>
      <div style="width:.5in;border-left:1.5px solid #C9D2E0;writing-mode:vertical-rl;${flap}">GLUE FLAP</div>
    </div>
    <div style="margin:-.16in .5in 0;height:.45in;border:2px dashed #9AA6BA;border-top:1.5px solid #C9D2E0;border-radius:0 0 6px 6px;${flap}">GLUE FLAP</div>
  </div>`, { note: 'Extras · Grown-up keeps the pieces · Keep loose laminated scraps and velcro dots away from children who still mouth things' });
}
const LABEL_ART = { morning: 'wakeUp', meals: 'breakfast', play: 'blocks', outside: 'park', reading: 'readTogether', bath: 'bathTime', bedtime: 'sleep', helping: 'tidyToys', feelings: 'fHappy', about: 'shopping', words: 'wFirst', screens: 'playFirst', 'bk-morning': 'alarm', 'bk-after': 'homework', 'bk-evening': 'readInBed', 'bk-jobs': 'tidyRoom' };
function labelsPage() {
  // every label is a word + an icon + (in color) the routine color: never color alone (gate #20). 1.6 in tall: big-piece size.
  const labels = CATS.map(c => `<div class="slabel" style="background:${X.low ? '#fff' : c.t};${X.low ? '' : `border-top:8px solid ${c.c};`}">${art(LABEL_ART[c.id], 70)}<div class="nm">${esc(c.name)}</div><div class="ag">${c.age === 'all ages' ? 'All ages' : 'Ages ' + c.age}</div></div>`).join('');
  return page(`<div class="in" style="gap:.14in">
    <div><span class="kicker">Extras</span><h2 style="font-size:24px;margin-top:2px">Storage labels</h2><p class="note" style="margin-top:4px">One label per routine group, for zip pouches, envelopes, a photo box or binder rings. Each label shows the routine's name and picture, so nobody has to match by color alone.</p></div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.12in">${labels}</div>
  </div>`, { note: 'Storage labels · Cut on the gray lines · Grown-up keeps the pieces' });
}

// ---------------- guide pages ----------------
function fan(list, positions) {
  return list.map((id, i) => { const [x, y, r, s] = positions[i]; return `<div style="position:absolute;left:${x}in;top:${y}in;transform:rotate(${r}deg) scale(${s});transform-origin:center">${card(byId(id), gcw())}</div>`; }).join('');
}
const clockIco = `<svg viewBox="0 0 20 20" style="width:13px;height:13px"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 5V10L13 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;
function coverPage() {
  const starter = X.tier === 'starter';
  const pos = [[0.05, .45, -8, .95], [2.1, .1, -2, 1.02], [4.15, .45, 7, .95], [1.1, 3.0, 5, .95], [3.2, 3.05, -5, .95]];
  const ids = ['morning-brush-teeth', 'play-blocks', 'bedtime-sleep', 'screens-play-first', 'screens-screens-later'];
  const meta = starter ? [`${N_START} picture cards`, '3 chart layouts', 'Play first / screens later', 'Fillable blanks', 'US Letter + A4'] : [`${N_ALL} picture cards`, '6 chart layouts', '4 colorways', 'Fillable blanks', 'US Letter + A4'];
  return page(`<div class="in"><div class="cv-panel">
    <div style="display:flex;justify-content:space-between;align-items:center">${lockup('.42in')}<span class="chip age" style="font-size:9.5px;padding:5px 11px">${starter ? 'Ages 0–5' : 'Ages 0–5 and 5–12'}</span></div>
    <h1 class="cv-title" style="margin-top:.26in">${starter ? `<span class="num">${N_START}</span> Visual<br>Routine Cards` : '<span class="num">200+</span> Visual<br>Routine Cards'}</h1>
    <p class="cv-sub">Helps little ones see what comes next. Morning, meals, play, outside, reading, bath, bedtime, helping jobs and feelings.</p>
    <div class="cv-meta">${meta.map(s => `<span>${s}</span>`).join('')}</div>
    <div class="cv-prep">${clockIco}${PREP}.</div>
    <div class="cv-fan">${fan(ids, pos)}</div>
  </div></div>`, { cls: 'cover', note: `${starter ? 'Starter Set' : 'Complete Set'} · ${X.low ? 'Low-ink' : 'Color'} · ${PAPER[X.paper].name}` });
}
function welcomePage() {
  // FOUNDER-EDIT: rewrite this welcome in your own words (human-authorship requirement, brand/BRAND.md).
  const starter = X.tier === 'starter';
  const tiles = starter ? [
    [`${N_START}`, 'picture cards', 'Morning, meals, play, outside, reading, bath, bedtime, helping jobs, feelings and plan words, plus second copies of the busiest cards.', C.tomato, C.tTomato],
    ['3', 'chart layouts', 'A vertical strip, a first–then board and a morning chart, ready-made and blank.', C.sky, C.tSky],
    ['+', 'make it yours', 'Blank, word-free and photo-frame cards. Type labels and chart titles in free Adobe Acrobat Reader.', C.grass, C.tGrass],
  ] : [
    [`${N_ALL}`, 'picture cards', `${N_YOUNG} for ages 0–5 (feelings, plan words and the screens pair work at any age) and ${N_BIG} big-kid cards for ages 5–12.`, C.tomato, C.tTomato],
    ['6', 'chart layouts', 'Vertical strips, horizontal strips, a first–then board, morning and bedtime charts and a Today board.', C.sky, C.tSky],
    ['4', 'colorways', 'Rainbow, Soft and Navy in the Color file; Simple, a white ink-saver, in the Low-ink file.', C.grass, C.tGrass],
    ['2', 'paper sizes', 'US Letter and A4. Cards stay 2.2 in (5.6 cm) on both, so every card fits every chart.', C.plum, C.tPlum],
    ['+', 'make it yours', 'Blank, word-free and photo-frame cards, second copies of busy cards, and blank charts you can type into.', C.sun, C.tSun],
    ['16', 'routine groups', 'Morning to bedtime, feelings, plan words, out and about, and four big-kid groups. Monday and Sunday starts.', C.ink, C.wash],
  ];
  return page(`<div class="in" style="gap:.16in">
    <div><span class="kicker">Grown-up guide · 1 of 2</span><h1 class="g-title">Pictures make the plan easy to see</h1>
    <p class="g-lede">Little ones live in the now. A short row of pictures shows them what is happening, what comes next and when it's done. They can point to it, carry it and move it themselves. Bigger kids can run their own mornings with a checklist they helped write. Use as few or as many cards as your family needs.</p></div>
    <div class="g-grid" style="grid-template-columns:repeat(3,1fr)">${tiles.map(([n, h, p, c, t]) => `<div class="tile" style="--c:${c === C.sun ? '#B98200' : c};--t:${t}"><div class="big">${n}</div><h3 style="margin-top:4px">${h}</h3><p>${p}</p></div>`).join('')}</div>
    <div class="g-grid" style="grid-template-columns:1fr 1fr">
      <div class="tile" style="--t:${C.tSun}"><h3>Set up in 2 minutes</h3><p><b>1.</b> Pick one routine you already do, like bedtime.<br><b>2.</b> Print its cards and one chart at 100% (Actual size).<br><b>3.</b> Lay three cards on the chart and start tonight. Laminating and dots can wait for the weekend.</p></div>
      <div class="tile" style="--t:${C.tGrass}"><h3>What your child is practicing</h3><p>Knowing what comes next. Taking a real job in their own day by moving a card to <b>All done</b>. Words for everyday things and feelings. There are no tests and nothing to get right.</p></div>
    </div>
    <div class="tile" style="--t:${C.wash};display:flex;gap:16px;align-items:center">
      <div style="display:flex;gap:8px;flex:0 0 auto">${['screens-play-first', 'screens-screens-later'].map(id => `<div style="width:1.21in;height:1.21in"><div style="transform:scale(.55);transform-origin:top left">${card(byId(id), gcw())}</div></div>`).join('')}</div>
      <div><h3>Play first, screens later</h3><p>Screens get their own steady spot in the day, after play. The spot doesn't grow or shrink with jobs or behavior, so it never becomes the prize. <b>What we do next</b> and <b>5 more minutes</b> cards help with the switch. The tablet is a plain, generic picture: no brands, no apps. For reference, the World Health Organization (2019) suggests no screen time for babies under 1 and no more than 1 hour a day for ages 2–4.</p></div>
    </div>
  </div>`, { note: 'Grown-up guide' });
}
function talkPage() {
  const tips = [
    ['Say what you see', '"Shoes on! Blue shoes." Name the card as your child touches it.', 'morning-shoes-on'],
    ['Pause and wait', '"First teeth, then…" and wait a few seconds. A point, a look or a sound is an answer.', 'morning-brush-teeth'],
    ['Repeat and add one word', 'Your child says "bath." You say "warm bath." One word more than they said.', 'bath-bath-time'],
    ['Offer a choice', 'Hold up two play cards: "Blocks or puzzle?" Let them pick and put it on the chart.', 'play-puzzle'],
    ['Follow their lead', 'If they grab the dog card, talk about the dog. The plan can wait ten seconds.', 'helping-feed-the-pet'],
    ['Sing and gesture', 'Make up a tidy-up tune or a wave for "all done." Same song, same moment, every day.', 'play-sing-a-song'],
  ];
  return page(`<div class="in" style="gap:.14in">
    <div><span class="kicker">Grown-up guide · 2 of 2</span><h1 class="g-title">The cards are the start of a conversation</h1>
    <p class="g-lede">A routine card is something to talk about together, not a replacement for talking. Start with the first three ideas; add the others when you like. There's nothing to get right.</p></div>
    <div class="g-grid" style="grid-template-columns:1fr 1fr">${tips.map(([h, p, id]) => `<div class="tile" style="display:flex;gap:12px;align-items:center;padding:10px 14px;--t:${C.wash}"><div style="flex:0 0 auto;width:1in;height:1in"><div style="transform:scale(.4545);transform-origin:top left">${card(byId(id), gcw())}</div></div><div><h3>${h}</h3><p>${p}</p></div></div>`).join('')}</div>
    <div class="g-grid" style="grid-template-columns:1fr 1fr">
      <div class="tile" style="--t:${C.tSun}"><h3>Every language counts</h3><p>Talk, sing and read in the language you know best. Every language counts. Family words, home languages and pet names all belong on these cards. A sign, a point or a tap on a card counts as communicating too.</p></div>
      <div class="tile" style="--t:${C.tSky}"><h3>If interest fades</h3><p>Put the cards away for a week, then bring back just two. Let your child choose which routine gets a chart, or hand them the job of moving the cards. Most children love 2–3 of these; that's normal.</p></div>
    </div>
  </div>`, { note: 'Grown-up guide · Talk while you use them' });
}
function agesPage() {
  const stages = [
    ['0–12 months', C.tomato, C.tTomato, 'One card, one moment', 'Show a single card right before it happens and say the word: "Bath!" Hold it where your baby can look, then do the thing together. The grown-up holds the card.'],
    ['1–2 years', C.sun, C.tSun, 'First, then', 'Two cards on the first–then board, laid on top (no dots under 3). "First shoes, then park." Let your toddler carry the "then" card to the door.'],
    ['2–3 years', C.sky, C.tSky, 'A strip of three or four', 'Pick one routine and use the vertical strip. Your child moves each card to All done or into the pocket. Keep the same order every day.'],
    ['3–5 years', C.grass, C.tGrass, 'Morning and bedtime charts', 'Up to nine steps. Let them choose the order of two steps, and add a feelings card: "How are you feeling this morning?"'],
    ['5–8 years', C.plum, C.tPlum, 'Big-kid cards and checklists', 'Switch to the 5–12 cards or the weekly checklist. They tick, you notice. Swap in a card when something new is happening.'],
    ['8–12 years', C.ink, C.wash, 'They write the plan', 'Blank cards and the fillable checklist let them set their own routine. Agree together where screens fit in the day, and keep that spot steady.'],
  ];
  return page(`<div class="in" style="gap:.14in">
    <div><span class="kicker">Use them by age</span><h1 class="g-title">Start small, grow the plan with your child</h1>
    <p class="g-lede">Every child is different, so use these as starting points, not targets. If a step feels like too much, drop back to fewer cards. If it feels too easy, hand over more of the plan.</p></div>
    <div class="g-grid" style="grid-template-columns:1fr 1fr">${stages.map(([a, c, t, h, p]) => `<div class="tile" style="--t:${t};border-top:6px solid ${X.low ? C.ink : c};border-radius:16px"><span class="chip" style="background:#fff">${a}</span><h3 style="margin-top:7px">${h}</h3><p>${p}</p></div>`).join('')}</div>
    <div class="g-grid" style="grid-template-columns:repeat(3,1fr)">
      ${[['Change of plan', 'words-change-of-plan', 'Slip this card in when the day changes. It shows something new is coming, before it arrives.'], ['Wait', 'words-wait', 'For the in-between moments: the kettle, the line at the store, a sibling\'s turn.'], ['Feelings check-in', 'feelings-calm', 'Offer two or three feelings cards and let your child point. Then pick a calm-down card together.']].map(([h, id, p]) => `<div class="tile" style="display:flex;gap:10px;align-items:center;--t:${C.wash}"><div style="flex:0 0 auto;width:1.1in;height:1.1in"><div style="transform:scale(.5);transform-origin:top left">${card(byId(id), gcw())}</div></div><div><h3>${h}</h3><p>${p}</p></div></div>`).join('')}
    </div>
    <p class="note">Every child grows on their own timeline. If you have questions about your child's development, talk with your pediatrician.</p>
  </div>`, { note: 'Use them by age' });
}
function tocPage(rows) {
  const sw = { rainbow: C.tomato, soft: C.tSun, navy: C.ink, simple: '#fff' };
  const table = rows.map(s => s.h ? `<tr class="h"><td>${s.h}</td><td>Pages</td></tr>` : `<tr><td>${s.cw ? `<span class="sw" style="background:${sw[s.cw]}"></span>` : ''}${s.t}</td><td>${s.p}</td></tr>`).join('');
  const other = X.low ? 'The Color file has the same cards and charts in Rainbow, Soft and Navy.' : 'The Low-ink file has the same cards and charts in Simple: white cards, no tinted grounds.';
  return page(`<div class="in" style="gap:.14in">
    <div><span class="kicker">Print guide</span><h1 class="g-title">What to print (and what to skip)</h1>
    <p class="g-lede">You don't need to print everything. Pick one colorway, print the cards for the routines you use, and add one chart.</p></div>
    <div style="display:grid;grid-template-columns:1.55fr 1fr;gap:.25in;align-items:start">
      <table class="toc">${table}</table>
      <div class="g-grid">
        <div class="tile" style="--t:${C.tSky}"><h3>Printer settings</h3><p>Print at <b>100% / Actual size</b>, never "Fit to page", so cards stay 2.2 in (5.6 cm). White cardstock, 65–110 lb (176–300 gsm). Landscape pages turn by themselves in most printers; if not, choose "Auto-rotate".</p></div>
        <div class="tile" style="--t:${C.tGrass}"><h3>Your two files</h3><p>This is the <b>${X.low ? 'Low-ink' : 'Color'} file</b>. ${other} Both come in US Letter and A4.</p></div>
        <div class="tile" style="--t:${C.tPlum}"><h3>What you can type</h3><p>Open this PDF in free <b>Adobe Acrobat Reader</b> (computer or phone). You can type labels on blank, word-free and photo cards, chart titles and names${X.tier === 'starter' ? '' : ', and big-kid jobs, and tick the checklist boxes'}. Colors and pictures can't be changed.${X.store && X.tier === 'full' ? ' Bonus Canva-ready PNGs are on the free bonus page.' : ''}</p></div>
      </div>
    </div>
    ${X.low ? '' : `<div class="tile" style="--t:${C.wash};margin-top:auto"><h3 style="margin-bottom:8px">${X.tier === 'starter' ? 'One card, two looks' : 'One card, four colorways'}</h3>
      <div style="display:flex;gap:.2in;justify-content:${X.tier === 'starter' ? 'flex-start' : 'space-between'}">${COLORWAYS.filter(cw => X.tier !== 'starter' || cw.id === 'rainbow' || cw.id === 'simple').map(cw => `<div style="text-align:center"><div style="width:1.54in;height:1.54in"><div style="transform:scale(.7);transform-origin:top left">${card(byId('play-blocks'), cw.id)}</div></div><div style="font-weight:800;font-size:10.5px;margin-top:4px">${cw.name}</div><div class="note">${cw.id === 'simple' ? 'Low-ink file' : 'Color file'} · ${cw.note}</div></div>`).join('')}</div></div>`}
  </div>`, { note: 'Print guide' });
}
function laminatePage() {
  return page(`<div class="in" style="gap:.13in">
    <div><span class="kicker">Laminate, stick and store</span><h1 class="g-title">Make them last for years</h1></div>
    <div class="g-grid" style="grid-template-columns:1fr 1fr 1fr">
      <div class="tile" style="--t:${C.tSky}"><div class="big" style="--c:${C.sky}">1</div><h3>Print on cardstock</h3><p>White cardstock, 65–110 lb (176–300 gsm), at 100%. Let ink dry a few minutes.</p></div>
      <div class="tile" style="--t:${C.tSun}"><div class="big" style="--c:#B98200">2</div><h3>Laminate the sheet</h3><p>3–5 mil pouches. Laminate the full page, then cut. No laminator? Wide clear packing tape or a page protector works.</p></div>
      <div class="tile" style="--t:${C.tGrass}"><div class="big" style="--c:${C.grass}">3</div><h3>Cut with a sealed edge</h3><p>Leave about 1/8 in (3 mm) of sealed plastic and round the corners so they're soft in little hands.</p></div>
      <div class="tile" style="--t:${C.tTomato}"><div class="big" style="--c:${C.tomato}">4</div><h3>Dots, ages 3+</h3><p><b>Rough (hook)</b> dots on chart slots, <b>soft (loop)</b> dots on card backs. 3/4 in (19 mm) coin dots fit best.</p></div>
      <div class="tile" style="--t:${C.tPlum}"><div class="big" style="--c:${C.plum}">5</div><h3>Under 3: no dots</h3><p>Lay cards on top of the chart, drop finished cards in the All done pocket, or slide the chart into a page protector and tuck cards in.</p></div>
      <div class="tile" style="--t:${C.wash}"><div class="big">6</div><h3>Store and reuse</h3><p>Storage labels go on pouches or envelopes. Laminated blanks and checklists take dry-erase markers.</p></div>
    </div>
    <div class="safety"><h3>Safety for little hands</h3><ul class="tight">
      <li><b>A grown-up stays close and keeps the pieces.</b> Routine cards are a together activity, not a toy to leave in the crib or bed.</li>
      <li>Every card is 2.2 in (5.6 cm) square, bigger than a toilet-paper tube opening, a common rule of thumb for small parts with children under 3. Don't shrink the cards when printing, and don't cut them into smaller pieces.</li>
      <li>Velcro dots, laminating scraps and loose plastic are small parts. <b>Check dots before each play; remove any that lift.</b> Keep spares out of reach, and skip magnets for any child who still puts things in their mouth.</li>
      <li>Hang charts low enough to reach without climbing, and away from blind cords. Every card follows our published safety rules.</li></ul></div>
    <div style="display:flex;gap:.3in;align-items:center">
      <div style="width:2.2in;height:2.2in;border:2px dashed ${C.ink};border-radius:.17in;display:flex;align-items:center;justify-content:center;flex:0 0 auto;position:relative"><div style="width:1.25in;height:1.25in;border-radius:50%;background:${X.low ? '#fff' : C.tTomato};border:2px solid ${X.low ? C.ink : C.tomato};display:flex;align-items:center;justify-content:center;text-align:center;font-size:8.5px;font-weight:800;line-height:1.2;color:${X.low ? C.ink : '#C8431F'}">toilet-paper<br>tube opening<br>≈ 1.25 in</div></div>
      <div><h3 style="font-size:16px;margin-bottom:4px">Size check</h3><p style="font-size:11.2px;line-height:1.45">Measure the dashed square with a ruler after printing. If it's <b>2.2 in (5.6 cm)</b> on each side, you printed at the right size and every card is bigger than a toilet-paper tube opening. If it's smaller, reprint at 100% / Actual size.</p></div>
    </div>
  </div>`, { note: 'Laminate, stick and store · Safety' });
}
function indexPage(list, cardStart) {
  const pos = new Map();
  const young = list.filter(c => !c.cat.startsWith('bk-')), big = list.filter(c => c.cat.startsWith('bk-'));
  young.forEach((c, i) => pos.set(c.id, cardStart + Math.floor(i / 12)));
  const bigStart = cardStart + Math.ceil(young.length / 12);
  big.forEach((c, i) => pos.set(c.id, bigStart + Math.floor(i / 12)));
  const cats = CATS.filter(cat => list.some(c => c.cat === cat.id));
  const blocks = cats.map(cat => `<h4 style="--c:${cat.c}"><i></i><span>${esc(cat.name)}</span><em>${cat.age}</em></h4>` + list.filter(c => c.cat === cat.id).map(c => `<div><span>${esc(c.label)}</span><span>${pos.get(c.id)}</span></div>`).join('')).join('');
  const cw0 = X.low ? 'Simple' : 'Rainbow';
  return page(`<div class="in" style="gap:.1in">
    <div><span class="kicker">Card index</span><h1 class="g-title" style="font-size:26px">All ${list.length} cards, by routine</h1><p class="note">Page numbers are for the ${cw0} cards.${X.low ? '' : ' The Soft and Navy sections use the same order.'} Each colorway also has second copies of the busiest cards, blank cards and, later in the file, word-free and photo-frame cards.</p></div>
    <div class="idx">${blocks}</div></div>`, { note: 'Card index' });
}
function bonusPage() {
  const starter = X.tier === 'starter';
  const next = starter
    ? [['The Complete Set', `All ${N_ALL} cards for ages 0–12, 6 chart layouts, 4 colorways and Monday or Sunday starts.`, C.tomato], ['Play-First Family Kit', 'A play-first checklist, helping jobs, together tokens and a family play plan.', C.sky], ['"I\'m Bored" Play Cards', '150 age-banded play ideas with a talk prompt on every card.', C.grass]]
    : [['Play-First Family Kit', 'A play-first checklist, helping jobs, together tokens and a family play plan.', C.sky], ['"I\'m Bored" Play Cards', '150 age-banded play ideas with a talk prompt on every card.', C.grass], ['Toddler Busy Book', 'Paper-and-play pages for ages 0–5, sorted by age band.', C.plum]];
  const top = X.store
    ? `<div><span class="kicker">Thank you</span><h1 class="g-title">Your free bonus is waiting</h1>
    <p class="g-lede">Scan the code for free seasonal routine cards (holidays, back to school, travel days)${starter ? '' : ', the Canva-ready PNG set'} and short, practical play ideas for your child's age. We only ask for your email and, if you like, your child's birth month and year, never a name.</p></div>
    <div style="display:flex;gap:.3in;align-items:center" class="tile">
      <div style="width:1.75in;height:1.75in;background:#fff;padding:.12in;border-radius:12px;flex:0 0 auto">${QR}</div>
      <div><h3 style="font-size:18px">Scan, or type the short link</h3><p style="font-family:Fredoka,sans-serif;font-weight:600;font-size:17px;margin-top:6px;color:#C8431F">${BONUS}</p><p class="note" style="margin-top:6px">Free companion download. Unsubscribe any time. Need your files again? Your download link stays in your order email; help is at ${SITE}/help.</p></div>
    </div>`
    : `<div><span class="kicker">Thank you</span><h1 class="g-title">More from Play Before Pixels</h1>
    <p class="g-lede">Same calm design and the same "talk while you play" idea. Find them all in our shop, Play Before Pixels.</p></div>
    <div class="tile" style="display:flex;gap:.3in;align-items:center"><div style="flex:0 0 auto">${art('familyGame', 150)}</div><div><h3 style="font-size:18px">Your files stay on your Etsy Purchases page</h3><p style="margin-top:4px">Download them again any time. Open Etsy in a web browser, not the app: You › Purchases and reviews › Download files.</p></div></div>`;
  return page(`<div class="in" style="gap:.2in">
    ${top}
    <div><div class="kicker" style="color:${C.ink};margin-bottom:8px">Next for your family</div>
    <div class="g-grid" style="grid-template-columns:repeat(3,1fr)">${next.map(([h, p, c]) => `<div class="tile" style="--t:${C.wash};border-top:6px solid ${X.low ? C.ink : c}"><h3>${h}</h3><p>${p}</p></div>`).join('')}</div></div>
    <div class="tile" style="--t:${C.tSun};display:flex;gap:.2in;align-items:center">
      <div style="display:flex;gap:.08in;flex:0 0 auto">${['feelings-happy', 'feelings-proud', 'feelings-loved'].map(id => `<div style="width:.99in;height:.99in"><div style="transform:scale(.45);transform-origin:top left">${card(byId(id), gcw())}</div></div>`).join('')}</div>
      <div><h3>Which card did your child reach for first?</h3><p>If you have a minute, an honest review helps other families decide. Tell them which card or chart your child went back to.</p></div>
    </div>
    <div style="margin-top:auto" class="note">
      <p><b style="color:${C.ink}">Terms of use.</b> For personal use in your own home and family. Please don't share, sell or upload the files, or print them for others. You may print as many copies as your family needs.</p>
      <p style="margin-top:6px">These cards are a parenting resource for everyday routines, not a medical or professional service. Questions? ${X.store ? `Use the contact form at ${SITE}.` : 'Send us a message through Etsy.'}</p>
      <p style="margin-top:6px">Illustrations and text created with AI assistance and edited by Play Before Pixels. ${COPY}</p>
    </div>
  </div>`, { note: X.store ? 'Thank you · Free bonus' : 'Thank you' });
}
function starterHowPage() {
  return page(`<div class="in" style="gap:.16in">
    <div><span class="kicker">Grown-up guide · 1 of 2</span><h1 class="g-title">${N_START} cards for the moments that matter most</h1>
    <p class="g-lede">Morning, meals, play, outside, reading, bath, bedtime, helping jobs, feelings, plan words and the <b>Play first / Screens later</b> pair. Screens get their own steady spot in the day, after play; it doesn't grow or shrink with jobs or behavior.</p></div>
    <div class="g-grid" style="grid-template-columns:repeat(3,1fr)">${[['0–2 years', C.tomato, C.tTomato, 'Show one card right before it happens, or two on the first–then board, laid on top: "First shoes, then park."'], ['2–3 years', C.sky, C.tSky, 'A strip of three or four cards for one routine. Your child moves each card to All done.'], ['3–5 years', C.grass, C.tGrass, 'The morning chart, up to nine steps. Let them choose the order of two steps.']].map(([a, c, t, p]) => `<div class="tile" style="--t:${t};border-top:6px solid ${X.low ? C.ink : c}"><span class="chip" style="background:#fff">${a}</span><p style="margin-top:6px">${p}</p></div>`).join('')}</div>
    <div class="g-grid" style="grid-template-columns:1fr 1fr">
      <div class="tile" style="--t:${C.tSun}"><h3>Set up in 2 minutes</h3><p><b>1.</b> Pick one routine you already do.<br><b>2.</b> Print its cards and one chart at 100% (Actual size).<br><b>3.</b> Lay three cards on the chart and start tonight. Laminating can wait.</p></div>
      <div class="tile" style="--t:${C.tGrass}"><h3>What your child is practicing</h3><p>Knowing what comes next, doing a real job in their own day, and words for everyday things and feelings. Nothing to get right.</p></div>
    </div>
    <div class="tile" style="--t:${C.wash}"><h3 style="margin-bottom:8px">Try this tonight: a four-card bedtime</h3>
      <div style="display:flex;align-items:center;justify-content:space-between">${['bath-bath-time', 'bedtime-pajamas', 'bedtime-brush-teeth', 'reading-bedtime-story'].map((id, i) => `${i ? `<svg viewBox="-34 -26 68 52" style="width:.34in"><path d="M-30-8H6V-22L32 0 6 22V8H-30Z" fill="${X.low ? C.ink : C.tomato}"/></svg>` : ''}<div style="width:1.32in;height:1.32in"><div style="transform:scale(.6);transform-origin:top left">${card(byId(id), gcw())}</div></div>`).join('')}</div></div>
    <div class="tile" style="--t:${C.tTomato}"><h3>Want more?</h3><p>The Complete Set has all ${N_ALL} cards, including ${N_BIG} big-kid cards for ages 5–12, 6 chart layouts, 4 colorways and Monday or Sunday starts.</p></div>
  </div>`, { note: 'Grown-up guide' });
}

// ---------------- START HERE (1 page per tier and edition) ----------------
function startHerePage() {
  const starter = X.tier === 'starter';
  const pre = starter ? 'visual-routine-cards-starter' : 'visual-routine-cards';
  const files = X.store
    ? (starter
      ? [['START-HERE-starter.pdf', 'This page'], [`${pre}-letter.pdf`, 'Color, US Letter'], [`${pre}-a4.pdf`, 'Color, A4'], [`${pre}-low-ink-letter.pdf`, 'Low-ink, US Letter: white cards, no tinted grounds'], [`${pre}-low-ink-a4.pdf`, 'Low-ink, A4']]
      : [['START-HERE.pdf', 'This page'], [`${pre}.pdf`, 'Color, US Letter: Rainbow, Soft and Navy'], [`${pre}-a4.pdf`, 'Color, A4'], [`${pre}-low-ink.pdf`, 'Low-ink, US Letter: Simple white cards, no tinted grounds'], [`${pre}-low-ink-a4.pdf`, 'Low-ink, A4']])
    : [['1-START-HERE.pdf', 'This page'], ['2-Color-US-Letter.pdf', starter ? 'Color, US Letter' : 'Color, US Letter: Rainbow, Soft and Navy'], ['3-Color-A4.pdf', 'Color, A4'], ['4-Low-Ink-US-Letter.pdf', 'Low-ink, US Letter: white cards, no tinted grounds'], ['5-Low-Ink-A4.pdf', 'Low-ink, A4']];
  const what = starter
    ? `${N_START} picture cards, second copies of the busiest cards, blank, word-free and photo-frame cards, 3 chart layouts (ready-made and blank) and a short grown-up guide.`
    : `${N_ALL} picture cards, second copies of the busiest cards, blank, word-free and photo-frame cards, 6 chart layouts and big-kid checklists (ready-made and blank, Monday and Sunday starts), storage labels and a grown-up guide.`;
  return page(`<div class="in" style="gap:.16in">
    <div style="display:flex;justify-content:space-between;align-items:center">${lockup('.42in')}<span class="chip age">${starter ? 'Ages 0–5' : 'Ages 0–5 and 5–12'}</span></div>
    <div><span class="kicker">File 1 · Start here</span><h1 class="g-title">${starter ? `${N_START} Visual Routine Cards · Starter Set` : '200+ Visual Routine Cards'}</h1>
    <p class="g-lede">Thank you! Here's what each file holds and how to print and fill it in. ${PREP}.</p></div>
    <div class="tile" style="--t:${C.tSun}"><h3>Your files</h3><table class="sh-files">${files.map(([f, d]) => `<tr><td>${f}</td><td>${d}</td></tr>`).join('')}</table><p class="note" style="margin-top:6px">Pick one file for your paper size. Each file holds ${what}</p></div>
    <div class="g-grid" style="grid-template-columns:1fr 1fr">
      <div class="tile" style="--t:${C.tSky}"><h3>Printing</h3><p>Print at <b>100% / Actual size</b> so cards stay 2.2 in (5.6 cm). Use white cardstock. Print only the pages you need: the Print guide near the front of each file lists every page. Landscape chart pages turn by themselves in most printers.</p></div>
      <div class="tile" style="--t:${C.tGrass}"><h3>Typing your own words</h3><p>Open the PDF in free <b>Adobe Acrobat Reader</b> on a computer or phone and tap a line to type. You can type card labels, chart titles and names${starter ? '' : ', big-kid jobs, and tick checklist boxes'}. Colors and pictures can't be changed. Save, then print, or print blank and write by hand.</p></div>
    </div>
    <div class="tile" style="--t:${C.tTomato}"><h3>Downloading: use a browser, not the app</h3><p>${X.store ? 'Open the download link in your order email in a web browser. On a phone, save each PDF to Files, then open it in Adobe Acrobat Reader.' : 'The Etsy app can\'t download files. Open Etsy in a web browser, go to You › Purchases and reviews, and choose Download files. On a phone, save each PDF to Files, then open it in Adobe Acrobat Reader. Your files stay on your Purchases page to download again any time.'}</p></div>
    ${X.store ? `<div class="tile" style="--t:${C.wash};display:flex;align-items:center;gap:.25in"><div style="width:1.3in;height:1.3in;background:#fff;padding:.08in;border-radius:10px;flex:0 0 auto">${QR}</div><div><h3>Free bonus and re-downloads</h3><p>Scan for free seasonal routine cards${starter ? '' : ' and the Canva-ready PNG set'}: <b>${BONUS}</b>. Lost a file? Your link stays in your order email; help is at <b>${SITE}/help</b>.</p></div></div>` : ''}
    <div class="safety"><h3>Safety in one line</h3><p>A grown-up stays close and keeps the pieces. Print at full size, use no velcro dots with children under 3, and check dots before each play for older children. Every card follows our published safety rules.</p></div>
    <p class="note" style="margin-top:auto">License: personal and family use in your own home. Please don't share or resell the files.</p>
  </div>`, { note: 'Start here' });
}

// ---------------- documents ----------------
function wrapDoc(pages, title) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="author" content="Play Before Pixels (AlphaPlay LLC)">
${css(X.paper)}
</head><body class="${X.low ? 'low' : 'color'}">
${DEFS}
${pages.join('\n')}
</body></html>`;
}

// Two passes: pass 1 counts pages (so the print guide and index can show real page numbers), pass 2 renders with them.
function assemble(marks) {
  PAGENO = 0;
  const starter = X.tier === 'starter';
  const list = starter ? STARTER : CARDS;
  const cws = X.low ? ['simple'] : (starter ? ['rainbow'] : ['rainbow', 'soft', 'navy']);
  const M = marks || {};
  const m = {}; const bm = []; const out = [];
  const mark = (k, title) => { m[k] = PAGENO + 1; if (title) bm.push([title, PAGENO + 1]); };
  const R = (a, b) => (M[a] && M[b] ? (M[b] - 1 > M[a] ? `${M[a]}–${M[b] - 1}` : `${M[a]}`) : '–');
  mark('cover', 'Cover'); out.push(coverPage());
  if (starter) {
    mark('guide', 'Grown-up guide'); out.push(starterHowPage(), talkPage());
  } else {
    mark('guide', 'Grown-up guide'); out.push(welcomePage(), talkPage());
    mark('ages', 'Use them by age'); out.push(agesPage());
  }
  // print guide rows
  const rows = [{ h: 'Guide' }, { t: starter ? 'Grown-up guide, talk tips, print guide, laminating and safety' : 'Grown-up guide, ages, print guide, laminating and safety, card index', p: R('guide', 'cards-' + cws[0]) }, { h: `Cards (${list.length} + second copies + blanks)` }];
  cws.forEach(cw => { rows.push({ t: `${cwName(cw)}: picture cards${starter ? '' : ' (0–5, all ages, 5–12)'}`, p: R('cards-' + cw, 'second-' + cw), cw }, { t: `${cwName(cw)}: second copies + blank cards`, p: R('second-' + cw, 'end-' + cw), cw }); });
  rows.push({ t: `Word-free cards (${cwName(cws[0])}) + photo-frame cards`, p: R('wordfree', 'charts-' + cws[0]), cw: cws[0] }, { h: starter ? 'Charts' : 'Charts and checklists' });
  cws.forEach(cw => { rows.push({ t: `${cwName(cw)}: ${starter ? '3 layouts' : '6 layouts + big-kid checklists'}, ready-made`, p: R('charts-' + cw, 'blank-' + cw), cw }, { t: `${cwName(cw)}: blank + fillable`, p: R('blank-' + cw, 'cend-' + cw), cw }); });
  if (!starter) rows.push({ t: 'Extras: Today markers, All done pocket, storage labels', p: R('extras', 'bonus') });
  rows.push({ t: X.store ? 'Free bonus and what\'s next' : 'What\'s next', p: M.bonus ? `${M.bonus}` : '–' });
  mark('toc', 'Print guide'); out.push(tocPage(rows));
  mark('lam', 'Laminate, stick and store'); out.push(laminatePage());
  if (!starter) { mark('index', 'Card index'); out.push(indexPage(list, M['cards-' + cws[0]] || 0)); }
  cws.forEach(cw => {
    mark('cards-' + cw, `Cards · ${cwName(cw)}`);
    if (starter) out.push(...cardPages(list, cw, { age: 'Ages 0–5' }));
    else { out.push(...cardPages(YOUNG, cw, { age: 'Ages 0–5' })); out.push(...cardPages(BIG, cw, { age: 'Ages 5–12' })); }
    mark('second-' + cw); out.push(secondCopiesPage(cw), blankCardPage(cw));
    m['end-' + cw] = PAGENO + 1;
  });
  mark('wordfree', 'Word-free and photo cards'); out.push(...wordFreePages(list, cws[0]), photoPage(cws[0]));
  cws.forEach(cw => {
    mark('charts-' + cw, `Charts · ${cwName(cw)}`);
    if (starter) { out.push(chartStrip(cw), chartFirstThen(cw), chartRoutine(cw, 'morning')); mark('blank-' + cw, `Blank charts · ${cwName(cw)}`); out.push(chartStrip(cw, { fields: true }), chartRoutine(cw, 'morning', { fields: true })); }
    else { out.push(...prefilledCharts(cw)); mark('blank-' + cw, `Blank charts · ${cwName(cw)}`); out.push(...blankCharts(cw)); }
    m['cend-' + cw] = PAGENO + 1;
  });
  if (!starter) { mark('extras', 'Extras'); out.push(extrasPage(), labelsPage()); }
  mark('bonus', X.store ? 'Free bonus' : 'What\'s next'); out.push(bonusPage());
  return { out, m, bm };
}
function buildDoc(ctx) {
  X = ctx;
  const p1 = assemble(null);
  const p2 = assemble(p1.m);
  if (p2.out.length !== p1.out.length) throw new Error('page count changed between passes');
  const t = X.tier === 'starter' ? `${N_START} Visual Routine Cards Starter Set` : '200+ Visual Routine Cards';
  return { html: wrapDoc(p2.out, `${t} · ${X.low ? 'Low-ink' : 'Color'} · ${PAPER[X.paper].name}`), pages: p2.out.length, bookmarks: p2.bm };
}
function buildStartHere(ctx) {
  X = ctx; PAGENO = 0;
  const t = X.tier === 'starter' ? 'Starter Set' : 'Complete Set';
  return wrapDoc([startHerePage()], `START HERE · Visual Routine Cards ${t}`);
}

// ---------------- write everything ----------------
async function main() {
  const QRC = require('./node_modules/qrcode');
  QR = (await QRC.toString('https://' + BONUS, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: C.ink, light: '#FFFFFF' } })).replace('<svg', '<svg style="width:100%;height:100%;display:block" aria-label="QR code to the free bonus"');
  fs.mkdirSync(OUTDIR, { recursive: true });
  const FONT_OUT = path.relative(OUTDIR, path.join(BRAND, 'fonts/fonts.css'));
  const FONT_ROOT = path.relative(ROOT, path.join(BRAND, 'fonts/fonts.css'));
  const write = (file, html, rootRel) => fs.writeFileSync(file, html.replace('FONTHREF', rootRel ? FONT_ROOT : FONT_OUT));
  const manifest = { cards: N_ALL, young: N_YOUNG, big: N_BIG, starter: N_START, second_copies: SECOND.length, docs: {} };
  for (const tier of ['full', 'starter']) for (const ed of ['store', 'etsy']) for (const ink of ['color', 'low']) for (const paper of ['letter', 'a4']) {
    const ctx = { paper, store: ed === 'store', low: ink === 'low', tier };
    const name = `${tier}-${ed}-${ink}-${paper}`;
    const d = buildDoc(ctx);
    write(path.join(OUTDIR, name + '.html'), d.html);
    manifest.docs[name] = { pages: d.pages, bookmarks: d.bookmarks };
    if (name === 'full-store-color-letter') write(path.join(ROOT, 'source.html'), d.html, true);
  }
  for (const tier of ['full', 'starter']) for (const ed of ['store', 'etsy']) {
    write(path.join(OUTDIR, `start-${tier}-${ed}.html`), buildStartHere({ paper: 'letter', store: ed === 'store', low: false, tier }));
  }
  fs.writeFileSync(path.join(BUILD, 'manifest.json'), JSON.stringify(manifest, null, 1));
  console.log(Object.entries(manifest.docs).map(([k, v]) => `${k}: ${v.pages}`).join('  '));
}
if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });

// for marketing.js (listing images are rendered from the Etsy edition: no URL, no QR)
function setCtx(ctx) { X = Object.assign({ paper: 'letter', store: false, low: false, tier: 'full' }, ctx); PAGENO = 0; }
module.exports = { setCtx, starterHowPage, prefilledCharts, blankCharts, chartStrip, chartHoriz, chartFirstThen, chartRoutine, chartToday, checklist, coverPage, welcomePage, talkPage, agesPage, laminatePage, css, wrapDoc, PAPER, N_ALL, N_YOUNG, N_BIG, N_START, COPY, BONUS, PREP, VERSION, SECOND, LOGO, sized, buildDoc };
