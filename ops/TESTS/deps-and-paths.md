# Dependencies and paths audit: September 28, 2026

**Verdict: before this audit, a routine could not finish building 8 of the 12 products.**

- **What broke:** the builds need two Node packages, `pdf-lib` and `qrcode`. The cloud image doesn't include them, and `node_modules/` is git-ignored, so a fresh clone has neither. Nothing installed them.
- **Fixed in `ops/cloud/setup-script.sh`,** with one product line left for the lead: `products/visual-routine-cards/build/build.js` line 665.
- **Python:** the pinned tools cover every Python script. Two packages were missing; both are used only by archived logo concepts, and both are now pinned.
- **Rendering:** `brand/render.js` finds Playwright and Chromium in a fresh container.
- **Fonts:** every product loads its fonts from `brand/fonts/`, and nothing loads over the network. 7 of the 13 product files checked still draw a few symbols (arrows, ✂, ♡, ≈) with system fonts.

Tested on the real Claude Code cloud image (Ubuntu 24.04.4, Python 3.11.15, Node 22.22.2, Playwright 1.56.1, Chromium 141 at `/opt/pw-browsers/chromium-1194`). The fresh-clone test ran on the lead's current commit `a46bcba`. The dependency and path tables also cover scripts that other workflows added to the working tree while this audit ran, such as `bored-play-cards/build/finish.js` and `verify.py`, `business/stress_test.py` and `logo-concepts-v2/d-before-ball`. This complements `ops/TESTS/cloud-rehearsal.md`, which built the two smallest products: neither of them uses `pdf-lib` or `qrcode`, so that rehearsal could not see this gap.

## What changed (this audit)

| File | Change |
|---|---|
| `ops/cloud/setup-script.sh` | 1. Python: now 9 pinned packages. It uses `python3 -m pip`, so they install into the same Python the scripts run.<br>2. **New:** `pdf-lib@1.17.1` and `qrcode@1.5.4` go into `/opt/pbp-node`, outside the repository. `~/.node_modules` links to them. Node searches that folder for any `require()` it cannot find next to the script, so every `products/*/build` script finds them from any checkout path.<br>3. **New:** `zip`, only if it's missing.<br>4. **New safety net:** it keeps `/opt/node22/lib/node_modules/playwright` and `/opt/pw-browsers/chromium` valid if a future image moves or drops them. It does nothing on today's image.<br>5. It prints one status line and always exits 0. It never reads the repository. |
| `requirements.txt` | Added `shapely==2.1.2` and `skia-pathops==0.9.2` (archived logo concepts only). Each pin now says which scripts use it. |

**Not edited:**
- the product scripts, `brand/`, `site-concepts/`, `content/` (read-only this wave);
- `ops/cloud/bootstrap.sh` (another workflow is editing it);
- `ops/cloud/allowed-domains.txt`: another workflow already added `cdn.playwright.dev` and `playwright.download.prss.microsoft.com`. I confirmed both from Playwright 1.56.1's own source (`playwright-core/lib/server/registry`). This settles the `[VERIFY]` in `cloud-rehearsal.md` finding 4.

**Founder:** when you paste the setup script (runbook step 4), use the current `ops/cloud/setup-script.sh`. If you already pasted an older one, paste the current file over it once.

## How it was tested

- **A fresh clone,** made without touching the real checkout: `git clone --shared --no-checkout`, sparse to `brand/`, `ops/`, `products/*/build/` and product-root HTML. It has no `node_modules` anywhere, the same as a routine's clone.
- **Isolation:**
  - Every run used a clean environment: `env -i` with no `PLAYWRIGHT_BROWSERS_PATH`, no `NODE_PATH`, and the working directory `/tmp`.
  - Each ran in a private mount namespace (`unshare -m`).
  - A stray `node_modules` in the shared scratch folder was hidden with a bind mount. Without that, it made every package look installed.
- **The setup script** ran for real, as root, on overlay copies of `/opt`, `/root`, `/usr` (and `/var`, `/etc` in B and C). The real system stayed unchanged; this was checked after each run.

