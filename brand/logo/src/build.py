"""Play Before Pixels — final logo kit builder ("The Return").

Every SVG in ../ is generated here from geometry plus the outlines of Bricolage Grotesque 800
(instanced from the brand's own woff2 at wght 800 / opsz 96 -> bric800.ttf). No <text>, no system fonts,
no raster images inside the SVGs.

Founder edits: change the numbers in MARK / SMALL / BALL_I below (ball size, terminal angle, stroke weights),
run `python3 build.py && node raster.js jobs.json`, and keep each change in git so your authorship is provable.
"""
import math, os, json
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.dirname(HERE)
INK, PAPER, WASH, TOMATO, SUN, SKY = '#1D2940', '#FFFFFF', '#F3F6FB', '#EE5A36', '#F5B820', '#3D86D8'
SUN_T, TOMATO_T, SKY_T = '#FEF4D8', '#FDE9E3', '#E3EEFA'
BLACK, WHITE = '#000000', '#FFFFFF'

def f(v):
    if abs(v) < 0.005: return '0'
    s = ('%.2f' % v).rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s

# ---------------------------------------------------------------- the mark
# An open P (square-cut stem, bowl ending in a round terminal) and a ball that returns to close it.
# Units: cap height 660 = the P of Bricolage Grotesque 800 at 1000 upm.
MARK = dict(Ws=162, Wb=140, H=660, Ro=236, bx=336, end=32, ball_ang=105.75, rb=80)   # master: gaps ~49 u
SMALL = dict(Ws=178, Wb=150, H=660, Ro=236, bx=336, end=12, ball_ang=96, rb=80)      # 16-24 px / tiny embroidery: gaps ~60 u

def mark(ox=0.0, oy=0.0, s=1.0, cut=None):
    k = dict(cut or MARK)
    Ws, Wb, H, Ro, bx, end, ba, rb = (k[n] for n in ['Ws', 'Wb', 'H', 'Ro', 'bx', 'end', 'ball_ang', 'rb'])
    Ri = Ro - Wb; cy = Ro; Rc = Ro - Wb / 2; rc = Wb / 2
    X = lambda x: f(ox + s * x); Y = lambda y: f(oy + s * y); R = lambda r: f(s * r)
    a = math.radians(end)
    o = (bx + Ro * math.cos(a), cy + Ro * math.sin(a))
    i = (bx + Ri * math.cos(a), cy + Ri * math.sin(a))
    d = (f"M{X(0)} {Y(H)}V{Y(0)}H{X(bx)}A{R(Ro)} {R(Ro)} 0 0 1 {X(o[0])} {Y(o[1])}"
         f"A{R(rc)} {R(rc)} 0 0 1 {X(i[0])} {Y(i[1])}"
         f"A{R(Ri)} {R(Ri)} 0 0 0 {X(bx)} {Y(Wb)}H{X(Ws)}V{Y(H)}Z")
    b = math.radians(ba)
    ball = (ox + s * (bx + Rc * math.cos(b)), oy + s * (cy + Rc * math.sin(b)), s * rb)
    return d, ball, (s * (bx + Ro), s * H)

def gaps(cut):
    k = cut; Rc = k['Ro'] - k['Wb'] / 2
    bxx = k['bx'] + Rc * math.cos(math.radians(k['ball_ang']))
    g_stem = bxx - k['rb'] - k['Ws']
    chord = 2 * Rc * math.sin(math.radians(k['ball_ang'] - k['end']) / 2)
    g_cap = chord - k['Wb'] / 2 - k['rb']
    return round(g_stem, 1), round(g_cap, 1)

# ---------------------------------------------------------------- wordmark (Bricolage Grotesque 800 outlines)
tt = TTFont(os.path.join(HERE, 'bric800.ttf')); gs = tt.getGlyphSet(); order = tt.getGlyphOrder()
hbfont = hb.Font(hb.Face(hb.Blob.from_file_path(os.path.join(HERE, 'bric800.ttf'))))
CAP, XH = 660, 528
BALL_I = 80                      # the ball that dots the i of Pixels (same radius as the mark's ball)
TRACK = -8

