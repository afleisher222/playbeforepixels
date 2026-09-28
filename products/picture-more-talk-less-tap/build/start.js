// node build/start.js -> ../start-here.html (one US Letter page; prints fine on A4 with "fit to page").
// "START HERE.pdf" is file 1 of the download (BRAND.md customer-voice rule 2).
const fs = require('fs'); const path = require('path');
const A = require('../story-bonus/build/art.js'); const { C, SYMBOLS } = A;
const { NAME, VERSION, BLOCK, glyph, qrSvg, LOGO } = require('./kitlib.js');
const CSS = require('./kitcss.js')({ w: '8.5in', h: '11in' });
const slides = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'slides-count.json'), 'utf8')).n; } catch (e) { return 20; } })();
const pagesL = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'pages-letter.json'), 'utf8')).length; } catch (e) { return 25; } })();
const FILES = [
  ['START HERE.pdf', 'This page.'],
  ['Talk-Tower-Classroom-Game-Kit-US-Letter.pdf', `The full kit in color, ${pagesL} pages. Open this first.`],
  ['Talk-Tower-Classroom-Game-Kit-A4.pdf', 'The same kit sized for A4 paper.'],
  ['Talk-Tower-Classroom-Game-Kit-US-Letter-Ink-Saver.pdf', 'White backgrounds, with outline blocks and cards children can color in.'],
  ['Talk-Tower-Classroom-Game-Kit-A4-Ink-Saver.pdf', 'The ink-saver kit on A4 paper.'],
  ['Talk-Tower-Slides-16x9.pdf', `${slides} slides to project at circle time. No cutting needed.`],
  ['Talk-Tower-Story-Read-Aloud.pdf', 'Bonus: More Talk, Less Tap, a 32-page read-aloud story.'],
];
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>START HERE · ${NAME} Classroom Game Kit · Play Before Pixels</title>
<meta name="author" content="AlphaPlay LLC (Play Before Pixels)"><meta name="copyright" content="© 2026 AlphaPlay LLC. All rights reserved. License: playbeforepixels.com/license">
<link rel="stylesheet" href="../../brand/fonts/fonts.css"><style>${CSS}
.sh-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px }
.sh-kick { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 13px; letter-spacing: 2.5px; color: ${C.tomato} }
.sh-t { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 44px; line-height: 1; letter-spacing: -1px; margin: 0 0 6px }
.sh-moves { display: flex; gap: 8px; margin: 10px 0 16px }
.sh-moves span { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px 4px 6px; border-radius: 12px; font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 16px }
.ftab { width: 100%; border-collapse: collapse; font-size: 12.5px; line-height: 1.4; margin-bottom: 16px }
.ftab td { padding: 6px 8px; border-bottom: 1px solid #DCE3EE; vertical-align: top } .ftab td:first-child { width: 22px; font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; color: ${C.tomato} }
.ftab td:nth-child(2) { font-weight: 800; width: 52% ; word-break: break-word }
.sh-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px }
.sh-box { border-radius: 14px; padding: 12px 16px; font-size: 12.5px; line-height: 1.45 } .sh-box ul, .sh-box ol { padding-left: 1.2em } .sh-box li { margin-bottom: 4px }
.sh-bonus { margin-top: auto; display: flex; gap: 16px; align-items: center; background: ${C.tSun}; border-radius: 16px; padding: 14px 18px; font-size: 12.5px; line-height: 1.45 }
.sh-bonus h4 { font-size: 17px; margin: 0 0 4px } .sh-bonus p { margin: 0 }
</style></head><body>${SYMBOLS()}
<section class="page"><div class="body">
  <div class="sh-top">${LOGO('lockup-horizontal.svg', 34)}<span class="sh-kick">START HERE</span></div>
  <h1 class="sh-t">${NAME} Classroom Game Kit</h1>
  <p class="lead" style="margin:0">Thank you! Here is what is in your download and where to begin.</p>
  <div class="sh-moves">${['q', 'j', 'i', 'l'].map(t => `<span style="background:${BLOCK[t].col};color:${BLOCK[t].ink}">${glyph(t, 24)}${BLOCK[t].word}</span>`).join('')}</div>
  <h3 class="h3">Your files</h3>
  <table class="ftab">${FILES.map(([f, d], i) => `<tr><td>${i + 1}</td><td>${f}</td><td>${d}</td></tr>`).join('')}</table>
  <div class="sh-grid">
    <div class="sh-box" style="background:${C.tSky}"><h4>Play today in three steps</h4><ol>
      <li>Open the US Letter or A4 kit. Read <b>Quick start</b> (page 2) and the <b>teacher script</b> (page 4).</li>
      <li>Print the tower blocks (pages 6–9) at 100% (twice for more than 16 children), or project the slides if there is no time to cut.</li>
      <li>Play one round at circle time and count the tower together.</li></ol></div>
    <div class="sh-box" style="background:${C.tGrass}"><h4>Printing tips</h4><ul>
      <li>Print at <b>100% / actual size</b>, single-sided. White cardstock lasts longest.</li>
      <li>On a phone or tablet? Save the files first, then print from a computer or a print shop.</li>
      <li>Short on color ink? Use the ink-saver files.</li></ul></div>
    <div class="sh-box" style="background:${C.wash}"><h4>Your license</h4><p style="margin:0">Your <b>single-classroom license</b> covers one teacher (or one homeschooling family) and their class. Full terms are on kit page 24 and at playbeforepixels.com/license.</p></div>
    <div class="sh-box" style="background:${C.wash}"><h4>Good to know</h4><ul>
      <li>Every play follows our published safety rules: an adult leads every round, and with under-3s nearby, nothing small enough to fit through a toilet-paper tube.</li>
      <li>Need your files again? Use the download link in your order email.</li></ul></div>
  </div>
  <div class="sh-bonus">${qrSvg(96)}<div><h4>Free bonus for your class</h4><p>Extra topic cards and 5-minute family talk games. We only ask for an email address: no child names, ever.<br><b>playbeforepixels.com/bonus/picture-more-talk-less-tap</b></p></div></div>
</div><footer class="foot"><span class="fl">${LOGO('lockup-horizontal.svg', 15)}<span>playbeforepixels.com</span></span><span class="fmid">© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.</span><span class="fr"><em>${VERSION}</em><b>1</b></span></footer></section>
</body></html>`;
fs.writeFileSync(path.resolve(__dirname, '../start-here.html'), html.split('%BR%').join('../../brand/'));
console.log('START HERE -> start-here.html');
