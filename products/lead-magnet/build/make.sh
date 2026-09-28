#!/usr/bin/env bash
# Rebuild and check the free lead magnet "Five 5-Minute Plays" (email delivery only; no listing.json, see ../magnet.json).
#   bash products/lead-magnet/build/make.sh
set -euo pipefail
cd "$(dirname "$0")"
SH=../../bundle-gift-1-5/build/shared
node build.js
node "$SH/render.js" tmp/jobs.json
python3 "$SH/finish.py" tmp/finish.json
node marketing.js && node "$SH/render.js" tmp/mk-jobs.json
cp tmp/cover/p01.png ../cover.png
cd ../../.. && node ops/TESTS/check_fonts.js lead-magnet
