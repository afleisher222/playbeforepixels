"""Play Before Pixels - logo concept C, "The Maker's Seal" (slug: c-badge).

A round maker's seal, like the stamp pressed into the bottom of a good wooden toy: the full name runs
around the ring and a spinning top stands in the middle. Every SVG here is generated from geometry plus
the outlines of Bricolage Grotesque (the brand's own SIL-OFL font, instanced from brand/fonts/*.woff2).
No <text>, no raster images, no system fonts, no transforms, masks or clip paths: every file is plain
filled paths, so it opens cleanly in embroidery, vinyl-cutting and print software.

    python3 build.py              # writes every SVG next to this file (+ src/ helpers)
    python3 tests/make_tests.py   # writes the test pages and tests/jobs.json
    node tests/raster.js          # renders test-large / test-logo / test-small / preview-sheet PNGs

FOUNDER EDITS: every number that shapes the logo is in the TUNABLE block just below. Change one
(for example the top's width TOP['w'], the ring lettering size SEAL['cap'], the ball size
SEAL['dot_r'] or a colour in SCHEMES), run the three commands above, and commit the change with the
date so your own authorship of the final drawing is on record (legal/protection/creation-records-log.md).
"""
import math, os
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

# ============================================================== TUNABLE (founder: edit, rebuild, date it)
SEAL = dict(
    R=500,          # seal radius (every unit below is relative to this)
    cap=96,         # cap height of the ring lettering
    edge=56,        # clear space between the seal's edge and the letters
    inner=40,       # clear space between the letters and the top
    track=50,       # extra letter spacing on the ring, in font units (1000 = one em)
    space=250,      # width of the word space in "PLAY BEFORE", font units
    dot_r=29,       # radius of the two balls between the words
    top_fill=0.82,  # how much of the free middle the top fills (1.0 = touches the clear space)
    top_dy=0,       # optical nudge of the top (units, + = down)
)
TOP = dict(         # the spinning top, drawn upright in its own units (see class Top), then tilted
    tilt=8,         # lean in degrees (clockwise); 0 = upright
    w=430,          # half-width at the rim
    rim=104,        # height of the painted rim band
    dome=165,       # height of the shoulder above the rim
    neck=86,        # half-width where the shoulder meets the handle
    k1=0.55,        # shoulder: how long it stays upright at the rim (0-1)
    k2=0.35,        # shoulder: how flat it runs into the neck (0-1)
    step=0,         # how far the painted rim sticks out past the shoulder and the body (a flange)
    drop=450,       # depth of the body below the rim, to the tip
    bulge=22,       # outward bulge of the body's sides (0 = straight cone)
    tip=30,         # softening of the tip
    handle_w=112,   # handle width
    handle_h=210,   # handle height above the shoulder
    centre=0.5,     # 0 = centre by bounding box, 1 = centre by the body's weight
    bridge=0.13,    # one-colour files: the band is cut as a stripe that stops this far (x w) short of each edge
)
# favicon cut: the same top standing upright, drawn on a 16-px grid (1 px = 62.5 units) so the band,
# the rim and the handle land on whole pixels at 16 and 32 px. y_rim = the rim's lower edge in the square.
FAV_TOP = dict(TOP, tilt=0, w=437.5, rim=187.5, dome=125, neck=100, drop=406.25, bulge=14, tip=40,
               handle_w=125, handle_h=218.75)
FAV = dict(y_rim=562.5)
WORD = dict(
    straight_y=True,  # draw "y" as a v with a straight tail (Bricolage's own y looks like a u with a hook)
    y_tail=-161,    # where that tail is cut (font units; the p descends to -161)
    y_tail_w=160,   # tail thickness, measured across (font units)
    track=-6,       # wordmark letter spacing (font units)
    ball_r=94,      # the round ball that replaces Bricolage's square dot on the i of "Pixels"
    ball_y=650,     # height of that ball's centre above the baseline (font units)
)
LOCKUP = dict(
    disc=1.80,      # small seal diameter, as a multiple of the wordmark's cap height
    gap=0.48,       # space between small seal and wordmark, x cap height
    top_fill=0.70,  # how much of the small seal the top fills
    lift=0.0,       # raise the small seal against the cap height (x cap height)
)

