#!/usr/bin/env bash
# Rebuilds every deliverable for "I'm Bored" Play Cards. Run from anywhere:
#   bash products/bored-play-cards/build/make-all.sh
# Needs: node, Playwright Chromium (brand/render.js), and `npm install` in this build/ folder (pdf-lib, qrcode).
set -euo pipefail
cd "$(dirname "$0")/.."
R=../../brand/render.js
TMP=$(mktemp -d)
node build/build.js
node build/check.js source.html | tail -3
# print PDFs
node $R pdf source.html bored-play-cards.pdf
node $R pdf build/source-a4.html bored-play-cards-A4.pdf
node $R pdf build/duplex-letter.html bored-play-cards-double-sided-cards-Letter.pdf
node $R pdf build/duplex-a4.html bored-play-cards-double-sided-cards-A4.pdf
# fillable editable PDFs
node $R pdf build/editable-letter.html $TMP/ed-letter.pdf
node build/fillable.js build/editable-letter.html $TMP/ed-letter.pdf bored-play-cards-EDITABLE-Letter.pdf
node $R pdf build/editable-a4.html $TMP/ed-a4.pdf
node build/fillable.js build/editable-a4.html $TMP/ed-a4.pdf bored-play-cards-EDITABLE-A4.pdf
# previews, cover, mockup, listing images
rm -rf preview/p*.png && node $R pages source.html preview .page 1.5
node $R png build/cover.html cover.png 816 1056 1.51515
node $R pages build/mockup.html $TMP/mock .mock 1 && cp $TMP/mock/p01.png mockup.png
rm -rf preview/listing-images && node $R pages build/listing.html preview/listing-images .L 2
for f in preview/listing-images/p*.png; do mv "$f" "preview/listing-images/listing-${f##*/p}"; done
# PNG template set (300 dpi) + zip
node $R pages build/png-templates.html $TMP/png .asset 3.125
rm -rf png-templates && mkdir png-templates
node -e "const m=require('./build/png-templates-manifest.json');m.forEach((n,i)=>require('fs').copyFileSync('$TMP/png/p'+String(i+1).padStart(2,'0')+'.png','png-templates/'+n+'.png'))"
cp build/PNG-TEMPLATES-HOW-TO-USE.txt png-templates/HOW-TO-USE.txt
rm -f bored-play-cards-PNG-templates.zip && zip -qr bored-play-cards-PNG-templates.zip png-templates
rm -rf "$TMP"
echo "done"
