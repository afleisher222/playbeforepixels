# Cloud runbook: running Play Before Pixels on the Claude Max plan

_Written September 28, 2026 from Anthropic's documentation on code.claude.com: "Automate work with routines" (/docs/en/routines), "Configure cloud environments" (/docs/en/cloud-environments) and "Use Claude Code in the cloud" (/docs/en/claude-code-on-the-web). "Routines are in research preview. Behavior, limits, and the API surface may change." Nothing re-reads these pages automatically yet (neither `ops/ROUTINE.md` nor any routine prompt asks for it), so re-check them whenever a run does something this file does not explain._

## How it runs

Each routine starts a fresh cloud session on its schedule. Each run:
1. attaches and clones the repository (the routine prompts do this with `add_repo`, `ops/ROUTINE.md` step 0.1);
2. runs `bash ops/cloud/bootstrap.sh`, which switches to the working branch `claude/live` and installs the build tools;
3. follows `ops/ROUTINE.md`;
4. commits its work to `claude/live`;
5. ends with Arielle's money report as its last message. Each run appears as its own session in her list at claude.ai/code and on the routine's page at claude.ai/code/routines.

Nothing depends on any session staying open: routines "keep working when your laptop is closed." Her laptop can be closed and her phone off.

## The schedule (Eastern time)

The routines store the New York time zone, so these times hold through daylight saving.

| Routine | When | Size | Status on Sept 28, 2026 |
|---|---|---|---|
| Daily studio | 2:47 a.m. every day | One product built or improved, one page improved, posts queued. At most 6 agents | **On.** Build-only while `ops/PAUSE` exists |
| Daily check | 6:38 a.m. every day | Short, no workflow: site and store health, approvals, the money update | Off until the first store exists (nothing to check yet) |
| Weekly research | Sunday 3:52 a.m. | Research lanes, re-ranks the queue, works the top 10 of `ops/RESEARCH-BACKLOG.md`. At most 10 agents | **Off:** Arielle switches it on at claude.ai/code/routines |

**Why the heavy runs are at night:** routines use the same Max-plan allowance as Arielle's own Claude use. Running while she sleeps keeps them from competing with her own daytime use; they still count toward the same overall allowance.

## Max-plan facts this plan is built on (from the documentation)

- **Shared usage.** "Routines draw down subscription usage the same way interactive sessions do", and cloud sessions "share rate limits with all other Claude and Claude Code usage within your account." "There is no separate compute charge for the cloud VM."
- **A daily cap on routine runs.** "In addition to the standard subscription limits, routines have a daily cap on how many runs can start per account." Current consumption and the remaining daily runs are shown at claude.ai/code/routines and claude.ai/settings/usage. This plan starts at most two runs a day, plus one on Sundays. "One-off runs do not count against the daily routine cap", but they still use her subscription usage.
- **When a limit is reached:** "When a routine hits the daily cap or your subscription usage limit, organizations with usage credits turned on can keep running routines on metered overage. Without usage credits, additional runs are rejected until the window resets."
  - **Recommendation: leave usage credits off** (claude.ai/settings/usage). Then routines never add metered charges. A skipped run costs nothing, because the queue picks up the next day.
  - The docs say what happens to runs that have not started yet, not to a run that reaches a limit partway through. `ops/ROUTINE.md` step 0.1 tells a run to stop starting new work when a tool reports a usage or rate limit, commit what is finished, record `limit` and remove `ops/LOCK`. If the limit stops Claude itself, the run may simply end mid-task. Work it already pushed is safe; the unfinished piece is lost; `ops/LOCK` may stay behind (a later run ignores a lock older than 6 hours); and the run's `ops/RUNLOG.md` entry and heartbeat are missing, which is the sign to look for.
- **A paused subscription pauses the routines.** "While your subscription is paused, your routines are put on hold and don't run. Once your subscription is active again, turn them back on."
- **Scheduling limits:**
  - The minimum interval is one hour.
  - A run scheduled exactly on the hour can start several minutes late, which is why all our times are a few minutes past.
