// Writes every automated email for 30 Days of Back-and-Forth from content.js:
//   emails/  — the paid program: welcome (day 0), 30 daily lessons, check-ins on days 3, 10 and 30, day-31 wrap-up
//   funnel/  — the free lead magnet: "7 Days of Play First" (7 emails that deliver the starter and invite to the program)
// Each email is written twice: .html (email-safe, inline styles, 600 px) and .md (for platforms that take Markdown/plain text).
// sequence.json in each folder is the schedule and the merge tags the email platform must fill.
// Run: node build/emails.js
const fs = require('fs');
const path = require('path');
const K = require('./content.js');
const OUT = path.join(__dirname, '..');
const SITE = 'playbeforepixels.com';
const C = { ink: '#1D2940', wash: '#F3F6FB', tomato: '#EE5A36', sun: '#F5B820', sky: '#3D86D8', grass: '#2FA36B', plum: '#8A5CC7', tSun: '#FEF4D8', tSky: '#E3EEFA', tGrass: '#DFF3E9', tTomato: '#FDE9E3', tPlum: '#EFE6FA' };
const WCOL = { sky: [C.sky, C.tSky], grass: [C.grass, C.tGrass], sun: ['#B98500', C.tSun], tomato: [C.tomato, C.tTomato], plum: [C.plum, C.tPlum] };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const SIGN = K.NOTES.signoff || 'The Play Before Pixels team';
// "Share with a friend" slot (BRAND.md): a public, reward-free link to the free starter. No referral program exists, so no
// email may promise a reward (business/GROWTH-ENGINE.md §4 "Referral"; COMPLIANCE-GATE 10 and 18).
const SHARE = K.SHARE_URL;
// Refund wording comes from content.js REFUND, which follows legal/SHIPPING-RETURNS-REFUNDS.md Part B §4.
const R = K.REFUND;
const weekOf = d => K.WEEKS.find(w => d >= w.from && d <= w.to);
// Preheaders: cut at a word boundary (never mid-word) and keep them under about 90 characters.
const pre90 = s => s.length <= 90 ? s : s.slice(0, 88).replace(/[\s,;:]+\S*$/, '') + '…';

// Merge tags the email platform fills (see sequence.json). No child names are ever collected.
const TAG = { unsub: '{{unsubscribe_link}}', pause: '{{pause_or_change_time_link}}', wb: '{{workbook_download_link}}', fb: '{{feedback_form_link}}', buy: '{{program_checkout_link}}', bundle: '{{bundle_checkout_link}}', starter: '{{starter_download_link}}', addr: '{{business_mailing_address}}' };

const NEXT = [ // next-product recommendation per week (BRAND.md: every email recommends a next product)
  { t: 'Play-First Family Kit', s: 'A screen-rhythm chart, a family play plan and helping-jobs pages to put this week on the fridge.', u: SITE + '/shop/play-first-family-kit' },
  { t: '76 “I’m Bored” Play Cards', s: 'Age-banded play ideas with a talk prompt on every card, for the “there’s nothing to do” moments.', u: SITE + '/shop/bored-play-cards' },
  { t: '100 Screen-Free Plays', s: 'The paperback and printable guide for ages 0–5, sorted by age, with a talk line on every play.', u: SITE + '/shop/guide-100-plays' },
  { t: 'Toddler Busy Book', s: '74 printable busy-book activities for ages 1–5, for waiting rooms, car rides and quiet time.', u: SITE + '/shop/toddler-busy-book' },
  { t: '100 Screen-Free Plays', s: 'Keep going after Day 30: 100 more easy plays, sorted by age.', u: SITE + '/shop/guide-100-plays' },
];

