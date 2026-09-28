"""Concept 1 'The Return' — builds every SVG from geometry + Bricolage Grotesque 800 outlines.
Wordmark letters are the brand font's own outlines (instanced at wght 800 / opsz 96) converted to paths;
the P of the mark and all balls are hand-built geometry."""
import math, os
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.dirname(HERE)
INK, PAPER, TOMATO, SUN = '#1D2940', '#FFFFFF', '#EE5A36', '#F5B820'
def f(v): return ('%.2f' % v).rstrip('0').rstrip('.').replace('-0', '0') if abs(v) >= 0.005 else '0'

# ---------- the mark: an open P + a returning ball ----------
MARK = dict(Ws=162, Wb=140, H=660, Ro=236, bx=336, end=32, ball_ang=105.75, rb=84)  # gaps 45/45 units
def mark(ox=0, oy=0, s=1.0, **over):
    k = {**MARK, **over}
    Ws, Wb, H, Ro, bx, end, ba, rb = (k[n] for n in ['Ws','Wb','H','Ro','bx','end','ball_ang','rb'])
    Ri = Ro - Wb; cy = Ro; Rc = Ro - Wb/2
    X = lambda x: f(ox + s*x); Y = lambda y: f(oy + s*y); R = lambda r: f(s*r)
    a = math.radians(end)
    ox_, oy_ = bx+Ro*math.cos(a), cy+Ro*math.sin(a)
    ix_, iy_ = bx+Ri*math.cos(a), cy+Ri*math.sin(a)
    # round terminal (radius Wb/2) blended into the inner curve with a concave fillet of radius rf
    rc = Wb/2; rf = k.get('rf', 34)
    Ccx, Ccy = bx+Rc*math.cos(a), cy+Rc*math.sin(a)          # cap centre
    # fillet centre F: |F-O| = Ri-rf (inside counter), |F-Cc| = rc+rf ; O = (bx,cy)
    d1, d2 = Ri-rf, rc+rf; D = Rc
    ang = math.acos((d1*d1 + D*D - d2*d2) / (2*d1*D))        # angle at O between OCc and OF
    fa = a - ang                                              # F sits "before" the cap (towards the top)
    Fx, Fy = bx+d1*math.cos(fa), cy+d1*math.sin(fa)
    T1 = (Ccx + rc*(Fx-Ccx)/d2, Ccy + rc*(Fy-Ccy)/d2)         # tangent point on cap
    T2 = (bx + Ri*math.cos(fa), cy + Ri*math.sin(fa))         # tangent point on inner arc
    d = (f"M{X(0)} {Y(H)}V{Y(0)}H{X(bx)}A{R(Ro)} {R(Ro)} 0 0 1 {X(ox_)} {Y(oy_)}"
         f"A{R(rc)} {R(rc)} 0 0 1 {X(T1[0])} {Y(T1[1])}A{R(rf)} {R(rf)} 0 0 0 {X(T2[0])} {Y(T2[1])}"
         f"A{R(Ri)} {R(Ri)} 0 0 0 {X(bx)} {Y(Wb)}H{X(Ws)}V{Y(H)}Z")
    b = math.radians(ba)
    ball = (ox + s*(bx+Rc*math.cos(b)), oy + s*(cy+Rc*math.sin(b)), s*rb)
    return d, ball, (s*(bx+Ro), s*H)

# ---------- wordmark from Bricolage Grotesque outlines ----------
tt = TTFont(os.path.join(HERE, 'bric800.ttf')); gs = tt.getGlyphSet(); order = tt.getGlyphOrder()
hbfont = hb.Font(hb.Face(hb.Blob.from_file_path(os.path.join(HERE, 'bric800.ttf'))))
CAP, XH = 660, 528
def shape(text, track):
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": True})
    out, x = [], 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        out.append((order[info.codepoint], x + pos.x_offset)); x += pos.x_advance + track
    return out, x - track
def glyph_d(name, dx, base, s):
    pen = SVGPathPen(gs, ntos=f)
    gs[name].draw(TransformPen(pen, (s, 0, 0, -s, dx, base)))
    return pen.getCommands()
def words(text, ox, base, s=1.0, track=-8, customP=False):
    """ink path d, list of balls, advance width. base = baseline y. Custom P uses the mark geometry."""
    glyphs, adv = shape(text, track)
    d, balls = [], []
    for name, x in glyphs:
        gx = ox + s*x
        if name == 'P' and customP and not balls:
            md, mb, _ = mark(gx + s*40, base - s*CAP, s); d.append(md); balls.append(mb); continue
        if name == 'i':
            d.append(glyph_d('dotlessi', gx, base, s))
            r = MARK['rb'] * s
            balls.append((gx + s*117, base - s*(XH + 40) - r, r)); continue
        d.append(glyph_d(name, gx, base, s))
    return ''.join(d), balls, s*adv

