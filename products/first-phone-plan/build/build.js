// First Phone Agreement Kit (ages 9–12): builds every HTML variant.
//   node build.js   -> out/*.html + ../source.html
// Variants: size (letter|a4) x ink (color|low) x edition (store|etsy), plus START HERE (store|etsy).
// Store edition carries playbeforepixels.com and the bonus QR; Etsy edition carries no URL or QR (CUSTOMER-VOICE rule 2).
// Art: shared cast + icon library from products/visual-routine-cards/build (base.js, art.js, same cast as the
// board book), plus art-phone.js (the generic sleepy phone with the nightcap from The Day the Tablet Slept).
const fs = require('fs'); const path = require('path');
const QR = require('qrcode');
const B = require('./base.js');
const L = require('./art.js');
const X = require('./art-phone.js');
const T = require('./content.js');
const { A, NEW_SYMBOLS, R, Gp, U, star, heart } = L;
const { C } = B;

const ROOT = path.resolve(__dirname, '..');
const BRAND = path.resolve(__dirname, '../../../brand');
const OUT = path.join(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });

const SIZES = { letter: { w: '8.5in', h: '11in', name: 'US Letter' }, a4: { w: '210mm', h: '297mm', name: 'A4' } };
const COLORWAYS = [{ id: 'tomato', name: 'Tomato' }, { id: 'sky', name: 'Sky' }, { id: 'plum', name: 'Plum' }];

const svgFile = f => fs.readFileSync(path.join(BRAND, 'logo', f), 'utf8').replace(/<\?xml[^>]*>/, '').replace(/<title>.*?<\/title>/, '').replace(/ width="\d+" height="\d+"/, '');
const LOGO = { lock: svgFile('lockup-horizontal.svg'), lockK: svgFile('lockup-horizontal-black.svg'), word: svgFile('wordmark.svg'), wordK: svgFile('wordmark-black.svg'), mark: svgFile('mark.svg') };
const DEFS = `<svg class="defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${B.SYMBOLS.join('')}${NEW_SYMBOLS.join('')}${X.NEW.join('')}</defs></svg>`;
const art = (id, cls = '', disc = true) => `<svg class="art ${cls}" viewBox="0 0 120 100" aria-hidden="true">${disc ? '<circle class="disc" cx="60" cy="52" r="44"/>' : ''}${A[id]()}</svg>`;
const drawSpot = (cls = '') => `<svg class="art draw ${cls}" viewBox="0 0 120 100" aria-hidden="true"><circle cx="60" cy="50" r="40" fill="none" stroke="#B8C2D3" stroke-width="1.6" stroke-dasharray="5 5"/><text x="60" y="54" text-anchor="middle" font-family="Nunito Sans, sans-serif" font-size="11" font-weight="700" fill="#8C97AB">draw it</text></svg>`;
const AGES = { k: ['a912', 'Ages 9–12'], grown: ['agrown', 'For grown-ups'], all: ['aall', 'Whole family'] };
const chip = a => `<span class="chip ${AGES[a][0]}"><i></i>${AGES[a][1]}</span>`;
const tag = t => `<span class="chip plain">${t}</span>`;
const prep = t => `<span class="prep"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 5V10L13 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>${t}</span>`;
let fieldN = 0;
const fld = (name, o = {}) => `data-field="${name}_${++fieldN}"${o.size ? ` data-fsize="${o.size}"` : ''}${o.multi ? ' data-multi="1"' : ''}${o.align !== undefined ? ` data-falign="${o.align}"` : ''}${o.check ? ' data-ftype="check"' : ''}`;
const line = (name, o = {}) => `<span class="fl" ${fld(name, o)}></span>`;
const cb = name => `<span class="cb" ${fld(name, { check: true })}></span>`;
const ARROW = '<svg viewBox="0 0 20 30" width=".18in" height=".27in"><path d="M4 3L16 15 4 27" stroke="var(--ink)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ball = '<span class="ball"></span>';
const li = items => `<ul class="b">${items.map(t => `<li>${ball}<span>${t}</span></li>`).join('')}</ul>`;

