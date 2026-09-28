"""Concept 4 'Hand-Cut Sock Puppet' (Direction D, hand-made stamp). (Working name only; 'Sock Talk' is an existing sock brand, do not use.)

A cut-paper sock puppet: the toe of the sock is the talking mouth, a sewn button is the eye,
the ribbed cuff is where a grown-up's hand goes in. Everything is hand-placed key points,
run through a seeded 'scissor' wobble so edges read as cut by hand, then boolean-cut with shapely.
Wordmark = Bricolage Grotesque 800 (brand font file, default instance wght 800 / opsz 96) outlines as paths,
each letter nudged a hair like a hand-set rubber-stamp alphabet.
Run:  python3 build.py   (writes the SVGs one folder up)
"""
import math, os, random, zlib
from shapely.geometry import Polygon, Point, box
from shapely.ops import unary_union
from shapely import affinity
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import uharfbuzz as hb

HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.dirname(HERE)
FONT = os.path.join(HERE, '..', '..', '..', 'fonts', 'bricolage-a24454f0.woff2')
INK, PAPER, WASH = '#1D2940', '#FFFFFF', '#F3F6FB'
TOMATO, SUN, SKY, GRASS, PLUM = '#EE5A36', '#F5B820', '#3D86D8', '#2FA36B', '#8A5CC7'

COL = dict(body=TOMATO, mouth=INK, tongue='#FDE9E3', cuff=SUN, eye=INK, yarn=SUN)   # chosen palette (see board for rationale)

def f(v):
    s = ('%.2f' % v).rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s

# ---------------------------------------------------------------- curve helpers
def catmull(pts, closed=True, n=10):
    """Sample a centripetal-ish Catmull-Rom through pts -> dense list of points."""
    P = pts[:]; out = []
    m = len(P)
    rng = range(m) if closed else range(m - 1)
    for i in rng:
        p0 = P[(i - 1) % m] if closed or i > 0 else P[0]
        p1 = P[i]; p2 = P[(i + 1) % m]
        p3 = P[(i + 2) % m] if closed or i + 2 < m else P[-1]
        for k in range(n):
            t = k / n; t2 = t * t; t3 = t2 * t
            x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2*p0[0] - 5*p1[0] + 4*p2[0] - p3[0]) * t2 + (-p0[0] + 3*p1[0] - 3*p2[0] + p3[0]) * t3)
            y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2*p0[1] - 5*p1[1] + 4*p2[1] - p3[1]) * t2 + (-p0[1] + 3*p1[1] - 3*p2[1] + p3[1]) * t3)
            out.append((x, y))
    if not closed: out.append(P[-1])
    return out

def resample(ring, step):
    """Evenly resample a closed ring every `step` units."""
    pts = list(ring) + [ring[0]]
    L = [0.0]
    for a, b in zip(pts, pts[1:]): L.append(L[-1] + math.dist(a, b))
    total = L[-1]; n = max(8, int(total / step)); out = []; j = 0
    for i in range(n):
        d = total * i / n
        while L[j + 1] < d: j += 1
        a, b = pts[j], pts[j + 1]; seg = L[j + 1] - L[j] or 1
        t = (d - L[j]) / seg
        out.append((a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t))
    return out

def scissor(ring, seed, amp=0.9, step=9.0, keep=()):
    """Hand-cut wobble: resample, then push each point along its normal by smooth seeded noise.
    Points within 6 units of any `keep` point are left alone (crisp corners where they matter)."""
    rnd = random.Random(seed)
    pts = resample(ring, step); n = len(pts)
    raw = [rnd.uniform(-1, 1) for _ in range(n)]
    noise = [(raw[i - 1] + 2 * raw[i] + raw[(i + 1) % n]) / 4 * amp for i in range(n)]
    out = []
    for i, (x, y) in enumerate(pts):
        if any(math.dist((x, y), k) < 6 for k in keep): out.append((x, y)); continue
        ax, ay = pts[i - 1]; bx, by = pts[(i + 1) % n]
        tx, ty = bx - ax, by - ay; l = math.hypot(tx, ty) or 1
        nx, ny = ty / l, -tx / l
        out.append((x + nx * noise[i], y + ny * noise[i]))
    return out

