// Cover, KDP cover wrap, website mockup and 2000 x 2000 listing images for "100 Screen-Free Plays for Ages 0–5".
//   node extras.js   (run after book.js; make.sh renders everything)
const fs = require('fs');
const path = require('path');
const CH = require('./chars.js');
const { ART, UI } = require('./icons.js');
const { P, BANDS } = require('./plays.js');
const X = require('./parts.js');
const { C } = CH;
const { OUT, BONUS, COPY, W, BC, esc, qrSvg, sceneCover, VERSION, ico } = X;
const MAPL = require('./pagemap-letter.json'); // page numbers in the Letter color edition (written by book.js)
const MAPK = require('./pagemap-kdp.json');
const A = require('./anatomy.json'); // play-21 card rows (written by measure.js)
const pp = n => 'p' + String(n).padStart(2, '0');
const pT = t => pp(MAPL.titles[t]);
const { PREPLINE } = require('./book.js');
const HERE = __dirname;
const FONTS = '../../../brand/fonts/fonts.css';
const LOGO = n => `../../../brand/logo/${n}.svg`;
const HI = 'dbg/hi'; // hi-res page renders (make.sh), relative to build/

// KDP paperback: 8 x 10 in, black-and-white interior on white paper. Spine = pages x 0.002252 in [VERIFY with KDP's cover calculator].
const PAGES = MAPK.count;
const SPINE = +(PAGES * 0.002252).toFixed(4);
const BLEED = 0.125;

const defs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${CH.SYMBOLS.join('')}${ART.join('')}${UI.join('')}</defs></svg>`;
const baseCss = `* { box-sizing: border-box; margin: 0; padding: 0 } body { font-family: "Nunito Sans", sans-serif; color: ${C.ink}; -webkit-print-color-adjust: exact; print-color-adjust: exact }
.display { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; letter-spacing: -0.015em; line-height: .95 }
.sk{fill:var(--sk)} .hr{fill:var(--hr)} .sh{fill:var(--sh)} .pa{fill:var(--pa)} .so{fill:var(--so)} .hw{fill:var(--hw)} .ck{fill:${C.tomato};opacity:.28}`;
const htmlDoc = (title, css, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title><link rel="stylesheet" href="${FONTS}"><style>${baseCss}\n${css}</style></head><body>${defs}${body}</body></html>`;
const write = (f, s) => { fs.writeFileSync(path.join(HERE, f), s); console.log(f); };

// ---------------------------------------------------------------- front cover (8.25 x 10.25 in incl. bleed; safe = 0.375 in from trim)
function front() {
  return `<div class="front">
    <div class="fbg"></div>
    <div class="ftop">
      <div class="display n100">100</div>
      <div class="display t1">Screen-Free<br>Plays</div>
      <div class="t2"><span class="display">for Ages</span><span class="display pill">0–5</span></div>
      <p class="fsub">Easy, low-prep play and talk ideas for babies, toddlers and preschoolers, sorted by age</p>
    </div>
    <div class="fart"><svg viewBox="30 240 540 250" preserveAspectRatio="xMidYMax meet">${sceneCover()}</svg></div>
    <div class="fbands">${BANDS.map(b => `<span class="display" style="background:${BC[b.key].c};color:${BC[b.key].fg}">${b.label}</span>`).join('')}</div>
    <div class="ffoot"><img src="${LOGO('lockup-horizontal-reverse')}" alt="Play Before Pixels"><span>Every play: what you need · prep &amp; mess<br>a talk line · a safety note</span></div>
  </div>`;
}
const frontCss = `
.front { position: absolute; width: 8.25in; height: 10.25in; overflow: hidden; background: ${W} }
.fbg { position: absolute; left: 0; right: 0; top: 0; height: 6.1in; background: ${C.tTomato} }
.ftop { position: absolute; left: .62in; top: .62in; right: .6in }
.n100 { font-size: 214pt; color: ${C.tomato}; line-height: .78; letter-spacing: -0.04em; margin-left: -.06in }
.t1 { font-size: 56pt; line-height: .92; margin-top: .14in }
.t2 { display: flex; align-items: center; gap: .14in; margin-top: .14in; font-size: 34pt }
.t2 .pill { background: ${C.tomato}; color: ${W}; border-radius: 99px; padding: .03in .2in .08in }
.fsub { font-size: 14pt; line-height: 1.35; margin-top: .2in; max-width: 4.6in; font-weight: 600 }
.fart { position: absolute; right: .05in; bottom: 1.14in; width: 6in; height: 4.55in }
.fart svg { width: 100%; height: 100% }
.fbands { position: absolute; left: .62in; bottom: 1.5in; display: flex; flex-direction: column; gap: .1in }
.fbands span { font-size: 17pt; padding: .07in .18in; border-radius: 99px; text-align: center; width: 1.05in }
.ffoot { position: absolute; left: 0; right: 0; bottom: 0; height: 1.16in; background: ${C.ink}; display: flex; align-items: center; justify-content: space-between; padding: 0 .62in .3in; gap: .3in }
.ffoot img { height: .5in }
.ffoot span { color: ${W}; font-size: 9.5pt; font-weight: 700; text-align: right; max-width: 3.3in; line-height: 1.35 }`;

