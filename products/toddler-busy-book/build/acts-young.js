// Activities for 1-2 years (b1) and 2-3 years (b2).
// FOUNDER: every word a grown-up reads is in the text fields below (how, talk, easier, harder, tired).
// Rewrite them in your own words, then run build/make-all.sh. Git keeps every version as a record of your authorship.
const { W, H, T, U, rr, tint, slot, SIL, gridPos, kidAt, head, CELL, BIG, C, BB } = require('./boards.js');
const { defs } = require('./extra-defs.js');

const P = (id, word, o = {}) => Object.assign({ art: U(id, 0, 0, 1), word, tint: o.tint || C.wash }, o);
const bubble = (x, y, s, fill = '#FFFFFF') => `<g transform="translate(${x},${y})">${rr(-s.length * 6.2 - 14, -20, s.length * 12.4 + 28, 38, 19, fill)}<path d="M-6 16L-14 30 6 16Z" fill="${fill}"/>${T(0, 7, s, 21)}</g>`;

// ---------------- first-words pages (art reused from the Up! Go! More! board book) ----------------
const WORDTEXT = {
  hi: { from: 12, talk: ['Pause and wait', '“Hi! (wave… and wait) Hi, hi!”'], easier: 'Just wave and smile. A look back counts as a turn.', harder: 'Say hi to everyone in the picture, then to a toy, then to the mirror.', tired: 'Wave at the page, then at each other. That’s it.' },
  ball: { from: 12, talk: ['Repeat and add one word', '“Ball! Big ball. Roll, ball!”'], easier: 'Hold a real ball next to the picture and say “ball.”', harder: 'Ask “Where’s the ball?” and wait for a point.', tired: 'Point, say “ball,” roll a real ball once. Done.' },
  up: { from: 12, talk: ['Pause and wait', '“Up… up… (wait) UP!”'], easier: 'Lift your own arms and say it. Your child just watches.', harder: 'Stop before “up!” and let them fill the gap with any sound.', tired: 'Reach up high together three times.' },
  cup: { from: 12, talk: ['Say what you see', '“Cup. Your cup. Sip, sip… ahh!”'], easier: 'Hold their real cup next to the picture.', harder: 'Offer a choice: “Blue cup or red cup?” A point is an answer.', tired: 'Pretend to sip from the picture. “Ahh!”' },
  shoe: { from: 12, talk: ['Follow their lead', '“Shoe! Where’s your shoe? Shoe on!”'], easier: 'Touch the picture, then touch their shoe.', harder: 'Find two real shoes and say “two shoes!”', tired: 'Stomp, stomp your feet together.' },
  book: { from: 12, talk: ['Follow their lead', '“Book! Open the book… wow!”'], easier: 'Let them pat the page while you say “book.”', harder: 'Let them choose a real book next and name what they point at.', tired: 'Clap hands shut and open like a book.' },
  more: { from: 12, talk: ['Pause and wait', '“More? (wait) More! Here’s more.”'], easier: 'Tap your fingertips together as you say “more.”', harder: 'Pause a game and wait for a sign, sound or look before you go on.', tired: 'Tickle once, stop, ask “more?” Repeat.' },
  'uh-oh': { from: 12, talk: ['Say what you see', '“Uh-oh! It fell down. Uh-oh!”'], easier: 'Make a big surprised face. That’s the whole game.', harder: 'Drop a soft toy on purpose and wait for them to say it.', tired: 'Say “uh-oh!” with hands on cheeks. Giggle.' },
  'bye-bye': { from: 12, talk: ['Sing and gesture', '“Bye-bye, dog! Bye-bye, duck! Bye-bye, book!”'], easier: 'Wave for them. Watching counts.', harder: 'Say bye-bye to everything in the room before you leave.', tired: 'Blow a kiss to the page: “mwah!”' },
  'night-night': { from: 12, talk: ['Repeat', '“Night-night, moon. Night-night, duck. Shhh…”'], easier: 'Whisper it, slowly. Quiet voices are lovely to copy.', harder: 'Tuck in three toys and say night-night to each.', tired: 'Whisper “night-night” and rest your heads together.' },
  go: { from: 24, talk: ['Pause and wait', '“Ready, set… (wait) GO!”'], easier: 'Say the whole thing and zoom a toy car.', harder: 'Stop after “Ready, set…” and let your child say “go!”', tired: 'Say “ready, set, go!” and clap on go.' },
  stop: { from: 24, talk: ['Say what you see', '“Go, go, go… STOP!”'], easier: 'Hold up a flat hand as you say it.', harder: 'Swap turns: your child says “stop!” and you freeze.', tired: 'Walk fingers across the page, then freeze.' },
  down: { from: 24, talk: ['Sing and gesture', '“Down, down, dooown the slide!”'], easier: 'Slide a finger down the picture as you say it.', harder: 'Ask: “What else goes down?” A spoon? A block?', tired: 'Crouch down low together. “Dooown!”' },
  in: { from: 24, talk: ['Repeat', '“In it goes… plop! In! In! In!”'], easier: 'Drop a big block into a bowl for them to watch.', harder: 'Try “in” and “out” with the same bowl.', tired: 'Put one sock in a shoe. “In!”' },
  open: { from: 24, talk: ['Pause and wait', '“Open? (wait) Open the box!”'], easier: 'Open and close your hands like a box.', harder: 'Hold a lidded box shut and wait for them to ask.', tired: 'Open and shut your hands three times.' },
  help: { from: 24, talk: ['Offer a choice', '“Help, please? I can help! Up it goes.”'], easier: 'Model it: “Help, please!” and do it together.', harder: 'Put a toy just out of reach and wait for a point, sign or word.', tired: 'Ask your child to help you turn the page.' },
  clap: { from: 24, talk: ['Sing and gesture', '“Clap, clap, clap! Your turn!”'], easier: 'Clap their hands gently in yours.', harder: 'Clap a pattern: slow, slow, fast-fast. Can they copy?', tired: 'Clap three times, then high-five.' },
  'all done': { from: 24, talk: ['Offer a choice', '“More, or all done?” (hold up a hand for each)'], easier: 'Shake open hands and say it at the end of snack.', harder: 'Let them decide when a game is all done, and say it together.', tired: 'Shake hands side to side: “all done!”' },
};
function wordAct(w, band) {
  const m = BB.WORDS.find(x => x.w === w); if (!m) throw new Error('board book has no word ' + w);
  const t = WORDTEXT[w];
  return {
    id: 'w-' + w.replace(/\s/g, ''), band, from: t.from, cat: 'First words', kind: 'word', word: m, title: `First words: “${w}”`,
    how: `<b>Point, say, do.</b> Point to the picture, say the word, then do it together: ${m.cue[1].replace(/!$/, '')}.`,
    talk: t.talk, easier: t.easier, harder: t.harder, tired: t.tired, prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
    safety: 'Pages are for pointing and patting, not mouthing: hold the page for your child.',
  };
}

