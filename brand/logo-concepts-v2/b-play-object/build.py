"""Play Before Pixels, logo concept v2-B "Floor Time" (a picture of real play: a grown-up and a child on the floor, one ball between them).

Run:   python3 build.py            -> writes every SVG + the test/preview HTML + jobs.json
       node render.js jobs.json    -> renders the PNGs (Playwright Chromium)

Every shape is geometry computed below; the wordmark is Bricolage Grotesque (SIL OFL, from brand/fonts/) instanced with
fontTools and converted to outlines. No <text>, no raster images, no system fonts in any SVG.

FOUNDER EDITS: change the numbers in the TUNABLES block, run both commands, look at the PNGs, and record the change in
EDIT_LOG (date + what you changed + why). Keep every version (git or dated copies) so your own authorship is provable.
"""
import math, os, json, re

# ======================================================================================================== TUNABLES
EDIT_LOG = [
    ('2026-09-28', 'Claude (AI-assisted first draft). Founder edits go below this line with their date.'),
]

# The symbol. Units: the floor is y = 0, the middle of the gap between the two figures is x = 0.
SYMBOL = dict(
    CHANNEL=196,        # width of the gap between the two flat fronts; the ball sits in it
    A_BODY=330,         # grown-up: radius of the quarter-circle body (rounded back, flat front)
    C_BODY=222,         # child: radius of the quarter-circle body
    A_HEAD=128,         # grown-up head radius
    C_HEAD=96,          # child head radius (a toddler's head is big for its body)
    A_BACK=46,          # how far the grown-up's head centre sits behind its front edge (smaller = leaning further in)
    C_BACK=36,          # same for the child
    A_NECK=24,          # clear gap between grown-up head and body
    C_NECK=22,          # clear gap between child head and body
    BALL=68,            # ball radius
    EYE_A=19,           # grown-up eye radius (one eye: the figures are in profile)
    EYE_C=15,           # child eye radius
    EYE_K=0.46,         # how far each eye sits from the head centre toward the ball (fraction of head radius)
    SOFT=18,            # rounding of the top-front corner of each body
)
# Small cut for 16-32 px, stickers under 12 mm and embroidery under 25 mm: fewer, bigger parts, wider gaps.
SMALL = dict(SYMBOL, CHANNEL=250, A_HEAD=140, C_HEAD=110, A_BACK=40, C_BACK=34, A_NECK=40, C_NECK=38,
             BALL=84, EYE_A=0, EYE_C=0, SOFT=24, C_BODY=236)

FONT = dict(wght=800, opsz=30)          # Bricolage Grotesque instance used for the wordmark
WORD = dict(TRACK=-6, SPACE=-40,         # letter spacing and word-space adjustment (font units, cap height = 660)
            KERN={('P', 'l'): -6, ('a', 'y'): -8, ('B', 'e'): -4, ('P', 'i'): 4, ('l', 's'): 0},
            Y_TAIL=0.80)                 # the y of "Play": keep this share of its descender (1 = the font's own tail)
LOCKUP = dict(SYM_H=1.52,               # symbol height as a multiple of the cap height
              GAP=0.46,                  # clear air between symbol and name, as a multiple of the cap height
              DROP=0.0)                  # how far the symbol's floor sits below the text baseline (x cap height)

# ======================================================================================================== palette
INK, PAPER, WASH, TOMATO, SUN, SKY = '#1D2940', '#FFFFFF', '#F3F6FB', '#EE5A36', '#F5B820', '#3D86D8'
SUN_T, TOMATO_T, SKY_T = '#FEF4D8', '#FDE9E3', '#E3EEFA'
BLACK = '#000000'
SCHEMES = {                    # adult, child, ball, text
    'color':   (INK, SKY, TOMATO, INK),
    'reverse': (PAPER, SKY, TOMATO, PAPER),
    'black':   (BLACK, BLACK, BLACK, BLACK),
    'white':   (PAPER, PAPER, PAPER, PAPER),
}

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.normpath(os.path.join(HERE, '..', '..', 'fonts'))
SRC = os.path.join(HERE, 'src')
os.makedirs(SRC, exist_ok=True)


def f(v):
    if abs(v) < 0.005:
        return '0'
    s = ('%.2f' % v).rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s


