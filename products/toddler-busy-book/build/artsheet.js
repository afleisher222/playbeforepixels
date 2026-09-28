// Dev helper: renders every symbol on one sheet for a visual check. node build/artsheet.js
const { ARTDEFS, UIDEFS } = require('./lib.js'); const fs = require('fs');
const ids = [...ARTDEFS.matchAll(/<symbol id="((?:a|b|w)-[^"]+)"/g)].map(m => m[1]);
const cells = ids.map((id, i) => { const x = (i % 12) * 110 + 55, y = Math.floor(i / 12) * 130 + 60; return `<circle cx="${x}" cy="${y}" r="52" fill="#F3F6FB"/><use href="#${id}" transform="translate(${x} ${y}) scale(.85)"/><text x="${x}" y="${y + 66}" font-size="11" text-anchor="middle" font-family="sans-serif">${id}</text>`; }).join('');
fs.mkdirSync(__dirname + '/dbg', { recursive: true });
fs.writeFileSync(__dirname + '/dbg/artsheet.html', `<html><body style="margin:0">${ARTDEFS}${UIDEFS}<svg width="1320" height="${Math.ceil(ids.length / 12) * 130 + 20}">${cells}</svg></body></html>`);
console.log(ids.length);
