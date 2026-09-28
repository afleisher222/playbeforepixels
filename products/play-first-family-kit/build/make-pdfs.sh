#!/bin/bash
# Renders every PDF: fillable fields, bookmarks, metadata. Store files -> product root; Etsy files -> etsy-upload/.
set -e
cd "$(dirname "$0")"
P=..; mkdir -p tmp $P/etsy-upload
node -e '
const m=require("./out/manifest.json"); const fs=require("fs");
for (const [k,v] of Object.entries(m)) fs.writeFileSync("tmp/"+k+".toc.json", JSON.stringify(v.toc));'
one() { # variant out title
  node render-pdf.js out/$1.html tmp/$1.raw.pdf
  node fields.js out/$1.html tmp/$1.fields.json
  python3 finish.py tmp/$1.raw.pdf "$2" --fields tmp/$1.fields.json ${4:+--toc tmp/$1.toc.json} --title "$3"
}
T="Play-First Family Kit"
one kit-store-color-letter $P/play-first-family-kit.pdf "$T (Color, US Letter)" toc
one kit-store-color-a4 $P/play-first-family-kit-a4.pdf "$T (Color, A4)" toc
one kit-store-low-letter $P/play-first-family-kit-low-ink.pdf "$T (Low-ink, US Letter)" toc
one kit-store-low-a4 $P/play-first-family-kit-low-ink-a4.pdf "$T (Low-ink, A4)" toc
one start-here-store $P/START-HERE.pdf "START HERE: $T"
one kit-etsy-color-letter "$P/etsy-upload/2-Color-US-Letter.pdf" "$T (Color, US Letter)" toc
one kit-etsy-color-a4 "$P/etsy-upload/3-Color-A4.pdf" "$T (Color, A4)" toc
one kit-etsy-low-letter "$P/etsy-upload/4-Low-Ink-US-Letter.pdf" "$T (Low-ink, US Letter)" toc
one kit-etsy-low-a4 "$P/etsy-upload/5-Low-Ink-A4.pdf" "$T (Low-ink, A4)" toc
one start-here-etsy "$P/etsy-upload/1-START-HERE.pdf" "START HERE: $T"
ls -la $P/*.pdf $P/etsy-upload
