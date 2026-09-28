#!/usr/bin/env node
// Research-hub review bundle: assembles six hub pages into one HTML file for paid reviewers,
// writes bundle-manifest.json (a version ID tied to the exact source text), and, with --pdf,
// renders hub-review-bundle.pdf through brand/render.js.
//
// Usage (from anywhere):
//   node content/research-hub/review/build-bundle.js                  # draft stage, HTML + manifest only
//   node content/research-hub/review/build-bundle.js --pdf            # ... and render the PDF
//   node content/research-hub/review/build-bundle.js --stage review --pdf   # after primary-source verification
//
// The version ID is the first 12 hex characters of a SHA-256 over the six source files, so it changes
// whenever a reviewed page changes. Sign-off forms quote it; credits are valid only for that version
// (see REVIEW-PACK.md, "Credits").
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');

const HERE = __dirname;
const HUB = path.resolve(HERE, '..');
const ROOT = path.resolve(HERE, '../../..');
const argv = process.argv.slice(2);
const opt = (name, dflt) => { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] ? argv[i + 1] : dflt; };
const STAGE = opt('--stage', 'draft');
const WANT_PDF = argv.includes('--pdf');
const OUT_HTML = path.join(HERE, 'hub-review-bundle.html');
const OUT_PDF = path.join(HERE, 'hub-review-bundle.pdf');
const OUT_MANIFEST = path.join(HERE, 'bundle-manifest.json');
const PACK = path.join(HERE, 'REVIEW-PACK.md');

// Scope map. '@intro' = everything before the first "## " heading; '*' = the whole page.
// Keep in step with REVIEW-PACK.md, sections "Role B" and "Role A".
const PAGES = [
  { file: 'index.md', code: 'IDX',
    clinician: ['@intro', "What we still don't know", 'What parents can do'],
    sensitivity: ['@intro', 'A note to autistic readers and their families', 'What critics say', 'What parents can do'] },
  { file: 'faq.md', code: 'FAQ',
    clinician: ['@intro', "If you're worried", 'Everyday life with screens'],
    sensitivity: ['About the term', 'For autistic readers'] },
  { file: 'glossary.md', code: 'GLO',
    clinician: ['Words about autism and development', 'Tests and checklists', 'Help and services'],
    sensitivity: ['Words about the debate', 'Words about autism and development'] },
  { file: 'pediatrician-questions.md', code: 'PED', clinician: ['*'], sensitivity: ['About us as a family'] },
  { file: 'early-intervention.md', code: 'EIV', clinician: ['*'], sensitivity: ['Common worries'] },
  { file: 'editorial-policy.md', code: 'POL', clinician: [], sensitivity: ['Respectful language'] },
];