// ---------------------------------------------------------------- HTML frame
function frame({ preheader, title, body, next, footNote = '' }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${C.wash};font-family:'Nunito Sans',Helvetica,Arial,sans-serif;color:${C.ink}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.wash}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px">
<tr><td style="padding:24px 32px 8px"><img src="{{logo_url}}" alt="Play Before Pixels" height="36" style="display:block;height:36px;border:0"></td></tr>
<tr><td style="padding:8px 32px 24px;font-size:16px;line-height:1.55">${body}
<p style="margin:24px 0 0">${esc(SIGN)}</p></td></tr>
${next ? `<tr><td style="padding:0 32px 20px"><table role="presentation" width="100%" style="background:${C.tSun};border-radius:12px"><tr><td style="padding:16px 18px;font-size:14px;line-height:1.5"><b>Next for your family:</b> ${esc(next.t)}. ${esc(next.s)} <a href="https://${next.u}" style="color:${C.ink}">See it</a></td></tr></table></td></tr>` : ''}
<tr><td style="padding:0 32px 20px;font-size:14px;line-height:1.5"><b>Share the free printable:</b> know a family who might like it? Our free 7 Days of Play First starter is at <a href="https://${SHARE}" style="color:${C.ink}">${SHARE}</a>.</td></tr>
<tr><td style="padding:16px 32px 28px;border-top:1px solid #DCE3EE;font-size:12px;line-height:1.5;color:#5A6478">
${footNote}This is parent education, not medical advice. For questions about your child’s development, talk with your pediatrician. Every play follows our published safety rules; a grown-up is always there.<br>
We don’t send personal replies about individual children; answers to common questions are at <a href="https://${SITE}/help" style="color:#5A6478">${SITE}/help</a>.<br>
<a href="${TAG.pause}" style="color:#5A6478">Pause or change the send time</a> · <a href="${TAG.unsub}" style="color:#5A6478">Unsubscribe</a><br>
Play Before Pixels, a trade name of AlphaPlay LLC · ${TAG.addr}<br>© 2026 AlphaPlay LLC. ${K.VERSION}</td></tr>
</table></td></tr></table></body></html>`;
}
const P = t => `<p style="margin:0 0 14px">${esc(t)}</p>`;
const box = (bg, inner, border) => `<table role="presentation" width="100%" style="background:${bg};border-radius:12px;${border ? `border-left:5px solid ${border};` : ''}margin:18px 0"><tr><td style="padding:14px 18px;font-size:15px;line-height:1.5">${inner}</td></tr></table>`;
const H = (t, col = C.ink, size = 26) => `<h1 style="font-family:'Bricolage Grotesque',Helvetica,Arial,sans-serif;font-size:${size}px;line-height:1.15;margin:0 0 14px;color:${col}">${esc(t)}</h1>`;
const H2 = t => `<h2 style="font-family:'Bricolage Grotesque',Helvetica,Arial,sans-serif;font-size:20px;line-height:1.2;margin:22px 0 8px">${esc(t)}</h2>`;
const ageLabel = m => m < 24 ? `From ${m} months` : (m % 12 === 0 ? `From ${m / 12} years` : `From ${Math.floor(m / 12)}½ years`);

function playHtml(p, tint) {
  const mat = p.mat.length ? p.mat.join(', ') : 'Nothing but you';
  return `${H2('Today’s play: ' + p.t)}
