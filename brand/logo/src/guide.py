"""Writes brand/logo/logo-guidelines.html, src/og.html and the blind-test pages in brand/logo/blind-test/.
Run after build.py (rebuild.sh runs everything in order). Every number and colour comes from build.py, so the
guidelines always describe the drawing as it is now."""
import datetime, math, os
import build as B
from build import (f, SEAL, TOP, WORD, WORD_SMALL, LOCKUP, STACK, FAV, CAP, INK, PAPER, WASH, TOMATO, SUN, SKY,
                   SUN_T, TOMATO_T, SKY_T, SCHEMES, NAMES, OUT, HERE, BAND, TILT, EDIT_LOG, ADOPTED)

GOLD = '#C9A227'
BT = os.path.join(OUT, 'blind-test')
band_name = NAMES.get(BAND, BAND)
VERSION = '2.0'
STATUS = ('Adopted' if ADOPTED else
          'Draft: waiting for the founder’s own edits and the parent blind check. Not yet adopted.')

# ============================================================== minimum sizes (one table drives the page)
MIN = [  # version, screen, print, embroidery, stamp / vinyl
    ('Seal with words (mark)', '80 px', '16 mm', '60 mm', '20 mm'),
    ('Small seal, no words (mark-small)', '16 px', '6 mm', '25 mm', '8 mm'),
    ('Horizontal lockup', '160 px wide', '35 mm wide', '90 mm wide', '40 mm wide'),
    ('Stacked lockup', '100 px wide', '22 mm wide', '60 mm wide', '25 mm wide'),
    ('Wordmark', '120 px wide', '25 mm wide', '90 mm wide', '35 mm wide'),
    ('Wordmark, small cut', 'not for screens', '15–25 mm wide', '—', '15 mm wide'),
    ('Favicon (the top alone)', '16 px', '—', '—', '—'),
]


def inline(vb, body, h=None, w=None, style=''):
    size = (f' height="{h}"' if h else '') + (f' width="{w}"' if w else '')
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"{size} style="{style}">{body}</svg>'


def seal_inline(h, scheme='color', S=None, T=None, extra_before='', extra_after=''):
    R = SEAL['R']
    body = extra_before + B.seal(SCHEMES[scheme] if isinstance(scheme, str) else scheme, S=S or SEAL, T=T or TOP) + extra_after
    return inline(f'{-R - 20} {-R - 20} {2 * R + 40} {2 * R + 40}', body, h=h)


# ============================================================== construction
def construction():
    R, cap, edge, inner = SEAL['R'], SEAL['cap'], SEAL['edge'], SEAL['inner']
    r_out = R - edge; r_in = r_out - cap
    dash = f'fill="none" stroke="{TOMATO}" stroke-width="4" stroke-dasharray="14 10"'
    extra = (f'<circle r="{r_out}" {dash}/><circle r="{r_in}" {dash}/>'
             f'<circle r="{r_in - inner}" fill="none" stroke="{SKY_T}" stroke-width="4" stroke-dasharray="4 10"/>')
    return seal_inline(300, extra_after=extra)


def top_anatomy():
    """the top alone, upright, with its parts named"""
    T = dict(TOP, tilt=0); top = B.Top(T)
    m = (1, 0, 0, 1, 0, 0)
    body = top.paint(dict(SCHEMES['color'], handle=INK), m)
    yt = -T['rim'] - T['dome']; ph = yt - T['handle_h']
    lab = lambda x, y, t, a='start': f'<text x="{x}" y="{y + 8}" text-anchor="{a}" class="lab">{t}</text>'
    ln = lambda x1, y1, x2, y2: f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#6B7488" stroke-width="3"/>'
    ann = (ln(70, ph + 60, 300, ph + 60) + lab(310, ph + 70, f'peg {T["handle_w"]} wide, {T["handle_h"]} tall') +
           ln(260, yt + 40, 480, yt + 10) + lab(490, yt + 20, 'round shoulder') +
           ln(T['w'], -T['rim'] / 2, 480, -T['rim'] / 2 + 10) + lab(490, -T['rim'] / 2 + 20, f'painted band ({band_name})') +
           ln(200, 250, 480, 250) + lab(490, 260, 'body: round, no flat faces') +
           ln(0, T['drop'], 480, T['drop'] - 20) + lab(490, T['drop'] - 10, 'softened point'))
    return inline(f'{-T["w"] - 30} {ph - 40} {T["w"] + 1500} {T["drop"] - ph + 80}', body + ann, w=430)


# ============================================================== clear space
def zone(body, x0, y0, w, h, u, h_px=None, w_px=None):
    parts = [f'<rect x="{f(x0 - u)}" y="{f(y0 - u)}" width="{f(w + 2 * u)}" height="{f(h + 2 * u)}" fill="{TOMATO_T}"/>',
             f'<rect x="{f(x0)}" y="{f(y0)}" width="{f(w)}" height="{f(h)}" fill="#fff"/>',
             f'<rect x="{f(x0 - u)}" y="{f(y0 - u)}" width="{f(w + 2 * u)}" height="{f(h + 2 * u)}" fill="none" '
             f'stroke="{TOMATO}" stroke-width="{f(u / 30)}" stroke-dasharray="{f(u / 8)} {f(u / 10)}"/>', body]
    m = u * 0.1
    return inline(f'{f(x0 - u - m)} {f(y0 - u - m)} {f(w + 2 * u + 2 * m)} {f(h + 2 * u + 2 * m)}', ''.join(parts),
                  h=h_px, w=w_px)


