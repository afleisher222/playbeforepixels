"""Play Before Pixels - logo concept v2, direction A ("a-wordmark"): the name is the logo.

Every SVG in this folder is generated here from geometry plus the outlines of Bricolage Grotesque
(the brand's own SIL-OFL font, instanced from brand/fonts/ at the weight and optical size below).
No <text>, no system fonts, no raster images inside any SVG.

    python3 build.py      # writes every SVG, plus the HTML pages and src/jobs.json used for the test renders
    node render.js        # renders every PNG in src/jobs.json with Playwright Chromium

FOUNDER EDITS - change the numbers below, rebuild, and keep each version in git. Your own edits are what
make the final mark provably yours (brand/BRAND.md, "Human authorship"). Log each change in EDIT_LOG, e.g.
    "2026-10-02  BALL_R 94 -> 100: a rounder, friendlier ball"
"""
EDIT_LOG = [
    "2026-09-28  design draft of direction A, before any founder edits",
]

# ============================================================================ TUNABLE NUMBERS
# Units for the lettering: 1000 = the font's em. The x-height (height of a, e, o ...) is 528.

# --- lettering -------------------------------------------------------------------------------
FONT_WGHT   = 760     # Bricolage weight axis, 200-800. Lower = lighter letters.
FONT_OPSZ   = 36      # Bricolage optical-size axis, 12-96. Lower = wider, more open letters.
TRACK       = 14      # extra space added between every pair of letters
WORD_SPACE  = 196     # the space between words (the font's own space is 214)
KERN = {              # hand spacing for single pairs, on top of TRACK (+ = further apart, - = closer)
    ('p', 'l'): -6, ('l', 'a'): -4, ('a', 'y'): -10,
    ('e', 'f'): -12, ('f', 'o'): -14, ('o', 'r'): -2, ('r', 'e'): -10,
    ('p', 'i'): 4, ('i', 'x'): 6, ('x', 'e'): -8,
}

# --- the ball: the dot of the i in "pixels" is a tomato ball, held in the air -----------------
BALL_R      = 102     # ball radius (the font's own dot is about 84)
BALL_GAP    = 80      # air between the top of the i and the ball: the pause (the font's own: about 48)
BALL_DX     = 0       # nudge the ball left (-) or right (+) off the centre of the i

# --- the pixel: the full stop after "pixels" is one square pixel ---------------------------------
PIXEL_S     = 138     # side of the square (the letters' stems are 150 wide)
PIXEL_SPACE = 52      # space between the s and the square

# --- stacked version (play / before / pixels) --------------------------------------------------
STACK_LEADING = 980   # baseline-to-baseline distance
STACK_INDENT  = (0, 0, 0)

# --- the symbol: the same ball, in front of the same pixel (avatar, stickers) -----------------
SYM_R      = 230      # ball radius
SYM_S      = 311      # pixel side (same ball-to-pixel ratio as in the wordmark: 138 / 204)
SYM_DX     = 250      # pixel centre, right of the ball centre
SYM_DY     = 235      # pixel centre, above the ball centre
SYM_GAP    = 30       # the white ring cut into the pixel around the ball (keeps them two things)
SYM_PAD    = 0.13     # empty margin around the symbol in its square, as a share of the side
AVATAR_PAD = 0.21     # a wider margin for round-cropped social avatars

# --- favicon: a separate cut drawn on the 16-pixel grid (numbers are in screen pixels) ---------
FAV_BALL   = (5.5, 10.5, 5.5)     # ball centre x, centre y, radius
FAV_PIXEL  = (9.0, 0.0, 7.0)      # pixel left x, top y, side (sits on whole pixels: crisp edges)
FAV_GAP    = 0.8                  # ring cut around the ball, in pixels

# --- colours (brand palette only) -------------------------------------------------------------
INK, PAPER, WASH = '#1D2940', '#FFFFFF', '#F3F6FB'
TOMATO, SUN, SKY = '#EE5A36', '#F5B820', '#3D86D8'
SUN_T, TOMATO_T, SKY_T = '#FEF4D8', '#FDE9E3', '#E3EEFA'
BLACK = '#000000'

