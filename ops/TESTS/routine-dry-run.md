# Routine dry run: September 28, 2026

_Done at 02:20 UTC on September 28, 2026 (10:20 p.m. ET on September 27). The dry run read the three routine prompts as they are stored in the Routines list, then followed CLAUDE.md and ops/ROUTINE.md step by step as the unattended run would. Nothing was built, published or pushed. Platform facts were checked against code.claude.com on the same day (the pages "Routines", "Configure cloud environments" and "Use Claude Code in the cloud")._

## Bottom line

- **The daily studio is switched on and fires at 2:47 a.m. ET on September 28 (06:47 UTC), about 4½ hours after this check.**
  - It will run in build-only mode (`ops/PAUSE` exists) and push to `claude/live`.
  - It cannot publish anything: PAUSE is on, no platform keys exist, and every listing currently fails at least 3 checks in `ops/TESTS/check_listings.py`.
- **Four problems will bite tonight or as soon as the other routines are switched on:**
  1. **The repository is still public.** GitHub's API showed `"visibility": "public"` and `"default_branch": "main"` at 02:20 UTC. Tonight's run pushes new work to a public repository.
  2. **Tonight's studio will probably pick a product that another session is editing right now.** The stored prompt says "the top of ops/QUEUE.md". That is LAUNCH FIRST #1, Visual Routine Cards, and `products/` has many uncommitted changes from running workflows.
  3. **Research cannot reach any research site.** Only the Default environment (Trusted network) exists. From a Trusted-network session, code.claude.com answered, but Etsy, PubMed, the IRS, Crossref, shopify.dev and every developer-docs host returned no response (blocked).
  4. **Once weekly research is switched on, the lock will skip it most Sundays.** The studio starts at 2:47 a.m. and research at 3:52 a.m. A studio run longer than 65 minutes still holds `ops/LOCK`, so research stops.
- This dry run fixed what was safe to fix in files: 4 missing ops files, a bootstrap guard, and ROUTINE.md clarifications. Details are below.
- The routine prompts, the schedule and the account settings still need the lead or the founder.

## What the routines are actually set to (read from the Routines list at 02:20 UTC)

| Routine | Schedule | On? | Connectors | Repository in the routine | Report it ends with |
|---|---|---|---|---|---|
| Daily studio | `CRON_TZ=America/New_York 47 2 * * *` | **On** | none | none (the prompt attaches it with `add_repo`) | Mondays: weekly money format. Other days: "Today's new product: <name>" plus approvals |
| Daily check | `CRON_TZ=America/New_York 38 6 * * *` | Off | none | none (`add_repo`) | Daily money line |
| Weekly research | `CRON_TZ=America/New_York 52 3 * * 0` | Off | none | none (`add_repo`) | First Sunday: monthly money format. Other Sundays: approvals only |

- **Environments on the account:** only **Default** (Trusted network, no setup script, no API credentials). The "Play Before Pixels" environment in ops/CLOUD-RUNBOOK.md setup step 4 has not been created.
- **Schedules** match ops/ROUTINE.md, ops/CLOUD-RUNBOOK.md, ops/MONITORING.md and ops/LAUNCH-NOW.md. The ET time zone handles daylight saving.
- **Connectors:** all three routines have none. Good.

## Platform facts that matter (code.claude.com, September 28, 2026)

- **Branches.** "Claude pushes its work to branches prefixed with `claude/`, which are always accepted." A push to another branch is checked and rejected only if "the branch is protected", "someone else has an open pull request from that branch", or "the branch carries commits authored by someone other than you".
  - So an unprotected `main` can accept a routine's push.
  - CLAUDE.md, ops/CLOUD-RUNBOOK.md line 38 and the old ops/ROUTINE.md wording all say routines "may push only to `claude/` branches". That is not what the platform enforces. **The rule is what keeps runs off `main`, not the platform.**
