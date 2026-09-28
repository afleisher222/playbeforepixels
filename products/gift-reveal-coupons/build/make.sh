#!/usr/bin/env bash
# Rebuild and check everything for Gift-Reveal Cards and Play Coupons.
#   bash products/gift-reveal-coupons/build/make.sh
set -euo pipefail
cd "$(dirname "$0")"
SH=../../bundle-gift-1-5/build/shared
node build.js                      # HTML for 8 editions + 2 START HERE pages, render and finish jobs
node "$SH/render.js" tmp/jobs.json # PDFs (tagged), form-field boxes, previews
python3 "$SH/finish.py" tmp/finish.json   # form fields, bookmarks, metadata; Type 3 / placeholder / Etsy-URL / size checks
node marketing.js && node "$SH/render.js" tmp/mk-jobs.json
cp tmp/cover/p01.png ../cover.png
python3 listing.py
cd ../../.. && python3 ops/TESTS/check_listings.py --only gift-reveal-coupons && node ops/TESTS/check_fonts.js gift-reveal-coupons