# ============================================================== palette (from brand/logo/src/build.py)
INK, PAPER, WASH, TOMATO, SUN, SKY = '#1D2940', '#FFFFFF', '#F3F6FB', '#EE5A36', '#F5B820', '#3D86D8'
SUN_T, TOMATO_T, SKY_T = '#FEF4D8', '#FDE9E3', '#E3EEFA'
BLACK, WHITE = '#000000', '#FFFFFF'

# what each part is painted with. mono=<colour> makes a one-colour file: one path, everything else knocked out.
SCHEMES = {
    'color':   dict(disc=INK,   letters=PAPER, ball=TOMATO, body=SKY, band=SUN, handle=PAPER, word=INK,   iball=TOMATO),
    'reverse': dict(disc=PAPER, letters=INK,   ball=TOMATO, body=SKY, band=SUN, handle=INK,   word=PAPER, iball=TOMATO),
    'black':   dict(mono=BLACK),
    'white':   dict(mono=WHITE),
}

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')
FONTS = os.path.join(HERE, '..', '..', 'fonts')


def f(v):
    if abs(v) < 0.005:
        return '0'
    s = ('%.2f' % v).rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s


def aff(m, p):
    a, b, c, d, e, g = m
    return (a * p[0] + c * p[1] + e, b * p[0] + d * p[1] + g)


def circle_d(cx, cy, r):
    return f'M{f(cx - r)} {f(cy)}A{f(r)} {f(r)} 0 1 0 {f(cx + r)} {f(cy)}A{f(r)} {f(r)} 0 1 0 {f(cx - r)} {f(cy)}Z'


# ============================================================== fonts: instance the brand woff2 once
def font(name, wght, opsz):
    p = os.path.join(SRC, name)
    if not os.path.exists(p):
        vf = TTFont(os.path.join(FONTS, 'bricolage-a24454f0.woff2'))   # Bricolage Grotesque, latin subset
        inst = instancer.instantiateVariableFont(vf, dict(wght=wght, opsz=opsz),
                                                 overlap=instancer.OverlapMode.REMOVE)   # merge overlapping contours
        inst.flavor = None
        os.makedirs(SRC, exist_ok=True)
        inst.save(p)
    tt = TTFont(p)
    return dict(gs=tt.getGlyphSet(), order=tt.getGlyphOrder(), hb=hb.Font(hb.Face(hb.Blob.from_file_path(p))))


RING_FONT = font('bric800o24.ttf', 800, 24)   # small optical size: open, sturdy capitals for the ring
WORD_FONT = font('bric800o48.ttf', 800, 48)   # wordmark
CAP = 660


def shape(F, text):
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(F['hb'], buf, {'kern': True, 'liga': True})
    return [(F['order'][g.codepoint], p.x_advance) for g, p in zip(buf.glyph_infos, buf.glyph_positions)]


def glyph(F, name, m):
    pen = SVGPathPen(F['gs'], ntos=f)
    F['gs'][name].draw(TransformPen(pen, m))
    return pen.getCommands()


def ink_box(F, name):
    bp = BoundsPen(F['gs']); F['gs'][name].draw(bp); return bp.bounds


