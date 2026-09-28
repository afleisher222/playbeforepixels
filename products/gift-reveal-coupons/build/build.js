// Printable Gift-Reveal Cards and Play Coupons: every edition's HTML and the render jobs.
//   node build.js   (then: bash make.sh renders, finishes, checks and makes the store images)
// Sold alone ($5.00) and included free inside both bundles (their ZIP manifests point at these files).
'use strict';
const path = require('path');
const K = require('../../bundle-gift-1-5/build/shared/kit.js');
const P = require('../../bundle-gift-1-5/build/shared/product.js');
const G = require('../../bundle-gift-1-5/build/shared/gift.js');
const { COUPONS, NOBUY } = require('./content.js');
const { C, D, esc, icon, mi, ageChip, field, logo, qr, bonusUrl } = K;

const SLUG = 'gift-reveal-coupons';
const PRODUCT = 'Gift-Reveal Cards and Play Coupons';
const HC = { sky: [C.sky, C.tSky], plum: [C.plum, C.tPlum], grass: [C.grass, C.tGrass], tomato: [C.tomato, C.tTomato], sun: [C.sun, C.tSun] };

function cover(ctx) {
  const fan = [COUPONS[0], COUPONS[1], COUPONS[4]];
  return `<div class="cv">
    <div class="cv-top li-white">
      ${logo(ctx, 'lockup', null, 'lockup cv-logo')}
      <p class="kicker d-tomato">Printable gift add-on · Ages 1–5</p>
      <h1>Play Coupons</h1>
      <h2>and gift-reveal cards</h2>
      <p class="lede">16 play coupons a grown-up can give a child, plus cards that turn any gift of play into a surprise.</p>
      <div class="cv-fan">${fan.map((p, i) => `<div class="fanc" style="transform:rotate(${[-7, 1, 8][i]}deg) scale(.86);left:${[0, 205, 410][i]}px;top:${[26, 0, 30][i]}px">${coupon(ctx, p, true)}</div>`).join('')}</div>
    </div>
    <div class="cv-low">
      <div class="tiles">
        <div class="tile li-white"><b>16</b><span>play coupons</span></div>
        <div class="tile li-white"><b>${NOBUY}</b><span>need nothing to buy</span></div>
        <div class="tile li-white"><b>3</b><span>gift-reveal cards</span></div>
        <div class="tile li-white"><b>8</b><span>blank coupons + a cover</span></div>
      </div>
      <p class="prepline li-white"><b>Prep:</b> about 10 minutes to print, cut on straight lines and staple. No cutting? Give the whole coupon page, folded like a letter.</p>
      <div class="peek">${COUPONS.slice(0, 8).map(p => `<div class="pk"><div class="pk-d li-white">${icon(p.art, ctx, 42)}</div><span>${esc(p.t)}</span></div>`).join('')}</div>
    </div>
  </div>`;
}

function coupon(ctx, p, mini = false) {
  const [c, t] = HC[p.c];
  return `<div class="cp li-edge" style="--c:${c};--t:${t}">
    <div class="cp-side li-white">${icon(p.art, ctx, mini ? 56 : 62)}<span class="cp-no">No. ${p.n}</span></div>
    <div class="cp-main">
      <p class="cp-k">Play coupon · good for</p>
      <h3>${esc(p.t)}</h3>
      <p class="cp-how">${esc(p.how)}</p>
      <p class="cp-talk">${mi('talk', 11, D.sky)} ${esc(p.talk)}</p>
      <div class="cp-flags">${ageChip(p.age, 'sm')}<span class="flag">${mi('grownup', 10)} With a grown-up</span>${p.buy ? `<span class="flag">${mi('needs', 10)} Needs: ${esc(p.needs.split(',')[0])}</span>` : `<span class="flag go">${mi('nobuy', 10, D.grass)} Nothing to buy</span>`}</div>
    </div>
  </div>`;
}