<p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#4A5570">${ageLabel(p.from)} · ${K.PREP[p.prep]} · ${K.MESS[p.mess]} · ${K.TIME[p.time]}<br>You need: ${esc(mat)}</p>
${P(p.how)}
${box(tint, `<span style="font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase">Talk while you play · ${esc(K.MOVES[p.move].name)}</span><br><span style="font-size:18px;font-weight:700">${esc(p.talk)}</span>`)}
<p style="margin:0 0 8px;font-size:15px"><b>Make it easier:</b> ${esc(p.easier)}<br><b>Make it harder:</b> ${esc(p.harder)}<br><b>Tired-grown-up version (2 minutes):</b> ${esc(p.tired)}</p>
<p style="margin:0 0 8px;font-size:14px;color:#4A5570"><b>Safety:</b> ${esc(p.safe)}</p>`;
}
function playMd(p) {
  const mat = p.mat.length ? p.mat.join(', ') : 'Nothing but you';
  return `## Today’s play: ${p.t}\n\n*${ageLabel(p.from)} · ${K.PREP[p.prep]} · ${K.MESS[p.mess]} · ${K.TIME[p.time]} · You need: ${mat}*\n\n${p.how}\n\n**Talk while you play (${K.MOVES[p.move].name}):** ${p.talk}\n\n- **Make it easier:** ${p.easier}\n- **Make it harder:** ${p.harder}\n- **Tired-grown-up version (2 minutes):** ${p.tired}\n- **Safety:** ${p.safe}\n`;
}
const mdFoot = next => `\n---\n${next ? `**Next for your family:** ${next.t}. ${next.s} https://${next.u}\n\n` : ''}**Share the free printable:** know a family who might like it? Our free 7 Days of Play First starter is at https://${SHARE}\n\n${SIGN}\n\n_This is parent education, not medical advice. For questions about your child’s development, talk with your pediatrician. Every play follows our published safety rules; a grown-up is always there. We don’t send personal replies about individual children; answers are at ${SITE}/help._\n\n[Pause or change the send time](${TAG.pause}) · [Unsubscribe](${TAG.unsub})\nPlay Before Pixels, a trade name of AlphaPlay LLC · ${TAG.addr} · © 2026 AlphaPlay LLC. ${K.VERSION}\n`;

// ================================================================ PAID PROGRAM
const program = [];
// Finished brand-voice notes from content.js NOTES (no placeholders: the build stops if one is empty).
const noteSlot = field => { const t = K.NOTES[field]; if (!t) throw new Error('NOTES.' + field + ' is empty'); return { html: P(t), md: t + '\n\n' }; };

// Day 0: welcome (immediately after purchase)
{
  const fs0 = noteSlot('welcome');
  const body = H('Welcome to ' + K.TITLE, C.tomato) + fs0.html +
    P('Here’s how the next 30 days work. Every day you’ll get one short lesson (about three minutes to read), one easy play and a few plain words for a tricky moment. Nothing to watch, nothing to join, no perfect days required.') +
    box(C.tSky, `<b>Your workbook is ready.</b> Download it here: <a href="${TAG.wb}" style="color:${C.ink}">your ${esc(K.TITLE)} workbook</a>. Start with “START HERE”. You’ll find Color and Low-ink editions in US Letter and A4, and you can type into the planning pages in free Adobe Acrobat Reader.`) +
    P('Before tomorrow, do just one thing: fill a basket with five to eight things your child can play with, all things you already have. Day 1 arrives tomorrow.') +
    P('If you miss a day, nothing breaks. Every lesson stays in your inbox and in the workbook.') +
    box(C.tGrass, `<b>Our guarantee:</b> if the program isn’t right for your family, ${R.terms} (replying to this email works). ${R.after}. ${R.files}. The full terms are in our <a href="https://${SITE}/shipping-returns/" style="color:${C.ink}">refund policy</a>.`);
  const md = `# Welcome to ${K.TITLE}\n\n${fs0.md}Here’s how the next 30 days work. Every day you’ll get one short lesson (about three minutes to read), one easy play and a few plain words for a tricky moment. Nothing to watch, nothing to join, no perfect days required.\n\n**Your workbook is ready:** ${TAG.wb} Start with “START HERE”. Color and Low-ink editions in US Letter and A4; type into the planning pages in free Adobe Acrobat Reader.\n\nBefore tomorrow, do just one thing: fill a basket with five to eight things your child can play with, all things you already have. Day 1 arrives tomorrow.\n\nIf you miss a day, nothing breaks. Every lesson stays in your inbox and in the workbook.\n\n**Our guarantee:** if the program isn’t right for your family, ${R.terms} (replying to this email works). ${R.after}. ${R.files}. Full terms: https://${SITE}/shipping-returns/\n`;
  program.push({ id: 'day-00-welcome', send: 'immediately after purchase', subject: 'Welcome! Your workbook is inside', preheader: 'One small thing to do before Day 1 arrives tomorrow.', body, md, next: null });
}

