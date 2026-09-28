"""Writes the blind-test pages and tests/jobs.json for tests/raster.js.

    python3 build.py && python3 tests/make_tests.py && node tests/raster.js

Outputs (next to build.py):
  test-large.png    the seal alone, 512 x 512, on white, no words other than the seal's own
  test-logo.png     the primary (header) logo, 1600 px wide, on white
  test-small.png    640 x 360: favicon.svg rasterised at true 16 and 32 px, enlarged nearest-neighbour
                    to 128 / 192 px, in a light tab and a dark (#202124) tab. No words.
  preview-sheet.png 1600 x 1000 presentation board
"""
import json, os, re

T = os.path.dirname(os.path.abspath(__file__))
D = os.path.dirname(T)
FONTS = os.path.relpath(os.path.join(D, '..', '..', 'fonts', 'fonts.css'), T)
INK, PAPER, WASH, TOMATO, SUN, SKY = '#1D2940', '#FFFFFF', '#F3F6FB', '#EE5A36', '#F5B820', '#3D86D8'
SUN_T, TOMATO_T, SKY_T = '#FEF4D8', '#FDE9E3', '#E3EEFA'


def vb(name):
    v = re.search(r'viewBox="([^"]+)"', open(os.path.join(D, name)).read()).group(1).split()
    return float(v[2]), float(v[3])


def page(name, body, w, h, extra_css=''):
    html = f'''<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="{FONTS}">
<style>*{{box-sizing:border-box;margin:0;padding:0}} html,body{{width:{w}px;height:{h}px;overflow:hidden;background:#fff}}
img{{display:block}} {extra_css}</style></head><body>{body}</body></html>'''
    with open(os.path.join(T, name), 'w') as fh:
        fh.write(html)
    return os.path.join(T, name)


jobs = []

# ---- raw rasters used by the pages -------------------------------------------------------------
os.makedirs(os.path.join(T, 'px'), exist_ok=True)
for px in (16, 32):
    jobs.append(dict(svg=os.path.join(D, 'favicon.svg'), png=os.path.join(T, 'px', f'fav{px}-light.png'), w=px, h=px, bg='#FFFFFF', scheme='light'))
    jobs.append(dict(svg=os.path.join(D, 'favicon.svg'), png=os.path.join(T, 'px', f'fav{px}-dark.png'), w=px, h=px, bg='#202124', scheme='dark'))
w, h = vb('primary-logo.svg')
jobs.append(dict(svg=os.path.join(D, 'primary-logo.svg'), png=os.path.join(D, 'test-logo.png'), w=1600, h=round(1600 * h / w), bg='#FFFFFF'))

# ---- test-large: the seal alone ----------------------------------------------------------------
p = page('test-large.html', '<img src="../symbol.svg" style="width:432px;height:432px;margin:40px">', 512, 512)
jobs.append(dict(html=p, png=os.path.join(D, 'test-large.png'), w=512, h=512))

# ---- test-small: what a browser tab really shows ------------------------------------------------
def tab(theme, bg):
    return f'''<div class="col" style="background:{bg}">
  <div class="row"><img class="pix" src="px/fav16-{theme}.png" style="width:128px;height:128px">
    <div class="true"><img src="px/fav16-{theme}.png" style="width:16px;height:16px"><img src="px/fav32-{theme}.png" style="width:32px;height:32px"></div></div>
  <img class="pix" src="px/fav32-{theme}.png" style="width:192px;height:192px"></div>'''


p = page('test-small.html', tab('light', '#FFFFFF') + tab('dark', '#202124'), 640, 360,
         '.col{float:left;width:320px;height:360px;padding:12px 0 0 0;display:flex;flex-direction:column;align-items:center;gap:16px}'
         '.row{position:relative;width:128px;height:128px}.true{position:absolute;left:150px;top:40px;display:flex;gap:14px;align-items:center}'
         '.pix{image-rendering:pixelated}')
jobs.append(dict(html=p, png=os.path.join(D, 'test-small.png'), w=640, h=360))

# ---- preview sheet ------------------------------------------------------------------------------
lw, lh = vb('primary-logo.svg')
TOTE_W, TOTE_IN = 300, 15.0                     # tote body 300 px = 15 in, so 20 px per inch
SEAL_IN = 5.0                                   # seal embroidered 5 in across
seal_px = SEAL_IN * TOTE_W / TOTE_IN
tote = f'''<svg viewBox="0 0 300 400" width="300" height="400" style="position:absolute;left:0;top:0">
  <path d="M78 96 V60 C78 18 124 8 124 8 M222 96 V60 C222 18 176 8 176 8" fill="none" stroke="#D9CCB0" stroke-width="15" stroke-linecap="round"/>
  <path d="M124 8 C140 4 160 4 176 8" fill="none" stroke="#D9CCB0" stroke-width="15" stroke-linecap="round"/>
  <rect x="0" y="90" width="300" height="310" rx="6" fill="#EEE5D1"/>
  <rect x="0" y="90" width="300" height="14" fill="#E3D8BF"/>
  <rect x="62" y="84" width="32" height="30" rx="3" fill="#D9CCB0"/><rect x="206" y="84" width="32" height="30" rx="3" fill="#D9CCB0"/></svg>'''
