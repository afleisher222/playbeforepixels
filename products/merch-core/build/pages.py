#!/usr/bin/env python3
"""Write every HTML page for the merch line (run from products/merch-core/ after build.py):
mockups, cover, 2000 x 2000 listing images, the hang tag and the production book (source.html).
Then run build/render.sh.
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
PROD = os.path.dirname(HERE)
QR = json.load(open(os.path.join(PROD, 'qr.json')))
VERSION = 'Version 1.0 · September 2026'
COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.'

GARMENTS = [  # slug, name, hex, which print file
    ('white', 'White', '#FFFFFF', 'light'),
    ('natural', 'Natural', '#F2EBDD', 'light'),
    ('mustard', 'Mustard', '#E6B23F', 'light'),
    ('navy', 'Navy', '#243150', 'dark'),
]
TOTES = [('natural', 'Natural canvas', '#EDE3CC', 'light'), ('dark', 'Black', '#232429', 'dark')]
SLOGAN = 'more-talk-less-tap'  # design 2 print-file id (build.py SLOGANS)


def mix(a, b, t):
    a = [int(a[i:i + 2], 16) for i in (1, 3, 5)]
    b = [int(b[i:i + 2], 16) for i in (1, 3, 5)]
    return '#' + ''.join('%02X' % round(x + (y - x) * t) for x, y in zip(a, b))


CSS = """
:root{--ink:#1D2940;--paper:#FFFFFF;--wash:#F3F6FB;--tomato:#EE5A36;--sun:#F5B820;--sky:#3D86D8;--grass:#2FA36B;--plum:#8A5CC7;
--t-tomato:#FDE9E3;--t-sun:#FEF4D8;--t-sky:#E3EEFA;--t-grass:#DFF3E9;--t-plum:#EFE6FA;--muted:#4A5468;--line:#E3E7EF}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--paper);color:var(--ink);font-family:"Nunito Sans",sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.disp{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;letter-spacing:-.02em}
.kick{font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--tomato)}
.tee,.tote{display:block;overflow:visible}
.shadow{filter:drop-shadow(0 26px 30px rgba(29,41,64,.16)) drop-shadow(0 4px 6px rgba(29,41,64,.10))}
.chip{display:inline-flex;align-items:center;gap:.5em;background:#fff;border-radius:999px;font-weight:800}
.ball{display:inline-block;border-radius:50%;background:var(--tomato);flex:none}
"""


def tee(color, tone, base, extra='', design='logo'):
    shade = mix(color, '#1D2940', .09)
    deep = mix(color, '#1D2940', .22)
    fold = mix(color, '#1D2940', .05)
    body = ('M370 70Q500 175 630 70L792 120Q880 205 944 330L838 410Q800 385 762 372Q756 620 772 868'
            'Q500 884 228 868Q244 620 238 372Q200 385 162 410L56 330Q120 205 208 120Z')
    return f'''<svg class="tee" viewBox="0 0 1000 900" {extra}>
<path d="{body}" fill="{color}"/>
<path d="M370 70Q500 100 630 70Q500 175 370 70Z" fill="{deep}"/>
<path d="M374 64Q500 92 626 64L630 70Q500 100 370 70Z" fill="{shade}"/>
<path d="M350 76Q500 212 650 76L630 70Q500 175 370 70Z" fill="{shade}"/>
<path d="M208 120Q226 250 238 372M792 120Q774 250 762 372" fill="none" stroke="{shade}" stroke-width="4"/>
<path d="M70 311L176 391M930 311L824 391M234 842Q500 858 766 842" fill="none" stroke="{shade}" stroke-width="4"/>
<image href="{base}print/tee-{design}_{tone}.png" x="305" y="175" width="390" height="468"/>
</svg>'''


def tote(color, tone, base, extra='', design='laps-not-apps'):
    shade = mix(color, '#1D2940', .10)
    deep = mix(color, '#1D2940', .25)
    return f'''<svg class="tote" viewBox="0 0 1000 1100" {extra}>
<path d="M372 300C372 120 628 120 628 300" fill="none" stroke="{deep}" stroke-width="40"/>
<rect x="150" y="280" width="700" height="780" rx="8" fill="{color}"/>
<path d="M330 300C330 60 670 60 670 300" fill="none" stroke="{color}" stroke-width="46"/>
<path d="M330 300C330 60 670 60 670 300" fill="none" stroke="{shade}" stroke-width="3" stroke-dasharray="10 9" opacity=".8"/>
<rect x="304" y="282" width="52" height="64" fill="{color}" stroke="{shade}" stroke-width="3"/>
<rect x="644" y="282" width="52" height="64" fill="{color}" stroke="{shade}" stroke-width="3"/>
<path d="M150 318H850" stroke="{shade}" stroke-width="3" stroke-dasharray="12 9"/>
<image href="{base}print/tote-{design}_{tone}.png" x="220" y="390" width="560" height="560"/>
</svg>'''


def ball_sym(x, y, r, rot=0):
    s = r / 50
    return (f'<g transform="translate({x} {y}) rotate({rot}) scale({s})"><circle r="50" fill="#F5B820"/>'
            '<path d="M0 0L0-50A50 50 0 0 1 43.3 25Z" fill="#EE5A36"/><path d="M0 0L-43.3 25A50 50 0 0 1-43.3-25Z" fill="#3D86D8"/>'
            '<circle r="10" fill="#FFFFFF"/></g>')


def block(x, y, s, kind, rot=0):
    inner = ('<rect x="-28" y="-28" width="56" height="56" rx="9" fill="#EE5A36"/><circle r="13" fill="#FFFFFF"/>' if kind == 1 else
             '<rect x="-28" y="-28" width="56" height="56" rx="9" fill="#3D86D8"/><path d="M0-14L14 11H-14Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round"/>' if kind == 2 else
             '<rect x="-28" y="-28" width="56" height="56" rx="9" fill="#2FA36B"/><rect x="-11" y="-11" width="22" height="22" rx="3" fill="#FFFFFF"/>')
    return f'<g transform="translate({x} {y}) rotate({rot}) scale({s})">{inner}</g>'


def qr_svg(px, col='#1D2940'):
    n = QR['n']
    return (f'<svg viewBox="-2 -2 {n+4} {n+4}" width="{px}" height="{px}" shape-rendering="crispEdges" style="display:block">'
            f'<rect x="-2" y="-2" width="{n+4}" height="{n+4}" fill="#fff"/><path d="{QR["d"]}" fill="{col}"/></svg>')


def page(title, body, base, extra_css='', size=None):
    at = f'@page{{size:{size};margin:0}}' if size else ''
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><title>{title}</title>
<link rel="stylesheet" href="{base}../../brand/fonts/fonts.css">
<style>{at}{CSS}{extra_css}</style></head><body>{body}</body></html>
'''


def write(rel, text):
    p = os.path.join(PROD, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(text)


LOGO = lambda base, v='': f'{base}../../brand/logo/lockup-horizontal{v}.svg'

# ---------------------------------------------------------------- mockups (1600 x 1200)
MOCK_CSS = """body{width:1600px;height:1200px;overflow:hidden;position:relative;background:var(--wash)}
.lay{position:absolute}.props{position:absolute;left:0;top:0}"""
B = '../../'  # from build/html/ to products/merch-core/
for slug, name, hexc, tone in GARMENTS:
    body = f'''<svg class="props" width="1600" height="1200">{ball_sym(1330, 960, 62, 20)}{block(250, 1010, 1.25, 1, -12)}{block(335, 1050, 1.25, 2, 8)}</svg>
<div class="lay shadow" style="left:380px;top:190px;width:840px">{tee(hexc, tone, B)}</div>'''
    write(f'build/html/mock-tee-{slug}.html', page(f'{name} logo tee flat-lay', body, B, MOCK_CSS))
    body = f'''<svg class="props" width="1600" height="1200">{ball_sym(270, 980, 62, -20)}{block(1300, 1010, 1.25, 2, 12)}{block(1385, 1050, 1.25, 3, -8)}</svg>
<div class="lay shadow" style="left:380px;top:190px;width:840px">{tee(hexc, tone, B, design=SLOGAN)}</div>'''
    write(f'build/html/mock-tee-more-talk-{slug}.html', page(f'{name} More talk, less tap tee flat-lay', body, B, MOCK_CSS))
for slug, name, hexc, tone in TOTES:
    body = f'''<svg class="props" width="1600" height="1200">{ball_sym(1320, 1000, 58, -15)}{block(270, 1030, 1.2, 3, 10)}</svg>
<div class="lay shadow" style="left:420px;top:50px;width:760px">{tote(hexc, tone, B)}</div>'''
    write(f'build/html/mock-tote-{slug}.html', page(f'{name} tote flat-lay', body, B, MOCK_CSS))

# main website mockup: two tees and the tote
body = f'''<svg class="props" width="1600" height="1200">{ball_sym(1470, 1070, 58, 15)}{block(120, 1080, 1.3, 1, -10)}{block(205, 1120, 1.3, 2, 12)}</svg>
<div class="lay shadow" style="left:30px;top:250px;width:720px;transform:rotate(-5deg)">{tee('#243150', 'dark', '')}</div>
<div class="lay shadow" style="left:560px;top:150px;width:760px;transform:rotate(3deg)">{tee('#FFFFFF', 'light', '', design=SLOGAN)}</div>
<div class="lay shadow" style="left:1160px;top:420px;width:440px;transform:rotate(7deg)">{tote('#EDE3CC', 'light', '')}</div>'''
write('mockup.html', page('Play Before Pixels merch flat-lay', body, '', MOCK_CSS))

# ---------------------------------------------------------------- listing images (2000 x 2000)
L_CSS = """body{width:2000px;height:2000px;overflow:hidden;position:relative}
.pad{position:absolute;left:130px;right:130px}
.kick{font-size:40px}
h1{margin:0;font-size:150px;line-height:.96}
h2{margin:0;font-size:120px;line-height:1}
.sub{font-size:52px;line-height:1.35;color:var(--ink);margin:0}
.chips{position:absolute;left:130px;bottom:120px;display:flex;gap:26px}
.chip{font-size:46px;padding:26px 44px}
.chip .ball{width:22px;height:22px}
.brand{position:absolute;right:130px;bottom:118px;width:330px}
.lay{position:absolute}
.small{font-size:40px;line-height:1.4;color:var(--muted)}
"""
lst = {}

lst['listing-01'] = ('Hero', f'''<div style="position:absolute;inset:0;background:var(--t-sun)"></div>
<div class="pad" style="top:120px"><div class="kick">Adult unisex tee · XS–3XL</div>
<h1 class="disp" style="margin-top:28px">Play Before Pixels<br>logo tee</h1></div>
<svg style="position:absolute;left:0;top:0" width="2000" height="2000">{ball_sym(1760, 700, 70, 20)}{block(1690, 845, 1.6, 1, -10)}</svg>
<div class="lay shadow" style="left:380px;top:600px;width:1240px">{tee('#FFFFFF', 'light', B)}</div>
<div class="chips"><span class="chip"><span class="ball"></span>4 colors</span><span class="chip"><span class="ball"></span>Printed when you order</span></div>''')

tiles = ''
for i, (slug, name, hexc, tone) in enumerate(GARMENTS):
    x = 130 + (i % 2) * 890
    y = 430 + (i // 2) * 690
    tiles += f'''<div class="lay" style="left:{x}px;top:{y}px;width:850px;height:650px;background:#fff;border-radius:36px"></div>
<div class="lay shadow" style="left:{x+165}px;top:{y+40}px;width:520px">{tee(hexc, tone, B)}</div>
<div class="lay" style="left:{x+44}px;top:{y+556}px;font-size:48px;font-weight:800;display:flex;align-items:center;gap:18px">
<span style="width:48px;height:48px;border-radius:50%;background:{hexc};box-shadow:inset 0 0 0 3px rgba(29,41,64,.18)"></span>{name}</div>'''
lst['listing-02'] = ('Colors', f'''<div style="position:absolute;inset:0;background:var(--wash)"></div>
<div class="pad" style="top:120px"><div class="kick">4 colors</div><h2 class="disp" style="margin-top:24px">Pick your color</h2></div>
{tiles}
<p class="small pad" style="top:1832px;margin:0">Light colors print the ink logo. Navy prints the white logo.</p>''')

step3 = ''.join(f'''<div class="lay" style="left:{130+i*590}px;top:1300px;width:560px;height:430px;background:#2A3752;border-radius:36px;padding:56px 50px;color:#fff">
<div style="width:60px;height:8px;border-radius:4px;background:{c}"></div>
<div class="disp" style="font-size:78px;margin-top:34px">{h}</div>
<div style="font-size:44px;line-height:1.35;margin-top:14px;color:#C9D2E0">{t}</div></div>''' for i, (c, h, t) in enumerate([
    ('#3D86D8', 'A seal', 'Like the stamp on a good wooden toy.'),
    ('#EE5A36', 'A top', 'One of the oldest toys there is.'),
    ('#F5B820', 'Play first', 'It needs nothing but a hand.')]))
lst['listing-03'] = ('The idea', f'''<div style="position:absolute;inset:0;background:var(--ink)"></div>
<div class="pad" style="top:120px;color:#fff"><div class="kick" style="color:var(--sun)">The idea behind the logo</div>
<h2 class="disp" style="margin-top:28px;font-size:132px">Play comes first.</h2></div>
<div class="lay" style="left:130px;top:520px;width:1040px">
<p class="sub" style="color:#fff;font-size:56px">Our logo is a maker’s seal, like the stamp pressed into the bottom of a good wooden toy.</p>
<p class="sub" style="color:#C9D2E0;margin-top:40px;font-size:50px">In the middle is a spinning top. It is one of the oldest toys there is, and it needs nothing but a child’s hand.</p></div>
<img src="{B}../../brand/logo/mark-reverse.svg" style="position:absolute;left:1340px;top:470px;width:470px">
{step3}
<img class="brand" src="{LOGO(B, '-reverse')}">''')

lst['listing-04'] = ('Details', f'''<div style="position:absolute;inset:0;background:var(--wash)"></div>
<div class="pad" style="top:120px"><div class="kick">The details</div><h2 class="disp" style="margin-top:24px">Made for grown-ups</h2></div>
<div class="lay" style="left:130px;top:470px;width:860px;height:1060px;background:#fff;border-radius:40px"></div>
<svg class="lay" style="left:130px;top:470px" width="860" height="300" viewBox="0 0 860 300">
<path d="M70 0Q430 250 790 0" fill="none" stroke="#E6E9EF" stroke-width="50"/></svg>
<div class="lay" style="left:230px;top:640px;width:660px;height:548px;overflow:hidden;border-radius:14px;box-shadow:0 0 0 2px #EEF1F6">
<img src="{B}labels/neck-label_M_light.png" style="width:660px;display:block"></div>
<div class="lay" style="left:190px;top:1290px;width:740px;font-size:46px;line-height:1.35;font-weight:700">Brand, size and care printed inside the neck.</div>
<div class="lay" style="left:1060px;top:500px;width:810px;font-size:52px;line-height:1.3">
{''.join(f'<div style="display:flex;gap:30px;margin-bottom:62px"><span class="ball" style="width:30px;height:30px;margin-top:18px"></span><div>{t}</div></div>' for t in [
    '<b>Adult unisex sizes</b><br>XS to 3XL',
    '<b>Printed when you order</b><br>then shipped with tracking',
    '<b>Care</b><br>wash cold inside out, tumble dry low, don’t iron the print',
    '<b>Grown-up sizes only</b><br>we don’t make kids’ clothing'])}</div>
<img class="brand" src="{LOGO(B)}">''')

arrow = '#EE5A36'
lst['listing-05'] = ('Size guide', f'''<div style="position:absolute;inset:0;background:var(--t-sun)"></div>
<div class="pad" style="top:120px"><div class="kick">Size guide</div><h2 class="disp" style="margin-top:24px">Find your size</h2></div>
<div class="lay shadow" style="left:110px;top:560px;width:1000px">{tee('#FFFFFF', 'light', B)}</div>
<svg class="lay" style="left:110px;top:560px" width="1000" height="900" viewBox="0 0 1000 900">
<g stroke="{arrow}" stroke-width="7" fill="{arrow}"><path d="M250 420H750"/><path d="M250 420l26-16v32zM750 420l-26-16v32z"/>
<path d="M860 110V866" /><path d="M860 110l-16 26h32zM860 866l-16-26h32z"/></g>
<path d="M792 120H876M772 868H876" stroke="{arrow}" stroke-width="4" stroke-dasharray="10 8"/>
<circle cx="500" cy="470" r="44" fill="{arrow}"/><text x="500" y="486" text-anchor="middle" font-family="Nunito Sans" font-weight="800" font-size="46" fill="#fff">A</text>
<circle cx="920" cy="520" r="44" fill="{arrow}"/><text x="920" y="536" text-anchor="middle" font-family="Nunito Sans" font-weight="800" font-size="46" fill="#fff">B</text></svg>
<div class="lay" style="left:1180px;top:590px;width:700px;font-size:50px;line-height:1.3">
{''.join(f'<div style="display:flex;gap:28px;margin-bottom:52px"><span class="disp" style="font-size:64px;color:var(--tomato);width:50px;flex:none">{n}</span><div>{t}</div></div>' for n, t in [
    ('1', 'Lay a tee you love flat.'),
    ('2', '<b>A</b> · Measure across the chest, armpit to armpit.'),
    ('3', '<b>B</b> · Measure from the top of the shoulder to the hem.'),
    ('4', 'Match A and B to the size chart in this listing.')])}
<div style="font-size:44px;line-height:1.35;color:var(--muted);padding-left:78px">Unisex fit. For a closer fit, many people pick one size down.</div></div>
<div class="chips"><span class="chip"><span class="ball"></span>Adult sizes XS–3XL</span></div>''')

icon_tee = '<svg viewBox="0 0 1000 900" width="230"><path d="M370 70Q500 175 630 70L792 120Q880 205 944 330L838 410Q800 385 762 372Q756 620 772 868Q500 884 228 868Q244 620 238 372Q200 385 162 410L56 330Q120 205 208 120Z" fill="#3D86D8"/><circle cx="470" cy="330" r="60" fill="#fff"/><circle cx="560" cy="330" r="22" fill="#EE5A36"/></svg>'
icon_print = '<svg viewBox="0 0 240 240" width="230"><rect x="20" y="70" width="200" height="110" rx="22" fill="#F5B820"/><rect x="60" y="20" width="120" height="60" rx="8" fill="#FFFFFF"/><rect x="60" y="150" width="120" height="80" rx="8" fill="#FFFFFF"/><circle cx="185" cy="105" r="10" fill="#EE5A36"/><rect x="80" y="172" width="80" height="10" rx="5" fill="#1D2940" opacity=".25"/><rect x="80" y="194" width="56" height="10" rx="5" fill="#1D2940" opacity=".25"/></svg>'
icon_box = '<svg viewBox="0 0 240 240" width="230"><path d="M20 80L120 40L220 80V190L120 230L20 190Z" fill="#E0AC80"/><path d="M20 80L120 120L220 80L120 40Z" fill="#F4CFAE"/><path d="M120 120V230" stroke="#C08457" stroke-width="6"/><path d="M60 64L160 104V140L180 132V96L80 56Z" fill="#EE5A36"/></svg>'
steps = ''.join(f'''<div class="lay" style="left:{130+i*600}px;top:640px;width:540px;height:900px;background:#fff;border-radius:40px;text-align:center;padding:70px 46px">
<div style="height:260px;display:flex;align-items:center;justify-content:center">{ic}</div>
<div class="disp" style="font-size:90px;color:var(--tomato);margin-top:40px">{i+1}</div>
<div class="disp" style="font-size:66px;margin-top:10px">{h}</div>
<div style="font-size:44px;line-height:1.35;margin-top:26px;color:var(--muted)">{t}</div></div>''' for i, (ic, h, t) in enumerate([
    (icon_tee, 'You order', 'Pick your color and size.'),
    (icon_print, 'We print it', 'Our print partner prints your tee just for you.'),
    (icon_box, 'It ships', 'Tracking comes by email as soon as it leaves.')]))
lst['listing-06'] = ('Made to order', f'''<div style="position:absolute;inset:0;background:var(--t-sky)"></div>
<div class="pad" style="top:120px"><div class="kick">Printed on demand</div><h2 class="disp" style="margin-top:24px">How your tee<br>gets to you</h2></div>
{steps}
<p class="small pad" style="top:1640px;margin:0">Printed when you order, so allow a few extra days before it ships.</p>
<img class="brand" src="{LOGO(B)}">''')

lst['listing-07'] = ('Pairs with', f'''<div style="position:absolute;inset:0;background:var(--t-grass)"></div>
<div class="pad" style="top:120px"><div class="kick" style="color:#1F7A4F">Gift idea</div><h2 class="disp" style="margin-top:24px">Pair it with<br>a book of plays</h2></div>
<div class="lay shadow" style="left:90px;top:640px;width:900px;transform:rotate(-4deg)">{tee('#F2EBDD', 'light', B)}</div>
<img class="lay" src="{B}../guide-100-plays/cover.png" style="left:1080px;top:560px;width:660px;border-radius:10px;transform:rotate(3deg);box-shadow:0 30px 40px rgba(29,41,64,.18)">
<img class="lay" src="{B}../bored-play-cards/preview/listing-images/ages-1-5/listing-01.png" style="left:1300px;top:1270px;width:500px;border-radius:10px;transform:rotate(-5deg);box-shadow:0 30px 40px rgba(29,41,64,.18)">
<p class="small pad" style="top:1760px;margin:0;right:900px;color:var(--ink)">Our book <b>100 Screen-Free Plays</b> and our <b>“I’m bored!” Play Cards</b> are sold separately.</p>''')

# ---- design 2: "More talk, less tap" tee (same 7-image structure as the logo tee)
lst['slogan-01'] = ('Hero', f'''<div style="position:absolute;inset:0;background:var(--t-sky)"></div>
<div class="pad" style="top:120px"><div class="kick">Adult unisex tee · XS–3XL</div>
<h1 class="disp" style="margin-top:28px">More talk,<br>less tap tee</h1></div>
<svg style="position:absolute;left:0;top:0" width="2000" height="2000">{ball_sym(1760, 700, 70, -20)}{block(1690, 845, 1.6, 2, 10)}</svg>
<div class="lay shadow" style="left:380px;top:600px;width:1240px">{tee('#F2EBDD', 'light', B, design=SLOGAN)}</div>
<div class="chips"><span class="chip"><span class="ball"></span>4 colors</span><span class="chip"><span class="ball"></span>Printed when you order</span></div>''')

tiles = ''
for i, (slug, name, hexc, tone) in enumerate(GARMENTS):
    x = 130 + (i % 2) * 890
    y = 430 + (i // 2) * 690
    tiles += f'''<div class="lay" style="left:{x}px;top:{y}px;width:850px;height:650px;background:#fff;border-radius:36px"></div>
<div class="lay shadow" style="left:{x+165}px;top:{y+40}px;width:520px">{tee(hexc, tone, B, design=SLOGAN)}</div>
<div class="lay" style="left:{x+44}px;top:{y+556}px;font-size:48px;font-weight:800;display:flex;align-items:center;gap:18px">
<span style="width:48px;height:48px;border-radius:50%;background:{hexc};box-shadow:inset 0 0 0 3px rgba(29,41,64,.18)"></span>{name}</div>'''
lst['slogan-02'] = ('Colors', f'''<div style="position:absolute;inset:0;background:var(--wash)"></div>
<div class="pad" style="top:120px"><div class="kick">4 colors</div><h2 class="disp" style="margin-top:24px">Pick your color</h2></div>
{tiles}
<p class="small pad" style="top:1832px;margin:0">Light colors print in ink. Navy prints in white. The tomato-red ball is the period on every color.</p>''')

talk3 = ''.join(f'''<div class="lay" style="left:{130+i*590}px;top:1170px;width:560px;height:540px;background:#2A3752;border-radius:36px;padding:56px 50px;color:#fff">
<span class="ball" style="width:44px;height:44px"></span>
<div class="disp" style="font-size:72px;margin-top:30px;line-height:1.02">{h}</div>
<div style="font-size:44px;line-height:1.35;margin-top:18px;color:#C9D2E0">{t}</div></div>''' for i, (h, t) in enumerate([
    ('Say what you see', '“Big bubbles! One popped.”'),
    ('Pause and wait', 'Count to five. A look, a sign or a point is a turn too.'),
    ('Follow their lead', '“Tell me about your game.” Then listen.')]))
lst['slogan-03'] = ('The idea', f'''<div style="position:absolute;inset:0;background:var(--ink)"></div>
<div class="pad" style="top:120px;color:#fff"><div class="kick" style="color:var(--sun)">The idea behind the line</div>
<h2 class="disp" style="margin-top:28px;font-size:132px">One more turn.</h2></div>
<div class="lay" style="left:130px;top:520px;width:1740px">
<p class="sub" style="color:#fff;font-size:58px">A small reminder we wrote for ourselves: add one more <span style="white-space:nowrap">back-and-forth</span> to the day. A question in the car. A song at the sink. A story at bedtime.</p>
<p class="sub" style="color:#C9D2E0;margin-top:36px;font-size:48px">It’s not a rule and it’s not a judgment. Every family’s day looks different.</p>
<p class="sub" style="color:#C9D2E0;margin-top:24px;font-size:44px">Talk, sing and read in the language you know best. A tap on a talking device is talk too. Three easy ways to start, for any age:</p></div>
{talk3}
<img class="brand" src="{LOGO(B, '-reverse')}">''')

lst['slogan-04'] = ('Details', lst['listing-04'][1])
lst['slogan-05'] = ('Size guide', lst['listing-05'][1].replace(f"{tee('#FFFFFF', 'light', B)}", f"{tee('#FFFFFF', 'light', B, design=SLOGAN)}"))
lst['slogan-06'] = ('Made to order', lst['listing-06'][1])
lst['slogan-07'] = ('Pairs with', lst['listing-07'][1].replace(f"{tee('#F2EBDD', 'light', B)}", f"{tee('#E6B23F', 'light', B, design=SLOGAN)}"))

# tote images (for the site's bundle pages only)
lst['tote-01'] = ('Tote hero', f'''<div style="position:absolute;inset:0;background:var(--t-sun)"></div>
<div class="pad" style="top:120px"><div class="kick">Bundle add-on · not sold on its own</div>
<h1 class="disp" style="margin-top:28px">Laps not apps<br>tote</h1></div>
<div class="lay shadow" style="left:500px;top:560px;width:1000px">{tote('#EDE3CC', 'light', B)}</div>
<div class="chips"><span class="chip"><span class="ball"></span>Add it to a gift bundle</span></div>''')
lst['tote-02'] = ('Tote colors', f'''<div style="position:absolute;inset:0;background:var(--wash)"></div>
<div class="pad" style="top:120px"><div class="kick">2 colors</div><h2 class="disp" style="margin-top:24px">Natural or black</h2></div>
<div class="lay shadow" style="left:80px;top:520px;width:900px">{tote('#EDE3CC', 'light', B)}</div>
<div class="lay shadow" style="left:1020px;top:520px;width:900px">{tote('#232429', 'dark', B)}</div>
<p class="small pad" style="top:1640px;margin:0">Slogan about 9 in wide, with our logo below. Printed when you order, as part of a bundle.</p>''')

for name, (title, body) in lst.items():
    write(f'build/html/{name}.html', page('Listing image: ' + title, body, B, L_CSS))

# cover (1600 x 1600): the hero at 0.8 scale
write('cover.html', page('Play Before Pixels logo tee', f'''<div style="position:absolute;inset:0;background:var(--t-sun)"></div>
<div class="pad" style="top:110px"><div class="kick">Adult unisex tee · XS–3XL</div>
<h1 class="disp" style="margin-top:24px">Play Before Pixels<br>logo tee</h1></div>
<div class="lay shadow" style="left:270px;top:500px;width:1060px">{tee('#FFFFFF', 'light', '')}</div>
<svg style="position:absolute;left:0;top:0" width="1600" height="1600">{ball_sym(1400, 620, 56, 20)}{block(1340, 740, 1.3, 1, -10)}</svg>''',
    '', L_CSS.replace('2000px', '1600px').replace('150px;line-height', '124px;line-height')))

# ---------------------------------------------------------------- hang tag / pack-in card
HT_CSS = """.page{width:2.25in;height:3.75in;position:relative;overflow:hidden;page-break-after:always}
.safe{position:absolute;left:.25in;right:.25in;top:.25in;bottom:.25in}
.t{font-size:6.6pt;line-height:1.35}
"""
front = f'''<div class="page" style="background:var(--sun)"><div class="safe" style="display:flex;flex-direction:column;align-items:center">
<div style="width:.2in;height:.2in;border-radius:50%;border:1px dashed rgba(29,41,64,.35);margin-top:.02in"></div>
<img src="../../brand/logo/lockup-stacked.svg" style="width:1.05in;margin-top:.4in">
<div style="position:absolute;bottom:.02in;text-align:center;width:100%">
<div class="kick" style="font-size:6.2pt;color:var(--ink)">Adult unisex tee</div>
<div class="t" style="margin-top:2pt;font-weight:700">Play Before Pixels™</div></div></div></div>'''


def back(site):
    mid = (f'''<div style="display:flex;gap:.08in;align-items:center;margin-top:.12in">{qr_svg(68)}
<div class="t" style="font-size:6.2pt"><b>Free play ideas</b> for your family:<br>playbeforepixels.com/<br>bonus/merch-core</div></div>''' if site else
           '''<div class="t" style="margin-top:.12in"><b>Care:</b> machine wash cold, inside out. Tumble dry low. Don’t iron the print.</div>''')
    return f'''<div class="page" style="background:#fff"><div class="safe">
<div style="width:.2in;height:.2in;border-radius:50%;border:1px dashed rgba(29,41,64,.35);margin:.02in auto 0"></div>
<div class="disp" style="font-size:13pt;line-height:1.02;margin-top:.1in">Play comes<br>first.</div>
<div class="t" style="margin-top:.07in">Our logo is a maker’s seal, like the stamp on a good wooden toy. The spinning top in the middle is one of the oldest toys there is. It needs nothing but a child’s hand.</div>
{mid}
<div style="position:absolute;bottom:0;left:0;right:0">
<div class="t" style="font-size:5.4pt;color:var(--muted)">Printed on demand for you.<br>© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.<br>{VERSION} · {'site' if site else 'marketplace'} edition</div></div></div></div>'''


write('hang-tag.html', page('Hang tag and pack-in card', front + back(True) + back(False), '', HT_CSS, '2.25in 3.75in'))

print('pages written:', len(lst) + 8)
