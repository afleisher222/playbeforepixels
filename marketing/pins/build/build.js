#!/usr/bin/env node
// Builds the 60 Pinterest pins and the scheduling files.
//   node marketing/pins/build/build.js        (writes src/pins.html, pins.csv, pins-master.csv, pins.json, boards.csv)
//   bash marketing/pins/build/make.sh         (build + render + JPEG + checks)
// Checks (the build stops on any failure):
//   - every play name in a list pin exists in that product's own content module (so a pin never names a play the
//     product does not contain);
//   - the GROWTH-ENGINE §7 banned-word list on board names, pin titles, descriptions, image text and alt text;
//   - no prices on pins; titles ≤ 100 chars, descriptions ≤ 500, board descriptions ≤ 500 (Pinterest limits, UNVERIFIED);
//   - every image file exists; exactly 60 pins and 12 boards;
//   - product pins link to an Etsy placeholder, free-printable pins to the landing page, nothing links to the hub.
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const OUT = path.resolve(__dirname, '..');
const PINS = require('./pins-data.js');
const BOARDS = require('./boards.js');

// ---------- destinations and when each may first be pinned (only live products are pinned) ----------
const GDAY = '2026-10-16';
const DEST = {
  free: { url: 'https://playbeforepixels.com/free/?src=pin', live: GDAY, what: 'Free printable landing page (email sign-up; Five 5-Minute Plays)' },
  'toddler-busy-book': { etsy: true, live: GDAY, what: 'Etsy: 74 Toddler Busy Book Activities' },
  'bundle-gift-1-5': { etsy: true, live: GDAY, what: 'Etsy: Ages 1–5 Instant Gift Bundle' },
  'visual-routine-cards-0-5': { etsy: true, live: GDAY, what: 'Etsy: 177 Visual Routine Cards, ages 0–5' },
  'guide-100-plays': { etsy: true, live: GDAY, what: 'Etsy: 100 Screen-Free Plays PDF' },
  'bored-play-cards-ages-1-5': { etsy: true, live: GDAY, what: 'Etsy: 76 “I’m Bored” Play Cards, ages 1–5' },
  'play-first-family-kit-ages-2-5': { etsy: true, live: '2026-10-22', what: 'Etsy: Play-First Family Kit, ages 2–5 (week 2)' },
  'play-talk-cards': { etsy: true, live: '2026-10-22', what: 'Etsy: 52 Play & Talk Cards (week 2)' },
  'visual-routine-cards-starter': { etsy: true, live: '2026-10-22', what: 'Etsy: 60 Routine Cards Starter (week 2)' },
  'winter-countdown': { etsy: true, live: '2026-10-26', until: '2026-11-30', what: 'Etsy: 24 Days of Play Winter Countdown (listed by Oct 25; deactivated Dec 5)' },
};
const link = d => DEST[d].etsy ? `{{ETSY_LISTING_URL:${d}}}` : DEST[d].url;

// ---------- checks ----------
const errors = [];
const BANNED = ['autism', 'autistic', 'asd', 'adhd', 'special needs', 'sen', 'neurodivergent', 'pecs', 'therapy', 'therapist',
  'slp', 'ot', 'speech delay', 'late talker', 'catch up', 'developmental delay', 'delay', 'milestone', 'milestones',
  'brain development', 'brain', 'boost', 'school readiness', 'reset', 'detox', 'rewire', 'classroom', 'teacher', 'teachers',
  'preschool', 'preschooler', 'preschoolers', 'daycare', 'pta', 'library', 'diagnosis', 'diagnose', 'cure', 'treat',
  'clinically', 'addiction', 'toxic', 'damage', 'zombie', 'first then', 'first-then', 'visual schedule', 'safety-checked',
  'certified', 'safe for all ages', 'learning', 'educational', 'develop', 'development'];
