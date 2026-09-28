import os
from build import mark, words, circles, f, INK, TOMATO, SUN, PAPER, CAP, OUT
def mark_svg(size_h, ink=INK, acc=TOMATO, fav=False, pad=0.0, extra=''):
    kw = dict(Wb=150, end=26, ball_ang=103, rb=90, Ws=176) if fav else {}
    d, b, (w, h) = mark(**kw)
    p = pad*h
    return (f'<svg viewBox="{f(-p)} {f(-p)} {f(w+2*p)} {f(h+2*p)}" height="{size_h}" width="{f(size_h*(w+2*p)/(h+2*p))}" {extra}>'
            f'<path fill="{ink}" d="{d}"/><g fill="{acc}">{circles([b])}</g></svg>')
def square_mark(px, ink=INK, acc=TOMATO, bg='none', fav=False, fill=0.78):
    """mark centred in a px×px square (like an app/favicon canvas)"""
    kw = dict(Wb=150, end=26, ball_ang=103, rb=90, Ws=176) if fav else {}
    d, b, (w, h) = mark(**kw)
    side = h/fill; ox = (side-w)/2; oy = (side-h)/2
    d, b, _ = mark(ox, oy, 1.0, **kw)
    rect = f'<rect width="{f(side)}" height="{f(side)}" fill="{bg}"/>' if bg != 'none' else ''
    return (f'<svg viewBox="0 0 {f(side)} {f(side)}" width="{px}" height="{px}">{rect}'
            f'<path fill="{ink}" d="{d}"/><g fill="{acc}">{circles([b])}</g></svg>')
def lockup_h(height, ink=INK, acc=TOMATO):
    S = 1.42; gap = 330
    md, mb, (mw, mh) = mark(0, 0, S)
    base = mh/2 + CAP/2 + 20
    hd, hb, hw = words('Play Before Pixels', mw + gap, base)
    W = mw + gap + hw
    return (f'<svg viewBox="0 0 {f(W)} {f(mh)}" height="{height}" width="{f(height*W/mh)}">'
            f'<path fill="{ink}" d="{md+hd}"/><g fill="{acc}">{circles([mb]+hb)}</g></svg>')
def wordline(text, height, ink=INK, acc=TOMATO, logo=False):
    d, b, w = words(text, 0, CAP + 200, customP=logo)
    H = CAP + 200 + 170
    return (f'<svg viewBox="0 0 {f(w)} {f(H)}" height="{height}" width="{f(height*w/H)}">'
            f'<path fill="{ink}" d="{d}"/><g fill="{acc}">{circles(b)}</g></svg>')
def lockup_s(height, ink=INK, acc=TOMATO):
    S2 = 2.1
    _, _, (mw2, mh2) = mark(0, 0, S2)
    _, _, l1w = words('Play Before', 0, 0); _, _, l2w = words('Pixels', 0, 0)
    W = max(l1w, l2w, mw2); y1 = mh2 + 420 + CAP; y2 = y1 + 1010
    md2, mb2, _ = mark((W-mw2)/2, 0, S2)
    l1d, l1b, _ = words('Play Before', (W-l1w)/2, y1); l2d, l2b, _ = words('Pixels', (W-l2w)/2, y2)
    H = y2 + 40
    return (f'<svg viewBox="0 0 {f(W)} {f(H)}" height="{height}" width="{f(height*W/H)}">'
            f'<path fill="{ink}" d="{md2+l1d+l2d}"/><g fill="{acc}">{circles([mb2]+l1b+l2b)}</g></svg>')
