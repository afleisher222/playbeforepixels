#!/usr/bin/env bash
# Rebuild every file for bath-book-splash-talk from build/build.js. Run from anywhere.
set -euo pipefail
cd "$(dirname "$0")/.."
node build/build.js
node ../../brand/render.js pdf source.html bath-book-splash-talk.pdf
node ../../brand/render.js pages source.html preview .page 2
node ../../brand/render.js pdf build/dieline.html bath-book-splash-talk-dieline.pdf
node ../../brand/render.js pages build/dieline.html build/dieline-preview .page 1
node ../../brand/render.js png build/cover-only.html cover.png 528 528 3.0303
node ../../brand/render.js png build/page-duck.html build/page-duck.png 528 528 2
node ../../brand/render.js png build/mockup.html mockup.png 1600 1200 1
