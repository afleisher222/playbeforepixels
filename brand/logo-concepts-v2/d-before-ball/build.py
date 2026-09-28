#!/usr/bin/env python3
"""Play Before Pixels - logo concept D, "the ball in before".

The name is set in Bricolage Grotesque (the brand's own SIL-OFL font, converted to outlines) and a tomato
ball takes the place of the o in "before". The ball carries one curved seam so it reads as a ball, never as
a full stop, a zero or a bullet. The same seamed ball, on its own, is the symbol and the favicon.

Run from this folder:
    python3 build.py              writes every SVG, the test pages and every PNG
    python3 build.py --svg-only   SVGs and test pages only (no Chromium)

Everything is generated from the numbers in TUNABLES below plus the font outlines. No <text>, no system
fonts, no raster images inside any SVG.
"""
import math, os, re, sys, json, subprocess

# =====================================================================================================
# TUNABLES - the founder's dials. Change a number, run `python3 build.py`, look at the PNGs, and add a
# dated line to EDIT_LOG saying what you changed and why. (Keep each change in git as well.)
# Lengths are in font units: 1000 units = the font size. x-height = 528, cap height = 660.
# =====================================================================================================
EDIT_LOG = [
    ('2026-09-28', 'Concept D first build (brand studio): values below.'),
    # ('YYYY-MM-DD', 'Founder: made the ball a touch bigger (BALL size 1.06 -> 1.08).'),
]

WEIGHT = 800            # Bricolage Grotesque weight, 200-800 (800 = the brand's display weight)
OPTICAL_SIZE = 96       # Bricolage optical size, 12-96 (96 = display cut, the most character)
TRACKING = -6           # extra space between every pair of letters (negative = tighter)
WORD_SPACE = 190        # one-line version: width of the space between words (the font's own is 205)
LEADING = 960           # stacked version: baseline to baseline

BALL = dict(
    size=1.06,          # ball diameter as a multiple of the font's o (the o is 556 units tall)
    drop=10,            # how far the ball sits below the o's centre line (it rests its weight on the baseline)
    space_f=10,         # clear space between f and ball, in units MORE than the font leaves between f and o
    space_r=-6,         # clear space between ball and r, in units more than the font leaves between o and r
)

# The ball's one seam: a curved band cut out of the ball (it shows the background through it).
# angle: direction from the ball's centre towards the centre of the seam's circle (degrees, 0 = right, 90 = down)
# reach: how far away that centre is (in ball radii).  curve: the seam circle's radius (in ball radii; smaller =
# more curved).  width: thickness of the seam (in ball radii). reach == curve means the seam passes through the
# middle of the ball.
SEAM = dict(angle=204, reach=1.30, curve=1.30, width=0.125)        # logo and symbol (display sizes)
SEAM_SMALL = dict(angle=204, reach=1.30, curve=1.30, width=0.17)   # stacked logo under ~0.75 in / embroidery
SEAM_FAVICON = dict(angle=204, reach=1.30, curve=1.30, width=0.20) # favicon (16-48 px)

FAVICON_BALL = 0.97     # favicon: ball diameter as a share of the square (16 px tab -> 15.5 px ball)
SYMBOL_BALL = 0.80      # symbol.svg: ball diameter as a share of the square
AVATAR_BALL = 0.54      # social avatar: ball diameter as a share of the square (safe inside a round crop)
CLEAR = 0.5             # clear space around every file, in ball diameters

# =====================================================================================================
# Palette (brand/logo/src/build.py). Flat fills only.
# =====================================================================================================
INK, PAPER, WASH, TOMATO, SUN, SKY = '#1D2940', '#FFFFFF', '#F3F6FB', '#EE5A36', '#F5B820', '#3D86D8'
SUN_T, TOMATO_T, SKY_T = '#FEF4D8', '#FDE9E3', '#E3EEFA'
BLACK, WHITE, DARK_TAB = '#000000', '#FFFFFF', '#202124'

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.normpath(os.path.join(HERE, '..', '..', 'fonts'))
SRC = os.path.join(HERE, 'src'); TESTS = os.path.join(HERE, 'tests')
BRIC_WOFF2 = os.path.join(FONTS, 'bricolage-a24454f0.woff2')          # Bricolage Grotesque, latin subset
NUNITO_WOFF2 = os.path.join(FONTS, 'nunito-8ecf95f1.woff2')           # Nunito Sans, latin (preview labels)

