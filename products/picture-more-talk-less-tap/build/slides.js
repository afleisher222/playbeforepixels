// Talk Tower projectable slides: 16:9 (13.333 x 7.5 in = 1280 x 720 CSS px), one idea per slide, huge type.
//   node build/slides.js -> ../source-slides.html (+ build/slides-count.json for the kit's contents page)
const fs = require('fs'); const path = require('path');
const A = require('../story-bonus/build/art.js');
const { C, R, Ci, E, P, L, U, G, SYMBOLS, kidAt, tower } = A;
const W = require('./words.js');
const { NAME, VERSION, BLOCK, glyph, topicIcon, LOGO, qrSvg } = require('./kitlib.js');
const svg = (vb, inner, style = '') => `<svg viewBox="${vb}" style="${style}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const slides = [];
const slide = (html, bg = '#fff', dark = false) => slides.push({ html, bg, dark });

// 1 title
slide(`<div class="title"><div class="tl">${LOGO('lockup-horizontal.svg', 44)}<h1>${NAME}</h1><p class="sub">Let’s build a tower, one turn at a time!</p>
  <div class="moves">${['q', 'j', 'i', 'l'].map(t => `<span style="background:${BLOCK[t].col};color:${BLOCK[t].ink}">${glyph(t, 36)}${BLOCK[t].word}</span>`).join('')}</div></div>
  <div class="tr">${svg('0 0 520 600', E(260, 580, 250, 20, C.wash) + tower(260, 580, ['q', 'j', 'i', 'l', 'q', 'i'], 1.05) + G('translate(262 120) scale(.7)', U('star')) + kidAt('leo', 'cheer', 90, 580, 0.95, 'laugh') + kidAt('zara', 'handup', 430, 580, 0.95, 'talk', true), 'width:100%;height:100%')}</div></div>`, C.tSun);
// 2 the blocks
slide(`<h2>How we build our ${NAME}</h2><div class="legend">${['q', 'j', 'i', 'l'].map(t => `<div class="lg" style="background:${BLOCK[t].tint}"><span class="big" style="background:${BLOCK[t].col}">${glyph(t, 110)}</span><b style="color:${BLOCK[t].dark}">${BLOCK[t].label}</b><p>${BLOCK[t].kid}</p></div>`).join('')}</div>`);
// 3 rules
slide(`<h2>Our ${NAME} rules</h2><div class="rules">
  <div><span style="background:${C.sun}">${svg('-60 -60 120 120', `<path d="${A.starPath(48, 25)}" fill="#fff" stroke="#fff" stroke-width="10" stroke-linejoin="round"/>`, 'width:70px;height:70px')}</span>One voice at a time.<small>Whoever holds the star takes a turn.</small></div>
  <div><span style="background:${C.sky}">${svg('0 0 100 100', `<text x="50" y="68" font-family="Fredoka, sans-serif" font-weight="700" font-size="44" fill="#fff" text-anchor="middle">pass</text>`, 'width:80px;height:80px')}</span>“Pass” is OK.<small>You can listen and try next time.</small></div>
  <div><span style="background:${C.plum}">${svg('0 0 100 100', `<path d="M14 22 a12 12 0 0 1 12 -12 h48 a12 12 0 0 1 12 12 v32 a12 12 0 0 1 -12 12 h-30 l-16 16 v-16 h-2 a12 12 0 0 1 -12 -12Z" fill="#fff"/><circle cx="34" cy="38" r="6" fill="${C.plum}"/><circle cx="50" cy="38" r="6" fill="${C.plum}"/><circle cx="66" cy="38" r="6" fill="${C.plum}"/>`, 'width:80px;height:80px')}</span>Every way of talking counts.<small>Words, signs, pointing, pictures and devices.</small></div>
  <div><span style="background:${C.grass}">${svg('0 0 100 100', tower(50, 94, ['q', 'j', 'i'], 0.42), 'width:80px;height:80px')}</span>We build one tower together.<small>Every block helps our class.</small></div></div>`);
// 4-7 the four moves
const moveSlide = (t, lines, head) => slide(`<div class="move"><div class="mleft" style="background:${BLOCK[t].col};color:${BLOCK[t].ink}">${glyph(t, 230)}<b>${BLOCK[t].label}</b></div>
  <div class="mright"><h2>${head}</h2><ul>${lines.map(l => `<li style="border-color:${BLOCK[t].col}">${l}</li>`).join('')}</ul></div></div>`);
moveSlide('q', W.list('ask', 9).slice(0, 3), 'Ask a friend a question');
moveSlide('j', W.list('comment', 9).slice(0, 3), 'Say something back');
moveSlide('i', W.list('addone', 9).slice(0, 3), 'Add one more idea');
moveSlide('l', W.list('listen', 4).slice(0, 3), 'Listen to a friend');
// 8-16 topics
for (const l of W.list('topics', 9)) {
  const [lab, ic] = l.split('|').map(s => s.trim());
  slide(`<div class="topic"><p class="kick">Let’s talk about…</p><div class="ticon">${svg('-60 -60 120 120', topicIcon(ic || 'ball'), 'width:100%;height:100%')}</div><h1>${lab}</h1>
  <div class="moves small">${['q', 'j', 'i'].map(t => `<span style="background:${BLOCK[t].col};color:${BLOCK[t].ink}">${glyph(t, 30)}${BLOCK[t].word}</span>`).join('')}</div></div>`, C.wash);
}
// 17 whose turn
slide(`<div class="split"><div>${svg('-280 -280 560 540', `<path d="${A.starPath(230, 118)}" fill="${C.sun}" stroke="${C.sun}" stroke-width="30" stroke-linejoin="round"/>` + Ci(-40, -14, 14, C.ink) + Ci(40, -14, 14, C.ink) + L('M-30 26 Q0 50 30 26', C.ink, 11), 'width:100%;height:100%')}</div>
  <div><h1 class="xl">Whose turn?</h1><p class="say">Pass the Talking Star.<br>Whoever holds it takes a turn.<br>Everyone else listens.</p></div></div>`, C.tSky);
// 18 wobble
slide(`<div class="split"><div>${svg('0 0 300 330', G('rotate(-9 150 320)', tower(150, 320, ['q', 'j', 'i', 'l'], 1.0)) + A.motion(46, 70, 30, 200, C.tomato, 9) + A.motion(254, 70, 30, -20, C.tomato, 9) + A.motion(40, 130, 26, 180, C.tomato, 9) + A.motion(260, 130, 26, 0, C.tomato, 9), 'width:100%;height:100%')}</div>
  <div><h1 class="xl" style="color:${C.tomato}">Tower wobble!</h1><p class="say">One voice at a time.<br>Who has the star?</p></div></div>`, C.tTomato);
// 19 count
{
  let cells = '';
  const seq = ['q', 'j', 'i', 'l'];
  for (let i = 0; i < 20; i++) { const t = seq[i % 4]; cells += `<div class="cnt" style="border-color:${BLOCK[t].col};color:${BLOCK[t].dark}">${i + 1}</div>`; }
  slide(`<h2>Let’s count our tower!</h2><p class="lead">Point and count together. How many blocks did we build today?</p><div class="counts">${cells}</div>`);
}
// 20 closing
slide(`<div class="close"><h1>Great talking today!</h1><p class="say">We asked, we commented, we added one,<br>and we listened to our friends.</p>
  ${svg('0 0 900 260', E(450, 250, 420, 14, C.wash) + kidAt('priya', 'cheer', 150, 250, 0.9, 'laugh') + kidAt('milo', 'cheer', 330, 250, 0.9, 'laugh') + tower(450, 250, ['q', 'j', 'i'], 0.9) + kidAt('zara', 'cheer', 570, 250, 0.9, 'laugh', true) + kidAt('sam', 'cheer', 750, 250, 0.9, 'laugh', true), 'width:900px;height:260px')}
  <div class="closelogo">${LOGO('lockup-horizontal.svg', 40)}</div></div>`, C.tGrass);

const CSS = `
@page { size: 13.333in 7.5in; margin: 0 }
* { box-sizing: border-box } html, body { margin: 0; background: #fff }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-family: "Nunito Sans", sans-serif; color: ${C.ink} }
.page { width: 13.333in; height: 7.5in; padding: .45in .55in .3in; position: relative; overflow: hidden; display: flex; flex-direction: column; break-after: page }
.page:last-child { break-after: auto }
.sbody { flex: 1; min-height: 0; display: flex; flex-direction: column }
.sfoot { flex: none; height: 22px; display: flex; align-items: center; justify-content: space-between; font-size: 10px; color: rgba(29,41,64,.6); margin-top: 6px }
.sfoot span:first-child { display: flex; align-items: center; gap: 8px; font-weight: 700 }
.logo { display: block }
h1, h2 { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; margin: 0; letter-spacing: -1.5px; line-height: 1 }
h2 { font-size: 56px; margin-bottom: 26px }
.lead { font-size: 24px; margin: -12px 0 22px }
.title { flex: 1; display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: 20px }
.title h1 { font-size: 150px; letter-spacing: -5px; margin: 30px 0 10px }
.title .sub { font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 34px; margin: 0 0 30px }
.title .tr { height: 100% }
.moves { display: flex; gap: 12px; flex-wrap: wrap }
.moves span { display: inline-flex; align-items: center; gap: 5px; padding: 7px 16px 7px 10px; border-radius: 16px; font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 24px }
.moves.small span { font-size: 26px }
.legend { flex: 1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px }
.lg { border-radius: 26px; padding: 28px 18px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center }
.lg .big { width: 190px; height: 130px; border-radius: 22px; display: flex; align-items: center; justify-content: center; margin-bottom: 22px }
.lg b { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 38px } .lg p { font-family: "Fredoka", sans-serif; font-weight: 500; font-size: 24px; margin: 10px 0 0; line-height: 1.2 }
.rules { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 20px }
.rules div { background: ${C.wash}; border-radius: 24px; display: flex; flex-direction: column; justify-content: center; padding: 0 30px 0 150px; position: relative; font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 38px; line-height: 1.1 }
.rules span { position: absolute; left: 28px; top: 50%; transform: translateY(-50%); width: 100px; height: 100px; border-radius: 24px; display: flex; align-items: center; justify-content: center }
.rules small { font-family: "Nunito Sans", sans-serif; font-weight: 600; font-size: 21px; margin-top: 8px }
.move { flex: 1; display: grid; grid-template-columns: 4.3in 1fr; gap: 40px; align-items: stretch }
.mleft { border-radius: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px }
.mleft b { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 66px; letter-spacing: 1px }
.mright { display: flex; flex-direction: column; justify-content: center } .mright h2 { font-size: 54px }
.mright ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 16px }
.mright li { border: 5px solid; border-radius: 22px; padding: 18px 26px; font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 36px; line-height: 1.15 }
.topic { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center }
.topic .kick { font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 34px; margin: 0 }
.topic .ticon { width: 250px; height: 250px; margin: 6px 0 }
.topic h1 { font-size: 86px; margin-bottom: 26px }
.split { flex: 1; display: grid; grid-template-columns: 1fr 1.25fr; gap: 40px; align-items: center } .split > div:first-child { height: 100% }
.xl { font-size: 110px; letter-spacing: -3px; margin-bottom: 24px }
.say { font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 40px; line-height: 1.3; margin: 0 }
.counts { flex: 1; display: grid; grid-template-columns: repeat(10, 1fr); grid-template-rows: 1fr 1fr; gap: 16px }
.cnt { border: 6px solid; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 54px }
.close { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center }
.close h1 { font-size: 96px; margin-bottom: 16px } .closelogo { margin-top: 12px }
`;
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${NAME} slides (16:9) · Play Before Pixels</title>
<link rel="stylesheet" href="%BR%fonts/fonts.css"><style>${CSS}</style></head><body>${SYMBOLS()}
${slides.map((s, i) => `<section class="page" style="background:${s.bg}"><div class="sbody">${s.html}</div><div class="sfoot"><span>${LOGO('lockup-horizontal.svg', 16)}playbeforepixels.com</span><span>© 2026 AlphaPlay LLC · ${NAME} Classroom Game Kit · Licensed for one classroom. Please don’t share or post.</span><span>${VERSION} · ${i + 1}</span></div></section>`).join('\n')}
</body></html>`;
fs.writeFileSync(path.resolve(__dirname, '../source-slides.html'), html.split('%BR%').join('../../brand/'));
fs.writeFileSync(path.join(__dirname, 'slides-count.json'), JSON.stringify({ n: slides.length }));
console.log(`slides: ${slides.length}`);
