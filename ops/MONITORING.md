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
Daily check (health, approvals, scheduled posts, one improvement) · Weekly studio (research, new product, marketing, international step, monthly close, scorecard) · Monthly research (market, innovation, copycat watch).
