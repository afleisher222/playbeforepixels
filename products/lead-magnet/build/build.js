// Free lead magnet: "Five 5-Minute Plays" for ages 0–5. Delivered only by the email platform after double opt-in
// (never sold, never on Etsy). Color and low-ink, US Letter and A4, same pipeline as the paid products.
//   bash make.sh
'use strict';
const K = require('../../bundle-gift-1-5/build/shared/kit.js');
const P = require('../../bundle-gift-1-5/build/shared/product.js');
const { C, D, esc, icon, mi, ageChip, logo, CHARS } = K;

const SLUG = 'five-5-minute-plays';
const PRODUCT = 'Five 5-Minute Plays';

// Every play: nothing to buy, no prep, about 5 minutes; an age ladder from birth to 5; a talk line; a 1-minute
// version for tired days; its own safety line (BRAND hard rule 4; CUSTOMER-VOICE rules 6–7).
const PLAYS = [
  { t: 'Peekaboo Blanket', why: 'Things that go away and come back are thrilling for little ones. Every “peekaboo!” is a turn you take together.', art: 'towel', c: 'sky', needs: 'A small blanket or towel',
    how: ['Hold the blanket up between you.', 'Say “Where did I go?” and wait.', 'Drop it and say “Peekaboo!” Do it again, and again.'],
    talk: '“Where’s… (wait) there you are!”', move: 'Pause and wait',
    ladder: [['0-1', 'Hide your own face. Babies love the surprise.'], ['1-2', 'Hide a toy under the blanket; your child pulls it off.'], ['2-3', 'Your child hides under it; you look everywhere else first.'], ['3-5', 'Hide-and-seek in one room. You count to 10 out loud.']],
    tired: 'Hide your face behind your hands three times.',
    safe: 'Blanket play is for awake time with you. Take the blanket away before any baby sleeps.' },
  { t: 'Pots-and-Spoons Band', why: 'Loud and quiet, stop and go: copying each other is a conversation without words.', art: 'pot', c: 'plum', needs: 'A pot or plastic bowl, a wooden spoon',
    how: ['Turn a pot upside down.', 'Tap it loud, then soft.', 'Take turns: you play, then your child copies, then swap.'],
    talk: '“Loud! … (whisper) quiet.”', move: 'Sing and gesture',
    ladder: [['0-1', 'Tap gently while your baby watches and reaches.'], ['1-2', 'Hand over the spoon. Clap after every bang.'], ['2-3', 'Stop and start: bang when you nod, freeze when you stop.'], ['3-5', 'Copy my pattern: tap, tap, BANG. Then your child makes one.']],
    tired: 'Three loud taps, three soft taps, done.',
    safe: 'Cool, empty pots, away from the stove. A wooden or plastic spoon.' },
  { t: 'Cup Tower Crash', why: 'The wait before the crash is the best part. That pause gives your child a turn to join in.', art: 'blocks', c: 'tomato', needs: '3–6 plastic cups or containers',
    how: ['Stack the cups into a tower.', 'Count down together: “3, 2, 1…”', 'Crash! Then build it again.'],
    talk: '“Up, up, up… (wait) CRASH!”', move: 'Pause and wait',
    ladder: [['0-1', 'You stack two; your baby knocks them over.'], ['1-2', 'Stack two together, then crash.'], ['2-3', 'Build as tall as you can before it falls.'], ['3-5', 'Big cup at the bottom, smallest on top: put them in order.']],
    tired: 'One tower, one crash.',
    safe: 'Plastic cups too big to fit through a toilet-paper tube. Keep towers below your child’s chest.' },
  { t: 'Window Walk', why: 'Naming what your child is already looking at puts words right where their attention is.', art: 'window', c: 'grass', needs: 'A window',
    how: ['Stand or sit at a window together.', 'Say what you see: a tree, a car, a bird.', 'Wait. Then say what your child is looking at.'],
    talk: '“A car! (wait) A big red car.”', move: 'Say what you see',
    ladder: [['0-1', 'Hold your baby up and name one thing slowly.'], ['1-2', 'Point, wait, then name what your child points at.'], ['2-3', 'Play “I see something…”: you name a color.'], ['3-5', 'Count something: cars, birds, windows across the street.']],
    tired: 'Name three things you can see, then wave goodbye.',
    safe: 'Closed, locked windows. A grown-up lifts; nobody stands on sills or furniture.' },
  { t: 'Sock Friend Says Hello', why: 'A silly voice makes it easy to take turns talking, and any answer counts.', art: 'sockfriend', c: 'sun', needs: 'A clean sock',
    how: ['Put a sock on your hand. It’s a sock friend!', 'The sock friend says hello and asks a question.', 'Wait for any answer: a look, a sound, a word.'],
    talk: '“Hello! (wait) What’s your name?”', move: 'Pause and wait',
    ladder: [['0-1', 'The sock friend sings and gently tickles toes.'], ['1-2', 'The sock friend hides under your arm, then pops out.'], ['2-3', 'The sock friend is hungry: your child “feeds” it pretend food.'], ['3-5', 'Your child wears the sock and talks to you.']],
    tired: 'One sock, one “Hello!”, one tickle.',
    safe: 'A clean sock with nothing sewn or glued on: no buttons, beads or pom-poms.' },
];
const HC = { sky: [C.sky, C.tSky, D.sky], plum: [C.plum, C.tPlum, D.plum], grass: [C.grass, C.tGrass, D.grass], tomato: [C.tomato, C.tTomato, D.tomato], sun: [C.sun, C.tSun, D.sun] };
const BANNED = /\b(balloons?|marshmallows?|popcorn|grapes?|nuts|screens?|tablet|phone|tv|milestones?|delay|falling behind|should)\b/i;
for (const p of PLAYS) {
  const m = [p.t, p.needs, ...p.how, p.talk, ...p.ladder.map(l => l[1]), p.tired].join(' ').match(BANNED);
  if (m) throw new Error(`${p.t}: "${m[0]}"`);
}

