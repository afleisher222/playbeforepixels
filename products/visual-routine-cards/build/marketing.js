// Cover, mockup and Etsy listing images (2000 x 2000) for Visual Routine Cards.
// node marketing.js  -> writes build/cover.html, build/mockup.html, build/listing.html, build/listing-starter.html
const fs = require('fs');
const path = require('path');
const bld = require('./build.js');
const { card, COLORWAYS, DEFS_LO, lowPreview } = require('./card.js');
const { CARDS, CATS } = require('./cards.js');
const { A } = require('./art.js');
const { C } = require('./base.js');
const FONT = '../../../brand/fonts/fonts.css';
const N = CARDS.length;
const byId = id => CARDS.find(c => c.id === id);
const cd = (id, cw = 'rainbow') => card(byId(id), cw);
bld.setCtx({ store: false, low: false, tier: 'full' }); // listing images come from the Etsy edition: no URL, no QR
const baseCss = bld.css('letter').replace('FONTHREF', FONT).replace(/@page[^{]*\{[^}]*\}/g, '');

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
const wm = bld.sized(bld.LOGO.lock, '46px');
const foot = (l = 'Instant download · Print at home') => `<div class="foot2"><span>${wm}</span><span style="opacity:.7">${l}</span></div>`;

// chart page with cards placed in its slots
function filledChart(html, ids, cw = 'rainbow') {
  let i = 0;
  return html.replace(/<span class="dot">[^<]*(<br>[^<]*)?<\/span>/g, m => (i < ids.length ? `<div style="position:relative">${cd(ids[i++], cw)}</div>` : m));
}
const morningIds = ['morning-wake-up', 'morning-potty', 'morning-get-dressed', 'meals-breakfast', 'morning-brush-teeth', 'morning-shoes-on', 'morning-coat-on', 'morning-pack-my-bag', 'screens-play-first'];
const bedIds = ['bath-bath-time', 'bedtime-pajamas', 'bedtime-brush-teeth', 'reading-bedtime-story', 'bedtime-lullaby', 'bedtime-cuddle', 'bedtime-lights-off', 'bedtime-sleep'];

// ---------------- cover.png source (page 1 of the PDF) ----------------
// The website cover shows the Ages 0–5 edition: the only routine-card edition that launches (G0; business/GROWTH-ENGINE.md §8a).
bld.setCtx({ store: true, low: false, tier: 'g0' });
const coverHtml = `<!doctype html><html><head><meta charset="utf-8"><title>Cover</title>${baseCss}</head><body style="margin:0">${require('./card.js').DEFS}${bld.coverPage()}</body></html>`;
bld.setCtx({ store: false, low: false, tier: 'full' });

// ---------------- mockup (1600 x 1200) ----------------
const chartM = filledChart(bld.chartRoutine('rainbow', 'morning'), morningIds);
const mockup = `${head('Mockup')}${require('./card.js').DEFS}
<div class="mk">
  <div style="position:absolute;left:0;right:0;bottom:0;height:170px;background:#E7ECF4"></div>
  ${scaled(`<div class="paper">${chartM}</div>`, 52, 36, .5, -2.5)}
  ${scaled(`<div class="paper">${filledChart(bld.chartStrip('rainbow'), ['bath-bath-time', 'bedtime-pajamas', 'bedtime-brush-teeth', 'reading-bedtime-story', 'meals-dinner', 'play-play-time'])}</div>`, 478, 175, .375, 3)}
  ${scaled(cd('feelings-happy'), 520, 34, .52, -7, 'shadow')}
  ${scaled(cd('screens-play-first'), 640, 28, .52, 6, 'shadow')}
  ${scaled(cd('outside-slide'), 700, 470, .48, 9, 'shadow')}
</div></body></html>`;

