"""Outline text in the brand's local Bricolage Grotesque woff2 -> SVG path data (font units, y-down, baseline y=0)."""
import io
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
FONT='/home/user/playbeforepixels/brand/fonts/bricolage-a24454f0.woff2'
_cache={}
def _inst(wght,opsz):
    key=(wght,opsz)
    if key not in _cache:
        tt=TTFont(FONT); tt.flavor=None
        inst=instantiateVariableFont(tt,{'wght':wght,'opsz':opsz})
        buf=io.BytesIO(); inst.save(buf); _cache[key]=(inst,buf.getvalue())
    return _cache[key]
def outline(text,wght=800,opsz=48,track=0):
    inst,data=_inst(wght,opsz)
    font=hb.Font(hb.Face(data)); b=hb.Buffer(); b.add_str(text); b.guess_segment_properties()
    hb.shape(font,b,{'kern':True,'liga':True})
    gs=inst.getGlyphSet(); order=inst.getGlyphOrder()
    pen=SVGPathPen(gs, ntos=lambda v: f"{v:.1f}".rstrip('0').rstrip('.')); bp=BoundsPen(gs); x=0
    for info,pos in zip(b.glyph_infos,b.glyph_positions):
        g=order[info.codepoint]; m=(1,0,0,-1,x+pos.x_offset,-pos.y_offset)
        gs[g].draw(TransformPen(pen,m)); gs[g].draw(TransformPen(bp,m))
        x+=pos.x_advance+track
    os2=inst['OS/2']
    return dict(d=pen.getCommands(), adv=x-track, bounds=bp.bounds, upm=inst['head'].unitsPerEm, cap=os2.sCapHeight, xh=os2.sxHeight)
if __name__=='__main__':
    o=outline('Play Before Pixels'); print(o['adv'],o['bounds'],o['upm'],o['cap'],o['xh'])