# ======================================================================================================== the symbol
def symbol_geometry(k=SYMBOL):
    """Returns the parts in symbol units (floor y=0, up is negative y)."""
    half = k['CHANNEL'] / 2
    parts = {}
    for who, side in (('A', -1), ('C', +1)):
        R, Rh, back, neck = k[who + '_BODY'], k[who + '_HEAD'], k[who + '_BACK'], k[who + '_NECK']
        fx = side * half                      # flat front edge (and the centre of the body's quarter circle)
        dist = R + neck + Rh                  # head centre sits on a circle around the body's centre
        hx = fx + side * back                 # "behind" = away from the gap
        hy = -math.sqrt(dist * dist - back * back)
        parts[who] = dict(fx=fx, R=R, side=side, head=(hx, hy, Rh))
    parts['ball'] = (0.0, -k['BALL'], k['BALL'])
    bx, by, _ = parts['ball']
    for who in ('A', 'C'):
        hx, hy, Rh = parts[who]['head']
        L = math.hypot(bx - hx, by - hy)
        kk = k['EYE_K'] * Rh
        parts[who]['eye'] = (hx + kk * (bx - hx) / L, hy + kk * (by - hy) / L, k['EYE_' + who])
    parts['soft'] = k['SOFT']
    # bounds
    xs = [parts['A']['fx'] - parts['A']['R'], parts['C']['fx'] + parts['C']['R']]
    for who in ('A', 'C'):
        hx, hy, Rh = parts[who]['head']
        xs += [hx - Rh, hx + Rh]
    top = min(parts[w]['head'][1] - parts[w]['head'][2] for w in ('A', 'C'))
    parts['bbox'] = (min(xs), top, max(xs), 0.0)
    return parts


def body_path(p, soft, T):
    """quarter-circle body with a softened top-front corner. T maps symbol units -> output coords."""
    fx, R, s = p['fx'], p['R'], p['side']
    rho = soft
    Fx = fx + s * rho
    Fy = -math.sqrt((R - rho) ** 2 - rho ** 2)
    L = math.hypot(Fx - fx, Fy)
    Tx, Ty = fx + R * (Fx - fx) / L, R * Fy / L
    sw = 0 if s < 0 else 1
    (x0, y0), (x1, y1), (x2, y2), (x3, y3) = T(fx, 0), T(fx, Fy), T(Tx, Ty), T(fx + s * R, 0)
    sc = T.s
    return (f'M{f(x0)} {f(y0)}V{f(y1)}A{f(rho*sc)} {f(rho*sc)} 0 0 {sw} {f(x2)} {f(y2)}'
            f'A{f(R*sc)} {f(R*sc)} 0 0 {sw} {f(x3)} {f(y3)}Z')


def circle_path(cx, cy, r, ccw=False):
    sw = 0 if ccw else 1
    return (f'M{f(cx-r)} {f(cy)}A{f(r)} {f(r)} 0 1 {sw} {f(cx+r)} {f(cy)}'
            f'A{f(r)} {f(r)} 0 1 {sw} {f(cx-r)} {f(cy)}Z')


class Tf:
    def __init__(self, ox, oy, s): self.ox, self.oy, self.s = ox, oy, s
    def __call__(self, x, y): return (self.ox + self.s * x, self.oy + self.s * y)


def symbol_svg_parts(ox, oy, s, k=SYMBOL):
    """-> dict of path data (output coords) for adult, child, ball. Heads carry the eye as a true hole."""
    g = symbol_geometry(k); T = Tf(ox, oy, s)
    out = {}
    for who, key in (('A', 'adult'), ('C', 'child')):
        p = g[who]
        hx, hy, Rh = p['head']; ex, ey, er = p['eye']
        (HX, HY), (EX, EY) = T(hx, hy), T(ex, ey)
        d = body_path(p, g['soft'], T) + circle_path(HX, HY, Rh * s)
        if er > 0:
            d += circle_path(EX, EY, er * s, ccw=True)   # opposite winding = hole (nonzero and evenodd both work)
        out[key] = d
    bx, by, br = g['ball']; BX, BY = T(bx, by)
    out['ball'] = circle_path(BX, BY, br * s)
    return out


def symbol_group(ox, oy, s, scheme='color', k=SYMBOL, extra_cls=True):
    a, c, b, _ = SCHEMES[scheme] if isinstance(scheme, str) else scheme
    P = symbol_svg_parts(ox, oy, s, k)
    ca = ' class="a"' if extra_cls else ''
    cc = ' class="c"' if extra_cls else ''
    cb = ' class="b"' if extra_cls else ''
    return (f'<path{ca} fill="{a}" d="{P["adult"]}"/><path{cc} fill="{c}" d="{P["child"]}"/>'
            f'<path{cb} fill="{b}" d="{P["ball"]}"/>')


