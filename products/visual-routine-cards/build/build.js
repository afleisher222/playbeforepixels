// Visual Routine Cards — page builder.
// node build/build.js  -> writes source.html (Letter, full pack) + build/*.html for every other output.
// FOUNDER-EDIT markers show where the founder should rewrite copy in her own words (human authorship).
const fs = require('fs');
const path = require('path');
const B = require('./base.js');
const { A, CAST } = require('./art.js');
const { CATS, CAT, CARDS } = require('./cards.js');
const { card, CSS: CARD_CSS, DEFS, COLORWAYS, esc } = require('./card.js');
const { C } = B;
const ROOT = path.resolve(__dirname, '..');
const OUT = __dirname;

const PAPER = {
  letter: { id: 'letter', name: 'US Letter', w: 8.5, h: 11, css: '8.5in 11in' },
  a4: { id: 'a4', name: 'A4', w: 8.2677, h: 11.6929, css: '210mm 297mm' },
};
const COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.';
const BONUS = 'playbeforepixels.com/bonus/visual-routine-cards';
const QR = fs.readFileSync(path.join(OUT, 'qr-main.svg'), 'utf8').replace(/width="[^"]+" height="[^"]+"/, 'width="100%" height="100%"').replace('<path ', `<path fill="${C.ink}" `);
const YOUNG = CARDS.filter(c => !c.cat.startsWith('bk-'));
const BIG = CARDS.filter(c => c.cat.startsWith('bk-'));
const N_ALL = CARDS.length, N_YOUNG = YOUNG.length, N_BIG = BIG.length;
const BLANK = { id: 'blank', cat: 'words', art: null, label: '' };

// ---------------- helpers ----------------
const chunk = (arr, n) => { const o = []; for (let i = 0; i < arr.length; i += n) o.push(arr.slice(i, i + n)); return o; };
const art = (key, w = 60) => `<svg class="ico" viewBox="0 0 120 100" style="width:${w}px;height:${w * 100 / 120}px" aria-hidden="true">${A[key]()}</svg>`;
const wordmark = (cls = '') => `<span class="wm ${cls}"><span class="wm-dot"></span>Play Before Pixels</span>`;
let PAGENO = 0;
function page(inner, { cls = '', foot = true, footNote = '', style = '' } = {}) {
  PAGENO++;
  const f = foot ? `<div class="foot"><span>${footNote || 'Print at 100% (Actual size). Cards are 2.2 in / 5.6 cm square.'}</span><span>${COPY} &nbsp;·&nbsp; ${PAGENO}</span></div>` : '';
  return `<section class="page ${cls}" style="${style}">${inner}${f}</section>`;
}
function theme(cw, c, t) {
  const on = c === C.sun ? C.ink : '#fff';
  if (cw === 'rainbow') return `--hc:${c};--ht:${on};--sb:#fff;--sl:${c};--acc:${c};--pn:${t};--num:${c};--numt:${on}`;
  if (cw === 'soft') return `--hc:${t};--ht:${C.ink};--sb:#fff;--sl:${c};--acc:${c};--pn:${t};--num:${c};--numt:${on}`;
  if (cw === 'navy') return `--hc:${C.ink};--ht:#fff;--sb:#fff;--sl:${C.ink};--acc:${c};--pn:${C.wash};--num:${C.ink};--numt:#fff`;
  return `--hc:#fff;--ht:${C.ink};--sb:#fff;--sl:${C.ink};--acc:${C.ink};--pn:#fff;--num:#fff;--numt:${C.ink}`; // simple (ink-saver)
}
const cwName = id => COLORWAYS.find(c => c.id === id).name;

// ---------------- CSS ----------------
function css(paper) {
  const P = PAPER[paper];
  return `<link rel="stylesheet" href="${'FONTHREF'}">
<style>
@page { size: ${P.css}; margin: 0 }
${CARD_CSS}
.page{width:${P.w}in;height:${P.h}in;position:relative;overflow:hidden;break-after:page;page-break-after:always;background:#fff}
.page:last-child{break-after:auto;page-break-after:auto}
.in{position:absolute;left:.5in;right:.5in;top:.5in;bottom:.5in;display:flex;flex-direction:column}
.foot{position:absolute;left:.5in;right:.5in;bottom:.2in;display:flex;justify-content:space-between;gap:12px;font-size:7.4px;line-height:1.2;color:#6B778C;font-weight:600}
.wm{display:inline-flex;align-items:center;gap:6px;font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:12px;letter-spacing:-.01em;color:${C.ink}}
.wm-dot{width:10px;height:10px;border-radius:50%;background:${C.tomato};box-shadow:7px 0 0 ${C.sun},14px 0 0 ${C.sky};margin-right:15px}
h1,h2,h3{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;letter-spacing:-.02em;margin:0;color:${C.ink}}
p{margin:0}
.kicker{font-weight:800;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:${C.tomato}}
/* ---- card pages ---- */
.ph{display:flex;align-items:center;justify-content:space-between;height:.3in;margin-bottom:.12in}
.ph .sec{display:flex;align-items:center;gap:8px;font-weight:800;font-size:11px}
.chip{display:inline-block;font-size:8.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:3px 8px;border-radius:99px;background:${C.wash};color:${C.ink}}
.chip.age{background:${C.ink};color:#fff}
.grid{display:grid;grid-template-columns:repeat(3,2.2in);grid-auto-rows:2.2in;gap:.17in .17in;justify-content:center;align-content:start}
.page.cards .in{justify-content:flex-start}
.cardwrap{position:relative;width:2.2in;height:2.2in}
.cardwrap::after{content:"";position:absolute;inset:-.04in;border:1px dashed #D5DBE5;border-radius:.2in;pointer-events:none}
/* ---- guide pages ---- */
.g-title{font-size:30px;line-height:1.02;margin:6px 0 10px}
.g-lede{font-size:13px;line-height:1.5;max-width:6.2in}
.g-grid{display:grid;gap:12px}
.tile{border-radius:16px;padding:14px 16px;background:var(--t,${C.wash})}
.tile h3{font-size:15px;margin:0 0 4px;letter-spacing:-.01em}
.tile p{font-size:11.2px;line-height:1.45}
.big{font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600;font-size:34px;line-height:1;color:var(--c,${C.ink})}
.note{font-size:10px;line-height:1.45;color:#4A566D}
.safety{border-radius:14px;padding:12px 14px;border:2px solid ${C.tomato};background:#fff}
.safety h3{font-size:13px;color:${C.tomato};margin-bottom:3px}
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
.slot{width:2.3in;height:2.3in;border-radius:.2in;border:2px dashed var(--sl);background:var(--sb);position:relative;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.slot .dot{width:.62in;height:.62in;border-radius:50%;background:var(--pn);display:flex;align-items:center;justify-content:center;text-align:center;font-size:7px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#8C97AB;line-height:1.15}
.cw-simple-page .slot .dot{border:1px solid #C9D2E0}
.vstrip .slot{width:2.28in;height:2.28in}
.slot .n{position:absolute;left:-.1in;top:-.1in;width:.36in;height:.36in;border-radius:50%;background:var(--num);color:var(--numt);font-family:"Fredoka",sans-serif;font-weight:600;font-size:15px;display:flex;align-items:center;justify-content:center}
.cw-simple-page .slot .n{border:2px solid ${C.ink}}
.tipbar{width:100%;display:flex;align-items:center;gap:10px;border-radius:14px;background:var(--pn);padding:8px 14px;font-size:10.5px;line-height:1.4}
.cw-simple-page .tipbar{border:1.5px solid ${C.ink}}
.tipbar b{font-weight:800}
.tipbar .lab{flex:0 0 auto;font-weight:800;font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:${C.ink};opacity:.7}
.rot{position:absolute;left:.5in;top:.5in;width:${(P.h - 1).toFixed(4)}in;height:${(P.w - 1).toFixed(4)}in;transform-origin:0 0;transform:translateX(${(P.w - 1).toFixed(4)}in) rotate(90deg);display:flex;flex-direction:column;align-items:center}
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
/* cover */
.cover .in{justify-content:space-between}
.cv-panel{flex:1;border-radius:26px;background:${C.tSun};position:relative;overflow:hidden;padding:.45in .45in .35in;display:flex;flex-direction:column}
.cv-title{font-size:58px;line-height:.92;letter-spacing:-.035em}
.cv-title .num{color:${C.tomato}}
.cv-sub{font-size:16px;font-weight:800;margin-top:12px;max-width:4.6in;line-height:1.3}
.cv-fan{position:relative;flex:1;margin-top:.1in}
.cv-fan .card{position:absolute;box-shadow:0 10px 24px rgba(29,41,64,.14)}
.cv-meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.cv-meta span{background:#fff;border-radius:99px;padding:5px 11px;font-size:10.5px;font-weight:800}
/* index */
.idx{column-count:4;column-gap:.22in;font-size:8.7px;line-height:1.34}
.idx h4{font-family:"Nunito Sans",sans-serif;font-size:8.2px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin:8px 0 3px;break-after:avoid;display:flex;align-items:center;gap:6px}
.idx h4 i{width:10px;height:10px;border-radius:3px;background:var(--c);display:inline-block}
.idx div{display:flex;justify-content:space-between;gap:6px}
.idx div span:last-child{color:#8C97AB;font-weight:700}
/* toc table */
.toc{width:100%;border-collapse:collapse;font-size:10.5px}
.toc td{padding:5px 6px;border-bottom:1px solid #E3E8F0;vertical-align:top}
.toc td:last-child{text-align:right;font-weight:800;white-space:nowrap}
.toc tr.h td{font-weight:800;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#6B778C;border-bottom:2px solid ${C.ink}}
.sw{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;vertical-align:-1px;box-shadow:inset 0 0 0 1px rgba(29,41,64,.25)}
/* field boxes (editable pdf) */
[data-field]{position:relative}
.fieldbox{border-bottom:1.5px solid #9AA6BA}
</style>`;
}

