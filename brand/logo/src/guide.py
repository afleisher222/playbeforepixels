"""Writes logo-guidelines.html, og.html and the helper SVGs used by them. Run after build.py."""
import os, math
from build import (mark, words, circles, hull, f, MARK, SMALL, CAP, BALL_I, OUT, HERE, gaps,
                   comp_horizontal, comp_stacked, comp_wordmark, INK, PAPER, WASH, TOMATO, SUN, SKY,
                   SUN_T, TOMATO_T, SKY_T)

GRASS, PLUM = '#2FA36B', '#8A5CC7'
X = 2 * MARK['rb']

def inline(vb, body, h=None, w=None, style=''):
    size = (f'height="{h}"' if h else '') + (f' width="{w}"' if w else '')
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" {size} style="{style}">{body}</svg>'

def art(d, balls, ink=INK, acc=TOMATO):
    return f'<path fill="{ink}" d="{d}"/><g fill="{acc}">{circles(balls)}</g>'

def mark_inline(h, ink=INK, acc=TOMATO, cut=None, pad=40, extra='', style=''):
    d, b, (w, hh) = mark(cut=cut)
    return inline(f'{-pad} {-pad} {f(w+2*pad)} {f(hh+2*pad)}', extra + art(d, [b], ink, acc), h=h, style=style)

# ---------------------------------------------------------------- construction diagram
def construction():
    k = MARK; d, b, (w, h) = mark()
    Ro, Wb, bx = k['Ro'], k['Wb'], k['bx']; Rc = Ro - Wb/2; Ri = Ro - Wb; cy = Ro
    g1, g2 = gaps(MARK)
    blue = SKY
    body = [f'<path fill="{INK}" opacity=".92" d="{d}"/>',
            f'<circle cx="{f(b[0])}" cy="{f(b[1])}" r="{f(b[2])}" fill="{TOMATO}"/>',
            f'<circle cx="{bx}" cy="{cy}" r="{Ro}" fill="none" stroke="{blue}" stroke-width="3" stroke-dasharray="10 8"/>',
            f'<circle cx="{bx}" cy="{cy}" r="{Rc}" fill="none" stroke="{TOMATO}" stroke-width="3" stroke-dasharray="4 7"/>',
            f'<circle cx="{bx}" cy="{cy}" r="7" fill="{blue}"/>',
            # stem width
            f'<line x1="0" y1="700" x2="{k["Ws"]}" y2="700" stroke="{blue}" stroke-width="3"/>',
            f'<text x="{k["Ws"]/2}" y="745" text-anchor="middle" class="lab">stem 162</text>',
            # bowl width
            f'<line x1="{bx}" y1="0" x2="{bx}" y2="{Wb}" stroke="{blue}" stroke-width="3"/>',
            f'<text x="{bx+14}" y="{Wb/2+10}" class="lab lab-w">bowl 140</text>',
            f'<text x="{bx+Ro+24}" y="{cy-40}" class="lab">outer arc r 236</text>',
            f'<text x="{bx+Ro+24}" y="{cy+0}" class="lab" style="fill:{TOMATO}">bowl centre line r 166:</text>',
            f'<text x="{bx+Ro+24}" y="{cy+34}" class="lab" style="fill:{TOMATO}">the ball rides on it</text>',
            f'<text x="{bx+Ro+24}" y="{cy+100}" class="lab">round terminal = half the bowl</text>',
            f'<text x="{bx+Ro+24}" y="{cy+134}" class="lab">ball r 80 · both gaps ≈ 49</text>',
            f'<text x="{bx+Ro+24}" y="{cy+168}" class="lab">(the pause before the return)</text>',
            ]
    return inline(f'-60 -60 {f(w+470)} {f(h+160)}', ''.join(body), h=430)