// ---------- helpers ----------
const norm = s => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').trim();
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const unq = v => { v = v.trim(); return (v.startsWith('"') && v.endsWith('"')) ? v.slice(1, -1).replace(/\\"/g, '"') : v; };
const plain = s => s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*_`>#|]/g, ' ');
const words = s => (plain(s).match(/[A-Za-z0-9À-ɏ][^\s]*/g) || []).length;

function inline(s) {
  s = esc(s);
  s = s.replace(/\[(VERIFY[^\]]*)\]/g, '<span class="vf">[$1]</span>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="ln">$1</span>');
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*(?!\s)(.+?)(?<!\s)\*(?!\w)/g, '$1<em>$2</em>');
  s = s.replace(/\[(\d+)\]/g, '<span class="ph">[$1]</span>');
  return s;
}

function parseFrontMatter(txt) {
  if (!txt.startsWith('---')) return [{}, txt];
  const end = txt.indexOf('\n---', 3);
  const fmText = txt.slice(4, end);
  const body = txt.slice(end + 4);
  const fm = {}; let listKey = null; let item = null;
  for (const line of fmText.split('\n')) {
    let m;
    if ((m = line.match(/^([A-Za-z_]+):\s*(.*)$/))) {
      listKey = null; item = null;
      if (m[2] === '') { listKey = m[1]; fm[listKey] = []; } else fm[m[1]] = unq(m[2]);
    } else if (listKey && (m = line.match(/^\s*-\s+([A-Za-z_]+):\s*(.*)$/))) {
      item = { [m[1]]: unq(m[2]) }; fm[listKey].push(item);
    } else if (listKey && item && (m = line.match(/^\s+([A-Za-z_]+):\s*(.*)$/))) {
      item[m[1]] = unq(m[2]);
    }
  }
  return [fm, body];
}

// Minimal Markdown to blocks: headings, paragraphs, lists (bullet, ordered, checkbox), blockquotes, tables, rules.
function toBlocks(md) {
  md = md.replace(/<!--[\s\S]*?-->/g, '');
  const lines = md.split('\n');
  const blocks = []; let i = 0;
  const isList = l => /^\s*([-*]|\d+\.)\s+/.test(l);
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if ((m = l.match(/^(#{1,4})\s+(.*)$/))) { blocks.push({ t: 'h', lvl: m[1].length, text: m[2].trim() }); i++; continue; }
    if (/^-{3,}\s*$/.test(l)) { blocks.push({ t: 'hr' }); i++; continue; }
    if (l.startsWith('>')) {
      const paras = [[]];
      while (i < lines.length && lines[i].startsWith('>')) {
        const c = lines[i].replace(/^>\s?/, '');
        if (!c.trim()) paras.push([]); else paras[paras.length - 1].push(c);
        i++;
      }
      blocks.push({ t: 'quote', paras: paras.filter(p => p.length) });
      continue;
    }
    if (l.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        if (!/^\|[\s:|-]+\|\s*$/.test(lines[i])) rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
        i++;
      }
      blocks.push({ t: 'table', rows });
      continue;
    }
    if (isList(l)) {
      const ordered = /^\s*\d+\./.test(l);
      const start = ordered ? parseInt(l.trim(), 10) : 1;
      const items = [];
      while (i < lines.length && (isList(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length))) {
        if (isList(lines[i])) items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ''));
        else items[items.length - 1] += ' ' + lines[i].trim();
        i++;
      }
      blocks.push({ t: 'list', ordered, start, items });
      continue;
    }
    const buf = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|>|\||-{3,}\s*$)/.test(lines[i]) && !isList(lines[i])) { buf.push(lines[i].trim()); i++; }
    blocks.push({ t: 'p', text: buf.join(' ') });
  }
  return blocks;
}

// Render blocks. With a page config, numbers every block (IDX-001 ...) and tags scope.
function render(blocks, page, shift = 0) {
  const out = []; let n = 0; let section = '@intro'; let title = null;
  const counts = { all: 0, clinician: 0, sensitivity: 0 };
  const inScope = list => !!page && (list.includes('*') || list.includes(section));
  const id = () => page ? `${page.code}-${String(++n).padStart(3, '0')}` : null;
  const cls = () => page && inScope(page.clinician) ? ' in-c' : '';
  const count = txt => { if (!page) return; const w = words(txt); counts.all += w; if (inScope(page.clinician)) counts.clinician += w; if (inScope(page.sensitivity)) counts.sensitivity += w; };
  const bid = x => x ? `<span class="bid">${x}</span>` : '';
  for (const b of blocks) {
    if (b.t === 'h') {
      if (page && b.lvl === 1 && !title) { title = b.text; continue; }
      if (b.lvl <= 2) section = norm(b.text);
      count(b.text);
      let tags = '';
      if (page && b.lvl === 2) {
        if (inScope(page.clinician) && !page.clinician.includes('*')) tags += '<span class="tag tc">Clinician scope</span>';
        if (inScope(page.sensitivity)) tags += '<span class="tag ts">Sensitivity focus</span>';
      }
      const lv = Math.min(Math.max(b.lvl + shift, 2), 4);
      out.push(`<h${lv}>${inline(b.text)}${tags ? ' ' + tags : ''}</h${lv}>`);
    } else if (b.t === 'hr') {
      out.push('<hr>');
    } else if (b.t === 'p') {
      count(b.text);
      out.push(`<p class="blk${cls()}">${bid(id())}${inline(b.text)}</p>`);
    } else if (b.t === 'quote') {
      b.paras.forEach(p => count(p.join(' ')));
      out.push(`<blockquote class="blk${cls()}">${bid(id())}${b.paras.map(p => `<p>${p.map(inline).join('<br>')}</p>`).join('')}</blockquote>`);
    } else if (b.t === 'list') {
      const tag = b.ordered ? 'ol' : 'ul';
      const lis = b.items.map(it => {
        count(it);
        const chk = /^\[ \]\s+/.test(it);
        const txt = chk ? it.replace(/^\[ \]\s+/, '') : it;
        return `<li class="blk${chk ? ' chk' : ''}${cls()}">${bid(id())}${chk ? '<span class="box"></span>' : ''}${inline(txt)}</li>`;
      }).join('');
      out.push(`<${tag}${b.ordered && b.start !== 1 ? ` start="${b.start}"` : ''}${chkList(b) ? ' class="chklist"' : ''}>${lis}</${tag}>`);
    } else if (b.t === 'table') {
      const [head, ...rows] = b.rows;
      out.push(`<table><thead><tr>${head.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${inline(c) || '&nbsp;'}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
    }
  }
  return { html: out.join('\n'), title, counts, blocks: n };
}
const chkList = b => b.items.every(it => /^\[ \]\s+/.test(it));

