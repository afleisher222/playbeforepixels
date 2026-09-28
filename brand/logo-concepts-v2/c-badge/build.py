"""Play Before Pixels - logo concept C, "The Maker's Seal" (slug: c-badge).

A round maker's seal, like the stamp pressed into the bottom of a good wooden toy: the full name runs
around the ring and a spinning top stands in the middle. Every SVG here is generated from compass
geometry plus the outlines of Bricolage Grotesque (the brand's own SIL-OFL font, instanced from
brand/fonts/*.woff2). No <text>, no raster images, no system fonts.

    python3 build.py              # writes every SVG next to this file (+ src/ helpers)
    python3 tests/make_tests.py   # writes the test pages and tests/jobs.json
    node tests/raster.js          # renders test-large / test-logo / test-small / preview-sheet PNGs

FOUNDER EDITS: every number that shapes the logo is in the TUNABLE block just below. Change one
(for example the top's lean TOP['tilt'], the ring lettering size SEAL['cap'], the ball size
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
    inner=46,       # clear space between the letters and the top
    track=50,       # extra letter spacing on the ring, in font units (1000 = one em)
    space=250,      # width of the word space in "PLAY BEFORE", font units
    dot_r=27,       # radius of the two tomato balls between the words
    top_fill=0.90,  # how much of the free middle the top fills (1.0 = touches the clear space)
    top_dy=0,       # optical nudge of the top (units, + = down)
)
TOP = dict(         # the spinning top, drawn upright with compass and ellipse; widest line at y = 0
    tilt=12,        # lean in degrees (clockwise); 0 = upright
    w=400,          # half-width at the widest line
    dome=205,       # height of the shoulder (half-ellipse) above the widest line
    drop=520,       # depth of the pointed body (two circle arcs) below the widest line
    band=(-10, 118),  # painted band: from/to y, measured down from the widest line
    handle_w=118,   # handle width
    handle_h=190,   # handle height above the shoulder
    tip=34,         # softening of the tip (units along the curve)
    centre=0.45,    # 0 = centre by bounding box, 1 = centre by the body's weight
)
SMALL_TOP = dict(TOP, handle_w=170, handle_h=175, band=(-20, 150), tip=46, dome=215, drop=500)   # 16-32 px cut
WORD = dict(
    track=-6,       # wordmark letter spacing (font units)
    ball_r=94,      # the round ball that replaces Bricolage's square dot on the i of "Pixels"
    ball_y=650,     # height of that ball's centre above the baseline (font units)
)
LOCKUP = dict(
    disc=1.80,      # small seal diameter, as a multiple of the wordmark's cap height
    gap=0.48,       # space between small seal and wordmark, x cap height
    top_fill=0.74,  # how much of the small seal the top fills
    lift=0.0,       # raise the small seal against the cap height (x cap height)
)
FAV = dict(fill=0.96, disc=True)   # favicon: size of the small seal in the square; disc=False = top alone

# ============================================================== palette (from brand/logo/src/build.py)
INK, PAPER, WASH, TOMATO, SUN, SKY = '#1D2940', '#FFFFFF', '#F3F6FB', '#EE5A36', '#F5B820', '#3D86D8'
SUN_T, TOMATO_T, SKY_T = '#FEF4D8', '#FDE9E3', '#E3EEFA'
BLACK, WHITE = '#000000', '#FFFFFF'

# what each part is painted with.  band=None draws the top as one plain silhouette (one-colour use)
SCHEMES = {
    'color':   dict(disc=INK,   letters=PAPER, ball=TOMATO, body=SUN,   band=TOMATO, handle=TOMATO, word=INK,   iball=TOMATO),
    'reverse': dict(disc=SUN,   letters=INK,   ball=TOMATO, body=PAPER, band=TOMATO, handle=TOMATO, word=PAPER, iball=TOMATO),
    'black':   dict(disc=BLACK, letters=WHITE, ball=WHITE,  body=WHITE, band=None,   handle=WHITE,  word=BLACK, iball=BLACK),
    'white':   dict(disc=WHITE, letters=BLACK, ball=BLACK,  body=BLACK, band=None,   handle=BLACK,  word=WHITE, iball=WHITE),
}

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')
FONTS = os.path.join(HERE, '..', '..', 'fonts')


def f(v):
    if abs(v) < 0.005:
        return '0'
    s = ('%.2f' % v).rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s


# ============================================================== fonts: instance the brand woff2 once
def font(name, wght, opsz):
    p = os.path.join(SRC, name)
    if not os.path.exists(p):
        vf = TTFont(os.path.join(FONTS, 'bricolage-a24454f0.woff2'))   # Bricolage Grotesque, latin subset
        inst = instancer.instantiateVariableFont(vf, dict(wght=wght, opsz=opsz))
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


# ============================================================== the spinning top (compass construction)
class Top:
    """Upright, in its own units: widest line on y = 0, shoulder = half-ellipse (w x dome) above it,
    body = two circle arcs meeting in a point `drop` below it (a pointed arch, turned over),
    handle = a round-ended bar standing on the shoulder. y grows downward (SVG)."""

    def __init__(self, T):
        self.T = T
        w, h = T['w'], T['drop']
        self.c = (h * h - w * w) / (2 * w)          # arc centres sit on y = 0 at x = -c (right arc) and +c (left arc)
        self.rho = w + self.c                        # arc radius

    def xr(self, y):                                 # right edge of the silhouette at height y
        T = self.T
        if y <= 0:
            return T['w'] * math.sqrt(max(0.0, 1 - (y / T['dome']) ** 2))
        return -self.c + math.sqrt(max(0.0, self.rho ** 2 - y * y))

    def tip_points(self):
        """points where the softened tip leaves each arc (tip length measured along the arc)"""
        a_tip = math.atan2(self.T['drop'], self.c)    # angle of the tip seen from the right arc's centre (-c, 0)
        a = a_tip - self.T['tip'] / self.rho
        return (-self.c + self.rho * math.cos(a), self.rho * math.sin(a))

    def silhouette(self):
        T = self.T; w, d, h, r = T['w'], T['dome'], T['drop'], self.rho
        px, py = self.tip_points()
        return (f'M{f(-w)} 0A{f(w)} {f(d)} 0 0 1 {f(w)} 0'
                f'A{f(r)} {f(r)} 0 0 1 {f(px)} {f(py)}Q0 {f(h)} {f(-px)} {f(py)}'
                f'A{f(r)} {f(r)} 0 0 1 {f(-w)} 0Z')

    def band(self):
        T = self.T; w, d, r = T['w'], T['dome'], self.rho
        y1, y2 = T['band']
        a1, a2 = self.xr(y1), self.xr(y2)

        def edge_down(x0, y0, y1_):              # right edge from y0 down to y1_, crossing y = 0 if needed
            out = ''
            if y0 < 0 < y1_:
                out += f'A{f(w)} {f(d)} 0 0 1 {f(w)} 0'
                out += f'A{f(r)} {f(r)} 0 0 1 {f(self.xr(y1_))} {f(y1_)}'
            elif y1_ <= 0:
                out += f'A{f(w)} {f(d)} 0 0 1 {f(self.xr(y1_))} {f(y1_)}'
            else:
                out += f'A{f(r)} {f(r)} 0 0 1 {f(self.xr(y1_))} {f(y1_)}'
            return out

        def edge_up(y0, y1_):                    # left edge from y0 (below) up to y1_
            out = ''
            if y1_ < 0 < y0:
                out += f'A{f(r)} {f(r)} 0 0 1 {f(-w)} 0'
                out += f'A{f(w)} {f(d)} 0 0 1 {f(-self.xr(y1_))} {f(y1_)}'
            elif y0 <= 0:
                out += f'A{f(w)} {f(d)} 0 0 1 {f(-self.xr(y1_))} {f(y1_)}'
            else:
                out += f'A{f(r)} {f(r)} 0 0 1 {f(-self.xr(y1_))} {f(y1_)}'
            return out
        return (f'M{f(-a1)} {f(y1)}H{f(a1)}' + edge_down(a1, y1, y2) + f'H{f(-a2)}' + edge_up(y2, y1) + 'Z')

    def handle(self):
        T = self.T; hw = T['handle_w'] / 2; top = -(T['dome'] + T['handle_h'])
        return (f'M{f(-hw)} {f(-T["dome"] * 0.5)}V{f(top + hw)}A{f(hw)} {f(hw)} 0 0 1 {f(hw)} {f(top + hw)}'
                f'V{f(-T["dome"] * 0.5)}Z')

    def outline_points(self, n=240):
        """dense outline (for fitting and centring), upright, un-rotated"""
        T = self.T; pts = []
        for i in range(n + 1):                       # silhouette, right side then left side
            y = -T['dome'] + (T['dome'] + T['drop']) * i / n
            x = self.xr(y); pts.append((x, y))
        pts += [(-x, y) for x, y in reversed(pts)]
        hw = T['handle_w'] / 2; top = -(T['dome'] + T['handle_h'])
        hpts = [(hw * math.cos(math.radians(a)), top + hw - hw * math.sin(math.radians(a))) for a in range(0, 181, 6)]
        return pts, hpts

    def frame(self):
        """rotation, bbox centre and body centroid of the tilted top (units of the upright drawing)"""
        th = math.radians(self.T['tilt']); c, s = math.cos(th), math.sin(th)
        rot = lambda p: (p[0] * c - p[1] * s, p[0] * s + p[1] * c)
        body, hpts = self.outline_points()
        rb = [rot(p) for p in body]; rh = [rot(p) for p in hpts]
        allp = rb + rh
        xs = [p[0] for p in allp]; ys = [p[1] for p in allp]
        bbc = ((min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2)
        A = Cx = Cy = 0.0                            # polygon centroid of the body
        for (x0, y0), (x1, y1) in zip(rb, rb[1:] + rb[:1]):
            k = x0 * y1 - x1 * y0; A += k; Cx += (x0 + x1) * k; Cy += (y0 + y1) * k
        cen = (Cx / (3 * A), Cy / (3 * A))
        m = self.T['centre']
        anchor = (bbc[0] * (1 - m) + cen[0] * m, bbc[1] * (1 - m) + cen[1] * m)
        far = max(math.hypot(x - anchor[0], y - anchor[1]) for x, y in allp)
        return anchor, far, (max(xs) - min(xs), max(ys) - min(ys))

    def svg(self, sc, cx, cy, radius, fill, handle_class=''):
        """draw the top so that it fills `fill` of a circle of `radius` around (cx, cy)"""
        anchor, far, _ = self.frame()
        s = fill * radius / far
        tr = f'translate({f(cx)} {f(cy)}) scale({f(s)}) translate({f(-anchor[0])} {f(-anchor[1])}) rotate({f(self.T["tilt"])})'
        hc = f' class="{handle_class}"' if handle_class else ''
        out = f'<g transform="{tr}"><path{hc} fill="{sc["handle"]}" d="{self.handle()}"/><path fill="{sc["body"]}" d="{self.silhouette()}"/>'
        if sc['band']:
            out += f'<path fill="{sc["band"]}" d="{self.band()}"/>'
        return out + '</g>'


# ============================================================== lettering on a circle
def arc_text(text, cap, r_base, where, track, space):
    """top: letters stand on circle r_base, reading clockwise, tops outward.
       bottom: letters hang from circle r_base (their baseline), reading left to right, tops inward.
       Spacing is measured at mid-cap radius, so letters look evenly spaced on the curve."""
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
            m = (s * tx, s * ty, s * ux, s * uy, P[0] - s * gx * tx, P[1] - s * gx * ty)
            out.append(glyph(RING_FONT, n, m))
        cum += w
    return ''.join(out), math.degrees(T)


def seal(sc, cx=0.0, cy=0.0, scale=1.0, S=SEAL, T=TOP):
    """the full seal (disc, ring lettering, two balls, top), centred on (cx, cy), radius S['R']*scale"""
    R, cap, edge = S['R'], S['cap'], S['edge']
    r_out = R - edge; r_in = r_out - cap; r_mid = (r_in + r_out) / 2
    g = [f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(R * scale)}" fill="{sc["disc"]}"/>']
    d1, T1 = arc_text('PLAY BEFORE', cap, r_in, 'top', S['track'], S['space'])
    d2, T2 = arc_text('PIXELS', cap, r_out, 'bottom', S['track'], S['space'])
    g.append(f'<path fill="{sc["letters"]}" transform="translate({f(cx)} {f(cy)}) scale({f(scale)})" d="{d1}{d2}"/>')
    gap_c = math.radians((T1 / 2 + 180 - T2 / 2) / 2)          # each ball sits in the middle of its gap
    for sx in (1, -1):
        bx, by = sx * r_mid * math.sin(gap_c), -r_mid * math.cos(gap_c)
        g.append(f'<circle cx="{f(cx + scale * bx)}" cy="{f(cy + scale * by)}" r="{f(scale * S["dot_r"])}" fill="{sc["ball"]}"/>')
    g.append(Top(T).svg(sc, cx, cy + S['top_dy'] * scale, (r_in - S['inner']) * scale, S['top_fill']))
    return ''.join(g)


def seal_small(sc, cx, cy, r, T=TOP, fill=None, handle_class=''):
    """the small seal: disc + top, no lettering (header lockup, favicon, embroidery under 40 mm)"""
    fill = fill or LOCKUP['top_fill']
    disc = f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="{sc["disc"]}"/>' if sc.get('disc') else ''
    return disc + Top(T).svg(sc, cx, cy, r, fill, handle_class)


# ============================================================== wordmark
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


def lockup(scheme):
    """horizontal lockup for the site header: the small seal (no ring words) + one-line wordmark.
    Units: wordmark font units at scale 1 (cap height 660); baseline y = 0."""
    sc = SCHEMES[scheme]
    D = LOCKUP['disc'] * CAP; r = D / 2
    cy = -CAP / 2 - LOCKUP['lift'] * CAP
    body = seal_small(sc, r, cy, r)
    tx = D + LOCKUP['gap'] * CAP
    d, balls, w = wordmark('Play Before Pixels', tx, 0, 1.0)
    body += f'<path fill="{sc["word"]}" d="{d}"/>' + ''.join(
        f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(rr)}" fill="{sc["iball"]}"/>' for x, y, rr in balls)
    top_y = min(cy - r, -744); bot_y = max(cy + r, 190)
    p = 0.25 * D                                  # clear space: a quarter of the small seal all round
    return doc((-p, top_y - p, tx + w + 2 * p, bot_y - top_y + 2 * p), body, 'Play Before Pixels')


def favicon_svg():
    """16-32 px: the small seal with the heavy-cut top. The ink disc melts into dark tabs and the top
    stays; in light tabs the disc gives a crisp round edge."""
    sc = dict(SCHEMES['color'])
    if not FAV['disc']:
        sc['disc'] = None
    body = seal_small(sc, 500, 500, 500 * FAV['fill'], T=SMALL_TOP, fill=0.80)
    return doc((0, 0, 1000, 1000), body, 'Play Before Pixels', w=32, h=32)


def build():
    files = {}
    for scheme in ('color', 'reverse', 'black', 'white'):
        suf = '' if scheme == 'color' else '-' + scheme
        files[f'symbol{suf}.svg'] = symbol_svg(scheme)
        files[f'primary-logo{suf}.svg'] = lockup(scheme)
    files['favicon.svg'] = favicon_svg()
    sc = SCHEMES['color']
    files['symbol-small.svg'] = doc((-500, -500, 1000, 1000), seal_small(sc, 0, 0, 500), 'Play Before Pixels')
    files['src/avatar-1080.svg'] = doc((-540, -540, 1080, 1080),
                                       f'<rect x="-540" y="-540" width="1080" height="1080" fill="{INK}"/>' + seal(sc, scale=1.0),
                                       'Play Before Pixels')
    for n, c in files.items():
        with open(os.path.join(HERE, n), 'w') as fh:
            fh.write(c)
    print('wrote', len(files), 'files')


if __name__ == '__main__':
    build()