function coverHtml() {
  // 8 x 10 in trim shown without bleed: 768 x 960 css px; render at scale 1.6667 -> 1280 x 1600
  return htmlDoc('100 Screen-Free Plays — cover', frontCss + `html,body{width:8in;height:10in;overflow:hidden} .front{left:-${BLEED}in;top:-${BLEED}in}`, front());
}

// ---------------------------------------------------------------- back cover + wrap
function back() {
  const sample = P[21];
  return `<div class="back">
    <div class="display bh">Play more. Talk more.<br>No special toys needed.</div>
    <p class="bp">A cup, a box, a sock, or nothing at all. <b>100 Screen-Free Plays</b> gives you a quick play for every age and every moment of an ordinary day, from the first smiles to "and then what happened?"</p>
    <ul class="bl">
      <li><b>Sorted by age:</b> 0–1, 1–2, 2–3 and 3–5, each with a one-page "at a glance" guide</li>
      <li><b>Every play:</b> a starting age, what you need, prep, mess and play-time icons, a make-it-easier and a make-it-harder idea, and a safety note</li>
      <li><b>A talk line on every page</b>, using six easy, everyday talk moves</li>
      <li><b>Real-life help:</b> a pantry list (${P.filter(p => !p.buy).length} plays need nothing to buy), tired-grown-up plays, a sample screen-free day, a quick finder and friendly ideas for when screens are on anyway</li>
    </ul>
    <div class="bmini"><span class="display" style="color:${C.grass}">Play ${sample.n}</span> <b>${esc(sample.t)}</b><span class="tl">${esc(sample.talk)}</span></div>
    <div class="bbands">${BANDS.map((b, i) => `<div style="background:${BC[b.key].c};color:${BC[b.key].fg}"><svg viewBox="-60 -60 120 120"><circle r="58" fill="${W}"/><use href="#a-${['rattle', 'basket', 'boot', 'rocket'][i]}" transform="scale(.8)"/></svg><span class="display">${b.label}</span><small>${b.to - b.from + 1} plays</small></div>`).join('')}</div>
    <div class="bfoot">
      <div><img src="${LOGO('lockup-horizontal')}" alt="Play Before Pixels"><p>playbeforepixels.com · Parent education, not medical advice.<br>Black-and-white interior · free full-color play pages at the bonus link inside.<br>${COPY}</p></div>
      <div class="isbn" aria-hidden="true"></div>
    </div>
  </div>`;
}
const backCss = `
.back { position: absolute; width: 8.25in; height: 10.25in; background: ${C.tTomato}; padding: .75in .62in .62in .75in; display: flex; flex-direction: column }
.bh { font-size: 34pt; line-height: 1.02 }
.bp { font-size: 12.5pt; line-height: 1.5; margin-top: .24in }
.bl { list-style: none; margin-top: .2in; font-size: 11pt; line-height: 1.45 }
.bl li { padding: .07in 0 .07in .26in; position: relative; border-bottom: 1px solid rgba(29,41,64,.15) }
.bl li::before { content: ""; position: absolute; left: 0; top: .15in; width: .12in; height: .12in; border-radius: 99px; background: ${C.tomato} }
.bmini { margin-top: .26in; background: ${W}; border-radius: .16in; padding: .18in .22in; font-size: 12pt }
.bmini .display { font-size: 13pt; margin-right: .06in }
.bmini .tl { display: block; font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 16pt; margin-top: .06in }
.bbands { display: grid; grid-template-columns: repeat(4, 1fr); gap: .16in; margin-top: .3in }
.bbands div { border-radius: .16in; padding: .14in .1in; text-align: center; display: flex; flex-direction: column; align-items: center; gap: .04in }
.bbands svg { width: .85in; height: .85in }
.bbands .display { font-size: 20pt } .bbands small { font-size: 9pt; font-weight: 700 }
.bfoot { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; gap: .3in }
.bfoot img { height: .42in; display: block; margin-bottom: .1in }
.bfoot p { font-size: 8pt; line-height: 1.45 }
/* Barcode area: a plain white 2 x 1.2 in block, no label or outline. KDP prints its own barcode at the lower right of
   the back cover (position UNVERIFIED; check KDP's cover template before upload). */
.isbn { width: 2in; height: 1.2in; background: ${W}; flex: none }`;