for (const d of K.DAYS) {
  const w = weekOf(d.d), [col, tint] = WCOL[w.color];
  const next = NEXT[w.n - 1];
  const d30 = d.d === 30 ? noteSlot('day30') : null;
  const body = `<p style="margin:0 0 6px;font-size:13px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:${col}">Day ${d.d} of 30 · ${esc(w.title)}</p>` +
    H(d.title) + box(tint, `<b>${esc(d.idea)}</b>`, col) +
    d.lesson.map(P).join('') + (d30 ? d30.html : '') +
    box(C.wash, `<b>Today’s one small step:</b> ${esc(d.step)}`) +
    playHtml(d.play, tint) +
    H2('Plain words for: ' + d.script.moment) +
    d.script.lines.map(l => `<p style="margin:0 0 6px;font-size:17px;font-weight:700">${esc(l)}</p>`).join('') +
    `<p style="margin:0 0 8px;font-size:14px;color:#4A5570">${esc(d.script.why)}</p>` +
    `<p style="margin:18px 0 0;font-size:14px">Today’s pages in your workbook: Day ${d.d}. <a href="${TAG.wb}" style="color:${C.ink}">Download the workbook again</a></p>`;
  const md = `*Day ${d.d} of 30 · ${w.title}*\n\n# ${d.title}\n\n**${d.idea}**\n\n${d.lesson.join('\n\n')}\n\n${d30 ? d30.md : ''}**Today’s one small step:** ${d.step}\n\n${playMd(d.play)}\n## Plain words for: ${d.script.moment}\n\n${d.script.lines.map(l => '> ' + l).join('\n>\n')}\n\n${d.script.why}\n\nToday’s pages in your workbook: Day ${d.d}. ${TAG.wb}\n`;
  const subj = d.d === 1 ? 'Day 1: Start with one ordinary day' : `Day ${d.d}: ${d.title}`;
  program.push({ id: 'day-' + String(d.d).padStart(2, '0'), send: `day ${d.d}, 7:00 local time`, subject: subj, preheader: pre90(d.idea), body, md, next });
}