- **GitHub proxy.** "`git push` works only against the session's current working branch."
  - This session pushed both `claude/live` and `main` (both were at the same commit at 02:20 UTC).
  - Whether a scheduled run can push to `claude/live` after bootstrap switches to it is only proven by a real run. This is now item 1 in ops/RESEARCH-BACKLOG.md.
- **Clone.** "Each repository you add is cloned on every run. Claude starts from the repository's default branch." The default branch is `main`, so every run starts on `main` until bootstrap switches it.
- **No permission prompts.** Routines "run autonomously … there is no permission-mode picker."
- **Approval.** A fired prompt "can't act as approval or consent." This matches ops/ROUTINE.md §5.
- **Green status.** "A green status … does not mean the task in your prompt succeeded."
- **GitHub connection.** If it lapses, runs are skipped for up to 72 hours, then the routine turns off.
- **Network.** In the Default environment, hosts outside the allowlist fail with `403 host_not_allowed`. API-credential hosts pass automatically.
- **API credentials.** "The key never reaches Claude, the commands it runs, or the session's environment variables." The proxy adds the key as a header to requests for the listed hosts.
- **Setup script.** Cached only when it finishes in about 5 minutes. It re-runs when the script or the allowed hosts change, and about every 7 days.
- **VM size.** 4 vCPUs, 16 GB RAM, 30 GB disk.
- **Command timeout.** Bash waits 2 minutes by default, up to 10 minutes on request.
- **Tools in this cloud image.** Playwright is at `/opt/node22/lib/node_modules/playwright` and Chromium is in `/opt/pw-browsers`, which `brand/render.js` expects. The Python tools import cleanly.
- **Repository size.** The pack is 930 MB. Every run clones the whole history.

## Walk-through: tonight's daily studio

