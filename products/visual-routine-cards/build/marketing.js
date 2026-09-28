// Cover, mockup and Etsy listing images (2000 x 2000) for Visual Routine Cards.
// node marketing.js  -> writes build/cover.html, build/mockup.html, build/listing.html, build/listing-starter.html
const fs = require('fs');
const path = require('path');
const bld = require('./build.js');
const { card, COLORWAYS } = require('./card.js');
const { CARDS, CATS } = require('./cards.js');
const { A } = require('./art.js');
const { C } = require('./base.js');
const FONT = '../../../brand/fonts/fonts.css';
const N = CARDS.length;
const byId = id => CARDS.find(c => c.id === id);
const cd = (id, cw = 'rainbow') => card(byId(id), cw);
const baseCss = bld.css('letter').replace('FONTHREF', FONT).replace(/@page \{[^}]*\}/, '');

const extra = `<style>
body{background:#fff}
.li{width:1000px;height:1000px;position:relative;overflow:hidden;font-family:"Nunito Sans",sans-serif;color:${C.ink};margin:0 0 20px}
.li h1{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;letter-spacing:-.035em;line-height:.95;margin:0}
.li .k{font-weight:800;font-size:15px;letter-spacing:.16em;text-transform:uppercase;color:${C.tomato}}
.pill{display:inline-block;background:#fff;border-radius:99px;padding:10px 18px;font-weight:800;font-size:19px;box-shadow:0 2px 0 rgba(29,41,64,.06)}
.pill.dark{background:${C.ink};color:#fff}
.sc{position:absolute;transform-origin:top left}
.shadow .card,.shadow.card{box-shadow:0 14px 30px rgba(29,41,64,.16)}
.paper{box-shadow:0 30px 60px rgba(29,41,64,.18),0 4px 10px rgba(29,41,64,.08);background:#fff}
.stat{border-radius:26px;padding:24px 26px;background:var(--t)}
.stat b{display:block;font-family:"Fredoka",sans-serif;font-weight:600;font-size:64px;line-height:1;color:var(--c)}
.stat span{display:block;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:25px;margin-top:6px;letter-spacing:-.01em}
.stat p{font-size:16px;line-height:1.4;margin-top:6px}
.foot2{position:absolute;left:60px;right:60px;bottom:40px;display:flex;justify-content:space-between;align-items:center;font-weight:800;font-size:17px}
.mk{width:800px;height:600px;position:relative;overflow:hidden;background:${C.wash}}
</style>`;
const head = t => `<!doctype html><html><head><meta charset="utf-8"><title>${t}</title>${baseCss}${extra}</head><body>`;
const scaled = (html, x, y, s, rot = 0, cls = '') => `<div class="sc ${cls}" style="left:${x}px;top:${y}px;transform:rotate(${rot}deg) scale(${s})">${html}</div>`;
const wm = `<span class="wm" style="font-size:22px"><span class="wm-dot" style="width:16px;height:16px;box-shadow:11px 0 0 ${C.sun},22px 0 0 ${C.sky};margin-right:24px"></span>Play Before Pixels</span>`;
const foot = (l = 'Instant download · Print at home') => `<div class="foot2"><span>${wm}</span><span style="opacity:.7">${l}</span></div>`;

// chart page with cards placed in its slots
function filledChart(html, ids, cw = 'rainbow') {
  let i = 0;
  return html.replace(/<span class="dot">[^<]*(<br>[^<]*)?<\/span>/g, m => (i < ids.length ? `<div style="position:relative">${cd(ids[i++], cw)}</div>` : m));
}
const morningIds = ['morning-wake-up', 'morning-potty', 'morning-get-dressed', 'meals-breakfast', 'morning-brush-teeth', 'morning-shoes-on', 'morning-coat-on', 'morning-pack-my-bag', 'screens-play-first'];
const bedIds = ['bath-bath-time', 'bedtime-pajamas', 'bedtime-brush-teeth', 'reading-bedtime-story', 'bedtime-lullaby', 'bedtime-cuddle', 'bedtime-lights-off', 'bedtime-sleep'];