import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.basePen import BasePen


def f(v):
    if abs(v) < 0.005: return '0'
    s = ('%.2f' % v).rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s


# ----------------------------------------------------------------------------------------------- font
def instance(woff2, axes, name):
    """instance a variable woff2 at fixed axes -> static TTF in src/ (rebuilt when the numbers change)"""
    path = os.path.join(SRC, name)
    stamp = path + '.axes'
    key = json.dumps(axes, sort_keys=True)
    if not (os.path.exists(path) and os.path.exists(stamp) and open(stamp).read() == key):
        vf = TTFont(woff2)
        st = instantiateVariableFont(vf, axes)
        st.flavor = None
        st.save(path)
        open(stamp, 'w').write(key)
    return path


class Font:
    def __init__(self, path):
        self.tt = TTFont(path); self.gs = self.tt.getGlyphSet(); self.order = self.tt.getGlyphOrder()
        self.hb = hb.Font(hb.Face(hb.Blob.from_file_path(path)))

    def shape(self, text):
        buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
        hb.shape(self.hb, buf, {'kern': True})
        return [(self.order[g.codepoint], p.x_advance) for g, p in zip(buf.glyph_infos, buf.glyph_positions)]

    def d(self, name, x, base, s=1.0):
        pen = SVGPathPen(self.gs, ntos=f)
        self.gs[name].draw(TransformPen(pen, (s, 0, 0, -s, x, base)))
        return pen.getCommands()

    def bounds(self, name):
        bp = BoundsPen(self.gs); self.gs[name].draw(bp); return bp.bounds

    def polyline(self, name, x, base, s=1.0, steps=10):
        """glyph outline flattened to point lists (SVG coordinates) - used only to measure gaps"""
        out = []

        class P(BasePen):
            def _moveTo(self, p): out.append([p])
            def _lineTo(self, p): out[-1].append(p)
            def _curveToOne(self, a, b, c):
                p0 = out[-1][-1]
                for i in range(1, steps + 1):
                    t = i / steps; m = 1 - t
                    out[-1].append((m**3*p0[0] + 3*m*m*t*a[0] + 3*m*t*t*b[0] + t**3*c[0],
                                    m**3*p0[1] + 3*m*m*t*a[1] + 3*m*t*t*b[1] + t**3*c[1]))
            def _qCurveToOne(self, a, b):
                p0 = out[-1][-1]
                for i in range(1, steps + 1):
                    t = i / steps; m = 1 - t
                    out[-1].append((m*m*p0[0] + 2*m*t*a[0] + t*t*b[0], m*m*p0[1] + 2*m*t*a[1] + t*t*b[1]))
            def _closePath(self): out[-1].append(out[-1][0])
        self.gs[name].draw(TransformPen(P(self.gs), (s, 0, 0, -s, x, base)))
        return out


# ----------------------------------------------------------------------------------------------- ball
def _arc(M, r, P, Q, T):
    """SVG arc from P to Q on the circle (M, r), going the way that passes through T"""
    ang = lambda p: math.atan2(p[1] - M[1], p[0] - M[0])
    a, b, t = ang(P), ang(Q), ang(T); tau = 2 * math.pi
    span, tt = (b - a) % tau, (t - a) % tau
    sweep, span = (1, span) if tt < span else (0, tau - span)
    return f"A{f(r)} {f(r)} 0 {1 if span > math.pi else 0} {sweep} {f(Q[0])} {f(Q[1])}"


