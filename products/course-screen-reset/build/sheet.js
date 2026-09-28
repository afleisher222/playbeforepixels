// Review helper: node build/sheet.js <dir> <out.png> <cols> <idx,idx,...|from-to>
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const [dir, out, cols = 4, sel] = process.argv.slice(2);
let files = fs.readdirSync(dir).filter(f => /^p\d+\.png$/.test(f)).sort();
if (sel) { if (sel.includes('-')) { const [a, b] = sel.split('-').map(Number); files = files.slice(a - 1, b); } else files = sel.split(',').map(n => files[+n - 1]).filter(Boolean); }
const html = `<html><body style="margin:0;background:#777;display:grid;grid-template-columns:repeat(${cols},1fr);gap:10px;padding:10px;width:${cols * 420}px">${files.map(f => `<div><img src="${path.resolve(dir, f)}" style="width:100%;display:block"><div style="font:14px sans-serif;color:#fff">${f}</div></div>`).join('')}</body></html>`;
const tmp = path.join(__dirname, 'dbg', '_sheet.html'); fs.writeFileSync(tmp, html);
execSync(`node ${path.resolve(__dirname, '../../../brand/render.js')} png ${tmp} ${out} ${cols * 420 + 20} 0 1`);
console.log('sheet', files.length);
