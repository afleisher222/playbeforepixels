# Sets exact page sizes after Chromium renders (Chromium rounds sizes by a fraction of a point).
# Run after rendering:  python3 fix-pdf-size.py
import os, pymupdf
SIZES = {'picture-tablet-slept.pdf': (8.625, 8.75), 'cover-kdp-paperback.pdf': (17.3251, 8.75), 'cover-ingramspark-hardcover.pdf': (19.13, 10.0)}
for f, (w, h) in SIZES.items():
    d = pymupdf.open(f)
    for p in d: p.set_mediabox(pymupdf.Rect(0, 0, w * 72, h * 72))
    d.save(f + '.tmp', garbage=3, deflate=True); d.close(); os.replace(f + '.tmp', f)
    print(f, 'set to', w, 'x', h, 'in')
