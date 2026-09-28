import math
def f(v): return f"{v:.2f}"
def circle(cx,cy,r): return f"M{f(cx-r)},{f(cy)} a{f(r)},{f(r)} 0 1 0 {f(2*r)},0 a{f(r)},{f(r)} 0 1 0 {f(-2*r)},0Z"
def comma(cx,cy,r,flip=1):
    # quote-mark "9": circle + tail curving down-left (flip=-1 mirrors)
    s=flip
    p=[(cx+s*r,cy),(cx+s*r,cy+1.2*r),(cx+s*0.5*r,cy+1.9*r),(cx-s*0.45*r,cy+2.2*r),
       (cx-s*0.05*r,cy+1.7*r),(cx+s*0.05*r,cy+1.35*r),(cx-s*0.1*r,cy+0.99*r)]
    sweep = 1 if s==1 else 0
    return (f"M{f(p[0][0])},{f(p[0][1])} C{f(p[1][0])},{f(p[1][1])} {f(p[2][0])},{f(p[2][1])} {f(p[3][0])},{f(p[3][1])} "
            f"C{f(p[4][0])},{f(p[4][1])} {f(p[5][0])},{f(p[5][1])} {f(p[6][0])},{f(p[6][1])} "
            f"A{f(r)},{f(r)} 0 1 {sweep} {f(p[0][0])},{f(p[0][1])}Z")
def P(x0,top,r,base,stem,mirror=False):
    # solid P: circle radius r whose leftmost point at x0, stem width 'stem' down to base
    cx = x0 + r if not mirror else x0 - r
    cy = top + r
    if not mirror:
        return circle(cx,cy,r)+f" M{f(x0)},{f(cy)} H{f(x0+stem)} V{f(base-stem/2)} a{f(stem/2)},{f(stem/2)} 0 0 1 {f(-stem)},0Z"
    else:
        return circle(cx,cy,r)+f" M{f(x0)},{f(cy)} H{f(x0-stem)} V{f(base-stem/2)} a{f(stem/2)},{f(stem/2)} 0 0 0 {f(stem)},0Z"
def bubble(cx,cy,r,ang,tl=0.9,tw=0.55):
    # circle + tapered tail at angle ang (deg, svg coords), tail length tl*r beyond circle
    a=math.radians(ang); w=tw
    a1=a-w/2; a2=a+w/2
    p1=(cx+r*math.cos(a1),cy+r*math.sin(a1)); p2=(cx+r*math.cos(a2),cy+r*math.sin(a2))
    tip=(cx+(r*(1+tl))*math.cos(a+0.25),cy+(r*(1+tl))*math.sin(a+0.25))
    return (f"M{f(p2[0])},{f(p2[1])} A{f(r)},{f(r)} 0 1 1 {f(p1[0])},{f(p1[1])} "
            f"Q{f(cx+r*1.25*math.cos(a1+0.1))},{f(cy+r*1.25*math.sin(a1+0.1))} {f(tip[0])},{f(tip[1])} "
            f"Q{f(cx+r*1.05*math.cos(a2))},{f(cy+r*1.05*math.sin(a2))} {f(p2[0])},{f(p2[1])}Z")
T,S,K,G,I='#EE5A36','#F5B820','#3D86D8','#2FA36B','#1D2940'
opts={}
opts['A lean-in Ps']=f'<path d="{P(8,14,24,92,14)}" fill="{T}"/><path d="{P(92,44,15,92,10,True)}" fill="{K}"/>'
opts['C quote people']=f'<path d="{comma(34,30,20)}" fill="{T}"/><path d="{comma(72,52,12)}" fill="{K}"/>'
opts['C2 quotes facing']=f'<path d="{comma(30,34,20,-1)}" fill="{T}"/><path d="{comma(74,50,13)}" fill="{K}"/>'
opts['F bubbles tail-to-tail']=f'<path d="{bubble(36,36,26,45)}" fill="{T}"/><path d="{bubble(72,72,15,225)}" fill="{K}"/>'
svgs=''.join(f'<figure><svg viewBox="0 0 100 100" width="240" height="240">{v}</svg><svg viewBox="0 0 100 100" width="32" height="32">{v}</svg><figcaption>{k}</figcaption></figure>' for k,v in opts.items())
open('sketch.html','w').write(f'<html><body style="margin:20px;display:flex;gap:30px;font:14px sans-serif;background:#fff">{svgs}</body></html>')