function wrapHtml() {
  const Wd = BLEED * 2 + 16 + SPINE, Ht = 10 + BLEED * 2;
  return htmlDoc('100 Screen-Free Plays — KDP cover wrap', frontCss + backCss + `
@page { size: ${Wd}in ${Ht}in; margin: 0 }
html, body { width: ${Wd}in; height: ${Ht}in; overflow: hidden }
.wrap { position: relative; width: ${Wd}in; height: ${Ht}in }
.back { left: 0; top: 0 }
.spine { position: absolute; left: ${8 + BLEED}in; top: 0; width: ${SPINE}in; height: ${Ht}in; background: ${C.tomato} }
.front { left: ${8 + BLEED + SPINE - BLEED}in; top: 0 }
.front .fbg { left: ${BLEED}in }`, `<div class="wrap">${back()}${front()}<div class="spine" title="Spine ${SPINE} in for ${PAGES} pages: no spine text (KDP allows spine text only above 79 pages and with 0.0625 in clearance; this spine is too thin)"></div></div>`);
}

// ---------------------------------------------------------------- mockup (1600 x 1200)
const SPREAD = (() => { let n = MAPL.plays[5]; if (n % 2) n = MAPL.plays[7]; return [pp(n), pp(n + 1)]; })(); // left (even) + right (odd) play pages
function mockupHtml() {
  return htmlDoc('100 Screen-Free Plays — mockup', `
html,body{width:1600px;height:1200px;overflow:hidden;background:${C.wash}}
.floor{position:absolute;left:0;right:0;bottom:0;height:430px;background:#E7ECF4}
.spread{position:absolute;left:120px;top:470px;width:860px;height:560px;display:flex;transform:perspective(1800px) rotateX(38deg) rotateZ(-6deg);transform-origin:50% 100%;box-shadow:0 40px 60px rgba(29,41,64,.18);border-radius:4px}
.spread img{width:50%;height:100%;object-fit:cover;display:block}
.spread::after{content:"";position:absolute;left:calc(50% - 30px);top:0;width:60px;height:100%;background:linear-gradient(90deg,rgba(0,0,0,0),rgba(29,41,64,.18),rgba(0,0,0,0))}
.book{position:absolute;right:170px;top:150px;width:560px;height:700px;box-shadow:30px 36px 50px rgba(29,41,64,.25), 6px 6px 0 #D9DEE7;border-radius:3px 8px 8px 3px;overflow:hidden}
.book img{width:100%;height:100%;display:block}
.book::before{content:"";position:absolute;left:0;top:0;bottom:0;width:18px;background:linear-gradient(90deg,rgba(29,41,64,.25),rgba(255,255,255,.15),rgba(0,0,0,0))}
.shadow{position:absolute;right:130px;top:835px;width:640px;height:40px;border-radius:50%;background:rgba(29,41,64,.14);filter:blur(10px)}
.prop{position:absolute}
`, `<div class="floor"></div>
<div class="spread"><img src="${HI}/${SPREAD[0]}.png"><img src="${HI}/${SPREAD[1]}.png"></div>
<div class="shadow"></div>
<div class="book"><img src="../cover.png"></div>
<svg class="prop" style="left:1010px;top:980px" width="260" height="160" viewBox="-130 -80 260 160"><use href="#block-1" transform="translate(-70 30) scale(1.1)"/><use href="#block-2" transform="translate(0 30) scale(1.1)"/><use href="#block-4" transform="translate(-34 -34) scale(1.1) rotate(8)"/></svg>
<svg class="prop" style="left:60px;top:1010px" width="170" height="170" viewBox="-60 -60 120 120"><use href="#ball"/></svg>`);
}