TEE = "M60 20 L120 0 Q150 26 180 0 L240 20 L300 80 L256 120 L232 100 L232 330 L68 330 L68 100 L44 120 L0 80 Z"
html = f'''<!doctype html><html><head><meta charset="utf-8"><title>Concept 1 — The Return</title>
<link rel="stylesheet" href="../../fonts/fonts.css">
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{width:1800px;height:1200px;background:#F3F6FB;font-family:"Nunito Sans",sans-serif;color:{INK};position:relative;overflow:hidden}}
.abs{{position:absolute}}
.panel{{position:absolute;border-radius:18px;overflow:hidden}}
.lab{{font:800 12px/1 "Nunito Sans",sans-serif;letter-spacing:.14em;text-transform:uppercase;opacity:.55;position:absolute}}
.center{{display:flex;align-items:center;justify-content:center}}
h1{{font:800 44px/1 "Bricolage Grotesque",sans-serif;letter-spacing:-.02em}}
.sub{{font:500 17px/1.45 "Nunito Sans",sans-serif;max-width:1120px;margin-top:10px}}
.cap{{font:700 13px/1.3 "Nunito Sans",sans-serif;opacity:.7}}
</style></head><body>
<div class="abs" style="left:40px;top:34px">
  <h1>Concept 1 · <span style="color:{TOMATO}">The Return</span></h1>
  <p class="sub">A typographic mark. The P of <b>Play</b> opens its bowl, and a ball comes back to close it — serve and return, the back-and-forth that talk and play are built on. The same ball replaces the pixel-dot on the <i>i</i> of <b>Pixels</b>. Letters: Bricolage Grotesque 800 outlines; P and balls hand-built.</p>
</div>
<div class="abs" style="right:40px;top:40px;display:flex;gap:8px;align-items:center">
  {''.join(f'<div style="width:34px;height:34px;border-radius:8px;background:{c};box-shadow:inset 0 0 0 1px rgba(29,41,64,.12)"></div>' for c in [INK,TOMATO,SUN,'#3D86D8','#2FA36B',PAPER])}
</div>

<!-- lockups on white -->
<div class="panel" style="left:40px;top:150px;width:1150px;height:300px;background:#fff">
  <span class="lab" style="left:24px;top:22px">Lockups · on paper #FFFFFF</span>
  <div class="abs" style="left:48px;top:112px">{lockup_h(72)}</div>
  <div class="abs" style="left:48px;top:212px">{wordline('Play Before Pixels', 46, logo=True)}</div>
  <div class="abs" style="left:48px;top:272px" ><span class="cap">horizontal lockup · logotype below: the mark's P set back into the word</span></div>
  <div class="abs" style="right:56px;top:40px">{lockup_s(222)}</div>
</div>
<!-- lockups on ink -->
<div class="panel" style="left:40px;top:468px;width:1150px;height:300px;background:{INK};color:#fff">
  <span class="lab" style="left:24px;top:22px;color:#fff">Lockups · on ink #1D2940</span>
  <div class="abs" style="left:48px;top:112px">{lockup_h(72, ink=PAPER)}</div>
  <div class="abs" style="left:48px;top:212px">{wordline('Play Before Pixels', 46, ink=PAPER, logo=True)}</div>
  <div class="abs" style="left:48px;top:272px"><span class="cap" style="color:#fff">reverse · white letters, the ball stays tomato</span></div>
  <div class="abs" style="right:56px;top:40px">{lockup_s(222, ink=PAPER)}</div>
</div>

<!-- mark at 512 -->
<div class="panel center" style="left:1222px;top:150px;width:538px;height:538px;background:#fff">
  <span class="lab" style="left:24px;top:22px">Mark · 512 px</span>
  {square_mark(512)}
</div>
<!-- small sizes -->
<div class="panel" style="left:1222px;top:704px;width:538px;height:120px;background:#fff">
  <span class="lab" style="left:24px;top:18px">64 · 32 · 16 px, actual size — 32 &amp; 16 use the favicon cut</span>
  <div class="abs" style="left:24px;top:42px;display:flex;align-items:flex-end;gap:26px">
    {square_mark(64)}{square_mark(32, fav=True)}{square_mark(16, fav=True, fill=0.9)}
    <div style="margin-left:18px;width:232px;height:36px;border-radius:10px 10px 0 0;background:#E6EAF1;display:flex;align-items:center;gap:8px;padding:0 12px">
      {square_mark(16, fav=True, fill=0.9)}<span style="font:600 13px 'Nunito Sans'">Play Before Pixels</span></div>
  </div>
  </div>

<!-- applications row -->
<div class="panel" style="left:40px;top:846px;width:1720px;height:324px;background:#fff">
  <span class="lab" style="left:24px;top:20px">Applications</span>
  <!-- tee -->
  <svg class="abs" style="left:40px;top:44px" width="232" height="240" viewBox="-10 -10 320 350">
    <path d="{TEE}" fill="{SUN}"/><path d="M120 0 Q150 26 180 0 Q150 40 120 0Z" fill="#E0A410"/>
    <g transform="translate(118 92)">{mark_svg(92)}</g></svg>
  <div class="cap abs" style="left:66px;top:300px">tee · ink + tomato on sun</div>
  <!-- board book: cover corner + spine -->
  <div class="abs" style="left:350px;top:50px;width:330px;height:240px;border-radius:6px 16px 16px 6px;background:#3D86D8;overflow:hidden">
    <div class="abs" style="left:0;top:0;width:44px;height:240px;background:{TOMATO}"></div>
    <div class="abs" style="left:5px;top:12px;width:36px">{mark_svg(38, ink=PAPER, acc=SUN)}</div>
    <div class="abs" style="left:33px;top:62px;transform:rotate(90deg);transform-origin:0 0">{wordline('Play Before Pixels', 22, ink=PAPER, acc=SUN)}</div>
    <div class="abs" style="left:62px;top:24px;font:700 44px/1 Fredoka,sans-serif;color:#fff">ball</div>
    <div class="abs" style="left:150px;top:92px;width:130px;height:130px;border-radius:50%;background:{SUN}"></div>
    <div class="abs" style="right:14px;top:14px;width:60px;height:60px;border-radius:50%;background:#fff" ></div>
    <div class="abs" style="right:25px;top:22px">{mark_svg(44)}</div>
  </div>
  <div class="cap abs" style="left:350px;top:300px">board book · spine + cover-corner badge</div>
  <!-- avatar -->
  <div class="abs center" style="left:730px;top:44px;width:250px;height:250px;border-radius:50%;background:#FEF4D8">{mark_svg(150)}</div>
  <div class="cap abs" style="left:748px;top:300px">social avatar · 1080 × 1080 crop</div>
  <!-- teacher resource cover -->
  <div class="abs" style="left:1030px;top:44px;width:190px;height:246px;background:#DFF3E9;border-radius:4px;box-shadow:0 0 0 1px rgba(29,41,64,.08)">
    <div class="abs" style="left:16px;top:16px">{lockup_h(15)}</div>
    <div class="abs" style="left:16px;top:60px;font:800 22px/1.05 'Bricolage Grotesque';width:160px">Talk-rich<br>Classroom<br>Starters</div>
    <div class="abs" style="left:16px;top:146px;font:600 10px/1.35 'Nunito Sans';width:150px;opacity:.75">Paper-and-play routines for grades K–5</div>
    <div class="abs" style="left:110px;top:166px;width:62px;height:62px;border-radius:50%;background:{TOMATO}"></div>
  </div>
  <div class="cap abs" style="left:1030px;top:300px">teacher-resource cover</div>
  <!-- one colour -->
  <div class="abs center" style="left:1262px;top:44px;width:200px;height:246px;background:#fff;border-radius:6px;box-shadow:0 0 0 2px #000 inset;flex-direction:column;gap:14px">
    {mark_svg(110, ink='#000', acc='#000')}{wordline('Play Before Pixels', 22, ink='#000', acc='#000')}</div>
  <div class="cap abs" style="left:1262px;top:300px">one-color black · stamp</div>
  <div class="abs center" style="left:1492px;top:44px;width:200px;height:246px;background:{INK};border-radius:50% 50% 12px 12px / 30% 30% 12px 12px">
    {mark_svg(120, ink='#fff', acc='#fff')}</div>
  <div class="cap abs" style="left:1492px;top:300px">white-on-dark · embroidery</div>
</div>
</body></html>'''
open(os.path.join(OUT, 'board.html'), 'w').write(html)
print('board.html written')
