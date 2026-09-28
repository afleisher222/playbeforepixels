// Listing images (10 x 2000 px squares) and the website mockup (1600 x 1200) for the First Phone Agreement Kit.
//   node listing.js   -> listing.html, mockup.html (rendered by make-all.sh)
// Listing images use the Etsy-edition page previews (no URL, no QR), per CUSTOMER-VOICE rule 2.
const fs = require('fs'); const path = require('path');
const B = require('./base.js');
const L = require('./art.js');
const X = require('./art-phone.js');
const T = require('./content.js');
const { A, NEW_SYMBOLS } = L;
const BRAND = path.resolve(__dirname, '../../../brand');
const MAN = JSON.parse(fs.readFileSync(path.join(__dirname, 'out/manifest.json'), 'utf8'));
const M = MAN['kit-etsy-color-letter'].P; const NP = MAN['kit-etsy-color-letter'].pages;
const ML = JSON.parse(fs.readFileSync(path.join(__dirname, 'out/manifest.json'), 'utf8'))['kit-etsy-low-letter'].P;
const svgFile = f => fs.readFileSync(path.join(BRAND, 'logo', f), 'utf8').replace(/<\?xml[^>]*>/, '').replace(/<title>.*?<\/title>/, '').replace(/ width="\d+" height="\d+"/, '');
const LOCK = svgFile('lockup-horizontal.svg');
const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${B.SYMBOLS.join('')}${NEW_SYMBOLS.join('')}${X.NEW.join('')}</defs></svg>`;
const art = (id, bg = '#fff') => `<svg class="art" viewBox="0 0 120 100" aria-hidden="true"><circle cx="60" cy="52" r="44" fill="${bg}"/>${A[id]()}</svg>`;
const pg = (n, low) => `tmp/${low ? 'etsy-pv-low' : 'etsy-pv'}/p${String(n).padStart(2, '0')}.png`;
const sheet = (n, style = '', low = false) => `<img class="sheet" src="${pg(n, low)}" style="${style}" alt="">`;

const CSS = `
:root{--ink:#1D2940;--wash:#F3F6FB;--tomato:#EE5A36;--sun:#F5B820;--sky:#3D86D8;--grass:#2FA36B;--plum:#8A5CC7;--tT:#FDE9E3;--tS:#FEF4D8;--tK:#E3EEFA;--tG:#DFF3E9;--tP:#EFE6FA;--mute:#56627A}
*{box-sizing:border-box}html,body{margin:0;background:#fff;color:var(--ink);font-family:"Nunito Sans",sans-serif}
symbol{overflow:visible}.sk{fill:var(--sk)} .hr{fill:var(--hr)} .sh{fill:var(--sh)} .pa{fill:var(--pa)} .so{fill:var(--so)} .hw{fill:var(--hw)} .ck{fill:#EE5A36;opacity:.28}
.L{width:1000px;height:1000px;position:relative;overflow:hidden;padding:64px;display:flex;flex-direction:column;gap:22px;background:var(--bg,#fff)}
.ey{font-weight:800;font-size:17px;letter-spacing:.14em;text-transform:uppercase;color:var(--tomato)}
.h{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:66px;line-height:.98;letter-spacing:-.02em}
.h .n{color:var(--tomato)}
.sub{font-size:25px;line-height:1.35;font-weight:600;max-width:820px}
.pill{display:inline-flex;align-items:center;gap:10px;background:#fff;border-radius:99px;padding:12px 22px;font-weight:800;font-size:21px;box-shadow:0 2px 0 rgba(29,41,64,.06)}
.pill i{width:14px;height:14px;border-radius:50%;background:var(--c,var(--tomato))}
.pills{display:flex;flex-wrap:wrap;gap:12px}
.sheet{position:absolute;width:var(--w,360px);background:#fff;border-radius:6px;box-shadow:0 18px 40px rgba(29,41,64,.18),0 3px 8px rgba(29,41,64,.08)}
.stage{position:relative;flex:1}
.art{display:block}
.brand{display:flex;justify-content:space-between;align-items:center}
.brand svg{height:52px;width:auto}
.age{background:var(--ink);color:#fff;border-radius:99px;padding:12px 24px;font-weight:800;font-size:22px}
.call{position:absolute;background:#fff;border-radius:20px;padding:16px 20px;font-weight:700;font-size:20px;line-height:1.3;box-shadow:0 10px 30px rgba(29,41,64,.14);max-width:330px}
.call b{display:block;font-family:"Bricolage Grotesque",sans-serif;font-size:24px;margin-bottom:4px;color:var(--tomato)}
.grid{display:grid;gap:14px}
.tile{background:#fff;border-radius:22px;padding:14px 18px;display:flex;align-items:center;gap:14px}
.tile .art{width:96px;height:80px;flex:0 0 auto}
.tile b{font-size:21px;line-height:1.15;display:block}
.tile span{font-size:16px;color:var(--mute);font-weight:700}
.foot{font-size:16px;color:var(--mute);font-weight:700}
`;
const head = (title) => `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><link rel="stylesheet" href="${path.relative(__dirname, path.join(BRAND, 'fonts/fonts.css'))}"><style>${CSS}</style></head><body>${DEFS}`;
const brandRow = (right = '<span class="age">Ages 9–12</span>') => `<div class="brand">${LOCK}${right}</div>`;

const imgs = [];
// 1 · hero (thumbnail)
imgs.push(`<section class="L" style="--bg:var(--tS)">${brandRow()}
  <div class="h">First Phone<br>Agreement Kit</div>
  <div class="sub">A warm agreement you write together, plus <b>30 phone-free afternoons</b> of things to do instead.</div>
  <div class="pills"><span class="pill"><i></i>30-day challenge</span><span class="pill"><i style="--c:var(--sky)"></i>26 promises to choose</span><span class="pill"><i style="--c:var(--plum)"></i>Fillable · Letter + A4</span></div>
  <div class="stage">
    ${sheet(M.tracker, '--w:330px;left:470px;top:40px;transform:rotate(6deg)')}
    ${sheet(M.agree, '--w:350px;left:250px;top:10px;transform:rotate(-4deg)')}
    <div style="position:absolute;left:-10px;top:40px;width:330px;height:330px">${`<svg viewBox="0 0 120 100" style="width:100%;height:100%">${A.phoneGift()}</svg>`}</div>
  </div></section>`);
// 2 · what's inside
const inside = [['homeAddress', 'Are we ready?', '16-point checklist, no score'], ['numbersCard', '10 practice missions', 'Before the first phone'], ['kindWords', 'The agreement', '18 kid + 8 grown-up promises'], ['phonePark', 'Phone-free zones', '7 zones, grown-ups too'], ['phoneBed', 'Phone-free times', 'School days + weekends'], ['chargeSpot', '8 zone signs', 'Cut and post'], ['planner', 'Fridge-door tech plan', 'Example + fillable'], ['outsideTime', '30 afternoons', 'Tracker, 30 ideas, certificate'], ['checkIn', 'Monthly check-in', '5 questions, 3 months'], ['swatches', '3 colorways + low-ink', 'Tomato, Sky, Plum']];
imgs.push(`<section class="L" style="--bg:var(--wash)"><div class="ey">What’s inside</div><div class="h" style="font-size:58px">10 tools, <span class="n">${NP} pages</span></div>
  <div class="grid" style="grid-template-columns:1fr 1fr;flex:1">${inside.map(([a, t, s]) => `<div class="tile">${art(a, 'var(--wash)')}<div><b>${t}</b><span>${s}</span></div></div>`).join('')}</div>
  <div class="foot">Instant digital download · nothing is shipped · personal and family use</div></section>`);
// 3 · grown-up guide
imgs.push(`<section class="L" style="--bg:var(--tK)"><div class="ey">A 2-page grown-up guide</div><div class="h" style="font-size:56px">Set up in 2 minutes.<br>Talk it through together.</div>
  <div class="stage">
    ${sheet(3, '--w:390px;left:10px;top:20px;transform:rotate(-3deg)')}
    ${sheet(4, '--w:390px;left:430px;top:40px;transform:rotate(3deg)')}
    <div class="call" style="left:560px;top:420px"><b>Never a prize, never a punishment</b>Phone time doesn’t grow or shrink with chores or behavior.</div>
    <div class="call" style="left:-4px;top:440px"><b>3 talk lines</b>Ask, then wait. Say what you see. Build on their idea.</div>
  </div></section>`);
// 4 · agreement
imgs.push(`<section class="L" style="--bg:var(--tT)"><div class="ey">Our First Phone Agreement</div><div class="h" style="font-size:58px">A warm agreement,<br><span class="n">not a contract</span> of punishments</div>
  <div class="stage">
    ${sheet(M.agree2, '--w:370px;left:470px;top:30px;transform:rotate(4deg)')}
    ${sheet(M.agree, '--w:390px;left:60px;top:10px;transform:rotate(-3deg)')}
    <div class="call" style="left:560px;top:430px"><b>When something goes wrong</b>Pause. Talk it through. Re-read and adjust.</div>
  </div>
  <div class="pills"><span class="pill"><i></i>18 kid promises to choose</span><span class="pill"><i style="--c:var(--sky)"></i>8 grown-up promises</span><span class="pill"><i style="--c:var(--plum)"></i>Blank write-your-own page</span></div></section>`);
// 5 · readiness + missions
imgs.push(`<section class="L" style="--bg:var(--tG)"><div class="ey">Before the first phone</div><div class="h" style="font-size:58px">Are we ready?<br><span class="n">No score. No right age.</span></div>
  <div class="stage">
    ${sheet(M.ready, '--w:380px;left:40px;top:20px;transform:rotate(-3deg)')}
    ${sheet(M.missions, '--w:380px;left:470px;top:40px;transform:rotate(3deg)')}
  </div>
  <div class="pills"><span class="pill"><i style="--c:var(--grass)"></i>16-point readiness checklist</span><span class="pill"><i></i>10 real-world practice missions</span></div></section>`);
// 6 · zones, times, signs
imgs.push(`<section class="L" style="--bg:var(--tP)"><div class="ey">Where and when</div><div class="h" style="font-size:58px">Phone-free zones, times<br>and <span class="n">8 signs</span> to post</div>
  <div class="stage">
    ${sheet(M.zones, '--w:320px;left:0px;top:40px;transform:rotate(-4deg)')}
    ${sheet(M.times, '--w:320px;left:300px;top:10px;transform:rotate(1deg)')}
    ${sheet(M.signs, '--w:320px;left:580px;top:50px;transform:rotate(5deg)')}
  </div>
  <div class="foot" style="color:var(--ink)">Zones and times are for everyone, grown-ups too.</div></section>`);
// 7 · 30 afternoons
imgs.push(`<section class="L" style="--bg:var(--tS)"><div class="ey">The 30-day challenge</div><div class="h" style="font-size:60px"><span class="n">30</span> Phone-Free Afternoons</div>
  <div class="sub">Build, ride, cook, invent, explore. 26 of 30 ideas need nothing to buy, and every one has a 2-minute version.</div>
  <div class="stage">
    ${sheet(M.ideas, '--w:300px;left:600px;top:40px;transform:rotate(5deg)')}
    ${sheet(M.cert, '--w:290px;left:10px;top:50px;transform:rotate(-5deg)')}
    ${sheet(M.tracker, '--w:340px;left:280px;top:10px;transform:rotate(0deg)')}
  </div></section>`);
// 8 · fridge-door plan + fillable
imgs.push(`<section class="L" style="--bg:var(--tK)"><div class="ey">One page for the whole house</div><div class="h" style="font-size:58px">Our Fridge-Door<br>Tech Plan</div>
  <div class="stage">
    ${sheet(M.plan, '--w:380px;left:30px;top:10px;transform:rotate(-3deg)')}
    ${sheet(M.planB, '--w:380px;left:470px;top:30px;transform:rotate(3deg)')}
    <div class="call" style="left:250px;top:470px;max-width:460px"><b>Fillable in a free PDF reader</b>Type names, times, promises and answers. Printed words, colors and pictures stay as they are.</div>
  </div></section>`);
// 9 · colorways + low-ink
imgs.push(`<section class="L" style="--bg:#fff"><div class="ey">Pick your colors</div><div class="h" style="font-size:58px">3 colorways + a low-ink file</div>
  <div class="stage">
    ${sheet(M.agree, '--w:250px;left:0px;top:40px;transform:rotate(-4deg)')}
    ${sheet(M.agree_sky, '--w:250px;left:220px;top:20px;transform:rotate(-1deg)')}
    ${sheet(M.agree_plum, '--w:250px;left:440px;top:30px;transform:rotate(2deg)')}
    ${sheet(ML.agree, '--w:250px;left:640px;top:50px;transform:rotate(5deg)', true)}
  </div>
  <div class="pills"><span class="pill" style="background:var(--tT)"><i></i>Tomato</span><span class="pill" style="background:var(--tK)"><i style="--c:var(--sky)"></i>Sky</span><span class="pill" style="background:var(--tP)"><i style="--c:var(--plum)"></i>Plum</span><span class="pill" style="background:var(--wash)"><i style="--c:#fff;border:2px solid var(--ink)"></i>Low-ink line art</span></div></section>`);
// 10 · formats + how it works
const steps = [['1', 'Download', '5 PDF files, instantly. Open them in a web browser, not the app.'], ['2', 'Print or type', 'US Letter or A4. Fill in on screen or by hand.'], ['3', 'Sit down together', 'About 30 minutes, snacks recommended.'], ['4', 'Post it', 'Fridge-door plan up, phones to the charging spot, afternoons on.']];
imgs.push(`<section class="L" style="--bg:var(--wash)"><div class="ey">How it works</div><div class="h" style="font-size:58px">Ready in 5 minutes.<br><span class="n">No cutting needed.</span></div>
  <div class="grid" style="grid-template-columns:1fr 1fr;flex:1">${steps.map(([n, t, s]) => `<div class="tile" style="align-items:flex-start;padding:24px"><div style="width:56px;height:56px;border-radius:50%;background:var(--tomato);color:#fff;font-family:Fredoka,sans-serif;font-weight:600;font-size:30px;display:flex;align-items:center;justify-content:center;flex:0 0 auto">${n}</div><div><b style="font-size:26px">${t}</b><span style="font-size:19px;color:var(--ink);font-weight:600">${s}</span></div></div>`).join('')}</div>
  <div class="grid" style="grid-template-columns:repeat(3,1fr)">${[['START HERE', '+ Color and Low-ink'], ['US Letter + A4', `${NP} pages in color`], ['Fillable PDF', 'Pre-filled and blank']].map(([a, b]) => `<div class="tile" style="flex-direction:column;align-items:flex-start;gap:4px"><b>${a}</b><span>${b}</span></div>`).join('')}</div>
  <div class="foot">Digital download: nothing is shipped. Parent education, not medical or professional advice. Never names an app, phone brand or company.</div></section>`);

fs.writeFileSync(path.join(__dirname, 'listing.html'), head('First Phone Agreement Kit · listing images') + imgs.join('\n') + '</body></html>');

// ---------- website mockup: pages on a wash surface, phones asleep in their basket ----------
const mock = `${head('First Phone Agreement Kit · mockup')}
<div style="width:1600px;height:1200px;position:relative;overflow:hidden;background:#EAF0F8">
  <div style="position:absolute;left:0;right:0;bottom:0;height:420px;background:#DDE6F2"></div>
  <img class="sheet" src="../preview/p${String(M.tracker).padStart(2, '0')}.png" style="--w:520px;left:980px;top:170px;transform:rotate(7deg)">
  <img class="sheet" src="../preview/p${String(M.plan).padStart(2, '0')}.png" style="--w:540px;left:120px;top:190px;transform:rotate(-7deg)">
  <img class="sheet" src="../preview/p01.png" style="--w:600px;left:520px;top:100px;transform:rotate(-1deg)">
  <div style="position:absolute;left:150px;top:880px;width:330px;height:280px"><svg viewBox="0 0 120 100" style="width:100%;height:100%">${A.phonePark()}</svg></div>
  <div style="position:absolute;left:1210px;top:930px;width:260px;height:40px;transform:rotate(-12deg)"><svg viewBox="0 0 260 40" style="width:100%;height:100%"><rect x="0" y="10" width="220" height="20" rx="4" fill="#F5B820"/><rect x="0" y="10" width="24" height="20" rx="4" fill="#EE5A36"/><path d="M220 10L256 20 220 30Z" fill="#F1D9A6"/><path d="M246 17L256 20 246 23Z" fill="#1D2940"/></svg></div>
</div></body></html>`;
fs.writeFileSync(path.join(__dirname, 'mockup.html'), mock);
console.log('listing.html: ' + imgs.length + ' images; mockup.html');
