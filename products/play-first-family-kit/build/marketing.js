// Mockup (1600x1200) and Etsy listing images (2000x2000, rendered from 1000px frames at 2x).
// Uses the Etsy-edition page renders (no URL or QR anywhere) in tmp/ep, tmp/epl, tmp/tk, tmp/sc.
//   node marketing.js  -> mockup.html, listing.html
const fs = require('fs'); const path = require('path');
const BRAND = path.resolve(__dirname, '../../../brand');
const m = require('./out/manifest.json')['kit-etsy-color-letter'].P;
const pg = k => `tmp/ep/p${String(m[k]).padStart(2, '0')}.png`;
const lo = n => `tmp/epl/p${String(n).padStart(2, '0')}.png`;
const tk = i => `tmp/tk/p${String(i).padStart(2, '0')}.png`;
const sc = i => `tmp/sc/p${String(i).padStart(2, '0')}.png`;
const logo = fs.readFileSync(path.join(BRAND, 'logo/lockup-horizontal.svg'), 'utf8').replace(/<title>.*?<\/title>/, '').replace(/ width="\d+" height="\d+"/, '');
const C = { ink: '#1D2940', wash: '#F3F6FB', tomato: '#EE5A36', sun: '#F5B820', sky: '#3D86D8', grass: '#2FA36B', plum: '#8A5CC7', tT: '#FDE9E3', tS: '#FEF4D8', tK: '#E3EEFA', tG: '#DFF3E9', tP: '#EFE6FA' };

const base = `<link rel="stylesheet" href="../../../brand/fonts/fonts.css"><style>
*{box-sizing:border-box}body{margin:0;background:#fff;font-family:"Nunito Sans",sans-serif;color:${C.ink};-webkit-print-color-adjust:exact}
.sheet{position:absolute;background:#fff;box-shadow:0 2px 4px rgba(29,41,64,.10),0 14px 34px rgba(29,41,64,.16);border-radius:3px;overflow:hidden}
.sheet img{width:100%;display:block}
.tok{position:absolute;background:#fff;border-radius:6px;box-shadow:0 2px 3px rgba(29,41,64,.14),0 8px 18px rgba(29,41,64,.14)}
.tok img{width:100%;display:block;border-radius:10px}
.h{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;letter-spacing:-.02em;line-height:.98}
.ey{font-weight:800;font-size:15px;letter-spacing:.14em;text-transform:uppercase}
.pill{display:inline-flex;align-items:center;gap:8px;background:#fff;border-radius:999px;padding:10px 20px;font-weight:800;font-size:19px;box-shadow:0 1px 2px rgba(29,41,64,.08)}
.pill i{width:12px;height:12px;border-radius:50%;display:block}
.li{width:1000px;height:1000px;position:relative;overflow:hidden}
.logo svg{height:44px;width:auto;display:block}
.cap{position:absolute;font-weight:800;font-size:16px;background:#fff;border-radius:999px;padding:7px 14px;box-shadow:0 1px 3px rgba(29,41,64,.12)}
ul.c{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
ul.c li{display:flex;gap:12px;align-items:baseline;font-size:21px;line-height:1.3;font-weight:600}
ul.c li:before{content:"";width:13px;height:13px;border-radius:50%;background:${C.tomato};flex:0 0 auto;transform:translateY(1px)}
</style>`;
const sheet = (src, x, y, w, rot = 0, z = 1) => `<div class="sheet" style="left:${x}px;top:${y}px;width:${w}px;transform:rotate(${rot}deg);z-index:${z}"><img src="${src}"></div>`;
const tok = (src, x, y, w, rot = 0, z = 5) => `<div class="tok" style="left:${x}px;top:${y}px;width:${w}px;padding:${Math.round(w * .065)}px;transform:rotate(${rot}deg);z-index:${z}"><img src="${src}"></div>`;
const L = logo.replace('<svg', '<svg class="lg"');

