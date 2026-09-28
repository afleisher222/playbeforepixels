// Trust, help and utility pages: about, help, contact, licenses, research notes, free printable,
// bonus pages, search, 404 and thank-you.
'use strict';
const { esc, money, markdown, frontMatter, typo } = require('../lib/util');
const { I, crumbs, faq, signup, card, mock, tbd } = require('../partials/bits');
const seo = require('../lib/seo');
const helpData = require('./help');
const legal = require('./legal');

function head(o) {
  return `<header class="page-head wrap${o.cls ? ' ' + o.cls : ''}">
    <p class="eyebrow">${esc(o.eyebrow)}</p>
    <h1 class="h1">${o.h1}</h1>
    ${o.lede ? `<p class="lede">${o.lede}</p>` : ''}
  </header>`;
}
const trailOf = (name, url, mid) => [{ name: 'Home', url: '/' }, ...(mid || []), { name, url }];

// ---------------- About ----------------
function about(ctx) {
  const trail = trailOf('About', '/about/');
  const books = ctx.products.filter(p => p.types.includes('books'));
  const body = `<div class="wrap">${crumbs(trail)}</div>
${head({ eyebrow: 'About us', h1: 'Paper, talk and play, made by a small studio.', lede: 'Play Before Pixels makes talk-along books, printable play and a written program for families with young children. Every page is built around one idea: the early years run on back-and-forth talk, touch and play.' })}
<section class="wrap about-body">
  <div class="about-note">
    <p class="col-big">Founded by a parent and educator.</p>
    <p>We keep the studio small and quiet on purpose. There is no founder feed to follow and no personality to buy into. The books and pages do the talking.</p>
    <p class="meta">Play Before Pixels is a trade name of AlphaPlay LLC.</p>
  </div>
  <div class="ledger">
    <div class="ledger-col"><h2 class="ledger-h h3">What we make</h2><ul>
      <li>Talk-along and read-aloud books, printed to order</li>
      <li>Printables in US Letter and A4, color and low-ink</li>
      <li>A written 30-day program by email</li>
      <li>Plain-words guides for grown-ups inside every product</li>
    </ul></div>
    <div class="ledger-col ledger-col--no"><h2 class="ledger-h h3">What we don’t</h2><ul>
      <li>No apps, accounts or anything with a screen</li>
      <li>No coaching, calls, classes or live sessions</li>
      <li>No health or therapy claims, ever</li>
      <li>No ad-tracking pixels, and we never sell your data</li>
    </ul></div>
  </div>
</section>
<section class="section section--wash" aria-labelledby="how-h">
  <div class="wrap how-grid">
    <div><p class="eyebrow">How we work</p><h2 class="h2" id="how-h">Five promises we keep on every page.</h2></div>
    <ol class="steps">
      <li><b>Sorted by age, never by deadline.</b> Everything sits on one age scale so you can start where your child is. Ages are a guide, never a test.</li>
      <li><b>The why, in plain words.</b> Every product carries a short grown-up guide: a two-minute setup, three talk lines and what to expect.</li>
      <li><b>Safety first.</b> Every play follows our published safety rules: a grown-up plays along, and small parts, cords, balloons and choking foods stay out of reach.</li>
      <li><b>Honest research.</b> When we mention a study, we describe links as associations, not causes, and we cite a short list of published sources.</li>
      <li><b>Honest prices.</b> One everyday price. No fake sales, no countdown timers, no “was” prices.</li>
    </ol>
  </div>
</section>
<section class="section" aria-labelledby="made-h">
  <div class="wrap made-grid">
    <div>
      <p class="eyebrow">How it is made</p>
      <h2 class="h2" id="made-h">Made with AI tools, checked against our rules.</h2>
      <p class="lede">Our text, illustrations and page layouts are created with AI tools for Play Before Pixels, inside written rules for safety, tone and honesty. Each product page says how that product was made. Books are printed by print-on-demand partners and shipped by them.</p>
      <p><a class="link" href="/shop/">See what we make ${I.arr}</a></p>
    </div>
    <ul class="shelf shelf--about">${books.slice(0, 3).map(b => `<li><a href="${b.url}"><div class="surface g-${b.ground}">${mock(ctx, b, { sizes: '(max-width: 760px) 30vw, 14vw', widths: [240, 480] })}</div><span><b>${esc(b.name)}</b><small>Ages ${esc(b.ageText)}</small></span></a></li>`).join('')}</ul>
  </div>
</section>`;
  return ctx.page({ key: 'about', path: '/about/', nav: 'about', title: 'About Play Before Pixels: Paper, Talk and Play',
    description: 'A small studio founded by a parent and educator, making talk-along books and printable play for young children. No apps, no coaching, no live sessions.',
    jsonld: [seo.breadcrumbs(ctx, trail), seo.organization(ctx)] }, body);
}

