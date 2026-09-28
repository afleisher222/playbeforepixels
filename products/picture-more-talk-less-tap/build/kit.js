// Talk Tower Classroom Game Kit (Play Before Pixels) — printable kit generator.
//   node build/kit.js letter  -> ../source.html        (US Letter 8.5 x 11 in, 0.5 in margins, no bleed)
//   node build/kit.js a4      -> ../source-a4.html     (A4 210 x 297 mm, same margins)
// Card text comes from ../WORDS.md (founder-editable). Art reuses the story's symbol library so the
// characters and blocks match the bonus read-aloud exactly.
// NAME: "Talk Tower" needs trademark counsel's clearance (see listing.json human_todo). If it must change,
// edit NAME below and re-run build/build-all.js; nothing else hard-codes it.
const fs = require('fs'); const path = require('path');
const A = require('../story-bonus/build/art.js');
const { C, R, Ci, E, P, L, U, G, TX, SYMBOLS, kidAt, teacherAt, tower, blk } = A;
const W = require('./words.js');
const K = require('./kitlib.js');
const { NAME, VERSION, BLOCK, glyph, topicIcon, qrSvg, LOGO, esc } = K;

const SIZE = (process.argv[2] || 'letter').toLowerCase();
// Ink-saver edition (BRAND.md customer-voice rule 1): white backgrounds, outline blocks and cards children can color in.
const INK = (process.argv[3] || '').toLowerCase() === 'ink';
// Ink-saver towers: white blocks with a colored outline and colored glyph (children can color them in).
const JIT = [0, 4, -3, 5, -2, 3, -4];
function inkTower(x, baseY, seq, sc = 1, tilt = 0) {
  let out = '';
  seq.forEach((t, i) => { const bx = x - 48 * sc + JIT[i % JIT.length] * sc, by = baseY - (i + 1) * 64 * sc; out += G(`translate(${bx.toFixed(1)} ${by.toFixed(1)}) scale(${sc})`, R(3, 3, 90, 58, '#fff', 12, `stroke="${BLOCK[t].col}" stroke-width="5"`) + K.glyphInner(t, true)); });
  return tilt ? G(`rotate(${tilt} ${x} ${baseY})`, out) : out;
}
const towerArt = (...a) => INK ? inkTower(...a) : tower(...a);
const SLIDES = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'slides-count.json'), 'utf8')).n; } catch (e) { return 20; } })();
const DIM = SIZE === 'a4' ? { w: '210mm', h: '297mm', label: 'A4' } : { w: '8.5in', h: '11in', label: 'US Letter' };
const SUFFIX = (SIZE === 'a4' ? '-a4' : '') + (INK ? '-ink' : '');
const OUT = path.resolve(__dirname, '..', `source${SUFFIX}.html`);

const pages = [];   // { id, title, html }
const page = (id, title, body, opts = {}) => pages.push({ id, title, body, cls: opts.cls || '', noFoot: !!opts.noFoot, bg: opts.bg || '#fff', foot: opts.foot || '' });
const pageNo = id => pages.findIndex(p => p.id === id) + 1;
const svg = (vb, inner, style = '') => `<svg viewBox="${vb}" style="${style}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const founderBox = (label, hint) => `<div class="fbox"><b>${label}</b> ${hint}</div>`;
const pill = (t, col, txt = '#fff') => `<span class="pill" style="background:${col};color:${txt}">${t}</span>`;
const cutNote = (extra = '') => `<p class="cutnote"><span class="scissor">✂</span> Cut on the dashed lines. ${extra} <b class="keep">Grown-up keeps the pieces.</b></p>`;

// ------------------------------------------------------------------ 1 COVER
{
  const art = E(360, 452, 350, 34, C.wash) +
    towerArt(368, 452, ['q', 'j', 'i', 'l', 'q', 'i', 'j'], 0.92, 0) +
    G('translate(372 -2) scale(.62)', U('star')) +
    kidAt('leo', 'cheer', 88, 456, 0.9, 'laugh') +
    kidAt('priya', 'handup', 214, 456, 0.9, 'talk') +
    kidAt('zara', 'point', 516, 456, 0.9, 'smile', true) +
    kidAt('sam', 'sithold', 640, 460, 0.86, 'smile', true);
  page('cover', 'Cover', `
<div class="cov">
  <div class="covtop">${LOGO('lockup-horizontal.svg', 40)}<span class="covkick">Classroom game kit</span></div>
  <h1 class="covtitle">${NAME}</h1>
  <p class="covsub">A turn-taking talk game for circle time</p>
  <p class="covwords">${['q', 'j', 'i', 'l'].map(t => INK ? `<span style="background:#fff;border:3px solid ${BLOCK[t].col};color:${BLOCK[t].dark}">${glyph(t, 34, true)}${BLOCK[t].word}</span>` : `<span style="background:${BLOCK[t].col};color:${BLOCK[t].ink}">${glyph(t, 34)}${BLOCK[t].word}</span>`).join('')}</p>
  <div class="covart">${svg('0 0 720 480', art, 'width:100%;height:100%')}</div>
  <div class="covmeta">${pill('Ages 3–7 · Preschool to Grade 2', C.ink)} ${pill('Print · Project · Play', C.tomato)} ${pill('Prep: about 20 min, once · no-cut option', C.wash, C.ink)}</div>
  <div class="covinside">
    <div><b>32</b>tower blocks</div><div><b>36</b>prompt cards</div><div><b>1-page</b>teacher script</div>
    <div><b>6</b>circle-time games</div><div><b>+</b>family take-home</div><div><b>+</b>bonus story</div>
  </div>