// Check-ins on days 3, 10 and 30 (CUSTOMER-VOICE #43), sent in the afternoon
const checkins = [
  [3, 'How are the first three days going?', 'A quick check-in, and one tip if it feels bumpy.', ['Three days in. How’s it going?', 'If the screen spot has caused some protests, that’s normal. The asking often settles once the spot has stayed the same for a week or two. Keep the words the same every day and let the routine do the work.', 'If a day went sideways, just pick up with tomorrow’s lesson. Nothing breaks.']],
  [10, 'Day 10: what’s working?', 'Tell us in one click which play your child liked.', ['Ten days in. Which play has your child asked for again? Those repeat requests are the best sign the program is working for your family.', 'If mornings or the hour before dinner are still hard, look back at Days 10 and 11, and remember: using your screen spot at a hard time of day is a sensible plan, not a failure.']],
  [30, 'You finished! One question for you', 'Which page did your child go back to?', ['You reached Day 30. Thank you for spending your month with us.', 'We have one question: which play or page did your child go back to? Your answer helps us make the next edition better.']],
];
for (const [day, subject, pre, paras] of checkins) {
  const body = H(subject, C.grass, 24) + paras.map(P).join('') + box(C.tGrass, `<a href="${TAG.fb}" style="color:${C.ink};font-weight:800">Answer in one click</a> (a short form, about 30 seconds). We read every answer, but we can’t reply personally.`);
  const md = `# ${subject}\n\n${paras.join('\n\n')}\n\n**Answer in one click:** ${TAG.fb} (about 30 seconds). We read every answer, but we can’t reply personally.\n`;
  program.push({ id: `checkin-day-${String(day).padStart(2, '0')}`, send: `day ${day}, 16:00 local time`, subject, preheader: pre, body, md, next: null });
}
// Day 31 wrap-up
{
  const body = H('What’s next after your 30 days', C.plum, 24) + P('This month isn’t a finish line. It’s a rhythm you now know how to find. Look at your family plan again in a month, and change what you need to as your child grows.') +
    P('If you’d like to keep going, here are two easy next steps.') +
    box(C.tSun, `<b>1. The free monthly play email.</b> Three new plays for your child’s age each month. <a href="https://${SITE}/bonus/course-screen-reset" style="color:${C.ink}">Sign up here</a> (we ask only for your child’s birth month and year, never a name).`) +
    box(C.tSky, `<b>2. 100 Screen-Free Plays.</b> 100 more easy plays for ages 0–5, sorted by age. <a href="https://${SITE}/shop/guide-100-plays" style="color:${C.ink}">See the guide</a>`) +
    P('If the program helped your family, you’re welcome to share the free starter with a friend. The link is below.');
  const md = `# What’s next after your 30 days\n\nThis month isn’t a finish line. It’s a rhythm you now know how to find. Look at your family plan again in a month, and change what you need to as your child grows.\n\n1. **The free monthly play email.** Three new plays for your child’s age each month: https://${SITE}/bonus/course-screen-reset (birth month and year only, never a name).\n2. **100 Screen-Free Plays.** https://${SITE}/shop/guide-100-plays\n\nIf the program helped your family, you’re welcome to share the free starter with a friend. The link is below.\n`;
  program.push({ id: 'day-31-whats-next', send: 'day 31, 7:00 local time', subject: 'What’s next after your 30 days', preheader: 'Two easy ways to keep the rhythm going.', body, md, next: null });
}

