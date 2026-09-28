#!/usr/bin/env bash
# Rebuild and check everything for the Birth-to-5 Printable Library (the parts' PDFs are never copied).
#   bash products/bundle-library-0-5/build/make.sh
set -euo pipefail
cd "$(dirname "$0")"
node build.js
node ../../bundle-gift-1-5/build/shared/render.js tmp/jobs.json
python3 ../../bundle-gift-1-5/build/shared/finish.py tmp/finish.json
python3 ../../bundle-gift-1-5/build/shared/manifest.py zip-config.json ../zip-manifest.json
node marketing.js && node ../../bundle-gift-1-5/build/shared/render.js tmp/mk-jobs.json
cp tmp/cover/p01.png ../cover.png
python3 listing.py
cd ../../.. && python3 ops/TESTS/check_listings.py --only bundle-library-0-5 && node ops/TESTS/check_fonts.js bundle-library-0-5