// ---------------- mockup 1600x1200 ----------------
const pencil = (x, y, rot) => `<div style="position:absolute;left:${x}px;top:${y}px;transform:rotate(${rot}deg);z-index:9;display:flex;align-items:center;filter:drop-shadow(0 6px 8px rgba(29,41,64,.18))"><div style="width:0;height:0;border-top:11px solid transparent;border-bottom:11px solid transparent;border-right:34px solid #F1D9A6;position:relative"></div><div style="width:300px;height:22px;background:${C.sun};border-radius:0 4px 4px 0;box-shadow:inset 0 -6px 0 rgba(0,0,0,.06)"></div><div style="width:26px;height:22px;background:${C.tomato};border-radius:0 6px 6px 0"></div></div>`;
const mock = `<!doctype html><html><head><meta charset="utf-8">${base}</head><body>
<div class="mk" style="width:1600px;height:1200px;position:relative;overflow:hidden;background:${C.tS}">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 30%,rgba(255,255,255,.55),rgba(255,255,255,0) 60%)"></div>
  ${sheet(pg('tracker'), 1010, 95, 470, 6, 1)}
  ${sheet(pg('help'), 90, 150, 470, -7, 2)}
  ${sheet(pg('cl25'), 505, 90, 620, 2, 3)}
  ${tok(tk(1), 180, 820, 230, -12)}${tok(tk(3), 400, 900, 230, 8)}${tok(tk(8), 1170, 820, 230, -5)}${tok(tk(4), 1370, 930, 230, 12, 4)}
  ${pencil(700, 1040, -8)}
</div></body></html>`;
fs.writeFileSync(path.join(__dirname, 'mockup.html'), mock);

// ---------------- listing images ----------------
const frame = (bg, inner) => `<div class="li" style="background:${bg}">${inner}</div>`;
const head = (ey, h, sub, col = C.tomato, top = 70) => `<div style="position:absolute;left:70px;right:70px;top:${top}px"><div class="ey" style="color:${col}">${ey}</div><div class="h" style="font-size:64px;margin-top:12px">${h}</div>${sub ? `<div style="font-size:23px;line-height:1.35;margin-top:14px;font-weight:600;max-width:820px">${sub}</div>` : ''}</div>`;
const imgs = [];
// 1 cover
imgs.push(frame(C.tS, `
  <div class="logo" style="position:absolute;left:70px;top:60px">${L}</div>
  <div style="position:absolute;right:70px;top:62px;display:flex;gap:10px"><span class="pill"><i style="background:${C.grass}"></i>Ages 2–5</span><span class="pill"><i style="background:${C.sky}"></i>Ages 5–12</span></div>
  <div style="position:absolute;left:70px;top:150px"><div class="h" style="font-size:100px"><span style="color:${C.tomato}">10</span> Play-First<br>Family Tools</div></div>
  <div style="position:absolute;left:70px;top:390px;width:400px"><div style="font-size:30px;font-weight:800">Play First, Then Screens.</div><div style="font-size:22px;font-weight:600;margin-top:8px;line-height:1.32">Checklists, together tokens, helping jobs, a chore chart, a family plan and a 30-day tracker.</div></div>
  ${sheet(pg('cl512skymon'), 470, 440, 320, -4, 2)}${sheet(pg('cl25'), 620, 410, 330, 5, 3)}
  <div style="position:absolute;left:70px;top:600px;display:flex;flex-direction:column;align-items:flex-start;gap:10px;z-index:6">${['Fillable PDF', 'US Letter + A4', '4 colorways'].map(t => `<span class="pill">${t}</span>`).join('')}</div>
  ${tok(tk(1), 70, 790, 170, -7, 4)}${tok(tk(3), 250, 800, 170, 6, 5)}`));
