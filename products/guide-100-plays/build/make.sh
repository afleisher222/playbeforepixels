#!/bin/sh
# Rebuild every file for 100 Screen-Free Plays. Run from anywhere: sh products/guide-100-plays/build/make.sh
#   Paperback (KDP, black-and-white): guide-100-plays-kdp-interior.pdf (+ guide-100-plays.pdf at the brand-kit bleed size) and the cover wrap
#   Own shop (with QR and URL):  START-HERE.pdf, guide-100-plays-{letter,a4}.pdf (color), guide-100-plays-low-ink-{letter,a4}.pdf
#   Etsy (no URL or QR code):    etsy-upload/1-START-HERE.pdf ... 5-Low-Ink-A4.pdf  (CUSTOMER-VOICE rules 1-4)
set -e
B="$(cd "$(dirname "$0")" && pwd)"; D="$(dirname "$B")"; R="$D/../../brand/render.js"
cd "$B" && node book.js && node measure.js
cd "$D"
# page renders used by the mockup and listing images
rm -rf preview build/dbg/hi build/dbg/lo
node "$R" pages source-color-letter.html preview .page 1
# listing images use the Etsy edition (no URL or QR code on any page shown)
node "$R" pages source-etsy-color-letter.html build/dbg/hi .page 2
node "$R" pages source-etsy-lowink-letter.html build/dbg/lo .page 1
cd "$B" && node extras.js && cd "$D"
# paperback
node "$R" pdf source.html guide-100-plays.pdf
node "$R" pdf source-kdp.html guide-100-plays-kdp-interior.pdf
node "$R" pdf build/cover-wrap.html guide-100-plays-cover-wrap.pdf
# Chromium rounds page sizes slightly: snap the print files to the exact inch sizes KDP checks
node build/fixsize.js guide-100-plays.pdf 8.25 10.25
node build/fixsize.js guide-100-plays-kdp-interior.pdf 8.125 10.25
node build/fixsize.js guide-100-plays-cover-wrap.pdf $(node -e "const n=require('./build/pagemap-kdp.json').count;console.log((0.25+16+ +(n*0.002252).toFixed(4)).toFixed(4))") 10.25
# channel tag for the KDP upload files (COMPLIANCE-GATE 16)
python3 ../../ops/UPLOAD-PACKETS/channel_tag.py kdp guide-100-plays-kdp-interior.pdf guide-100-plays-cover-wrap.pdf
# digital editions, with type-in fields
fill() { node "$R" pdf "$1" build/_tmp.pdf && node build/fields.js "$1" build/_tmp.pdf "$2" && rm -f build/_tmp.pdf; }
fill source-color-letter.html guide-100-plays-letter.pdf
fill source-color-a4.html guide-100-plays-a4.pdf
fill source-lowink-letter.html guide-100-plays-low-ink-letter.pdf
fill source-lowink-a4.html guide-100-plays-low-ink-a4.pdf
node "$R" pdf build/start-here.html START-HERE.pdf
mkdir -p etsy-upload
node "$R" pdf build/start-here-etsy.html "etsy-upload/1-START-HERE.pdf"
fill source-etsy-color-letter.html etsy-upload/2-Color-US-Letter.pdf
fill source-etsy-color-a4.html etsy-upload/3-Color-A4.pdf
fill source-etsy-lowink-letter.html etsy-upload/4-Low-Ink-US-Letter.pdf
fill source-etsy-lowink-a4.html etsy-upload/5-Low-Ink-A4.pdf
# cover, mockup, listing images
node "$R" png build/cover.html cover.png 768 960 1.6667
node "$R" png build/mockup.html mockup.png 1600 1200 1
rm -rf preview/listing-images && mkdir -p preview/listing-images
for f in build/listing-*.html; do n=$(basename "$f" .html); node "$R" png "$f" "preview/listing-images/${n#listing-}.png" 2000 2000 1; done
# size check: every PDF must be 15 MB or less (CUSTOMER-VOICE rule 2)
for f in *.pdf etsy-upload/*.pdf; do s=$(wc -c < "$f"); [ "$s" -le 15728640 ] || { echo "TOO BIG: $f ($s bytes)"; exit 1; }; done
echo done