// ---------------- Help ----------------
function help(ctx) {
  const trail = trailOf('Help center', '/help/');
  const H = helpData(ctx);
  const linkify = a => esc(a)
    .replace(/contact page/g, '<a href="/contact/">contact page</a>')
    .replace(/shipping and returns page/g, '<a href="/shipping-returns/">shipping and returns page</a>')
    .replace(/privacy policy/g, '<a href="/privacy/">privacy policy</a>')
    .replace(/licenses page/g, '<a href="/licenses/">licenses page</a>')
    .replace(/accessibility statement/g, '<a href="/accessibility/">accessibility statement</a>');
  const body = `<div class="wrap">${crumbs(trail)}</div>
${head({ eyebrow: 'Help center', h1: 'Plain answers, all in one place.', lede: 'Orders, downloads, printing, shipping, refunds and licenses. Can’t find yours? <a href="/contact/">Write to us</a>; every message gets a written reply.' })}
<div class="wrap info-body">
  <nav class="info-toc" aria-label="Help topics"><p class="eyebrow">Topics</p><ol>${H.map(s => `<li><a href="#${s.id}">${esc(s.h)}</a></li>`).join('')}</ol></nav>
  <div class="info-main">
    <div class="help-search" data-help-search hidden><label>${I.search}<span class="visually-hidden">Filter answers</span><input type="search" placeholder="Filter answers, e.g. printing" data-help-filter autocomplete="off"></label></div>
    <p class="meta help-count" data-help-count aria-live="polite"></p>
    ${H.map(s => `<section class="info-sec" id="${s.id}" aria-labelledby="${s.id}-h" data-help-sec><h2 class="h3 help-h" id="${s.id}-h">${esc(s.h)}</h2>${faq(s.qs.map(q => ({ q: q.q, aHtml: `<p>${linkify(q.a)}</p>` })))}</section>`).join('\n')}
  </div>
</div>`;
  const all = H.flatMap(s => s.qs);
  return ctx.page({ key: 'help', path: '/help/', nav: '', title: 'Help Center: Orders, Downloads and Printing',
    description: 'Answers about downloads, printing at home, printed-to-order books, refunds, licenses and privacy at Play Before Pixels.',
    jsonld: [seo.breadcrumbs(ctx, trail), seo.faqPage(all)] }, body);
}

