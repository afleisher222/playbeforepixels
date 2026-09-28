# Cloud runbook: running Play Before Pixels on the Claude Max plan

_Written September 28, 2026 from Anthropic's current documentation (code.claude.com: "Routines", "Cloud environments", "Use Claude Code in the cloud"). Routines are a research preview, so their limits may change. The weekly research run re-reads those pages each quarter and updates this file._

## How it runs

Each routine starts a fresh cloud session on its schedule. Each run:
1. clones the repository;
2. runs `bash ops/cloud/bootstrap.sh`, which switches to the working branch `claude/live` and installs the build tools;
3. follows `ops/ROUTINE.md`;
4. commits its work to `claude/live`;
5. ends with Arielle's money report.

Nothing depends on any session staying open. Her laptop can be closed and her phone off.

## The schedule (Eastern time)

| Routine | When | Size | Status on Sept 28, 2026 |
|---|---|---|---|
| Daily studio | 2:47 a.m. every day | One product built or improved, one page improved, posts queued. At most 6 agents | **On.** Build-only while `ops/PAUSE` exists |
| Daily check | 6:38 a.m. every day | Short, no workflow: site and store health, approvals, the money update | Off until the first store exists (nothing to check yet) |
| Weekly research | Sunday 3:52 a.m. | Research lanes, re-ranks the queue, works the top 10 of `ops/RESEARCH-BACKLOG.md`. At most 10 agents | **Off:** Arielle switches it on at claude.ai/code/routines |

**Why the heavy runs are at night:** routines use the same Max-plan allowance as Arielle's own Claude use. Running while she sleeps leaves her daytime allowance for her.

## Max-plan facts this plan is built on (from the documentation)

- **Shared usage.** "Routines draw down subscription usage the same way interactive sessions do", and cloud sessions "share rate limits with all other Claude and Claude Code usage within your account."
- **A daily cap on routine runs.** The account has a daily cap on how many runs can start. The current number is shown at claude.ai/code/routines. This plan starts at most two runs a day, plus one on Sundays. One-off runs do not count toward the cap.
- **When a limit is reached:** "Without usage credits, additional runs are rejected until the window resets."
  - **Recommendation: leave usage credits off.** Then there is never a surprise bill. A skipped run costs nothing, because the queue picks up the next day.
  - If a run hits a limit partway through, `ops/ROUTINE.md` step 0 makes it save its finished work, record `limit` and stop cleanly.
- **Scheduling limits:**
  - The minimum interval is one hour.
  - A run scheduled exactly on the hour can start several minutes late, which is why all our times are a few minutes past.
- **"A green status … does not mean the task in your prompt succeeded."** So every run writes its result to `ops/RUNLOG.md` and `ops/HEARTBEAT.json`. The daily check reads them and puts any failure into Arielle's update as one plain line.
- **The GitHub connection must stay connected.** If it lapses, routines skip runs for up to 72 hours and then switch off. The daily check's report says so as soon as a run is missed.
- **Routines may push only to `claude/`-prefixed branches.** A push to another branch is rejected, for example if it carries commits by someone else. That is why the working branch is `claude/live`. `main` is only a mirror, updated by interactive sessions.
- **Connectors.** When a routine is edited on the web, "all of your currently connected connectors are included by default." **Always remove every connector** (Gmail, Google Drive, Calendar). The business routines must never reach Arielle's personal accounts. `ops/ROUTINE.md` step 0.4 also refuses to publish if it detects one.
- **Keys.** Environment variables are "visible to anyone who uses the environment." On Pro and Max plans, keys go in as **API credentials** instead: "The key never reaches Claude, the commands it runs, or the session's environment variables." Requests to those hosts pass the network allowlist automatically.
- **Setup script.** It is cached when it finishes in about five minutes. It re-runs when the script or the allowed hosts change, and after about seven days.
- **Network.** The default "Trusted" network allows package registries, GitHub and cloud providers, but not marketplaces, social platforms or research journals. Requests to other hosts fail with `403 host_not_allowed`.

## Arielle's one-time setup (about 20 minutes, in this order)

1. **Make the repository private. This is urgent.** On September 28, 2026, GitHub showed `afleisher222/playbeforepixels` as **public**: anyone could read the products, legal notes and plans.
   - Go to GitHub → the repository → **Settings** → **General** → at the bottom, **Change repository visibility** → **Make private**.
   - Claude's GitHub connection is not allowed to change repository settings, so this click has to be hers.
