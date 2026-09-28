#!/usr/bin/env python3
"""Play Before Pixels sticker sheet: build the print files.

python3 build/build.py        (run from products/merch-stickers/; build/render.sh runs everything)

Writes
  print/sticker-sheet.svg|png       1749 x 2481 px = 5.83 x 8.27 in (A5) at 300 dpi, kiss-cut sheet  [UNVERIFIED partner template]
  print/sticker-sheet_cutlines.svg  the kiss-cut contours only (magenta, spot name CutContour), for a partner that asks for a cut file
  print/die-cut/<name>.svg|png      each sticker alone on a transparent ground, 300 dpi, for die-cut single-sticker products
  build/raster-jobs.json            (then: node ../../brand/logo/src/raster.js build/raster-jobs.json)

Five stickers: the Maker's Seal (brand/logo/mark-sticker.svg, unaltered: the spinning top
appears only inside its seal, per the logo guidelines), a play ball, a three-block tower,
an open book, and the horizontal lockup. The blocks are an illustration, never a mark
(BRAND.md bans toy-block marks), stacked in a tower, never a 2 x 2 grid.
The sheet margin carries "Not a toy. Keep away from young children." and no URL or QR,
so one file serves the own site, Etsy and any marketplace.
"""
import json, math, os, re, sys
from shapely.geometry import Point, Polygon, box
from shapely.ops import unary_union

