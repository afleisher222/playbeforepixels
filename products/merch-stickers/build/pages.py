#!/usr/bin/env python3
"""Write every HTML page for the sticker sheet (run from products/merch-stickers/ after build.py and
pricing.py): mockups, cover, 2000 x 2000 listing images and the production sheet (source.html).
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
PROD = os.path.dirname(HERE)
META = {m['name']: m for m in json.load(open(os.path.join(HERE, 'sticker-meta.json')))}
PRICE = json.load(open(os.path.join(HERE, 'pricing.json')))['variants']['sheet']
VERSION = 'Version 1.0 · September 2026'
COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.'
SHEET_AR = 2481 / 1749

CSS = """
:root{--ink:#1D2940;--paper:#FFFFFF;--wash:#F3F6FB;--tomato:#EE5A36;--sun:#F5B820;--sky:#3D86D8;--grass:#2FA36B;--plum:#8A5CC7;
--t-tomato:#FDE9E3;--t-sun:#FEF4D8;--t-sky:#E3EEFA;--t-grass:#DFF3E9;--t-plum:#EFE6FA;--muted:#4A5468;--line:#E3E7EF}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--paper);color:var(--ink);font-family:"Nunito Sans",sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.disp{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;letter-spacing:-.02em}
.kick{font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#C8431F}
.shadow{filter:drop-shadow(0 22px 26px rgba(29,41,64,.16)) drop-shadow(0 3px 5px rgba(29,41,64,.10))}
.lift{filter:drop-shadow(0 3px 4px rgba(29,41,64,.22))}
.chip{display:inline-flex;align-items:center;gap:.5em;background:#fff;border-radius:999px;font-weight:800}
.ball{display:inline-block;border-radius:50%;background:var(--tomato);flex:none}
.lay{position:absolute}
"""


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


def sheet(base, w, rot=0, x=0, y=0):
    return (f'<div class="lay shadow" style="left:{x}px;top:{y}px;width:{w}px;height:{w*SHEET_AR:.0f}px;transform:rotate({rot}deg)">'
            f'<img src="{base}print/sticker-sheet.png" style="width:100%;height:100%;display:block;border-radius:{w*0.012:.0f}px"></div>')


def one(base, name, px_per_in, x, y, rot=0):
    m = META[name]
    return (f'<img class="lay lift" src="{base}print/die-cut/{name}.png" '
            f'style="left:{x}px;top:{y}px;width:{m["w_in"]*px_per_in:.0f}px;transform:rotate({rot}deg)">')


def laptop(x, y, w, h, inner=''):
    """A plain, unbranded laptop lid (a neutral object; no real product or logo)."""
    return (f'<div class="lay" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;background:#C9D0DB;border-radius:{w*0.04:.0f}px;overflow:hidden">'
            f'<div style="position:absolute;inset:0;background:linear-gradient(#0000,#0000)"></div>{inner}</div>')


B = '../../'
MOCK_CSS = 'body{width:1600px;height:1200px;overflow:hidden;position:relative;background:var(--wash)}'

# ---------------------------------------------------------------- mockups 1600 x 1200
body = f'''{sheet('', 560, -4, 170, 180)}
{laptop(840, 170, 680, 470)}
{one('', 'seal', 110, 900, 220, -6)}{one('', 'ball', 110, 1215, 240, 0)}{one('', 'blocks', 110, 1345, 300, 5)}
<div class="lay" style="left:860px;top:700px;width:520px;height:340px;background:#FFFFFF;border-radius:22px;box-shadow:0 18px 26px rgba(29,41,64,.12)">
<div style="position:absolute;left:0;top:0;bottom:0;width:36px;background:var(--grass);border-radius:22px 0 0 22px"></div></div>
{one('', 'book', 120, 960, 740, -3)}'''
write('mockup.html', page('Play Before Pixels sticker sheet', body, '', MOCK_CSS))
write('build/html/mock-sheet-flat.html', page('Sticker sheet flat', sheet(B, 680, 0, 460, 118), B, MOCK_CSS))

# ---------------------------------------------------------------- cover 1600 x 1600
body = f'''<div style="position:absolute;inset:0;background:var(--t-sun)"></div>
<div class="lay" style="left:110px;top:100px"><div class="kick" style="font-size:36px">Vinyl sticker sheet · 5 stickers · for grown-ups</div>
<div class="disp" style="font-size:118px;line-height:.98;margin-top:22px">Play Before Pixels<br>sticker sheet</div></div>
{sheet('', 620, -3, 170, 560)}
{laptop(900, 700, 600, 420)}{one('', 'seal', 110, 950, 740, -6)}{one('', 'ball', 110, 1290, 800, 0)}'''
write('cover.html', page('Play Before Pixels sticker cover', body, '', 'body{width:1600px;height:1600px;overflow:hidden;position:relative}'))

# ---------------------------------------------------------------- listing images 2000 x 2000
L_CSS = """body{width:2000px;height:2000px;overflow:hidden;position:relative}
.pad{position:absolute;left:130px;right:130px}.kick{font-size:40px}
h2{margin:0;font-size:120px;line-height:1}
.chips{position:absolute;left:130px;bottom:120px;display:flex;gap:26px}
.chip{font-size:46px;padding:26px 44px}.chip .ball{width:22px;height:22px}
.brand{position:absolute;right:130px;bottom:128px;width:360px}"""
imgs = {}
imgs['listing-01'] = f'''<div style="position:absolute;inset:0;background:var(--t-sun)"></div>
<div class="pad" style="top:120px"><div class="kick">Vinyl sticker sheet · for grown-ups</div>
<h2 class="disp" style="margin-top:28px;font-size:140px">5 play stickers,<br>one sheet</h2></div>
{sheet(B, 820, -3, 590, 560)}
<div class="chips"><span class="chip"><span class="ball"></span>Waterproof vinyl</span><span class="chip"><span class="ball"></span>Printed when you order</span></div>'''

names = [('seal', 'The Maker’s Seal'), ('ball', 'Ball'), ('blocks', 'Block tower'), ('book', 'Open book'), ('lockup', 'Our name')]
tiles = ''
pos = [(130, 440), (1020, 440), (130, 1010), (1020, 1010), (130, 1560)]
for (n, label), (x, y) in zip(names, pos):
    w = 1740 if n == 'lockup' else 850
    h = 300 if n == 'lockup' else 520
    m = META[n]
    ppi = min((w - 120) / m['w_in'], (h - 150) / m['h_in'], 170)
    tiles += (f'<div class="lay" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;background:#E3EEFA;border-radius:36px"></div>'
              f'{one(B, n, ppi, x + (w - m["w_in"]*ppi)/2, y + 40 + (h - 150 - m["h_in"]*ppi)/2)}'
              f'<div class="lay" style="left:{x+40}px;top:{y+h-86}px;font-size:44px;font-weight:800">{label} '
              f'<span style="color:var(--muted);font-weight:700">· about {m["w_in"]:.1f} × {m["h_in"]:.1f} in</span></div>')
imgs['listing-02'] = f'''<div style="position:absolute;inset:0;background:#fff"></div>
<div class="pad" style="top:120px"><div class="kick">What’s on the sheet</div><h2 class="disp" style="margin-top:24px">Our favorite play things</h2></div>{tiles}'''

imgs['listing-03'] = f'''<div style="position:absolute;inset:0;background:var(--wash)"></div>
<div class="pad" style="top:120px"><div class="kick">Where they go</div><h2 class="disp" style="margin-top:24px">Laptops, bottles, planners</h2></div>
{laptop(130, 520, 1000, 690)}{one(B, 'seal', 150, 180, 570, -6)}{one(B, 'ball', 150, 640, 580, 0)}{one(B, 'blocks', 150, 930, 700, 6)}
<div class="lay" style="left:1300px;top:470px;width:360px;height:1180px;background:#2FA36B;border-radius:120px 120px 70px 70px"></div>
<div class="lay" style="left:1400px;top:390px;width:160px;height:110px;background:#1D2940;border-radius:26px"></div>
{one(B, 'book', 110, 1330, 1000, -4)}
<div class="lay" style="left:130px;top:1320px;width:1000px;height:520px;background:#fff;border-radius:30px;box-shadow:0 18px 26px rgba(29,41,64,.10)">
<div style="position:absolute;left:0;top:0;bottom:0;width:56px;background:var(--plum);border-radius:30px 0 0 30px"></div></div>
{one(B, 'lockup', 180, 250, 1480, -2)}'''

rows = [('Waterproof vinyl', 'wipe it clean; checked on our own sample first'),
        ('Matte finish', 'soft look, no glare'),
        ('Kiss-cut sheet', 'each sticker peels off on its own'),
        ('Not a toy', 'keep away from young children; small parts')]
imgs['listing-04'] = f'''<div style="position:absolute;inset:0;background:var(--wash)"></div>
<div class="pad" style="top:120px"><div class="kick">The details</div><h2 class="disp" style="margin-top:24px">Made for grown-ups</h2></div>
{sheet(B, 700, 0, 130, 480)}
<div class="lay" style="left:980px;top:520px;width:890px;font-size:50px;line-height:1.3">
{''.join(f'<div style="display:flex;gap:30px;margin-bottom:62px"><span class="ball" style="width:30px;height:30px;margin-top:17px"></span><div><b>{h}</b><br><span style="color:var(--muted)">{t}</span></div></div>' for h, t in rows)}</div>
<img class="brand" src="{B}../../brand/logo/lockup-horizontal.svg">'''
for k, v in imgs.items():
    write(f'build/html/{k}.html', page(f'Sticker listing image {k}', v, B, L_CSS))

# ---------------------------------------------------------------- production sheet (US Letter)
BOOK_CSS = """.page{width:8.5in;height:11in;position:relative;overflow:hidden;page-break-after:always;padding:.75in .8in}
h1{font-size:44px;line-height:1.02;margin:6px 0 14px}h2{font-size:26px;margin:22px 0 8px}
p,li,td,th{font-size:14.5px;line-height:1.5}.kick{font-size:12px}
table{border-collapse:collapse;width:100%;margin-top:8px}th{text-align:left;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);border-bottom:2px solid var(--ink);padding:6px 8px}
td{border-bottom:1px solid var(--line);padding:7px 8px;vertical-align:top}.muted{color:var(--muted)}
.box{background:var(--t-sun);border-radius:14px;padding:16px 20px;margin-top:16px}.warn{background:var(--t-tomato)}
.fill{border:2px dashed #C8431F;border-radius:10px;padding:12px 16px;margin-top:10px;color:#C8431F;font-weight:700}
.foot{position:absolute;left:.8in;right:.8in;bottom:.45in;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:10px;font-size:11px;color:var(--muted)}
.foot img{height:22px}
code{font-family:"Nunito Sans",sans-serif;font-weight:700;font-size:12.5px;background:var(--wash);padding:1px 5px;border-radius:4px}"""


def foot(n):
    return f'<div class="foot"><img src="../../brand/logo/wordmark.svg" alt="Play Before Pixels"><span>playbeforepixels.com · Sticker production sheet · {VERSION} · {n}</span></div>'


sizes = ''.join(f'<tr><td>{label}</td><td><code>print/die-cut/{n}.png</code></td><td>{META[n]["w_in"]:.2f} × {META[n]["h_in"]:.2f} in</td></tr>' for n, label in names)
pages = [f'''<section class="page"><div class="kick">Merch wave · ready-pending-accounts</div>
<h1 class="disp">Play Before Pixels sticker sheet</h1>
<p>One kiss-cut vinyl sheet with five stickers: the Maker’s Seal, a ball, a block tower, an open book and our name. Sold to grown-ups for laptops, bottles and planners. No slogan, and no condition or health words anywhere.</p>
<div style="display:flex;gap:20px;align-items:flex-start;margin-top:10px"><img src="print/sticker-sheet.png" style="width:30%;border-radius:8px;box-shadow:0 6px 14px rgba(29,41,64,.15)">
<div style="flex:1"><table><tr><th>Sticker</th><th>Die-cut file</th><th>Size</th></tr>{sizes}</table>
</div></div>
<h2 class="disp">Print files (partner-typical sizes, UNVERIFIED)</h2>
<table><tr><th>File</th><th>Size</th><th>Use</th></tr>
<tr><td><code>print/sticker-sheet.png</code> + .svg</td><td>1749 × 2481 px, 5.83 × 8.27 in, 300 dpi</td><td>kiss-cut sheet</td></tr>
<tr><td><code>print/sticker-sheet_cutlines.svg</code></td><td>same size</td><td>cut contours (CutContour), if the partner asks</td></tr>
<tr><td><code>print/die-cut/*.png</code></td><td>each at its own size, 300 dpi</td><td>single die-cut stickers, if sold one by one later</td></tr></table>
<div class="fill">FILL IN on setup day: the partner’s sheet template size and whether it cuts from its own contour or from the cut file. Adjust W, H or BORDER in build/build.py and run bash build/render.sh.</div>
{foot(1)}</section>''',
f'''<section class="page"><div class="kick">Safety and quality</div>
<h1 class="disp">For grown-ups. Never a toy.</h1>
<div class="box warn"><b>Choking and small parts (UNVERIFIED legal reading; confirm with a product-safety attorney).</b><ul style="margin:6px 0 0 18px;padding:0">
<li>Stickers peel off into small, thin pieces a young child could put in the mouth. The sheet margin, every listing and the FAQ say: <b>“Not a toy. Keep away from young children.”</b></li>
<li>Marketed to adults only: laptops, bottles, planners. No kid models, no “for kids” words or tags, no nursery or classroom photos, no children’s gift guides.</li>
<li>Stickers with toy pictures could be read as a children’s product (CPSIA factors include marketing, packaging and appeal). If that ever happens, stop selling; children’s products stay held until third-party testing and a Children’s Product Certificate are funded.</li></ul></div>
<div class="box"><b>Logo and motif rules.</b> The spinning top appears only inside its seal (logo guidelines: nowhere else does the top appear without its disc). The blocks are an illustration stacked as a tower, never a 2 × 2 grid or a brand mark.</div>
<h2 class="disp">Sample gate (full list in QUALITY-STANDARD.md)</h2>
<ol style="padding-left:20px"><li>Order one sheet in the chosen finish (matte first).</li><li>Check colors, the white borders and that every kiss-cut lifts cleanly.</li>
<li>Stick one on a bottle: 24 hours in water, then 10 hand washes. No lifting, fading or smearing, or the listing must not say waterproof.</li><li>Record PASS or FAIL in panel.md. No listing goes live before PASS.</li></ol>
{foot(2)}</section>''',
f'''<section class="page"><div class="kick">Price and profit</div>
<h1 class="disp">One everyday price, every channel over the floor</h1>
<p>Floor: at least 30% margin on a print-on-demand sale (commerce/PRICING.md §2). The buyer pays the partner’s shipping rate at cost. Cost is a typical partner cost, UNVERIFIED; fees as modeled across the repo, UNVERIFIED. Figures come from <code>build/pricing.py</code>.</p>
<table><tr><th>Item</th><th>Price</th><th>Partner cost + ship</th><th>Floor</th><th>Etsy</th><th>Gumroad</th><th>Own site</th></tr>
<tr><td>Sheet of 5</td><td>${PRICE['price_usd']}</td><td>${PRICE['partner_cost_usd']:.2f} + ${PRICE['partner_shipping_usd']:.2f}</td><td>${PRICE['price_floor']:.2f}</td>
<td>${PRICE['net']['etsy']:.2f} ({PRICE['margin_pct']['etsy']}%)</td><td>${PRICE['net']['gumroad']:.2f} ({PRICE['margin_pct']['gumroad']}%)</td><td>${PRICE['net']['site']:.2f} ({PRICE['margin_pct']['site']}%)</td></tr></table>
<div class="box"><b>Tight on Gumroad.</b> The floor holds only while the partner charges ${PRICE['max_partner_cost_usd']['gumroad']:.2f} or less (Etsy ${PRICE['max_partner_cost_usd']['etsy']:.2f}, own site ${PRICE['max_partner_cost_usd']['site']:.2f}). Above that, raise the everyday price to $16 before launch, or skip Gumroad.<br><br>
<b>Keep Etsy Offsite Ads off.</b> An ad-driven sale would net about ${PRICE['etsy_offsite_ads_net']['optional_15pct']:.2f}, under the ${PRICE['price_floor']:.2f} floor.<br><br>
<b>Best as an add-on.</b> marketing/DEMAND-CHECK.md rates stickers weak and bundle-only, so the main use is an add-on beside a tee or mug in the same order, where shipping adds little.</div>
<p class="muted">Honest pricing: one everyday price, $3 a sticker. No “was” price, no permanent sale, no countdown.</p>
{foot(3)}</section>''',
f'''<section class="page"><div class="kick">Your part</div>
<h1 class="disp">Founder choices, then the next step</h1>
<h2 class="disp">Human authorship (commit each change to git)</h2>
<div class="fill">FILL IN: your choice of stickers, their sizes, colors and layout, and matte or gloss. Edit build/build.py and run bash build/render.sh.</div>
<div class="fill">FILL IN: any sixth sticker you draw or choose yourself (no slogans unless brand/ORIGINALITY.md keeps them).</div>
<h2 class="disp">More from Play Before Pixels</h2>
<table><tr><th>For</th><th>Product</th></tr>
<tr><td>Ages 0–5</td><td>100 Screen-Free Plays (paperback and PDF)</td></tr>
<tr><td>Ages 1–5</td><td>Ages 1–5 Instant Gift Bundle</td></tr>
<tr><td>Grown-ups</td><td>Play Before Pixels logo tee · “Talk, touch and play come first” mug</td></tr></table>
<p class="muted" style="margin-top:30px">{COPY} {VERSION}. Check every file against the chosen partner’s current sticker template before upload.</p>
{foot(4)}</section>''']
write('source.html', page('Sticker production sheet', ''.join(pages), '', BOOK_CSS, '8.5in 11in'))
print('pages written')