CLEAR = 1.0           # clear space around each logo file, in ball diameters
# ============================================================================ END OF TUNABLE NUMBERS

import os, json, math
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')
FONT_WOFF2 = os.path.normpath(os.path.join(HERE, '..', '..', 'fonts', 'bricolage-a24454f0.woff2'))  # latin subset
XH = 528

def f(v):
    s = ('%.2f' % v).rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s

# ---------------------------------------------------------------------------- font
def load_font():
    os.makedirs(SRC, exist_ok=True)
    cache = os.path.join(SRC, f'bricolage-w{FONT_WGHT}-o{FONT_OPSZ}.ttf')
    if not os.path.exists(cache):
        tt = TTFont(FONT_WOFF2); tt.flavor = None
        instantiateVariableFont(tt, {'wght': FONT_WGHT, 'opsz': FONT_OPSZ}).save(cache)
    tt = TTFont(cache)
    return tt.getGlyphSet(), tt.getGlyphOrder(), hb.Font(hb.Face(hb.Blob.from_file_path(cache)))

GS, ORDER, HBF = load_font()

def bounds(name):
    bp = BoundsPen(GS); GS[name].draw(bp); return bp.bounds

def shape(text):
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(HBF, buf, {'kern': True, 'liga': False})
    return [(ORDER[g.codepoint], p.x_advance, p.x_offset) for g, p in zip(buf.glyph_infos, buf.glyph_positions)]

def word_line(text, ox=0.0, base=0.0, stop=False):
    """One line of lettering -> (ink path d, balls [(cx,cy,r)], pixels [(x,y,s)], bbox)."""
    glyphs = shape(text)
    pen = SVGPathPen(GS, ntos=f); balls, pixels = [], []; x = ox
    xs, ys = [], []
    for n, (name, adv, xoff) in enumerate(glyphs):
        if name == 'space':
            x += WORD_SPACE; continue
        gx = x + xoff
        g = 'dotlessi' if name == 'i' else name
        GS[g].draw(TransformPen(pen, (1, 0, 0, -1, gx, base)))
        b = bounds(g); xs += [gx + b[0], gx + b[2]]; ys += [base - b[3], base - b[1]]
        if name == 'i':
            cx = gx + (b[0] + b[2]) / 2 + BALL_DX
            cy = base - (XH + BALL_GAP + BALL_R)
            balls.append((cx, cy, BALL_R)); ys.append(cy - BALL_R)
        nxt = glyphs[n + 1][0] if n + 1 < len(glyphs) else None
        if nxt is None and stop:                      # the square full stop after the last letter
            px = gx + b[2] + PIXEL_SPACE
            pixels.append((px, base - PIXEL_S, PIXEL_S)); xs.append(px + PIXEL_S)
        x += adv + (TRACK + KERN.get((name, nxt), 0) if nxt not in (None, 'space') else 0)
    return pen.getCommands(), balls, pixels, (min(xs), min(ys), max(xs), max(ys))

def comp_oneline():
    return word_line('play before pixels', stop=True)

def comp_stacked():
    ds, balls, pixels, xs, ys = [], [], [], [], []
    for k, word in enumerate(('play', 'before', 'pixels')):
        d, b, p, bb = word_line(word, ox=STACK_INDENT[k], base=k * STACK_LEADING, stop=(k == 2))
        ds.append(d); balls += b; pixels += p; xs += [bb[0], bb[2]]; ys += [bb[1], bb[3]]
    return ''.join(ds), balls, pixels, (min(xs), min(ys), max(xs), max(ys))