function blankCoupon(ctx, k) {
  return `<div class="cp blank li-edge" style="--c:${C.sky};--t:${C.tSky}">
    <div class="cp-side li-white">${icon('heart', ctx, 56)}</div>
    <div class="cp-main">
      <p class="cp-k">Play coupon · good for</p>
      <div class="field cp-f" ${field(`blank_${k}_play`, { size: 14 })}></div>
      <div class="field cp-f" ${field(`blank_${k}_note`, { size: 11 })}></div>
      <div class="cp-tf"><span>To</span><div class="field" ${field(`blank_${k}_to`, { size: 10 })}></div><span>From</span><div class="field" ${field(`blank_${k}_from`, { size: 10 })}></div></div>
    </div>
  </div>`;
}

function bookCover(ctx) {
  return `<div class="cp bookcv li-edge" style="--c:${C.tomato};--t:${C.tTomato}">
    <div class="bk-in">
      <p class="cp-k">A book of</p>
      <h3>Play Coupons</h3>
      <div class="cp-tf"><span>For</span><div class="field" ${field('book_for', { size: 12 })}></div></div>
      <div class="cp-tf"><span>From</span><div class="field" ${field('book_from', { size: 12 })}></div></div>
    </div>
    <div class="bk-ic li-white">${icon('gift', ctx, 64)}</div>
  </div>`;
}

function couponPage(ctx, items, title) {
  return `<div class="pad">
    <div class="cphead"><div><p class="kicker d-tomato">${esc(title)}</p><h2 class="ptitle sm">Cut, stack and staple, or give the whole page</h2></div>
    <span class="cutnote">${mi('scissors', 14)} Cut on the dashed lines · Grown-up keeps the pieces</span></div>
    <div class="cgrid">${items.map(x => `<div class="cell">${x}</div>`).join('')}</div>
  </div>`;
}

function guide(ctx) {
  return `<div class="pad">
    <p class="kicker d-sky">Grown-up guide</p>
    <h2 class="ptitle">How to give a gift of play</h2>
    <p class="lede2">A coupon is a promise to play: time together, not a thing to buy. It takes about 2 minutes to set up and works as a gift on its own or tucked in with another gift.</p>
    <div class="g3">
      <div class="box li-white"><h4>1 · Pick</h4><p>Choose 3–6 coupons that suit your child’s age. Each shows a starting age. Fill in a blank one with a play your family already loves.</p></div>
      <div class="box li-white"><h4>2 · Wrap</h4><p>Cut them out, add the coupon-book cover and staple the stack at the left edge. Or fold the whole page like a letter.</p></div>
      <div class="box li-white"><h4>3 · Reveal</h4><p>Use the fold card or a reveal card to say what’s inside. Your child hands you a coupon when they want to play it.</p></div>
    </div>
    <h3 class="sub">Talk while you play</h3>
    <div class="g3">
      <div class="box li-white"><h4>Pause and wait</h4><p>Say a little, then stop. A look, a sound or a wiggle is an answer.</p><p class="ex">“Ready, set… (wait) roll!”</p></div>
      <div class="box li-white"><h4>Say what you see</h4><p>Put words to what your child is doing, right as it happens.</p><p class="ex">“Big bubble… POP!”</p></div>
      <div class="box li-white"><h4>Offer a choice</h4><p>Hold up two things and wait. Pointing counts as an answer.</p><p class="ex">“Left or right?”</p></div>
    </div>
    <div class="note li-white">${icon('star', ctx, 54)}<p><b>Most children love 2–3 of these</b> and ask for them again and again. Say yes as often as you can, and let the rest wait. <b>Talk, sing and read in the language you know best.</b> A sign, a point or a device tap counts as communicating.</p></div>
    <div class="g2" style="margin-top:14px">
      <div class="box li-white"><h4>Why coupons?</h4><p>Young children learn in back-and-forth moments with the people who love them. A coupon puts one of those moments on the calendar. It adds play; it never takes anything away.</p></div>
      <div class="box li-white"><h4>A few house rules</h4><p>Coupons never expire and are never taken back. They are never traded for screen time or sweets, and they are never a reward for good behavior. They are just for fun.</p></div>
    </div>
  </div>`;
}

