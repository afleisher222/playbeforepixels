#!/usr/bin/env python3
"""Write every HTML page for the mug (run from products/merch-mug/ after build.py and pricing.py):
mockups (the real print file wrapped onto a cylinder), cover, 2000 x 2000 listing images and the
production sheet (source.html). build/render.sh then renders them.
"""
import json, math, os

HERE = os.path.dirname(os.path.abspath(__file__))
PROD = os.path.dirname(HERE)
META = json.load(open(os.path.join(HERE, 'wrap-meta.json')))
PRICE = json.load(open(os.path.join(HERE, 'pricing.json')))
VERSION = 'Version 1.0 · September 2026'
COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.'
# Real mug sizes, partner-typical (UNVERIFIED): diameter and height in inches; print height in inches.
DIMS = {'11oz': (3.2, 3.8, 3.5), '15oz': (3.4, 4.5, 4.0)}

CSS = """
:root{--ink:#1D2940;--paper:#FFFFFF;--wash:#F3F6FB;--tomato:#EE5A36;--sun:#F5B820;--sky:#3D86D8;--grass:#2FA36B;--plum:#8A5CC7;
--t-tomato:#FDE9E3;--t-sun:#FEF4D8;--t-sky:#E3EEFA;--t-grass:#DFF3E9;--t-plum:#EFE6FA;--muted:#4A5468;--line:#E3E7EF}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--paper);color:var(--ink);font-family:"Nunito Sans",sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.disp{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;letter-spacing:-.02em}
.kick{font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#C8431F}
.shadow{filter:drop-shadow(0 26px 30px rgba(29,41,64,.16)) drop-shadow(0 4px 6px rgba(29,41,64,.10))}
.chip{display:inline-flex;align-items:center;gap:.5em;background:#fff;border-radius:999px;font-weight:800}
.ball{display:inline-block;border-radius:50%;background:var(--tomato);flex:none}
.lay{position:absolute}
"""


def mug(key, face, base, width):
    """SVG of a white mug `width` px wide showing `face` ('seal' or 'slogan') of the real wrap file."""
    m = META[key]
    dia, tall, print_h = DIMS[key]
    k = width / dia                      # px per inch
    bw, bh = width, tall * k
    handle = 'left' if face == 'seal' else 'right'
    c = m['seal_c'] if face == 'seal' else m['slogan_c']
    R = bw / 2
    pad = bw * 0.36                      # room for the handle
    rim = bw * 0.085
    vw, vh = bw + 2 * pad, bh + rim * 2 + 10
    cx, top = pad + R, rim
    ptop = top + (bh - print_h * k) / 2
    ph = print_h * k
    strips, n = [], 72
    for i in range(n):
        a0 = math.radians(-88 + 176 * i / n)
        a1 = math.radians(-88 + 176 * (i + 1) / n)
        u0 = c + math.degrees(a0) / m['deg_per_px']
        u1 = c + math.degrees(a1) / m['deg_per_px']
        x0, x1 = cx + R * math.sin(a0), cx + R * math.sin(a1)
        strips.append(f'<svg x="{x0:.2f}" y="{ptop:.2f}" width="{x1 - x0 + 1.6:.2f}" height="{ph:.2f}" '
                      f'viewBox="{u0:.2f} 0 {u1 - u0:.2f} {m["h"]}" preserveAspectRatio="none">'
                      f'<image href="{base}print/mug-{key}_wrap.png" width="{m["w"]}" height="{m["h"]}"/></svg>')
    hx = cx + (R if handle == 'right' else -R)
    sgn = 1 if handle == 'right' else -1
    hy0, hy1 = top + bh * 0.2, top + bh * 0.72
    hw = bw * 0.30
    handle_d = (f'M{hx:.1f} {hy0:.1f}C{hx + sgn*hw*1.25:.1f} {hy0 - bh*0.02:.1f} {hx + sgn*hw*1.25:.1f} {hy1 + bh*0.02:.1f} {hx:.1f} {hy1:.1f}')
    bot = top + bh
    body = (f'M{cx - R:.1f} {top:.1f}V{bot - rim*0.6:.1f}A{R:.1f} {rim*0.6:.1f} 0 0 0 {cx + R:.1f} {bot - rim*0.6:.1f}V{top:.1f}Z')
    uid = f'{key}{face}{int(width)}'
    return f'''<svg viewBox="0 0 {vw:.1f} {vh:.1f}" width="{vw:.0f}" height="{vh:.0f}" style="display:block;overflow:visible">
<defs><clipPath id="b{uid}"><path d="{body}"/></clipPath></defs>
<path d="{handle_d}" fill="none" stroke="#E9EDF3" stroke-width="{bw*0.105:.1f}" stroke-linecap="round"/>
<path d="{handle_d}" fill="none" stroke="#FFFFFF" stroke-width="{bw*0.075:.1f}" stroke-linecap="round"/>
<path d="{body}" fill="#FFFFFF"/>
<g clip-path="url(#b{uid})">{''.join(strips)}
<rect x="{cx + R*0.72:.1f}" y="{top:.1f}" width="{R*0.3:.1f}" height="{bh:.1f}" fill="#1D2940" opacity=".07"/>
<rect x="{cx + R*0.9:.1f}" y="{top:.1f}" width="{R*0.12:.1f}" height="{bh:.1f}" fill="#1D2940" opacity=".05"/>
<rect x="{cx - R:.1f}" y="{top:.1f}" width="{R*0.12:.1f}" height="{bh:.1f}" fill="#1D2940" opacity=".04"/></g>
<ellipse cx="{cx:.1f}" cy="{top:.1f}" rx="{R:.1f}" ry="{rim:.1f}" fill="#FFFFFF"/>
<ellipse cx="{cx:.1f}" cy="{top + rim*0.12:.1f}" rx="{R*0.93:.1f}" ry="{rim*0.8:.1f}" fill="#E6EAF1"/>
</svg>'''


