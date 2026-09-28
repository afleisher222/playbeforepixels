#!/usr/bin/env node
// Social profile kit: avatars, icons and banners for every platform, built only from the adopted logo files in
// brand/logo/ (The Maker's Seal) and the products' own cover art.   bash marketing/social-kit/build/make.sh
// Sizes are the platforms' published recommendations as best known on 2026-09-28 (UNVERIFIED: web search was not
// available; check each platform's upload screen on setup day). Every banner keeps its words and logo inside a
// centred safe area, so a crop on phones or a different ratio loses only background.
// Etsy pieces carry no web address (COMPLIANCE-GATE 16); every other banner shows playbeforepixels.com.
'use strict';
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..');
const R = '../../../';

const PIECES = [
  // file, w, h, kind, safe [w,h] (centred), url?, note
  { f: 'avatar-1080.png', w: 1080, h: 1080, kind: 'avatar', note: 'Profile picture for Instagram, Facebook Page, TikTok, YouTube, Pinterest, X and LinkedIn (all crop to a circle or rounded square; upload this one file everywhere)' },
  { f: 'avatar-seal-1080.png', w: 1080, h: 1080, kind: 'seal', note: 'Alternative profile picture: the full seal with the name around the edge. Use only where the picture shows at 80 px or larger (logo rule); otherwise use avatar-1080.png' },
  { f: 'facebook-cover-1640x624.png', w: 1640, h: 624, kind: 'banner', safe: [1200, 460], url: true, note: 'Facebook Page cover photo (phones crop the sides; words stay in the centre)' },
  { f: 'x-header-1500x500.png', w: 1500, h: 500, kind: 'banner', safe: [1100, 330], url: true, pad: 'bl', note: 'X header (the profile picture covers the lower left, which is kept empty)' },
  { f: 'youtube-banner-2560x1440.png', w: 2560, h: 1440, kind: 'banner', safe: [1546, 423], url: true, note: 'YouTube channel banner (only the centre 1546 x 423 shows on every device)' },
  { f: 'linkedin-cover-1128x191.png', w: 1128, h: 191, kind: 'strip', safe: [1000, 150], url: false, pad: 'l', note: 'LinkedIn company page cover (the logo tile covers the lower left)' },
  { f: 'linkedin-logo-400.png', w: 400, h: 400, kind: 'avatar', note: 'LinkedIn company logo' },
  { f: 'pinterest-cover-1920x1080.png', w: 1920, h: 1080, kind: 'banner', safe: [1500, 700], url: true, note: 'Pinterest profile cover (16:9)' },
  { f: 'etsy-banner-3360x840.png', w: 3360, h: 840, kind: 'banner', safe: [2400, 560], url: false, note: 'Etsy big banner (no web address: marketplace rule)' },
  { f: 'etsy-mini-banner-1200x160.png', w: 1200, h: 160, kind: 'strip', safe: [1100, 130], url: false, note: 'Etsy mini banner (use either this or the big banner)' },
  { f: 'etsy-shop-icon-500.png', w: 500, h: 500, kind: 'seal', note: 'Etsy shop icon (square; shows at about 70–100 px, so the full seal is allowed at the larger size; if it looks busy, use avatar-1080.png)' },
  { f: 'etsy-receipt-banner-760x100.png', w: 760, h: 100, kind: 'strip', safe: [720, 90], url: false, note: 'Etsy order receipt banner (optional)' },
];

const COVERS = ['toddler-busy-book/cover.png', 'visual-routine-cards/preview/ages-0-5/p01.png', 'guide-100-plays/cover.png', 'bored-play-cards/preview/ages-1-5/p01.png', 'play-talk-cards/preview/p01.png'];
for (const c of COVERS) if (!fs.existsSync(path.join(OUT, 'src', R, 'products', c))) { console.error('missing ' + c); process.exit(1); }