// ---------------- cover.png source (page 1 of the PDF) ----------------
const coverHtml = `<!doctype html><html><head><meta charset="utf-8"><title>Cover</title>${baseCss}</head><body style="margin:0">${require('./card.js').DEFS}${bld.coverPage('full')}</body></html>`;

// ---------------- mockup (1600 x 1200) ----------------
const chartM = filledChart(bld.chartRoutine('rainbow', 'morning'), morningIds);
const mockup = `${head('Mockup')}${require('./card.js').DEFS}
<div class="mk">
  <div style="position:absolute;left:0;right:0;bottom:0;height:170px;background:#E7ECF4"></div>
  ${scaled(`<div class="paper">${chartM}</div>`, 52, 36, .5, -2.5)}
  ${scaled(`<div class="paper">${filledChart(bld.chartFirstThen('rainbow'), ['screens-play-first', 'screens-screens-later'])}</div>`, 395, 250, .36, 4)}
  ${scaled(cd('feelings-happy'), 520, 70, .62, 8, 'shadow')}
  ${scaled(cd('play-blocks'), 640, 40, .62, -6, 'shadow')}
  ${scaled(cd('outside-park'), 610, 150, .62, 5, 'shadow')}
  ${scaled(cd('bedtime-sleep'), 470, 470, .6, -9, 'shadow')}
  ${scaled(cd('bk-after-homework'), 640, 440, .6, 7, 'shadow')}
</div></body></html>`;