// ================================================================ FREE FUNNEL: "7 Days of Play First"
const pick = n => K.DAYS.find(d => d.d === n);
const funnel = [
  { id: 'f1-welcome', send: 'immediately after sign-up', subject: 'Your 7 Days of Play First starter is here', pre: 'Plus today’s play: a walk where you just say what you see.',
    paras: ['Welcome! Your free starter is ready: seven easy plays, a one-page “screen spot” plan and a 7-day tracker, all on paper.', 'Here’s the idea behind it. We’re not banning anything. We’re adding a little more play and talk to ordinary days, and giving screens a steady spot so nobody has to negotiate all afternoon.', 'For the next six days, you’ll get one short email a day with one play and a few plain words for a tricky moment. That’s all.'],
    extra: 'starter', play: 1 },
  { id: 'f2-screen-spot', send: 'day 2', subject: 'The one change that makes the rest easier', pre: 'Same time, same place, same ending.',
    paras: ['If you only change one thing this week, make it this: give screens a steady spot in your day.', 'A steady spot means screens happen at roughly the same time, in the same place, and end the same way. “Shows are after nap, on the couch, for two episodes, then outside.” When children know when screens come, they usually stop asking all day.', 'One promise matters: the spot is never a prize and never a punishment. It doesn’t grow when chores are done or shrink after a hard morning. It just stays put, like lunch.', 'Fill in the screen-spot plan on page 1 of your starter, and tell your child about it tonight, when nobody is upset.'],
    play: 3 },
  { id: 'f3-ending', send: 'day 3', subject: 'What to say when the show ends', pre: 'A warning, a clear ending and a landing.',
    paras: ['Most screen trouble happens at the end. Here’s a three-part ending you can use every day.', 'A warning: sit next to your child and say, “Two more minutes, then the tablet goes to sleep.” A clear ending: the end of the episode or a kitchen timer, so the timer is the bad guy, not you. A landing: say the next thing out loud, “Now we go outside and find the moon.”', 'Expect some protest this week. Stay close, stay calm and keep the ending the same every day. It often gets easier once the ending has stayed the same for a week or two.'],
    play: 6 },
  { id: 'f4-bored', send: 'day 4', subject: '“I’m bored” is a starting line', pre: 'Build a play basket from things you already have.',
    paras: ['Children often reach for a screen because it’s the easiest “yes” in the room. So let’s make play just as easy.', 'Fill a basket with five to eight things you already have: something to build with, something to pretend with, something to make with, something to move with and two or three books. Put it where your child can reach it, near where you usually are, and keep the rest of the toys out of sight for now.', 'When you hear “I’m bored”, try waiting five minutes before offering anything. Boredom is uncomfortable, and it’s also the feeling right before an idea.'],
    play: 4 },
  { id: 'f5-talk', send: 'day 5', subject: 'Five small talk moves (and the research, in plain words)', pre: 'A link, not a cause, and a hopeful idea.',
    paras: ['Young children learn to communicate by doing it, with a person who answers back. Those little back-and-forth exchanges happen in ordinary moments: breakfast, bath time, the floor with blocks.', 'A 2024 study in JAMA Pediatrics recorded the sounds of family life at home and found that toddlers with more screen time heard fewer words from adults and had fewer back-and-forth exchanges (Brushe and colleagues, 2024). That’s a link, not proof that screens cause anything. But it points to something simple and hopeful: talk and play happen when we’re together, with time to answer.', 'Five moves to try this week: pause and wait (count to five in your head), say what you see, repeat and add one word, offer a choice, and follow their lead. Talk, sign, sing and read in the language you know best. A sign, a point or a tap on a device counts as communicating.', 'If you ever have questions about your child’s development, talk with your pediatrician.'],
    play: 15 },
  { id: 'f6-peek', send: 'day 6', subject: 'What a whole month of this looks like', pre: 'A peek inside 30 Days of Back-and-Forth.',
    paras: ['You’re nearly through your seven days. By now you may have noticed when the asking happens and which play your child wants again.', 'If you’d like to keep going, 30 Days of Back-and-Forth is the full program: 30 short daily lessons by email, 30 easy plays with versions for toddlers and preschoolers, plain words for 30 tricky moments, and a designed workbook with trackers, a family plan and a certificate.', 'It covers what the starter doesn’t: mornings, the hour before dinner, big feelings when screens end, waiting rooms, car rides, grown-up phones, “that’s not fair!”, siblings, grandparents and sick days.', 'It’s written, not filmed. No videos, no calls, no coaching. You do it at your own pace.'],
    play: 12, offer: true },
  { id: 'f7-invite', send: 'day 7', subject: 'Keep going: 30 Days of Back-and-Forth', pre: `$27, with a ${R.short}.`,
    paras: ['Your seven days are done. Thank you for spending them with us.', 'If you’d like the whole month, 30 Days of Back-and-Forth is $27. You get 30 daily lessons by email, 30 plays, 30 scripts for tricky moments and the full workbook (Color and Low-ink, Letter and A4, fillable in free Acrobat Reader).', 'Or choose the 30 Days of Back-and-Forth Bundle for $49: the program plus the Play-First Family Kit, the 100 Screen-Free Plays printable guide and the 76 “I’m Bored” Play Cards. Bought separately, those come to $54.49.', `Either way, there’s a guarantee: if it isn’t right for your family, ${R.terms}.`, 'And if now isn’t the time, that’s fine. You’ll keep getting our free monthly play email, and the starter is yours to keep.'],
    play: 7, offer: true, final: true },
];

