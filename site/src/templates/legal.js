// Policy pages built from the attorney drafts in legal/. Every page is marked DRAFT until the
// attorney's review is recorded (config.legal.reviewed), fill-ins show as labelled boxes, drafting
// notes are dropped, and coaching or live-service wording is removed (COMPLIANCE-GATE 21; BRAND
// "No coaching and no live services").
'use strict';
const fs = require('fs');
const path = require('path');
const { esc, markdown } = require('../lib/util');
const { crumbs } = require('../partials/bits');
const seo = require('../lib/seo');

const PAGES = {
  privacy: { file: 'legal/PRIVACY-POLICY.md', path: '/privacy/', name: 'Privacy policy', title: 'Privacy Policy | Play Before Pixels', desc: 'How Play Before Pixels (AlphaPlay LLC) handles personal information: as little as we can, never sold, and nothing about children.' },
  terms: { file: 'legal/TERMS-OF-USE.md', path: '/terms/', name: 'Terms of use', title: 'Terms of Use | Play Before Pixels', desc: 'The terms for using playbeforepixels.com and buying from Play Before Pixels, a trade name of AlphaPlay LLC. Draft pending attorney review.' },
  disclaimer: { file: 'legal/MEDICAL-EDUCATIONAL-DISCLAIMER.md', path: '/disclaimer/', name: 'Medical and educational disclaimer', title: 'Medical and Educational Disclaimer | Play Before Pixels', desc: 'Play Before Pixels shares parent education about play and talk. It is not medical, therapy or speech-language advice.' },
  shipping: { file: 'legal/SHIPPING-RETURNS-REFUNDS.md', path: '/shipping-returns/', name: 'Shipping, returns and refunds', title: 'Shipping, Returns and Refunds | Play Before Pixels', desc: 'How printed-to-order books ship, what happens if something arrives damaged, and how refunds work for downloads and the written program.' },
  disclosures: { file: 'legal/AFFILIATE-ENDORSEMENT-DISCLOSURE.md', path: '/disclosures/', name: 'Affiliate and endorsement disclosure', title: 'Affiliate and Endorsement Disclosure | Play Before Pixels', desc: 'How Play Before Pixels labels affiliate links, free copies and testimonials. No bought, invented or filtered reviews.' },
  accessibility: { file: 'legal/ACCESSIBILITY-STATEMENT.md', path: '/accessibility/', name: 'Accessibility statement', title: 'Accessibility Statement | Play Before Pixels', desc: 'Our accessibility goal (WCAG 2.1 AA), what we tested on this site, known limits, and how to ask for any page or file in another format.' }
};

// Phrase-level edits: live services are not offered, so the drafts' coaching wording is removed.
const PHRASES = [
  [/, take a course, or attend a coaching session or workshop/g, ', or take a course'],
  [/If you do so in a coaching session or message/g, 'If you do so in a message'],
  [/schedule coaching and workshops, /g, ''],
  [/\(orders, courses, coaching\)/g, '(orders and courses)'],
  [/enrollment, progress, workshop registration, organization name/g, 'enrollment and progress'],
  [/Course and event details/g, 'Course details'],
  [/our course\/event platform/g, 'our course platform'],
  [/online courses and events/g, 'online courses'],
  [/courses, coaching, workshops and the free research hub/g, 'courses and the free research hub'],
  [/ Coaching and workshops are governed by our Coaching & Workshop Terms\./g, ''],
  [/courses, coaching, workshops or research hub/g, 'courses or research hub'],
  [/, and coaching with us is not therapy or a clinical service\./g, '.'],
  [/\*\*As an Amazon Associate I earn from qualifying purchases\.\*\*\s*/g, ''],
  [/These may include \[Bookshop\.org\], \[Amazon Associates\] and \[other programs\]\.\s*/g, 'We are not enrolled in any affiliate program today; this page will name each program before any affiliate link appears. '],
  [/, videos, podcasts and social posts/g, ' and social posts'],
  [/at the start of the video\/audio, /g, ''],
  [/captions for videos and transcripts for audio and podcast episodes;\n/g, ''],
  [/[ \t]*\[hello@DOMAIN\]|\[privacy@DOMAIN\]|\[accessibility@DOMAIN\]|\[hello@DOMAIN\]/g, 'the email address on our contact page'],
  [/\[DOMAIN\]\/help/g, 'playbeforepixels.com/help'],
  [/\[DOMAIN\]/g, 'playbeforepixels.com']
];
const DROP_NOTE = /^(ATTORNEY|DEVELOPER|Attorney|Choose|This section|State honestly|Keep this|LINK|EU\/UK wording)/;