// 2 what's inside
const tiles = [['cl25', 'Play First, Then Screens checklists', '24 pages: ages 2–5, ages 5–12, fillable blank'], ['board', 'Play-First Board', 'first, then, later'], ['help', 'Little helping jobs', 'ages 2–5 · 4 pages'], ['chores', 'Family jobs chart', 'ages 5–12 · 4 pages'], ['tokens', 'Together tokens', '12 + 12 blank'], ['cards', 'Screen-spot cards', '6 cards'], ['poster', 'Family Play Rules poster', 'pre-filled + blank'], ['plan', 'Family Play & Screen Plan', '3 pages'], ['tracker', '30 Days of Play First', '30 plays + guide + blank'], ['cert', 'Certificate', 'to celebrate']];
imgs.push(frame('#fff', head('What’s inside', '10 tools in one download', '53 pages = 24 checklist pages + 16 tool pages + 3 family-plan pages + a 3-page play guide + 1 certificate + 5 guide pages + 1 “what’s next” page.') + `
  <div style="position:absolute;left:70px;right:70px;top:330px;display:grid;grid-template-columns:repeat(5,1fr);gap:18px">${tiles.map(([k, t, s], i) => `<div style="background:${[C.tT, C.tK, C.tG, C.tS, C.tP][i % 5]};border-radius:18px;padding:14px 14px 16px;display:flex;flex-direction:column;gap:10px"><div style="background:#fff;border-radius:6px;overflow:hidden;box-shadow:0 2px 8px rgba(29,41,64,.12)"><img src="${pg(k)}" style="width:100%;display:block"></div><div style="font-weight:800;font-size:16px;line-height:1.2">${t}</div><div style="font-size:14px;font-weight:600;color:#56627A">${s}</div></div>`).join('')}</div>`));
// 3 grown-up guide
imgs.push(frame(C.tP, head('A 2-minute grown-up guide', 'Plain words, no lectures', 'Set up in 2 minutes, three easy talk lines, and how it works at each age. Screens keep one steady spot in the day.', C.plum) + sheet(pg('guide1'), 80, 360, 420, -3, 2) + sheet(pg('guide2'), 510, 380, 420, 3, 3)));
// 4 checklist colorways
imgs.push(frame('#fff', head('Play First, Then Screens checklist', '4 colorways, Monday or Sunday start', 'Pictures for ages 2–5, words for ages 5–12, plus a fillable blank to make your own.') + sheet(pg('cl25'), 60, 380, 300, -6, 1) + sheet(pg('cl512skymon'), 250, 360, 300, -2, 2) + sheet(pg('clBlankgrassmon'), 450, 370, 300, 2, 3) + sheet(pg('cl25plumsun'), 650, 385, 300, 6, 4)
  + `<div class="cap" style="left:90px;top:840px">Ages 2–5 · Tomato</div><div class="cap" style="left:300px;top:840px">Ages 5–12 · Sky</div><div class="cap" style="left:520px;top:840px">Fillable · Grass</div><div class="cap" style="left:720px;top:840px">Sunday start · Plum</div>`));