// ---------------------------------------------------------------- CSS
function css(sz) {
  return `
@page{size:${sz.w} ${sz.h};margin:0}
:root{--ink:#1D2940;--wash:#F3F6FB;--tomato:#EE5A36;--sun:#F5B820;--sky:#3D86D8;--grass:#2FA36B;--plum:#8A5CC7;--tT:#FDE9E3;--tS:#FEF4D8;--tK:#E3EEFA;--tG:#DFF3E9;--tP:#EFE6FA;--line:#D5DCE7;--mute:#56627A;--cut:#8C97AB}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff;color:var(--ink);font-family:"Nunito Sans","Helvetica Neue",Arial,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
symbol{overflow:visible}
.sk{fill:var(--sk)} .hr{fill:var(--hr)} .sh{fill:var(--sh)} .pa{fill:var(--pa)} .so{fill:var(--so)} .hw{fill:var(--hw)} .ck{fill:${C.tomato};opacity:.28}
h1,h2,h3,p{margin:0}
.page{--m:var(--tomato);--t:var(--tT);--m2:var(--sun);--t2:var(--tS);--tt:var(--wash);width:${sz.w};height:${sz.h};padding:.5in .5in .56in;position:relative;overflow:hidden;break-after:page;page-break-after:always;display:flex;flex-direction:column;gap:.13in;background:#fff}
.page:last-child{break-after:auto;page-break-after:auto}
.page.spread{justify-content:space-between}
.dates .fl,.tmr .cell .fl{flex:0 0 .3in}
.cw-tomato{--m:var(--tomato);--t:var(--tT);--m2:var(--sun);--t2:var(--tS)}
.cw-sky{--m:var(--sky);--t:var(--tK);--m2:var(--sun);--t2:var(--tS)}
.cw-plum{--m:var(--plum);--t:var(--tP);--m2:var(--tomato);--t2:var(--tT)}
.art .disc{fill:var(--t,var(--wash))}
.art{display:block}
/* footer */
.ft{position:absolute;left:.5in;right:.5in;bottom:.25in;min-height:.2in;display:flex;align-items:center;justify-content:space-between;gap:.15in;font-size:6.2pt;color:var(--mute);white-space:nowrap}
.ft>span:nth-child(2){white-space:normal;text-align:center;flex:1 1 auto;min-width:0;line-height:1.25}
${sz.name === 'A4' ? '.page{padding-bottom:.87in}.ft{bottom:.5in}' : ''}
.ft .fb{display:flex;align-items:center;gap:.08in;font-weight:800;color:var(--ink)}
.ft .fb svg{height:.115in;width:auto;display:block}
/* type */
.eyebrow{font-weight:800;font-size:7.6pt;letter-spacing:.12em;text-transform:uppercase;color:var(--mute)}
.h1{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:27pt;line-height:1;letter-spacing:-.015em}
.h2{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:13.5pt;line-height:1.1;letter-spacing:-.005em}
.lede{font-size:10.5pt;line-height:1.4}
.body{font-size:9.6pt;line-height:1.42}
.small{font-size:7.8pt;line-height:1.38;color:var(--mute)}
.hand{font-family:"Caveat",cursive;font-weight:700}
.kid{font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600}
/* chips */
.chips{display:flex;align-items:center;gap:.07in;flex-wrap:wrap;justify-content:flex-end}
.chip,.prep{display:inline-flex;align-items:center;gap:.05in;font-weight:800;font-size:7pt;letter-spacing:.07em;text-transform:uppercase;padding:.035in .1in;border-radius:1in;background:#fff;border:1px solid var(--line);color:var(--ink);white-space:nowrap}
.chip i{width:.1in;height:.1in;border-radius:50%;background:var(--c);display:block}
.a912{--c:var(--sky)} .aall{--c:var(--tomato)} .agrown{--c:var(--plum)}
.prep svg{width:.11in;height:.11in}
/* header */
.hd{display:flex;flex-direction:column;gap:.07in}
.hd .row{display:flex;align-items:center;justify-content:space-between;gap:.1in}
/* fields */
.fl{display:block;border-bottom:1.3px solid var(--ink);height:.3in;flex:1;min-width:.4in}
.fl.d{border-bottom:1.3px dashed var(--cut)}
.who{display:flex;align-items:flex-end;gap:.1in;font-weight:800;font-size:8pt;letter-spacing:.06em;text-transform:uppercase}
.who .fl{height:.28in}
.cb{display:inline-block;width:.2in;height:.2in;border:1.6px solid var(--ink);border-radius:.05in;flex:0 0 auto;background:#fff}
.cb.on{background:var(--m);border-color:var(--m);position:relative}
.cb.on::after{content:"";position:absolute;left:.055in;top:.015in;width:.05in;height:.1in;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
.ball{display:inline-block;width:.1in;height:.1in;border-radius:50%;background:var(--tomato);margin-right:.07in;flex:0 0 auto}
ul.b{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.055in}
ul.b li{display:flex;align-items:baseline;font-size:9.4pt;line-height:1.4}
ul.b li .ball{transform:translateY(-.005in)}
/* generic blocks */
.card{border-radius:.16in;background:var(--cbg,var(--wash));padding:.15in .18in;display:flex;flex-direction:column;gap:.07in}
.card .h2{font-size:12.5pt}
.two{display:grid;grid-template-columns:1fr 1fr;gap:.13in}
.three{display:grid;grid-template-columns:repeat(3,1fr);gap:.12in}
.band{display:flex;align-items:center;gap:.18in;background:var(--m);color:#fff;border-radius:.2in;padding:.14in .22in}
.band .art{width:1.05in;height:.88in;flex:0 0 auto;background:#fff;border-radius:.16in}
.band .art .disc{fill:#fff}
.band .t{font-size:10.2pt;line-height:1.4;font-weight:700}
.band .t b{font-family:"Bricolage Grotesque",sans-serif;font-size:12.5pt;display:block;margin-bottom:.02in}
.steps{display:grid;grid-template-columns:1fr 1fr;gap:.11in}
.step{display:grid;grid-template-columns:.32in 1fr;gap:.1in;align-items:start;background:var(--wash);border-radius:.14in;padding:.11in .13in}
.step b.n{width:.32in;height:.32in;border-radius:50%;background:var(--m);color:#fff;font-family:"Fredoka",sans-serif;font-weight:600;font-size:12.5pt;display:flex;align-items:center;justify-content:center}
.talk{display:grid;grid-template-columns:repeat(3,1fr);gap:.12in}
.talk>div{border-radius:.14in;padding:.13in;background:var(--tt);display:flex;flex-direction:column;gap:.05in}
.path{display:grid;grid-template-columns:1fr .18in 1fr .18in 1fr .18in 1fr .18in 1fr;align-items:center}
.path .ps{border-radius:.14in;padding:.06in .05in .08in;text-align:center;display:flex;flex-direction:column;align-items:center;background:var(--wash);height:100%}
.path .art{width:.95in;height:.8in}
.path .art .disc{fill:#fff}
.path .kid{font-size:9.6pt;line-height:1.1}
.path .small{font-size:6.6pt;margin-top:.02in}
.path .ar{display:flex;justify-content:center}
.placeholder{border:2px dashed var(--plum);border-radius:.14in;padding:.12in .16in;background:#fff}
.placeholder b{color:var(--plum);font-size:7.4pt;letter-spacing:.1em;text-transform:uppercase}
.toc{display:grid;grid-template-columns:1fr 1fr;gap:.1in}
.toc>div{border-radius:.14in;background:var(--wash);padding:.1in .13in;display:grid;grid-template-columns:.8in 1fr;gap:.1in;align-items:center}
.toc .art{width:.8in;height:.67in}
.toc .art .disc{fill:#fff}
.toc .nm{font-weight:800;font-size:9.6pt;line-height:1.2}
.toc .pg{font-size:7.6pt;color:var(--mute);font-weight:700;margin-top:.02in}
/* readiness */
.rd{flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:.13in;min-height:0}
.grp{border-radius:.16in;border:1.5px solid var(--line);display:flex;flex-direction:column;overflow:hidden;min-height:0}
.grp .gh{display:flex;align-items:center;gap:.08in;background:var(--t);padding:.05in .12in .05in .06in}
.grp .gh .art{width:.62in;height:.52in}
.grp .gh .art .disc{fill:#fff}
.grp .gh .kid{font-size:12.5pt;flex:1}
.grp .cols{display:flex;gap:.06in;font-size:5.8pt;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);text-align:center}
.grp .cols span{width:.44in;line-height:1.1}
.grp .rr{flex:1;display:flex;align-items:center;gap:.08in;padding:.03in .12in;border-top:1px solid var(--line);font-size:8.8pt;line-height:1.3;min-height:0}
.grp .rr .tx{flex:1}
.grp .rr .bx{display:flex;gap:.06in}
.grp .rr .bx>span{width:.44in;display:flex;justify-content:center}
.grp .rr .fl{height:.28in;border-bottom:1.2px dashed var(--cut)}
/* missions */
.ms{flex:1;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;gap:.11in;min-height:0}
.ms>div{border-radius:.14in;background:var(--tt);display:grid;grid-template-columns:.95in 1fr;gap:.08in;align-items:center;padding:.06in .12in .06in .04in;min-height:0}
.ms .art{width:.95in;height:.8in}
.ms .art .disc{fill:#fff}
.ms .nm{font-family:"Fredoka",sans-serif;font-weight:600;font-size:12pt;line-height:1.05}
.ms .tx{font-size:8.5pt;line-height:1.32;margin:.03in 0 .05in}
.ms .dn{display:flex;align-items:flex-end;gap:.06in;font-size:7pt;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--mute)}
.ms .dn .fl{height:.24in}
/* agreement */
.ag{flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(3,1fr);gap:.12in;min-height:0}
.pr{border-radius:.16in;background:var(--tt);display:flex;flex-direction:column;padding:.06in .13in .08in;min-height:0}
.pr .ph{display:flex;align-items:center;gap:.06in;margin-bottom:.02in}
.pr .ph .art{width:.6in;height:.5in;margin-left:-.06in}
.pr .ph .art .disc{fill:#fff}
.pr .ph .kid{font-size:12pt;color:var(--ink)}
.pr .pl{flex:1;display:flex;flex-direction:column;justify-content:space-around;gap:.03in}
.pr label{display:flex;gap:.08in;align-items:flex-start;font-size:8.8pt;line-height:1.3}
.pr label .cb{margin-top:.01in}
.gp{display:grid;grid-template-columns:1fr 1fr;gap:.07in .2in}
.gp label{display:flex;gap:.08in;align-items:flex-start;font-size:9pt;line-height:1.32}
.ww{display:grid;grid-template-columns:1fr .18in 1fr .18in 1fr;align-items:stretch}
.ww>.s{border-radius:.14in;background:var(--t);padding:.1in .13in}
.ww .ar{display:flex;align-items:center;justify-content:center}
.ww .kid{font-size:12.5pt;display:flex;align-items:center;gap:.07in}
.ww .kid b{width:.28in;height:.28in;border-radius:50%;background:var(--m);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11pt;font-weight:600}
.ww .body{font-size:8.8pt;margin-top:.04in}
.sig{display:grid;grid-template-columns:repeat(3,1fr);gap:.12in}
.sig>div{border:1.5px dashed var(--cut);border-radius:.14in;height:.95in;position:relative}
.sig>div>span{position:absolute;left:.1in;bottom:.06in;font-size:6.6pt;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.sig .fl{position:absolute;left:.1in;right:.1in;top:.18in;height:.5in;border-bottom:none}
.dates{display:grid;grid-template-columns:repeat(3,1fr);gap:.14in}
.dates>div{display:flex;flex-direction:column;gap:.03in}
.dates .small{font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.blank-rows{display:flex;flex-direction:column;gap:.02in}
.blank-rows>div{display:flex;align-items:flex-end;gap:.1in;height:.36in}
.blank-rows .fl{height:.3in}
/* zones */
.zn{flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,1fr);gap:.12in;min-height:0}
.zn>div{border-radius:.16in;background:var(--tt);display:grid;grid-template-columns:1.2in 1fr;align-items:center;gap:.06in;padding:.06in .14in .06in .06in;min-height:0}
.zn .art{width:1.2in;height:1in}
.zn .art .disc{fill:#fff}
.zn .nm{font-family:"Fredoka",sans-serif;font-weight:600;font-size:13.5pt;line-height:1.08}
.zn .s{font-size:8.6pt;line-height:1.3;margin:.02in 0 .06in}
.zn .ticks{display:flex;flex-direction:column;gap:.05in}
.zn .ticks label{display:flex;align-items:center;gap:.07in;font-size:7.6pt;font-weight:800;letter-spacing:.05em;text-transform:uppercase}
.zn .fl{height:.3in;margin-bottom:.03in}
/* times */
.tm{flex:1;display:flex;flex-direction:column;min-height:0;border-radius:.16in;border:1.5px solid var(--line);overflow:hidden}
.tmr{display:grid;grid-template-columns:1.9in 1fr 1fr;align-items:center;flex:1 1 0;min-height:0;border-top:1px solid var(--line)}
.tmr:first-child{border-top:none;flex:0 0 .38in;background:var(--t);font-weight:800;font-size:8pt;letter-spacing:.08em;text-transform:uppercase}
.tmr:first-child>div{text-align:center}
.tmr .rl{display:flex;align-items:center;gap:.06in;padding-left:.04in}
.tmr .rl .art{width:.78in;height:.65in;flex:0 0 auto}
.tmr .rl .kid{font-size:11.5pt;line-height:1.1}
.tmr .rl .small{font-size:7pt;line-height:1.25}
.tmr .cell{padding:0 .14in;display:flex;flex-direction:column;justify-content:center;gap:.03in}
.tmr .cell .fl{height:.3in}
.tmr .cell .small{font-size:6.8pt}
/* signs */
.sg{align-self:center;display:grid;grid-template-columns:repeat(2,var(--sw));grid-template-rows:repeat(2,var(--sh2));border-top:1.6px dashed var(--cut);border-left:1.6px dashed var(--cut)}
.sg>div{border-right:1.6px dashed var(--cut);border-bottom:1.6px dashed var(--cut);padding:.13in}
.sg .in{height:100%;border-radius:.2in;background:var(--st);display:flex;flex-direction:column;align-items:center;text-align:center;padding:.14in .16in .12in;gap:.05in}
.sg .in .art{width:100%;flex:1;min-height:0}
.sg .in .art .disc{fill:#fff}
.sg .nm{font-family:"Fredoka",sans-serif;font-weight:600;font-size:20pt;line-height:1.02}
.sg .s{font-size:9.4pt;font-weight:700;line-height:1.3}
.sg .mk{height:.14in;width:auto;margin-top:.03in}
.sg .fl{width:100%;flex:0 0 .45in}
.cutnote{display:flex;justify-content:space-between;align-items:center;gap:.1in;font-size:7.4pt;line-height:1.3;font-weight:700}
.cutnote .safe{background:var(--tS);border-radius:.08in;padding:.05in .1in;flex:1}
/* plan */
.pn{flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr 1fr auto auto;gap:.12in;min-height:0}
.pc{border-radius:.16in;background:var(--tt);padding:.11in .14in;display:flex;flex-direction:column;gap:.05in;min-height:0}
.pc .ph{display:flex;align-items:center;gap:.08in}
.pc .ph b{width:.26in;height:.26in;border-radius:50%;background:var(--m);color:#fff;font-family:"Fredoka",sans-serif;font-weight:600;font-size:10pt;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.pc .ph .kid{font-size:11.5pt}
.pc .q{display:flex;align-items:flex-end;gap:.07in;font-size:8.6pt;font-weight:700}
.pc .q .fl{height:.27in}
.pc .ex{font-family:"Caveat",cursive;font-weight:700;font-size:14pt;color:var(--sky);line-height:1;border-bottom:1.3px solid var(--ink);flex:1;padding:0 .04in .02in;min-height:.27in;display:flex;align-items:flex-end}
.pc .tl{display:grid;grid-template-columns:1fr 1fr;gap:.04in .1in}
.pc .tl label{display:flex;align-items:center;gap:.06in;font-size:8.4pt;font-weight:700}
.pc .tl .cb{width:.17in;height:.17in}
.pc .note{font-size:7.4pt;color:var(--mute);line-height:1.3}
.ex-tag{background:var(--sky);color:#fff;font-weight:800;font-size:7pt;letter-spacing:.1em;text-transform:uppercase;border-radius:1in;padding:.04in .12in}
/* challenge */
.rules{display:grid;grid-template-columns:1fr 1fr;gap:.11in}
.rules>div{display:grid;grid-template-columns:.9in 1fr;gap:.1in;align-items:center;border-radius:.14in;background:var(--tt);padding:.06in .13in .06in .04in}
.rules .art{width:.9in;height:.75in}
.rules .art .disc{fill:#fff}
.rules .kid{font-size:11.5pt;line-height:1.1}
.rules .body{font-size:8.6pt;line-height:1.35;margin-top:.02in}
.badges{display:grid;grid-template-columns:repeat(3,1fr);gap:.12in}
.badges>div{display:flex;align-items:center;gap:.1in;border-radius:.14in;border:1.5px solid var(--line);padding:.08in .12in}
.bdg{width:.62in;height:.62in;border-radius:50%;background:var(--m2);color:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column;flex:0 0 auto;font-family:"Fredoka",sans-serif;font-weight:600;line-height:.95;font-size:16pt;border:.05in solid #fff;box-shadow:0 0 0 1.5px var(--m2)}
.bdg small{font-size:6pt;letter-spacing:.06em;text-transform:uppercase}
.tr{flex:1;display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(6,1fr);gap:.08in;min-height:0}
.tr>div{border-radius:.13in;border:1.6px solid var(--line);display:flex;flex-direction:column;align-items:center;padding:.04in .06in .06in;position:relative;min-height:0;background:#fff}
.tr>div.m{border-color:var(--m2);border-width:2.4px}
.tr .dn{position:absolute;left:.06in;top:.05in;font-family:"Fredoka",sans-serif;font-weight:600;font-size:9.5pt;width:.26in;height:.26in;border-radius:50%;background:var(--m);color:#fff;display:flex;align-items:center;justify-content:center}
.tr>div.m .dn{background:var(--m2)}
.tr .cc{position:absolute;right:.06in;top:.05in;width:.26in;height:.26in;border-radius:50%;border:1.6px solid var(--ink);background:#fff}
.tr .art{flex:1;min-height:0;width:100%;margin-top:.2in}
.tr .nm{font-weight:800;font-size:7.6pt;line-height:1.12;text-align:center;min-height:.23in;display:flex;align-items:center}
.tr .fl{flex:0 0 .4in;width:100%;border-bottom:1.2px dashed var(--cut)}
.hrs{display:flex;align-items:flex-end;gap:.08in;font-weight:800;font-size:8pt;letter-spacing:.06em;text-transform:uppercase}
.hrs .fl{height:.27in;max-width:1.1in}
/* ideas list */
.il{flex:1;display:flex;flex-direction:column;min-height:0;border-radius:.14in;border:1.5px solid var(--line);overflow:hidden}
.ir{display:grid;grid-template-columns:.3in .8in 1fr 2.05in;align-items:center;gap:.1in;flex:1 1 0;min-height:0;border-top:1px solid var(--line);padding:0 .12in 0 .06in}
.ir:nth-child(even){background:var(--wash)}
.ir.h{flex:0 0 .3in;border-top:none;background:var(--t)!important;font-size:6.6pt;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--ink)}
.ir .n{font-family:"Fredoka",sans-serif;font-weight:600;font-size:10pt;text-align:center;color:var(--m)}
.ir .art{height:.56in;width:.7in}
.ir .art .disc{fill:#fff}
.ir .w{font-size:8.5pt;line-height:1.26;display:flex;flex-direction:column;gap:.03in}
.ir .w b{font-size:9.6pt}
.ir .w .hd2{font-size:8pt;color:var(--ink)}
.ir .x{font-size:7.7pt;line-height:1.25;display:flex;flex-direction:column;gap:.03in}
.ir .x .fl2{display:flex;gap:.04in;align-items:flex-start;color:var(--ink);font-weight:700}
.ir .x .fl2 svg{width:.12in;height:.12in;flex:0 0 auto;margin-top:.01in}
.icons{display:flex;flex-wrap:wrap;gap:.04in}
.icons .flag{margin-top:0;display:inline-flex;align-items:center;gap:.03in;letter-spacing:.035em;padding:.005in .05in}
.icons .flag svg{width:.1in;height:.1in}
.flag.ni{background:var(--wash);color:var(--ink)}
.flag{display:inline-block;font-size:6pt;font-weight:800;letter-spacing:.06em;text-transform:uppercase;border-radius:1in;padding:.01in .06in;margin-top:.02in}
.flag.nb{background:var(--tG);color:#1E6E48}
.flag.nd{background:var(--tS);color:#7A5A00}
/* check-in */
.ci{flex:1;display:grid;grid-template-columns:1.6in repeat(3,1fr);grid-template-rows:.55in repeat(5,1fr);gap:.07in;min-height:0}
.ci>div{border-radius:.12in;background:var(--wash);padding:.08in .1in;display:flex;flex-direction:column;min-height:0}
.ci .qh{background:var(--t);font-weight:800;font-size:9pt;line-height:1.3;justify-content:center}
.ci .mh{background:var(--m);color:#fff;font-family:"Fredoka",sans-serif;font-weight:600;font-size:11pt;flex-direction:row;align-items:flex-end;gap:.06in}
.ci .mh .fl{height:.24in;border-bottom-color:#fff}
.ci .cell{background:#fff;border:1.3px solid var(--line)}
.ci .cell .fl{flex:1;height:auto;border-bottom:none}
/* certificate */
.cert{flex:1;border-radius:.3in;border:.13in solid var(--m2);padding:.3in .35in;display:flex;flex-direction:column;align-items:center;justify-content:space-between;text-align:center;background:#fff;gap:.1in}
.cert .h1{font-size:40pt}
.cert .nmf{width:80%;height:.55in;border-bottom:2px solid var(--ink)}
.cert .scene{width:100%;flex:1;min-height:0}
/* FAQ */
.faq{display:grid;grid-template-columns:1fr 1fr;gap:.11in}
.faq>div{border-radius:.14in;background:var(--wash);padding:.12in .15in}
.faq b{display:block;font-size:10pt;margin-bottom:.03in}
.agecards{display:grid;grid-template-columns:1fr 1fr;gap:.12in}
.agecards>div{border-radius:.16in;padding:.14in .16in;display:flex;flex-direction:column;gap:.05in}
/* ---------- low-ink ---------- */
.low .art *,.low .defs *{fill:#fff!important;stroke:var(--ink)!important;stroke-width:1.25px!important;vector-effect:non-scaling-stroke}
.low .art [fill="#1D2940"],.low .defs [fill="#1D2940"]{fill:var(--ink)!important}
.low .ck{display:none}
.low .art.draw *{fill:none!important;stroke:#B8C2D3!important}
.low .art.draw text{fill:#8C97AB!important;stroke:none!important}
.low .art .disc{fill:none!important;stroke:none!important}
.low .art text{fill:var(--ink)!important;stroke:none!important}
.low .page{--m:var(--ink);--t:#fff;--m2:var(--ink);--t2:#fff;--tt:#fff;--st:#fff}
.low .band{background:#fff;color:var(--ink);border:2px solid var(--ink)}
.low .band .art{border:1.5px solid var(--ink)}
.low .card,.low .step,.low .toc>div,.low .talk>div,.low .path .ps,.low .ms>div,.low .pr,.low .zn>div,.low .pc,.low .rules>div,.low .faq>div,.low .agecards>div,.low .ww>.s,.low .ci>div,.low .cutnote .safe,.low .sg .in{background:#fff!important;border:1.5px solid var(--ink)}
.low .grp .gh,.low .tmr:first-child,.low .ir.h{background:#fff!important;border-bottom:1.5px solid var(--ink)}
.low .ir:nth-child(even){background:#fff}
.low .ci .mh{color:var(--ink)} .low .ci .mh .fl{border-bottom-color:var(--ink)}
.low .cert{border-width:.06in}
.low .bdg{background:#fff;color:var(--ink);border-color:#fff;box-shadow:0 0 0 1.5px var(--ink)}
.low .tr .dn,.low .tr>div.m .dn{background:#fff;color:var(--ink);border:1.4px solid var(--ink)}
.low .chip i{background:#fff;border:1.5px solid var(--ink)}
.low .flag{background:#fff!important;color:var(--ink)!important;border:1px solid var(--ink)}
.low .pc .ex{color:var(--ink)}
.low .ex-tag{background:#fff;color:var(--ink);border:1.2px solid var(--ink)}
.low .ball{background:var(--ink)}
`;
}

