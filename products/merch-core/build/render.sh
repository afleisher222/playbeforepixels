#!/usr/bin/env bash
# Rebuild everything for products/merch-core. Run from anywhere.
set -euo pipefail
cd "$(dirname "$0")/.."
R=../../brand/render.js
python3 build/build.py
node ../../brand/logo/src/raster.js build/raster-jobs.json
python3 build/set_dpi.py
python3 build/pages.py
mkdir -p preview/mockups preview/listing-images preview/hang-tag
for f in build/html/mock-*.html; do n=$(basename "$f" .html); node $R png "$f" "preview/mockups/${n#mock-}.png" 1600 1200 1; done
node $R png mockup.html mockup.png 1600 1200 1
node $R png cover.html cover.png 1600 1600 1
for f in build/html/listing-*.html build/html/tote-*.html; do n=$(basename "$f" .html); node $R png "$f" "preview/listing-images/$n.png" 2000 2000 1; done
node $R pdf hang-tag.html hang-tag.pdf
node $R pages hang-tag.html preview/hang-tag .page 3
python3 build/book.py
node $R pdf source.html merch-core.pdf
node $R pages source.html preview .page 1.5
echo done
