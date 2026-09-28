"""Play Before Pixels - logo concept v2, direction A ("a-wordmark").

The name is the logo. Every SVG in this folder is generated here from geometry plus the outlines of
Bricolage Grotesque (the brand's own SIL-OFL font, instanced from brand/fonts/ at the weight and optical
size below). No <text>, no system fonts, no raster images inside any SVG.

    python3 build.py            # writes every SVG + the HTML pages used for the test renders
    node render.js              # renders every PNG listed in src/jobs.json (Playwright Chromium)

FOUNDER EDITS - make your own changes here, then rebuild and keep each version in git.
Your edits are what make the final mark provably yours (see brand/BRAND.md, "Human authorship").
Write one line per change in EDIT_LOG, e.g.  "2026-10-02  BALL_R 96 -> 100: rounder, friendlier ball".
"""
EDIT_LOG = [
    "2026-09-28  first build of direction A (design draft, before the founder's own edits)",
]

# ============================================================================ TUNABLE NUMBERS
# Units: 1000 = the font's em. The x-height (height of a, e, o...) is 528 units.

# --- lettering -------------------------------------------------------------------------------
FONT_WGHT   = 760     # Bricolage weight axis, 200-800. Lower = lighter letters.
FONT_OPSZ   = 36      # Bricolage optical-size axis, 12-96. Lower = wider, more open letters.
TRACK       = 14      # extra space between every pair of letters
WORD_SPACE  = 196     # width of the space between words (the font's own is ~214)
KERN = {              # hand spacing for single pairs, added on top of TRACK (+ = apart, - = together)
    ('p', 'l'): -6, ('l', 'a'): -4, ('a', 'y'): -10,
    ('b', 'e'): 0, ('e', 'f'): -12, ('f', 'o'): -14, ('o', 'r'): -2, ('r', 'e'): -10,
    ('p', 'i'): 4, ('i', 'x'): 6, ('x', 'e'): -8, ('e', 'l'): 0, ('l', 's'): 0,
}

# --- the ball in the air (the dot of the i in "pixels") --------------------------------------
BALL_R      = 94      # ball radius. The font's own dot is ~84 wide/2; ours is a little bigger: a ball, not a dot
BALL_GAP    = 86      # air between the top of the i and the bottom of the ball (the pause). Font's own: ~48
BALL_DX     = 0       # nudge the ball left (-) or right (+) from the centre of the i

# --- stacked version --------------------------------------------------------------------------
STACK_LEADING = 980   # baseline-to-baseline distance between the three lines
STACK_INDENT  = (0, 0, 0)   # left indent of each line (play / before / pixels)

# --- the symbol: the ball held in the air above its line (favicon, avatar, stickers) ----------
SYM_BALL_R    = 250   # ball radius
SYM_GAP       = 150   # air between ball and line (same idea as BALL_GAP: the pause)
SYM_LINE_W    = 640   # line length
SYM_LINE_H    = 58    # line thickness
SYM_LINE_RX   = 29    # line end rounding (0 = square ends, SYM_LINE_H/2 = fully round)
SYM_PAD       = 0.12  # empty margin around the symbol in its square, as a share of the side

# --- favicon: a separate small cut drawn on the 16 px pixel grid (numbers are in pixels) ------
FAV_BALL_CX, FAV_BALL_CY, FAV_BALL_R = 8, 6.25, 5.75
FAV_LINE = (3, 13.5, 10, 2.25)   # x, y, width, height of the line, in 16-px units

# --- colours (brand palette only) -------------------------------------------------------------
INK, PAPER, WASH = '#1D2940', '#FFFFFF', '#F3F6FB'
TOMATO, SUN, SKY = '#EE5A36', '#F5B820', '#3D86D8'
SUN_T, TOMATO_T, SKY_T = '#FEF4D8', '#FDE9E3', '#E3EEFA'
BLACK = '#000000'

CLEAR = 1.0           # clear space around the logo files, in ball diameters
# ============================================================================ END OF TUNABLE NUMBERS

