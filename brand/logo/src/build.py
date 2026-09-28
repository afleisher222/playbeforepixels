"""Play Before Pixels - logo kit v2, "The Maker's Seal". Builds every SVG in brand/logo/ from the numbers below.

A round maker's seal, like the stamp pressed into the bottom of a good wooden toy: the full name runs around
the ring and a spinning top stands in the middle. Every SVG is generated from geometry plus the outlines of
Bricolage Grotesque (the brand's own SIL-OFL font, instanced from brand/fonts/*.woff2). No <text>, no raster
images, no system fonts, no transforms, masks or clip paths: every file is plain filled paths, so it opens
cleanly in embroidery, vinyl-cutting and print software.

REBUILD EVERYTHING (SVGs, PNGs, favicon.ico, guidelines PDF, blind-test pages) with one command:
    bash brand/logo/src/rebuild.sh
Or step by step, from brand/logo/src/:
    python3 build.py            # SVGs + jobs.json, then prints the smallest gaps at every size
    python3 guide.py            # logo-guidelines.html, og page, blind-test pages
    node raster.js jobs.json    # every PNG
    python3 build.py ico        # favicon.ico from the 16/32/48 PNGs
    node ../../render.js pdf ../logo-guidelines.html ../logo-guidelines.pdf

Grown from concept C in brand/logo-concepts-v2/c-badge/ (that folder is kept unchanged as the judged record).

PRIVACY: never put a personal name, an e-mail address or any other personal detail into a <title>, an
aria-label, a comment or metadata in any generated file. The only words in these files are the brand name.
"""
import json, math, os, re, struct, sys

# =====================================================================================================
# FOUNDER EDITS - read this first
# The drawing below was generated with AI help (Claude). Your own recorded choices are what make the final
# drawing yours. For each change: edit the number, run `bash rebuild.sh`, look at the PNGs, add a dated line
# to EDIT_LOG (what changed, from -> to, and why), log the same line in
# legal/protection/creation-records-log.md (section B), and commit that version on its own.
# =====================================================================================================
EDIT_LOG = [
    ('2026-09-28', 'Claude (AI)', 'AI-generated baseline: kit v2 from concept C with the review panel\'s fixes 3-6 '
     '(square tomato favicon peg; TOP dome 165->200, neck 86->70, bulge 22->10, handle_h 210->240; FAV_TOP dome '
     '125->187.5, bulge 14->6; seal minimum 80 px / 16 mm), ring pairs LA +80 and XE +32 (the letters touched), '
     'small-cut wordmark (opsz 14, track 30, space 226), stacked lockup. BAND and TILT left as in concept C '
     '(sun, 8) for the founder to decide.'),
    # ('YYYY-MM-DD', 'founder', 'BAND SUN -> ...: why you chose it'),
    # ('YYYY-MM-DD', 'founder', 'TILT 8 -> ...: why'),
    # ('YYYY-MM-DD', 'founder', 'your own choice, e.g. SEAL cap 96 -> ..., TOP w 430 -> ..., WORD ball_r 94 -> ...'),
]
ADOPTED = False     # set True only when your edits are made AND the parent blind check has passed (logo-notes.md)

# The two edits the review panel asked the founder to make herself before adoption. One value each.
BAND = '#F5B820'    # colour of the top's painted band (sun). Panel: tomato '#EE5A36' - it drops the flag and
                    # store readings a blue top with a yellow band gets, and ties the band to the tomato balls.
TILT = 8            # lean of the top in the seal and small seal, degrees clockwise. Panel: 0 (upright) - one
                    # drawing everywhere, and no "wobbling" or "toppling" readings. The favicon is always upright.
# Then make at least one choice of your own: for example SEAL['cap'], TOP['w'] or WORD['ball_r'] below.

