// Small helpers shared by the build. Node standard library only.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Whole prices drop ".00": 29 -> "$29", 6.5 -> "$6.50".
const money = usd => {
  const v = Math.round(usd * 100) / 100;
  return '$' + (Number.isInteger(v) ? String(v) : v.toFixed(2));
};

const sha1 = buf => crypto.createHash('sha1').update(buf).digest('hex');
const readJSON = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const mkdirp = d => fs.mkdirSync(d, { recursive: true });
const write = (f, s) => { mkdirp(path.dirname(f)); fs.writeFileSync(f, s); };
const exists = f => { try { fs.accessSync(f); return true; } catch (e) { return false; } };

// Curly quotes and apostrophes for copy that comes from plain-text sources.
function smart(s) {
  return String(s)
    .replace(/(^|[\s(\[{“‘—–-])"/g, '$1“').replace(/"/g, '”')
    .replace(/(\w)'(\w)/g, '$1’$2').replace(/(^|[\s(\[{“—–-])'/g, '$1‘').replace(/'/g, '’');
}

// Ranges and sizes: "0-3" -> "0–3", "6 x 6 in" -> "6 × 6 in".
function typo(s) {
  return smart(String(s))
    .replace(/(\d)\s?-\s?(\d)/g, '$1–$2')
    .replace(/(\d(?:\.\d+)?)\s?x\s?(\d)/g, '$1 × $2');
}

// ---------- tiny markdown (enough for the policy drafts) ----------
// Bracketed fill-ins are handed to `bracket(text)`, which returns HTML (a labelled box) or '' to drop it.
function inline(s, bracket) {
  const links = [];
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => { links.push([t, u]); return `\u0000L${links.length - 1}\u0000`; });
  const holes = [];
  s = s.replace(/\[([^\]]*)\]/g, (_, t) => { holes.push(t); return `\u0000H${holes.length - 1}\u0000`; });
  s = esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s).,;:]|$)/g, '$1<em>$2</em>')
    .replace(/(^|[\s(])_([^_\s][^_]*?)_(?=[\s).,;:]|$)/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\u0000H(\d+)\u0000/g, (_, i) => bracket ? bracket(holes[+i]) : esc('[' + holes[+i] + ']'));
  s = s.replace(/\u0000L(\d+)\u0000/g, (_, i) => `<a href="${esc(links[+i][1])}">${esc(links[+i][0])}</a>`);
  return s.replace(/\s{2,}/g, ' ');
}

function markdown(src, opts = {}) {
  const bracket = opts.bracket;
  const lines = src.replace(/\r/g, '').split('\n');
  const out = [];
  let i = 0;
  const para = [];
  const flush = () => { if (para.length) { const t = inline(para.join(' '), bracket).trim(); if (t) out.push(`<p>${t}</p>`); para.length = 0; } };
  const shift = opts.shiftHeadings || 0;
  while (i < lines.length) {
    const l = lines[i];
    if (/^\s*$/.test(l)) { flush(); i++; continue; }
    let m;
    if ((m = /^(#{1,6})\s+(.*)$/.exec(l))) {
      flush();
      const lv = Math.min(6, m[1].length + shift);
      const text = inline(m[2], bracket);
      const id = (opts.ids !== false) ? ' id="' + m[2].toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '"' : '';
      out.push(`<h${lv}${id}>${text}</h${lv}>`); i++; continue;
    }
    if (/^---+\s*$/.test(l)) { flush(); i++; continue; }
    if (/^\s*\|/.test(l)) {
      flush();
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(lines[i]); i++; }
      const cells = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const head = cells(rows[0]);
      const body = rows.slice(1).filter(r => !/^\s*\|[\s:|-]+\|\s*$/.test(r)).map(cells);
      out.push('<div class="table-wrap"><table><thead><tr>' + head.map(h => `<th scope="col">${inline(h, bracket)}</th>`).join('') +
        '</tr></thead><tbody>' + body.map(r => '<tr>' + r.map((c, k) => k === 0 ? `<th scope="row">${inline(c, bracket)}</th>` : `<td>${inline(c, bracket)}</td>`).join('') + '</tr>').join('') +
        '</tbody></table></div>');
      continue;
    }
    if (/^\s*>/.test(l)) {
      flush();
      const q = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) { q.push(lines[i].replace(/^\s*>\s?/, '')); i++; }
      out.push(`<blockquote>${markdown(q.join('\n'), opts)}</blockquote>`);
      continue;
    }
    if (/^\s*([-*]|\d+\.)\s+/.test(l)) {
      flush();
      const ordered = /^\s*\d+\./.test(l);
      const items = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        let item = lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ''); i++;
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*]|\d+\.)\s+/.test(lines[i])) { item += ' ' + lines[i].trim(); i++; }
        items.push(item);
      }
      const tag = ordered ? 'ol' : 'ul';
      const lis = items.map(t => inline(t, bracket).trim()).filter(Boolean);
      if (lis.length) out.push(`<${tag}>` + lis.map(t => `<li>${t}</li>`).join('') + `</${tag}>`);
      continue;
    }
    // Lines ending a paragraph with a hard break (address blocks) keep their breaks.
    para.push(l.trim());
    i++;
  }
  flush();
  return out.join('\n');
}

// Front matter (--- yaml-ish ---) for content files.
function frontMatter(text) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!m) return { data: {}, body: text };
  const data = {};
  m[1].split('\n').forEach(line => {
    const k = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (!k) return;
    let v = k[2].trim().replace(/\s+#.*$/, '');
    if (/^".*"$/.test(v) || /^'.*'$/.test(v)) v = v.slice(1, -1);
    if (v === 'true') v = true; else if (v === 'false') v = false;
    data[k[1]] = v;
  });
  return { data, body: text.slice(m[0].length) };
}

// PNG width/height from the IHDR chunk.
function pngSize(file) {
  const b = Buffer.alloc(24);
  const fd = fs.openSync(file, 'r'); fs.readSync(fd, b, 0, 24, 0); fs.closeSync(fd);
  if (b.toString('ascii', 1, 4) !== 'PNG') return null;
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}

module.exports = { esc, money, sha1, readJSON, mkdirp, write, exists, smart, typo, markdown, inline, frontMatter, pngSize };
