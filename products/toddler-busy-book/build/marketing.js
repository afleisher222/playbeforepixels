// Builds cover.html, mockup.html, listing.html (Etsy images, 2000 x 2000) and png-templates.html.
// Run after build.js and after preview/ PNGs exist (make-all.sh does this).
const fs = require('fs');
const path = require('path');
const { htmlDoc, BANDS, CELL, BIG, C, VERSION, pieceGrid } = require('./core.js');
const { plan } = require('./build.js');
const extra = require('./extra-pages.js');
const { defs } = require('./extra-defs.js');
const { silDefs } = require('./boards.js');
const { use, star } = require('./lib.js');

const REL = '../../../';
const { seq, ctx } = plan();
Object.assign(ctx, { rel: REL, size: 'letter', etsy: false });
// render every page once so that page-specific symbols (socks, stories, silhouettes) are registered
const { render } = require('./build.js'); render({ rel: REL, size: 'letter' });
const DEFS = () => defs.all() + silDefs();
const S = JSON.parse(fs.readFileSync(path.join(__dirname, 'stats.json'), 'utf8'));
const pv = n => `../preview/p${String(n).padStart(2, '0')}.png`;
const lv = n => `../preview/low-ink/p${String(n).padStart(2, '0')}.png`;
const A = S.actPages, SH = S.sheetPages;
const doc = (title, css, body) => htmlDoc({ title, rel: REL, size: 'letter', body, extraCss: extra.EXTRA_CSS + css, extraDefs: DEFS() }).replace('<body class="color site">', '<body class="color site mk">');

// ---------- cover.png ----------
const cover = extra.front[0].html(ctx, 1);
fs.writeFileSync(path.join(__dirname, 'cover.html'), doc('Toddler Busy Book cover', 'html,body{margin:0}', cover));

// ---------- shared marketing CSS ----------
const MK = `
body.mk{margin:0;background:#fff}
.L{width:1000px;height:1000px;position:relative;overflow:hidden;font-family:"Nunito Sans",sans-serif;color:${C.ink}}
.L h1{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;letter-spacing:-.02em;line-height:1}
.pg{position:absolute;background:#fff;border-radius:6px;box-shadow:0 18px 40px rgba(29,41,64,.18),0 2px 6px rgba(29,41,64,.12)}
.pg img{width:100%;height:100%;display:block;border-radius:6px}
.kick{font-size:17px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
.bchip{display:inline-flex;align-items:center;gap:8px;background:#fff;border-radius:999px;padding:12px 20px;font-weight:800;font-size:21px}
.bchip i{width:14px;height:14px;border-radius:7px}
.brand{position:absolute;right:44px;bottom:36px;height:44px}
.big{font-family:"Bricolage Grotesque",sans-serif;font-weight:800}
.cap{font-size:17px;font-weight:800;margin-top:10px;text-align:center}
.tile{background:#fff;border-radius:22px;padding:18px 20px}
.tile h3{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:25px;margin-bottom:4px}
.tile p{font-size:17px;line-height:1.35}
`;
const page = (n, x, y, w, rot = 0, src = pv) => `<div class="pg" style="left:${x}px;top:${y}px;width:${w}px;height:${w * 11 / 8.5}px;transform:rotate(${rot}deg)"><img src="${src(n)}"></div>`;
const logo = `<img class="brand" src="${REL}brand/logo/lockup-horizontal.svg">`;
const chips = ['b1', 'b2', 'b3'].map(b => `<span class="bchip"><i style="background:${BANDS[b].c}"></i>${BANDS[b].label}</span>`).join('');
const pieceCard = (id, word, w = 170, h = 150, rot = 0, x = 0, y = 0, extra = '') => `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:rotate(${rot}deg);background:#fff;border-radius:16px;box-shadow:0 10px 24px rgba(29,41,64,.18);padding:8px"><div style="width:100%;height:100%;background:${C.wash};border-radius:11px;display:flex;flex-direction:column;align-items:center;justify-content:center"><svg width="${w * 0.55}" height="${h * 0.55}" viewBox="-55 -55 110 110"><use href="#${id}" ${extra}/></svg><span class="kid" style="font-size:${Math.round(h / 8.5)}px;margin-top:2px">${word}</span></div></div>`;