// ---------------------------------------------------------------- listing images (2000 x 2000)
const LCSS = `html,body{width:2000px;height:2000px;overflow:hidden}
.L{position:relative;width:2000px;height:2000px;overflow:hidden;padding:120px}
.h{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;letter-spacing:-.015em;line-height:1}
.pg{background:#fff;box-shadow:0 24px 60px rgba(29,41,64,.2);border-radius:6px;display:block}
.tag{display:inline-block;border-radius:999px;padding:14px 34px;font-weight:800;font-size:40px}
.foot{position:absolute;left:120px;right:120px;bottom:80px;display:flex;justify-content:space-between;align-items:center;font-size:34px;font-weight:700}
.foot img{height:70px}
.co{position:absolute;display:flex;align-items:center;gap:18px;font-size:38px;font-weight:800;background:#fff;border-radius:22px;padding:18px 28px;box-shadow:0 10px 30px rgba(29,41,64,.15)}
.co i{font-style:normal;display:inline-flex;width:56px;height:56px;border-radius:99px;align-items:center;justify-content:center;color:#fff;font-family:"Bricolage Grotesque",sans-serif;font-size:32px;flex:none}`;
const foot = (dark = false) => `<div class="foot" style="color:${dark ? W : C.ink}"><img src="${LOGO(dark ? 'lockup-horizontal-reverse' : 'lockup-horizontal')}" alt="Play Before Pixels"><span>100 Screen-Free Plays · Ages 0–5</span></div>`;
const L = (name, bg, body, dark) => write(`listing-${name}.html`, htmlDoc('Listing ' + name, LCSS, `<div class="L" style="background:${bg}">${body}${foot(dark)}</div>`));

