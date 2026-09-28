#!/usr/bin/env bash
# Rebuilds the whole logo kit from the numbers at the top of build.py.
#   bash brand/logo/src/rebuild.sh
# Needs python3 with fonttools, uharfbuzz, brotli, pillow (shapely for the gap report) and node with Playwright.
set -euo pipefail
cd "$(dirname "$0")"
python3 build.py                 # every SVG + jobs.json, then the gap report
python3 guide.py                 # logo-guidelines.html, og page, blind-test pages
node raster.js jobs.json         # every PNG
python3 build.py ico             # favicon.ico (16/32/48)
node ../../render.js pdf ../logo-guidelines.html ../logo-guidelines.pdf
echo "done: look at ../blind-test/test-small.png, ../png/ and ../logo-guidelines.pdf, then log your edit (EDIT_LOG)."