const L = [];
// 1 hero
L.push(`<div class="L" style="background:${C.tSky}">
  <div style="position:absolute;left:56px;top:56px;right:56px"><div class="kick" style="color:${C.tomato}">Printable · Ages 1–5 · US Letter + A4</div>
  <h1 style="font-size:104px;margin-top:14px">${S.activities} Busy Book<br>Activities</h1>
  <p style="font-size:27px;font-weight:700;margin-top:16px;line-height:1.3;max-width:640px">Toddler busy book sorted by age, with a “talk while you play” line on every page.</p></div>
  ${page(A['w-ball'], 470, 470, 300, 7)}${page(A['colorsort'], 250, 500, 300, -5)}
  ${pieceCard('w-duck', 'duck', 180, 160, -12, 70, 520)}${pieceCard('b-apple', 'apple', 170, 150, 8, 740, 400)}${pieceCard('b-s-star', 'star', 150, 136, 14, 790, 760, `style="--sf:${C.plum}"`)}
  <div style="position:absolute;left:56px;bottom:44px;display:flex;gap:10px">${chips}</div>
</div>`);
// 2 what's inside
const inside = [['w-hi', 'First words'], ['moo', 'Animal sounds'], ['colorsort', 'Color sort'], ['shapes', 'Shape match'], ['pizza', 'Pizza shop'], ['maze4', 'Mazes'], ['seq1', 'First, next, last'], ['post', 'Post office']];
L.push(`<div class="L" style="background:#fff">
  <div style="position:absolute;left:56px;top:50px"><div class="kick" style="color:${C.sky}">What’s inside</div><h1 style="font-size:64px;margin-top:8px">${S.pages} pages of calm, colorful play</h1></div>
  <div style="position:absolute;left:56px;right:56px;top:190px;display:grid;grid-template-columns:repeat(4,1fr);gap:22px 18px">${inside.map(([id, t]) => `<div><div class="pg" style="position:relative;width:100%;height:${203 * 11 / 8.5}px"><img src="${pv(A[id])}"></div><div class="cap">${t}</div></div>`).join('')}</div>
  <div style="position:absolute;left:56px;right:56px;bottom:40px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px">${[[S.activities, 'activities'], [S.noCut, 'no-cut pages'], [S.sheets, 'piece sheets'], [S.pieces, 'pieces, all 2 in+']].map(([n, t]) => `<div class="tile" style="background:${C.wash};text-align:center;padding:12px"><div class="big" style="font-size:44px">${n}</div><div style="font-weight:800;font-size:17px">${t}</div></div>`).join('')}</div>
</div>`);
// 3 age bands
L.push(`<div class="L" style="background:${C.wash}">
  <div style="position:absolute;left:56px;top:50px"><div class="kick" style="color:${C.grass}">Organized by age</div><h1 style="font-size:64px;margin-top:8px">Three age bands that grow with your child</h1></div>
  <div style="position:absolute;left:56px;right:56px;top:260px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px">${[['b1', 'same-toys'], ['b2', 'weather'], ['b3', 'maze6']].map(([b, id]) => { const B = BANDS[b]; return `<div class="tile" style="background:${B.t};padding:16px"><span class="bchip" style="background:${B.c};color:${B.on};font-size:19px;padding:8px 16px">${B.label}</span><h3 style="margin-top:10px">${B.name}</h3><p style="font-size:15.5px">${B.blurb}</p><div class="pg" style="position:relative;width:100%;height:${258 * 11 / 8.5}px;margin-top:12px"><img src="${pv(A[id])}"></div><p style="margin-top:10px;font-weight:800">${S.byBand[b]} activities</p></div>`; }).join('')}</div>
</div>`);
// 4 first words
L.push(`<div class="L" style="background:${C.tSun}">
  <div style="position:absolute;left:56px;top:50px;right:56px"><div class="kick" style="color:${C.tomato}">First words</div><h1 style="font-size:60px;margin-top:8px">Art from our talk-along board book</h1><p style="font-size:22px;font-weight:700;margin-top:10px">One word, one big picture and a move to copy together.</p></div>
  ${page(A['w-ball'], 70, 290, 400, -4)}${page(A['w-go'], 530, 300, 400, 4)}
  <div class="tile" style="position:absolute;left:120px;right:120px;bottom:40px;display:flex;gap:16px;align-items:center;box-shadow:0 10px 30px rgba(29,41,64,.15)"><svg width="46" height="46" viewBox="0 0 24 24" style="color:${C.grass}"><use href="#u-talk"/></svg><div><div class="kick" style="font-size:14px;color:#5B6780">Talk while you play</div><div class="big" style="font-size:30px">“Ball! Big ball. Roll, ball!”</div></div></div>
</div>`);
// 5 matching + pieces
L.push(`<div class="L" style="background:${C.tGrass}">
  <div style="position:absolute;left:56px;top:50px;right:56px"><div class="kick" style="color:${C.grass}">Matching · sorting · pretend play</div><h1 style="font-size:60px;margin-top:8px">Big pieces, straight cuts</h1><p style="font-size:22px;font-weight:700;margin-top:10px">Each piece sheet sits right after its page. 12 straight cuts or fewer.</p></div>
  ${page(A['shadows'], 70, 300, 390, -3)}${page(SH['shadows'], 520, 300, 390, 3)}
  ${pieceCard('w-duck', 'duck', 200, 176, -9, 330, 740)}${pieceCard('w-cup', 'cup', 190, 168, 7, 560, 770)}
</div>`);
// 6 3-5 thinking
L.push(`<div class="L" style="background:${C.tTomato}">
  <div style="position:absolute;left:56px;top:50px;right:56px"><div class="kick" style="color:${C.tomato}">For 3–5 years</div><h1 style="font-size:60px;margin-top:8px">Mazes, patterns and little stories</h1><p style="font-size:22px;font-weight:700;margin-top:10px">8 mazes from easy to tricky, plus counting, rhymes and sequencing.</p></div>
  ${page(A['maze2'], 60, 320, 290, -6)}${page(A['patterns1'], 355, 290, 290, 0)}${page(A['seq1'], 650, 320, 290, 6)}
</div>`);
// 7 how a page works
L.push(`<div class="L" style="background:#fff">
  <div style="position:absolute;left:56px;top:50px"><div class="kick" style="color:${C.sky}">Every page, the same calm system</div><h1 style="font-size:60px;margin-top:8px">Made for tired grown-ups</h1></div>
  ${page(A['teddy'], 56, 200, 470, 0)}
  <div style="position:absolute;left:570px;right:50px;top:210px;display:flex;flex-direction:column;gap:14px">${[[C.tSky, 'Talk while you play', 'One line to say out loud on every page.'], [C.tSun, 'Easier & harder', 'One page grows with your child.'], [C.tGrass, '2-minute version', 'For days with nothing left in the tank.'], [C.tPlum, 'Prep · mess · needs', 'Honest prep time. Most pages: zero.'], [C.tTomato, 'Safety note', 'Supervision note on every activity page.']].map(([t, h, p]) => `<div class="tile" style="background:${t};padding:14px 18px"><h3 style="font-size:24px">${h}</h3><p>${p}</p></div>`).join('')}</div>
</div>`);
// 8 sizes & formats
L.push(`<div class="L" style="background:${C.wash}">
  <div style="position:absolute;left:56px;top:50px;right:56px"><div class="kick" style="color:${C.plum}">Sizes & formats</div><h1 style="font-size:60px;margin-top:8px">Color or Low-ink. Letter or A4.</h1></div>
  ${page(A['moo'], 70, 220, 300, -3)}${page(A['moo'], 330, 240, 300, 3, lv)}
  <div style="position:absolute;left:150px;top:660px" class="bchip">Color</div><div style="position:absolute;left:430px;top:670px" class="bchip">Low-ink</div>
  <div style="position:absolute;left:680px;right:50px;top:210px;display:flex;flex-direction:column;gap:12px">${[['5 PDF files', 'START HERE + Color and Low-ink, each in US Letter and A4'], ['Type-in pages', 'Covers, labels, planners, make-your-own pages and certificate'], ['Monday & Sunday', 'Weekly planner, pre-filled and blank'], ['4 colorways', 'Binder covers and spine labels'], ['Instant download', 'Print at home or at a print shop']].map(([h, p]) => `<div class="tile" style="padding:12px 16px"><h3 style="font-size:22px">${h}</h3><p style="font-size:15.5px">${p}</p></div>`).join('')}</div>
  <div style="position:absolute;left:70px;bottom:44px;display:flex;gap:10px">${[A['x-cov1'], A['x-cov2'], A['x-cov3'], A['x-cov4']].map((n, i) => `<div class="pg" style="position:relative;width:118px;height:${118 * 11 / 8.5}px;transform:rotate(${[-4, -1, 2, 5][i]}deg)"><img src="${pv(n)}"></div>`).join('')}</div>
</div>`);
// 9 how to use
L.push(`<div class="L" style="background:#fff">
  <div style="position:absolute;left:56px;top:50px;right:56px"><div class="kick" style="color:${C.grass}">How to use</div><h1 style="font-size:60px;margin-top:8px">Play today, build it over time</h1></div>
  <div style="position:absolute;left:56px;right:56px;top:210px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px">${[['1', 'Print', 'Start with a no-cut page: ' + S.noCut + ' are ready today.', C.tSky, 'b-lamp'], ['2', 'Protect', 'Sheet protectors or a laminator. Both optional.', C.tSun, 'b-laminator'], ['3', 'Cut', 'Straight lines only, 12 cuts or fewer per sheet.', C.tTomato, 'b-scissors'], ['4', 'Play & talk', 'Say the talk line, then pause for their turn.', C.tGrass, 'w-duck']].map(([n, h, p, t, id]) => `<div class="tile" style="background:${t};text-align:center"><div class="big" style="font-size:40px">${n}</div><svg width="120" height="110" viewBox="-60 -55 120 110"><use href="#${id}"/></svg><h3>${h}</h3><p style="font-size:16px">${p}</p></div>`).join('')}</div>
  ${page(A['x-build'], 110, 610, 300, -3)}${page(A['x-lam'], 560, 600, 300, 3)}
</div>`);
// 10 safety
L.push(`<div class="L" style="background:${C.tGrass}">
  <div style="position:absolute;left:56px;top:50px;right:56px"><div class="kick" style="color:${C.grass}">Safety, built in</div><h1 style="font-size:60px;margin-top:8px">Every play follows our published safety rules</h1></div>
  <div style="position:absolute;left:56px;right:56px;top:300px;display:grid;grid-template-columns:1fr 1fr;gap:18px">
    <div class="tile" style="display:flex;gap:18px;align-items:center"><svg width="120" height="170" viewBox="-40 -60 80 120" style="flex:none"><use href="#b-tube" transform="scale(1.2)"/></svg><div><h3>Bigger than a toilet-paper tube</h3><p>Every piece is 2 in (5.1 cm) or bigger. Pieces for 1–2 years: 2.5 in (6.3 cm) or bigger.</p></div></div>
    <div class="tile"><h3>Grown-up keeps the pieces</h3><p>Printed on every piece sheet. Count them out and back in, and store them in a labeled pouch.</p></div>
    <div class="tile"><h3>No velcro dots for under-3s</h3><p>1–2 and 2–3 pieces lay on top. Velcro is optional for 3–5, with “check dots before each play.”</p></div>
    <div class="tile"><h3>Play together</h3><p>A supervision note on every activity page. No balloons, beads, buttons, coins or strings anywhere.</p></div>
  </div>
</div>`);
fs.writeFileSync(path.join(__dirname, 'listing.html'), doc('Toddler Busy Book listing images', MK, L.join('\n')));