def _meet(O, R, C, r):
    dx, dy = C[0] - O[0], C[1] - O[1]; d = math.hypot(dx, dy)
    a = (R * R - r * r + d * d) / (2 * d); h = math.sqrt(max(R * R - a * a, 0.0))
    ux, uy = dx / d, dy / d; px, py = O[0] + a * ux, O[1] + a * uy
    return (px - h * uy, py + h * ux), (px + h * uy, py - h * ux)


def ball_paths(cx, cy, R, seam):
    """-> (piece_a, piece_b, band): the two parts of the ball either side of the seam, and the seam band itself.
    All three are exact circular arcs (no masks), so the file stays clean for print, cutting and embroidery."""
    O = (cx, cy); th = math.radians(seam['angle']); u = (math.cos(th), math.sin(th))
    C = (cx + seam['reach'] * R * u[0], cy + seam['reach'] * R * u[1])
    r1 = (seam['curve'] - seam['width'] / 2) * R; r2 = (seam['curve'] + seam['width'] / 2) * R
    P1, P2 = _meet(O, R, C, r1); Q1, Q2 = _meet(O, R, C, r2)
    near_b, far_b = (cx + R * u[0], cy + R * u[1]), (cx - R * u[0], cy - R * u[1])
    near_1, near_2 = (C[0] - r1 * u[0], C[1] - r1 * u[1]), (C[0] - r2 * u[0], C[1] - r2 * u[1])
    a = f"M{f(P1[0])} {f(P1[1])}" + _arc(O, R, P1, P2, near_b) + _arc(C, r1, P2, P1, near_1) + 'Z'
    b = f"M{f(Q1[0])} {f(Q1[1])}" + _arc(O, R, Q1, Q2, far_b) + _arc(C, r2, Q2, Q1, near_2) + 'Z'
    # the band: between the two seam circles, inside the ball
    band = (f"M{f(P2[0])} {f(P2[1])}" + _arc(C, r1, P2, P1, near_1) + _arc(O, R, P1, Q1, _mid(O, R, P1, Q1))
            + _arc(C, r2, Q1, Q2, near_2) + _arc(O, R, Q2, P2, _mid(O, R, Q2, P2)) + 'Z')
    return a, b, band


def _mid(O, R, P, Q):
    """point on circle (O, R) halfway along the short arc from P to Q"""
    a1 = math.atan2(P[1] - O[1], P[0] - O[0]); a2 = math.atan2(Q[1] - O[1], Q[0] - O[0])
    d = (a2 - a1 + math.pi) % (2 * math.pi) - math.pi
    m = a1 + d / 2
    return (O[0] + R * math.cos(m), O[1] + R * math.sin(m))


def disc(cx, cy, R):
    return f"M{f(cx - R)} {f(cy)}A{f(R)} {f(R)} 0 1 0 {f(cx + R)} {f(cy)}A{f(R)} {f(R)} 0 1 0 {f(cx - R)} {f(cy)}Z"


# ----------------------------------------------------------------------------------------------- setting
def _seg_dist(p, a, b):
    ax, ay, bx, by = a[0], a[1], b[0], b[1]; dx, dy = bx - ax, by - ay
    L = dx * dx + dy * dy
    t = 0.0 if L == 0 else max(0.0, min(1.0, ((p[0] - ax) * dx + (p[1] - ay) * dy) / L))
    return math.hypot(p[0] - ax - t * dx, p[1] - ay - t * dy)


def outline_gap(A, B):
    """smallest distance between two outlines given as lists of point lists (no shapely needed)"""
    best = 1e9
    for X, Y in ((A, B), (B, A)):
        segs = [(c[i], c[i + 1]) for c in Y for i in range(len(c) - 1)]
        for c in X:
            for p in c:
                for a, b in segs:
                    d = _seg_dist(p, a, b)
                    if d < best: best = d
    return best


def circle_gap(A, cx, cy, R):
    """smallest distance from an outline to a circle's edge (negative when they overlap)"""
    return min(_seg_dist((cx, cy), c[i], c[i + 1]) for c in A for i in range(len(c) - 1)) - R


