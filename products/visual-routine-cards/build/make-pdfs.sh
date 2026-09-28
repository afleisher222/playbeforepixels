#!/bin/bash
# Build every PDF for Visual Routine Cards. Run from anywhere.
set -e
cd "$(dirname "$0")"
R=../../../brand/render.js
P=..
TMP=./tmp; mkdir -p $TMP
node build.js
node -e "const m=require('./manifest.json'); require('fs').writeFileSync('tmp/toc.json', JSON.stringify(m.letter.bookmarks))"
for paper in letter a4; do
  node $R pdf full-$paper.html $TMP/full-$paper.pdf
  node $R pdf starter-$paper.html $TMP/starter-$paper.pdf
  node $R pdf editable-$paper.html $TMP/editable-$paper.pdf
  node fields.js editable-$paper.html $TMP/fields-$paper.json
done
python3 finish.py $TMP/full-letter.pdf $P/visual-routine-cards.pdf --toc $TMP/toc.json --title "200+ Visual Routine Cards (US Letter)"
python3 finish.py $TMP/full-a4.pdf $P/visual-routine-cards-a4.pdf --toc $TMP/toc.json --title "200+ Visual Routine Cards (A4)"
python3 finish.py $TMP/starter-letter.pdf $P/visual-routine-cards-starter-letter.pdf --title "60 Visual Routine Cards Starter Set (US Letter)"
python3 finish.py $TMP/starter-a4.pdf $P/visual-routine-cards-starter-a4.pdf --title "60 Visual Routine Cards Starter Set (A4)"
python3 finish.py $TMP/editable-letter.pdf $P/visual-routine-cards-editable-letter.pdf --fields $TMP/fields-letter.json --title "Visual Routine Cards Editable (US Letter)"
python3 finish.py $TMP/editable-a4.pdf $P/visual-routine-cards-editable-a4.pdf --fields $TMP/fields-a4.json --title "Visual Routine Cards Editable (A4)"
ls -la $P/*.pdf