// ---------- mockup.png (1600 x 1200) ----------
const mock = `<div class="mock" style="width:1600px;height:1200px;position:relative;overflow:hidden;background:${C.tSun}">
  <div style="position:absolute;left:0;right:0;bottom:0;height:420px;background:#F7E7C2"></div>
  <div style="position:absolute;left:140px;top:120px;width:640px;height:${640 * 11 / 8.5}px;transform:rotate(-5deg)">
    <div style="position:absolute;inset:-26px -26px -26px -70px;background:${C.plum};border-radius:18px;box-shadow:0 30px 60px rgba(29,41,64,.25)"></div>
    ${[160, 400, 640].map(y => `<div style="position:absolute;left:-44px;top:${y}px;width:60px;height:22px;border-radius:11px;background:#C9D1DE;z-index:3"></div>`).join('')}
    <div class="pg" style="left:0;top:0;width:640px;height:${640 * 11 / 8.5}px"><img src="${pv(A['w-ball'])}"></div>
  </div>
  ${`<div class="pg" style="left:860px;top:150px;width:560px;height:${560 * 11 / 8.5}px;transform:rotate(4deg)"><img src="${pv(A['colorsort'])}"></div>`}
  ${pieceCard('w-duck', 'duck', 230, 200, -10, 820, 860)}${pieceCard('b-apple', 'apple', 220, 190, 6, 1080, 900)}${pieceCard('b-frog', 'frog', 210, 184, 14, 1320, 820)}
  <div style="position:absolute;left:1240px;top:40px" class="bchip"><i style="background:${C.grass}"></i>${S.activities} activities · ages 1–5</div>
</div>`;
fs.writeFileSync(path.join(__dirname, 'mockup.html'), doc('Toddler Busy Book mockup', MK, mock));

