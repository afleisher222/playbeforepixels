// Play-First Family Kit — builds every HTML variant.
//   node build.js            -> out/*.html + ../source.html
// Variants: size (letter|a4) x ink (color|low) x edition (store|etsy), plus START HERE (store|etsy).
// Art: shared cast + icon library copied from products/visual-routine-cards/build (base.js, art.js).
const fs = require('fs'); const path = require('path');
const QR = require('qrcode');
const B = require('./base.js');
const { A, NEW_SYMBOLS, R, Ci, Gp, U, star, heart, moon, tablet, stand, adult, bust } = require('./art.js');
const T = require('./content.js');
const { C } = B;
A.screenSpot = () => tablet(52, 52, .62) + Gp('translate(94,72)', U('clock', 'scale(.46)', `--ck1:${C.sun}`));
// Spec: generic tablet icon only. The shared 'devicesSleep' art also draws a phone, so this kit uses a tablet-only version.
A.devicesSleep = () => R(22, 74, 76, 8, 4, '#C08457') + tablet(56, 46, .52) + moon(94, 22, .2);
const TOK = '2.1 in (5.3 cm)';

const ROOT = path.resolve(__dirname, '..');
const BRAND = path.resolve(__dirname, '../../../brand');
const OUT = path.join(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });

const SIZES = { letter: { w: '8.5in', h: '11in', name: 'US Letter' }, a4: { w: '210mm', h: '297mm', name: 'A4' } };
const COLORWAYS = [
  { id: 'tomato', name: 'Tomato' }, { id: 'sky', name: 'Sky' }, { id: 'grass', name: 'Grass' }, { id: 'plum', name: 'Plum' },
];
const AGES = { '25': ['a25', 'Ages 2–5'], '512': ['a512', 'Ages 5–12'], '58': ['a512', 'Ages 5–8'], '812': ['a812', 'Ages 8–12'], all: ['aall', 'All ages'], grown: ['agrown', 'For grown-ups'] };

