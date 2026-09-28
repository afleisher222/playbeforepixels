#!/bin/sh
# Rebuild every file for The 30-Day Screen Reset. Run from anywhere: sh products/course-screen-reset/build/make.sh [--final]
# --final refuses to finish while any FOUNDER WRITES THIS placeholder is still in the emails or workbook.
set -e
B="$(cd "$(dirname "$0")" && pwd)"; D="$(dirname "$B")"; R="$D/../../brand/render.js"
cd "$B" && node workbook.js && node emails.js
cd "$D"
mkdir -p downloads paperback build/dbg preview/listing-images
# ---- workbook PDFs (type-in fields added by fields.js)
node "$R" pdf source.html build/_cl.pdf && node build/fields.js source.html build/_cl.pdf "downloads/2. Workbook - Color - US Letter.pdf" "The 30-Day Screen Reset: Workbook (Color, US Letter)"
node "$R" pdf source-lowink-letter.html build/_ll.pdf && node build/fields.js source-lowink-letter.html build/_ll.pdf "downloads/3. Workbook - Low-ink - US Letter.pdf" "The 30-Day Screen Reset: Workbook (Low-ink, US Letter)"
node "$R" pdf source-color-a4.html build/_ca.pdf && node build/fields.js source-color-a4.html build/_ca.pdf "downloads/4. Workbook - Color - A4.pdf" "The 30-Day Screen Reset: Workbook (Color, A4)"
node "$R" pdf source-lowink-a4.html build/_la.pdf && node build/fields.js source-lowink-a4.html build/_la.pdf "downloads/5. Workbook - Low-ink - A4.pdf" "The 30-Day Screen Reset: Workbook (Low-ink, A4)"
cp "downloads/2. Workbook - Color - US Letter.pdf" course-screen-reset.pdf
rm -f build/_*.pdf
# ---- Etsy edition (no URL or QR) kept in build/etsy until a marketplace listing is chosen
node "$R" pdf build/etsy/source-etsy-letter.html build/etsy/workbook-etsy-color-letter.pdf
# ---- KDP paperback interior
node "$R" pdf paperback/source-kdp.html paperback/course-screen-reset-kdp-interior.pdf
# ---- previews
rm -rf preview/p*.png && node "$R" pages source.html preview .page 1
rm -rf paperback/preview && node "$R" pages paperback/source-kdp.html paperback/preview .page 1
# ---- email screenshot for mockups
sed "s#{{logo_url}}#$D/../../brand/logo/png/lockup-horizontal-2400.png#" emails/day-06.html > build/dbg/email6.html
node "$R" png build/dbg/email6.html build/dbg/email-shot.png 420 0 2
# ---- extras
cd "$B" && node extras.js && cd "$D"
node "$R" png build/cover.html cover.png 768 960 1.6667
node "$R" pdf build/cover-wrap.html paperback/course-screen-reset-kdp-cover.pdf
WW=$(node -e "const j=require('./build/cover-wrap.json');console.log(Math.round(j.wrap_in[0]*96)+' '+Math.round(j.wrap_in[1]*96))"); node "$R" png build/cover-wrap.html paperback/cover-wrap-preview.png $WW 1
node "$R" pdf build/start-here.html "downloads/1. START HERE.pdf"
mkdir -p funnel/starter
node "$R" pdf build/starter-letter.html "funnel/starter/7 Days of Play First - US Letter.pdf"
node "$R" pdf build/starter-a4.html "funnel/starter/7 Days of Play First - A4.pdf"
node "$R" pages build/starter-letter.html funnel/starter/preview .page 1
node "$R" png build/mockup.html mockup.png 1600 1200 1
rm -f preview/listing-images/*.png
for f in build/listing-*.html; do n=$(basename "$f" .html); node "$R" png "$f" "preview/listing-images/${n#listing-}.png" 2000 2000 1; done
node "$R" png build/sales-page.html preview/sales-page.png 1280 0 1
cp build/sales-page.html sales-page.html && sed -i 's#\.\./\.\./\.\./brand#../../brand#g; s#\.\./mockup.png#mockup.png#; s#\.\./preview/#preview/#g' sales-page.html
ls -la downloads paperback/*.pdf
if [ "$1" = "--final" ]; then
  if grep -rl "FOUNDER WRITES THIS" emails source*.html paperback/source-kdp.html sales-page.html >/dev/null 2>&1; then echo "STOP: founder placeholders remain:"; grep -rl "FOUNDER WRITES THIS" emails source*.html paperback/source-kdp.html sales-page.html; exit 1; fi
fi
echo done