# ============================================================== the spinning top
class Top:
    """The spinning top, upright in its own units (y grows downward, as in SVG):
    rim    = the painted band, vertical sides, from y = -rim to y = 0, full width 2w
    dome   = the shoulder, rising from the rim to the neck of the handle (a cubic curve each side)
    body   = two gently bulging sides meeting in a softened point `drop` below the rim
    handle = a round-ended peg standing on the shoulder"""

    def __init__(self, T):
        self.T = T

    def segs(self, with_handle=False):
        T = self.T; w, rim, dome, neck = T['w'], T['rim'], T['dome'], T['neck']
        k1, k2, drop, bulge, tip = T['k1'], T['k2'], T['drop'], T['bulge'], T['tip']
        st = T.get('step', 0); wd = w - st                           # shoulder and body start inside the rim
        yt = -rim - dome
        L = math.hypot(wd, drop); ux, uy = -wd / L, drop / L        # chord direction, body corner -> tip
        nx, ny = drop / L, wd / L                                   # outward normal of the right side
        tpx, tpy = -ux * tip, drop - uy * tip                       # where the right side hands over to the tip
        mx, my = (wd + tpx) / 2 + nx * bulge, tpy / 2 + ny * bulge
        s = [('M', (-w, 0)), ('L', (-w, -rim))] + ([('L', (-wd, -rim))] if st else []) + [
             ('C', (-wd, -rim - dome * k1), (-(neck + (wd - neck) * k2), yt), (-neck, yt))]
        if with_handle:                                            # one outline: body and handle as one shape
            hw = T['handle_w'] / 2; top = yt - T['handle_h']
            s += [('L', (-hw, yt)), ('L', (-hw, top + hw)), ('A', hw, (hw, top + hw)), ('L', (hw, yt))]
        s += [('L', (neck, yt)),
              ('C', (neck + (wd - neck) * k2, yt), (wd, -rim - dome * k1), (wd, -rim)),
             ] + ([('L', (w, -rim))] if st else []) + [('L', (w, 0))] + ([('L', (wd, 0))] if st else []) + [
              ('Q', (mx, my), (tpx, tpy)),
              ('Q', (0, drop), (-tpx, tpy)),
              ('Q', (-mx, my), (-wd, 0)),
              ('Z',)]
        return s

    def band_segs(self, bridge=0.0):
        w, rim = self.T['w'], self.T['rim']; x = w * (1 - bridge)
        return [('M', (-x, -rim)), ('L', (x, -rim)), ('L', (x, 0)), ('L', (-x, 0)), ('Z',)]

    def mono_d(self, m):
        """one-colour top: silhouette plus the band as a stencil stripe (for even-odd knockouts)"""
        return self.d(self.segs(True), m) + self.d(self.band_segs(self.T['bridge']), m)

    def handle_segs(self):
        T = self.T; hw = T['handle_w'] / 2; yt = -T['rim'] - T['dome']
        base = yt + T['dome'] * 0.5; top = yt - T['handle_h']        # starts inside the shoulder: no seam
        return [('M', (-hw, base)), ('L', (-hw, top + hw)), ('A', hw, (hw, top + hw)), ('L', (hw, base)), ('Z',)]

    @staticmethod
    def d(segs, m):
        """path data of segs under affine m (uniform scale + rotation + translation)"""
        k = math.sqrt(abs(m[0] * m[3] - m[1] * m[2])); out = []
        for sg in segs:
            if sg[0] == 'Z':
                out.append('Z')
            elif sg[0] == 'A':
                x, y = aff(m, sg[2]); out.append(f'A{f(k * sg[1])} {f(k * sg[1])} 0 0 1 {f(x)} {f(y)}')
            else:
                out.append(sg[0] + ' '.join(f'{f(x)} {f(y)}' for x, y in (aff(m, p) for p in sg[1:])))
        return ''.join(out)

    def outline_points(self, n=24):
        pts, cur = [], None
        for sg in self.segs(with_handle=True):
            if sg[0] in 'ML':
                cur = sg[1]; pts.append(cur)
            elif sg[0] == 'A':
                r = sg[1]; cx, cy = (cur[0] + sg[2][0]) / 2, cur[1]
                pts += [(cx - r * math.cos(math.radians(a)), cy - r * math.sin(math.radians(a))) for a in range(0, 181, 6)]
                cur = sg[2]
            elif sg[0] == 'Q':
                (cx, cy), (ex, ey) = sg[1], sg[2]
                for i in range(1, n + 1):
                    t = i / n
                    pts.append(((1-t)**2*cur[0] + 2*(1-t)*t*cx + t*t*ex, (1-t)**2*cur[1] + 2*(1-t)*t*cy + t*t*ey))
                cur = (ex, ey)
            elif sg[0] == 'C':
                (ax, ay), (bx, by), (ex, ey) = sg[1], sg[2], sg[3]
                for i in range(1, n + 1):
                    t = i / n; u = 1 - t
                    pts.append((u**3*cur[0] + 3*u*u*t*ax + 3*u*t*t*bx + t**3*ex, u**3*cur[1] + 3*u*u*t*ay + 3*u*t*t*by + t**3*ey))
                cur = (ex, ey)
        return pts

    def place(self, cx, cy, radius, fill):
        """affine that puts the (tilted) top in a circle: its farthest point at fill x radius from (cx, cy)"""
        th = math.radians(self.T['tilt']); c, s = math.cos(th), math.sin(th)
        rot = [(p[0] * c - p[1] * s, p[0] * s + p[1] * c) for p in self.outline_points()]
        xs = [p[0] for p in rot]; ys = [p[1] for p in rot]
        bbc = ((min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2)
        A = Cx = Cy = 0.0                                            # centroid of the whole silhouette
        for (x0, y0), (x1, y1) in zip(rot, rot[1:] + rot[:1]):
            k = x0 * y1 - x1 * y0; A += k; Cx += (x0 + x1) * k; Cy += (y0 + y1) * k
        cen = (Cx / (3 * A), Cy / (3 * A))
        m = self.T['centre']
        ax, ay = bbc[0] * (1 - m) + cen[0] * m, bbc[1] * (1 - m) + cen[1] * m
        far = max(math.hypot(x - ax, y - ay) for x, y in rot)
        k = fill * radius / far
        return (k * c, k * s, -k * s, k * c, cx - k * ax, cy - k * ay)

    def place_box(self, x0, y0, x1, y1):
        """affine that fits the tilted top, as large as possible, centred in the box (x0,y0)-(x1,y1)"""
        th = math.radians(self.T['tilt']); c, s = math.cos(th), math.sin(th)
        rot = [(p[0] * c - p[1] * s, p[0] * s + p[1] * c) for p in self.outline_points()]
        xs = [p[0] for p in rot]; ys = [p[1] for p in rot]
        k = min((x1 - x0) / (max(xs) - min(xs)), (y1 - y0) / (max(ys) - min(ys)))
        ax, ay = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
        return (k * c, k * s, -k * s, k * c, (x0 + x1) / 2 - k * ax, (y0 + y1) / 2 - k * ay)

    def paint(self, sc, m, handle_class=''):
        hc = f' class="{handle_class}"' if handle_class else ''
        return (f'<path{hc} fill="{sc["handle"]}" d="{self.d(self.handle_segs(), m)}"/>'
                f'<path fill="{sc["body"]}" d="{self.d(self.segs(), m)}"/>'
                f'<path fill="{sc["band"]}" d="{self.d(self.band_segs(), m)}"/>')


# ============================================================== lettering on a circle
def arc_text(text, cap, r_base, where, track, space, cx=0.0, cy=0.0, k=1.0):
    """top: letters stand on circle r_base, reading clockwise, tops outward.
       bottom: letters hang from circle r_base (their baseline), reading left to right, tops inward.
       Spacing is measured at mid-cap radius, so letters look evenly spaced on the curve.
       Output is baked into final coordinates: centre (cx, cy), scale k."""
    s = cap / CAP
    g = [(n, (space if n == 'space' else a) + track) for n, a in shape(RING_FONT, text)]
    total = sum(w for _, w in g) - track
    r_mid = r_base + cap / 2 if where == 'top' else r_base - cap / 2
    T = total * s / r_mid
    out, cum = [], 0.0
    for n, w in g:
        adv = w - track
        if n != 'space':
            x0, _, x1, _ = ink_box(RING_FONT, n)
            gx = (x0 + x1) / 2                          # centre each letter on its ink
            mid = (cum + adv / 2) * s / r_mid
            if where == 'top':
                th = -T / 2 + mid
                tx, ty, ux, uy = math.cos(th), math.sin(th), math.sin(th), -math.cos(th)
            else:
                th = math.pi + T / 2 - mid
                tx, ty, ux, uy = -math.cos(th), -math.sin(th), -math.sin(th), math.cos(th)
            P = (r_base * math.sin(th), -r_base * math.cos(th))
            m = (k * s * tx, k * s * ty, k * s * ux, k * s * uy,
                 cx + k * (P[0] - s * gx * tx), cy + k * (P[1] - s * gx * ty))
            out.append(glyph(RING_FONT, n, m))
        cum += w
    return ''.join(out), math.degrees(T)


def seal(sc, cx=0.0, cy=0.0, k=1.0, S=SEAL, T=TOP):
    """the full seal (disc, ring lettering, two balls, top), centred on (cx, cy), radius S['R']*k"""
    R, cap, edge = S['R'], S['cap'], S['edge']
    r_out = R - edge; r_in = r_out - cap; r_mid = (r_in + r_out) / 2
    d1, T1 = arc_text('PLAY BEFORE', cap, r_in, 'top', S['track'], S['space'], cx, cy, k)
    d2, T2 = arc_text('PIXELS', cap, r_out, 'bottom', S['track'], S['space'], cx, cy, k)
    gap_c = math.radians((T1 / 2 + 180 - T2 / 2) / 2)          # each ball sits in the middle of its gap
    balls = [(cx + k * sx * r_mid * math.sin(gap_c), cy - k * r_mid * math.cos(gap_c), k * S['dot_r']) for sx in (1, -1)]
    top = Top(T); m = top.place(cx, cy + S['top_dy'] * k, (r_in - S['inner']) * k, S['top_fill'])
    if 'mono' in sc:                                             # one path, even-odd: every part is a hole in the disc
        d = circle_d(cx, cy, R * k) + d1 + d2 + ''.join(circle_d(*b) for b in balls) + top.mono_d(m)
        return f'<path fill="{sc["mono"]}" fill-rule="evenodd" d="{d}"/>'
    return (f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(R * k)}" fill="{sc["disc"]}"/>'
            f'<path fill="{sc["letters"]}" d="{d1}{d2}"/>'
            + ''.join(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{sc["ball"]}"/>' for x, y, r in balls)
            + top.paint(sc, m))


def seal_small(sc, cx, cy, r, T=TOP, fill=None):
    """the small seal: disc + top, no lettering (header lockup, small avatars, embroidery under 40 mm)"""
    fill = fill or LOCKUP['top_fill']
    top = Top(T); m = top.place(cx, cy, r, fill)
    if 'mono' in sc:
        return f'<path fill="{sc["mono"]}" fill-rule="evenodd" d="{circle_d(cx, cy, r)}{top.mono_d(m)}"/>'
    return f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="{sc["disc"]}"/>' + top.paint(sc, m)


# ============================================================== wordmark
def straight_y(m, adv):
    """A plain, unmistakable y, hand-built from Bricolage's own v: the v's right stroke carries on below the
    baseline at the same slope, as thick as the v's arms, and is cut level with the descender of the p.
    The left arm runs on until it meets the tail, as in a classic grotesque y."""
    v = [(173, 0), (6, 527), (182, 527), (279, 129), (290, 129), (389, 527), (556, 527), (389, 0)]   # Bricolage 800 v
    (ox0, oy0), (ox1, oy1) = v[6], v[7]                    # right stroke, outer edge (556,527) -> (389,0)
    k = (ox0 - ox1) / (oy0 - oy1)                           # dx/dy of the strokes
    xo = lambda y: ox1 + k * y                              # tail, right edge
    xi = lambda y: ox1 - WORD['y_tail_w'] + k * y           # tail, left edge (parallel)
    kl = (v[1][0] - v[0][0]) / (v[1][1] - v[0][1])          # left arm, outer edge
    xl = lambda y: v[0][0] + kl * y
    yj = (v[0][0] - (ox1 - WORD['y_tail_w'])) / (k - kl)    # where the left arm meets the tail
    yb = WORD['y_tail']
    pts = v[1:7] + [(xo(yb), yb), (xi(yb), yb), (xl(yj), yj)]
    dx = (adv - (v[6][0] - v[1][0])) / 2 - v[1][0]          # centre the ink in the y's own advance
    q = [aff(m, (x + dx, y)) for x, y in pts]
    return 'M' + 'L'.join(f'{f(x)} {f(y)}' for x, y in q) + 'Z'


def wordmark(text, ox, base, s):
    """one-line wordmark. The i of Pixels trades Bricolage's square dot (a pixel) for a round ball."""
    d, balls, x = [], [], 0.0
    for name, adv in shape(WORD_FONT, text):
        gx = ox + s * x
        m = (s, 0, 0, -s, gx, base)
        if name == 'i':
            d.append(glyph(WORD_FONT, 'dotlessi', m))
            x0, _, x1, _ = ink_box(WORD_FONT, 'dotlessi')
            balls.append((gx + s * (x0 + x1) / 2, base - s * WORD['ball_y'], s * WORD['ball_r']))
        elif name == 'y' and WORD['straight_y']:
            d.append(straight_y(m, adv))
        elif name != 'space':
            d.append(glyph(WORD_FONT, name, m))
        x += adv + WORD['track']
    return ''.join(d), balls, s * (x - WORD['track'])


# ============================================================== SVG files
def doc(vb, body, title, w=None, h=None, style=''):
    x0, y0, W, H = vb
    k = 1000 / max(W, H)
    w = w or round(W * k); h = h or round(H * k)
    st = f'<style>{style}</style>' if style else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x0)} {f(y0)} {f(W)} {f(H)}" width="{w}" height="{h}" '
            f'role="img" aria-label="{title}"><title>{title}</title>{st}{body}</svg>\n')


