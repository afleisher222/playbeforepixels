#!/bin/bash
# Start-of-run bootstrap for every Claude Code cloud session and routine (ops/ROUTINE.md step 0).
# Safe to run more than once. Never prints secrets.
set -u
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo /home/user/playbeforepixels)" || exit 0

# 1. Work on the business branch. Routine pushes to claude/ branches are always accepted, so claude/live is the working branch.
# Never re-point claude/live with `checkout -B`: on the cloud image's git (2.43) -B also moves a branch that
# another worktree has checked out, silently dropping that checkout's unpushed commits (ops/TESTS/cloud-rehearsal.md).
if [ "$(git rev-parse --absolute-git-dir)" != "$(git rev-parse --path-format=absolute --git-common-dir)" ]; then
  echo "bootstrap: linked worktree; branch left as is (the main checkout owns claude/live)"
elif git fetch -q origin claude/live 2>/dev/null; then
  if [ "$(git rev-parse --abbrev-ref HEAD)" != "claude/live" ]; then
    if git show-ref -q --verify refs/heads/claude/live; then
      git checkout -q claude/live 2>/dev/null || echo "bootstrap: could not switch to claude/live (uncommitted changes, or checked out elsewhere?)"
    else
      git checkout -q -b claude/live FETCH_HEAD 2>/dev/null || echo "bootstrap: could not switch to claude/live (uncommitted changes?)"
    fi
  fi
  if [ "$(git rev-parse --abbrev-ref HEAD)" = "claude/live" ]; then
    git pull -q --rebase --autostash origin claude/live 2>/dev/null || echo "bootstrap: pull --rebase failed; resolve before committing"
  fi
fi
# A run left on main (for example because the fetch failed) must not commit or push: a plain `git push` there would update main.
[ "$(git rev-parse --abbrev-ref HEAD 2>/dev/null)" = "claude/live" ] \
  || echo "bootstrap: ERROR not on claude/live. Commit and push nothing this run (ops/ROUTINE.md step 0.1)."

# 1b. ops/PAUSE counts on main too: GitHub's web editor opens main by default, so a PAUSE the founder creates there must stop publishing.
pause_main=unknown
git fetch -q origin main 2>/dev/null && { git cat-file -e FETCH_HEAD:ops/PAUSE 2>/dev/null && pause_main=on || pause_main=off; }

# 2. Python tools (skipped when the environment setup script already installed them).
python3 -c 'import pymupdf, fontTools, uharfbuzz, brotli, numpy, openpyxl, PIL' 2>/dev/null \
  || pip install -q -r requirements.txt 2>&1 | tail -2 || true

# 2b. pdf-lib and qrcode for the product builds (node_modules/ is git-ignored). Skipped when the setup script installed them.
(cd / && node -e "require('pdf-lib'); require('qrcode')") 2>/dev/null || {
  npm install -q --prefix "$HOME/.pbp-node" --save-exact --no-audit --no-fund --no-update-notifier pdf-lib@1.17.1 qrcode@1.5.4 >/dev/null 2>&1 \
    && { { [ -e "$HOME/.node_modules" ] && [ ! -L "$HOME/.node_modules" ]; } || ln -sfn "$HOME/.pbp-node/node_modules" "$HOME/.node_modules"; }
}

# 3. Rendering: Playwright and Chromium ship with the cloud image.
node -e "require('/opt/node22/lib/node_modules/playwright')" 2>/dev/null && [ -x /opt/pw-browsers/chromium ] \
  || echo "bootstrap: Playwright/Chromium missing at the paths the build scripts use (setup-script.sh step 4 restores them)"

# 4. Report.
python3 -c 'import pymupdf, fontTools, uharfbuzz, brotli, numpy, openpyxl, PIL' 2>/dev/null && py=ok || py=MISSING
(cd / && node -e "require('pdf-lib'); require('qrcode')") 2>/dev/null && nd=ok || nd=MISSING
# pause=on if ops/PAUSE is on claude/live OR on main; if main could not be checked, treat it as on (ops/ROUTINE.md step 0.3).
{ [ -f ops/PAUSE ] || [ "$pause_main" != off ]; } && pause=on || pause=off
echo "bootstrap: branch=$(git rev-parse --abbrev-ref HEAD) python-tools=$py node-packages=$nd pause=$pause pause-on-main=$pause_main"
