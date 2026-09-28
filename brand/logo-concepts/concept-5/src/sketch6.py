import sys, math
sys.path.insert(0, '.')
from geom import circle
from fontTools.svgLib.path import parse_path
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Identity

H2 = ("M29 86C29 78 27.5 72 25.5 66C22 56 20.5 46 22 37C22.8 32 24 26 25.5 20"
      "C26.75 15 27.5 5 33.5 4.5C39.5 4 42.5 9 42.5 14C42.5 18.5 44 21 47.5 20.5"
      "C60 18.87 76 20 85 24C94 28 95 38 86 40.5C78 42.72 69 43.5 62 45"
      "C58.5 45.75 58.5 48.6 62 49.3C70 50.9 77 50.5 81 49.5"
      "C88 47.75 91 54 86 58.5C79 64.8 68 68 59 68.5C55 68.72 53.5 72 53.5 76C53.5 80 54 83 54 86Z")
KN = H2.replace("C60 18.87 76 20 85 24","C51 20 54 18.2 57.5 18.2C61 18.2 62.5 20.2 65.5 20.2C68.5 20.2 70 18.9 73.5 19.2C78 19.6 80.5 21.8 85 24")
CUFF = "M22.5 100L23 82Q23.2 78 27.2 78H54.8Q58.8 78 59 82L59.5 100Z"

def rot(d, deg, cx, cy):
    t = Identity.translate(cx, cy).rotate(math.radians(deg)).translate(-cx, -cy)
    pen = SVGPathPen(None)
    parse_path(d, TransformPen(pen, t))
    return pen.getCommands()

def variant(deg, eye=(51, 30, 4.2), base=None):
    h = rot(base or H2, deg, 40, 78)
    ex, ey = eye[0], eye[1]
    a = math.radians(deg)
    ex2 = 40 + (ex-40)*math.cos(a) - (ey-78)*math.sin(a)
    ey2 = 78 + (ex-40)*math.sin(a) + (ey-78)*math.cos(a)
    return h + circle(ex2, ey2, eye[2])

V = [(-8,'#EE5A36','#3D86D8',None),(-8,'#EE5A36','#3D86D8','KN'),(-8,'#1D2940','#F5B820','KN'),(-8,'#3D86D8','#EE5A36','KN')]
cells = ''
for deg, b, c, base in V:
    d = variant(deg, base=KN if base else None)
    def s(sz, bg='#fff'):
        return (f'<svg width="{sz}" height="{sz}" viewBox="0 0 100 100" style="background:{bg}">'
                f'<path d="{d}" fill="{b}" fill-rule="evenodd"/><path d="{CUFF}" fill="{c}"/></svg>')
    word = f'<div style="display:flex;align-items:flex-end;gap:6px;margin-top:10px">{s(58)}<span style="font:800 40px/0.8 Bricolage Grotesque;color:#1D2940">Play Before</span></div>'
    cells += f'<div class="cell">{s(240)}<br>{s(64)} {s(32)} {s(16)}{word}</div>'
html = f'''<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../../fonts/fonts.css"><style>
body{{margin:0;background:#F3F6FB}} .row{{display:flex;gap:20px;padding:20px}} .cell{{background:#fff;border-radius:12px;padding:12px;text-align:center;width:275px;overflow:hidden}}
</style></head><body><div class="row">{cells}</div></body></html>'''
open('sketch6.html', 'w').write(html)
