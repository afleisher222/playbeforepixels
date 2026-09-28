import sys
sys.path.insert(0, '.')
from geom import circle

A = ("M33 100C33 90 32 80 30 72C27 62 24 52 25 42C25.5 35 28 30 31 27"
     "C29 20 29 12 32 8C34 4.5 40 4.5 41.5 9C43 13 44 18 45.5 22"
     "C56 19 72 20 84 23C92 25 95 31 91 35C89 37 86 38 82 38.5"
     "C74 39.5 66 41 60 43C58 44 58 46 60 47C67 49.5 74 52 79 55"
     "C84 58 82 65 76 64.5C68 64 60 64 55 67C52 69 51 72 51 78C51 86 52 93 52 100Z")
# no ear: back of hand rounds straight into the knuckle arch
B = ("M33 100C33 90 32 80 30 72C27 62 23 50 24 40C25 28 34 20 46 19.5"
     "C60 19 73 20 84 23C92 25 95 31 91 35C89 37 86 38 82 38.5"
     "C74 39.5 66 41 60 43C58 44 58 46 60 47C67 49.5 74 52 79 55"
     "C84 58 82 65 76 64.5C68 64 60 64 55 67C52 69 51 72 51 78C51 86 52 93 52 100Z")
# ear + smiling thumb (upturned tip) + fingertip notch on upper jaw
C = ("M33 100C33 90 32 80 30 72C27 62 24 52 25 42C25.5 35 28 30 31 27"
     "C29 20 29 12 32 8C34 4.5 40 4.5 41.5 9C43 13 44 18 45.5 22"
     "C56 19 72 20 84 23C92 25 95 31 91 35C90 36 88.5 36.5 87 36.3"
     "C88 38.5 86 40 83 40C75 40.5 66 41.5 60 43.5C58 44.5 58 46.5 60 47.5"
     "C67 50 73 51 79 50.5C84 50 86 55 82 58C78 62 70 64 62 65"
     "C57 66 52 69 51 78C51 86 52 93 52 100Z")
CUFF = "M28 100L28.6 88Q28.8 84.5 32.3 84.5H52.7Q56.2 84.5 56.4 88L57 100Z"
EYE = circle(49.5, 30, 3.8)

V = [(A, '#EE5A36', '#3D86D8'), (B, '#EE5A36', '#F5B820'), (C, '#EE5A36', '#1D2940'), (C, '#3D86D8', '#F5B820')]
cells = ''
for d, body, cuff in V:
    def s(sz, bg='#fff', b=body, c=cuff):
        return (f'<svg width="{sz}" height="{sz}" viewBox="0 0 100 100" style="background:{bg}">'
                f'<path d="{d}{EYE}" fill="{b}" fill-rule="evenodd"/><path d="{CUFF}" fill="{c}"/></svg>')
    cells += f'<div class="cell">{s(240)}<br>{s(64)} {s(32)} {s(16)} {s(48, "#1D2940")}</div>'
html = f'''<!doctype html><html><head><meta charset="utf-8"><style>
body{{margin:0;background:#F3F6FB}} .row{{display:flex;gap:24px;padding:20px}} .cell{{background:#fff;border-radius:12px;padding:12px;text-align:center}}
</style></head><body><div class="row">{cells}</div></body></html>'''
open('sketch4.html', 'w').write(html)