const funnelOut = funnel.map((f, i) => {
  const d = pick(f.play), w = weekOf(d.d), [col, tint] = WCOL[w.color];
  let body = `<p style="margin:0 0 6px;font-size:13px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:${col}">7 Days of Play First · Day ${i + 1}</p>` + H(f.subject) + f.paras.map(P).join('');
  let md = `*7 Days of Play First · Day ${i + 1}*\n\n# ${f.subject}\n\n${f.paras.join('\n\n')}\n\n`;
  if (f.extra === 'starter') {
    body += box(C.tSky, `<b>Download your starter:</b> <a href="${TAG.starter}" style="color:${C.ink}">7 Days of Play First (PDF, US Letter and A4)</a>`);
    md += `**Download your starter:** ${TAG.starter}\n\n`;
  }
  body += playHtml(d.play, tint) + H2('Plain words for: ' + d.script.moment) + d.script.lines.map(l => `<p style="margin:0 0 6px;font-size:17px;font-weight:700">${esc(l)}</p>`).join('');
  md += playMd(d.play) + `\n## Plain words for: ${d.script.moment}\n\n${d.script.lines.map(l => '> ' + l).join('\n>\n')}\n\n`;
  if (f.offer) {
    body += `<table role="presentation" style="margin:22px 0 6px"><tr><td style="background:${C.tomato};border-radius:999px"><a href="${TAG.buy}" style="display:inline-block;padding:13px 26px;color:#FFFFFF;font-weight:800;text-decoration:none">Start 30 Days of Back-and-Forth · $27</a></td></tr></table>` +
      (f.final ? `<p style="margin:8px 0 0;font-size:14px"><a href="${TAG.bundle}" style="color:${C.ink}">Or get the bundle · $49</a></p>` : '') +
      `<p style="margin:8px 0 0;font-size:13px;color:#4A5570">${R.short} (<a href="https://${SITE}/shipping-returns/" style="color:#4A5570">terms</a>). Written program; no videos, calls or coaching.</p>`;
    md += `**[Start 30 Days of Back-and-Forth · $27](${TAG.buy})**${f.final ? ` · [Or get the bundle · $49](${TAG.bundle})` : ''}\n\n${R.short} (terms: https://${SITE}/shipping-returns/). Written program; no videos, calls or coaching.\n`;
  }
  const next = f.offer ? null : NEXT[1];
  return { id: f.id, send: f.send, subject: f.subject, preheader: f.pre, body, md, next };
});