def ball_sym(x, y, r, rot=0):
    """The playground ball used on the sticker sheet."""
    s = r / 40
    return (f'<g transform="translate({x} {y}) rotate({rot - 18}) scale({s})"><circle r="40" fill="#EE5A36"/>'
            '<path d="M-38 -9Q0 12 38 -9L37 7Q0 28-37 7Z" fill="#F5B820"/>'
            '<path d="M-36 -25Q0 -11 36 -25" fill="none" stroke="#FFFFFF" stroke-width="4"/>'
            '<path d="M-39 12Q0 32 39 12" fill="none" stroke="#FFFFFF" stroke-width="4"/></g>')


def block(x, y, s, col, rot=0):
    return (f'<g transform="translate({x} {y}) rotate({rot}) scale({s})"><rect x="-28" y="-28" width="56" height="56" rx="9" fill="{col}"/>'
            '<circle r="13" fill="#FFFFFF"/></g>')


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


B = '../../'   # from build/html/ back to products/merch-mug/
LOCKUP = lambda base, v='': f'{base}../../brand/logo/lockup-horizontal{v}.svg'
MOCK_CSS = 'body{width:1600px;height:1200px;overflow:hidden;position:relative;background:var(--wash)}'
v11, v15 = PRICE['variants']['11oz'], PRICE['variants']['15oz']

# ---------------------------------------------------------------- mockups 1600 x 1200
for key in ('11oz', '15oz'):
    for face in ('slogan', 'seal'):
        body = f'''<svg class="lay" style="left:0;top:0" width="1600" height="1200">{ball_sym(1330, 1010, 70, 15)}{block(250, 1040, 1.4, '#3D86D8', -10)}</svg>
<div class="lay shadow" style="left:50%;top:170px;transform:translateX(-50%)">{mug(key, face, B, 600 if key == '11oz' else 640)}</div>'''
        write(f'build/html/mock-{key}-{face}.html', page(f'{key} mug, {face} side', body, B, MOCK_CSS))

body = f'''<svg class="lay" style="left:0;top:0" width="1600" height="1200">{ball_sym(1460, 1060, 64, 20)}{block(150, 1080, 1.4, '#2FA36B', -8)}</svg>
<div class="lay shadow" style="left:40px;top:360px">{mug('11oz', 'seal', '', 460)}</div>
<div class="lay shadow" style="left:700px;top:200px">{mug('15oz', 'slogan', '', 500)}</div>'''
write('mockup.html', page('Play Before Pixels mugs', body, '', MOCK_CSS))

# ---------------------------------------------------------------- cover 1600 x 1600
body = f'''<div style="position:absolute;inset:0;background:var(--t-sky)"></div>
<div class="lay" style="left:110px;top:100px"><div class="kick" style="font-size:36px">White ceramic mug · 11 oz and 15 oz</div>
<div class="disp" style="font-size:120px;line-height:.98;margin-top:22px">Talk, touch and play<br>come first mug</div></div>
<svg class="lay" style="left:0;top:0" width="1600" height="1600">{ball_sym(1400, 1400, 70, 12)}{block(190, 1420, 1.5, '#EE5A36', -10)}</svg>
<div class="lay shadow" style="left:50%;top:520px;transform:translateX(-50%)">{mug('15oz', 'slogan', '', 700)}</div>'''
write('cover.html', page('Play Before Pixels mug cover', body, '', 'body{width:1600px;height:1600px;overflow:hidden;position:relative}'))