| Scenario | Setup | Result |
|---|---|---|
| Fresh clone, no setup script | Run each product's entry script | **All 8 Node products fail:**<br>- `Cannot find module 'qrcode'` in the `build.js` of first-phone-plan, play-first-family-kit, play-talk-cards, bored-play-cards and toddler-busy-book;<br>- `Cannot find module 'pdf-lib'` in the `fields.js`/`fixsize.js`/`fillable.js`/`render-all.js` of course-screen-reset, guide-100-plays, bored-play-cards, toddler-busy-book and play-talk-cards;<br>- `Cannot find module './node_modules/qrcode'` in visual-routine-cards.<br>Nothing in the repository tells a run to `npm install`, and the four `make-all.sh` headers that say to are never followed by a routine. |
| A. Today's image, cold caches (all 9 Python packages removed, pip and npm caches empty) | `bash ops/cloud/setup-script.sh` | exit 0 in **9.3 s**: `setup: python=ok node-packages=ok playwright=ok zip=ok`. After it, the `build.js` of first-phone-plan, play-talk-cards and toddler-busy-book ran OK from the fresh clone. Every `pdf-lib` script resolves. |
| B. Playwright package and the `chromium` link removed | same | exit 0 in **22.8 s**. npm reinstalled `playwright@1.56.1`, and the script re-linked `/opt/pw-browsers/chromium`: `playwright=ok`. |
| C. B plus the Chromium folders removed; the download host is blocked in this session | same | exit 0 in **27.9 s**: `playwright=MISSING`, so it degrades cleanly. With the two CDN hosts on the allowlist it downloads instead. The fallback timeouts cap the worst case at about 4.5 minutes, under the 5-minute cache limit. |
| Node versions | Compare what the setup script installed with `products/bored-play-cards/build/package-lock.json` | **34 of 34 packages identical** |
| Proposed `bootstrap.sh` step 2b (below) | Run twice in a fresh HOME | 3.0 s the first time, 0.26 s when already present. play-first-family-kit `build.js` then OK |

## 1. Python: every non-standard-library import

None of these ship with the cloud image. The image's `dist-packages` held nothing but `uno.pth` until this session's agents installed packages.

| Package (pin) | Imported by | Covered |
|---|---|---|
| fontTools `fonttools==4.66.0` | `brand/logo/src/build.py`; `brand/logo-concepts-v2/{a-wordmark,b-play-object,c-badge}/build.py`; `brand/logo-concepts/concept-1/build/build.py`, `concept-2/src/outline.py`, `concept-3/src/outline.py`, `concept-4/build/build.py`, `concept-5/src/{build,sketch5,sketch6}.py`; `products/merch-core/build/textpath.py` | requirements + setup |
| uharfbuzz `0.56.2` | same files except `concept-5/src/sketch5.py` and `sketch6.py` | requirements + setup |
| brotli `1.2.0` | not imported by name: fontTools needs it to read the brand `.woff2` files | requirements + setup |
| pymupdf `1.28.2` | `products/{first-phone-plan,play-first-family-kit,visual-routine-cards}/build/finish.py`, `products/picture-tablet-slept/fix-pdf-size.py`, `ops/TESTS/unchanged_renders.py` | requirements + setup |
| numpy `2.4.6`, pillow `12.3.0` | `ops/TESTS/unchanged_renders.py` | requirements + setup |
| openpyxl `3.1.5` | `business/build_financial_model.py` | requirements + setup |
| shapely `2.1.2` | `brand/logo-concepts/concept-3/src/mark.py`, `concept-4/build/build.py` | **added now** |
| skia-pathops `0.9.2` (`import pathops`) | `brand/logo-concepts/concept-5/src/build.py` | **added now** |

Every other Python file uses only the standard library or its own sibling modules (`build`, `geom`, `mark`, `outline`, `pages`, `textpath`). That covers `check_listings.py`, merch-core's `book.py`/`build.py`/`pages.py`/`set_dpi.py`, and the `python3 -` heredoc in `board-up-go-more/build/render-all.sh`. Python puts the script's own folder on `sys.path`, so those sibling imports work from any working directory.

