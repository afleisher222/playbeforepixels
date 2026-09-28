#!/usr/bin/env python3
"""Play Before Pixels mug: build the print files.

python3 build/build.py        (run from products/merch-mug/; build/render.sh runs everything)

Writes
  print/mug-11oz_wrap.svg|png   2700 x 1050 px = 9 x 3.5 in at 300 dpi   [UNVERIFIED partner template]
  print/mug-15oz_wrap.svg|png   2700 x 1200 px = 9 x 4 in at 300 dpi     [UNVERIFIED partner template]
  build/raster-jobs.json        (then: node ../../brand/logo/src/raster.js build/raster-jobs.json)

Design: a two-sided wrap on a white ceramic mug, printed by sublimation.
  Side A  The Maker's Seal (brand/logo/mark.svg, placed unaltered).
  Side B  "Talk, touch and play come first" with the tomato ball as its period
          (brand/ORIGINALITY.md C1: KEEP-BUT-DON'T-TRADEMARK; never a three-verb icon
          lockup, never on children's items), with the small wordmark under it.
The wrap background is white (the mug's own glaze shows through: sublimation has no white ink).
All text is outlined from the brand fonts, so the files print the same everywhere.
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
PROD = os.path.dirname(HERE)
ROOT = os.path.abspath(os.path.join(PROD, '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'products/merch-core/build'))
from textpath import text_path  # noqa: E402  (shared brand-type outliner from merch-core)

INK, PAPER, TOMATO = '#1D2940', '#FFFFFF', '#EE5A36'
COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.'
VERSION = 'Version 1.0 · September 2026'

# ---------------------------------------------------------------------------
# Founder edits (human authorship): line breaks and which side faces out are layout
# choices you may change here; the slogan's words must stay exactly as cleared.
SLOGAN = {'phrase': 'talk, touch and play come first', 'item': 'mug',
          'lines': ['Talk, touch', 'and play', 'come first']}
BANNED = ['pencils before pixels', "childhood can't wait", 'screens can.', 'paper first', 'screen-free week',
          'screen free week', 'autism', 'therapy', 'play beyond the screen', 'screen-free and proud',
          'ask me what i built', 'the pixels will keep']   # C2 rename is "copy only", never merch

# Partner-typical sizes (UNVERIFIED: check the chosen partner's mug template on setup day).
# wrap_w/h = print file in px at 300 dpi; circ_in = the mug's outside circumference.
MUGS = {
    '11oz': {'w': 2700, 'h': 1050, 'circ_in': 10.2, 'seal_in': 2.45, 'label': '11 oz'},
    '15oz': {'w': 2700, 'h': 1200, 'circ_in': 10.8, 'seal_in': 2.75, 'label': '15 oz'},
}
# Side centres. The wrap's left and right edges meet at the handle, so each face sits
# 90 degrees round from the handle. SWAP_SIDES flips which face shows the seal.
SWAP_SIDES = False
# ---------------------------------------------------------------------------


def cleared(phrase):
    """True only when brand/ORIGINALITY.md section 1C keeps `phrase` and does not limit it to other items."""
    low = phrase.lower()
    if any(b in low for b in BANNED):
        sys.exit(f'STOP: "{phrase}" uses a banned, retired or copy-only phrase.')
    for ln in open(os.path.join(ROOT, 'brand/ORIGINALITY.md')).read().splitlines():
        l = ln.lower()
        if not re.match(r'\|\s*c\d+\s*\|', l):
            continue
        cells = [c.strip() for c in l.strip('|').split('|')]
        if len(cells) < 5 or low.rstrip('.') not in cells[1].replace('*', '').rstrip('.'):
            continue
        decision = cells[4]
        limited = re.search(r'\((tee|tote)[^)]*\)', decision)   # e.g. "(tee and copy)" limits a line to that item
        return decision.startswith('**keep') and (not limited or SLOGAN['item'] in limited.group(0))
    return False


def logo(name):
    s = open(os.path.join(ROOT, 'brand/logo', name)).read()
    vb = [float(v) for v in re.search(r'viewBox="([^"]+)"', s).group(1).split()]
    inner = re.search(r'</title>(.*)</svg>', s, re.S).group(1)
    return vb, inner


def place(name, cx, top, width):
    """Place a supplied logo file, unaltered, `width` px wide, centred on cx. Returns (svg, height)."""
    (vx, vy, vw, vh), inner = logo(name)
    k = width / vw
    x = cx - width / 2
    return f'<g transform="translate({x:.2f} {top:.2f}) scale({k:.6f}) translate({-vx} {-vy})">{inner}</g>', vh * k


def slogan_art(lines, cx, top, max_w, max_size):
    widest = max(text_path(l, 'bric800', 100, 0, 0)[1] for l in lines)
    size = min(max_size, 100 * max_w / (widest + 30))
    parts, y = [], top + size * 0.78
    for i, l in enumerate(lines):
        d, w = text_path(l, 'bric800', size, cx, y, anchor='middle')
        parts.append(f'<path d="{d}" fill="{INK}"/>')
        if i == len(lines) - 1:   # the tomato ball is the period (ORIGINALITY C1)
            r = size * 0.085
            parts.append(f'<circle cx="{cx + w / 2 + r * 1.55:.1f}" cy="{y - r:.1f}" r="{r:.1f}" fill="{TOMATO}"/>')
        y += size * 1.0
    return ''.join(parts), y - size * 1.0 + size * 0.22


def svg_doc(w, h, body, title, desc):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
            f'<title>{title}</title><desc>{desc} {COPY} {VERSION}.</desc>'
            f'<rect width="{w}" height="{h}" fill="{PAPER}"/>{body}</svg>\n')


if not cleared(SLOGAN['phrase']):
    sys.exit(f'STOP: "{SLOGAN["phrase"]}" is not kept for a {SLOGAN["item"]} in brand/ORIGINALITY.md.')

jobs, meta = [], {}
for key, m in MUGS.items():
    W, H = m['w'], m['h']
    print_in = W / 300
    gap_deg = 360 * (1 - print_in / m['circ_in'])          # unprinted band at the handle
    deg_per_px = (360 - gap_deg) / W
    off = (90 - gap_deg / 2) / deg_per_px                     # px from each edge to a face centre
    left_c, right_c = off, W - off
    seal_c, slogan_c = (left_c, right_c) if not SWAP_SIDES else (right_c, left_c)
    safe = 0.2 * 300 if key == '11oz' else 0.25 * 300        # keep art 0.2-0.25 in off the rims
    # Side A: the seal
    seal_w = m['seal_in'] * 300
    (vx, vy, vw, vh), _ = logo('mark.svg')
    seal_h = vh * seal_w / vw
    g_seal, _ = place('mark.svg', seal_c, (H - seal_h) / 2, seal_w)
    # Side B: slogan + wordmark, vertically centred in the safe area
    max_w = 3.05 * 300
    art, bottom = slogan_art(SLOGAN['lines'], 0, 0, max_w, 250 if key == '11oz' else 285)
    wm_w = 1.75 * 300 if key == '11oz' else 1.95 * 300
    (wx, wy, ww, wh), _ = logo('wordmark.svg')
    wm_h = wh * wm_w / ww
    gap = 0.2 * 300
    block_h = bottom + gap + wm_h
    top = max(safe, (H - block_h) / 2)
    art, bottom = slogan_art(SLOGAN['lines'], slogan_c, top, max_w, 250 if key == '11oz' else 285)
    g_wm, _ = place('wordmark.svg', slogan_c, bottom + gap, wm_w)
    rel = f'print/mug-{key}_wrap.svg'
    p = os.path.join(PROD, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(svg_doc(
        W, H, g_seal + art + g_wm, f'Play Before Pixels {m["label"]} mug, full wrap print file',
        f'White ceramic {m["label"]} mug, sublimation. {W} x {H} px = {W/300:g} x {H/300:g} in at 300 dpi '
        f'[UNVERIFIED partner template]. Seal centred at x={seal_c:.0f}, slogan at x={slogan_c:.0f} '
        f'(each 90 degrees from the handle). Keep {safe/300:g} in clear of the rims.'))
    jobs.append({'svg': p, 'png': p[:-4] + '.png', 'w': W, 'h': H, 'bg': '#FFFFFF'})
    meta[key] = {'w': W, 'h': H, 'seal_c': round(seal_c), 'slogan_c': round(slogan_c),
                 'deg_per_px': deg_per_px, 'gap_deg': gap_deg, 'label': m['label']}

json.dump(jobs, open(os.path.join(HERE, 'raster-jobs.json'), 'w'), indent=1)
json.dump(meta, open(os.path.join(HERE, 'wrap-meta.json'), 'w'), indent=1)
print(len(jobs), 'print files written; slogan cleared in brand/ORIGINALITY.md (C1).')