const words = s => ' ' + s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' -]+/g, ' ').replace(/\s+/g, ' ') + ' ';
function scan(label, text) {
  const w = words(text);
  for (const b of BANNED) if (w.includes(' ' + b + ' ')) errors.push(`${label}: banned word "${b}"`);
  if (/\$\s?\d|\d\s?(usd|dollars?)\b/i.test(text)) errors.push(`${label}: price on a pin`);
  if (/playbeforepixels\.com\/(research|hub)/i.test(text)) errors.push(`${label}: hub link`);
}
BOARDS.forEach(b => { scan(`board ${b.name}`, b.name + ' ' + b.desc); if (b.desc.length > 500) errors.push(`board ${b.name}: description ${b.desc.length} > 500`); });
if (BOARDS.length !== 12) errors.push(`boards: ${BOARDS.length}, expected 12`);
if (PINS.length !== 60) errors.push(`pins: ${PINS.length}, expected 60`);

// play names must exist in the product's own content
const P = r => require(path.join(ROOT, 'products', r));
const guide = P('guide-100-plays/build/plays.js');
const bored = P('bored-play-cards/build/cards.js');
const talk = P('play-talk-cards/build/content.js');
const winter = P('winter-countdown/build/content.js');
const leadSrc = fs.readFileSync(path.join(ROOT, 'products/lead-magnet/build/build.js'), 'utf8');
const giftListing = JSON.parse(fs.readFileSync(path.join(ROOT, 'products/bundle-gift-1-5/listing.json'), 'utf8'));
const routineG0 = JSON.parse(fs.readFileSync(path.join(ROOT, 'products/visual-routine-cards/listing-g0.json'), 'utf8'));
const norm = s => s.toLowerCase().replace(/[’']/g, "'").replace(/…/g, '...').trim();
const SOURCES = {
  guide: new Map(guide.P.map(p => [norm(p.t), p.from])),
  'guide-tired': new Map(guide.TIRED.map(p => [norm(p.t), p.from])),
  'bored-b13': new Map(bored.CARDS.b13.map(c => [norm(c.t), c.c])),
  'bored-b35': new Map(bored.CARDS.b35.map(c => [norm(c.t), c.c])),
  'talk-b0': new Map(talk.PLAYS.b0.map(p => [norm(p.t), p.mo])),
  'talk-moves': new Map(Object.values(talk.MOVES).map(x => [norm(x.name), null])),
  winter: new Map(winter.PLAYS.map(p => [norm(p.t), p.from])),
};
const ageText = months => months === 0 ? 'from birth' : months < 12 || months % 12 ? `from ${months} months` : `from ${months / 12} year${months > 12 ? 's' : ''}`;
const CATNAME = Object.fromEntries(Object.entries(bored.CATS).map(([k, v]) => [k, v.short.toLowerCase()]));
for (const pin of PINS) {
  if (!DEST[pin.dest]) errors.push(`${pin.id}: unknown destination ${pin.dest}`);
  if (!BOARDS.find(b => b.key === pin.board)) errors.push(`${pin.id}: unknown board ${pin.board}`);
  if (pin.title.length > 100) errors.push(`${pin.id}: title ${pin.title.length} > 100`);
  if (pin.desc.length > 500) errors.push(`${pin.id}: description ${pin.desc.length} > 500`);
  const imageText = [pin.kick, pin.h1, pin.sub, pin.quote, pin.quoteBy, pin.thumbNote, ...(pin.chips || []), ...(pin.list || []).flat()].filter(Boolean).join(' · ');
  scan(pin.id, [pin.title, pin.desc, pin.alt, imageText].join(' '));
  for (const f of [...(pin.img || []), pin.thumb].filter(Boolean)) if (!fs.existsSync(path.join(ROOT, 'products', f))) errors.push(`${pin.id}: missing image products/${f}`);
  if (pin.list && pin.src) {
    if (pin.src === 'lead') { for (const [n] of pin.list) if (!leadSrc.includes(`t: '${n}'`)) errors.push(`${pin.id}: "${n}" not in the lead magnet`); }
    else if (pin.src === 'gift' || pin.src === 'routine') { /* counts checked below */ }
    else {
      const src = SOURCES[pin.src];
      for (const [n, meta] of pin.list) {
        const k = norm(n);
        if (!src.has(k)) { errors.push(`${pin.id}: "${n}" not found in ${pin.src}`); continue; }
        const v = src.get(k);
        if (typeof v === 'number' && meta !== ageText(v)) errors.push(`${pin.id}: "${n}" age "${meta}" but the product says "${ageText(v)}"`);
        if (pin.src.startsWith('bored') && meta !== CATNAME[v]) errors.push(`${pin.id}: "${n}" kind "${meta}" but the card says "${CATNAME[v]}"`);
      }
    }
  }
}
// counts quoted on pins must match the records
const giftAct = giftListing.activities;
for (const c of ['74 busy-book', '76 bored', '52 Play & Talk', '16 play coupons']) if (!giftAct.includes(c)) errors.push(`gift listing no longer says "${c}"`);
if (!/^177 /.test(routineG0.title)) errors.push('routine G0 title no longer starts with 177');
if (bored.CARDS.b13.length + bored.CARDS.b35.length !== 76) errors.push('bored G0 card count is not 76');
if (bored.CARDS.b13.length !== 38 || bored.CARDS.b35.length !== 38) errors.push('bored bands are not 38 + 38');
if (guide.P.length !== 100 || guide.TIRED.length !== 12) errors.push('guide is not 100 plays + 12 tired plays');
if (winter.PLAYS.length !== 24) errors.push('winter countdown is not 24 plays');
if (Object.values(talk.PLAYS).flat().length !== 52) errors.push('talk cards are not 52');

if (errors.length) { console.error('PIN BUILD FAILED\n' + errors.map(e => '  - ' + e).join('\n')); process.exit(1); }

// ---------- schedule: 3 a day from G-day, only live products, spread across products ----------
const SLOTS = [['08:15', '12:15Z'], ['13:15', '17:15Z'], ['20:15', '00:15Z+1']]; // America/New_York before Nov 1 (EDT)
function addDays(d, n) { const t = new Date(d + 'T12:00:00Z'); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); }
function utc(day, local) {
  // local America/New_York → UTC; EDT (−4) until Nov 1, 2026, EST (−5) after (UNVERIFIED DST date: first Sunday of November).
  const off = day < '2026-11-01' ? 4 : 5;
  const [h, mnt] = local.split(':').map(Number);
  const t = new Date(Date.UTC(+day.slice(0, 4), +day.slice(5, 7) - 1, +day.slice(8, 10), h + off, mnt));
  return t.toISOString().replace('.000Z', 'Z');
}
const left = PINS.slice();
const count = {};
const sched = [];
let day = GDAY;
while (left.length) {
  const today = [];
  for (let s = 0; s < 3 && left.length; s++) {
    const ok = left.filter(p => DEST[p.dest].live <= day && !today.some(t => t.dest === p.dest) && !(DEST[p.dest].until && day > DEST[p.dest].until));
    if (!ok.length) break;
    // fewest pins so far first; free-printable pins lead each day (list growth); then the data order
    ok.sort((a, b) => (count[a.dest] || 0) - (count[b.dest] || 0) || (a.dest === 'free' ? -1 : 0) - (b.dest === 'free' ? -1 : 0) || PINS.indexOf(a) - PINS.indexOf(b));
    const pick = ok[0];
    left.splice(left.indexOf(pick), 1);
    count[pick.dest] = (count[pick.dest] || 0) + 1;
    today.push(pick);
    sched.push({ pin: pick, day, local: SLOTS[s][0], utc: utc(day, SLOTS[s][0]) });
  }
  day = addDays(day, 1);
  if (day > '2026-12-31') { console.error('schedule overflow'); process.exit(1); }
}
sched.sort((a, b) => a.utc.localeCompare(b.utc));

// ---------- files ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const csv = rows => rows.map(r => r.map(v => { const s = v == null ? '' : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }).join(',')).join('\n') + '\n';
const file = p => `${p.id}.jpg`;
const boardName = k => BOARDS.find(b => b.key === k).name;
const kw = p => ({ free: 'free printable, toddler activities, baby play ideas', 'toddler-busy-book': 'toddler busy book, busy binder printable, toddler activities',
  'bundle-gift-1-5': 'toddler gift, printable gift, instant download gift', 'visual-routine-cards-0-5': 'toddler routine, picture schedule, routine cards',
  'guide-100-plays': 'screen free activities, toddler activities, baby play ideas', 'bored-play-cards-ages-1-5': 'i am bored jar, toddler activities, indoor activities',
  'play-first-family-kit-ages-2-5': 'family screen time plan, toddler checklist, helping jobs', 'play-talk-cards': 'talk while you play, baby play ideas, toddler play cards',
  'visual-routine-cards-starter': 'toddler routine, morning routine, bedtime routine', 'winter-countdown': 'winter activities, winter countdown, toddler activities' }[p.dest]);

// Pinterest bulk-create CSV (column names as best known, UNVERIFIED: check Pinterest's bulk-upload template on upload day).
fs.writeFileSync(path.join(OUT, 'pins.csv'), csv([
  ['Title', 'Media URL', 'Pinterest board', 'Thumbnail', 'Description', 'Link', 'Publish date', 'Keywords'],
  ...sched.map(({ pin, utc: u }) => [pin.title, `{{PIN_MEDIA_BASE_URL}}/${file(pin)}`, boardName(pin.board), '', pin.desc, link(pin.dest), u, kw(pin)]),
]));
fs.writeFileSync(path.join(OUT, 'pins-master.csv'), csv([
  ['order', 'pin_id', 'image_file', 'publish_date_local', 'publish_time_local', 'time_zone', 'publish_utc', 'board', 'destination', 'link', 'requires_live_listing', 'earliest_date', 'stop_after', 'title', 'description', 'alt_text'],
  ...sched.map(({ pin, day: d, local, utc: u }, i) => [i + 1, pin.id, `png/${file(pin)}`, d, local, 'America/New_York', u, boardName(pin.board), DEST[pin.dest].what, link(pin.dest),
    DEST[pin.dest].etsy ? 'yes: hold until the Etsy listing is live and the placeholder is replaced' : 'yes: hold until the landing page is live', DEST[pin.dest].live, DEST[pin.dest].until || '', pin.title, pin.desc, pin.alt]),
]));
fs.writeFileSync(path.join(OUT, 'boards.csv'), csv([['board', 'description', 'pins'], ...BOARDS.map(b => [b.name, b.desc, PINS.filter(p => p.board === b.key).length])]));
fs.writeFileSync(path.join(OUT, 'pins.json'), JSON.stringify({ generated_by: 'marketing/pins/build/build.js', boards: BOARDS, destinations: DEST,
  pins: sched.map(({ pin, day: d, local, utc: u }) => ({ id: pin.id, file: `png/${file(pin)}`, board: boardName(pin.board), dest: pin.dest, link: link(pin.dest), date: d, time_local: local, publish_utc: u, title: pin.title, description: pin.desc, alt: pin.alt })) }, null, 1) + '\n');

// ---------- HTML (one .pin per pin, rendered with brand/render.js pages) ----------
const R = '../../../';
const img = f => `${R}products/${f}`;
const BG = { sky: ['#E3EEFA', '#3D86D8'], grass: ['#DFF3E9', '#2FA36B'], sun: ['#FEF4D8', '#F5B820'], tomato: ['#FDE9E3', '#EE5A36'], plum: ['#EFE6FA', '#8A5CC7'], wash: ['#F3F6FB', '#1D2940'] };
function art(p) {
  const i = p.img || [];
  if (p.tpl === 'hero') return `<div class="art hero"><img class="shot" src="${img(i[0])}" alt=""></div>`;
  if (p.tpl === 'grid') return `<div class="art grid">${i.map(f => `<div class="cell"><img src="${img(f)}" alt=""></div>`).join('')}</div>`;
  if (p.tpl === 'pages') {
    if (p.one || i.length === 1) return `<div class="art one"><img class="shot" src="${img(i[0])}" alt=""></div>`;
    return `<div class="art fan n${i.length}">${i.map((f, k) => `<img class="shot s${k}" src="${img(f)}" alt="">`).join('')}</div>`;
  }
  if (p.tpl === 'quote') return `<div class="art quote"><div class="bubble"><p class="q">${esc(p.quote)}</p><p class="qby">${esc(p.quoteBy)}</p></div><img class="shot peek" src="${img(i[0])}" alt=""></div>`;
  if (p.tpl === 'list') return `<div class="art list"><ol class="n${p.list.length}">${p.list.map(([a, b], k) => `<li><span class="num">${k + 1}</span><span class="li-t"><b>${esc(a)}</b><em>${esc(b)}</em></span></li>`).join('')}</ol>
    <div class="thumbrow"><img class="thumb" src="${img(p.thumb)}" alt=""><span>${esc(p.thumbNote)}</span></div></div>`;
  throw new Error('tpl ' + p.tpl);
}
const pinHtml = p => {
  const [bg, accent] = BG[p.bg];
  const head = p.tpl === 'quote' ? `<p class="kick">${esc(p.kick)}</p>` : `<p class="kick">${esc(p.kick)}</p><h1 class="${p.h1.length > 26 ? 'long' : ''}">${esc(p.h1)}</h1>`;
  const sub = p.sub ? `<p class="sub">${esc(p.sub)}</p>` : '';
  const chips = p.chips ? `<div class="chips">${p.chips.map(c => `<span>${esc(c)}</span>`).join('')}</div>` : '';
  const free = p.dest === 'free' ? `<p class="freeline">Free with email sign-up · grown-ups only</p>` : '';
  return `<section class="pin t-${p.tpl}" id="${p.id}" style="--bg:${bg};--ac:${accent}">
  <div class="band"></div>
  <header>${head}${p.tpl === 'quote' ? '' : sub}</header>
  ${art(p)}
  ${p.tpl === 'quote' ? sub : ''}
  ${chips}${free}
  <footer><img class="lockup" src="${R}brand/logo/lockup-horizontal.svg" alt="Play Before Pixels"><span class="url">playbeforepixels.com</span></footer>
</section>`;
};
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Play Before Pixels: Pinterest pins</title>
<link rel="stylesheet" href="${R}brand/fonts/fonts.css">
<style>
:root{--ink:#1D2940;--tomatoD:#C4401F}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#fff;font-family:"Nunito Sans",sans-serif;color:var(--ink)}
.pin{width:1000px;height:1500px;position:relative;overflow:hidden;background:var(--bg);display:flex;flex-direction:column;padding:78px 72px 56px;margin:0 0 20px}
.band{position:absolute;left:0;top:0;right:0;height:18px;background:var(--ac)}
.kick{font:800 28px/1.2 "Nunito Sans",sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--tomatoD)}
h1{text-wrap:balance;font:800 104px/1.0 "Bricolage Grotesque","Nunito Sans",sans-serif;letter-spacing:-.02em;margin-top:18px}
h1.long{font-size:86px}
.sub{text-wrap:balance;font:600 38px/1.28 "Nunito Sans",sans-serif;margin-top:22px;max-width:840px}
.art{flex:1;position:relative;margin:34px 0 26px;min-height:0}
.shot{background:#fff;border-radius:14px;box-shadow:0 26px 60px rgba(29,41,64,.20),0 2px 6px rgba(29,41,64,.10)}
.hero{display:flex;align-items:center;justify-content:center}
.hero .shot{max-height:100%;max-width:74%;transform:rotate(-2.5deg)}
.one{display:flex;align-items:center;justify-content:center}
.one .shot{max-height:100%;max-width:82%}
.fan .shot{position:absolute;height:92%;top:4%}
.fan.n2 .s0{left:0;transform:rotate(-4deg);z-index:1}
.fan.n2 .s1{right:0;transform:rotate(3.5deg);top:7%;z-index:2}
.fan.n3 .s0{left:-10px;height:78%;top:2%;transform:rotate(-6deg);z-index:1}
.fan.n3 .s1{left:50%;height:80%;top:10%;transform:translateX(-50%) rotate(1deg);z-index:3}
.fan.n3 .s2{right:-10px;height:78%;top:18%;transform:rotate(6deg);z-index:2}
.grid{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:24px}
.grid .cell{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 14px 34px rgba(29,41,64,.16)}
.grid img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
.quote{display:flex;flex-direction:column;gap:30px}
.bubble{background:#fff;border-radius:34px;padding:52px 54px 44px;position:relative;box-shadow:0 14px 34px rgba(29,41,64,.12)}
.bubble:after{content:"";position:absolute;left:90px;bottom:-34px;border:18px solid transparent;border-top:18px solid #fff;border-left:18px solid #fff}
.q{text-wrap:balance;font:800 76px/1.08 "Bricolage Grotesque","Nunito Sans",sans-serif;letter-spacing:-.01em}
.qby{font:700 28px/1.2 "Nunito Sans",sans-serif;color:var(--tomatoD);margin-top:22px;text-transform:uppercase;letter-spacing:.1em}
.quote .peek{flex:1;min-height:0;width:auto;max-width:78%;align-self:center;object-fit:contain;margin-top:24px}
.t-quote .sub{margin:0 0 20px}
.list{display:flex;flex-direction:column}
.list ol{list-style:none;display:flex;flex-direction:column;justify-content:center;gap:20px;flex:1;min-height:0}
.list li{display:flex;align-items:center;gap:26px;background:#fff;border-radius:22px;padding:24px 28px;box-shadow:0 6px 18px rgba(29,41,64,.08)}
.num{flex:none;width:68px;height:68px;border-radius:50%;background:var(--ink);color:#fff;font:800 36px/68px "Bricolage Grotesque",sans-serif;text-align:center}
.li-t{display:flex;flex-direction:column}
.li-t b{font:800 46px/1.1 "Nunito Sans",sans-serif}
.li-t em{font:600 31px/1.25 "Nunito Sans",sans-serif;font-style:normal;color:#4A5670;margin-top:4px}
.list ol.n6{gap:16px}.list ol.n6 li{padding:16px 26px}.list ol.n6 .li-t b{font-size:42px}.list ol.n6 .li-t em{font-size:28px}
.list ol.n8{gap:12px}.list ol.n8 li{padding:12px 24px;gap:22px}.list ol.n8 .li-t{flex-direction:row;align-items:baseline;gap:14px;flex-wrap:wrap}
.list ol.n8 .li-t b{font-size:38px}.list ol.n8 .li-t em{font-size:27px;margin:0}.list ol.n8 .num{width:54px;height:54px;line-height:54px;font-size:28px}
.thumbrow{display:flex;align-items:center;gap:24px;margin-top:24px;flex:none}
.thumb{height:150px;border-radius:10px;box-shadow:0 10px 24px rgba(29,41,64,.18);background:#fff}
.thumbrow span{font:800 32px/1.2 "Nunito Sans",sans-serif}
.art{overflow:visible}
.chips{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:22px}
.chips span{background:#fff;border-radius:999px;padding:12px 26px;font:800 30px/1.1 "Nunito Sans",sans-serif;box-shadow:0 4px 12px rgba(29,41,64,.08)}
.freeline{font:800 30px/1.2 "Nunito Sans",sans-serif;background:var(--ink);color:#fff;border-radius:16px;padding:16px 24px;margin-bottom:24px;align-self:flex-start}
footer{display:flex;align-items:center;justify-content:space-between;border-top:3px solid rgba(29,41,64,.12);padding-top:26px}
.lockup{height:62px;width:auto}
.url{font:800 28px/1 "Nunito Sans",sans-serif;letter-spacing:.02em}
</style></head><body>
${sched.map(s => pinHtml(s.pin)).join('\n')}
</body></html>
`;
fs.mkdirSync(path.join(OUT, 'src'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'src', 'pins.html'), html);
fs.writeFileSync(path.join(OUT, 'src', 'order.json'), JSON.stringify(sched.map(s => s.pin.id)) + '\n');
console.log(`OK: ${PINS.length} pins, ${BOARDS.length} boards, scheduled ${sched[0].day} → ${sched[sched.length - 1].day}`);
const perDay = {}; sched.forEach(s => perDay[s.day] = (perDay[s.day] || 0) + 1);
console.log(Object.entries(perDay).map(([d, n]) => `${d.slice(5)}:${n}`).join(' '));