function cover(ctx) {
  const { kid, adult, KIDS, ADULTS } = CHARS;
  const art = `<svg viewBox="0 0 420 300" width="420" height="300" aria-hidden="true">
    <ellipse class="fw" cx="210" cy="296" rx="200" ry="10"/>
    ${adult(Object.assign({}, ADULTS.G5, { x: 150, y: 294 - 81 * 1.1, s: 1.1, aL: 40, aR: -70, face: 'laugh' }))}
    ${kid(Object.assign({}, KIDS.E, { x: 262, y: 294 - 27 * 1.2, s: 1.2, aL: 150, aR: -40, face: 'joy' }))}
    ${icon('pot', ctx, 96).replace('<svg class="ic ', '<svg x="300" y="190" class="ic ')}
  </svg>`;
  return `<div class="cv">
    <div class="cv-top li-white">
      ${logo(ctx, 'lockup', null, 'lockup cv-logo')}
      <p class="kicker d-grass">Free printable · Ages 0–5</p>
      <h1>Five <span class="n5 li-edge">5</span>-Minute<br>Plays</h1>
      <p class="lede">Five little plays with things you already have. Each one grows with your child, from birth to five.</p>
      <div class="cv-art">${art}</div>
    </div>
    <div class="cv-low">
      <div class="plays">${PLAYS.map((p, i) => `<div class="pl li-white" style="--c:${HC[p.c][0]};--t:${HC[p.c][1]}"><div class="pl-ic li-white">${icon(p.art, ctx, 52)}</div><b>${i + 1}. ${esc(p.t)}</b></div>`).join('')}</div>
      <div class="tiles">
        <div class="tile li-white"><b>5</b><span>plays</span></div>
        <div class="tile li-white"><b>0</b><span>things to buy</span></div>
        <div class="tile li-white"><b>0 min</b><span>prep</span></div>
        <div class="tile li-white"><b>0–5</b><span>years, with a grown-up</span></div>
      </div>
    </div>
  </div>`;
}

