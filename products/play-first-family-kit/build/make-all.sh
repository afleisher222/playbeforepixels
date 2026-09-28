#!/bin/bash
# Rebuild every deliverable for the Play-First Family Kit.
set -e
cd "$(dirname "$0")"
R=../../../brand/render.js; P=..
node build.js
node check.js out/*.html            # fails on any overflow; prints the smallest cut piece
./make-pdfs.sh
rm -rf $P/preview/pages $P/preview/low-ink $P/preview/start-here $P/preview/ages-2-5 $P/canva-png tmp/ep tmp/epl tmp/ep0 tmp/epl0 tmp/tk tmp/sc tmp/li tmp/li0 tmp/mk tmp/cover
node $R pages out/kit-store-color-letter.html $P/preview/pages .page 1
node $R pages out/kit-store-low-letter.html $P/preview/low-ink .page 1
node $R pages out/start-here-store.html $P/preview/start-here .page 1
node $R pages out/kit-g0-store-color-letter.html $P/preview/ages-2-5 .page 1
node $R pages out/start-here-g0-store.html $P/preview/ages-2-5/start-here .page 1
# website cover: the Ages 2-5 edition, the one that launches (G0)
node $R pages out/kit-g0-store-color-letter.html tmp/cover '.page[data-key="cover"]' 1.51516 && cp tmp/cover/p01.png $P/cover.png
node export-png.js out/kit-store-color-letter.html $P/canva-png/us-letter letter 2.5
node export-png.js out/kit-store-color-a4.html $P/canva-png/a4 a4 2.5
# Etsy-edition renders (no URL/QR) feed the listing images
node $R pages out/kit-etsy-color-letter-mk.html tmp/ep .page 1.5   # same pages, founder-note placeholder hidden
node $R pages out/kit-etsy-low-letter.html tmp/epl .page 1.5
node $R pages out/kit-g0-etsy-color-letter-mk.html tmp/ep0 .page 1.5
node $R pages out/kit-g0-etsy-low-letter.html tmp/epl0 .page 1.5
node $R pages out/kit-etsy-color-letter.html tmp/tk '.page[data-key="tokens"] .tk .in' 2
node $R pages out/kit-etsy-color-letter.html tmp/sc '.page[data-key="cards"] .sc .in' 2
node marketing.js
node $R pages listing.html tmp/li .li 2
node $R pages listing-g0.html tmp/li0 .li 2
node $R pages mockup.html tmp/mk .mk 1 && cp tmp/mk/p01.png $P/mockup.png
mkdir -p $P/preview/listing-images && rm -f $P/preview/listing-images/*.png
names=(01-cover 02-whats-inside 03-grown-up-guide 04-checklist-colorways 05-ages-2-5 06-ages-5-12 07-family-plan-and-rules 08-tokens-and-30-days 09-sizes-and-formats 10-how-to-use-and-download)
for i in $(seq 1 10); do cp tmp/li/p$(printf %02d $i).png $P/preview/listing-images/${names[$((i-1))]}.png; done
mkdir -p $P/preview/listing-images/ages-2-5 && rm -f $P/preview/listing-images/ages-2-5/*.png
names0=(01-cover 02-whats-inside 03-grown-up-guide 04-checklist-colorways 05-ages-2-5 06-family-plan-and-rules 07-tokens-and-30-days 08-sizes-and-formats 09-how-to-use-and-download)
for i in $(seq 1 9); do cp tmp/li0/p$(printf %02d $i).png $P/preview/listing-images/ages-2-5/${names0[$((i-1))]}.png; done
ls -la $P $P/etsy-upload $P/preview/listing-images
