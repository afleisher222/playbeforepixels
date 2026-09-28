#!/usr/bin/env bash
# Rebuild both editions from build/manuscript.json and re-render every output.
set -euo pipefail
cd "$(dirname "$0")/.."
R=../../brand/render.js
node build/build.js
rm -rf preview paperback/preview
node $R pages source.html preview .page 2                                   # board-book pages (6.25 in with bleed)
node $R pdf source.html board-up-go-more.pdf                                  # A. board book, 26 pp incl. covers
node $R pages paperback/preview-trim.html paperback/preview .page 1          # paperback pages, trimmed view
node $R pdf paperback/source.html paperback/up-go-more-talk-along-interior.pdf 8.625 8.75
node $R pdf paperback/cover-wrap.html paperback/up-go-more-talk-along-cover.pdf
node $R png build/cover-only.html cover.png 576 576 2.7778                  # 1600 x 1600 front cover
node $R png build/mockup.html mockup.png 1600 1200 1
# Chromium rounds page boxes by a fraction of a point; snap them to the exact printer sizes (same-length edit keeps the PDF valid)
python3 - <<'PY'
import re
def snap(f, w):
    b = open(f, 'rb').read()
    for bx in set(re.findall(rb'/MediaBox\s*\[\s*([\d\.\s]+)\]', b)):
        old = bx.split()[2]; new = w.encode().ljust(len(old))
        if len(new) == len(old): b = b.replace(bx, bx.replace(old, new, 1))
    open(f, 'wb').write(b)
snap('paperback/up-go-more-talk-along-interior.pdf', '621')
w_in = float(re.search(r'@page\{size:([\d.]+)in', open('paperback/cover-wrap.html').read()).group(1))
snap('paperback/up-go-more-talk-along-cover.pdf', ('%.5f' % (w_in * 72)).rstrip('0').rstrip('.'))
PY
echo done