// ---------------- Contact ----------------
function contact(ctx) {
  const trail = trailOf('Contact', '/contact/');
  const action = ctx.env.contactFormAction;
  const email = ctx.env.contactEmail;
  const live = !!action;
  const answers = helpData(ctx).flatMap(s => s.qs.map(q => ({ q: q.q, url: '/help/#' + s.id, k: (q.q + ' ' + q.a).toLowerCase() })));
  const body = `<div class="wrap">${crumbs(trail)}</div>
${head({ eyebrow: 'Contact', h1: 'Write to us.', lede: 'We are an email-first studio: no phone line, no chat, no calls. Most questions already have an answer in the <a href="/help/">help center</a>. For anything else, write here and you will get a written reply.' })}
<section class="wrap contact-wrap">
  <form class="contact-form${live ? '' : ' is-soon'}" ${live ? `action="${esc(action)}" method="post"` : 'action="#" data-soon'} aria-describedby="cf-state" data-contact>
    <fieldset${live ? '' : ' disabled'}>
      <legend class="visually-hidden">Contact form</legend>
      <div class="field"><label for="cf-email">Your email</label><input id="cf-email" type="email" name="email" autocomplete="email" required></div>
      <div class="field"><label for="cf-topic">Topic <span class="opt">(optional)</span></label><select id="cf-topic" name="topic"><option value="">Choose a topic</option><option>An order or download</option><option>A printed book</option><option>Printing help</option><option>A refund</option><option>Accessibility or another format</option><option>Privacy request</option><option>Something else</option></select></div>
      <div class="field field--wide"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" rows="6" data-contact-msg></textarea></div>
      <div class="contact-sugg field--wide" data-contact-sugg hidden><p><b>These answers might help:</b></p><ul></ul></div>
      <p class="field--wide cf-note">Please don’t include children’s names, photos, schools or health details. <a href="/privacy/">Privacy</a></p>
      <div class="field--wide"><button class="btn" type="submit">${live ? 'Send message' : 'Contact form opens soon'}</button></div>
    </fieldset>
    <p class="su-state field--wide" id="cf-state" role="status">${live ? '' : '<b>The contact form opens with the shop.</b> It is switched off until our email service is connected, so nothing typed here is sent or saved.'}</p>
  </form>
  <aside class="contact-side">
    <h2 class="h3">Other ways</h2>
    <dl class="colophon-table">
      <div><dt>Email</dt><dd>${email ? `<a href="mailto:${esc(email)}">${esc(email)}</a>` : tbd('email address added at launch')}</dd></div>
      <div><dt>Phone</dt><dd>None. Every answer comes in writing, so you can keep it.</dd></div>
      <div><dt>Post</dt><dd>AlphaPlay LLC, ${tbd('mailing address added at launch')}</dd></div>
    </dl>
    <p><a class="link" href="/help/">Browse the help center ${I.arr}</a></p>
  </aside>
  <script type="application/json" data-answers>${JSON.stringify(answers).replace(/</g, '\\u003c')}</script>
</section>`;
  return ctx.page({ key: 'contact', path: '/contact/', nav: '', title: 'Contact Play Before Pixels',
    description: 'Write to Play Before Pixels. We are an email-first studio with no phone line: every message gets a written reply. Most answers are in the help center.',
    jsonld: [seo.breadcrumbs(ctx, trail)] }, body);
}

// ---------------- Licenses ----------------
function licenses(ctx) {
  const o = { key: 'licenses', path: '/licenses/', name: 'Licenses', h1: 'What you may do with our files.', eyebrow: 'Licenses',
    title: 'Licenses for Printables and Downloads | Play Before Pixels',
    desc: 'Every purchase comes with a Personal / Family license for your own household. Classroom, site and organization licenses are not available yet.',
    lede: 'In short: print as many copies as your own household needs, and share a link rather than the file.' };
  const html = `<div class="lic-grid">
    <div class="lic lic--on"><p class="stamp stamp--grass stamp--flat">Included with every purchase</p><h2 class="h3">Personal / Family</h2>
      <ul class="ticks"><li>The buyer and their household</li><li>Unlimited copies for home use</li><li>On your own devices</li><li>Share a link to the shop, not the file</li></ul></div>
    <div class="lic lic--off"><p class="stamp stamp--ink stamp--flat">Not available yet</p><h2 class="h3">Single classroom</h2>
      <p>One teacher or caregiver with the children they teach. Not on sale today.</p></div>
    <div class="lic lic--off"><p class="stamp stamp--ink stamp--flat">Not available yet</p><h2 class="h3">Site or organization</h2>
      <p>A school, center, library or group. Not on sale today.</p></div>
  </div>
  <p>Licenses for classrooms, child-care settings, libraries and organizations are not sold yet. Some of our printed files mention them; until this page says otherwise, only the Personal / Family license is available.</p>
  <h2>Under every license, please don’t</h2>
  <ul>
    <li>sell, give away or share the files, in whole or in part, or include them in a bundle, kit or course;</li>
    <li>upload or post them on public or shared websites, drives, social media or marketplaces;</li>
    <li>remove or cover the copyright notice;</li>
    <li>use them to train or prompt artificial-intelligence systems, or to make competing products.</li>
  </ul>
  <p>You may post a photo of a product in use that shows no more than one page, with credit to Play Before Pixels.</p>
  <h2>Refunds and questions</h2>
  <p>Refunds follow our <a href="/shipping-returns/">shipping and returns policy</a>. For permission to do something not covered here, <a href="/contact/">write to us</a>.</p>
  <p class="meta">© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC. These license terms are a draft awaiting attorney review.</p>`;
  return legal.shell(ctx, o, html);
}

