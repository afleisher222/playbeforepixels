// Bundle pages shared by products/bundle-gift-1-5 and products/bundle-library-0-5: a bundle cover, a one-page
// "What's inside" guide, a gift-reveal fold card, reveal cards listing the contents, and the last page; plus the
// 1-page START HERE. The parts' own PDFs are not copied: build/zip-config.json + shared/manifest.py name them,
// and the upload-packet step zips them.
// No prices appear in any PDF (prices can change; the listing carries them).
'use strict';
const path = require('path');
const fs = require('fs');
const K = require('./kit.js');
const P = require('./product.js');
const G = require('./gift.js');
const { C, D, esc, icon, mi, logo, qr, bonusUrl } = K;

// B: { slug, product, short, ages, kicker, count, parts: [{art, color, name, count, ages, what, begin, folder}],
//      free: {art, name, what, folder}, fold: {...}, next: [[art,color,name,text]], firstWeek: [..], bg }
function make(B, buildDir) {
  const HC = { sky: [C.sky, C.tSky, D.sky], plum: [C.plum, C.tPlum, D.plum], grass: [C.grass, C.tGrass, D.grass], tomato: [C.tomato, C.tTomato, D.tomato], sun: [C.sun, C.tSun, D.sun] };

  function cover(ctx) {
    const n = B.parts.length;
    return `<div class="cv">
      <div class="cv-top li-white" style="background:${B.bg || C.tSky}">
        ${logo(ctx, 'lockup', null, 'lockup cv-logo')}
        <p class="kicker d-tomato">${esc(B.kicker)}</p>
        <h1>${B.titleHtml}</h1>
        <p class="lede">${esc(B.lede)}</p>
        <div class="cv-art">${G.giftArt(ctx, 330)}</div>
      </div>
      <div class="cv-parts n${n}">${B.parts.map(p => {
        const [c, t, d] = HC[p.color];
        return `<div class="cvp li-white" style="--c:${c};--t:${t}"><div class="cvp-ic li-white">${icon(p.art, ctx, 58)}</div><div><h4>${esc(p.name)}</h4><p>${esc(p.count)}</p><p class="cvp-age">${esc(p.ages)}</p></div></div>`;
      }).join('')}</div>
      <div class="cv-free li-white">${mi('gift', 18, D.tomato)}<p><b>Also inside:</b> ${esc(B.free.name)}, ${esc(B.free.what)}</p></div>
    </div>`;
  }

  function inside(ctx) {
    return `<div class="pad">
      <p class="kicker d-sky">What’s inside · ${esc(B.product)}</p>
      <h2 class="ptitle">${esc(B.insideTitle)}</h2>
      <p class="lede2">${esc(B.insideLede)}</p>
      <div class="rows">${B.parts.concat([Object.assign({ color: 'tomato', free: true }, B.free)]).map((p, i) => {
        const [c, t] = HC[p.color];
        return `<div class="row li-white" style="--c:${c};--t:${t}">
          <div class="row-ic li-white">${icon(p.art, ctx, 50)}</div>
          <div class="row-main"><h4>${p.free ? 'Also inside: ' : `${i + 1}. `}${esc(p.name)} <span class="row-meta">${esc(p.count)}${p.ages ? ' · ' + esc(p.ages) : ''}</span></h4>
          <p>${esc(p.what)}</p></div>
          <div class="row-begin"><b>Start with</b><p>${esc(p.begin)}</p><span class="row-f">${mi('print', 11)} ${esc(ctx.edition === 'etsy' ? p.title || p.name : p.folder)}</span></div>
        </div>`;
      }).join('')}</div>
      <div class="g2 bot2">
        <div class="box li-white"><h4>${mi('check', 15, D.grass)} Your first week</h4><ol class="wk">${B.firstWeek.map(t => `<li>${esc(t)}</li>`).join('')}</ol></div>
        <div class="box li-white"><h4>${mi('safe', 15, D.tomato)} Good to know</h4><p>Every set has its own START HERE page, grown-up guide and safety page. Every play follows our published safety rules, and a grown-up is always there. <b>Most children love 2–3 plays from each set</b>: that’s the collection working.</p></div>
      </div>
    </div>`;
  }

  function more(ctx) {
    return `<div class="pad">
      <p class="kicker d-plum">What’s next</p>
      <h2 class="ptitle">More from Play Before Pixels</h2>
      <p class="lede2">${ctx.edition === 'etsy' ? 'Find them in our shop.' : 'Find them all at playbeforepixels.com.'}</p>
      <div class="nexts">${B.next.map(([a, c, h, t]) => `<div class="nx li-white" style="--c:${C[c]}"><div class="nx-ic">${icon(a, ctx, 56)}</div><div><h4>${esc(h)}</h4><p>${esc(t)}</p></div></div>`).join('')}</div>
      <div class="bonus store-only li-white">
        <div class="qrwrap">${qr(bonusUrl(B.slug), 118)}</div>
        <div><p class="kicker">For grown-ups</p><h4>Free printable: Five 5-Minute Plays</h4>
        <p>Scan for the free printable and the monthly “3 plays for your child’s age” email. We ask only for your email and, if you like, your child’s birth month and year. Never names.</p>
        <p class="small">playbeforepixels.com/bonus/${B.slug} · Lost your files? playbeforepixels.com/help</p></div>
      </div>
      <div class="bonus etsy-only li-white">${icon('heart', ctx, 70)}<div><h4>Thank you for playing with us</h4>
        <p>Your files stay on your Purchases page, so you can download them again any time. If something won’t open or print, send us a message through the shop.</p></div></div>
      <div class="colophon">
        <p><b>${esc(B.product)}.</b> ${ctx.version}. Everyday play ideas for families, not medical or developmental advice. Every play follows our published safety rules; a grown-up is always there.</p>
        <p>Personal license: one household, including grandparents and sitters who care for your child. A gift passes the license to the family who receives it. Please don’t resell or share the files.</p>
        <p>${K.OWNER} Text, illustrations and page design were made with AI tools for Play Before Pixels.</p>
      </div>
    </div>`;
  }

  function startHere(ctx) {
    const files = ctx.edition === 'etsy'
      ? [['1-START-HERE.pdf', 'This page.'], ['2-Color-US-Letter.zip', 'Every set in color, US Letter (8.5 × 11 in).'], ['3-Color-A4.zip', 'Every set in color, A4.'],
        ['4-Low-Ink-US-Letter.zip', 'Every set in low-ink (white pages, line art), US Letter.'], ['5-Low-Ink-A4.zip', 'Every set in low-ink, A4.']]
      : [['START-HERE.pdf', 'This page.'], [`${B.ownZip}.zip`, 'The gift pages: this bundle’s guide, fold card and reveal cards.']]
        .concat(B.parts.concat([B.free]).map(p => [`${p.zip}.zip`, `${p.name}: color and low-ink, Letter and A4, and its START HERE.`]));
    return `<div class="pad">
      ${logo(ctx, 'lockup', null, 'lockup sh-logo')}
      <div class="sh-top"><div><p class="kicker d-tomato">Start here · ${esc(B.product)}</p>
        <h2 class="ptitle">Welcome! Here’s how to begin.</h2>
        <p class="lede2">${esc(B.startLede)}</p></div>
        ${icon('gift', ctx, 80)}</div>
      <h3 class="sub">Your downloads</h3>
      <ul class="files ${B.parts.length > 4 ? 'tightf' : ''}">${files.map(([f, t]) => `<li class="li-white"><b>${f}</b><span>${t}</span></li>`).join('')}</ul>
      <div class="g2" style="margin-top:12px">
        <div class="shb li-white"><h4>${mi('check', 16, D.grass)} Opening a ZIP</h4><p>${ctx.edition === 'etsy' ? 'Download each file in a web browser, not the shopping app.' : 'Open the download link in a web browser.'} On a computer, double-click the ZIP to open its folder. On a phone, tap it in your files app to unzip.</p></div>
        <div class="shb li-white"><h4>${mi('print', 16)} Printing</h4><p>${ctx.edition === 'etsy' ? 'Pick one ZIP: Letter or A4, color or low-ink.' : 'Each set comes in color and low-ink, Letter and A4: pick one of each.'} Print at <b>Actual size</b> or <b>100%</b>. Each set’s START HERE says which pages to print first.</p></div>
        <div class="shb li-white"><h4>${mi('gift', 16, D.tomato)} Giving it as a gift?</h4><p>Print the fold card or a reveal card from the gift pages, or forward the download. The license passes to the family who receives it.</p></div>
        <div class="shb li-white"><h4>${mi('safe', 16, D.tomato)} Safety first</h4><p>Every set has its own safety page, and every play has its own safety line. Every play works from a chair, a bed or a wheelchair. A grown-up is always there.</p></div>
      </div>
      <p class="small tight">Personal license for one household. Print shops may print copies for this customer’s family. ${K.OWNER}</p>
    </div>`;
  }

  function pages(ctx) {
    return [
      { html: cover(ctx), label: 'Cover' },
      { html: inside(ctx), label: 'What’s inside' },
      { html: G.foldCard(ctx, Object.assign({ prefix: 'fold' }, B.fold)), label: 'Fold card' },
      { html: G.revealCards(ctx, { prefix: 'reveal', kicker: 'Surprise!', title: B.revealTitle, items: B.parts.map(p => [p.art, `${p.name}: ${p.count}`]).concat([[B.free.art, B.free.short]]), art1: 'gift', art2: 'star' }), label: 'Reveal cards' },
      { html: more(ctx), label: 'More from Play Before Pixels' },
    ];
  }

  function extraCss(ctx) {
    const H = ctx.H;
    const n = B.parts.length;
    return P.commonCss(ctx) + G.css(ctx) + `
.cv{position:absolute;inset:0;background:${C.wash}}
.cv-top{position:absolute;left:0;right:0;top:0;height:${Math.round(H * 0.5)}px;padding:40px 52px;overflow:hidden}
.cv-logo{height:30px;margin-bottom:22px}
.cv h1{font-size:${B.titleSize || 66}px;line-height:.98;letter-spacing:-.035em;margin-top:12px;max-width:520px}
.cv h1 em{font-style:normal;color:${D.tomato}}
body.lowink .cv h1 em{color:${C.ink}}
.cv .lede{font-size:16px;line-height:1.45;font-weight:600;max-width:400px;margin-top:14px}
.cv-art{position:absolute;right:20px;bottom:0}
.cv-parts{position:absolute;left:52px;right:52px;top:${Math.round(H * 0.5) + 26}px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
.cvp{display:flex;gap:14px;align-items:center;background:#FFFFFF;border-radius:18px;padding:${n > 4 ? 12 : 28}px 16px;border-left:8px solid var(--c)}
.cvp-ic{flex:none;width:${n > 4 ? 72 : 84}px;height:${n > 4 ? 72 : 84}px;border-radius:50%;background:var(--t);display:flex;align-items:center;justify-content:center}
.cvp h4{font-size:${n > 4 ? 16 : 18}px;margin-bottom:3px}
.cvp p{font-size:12.5px;font-weight:700;line-height:1.35}
.cvp .cvp-age{color:#3C4760;font-weight:800;font-size:11px;letter-spacing:.06em;text-transform:uppercase;margin-top:2px}
.cv-free{position:absolute;left:52px;right:52px;bottom:${n > 4 ? 88 : 104}px;display:flex;gap:10px;align-items:center;background:${C.tSun};border-radius:14px;padding:12px 16px;font-size:13.5px}
body.lowink .cv-top,body.lowink .cv{background:#FFFFFF!important}
body.lowink .cv-top{border-bottom:3px solid ${C.ink}}
body.lowink .cvp{box-shadow:inset 0 0 0 1.5px ${C.line}}
body.lowink .cvp-ic{background:#FFFFFF}
body.lowink .cv-free{background:#FFFFFF;box-shadow:inset 0 0 0 1.5px ${C.line}}
.rows{display:flex;flex-direction:column;gap:${n > 4 ? 7 : 10}px}
.row{display:grid;grid-template-columns:62px 1fr 190px;gap:12px;align-items:center;background:${C.wash};border-radius:16px;padding:${n > 4 ? 8 : 11}px 14px;border-left:7px solid var(--c)}
.row-ic{width:60px;height:60px;border-radius:50%;background:var(--t);display:flex;align-items:center;justify-content:center}
.row h4{font-size:15.5px;margin-bottom:3px}
.row-meta{font-family:"Nunito Sans",sans-serif;font-size:11.5px;font-weight:800;color:#3C4760;letter-spacing:0}
.row-main p{font-size:12.4px;line-height:1.4}
.row-begin{border-left:1.5px solid ${C.line};padding-left:12px}
.row-begin b{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:${D.sky}}
.row-begin p{font-size:11.6px;line-height:1.35;margin-top:1px}
.row-f{display:flex;gap:4px;align-items:center;font-size:9.8px;font-weight:800;color:#3C4760;margin-top:3px}
body.lowink .row{background:#FFFFFF;box-shadow:inset 0 0 0 1.5px ${C.line}}
body.lowink .row-ic{background:#FFFFFF}
body.lowink .row-begin b{color:${C.ink}}
.bot2{margin-top:auto;padding-top:12px}
.box h4{display:flex;align-items:center;gap:6px}
.wk{margin:4px 0 0;padding-left:18px}
.wk li{font-size:12.6px;line-height:1.42;margin-bottom:2px}
.files.tightf li{padding:6px 12px;font-size:12.5px}
`;
  }

  const TOC = [['Cover', 1], ['What’s inside', 2], ['Fold card', 3], ['Reveal cards', 4], ['More from Play Before Pixels', 5]];
  return P.run({
    slug: B.slug, product: B.product, buildDir, pages, extraCss, startHere, toc: TOC,
    meta: { subject: B.subject, keywords: B.keywords },
    storeName: (ink, size) => `${B.slug}${ink === 'lowink' ? '-low-ink' : ''}${size === 'a4' ? '-A4' : ''}.pdf`,
    etsyName: (ink, size) => `etsy-upload/gift-pages/${{ 'color-letter': 'Gift-Pages-Color-US-Letter', 'color-a4': 'Gift-Pages-Color-A4', 'lowink-letter': 'Gift-Pages-Low-Ink-US-Letter', 'lowink-a4': 'Gift-Pages-Low-Ink-A4' }[`${ink}-${size}`]}.pdf`,
    startName: { store: 'START-HERE.pdf', etsy: 'etsy-upload/1-START-HERE.pdf' },
  });
}

module.exports = { make };
