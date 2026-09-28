#!/usr/bin/env python3
"""compare_pdfs.py - before/after check for the static brand fonts.

Compares a PDF rendered with the variable fonts (brand/fonts/render_variable.js) with the same page
rendered with the static fonts (brand/render.js), and reports:
  - font types in each file (the static file must have no Type 3 font),
  - per page: pixel difference at --dpi, ink-extent shift and width change, and whether the text
    lines (line breaks) are the same,
  - verdict per page: SAME (differences are anti-aliasing only) or CHANGED.
Pages whose text contains "[exact]" must be SAME and pages with "[opsz]" are expected to change
(test page ops/TESTS/fonts-static-test.html); other pages are reported only.

SAME means: at most 0.5% of ink pixels are more than 64/255 outside the range of the other render's
3x3 neighbourhood (checked both ways, so missing or extra ink still counts), AND every edge of the
ink box is within 1 device pixel, AND the text lines are identical. The neighbourhood test absorbs
anti-aliasing and sub-pixel glyph drift (static fonts store whole-unit advance widths; Chromium
applies a variable font's HVAR deltas unrounded, so a glyph can sit ~0.1 pt away). Anything that
moves more than a pixel, or ink that appears or disappears, still counts. The raw per-pixel figure
is reported too.

Usage: python3 brand/fonts/compare_pdfs.py variable.pdf static.pdf [--dpi 150] [--ignore-top 34]
                                          [--diff-dir DIR] [--json out.json]
  --ignore-top N  ignore the top N CSS px of every page (the test page's label line)
  --diff-dir DIR  write a PNG per CHANGED page: red = only in the variable render,
                  blue = only in the static render, dark = both
Exit 0 = no Type 3 in the static file and every [exact] page SAME; 1 otherwise.
"""
import argparse
import collections
import json
import os
import sys

import numpy as np
import pymupdf


def fonts(doc):
    types, names = collections.Counter(), collections.Counter()
    for p in doc:
        for f in p.get_fonts(full=True):
            types[f[2]] += 1
            names[(f[2], f[3].split('+')[-1] or '(unnamed Type 3)')] += 1
    return types, names


def raster(page, dpi):
    pix = page.get_pixmap(dpi=dpi, colorspace=pymupdf.csGRAY, alpha=False)
    return np.frombuffer(pix.samples, np.uint8).reshape(pix.h, pix.w).astype(np.int16)


def tolerant_diff(A, B):
    """How far each pixel lies outside the other render's 3x3 min/max envelope (both directions)."""
    def env(X):
        stack = [np.roll(np.roll(X, dy, 0), dx, 1) for dy in (-1, 0, 1) for dx in (-1, 0, 1)]
        return np.min(stack, axis=0), np.max(stack, axis=0)
    (amin, amax), (bmin, bmax) = env(A), env(B)
    out_b = np.maximum(0, np.maximum(B - amax, amin - B))
    out_a = np.maximum(0, np.maximum(A - bmax, bmin - A))
    return np.maximum(out_a, out_b)


def ink_box(a, thr=160):
    ys, xs = np.where(a < thr)
    if not len(xs):
        return None
    return int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())


