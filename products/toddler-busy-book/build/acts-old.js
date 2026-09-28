// Activities for 3-5 years (b3). FOUNDER: rewrite any grown-up text below in your own words, then rebuild.
const { W, H, T, U, rr, tint, slot, SIL, gridPos, kidAt, head, CELL, C, BB } = require('./boards.js');
const { defs } = require('./extra-defs.js');
const { P, bubble } = require('./acts-young.js');

// ---------------- mazes (seeded, so they never change between builds) ----------------
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function makeMaze(cols, rows, seed) {
  const r = rng(seed), seen = new Set(), edges = [], stack = [[0, 0]]; seen.add('0,0');
  while (stack.length) {
    const [x, y] = stack[stack.length - 1];
    const nb = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => [x + dx, y + dy]).filter(([a, b]) => a >= 0 && b >= 0 && a < cols && b < rows && !seen.has(a + ',' + b));
    if (!nb.length) { stack.pop(); continue; }
    const n = nb[Math.floor(r() * nb.length)]; seen.add(n.join(',')); edges.push([[x, y], n]); stack.push(n);
  }
  // solution by BFS
  const adj = {}; edges.forEach(([a, b]) => { (adj[a] = adj[a] || []).push(b); (adj[b] = adj[b] || []).push(a); });
  const goal = [cols - 1, rows - 1], prev = { '0,0': null }, q = [[0, 0]];
  while (q.length) { const c = q.shift(); if (c + '' === goal + '') break; (adj[c] || []).forEach(n => { if (!(n in prev)) { prev[n] = c; q.push(n); } }); }
  const sol = []; for (let c = goal; c; c = prev[c]) sol.unshift(c);
  return { cols, rows, edges, sol };
}
function mazeSvg(m, box, o) {
  const c = Math.min(box.w / m.cols, box.h / m.rows);
  const ox = (box.w - c * m.cols) / 2, oy = (box.h - c * m.rows) / 2;
  const P2 = ([x, y]) => [ox + (x + 0.5) * c, oy + (y + 0.5) * c];
  const d = m.edges.map(([a, b]) => { const [x1, y1] = P2(a), [x2, y2] = P2(b); return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`; }).join('');
  const lw = c * 0.64;
  let s = `<path d="${d}" fill="none" stroke="${o.edge}" stroke-width="${(lw + Math.max(3, c * 0.06)).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="${lw.toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (o.solution) s += `<path d="${m.sol.map((p, i) => (i ? 'L' : 'M') + P2(p).map(v => v.toFixed(1)).join(' ')).join('')}" fill="none" stroke="${C.tomato}" stroke-width="${Math.max(2.5, c * 0.14).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (o.icons) {
    const is = Math.min(c * 0.0085, 1.1);
    const [sx, sy] = P2([0, 0]), [gx, gy] = P2([m.cols - 1, m.rows - 1]);
    s += U(o.from, sx, sy, is * (o.fs || 1)) + U(o.to, gx, gy, is * (o.ts || 1));
  }
  return s;
}
const MAZES = [
  { id: 'maze1', from: 36, cols: 4, rows: 3, seed: 11, a: 'w-duck', b: 'b-pond', fs: 0.8, ts: 0.8, title: 'Help Duck get to the pond', talk: ['Say what you see', '“Up, up… turn! Almost there. Splash!”'], who: 'Duck', where: 'the pond' },
  { id: 'maze2', from: 36, cols: 5, rows: 4, seed: 23, a: 'w-dog', b: 'b-doghouse', fs: 0.85, title: 'Help Dog get home', talk: ['Pause and wait', '“Which way now? (wait) That way! Woof!”'], who: 'Dog', where: 'home' },
  { id: 'maze3', from: 40, cols: 6, rows: 4, seed: 5, a: 'b-bee', b: 'b-flower', title: 'Help Bee find the flower', talk: ['Say what you see', '“Buzz, buzz… oops, dead end! Back we go.”'], who: 'Bee', where: 'the flower' },
  { id: 'maze4', from: 42, cols: 6, rows: 5, seed: 71, a: 'a-car', b: 'a-house', title: 'Drive the car home', talk: ['Offer a choice', '“Left or right? You choose. Beep beep!”'], who: 'the car', where: 'home' },
  { id: 'maze5', from: 44, cols: 7, rows: 5, seed: 9, a: 'b-fish', b: 'b-fishbowl', title: 'Swim, Fish, swim!', talk: ['Follow their lead', '“You found the way! Tell me where you turned.”'], who: 'Fish', where: 'its bowl' },
  { id: 'maze6', from: 48, cols: 8, rows: 6, seed: 42, a: 'b-bird', b: 'b-nest', title: 'Fly Bird to the nest', talk: ['Say what you see', '“Long path… short path… tweet, you did it!”'], who: 'Bird', where: 'the nest' },
  { id: 'maze7', from: 54, cols: 9, rows: 7, seed: 17, a: 'a-rocket', b: 'w-moon', title: 'Rocket to the moon', talk: ['Pause and wait', '“3, 2, 1… (wait) blast off! Which way to the moon?”'], who: 'the rocket', where: 'the moon' },
  { id: 'maze8', from: 54, cols: 10, rows: 8, seed: 3, a: 'b-teddy', b: 'b-bed', title: 'Teddy’s long way to bed', talk: ['Follow their lead', '“You’re the guide. Tell Teddy where to go!”'], who: 'Teddy', where: 'bed' },
];
MAZES.forEach(z => { z.m = makeMaze(z.cols, z.rows, z.seed); });

const b3 = [];
const mazeAct = (z, i) => ({
  id: z.id, band: 'b3', from: z.from, cat: `Mazes · ${i + 1} of 8`, title: z.title, maze: z,
  how: `<b>Finger first.</b> Trace the white path from ${z.who} to ${z.where}. On a laminated page, try again with a dry-erase crayon.`,
  talk: z.talk, easier: i < 2 ? 'Trace it together, your hand over theirs.' : 'Go back to an easier maze, or trace the path together first.', harder: i < 7 ? 'Try the next maze, or do this one backwards, from the end to the start.' : 'Time to draw your own maze for a grown-up to solve!', tired: 'Trace it once with a finger. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page (dry-erase crayon optional)', cut: false,
  safety: 'Grown-up keeps crayon caps. Pages go back in the book when play ends.',
  board: () => mazeSvg(z.m, { w: W, h: H }, { edge: C.tomato + '55', icons: true, from: z.a, to: z.b, fs: z.fs, ts: z.ts }),
});
MAZES.slice(0, 4).forEach((z, i) => b3.push(mazeAct(z, i)));

// ---------------- counting ----------------
const dice = n => ({ 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] })[n];
const countItems = [['w-sun', 0.72], ['w-duck', 0.52], ['b-apple', 0.46], ['w-star', 0.4], ['w-heart', 0.36], ['b-fish', 0.32]];
const countLayout = n => ({ 1: [[0, 0]], 2: [[-44, 0], [44, 0]], 3: [[-56, 18], [0, -26], [56, 18]], 4: [[-36, -30], [36, -30], [-36, 30], [36, 30]], 5: [[-56, -30], [0, -30], [56, -30], [-28, 30], [28, 30]], 6: [[-56, -30], [0, -30], [56, -30], [-56, 30], [0, 30], [56, 30]] })[n];
b3.push({
  id: 'count6', band: 'b3', from: 36, cat: 'Counting', title: 'How many? Match 1 to 6',
  how: '<b>Count, then match.</b> Count the pictures on a card, touching each one. Find the number with the same count of dots.',
  talk: ['Repeat', '“One, two, three apples. Three! Three dots here too!”'], easier: 'Use cards 1, 2 and 3 only.', harder: 'Line the cards up from 1 to 6, then count backwards.', tired: 'Count the ducks on one card. Done.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => gridPos(6, 3, CELL, 12, 36).map(([x, y], i) => slot(x, y, CELL, `<text x="62" y="${CELL.h / 2 + 30}" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="84" fill="${C.ink}">${i + 1}</text>` + dice(i + 1).map(([dx, dy]) => `<circle cx="${150 + dx * 26}" cy="${CELL.h / 2 + dy * 26}" r="10" fill="${C.tomato}"/>`).join(''))).join(''),
  pieces: countItems.map(([id, s], i) => ({ raw: (w, h) => countLayout(i + 1).map(([dx, dy]) => U(id, w / 2 + dx, h / 2 + dy, s)).join(''), tint: C.wash })),
});
b3.push({
  id: 'garden', band: 'b3', from: 40, cat: 'Counting', title: 'Count in the garden',
  how: '<b>Look and count.</b> Pick a picture from the strip at the bottom, then count how many are in the garden.',
  talk: ['Say what you see', '“Let’s count the ladybugs. One, two, three, four… five ladybugs!”'], easier: 'Count the trees and the sun first: small numbers.', harder: 'Count everything with wings: birds and ladybugs!', tired: 'Count the trees. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => {
    const g = 300;
    const items = [U('w-sun', 600, 56, 0.55), U('b-tree', 80, 210, 1.3), U('b-tree', 500, 214, 1.15)];
    [[190, 70], [280, 110], [380, 60]].forEach(([x, y]) => items.push(U('b-bird', x, y, 0.42)));
    [[160, 340], [260, 390], [370, 330], [470, 400]].forEach(([x, y], i) => items.push(U('b-flower', x, y, 0.62, i % 2 ? `style="--pt:${C.plum}"` : '')));
    [[60, 400], [210, 250], [330, 250], [560, 340], [620, 420]].forEach(([x, y]) => items.push(U('b-ladybug', x, y, 0.3)));
    const strip = [['w-sun', 0.28], ['b-tree', 0.3], ['b-bird', 0.32], ['b-flower', 0.32], ['b-ladybug', 0.34]];
    return rr(-12, -12, W + 24, g, 0, C.tSky, 'class="tint"') + rr(-12, g - 40, W + 24, H - g + 80, 0, C.tGrass, 'class="tint"') + items.join('') + `<g transform="translate(26,470)">${strip.map(([id, s], i) => `<g transform="translate(${i * 126},0)">${rr(0, -28, 114, 56, 28, '#FFFFFF', 'class="tint"')}${U(id, 32, 0, s)}${T(84, 9, '?', 26, { w: 700 })}</g>`).join('')}</g>`;
  },
  answer: '1 sun, 2 trees, 3 birds, 4 flowers, 5 ladybugs',
});

// ---------------- patterns ----------------
const patRow = (y, items, label) => `<g transform="translate(0,${y})">${T(0, 0, label, 15, { a: 'start', f: 'Nunito Sans, sans-serif', w: 800, c: '#5B6780', ls: 1.5 })}<g transform="translate(0,14)">${tint(0, 0, W, CELL.h, 20, '#FFFFFF')}${items.map((it, i) => `<circle cx="${56 + i * 100}" cy="${CELL.h / 2}" r="44" fill="${C.wash}" class="tint"/>` + U(it[0], 56 + i * 100, CELL.h / 2, it[1], it[2] || '')).join('')}${slot(W - CELL.w, 0, CELL, T(CELL.w / 2, CELL.h / 2 + 12, '?', 44, { c: '#9AA6BC', w: 700 }))}</g></g>`;
const sq = [['b-s-circle', 0.36, `style="--sf:${C.tomato}"`], ['b-s-square', 0.36, `style="--sf:${C.sky}"`]];
b3.push({
  id: 'patterns1', band: 'b3', from: 42, cat: 'Patterns', title: 'What comes next?',
  how: '<b>Say the pattern out loud.</b> “Apple, banana, apple, banana…” The rhythm helps. Then find the card that comes next.',
  talk: ['Sing and gesture', '“Apple, banana, apple, banana, (wait)… apple!”'], easier: 'Say the pattern and clap it before looking for the card.', harder: 'Make your own pattern with spoons and cups.', tired: 'Clap a pattern: clap, tap, clap, tap.',
  prep: '10 min (cards shared with page after)', mess: 'None', needs: 'The pattern cards (cut once)', cut: false, usesPiecesOf: 'patterns2',
  board: () => patRow(30, [['b-apple', 0.62], ['b-banana', 0.62], ['b-apple', 0.62], ['b-banana', 0.62]], 'PATTERN 1') + patRow(290, [sq[0], sq[1], sq[0], sq[1]], 'PATTERN 2'),
  answer: 'Pattern 1: apple · Pattern 2: circle',
});
b3.push({
  id: 'patterns2', band: 'b3', from: 48, cat: 'Patterns', title: 'What comes next? Tricky ones',
  how: '<b>Say it, then find it.</b> These patterns are longer. Point to each picture as you say it, then choose the next card.',
  talk: ['Pause and wait', '“Duck, frog, frog, duck, frog, (wait)… frog!”'], easier: 'Go back to page one’s patterns, or build these with real toys.', harder: 'Make a pattern with three things: red, blue, yellow…', tired: 'Stomp a pattern: stomp, stomp, jump!',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => patRow(30, [['w-sun', 0.5], ['w-moon', 0.52], ['w-sun', 0.5], ['w-moon', 0.52]], 'PATTERN 3') + patRow(290, [['w-duck', 0.52], ['b-frog', 0.6], ['b-frog', 0.6], ['w-duck', 0.52]], 'PATTERN 4'),
  pieces: [P('b-apple', 'apple'), P('b-banana', 'banana'), P('b-s-circle', 'circle', { art: U('b-s-circle', 0, 0, 1, `style="--sf:${C.tomato}"`), s: 0.95 }), P('b-s-square', 'square', { art: U('b-s-square', 0, 0, 1, `style="--sf:${C.sky}"`), s: 0.95 }), P('w-sun', 'sun'), P('w-moon', 'moon'), P('w-duck', 'duck'), P('b-frog', 'frog')],
  piecesFor: 'the pattern pages',
  answer: 'Pattern 3: sun · Pattern 4: frog',
});

// ---------------- sequencing ----------------
const soil = `<ellipse cx="0" cy="34" rx="46" ry="14" fill="${C.s3}"/>`;
const stages = {
  seed: soil + `<ellipse cx="0" cy="30" rx="7" ry="5" fill="${C.s5}"/>` + [-20, 0, 20].map((x, i) => `<path d="M${x} ${-40 + i * 6}c4 6 4 10 0 10s-4-4 0-10z" fill="${C.sky}"/>`).join(''),
  sprout: soil + `<rect x="-3" y="-6" width="6" height="40" rx="3" fill="${C.grass}"/><path d="M0-4C-10-22-30-22-34-14-24-4-10-2 0-4Z" fill="${C.grass}"/><path d="M0-12C10-30 30-30 34-22 24-12 10-10 0-12Z" fill="${C.grass}"/>`,
  bloom: soil + `<g transform="translate(0,-12) scale(.95)"><use href="#b-flower"/></g>`,
  snow1: `<ellipse cx="0" cy="40" rx="48" ry="8" fill="${C.tSky}"/><circle cx="0" cy="18" r="24" fill="#FFFFFF" stroke="${C.sky}" stroke-width="3"/>`,
  snow2: `<ellipse cx="0" cy="40" rx="48" ry="8" fill="${C.tSky}"/><circle cx="0" cy="18" r="24" fill="#FFFFFF" stroke="${C.sky}" stroke-width="3"/><circle cx="0" cy="-20" r="17" fill="#FFFFFF" stroke="${C.sky}" stroke-width="3"/>`,
  snow3: `<ellipse cx="0" cy="40" rx="48" ry="8" fill="${C.tSky}"/><g transform="translate(0,-4) scale(.9)"><use href="#b-snowman"/></g>`,
  pz1: `<circle r="42" fill="${C.s2}"/><circle r="34" fill="${C.tSun}"/>`,
  pz2: `<circle r="42" fill="${C.s2}"/><circle r="34" fill="${C.tomato}"/>`,
  pz3: `<use href="#b-pizza" transform="scale(.9)"/>` + [[-14, -12], [14, 8], [-8, 18], [16, -16]].map(([x, y]) => `<use href="#b-slice-tomato" transform="translate(${x},${y}) scale(.2)"/>`).join('') + `<use href="#b-pepper" transform="translate(4,-4) scale(.22)"/>`,
  bed1: `<use href="#b-bath"/>`, bed2: `<use href="#b-pjs"/>`, bed3: `<use href="#b-bed"/><g transform="translate(-22,-18) scale(.34)"><use href="#b-teddy"/></g>`,
};
Object.entries(stages).forEach(([k, v]) => defs.add('st-' + k, `<symbol id="st-${k}" overflow="visible">${v}</symbol>`));
const seqBoard = (stories) => () => {
  const colH = `<g>${['1  first', '2  next', '3  last'].map((t, i) => T(CELL.w / 2 + i * (CELL.w + 12), 22, t, 19, { w: 700 })).join('')}</g>`;
  return colH + stories.map((s, r) => `<g transform="translate(0,${44 + r * 240})">${T(0, 14, s.toUpperCase(), 14, { a: 'start', f: 'Nunito Sans, sans-serif', w: 800, c: '#5B6780', ls: 1.5 })}<g transform="translate(0,24)">${[0, 1, 2].map(i => slot(i * (CELL.w + 12), 0, CELL, `<circle cx="26" cy="26" r="15" fill="${C.tomato}"/>` + T(26, 33, i + 1, 18, { c: '#FFFFFF', w: 700 }))).join('')}</g></g>`).join('');
};
b3.push({
  id: 'seq1', band: 'b3', from: 42, cat: 'Little stories', title: 'First, next, last',
  how: '<b>Tell the story in order.</b> Find the three cards for each story. What happens first? Next? Last? Lay them in the boxes.',
  talk: ['Say what you see', '“First, a seed. Next, it grows. Last… a flower!”'], easier: 'Give the first card, then choose between two for “next.”', harder: 'Tell the story back to you in their own words.', tired: 'Tell one story with just your fingers: first, next, last.',
  prep: '10 min (one card sheet for both story pages)', mess: 'None', needs: 'The story cards (cut once)', cut: false, usesPiecesOf: 'seq2',
  board: seqBoard(['Plant a seed', 'Build a snowman']),
  answer: 'Seed → sprout → flower · one ball → two balls → snowman',
});
b3.push({
  id: 'seq2', band: 'b3', from: 44, cat: 'Little stories', title: 'First, next, last: more stories',
  how: '<b>Tell it, then do it.</b> Put the pizza and bedtime stories in order. Tonight, say the bedtime steps together.',
  talk: ['Offer a choice', '“Pajamas or bath first? (wait) Bath first, then pajamas!”'], easier: 'Just the bedtime story: it’s the one they know best.', harder: 'Mix all four stories and sort them into rows.', tired: 'Say tonight’s bedtime steps in order: 1, 2, 3.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: seqBoard(['Make a pizza', 'Bedtime']),
  pieces: [['bloom', 'flower'], ['seed', 'seed'], ['snow2', 'two balls'], ['sprout', 'sprout'], ['snow3', 'snowman'], ['snow1', 'one ball'], ['pz3', 'pizza'], ['bed2', 'pajamas'], ['pz1', 'dough'], ['bed1', 'bath'], ['pz2', 'sauce'], ['bed3', 'bed']].map(([k, w]) => P('st-' + k, w)),
  piecesFor: 'the story pages',
  answer: 'Dough → sauce → pizza · bath → pajamas → bed',
});
b3.push(mazeAct(MAZES[4], 4), mazeAct(MAZES[5], 5));

// ---------------- sorting & thinking ----------------
b3.push({
  id: 'sizes', band: 'b3', from: 38, cat: 'Sorting', title: 'Small, medium, big',
  how: '<b>Line them up.</b> Find the smallest ball and put it first, then the medium one, then the biggest. Same for Teddy.',
  talk: ['Repeat and add one word', '“Small ball. Bigger ball. The BIGGEST ball!”'], easier: 'Only small and big.', harder: 'Line up three real things: spoons, shoes, cups.', tired: 'Find the biggest one. Done.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => ['small', 'medium', 'big'].map((t, i) => T(CELL.w / 2 + i * (CELL.w + 12), 30, t, 22 + i * 4, { w: 700 })).join('') + [0, 1].map(r => [0, 1, 2].map(i => slot(i * (CELL.w + 12), 56 + r * (CELL.h + 30), CELL)).join('')).join(''),
  pieces: [['w-ball', 0.95, 'medium'], ['b-teddy', 0.55, 'small'], ['w-ball', 1.35, 'big'], ['b-teddy', 1.35, 'big'], ['w-ball', 0.55, 'small'], ['b-teddy', 0.95, 'medium']].map(([id, s]) => P(id, '', { s, word: '' })),
});
const oddRows = [[['w-duck', 0.85], ['w-duck', 0.85], ['b-frog', 0.8], ['w-duck', 0.85]], [['b-s-star', 0.62, `style="--sf:${C.sun}"`], ['b-s-heart', 0.62, `style="--sf:${C.tomato}"`], ['b-s-star', 0.62, `style="--sf:${C.sun}"`], ['b-s-star', 0.62, `style="--sf:${C.sun}"`]], [['a-car', 0.8], ['a-car', 0.8], ['a-car', 0.8], ['b-bus', 0.75]], [['b-apple', 0.72], ['b-cupcake', 0.72], ['b-apple', 0.72], ['b-apple', 0.72]]];
b3.push({
  id: 'odd', band: 'b3', from: 40, cat: 'Look & find', title: 'Which one is different?',
  how: '<b>Spot the odd one out.</b> Look along each row. Three are the same and one is different. Point to it and say why.',
  talk: ['Follow their lead', '“That one! Why is it different? (wait) Yes, it’s a frog!”'], easier: 'Do the first row together and say what you see.', harder: 'Make your own row with three spoons and one sock.', tired: 'Do one row. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => oddRows.map((row, r) => `<g transform="translate(0,${r * 131})">${row.map((it, i) => `${tint(i * 171, 0, 159, 119, 18, '#FFFFFF')}${U(it[0], i * 171 + 80, 60, it[1], it[2] || '')}`).join('')}</g>`).join(''),
  answer: 'Row 1: frog · Row 2: heart · Row 3: bus · Row 4: cupcake',
});
b3.push({
  id: 'spot', band: 'b3', from: 44, cat: 'Look & find', title: 'Spot 4 differences',
  how: '<b>Look top, then bottom.</b> The two pictures look the same, but four things changed. Point to each one you find.',
  talk: ['Say what you see', '“The flower was red… now it’s purple! That’s one!”'], easier: 'Give a hint: “Look at the sky.”', harder: 'Tell what’s different in words, then point to check.', tired: 'Find one difference. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => {
    const scene = (y, v) => `<g transform="translate(0,${y})">${tint(0, 0, W, 246, 20, '#FFFFFF')}<svg x="0" y="0" width="${W}" height="246" viewBox="0 0 ${W} 246" overflow="hidden">${rr(0, 170, W, 76, 0, C.tGrass, 'class="tint"')}${U('w-sun', 600, 50, 0.45)}${v ? '' : U('b-cloud', 380, 44, 0.55, `style="--cl:${C.tSky}"`)}${U('b-tree', 110, 130, 1.25)}${v ? '' : U('b-bird', 150, 70, 0.4)}${U('b-pond', 380, 196, 1.5)}${U('w-duck', 390, 176, 0.4)}${U('b-flower', 560, 170, 0.62, v ? `style="--pt:${C.plum}"` : '')}${U('w-ball', 250, 206, v ? 0.3 : 0.22)}</svg></g>`;
    return scene(0, 0) + scene(270, 1);
  },
  answer: 'Cloud gone · bird gone · flower red→purple · ball bigger',
});

// ---------------- pretend play ----------------
b3.push({
  id: 'grocery', band: 'b3', from: 36, cat: 'Pretend play', title: 'Shopping trip',
  how: '<b>Read the list together.</b> Point to each picture on the list, find that food card and put it in the basket.',
  talk: ['Say what you see', '“Milk is on the list. Got it! What’s next?”'], easier: 'Just two things on the list: point and fetch.', harder: 'Swap roles: your child writes (draws) a list for you.', tired: 'Fetch one thing from the list. Done.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => `${tint(0, 0, 220, H, 18, '#FFFFFF')}${T(110, 50, 'Our list', 28)}${[['b-apple', 'apples'], ['b-bread', 'bread'], ['b-milk', 'milk'], ['b-banana', 'bananas']].map(([id, n], i) => `<g transform="translate(24,${88 + i * 104})">${rr(0, 0, 30, 30, 8, '#FFFFFF', `stroke="${C.ink}" stroke-width="2.5"`)}${U(id, 84, 16, 0.5)}${T(126, 24, n, 19, { a: 'start' })}</g>`).join('')}` + `<g transform="translate(234,0)">${tint(0, 0, 438, H, 18, C.tSun)}${U('a-basket', 219, 300, 3.2)}${T(219, 60, 'Basket', 26)}</g>`,
  pieces: [P('b-apple', 'apples'), P('b-bread', 'bread'), P('b-milk', 'milk'), P('b-banana', 'bananas'), P('b-cheese', 'cheese'), P('b-pear', 'pear'), P('b-cupcake', 'cupcake'), P('b-toast', 'toast')],
});
const houseCols = [[C.tomato, C.tTomato, 'red'], [C.sun, C.tSun, 'yellow'], [C.sky, C.tSky, 'blue'], [C.grass, C.tGrass, 'green']];
defs.add('pp-house', `<symbol id="pp-house" overflow="visible"><path d="M-70-20L0-80 70-20Z" fill="var(--rf)" stroke="var(--rf)" stroke-width="10" stroke-linejoin="round"/><rect x="-60" y="-24" width="120" height="100" rx="4" fill="var(--bd)"/><rect x="-18" y="18" width="36" height="58" rx="18" fill="var(--rf)"/><rect x="-48" y="0" width="24" height="24" rx="3" fill="#FFFFFF"/><rect x="24" y="0" width="24" height="24" rx="3" fill="#FFFFFF"/></symbol>`);
b3.push({
  id: 'post', band: 'b3', from: 40, cat: 'Pretend play', title: 'Post office',
  how: '<b>Deliver the mail.</b> Look at a letter’s stamp color and number. Take it to the house with the same color door and number.',
  talk: ['Offer a choice', '“This one has a blue stamp. Is it for house 3 or house 1?”'], easier: 'Match colors only; ignore the numbers.', harder: 'Knock-knock! Pretend to be the neighbor who opens the door.', tired: 'Deliver one letter. Knock, knock. Done.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => houseCols.map(([c, t, n], i) => { const x = (i % 2) * 348, y = Math.floor(i / 2) * 270; return `<g transform="translate(${x},${y})">${tint(0, 0, 324, 246, 20, '#FFFFFF')}<g transform="translate(120,150)" style="--rf:${c};--bd:${t}"><use href="#pp-house"/></g><text x="120" y="96" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="34" fill="#FFFFFF">${i + 1}</text>${T(250, 120, 'House', 18, { c: '#5B6780' })}${T(250, 168, i + 1, 54, { w: 700 })}</g>`; }).join(''),
  pieces: [0, 2, 1, 3, 2, 0, 3, 1].map(i => ({ raw: (w, h) => `<g transform="translate(${w / 2},${h / 2 - 4}) scale(1.45)"><use href="#a-mail"/></g><g class="keepc"><rect x="${w / 2 + 28}" y="${h / 2 - 50}" width="38" height="44" rx="4" fill="${houseCols[i][0]}"/></g><text x="${w / 2 + 47}" y="${h / 2 - 18}" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="26" fill="#FFFFFF">${i + 1}</text>`, word: `for house ${i + 1}`, tint: C.wash })),
});
b3.push({
  id: 'cafe', band: 'b3', from: 36, cat: 'Pretend play', title: 'Our café',
  how: '<b>Take turns ordering.</b> One of you orders from the menu; the other serves the cards onto the plates. Then swap.',
  talk: ['Offer a choice', '“Would you like toast or a cupcake today?”'], easier: 'One plate, one order, lots of “yum!”', harder: 'Take three orders and remember them all.', tired: 'Order one thing. Pretend to sip tea. Done.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => {
    const menu = [['b-cupcake', 'cupcake'], ['b-toast', 'toast'], ['b-cake', 'cake'], ['b-milk', 'milk'], ['a-teapot', 'tea'], ['b-pizza', 'pizza']];
    return `${tint(0, 0, 250, H, 18, '#FFFFFF')}${T(125, 48, 'Menu', 32)}${menu.map(([id, n], i) => `<g transform="translate(${20 + (i % 2) * 110},${76 + Math.floor(i / 2) * 142})">${rr(0, 0, 100, 128, 14, C.wash, 'class="tint"')}${U(id, 50, 52, 0.62)}${T(50, 112, n, 16)}</g>`).join('')}` +
      `<g transform="translate(264,0)">${tint(0, 0, 408, H, 18, C.tPlum)}${T(204, 48, 'Serve here', 26)}${[[104, 180], [304, 180], [204, 400]].map(([x, y]) => `<circle class="tint" cx="${x}" cy="${y}" r="96" fill="#FFFFFF"/><circle cx="${x}" cy="${y}" r="78" fill="none" stroke="${C.tPlum}" stroke-width="5"/>`).join('')}</g>`;
  },
  pieces: [P('b-cupcake', 'cupcake'), P('b-toast', 'toast'), P('b-cake', 'cake'), P('b-milk', 'milk'), P('a-teapot', 'tea', { s: 1.2 }), P('b-pizza', 'pizza'), P('b-banana', 'banana'), P('b-apple', 'apple'), P('b-pear', 'pear')],
});
b3.push({
  id: 'rocket', band: 'b3', from: 36, cat: 'Pretend play', title: 'Blast off to the moon',
  how: '<b>Count down and fly.</b> Crouch down low together, count down from 5, and jump up on “blast off!” Fly a finger to the moon.',
  talk: ['Pause and wait', '“5, 4, 3, 2, 1… (wait) BLAST OFF!”'], easier: 'Count down from 3.', harder: 'Plan the trip: “What will we pack? Who’s coming?”', tired: 'Count down from 5 with your fingers. Whoosh!',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => {
    const st = [[40, 40, .2], [180, 90, .14], [300, 40, .18], [420, 120, .12], [80, 250, .16], [620, 280, .14], [520, 420, .18], [240, 460, .12], [360, 230, .1]];
    return st.map(([x, y, s]) => U('w-star', x, y, s)).join('') + U('w-moon', 560, 110, 1.45) + `<path d="M150 440C220 360 330 330 420 250" stroke="#FFFFFF" stroke-width="10" stroke-dasharray="4 20" stroke-linecap="round" fill="none"/>` + `<g transform="translate(120,420) rotate(40)">${U('a-rocket', 0, 0, 1.7)}</g>` +
      [5, 4, 3, 2, 1].map((n, i) => `<g transform="translate(${220 + i * 64},${470 - i * 40})"><circle r="24" fill="#FFFFFF" class="tint"/>${T(0, 9, n, 26, { w: 700 })}</g>`).join('');
  },
  panel: 'plum',
});
b3.push({
  id: 'town', band: 'b3', from: 36, cat: 'Pretend play', title: 'Drive around town',
  how: '<b>Drive a finger (or a big toy car).</b> Visit each place in town. At every stop, say where you are and what you’ll do there.',
  talk: ['Follow their lead', '“Where to next? The café! Beep beep. What will you order?”'], easier: 'Drive from home to the park and back.', harder: 'Give directions: “Turn at the pond, stop at the shop.”', tired: 'Drive home. Beep. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => {
    const road = `<g fill="none" stroke="#D5DCE8" stroke-width="54" stroke-linecap="round" class="tint"><path d="M40 130H632M40 380H632M200 40V480M470 40V480"/></g><g fill="none" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="12 12"><path d="M40 130H632M40 380H632M200 40V480M470 40V480"/></g>`;
    const place = (x, y, id, s, n) => U(id, x, y, s) + `<g transform="translate(${x},${y + 62})">${rr(-n.length * 5.5 - 12, -14, n.length * 11 + 24, 28, 14, '#FFFFFF', 'class="tint"')}${T(0, 6, n, 16)}</g>`;
    return road + place(100, 240, 'a-house', 0.8, 'home') + place(335, 235, 'b-tree', 0.85, 'park') + place(580, 238, 'a-basket', 0.8, 'shop') + place(100, 440 - 20, 'b-pond', 0.9, 'pond') + place(335, 425, 'a-teapot', 0.75, 'café') + place(580, 425, 'a-mail', 0.8, 'post office') + U('a-car', 260, 130, 0.5);
  },
  safety: 'Toy cars for younger brothers and sisters must be bigger than a toilet-paper tube.',
});
b3.push(mazeAct(MAZES[6], 6));

// ---------------- words & rhymes ----------------
const rhymes = [['w-cat', 'cat', 'b-sunhat', 'hat'], ['w-moon', 'moon', 'b-spoon', 'spoon'], ['b-bee', 'bee', 'b-tree', 'tree'], ['a-car', 'car', 'w-star', 'star'], ['b-fish', 'fish', 'b-dish', 'dish'], ['b-frog', 'frog', 'b-log', 'log']];
b3.push({
  id: 'rhyme', band: 'b3', from: 42, cat: 'Rhymes', title: 'Rhyme time',
  how: '<b>Listen for the rhyme.</b> Say both words slowly: “cat… hat.” They sound alike at the end. Find each picture’s rhyming friend.',
  talk: ['Sing and gesture', '“Cat, hat! Moon, spoon! Frog… (wait) log!”'], easier: 'Say two choices: “Cat… hat or spoon?”', harder: 'Make up silly rhymes: cat, hat, splat, zat!', tired: 'Say one rhyme pair and laugh. Done.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => gridPos(6, 3, CELL, 12, 36).map(([x, y], i) => slot(x, y, CELL, `<g transform="translate(20,20)">${rr(0, 0, 80, 80, 16, C.wash, 'class="tint"')}${U(rhymes[i][0], 40, 40, 0.58)}</g>` + T(150, 60, rhymes[i][1], 26, { w: 700 }) + T(CELL.w / 2, CELL.h - 36, 'rhymes with…', 15, { c: '#9AA6BC' }))).join(''),
  pieces: [3, 5, 0, 4, 1, 2].map(i => P(rhymes[i][2], rhymes[i][3], { s: rhymes[i][2] === 'w-star' ? 0.95 : 1.1 })),
  answer: 'cat–hat · moon–spoon · bee–tree · car–star · fish–dish · frog–log',
});
const rooms = [['kitchen', 'b-fridge', C.tSun], ['bathroom', 'b-bath', C.tSky], ['bedroom', 'b-bed', C.tPlum]];
b3.push({
  id: 'rooms', band: 'b3', from: 40, cat: 'Sorting', title: 'Where does it go?',
  how: '<b>Tidy up the house.</b> Pick a card and ask “Where does this live?” Put it in the kitchen, bathroom or bedroom.',
  talk: ['Offer a choice', '“Toothbrush: kitchen or bathroom? (wait) Bathroom!”'], easier: 'Two rooms only: kitchen and bedroom.', harder: 'Walk to the real rooms and find one thing in each.', tired: 'Put one card in the right room.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => rooms.map(([n, id, t], i) => `<g transform="translate(${i * 228},0)">${tint(0, 0, 216, H, 20, t)}${U(id, 108, 90, 0.9)}${T(108, 176, n, 24)}${rr(20, 200, 176, 296, 16, '#FFFFFF', 'class="tint" opacity=".7"')}</g>`).join(''),
  pieces: [P('a-teapot', 'teapot', { s: 1.2 }), P('b-toothbrush', 'toothbrush'), P('b-teddy', 'teddy'), P('a-pot', 'pot', { s: 1.05 }), P('a-towel', 'towel', { s: 1.2 }), P('b-lamp', 'lamp'), P('b-spoon', 'spoon', { s: 1.1 }), P('a-bubbles', 'bubbles', { s: 1.2 }), P('b-pjs', 'pajamas')],
  answer: 'Kitchen: teapot, pot, spoon · Bathroom: toothbrush, towel, bubbles · Bedroom: teddy, lamp, pajamas',
});
b3.push({
  id: 'feelstory', band: 'b3', from: 36, cat: 'Feelings', title: 'How do they feel?',
  how: '<b>Read the faces.</b> Look at each picture. How does the child feel? How can you tell? What might happen next?',
  talk: ['Say what you see', '“Uh-oh, the cup fell. She looks surprised. What would you do?”'], easier: 'Just name the feeling: happy, surprised, sleepy.', harder: 'Tell a time you felt that way.', tired: 'Pick one picture and make that face.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => [['uh-oh', 'surprised?'], ['hug', 'loved?'], ['wow', 'amazed?'], ['night-night', 'sleepy?']].map(([w, q], i) => { const x = (i % 2) * 348, y = Math.floor(i / 2) * 270; const art = BB.scenes[w](); const bg = (art.match(/fill="(#[0-9A-Fa-f]{6})"/) || [])[1]; return `<g transform="translate(${x},${y})">${tint(0, 0, 324, 246, 20, bg)}<svg x="0" y="0" width="324" height="246" viewBox="40 150 520 395" overflow="hidden">${art}</svg>${rr(12, 200, q.length * 11 + 30, 34, 17, '#FFFFFF', 'class="tint"')}${T(27 + q.length * 5.5, 223, q, 17)}</g>`; }).join(''),
});
defs.add('clip-l', `<clipPath id="halfL" clipPathUnits="userSpaceOnUse"><rect x="-200" y="-200" width="200" height="400"/></clipPath><clipPath id="halfR" clipPathUnits="userSpaceOnUse"><rect x="0" y="-200" width="200" height="400"/></clipPath>`);
const halves = [['b-apple', 1.55], ['w-ball', 1.6], ['b-s-heart', 1.55, `style="--sf:${C.tomato}"`], ['a-house', 1.65]];
b3.push({
  id: 'halves', band: 'b3', from: 42, cat: 'Matching', title: 'Finish the picture',
  how: '<b>Find the other half.</b> Each picture is missing its right side. Find the card that finishes it and slide it into the box.',
  talk: ['Say what you see', '“Half an apple… where’s the other half? There! A whole apple!”'], easier: 'Give two cards to choose from.', harder: 'Cover half of a real toy with a cloth: “What is it?”', tired: 'Finish one picture. Done.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => halves.map(([id, s, st], i) => { const x = (i % 2) * 348 + 110, y = Math.floor(i / 2) * 250 + 20; return `<g transform="translate(${x - 110},${y})">${tint(0, 0, 330, CELL.h, 18, '#FFFFFF')}</g>` + slot(x, y, CELL, '', { fill: C.wash }) + `<g transform="translate(${x + 4},${y + CELL.h / 2})"><g clip-path="url(#halfL)"><use href="#${id}" transform="scale(${s})" ${st || ''}/></g></g>`; }).join(''),
  pieces: [2, 0, 3, 1].map(i => ({ raw: (w, h) => `<g transform="translate(4,${h / 2})"><g clip-path="url(#halfR)"><use href="#${halves[i][0]}" transform="scale(${halves[i][1]})" ${halves[i][2] || ''}/></g></g>`, tint: C.wash })),
});
b3.push({
  id: 'ispy', band: 'b3', from: 36, cat: 'Look & find', title: 'I spy at the pond',
  how: '<b>Play I spy.</b> Pick a picture from the strip and say “I spy something…” with one clue. Your child finds it in the big picture.',
  talk: ['Say what you see', '“I spy something yellow that says quack!”'], easier: 'Point to a strip picture, then find it together.', harder: 'Your child gives the clues and you guess.', tired: 'Find the duck. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => {
    const g = 230;
    return rr(-12, g, W + 24, H - g + 12, 0, C.tGrass, 'class="tint"') + U('w-sun', 610, 60, 0.6) + U('b-cloud', 200, 50, 0.7, `style="--cl:#FFFFFF"`) + U('b-tree', 80, 196, 1.5) + U('b-bird', 110, 120, 0.4) +
      `<ellipse cx="380" cy="330" rx="200" ry="70" fill="${C.sky}" opacity=".85"/>` + U('w-duck', 330, 312, 0.55) + U('b-boat', 450, 300, 0.7) + U('b-frog', 560, 380, 0.5) + U('b-fish', 400, 350, 0.36) +
      kidAt('E', 190, 400, 1.2, { face: 'laugh', aR: -120 }) + U('w-dog', 90, 390, 0.62) + U('b-bee', 560, 210, 0.36) + U('b-flower', 630, 250, 0.5) + U('b-shovel-pail', 640, 440, 0.55) +
      `<g transform="translate(18,482)">${[['w-duck', 0.3], ['b-boat', 0.34], ['b-frog', 0.3], ['w-dog', 0.3], ['b-bee', 0.32], ['b-shovel-pail', 0.3], ['b-fish', 0.3]].map(([id, s], i) => `<g transform="translate(${i * 92},0)">${rr(0, -26, 82, 52, 26, '#FFFFFF', 'class="tint"')}${U(id, 41, 0, s)}</g>`).join('')}</g>`;
  },
});
const roadPage = (id, title, d, a, b, from) => ({
  id, band: 'b3', from, cat: 'Mazes · roads', title,
  how: '<b>Stay on the road.</b> Drive a finger from start to finish without leaving the road. On a laminated page, use a dry-erase crayon.',
  talk: ['Say what you see', id === 'wavy' ? '“Wiggle, wiggle, curve… you made it!”' : '“Up the hill, down the hill, zig, zag!”'], easier: 'Slow and steady: say “slow” as you go.', harder: 'Trace it with your other hand, or with eyes closed and a grown-up guiding.', tired: 'Drive it once with a finger. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page (dry-erase crayon optional)', cut: false,
  safety: 'Grown-up keeps crayon caps. Pages go back in the book when play ends.',
  board: () => `<path d="${d}" fill="none" stroke="${C.tomato}55" stroke-width="86" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="78" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#D5DCE8" stroke-width="3" stroke-dasharray="10 12" stroke-linecap="round"/>` + U(a[0], a[1], a[2], a[3]) + U(b[0], b[1], b[2], b[3]),
});
b3.push(roadPage('wavy', 'Wiggly road', 'M60 90C200 -20 200 220 336 150S470 20 612 110M612 110C640 250 480 250 400 330S160 300 110 420', ['a-car', 60, 90, 0.62], ['a-house', 110, 420, 0.75], 36));
b3.push(roadPage('zigzag', 'Zig-zag mountain road', 'M50 460L160 250 260 440 360 210 460 420 560 170 620 60', ['b-bus', 50, 452, 0.58], ['a-tent', 620, 60, 0.7], 40));
b3.push(mazeAct(MAZES[7], 7));

module.exports = { b3, MAZES, mazeSvg };