# ============================================================== TUNABLE (every number that shapes the logo)
SEAL = dict(
    R=500,          # seal radius (every unit below is relative to this)
    cap=96,         # cap height of the ring lettering
    edge=56,        # clear space between the seal's edge and the letters
    inner=40,       # clear space between the letters and the top
    track=50,       # extra letter spacing on the ring, in font units (1000 = one em)
    space=250,      # width of the word space in "PLAY BEFORE", font units
    pairs={'LA': 80, 'XE': 32},  # extra space for single pairs (font units). On the top arc the letters' feet
                    # converge (L's foot met A's foot) and on the bottom arc their tops do (X met E): each
                    # pair now keeps the ~10-unit gap the other pairs have, without splitting the words
    dot_r=29,       # radius of the two balls between the words
    top_fill=0.82,  # how much of the free middle the top fills (1.0 = touches the clear space)
    top_dy=0,       # optical nudge of the top (units, + = down)
)
TOP = dict(         # the spinning top, drawn upright in its own units (see class Top), then leaned by TILT
    tilt=TILT,
    w=430,          # half-width at the rim
    rim=104,        # height of the painted rim band
    dome=200,       # height of the shoulder above the rim (a round shoulder: a gem has a flat top)
    neck=70,        # half-width where the shoulder meets the peg
    k1=0.55,        # shoulder: how long it stays upright at the rim (0-1)
    k2=0.35,        # shoulder: how flat it runs into the neck (0-1)
    step=0,         # how far the painted rim sticks out past the shoulder and the body (a flange)
    drop=450,       # depth of the body below the rim, to the tip
    bulge=10,       # outward bulge of the body's sides (0 = straight cone)
    tip=30,         # softening of the tip
    handle_w=112,   # peg width
    handle_h=240,   # peg height above the shoulder (a long peg: pins, gems and shields have no stem)
    centre=0.5,     # 0 = centre by bounding box, 1 = centre by the body's weight
    bridge=0.13,    # one-colour files: the band is cut as a stripe that stops this far (x w) short of each edge
)
# Favicon cut: the same top standing upright on a 16-px grid (1 px = 62.5 units), so the band, the rim and
# the peg land on whole pixels at 16 and 32 px.
FAV_TOP = dict(TOP, tilt=0, w=437.5, rim=187.5, dome=187.5, neck=100, drop=406.25, bulge=6, tip=40)
FAV = dict(
    px=62.5,        # one pixel of a 16-px favicon, in units of the 1000-unit square
    y_rim=9,        # the rim's lower edge, in pixels from the top: the band covers rows 6, 7 and 8
    peg_w=2,        # peg width in pixels (square-topped, on whole pixels: no grey half-pixel smudge)
    peg_top=1,      # peg top, in pixels from the top
    peg_base=5,     # peg foot (hidden inside the shoulder), in pixels from the top
    peg=None,       # peg colour: None = tomato (3.4:1 on a white tab, 4.7:1 on a #202124 dark tab)
)
WORD = dict(        # the one-line wordmark (Bricolage Grotesque 800, optical size 48)
    opsz=48,
    track=-6,       # letter spacing (font units)
    space=None,     # word space (None = the font's own)
    straight_y=True,  # draw "y" as a v with a straight tail (Bricolage's own y reads as a u: "Plau")
    y_tail=None,    # where that tail is cut (None = level with the p's descender)
    y_tail_w=160,   # tail thickness, measured across (font units)
    ball_r=94,      # the round ball that replaces Bricolage's square dot on the i of "Pixels"
    ball_y=650,     # height of that ball's centre above the baseline (font units)
)
# Small cut of the wordmark (spines, labels, anything under about 25 mm wide): Bricolage's own small optical
# size with more air, so the heavy letters do not fill in (recipe from concept A).
WORD_SMALL = dict(WORD, opsz=14, track=30, space=226)
LOCKUP = dict(      # horizontal lockup: small seal + one-line wordmark
    disc=1.80,      # small seal diameter, as a multiple of the wordmark's cap height
    gap=0.48,       # space between small seal and wordmark, x cap height
    top_fill=0.70,  # how much of the small seal the top fills
    lift=0.0,       # raise the small seal against the cap height (x cap height)
)
STACK = dict(       # stacked lockup: small seal above "Play / Before / Pixels" (tote fronts, sticker sheets)
    disc=2.30,      # small seal diameter, x cap height
    gap=0.42,       # space between the seal and the first line's tallest letter, x cap height
    leading=990,    # baseline to baseline (font units)
)
STICKER = dict(border=46)   # white die-cut border around the seal (units of the 500-radius seal)

# ============================================================== palette (brand/BRAND.md)
INK, PAPER, WASH, TOMATO, SUN, SKY = '#1D2940', '#FFFFFF', '#F3F6FB', '#EE5A36', '#F5B820', '#3D86D8'
SUN_T, TOMATO_T, SKY_T = '#FEF4D8', '#FDE9E3', '#E3EEFA'
BLACK, WHITE = '#000000', '#FFFFFF'
NAMES = {INK: 'ink', PAPER: 'paper', TOMATO: 'tomato', SUN: 'sun', SKY: 'sky', BLACK: 'black', WHITE: 'white'}

