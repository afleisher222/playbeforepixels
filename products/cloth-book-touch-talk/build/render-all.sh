#!/usr/bin/env bash
# Rebuild every file for cloth-book-touch-talk from build/build.js. Run from anywhere.
set -euo pipefail
cd "$(dirname "$0")/.."
node build/build.js
node ../../brand/render.js pdf source.html cloth-book-touch-talk.pdf
node ../../brand/render.js pages source.html preview .page 2
node ../../brand/render.js pdf build/maker-spec.html cloth-book-touch-talk-maker-spec.pdf
node ../../brand/render.js pages build/maker-spec.html build/maker-preview .page 1
node ../../brand/render.js png build/cover-only.html cover.png 576 576 2.77778
node ../../brand/render.js png build/page-soft.html build/page-soft.png 576 576 2
node ../../brand/render.js png build/mockup.html mockup.png 1600 1200 1