// ---------------- 1-2 years ----------------
const b1 = [];
['hi', 'ball', 'up', 'cup', 'shoe'].forEach(w => b1.push(wordAct(w, 'b1')));

const animalTile = (x, y, w, h, id, name, sound, s, tintC) => `<g transform="translate(${x},${y})">${tint(0, 0, w, h, 20, '#FFFFFF')}${U(id, w / 2, h / 2 + 4, s)}${T(20, h - 20, name, 26, { a: 'start' })}${bubble(w - 70, 44, sound, tintC)}</g>`;
b1.push({
  id: 'moo', band: 'b1', from: 12, cat: 'Animal sounds', title: 'Who says “moo”?',
  how: '<b>Point and moo.</b> Point to an animal, make its sound, then wait. Any sound back is a turn, even a squeal.',
  talk: ['Pause and wait', '“The cow says… (wait) MOO!”'], easier: 'Make the sound for them and pat the picture.', harder: 'Say the sound first and let them find the animal.', tired: 'Pick one animal. Make its sound three times. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => { const w = 324, h = 246; return animalTile(0, 0, w, h, 'b-cow', 'cow', 'moo!', 1.7, C.tGrass) + animalTile(348, 0, w, h, 'b-pig', 'pig', 'oink!', 1.7, C.tGrass) + animalTile(0, 270, w, h, 'b-sheep', 'sheep', 'baa!', 1.75, C.tGrass) + animalTile(348, 270, w, h, 'w-duck', 'duck', 'quack!', 1.5, C.tGrass); },
});
b1.push({
  id: 'woof', band: 'b1', from: 12, cat: 'Animal sounds', title: 'Who says “woof”?',
  how: '<b>Point and play.</b> Name the animal, make its sound, and add a move: pant like the dog, hop like the frog.',
  talk: ['Sing and gesture', '“Woof woof! Dog says woof. Hop, hop, ribbit!”'], easier: 'Just the sounds, nice and slow.', harder: 'Mix them up: “Does the cat say woof?” Silly questions make great talk.', tired: 'Hop like the frog once. Ribbit!',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => { const w = 324, h = 246; return animalTile(0, 0, w, h, 'w-dog', 'dog', 'woof!', 1.55, C.tGrass) + animalTile(348, 0, w, h, 'w-cat', 'cat', 'meow!', 1.5, C.tGrass) + animalTile(0, 270, w, h, 'b-bird', 'bird', 'tweet!', 1.8, C.tGrass) + animalTile(348, 270, w, h, 'b-frog', 'frog', 'ribbit!', 1.75, C.tGrass); },
});

b1.push({
  id: 'duckfind', band: 'b1', from: 15, cat: 'Look & find', title: 'Peekaboo, duck!',
  how: '<b>Find the ducks.</b> Three ducks are hiding. Ask “Where’s duck?” and let your child find them, with a point or a pat.',
  talk: ['Say what you see', '“There’s duck! Duck is in the bath. Peekaboo, duck!”'], easier: 'Point to one duck and say “there’s duck!” together.', harder: 'Count the ducks with a finger: one, two, three.', tired: 'Find one duck. Say “peekaboo!” Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => {
    const floor = 430;
    return rr(-12, floor, W + 24, H - floor + 12, 0, '#FFFFFF', 'class="tint"') +
      U('w-duck', 118, 262, 0.95) + U('b-sofa', 150, 350, 2.5) +
      U('w-duck', 382, 300, 0.85) + U('a-box', 380, 370, 1.45) +
      U('b-bath', 560, 370, 1.9) + `<g transform="translate(540,284)">${U('w-duck', 0, 0, 0.62)}</g>` +
      U('b-lamp', 268, 336, 1.25) + U('w-ball', 300, 410, 0.36);
  },
});