# what each part is painted with. mono=<colour> makes a one-colour file: one even-odd path, everything else
# knocked out (true holes), ready for embroidery, vinyl and rubber stamps.
SCHEMES = {
    'color':   dict(disc=INK,   letters=PAPER, ball=TOMATO, body=SKY, band=BAND, handle=PAPER, word=INK,   iball=TOMATO),
    'reverse': dict(disc=PAPER, letters=INK,   ball=TOMATO, body=SKY, band=BAND, handle=INK,   word=PAPER, iball=TOMATO),
    'black':   dict(mono=BLACK),
    'white':   dict(mono=WHITE),
}
SUFFIX = {'color': '', 'reverse': '-reverse', 'black': '-black', 'white': '-white'}

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)                         # brand/logo/
FONTS = os.path.join(OUT, '..', 'fonts')
TITLE = 'Play Before Pixels'


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
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.basePen import BasePen
from fontTools.pens.recordingPen import RecordingPen


def font(wght, opsz):
    p = os.path.join(HERE, f'bric{wght}o{opsz}.ttf')
    if not os.path.exists(p):
        vf = TTFont(os.path.join(FONTS, 'bricolage-a24454f0.woff2'))   # Bricolage Grotesque, latin subset
        inst = instancer.instantiateVariableFont(vf, dict(wght=wght, opsz=opsz),
                                                 overlap=instancer.OverlapMode.REMOVE)   # merge overlapping contours
        inst.flavor = None
        inst.save(p)
    tt = TTFont(p)
    return dict(gs=tt.getGlyphSet(), order=tt.getGlyphOrder(), hb=hb.Font(hb.Face(hb.Blob.from_file_path(p))),
                space=tt['hmtx']['space'][0])


RING_FONT = font(800, 24)            # small optical size: open, sturdy capitals for the ring
if not os.path.exists(os.path.join(HERE, 'bric800.ttf')):   # Bricolage 800 / opsz 96: not used by the logo, but
    font(800, 96); os.replace(os.path.join(HERE, 'bric800o96.ttf'), os.path.join(HERE, 'bric800.ttf'))
    # products/merch-core/build/textpath.py reads it from here, so keep it
WORD_FONTS = {}
CAP = 660


def word_font(W):
    if W['opsz'] not in WORD_FONTS:
        WORD_FONTS[W['opsz']] = font(800, W['opsz'])
    return WORD_FONTS[W['opsz']]


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


class FlatPen(BasePen):
    """glyph outline as flat point lists (only used to measure gaps)"""
    def __init__(self, gs, steps=10):
        super().__init__(gs); self.steps = steps; self.contours = []; self._c = None

    def _moveTo(self, p): self._c = [p]
    def _lineTo(self, p): self._c.append(p)

    def _curveToOne(self, a, b, c):
        p0 = self._getCurrentPoint()
        for i in range(1, self.steps + 1):
            t = i / self.steps; u = 1 - t
            self._c.append(tuple(u**3 * p0[k] + 3*u*u*t * a[k] + 3*u*t*t * b[k] + t**3 * c[k] for k in (0, 1)))

    def _qCurveToOne(self, a, b):
        p0 = self._getCurrentPoint()
        for i in range(1, self.steps + 1):
            t = i / self.steps; u = 1 - t
            self._c.append(tuple(u*u * p0[k] + 2*u*t * a[k] + t*t * b[k] for k in (0, 1)))

    def _closePath(self):
        if self._c: self.contours.append(self._c)
        self._c = None
    _endPath = _closePath


def glyph_contours(F, name, m):
    pen = FlatPen(F['gs']); F['gs'][name].draw(TransformPen(pen, m)); return pen.contours


# ============================================================== the spinning top
class Top:
    """The spinning top, upright in its own units (y grows downward, as in SVG):
    rim    = the painted band, vertical sides, from y = -rim to y = 0, full width 2w
    dome   = the round shoulder, rising from the rim to the neck of the peg (a cubic curve each side)
    body   = two gently bulging sides meeting in a softened point `drop` below the rim
    handle = a round-ended peg standing on the shoulder (the favicon draws its own square peg)
    Never faceted, never four-sided, never a face, letters, motion lines or a swoosh on it."""

    def __init__(self, T):
        self.T = T

    def segs(self, with_handle=False):
        T = self.T; w, rim, dome, neck = T['w'], T['rim'], T['dome'], T['neck']
        k1, k2, drop, bulge, tip = T['k1'], T['k2'], T['drop'], T['bulge'], T['tip']
        st = T.get('step', 0); wd = w - st
        yt = -rim - dome
        L = math.hypot(wd, drop); ux, uy = -wd / L, drop / L        # chord direction, body corner -> tip
        nx, ny = drop / L, wd / L                                   # outward normal of the right side
        tpx, tpy = -ux * tip, drop - uy * tip                       # where the right side hands over to the tip
        mx, my = (wd + tpx) / 2 + nx * bulge, tpy / 2 + ny * bulge
        s = [('M', (-w, 0)), ('L', (-w, -rim))] + ([('L', (-wd, -rim))] if st else []) + [
             ('C', (-wd, -rim - dome * k1), (-(neck + (wd - neck) * k2), yt), (-neck, yt))]
        if with_handle:                                            # one outline: body and peg as one shape
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

    def outline_points(self, n=24, with_handle=True):
        pts, cur = [], None
        for sg in self.segs(with_handle=with_handle):
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
        """affine that puts the (leaning) top in a circle: its farthest point at fill x radius from (cx, cy)"""
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

    def paint(self, sc, m):
        return (f'<path fill="{sc["handle"]}" d="{self.d(self.handle_segs(), m)}"/>'
                f'<path fill="{sc["body"]}" d="{self.d(self.segs(), m)}"/>'
                f'<path fill="{sc["band"]}" d="{self.d(self.band_segs(), m)}"/>')