class Setter:
    def __init__(self, font):
        self.F = font
        ob = font.bounds('o'); self.o_lsb = ob[0]; self.o_rsb = font.gs['o'].width - ob[2]
        self.o_lo, self.o_hi = ob[1], ob[3]
        # the font's own clearances around its o, measured on the outlines at the current tracking
        (n1, a1), (n2, a2) = font.shape('fo'); (n3, a3), (n4, _) = font.shape('or')
        self.gap_fo = outline_gap(font.polyline('f', 0, 0), font.polyline('o', a1 + TRACKING, 0))
        self.gap_or = outline_gap(font.polyline('o', 0, 0), font.polyline('r', a3 + TRACKING, 0))

    def set(self, text, x0=0.0, base=0.0, s=1.0, word_space=None):
        """set one line. -> dict(glyphs=[(name, x)], ball=(cx, cy, R) or None, width) in SVG units (y down).
        The first o of the line is replaced by the ball, spaced optically: its clear distance to the letter
        before and after it is solved from the outlines, not from side bearings."""
        glyphs, ball, x = [], None, 0.0
        shaped = self.F.shape(text)
        for i, (name, adv) in enumerate(shaped):
            if name == 'space':
                x += (word_space if word_space is not None else adv) + TRACKING
                continue
            if name == 'o' and ball is None:
                D = BALL['size'] * (self.o_hi - self.o_lo); R = D / 2
                cy = -((self.o_hi + self.o_lo) / 2 - BALL['drop'])          # y down, baseline 0
                prev = glyphs[-1] if glyphs else None
                target = self.gap_fo + BALL['space_f']
                if prev:   # slide the ball until its clear distance to the previous letter hits the target
                    outl = self.F.polyline(prev[0], (prev[1] - x0) / s, 0)
                    lo, hi = x - 400, x + 1200
                    for _ in range(40):
                        mid = (lo + hi) / 2
                        if circle_gap(outl, mid, cy, R) < target: lo = mid
                        else: hi = mid
                    cx = hi
                else:
                    cx = x + self.o_lsb + R
                ball = (x0 + s * cx, base + s * cy, s * R)
                # next letter: solve its origin so its clear distance to the ball hits the target
                nxt = shaped[i + 1][0] if i + 1 < len(shaped) else None
                if nxt and nxt != 'space':
                    target = self.gap_or + BALL['space_r']
                    lo, hi = cx - 200, cx + R + 800
                    for _ in range(40):
                        mid = (lo + hi) / 2
                        if circle_gap(self.F.polyline(nxt, mid, 0, steps=6), cx, cy, R) < target: lo = mid
                        else: hi = mid
                    x = hi
                else:
                    x = cx + R + self.o_rsb + TRACKING
                continue
            glyphs.append((name, x0 + s * x))
            x += adv + TRACKING
        return dict(glyphs=glyphs, ball=ball, width=s * (x - TRACKING), base=base, s=s)

    def ink(self, line):
        return ''.join(self.F.d(n, x, line['base'], line['s']) for n, x in line['glyphs'])

    def ink_bounds(self, lines):
        xs, ys = [], []
        for ln in lines:
            for n, x in ln['glyphs']:
                b = self.F.bounds(n)
                if b is None: continue
                xs += [x + ln['s'] * b[0], x + ln['s'] * b[2]]; ys += [ln['base'] - ln['s'] * b[3], ln['base'] - ln['s'] * b[1]]
            if ln['ball']:
                cx, cy, R = ln['ball']; xs += [cx - R, cx + R]; ys += [cy - R, cy + R]
        return min(xs), min(ys), max(xs), max(ys)


