"""Generates every concept-2 SVG from one geometry definition.
Run: python3 gen.py   (writes ../*.svg)"""
import json, subprocess, os
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.dirname(HERE)
INK, PAPER, TOMATO = '#1D2940', '#FFFFFF', '#EE5A36'

# ---- MARK GEOMETRY (100 x 100 unit box) --------------------------------
# Ball: circle r=50 centred (50,50). Its lower-left quadrant stays SQUARE --
# that corner is the pixel it grew from. The pixel (p) sits in the corner,
# separated from the ball by a gap (g) that works as a knockout in every colourway.
R = 50; P = 31; G = 7          # pixel side, gap
N = P + G                      # notch size cut from the ball
import math
# Shine: a short arc knocked out of the ball (upper right), round-ended,
# concentric with the ball. It is a hole in the path, so it works in one colour.
SH_R, SH_W, SH_A0, SH_A1 = 36, 6.5, -70, -27   # radius, width, start/end angle (deg, 0 = 3 o'clock, y down)
def _pt(r, a):
    return 50 + r*math.cos(math.radians(a)), 50 + r*math.sin(math.radians(a))
def shine_d():
    ro, ri, cap = SH_R + SH_W/2, SH_R - SH_W/2, SH_W/2
    x0,y0 = _pt(ro, SH_A0); x1,y1 = _pt(ro, SH_A1); x2,y2 = _pt(ri, SH_A1); x3,y3 = _pt(ri, SH_A0)
    return (f'M{x0:.3f},{y0:.3f} A{ro},{ro} 0 0 1 {x1:.3f},{y1:.3f} '
            f'A{cap},{cap} 0 0 1 {x2:.3f},{y2:.3f} A{ri},{ri} 0 0 0 {x3:.3f},{y3:.3f} '
            f'A{cap},{cap} 0 0 1 {x0:.3f},{y0:.3f} Z')
def ball_d(shine=True):
    return (f'M0,50 A50,50 0 1 1 50,100 H{N} V{100-N} H0 Z' + (' ' + shine_d() if shine else ''))
def pixel_d():
    return f'M0,{100-P} H{P} V100 H0 Z'
def mark_group(ball=TOMATO, pixel=INK, shine=True):
    return (f'<path d="{ball_d(shine)}" fill="{ball}" fill-rule="evenodd"/>'
            f'<path d="{pixel_d()}" fill="{pixel}"/>')

# ---- WORDMARK (outlined from the local Bricolage Grotesque woff2) -------
def outline(text, track=0):
    r = subprocess.run(['python3', os.path.join(HERE, 'outline.py'), text, '800', '96', str(track)],
                       capture_output=True, text=True, check=True)
    return json.loads(r.stdout)

def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" '
            f'width="{w:.0f}" height="{h:.0f}" role="img" aria-label="{title}">'
            f'<title>{title}</title>{body}</svg>\n')

def write(name, s):
    open(os.path.join(OUT, name), 'w').write(s)

TRACK = -10  # font units, slight tightening for display size
one = outline('Play Before Pixels', TRACK)
l1 = outline('Play Before', TRACK); l2 = outline('Pixels', TRACK)
CAP = one['capHeight']  # 660

def horizontal(ball, pixel, text, name, title):
    # mark 100 tall; wordmark cap height = 38 units, vertically centred on the mark
    s = 38 / CAP
    gap = 26
    tw = one['width'] * s
    base = 50 + 38/2   # baseline so caps are centred on the mark
    w = 100 + gap + tw; h = 100
    body = (f'<g>{mark_group(ball, pixel)}</g>'
            f'<path transform="translate({100+gap:.2f},{base:.2f}) scale({s:.5f})" d="{one["d"]}" fill="{text}"/>')
    write(name, svg(w, h, body, title))
    return w, h

def stacked(ball, pixel, text, name, title):
    cap = 30; s = cap / CAP; em = 1000 * s
    w1, w2 = l1['width'] * s, l2['width'] * s
    W = max(w1, w2, 100)
    b1 = 100 + 24 + cap; b2 = b1 + round(0.94 * em, 2)
    h = b2 + 1
    body = (f'<g transform="translate({(W-100)/2:.2f},0)">{mark_group(ball, pixel)}</g>'
            f'<path transform="translate({(W-w1)/2:.2f},{b1:.2f}) scale({s:.5f})" d="{l1["d"]}" fill="{text}"/>'
            f'<path transform="translate({(W-w2)/2:.2f},{b2:.2f}) scale({s:.5f})" d="{l2["d"]}" fill="{text}"/>')
    write(name, svg(W, h, body, title))
    return W, h

write('mark.svg', svg(100, 100, mark_group(), 'Play Before Pixels mark'))
write('mark-reversed.svg', svg(100, 100, mark_group(TOMATO, PAPER), 'Play Before Pixels mark (on dark)'))
horizontal(TOMATO, INK, INK, 'lockup-horizontal.svg', 'Play Before Pixels')
horizontal(TOMATO, PAPER, PAPER, 'lockup-horizontal-reversed.svg', 'Play Before Pixels')
stacked(TOMATO, INK, INK, 'lockup-stacked.svg', 'Play Before Pixels')
stacked(TOMATO, PAPER, PAPER, 'lockup-stacked-reversed.svg', 'Play Before Pixels')
stacked('#000000', '#000000', '#000000', 'one-color-black.svg', 'Play Before Pixels (one colour, black)')
stacked('#FFFFFF', '#FFFFFF', '#FFFFFF', 'one-color-white.svg', 'Play Before Pixels (one colour, white)')
write('mark-black.svg', svg(100, 100, mark_group('#000000', '#000000'), 'Play Before Pixels mark (black)'))
write('mark-white.svg', svg(100, 100, mark_group('#FFFFFF', '#FFFFFF'), 'Play Before Pixels mark (white)'))
write('mark-small.svg', svg(100, 100, mark_group(shine=False), 'Play Before Pixels mark, small-size cut (16-24 px)'))
# optical centre (area centroid) measured at (48.8, 51.2): the mark is centred as drawn.
print('ok')