# ============================================================== lettering on a circle
def arc_text(text, cap, r_base, where, track, space, cx=0.0, cy=0.0, k=1.0, contours=None, pairs=None):
    """top: letters stand on circle r_base, reading clockwise, tops outward.
       bottom: letters hang from circle r_base (their baseline), reading left to right, tops inward.
       Spacing is measured at mid-cap radius, so letters look evenly spaced on the curve.
       Output is baked into final coordinates: centre (cx, cy), scale k."""
    s = cap / CAP
    sh = shape(RING_FONT, text); pairs = pairs or {}
    g = [(n, space if n == 'space' else a, pairs.get(n + (sh[i + 1][0] if i + 1 < len(sh) else ''), 0))
         for i, (n, a) in enumerate(sh)]                   # (glyph, advance, extra space after it)
    total = sum(a + track + e for _, a, e in g) - track - g[-1][2]
    r_mid = r_base + cap / 2 if where == 'top' else r_base - cap / 2
    T = total * s / r_mid
    out, cum = [], 0.0
    for n, adv, extra in g:
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
            if contours is not None:
                contours.append((n, glyph_contours(RING_FONT, n, m)))
        cum += adv + track + extra
    return ''.join(out), math.degrees(T)


def seal_geometry(cx=0.0, cy=0.0, k=1.0, S=SEAL, T=TOP, letters=None):
    R, cap, edge = S['R'], S['cap'], S['edge']
    r_out = R - edge; r_in = r_out - cap; r_mid = (r_in + r_out) / 2
    top_c, bot_c = [], []
    d1, T1 = arc_text('PLAY BEFORE', cap, r_in, 'top', S['track'], S['space'], cx, cy, k, top_c, S.get('pairs'))
    d2, T2 = arc_text('PIXELS', cap, r_out, 'bottom', S['track'], S['space'], cx, cy, k, bot_c, S.get('pairs'))
    if letters is not None:
        letters += [top_c, bot_c]
    gap_c = math.radians((T1 / 2 + 180 - T2 / 2) / 2)          # each ball sits in the middle of its gap
    balls = [(cx + k * sx * r_mid * math.sin(gap_c), cy - k * r_mid * math.cos(gap_c), k * S['dot_r']) for sx in (1, -1)]
    top = Top(T); m = top.place(cx, cy + S['top_dy'] * k, (r_in - S['inner']) * k, S['top_fill'])
    return d1, d2, balls, top, m


def seal(sc, cx=0.0, cy=0.0, k=1.0, S=SEAL, T=TOP):
    """the seal (disc, ring lettering, two balls, top), centred on (cx, cy), radius S['R']*k"""
    R = S['R']
    d1, d2, balls, top, m = seal_geometry(cx, cy, k, S, T)
    if 'mono' in sc:                                             # one path, even-odd: every part is a hole in the disc
        d = circle_d(cx, cy, R * k) + d1 + d2 + ''.join(circle_d(*b) for b in balls) + top.mono_d(m)
        return f'<path fill="{sc["mono"]}" fill-rule="evenodd" d="{d}"/>'
    return (f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(R * k)}" fill="{sc["disc"]}"/>'
            f'<path fill="{sc["letters"]}" d="{d1}{d2}"/>'
            + ''.join(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{sc["ball"]}"/>' for x, y, r in balls)
            + top.paint(sc, m))


def seal_small(sc, cx, cy, r, T=TOP, fill=None):
    """the small seal: disc + top, no lettering (lockups, avatars, anything under 80 px or 16 mm)"""
    fill = fill or LOCKUP['top_fill']
    top = Top(T); m = top.place(cx, cy, r, fill)
    if 'mono' in sc:
        return f'<path fill="{sc["mono"]}" fill-rule="evenodd" d="{circle_d(cx, cy, r)}{top.mono_d(m)}"/>'
    return f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="{sc["disc"]}"/>' + top.paint(sc, m)


