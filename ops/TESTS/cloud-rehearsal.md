# Cloud rehearsal: September 28, 2026

**Verdict: the cloud plan works. One bug in `ops/cloud/bootstrap.sh` must be fixed before any session uses git worktrees. One product has an off-brand glyph.**

- The two smallest products built completely from a fresh sparse checkout on the real Claude Code cloud image. They used only the committed fonts and the image's Playwright and Chromium, and every output matched the committed files.
- Nothing reached back into `/home/user/playbeforepixels`.
- The listing tests ran unchanged.
- The bootstrap bug, if left in place, can silently undo unpushed work on `claude/live`.
- The off-brand glyph comes from a font fallback in `picture-tablet-slept`.

## What it ran on

- **The machine was a Claude Code cloud VM** (`CLAUDE_CODE_REMOTE=true`). So this is the image routines get, not a lookalike:
  - Ubuntu 24.04.4, git 2.43.0, Python 3.11.15, Node 22.22.2;
  - Playwright 1.56.1 (`/opt/node22/lib/node_modules/playwright`), Chromium 141 (`/opt/pw-browsers/chromium-1194`);
  - 4 vCPUs, 15 GB RAM.
- **Checkout:** a sparse worktree of `claude/live` at `4659190`, detached, because `claude/live` is checked out in the main checkout.
  - Contents: `brand ops business commerce`, the root files, `products/picture-tablet-slept` (5.6 MB) and `products/board-up-go-more` (8.8 MB). These are the two smallest products that have a build script.
  - Size: 436 files, 22 MB. Checkout took 0.15 s.

## What ran

| Step | Command (run inside the worktree) | Result |
|---|---|---|
| 1 | `git worktree add --no-checkout --detach …` + `git sparse-checkout set …` + `git checkout` | OK. Without `--detach`, git refuses because `claude/live` is in use. |
| 2a | `bash ops/cloud/bootstrap.sh` (committed version) | exit 0, 1.8 s: `bootstrap: branch=HEAD python-tools=ok pause=on` |
| 2b | same, with the in-progress working-copy version (36 lines, adds the PAUSE-on-main check) | exit 0, 5.0 s: `ERROR not on claude/live …` then `branch=HEAD python-tools=ok pause=on pause-on-main=on` |
| 3a | `picture-tablet-slept`: the 11 commands in `listing.json` → `files.build_notes` | exit 0, about 47 s under strace. 32-page interior 8.625 × 8.75 in, KDP cover 17.3251 × 8.75, IngramSpark cover 19.13 × 10.0, 32 preview PNGs, cover, mockup, back and 2 cover previews |
| 3b | `board-up-go-more`: `bash products/board-up-go-more/build/render-all.sh` | exit 0, about 40 s under strace. 26-page board book 6.25 × 6.25 in, 32-page paperback interior 8.625 × 8.75, cover 17.3251 × 8.75, 26 + 32 previews, cover.png, mockup.png |
| 4a | `python3 ops/TESTS/check_listings.py` (committed version and in-progress version) | exit 1 in 124 ms, 3 FAIL + 0 WARN (board), 3 FAIL + 1 WARN (tablet): content gaps, see below |
| 4b | `business/stress_test.py` | **Does not exist.** `business/` has only `build_financial_model.py`, so there was nothing to run |
| 5 | `git worktree remove --force` + `git worktree prune` | OK. `.git/worktrees` is gone and 22 MB freed. No branch or ref was created, and the lead's `claude/live` was never touched: its reflog shows only the lead's own commits |

About step 2: bootstrap ran through a logging `git` shim. It let every line run except one. `git checkout -q -B claude/live FETCH_HEAD` was replaced with `git checkout -q --detach FETCH_HEAD`, because of finding 1: unguarded, that line would have moved the lead's branch. Python tools were already installed, so pip was skipped. Playwright was found.