// ---------------- listing images (Etsy edition) ----------------
// Order follows marketing/CUSTOMER-VOICE.md: image 2 = contents grid (rule 36), image 3 = a grown-up guide page (rule 27),
// last image = "How to download: use a browser, not the Etsy app" (rule 5).
const NY = bld.N_YOUNG, NB = bld.N_BIG;
const FEEL = CARDS.filter(c => c.cat === 'feelings' && /^f[A-Z]/.test(c.art)); // feeling faces; the rest are calm-down choices
const NFEEL = FEEL.length, NCALM = CARDS.filter(c => c.cat === 'feelings').length - NFEEL;
const pageImg = (html, w, land = false) => { const pw = land ? 1056 : 816, ph = land ? 816 : 1056; const s = w / pw; return `<div class="paper" style="width:${w}px;height:${Math.round(ph * s)}px;overflow:hidden;border-radius:6px"><div style="transform:scale(${s});transform-origin:top left">${html}</div></div>`; };
const L = [];
// 1 hero
L.push(`<div class="li" style="background:${C.tSun}">
  <div style="position:absolute;left:60px;top:50px;right:60px;display:flex;justify-content:space-between;align-items:center">${wm}<span class="pill dark">Ages 0–5 and 5–12</span></div>
  <h1 style="position:absolute;left:60px;top:130px;font-size:104px"><span style="color:${C.tomato}">${N}</span> Visual<br>Routine Cards</h1>
  <p style="position:absolute;left:62px;top:356px;font-size:30px;font-weight:800;width:460px;line-height:1.2">Helps little ones see what comes next.</p>
  <div style="position:absolute;left:60px;top:450px;display:flex;gap:10px;flex-wrap:wrap;max-width:500px">${[`${N} cards`, '6 chart layouts', '4 colorways', 'Fillable PDF', 'Letter + A4'].map(s => `<span class="pill">${s}</span>`).join('')}</div>
  ${scaled(`<div class="paper" style="border-radius:4px">${filledChart(bld.chartRoutine('rainbow', 'morning'), morningIds)}</div>`, 575, 360, .45, 4)}
  ${scaled(cd('screens-play-first'), 70, 610, 1.15, -6, 'shadow')}
  ${scaled(cd('screens-screens-later'), 330, 640, 1.15, 5, 'shadow')}
</div>`);
// 2 what's inside (contents grid)
const stats = [
  [`${N}`, 'picture cards', `${NY} for ages 0–5 (feelings, plan words and screens cards for all ages) and ${NB} big-kid cards for 5–12.`, C.tomato, C.tTomato],
  ['6', 'chart layouts', 'Strips, first–then board, morning, bedtime and Today boards, plus big-kid checklists.', C.sky, C.tSky],
  ['4', 'colorways', 'Rainbow, Soft and Navy, plus Simple in a separate low-ink file.', C.grass, C.tGrass],
  ['Aa', 'fillable', 'Type labels, chart titles, names and jobs in free Adobe Acrobat Reader.', C.plum, C.tPlum],
  ['+', 'extras', 'Second copies of busy cards, blank, word-free and photo-frame cards, storage labels.', '#B98200', C.tSun],
  ['2', 'guide pages', 'Set up in 2 minutes, talk tips, use by age, laminating and safety.', C.ink, C.wash],
];
L.push(`<div class="li" style="background:#fff">
  <div style="position:absolute;left:60px;top:56px"><div class="k">What's inside</div><h1 style="font-size:62px;margin-top:10px">${N} cards · 160 pages · 5 files</h1><p style="font-size:19px;font-weight:700;margin-top:10px;max-width:860px;line-height:1.4">Color file: 66 card pages, 21 word-free and photo pages, 63 chart pages, 10 guide and extras pages. Plus a Low-ink file and START HERE. US Letter and A4.</p></div>
  <div style="position:absolute;left:60px;right:60px;top:300px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px">${stats.map(([n, h, p, c, t]) => `<div class="stat" style="--c:${c};--t:${t}"><b>${n}</b><span>${h}</span><p>${p}</p></div>`).join('')}</div>
  <div style="position:absolute;left:60px;right:60px;top:800px;display:flex;justify-content:space-between">${['morning-brush-teeth', 'meals-lunch', 'play-puzzle', 'outside-slide', 'reading-read-together', 'feelings-calm'].map(id => `<div style="width:132px;height:132px"><div style="transform:scale(.6);transform-origin:top left">${cd(id)}</div></div>`).join('')}</div>
</div>`);
// 3 grown-up guide
L.push(`<div class="li" style="background:${C.wash}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">Grown-up guide inside</div><h1 style="font-size:58px;margin-top:8px">Set up in 2 minutes</h1><p style="font-size:20px;margin-top:10px;font-weight:700;max-width:860px;line-height:1.4">Plain-words guide: what your child is practicing, three easy talk tips, what to do if interest fades, and how to use the cards at every age.</p></div>
  ${scaled(pageImg(bld.welcomePage(), 400), 70, 300, 1, -2)}
  ${scaled(pageImg(bld.talkPage(), 400), 520, 320, 1, 2)}
</div>`);
// 4 ages 0-5 sample grid
const young = ['morning-wake-up', 'morning-get-dressed', 'meals-snack', 'play-blocks', 'play-pretend-cooking', 'outside-puddle-jumping', 'reading-library', 'bath-bath-time', 'bedtime-lullaby', 'helping-feed-the-pet', 'feelings-worried', 'about-grocery-store'];
L.push(`<div class="li" style="background:${C.tSky}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">Ages 0–5 and all ages</div><h1 style="font-size:62px;margin-top:8px">${NY} cards for little ones</h1><p style="font-size:21px;margin-top:10px;font-weight:700">Big, clear pictures a toddler recognizes at a glance. A diverse cast of kids and grown-ups.</p></div>
  <div style="position:absolute;left:60px;top:285px;display:grid;grid-template-columns:repeat(4,208px);gap:22px 16px">${young.map(id => `<div style="width:208px;height:208px"><div style="transform:scale(.945);transform-origin:top left">${cd(id)}</div></div>`).join('')}</div>
</div>`);
// 5 ages 5-12
const big = ['bk-morning-wake-up-on-time', 'bk-morning-pack-my-lunch', 'bk-after-homework', 'bk-after-read-20-minutes', 'bk-after-practice-music', 'bk-evening-journal', 'bk-jobs-walk-the-dog', 'bk-evening-devices-sleep-outside-my-room', 'bk-jobs-take-out-trash'];
L.push(`<div class="li" style="background:${C.tGrass}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">Ages 5–12</div><h1 style="font-size:62px;margin-top:8px">${NB} big-kid cards +<br>weekly checklists</h1></div>
  <div style="position:absolute;left:60px;top:300px;display:grid;grid-template-columns:repeat(3,165px);gap:14px">${big.map(id => `<div style="width:165px;height:165px"><div style="transform:scale(.75);transform-origin:top left">${cd(id)}</div></div>`).join('')}</div>
  ${scaled(`<div class="paper">${bld.checklist('rainbow', 'morning', 'mon')}</div>`, 600, 250, .45, 3)}
  <p style="position:absolute;left:62px;top:880px;font-size:20px;font-weight:700;max-width:520px;line-height:1.35">Pre-filled and fillable checklists, Monday and Sunday starts. Screens keep their own steady spot in the day.</p>
</div>`);
// 6 six chart layouts
const charts = [
  [bld.chartStrip('rainbow'), 'Vertical strips', false], [bld.chartHoriz('rainbow'), 'Horizontal strips', true], [bld.chartFirstThen('rainbow'), 'First–then board', true],
  [bld.chartRoutine('rainbow', 'morning'), 'Morning chart', false], [filledChart(bld.chartRoutine('rainbow', 'bedtime'), bedIds), 'Bedtime chart', false], [bld.chartToday('rainbow', 'mon'), 'Today board', false],
];
L.push(`<div class="li" style="background:${C.wash}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">6 chart layouts · ready-made and blank</div><h1 style="font-size:62px;margin-top:8px">A chart for every stage</h1></div>
  <div style="position:absolute;left:60px;right:60px;top:200px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px 30px;justify-items:center">${charts.map(([h, t, land]) => {
    const box = land ? `<div style="height:310px;display:flex;align-items:center">${pageImg(h, 290, true)}</div>` : pageImg(h, 240);
    return `<div style="display:flex;flex-direction:column;align-items:center">${box}<div style="font-family:Fredoka,sans-serif;font-weight:600;font-size:22px;margin-top:10px;text-align:center">${t}</div></div>`; }).join('')}</div>
</div>`);
// 7 play first / screens later
L.push(`<div class="li" style="background:#fff">
  <div style="position:absolute;left:60px;top:52px"><div class="k">Included</div><h1 style="font-size:62px;margin-top:8px">Play first, screens later</h1><p style="font-size:21px;margin-top:12px;font-weight:700;max-width:860px;line-height:1.4">Screens get a steady spot in the day, after play. Plus "What we do next" and "5 more minutes" cards for the switch. A plain, generic tablet: no brands, no apps.</p></div>
  ${scaled(cd('screens-play-first'), 70, 330, 1.2, -4, 'shadow')}
  ${scaled(cd('screens-screens-later'), 360, 340, 1.2, 3, 'shadow')}
  ${scaled(cd('screens-what-we-do-next'), 650, 300, .95, 5, 'shadow')}
  ${scaled(cd('screens-5-more-minutes'), 690, 520, .95, -4, 'shadow')}
  <div style="position:absolute;left:60px;right:60px;top:740px;background:${C.tPlum};border-radius:26px;padding:22px 26px;display:flex;gap:14px;align-items:center">
    ${['feelings-happy', 'feelings-sad', 'feelings-mad', 'feelings-tired', 'feelings-big-breath'].map(id => `<div style="width:118px;height:118px;flex:0 0 auto"><div style="transform:scale(.536);transform-origin:top left">${cd(id)}</div></div>`).join('')}
    <div style="font-size:19px;font-weight:700;line-height:1.35"><b style="font-family:'Bricolage Grotesque';font-size:24px;display:block">+ feelings check-in</b>${NFEEL} feelings and ${NCALM} calm-down choices</div>
  </div>
</div>`);
// 8 colorways
const cwIds = ['morning-brush-teeth', 'play-blocks', 'bedtime-sleep', 'feelings-happy'];
L.push(`<div class="li" style="background:${C.wash}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">4 colorways · 2 files</div><h1 style="font-size:62px;margin-top:8px">Pick the look you love</h1></div>
  <div style="position:absolute;left:60px;right:60px;top:210px;display:flex;flex-direction:column;gap:16px">${COLORWAYS.map(cw => `<div style="display:flex;align-items:center;gap:18px;background:#fff;border-radius:22px;padding:12px 18px"><div style="width:150px"><div style="font-family:'Bricolage Grotesque';font-weight:800;font-size:28px">${cw.name}</div><div style="font-size:15px;font-weight:700;opacity:.75">${cw.id === 'simple' ? 'Low-ink file' : 'Color file'}</div></div>${cwIds.map(id => `<div style="width:162px;height:162px"><div style="transform:scale(.736);transform-origin:top left">${cw.id === 'simple' ? lowPreview(cd(id, 'simple')) : cd(id, cw.id)}</div></div>`).join('')}</div>`).join('')}</div>
</div>`);
// 9 make it yours
L.push(`<div class="li" style="background:${C.tTomato}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">Make it yours</div><h1 style="font-size:62px;margin-top:8px">Your words, your routine</h1><p style="font-size:21px;margin-top:12px;font-weight:700;max-width:860px;line-height:1.4">Type in free Adobe Acrobat Reader, or write by hand. Home languages and family words welcome. Text boxes: yes (typed words show in a plain standard font). Colors and pictures: no.</p></div>
  <div style="position:absolute;left:60px;top:300px;display:flex;gap:22px">
    ${[['morning-wake-up', 'Rise and shine'], ['morning-potty', 'Toilet'], ['play-blocks', 'Bloques']].map(([id, w]) => `<div style="width:260px;height:260px"><div style="transform:scale(1.18);transform-origin:top left">${card(byId(id), 'rainbow').replace(/<div class="lab"[^>]*>[^<]*<\/div>/, `<div class="lab" style="font-family:'Nunito Sans',sans-serif;font-weight:700;font-size:17px">${w}</div>`)}</div></div>`).join('')}
  </div>
  <div style="position:absolute;left:60px;right:60px;top:640px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
    ${[['Fillable fields', 'Card labels, chart titles, names, big-kid jobs and tick boxes.'], ['Word-free + blank', `All ${N} pictures with no words, plus draw-it cards.`], ['Photo cards', 'Glue a photo of your own front door, car seat or grandma.']].map(([h, p]) => `<div style="background:#fff;border-radius:22px;padding:20px 22px"><b style="font-family:'Bricolage Grotesque';font-size:25px;display:block">${h}</b><span style="font-size:17px;line-height:1.4;display:block;margin-top:6px">${p}</span></div>`).join('')}
  </div>
  <div style="position:absolute;left:60px;right:60px;top:800px;display:flex;justify-content:space-between">${[card(byId('bath-bath-time'), 'rainbow', { blankLabel: true }), card(byId('play-ball'), 'rainbow', { blankLabel: true }), card(byId('outside-park'), 'rainbow', { blankLabel: true }), card({ id: 'p', cat: 'bedtime', art: null, label: '' }, 'rainbow', { photo: true, blankLabel: true }), card({ id: 'b', cat: 'reading', art: null, label: '' }, 'rainbow', { blankArt: true, blankLabel: true })].map(h => `<div style="width:150px;height:150px"><div style="transform:scale(.682);transform-origin:top left">${h}</div></div>`).join('')}</div>
</div>`);
// 10 how to download + files and sizes (always last)
const dl = (starter) => `<div class="li" style="background:#fff">
  <div style="position:absolute;left:60px;top:52px"><div class="k">How to download</div><h1 style="font-size:60px;margin-top:8px">Use a browser,<br>not the Etsy app</h1></div>
  <div style="position:absolute;left:60px;right:60px;top:270px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px">${[['1', 'Open Etsy in a browser', 'On a computer or phone. The app can\'t download files.', C.sky, C.tSky], ['2', 'Purchases', 'You › Purchases and reviews › Download files.', '#B98200', C.tSun], ['3', 'Open in Acrobat Reader', 'Free. Type your words, save, then print at 100%.', C.grass, C.tGrass]].map(([n, h, p, c, t]) => `<div class="stat" style="--c:${c};--t:${t};padding:20px"><b style="font-size:54px">${n}</b><span style="font-size:24px">${h}</span><p style="font-size:16px">${p}</p></div>`).join('')}</div>
  <div style="position:absolute;left:60px;right:60px;top:560px;display:grid;grid-template-columns:1.25fr 1fr;gap:20px">
    <div style="background:${C.wash};border-radius:24px;padding:24px 26px"><b style="font-family:'Bricolage Grotesque';font-size:28px">5 files, no zip</b>
      <ul style="font-size:18px;line-height:1.55;margin:10px 0 0;padding-left:22px"><li>1 · START HERE</li><li>2 · Color, US Letter</li><li>3 · Color, A4</li><li>4 · Low-ink, US Letter</li><li>5 · Low-ink, A4</li></ul></div>
    <div style="background:${C.tSun};border-radius:24px;padding:22px 24px;display:flex;flex-direction:column;align-items:center;text-align:center"><div style="width:170px;height:170px;border:3px dashed ${C.ink};border-radius:20px;display:flex;align-items:center;justify-content:center;font-family:Fredoka,sans-serif;font-weight:600;font-size:32px;line-height:1.05"><div>2.2 in<br><span style="font-size:21px">5.6 cm</span></div></div><p style="font-size:16px;font-weight:700;margin-top:12px;line-height:1.35">Every card, on both paper sizes. Big-piece size for little hands.</p></div>
  </div>
  <p style="position:absolute;left:60px;right:60px;top:920px;font-size:15px;opacity:.8;line-height:1.4">Digital download: no physical item ships. ${starter ? '' : 'About 20 minutes to prep one routine, then reusable. '}Personal, single-family use. A grown-up stays close and keeps the pieces.</p>
</div>`;
L.push(dl(false));

