# Autofix policy — what Claude fixes by itself, and the only things it escalates

Goal: the founder never has to check in. Every scheduled run follows this.

## Fix automatically, then log it (no approval needed)
- **Site down or broken after a change:** roll back to the last deploy that passed the pre-deploy tests, then find and fix the cause, re-test, redeploy.
- Broken links, missing images or fonts, layout breaks on any tested device, slow pages, console errors.
- Typos, wrong prices vs listing.json, missing alt text, outdated dates, expired "order by" notices, broken bonus QR links.
- Listing problems on connected platforms: missing fields, wrong category, image rejected for size, failed sync between the store and a channel.
- Failed scheduled posts: retry once, then reschedule.
- A product file a customer reports as broken or unprintable: regenerate and re-upload the file; send the fixed download through the store's automatic re-send.
- Expired or failing access key: switch that platform to "upload packet" mode and keep everything else running (the key renewal goes on the founder's list, below).
- Git conflicts between runs: resolve, keeping the newer approved content; never delete founder-created files.

## Pause, fix what's safe, and add to ops/APPROVALS.md (founder answers yes/no)
- Anything involving money going out (ads, new paid tools, refunds above the automatic refund policy).
- Platform policy warnings, listing removals, account suspensions, legal or IP notices, press inquiries, viral criticism → also create ops/PAUSE.
- Anything touching her job, her legal matters or her children → create ops/PAUSE immediately.
- Renewing an expired key (she creates it once; Claude does the rest).

## Never automatic
Signing, filing, paying taxes, accepting new platform terms, identity verification, contacting people, or buying anything.

## Reporting
Fixes are listed in one line each in ops/RUNLOG.md. The founder's report says "Nothing needs you today." unless something is in ops/APPROVALS.md.