- **"A green status in the run list means the session started and exited without an infrastructure error. It does not mean the task in your prompt succeeded."** So every run writes its result to `ops/RUNLOG.md` and `ops/HEARTBEAT.json`. Once it is switched on, the daily check reads them and puts any failure into Arielle's update as one plain line. Until then, a failure shows only in those files and in the run's own transcript.
- **The GitHub connection must stay connected.** "If your GitHub connection is missing or expired when a run is due, the routine skips runs until you reconnect, for up to 72 hours." Reconnecting within that window lets the routine resume on its own. "After 72 hours without a connection, the routine turns off, and you turn it back on after reconnecting GitHub." A skipped run cannot report anything, and the daily check is skipped too, so the sign is a morning with no new run in her session list. Then she checks claude.ai/code/routines.
- **Branches.** "Claude pushes its work to branches prefixed with `claude/`, which are always accepted." A push to any other branch is checked first and rejected if the branch is protected on GitHub, someone else has an open pull request from it, or it carries commits authored by someone other than her. So the platform does not block every push to `main`: `ops/ROUTINE.md` step 0.1 is the rule that keeps runs off it. That is why the working branch is `claude/live`. `main` is only a mirror, updated by interactive sessions.
  - Not confirmed yet: the cloud-environments page also says the GitHub proxy's push protection means "`git push` works only against the session's current working branch". Whether a run that switches to `claude/live` can push there is settled by the first scheduled run (`ops/RESEARCH-BACKLOG.md` item 1).
- **Connectors.** "When you create a routine, all of your currently connected connectors are included by default." And "Claude can use every tool from an included connector, including writes, without asking for permission during a run." **Always remove every connector** (Gmail, Google Drive, Calendar) whenever a routine is created or edited. The business routines must never reach Arielle's personal accounts. On September 28, 2026, all three routines listed no connectors. `ops/ROUTINE.md` step 0.4 also refuses to publish if it detects one.
- **Keys.** Environment variables are "visible to anyone who uses the environment". On Pro and Max plans, keys go in as **API credentials** instead: "The key never reaches Claude, the commands it runs, or the session's environment variables."
  - For the hosts listed on a credential: "Sessions can reach those hosts even when the environment's network access level wouldn't otherwise allow them", apart from the exceptions below.
  - A credential is never attached to GitHub requests, the Anthropic API, the main public package registries (npm, PyPI and a few others), or requests made by the setup script.
  - "The credential applies in every session that runs in the environment, whoever started it, until you delete it."
  - Credentials can be added only to an environment that already exists: "The dialog for a new environment doesn't offer them."
- **Setup script.** It must exit 0: "if the script exits non-zero, the session fails to start" (ours always exits 0).
  - It is cached only when it finishes within roughly five minutes: "If setup takes longer than roughly five minutes, the environment isn't cached."
  - The cache is rebuilt "when you change the environment's setup script or allowed network hosts, and when the cache reaches its expiry after roughly seven days."
- **Network.** The Default environment's "Trusted" level allows "package registries, GitHub, cloud SDKs" and the other domains on the docs' default list, but no marketplaces, social platforms or research journals. Requests to other hosts "fail with `403` and `x-deny-reason: host_not_allowed`". GitHub (through its own proxy), connectors, the hosts on API credentials and the Anthropic API do not go through the allowlist.

## Arielle's one-time setup (about 20 minutes, in this order)

1. **Keep Claude's access before the repository goes private.** Open https://github.com/apps/claude/installations/new (the link the docs give), choose her account, and make sure **Repository access** includes `playbeforepixels`.
   - The docs say a private repository is reachable "only when the Claude GitHub App is installed on the account or organization that owns it and the installation's repository access includes it."
   - If step 2 came first, the next run (the daily studio at 2:47 a.m.) could stop at `add_repo`.