2. **Keep Claude's access to the now-private repository.** At https://claude.ai/connect-github, make sure the Claude GitHub App is installed on `playbeforepixels`. Private repositories need it.
3. **Optional (makes every clone start in the right place):** go to GitHub → **Settings** → **General** → **Default branch** → switch to `claude/live`.
4. **Create a dedicated environment called "Play Before Pixels"** (claude.ai/code → the cloud environment menu → add or edit an environment):
   - **Network access:** choose **Custom**, tick **Also include default list of common package managers**, and paste the domain lines from `ops/cloud/allowed-domains.txt`.
   - **Setup script:** paste `ops/cloud/setup-script.sh`.
   - **API credentials:** none yet. Add one per platform as each account opens (see the table below).
   - **Why a separate environment:** the business's keys never sit inside sessions about anything else, and nothing from her other work reaches the business routines.
5. **Point each routine at it** (claude.ai/code/routines → routine → **Edit**):
   - environment = **Play Before Pixels**;
   - **Connectors: none**;
   - optionally add the repository `afleisher222/playbeforepixels` under Repositories.
6. **Switch on the weekly research routine.**
7. **Model (her choice):** the routine form has a model selector. Stronger models for the studio and research give the best products. A lighter model for the daily check uses less of her allowance.

Claude can do none of steps 1–7 itself: they are account settings that only the owner can change. Everything else is automatic.

## API credentials (added as each account opens, never pasted in chat)

Each one goes in as: environment → **API credentials** → **Add credential** → the host(s) in the table → the header in the table.

| Platform | Allowed websites (host) | Header |
|---|---|---|
| Cloudflare (website) | `api.cloudflare.com` | `Authorization: Bearer …` |
| Shopify | `<store>.myshopify.com` | `X-Shopify-Access-Token` (no prefix). Shopify's current app-token rules are an open research item in `ops/RESEARCH-BACKLOG.md` |
| Etsy | `openapi.etsy.com` | `x-api-key` plus OAuth. OAuth tokens expire; the token-refresh design is task #20 (G2-05) |
| Pinterest | `api.pinterest.com` | `Authorization: Bearer …` (OAuth; refresh design as above) |
| Meta (Instagram and Facebook) | `graph.facebook.com` | `Authorization: Bearer …` |
| TikTok | `open.tiktokapis.com` | `Authorization: Bearer …` |
| Gumroad | `api.gumroad.com` | `Authorization: Bearer …` |
| Printful | `api.printful.com` | `Authorization: Bearer …` |
| Email platform | `connect.mailerlite.com` or `api.kit.com` | `Authorization: Bearer …` |

`ops/SECRETS.md` lists what each key lets Claude do. Give every key the smallest permissions that do the job, and delete a credential to switch that platform's automation off.

## Guardrails that keep it running without anyone watching

- **One run at a time:** `ops/LOCK` (ROUTINE.md step 0.5).
- **Pull-and-rebase before every push,** so runs and interactive sessions never overwrite each other.
- **`ops/PAUSE`:** while it exists, research and building only, with nothing published, posted or sent. Anyone can create it to stop all publishing at once.
- **Limit handling:** a run that hits a usage or rate limit saves, records `limit` and stops. The next run continues from the queue.
- **Failures reach Arielle as one line in her money update,** only when something needs her (a lapsed GitHub connection, a key to renew, an approval).
- **Keep the repository small,** so every clone is quick. The build session saved renders every few minutes, so the history is about 930 MB. From now on:
  - scratch QA renders go in git-ignored `tmp/` or `.qa/` folders;
  - final files are committed once per product version;
  - site images are published as compressed web images.
  - A one-time slim-down of the old history (moving it to an archive) needs Arielle's OK first, because it rewrites history.
- **Emergency stops:**
  - create `ops/PAUSE`, to stop publishing;
  - switch the routines off at claude.ai/code/routines, to stop everything;
  - delete an API credential, to cut off one platform immediately.

## What Arielle sees

Only money updates, in the format in `ops/ROUTINE.md` ("Founder updates = money"). She also gets one line when something truly needs her.