const bigSlotsBoard = (items) => () => gridPos(4, 2, BIG, 24, 12).map(([x, y], i) => slot(x, y, BIG, `${U(items[i][0], BIG.w / 2, BIG.h / 2 - 8, items[i][1] || 1.55)}${T(BIG.w / 2, BIG.h - 20, items[i][2], 19)}`)).join('');
b1.push({
  id: 'same-toys', band: 'b1', from: 15, cat: 'Matching', title: 'Same, same! Toys',
  how: '<b>Match picture to picture.</b> Hand over one big card. Show how to lay it on its twin, then let them try.',
  talk: ['Repeat and add one word', '“Ball! Same ball. Ball on ball!”'], easier: 'Use two cards only, and place the first one together.', harder: 'Lay out all four cards and ask for one by name: “Where’s the cup?”', tired: 'Place one card on its twin. Clap. Done.',
  prep: '5 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cell: 'big', cols: 2,
  board: bigSlotsBoard([['w-ball', 1.3, 'ball'], ['w-cup', 1.35, 'cup'], ['w-shoe', 1.35, 'shoe'], ['w-book', 1.2, 'book']]),
  pieces: [P('w-ball', 'ball', { s: 1.3 }), P('w-cup', 'cup', { s: 1.35 }), P('w-shoe', 'shoe', { s: 1.35 }), P('w-book', 'book', { s: 1.2 })],
});
b1.push({
  id: 'same-animals', band: 'b1', from: 15, cat: 'Matching', title: 'Same, same! Animals',
  how: '<b>Match and make the sound.</b> Each time a card lands on its twin, make that animal’s sound together.',
  talk: ['Pause and wait', '“Dog on dog! The dog says… (wait) woof!”'], easier: 'Start with the duck and dog only.', harder: 'Turn cards face down and flip one: “Who is it?”', tired: 'Make one animal sound, place one card. Done.',
  prep: '5 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cell: 'big', cols: 2,
  board: bigSlotsBoard([['w-dog', 1.15, 'dog'], ['w-cat', 1.15, 'cat'], ['w-duck', 1.15, 'duck'], ['b-fish', 1.35, 'fish']]),
  pieces: [P('w-dog', 'dog', { s: 1.15 }), P('w-cat', 'cat', { s: 1.15 }), P('w-duck', 'duck', { s: 1.15 }), P('b-fish', 'fish', { s: 1.35 })],
});