function listings() {
  const free = P.filter(p => !p.buy).length;
  // 1 hero
  L('01-hero', C.wash, `
    <img src="../cover.png" class="pg" style="position:absolute;left:120px;top:190px;width:1110px;border-radius:8px 14px 14px 8px">
    <div style="position:absolute;left:1310px;top:210px;right:100px">
      <div class="h" style="font-size:88px;line-height:1.02">Play and talk ideas, sorted by age</div>
      <div style="display:flex;flex-direction:column;gap:22px;margin-top:60px">
        ${['Sorted by age, from birth', `${free} plays: nothing to buy`, 'Talk line on every play', 'Safety note on every play'].map((t, i) => `<div style="display:flex;gap:18px;align-items:center;font-size:40px;font-weight:800"><span style="width:26px;height:26px;border-radius:99px;background:${[C.sky, C.grass, C.sun, C.tomato][i]};flex:none"></span>${t}</div>`).join('')}
      </div>
      <div style="margin-top:60px;display:flex;flex-direction:column;gap:18px">
        <span class="tag" style="background:${C.ink};color:${W};text-align:center;font-size:36px">Paperback 8 × 10 in<br><span style="font-weight:700;font-size:30px">black-and-white interior</span></span>
        <span class="tag" style="background:${W};text-align:center;font-size:36px">PDF · Color + Low-ink<br><span style="font-weight:700;font-size:30px">US Letter + A4</span></span>
      </div>
      <div style="margin-top:44px;font-size:36px;font-weight:700;line-height:1.3">PDF: 100 plays, about 10¢ each</div>
    </div>`);
  // 2 anatomy of a play: close-up of play 21, callouts aligned to the measured rows (page px at 96 dpi, page width 816)
  const sc = 1.446, top = A.top - 12, Y = py => Math.round(300 + (py - top) * sc);
  const co = (n, t, py, c) => `<div class="co" style="left:110px;top:${Y(py) - 40}px;height:80px;font-size:34px"><i style="background:${c}">${n}</i>${t}</div><div style="position:absolute;left:690px;width:70px;top:${Y(py)}px;border-top:5px dotted ${c}"></div>`;
  L('02-every-play', C.wash, `
    <div class="h" style="font-size:96px">Every play, the same easy parts</div>
    <div class="pg" style="position:absolute;left:760px;top:300px;width:1130px;height:${Y(A.bottom + 6) - 300}px;overflow:hidden;border-radius:16px">
      <img src="${HI}/${pp(A.page)}.png" style="position:absolute;left:${-34 * sc}px;top:${-top * sc}px;width:${816 * sc}px"></div>
    ${co(1, 'Starting age &amp; number', A.kicker, C.grass)}
    ${co(2, 'Prep, mess, play time', A.meta, C.sky)}
    ${co(3, 'Easy steps', A.how, C.plum)}
    ${co(4, 'Easier &amp; harder', A.eh, C.sun)}
    ${co(5, 'Talk while you play', A.talk, C.tomato)}
    ${co(6, 'Safety note', A.safe, C.grass)}
    <div style="position:absolute;left:120px;right:120px;top:1130px;display:grid;grid-template-columns:repeat(4,1fr);gap:30px;text-align:center">
      ${[['100', 'plays'], ['4', 'age bands'], [String(free), 'need nothing to buy'], ['12', 'tired-grown-up plays']].map(([a, b], i) => `<div style="background:${W};border-radius:30px;padding:40px 20px"><div class="h" style="font-size:150px;color:${[C.tomato, C.sky, C.grass, C.plum][i]}">${a}</div><div style="font-size:38px;font-weight:800;margin-top:10px">${b}</div></div>`).join('')}
    </div>
    <div style="position:absolute;left:120px;right:120px;top:1530px;font-size:44px;line-height:1.45;text-align:center;font-weight:600">Two plays on every page, each with its own illustration.<br>Big, clear type you can read at a glance while you play.</div>`);
  // 3 age bands
  L('03-four-age-bands', W, `
    <div class="h" style="font-size:100px">Sorted by age, from birth to 5</div>
    <p style="font-size:44px;margin-top:24px;max-width:1500px">Four color-coded chapters, each with a one-page "at a glance" guide and a play basket list.</p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:40px;margin-top:80px">
      ${BANDS.map((b, i) => `<div><img src="${HI}/${pT('band-' + b.key)}.png" class="pg" style="width:100%"><div class="h" style="font-size:64px;margin-top:30px">${b.label}</div><div style="font-size:36px;font-weight:700">${b.to - b.from + 1} plays · ${b.long}</div><ul style="list-style:none;margin-top:26px;font-size:32px;line-height:1.3">${P.filter(p => p.band === b.key).slice(0, 5).map(p => `<li style="padding:12px 0;border-top:2px solid ${BC[b.key].t}">${esc(p.t)}</li>`).join('')}<li style="padding:12px 0;border-top:2px solid ${BC[b.key].t};font-weight:800">and more…</li></ul></div>`).join('')}
    </div>`);
  // 4 quick finder
  L('04-quick-finder', C.tSky, `
    <img src="${HI}/${pT('Quick finder: a play for every moment')}.png" class="pg" style="position:absolute;left:120px;top:150px;width:1000px;transform:rotate(-2deg)">
    <div style="position:absolute;left:1220px;top:220px;right:120px">
      <div class="h" style="font-size:96px">A play for every moment</div>
      <div style="margin-top:60px;display:flex;flex-direction:column;gap:26px;font-size:44px;font-weight:800">
        ${['Rainy day wiggles', 'Bath time', 'In the kitchen', 'Waiting rooms &amp; car rides', 'Wind-down before bed', 'Nothing needed at all'].map((t, i) => `<div style="background:${W};border-radius:24px;padding:22px 30px">${t}</div>`).join('')}
      </div>
    </div>`);
  // 5 safety + screens
  L('05-safety-and-screens', C.tGrass, `
    <div class="h" style="font-size:96px">Calm, practical, no guilt</div>
    <div style="display:flex;gap:60px;margin-top:70px">
      <div style="flex:1"><img src="${HI}/${pT('Safety first')}.png" class="pg" style="width:100%"><div style="font-size:40px;font-weight:800;margin-top:26px">Every play follows our published safety rules, with a note on every play</div></div>
      <div style="flex:1"><img src="${HI}/${pT('When screens are on anyway')}.png" class="pg" style="width:100%"><div style="font-size:40px;font-weight:800;margin-top:26px">Friendly ideas for when screens are on anyway</div></div>
    </div>`);
  // 6 tired plays + sample day
  L('06-sample-day', C.tSun, `
    <div class="h" style="font-size:96px">Made for real days</div>
    <div style="display:flex;gap:60px;margin-top:70px">
      <div style="flex:1"><img src="${HI}/${pT('Tired-grown-up plays')}.png" class="pg" style="width:100%"><div style="font-size:40px;font-weight:800;margin-top:26px">Tired-grown-up plays: 2 minutes, no setup</div></div>
      <div style="flex:1"><img src="${HI}/${pT('A sample screen-free day')}.png" class="pg" style="width:100%"><div style="font-size:40px;font-weight:800;margin-top:26px">A sample day: a rhythm, not a schedule</div></div>
    </div>`);
  // 7 digital edition: color + low-ink, fillable
  const ex = MAPL.extras;
  L('07-printable-extras', C.tPlum, `
    <div class="h" style="font-size:96px">PDF edition: type right in</div>
    <p style="font-size:44px;margin-top:24px">Color and Low-ink files · fill-in planners and blank plays · Monday and Sunday starts · US Letter + A4</p>
    <div style="position:relative;height:1300px;margin-top:40px">
      ${[[HI, ex[0]], [HI, ex[2]], [LO, MAPL.plays[21]], [LO, MAPL.titles['Our play week']]].map(([d, n], i) => `<img src="${d}/${pp(n)}.png" class="pg" style="position:absolute;width:760px;left:${60 + i * 300}px;top:${60 + (i % 2) * 70}px;transform:rotate(${[-6, -2, 2, 6][i]}deg)">`).join('')}
      <div style="position:absolute;right:40px;bottom:30px;display:flex;gap:20px"><span class="tag" style="background:${W}">Color</span><span class="tag" style="background:${W};box-shadow:inset 0 0 0 4px ${C.ink}">Low-ink</span></div>
    </div>`);
  // 8 what's inside
  const inside = ['100 plays in 4 age bands', 'Easier and harder ideas on every play', 'Six easy talk moves', 'Safety first page', `Pantry list: ${free} plays need nothing to buy`, '12 tired-grown-up plays', 'Quick finder for every moment', 'A sample screen-free day', 'When screens are on anyway', 'The 100-play tracker and planners', 'Blank pages for your own plays', 'How-to-use guide and sources'];
  L('08-whats-inside', C.ink, `
    <div class="h" style="font-size:110px;color:${W}">What’s inside</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px 60px;margin-top:100px">
      ${inside.map((t, i) => `<div style="display:flex;gap:24px;align-items:center;font-size:50px;font-weight:800;color:${W}"><svg width="60" height="60" viewBox="0 0 24 24" style="flex:none;color:${[C.sky, C.grass, C.sun, C.tomato][i % 4]}"><use href="#u-shield"/></svg>${t}</div>`).join('')}
    </div>
    <div style="position:absolute;left:120px;right:120px;bottom:200px;font-size:34px;color:#C9D1DE;line-height:1.4">Parent education, not medical advice. Every play is done with a grown-up right there. No brands, apps or devices named. ${COPY}</div>`, true);
  // 9 how to download (CUSTOMER-VOICE rule 5; last image on Etsy and our own shop)
  const step = (n, t, d) => `<div style="display:flex;gap:40px;align-items:flex-start;background:${W};border-radius:36px;padding:44px 50px"><span class="h" style="flex:none;width:110px;height:110px;border-radius:99px;background:${C.tomato};color:${W};display:flex;align-items:center;justify-content:center;font-size:64px">${n}</span><div><div class="h" style="font-size:58px">${t}</div><div style="font-size:40px;margin-top:12px;line-height:1.35">${d}</div></div></div>`;
  L('09-how-to-download', C.tSky, `
    <div class="h" style="font-size:104px">How to download</div>
    <p style="font-size:52px;margin-top:24px;font-weight:800">Use a web browser, not the Etsy app.</p>
    <div style="display:flex;flex-direction:column;gap:34px;margin-top:70px">
      ${step(1, 'Open Etsy in a browser', 'On a computer, or in your phone’s web browser.')}
      ${step(2, 'Go to Purchases', 'Find this order and tap “Download files”.')}
      ${step(3, 'Start with START HERE', 'Then pick Color or Low-ink, in US Letter or A4.')}
      ${step(4, 'Type in, or print', 'Open the PDF in free Adobe Acrobat Reader to type into the planners.')}
    </div>
    <p style="font-size:36px;margin-top:50px">Your files stay in Purchases, so you can download them again anytime. Instant download: nothing is shipped.</p>`);
}

