"""Concept 4 'Sock Talk' (Direction D, hand-made stamp).

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

COL = dict(body=SKY, toe=TOMATO, cuff=SUN, eye=INK)   # chosen palette (see board for rationale)

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
BODY_KEYS = [
    (52, 186), (47, 150), (41, 112), (40, 86), (48, 58), (68, 38), (98, 27), (132, 28),
    (160, 39), (181, 57), (192, 78),                 # crown to snout
    (193, 90), (186, 97),                            # rounded tip of upper jaw (fingers)
    (160, 99), (134, 104), (121, 110),               # upper jaw underside -> hinge
    (133, 116), (156, 121), (174, 126),              # lower jaw top (thumb)
    (180, 133), (175, 141),                          # rounded thumb tip
    (152, 146), (128, 151), (114, 160),              # under the chin / throat
    (110, 174), (111, 186),                          # front of the wrist
]
HINGE = (121, 110)

def puppet(simple=False, speck=True):
    """Return dict of shapely geometries in the 200 box: body, toe, cuff, eye, eye_holes."""
    ring = catmull(BODY_KEYS, closed=True, n=12)
    if not simple:
        ring = scissor(ring, seed=7, amp=1.1, step=8.5, keep=[HINGE])
    body_full = Polygon(ring).buffer(0)
    # clip the wrist flat where the cuff starts (a single straight scissor snip, slightly tilted)
    snip = Polygon([(0, 0), (220, 0), (220, 177.5), (0, 179.5)])
    body_full = body_full.intersection(snip)
    # toe patch: everything beyond a hand-cut line across the snout (the fold of the sock toe)
    toe_line = [(158, 20), (161, 60), (157, 100), (152, 130), (150, 160)]
    toe_line = catmull(toe_line, closed=False, n=8)
    if not simple:
        rnd = random.Random(3)
        toe_line = [(x + rnd.uniform(-0.5, 0.5), y) for x, y in toe_line]
    toe_region = Polygon(toe_line + [(230, 160), (230, 20)])
    gap = 3.2 if not simple else 5.5
    toe = body_full.intersection(toe_region)
    body = body_full.difference(Polygon(toe_line + [(230, 160), (230, 20)]).buffer(gap / 2))
    # cuff: ribbed band, a touch wider than the wrist, cut separately (wobbly), sun
    cuff_keys = [(43, 183.5), (80, 181.5), (119, 183), (120, 199), (80, 200.5), (42, 198.5)]
    cuff_ring = catmull(cuff_keys, closed=True, n=10)
    # square-ish corners: blend a box with the catmull
    cuff = Polygon(cuff_ring).buffer(0)
    cuff = cuff.union(Polygon([(44, 184), (118, 183.5), (119, 198), (43, 198)])).buffer(1.2).buffer(-1.2)
    if not simple:
        cuff = Polygon(scissor(list(cuff.exterior.coords)[:-1], seed=11, amp=0.6, step=7)).buffer(0)
        ribs = unary_union([box(x - 1.25, 187.5, x + 1.25, 195.5) for x in (58, 72, 86, 100)])
        cuff = cuff.difference(ribs)
    # button eye with two thread holes
    ex, ey, er = 118, 62, 13.5 if not simple else 17
    eye = Point(ex, ey).buffer(er, 48)
    if not simple:
        eye = Polygon(scissor(list(eye.exterior.coords)[:-1], seed=5, amp=0.35, step=6)).buffer(0)
    holes = unary_union([Point(ex - 4.2, ey + 0.6).buffer(2.3, 24), Point(ex + 4.2, ey - 0.6).buffer(2.3, 24)])
    specks = None
    if speck and not simple:
        # a few places where the ink didn't take (potato-print feel) — tiny, only on big renders
        rnd = random.Random(21); sp = []
        for (x, y, r) in [(62, 132, 1.3), (70, 150, 0.9), (86, 44, 1.0), (150, 50, 0.8), (57, 96, 0.8),
                          (100, 138, 1.1), (170, 70, 0.7), (92, 166, 0.8)]:
            sp.append(Point(x, y).buffer(r, 10))
        specks = unary_union(sp)
    return dict(body=body, toe=toe, cuff=cuff, eye=eye, holes=holes, specks=specks)

def mark_group(ox=0, oy=0, s=1.0, mode='color', simple=False, speck=True, cols=None):
    """SVG <g> content for the puppet. mode: 'color' | 'mono' (single fill; knockouts are real holes)."""
    P = puppet(simple=simple, speck=speck); C = {**COL, **(cols or {})}
    if mode == 'color':
        body = P['body'].difference(P['specks']) if P['specks'] is not None else P['body']
        eye = P['eye'].difference(P['holes'])
        # eye sits on the body: body keeps a hole where the eye is, so each shape is clean on its own
        return (f'<path fill="{C["body"]}" d="{poly_d(body.difference(P["eye"].buffer(0)), ox, oy, s)}"/>'
                f'<path fill="{C["toe"]}" d="{poly_d(P["toe"], ox, oy, s)}"/>'
                f'<path fill="{C["cuff"]}" d="{poly_d(P["cuff"], ox, oy, s)}"/>'
                f'<path fill="{C["eye"]}" d="{poly_d(eye, ox, oy, s)}"/>')
    # one colour: everything one ink; the eye is cut free by a ring of paper so it still reads
    ring_w = 3.4 if not simple else 4.2
    shape = unary_union([P['body'], P['toe'], P['cuff']]).difference(P['eye'].buffer(ring_w))
    eye = P['eye'].difference(P['holes']) if not simple else P['eye']
    shape = unary_union([shape, eye])
    return f'<path d="{poly_d(shape, ox, oy, s)}"/>'

# ---------------------------------------------------------------- wordmark
tt = TTFont(FONT); gs = tt.getGlyphSet(); order = tt.getGlyphOrder()
hbfont = hb.Font(hb.Face(hb.Blob.from_file_path(FONT)))
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
        tx = cx - (a11 * cx + a12 * cy); ty = cy - (a21 * cx + a22 * cy)
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
        (f'<g fill="{markfill}">{mark_group(M, M, sm, mode=markmode)}</g>' if markmode == 'mono' else mark_group(M, M, sm))
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
    stack = lambda wf: mark_group(mx, M, 1.0) + f'<path fill="{wf}" d="{l1}{l2}"/>'
    write('lockup-stacked.svg', svg(Ws, Hs, stack(INK), T))
    write('lockup-stacked-reverse.svg', svg(Ws, Hs, stack(PAPER), T + ' (on ink)'))

    # one-colour lockups (stamp / embroidery / single-screen print)
    one = lambda col: f'<g fill="{col}">{mark_group(mx, M, 1.0, mode="mono")}<path d="{l1}{l2}"/></g>'
    write('one-color-black.svg', svg(Ws, Hs, one('#000000'), T + ' one colour black'))
    write('one-color-white.svg', svg(Ws, Hs, one('#FFFFFF'), T + ' one colour white (for dark grounds)'))
    print('ok', round(W), round(Ws), round(Hs))

if __name__ == '__main__':
    build()