| Step | What the run would do | What it would hit | Status |
|---|---|---|---|
| Prompt 1 | `add_repo` with push access, clone, register | Works while the repo is public. After it is made private, it works only if the Claude GitHub App is installed on it. Otherwise the run cannot start its work and leaves no heartbeat | **The founder**: confirm the app is installed *before* switching to private |
| 0.1 bootstrap | Clone lands on `main`. Bootstrap fetches and switches to `claude/live` | If the fetch failed, the old script stayed on `main` silently, and a plain `git push` would then update `main` | **Fixed**: bootstrap now prints `ERROR not on claude/live`, and ROUTINE.md step 0.1 says to commit and push nothing in that case. Tested in a scratch repo (4 cases) |
| 0.1 budget | Studio at most 6 agents | The prompt asks for a research lane, maker, reviewer, customer panel, article, social queue and gate: 7 or more if each is its own agent. Whether a workflow tool exists inside a routine is not confirmed | **Fixed** in ROUTINE.md: the panel counts as one agent, lanes are combined to stay under the cap, and subagents or sequential work are the fallback |
| 0.2 read | CLAUDE.md, BRAND.md, ENTITY.md, AUTOFIX.md, COMPLIANCE-GATE.md, QUEUE.md, RUNLOG.md | All exist. RUNLOG.md has no entries yet | OK |
| 0.3 PAUSE | Sees `ops/PAUSE` → build-only. Carries out the ops/FULL-STOP.md steps | FULL-STOP.md was missing. A PAUSE created on `main` (where the web editor opens) was invisible to runs on `claude/live` | **Fixed**: FULL-STOP.md created ("no APIs connected yet"). Bootstrap and ROUTINE.md now count PAUSE on either branch |
| 0.4 connectors | Checks for personal-account access | None attached. The prompt's own `add_repo` tool could be misread as a connector, which would block publishing forever | **Fixed**: clarified in ROUTINE.md |
| 0.5 lock | Commits `ops/LOCK` "(date and run ID)" | With a date only, "6 hours old" cannot be measured. No race handling. Not removed on the limit path | **Fixed**: ISO UTC time, stop if the push is refused, remove LOCK on every exit |
| 0.6 branch | Future: `claude/run-YYYY-MM-DD` plus a pull request | Does not say which branch the pull request merges into (`claude/live` or `main`) | **Lead** decides when the CI check is built |
| 0.7 credentials | Shopify 24-hour token, token broker | No keys and no broker exist. Also, a Shopify client-secret exchange cannot work through API credentials, which only add headers and never show Claude the key | **Fixed** (skip and record `not connected`). Shopify design is backlog item 2 |
| 0.8 maintenance | Counted from when the approval channel goes live | Not live yet | N/A |
| §1 backlog | Top 2 items of `ops/RESEARCH-BACKLOG.md` | **The file did not exist**, and the research sites are blocked on the Default network | **Fixed**: backlog seeded with 13 items. ROUTINE.md says to record "blocked: <host>" and leave the item open. Network is **the founder's** step |
| §1 tests | `python3 ops/TESTS/check_listings.py` | Runs (read-only). 16 listings, every one with 3 to 8 FAILs; AI disclosure and floor/net fail on all 16 | OK: nothing would pass to publishing anyway |
| §2 build | "Top of ops/QUEUE.md" (prompt) vs "top item in Next to build" (ROUTINE.md) | The prompt points at LAUNCH FIRST #1, which other workflows are editing now. ROUTINE.md's "Next to build" #0 is a founder decision | **Partly fixed**: ROUTINE.md now skips founder decisions, HELD items and items waiting on another product. **Lead**: align the prompt |
| §3 article | "Only if fewer than 2 new articles were *published* this week" (prompt) | While PAUSE is on, 0 are ever published, so the studio would write a new article every night: 7 a week, all released together later, which is what Google's scaled-content rule penalizes | **Fixed** in ROUTINE.md: count articles *added* to seo/articles/ in 7 days. **Lead**: align the prompt |
| §3 social | Draft posts into `content/queue/` | Folder does not exist (the run creates it). No file-name or date format says what is "scheduled for today" | **Lead**: define a format before the daily check is switched on |
| §3b | Prompt and MONITORING.md: Mondays. ROUTINE.md: every run | Conflict | **Fixed**: ROUTINE.md now says Mondays |
| §4 gate | COMPLIANCE-GATE.md | Two items are numbered "16" (channel edition, and pricing at the end) | **Lead**: renumber the last one to 23 |
| §5 publish | Skipped (PAUSE) | `ops/PUBLISHED.json` was missing | **Fixed**: empty ledger created |
| §5 monthly close | ROUTINE.md: "first weekly run". Prompt and MONITORING.md: studio's first run of the month | Conflict | **Fixed**: ROUTINE.md now says the studio |
| §6 commit | Push to `claude/live` | No pull-before-push in ROUTINE.md (the prompt and runbook had it). `ops/runs/YYYY-MM-DD.md` collides when two routines run on the same day | **Fixed**: pull and rebase, no force-push, `ops/runs/YYYY-MM-DD-<routine>.md` |
| §6 heartbeat | Write `ops/HEARTBEAT.json` | **Missing**, with no format | **Fixed**: template created |
| §6 report | Prompt: "Today's new product: <name>" | The founder's instruction in ROUTINE.md: money only, "nothing else"; what was built goes only in RUNLOG | **Lead**: change the stored prompt (text below) |

## Walk-through: daily check (off; must be fixed before it is switched on)

