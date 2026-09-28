#!/usr/bin/env python3
"""Write source.html: the production book for the core merch line (US Letter).
Run from products/merch-core/ after build.py, pages.py and the mockup renders."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
PROD = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from pages import qr_svg, VERSION, COPY  # noqa: E402

CSS = """
@page{size:8.5in 11in;margin:0}
:root{--ink:#1D2940;--paper:#FFFFFF;--wash:#F3F6FB;--tomato:#EE5A36;--sun:#F5B820;--sky:#3D86D8;--grass:#2FA36B;--plum:#8A5CC7;
--t-tomato:#FDE9E3;--t-sun:#FEF4D8;--t-sky:#E3EEFA;--t-grass:#DFF3E9;--t-plum:#EFE6FA;--muted:#4A5468;--line:#E3E7EF}
*{box-sizing:border-box}
html,body{margin:0;background:#fff;color:var(--ink);font-family:"Nunito Sans",sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:8.5in;height:11in;position:relative;overflow:hidden;page-break-after:always;padding:.6in .6in .9in;background:#fff}
.disp{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;letter-spacing:-.015em}
.kick{font-size:8.5pt;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--tomato);margin:0 0 4pt}
h2{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:27pt;line-height:1.05;margin:0 0 12pt;letter-spacing:-.015em}
h3{font-family:"Bricolage Grotesque","Nunito Sans",sans-serif;font-weight:800;font-size:13pt;margin:14pt 0 5pt}
p,li{font-size:10.5pt;line-height:1.5;margin:0 0 7pt}
.lead{font-size:12.5pt;line-height:1.45}
.muted{color:var(--muted)}
.small{font-size:8.8pt;line-height:1.45}
table{border-collapse:collapse;width:100%;font-size:9.3pt}
th{text-align:left;font-size:7.8pt;letter-spacing:.07em;text-transform:uppercase;color:#6B7488;border-bottom:2px solid var(--ink);padding:5pt 6pt 5pt 0}
td{border-bottom:1px solid var(--line);padding:6pt 6pt 6pt 0;vertical-align:top;line-height:1.4}
.box{border-radius:10pt;padding:12pt 14pt;background:var(--wash)}
.box.sun{background:var(--t-sun)}.box.tom{background:var(--t-tomato)}.box.grass{background:var(--t-grass)}.box.sky{background:var(--t-sky)}
.founder{border:2px dashed var(--tomato);border-radius:10pt;padding:10pt 14pt;background:#fff}
.founder .kick{color:var(--tomato)}
.line{border-bottom:1.5px solid #C9D2E0;height:24pt}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14pt}
.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12pt}
.pill{display:inline-block;border-radius:99px;padding:2pt 8pt;font-size:8pt;font-weight:800;letter-spacing:.04em}
.ok{background:var(--t-grass);color:#1F7A4F}.stop{background:var(--t-tomato);color:#B83E1E}.wait{background:var(--t-sun);color:#8A6300}
ul.balls{list-style:none;padding:0;margin:0}
ul.balls li{position:relative;padding-left:16pt}
ul.balls li:before{content:"";position:absolute;left:2pt;top:5.5pt;width:7pt;height:7pt;border-radius:50%;background:var(--tomato)}
ol.steps{padding-left:16pt;margin:0}ol.steps li{margin-bottom:6pt;padding-left:3pt}
ul.checks{list-style:none;padding:0;margin:0}
ul.checks li{position:relative;padding-left:20pt;margin-bottom:5pt}
ul.checks li:before{content:"";position:absolute;left:0;top:2pt;width:10pt;height:10pt;border:1.5px solid var(--ink);border-radius:3pt}
ul.checks li.done:before{background:var(--grass);border-color:var(--grass)}
.foot{position:absolute;left:.6in;right:.6in;bottom:.4in;display:flex;justify-content:space-between;align-items:center;font-size:7.8pt;color:#6B7488;border-top:1px solid var(--line);padding-top:7pt}
.foot img{height:15pt}
.panel{border-radius:10pt;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
.checker{background-color:#fff;background-image:linear-gradient(45deg,#EEF1F6 25%,transparent 25%),linear-gradient(-45deg,#EEF1F6 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#EEF1F6 75%),linear-gradient(-45deg,transparent 75%,#EEF1F6 75%);background-size:14px 14px;background-position:0 0,0 7px,7px -7px,-7px 0}
.cap{font-size:8.3pt;color:var(--muted);margin-top:4pt;line-height:1.35}
code{font-family:"Nunito Sans",sans-serif;font-weight:700;font-size:8.3pt;background:var(--wash);padding:0 3pt;border-radius:3pt}
"""

pages = []


def pg(body, n, bg='#fff'):
    foot = (f'<div class="foot"><img src="../../brand/logo/wordmark.svg" alt="Play Before Pixels">'
            f'<span>playbeforepixels.com · Core merch production book · {VERSION} · {n}</span></div>')
    pages.append(f'<section class="page" style="background:{bg}">{body}{foot}</section>')


# 1 cover
pg(f'''<p class="kick" style="margin-top:.1in">Production book · adult merch</p>
<div class="disp" style="font-size:52pt;line-height:.98">Core merch</div>
<p class="lead" style="margin-top:12pt;max-width:5.6in">Two adult tees in four colors (the logo tee and “More talk, less tap”), a “Laps not apps” tote that only comes in gift bundles, and the inside-neck label and hang tag that carry the brand name on every order.</p>
<div style="margin-top:14pt;display:flex;gap:6pt;flex-wrap:wrap"><span class="pill ok">Adult sizes only</span><span class="pill ok">Print on demand</span><span class="pill ok">No inventory</span><span class="pill wait">Slogans: search before publishing</span></div>
<img src="mockup.png" style="width:100%;border-radius:12pt;margin-top:20pt;display:block">
<div style="position:absolute;left:.6in;right:.6in;bottom:1.05in;display:flex;justify-content:space-between;align-items:flex-end">
<img src="../../brand/logo/lockup-horizontal.svg" style="width:2.3in">
<p class="small muted" style="text-align:right;margin:0">{COPY}<br>{VERSION}</p></div>''', 1, '#FEF4D8')

# 2 at a glance
pg('''<p class="kick">The line at a glance</p><h2>Three design slots. Two are filled.</h2>
<p class="lead">DEMAND-CHECK.md allows at most three adult designs, as identity merch rather than a merch line. brand/ORIGINALITY.md keeps exactly one slogan for a tee (“More talk, less tap”) and one for the tote (“Laps not apps”), so slot 3 stays empty on purpose.</p>
<table style="margin-top:10pt"><tr><th style="width:22%">Item</th><th style="width:20%">Status</th><th>Files</th><th style="width:19%">Everyday price</th><th style="width:17%">Sold on</th></tr>
<tr><td><b>Logo tee</b><br><span class="muted">design 1 of 3</span></td><td><span class="pill ok">Ready to set up</span></td><td><code>print/tee-logo_light</code> and <code>_dark</code> (.png + .svg)</td><td>$27 XS–XL<br>$29 2XL · $33 3XL</td><td>Own site, Etsy, Amazon Merch on Demand</td></tr>
<tr><td><b>“More talk, less tap” tee</b><br><span class="muted">design 2 of 3</span></td><td><span class="pill wait">Search, then set up</span><br><span class="small muted">class 25 + Etsy + Amazon check</span></td><td><code>print/tee-more-talk-less-tap_light</code> and <code>_dark</code></td><td>$27 XS–XL<br>$29 2XL · $33 3XL</td><td>Own site, Etsy, Amazon Merch on Demand</td></tr>
<tr><td><b>Slogan tee</b><br><span class="muted">slot 3</span></td><td><span class="pill stop">Empty on purpose</span></td><td><code>slogan-slot/</code> template only</td><td>–</td><td>–</td></tr>
<tr><td><b>“Laps not apps” tote</b></td><td><span class="pill wait">Bundle add-on only</span></td><td><code>print/tote-laps-not-apps_light</code> and <code>_dark</code> (logo-only fallback: <code>tote-logo_</code>)</td><td>+$22 inside a bundle</td><td>Own-site bundles only</td></tr>
<tr><td><b>Inside-neck label</b></td><td><span class="pill wait">Fill in 2 fields</span></td><td><code>labels/</code> 7 sizes × light and dark</td><td>included</td><td>printed by the partner</td></tr>
<tr><td><b>Hang tag / pack-in</b></td><td><span class="pill wait">Optional</span></td><td><code>hang-tag.pdf</code> (site and marketplace editions)</td><td>included</td><td>only if the partner offers it</td></tr></table>
<div class="box sun" style="margin-top:16pt"><p class="kick" style="color:#8A6300">Six rules for this line</p><ul class="balls">
<li><b>Grown-up sizes only.</b> No kids' tees or onesies: they need children's-product testing and a certificate (DEMAND-CHECK cut, CAMPAIGN-BIBLE [CPSIA]).</li>
<li><b>Print on demand only.</b> The partner prints and ships each order. Nothing is ever stocked, packed or shipped by the founder.</li>
<li><b>The logo comes from <code>brand/logo/</code>, unaltered.</b> No retyping, recoloring, effects or new lockups.</li>
<li><b>™, never ®.</b> PLAY BEFORE PIXELS is not registered or filed yet.</li>
<li><b>Only slogans ORIGINALITY.md keeps for that item</b> (the build checks), searched before publishing, and never an event name.</li>
<li><b>No condition words</b> (diagnosis or condition terms, see BRAND.md) on merch, listings, tags or ads.</li></ul></div>''', 2)

# 3 logo tee print files
pg('''<p class="kick">Design 1 · logo tee</p><h2>Front print files</h2>
<div class="grid2">
<div><div class="panel checker" style="height:3.9in;border:1px solid var(--line)"><img src="print/tee-logo_light.png" style="height:3.7in;outline:1.5px dashed #9AA6BA"></div>
<p class="cap"><b>tee-logo_light</b> · ink P, tomato ball · for White, Natural and Mustard. Dashed line = the 15 × 18 in canvas.</p></div>
<div><div class="panel" style="height:3.9in;background:#243150"><img src="print/tee-logo_dark.png" style="height:3.7in;outline:1.5px dashed #6B7A99"></div>
<p class="cap"><b>tee-logo_dark</b> · paper P, tomato ball (the kit's reverse) · for Navy</p></div></div>
<table style="margin-top:12pt">
<tr><th style="width:30%">Spec</th><th>Value</th></tr>
<tr><td>Canvas</td><td>4500 × 5400 px, transparent PNG stamped 300 dpi (15 × 18 in). The .svg twin is pure vector (logo paths from the kit).</td></tr>
<tr><td>Artwork</td><td>Horizontal lockup, the kit's default. Ink about 10.5 in wide × 2.5 in tall, centered left to right.</td></tr>
<tr><td>Position</td><td>Ink starts about 1.2 in below the top of the print area, so it sits high on the chest. Check it on the partner's mockup: aim for 3–3.5 in below the collar seam (UNVERIFIED: on the partner's placement tool).</td></tr>
<tr><td>Colors</td><td>Ink #1D2940 · tomato #EE5A36 · paper #FFFFFF. Nothing else.</td></tr>
<tr><td>Size checks</td><td>Minimum print width for the lockup is 40 mm: this is 267 mm. The gaps around the ball print at about 4.5 mm (floor 1.5 mm).</td></tr>
<tr><td>Method</td><td>Direct-to-garment (DTG). For embroidery, use the kit's one-color files and its embroidery minimums instead: this file is not for stitching.</td></tr></table>''', 3)

# 4 colors
tiles = ''.join(f'''<div><img src="preview/mockups/tee-{s}.png" style="width:100%;border-radius:8pt;display:block">
<p class="cap"><span style="display:inline-block;width:9pt;height:9pt;border-radius:50%;background:{h};box-shadow:inset 0 0 0 1px rgba(29,41,64,.25);vertical-align:-1pt"></span> <b>{n}</b> · {f}</p></div>''' for s, n, h, f in [
    ('white', 'White', '#FFFFFF', 'tee-logo_light'), ('natural', 'Natural', '#F2EBDD', 'tee-logo_light'),
    ('mustard', 'Mustard', '#E6B23F', 'tee-logo_light'), ('navy', 'Navy', '#243150', 'tee-logo_dark')])
pg(f'''<p class="kick">Design 1 · colorways</p><h2>Four garment colors</h2>
<p>Light garments take the full-color logo. Navy is the garment closest to ink, so it takes the reverse. Black, grass and plum garments are left out on purpose: the kit allows only white one-color logos on them, and they are off-palette.</p>
<div class="grid2" style="margin-top:8pt">{tiles}</div>
<div class="founder" style="margin-top:12pt"><p class="kick">Owner's choice (optional) · human authorship</p>
<p class="small" style="margin:0 0 6pt">Confirm or change the four colors (use the partner's closest named color and check each against a physical sample). Your choices are part of your creative contribution: write them here and commit.</p>
<div class="grid2"><div class="line"></div><div class="line"></div></div></div>''', 4)

# 5 tote
pg('''<p class="kick">Bundle add-on</p><h2>“Laps not apps” tote</h2>
<p class="lead">The tote is never listed on its own (DEMAND-CHECK: bundle-only). It is a +$22 add-on inside own-site gift bundles.</p>
<div class="grid2" style="margin-top:6pt">
<div><img src="preview/mockups/tote-natural.png" style="width:100%;border-radius:8pt;display:block"><p class="cap"><b>Natural canvas</b> · tote-laps-not-apps_light</p></div>
<div><img src="preview/mockups/tote-dark.png" style="width:100%;border-radius:8pt;display:block"><p class="cap"><b>Black</b> · tote-laps-not-apps_dark</p></div></div>
<table style="margin-top:10pt"><tr><th style="width:30%">Spec</th><th>Value</th></tr>
<tr><td>Canvas</td><td>3600 × 3600 px, transparent PNG at 300 dpi (12 × 12 in), plus vector .svg.</td></tr>
<tr><td>Artwork</td><td>“Laps not apps” in Bricolage Grotesque 800 with the tomato ball as the period (ORIGINALITY.md C4 keeps it for the tote), about 9 in wide, with the horizontal lockup 4.3 in wide below. Fallback if the slogan search finds a conflict: <code>tote-logo_light|dark</code>, the stacked logo alone.</td></tr>
<tr><td>Where it appears</td><td>Holiday gift bundle (tee + tote + a digital play kit) and any later gift bundle. Teacher bundles stay on hold with all school-facing work.</td></tr>
<tr><td>Check</td><td>Tote print areas differ by blank: confirm the partner's area and shrink the canvas if it is smaller than 12 × 12 in (UNVERIFIED).</td></tr></table>
<div class="box sun" style="margin-top:14pt"><p class="kick" style="color:#8A6300">Bundle math, the honest way</p>
<p class="small" style="margin:0">Example: logo tee ($27) + “Laps not apps” tote (+$22) + a digital play kit, sold as one own-site checkout. Price the bundle 10–25% under the sum of its parts and say so in plain words (“$X, or $Y bought separately”). Never show the separate total as a crossed-out price. The print partner ships the tee and tote; the play kit arrives by email.</p></div>''', 5)

# 6 neck label
lab = ''.join(f'<div style="text-align:center"><img src="labels/neck-label_{s}_light.png" style="width:100%;border:1px solid var(--line);border-radius:6pt"><p class="cap">{s}</p></div>' for s in ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'])
pg(f'''<p class="kick">Trademark use</p><h2>Inside-neck label</h2>
<p>The brand name printed inside the neck is how clothing shows a trademark in use (a front logo alone can be seen as decoration). Every tee carries it.</p>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8pt">{lab}
<div style="text-align:center"><div style="background:#243150;border-radius:6pt"><img src="labels/neck-label_M_dark.png" style="width:100%;display:block"></div><p class="cap">M · dark (Navy)</p></div></div>
<table style="margin-top:6pt"><tr><th style="width:30%">Spec</th><th>Value</th></tr>
<tr><td>Files</td><td><code>labels/neck-label_SIZE_light|dark</code>, 900 × 900 px (3 × 3 in at 300 dpi), .png + vector .svg (UNVERIFIED: against the partner's inside-label template).</td></tr>
<tr><td>On every label</td><td>Horizontal lockup · size · ADULT UNISEX · PLAY BEFORE PIXELS™ · AlphaPlay LLC (the business named on the label) · care · fiber and country of origin.</td></tr>
<tr><td>You fill in</td><td>Fiber content and country of origin come from the blank you choose. Type them into <code>BLANK</code> at the top of <code>build/build.py</code> and run <code>build/render.sh</code>. Until then the labels print a tomato FILL IN box, so they cannot go out by mistake. Check care wording against the blank's spec too.</td></tr>
<tr><td>ALPHAPLAY</td><td>These tees do not help the ALPHAPLAY filing: its clothing class covers sports pinnies only. Do not add ALPHAPLAY to the tee.</td></tr></table>''', 6)

# 7 hang tag
pg('''<p class="kick">Optional</p><h2>Hang tag and pack-in card</h2>
<p>2 × 3.5 in, 0.125 in bleed on every edge, text 0.25 in from the page edge. Use it only if the partner offers branded hang tags or pack-in inserts (UNVERIFIED); otherwise it doubles as the gift note image on the product page.</p>
<div class="grid3" style="margin-top:8pt;align-items:start">
<div><img src="preview/hang-tag/p01.png" style="width:100%;border-radius:6pt;box-shadow:0 0 0 1px var(--line)"><p class="cap"><b>Front</b> · on sun: ink P, tomato ball</p></div>
<div><img src="preview/hang-tag/p02.png" style="width:100%;border-radius:6pt;box-shadow:0 0 0 1px var(--line)"><p class="cap"><b>Back, site edition</b> · QR and short link to the free bonus</p></div>
<div><img src="preview/hang-tag/p03.png" style="width:100%;border-radius:6pt;box-shadow:0 0 0 1px var(--line)"><p class="cap"><b>Back, marketplace edition</b> · no URL or QR (Etsy)</p></div></div>
<div class="box sky" style="margin-top:12pt"><p class="small" style="margin:0">The dashed circle marks where a hole would be punched; it is a guide for the printer, not art. Print file: <code>hang-tag.pdf</code> (page 1 front, page 2 site back, page 3 marketplace back).</p></div>
<table style="margin-top:14pt"><tr><th style="width:34%">Where the order comes from</th><th>Which back</th><th>Why</th></tr>
<tr><td>playbeforepixels.com</td><td>Site edition (QR + short link)</td><td>Every product leads to the free bonus and the next product.</td></tr>
<tr><td>Etsy</td><td>Marketplace edition</td><td>Etsy editions carry no URL or QR (customer-voice rule 2); Etsy does not allow sending buyers off-platform.</td></tr>
<tr><td>Amazon Merch on Demand</td><td>None</td><td>Amazon prints its own packaging; no inserts.</td></tr></table>''', 7)

# 8 slogan tee (design 2) and slot 3
pg('''<p class="kick">Design 2 of 3</p><h2>“More talk, less tap” tee</h2>
<div class="grid2">
<div><div class="panel checker" style="height:2.9in;border:1px solid var(--line)"><img src="print/tee-more-talk-less-tap_light.png" style="height:2.75in;outline:1.5px dashed #9AA6BA"></div>
<p class="cap"><b>tee-more-talk-less-tap_light</b> · ink type, tomato ball · White, Natural, Mustard</p></div>
<div><div class="panel" style="height:2.9in;background:#243150"><img src="print/tee-more-talk-less-tap_dark.png" style="height:2.75in;outline:1.5px dashed #6B7A99"></div>
<p class="cap"><b>tee-more-talk-less-tap_dark</b> · paper type, tomato ball · Navy</p></div></div>
<table style="margin-top:8pt"><tr><th style="width:26%">Spec</th><th>Value</th></tr>
<tr><td>Why this line</td><td>brand/ORIGINALITY.md C3 keeps it “for tee and copy”, and its merch list names exactly this tee. Never trademark it (™ goes on the brand name only).</td></tr>
<tr><td>Artwork</td><td>Bricolage Grotesque 800, outlined, about 11 in wide; the tomato ball is the period. Horizontal lockup 4.3 in wide below it. 4500 × 5400 px, 300 dpi, transparent, plus vector .svg.</td></tr>
<tr><td>Before publishing</td><td>USPTO class 25 search plus Etsy, Amazon and Redbubble searches for the exact phrase (ORIGINALITY.md 4b). Log the result. If a live clothing use turns up, pull this design.</td></tr></table>
<h3>Slot 3 stays empty on purpose</h3>
<p class="small" style="margin:0 0 5pt">No other line is kept for a tee. “Play first. The pixels will keep.” is copy only; the tagline never goes on children's items; these are retired: “Pencils before pixels”, “Childhood can't wait. Screens can.”, “Paper first”, “Screen-free and proud of it”, “Ask me what I built today”. To fill slot 3: write the line yourself, run the originality check, have ORIGINALITY.md keep it “for tee”, add it to <code>SLOGANS</code> in build/build.py and run build/render.sh. The build stops on anything else.</p>
<div class="founder" style="margin-top:6pt"><p class="kick">Owner's slot (optional) · layout choices and slogan ideas</p><div class="line"></div><div class="line"></div><div class="line"></div></div>''', 8)

# 9 setup
pg('''<p class="kick">Set up once, then it runs</p><h2>Putting it on sale</h2>
<ol class="steps">
<li><b>Pick one print partner</b> (Printful, Printify or Gelato, per commerce/storefront-setup-guide.md) that offers DTG on all four colors, inside-neck label printing, and both Etsy and the site's store integration.</li>
<li><b>Pick one mid-weight unisex cotton blank.</b> Save its size chart. Fill in fiber and origin in <code>build/build.py</code>, then run <code>build/render.sh</code>.</li>
<li><b>Create the tees.</b> Logo tee: upload <code>tee-logo_light.png</code> to White, Natural and Mustard and <code>tee-logo_dark.png</code> to Navy. Slogan tee (after its search): the same with <code>tee-more-talk-less-tap_light|dark.png</code>. Sizes XS–3XL. Match the placement on pages 3 and 8.</li>
<li><b>Add the labels</b>, light files for light colors and dark files for Navy, one per size. If labels are not offered, remove the label panel from listing image 4 before listing.</li>
<li><b>Order one sample per color.</b> Check print, colors, label and fit, wash one five times, and photograph it on a flat surface (faceless: hands at most).</li>
<li><b>Etsy:</b> list the partner as your production partner, mark the item “Designed by” you, disclose the digital and AI tools used for the art, add the size chart, and upload the seven listing images in order (<code>listing-01…07</code> for the logo tee, <code>slogan-01…07</code> for the slogan tee).</li>
<li><b>Own site:</b> the same listing, plus the tote bundle and the “Next for you” links (see listing.json).</li>
<li><b>Amazon Merch on Demand:</b> apply; upload the same 4500 × 5400 files with brand “Play Before Pixels”. Approval and design-slot limits apply (UNVERIFIED: current terms).</li>
<li><b>Money and tax:</b> give the partner your resale certificate, set the shipping profile, and write the returns line (the partner replaces misprints and damage; you decide on size exchanges).</li></ol>
<div class="box grass" style="margin-top:10pt"><p class="small" style="margin:0"><b>Runs without you:</b> orders go straight to the partner; tracking and delivery emails are automatic; the FAQ in listing.json answers sizing, care, timing and returns.</p></div>
<h3>What buyers ask (already answered in listing.json)</h3>
<div class="grid2"><div class="box"><p class="small" style="margin:0"><b>Do you make kids' sizes?</b><br>No. Adult unisex XS–3XL only.</p></div>
<div class="box"><p class="small" style="margin:0"><b>How long does it take?</b><br>Each tee is printed when you order, then shipped with tracking.</p></div>
<div class="box"><p class="small" style="margin:0"><b>How does it fit?</b><br>Unisex fit; measure a tee you love and match the chart.</p></div>
<div class="box"><p class="small" style="margin:0"><b>Can I buy the tote?</b><br>It comes only inside gift bundles on our site.</p></div></div>''', 9)

# 10 pricing
pg('''<p class="kick">Honest pricing</p><h2>Prices and money</h2>
<table><tr><th>Item</th><th>Everyday price</th><th>Partner cost</th><th>Keep per sale</th></tr>
<tr><td>Logo tee XS–XL</td><td>$27</td><td class="muted">fill in from the partner, with label</td><td class="muted">aim for $8 or more after fees</td></tr>
<tr><td>Logo tee 2XL</td><td>$29</td><td class="muted">fill in</td><td class="muted">same target</td></tr>
<tr><td>Logo tee 3XL</td><td>$33</td><td class="muted">fill in</td><td class="muted">same target</td></tr>
<tr><td>“More talk, less tap” tee</td><td>same as the logo tee</td><td class="muted">fill in</td><td class="muted">same target</td></tr>
<tr><td>Tote (bundle only)</td><td>+$22 in a bundle</td><td class="muted">fill in</td><td class="muted">same target</td></tr>
<tr><td>Holiday gift bundle</td><td>$59 with a tee</td><td class="muted">tee + deck/print costs</td><td class="muted">planned bundle (DEMAND-CHECK #8)</td></tr></table>
<p class="small muted" style="margin-top:6pt">Bigger sizes cost the partner more, so they cost more here. Etsy fees are roughly a 6.5% transaction fee, payment processing and a listing fee (UNVERIFIED: current rates). If a tee keeps less than $8, raise the everyday price before launch, never by “discounting” later.</p>
<div class="grid2" style="margin-top:8pt">
<div class="box tom"><p class="kick">Never</p><ul class="balls"><li>A crossed-out or “was” price</li><li>A permanent sale or countdown</li><li>“Only 3 left”: print on demand never runs out</li></ul></div>
<div class="box grass"><p class="kick" style="color:#1F7A4F">Fine</p><ul class="balls"><li>A real launch week that really ends</li><li>Black Friday, if it truly ends</li><li>Bundles 10–25% under the parts</li></ul></div></div>
<h3>When it sells</h3><ul class="balls">
<li><b>Late October:</b> list with the holiday gift bundle. Check the partner's holiday order cut-off dates (UNVERIFIED).</li>
<li><b>March:</b> spring screen-free week season. Say “spring screen-free week” in plain words; never print or claim the event's name.</li>
<li><b>Kill rule:</b> fewer than 5 sales in 60 days with the listing fixed: reprice once, then make it bundle-only.</li></ul>''', 10)

# 11 QA
pg('''<p class="kick">Before anything ships</p><h2>Checks and launch list</h2>
<div class="grid2" style="align-items:start"><div><h3 style="margin-top:0">Done in this build</h3><ul class="checks">
<li class="done">Tee files 4500 × 5400, transparent, 300 dpi, light + dark</li>
<li class="done">Tote files 3600 × 3600, transparent, light + dark</li>
<li class="done">Logo placed from brand/logo unaltered; lockup above its minimum size</li>
<li class="done">Label and tag carry PLAY BEFORE PIXELS™ (™, not ®)</li>
<li class="done">Adult sizes only; only slogans ORIGINALITY.md keeps; no condition or event words</li>
<li class="done">Etsy images carry no URL or QR</li>
<li class="done">Copyright line and version on the book and tag</li></ul></div>
<div><h3 style="margin-top:0">The founder does</h3><ul class="checks">
<li>Fill in fiber and origin; rebuild</li>
<li>Class 25 + Etsy + Amazon + Redbubble search for both slogans; log it</li>
<li>Order one physical sample per color; wash-test one</li>
<li>Approve the sample photos and the cover image</li>
<li>Written QA pass on the listing text</li>
<li>Logo checks before public use: reverse-image search, USPTO design-code search, attorney knockout (logo guidelines, page 9)</li>
<li>Insurance in place before the first sale (protection plan)</li>
<li>Keep dated order records and label photos as trademark evidence</li></ul></div></div>
<div class="box sun" style="margin-top:12pt"><p class="small" style="margin:0"><b>Printer templates change.</b> Check every file against the chosen partner's current template and placement tool before upload.</p></div>
<div class="founder" style="margin-top:12pt"><p class="kick">Honest authorship</p>
<p class="small" style="margin:0 0 5pt">The logo art was drawn with AI-assisted tools. Answer every platform's AI question truthfully (Etsy asks), and never register AI-made art as your own work.</p>
<p class="small" style="margin:0">Your own contribution is the part you can protect: your color choices (page 4), your slogan layout and slot-3 line (page 8) and your dated edits to the logo's build numbers. Commit each change to git so it is provable.</p></div>''', 11)

# 12 more from
covers = ''.join(f'''<div><img src="../{s}/cover.png" style="width:100%;height:1.75in;object-fit:contain;background:var(--wash);border-radius:8pt;padding:6pt"><p class="cap"><b>{t}</b><br>{d}</p></div>''' for s, t, d in [
    ('guide-100-plays', '100 Screen-Free Plays', 'Activity book, ages 0–5'),
    ('toddler-busy-book', 'Toddler Busy Book', 'Printable, ages 1–5'),
    ('bored-play-cards', '76 “I’m bored!” Play Cards', 'Printable, ages 1–5'),
    ('play-talk-cards', '52 Play & Talk Cards', 'Printable, ages 0–5')])
pg(f'''<p class="kick">More from Play Before Pixels</p><h2>Next for the people who wear it</h2>
<p class="small" style="margin:0 0 8pt">For families with children from birth to 5.</p>
<div class="grid3" style="grid-template-columns:repeat(4,1fr)">{covers}</div>
<div class="box sun" style="margin-top:16pt;display:flex;gap:16pt;align-items:center">{qr_svg(96)}
<div><p class="disp" style="font-size:15pt;margin:0 0 4pt">Free play ideas for your family</p>
<p class="small" style="margin:0">playbeforepixels.com/bonus/merch-core · email only, with your child's birth month and year if you like. No names.</p></div></div>
<div style="position:absolute;left:.6in;right:.6in;bottom:1.05in;display:flex;justify-content:space-between;align-items:flex-end">
<img src="../../brand/logo/lockup-horizontal.svg" style="width:2in"><p class="small muted" style="text-align:right;margin:0">{COPY}<br>{VERSION}</p></div>''', 12)

html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Core merch production book</title>
<link rel="stylesheet" href="../../brand/fonts/fonts.css"><style>{CSS}</style></head><body>{''.join(pages)}</body></html>
'''
open(os.path.join(PROD, 'source.html'), 'w').write(html)
print('source.html:', len(pages), 'pages')
