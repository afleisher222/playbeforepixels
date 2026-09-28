#!/usr/bin/env bash
# Rebuilds every deliverable for the First Phone Agreement Kit. Run from anywhere:
#   bash products/first-phone-plan/build/make-all.sh
# Needs: node + Playwright Chromium (brand/render.js), `npm install` in this build/ folder (qrcode), python3 with PyMuPDF.
set -euo pipefail
cd "$(dirname "$0")"
R="$(cd ../../../brand && pwd)/render.js"
node build.js
node check.js out/kit-*.html out/start-here-*.html
mkdir -p tmp
# PDFs: render (tagged), then add fillable fields, bookmarks and metadata
for v in store-color-letter store-color-a4 store-low-letter store-low-a4 etsy-color-letter etsy-color-a4 etsy-low-letter etsy-low-a4; do
  node render-pdf.js out/kit-$v.html tmp/$v.pdf
  node fields.js out/kit-$v.html tmp/$v.fields.json
  node -e "const m=require('./out/manifest.json')['kit-$v'];require('fs').writeFileSync('tmp/$v.toc.json',JSON.stringify(m.toc))"
  case $v in *color*) ink="Color";; *) ink="Low-ink";; esac; case $v in *a4) sz="A4";; *) sz="US Letter";; esac
  python3 finish.py tmp/$v.pdf tmp/$v.final.pdf --fields tmp/$v.fields.json --toc tmp/$v.toc.json --title "First Phone Agreement Kit · $ink · $sz"
done
for e in store etsy; do node render-pdf.js out/start-here-$e.html tmp/start-$e.pdf; python3 finish.py tmp/start-$e.pdf "tmp/START HERE-$e.pdf" --title "START HERE: First Phone Agreement Kit"; done
cd ..
# store / website files
rm -rf downloads && mkdir downloads
cp "build/tmp/START HERE-store.pdf" "downloads/START HERE.pdf"
cp build/tmp/store-color-letter.final.pdf downloads/first-phone-plan.pdf
cp build/tmp/store-color-a4.final.pdf downloads/first-phone-plan-a4.pdf
cp build/tmp/store-low-letter.final.pdf downloads/first-phone-plan-low-ink.pdf
cp build/tmp/store-low-a4.final.pdf downloads/first-phone-plan-low-ink-a4.pdf
cp downloads/first-phone-plan.pdf first-phone-plan.pdf
# Etsy: 5 files, no URL or QR code
rm -rf etsy-upload && mkdir etsy-upload
cp "build/tmp/START HERE-etsy.pdf" "etsy-upload/START HERE.pdf"
cp build/tmp/etsy-color-letter.final.pdf etsy-upload/2-Color-US-Letter.pdf
cp build/tmp/etsy-color-a4.final.pdf etsy-upload/3-Color-A4.pdf
cp build/tmp/etsy-low-letter.final.pdf etsy-upload/4-Low-Ink-US-Letter.pdf
cp build/tmp/etsy-low-a4.final.pdf etsy-upload/5-Low-Ink-A4.pdf
# previews (store color Letter), Etsy previews for listing images, cover, mockup, listing images
rm -rf preview/p*.png && node $R pages source.html preview .page 1.5
rm -rf build/tmp/etsy-pv && node $R pages build/out/kit-etsy-color-letter.html build/tmp/etsy-pv .page 1.5
node $R pages build/out/kit-etsy-low-letter.html build/tmp/etsy-pv-low .page 1.5
node build/listing.js
node $R pages build/out/cover.html build/tmp/cover .page 1.51515 && cp build/tmp/cover/p01.png cover.png
node $R png build/mockup.html mockup.png 1600 1200 1
rm -rf preview/listing-images && node $R pages build/listing.html preview/listing-images .L 2
for f in preview/listing-images/p*.png; do mv "$f" "preview/listing-images/listing-${f##*/p}"; done
# size check (CUSTOMER-VOICE rule 1: plain PDFs of 15 MB or less)
find downloads etsy-upload -name '*.pdf' -size +15M -print | sed 's/^/TOO BIG: /'
ls -la downloads etsy-upload
echo done