# ---------------------------------------------------------------------------- the symbol geometry
def pixel_behind_ball(x0, y0, S, cx, cy, Rg):
    """Path of the square [x0, x0+S] x [y0, y0+S] with a round bite (radius Rg, centre cx,cy) taken out
    of its lower-left corner, so the ball sits in front of it with a clean ring of air. Pure lines + one arc."""
    x1, y1 = x0 + S, y0 + S
    yl = cy - math.sqrt(Rg ** 2 - (x0 - cx) ** 2)      # where the ring crosses the left edge
    xb = cx + math.sqrt(Rg ** 2 - (y1 - cy) ** 2)      # where the ring crosses the bottom edge
    assert y0 < yl < y1 and x0 < xb < x1, 'ball must overlap only the lower-left corner of the pixel'
    return (f'M{f(x0)} {f(yl)}V{f(y0)}H{f(x1)}V{f(y1)}H{f(xb)}'
            f'A{f(Rg)} {f(Rg)} 0 0 0 {f(x0)} {f(yl)}Z')

def symbol_geometry(side, pad=None):
    """ball (cx,cy,r) and pixel path, fitted into a square of `side` with SYM_PAD margin."""
    w = SYM_R + SYM_DX + SYM_S / 2          # from ball's left edge to pixel's right edge
    h = SYM_R + SYM_DY + SYM_S / 2          # from pixel's top edge to ball's bottom edge
    s = side * (1 - 2 * (SYM_PAD if pad is None else pad)) / max(w, h)
    cx = (side - w * s) / 2 + SYM_R * s
    cy = side - (side - h * s) / 2 - SYM_R * s
    R, S = SYM_R * s, SYM_S * s
    x0, y0 = cx + SYM_DX * s - S / 2, cy - SYM_DY * s - S / 2
    return (cx, cy, R), pixel_behind_ball(x0, y0, S, cx, cy, R + SYM_GAP * s)

# ---------------------------------------------------------------------------- svg writers
TITLE = 'Play Before Pixels'

def svg_head(x0, y0, w, h, px_long=1000, extra=''):
    k = px_long / max(w, h)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x0)} {f(y0)} {f(w)} {f(h)}" '
            f'width="{round(w * k)}" height="{round(h * k)}" role="img" aria-label="{TITLE}"{extra}>'
            f'<title>{TITLE}</title>')

def lettering_svg(comp, ink, ball, bg=None):
    d, balls, pixels, bb = comp
    p = CLEAR * 2 * BALL_R
    x0, y0, w, h = bb[0] - p, bb[1] - p, bb[2] - bb[0] + 2 * p, bb[3] - bb[1] + 2 * p
    out = [svg_head(x0, y0, w, h)]
    if bg: out.append(f'<rect x="{f(x0)}" y="{f(y0)}" width="{f(w)}" height="{f(h)}" fill="{bg}"/>')
    out.append(f'<path fill="{ink}" d="{d}"/>')
    out += [f'<rect x="{f(x)}" y="{f(y)}" width="{f(s)}" height="{f(s)}" fill="{ink}"/>' for x, y, s in pixels]
    out += [f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{ball}"/>' for x, y, r in balls]
    out.append('</svg>\n')
    return ''.join(out)

def symbol_svg(ink, ball, bg=None, side=1000, round_bg=False, pad=None):
    (cx, cy, r), pix = symbol_geometry(side, pad)
    out = [svg_head(0, 0, side, side, px_long=side)]
    if bg:
        out.append(f'<circle cx="{side/2}" cy="{side/2}" r="{side/2}" fill="{bg}"/>' if round_bg
                   else f'<rect width="{side}" height="{side}" fill="{bg}"/>')
    out.append(f'<path fill="{ink}" d="{pix}"/><circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="{ball}"/></svg>\n')
    return ''.join(out)

def favicon_svg():
    bx, by, br = FAV_BALL; px, py, ps = FAV_PIXEL
    pix = pixel_behind_ball(px, py, ps, bx, by, br + FAV_GAP)
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" role="img" '
            f'aria-label="{TITLE}"><title>{TITLE}</title>'
            '<style>.px{fill:' + INK + '}@media (prefers-color-scheme: dark){.px{fill:' + PAPER + '}}</style>'
            f'<path class="px" d="{pix}"/><circle cx="{f(bx)}" cy="{f(by)}" r="{f(br)}" fill="{TOMATO}"/></svg>\n')