**Installed in this session but used by no committed script:** `pypdf` 6.19.0, Python `qrcode` 8.2 and `opencv-python-headless` 5.0.0.93. Agents installed them ad hoc; they're not pinned and not needed. A reviewer agent that reaches for `cv2` or `pypdf` in a routine will find them missing, so point QA habits at `pymupdf`, `PIL` and `numpy`.

Both `pip` (`/usr/bin/pip`, shebang `/usr/bin/python3`) and `python3` (`/usr/local/bin/python3`) resolve to Python 3.11. That Python has no PEP 668 `EXTERNALLY-MANAGED` marker (only 3.12 does), so the setup script's first pip command succeeds. A cold install of all 9 packages took 7.7 s (222 MB).

**Drift check.** Run it whenever either file changes; it prints nothing when they match:

```bash
diff <(grep -oE '^[A-Za-z0-9_.-]+==[^ ]+' requirements.txt | sort) <(grep -oP '^PY="\K[^"]+' ops/cloud/setup-script.sh | tr ' ' '\n' | sort)
```

## 2. Node: every require/import outside Node's built-ins

| Package | Required by | Before | Now |
|---|---|---|---|
| `playwright` (by absolute path `/opt/node22/lib/node_modules/playwright`) | 36 files: `brand/render.js`, `brand/logo/src/raster.js`, `ops/TESTS/check_fonts.js` (with a fallback chain), 3 logo-concepts-v2 files, 22 product scripts and 9 site-concept tools | Cloud image (not in the documented tool list) | Image, and the setup script restores the path if the image drops it |
| Chromium at `/opt/pw-browsers/chromium` | 37 files. 11 of them have no `.catch(() => chromium.launch())` fallback (§5) | Image | Image + setup-script safety net |
| `pdf-lib@1.17.1` | `bored-play-cards/build/fillable.js`, `course-screen-reset/build/{fields,fixsize}.js`, `guide-100-plays/build/{fields,fixsize}.js`, `play-talk-cards/build/render-all.js`, `toddler-busy-book/build/fillable.js` | **Nothing** (git-ignored `node_modules`) | setup script (`/opt/pbp-node` + `~/.node_modules`) |
| `qrcode@1.5.4` | `bored-play-cards/build/build.js` (new in `a46bcba`), `first-phone-plan/build/build.js`, `play-first-family-kit/build/build.js`, `play-talk-cards/build/build.js`, `toddler-busy-book/build/core.js`, `visual-routine-cards/build/build.js` (via `./node_modules/qrcode`, see §5). In `course-screen-reset/build/parts.js` and `guide-100-plays/build/parts.js` it is optional: they fall back to the committed `qr.json` | **Nothing** | setup script, except visual-routine-cards, which needs the one-line fix |

Everything else these scripts require is a Node built-in, a sibling file (`./art.js`, `../story-bonus/build/art.js`, …) or committed JSON (`./manifest.json`, `./out/manifest.json`, `./pagemap-*.json`, `./stats.json`).

`toddler-busy-book/build/lib.js` loads `products/guide-100-plays/build/icons.js` through a `path.join` from its own location. A partial checkout without guide-100-plays would break toddler-busy-book.

The setup script and the lockfiles resolve the same 34 versions. `course-screen-reset` and `play-first-family-kit` have no lockfile, and `course-screen-reset/build/package.json` is named `guide-100-plays-build` (a copy-paste). Neither matters now, because the setup script pins the installs.

### System tools the shell scripts call

- `node`, `python3`: covered above.
- `zip`: `bored-play-cards/build/make-all.sh` and `toddler-busy-book/build/make-all.sh`. It is on today's image, and the setup script installs it if missing.
- Everything else is coreutils, sed or awk (`mktemp`, `sed`, `find`, `awk`, `seq`, `cp`, `ls`).
- No script calls ImageMagick, Ghostscript, qpdf or poppler.

## 3. `brand/render.js` in a fresh container

