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
HAND_UPRIGHT = ("M29 86C29 78 27.5 72 25.5 66C22 56 20.5 46 22 37C22.8 32 24 26 25.5 20"
        "C26.75 15 27.5 5 33.5 4.5C39.5 4 42.5 9 42.5 14C42.5 18.5 44 21 47.5 20.5"
        "C60 18.87 76 20 85 24C94 28 95 38 86 40.5C78 42.72 69 43.5 62 45"
        "C58.5 45.75 58.5 48.6 62 49.3C70 50.9 77 50.5 81 49.5"
        "C88 47.75 91 54 86 58.5C79 64.8 68 68 59 68.5C55 68.72 53.5 72 53.5 76"
        "C53.5 80 54 83 54 86Z")
TILT = (-8.0, 40.0, 78.0)   # the head looks up a little, towards the words it is talking to
EYE = (51.0, 30.0, 4.2)
EYE_SMALL = (51.4, 30.4, 5.6)  # favicon cut: bigger gap of light so it survives 16 px
CUFF_TOP = 78.0
CUFF = f"M22.5 100L23 {CUFF_TOP+4}Q23.2 {CUFF_TOP} 27.2 {CUFF_TOP}H54.8Q58.8 {CUFF_TOP} 59 {CUFF_TOP+4}L59.5 100Z"
GAP = 2.2  # knockout between hand and cuff in one-colour versions



from fontTools.misc.transform import Identity
_T = Identity.translate(TILT[1], TILT[2]).rotate(math.radians(TILT[0])).translate(-TILT[1], -TILT[2])


def sk(d, t=None):
    p = pathops.Path()
    pen = p.getPen()
    parse_path(d, TransformPen(pen, t) if t is not None else pen)
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
    ex, ey = _T.transformPoint((ex, ey))
    hand = op(sk(HAND_UPRIGHT, _T), circle_path(ex, ey, er), pathops.PathOp.DIFFERENCE)
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
    ms = (cap * 1.9) / mh          # mark height = 1.62 x cap height, sleeve sits on the baseline
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