b1.push({
  id: 'drum', band: 'b1', from: 12, cat: 'Sing & move', title: 'Drum along!',
  how: '<b>Tap and sound.</b> Pat each drum on the page with a flat hand while you say its sound. Big drum, big sound.',
  talk: ['Sing and gesture', '“Boom! Boom! Big drum. Tap, tap, little drum.”'], easier: 'Pat together, hand over hand.', harder: 'Play loud, then quiet. Can your child copy?', tired: 'Pat the table like a drum three times.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => U('b-drum', 150, 300, 2.7) + U('b-drum', 400, 330, 1.9) + U('b-drum', 580, 355, 1.3) + bubble(150, 110, 'BOOM!') + bubble(400, 180, 'boom') + bubble(580, 238, 'tap') ,
});
b1.push({
  id: 'biglittle', band: 'b1', from: 18, cat: 'Big & little', title: 'Big and little',
  how: '<b>Say it with your voice.</b> Use a big, deep voice for big things and a tiny squeaky voice for little ones.',
  talk: ['Say what you see', '“BIG ball! (tiny voice) little ball.”'], easier: 'Just the balls. Point and use your two voices.', harder: 'Ask “Which one is little?” and wait for a point.', tired: 'Say “big” with arms wide and “little” with a pinch.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => [['w-ball', 'ball'], ['w-duck', 'duck'], ['b-teddy', 'teddy']].map(([id, n], i) => { const y = i * 172; return `<g transform="translate(0,${y})">${tint(0, 0, W, 160, 20, '#FFFFFF')}${U(id, 150, 82, 1.35)}${U(id, 400, 106, 0.55)}${T(150, 152, 'big', 20, { w: 700 })}${T(400, 152, 'little', 15)}${T(560, 92, n, 30, { a: 'start' })}</g>`; }).join(''),
});
b1.push({
  id: 'teddy', band: 'b1', from: 18, cat: 'Pretend play', title: 'Lunch for Teddy',
  how: '<b>Feed Teddy.</b> Your child picks a food card and puts it on Teddy’s plate. Teddy says “yum!” (That’s your job.)',
  talk: ['Offer a choice', '“Banana or toast for Teddy? Toast! Yum, yum!”'], easier: 'Offer just two cards.', harder: 'Let your child be the grown-up: “Is Teddy hungry? What next?”', tired: 'One card on the plate. Teddy says “yum!”',
  prep: '5 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cell: 'big', cols: 2,
  board: () => U('b-teddy', 150, 280, 2.8) + `<circle class="tint" cx="470" cy="280" r="190" fill="#FFFFFF"/><circle cx="470" cy="280" r="150" fill="none" stroke="#E3E8F0" stroke-width="6"/>` + slot(470 - BIG.w / 2, 280 - BIG.h / 2, BIG, T(BIG.w / 2, BIG.h / 2 + 8, 'Teddy’s plate', 20, { c: '#9AA6BC' }), { fill: 'none' }) + bubble(170, 60, 'Yum!'),
  pieces: [P('b-toast', 'toast', { s: 1.3 }), P('b-banana', 'banana', { s: 1.3 }), P('b-pear', 'pear', { s: 1.3 }), P('b-milk', 'milk', { s: 1.2 })],
});
b1.push({
  id: 'colors-big', band: 'b1', from: 20, cat: 'Colors', title: 'Red, yellow, blue, green',
  how: '<b>Match the color.</b> Lay a card on the mat with the same color. Say the color word every time; knowing it comes later.',
  talk: ['Repeat and add one word', '“Apple. Red apple. Red, red, red!”'], easier: 'Use red and yellow only.', harder: 'Find something in the room that is the same color.', tired: 'Name one color on the page, then find it on their clothes.',
  prep: '5 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cell: 'big', cols: 2,
  board: () => { const cols = [[C.tomato, C.tTomato, 'red'], [C.sun, C.tSun, 'yellow'], [C.sky, C.tSky, 'blue'], [C.grass, C.tGrass, 'green']]; return gridPos(4, 2, BIG, 24, 12).map(([x, y], i) => slot(x, y, BIG, `<g class="keepc"><circle cx="${BIG.w / 2}" cy="${BIG.h / 2 - 12}" r="70" fill="${cols[i][0]}"/></g>${T(BIG.w / 2, BIG.h - 20, cols[i][2], 22)}`, { fill: cols[i][1] })).join(''); },
  pieces: [P('b-apple', 'red', { s: 1.25 }), P('w-duck', 'yellow', { s: 1.1 }), P('w-cup', 'blue', { s: 1.3 }), P('a-leaf', 'green', { s: 1.25 })],
});
b1.push({
  id: 'nose', band: 'b1', from: 15, cat: 'First words', title: 'Where’s your nose?',
  how: '<b>Point here, then there.</b> Point to the nose in the picture, then gently touch your child’s nose. Swap turns.',
  talk: ['Follow their lead', '“Nose! Your nose. My nose! Beep!”'], easier: 'Only nose and eyes today.', harder: 'Ask “Where are your ears?” and wait for them to show you.', tired: 'Beep each other’s noses. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => {
    const hx = 240, hy = 270, s = 6.4;
    const lab = (t, x, y, tx, ty) => `<line x1="${x}" y1="${y}" x2="${tx - 8}" y2="${ty - 8}" stroke="${C.ink}" stroke-width="2.5" stroke-dasharray="2 7" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="7" fill="${C.ink}" class="ink"/>` + `<g transform="translate(${tx},${ty})">${rr(0, -30, t.length * 15 + 34, 44, 22, '#FFFFFF', 'class="tint"')}${T(17 + t.length * 7.5, 2, t, 24)}</g>`;
    return head('D', hx, hy, s, 'smile') + `<ellipse cx="${hx}" cy="${hy + 4 * s * 0.55}" rx="${3.2 * s}" ry="${2.5 * s}" fill="${C.ink}" opacity=".18"/>` +
      lab('hair', hx + 40, hy - 150, 470, 70) + lab('eyes', hx + 54, hy - 6, 500, 170) + lab('nose', hx + 4, hy + 16, 510, 262) + lab('mouth', hx + 22, hy + 62, 480, 360) + lab('ears', hx + 150, hy + 20, 540, 450);
  },
});
b1.push({
  id: 'sing', band: 'b1', from: 12, cat: 'Sing & move', title: 'Pick a song',
  how: '<b>Let your child choose.</b> Hold the page and ask “Which song?” A look or a pat picks it. Sing and do the moves.',
  talk: ['Offer a choice', '“Boat song or star song? (wait) Star! Twinkle, twinkle…”'], easier: 'Sing the same song every time. Repeating is the fun part.', harder: 'Stop before the last word of a line and let them fill it in.', tired: 'Hum one song while you rock together.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => { const w = 324, h = 246; const tile = (x, y, id, s, t1, t2) => `<g transform="translate(${x},${y})">${tint(0, 0, w, h, 20, '#FFFFFF')}${U(id, w / 2, 100, s)}${T(w / 2, 196, t1, 20)}${T(w / 2, 224, t2, 14, { f: 'Nunito Sans, sans-serif', w: 700, c: '#5B6780' })}</g>`; return tile(0, 0, 'b-boat', 1.5, 'Row, Row, Row Your Boat', 'rock side to side') + tile(348, 0, 'w-star', 1.45, 'Twinkle, Twinkle, Little Star', 'open and shut your hands') + tile(0, 270, 'b-bus', 1.45, 'The Wheels on the Bus', 'roll your arms round') + tile(348, 270, 'b-cow', 1.35, 'Old MacDonald Had a Farm', 'moo! baa! quack!'); },
  safety: 'Rocking games stay gentle: support your child’s back and head.',
});
b1.push({
  id: 'peekhouse', band: 'b1', from: 12, cat: 'Look & find', title: 'Peekaboo house',
  how: '<b>Hide and pop.</b> Cover a window with your hand. “Where’s cat?” Wait a beat, lift your hand: “Peekaboo!”',
  talk: ['Pause and wait', '“Where’s dog? (wait…) Peekaboo, dog!”'], easier: 'Cover with your hand only a moment. Quick hides are easiest.', harder: 'Let your child do the hiding and you do the guessing.', tired: 'One window, one peekaboo. Big smile. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => {
    const win = (x, y, id, s, dy = 0) => `<g transform="translate(${x},${y})"><rect class="tint" x="0" y="0" width="190" height="150" rx="16" fill="${C.tSky}"/><svg x="0" y="0" width="190" height="150" viewBox="0 0 190 150" overflow="hidden">${U(id, 95, 88 + dy, s)}</svg></g>`;
    return `<path d="M60 170L336 20 612 170Z" fill="${C.tomato}" stroke="${C.tomato}" stroke-width="24" stroke-linejoin="round"/>` + rr(96, 160, 480, 356, 8, C.sun) +
      win(130, 196, 'w-cat', 1.5, 12) + win(352, 196, 'w-dog', 1.35, 20) + win(130, 360, 'w-duck', 1.3, 8) + win(352, 360, 'b-bird', 1.5, 6);
  },
});
['book', 'more', 'uh-oh', 'bye-bye', 'night-night'].forEach(w => b1.push(wordAct(w, 'b1')));

// ---------------- 2-3 years ----------------
const b2 = [];
b2.push(wordAct('go', 'b2'), wordAct('stop', 'b2'), wordAct('down', 'b2'), wordAct('in', 'b2'));

