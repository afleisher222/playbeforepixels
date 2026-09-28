#!/bin/bash
# Rebuild every deliverable for Visual Routine Cards (PDFs, previews, cover, mockup, listing images, Canva zips).
set -e
cd "$(dirname "$0")"
R=../../../brand/render.js; P=..
./make-pdfs.sh
rm -rf $P/preview/pages $P/preview/starter
node $R pages full-letter.html $P/preview/pages .page 1
node $R pages starter-letter.html $P/preview/starter .page 1
node marketing.js
rm -rf tmp/li tmp/lis tmp/mk
node $R pages listing.html tmp/li .li 2
node $R pages listing-starter.html tmp/lis .li 2
node $R pages mockup.html tmp/mk .mk 2
cp tmp/mk/p01.png $P/mockup.png
node $R png cover.html $P/cover.png 816 1056 1.51516
mkdir -p $P/preview/listing-images/starter
names=(01-cover 02-whats-inside 03-ages-0-5-cards 04-ages-5-12-cards 05-six-chart-layouts 06-in-use-bedtime-chart 07-play-first-screens-later 08-four-colorways 09-editable-make-it-yours 10-how-to-use-sizes-formats)
for i in $(seq 1 10); do cp tmp/li/p$(printf %02d $i).png $P/preview/listing-images/${names[$((i-1))]}.png; done
snames=(01-starter-cover 02-starter-whats-inside 03-starter-vs-complete)
for i in 1 2 3; do cp tmp/lis/p0$i.png $P/preview/listing-images/starter/${snames[$((i-1))]}.png; done
rm -rf tmp/canva && node export-png.js tmp/canva
cp tmp/README-canva.txt tmp/canva/README.txt
mkdir -p $P/downloads && rm -f $P/downloads/*.zip
(cd tmp/canva && zip -qr ../../../downloads/visual-routine-cards-canva-cards.zip README.txt 1-cards-rainbow 2-art-only-transparent 3-blank-card-frames && zip -qr ../../../downloads/visual-routine-cards-canva-charts.zip README.txt 4-chart-backgrounds-letter 4-chart-backgrounds-a4)
(cd tmp && cp README-editable.txt README.txt && zip -qj ../../downloads/visual-routine-cards-editable-pdfs.zip README.txt ../../visual-routine-cards-editable-letter.pdf ../../visual-routine-cards-editable-a4.pdf)
ls -la $P $P/downloads