- **Playwright:** `require('/opt/node22/lib/node_modules/playwright')`, with no fallback.
- **Chromium:** `executablePath: '/opt/pw-browsers/chromium'`, falling back to `chromium.launch()`. That fallback needs `PLAYWRIGHT_BROWSERS_PATH`, which the session injects; it isn't in `/etc/environment`.
- **Tested in a clean environment** (no `PLAYWRIGHT_BROWSERS_PATH`, no `NODE_PATH`, working directory `/tmp`), from the fresh clone:
  - `pdf`, `png` and `pages` all work on `products/merch-core/hang-tag.html`: a 3-page PDF in 1.5 s, and 3 page PNGs.
  - A bare `require('playwright')` fails without `NODE_PATH`. So the absolute path is what makes it work, and the setup script now keeps that path valid.
- **Still recommended** for sessions that don't use the new setup script: the lead applies the resolution fallback given in `cloud-rehearsal.md` finding 4, and `bootstrap.sh` step 3 checks the exact paths (§6).

## 4. Fonts

- **Every product, brand, site-concept and content template** gets its fonts from `brand/fonts/fonts.css`, by a relative path. `site-concepts/B-toy-shop-bold` uses its own copy, `assets/fonts/fonts.css`.
- No file outside `brand/fonts/` declares `@font-face`, apart from that copy.
- **None of them loads a font, script, stylesheet or image over the network** (grep of `products/`, `brand/`, `site-concepts/`, `content/`).
- `fonts.css` references 20 local `.woff2` files, all present.
- `check_fonts.js` saw **0 requests outside the repository** in all 13 files below.

**Traps that need no fix today, but should be removed after the wave:**
- `brand/fonts/{bricolage,caveat,fredoka,nunito}.css` and the same four files in `site-concepts/B-toy-shop-bold/assets/fonts/` are Google's original stylesheets. They point at `https://fonts.gstatic.com`. Nothing links them now, but linking one gives network fonts: they fall back silently in a Custom-network run and break the "local fonts only" rule. Delete them; `fonts.css` is the only stylesheet to use.
- `index.html` (the old root preview, lines 2–4) loads Google Fonts over the network. It is being replaced by `site/`. Don't render it in a routine.

**Glyph fallback** (`node ops/TESTS/check_fonts.js`, clean environment, one main file per product, committed state `c17f3a8`): **7 of 13 files FAIL.**
- The brand fonts have no → ♡ ✂ ≈ ✓ ★, so these glyphs come from the image's system fonts (Liberation Sans, DejaVu).
- The PDFs are the same on every run of this image. But they are off-brand, and they would change on any machine with different fonts.
- `picture-tablet-slept` is already covered in `cloud-rehearsal.md`.

| File | What falls back | Fix (product owner) |
|---|---|---|
| `products/course-screen-reset/source.html` | "→" ×2 (Liberation Sans) | Inline SVG arrow, or words |
| `products/course-screen-reset/sales-page.html` | "Choose the bundle →" | Same |
| `products/toddler-busy-book/source.html` | "→" ×10: "Duck." → "Yellow duck!", "Seed → sprout → flower", "Dough → sauce → pizza", "red→purple" | Same |
| `products/play-talk-cards/source.html` | "♡" ×52 (DejaVu Sans) | Inline SVG heart (the art already has a symbol set) |
| `products/picture-more-talk-less-tap/source.html` | "✂" ×10, plus 1–4 glyphs in each "Cut on the dashed lines…" note | Inline SVG scissors. Re-run the check for the exact characters in the notes |
| `products/visual-routine-cards/source.html` | "≈ 1.25 in" | "about 1.25 in" |
| `products/merch-core/source.html` | every `<code>` (DejaVu Sans Mono, about 540 glyphs), plus one "→" | `code{font-family:"Nunito Sans",sans-serif}` in its CSS, if this spec book ships to anyone |

Clean: `bored-play-cards`, `first-phone-plan`, `guide-100-plays`, `merch-core/hang-tag.html`, `picture-laps-not-apps`, `play-first-family-kit`.

In passing: Chromium embeds the brand's variable fonts as **Type 3** fonts in every PDF, in both the committed files and fresh renders. Print partners' preflight rules on Type 3 fonts are **[VERIFY]** before the first POD upload.

## 5. Hard-coded absolute paths, and what the lead should change

The cloud clone happens to sit at `/home/user/playbeforepixels`. So the `/home/user/…` paths work in a routine today. They break in:
- git worktrees (workflows and subagents), where they silently write into the main checkout;
- any other checkout path;
- the founder's own machine.

