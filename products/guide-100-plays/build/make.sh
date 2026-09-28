#!/bin/sh
# Rebuild every file for 100 Screen-Free Plays. Run from anywhere: sh products/guide-100-plays/build/make.sh
set -e
B="$(cd "$(dirname "$0")" && pwd)"; D="$(dirname "$B")"; R="$D/../../brand/render.js"
cd "$B" && node book.js && node extras.js
cd "$D"
node "$R" pdf source.html guide-100-plays.pdf
node "$R" pdf source-kdp.html guide-100-plays-kdp-interior.pdf
node "$R" pdf source-color-letter.html build/_letter.pdf && node build/fields.js source-color-letter.html build/_letter.pdf guide-100-plays-letter.pdf
node "$R" pdf source-color-a4.html build/_a4.pdf && node build/fields.js source-color-a4.html build/_a4.pdf guide-100-plays-a4.pdf
rm -f build/_letter.pdf build/_a4.pdf
node "$R" pdf build/cover-wrap.html guide-100-plays-cover-wrap.pdf
rm -rf preview && node "$R" pages source-color-letter.html preview .page 1
rm -rf build/dbg/hi && node "$R" pages source-color-letter.html build/dbg/hi .page 2
node "$R" png build/cover.html cover.png 768 960 1.6667
node "$R" png build/mockup.html mockup.png 1600 1200 1
mkdir -p preview/listing-images
for f in build/listing-*.html; do n=$(basename "$f" .html); node "$R" png "$f" "preview/listing-images/${n#listing-}.png" 2000 2000 1; done
echo done