# ---------------------------------------------------------------- listing images 2000 x 2000
L_CSS = """body{width:2000px;height:2000px;overflow:hidden;position:relative}
.pad{position:absolute;left:130px;right:130px}.kick{font-size:40px}
h2{margin:0;font-size:120px;line-height:1}
.sub{font-size:52px;line-height:1.35;margin:0}
.chips{position:absolute;left:130px;bottom:120px;display:flex;gap:26px}
.chip{font-size:46px;padding:26px 44px}.chip .ball{width:22px;height:22px}
.brand{position:absolute;right:130px;bottom:128px;width:360px}"""
imgs = {}
imgs['listing-01'] = f'''<div style="position:absolute;inset:0;background:var(--t-sky)"></div>
<div class="pad" style="top:120px"><div class="kick">White ceramic mug · 11 oz and 15 oz</div>
<h2 class="disp" style="margin-top:28px;font-size:140px">Talk, touch and play<br>come first</h2></div>
<svg class="lay" style="left:0;top:0" width="2000" height="2000">{ball_sym(1760, 1560, 80, 15)}</svg>
<div class="lay shadow" style="left:50%;top:600px;transform:translateX(-50%)">{mug('15oz', 'slogan', B, 700)}</div>
<div class="chips"><span class="chip"><span class="ball"></span>Two sizes</span><span class="chip"><span class="ball"></span>Printed when you order</span></div>'''

imgs['listing-02'] = f'''<div style="position:absolute;inset:0;background:var(--wash)"></div>
<div class="pad" style="top:120px"><div class="kick">Two sides</div><h2 class="disp" style="margin-top:24px">A seal on one side,<br>our line on the other</h2></div>
<div class="lay shadow" style="left:50px;top:760px">{mug('11oz', 'seal', B, 520)}</div>
<div class="lay shadow" style="left:1040px;top:760px">{mug('11oz', 'slogan', B, 520)}</div>
<p class="sub pad" style="top:1700px;color:var(--muted);font-size:46px">Left-handed or right-handed, one side always faces out.</p>'''

s11 = 560 / 3.4  # px per inch shared by both mugs so the sizes compare honestly
imgs['listing-03'] = f'''<div style="position:absolute;inset:0;background:var(--t-sun)"></div>
<div class="pad" style="top:120px"><div class="kick">Pick your size</div><h2 class="disp" style="margin-top:24px">11 oz or 15 oz</h2></div>
<div class="lay shadow" style="left:30px;top:{1640 - (3.8 + 0.2) * s11:.0f}px">{mug('11oz', 'slogan', B, 3.2 * s11)}</div>
<div class="lay shadow" style="left:960px;top:{1640 - (4.5 + 0.2) * s11:.0f}px">{mug('15oz', 'slogan', B, 3.4 * s11)}</div>
<div class="lay" style="left:130px;top:1700px;width:800px;font-size:50px;line-height:1.3"><b>11 oz</b> · ${v11["price_usd"]}<br><span style="color:var(--muted)">a classic coffee mug</span></div>
<div class="lay" style="left:1010px;top:1700px;width:860px;font-size:50px;line-height:1.3"><b>15 oz</b> · ${v15["price_usd"]}<br><span style="color:var(--muted)">for the big morning cup</span></div>'''

rows = [('Printed when you order', 'by our print partner, then shipped with tracking'),
        ('Color that lasts', 'the ink is baked into the coating (sublimation), not a sticker'),
        ('Dishwasher and microwave', "follow the partner's care rating printed on the listing"),
        ('For grown-ups', 'a mug for your coffee or tea, not a child’s cup')]
imgs['listing-04'] = f'''<div style="position:absolute;inset:0;background:var(--wash)"></div>
<div class="pad" style="top:120px"><div class="kick">The details</div><h2 class="disp" style="margin-top:24px">Made to be used every day</h2></div>
<div class="lay shadow" style="left:70px;top:620px">{mug('11oz', 'seal', B, 560)}</div>
<div class="lay" style="left:980px;top:560px;width:890px;font-size:50px;line-height:1.3">
{''.join(f'<div style="display:flex;gap:30px;margin-bottom:58px"><span class="ball" style="width:30px;height:30px;margin-top:17px"></span><div><b>{h}</b><br><span style="color:var(--muted)">{t}</span></div></div>' for h, t in rows)}</div>
<img class="brand" src="{LOCKUP(B)}">'''
for k, v in imgs.items():
    write(f'build/html/{k}.html', page(f'Mug listing image {k}', v, B, L_CSS))