function guide(ctx) {
  const moves = [['Pause and wait', 'Say a little, then stop and count to five in your head. A look, a sound or a wiggle is an answer.', '“Ready, set… (wait)”'],
    ['Say what you see', 'Put words to what your child is doing, right as it happens. No quiz questions needed.', '“A car! A big red car.”'],
    ['Sing and gesture', 'Add a tune, a clap or a big movement. Little ones join in with their hands before words.', '“Loud! … quiet.”']];
  return `<div class="pad">
    <p class="kicker d-sky">Start here · for grown-ups</p>
    <h2 class="ptitle">Five minutes, any time</h2>
    <p class="lede2">These five plays need nothing to buy and no setup. Each one has a ladder: find your child’s age and start there. Five minutes is plenty; stop whenever your child is done.</p>
    <div class="g3">${moves.map(([h, t, e]) => `<div class="box li-white"><h4>${h}</h4><p>${t}</p><p class="ex">${e}</p></div>`).join('')}</div>
    <div class="note li-white">${mi('talk', 20, D.sky)}<p><b>Talk, sing and read in the language you know best.</b> Every talk line works in any language. A sign, a point or a tap on a talking device counts as communicating, just like a word.</p></div>
    <div class="g2" style="margin-top:14px">
      <div class="box li-white"><h4>How to use this</h4><p>Print it or keep it on your phone. Pick one play a day, or the same favorite five days running. <b>Most children love 2–3 of these</b> and ask for them again and again. That’s the plan working.</p></div>
      <div class="box li-white"><h4>Why five minutes?</h4><p>Young children learn in back-and-forth moments with the people who love them: a look, a laugh, a turn, a word. Short, happy plays fit into real days. This is something to add, never a test.</p></div>
    </div>
    <div class="ages li-white"><h4>Find your child’s age on every play</h4><div class="agerow">${['0-1', '1-2', '2-3', '3-5'].map(k => ageChip(k)).join('')}</div><p>The color, the shape and the words all say the same thing, so you never need color alone.</p></div>
  </div>`;
}

function playPage(ctx, p, i) {
  const [c, t, d] = HC[p.c];
  return `<div class="pad" style="--c:${c};--t:${t};--d:${d}">
    <header class="ph li-edge">
      <div class="ph-n li-white"><span>Play</span><b>${i + 1}</b></div>
      <div class="ph-mid"><h2 class="li-text">${esc(p.t)}</h2>
        <div class="ph-flags"><span class="flag">${mi('grownup', 12)} With a grown-up</span><span class="flag">${mi('prep', 12)} No prep</span><span class="flag">${mi('time', 12)} About 5 min</span><span class="flag">${mi('nobuy', 12, D.grass)} Nothing to buy</span></div></div>
      <div class="ph-ic li-white">${icon(p.art, ctx, 96)}</div>
    </header>
    <p class="need"><b>You need:</b> ${esc(p.needs)}</p>
    <div class="pbody">
      <div>
        <h3 class="sub">How to play</h3>
        <ol class="how">${p.how.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
        <div class="talk li-white">${mi('talk', 16, d)}<div><em>Talk while you play · ${esc(p.move)}</em><p>${esc(p.talk)}</p></div></div>
        <div class="why li-white"><h4>${mi('heart', 14, D.tomato)} Why it works</h4><p>${esc(p.why)}</p></div>
        <p class="tired">${mi('two', 15, D.sky)}<span><b>Tired? 1-minute version:</b> ${esc(p.tired)}</span></p>
        <p class="sf li-white">${mi('safe', 15, D.tomato)}<span><b>Safety:</b> ${esc(p.safe)}</span></p>
      </div>
      <div>
        <h3 class="sub">It grows with your child</h3>
        <div class="ladder">${p.ladder.map(([k, s]) => `<div class="rung li-white">${ageChip(k)}<p>${esc(s)}</p></div>`).join('')}</div>
      </div>
    </div>
  </div>`;
}