def gaps_report(S, lines):
    """smallest distance between neighbouring shapes, to keep the founder's edits from making anything touch"""
    try:
        from shapely.geometry import LineString, Point
    except ImportError:
        return {}
    rep = {}
    for ln in lines:
        if not ln['ball']: continue
        cx, cy, R = ln['ball']; circle = Point(cx, cy).buffer(R, 256).exterior
        for n, x in ln['glyphs']:
            if n in ('f', 'r'):
                gl = [LineString(c) for c in S.F.polyline(n, x, ln['base'], ln['s']) if len(c) > 1]
                rep[f'{n}-ball'] = round(min(g.distance(circle) for g in gl), 1)
    for i in range(len(lines) - 1):
        a = [LineString(c) for n, x in lines[i]['glyphs'] for c in S.F.polyline(n, x, lines[i]['base'], lines[i]['s']) if len(c) > 1]
        b = [LineString(c) for n, x in lines[i + 1]['glyphs'] for c in S.F.polyline(n, x, lines[i + 1]['base'], lines[i + 1]['s']) if len(c) > 1]
        if lines[i + 1]['ball']:
            cx, cy, R = lines[i + 1]['ball']; b.append(Point(cx, cy).buffer(R, 256).exterior)
        if lines[i]['ball']:
            cx, cy, R = lines[i]['ball']; a.append(Point(cx, cy).buffer(R, 256).exterior)
        rep[f'line{i + 1}-line{i + 2}'] = round(min(p.distance(q) for p in a for q in b if p.envelope.distance(q.envelope) < 400), 1)
    return rep


# ----------------------------------------------------------------------------------------------- svg
SCHEMES = {                                   # suffix: (letters, ball, seam, ground)
    '':         (INK, TOMATO, None, None),     # full colour on white / light grounds; seam is cut out
    '-reverse': (PAPER, TOMATO, None, INK),    # on ink (file carries its ink ground)
    '-black':   (BLACK, BLACK, None, None),    # one colour
    '-white':   (WHITE, WHITE, None, None),    # one colour, white, transparent ground
}


def svg_doc(vb, body, title='Play Before Pixels', ground=None, size=1000):
    x, y, w, h = vb; k = size / max(w, h)
    g = f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" fill="{ground}"/>' if ground else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x)} {f(y)} {f(w)} {f(h)}" width="{round(w * k)}" '
            f'height="{round(h * k)}" role="img" aria-label="{title}"><title>{title}</title>{g}{body}</svg>\n')


def paint_ball(b, colour, seam, seam_fill=None):
    cx, cy, R = b
    a, bb, band = ball_paths(cx, cy, R, seam)
    if seam_fill:      # painted seam: whole disc, then the band on top (same look on any ground)
        return f'<path fill="{colour}" d="{disc(cx, cy, R)}"/><path fill="{seam_fill}" d="{band}"/>'
    return f'<path fill="{colour}" d="{a}{bb}"/>'   # cut seam: two pieces, the ground shows through


def paint(S, lines, letters, ball, seam, seam_fill=None):
    d = ''.join(S.ink(ln) for ln in lines)
    out = f'<path fill="{letters}" d="{d}"/>'
    for ln in lines:
        if ln['ball']: out += paint_ball(ln['ball'], ball, seam, seam_fill)
    return out