SCHEMES = {                      # suffix: (letters + pixel, ball, background)
    '':         (INK, TOMATO, None),
    '-black':   (BLACK, BLACK, None),
    '-reverse': (PAPER, TOMATO, INK),
    '-white':   (PAPER, PAPER, None),
}

# ---------------------------------------------------------------------------- test + preview pages
FONTS_CSS = '../../../fonts/fonts.css'

def viewbox_wh(svg):
    import re
    v = re.search(r'viewBox="([^"]+)"', svg).group(1).split()
    return float(v[2]), float(v[3])

def pages(files):
    P = {}
    base = '<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0}img{display:block}</style>'
    # blind test, large: the symbol alone on white
    P['test-large.html'] = base + '</head><body style="background:#fff"><img src="../symbol.svg" width="512" height="512"></body></html>'
    # the full primary logo, 1600 px wide, on white
    w, h = viewbox_wh(files['primary-logo.svg']); H = round(1600 * h / w)
    P['test-logo.html'] = base + f'</head><body style="background:#fff"><img src="../primary-logo.svg" width="1600" height="{H}"></body></html>'
    # the favicon at true size (transparent, rendered once in a light tab, once in a dark tab)
    for px in (16, 32):
        P[f'fav{px}.html'] = base + f'</head><body style="background:transparent"><img src="../favicon.svg" width="{px}" height="{px}"></body></html>'
    # small-use sheet: no words anywhere. Left = light tab (#FFFFFF), right = dark tab (#202124).
    def half(scheme, bg, left):
        return (f'<div style="position:absolute;left:{left}px;top:0;width:320px;height:360px;background:{bg}">'
                f'<img src="_render/fav-16-{scheme}.png" style="position:absolute;left:20px;top:16px;width:128px;height:128px;image-rendering:pixelated">'
                f'<img src="_render/fav-16-{scheme}.png" style="position:absolute;left:176px;top:72px;width:16px;height:16px">'
                f'<img src="_render/fav-32-{scheme}.png" style="position:absolute;left:20px;top:156px;width:192px;height:192px;image-rendering:pixelated">'
                f'<img src="_render/fav-32-{scheme}.png" style="position:absolute;left:240px;top:236px;width:32px;height:32px">'
                '</div>')
    P['test-small.html'] = base + '</head><body style="width:640px;height:360px;position:relative;overflow:hidden">' + \
        half('light', '#FFFFFF', 0) + half('dark', '#202124', 320) + '</body></html>'
    P['preview-sheet.html'] = preview_sheet(files)
    for n, html in P.items():
        with open(os.path.join(SRC, n), 'w') as fh: fh.write(html)
    wl, hl = viewbox_wh(files['primary-logo.svg'])
    jobs = [
        dict(src='src/test-large.html', out='test-large.png', w=512, h=512),
        dict(src='src/test-logo.html', out='test-logo.png', w=1600, h=round(1600 * hl / wl)),
    ]
    for px in (16, 32):
        for sch in ('light', 'dark'):
            jobs.append(dict(src=f'src/fav{px}.html', out=f'src/_render/fav-{px}-{sch}.png', w=px, h=px, scheme=sch, transparent=True))
    jobs += [dict(src='src/test-small.html', out='test-small.png', w=640, h=360),
             dict(src='src/preview-sheet.html', out='preview-sheet.png', w=1600, h=1000)]
    with open(os.path.join(SRC, 'jobs.json'), 'w') as fh: json.dump(jobs, fh, indent=1)

