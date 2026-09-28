#!/usr/bin/env bash
# Build and render the social profile kit.   bash marketing/social-kit/build/make.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
node "$ROOT/marketing/social-kit/build/build.js"
node "$ROOT/marketing/social-kit/build/render.js"
node "$ROOT/ops/TESTS/check_fonts.js" "$ROOT/marketing/social-kit/src/kit.html"
