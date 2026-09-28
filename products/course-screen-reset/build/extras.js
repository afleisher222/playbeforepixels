// Cover, KDP cover wrap, mockup, START HERE, free starter (lead magnet), listing images and sales page.
// Run after workbook.js and after preview/ PNGs exist (make.sh does this in order).
const fs = require('fs');
const path = require('path');
const P = require('./parts.js');
const { C, W, K, esc, pad2, WC, wc, qrSvg, ico, drops, ageLabel, artDisc, fld, sceneCover, WEEK_SCENES, sceneSvg, playCard, scriptBox, COPY, SITE, BONUS } = P;
const B = __dirname;
const FONTS = '../../../brand/fonts/fonts.css';
const LOGO = '../../../brand/logo/lockup-horizontal.svg';
const LOGO_W = '../../../brand/logo/lockup-horizontal-white.svg';
const MARK = '../../../brand/logo/mark.svg';
const PV = n => `../preview/p${pad2(n)}.png`;
const charCss = '.sk{fill:var(--sk)}.hr{fill:var(--hr)}.sh{fill:var(--sh)}.pa{fill:var(--pa)}.so{fill:var(--so)}.hw{fill:var(--hw)}.ck{fill:#EE5A36;opacity:.28}';
const base = (w, h, extra = '') => `<!doctype html><html lang="en"><head><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}"><style>
*{box-sizing:border-box;margin:0;padding:0}html,body{width:${w}px;height:${h}px;overflow:hidden;background:#fff}
body{font-family:"Nunito Sans",Arial,sans-serif;color:${C.ink};-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1,h2,h3,.bric{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800}
.ico{display:inline-block;vertical-align:-.12em;fill:currentColor}${charCss}${extra}</style></head><body>${P.defs()}`;
const write = (f, s) => { fs.writeFileSync(path.join(B, f), s + '</body></html>'); };

// ---------------------------------------------------------------- cover (8 x 10 ratio; store image + KDP front)
const coverInner = (pad = 0) => `<div class="cv" style="padding:${60 + pad}px ${56 + pad}px ${48 + pad}px">
  <div class="top"><div class="n">30</div><div class="t">Days<br>of</div></div>
  <div class="bf">Back-and-Forth</div>
  <div class="sub">${esc(K.SUB)}</div>
  <div class="scene">${sceneSvg(sceneCover, '', '20 150 560 360')}</div>
  <div class="strip"><span><b>30</b> short lessons</span><span><b>30</b> easy plays</span><span><b>30</b> plain-word scripts</span></div>
  <div class="ages">For families with children aged 1 to 12</div>
  <div class="logo"><img src="${LOGO}" alt="Play Before Pixels"></div>
</div>`;
const coverCss = `.cv{width:100%;height:100%;background:${C.tSun};display:flex;flex-direction:column;align-items:center;text-align:center}
.top{display:flex;align-items:center;gap:22px}.n{font-family:"Bricolage Grotesque";font-weight:800;font-size:236px;line-height:.8;color:${C.tomato};letter-spacing:-.04em}
.t{font-family:"Bricolage Grotesque";font-weight:800;font-size:74px;line-height:.92;text-align:left}
.bf{font-family:"Bricolage Grotesque";font-weight:800;font-size:80px;line-height:1;letter-spacing:-.01em;white-space:nowrap;margin-top:10px}
.sub{font-family:"Bricolage Grotesque";font-weight:700;font-size:29px;margin-top:18px}
.scene{width:600px;height:386px;margin-top:6px}.scene svg{width:100%;height:100%}
.strip{display:flex;gap:12px;margin-top:4px}.strip span{background:#fff;border-radius:99px;padding:8px 16px;font-weight:700;font-size:18px}.strip b{font-family:"Bricolage Grotesque";color:${C.tomato};font-size:21px}
.ages{font-size:17px;font-weight:700;margin-top:14px;color:#3A4660}
.logo{margin-top:auto}.logo img{height:62px}`;
write('cover.html', base(768, 960, coverCss) + coverInner());