# ----------------------------------------------------------------------------------------------- build
def build(render=True):
    os.makedirs(SRC, exist_ok=True); os.makedirs(TESTS, exist_ok=True)
    F = Font(instance(BRIC_WOFF2, {'wght': WEIGHT, 'opsz': OPTICAL_SIZE}, f'bricolage-{WEIGHT}-{OPTICAL_SIZE}.ttf'))
    S = Setter(F)
    files = {}

    # stacked: play / before / pixels, ranged left (the chosen primary logo)
    stacked = [S.set(t, 0, i * LEADING) for i, t in enumerate(('play', 'before', 'pixels'))]
    # one line: play before pixels (secondary: long thin spaces)
    oneline = [S.set('play before pixels', 0, 0, word_space=WORD_SPACE)]
    D = 2 * stacked[1]['ball'][2]            # clear-space unit = one ball diameter

    def framed(lines, pad):
        x0, y0, x1, y1 = S.ink_bounds(lines)
        return (x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad)

    for base, lines, seam in (('primary-logo', stacked, SEAM), ('primary-logo-small', stacked, SEAM_SMALL),
                              ('primary-logo-oneline', oneline, SEAM)):
        vb = framed(lines, CLEAR * D)
        for suf, (letters, ballc, seamc, ground) in SCHEMES.items():
            files[f'{base}{suf}.svg'] = svg_doc(vb, paint(S, lines, letters, ballc, seam, seamc), ground=ground)

    # symbol: the seamed ball alone
    def square_ball(side, share, seam, colour=TOMATO, ground=None, seam_fill=None, rx=0, title='Play Before Pixels'):
        R = share * side / 2; c = side / 2
        g = f'<rect width="{f(side)}" height="{f(side)}" rx="{f(rx)}" fill="{ground}"/>' if ground else ''
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(side)} {f(side)}" width="{f(side)}" height="{f(side)}" '
                f'role="img" aria-label="{title}"><title>{title}</title>{g}{paint_ball((c, c, R), colour, seam, seam_fill)}</svg>\n')

    files['symbol.svg'] = square_ball(1000, SYMBOL_BALL, SEAM)
    files['symbol-black.svg'] = square_ball(1000, SYMBOL_BALL, SEAM, colour=BLACK)
    files['symbol-reverse.svg'] = square_ball(1000, SYMBOL_BALL, SEAM, ground=INK)
    files['symbol-avatar.svg'] = square_ball(1080, AVATAR_BALL, SEAM, ground=SUN_T)
    # favicon: the ball fills the tab square; the seam is painted paper-white (not cut out) so the icon looks the
    # same in light and dark tabs.
    files['favicon.svg'] = square_ball(32, FAVICON_BALL, SEAM_FAVICON, seam_fill=PAPER)

    for n, c in files.items():
        with open(os.path.join(HERE, n), 'w') as fh: fh.write(c)

    rep = gaps_report(S, stacked)
    rep['font f-o'] = round(S.gap_fo, 1); rep['font o-r'] = round(S.gap_or, 1)
    x0, y0, x1, y1 = S.ink_bounds(stacked)
    print(f'wrote {len(files)} SVGs.  stacked ink box {round(x1 - x0)} x {round(y1 - y0)} units;'
          f' ball diameter {round(D)}; line widths {[round(l["width"]) for l in stacked]}')
    print('smallest gaps (units):', rep)

    write_tests(S, stacked, oneline, files)
    if render:
        subprocess.run(['node', os.path.join(HERE, 'render.js')], check=True, cwd=HERE)


# ----------------------------------------------------------------------------------------------- tests
def font_face():
    return (f"@font-face{{font-family:'Nunito Sans';src:url('file://{NUNITO_WOFF2}') format('woff2');font-weight:300 900}}"
            f"@font-face{{font-family:'Bricolage Grotesque';src:url('file://{BRIC_WOFF2}') format('woff2');font-weight:200 800}}")