def shape(text):
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": True})
    return [(order[g.codepoint], p.x_advance, p.x_offset) for g, p in zip(buf.glyph_infos, buf.glyph_positions)]

def glyph_d(name, dx, base, s):
    pen = SVGPathPen(gs, ntos=f)
    gs[name].draw(TransformPen(pen, (s, 0, 0, -s, dx, base)))
    return pen.getCommands()

def words(text, ox, base, s=1.0, customP=False):
    """-> (ink path d, balls, advance). base = baseline y. customP swaps the first P for the mark's P."""
    d, balls, x = [], [], 0.0
    for n, (name, adv, xoff) in enumerate(shape(text)):
        gx = ox + s * (x + xoff)
        if name == 'P' and customP and n == 0:
            md, mb, (mw, _) = mark(gx + s * 40, base - s * CAP, s)
            d.append(md); balls.append(mb)
            x += (40 + 572 + 44) + TRACK        # mark is 572 wide: keep the glyph P's side bearings
            continue
        if name == 'i':
            d.append(glyph_d('dotlessi', gx, base, s))
            r = BALL_I * s
            balls.append((gx + s * 117, base - s * (XH + 44) - r, r))
        else:
            d.append(glyph_d(name, gx, base, s))
        x += adv + TRACK
    return ''.join(d), balls, s * (x - TRACK)

def hull(ox, oy, s, k, cut=None):
    """white die-cut sticker shape around the mark: rounded stem block + bowl disc + ball disc, offset by k"""
    c = dict(cut or MARK); _, (bxx, byy, br), _ = mark(ox, oy, s, cut=c)
    bx, Ro, H = c['bx'], c['Ro'], c['H']
    return (f'<g fill="{PAPER}"><rect x="{f(ox - s*k)}" y="{f(oy - s*k)}" width="{f(s*(bx + k))}" height="{f(s*(H + 2*k))}" rx="{f(s*k)}"/>'
            f'<circle cx="{f(ox + s*bx)}" cy="{f(oy + s*Ro)}" r="{f(s*(Ro + k))}"/>'
            f'<circle cx="{f(bxx)}" cy="{f(byy)}" r="{f(br + s*k)}"/></g>')

# ---------------------------------------------------------------- svg writers
def circles(balls): return ''.join(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}"/>' for x, y, r in balls)

def svg(x0, y0, w, h, ink_d, balls, ink, acc, title, bg=None, sticker=0, extra_style=''):
    k = 1000 / max(w, h)          # nominal display size: longest side 1000 px (scales freely; it is vector)
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x0)} {f(y0)} {f(w)} {f(h)}" '
             f'width="{round(w*k)}" height="{round(h*k)}" role="img" aria-label="{title}"><title>{title}</title>']
    if extra_style: parts.append(f'<style>{extra_style}</style>')
    if bg: parts.append(f'<rect x="{f(x0)}" y="{f(y0)}" width="{f(w)}" height="{f(h)}" fill="{bg}"/>')
    if sticker:   # die-cut white sticker: one simple outline (stem block + bowl disc + ball), k units outside the ink
        parts.append(hull(0, 0, 1, sticker))
    parts.append(f'<path class="p" fill="{ink}" d="{ink_d}"/><g class="b" fill="{acc}">{circles(balls)}</g></svg>\n')
    return ''.join(parts)

SCHEMES = {                    # suffix: (ink, accent)
    '':         (INK, TOMATO),     # full colour on light grounds
    '-reverse': (PAPER, TOMATO),   # full colour on ink / dark grounds
    '-black':   (BLACK, BLACK),    # one colour
    '-white':   (WHITE, WHITE),    # one colour, white on dark
}

# ---------------------------------------------------------------- compositions (return geometry in units)
def comp_mark(cut=None):
    d, b, (w, h) = mark(cut=cut)
    return d, [b], w, h