// ---------------------------------------------------------------- KDP cover wrap (8 x 10 trim, B/W white paper)
{
  const pages = (() => { try { return (fs.readFileSync(path.join(P.OUT, 'paperback/source-kdp.html'), 'utf8').match(/class="page /g) || []).length; } catch (e) { return 90; } })();
  const spine = +(pages * 0.002252).toFixed(4); // KDP white paper, black ink [VERIFY in KDP's cover calculator]
  const bleed = .125, tw = 8, th = 10;
  const Wd = +(bleed * 2 + tw * 2 + spine).toFixed(4), Hd = th + bleed * 2;
  const DPI = 96, px = v => Math.round(v * DPI);
  const back = `<div class="back">
    <h2>More play and talk, with screens in a steady spot.</h2>
    <p class="bl">A gentle, practical 30-day plan for busy families. Each day brings one short lesson, one easy play with things you already have, and plain words for a tricky moment: the show that won’t end, “I’m bored”, the hour before dinner, waiting rooms, car rides and “everyone else gets to”.</p>
    <ul>
      <li><b>30 lessons</b> you can read in about three minutes</li>
      <li><b>30 plays</b>, each with an easier version, a big-kid version and a 2-minute version for tired days</li>
      <li><b>38 scripts</b> for tricky moments, plus trackers, planning pages and a family plan</li>
      <li><b>No banning.</b> Screens get a steady spot in the day and are never a reward or a punishment</li>
    </ul>
    <p class="note">For families with children aged 1 to 12. Black-and-white interior. Parent education, not medical advice.</p>
    <div class="series"><b>Free bonus inside:</b> color trackers, a certificate to print and a monthly play email at ${BONUS}</div>
    <div class="series"><b>Collect the Play Before Pixels shelf</b><span>100 Screen-Free Plays · The Day the Tablet Slept · Up! Go! More!</span></div>
    <div class="bot"><div><img src="${LOGO}" alt="Play Before Pixels"><div class="site">${SITE}</div></div><div class="isbn">ISBN / barcode<br><small>KDP places the barcode here</small></div></div>
  </div>`;
  const css = `@page{size:${Wd}in ${Hd}in;margin:0}html,body{width:${Wd}in;height:${Hd}in}
  .wrap{position:relative;width:${Wd}in;height:${Hd}in;background:${C.tSun};display:flex}
  .panel{position:absolute;top:0;height:${Hd}in}
  .bp{left:0;width:${bleed + tw}in;padding:${bleed + .55}in .6in ${bleed + .5}in ${bleed + .55}in}
  .sp{left:${bleed + tw}in;width:${spine}in;background:${C.tomato}}
  .fp{left:${bleed + tw + spine}in;width:${tw + bleed}in}
  .fp .cvw{width:${tw}in;height:${th}in;margin-top:${bleed}in;zoom:${(tw * 96) / 768}}
  .back{height:100%;display:flex;flex-direction:column}
  .back h2{font-size:30pt;line-height:1.05;margin-bottom:.2in}
  .bl{font-size:12.5pt;line-height:1.5;margin-bottom:.16in}
  .back ul{list-style:none;font-size:12pt;line-height:1.45}.back li{padding-left:.26in;position:relative;margin-bottom:.08in}
  .back li:before{content:"";position:absolute;left:0;top:.08in;width:.13in;height:.13in;border-radius:50%;background:${C.tomato}}
  .note{font-size:10pt;color:#3A4660;margin-top:.12in}
  .series{margin-top:.2in;background:#fff;border-radius:14px;padding:.14in .18in;font-size:10.5pt}.series b{display:block}
  .bot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end}.bot img{height:.5in}.site{font-weight:700;font-size:10pt;margin-top:.04in}
  .isbn{width:2in;height:1.2in;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-weight:800;font-size:10pt;border:1px dashed #9AA6BC}.isbn small{font-weight:400;font-size:7.5pt}
  ${coverCss}`;
  write('cover-wrap.html', base(px(Wd), px(Hd), css) + `<div class="wrap"><div class="panel bp">${back}</div><div class="panel sp"></div><div class="panel fp"><div class="cvw" style="width:768px;height:960px">${coverInner()}</div></div></div><!-- ${pages} pages; spine ${spine} in; wrap ${Wd} x ${Hd} in -->`);
  fs.writeFileSync(path.join(B, 'cover-wrap.json'), JSON.stringify({ pages, spine_in: spine, wrap_in: [Wd, Hd], paper: 'white, black ink', note: 'No spine text: at this spine width KDP’s 0.0625 in spine margins leave no room [VERIFY in KDP cover calculator].' }, null, 2));
}

// ---------------------------------------------------------------- START HERE (file 1), Letter
{
  const css = `@page{size:8.5in 11in;margin:0}html,body{width:8.5in;height:auto;overflow:visible}
  .page{width:8.5in;height:11in;padding:.6in;position:relative;page-break-after:always;display:flex;flex-direction:column}
  h1{font-size:34pt;line-height:1;color:${C.tomato};margin:.1in 0 .12in}.kick{font-family:"Bricolage Grotesque";font-weight:800;letter-spacing:.08em;text-transform:uppercase;font-size:10pt}
  .lead{font-size:13pt;line-height:1.45;margin-bottom:.2in}
  table{width:100%;border-collapse:collapse;font-size:10.5pt}td,th{border-bottom:1px solid #DCE3EE;padding:.08in .06in;text-align:left;vertical-align:top}th{font-family:"Bricolage Grotesque";font-size:10pt}
  h3{font-size:14pt;margin:.2in 0 .06in}p,li{font-size:10.5pt;line-height:1.5}ul{padding-left:.2in}
  .box{background:${C.tSun};border-radius:14px;padding:.16in .2in;margin-top:.16in}
  .foot{position:absolute;left:.6in;right:.6in;bottom:.35in;display:flex;justify-content:space-between;font-size:8pt;color:#5A6478;border-top:1px solid #DCE3EE;padding-top:.06in}
  .top{display:flex;justify-content:space-between;align-items:center}.top img{height:.5in}`;
  const files = [
    ['1. START HERE.pdf', 'This page: what’s inside, printing and how the emails work.'],
    ['2. Workbook - Color - US Letter.pdf', 'The full workbook in color, with type-in fields. Also in A4.'],
    ['3. Workbook - Low-ink - US Letter.pdf', 'White pages and line drawings to color. Saves ink. Also in A4.'],
    ['4. Workbook - Color - A4.pdf', 'For international paper sizes.'],
    ['5. Workbook - Low-ink - A4.pdf', 'Low-ink, A4.'],
  ];
  write('start-here.html', base(816, 1056, css) + `<section class="page">
    <div class="top"><div class="kick">${esc(K.TITLE)}</div><img src="${LOGO}" alt="Play Before Pixels"></div>
    <h1>Start here</h1>
    <p class="lead">Thank you for joining. Your first lesson arrives by email tomorrow morning. This page tells you what’s in your download and how to print it. Setup takes about two minutes.</p>
    <table><tr><th>File</th><th>What it is</th></tr>${files.map(([a, b]) => `<tr><td><b>${a}</b></td><td>${b}</td></tr>`).join('')}</table>
    <h3>Your 2-minute setup</h3>
    <ul><li>Open the workbook that matches your paper (US Letter or A4). Print pages 6–10: the planning pages and the tracker.</li><li>Fill a play basket with 5–8 things you already have (workbook page 8).</li><li>Choose a phone parking spot for your own phone.</li></ul>
    <h3>Printing</h3>
    <ul><li>Print at “Actual size” or 100%. Ordinary printer paper is fine; card stock is nice for the tracker and certificate.</li><li>To save ink, print the Low-ink edition. Your child can color the line drawings.</li><li>Any copy shop can print it. Laminate the tracker and use a dry-erase marker to reuse it.</li><li>On a phone or tablet, open the PDF in the free Adobe Acrobat Reader app to type into it.</li></ul>
    <h3>What you can type into</h3>
    <p>In free Acrobat Reader: the planning pages, the blank tracker, the daily notes, the check-ins, your family plan, the certificate and the blank play pages. Lessons, plays and the pre-filled tracker are fixed text. Save a copy to keep your notes.</p>
    <div class="box"><b>Emails:</b> one lesson each morning for 30 days. Pause or change the time from the link in any email. Missed one? Nothing breaks: every lesson is also in the workbook. <b>Guarantee:</b> not right for your family? Email us within 30 days of purchase for a full refund.</div>
    <div class="foot"><span>${COPY} For the purchasing household; please share the link, not the file.</span><span>${SITE} · ${K.VERSION}</span></div>
  </section>`);
}

// ---------------------------------------------------------------- Free starter: 7 Days of Play First (lead magnet), Letter + A4
for (const [key, w, h] of [['letter', 8.5, 11], ['a4', 8.27, 11.69]]) {
  const picks = [1, 3, 6, 4, 15, 12, 7].map(n => K.DAYS.find(d => d.d === n));
  const mini = d => { const c = wc(d.d), p = d.play; return `<div class="mini">${artDisc(p.art, c.t, .95)}<div><b>${esc(p.t)}</b><span class="mm">${ageLabel(p.from)} · ${K.PREP[p.prep]} · ${K.MESS[p.mess]}</span><p>${esc(p.how)}</p><p class="tl">${esc(p.talk)}</p><p class="sm"><b>2-minute version:</b> ${esc(p.tired)} <b>Safety:</b> ${esc(p.safe)}</p></div></div>`; };
  const css = `@page{size:${w}in ${h}in;margin:0}html,body{width:${w}in;height:auto;overflow:visible}
  .page{width:${w}in;height:${h}in;padding:.55in;position:relative;page-break-after:always;display:flex;flex-direction:column;overflow:hidden}
  h1{font-size:30pt;line-height:1.02}.kick{font-family:"Bricolage Grotesque";font-weight:800;letter-spacing:.08em;text-transform:uppercase;font-size:9.5pt;color:${C.tomato}}
  .lead{font-size:12pt;line-height:1.45;margin:.1in 0 .16in}
  .disc{flex:none}.disc svg{display:block}.mini{display:flex;gap:.18in;align-items:flex-start;border-bottom:1px solid #DCE3EE;padding:.14in 0}.mini>div>b{font-family:"Bricolage Grotesque";font-size:14pt}
  .mm{display:block;font-size:8.5pt;font-weight:700;color:#4A5570}.mini p{font-size:10.4pt;line-height:1.45;margin:.03in 0}.tl{font-family:"Fredoka";font-weight:600;font-size:11.5pt!important}.sm{font-size:9pt!important;color:#4A5570}
  .foot{position:absolute;left:.55in;right:.55in;bottom:.3in;display:flex;justify-content:space-between;font-size:7.5pt;color:#5A6478;border-top:1px solid #DCE3EE;padding-top:.05in}
  .spot{display:grid;grid-template-columns:1fr 1fr;gap:.12in .2in;margin:.1in 0}.spot div{border:1.3px solid #C9D2E1;border-radius:10px;padding:.08in .12in;height:.9in;font-weight:800;font-size:10pt}
  .grid{display:grid;grid-template-columns:repeat(7,1fr);gap:.08in;margin:.14in 0}.cell{border:1.5px solid #C9D2E1;border-top:5px solid ${C.sky};border-radius:10px;padding:.06in;height:1.6in;font-size:8.5pt}.cell b{font-family:"Bricolage Grotesque";font-size:16pt;display:block}
  .hero{display:flex;gap:.2in;align-items:center;background:${C.tSun};border-radius:18px;padding:.2in}.hero .sc{width:3in;height:2.1in;flex:none}
  .box{background:${C.tSky};border-radius:12px;padding:.12in .16in;font-size:10pt;margin-top:.12in}
  .moves5{margin-top:.2in;background:${C.tGrass};border-radius:14px;padding:.16in .2in}.moves5 ol{padding-left:.22in;margin:.08in 0}.moves5 li{font-size:10.3pt;line-height:1.45;margin-bottom:.04in}
  .cta{margin-top:auto;display:flex;gap:.2in;align-items:center;background:${C.tSun};border-radius:14px;padding:.16in}.cta p{font-size:10pt}`;
  const foot = n => `<div class="foot"><span><img src="${MARK}" style="height:.14in;vertical-align:-.03in"> 7 Days of Play First · free starter from ${esc(K.TITLE)}</span><span>${SITE} · ${K.VERSION} · ${n}</span></div>`;
  write(`starter-${key}.html`, base(816, 1056, css) + `
  <section class="page">
    <div class="hero"><div><div class="kick">Free starter</div><h1>7 Days of<br>Play First</h1><p class="lead">Seven easy plays, a screen-spot plan and a tracker. Nothing to buy, nothing to ban.</p><img src="${LOGO}" style="height:.46in"></div><div class="sc">${sceneSvg(sceneCover, '', '20 150 560 360')}</div></div>
    <h3 style="font-size:15pt;margin:.2in 0 .04in">Our screen spot</h3>
    <p style="font-size:10.5pt">Same time, same place, same ending, every day. Never a prize, never a punishment.</p>
    <div class="spot"><div>When</div><div>Where</div><div>What</div><div>How it ends</div></div>
    <div class="box"><b>How it ends, every day:</b> a warning (“Two more minutes, then the tablet goes to sleep”), a clear ending (the episode ends or a timer rings) and a landing (“Now we go outside”).</div>
    <h3 style="font-size:15pt;margin:.2in 0 .04in">7-day tracker</h3>
    <div class="grid">${picks.map((d, i) => `<div class="cell" style="border-top-color:${wc(d.d).c}"><b>${i + 1}</b>${esc(d.play.t)}<br><br>○ played<br>○ spot kept<br>☆ again!</div>`).join('')}</div>
    <p style="font-size:8.5pt;color:#4A5570">Every play follows our published safety rules: a grown-up is always there; nothing small enough to fit through a toilet-paper tube for under-3s; no balloons for under-8s; water play always supervised. Parent education, not medical advice.</p>
    ${foot(1)}
  </section>
  <section class="page">
    <div class="kick">Seven plays</div><h1 style="font-size:24pt;margin-bottom:.06in">One a day, all with things you have</h1>
    ${picks.slice(0, 4).map(mini).join('')}
    ${foot(2)}
  </section>
  <section class="page">
    ${picks.slice(4).map(mini).join('')}
    <div class="moves5"><b class="bric" style="font-size:14pt">Five small talk moves to try this week</b>
      <ol>${['pause and wait', 'say what you see', 'repeat and add one', 'offer a choice', 'follow their lead'].map(k => { const m = Object.values(K.MOVES).find(x => x.name.toLowerCase() === k); return `<li><b>${esc(m.name)}.</b> ${esc(m.tip)}</li>`; }).join('')}</ol>
      <p style="font-size:9.5pt;color:#4A5570">Talk, sing and read in the language you know best. A sign, a point or a tap on a device counts as communicating.</p></div>
    <div class="cta"><div><img src="${MARK}" style="height:.9in"></div><div><b class="bric" style="font-size:14pt">Want the whole month?</b><p>${esc(K.TITLE)}: 30 short lessons by email, 30 plays, plain words for 30 tricky moments and a full workbook. $27, with a 30-day money-back guarantee. Written program; no videos, calls or coaching.</p><p><b>${SITE}/30-days</b></p></div></div>
    ${foot(3)}
  </section>`);
}

// ---------------------------------------------------------------- mockup (1600 x 1200)
{
  const css = `.m{width:1600px;height:1200px;background:${C.wash};position:relative;overflow:hidden}
  .floor{position:absolute;left:0;right:0;bottom:0;height:430px;background:#E6ECF5}
  .sh{box-shadow:0 26px 50px rgba(29,41,64,.22),0 4px 10px rgba(29,41,64,.12)}
  .book{position:absolute;left:150px;top:150px;width:560px;height:700px;border-radius:4px 10px 10px 4px;overflow:hidden}
  .book img{width:100%;height:100%;display:block}.book:after{content:"";position:absolute;left:0;top:0;bottom:0;width:18px;background:linear-gradient(90deg,rgba(0,0,0,.12),rgba(0,0,0,0))}
  .pg{position:absolute;width:470px;height:608px;background:#fff}.pg img{width:100%;display:block}
  .p1{left:760px;top:250px;transform:rotate(-5deg)}.p2{left:1010px;top:215px;transform:rotate(4deg)}
  .phone{position:absolute;left:1180px;top:120px;width:300px;height:600px;border-radius:44px;background:${C.ink};padding:16px}
  .phone .scr{width:100%;height:100%;border-radius:30px;overflow:hidden;background:#fff}.phone img{width:100%;display:block}
  .tag{position:absolute;left:150px;top:960px;font-family:"Bricolage Grotesque";font-weight:800;font-size:44px}
  .tag small{display:block;font-family:"Nunito Sans";font-weight:700;font-size:24px;color:#3A4660;margin-top:8px}`;
  write('mockup.html', base(1600, 1200, css) + `<div class="m"><div class="floor"></div>
    <div class="book sh"><img src="../cover.png"></div>
    <div class="pg p1 sh"><img src="${PV(22)}"></div><div class="pg p2 sh"><img src="${PV(23)}"></div>
    <div class="phone sh"><div class="scr"><img src="dbg/email-shot.png"></div></div>
    <div class="tag">30 lessons by email + a printable workbook<small>Written program · no videos, calls or coaching · paperback on Amazon</small></div></div>`);
}

// ---------------------------------------------------------------- listing images (2000 x 2000)
const SC = (i, css) => `<div style="position:absolute;${css}">${sceneSvg(WEEK_SCENES[i], '', '70 130 470 400')}</div>`;
const L = (n, name, body, bg = C.tSun) => write(`listing-${pad2(n)}-${name}.html`, base(2000, 2000, `
.L{width:2000px;height:2000px;background:${bg};position:relative;overflow:hidden;padding:120px 130px}
.k{font-family:"Bricolage Grotesque";font-weight:800;font-size:40px;letter-spacing:.08em;text-transform:uppercase;color:${C.tomato}}
h1{font-size:118px;line-height:1;margin:18px 0 28px;letter-spacing:-.01em}h1 em{font-style:normal;color:${C.tomato}}
.lead{font-size:44px;line-height:1.35;max-width:1600px}
.sh{box-shadow:0 30px 60px rgba(29,41,64,.2),0 6px 14px rgba(29,41,64,.1)}
.pg{position:absolute;background:#fff}.pg img{width:100%;display:block}
.brand{position:absolute;left:130px;bottom:90px;height:78px}
.pill{display:inline-block;background:#fff;border-radius:99px;padding:14px 30px;font-weight:800;font-size:36px;margin:0 14px 16px 0}
.ico{width:1em;height:1em}`) + `<div class="L">${body}<img class="brand" src="${LOGO}" alt="Play Before Pixels"></div>`);

L(1, 'hero', `<div class="k">Written program · email + workbook</div>
  <h1><em>30</em> Days of<br>Back-and-Forth</h1>
  <p class="lead">30 short lessons · 30 easy plays · plain words for tricky moments</p>
  <div class="pg sh" style="left:130px;top:780px;width:760px;height:950px;border-radius:6px 14px 14px 6px;overflow:hidden"><img src="../cover.png" style="height:100%"></div>
  <div class="pg sh" style="left:960px;top:760px;width:560px;height:725px;transform:rotate(4deg)"><img src="${PV(23)}"></div>
  <div class="sh" style="position:absolute;left:1480px;top:640px;width:390px;height:790px;border-radius:56px;background:${C.ink};padding:20px"><div style="width:100%;height:100%;border-radius:40px;overflow:hidden;background:#fff"><img src="dbg/email-shot.png" style="width:100%"></div></div>
  <div style="position:absolute;right:130px;bottom:100px;font-size:40px;font-weight:800;background:#fff;border-radius:99px;padding:18px 36px">$27 · 30-day money-back guarantee</div>`);

L(2, 'whats-inside', `<div class="k">What’s inside</div><h1>Everything for<br>the whole month</h1>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:34px;margin-top:40px">
  ${[['30', 'daily lessons by email', 'About 3 minutes to read, each under 300 words', C.sky], ['30', 'easy plays', 'Things you already have; easier, harder and 2-minute versions', C.grass], ['38', 'plain-word scripts', 'One for each day, plus 8 extras: the show that won’t end, “I’m bored”, waiting and more', C.sun], ['89', 'page workbook', '60 day pages + 7 planning and tracker pages + 22 guide, week, check-in and bonus pages', C.tomato]].map(([n, t, s, c]) => `<div style="background:#fff;border-radius:36px;padding:44px 50px;border-top:16px solid ${c}"><div class="bric" style="font-size:150px;line-height:1;color:${c === C.sun ? '#B98500' : c}">${n}</div><div class="bric" style="font-size:56px;margin:8px 0 10px">${t}</div><div style="font-size:34px;line-height:1.35;color:#3A4660">${s}</div></div>`).join('')}
  </div>
  <p style="font-size:34px;margin-top:40px;font-weight:700;max-width:1000px">Color and Low-ink editions · US Letter and A4 · type-in pages in free Acrobat Reader</p>${SC(2, 'right:110px;bottom:70px;width:640px;height:545px')}`, '#FFFFFF');

L(3, 'how-it-works', `<div class="k">How it works</div><h1>One small step<br>a day</h1>
  <div style="display:flex;gap:40px;margin-top:70px">
  ${[['book', C.tSky, 'Read', 'A short lesson lands in your inbox each morning.'], ['ball', C.tGrass, 'Play', 'One easy play with things you already have.'], ['hand', C.tTomato, 'Say', 'Plain words for one tricky moment.']].map(([a, t, h, s]) => `<div style="flex:1;background:#fff;border-radius:40px;padding:50px;text-align:center">${artDisc(a, t, 3.2, 'margin:0 auto')}<div class="bric" style="font-size:78px;margin:26px 0 10px">${h}</div><div style="font-size:38px;line-height:1.35">${s}</div></div>`).join('')}
  </div>
  <div style="margin-top:70px;display:flex;flex-wrap:wrap"><span class="pill">No videos</span><span class="pill">No calls or coaching</span><span class="pill">Go at your own pace</span><span class="pill">Nothing to buy</span></div>${SC(1, 'right:110px;bottom:60px;width:620px;height:528px')}`, C.tSky);

L(4, 'a-day-inside', `<div class="k">A day inside</div><h1>Lesson, play,<br>plain words</h1>
  <div class="pg sh" style="left:130px;top:620px;width:840px;height:1087px"><img src="${PV(22)}"></div>
  <div class="pg sh" style="left:1030px;top:620px;width:840px;height:1087px"><img src="${PV(23)}"></div>`, '#FFFFFF');

L(5, 'trackers-and-plans', `<div class="k">Trackers and planning pages</div><h1>Pre-filled, blank<br>and type-in</h1>
  <div class="pg sh" style="left:130px;top:640px;width:620px;height:802px;transform:rotate(-4deg)"><img src="${PV(9)}"></div>
  <div class="pg sh" style="left:700px;top:600px;width:620px;height:802px;transform:rotate(1deg)"><img src="${PV(7)}"></div>
  <div class="pg sh" style="left:1260px;top:660px;width:620px;height:802px;transform:rotate(5deg)"><img src="${PV(82)}"></div>
  <p class="lead" style="position:absolute;left:130px;top:1560px;width:1740px;font-size:38px">Our ordinary day · Our screen spot · Play basket · 30-day tracker · weekly check-ins · family plan · certificate to put on the fridge</p>`, C.tGrass);

L(6, 'ages-and-safety', `<div class="k">Ages 1 to 12</div><h1>One plan for<br>the whole family</h1>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:34px;margin-top:40px;font-size:38px;line-height:1.35">
  ${[['sprout', 'A starting age on every play', 'From 6 months to big kids, with an easier and a harder version.'], ['people', 'Siblings and twins', 'Boxes for toddlers, school-age kids and mixed ages every week.'], ['bolt', 'Tired-grown-up versions', 'Every play has a 2-minute, no-setup version.'], ['shield', 'Every play follows our published safety rules', 'A grown-up is always there. Tube test for under-3s. No balloons for under-8s.']].map(([i, t, s]) => `<div style="background:#fff;border-radius:36px;padding:44px"><div style="font-size:80px;color:${C.tomato}">${ico(i)}</div><div class="bric" style="font-size:50px;margin:10px 0">${t}</div>${s}</div>`).join('')}
  </div>
  <p style="font-size:32px;margin-top:40px;color:#3A4660;max-width:1080px">Parent education, not medical advice. Every child grows on their own timeline; for questions about development, talk with your pediatrician.</p>${SC(4, 'right:110px;bottom:40px;width:520px;height:443px')}`, C.tSun);

L(7, 'screens-have-a-spot', `<div class="k">No banning, no bribes</div><h1>Screens get a<br><em>steady spot</em></h1>
  <p class="lead">Same time, same place, same ending, every day. Never a prize and never a punishment. The rest of the day fills up with easy play and talk.</p>
  <div style="position:absolute;left:130px;right:130px;top:720px;display:flex;gap:40px">
  ${[['1', 'A warning', '“Two more minutes, then the tablet goes to sleep.”'], ['2', 'A clear ending', 'The episode ends or the timer rings. “Night-night, tablet.”'], ['3', 'A landing', '“Now we go outside and find the moon.”']].map(([n, t, s]) => `<div style="flex:1;background:#fff;border-radius:40px;padding:50px"><div class="bric" style="width:110px;height:110px;border-radius:50%;background:${C.sky};color:#fff;display:flex;align-items:center;justify-content:center;font-size:64px">${n}</div><div class="bric" style="font-size:62px;margin:24px 0 12px">${t}</div><div style="font-family:Fredoka;font-size:42px;line-height:1.3">${s}</div></div>`).join('')}
  </div>${SC(3, 'right:110px;bottom:50px;width:560px;height:477px')}`, C.tPlum);

L(8, 'guarantee-and-bundle', `<div class="k">Simple pricing</div><h1>$27, or $49<br>as a bundle</h1>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px">
  <div style="background:#fff;border-radius:40px;padding:56px"><div class="bric" style="font-size:60px">The program</div><div class="bric" style="font-size:150px;color:${C.tomato};line-height:1.1">$27</div><div style="font-size:36px;line-height:1.45">30 lessons by email<br>Workbook: Color + Low-ink, Letter + A4<br>Type-in pages<br>Scripts bank and certificate</div></div>
  <div style="background:#fff;border-radius:40px;padding:56px;border:10px solid ${C.sun}"><div class="bric" style="font-size:60px">The bundle</div><div class="bric" style="font-size:150px;color:${C.tomato};line-height:1.1">$49</div><div style="font-size:36px;line-height:1.45">The program, plus:<br>Play-First Family Kit<br>100 Screen-Free Plays (printable)<br>150 “I’m Bored” Play Cards<br><span style="color:#3A4660">$54.49 if bought separately</span></div></div>
  </div>
  <div style="margin-top:50px;background:${C.tGrass};border-radius:40px;padding:44px 56px;font-size:40px;line-height:1.4"><b class="bric" style="font-size:52px">30-day money-back guarantee.</b><br>Not right for your family? Email us within 30 days of purchase for a full refund. No questions asked.</div>${SC(4, 'right:110px;bottom:40px;width:470px;height:400px')}`, '#FFFFFF');

// ---------------------------------------------------------------- sales page (designed HTML; copy mirrored in sales-page.md)
{
  const css = `html,body{width:1280px;height:auto;overflow:visible;background:#fff}
  .wrap{max-width:1040px;margin:0 auto;padding:0 40px}
  section{padding:88px 0}.k{font-family:"Bricolage Grotesque";font-weight:800;letter-spacing:.08em;text-transform:uppercase;font-size:15px;color:${C.tomato}}
  h1{font-size:72px;line-height:1;margin:14px 0 20px}h2{font-size:46px;line-height:1.05;margin:10px 0 22px}h3{font-size:22px;margin-bottom:6px}
  p{font-size:19px;line-height:1.55;margin-bottom:12px}.lead{font-size:23px}
  .btn{display:inline-block;background:${C.tomato};color:#fff;font-weight:800;font-size:20px;padding:18px 34px;border-radius:99px;text-decoration:none}
  .quiet{color:${C.ink};font-weight:700;font-size:17px;margin-left:18px}
  .hero{background:${C.tSun}}.hero .wrap{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}.hero img{width:100%;border-radius:8px;box-shadow:0 20px 40px rgba(29,41,64,.18)}
  .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}.card{background:${C.wash};border-radius:22px;padding:28px}
  .list{columns:2;column-gap:40px;padding-left:22px}.list li{font-size:18px;line-height:1.5;margin-bottom:10px;break-inside:avoid}
  .peek{display:grid;grid-template-columns:1fr 1fr;gap:26px}.peek img{width:100%;box-shadow:0 14px 30px rgba(29,41,64,.16)}
  .two{display:grid;grid-template-columns:1fr 1fr;gap:26px}
  .guar{background:${C.tGrass}}.faq details{border-bottom:1px solid #DCE3EE;padding:16px 0}.faq summary{font-weight:800;font-size:20px;cursor:pointer}
  .price{background:#fff;border-radius:26px;padding:34px;border:2px solid #DCE3EE}.price.b{border:4px solid ${C.sun}}.pp{font-family:"Bricolage Grotesque";font-weight:800;font-size:64px;color:${C.tomato}}
  footer{background:${C.ink};color:#fff;padding:40px 0;font-size:14px}footer img{height:40px}
  .founder{border:2px dashed ${C.tomato};border-radius:16px;padding:20px;color:#4A5570}`;
  const faq = K.FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  write('sales-page.html', base(1280, 800, css) + `
<section class="hero"><div class="wrap"><div>
  <div class="k">A written program for families with children aged 1 to 12</div>
  <h1 style="font-size:60px;white-space:nowrap">30 Days of<br>Back-and-Forth</h1>
  <p class="lead">More play and talk, with screens in a steady spot. One short lesson, one easy play and plain words for one tricky moment, every morning for 30 days.</p>
  <p><a class="btn" href="{{program_checkout_link}}">Start the 30 days · $27</a><a class="quiet" href="#inside">See what’s inside</a></p>
  <p style="font-size:15px;color:#3A4660">30-day money-back guarantee · no videos, calls or coaching · nothing to buy</p>
</div><div><img src="../mockup.png" alt="30 Days of Back-and-Forth cover, two workbook pages and a phone showing a lesson email"></div></div></section>

<section><div class="wrap">
  <div class="k">How it works</div><h2>Three minutes to read. One play to try.</h2>
  <div class="g3">
    <div class="card"><h3>Read</h3><p>A short lesson arrives each morning. Each one is under 300 words and ends with one small step.</p></div>
    <div class="card"><h3>Play</h3><p>One easy play with things you already have, with a version for little ones, big kids and tired grown-ups.</p></div>
    <div class="card"><h3>Say</h3><p>Plain words for one tricky moment: the show that won’t end, “I’m bored”, the hour before dinner.</p></div>
  </div>
  <p style="margin-top:22px">We don’t ban anything. Screens get a steady spot in the day, the same time and the same ending, and they’re never a prize or a punishment. The rest of the day fills up with ordinary play.</p>
</div></section>

<section id="inside" style="background:${C.wash}"><div class="wrap">
  <div class="k">What’s inside</div><h2>Everything for the whole month</h2>
  <ul class="list">
    <li><b>30 daily lessons by email</b>, about 3 minutes each</li>
    <li><b>30 easy plays</b> with a starting age, easier and harder versions and a 2-minute version</li>
    <li><b>38 plain-word scripts</b> for tricky moments</li>
    <li><b>An 89-page workbook</b>: Color and Low-ink, US Letter and A4</li>
    <li><b>Planning pages</b>: our ordinary day, our screen spot, our play basket</li>
    <li><b>Trackers</b>: pre-filled and blank, type-in in free Acrobat Reader</li>
    <li><b>Weekly check-ins</b> and a one-page summary for every week</li>
    <li><b>A family plan and a certificate</b> to celebrate Day 30</li>
  </ul>
  <div class="peek" style="margin-top:30px"><img src="../preview/p22.png" alt="Day 6 lesson page"><img src="../preview/p23.png" alt="Day 6 play page"></div>
</div></section>

<section><div class="wrap two">
  <div><div class="k">It covers</div><h2>The moments that are actually hard</h2><p>Ending screen time kindly. Mornings. The hour before dinner. Big feelings. Waiting rooms and car rides. Grown-up phones. Big kids who say “everyone else gets to”. Siblings and twins. Grandparents and sitters. Sick days and travel days.</p></div>
  <div><div class="k">Is it for us?</div><h2>Good fit if…</h2><p>You want calmer days without banning screens. You like reading more than watching videos. You want ideas that use what you already have.</p><p><b>Not a fit if</b> you’re looking for treatment, a diagnosis or personal advice about your child. It’s parent education. For questions about development, talk with your pediatrician.</p></div>
</div></section>

<section style="background:${C.tSky}"><div class="wrap">
  <div class="k">Pricing</div><h2>Pick one</h2>
  <div class="two">
    <div class="price"><h3>The program</h3><div class="pp">$27</div><p>30 lessons by email, the full workbook, scripts bank and certificate.</p><a class="btn" href="{{program_checkout_link}}">Start the 30 days</a></div>
    <div class="price b"><h3>The 30 Days of Back-and-Forth Bundle</h3><div class="pp">$49</div><p>The program plus the Play-First Family Kit, 100 Screen-Free Plays (printable) and 150 “I’m Bored” Play Cards. $54.49 if bought separately.</p><a class="quiet" style="margin:0" href="{{bundle_checkout_link}}">Choose the bundle →</a></div>
  </div>
  <p style="margin-top:18px;font-size:16px">Prefer paper? The whole program is also a black-and-white paperback on Amazon.</p>
</div></section>

<section class="guar"><div class="wrap"><div class="k">Our guarantee</div><h2>30 days, full refund, no questions</h2><p class="lead">If the program isn’t right for your family, email us within 30 days of purchase for a full refund. You don’t need to have finished anything, and you don’t need to explain.</p></div></section>

<section><div class="wrap">
  ${K.FOUNDER.salesNote === 'skip' ? '' : K.FOUNDER.salesNote ? `<div class="k">A note from us</div><p class="lead">${esc(K.FOUNDER.salesNote)}</p>` : `<div class="founder"><b style="color:${C.tomato}">FOUNDER WRITES THIS (optional):</b> a short note in your own words about why you made this program. Put it in FOUNDER.salesNote in build/content.js, or set it to 'skip' to leave this section out. No names, photos or credentials needed. Reviews go here only after the founding beta, with written permission, and never about speech, development or behavior results.</div>`}
</div></section>

<section class="faq" style="padding-top:20px"><div class="wrap"><div class="k">Questions</div><h2>Questions parents ask</h2>${faq}</div></section>

<footer><div class="wrap"><img src="${LOGO_W}" alt="Play Before Pixels"><p style="font-size:14px;margin-top:12px;color:#C9D2E1">${COPY} Parent education, not medical advice. Every play follows our published safety rules. <a style="color:#fff" href="/help">Help center</a> · <a style="color:#fff" href="/refunds">Refund policy</a> · <a style="color:#fff" href="/privacy">Privacy</a></p></div></footer>`);
}
console.log('extras written');