`/opt/…` paths are image paths, now protected by the setup script.

| File:line | Now | Change to |
|---|---|---|
| `products/visual-routine-cards/build/build.js:665` | `require('./node_modules/qrcode')` | `require('qrcode')`. **Blocks this product in every routine until changed.** |
| `brand/BRAND.md:58` (binding rules: every new product copies this) | `<link rel="stylesheet" href="/home/user/playbeforepixels/brand/fonts/fonts.css">` | "Link `brand/fonts/fonts.css` by a relative path, e.g. `../../brand/fonts/fonts.css` from `products/<slug>/source.html`. Never an absolute or `file://` path: `ops/TESTS/check_fonts.js` fails it outside the main checkout." |
| `brand/BRAND.md:76-78`, `:80` | `node /home/user/playbeforepixels/brand/render.js …`; `/home/user/playbeforepixels/products/<slug>/` | `node brand/render.js …` (from the repository root); `products/<slug>/` |
| `business/build_financial_model.py:18` | default `OUT = "/home/user/playbeforepixels/business/PlayBeforePixels_Financial_Model.xlsx"` | `os.path.join(os.path.dirname(os.path.abspath(__file__)), "PlayBeforePixels_Financial_Model.xlsx")` |
| `brand/logo-concepts/concept-2/src/outline.py:10`, `concept-3/src/outline.py:9` | `FONT = '/home/user/playbeforepixels/brand/fonts/bricolage-a24454f0.woff2'` | `os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'fonts', 'bricolage-a24454f0.woff2')` (archive; low priority) |
| `site-concepts/B-toy-shop-bold/qa/nav-test.js:3` | `ROOT = '/home/user/playbeforepixels/site-concepts/B-toy-shop-bold/'` | `path.resolve(__dirname, '..') + '/'` |
| `brand/logo-concepts-v2/{a-wordmark,b-play-object}/render.js:6` | tries `/home/user/playbeforepixels/node_modules/playwright` first | Drop the first try; keep `/opt/node22/…` |
| 11 scripts launch Chromium with **no fallback**:<br>`products/first-phone-plan/build/{check,fields}.js`<br>`products/play-first-family-kit/build/{check,export-png,fields}.js`<br>`products/visual-routine-cards/build/{check,export-png,fields,snap}.js`<br>`site-concepts/B-toy-shop-bold/qa/nav-test.js`<br>`brand/logo-concepts-v2/c-badge/tests/raster.js` | `chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })` | Add `.catch(() => chromium.launch())`, as the other 26 have. Low priority now that the setup script keeps the path valid |

**Committed generated files that contain absolute paths.** Each is rebuilt from `__file__`/`__dirname` on every build, so no code change is needed:
- `brand/logo/src/jobs.json` and `products/merch-core/build/raster-jobs.json`: always run `build.py` before `raster.js`, as both build scripts do. Feeding the committed JSON straight to `raster.js` from a worktree would write into the main checkout.
- `products/visual-routine-cards/build/tmp/export.html`: scratch.
- `site-concepts/A-picture-book-editorial/mockups-src/contact.html`: a scratch mockup.

**Harmless:**
- `ops/cloud/bootstrap.sh:5`: the fallback `cd`, used only outside any git repository;
- `ops/TESTS/check_listings.py:16-17`: `/tmp/qa.json` appears only in usage text;
- Markdown notes that cite `/home/user/…` as a source (`business/REVENUE-PLAN.md`, `legal/DECISION-MEMO.json`).

## 6. Scripts that assume a working directory

Every shell entry point `cd`s to its own folder first, so they run from anywhere:
- `render-all.sh`, the `make-all.sh` and `make-pdfs.sh` files, `make.sh`, `render.sh`, `shots.sh`.

**Run them with `bash`:**
- Four of them are committed without the execute bit (mode 100644) and must be run as `bash <file>` or `sh <file>`, as their headers already say: bored-play-cards and toddler-busy-book `make-all.sh`, course-screen-reset and guide-100-plays `make.sh`.
- `play-first-family-kit/build/make-all.sh` and `visual-routine-cards/build/make-all.sh` use bash arrays, so never run them with `sh`.