// ---------------- Accessibility (policy draft + what we tested) ----------------
function accessibility(ctx, qa) {
  const tested = qa && qa.pages ? `<h2>What we tested on this site</h2>
  <p>Every page on this site was checked with an automated browser suite on ${esc(qa.date)} at ${qa.widths.length} widths (${qa.widths.join(', ').replace(/, (\d+)$/, ' and $1')} pixels; every width below 1000 with touch and phone emulation), ${qa.pass} checks in all:</p>
  <ul>
    <li>no sideways scrolling, no broken links or images, and no script errors;</li>
    <li>one main heading per page and no skipped heading levels;</li>
    <li>text contrast of at least 4.5:1 (3:1 for large text) measured against the real background;</li>
    <li>a visible focus ring on every stop when moving through a page with the Tab key, a working “Skip to content” link, and menus that open, close with Escape and return focus;</li>
    <li>a name for every button, link, image and form field.</li>
  </ul>
  <p>Known limits: we have not yet tested with every screen reader, and checkout and email sign-up will run on third-party pages that we will test when they are connected. Product PDFs are being tagged for screen readers; ask us for another format any time.</p>` : '';
  return legal.policy(ctx, 'accessibility', {
    transform: md => md.replace(/## Where we are\n[^\n]*\n/, '## Where we are\n'),
    after: tested
  });
}

// ---------------- Research notes ----------------
function hubPages(ctx) {
  const fs = require('fs'); const path = require('path');
  const dir = path.join(ctx.ROOT, 'content/research-hub');
  const out = [];
  const walk = d => { for (const n of fs.readdirSync(d)) { const f = path.join(d, n); if (fs.statSync(f).isDirectory()) { if (!/^(_|review)/.test(n)) walk(f); } else if (n.endsWith('.md')) out.push(f); } };
  walk(dir);
  return out.map(f => ({ f, ...frontMatter(fs.readFileSync(f, 'utf8')) })).filter(x => x.data.publish === true);
}

function research(ctx) {
  const S = ctx.cfg.site;
  const pages = hubPages(ctx);
  const trail = trailOf(S.hubName, '/research/');
  const list = pages.length ? `<ul class="hub-list">${pages.map(p => `<li><a href="/${String(p.data.slug).replace(/^\/|\/$/g, '')}/">${esc(p.data.h1 || p.data.title)}</a><p>${esc(p.data.meta_description || '')}</p></li>`).join('')}</ul>` : `<div class="hub-calm">
      <p class="hand">Being reviewed.</p>
      <p>Research notes are being reviewed; they will appear here. Each note is checked against the original published papers before it goes up, and it will say plainly when a study found a link rather than a cause.</p>
      <p>Until then, the best source for questions about your own child is your child’s doctor. Our <a href="/disclaimer/">medical and educational disclaimer</a> explains what our materials are, and are not.</p>
    </div>`;
  const body = `<div class="wrap">${crumbs(trail)}</div>
${head({ eyebrow: S.hubName, h1: 'Quiet, careful notes on the research.', lede: 'Short, plain summaries of published studies and guidance about young children, play, talk and screens. No products, no ads.' })}
<section class="wrap hub-body">${list}</section>`;
  const html = ctx.hubPage({ key: 'research', path: '/research/', title: `${S.hubName}: Research on Play, Talk and Screens`,
    description: 'Plain summaries of published research on young children, play, talk and screens. Notes appear here once each one has been reviewed.',
    jsonld: [seo.breadcrumbs(ctx, trail)] }, body);
  return { html, pages };
}

function hubArticle(ctx, p) {
  const url = '/' + String(p.data.slug).replace(/^\/|\/$/g, '') + '/';
  const trail = trailOf(p.data.h1 || p.data.title, url, [{ name: ctx.cfg.site.hubName, url: '/research/' }]);
  const body = `<div class="wrap">${crumbs(trail)}</div><article class="wrap doc"><header class="doc-head"><p class="eyebrow">${esc(ctx.cfg.site.hubName)}</p><h1 class="h1">${esc(p.data.h1 || p.data.title)}</h1>
    <p class="meta">Last reviewed ${esc(p.data.last_reviewed || '')}</p></header><div class="prose doc-body">${markdown(p.body.replace(/^# [^\n]*\n/, ''), { shiftHeadings: 0 }).replace(/<h1/g, '<h2').replace(/<\/h1>/g, '</h2>')}</div></article>`;
  return { url, html: ctx.hubPage({ key: 'hub-article', path: url, title: p.data.title, description: p.data.meta_description, ogType: 'article', jsonld: [seo.breadcrumbs(ctx, trail)] }, body) };
}

// ---------------- Free printable ----------------
function free(ctx) {
  const F = ctx.cfg.free;
  const trail = trailOf('Free printable', '/free/');
  const pages = ['p01.png', 'p02.png', 'p03.png'].map(n => `products/${F.preview.replace(/p01\.png$/, n)}`);
  const body = `<div class="wrap">${crumbs(trail)}</div>
<section class="wrap free-hero" aria-labelledby="free-h">
  <div class="free-copy">
    <p class="eyebrow">Free printable · 3 pages</p>
    <h1 class="h1" id="free-h">${esc(F.title)}.</h1>
    <p class="lede">Seven easy plays with things you already have, a simple screen-spot plan and a tracker for the fridge. Nothing to buy, nothing to ban.</p>
    <ul class="ticks">
      <li>One play a day for a week, each with a starting age and a 2-minute version</li>
      <li>A plan that gives screens a steady spot in the day</li>
      <li>US Letter and A4</li>
    </ul>
    ${signup(ctx, { id: 'free', tone: 'light', source: 'free-7-days', button: 'Send me the printable', legend: 'Get the free printable' })}
  </div>
  <div class="free-pages" aria-label="The three pages of the free printable" role="group">
    ${pages.map((src, i) => `<figure class="fp fp-${i + 1}">${ctx.img.pic({ src, widths: [400, 800], sizes: '(max-width: 1060px) 45vw, 22vw', alt: ['Page one: our screen spot and a seven-day tracker.', 'Page two: seven easy plays, one for each day.', 'Page three: what comes next, with the link to the written program.'][i], eager: i === 0 })}</figure>`).join('')}
    <p class="hand fp-note">free, and yours to keep</p>
  </div>
</section>`;
  return ctx.page({ key: 'free', path: '/free/', nav: 'free', title: `${F.title}: a Free Printable for Families`,
    description: 'A free 3-page printable: seven easy plays with things you already have, a screen-spot plan and a fridge tracker. Just an email; never a child’s name.',
    ogImage: ctx.img.og(`products/${F.preview}`), jsonld: [seo.breadcrumbs(ctx, trail)] }, body);
}

// ---------------- Bonus pages (printed QR targets; noindex) ----------------
function bonus(ctx, slug) {
  const p = ctx.bySlug[slug];
  const name = p ? p.name : null;
  const trail = trailOf('Your free bonus', `/bonus/${slug}/`);
  const body = `<div class="wrap">${crumbs(trail)}</div>
<section class="wrap bonus-wrap" aria-labelledby="bonus-h">
  <div>
    <p class="eyebrow">Free companion bonus</p>
    <h1 class="h1" id="bonus-h">${name ? `Thanks for reading ${esc(name)}.` : 'Thanks for scanning.'}</h1>
    <p class="lede">Your free bonus printable is sent by email, so it always reaches you as a file you can keep. Just an email; if you like, add your child’s birth month so we can match the plays to their age. Never a name.</p>
    ${signup(ctx, { id: 'bonus', tone: 'light', source: 'bonus-' + slug, button: 'Send me the bonus', legend: 'Get your bonus' })}
    <p class="bonus-more">While you wait, the <a href="/free/">free 7 Days of Play First printable</a> and the <a href="/help/">help center</a> are open to everyone.</p>
  </div>
  ${p ? `<div class="surface g-${p.ground} bonus-vis">${mock(ctx, p, { sizes: '(max-width: 1060px) 60vw, 30vw', widths: [480, 900] })}</div>` : ''}
</section>`;
  return ctx.page({ key: 'bonus', path: `/bonus/${slug}/`, nav: '', noindex: true,
    title: name ? `Your Free Bonus for ${name}` : 'Your Free Bonus | Play Before Pixels',
    description: 'The free companion printable for your Play Before Pixels product, sent by email. Just an email; never a child’s name.' }, body);
}

// ---------------- Search, 404, thank-you ----------------
function search(ctx) {
  const body = `<div class="wrap">${crumbs(trailOf('Search', '/search/'))}</div>
${head({ eyebrow: 'Search', h1: 'Search the site' })}
<section class="wrap search-page" data-search-page>
  <form class="search-bar search-bar--page" role="search" action="/search/" method="get">
    <label>${I.search}<span class="visually-hidden">Search</span><input type="search" name="q" placeholder="Books, printables, answers" data-search-page-input></label>
    <button class="btn" type="submit">Search</button>
  </form>
  <p class="count" data-search-page-count aria-live="polite"></p>
  <div class="search-results search-results--page" data-search-page-results></div>
  <noscript><p>Search needs JavaScript. Browse <a href="/shop/">the shop</a> or the <a href="/help/">help center</a> instead.</p></noscript>
</section>`;
  return ctx.page({ key: 'search', path: '/search/', nav: '', noindex: true, title: 'Search | Play Before Pixels', description: 'Search books, printables and help answers at Play Before Pixels.' }, body);
}

function notFound(ctx) {
  const body = `<section class="wrap nf">
  <p class="hand">This page wandered off.</p>
  <h1 class="h1">We can’t find that page.</h1>
  <p class="lede">It may have moved. Try a search, pick an age, or head back to the start.</p>
  <form class="search-bar search-bar--page" role="search" action="/search/" method="get"><label>${I.search}<span class="visually-hidden">Search</span><input type="search" name="q" placeholder="Books, printables, answers"></label><button class="btn" type="submit">Search</button></form>
  <ul class="m-ages nf-ages">${ctx.cfg.bands.filter(b => ctx.countBand(b.key)).map(b => `<li><a class="m-age c-${b.color}" href="/shop/ages/${b.key}/"><b>${b.label}</b><small>${b.name}</small></a></li>`).join('')}</ul>
  <p><a class="link" href="/">Back to the home page ${I.arr}</a></p>
</section>`;
  return ctx.page({ key: '404', path: '/404.html', nav: '', noindex: true, title: 'Page Not Found | Play Before Pixels', description: 'This page could not be found. Search the site or shop by age.' }, body);
}

function thanks(ctx) {
  const body = `<section class="wrap nf">
  <p class="eyebrow">Thank you</p>
  <h1 class="h1">You’re all set.</h1>
  <p class="lede">Check your inbox for an email from Play Before Pixels. If it isn’t there in a few minutes, look in Promotions or Spam.</p>
  <p><a class="link" href="/shop/">Back to the shop ${I.arr}</a></p>
</section>`;
  return ctx.page({ key: 'thanks', path: '/thank-you/', nav: '', noindex: true, title: 'Thank You | Play Before Pixels', description: 'Thank you. Your email from Play Before Pixels is on its way.' }, body);
}

module.exports = { about, help, contact, licenses, accessibility, research, hubArticle, free, bonus, search, notFound, thanks, helpData };