# ---------------------------------------------------------------- clear space diagrams
def clearspace(kind, h_px):
    if kind == 'mark':
        d, b, (w, h) = mark(); balls = [b]; x0, y0 = 0, 0; unit = X
    elif kind == 'horizontal':
        d, balls, w, h, mw = comp_horizontal(); x0, y0 = 0, 0; unit = X * (h / CAP)
    elif kind == 'stacked':
        d, balls, w, h = comp_stacked(); h = h - 160; x0, y0 = 0, 0; unit = X * 2.0
    else:
        d, balls, w, h, top = comp_wordmark(); x0, y0 = 0, CAP - 736; h = (CAP + 156) - y0; unit = X
    u = unit
    body = [f'<rect x="{f(x0-u)}" y="{f(y0-u)}" width="{f(w+2*u)}" height="{f(h+2*u)}" fill="{TOMATO_T}"/>',
            f'<rect x="{f(x0)}" y="{f(y0)}" width="{f(w)}" height="{f(h)}" fill="#fff"/>',
            f'<rect x="{f(x0-u)}" y="{f(y0-u)}" width="{f(w+2*u)}" height="{f(h+2*u)}" fill="none" stroke="{TOMATO}" stroke-width="{f(u/40)}" stroke-dasharray="{f(u/8)} {f(u/10)}"/>',
            art(d, balls)]
    for cx, cy in ((x0 - u/2, y0 - u/2), (x0 + w + u/2, y0 - u/2), (x0 - u/2, y0 + h + u/2), (x0 + w + u/2, y0 + h + u/2)):
        body.append(f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(u/2)}" fill="none" stroke="{TOMATO}" stroke-width="{f(u/40)}"/>')
    m = u * 0.15
    return inline(f'{f(x0-u-m)} {f(y0-u-m)} {f(w+2*u+2*m)} {f(h+2*u+2*m)}', ''.join(body), h=h_px)

# ---------------------------------------------------------------- don'ts
def dont_bigball():
    d, _, (w, h) = mark()
    return inline(f'-40 -40 {f(w+360)} {f(h+80)}', f'<path fill="{INK}" d="{d}"/><circle cx="{w+130}" cy="{h-190}" r="190" fill="{TOMATO}"/>', h=150)
def dont_circle_p():
    d, b, (w, h) = mark(); s = 0.55; ox = 500 - w*s/2; oy = 500 - h*s/2
    d2, b2, _ = mark(ox, oy, s)
    return inline('0 0 1000 1000', f'<circle cx="500" cy="500" r="500" fill="{TOMATO}"/>' + art(d2, [b2], PAPER, PAPER), h=150)
def dont_recolor():
    return mark_inline(150, ink=SKY, acc=PLUM)
def dont_square_ball():
    d, b, (w, h) = mark(); r = b[2]
    return inline(f'-40 -40 {f(w+80)} {f(h+80)}', f'<path fill="{INK}" d="{d}"/><rect x="{f(b[0]-r)}" y="{f(b[1]-r)}" width="{f(2*r)}" height="{f(2*r)}" fill="{TOMATO}"/>', h=150)
def dont_pplay():
    md, mb, (mw, mh) = mark(0, 0, 1.0)
    d, bs, w = words('Play Before Pixels', mw + 200, CAP)
    return inline(f'-40 -120 {f(mw+200+w+80)} {f(CAP+320)}', art(md + d, [mb] + bs), w=300)
def dont_two_p():
    """a nested big-P/little-p monogram (never: Planned Parenthood's parent-and-child P)"""
    d, b, (w, h) = mark(); d2, b2, _ = mark(w*0.45, h*0.52, 0.45)
    return inline(f'-40 -40 {f(w+80)} {f(h*1.0+80)}', art(d, [b]) + f'<path fill="{TOMATO}" d="{d2}"/>', h=150)

BUSY = ('background: repeating-linear-gradient(45deg, #F5B820 0 18px, #3D86D8 18px 36px, #2FA36B 36px 54px, #EE5A36 54px 72px);')

def page(n, title, body, kicker=''):
    return f'''<section class="page">
  <header class="run"><span>Play Before Pixels · Logo guidelines</span><span>{n:02d}</span></header>
  {f'<p class="kicker">{kicker}</p>' if kicker else ''}<h2>{title}</h2>
  {body}
</section>'''