def poly_d(poly, ox=0, oy=0, s=1.0):
    """Polygon (possibly with holes / multipolygon) -> smooth-ish path: straight 'scissor' facets
    whose joins are softened with tiny quadratic corners, which is how a cut paper edge actually looks."""
    geoms = getattr(poly, 'geoms', [poly])
    d = []
    for g in geoms:
        for ring in [g.exterior] + list(g.interiors):
            c = list(ring.coords)[:-1]
            if len(c) < 3: continue
            c = [(ox + s * x, oy + s * y) for x, y in c]
            n = len(c)
            mids = [((c[i][0] + c[(i + 1) % n][0]) / 2, (c[i][1] + c[(i + 1) % n][1]) / 2) for i in range(n)]
            seg = [f"M{f(mids[-1][0])} {f(mids[-1][1])}"]
            for i in range(n):
                seg.append(f"Q{f(c[i][0])} {f(c[i][1])} {f(mids[i][0])} {f(mids[i][1])}")
            d.append(''.join(seg) + 'Z')
    return ''.join(d)

# ---------------------------------------------------------------- the puppet (200 x 200 design box)
# Sock seen side-on, worn on a raised forearm: vertical leg of sock (arm) on the left,
# hand bent forward at the wrist into a long head; thumb = lower jaw, fingers = upper jaw.
# One even-width tube of sock (that's what makes it a sock, not a head), rising from the cuff,
# bent over at the knuckles, ending in a rounded two-lipped mouth. Felt mouth insert inside.
BODY_KEYS = [
    (50, 184), (49, 150), (48, 112), (50, 78), (60, 50), (80, 31), (108, 22), (138, 24),
    (162, 34), (178, 48), (186, 62),                       # knuckles over to the upper lip
    (189, 73), (184, 81), (173, 83),                       # blunt, round sock-toe upper lip
    (156, 85), (141, 90), (129, 100),                      # upper jaw underside -> hinge
    (140, 113), (156, 120), (171, 123),                    # lower jaw top (thumb), dropped open
    (183, 127), (185, 137), (174, 143),                    # blunt round lower lip (as full as the top one)
    (152, 143), (130, 139), (116, 145), (110, 159),        # chin -> front of wrist
    (109, 172), (109, 184),
]
HINGE = (129, 100)
MOUTH_KEYS = [(126, 101), (134, 92), (154, 86), (175, 83), (184, 92), (186, 110), (180, 126), (162, 121), (141, 112)]
TONGUE_KEYS = [(142, 111), (154, 106), (168, 106), (178, 111), (176, 121), (160, 119)]
TILT = -8          # the whole puppet leans in, mid-sentence
FIT = (1.0, 0, 0)
USE_YARN = False
YARN = [  # three loops of yarn hair, hand-cut
    [(93, 30), (89, 18), (92, 8), (100, 6)],
    [(104, 27), (104, 15), (110, 6), (118, 6)],
    [(115, 28), (120, 19), (128, 15), (134, 17)],
]

