# Full stop: what ops/PAUSE cannot reach

_Created September 28, 2026 (G2-04). Update the platform's row **before** its first API key is added to the cloud environment._

**Status: no APIs connected yet.** No store, social, email or ad account has a key in the cloud environment, so a run has nothing to switch off. A run that finds `ops/PAUSE` records "FULL-STOP: no APIs connected yet" in ops/RUNLOG.md and moves on.

## The three stops

| Stop | What it does | Who |
|---|---|---|
| Create `ops/PAUSE` (on `claude/live` or on `main`) | Every run that starts afterwards publishes, posts, lists, sends and uploads nothing, and carries out the API steps below | Anyone |
| Switch the routines off at claude.ai/code/routines | No run starts at all | Arielle |
| Delete an API credential (environment → API credentials) | That platform's automation stops at once | Arielle |

`ops/PAUSE` only works when a run starts and reads it. Scheduled posts, email automations and ads on the platforms keep running on their own. The table below covers those.

## API steps a run carries out while ops/PAUSE exists (ops/ROUTINE.md step 0.3)

Only pause, unschedule or roll back. Never delete a listing, post, product or subscriber, and never deploy anything new. Log each step in ops/RUNLOG.md and ops/HEARTBEAT.json. Put each manual step Arielle has to do in ops/APPROVALS.md as one line.

| Platform | API step once the key exists | Manual step for Arielle | Key connected? |
|---|---|---|---|
| Website (Cloudflare Pages) | Roll back to the last deploy that passed the tests, only if the incident is on the site. No new deploys | Pages project → Deployments → roll back | No |
| Social scheduler (one key for every network) | Pause or unschedule every queued post | Pause the queue in the scheduler | No |
| Pinterest | Unschedule scheduled pins [VERIFY the API allows it] | Delete scheduled pins in the Pinterest app | No |
| Instagram and Facebook (Meta) | Unschedule scheduled posts [VERIFY] | Meta Business Suite → Planner | No |
| TikTok, YouTube | Nothing queued by API (uploads are immediate) | Hide a post only if the incident needs it | No |
| Email platform (MailerLite or Kit) | Pause automations and unschedule campaigns [VERIFY the endpoints] | Automations → pause | No |
| Ads (any platform) | Pause every campaign | Pause in the ads manager | No ads exist |
| Etsy | Vacation mode [VERIFY the API supports it] | Shop Manager → Settings → Options → Vacation mode | No |
| Shopify | None (orders keep delivering) | Only if Arielle decides: password-protect the store | No |
| Gumroad | None (sales keep delivering) | Only if Arielle decides: unpublish products | No |
| Printful | None (orders keep printing) | Turn off auto-confirm only if an order problem is the cause | No |
| Amazon KDP, IngramSpark, Teachers Pay Teachers | No API | Unpublish only if Arielle decides | No accounts yet |

The [VERIFY] items are in ops/RESEARCH-BACKLOG.md. When a key is added, change "No" to "Yes" in its row and confirm the API step works before relying on it.