const svgFile = f => fs.readFileSync(path.join(BRAND, 'logo', f), 'utf8').replace(/<\?xml[^>]*>/, '').replace(/<title>.*?<\/title>/, '').replace(/ width="\d+" height="\d+"/, '');
const LOGO = { lock: svgFile('lockup-horizontal.svg'), lockK: svgFile('lockup-horizontal-black.svg'), word: svgFile('wordmark.svg'), wordK: svgFile('wordmark-black.svg'), mark: svgFile('mark.svg') };
const DEFS = `<svg class="defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${B.SYMBOLS.join('')}${NEW_SYMBOLS.join('')}</defs></svg>`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const art = (id, cls = '', disc = true) => `<svg class="art a-${id} ${cls}" viewBox="0 0 120 100" aria-hidden="true">${disc ? '<circle class="disc" cx="60" cy="52" r="44"/>' : ''}${A[id]()}</svg>`;
const drawSpot = (cls = '') => `<svg class="art draw ${cls}" viewBox="0 0 120 100" aria-hidden="true"><circle cx="60" cy="50" r="40" fill="none" stroke="#B8C2D3" stroke-width="1.6" stroke-dasharray="5 5"/><text x="60" y="54" text-anchor="middle" font-family="Nunito Sans, sans-serif" font-size="11" font-weight="700" fill="#8C97AB">draw it</text></svg>`;
const chip = a => `<span class="chip ${AGES[a][0]}"><i></i>${AGES[a][1]}</span>`;
const prep = t => `<span class="prep"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 5V10L13 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>${t}</span>`;
let fieldN = 0;
const fld = (name, o = {}) => `data-field="${name}_${++fieldN}"${o.size ? ` data-fsize="${o.size}"` : ''}${o.multi ? ' data-multi="1"' : ''}${o.align !== undefined ? ` data-falign="${o.align}"` : ''}${o.check ? ' data-ftype="check"' : ''}`;
const DAYS = { mon: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], sun: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] };
const DAY1 = { mon: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], sun: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] };

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
.page.tight{gap:.09in}
.page:last-child{break-after:auto;page-break-after:auto}
.cw-tomato{--m:var(--tomato);--t:var(--tT);--m2:var(--sun);--t2:var(--tS)}
.cw-sky{--m:var(--sky);--t:var(--tK);--m2:var(--grass);--t2:var(--tG)}
.cw-grass{--m:var(--grass);--t:var(--tG);--m2:var(--sky);--t2:var(--tK)}
.cw-plum{--m:var(--plum);--t:var(--tP);--m2:var(--tomato);--t2:var(--tT)}
.art .disc{fill:var(--t,var(--wash))}
.art{display:block}
.art.ghost{opacity:.22}
.art.a-bubbles .disc{fill:var(--tK)!important}
.low .art.ghost{opacity:.35}
/* footer */
.ft{position:absolute;left:.5in;right:.5in;bottom:.25in;min-height:.2in;display:flex;align-items:center;justify-content:space-between;gap:.15in;font-size:6.2pt;color:var(--mute);white-space:nowrap}
.ft>span:nth-child(2){white-space:normal;text-align:center;flex:1 1 auto;min-width:0;line-height:1.25}
${sz.name === 'A4' ? '.page{padding-bottom:.87in}.ft{bottom:.5in}' : ''}
.ft .fb{display:flex;align-items:center;gap:.08in;font-weight:800;color:var(--ink)}
.ft .fb svg{height:.115in;width:auto;display:block}
/* type */
.eyebrow{font-weight:800;font-size:7.6pt;letter-spacing:.12em;text-transform:uppercase;color:var(--mute)}
.h1{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:27pt;line-height:1;letter-spacing:-.015em}
.h2{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:14pt;line-height:1.1;letter-spacing:-.005em}
.lede{font-size:10.5pt;line-height:1.4;color:var(--ink)}
.body{font-size:10pt;line-height:1.45}
.small{font-size:8pt;line-height:1.4;color:var(--mute)}
.hand{font-family:"Caveat",cursive;font-weight:700}
.kid{font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600}
/* chips */
.chips{display:flex;align-items:center;gap:.07in;flex-wrap:wrap}
.chip,.prep{display:inline-flex;align-items:center;gap:.05in;font-weight:800;font-size:7pt;letter-spacing:.07em;text-transform:uppercase;padding:.035in .1in;border-radius:1in;background:#fff;border:1px solid var(--line);color:var(--ink);white-space:nowrap}
.chip i{width:.1in;height:.1in;border-radius:50%;background:var(--c);display:block}
.a25{--c:var(--grass)} .a512{--c:var(--sky)} .a812{--c:var(--plum)} .aall{--c:var(--tomato)} .agrown{--c:var(--plum)}
.prep svg{width:.11in;height:.11in}
/* standard header */
.hd{display:flex;flex-direction:column;gap:.07in}
.hd .row{display:flex;align-items:center;justify-content:space-between;gap:.1in}
.hd .h1{margin-top:.02in}
/* fields */
.fl{display:block;border-bottom:1.3px solid var(--ink);height:.3in;flex:1}
.who{display:flex;align-items:flex-end;gap:.1in;font-weight:800;font-size:8pt;letter-spacing:.08em;text-transform:uppercase}
.who .fl{height:.28in}
.lines{position:relative;background-image:repeating-linear-gradient(to bottom,transparent 0,transparent calc(.3in - 1px),var(--line) calc(.3in - 1px),var(--line) .3in);border-radius:.04in}
.cb{display:inline-block;width:.19in;height:.19in;border:1.6px solid var(--ink);border-radius:.04in;flex:0 0 auto;background:#fff}
/* ---------- checklist ---------- */
.band{display:flex;align-items:stretch;gap:.16in;background:var(--m);color:#fff;border-radius:.2in;padding:.16in .24in;min-height:1.22in}
.band .l{flex:1;display:flex;flex-direction:column;justify-content:center;gap:.05in}
.band .eyebrow{color:#fff;opacity:.92}
.band .h1{font-size:28pt;color:#fff}
.band .sub{font-size:14pt;font-weight:800;line-height:1.15}
.band .pic{width:1.18in;background:#fff;border-radius:.16in;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.band .pic .art{width:1.05in;height:.9in}
.clg{flex:1;display:flex;flex-direction:column;min-height:0}
.clr{display:grid;grid-template-columns:var(--icw) 1fr repeat(7,.5in);align-items:center;column-gap:0}
.clr.dh{height:.34in}
.clr.dh .st{grid-column:1/3;font-size:7pt;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.clr.dh .d{font-family:"Fredoka",sans-serif;font-weight:600;font-size:10pt;text-align:center}
.row{}
.clr.r{flex:1 1 0;min-height:0;border-bottom:1px solid var(--line)}
.clr.r .ic{height:100%;display:flex;align-items:center;justify-content:center;padding:.04in 0}
.clr.r .ic .art{height:86%;max-height:.8in;width:auto;aspect-ratio:1.2}
.clr.r .lb{font-family:"Fredoka","Nunito Sans",sans-serif;font-weight:600;font-size:var(--lbs);line-height:1.1;padding:0 .1in 0 .12in}
.clr.r .lb.blank{padding-right:.15in}
.clr.r .lb.blank .fl{height:.34in;border-bottom:1.3px dashed var(--cut)}
.clr .dc{display:flex;justify-content:center;align-items:center}
.clr .dc i{width:.36in;height:.36in;border-radius:50%;border:2px solid var(--m);display:block;background:#fff}
.clr.scr .dc i{border-style:solid;border-color:var(--ink)}
.sec{display:flex;align-items:center;gap:.09in;background:var(--t);border-radius:.1in;height:.34in;padding:0 .12in;margin-top:.08in;font-weight:800;font-size:9.5pt}
.sec b{width:.26in;height:.26in;border-radius:50%;background:#fff;border:2px solid var(--m);color:var(--ink);display:flex;align-items:center;justify-content:center;font-family:"Fredoka",sans-serif;font-weight:600;font-size:10pt}
.sec.s3{background:var(--wash)} .sec.s3 b{background:var(--ink);border-color:var(--ink);color:#fff}
.clr.scr .lb{font-size:var(--lbs)}
.clr.scr .aft{display:flex;align-items:flex-end;gap:.06in;font-family:"Nunito Sans",sans-serif;font-weight:700;font-size:8.5pt;margin-top:.05in}
.clr.scr .aft .fl{height:.24in;flex:1}
.tipbar{display:grid;grid-template-columns:1.1fr 1fr;gap:.12in}
.tipbar>div{border-radius:.12in;padding:.1in .14in;font-size:8.4pt;line-height:1.35}
.tipbar .t1{background:var(--t2)} .tipbar .t2{background:var(--wash)}
.tipbar b.k{display:block;font-size:6.8pt;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.02in}
/* ---------- token grids ---------- */
.cutnote{display:flex;justify-content:space-between;align-items:center;gap:.1in;font-size:7.3pt;line-height:1.3;font-weight:700;color:var(--ink)}
.cutnote .safe{background:var(--tS);border-radius:.08in;padding:.04in .1in;flex:1}
.tg{display:grid;grid-template-columns:repeat(3,2.1in);grid-auto-rows:2.1in;border-top:1.6px dashed var(--cut);border-left:1.6px dashed var(--cut);align-self:center}
.tg>.tk{border-right:1.6px dashed var(--cut);border-bottom:1.6px dashed var(--cut);padding:.14in;position:relative}
.tk .in{height:100%;border-radius:.16in;background:var(--tt);display:flex;flex-direction:column;align-items:center;padding:.06in .08in .1in}
.tk .in .art{width:100%;flex:1;min-height:0}
.tk .in .art .disc{fill:#fff}
.tk .nm{font-family:"Fredoka",sans-serif;font-weight:600;font-size:13.5pt;text-align:center;line-height:1.05}
.tk .tag{font-size:5.8pt;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);margin-top:.03in}
.tk .fl{width:100%;flex:0 0 .32in;border-bottom:1.3px dashed var(--cut)}
.sc{display:grid;grid-template-columns:repeat(2,3.5in);grid-auto-rows:2.6in;border-top:1.6px dashed var(--cut);border-left:1.6px dashed var(--cut);align-self:center}
.sc>div{border-right:1.6px dashed var(--cut);border-bottom:1.6px dashed var(--cut);padding:.14in}
.sc .in{height:100%;border-radius:.2in;background:var(--tt);display:flex;flex-direction:column;align-items:center;padding:.08in .16in .14in;text-align:center}
.sc .in .art{width:100%;flex:1;min-height:0}
.sc .in .art .disc{fill:#fff}
.sc .nm{font-family:"Fredoka",sans-serif;font-weight:600;font-size:19pt;line-height:1.05}
.sc .s{font-size:9pt;font-weight:700;margin-top:.03in}
.sc .fl{width:100%;flex:0 0 .32in;margin-top:.02in}
/* ---------- board ---------- */
.board{flex:1;display:flex;flex-direction:column;gap:.1in}
.bstep{flex:1;display:grid;grid-template-columns:.62in 1fr 2.35in;align-items:center;gap:.18in;border-radius:.2in;padding:.1in .16in;background:var(--bt)}
.bstep .num{width:.62in;height:.62in;border-radius:50%;background:var(--bn);color:#fff;font-family:"Fredoka",sans-serif;font-weight:600;font-size:24pt;display:flex;align-items:center;justify-content:center}
.bstep .w{font-family:"Fredoka",sans-serif;font-weight:600;font-size:26pt;line-height:1}
.bstep .x{font-size:10pt;line-height:1.35;margin-top:.06in}
.slot{width:2.35in;height:2.35in;border-radius:.2in;background:#fff;border:2px dashed var(--bn);display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;font-size:8pt;font-weight:700;color:var(--mute);padding:.15in}
.slot .art{width:100%;flex:1;min-height:0}
.slot>.fl{width:100%;flex:0 0 .3in}
.arrow{height:.14in;display:flex;justify-content:center}
.rhythm{display:grid;grid-template-columns:1fr .3in 1fr .3in 1fr;align-items:stretch}
.rhythm .ar{align-self:center}
.rhythm>.rs{border-radius:.16in;padding:.08in .1in .12in;text-align:center;display:flex;flex-direction:column;align-items:center}
.rhythm .art{width:1.45in;height:1.2in}
.rhythm .art .disc{fill:#fff}
.rhythm .kid{font-size:12.5pt;line-height:1.1}
.rhythm .ar{display:flex;justify-content:center}
.sizecheck{display:grid;grid-template-columns:2.1in 1fr;gap:.25in;align-items:center}
.sizecheck .sq{width:2.1in;height:2.1in;border:2px dashed var(--ink);border-radius:.06in;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.1in;position:relative}
.sizecheck .cir{width:1.25in;height:1.25in;border-radius:50%;border:2px solid var(--tomato);display:flex;align-items:center;justify-content:center;text-align:center;font-size:7pt;font-weight:800;line-height:1.2;padding:.1in}
/* ---------- helping jobs ---------- */
.hj{flex:1;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(4,1fr);gap:.12in;min-height:0}
.hj>div{border-radius:.16in;background:var(--tt);display:flex;flex-direction:column;align-items:center;padding:.06in .1in .1in;min-height:0}
.hj .art{flex:1;min-height:0;width:100%}
.hj .art .disc{fill:#fff}
.hj .nm{font-family:"Fredoka",sans-serif;font-weight:600;font-size:12.5pt;line-height:1.05;text-align:center;margin:.02in 0 .06in}
.hj .fl{flex:0 0 .3in;width:100%;border-bottom:1.3px dashed var(--cut);margin-bottom:.05in}
.dots{display:flex;gap:.035in}
.dots span{width:.265in;height:.265in;flex:0 0 auto;border-radius:50%;background:#fff;border:1.4px solid var(--ink);font-size:5.6pt;font-weight:800;display:flex;align-items:center;justify-content:center;color:var(--mute)}
/* ---------- chore table ---------- */
.ch{flex:1;display:flex;flex-direction:column;min-height:0}
.chr{display:grid;grid-template-columns:.62in 1fr 1.05in repeat(7,.44in);align-items:center}
.chr.h{height:.36in;font-weight:800;font-size:7pt;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.chr.h .d{font-family:"Fredoka",sans-serif;font-weight:600;font-size:9.5pt;letter-spacing:0;text-transform:none;color:var(--ink);text-align:center}
.chr.r{flex:1 1 0;min-height:0;border-bottom:1px solid var(--line)}
.chr.r:nth-child(odd){background:var(--wash)}
.chr .ic{height:100%;display:flex;align-items:center;justify-content:center;padding:.03in 0}
.chr .ic .art{height:88%;max-height:.56in;width:auto;aspect-ratio:1.2}
.chr .lb{font-family:"Fredoka",sans-serif;font-weight:600;font-size:11.5pt;padding:0 .14in 0 .08in;line-height:1.05}
.chr .who2{padding-right:.1in}
.chr .who2 .fl,.chr .lb .fl{height:.3in;border-bottom:1.2px dashed var(--cut)}
.chr .dc{display:flex;justify-content:center}
.chr .dc i{width:.3in;height:.3in;border-radius:.07in;border:1.6px solid var(--sky);background:#fff;display:block}
/* ---------- poster ---------- */
.poster{flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,1fr);gap:.13in;min-height:0}
.poster>div{border-radius:.18in;background:var(--tt);display:grid;grid-template-columns:1.25in 1fr;align-items:center;gap:.06in;padding:.08in .16in .08in .08in;min-height:0}
.poster .art{width:100%;height:auto}
.poster .art .disc{fill:#fff}
.poster .nm{font-family:"Fredoka",sans-serif;font-weight:600;font-size:15.5pt;line-height:1.12}
.poster .fl{height:.95in;border-bottom:none}
.ptitle{text-align:center;display:flex;flex-direction:column;align-items:center;gap:.06in}
.ptitle .h1{font-size:40pt}
.sign{display:flex;align-items:flex-end;gap:.1in;font-weight:800;font-size:8.5pt}
.sign .fl{height:.36in}
/* ---------- plan ---------- */
.card{border-radius:.16in;background:var(--cbg,var(--wash));padding:.16in .2in;display:flex;flex-direction:column;gap:.07in}
.card .h2{font-size:12.5pt}
.q{font-size:9pt;font-weight:700}
.qrow{display:flex;align-items:flex-end;gap:.08in;font-size:9.4pt;font-weight:700}
.qrow .fl{height:.28in}
.cbl{display:grid;grid-template-columns:1fr 1fr;gap:.08in .2in}
.cbl label{display:flex;align-items:center;gap:.08in;font-size:9.4pt;font-weight:700}
.three{display:grid;grid-template-columns:repeat(3,1fr);gap:.12in}
.sig{display:grid;grid-template-columns:repeat(3,1fr);gap:.12in}
.sig>div{border:1.5px dashed var(--cut);border-radius:.14in;height:1.05in;position:relative}
.sig>div span{position:absolute;left:.1in;bottom:.06in;font-size:6.6pt;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.cite{font-size:7pt;line-height:1.35;color:var(--mute)}
/* ---------- tracker ---------- */
.tr{flex:1;display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(6,1fr);gap:.09in;min-height:0}
.tr>div{border-radius:.13in;border:1.6px solid var(--line);display:flex;flex-direction:column;align-items:center;padding:.04in .06in .07in;position:relative;min-height:0;background:#fff}
.tr .dn{position:absolute;left:.07in;top:.05in;font-family:"Fredoka",sans-serif;font-weight:600;font-size:10pt;width:.26in;height:.26in;border-radius:50%;background:#fff;border:2px solid var(--tn);color:var(--ink);display:flex;align-items:center;justify-content:center}
.tr .art{flex:1;min-height:0;width:100%}
.tr .nm{font-weight:800;font-size:7.8pt;line-height:1.12;text-align:center;min-height:.24in;display:flex;align-items:center}
.tr .fl{flex:0 0 .42in;width:100%;border-bottom:1.2px dashed var(--cut)}
/* ---------- 30-play guide ---------- */
.pg30{flex:1;display:flex;flex-direction:column;min-height:0}
.pgr{display:grid;grid-template-columns:1.9in .98in repeat(3,1fr) .84in;column-gap:.08in;padding:.05in .06in}
.pgr.h{font-weight:800;font-size:6.4pt;letter-spacing:.07em;text-transform:uppercase;color:var(--mute);align-items:end;padding-bottom:.04in;border-bottom:1.4px solid var(--ink)}
.pgr.r{flex:1 1 auto;border-bottom:1px solid var(--line);align-items:center;font-size:7.7pt;line-height:1.28}
.pgr.r:nth-child(odd){background:var(--wash)}
.pgr .pt{display:flex;align-items:center;gap:.06in}
.pgr .pt .kid{font-size:10.5pt;line-height:1.05}
.pgr .dn{flex:0 0 auto;font-family:"Fredoka",sans-serif;font-weight:600;font-size:8pt;width:.22in;height:.22in;border-radius:50%;background:#fff;border:1.8px solid var(--tn);color:var(--ink);display:flex;align-items:center;justify-content:center}
.pgr .from{font-weight:800;font-size:7.4pt;margin:.03in 0 .02in .28in}
.pgr .meta{display:flex;flex-wrap:wrap;gap:.01in .06in;font-size:6.8pt;font-weight:700;color:var(--mute);margin-left:.28in}
.pgr .meta span,.pgr .nd{display:inline-flex;align-items:center;gap:.025in}
.pgr svg{width:.09in;height:.09in;flex:0 0 auto;color:var(--ink)}
.pgr .cl{display:flex;flex-direction:column;gap:.03in}
.pgr .nd{align-items:flex-start;font-weight:700}
.pgr .nd svg{margin-top:.02in}
.pgr .sf{font-size:7pt;line-height:1.25}
.pgr .say{font-weight:700}
.low .pgr.r:nth-child(odd){background:#fff}
.low .pgr .dn{border-color:var(--ink)}
/* ---------- certificate ---------- */
.cert{flex:1;border-radius:.3in;border:.14in solid var(--sun);padding:.35in;display:flex;flex-direction:column;align-items:center;justify-content:space-between;text-align:center;position:relative;background:#fff}
.cert .h1{font-size:40pt}
.cert .nmf{width:80%;border-bottom:2px solid var(--ink);height:.55in}
/* ---------- guide ---------- */
.steps{display:grid;grid-template-columns:1fr 1fr;gap:.12in}
.step{display:grid;grid-template-columns:.34in 1fr;gap:.1in;align-items:start;background:var(--wash);border-radius:.14in;padding:.12in .14in}
.step b.n{width:.34in;height:.34in;border-radius:50%;background:#fff;border:2px solid var(--tomato);color:var(--ink);font-family:"Fredoka",sans-serif;font-weight:600;font-size:13pt;display:flex;align-items:center;justify-content:center}
.talk{display:grid;grid-template-columns:repeat(3,1fr);gap:.12in}
.talk>div{border-radius:.14in;padding:.14in;background:var(--tt);display:flex;flex-direction:column;gap:.05in}
.ball{display:inline-block;width:.1in;height:.1in;border-radius:50%;background:var(--tomato);margin-right:.07in;vertical-align:.01in;flex:0 0 auto}
ul.b{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.06in}
ul.b li{display:flex;gap:0;align-items:baseline;font-size:9.8pt;line-height:1.42}
ul.b li .ball{transform:translateY(-.01in)}
.placeholder{border:2px dashed var(--plum);border-radius:.14in;padding:.14in .18in;background:#fff}
.mk .placeholder{display:none}
.placeholder b{color:var(--plum);font-size:7.4pt;letter-spacing:.1em;text-transform:uppercase}
.agecards{display:grid;grid-template-columns:repeat(3,1fr);gap:.12in}
.agecards>div{border-radius:.16in;padding:.16in;display:flex;flex-direction:column;gap:.06in}
.toc{display:grid;grid-template-columns:1fr 1fr;gap:.1in}
.toc>div{border-radius:.14in;background:var(--wash);padding:.12in .14in;display:grid;grid-template-columns:.78in 1fr;gap:.1in;align-items:center}
.toc .art{width:.78in;height:.65in}
.toc .art .disc{fill:#fff}
.toc .nm{font-weight:800;font-size:9.6pt;line-height:1.2}
.toc .pg{font-size:7.8pt;color:var(--mute);font-weight:700;margin-top:.02in}
/* ---------- low-ink ---------- */
.low .art *,.low .defs *{fill:#fff!important;stroke:var(--ink)!important;stroke-width:1.25px!important;vector-effect:non-scaling-stroke}
.low .art [fill="#1D2940"],.low .defs [fill="#1D2940"]{fill:var(--ink)!important}
.low .ck{display:none}
/* SVG text stays filled ink, never outlined: stroked text makes Chromium write a Type 3 font into the PDF (print preflight G1) */
.low .art text,.low .defs text{fill:var(--ink)!important;stroke:none!important}
.low .art.draw *{fill:none!important;stroke:#B8C2D3!important}
.low .art.draw text{fill:#8C97AB!important;stroke:none!important}
.low .art .disc{fill:none!important;stroke:none!important}
.low .page{--m:var(--ink);--t:#fff;--m2:var(--ink);--t2:#fff;--tt:#fff;--bt:#fff;--bn:var(--ink);--tn:var(--ink)}
.low .band{background:#fff;color:var(--ink);border:2px solid var(--ink)}
.low .band .eyebrow,.low .band .h1{color:var(--ink)}
.low .band .pic{border:1.5px solid var(--ink)}
.low .sec,.low .tipbar>div,.low .step,.low .toc>div,.low .card,.low .agecards>div,.low .talk>div,.low .cutnote .safe{background:#fff!important;border:1.5px solid var(--ink)}
.low .sec b{background:var(--ink);border-color:var(--ink);color:#fff}
.low .ball{background:var(--ink)}
.low .sizecheck .cir{border-color:var(--ink)}
.low .tr .dn,.low .step b.n{border-color:var(--ink)}
.low .tk .in,.low .sc .in,.low .hj>div,.low .poster>div,.low .bstep{background:#fff!important;border:1.5px solid var(--ink)}
.low .chr.r:nth-child(odd){background:#fff}
.low .chr .dc i{border-color:var(--ink)}
.low .cert{border-color:var(--ink);border-width:.06in}
.low .chip i{background:#fff;border:1.5px solid var(--ink)}
.low .chip.a25 i{border-radius:.02in} .low .chip.a812 i{border-radius:.02in;background:var(--ink)} .low .chip.a512 i{transform:rotate(45deg);border-radius:.01in}
`;
}

// ---------------------------------------------------------------- page shell
function footer(ctx, n) {
  const word = ctx.low ? LOGO.wordK : LOGO.word;
  return `<footer class="ft"><span class="fb">${word}${ctx.store ? '<span>playbeforepixels.com</span>' : ''}</span><span>${T.COPY} <span style="white-space:nowrap">Personal &amp; family use.</span></span><span>${T.VERSION} · ${n}</span></footer>`;
}
function hd({ eyebrow, title, lede, age, prepT, right = '' }) {
  return `<header class="hd"><div class="row"><span class="eyebrow">${eyebrow}</span><span class="chips">${age ? chip(age) : ''}${prepT ? prep(prepT) : ''}</span></div>
  <div class="row" style="align-items:flex-end"><div style="display:flex;flex-direction:column;gap:.06in"><h1 class="h1">${title}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}</div>${right}</div></header>`;
}

// ---------------------------------------------------------------- checklist
function checklist(ctx, kind, cw, start) {
  const K = T.CHECK[kind];
  const blank = kind === 'blank';
  const nRows = K.sections.reduce((s, x) => s + (blank ? x.rows : x.rows.length), 0) + 1;
  const icw = nRows > 8 ? '.82in' : '.98in', lbs = kind === 'little' ? '15pt' : kind === 'big' ? '12.5pt' : '12pt';
  const days = DAYS[start].map(d => `<div class="d">${d}</div>`).join('');
  const cells = '<div class="dc"><i></i></div>'.repeat(7);
  let rows = '';
  K.sections.forEach(s => {
    rows += `<div class="sec"><b>${s.n}</b>${s.t}</div>`;
    const list = blank ? Array.from({ length: s.rows }, () => null) : s.rows;
    list.forEach(r => {
      rows += r ? `<div class="clr r"><div class="ic">${art(r[0])}</div><div class="lb">${esc(r[1])}</div>${cells}</div>`
        : `<div class="clr r"><div class="ic">${drawSpot()}</div><div class="lb blank"><span class="fl" ${fld('row', { size: 12 })}></span></div>${cells}</div>`;
    });
  });
  rows += `<div class="sec s3"><b>3</b>Then screens, at their usual spot</div>`;
  rows += `<div class="clr r scr"><div class="ic">${art(K.screen[0])}</div><div class="lb">${K.screen[1]}<div class="aft">after <span class="fl" ${fld('screen_after', { size: 10 })}></span> for <span class="fl" style="flex:.55" ${fld('screen_len', { size: 10 })}></span></div></div>${cells}</div>`;
  const cwName = ctx.low ? 'Low-ink' : COLORWAYS.find(c => c.id === cw).name;
  return `<div class="chips" style="justify-content:space-between"><span class="eyebrow">Section B · ${K.eyebrow}${blank ? ' · fillable' : ''}</span><span class="chips">${chip(K.age)}${prep('Prep 0 min · print and go')}</span></div>
  <div class="band"><div class="l"><h1 class="h1">Play First, Then Screens</h1><div class="sub">${K.sub}</div></div><div class="pic">${art(K.art, '', false)}</div></div>
  <div class="who">Name <span class="fl" ${fld('name', { size: 12 })}></span> Week of <span class="fl" style="flex:.7" ${fld('week', { size: 12 })}></span></div>
  <div class="clg" style="--icw:${icw};--lbs:${lbs}"><div class="clr dh"><div class="st">${start === 'mon' ? 'Monday' : 'Sunday'} start · ${cwName}</div>${days}</div>${rows}</div>
  <div class="tipbar"><div class="t1"><b class="k">Talk tip · ${K.tip[0]}</b>${K.tip[1]}</div><div class="t2"><b class="k">Our screen spot</b>${T.SCREEN_NOTE}</div></div>`;
}

// ---------------------------------------------------------------- tokens + cards + board
const TINTS = ['var(--tT)', 'var(--tK)', 'var(--tG)', 'var(--tS)', 'var(--tP)'];
function cutNote(lead) {
  return `<div class="cutnote"><span class="safe">${lead ? lead + ' ' : ''}<b>Grown-up keeps the pieces.</b> Every piece is at least ${TOK}, bigger than the toilet-paper-tube test. Print at 100%. Hook-and-loop dots are for ages 3+ only: check dots before each play; remove any that lift.</span></div>`;
}
function tokens(ctx, blank, pgBoard) {
  const items = blank ? Array.from({ length: 12 }, () => null) : T.TOKENS;
  const cells = items.map((t, i) => `<div class="tk" data-cut><div class="in" style="--tt:${TINTS[i % 5]}">${t ? art(t[0]) + `<div class="nm">${t[1]}</div><div class="tag">Together token</div>` : drawSpot() + `<span class="fl" ${fld('token', { size: 12, align: 1 })}></span><div class="tag">Together token</div>`}</div></div>`).join('');
  return hd({ eyebrow: `Section E · Cut sheet ${blank ? 'B' : 'A'} · use with the board, p. ${pgBoard}${blank ? ' · fillable' : ''}`, title: blank ? 'Make-your-own together tokens' : 'Together tokens', age: 'all', prepT: 'Prep 10 min · cut' })
    + cutNote(blank ? '<b>Type or write your own ideas for time together, then draw a picture.</b>' : '<b>Tokens are for play and time together, never screen minutes. After jobs, your child picks one.</b>') + `<div class="tg">${cells}</div>`;
}
function spotCards(ctx) {
  const cells = T.SPOT_CARDS.map((c, i) => `<div data-cut><div class="in" style="--tt:${['var(--tT)', 'var(--tG)', 'var(--tK)', 'var(--tS)', 'var(--tP)', 'var(--tG)'][i]}">${art(c.art)}<div class="nm">${c.t}</div><div class="s">${c.s}</div>${c.field ? `<span class="fl" ${fld(c.field, { size: 12, align: 1 })}></span>` : ''}</div></div>`).join('');
  return hd({ eyebrow: 'Section E · Cut sheet C · six cards, 3.5 × 2.6 in', title: 'Screen-spot cards', lede: 'Show what comes next, so screen time starts and ends gently: 5 more minutes, then screens go to sleep, then what we do next.', age: 'all', prepT: 'Prep 5 min · cut' })
    + cutNote() + `<div class="sc">${cells}</div>`;
}
function board(ctx, pgTokens) {
  const arrow = `<div class="arrow"><svg viewBox="0 0 40 18" width=".45in" height=".18in"><path d="M8 2L20 14 32 2" stroke="var(--ink)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
  const step = (n, w, x, slot, bt, bn) => `<div class="bstep" style="--bt:${bt};--bn:${bn}"><div class="num">${n}</div><div><div class="w">${w}</div><div class="x">${x}</div></div>${slot}</div>`;
  return hd({ eyebrow: 'Section C · Ages 2–5', title: 'The Play-First Board', lede: 'First, then, later: the whole idea on one page. Great for little ones who don’t read yet.', age: '25', prepT: 'Prep 2 min' })
    + `<div class="board">
    ${step(1, 'First: jobs', 'Draw or write today’s job, or point to it on your checklist.', `<div class="slot" style="--bn:var(--tomato)">${drawSpot()}<span class="fl" ${fld('board_job', { size: 12, align: 1 })}></span></div>`, 'var(--tT)', 'var(--tomato)')}
    ${arrow}
    ${step(2, 'Then: together time', `Lay a together token here (page ${pgTokens}). Under 3? Just lay it on top, with no hook-and-loop dots.`, `<div class="slot" style="--bn:var(--grass)">${art('boardGame', 'ghost', false)}Put a together token here</div>`, 'var(--tG)', 'var(--grass)')}
    ${arrow}
    ${step(3, 'Later: screens', 'Screens come last, at the same spot every day.', `<div class="slot" style="--bn:var(--sky);border-style:solid">${art('screenSpot')}<div style="display:flex;width:100%;align-items:flex-end;gap:.05in;color:var(--ink);font-size:10pt">after <span class="fl" ${fld('board_after', { size: 11 })}></span></div></div>`, 'var(--tK)', 'var(--sky)')}
  </div>`;
}

// ---------------------------------------------------------------- helping jobs + chores
function helping(ctx, blank, start) {
  const items = blank ? Array.from({ length: 12 }, () => null) : T.HELP;
  const dots = `<div class="dots">${DAY1[start].map(d => `<span>${d}</span>`).join('')}</div>`;
  const cells = items.map((h, i) => `<div style="--tt:${TINTS[(i + (i >> 2)) % 5]}">${h ? art(h[0]) + `<div class="nm">${h[1]}</div>` : drawSpot() + `<span class="fl" ${fld('job', { size: 11, align: 1 })}></span>`}${dots}</div>`).join('');
  return hd({ eyebrow: `Section C · Ages 2–5 · ${start === 'mon' ? 'Monday' : 'Sunday'} start${blank ? ' · fillable' : ''}`, title: blank ? 'Our helping jobs' : 'Little helping jobs', lede: 'Pick 2 or 3 jobs for this week and color a dot each day you help. Doing it together counts.', age: '25', prepT: 'Prep 0 min · print and go' })
    + `<div class="who">Name <span class="fl" ${fld('name', { size: 12 })}></span> Week of <span class="fl" style="flex:.7" ${fld('week', { size: 12 })}></span></div>`
    + `<div class="hj">${cells}</div>`
    + `<div class="tipbar"><div class="t1"><b class="k">Talk tip · Say what you see</b>“You’re carrying the towels. Soft towels!”</div><div class="t2"><b class="k">Safe helping</b>A grown-up stays close. Grown-ups handle knives, heat and glass. Bags stay light.</div></div>`;
}
function chores(ctx, blank, start) {
  const items = blank ? Array.from({ length: 12 }, () => null) : T.CHORES;
  const cells = '<div class="dc"><i></i></div>'.repeat(7);
  const rows = items.map(c => `<div class="chr r"><div class="ic">${c ? art(c[0]) : drawSpot()}</div><div class="lb">${c ? c[1] : `<span class="fl" ${fld('chore', { size: 11 })}></span>`}</div><div class="who2"><span class="fl" ${fld('who', { size: 10 })}></span></div>${cells}</div>`).join('');
  return hd({ eyebrow: `Section D · Ages 5–12 · ${start === 'mon' ? 'Monday' : 'Sunday'} start${blank ? ' · fillable' : ''}`, title: blank ? 'Our family jobs chart' : 'Family jobs chart', lede: 'Jobs are how we look after our home together. Write who does each one, then tick it off.', age: '512', prepT: 'Prep 0 min · print and go' })
    + `<div class="who">Week of <span class="fl" ${fld('week', { size: 12 })}></span></div>`
    + `<div class="ch"><div class="chr h"><div></div><div style="padding-left:.08in">Job</div><div>Who</div>${DAYS[start].map(d => `<div class="d">${d}</div>`).join('')}</div>${rows}</div>`
    + `<div class="tipbar"><div class="t1"><b class="k">Talk tip · Offer a choice</b>“Do you want to set the table or clear it tonight?”</div><div class="t2"><b class="k">Jobs and screens</b>Jobs are never a punishment, and screens keep the same spot whether the list is done or not.</div></div>`;
}

// ---------------------------------------------------------------- poster
function poster(ctx, blank) {
  const items = blank ? Array.from({ length: 8 }, () => null) : T.RULES;
  const cells = items.map((r, i) => `<div style="--tt:${TINTS[i % 5]}">${r ? art(r[0]) : drawSpot()}${r ? `<div class="nm">${r[1]}</div>` : `<span class="fl" ${fld('rule', { size: 14, multi: 1 })}></span>`}</div>`).join('');
  return `<div class="chips" style="justify-content:space-between"><span class="eyebrow">Section E · Whole family${blank ? ' · fillable' : ''}</span><span class="chips">${chip('all')}${prep('Prep 0 min · print and go')}</span></div>
  <div class="ptitle"><h1 class="h1">Our Family Play Rules</h1><p class="lede">${blank ? 'Write your own, together. Short and kind works best.' : 'Short, kind and the same for everyone, grown-ups too.'}</p></div>
  <div class="poster">${cells}</div>
  <div class="sign">Signed by our family <span class="fl" ${fld('signed', { size: 12 })}></span></div>`;
}

// ---------------------------------------------------------------- family plan (3 pages)
function plan1() {
  const col = (t, i) => `<div class="card" style="--cbg:${['var(--tS)', 'var(--tG)', 'var(--tP)'][i]}"><div class="h2">${t}</div><div class="q">First, our jobs:</div><div class="lines" style="height:.9in" ${fld('rh_jobs', { size: 10, multi: 1 })}></div><div class="q">Then, we play:</div><div class="lines" style="height:.9in" ${fld('rh_play', { size: 10, multi: 1 })}></div></div>`;
  return hd({ eyebrow: 'Section E · Whole family · page 1 of 3 · fillable', title: 'Our Family Play &amp; Screen Plan', lede: 'Fill this in together, on a calm day. There are no right answers, just what fits your family right now.', age: 'all', prepT: 'Prep 0 min' })
    + `<div class="card"><div class="qrow">This is the plan for the <span class="fl" ${fld('family', { size: 13 })}></span> family.</div><div class="qrow">Made on <span class="fl" ${fld('made_on', { size: 12 })}></span> by <span class="fl" style="flex:2" ${fld('made_by', { size: 12 })}></span></div></div>
  <div class="card" style="--cbg:var(--tT);flex:1"><div class="h2">Our favorite ways to play together</div><div class="lines" style="flex:1;min-height:1.2in" ${fld('fav', { size: 11, multi: 1 })}></div></div>
  <div><div class="h2" style="margin-bottom:.08in">Our play-first rhythm</div><div class="three">${['Morning', 'After school or nap', 'Evening'].map(col).join('')}</div></div>
  <div class="card" style="--cbg:var(--tK)"><div class="h2">Our screen spot</div><div class="qrow">Screens have a spot in our day: after <span class="fl" ${fld('spot_after', { size: 12 })}></span> for about <span class="fl" style="flex:.45" ${fld('spot_len', { size: 12 })}></span></div><p class="small" style="color:var(--ink)">It stays the same each day. It doesn’t grow or shrink with jobs or behavior, so it never becomes the prize.</p></div>`;
}
function plan2() {
  const cbs = ['At meals', 'In bedrooms at night', 'The hour before bed', 'Short car rides', 'When friends come to play', 'While we talk to each other'];
  return hd({ eyebrow: 'Section E · Whole family · page 2 of 3 · fillable', title: 'Where and when screens rest', lede: 'Pick a few screen-free times and places. Fewer rules, kept kindly, work better than many.', age: 'all' })
    + `<div class="card"><div class="h2">Screens rest…</div><div class="cbl">${cbs.map(c => `<label><span class="cb" ${fld('rest', { check: 1 })}></span>${c}</label>`).join('')}<label><span class="cb" ${fld('rest', { check: 1 })}></span>Other: <span class="fl" ${fld('rest_other', { size: 10 })}></span></label></div><p class="small" style="color:var(--ink)">A talker (a device a child uses to talk) never rests: it’s their voice, so it stays with them.</p></div>
  <div class="card" style="--cbg:var(--tP)"><div class="qrow">At night, our screens sleep in <span class="fl" ${fld('sleep_where', { size: 12 })}></span></div><p class="small" style="color:var(--ink)">One set charging spot makes bedtime easier for everyone, grown-ups included.</p></div>
  <div class="card" style="--cbg:var(--tG);flex:1"><div class="h2">Watching and playing together</div><p class="body">When you can, choose together, watch together, and talk about it after: “Who was your favorite? What would you do?”</p><div class="q">Shows, games or videos we enjoy together:</div><div class="lines" style="flex:1;min-height:.9in" ${fld('together_media', { size: 11, multi: 1 })}></div></div>
  <div class="card" style="--cbg:var(--tS)"><div class="h2">What the guidelines say</div>
    <ul class="b"><li><span class="ball"></span><span><b>Ages 1–4:</b> at least 180 minutes a day of active play, in any mix. No screen time under age 1; no more than 1 hour a day at ages 2–4 (WHO, 2019).</span></li>
    <li><span class="ball"></span><span><b>Ages 2–5:</b> about 1 hour a day of high-quality programs, watched together when you can (AAP, 2016).</span></li>
    <li><span class="ball"></span><span><b>For families:</b> choose screen-free times and places together, like meals, car rides and bedrooms, and make a family plan (AAP, 2016). For older children, there’s no single number; this plan helps you choose what fits.</span></li></ul>
    <p class="cite">Sources: World Health Organization, Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age (2019). American Academy of Pediatrics, “Media and Young Minds,” Pediatrics 2016;138(5). Every family is different; your pediatrician is a good person to ask about your child.</p></div>`;
}
function plan3() {
  return hd({ eyebrow: 'Section E · Whole family · page 3 of 3 · fillable', title: 'When plans change, and our promises', lede: 'Sick days, travel and long waits happen. Some days need more screens, and that’s okay. Tomorrow, we go back to our rhythm.', age: 'all' })
    + `<div class="card" style="--cbg:var(--tK);flex:1"><div class="q">On busy, sick or travel days, our plan is:</div><div class="lines" style="flex:1;min-height:.9in" ${fld('busy', { size: 11, multi: 1 })}></div></div>
  <div class="steps" style="flex:1.3"><div class="card" style="--cbg:var(--tT)"><div class="h2">Grown-up promises</div><p class="small" style="color:var(--ink)">For example: “I’ll give a 5-minute heads-up.” “I’ll put my screen away at meals too.”</p><div class="lines" style="flex:1;min-height:1.2in" ${fld('promise_g', { size: 11, multi: 1 })}></div></div>
  <div class="card" style="--cbg:var(--tG)"><div class="h2">Kid promises</div><p class="small" style="color:var(--ink)">For example: “When the card says ‘Screens go to sleep’, I’ll find a stopping place.”</p><div class="lines" style="flex:1;min-height:1.2in" ${fld('promise_k', { size: 11, multi: 1 })}></div></div></div>
  <div class="card" style="--cbg:var(--tS)"><div class="qrow">We’ll look at this plan again on <span class="fl" ${fld('review_on', { size: 12 })}></span></div><p class="small" style="color:var(--ink)">Children grow fast. A plan that fit at 4 will need a new look at 6, and again at 9.</p></div>
  <div><div class="h2" style="margin-bottom:.08in">Everyone signs (or draws themselves)</div><div class="sig">${Array.from({ length: 6 }, () => `<div ${fld('sign', { size: 14 })}><span>Sign or draw here</span></div>`).join('')}</div></div>`;
}

// ---------------------------------------------------------------- tracker + certificate
function tracker(ctx, blank, P) {
  const cols = ['var(--tomato)', 'var(--sky)', 'var(--grass)', 'var(--plum)', 'var(--tomato)', 'var(--sky)'];
  const cells = T.DAYS30.map((d, i) => `<div style="--tn:${cols[Math.floor(i / 5)]}"><span class="dn">${i + 1}</span>${blank ? drawSpot() + `<span class="fl" ${fld('day', { size: 9, multi: 1, align: 1 })}></span>` : art(d[0]) + `<div class="nm">${d[1]}</div>`}</div>`).join('');
  return hd({ eyebrow: `Section E · Whole family${blank ? ' · fillable' : ''}`, title: '30 Days of Play First', lede: blank ? 'Write your own 30 plays, then color a tile each day you play first.' : `Color a tile each day you play first. Every idea is free, with nothing to buy. Skipped a day? Pick up tomorrow. Each play’s age, easier and harder ways and tired-day version: pages ${P.plays1}–${P.plays3}.`, age: 'all', prepT: 'Prep 0 min · print and go' })
    + `<div class="tr">${cells}</div>`
    + `<div class="tipbar"><div class="t1"><b class="k">Talk tip · Follow their lead</b>Let your child pick the order. Their plan, their pride.</div><div class="t2"><b class="k">Safety</b>A grown-up stays close for every play. Bubbles, water and cooking: within arm’s reach.</div></div>`;
}
const MI = {
  needs: '<svg viewBox="0 0 12 12"><path d="M2 5h8l-1.1 6H3.1z" fill="currentColor"/><path d="M4.2 5V3.6a1.8 1.8 0 0 1 3.6 0V5" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
  prep: '<svg viewBox="0 0 12 12"><circle cx="6" cy="6" r="4.8" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M6 3.4V6l1.8 1.2" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
  mess: '<svg viewBox="0 0 12 12"><path d="M6 1.2C6 1.2 2.4 5.4 2.4 7.6a3.6 3.6 0 0 0 7.2 0C9.6 5.4 6 1.2 6 1.2z" fill="currentColor"/></svg>',
  play: '<svg viewBox="0 0 12 12"><circle cx="6" cy="6" r="4.8" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M4.9 3.8L8.2 6 4.9 8.2z" fill="currentColor"/></svg>',
};
const ageMo = m => `${m} months`;
function playGuide(ctx, part, P) {
  const cols = ['var(--tomato)', 'var(--sky)', 'var(--grass)', 'var(--plum)', 'var(--tomato)', 'var(--sky)'];
  const rows = T.PLAYS30.slice(part * 10, part * 10 + 10).map((g, j) => {
    const i = part * 10 + j; const d = T.DAYS30[i];
    return `<div class="pgr r"><div class="pn"><div class="pt"><span class="dn" style="--tn:${cols[Math.floor(i / 5)]}">${i + 1}</span><span class="kid">${d[1]}</span></div><div class="from">From ${ageMo(g.from)}</div><div class="meta"><span>${MI.prep}Prep ${g.prep}</span><span>${MI.mess}Mess ${g.mess}</span><span>${MI.play}Play ~${g.play}</span></div></div>
    <div class="cl"><span class="nd">${MI.needs}${g.needs}</span>${g.safe ? `<span class="sf"><b>Safety:</b> ${g.safe}</span>` : ''}</div><div class="cl">${g.easy}</div><div class="cl">${g.hard}</div><div class="cl">${g.two}</div><div class="cl say">${g.say}</div></div>`;
  }).join('');
  const head = `<div class="pgr h"><div>Play · starting age</div><div>You need</div><div>Make it easier</div><div>Make it harder</div><div>Tired grown-up: 2 minutes</div><div>Say</div></div>`;
  return hd({ eyebrow: `Section E · 30 Days of Play First · play guide ${part + 1} of 3`, title: part ? 'The 30 plays, continued' : 'The 30 plays, made easy', lede: part ? `Plays ${part * 10 + 1}–${part * 10 + 10}. Use the age as a starting point; your child can try any play with you close by.` : `Every play here has a starting age, what you need, and an easier and a harder way. Tired? The 2-minute version still counts. Times are in minutes and only a guess.`, age: 'all', prepT: 'For grown-ups' })
    + `<div class="pg30">${head}${rows}</div>`
    + `<div class="tipbar" style="grid-template-columns:1fr"><div class="t2"><b class="k">Safety for every play</b>A grown-up stays close. Under 3: nothing smaller than a toilet-paper tube, and no whole grapes, nuts, popcorn or hard candy. No balloons for under-8s. No cords or long scarves around necks. Water and bubbles: always within arm’s reach.</div></div>`;
}
function certificate(ctx) {
  const scene = `<svg class="art" viewBox="0 -110 420 280" style="width:4.6in;height:3.07in">${B.adult({ ...B.ADULTS.G1, x: 110, y: 160 - 81 * .95, s: .95, aL: 150, aR: -150, face: 'laugh' })}${stand('A', 200, 160, 1.15, { face: 'laugh', aL: 150, aR: -150 })}${stand('E', 280, 160, .95, { face: 'joy', aL: 140, aR: -140 })}${B.adult({ ...B.ADULTS.G3, x: 350, y: 160 - 81 * .95, s: .95, aL: 20, aR: -150, face: 'smile' })}${star(40, 40, 1.2, C.sun)}${star(390, 30, 1, C.sky)}${heart(245, 24, .35)}</svg>`;
  return `<div class="cert"><div style="display:flex;flex-direction:column;align-items:center;gap:.1in">${ctx.low ? LOGO.lockK.replace('<svg', '<svg style="height:.5in;width:auto"') : LOGO.lock.replace('<svg', '<svg style="height:.5in;width:auto"')}<span class="eyebrow">Certificate</span></div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:.14in;width:100%"><h1 class="h1">Play-First Family</h1><p class="lede" style="font-size:13pt">This is to celebrate</p><span class="nmf" ${fld('cert_name', { size: 22, align: 1 })}></span><p class="lede" style="font-size:13pt">for <b>30 days of playing first</b>, together.</p></div>
  ${scene}
  <div style="display:flex;gap:.3in;width:90%"><div class="sign" style="flex:1">Date <span class="fl" ${fld('cert_date', { size: 12 })}></span></div><div class="sign" style="flex:1">Our favorite play <span class="fl" ${fld('cert_fav', { size: 12 })}></span></div></div>
  <p class="small">Snap a photo for the fridge, or for the grandparents.</p></div>`;
}

// ---------------------------------------------------------------- front matter
function cover(ctx) {
  const floor = 300;
  const scene = `<svg class="art" viewBox="0 0 620 330" style="width:100%;height:100%">
    <rect x="0" y="0" width="620" height="330" rx="26" fill="${ctx.low ? '#fff' : C.tSun}"/>
    <rect x="30" y="${floor}" width="560" height="10" rx="5" fill="${C.grass}"/>
    <g>${R(468, 150, 120, 12, 6, '#C08457')}${R(476, 162, 8, 40, 4, '#C08457')}${R(572, 162, 8, 40, 4, '#C08457')}${tablet(528, 112, .62)}${B.use('moon', 'translate(588,60) scale(.34)')}</g>
    ${B.adult({ ...B.ADULTS.G5, x: 150, y: floor - 14 * 1.35, s: 1.35, legs: 'cross', aL: 30, aR: -75, face: 'laugh' })}
    ${stand('A', 285, floor, 1.55, { face: 'laugh', aL: 150, aR: -160 })}
    ${stand('D', 390, floor, 1.25, { face: 'joy', flip: true, aL: 60, aR: -20 })}
    ${U('block-1', `translate(230,${floor - 22}) scale(.62)`)}${U('block-3', `translate(262,${floor - 22}) scale(.62)`)}${U('block-2', `translate(246,${floor - 54}) scale(.62)`)}
    ${U('ball', `translate(452,${floor - 26}) scale(.55)`)}${star(70, 60, 1.1, C.sun)}${star(420, 50, .8, C.tomato)}${heart(330, 70, .45)}
  </svg>`;
  return `<div style="display:flex;justify-content:space-between;align-items:center">${(ctx.low ? LOGO.lockK : LOGO.lock).replace('<svg', '<svg style="height:.62in;width:auto"')}<span class="chips">${chip('25')}${ctx.g0 ? '' : chip('512')}</span></div>
  <div style="display:flex;flex-direction:column;gap:.1in;margin-top:.25in"><span class="eyebrow" style="color:var(--ink)">A printable kit for the whole family · ages ${ctx.g0 ? '2–5' : '2–12'}</span>
  <h1 class="h1" style="font-size:52pt;line-height:.95">Play-First<br>Family Kit</h1>
  <p class="lede" style="font-size:14pt;max-width:6in"><b>Play First, Then Screens.</b> Jobs, then play and time together, then screens at their usual spot. A calm shape for the day, with nothing taken away.</p></div>
  <div style="flex:1;min-height:0;margin:.1in 0">${scene}</div>
  <div class="toc" style="grid-template-columns:repeat(5,1fr);gap:.08in">${[['playFirst', ctx.g0 ? '9 printable tools' : '10 printable tools'], ['boardGame', '24 together tokens'], ['setTable', ctx.g0 ? 'Little helping jobs' : 'Helping jobs + chore chart'], ['talkDay', '3-page family plan'], ['star30', '30-day tracker']].map(([a, t]) => `<div style="grid-template-columns:1fr;text-align:center;padding:.08in"><div style="display:flex;justify-content:center">${a === 'star30' ? `<svg class="art" viewBox="0 0 120 100" style="width:.78in;height:.65in"><circle class="disc" cx="60" cy="52" r="44"/><text x="60" y="66" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="${C.tomato}">30</text></svg>` : art(a)}</div><div class="nm" style="font-size:8.6pt">${t}</div></div>`).join('')}</div>
  <p class="small" style="text-align:center">Fillable PDF · pre-filled and blank · ${ctx.low ? 'ink-saving line art' : '4 colorways'} · Monday and Sunday starts · US Letter and A4 · ${ctx.low ? 'Low-ink edition (4 colorways in the color file)' : 'Color edition'}</p>`;
}
function inside(ctx, P) {
  const tiles = [
    ['playFirst', 'Play First, Then Screens checklists', `Ages 2–5 pictures${ctx.g0 ? '' : ', ages 5–12,'} and fillable blanks · ${ctx.low ? 'Mon + Sun starts' : '4 colorways × Mon + Sun'}`, P.cl25],
    ['blocks', 'The Play-First Board', 'First, then, later on one page · ages 2–5', P.board],
    ['feedPet', 'Little helping jobs', '12 picture jobs, pre-filled and blank · ages 2–5', P.help],
    ['setTableBig', 'Family jobs chart', '12 chores with a “who” column · ages 5–12', P.chores],
    ['boardGame', 'Together tokens', '12 ready-made + 12 make-your-own', P.tokens],
    ['alarm', 'Screen-spot cards', '5 more minutes, screens go to sleep, what we do next', P.cards],
    ['familyMeal', 'Our Family Play Rules poster', 'Pre-filled and fillable blank', P.poster],
    ['talkDay', 'Our Family Play & Screen Plan', '3 warm fill-in pages to make together', P.plan],
    ['natureWalk', '30 Days of Play First', '30 no-buy plays with a 3-page guide, plus a blank tracker', P.tracker],
    ['dance', 'Play-First Family certificate', 'A finished-it page to celebrate', P.cert],
  ].filter(t => !(ctx.g0 && t[0] === 'setTableBig')); // the Ages 2–5 edition holds back the 5–12 jobs chart (G1)
  return hd({ eyebrow: 'What’s inside', title: ctx.g0 ? '9 tools, one calm rhythm' : '10 tools, one calm rhythm', lede: 'Organized by age, so you only print what fits your family. Start with the grown-up guide on the next page.', age: 'grown', prepT: 'About 20 min to prep, then reusable' })
    + `<div class="toc" style="flex:1;grid-auto-rows:1fr">${tiles.map(([a, t, s, p]) => `<div>${art(a)}<div><div class="nm">${t}</div><div class="small" style="color:var(--ink)">${s}</div><div class="pg">Page ${p}</div></div></div>`).join('')}</div>
  <div class="steps" style="grid-template-columns:repeat(${ctx.g0 ? 3 : 4},1fr)">${[['Section A', 'Grown-up guide, printing and safety', 'pages 3–5'], ['Sections B–C', 'Checklists and ages 2–5 tools', `pages ${P.cl25}–${P.helpEnd}`], ...(ctx.g0 ? [] : [['Section D', 'Ages 5–12 jobs chart', `pages ${P.chores}–${P.choresEnd}`]]), [ctx.g0 ? 'Section D' : 'Section E', 'Whole-family tools', `pages ${P.tokens}–${P.cert}`]].map(([a, b, c]) => `<div class="step" style="grid-template-columns:1fr"><div><div class="eyebrow">${a}</div><div style="font-weight:800;font-size:9pt;line-height:1.25;margin:.03in 0">${b}</div><div class="small">${c}</div></div></div>`).join('')}</div>
  <div class="card" style="--cbg:var(--tS)"><div class="body"><b>Fillable pages:</b> pages marked “fillable” have type-in boxes that work in free Adobe Acrobat Reader on a computer or phone. You can type names, dates, jobs, rules, token ideas and plan answers. Colors and pictures can’t be changed. Every fillable page also prints blank for writing by hand.</div></div>
  <p class="small">License: personal and family use in your own home. Please don’t share or resell the files. Thank you for supporting a small, independent studio.</p>`;
}
function guide1(ctx) {
  return hd({ eyebrow: 'Section A · Grown-up guide · 1 of 2', title: 'Start here, grown-ups', lede: 'This kit gives your day a simple shape: <b>jobs first, then play and time together, then screens at their usual spot.</b> Nothing to take away, only more play to add.', age: 'grown', prepT: 'Setup 2 min' })
    + `<div class="rhythm">${[['tidyToys', '1 · Jobs first', 'var(--tT)'], ['familyGame', '2 · Then play and time together', 'var(--tG)'], ['screenSpot', '3 · Then screens, at their spot', 'var(--tK)']].map(([a, t, c], i) => `${i ? '<div class="ar"><svg viewBox="0 0 20 30" width=".2in" height=".3in"><path d="M4 3L16 15 4 27" stroke="var(--ink)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' : ''}<div class="rs" style="background:${c}">${art(a)}<div class="kid">${t}</div></div>`).join('')}</div>
  <div><div class="h2" style="margin-bottom:.08in">Set up in 2 minutes</div><div class="steps">${[
      ['Pick one checklist per child.', ctx.g0 ? 'Pictures for ages 2–5, or the fillable blank. Choose a colorway they like.' : 'Pictures for ages 2–5, words for ages 5–12, or the fillable blank. Choose a colorway they like.'],
      ['Write in your screen spot.', 'For example, “after dinner”. Keep it the same every day, and the same length.'],
      ['Cut the together tokens.', 'Keep them in an envelope. A grown-up keeps the pieces.'],
      ['Put it at eye level.', 'Walk through it together once: “First jobs, then we play, then screens.”'],
    ].map(([a, b], i) => `<div class="step"><b class="n">${i + 1}</b><div class="body"><b>${a}</b> ${b}</div></div>`).join('')}</div></div>
  <div class="card" style="--cbg:var(--tS)"><div class="h2">Why play first, in plain words</div><p class="body">Children practice talking, taking turns and solving problems through back-and-forth: you say something, they answer, you answer back. Jobs, play and meals are full of these turns. Putting them first simply makes more room for them in the day. For ages 1–4, the World Health Organization suggests at least 180 minutes of active play a day (WHO, 2019).</p></div>
  <div><div class="h2" style="margin-bottom:.08in">Three talk lines for any page</div><div class="talk">${[
      ['var(--tT)', 'Pause and wait.', 'Count to five in your head. Give them a turn to talk, point or sign.'],
      ['var(--tK)', 'Say what you see.', '“You put out the spoons. One, two, three spoons!”'],
      ['var(--tG)', 'Repeat and add one word.', '“Ball.” “Big ball!” “Big red ball!”'],
    ].map(([c, a, b]) => `<div style="--tt:${c}"><div class="kid" style="font-size:13pt">${a}</div><div class="body">${b}</div></div>`).join('')}</div></div>
  <div class="card"><p class="body"><b>Talk, sign, sing and read in the language you know best. Every language counts.</b> A sign, a point or a tap counts as communicating, too. Write your own words, in any language, on the blank pages. You don’t need to be chatty: reading a talk line word for word, or playing quietly side by side, counts too.</p></div>`;
}
function guide2(ctx) {
  return hd({ eyebrow: 'Section A · Grown-up guide · 2 of 2', title: 'How it works at each age', lede: 'Use what fits: ages are a starting point, and pictures work at any age. Most children love 2 or 3 of these tools; that’s normal.', age: 'grown' })
    + `<div class="agecards">${[
      ['var(--tG)', '25', 'Point and say each picture on the checklist. Use the Play-First Board to show first, then, later. Two or three helping jobs a day is plenty.'],
      ['var(--tK)', '58', 'They tick their own boxes on the ages 5–12 checklist and pick the together token. Add 3 or 4 jobs from the family jobs chart.'],
      ['var(--tP)', '812', 'Fill in the blank checklist together and let them write their own jobs and play. Make the Family Plan together; let them lead one part.'],
    ].filter(([, a]) => !ctx.g0 || a === '25').concat(ctx.g0 ? [['var(--tK)', 'all', 'Big brothers and sisters can join in: the together tokens, the Family Plan and the rules poster work at any age. Pictures work at any age too.']] : []).map(([c, a, t]) => `<div style="background:${c}">${chip(a)}<p class="body">${t}</p></div>`).join('')}</div>
  <div class="card" style="--cbg:var(--tT)"><div class="h2">How screens fit in this kit</div><ul class="b">
    <li><span class="ball"></span><span>Screens have a <b>fixed spot</b> in the day, the same time and about the same length each day.</span></li>
    <li><span class="ball"></span><span>The spot <b>never grows or shrinks</b> with jobs or behavior. That keeps screens from becoming the prize, so jobs and play can simply be part of the day.</span></li>
    <li><span class="ball"></span><span><b>Tokens are for play and time together</b> (a story, a game, a walk), never screen minutes. Time together is never taken away as a punishment.</span></li>
    <li><span class="ball"></span><span>A <b>talker</b> (a device a child uses to talk) is their voice, not screen time. It stays with them at meals, in the car and at night.</span></li>
    <li><span class="ball"></span><span><b>Video calls</b> with people you love are talk time, not screen time. Wave, show and tell.</span></li>
    <li><span class="ball"></span><span>End gently with the screen-spot cards: <b>5 more minutes</b>, then <b>Screens go to sleep</b>, then <b>What we do next</b>.</span></li></ul></div>
  <div class="rhythm">${[['alarm', '5 more minutes', 'var(--tS)'], ['devicesSleep', 'Screens go to sleep', 'var(--tP)'], ['kickBall', 'What we do next', 'var(--tG)']].map(([a, t, c], i) => `${i ? '<div class="ar"><svg viewBox="0 0 20 30" width=".2in" height=".3in"><path d="M4 3L16 15 4 27" stroke="var(--ink)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' : ''}<div class="rs" style="background:${c}">${art(a)}<div class="kid">${t}</div></div>`).join('')}</div>
  <div class="steps"><div class="card"><div class="h2">When stopping is hard</div><p class="body">Stay close and name it: “It’s hard to stop. You wish it was longer.” Then show <b>What we do next</b>. Big feelings at the end are normal, and the spot comes back tomorrow.</p></div>
  <div class="card"><div class="h2">If interest fades</div><p class="body">Move the chart, swap in a fresh token, or fill in a blank checklist for a grown-up; kids love ticking yours. Tired day? Just say the rhythm out loud: “Jobs, play, then screens.” That counts.</p></div></div>
  <div class="card" style="--cbg:var(--tG)"><p class="body"><b>Every play works from a chair, a bed or a wheelchair.</b> Bring it to a table or tray and let your child do the fetching. Any sound play can be a see-it or feel-it play: a light flick for “stop,” a hand on the pot for the beat.</p></div>
  ${T.FOUNDER_NOTE ? `<div class="card"><div class="h2">A note from us</div><p class="body">${T.FOUNDER_NOTE}</p></div>` : ''}`;
}
function tips(ctx) {
  return hd({ eyebrow: 'Section A · Printing, laminating, hook-and-loop and safety', title: 'Print it, make it last', lede: 'About 20 minutes to print and cut, then reusable. The checklists need no cutting: start today.', age: 'grown', prepT: 'Prep 20 min total' })
    + `<div class="steps">
  <div class="card" style="--cbg:var(--tK)"><div class="h2">Printing</div><ul class="b">
    <li><span class="ball"></span><span>Print at <b>100% / Actual size</b>. Don’t use “fit to page” for tokens and cards.</span></li>
    <li><span class="ball"></span><span><b>US Letter</b> file for the US and Canada; <b>A4</b> for everywhere else.</span></li>
    <li><span class="ball"></span><span>Charts: regular paper. Tokens, cards and the board: cardstock (65–110 lb / 176–300 gsm).</span></li>
    <li><span class="ball"></span><span>The <b>low-ink file</b> has white backgrounds and line art children can color.</span></li></ul></div>
  <div class="card" style="--cbg:var(--tG)"><div class="h2">Make it last</div><ul class="b">
    <li><span class="ball"></span><span>Laminate the charts and use a dry-erase marker, week after week.</span></li>
    <li><span class="ball"></span><span><b>No laminator?</b> Slide charts into clear page protectors. Dry-erase works on those too.</span></li>
    <li><span class="ball"></span><span>Laminate tokens before cutting, then cut on the dashed lines, leaving a thin sealed edge.</span></li></ul></div>
  <div class="card" style="--cbg:var(--tP)"><div class="h2">Hook-and-loop dots: ages 3 and up</div><ul class="b">
    <li><span class="ball"></span><span>Hook-and-loop dots are small enough to be a choking risk for under-3s.</span></li>
    <li><span class="ball"></span><span><b>Under 3:</b> no dots. Lay tokens on top of the board, or slip the board into a page protector and tuck the token inside.</span></li>
    <li><span class="ball"></span><span><b>Check dots before each play; remove any that lift.</b></span></li></ul></div>
  <div class="card" style="--cbg:var(--tS)"><div class="h2">Shopping list (whole kit, printed once)</div><ul class="b">
    <li><span class="ball"></span><span>Regular paper: about 10 sheets (the charts you pick)</span></li>
    <li><span class="ball"></span><span>Cardstock: 4 sheets (2 token sheets, cards, board)</span></li>
    <li><span class="ball"></span><span>6 laminating pouches, or 6 page protectors</span></li>
    <li><span class="ball"></span><span>1 dry-erase marker · 1 envelope for tokens</span></li>
    <li><span class="ball"></span><span>Optional, ages 3+: 12 pairs of hook-and-loop dots</span></li></ul></div></div>
  <div class="card" style="--cbg:var(--tT)"><div class="h2">Safety notes</div><ul class="b">
    <li><span class="ball"></span><span><b>Grown-up keeps the pieces.</b> Every cut piece is ${TOK} or larger, bigger than the toilet-paper-tube test for under-3s. Print at 100% so they stay that size, and store them out of reach.</span></li>
    <li><span class="ball"></span><span>A grown-up stays close for every play. Water, bubbles and cooking: always within arm’s reach. Grown-ups handle knives, heat and glass.</span></li>
    <li><span class="ball"></span><span>Every play follows our published safety rules.</span></li></ul></div>
  <div class="card" style="--cbg:#fff;border:1.5px solid var(--line)"><div class="sizecheck"><div class="sq"><span class="kid" style="font-size:11pt;text-align:center">Actual size<br>${TOK}</span><div class="cir">Small-parts size<br>about 1.25 in</div></div><div><div class="h2">Check your print</div><p class="body">After printing the tokens, measure this square. It should be <b>${TOK}</b> on each side. If it’s smaller, your printer shrank the page: print again at 100% / Actual size.</p><p class="body" style="margin-top:.06in">The circle shows the small-parts size for under-3s. Every piece in this kit is much bigger.</p></div></div></div>`;
}
function more(ctx, qr) {
  const items = ctx.g0 ? [
    ['wakeUp', '181 Visual Routine Cards', 'Ages 0–5', 'Picture cards for mornings, meals, bath and bedtime.'],
    ['fort', '76 “I’m Bored” Play Cards', 'Ages 1–5', 'Pick-a-card play ideas, each with a talk line.'],
    ['blocks', 'Toddler Busy Book', 'Ages 1–5', '74 paper-and-play activities, sorted by age, with a talk line on every page.'],
    ['readTogether', '52 Play & Talk Cards', 'Ages 0–5', 'One simple play and one talk tip on every card.'],
  ] : [
    ['wakeUp', '200+ Visual Routine Cards', 'Ages 0–12', 'Picture cards for mornings, meals, bath and bedtime.'],
    ['fort', '150 “I’m Bored” Play Cards', 'Ages 1–12', 'Pick-a-card play ideas, each with a talk prompt.'],
    ['talkDay', '30 Days of Back-and-Forth', 'Ages 1–12', 'A written 30-day plan by email: one short lesson and one easy play a day, plus a workbook.'],
    ['walk', 'First Phone Agreement Kit', 'Ages 9–12', 'A warm agreement you write together, phone-free zones and 30 phone-free afternoons.'],
  ];
  const tiles = `<div class="toc" style="grid-template-columns:1fr 1fr;gap:.12in;flex:1;grid-auto-rows:1fr">${items.map(([a, t, g, s]) => `<div style="grid-template-columns:1.5in 1fr;padding:.16in">${art(a).replace('class="art ', 'style="width:1.5in;height:1.25in" class="art ')}<div><div class="nm" style="font-size:12.5pt">${t}</div><div class="eyebrow" style="margin:.04in 0">${g}</div><div class="body">${s}</div></div></div>`).join('')}</div>`;
  const tail = ctx.store
    ? `<div class="card" style="--cbg:var(--tS);flex-direction:row;gap:.3in;align-items:center;padding:.3in"><div style="width:2.3in;flex:0 0 auto;background:#fff;border-radius:.16in;padding:.16in">${qr.replace('<svg', '<svg style="width:100%;height:auto;display:block"')}</div>
      <div style="display:flex;flex-direction:column;gap:.1in"><span class="eyebrow">Your free bonus</span><div class="h2" style="font-size:17pt">Scan for free companion printables</div>
      <ul class="b"><li><span class="ball"></span><span>A summer and holiday Play First, Then Screens checklist</span></li><li><span class="ball"></span><span>12 extra together tokens for rainy days</span></li><li><span class="ball"></span><span>One short play idea a month, matched to your child’s age</span></li></ul>
      <div style="font-weight:800;font-size:10.5pt">${T.BONUS}</div>
      <p class="small">We ask for an email and, if you like, your child’s birth month and year so ideas fit their age. Never names. Unsubscribe anytime. Need your files again? Your link stays in your order email; help is at playbeforepixels.com/help.</p></div></div>`
    : `<div class="card" style="--cbg:var(--tS);flex-direction:row;gap:.3in;align-items:center;padding:.3in">${art('familyGame', '', false).replace('class="art ', 'style="width:2.4in;height:2in;flex:0 0 auto" class="art ')}
      <div style="display:flex;flex-direction:column;gap:.1in"><div class="h2" style="font-size:17pt">Thank you for playing first</div><p class="body">Your files stay on your Etsy Purchases page, ready to download again anytime. Open them in a web browser, not the app.</p><p class="body">Tried the kit? Honest reviews help other parents decide.</p></div></div>`;
  return hd({ eyebrow: 'More from Play Before Pixels', title: 'Next for your family', lede: ctx.store ? 'Same calm design and the same “talk while you play” idea. Find them all at playbeforepixels.com.' : 'Same calm design and the same “talk while you play” idea. Find them all in our shop, Play Before Pixels.', age: 'all' })
    + tiles + tail;
}
// ---------------------------------------------------------------- assemble
const CANVA = /^(clBlank.*|helpB|helpEnd|choresB|choresEnd|posterB|tokensB|trackerB|board|plan|plan2|plan3)$/;
function buildDoc(ctx, qr) {
  const P = {}; const pages = [];
  const add = (key, sec, fn, toc) => { pages.push({ key, sec, fn, toc }); };
  add('cover', '', c => cover(c), 'Cover');
  add('inside', '', (c, P) => inside(c, P), 'What’s inside');
  add('guide1', 'A', c => guide1(c), 'Grown-up guide');
  add('guide2', 'A', c => guide2(c));
  add('tips', 'A', c => tips(c), 'Printing, laminating, hook-and-loop and safety');
  const cws = ctx.low ? [null] : COLORWAYS.map(c => c.id);
  [['little', 'cl25', 'Checklist, ages 2–5 (pre-filled)'], ['big', 'cl512', 'Checklist, ages 5–12 (pre-filled)'], ['blank', 'clBlank', 'Checklist, make-it-yours (fillable)']].filter(([k]) => !(ctx.g0 && k === 'big')).forEach(([kind, key, label]) => {
    let first = true;
    cws.forEach(cw => ['mon', 'sun'].forEach(st => { add(first ? key : key + cw + st, 'B', c => checklist(c, kind, cw || 'tomato', st), first ? label : null, cw || 'tomato'); pages[pages.length - 1].cw = cw || 'tomato'; first = false; }));
  });
  add('board', 'C', (c, P) => board(c, P.tokens), 'Play-First Board');
  add('help', 'C', c => helping(c, false, 'mon'), 'Little helping jobs, ages 2–5');
  add('helpSun', 'C', c => helping(c, false, 'sun'));
  add('helpB', 'C', c => helping(c, true, 'mon'), 'Helping jobs (fillable)');
  add('helpEnd', 'C', c => helping(c, true, 'sun'));
  if (!ctx.g0) { // 5–12 jobs chart: held back from the Ages 2–5 edition until counsel's G1 answer
    add('chores', 'D', c => chores(c, false, 'mon'), 'Family jobs chart, ages 5–12');
    add('choresSun', 'D', c => chores(c, false, 'sun'));
    add('choresB', 'D', c => chores(c, true, 'mon'), 'Family jobs chart (fillable)');
    add('choresEnd', 'D', c => chores(c, true, 'sun'));
  }
  add('tokens', 'E', (c, P) => tokens(c, false, P.board), 'Together tokens');
  add('tokensB', 'E', (c, P) => tokens(c, true, P.board), 'Make-your-own tokens (fillable)');
  add('cards', 'E', c => spotCards(c), 'Screen-spot cards');
  add('poster', 'E', c => poster(c, false), 'Family Play Rules poster');
  add('posterB', 'E', c => poster(c, true), 'Family Play Rules (fillable)');
  add('plan', 'E', () => plan1(), 'Our Family Play & Screen Plan');
  add('plan2', 'E', () => plan2());
  add('plan3', 'E', () => plan3());
  add('tracker', 'E', (c, P) => tracker(c, false, P), '30 Days of Play First');
  add('plays1', 'E', (c, P) => playGuide(c, 0, P), 'The 30 plays: ages, easier, harder, 2-minute versions');
  add('plays2', 'E', (c, P) => playGuide(c, 1, P));
  add('plays3', 'E', (c, P) => playGuide(c, 2, P));
  add('trackerB', 'E', (c, P) => tracker(c, true, P), '30-day tracker (fillable)');
  add('cert', 'E', c => certificate(c), 'Certificate');
  add('more', '', c => more(c, qr), ctx.store ? 'More from Play Before Pixels + free bonus' : 'More from Play Before Pixels');
  pages.forEach((p, i) => { P[p.key] = i + 1; });
  const toc = [];
  const html = pages.map((p, i) => {
    if (p.toc) toc.push([p.toc, i + 1]);
    let body = p.fn(ctx, P);
    if (ctx.g0) body = body.replace(/Section E ·/g, 'Section D ·').replace('After school or nap', 'After nap');
    return `<section class="page ${p.cw ? 'cw-' + p.cw : ''}${['tokens', 'tokensB', 'cards'].includes(p.key) ? ' tight' : ''}${CANVA.test(p.key) ? ' canva' : ''}" data-key="${p.key}">${body}${footer(ctx, i + 1)}</section>`;
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
function startHere(ctx, qr) {
  const pre = ctx.g0 ? 'play-first-family-kit-ages-2-5' : 'play-first-family-kit';
  const files = ctx.store
    ? [[`${pre}.pdf`, 'Full color, US Letter'], [`${pre}-a4.pdf`, 'Full color, A4'], [`${pre}-low-ink.pdf`, 'White backgrounds, line art to color, US Letter'], [`${pre}-low-ink-a4.pdf`, 'Low-ink, A4'], ...(ctx.g0 ? [] : [['Canva-ready PNGs', 'Blank checklists, charts and plan pages (US Letter and A4 sizes) to decorate in Canva or any photo app']])]
    : [['2-Color-US-Letter.pdf', 'Full color, US Letter'], ['3-Color-A4.pdf', 'Full color, A4'], ['4-Low-Ink-US-Letter.pdf', 'White backgrounds, line art to color, US Letter'], ['5-Low-Ink-A4.pdf', 'Low-ink, A4']];
  const body = `<section class="page"><div style="display:flex;justify-content:space-between;align-items:center">${LOGO.lock.replace('<svg', '<svg style="height:.5in;width:auto"')}<span class="chips">${chip('25')}${ctx.g0 ? '' : chip('512')}</span></div>
  ${hd({ eyebrow: 'File 1 · Start here', title: ctx.g0 ? 'Play-First Family Kit · Ages 2–5' : 'Play-First Family Kit', lede: 'Thank you! Here’s what each file holds and how to print and fill it in. About 20 minutes to prep, then reusable.', age: '', prepT: '' })}
  <div class="card" style="--cbg:var(--tS)"><div class="h2">Your files</div><ul class="b">${files.map(([f, d]) => `<li><span class="ball"></span><span><b>${f}</b> · ${d}</span></li>`).join('')}</ul><p class="small" style="color:var(--ink)">Pick one file for your paper size. Color and low-ink files hold the same tools; the color file adds 4 colorways of each checklist.</p></div>
  <div class="steps"><div class="card" style="--cbg:var(--tK)"><div class="h2">Printing</div><ul class="b"><li><span class="ball"></span><span>Print at <b>100% / Actual size</b>.</span></li><li><span class="ball"></span><span>Print only the pages you need. Page 2 of each file is a contents list.</span></li><li><span class="ball"></span><span>Cardstock for tokens, cards and the board.</span></li></ul></div>
  <div class="card" style="--cbg:var(--tG)"><div class="h2">Filling in</div><ul class="b"><li><span class="ball"></span><span>Open the PDF in free <b>Adobe Acrobat Reader</b> (computer or phone) and tap a line to type.</span></li><li><span class="ball"></span><span>You can type names, dates, jobs, rules, token ideas and plan answers. Colors and pictures can’t be changed.</span></li><li><span class="ball"></span><span>Save, then print. Or print blank and write by hand.</span></li></ul></div></div>
  <div class="card" style="--cbg:var(--tT)"><div class="h2">Downloading: use a browser, not the app</div><p class="body">${ctx.store ? 'Open your download link from the order email in a web browser. On a phone, save each PDF to Files, then open it in Adobe Acrobat Reader.' : 'Open your Etsy Purchases page in a web browser (not the Etsy app) and download each file. On a phone, save each PDF to Files, then open it in Adobe Acrobat Reader. Your files stay on your Purchases page to download again anytime.'}</p></div>
  ${ctx.store ? `<div class="card" style="flex-direction:row;align-items:center;gap:.2in"><div style="width:1.3in;flex:0 0 auto">${qr.replace('<svg', '<svg style="width:100%;height:auto;display:block"')}</div><div><div class="h2">Free bonus and re-downloads</div><p class="body">Scan for your free companion printables: <b>${T.BONUS}</b>. Lost a file? Your link stays in your order email; help is at <b>playbeforepixels.com/help</b>.</p></div></div>` : ''}
  ${ctx.store ? '' : `<div style="flex:1;display:flex;flex-direction:column;gap:.08in;justify-content:flex-end"><div class="h2">The ${ctx.g0 ? 9 : 10} tools inside</div><div class="toc" style="grid-template-columns:repeat(5,1fr);gap:.08in">${[['playTime', 'Play First, Then Screens checklists'], ['blocks', 'Play-First Board'], ['feedPet', 'Little helping jobs'], ['setTableBig', 'Family jobs chart'], ['boardGame', 'Together tokens'], ['alarm', 'Screen-spot cards'], ['familyMeal', 'Family Play Rules poster'], ['talkDay', 'Family Play & Screen Plan'], ['natureWalk', '30 Days of Play First'], ['dance', 'Certificate']].filter(t => !(ctx.g0 && t[0] === 'setTableBig')).map(([a, t]) => `<div style="grid-template-columns:1fr;text-align:center;padding:.06in .05in .08in;gap:.02in"><div style="display:flex;justify-content:center">${art(a)}</div><div class="nm" style="font-size:7.8pt">${t}</div></div>`).join('')}</div></div>`}
  <p class="small">License: personal and family use in your own home. Print shops may print copies for this customer’s family. Please don’t share or resell. Every play follows our published safety rules; a grown-up keeps the cut pieces.</p>
  ${footer(ctx, 1)}</section>`;
  return body;
}

(async () => {
  const qr = await QR.toString('https://' + T.BONUS, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#1D2940', light: '#FFFFFF' } });
  const manifest = {};
  // tier '' = full kit, ages 2–12 (5–12 pages HELD until counsel's G1 answer; ships later as a free update to the same listing)
  // tier 'g0-' = Ages 2–5 edition, the one that launches (business/GROWTH-ENGINE.md §8a)
  for (const tier of ['', 'g0-']) for (const ed of ['store', 'etsy']) for (const ink of ['color', 'low']) for (const size of ['letter', 'a4']) {
    fieldN = 0;
    const ctx = { size, low: ink === 'low', store: ed === 'store', ed, g0: tier === 'g0-' };
    const name = `kit-${tier}${ed}-${ink}-${size}`;
    const out = path.join(OUT, name + '.html');
    const doc = buildDoc(ctx, qr);
    fs.writeFileSync(out, wrap(ctx, doc.html, out, `Play-First Family Kit${ctx.g0 ? ', Ages 2–5' : ''} · ${ink === 'low' ? 'Low-ink' : 'Color'} · ${SIZES[size].name}`));
    manifest[name] = { pages: doc.n, toc: doc.toc, P: doc.P };
    if (ed === 'etsy' && ink === 'color' && size === 'letter') fs.writeFileSync(path.join(OUT, name + '-mk.html'), wrap(ctx, doc.html, out, 'Play-First Family Kit · listing renders').replace('<body class="', '<body class="mk '));
    if (!ctx.g0 && ed === 'store' && ink === 'color' && size === 'letter') {
      const src = path.join(ROOT, 'source.html');
      fieldN = 0; const d2 = buildDoc(ctx, qr);
      fs.writeFileSync(src, wrap(ctx, d2.html, src, 'Play-First Family Kit · Color · US Letter'));
    }
  }
  for (const tier of ['', 'g0-']) for (const ed of ['store', 'etsy']) {
    fieldN = 0; const ctx = { size: 'letter', low: false, store: ed === 'store', ed, g0: tier === 'g0-' };
    const out = path.join(OUT, `start-here-${tier}${ed}.html`);
    fs.writeFileSync(out, wrap(ctx, startHere(ctx, qr), out, `START HERE · Play-First Family Kit${ctx.g0 ? ', Ages 2–5' : ''}`));
  }
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 1));
  console.log(Object.entries(manifest).map(([k, v]) => `${k}: ${v.pages} pages`).join('\n'));
})().catch(e => { console.error(e); process.exit(1); });
