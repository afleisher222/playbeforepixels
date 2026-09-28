const A = require('./art.js'); const fs=require('fs');
const {C,R,U,kid,teacher,tower,SYMBOLS,G,windowRain,shelf,paperFish}=A;
let s='';
const names=Object.keys(A.KIDS);
names.forEach((nm,i)=>{ s+=kid(nm,'stand',100+i*170,120,0.9,['smile','talk','laugh','shy','listen'][i]); s+=kid(nm,'sithand',100+i*170,420,0.9,['oh','wow','uhoh','think','smile'][i]); });
s+=teacher('stand',980,120,0.9,'talk'); s+=teacher('sit',1180,120,0.9,'smile'); s+=teacher('reach',1380,200,0.9,'laugh');
s+=tower(1000,780,['q','j','i','l'],1); s+=U('bowl',1200,780); s+=U('star',1400,700); s+=U('bin',1150,560,0.8); s+=U('clock',1500,500);s+=U('plant',1560,780);
s+=G('translate(60 620)',windowRain(260,160)); s+=G('translate(420 640)',shelf(260,120)); s+=G('translate(800 700)',paperFish(C.plum,-6));
fs.writeFileSync('sheet.html',`<!doctype html><html><head><link rel="stylesheet" href="../../../brand/fonts/fonts.css"></head><body style="margin:0;background:${C.wash}">${SYMBOLS()}<svg width="1640" height="820" viewBox="0 -40 1640 860">${s}</svg></body></html>`);