// ---------------- Ages 0–5 edition listing images (9; the G0 launch listing) ----------------
// Same images as the Complete Set minus the 5–12 image; every count and page number is the 0–5 edition's own.
const M = require('./manifest.json');
const PG0 = M.docs['g0-store-color-letter'].pages;
const YCARDS = CARDS.filter(c => !c.cat.startsWith('bk-'));
const cardPg = 3 * (Math.ceil(NY / 12) + 2), wfPg = Math.ceil(NY / 12) + 1, chartPg = 3 * 13, guidePg = PG0 - cardPg - wfPg - chartPg;
const L0 = [];
L0.push(L[0].replace('Ages 0–5 and 5–12', 'Ages 0–5').replace(`<span style="color:${C.tomato}">${N}</span>`, `<span style="color:${C.tomato}">${NY}</span>`).replace(`<span class="pill">${N} cards</span>`, `<span class="pill">${NY} cards</span>`));
const stats0 = [
  [`${NY}`, 'picture cards', 'For ages 0–5: morning to bedtime, helping jobs, out and about. Feelings, plan words and screens cards work at any age.', C.tomato, C.tTomato],
  ['6', 'chart layouts', 'Strips, a first–then board, morning and bedtime charts and a Today board, ready-made and blank.', C.sky, C.tSky],
  ['4', 'colorways', 'Rainbow, Soft and Navy, plus Simple in a separate low-ink file.', C.grass, C.tGrass],
  ['Aa', 'fillable', 'Type labels, chart titles and names in free Adobe Acrobat Reader.', C.plum, C.tPlum],
  ['+', 'extras', 'Second copies of busy cards, blank, word-free and photo-frame cards, storage labels.', '#B98200', C.tSun],
  ['2', 'guide pages', 'Set up in 2 minutes, talk tips, use by age, laminating and safety.', C.ink, C.wash],
];
L0.push(`<div class="li" style="background:#fff">
  <div style="position:absolute;left:60px;top:56px"><div class="k">What's inside</div><h1 style="font-size:62px;margin-top:10px">${NY} cards · ${PG0} pages · 5 files</h1><p style="font-size:19px;font-weight:700;margin-top:10px;max-width:860px;line-height:1.4">Color file: ${cardPg} card pages, ${wfPg} word-free and photo pages, ${chartPg} chart pages, ${guidePg} guide and extras pages. Plus a Low-ink file and START HERE. US Letter and A4.</p></div>
  <div style="position:absolute;left:60px;right:60px;top:300px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px">${stats0.map(([n, h, p, c, t]) => `<div class="stat" style="--c:${c};--t:${t}"><b>${n}</b><span>${h}</span><p>${p}</p></div>`).join('')}</div>
  <div style="position:absolute;left:60px;right:60px;top:800px;display:flex;justify-content:space-between">${['morning-brush-teeth', 'meals-lunch', 'play-puzzle', 'outside-slide', 'reading-read-together', 'feelings-calm'].map(id => `<div style="width:132px;height:132px"><div style="transform:scale(.6);transform-origin:top left">${cd(id)}</div></div>`).join('')}</div>
</div>`);
bld.setCtx({ store: false, low: false, tier: 'g0' });
L0.push(`<div class="li" style="background:${C.wash}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">Grown-up guide inside</div><h1 style="font-size:58px;margin-top:8px">Set up in 2 minutes</h1><p style="font-size:20px;margin-top:10px;font-weight:700;max-width:860px;line-height:1.4">Plain-words guide: what your child is practicing, three easy talk tips, what to do if interest fades, and how to use the cards from birth to 5.</p></div>
  ${scaled(pageImg(bld.welcomePage(), 400), 70, 300, 1, -2)}
  ${scaled(pageImg(bld.talkPage(), 400), 520, 320, 1, 2)}
</div>`);
L0.push(L[3], L[5], L[6], L[7]);
L0.push(L[8].replace('Card labels, chart titles, names, big-kid jobs and tick boxes.', 'Card labels, chart titles and names.').replace(`All ${N} pictures with no words`, `All ${NY} pictures with no words`));
L0.push(dl(false));
bld.setCtx({ store: false, low: false, tier: 'full' });