Also measured:
- **Setup-script install time:** a from-scratch install of the pinned Python tools into an empty venv took **6 s** (well inside the setup script's roughly 5-minute cache limit).
- **Clone size:**
  - the current checkout is 916 MB (3,760 files);
  - the pack is 930 MB (132 commits);
  - this fits the documented 30 GB cloud disk.

### How "nothing escaped" was checked

- **`strace -f -e trace=openat,execve`** covered both builds, including every Chromium child process. It found **0** file opens under `/home/user/playbeforepixels`. Every font and logo was read from the worktree's own `brand/fonts/` and `brand/logo/`.
- **A Chromium DevTools probe** (now `ops/TESTS/check_fonts.js`) loaded all 14 HTML files of both products. It found:
  - no request outside the worktree;
  - no failed request;
  - no `@font-face` that failed to load.
- **grep:** neither product's scripts or HTML contain an absolute path. All paths are relative (`../../brand/…`). The only absolute paths in the chain are:
  - the cloud image's own paths in `brand/render.js`: `/opt/node22/lib/node_modules/playwright` and `/opt/pw-browsers/chromium`;
  - the fallback `cd /home/user/playbeforepixels` in `bootstrap.sh`. It is used only when the script runs outside any git repository, and in the cloud that path is the clone itself.
- **Pixel check:** every rebuilt output was compared with the committed file.
  - `picture-tablet-slept`: every HTML and PNG is byte-identical. The 3 PDFs render pixel-identical; the files differ only in `CreationDate`, `ModDate` and `/ID`.
  - `board-up-go-more`: the 3 PDFs render pixel-identical. The PNGs were byte-identical in 3 normal rebuilds. Under CPU slowdown (strace), 4–8 paperback preview PNGs differed by 2–12 pixels out of 665,856, by at most 10 levels. That is anti-aliasing noise, invisible to the eye.

## What broke, and the exact fixes

### 1. `bootstrap.sh` can silently drop unpushed commits (fix before routines and worktree sessions overlap)

**Where:** step 1, line 10:

```bash
git checkout -q -B claude/live FETCH_HEAD
```

**What goes wrong:**
- On the cloud image's git (2.43), `checkout -B` resets `claude/live` to origin's tip even when another worktree has that branch checked out. Git 2.44 refuses this; 2.43 does not.
- It also resets it when a local `claude/live` holds commits that were never pushed.

**Proven** in a throwaway repository, current version against the fix below:

| Scenario | Current `bootstrap.sh` | Fixed |
|---|---|---|
| A. Run from a linked worktree while the main checkout's `claude/live` has an unpushed commit | **Lead's branch rewound to origin.** The unpushed commit is orphaned and the lead's checkout shows a phantom change. | Branch left alone; says `linked worktree; branch left as is` |
| B. Fresh clone on `main` (what a routine gets) | on `claude/live` at origin | on `claude/live` at origin |
| C. Local `claude/live` behind origin, session on `main` | on `claude/live` at origin | on `claude/live` at origin |
| D. Local `claude/live` has an unpushed commit, origin moved on, session on `main` (for example after mirroring to `main`) | **Unpushed commit dropped** from `claude/live` | Unpushed commit kept, rebased on top of origin |

This was not hypothetical during the rehearsal. At 02:16:40 the lead committed `c2c0d5c` to `claude/live` without pushing, while origin was still at `4659190`. An unguarded bootstrap in the worktree at that moment would have rewound the lead's branch. The only thing that prevented it was the rehearsal shim.

**Who is affected:**
- A scheduled routine's fresh clone (scenario B) is safe.
- Sessions that use worktrees (workflows, subagents) are exposed.
- So are interactive sessions that switch to `main` to mirror and then run bootstrap again, as `CLAUDE.md` asks every session to do.

**Exact fix:** in `ops/cloud/bootstrap.sh`, replace the step-1 block from `git fetch -q origin claude/live 2>/dev/null && {` through its closing `}` with the block below. Leave the "not on claude/live" check after it as it is. This was tested against the current 36-line working copy in all four scenarios above.

```bash
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
```

This fix is **not applied**. Another workflow was editing `ops/cloud/bootstrap.sh` during the rehearsal, so the lead should merge it into that edit.

### 2. Font fallback in `picture-tablet-slept` (off-brand glyphs, in the committed files too)

Three arrow glyphs are drawn by the system's **Liberation Sans**, not a brand font:
- **"↑ this way up ↑"**, interior page 14. It is set in Caveat, which has no ↑.
- **"→"** in the grown-up tip ("Splash!" → "Big splash!"), interior page 29. It is set in Nunito Sans, which has no →.

The PDFs on the cloud image come out identical, because Liberation Sans ships there. But the glyph is off-brand, and it would change on any machine with different system fonts. `board-up-go-more` has no fallback.

I checked every brand font file for these glyphs:
- **↑ (U+2191):** only Bricolage Grotesque's latin file has it.
- **→ (U+2192):** no brand font has it.

**Exact fix** (for the product owner; `products/` was read-only for this rehearsal):
- `products/picture-tablet-slept/build.js` line 359:
  `s += caveat(330, 600, '<tspan font-family="Bricolage Grotesque">↑</tspan> this way up <tspan font-family="Bricolage Grotesque">↑</tspan>', 34, C.s3);`
- Same file, line 619: change `(“Splash!” → “Big splash!”)` to `(“Splash!” becomes “Big splash!”)`.
- Rebuild with the `build_notes` commands, then run `node ops/TESTS/check_fonts.js picture-tablet-slept`. It must report 0 problems. Today it reports these two lines on `source.html` and `spreads.html`.

### 3. Every rebuild re-commits PDFs and some PNGs that did not change

**Why it happens:**
- Chromium writes a new `CreationDate`, `ModDate` and `/ID` into every PDF. So a rebuild that changes nothing still shows every PDF as modified, about 0.2–1.7 MB each for these two products.
- On a busy machine, a few preview PNGs also pick up anti-aliasing noise.

A routine that commits "whatever the build changed" grows every future clone for nothing. The repository is already 930 MB.

**Fix (added):** `ops/TESTS/unchanged_renders.py`. Run `python3 ops/TESTS/unchanged_renders.py --restore` before `git add`.
- It puts back every tracked `.pdf` and `.png` whose pixels match the committed version. The only difference it tolerates is anti-aliasing noise: at most 16 levels, on at most 0.1% of pixels. A real edit, even a single period, changes ink pixels by about 200 levels.
- It never touches new files or real changes.

**Tested:**
- It restored all 11 unchanged renders and kept a real one-dot edit.
- An earlier draft wrongly passed a real change: `getbbox()` on an RGBA difference only looks at alpha. That was caught and fixed before this report.

### 4. Warning: Playwright and Chromium are not a documented part of the cloud image

The code.claude.com "Cloud environments" page lists Node 20/21/22 and `chromedriver` among the installed tools, but not Playwright or Chromium. They are on today's image at `/opt/node22/…` and `/opt/pw-browsers/…`.

**The failure mode:**
- `brand/render.js` line 4 requires `'/opt/node22/lib/node_modules/playwright'` with no fallback.
- `bootstrap.sh` step 3 does fall back to `npm root -g`.
- So if the image ever moves Playwright, bootstrap can report success while every render fails.

**Exact fix for `brand/render.js`** (not applied, because active builds use this file). Replace line 4 with:

```js
const { chromium } = (() => { for (const m of ['/opt/node22/lib/node_modules/playwright', 'playwright', require('path').join(require('child_process').execSync('npm root -g').toString().trim(), 'playwright')]) { try { return require(m); } catch (e) {} } throw new Error('Playwright not found: run bash ops/cloud/bootstrap.sh'); })();
```

**Optional safety net at the end of `ops/cloud/setup-script.sh`:**

```bash
node -e "require('/opt/node22/lib/node_modules/playwright')" 2>/dev/null || { npm i -g playwright@1.56.1 && npx -y playwright@1.56.1 install --with-deps chromium; } || true
```

The browser download needs Playwright's download host in the allowed domains. [VERIFY] the current hostname on playwright.dev before adding it.

### 5. Listing tests: no environment problems, real content gaps

`check_listings.py` runs unchanged from any checkout, because it finds the repository from its own location. The exit code 1 comes from content, and it correctly blocks publishing. Both products fail the same three checks:

- `ai_disclosure` is blank for every channel (gate 17);
- there is no `price_floor` or `net_per_unit_by_channel` (gate 18);
- the first 160 characters of `long_description` do not state the age and format. For the tablet book, they don't say what the product is either.

The tablet book also has 1 WARN: a bundle `compare_at` price.

These belong to the product owner (`products/` is read-only here).

**Caution:** in a sparse or partial checkout, the script silently tests only the products present. Never treat a green result from a partial checkout as a publishing gate. Routine clones are full, so routines are not affected.

### 6. Small housekeeping

These `__pycache__` files are tracked in git:
- `ops/TESTS/__pycache__/check_listings.cpython-311.pyc` (the working copy already deletes it);
- `products/merch-core/build/__pycache__/*.pyc`.

Add `__pycache__/` and `*.pyc` to `.gitignore`.

## Documentation re-checked today (code.claude.com)

- **Routines:** "Each repository is cloned at the start of a run, starting from the default branch." "Claude pushes its work to branches prefixed with `claude/`, which are always accepted." "Without usage credits, additional runs are rejected until the window resets." These match `ops/CLOUD-RUNBOOK.md`.
- **Cloud environments:**
  - "a setup script is cached only when it finishes in roughly five minutes";
  - the cache is rebuilt "when you change the environment's setup script or allowed network hosts, and when the cache reaches its expiry after roughly seven days";
  - resources are "4 vCPUs, 16 GB of RAM, 30 GB of disk".

## Proposed lines for `ops/ROUTINE.md` (the lead applies them; the file was being edited)

- **§1, after the `check_listings.py` line:**
  "After building or re-rendering a product, run `node ops/TESTS/check_fonts.js <slug>`. A FAIL (a fallback font, or a request outside the repository) blocks publishing that product until it is fixed."
- **§6, before "Commit in small logical commits":**
  "Run `python3 ops/TESTS/unchanged_renders.py --restore` first, so re-renders that changed no pixels are not committed."

## Re-running this rehearsal (for example each quarter, with the runbook re-check)

1. Create a detached sparse worktree of `claude/live`, with two small products.
2. Run `bootstrap.sh` from the main checkout, never from a worktree, until fix 1 lands.
3. Build each product.
4. Run `python3 ops/TESTS/unchanged_renders.py products`. Expect "0 real change(s)" on an unchanged product.
5. Run `node ops/TESTS/check_fonts.js <slugs>`, then `python3 ops/TESTS/check_listings.py`.
6. Remove the worktree with `git worktree remove --force`.