// ---------------------------------------------------------------- START HERE (file 1), own-store and Etsy editions
function startHere(etsy) {
  const files = etsy
    ? [['2-Color-US-Letter.pdf', 'Full color, US Letter'], ['3-Color-A4.pdf', 'Full color, A4'], ['4-Low-Ink-US-Letter.pdf', 'Low-ink: white pages, line art to color, US Letter'], ['5-Low-Ink-A4.pdf', 'Low-ink, A4']]
    : [['guide-100-plays-letter.pdf', 'Full color, US Letter'], ['guide-100-plays-a4.pdf', 'Full color, A4'], ['guide-100-plays-low-ink-letter.pdf', 'Low-ink: white pages, line art to color, US Letter'], ['guide-100-plays-low-ink-a4.pdf', 'Low-ink, A4']];
  const card = (bg, h, body) => `<div class="card" style="background:${bg}"><div class="display" style="font-size:13.5pt;margin-bottom:.03in">${h}</div>${body}</div>`;
  const ul = a => `<ul>${a.map(t => `<li>${t}</li>`).join('')}</ul>`;
  const T = MAPL.titles;
  return htmlDoc('START HERE · 100 Screen-Free Plays', `
@page { size: 8.5in 11in; margin: 0 }
html, body { width: 8.5in }
.page { width: 8.5in; height: 11in; padding: .5in .6in .45in; display: flex; flex-direction: column; gap: .1in; overflow: hidden; position: relative; font-size: 9.4pt; line-height: 1.36 }
.card { border-radius: .16in; padding: .1in .18in }
.card ul { padding-left: .2in } .card li { margin: .03in 0 }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: .1in }
.foot { margin-top: auto; display: flex; justify-content: space-between; font-size: 8pt; color: #5A6478; border-top: 1px solid #C9D1DE; padding-top: .08in }`, `
<section class="page">
  <div style="display:flex;justify-content:space-between;align-items:center"><img src="${LOGO('lockup-horizontal')}" alt="Play Before Pixels" style="height:.5in"><span class="display" style="background:${C.tomato};color:${W};border-radius:99px;padding:.05in .18in;font-size:12pt">File 1 · Start here</span></div>
  <div><div class="display" style="font-size:26pt">100 Screen-Free Plays for Ages 0–5</div>
  <p style="font-size:11pt;margin-top:.06in">Thank you! Here’s what each file holds and how to print and type into it. ${PREPLINE} No cutting, no laminating.</p></div>
  ${card(C.tSun, 'Your files', ul(files.map(([f, d]) => `<b>${f}</b> · ${d}`)) + '<p style="font-size:9pt;margin-top:.04in">Pick one file for your paper size. Color and Low-ink files hold the same pages. Every file has the four extra planner pages (Monday and Sunday starts) at the back.</p>')}
  <div class="two">
    ${card(C.tSky, 'Printing', ul(['Print at <b>100% / Actual size</b>. US Letter for North America, A4 everywhere else.', 'Ordinary printer paper is fine. Print double-sided to save paper.', 'Print just the pages you need: the play pages for your child’s age, the tracker and a planner.', 'To save ink, use the Low-ink file.', 'A copy shop can print and bind the whole book.']))}
    ${card(C.tGrass, 'Typing in', ul(['Open the PDF in free Adobe Acrobat Reader (computer, phone or tablet) and tap a line to type.', 'You can type into the blank "our own play" pages and every play-week planner.', 'The 100 plays, pictures and colors are fixed and can’t be edited.', 'Save, then print, or print blank and write by hand.']))}
  </div>
  ${card(C.tTomato, 'Where to begin', ul([`Read <b>Safety first</b> (page ${T['Safety first']}) and <b>How to use this book</b> (page ${T['How to use this book']}).`, `Turn to your child’s age band: ages 0–1 (page ${T['band-b0']}), 1–2 (page ${T['band-b1']}), 2–3 (page ${T['band-b2']}) or 3–5 (page ${T['band-b3']}).`, `Worn out? Start with <b>Tired-grown-up plays</b> (page ${T['Tired-grown-up plays']}).`]))}
  ${card(C.tPlum, 'Downloading: use a browser, not the app', `<p>${etsy ? 'Open your Etsy Purchases page in a web browser (not the Etsy app) and download each file. On a phone, save each PDF to your files first, then open it in Adobe Acrobat Reader. Your files stay on your Purchases page, so you can download them again at any time.' : 'Open the download link from your order email in a web browser. On a phone, save each PDF to your files first, then open it in Adobe Acrobat Reader. If the link ever stops working, the resend-my-download page below sends you a fresh one.'}</p>`)}
  ${etsy ? '' : `<div class="card" style="border:1.5px solid ${C.ink};display:flex;gap:.2in;align-items:center"><div style="flex:none">${qrSvg(84)}</div><div><div class="display" style="font-size:13.5pt;margin-bottom:.03in">Free bonus and re-downloads</div><p>Scan for your free bonus: <b>${BONUS}</b>. Lost a file? Use the resend-my-download page in the help center at <b>playbeforepixels.com</b>.</p></div></div>`}
  <p style="font-size:8.6pt;color:#5A6478">License: personal and family use in your own home. Please don’t share or resell the files. Parent education, not medical or professional advice. Every play follows our published safety rules.</p>
  <div class="foot"><span>${COPY}</span><span>${VERSION}</span></div>
</section>`);
}
const LO = 'dbg/lo'; // low-ink Letter page renders (make.sh)

write('cover.html', coverHtml());
write('cover-wrap.html', wrapHtml());
write('mockup.html', mockupHtml());
listings();
write('start-here.html', startHere(false));
write('start-here-etsy.html', startHere(true));
module.exports = { PAGES, SPINE };