def comp_wordmark():
    d, b, w = words('Play Before Pixels', 0, CAP, customP=True)
    top = min(CAP - 736, 0)
    return d, b, w, (CAP + 160), top    # descender of y reaches ~ -160

def comp_horizontal():
    """mark at the height of two text lines (cap top of line 1 to baseline of line 2), name set left in two lines"""
    L = 1000                               # baseline-to-baseline
    s = (CAP + L) / CAP
    md, mb, (mw, mh) = mark(0, 0, s)
    gap = 0.55 * mw                        # clear air between symbol and name
    tx = mw + gap
    d1, b1, w1 = words('Play Before', tx, CAP)
    d2, b2, w2 = words('Pixels', tx, CAP + L)
    W = tx + max(w1, w2)
    return md + d1 + d2, [mb] + b1 + b2, W, mh, mw

def comp_stacked():
    s = 2.0
    _, _, (mw, mh) = mark(0, 0, s)
    _, _, w1 = words('Play Before', 0, 0); _, _, w2 = words('Pixels', 0, 0)
    W = max(w1, w2, mw)
    y1 = mh + 470 + CAP; y2 = y1 + 1000
    md, mb, _ = mark((W - mw) / 2 + 0.02 * mw, 0, s)   # tiny optical nudge right: the P's mass sits left
    d1, b1, _ = words('Play Before', (W - w1) / 2, y1)
    d2, b2, _ = words('Pixels', (W - w2) / 2, y2)
    return md + d1 + d2, [mb] + b1 + b2, W, y2 + 160

def square_mark(px_units, fill, bg=None, ink=INK, acc=TOMATO, cut=None, rx=0, sticker=0, title='Play Before Pixels', style='', nudge=0.035):
    """mark centred (with a slight optical nudge right) in a square of side px_units; mark height = fill * side"""
    _, _, (w, h) = mark(cut=cut)
    side = px_units; s = fill * side / h
    ox = (side - w * s) / 2 + nudge * w * s; oy = (side - h * s) / 2
    d, b, _ = mark(ox, oy, s, cut=cut)
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(side)} {f(side)}" width="{f(side)}" height="{f(side)}" role="img" aria-label="{title}"><title>{title}</title>']
    if style: out.append(f'<style>{style}</style>')
    if bg: out.append(f'<rect width="{f(side)}" height="{f(side)}" rx="{f(rx)}" fill="{bg}"/>')
    if sticker:
        out.append(hull(ox, oy, s, sticker, cut))
    out.append(f'<path class="p" fill="{ink}" d="{d}"/><g class="b" fill="{acc}">{circles([b])}</g></svg>\n')
    return ''.join(out)