// ---------------- listing images ----------------
const L = [];
// 1 hero
L.push(`<div class="li" style="background:${C.tSun}">
  <div style="position:absolute;left:60px;top:56px;right:60px;display:flex;justify-content:space-between;align-items:center">${wm}<span class="pill dark">Ages 0–5 and 5–12</span></div>
  <h1 style="position:absolute;left:60px;top:130px;font-size:104px"><span style="color:${C.tomato}">200+</span> Visual<br>Routine Cards</h1>
  <p style="position:absolute;left:62px;top:356px;font-size:28px;font-weight:800;max-width:600px;line-height:1.25">Helps little ones see what comes next.</p>
  <div style="position:absolute;left:60px;top:430px;display:flex;gap:10px;flex-wrap:wrap;max-width:520px">${[`${N} cards`, '6 chart layouts', '4 colorways', 'Editable', 'Letter + A4'].map(s => `<span class="pill">${s}</span>`).join('')}</div>
  ${scaled(`<div class="paper" style="border-radius:4px">${filledChart(bld.chartRoutine('rainbow', 'morning'), morningIds)}</div>`, 560, 330, .47, 4)}
  ${scaled(cd('screens-play-first'), 70, 610, 1.15, -6, 'shadow')}
  ${scaled(cd('screens-screens-later'), 330, 640, 1.15, 5, 'shadow')}
</div>`);
// 2 what's inside
const stats = [
  [`${N}`, 'picture cards', '170 for ages 0–5 (plus all-ages feelings and plan words) and 58 big-kid cards for 5–12.', C.tomato, C.tTomato],
  ['6', 'chart layouts', 'Vertical and horizontal strips, first–then board, morning, bedtime and Today boards.', C.sky, C.tSky],
  ['4', 'colorways', 'Rainbow, Soft, Navy and an ink-saving Simple version.', C.grass, C.tGrass],
  ['✎', 'editable', 'Type-in PDF for Adobe Reader, blank cards and Canva-ready PNGs.', C.plum, C.tPlum],
  ['2', 'paper sizes', 'US Letter and A4. Monday and Sunday starts.', C.sun, C.tSun],
  ['1', 'parent guide', 'How to use by age, talk tips, laminating and velcro tips.', C.ink, C.wash],
];
L.push(`<div class="li" style="background:#fff">
  <div style="position:absolute;left:60px;top:56px"><div class="k">What's inside</div><h1 style="font-size:66px;margin-top:10px">Everything for mornings,<br>meals, play and bedtime</h1></div>
  <div style="position:absolute;left:60px;right:60px;top:290px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px">${stats.map(([n, h, p, c, t]) => `<div class="stat" style="--c:${c};--t:${t}"><b>${n}</b><span>${h}</span><p>${p}</p></div>`).join('')}</div>
  <div style="position:absolute;left:60px;right:60px;top:800px;display:flex;justify-content:space-between">${['morning-brush-teeth', 'meals-lunch', 'play-puzzle', 'outside-slide', 'reading-read-together', 'feelings-calm'].map(id => `<div style="width:132px;height:132px"><div style="transform:scale(.6);transform-origin:top left">${cd(id)}</div></div>`).join('')}</div>
</div>`);
// 3 ages 0-5 sample grid
const young = ['morning-wake-up', 'morning-get-dressed', 'meals-snack', 'play-blocks', 'play-pretend-cooking', 'outside-puddle-jumping', 'reading-library', 'bath-bath-time', 'bedtime-lullaby', 'helping-feed-the-pet', 'feelings-worried', 'about-grocery-store', 'words-first', 'words-then', 'outside-bug-spotting', 'play-play-dough'];
L.push(`<div class="li" style="background:${C.tSky}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">Ages 0–5</div><h1 style="font-size:62px;margin-top:8px">170 cards for little ones</h1><p style="font-size:21px;margin-top:10px;font-weight:700">Big, clear pictures a toddler recognizes at a glance. A diverse cast of kids and grown-ups.</p></div>
  <div style="position:absolute;left:60px;top:268px;display:grid;grid-template-columns:repeat(4,208px);gap:16px">${young.map(id => `<div style="width:208px;height:208px"><div style="transform:scale(.945);transform-origin:top left">${cd(id)}</div></div>`).join('')}</div>
</div>`);
// 4 ages 5-12
const big = ['bk-morning-wake-up-on-time', 'bk-morning-pack-my-lunch', 'bk-after-homework', 'bk-after-read-20-minutes', 'bk-after-practice-music', 'bk-evening-journal', 'bk-jobs-walk-the-dog', 'bk-evening-devices-sleep-outside', 'bk-jobs-take-out-trash'];
L.push(`<div class="li" style="background:${C.tGrass}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">Ages 5–12</div><h1 style="font-size:62px;margin-top:8px">58 big-kid cards +<br>weekly checklists</h1></div>
  <div style="position:absolute;left:60px;top:300px;display:grid;grid-template-columns:repeat(3,165px);gap:14px">${big.map(id => `<div style="width:165px;height:165px"><div style="transform:scale(.75);transform-origin:top left">${cd(id)}</div></div>`).join('')}</div>
  ${scaled(`<div class="paper">${bld.checklist('rainbow', 'morning', 'mon')}</div>`, 600, 250, .45, 3)}
  <p style="position:absolute;left:62px;top:880px;font-size:20px;font-weight:700;max-width:520px;line-height:1.35">Pre-filled and blank checklists with Monday and Sunday starts. Jobs and play first, screens later.</p>
</div>`);
// 5 six chart layouts
const charts = [
  [bld.chartStrip('rainbow'), 'Vertical strips'], [bld.chartHoriz('rainbow'), 'Horizontal strips'], [bld.chartFirstThen('rainbow'), 'First–then board'],
  [bld.chartRoutine('rainbow', 'morning'), 'Morning chart'], [bld.chartRoutine('rainbow', 'bedtime'), 'Bedtime chart'], [bld.chartToday('rainbow', 'mon'), 'Today board'],
];
L.push(`<div class="li" style="background:${C.wash}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">6 chart layouts</div><h1 style="font-size:62px;margin-top:8px">A chart for every stage</h1></div>
  <div style="position:absolute;left:60px;top:220px;display:grid;grid-template-columns:repeat(3,280px);gap:24px 30px">${charts.map(([h, t]) => `<div><div style="width:280px;height:362px;overflow:hidden;border-radius:6px" class="paper"><div style="transform:scale(${280 / 816});transform-origin:top left">${h}</div></div><div style="font-family:Fredoka,sans-serif;font-weight:600;font-size:22px;margin-top:10px;text-align:center">${t}</div></div>`).join('')}</div>
</div>`);
// 6 in use: bedtime chart filled
L.push(`<div class="li" style="background:${C.tPlum}">
  <div style="position:absolute;left:60px;top:52px;max-width:420px"><div class="k">See what comes next</div><h1 style="font-size:58px;margin-top:8px">Move each card to “all done”</h1><p style="font-size:21px;margin-top:16px;font-weight:700;line-height:1.4">Your child sees the plan, points to it and moves it. You get a calmer script: “What's next on your chart?”</p>
  <div style="margin-top:26px;background:#fff;border-radius:20px;padding:18px 20px;font-size:18px;line-height:1.4"><b style="display:block;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:${C.tomato};margin-bottom:4px">Talk tip on every chart</b>Pause and wait. Point to the next card and let them tell you what comes next.</div></div>
  ${scaled(`<div class="paper">${filledChart(bld.chartRoutine('rainbow', 'bedtime'), bedIds)}</div>`, 500, 90, .56, 2)}
</div>`);
// 7 play first / screens later + feelings
L.push(`<div class="li" style="background:#fff">
  <div style="position:absolute;left:60px;top:52px"><div class="k">Included</div><h1 style="font-size:62px;margin-top:8px">Play first, screens later</h1><p style="font-size:21px;margin-top:12px;font-weight:700;max-width:820px;line-height:1.4">A card pair for the moment every family knows. A plain, generic tablet: no brands, no apps.</p></div>
  ${scaled(cd('screens-play-first'), 110, 300, 1.55, -4, 'shadow')}
  ${scaled(cd('screens-screens-later'), 520, 310, 1.55, 4, 'shadow')}
  <div style="position:absolute;left:60px;right:60px;top:700px;background:${C.tPlum};border-radius:26px;padding:22px 26px;display:flex;gap:14px;align-items:center">
    ${['feelings-happy', 'feelings-sad', 'feelings-mad', 'feelings-tired', 'feelings-big-breath'].map(id => `<div style="width:118px;height:118px;flex:0 0 auto"><div style="transform:scale(.536);transform-origin:top left">${cd(id)}</div></div>`).join('')}
    <div style="font-size:19px;font-weight:700;line-height:1.35"><b style="font-family:'Bricolage Grotesque';font-size:24px;display:block">+ feelings check-in</b>16 feelings and 9 calm-down choices</div>
  </div>
</div>`);
// 8 colorways
const cwIds = ['morning-brush-teeth', 'play-blocks', 'bedtime-sleep', 'feelings-happy'];
L.push(`<div class="li" style="background:${C.wash}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">4 colorways</div><h1 style="font-size:62px;margin-top:8px">Pick the look you love</h1></div>
  <div style="position:absolute;left:60px;right:60px;top:210px;display:flex;flex-direction:column;gap:16px">${COLORWAYS.map(cw => `<div style="display:flex;align-items:center;gap:18px;background:#fff;border-radius:22px;padding:12px 18px"><div style="width:150px"><div style="font-family:'Bricolage Grotesque';font-weight:800;font-size:28px">${cw.name}</div><div style="font-size:15px;font-weight:700;opacity:.7">${cw.note}</div></div>${cwIds.map(id => `<div style="width:162px;height:162px"><div style="transform:scale(.736);transform-origin:top left">${cd(id, cw.id)}</div></div>`).join('')}</div>`).join('')}</div>
</div>`);
// 9 make it yours
L.push(`<div class="li" style="background:${C.tTomato}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">Make it yours</div><h1 style="font-size:62px;margin-top:8px">Your words, your routine</h1><p style="font-size:21px;margin-top:12px;font-weight:700;max-width:860px;line-height:1.4">Type into the editable PDF in free Adobe Acrobat Reader, write on blank cards, or edit the PNGs in Canva. Home languages and family words welcome.</p></div>
  <div style="position:absolute;left:60px;top:340px;display:flex;gap:22px">
    ${[['morning-wake-up', 'Rise and shine'], ['morning-potty', 'Toilet'], ['play-blocks', 'Bloques']].map(([id, w]) => `<div style="width:260px;height:260px"><div style="transform:scale(1.18);transform-origin:top left">${card(byId(id), 'rainbow').replace(/<div class="lab"[^>]*>[^<]*<\/div>/, `<div class="lab" style="font-family:Helvetica,Arial,sans-serif;font-weight:700;font-size:17px">${w}</div>`)}</div></div>`).join('')}
  </div>
  <div style="position:absolute;left:60px;right:60px;top:660px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
    ${[['Editable PDF', 'Type labels, chart titles and checklist jobs, then print.'], ['Blank cards', 'Draw it, write it or glue a family photo.'], ['Canva-ready PNGs', `All ${N} cards, art on transparent backgrounds, frames and chart backgrounds.`]].map(([h, p]) => `<div style="background:#fff;border-radius:22px;padding:20px 22px"><b style="font-family:'Bricolage Grotesque';font-size:25px;display:block">${h}</b><span style="font-size:17px;line-height:1.4;display:block;margin-top:6px">${p}</span></div>`).join('')}
  </div>
</div>`);
// 10 how to use + sizes and formats
L.push(`<div class="li" style="background:#fff">
  <div style="position:absolute;left:60px;top:52px"><div class="k">How to use · sizes and formats</div><h1 style="font-size:58px;margin-top:8px">Print, protect, stick, go</h1></div>
  <div style="position:absolute;left:60px;right:60px;top:200px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px">${[['1', 'Print', 'Cardstock, 100% / Actual size', C.sky, C.tSky], ['2', 'Laminate', '3–5 mil pouches, then cut', C.sun, C.tSun], ['3', 'Velcro', 'Hook dots on charts, loop dots on cards', C.grass, C.tGrass], ['4', 'All done!', 'Your child moves each card', C.tomato, C.tTomato]].map(([n, h, p, c, t]) => `<div class="stat" style="--c:${c};--t:${t};padding:20px"><b style="font-size:54px">${n}</b><span style="font-size:24px">${h}</span><p style="font-size:15.5px">${p}</p></div>`).join('')}</div>
  <div style="position:absolute;left:60px;right:60px;top:500px;display:grid;grid-template-columns:1.1fr 1fr;gap:20px">
    <div style="background:${C.wash};border-radius:24px;padding:24px 26px"><b style="font-family:'Bricolage Grotesque';font-size:28px">Files you download</b>
      <ul style="font-size:18px;line-height:1.55;margin:10px 0 0;padding-left:22px"><li>Complete PDF, US Letter (137 pages)</li><li>Complete PDF, A4 (137 pages)</li><li>Editable PDFs, Letter + A4 (zip)</li><li>Canva-ready card PNGs (zip)</li><li>Canva-ready chart PNGs (zip)</li></ul></div>
    <div style="background:${C.tSun};border-radius:24px;padding:24px 26px;display:flex;flex-direction:column;align-items:center;text-align:center"><div style="width:190px;height:190px;border:3px dashed ${C.ink};border-radius:22px;display:flex;align-items:center;justify-content:center;font-family:Fredoka,sans-serif;font-weight:600;font-size:34px;line-height:1.05">2.2 in<br><span style="font-size:22px">5.6 cm</span></div><p style="font-size:17px;font-weight:700;margin-top:14px;line-height:1.35">Every card, on both paper sizes. Bigger than a toilet-paper tube opening, for little hands.</p></div>
  </div>
  <p style="position:absolute;left:60px;right:60px;top:900px;font-size:15px;opacity:.75;line-height:1.4">Digital download. No physical item ships. For personal, single-family use. Always use with adult supervision.</p>
</div>`);