def clearspace(kind, h_px=None, w_px=None):
    R = SEAL['R']
    if kind == 'mark':
        return zone(B.seal(SCHEMES['color']), -R, -R, 2 * R, 2 * R, 0.2 * 2 * R, h_px, w_px)
    if kind == 'horizontal':
        body, (x0, y0, w, h), D = B.lockup_parts('color')
        return zone(body, x0, y0, w, h, 0.2 * D, h_px, w_px)
    if kind == 'stacked':
        body, (x0, y0, w, h) = B.stacked_parts('color')
        return zone(body, x0, y0, w, h, 0.2 * STACK['disc'] * CAP, h_px, w_px)
    body, (x0, y0, w, h) = B.wordmark_parts('color')
    return zone(body, x0, y0, w, h, 0.5 * CAP, h_px, w_px)


# ============================================================== don'ts (drawn from the real geometry)
def dont_open_letters():
    return seal_inline(104, S=dict(SEAL, track=250, space=700, pairs={}))


def dont_gold():
    R = SEAL['R']; leaves = ''
    for side in (-1, 1):
        for i in range(7):
            a = math.radians(200 + i * 18) if side < 0 else math.radians(-20 - i * 18)
            x, y = (R + 70) * math.cos(a) * (1 if side > 0 else 1), (R + 70) * math.sin(a) * -1
            leaves += (f'<ellipse cx="{f(x)}" cy="{f(y)}" rx="60" ry="26" fill="{GOLD}" '
                       f'transform="rotate({f(math.degrees(a) + 90)} {f(x)} {f(y)})"/>')
    sc = dict(SCHEMES['color'], disc=GOLD, letters=INK)
    body = leaves + B.seal(sc)
    return inline(f'{-R - 160} {-R - 160} {2 * R + 320} {2 * R + 320}', body, h=104)


def dont_face():
    T = TOP; top = B.Top(T); R = SEAL['R']
    _, _, _, _, m = B.seal_geometry()
    ex = lambda x, y: B.aff(m, (x, y))
    (x1, y1), (x2, y2), (x3, y3), (x4, y4) = ex(-150, 150), ex(150, 150), ex(-110, 240), ex(110, 240)
    k = math.sqrt(abs(m[0] * m[3] - m[1] * m[2]))
    face = (f'<circle cx="{f(x1)}" cy="{f(y1)}" r="{f(34 * k)}" fill="{INK}"/><circle cx="{f(x2)}" cy="{f(y2)}" r="{f(34 * k)}" fill="{INK}"/>'
            f'<path d="M{f(x3)} {f(y3)}Q{f((x3 + x4) / 2)} {f(y3 + 110 * k)} {f(x4)} {f(y4)}" fill="none" stroke="{INK}" stroke-width="{f(22 * k)}" stroke-linecap="round"/>')
    lines = ''.join(f'<path d="M{235 + i * 12} {-40 + i * 80}h{70 - i * 12}" stroke="{PAPER}" stroke-width="18" stroke-linecap="round"/>' for i in range(3))
    return seal_inline(104, extra_after=face + lines)


def dont_dreidel():
    R = SEAL['R']
    # a faceted, four-sided top with a letter-like mark on its face: never
    body = (f'<circle r="{R}" fill="{INK}"/>'
            f'<path d="M-40 -330h80v120h-80z" fill="{PAPER}"/>'
            f'<path d="M-230 -210h460v260l-230 240l-230 -240z" fill="{SKY}"/>'
            f'<path d="M0 -210v500" stroke="#2F6BB0" stroke-width="10"/>'
            f'<path d="M-230 -210h230v260l-230 0z" fill="#5A9BE3"/>'
            f'<path d="M-150 -150h90v40h-50v40h40v40h-40v60h-40z" fill="{PAPER}"/>')
    return inline(f'{-R - 20} {-R - 20} {2 * R + 40} {2 * R + 40}', body, h=104)


def dont_beside():
    R = SEAL['R']
    d, balls, w, (x0, x1, y0, y1) = B.wordmark(B.TITLE, 0, 0, 1.0)
    r = 1.25 * CAP; cx = -r - 0.5 * CAP
    seal = B.seal(SCHEMES['color'], cx=cx, cy=-CAP / 2, k=r / R)
    return inline(f'{cx - r - 60} {-CAP / 2 - r - 60} {x1 - cx + r + 120} {2 * r + 120}',
                  seal + B.word_paint(SCHEMES['color'], d, balls), w=150)


def dont_initials():
    R = SEAL['R']; F = B.word_font(WORD)
    d, balls, w, (x0, x1, y0, y1) = B.wordmark('PB', 0, 0, 1.0)
    k = 560 / (x1 - x0)
    d, balls, w, (x0, x1, y0, y1) = B.wordmark('PB', -280 - x0 * k, CAP * k / 2, k)
    return inline(f'{-R - 20} {-R - 20} {2 * R + 40} {2 * R + 40}', f'<circle r="{R}" fill="{TOMATO}"/><path fill="{PAPER}" d="{d}"/>', h=104)