import io, os, json, re
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')
FONT_WOFF2 = os.path.normpath(os.path.join(HERE, '..', '..', 'fonts', 'bricolage-a24454f0.woff2'))  # latin subset
XH = 528

def f(v):
    s = ('%.2f' % v).rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s

# ---------------------------------------------------------------------------- font
def load_font():
    os.makedirs(SRC, exist_ok=True)
    cache = os.path.join(SRC, f'bricolage-w{FONT_WGHT}-o{FONT_OPSZ}.ttf')
    if not os.path.exists(cache):
        tt = TTFont(FONT_WOFF2); tt.flavor = None
        instantiateVariableFont(tt, {'wght': FONT_WGHT, 'opsz': FONT_OPSZ}).save(cache)
    tt = TTFont(cache)
    return tt, tt.getGlyphSet(), tt.getGlyphOrder(), hb.Font(hb.Face(hb.Blob.from_file_path(cache)))

TT, GS, ORDER, HBF = load_font()
CMAP = TT.getBestCmap()

def bounds(name):
    bp = BoundsPen(GS); GS[name].draw(bp); return bp.bounds

def shape(text):
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(HBF, buf, {'kern': True, 'liga': False})
    return [(ORDER[g.codepoint], p.x_advance, p.x_offset) for g, p in zip(buf.glyph_infos, buf.glyph_positions)]

def word_line(text, ox=0.0, base=0.0):
    """One line of lowercase lettering. Returns (ink path d, balls [(cx,cy,r)], advance width, ink bbox)."""
    glyphs = shape(text)
    pen = SVGPathPen(GS, ntos=f); balls = []; x = ox
    xs, ys = [], []
    for n, (name, adv, xoff) in enumerate(glyphs):
        if name == 'space':
            x += WORD_SPACE; continue
        gx = x + xoff
        g = 'dotlessi' if name == 'i' else name
        GS[g].draw(TransformPen(pen, (1, 0, 0, -1, gx, base)))
        b = bounds(g); xs += [gx + b[0], gx + b[2]]; ys += [base - b[3], base - b[1]]
        if name == 'i':
            cx = gx + (b[0] + b[2]) / 2 + BALL_DX
            cy = base - (XH + BALL_GAP + BALL_R)
            balls.append((cx, cy, BALL_R)); ys.append(cy - BALL_R)
        nxt = glyphs[n + 1][0] if n + 1 < len(glyphs) else None
        x += adv + (TRACK + KERN.get((name, nxt), 0) if nxt not in (None, 'space') else 0)
    return pen.getCommands(), balls, x - ox, (min(xs), min(ys), max(xs), max(ys))

# ---------------------------------------------------------------------------- compositions
def comp_oneline():
    d, balls, w, bb = word_line('play before pixels')
    return d, balls, bb

def comp_stacked():
    ds, balls, xs, ys = [], [], [], []
    for k, word in enumerate(('play', 'before', 'pixels')):
        d, b, w, bb = word_line(word, ox=STACK_INDENT[k], base=k * STACK_LEADING)
        ds.append(d); balls += b; xs += [bb[0], bb[2]]; ys += [bb[1], bb[3]]
    return ''.join(ds), balls, (min(xs), min(ys), max(xs), max(ys))

def symbol_parts(cx, cy, s=1.0):
    """ball + line, centred on (cx, cy), scale s. Returns (ball, line rect)."""
    R, G, W, H = SYM_BALL_R * s, SYM_GAP * s, SYM_LINE_W * s, SYM_LINE_H * s
    total = 2 * R + G + H
    top = cy - total / 2
    ball = (cx, top + R, R)
    line = (cx - W / 2, top + 2 * R + G, W, H, SYM_LINE_RX * s)
    return ball, line

# ---------------------------------------------------------------------------- svg writers
def circles(balls, fill):
    return ''.join(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{fill}"/>' for x, y, r in balls)

def svg_open(x0, y0, w, h, title, px_long=1000):
    k = px_long / max(w, h)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x0)} {f(y0)} {f(w)} {f(h)}" '
            f'width="{round(w * k)}" height="{round(h * k)}" role="img" aria-label="{title}"><title>{title}</title>')