// ---------------------------------------------------------------- page shell
function footer(ctx, n) {
  const word = ctx.low ? LOGO.wordK : LOGO.word;
  return `<footer class="ft"><span class="fb">${word}${ctx.store ? '<span>playbeforepixels.com</span>' : ''}</span><span>${T.COPY} <span style="white-space:nowrap">Personal &amp; family use.</span></span><span>${T.VERSION} · ${n}</span></footer>`;
}
function hd({ eyebrow, title, lede, age, prepT, extra = '', right = '' }) {
  return `<header class="hd"><div class="row"><span class="eyebrow">${eyebrow}</span><span class="chips">${age ? chip(age) : ''}${prepT ? prep(prepT) : ''}${extra}</span></div>
  <div class="row" style="align-items:flex-end"><div style="display:flex;flex-direction:column;gap:.06in;flex:1"><h1 class="h1">${title}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}</div>${right}</div></header>`;
}

// ---------------------------------------------------------------- front matter
function cover(ctx) {
  const tiles = [['homeAddress', '16-point readiness checklist'], ['kindWords', 'A warm agreement, not a contract'], ['phonePark', 'Phone-free zones + 8 signs'], ['planner', 'Fridge-door tech plan'], ['outsideTime', '30 phone-free afternoons']];
  return `<div style="display:flex;justify-content:space-between;align-items:center">${(ctx.low ? LOGO.lockK : LOGO.lock).replace('<svg', '<svg style="height:.62in;width:auto"')}<span class="chips">${chip('k')}${tag('Fillable')}${prep('Prep 5 min')}</span></div>
  <div style="display:flex;flex-direction:column;gap:.1in;margin-top:.22in"><span class="eyebrow" style="color:var(--tomato)">A printable kit for families of big kids · ages 9–12</span>
  <h1 class="h1" style="font-size:50pt;line-height:.95">First Phone<br>Agreement Kit</h1>
  <p class="lede" style="font-size:13.5pt;max-width:6.4in">A warm, fill-in agreement you write together, plus everything around it: are-we-ready, where phones sleep, and <b>30 phone-free afternoons</b> of things to do instead.</p></div>
  <div style="flex:1;min-height:0;margin:.08in 0">${X.sceneGift()}</div>
  <div class="toc" style="grid-template-columns:repeat(5,1fr);gap:.08in">${tiles.map(([a, t]) => `<div style="grid-template-columns:1fr;text-align:center;padding:.08in"><div style="display:flex;justify-content:center">${art(a)}</div><div class="nm" style="font-size:8.6pt">${t}</div></div>`).join('')}</div>
  <p class="small" style="text-align:center">Fillable PDF · pre-filled and blank pages · ${ctx.low ? 'Low-ink edition' : '3 colorways'} · US Letter and A4 · Never names an app, a phone brand or a company</p>`;
}
function inside(ctx, P) {
  const tiles = [
    ['homeAddress', 'Are we ready? checklist', '16 things to notice, no score · plus a make-it-yours blank', P.ready],
    ['numbersCard', '10 practice missions', 'Small steps to try before the first phone', P.missions],
    ['kindWords', 'Our First Phone Agreement', '18 kid promises + 8 grown-up promises to choose from · plus a blank', P.agree],
    ['phonePark', 'Phone-free zones', '7 zones to choose, for grown-ups too', P.zones],
    ['phoneBed', 'Phone-free times', 'School days and weekends, and the phone’s bedtime', P.times],
    ['chargeSpot', '8 zone signs', 'Cut apart, post around the house', P.signs],
    ['planner', 'Our Fridge-Door Tech Plan', 'One page for the whole house · example + fillable', P.plan],
    ['outsideTime', '30 Phone-Free Afternoons', 'Challenge rules, tracker, 30 ideas, certificate', P.challenge],
    ['checkIn', 'Monthly check-in', '5 questions, 3 months', P.checkin],
    [ctx.low ? 'freeChoice' : 'swatches', ctx.low ? 'Quick answers' : '3 colorways', ctx.low ? 'Printing, editing and age questions' : 'Tomato, Sky and Plum versions of the main pages', ctx.low ? P.faq : P.colors],
  ];
  return hd({ eyebrow: 'What’s inside', title: 'Ten tools, one calm plan', lede: 'Use what fits your family. Most families use 3 or 4 of these; that’s normal. Start with the grown-up guide on the next page.', age: 'grown', prepT: 'Prep 5 min · no cutting needed' })
    + `<div class="toc" style="flex:1;grid-auto-rows:1fr">${tiles.map(([a, t, s, p]) => `<div>${art(a)}<div><div class="nm">${t}</div><div class="small" style="color:var(--ink)">${s}</div><div class="pg">Page ${p}</div></div></div>`).join('')}</div>
  <div class="card" style="--cbg:var(--tS)"><div class="body"><b>Fillable pages:</b> every blank line and tick box can be typed into in a free PDF reader that supports forms, on a computer or a phone: names, dates, times, promises, zones, plan answers and the tracker. Printed wording, colors and pictures can’t be changed. Every page also prints blank for writing by hand.</div></div>
  <p class="small">License: personal and family use in your own family’s homes. Please don’t share or resell the files. Thank you for supporting a small, independent studio.</p>`;
}
function guide1(ctx) {
  const path5 = [['homeAddress', 'Ready?', 'Checklist + missions'], ['kindWords', 'Agree', 'Write it together'], ['phoneBed', 'Zones + times', 'Where and when'], ['planner', 'Plan', 'One fridge page'], ['outsideTime', '30 afternoons', 'The fun part']];
  return hd({ eyebrow: 'Section A · Grown-up guide · 1 of 2', title: 'Start here, grown-ups', lede: 'A first phone is a big step toward independence. This kit turns it into small steps you take <b>together</b>, with plenty of play along the way.', age: 'grown', prepT: 'Setup 2 min' })
    + `<div class="path">${path5.map(([a, t, s], i) => `${i ? `<div class="ar">${ARROW}</div>` : ''}<div class="ps">${art(a)}<div class="kid">${t}</div><div class="small">${s}</div></div>`).join('')}</div>
  <div><div class="h2" style="margin-bottom:.08in">Set up in 2 minutes</div><div class="steps">${[
      ['Pick your starting page.', 'No phone yet? Start with the readiness checklist. Phone on the way? Start with the agreement.'],
      ['Print or open the fillable file.', 'Type into the blanks, or print and write by hand.'],
      ['Sit down together.', 'Snacks help. Let your child read the promises out loud and tick the ones you choose.'],
      ['Post it.', 'The fridge-door plan and a sign or two go where everyone can see them.'],
    ].map(([a, b], i) => `<div class="step"><b class="n">${i + 1}</b><div class="body"><b>${a}</b> ${b}</div></div>`).join('')}</div></div>
  <div class="card" style="--cbg:var(--tS)"><div class="h2">Why this kit, in plain words</div><p class="body">Big kids build independence by practicing it: planning an afternoon, keeping a promise, asking for help in person, owning a mistake and fixing it. A phone brings lots of new choices at once. Writing the agreement together, and filling the afternoons with things they enjoy, turns those choices into practice instead of arguments. There is no right age for a first phone; every family decides.</p></div>
  <div><div class="h2" style="margin-bottom:.08in">Three talk lines for any page</div><div class="talk">${[
      ['var(--tT)', 'Ask, then wait.', 'Ask one question and count to five in your head. Let them finish the thought.'],
      ['var(--tK)', 'Say what you see.', '“You planned that whole afternoon yourself.”'],
      ['var(--tG)', 'Build on their idea.', '“What would make that rule work better?” Then add one idea of your own.'],
    ].map(([c, a, b]) => `<div style="--tt:${c}"><div class="kid" style="font-size:12.5pt">${a}</div><div class="body">${b}</div></div>`).join('')}</div></div>
  <div class="card"><p class="body"><b>Talk in the language you know best. Every language counts.</b> A note on the fridge, a thumbs-up or a quick message counts as talking, too.</p></div>`;
}
function guide2(ctx, P) {
  return hd({ eyebrow: 'Section A · Grown-up guide · 2 of 2', title: 'How the phone fits in', lede: 'A few simple ideas hold the whole kit together.', age: 'grown', prepT: 'Read 3 min' })
    + `<div class="band"><svg class="art" viewBox="0 0 120 100" aria-hidden="true"><circle class="disc" cx="60" cy="52" r="44"/>${A.phoneGift()}</svg><div class="t"><b>Our big idea</b>${T.BIG_IDEA}</div></div>
  <div class="card" style="--cbg:var(--tK)"><div class="h2">Four things that keep it calm</div>${li([
      '<b>Never a prize, never a punishment.</b> Phone time doesn’t grow or shrink with chores, grades or behavior. That keeps the phone from becoming the thing everyone argues about.',
      '<b>Screens have a spot in the day.</b> The same time and about the same length each day. You write it on the fridge-door plan.',
      '<b>Zones and times are for everyone.</b> Grown-ups park their phones at the table too. Kids notice.',
      `<b>Check in, don’t check up.</b> A 5-minute talk once a month (page ${P.checkin}) keeps the agreement alive.`,
    ])}</div>
  <div><div class="h2" style="margin-bottom:.08in">When something goes wrong</div><div class="ww">${T.WHEN_WRONG.map(([a, b], i) => `${i ? `<div class="ar">${ARROW}</div>` : ''}<div class="s"><div class="kid"><b>${i + 1}</b>${a}</div><div class="body">${b}</div></div>`).join('')}</div></div>
  <div class="agecards">${[
      ['var(--tG)', 'Ages 9–10', 'Start with the readiness checklist, the practice missions and the 30 afternoons. Many families wait on the phone itself; the practice still counts.'],
      ['var(--tP)', 'Ages 11–12', 'Let them lead: they read the promises, suggest one of their own and help set the zones. Review the agreement on their birthday.'],
    ].map(([c, a, t]) => `<div style="background:${c}"><span class="eyebrow" style="color:var(--ink)">${a}</span><p class="body">${t}</p></div>`).join('')}</div>
  <div class="card"><div class="h2">If interest fades</div><p class="body">Skip a week. Swap the tracker for a new colorway. Let your child pick the next afternoon. Tired day? Just say “phones at the charging spot, let’s find something to do.” That counts.</p></div>
  ${T.FOUNDER_NOTE ? `<div class="card"><div class="h2">A note from us</div><p class="body">${T.FOUNDER_NOTE}</p></div>` : ''}`;
}
function tips(ctx, P) {
  return hd({ eyebrow: 'Section A · Printing, filling in and safety', title: 'Print it, fill it, post it', lede: 'About 5 minutes to print. Nothing has to be cut unless you want the signs.', age: 'grown', prepT: 'Prep 5 min' })
    + `<div class="steps">
  <div class="card" style="--cbg:var(--tK)"><div class="h2">Printing</div>${li([
      'Print at <b>100% / Actual size</b>.',
      '<b>US Letter</b> file for the US and Canada; <b>A4</b> for everywhere else.',
      'Regular paper is fine. Cardstock (65–110 lb / 176–300 gsm) makes the signs sturdier.',
      'The <b>low-ink file</b> has white backgrounds and line art your child can color.',
    ])}</div>
  <div class="card" style="--cbg:var(--tG)"><div class="h2">Filling in</div>${li([
      'Open the PDF in a free PDF reader that supports forms, on a computer or phone. Tap a line to type.',
      'On a phone, save the file first, then open it in a PDF reader rather than a quick preview.',
      'Save, then print. Or print blank and write by hand; it works both ways.',
    ])}</div>
  <div class="card" style="--cbg:var(--tP)"><div class="h2">Make it last</div>${li([
      'Laminate the tracker and signs, or slide them into clear page protectors.',
      'A dry-erase marker works on both, month after month.',
      'Keep the signed agreement in a folder or on the fridge where everyone can find it.',
    ])}</div>
  <div class="card" style="--cbg:var(--tS)"><div class="h2">Shopping list (printed once)</div>${li([
      'Regular paper: about 10 sheets (the pages you pick)',
      'Cardstock: 2 sheets for the 8 signs (optional)',
      '4 page protectors or laminating pouches (optional)',
      '1 dry-erase marker · tape for the signs',
    ])}</div></div>
  <div class="card" style="--cbg:var(--tT)"><div class="h2">Safety notes for the afternoon ideas</div>${li([
      'Every afternoon idea follows our published safety rules and carries its own safety line.',
      'A grown-up always knows where a child is going, with whom, and when they’ll be back. Helmets on for bikes and scooters.',
      'Kitchen knives and the stove only with a grown-up right there; grown-ups handle craft knives and tools. Keep small pieces like cards and puzzle pieces away from children under 3.',
    ])}</div>
  <div class="card" style="--cbg:#fff;border:1.5px solid var(--line)"><div class="h2">Only printing a few pages?</div><p class="body">Most families start with these seven: the agreement (pages ${P.agree}–${P.agree + 1}), the fridge-door plan (page ${P.planB}), the tracker (page ${P.tracker}) and the 30 ideas (pages ${P.ideas}–${P.ideas3}). Everything else is there when you want it.</p></div>
  <div class="card"><p class="body"><b>Good to know:</b> this kit is parent education and family planning. It isn’t medical or professional advice. For questions about your child’s health or development, talk with your child’s doctor.</p></div>`;
}
function faq(ctx) {
  const help = ctx.store ? 'Lost a file? Your download link stays in your order email, and answers to download and printing questions are at <b>playbeforepixels.com/help</b>.' : 'Lost a file? Your files stay on your Purchases page in the shop where you bought them. Open it in a web browser, not the app, to download again anytime.';
  return hd({ eyebrow: 'Section A · Quick answers', title: 'Quick answers', lede: 'The questions families ask most, answered before you have to ask.', age: 'grown', prepT: 'No prep' })
    + `<div class="faq" style="flex:1;grid-auto-rows:1fr">${T.FAQ.map(([q, a]) => `<div><b>${q}</b><p class="body">${a}</p></div>`).join('')}</div>
  <div class="card" style="--cbg:var(--tS)"><p class="body">${help}</p></div>
  <p class="small">License: personal and family use in your own family’s homes. Please don’t share or resell the files.</p>`;
}