def dont_recolour():
    sc = dict(SCHEMES['color'], disc=SKY, body=TOMATO, band=INK, letters=INK)
    return seal_inline(104, scheme=sc)


def dont_letters_on_top():
    _, _, _, _, m = B.seal_geometry()
    k = math.sqrt(abs(m[0] * m[3] - m[1] * m[2]))
    cx, cy = B.aff(m, (0, 190))
    d, _, w, (x0, x1, y0, y1) = B.wordmark('P', 0, 0, 1.0)
    s = 230 * k / (y1 - y0)
    d, _, _, _ = B.wordmark('P', cx - s * (x0 + x1) / 2, cy + s * (y1 - y0) / 2, s)
    return seal_inline(104, extra_after=f'<path fill="{PAPER}" d="{d}"/>')


BUSY = ('background: repeating-linear-gradient(45deg, #F5B820 0 18px, #3D86D8 18px 36px, #2FA36B 36px 54px, '
        '#EE5A36 54px 72px);')


def page(n, title, body, kicker=''):
    return f'''<section class="page">
  <header class="run"><span>Play Before Pixels · Logo guidelines</span><span>{'' if ADOPTED else 'Draft · '}{n:02d}</span></header>
  {f'<p class="kicker">{kicker}</p>' if kicker else ''}<h2>{title}</h2>
  {body}
</section>'''


