"""Concept 5 'Shadow Talker' -- builds every SVG.

Mark: a hand-shadow puppet (a hand turned into a talking creature: fingers are the
upper jaw, the thumb is the lower jaw, one raised finger is the ear, the eye is the
gap of light between knuckles) wearing a sleeve cuff. Hand-drawn cubic paths,
combined with exact boolean operations (skia-pathops) so every file is one clean
path per colour.

Wordmark: Bricolage Grotesque 800 (brand font, instanced from the local woff2 at
wght 800 / opsz 96) with its own outlines converted to paths, kerned with HarfBuzz.
"""
import os, math
import pathops
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.svgLib.path import parse_path

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)
INK, PAPER, TOMATO, SUN, SKY, BLACK, WHITE = '#1D2940', '#FFFFFF', '#EE5A36', '#F5B820', '#3D86D8', '#000000', '#FFFFFF'


def f(v):
    s = ('%.2f' % v).rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s


# ------------------------------------------------------------------ mark geometry (units: 100 box)
HAND = ("M33 100C33 90 32 80 30 72C27.5 62 24.5 52 25 42"
        "C25.3 36 27 22 29 14C30 10 33 7.5 36 7.5C39 7.5 41.5 10 42 13"
        "C42.5 16 43 19 45 20.5C47 22 50 20.5 54 20"
        "C66 18.5 78 20 86 23.5C93 26.56 95 33 90 36"
        "C88 37.2 85 37.8 81 38.3C73 39.3 66 41 61 42.8"
        "C57.5 44.06 57.5 47 61 48.2C68 50.6 75 52 80 52.5"
        "C86 53.1 87.5 58.5 83 61.5C78 64.83 70 66 63 66.5"
        "C56 67 51.5 71 51.2 78C51 86 52 93 52 100Z")
EYE = (51.0, 29.6, 3.9)
CUFF_TOP = 84.0
CUFF = f"M28 100L28.5 {CUFF_TOP+3.5}Q28.7 {CUFF_TOP} 32.2 {CUFF_TOP}H52.8Q56.3 {CUFF_TOP} 56.5 {CUFF_TOP+3.5}L57 100Z"
GAP = 2.2  # knockout between hand and cuff in one-colour versions

# favicon cut: same drawing, bigger eye and a slightly shorter ear so it survives 16 px
EYE_SMALL = (51.6, 30.4, 5.4)


def sk(d):
    p = pathops.Path()
    pen = p.getPen()
    parse_path(d, pen)
    return p


def circle_path(cx, cy, r):
    k = 0.5522847498 * r
    p = pathops.Path(); pen = p.getPen()
    pen.moveTo((cx + r, cy))
    pen.curveTo((cx + r, cy + k), (cx + k, cy + r), (cx, cy + r))
    pen.curveTo((cx - k, cy + r), (cx - r, cy + k), (cx - r, cy))
    pen.curveTo((cx - r, cy - k), (cx - k, cy - r), (cx, cy - r))
    pen.curveTo((cx + k, cy - r), (cx + r, cy - k), (cx + r, cy))
    pen.closePath()
    return p


def rect_path(x0, y0, x1, y1):
    p = pathops.Path(); pen = p.getPen()
    pen.moveTo((x0, y0)); pen.lineTo((x1, y0)); pen.lineTo((x1, y1)); pen.lineTo((x0, y1)); pen.closePath()
    return p


def to_d(path, ox=0, oy=0, s=1.0):
    out = []
    for verb, pts in path.segments:
        P = [f"{f(ox + s * x)} {f(oy + s * y)}" for x, y in pts]
        if verb == 'moveTo': out.append('M' + P[0])
        elif verb == 'lineTo': out.append('L' + P[0])
        elif verb == 'curveTo': out.append('C' + ' '.join(P))
        elif verb == 'qCurveTo':
            if len(P) == 2: out.append('Q' + ' '.join(P))
            else:  # implied on-curve points
                q = pts
                for i in range(len(q) - 1):
                    c = q[i]
                    e = q[i + 1] if i == len(q) - 2 else ((q[i][0] + q[i + 1][0]) / 2, (q[i][1] + q[i + 1][1]) / 2)
                    out.append(f"Q{f(ox+s*c[0])} {f(oy+s*c[1])} {f(ox+s*e[0])} {f(oy+s*e[1])}")
        elif verb == 'closePath': out.append('Z')
    return ''.join(out)


def op(a, b, kind):
    return pathops.op(a, b, kind, fix_winding=True)


def mark_paths(one_colour=False, small=False):
    """returns (hand_path, cuff_path) as pathops paths in 100-unit space."""
    ex, ey, er = EYE_SMALL if small else EYE
    hand = op(sk(HAND), circle_path(ex, ey, er), pathops.PathOp.DIFFERENCE)
    cuff = sk(CUFF)
    if one_colour:
        hand = op(hand, rect_path(0, CUFF_TOP - GAP, 100, 101), pathops.PathOp.DIFFERENCE)
        return op(hand, cuff, pathops.PathOp.UNION), None
    hand = op(hand, rect_path(0, CUFF_TOP + 1, 100, 101), pathops.PathOp.DIFFERENCE)  # tuck under the cuff
    return hand, cuff


MB = (25.0, 7.5, 95.0 - 25.0, 100 - 7.5)  # approx bounds; recomputed below
def mark_bounds():
    hand, cuff = mark_paths()
    u = op(hand, cuff, pathops.PathOp.UNION)
    return u.bounds  # (xmin, ymin, xmax, ymax)