def lettering_svg(d, balls, bb, ink, ball, bg=None, title='Play Before Pixels'):
    p = CLEAR * 2 * BALL_R
    x0, y0, w, h = bb[0] - p, bb[1] - p, bb[2] - bb[0] + 2 * p, bb[3] - bb[1] + 2 * p
    out = [svg_open(x0, y0, w, h, title)]
    if bg: out.append(f'<rect x="{f(x0)}" y="{f(y0)}" width="{f(w)}" height="{f(h)}" fill="{bg}"/>')
    out.append(f'<path fill="{ink}" d="{d}"/>{circles(balls, ball)}</svg>\n')
    return ''.join(out)

def symbol_svg(ink, ball_fill, bg=None, side=1000, rx=0, style='', title='Play Before Pixels'):
    s = side * (1 - 2 * SYM_PAD) / max(2 * SYM_BALL_R + SYM_GAP + SYM_LINE_H, max(2 * SYM_BALL_R, SYM_LINE_W))
    b, l = symbol_parts(side / 2, side / 2, s)
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {side} {side}" width="{side}" height="{side}" '
           f'role="img" aria-label="{title}"><title>{title}</title>']
    if style: out.append(f'<style>{style}</style>')
    if bg: out.append(f'<rect width="{side}" height="{side}" rx="{f(rx)}" fill="{bg}"/>')
    out.append(f'<rect class="line" x="{f(l[0])}" y="{f(l[1])}" width="{f(l[2])}" height="{f(l[3])}" rx="{f(l[4])}" fill="{ink}"/>')
    out.append(f'<circle cx="{f(b[0])}" cy="{f(b[1])}" r="{f(b[2])}" fill="{ball_fill}"/></svg>\n')
    return ''.join(out)

def favicon_svg():
    x, y, w, h = FAV_LINE
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" role="img" '
            'aria-label="Play Before Pixels"><title>Play Before Pixels</title>'
            '<style>.line{fill:' + INK + '}@media (prefers-color-scheme: dark){.line{fill:' + PAPER + '}}</style>'
            f'<rect class="line" x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" rx="{f(h / 2)}"/>'
            f'<circle cx="{f(FAV_BALL_CX)}" cy="{f(FAV_BALL_CY)}" r="{f(FAV_BALL_R)}" fill="{TOMATO}"/></svg>\n')

# ---------------------------------------------------------------------------- build
SCHEMES = {                      # suffix: (letters, ball, background)
    '':         (INK, TOMATO, None),
    '-black':   (BLACK, BLACK, None),
    '-reverse': (PAPER, TOMATO, INK),
    '-white':   (PAPER, PAPER, None),
}

def build():
    files = {}
    d1, b1, bb1 = comp_oneline()
    ds, bs, bbs = comp_stacked()
    for suf, (ink, ball, bg) in SCHEMES.items():
        files[f'primary-logo{suf}.svg'] = lettering_svg(d1, b1, bb1, ink, ball, bg)
        files[f'logo-stacked{suf}.svg'] = lettering_svg(ds, bs, bbs, ink, ball, bg)
    files['symbol.svg'] = symbol_svg(INK, TOMATO)
    files['symbol-black.svg'] = symbol_svg(BLACK, BLACK)
    files['symbol-reverse.svg'] = symbol_svg(PAPER, TOMATO, bg=INK)
    files['symbol-avatar.svg'] = symbol_svg(INK, TOMATO, bg=SUN_T, side=1080)
    files['favicon.svg'] = favicon_svg()
    for name, svg in files.items():
        with open(os.path.join(HERE, name), 'w') as fh: fh.write(svg)
    # geometry report (units) for the notes
    rep = dict(oneline_bbox=[round(v) for v in bb1], stacked_bbox=[round(v) for v in bbs],
               ball=dict(r=BALL_R, gap=BALL_GAP), font=dict(wght=FONT_WGHT, opsz=FONT_OPSZ))
    with open(os.path.join(SRC, 'geometry.json'), 'w') as fh: json.dump(rep, fh, indent=1)
    print('wrote', len(files), 'svg files;', rep)

if __name__ == '__main__':
    build()
