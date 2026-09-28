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

Each one goes in as: environment → **API credentials** → **Add credential** → the host(s) in the table → the header in the table. In the form, **Bearer** means the header name `Authorization` with the prefix `Bearer`; for a header that takes the bare key, change the name and clear the prefix. A credential is attached only to the exact hosts listed on it (a leading `*.` would match every subdomain; do not use one).

Checked against `ops/SECRETS.md` on September 28, 2026 (details: `ops/TESTS/network-hosts.md`). Anything marked [VERIFY] could not be read from the platform's own documentation yet; `ops/RESEARCH-BACKLOG.md` items 2–5, 7, 8 and 11 cover it.

| Platform | Name in `ops/SECRETS.md` | Allowed websites (host) | Header | Notes |
|---|---|---|---|---|
| Cloudflare (website) | `CLOUDFLARE_API_TOKEN` | `api.cloudflare.com` | `Authorization: Bearer …` | `CLOUDFLARE_ACCOUNT_ID` is not secret: add it as a plain environment variable. Wrangler reads the token from an environment variable, and a Pages direct upload sends its own short upload token to the same host, so whether a wrangler deploy works when only the proxy holds the key is [VERIFY] on the first deploy. Fallback that needs no key in the run: connect the Pages project to this GitHub repository so a push deploys |
| Shopify | `SHOPIFY_ADMIN_TOKEN` (`SHOPIFY_STORE_DOMAIN` is a plain variable) | `<store>.myshopify.com`, the exact host, no wildcard | `X-Shopify-Access-Token` (no prefix) | Header name is the Admin API's. [VERIFY] which token a new store app can get: round-2 gap G2-05 reports that Dev Dashboard apps get 24-hour tokens from a client ID and secret, and that exchange sends the secret in the request body, which a stored credential cannot do. Then the token broker supplies the token, and the exact store host also goes into `ops/cloud/allowed-domains.txt` (backlog item 2) |
| Etsy | `ETSY_API_KEY`, `ETSY_ACCESS_TOKEN` | `openapi.etsy.com` | `x-api-key` (no prefix), and the OAuth token as `Authorization: Bearer …` | Store only `x-api-key` as the credential. Its value format (the keystring alone, or keystring and shared secret joined by a colon) is [VERIFY]. OAuth access tokens are short-lived ([VERIFY] lifetime), so the run gets one from the token broker and sends it itself (G2-05, backlog item 3) |
| Pinterest | `PINTEREST_ACCESS_TOKEN` | `api.pinterest.com` (apps on trial access may be limited to `api-sandbox.pinterest.com` [VERIFY]) | `Authorization: Bearer …` | Access tokens reported to last 30 days [VERIFY]: the token broker, or a monthly re-add (backlog item 4) |
| Meta (Instagram and Facebook) | not in `ops/SECRETS.md` yet [VERIFY: a direct Meta key, or posting through `SOCIAL_SCHEDULER_TOKEN`] | `graph.facebook.com`, plus `rupload.facebook.com` for Reels uploads [VERIFY] | `Authorization: Bearer …` [VERIFY: Meta's examples pass `access_token` as a parameter] | Use a token that does not expire (system-user or Page token) [VERIFY]. Images and videos are posted from a public URL, so the site must be deployed first |
| TikTok | not in `ops/SECRETS.md` yet [VERIFY, as for Meta] | `open.tiktokapis.com` | `Authorization: Bearer …` | Access tokens reported to last 24 hours [VERIFY]: the token broker. File uploads go to the `upload_url` TikTok returns, reported to be on `open-upload.tiktokapis.com` [VERIFY]; that host is on the allowlist and needs no credential |
| YouTube | not in `ops/SECRETS.md` yet [VERIFY, as for Meta] | `youtube.googleapis.com` or `www.googleapis.com` [VERIFY] | `Authorization: Bearer …` | Google access tokens last about 1 hour [VERIFY]: the token broker. The hosts are already reachable through the default list. Never put two credentials on the same Google host |
| Gumroad | `GUMROAD_ACCESS_TOKEN` | `api.gumroad.com` | `Authorization: Bearer …` [VERIFY: Gumroad's examples pass `access_token` as a parameter] | Backlog item 8 |
| Printful | `PRINTFUL_API_TOKEN` | `api.printful.com` | `Authorization: Bearer …` | A store-level private token needs nothing else. An account-level token also needs `X-PF-Store-Id` on store endpoints [VERIFY] |
| Printify (only if chosen instead of Printful) | `PRINTIFY_API_TOKEN` | `api.printify.com` [VERIFY] | `Authorization: Bearer …` [VERIFY] | Add `api.printify.com` to the allowlist only if chosen |
| Gelato (only if chosen instead of Printful) | `GELATO_API_KEY` | its API hosts on `gelatoapis.com` [VERIFY the exact names] | `X-API-KEY` (no prefix) [VERIFY] | As above |
| Email platform: MailerLite | `EMAIL_PLATFORM_API_KEY` | `connect.mailerlite.com` | `Authorization: Bearer …` | |
| Email platform: Kit | `EMAIL_PLATFORM_API_KEY` | `api.kit.com` | `X-Kit-Api-Key` (no prefix) for a v4 API key [VERIFY]; `Authorization: Bearer …` is for OAuth tokens | |
| Social scheduler | `SOCIAL_SCHEDULER_TOKEN` | the chosen service's API host, for example `api.ayrshare.com` [VERIFY: service not chosen, backlog item 11] | `Authorization: Bearer …` [VERIFY] | |
| Uptime monitor | `UPTIME_API_KEY` | the monitor's API host, for example `api.uptimerobot.com` [VERIFY] | [VERIFY] | If the monitor's API takes the key in the request body instead of a header, a stored credential cannot supply it: use a read-only key as a plain environment variable |
| Token broker and approval Worker (G2-03, G2-05; not built yet) | name it when built | the Worker's own host [VERIFY when built] | `Authorization: Bearer …` | The Worker keeps the refresh tokens and hands each run short-lived tokens |

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
