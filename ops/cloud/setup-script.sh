#!/bin/bash
# Paste this whole file into the "Play Before Pixels" cloud environment: environment menu → Edit → Setup script.
# It runs as root before Claude Code starts. The result is cached for about 7 days, or until this script or the
# allowed hosts change. It must finish in about 5 minutes (it takes about 10 seconds) and it always exits 0,
# so a failed install never stops a session: ops/cloud/bootstrap.sh reports anything still missing.
# It does not read the repository, because the repository may not be cloned yet when it runs.
# Pins: PY must match requirements.txt; the Node pins match products/*/build/package-lock.json.
# Every line is explained in ops/TESTS/deps-and-paths.md.

PY="fonttools==4.66.0 uharfbuzz==0.56.2 brotli==1.2.0 pymupdf==1.28.2 numpy==2.4.6 openpyxl==3.1.5 pillow==12.3.0 shapely==2.1.2 skia-pathops==0.9.2"
NODE_PKGS="pdf-lib@1.17.1 qrcode@1.5.4"
PW_VERSION=1.56.1
PW=/opt/node22/lib/node_modules/playwright   # the path the build scripts require
H="${HOME:-/root}"

# 1. Python tools (python3 -m pip, so they land in the interpreter the scripts run).
( python3 -m pip install -q --no-input --root-user-action=ignore --disable-pip-version-check $PY \
  || python3 -m pip install -q --no-input --root-user-action=ignore --disable-pip-version-check --break-system-packages $PY ) &

# 2. pdf-lib and qrcode for the product builds. node_modules/ is git-ignored, so a fresh clone has none.
#    They go outside the repository. Node searches $HOME/.node_modules for any require() it cannot
#    find next to the script, so every products/*/build script finds them from any checkout path.
( mkdir -p /opt/pbp-node \
  && npm install -q --prefix /opt/pbp-node --save-exact --no-audit --no-fund --no-update-notifier $NODE_PKGS >/dev/null \
  && for d in "$H" /root; do
       { [ -e "$d/.node_modules" ] && [ ! -L "$d/.node_modules" ]; } || ln -sfn /opt/pbp-node/node_modules "$d/.node_modules"
     done ) &

# 3. zip (toddler-busy-book packs its PNG templates with it). On today's image already.
command -v zip >/dev/null 2>&1 || { apt-get update -qq && apt-get install -y -qq zip; } >/dev/null 2>&1 &

wait

# 4. Safety net: Playwright and Chromium are on today's image but not in the documented tool list.
#    About 50 scripts use these two paths, so keep both valid. Needs cdn.playwright.dev and
#    playwright.download.prss.microsoft.com in the allowed domains. Does nothing on today's image.
if [ ! -f "$PW/package.json" ]; then
  G="$(npm root -g 2>/dev/null)/playwright"
  [ -f "$G/package.json" ] || npm install -g -q --no-audit --no-fund "playwright@$PW_VERSION" >/dev/null 2>&1
  G="$(npm root -g 2>/dev/null)/playwright"
  [ "$G" != "$PW" ] && [ -f "$G/package.json" ] && mkdir -p "$(dirname "$PW")" && ln -sfn "$G" "$PW"
fi
if [ ! -x /opt/pw-browsers/chromium ] && [ -f "$PW/cli.js" ]; then
  export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
  timeout 150 node "$PW/cli.js" install --with-deps chromium >/dev/null 2>&1 \
    || timeout 90 node "$PW/cli.js" install chromium >/dev/null 2>&1
  C="$(ls -d /opt/pw-browsers/chromium-*/chrome-linux*/chrome 2>/dev/null | sort -V | tail -1)"
  [ -n "$C" ] && ln -sfn "$C" /opt/pw-browsers/chromium
fi

# 5. One line for the setup log.
python3 -c 'import pymupdf, fontTools, uharfbuzz, brotli, numpy, openpyxl, PIL, shapely, pathops' 2>/dev/null && py=ok || py=MISSING
(cd / && node -e "require('pdf-lib'); require('qrcode')") 2>/dev/null && nd=ok || nd=MISSING
node -e "require('$PW')" 2>/dev/null && [ -x /opt/pw-browsers/chromium ] && pw=ok || pw=MISSING
command -v zip >/dev/null 2>&1 && zp=ok || zp=MISSING
echo "setup: python=$py node-packages=$nd playwright=$pw zip=$zp"
exit 0