</div>`, { noFoot: false });
}

// ------------------------------------------------------------------ 2 INSIDE + HOW TO USE
const CONTENTS = [
  ['script', 'Teacher script (one page)'], ['poster', 'Our Talk Tower wall poster'], ['blk-q', 'Tower-block turn cards (4 pages)'],
  ['names', 'Name blocks'], ['mat', 'Whose-turn tracker mat'], ['week', 'Weekly turn tracker'], ['star', 'Talking Star and “Tower wobble!” sign'],
  ['pc-ask', 'Prompt and topic cards (4 pages)'], ['var1', 'Circle-time variations (2 pages)'],
  ['fam1', 'Family take-home (2 pages)'], ['cert', 'Class certificate'], ['story', 'Bonus read-aloud story'], ['terms', 'License terms and copyright'],
];
page('inside', 'Inside this kit', () => `
<h2 class="h">Inside this kit</h2>
<div class="two">
  <div>
    <ol class="toc">${CONTENTS.map(([id, t]) => `<li><span>${t}</span><i></i><b>${pageNo(id)}</b></li>`).join('')}</ol>
    <div class="files"><h4>Also in your download</h4>
      <ul><li><b>START HERE</b>: which file to open first</li><li><b>US Letter</b> and <b>A4</b> versions of this kit, each in <b>color</b> and <b>ink-saver</b> (white backgrounds, blocks to color in)</li><li><b>Slides</b> to project (16:9 PDF, ${SLIDES} slides)</li><li><b>Bonus story:</b> <i>More Talk, Less Tap</i>, a 32-page read-aloud PDF</li></ul></div>
  </div>
  <div>
    <h3 class="h3">Quick start</h3>
    <ol class="steps">
      <li><b>Print and cut</b> the tower blocks (pages ${pageNo('blk-q')}–${pageNo('blk-l')}) and one set of prompt cards. About 20 minutes, once; a paper trimmer helps.</li>
      <li><b>Put up the poster</b> at children’s eye level. Blocks get taped above it.</li>
      <li><b>Read the teacher script</b> once (page ${pageNo('script')}).</li>
      <li><b>Play one round</b> at circle time. Count the tower together.</li>
    </ol>
    <p class="nocut"><b>No time to cut?</b> Project the slides and draw the tower on the board, one block per turn. You can play today.</p>
    <div class="howbox">
      <h4>How the game works</h4>
      <p>Every time a child asks, comments, adds one idea or shows they listened, a block goes on the class tower. Everyone builds <b>one tower together</b>. There are no winners, no points and no blocks taken away.</p>
      <div class="legend">${['q', 'j', 'i', 'l'].map(t => `<div>${glyphChip(t)}<span><b>${BLOCK[t].label}</b> ${BLOCK[t].short}</span></div>`).join('')}</div>
    </div>
  </div>
</div>
<div class="week5"><h3 class="h3">A first week with ${NAME}</h3><div class="wk">
  <div><b>Mon</b>Read the bonus story. Meet the four blocks.</div><div><b>Tue</b>Your first round with the teacher script.</div>
  <div><b>Wed</b>Pass the Talking Star (variation 1).</div><div><b>Thu</b>Add-One Story Tower (variation 2).</div>
  <div><b>Fri</b>Count the tower, sign the certificate, send the family page home.</div></div></div>
<div class="fwrap">${W.one('founder-note') ? `<div class="fnote"><h4>A note from the maker</h4><p>${W.one('founder-note')}</p></div>` :
    founderBox('FOUNDER: “A note from the maker”.', 'Write 2–3 sentences in your own words in WORDS.md, section “founder-note”. This dashed box disappears once filled.')}</div>`);
function glyphChip(t, s = 40) {
  return INK ? `<span class="chip" style="background:#fff;border:2.5px solid ${BLOCK[t].col};width:${s * 1.45}px;height:${s}px">${glyph(t, s * 0.9, true)}</span>`
    : `<span class="chip" style="background:${BLOCK[t].col};width:${s * 1.45}px;height:${s}px">${glyph(t, s * 0.9)}</span>`;
}

// ------------------------------------------------------------------ 3 BEFORE YOU START
page('before', 'Before you start', () => `
<h2 class="h">Before you start</h2>
<div class="three">
  <section class="tip"><h3 class="h3" style="color:${C.sky}">Printing</h3><ul>
    <li>Print at <b>100% / actual size</b> so the cards line up. Choose US Letter or A4 to match your paper.</li>
    <li><b>Cards and blocks:</b> white cardstock (about 65–110 lb / 176–300 gsm) lasts longest. Plain paper works for a quick try.</li>
    <li><b>Laminate</b> the blocks and prompt cards if you will play all year, then round the corners.</li>
    <li><b>Save ink:</b> print the script, trackers and family pages in grayscale. Only the blocks and cards need color.</li>
    <li><b>Print shop:</b> ask for “single-sided, full color, cardstock, no scaling”. Cut on the dashed lines.</li>
    <li><b>Store</b> each card set in its own envelope or zip bag, labelled with its color.</li>
  </ul></section>
  <section class="tip"><h3 class="h3" style="color:${C.grass}">Ages and groups</h3><ul>
    <li><b>Ages 3–4:</b> start with two blocks only, ASK and LISTEN. Rounds of 3–5 minutes. You read the cards aloud.</li>
    <li><b>Ages 5–7:</b> use all four blocks and the prompt cards. Rounds of 8–10 minutes.</li>
    <li>Works for a whole class in a circle, a small group of 4–6, or pairs.</li>
    <li>The picture on every card carries its meaning, so pre-readers can play too.</li>
  </ul>
  <h3 class="h3" style="color:${C.plum}">Every way of talking counts</h3><ul>
    <li>Spoken words, signing, pointing, a picture card, a communication device, a nod or a thumbs-up all earn a block.</li>
    <li>Children may take their turn in the language they know best.</li>
    <li>“Pass” is always OK. A child who passes can still earn a LISTEN block.</li>
    <li>Count the class tower, never individual children. Blocks are never taken away.</li>
  </ul></section>
  <section class="tip"><h3 class="h3" style="color:${C.tomato}">Safety</h3><ul>
    <li>An adult leads and supervises every round.</li>
    <li>Paper blocks and cards are large. If you use real blocks or objects with children under 3 nearby, choose pieces too big to fit through a toilet-paper tube (about 1.25 in / 3.2 cm).</li>
    <li>Use painter’s tape or large Velcro dots on the wall. Check dots before each play. Keep pushpins, staples and small magnets out of reach.</li>
    <li>For the Talking Star, use the paper star in this kit or a soft toy. For ball games, roll a soft, large ball along the floor.</li>
    <li>No balloons for children under 8.</li>
  </ul>
  <div class="note">This kit is a set of general classroom play ideas. It is not a program, assessment or screening tool, and it is not professional advice.</div>
  </section>