function clean(md) {
  let s = md.replace(/\r/g, '');
  s = s.replace(/^# DRAFT[^\n]*\n+/, '').replace(/^# [^\n]*\n+/, '').replace(/^\*\*Last updated:\*\*[^\n]*\n+/m, '');
  for (const [a, b] of PHRASES) s = s.replace(a, b);
  // Drop whole sections about coaching or workshops.
  s = s.replace(/^(#{2,4}) [^\n]*(Coaching|Workshop)[^\n]*\n[\s\S]*?(?=^#{2,4} |\s*$(?![\s\S]))/gmi, '');
  // Drop any line still offering coaching or live workshops.
  s = s.split('\n').filter(l => !/coach|workshop/i.test(l)).join('\n');
  // Drop the "choose one" duty options (the store decides at checkout; the page says so instead).
  s = s.replace(/^- \*\*Duties (included|not included)[^\n]*\n/gm, '');
  s = s.replace(/### International orders: duties and taxes\n/, '### International orders: duties and taxes\nWhether import duties are included is shown at checkout before you pay.\n');
  return s;
}

function bracket(t) {
  t = t.trim();
  if (!t || DROP_NOTE.test(t)) return '';
  if (/^(BUSINESS MAILING ADDRESS|BUSINESS MAILING ADDRESS, PMB format)$/.test(t)) return '<span class="tbd">mailing address added before launch</span>';
  if (/^DATE$/.test(t)) return '<span class="tbd">date set at review</span>';
  if (/^(EMAIL|STATEMENT DESCRIPTOR)$/.test(t)) return `<span class="tbd">${t === 'EMAIL' ? 'email on our contact page' : 'shown on your receipt'}</span>`;
  if (/^[\d.,%–-]+$/.test(t)) return `<span class="tbd tbd--val" title="Draft value, confirmed at attorney review">${esc(t)}</span>`;
  if (/X–Y|X-Y/.test(t)) return '<span class="tbd">shown at checkout</span>';
  if (t.length <= 60) return `<span class="tbd tbd--val" title="Draft wording, confirmed at attorney review">${esc(t)}</span>`;
  return '';
}

function draftBanner(ctx) {
  return `<div class="draft-note" role="note"><p class="stamp stamp--flat">Draft</p><p><b>This policy is a draft and is not yet in force.</b> It is waiting for review by a licensed attorney. Nothing is on sale yet. Boxed words are details that will be filled in before launch.</p></div>`;
}

function shell(ctx, o, bodyHtml, extraHead = '') {
  const trail = [{ name: 'Home', url: '/' }, { name: o.name, url: o.path }];
  const body = `<div class="wrap">${crumbs(trail)}</div>
<article class="wrap doc">
  <header class="doc-head">
    <p class="eyebrow">${esc(o.eyebrow || 'Policies')}</p>
    <h1 class="h1">${esc(o.h1 || o.name)}</h1>
    ${o.lede ? `<p class="lede">${o.lede}</p>` : ''}
    ${o.draft === false ? '' : draftBanner(ctx)}
  </header>
  <div class="prose doc-body">${bodyHtml}</div>
</article>`;
  return ctx.page({ key: o.key, path: o.path, nav: '', title: o.title, description: o.desc, jsonld: [seo.breadcrumbs(ctx, trail)] }, body);
}

function policy(ctx, key, extra = {}) {
  const o = { ...PAGES[key], key, ...extra };
  let md = clean(fs.readFileSync(path.join(ctx.ROOT, o.file), 'utf8'));
  if (extra.transform) md = extra.transform(md);
  let html = markdown(md, { bracket, shiftHeadings: 0 });
  html = html.replace(/<h1/g, '<h2').replace(/<\/h1>/g, '</h2>');
  return shell(ctx, o, html + (extra.after || ''));
}

module.exports = { PAGES, policy, shell, clean, bracket, draftBanner };