// ---------------------------------------------------------------- section B: readiness
function ready(ctx, blank) {
  const groups = T.READY.map(g => `<div class="grp"><div class="gh">${art(g.art)}<span class="kid">${blank ? '' : g.t}</span>${blank ? line('group', { size: 11 }) : ''}<span class="cols"><span>Yes, already</span><span>Practicing</span></span></div>
    ${(blank ? [0, 1, 2, 3] : g.rows).map(r => `<div class="rr"><span class="tx">${blank ? line('ready_item', { size: 9 }) : r}</span><span class="bx"><span>${cb('yes')}</span><span>${cb('practice')}</span></span></div>`).join('')}</div>`).join('');
  return hd({ eyebrow: `Section B · Before the first phone${blank ? ' · make-it-yours (fillable)' : ''}`, title: blank ? 'Are we ready? Our own list' : 'Are we ready?', lede: blank ? 'Write the things that matter in your family, then tick together.' : 'Not a test. There’s no score and no right age. Tick together, then pick two things to practice next.', age: 'k', prepT: '10 min together' })
    + `<div class="who"><span>Name</span>${line('name', { size: 11 })}<span>Date</span>${line('date', { size: 11 })}</div>
  <div class="rd">${groups}</div>
  <div class="card" style="--cbg:var(--t2)"><div style="display:flex;align-items:flex-end;gap:.1in;font-weight:800;font-size:9.5pt">Two things I’ll practice next: ${line('next1', { size: 10 })}${line('next2', { size: 10 })}</div></div>`;
}
function missions(ctx) {
  return hd({ eyebrow: 'Section B · Before the first phone', title: '10 practice missions', lede: 'Small, real-world steps that build the same skills a phone needs. Tick each one when it’s done.', age: 'k', prepT: 'No prep' })
    + `<div class="ms">${T.MISSIONS.map(([a, n, t], i) => `<div>${art(a)}<div><div class="nm">${i + 1}. ${n}</div><div class="tx">${t}</div><div class="dn">${cb('mission')}<span>Done on</span>${line('done', { size: 9 })}</div></div></div>`).join('')}</div>`;
}