function keyPage(ctx, items, n) {
  return `<div class="pad">
    <p class="kicker d-plum">Coupon key · ${n}</p>
    <h2 class="ptitle sm">Easier, harder, a 2-minute version and a safety line for every coupon</h2>
    <div class="key">${items.map(p => `<div class="kr li-white">
      <div class="kr-h">${icon(p.art, ctx, 34)}<b>${p.n}. ${esc(p.t)}</b>${ageChip(p.age, 'sm')}<span class="kr-m">${mi('from', 11)} From ${p.from} mo · ${mi('needs', 11)} ${esc(p.needs)}</span></div>
      <div class="kr-b">
        <p>${mi('easy', 12, D.grass)}<span><b>Easier:</b> ${esc(p.easy)}</span></p>
        <p>${mi('hard', 12, D.plum)}<span><b>Harder:</b> ${esc(p.hard)}</span></p>
        <p>${mi('two', 12, D.sky)}<span><b>2-minute:</b> ${esc(p.two)}</span></p>
        <p class="kr-s">${mi('safe', 12, D.tomato)}<span><b>Safety:</b> ${esc(p.safe)}</span></p>
      </div></div>`).join('')}</div>
  </div>`;
}

function answers(ctx) {
  const faq = [
    ['Which file do I print?', `Pick one: US Letter or A4, color or low-ink. Every file has the same ${ctx.total} pages. Print at “Actual size” or 100%.`],
    ['Which pages?', 'Page 3 (fold card), 4 (reveal cards), 5–6 (coupons) and 7 (blank coupons and the cover). Pages 2 and 8–9 are for you.'],
    ['What paper?', 'Card stock makes sturdy coupons; plain paper works. Print the fold card on its own sheet and leave the back blank for your message.'],
    ['Can I type in it?', 'Yes, with a free PDF reader: the For and From lines, the reveal-card lines and the blank coupons. Pictures and colors can’t be changed.'],
    ['What age is it for?', 'Ages 1–5. Every coupon shows a starting age in months. Pick the ones that fit; the coupon key has an easier version of each.'],
    ['Can I share it?', 'Your license covers one household, plus the child you give the coupons to. Please don’t share the files.'],
  ];
  const rules = [
    ['grownup', 'A grown-up plays too', 'Every coupon is for a child and a grown-up together.'],
    ['safe', 'The toilet-paper tube test', 'For children under 3, anything that fits through a toilet-paper tube (about 1.25 in or 3.2 cm) stays out of reach.'],
    ['heart', 'Food and allergies', 'Soft food cut small, eaten sitting down. No whole grapes, nuts, popcorn or hard candy for little ones.'],
    ['needs', 'No cords, no balloons', 'No cords, ribbons, scarves or ties left with a child. No balloons for children under 8.'],
  ];
  return `<div class="pad">
    <p class="kicker d-tomato">Safety and quick answers</p>
    <h2 class="ptitle">Good to know</h2>
    <p class="lede2">Every coupon follows these rules, and the coupon key has a safety line for each one. You know your child best: skip or change anything that doesn’t suit them.</p>
    <div class="g2">${rules.map(([m, h, t]) => `<div class="box rule li-white">${mi(m, 18, D.tomato)}<div><h4>${h}</h4><p>${t}</p></div></div>`).join('')}</div>
    <h3 class="sub">Quick answers</h3>
    <div class="g2">${faq.map(([q, a]) => `<div class="box li-white"><h4>${q}</h4><p>${a}</p></div>`).join('')}</div>
    <p class="small note2">These are everyday play ideas for families, not medical or developmental advice. Questions about your child’s growth or health? Your child’s doctor is a good place to start.</p>
  </div>`;
}

