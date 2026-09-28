// node sheet.js <dir> <out-prefix> : 2x2 contact sheets
const fs=require('fs'),path=require('path');
const [dir,prefix]=process.argv.slice(2);
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.png')).sort();
for(let i=0;i<files.length;i+=4){
  const grp=files.slice(i,i+4);
  const html=`<html><body style="margin:0;background:#888;display:grid;grid-template-columns:600px 600px;gap:4px;width:1204px">${grp.map(f=>`<div style="position:relative"><img src="${path.resolve(dir,f)}" style="width:600px;height:600px;display:block"><b style="position:absolute;left:4px;top:4px;background:#000;color:#fff;font:12px sans-serif;padding:2px 4px">${f}</b></div>`).join('')}</body></html>`;
  fs.writeFileSync(`${prefix}${i/4+1}.html`,html);
}