// ---------------------------------------------------------------- section C: agreement
function agree1(ctx) {
  return hd({ eyebrow: 'Section C · Our First Phone Agreement · 1 of 2', title: 'Our First Phone Agreement', age: 'k', prepT: 'No prep', extra: tag('Fillable') })
    + `<div class="who"><span>Between</span>${line('kid', { size: 11 })}<span>and</span>${line('grownups', { size: 11 })}<span>Date</span><span style="flex:0 0 1.2in;display:flex">${line('date', { size: 11 })}</span></div>
  <div class="band"><svg class="art" viewBox="0 0 120 100" aria-hidden="true"><circle class="disc" cx="60" cy="52" r="44"/>${A.phoneGift()}</svg><div class="t"><b>Our big idea</b>${T.BIG_IDEA}</div></div>
  <div class="eyebrow" style="color:var(--ink)">My promises · we tick the ones we choose together</div>
  <div class="ag">${T.KID_PROMISES.map(g => `<div class="pr"><div class="ph">${art(g.art)}<span class="kid">${g.t}</span></div><div class="pl">${g.rows.map(r => `<label>${cb('kid_promise')}<span>${r}</span></label>`).join('')}</div></div>`).join('')}</div>
  <div class="who" style="text-transform:none;letter-spacing:0;font-size:9.5pt">My own promise: ${line('own_promise', { size: 10 })}</div>`;
}
function agree2(ctx) {
  return hd({ eyebrow: 'Section C · Our First Phone Agreement · 2 of 2', title: 'Grown-up promises, and how we fix things', age: 'all', prepT: 'No prep', extra: tag('Fillable') })
    + `<div class="card" style="--cbg:var(--t)"><div class="h2">What my grown-ups promise</div><div class="gp">${T.GROWN_PROMISES.map(r => `<label>${cb('grown_promise')}<span>${r}</span></label>`).join('')}</div>
    <div class="who" style="text-transform:none;letter-spacing:0;font-size:9.5pt;margin-top:.04in">Our own grown-up promise: ${line('grown_own', { size: 10 })}</div></div>
  <div><div class="h2" style="margin-bottom:.07in">When something goes wrong, we</div><div class="ww">${T.WHEN_WRONG.map(([a, b], i) => `${i ? `<div class="ar">${ARROW}</div>` : ''}<div class="s"><div class="kid"><b>${i + 1}</b>${a}</div><div class="body">${b}</div></div>`).join('')}</div></div>
  <div class="card"><div class="h2">Our phone basics</div><div class="two" style="gap:.05in .25in">${[['My phone is for', 'phone_for'], ['Our yes-list', 'yes_list'], ['Phone sleeps at', 'spot'], ['Phone’s bedtime', 'bedtime'], ['Our screen spot (same every day)', 'screen'], ['Phone-free zones and times', 'zones']].map(([q, n]) => `<div class="who" style="text-transform:none;letter-spacing:0;font-size:9pt">${q}: ${line(n, { size: 9 })}</div>`).join('')}</div><p class="small">Yes-list: the apps, games and groups you’ve agreed on. Add to it together at each check-in.</p></div>
  <div class="card" style="--cbg:var(--t2)"><div class="h2">We’ll read this again on</div><div class="dates">${[['After 1 month', 'rev1'], ['After 3 months', 'rev3'], ['My next birthday', 'revb']].map(([a, n]) => `<div><span class="small">${a}</span>${line(n, { size: 10 })}</div>`).join('')}</div></div>
  <div class="card" style="--cbg:var(--tG)"><div class="h2">Next steps we’ll try together</div><p class="small" style="color:var(--ink)">New independence steps to try as you grow, like walking to a friend’s house or planning a Saturday on your own. Steps, not prizes.</p><div class="who" style="text-transform:none;letter-spacing:0">${line('next_step', { size: 10 })}</div></div>
  <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;gap:.08in"><div class="h2">Signed with a smile</div><div class="sig">${['Me', 'Grown-up', 'Grown-up'].map(s => `<div><span class="fl" ${fld('sign', { size: 14 })}></span><span>${s}</span></div>`).join('')}</div></div>`;
}
function agreeBlank(ctx) {
  const rows = (n, name) => `<div class="blank-rows">${Array.from({ length: n }, () => `<div>${cb(name + '_t')}${line(name, { size: 10 })}</div>`).join('')}</div>`;
  return hd({ eyebrow: 'Section C · Make-it-yours agreement (fillable)', title: 'Our agreement, in our words', lede: 'Prefer to write it from scratch? Use your own promises here, or add to the pre-written ones.', age: 'k', prepT: 'No prep', extra: tag('Fillable') })
    + `<div class="who"><span>Between</span>${line('kid', { size: 11 })}<span>and</span>${line('grownups', { size: 11 })}<span>Date</span><span style="flex:0 0 1.2in;display:flex">${line('date', { size: 11 })}</span></div>
  <div class="card" style="--cbg:var(--t)"><div class="h2">I promise</div>${rows(8, 'kid_line')}</div>
  <div class="card" style="--cbg:var(--t2)"><div class="h2">What my grown-ups promise</div>${rows(5, 'grown_line')}</div>
  <div class="card"><p class="body"><b>Our big idea:</b> the phone is never a prize and never a punishment. When something goes wrong, we pause, talk it through, and re-read this page together.</p></div>
  <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;gap:.08in"><div class="h2">Signed with a smile</div><div class="sig">${['Me', 'Grown-up', 'Grown-up'].map(s => `<div><span class="fl" ${fld('sign', { size: 14 })}></span><span>${s}</span></div>`).join('')}</div></div>`;
}