def symbol_svg(scheme):
    R = SEAL['R']
    return doc((-R, -R, 2 * R, 2 * R), seal(SCHEMES[scheme]), 'Play Before Pixels')


def lockup_parts(scheme):
    """horizontal lockup for the site header: the small seal (no ring words) + one-line wordmark.
    Units: wordmark font units at scale 1 (cap height 660); baseline y = 0."""
    sc = SCHEMES[scheme]
    D = LOCKUP['disc'] * CAP; r = D / 2
    cy = -CAP / 2 - LOCKUP['lift'] * CAP
    body = seal_small(sc, r, cy, r)
    tx = D + LOCKUP['gap'] * CAP
    d, balls, w = wordmark('Play Before Pixels', tx, 0, 1.0)
    word = sc.get('mono') or sc['word']; ib = sc.get('mono') or sc['iball']
    body += f'<path fill="{word}" d="{d}"/>' + ''.join(
        f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(rr)}" fill="{ib}"/>' for x, y, rr in balls)
    top_y = min(cy - r, -744); bot_y = max(cy + r, 190)
    return body, (0, top_y, tx + w, bot_y - top_y), D


def lockup(scheme):
    body, (x0, y0, W, H), D = lockup_parts(scheme)
    p = 0.25 * D                                  # clear space: a quarter of the small seal all round
    return doc((x0 - p, y0 - p, W + 2 * p, H + 2 * p), body, 'Play Before Pixels')