// ---------------- starter listing images (5) ----------------
bld.setCtx({ store: false, low: false, tier: 'starter' });
const S = CARDS.filter(c => c.starter);
const LS = [];
LS.push(`<div class="li" style="background:${C.tSky}">
  <div style="position:absolute;left:60px;top:50px;right:60px;display:flex;justify-content:space-between;align-items:center">${wm}<span class="pill dark">Ages 0–5</span></div>
  <h1 style="position:absolute;left:60px;top:130px;font-size:104px"><span style="color:${C.tomato}">60</span> Visual<br>Routine Cards</h1>
  <p style="position:absolute;left:62px;top:356px;font-size:28px;font-weight:800;max-width:640px;line-height:1.25">Starter Set. Helps little ones see what comes next.</p>
  <div style="position:absolute;left:60px;top:430px;display:flex;gap:10px;flex-wrap:wrap;max-width:560px">${['60 cards', '3 charts', 'Play first / screens later', 'Fillable PDF', 'Letter + A4'].map(s => `<span class="pill">${s}</span>`).join('')}</div>
  ${scaled(`<div class="paper">${filledChart(bld.chartStrip('rainbow'), ['morning-brush-teeth', 'morning-get-dressed', 'morning-shoes-on', 'screens-play-first'])}</div>`, 610, 330, .46, 3)}
  ${scaled(cd('bedtime-sleep'), 80, 620, 1.1, -6, 'shadow')}
  ${scaled(cd('meals-breakfast'), 330, 650, 1.1, 5, 'shadow')}
</div>`);
LS.push(`<div class="li" style="background:#fff">
  <div style="position:absolute;left:60px;top:48px"><div class="k">What's inside · 60 cards · 24 pages · 5 files</div><h1 style="font-size:56px;margin-top:8px">The 60 cards families use most</h1></div>
  <div style="position:absolute;left:60px;top:190px;display:grid;grid-template-columns:repeat(10,82px);gap:6px">${S.map(c => `<div style="width:82px;height:82px"><div style="transform:scale(.3727);transform-origin:top left">${card(c, 'rainbow')}</div></div>`).join('')}</div>
  <div style="position:absolute;left:60px;right:60px;top:760px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px">${[['60 cards', 'Plus second copies, blank, word-free and photo cards', C.tomato, C.tTomato], ['3 charts', 'Vertical strip, first–then board, morning chart; ready-made and blank', C.sky, C.tSky], ['Fillable', 'Type labels and titles in free Acrobat Reader', C.grass, C.tGrass]].map(([h, p, c, t]) => `<div class="stat" style="--c:${c};--t:${t};padding:18px 20px"><span style="margin:0">${h}</span><p>${p}</p></div>`).join('')}</div>
</div>`);
LS.push(`<div class="li" style="background:${C.wash}">
  <div style="position:absolute;left:60px;top:52px"><div class="k">Grown-up guide inside</div><h1 style="font-size:58px;margin-top:8px">Set up in 2 minutes</h1><p style="font-size:20px;margin-top:10px;font-weight:700;max-width:860px;line-height:1.4">What your child is practicing, easy talk tips and a four-card bedtime to try tonight.</p></div>
  ${scaled(pageImg(bld.starterHowPage(), 400), 70, 300, 1, -2)}
  ${scaled(pageImg(bld.talkPage(), 400), 520, 320, 1, 2)}
</div>`);
LS.push(`<div class="li" style="background:${C.tPlum}">
  <div style="position:absolute;left:60px;top:52px;width:410px"><div class="k">See what comes next</div><h1 style="font-size:58px;margin-top:8px">Move each card to “all done”</h1><p style="font-size:21px;margin-top:16px;font-weight:700;line-height:1.4">Your child sees the plan, points to it and moves it. You get an easy question: “What's next on your chart?”</p>
  <div style="margin-top:26px;background:#fff;border-radius:20px;padding:18px 20px;font-size:18px;line-height:1.4"><b style="display:block;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#C8431F;margin-bottom:4px">Talk tips on the charts</b>Pause and wait. Point to the next card and let them tell you what comes next.</div></div>
  <div style="position:absolute;left:60px;top:520px;width:390px;height:330px;border-radius:26px;background:${C.tGrass};border:3px dashed ${C.grass}">
    <div style="position:absolute;left:0;right:0;top:18px;text-align:center;font-family:Fredoka,sans-serif;font-weight:600;font-size:34px;color:${C.ink}">All done!</div>
    ${scaled(cd('bath-bath-time'), 22, 100, .76, -6, 'shadow')}${scaled(cd('bedtime-pajamas'), 202, 104, .76, 6, 'shadow')}
  </div>
  ${scaled(`<div class="paper">${filledChart(bld.chartRoutine('rainbow', 'morning'), ['morning-wake-up', 'morning-potty', 'morning-get-dressed', 'meals-breakfast', 'morning-brush-teeth', 'morning-shoes-on', 'morning-coat-on', 'morning-pack-my-bag', 'screens-play-first'])}</div>`, 500, 80, .6, 2)}
</div>`);
LS.push(dl(true));

const defs = require('./card.js').DEFS;
fs.writeFileSync(path.join(__dirname, 'cover.html'), coverHtml.replace('FONTHREF', FONT));
fs.writeFileSync(path.join(__dirname, 'mockup.html'), mockup);
fs.writeFileSync(path.join(__dirname, 'listing.html'), `${head('Listing images')}${defs}${DEFS_LO}${L.join('\n')}</body></html>`);
fs.writeFileSync(path.join(__dirname, 'listing-g0.html'), `${head('Ages 0–5 listing images')}${defs}${DEFS_LO}${L0.join('\n')}</body></html>`);
fs.writeFileSync(path.join(__dirname, 'listing-starter.html'), `${head('Starter listing images')}${defs}${LS.join('\n')}</body></html>`);
console.log('listing images', L.length, 'g0', L0.length, 'starter', LS.length);