// ================================================================ write
function write(dir, list, meta) {
  const D = path.join(OUT, dir); fs.mkdirSync(D, { recursive: true });
  for (const e of list) {
    fs.writeFileSync(path.join(D, e.id + '.html'), frame({ preheader: e.preheader, title: e.subject, body: e.body, next: e.next }));
    fs.writeFileSync(path.join(D, e.id + '.md'), `---\nsubject: "${e.subject.replace(/"/g, '\\"')}"\npreheader: "${e.preheader.replace(/"/g, '\\"')}"\nsend: "${e.send}"\n---\n\n${e.md}${mdFoot(e.next)}`);
  }
  fs.writeFileSync(path.join(D, 'sequence.json'), JSON.stringify(Object.assign(meta, {
    merge_tags: { '{{logo_url}}': 'hosted PNG of brand/logo/png/lockup-horizontal-2400.png (upload once to the email platform)', '{{unsubscribe_link}}': 'platform unsubscribe', '{{pause_or_change_time_link}}': 'subscriber preferences page', '{{workbook_download_link}}': 'expiring download link for the workbook files', '{{feedback_form_link}}': 'one-question form (which play did your child go back to?)', '{{program_checkout_link}}': 'checkout for the $27 program', '{{bundle_checkout_link}}': 'checkout for the $49 bundle', '{{starter_download_link}}': 'the free starter PDF', '{{business_mailing_address}}': 'the public business mailing address from legal/ENTITY.md (a USPS PO Box; CAN-SPAM). Most platforms insert it from the account settings: map this tag to that field, or to the platform footer' },
    emails: list.map(e => ({ file: e.id, send: e.send, subject: e.subject, preheader: e.preheader })) }), null, 2));
  console.log(dir, list.length, 'emails');
}
// ---------------------------------------------------------------- Gumroad edition (Markdown to paste into Gumroad Workflows)
// Gumroad Workflows send each email a set number of days after purchase (or after a free sign-up) and add their own
// unsubscribe footer; they have no per-subscriber send time, no pause link and no custom merge tags (all UNVERIFIED).
// So this edition drops the pause and unsubscribe links, and turns every merge tag except the mailing address into a
// fixed link. See emails/LOADING.md.
const GUM = {
  '{{workbook_download_link}}': 'https://app.gumroad.com/library',
  '{{starter_download_link}}': 'https://app.gumroad.com/library',
  '{{program_checkout_link}}': 'https://' + SITE + '/30-days',
  '{{bundle_checkout_link}}': 'https://' + SITE + '/30-days#bundle',
  '{{feedback_form_link}}': 'https://' + SITE + '/30-days/feedback',
};
const delayOf = send => { const m = /day (\d+)/.exec(send); return m ? Number(m[1]) : 0; };
function writeGumroad(dir, list, trigger) {
  const D = path.join(OUT, dir, 'gumroad'); fs.mkdirSync(D, { recursive: true });
  for (const f of fs.readdirSync(D)) if (f.endsWith('.md')) fs.unlinkSync(path.join(D, f));
  const rows = [];
  list.forEach((e, i) => {
    let md = e.md + mdFoot(e.next);
    md = md.replace(`[Pause or change the send time](${TAG.pause}) · [Unsubscribe](${TAG.unsub})\n`, '');
    for (const [k, v] of Object.entries(GUM)) md = md.split(k).join(v);
    if (/\{\{(?!business_mailing_address)[a-z_]+\}\}/.test(md)) throw new Error('unmapped merge tag in gumroad/' + e.id);
    const delay = delayOf(e.send);
    const n = String(i + 1).padStart(2, '0');
    fs.writeFileSync(path.join(D, `${n}-${e.id}.md`), `---\nsubject: "${e.subject.replace(/"/g, '\\"')}"\npreheader: "${e.preheader.replace(/"/g, '\\"')}"\nsend_after: "${delay} day(s) after ${trigger}"\n---\n\n${md}`);
    rows.push({ order: i + 1, file: `${n}-${e.id}.md`, delay_days: delay, subject: e.subject });
  });
  fs.writeFileSync(path.join(D, 'workflow.json'), JSON.stringify({ platform: 'Gumroad Workflows (UNVERIFIED feature names)', trigger, note: 'Paste each file into one workflow email, in order, with its delay. Replace {{business_mailing_address}} once, in every file, with the public mailing address from legal/ENTITY.md. Emails with the same delay go out together.', emails: rows }, null, 2));
  console.log(dir + '/gumroad', rows.length, 'emails');
}

write('emails', program, { sequence: '30 Days of Back-and-Forth (paid program)', trigger: 'purchase of the program or the bundle (tag: 30days-buyer)', rules: ['Send daily lessons at 7:00 in the subscriber’s time zone; the subscriber can pause or change the time.', 'Stop the free funnel (funnel/) for anyone who buys.', 'Never collect or merge a child’s name. Birth month and year only, and only on the free sign-up.', 'Every email is finished text: no founder input is needed before loading (make.sh --final checks that no placeholder remains).'] });
write('funnel', funnelOut, { sequence: '7 Days of Play First (free lead magnet)', trigger: 'sign-up at playbeforepixels.com/30-days/start (email + child birth month/year only; double opt-in)', rules: ['One email a day for 7 days, 7:00 local time.', 'Stop the sequence as soon as the subscriber buys; move them to the program sequence.', 'No countdown timers, no fake deadlines, no “price goes up” claims. Launch-week pricing only if it is genuine and truly ends.', 'After day 7, subscribers join the monthly play email (about 70% help, 30% product).'] });
writeGumroad('emails', program, 'purchase of 30 Days of Back-and-Forth or its bundle');
writeGumroad('funnel', funnelOut, 'the free 7 Days of Play First sign-up ($0 product)');