# ============================================================== wordmark
def straight_y(F, W, m, adv):
    """A plain, unmistakable y, hand-built from Bricolage's own v: the v's right stroke carries on below the
    baseline at the same slope, as thick as the v's arms, and is cut level with the descender of the p.
    The left arm runs on until it meets the tail, as in a classic grotesque y."""
    rp = RecordingPen(); F['gs']['v'].draw(rp)
    v = [a[0] for op, a in rp.value if op in ('moveTo', 'lineTo')]
    assert len(v) == 8, 'the v of this font is not the 8-point polygon straight_y expects'
    (ox0, oy0), (ox1, oy1) = v[6], v[7]                    # right stroke, outer edge (top right -> bottom right)
    k = (ox0 - ox1) / (oy0 - oy1)                           # dx/dy of the strokes
    xo = lambda y: ox1 + k * y                              # tail, right edge
    xi = lambda y: ox1 - W['y_tail_w'] + k * y              # tail, left edge (parallel)
    kl = (v[1][0] - v[0][0]) / (v[1][1] - v[0][1])          # left arm, outer edge
    xl = lambda y: v[0][0] + kl * y
    yj = (v[0][0] - (ox1 - W['y_tail_w'])) / (k - kl)       # where the left arm meets the tail
    yb = W['y_tail'] if W['y_tail'] is not None else ink_box(F, 'p')[1]
    pts = v[1:7] + [(xo(yb), yb), (xi(yb), yb), (xl(yj), yj)]
    dx = (adv - (v[6][0] - v[1][0])) / 2 - v[1][0]          # centre the ink in the y's own advance
    return [(x + dx, y) for x, y in pts]


def wordmark(text, ox, base, s, W=WORD):
    """one-line wordmark -> (path d, balls, advance width, (ink x0, ink x1, ink top y, ink bottom y)).
    The i of Pixels trades Bricolage's square dot (a pixel) for a round ball."""
    F = word_font(W)
    d, balls, x = [], [], 0.0
    xs, ys = [], []
    for name, adv in shape(F, text):
        if name == 'space' and W['space'] is not None:
            adv = W['space']
        gx = ox + s * x
        m = (s, 0, 0, -s, gx, base)
        if name == 'i':
            d.append(glyph(F, 'dotlessi', m))
            x0, y0, x1, y1 = ink_box(F, 'dotlessi')
            bx, by, br = gx + s * (x0 + x1) / 2, base - s * W['ball_y'], s * W['ball_r']
            balls.append((bx, by, br))
            xs += [gx + s * x0, gx + s * x1]; ys += [base - s * y0, by - br]
        elif name == 'y' and W['straight_y']:
            pts = straight_y(F, W, m, adv)
            q = [aff(m, p) for p in pts]
            d.append('M' + 'L'.join(f'{f(px)} {f(py)}' for px, py in q) + 'Z')
            xs += [p[0] for p in q]; ys += [p[1] for p in q]
        elif name != 'space':
            d.append(glyph(F, name, m))
            x0, y0, x1, y1 = ink_box(F, name)
            xs += [gx + s * x0, gx + s * x1]; ys += [base - s * y0, base - s * y1]
        x += adv + W['track']
    return ''.join(d), balls, s * (x - W['track']), (min(xs), max(xs), min(ys), max(ys))


def word_paint(sc, d, balls):
    word = sc.get('mono') or sc['word']; ib = sc.get('mono') or sc['iball']
    return f'<path fill="{word}" d="{d}"/>' + ''.join(
        f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{ib}"/>' for x, y, r in balls)


# ============================================================== SVG files
def doc(vb, body, w=None, h=None, style=''):
    x0, y0, W, H = vb
    k = 1000 / max(W, H)
    w = w or round(W * k); h = h or round(H * k)
    st = f'<style>{style}</style>' if style else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x0)} {f(y0)} {f(W)} {f(H)}" width="{w}" height="{h}" '
            f'role="img" aria-label="{TITLE}"><title>{TITLE}</title>{st}{body}</svg>\n')


PAD = 8   # hairline margin in every tight-cropped file, so anti-aliased edges are never clipped


def mark_svg(scheme):
    R = SEAL['R']; p = PAD
    return doc((-R - p, -R - p, 2 * (R + p), 2 * (R + p)), seal(SCHEMES[scheme]))


def mark_small_svg(scheme):
    R = SEAL['R']; p = PAD
    return doc((-R - p, -R - p, 2 * (R + p), 2 * (R + p)), seal_small(SCHEMES[scheme], 0, 0, R))


