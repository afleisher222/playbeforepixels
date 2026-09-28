# Around-the-clock monitoring (founder decision, September 28, 2026)

**Decision:** Claude runs daily (plus weekly and monthly). Continuous watching is done by a free uptime monitor, not by Claude.

## Free uptime monitor (founder sets up once, ~5 minutes; part of the launch checklist)
- Use a free uptime service (e.g., UptimeRobot free plan, or Cloudflare's health checks if available on the plan) to check every few minutes:
  - https://playbeforepixels.com/ (home)
  - the shop page and one product page
  - the checkout link (store platform)
- Alerts go by email to the business address only. The daily Claude check reads the monitor's status (if a read key is configured as UPTIME_API_KEY) and fixes what it can.

## What runs 24/7 without Claude
Store checkout, payments, digital delivery, print-on-demand printing and shipping, marketplace sales, bank rules (tax reserve), accounting feeds.

## What Claude runs on schedule
Daily check 6:38 a.m. ET (health, approvals, scheduled posts, platform news, one improvement) · **Daily studio 2:47 a.m. ET** (moved overnight Sept 28, 2026 so routines use the Max-plan allowance while the founder sleeps; ops/CLOUD-RUNBOOK.md) (founder's choice, Sept 28, 2026: one new or improved product per day, one article or translation, social queue; Mondays add the scorecard, international step and deadline check; first run of the month adds the monthly close and copycat watch) · **Weekly market research, Sundays 3:52 a.m. ET** (founder's choice, Sept 28, 2026: market, competitors, seasons, new research, international demand, innovation lane, queue re-ranking; first Sunday of the month adds the living business plan; Jan/Apr/Jul/Oct add the quarterly strategy review).