// 5 ages 2-5
imgs.push(frame(C.tG, head('Ages 2–5', 'Little helping jobs and the Play-First Board', 'Big pictures to point at. Every cut piece is at least 2.1 in (5.3 cm), bigger than the toilet-paper-tube test. A grown-up keeps the pieces.', C.grass) + sheet(pg('help'), 60, 380, 390, -3, 2) + sheet(pg('board'), 540, 370, 390, 3, 2) + tok(tk(5), 428, 800, 150, -6, 4)));
// 6 ages 5-12
imgs.push(frame(C.tK, head('Ages 5–12', 'A family jobs chart with a “who” column', '12 real jobs, pre-filled or blank. Jobs are never a punishment, and screens keep the same spot whether the list is done or not.', C.sky) + sheet(pg('chores'), 80, 410, 400, -3, 2) + sheet(pg('cl512'), 520, 400, 400, 3, 2)));
// 7 plan + poster
imgs.push(frame(C.tT, head('For the whole family', 'Our Family Play & Screen Plan', 'Three warm fill-in pages to make together, plus a family rules poster. Short, kind, and the same for grown-ups too.') + sheet(pg('plan'), 60, 400, 300, -5, 1) + sheet(pg('plan2'), 250, 390, 300, -1, 2) + sheet(pg('poster'), 560, 380, 380, 4, 3)));
// 8 tokens + cards + tracker
imgs.push(frame(C.tS, head('Together tokens and 30 days of play', 'Tokens are for play, never screen minutes', 'After jobs, your child picks a together token: a story, a game, a walk. Then color a tile on the 30-day tracker. Every play has an age and a 2-minute version.', C.tomato) + sheet(pg('tracker'), 520, 360, 400, 4, 2) + sheet(pg('cert'), 610, 540, 300, -6, 1).replace('z-index:1', 'z-index:1') + tok(tk(1), 60, 640, 190, -7) + tok(tk(2), 275, 625, 190, 5) + tok(tk(10), 165, 790, 190, -2, 6)));
// 9 formats
imgs.push(frame('#fff', head('Sizes and formats', 'Fillable, printable, your way') + `
  <div style="position:absolute;left:70px;top:260px;width:430px"><ul class="c">
  <li>Fillable PDF: type in free Adobe Acrobat Reader on a computer or phone</li>
  <li>What you can edit: text boxes (names, dates, jobs, rules, token ideas, plan answers). Colors and pictures: no.</li>
  <li>Pre-filled pages and blank write-in pages</li>
  <li>US Letter and A4</li>
  <li>Color file, plus a low-ink file with line art to color</li>
  <li>5 files: Start Here + 4 PDFs</li></ul></div>
  ${sheet(pg('cl25'), 540, 290, 330, -4, 1)}${sheet(lo(6), 620, 470, 330, 4, 2)}
  <div class="cap" style="left:560px;top:250px;z-index:5">Color</div><div class="cap" style="left:800px;top:900px;z-index:5">Low-ink</div>`));
// 10 how to use / download
imgs.push(frame(C.tK, head('How to use', 'Print, fill, play', 'About 20 minutes to prep, then reusable for months. The checklists need no cutting, so you can start today.', C.sky) + `
  <div style="position:absolute;left:70px;right:70px;top:360px;display:grid;grid-template-columns:repeat(2,1fr);gap:22px">
  ${[['1', 'Download in a browser', 'Use a web browser, not the Etsy app. Your files stay on your Purchases page.'], ['2', 'Fill in (optional)', 'Open in free Adobe Acrobat Reader and type names, jobs and your screen spot.'], ['3', 'Print at 100%', 'Charts on paper; tokens, cards and the board on cardstock. About 20 minutes to prep, then reusable.'], ['4', 'Laminate or use page protectors', 'Dry-erase week after week. Velcro is for ages 3+ only; check dots before each play.']].map(([n, t, s]) => `<div style="background:#fff;border-radius:22px;padding:26px 28px;display:flex;gap:18px"><div style="width:52px;height:52px;border-radius:50%;background:${C.sky};color:#fff;font-family:Fredoka,sans-serif;font-weight:600;font-size:28px;display:flex;align-items:center;justify-content:center;flex:0 0 auto">${n}</div><div><div style="font-weight:800;font-size:25px">${t}</div><div style="font-size:19px;line-height:1.35;margin-top:6px;font-weight:600">${s}</div></div></div>`).join('')}</div>
  <div style="position:absolute;left:70px;right:70px;bottom:70px;background:#fff;border-radius:22px;padding:24px 30px;font-size:20px;font-weight:700;line-height:1.4">Digital download: no physical item ships. Personal and family use. Every play follows our published safety rules.</div>`));
const listing = `<!doctype html><html><head><meta charset="utf-8">${base}</head><body style="display:flex;flex-direction:column;gap:20px;background:#ddd">${imgs.join('\n')}</body></html>`;
fs.writeFileSync(path.join(__dirname, 'listing.html'), listing);
console.log('mockup.html + listing.html (' + imgs.length + ' images)');
