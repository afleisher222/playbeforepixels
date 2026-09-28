// Store images for the five September 2026 builds: Etsy/shop listing images (2000 x 2000), the
// website mockup (1600 x 1200) and the cover PNG (1600 px on the long side). Every image is plain
// HTML/CSS around the product's own rendered page previews, rendered by render.js ("png" jobs).
// Listing images carry the brand name and logo but never a web address, so the same set works on
// Etsy (COMPLIANCE-GATE 16) and on the website.
'use strict';
const path = require('path');
const fs = require('fs');
const K = require('./kit.js');
const { C, D, esc, rel } = K;

const IMG_W = 2000;

function base(outDir, extra = '') {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="${rel(outDir, 'brand/fonts/fonts.css')}">
<style>
*{box-sizing:border-box}html,body{margin:0;padding:0}
body{font-family:"Nunito Sans",sans-serif;color:${C.ink};-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;margin:0;letter-spacing:-.025em;line-height:1}
p{margin:0}
.stage{position:relative;overflow:hidden}
.kick{font-size:40px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.sheet{position:absolute;background:#FFFFFF;border-radius:6px;box-shadow:0 30px 60px rgba(29,41,64,.18),0 6px 14px rgba(29,41,64,.10)}
.sheet img{display:block;width:100%;height:auto;border-radius:6px}
.chip{display:inline-flex;align-items:center;gap:14px;background:#FFFFFF;border-radius:999px;padding:18px 36px;font-size:40px;font-weight:800;white-space:nowrap}
.logo{position:absolute;height:74px;width:auto}
.lbl{position:absolute;background:${C.ink};color:#FFFFFF;border-radius:14px;padding:10px 22px;font-size:34px;font-weight:800;white-space:nowrap}
${extra}
</style></head><body>`;
}
const sheet = (outDir, img, { x, y, w, rot = 0, z = 1 }) =>
  `<div class="sheet" style="left:${x}px;top:${y}px;width:${w}px;transform:rotate(${rot}deg);z-index:${z}"><img src="${rel(outDir, img)}" alt=""></div>`;
const logoImg = (outDir, x, y, h = 74, file = 'brand/logo/lockup-horizontal.svg') =>
  `<img class="logo" src="${rel(outDir, file)}" alt="Play Before Pixels" style="left:${x}px;top:${y}px;height:${h}px">`;

// 1. Hero: number-first title, fanned pages, two chips and the logo.
function hero(o) {
  const { outDir, bg = C.tSky, kicker, title, sub, pages, chips = [], accent = C.tomato } = o;
  const [a, b2, c] = pages;
  return `${base(outDir)}<div class="stage" style="width:${IMG_W}px;height:${IMG_W}px;background:${bg}">
    <div style="position:absolute;left:120px;top:110px;right:120px">
      <p class="kick" style="color:${D.sky}">${esc(kicker)}</p>
      <h1 style="font-size:${o.titleSize || 150}px;margin-top:26px">${title}</h1>
      <p style="font-size:52px;line-height:1.3;font-weight:600;margin-top:30px;max-width:1500px">${esc(sub)}</p>
    </div>
    ${c ? sheet(outDir, c, { x: 1150, y: 830, w: 700, rot: 7, z: 1 }) : ''}
    ${b2 ? sheet(outDir, b2, { x: 760, y: 790, w: 700, rot: 1.5, z: 2 }) : ''}
    ${sheet(outDir, a, { x: 150, y: 760, w: 760, rot: -4, z: 3 })}
    <div style="position:absolute;left:120px;right:120px;bottom:90px;display:flex;align-items:center;gap:24px;z-index:5">
      ${chips.map((t, i) => `<span class="chip" style="${i === 0 ? `background:${accent};color:#FFFFFF` : ''}">${esc(t)}</span>`).join('')}
    </div>
    ${logoImg(outDir, 1330, 1840, 78)}
  </div></body></html>`;
}

// 2. Grid of labelled pages ("What's inside").
function grid(o) {
  const { outDir, bg = C.wash, kicker, title, items, cols = 3 } = o;
  const gap = 60, left = 120, top = 460;
  const w = Math.floor((IMG_W - left * 2 - gap * (cols - 1)) / cols);
  const h = Math.round(w * 1584 / 1224);
  const rows = Math.ceil(items.length / cols);
  const scale = Math.min(1, (IMG_W - top - 150 - (rows - 1) * 110) / (rows * h));
  const W2 = Math.round(w * scale), H2 = Math.round(h * scale);
  const x0 = Math.round((IMG_W - (W2 * cols + gap * (cols - 1))) / 2);
  return `${base(outDir)}<div class="stage" style="width:${IMG_W}px;height:${IMG_W}px;background:${bg}">
    <div style="position:absolute;left:120px;top:110px;right:120px">
      <p class="kick" style="color:${D.plum}">${esc(kicker)}</p>
      <h2 style="font-size:104px;margin-top:22px">${title}</h2>
    </div>
    ${items.map((it, i) => {
      const x = x0 + (i % cols) * (W2 + gap), y = top + Math.floor(i / cols) * (H2 + 110);
      return sheet(outDir, it.img, { x, y, w: W2 }) + `<div class="lbl" style="left:${x}px;top:${y + H2 + 18}px">${esc(it.label)}</div>`;
    }).join('')}
  </div></body></html>`;
}

// 3. One page large, with points beside it.
function feature(o) {
  const { outDir, bg = C.tSun, kicker, title, img, points, img2 } = o;
  return `${base(outDir)}<div class="stage" style="width:${IMG_W}px;height:${IMG_W}px;background:${bg}">
    <div style="position:absolute;left:120px;top:110px;right:120px">
      <p class="kick" style="color:${D.tomato}">${esc(kicker)}</p>
      <h2 style="font-size:104px;margin-top:22px;max-width:1760px">${title}</h2>
    </div>
    ${img2 ? sheet(outDir, img2, { x: 180, y: 540, w: 900, rot: -3, z: 1 }) : ''}
    ${sheet(outDir, img, { x: img2 ? 300 : 120, y: img2 ? 600 : 470, w: img2 ? 900 : 1060, rot: img2 ? 2 : -1.5, z: 2 })}
    <ul style="position:absolute;left:${img2 ? 1290 : 1270}px;right:100px;top:560px;list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:34px">
      ${points.map(p => `<li style="background:#FFFFFF;border-radius:28px;padding:30px 34px;font-size:42px;line-height:1.28;font-weight:700">${p}</li>`).join('')}
    </ul>
  </div></body></html>`;
}

// 4. Formats: color vs low-ink side by side, plus the file list.
function formats(o) {
  const { outDir, kicker = 'What you download', title, color, lowink, files, note } = o;
  return `${base(outDir)}<div class="stage" style="width:${IMG_W}px;height:${IMG_W}px;background:${C.tGrass}">
    <div style="position:absolute;left:120px;top:110px;right:120px">
      <p class="kick" style="color:${D.grass}">${esc(kicker)}</p>
      <h2 style="font-size:104px;margin-top:22px">${title}</h2>
    </div>
    ${sheet(outDir, color, { x: 140, y: 470, w: 600, rot: -3 })}
    ${sheet(outDir, lowink, { x: 700, y: 500, w: 600, rot: 3 })}
    <div class="lbl" style="left:190px;top:1300px;z-index:4">Color</div>
    <div class="lbl" style="left:760px;top:1330px;z-index:4">Low-ink</div>
    <ul style="position:absolute;left:1400px;right:100px;top:480px;list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:22px">
      ${files.map(([f, t]) => `<li style="background:#FFFFFF;border-radius:22px;padding:22px 28px"><b style="display:block;font-size:34px">${esc(f)}</b><span style="font-size:30px;font-weight:600">${esc(t)}</span></li>`).join('')}
    </ul>
    <p style="position:absolute;left:140px;right:120px;bottom:110px;font-size:44px;line-height:1.3;font-weight:700">${note}</p>
  </div></body></html>`;
}

// Website mockup, 1600 x 1200: pages on a wash surface with soft shadows.
function mockup(o) {
  const { outDir, pages, bg = C.wash, tag } = o;
  const [a, b2, c] = pages;
  return `${base(outDir, `.sheet{box-shadow:0 26px 50px rgba(29,41,64,.20),0 4px 10px rgba(29,41,64,.10)}`)}
  <div class="stage" style="width:1600px;height:1200px;background:${bg}">
    <div style="position:absolute;left:0;right:0;bottom:0;height:300px;background:${C.tSky}"></div>
    ${c ? sheet(outDir, c, { x: 1000, y: 190, w: 520, rot: 6, z: 1 }) : ''}
    ${b2 ? sheet(outDir, b2, { x: 640, y: 150, w: 540, rot: -2, z: 2 }) : ''}
    ${sheet(outDir, a, { x: 110, y: 90, w: 620, rot: -5, z: 3 })}
    ${tag ? `<div class="chip" style="position:absolute;right:70px;bottom:60px;z-index:5;font-size:34px;padding:14px 28px">${esc(tag)}</div>` : ''}
  </div></body></html>`;
}

// Write the HTML files and return render jobs.
function jobs(dir, list) {
  fs.mkdirSync(dir, { recursive: true });
  return list.map(({ name, html, out, w = IMG_W, h = IMG_W, scale = 1 }) => {
    const f = path.join(dir, name + '.html');
    fs.writeFileSync(f, html);
    return { html: f, png: { out, w, h, scale } };
  });
}

module.exports = { hero, grid, feature, formats, mockup, jobs, IMG_W };
