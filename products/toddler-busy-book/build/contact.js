// Dev helper: contact sheet of rendered page PNGs. node build/contact.js <dir> <out.png> <n1> <n2> ...
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const [dir, out, ...ns] = process.argv.slice(2);
const cols = 3, w = 544, h = 704;
const html = `<html><body style="margin:0;background:#ccc;display:grid;grid-template-columns:repeat(${cols},${w}px);gap:6px;padding:6px">${ns.map(n => `<div style="position:relative"><img src="file://${path.resolve(dir, 'p' + String(n).padStart(2, '0') + '.png')}" style="width:${w}px;height:${h}px;display:block;background:#fff"><b style="position:absolute;left:4px;top:4px;background:#000;color:#fff;font:12px sans-serif;padding:1px 4px">${n}</b></div>`).join('')}</body></html>`;
const tmp = path.resolve(dir, '_contact.html'); fs.writeFileSync(tmp, html);
execFileSync('node', [path.resolve(__dirname, '../../../brand/render.js'), 'png', tmp, out, String(cols * w + 24), '0', '1']);
