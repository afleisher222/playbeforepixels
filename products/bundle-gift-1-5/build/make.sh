#!/usr/bin/env bash
# Rebuild and check everything for the Ages 1–5 Instant Gift Bundle (the parts' PDFs are never copied).
#   bash products/bundle-gift-1-5/build/make.sh
set -euo pipefail
cd "$(dirname "$0")"
node build.js
node shared/render.js tmp/jobs.json
python3 shared/finish.py tmp/finish.json
python3 shared/manifest.py zip-config.json ../zip-manifest.json
node marketing.js && node shared/render.js tmp/mk-jobs.json
cp tmp/cover/p01.png ../cover.png
python3 listing.py
cd ../../.. && python3 ops/TESTS/check_listings.py --only bundle-gift-1-5 && node ops/TESTS/check_fonts.js bundle-gift-1-5
