#!/bin/bash
# Renders every PDF (tagged), adds real fillable fields (free Adobe Acrobat Reader), bookmarks and metadata.
# Own-store files -> product root; Etsy files (no URL, no QR) -> etsy-upload/complete and etsy-upload/starter.
set -e
cd "$(dirname "$0")"
P=..; mkdir -p tmp $P/etsy-upload/complete $P/etsy-upload/starter
node -e '
const m=require("./manifest.json"); const fs=require("fs");
for (const [k,v] of Object.entries(m.docs)) fs.writeFileSync("tmp/"+k+".toc.json", JSON.stringify(v.bookmarks));'
one() { # variant out title [toc]
  node render-pdf.js "out/$1.html" "tmp/$1.raw.pdf"
  node fields.js "out/$1.html" "tmp/$1.fields.json"
  if [ -n "$4" ]; then python3 finish.py "tmp/$1.raw.pdf" "$2" --fields "tmp/$1.fields.json" --toc "tmp/$1.toc.json" --title "$3"
  else python3 finish.py "tmp/$1.raw.pdf" "$2" --fields "tmp/$1.fields.json" --title "$3"; fi
}
T="$(node -p "require('./manifest.json').cards") Visual Routine Cards"; TS="$(node -p "require('./manifest.json').starter") Visual Routine Cards Starter Set"
JOBS=(
"full-store-color-letter|$P/visual-routine-cards.pdf|$T (Color, US Letter)|toc"
"full-store-color-a4|$P/visual-routine-cards-a4.pdf|$T (Color, A4)|toc"
"full-store-low-letter|$P/visual-routine-cards-low-ink.pdf|$T (Low-ink, US Letter)|toc"
"full-store-low-a4|$P/visual-routine-cards-low-ink-a4.pdf|$T (Low-ink, A4)|toc"
"start-full-store|$P/START-HERE.pdf|START HERE: $T|"
"full-etsy-color-letter|$P/etsy-upload/complete/2-Color-US-Letter.pdf|$T (Color, US Letter)|toc"
"full-etsy-color-a4|$P/etsy-upload/complete/3-Color-A4.pdf|$T (Color, A4)|toc"
"full-etsy-low-letter|$P/etsy-upload/complete/4-Low-Ink-US-Letter.pdf|$T (Low-ink, US Letter)|toc"
"full-etsy-low-a4|$P/etsy-upload/complete/5-Low-Ink-A4.pdf|$T (Low-ink, A4)|toc"
"start-full-etsy|$P/etsy-upload/complete/1-START-HERE.pdf|START HERE: $T|"
"starter-store-color-letter|$P/visual-routine-cards-starter-letter.pdf|$TS (Color, US Letter)|toc"
"starter-store-color-a4|$P/visual-routine-cards-starter-a4.pdf|$TS (Color, A4)|toc"
"starter-store-low-letter|$P/visual-routine-cards-starter-low-ink-letter.pdf|$TS (Low-ink, US Letter)|toc"
"starter-store-low-a4|$P/visual-routine-cards-starter-low-ink-a4.pdf|$TS (Low-ink, A4)|toc"
"start-starter-store|$P/START-HERE-starter.pdf|START HERE: $TS|"
"starter-etsy-color-letter|$P/etsy-upload/starter/2-Color-US-Letter.pdf|$TS (Color, US Letter)|toc"
"starter-etsy-color-a4|$P/etsy-upload/starter/3-Color-A4.pdf|$TS (Color, A4)|toc"
"starter-etsy-low-letter|$P/etsy-upload/starter/4-Low-Ink-US-Letter.pdf|$TS (Low-ink, US Letter)|toc"
"starter-etsy-low-a4|$P/etsy-upload/starter/5-Low-Ink-A4.pdf|$TS (Low-ink, A4)|toc"
"start-starter-etsy|$P/etsy-upload/starter/1-START-HERE.pdf|START HERE: $TS|"
)
n=0
for j in "${JOBS[@]}"; do
  IFS='|' read -r v o t toc <<< "$j"
  one "$v" "$o" "$t" "$toc" &
  n=$((n+1)); if [ $((n % 4)) -eq 0 ]; then wait; fi
done
wait
ls -la $P/*.pdf $P/etsy-upload/*/
