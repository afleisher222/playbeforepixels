#!/usr/bin/env bash
# Rebuilds every deliverable for "I'm Bored" Play Cards. Run from anywhere:
#   bash products/bored-play-cards/build/make-all.sh
# Needs: node, Playwright Chromium (brand/render.js), and `npm install` in this build/ folder (pdf-lib, qrcode).
#
# Deliverables (customer-voice rules 1-4: plain PDFs of 15 MB or less, never a zip):
#   Store edition (our site; URL + QR):  START-HERE.pdf, bored-play-cards.pdf (color Letter), bored-play-cards-A4.pdf,
#                                        bored-play-cards-low-ink.pdf, bored-play-cards-low-ink-A4.pdf
#   Etsy edition (no URL or QR):         etsy-upload/1-START-HERE.pdf ... 5-Low-Ink-A4.pdf (the five Etsy files)
#   Images: cover.png, mockup.png, preview/p01-pNN.png (store color Letter), preview/low-ink/, preview/listing-images/
#   Store-only bonus: png-templates/ (300 dpi PNGs for design apps; never zipped, never on Etsy)
set -euo pipefail
cd "$(dirname "$0")/.."
R=../../brand/render.js
TMP=$(mktemp -d)
node build/build.js
node build/check.js build/gen/{store,etsy}-{color,low}-{letter,a4}.html build/gen/{store,etsy}-start-here.html
# remove superseded files from earlier builds (zips, separate editable/duplex PDFs)
rm -f bored-play-cards-EDITABLE-*.pdf bored-play-cards-double-sided-*.pdf bored-play-cards-PNG-templates.zip
rm -rf etsy-upload && mkdir etsy-upload
node build/finish.js
# previews: store color Letter (website + QA), low-ink QA, Etsy editions for the listing images
rm -rf preview/p*.png preview/low-ink build/gen/prev-etsy build/gen/prev-etsy-low build/gen/prev-etsy-start
node $R pages build/gen/store-color-letter.html preview .page 1.5
node $R pages build/gen/store-low-letter.html preview/low-ink .page 1
node $R pages build/gen/etsy-color-letter.html build/gen/prev-etsy .page 1
node $R pages build/gen/etsy-low-letter.html build/gen/prev-etsy-low .page 1
node $R pages build/gen/etsy-start-here.html build/gen/prev-etsy-start .page 1
node $R png build/gen/cover.html cover.png 816 1056 1.51515
node $R pages build/gen/mockup.html $TMP/mock .mock 1 && cp $TMP/mock/p01.png mockup.png
rm -rf preview/listing-images && node $R pages build/gen/listing.html preview/listing-images .L 2
for f in preview/listing-images/p*.png; do mv "$f" "preview/listing-images/listing-${f##*/p}"; done
# PNG template set (300 dpi), store bonus only
node $R pages build/gen/png-templates.html $TMP/png .asset 3.125
rm -rf png-templates && mkdir png-templates
node -e "const m=require('./build/gen/png-templates-manifest.json');m.forEach((n,i)=>require('fs').copyFileSync('$TMP/png/p'+String(i+1).padStart(2,'0')+'.png','png-templates/'+n+'.png'))"
cp build/PNG-TEMPLATES-HOW-TO-USE.txt png-templates/HOW-TO-USE.txt
rm -rf "$TMP"
python3 build/verify.py
echo "done"
