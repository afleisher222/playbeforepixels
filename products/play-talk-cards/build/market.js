// node build/market.js  (run after render-all.js, which makes the preview PNGs used here)
// Writes preview/listing-images/0N-*.png (2000 x 2000) and mockup.png (1600 x 1200) for both products.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const K = require('./cards.js');
const { C, ICONS, SHAPE, KIDS, ADULTS, kid, adult, use } = require('./art.js');
const { BANDS, MOVES, MOMENTS, HABITS } = require('./content.js');
const { logoRel, fontRel } = require('./build.js');

const HERE = __dirname, ROOT = path.resolve(HERE, '..'), REPO = path.resolve(ROOT, '../..');
const GEN = path.join(HERE, 'gen', 'market');
fs.mkdirSync(GEN, { recursive: true });
const RENDER = path.join(REPO, 'brand/render.js');
const run = (...a) => execFileSync('node', [RENDER, ...a], { stdio: 'inherit' });
K.setLogoBase(logoRel(GEN));
const rel = p => path.relative(GEN, p).split(path.sep).join('/');

const CSS = `*{box-sizing:border-box}html,body{margin:0;-webkit-print-color-adjust:exact}
body{font-family:"Nunito Sans",sans-serif;color:${C.ink}}
${K.CARD_CSS}
.sq{width:1000px;height:1000px;position:relative;overflow:hidden}
.h{position:absolute;left:64px;right:64px;top:60px}
.h .k{margin:0 0 10px;font-weight:800;font-size:17px;letter-spacing:.16em;text-transform:uppercase}
.h h1{margin:0;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:66px;line-height:.98;letter-spacing:-.03em}
.h p{margin:14px 0 0;font-size:24px;line-height:1.35;font-weight:700;max-width:760px}
.n52{display:inline-block;background:${C.tomato};color:#fff;border-radius:16px;padding:0 12px 3px;line-height:1.02}
.card{box-shadow:0 10px 26px rgba(29,41,64,.16),0 2px 6px rgba(29,41,64,.10);border-radius:6px}
.abs{position:absolute}
.band{position:absolute;left:0;right:0;bottom:0;height:86px;background:${C.ink};color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 64px;font-weight:800;font-size:21px}
.band span{opacity:.95}.band img{height:36px}
.pill{display:inline-flex;align-items:center;gap:8px;background:#fff;border-radius:99px;padding:8px 18px;font-weight:800;font-size:19px}
.fanw{position:absolute;width:0;height:0}
.fanw .fc{position:absolute;left:-120px;top:-168px}
.list{list-style:none;margin:0;padding:0}
.logo{position:absolute;right:64px;top:64px;height:40px}
`;
const page = (body, title) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title><link rel="stylesheet" href="${fontRel(GEN)}"><style>${CSS}</style></head><body>${K.defs()}${body}</body></html>`;
function fan(cards, cx, cy, scale, spread = 130, rot = 8) {
  const n = cards.length, mid = (n - 1) / 2;
  return `<div class="fanw" style="left:${cx}px;top:${cy}px">${cards.map((h, i) => {
    const o = i - mid;
    return `<div class="fc" style="transform:translate(${o * spread}px,${Math.abs(o) * Math.abs(o) * 14}px) rotate(${o * rot}deg) scale(${scale});z-index:${10 - Math.abs(Math.round(o))}">${h}</div>`;
  }).join('')}</div>`;
}
const at = (h, x, y, s = 1, r = 0, z = 1) => `<div class="abs" style="left:${x}px;top:${y}px;transform:rotate(${r}deg) scale(${s});transform-origin:0 0;z-index:${z}">${h}</div>`;
const sheetImg = (src, x, y, w, r) => `<img src="${rel(src)}" class="abs" style="left:${x}px;top:${y}px;width:${w}px;transform:rotate(${r}deg);box-shadow:0 18px 40px rgba(29,41,64,.18),0 3px 8px rgba(29,41,64,.10);border-radius:3px">`;
const speech = (col, px) => K.speech(col, px);

function imagesA() {
  const D = K.DECK_A, cA = i => K.cardA(D[i], 0), prev = n => path.join(ROOT, 'preview', `p${String(n).padStart(2, '0')}.png`);
  const out = [];
  out.push(['01-hero', `<div class="sq" style="background:${C.sun}">
    <div class="h"><p class="k">Printable card deck · Ages 0–5</p><h1><span class="n52">52</span> Play &amp; Talk Cards</h1><p>One play and one talk tip on every card, for babies, toddlers and preschoolers.</p></div>
    ${fan([cA(3), cA(16), cA(29), cA(44), cA(50)], 500, 545, 1.22, 160, 9)}
    <div class="band"><span>Printable PDF · US Letter + A4 · Instant download, nothing ships</span><img src="${K.LOGO.lockupWhite}" alt=""></div></div>`]);
  // anatomy
  const s = 2.0, cx = 84, cy = 248;
  const marks = [[8, 12, 1], [240 - 62, 12, 2], [4, 142, 3], [4, 175, 4], [4, 268, 5], [4, 306, 6]];
  const notes = [['Age color and shape', 'Find your child’s color at a glance.'], ['Card number', 'All 52 plays are numbered for the tracker.'], ['What you need', 'Things you already have at home.'], ['The play', 'Short, clear steps. Five minutes or more.'], ['Talk tip', 'One plain-words idea for back-and-forth talk.'], ['Safety note', 'Built in, on every single card.']];
  out.push(['02-every-card', `<div class="sq" style="background:${C.wash}">
    <div class="h"><p class="k" style="color:${C.tomato}">On every card</p><h1>A play. A talk tip.<br>A safety note.</h1></div>
    ${at(K.cardA(D[33], 0), cx, cy, s)}
    ${marks.map(([x, y, n]) => `<span class="abs" style="left:${cx + x * s - 18}px;top:${cy + y * s - 4}px;width:36px;height:36px;border-radius:50%;background:${C.ink};color:#fff;font:600 19px Fredoka,sans-serif;display:flex;align-items:center;justify-content:center;z-index:5;box-shadow:0 0 0 4px #fff">${n}</span>`).join('')}
    <ol class="list abs" style="left:620px;right:56px;top:300px">${notes.map(([a, b], i) => `<li style="display:flex;gap:14px;margin-bottom:24px"><span style="flex:none;width:36px;height:36px;border-radius:50%;background:${C.ink};color:#fff;font:600 19px Fredoka,sans-serif;display:flex;align-items:center;justify-content:center">${i + 1}</span><span><b style="display:block;font-size:22px;font-weight:800">${a}</b><span style="font-size:18px;line-height:1.35">${b}</span></span></li>`).join('')}</ol></div>`]);
  // age-coded
  const picks = [5, 21, 31, 46];
  out.push(['03-age-coded', `<div class="sq" style="background:#fff">
    <div class="h"><p class="k" style="color:${C.tomato}">Sorted by age</p><h1>Age-coded from<br>babies to preschool</h1><p>Four colors, four shapes, 13 plays each. Pick your child’s color and go.</p></div>
    ${picks.map((i, j) => at(cA(i), 52 + j * 232, 430, .86)).join('')}
    ${BANDS.map((b, j) => `<div class="abs" style="left:${52 + j * 232}px;top:740px;width:206px;text-align:center"><div style="display:inline-flex;align-items:center;gap:8px;font:600 34px Fredoka,sans-serif">${K.shapeSvg(b.shape, C[b.color], 26)}${b.ages}</div><div style="font-size:18px;font-weight:800;margin-top:2px">${b.label}</div><div style="font-size:15px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;opacity:.6;margin-top:4px">13 plays</div></div>`).join('')}
    <div class="band" style="background:${C.wash};color:${C.ink};justify-content:center"><span>Ages are a guide, not a rule. Play any card that fits your child today.</span></div></div>`]);
  out.push(printImage('A', prev(5), C.tSky));
  // talk moves
  const mcol = [C.tomato, C.sun, C.sky, C.grass, C.plum, C.tomato, C.sun, C.sky];
  out.push(['05-talk-moves', `<div class="sq" style="background:${C.tGrass}">
    <div class="h"><p class="k" style="color:${C.grass}">Talk while you play</p><h1>8 simple talk moves,<br>in plain words</h1></div>
    <div class="abs" style="left:64px;right:64px;top:300px;display:grid;grid-template-columns:1fr 1fr;gap:16px">${Object.values(MOVES).map((m, i) => `<div style="background:#fff;border-radius:20px;padding:18px 22px;display:flex;gap:14px;align-items:flex-start">${speech(mcol[i], 40)}<div><b style="font-size:23px;font-weight:800">${m.name}</b><p style="margin:4px 0 0;font-size:17px;line-height:1.35">${m.how}</p></div></div>`).join('')}</div></div>`]);
  out.push(includedImage('A', [[1, 'Cover and contents'], [2, 'Grown-up guide'], [4, '6 card sheets'], [11, 'Make-your-own cards'], [12, '52-week tracker'], [13, 'Free bonus + what’s next']], C.wash,
    ['54 poker-size cards (52 plays + how-to + blank)', 'Card backs · cut lines · type-in blank cards', '4 PDFs: US Letter + A4, full color + ink-saver']));
  // safety
  out.push(['07-safety', `<div class="sq" style="background:${C.tTomato}">
    <div class="h"><p class="k" style="color:${C.tomato}">Safety built in</p><h1>Simple safety basics<br>on every card</h1></div>
    <ul class="list abs" style="left:64px;top:300px;width:520px">${['A grown-up plays along and stays within reach, every time.', 'Under 3: every object is bigger than a toilet-paper tube opening.', 'Water play: a grown-up within arm’s reach the whole time.', 'No balloons, no long cords or strings, no choking-risk foods.', 'Check boxes and toys for staples, tape and loose parts.'].map(t => `<li style="display:flex;gap:14px;align-items:flex-start;margin-bottom:22px;font-size:21px;line-height:1.38;font-weight:700">${K.shield(C.grass, 30)}<span>${t}</span></li>`).join('')}</ul>
    ${at(cA(17), 628, 330, 1.2, 5)}</div>`]);
  out.push(nextImage('A'));
  return out;
}

function imagesB() {
  const D = K.DECK_B, cB = i => K.cardB(D[i], 0), prev = n => path.join(ROOT, 'talk-along/preview', `p${String(n).padStart(2, '0')}.png`);
  const out = [];
  out.push(['01-hero', `<div class="sq" style="background:${C.sky}">
    <div class="h" style="color:#fff"><p class="k" style="color:${C.ink}">Printable conversation cards · Ages 5–12</p><h1 style="color:${C.ink}"><span class="n52">52</span> Family<br>Talk-Along Cards</h1><p style="color:${C.ink}">Good questions for dinner, the car, bath time and bedtime.</p></div>
    ${fan([cB(2), cB(15), cB(27), cB(40), cB(49)], 500, 575, 1.2, 160, 9)}
    <div class="band"><span>Printable PDF · US Letter + A4 · Instant download, nothing ships</span><img src="${K.LOGO.lockupWhite}" alt=""></div></div>`]);
  const s = 2.0, cx = 84, cy = 248;
  const marks = [[18, 16, 1], [240 - 62, 12, 2], [4, 160, 3], [4, 296, 4]];
  const notes = [['The moment', 'Dinner, car, bath or bedtime, color-coded.'], ['Card number', '52 questions, 13 for each moment.'], ['The question', 'Big, easy-to-read type. Kids can read it too.'], ['Grown-up tip', 'One line on how to keep the talk going.']];
  out.push(['02-every-card', `<div class="sq" style="background:${C.wash}">
    <div class="h"><p class="k" style="color:${C.tomato}">On every card</p><h1>A good question and<br>a grown-up tip</h1></div>
    ${at(K.cardB(D[5], 0), cx, cy, s)}
    ${marks.map(([x, y, n]) => `<span class="abs" style="left:${cx + x * s - 18}px;top:${cy + y * s - 4}px;width:36px;height:36px;border-radius:50%;background:${C.ink};color:#fff;font:600 19px Fredoka,sans-serif;display:flex;align-items:center;justify-content:center;z-index:5;box-shadow:0 0 0 4px #fff">${n}</span>`).join('')}
    <ol class="list abs" style="left:620px;right:56px;top:280px">${notes.map(([a, b], i) => `<li style="display:flex;gap:14px;margin-bottom:34px"><span style="flex:none;width:36px;height:36px;border-radius:50%;background:${C.ink};color:#fff;font:600 19px Fredoka,sans-serif;display:flex;align-items:center;justify-content:center">${i + 1}</span><span><b style="display:block;font-size:22px;font-weight:800">${a}</b><span style="font-size:18px;line-height:1.35">${b}</span></span></li>`).join('')}</ol></div>`]);
  out.push(['03-four-moments', `<div class="sq" style="background:#fff">
    <div class="h"><p class="k" style="color:${C.tomato}">Organized by moment</p><h1>Four everyday moments,<br>13 cards each</h1><p>The talk happens where you already are. No planning needed.</p></div>
    ${[7, 20, 33, 42].map((i, j) => at(cB(i), 52 + j * 232, 430, .86)).join('')}
    ${MOMENTS.map((m, j) => `<div class="abs" style="left:${52 + j * 232}px;top:740px;width:206px;text-align:center"><div style="font:800 30px 'Bricolage Grotesque',sans-serif;color:${C[m.color] === C.sun ? C.ink : C[m.color]}">${m.name}</div><div style="font-size:16px;font-weight:700;margin-top:4px;line-height:1.3">${m.where}</div></div>`).join('')}
    <div class="band" style="background:${C.wash};color:${C.ink};justify-content:center"><span>For ages 5–12 · grown-ups answer too · “pass” is always allowed</span></div></div>`]);
  out.push(printImage('B', prev(5), C.tSun));
  const hcol = [C.tomato, C.sun, C.sky, C.plum, C.grass, C.tomato];
  out.push(['05-talk-habits', `<div class="sq" style="background:${C.tPlum}">
    <div class="h"><p class="k" style="color:${C.plum}">Grown-up guide inside</p><h1>6 easy talk-along<br>habits</h1></div>
    <div class="abs" style="left:64px;right:64px;top:300px;display:grid;grid-template-columns:1fr 1fr;gap:18px">${HABITS.map((h, i) => `<div style="background:#fff;border-radius:20px;padding:22px 24px;display:flex;gap:14px;align-items:flex-start">${speech(hcol[i], 40)}<div><b style="font-size:24px;font-weight:800">${h.name}</b><p style="margin:4px 0 0;font-size:18px;line-height:1.35">${h.how}</p></div></div>`).join('')}</div></div>`]);
  out.push(includedImage('B', [[1, 'Cover and contents'], [2, 'Grown-up guide'], [4, '6 card sheets'], [11, 'Make-your-own cards'], [12, 'Labels + weekly check'], [13, 'Free bonus + what’s next']], C.wash,
    ['54 poker-size cards (52 questions + how-to + blank)', 'Card backs · cut lines · type-in blank cards', '4 PDFs: US Letter + A4, full color + ink-saver']));
  out.push(['07-real-life', `<div class="sq" style="background:${C.wash}">
    <div class="h"><p class="k" style="color:${C.tomato}">Made for real life</p><h1>Keep them where<br>the talking happens</h1></div>
    <div class="abs" style="left:64px;right:64px;top:300px;display:grid;grid-template-columns:1fr 1fr;gap:18px">${[
      ['dinner', 'A jar on the table', 'One card per meal. Everyone answers, grown-ups first.'],
      ['car', 'The glove box', 'A passenger reads; the driver just talks. Great for traffic.'],
      ['bath', 'A zip bag by the sink', 'Stay with your child. Warm water, calm voices, gentle questions.'],
      ['bedtime', 'The nightstand', 'Three good things, a brave moment, a dream to pick.'],
    ].map(([k, a, b]) => { const m = MOMENTS.find(x => x.key === k); return `<div style="background:#fff;border-radius:22px;padding:22px;border-top:10px solid ${C[m.color]}"><div style="display:flex;align-items:center;gap:14px"><span style="width:84px;height:84px;border-radius:50%;background:${K.TINT[m.color]};display:flex;align-items:center;justify-content:center"><svg viewBox="-58 -58 116 116" width="66" height="66">${ICONS[m.icon]()}</svg></span><b style="font:800 26px 'Bricolage Grotesque',sans-serif">${a}</b></div><p style="margin:12px 0 0;font-size:19px;line-height:1.4;font-weight:600">${b}</p></div>`; }).join('')}</div></div>`]);
  out.push(nextImage('B'));
  return out;
}

function printImage(key, sheetPng, bg) {
  const steps = [['Print', 'At Actual size (100%), on cardstock if you have it.'], ['Cut', 'Nine poker-size cards per page, with cut lines.'], ['Play', 'Keep them in a box, a zip bag or on a ring.']];
  return ['04-print-at-home', `<div class="sq" style="background:${bg}">
    <div class="h"><p class="k" style="color:${C.ink};opacity:.7">Print at home</p><h1>Print, cut, ${key === 'A' ? 'play' : 'talk'}</h1></div>
    ${sheetImg(sheetPng, 70, 250, 470, -4)}
    <ol class="list abs" style="left:600px;right:56px;top:270px">${steps.map(([a, b], i) => `<li style="display:flex;gap:16px;margin-bottom:30px"><span style="flex:none;width:44px;height:44px;border-radius:50%;background:${[C.tomato, C.sky, C.grass][i]};color:#fff;font:600 23px Fredoka,sans-serif;display:flex;align-items:center;justify-content:center">${i + 1}</span><span><b style="display:block;font:800 28px 'Bricolage Grotesque',sans-serif">${a}</b><span style="font-size:19px;line-height:1.38">${b}</span></span></li>`).join('')}</ol>
    <div class="abs" style="left:600px;right:40px;top:700px;display:flex;flex-wrap:wrap;gap:10px">${['2.5 × 3.5 in poker size', 'US Letter + A4', 'Ink-saver version', 'Type-in blank cards'].map(t => `<span class="pill">${t}</span>`).join('')}</div></div>`];
}
function includedImage(key, pages, bg, bullets) {
  const dir = key === 'A' ? path.join(ROOT, 'preview') : path.join(ROOT, 'talk-along/preview');
  return ['06-whats-included', `<div class="sq" style="background:${bg}">
    <div class="h"><p class="k" style="color:${C.tomato}">Instant download</p><h1>What’s inside</h1></div>
    <div class="abs" style="left:64px;right:64px;top:210px;display:grid;grid-template-columns:repeat(3,1fr);gap:26px 30px">${pages.map(([n, t]) => `<div><img src="${rel(path.join(dir, `p${String(n).padStart(2, '0')}.png`))}" style="width:100%;display:block;border-radius:4px;box-shadow:0 10px 24px rgba(29,41,64,.14)"><p style="margin:10px 0 0;font-size:18px;font-weight:800;text-align:center">${t}</p></div>`).join('')}</div>
    <ul class="list abs" style="left:64px;right:64px;bottom:40px;display:flex;justify-content:space-between;gap:14px">${bullets.map(b => `<li style="flex:1;background:#fff;border-radius:16px;padding:12px 14px;font-size:16.5px;font-weight:800;line-height:1.3;text-align:center">${b}</li>`).join('')}</ul></div>`];
}
function nextImage(key) {
  const A = K.DECK_A, B = K.DECK_B;
  const left = key === 'A' ? [K.cardA(A[8], 0), K.cardA(A[27], 0)] : [K.cardB(B[3], 0), K.cardB(B[41], 0)];
  const right = key === 'A' ? [K.cardB(B[3], 0), K.cardB(B[41], 0)] : [K.cardA(A[8], 0), K.cardA(A[27], 0)];
  const lt = key === 'A' ? ['Ages 0–5', '52 Play & Talk Cards'] : ['Ages 5–12', '52 Family Talk-Along Cards'];
  const rt = key === 'A' ? ['Ages 5–12', 'Family Talk-Along Cards'] : ['Ages 0–5', 'Play & Talk Cards'];
  return ['08-grow-with-it', `<div class="sq" style="background:${C.tPlum}">
    <div class="h"><p class="k" style="color:${C.plum}">One brand, every age</p><h1>${key === 'A' ? 'Ready for the next stage' : 'Little ones at home too?'}</h1><p>${key === 'A' ? 'When the little ones grow, the talk keeps going with Family Talk-Along Cards for ages 5–12.' : 'Play & Talk Cards give babies, toddlers and preschoolers one play and one talk tip per card.'}</p></div>
    ${fan(left, 270, 610, .92, 70, 7)}${fan(right, 730, 610, .92, 70, 7)}
    <svg class="abs" style="left:460px;top:560px" width="80" height="60" viewBox="0 0 80 60"><path d="M8 30H64M48 12L68 30L48 48" stroke="${C.plum}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <div class="abs" style="left:90px;top:830px;width:360px;text-align:center"><b style="font-size:18px;letter-spacing:.12em;text-transform:uppercase;opacity:.7">${lt[0]}</b><div style="font:800 25px 'Bricolage Grotesque',sans-serif">${lt[1]}</div></div>
    <div class="abs" style="left:550px;top:830px;width:360px;text-align:center"><b style="font-size:18px;letter-spacing:.12em;text-transform:uppercase;opacity:.7">${rt[0]}</b><div style="font:800 25px 'Bricolage Grotesque',sans-serif">${rt[1]}</div></div>
    <div class="band" style="background:${C.plum}"><span>Each sold separately · bundle both and save</span><img src="${K.LOGO.lockupWhite}" alt=""></div></div>`];
}

function mockup(key) {
  const sheet = key === 'A' ? path.join(ROOT, 'preview/p05.png') : path.join(ROOT, 'talk-along/preview/p04.png');
  const D = key === 'A' ? K.DECK_A : K.DECK_B, f = key === 'A' ? K.cardA : K.cardB;
  const picks = key === 'A' ? [2, 18, 30, 45] : [4, 16, 31, 47];
  const back = key === 'A' ? K.backA(0) : K.backB(0);
  return `<div style="width:800px;height:600px;position:relative;overflow:hidden;background:${C.wash}">
    <div class="abs" style="left:-40px;top:470px;width:900px;height:200px;background:#E8EDF5"></div>
    ${sheetImg(sheet, 60, 46, 330, -7)}
    ${at(back, 600, 70, .78, 12, 2)}${at(back, 606, 64, .78, 10, 3)}
    ${at(f(D[picks[0]], 0), 400, 92, .82, -8, 4)}
    ${at(f(D[picks[1]], 0), 520, 150, .82, 6, 5)}
    ${at(f(D[picks[2]], 0), 430, 300, .82, -3, 6)}
    ${at(f(D[picks[3]], 0), 590, 320, .82, 9, 7)}
  </div>`;
}

const jobs = [];
for (const [key, imgs, dir] of [['A', imagesA(), ROOT], ['B', imagesB(), path.join(ROOT, 'talk-along')]]) {
  const outDir = path.join(dir, 'preview/listing-images');
  fs.mkdirSync(outDir, { recursive: true });
  for (const [name, body] of imgs) {
    const f = path.join(GEN, `${key}-${name}.html`);
    fs.writeFileSync(f, page(body, name));
    run('png', f, path.join(outDir, `${name}.png`), '1000', '1000', '2');
  }
  const mf = path.join(GEN, `${key}-mockup.html`);
  fs.writeFileSync(mf, page(mockup(key), 'mockup'));
  run('png', mf, path.join(dir, 'mockup.png'), '800', '600', '2');
}
console.log('listing images and mockups written');