function more(ctx) {
  const nx = [
    ['gift', C.sky, 'Ages 1–5 Instant Gift Bundle', 'The busy book, family kit pages and two play-card sets in one download, with these coupons inside.'],
    ['binder', C.plum, 'Toddler Busy Book', '74 activities for ages 1–5: matching, colors, shapes, pretend play and mazes.'],
    ['talkcard', C.tomato, '52 Play & Talk Cards', 'One play and one talk tip on every card, for ages 0–5.'],
  ];
  return `<div class="pad">
    <p class="kicker d-plum">What’s next</p>
    <h2 class="ptitle">More from Play Before Pixels</h2>
    <p class="lede2">${ctx.edition === 'etsy' ? 'Find them in our shop.' : 'Find them all at playbeforepixels.com.'}</p>
    <div class="nexts">${nx.map(([a, c, h, t]) => `<div class="nx li-white" style="--c:${c}"><div class="nx-ic">${icon(a, ctx, 56)}</div><div><h4>${h}</h4><p>${t}</p></div></div>`).join('')}</div>
    <div class="bonus store-only li-white">
      <div class="qrwrap">${qr(bonusUrl(SLUG), 118)}</div>
      <div><p class="kicker">For grown-ups</p><h4>Free printable: Five 5-Minute Plays</h4>
      <p>Scan for the free printable and the monthly “3 plays for your child’s age” email. We ask only for your email and, if you like, your child’s birth month and year. Never names.</p>
      <p class="small">playbeforepixels.com/bonus/gift-reveal-coupons · Lost your files? playbeforepixels.com/help</p></div>
    </div>
    <div class="bonus etsy-only li-white">${icon('heart', ctx, 70)}<div><h4>Thank you for playing with us</h4>
      <p>Your files stay on your Purchases page, so you can download them again any time. If something won’t open or print, send us a message through the shop.</p></div></div>
    <div class="colophon">
      <p><b>${PRODUCT}, ages 1–5.</b> ${ctx.version}. Everyday play ideas for families, not medical or developmental advice. Every play follows our published safety rules; a grown-up is always there.</p>
      <p>Personal license: one household, plus the child you give the coupons to. Please don’t resell or share the files.</p>
      <p>${K.OWNER} Text, illustrations and page design were made with AI tools for Play Before Pixels.</p>
    </div>
  </div>`;
}

function startHere(ctx) {
  const files = ctx.edition === 'etsy'
    ? [['1-START-HERE.pdf', 'This page.'], ['2-Color-US-Letter.pdf', 'Color, US Letter (8.5 × 11 in).'], ['3-Color-A4.pdf', 'Color, A4.'], ['4-Low-Ink-US-Letter.pdf', 'Low-ink, US Letter: white pages, line art to color.'], ['5-Low-Ink-A4.pdf', 'Low-ink, A4.']]
    : [['START-HERE.pdf', 'This page.'], [`${SLUG}.pdf`, 'Color, US Letter (8.5 × 11 in).'], [`${SLUG}-A4.pdf`, 'Color, A4.'], [`${SLUG}-low-ink.pdf`, 'Low-ink, US Letter: white pages, line art to color.'], [`${SLUG}-low-ink-A4.pdf`, 'Low-ink, A4.']];
  return `<div class="pad">
    ${logo(ctx, 'lockup', null, 'lockup sh-logo')}
    <div class="sh-top"><div><p class="kicker d-tomato">Start here · ${PRODUCT}</p>
      <h2 class="ptitle">Welcome! Here’s how to begin.</h2>
      <p class="lede2">16 play coupons for ages 1–5, 8 blank coupons, a coupon-book cover and 3 gift-reveal cards. About 10 minutes to print, cut and staple.</p></div>
      ${icon('gift', ctx, 86)}</div>
    <h3 class="sub">Your files: pick one to print</h3>
    <ul class="files">${files.map(([f, t]) => `<li class="li-white"><b>${f}</b><span>${t}</span></li>`).join('')}</ul>
    <p class="small">Every file has the same ${ctx.total} pages. Letter is the usual size in the US and Canada; A4 almost everywhere else.</p>
    <div class="g2" style="margin-top:14px">
      <div class="shb li-white"><h4>${mi('print', 16)} Print settings</h4><p>Print at <b>Actual size</b> or <b>100%</b>. Card stock is best. Print pages 3–7; read the guide and coupon key on screen.</p></div>
      <div class="shb li-white"><h4>${mi('scissors', 16)} Then</h4><p>Cut on the dashed lines, stack your coupons behind the cover and staple once at the left edge.</p></div>
      <div class="shb li-white"><h4>${mi('phone', 16)} On a phone?</h4><p>${ctx.edition === 'etsy' ? 'Download in a web browser, not the shopping app. Your files stay on your Purchases page.' : 'Open the download link in a web browser and save each PDF. Lost it? playbeforepixels.com/help'}</p></div>
      <div class="shb li-white"><h4>${mi('safe', 16, D.tomato)} Safety first</h4><p>Check the coupon key before you give a coupon: each has its own safety line and a starting age.</p></div>
    </div>
    <p class="small tight">Personal license for one household. ${K.OWNER}</p>
  </div>`;
}