| Step | Finding |
|---|---|
| Prompt 2(b) "carry out items marked APPROVED, archive items marked NO" | Leaves out ROUTINE.md §5: only verified approvals count, never a line written during a routine run, and the APPROVED/NO column is never edited. The founder's web-editor edits land on `main` while the default branch is `main`, and runs read `claude/live`, so her approvals would not be seen at all. |
| Prompt 2(c) "publish anything scheduled for today in content/queue/" | The folder and its date format do not exist yet. |
| Prompt order | The PAUSE check is step 3, *after* the publishing step 2(c). ROUTINE.md step 0.3 (read in step 1) covers it, but the prompt should check PAUSE first. |
| Prompt 2(a) "fix per AUTOFIX (including rollback) and redeploy" | Under PAUSE a redeploy is publishing. **Fixed** in ROUTINE.md: PAUSE covers AUTOFIX; only the FULL-STOP stop steps are allowed. |
| Lock | The studio starts at 2:47 a.m. If it runs past 6:38 a.m., the check finds the lock and skips. The founder's report is then still sent (fixed), but there is no health check that day. |
| Who reads the heartbeat | Only the daily check does, and it is off. Until it is on, or the outside watchdog (G2-01) exists, a studio that silently stops (for example after a lapsed GitHub connection) reaches no one. |

## Walk-through: weekly research (off; must be fixed before it is switched on)

| Step | Finding |
|---|---|
| Size | The prompt asks for 8 lanes, each with its own verifier, 3 creative agents, a judge panel and a synthesis agent: about 20 agents. The cap in ROUTINE.md is 10. **Fixed** in ROUTINE.md (combine to fit). **Lead**: say so in the prompt too. |
| Backlog | The prompt does not mention ops/RESEARCH-BACKLOG.md; ROUTINE.md §1 and the runbook do (top 10). The file now exists. |
| Sunday lock | Research at 3:52 a.m. is skipped whenever the 2:47 a.m. studio is still running. **Lead or the founder** must pick a schedule (options below). |
| "Stop if the cap or usage limit is near" | A run cannot see its remaining allowance. **Fixed**: ROUTINE.md maps this to "stop when a tool call reports a limit". |
| Business plan | business/BUSINESS-PLAN.md exists (2,558 lines). DEMAND-CHECK.md and CAMPAIGN-BIBLE.md exist. |
| Publishes nothing | Consistent with ROUTINE.md: the research run skips §5. |

## Missing files