**Command-line tools take their paths from the caller's working directory, by design, and every make script `cd`s first:**
- `brand/render.js`; `render-pdf.js`, `fields.js`, `fixsize.js`, `check.js`, `fillable.js`, `snap.js`, `export-png.js`; `finish.py`; `fix-pdf-size.py`, `render-order.js`, `sheet.js`;
- the site-concept tools `segs.js` and `resize.js`.

**Scripts that write to the working directory itself (dev helpers, none called by a make script):**

| File:line | Writes | Change to |
|---|---|---|
| `products/guide-100-plays/build/artsheet.js:4` | `artsheet.html` in the working directory | `path.join(__dirname, 'artsheet.html')` |
| `products/play-talk-cards/build/cardtest.js:7`, `icontest.js:4` | `gen/*.html` in the working directory (cardtest's `../../../../brand/…` link only works if `gen/` is inside `build/`) | `path.join(__dirname, 'gen', …)` after `fs.mkdirSync(path.join(__dirname, 'gen'), {recursive: true})` |
| `brand/logo-concepts/concept-3/src/sketch.py:37`, `sketch2.py:15`, `sketch3.py:17`; `concept-5/src/sketch3.py:46`, `sketch4.py:35`, `sketch5.py:42`, `sketch6.py:43` | `sketchN.html` in the working directory | `os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sketchN.html')` (archive; lowest priority) |

## 7. Proposed `ops/cloud/bootstrap.sh` lines (lead to merge with the in-progress edit)

Why: a session in an environment without the new setup script (for example **Default**, or before the founder re-pastes it) still gets the Node packages. Tested: 3.0 s the first time, 0.26 s after.

Insert after step 2:

```bash
# 2b. pdf-lib and qrcode for the product builds (node_modules/ is git-ignored). Skipped when the setup script installed them.
(cd / && node -e "require('pdf-lib'); require('qrcode')") 2>/dev/null || {
  npm install -q --prefix "$HOME/.pbp-node" --save-exact --no-audit --no-fund --no-update-notifier pdf-lib@1.17.1 qrcode@1.5.4 >/dev/null 2>&1 \
    && { { [ -e "$HOME/.node_modules" ] && [ ! -L "$HOME/.node_modules" ]; } || ln -sfn "$HOME/.pbp-node/node_modules" "$HOME/.node_modules"; }
}
```

Replace step 3's check with the exact paths the scripts use. Today's fallback to `npm root -g` can pass while every render fails:

```bash
node -e "require('/opt/node22/lib/node_modules/playwright')" 2>/dev/null && [ -x /opt/pw-browsers/chromium ] \
  || echo "bootstrap: Playwright/Chromium missing at the paths the build scripts use (setup-script.sh step 4 restores them)"
```

In step 4, add `(cd / && node -e "require('pdf-lib'); require('qrcode')") 2>/dev/null && nd=ok || nd=MISSING`, and `node-packages=$nd` to the echo line.

## 8. Clone size (affects every routine's start)

- **About 105 MB of tracked files are ones `.gitignore` says to ignore:** `git ls-files -ci --exclude-standard`. 547 of them are in `products/visual-routine-cards/build/tmp/`, with files up to 13.5 MB each.
- After the build wave: `git rm -r --cached products/visual-routine-cards/build/tmp`, and remove the 9 tracked `__pycache__`/`.pyc` files (`cloud-rehearsal.md` finding 6).
- This shrinks every future checkout. The history still holds them until the founder-approved slim-down in `ops/CLOUD-RUNBOOK.md`.

## Re-run

1. `git clone --shared --no-checkout` into a scratch folder, sparse to `brand ops products/*/build`.
2. Run each product's entry script with `env -i HOME=<empty dir> PATH=/opt/node22/bin:/usr/bin:/bin` from `/tmp`. Before the fix, expect `Cannot find module 'qrcode'` / `'pdf-lib'`; after `setup-script.sh` or bootstrap step 2b, expect no module errors.
3. Check that no ancestor folder of the scratch clone has a `node_modules`, or the test passes falsely.
4. `node ops/TESTS/check_fonts.js <files>`, then the §1 drift check.
