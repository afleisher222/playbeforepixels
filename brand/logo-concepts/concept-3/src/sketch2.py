from geom import *
T,S,K_,G,I,P='#EE5A36','#F5B820','#3D86D8','#2FA36B','#1D2940','#8A5CC7'
def pair(big=dict(s=21,tx=30,ty=33,rot=-8), small=dict(s=13,tx=73,ty=52,rot=8), cb=T, cs=K_, shape=None, shape_s=None):
    sh=shape or comma(); sh2=shape_s or sh
    return f'<path d="{path(sh,mirror=True,**big)}" fill="{cb}"/><path d="{path(sh2,**small)}" fill="{cs}"/>'
opts={}
opts['v1 base']=pair()
lean=comma(tip=(-0.75,2.1),o1=(1.02,1.0),o2=(0.4,1.85),i1=(-0.25,1.75),i2=(0.05,1.25),join=112)
opts['v2 longer reach']=pair(shape=lean, big=dict(s=21,tx=29,ty=31,rot=-6), small=dict(s=13,tx=74,ty=53,rot=6))
opts['v3 ink+tomato']=pair(shape=lean, big=dict(s=21,tx=29,ty=31,rot=-6), small=dict(s=13,tx=74,ty=53,rot=6), cb=I, cs=T)
opts['v4 sky+sun']=pair(shape=lean, big=dict(s=21,tx=29,ty=31,rot=-6), small=dict(s=13,tx=74,ty=53,rot=6), cb=K_, cs=S)
opts['v5 tomato+grass']=pair(shape=lean, big=dict(s=21,tx=29,ty=31,rot=-6), small=dict(s=13,tx=74,ty=53,rot=6), cb=T, cs=G)
opts['v6 one-color']=pair(shape=lean, big=dict(s=21,tx=29,ty=31,rot=-6), small=dict(s=13,tx=74,ty=53,rot=6), cb='#000', cs='#000')
cells=''.join(f'<figure style="margin:0"><svg viewBox="0 0 100 100" width="220" height="220" style="background:#fff">{v}</svg><div style="display:flex;gap:8px;align-items:end"><svg viewBox="0 0 100 100" width="64" height="64">{v}</svg><svg viewBox="0 0 100 100" width="32" height="32">{v}</svg><svg viewBox="0 0 100 100" width="16" height="16">{v}</svg><div style="background:#1D2940;padding:4px"><svg viewBox="0 0 100 100" width="48" height="48">{v}</svg></div></div><figcaption>{k}</figcaption></figure>' for k,v in opts.items())
open('sketch2.html','w').write(f'<html><body style="margin:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;font:14px sans-serif;background:#F3F6FB">{cells}</body></html>')