function last(ctx) {
  const rules = [['grownup', 'A grown-up plays too', 'Every play is for a child and a grown-up together. Stay close and watch.'],
    ['safe', 'The toilet-paper tube test', 'For children under 3, anything that fits through a toilet-paper tube (about 1.25 in or 3.2 cm) stays out of reach.'],
    ['night', 'Awake-time play', 'Blankets and soft things are for awake play with you, never in a baby’s sleep space.'],
    ['needs', 'No cords, no balloons', 'No cords, strings or ties long enough to go around a neck. No balloons for children under 8.']];
  return `<div class="pad">
    <p class="kicker d-tomato">Before you play</p>
    <h2 class="ptitle">Our safety rules</h2>
    <div class="g2">${rules.map(([m, h, t]) => `<div class="box rule li-white">${mi(m, 18, D.tomato)}<div><h4>${h}</h4><p>${t}</p></div></div>`).join('')}</div>
    <p class="small note2">These are everyday play ideas for families, not medical or developmental advice. Questions about your child’s growth or health? Your child’s doctor is a good place to start.</p>
    <h3 class="sub">What comes next in your inbox</h3>
    <div class="g2">
      <div class="box li-white"><h4>${mi('heart', 14, D.tomato)} Once a month: 3 plays for your child’s age</h4><p>If you gave us your child’s birth month and year, each email matches their age. If not, you get plays for every age. Nothing else is needed.</p></div>
      <div class="box li-white"><h4>${mi('safe', 14, D.grass)} Our privacy promise</h4><p>We never ask for a child’s name, photo or birthday, only an optional birth month and year. We never sell or share your email. Every email has a one-click unsubscribe.</p></div>
    </div>
    <h3 class="sub">More from Play Before Pixels</h3>
    <div class="nexts">
      <div class="nx li-white" style="--c:${C.tomato}"><div class="nx-ic">${icon('talkcard', ctx, 50)}</div><div><h4>52 Play & Talk Cards</h4><p>One play and one talk tip on every card, for ages 0–5: a card a week for a year.</p></div></div>
      <div class="nx li-white" style="--c:${C.plum}"><div class="nx-ic">${icon('book100', ctx, 50)}</div><div><h4>100 Screen-Free Plays</h4><p>A quick play for every age and every moment of an ordinary day.</p></div></div>
    </div>
    <div class="colophon">
      <p><b>${PRODUCT}, ages 0–5.</b> ${ctx.version}. A free printable from playbeforepixels.com. Share the sign-up page with a friend, but please don’t post or resell this file.</p>
      <p>${K.OWNER} Text, illustrations and page design were made with AI tools for Play Before Pixels.</p>
    </div>
  </div>`;
}

function pages(ctx) {
  return [{ html: cover(ctx), label: 'Cover' }, { html: guide(ctx), label: 'Start here' }]
    .concat(PLAYS.map((p, i) => ({ html: playPage(ctx, p, i), label: p.t })))
    .concat([{ html: last(ctx), label: 'Safety and what’s next' }]);
}