def preview_sheet(files):
    css = f"""<link rel="stylesheet" href="{FONTS_CSS}"><style>
    html,body{{margin:0}} body{{width:1600px;height:1000px;background:{WASH};font-family:'Nunito Sans',sans-serif;color:{INK};position:relative;overflow:hidden}}
    .card{{position:absolute;border-radius:18px;overflow:hidden;background:#fff}}
    .lab{{position:absolute;left:22px;bottom:16px;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;opacity:.62}}
    .lab.w{{color:#fff;opacity:.75}}
    img{{display:block;position:absolute}}
    h1{{position:absolute;left:40px;top:22px;margin:0;font:800 22px 'Bricolage Grotesque',sans-serif;letter-spacing:-.01em}}
    .sub{{position:absolute;left:40px;top:54px;font-size:14px;opacity:.7}}
    .sw{{position:absolute;top:30px;width:26px;height:26px;border-radius:50%}}
    .spine{{position:absolute;bottom:0;width:0.72in;border-radius:3px 3px 0 0}}
    .spine .t{{position:absolute;left:50%;top:26px;transform:translateX(-50%) rotate(90deg);transform-origin:center;white-space:nowrap;font:800 15px 'Bricolage Grotesque',sans-serif}}
    </style>"""
    sw = ''.join(f'<div class="sw" style="left:{1330 + i*38}px;background:{c};{"box-shadow:inset 0 0 0 1px #d5dbe6;" if c == PAPER else ""}"></div>'
                 for i, c in enumerate([INK, TOMATO, PAPER, SUN_T, SKY, SUN, WASH][:6]))
    body = [f'<h1>play before pixels · concept A · the name is the logo</h1>'
            '<div class="sub">Custom lowercase from Bricolage Grotesque outlines. The dot of the i is a ball; the full stop is one square pixel. The symbol puts the ball in front of the pixel.</div>', sw]
    # A: primary logo on white
    body.append('<div class="card" style="left:40px;top:92px;width:1010px;height:380px">'
                '<img src="../primary-logo.svg" style="left:65px;top:92px;width:880px">'
                '<div class="lab">primary logo · site header</div></div>')
    # B: reversed on ink (stacked)
    body.append(f'<div class="card" style="left:1070px;top:92px;width:490px;height:380px;background:{INK}">'
                '<img src="../logo-stacked-white.svg" style="display:none">'
                f'<img src="../primary-logo-reverse.svg" style="left:0;top:0;width:0">'
                f'<img src="../{REV_STACK}" style="left:118px;top:38px;width:254px">'
                '<div class="lab w">reversed · white on ink</div></div>')
    # C: one colour black
    body.append('<div class="card" style="left:40px;top:492px;width:360px;height:468px">'
                '<img src="../primary-logo-black.svg" style="left:30px;top:44px;width:300px">'
                '<img src="../logo-stacked-black.svg" style="left:78px;top:128px;width:204px">'
                '<img src="../symbol-black.svg" style="left:128px;top:338px;width:0">'
                '<div class="lab">one colour · black</div></div>')
    # D: social avatar + tabs
    body.append(f'<div class="card" style="left:420px;top:492px;width:360px;height:468px">'
                f'<img src="../symbol-avatar.svg" style="left:70px;top:34px;width:220px;height:220px;border-radius:50%">'
                f'<div style="position:absolute;left:34px;top:280px;width:292px;height:44px;border-radius:22px;background:{WASH}"></div>'
                f'<img src="../symbol-avatar.svg" style="left:40px;top:286px;width:32px;height:32px;border-radius:50%">'
                f'<div style="position:absolute;left:82px;top:290px;font:800 14px \'Nunito Sans\';">playbeforepixels</div>'
                f'<div style="position:absolute;left:82px;top:306px;font-size:11px;opacity:.6">paper, talk and play for ages 0-12</div>'
                # light and dark browser tabs with the favicon at true size
                f'<div style="position:absolute;left:34px;top:344px;width:292px;height:34px;background:#DEE1E6;border-radius:8px 8px 0 0"></div>'
                f'<div style="position:absolute;left:42px;top:350px;width:180px;height:28px;background:#fff;border-radius:8px 8px 0 0"></div>'
                f'<img src="_render/fav-16-light.png" style="left:52px;top:356px;width:16px;height:16px">'
                f'<div style="position:absolute;left:76px;top:356px;font-size:12px">Play Before Pixels</div>'
                f'<div style="position:absolute;left:34px;top:384px;width:292px;height:34px;background:#202124;border-radius:8px 8px 0 0"></div>'
                f'<div style="position:absolute;left:42px;top:390px;width:180px;height:28px;background:#35363A;border-radius:8px 8px 0 0"></div>'
                f'<img src="_render/fav-16-dark.png" style="left:52px;top:396px;width:16px;height:16px">'
                f'<div style="position:absolute;left:76px;top:396px;font-size:12px;color:#E8EAED">Play Before Pixels</div>'
                '<div class="lab">social avatar · browser tabs (actual size)</div></div>')
    # E: book spines, logo 0.5 in tall, shown at 2x
    spines = ''
    for i, (bg, fg, logo, title) in enumerate([(TOMATO, PAPER, 'logo-stacked-white.svg', 'Up! Go! More!'),
                                              (SUN_T, INK, 'logo-stacked.svg', 'The Day the Tablet Slept'),
                                              (SKY, PAPER, 'logo-stacked-white.svg', 'Whose Lap Today?')]):
        spines += (f'<div class="spine" style="left:{30 + i*104}px;height:{360 - i*18}px;background:{bg};zoom:1">'
                   f'<div class="t" style="color:{fg};top:{120 - i*9}px">{title}</div>'
                   f'<img src="../{logo}" style="left:50%;transform:translateX(-50%);bottom:0.14in;height:0.5in;{"" if logo != "logo-stacked.svg" else ""}"></div>')
    body.append(f'<div class="card" style="left:800px;top:492px;width:360px;height:468px;background:#fff">'
                f'<div style="position:absolute;left:0;top:0;width:360px;height:410px;zoom:1">'
                f'<div style="position:absolute;left:24px;top:30px;width:330px;height:380px;transform:scale(1);">{spines}</div>'
                f'<div style="position:absolute;left:18px;top:410px;width:324px;height:6px;background:{INK};opacity:.18;border-radius:3px"></div></div>'
                '<div class="lab">book spines · logo 0.5 in tall, 2× zoom</div></div>')
    # F: tote bag, embroidered
    body.append(f'<div class="card" style="left:1180px;top:492px;width:380px;height:468px;background:{WASH};box-shadow:inset 0 0 0 1px #e3e8f0">'
                f'<div style="position:absolute;left:110px;top:30px;width:160px;height:150px;border:18px solid {SUN_T};border-bottom:none;border-radius:80px 80px 0 0;box-sizing:border-box"></div>'
                f'<div style="position:absolute;left:62px;top:120px;width:256px;height:290px;background:{SUN_T};border-radius:6px"></div>'
                f'<img src="../logo-stacked.svg" style="left:120px;top:190px;width:140px">'
                '<div class="lab">tote · embroidered, ink thread</div></div>')
    return '<!doctype html><html><head><meta charset="utf-8">' + css + '</head><body>' + ''.join(body) + '</body></html>'


# ---------------------------------------------------------------------------- build
def build():
    files = {}
    one, stk = comp_oneline(), comp_stacked()
    for suf, (ink, ball, bg) in SCHEMES.items():
        files[f'primary-logo{suf}.svg'] = lettering_svg(one, ink, ball, bg)
        files[f'logo-stacked{suf}.svg'] = lettering_svg(stk, ink, ball, bg)
    files['symbol.svg'] = symbol_svg(INK, TOMATO)
    files['symbol-black.svg'] = symbol_svg(BLACK, BLACK)
    files['symbol-reverse.svg'] = symbol_svg(PAPER, TOMATO, bg=INK)
    files['symbol-avatar.svg'] = symbol_svg(INK, TOMATO, bg=SUN_T, side=1080, pad=AVATAR_PAD)   # square file; platforms crop it round
    files['favicon.svg'] = favicon_svg()
    for name, svg in files.items():
        with open(os.path.join(HERE, name), 'w') as fh: fh.write(svg)
    pages(files)
    print('wrote', len(files), 'svg files and the test pages; edit log:', EDIT_LOG[-1])

if __name__ == '__main__':
    build()