# ---------------------------------------------------------------- production sheet (US Letter)
BOOK_CSS = """.page{width:8.5in;height:11in;position:relative;overflow:hidden;page-break-after:always;padding:.75in .8in}
h1{font-size:44px;line-height:1.02;margin:6px 0 14px}h2{font-size:26px;margin:22px 0 8px}
p,li,td,th{font-size:14.5px;line-height:1.5}.kick{font-size:12px}
table{border-collapse:collapse;width:100%;margin-top:8px}th{text-align:left;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);border-bottom:2px solid var(--ink);padding:6px 8px}
td{border-bottom:1px solid var(--line);padding:7px 8px;vertical-align:top}.muted{color:var(--muted)}
.box{background:var(--t-sun);border-radius:14px;padding:16px 20px;margin-top:16px}
.warn{background:var(--t-tomato)}
.fill{border:2px dashed #C8431F;border-radius:10px;padding:12px 16px;margin-top:10px;color:#C8431F;font-weight:700}
.foot{position:absolute;left:.8in;right:.8in;bottom:.45in;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:10px;font-size:11px;color:var(--muted)}
.foot img{height:22px}
code{font-family:"Nunito Sans",sans-serif;font-weight:700;font-size:12.5px;background:var(--wash);padding:1px 5px;border-radius:4px}"""


def foot(n):
    return f'<div class="foot"><img src="../../brand/logo/wordmark.svg" alt="Play Before Pixels"><span>playbeforepixels.com · Mug production sheet · {VERSION} · {n}</span></div>'


def pr(ch, v):
    return f'${v["net"][ch]:.2f} ({v["margin_pct"][ch]}%)'


pages = []
pages.append(f'''<section class="page"><div class="kick">Merch wave · ready-pending-accounts</div>
<h1 class="disp">“Talk, touch and play come first” mug</h1>
<p>A white ceramic mug for grown-ups in 11 oz and 15 oz, printed by sublimation. One side carries the Maker’s Seal; the other carries our tagline with the tomato ball as its period (brand/ORIGINALITY.md C1, kept but never trademarked, never on children’s items, never as a three-verb icon lockup).</p>
<div style="display:flex;gap:18px;margin:14px 0"><img src="preview/mockups/11oz-seal.png" style="width:48%;border-radius:12px"><img src="preview/mockups/15oz-slogan.png" style="width:48%;border-radius:12px"></div>
<h2 class="disp">Print files (partner-typical sizes, UNVERIFIED)</h2>
<table><tr><th>File</th><th>Size</th><th>Notes</th></tr>
<tr><td><code>print/mug-11oz_wrap.png</code> + .svg</td><td>2700 × 1050 px<br>9 × 3.5 in, 300 dpi</td><td>Seal centred at x = {META['11oz']['seal_c']}, slogan at x = {META['11oz']['slogan_c']} (90° from the handle)</td></tr>
<tr><td><code>print/mug-15oz_wrap.png</code> + .svg</td><td>2700 × 1200 px<br>9 × 4 in, 300 dpi</td><td>Seal at x = {META['15oz']['seal_c']}, slogan at x = {META['15oz']['slogan_c']}</td></tr></table>
<div class="fill">FILL IN on setup day: the chosen partner’s mug template size and which half faces out with the handle on the right. Change MUGS or SWAP_SIDES in build/build.py, then run bash build/render.sh.</div>
{foot(1)}</section>''')

pages.append(f'''<section class="page"><div class="kick">Safety and quality</div>
<h1 class="disp">A food-contact item. The sample decides.</h1>
<div class="box warn"><b>Food contact (UNVERIFIED until the partner’s documents are on file).</b><ul style="margin:6px 0 0 18px;padding:0">
<li>Use only the partner’s own ceramic mug blank that the partner states is lead-safe for food contact. Ask for its lead and cadmium test report (US FDA ceramicware leach limits, and California Proposition 65) and keep it in <code>products/merch-mug/</code>.</li>
<li>Proposition 65: a business with fewer than 10 employees is generally exempt from the warning duty, but the partner or a marketplace may still require a warning for California shipments. Confirm with the partner; never write “lead-free” or “non-toxic” unless their report supports it.</li>
<li>Only the partner’s dishwasher- and microwave-safe rating is repeated in the listing, word for word. No metallic, glitter or color-changing mugs (usually hand-wash and no microwave).</li></ul></div>
<div class="box"><b>Grown-ups only.</b> Sold as an adult coffee or tea mug. Never marketed as a child’s cup (children’s products need CPSIA testing, which stays held).</div>
<h2 class="disp">Sample gate (full list in QUALITY-STANDARD.md)</h2>
<ol style="padding-left:20px"><li>Order one 11 oz and one 15 oz.</li><li>Check print sharpness, the tomato and sky colors against the palette, and that the seal and line sit centred on each side.</li>
<li>Run 20 dishwasher cycles and 10 short microwave runs (as the partner rates it) on one mug; the print must not fade, peel or craze.</li><li>Record PASS or FAIL in panel.md. No listing goes live before PASS.</li></ol>
{foot(2)}</section>''')