def puppet(simple=False, speck=False):
    """Return dict of shapely geometries in the 200 box: body, mouth, cuff, eye, holes, specks."""
    ring = catmull(BODY_KEYS, closed=True, n=12)
    if not simple:
        ring = scissor(ring, seed=7, amp=1.35, step=8.5, keep=[HINGE])
    body = Polygon(ring).buffer(0)
    body = body.intersection(Polygon([(0, 0), (220, 0), (220, 183), (0, 184)]))   # one straight snip at the wrist
    # felt mouth insert: a separate cut piece filling the gap between the lips, tucked under them
    mouth = Polygon(catmull(MOUTH_KEYS, closed=True, n=10)).buffer(0)
    if not simple:
        mouth = Polygon(scissor(list(mouth.exterior.coords)[:-1], seed=9, amp=0.5, step=6)).buffer(0)
    mouth = mouth.intersection(body.convex_hull.buffer(-2.5))          # stays inside the lips, never pokes out like a beak
    mouth = mouth.difference(body.buffer(2.2 if not simple else 3.5))
    # keep only the biggest piece (the insert), drop slivers
    if hasattr(mouth, 'geoms'): mouth = max(mouth.geoms, key=lambda g: g.area)
    tongue = Polygon(catmull(TONGUE_KEYS, closed=True, n=10)).buffer(0).intersection(mouth.buffer(-2.4 if not simple else -3))
    if not simple:
        tongue = Polygon(scissor(list(tongue.exterior.coords)[:-1], seed=17, amp=0.35, step=5)).buffer(0)
    # ribbed cuff, a touch wider than the wrist
    cuff = Polygon([(49, 188), (80, 186.5), (110, 187.5), (111, 204), (80, 205.5), (48, 204)]).buffer(2.5).buffer(-2.5)
    if not simple:
        cuff = Polygon(scissor(list(cuff.exterior.coords)[:-1], seed=11, amp=0.6, step=7)).buffer(0)
        cuff = cuff.difference(unary_union([box(x - 1.3, 191.5, x + 1.3, 200.5) for x in (58, 69, 80, 91, 102)]))
    # sewn button eye, two small thread holes on a diagonal
    ex, ey, er = (116, 50, 13) if not simple else (117, 51, 16.5)
    eye = Point(ex, ey).buffer(er, 48)
    if not simple:
        eye = Polygon(scissor(list(eye.exterior.coords)[:-1], seed=5, amp=0.35, step=6)).buffer(0)
    holes = unary_union([Point(ex - 3.2, ey + 3.2).buffer(1.9, 20), Point(ex + 3.2, ey - 3.2).buffer(1.9, 20)])
    specks = None
    if speck and not simple:
        specks = unary_union([Point(x, y).buffer(r, 10) for x, y, r in [(56, 150, 1.1), (61, 120, 0.8), (97, 160, 0.9)]])
    from shapely.geometry import LineString
    yw = 4.6 if not simple else 7
    yarn = unary_union([LineString(catmull(s, closed=False, n=8)).buffer(yw, cap_style=1, join_style=1) for s in YARN])
    yarn = yarn.difference(body.buffer(2.0 if not simple else 3.2))
    if not simple:
        yarn = unary_union([Polygon(scissor(list(p.exterior.coords)[:-1], seed=13 + i, amp=0.4, step=5)).buffer(0)
                            for i, p in enumerate(getattr(yarn, 'geoms', [yarn]))])
    g = dict(body=body, mouth=mouth.difference(tongue.buffer(0.01)) if not simple else mouth, tongue=tongue if not simple else None, cuff=cuff, eye=eye, holes=holes, specks=specks, yarn=yarn if USE_YARN else None)
    g = {k: (affinity.rotate(v, TILT, origin=(106, 108)) if v is not None else None) for k, v in g.items()}
    # fit into the 200 box (same transform for every size cut, taken from the reference geometry)
    s, dx, dy = FIT
    return {k: (affinity.translate(affinity.scale(v, s, s, origin=(0, 0)), dx, dy) if v is not None else None) for k, v in g.items()}

def _fit():
    global FIT
    FIT = (1.0, 0, 0)
    P = puppet()
    x0, y0, x1, y1 = unary_union([v for v in P.values() if v is not None]).bounds
    s = 196 / max(x1 - x0, y1 - y0)
    FIT = (s, 100 - s * (x0 + x1) / 2, 100 - s * (y0 + y1) / 2)
_fit()

