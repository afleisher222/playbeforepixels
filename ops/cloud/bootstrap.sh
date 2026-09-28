#!/bin/bash
# Start-of-run bootstrap for every Claude Code cloud session and routine (ops/ROUTINE.md step 0).
# Safe to run more than once. Never prints secrets.
set -u
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo /home/user/playbeforepixels)" || exit 0

# 1. Work on the business branch. Routines may push only to claude/ branches, so claude/live is the working branch.
git fetch -q origin claude/live 2>/dev/null && {
  if [ "$(git rev-parse --abbrev-ref HEAD)" != "claude/live" ]; then
    git checkout -q -B claude/live FETCH_HEAD 2>/dev/null || echo "bootstrap: could not switch to claude/live (uncommitted changes?)"
  else
    git pull -q --rebase --autostash origin claude/live 2>/dev/null || echo "bootstrap: pull --rebase failed; resolve before committing"
  fi
}

# 2. Python tools (skipped when the environment setup script already installed them).
python3 -c 'import pymupdf, fontTools, uharfbuzz, brotli, numpy, openpyxl, PIL' 2>/dev/null \
  || pip install -q -r requirements.txt 2>&1 | tail -2 || true

# 3. Rendering: Playwright and Chromium ship with the cloud image.
node -e "require('/opt/node22/lib/node_modules/playwright')" 2>/dev/null \
  || NODE_PATH="$(npm root -g)" node -e "require('playwright')" 2>/dev/null \
  || echo "bootstrap: Playwright not found; install with: npm i -g playwright (browsers: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers)"

# 4. Report.
python3 -c 'import pymupdf, fontTools, uharfbuzz, brotli, numpy, openpyxl, PIL' 2>/dev/null && py=ok || py=MISSING
echo "bootstrap: branch=$(git rev-parse --abbrev-ref HEAD) python-tools=$py pause=$([ -f ops/PAUSE ] && echo on || echo off)"
