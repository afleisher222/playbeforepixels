const fs=require('fs');const {card,CSS,DEFS}=require('./card.js');const {CARDS}=require('./cards.js');
const cw=process.argv[2]||'rainbow';
const chunks=[];for(let i=0;i<CARDS.length;i+=30)chunks.push(CARDS.slice(i,i+30));
const html=`<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../../brand/fonts/fonts.css"><style>${CSS}.sheet{display:flex;flex-wrap:wrap;gap:10px;width:1180px;padding:10px;background:#E9EDF3}</style></head><body>${DEFS}${chunks.map(ch=>`<div class="sheet">${ch.map(c=>card(c,cw)).join('')}</div>`).join('')}</body></html>`;
fs.writeFileSync(__dirname+'/sheet-test.html',html);