def mark_group(ox=0, oy=0, s=1.0, mode='color', simple=False, speck=False, cols=None, sticker=False):
    """SVG <g> content for the puppet. mode: 'color' | 'mono' (single fill; knockouts are real holes)."""
    P = puppet(simple=simple, speck=speck); C = {**COL, **(cols or {})}
    if mode == 'color':
        body = P['body'].difference(P['specks']) if P['specks'] is not None else P['body']
        eye = P['eye'].difference(P['holes']) if not simple else P['eye']
        back = ''
        if sticker:   # die-cut paper sticker edge: for dark grounds, photos, and the literal sticker
            allp = unary_union([g for k, g in P.items() if g is not None and k not in ('holes', 'specks')])
            edge = allp.buffer(8.5 if not simple else 11, join_style=1).buffer(-2, join_style=1)
            edge = Polygon(edge.exterior.coords)
            if not simple:
                edge = Polygon(scissor(list(edge.exterior.coords)[:-1], seed=23, amp=0.8, step=8)).buffer(0)
            back = f'<path fill="{PAPER}" d="{poly_d(edge, ox, oy, s)}"/>'
        # eye sits on the body: body keeps a hole where the eye is, so each shape is clean on its own
        return (back + f'<path fill="{C["body"]}" d="{poly_d(body.difference(P["eye"].buffer(0)), ox, oy, s)}"/>'
                f'<path fill="{C["mouth"]}" d="{poly_d(P["mouth"], ox, oy, s)}"/>'
                f'<path fill="{C["cuff"]}" d="{poly_d(P["cuff"], ox, oy, s)}"/>'
                + (f'<path fill="{C["tongue"]}" d="{poly_d(P["tongue"], ox, oy, s)}"/>' if P["tongue"] is not None else '')
                + (f'<path fill="{C["yarn"]}" d="{poly_d(P["yarn"], ox, oy, s)}"/>' if P["yarn"] is not None else '')
                + f'<path fill="{C["eye"]}" d="{poly_d(eye, ox, oy, s)}"/>')
    # one colour: everything one ink; the eye is cut free by a ring of paper so it still reads
    ring_w = 3.4 if not simple else 4.2
    shape = unary_union([g for g in (P['body'], P['cuff'], P['yarn'], P['tongue']) if g is not None]).difference(P['eye'].buffer(ring_w))
    eye = P['eye'].difference(P['holes']) if not simple else P['eye']
    shape = unary_union([shape, eye])
    return f'<path d="{poly_d(shape, ox, oy, s)}"/>'

# ---------------------------------------------------------------- wordmark
TTF = os.path.join(HERE, 'bric800.ttf')
if not os.path.exists(TTF):
    _t = TTFont(FONT); _t.flavor = None; _t.save(TTF)
tt = TTFont(TTF); gs = tt.getGlyphSet(); order = tt.getGlyphOrder()
hbfont = hb.Font(hb.Face(hb.Blob.from_file_path(TTF)))
CAP = 660
JIT = random.Random(42)
STAMP = {}  # per-letter (rotation deg, dy) — fixed per character position so lockups match

def shape_text(text, track):
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True})
    out, x = [], 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        out.append((order[info.codepoint], x + pos.x_offset, pos.x_advance)); x += pos.x_advance + track
    return out, x - track

def words_d(text, ox, base, s, track=-10, stamp=True, key=''):
    glyphs, adv = shape_text(text, track)
    d = []
    for i, (name, x, a) in enumerate(glyphs):
        if name == 'space': continue
        k = (key, i)
        if k not in STAMP:
            r = random.Random(zlib.crc32(f"{key}|{i}|{name}".encode()))
            STAMP[k] = (r.uniform(-2.2, 2.2), r.uniform(-9, 9))
        rot, dy = STAMP[k] if stamp else (0, 0)
        cx, cy = x + a / 2, -CAP / 2          # rotate each letter about its own middle
        t = math.radians(rot); c, sn = math.cos(t), math.sin(t)
        # font units (y up) -> letter-local rotation -> page
        # p' = R (p - C) + C ; then page = (ox + s*px, base - s*py) + dy
        a11, a12, a21, a22 = c, -sn, sn, c
        vx, vy = x - cx, -cy                   # glyph origin relative to the letter's centre
        tx = a11 * vx + a12 * vy + cx; ty = a21 * vx + a22 * vy + cy
        # compose with flip/scale: X = ox + s*(a11 x + a12 y + tx) ; Y = base - s*(a21 x + a22 y + ty) + s*dy
        M = (s * a11, -s * a21, s * a12, -s * a22, ox + s * tx, base - s * ty + s * dy)
        pen = SVGPathPen(gs, ntos=f)
        gs[name].draw(TransformPen(pen, M))
        d.append(pen.getCommands())
    return ''.join(d), adv * s

