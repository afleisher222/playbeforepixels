// Reads every input the site is built from and turns it into one catalog.
// Inputs: site/config.json, products/*/listing*.json, commerce/links.js (in a vm sandbox),
// products/course-screen-reset/build/content.js and the Up! Go! More! manuscript.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { readJSON, exists, money } = require('./util');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const SITE = path.join(ROOT, 'site');
const P = (...a) => path.join(ROOT, ...a);

function loadLinks(file) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  try { vm.runInContext(fs.readFileSync(file || P('commerce/links.js'), 'utf8'), ctx, { timeout: 1000 }); }
  catch (e) { throw new Error('commerce/links.js could not be read: ' + e.message); }
  const raw = ctx.window.PBP_LINKS || {};
  const out = {};
  for (const [k, v] of Object.entries(raw)) {
    if (k === 'booking') continue;                       // never rendered, even when filled (DESIGN-SYSTEM 9.5)
    if (typeof v === 'string' && /^https:\/\/[^\s"'<>]+$/.test(v.trim())) out[k] = v.trim();
  }
  return out;
}

function loadListings() {
  const all = [];
  for (const dir of fs.readdirSync(P('products')).sort()) {
    const d = P('products', dir);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter(n => /^listing.*\.json$/.test(n)).sort()) {
      const data = readJSON(path.join(d, f));
      for (const item of (Array.isArray(data) ? data : [data])) all.push({ ...item, _dir: dir, _file: `products/${dir}/${f}` });
    }
  }
  return all;
}

// "1–12 (four bands…)" -> [1, 12]; "0–5 and 5–12" -> [0, 12]; "Adults" -> null
function ageRange(text) {
  const head = String(text || '').split('(')[0];
  const r = [...head.matchAll(/(\d+)\s*[–-]\s*(\d+)/g)].map(m => [+m[1], +m[2]]);
  if (!r.length) return null;
  return [Math.min(...r.map(x => x[0])), Math.max(...r.map(x => x[1]))];
}