function extraCss(ctx) {
  const H = ctx.H;
  return P.commonCss(ctx) + `
.ex{margin-top:6px;font-weight:800;color:${D.sky}}
.note{display:flex;gap:12px;align-items:center;background:${C.tSky};border-radius:16px;padding:12px 16px;margin-top:14px;font-size:13.4px;line-height:1.5}
.note2{margin-top:12px;background:${C.wash};border-radius:12px;padding:10px 14px}
.rule{display:flex;gap:10px;background:${C.tTomato}}
.ages{margin-top:14px;background:${C.wash};border-radius:16px;padding:13px 16px}
.ages h4{font-size:16px;margin-bottom:8px}.ages p{font-size:12.4px;margin-top:8px}
.agerow{display:flex;gap:10px;flex-wrap:wrap}
.agerow .chip{font-size:13px;padding:5px 14px 5px 10px}
/* cover */
.cv{position:absolute;inset:0;background:${C.wash}}
.cv-top{position:absolute;left:0;right:0;top:0;height:${Math.round(H * 0.6)}px;background:${C.tGrass};padding:40px 52px;overflow:hidden}
.cv-logo{height:30px;margin-bottom:22px}
.cv h1{font-size:74px;line-height:.98;letter-spacing:-.035em;margin-top:12px}
.n5{display:inline-flex;align-items:center;justify-content:center;background:${C.tomato};color:#FFFFFF;border-radius:20px;padding:2px 18px 6px;margin:0 2px 0 4px}
body.lowink .n5{color:${C.ink};--c:${C.ink}}
.cv .lede{font-size:17px;line-height:1.45;font-weight:600;max-width:340px;margin-top:16px}
.cv-art{position:absolute;right:24px;bottom:0}
.cv-low{position:absolute;left:52px;right:52px;top:${Math.round(H * 0.6) + 24}px}
.plays{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:14px}
.pl{background:#FFFFFF;border-radius:16px;padding:12px 8px;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;border-top:6px solid var(--c)}
.pl b{font-size:12.5px;line-height:1.2}
.pl-ic{width:70px;height:70px;border-radius:50%;background:var(--t);display:flex;align-items:center;justify-content:center}
.cv .tile{background:#FFFFFF}
body.lowink .cv,body.lowink .cv-top{background:#FFFFFF!important}
body.lowink .cv-top{border-bottom:3px solid ${C.ink}}
body.lowink .pl{box-shadow:inset 0 0 0 1.5px ${C.line}}
body.lowink .pl-ic{background:#FFFFFF}
/* play page */
.ph{display:flex;align-items:center;gap:16px;background:var(--c);border-radius:22px;padding:14px 18px}
.ph-n{flex:none;width:86px;height:86px;border-radius:20px;background:#FFFFFF;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1}
.ph-n span{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--d)}
.ph-n b{font-family:"Fredoka",sans-serif;font-weight:600;font-size:44px}
.ph-mid{flex:1}
.ph h2{font-size:36px;color:#FFFFFF;margin-bottom:10px}
.ph-flags{display:flex;gap:6px;flex-wrap:wrap}
.ph-flags .flag{background:#FFFFFF;font-size:10.5px}
.ph-ic{flex:none;width:118px;height:118px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center}
.need{font-size:15px;margin:14px 0 4px}
.pbody{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:22px}
.pbody>div{display:flex;flex-direction:column;gap:12px}
.pbody .sub{margin:6px 0 0}
.how{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px;counter-reset:st}
.how li{counter-increment:st;position:relative;padding-left:36px;font-size:16px;line-height:1.42}
.how li::before{content:counter(st);position:absolute;left:0;top:0;width:26px;height:26px;border-radius:50%;background:var(--t);font-family:"Fredoka",sans-serif;font-weight:600;font-size:15px;display:flex;align-items:center;justify-content:center}
.talk{display:flex;gap:10px;align-items:flex-start;background:var(--t);border-radius:16px;padding:12px 14px}
.talk em{display:block;font-style:normal;font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--d)}
.talk p{font-size:19px;font-weight:800;line-height:1.3;margin-top:2px}
.tired,.sf{display:flex;gap:8px;align-items:flex-start;font-size:14px;line-height:1.45}
.sf{margin-top:auto;background:${C.tTomato};border-radius:14px;padding:11px 13px}
.ladder{flex:1;display:flex;flex-direction:column;gap:10px}
.rung{flex:1;background:${C.wash};border-radius:16px;padding:12px 14px;display:flex;flex-direction:column;justify-content:center;gap:6px}
.rung .chip{align-self:flex-start;font-size:12px}
.rung p{font-size:17px;line-height:1.42;font-weight:600}
.rung .chip{font-size:13px;padding:4px 12px 4px 8px}
.why{background:${C.wash};border-radius:16px;padding:12px 14px}
.why h4{font-size:15px;display:flex;gap:6px;align-items:center;margin-bottom:4px}
.why p{font-size:14.5px;line-height:1.45}
body.lowink .why{background:#FFFFFF;box-shadow:inset 0 0 0 1.5px ${C.line}}
body.lowink .ph,body.lowink .ph-n,body.lowink .ph-ic{background:#FFFFFF}
body.lowink .ph h2{color:${C.ink}}
body.lowink .ph-n span,body.lowink .talk em{color:${C.ink}}
body.lowink .how li::before{background:#FFFFFF;box-shadow:inset 0 0 0 1.6px ${C.ink}}
body.lowink .talk,body.lowink .sf,body.lowink .rung,body.lowink .ages,body.lowink .note,body.lowink .note2{background:#FFFFFF;box-shadow:inset 0 0 0 1.5px ${C.line}}
`;
}

P.run({
  slug: SLUG, product: PRODUCT, buildDir: __dirname, editions: ['store'], pages, extraCss, startHere: null,
  toc: [['Cover', 1], ['Start here', 2]].concat(PLAYS.map((p, i) => [p.t, i + 3])).concat([['Safety and what’s next', 8]]),
  meta: { subject: 'Free printable: five 5-minute plays for ages 0-5, each with an age ladder, a talk line and a safety line', keywords: 'free printable, baby and toddler play, screen-free play' },
  storeName: (ink, size) => `${SLUG}${ink === 'lowink' ? '-low-ink' : ''}${size === 'a4' ? '-A4' : ''}.pdf`,
});
module.exports = { PLAYS };