def svg(w, h, body, title, bg=None):
    bgr = f'<rect width="{f(w)}" height="{f(h)}" fill="{bg}"/>' if bg else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(w)} {f(h)}" width="{f(w)}" height="{f(h)}" '
            f'role="img" aria-label="{title}"><title>{title}</title>{bgr}{body}</svg>\n')

def write(name, content):
    with open(os.path.join(OUT, name), 'w') as fh: fh.write(content)

def build():
    T = 'Play Before Pixels'
    # mark alone (200 box + 12 margin)
    M = 12
    write('mark.svg', svg(224, 224, mark_group(M, M, 1.0), 'Play Before Pixels mark'))
    write('mark-sticker.svg', svg(224, 224, mark_group(M, M, 1.0, sticker=True), 'Play Before Pixels mark, sticker cut (for dark grounds)'))
    write('mark-small-sticker.svg', svg(224, 224, mark_group(M, M, 1.0, simple=True, sticker=True), 'Play Before Pixels mark, small sticker cut'))
    write('mark-small.svg', svg(224, 224, mark_group(M, M, 1.0, simple=True), 'Play Before Pixels mark, small-size cut'))
    write('mark-black.svg', svg(224, 224, f'<g fill="#000">{mark_group(M, M, 1.0, mode="mono")}</g>', 'Play Before Pixels mark, black'))
    write('mark-white.svg', svg(224, 224, f'<g fill="#FFF">{mark_group(M, M, 1.0, mode="mono")}</g>', 'Play Before Pixels mark, white'))

    # horizontal lockup: mark height 200*sm; wordmark cap height ~ 0.36 of mark height
    sm = 1.0; s = 0.108                                # 660*0.108 = 71 cap
    wd, wadv = words_d(T, 0, 0, s, key='h')
    gap = 30; W = M + 200 * sm + gap + wadv + M; H = 224
    base = 12 + 100 + CAP * s / 2 + 2                  # optical centre on mark
    wd, _ = words_d(T, M + 200 * sm + gap, base, s, key='h')
    lock_h = lambda wordfill, markmode='color', markfill=None: (
        (f'<g fill="{markfill}">{mark_group(M, M, sm, mode=markmode)}</g>' if markmode == 'mono' else mark_group(M, M, sm, sticker=(wordfill == PAPER)))
        + f'<path fill="{wordfill}" d="{wd}"/>')
    write('lockup-horizontal.svg', svg(W, H, lock_h(INK), T))
    write('lockup-horizontal-reverse.svg', svg(W, H, lock_h(PAPER), T + ' (on ink)'))

    # stacked lockup: mark centred, two lines
    s2 = 0.105
    l1, a1 = words_d('Play Before', 0, 0, s2, key='s1'); l2, a2 = words_d('Pixels', 0, 0, s2, key='s2')
    Ws = max(a1, a2, 200) + 2 * M + 20
    mx = (Ws - 200) / 2
    b1 = M + 200 + 40 + CAP * s2; b2 = b1 + CAP * s2 * 1.28
    l1, _ = words_d('Play Before', (Ws - a1) / 2, b1, s2, key='s1'); l2, _ = words_d('Pixels', (Ws - a2) / 2, b2, s2, key='s2')
    Hs = b2 + 22 + M
    stack = lambda wf: mark_group(mx, M, 1.0, sticker=(wf == PAPER)) + f'<path fill="{wf}" d="{l1}{l2}"/>'
    write('lockup-stacked.svg', svg(Ws, Hs, stack(INK), T))
    write('lockup-stacked-reverse.svg', svg(Ws, Hs, stack(PAPER), T + ' (on ink)'))

    # one-colour lockups (stamp / embroidery / single-screen print)
    one = lambda col: f'<g fill="{col}">{mark_group(mx, M, 1.0, mode="mono")}<path d="{l1}{l2}"/></g>'
    write('one-color-black.svg', svg(Ws, Hs, one('#000000'), T + ' one colour black'))
    write('one-color-white.svg', svg(Ws, Hs, one('#FFFFFF'), T + ' one colour white (for dark grounds)'))
    print('ok', round(W), round(Ws), round(Hs))

if __name__ == '__main__':
    build()
