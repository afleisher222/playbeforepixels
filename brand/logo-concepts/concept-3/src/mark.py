"""Face to Face mark: two speech marks (grown-up + child) turned toward each other."""
import math
from geom import comma, path, xf
from shapely.geometry import Polygon
SHAPE = comma(tip=(-0.7,1.95), o1=(1.0,0.95), o2=(0.55,1.7), i1=(-0.2,1.62), i2=(0.1,1.2), join=115)
BIG   = dict(s=23, tx=29, ty=31, rot=-14, mirror=True)   # grown-up (tomato)
SMALL = dict(s=14, tx=76, ty=58, rot=12)                 # child (sky)
def poly(shape, t, n=40):
    P0,segs=shape; pts=[xf(P0,**t)]; cur=P0
    for c1,c2,p3 in segs:
        for i in range(1,n+1):
            u=i/n; a=(1-u)**3; b=3*(1-u)**2*u; c=3*(1-u)*u*u; d=u**3
            p=(a*cur[0]+b*c1[0]+c*c2[0]+d*p3[0], a*cur[1]+b*c1[1]+c*c2[1]+d*p3[1])
            pts.append(xf(p,**t))
        cur=p3
    return Polygon(pts)
def layout(size=100, pad=0.0):
    """returns (d_big, d_small, info) normalised so the pair sits centred in a size x size box"""
    pb, ps = poly(SHAPE,BIG), poly(SHAPE,SMALL)
    u = pb.union(ps); minx,miny,maxx,maxy = u.bounds
    w,h = maxx-minx, maxy-miny; inner = size*(1-2*pad); k = inner/max(w,h)
    ox = size/2 - (minx+w/2)*k; oy = size/2 - (miny+h/2)*k
    def t(d): return dict(s=d['s']*k, tx=d['tx']*k+ox, ty=d['ty']*k+oy, rot=d['rot'], mirror=d.get('mirror',False))
    tb, ts = t(BIG), t(SMALL)
    gap = poly(SHAPE,tb).distance(poly(SHAPE,ts))
    return path(SHAPE, **tb), path(SHAPE, **ts), dict(gap=gap, w=w*k, h=h*k)
if __name__=='__main__':
    b,s,i=layout(); print(i)