2. **Make the repository private. This is urgent.** On September 28, 2026, GitHub showed `afleisher222/playbeforepixels` as **public**: anyone could read the products, legal notes and plans.
   - Go to GitHub → the repository → **Settings** → **General** → at the bottom, **Change repository visibility** → **Make private**.
   - This is an owner setting on her GitHub account, so the click is hers. No session or routine changes repository settings.
3. **Optional (makes every clone start in the right place):** go to GitHub → **Settings** → **General** → **Default branch** → switch to `claude/live`. Each run's clone starts "from the default branch".
4. **Create a dedicated environment called "Play Before Pixels"**: at claude.ai/code, select the cloud icon showing the current environment's name (in the row above the message box), then **Add cloud environment**.
   - **Network access:** choose **Custom**, tick **Also include default list of common package managers**, and paste the domain lines from `ops/cloud/allowed-domains.txt` into **Allowed domains** (one per line, without the `#` comment lines).
   - **Setup script:** paste `ops/cloud/setup-script.sh`.
   - **API credentials:** none yet. The section appears only when a saved environment is opened for editing (hover over it in the same menu and select the settings icon), so every credential is added after this step, one per platform as each account opens (see the table below).
   - **Why a separate environment:** the business's keys never sit inside sessions about anything else, and nothing from her other work reaches the business routines.
   - **Afterwards,** make sure **Default** is the one selected in that menu for her own sessions: sessions she starts herself use the environment shown there.
5. **Point each routine at it** (claude.ai/code/routines → routine → the menu next to its name → **Edit**). This needs the environment from step 4.
   - environment = **Play Before Pixels** (the cloud icon below the **Instructions** box);
   - **Connectors: none** (at the bottom of the form);
   - optionally add the repository `afleisher222/playbeforepixels` under Repositories, so each run starts with it cloned.
6. **Switch on the weekly research routine** with the on/off switch on its page. Do this only after:
   - steps 4–5, because its research hosts are blocked in the Default environment;
   - the lead says its stored prompt is final. `ops/TESTS/routine-dry-run.md` lists prompt changes still to make and a Sunday clash with the studio's `ops/LOCK`.
7. **Model (her choice):** the routine form has a model selector. Stronger models for the studio and research give the best products. A lighter model for the daily check uses less of her allowance.

Arielle makes steps 1–7 herself: they are settings on her own GitHub and Claude accounts. Everything else is automatic.

## API credentials (added as each account opens, never pasted in chat)

Credentials can be added only after setup step 4, because they go on an environment that already exists.

**How to add one:**
1. Open the environment for editing: claude.ai/code → the cloud icon → hover over **Play Before Pixels** → the settings icon.
2. Find **API credentials** below **Environment variables** and select **Add credential**.
3. Keep the default **Credential type**, **Bearer**, for a key sent in a header. Fill in:
   - **Name**;
   - **Allowed websites**: the host(s) in the table;
   - one **Custom headers** row. It starts as name `Authorization` with prefix `Bearer`; paste the key as the **Value**. For a header that takes the bare key, change the name and clear the prefix.
4. Select **Connect**.

**Rules:**
- The value cannot be viewed again, and there is no edit: to change a credential, delete it and add it again.
- For an API that takes its key another way, pick a different credential type. The docs say the list is the one Claude Tag uses, which includes **Basic**, **Body parameter** ("A token the API expects in the request body or query string instead of a header") and **OAuth 2.0 client credentials**.
- A credential is sent only to the hosts listed on it. A leading `*.` would match every subdomain; do not use one.
- The API must accept connections from the internet, because requests leave from Anthropic's network.

Checked against `ops/SECRETS.md` on September 28, 2026 (details: `ops/TESTS/network-hosts.md`). Anything marked [VERIFY] could not be read from the platform's own documentation yet; `ops/RESEARCH-BACKLOG.md` items 2–5, 7, 8 and 11 cover it.