def sticker_svg():
    R = SEAL['R']; b = STICKER['border']; p = PAD
    body = f'<circle cx="0" cy="0" r="{f(R + b)}" fill="{PAPER}"/>' + seal(SCHEMES['color'])
    return doc((-R - b - p, -R - b - p, 2 * (R + b + p), 2 * (R + b + p)), body)


def wordmark_parts(scheme, W=WORD):
    d, balls, adv, (x0, x1, y0, y1) = wordmark(TITLE, 0, 0, 1.0, W)
    return word_paint(SCHEMES[scheme], d, balls), (x0, y0, x1 - x0, y1 - y0)


def wordmark_svg(scheme, W=WORD):
    body, (x0, y0, w, h) = wordmark_parts(scheme, W); p = PAD
    return doc((x0 - p, y0 - p, w + 2 * p, h + 2 * p), body)


def lockup_parts(scheme):
    """horizontal lockup: the small seal (no ring words) + one-line wordmark. Units: wordmark font units at
    scale 1 (cap height 660); baseline y = 0."""
    sc = SCHEMES[scheme]
    D = LOCKUP['disc'] * CAP; r = D / 2
    cy = -CAP / 2 - LOCKUP['lift'] * CAP
    body = seal_small(sc, r, cy, r)
    tx = D + LOCKUP['gap'] * CAP
    d, balls, w, (x0, x1, y0, y1) = wordmark(TITLE, tx, 0, 1.0)
    body += word_paint(sc, d, balls)
    top_y = min(cy - r, y0); bot_y = max(cy + r, y1)
    return body, (0, top_y, x1, bot_y - top_y), D


def lockup_svg(scheme):
    body, (x0, y0, W, H), D = lockup_parts(scheme); p = PAD
    return doc((x0 - p, y0 - p, W + 2 * p, H + 2 * p), body)


def stacked_parts(scheme):
    """stacked lockup: small seal centred above 'Play / Before / Pixels', each line centred on its ink"""
    sc = SCHEMES[scheme]
    D = STACK['disc'] * CAP; r = D / 2
    lines = [wordmark(t, 0, 0, 1.0) for t in ('Play', 'Before', 'Pixels')]
    base1 = r + STACK['gap'] * CAP - lines[0][3][2]           # line 1's tallest letter sits `gap` below the seal
    body = seal_small(sc, 0, 0, r, fill=LOCKUP['top_fill'])
    x_lo, x_hi, y_hi = -r, r, base1
    for i, (t, ln) in enumerate(zip(('Play', 'Before', 'Pixels'), lines)):
        x0, x1 = ln[3][0], ln[3][1]
        base = base1 + i * STACK['leading']
        d, balls, _, (a0, a1, b0, b1) = wordmark(t, -(x0 + x1) / 2, base, 1.0)
        body += word_paint(sc, d, balls)
        x_lo, x_hi, y_hi = min(x_lo, a0), max(x_hi, a1), max(y_hi, b1)
    return body, (x_lo, -r, x_hi - x_lo, y_hi + r)


def stacked_svg(scheme):
    body, (x0, y0, W, H) = stacked_parts(scheme); p = PAD
    return doc((x0 - p, y0 - p, W + 2 * p, H + 2 * p), body)


def favicon_body(k=1.0, ox=0.0, oy=0.0):
    """16-48 px: the top alone, upright, on a 16-px grid (crisp band, square peg on whole pixels). The colours are
    fixed (no light/dark switch): every one keeps at least 3.4:1 against a white tab and 4.3:1 against a
    #202124 dark tab, so the icon never disappears, and browsers that ignore colour-scheme rules see the same
    drawing. k, ox, oy place a scaled copy (for the app icon); the favicon itself uses k = 1."""
    px = FAV['px']; sc = SCHEMES['color']
    X = lambda x: f(ox + k * x); Y = lambda y: f(oy + k * y)
    x0 = 500 - FAV['peg_w'] * px / 2; x1 = 500 + FAV['peg_w'] * px / 2
    peg = f'M{X(x0)} {Y(FAV["peg_base"] * px)}V{Y(FAV["peg_top"] * px)}H{X(x1)}V{Y(FAV["peg_base"] * px)}Z'
    top = Top(FAV_TOP); m = (k, 0, 0, k, ox + k * 500, oy + k * FAV['y_rim'] * px)
    return (f'<path fill="{FAV["peg"] or TOMATO}" d="{peg}"/>'
            f'<path fill="{sc["body"]}" d="{top.d(top.segs(), m)}"/>'
            f'<path fill="{sc["band"]}" d="{top.d(top.band_segs(), m)}"/>')


def favicon_svg():
    return doc((0, 0, 1000, 1000), favicon_body(), w=32, h=32)