function pages(ctx) {
  const blank = [bookCover(ctx)].concat([1, 2, 3, 4, 5, 6, 7].map(k => blankCoupon(ctx, k)));
  return [
    { html: cover(ctx), label: 'Cover' },
    { html: guide(ctx), label: 'Grown-up guide' },
    { html: G.foldCard(ctx, { prefix: 'fold', kicker: 'A gift for you', title: 'A gift<br>of play', sub: 'Time together, one coupon at a time.', icons: ['tent', 'notes', 'bubbles', 'blocks'], backLine: 'Play coupons for ages 1–5' }), label: 'Fold card' },
    { html: G.revealCards(ctx, { prefix: 'reveal', kicker: 'Surprise!', title: 'Inside is…', art1: 'gift', art2: 'star' }), label: 'Reveal cards' },
    { html: couponPage(ctx, COUPONS.slice(0, 8).map(p => coupon(ctx, p)), 'Play coupons · 1–8'), label: 'Coupons 1–8' },
    { html: couponPage(ctx, COUPONS.slice(8, 16).map(p => coupon(ctx, p)), 'Play coupons · 9–16'), label: 'Coupons 9–16' },
    { html: couponPage(ctx, blank, 'Your own coupons and the book cover'), label: 'Blank coupons' },
    { html: keyPage(ctx, COUPONS.slice(0, 8), '1–8'), label: 'Coupon key 1–8' },
    { html: keyPage(ctx, COUPONS.slice(8, 16), '9–16'), label: 'Coupon key 9–16' },
    { html: answers(ctx), label: 'Good to know' },
    { html: more(ctx), label: 'More from Play Before Pixels' },
  ];
}

