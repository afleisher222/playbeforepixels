import math, sys
sys.path.insert(0, '.')
from geom import rounded_polygon, circle

def thumb(hinge, tip_top, width):
    ax, ay = tip_top[0]-hinge[0], tip_top[1]-hinge[1]
    l = math.hypot(ax, ay); ux, uy = ax/l, ay/l
    px, py = -uy, ux
    p9 = (tip_top[0]+px*width, tip_top[1]+py*width)
    return p9, (ux, uy)

def build(ear=True, arm=(30,54), snout_top=24, snout_th=16, tip_x=94, hinge=(62,44), ttop=(84,55), tw=11, eye=(50,32,3.8)):
    L, R = arm
    p9,(ux,uy) = thumb(hinge, ttop, tw)
    t = (R-p9[0])/ux
    p10 = (R, p9[1]+uy*t)
    pts = [(L,100,0)]
    if ear:
        pts += [(L,9,7),(L+14,9,7),(L+14,snout_top,3)]
    else:
        pts += [(L,snout_top,14)]
    sb = snout_top+snout_th
    pts += [(tip_x,snout_top,snout_th/2),(tip_x,sb,snout_th/2),(hinge[0],hinge[1],2.5),
            (ttop[0],ttop[1],tw/2),(p9[0],p9[1],tw/2),(p10[0],p10[1],8),(R,100,0)]
    d = rounded_polygon(pts)
    return d + circle(*eye)

V = [
  dict(ear=True),
  dict(ear=False),
  dict(ear=True, arm=(28,54), snout_th=18, tip_x=92, hinge=(60,45), ttop=(82,57), tw=12, eye=(49,33,4)),
  dict(ear=True, snout_top=22, snout_th=17, tip_x=90, hinge=(58,44), ttop=(80,58), tw=12, eye=(49,31,4)),
]
cols = [('#EE5A36','#3D86D8'),('#EE5A36','#F5B820'),('#1D2940','#F5B820'),('#3D86D8','#EE5A36')]
cells=''
for i,v in enumerate(V):
    d = build(**v)
    body, cuff = cols[i]
    def s(sz, bg='#fff'):
        return (f'<svg width="{sz}" height="{sz}" viewBox="0 0 100 100" style="background:{bg}">'
                f'<path d="{d}" fill="{body}" fill-rule="evenodd"/><path d="M{v.get("arm",(30,54))[0]} 86H{v.get("arm",(30,54))[1]}V100H{v.get("arm",(30,54))[0]}Z" fill="{cuff}"/></svg>')
    cells += f'<div class="cell">{s(240)}<br>{s(64)} {s(32)} {s(16)}</div>'
html = f'''<!doctype html><html><head><meta charset="utf-8"><style>
body{{margin:0;background:#F3F6FB}} .row{{display:flex;gap:24px;padding:20px}} .cell{{background:#fff;border-radius:12px;padding:12px;text-align:center}}
</style></head><body><div class="row">{cells}</div></body></html>'''
open('sketch3.html','w').write(html)
