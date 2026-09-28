// Image registry. Templates ask for pictures while they render; each request returns a token.
// After every page is rendered, finalize() works out the WebP files that are needed, runs
// site/tools/images.py (Pillow + PyMuPDF) for any that are missing, reads their real sizes from
// site/assets/img/manifest.json and swaps the tokens for <img> markup with width and height.
// Output names carry a hash of the source file, so a re-rendered product image gets a new name.
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { sha1, esc, readJSON, exists } = require('./util');

class Images {
  constructor({ root, outDir, base }) {
    this.root = root; this.outDir = outDir; this.base = base;
    this.reqs = []; this.jobs = new Map(); this.hashCache = new Map();
  }
  _src(src) {
    // src: 'products/x/cover.png' | { pdf: 'products/x/file.pdf', page: 3 }
    const rel = typeof src === 'string' ? src : src.pdf;
    const abs = path.isAbsolute(rel) ? rel : path.join(this.root, rel);
    if (!exists(abs)) throw new Error('image source not found: ' + path.relative(this.root, abs));
    let h = this.hashCache.get(abs);
    if (!h) { h = sha1(fs.readFileSync(abs)).slice(0, 10); this.hashCache.set(abs, h); }
    const page = typeof src === 'string' ? 0 : (src.page || 1);
    const key = h + (page ? '-p' + page : '');
    const stem = path.relative(path.join(this.root, 'products'), abs).replace(/\.[a-z]+$/i, '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').replace(/-(preview|build|funnel|starter)-/g, '-').slice(0, 48);
    return { abs, page, key, stem: stem + (page ? '-p' + page : '') };
  }
  _job(s, w, kind = 'webp') {
    const ext = kind === 'og' ? 'jpg' : 'webp';
    const out = `${s.stem}-${s.key}-${kind === 'og' ? 'og' : w}.${ext}`;
    if (!this.jobs.has(out)) this.jobs.set(out, { out, src: path.relative(this.root, s.abs), page: s.page, w, kind, key: s.key });
    return out;
  }
  // <img> with srcset. opts: { src, widths, sizes, alt, cls, eager, priority, attrs }
  pic(opts) {
    const s = this._src(opts.src);
    const widths = opts.widths || [640, 1280];
    const outs = widths.map(w => this._job(s, w));
    this.reqs.push({ type: 'img', outs, opts });
    return `\u0001IMG${this.reqs.length - 1}\u0001`;
  }
  url(src, w, abs = false) {
    const s = this._src(src);
    const out = this._job(s, w);
    this.reqs.push({ type: 'url', outs: [out], abs });
    return `\u0001IMG${this.reqs.length - 1}\u0001`;
  }
  og(src) {
    const s = this._src(src);
    const out = this._job(s, 1200, 'og');
    this.reqs.push({ type: 'url', outs: [out], abs: true });
    return `\u0001IMG${this.reqs.length - 1}\u0001`;
  }
  finalize({ siteUrl, log }) {
    fs.mkdirSync(this.outDir, { recursive: true });
    const jobs = [...this.jobs.values()].sort((a, b) => a.out.localeCompare(b.out));
    fs.writeFileSync(path.join(this.outDir, 'jobs.json'), JSON.stringify(jobs, null, 1) + '\n');
    const mf = path.join(this.outDir, 'manifest.json');
    let manifest = exists(mf) ? readJSON(mf) : { files: {} };
    const missing = jobs.filter(j => !manifest.files[j.out] || !exists(path.join(this.outDir, j.out)));
    if (missing.length || this.pruneNeeded(manifest, jobs)) {
      log(`images: ${missing.length} to make` + (missing.length ? ' (running site/tools/images.py)' : ', pruning old files'));
      try {
        execFileSync('python3', [path.join(this.root, 'site/tools/images.py')], { stdio: 'inherit' });
      } catch (e) {
        if (missing.length) throw new Error('site/tools/images.py failed or Python/Pillow is missing. Run it where Pillow and PyMuPDF are installed, then commit site/assets/img/.');
      }
      manifest = readJSON(mf);
    }
    const dims = n => manifest.files[n] || [0, 0];
    return html => html.replace(/\u0001IMG(\d+)\u0001/g, (_, i) => {
      const r = this.reqs[+i];
      if (r.type === 'url') return (r.abs ? siteUrl : '') + this.base + r.outs[0];
      const o = r.opts;
      const set = [...new Set(r.outs)].map(n => ({ n, w: dims(n)[0], h: dims(n)[1] })).sort((a, b) => a.w - b.w);
      const big = set[set.length - 1];
      const fallback = set[Math.min(set.length - 1, o.fallbackIndex == null ? set.length - 1 : o.fallbackIndex)];
      const a = [
        `src="${this.base}${fallback.n}"`,
        set.length > 1 ? `srcset="${set.map(x => `${this.base}${x.n} ${x.w}w`).join(', ')}"` : '',
        set.length > 1 ? `sizes="${esc(o.sizes || '100vw')}"` : '',
        `width="${big.w}" height="${big.h}"`,
        `alt="${esc(o.alt || '')}"`,
        o.eager ? '' : 'loading="lazy"',
        'decoding="async"',
        o.priority ? 'fetchpriority="high"' : '',
        o.cls ? `class="${o.cls}"` : '',
        o.attrs || ''
      ].filter(Boolean).join(' ');
      return `<img ${a}>`;
    });
  }
  pruneNeeded(manifest, jobs) {
    const want = new Set(jobs.map(j => j.out));
    return Object.keys(manifest.files).some(n => !want.has(n));
  }
}

module.exports = { Images };