function extraCss(ctx) {
  const H = ctx.H;
  return P.commonCss(ctx) + G.css(ctx) + `
.ptitle.sm{font-size:24px;margin:4px 0 0;line-height:1.15}
.ex{margin-top:6px;font-weight:800;color:${D.sky}}
body.lowink .ex{color:${C.ink}}
.note{display:flex;gap:14px;align-items:center;background:${C.tSun};border-radius:16px;padding:12px 16px;margin-top:16px;font-size:13.4px;line-height:1.5}
.note2{margin-top:14px;background:${C.wash};border-radius:12px;padding:10px 14px}
.rule{display:flex;gap:10px;background:${C.tTomato}}
/* cover */
.cv{position:absolute;inset:0;background:${C.wash}}
.cv-top{position:absolute;left:0;right:0;top:0;height:${Math.round(H * 0.66)}px;background:${C.tTomato};padding:40px 52px}
.cv-logo{height:30px;margin-bottom:22px}
.cv h1{font-size:92px;line-height:.95;letter-spacing:-.035em;margin-top:12px}
.cv h2{font-size:40px;color:${D.tomato};margin-top:6px}
body.lowink .cv h2{color:${C.ink}}
.cv .lede{font-size:17px;line-height:1.45;font-weight:600;max-width:460px;margin-top:14px}
.cv-fan{position:absolute;left:30px;right:30px;bottom:30px;height:250px}
.fanc{position:absolute;width:360px;height:212px}
.fanc .cp{box-shadow:0 10px 24px rgba(29,41,64,.16)}
body.lowink .fanc .cp{box-shadow:none}
.cv-low{position:absolute;left:52px;right:52px;top:${Math.round(H * 0.66) + 24}px}
.tile{background:#FFFFFF}
.peek{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;margin-top:16px}
.pk{display:flex;flex-direction:column;align-items:center;text-align:center;gap:5px}
.pk-d{width:60px;height:60px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center}
.pk span{font-size:10px;font-weight:800;line-height:1.2}
.prepline{background:#FFFFFF;border-radius:12px;padding:10px 14px;margin-top:12px;font-size:13px}
body.lowink .cv,body.lowink .cv-top{background:#FFFFFF!important}
body.lowink .cv-top{border-bottom:3px solid ${C.ink}}
/* coupon grid: 2 x 4 straight-line cuts */
.cphead{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}
.cgrid{flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,1fr);border-top:1.6px dashed #8C96AA;border-left:1.6px dashed #8C96AA}
.cell{border-right:1.6px dashed #8C96AA;border-bottom:1.6px dashed #8C96AA;padding:9px;min-height:0}
.cp{width:100%;height:100%;display:flex;background:#FFFFFF;border-radius:14px;box-shadow:inset 0 0 0 2.5px var(--c);overflow:hidden}
.cp-side{flex:none;width:84px;background:var(--t);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border-right:2px dashed var(--c)}
.cp-no{font-family:"Fredoka",sans-serif;font-weight:600;font-size:12px}
.cp-main{flex:1;min-width:0;padding:9px 11px 8px;display:flex;flex-direction:column;gap:3px}
.cp-k{font-size:8.6px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#3C4760}
.cp h3{font-size:19px;letter-spacing:-.015em;line-height:1.05}
.cp-how{font-size:11.2px;line-height:1.32}
.cp-talk{font-size:10.6px;font-weight:800;line-height:1.3;display:flex;gap:4px;align-items:flex-start}
.cp-talk .mi{margin-top:1px}
.cp-flags{margin-top:auto;display:flex;gap:4px;flex-wrap:wrap}
.cp-flags .chip.sm,.kr-h .chip.sm{font-size:9px;padding:1px 6px 1px 4px}
.cp-flags .flag{font-size:8.4px;padding:1px 5px}
.cp-f{height:22px;background:transparent}
.cp-tf{margin-top:auto;display:grid;grid-template-columns:auto 1fr auto 1fr;gap:6px;align-items:end;font-size:10px;font-weight:800}
.cp-tf .field{height:18px;min-height:0;background:transparent}
.bookcv{background:var(--t);align-items:center;gap:10px;padding:0 16px}
.bk-in{flex:1;display:flex;flex-direction:column;gap:6px}
.bk-in h3{font-size:30px}
.bk-in .cp-tf{grid-template-columns:auto 1fr;margin-top:4px}
.bk-ic{width:84px;height:84px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center}
body.lowink .cp{box-shadow:inset 0 0 0 2px ${C.ink}}
body.lowink .cp-side,body.lowink .bookcv{background:#FFFFFF;border-color:${C.ink}}
/* key */
.key{flex:1;display:flex;flex-direction:column;gap:8px;margin-top:10px}
.kr{flex:1;background:${C.wash};border-radius:14px;padding:7px 12px;display:flex;flex-direction:column;gap:4px}
.kr-h{display:flex;align-items:center;gap:8px;font-size:14px}
.kr-m{margin-left:auto;font-size:10.5px;font-weight:700;color:#3C4760;display:flex;gap:4px;align-items:center}
.kr-b{display:grid;grid-template-columns:1fr 1fr;gap:3px 14px}
.kr-b p{display:flex;gap:5px;align-items:flex-start;font-size:10.8px;line-height:1.35}
.kr-b .mi{margin-top:1px}
.kr-s{grid-column:1 / -1}
body.lowink .kr{background:#FFFFFF;box-shadow:inset 0 0 0 1.5px ${C.line}}
`;
}

const TOC = [['Cover', 1], ['Grown-up guide', 2], ['Fold card', 3], ['Reveal cards', 4], ['Coupons 1–8', 5], ['Coupons 9–16', 6], ['Blank coupons and cover', 7], ['Coupon key', 8], ['Good to know', 10], ['More from Play Before Pixels', 11]];
const res = P.run({
  slug: SLUG, product: PRODUCT, buildDir: __dirname, pages, extraCss, startHere, toc: TOC,
  meta: { subject: '16 printable play coupons for ages 1-5 with a coupon key, blank coupons, a coupon-book cover and gift-reveal cards', keywords: 'play coupons, gift reveal card, printable, toddler, screen-free play' },
  storeName: (ink, size) => `${SLUG}${ink === 'lowink' ? '-low-ink' : ''}${size === 'a4' ? '-A4' : ''}.pdf`,
  etsyName: (ink, size) => `etsy-upload/${{ 'color-letter': '2-Color-US-Letter', 'color-a4': '3-Color-A4', 'lowink-letter': '4-Low-Ink-US-Letter', 'lowink-a4': '5-Low-Ink-A4' }[`${ink}-${size}`]}.pdf`,
  startName: { store: 'START-HERE.pdf', etsy: 'etsy-upload/1-START-HERE.pdf' },
});
module.exports = { coupon, COUPONS, res };