function piece(p) {
  const s = `width:${p.w}px;height:${p.h}px`;
  if (p.kind === 'avatar') {
    // the kit's own avatar tile: ink field, the upright top (brand/logo/src/tile-avatar.svg)
    return `<section class="piece" id="${p.f}" style="${s}"><img class="full" src="${R}brand/logo/src/tile-avatar.svg" alt=""></section>`;
  }
  if (p.kind === 'seal') {
    return `<section class="piece seal" id="${p.f}" style="${s}"><img src="${R}brand/logo/mark.svg" alt="Play Before Pixels" style="width:${Math.round(p.w * 0.82)}px"></section>`;
  }
  const [sw, sh] = p.safe;
  const k = sh / 460; // scale the type to the safe area height
  if (p.kind === 'strip') {
    const lh = Math.round(Math.min(sh * 0.62, (sw * (p.pad === 'l' ? 0.42 : 0.55)) / 8.2)); // lockup is about 8.2 : 1
    return `<section class="piece strip" id="${p.f}" style="${s}"><div class="safe" style="width:${sw}px;height:${sh}px;${p.pad === 'l' ? `padding-left:${Math.round(sw * 0.2)}px` : ''}">
      <img class="lockup" src="${R}brand/logo/lockup-horizontal.svg" alt="Play Before Pixels" style="height:${lh}px">
      ${p.h >= 150 ? `<p class="tag" style="font-size:${Math.round(sh * 0.22)}px">Screen-free play ideas for ages 0–5${p.url ? ' · playbeforepixels.com' : ''}</p>` : ''}
    </div><div class="dots">${['tomato', 'sun', 'sky', 'grass', 'plum'].map(c => `<i class="${c}"></i>`).join('')}</div></section>`;
  }
  const covers = COVERS.map((c, i) => `<img class="cv c${i}" src="${R}products/${c}" alt="" style="height:${Math.round(sh * 0.92)}px">`).join('');
  return `<section class="piece banner" id="${p.f}" style="${s}">
    <div class="band"></div>
    <div class="safe" style="width:${sw}px;height:${sh}px">
      <div class="words" style="${p.pad === 'bl' ? `padding-left:${Math.round(sw * 0.02)}px` : ''}">
        <img class="lockup" src="${R}brand/logo/lockup-horizontal.svg" alt="Play Before Pixels" style="height:${Math.round(Math.min(76 * k, (sw * 0.5) / 8.2))}px">
        <p class="h" style="font-size:${Math.round(62 * k)}px">Screen-free play for real families</p>
        <p class="t" style="font-size:${Math.round(30 * k)}px">Printable play ideas, routine cards and play books for ages 0–5</p>
        ${p.url ? `<p class="u" style="font-size:${Math.round(28 * k)}px">playbeforepixels.com</p>` : ''}
      </div>
      <div class="covers" style="width:${Math.round(sw * 0.44)}px">${covers}</div>
    </div>
  </section>`;
}

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Play Before Pixels: social kit</title>
<link rel="stylesheet" href="${R}brand/fonts/fonts.css">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#fff;font-family:"Nunito Sans",sans-serif;color:#1D2940}
.piece{position:relative;overflow:hidden;background:#F3F6FB;display:flex;align-items:center;justify-content:center}
.full{width:100%;height:100%;display:block}
.seal{background:#FFFFFF}
.band{position:absolute;left:0;right:0;bottom:0;height:3%;background:linear-gradient(90deg,#EE5A36 0 20%,#F5B820 20% 40%,#3D86D8 40% 60%,#2FA36B 60% 80%,#8A5CC7 80% 100%)}
.banner .safe{display:flex;align-items:center;justify-content:space-between;position:relative}
.words{display:flex;flex-direction:column;align-items:flex-start;max-width:58%}
.words .h{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;line-height:1.04;letter-spacing:-.01em;margin-top:.55em;text-wrap:balance}
.words .t{font-weight:600;line-height:1.3;margin-top:.5em;color:#3A4660;text-wrap:balance}
.words .u{font-weight:800;margin-top:.8em;color:#C4401F;letter-spacing:.02em}
.covers{position:relative;height:100%}
.cv{position:absolute;top:4%;border-radius:8px;background:#fff;box-shadow:0 12px 30px rgba(29,41,64,.18)}
.c0{left:0;transform:rotate(-7deg);z-index:1}.c1{left:19%;transform:rotate(-3deg);z-index:2}.c2{left:38%;z-index:5;top:2%}
.c3{left:57%;transform:rotate(3deg);z-index:3}.c4{left:76%;transform:rotate(7deg);z-index:2}
.strip .safe{display:flex;align-items:center;justify-content:space-between;gap:24px}
.strip .tag{font-weight:700;color:#3A4660;text-align:right;max-width:40%;text-wrap:balance;line-height:1.2}
.strip .dots{position:absolute;left:0;right:0;bottom:0;height:6%;display:flex}
.strip .dots i{flex:1}.tomato{background:#EE5A36}.sun{background:#F5B820}.sky{background:#3D86D8}.grass{background:#2FA36B}.plum{background:#8A5CC7}
</style></head><body>
${PIECES.map(piece).join('\n')}
</body></html>`;
fs.mkdirSync(path.join(OUT, 'src'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'src', 'kit.html'), html);
fs.writeFileSync(path.join(OUT, 'src', 'pieces.json'), JSON.stringify(PIECES, null, 1) + '\n');
console.log(`social kit: ${PIECES.length} pieces`);