def page(body, w, h, bg=PAPER, css=''):
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{font_face()}html,body{{margin:0;width:{w}px;height:{h}px;'
            f'background:{bg};overflow:hidden}}{css}</style></head><body>{body}</body></html>\n')


def write_tests(S, stacked, oneline, files):
    jobs = []
    rel = lambda n: os.path.join('..', n)

    # 1. symbol alone, 512 on white, no words
    open(os.path.join(TESTS, 'test-large.html'), 'w').write(page(
        f'<img src="{rel("symbol.svg")}" style="position:absolute;left:56px;top:56px;width:400px;height:400px">', 512, 512))
    jobs.append(dict(src='tests/test-large.html', out='test-large.png', w=512, h=512))

    # 2. full primary logo, 1600 wide, on white
    vb = re.search(r'viewBox="([^"]+)"', files['primary-logo.svg']).group(1).split()
    ar = float(vb[3]) / float(vb[2]); H = round(1600 * ar)
    open(os.path.join(TESTS, 'test-logo.html'), 'w').write(page(
        f'<img src="{rel("primary-logo.svg")}" style="display:block;width:1600px;height:{H}px">', 1600, H))
    jobs.append(dict(src='tests/test-logo.html', out='test-logo.png', w=1600, h=H))

    # 3. favicon rasterised at true 16 and 32 px (transparent), then enlarged nearest-neighbour on tab colours
    open(os.path.join(TESTS, 'fav.html'), 'w').write(
        '<!doctype html><html><head><style>html,body{margin:0;background:transparent}img{display:block;width:100vw;height:100vh}</style>'
        f'</head><body><img src="{rel("favicon.svg")}"></body></html>\n')
    jobs.append(dict(src='tests/fav.html', out='tests/favicon-16.png', w=16, h=16, transparent=True))
    jobs.append(dict(src='tests/fav.html', out='tests/favicon-32.png', w=32, h=32, transparent=True))
    px = 'image-rendering:pixelated;image-rendering:crisp-edges;position:absolute'
    def tab(x0, bg):
        # a panel in the tab colour; the true-size icons sit in a tab-like strip, the enlargements below
        return (f'<div style="position:absolute;left:{x0}px;top:0;width:320px;height:360px;background:{bg}"></div>'
                f'<img src="favicon-16.png" style="{px};left:{x0 + 26}px;top:26px;width:16px;height:16px">'
                f'<img src="favicon-32.png" style="{px};left:{x0 + 58}px;top:18px;width:32px;height:32px">'
                f'<img src="favicon-16.png" style="{px};left:{x0 + 26}px;top:{360 - 26 - 192 + 64}px;width:128px;height:128px">'
                f'<img src="favicon-32.png" style="{px};left:{x0 + 320 - 26 - 128 - 38}px;top:{360 - 26 - 192}px;width:192px;height:192px">')
    open(os.path.join(TESTS, 'test-small.html'), 'w').write(page(tab(0, PAPER) + tab(320, DARK_TAB), 640, 360))
    jobs.append(dict(src='tests/test-small.html', out='test-small.png', w=640, h=360))

    # 4. presentation board
    open(os.path.join(TESTS, 'preview-sheet.html'), 'w').write(preview_sheet(files))
    jobs.append(dict(src='tests/preview-sheet.html', out='preview-sheet.png', w=1600, h=1000))

    with open(os.path.join(SRC, 'jobs.json'), 'w') as fh: json.dump(jobs, fh, indent=1)


def inline(svg_text, css=''):
    """inline an SVG file's markup in HTML with a CSS size"""
    s = re.sub(r'\swidth="[^"]+"\sheight="[^"]+"', '', svg_text, count=1)
    return s.replace('<svg ', f'<svg style="{css}" ', 1)


def preview_sheet(files):
    L = lambda t: f'<div class="lab">{t}</div>'
    logo, rev, blk = files['primary-logo.svg'], files['primary-logo-reverse.svg'], files['primary-logo-black.svg']
    small = files['primary-logo-small.svg']; line = files['primary-logo-oneline.svg']
    avatar = files['symbol-avatar.svg']
    css = f'''
    *{{box-sizing:border-box}}
    body{{font-family:'Nunito Sans';color:{INK};background:{WASH}}}
    .grid{{position:absolute;inset:28px;display:grid;grid-template-columns:1.25fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:20px}}
    .cell{{position:relative;border-radius:14px;overflow:hidden;background:{PAPER}}}
    .lab{{position:absolute;left:20px;bottom:16px;font-size:14px;font-weight:700;letter-spacing:.02em;opacity:.72}}
    .ink .lab{{color:{PAPER};opacity:.8}}
    .center{{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}}
    '''
    # book spines, true scale at 96 px per inch shown at 2x (0.5 in logo = 96 px on this board)
    spines = []
    colours = [(SKY, PAPER), (SUN, INK), (TOMATO, PAPER), (SKY_T, INK), (PAPER, INK)]
    x = 34
    for i, (bg, fg) in enumerate(colours):
        w = [150, 128, 176, 138, 158][i]
        # one-colour logo on each spine, in the spine's ink colour: 0.5 in tall (= 96 px here, board at 2x)
        art = files['primary-logo-small-white.svg'] if fg == PAPER else files['primary-logo-small.svg']
        if bg == TOMATO: art = files['primary-logo-small-white.svg']
        if bg == SUN: art = files['primary-logo-small.svg']
        spines.append(
            f'<div style="position:absolute;left:{x}px;top:18px;width:{w}px;height:392px;background:{bg};border-radius:6px 6px 3px 3px;'
            f'box-shadow:inset -1px 0 0 rgba(0,0,0,.06)">'
            f'<div style="position:absolute;left:50%;top:40px;width:10px;height:200px;margin-left:-5px;border-radius:5px;background:{fg};opacity:.18"></div>'
            f'<div style="position:absolute;left:0;right:0;bottom:22px;display:flex;justify-content:center">{inline(art, "height:96px;width:auto")}</div></div>')
        x += w + 8
    tote = f'''
      <svg viewBox="0 0 400 420" style="position:absolute;left:50%;top:18px;margin-left:-170px;width:340px;height:357px">
        <path d="M120 150 C120 40 280 40 280 150" fill="none" stroke="{SUN}" stroke-width="16" stroke-linecap="round"/>
        <path d="M60 140 H340 L352 410 H48 Z" fill="{SUN_T}"/>
        <path d="M60 140 H340 L341 162 H59 Z" fill="{SUN}" opacity=".35"/>
      </svg>
      <div style="position:absolute;left:50%;top:230px;margin-left:-86px;width:172px">{inline(files['primary-logo-small.svg'], 'width:172px;height:auto')}</div>'''
    header = f'''
      <div style="position:absolute;left:0;right:0;top:0;height:92px;background:{PAPER};border-bottom:1px solid #E6EAF1;display:flex;align-items:center;padding:0 26px;gap:26px">
        {inline(files['primary-logo.svg'], 'height:62px;width:auto;margin-left:-8px')}
        <div style="margin-left:auto;display:flex;gap:18px;font-size:13px;font-weight:700;opacity:.8"><span>Shop</span><span>Ages 0–5</span><span>Ages 5–12</span><span>Classrooms</span></div>
      </div>'''
    body = f'''<div class="grid">
      <div class="cell" style="grid-row:span 1">{header}
        <div class="center" style="top:92px">{inline(logo, 'width:300px;height:auto')}</div>{L('Primary logo on white · and in a 62 px site header')}</div>
      <div class="cell ink" style="background:{INK}"><div class="center">{inline(rev, 'width:250px;height:auto')}</div>{L('Reversed on ink')}</div>
      <div class="cell"><div class="center">{inline(blk, 'width:250px;height:auto')}</div>{L('One colour (black)')}</div>
      <div class="cell" style="background:{PAPER}">
        <div style="position:absolute;left:40px;top:44px;width:300px;height:300px;border-radius:50%;overflow:hidden">{inline(avatar, 'width:300px;height:300px')}</div>
        <div style="position:absolute;left:372px;top:112px;display:flex;flex-direction:column;gap:16px;align-items:flex-start">
          <div style="width:110px;height:110px;border-radius:50%;overflow:hidden">{inline(avatar, 'width:110px;height:110px')}</div>
          <div style="display:flex;gap:10px;align-items:center"><div style="width:40px;height:40px;border-radius:50%;overflow:hidden">{inline(avatar, 'width:40px;height:40px')}</div>
          <div style="width:24px;height:24px;border-radius:50%;overflow:hidden">{inline(avatar, 'width:24px;height:24px')}</div></div>
        </div>{L('Symbol as a round social avatar (300, 110, 40, 24 px)')}</div>
      <div class="cell" style="background:{WASH}">{"".join(spines)}{L('Book spines · logo 0.5 in tall (board shown at 2×)')}</div>
      <div class="cell" style="background:{SKY_T}">{tote}{L('Tote · embroidered, small cut')}</div>
    </div>'''
    return page(body, 1600, 1000, bg=WASH, css=css)


if __name__ == '__main__':
    build(render='--svg-only' not in sys.argv)