pages.append(f'''<section class="page"><div class="kick">Price and profit</div>
<h1 class="disp">Everyday prices, every channel over the floor</h1>
<p>Floor: at least 30% margin on a print-on-demand sale (commerce/PRICING.md §2). The buyer pays the partner’s shipping rate at cost. Costs are typical partner costs, UNVERIFIED; fees as modeled across the repo, UNVERIFIED. Figures come from <code>build/pricing.py</code>.</p>
<table><tr><th>Size</th><th>Price</th><th>Partner cost + ship</th><th>Floor</th><th>Etsy</th><th>Gumroad</th><th>Own site</th></tr>
<tr><td>11 oz</td><td>${v11['price_usd']}</td><td>${v11['partner_cost_usd']:.2f} + ${v11['partner_shipping_usd']:.2f}</td><td>${v11['price_floor']:.2f}</td><td>{pr('etsy', v11)}</td><td>{pr('gumroad', v11)}</td><td>{pr('site', v11)}</td></tr>
<tr><td>15 oz</td><td>${v15['price_usd']}</td><td>${v15['partner_cost_usd']:.2f} + ${v15['partner_shipping_usd']:.2f}</td><td>${v15['price_floor']:.2f}</td><td>{pr('etsy', v15)}</td><td>{pr('gumroad', v15)}</td><td>{pr('site', v15)}</td></tr></table>
<div class="box"><b>Keep Etsy Offsite Ads off.</b> An ad-driven sale would net about ${v11['etsy_offsite_ads_net']['optional_15pct']:.2f} (11 oz) and ${v15['etsy_offsite_ads_net']['optional_15pct']:.2f} (15 oz), under the floor. If the shop passes the level where the ads become mandatory, raise prices first.<br><br>
<b>No free-shipping price.</b> Built-in shipping would need about ${v11['free_shipping_min_price_etsy']:.2f} for the 11 oz to keep the floor, above what buyers expect.<br><br>
<b>Highest partner cost that keeps the floor</b> (11 oz / 15 oz): Etsy ${v11['max_partner_cost_usd']['etsy']:.2f} / ${v15['max_partner_cost_usd']['etsy']:.2f} · Gumroad ${v11['max_partner_cost_usd']['gumroad']:.2f} / ${v15['max_partner_cost_usd']['gumroad']:.2f} · own site ${v11['max_partner_cost_usd']['site']:.2f} / ${v15['max_partner_cost_usd']['site']:.2f}.</div>
<p class="muted">Honest pricing: one everyday price per size. No “was” price, no permanent sale, no countdown, no “only X left” (print on demand never runs out).</p>
{foot(3)}</section>''')

pages.append(f'''<section class="page"><div class="kick">Your part</div>
<h1 class="disp">Founder choices, then the next step</h1>
<h2 class="disp">Human authorship (commit each change to git)</h2>
<div class="fill">FILL IN: your own line breaks for the slogan, which side faces out, and whether the 15 oz is worth listing. Edit the “Founder edits” block in build/build.py and run bash build/render.sh.</div>
<div class="fill">FILL IN: your own slogan ideas for a future mug. None may be printed until brand/ORIGINALITY.md keeps it.</div>
<h2 class="disp">More from Play Before Pixels</h2>
<table><tr><th>For</th><th>Product</th></tr>
<tr><td>Ages 0–5</td><td>100 Screen-Free Plays (paperback and PDF)</td></tr>
<tr><td>Ages 1–5</td><td>Ages 1–5 Instant Gift Bundle</td></tr>
<tr><td>Grown-ups</td><td>Play Before Pixels logo tee · sticker sheet</td></tr></table>
<p class="muted" style="margin-top:30px">{COPY} {VERSION}. Check every file against the chosen partner’s current mug template before upload.</p>
{foot(4)}</section>''')
write('source.html', page('Mug production sheet', ''.join(pages), '', BOOK_CSS, '8.5in 11in'))
print('pages written')
