from geom import *
T,S,K_,G,I='#EE5A36','#F5B820','#3D86D8','#2FA36B','#1D2940'
def pair(sh, big, small, cb=T, cs=K_):
    return f'<path d="{path(sh,mirror=True,**big)}" fill="{cb}"/><path d="{path(sh,**small)}" fill="{cs}"/>'
V={}
a=comma(tip=(-0.75,2.1),o1=(1.02,1.0),o2=(0.4,1.85),i1=(-0.25,1.75),i2=(0.05,1.25),join=112)
V['a v2']=pair(a,dict(s=21,tx=29,ty=31,rot=-6),dict(s=13,tx=74,ty=53,rot=6))
# smoother inner notch: inner edge leaves the circle more tangentially
b=comma(tip=(-0.9,2.05),o1=(1.0,1.05),o2=(0.45,1.9),i1=(-0.35,1.62),i2=(-0.05,1.2),join=118)
V['b smoother']=pair(b,dict(s=21,tx=29,ty=30,rot=-12),dict(s=13.5,tx=74,ty=55,rot=10))
# fuller, rounder heads, shorter tails (more toy-like, better small)
c=comma(tip=(-0.7,1.95),o1=(1.0,0.95),o2=(0.55,1.7),i1=(-0.2,1.62),i2=(0.1,1.2),join=115)
V['c chunky']=pair(c,dict(s=23,tx=30,ty=32,rot=-14),dict(s=14,tx=74,ty=57,rot=12))
# same, heads more level (grown-up bends down)
V['d bend down']=pair(c,dict(s=23,tx=31,ty=38,rot=-24),dict(s=14,tx=74,ty=55,rot=14))
cells=''.join(f'<figure style="margin:0"><svg viewBox="0 0 100 100" width="400" height="400" style="background:#fff">{v}</svg><div style="display:flex;gap:10px;align-items:end;margin-top:8px"><svg viewBox="0 0 100 100" width="64" height="64">{v}</svg><svg viewBox="0 0 100 100" width="32" height="32">{v}</svg><svg viewBox="0 0 100 100" width="16" height="16">{v}</svg></div><figcaption>{k}</figcaption></figure>' for k,v in V.items())
open('sketch3.html','w').write(f'<html><body style="margin:20px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;font:14px sans-serif;background:#F3F6FB">{cells}</body></html>')