// ---------- PNG template set (for design apps), 300 dpi ----------
const assets = []; const names = [];
const add = (name, w, h, inner) => { names.push(name); assets.push(`<div class="asset" style="width:${w}px;height:${h}px;position:relative;overflow:hidden;background:#fff">${inner}</div>`); };
const blankCard = (w, h, t, c) => `<div style="position:absolute;inset:7px;border-radius:14px;background:${t}"></div><div style="position:absolute;left:14px;top:12px;width:40px;height:10px;border-radius:5px;background:${c}"></div>`;
['b1', 'b2', 'b3'].forEach(b => { add(`piece-card-2.25x2in-${BANDS[b].short}`, CELL.w, CELL.h, blankCard(CELL.w, CELL.h, BANDS[b].t, BANDS[b].c)); });
add('piece-card-3x2.5in-big-1-2', BIG.w, BIG.h, blankCard(BIG.w, BIG.h, BANDS.b1.t, BANDS.b1.c));
add('piece-card-2.25x2in-white', CELL.w, CELL.h, blankCard(CELL.w, CELL.h, C.wash, '#C9D1DE'));
['b1', 'b2', 'b3'].forEach(b => { const g = pieceGrid(Array.from({ length: 12 }, () => ({ raw: () => '', tint: BANDS[b].t })), CELL, 3, ''); add(`piece-sheet-12-cards-${BANDS[b].short}-7.25x10in`, 696, 960, `<div style="position:absolute;left:24px;top:96px">${g.svg}</div><div style="position:absolute;left:24px;top:30px;font-family:'Bricolage Grotesque';font-weight:800;font-size:22px">Pieces for page ___</div><div style="position:absolute;left:24px;right:24px;bottom:20px;font-size:12px;font-weight:800">Grown-up keeps the pieces · every piece 2 in (5.1 cm) or bigger</div>`); });
['b1', 'b2', 'b3'].forEach(b => add(`matching-board-6-slots-${BANDS[b].short}-7.25x6in`, 696, 576, `<div style="position:absolute;inset:0;border-radius:22px;background:${BANDS[b].t}"></div><div style="position:absolute;left:12px;top:54px;display:grid;grid-template-columns:repeat(3,${CELL.w}px);gap:36px 12px">${Array.from({ length: 6 }, () => `<div style="width:${CELL.w}px;height:${CELL.h}px;background:#fff;border:2px dashed #9AA6BC;border-radius:14px"></div>`).join('')}</div>`));
[['tomato', C.tomato], ['sky', C.sky], ['grass', C.grass], ['plum', C.plum]].forEach(([n, c]) => add(`binder-cover-${n}-7.25x10in`, 696, 960, `<div style="position:absolute;inset:0;border-radius:26px;background:${c}"></div><img src="${REL}brand/logo/lockup-horizontal-reverse.svg" style="position:absolute;left:40px;top:40px;height:34px"><div style="position:absolute;left:90px;right:90px;top:720px;height:110px;background:#fff;border-radius:22px"></div>`));
add('pouch-label-3.5x2in', 336, 192, `<div style="position:absolute;inset:10px;border-radius:14px;background:${C.tSky}"></div><div style="position:absolute;left:22px;top:20px;background:${C.sky};color:#fff;border-radius:12px;padding:3px 10px;font-weight:800;font-size:12px">Pieces for page</div><div style="position:absolute;left:22px;right:22px;bottom:22px;font-size:11px;font-weight:800;text-align:right">Grown-up keeps these</div>`);
add('word-card-blank-2.25x3in', 216, 288, `<div style="position:absolute;inset:7px;border-radius:16px;background:${C.wash}"></div><div style="position:absolute;left:20px;right:20px;top:20px;height:180px;border:2px dashed #C9D1DE;border-radius:12px;background:#fff"></div>`);
add('certificate-blank-7.25x10in', 696, 960, `<div style="position:absolute;inset:0;background:${C.tSun};border:10px solid ${C.sun};border-radius:26px"></div><svg style="position:absolute;left:258px;top:60px" width="180" height="180" viewBox="-90 -90 180 180"><circle r="86" fill="${C.sun}"/><path d="${star(62, 27)}" fill="#fff" stroke="#fff" stroke-width="8" stroke-linejoin="round"/></svg><div style="position:absolute;left:0;right:0;top:400px;text-align:center;font-family:'Bricolage Grotesque';font-weight:800;font-size:64px">Busy Book Star</div><img src="${REL}brand/logo/lockup-horizontal.svg" style="position:absolute;left:260px;bottom:50px;height:28px">`);
fs.writeFileSync(path.join(__dirname, 'png-templates.html'), doc('PNG templates', MK + '.asset{margin:10px}', assets.join('\n')));
fs.writeFileSync(path.join(__dirname, 'png-templates-manifest.json'), JSON.stringify(names, null, 1));
console.log(`listing images: ${L.length} | png templates: ${names.length}`);
