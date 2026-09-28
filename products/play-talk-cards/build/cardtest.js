const K=require('./cards.js');const fs=require('fs');
K.setLogoBase('../../../../brand/logo/');
const [deck,from,to,ink]=process.argv.slice(2);
const D=deck==='A'?K.DECK_A:K.DECK_B, f=deck==='A'?K.cardA:K.cardB;
let cards=D.slice(+from,+to).map(c=>f(c,0));
if(+from===0) cards.push(deck==='A'?K.backA(0):K.backB(0));
fs.writeFileSync('gen/cardtest.html',`<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../../../brand/fonts/fonts.css"><style>body{margin:0;background:#999}${K.CARD_CSS}</style></head><body class="${ink?'ink':''}">${K.defs()}<div style="display:flex;flex-wrap:wrap;gap:8px;padding:8px;width:1264px">${cards.join('')}</div></body></html>`);
