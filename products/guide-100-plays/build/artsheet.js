const {ART,UI}=require('./icons.js');const fs=require('fs');
const ids=ART.map(s=>s.match(/id="a-([^"]+)"/)[1]);
let cells=ids.map((id,i)=>{const x=(i%10)*120+60,y=Math.floor(i/10)*140+60;return `<circle cx="${x}" cy="${y}" r="54" fill="#F3F6FB"/><use href="#a-${id}" transform="translate(${x} ${y}) scale(.9)"/><text x="${x}" y="${y+70}" font-size="12" font-family="Nunito Sans" text-anchor="middle">${id}</text>`}).join('');
fs.writeFileSync('artsheet.html',`<html><head><meta charset="utf-8"><link rel="stylesheet" href="../../../brand/fonts/fonts.css"></head><body style="margin:0;font-family:'Nunito Sans',sans-serif"><svg width="1200" height="${Math.ceil(ids.length/10)*140+20}"><defs>${ART.join('')}${UI.join('')}</defs>${cells}</svg></body></html>`);