# ------------------------------------------------------------------ wordmark
TT = os.path.join(HERE, 'bric800.ttf')
tt = TTFont(TT); gs = tt.getGlyphSet(); order = tt.getGlyphOrder()
hbfont = hb.Font(hb.Face(hb.Blob.from_file_path(TT)))
CAP = 660


def shape(text, track):
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": True})
    out, x = [], 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        out.append((order[info.codepoint], x + pos.x_offset)); x += pos.x_advance + track
    return out, x - track


def word_d(text, ox, base, s, track=-12):
    glyphs, adv = shape(text, track)
    d = []
    for name, x in glyphs:
        pen = SVGPathPen(gs, ntos=f)
        gs[name].draw(TransformPen(pen, (s, 0, 0, -s, ox + s * x, base)))
        d.append(pen.getCommands())
    return ''.join(d), adv * s


def ink_left_bearing(text, s, track=-12):
    glyphs, _ = shape(text, track)
    name, x = glyphs[0]
    from fontTools.pens.boundsPen import BoundsPen
    bp = BoundsPen(gs); gs[name].draw(bp)
    return (x + bp.bounds[0]) * s


# ------------------------------------------------------------------ SVG writers
def svg_doc(w, h, body, title='Play Before Pixels', minx=0, miny=0):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(minx)} {f(miny)} {f(w)} {f(h)}" '
            f'width="{f(w)}" height="{f(h)}" role="img" aria-label="{title}"><title>{title}</title>{body}</svg>\n')


def mark_body(ox, oy, s, hand_c=TOMATO, cuff_c=SKY, one=None, small=False):
    if one:
        p, _ = mark_paths(one_colour=True, small=small)
        return f'<path fill="{one}" d="{to_d(p, ox, oy, s)}"/>'
    hand, cuff = mark_paths(small=small)
    return f'<path fill="{hand_c}" d="{to_d(hand, ox, oy, s)}"/><path fill="{cuff_c}" d="{to_d(cuff, ox, oy, s)}"/>'


def build():
    x0, y0, x1, y1 = mark_bounds()
    mw, mh = x1 - x0, y1 - y0
    files = {}

    # --- mark alone: square canvas, mark centred optically (shifted a touch left: the mouth is open to the right)
    def mark_svg(size_units=100, **kw):
        pad = 10
        side = max(mw, mh) + 2 * pad
        ox = (side - mw) / 2 - x0 - 1.5
        oy = (side - mh) / 2 - y0
        return svg_doc(side, side, mark_body(ox, oy, 1, **kw), 'Play Before Pixels mark')
    files['mark.svg'] = mark_svg()
    files['mark-small.svg'] = mark_svg(small=True)
    files['mark-black.svg'] = mark_svg(one=BLACK)
    files['mark-white.svg'] = mark_svg(one=WHITE)
    files['mark-reverse.svg'] = mark_svg(hand_c=TOMATO, cuff_c=SUN)

    # --- horizontal lockup
    s_txt = 0.1                     # cap height 66
    cap = CAP * s_txt
    ms = (cap * 1.62) / mh          # mark height = 1.62 x cap height, sleeve sits on the baseline
    base = mh * ms                  # baseline y (mark top at 0)
    gap = cap * 0.42
    text_x = mw * ms + gap - ink_left_bearing('Play Before Pixels', s_txt)
    wd, adv = word_d('Play Before Pixels', text_x, base, s_txt)
    W = text_x + adv + 2; H = base + 0.5  # descender of y hangs below baseline
    desc = 0.22 * 1000 * s_txt
    H = base + desc
    def hlock(word_c=INK, one=None, **kw):
        mb = mark_body(-x0 * ms, -y0 * ms, ms, one=one, **kw)
        return svg_doc(W, H, mb + f'<path fill="{one or word_c}" d="{wd}"/>')
    files['lockup-horizontal.svg'] = hlock()
    files['lockup-horizontal-reverse.svg'] = hlock(word_c=WHITE, cuff_c=SUN)

    # --- stacked lockup
    s2 = 0.1; cap2 = CAP * s2
    lines = ['Play Before', 'Pixels']
    lead = cap2 * 1.34
    widths = [shape(t, -12)[1] * s2 for t in lines]
    TW = max(widths)
    ms2 = (cap2 * 2.2) / mh
    mark_w2 = mw * ms2
    SW = max(TW, mark_w2)
    top_gap = cap2 * 0.52
    b1 = mh * ms2 + top_gap + cap2
    b2 = b1 + lead
    SH = b2 + 0.22 * 1000 * s2
    wds = []
    for t, wdt, b in zip(lines, widths, [b1, b2]):
        wds.append(word_d(t, (SW - wdt) / 2, b, s2)[0])
    mox = (SW - mark_w2) / 2 - x0 * ms2 - 1.5 * ms2
    def slock(word_c=INK, one=None, **kw):
        mb = mark_body(mox, -y0 * ms2, ms2, one=one, **kw)
        return svg_doc(SW, SH, mb + f'<path fill="{one or word_c}" d="{"".join(wds)}"/>')
    files['lockup-stacked.svg'] = slock()
    files['lockup-stacked-reverse.svg'] = slock(word_c=WHITE, cuff_c=SUN)

    # --- one-colour (stamp / embroidery / single-screen print): stacked lockup, cuff separated by a knockout gap
    files['one-color-black.svg'] = slock(one=BLACK)
    files['one-color-white.svg'] = slock(one=WHITE)
    files['one-color-black-horizontal.svg'] = hlock(one=BLACK)
    files['one-color-white-horizontal.svg'] = hlock(one=WHITE)

    for name, content in files.items():
        with open(os.path.join(OUT, name), 'w') as fh:
            fh.write(content)
    print('wrote', ', '.join(files))


if __name__ == '__main__':
    build()