def tile_svg(bg, inner, size=1000):
    """a square PNG source: background + inner artwork already placed in a 1000 square"""
    return doc((0, 0, size, size), f'<rect width="{size}" height="{size}" fill="{bg}"/>' + inner)


# ============================================================== gap report (runs after every build)
def gap_report():
    """Prints the smallest gaps in the artwork at each minimum size, so an edit that closes a gap shows at once.
    Rough floors: screen 1 px; print knockouts 0.2 mm; embroidery 1 mm between shapes."""
    try:
        from shapely.geometry import LineString, Polygon, Point
        from shapely.ops import unary_union
    except ImportError:
        print('gap report skipped (pip install shapely)'); return {}
    R = SEAL['R']; letters = []
    d1, d2, balls, top, m = seal_geometry(letters=letters)

    def lines(contours):
        return unary_union([LineString(c + [c[0]]) for c in contours])
    rows = {}
    ll = [[lines(c) for _, c in arc] for arc in letters]
    rows['ring: letter to letter'] = min(a.distance(b) for arc in ll for a, b in zip(arc, arc[1:]))
    allpts = [p for arc in letters for _, cs in arc for c in cs for p in c]
    rows['ring: letters to seal edge'] = R - max(math.hypot(*p) for p in allpts)
    tp = Polygon([aff(m, p) for p in top.outline_points()]).buffer(0)
    rows['ring: letters to top'] = min(tp.distance(g) for arc in ll for g in arc)
    rows['ring: ball to letters'] = min(Point(b[0], b[1]).distance(g) - b[2] for b in balls for arc in ll for g in arc)
    k = math.sqrt(abs(m[0] * m[3] - m[1] * m[2]))
    T = TOP
    rows['top: peg to shoulder edge (ledge)'] = (T['neck'] - T['handle_w'] / 2) * k
    rows['top: one-colour band bridge'] = T['w'] * T['bridge'] * k
    rows['top: band height'] = T['rim'] * k
    rows['top: to seal edge'] = R - max(math.hypot(*aff(m, p)) for p in top.outline_points())
    # small seal (same drawing, fill LOCKUP['top_fill'] of the radius)
    ms = Top(TOP).place(0, 0, R, LOCKUP['top_fill']); ks = math.sqrt(abs(ms[0] * ms[3] - ms[1] * ms[2]))
    small = {
        'small seal: peg ledge': (T['neck'] - T['handle_w'] / 2) * ks,
        'small seal: one-colour band bridge': T['w'] * T['bridge'] * ks,
        'small seal: band height': T['rim'] * ks,
        'small seal: peg width': T['handle_w'] * ks,
        'small seal: top to disc edge': R - max(math.hypot(*aff(ms, p)) for p in Top(TOP).outline_points()),
    }
    sizes = [('80 px', 80, 'px'), ('16 mm print', 16, 'mm'), ('50 mm stitched', 50, 'mm')]
    small_sizes = [('16 px', 16, 'px'), ('24 px', 24, 'px'), ('8 mm print', 8, 'mm'), ('20 mm stitched', 20, 'mm')]
    print('\nsmallest gaps (units of the 1000-unit seal, then at each minimum size)')
    for name, v in rows.items():
        print(f'  {name:36s} {v:7.1f} u  ' + '  '.join(f'{lab}: {v * s / 1000:.2f} {u}' for lab, s, u in sizes))
    for name, v in small.items():
        print(f'  {name:36s} {v:7.1f} u  ' + '  '.join(f'{lab}: {v * s / 1000:.2f} {u}' for lab, s, u in small_sizes))
    px = FAV['px']; yt = FAV['y_rim'] * px - FAV_TOP['rim']
    rows_ok = abs(yt / px - round(yt / px)) < 1e-6 and abs(FAV['y_rim'] - round(FAV['y_rim'])) < 1e-6
    print(f'  favicon: band on rows {yt / px:g}-{FAV["y_rim"]:g} (whole pixels: {"yes" if rows_ok else "NO"}), '
          f'peg {FAV["peg_w"]} px wide, top on row {FAV["peg_top"]}, shoulder top on row '
          f'{(FAV["y_rim"] * px - FAV_TOP["rim"] - FAV_TOP["dome"]) / px:g}')
    rows.update(small)
    return rows


# ============================================================== build
def dims(svg_text):
    v = re.search(r'viewBox="([^"]+)"', svg_text).group(1).split()
    return float(v[2]), float(v[3])