// ---------------------------------------------------------------- section D: zones, times, signs
function zones(ctx) {
  const cards = T.ZONES.map(([a, n, s]) => `<div>${art(a)}<div><div class="nm">${n}</div><div class="s">${s}</div><div class="ticks"><label>${cb('zone')}Our zone</label><label>${cb('zone_grown')}Grown-ups too</label></div></div></div>`).join('')
    + `<div>${drawSpot()}<div><div class="nm" style="font-size:11pt">Our own zone</div>${line('zone_own', { size: 11 })}<div class="ticks"><label>${cb('zone')}Our zone</label><label>${cb('zone_grown')}Grown-ups too</label></div></div></div>`;
  return hd({ eyebrow: 'Section D · Phone-free zones', title: 'Our phone-free zones', lede: 'Places where phones take a break, so people get the attention. Tick the ones you choose. Grown-ups too.', age: 'all', prepT: 'No prep', extra: tag('Fillable') })
    + `<div class="zn">${cards}</div>`;
}
function times(ctx) {
  const rows = T.TIMES.map(([a, n, s, hint, k]) => `<div class="tmr"><div class="rl">${art(a)}<div><div class="kid">${n}</div><div class="small">${s}</div></div></div>${['school', 'weekend'].map(c => `<div class="cell">${k === 'school' && c === 'weekend' ? '<span class="small">No school: use the afternoon row</span>' : line(k + '_' + c, { size: 10 })}${hint ? `<span class="small">${hint}</span>` : ''}</div>`).join('')}</div>`).join('');
  return hd({ eyebrow: 'Section D · Phone-free times', title: 'Our phone-free times', lede: 'A day at a glance. Write in your times for school days and weekends.', age: 'all', prepT: 'No prep', extra: tag('Fillable') })
    + `<div class="tm"><div class="tmr"><div></div><div>School days</div><div>Weekends</div></div>${rows}</div>
  <div class="two">
    <div class="card" style="--cbg:var(--t)"><div class="h2">Our screen spot</div><p class="body">The time for games, shows and scrolling. Same time, about the same length, every day. It doesn’t grow or shrink with chores or behavior.</p><div class="who" style="text-transform:none;letter-spacing:0;font-size:9.5pt">From ${line('spot_from', { size: 10 })} to ${line('spot_to', { size: 10 })}</div></div>
    <div class="card" style="--cbg:var(--t2)"><div class="h2">The charging spot</div><p class="body">Where every phone in the house sleeps at night, grown-ups’ too.</p><div class="who" style="text-transform:none;letter-spacing:0;font-size:9.5pt">Our phones sleep ${line('charge_spot', { size: 10 })}</div></div>
  </div>`;
}
function signs(ctx, part) {
  const list = T.SIGNS.slice(part * 4, part * 4 + 4);
  const tint = { sun: 'var(--tS)', tomato: 'var(--tT)', sky: 'var(--tK)', plum: 'var(--tP)', grass: 'var(--tG)' };
  const mk = (ctx.low ? LOGO.wordK : LOGO.word).replace('<svg', '<svg class="mk"');
  const cells = list.map(([a, n, s, c]) => `<div><div class="in" style="--st:${tint[c]}">${a ? art(a) : drawSpot()}${a ? `<div class="nm">${n}</div><div class="s">${s}</div>` : `<span class="fl" style="width:100%;flex:0 0 .45in" ${fld('sign_title', { size: 16, align: 1 })}></span><span class="fl d" style="width:100%;flex:0 0 .34in" ${fld('sign_sub', { size: 10, align: 1 })}></span>`}${mk}</div></div>`).join('');
  return hd({ eyebrow: `Section D · Zone signs · ${part + 1} of 2`, title: part ? 'Zone signs, part 2' : 'Zone signs to post', lede: part ? 'The last one is yours to write or draw.' : 'Cut on the dashed lines and tape them up where they’re needed.', age: 'all', prepT: 'Cut 3 min' })
    + `<div class="cutnote"><span class="safe">Cut: 4 signs per sheet, straight cuts only. Grown-up keeps the scissors and the pieces away from children under 3. Cardstock and lamination make them last.</span></div>
  <div class="sg" style="--sw:calc((${SIZES[ctx.size].w} - 1in) / 2 - .02in);--sh2:4.05in">${cells}</div>`;
}

// ---------------------------------------------------------------- section E: fridge-door plan
const PLAN_EX = {
  sleep: 'Kitchen counter basket', bed: '8:30 pm (grown-ups 10)', zones: [1, 1, 1, 1, 1, 0, 1], zoneOther: 'Library trips',
  school: 'Mornings, 3:30–5:30, dinner', weekend: 'Dinner + Saturday morning', from: '6:30 pm', to: '7:15 pm',
  ask: [1, 1, 1, 1, 1], fun: ['Bike loop to the park', 'Card games with Grandpa', 'Cardboard builds', 'Library + hot cocoa'],
  check: 'First Sunday, after pancakes', next: 'March 1', grown: 'Same basket, by 10 pm', counts: 'Shows, games, videos', days: 'Sunday afternoons',
};
function plan(ctx, example) {
  const ex = example ? PLAN_EX : null;
  const val = (v, name, o = {}) => ex ? `<span class="ex">${v}</span>` : line(name, o);
  const tick = (on, name) => ex ? `<span class="cb${on ? ' on' : ''}"></span>` : cb(name);
  const zoneNames = ['At the table', 'Bedrooms at night', 'Short car rides', 'Homework time', 'Walking + crossing', 'Friends visiting', 'Game night'];
  const asks = ['Downloading anything', 'Buying anything', 'Joining groups or sign-ups', 'Sharing photos of people', 'Meeting anyone new'];
  return hd({ eyebrow: `Section E · Our Fridge-Door Tech Plan${example ? ' · example' : ' · fillable'}`, title: 'Our Fridge-Door Tech Plan', lede: example ? 'One page for the whole house. Here’s how one family filled it in; yours is on the next page.' : 'One page for the whole house. Fill it in together and post it where everyone can see.', age: 'all', prepT: 'No prep', extra: example ? '<span class="ex-tag">Example</span>' : tag('Fillable') })
    + `<div class="pn">
  <div class="pc"><div class="ph"><b>1</b><span class="kid">Where phones sleep</span></div><div class="q">Charging spot ${val(ex && ex.sleep, 'sleep_spot', { size: 10 })}</div><div class="q">Phone bedtime ${val(ex && ex.bed, 'bedtime', { size: 10 })}</div><div class="q">Grown-ups’ phones ${val(ex && ex.grown, 'grown_phones', { size: 10 })}</div></div>
  <div class="pc"><div class="ph"><b>2</b><span class="kid">Our screen spot</span></div><div class="q">From ${val(ex && ex.from, 'spot_from', { size: 10 })} to ${val(ex && ex.to, 'spot_to', { size: 10 })}</div><div class="q">Screen fun includes ${val(ex && ex.counts, 'counts', { size: 10 })}</div><p class="note">Same time every day. Never bigger or smaller because of chores or behavior.</p></div>
  <div class="pc"><div class="ph"><b>3</b><span class="kid">Phone-free zones</span></div><div class="tl">${zoneNames.map((z, i) => `<label>${tick(ex && ex.zones[i], 'zone')}${z}</label>`).join('')}</div><div class="q">Also ${val(ex && ex.zoneOther, 'zone_other', { size: 9 })}</div></div>
  <div class="pc"><div class="ph"><b>4</b><span class="kid">Phone-free times</span></div><div class="q">School days ${val(ex && ex.school, 'times_school', { size: 9 })}</div><div class="q">Weekends ${val(ex && ex.weekend, 'times_weekend', { size: 9 })}</div><div class="q">Phone-free days ${val(ex && ex.days, 'free_days', { size: 9 })}</div></div>
  <div class="pc"><div class="ph"><b>5</b><span class="kid">We ask first before</span></div><div class="tl" style="grid-template-columns:1fr">${asks.map((z, i) => `<label>${tick(ex && ex.ask[i], 'ask')}${z}</label>`).join('')}</div></div>
  <div class="pc"><div class="ph"><b>6</b><span class="kid">Our go-to phone-free fun</span></div>${[0, 1, 2, 3].map(i => `<div class="q">${val(ex && ex.fun[i], 'fun', { size: 10 })}</div>`).join('')}</div>
  <div class="pc" style="grid-column:1/3;flex-direction:row;gap:.2in;align-items:flex-end"><div style="flex:1;display:flex;flex-direction:column;gap:.04in"><div class="ph"><b>7</b><span class="kid">Our check-in</span></div><div class="q">Monthly, on ${val(ex && ex.check, 'checkin', { size: 10 })}</div></div><div style="flex:0 0 2.2in"><div class="q">Next review ${val(ex && ex.next, 'review', { size: 10 })}</div></div></div>
  <div class="pc" style="grid-column:1/3;min-height:1.05in"><div class="ph"><b>8</b><span class="kid">Signed by everyone in the house</span></div><div class="sig" style="grid-template-columns:repeat(4,1fr);flex:1">${[1, 2, 3, 4].map(() => `<div style="height:auto;min-height:.6in;background:#fff">${ex ? '' : `<span class="fl" ${fld('sign', { size: 13 })}></span>`}</div>`).join('')}</div></div>
  </div>`;
}

