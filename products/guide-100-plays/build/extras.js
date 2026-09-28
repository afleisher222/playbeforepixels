// Cover, KDP cover wrap, website mockup and 2000 x 2000 listing images for "100 Screen-Free Plays for Ages 0–5".
//   node extras.js   (run after book.js; make.sh renders everything)
const fs = require('fs');
const path = require('path');
const CH = require('./chars.js');
const { ART, UI } = require('./icons.js');
const { P, BANDS } = require('./plays.js');
const X = require('./parts.js');
const { C } = CH;
const { OUT, BONUS, COPY, W, BC, esc, qrSvg, sceneCover } = X;
const HERE = __dirname;
const FONTS = '../../../brand/fonts/fonts.css';
const LOGO = n => `../../../brand/logo/${n}.svg`;
const HI = 'dbg/hi'; // hi-res page renders (make.sh), relative to build/

// KDP paperback: 8 x 10 in, black-and-white interior on white paper. Spine = pages x 0.002252 in [VERIFY with KDP's cover calculator].
const PAGES = 82;
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
.ffoot { position: absolute; left: 0; right: 0; bottom: 0; height: 1.16in; background: ${C.ink}; display: flex; align-items: center; justify-content: space-between; padding: 0 .62in .1in; gap: .3in }
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
    <p class="bp">A cup, a box, a sock, or nothing at all. <b>100 Screen-Free Plays</b> gives you a quick, safe play for every age and every moment of an ordinary day, from the first smiles to "and then what happened?"</p>
    <ul class="bl">
      <li><b>Sorted by age:</b> 0–1, 1–2, 2–3 and 3–5, each with a one-page "at a glance" guide</li>
      <li><b>Every play:</b> what you need, prep and mess icons, a "Grow it" idea and a safety note</li>
      <li><b>A talk line on every page</b>, using six easy, everyday talk moves</li>
      <li><b>Real-life help:</b> a sample screen-free day, a quick finder for bath time, car rides and rainy days, and friendly ideas for when screens are on anyway</li>
    </ul>
    <div class="bmini"><span class="display" style="color:${C.grass}">Play ${sample.n}</span> <b>${esc(sample.t)}</b><span class="tl">${esc(sample.talk)}</span></div>
    <div class="bbands">${BANDS.map((b, i) => `<div style="background:${BC[b.key].c};color:${BC[b.key].fg}"><svg viewBox="-60 -60 120 120"><circle r="58" fill="${W}"/><use href="#a-${['rattle', 'basket', 'boot', 'rocket'][i]}" transform="scale(.8)"/></svg><span class="display">${b.label}</span><small>${b.to - b.from + 1} plays</small></div>`).join('')}</div>
    <div class="bfoot">
      <div><img src="${LOGO('lockup-horizontal')}" alt="Play Before Pixels"><p>playbeforepixels.com · Parent education, not medical advice.<br>${COPY}</p></div>
      <div class="isbn">ISBN / barcode<br><span>KDP places the barcode here</span></div>
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
.isbn { width: 2in; height: 1.2in; background: ${W}; border: 1.5px dashed ${C.ink}; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; font-weight: 800; font-size: 9pt; letter-spacing: .06em; flex: none }
.isbn span { font-weight: 600; font-size: 7pt; letter-spacing: 0; color: #5A6478 }`;

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
<div class="spread"><img src="${HI}/p15.png"><img src="${HI}/p16.png"></div>
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
  // 1 hero
  L('01-hero', C.wash, `
    <img src="../cover.png" class="pg" style="position:absolute;left:120px;top:190px;width:1110px;border-radius:8px 14px 14px 8px">
    <div style="position:absolute;left:1310px;top:230px;right:100px">
      <div class="h" style="font-size:88px;line-height:1.02">Play and talk ideas, sorted by age</div>
      <div style="display:flex;flex-direction:column;gap:22px;margin-top:70px">
        ${['Sorted by age', 'Low prep, everyday things', 'Talk line on every play', 'Safety note on every play'].map((t, i) => `<div style="display:flex;gap:18px;align-items:center;font-size:40px;font-weight:800"><span style="width:26px;height:26px;border-radius:99px;background:${[C.sky, C.grass, C.sun, C.tomato][i]};flex:none"></span>${t}</div>`).join('')}
      </div>
      <div style="margin-top:80px;display:flex;flex-direction:column;gap:18px">
        <span class="tag" style="background:${C.ink};color:${W};text-align:center">Paperback 8 × 10 in</span>
        <span class="tag" style="background:${W};text-align:center">PDF · US Letter + A4</span>
      </div>
    </div>`);
  // 2 anatomy of a play: close-up of play 21 (page 27) with callouts aligned to page rows (page px at 96 dpi, page width 816)
  const sc = 1.446, top = 100, Y = py => Math.round(300 + (py - top) * sc);
  const co = (n, t, py, c) => `<div class="co" style="left:110px;top:${Y(py) - 40}px;height:80px;font-size:34px"><i style="background:${c}">${n}</i>${t}</div><div style="position:absolute;left:690px;width:70px;top:${Y(py)}px;border-top:5px dotted ${c}"></div>`;
  L('02-every-play', C.wash, `
    <div class="h" style="font-size:96px">Every play, the same easy parts</div>
    <div class="pg" style="position:absolute;left:760px;top:300px;width:1130px;height:${Y(520) - 300}px;overflow:hidden;border-radius:16px">
      <img src="${HI}/p27.png" style="position:absolute;left:${-34 * sc}px;top:${-top * sc}px;width:${816 * sc}px"></div>
    ${co(1, 'Age &amp; number', 138, C.grass)}
    ${co(2, 'Prep, mess, you need', 214, C.sky)}
    ${co(3, 'Easy steps', 291, C.plum)}
    ${co(4, '"Grow it" idea', 358, C.sun)}
    ${co(5, 'Talk while you play', 424, C.tomato)}
    ${co(6, 'Safety note', 486, C.grass)}
    <div style="position:absolute;left:120px;right:120px;top:1100px;display:grid;grid-template-columns:repeat(4,1fr);gap:30px;text-align:center">
      ${[['100', 'plays'], ['4', 'age bands'], ['6', 'easy talk moves'], ['0', 'special toys']].map(([a, b], i) => `<div style="background:${W};border-radius:30px;padding:40px 20px"><div class="h" style="font-size:150px;color:${[C.tomato, C.sky, C.grass, C.plum][i]}">${a}</div><div style="font-size:40px;font-weight:800;margin-top:10px">${b}</div></div>`).join('')}
    </div>
    <div style="position:absolute;left:120px;right:120px;top:1500px;font-size:44px;line-height:1.45;text-align:center;font-weight:600">Two plays on every page, each with its own illustration.<br>Big, clear type you can read at a glance while you play.</div>`);
  // 3 age bands
  L('03-four-age-bands', W, `
    <div class="h" style="font-size:100px">Sorted by age, from birth to 5</div>
    <p style="font-size:44px;margin-top:24px;max-width:1500px">Four color-coded chapters, each with a one-page "at a glance" guide and a play basket list.</p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:40px;margin-top:80px">
      ${BANDS.map((b, i) => `<div><img src="${HI}/p${[11, 25, 41, 57][i]}.png" class="pg" style="width:100%"><div class="h" style="font-size:64px;margin-top:30px">${b.label}</div><div style="font-size:36px;font-weight:700">${b.to - b.from + 1} plays · ${b.long}</div><ul style="list-style:none;margin-top:26px;font-size:32px;line-height:1.3">${P.filter(p => p.band === b.key).slice(0, 5).map(p => `<li style="padding:12px 0;border-top:2px solid ${BC[b.key].t}">${esc(p.t)}</li>`).join('')}<li style="padding:12px 0;border-top:2px solid ${BC[b.key].t};font-weight:800">and more…</li></ul></div>`).join('')}
    </div>`);
  // 4 quick finder
  L('04-quick-finder', C.tSky, `
    <img src="${HI}/p09.png" class="pg" style="position:absolute;left:120px;top:150px;width:1000px;transform:rotate(-2deg)">
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
      <div style="flex:1"><img src="${HI}/p07.png" class="pg" style="width:100%"><div style="font-size:40px;font-weight:800;margin-top:26px">"Safety first" page, plus a safety note on every play</div></div>
      <div style="flex:1"><img src="${HI}/p77.png" class="pg" style="width:100%"><div style="font-size:40px;font-weight:800;margin-top:26px">Friendly ideas for when screens are on anyway</div></div>
    </div>`);
  // 6 sample day + tracker
  L('06-sample-day', C.tSun, `
    <div class="h" style="font-size:96px">A sample screen-free day</div>
    <div style="display:flex;gap:60px;margin-top:70px">
      <div style="flex:1"><img src="${HI}/p75.png" class="pg" style="width:100%"><div style="font-size:40px;font-weight:800;margin-top:26px">Real-life rhythm, not a strict schedule</div></div>
      <div style="flex:1"><img src="${HI}/p78.png" class="pg" style="width:100%"><div style="font-size:40px;font-weight:800;margin-top:26px">The 100-play tracker to tick off favorites</div></div>
    </div>`);
  // 7 printables (digital edition)
  L('07-printable-extras', C.tPlum, `
    <div class="h" style="font-size:96px">PDF edition: type right in</div>
    <p style="font-size:44px;margin-top:24px">Fill-in blank plays and play-week planners · Monday and Sunday starts · 4 colorways · US Letter + A4</p>
    <div style="position:relative;height:1300px;margin-top:40px">
      ${['p79', 'p82', 'p83', 'p84'].map((p, i) => `<img src="${HI}/${p}.png" class="pg" style="position:absolute;width:760px;left:${60 + i * 300}px;top:${60 + (i % 2) * 70}px;transform:rotate(${[-6, -2, 2, 6][i]}deg)">`).join('')}
    </div>`);
  // 8 what's inside
  const inside = ['100 plays in 4 age bands', 'Six easy talk moves', 'Safety first page', 'Quick finder for every moment', 'Set-up tips and play-basket lists', 'A sample screen-free day', 'When screens are on anyway', 'The 100-play tracker', 'Play-week planner', 'Blank pages for your own plays', 'Free bonus printables (QR code)'];
  L('08-whats-inside', C.ink, `
    <div class="h" style="font-size:110px;color:${W}">What's inside</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:54px 60px;margin-top:110px">
      ${inside.map((t, i) => `<div style="display:flex;gap:24px;align-items:center;font-size:54px;font-weight:800;color:${W}"><svg width="60" height="60" viewBox="0 0 24 24" style="flex:none;color:${[C.sky, C.grass, C.sun, C.tomato][i % 4]}"><use href="#u-shield"/></svg>${t}</div>`).join('')}
    </div>
    <div style="position:absolute;left:120px;right:120px;bottom:200px;font-size:34px;color:#C9D1DE;line-height:1.4">Parent education, not medical advice. Every play is done with a grown-up right there. No brands, apps or devices named. ${COPY}</div>`, true);
}

write('cover.html', coverHtml());
write('cover-wrap.html', wrapHtml());
write('mockup.html', mockupHtml());
listings();
module.exports = { PAGES, SPINE };