spine_titles = [('Up! Go! More!', SUN_T, 300), ('Whose Lap Today?', TOMATO_T, 286), ('The Day the Tablet Slept', SKY_T, 300)]
spines = ''.join(f'''<div class="spine" style="background:{bg};width:{w}px"><span>{t}</span>
  <img src="../symbol.svg" style="width:96px;height:96px"></div>''' for t, bg, w in spine_titles)
body = f'''
<div class="board">
  <header><h1>Play Before Pixels</h1><p>Concept C &middot; The Maker&rsquo;s Seal &middot; c-badge</p></header>
  <section class="a"><img src="../primary-logo.svg" style="width:640px"><label>Primary logo (site header)</label></section>
  <section class="b"><img src="../primary-logo-reverse.svg" style="width:640px"><label class="lt">Reversed on ink</label></section>
  <section class="c"><img src="../primary-logo-black.svg" style="width:420px"><img src="../symbol-black.svg" style="width:150px"><label>One colour, black</label></section>
  <section class="d"><div class="av"><img src="../src/avatar-1080.svg" style="width:220px;height:220px"></div>
     <div class="feed"><img src="../src/avatar-1080.svg" style="width:48px;height:48px;border-radius:50%"><div><b>Play Before Pixels</b><i>@playbeforepixels</i></div></div>
     <label>Social avatar (round crop)</label></section>
  <section class="e">{spines}<label>Book spines: seal 0.5 in tall, shown 2&times;</label></section>
  <section class="f"><div class="tote">{tote}<img src="../symbol.svg" style="position:absolute;left:{150 - seal_px / 2:.0f}px;top:{215 - seal_px / 2:.0f}px;width:{seal_px:.0f}px;height:{seal_px:.0f}px"></div>
     <div class="stitch"><img src="../symbol-small.svg" style="width:64px;height:64px"><span>Under 40 mm, embroider the small seal</span></div>
     <label>Tote: seal embroidered 5 in across</label></section>
</div>'''
css = f'''body{{background:{WASH};font-family:'Nunito Sans',sans-serif;color:{INK}}}
.board{{position:relative;width:1600px;height:1000px}}
header{{position:absolute;left:48px;top:30px;display:flex;align-items:baseline;gap:18px}}
h1{{font-family:'Bricolage Grotesque';font-weight:800;font-size:22px}} header p{{font-size:15px;opacity:.7}}
section{{position:absolute;border-radius:18px;display:flex;align-items:center;justify-content:center;gap:40px;overflow:hidden}}
label{{position:absolute;left:22px;bottom:16px;font-size:13px;font-weight:700;letter-spacing:.02em;opacity:.65}} label.lt{{color:#fff;opacity:.8}}
.a{{left:48px;top:84px;width:780px;height:270px;background:#fff}}
.b{{left:48px;top:370px;width:780px;height:270px;background:{INK}}}
.c{{left:48px;top:656px;width:780px;height:300px;background:#fff}}
.d{{left:848px;top:84px;width:340px;height:420px;background:#fff;flex-direction:column;gap:26px}}
.av img{{border-radius:50%}}
.feed{{display:flex;gap:10px;align-items:center;font-size:13px}} .feed b{{display:block;font-weight:800}} .feed i{{font-style:normal;opacity:.6}}
.e{{left:1208px;top:84px;width:344px;height:420px;background:#fff;flex-direction:column;gap:14px;justify-content:flex-start;padding-top:34px}}
.spine{{height:108px;border-radius:3px 6px 6px 3px;display:flex;align-items:center;justify-content:space-between;padding:0 6px 0 18px;color:{INK};
  font-family:'Bricolage Grotesque';font-weight:800;font-size:17px;box-shadow:inset 0 -5px 0 rgba(29,41,64,.07),inset 0 5px 0 rgba(255,255,255,.5)}}
.e .spine:nth-child(2){{margin-left:10px}}
.f{{left:848px;top:524px;width:704px;height:432px;background:{SKY_T};gap:56px}}
.tote{{position:relative;width:300px;height:400px;margin-top:-10px}}
.stitch{{display:flex;flex-direction:column;align-items:center;gap:10px;width:150px;text-align:center;font-size:13px;font-weight:700;opacity:.8}}'''
p = page('preview-sheet.html', body, 1600, 1000, css)
jobs.append(dict(html=p, png=os.path.join(D, 'preview-sheet.png'), w=1600, h=1000))

with open(os.path.join(T, 'jobs.json'), 'w') as fh:
    json.dump(jobs, fh, indent=1)
print('wrote', len(jobs), 'jobs')
