#!/bin/sh
# Renders every page at 1440 and 390 (full page) with brand/render.js, then interaction states.
cd "$(dirname "$0")/.."
R=../../brand/render.js
for p in index product shop research info; do
  node $R png $p.html shots/$p-1440.png 1440 0 1
  node $R png $p.html shots/$p-390.png 390 0 2
done
node _tools/states.js