// ---------------------------------------------------------------- section F: 30 afternoons
function challenge(ctx) {
  const rules = [
    ['phonePark', 'Pick your hours', 'Choose a stretch after school, like 3:30 to 5:30. Write it on the tracker.'],
    ['phoneSleep', 'Phones park', 'Every phone in the house naps at the charging spot, grown-ups’ too if they’re home.'],
    ['freeChoice', 'Pick an idea', 'Choose from the 30 ideas, or invent your own. Big kids can plan it themselves.'],
    ['planner', 'Color it in', 'Color the circle on the tracker each day. Missed a day? Just pick up where you left off.'],
    ['alarm', 'Tired day?', 'Every idea has a 2-minute version. It still counts.'],
    ['talkDay', 'Tell us at dinner', 'One question at dinner: “What was the best part of your afternoon?”'],
  ];
  return hd({ eyebrow: 'Section F · The 30-day challenge', title: '30 Phone-Free Afternoons', lede: 'A month of afternoons that belong to your big kid: build, ride, cook, invent, explore. No phone yet? Do it anyway; it’s great practice for planning your own time.', age: 'k', prepT: 'No prep' })
    + `<div style="height:2.75in">${X.sceneAfternoon()}</div>
  <div class="rules">${rules.map(([a, t, s]) => `<div>${art(a)}<div><div class="kid">${t}</div><div class="body">${s}</div></div></div>`).join('')}</div>
  <div class="badges">${[[10, 'Explorer', 'you pick the family game tonight.'], [20, 'Adventurer', 'plan a walk or ride somewhere new.'], [30, 'Champion', 'certificate, plus a together treat you choose.']].map(([n, t, c]) => `<div><span class="bdg">${n}<small>days</small></span><div><div class="kid" style="font-size:10pt;white-space:nowrap">Afternoon ${t}</div><div class="small">Day ${n}: ${c}</div></div></div>`).join('')}</div>
  <div class="card" style="--cbg:var(--tS)"><div class="h2">Safe afternoons, every time</div>${li(['A grown-up is home, or knows the plan: where, with whom, and back by when.', 'Helmets on for wheels. Knives and the stove only with a grown-up right there; grown-ups handle craft knives.', 'Little brothers and sisters join in? Keep small pieces, marbles and game bits away from under-3s, and skip nuts, popcorn and whole grapes for toddlers.'])}</div>`;
}
function tracker(ctx, blank) {
  const tiles = Array.from({ length: 30 }, (_, i) => {
    const d = T.AFTERNOONS[i]; const m = (i + 1) % 10 === 0;
    return `<div class="${m ? 'm' : ''}"><span class="dn">${i + 1}</span><span class="cc" ${fld('day_done', { check: true })}></span>${blank ? drawSpot() : art(d[0], '', false)}${blank ? `<span class="fl" ${fld('idea', { size: 8, align: 1 })}></span>` : `<span class="nm">${d[1]}</span>`}</div>`;
  }).join('');
  return hd({ eyebrow: `Section F · Tracker${blank ? ' · make-it-yours (fillable)' : ''}`, title: blank ? 'My 30 afternoons' : '30 Phone-Free Afternoons', lede: '', age: 'k', prepT: 'No prep', extra: blank ? tag('Fillable') : '' })
    + `<div class="hrs"><span>Name</span>${line('name', { size: 11 })}<span>Our hours: from</span>${line('from', { size: 10 })}<span>to</span>${line('to', { size: 10 })}</div>
  <div class="small" style="color:var(--ink);margin-top:-.04in">${blank ? 'Write or draw your own idea in each box. ' : ''}Color the circle when the afternoon is done. Days 10, 20 and 30 are celebration days.</div>
  <div class="tr">${tiles}</div>`;
}
const IC = {
  bag: '<svg viewBox="0 0 20 20"><path d="M4 7h12l-1 11H5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M7 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  clock: '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 5V10L13 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  drop: '<svg viewBox="0 0 20 20"><path d="M10 2C7 7 5 9.5 5 12.5a5 5 0 0 0 10 0C15 9.5 13 7 10 2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  play: '<svg viewBox="0 0 20 20"><path d="M5 2h10M5 18h10M6 2c0 5 8 5 8 8s-8 3-8 8M14 2c0 5-8 5-8 8s8 3 8 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  shield: '<svg viewBox="0 0 20 20"><path d="M10 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
};
function ideas(ctx, part) {
  const per = 10; const list = T.AFTERNOONS.slice(part * per, part * per + per);
  const rows = list.map((d, j) => {
    const [a, n, how, two, needs, safe, harder, prepMin, mess] = d; const i = part * per + j + 1;
    const icons = `<span class="icons">${needs ? `<span class="flag nd">${IC.bag}Needs: ${needs}</span>` : `<span class="flag nb">${IC.bag}Nothing to buy</span>`}<span class="flag ni">${IC.clock}Prep ${prepMin} min</span><span class="flag ni">${IC.drop}Mess: ${mess.toLowerCase()}</span><span class="flag ni">${IC.play}Play 20+ min</span></span>`;
    return `<div class="ir"><span class="n">${i}</span>${art(a)}<div class="w"><span><b>${/[.!?]$/.test(n) ? n : n + '.'}</b> ${how}</span><span class="hd2"><b style="font-size:8pt">Make it harder:</b> ${harder}</span>${icons}</div><div class="x"><span><b>Make it easier (2 min):</b> ${two}</span><span class="fl2">${IC.shield}${safe}</span></div></div>`;
  }).join('');
  const first = part * per + 1, last = part * per + per;
  return hd({ eyebrow: `Section F · 30 afternoon ideas · ${part + 1} of 3`, title: `Afternoon ideas ${first}–${last}`, lede: part ? 'Every idea: an easier 2-minute version, a harder one, and a safety line.' : '26 of 30 need nothing to buy. A grown-up is home or knows the plan for every idea.', age: 'k', prepT: 'Prep 0–2 min' })
    + `<div class="il"><div class="ir h"><span>#</span><span></span><span>The idea · make it harder</span><span>Tired day + safety</span></div>${rows}</div>`;
}
function checkin(ctx) {
  return hd({ eyebrow: 'Section F · Monthly check-in', title: 'Our monthly check-in', lede: 'Five minutes, once a month. Snacks recommended. Everyone answers, grown-ups too.', age: 'all', prepT: 'No prep', extra: tag('Fillable') })
    + `<div class="ci"><div style="background:transparent"></div>${[1, 2, 3].map(m => `<div class="mh">Month ${m} ${line('month' + m, { size: 9 })}</div>`).join('')}
  ${T.CHECKIN.map((q, qi) => `<div class="qh">${q}</div>${[1, 2, 3].map(m => `<div class="cell"><span class="fl" ${fld('q' + (qi + 1) + '_m' + m, { size: 9, multi: true })}></span></div>`).join('')}`).join('')}</div>
  <p class="small">Something to change? Update the agreement or the fridge-door plan together, and write the new date on both.</p>`;
}
function certificate(ctx) {
  const lock = (ctx.low ? LOGO.lockK : LOGO.lock).replace('<svg', '<svg style="height:.42in;width:auto"');
  return `<div class="cert"><span class="eyebrow" style="color:var(--ink)">Certificate of adventure</span>
  <div><div class="h1">30 Phone-Free<br>Afternoons</div><div class="kid" style="font-size:18pt;margin-top:.08in;color:var(--m)">Afternoon Champion</div></div>
  <div class="scene">${X.sceneAfternoon({ bg: ctx.low ? '#fff' : 'var(--t)' }).replace(`fill="var(--t)"`, 'style="fill:var(--t)"')}</div>
  <p class="body" style="font-size:11.5pt;max-width:5.6in">For 30 afternoons of building, riding, cooking, inventing and exploring, and for planning your own time.</p>
  <div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:.08in"><span class="nmf" ${fld('name', { size: 22, align: 1 })}></span><span class="small">Name</span></div>
  <div class="two" style="width:100%"><div class="who" style="text-transform:none;letter-spacing:0;font-size:9.5pt">Favorite afternoon: ${line('fav', { size: 10 })}</div><div class="who" style="text-transform:none;letter-spacing:0;font-size:9.5pt">Date: ${line('date', { size: 10 })}</div></div>
  <div class="who" style="width:100%;text-transform:none;letter-spacing:0;font-size:9.5pt">Signed by a proud grown-up: ${line('grown_sign', { size: 10 })}</div>
  ${lock}</div>`;
}
function more(ctx, qr) {
  const items = [
    ['fort', '150 “I’m Bored” Play Cards', 'Ages 1–12', 'Pick-a-card play ideas sorted by age and energy, each with a talk prompt.'],
    ['boardGame', 'Play-First Family Kit', 'Ages 2–12', 'Play First, Then Screens checklists, together tokens and a family plan.'],
    ['talkDay', '52 Family Talk-Along Cards', 'Ages 5–12', 'Dinner, car and bedtime questions that get big kids talking.'],
    ['packTomorrow', '230 Visual Routine Cards', 'Ages 0–12', 'Morning and bedtime routines, including a 5–12 set.'],
  ];
  const tiles = `<div class="toc" style="grid-template-columns:1fr 1fr;gap:.12in;flex:1;grid-auto-rows:1fr">${items.map(([a, t, g, s]) => `<div style="grid-template-columns:1.4in 1fr;padding:.16in">${art(a).replace('class="art ', 'style="width:1.4in;height:1.17in" class="art ')}<div><div class="nm" style="font-size:12pt">${t}</div><div class="eyebrow" style="margin:.04in 0">${g}</div><div class="body">${s}</div></div></div>`).join('')}</div>`;
  const tail = ctx.store
    ? `<div class="card" style="--cbg:var(--tS);flex-direction:row;gap:.3in;align-items:center;padding:.3in"><div style="width:2.2in;flex:0 0 auto;background:#fff;border-radius:.16in;padding:.16in">${qr.replace('<svg', '<svg style="width:100%;height:auto;display:block"')}</div>
      <div style="display:flex;flex-direction:column;gap:.1in"><span class="eyebrow">Your free bonus</span><div class="h2" style="font-size:17pt">Scan for a free summer and holiday edition</div>
      ${li(['30 more phone-free afternoon ideas for school breaks', 'A printable “phones sleep here” charging-spot sign in 3 colors', 'One short play idea a month, matched to your child’s age'])}
      <div style="font-weight:800;font-size:10.5pt">${T.BONUS}</div>
      <p class="small">We ask for an email and, if you like, your child’s birth month and year so ideas fit their age. Never names. Unsubscribe anytime.</p></div></div>`
    : `<div class="card" style="--cbg:var(--tS);flex-direction:row;gap:.3in;align-items:center;padding:.3in">${art('familyGame', '', false).replace('class="art ', 'style="width:2.2in;height:1.85in;flex:0 0 auto" class="art ')}
      <div style="display:flex;flex-direction:column;gap:.1in"><div class="h2" style="font-size:17pt">Thank you for playing first</div><p class="body">Your files stay on your Purchases page, ready to download again anytime. Open it in a web browser, not the app.</p><p class="body">Tried the kit? Honest reviews help other parents decide.</p></div></div>`;
  return hd({ eyebrow: 'More from Play Before Pixels', title: 'Next for your family', lede: ctx.store ? 'Same calm design, the same “play first” idea. Find them all at playbeforepixels.com.' : 'Same calm design, the same “play first” idea. Find them all in our shop, Play Before Pixels.', age: 'all' })
    + tiles + tail;
}
function colorsIntro(ctx, P) {
  return hd({ eyebrow: 'Section G · Colorways', title: 'Pick your colors', lede: 'The main pages again in Sky and Plum, so each child can choose their own. The Tomato versions are earlier in this file.', age: 'all' })
    + `<div class="three" style="flex:1">${COLORWAYS.map(c => `<div class="card cw-${c.id}" style="--cbg:var(--t);align-items:center;text-align:center;justify-content:center"><div style="width:1.4in;height:1.4in;border-radius:50%;background:var(--m)"></div><div class="kid" style="font-size:18pt">${c.name}</div><p class="body">Agreement (2 pages), fridge-door plan, tracker and certificate</p><div class="eyebrow" style="margin-top:.06in">${c.id === 'tomato' ? `Pages ${P.agree}–${P.agree + 1}, ${P.planB}, ${P.tracker}, ${P.cert}` : `Pages ${P['agree_' + c.id]}–${P['cert_' + c.id]}`}</div></div>`).join('')}</div>
  <div class="card" style="--cbg:var(--tS)"><p class="body">All three colorways hold the same fillable fields. Fill in the one you’ll print.</p></div>`;
}