</div>
<div class="whybox">
  <div><h3 class="h3">Why it works</h3><p>Children get better at conversation by having lots of conversations: asking, answering, adding on and listening, with grown-ups and friends who wait for them. The tower makes each of those turns visible, so the whole class can see them and cheer.</p></div>
  <div><h3 class="h3">Three talk lines for any time</h3><p class="lines">“Tell me more.”<br>“What happened next?”<br>“I wonder…”</p><p class="small">Most classes love 2–3 of the six variations. Keep your favorites and skip the rest.</p></div>
</div>
<div class="needbox"><h3 class="h3">What you need</h3><div class="needs">
  <div>${glyphChip('q', 30)}<span>Printed tower blocks (pages ${pageNo('blk-q')}–${pageNo('blk-l')})</span></div>
  <div>${glyphChip('j', 30)}<span>One set of prompt and topic cards</span></div>
  <div>${glyphChip('i', 30)}<span>The wall poster and painter’s tape</span></div>
  <div>${glyphChip('l', 30)}<span>A basket, and the paper Talking Star or a soft toy</span></div></div>
  <p class="small" style="margin:8px 0 0">Optional: large classroom blocks instead of paper ones, a cloth bag for Mystery Bag Talk, a soft ball for Comment Catch.</p></div>`);

// ------------------------------------------------------------------ 4 TEACHER SCRIPT
{
  const steps = [
    ['1', 'Gather', '1 min', 'Children sit in a circle. The poster is up, the blocks are in a basket, and the Talking Star is in your hand.',
      '“Today we are going to build something with our words. It is called a Talk Tower!”'],
    ['2', 'Meet the blocks', '2 min', 'Hold up one block at a time.',
      '“Blue means <b>ask</b>: you ask a friend a question. Yellow means <b>comment</b>: you say something back. Green means <b>add one</b>: you add one more idea. Purple means <b>listen</b>: you show you heard your friend.”'],
    ['3', 'Show one turn', '1 min', 'Play a turn with a child or another adult so everyone sees it first.',
      '“What did you play today?” <span class="do">(Child answers.)</span> “Me too! I love the sand table.” <span class="do">(Add a yellow block.)</span> “My comment made our tower grow!”'],
    ['4', 'Play the round', '5 min', 'Draw a topic card. Pass the star around the circle. After each turn, the child adds their block, or you add it together.',
      '“Whoever holds the star can talk. Everyone else is listening. You can ask, comment, add one, or say pass.”'],
    ['5', 'Count and celebrate', '1 min', 'Count out loud together, then write today’s height on the weekly tracker.',
      '“Let’s count our tower: one, two, three… Our tower is ___ blocks tall! We built that with our words and our ears.”'],
  ];
  const ifs = [
    ['Everyone talks at once', '“Tower wobble! One voice at a time. Who has the star?” Hold up the wobble sign.'],
    ['A child does not want a turn', '“Pass is OK. You can point, nod or show me. Want to earn a listen block?”'],
    ['One child talks a lot', '“Great idea! Hold it for the next round. Let’s hear from someone who hasn’t had a turn.”'],
    ['The tower is small today', '“Every block counts. We will build more tomorrow.”'],
  ];
  page('script', 'Teacher script', () => `
<div class="scripthead"><h2 class="h">Teacher script: your first round</h2><p class="meta">About 10 minutes · whole group · <b>say</b> the words in bold quotes; <span class="do">do</span> the grey notes</p></div>
<div class="script">${steps.map(([n, t, m, d, s]) => `<div class="srow"><div class="snum">${n}</div><div class="stxt"><h4>${t} <small>${m}</small></h4><p class="do">${d}</p><p class="say">${s}</p></div></div>`).join('')}</div>
<div class="ifbox"><h4>If this happens…</h4><div class="ifs">${ifs.map(([a, b]) => `<div><b>${a}</b><p>${b}</p></div>`).join('')}</div></div>
<p class="tinynote">Next time, try a variation from pages ${pageNo('var1')}–${pageNo('var2')}. The bonus story <i>More Talk, Less Tap</i> is a fun way to start on day one.</p>`);
}

// ------------------------------------------------------------------ 5 POSTER
{
  const art = (INK ? E(350, 384, 330, 14, C.wash) : R(0, 380, 700, 80, C.tSun, 18) + E(350, 380, 330, 18, C.sun)) +
    kidAt('milo', 'cheer', 110, 400, 0.95, 'laugh') + kidAt('zara', 'handup', 590, 400, 0.95, 'talk', true) +
    towerArt(350, 386, ['q', 'j', 'i', 'l'], 1.12);
  page('poster', 'Wall poster', `
<div class="poster">
  <div class="pbanner"><span>Our</span> ${NAME}</div>
  <p class="psub">Every question, comment, idea and listening turn adds a block.</p>
  <div class="plegend">${['q', 'j', 'i', 'l'].map(t => `<div class="pl" style="border-color:${BLOCK[t].col}">${glyphChip(t, 54)}<div><b style="color:${BLOCK[t].dark}">${BLOCK[t].label}</b><span>${BLOCK[t].kid}</span></div></div>`).join('')}</div>
  <div class="prules"><div>One voice at a time</div><div>“Pass” is OK</div><div>Every way of talking counts</div><div>We build one tower together</div></div>
  <div class="part">${svg('0 0 700 470', art, 'width:100%;height:100%')}</div>
  <p class="pnote">Tape the blocks above this poster. Watch our tower grow!</p>