// ---------------- card pages ----------------
function cardPages(list, cw, { age, title }) {
  const pages = [];
  const perPage = 12;
  const groups = chunk(list, perPage);
  groups.forEach((g, gi) => {
    const cats = [...new Set(g.filter(c => c.art).map(c => c.cat))].map(id => CAT[id].name);
    const cells = g.map(c => `<div class="cardwrap">${c.art ? card(c, cw) : card({ id: 'blank', cat: g[0].cat, art: null, label: '' }, cw, { blankArt: true, blankLabel: true })}</div>`);
    // fill the rest of the last page with blank cards (no wasted paper)
    const fillCat = g[g.length - 1].cat;
    for (let i = g.length; i < perPage; i++) cells.push(`<div class="cardwrap">${card({ id: 'blank', cat: fillCat, art: null, label: '' }, cw, { blankArt: true, blankLabel: true })}</div>`);
    const secLabel = cats.length ? cats.join(' · ') : 'Blank cards';
    pages.push(page(`<div class="in"><div class="ph"><span class="sec"><span class="chip age">${age}</span>${esc(secLabel)}</span><span class="sec"><span class="chip">${cwName(cw)}</span>${wordmark()}</span></div><div class="grid">${cells.join('')}</div></div>`, { cls: 'cards' }));
  });
  return pages;
}
function blankCardPage(cw, catId = 'words', fieldPrefix = null) {
  const cells = [];
  for (let i = 0; i < 12; i++) {
    const cid = [catId, 'morning', 'play', 'outside'][Math.floor(i / 3)] || catId;
    const cd = { id: 'blank', cat: cw === 'rainbow' ? ['morning', 'meals', 'play', 'reading'][Math.floor(i / 3)] : catId, art: null, label: '' };
    cells.push(`<div class="cardwrap">${card(cd, cw, { blankArt: true, blankLabel: true, field: fieldPrefix ? `${fieldPrefix}_${i + 1}` : null })}</div>`);
  }
  return page(`<div class="in"><div class="ph"><span class="sec"><span class="chip age">All ages</span>Blank cards: draw, write or glue a photo</span><span class="sec"><span class="chip">${cwName(cw)}</span>${wordmark()}</span></div><div class="grid">${cells.join('')}</div></div>`, { cls: 'cards' });
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
const slot = (n, lbl = 'velcro<br>dot here') => `<div class="slot">${n ? `<span class="n">${n}</span>` : ''}<span class="dot">${lbl}</span></div>`;
const nameLine = (field) => `<span class="name">Name <i${field ? ` data-field="${field}" data-fsize="12"` : ''}></i></span>`;

function chartStrip(cw, o = {}) { // Layout 1: vertical strips — To do / All done
  const col = (title, sub, c, t, isDone) => `<div class="vstrip" style="${theme(cw, c, t)};width:2.95in;display:flex;flex-direction:column;align-items:center;gap:.06in">
    <div class="band" style="height:.55in;justify-content:center;padding:0 10px"><div style="text-align:center"><h2 style="font-size:22px"${o.fields ? ` data-field="strip_title_${isDone ? 2 : 1}" data-fsize="18"` : ''}>${o.fields ? '' : title}</h2></div></div>
    ${[1, 2, 3, 4].map(n => slot(isDone ? null : n, isDone ? 'done<br>goes here' : 'velcro<br>dot here')).join('')}
  </div>`;
  return page(`<div class="in" style="flex-direction:row;justify-content:center;gap:.35in;align-items:flex-start">
    ${col('My steps', '', C.sky, C.tSky, false)}${col('All done!', '', C.grass, C.tGrass, true)}</div>`, { cls: `chart cw-${cw}-page`, footNote: 'Layout 1 · Vertical strips: move each card from "My steps" to "All done!" · Cut apart or keep together' });
}
function chartHoriz(cw, o = {}) { // Layout 2: horizontal strips (landscape)
  const strip = (labels, c, t, fid) => `<div style="${theme(cw, c, t)};width:100%;display:flex;flex-direction:column;gap:.1in;align-items:center">
    <div style="display:flex;gap:.18in">${labels.map((l, i) => `<div style="display:flex;flex-direction:column;align-items:center;gap:.06in"><span class="band" style="height:.36in;width:2.3in;justify-content:center;padding:0;border-radius:10px"><b style="font-family:Fredoka,sans-serif;font-weight:600;font-size:16px"${o.fields ? ` data-field="${fid}_${i + 1}" data-fsize="13"` : ''}>${o.fields ? '' : l}</b></span>${slot(null)}</div>`).join('')}</div></div>`;
  return page(`<div class="rot" style="gap:.22in;justify-content:center">
    ${strip(['First', 'Next', 'Then', 'Last'], C.sky, C.tSky, 'hs1')}
    <div style="width:100%;border-top:2px dashed #D5DBE5"></div>
    ${strip(['Now', 'Next', 'Later', 'All done'], C.plum, C.tPlum, 'hs2')}
  </div>`, { cls: `chart cw-${cw}-page`, footNote: 'Layout 2 · Horizontal strips: turn the page sideways · Cut on the dashed line for two strips' });
}
function chartFirstThen(cw, o = {}) { // Layout 3: first-then board (landscape)
  const P2 = (lbl, c, t, n) => `<div style="${theme(cw, c, t)};flex:1;height:100%;border-radius:22px;background:var(--pn);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.18in;${cw === 'simple' ? `border:2px solid ${C.ink}` : ''}">
    <div class="band" style="height:.72in;width:auto;padding:0 .35in;border-radius:99px"><h2 style="font-size:34px;font-family:Fredoka,sans-serif;font-weight:600;letter-spacing:0">${lbl}</h2></div>${slot(null)}</div>`;
  const arrow = `<svg viewBox="-34 -26 68 52" style="width:.8in;flex:0 0 auto" aria-hidden="true"><path d="M-30-8H6V-22L32 0 6 22V8H-30Z" fill="${cw === 'simple' ? C.ink : C.tomato}" stroke="${cw === 'simple' ? C.ink : C.tomato}" stroke-width="6" stroke-linejoin="round"/></svg>`;
  return page(`<div class="rot" style="gap:.2in">
    <div style="display:flex;gap:.2in;align-items:center;width:100%;height:5.6in">${P2('First', C.tomato, C.tTomato)}${arrow}${P2('Then', C.grass, C.tGrass)}</div>
    <div style="${theme(cw, C.sun, C.tSun)};width:100%">${tipbar('ft')}</div>
  </div>`, { cls: `chart cw-${cw}-page`, footNote: 'Layout 3 · First–then board: turn the page sideways · Try "Play first" then "Screens later"' });
}
function chartRoutine(cw, kind, o = {}) { // Layouts 4 + 5: morning and bedtime charts
  const m = kind === 'morning';
  const c = m ? C.sun : C.plum, t = m ? C.tSun : C.tPlum;
  const bandStyle = m ? '' : (cw === 'rainbow' ? `--hc:${C.ink};--ht:#fff` : '');
  const deco = m ? `<svg viewBox="0 0 120 100" style="width:1.05in;height:.9in;flex:0 0 auto">${A.openCurtains()}</svg>` : `<svg viewBox="0 0 120 100" style="width:1.05in;height:.9in;flex:0 0 auto">${A.sleep()}</svg>`;
  return page(`<div class="in" style="${theme(cw, c, t)};gap:.16in">
    <div class="band" style="height:1.15in;${bandStyle}">${deco}<div><h2${o.fields ? ` data-field="${kind}_title" data-fsize="22"` : ''}>${o.fields ? '' : (m ? 'Good morning!' : 'Good night!')}</h2><div class="sub">${m ? 'My morning, one picture at a time' : 'My bedtime, one picture at a time'}</div></div>${nameLine(o.fields ? `${kind}_name` : null)}</div>
    <div style="display:grid;grid-template-columns:repeat(3,2.3in);gap:.15in .15in">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => slot(n)).join('')}</div>
    <div style="display:flex;gap:.15in;width:100%;align-items:stretch">
      <div class="tipbar" style="flex:1"><span class="lab">All done</span><span>When every card is done, we: <span class="hand" style="font-size:17px;display:inline-block;min-width:1.4in;border-bottom:1.5px solid #9AA6BA"${o.fields ? ` data-field="${kind}_reward" data-fsize="12"` : ''}>${o.fields ? '' : (m ? 'play blocks!' : 'read one more book')}</span></span></div>
    </div>
    ${tipbar(m ? 'morning' : 'bedtime')}
  </div>`, { cls: `chart cw-${cw}-page`, footNote: `Layout ${m ? 4 : 5} · ${m ? 'Morning' : 'Bedtime'} chart: 9 steps · Use only as many steps as your child needs` });
}
function chartToday(cw, start, o = {}) { // Layout 6: today board, Monday or Sunday start
  const days = start === 'mon' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const cols = [['Morning', C.sun, C.tSun], ['Afternoon', C.sky, C.tSky], ['Evening', C.plum, C.tPlum]];
  return page(`<div class="in" style="${theme(cw, C.grass, C.tGrass)};gap:.11in">
    <div class="band" style="height:.8in"><svg viewBox="0 0 120 100" style="width:.8in;height:.67in;flex:0 0 auto">${A.wToday()}</svg><div><h2${o.fields ? ` data-field="today_title_${start}" data-fsize="22"` : ''}>${o.fields ? '' : 'Today is…'}</h2><div class="sub">Clip or stick the marker on today</div></div>${nameLine(o.fields ? `today_name_${start}` : null)}</div>
    <div style="display:flex;gap:.07in;width:100%">${days.map((d, i) => `<div style="flex:1;height:.55in;border-radius:12px;background:${cw === 'simple' ? '#fff' : (i === (start === 'mon' ? 5 : 0) || i === (start === 'mon' ? 6 : 6) ? 'var(--pn)' : C.wash)};border:${cw === 'simple' ? `1.5px solid ${C.ink}` : '0'};display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Fredoka,sans-serif;font-weight:600;font-size:16px">${d}<span style="width:.16in;height:.16in;border-radius:50%;border:1.5px dashed #9AA6BA;margin-top:3px"></span></div>`).join('')}</div>
    <div style="display:flex;gap:.15in">${cols.map(([l, c, t]) => `<div style="${theme(cw, c, t)};display:flex;flex-direction:column;align-items:center;gap:.08in"><div class="band" style="height:.4in;justify-content:center;padding:0;border-radius:10px"><b style="font-family:Fredoka,sans-serif;font-weight:600;font-size:16px">${l}</b></div>${slot(null)}${slot(null)}</div>`).join('')}</div>
    <div style="${theme(cw, C.tomato, C.tTomato)};display:flex;gap:.15in;width:100%;align-items:stretch">
      ${slot(null, 'something<br>special')}
      <div style="flex:1;border-radius:18px;background:var(--pn);${cw === 'simple' ? `border:1.5px solid ${C.ink};` : ''}padding:.12in .18in;display:flex;flex-direction:column;gap:.08in">
        <b style="font-size:10px;letter-spacing:.14em;text-transform:uppercase">Weather today · circle one</b>
        <div style="display:flex;justify-content:space-between">${[['Sunny', A.fsun()], ['Cloudy', A.fcloud()], ['Rainy', A.frain()], ['Snowy', A.fsnow()]].map(([l, a]) => `<div style="text-align:center"><div style="width:.9in;height:.9in;border-radius:50%;background:#fff;${cw === 'simple' ? `border:1.5px solid ${C.ink};` : ''}display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 120 100" style="width:.76in;height:.64in">${a}</svg></div><div style="font-family:Fredoka,sans-serif;font-weight:600;font-size:13px;margin-top:2px">${l}</div></div>`).join('')}</div>
        <div style="font-size:10.5px;display:flex;gap:6px;align-items:flex-end;margin-top:auto"><b>Who I'll see today:</b><span style="flex:1;border-bottom:1.5px solid #9AA6BA;height:16px"></span></div>
      </div>
    </div>
    ${tipbar('today')}
  </div>`, { cls: `chart cw-${cw}-page`, footNote: `Layout 6 · Today board, ${start === 'mon' ? 'Monday' : 'Sunday'} start · Use the "Today" marker from the extras page` });
}
const CL_TASKS = {
  morning: [['alarm', 'Wake up on time'], ['makeBedBig', 'Make my bed'], ['dressedBig', 'Get dressed'], ['breakfastBig', 'Eat breakfast'], ['floss', 'Brush & floss'], ['hair', 'Do my hair'], ['waterBottle', 'Fill water bottle'], ['backpackDoor', 'Backpack by the door']],
  evening: [['unpackBag', 'Unpack my bag'], ['homework', 'Homework'], ['reading20', 'Read 20 minutes'], ['outsideTime', 'Outside time'], ['helpDinner', 'Help make dinner'], ['shower', 'Shower'], ['layOut', "Lay out clothes"], ['devicesSleep', 'Devices sleep outside']],
};
function checklist(cw, kind, start, o = {}) { // 5-12 weekly checklists (pre-filled or blank)
  const m = kind === 'morning';
  const days = start === 'mon' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const c = m ? C.sun : C.sky, t = m ? C.tSun : C.tSky;
  const rows = CL_TASKS[kind].map(([a, l], i) => {
    const task = o.blank ? `<span class="ico" style="width:.5in;height:.42in;display:inline-block"></span><span class="blankline"${o.fields ? ` data-field="cl_${kind}_${start}_task${i + 1}" data-fsize="12"` : ''}></span>` : `${art(a, 56)}<span>${esc(l)}</span>`;
    return `<tr><td><div class="task">${task}</div></td>${days.map((d, j) => `<td class="dayc"><div class="check"${o.fields ? ` data-field="cl_${kind}_${start}_r${i + 1}_d${j + 1}" data-ftype="check"` : ''}></div></td>`).join('')}</tr>`;
  }).join('');
  return page(`<div class="in" style="${theme(cw, c, t)};gap:.12in">
    <div class="band" style="height:.95in"><svg viewBox="0 0 120 100" style="width:.95in;height:.8in;flex:0 0 auto">${m ? A.alarm() : A.readInBed()}</svg><div><h2 style="font-size:26px"${o.fields ? ` data-field="cl_${kind}_${start}_title" data-fsize="18"` : ''}>${o.fields ? '' : (m ? 'My morning checklist' : 'After school & evening')}</h2><div class="sub">Ages 5–12 · Week of <span style="display:inline-block;width:1.1in;border-bottom:1.5px solid currentColor;opacity:.7;vertical-align:-2px"${o.fields ? ` data-field="cl_${kind}_${start}_week" data-fsize="10"` : ''}></span></div></div>${nameLine(o.fields ? `cl_${kind}_${start}_name` : null)}</div>
    <table class="cl"><tr><th style="text-align:left;padding-left:8px">${o.blank ? 'My jobs (write your own)' : 'My jobs'}</th>${days.map(d => `<th>${d}</th>`).join('')}</tr>${rows}</table>
    <div class="tipbar"><span class="lab">Then</span><span><b>Jobs and play first, screens later.</b> When my list is done, I choose: <span class="hand" style="font-size:16px;display:inline-block;min-width:1.5in;border-bottom:1.5px solid #9AA6BA"${o.fields ? ` data-field="cl_${kind}_${start}_choice" data-fsize="11"` : ''}>${o.fields || o.blank ? '' : 'bike ride, then a show'}</span></span></div>
  </div>`, { cls: `chart cw-${cw}-page`, footNote: `Big-kid ${m ? 'morning' : 'evening'} checklist · ${start === 'mon' ? 'Monday' : 'Sunday'} start · ${o.blank ? 'Blank' : 'Pre-filled'} · Laminate and use a dry-erase marker` });
}
function chartsFor(cw, o = {}) {
  return [chartStrip(cw, o), chartHoriz(cw, o), chartFirstThen(cw, o), chartRoutine(cw, 'morning', o), chartRoutine(cw, 'bedtime', o), chartToday(cw, 'mon', o), chartToday(cw, 'sun', o)];
}
function checklistsFor(cw, o = {}) {
  return [checklist(cw, 'morning', 'mon', o), checklist(cw, 'morning', 'sun', o), checklist(cw, 'evening', 'mon', o), checklist(cw, 'evening', 'sun', o)];
}

// ---------------- extras page ----------------
function extrasPage() {
  const marker = (lbl, c) => `<div class="card cw-rainbow" style="--c:${c};--t:${C.wash};--on:#fff;width:2.2in;height:2.2in"><svg class="art" viewBox="0 0 120 100"><circle class="disc" cx="60" cy="52" r="44"/>${A.wToday()}</svg><div class="lab" style="font-size:18px">${lbl}</div></div>`;
  const labels = CATS.map(c => `<div style="height:.62in;border-radius:10px;background:${c.t};border-left:8px solid ${c.c};display:flex;align-items:center;padding:0 10px;font-family:Fredoka,sans-serif;font-weight:600;font-size:13px;line-height:1.05">${esc(c.name)}<span style="margin-left:auto;font-family:'Nunito Sans';font-size:8px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;opacity:.6">${c.age}</span></div>`).join('');
  return page(`<div class="in" style="gap:.16in">
    <div><span class="kicker">Extras</span><h2 style="font-size:24px;margin-top:2px">Markers, pocket and storage labels</h2></div>
    <div style="display:flex;gap:.25in;align-items:flex-start">
      <div class="cardwrap">${marker('Today', C.tomato)}</div><div class="cardwrap">${marker('Today', C.grass)}</div>
      <div style="flex:1" class="note"><b style="color:${C.ink}">Today markers.</b> Cut out, laminate and stick a velcro dot on the back. Move it along the day chips on the Today board.<br><br><b style="color:${C.ink}">All done pocket.</b> Cut on the dashed line. Fold the three glue flaps back along the gray lines and glue them to the chart or the wall, leaving the top open. Finished cards drop inside.</div>
    </div>
    <div class="pocket" style="height:3.1in;display:flex;align-items:stretch;border-bottom:none;border-radius:6px 6px 0 0">
      <div style="width:.5in;border-right:1.5px solid #D5DBE5;background:${C.wash};display:flex;align-items:center;justify-content:center;font-size:7.5px;font-weight:800;letter-spacing:.1em;writing-mode:vertical-rl;color:#8C97AB">GLUE FLAP</div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;background:${C.tGrass}">
        <svg viewBox="-30 -30 60 60" style="width:.9in;height:.9in">${`<circle r="26" fill="${C.grass}"/><path d="M-12 0L-3 9 13-9" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`}</svg>
        <div style="font-family:Fredoka,sans-serif;font-weight:600;font-size:34px;margin-top:6px">All done!</div></div>
      <div style="width:.5in;border-left:1.5px solid #D5DBE5;background:${C.wash};display:flex;align-items:center;justify-content:center;font-size:7.5px;font-weight:800;letter-spacing:.1em;writing-mode:vertical-rl;color:#8C97AB">GLUE FLAP</div>
    </div>
    <div style="margin:-.16in .5in 0;height:.45in;border:2px dashed #9AA6BA;border-top:1.5px solid #D5DBE5;border-radius:0 0 6px 6px;background:${C.wash};display:flex;align-items:center;justify-content:center;font-size:7.5px;font-weight:800;letter-spacing:.1em;color:#8C97AB">GLUE FLAP</div>
    <div><div class="kicker" style="color:${C.ink};margin-bottom:6px">Storage labels · for pouches, envelopes or a card box</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.08in">${labels}</div></div>
  </div>`, { footNote: 'Extras · Keep loose laminated pieces and velcro dots away from children who still mouth things' });
}

// ---------------- guide pages ----------------
function fan(list, positions) {
  return list.map((cd, i) => { const [x, y, r, s] = positions[i]; return `<div style="position:absolute;left:${x}in;top:${y}in;transform:rotate(${r}deg) scale(${s});transform-origin:center">${card(CARDS.find(c => c.id === cd), 'rainbow')}</div>`; }).join('');
}
function coverPage(tier) {
  const starter = tier === 'starter';
  const pos = [[0.05, .45, -8, .95], [2.1, .1, -2, 1.02], [4.15, .45, 7, .95], [1.1, 3.0, 5, .95], [3.2, 3.05, -5, .95]];
  const ids = ['morning-brush-teeth', 'play-blocks', 'bedtime-sleep', 'screens-play-first', 'screens-screens-later'];
  return page(`<div class="in"><div class="cv-panel">
    <div style="display:flex;justify-content:space-between;align-items:center">${wordmark()}<span class="chip age" style="font-size:9.5px;padding:5px 11px">${starter ? 'Ages 0–5' : 'Ages 0–5 and 5–12'}</span></div>
    <h1 class="cv-title" style="margin-top:.3in">${starter ? '<span class="num">60</span> Visual<br>Routine Cards' : '<span class="num">200+</span> Visual<br>Routine Cards'}</h1>
    <p class="cv-sub">Helps little ones see what comes next. Morning, meals, play, outside, reading, bath, bedtime, helping jobs and feelings.</p>
    <div class="cv-meta">${(starter ? ['60 picture cards', '3 charts', 'Play first / screens later', 'US Letter + A4'] : [`${N_ALL} picture cards`, '6 chart layouts', '4 colorways', 'Editable blanks', 'US Letter + A4']).map(s => `<span>${s}</span>`).join('')}</div>
    <div class="cv-fan">${fan(ids, pos)}</div>
  </div></div>`, { cls: 'cover', footNote: starter ? 'Starter Set · Printable PDF' : 'Complete Set · Printable PDF' });
}
function welcomePage() {
  // FOUNDER-EDIT: rewrite this welcome in your own words (human-authorship requirement, brand/BRAND.md).
  const tiles = [
    [`${N_ALL}`, 'picture cards', `${N_YOUNG} for ages 0–5 (feelings and plan words work at any age) and ${N_BIG} big-kid cards for ages 5–12.`, C.tomato, C.tTomato],
    ['6', 'chart layouts', 'Vertical strips, horizontal strips, a first–then board, morning and bedtime charts and a Today board.', C.sky, C.tSky],
    ['4', 'colorways', 'Rainbow (color-coded by routine), Soft, Navy and Simple, an ink-saving white version.', C.grass, C.tGrass],
    ['2', 'paper sizes', 'US Letter and A4 files. Cards stay 2.2 in (5.6 cm) on both, so every card fits every chart.', C.plum, C.tPlum],
    ['+', 'make it yours', 'Blank cards, a separate editable PDF you can type into, and Canva-ready PNGs of every card.', C.sun, C.tSun],
    ['16', 'routine groups', 'Morning to bedtime, feelings check-ins, plan words and four big-kid groups. Today board and checklists come in Monday and Sunday starts.', C.ink, C.wash],
  ];
  return page(`<div class="in" style="gap:.18in">
    <div><span class="kicker">Welcome</span><h1 class="g-title">Pictures make the plan easy to see</h1>
    <p class="g-lede">Little ones live in the now. A short row of pictures shows them what is happening, what comes next and when it's done. They can point to it, carry it and move it themselves. Bigger kids can run their own mornings with a checklist they helped write. Use as few or as many cards as your family needs.</p></div>
    <div class="g-grid" style="grid-template-columns:repeat(3,1fr)">${tiles.map(([n, h, p, c, t]) => `<div class="tile" style="--c:${c};--t:${t}"><div class="big">${n}</div><h3 style="margin-top:4px">${h}</h3><p>${p}</p></div>`).join('')}</div>
    <div class="tile" style="--t:${C.wash};display:flex;gap:16px;align-items:center">
      <div style="display:flex;gap:8px;flex:0 0 auto">${['screens-play-first', 'screens-screens-later'].map(id => `<div style="transform:scale(.55);transform-origin:top left;width:1.21in;height:1.21in">${card(CARDS.find(c => c.id === id), 'rainbow')}</div>`).join('')}</div>
      <div><h3>Play first, screens later</h3><p>Two cards for the moment everyone knows. Put <b>Play first</b> before <b>Screens later</b> and the order speaks for itself. The tablet is a plain, generic picture: no brands, no apps. For guidance, the World Health Organization (2019) suggests no screen time for babies under 1 and no more than 1 hour a day for ages 2–4.</p></div>
    </div>
    <div class="g-grid" style="grid-template-columns:1fr 1fr">
      <div class="tile" style="--t:${C.tSun}"><h3>Start in three steps</h3><p><b>1. Print</b> the colorway you like on cardstock at 100% (Actual size).<br><b>2. Protect</b> with a laminator or clear tape, then cut.<br><b>3. Pick three cards</b> for one routine you already do, and start there.</p></div>
      <div class="tile" style="--t:${C.tGrass}"><h3>Why pictures</h3><p>Routines are easier when they're predictable. A picture holds the plan before your child can read, stays put when words are forgotten, and moving it to <b>All done</b> gives your child a real job in their own day.</p></div>
    </div>
  </div>`, { footNote: 'Welcome' });
}
function agesPage() {
  const stages = [
    ['0–12 months', C.tomato, C.tTomato, 'One card, one moment', 'Show a single card right before it happens and say the word: "Bath!" Hold it where your baby can look and reach, then do the thing together.'],
    ['1–2 years', C.sun, C.tSun, 'First, then', 'Two cards on the first–then board. "First shoes, then park." Let your toddler carry the "then" card to the door.'],
    ['2–3 years', C.sky, C.tSky, 'A strip of three or four', 'Pick one routine and use the vertical strip. Your child moves each card to All done. Keep the same order every day.'],
    ['3–5 years', C.grass, C.tGrass, 'Morning and bedtime charts', 'Up to nine steps. Let them choose the order of two steps, and add a feelings card: "How are you feeling this morning?"'],
    ['5–8 years', C.plum, C.tPlum, 'Big-kid cards and checklists', 'Switch to the 5–12 cards or the weekly checklist. They tick, you notice. Swap in a card when something new is happening.'],
    ['8–12 years', C.ink, C.wash, 'They write the plan', 'Blank cards and the editable checklist let them set their own routine. Agree together: jobs and play first, screens later.'],
  ];
  return page(`<div class="in" style="gap:.16in">
    <div><span class="kicker">Use them by age</span><h1 class="g-title">Start small, grow the plan with your child</h1>
    <p class="g-lede">Every child is different, so treat these as starting points. If a step feels like too much, drop back to fewer cards. If it feels too easy, hand over more of the plan.</p></div>
    <div class="g-grid" style="grid-template-columns:1fr 1fr">${stages.map(([a, c, t, h, p]) => `<div class="tile" style="--t:${t};border-top:6px solid ${c};border-radius:16px"><span class="chip" style="background:#fff">${a}</span><h3 style="margin-top:7px">${h}</h3><p>${p}</p></div>`).join('')}</div>
    <div class="g-grid" style="grid-template-columns:repeat(3,1fr)">
      ${[['Change of plan', 'words-change-of-plan', 'Slip this card in when the day changes. It shows something new is coming, before it arrives.'], ['Wait', 'words-wait', 'For the in-between moments: the kettle, the line at the store, a sibling\'s turn.'], ['Feelings check-in', 'feelings-calm', 'Offer two or three feelings cards and let your child point. Then pick a calm-down card together.']].map(([h, id, p]) => `<div class="tile" style="display:flex;gap:10px;align-items:center;--t:${C.wash}"><div style="flex:0 0 auto;width:1.1in;height:1.1in"><div style="transform:scale(.5);transform-origin:top left">${card(CARDS.find(c => c.id === id), 'rainbow')}</div></div><div><h3>${h}</h3><p>${p}</p></div></div>`).join('')}
    </div>
  </div>`, { footNote: 'Use them by age' });
}
function talkPage() {
  const tips = [
    ['Say what you see', '"Shoes on! Blue shoes." Name the card as your child touches it.', 'morning-shoes-on'],
    ['Pause and wait', '"First teeth, then…" and wait a few seconds. A point, a look or a sound is an answer.', 'morning-brush-teeth'],
    ['Offer a choice', 'Hold up two play cards: "Blocks or puzzle?" Let them pick and stick it on.', 'play-puzzle'],
    ['Repeat and add one word', 'Your child says "bath." You say "warm bath." One word more than they said.', 'bath-bath-time'],
    ['Follow their lead', 'If they grab the dog card, talk about the dog. The plan can wait ten seconds.', 'helping-feed-the-pet'],
    ['Sing and gesture', 'Make up a tidy-up tune or a wave for "all done." Same song, same moment, every day.', 'play-sing-a-song'],
  ];
  return page(`<div class="in" style="gap:.16in">
    <div><span class="kicker">Talk while you use them</span><h1 class="g-title">The cards are the start of a conversation</h1>
    <p class="g-lede">A routine card is something to talk about together, not a replacement for talking. Try one of these six easy ideas each time you move a card. There's nothing to get right.</p></div>
    <div class="g-grid" style="grid-template-columns:1fr 1fr">${tips.map(([h, p, id]) => `<div class="tile" style="display:flex;gap:12px;align-items:center;--t:${C.wash}"><div style="flex:0 0 auto;width:1.1in;height:1.1in"><div style="transform:scale(.5);transform-origin:top left">${card(CARDS.find(c => c.id === id), 'rainbow')}</div></div><div><h3>${h}</h3><p>${p}</p></div></div>`).join('')}</div>
    <div class="tile" style="--t:${C.tSun}"><h3>Make a routine together</h3><p>Lay out the cards for a routine and ask your child to help put them in order. Bigger kids can write their own words on blank cards or type into the editable PDF. Family words, home languages and pet names all belong on these cards.</p></div>
  </div>`, { footNote: 'Talk while you use them' });
}
function tocPage(sections) {
  const rows = sections.map(s => s.h ? `<tr class="h"><td>${s.h}</td><td>Pages</td></tr>` : `<tr><td>${s.sw ? `<span class="sw" style="background:${s.sw}"></span>` : ''}${s.t}</td><td>${s.p}</td></tr>`).join('');
  return page(`<div class="in" style="gap:.14in">
    <div><span class="kicker">Print guide</span><h1 class="g-title">What to print (and what to skip)</h1>
    <p class="g-lede">You don't need to print everything. Pick one colorway, print the cards for the routines you use, and add one chart.</p></div>
    <div style="display:grid;grid-template-columns:1.55fr 1fr;gap:.25in;align-items:start">
      <table class="toc">${rows}</table>
      <div class="g-grid">
        <div class="tile" style="--t:${C.tSky}"><h3>Printer settings</h3><p>Print at <b>100% / Actual size</b>, never "Fit to page", so cards stay 2.2 in (5.6 cm). Use white cardstock, 65–110 lb (176–300 gsm). Choose "Best" quality for the color pages.</p></div>
        <div class="tile" style="--t:${C.tGrass}"><h3>Pick a colorway</h3><p><span class="sw" style="background:${C.tomato}"></span><b>Rainbow</b> color-codes each routine.<br><span class="sw" style="background:${C.tSun}"></span><b>Soft</b> uses gentle tints.<br><span class="sw" style="background:${C.ink}"></span><b>Navy</b> has bold frames.<br><span class="sw" style="background:#fff;border:1px solid ${C.ink}"></span><b>Simple</b> saves ink.</p></div>
        <div class="tile" style="--t:${C.tPlum}"><h3>Also in your download</h3><p><b>Editable PDF</b>: type your own words on blank cards, chart titles and checklists in free Adobe Acrobat Reader.<br><b>Canva-ready PNGs</b>: every card, the art on its own, blank frames and chart backgrounds.</p></div>
      </div>
    </div>
    <div class="tile" style="--t:${C.wash};margin-top:auto"><h3 style="margin-bottom:8px">One card, four colorways</h3>
      <div style="display:flex;gap:.2in;justify-content:space-between">${COLORWAYS.map(cw => `<div style="text-align:center"><div style="width:1.54in;height:1.54in"><div style="transform:scale(.7);transform-origin:top left">${card(CARDS.find(c => c.id === 'play-blocks'), cw.id)}</div></div><div style="font-weight:800;font-size:10.5px;margin-top:4px">${cw.name}</div><div class="note">${cw.note}</div></div>`).join('')}</div></div>
  </div>`, { footNote: 'Print guide' });
}
function laminatePage() {
  return page(`<div class="in" style="gap:.15in">
    <div><span class="kicker">Laminate, stick and store</span><h1 class="g-title">Make them last for years</h1></div>
    <div class="g-grid" style="grid-template-columns:1fr 1fr">
      <div class="tile" style="--t:${C.tSky}"><div class="big" style="--c:${C.sky}">1</div><h3>Print on cardstock</h3><p>White cardstock, 65–110 lb (176–300 gsm), at 100% scale. Let ink dry for a few minutes before laminating.</p></div>
      <div class="tile" style="--t:${C.tSun}"><div class="big" style="--c:${C.sun}">2</div><h3>Laminate the whole sheet</h3><p>Use 3–5 mil pouches. Laminate the full page first, then cut. It's faster and the edges seal better. No laminator? Wide clear packing tape works.</p></div>
      <div class="tile" style="--t:${C.tGrass}"><div class="big" style="--c:${C.grass}">3</div><h3>Cut with a sealed edge</h3><p>Cut along each card edge, leaving about 1/8 in (3 mm) of sealed plastic. Round the corners with scissors or a corner rounder so they're soft in little hands.</p></div>
      <div class="tile" style="--t:${C.tTomato}"><div class="big" style="--c:${C.tomato}">4</div><h3>Add velcro dots</h3><p>Stick the <b>rough (hook)</b> dots on the chart slots and the <b>soft (loop)</b> dots on card backs, so cards stack and store without snagging. 3/4 in (19 mm) coin dots fit best.</p></div>
      <div class="tile" style="--t:${C.tPlum}"><div class="big" style="--c:${C.plum}">5</div><h3>Store by routine</h3><p>Use the storage labels on the extras page with zip pouches, envelopes, a photo box or a binder ring through a punched corner.</p></div>
      <div class="tile" style="--t:${C.wash}"><div class="big">6</div><h3>Write and wipe</h3><p>Laminated blank cards and checklists take dry-erase or wet-erase markers. Wipe with a damp cloth and use them again next week.</p></div>
    </div>
    <div class="safety"><h3>Safety for little hands</h3><ul class="tight">
      <li>Use the cards with an adult nearby. Routine cards are a together activity, not a toy to leave in the crib or bed.</li>
      <li>Every card is 2.2 in (5.6 cm) square, bigger than a toilet-paper tube opening, which is a common rule of thumb for small parts with children under 3. Don't shrink the cards when printing, and don't cut them into smaller pieces for under-3s.</li>
      <li>Velcro dots, laminating scraps and loose plastic are small parts. Stick dots on firmly, check them each week, and keep spares out of reach. Skip magnets for any child who still puts things in their mouth.</li>
      <li>Hang charts low enough to reach without climbing, and away from blind cords.</li></ul></div>
    <div style="display:flex;gap:.3in;align-items:center">
      <div style="width:2.2in;height:2.2in;border:2px dashed ${C.ink};border-radius:.17in;display:flex;align-items:center;justify-content:center;flex:0 0 auto;position:relative"><div style="width:1.25in;height:1.25in;border-radius:50%;background:${C.tTomato};border:2px solid ${C.tomato};display:flex;align-items:center;justify-content:center;text-align:center;font-size:8.5px;font-weight:800;line-height:1.2;color:${C.tomato}">toilet-paper<br>tube opening<br>≈ 1.25 in</div></div>
      <div><h3 style="font-size:16px;margin-bottom:4px">Size check</h3><p style="font-size:11.2px;line-height:1.45">Measure the dashed square with a ruler after printing. If it's <b>2.2 in (5.6 cm)</b> on each side, you printed at the right size and every card is bigger than a toilet-paper tube opening. If it's smaller, reprint at 100% / Actual size.</p></div>
    </div>
  </div>`, { footNote: 'Laminate, stick and store' });
}
function indexPages(rainbowStart) {
  // rainbowStart: page number where the Rainbow 0-5 card pages begin; 12 per page
  const pos = new Map();
  YOUNG.forEach((c, i) => pos.set(c.id, rainbowStart + Math.floor(i / 12)));
  const bigStart = rainbowStart + Math.ceil(YOUNG.length / 12);
  BIG.forEach((c, i) => pos.set(c.id, bigStart + Math.floor(i / 12)));
  const blocks = CATS.map(cat => `<h4 style="--c:${cat.c}"><i></i>${esc(cat.name)} <span style="opacity:.55;letter-spacing:.04em">${cat.age}</span></h4>` + CARDS.filter(c => c.cat === cat.id).map(c => `<div><span>${esc(c.label)}</span><span>${pos.get(c.id)}</span></div>`).join('')).join('');
  return page(`<div class="in" style="gap:.12in">
    <div><span class="kicker">Card index</span><h1 class="g-title" style="font-size:26px">All ${N_ALL} cards, by routine</h1><p class="note">Page numbers are for the Rainbow colorway. The Soft, Navy and Simple sections use the same order.</p></div>
    <div class="idx">${blocks}</div></div>`, { footNote: 'Card index' });
}
function bonusPage(tier) {
  const starter = tier === 'starter';
  const next = starter
    ? [['The Complete Set', `All ${N_ALL} cards, 6 chart layouts, 4 colorways, editable blanks and Canva PNGs.`, C.tomato], ['Play-First Family Kit', 'A play-first, then-screens checklist, helping jobs and a family play plan.', C.sky], ['"I\'m Bored" Play Cards', '150 age-banded play ideas with a talk prompt on every card.', C.grass]]
    : [['Play-First Family Kit', 'A play-first, then-screens checklist, helping jobs and a family play plan.', C.sky], ['"I\'m Bored" Play Cards', '150 age-banded play ideas with a talk prompt on every card.', C.grass], ['Toddler Busy Book', 'Paper-and-play pages for ages 0–5, sorted by age band.', C.plum]];
  return page(`<div class="in" style="gap:.2in">
    <div><span class="kicker">Thank you</span><h1 class="g-title">Your free bonus is waiting</h1>
    <p class="g-lede">Scan the code for free seasonal routine cards (holidays, back to school, travel days) and short, practical play ideas for your child's age. We only ask for your email and your child's birth month and year, never a name.</p></div>
    <div style="display:flex;gap:.3in;align-items:center" class="tile">
      <div style="width:1.75in;height:1.75in;background:#fff;padding:.19in;border-radius:12px;flex:0 0 auto">${QR}</div>
      <div><h3 style="font-size:18px">Scan, or type the short link</h3><p style="font-family:Fredoka,sans-serif;font-weight:600;font-size:17px;margin-top:6px;color:${C.tomato}">${BONUS}</p><p class="note" style="margin-top:6px">Free companion download. Unsubscribe any time.</p></div>
    </div>
    <div><div class="kicker" style="color:${C.ink};margin-bottom:8px">Next for your family</div>
    <div class="g-grid" style="grid-template-columns:repeat(3,1fr)">${next.map(([h, p, c]) => `<div class="tile" style="--t:${C.wash};border-top:6px solid ${c}"><h3>${h}</h3><p>${p}</p></div>`).join('')}</div></div>
    <div class="tile" style="--t:${C.tSun};display:flex;gap:.2in;align-items:center">
      <div style="display:flex;gap:.08in;flex:0 0 auto">${['feelings-happy', 'feelings-proud', 'feelings-loved'].map(id => `<div style="width:.99in;height:.99in"><div style="transform:scale(.45);transform-origin:top left">${card(CARDS.find(c => c.id === id), 'rainbow')}</div></div>`).join('')}</div>
      <div><h3>Did the cards help your routine?</h3><p>A short review helps other families find a calmer morning. Tell us which card your child reaches for first.</p></div>
    </div>
    <div style="margin-top:auto" class="note">
      <p><b style="color:${C.ink}">Terms of use.</b> For personal use in your own home and family. Please don't share, sell or upload the files, or print them for others. You may print as many copies as your family needs.</p>
      <p style="margin-top:6px">These cards are a parenting resource for everyday routines. Questions? Use the contact form at playbeforepixels.com.</p>
      <p style="margin-top:6px">Illustrations and text created with AI assistance and edited by Play Before Pixels. ${COPY}</p>
    </div>
  </div>`, { footNote: 'Thank you' });
}

// ---------------- documents ----------------
function doc(paper, pages, title) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
${css(paper)}
</head><body>
${DEFS}
${pages.join('\n')}
</body></html>`;
}

function buildFull(paper) {
  PAGENO = 0;
  const front = [];
  front.push(coverPage('full'));
  front.push(welcomePage());
  front.push(agesPage());
  front.push(talkPage());
  const tocIndex = front.length; front.push(null); // placeholder (TOC needs page numbers)
  front.push(laminatePage());
  const idxIndex = front.length; front.push(null);
  const pagesPerCw = Math.ceil(YOUNG.length / 12) + Math.ceil(BIG.length / 12) + 1;
  const chartsPerCw = 7 + 4;
  const firstCards = front.length + 1; // page number of first card page
  // compute section ranges
  const sec = [];
  let p = firstCards;
  const ranges = {};
  for (const cw of COLORWAYS) {
    const y0 = p; const y1 = p + Math.ceil(YOUNG.length / 12) - 1; const b0 = y1 + 1; const b1 = b0 + Math.ceil(BIG.length / 12) - 1; const bl = b1 + 1;
    ranges[cw.id] = { y0, y1, b0, b1, bl }; p = bl + 1;
  }
  for (const cw of COLORWAYS) { ranges[cw.id].c0 = p; ranges[cw.id].c1 = p + chartsPerCw - 1; p += chartsPerCw; }
  const extrasP = p, bonusP = p + 1;
  const swatch = { rainbow: C.tomato, soft: C.tSun, navy: C.ink, simple: '#fff' };
  sec.push({ h: 'Guide' }, { t: 'Welcome, ages, talk tips, print guide, laminating', p: `2–${firstCards - 1}` });
  sec.push({ h: `Cards (${N_ALL} + blanks)` });
  for (const cw of COLORWAYS) { const r = ranges[cw.id]; sec.push({ t: `${cw.name}: ages 0–5 &amp; all-ages`, p: `${r.y0}–${r.y1}`, sw: swatch[cw.id] }, { t: `${cw.name}: ages 5–12`, p: `${r.b0}–${r.b1}`, sw: swatch[cw.id] }, { t: `${cw.name}: blank cards`, p: `${r.bl}`, sw: swatch[cw.id] }); }
  sec.push({ h: 'Charts and checklists' });
  for (const cw of COLORWAYS) { const r = ranges[cw.id]; sec.push({ t: `${cw.name}: 6 layouts + big-kid checklists`, p: `${r.c0}–${r.c1}`, sw: swatch[cw.id] }); }
  sec.push({ t: 'Extras: Today markers, All done pocket, labels', p: `${extrasP}` }, { t: 'Free bonus and what\'s next', p: `${bonusP}` });

  // build in order with real numbering
  PAGENO = 0;
  const out = [];
  out.push(coverPage('full'), welcomePage(), agesPage(), talkPage());
  out.push(tocPage(sec));
  out.push(laminatePage());
  out.push(indexPages(ranges.rainbow.y0));
  const bookmarks = [['Cover', 1], ['Welcome', 2], ['Use them by age', 3], ['Talk while you use them', 4], ['Print guide', 5], ['Laminate, stick and store', 6], ['Card index', 7]];
  for (const cw of COLORWAYS) {
    const r = ranges[cw.id];
    if (PAGENO + 1 !== r.y0) throw new Error(`page math off for ${cw.id}: ${PAGENO + 1} vs ${r.y0}`);
    bookmarks.push([`Cards · ${cw.name}`, r.y0]);
    out.push(...cardPages(YOUNG, cw.id, { age: 'Ages 0–5' }));
    out.push(...cardPages(BIG, cw.id, { age: 'Ages 5–12' }));
    out.push(blankCardPage(cw.id));
  }
  for (const cw of COLORWAYS) {
    bookmarks.push([`Charts · ${cw.name}`, ranges[cw.id].c0]);
    out.push(...chartsFor(cw.id), ...checklistsFor(cw.id));
  }
  bookmarks.push(['Extras', extrasP], ['Free bonus', bonusP]);
  out.push(extrasPage(), bonusPage('full'));
  if (out.length !== bonusP) throw new Error(`page count ${out.length} vs ${bonusP}`);
  return { html: doc(paper, out, `200+ Visual Routine Cards — ${PAPER[paper].name}`), pages: out.length, bookmarks };
}

function buildStarter(paper) {
  PAGENO = 0;
  const S = CARDS.filter(c => c.starter);
  const out = [coverPage('starter')];
  out.push(page(`<div class="in" style="gap:.16in">
    <div><span class="kicker">Starter Set</span><h1 class="g-title">60 cards for the moments that matter most</h1>
    <p class="g-lede">Morning, meals, play, outside, reading, bath, bedtime, helping jobs, feelings, plan words and the <b>Play first / Screens later</b> pair. Print at 100% (Actual size) on cardstock, laminate, cut and add velcro dots.</p></div>
    <div class="g-grid" style="grid-template-columns:repeat(3,1fr)">${[['0–2 years', C.tomato, C.tTomato, 'Show one card right before it happens, or two on the first–then board: "First shoes, then park."'], ['2–3 years', C.sky, C.tSky, 'A strip of three or four cards for one routine. Your child moves each card to All done.'], ['3–5 years', C.grass, C.tGrass, 'The morning chart, up to nine steps. Let them choose the order of two steps.']].map(([a, c, t, p]) => `<div class="tile" style="--t:${t};border-top:6px solid ${c}"><span class="chip" style="background:#fff">${a}</span><p style="margin-top:6px">${p}</p></div>`).join('')}</div>
    <div class="tile" style="--t:${C.wash}"><h3>Talk while you use them</h3><p><b>Say what you see</b> ("Shoes on! Blue shoes."), <b>pause and wait</b> ("First teeth, then…"), <b>offer a choice</b> (hold up two play cards), <b>repeat and add one word</b> ("bath" becomes "warm bath"), <b>follow their lead</b>, and <b>sing and gesture</b>. There's nothing to get right.</p></div>
    <div class="safety"><h3>Safety for little hands</h3><ul class="tight"><li>Use the cards with an adult nearby. They're a together activity, not a crib or bed toy.</li><li>Every card is 2.2 in (5.6 cm) square, bigger than a toilet-paper tube opening. Don't shrink them when printing or cut them smaller for under-3s.</li><li>Velcro dots and laminating scraps are small parts: stick dots on firmly, check them weekly and keep spares out of reach. Skip magnets for children who still mouth things.</li></ul></div>
    <div class="g-grid" style="grid-template-columns:1fr 1fr">
      <div class="tile" style="--t:${C.tSun}"><h3>Laminate and velcro</h3><p>Laminate whole sheets in 3–5 mil pouches, then cut leaving a 1/8 in (3 mm) sealed edge and round the corners. Rough (hook) dots go on charts, soft (loop) dots on card backs.</p></div>
      <div class="tile" style="--t:${C.tGrass}"><h3>Want more?</h3><p>The Complete Set has all ${N_ALL} cards, including 58 big-kid cards for ages 5–12, 6 chart layouts, 4 colorways, editable blanks and Canva-ready PNGs.</p></div>
    </div>
  </div>`, { footNote: 'How to use' }));
  out.push(...cardPages(S, 'rainbow', { age: 'Ages 0–5' }));
  out.push(...cardPages(S, 'simple', { age: 'Ages 0–5' }));
  out.push(chartStrip('rainbow'), chartFirstThen('rainbow'), chartRoutine('rainbow', 'morning'));
  out.push(bonusPage('starter'));
  return { html: doc(paper, out, `60 Visual Routine Cards Starter Set — ${PAPER[paper].name}`), pages: out.length };
}

function buildEditable(paper) {
  PAGENO = 0;
  const out = [];
  out.push(page(`<div class="in" style="gap:.18in">
    <div><span class="kicker">Editable PDF</span><h1 class="g-title">Type your own words, then print</h1>
    <p class="g-lede">Every gray line in this file is a box you can type into. Use your family's words, a home language, a pet's name or a brand-new routine.</p></div>
    <div class="g-grid" style="grid-template-columns:1fr 1fr">
      <div class="tile" style="--t:${C.tSky}"><div class="big" style="--c:${C.sky}">1</div><h3>Open in Adobe Acrobat Reader</h3><p>It's free on computers, tablets and phones. Browser PDF viewers and some preview apps may not save typed text.</p></div>
      <div class="tile" style="--t:${C.tSun}"><div class="big" style="--c:${C.sun}">2</div><h3>Click a box and type</h3><p>Text sizes itself to fit. Keep card labels to one to three words so they're easy to read at a glance.</p></div>
      <div class="tile" style="--t:${C.tGrass}"><div class="big" style="--c:${C.grass}">3</div><h3>Save a copy</h3><p>Use "Save as" with a new name so you keep a clean blank file for next time.</p></div>
      <div class="tile" style="--t:${C.tTomato}"><div class="big" style="--c:${C.tomato}">4</div><h3>Print at 100%</h3><p>Choose Actual size on cardstock. Or skip typing entirely: print the blanks and write or draw with a marker.</p></div>
    </div>
    <div class="tile" style="--t:${C.wash}"><h3>What's in this file</h3><p>All ${N_ALL} picture cards with a blank label to type your own word · blank cards in all 4 colorways · every chart layout with a title you can type · big-kid checklists with typeable jobs and tick boxes (Monday and Sunday starts).</p></div>
    <div class="tile" style="--t:${C.tPlum}"><h3>Prefer Canva?</h3><p>The Canva-ready PNG folder in your download has every card, the art on its own (transparent background), blank frames and chart backgrounds. Upload them to a free Canva account and add your own text.</p></div>
  </div>`, { footNote: 'Editable PDF · How to use' }));
  // art cards with typeable labels (rainbow)
  chunk(CARDS, 12).forEach((g, gi) => {
    const cells = g.map((c, i) => `<div class="cardwrap">${card(c, 'rainbow', { blankLabel: true, field: `label_${c.id}` })}</div>`);
    for (let i = g.length; i < 12; i++) cells.push(`<div class="cardwrap">${card({ id: 'blank', cat: g[g.length - 1].cat, art: null, label: '' }, 'rainbow', { blankArt: true, blankLabel: true, field: `label_fill_${gi}_${i}` })}</div>`);
    const cats = [...new Set(g.map(c => c.cat))].map(id => CAT[id].name).join(' · ');
    out.push(page(`<div class="in"><div class="ph"><span class="sec"><span class="chip age">Type your label</span>${esc(cats)}</span><span class="sec"><span class="chip">Rainbow</span>${wordmark()}</span></div><div class="grid">${cells.join('')}</div></div>`, { cls: 'cards' }));
  });
  for (const cw of COLORWAYS) out.push(blankCardPage(cw.id, 'words', `blank_${cw.id}`));
  for (const cw of COLORWAYS) out.push(...chartsFor(cw.id, { fields: true }).filter((_, i) => i !== 1 && i !== 2)); // rotated layouts: no typed fields (see Canva PNGs)
  for (const cw of COLORWAYS) out.push(chartHoriz(cw.id), chartFirstThen(cw.id));
  for (const cw of COLORWAYS) out.push(...checklistsFor(cw.id, { fields: true, blank: true }));
  return { html: doc(paper, out, `Visual Routine Cards — Editable — ${PAPER[paper].name}`), pages: out.length };
}

// ---------------- write everything ----------------
if (require.main === module) {
const FONT_ROOT = '../../brand/fonts/fonts.css';
const FONT_BUILD = '../../../brand/fonts/fonts.css';
const write = (file, html, fromBuild) => fs.writeFileSync(file, html.replace('FONTHREF', fromBuild ? FONT_BUILD : FONT_ROOT));
const manifest = {};
for (const paper of ['letter', 'a4']) {
  const f = buildFull(paper);
  if (paper === 'letter') write(path.join(ROOT, 'source.html'), f.html, false);
  write(path.join(OUT, `full-${paper}.html`), f.html, true);
  const s = buildStarter(paper);
  write(path.join(OUT, `starter-${paper}.html`), s.html, true);
  const e = buildEditable(paper);
  write(path.join(OUT, `editable-${paper}.html`), e.html, true);
  manifest[paper] = { full: f.pages, starter: s.pages, editable: e.pages, bookmarks: f.bookmarks };
}
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify({ cards: N_ALL, young: N_YOUNG, big: N_BIG, starter: CARDS.filter(c => c.starter).length, ...manifest }, null, 2));
console.log(JSON.stringify({ cards: N_ALL, young: N_YOUNG, big: N_BIG, letter: { full: manifest.letter.full, starter: manifest.letter.starter, editable: manifest.letter.editable } }));
}

module.exports = { chartsFor, checklistsFor, chartStrip, chartHoriz, chartFirstThen, chartRoutine, chartToday, checklist, coverPage, css, doc, PAPER, extrasPage, N_ALL, N_YOUNG, N_BIG, COPY, BONUS, QR };