def html():
    R = SEAL['R']; r_out = R - SEAL['edge']; r_in = r_out - SEAL['cap']
    cap_mm = lambda dia: SEAL['cap'] / (2 * R) * dia
    lean = 'stands upright' if TILT == 0 else f'leans {TILT:g}° in the seal (the favicon always stands upright)'
    pages = []
    # 1 cover -----------------------------------------------------------------
    pages.append(f'''<section class="page cover">
  <div class="cover-in">
    <img src="lockup-horizontal.svg" style="width:7.4in">
    <div class="cover-foot">
      <div><p class="big">Logo guidelines</p><p>Version {VERSION} · September 2026</p><p class="status">{STATUS}</p></div>
      <p class="small">© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.</p>
    </div>
  </div>
</section>''')
    # 2 idea + construction -----------------------------------------------------
    pages.append(page(2, 'The Maker’s Seal', f'''
  <div class="two">
    <div>
      <p class="lead">Our logo is a maker’s seal, like the stamp pressed into the bottom of a good wooden toy, with our name around the edge and a spinning top in the middle.</p>
      <p class="lead">A top is one of the oldest toys there is and needs nothing but a child’s hand, which is the whole idea: play comes first.</p>
      <p class="note">The name is part of the mark, so it never has to be decoded, and the only letters anywhere are the words of the name. The top is a toy, not an initial.</p>
      <table class="spec">
        <tr><th>Part</th><th>Units (seal radius 500)</th><th>Notes</th></tr>
        <tr><td>Ring lettering</td><td>caps {SEAL['cap']}, {SEAL['edge']} from the edge, {SEAL['inner']} clear of the top</td><td>Bricolage Grotesque 800, optical size 24. Caps {cap_mm(16):.2f} mm at the 16 mm minimum.</td></tr>
        <tr><td>Two balls</td><td>radius {SEAL['dot_r']}</td><td>Tomato, one in each gap between the words.</td></tr>
        <tr><td>The top</td><td>half-width {TOP['w']}, band {TOP['rim']}, shoulder {TOP['dome']}, body {TOP['drop']}, peg {TOP['handle_w']} × {TOP['handle_h']}</td><td>Sky body, {band_name} band, paper peg. Fills {SEAL['top_fill']:.0%} of the middle and {lean}.</td></tr>
      </table>
    </div>
    <div class="stackc">{construction()}{top_anatomy()}</div>
  </div>''', kicker='The idea'))
    # 3 family -----------------------------------------------------------------
    pages.append(page(3, 'The logo family', f'''
  <div class="grid fam">
    <figure><div class="tile"><img src="lockup-horizontal.svg" style="width:4.3in"></div><figcaption><b>Horizontal lockup</b> · the default. Site header, letterhead, email, hang tags. The small seal carries no words, so the name appears once.</figcaption></figure>
    <figure><div class="tile tile-row"><img src="mark.svg" style="height:1.75in"><img src="mark-small.svg" style="height:.9in"></div><figcaption><b>Seal</b> (mark.svg, left) · avatars at 80 px and up, stickers, book spines and back covers, merch. <b>Small seal</b> (mark-small.svg, right) · the same seal without words, for anything under 80 px or 16 mm.</figcaption></figure>
    <figure><div class="tile"><img src="lockup-stacked.svg" style="height:1.85in"></div><figcaption><b>Stacked lockup</b> · square spaces: tote fronts, sticker sheets, the About page.</figcaption></figure>
    <figure><div class="tile tile-col"><img src="wordmark.svg" style="width:3.9in"><img src="wordmark-small.svg" style="width:1.6in"></div><figcaption><b>Wordmark</b> · where a seal will not fit: footers, spines, labels. The <b>small cut</b> (below) opens the letters up for anything under 25 mm wide.</figcaption></figure>
  </div>
  <p class="note">The favicon is the top alone, redrawn on a 16-pixel grid (page 7). Nowhere else does the top appear without its disc.</p>''', kicker='What to use where'))
    # 4 clear space ------------------------------------------------------------
    pages.append(page(4, 'Clear space', f'''
  <p class="body">Keep the shaded zone clear of text, edges, other logos and busy photo detail. <b>With a seal:</b> one fifth of the seal’s diameter all round (in the lockups, one fifth of the small seal). <b>Wordmark alone:</b> half the height of its capital P. The files are cropped to the artwork, so add this space yourself.</p>
  <div class="grid cs">
    <figure>{clearspace('mark', h_px=220)}<figcaption>Seal</figcaption></figure>
    <figure>{clearspace('stacked', h_px=260)}<figcaption>Stacked lockup</figcaption></figure>
    <figure>{clearspace('horizontal', w_px=430)}<figcaption>Horizontal lockup</figcaption></figure>
    <figure>{clearspace('wordmark', w_px=430)}<figcaption>Wordmark</figcaption></figure>
  </div>''', kicker='Room to breathe'))
    # 5 minimum sizes ----------------------------------------------------------
    rows = ''.join(f'<tr><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td></tr>' for a, b, c, d, e in MIN)
    pages.append(page(5, 'Minimum sizes', f'''
  <div class="two">
  <table class="spec">
    <tr><th>Version</th><th>Screen</th><th>Print</th><th>Embroidery</th><th>Stamp / vinyl</th></tr>{rows}
  </table>
  <div>
    <p class="body"><b>Seal with words: 80 px on screen, 16 mm in print.</b> At 16 mm the capitals are {cap_mm(16):.2f} mm tall, safely above the 1.2 mm print limit. Anything smaller uses the small seal.</p>
    <p class="body"><b>Embroidery:</b> the seal with words from 60 mm ({cap_mm(60):.1f} mm capitals); ask the embroiderer to check the letter gaps. The small seal from 25 mm. One-colour stitching uses the black or white files, which keep the band as a stencil stripe.</p>
    <p class="body"><b>Small cut of the wordmark:</b> Bricolage’s optical size 14, tracking +30, word space 226, so the heavy letters do not fill in on spines and labels.</p>
    <p class="note">Rebuilding prints the smallest gaps at every one of these sizes, so an edit that closes a gap shows at once.</p>
  </div>
  </div>
  <p class="kicker" style="margin-top:.2in">Actual size on screen (96 dpi)</p>
  <div class="actual">
    <div><img src="mark.svg" style="height:80px"><span>seal 80 px</span></div>
    <div><img src="mark-small.svg" style="height:32px"><span>small seal 32 px</span></div>
    <div><img src="mark-small.svg" style="height:16px"><span>16 px</span></div>
    <div><img src="mark-small-black.svg" style="height:16px"><span>16 px one colour</span></div>
    <div><img src="favicon.svg" style="height:16px;width:16px"><span>favicon 16 px</span></div>
    <div><img src="lockup-horizontal.svg" style="width:160px"><span>lockup 160 px</span></div>
    <div><img src="lockup-stacked.svg" style="width:100px"><span>stacked 100 px</span></div>
    <div><img src="wordmark.svg" style="width:120px"><span>wordmark 120 px</span></div>
  </div>''', kicker='Small, not smaller'))
    # 6 colour -----------------------------------------------------------------
    sw = lambda c, n: f'<div class="sw"><i style="background:{c}"></i><b>{n}</b><span>{c}</span></div>'
    def ct(bg, src, label, border=False, h=120):
        return (f'<figure><div class="ctile" style="background:{bg};{"border:1px solid #d9dee8;" if border else ""}">'
                f'<img src="{src}" style="height:{h}px"></div><figcaption>{label}</figcaption></figure>')
    pages.append(page(6, 'Colour versions', f'''
  <div class="swatches">{sw(INK, 'Ink')}{sw(SKY, 'Sky')}{sw(BAND, band_name.capitalize() + ' (band)') if BAND not in (TOMATO,) else ''}{sw(TOMATO, 'Tomato')}{sw(PAPER, 'Paper')}{sw(WASH, 'Wash')}</div>
  <div class="grid colors">
    {ct(PAPER, 'mark.svg', '<b>Full colour</b> · ink disc, paper letters, on paper and light tints', True)}
    {ct(WASH, 'mark.svg', 'On wash and pale tints')}
    {ct(INK, 'mark-reverse.svg', '<b>Reverse</b> · on ink: paper disc, ink letters')}
    {ct(SKY, 'mark-white.svg', 'On sky or tomato: <b>one-colour white</b>')}
    {ct(BUSY.replace('background: ', ''), 'mark-sticker.svg', '<b>Sticker</b> · white die-cut border for photos and busy grounds')}
    {ct(PAPER, 'mark-black.svg', '<b>One colour black</b> · stamps, embroidery, vinyl, newsprint', True)}
    {ct('#111', 'mark-white.svg', '<b>One colour white</b> · dark garments, laser-etch, vinyl')}
    {ct(PAPER, 'lockup-horizontal.svg', 'Lockup on paper', True, 60)}
    {ct(INK, 'lockup-horizontal-reverse.svg', 'Lockup reversed on ink', False, 60)}
    {ct(PAPER, 'lockup-horizontal-black.svg', 'Lockup, one colour', True, 60)}
  </div>
  <p class="note">The disc is only ever ink or paper, or black or white in one colour: never sky, tomato, sun yellow or gold. The one-colour files are single even-odd paths: every letter, ball and the top are true holes, and the band is a stencil stripe that stops short of each edge, so the top never falls apart when it is cut from vinyl or stitched.</p>''', kicker='Colour'))
    # 7 screens and social -----------------------------------------------------
    pages.append(page(7, 'Screens and social', f'''
  <div class="grid apps">
    <figure><div class="tab light"><img src="favicon.svg" width="16" height="16"><span>Play Before Pixels</span></div>
      <div class="tab dark"><img src="favicon.svg" width="16" height="16"><span>Play Before Pixels</span></div>
      <figcaption><b>Favicon</b> · the top alone, upright, drawn on a 16-pixel grid: a square tomato peg, a band on whole pixels. Its colours are fixed and each keeps at least 3.4:1 contrast on a white tab and 4.3:1 on a dark tab, so it never disappears. PNG and ICO fallbacks: png/favicon-16/32/48.png, favicon.ico.</figcaption></figure>
    <figure><div class="zoomrow"><img src="png/favicon-16.png" class="px" width="96"><img src="png/favicon-32.png" class="px" width="96"><img src="png/apple-touch-icon-180.png" width="96" style="border-radius:22px"></div>
      <figcaption>16 px and 32 px (enlarged to show the pixels) and the 180 px home-screen icon.</figcaption></figure>
    <figure><div class="zoomrow"><img src="social-avatar-1080.png" width="140" style="border-radius:50%"><img src="mark.svg" width="140"></div>
      <figcaption><b>Social avatar</b> (left) · the small seal full bleed, so a round crop lands on its own edge. Where a profile picture shows at 80 px or more, the seal with words (right) may be used instead.</figcaption></figure>
    <figure class="wide2"><img src="og-image-1200x630.png" style="width:4.4in;border:1px solid #e3e7ef"><figcaption><b>Link preview</b> · og-image-1200x630.png.</figcaption></figure>
  </div>''', kicker='In use'))
    # 8 books and merch --------------------------------------------------------
    pages.append(page(8, 'Books and merch', f'''
  <div class="books">
    <figure><div class="book back"><div class="bl"></div><div class="bl s"></div><div class="bl"></div><div class="bl s"></div>
        <img src="mark.svg" class="bseal"><div class="bar"></div></div>
      <figcaption><b>Back cover</b> · the seal at the foot, in the same place on every book, like a publisher’s imprint. 16 mm or larger.</figcaption></figure>
    <figure><div class="spine"><img src="mark-small.svg" style="width:34px"><img src="wordmark-small.svg" class="rot"></div>
      <figcaption><b>Spine</b> · the small seal and the small-cut wordmark reading top to bottom. The seal with words only on spines wide enough for 16 mm.</figcaption></figure>
    <figure><div class="book front"><div class="title"></div><div class="title s"></div><img src="mark.svg" class="fseal"><div class="x"></div></div>
      <figcaption><b>Never on the front cover, upper right.</b> That is where award medals go. A round seal there can pass for an award, which misleads buyers.</figcaption></figure>
    <figure><div class="tote"><img src="lockup-stacked.svg" style="width:118px"></div>
      <figcaption><b>Tote and sticker sheet</b> · the stacked lockup, or the seal on its own. One-colour files for stitching and vinyl.</figcaption></figure>
  </div>
  <ul class="rules">
    <li>Never print the seal in gold, foil or sun yellow, and never add laurels, ribbons, stars or a starburst edge. It is a maker’s stamp, not a medal.</li>
    <li>Spine or back cover only on books; on printables, the footer; on merch, wherever the product template puts it.</li>
    <li>Never set the seal and the wordmark side by side: the name would appear twice. The lockups pair the small seal with the name.</li>
  </ul>''', kicker='Placement'))
    # 9 do / don't ---------------------------------------------------------------
    def do(inner, cap, ok, style=''):
        return (f'<figure class="dd {"ok" if ok else "no"}"><div class="ddt" style="{style}">{inner}</div>'
                f'<figcaption><b>{"Do" if ok else "Don’t"}</b> · {cap}</figcaption></figure>')
    pages.append(page(9, 'Do and don’t', f'''
  <div class="grid dos">
    {do('<img src="mark.svg" style="height:104px">', 'use the supplied files as they are', True)}
    {do('<img src="mark-reverse.svg" style="height:104px">', 'reverse on ink with the paper disc', True, 'background:' + INK)}
    {do('<img src="mark-sticker.svg" style="height:104px">', 'use the sticker on photos and patterns', True, BUSY)}
    {do('<img src="mark-black.svg" style="height:104px">', 'use one colour for stamps, vinyl and stitching', True)}
    {do(dont_open_letters(), 'open up or separate the lettering so it can misread', False)}
    {do('<img src="mark.svg" style="height:104px;transform:scaleX(1.4)">', 'stretch, squash or skew', False)}
    {do('<img src="mark.svg" style="height:104px;transform:rotate(-24deg)">', 'rotate the seal', False)}
    {do(dont_recolour(), 'recolour the disc, the top or the letters', False)}
    {do(dont_gold(), 'use gold, foil, sun yellow or laurels (award medal)', False)}
    {do(dont_dreidel(), 'draw the top faceted or four-sided, or put letters or symbols on it', False)}
    {do(dont_face(), 'give the top a face, motion lines or a swoosh', False)}
    {do(dont_letters_on_top(), 'put an initial on the top or in the disc', False)}
    {do(dont_initials(), 'use initials: no PB, BP, PP or pbp', False)}
    {do(dont_beside(), 'set the seal beside the wordmark', False)}
    {do('<span class="fake">Play Before Pixels</span>', 'retype the name: the wordmark is drawn, not typed', False)}
  </div>
  <p class="note"><b>Why no initials.</b> PB reads as PBS, as “peanut butter” (a nut-allergy word in classrooms) and as Pb, the symbol for lead. BP is an oil company. PP is ruled out by BRAND.md. pbp is built from b and p, the mirror-image pair early readers mix up.</p>''', kicker='Keep it the same everywhere'))
    # 10 files + next steps ------------------------------------------------------
    pages.append(page(10, 'Files and next steps', f'''
  <div class="two">
  <div>
  <table class="spec files">
    <tr><th>File</th><th>Use</th></tr>
    <tr><td>mark.svg (+ -reverse, -black, -white)</td><td>The seal with words</td></tr>
    <tr><td>mark-small.svg (+ -reverse, -black, -white)</td><td>The small seal, no words</td></tr>
    <tr><td>mark-sticker.svg</td><td>Die-cut sticker, photos, busy grounds</td></tr>
    <tr><td>lockup-horizontal / lockup-stacked (.svg, 4 versions each)</td><td>Small seal + name</td></tr>
    <tr><td>wordmark.svg, wordmark-small.svg (4 versions each)</td><td>The name alone; small cut under 25 mm</td></tr>
    <tr><td>favicon.svg · favicon.ico · png/favicon-16/32/48.png</td><td>Browser tab</td></tr>
    <tr><td>png/apple-touch-icon-180.png</td><td>Phone home screen</td></tr>
    <tr><td>png/mark-512/1024.png and variants</td><td>Marketplace and profile images</td></tr>
    <tr><td>png/…-2400.png</td><td>Lockups and wordmark, 2400 px wide, transparent</td></tr>
    <tr><td>social-avatar-1080.png · og-image-1200x630.png</td><td>Social profiles · link previews</td></tr>
    <tr><td>src/build.py · src/rebuild.sh</td><td>Every file, rebuilt from the numbers at the top of build.py</td></tr>
  </table>
  </div>
  <div>
    <p class="kicker">Before the logo is adopted</p>
    <ol class="steps">
      <li>The founder makes her own dated edits in src/build.py (the band colour, the lean and at least one choice of her own), rebuilds, and logs each one.</li>
      <li>Blind check: show blind-test/test-small.png, as a real browser tab, to 5–10 parents who have never seen the brand and ask “what is this?”. Adopt only if most say “spinning top” or “toy” and nobody names a letter.</li>
    </ol>
    <p class="kicker" style="margin-top:.16in">Before filing or printing in bulk</p>
    <ol class="steps">
      <li>Reverse-image search of mark.svg, mark-small.svg and favicon.svg.</li>
      <li>USPTO design-code search (toys and tops; circles with lettering, 26.01) in classes 9, 16, 25, 28, 35 and 41, then an attorney’s knockout search.</li>
      <li>File in AlphaPlay LLC’s name with an attorney as correspondent: the seal with its words, plus the name as a standard-character wordmark. Never the bare top.</li>
    </ol>
  </div>
  </div>''', kicker='The kit'))
    css = '''
@page { size: 11in 8.5in; margin: 0 }
* { box-sizing: border-box }
html, body { margin: 0; background: #F3F6FB; color: #1D2940; font-family: "Nunito Sans", sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact }
.page { width: 11in; height: 8.5in; padding: .55in .65in; background: #fff; position: relative; overflow: hidden; page-break-after: always; margin: 0 auto }
.run { display: flex; justify-content: space-between; font-size: 9pt; letter-spacing: .08em; text-transform: uppercase; color: #6B7488; font-weight: 700; margin-bottom: .22in }
.kicker { font-size: 9pt; letter-spacing: .1em; text-transform: uppercase; color: #C8452A; font-weight: 800; margin: 0 0 .04in }
h2 { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 30pt; margin: 0 0 .2in; letter-spacing: -.01em }
.lead { font-size: 13.5pt; line-height: 1.45; margin: 0 0 .12in }
.stackc { display: flex; flex-direction: column; align-items: center; gap: .15in }
.body { font-size: 10.5pt; line-height: 1.5; margin: 0 0 .1in }
.note { font-size: 10pt; line-height: 1.5; color: #4A5468; margin: .1in 0 0 }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: .4in; align-items: start }
.center { display: flex; justify-content: center }
.lab { font: 700 50px "Nunito Sans", sans-serif; fill: #4A5468 }
table.spec { border-collapse: collapse; width: 100%; font-size: 9.5pt; margin-top: .12in }
.spec th { text-align: left; font-size: 8pt; letter-spacing: .06em; text-transform: uppercase; color: #6B7488; border-bottom: 2px solid #1D2940; padding: 5px 8px 5px 0 }
.spec td { border-bottom: 1px solid #E3E7EF; padding: 5px 8px 5px 0; vertical-align: top }
.grid { display: grid; gap: .2in }
figure { margin: 0 }
figcaption { font-size: 9.5pt; line-height: 1.4; color: #4A5468; margin-top: .08in }
.fam { grid-template-columns: 1fr 1fr }
.tile { background: #F3F6FB; height: 2.2in; display: flex; align-items: center; justify-content: center; border-radius: 10px }
.tile-row { gap: .45in }
.tile-col { flex-direction: column; gap: .3in }
.cs { grid-template-columns: 1fr 1fr; align-items: end; gap: .18in .4in }
.cs figure { display: flex; flex-direction: column; align-items: flex-start }
.actual { display: flex; gap: .2in; align-items: flex-end; background: #F3F6FB; padding: .2in .25in; border-radius: 10px }
.actual div { display: flex; flex-direction: column; align-items: center; gap: 6px }
.actual span { font-size: 8.5pt; color: #6B7488; white-space: nowrap }
.swatches { display: flex; gap: .2in; margin-bottom: .16in }
.sw { display: flex; align-items: center; gap: 6px; font-size: 9pt }
.sw i { width: 22px; height: 22px; border-radius: 50%; border: 1px solid #d9dee8; display: inline-block }
.sw span { color: #6B7488 }
.colors { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: .16in }
.ctile { height: 1.55in; border-radius: 10px; display: flex; align-items: center; justify-content: center; overflow: hidden }
.ctile img { max-width: 90% }
.apps { grid-template-columns: 1fr 1fr 1fr; align-items: start }
.apps .wide2 { grid-column: 1 / span 2 }
.tab { display: flex; align-items: center; gap: 8px; padding: 9px 12px; border-radius: 9px 9px 0 0; width: 2.6in; font-size: 10pt; margin-bottom: .1in }
.tab.dark { background: #35363A; color: #E8EAED; box-shadow: 0 0 0 8px #202124 } .tab.light { background: #FFFFFF; color: #1D2940; box-shadow: 0 0 0 8px #DEE1E6 }
.tab.dark { margin-top: .22in }
.zoomrow { display: flex; gap: .16in; align-items: center }
img.px { image-rendering: pixelated; border: 1px solid #E3E7EF }
.books { display: grid; grid-template-columns: 1.1fr .55fr 1.1fr 1fr; gap: .3in; align-items: start }
.book { display: flow-root; position: relative; width: 2.1in; height: 2.6in; border-radius: 3px 8px 8px 3px; box-shadow: inset 6px 0 0 rgba(29,41,64,.08) }
.book.back { background: #FEF4D8 } .book.front { background: #E3EEFA }
.bl { height: 7px; background: #1D2940; opacity: .18; border-radius: 4px; margin: 14px 18px 0; width: 70% } .bl.s { width: 50% }
.bseal { position: absolute; left: .22in; bottom: .2in; width: .63in }
.bar { position: absolute; right: 12px; bottom: 12px; width: .7in; height: .42in; background: #fff; border: 1px solid #c9ced8 }
.title { height: 16px; width: 60%; background: #1D2940; opacity: .8; border-radius: 4px; margin: 1.4in 0 0 18px } .title.s { width: 40%; margin-top: 10px; opacity: .4 }
.fseal { position: absolute; right: 12px; top: 12px; width: .63in }
.x { position: absolute; right: 2px; top: 2px; width: .85in; height: .85in; border: 4px solid #C8452A; border-radius: 50% }
.x:after { content: ""; position: absolute; left: 50%; top: -4px; bottom: -4px; width: 4px; background: #C8452A; transform: rotate(45deg) }
.spine { width: .6in; height: 2.6in; background: #FDE9E3; border-radius: 3px; display: flex; flex-direction: column; align-items: center; padding-top: 12px; gap: 18px; overflow: hidden }
.rot { width: 1.5in; transform: rotate(90deg); transform-origin: center; margin-top: .62in }
.tote { width: 2.1in; height: 2.6in; background: #EEE5D1; border-radius: 6px; display: flex; align-items: center; justify-content: center }
.rules { font-size: 10pt; line-height: 1.5; margin: .25in 0 0; padding-left: 1.2em } .rules li { margin-bottom: .05in }
.dos { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: .12in .16in }
.ddt { height: 1.3in; background: #F3F6FB; border-radius: 10px; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative }
.ddt svg { max-height: 104px; max-width: 88% } .ddt img { max-height: 104px; max-width: 88% }
.dd figcaption { font-size: 8.5pt; margin-top: .05in }
.dd.ok .ddt { box-shadow: inset 0 0 0 3px #2FA36B } .dd.no .ddt { box-shadow: inset 0 0 0 3px #C8452A }
.dd.ok b { color: #1F7A4F } .dd.no b { color: #B03A1E }
.fake { font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 13pt; text-align: center; color: #1D2940 }
.files td:first-child { font-family: ui-monospace, monospace; font-size: 8pt; padding-right: 14px }
.steps { font-size: 10pt; line-height: 1.45; padding-left: 1.2em; margin: .06in 0 0 } .steps li { margin-bottom: .06in }
.cover { background: #F3F6FB; display: flex; align-items: center; justify-content: center }
.cover-in { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 0 .3in; position: relative }
.cover-foot { position: absolute; left: .3in; right: .3in; bottom: .1in; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10pt }
.cover-foot p { margin: 0 } .cover-foot .big { font-family: "Bricolage Grotesque"; font-weight: 800; font-size: 20pt }
.cover-foot .status { margin-top: 6px; font-weight: 700; color: #B03A1E }
.cover-foot .small { font-size: 8.5pt; color: #4A5468 }
.span2 { grid-column: span 1 }
@media screen { .page { margin: 24px auto; box-shadow: 0 1px 4px rgba(29,41,64,.12) } }
'''
    doc = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Logo Guidelines</title>