def circles(balls): return ''.join(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}"/>' for x, y, r in balls)
def svg(w, h, ink_d, balls, ink=INK, acc=TOMATO, title='Play Before Pixels', bg=None, pad=0):
    bgrect = f'<rect x="{f(-pad)}" y="{f(-pad)}" width="{f(w+2*pad)}" height="{f(h+2*pad)}" fill="{bg}"/>' if bg else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(-pad)} {f(-pad)} {f(w+2*pad)} {f(h+2*pad)}" '
            f'width="{f(w+2*pad)}" height="{f(h+2*pad)}" role="img" aria-label="{title}"><title>{title}</title>{bgrect}'
            f'<path fill="{ink}" d="{ink_d}"/><g fill="{acc}">{circles(balls)}</g></svg>\n')

def build():
    files = {}
    # mark alone (padding = 1/6 of height as clear space)
    md, mb, (mw, mh) = mark()
    top = mb[1] - mb[2]
    files['mark.svg'] = svg(mw, mh, md, [mb], title='Play Before Pixels mark', pad=120)
    # favicon optical size: fatter ball gaps for 16–32 px
    fd, fb, (fw, fh) = mark(Wb=150, end=26, ball_ang=103, rb=90, Ws=176)
    files['mark-favicon.svg'] = svg(fw, fh, fd, [fb], title='Play Before Pixels favicon', pad=40)
    # wordmark logotype (custom P + ball tittle)
    wd, wb, ww = words('Play Before Pixels', 0, 0 + 760, customP=True)
    files['wordmark.svg'] = svg(ww, 760 + 170, wd, wb, pad=160)
    # horizontal lockup: mark + wordmark (plain Bricolage P's, ball tittle)
    S = 1.42; gap = 330
    md, mb, (mw, mh) = mark(0, 0, S)
    base = mh/2 + CAP/2 + 20          # optical centre: wordmark cap-centre on mark centre
    hd, hb_, hw = words('Play Before Pixels', mw + gap, base)
    H_W, H_H = mw + gap + hw, mh
    files['lockup-horizontal.svg'] = svg(H_W, H_H, md + hd, [mb] + hb_, pad=220)
    files['lockup-horizontal-reverse.svg'] = svg(H_W, H_H, md + hd, [mb] + hb_, ink=PAPER, pad=220)
    files['one-color-black.svg'] = svg(H_W, H_H, md + hd, [mb] + hb_, ink='#000000', acc='#000000', pad=220)
    files['one-color-white.svg'] = svg(H_W, H_H, md + hd, [mb] + hb_, ink='#FFFFFF', acc='#FFFFFF', pad=220)
    # stacked lockup: mark over two centred lines
    S2 = 2.1
    md2, mb2, (mw2, mh2) = mark(0, 0, S2)
    l1d, l1b, l1w = words('Play Before', 0, 0)
    l2d, l2b, l2w = words('Pixels', 0, 0)
    W = max(l1w, l2w, mw2)
    y1 = mh2 + 420 + CAP; y2 = y1 + 1010
    md2, mb2, _ = mark((W - mw2)/2, 0, S2)
    l1d, l1b, _ = words('Play Before', (W - l1w)/2, y1)
    l2d, l2b, _ = words('Pixels', (W - l2w)/2, y2)
    files['lockup-stacked.svg'] = svg(W, y2 + 40, md2 + l1d + l2d, [mb2] + l1b + l2b, pad=260)
    files['lockup-stacked-reverse.svg'] = svg(W, y2 + 40, md2 + l1d + l2d, [mb2] + l1b + l2b, ink=PAPER, pad=260)
    # one-color marks (embroidery / stamp)
    md, mb, (mw, mh) = mark()
    files['mark-black.svg'] = svg(mw, mh, md, [mb], ink='#000000', acc='#000000', title='Play Before Pixels mark', pad=120)
    files['mark-white.svg'] = svg(mw, mh, md, [mb], ink='#FFFFFF', acc='#FFFFFF', title='Play Before Pixels mark', pad=120)
    files['mark-reverse.svg'] = svg(mw, mh, md, [mb], ink=PAPER, title='Play Before Pixels mark', pad=120)
    for n, c in files.items():
        open(os.path.join(OUT, n), 'w').write(c)
    print('wrote', ', '.join(files))
if __name__ == '__main__': build()