| File | Referenced by | Effect | Now |
|---|---|---|---|
| ops/HEARTBEAT.json | ROUTINE.md 0.1, 0.4, 0.7, §5, §6; runbook | No format; first write would invent one | **Created** (template) |
| ops/FULL-STOP.md | ROUTINE.md 0.3; PAUSE; G2-04 | Step 0.3 pointed at nothing | **Created** ("no APIs connected yet") |
| ops/RESEARCH-BACKLOG.md | ROUTINE.md §1; runbook lines 22 and 72 | The first research step of every run failed | **Created** (13 ranked items) |
| ops/PUBLISHED.json | ROUTINE.md §5 (G2-08) | Needed before the first publish | **Created** (empty ledger) |
| ops/LOCK | ROUTINE.md 0.5 | Created and removed by each run | Correct to be absent |
| ops/runs/ | ROUTINE.md §6 | Created by the first run | Fine |
| content/queue/ | ROUTINE.md §3; daily-check prompt | Created by the studio. No date format | **Lead** (content/ is out of scope for this check) |
| ops/moderation-words.md | ROUTINE.md §5 (G2-21) | Needed before the first social post | Open (task #20) |
| business/BUSINESS-PLAN.md | Weekly prompt | Exists | OK |

## Ways a run could push to `main` instead of `claude/live`

1. **Bootstrap fails to fetch `claude/live`:** the run stays on the cloned `main`, and a plain `git push` updates `main`, which is unprotected. **Fixed** (bootstrap error line plus ROUTINE.md step 0.1).
2. **Wrong belief that the platform blocks it.** CLAUDE.md and the runbook say routines can only push to `claude/` branches, so nothing else was guarding `main`. **Fixed** in ROUTINE.md. **Lead**: correct the same sentence in CLAUDE.md ("Commits") and ops/CLOUD-RUNBOOK.md line 38.
3. **"Interactive sessions also push to `main`" (CLAUDE.md).** A run opened later and continued by hand becomes interactive. That is intended, but scheduled work itself never mirrors. ROUTINE.md step 0.1 and §6 now say "never `main`" explicitly.
4. **ROUTINE.md step 0.6 (future pull-request flow)** does not name the base branch. **Lead**.
5. **Optional hard stop:** protect `main` on GitHub. This also blocks the interactive mirror pushes unless they go through pull requests, so it is a trade-off for the lead and the founder.

## Ways a run could publish while `ops/PAUSE` exists

1. **PAUSE created on `main`**, where GitHub's web editor opens by default, was invisible to runs. **Fixed** (bootstrap reports `pause-on-main`; ROUTINE.md 0.3 counts either branch, and "unknown" counts as on). **The founder**: switching the default branch to `claude/live` removes the problem at its root.
2. **PAUSE created while a run is working:** the run read it only at the start. **Fixed** (re-check before any publish step).
3. **AUTOFIX treated as exempt** (re-list, re-publish, redeploy, retry failed posts). **Fixed** (PAUSE covers AUTOFIX; only the FULL-STOP stop steps are allowed).
4. **Daily-check prompt order** (publishing step before the PAUSE step). **Lead**: move the PAUSE line to the top.
5. **Things PAUSE cannot reach** (scheduler queues, email automations, ads): ops/FULL-STOP.md now lists the stop step per platform. Nothing is connected yet.
6. **A run deciding on its own that "the founder has said go"** and deleting PAUSE. **Fixed**: only her verified approval channel or an interactive session with her counts.
7. **Upload packets handed to the founder during PAUSE** (she would be the one publishing). **Fixed**: packets may be prepared but are not offered while PAUSE exists.
8. **Weak approval proof** (known, G2-03). Until the approval Worker exists, a routine could in principle create a commit through the GitHub API with the founder's token that looks like a web-editor commit. **Keep PAUSE until the Worker exists.** This is backlog item 6.

## Other conflicts and gaps (not fixed here)

- **Report format.** The studio prompt's "Today's new product: <name>" breaks "Founder updates = money". ROUTINE.md §6 (scorecard, final message) now points to the money format.
- **One environment for everything vs. G2-02.** "Research and build runs hold no publish keys." API credentials apply to *every* session in an environment. Keeping build runs free of publish keys needs a second environment later, used only by the runs that publish.
- **Shopify tokens.** A 24-hour token minted from a client secret cannot be stored or minted through API credentials (header only, never visible to Claude). Backlog item 2.
- **Unassigned weekly jobs.** No routine prompt runs the §5b weekly inbound batch or the §6 weekly `git bundle` backup. The backup also needs write-only storage that the founder creates.
- **Platform-news scan.** It belongs to the daily check, which is off until the first store exists, so no one watches platform rule changes before launch.
- **Clone time.** The full history (930 MB) is cloned every run. A partial clone (`--filter=blob:none`) would cut start-up time. This is optional.
- **Usage.** A nightly studio of up to 6 agents plus a Sunday run of up to 10 share the founder's Max allowance. Check claude.ai/settings/usage after the first week, and keep usage credits off (runbook).
- **ops/PAUSE line 9** says FULL-STOP.md "is written as part of task #20". It now exists. The sentence is harmless and was left alone: this check does not edit PAUSE.

## Steps only a person can do

**The founder (account settings):**
1. Confirm the Claude GitHub App is installed on `playbeforepixels` (claude.ai/connect-github), **then** make the repository private. The other order stops the routines at `add_repo`.
2. Switch the GitHub default branch to `claude/live`. The runbook calls this optional; this check recommends doing it, because her PAUSE and APPROVED edits otherwise land on `main`.
3. Create the "Play Before Pixels" environment: Custom network, paste `ops/cloud/allowed-domains.txt` (now including the tax and developer-docs hosts), and paste `ops/cloud/setup-script.sh`. Point all three routines at it, with Connectors: none.
4. Switch on weekly research, and later the daily check, only after the prompt changes below are in.
5. Later: the platform keys, the approval Worker, write-only backup storage, the uptime monitor, and every item the routines put in ops/APPROVALS.md (uploads to KDP, IngramSpark and TpT; IP reports; paid placements; counsel).

**Lead (this build session):**
1. Before 06:47 UTC, either commit and push the running workflows' `products/` work, or switch the daily studio off for tonight, so the two do not edit the same product.
2. Update the stored prompts (`update_trigger`) as below.
3. Pick the Sunday schedule:
   - (a) weekly research at 12:52 a.m. ET, so the studio skips cleanly if research is still running; or
   - (b) no studio on Sundays (`47 2 * * 1-6`).
   Then update ROUTINE.md, the runbook, MONITORING.md and LAUNCH-NOW.md to match.
4. Correct the "only `claude/` branches" sentence in CLAUDE.md and ops/CLOUD-RUNBOOK.md line 38.
5. Renumber COMPLIANCE-GATE's second "16" to 23.
6. Define the `content/queue/` file format.
7. Name the base branch in ROUTINE.md step 0.6.

## Suggested prompt changes (for `update_trigger`)

- **Daily studio, step 3:**
  - Replace "from the top of ops/QUEUE.md" with "the top item in ops/QUEUE.md 'Next to build' that can be built now (ops/ROUTINE.md §2)".
  - Replace "fewer than 2 new articles were published this week" with "fewer than 2 new articles were added to seo/articles/ in the last 7 days".
- **Daily studio, step 7:** replace `otherwise one line "Today's new product: <name>" plus` with `otherwise the daily money line (before sales data is connected: "No sales data is connected yet.") plus`.
- **Daily check:**
  - Move step 3 (PAUSE) to right after step 1.
  - Replace 2(b) with: "process ops/APPROVALS.md: carry out an APPROVED item only when the approval is verified as ops/ROUTINE.md §5 requires (never a line written during a routine run); never edit the APPROVED/NO column."
- **Weekly research, step 2:** add "within the 10-agent cap in ops/ROUTINE.md step 0.1 (combine lanes and verifiers to fit), and work the top 10 open items of ops/RESEARCH-BACKLOG.md".
- **All three:** after cloning, "run `bash ops/cloud/bootstrap.sh`; if it does not print `branch=claude/live`, commit and push nothing."

## What this dry run changed

| File | Change |
|---|---|
| ops/HEARTBEAT.json | New template: last_run, routine, session, result, pause_seen, steps, items_published, approvals_waiting, search_console_manual_action, credentials, tokens_expiring, queue_ready_to_build, notes |
| ops/FULL-STOP.md | New: the three stops; per-platform API and manual stop steps; "no APIs connected yet" |
| ops/RESEARCH-BACKLOG.md | New: 13 ranked items (automation-critical first) |
| ops/PUBLISHED.json | New: empty publish ledger with its format |
| ops/cloud/bootstrap.sh | Error line when not on `claude/live`; checks PAUSE on `main` too (unknown counts as on). Tested in a scratch repo (normal; PAUSE only on main; `claude/live` missing; `main` unreachable) |
| ops/cloud/allowed-domains.txt | Added IRS, Maryland SDAT, EU tax, code.claude.com, docs.github.com and the platforms' developer and help pages |
| ops/ROUTINE.md | Clarifications only (no rule loosened): which routine runs which sections; accurate push wording and the not-on-`claude/live` stop; pull before push, no force-push; budget fitting; PAUSE on either branch, re-checked before publishing, covering AUTOFIX, never self-removed; connector-guard scope; LOCK format and cleanup; credentials `not connected`; blocked-network handling; buildable queue item; article cap counts articles added; §3b Mondays; monthly close in the studio; run-log file name per routine; LOCK removal and final push; scorecard and warnings go to RUNLOG, not the founder's report |

Not touched: `products/`, `brand/logo-concepts-v2/`, `site-concepts/`, `content/`, CLAUDE.md, ops/CLOUD-RUNBOOK.md, ops/PAUSE, the stored routines. Nothing was committed or pushed.