const colorMat = (x, y, w, h, c, t, name) => `<g transform="translate(${x},${y})">${tint(0, 0, w, h, 22, t)}<g class="keepc">${rr(18, 18, 64, 64, 32, c)}</g>${T(96, 62, name, 30, { a: 'start' })}${U('a-bucket', w - 64, 54, 0.62)}</g>`;
b2.push({
  id: 'colorsort', band: 'b2', from: 24, cat: 'Colors', title: 'Color sort',
  how: '<b>Sort by color.</b> Pick up a card, name it, and put it on the mat with the same color. Mistakes are fine; just name what you see.',
  talk: ['Repeat and add one word', '“Frog. Green frog. Green frog goes on green!”'], easier: 'Start with two colors and six cards.', harder: 'Ask “What else is red?” and hunt the room.', tired: 'Sort just three cards. Done.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => colorMat(0, 0, 324, 246, C.tomato, C.tTomato, 'red') + colorMat(348, 0, 324, 246, C.sun, C.tSun, 'yellow') + colorMat(0, 270, 324, 246, C.sky, C.tSky, 'blue') + colorMat(348, 270, 324, 246, C.grass, C.tGrass, 'green'),
  pieces: [P('b-apple', 'apple'), P('a-car', 'car', { s: 1.2 }), P('w-heart', 'heart'), P('w-duck', 'duck'), P('b-banana', 'banana'), P('w-star', 'star', { s: 1.05 }), P('w-cup', 'cup'), P('b-fish', 'fish'), P('w-shoe', 'shoe', { s: 1.05 }), P('a-leaf', 'leaf'), P('b-frog', 'frog'), P('b-pear', 'pear')],
});
b2.push({
  id: 'colorhunt', band: 'b2', from: 24, cat: 'Colors', title: 'Color hunt in the park',
  how: '<b>Hunt for a color.</b> Touch a color dot at the bottom, then find that color in the park. Every find gets a name.',
  talk: ['Say what you see', '“Yellow! Yellow duck. Yellow sun. Wow, lots of yellow!”'], easier: 'Hunt one color only. Yellow is easy to spot.', harder: 'Find two things of the same color and say both.', tired: 'Point to anything red. Name it. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => {
    const g = 350;
    return rr(-12, g, W + 24, 170, 0, C.tGrass, 'class="tint"') + U('w-sun', 590, 70, 0.9) + U('b-cloud', 130, 60, 0.9, 'style="--cl:#FFFFFF"') +
      U('b-tree', 110, 262, 2.2) + U('b-apple', 80, 222, 0.28) + U('b-apple', 140, 240, 0.28) + U('b-bird', 205, 178, 0.55) +
      U('b-pond', 420, 386, 2.3) + U('w-duck', 440, 360, 0.62) + U('b-frog', 560, 420, 0.62) +
      U('b-umbrella', 270, 300, 1.1) + U('w-ball', 300, 420, 0.42) + U('b-ladybug', 190, 420, 0.4) + U('b-flower', 610, 330, 0.8) + U('b-flower', 650, 346, 0.62, 'style="--pt:#8A5CC7"') +
      `<g transform="translate(96,478)">${[[C.tomato, 'red'], [C.sun, 'yellow'], [C.sky, 'blue'], [C.grass, 'green']].map(([c, n], i) => `<g transform="translate(${i * 128},0)">${rr(0, -22, 116, 44, 22, '#FFFFFF', 'class="tint"')}<g class="keepc"><circle cx="24" cy="0" r="14" fill="${c}"/></g>${T(46, 7, n, 19, { a: 'start' })}</g>`).join('')}</g>`;
  },
});
const shapes = [['s-circle', 'circle', C.tomato, C.tTomato], ['s-square', 'square', C.sky, C.tSky], ['s-triangle', 'triangle', C.grass, C.tGrass], ['s-star', 'star', C.plum, C.tPlum], ['s-heart', 'heart', C.tomato, C.tTomato], ['s-rectangle', 'rectangle', C.sun, C.tSun]];
b2.push({
  id: 'shapes', band: 'b2', from: 26, cat: 'Shapes', title: 'Shape match',
  how: '<b>Find the shape’s spot.</b> Pick up a shape card, trace its edge with a finger, then lay it on the pale shape that matches.',
  talk: ['Say what you see', '“Circle. Round, round circle. It goes on the circle!”'], easier: 'Circle, square and triangle only.', harder: 'Find a circle or square in the room: a plate, a window.', tired: 'Trace one shape with a finger. Say its name.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => gridPos(6, 3, CELL, 12, 36).map(([x, y], i) => slot(x, y, CELL, U(shapes[i][0], CELL.w / 2, CELL.h / 2 - 10, 1.05, `style="--sf:${shapes[i][3]}"`) + T(CELL.w / 2, CELL.h - 16, shapes[i][1], 17, { c: '#5B6780' }))).join(''),
  pieces: shapes.map(s => P(s[0], s[1], { s: 1.05, tint: '#FFFFFF', art: U(s[0], 0, 0, 1, `style="--sf:${s[2]}"`) })),
});
b2.push({
  id: 'shapehunt', band: 'b2', from: 28, cat: 'Shapes', title: 'Shapes everywhere',
  how: '<b>Spy the shapes.</b> Circles, squares and triangles are hiding in this street. Point and name each one you find.',
  talk: ['Say what you see', '“The wheel is a circle! The roof is a triangle!”'], easier: 'Hunt circles only (wheels, sun, windows).', harder: 'Count the circles together.', tired: 'Find one triangle. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => {
    const g = 420;
    const house = (x, c, roof) => `<g transform="translate(${x},0)"><path d="M0 250L90 160 180 250Z" fill="${roof}" stroke="${roof}" stroke-width="12" stroke-linejoin="round"/>${rr(14, 244, 152, g - 244, 4, c)}${rr(34, 272, 44, 44, 4, '#FFFFFF')}${rr(102, 272, 44, 44, 4, '#FFFFFF')}${rr(68, 342, 44, g - 342, 22, C.ink)}<circle cx="90" cy="212" r="16" fill="#FFFFFF"/></g>`;
    return U('w-sun', 590, 70, 0.8) + house(20, C.tSun, C.tomato) + house(240, C.tSky, C.grass) + rr(-12, g, W + 24, 110, 0, '#D5DCE8', 'class="tint"') + rr(0, g + 44, W, 6, 3, '#FFFFFF') + U('b-bus', 560, g - 30, 1.6) + U('b-s-diamond', 470, 312, 0.35, `style="--sf:${C.plum}"`) + rr(462, 312, 16, 110, 3, C.ink);
  },
});
const shadowSet = [['w-duck', 'duck', 1.15], ['w-ball', 'ball', 1.1], ['w-shoe', 'shoe', 1.2], ['w-cup', 'cup', 1.3], ['a-car', 'car', 1.4], ['a-teapot', 'teapot', 1.4]];
b2.push({
  id: 'shadows', band: 'b2', from: 28, cat: 'Matching', title: 'Shadow match',
  how: '<b>Whose shadow?</b> Hold up a card, look at the dark shapes together, and find the shadow that matches.',
  talk: ['Offer a choice', '“Is this the duck’s shadow or the cup’s? (wait) The duck’s!”'], easier: 'Put out three cards and three shadows only.', harder: 'Cover a shadow with your hand and ask which one is missing.', tired: 'Match one card. High-five.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => gridPos(6, 3, CELL, 12, 36).map(([x, y], i) => slot(x, y, CELL, SIL(shadowSet[i][0], CELL.w / 2, CELL.h / 2, shadowSet[i][2]))).join(''),
  pieces: shadowSet.map(s => P(s[0], s[1], { s: s[2] * 0.92 })),
});
const bs = (id, big, word) => P(id, word, { s: big ? 1.45 : 0.62 });
b2.push({
  id: 'bigsmall', band: 'b2', from: 26, cat: 'Sorting', title: 'Big or small?',
  how: '<b>Sort by size.</b> Look at the picture on each card. Is it big or small? Put it on the matching side.',
  talk: ['Repeat and add one word', '“Big duck! Small duck. Small duck goes here.”'], easier: 'Balls only: one big, one small.', harder: 'Line them up from small to big.', tired: 'Sort two cards. Done.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => `<g>${tint(0, 0, 330, H, 22, '#FFFFFF')}${U('w-ball', 165, 170, 1.6)}${T(165, 330, 'BIG', 56, { w: 700 })}${T(165, 380, 'Big things go here', 16, { f: 'Nunito Sans, sans-serif', w: 700, c: '#5B6780' })}</g><g transform="translate(342,0)">${tint(0, 0, 330, H, 22, '#FFFFFF')}${U('w-ball', 165, 214, 0.55)}${T(165, 330, 'small', 34)}${T(165, 380, 'Small things go here', 16, { f: 'Nunito Sans, sans-serif', w: 700, c: '#5B6780' })}</g>`,
  pieces: [bs('w-ball', 1, 'big'), bs('w-ball', 0, 'small'), bs('w-duck', 1, 'big'), bs('w-duck', 0, 'small'), bs('w-star', 1, 'big'), bs('w-star', 0, 'small')],
});
b2.push({
  id: 'weather', band: 'b2', from: 28, cat: 'Pretend play', title: 'Dress for the weather',
  how: '<b>What will they wear?</b> Pick a card. Is it for the sunny day or the rainy, chilly day? Dress the right friend.',
  talk: ['Offer a choice', '“Sun hat or boots for the sunny day? (wait) Sun hat!”'], easier: 'Two cards at a time: one sunny, one rainy.', harder: 'Look outside. What should we wear today?', tired: 'Look out the window and name the weather.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => `${tint(0, 0, 330, H, 22, C.tSun)}${U('w-sun', 70, 70, 0.62)}${T(118, 80, 'Sunny day', 26, { a: 'start' })}${kidAt('B', 165, 470, 3.2, { face: 'laugh', aL: 30, aR: -30 })}
    <g transform="translate(342,0)">${tint(0, 0, 330, H, 22, C.tSky)}${U('b-rain', 64, 70, 0.62)}${T(108, 72, 'Rainy,', 24, { a: 'start' })}${T(108, 100, 'chilly day', 24, { a: 'start' })}${kidAt('C', 165, 470, 3.2, { face: 'smile', aL: 20, aR: -20 })}</g>`,
  pieces: [P('b-sunhat', 'sun hat'), P('b-sunglasses', 'sunglasses'), P('b-shorts', 'shorts'), P('b-tshirt', 't-shirt'), P('b-umbrella', 'umbrella'), P('a-boot', 'boots'), P('b-coat', 'coat'), P('b-mitten', 'mittens')],
});
b2.push({
  id: 'pizza', band: 'b2', from: 28, cat: 'Pretend play', title: 'Pizza shop',
  how: '<b>Make a pizza together.</b> Your child is the cook. Ask for toppings and let them lay the cards on the pizza.',
  talk: ['Offer a choice', '“Mushrooms or peppers? (wait) Peppers! One more?”'], easier: 'Two kinds of topping only.', harder: 'Order a number: “Three tomatoes, please!”', tired: 'Order one topping. Pretend to munch. Done.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => `<circle cx="336" cy="258" r="252" fill="${C.s2 || '#E0AC80'}"/><circle cx="336" cy="258" r="226" fill="${C.tomato}"/><circle cx="336" cy="258" r="210" fill="${C.sun}" opacity=".85"/>` + [[-140, -60], [120, -90], [60, 110], [-90, 120], [150, 60], [-10, -160]].map(([x, y]) => `<circle cx="${336 + x}" cy="${258 + y}" r="14" fill="${C.tomato}" opacity=".45"/>`).join('') + bubble(560, 40, 'Order up!', C.tSun),
  pieces: [P('b-slice-tomato', 'tomato'), P('b-slice-tomato', 'tomato'), P('b-slice-tomato', 'tomato'), P('b-pepper', 'pepper'), P('b-pepper', 'pepper'), P('b-mushroom', 'mushroom'), P('b-mushroom', 'mushroom'), P('b-cheese', 'cheese'), P('b-cheese', 'cheese')],
});
const feel = [['A', 'laugh', 'silly'], ['B', 'sad', 'sad'], ['C', 'oh', 'surprised'], ['D', 'sleep', 'sleepy'], ['E', 'smile', 'happy'], ['A', 'joy', 'calm']];
b2.push({
  id: 'feelings', band: 'b2', from: 30, cat: 'Feelings', title: 'Same feeling',
  how: '<b>Match faces that feel the same.</b> Look at a card face. Make that face together, then find the friend who feels the same.',
  talk: ['Say what you see', '“She looks sleepy. Yawn! Who else is sleepy?”'], easier: 'Happy and sad only.', harder: 'Ask “What made him sad, do you think?”', tired: 'Make a silly face at each other. Done.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => gridPos(6, 3, CELL, 12, 36).map(([x, y], i) => slot(x, y, CELL, head(feel[i][0], CELL.w / 2, CELL.h / 2 - 12, 2.6, feel[i][1]) + T(CELL.w / 2, CELL.h - 16, feel[i][2], 17, { c: '#5B6780' }))).join(''),
  pieces: [['E', 'laugh'], ['C', 'sad'], ['D', 'oh'], ['A', 'sleep'], ['B', 'smile'], ['C', 'joy']].map(([k, f], i) => ({ raw: (w, h) => head(k, w / 2, h / 2 - 12, 2.6, f), word: feel[i][2], tint: C.wash })),
});
b2.push({
  id: 'inonunder', band: 'b2', from: 30, cat: 'First words', title: 'In, on, under',
  how: '<b>Where is Cat?</b> Point to each picture and say where Cat is. Then play it with a real toy and a box.',
  talk: ['Say what you see', '“Cat is IN the box! Now Cat is ON the box!”'], easier: 'Just “in.” Drop a toy in a box: “in!”', harder: 'Hide a toy and give clues: “It’s under something soft.”', tired: 'Put a sock in a shoe: “in!” Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => {
    const tile = (x, inner, word) => `<g transform="translate(${x},0)">${tint(0, 0, 208, H, 22, '#FFFFFF')}${inner}${T(104, H - 34, word, 34)}</g>`;
    const table = `${rr(20, 200, 168, 18, 9, C.s3)}${rr(34, 214, 14, 170, 7, C.s3)}${rr(160, 214, 14, 170, 7, C.s3)}`;
    return tile(0, U('w-cat', 108, 240, 1.25) + U('a-box', 104, 320, 1.55), 'in') + tile(232, U('a-box', 104, 330, 1.55) + U('w-cat', 108, 212, 1.25), 'on') + tile(464, table + U('w-cat', 104, 340, 1.1), 'under');
  },
});
b2.push(wordAct('open', 'b2'), wordAct('help', 'b2'));
const homes = [['b-doghouse', 'w-dog', 'dog', 1.0], ['b-fishbowl', 'b-fish', 'fish', 0.9], ['b-nest', 'b-bird', 'bird', 0.95], ['b-hive', 'b-bee', 'bee', 1.0], ['b-pond', 'w-duck', 'duck', 1.0], ['b-bed', 'b-teddy', 'teddy', 1.05]];
b2.push({
  id: 'homes', band: 'b2', from: 30, cat: 'Matching', title: 'Who lives here?',
  how: '<b>Take everyone home.</b> Pick an animal card and ask “Where does the bird live?” Lay it on its home.',
  talk: ['Pause and wait', '“The bird lives in a… (wait) nest! Tweet!”'], easier: 'Dog and fish first; they’re easy.', harder: 'Ask “Where do you live? Where do I sleep?”', tired: 'Take one animal home. Say night-night.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => gridPos(6, 3, CELL, 12, 36).map(([x, y], i) => slot(x, y, CELL, U(homes[i][0], CELL.w / 2, CELL.h / 2 - 4, homes[i][0] === 'b-pond' ? 1.45 : 1.35), { fill: C.wash })).join(''),
  pieces: homes.map(h => P(h[1], h[2], { s: h[3] * 1.1, tint: '#FFFFFF' })),
});
b2.push({
  id: 'opposites', band: 'b2', from: 30, cat: 'Big & little', title: 'Opposites',
  how: '<b>Two sides, two words.</b> Point to one side and say its word. Then point to the other side and say the opposite.',
  talk: ['Repeat and add one word', '“Day. Sunny day! Night. Dark night. Shhh.”'], easier: 'Day and night only.', harder: 'Act them out: stretch up high, crouch down low.', tired: 'Open and shut your hands: “open… shut!”',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => {
    const pair = (x, y, a, b, la, lb, ta, tb) => `<g transform="translate(${x},${y})">${tint(0, 0, 162, 246, 20, ta)}<g transform="translate(162,0)">${tint(0, 0, 162, 246, 20, tb)}</g>${a}${b}${T(81, 226, la, 22)}${T(243, 226, lb, 22)}</g>`;
    const shut = `<g transform="translate(243,108)"><path d="M-10-60L10-60 16 30H-16Z" fill="${C.tomato}"/>${rr(-2.5, -72, 5, 14, C.ink, 2.5)}<path d="M0 30V52C0 62 14 62 14 52" stroke="${C.ink}" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
    return pair(0, 0, U('w-sun', 81, 104, 0.95), U('w-moon', 243, 104, 0.9) + U('w-star', 290, 50, 0.22) + U('w-star', 200, 60, 0.16), 'day', 'night', C.tSun, C.tPlum) +
      pair(348, 0, U('w-sun', 60, 80, 0.55) + U('b-sunhat', 90, 150, 0.9), U('b-snowman', 243, 116, 1.35), 'hot', 'cold', C.tTomato, C.tSky) +
      pair(0, 270, U('b-bird', 81, 70, 0.8) + U('b-cloud', 60, 150, 0.5, 'style="--cl:#FFFFFF"'), U('b-bird', 243, 170, 0.8) + rr(162, 196, 162, 10, 0, C.grass), 'up', 'down', C.tSky, C.tGrass) +
      pair(348, 270, U('b-umbrella', 81, 110, 1.2), shut, 'open', 'shut', C.tTomato, C.tTomato);
  },
});
b2.push({
  id: 'count123', band: 'b2', from: 30, cat: 'Counting', title: 'One, two, three',
  how: '<b>Touch and count.</b> Touch each picture as you count out loud, one touch for each number.',
  talk: ['Repeat', '“One duck! One, two ducks! One, two, three stars!”'], easier: 'Count the one sun, then clap once.', harder: 'Count claps, hops or steps up to three.', tired: 'Count three fingers on your hand. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page', cut: false,
  board: () => {
    const row = (y, n, id, s, word) => `<g transform="translate(0,${y})">${tint(0, 0, W, 160, 20, '#FFFFFF')}<circle cx="80" cy="80" r="52" fill="${C.sun}"/><text x="80" y="104" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="70" fill="${C.ink}">${n}</text>${Array.from({ length: n }, (_, i) => U(id, 220 + i * 150, 80, s)).join('')}${T(W - 24, 148, word, 18, { a: 'end', c: '#5B6780' })}</g>`;
    return row(0, 1, 'w-sun', 0.8, 'one sun') + row(178, 2, 'w-duck', 0.95, 'two ducks') + row(356, 3, 'w-star', 0.95, 'three stars');
  },
});
// socks: patterned pairs
const SOCK = 'M-18-44H18V14C18 30 8 40-8 40H-32C-44 40-48 26-38 18L-18 4Z';
const sockPats = [
  ['stripes', C.tomato, `${[-30, -12, 6, 24].map(y => `<rect x="-60" y="${y}" width="120" height="9" fill="#FFFFFF"/>`).join('')}`],
  ['dots', C.sky, `${[[-8, -30], [8, -14], [-8, 2], [4, 22], [-24, 28]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#FFFFFF"/>`).join('')}`],
  ['hearts', C.plum, `<path d="M0-12C-2-15-10-20-10-26C-10-30-6-32-3-32C-1-32 0-30 0-29C0-30 1-32 3-32C6-32 10-30 10-26C10-20 2-15 0-12Z" fill="#FFFFFF"/><path d="M-20 30C-22 27-30 22-30 16C-30 12-26 10-23 10C-21 10-20 12-20 13C-20 12-19 10-17 10C-14 10-10 12-10 16C-10 22-18 27-20 30Z" fill="#FFFFFF"/>`],
  ['zigzag', C.grass, `<path d="M-40-10L-26-24-12-10 2-24 16-10 30-24M-40 16L-26 2-12 16 2 2 16 16 30 2" stroke="#FFFFFF" stroke-width="6" fill="none"/>`],
  ['stars', C.sun, `<path d="M0-38l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#FFFFFF"/><path d="M-14 12l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#FFFFFF"/>`],
  ['heel-toe', C.ink, `<rect x="-60" y="-44" width="120" height="12" fill="${C.sun}"/><circle cx="-38" cy="30" r="16" fill="${C.sky}"/><rect x="0" y="18" width="30" height="30" fill="${C.sky}"/>`],
];
sockPats.forEach(([n, c, pat]) => defs.add(`sock-${n}`, `<symbol id="sock-${n}" overflow="visible"><clipPath id="sockclip-${n}"><path d="${SOCK}"/></clipPath><path d="${SOCK}" fill="${c}"/><g clip-path="url(#sockclip-${n})">${pat}</g></symbol>`));
b2.push({
  id: 'socks', band: 'b2', from: 30, cat: 'Matching', title: 'Find the pair',
  how: '<b>Match the socks.</b> Look closely: stripes, dots, stars. Find the sock that makes a pair and lay it on its partner.',
  talk: ['Say what you see', '“This sock has dots. Blue dots! Where’s its friend?”'], easier: 'Put out three pairs only.', harder: 'Pair real socks from the laundry basket after.', tired: 'Find one real pair of socks together.',
  prep: '10 min', mess: 'None', needs: 'Scissors, cardstock', cut: true, cols: 3,
  board: () => gridPos(6, 3, CELL, 12, 36).map(([x, y], i) => slot(x, y, CELL, U(`sock-${sockPats[i][0]}`, CELL.w / 2 + 6, CELL.h / 2, 1.5))).join(''),
  pieces: [3, 0, 5, 1, 4, 2].map(i => ({ art: `<g transform="scale(-1,1)">${U(`sock-${sockPats[i][0]}`, 0, 0, 1)}</g>`, s: 1.45, tint: C.wash })),
});
b2.push({
  id: 'road', band: 'b2', from: 24, cat: 'Pretend play', title: 'Beep beep! Drive to the park',
  how: '<b>Drive with a finger.</b> Start at the house and drive along the road to the park. Stop for the ducks!',
  talk: ['Pause and wait', '“Go, go, go… ducks! (wait) STOP! Quack, quack.”'], easier: 'Drive together, your hand over theirs.', harder: 'Add a stop at every picture and say what you see.', tired: 'Drive once, beep once. Done.',
  prep: '0 min', mess: 'None', needs: 'Just this page (or a big toy car)', cut: false,
  board: () => `<path d="M90 420C200 420 190 300 300 300S420 420 520 380 560 170 470 150 300 190 300 110 520 60 600 70" fill="none" stroke="#D5DCE8" stroke-width="78" stroke-linecap="round" class="tint"/><path d="M90 420C200 420 190 300 300 300S420 420 520 380 560 170 470 150 300 190 300 110 520 60 600 70" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-dasharray="16 16" stroke-linecap="round"/>` +
    U('a-house', 70, 380, 1.1) + U('a-car', 150, 430, 0.6) + U('b-tree', 610, 80, 1.0) + U('b-flower', 560, 44, 0.45) + U('w-duck', 430, 350, 0.45) + U('w-duck', 470, 360, 0.36) + bubble(446, 290, 'STOP!', C.tTomato) + U('b-bus', 360, 180, 0.6),
  safety: 'Toy cars for under-3s must be bigger than a toilet-paper tube, with no small wheels that come off.',
});
b2.push(wordAct('clap', 'b2'), wordAct('all done', 'b2'));

module.exports = { b1, b2, P, bubble, WORDTEXT };
