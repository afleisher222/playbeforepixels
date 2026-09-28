import math
K=0.5522847498
def f(v): return f"{v:.2f}".rstrip('0').rstrip('.') if abs(v)>=0.005 else "0"
def arc_beziers(theta0, theta1, n=None):
    """unit circle arc from theta0 to theta1 (radians, svg orientation) as cubic segments"""
    d=theta1-theta0; n=n or max(1,math.ceil(abs(d)/(math.pi/2)))
    segs=[]; step=d/n
    for i in range(n):
        a=theta0+i*step; b=a+step; k=4/3*math.tan(step/4)
        p0=(math.cos(a),math.sin(a)); p3=(math.cos(b),math.sin(b))
        c1=(p0[0]-k*math.sin(a), p0[1]+k*math.cos(a)); c2=(p3[0]+k*math.sin(b), p3[1]-k*math.cos(b))
        segs.append((c1,c2,p3))
    return segs
def comma(tip=(-0.55,2.25), o1=(1.0,1.1), o2=(0.45,1.95), i1=(-0.12,1.85), i2=(0.1,1.3), join=110, start=0):
    """unit comma (closing-quote orientation: tail sweeps down-left). returns (start, [cubic segs])"""
    a0=math.radians(start); P0=(math.cos(a0),math.sin(a0))
    j=math.radians(join); Q=(math.cos(j),math.sin(j))
    segs=[(o1,o2,tip),(i1,i2,Q)]
    segs+=arc_beziers(j, a0+2*math.pi)
    return P0,segs
def xf(pt, s=1, mirror=False, rot=0, tx=0, ty=0):
    x,y=pt
    if mirror: x=-x
    r=math.radians(rot); x,y=x*math.cos(r)-y*math.sin(r), x*math.sin(r)+y*math.cos(r)
    return (x*s+tx, y*s+ty)
def path(shape, **t):
    P0,segs=shape; p=xf(P0,**t); out=f"M{f(p[0])},{f(p[1])}"
    for c1,c2,p3 in segs:
        a,b,c=xf(c1,**t),xf(c2,**t),xf(p3,**t)
        out+=f"C{f(a[0])},{f(a[1])} {f(b[0])},{f(b[1])} {f(c[0])},{f(c[1])}"
    return out+"Z"