</div>`);
}

// ------------------------------------------------------------------ 6-9 TURN BLOCKS
for (const t of ['q', 'j', 'i', 'l']) {
  const b = BLOCK[t];
  const face = INK ? `background:#fff;border:5px solid ${b.col};color:${b.dark}` : `background:${b.col};color:${b.ink}`;
  const line = INK || b.ink !== '#fff' ? 'rgba(29,41,64,.55)' : 'rgba(255,255,255,.75)';
  const cell = `<div class="cell"><div class="bcard" style="${face}">
    <div class="bglyph">${glyph(t, 100, INK)}</div>
    <div class="btxt"><div class="blab" style="font-size:${b.fs}px">${b.label}</div><div class="bkid">${b.kid}</div><div class="bname" style="border-color:${line}">name</div></div></div></div>`;
  page('blk-' + t, `Tower blocks: ${b.label}`, `
<div class="cardhead"><h2 class="h2">Tower blocks: <span style="color:${b.dark}">${b.label}</span></h2>${cutNote(INK ? 'Children can color their own block before it goes on the tower.' : 'Print on cardstock. Make as many as you need.')}</div>
<div class="grid blocks">${cell.repeat(8)}</div>`);
}

// ------------------------------------------------------------------ 10 NAME BLOCKS
{
  const cols = ['q', 'j', 'i', 'l'];
  let cells = '';
  for (let i = 0; i < 12; i++) { const b = BLOCK[cols[(i + Math.floor(i / 2)) % 4]]; cells += `<div class="cell"><div class="nblock" style="background:${INK ? '#fff' : b.tint};border:${INK ? `2px solid ${b.col}` : '0'};border-left:14px solid ${b.col}"><span>name</span></div></div>`; }
  page('names', 'Name blocks', () => `
<div class="cardhead"><h2 class="h2">Name blocks</h2>${cutNote('Write one child’s name on each block and use them on the whose-turn mat (next page). Print this page once for every 12 children.')}</div>
<div class="grid names">${cells}</div>
<div class="nocutbox"><h3 class="h3">No time to cut?</h3><p>Write names straight into the <b>Ready for a turn</b> column of the whose-turn mat and tick each one after a turn, or use the weekly tracker (page ${pageNo('week')}).</p></div>`);
}

// ------------------------------------------------------------------ 11 WHOSE-TURN MAT
{
  const col = (title, tint, col, sub, glyphT) => `<div class="matcol" style="background:${INK ? '#fff' : tint};${INK ? `border:2.5px solid ${col}` : ''}"><div class="mathead" style="${INK ? `background:#fff;color:${C.ink};border:3px solid ${col}` : `background:${col}`}">${glyph(glyphT, 34, INK)}<span>${title}</span></div><p>${sub}</p><div class="matslots">${'<div></div>'.repeat(8)}</div></div>`;
  page('mat', 'Whose-turn tracker mat', `
<div class="cardhead"><h2 class="h2">Whose turn?</h2><p class="lead">Stick every name block in <b>Ready for a turn</b>. After a child’s turn, they move their own name across. When every name has moved, the round is done: move them all back and start again.</p></div>
<div class="mat">${col('Ready for a turn', BLOCK.q.tint, C.sky, 'Everyone starts here.', 'q')}<div class="matarrow">${svg('0 0 60 60', P('M6 22 H34 V8 L56 30 L34 52 V38 H6Z', C.ink))}</div>${col('Had a turn', BLOCK.i.tint, C.grass, 'Move your name here after your turn.', 'i')}</div>
<p class="tinynote">Tip: laminate this page and use Velcro dots or painter’s tape on the backs of the name blocks. Check dots before each play. A child who passes still moves across: listening is a turn too. The mat holds 8 names, so use one per small group, or overlap the name blocks for a whole class.</p>`);
}

// ------------------------------------------------------------------ 12 WEEKLY TRACKER
{
  const rows = 22;
  const box = t => `<i style="border-color:${BLOCK[t].col}"></i>`;
  const cell = `<td>${['q', 'j', 'i', 'l'].map(box).join('')}</td>`;
  page('week', 'Weekly turn tracker', `
<div class="cardhead"><h2 class="h2">Talk Tower turn tracker</h2><p class="lead">Week of ______________ · Color a square when a child adds that kind of block. Use it to make sure <b>everyone</b> gets a turn, never to rank or compare children. Print two for a bigger class.</p></div>
<table class="track"><thead><tr><th>Name</th>${['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => `<th>${d}</th>`).join('')}</tr></thead>
<tbody>${`<tr><td class="nm"></td>${cell.repeat(5)}</tr>`.repeat(rows)}
<tr class="tot"><td>Tower height</td>${'<td>____ blocks</td>'.repeat(5)}</tr></tbody></table>
<div class="tkey">${['q', 'j', 'i', 'l'].map(t => `<span>${box(t)} ${BLOCK[t].label.toLowerCase()}</span>`).join('')}<span class="tnote">This is a play game, not a measurement or screening tool.</span></div>`);
}