HERE = os.path.dirname(os.path.abspath(__file__))
PROD = os.path.dirname(HERE)
ROOT = os.path.abspath(os.path.join(PROD, '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'products/merch-core/build'))
from textpath import text_path  # noqa: E402

INK, PAPER, TOMATO, SUN, SKY, GRASS, PLUM = '#1D2940', '#FFFFFF', '#EE5A36', '#F5B820', '#3D86D8', '#2FA36B', '#8A5CC7'
SHEET_BG = '#E3EEFA'   # sky tint: the white sticker borders read against it
COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.'
VERSION = 'Version 1.0 · September 2026'
W, H = 1749, 2481       # 5.83 x 8.27 in at 300 dpi (UNVERIFIED partner template)
BORDER = 27             # white die-cut border, 0.09 in
CUT_IN = 3              # cut line sits 0.01 in inside the border's outer edge


def logo(name):
    s = open(os.path.join(ROOT, 'brand/logo', name)).read()
    vb = [float(v) for v in re.search(r'viewBox="([^"]+)"', s).group(1).split()]
    inner = re.search(r'</title>(.*)</svg>', s, re.S).group(1)
    return vb, inner


def path_of(geom):
    polys = [geom] if geom.geom_type == 'Polygon' else list(geom.geoms)
    out = []
    for p in polys:
        for ring in [p.exterior] + list(p.interiors):
            pts = list(ring.coords)
            out.append('M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts) + 'Z')
    return ''.join(out)


def rrect(x0, y0, x1, y1, r):
    return box(x0 + r, y0 + r, x1 - r, y1 - r).buffer(r, quad_segs=16)


# ---- each sticker: (name, art svg in its own coords, silhouette, extra border px, anchor on sheet)
stickers = []

# 1. The Maker's Seal (sticker version already carries its own white ring)
(vx, vy, vw, vh), inner = logo('mark-sticker.svg')
SEAL_D = 800
k = SEAL_D / vw
seal_art = f'<g transform="scale({k:.6f}) translate({-vx} {-vy})">{inner}</g>'
ring_r = 546 * k   # outer white ring radius in mark-sticker.svg
stickers.append(('seal', seal_art, Point(SEAL_D / 2, SEAL_D / 2).buffer(ring_r, quad_segs=64), 0, (160, 150)))

# 2. Ball (the ball symbol from the picture books)
R = 230
ball_art = (f'<defs><clipPath id="ballclip"><circle r="40"/></clipPath></defs>'
            f'<g transform="translate({R} {R}) rotate(-18) scale({R/40})"><circle r="40" fill="{TOMATO}"/>'
            f'<g clip-path="url(#ballclip)"><path d="M-44 -4Q0 16 44 -4" fill="none" stroke="{SUN}" stroke-width="15"/>'
            f'<path d="M-44 -22Q0 -8 44 -22" fill="none" stroke="{PAPER}" stroke-width="4"/>'
            f'<path d="M-44 14Q0 34 44 14" fill="none" stroke="{PAPER}" stroke-width="4"/></g></g>')   # a playground ball
stickers.append(('ball', ball_art, Point(R, R).buffer(R, quad_segs=64), BORDER, (1110, 200)))

# 3. Block tower: three blocks, stacked (never a grid)
S = 250
rx = S * 9 / 56
blocks = [(0.10 * S, 2 * S, GRASS, 'square'), (0.0, S, SKY, 'tri'), (0.16 * S, 0, TOMATO, 'dot')]
tower_art, geoms = '', []
for x, y, col, kind in blocks:
    tower_art += f'<rect x="{x:.1f}" y="{y:.1f}" width="{S}" height="{S}" rx="{rx:.1f}" fill="{col}"/>'
    cx, cy = x + S / 2, y + S / 2
    if kind == 'dot':
        tower_art += f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{S*13/56:.1f}" fill="{PAPER}"/>'
    elif kind == 'tri':
        t = S * 14 / 56
        tower_art += (f'<path d="M{cx:.1f} {cy-t:.1f}L{cx+t:.1f} {cy+t*0.8:.1f}H{cx-t:.1f}Z" fill="{PAPER}" '
                      f'stroke="{PAPER}" stroke-width="{S*4/56:.1f}" stroke-linejoin="round"/>')
    else:
        q = S * 11 / 56
        tower_art += f'<rect x="{cx-q:.1f}" y="{cy-q:.1f}" width="{2*q:.1f}" height="{2*q:.1f}" rx="{S*3/56:.1f}" fill="{PAPER}"/>'
    geoms.append(rrect(x, y, x + S, y + S, rx))
stickers.append(('blocks', tower_art, unary_union(geoms), BORDER, (1170, 870)))

# 4. Open book with a ribbon
BW, BH = 760, 500
book_art = (f'<rect x="0" y="0" width="{BW}" height="{BH}" rx="30" fill="{PLUM}"/>'
            f'<path d="M600 470H640V585L620 565L600 585Z" fill="{TOMATO}"/>'
            f'<path d="M40 50Q205 18 372 56V468Q205 444 40 468Z" fill="{PAPER}"/>'
            f'<path d="M388 56Q555 18 720 50V468Q555 444 388 468Z" fill="{PAPER}"/>')
for i, (x0, w) in enumerate([(84, 220), (84, 250), (84, 180), (84, 240), (84, 150)]):
    book_art += f'<rect x="{x0}" y="{140 + i*62}" width="{w}" height="22" rx="11" fill="#D5DCE8"/>'
book_art += f'<circle cx="530" cy="215" r="80" fill="{SUN}"/>'
for i, w in enumerate([240, 200]):
    book_art += f'<rect x="432" y="{350 + i*62}" width="{w}" height="22" rx="11" fill="#D5DCE8"/>'
book_geom = unary_union([rrect(0, 0, BW, BH, 30), box(600, 440, 640, 585)])
stickers.append(('book', book_art, book_geom, BORDER, (160, 1080)))

# 5. Horizontal lockup on a white rounded label
(lx, ly, lw, lh), linner = logo('lockup-horizontal.svg')
LW = 1250
lk = LW / lw
LH = lh * lk
PADX, PADY = 70, 62
lock_art = (f'<rect x="0" y="0" width="{LW + 2*PADX:.1f}" height="{LH + 2*PADY:.1f}" rx="{(LH + 2*PADY)/2:.1f}" fill="{PAPER}"/>'
            f'<g transform="translate({PADX} {PADY}) scale({lk:.6f}) translate({-lx} {-ly})">{linner}</g>')
lock_geom = rrect(0, 0, LW + 2 * PADX, LH + 2 * PADY, (LH + 2 * PADY) / 2)
stickers.append(('lockup', lock_art, lock_geom, 0, ((W - LW - 2 * PADX) / 2, 1790)))


def svg_doc(w, h, body, title, desc, bg=None):
    ground = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:.0f}" height="{h:.0f}" viewBox="0 0 {w:.1f} {h:.1f}">'
            f'<title>{title}</title><desc>{desc} {COPY} {VERSION}.</desc>{ground}{body}</svg>\n')


def write(rel, text):
    p = os.path.join(PROD, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(text)
    return p


jobs, sheet, cuts, meta = [], '', '', []
for name, art, geom, border, (ax, ay) in stickers:
    outer = geom.buffer(border, quad_segs=24) if border else geom
    cut = outer.buffer(-CUT_IN, quad_segs=24)
    white = f'<path d="{path_of(outer)}" fill="{PAPER}"/>' if border else ''
    body = white + art
    sheet += f'<g transform="translate({ax:.1f} {ay:.1f})">{body}</g>'
    cuts += f'<path transform="translate({ax:.1f} {ay:.1f})" d="{path_of(cut)}" fill="none" stroke="#FF00FF" stroke-width="2"/>'
    x0, y0, x1, y1 = outer.bounds
    sw, sh = x1 - x0, y1 - y0
    rel = write(f'print/die-cut/{name}.svg', svg_doc(
        sw, sh, f'<g transform="translate({-x0:.1f} {-y0:.1f})">{body}</g>', f'Play Before Pixels sticker: {name}',
        f'Die-cut single sticker, {sw/300:.2f} x {sh/300:.2f} in at 300 dpi, transparent ground; the partner cuts on the outer edge.'))
    jobs.append({'svg': rel, 'png': rel[:-4] + '.png', 'w': round(sw), 'h': round(sh)})
    bx0, by0, bx1, by1 = ax + x0, ay + y0, ax + x1, ay + y1
    meta.append({'name': name, 'w_in': round(sw / 300, 2), 'h_in': round(sh / 300, 2),
                 'box': [round(bx0), round(by0), round(bx1), round(by1)]})
    assert bx0 >= 60 and by0 >= 60 and bx1 <= W - 60, f'{name} breaks the 0.2 in sheet margin'

# overlap check: no two stickers closer than 0.1 in (30 px)
placed = [(n, (g.buffer(b) if b else g)) for n, _, g, b, _ in stickers]
from shapely import affinity
shapes = [affinity.translate(g, *st[4]) for (n, g), st in zip(placed, stickers)]
for i in range(len(shapes)):
    for j in range(i + 1, len(shapes)):
        d = shapes[i].distance(shapes[j])
        assert d >= 30, f'{placed[i][0]} and {placed[j][0]} are only {d:.0f} px apart'

# sheet margin note (not a sticker; it stays on the backing)
note = ''
for txt, font, size, y, col in [('Not a toy. Keep away from young children.', 'nunito800', 46, 2250, INK),
                                ('For grown-ups: laptops, bottles, planners.', 'nunito700', 36, 2312, '#4A5468'),
                                ('Play Before Pixels™ · © 2026 AlphaPlay LLC', 'nunito700', 32, 2366, '#4A5468')]:
    d, _ = text_path(txt, font, size, W / 2, y, anchor='middle')
    note += f'<path d="{d}" fill="{col}"/>'

p = write('print/sticker-sheet.svg', svg_doc(W, H, sheet + note, 'Play Before Pixels sticker sheet, kiss-cut, 5 stickers',
          f'Kiss-cut vinyl sticker sheet, {W} x {H} px = 5.83 x 8.27 in at 300 dpi [UNVERIFIED partner template]. '
          'Keep 0.2 in clear of the sheet edge.', bg=SHEET_BG))
jobs.append({'svg': p, 'png': p[:-4] + '.png', 'w': W, 'h': H, 'bg': SHEET_BG})
write('print/sticker-sheet_cutlines.svg', svg_doc(W, H, f'<g id="CutContour">{cuts}</g>',
      'Play Before Pixels sticker sheet, kiss-cut lines', 'Cut contours only (spot colour CutContour, magenta). Same size and position as sticker-sheet.svg.'))
json.dump(jobs, open(os.path.join(HERE, 'raster-jobs.json'), 'w'), indent=1)
json.dump(meta, open(os.path.join(HERE, 'sticker-meta.json'), 'w'), indent=1)
print(len(jobs), 'print files written:', ', '.join(f"{m['name']} {m['w_in']}x{m['h_in']} in" for m in meta))