def favicon_svg():
    """16-32 px: the top alone, heavy cut, standing upright on a 16-px grid (crisp band, no blur).
    Ink handle in light tabs, paper handle in dark tabs (the SVG follows the browser's colour scheme)."""
    top = Top(FAV_TOP)
    body = top.paint(dict(SCHEMES['color'], handle=INK), (1, 0, 0, 1, 500, FAV['y_rim']), handle_class='h')
    return doc((0, 0, 1000, 1000), body, 'Play Before Pixels', w=32, h=32,
               style='@media (prefers-color-scheme:dark){.h{fill:#FFFFFF}}')


def build():
    files = {}
    for scheme in ('color', 'reverse', 'black', 'white'):
        suf = '' if scheme == 'color' else '-' + scheme
        files[f'symbol{suf}.svg'] = symbol_svg(scheme)
        files[f'primary-logo{suf}.svg'] = lockup(scheme)
        files[f'symbol-small{suf}.svg'] = doc((-500, -500, 1000, 1000), seal_small(SCHEMES[scheme], 0, 0, 500), 'Play Before Pixels')
    files['favicon.svg'] = favicon_svg()
    files['src/avatar-1080.svg'] = doc((-540, -540, 1080, 1080),
                                       f'<rect x="-540" y="-540" width="1080" height="1080" fill="{INK}"/>' + seal(SCHEMES['color']),
                                       'Play Before Pixels')
    for n, c in files.items():
        with open(os.path.join(HERE, n), 'w') as fh:
            fh.write(c)
    print('wrote', len(files), 'files')


if __name__ == '__main__':
    build()