// ---------------------------------------------------------------- assemble
function buildDoc(ctx, qr) {
  const P = {}; const pages = [];
  const add = (key, fn, toc, cw) => pages.push({ key, fn, toc, cw });
  add('cover', c => cover(c), 'Cover');
  add('inside', (c, P) => inside(c, P), 'What’s inside');
  add('guide1', c => guide1(c), 'Grown-up guide');
  add('guide2', (c, P) => guide2(c, P));
  add('tips', (c, P) => tips(c, P), 'Printing, filling in and safety');
  add('faq', c => faq(c), 'Quick answers');
  add('ready', c => ready(c, false), 'Are we ready? checklist');
  add('missions', c => missions(c), '10 practice missions');
  add('readyB', c => ready(c, true), 'Are we ready? (fillable blank)');
  add('agree', c => agree1(c), 'Our First Phone Agreement');
  add('agree2', c => agree2(c));
  add('agreeB', c => agreeBlank(c), 'Make-it-yours agreement (fillable)');
  add('zones', c => zones(c), 'Phone-free zones');
  add('times', c => times(c), 'Phone-free times');
  add('signs', c => signs(c, 0), 'Zone signs');
  add('signs2', c => signs(c, 1));
  add('plan', c => plan(c, true), 'Fridge-Door Tech Plan (example)');
  add('planB', c => plan(c, false), 'Fridge-Door Tech Plan (fillable)');
  add('challenge', c => challenge(c), '30 Phone-Free Afternoons');
  add('tracker', c => tracker(c, false), 'Tracker');
  add('trackerB', c => tracker(c, true), 'Tracker (fillable blank)');
  add('ideas', c => ideas(c, 0), '30 afternoon ideas');
  add('ideas2', c => ideas(c, 1));
  add('ideas3', c => ideas(c, 2));
  add('checkin', c => checkin(c), 'Monthly check-in');
  add('cert', c => certificate(c), 'Certificate');
  if (!ctx.low) {
    add('colors', (c, P) => colorsIntro(c, P), 'Colorways: Sky and Plum');
    ['sky', 'plum'].forEach(cw => {
      add('agree_' + cw, c => agree1(c), null, cw);
      add('agree2_' + cw, c => agree2(c), null, cw);
      add('planB_' + cw, c => plan(c, false), null, cw);
      add('tracker_' + cw, c => tracker(c, false), null, cw);
      add('cert_' + cw, c => certificate(c), null, cw);
    });
  }
  add('more', c => more(c, qr), ctx.store ? 'More from Play Before Pixels + free bonus' : 'More from Play Before Pixels');
  pages.forEach((p, i) => { P[p.key] = i + 1; });
  P.ready = P.ready; P.agree = P.agree; P.challenge = P.challenge;
  const toc = [];
  const html = pages.map((p, i) => {
    if (p.toc) toc.push([p.toc, i + 1]);
    const body = p.fn(ctx, P);
    return `<section class="page cw-${p.cw || 'tomato'}${['guide1', 'guide2', 'tips'].includes(p.key) ? ' spread' : ''}" data-key="${p.key}">${body}${footer(ctx, i + 1)}</section>`;
  }).join('\n');
  return { html, toc, n: pages.length, P };
}

function wrap(ctx, body, outFile, title) {
  const fontRel = path.relative(path.dirname(outFile), path.join(BRAND, 'fonts/fonts.css'));
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>
<meta name="author" content="Play Before Pixels (AlphaPlay LLC)">
<link rel="stylesheet" href="${fontRel}"><style>${css(SIZES[ctx.size])}</style></head>
<body class="${ctx.low ? 'low' : 'color'} ${ctx.size}">${DEFS}${body}</body></html>`;
}

// ---------------------------------------------------------------- START HERE (1 page)
function startHere(ctx, qr, P) {
  const files = ctx.store
    ? [['first-phone-plan.pdf', 'Full color, US Letter'], ['first-phone-plan-a4.pdf', 'Full color, A4'], ['first-phone-plan-low-ink.pdf', 'White backgrounds, line art to color, US Letter'], ['first-phone-plan-low-ink-a4.pdf', 'Low-ink, A4']]
    : [['2-Color-US-Letter.pdf', 'Full color, US Letter'], ['3-Color-A4.pdf', 'Full color, A4'], ['4-Low-Ink-US-Letter.pdf', 'White backgrounds, line art to color, US Letter'], ['5-Low-Ink-A4.pdf', 'Low-ink, A4']];
  return `<section class="page cw-tomato"><div style="display:flex;justify-content:space-between;align-items:center">${LOGO.lock.replace('<svg', '<svg style="height:.5in;width:auto"')}<span class="chips">${chip('k')}</span></div>
  ${hd({ eyebrow: 'File 1 · Start here', title: 'First Phone Agreement Kit', lede: 'Thank you! Here’s what each file holds and how to print and fill it in. About 5 minutes to prep; no cutting needed.' })}
  <div class="card" style="--cbg:var(--tS)"><div class="h2">Your files</div>${li(files.map(([f, d]) => `<b>${f}</b> · ${d}`))}<p class="small" style="color:var(--ink)">Pick one file for your paper size. Color and low-ink files hold the same pages; the color file adds Sky and Plum versions of the main pages.</p></div>
  <div class="steps"><div class="card" style="--cbg:var(--tK)"><div class="h2">Printing</div>${li(['Print at <b>100% / Actual size</b>.', 'Print only the pages you need. Page 2 of each file lists them.', 'Cardstock for the zone signs (optional).'])}</div>
  <div class="card" style="--cbg:var(--tG)"><div class="h2">Filling in</div>${li(['Open the PDF in a free PDF reader that supports forms (computer or phone) and tap a line to type.', 'You can type names, dates, times, promises, zones, plan answers and tracker ideas. Printed words, colors and pictures can’t be changed.', 'Save, then print. Or print blank and write by hand.'])}</div></div>
  <div class="card" style="--cbg:var(--tT)"><div class="h2">Where to begin</div>${li([`<b>No phone yet?</b> Start with “Are we ready?” (page ${P.ready}) and the 10 practice missions.`, `<b>Phone on the way?</b> Start with Our First Phone Agreement (page ${P.agree}).`, `<b>Just want more afternoons without phones?</b> Jump to the 30-day challenge (page ${P.challenge}).`])}</div>
  <div class="card" style="--cbg:var(--tP)"><div class="h2">Downloading: use a browser, not the app</div><p class="body">${ctx.store ? 'Open your download link from the order email in a web browser. On a phone, save each PDF to your files first, then open it in a PDF reader.' : 'Open your Purchases page in a web browser (not the shop’s app) and download each file. On a phone, save each PDF to your files first, then open it in a PDF reader. Your files stay on your Purchases page to download again anytime.'}</p></div>
  ${ctx.store ? `<div class="card" style="flex-direction:row;align-items:center;gap:.2in"><div style="width:1.2in;flex:0 0 auto">${qr.replace('<svg', '<svg style="width:100%;height:auto;display:block"')}</div><div><div class="h2">Free bonus and re-downloads</div><p class="body">Scan for your free summer and holiday edition: <b>${T.BONUS}</b>. Lost a file? Your link stays in your order email; help is at <b>playbeforepixels.com/help</b>.</p></div></div>` : ''}
  ${ctx.store ? '' : `<div class="card" style="--cbg:var(--wash)"><div class="h2">Questions?</div><p class="body">Quick answers are on page ${P.faq} of each file: what age it suits, what you can edit, whether it works without a phone yet or for tablets and consoles, and what to do if your child tells you something worrying. Safety notes for the afternoon ideas are on page ${P.tips}.</p></div>`}
  <p class="small">License: personal and family use in your own family’s homes. Please don’t share or resell. Parent education, not medical or professional advice. Every afternoon idea follows our published safety rules.</p>
  ${footer(ctx, 1)}</section>`;
}

(async () => {
  const qr = await QR.toString('https://' + T.BONUS, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#1D2940', light: '#FFFFFF' } });
  const manifest = {};
  for (const ed of ['store', 'etsy']) for (const ink of ['color', 'low']) for (const size of ['letter', 'a4']) {
    fieldN = 0;
    const ctx = { size, low: ink === 'low', store: ed === 'store', ed };
    const name = `kit-${ed}-${ink}-${size}`;
    const out = path.join(OUT, name + '.html');
    const doc = buildDoc(ctx, qr);
    fs.writeFileSync(out, wrap(ctx, doc.html, out, `${T.TITLE} · ${ink === 'low' ? 'Low-ink' : 'Color'} · ${SIZES[size].name}`));
    manifest[name] = { pages: doc.n, toc: doc.toc, P: doc.P };
    if (ed === 'store' && ink === 'color' && size === 'letter') {
      const src = path.join(ROOT, 'source.html');
      fieldN = 0; const d2 = buildDoc(ctx, qr);
      fs.writeFileSync(src, wrap(ctx, d2.html, src, `${T.TITLE} · Color · US Letter`));
    }
  }
  for (const ed of ['store', 'etsy']) {
    fieldN = 0; const ctx = { size: 'letter', low: false, store: ed === 'store', ed };
    const out = path.join(OUT, `start-here-${ed}.html`);
    fs.writeFileSync(out, wrap(ctx, startHere(ctx, qr, manifest['kit-store-color-letter'].P), out, `START HERE · ${T.TITLE}`));
  }
  { fieldN = 0; const ctx = { size: 'letter', low: false, store: true, ed: 'store' }; const out = path.join(OUT, 'cover.html');
    fs.writeFileSync(out, wrap(ctx, `<section class="page cw-tomato" data-key="cover">${cover(ctx)}</section>`, out, T.TITLE)); }
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 1));
  console.log(Object.entries(manifest).map(([k, v]) => `${k}: ${v.pages} pages`).join('\n'));
})().catch(e => { console.error(e); process.exit(1); });