// ---------- build ----------
const hash = crypto.createHash('sha256');
const pages = PAGES.map(p => {
  const src = fs.readFileSync(path.join(HUB, p.file), 'utf8');
  hash.update(p.file + '\n' + src + '\n');
  const [fm, body] = parseFrontMatter(src);
  const r = render(toBlocks(body), p);
  return { ...p, fm, ...r, sha256: crypto.createHash('sha256').update(src).digest('hex'), url: '/' + (fm.slug || p.file.replace('.md', '')) + '/' };
});
const VERSION = hash.digest('hex').slice(0, 12);
const BUILT = new Date().toISOString().slice(0, 10);
const totals = pages.reduce((a, p) => ({ all: a.all + p.counts.all, clinician: a.clinician + p.counts.clinician, sensitivity: a.sensitivity + p.counts.sensitivity }), { all: 0, clinician: 0, sensitivity: 0 });
const verifyLeft = pages.reduce((a, p) => a + (fs.readFileSync(path.join(HUB, p.file), 'utf8').replace(/<!--[\s\S]*?-->/g, '').match(/\[VERIFY/g) || []).length, 0);

// Sign-off forms and the comment table come from REVIEW-PACK.md (single source of truth).
let appendix = '';
if (fs.existsSync(PACK)) {
  const pack = fs.readFileSync(PACK, 'utf8');
  const m = pack.match(/<!-- bundle:appendix:start -->([\s\S]*?)<!-- bundle:appendix:end -->/);
  if (m) appendix = render(toBlocks(m[1]), null, -1).html;  // pack uses ### for form titles; print them as h2
}

const stageNote = STAGE === 'review'
  ? `<strong>Review version.</strong> Every source cited on these pages has been checked against the original (abstract at minimum). Please review this version; your sign-off form quotes its version ID.`
  : `<strong>Pre-verification draft.</strong> The sources on these pages have not yet been checked against the original papers, so numbers and items marked <span class="vf">[VERIFY]</span> may still change. Use this copy to scope and quote the work. The review itself is done on the <em>review version</em>, rebuilt after verification, with a new version ID.`;

const reviewerCell = (p, role) => {
  if (role === 'S') return p.sensitivity.length ? 'Full read; focus: ' + p.sensitivity.map(s => s === '@intro' ? 'opening boxes' : s).join('; ') : 'Full read';
  if (role === 'C') return p.clinician.includes('*') ? 'Whole page' : p.clinician.length ? p.clinician.map(s => s === '@intro' ? 'Opening boxes' : s).join('; ') : '—';
  return 'Whole page';
};

const css = `
@page { size: 8.5in 11in; margin: 0.65in 0.7in 0.8in 0.7in;
  @bottom-left { content: "Play Before Pixels \\00B7  Research hub review bundle \\00B7  version ${VERSION} \\00B7  CONFIDENTIAL, UNPUBLISHED"; font-family: "Nunito Sans", sans-serif; font-size: 7.5pt; color: #4B5569; }
  @bottom-right { content: "Page " counter(page) " of " counter(pages); font-family: "Nunito Sans", sans-serif; font-size: 7.5pt; color: #4B5569; } }
@page :first { @bottom-left { content: none; } @bottom-right { content: none; } }
:root { --ink:#1D2940; --paper:#FFFFFF; --wash:#F3F6FB; --tomato:#EE5A36; --sun:#F5B820; --sky:#3D86D8; --grass:#2FA36B; --plum:#8A5CC7;
  --t-tomato:#FDE9E3; --t-sun:#FEF4D8; --t-sky:#E3EEFA; --t-grass:#DFF3E9; --t-plum:#EFE6FA; --muted:#4B5569; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: var(--paper); color: var(--ink); }
body { font-family: "Nunito Sans", "Helvetica Neue", Arial, sans-serif; font-size: 9.8pt; line-height: 1.45; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, .display { font-family: "Bricolage Grotesque", "Nunito Sans", sans-serif; font-weight: 800; letter-spacing: -0.01em; }
strong { font-weight: 800; }

/* cover */
.cover { min-height: 9.3in; display: flex; flex-direction: column; break-after: page; }
.kicker { display: inline-block; align-self: flex-start; background: var(--ink); color: #fff; font-weight: 800; font-size: 8pt; letter-spacing: 0.08em; text-transform: uppercase; padding: 5px 10px; border-radius: 3px; }
.cover .brand { margin-top: 0.35in; font-family: "Bricolage Grotesque", sans-serif; font-weight: 700; font-size: 11pt; color: var(--muted); }
.cover h1 { font-size: 34pt; line-height: 1.02; margin: 6px 0 10px; }
.cover .lede { font-size: 12pt; max-width: 6.2in; margin: 0 0 16px; }
.bar { display: flex; height: 8px; margin: 4px 0 18px; } .bar i { flex: 1; } .bar i:nth-child(1){background:var(--tomato)} .bar i:nth-child(2){background:var(--sun)} .bar i:nth-child(3){background:var(--sky)} .bar i:nth-child(4){background:var(--grass)} .bar i:nth-child(5){background:var(--plum)}
.vbox { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1px solid #C9D3E3; border-radius: 6px; overflow: hidden; margin-bottom: 14px; }
.vbox div { padding: 8px 10px; border-right: 1px solid #C9D3E3; } .vbox div:last-child { border-right: 0; }
.vbox b { display: block; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); font-weight: 800; }
.vbox span { font-family: "Bricolage Grotesque", sans-serif; font-weight: 700; font-size: 12pt; }
.note { background: var(--t-sun); border-left: 4px solid var(--sun); padding: 9px 12px; margin: 0 0 12px; font-size: 9.3pt; }
.conf { background: var(--wash); border-left: 4px solid var(--ink); padding: 9px 12px; margin: 0 0 12px; font-size: 9pt; }
table { width: 100%; border-collapse: collapse; font-size: 8.6pt; margin: 6px 0 12px; }
th { text-align: left; background: var(--wash); font-weight: 800; padding: 5px 6px; border-bottom: 1.5px solid var(--ink); vertical-align: bottom; }
td { padding: 5px 6px; border-bottom: 1px solid #D5DCE8; vertical-align: top; }
tr { break-inside: avoid; }
.cover .foot { margin-top: auto; font-size: 8pt; color: var(--muted); }

/* how-to page */
.howto { break-after: page; }
.howto h2 { font-size: 17pt; margin: 0 0 8px; }
.howto h3 { font-size: 11pt; margin: 14px 0 4px; font-weight: 800; break-after: avoid; }
.howto ul { break-before: avoid; }
.howto p, .howto li { margin: 0 0 6px; }
.legend { display: grid; grid-template-columns: 1.3in 1fr; gap: 6px 12px; align-items: start; margin: 8px 0 10px; font-size: 9.2pt; }

/* hub pages */
.hubpage { break-before: page; }
.phead { border-bottom: 2px solid var(--ink); padding-bottom: 8px; margin-bottom: 14px; }
.pcode { display: inline-block; background: var(--ink); color: #fff; font-weight: 800; font-size: 8pt; padding: 3px 8px; border-radius: 3px; letter-spacing: 0.06em; margin-right: 6px; }
.phead .url { font-size: 8.5pt; color: var(--muted); font-weight: 700; }
.phead h1 { font-size: 21pt; line-height: 1.12; margin: 6px 0 6px; }
.phead .meta { font-size: 8.3pt; color: var(--muted); }
.phead .meta b { color: var(--ink); }
.content { padding-left: 0.52in; position: relative; }
.content h2 { font-size: 14pt; line-height: 1.2; margin: 18px 0 6px; break-after: avoid; }
.content h3 { font-size: 10.6pt; font-weight: 800; margin: 12px 0 4px; break-after: avoid; }
.content h4 { font-size: 10pt; font-weight: 800; margin: 10px 0 4px; break-after: avoid; }
.content p { margin: 0 0 7px; }
.content ul, .content ol { margin: 0 0 8px; padding-left: 1.15em; }
.content li { margin: 0 0 4px; break-inside: avoid; }
.content ul.chklist { list-style: none; padding-left: 0; }
.content li.chk { list-style: none; }
.box { display: inline-block; width: 9px; height: 9px; border: 1.3px solid var(--ink); border-radius: 2px; margin-right: 6px; vertical-align: -1px; }
.blk { position: relative; }
.bid { position: absolute; left: -0.52in; width: 0.44in; top: 0.15em; font-size: 6.8pt; font-weight: 700; color: var(--muted); letter-spacing: 0.02em; text-align: left; }
.content ul .bid, .content ol .bid { left: calc(-0.52in - 1.15em); }
.content ul.chklist .bid { left: -0.52in; }
.in-c::after { content: ""; position: absolute; left: -0.08in; top: 0.1em; bottom: 0.1em; width: 2.5px; background: var(--sky); border-radius: 2px; }
.content ul .in-c::after, .content ol .in-c::after { left: calc(-0.08in - 1.15em); }
.content ul.chklist .in-c::after { left: -0.08in; }
h2.in-c, h3.in-c, h4.in-c { position: relative; }
blockquote { margin: 0 0 9px; padding: 8px 11px; background: var(--wash); border-radius: 4px; break-inside: avoid; }
blockquote p { margin: 0 0 4px; } blockquote p:last-child { margin-bottom: 0; }
blockquote .bid { left: -0.52in; top: 8px; }
blockquote.in-c::after { left: -0.08in; }
hr { border: 0; border-top: 1px solid #C9D3E3; margin: 12px 0; }
.ln { text-decoration: underline; text-decoration-color: var(--sky); text-decoration-thickness: 1px; text-underline-offset: 2px; }
.vf { background: var(--t-sun); border: 0.6px solid var(--sun); border-radius: 3px; padding: 0 3px; font-size: 0.86em; font-weight: 700; white-space: normal; }
.ph { background: var(--t-tomato); border-radius: 3px; padding: 0 3px; font-weight: 700; }
.tag { display: inline-block; font-family: "Nunito Sans", sans-serif; font-size: 7pt; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; padding: 2px 6px; border-radius: 10px; vertical-align: 3px; margin-left: 4px; color: var(--ink); }
.tc { background: var(--t-sky); border: 0.8px solid var(--sky); }
.ts { background: var(--t-plum); border: 0.8px solid var(--plum); }
.sources { margin-top: 16px; border-top: 1.5px solid var(--ink); padding-top: 8px; font-size: 8pt; break-before: auto; }
.sources h3 { font-size: 9pt; font-weight: 800; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; }
.sources ol { margin: 0; padding-left: 1.6em; } .sources li { margin: 0 0 2px; break-inside: avoid; }
.sources .st { font-weight: 700; color: var(--muted); }

/* appendix */
.appendix { break-before: page; }
.appendix > .inner h2 { font-size: 15pt; margin: 18px 0 6px; break-after: avoid; }
.appendix > .inner h2:first-child { margin-top: 0; }
.appendix > .inner h3 { font-size: 11pt; font-weight: 800; margin: 12px 0 4px; break-after: avoid; }
.appendix > .inner h4 { font-size: 10pt; font-weight: 800; margin: 10px 0 4px; break-after: avoid; }
.appendix p { margin: 0 0 6px; }
.appendix ul, .appendix ol { margin: 0 0 8px; padding-left: 1.15em; }
.appendix ul.chklist { list-style: none; padding-left: 1.4em; }
.appendix li { margin: 0 0 4px; break-inside: avoid; }
.appendix .form { break-before: page; }
.appendix .form:first-of-type { break-before: auto; }
.appendix td { height: 0.36in; }
.appendix table th:nth-child(1){width:4%} .appendix table th:nth-child(2){width:11%} .appendix table th:nth-child(3){width:11%} .appendix table th:nth-child(4){width:27%} .appendix table th:nth-child(5){width:29%} .appendix table th:nth-child(6){width:18%}
.appendix td { border-bottom: 1px solid #B8C3D6; }
`;

const rows = pages.map(p => `<tr><td><b>${p.code}</b></td><td>${esc(p.title || p.fm.title || p.file)}<br><span style="color:#4B5569">${esc(p.url)}</span></td><td style="text-align:right">${p.counts.all.toLocaleString('en-US')}</td><td>${esc(reviewerCell(p, 'S'))}</td><td>${esc(reviewerCell(p, 'C'))}${p.counts.clinician ? ` <span style="color:#4B5569">(${p.counts.clinician.toLocaleString('en-US')} words)</span>` : ''}</td><td>${reviewerCell(p, 'L')}</td></tr>`).join('');

// Split the appendix into one sheet per sign-off form (each "## " heading after the first starts a new sheet).
const appendixHtml = appendix ? appendix.split(/(?=<h2)/).map((chunk, k) => `<div class="${k === 0 ? '' : 'form'}">${chunk}</div>`).join('\n') : '';

const sourcesHtml = p => {
  const src = (p.fm.sources || []).filter(s => s.citation);
  if (!src.length) return '';
  return `<div class="sources"><h3>Sources this page lists (from its front matter)</h3><ol>${src.map(s => `<li>${inline(s.citation)}${s.citation_status ? ` <span class="st">· status: ${esc(s.citation_status)}</span>` : ''}${s.what_we_read ? ` <span class="st">· what we read: ${esc(s.what_we_read)}</span>` : ''}</li>`).join('')}</ol></div>`;
};

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Research hub review bundle · version ${VERSION}</title>
<link rel="stylesheet" href="../../../brand/fonts/fonts.css">
<style>${css}</style></head>
<body>

<section class="cover">
  <span class="kicker">Confidential · unpublished draft · for contracted reviewers only</span>
  <div class="brand">Play Before Pixels · Research hub</div>
  <h1>Research hub<br>review bundle</h1>
  <div class="bar"><i></i><i></i><i></i><i></i><i></i></div>
  <p class="lede">Six plain-language pages about the term &ldquo;virtual autism&rdquo;, screens and early development, prepared for three paid reviews: an autistic sensitivity read, a clinician review of the practical guidance, and a claims and legal review.</p>
  <div class="vbox">
    <div><b>Version ID</b><span>${VERSION}</span></div>
    <div><b>Built</b><span>${BUILT}</span></div>
    <div><b>Stage</b><span>${STAGE === 'review' ? 'Review version' : 'Pre-verification draft'}</span></div>
    <div><b>Words / blocks</b><span>${totals.all.toLocaleString('en-US')} / ${pages.reduce((a, p) => a + p.blocks, 0)}</span></div>
  </div>
  <div class="note">${stageNote}${STAGE !== 'review' ? ` Items still marked [VERIFY] in this build: <strong>${verifyLeft}</strong>.` : ''}</div>
  <div class="conf"><strong>Confidential.</strong> These pages are unpublished drafts owned by AlphaPlay LLC (doing business as Play Before Pixels). Please do not share them, quote them, or upload them to any AI tool or public service, and do not contact any person or organization named in them. Your contract sets out the full terms.</div>
  <div class="foot">&copy; 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC. &nbsp;·&nbsp; Source files: content/research-hub/*.md &nbsp;·&nbsp; Built by content/research-hub/review/build-bundle.js</div>
</section>

<section class="howto">
  <h2>Pages and who reviews what</h2>
  <table>
    <thead><tr><th>Code</th><th>Page and planned web address</th><th style="text-align:right">Words</th><th>A. Autistic sensitivity read</th><th>B. Clinician review</th><th>C. Claims and legal</th></tr></thead>
    <tbody>${rows}
    <tr><td></td><td><b>Total</b></td><td style="text-align:right"><b>${totals.all.toLocaleString('en-US')}</b></td><td><b>${totals.all.toLocaleString('en-US')}</b> words (${totals.sensitivity.toLocaleString('en-US')} in focus sections)</td><td><b>${totals.clinician.toLocaleString('en-US')}</b> words in scope</td><td><b>${totals.all.toLocaleString('en-US')}</b> words</td></tr></tbody>
  </table>
  <h2 style="margin-top:14px">How to use this bundle</h2>
  <p>Each page starts on a new sheet. Read the pages your brief covers, write your comments in the comment table at the back (or the same columns in any spreadsheet), then complete your sign-off form. All communication is in writing.</p>
  <div class="legend">
    <div><span class="bid" style="position:static">IDX-014</span></div><div><strong>Block ID.</strong> Every paragraph, list item and box has an ID in the left margin: page code plus number. Use it in your comments so each one points to one exact place.</div>
    <div><span class="tag tc" style="margin:0">Clinician scope</span></div><div><strong>Clinician scope.</strong> Sections in the clinician's scope carry this tag, and each of their blocks has a blue bar in the margin. Pages marked &ldquo;whole page&rdquo; in the table above are entirely in scope.</div>
    <div><span class="tag ts" style="margin:0">Sensitivity focus</span></div><div><strong>Sensitivity focus.</strong> The sensitivity reader reads every page; these sections are where respect and framing matter most.</div>
    <div><span class="vf">[VERIFY]</span></div><div><strong>Not yet checked.</strong> The editors have not yet read this source or official page themselves. On the review version, every remaining claim has been checked or removed.</div>
    <div><span class="ph">[5]</span></div><div><strong>Placeholder.</strong> A number or promise the business still has to confirm. Tell us if the wording around it is a problem.</div>
    <div><span class="ln">Underlined text</span></div><div><strong>A link</strong> on the website, usually to a one-page summary of a study. Study pages are not part of this bundle.</div>
  </div>
  <h3>What every reviewer should know</h3>
  <ul>
    <li>The business behind these pages sells play products (books and printables). The research pages carry no product links and no prices; one link goes to a free play printable, described only as play and family time. You are not asked to review, and must not be presented as endorsing, any product.</li>
    <li>The pages were drafted with the help of AI tools and edited by the business. You are reviewing them, not writing them.</li>
    <li>Your fee is the same whatever you conclude. &ldquo;Does not pass&rdquo; is a valid result.</li>
    <li>Your name appears on a page only if you choose that on your sign-off form, only on the pages you reviewed, and only for the version you reviewed.</li>
    <li>The internal editor notes in the source files are not shown here. Each page ends with the list of sources recorded for it.</li>
  </ul>
  <h3>Comment levels</h3>
  <ul>
    <li><strong>Must-fix:</strong> the page cannot be published with this as written.</li>
    <li><strong>Should-fix:</strong> strongly recommended; the business must answer in writing if it does not change it.</li>
    <li><strong>Suggestion:</strong> optional improvement.</li>
  </ul>
</section>

${pages.map(p => `<section class="hubpage">
  <div class="phead">
    <div><span class="pcode">${p.code}</span><span class="url">${esc(p.url)}</span></div>
    <h1>${inline(p.title || p.fm.title || '')}</h1>
    <div class="meta"><b>Draft status:</b> ${esc(p.fm.review_status || 'draft')} &nbsp;·&nbsp; <b>Last reviewed:</b> ${esc(p.fm.last_reviewed || '')} &nbsp;·&nbsp; <b>Words:</b> ${p.counts.all.toLocaleString('en-US')}${p.counts.clinician ? ` (clinician scope ${p.counts.clinician.toLocaleString('en-US')})` : ''} &nbsp;·&nbsp; <b>Source file:</b> content/research-hub/${p.file} &nbsp;·&nbsp; <b>SHA-256:</b> ${p.sha256.slice(0, 12)}</div>
  </div>
  <div class="content">
${p.html}
${sourcesHtml(p)}
  </div>
</section>`).join('\n')}

${appendixHtml ? `<section class="appendix"><div class="inner">${appendixHtml}</div></section>` : ''}
</body></html>`;

fs.writeFileSync(OUT_HTML, html);
const manifest = {
  version: VERSION, built: BUILT, stage: STAGE, verify_marks_left: verifyLeft,
  words: totals,
  pages: pages.map(p => ({ code: p.code, file: 'content/research-hub/' + p.file, url: p.url, sha256: p.sha256, words: p.counts.all, clinician_words: p.counts.clinician, sensitivity_focus_words: p.counts.sensitivity, blocks: p.blocks })),
  html: path.relative(ROOT, OUT_HTML), pdf: path.relative(ROOT, OUT_PDF),
};
fs.writeFileSync(OUT_MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`bundle ${VERSION} (${STAGE}): ${totals.all} words, clinician scope ${totals.clinician}, sensitivity focus ${totals.sensitivity}, [VERIFY] left ${verifyLeft}`);
if (WANT_PDF) {
  cp.execFileSync('node', [path.join(ROOT, 'brand/render.js'), 'pdf', OUT_HTML, OUT_PDF], { stdio: 'inherit' });
  console.log('pdf ' + path.relative(ROOT, OUT_PDF));
}