def build():
    files = {}
    for scheme, suf in SUFFIX.items():
        files[f'mark{suf}.svg'] = mark_svg(scheme)
        files[f'mark-small{suf}.svg'] = mark_small_svg(scheme)
        files[f'wordmark{suf}.svg'] = wordmark_svg(scheme)
        files[f'wordmark-small{suf}.svg'] = wordmark_svg(scheme, WORD_SMALL)
        files[f'lockup-horizontal{suf}.svg'] = lockup_svg(scheme)
        files[f'lockup-stacked{suf}.svg'] = stacked_svg(scheme)
    files['mark-sticker.svg'] = sticker_svg()
    files['favicon.svg'] = favicon_svg()
    # PNG sources (not for direct use)
    R = SEAL['R']
    ka = 0.70                                         # app icon: the favicon drawing on ink, inside iOS's rounded mask
    files['src/tile-apple.svg'] = tile_svg(INK, favicon_body(ka, 500 - ka * 500, 500 - ka * 515.625), 1000)
    files['src/tile-avatar.svg'] = tile_svg(INK, seal_small(SCHEMES['color'], 540, 540, 540, fill=0.66), 1080)
    for n, c in files.items():
        with open(os.path.join(OUT, n), 'w') as fh:
            fh.write(c)
    print('wrote', len(files), 'SVG files')

    # raster jobs (paths relative to this folder) --------------------------------------------------
    jobs = []

    def job(src, png, w, h=None, **kw):
        if h is None:
            vw, vh = dims(files[src]); h = round(w * vh / vw)
        jobs.append(dict(svg='../' + src, png='../' + png, w=w, h=h, **kw))
    for px in (1024, 512):
        job('mark.svg', f'png/mark-{px}.png', px, px)
    for suf in ('-reverse', '-black', '-white'):
        job(f'mark{suf}.svg', f'png/mark{suf}-1024.png', 1024, 1024)
    job('mark-sticker.svg', 'png/mark-sticker-1024.png', 1024, 1024)
    for px in (16, 32, 48):
        job('favicon.svg', f'png/favicon-{px}.png', px, px)
    job('src/tile-apple.svg', 'png/apple-touch-icon-180.png', 180, 180)
    job('src/tile-avatar.svg', 'social-avatar-1080.png', 1080, 1080)
    for base in ('lockup-horizontal', 'lockup-stacked', 'wordmark'):
        for suf in SUFFIX.values():
            job(f'{base}{suf}.svg', f'png/{base}{suf}-2400.png', 2400)
    # blind-test rasters: the favicon at true 16 / 32 px in a light and a dark tab
    for px in (16, 32):
        for theme, bg in (('light', '#FFFFFF'), ('dark', '#202124')):
            job('favicon.svg', f'blind-test/px/fav{px}-{theme}.png', px, px, bg=bg, scheme=theme)
    # pages written by guide.py
    jobs += [dict(html='../src/og.html', png='../og-image-1200x630.png', w=1200, h=630),
             dict(html='../blind-test/test-small.html', png='../blind-test/test-small.png', w=640, h=360),
             dict(html='../blind-test/test-large.html', png='../blind-test/test-large.png', w=512, h=512),
             dict(html='../blind-test/test-logo.html', png='../blind-test/test-logo.png', w=1600, h=400)]
    os.makedirs(os.path.join(OUT, 'png'), exist_ok=True)
    os.makedirs(os.path.join(OUT, 'blind-test', 'px'), exist_ok=True)
    with open(os.path.join(HERE, 'jobs.json'), 'w') as fh:
        json.dump(jobs, fh, indent=1)
    gap_report()
    pending = [e for e in EDIT_LOG if e[1] == 'founder']
    print(f'\nlast edit: {EDIT_LOG[-1][0]} ({EDIT_LOG[-1][1]})')
    if not ADOPTED:
        print('status: DRAFT - not adopted.', 'No founder edit logged yet.' if not pending else
              f'{len(pending)} founder edit(s) logged.', 'Adopt only after the parent blind check (logo-notes.md).')


def write_ico():
    """favicon.ico with the 16, 32 and 48 px PNGs inside (PNG-compressed entries; every current browser)"""
    from PIL import Image
    pngs = [os.path.join(OUT, 'png', f'favicon-{px}.png') for px in (16, 32, 48)]
    blobs = [open(p, 'rb').read() for p in pngs]
    head = struct.pack('<HHH', 0, 1, len(blobs)); off = 6 + 16 * len(blobs); ents = b''
    for p, b in zip(pngs, blobs):
        w, h = Image.open(p).size
        ents += struct.pack('<BBBBHHII', w % 256, h % 256, 0, 0, 1, 32, len(b), off); off += len(b)
    with open(os.path.join(OUT, 'favicon.ico'), 'wb') as fh:
        fh.write(head + ents + b''.join(blobs))
    print('wrote favicon.ico', [Image.open(p).size for p in pngs])


if __name__ == '__main__':
    if sys.argv[1:] == ['ico']:
        write_ico()
    else:
        build()
