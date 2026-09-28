#!/usr/bin/env bash
# Build, render and check the 60 Pinterest pins.   bash marketing/pins/build/make.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
PINS="$ROOT/marketing/pins"
TMP="$PINS/build/tmp"
node "$PINS/build/build.js"
rm -rf "$TMP" && mkdir -p "$TMP"
node "$ROOT/brand/render.js" pages "$PINS/src/pins.html" "$TMP" .pin 1
python3 - "$PINS" <<'PY'
import json, os, sys
from PIL import Image
pins = sys.argv[1]
order = json.load(open(os.path.join(pins, 'src', 'order.json')))
out = os.path.join(pins, 'png'); os.makedirs(out, exist_ok=True)
for f in os.listdir(out):
    if f.endswith('.jpg') and f[:-4] not in order: os.remove(os.path.join(out, f))
for i, pid in enumerate(order, 1):
    im = Image.open(os.path.join(pins, 'build', 'tmp', f'p{i:02d}.png')).convert('RGB')
    assert im.size == (1000, 1500), (pid, im.size)
    im.save(os.path.join(out, pid + '.jpg'), 'JPEG', quality=88, optimize=True, progressive=True)
print(f'{len(order)} pins written to png/ (1000 x 1500 JPEG)')
PY
rm -rf "$TMP"
node "$ROOT/ops/TESTS/check_fonts.js" "$PINS/src/pins.html"
node "$PINS/build/check-layout.js" "$PINS/src/pins.html" .pin