// ---------------- starter listing images ----------------
const S = CARDS.filter(c => c.starter);
const LS = [];
LS.push(`<div class="li" style="background:${C.tSky}">
  <div style="position:absolute;left:60px;top:56px;right:60px;display:flex;justify-content:space-between;align-items:center">${wm}<span class="pill dark">Ages 0–5</span></div>
  <h1 style="position:absolute;left:60px;top:130px;font-size:104px"><span style="color:${C.tomato}">60</span> Visual<br>Routine Cards</h1>
  <p style="position:absolute;left:62px;top:356px;font-size:28px;font-weight:800;max-width:640px;line-height:1.25">Starter Set. Helps little ones see what comes next.</p>
  <div style="position:absolute;left:60px;top:430px;display:flex;gap:10px;flex-wrap:wrap;max-width:560px">${['60 cards', '3 charts', 'Play first / screens later', 'Letter + A4'].map(s => `<span class="pill">${s}</span>`).join('')}</div>
  ${scaled(`<div class="paper">${filledChart(bld.chartStrip('rainbow'), ['morning-brush-teeth', 'morning-get-dressed', 'morning-shoes-on', 'screens-play-first'])}</div>`, 610, 330, .46, 3)}
  ${scaled(cd('bedtime-sleep'), 80, 620, 1.1, -6, 'shadow')}
  ${scaled(cd('meals-breakfast'), 330, 650, 1.1, 5, 'shadow')}
</div>`);
LS.push(`<div class="li" style="background:#fff">
  <div style="position:absolute;left:60px;top:48px"><div class="k">What's inside</div><h1 style="font-size:56px;margin-top:8px">The 60 cards families use most</h1></div>
  <div style="position:absolute;left:60px;top:190px;display:grid;grid-template-columns:repeat(10,82px);gap:6px">${S.map(c => `<div style="width:82px;height:82px"><div style="transform:scale(.3727);transform-origin:top left">${card(c, 'rainbow')}</div></div>`).join('')}</div>
  <div style="position:absolute;left:60px;right:60px;top:760px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px">${[['60 cards', 'Rainbow and ink-saving Simple versions', C.tomato, C.tTomato], ['3 charts', 'Vertical strip, first–then board, morning chart', C.sky, C.tSky], ['Guide', 'Use by age, talk tips, laminating and safety', C.grass, C.tGrass]].map(([h, p, c, t]) => `<div class="stat" style="--c:${c};--t:${t};padding:18px 20px"><span style="margin:0">${h}</span><p>${p}</p></div>`).join('')}</div>
</div>`);
LS.push(`<div class="li" style="background:${C.tSun}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">Want the complete set?</div><h1 style="font-size:58px;margin-top:8px">Starter vs. Complete</h1></div>
  <div style="position:absolute;left:60px;right:60px;top:220px;display:grid;grid-template-columns:1fr 1fr;gap:20px">${[['Starter Set', ['60 cards, ages 0–5', '3 chart layouts', '2 colorways', 'US Letter + A4'], '#fff'], ['Complete Set', [`${N} cards, ages 0–5 and 5–12`, '6 chart layouts + checklists', '4 colorways', 'Editable PDF + Canva PNGs', 'Monday and Sunday starts', 'US Letter + A4'], '#fff']].map(([h, items, bg], i) => `<div style="background:${bg};border-radius:26px;padding:28px;${i ? `border:4px solid ${C.tomato}` : ''}"><b style="font-family:'Bricolage Grotesque';font-size:36px">${h}</b><ul style="font-size:21px;line-height:1.6;padding-left:24px;margin:14px 0 0">${items.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>
  <p style="position:absolute;left:60px;right:60px;top:880px;font-size:15px;opacity:.75;line-height:1.4">Digital download. No physical item ships. Cards are 2.2 in (5.6 cm). Always use with adult supervision.</p>
</div>`);

const defs = require('./card.js').DEFS;
fs.writeFileSync(path.join(__dirname, 'cover.html'), coverHtml.replace('FONTHREF', FONT));
fs.writeFileSync(path.join(__dirname, 'mockup.html'), mockup);
fs.writeFileSync(path.join(__dirname, 'listing.html'), `${head('Listing images')}${defs}${L.join('\n')}</body></html>`);
fs.writeFileSync(path.join(__dirname, 'listing-starter.html'), `${head('Starter listing images')}${defs}${LS.join('\n')}</body></html>`);
console.log('listing images', L.length, 'starter', LS.length);