def qa(k=SYMBOL, label=''):
    """print the clear gaps between parts, in symbol units, so edits never make parts touch"""
    g = symbol_geometry(k)
    def body_pts(p, n=1200):
        fx, R, s = p['fx'], p['R'], p['side']
        pts = [(fx, -R * i / n) for i in range(n + 1)]
        pts += [(fx + s * R * math.sin(t * math.pi / 2 / n), -R * math.cos(t * math.pi / 2 / n)) for t in range(n + 1)]
        return pts
    res = {}
    bx, by, br = g['ball']
    for who in ('A', 'C'):
        hx, hy, Rh = g[who]['head']
        pts = body_pts(g[who])
        res[who + ' neck'] = round(min(math.hypot(x - hx, y - hy) for x, y in pts) - Rh, 1)
        res[who + ' head-ball'] = round(math.hypot(hx - bx, hy - by) - Rh - br, 1)
        res[who + ' body-ball'] = round(min(math.hypot(x - bx, y - by) for x, y in pts) - br, 1)
    (ax, ay, ar), (cx, cy, cr) = g['A']['head'], g['C']['head']
    res['head-head'] = round(math.hypot(ax - cx, ay - cy) - ar - cr, 1)
    x0, y0, x1, y1 = g['bbox']
    res['size w x h'] = (round(x1 - x0), round(y1 - y0))
    print('QA', label, res)
    return res


# ======================================================================================================== the wordmark
def font_file():
    path = os.path.join(SRC, f"bricolage-{FONT['wght']}-opsz{FONT['opsz']}.ttf")
    if not os.path.exists(path):
        from fontTools.ttLib import TTFont
        from fontTools.varLib import instancer
        vf = TTFont(os.path.join(FONTS, 'bricolage-a24454f0.woff2'))   # the brand's own latin subset
        inst = instancer.instantiateVariableFont(vf, {'wght': FONT['wght'], 'opsz': FONT['opsz']})
        inst.flavor = None
        inst.save(path)
    return path


_FONT = {}
def font():
    if not _FONT:
        import uharfbuzz as hb
        from fontTools.ttLib import TTFont
        p = font_file()
        tt = TTFont(p)
        _FONT.update(tt=tt, gs=tt.getGlyphSet(), order=tt.getGlyphOrder(),
                     hb=hb.Font(hb.Face(hb.Blob.from_file_path(p))), hbmod=hb)
    return _FONT


CAP, XH = 660, 528


def glyph_d(name, dx, base, s, ytail=None):
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.pens.transformPen import TransformPen
    from fontTools.pens.recordingPen import RecordingPen
    F = font(); pen = SVGPathPen(F['gs'], ntos=f)
    tp = TransformPen(pen, (s, 0, 0, -s, dx, base))
    if ytail is None:
        F['gs'][name].draw(tp)
    else:   # shorten a descender: squash every point below the baseline by ytail
        rp = RecordingPen(); F['gs'][name].draw(rp)
        def sq(pt): return (pt[0], pt[1] * ytail if pt[1] < 0 else pt[1])
        for op, args in rp.value:
            getattr(tp, op)(*[sq(a) for a in args])
    return pen.getCommands()


def words(text, ox, base, s=1.0):
    """wordmark outlines -> (path d, advance width in output units)"""
    F = font(); hb = F['hbmod']
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(F['hb'], buf, {'kern': True})
    glyphs = [(F['order'][g.codepoint], p.x_advance, p.x_offset) for g, p in zip(buf.glyph_infos, buf.glyph_positions)]
    d, x = [], 0.0
    chars = list(text)
    for n, (name, adv, xoff) in enumerate(glyphs):
        gx = ox + s * (x + xoff)
        ytail = WORD['Y_TAIL'] if (name == 'y' and WORD['Y_TAIL'] != 1) else None
        if name != 'space':
            d.append(glyph_d(name, gx, base, s, ytail))
        nxt = chars[n + 1] if n + 1 < len(chars) else None
        x += adv + WORD['TRACK'] + WORD['KERN'].get((chars[n], nxt), 0)
        if name == 'space':
            x += WORD['SPACE']
    return ''.join(d), s * (x - WORD['TRACK'])


# ======================================================================================================== compositions
def lockup(scheme='color', k=SYMBOL):
    """one-line horizontal logo. Returns (svg body, x0, y0, w, h) in font units (cap height 660)."""
    g = symbol_geometry(k); x0, y0, x1, y1 = g['bbox']
    sym_h = LOCKUP['SYM_H'] * CAP
    s = sym_h / (y1 - y0)
    floor_y = CAP + LOCKUP['DROP'] * CAP           # text baseline at y = CAP (cap tops at y = 0)
    ox = -x0 * s; oy = floor_y
    body = symbol_group(ox, oy, s, scheme, k)
    tx = (x1 - x0) * s + LOCKUP['GAP'] * CAP
    wd, ww = words('Play Before Pixels', tx, CAP)
    color = SCHEMES[scheme][3]
    body += f'<path class="t" fill="{color}" d="{wd}"/>'
    top = floor_y - sym_h
    bottom = max(floor_y, CAP + 180 * WORD['Y_TAIL'])
    return body, 0.0, top, tx + ww, bottom - top, s * 2 * k['BALL']