// ------------------------------------------------------------------ 13 TALKING STAR + WOBBLE SIGN
{
  const star = (INK ? `<path d="${A.starPath(222, 114)}" fill="#fff" stroke="${C.sun}" stroke-width="14" stroke-linejoin="round"/>` : `<path d="${A.starPath(230, 118)}" fill="${C.sun}" stroke="${C.sun}" stroke-width="30" stroke-linejoin="round"/>`) +
    Ci(-40, -14, 14, C.ink) + Ci(40, -14, 14, C.ink) + Ci(-35, -19, 4.5, '#fff') + Ci(45, -19, 4.5, '#fff') + L('M-30 26 Q0 50 30 26', C.ink, 11) + Ci(-72, 20, 16, C.tomato, 'fill-opacity=".45"') + Ci(72, 20, 16, C.tomato, 'fill-opacity=".45"');
  page('star', 'Talking Star and wobble sign', `
<div class="cardhead"><h2 class="h2">Talking Star <span class="muted">and</span> “Tower wobble!” sign</h2>${cutNote(INK ? 'Color the star, then glue it to cardstock. Whoever holds the star talks; everyone else listens.' : 'Glue the star to cardstock. Whoever holds the star talks; everyone else listens.')}</div>
<div class="starpage">
  <div class="cell starcell">${svg('-270 -270 540 520', star, 'width:100%;height:100%')}<div class="starlab">Talking Star</div></div>
  <div class="cell wobble"><div class="wobin">${svg('0 0 220 170', G('rotate(-8 110 150)', towerArt(110, 160, ['q', 'j', 'i'], 0.8)) + A.motion(40, 40, 22, 200, C.tomato, 7) + A.motion(180, 40, 22, -20, C.tomato, 7), 'width:150px;height:116px')}
    <div><div class="wobt">Tower wobble!</div><p>One voice at a time.<br>Who has the star?</p></div></div></div>
</div>`);
}