const SCHOOL_RX = /\b(classroom|teachers?|school|child-care|childcare|daycare|day care|library|libraries|PTAs?|PTOs?|storytime|site licen[cs]es?|group licen[cs]es?|in class|preschool staff|centers?|centres?|purchase orders?|quote)\b/i;
const G1_RX = /\b(?:[5-9]|1[0-2])\s*[–-]\s*(?:8|9|1[0-2])\b|\b[0-4]\s*[–-]\s*1[0-2]\b(?!\s*months)|school[- ]age|big kids?|tweens?|first phone|\bteens?\b|\bgrades?\b/i;
const INTERNAL_RX = /\[|\bVERIFY\b|UNVERIFIED|\bFOUNDER\b|\bTODO\b|amazon_route|listing\.json|price_floor|\{\{/;

function priceKnown(listing, price) {
  const cands = [listing.price_usd, listing.price_pdf_usd].filter(x => typeof x === 'number');
  if (cands.some(c => Math.abs(c - price) < 0.001)) return true;
  const notes = [listing.price_notes, listing.price_notes_pdf].filter(Boolean).join(' ');
  const want = [money(price), '$' + price.toFixed(2)];
  return want.some(w => notes.includes(w));
}

function load(opts = {}) {
  const config = readJSON(path.join(SITE, 'config.json'));
  const env = {};
  for (const [k, name] of Object.entries(config.env)) if (!k.startsWith('_')) env[k] = (process.env[name] || '').trim();
  const links = loadLinks(opts.linksFile);
  const listings = loadListings();
  const errors = [];
  const warnings = [];
  const hidden = [];
  const statusRx = new RegExp(config.hideWhenStatus, 'i');
  const gates = config.gates;

  const products = [];
  for (const L of listings) {
    const c = config.products[L.slug] || {};
    const status = typeof L.status === 'string' ? L.status : '';
    if (c.show === false) { hidden.push({ slug: L.slug, why: c.why }); continue; }
    if (status && statusRx.test(status)) { hidden.push({ slug: L.slug, why: 'listing status: ' + status.split(/[.;(]/)[0].trim() }); continue; }
    if (!config.products[L.slug]) { hidden.push({ slug: L.slug, why: 'not described in site/config.json yet (add it to show it)' }); warnings.push(`${L.slug}: new listing has no site/config.json entry, so it is not shown`); continue; }
    for (const k of ['title', 'alt_text', 'price_usd', 'seo_title', 'seo_description', 'short_description']) {
      if (L[k] == null || L[k] === '') errors.push(`${L._file}: missing ${k}`);
    }
    // Ages 5–12 (G1) material waits for counsel: while that gate is closed the site shows the
    // G0 edition (config g0.ages and g0 copy) and files products only under the bands below 5.
    const g0 = !gates.ages5to12.open && c.g0 ? c.g0 : null;
    const range = ageRange(g0 ? g0.ages : L.ages);
    let bands = range ? config.bands.filter(b => range[0] < b.hi && range[1] > b.lo).map(b => b.key) : [];
    if (!gates.ages5to12.open) bands = bands.filter(k => config.bands.find(b => b.key === k).lo < 5);
    const buyKey = 'buy_' + L.slug.replace(/-/g, '_');
    const formats = (c.formats || []).map(f => {
      const out = { ...f };
      if (f.planned) return out;
      if (typeof f.price !== 'number') errors.push(`${L.slug}/${f.id}: format has no price`);
      else if (!priceKnown(L, f.price)) errors.push(`${L.slug}/${f.id}: price ${money(f.price)} is not in ${L._file} (price_usd, price_pdf_usd or price_notes)`);
      const keys = [buyKey + '_' + f.id.replace(/-/g, '_'), ...(f.buy || []), buyKey];
      const k = keys.find(x => links[x]);
      out.buyUrl = k ? links[k] : '';
      out.buyKey = k || '';
      return out;
    });
    if (!formats.some(f => !f.planned && typeof f.price === 'number' && Math.abs(f.price - L.price_usd) < 0.001) &&
        !(typeof L.price_pdf_usd === 'number' && formats.some(f => Math.abs((f.price || 0) - L.price_pdf_usd) < 0.001))) {
      errors.push(`${L.slug}: no format shows listing price_usd ${money(L.price_usd)}`);
    }
    const priced = formats.filter(f => !f.planned);
    const also = [];
    for (const k of (c.also || [])) if (links[k] && !formats.some(f => f.buyKey === k)) also.push({ key: k, url: links[k] });
    if ((L.channels || []).some(ch => /^Etsy/i.test(ch)) && links.etsy) also.push({ key: 'etsy', url: links.etsy });

    const cut = s => String(s).split(/(?<=[.!?])\s+/).filter(x => (gates.schools.open || !SCHOOL_RX.test(x)) && (gates.ages5to12.open || !G1_RX.test(x))).join(' ');
    const long = g0 ? g0.long : String(L.long_description || '').split(/\n\s*\n/).map(cut).map(s => s.trim()).filter(Boolean);
    const bullets = g0 ? g0.bullets : (L.bullets || []).map(cut).map(s => s.trim()).filter(Boolean);
    const faq = (g0 ? [] : (L.faq || [])).filter(q => {
      if (/available now|in stock|ships? (today|now)/i.test(q.a)) return false;               // nothing is on sale yet
      if (!gates.ages5to12.open && G1_RX.test(q.q + ' ' + q.a)) return false;
      const t = q.q + ' ' + q.a;
      if (INTERNAL_RX.test(t)) return false;
      if (/\bEtsy\b|Purchases page/i.test(t)) return false;                     // marketplace-only answers
      if (!gates.schools.open && SCHOOL_RX.test(t)) return false;
      if (/^(Refunds?|Returns?)\??$/i.test(q.q.trim()) || /refund|return/i.test(q.q)) return false; // replaced by the site's policy answer
      if (/license/i.test(q.q)) return false;                                   // replaced by the site's license answer
      if (/delivery|download work|arrive/i.test(q.q)) return false;              // replaced by the site's delivery answer
      return true;
    });

    products.push({
      slug: L.slug, dir: L._dir, file: L._file, listing: L,
      name: c.name || L.title, title: L.title, subtitle: L.subtitle || '', line: c.line || L.short_description,
      series: c.series || '', note: c.note || '',
      url: c.url || `/shop/${L.slug}/`,
      types: c.types || [], bands, range, ageText: range ? `${range[0]}–${range[1]}` : '',
      ground: c.ground || 'wash', mock: c.mock || 'sheet',
      formats, priced, minPrice: Math.min(...priced.map(f => f.price)),
      available: priced.some(f => f.buyUrl), also,
      cover: c.cover || { src: 'cover.png' }, gallery: c.gallery || [{ src: 'cover.png', altFrom: 'alt_text' }],
      isbn: !!c.isbn, alt: L.alt_text, short: g0 ? g0.short : L.short_description, long, bullets, faq, g0: !!g0,
      seoTitle: g0 ? g0.seoTitle : L.seo_title, seoDescription: g0 ? g0.seoDescription : L.seo_description,
      made: ((/Product page line: '(?:How this was made: )?(.+?)'(?=\s+Add|\s*$)/.exec((L.ai_disclosure || {}).site || '') || [])[1] || ''),
      nextRaw: L.next_products || [], cfg: c
    });
  }
  // config entries that point at listings that no longer exist
  for (const s of Object.keys(config.products)) if (!listings.some(l => l.slug === s)) warnings.push(`site/config.json describes ${s}, but no listing has that slug`);

  const bySlug = Object.fromEntries(products.map(p => [p.slug, p]));

  // Bundles: honest sum of parts, computed from the listings.
  const bundles = [];
  for (const b of config.bundles) {
    const parts = b.parts.map(([slug, fmt]) => {
      const p = bySlug[slug];
      if (!p) { errors.push(`bundle ${b.id}: part ${slug} is not a shown product`); return null; }
      const f = p.formats.find(x => x.id === fmt);
      if (!f || f.planned) { errors.push(`bundle ${b.id}: ${slug} has no priced format ${fmt}`); return null; }
      return { p, f };
    }).filter(Boolean);
    const separately = Math.round(parts.reduce((s, x) => s + x.f.price, 0) * 100) / 100;
    if (b.expectSeparately != null && Math.abs(separately - b.expectSeparately) > 0.001) {
      errors.push(`bundle ${b.id}: parts now add up to ${money(separately)}, not ${money(b.expectSeparately)}. Re-check the bundle price before showing it.`);
    }
    if (b.price >= separately) errors.push(`bundle ${b.id}: ${money(b.price)} is not below the parts (${money(separately)})`);
    const k = (b.buy || []).find(x => links[x]);
    const bands = config.bands.filter(band => parts.some(x => x.p.bands.includes(band.key))).map(x => x.key);
    const lo = Math.min(...parts.map(x => x.p.range ? x.p.range[0] : 99));
    const hi = Math.max(...parts.map(x => x.p.range ? x.p.range[1] : 0));
    bundles.push({
      ...b, parts, separately, bands, ageText: `${lo}–${hi}`,
      buyUrl: k ? links[k] : '', available: !!k,
      // "bought separately" is shown only while every part really sells at that price (COMPLIANCE-GATE 18)
      showSeparately: parts.every(x => x.f.buyUrl) && !!k,
      url: `/shop/bundles/#${b.id}`
    });
  }

  // Next for your child's age: listing next_products first, then same-age products.
  for (const p of products) {
    const next = [];
    for (const s of p.nextRaw) {
      if (bySlug[s] && s !== p.slug && !next.includes(bySlug[s])) next.push(bySlug[s]);
      const bd = bundles.find(b => b.id === s);
      if (bd && !next.includes(bd)) next.push(bd);
    }
    for (const q of products) {
      if (next.length >= 4) break;
      if (q !== p && !next.includes(q) && q.bands.some(b => p.bands.includes(b))) next.push(q);
    }
    p.next = next.slice(0, 4);
  }

  // Up! Go! More! word data
  const ugm = bySlug['board-up-go-more'];
  let words = null;
  if (ugm && ugm.cfg.wordExplorer && exists(P('products', ugm.dir, ugm.cfg.wordExplorer))) {
    words = readJSON(P('products', ugm.dir, ugm.cfg.wordExplorer)).words;
  }

  // Course content (single source for refund terms, weeks, days and FAQ)
  let course = null;
  const cf = P('products/course-screen-reset/build/content.js');
  if (exists(cf)) { try { course = require(cf); } catch (e) { warnings.push('course content.js could not be loaded: ' + e.message); } }

  // Names for printed /bonus/<slug> pages, including listings nested inside other product folders
  const bonusNames = {};
  const nested = [];
  for (const dir of fs.readdirSync(P('products'))) {
    const d = P('products', dir);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const sub of fs.readdirSync(d)) {
      const f = path.join(d, sub, 'listing.json');
      if (exists(f)) { const j = readJSON(f); nested.push(j); }
    }
  }
  for (const L of [...listings, ...nested]) {
    const m = /\/bonus\/([\w-]+)/.exec(L.bonus_url || '');
    if (m) (bonusNames[m[1]] = bonusNames[m[1]] || []).push(L);
  }

  return { ROOT, SITE, config, env, links, listings, products, bySlug, hidden, bundles, words, course, bonusNames, errors, warnings, gates };
}

module.exports = { load, ageRange, loadLinks, ROOT, SITE, G1_RX, SCHOOL_RX };
