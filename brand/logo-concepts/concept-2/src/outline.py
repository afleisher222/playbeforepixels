"""Outline a text string in Bricolage Grotesque (local brand woff2) to SVG path data.
Usage: python3 outline.py "Play Before Pixels" [wght] [opsz] [tracking_units]
Prints JSON {d, width, ascent, descent, capHeight, xHeight} in font units (upm)."""
import sys, json, io
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
FONT = '/home/user/playbeforepixels/brand/fonts/bricolage-a24454f0.woff2'
text = sys.argv[1]; wght = float(sys.argv[2]) if len(sys.argv) > 2 else 800
opsz = float(sys.argv[3]) if len(sys.argv) > 3 else 96
track = float(sys.argv[4]) if len(sys.argv) > 4 else 0
tt = TTFont(FONT); tt.flavor = None
inst = instantiateVariableFont(tt, {'wght': wght, 'opsz': opsz})
buf = io.BytesIO(); inst.save(buf); data = buf.getvalue()
face = hb.Face(data); font = hb.Font(face)
b = hb.Buffer(); b.add_str(text); b.guess_segment_properties()
hb.shape(font, b, {'kern': True, 'liga': True})
gs = inst.getGlyphSet(); order = inst.getGlyphOrder()
pen = SVGPathPen(gs); x = 0
for info, pos in zip(b.glyph_infos, b.glyph_positions):
    g = order[info.codepoint]
    # flip y (font y-up -> svg y-down), baseline at y=0
    tp = TransformPen(pen, (1, 0, 0, -1, x + pos.x_offset, -pos.y_offset))
    gs[g].draw(tp)
    x += pos.x_advance + track
x -= track
os2 = inst['OS/2']
print(json.dumps({'d': pen.getCommands(), 'width': x, 'upm': inst['head'].unitsPerEm,
  'ascent': os2.sTypoAscender, 'descent': os2.sTypoDescender,
  'capHeight': getattr(os2, 'sCapHeight', 0), 'xHeight': getattr(os2, 'sxHeight', 0)}))
