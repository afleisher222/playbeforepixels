// node build/mockup.js -> build/mockup.html (1600 x 1200 flat-lay product mockup of the printed kit)
const fs = require('fs'); const path = require('path');
const A = require('../story-bonus/build/art.js'); const { C } = A;
const W = require('./words.js');
const { BLOCK, glyph } = require('./kitlib.js');
const CSS = require('./kitcss.js')({ w: '8.5in', h: '11in' });
const pcard = (t, label, txt, hint) => `<div class="pcard" style="border-color:${BLOCK[t].col}"><div class="pband" style="background:${BLOCK[t].col};color:${BLOCK[t].ink}">${glyph(t, 40)}<span>${label}</span></div><div class="ptxt">${txt}</div><div class="phint" style="color:${BLOCK[t].dark}">${hint}</div></div>`;
const bcard = t => `<div class="lstrip" style="background:${BLOCK[t].col};color:${BLOCK[t].ink};border-radius:12px"><div class="lglyph">${glyph(t, 58)}</div><div class="ltxt" style="width:auto"><div class="llab">${BLOCK[t].label}</div><div class="lkid">${BLOCK[t].kid}</div></div></div>`;
const star = `<svg viewBox="-270 -270 540 520"><path d="${A.starPath(230, 118)}" fill="${C.sun}" stroke="${C.sun}" stroke-width="30" stroke-linejoin="round"/>${A.Ci(-40, -14, 14, C.ink)}${A.Ci(40, -14, 14, C.ink)}${A.L('M-30 26 Q0 50 30 26', C.ink, 11)}</svg>`;
const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../../brand/fonts/fonts.css">
<style>${CSS}
html,body{margin:0;width:1600px;height:1200px;overflow:hidden;background:${C.tSun}}
.o{position:absolute}
.sh{box-shadow:0 22px 40px rgba(29,41,64,.18),0 3px 8px rgba(29,41,64,.12)}
.sheet{width:600px;height:776px;background:#fff center/cover}
.pc{width:216px;height:288px;padding:0;background:#fff;border-radius:16px}
.bc{width:470px;height:92px;border-radius:12px}
.tag{font-family:"Caveat",cursive;font-weight:700;font-size:46px;color:${C.ink}}
</style></head><body>
<div class="o sh sheet" style="left:470px;top:150px;transform:rotate(7deg);background-image:url(../preview/p04.png)"></div>
<div class="o sh sheet" style="left:170px;top:190px;transform:rotate(-4deg);background-image:url(../preview/p01.png)"></div>
<div class="o sh" style="left:1130px;top:70px;width:360px;height:360px;transform:rotate(6deg);background:url(../story-bonus/story-cover.png) center/cover;border-radius:4px"></div>
<div class="o sh pc" style="left:965px;top:725px;transform:rotate(-10deg)">${pcard('q', 'ASK', W.list('ask', 9)[0], 'Ask a friend')}</div>
<div class="o sh pc" style="left:1175px;top:690px;transform:rotate(-1deg)">${pcard('j', 'COMMENT', W.list('comment', 9)[0], 'Say something back')}</div>
<div class="o sh pc" style="left:1362px;top:725px;transform:rotate(8deg)">${pcard('i', 'ADD ONE', W.list('addone', 9)[0], 'Add one more')}</div>
<div class="o sh bc" style="left:960px;top:470px;transform:rotate(-8deg)">${bcard('l')}</div>
<div class="o" style="left:1300px;top:420px;width:250px;height:240px;transform:rotate(12deg);filter:drop-shadow(0 14px 18px rgba(29,41,64,.2))">${star}</div>
<div class="o sh bc" style="left:60px;top:960px;transform:rotate(9deg)">${bcard('q')}</div>
<div class="o sh bc" style="left:640px;top:990px;transform:rotate(-6deg)">${bcard('j')}</div>
</body></html>`;
fs.writeFileSync(path.join(__dirname, 'mockup.html'), html);
