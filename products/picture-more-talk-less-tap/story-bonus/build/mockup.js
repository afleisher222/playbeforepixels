// node build/mockup.js -> build/mockup.html (1600 x 1200 product photo-style mockup)
const fs = require('fs'); const path = require('path');
const A = require('./art.js'); const { C, U, G, R, E } = A;
const blocks = ['q', 'j', 'i', 'l', 'q', 'i'];
let tower = ''; blocks.forEach((b, i) => { tower += U('blk-' + b, 10 + [0, 6, -4, 5, -3, 4][i], 420 - (i + 1) * 66, 1); });
const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../../../brand/fonts/fonts.css">
<style>
html,body{margin:0;width:1600px;height:1200px;overflow:hidden;background:${C.wash}}
.wall{position:absolute;left:0;top:0;width:1600px;height:760px;background:${C.tSky}}
.table{position:absolute;left:0;top:760px;width:1600px;height:440px;background:${C.tSun}}
.shadow{position:absolute;left:470px;top:1010px;width:760px;height:70px;border-radius:50%;background:rgba(29,41,64,.22);filter:blur(22px)}
.book{position:absolute;left:520px;top:250px;width:760px;height:780px;perspective:2200px}
.inner{position:absolute;inset:0;transform:rotateY(-20deg) rotateX(2deg);transform-style:preserve-3d;transform-origin:left center}
.front{position:absolute;left:28px;top:0;width:740px;height:740px;background:url(../story-cover.png) center/cover;border-radius:2px 8px 8px 2px;box-shadow:inset 6px 0 10px rgba(0,0,0,.18)}
.spine{position:absolute;left:0;top:0;width:30px;height:740px;background:#C94A2C;border-radius:4px 0 0 4px;transform:rotateY(-60deg);transform-origin:right center}
.pages{position:absolute;left:32px;top:740px;width:736px;height:18px;background:repeating-linear-gradient(90deg,#fff 0 3px,#eef1f6 3px 5px);transform:rotateX(70deg);transform-origin:top center}
.gloss{position:absolute;left:28px;top:0;width:740px;height:740px;background:linear-gradient(115deg,rgba(255,255,255,.18),rgba(255,255,255,0) 40%);border-radius:2px 8px 8px 2px}
.props{position:absolute;left:0;top:0}
.tag{position:absolute;left:1296px;top:180px;font-family:"Caveat",cursive;font-weight:700;font-size:44px;color:${C.ink};transform:rotate(-6deg)}
</style></head><body>${A.SYMBOLS()}
<div class="wall"></div><div class="table"></div><div class="shadow"></div>
<svg class="props" width="1600" height="1200" viewBox="0 0 1600 1200">
  <ellipse cx="258" cy="1016" rx="130" ry="20" fill="${C.ink}" fill-opacity=".12"/>
  ${G('translate(200 596)', tower)}
  <ellipse cx="1390" cy="1040" rx="120" ry="18" fill="${C.ink}" fill-opacity=".12"/>
  ${G('translate(1390 960) rotate(-12) scale(1.35)', U('star'))}
  ${G('translate(330 1060) rotate(18) scale(0.9)', U('blk-j'))}
</svg>
<div class="book"><div class="inner"><div class="spine"></div><div class="front"></div><div class="gloss"></div></div></div>
</body></html>`;
fs.writeFileSync(path.join(__dirname, 'mockup.html'), html);
