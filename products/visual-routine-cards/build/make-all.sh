#!/bin/bash
# Rebuild every deliverable for Visual Routine Cards: HTML, QA check, PDFs (own-store + Etsy editions),
# previews, cover, mockup, listing images, own-store Canva bonus PNGs and both listing files.
set -e
cd "$(dirname "$0")"
R=../../../brand/render.js; P=..
node build.js
node check.js out/*.html            # fails on overflow, clipped text, cut pieces under 1.5 in, or a URL/QR in an Etsy file
./make-pdfs.sh
rm -rf $P/preview/pages $P/preview/low-ink $P/preview/starter $P/preview/start-here tmp/li tmp/lis tmp/mk
node $R pages out/full-store-color-letter.html $P/preview/pages .page 1
node $R pages out/full-store-low-letter.html $P/preview/low-ink .page 1
node $R pages out/starter-store-color-letter.html $P/preview/starter .page 1
mkdir -p $P/preview/start-here
node $R png out/start-full-etsy.html $P/preview/start-here/start-here-etsy.png 816 1056 1
node $R png out/start-full-store.html $P/preview/start-here/start-here-store.png 816 1056 1
node marketing.js
node $R pages listing.html tmp/li .li 2
node $R pages listing-starter.html tmp/lis .li 2
node $R pages mockup.html tmp/mk .mk 2
cp tmp/mk/p01.png $P/mockup.png
node $R png cover.html $P/cover.png 816 1056 1.51516
rm -rf $P/preview/listing-images && mkdir -p $P/preview/listing-images/starter
names=(01-cover 02-whats-inside 03-grown-up-guide 04-ages-0-5-cards 05-ages-5-12-cards 06-six-chart-layouts 07-play-first-screens-later 08-four-colorways 09-make-it-yours 10-how-to-download)
for i in $(seq 1 10); do cp tmp/li/p$(printf %02d $i).png $P/preview/listing-images/${names[$((i-1))]}.png; done
snames=(01-starter-cover 02-starter-whats-inside 03-starter-grown-up-guide 04-starter-in-use 05-how-to-download)
for i in 1 2 3 4 5; do cp tmp/lis/p0$i.png $P/preview/listing-images/starter/${snames[$((i-1))]}.png; done
rm -rf $P/canva-png && node export-png.js $P/canva-png && cp README-canva.txt $P/canva-png/README.txt
node listing.js
ls -la $P $P/etsy-upload/*