def svg_doc(vb, body, title='Play Before Pixels', bg=None, style=None, px=None):
    x, y, w, h = vb
    if px is None:
        kk = 1000 / max(w, h); px = (round(w * kk), round(h * kk))
    head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x)} {f(y)} {f(w)} {f(h)}" width="{px[0]}" height="{px[1]}" '
            f'role="img" aria-label="{title}"><title>{title}</title>')
    if style:
        head += f'<style>{style}</style>'
    if bg:
        head += f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" fill="{bg}"/>'
    return head + body + '</svg>\n'


def symbol_square(side=1000, fill=0.86, scheme='color', k=SYMBOL, bg=None, rx=0, style=None, nudge=(0, 0), shape='rect'):
    """symbol centred in a square; fill = symbol width (or height, whichever is larger) / side"""
    g = symbol_geometry(k); x0, y0, x1, y1 = g['bbox']
    w, h = x1 - x0, y1 - y0
    s = fill * side / max(w, h)
    ox = (side - w * s) / 2 - x0 * s + nudge[0] * side
    oy = (side - h * s) / 2 - y0 * s + nudge[1] * side
    out = ''
    if bg and shape == 'rect':
        out += f'<rect width="{side}" height="{side}" rx="{f(rx)}" fill="{bg}"/>'
    if bg and shape == 'circle':
        out += f'<circle cx="{side/2}" cy="{side/2}" r="{side/2}" fill="{bg}"/>'
    out += symbol_group(ox, oy, s, scheme, k)
    return svg_doc((0, 0, side, side), out, style=style, px=(side, side))


# ======================================================================================================== build
def build():
    files = {}
    qa(SYMBOL, 'master'); qa(SMALL, 'small')

    # symbol --------------------------------------------------------------------------------------------------------
    g = symbol_geometry(SYMBOL); x0, y0, x1, y1 = g['bbox']
    pad = SYMBOL['BALL'] * 2 * 0.5            # half a ball of air around the drawing inside the file
    vb = (x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad)
    for sc, name in (('color', 'symbol'), ('black', 'symbol-black'), ('white', 'symbol-white'), ('reverse', 'symbol-reverse')):
        files[f'{name}.svg'] = svg_doc(vb, symbol_group(0, 0, 1, sc), bg=INK if sc == 'reverse' else None)
    gs_ = symbol_geometry(SMALL); sx0, sy0, sx1, sy1 = gs_['bbox']
    spad = SMALL['BALL']
    files['symbol-small.svg'] = svg_doc((sx0 - spad, sy0 - spad, sx1 - sx0 + 2 * spad, sy1 - sy0 + 2 * spad),
                                        symbol_group(0, 0, 1, 'color', SMALL))

    # primary logo (one line, for the site header) ----------------------------------------------------------------------
    for sc, name in (('color', 'primary-logo'), ('black', 'primary-logo-black'), ('reverse', 'primary-logo-reverse'),
                     ('white', 'primary-logo-white')):
        body, lx, ly, lw, lh, X = lockup(sc)
        p = X * 0.5                                   # file margin: half the clear-space unit (clear space = 1 ball)
        files[f'{name}.svg'] = svg_doc((lx - p, ly - p, lw + 2 * p, lh + 2 * p), body, bg=INK if sc == 'reverse' else None)

    # favicon: small cut, adaptive (the grown-up turns white in dark browser tabs) ---------------------------------------
    files['favicon.svg'] = symbol_square(1000, 0.96, 'color', SMALL, nudge=(0, 0.0),
                                         style='@media (prefers-color-scheme: dark){.a{fill:#FFFFFF}}')
    # tiles for raster icons / avatar
    files['src/avatar-1080.svg'] = symbol_square(1080, 0.60, 'color', SYMBOL, bg=SUN_T, shape='rect', nudge=(0, 0.02))
    files['src/apple-touch-180.svg'] = symbol_square(180, 0.70, 'color', SMALL, bg=SUN_T)

    for n, c in files.items():
        with open(os.path.join(HERE, n), 'w') as fh:
            fh.write(c)
    print('wrote', len(files), 'svg files')
    return files


if __name__ == '__main__':
    build()