// ------------------------------------------------------------------ 14-17 PROMPT CARDS
const promptPage = (id, t, label, lines, hint) => {
  const b = BLOCK[t];
  const cells = lines.map(l => `<div class="cell"><div class="pcard" style="border-color:${b.col}">
    <div class="pband" style="${INK ? `background:${b.tint};color:${C.ink}` : `background:${b.col};color:${b.ink}`}">${glyph(t, 40, INK)}<span>${label}</span></div>
    <div class="ptxt">${l}</div><div class="phint" style="color:${b.dark}">${hint}</div></div></div>`).join('');
  page(id, `Prompt cards: ${label}`, `
<div class="cardhead"><h2 class="h2">Prompt cards: <span style="color:${b.dark}">${label}</span></h2>${cutNote('A grown-up reads the card aloud. The child can use it, change it or pick their own words.')}</div>
<div class="grid prompts">${cells}</div>`);
};
promptPage('pc-ask', 'q', 'ASK', W.list('ask', 9), 'Ask a friend');
promptPage('pc-comment', 'j', 'COMMENT', W.list('comment', 9), 'Say something back');
promptPage('pc-add', 'i', 'ADD ONE', W.list('addone', 9), 'Add one more');
{
  const topics = W.list('topics', 9).map(l => { const [lab, ic] = l.split('|').map(s => s.trim()); return { lab, ic: ic || 'ball' }; });
  const cells = topics.map(({ lab, ic }) => `<div class="cell"><div class="pcard topic">
    <div class="pband" style="${INK ? `background:#fff;color:${C.ink};border-bottom:3px solid ${C.ink}` : `background:${C.ink};color:#fff`}">${svg('-60 -60 120 120', `<path d="${A.starPath(46, 24)}" fill="${C.sun}" stroke="${C.sun}" stroke-width="10" stroke-linejoin="round"/>`, 'width:34px;height:34px')}<span>TALK ABOUT</span></div>
    <div class="ticon">${svg('-60 -60 120 120', topicIcon(ic), 'width:118px;height:118px')}</div><div class="tlab">${lab}</div></div></div>`).join('');
  page('pc-topic', 'Prompt cards: topics', `
<div class="cardhead"><h2 class="h2">Topic cards</h2>${cutNote('Draw one topic to start a round. Everyone asks, comments and adds one about it.')}</div>
<div class="grid prompts">${cells}</div>`);
}

// ------------------------------------------------------------------ 18-19 CIRCLE-TIME VARIATIONS
const VARS = [
  { n: 1, t: 'Pass the Talking Star', col: C.sun, who: 'Whole group', time: '5–10 min', need: 'Talking Star, one topic card',
    steps: ['Read the topic card aloud.', 'Pass the star around the circle. Whoever holds it may ask, comment, add one or pass.', 'Add a block after every turn and count the tower at the end.'],
    easy: 'Everyone finishes the same starter: “I like…”', stretch: 'Each turn connects to the friend before: “Add one to what Maya said.”',
    months: 36, quick: 'Skip the topic card. Ask one question and pass the star to three children. One block each.' },
  { n: 2, t: 'Add-One Story Tower', col: C.grass, who: 'Whole group', time: '10 min', need: 'Green blocks',
    steps: ['Start a silly story: “Once there was a dog who wanted to…”', 'Each child adds one thing to the story, and a green block goes on the tower.', 'At the end, retell the whole story together, one block at a time.'],
    easy: 'Add just one word each: “a big… red… bus”.', stretch: 'Add a problem, then ask the circle how to fix it.',
    months: 48, quick: 'Say one story starter. Three children add one word each, then say the whole line together.' },
  { n: 3, t: 'Ask Me One More', col: C.sky, who: 'Pairs', time: '5 min', need: 'Nothing at all',
    steps: ['One partner shares something: “I have a cat.”', 'The other listens, then asks one more question: “What is its name?”', 'Swap. Each pair adds a blue block to the class tower.'],
    easy: 'Hand the asker an ASK card to read or point to.', stretch: 'Try for three questions in a row on the same topic.',
    months: 48, quick: 'One pair shows the class: one shares, one asks one more question. Everyone claps.' },
  { n: 4, t: 'Comment Catch', col: C.tomato, who: 'Small group', time: '5 min', need: 'A large soft ball',
    steps: ['Sit in a small circle. One child shares a sentence about the topic.', 'Roll the ball along the floor to a friend.', 'The catcher makes a comment about what they heard, then shares their own sentence and rolls on.'],
    easy: 'Keep a COMMENT card in the middle to point to.', stretch: 'The catcher starts with the sharer’s name: “Leo, that is funny!”',
    months: 42, quick: 'No ball: point to a friend instead of rolling. Two or three turns.' },
  { n: 5, t: 'Listening Tower', col: C.plum, who: 'Whole group', time: '5 min', need: 'Purple blocks',
    steps: ['A child shares one thing about their day.', 'The next child says back one thing they heard, then shares their own.', 'Every say-back earns a purple block. A calm way to end a busy day.'],
    easy: 'The grown-up says it back first, then invites a child to try.', stretch: 'Say back two things you heard.',
    months: 42, quick: 'You share one thing about your day. Two children say back what they heard.' },
  { n: 6, t: 'Mystery Bag Talk', col: C.ink, who: 'Small group', time: '10 min', need: 'A cloth bag and one classroom object',
    steps: ['Hide one object in the bag. Pick something too big to fit through a toilet-paper tube.', 'Children ask questions to guess it: “Is it soft?” Each question adds a blue block.', 'Reveal it, then everyone comments or adds one idea about it.'],
    easy: 'Answer with a yes or no, and let children feel the bag.', stretch: 'The child who guesses hides the next object and answers the questions.',
    months: 36, quick: 'No bag: hold one classroom object behind your back and take three guesses.' },
];
const varCard = v => `<div class="var"><div class="vhead"><span class="vnum" style="background:${v.col}">${v.n}</span><div><h3>${v.t}</h3><p class="vmeta">${v.who} · From ${v.months} months · ${v.time} · <b>You need:</b> ${v.need}</p></div></div>
  <ol>${v.steps.map(s => `<li>${s}</li>`).join('')}</ol>
  <p class="vquick"><b>2-minute version, no setup:</b> ${v.quick}</p>
  <div class="vtips"><p><b>Make it easier:</b> ${v.easy}</p><p><b>Make it harder:</b> ${v.stretch}</p></div></div>`;
page('var1', 'Circle-time variations 1', `<h2 class="h">Circle-time variations</h2><p class="lead">Six more ways to build the tower. Each one works with the same blocks, cards and rules.</p><div class="vars">${VARS.slice(0, 3).map(varCard).join('')}</div>`);
page('var2', 'Circle-time variations 2', `<h2 class="h">Circle-time variations <span class="muted">(continued)</span></h2><div class="vars">${VARS.slice(3).map(varCard).join('')}</div>
<div class="vfoot"><b>Keep it a celebration.</b> Count the class tower, not individual turns. No winners, no prizes, and no child is made to talk before they are ready.</div>`);

// ------------------------------------------------------------------ 20-21 FAMILY TAKE-HOME
// These pages go home, so their footer says so instead of "don't share".
const FAMFOOT = '© 2026 AlphaPlay LLC · Teachers may copy this page for their class’s families.';
page('fam1', 'Family letter', `
<div class="famtop">${LOGO('lockup-horizontal.svg', 30)}<span class="famtag">From our classroom to your home</span></div>
<h2 class="h">Play ${NAME} at home</h2>
<div class="letter">
  <p>Dear families,</p>
  <p>This week our class played <b>${NAME}</b>, a talk game where every question, comment and idea adds a block to our class tower. Our tower grew to <span class="blank">&nbsp;</span> blocks! Here is how to play at home. You need no screens and nothing special.</p>
</div>
<div class="famgrid">
  <div class="famhow"><h3 class="h3">How to play (5 minutes)</h3><ol>
    <li><b>Pick a moment:</b> dinner, the car, bath time or a walk.</li>
    <li><b>Pick a topic:</b> food, animals, today, a silly “what if”.</li>
    <li><b>Take turns:</b> ask a question, say something back, or add one more idea.</li>
    <li><b>Build:</b> every turn adds a block. Use cups, spoons, socks or cereal boxes, or color a block on the sheet we sent home.</li>
    <li><b>Count</b> your tower together at the end.</li></ol></div>
  <div class="famtips"><h3 class="h3">Tips for grown-ups</h3><ul>
    <li><b>Pause and wait.</b> Count to five in your head after you ask.</li>
    <li><b>Say what you see.</b> “You’re smiling! Is that a funny idea?”</li>
    <li><b>Repeat and add one word.</b> “A dog!” “A <i>big</i> dog!”</li>
    <li><b>Follow their lead.</b> Talk about what your child already loves.</li>
    <li><b>Every way counts.</b> Pointing, signing, gestures and a tap on a talking device are turns too.</li>
    <li><b>Use your home language.</b> Talk, sing and read in the language you know best.</li></ul>
    <p class="safe"><b>Safety:</b> an adult plays along. If babies or toddlers are nearby, use objects too big to fit through a toilet-paper tube.</p></div>
</div>
<div class="famart">${svg('0 -56 720 306', E(360, 236, 340, 16, C.wash) + teacherAt('sittalk', 150, 236, 0.74, 'talk') + kidAt('priya', 'sithand', 300, 236, 0.74, 'talk', true) + kidAt('milo', 'sitcheer', 560, 236, 0.74, 'laugh', true) + towerArt(430, 236, ['q', 'j', 'i', 'l'], 0.66) +
    G('translate(164 -50)', P('M0 0 h150 a18 18 0 0 1 18 18 v34 a18 18 0 0 1 -18 18 h-100 l-22 20 l2 -20 h-30 a18 18 0 0 1 -18 -18 v-34 a18 18 0 0 1 18 -18Z', C.tSky) + `<text x="84" y="44" font-family="Fredoka, sans-serif" font-weight="600" font-size="19" fill="${C.ink}" text-anchor="middle">What did you play?</text>`), 'width:100%;height:100%')}</div>
<div class="famfoot">
  <div class="teacherline">From: <span class="line"></span><br><small>(teacher)</small></div>
  <div class="famqr">${qrSvg(92)}<p><b>Free family bonus</b><br>More 5-minute talk games to print at home:<br>playbeforepixels.com/bonus/picture-more-talk-less-tap</p></div>
</div>`, { foot: FAMFOOT });
{
  const seq = ['q', 'j', 'i', 'l', 'q', 'j', 'i', 'l', 'q', 'j', 'i', 'l'];
  let tw = '';
  seq.forEach((t, i) => { const y = 700 - (i + 1) * 58; tw += R(30 + (i % 2) * 8, y, 150, 52, '#fff', 12, `stroke="${BLOCK[t].col}" stroke-width="5"`) + G(`translate(${76 + (i % 2) * 8} ${y + 4}) scale(.62)`, glyphRaw(t, true)); });
  const fams = [...W.list('ask', 4).map(l => ['q', l]), ...W.list('comment', 4).map(l => ['j', l]), ...W.list('addone', 4).map(l => ['i', l])];
  page('fam2', 'Family tower sheet', `
<h2 class="h">Our Family ${NAME}</h2>
<p class="lead">Color one block for every turn. Stick it on the fridge and see how tall your tower grows this week!</p>
<div class="famsheet">
  <div class="famtower">${svg('0 0 220 720', R(10, 700, 200, 14, C.ink, 7) + tw, 'width:100%;height:100%')}</div>
  <div class="famcards">${fams.map(([t, l]) => `<div class="fc" style="border-color:${BLOCK[t].col}">${glyphChip(t, 26)}<span>${l}</span></div>`).join('')}
    <div class="famdone"><p>Our tower was <span class="blank">&nbsp;</span> blocks tall!</p><p>Date: <span class="blank">&nbsp;</span></p><p class="fsmall">Family photos of towers are always welcome. Please don’t share children’s names or faces online without permission.</p></div>
    <div class="famkids">${svg('0 0 460 250', E(230, 240, 200, 12, C.wash) + kidAt('zara', 'cheer', 110, 240, 0.8, 'laugh') + kidAt('sam', 'handup', 230, 240, 0.8, 'talk') + kidAt('leo', 'cheer', 350, 240, 0.8, 'laugh', true), 'width:100%;height:100%')}</div>
  </div>
</div>`, { foot: FAMFOOT });
}
function glyphRaw(t, onWhite) { return K.glyphInner(t, onWhite); }

// ------------------------------------------------------------------ 22 CERTIFICATE
{
  const art = towerArt(160, 300, ['q', 'j', 'i', 'l', 'q'], 0.88) + kidAt('priya', 'cheer', 330, 300, 0.78, 'laugh') + kidAt('leo', 'cheer', 470, 300, 0.78, 'laugh', true) + kidAt('sam', 'handup', 600, 300, 0.78, 'smile', true) + G('translate(160 -6) scale(.45)', U('star'));
  page('cert', 'Class certificate', `
<div class="cert"><div class="certin">
  <p class="ckick">${NAME} certificate</p>
  <h2 class="ctitle">Our class built a tower of words!</h2>
  <div class="cbig"><span class="blank wide">&nbsp;</span><span>blocks tall</span></div>
  <p class="cline">Class: <span class="blank wide2">&nbsp;</span></p>
  <p class="cline">Date: <span class="blank">&nbsp;</span> &nbsp; Teacher: <span class="blank">&nbsp;</span></p>
  <p class="cmsg">We asked questions, said kind things back, added big ideas and listened to our friends.</p>
  <div class="cart">${svg('0 0 720 320', E(360, 302, 330, 16, C.wash) + art, 'width:100%;height:100%')}</div>
  <div class="cbrand">${LOGO('lockup-horizontal.svg', 26)}<span>playbeforepixels.com</span></div>
</div></div>`, { foot: '© 2026 AlphaPlay LLC · Photos welcome. Please leave out children’s names and faces.' });
}

// ------------------------------------------------------------------ 23 BONUS STORY
page('story', 'Bonus read-aloud story', () => `
<h2 class="h">Bonus: the read-aloud story</h2>
<div class="storygrid">
  <div class="storycov"><img src="story-bonus/story-cover.png" alt="Cover of the bonus story More Talk, Less Tap"></div>
  <div class="storytxt">
    <p class="lead"><b><i>More Talk, Less Tap</i></b> is a 32-page picture-book story that comes free with this kit. Room 5 builds a Talk Tower, one question, joke and idea at a time, until everybody talks at once and… CRASH! Quiet Sam has the idea that saves the day: take turns.</p>
    <p><b>One difference:</b> in the story, yellow blocks are for jokes and laughs. In the game, yellow means <b>comment</b>, saying something back to a friend. Laughing at a friend’s joke still counts!</p>
    <p><b>File:</b> Talk-Tower-Story-Read-Aloud.pdf (square pages). Project it for the group, or print it one or two pages per sheet.</p>
  </div>
</div>
<div class="thumbs">${['p07', 'p13', 'p19', 'p26'].map(n => `<img src="story-bonus/preview/${n}.png" alt="">`).join('')}</div>
<div class="three rtips">
  <section><h3 class="h3" style="color:${C.sky}">Before</h3><ul><li>Show the cover. “What do you think a Talk Tower is?”</li><li>Point to the four blocks. Can anyone guess what each one means?</li></ul></section>
  <section><h3 class="h3" style="color:${C.grass}">During</h3><ul><li>Invite everyone to shout “CLACK!” and “Up it goes!” with you.</li><li>Pause at the crash. “Uh-oh. What should Room 5 do?”</li><li>Give Sam’s quiet idea a moment of wait time.</li></ul></section>
  <section><h3 class="h3" style="color:${C.tomato}">After</h3><ul><li>“Which block would you add first?”</li><li>Play your first ${NAME} round (teacher script, page ${pageNo('script')}).</li><li>The story’s back pages have more talk starters and games.</li></ul></section>
</div>`);

// ------------------------------------------------------------------ 24 TERMS + COPYRIGHT
page('terms', 'License terms and copyright', `
<h2 class="h">License terms</h2>
<p class="lead">Thank you for buying an original resource. Your license depends on what you bought:</p>
<table class="lic"><thead><tr><th></th><th>Single-classroom license<br><span>$6.99</span></th><th>Site license<br><span>$12.99</span></th></tr></thead><tbody>
<tr><td>Who may use it</td><td>One teacher and the children they teach</td><td>All staff at one named school, center or library site</td></tr>
<tr><td>Printing and copies</td><td>Unlimited, for the children in that teacher’s class</td><td>Unlimited, for staff and children at that one site</td></tr>
<tr><td>Projecting and digital</td><td>Project in class. Post only to a password-protected class page for your own class.</td><td>Project in any room at the site. Post only to the site’s password-protected internal system.</td></tr>
<tr><td>Not included</td><td>Colleagues, the whole grade, other schools</td><td>Other sites, a whole district, public posting</td></tr>
</tbody></table>
<div class="buybox"><div><b>More than one classroom?</b> Each extra teacher needs their own single-classroom license, or one site license covers a whole school, center or library site.</div><div><b>Paying by purchase order?</b> Use the written quote form on our website. Site licenses arrive by email with a license certificate naming your site.</div></div>
<div class="two tight">
  <div><h4>Under any license, please don’t</h4><ul class="small">
    <li>sell, share, give away or bundle the files or printed copies;</li><li>post or upload them to public or shared websites, drives or marketplaces;</li>
    <li>remove the copyright notice or license stamp;</li><li>use the kit to make a competing product, or to train or prompt AI systems.</li></ul>
    <p class="small">You <b>may</b> share a link to our shop, or a photo of the game in use showing no more than one page. Full terms and extra licenses: playbeforepixels.com/license</p></div>
  <div><h4>Copyright</h4><p class="small"><b>${NAME} Classroom Game Kit</b> and the bonus story <i>More Talk, Less Tap</i>. First edition 2026.</p>
    <p class="small">© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC. All rights reserved. Published by AlphaPlay LLC, doing business as Play Before Pixels · playbeforepixels.com</p>
    <p class="small">General classroom play ideas; not a program, assessment, screening tool or professional advice. Adults supervise all activities. The characters in the story are imaginary.</p>
    <div class="isbn"><b>ISBN / barcode</b><span>Not needed for this PDF. Only for a future print edition.</span></div></div>
</div>`);

// ------------------------------------------------------------------ 25 MORE FROM PLAY BEFORE PIXELS
page('more', 'More from Play Before Pixels', `
<div class="moretop">${LOGO('lockup-horizontal.svg', 44)}</div>
<h2 class="h" style="text-align:center">More from Play Before Pixels</h2>
<p class="lead" style="text-align:center">Talk, touch and play first, at school and at home.</p>
<div class="mores">
  <div class="mo" style="background:${C.tTomato}"><span class="motag" style="background:${C.tomato}">Next for your class</span><h3>${NAME} Class Cup</h3><p>A term-long, whole-school version: every class builds a hallway tower, with milestone banners and certificates. Coming soon.</p></div>
  <div class="mo" style="background:${C.tGrass}"><span class="motag" style="background:${C.grass}">For families</span><h3>Back-and-Forth Tally</h3><p>A free one-page home game that celebrates everyday back-and-forth talk, with a fridge certificate. Coming soon.</p></div>
  <div class="mo" style="background:${C.tSky}"><span class="motag" style="background:${C.sky}">For little siblings, 0–5</span><h3>52 Play &amp; Talk Cards</h3><p>One simple play and one talk tip on every card, for the youngest talkers at home.</p></div>
</div>
<div class="bonusbox">${qrSvg(128)}<div><h3>Your free bonus</h3><p>Scan for a free printable of extra ${NAME} topic cards and family talk games. We only ask for an email address: no child names, ever.</p><p class="url">playbeforepixels.com/bonus/picture-more-talk-less-tap</p></div></div>
<div class="moreart">${svg('0 0 720 230', E(360, 222, 330, 14, C.wash) + kidAt('priya', 'cheer', 120, 222, 0.72, 'laugh') + kidAt('milo', 'handup', 240, 222, 0.72, 'talk') + towerArt(360, 222, ['q', 'j', 'i'], 0.72) + kidAt('zara', 'point', 480, 222, 0.72, 'smile', true) + kidAt('sam', 'cheer', 600, 222, 0.72, 'laugh', true), 'width:100%;height:100%')}</div>
<p class="share">Loved it? A short review and a photo of your tower (no children’s faces or names, please) help other teachers find us.</p>`);

// ------------------------------------------------------------------ assemble
const total = pages.length;
const DEFFOOT = '© 2026 AlphaPlay LLC · Licensed for one classroom or one site. Please don’t share or post.';
const foot = (i, txt) => `<footer class="foot"><span class="fl">${LOGO('lockup-horizontal.svg', 15)}<span>playbeforepixels.com</span></span><span class="fmid">${txt || DEFFOOT}</span><span class="fr"><em>${VERSION}</em><b>${i + 1}</b></span></footer>`;
const body = pages.map((p, i) => `<!-- ${p.id}: ${p.title} -->\n<section class="page ${p.cls}" style="background:${p.bg}"><div class="body">${typeof p.body === 'function' ? p.body() : p.body}</div>${foot(i, p.foot)}</section>`).join('\n');
const CSS = require('./kitcss.js')(DIM);
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${NAME} Classroom Game Kit (${DIM.label}${INK ? ', ink-saver' : ''}) · Play Before Pixels</title>
<meta name="author" content="AlphaPlay LLC (Play Before Pixels)"><meta name="copyright" content="© 2026 AlphaPlay LLC. All rights reserved. License: playbeforepixels.com/license">
<link rel="stylesheet" href="../../brand/fonts/fonts.css"><style>${CSS}</style></head><body class="${INK ? 'ink' : ''}">${SYMBOLS()}
${body}
</body></html>`;
fs.writeFileSync(OUT, html.split('%BR%').join('../../brand/'));
fs.writeFileSync(path.join(__dirname, `pages-${SIZE}${INK ? '-ink' : ''}.json`), JSON.stringify(pages.map((p, i) => ({ n: i + 1, id: p.id, title: p.title }))));
console.log(`${DIM.label}${INK ? ' ink-saver' : ''}: ${total} pages -> ${path.relative(process.cwd(), OUT)}`);
