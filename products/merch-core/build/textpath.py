"""Brand type as vector outlines (no live fonts in print files).

text_path(text, font, size, x, y, anchor='start', tracking=0) -> (svg_path_d, width)
Fonts come from the local brand kit only: brand/logo/src/bric800.ttf (Bricolage
Grotesque 800, the wordmark face) and brand/fonts/nunito-8ecf95f1.woff2 (Nunito
Sans, Latin, variable weight).
"""
import io, os
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
FONT_FILES = {
    'bric800': (os.path.join(ROOT, 'brand/logo/src/bric800.ttf'), None),
    'nunito700': (os.path.join(ROOT, 'brand/fonts/nunito-8ecf95f1.woff2'), 700),
    'nunito800': (os.path.join(ROOT, 'brand/fonts/nunito-8ecf95f1.woff2'), 800),
    'nunito600': (os.path.join(ROOT, 'brand/fonts/nunito-8ecf95f1.woff2'), 600),
}
_cache = {}


def _font(name):
    if name in _cache:
        return _cache[name]
    path, wght = FONT_FILES[name]
    tt = TTFont(path)
    tt.flavor = None
    buf = io.BytesIO()
    tt.save(buf)
    face = hb.Face(hb.Blob(buf.getvalue()))
    font = hb.Font(face)
    if wght:
        font.set_variations({'wght': wght})
    upem = face.upem
    _cache[name] = (font, upem)
    return _cache[name]


def measure(text, font, size, tracking=0):
    return text_path(text, font, size, 0, 0, tracking=tracking)[1]


def text_path(text, font, size, x, y, anchor='start', tracking=0.0):
    """tracking is in em (e.g. 0.12). y is the baseline."""
    f, upem = _font(font)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(f, buf, {'kern': True, 'liga': True})
    s = size / upem
    track = tracking * upem
    # width
    adv = 0
    n = len(buf.glyph_infos)
    for i, pos in enumerate(buf.glyph_positions):
        adv += pos.x_advance + (track if i < n - 1 else 0)
    width = adv * s
    if anchor == 'middle':
        x -= width / 2
    elif anchor == 'end':
        x -= width
    pen = SVGPathPen(None, ntos=lambda v: ('%.2f' % v).rstrip('0').rstrip('.'))
    cx = 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        t = TransformPen(pen, (s, 0, 0, -s, x + (cx + pos.x_offset) * s, y - pos.y_offset * s))
        f.draw_glyph_with_pen(info.codepoint, t)
        cx += pos.x_advance + track
    return pen.getCommands(), width