<link rel="stylesheet" href="../fonts/fonts.css">
<style>{css}</style></head><body>
{''.join(pages)}
</body></html>
'''
    with open(os.path.join(OUT, 'logo-guidelines.html'), 'w') as fh:
        fh.write(doc)


def og():
    doc = f'''<!doctype html><html><head><meta charset="utf-8"><title>Play Before Pixels</title>
<link rel="stylesheet" href="../../fonts/fonts.css">
<style>html,body{{margin:0}} body{{width:1200px;height:630px;background:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;box-sizing:border-box;overflow:hidden;font-family:"Bricolage Grotesque",sans-serif;color:{INK}}}
p{{font-weight:700;font-size:48px;letter-spacing:-.01em;margin:46px 0 0;display:flex;align-items:baseline}}
p i{{display:inline-block;width:14px;height:14px;border-radius:50%;background:{TOMATO};margin-left:4px}}</style></head>
<body><img src="../lockup-horizontal.svg" style="width:820px"><p>Talk, touch and play come first<i></i></p></body></html>'''
    with open(os.path.join(HERE, 'og.html'), 'w') as fh:
        fh.write(doc)


def blind_tests():
    """Pages for the parent blind check. No words anywhere except the seal's own (test-large)."""
    os.makedirs(BT, exist_ok=True)
    head = '<!doctype html><html><head><meta charset="utf-8"><style>*{box-sizing:border-box;margin:0;padding:0}' \
           'html,body{background:#fff;overflow:hidden}img{display:block}.px{image-rendering:pixelated}'

    def tab(theme):
        strip, tabbg, bar = (('#DEE1E6', '#FFFFFF', '#C4C8CE') if theme == 'light' else ('#202124', '#35363A', '#5F6368'))
        return f'''<div class="col" style="background:{'#FFFFFF' if theme == 'light' else '#202124'}">
  <div class="strip" style="background:{strip}"><div class="tab" style="background:{tabbg}"><img src="px/fav16-{theme}.png" width="16" height="16"><i style="background:{bar}"></i></div>
    <div class="tab ghost"><b style="background:{bar}"></b><i style="background:{bar};width:52px"></i></div></div>
  <div class="zoom"><img class="px" src="px/fav16-{theme}.png" style="width:128px;height:128px"><img class="px" src="px/fav32-{theme}.png" style="width:128px;height:128px"></div>
  <div class="true"><img src="px/fav16-{theme}.png" width="16" height="16"><img src="px/fav32-{theme}.png" width="32" height="32"></div></div>'''
    css = ('.col{float:left;width:320px;height:360px}.strip{height:44px;padding:8px 0 0 10px;display:flex;gap:4px}'
           '.tab{height:36px;width:170px;border-radius:8px 8px 0 0;display:flex;align-items:center;gap:9px;padding:0 12px}'
           '.tab i{display:block;height:7px;width:96px;border-radius:4px}.tab.ghost{width:110px;background:transparent}'
           '.tab.ghost b{display:block;width:16px;height:16px;border-radius:50%}'
           '.zoom{display:flex;gap:24px;justify-content:center;margin-top:34px}'
           '.true{display:flex;gap:20px;align-items:center;justify-content:center;margin-top:30px}</style></head>')
    with open(os.path.join(BT, 'test-small.html'), 'w') as fh:
        fh.write(head + css + '<body>' + tab('light') + tab('dark') + '</body></html>')
    with open(os.path.join(BT, 'test-large.html'), 'w') as fh:
        fh.write(head + '</style></head><body><img src="../mark.svg" style="width:432px;height:432px;margin:40px"></body></html>')
    with open(os.path.join(BT, 'test-logo.html'), 'w') as fh:
        fh.write(head + '</style></head><body style="width:1600px;height:400px;display:flex;align-items:center;justify-content:center">'
                 '<img src="../lockup-horizontal.svg" style="width:1400px"></body></html>')
    # a real tab: open this file in a browser and show the tab strip. The title is neutral on purpose.
    with open(os.path.join(BT, 'tab.html'), 'w') as fh:
        fh.write('<!doctype html><html><head><meta charset="utf-8"><title>Home</title>'
                 '<link rel="icon" href="../favicon.svg" type="image/svg+xml">'
                 '<link rel="icon" href="../png/favicon-32.png" sizes="32x32" type="image/png">'
                 '<style>html,body{margin:0;height:100%;background:#fff}</style></head><body></body></html>\n')


if __name__ == '__main__':
    html(); og(); blind_tests(); print('guidelines, og page and blind-test pages written')
