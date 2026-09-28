#!/usr/bin/env bash
# Rebuilds every deliverable for the Toddler Busy Book. Run from anywhere:
#   bash products/toddler-busy-book/build/make-all.sh
# Needs: node, Playwright Chromium (brand/render.js), and `npm install` in this build/ folder (pdf-lib, qrcode).
set -euo pipefail
cd "$(dirname "$0")/.."
R=../../brand/render.js
TMP=$(mktemp -d)
node build/build.js
for f in build/html/site-*.html build/html/etsy-*.html; do node build/check.js "$f" > "$TMP/check.json" || { echo "QA failed: $f"; cat "$TMP/check.json"; exit 1; }; done
echo "QA passed on all 8 editions"
pdf() { node $R pdf "build/html/$1.html" "$TMP/$1.pdf" && node build/fillable.js "build/html/$1.html" "$TMP/$1.pdf" "$2"; }
# website edition (QR + short link on the last page)
pdf site-color-letter  toddler-busy-book.pdf
pdf site-color-a4      toddler-busy-book-A4.pdf
pdf site-lowink-letter toddler-busy-book-low-ink-Letter.pdf
pdf site-lowink-a4     toddler-busy-book-low-ink-A4.pdf
node $R pdf build/html/start-here-site-letter.html "toddler-busy-book-START-HERE.pdf"
node $R pdf build/html/start-here-site-a4.html "toddler-busy-book-START-HERE-A4.pdf"
# Etsy edition: no URL, no QR; 5 plain PDFs (no zips), each well under 20 MB
rm -rf etsy-upload && mkdir etsy-upload
node $R pdf build/html/start-here-etsy-letter.html "etsy-upload/1-START-HERE.pdf"
pdf etsy-color-letter  "etsy-upload/2-Toddler-Busy-Book-Color-US-Letter.pdf"
pdf etsy-color-a4      "etsy-upload/3-Toddler-Busy-Book-Color-A4.pdf"
pdf etsy-lowink-letter "etsy-upload/4-Toddler-Busy-Book-Low-ink-US-Letter.pdf"
pdf etsy-lowink-a4     "etsy-upload/5-Toddler-Busy-Book-Low-ink-A4.pdf"
# previews
rm -rf preview && mkdir -p preview
node $R pages build/html/site-color-letter.html preview .page 1.25
node $R pages build/html/site-lowink-letter.html preview/low-ink .page 1
# Etsy-edition renders for the listing images (kept in build/, not shipped)
rm -rf build/etsy-preview
node $R pages build/html/etsy-color-letter.html build/etsy-preview/color .page 1
node $R pages build/html/etsy-lowink-letter.html build/etsy-preview/low-ink .page 1
# cover, mockup, listing images, PNG templates
node build/marketing.js
node build/listing.js
node $R png build/cover.html cover.png 816 1056 1.51515
node $R pages build/mockup.html "$TMP/mock" .mock 1 && cp "$TMP/mock/p01.png" mockup.png
node $R pages build/listing.html "$TMP/L" .L 2 && mkdir -p preview/listing-images
for f in "$TMP"/L/p*.png; do n=${f##*/p}; cp "$f" "preview/listing-images/listing-$n"; done
node $R pages build/png-templates.html "$TMP/png" .asset 3.125
rm -rf png-templates && mkdir png-templates
node -e "const m=require('./build/png-templates-manifest.json');m.forEach((n,i)=>require('fs').copyFileSync('$TMP/png/p'+String(i+1).padStart(2,'0')+'.png','png-templates/'+n+'.png'))"
cp build/PNG-TEMPLATES-HOW-TO-USE.txt png-templates/HOW-TO-USE.txt
rm -f toddler-busy-book-PNG-templates.zip && zip -qr toddler-busy-book-PNG-templates.zip png-templates
rm -rf "$TMP"
ls -la *.pdf etsy-upload/ | awk '{print $5, $9}'
echo "done"