| Platform | Name in `ops/SECRETS.md` | Allowed websites (host) | Header | Notes |
|---|---|---|---|---|
| Cloudflare (website) | `CLOUDFLARE_API_TOKEN` | `api.cloudflare.com` | `Authorization: Bearer …` | `CLOUDFLARE_ACCOUNT_ID` is not secret: add it as a plain environment variable. Wrangler reads the token from an environment variable, and a Pages direct upload sends its own short upload token to the same host, so whether a wrangler deploy works when only the proxy holds the key is [VERIFY] on the first deploy. Fallback that needs no key in the run: connect the Pages project to this GitHub repository so a push deploys |
| Shopify | `SHOPIFY_ADMIN_TOKEN` (`SHOPIFY_STORE_DOMAIN` is a plain variable) | `<store>.myshopify.com`, the exact host, no wildcard | `X-Shopify-Access-Token` (no prefix) | Header name is the Admin API's. [VERIFY] which token a new store app can get: round-2 gap G2-05 reports that Dev Dashboard apps get 24-hour tokens from a client ID and secret, and that exchange sends the secret in the request body, which the default Bearer type cannot do. Whether the form's **OAuth 2.0 client credentials** type can run that exchange and send the result as `X-Shopify-Access-Token` is [VERIFY]. Otherwise the token broker supplies the token, and the exact store host also goes into `ops/cloud/allowed-domains.txt` (backlog item 2) |
| Etsy | `ETSY_API_KEY`, `ETSY_ACCESS_TOKEN` | `openapi.etsy.com` | `x-api-key` (no prefix), and the OAuth token as `Authorization: Bearer …` | Store only `x-api-key` as the credential. Its value format (the keystring alone, or keystring and shared secret joined by a colon) is [VERIFY]. OAuth access tokens are short-lived ([VERIFY] lifetime), so the run gets one from the token broker and sends it itself (G2-05, backlog item 3) |
| Pinterest | `PINTEREST_ACCESS_TOKEN` | `api.pinterest.com` (apps on trial access may be limited to `api-sandbox.pinterest.com` [VERIFY]) | `Authorization: Bearer …` | Access tokens reported to last 30 days [VERIFY]: the token broker, or a monthly re-add (backlog item 4) |
| Meta (Instagram and Facebook) | not in `ops/SECRETS.md` yet [VERIFY: a direct Meta key, or posting through `SOCIAL_SCHEDULER_TOKEN`] | `graph.facebook.com`, plus `rupload.facebook.com` for Reels uploads [VERIFY] | `Authorization: Bearer …` [VERIFY: Meta's examples pass `access_token` as a parameter; the **Body parameter** type covers that] | Use a token that does not expire (system-user or Page token) [VERIFY]. Images and videos are posted from a public URL, so the site must be deployed first |
| TikTok | not in `ops/SECRETS.md` yet [VERIFY, as for Meta] | `open.tiktokapis.com` | `Authorization: Bearer …` | Access tokens reported to last 24 hours [VERIFY]: the token broker. File uploads go to the `upload_url` TikTok returns, reported to be on `open-upload.tiktokapis.com` [VERIFY]; that host is on the allowlist and needs no credential |
| YouTube | not in `ops/SECRETS.md` yet [VERIFY, as for Meta] | `youtube.googleapis.com` or `www.googleapis.com` [VERIFY] | `Authorization: Bearer …` | Google access tokens last about 1 hour [VERIFY]: the token broker. The hosts are already reachable through the default list. Never put two credentials on the same Google host |
| Gumroad | `GUMROAD_ACCESS_TOKEN` | `api.gumroad.com` | `Authorization: Bearer …` [VERIFY: Gumroad's examples pass `access_token` as a parameter; the **Body parameter** type covers that] | Backlog item 8 |
| Printful | `PRINTFUL_API_TOKEN` | `api.printful.com` | `Authorization: Bearer …` | A store-level private token needs nothing else. An account-level token also needs `X-PF-Store-Id` on store endpoints [VERIFY] |
| Printify (only if chosen instead of Printful) | `PRINTIFY_API_TOKEN` | `api.printify.com` [VERIFY] | `Authorization: Bearer …` [VERIFY] | Add `api.printify.com` to the allowlist only if chosen |
| Gelato (only if chosen instead of Printful) | `GELATO_API_KEY` | its API hosts on `gelatoapis.com` [VERIFY the exact names] | `X-API-KEY` (no prefix) [VERIFY] | As above |
| Email platform: MailerLite | `EMAIL_PLATFORM_API_KEY` | `connect.mailerlite.com` | `Authorization: Bearer …` | |
| Email platform: Kit | `EMAIL_PLATFORM_API_KEY` | `api.kit.com` | `X-Kit-Api-Key` (no prefix) for a v4 API key [VERIFY]; `Authorization: Bearer …` is for OAuth tokens | |
| Social scheduler | `SOCIAL_SCHEDULER_TOKEN` | the chosen service's API host, for example `api.ayrshare.com` [VERIFY: service not chosen, backlog item 11] | `Authorization: Bearer …` [VERIFY] | |
| Uptime monitor | `UPTIME_API_KEY` | the monitor's API host, for example `api.uptimerobot.com` [VERIFY] | [VERIFY] | If the monitor's API takes the key in the request body instead of a header, use the **Body parameter** credential type. The fallback is a read-only key as a plain environment variable |
| Token broker and approval Worker (G2-03, G2-05; not built yet) | name it when built | the Worker's own host [VERIFY when built] | `Authorization: Bearer …` | The Worker keeps the refresh tokens and hands each run short-lived tokens |

`ops/SECRETS.md` lists what each key lets Claude do. Give every key the smallest permissions that do the job, and delete a credential to switch that platform's automation off.

## Guardrails that keep it running without anyone watching

- **One run at a time:** `ops/LOCK` (ROUTINE.md step 0.5).
- **Pull-and-rebase before every push,** so runs and interactive sessions never overwrite each other.
- **`ops/PAUSE`:** while it exists, research and building only, with nothing published, posted or sent. Anyone can create it to stop all publishing at once.
- **Limit handling:** a run that sees a usage or rate limit saves what is finished, records `limit` and stops, when it still can. The next run continues from the queue.
- **Failures reach Arielle as one line in her money update,** only when something needs her (a key to renew, an approval, a failed run). A lapsed GitHub connection is the exception: no run happens, so no update arrives. A morning with no new run is the sign to check claude.ai/code/routines.
- **Keep the repository small,** so every clone is quick. The build session saved renders every few minutes, so the history is about 930 MB. From now on:
  - scratch QA renders go in git-ignored `tmp/` or `.qa/` folders;
  - final files are committed once per product version;
  - site images are published as compressed web images.
  - A one-time slim-down of the old history (moving it to an archive) needs Arielle's OK first, because it rewrites history.
- **Emergency stops:**
  - create `ops/PAUSE`, to stop publishing (a run re-checks it right before each publish step);
  - switch the routines off at claude.ai/code/routines, to stop all future runs ("Paused routines keep their configuration but don't run until you re-enable them"). A run already under way is not stopped by the switch, so create `ops/PAUSE` as well;
  - delete an API credential, to cut off one platform immediately (a credential applies "until you delete it").

## What Arielle sees

Only money updates, in the format in `ops/ROUTINE.md` ("Founder updates = money"). She also gets one line when something truly needs her.

_Checked against the docs on September 28, 2026: code.claude.com/docs/en/routines, /docs/en/cloud-environments and /docs/en/claude-code-on-the-web, plus /docs/en/web-quickstart (the GitHub App link) and the Claude Tag "add connections" page that cloud-environments names as the credential-type list. Every quotation above is verbatim from those pages. The schedule, status and connectors were read from the routine list the same day._
