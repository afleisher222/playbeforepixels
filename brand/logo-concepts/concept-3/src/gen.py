"""Generates every concept-3 SVG. Run: python3 gen.py"""
import os, json
from mark import layout
from outline import outline
OUT=os.path.dirname(os.path.abspath(__file__))+'/..'
TOMATO,SKY,INK,PAPER='#EE5A36','#3D86D8','#1D2940','#FFFFFF'
DB,DS,info=layout(100,0)
MW,MH=info['w'],info['h']; MY0=(100-MH)/2          # mark content box inside the 100 box
TITLE='Play Before Pixels'
def svg(w,h,body,label):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h:.1f}" width="{w:.0f}" height="{h:.0f}" role="img" aria-label="{label}">'
            f'<title>{label}</title>{body}</svg>\n')
def mark_g(x,y,scale,cb,cs):
    # place the mark so its content box top-left sits at (x,y)
    return (f'<g transform="translate({x:.2f} {y-MY0*scale:.2f}) scale({scale:.4f})">'
            f'<path d="{DB}" fill="{cb}"/><path d="{DS}" fill="{cs}"/></g>')
def word_g(text,x,baseline,cap,fill,track=-12):
    o=outline(text,800,48,track); k=cap/o['cap']
    return f'<path transform="translate({x:.2f} {baseline:.2f}) scale({k:.5f})" d="{o["d"]}" fill="{fill}"/>', o['adv']*k, o
# ---------- mark ----------
PAD=4
def mark_svg(cb,cs,label='Play Before Pixels mark'):
    s=(100-2*PAD)/100
    return svg(100,100,f'<g transform="translate({PAD} {PAD}) scale({s})"><path d="{DB}" fill="{cb}"/><path d="{DS}" fill="{cs}"/></g>',label)
# ---------- horizontal ----------
def horizontal(cb,cs,wc):
    H=100; sc=H/MH; mw=MW*sc
    cap=H*0.43; gap=H*0.30
    base=H*0.5+cap*0.5 + H*0.03     # optical: nudge down toward the child's head
    w,adv,_=word_g(TITLE,mw+gap,base,cap,wc)
    return svg(mw+gap+adv+2, H, mark_g(0,0,sc,cb,cs)+w, TITLE)
# ---------- stacked ----------
def stacked(cb,cs,wc):
    cap=44; lead=cap*1.52
    o1=outline('Play Before',800,48,-12); o2=outline('Pixels',800,48,-12); k=cap/o1['cap']
    W=max(o1['adv'],o2['adv'])*k
    mw=W*0.52; sc=mw/MW; mh=MH*sc
    top=0; b1=mh+cap*0.62+cap; b2=b1+lead
    x1=(W-o1['adv']*k)/2; x2=(W-o2['adv']*k)/2
    g1,_,_=word_g('Play Before',x1,b1,cap,wc); g2,_,_=word_g('Pixels',x2,b2,cap,wc)
    H=b2+cap*0.30   # room for the descender-free last line
    return svg(W,H,mark_g((W-mw)/2,top,sc,cb,cs)+g1+g2,TITLE)
files={
 'mark.svg':mark_svg(TOMATO,SKY),
 'mark-reversed.svg':mark_svg(TOMATO,SKY),
 'mark-black.svg':mark_svg('#000','#000','Play Before Pixels mark, one colour black'),
 'mark-white.svg':mark_svg(PAPER,PAPER,'Play Before Pixels mark, one colour white'),
 'lockup-horizontal.svg':horizontal(TOMATO,SKY,INK),
 'lockup-horizontal-reversed.svg':horizontal(TOMATO,SKY,PAPER),
 'lockup-stacked.svg':stacked(TOMATO,SKY,INK),
 'lockup-stacked-reversed.svg':stacked(TOMATO,SKY,PAPER),
 'one-color-black.svg':stacked('#000','#000','#000'),
 'one-color-white.svg':stacked(PAPER,PAPER,PAPER),
}
del files['mark-reversed.svg']   # the full-colour mark needs no change on ink
for n,c in files.items(): open(os.path.join(OUT,n),'w').write(c)
print(info, {n:len(c) for n,c in files.items()})