def html():
    g1, g2 = gaps(MARK); s1, s2 = gaps(SMALL)
    mm = lambda u, H=25.4: f'{u/660*H:.1f}'
    pages = []
    # 1 cover -----------------------------------------------------------------
    pages.append(f'''<section class="page cover">
  <div class="cover-in">
    <img src="lockup-horizontal.svg" style="width:7.2in">
    <div class="cover-foot">
      <div><p class="big">Logo guidelines</p><p>Version 1.0 · September 2026</p></div>
      <p class="small">© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.</p>
    </div>
  </div>
</section>''')
    # 2 idea + construction -------------------------------------------------
    pages.append(page(2, 'The Return', f'''
  <div class="two">
    <div>
      <p class="lead">Our mark is the P of <b>Play</b>. Its square-cut stem curves into an open bowl, and a ball comes back to close it. That is the serve and return of talk and play: a grown-up says something, and a child answers.</p>
      <p class="lead">The small gap before the ball is the pause that gives the child a turn. The same ball dots the i in <b>Pixels</b>, because play comes first.</p>
      <p class="note">The ball is the brand's one device. Use it as a bullet, a page number or a sticker. The tagline's period can be a ball too: <i>Talk, touch and play come first.</i></p>
    </div>
    <div class="center">{construction()}</div>
  </div>
  <table class="spec">
    <tr><th>Part</th><th>Units (cap height 660)</th><th>At 1 in / 25.4 mm tall</th><th>Notes</th></tr>
    <tr><td>Stem</td><td>162</td><td>{mm(162)} mm</td><td>Matches the stem of Bricolage Grotesque 800</td></tr>
    <tr><td>Bowl</td><td>140</td><td>{mm(140)} mm</td><td>Ends in a round terminal as wide as the bowl</td></tr>
    <tr><td>Ball</td><td>r 80 (diameter 160)</td><td>{mm(160)} mm</td><td>Sits on the bowl's centre line, inside the letter</td></tr>
    <tr><td>Gaps (ball to stem, ball to terminal)</td><td>{g1} / {g2}</td><td>{mm(g1)} mm</td><td>Small cut: {s1} / {s2} units ({mm(s1)} mm)</td></tr>
  </table>''', kicker='The idea'))
    # 3 family ------------------------------------------------------------------
    pages.append(page(3, 'The logo family', f'''
  <div class="grid fam">
    <figure><div class="tile"><img src="lockup-horizontal.svg" style="width:4.1in"></div><figcaption><b>Horizontal lockup</b> · the default. Site header, book back covers, letterhead, merch hang tags.</figcaption></figure>
    <figure><div class="tile"><img src="lockup-stacked.svg" style="height:1.75in"></div><figcaption><b>Stacked lockup</b> · square and tall spaces: tote bags, teacher-resource covers, the About page.</figcaption></figure>
    <figure><div class="tile"><img src="wordmark.svg" style="width:4.1in"></div><figcaption><b>Wordmark</b> · one line, where height is tight: book spines, footers, email signatures. The mark's P is set into “Play”.</figcaption></figure>
    <figure><div class="tile tile-row"><img src="mark.svg" style="height:1.5in"><img src="mark-small.svg" style="height:.75in"></div><figcaption><b>Mark</b> (left) and <b>small cut</b> (right) · avatars, favicons, cover corners, stamps. The small cut has heavier strokes and wider gaps for 16–31 px and tiny embroidery.</figcaption></figure>
  </div>
  <p class="note">Never place the mark directly in front of the one-line wordmark (it reads “P Play”). The lockups already pair them.</p>''', kicker='What to use where'))
    # 4 clear space -------------------------------------------------------------
    pages.append(page(4, 'Clear space', f'''
  <p class="body">Keep a clear zone around every version equal to <b>one ball</b>: the diameter of the ball in that artwork. Nothing else (text, edges, other logos, photo detail) goes inside the shaded area. The SVG and PNG files already include half a ball of margin.</p>
  <div class="grid cs">
    <figure>{clearspace('mark', 190)}<figcaption>Mark</figcaption></figure>
    <figure>{clearspace('stacked', 190)}<figcaption>Stacked lockup</figcaption></figure>
    <figure class="wide">{clearspace('horizontal', 150)}<figcaption>Horizontal lockup</figcaption></figure>
    <figure class="wide">{clearspace('wordmark', 90)}<figcaption>Wordmark (the ball on the i sets the unit)</figcaption></figure>
  </div>''', kicker='Room to breathe'))
    # 5 minimum sizes -----------------------------------------------------------
    pages.append(page(5, 'Minimum sizes', f'''
  <div class="two">
  <table class="spec">
    <tr><th>Version</th><th>Screen</th><th>Print</th><th>Embroidery</th><th>Stamp</th></tr>
    <tr><td>Mark</td><td>32 px tall and up</td><td>12 mm tall</td><td>25 mm tall</td><td>12 mm</td></tr>
    <tr><td>Mark, small cut</td><td>16–31 px</td><td>6–12 mm</td><td>16–25 mm</td><td>8–12 mm</td></tr>
    <tr><td>Horizontal lockup</td><td>180 px wide</td><td>40 mm wide</td><td>90 mm wide</td><td>40 mm wide</td></tr>
    <tr><td>Stacked lockup</td><td>110 px wide</td><td>28 mm wide</td><td>60 mm wide</td><td>30 mm wide</td></tr>
    <tr><td>Wordmark</td><td>180 px wide</td><td>40 mm wide</td><td>100 mm wide</td><td>45 mm wide</td></tr>
  </table>
  <div>
    <p class="body">Below 16 px, or below 16 mm when stitched, do not use the mark. Use the name in plain type, or a woven label.</p>
    <p class="body">Gaps at the smallest embroidery size: mark {mm(g1, 25)} mm at 25 mm tall; small cut {mm(s1, 16)} mm at 16 mm tall (1.5 mm is the usual floor). One-colour embroidery and stamps always use the black or white files, never a tint.</p>
    <p class="body">Board-book spine: use the small cut (spines are usually 10–15 mm) with the wordmark rotated to read top to bottom.</p>
  </div>
  </div>
  <p class="kicker" style="margin-top:.2in">Actual size on screen (96 dpi)</p>
  <div class="actual">
    <div><img src="mark.svg" style="height:64px"><span>64 px</span></div>
    <div><img src="mark.svg" style="height:32px"><span>32 px</span></div>
    <div><img src="mark-small.svg" style="height:24px"><span>24 px small cut</span></div>
    <div><img src="mark-small.svg" style="height:16px"><span>16 px small cut</span></div>
    <div><img src="mark-small-black.svg" style="height:16px"><span>16 px one colour</span></div>
    <div><img src="lockup-horizontal.svg" style="width:180px"><span>180 px lockup</span></div>
    <div><img src="lockup-stacked.svg" style="width:110px"><span>110 px stacked</span></div>
  </div>''', kicker='Small, not smaller'))
    # 6 colour ------------------------------------------------------------------
    sw = lambda c, n, h: f'<div class="sw"><i style="background:{c}"></i><b>{n}</b><span>{h}</span></div>'
    def ct(bg, ink, acc, label, border=False):
        return (f'<figure><div class="ctile" style="background:{bg};{"border:1px solid #d9dee8;" if border else ""}">'
                f'{mark_inline(120, ink=ink, acc=acc)}</div><figcaption>{label}</figcaption></figure>')
    pages.append(page(6, 'Colour versions', f'''
  <div class="swatches">{sw(INK,'Ink',INK)}{sw(TOMATO,'Tomato',TOMATO)}{sw(SUN,'Sun',SUN)}{sw(SKY,'Sky',SKY)}{sw(PAPER,'Paper',PAPER)}{sw(SUN_T,'Sun tint',SUN_T)}</div>
  <div class="grid colors">
    {ct(PAPER, INK, TOMATO, '<b>Primary</b> · ink P, tomato ball, on paper', True)}
    {ct(SUN_T, INK, TOMATO, 'On wash and tints (sun tint shown)')}
    {ct(SUN, INK, TOMATO, 'On sun: ink P, tomato ball')}
    {ct(INK, PAPER, TOMATO, '<b>Reverse</b> · on ink: paper P, the ball stays tomato')}
    {ct(TOMATO, PAPER, SUN, 'On tomato: paper P, <b>sun</b> ball')}
    {ct(SKY, PAPER, SUN, 'On sky: paper P, sun ball')}
    {ct(PAPER, '#000', '#000', '<b>One colour black</b> · stamps, embroidery, fax, newsprint', True)}
    {ct('#111', '#fff', '#fff', '<b>One colour white</b> · on dark garments, foil, laser-etch')}
    <figure><div class="ctile" style="{BUSY}"><img src="mark-sticker.svg" style="height:130px"></div><figcaption><b>Sticker</b> · on photos and busy grounds, use the white die-cut version</figcaption></figure>
  </div>
  <p class="note">Grass and plum are not logo grounds: on them, use one-colour white. The ball is only ever tomato, sun, black or white.</p>''', kicker='Colour'))
    # 7 in use --------------------------------------------------------------------
    pages.append(page(7, 'Small screens and social', f'''
  <div class="grid apps">
    <figure><div class="tab dark"><img src="png/favicon-32.png" width="16" height="16"><span>Play Before Pixels</span></div>
      <div class="tab light"><img src="png/favicon-32.png" width="16" height="16"><span>Play Before Pixels</span></div>
      <figcaption><b>Favicon</b> · favicon.svg switches to a paper P in dark mode; the PNG fallbacks (16, 32, 48) sit on a sun-tint tile so they never vanish in a dark tab.</figcaption></figure>
    <figure><div class="zoomrow"><img src="png/favicon-16.png" class="px" width="96"><img src="png/favicon-32.png" class="px" width="96"><img src="png/apple-touch-icon-180.png" width="96" style="border-radius:22px"></div>
      <figcaption>16 px and 32 px (enlarged to show pixels) and the 180 px Apple touch icon.</figcaption></figure>
    <figure><div class="zoomrow"><img src="social-avatar-1080.png" width="150" style="border-radius:50%"><img src="social-avatar-1080.png" width="150" style="border-radius:14px"></div>
      <figcaption><b>Social avatar</b> · ink mark on sun tint. It survives a circle crop. Never a white P in a tomato circle.</figcaption></figure>
    <figure class="wide2"><img src="og-image-1200x630.png" style="width:4.6in;border:1px solid #e3e7ef"><figcaption><b>Link preview</b> (og-image-1200x630.png).</figcaption></figure>
  </div>''', kicker='In use'))
    # 8 do / don't ----------------------------------------------------------------
    def do(inner, cap, ok, style=''):
        return (f'<figure class="dd {"ok" if ok else "no"}"><div class="ddt" style="{style}">{inner}</div>'
                f'<figcaption><b>{"Do" if ok else "Don’t"}</b> · {cap}</figcaption></figure>')
    pages.append(page(8, 'Do and don’t', f'''
  <div class="grid dos">
    {do('<img src="lockup-stacked.svg" style="height:120px">', 'use the supplied files, on paper or a light tint', True)}
    {do('<img src="lockup-stacked-reverse.svg" style="height:120px">', 'reverse on ink; the ball stays tomato', True, 'background:'+INK)}
    {do('<img src="mark-sticker.svg" style="height:120px">', 'use the sticker on photos and patterns', True, BUSY)}
    {do('<img src="mark-black.svg" style="height:110px">', 'use one-colour black for stamps and stitching', True)}
    {do('<img src="mark.svg" style="height:110px;transform:scaleX(1.45)">', 'stretch, squash or skew', False)}
    {do('<img src="mark.svg" style="height:110px;transform:rotate(-14deg)">', 'rotate or tilt', False)}
    {do(dont_recolor(), 'recolour outside the rules', False)}
    {do('<img src="mark.svg" style="height:110px;filter:drop-shadow(6px 8px 0 #F5B820)">', 'add shadows, outlines or effects', False)}
    {do(dont_bigball(), 'enlarge the ball or move it outside the letter', False)}
    {do(dont_circle_p(), 'put a white P in a tomato circle', False)}
    {do(dont_square_ball(), 'swap the ball for a pixel, heart or icon', False)}
    {do(dont_two_p(), 'nest a small p inside the P', False)}
    {do('<span class="fake">Play Before Pixels</span>', 'retype the name; the wordmark is drawn, not typed', False)}
    {do(dont_pplay(), 'put the mark in front of the one-line wordmark', False)}
    {do('<img src="mark.svg" style="height:110px">', 'place the full-colour mark on a busy ground', False, BUSY)}
  </div>''', kicker='Keep it the same everywhere'))
    # 9 files + before filing -------------------------------------------------------
    pages.append(page(9, 'Files and next steps', f'''
  <div class="two">
  <div>
  <table class="spec files">
    <tr><th>File</th><th>Use</th></tr>
    <tr><td>mark · lockup-horizontal · lockup-stacked · wordmark (.svg)</td><td>Full colour on light grounds</td></tr>
    <tr><td>…-reverse.svg</td><td>Full colour on ink or dark grounds</td></tr>
    <tr><td>…-black.svg / …-white.svg</td><td>One colour: stamps, embroidery, foil</td></tr>
    <tr><td>mark-small(-black/-white/-reverse).svg</td><td>16–31 px, 6–12 mm, small stitching</td></tr>
    <tr><td>mark-sticker.svg</td><td>Die-cut sticker, photos, busy grounds</td></tr>
    <tr><td>favicon.svg · png/favicon-16/32/48.png · favicon.ico</td><td>Browser tab</td></tr>
    <tr><td>png/apple-touch-icon-180.png</td><td>iPhone home screen</td></tr>
    <tr><td>png/mark-1024.png, mark-512.png</td><td>Marketplace and app profile images</td></tr>
    <tr><td>png/…-2400.png</td><td>Lockups and wordmark, 2400 px wide, transparent</td></tr>
    <tr><td>social-avatar-1080.png · og-image-1200x630.png</td><td>Social profiles · link previews</td></tr>
    <tr><td>src/build.py · src/guide.py</td><td>Regenerates everything from the numbers</td></tr>
  </table>
  </div>
  <div>
    <p class="kicker">Before the mark is filed or printed in bulk</p>
    <ol class="steps">
      <li>Reverse-image search mark.svg and mark-small.svg (Google Lens, TinEye).</li>
      <li>USPTO design-code search: letter P with circles (codes 27.03, 26.01) in classes 9, 16, 25, 28, 35 and 41, plus a WIPO Global Brand Database image search.</li>
      <li>Compare side by side with Patreon's current mark, Product Hunt and the “P + ball” pickleball stock templates.</li>
      <li>A trademark attorney runs a knockout search, then files the mark together with the wordmark, owned by AlphaPlay LLC.</li>
      <li>The founder makes and dates her own edits (for example ball size, terminal angle or colour) in src/build.py and keeps them in git.</li>
    </ol>
  </div>
  </div>''', kicker='The kit'))
    css = '''
@page { size: 11in 8.5in; margin: 0 }
* { box-sizing: border-box }
html, body { margin: 0; background: #F3F6FB; color: #1D2940; font-family: "Nunito Sans", sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact }
.page { width: 11in; height: 8.5in; padding: .55in .65in; background: #fff; position: relative; overflow: hidden; page-break-after: always; margin: 0 auto }
.run { display: flex; justify-content: space-between; font-size: 9pt; letter-spacing: .08em; text-transform: uppercase; color: #6B7488; font-weight: 700; margin-bottom: .22in }
.kicker { font-size: 9pt; letter-spacing: .1em; text-transform: uppercase; color: #EE5A36; font-weight: 800; margin: 0 0 .04in }
h2 { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 30pt; margin: 0 0 .22in; letter-spacing: -.01em }
.lead { font-size: 15pt; line-height: 1.45; margin: 0 0 .14in }
.body { font-size: 11pt; line-height: 1.5; margin: 0 0 .12in }
.note { font-size: 10.5pt; line-height: 1.5; color: #4A5468; margin: .1in 0 0 }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: .4in; align-items: start }
.center { display: flex; justify-content: center }
.lab { font: 700 26px "Nunito Sans", sans-serif; fill: #3D86D8 }
.lab-w { fill: #fff }
table.spec { border-collapse: collapse; width: 100%; font-size: 10pt; margin-top: .12in }
.spec th { text-align: left; font-size: 8.5pt; letter-spacing: .06em; text-transform: uppercase; color: #6B7488; border-bottom: 2px solid #1D2940; padding: 5px 8px 5px 0 }
.spec td { border-bottom: 1px solid #E3E7EF; padding: 6px 8px 6px 0; vertical-align: top }
.grid { display: grid; gap: .22in }
figure { margin: 0 }
figcaption { font-size: 9.5pt; line-height: 1.4; color: #4A5468; margin-top: .08in }
.fam { grid-template-columns: 1fr 1fr }
.tile { background: #F3F6FB; height: 2.25in; display: flex; align-items: center; justify-content: center; border-radius: 10px }
.tile-row { gap: .5in; align-items: flex-end; padding-bottom: .35in }
.cs { grid-template-columns: 1fr 1fr; align-items: end }
.cs figure { display: flex; flex-direction: column; align-items: flex-start }
.actual { display: flex; gap: .32in; align-items: flex-end; background: #F3F6FB; padding: .2in .25in; border-radius: 10px }
.actual div { display: flex; flex-direction: column; align-items: center; gap: 6px }
.actual span { font-size: 8.5pt; color: #6B7488 }
.swatches { display: flex; gap: .18in; margin-bottom: .16in }
.sw { display: flex; align-items: center; gap: 6px; font-size: 9pt }
.sw i { width: 22px; height: 22px; border-radius: 50%; border: 1px solid #d9dee8; display: inline-block }
.sw span { color: #6B7488 }
.colors { grid-template-columns: repeat(5, 1fr); gap: .16in }
.ctile { height: 1.45in; border-radius: 10px; display: flex; align-items: center; justify-content: center }
.apps { grid-template-columns: 1fr 1fr 1fr; align-items: start }
.apps .wide2 { grid-column: 1 / span 2 }
.tab { display: flex; align-items: center; gap: 8px; padding: 9px 12px; border-radius: 9px 9px 0 0; width: 2.6in; font-size: 10pt; margin-bottom: .1in }
.tab.dark { background: #202124; color: #E8EAED } .tab.light { background: #DEE1E6; color: #1D2940 }
.zoomrow { display: flex; gap: .16in; align-items: center }
img.px { image-rendering: pixelated; border: 1px solid #E3E7EF }
.dos { grid-template-columns: repeat(5, 1fr); gap: .14in .16in }
.ddt { height: 1.3in; background: #F3F6FB; border-radius: 10px; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative }
.dd figcaption { font-size: 8.5pt; margin-top: .05in }
.dd.ok .ddt { box-shadow: inset 0 0 0 3px #2FA36B } .dd.no .ddt { box-shadow: inset 0 0 0 3px #EE5A36 }
.dd.ok b { color: #1F7A4F } .dd.no b { color: #C23E1E }
.fake { font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 17pt; color: #1D2940 }
.files td:first-child { font-family: ui-monospace, monospace; font-size: 8.5pt; padding-right: 14px }
.steps { font-size: 10.5pt; line-height: 1.5; padding-left: 1.2em; margin: .08in 0 0 } .steps li { margin-bottom: .08in }
.cover { background: #FEF4D8; display: flex; align-items: center; justify-content: center }
.cover-in { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 0 .3in; position: relative }
.cover-foot { position: absolute; left: .3in; right: .3in; bottom: .1in; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10pt }
.cover-foot p { margin: 0 } .cover-foot .big { font-family: "Bricolage Grotesque"; font-weight: 800; font-size: 20pt }
.cover-foot .small { font-size: 8.5pt; color: #4A5468 }
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
    open(os.path.join(OUT, 'logo-guidelines.html'), 'w').write(doc)

def og():
    doc = f'''<!doctype html><html><head><meta charset="utf-8"><title>Play Before Pixels</title>
<link rel="stylesheet" href="../../fonts/fonts.css">
<style>html,body{{margin:0}} body{{width:1200px;height:630px;background:#fff;display:flex;flex-direction:column;justify-content:center;padding:0 110px;box-sizing:border-box;position:relative;overflow:hidden;font-family:"Bricolage Grotesque",sans-serif;color:{INK}}}
.band{{position:absolute;left:0;right:0;bottom:0;height:22px;background:{SUN}}}
p{{font-weight:700;font-size:50px;letter-spacing:-.01em;margin:56px 0 0 6px;display:flex;align-items:baseline}}
p i{{display:inline-block;width:15px;height:15px;border-radius:50%;background:{TOMATO};margin-left:4px}}</style></head>
<body><img src="../lockup-horizontal.svg" style="width:760px;margin-left:-20px"><p>Talk, touch and play come first<i></i></p><div class="band"></div></body></html>'''
    open(os.path.join(HERE, 'og.html'), 'w').write(doc)

if __name__ == '__main__':
    html(); og(); print('guide + og written')