def lines(page):
    """Text rows keyed by baseline (0.5 pt), words joined left to right, whitespace ignored.
    Extraction guesses spaces and line groups from glyph gaps, which letter-spacing and narrower
    glyphs change; grouping by baseline means only a real reflow (a word moving to another row,
    or a row appearing or disappearing) counts as a difference."""
    rows = collections.defaultdict(list)
    for b in page.get_text('dict')['blocks']:
        for l in b.get('lines', []):
            dx, dy = l['dir']
            for sp in l['spans']:
                t = ''.join(sp['text'].split())
                if t:
                    x, y = sp['origin']
                    # Row key: direction plus the baseline's offset perpendicular to it, so rotated
                    # text split into several spans (Type 3 fonts split at 255 glyphs) stays one row.
                    key = (round(dx, 2), round(dy, 2), round((dx * y - dy * x) * 2) / 2)
                    rows[key].append((dx * x + dy * y, t))
    return [''.join(t for _, t in sorted(v)) for _, v in sorted(rows.items(), key=lambda kv: (kv[0][2], kv[0][:2]))]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('variable'); ap.add_argument('static')
    ap.add_argument('--dpi', type=int, default=150)
    ap.add_argument('--ignore-top', type=float, default=0)
    ap.add_argument('--diff-dir'); ap.add_argument('--json')
    a = ap.parse_args()
    dv, ds = pymupdf.open(a.variable), pymupdf.open(a.static)
    ok = True
    report = {'variable': a.variable, 'static': a.static, 'dpi': a.dpi, 'pages': []}
    for tag, d in (('variable', dv), ('static', ds)):
        t, n = fonts(d)
        report[tag + '_font_types'] = dict(t)
        report[tag + '_fonts'] = sorted(f'{k[0]} {k[1]}' for k in n)
        print(f'{tag:8s} {d.page_count} pages, font objects by type: {dict(t)}')
    names = sorted({k.split(' ', 1)[1] for k in report['static_fonts']})
    print('static fonts:', ', '.join(names))
    if report['static_font_types'].get('Type3'):
        print('FAIL: the static file still has Type 3 fonts'); ok = False
    if dv.page_count != ds.page_count:
        print(f'FAIL: page count differs ({dv.page_count} vs {ds.page_count})'); ok = False
    if a.diff_dir:
        os.makedirs(a.diff_dir, exist_ok=True)
    cut = int(round(a.ignore_top * a.dpi / 96))
    counts = collections.Counter()
    for i in range(min(dv.page_count, ds.page_count)):
        pv, ps = dv[i], ds[i]
        A, B = raster(pv, a.dpi), raster(ps, a.dpi)
        if A.shape != B.shape:
            h, w = min(A.shape[0], B.shape[0]), min(A.shape[1], B.shape[1]); A, B = A[:h, :w], B[:h, :w]
        A2, B2 = A[cut:], B[cut:]
        raw = np.abs(A2 - B2)
        diff = tolerant_diff(A2, B2)
        ink = (A2 < 250) | (B2 < 250)
        n_ink = int(ink.sum()) or 1
        frac = float((diff > 64).sum()) / n_ink
        raw_frac = float((raw > 64).sum()) / n_ink
        mean = float(raw[ink].mean()) if ink.any() else 0.0
        bv, bs = ink_box(A2), ink_box(B2)
        edge = max(abs(x - y) for x, y in zip(bv, bs)) if bv and bs else 0
        wv = (bv[2] - bv[0]) if bv else 0
        ws = (bs[2] - bs[0]) if bs else 0
        dw = (ws / wv - 1) * 100 if wv else 0.0
        lv, ls = lines(pv), lines(ps)
        same_lines = lv == ls
        same = frac <= 0.005 and edge <= 1 and same_lines
        text = ps.get_text()
        label = next((l for l in text.splitlines() if l.startswith('[')), '')
        expect = 'exact' if '[exact]' in label else 'opsz' if '[opsz]' in label else ''
        verdict = 'SAME' if same else 'CHANGED'
        if expect == 'exact' and not same:
            ok = False; verdict = 'FAIL (should be SAME)'
        counts[(expect or 'page', 'SAME' if same else 'CHANGED')] += 1
        row = {'page': i + 1, 'label': label, 'expect': expect, 'ink_px': n_ink, 'diff_frac': round(frac, 5), 'raw_diff_frac': round(raw_frac, 5),
               'mean_diff': round(mean, 2), 'edge_px': edge, 'width_change_pct': round(dw, 2),
               'same_lines': same_lines, 'verdict': verdict}
        if not same_lines:
            row['lines_variable'] = [l for l in lv if l not in ls][:6]
            row['lines_static'] = [l for l in ls if l not in lv][:6]
        report['pages'].append(row)
        print(f"p{i + 1:03d} {verdict:8s} diff>64: {100 * frac:6.2f}% of ink (raw {100 * raw_frac:5.2f}%)  mean {mean:5.2f}  edge {edge:3d}px  "
              f"width {dw:+6.2f}%  lines {'same' if same_lines else 'DIFFER'}  {label[:90]}")
        if not same_lines:
            print('      variable only:', row['lines_variable'][:3], '\n      static only:  ', row['lines_static'][:3])
        if a.diff_dir and not same:
            rgb = np.full(A.shape + (3,), 255, np.uint8)
            av, bs_ = A < 128, B < 128
            rgb[av & ~bs_] = (220, 40, 40); rgb[bs_ & ~av] = (40, 90, 220); rgb[av & bs_] = (40, 40, 40)
            pymupdf.Pixmap(pymupdf.csRGB, rgb.shape[1], rgb.shape[0], rgb.tobytes(), False).save(
                os.path.join(a.diff_dir, f'p{i + 1:03d}.png'))
    print('summary:', ', '.join(f'{k[0]} {k[1]}: {v}' for k, v in sorted(counts.items())))
    report['summary'] = {f'{k[0]}|{k[1]}': v for k, v in counts.items()}
    report['pass'] = ok
    if a.json:
        json.dump(report, open(a.json, 'w'), indent=1)
    print('PASS' if ok else 'FAIL')
    sys.exit(0 if ok else 1)


if __name__ == '__main__':
    main()