# ---------------------------------------------------------------- build
def build():
    files = {}
    X = 2 * MARK['rb']            # clear-space unit: one ball diameter (at the artwork's scale)
    # mark + small cut ---------------------------------------------------------
    for cutname, cut in (('mark', MARK), ('mark-small', SMALL)):
        d, b, w, h = comp_mark(cut)
        p = 0.5 * X
        for suf, (ink, acc) in SCHEMES.items():
            files[f'{cutname}{suf}.svg'] = svg(-p, -p, w + 2 * p, h + 2 * p, d, b, ink, acc, 'Play Before Pixels')
    d, b, w, h = comp_mark(MARK)
    files['mark-sticker.svg'] = svg(-X, -X, w + 2 * X, h + 2 * X, d, b, INK, TOMATO, 'Play Before Pixels', sticker=70)
    # wordmark -----------------------------------------------------------------
    d, b, w, h, top = comp_wordmark()
    p = 0.5 * X
    for suf, (ink, acc) in SCHEMES.items():
        files[f'wordmark{suf}.svg'] = svg(-p, -p - 80, w + 2 * p, h + 80 + 2 * p, d, b, ink, acc, 'Play Before Pixels')
    # horizontal lockup --------------------------------------------------------
    d, b, w, h, mw = comp_horizontal()
    p = 0.5 * X * (h / CAP)   # scale clear space to the mark's size in this lockup
    for suf, (ink, acc) in SCHEMES.items():
        files[f'lockup-horizontal{suf}.svg'] = svg(-p, -p, w + 2 * p, h + 2 * p, d, b, ink, acc, 'Play Before Pixels')
    # stacked lockup -----------------------------------------------------------
    d, b, w, h = comp_stacked()
    p = 0.5 * X * 2.0
    for suf, (ink, acc) in SCHEMES.items():
        files[f'lockup-stacked{suf}.svg'] = svg(-p, -p, w + 2 * p, h + 2 * p, d, b, ink, acc, 'Play Before Pixels')
    # favicon: adaptive SVG (ink P in light tabs, paper P in dark tabs) --------
    files['favicon.svg'] = square_mark(1000, 0.9, cut=SMALL, title='Play Before Pixels',
                                       style='@media (prefers-color-scheme: dark){.p{fill:#FFFFFF}}')
    # tiles used for PNG favicons / app icon / avatar (rendered in raster step)
    files['src/tile-favicon.svg'] = square_mark(1000, 0.74, bg=SUN_T, cut=SMALL, rx=220)
    files['src/tile-favicon-16.svg'] = square_mark(1000, 0.78, bg=SUN_T, cut=SMALL, rx=200)
    files['src/tile-apple.svg'] = square_mark(1000, 0.62, bg=SUN_T, cut=MARK)
    files['src/tile-avatar.svg'] = square_mark(1080, 0.50, bg=SUN_T, cut=MARK)
    files['src/square-mark.svg'] = square_mark(1000, 0.84, cut=MARK, nudge=0.0)
    for suf in ('-reverse', '-black', '-white'):
        ink, acc = SCHEMES[suf]
        files[f'src/square-mark{suf}.svg'] = square_mark(1000, 0.84, ink=ink, acc=acc, cut=MARK, nudge=0.0)
    for n, c in files.items():
        with open(os.path.join(OUT, n), 'w') as fh: fh.write(c)
    print('gaps master (stem, cap):', gaps(MARK), ' small:', gaps(SMALL))
    print('wrote', len(files), 'svg files')

    # raster jobs --------------------------------------------------------------
    def dims(name):
        import re
        vb = re.search(r'viewBox="([^"]+)"', files[name]).group(1).split()
        return float(vb[2]), float(vb[3])
    jobs = []
    def job(svgname, pngname, w, h=None):
        if h is None:
            vw, vh = dims(svgname); h = round(w * vh / vw)
        jobs.append(dict(svg=os.path.join(OUT, svgname), png=os.path.join(OUT, 'png', pngname), w=w, h=h))
    for px in (1024, 512):
        job('src/square-mark.svg', f'mark-{px}.png', px, px)
    job('src/tile-apple.svg', 'apple-touch-icon-180.png', 180, 180)
    job('src/tile-favicon.svg', 'favicon-32.png', 32, 32)
    job('src/tile-favicon-16.svg', 'favicon-16.png', 16, 16)
    job('src/tile-favicon.svg', 'favicon-48.png', 48, 48)
    job('src/tile-avatar.svg', '../social-avatar-1080.png', 1080, 1080)
    for base in ('lockup-horizontal', 'lockup-stacked', 'wordmark'):
        for suf in SCHEMES:
            job(f'{base}{suf}.svg', f'{base}{suf}-2400.png', 2400)
    for suf in ('-reverse', '-black', '-white'):
        job(f'src/square-mark{suf}.svg', f'mark{suf}-1024.png', 1024, 1024)
    job('mark-sticker.svg', 'mark-sticker-1024.png', 1024)
    os.makedirs(os.path.join(OUT, 'png'), exist_ok=True)
    with open(os.path.join(HERE, 'jobs.json'), 'w') as fh: json.dump(jobs, fh, indent=1)

if __name__ == '__main__':
    build()
