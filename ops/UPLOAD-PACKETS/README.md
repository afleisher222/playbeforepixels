# Upload packets: what goes up, in what order

Written September 28, 2026. **Nothing is uploaded or published.** `ops/PAUSE` stays until Gate A holds and the founder types "go" (business/GROWTH-ENGINE.md §2b). No Etsy, Gumroad, KDP or Pinterest account exists yet. Every platform limit, form label and fee below is from memory and **UNVERIFIED** (web search was unavailable): check it on the platform on the day.

Every packet is generated from the product records, so it never drifts from them:

```
python3 ops/UPLOAD-PACKETS/build_packets.py      # rewrite every packet and run 503 checks → CHECKS.md (0 FAIL, 3 WARN today)
python3 ops/UPLOAD-PACKETS/stage.py etsy 02      # at upload time: assemble one upload outside git, build its ZIPs, re-check
python3 ops/UPLOAD-PACKETS/stage.py --all        # dry run of the whole launch (all OK on Sep 28)
bash marketing/pins/build/make.sh                # rebuild and check the 60 pins
bash marketing/social-kit/build/make.sh          # rebuild the profile images
```

The checks cover titles (≤140), 13 tags (≤20 chars), the §7 banned-word list, no URL/QR/link in any Etsy description or Etsy PDF (including every PDF inside the bundle ZIPs), ≤5 Etsy files of ≤20 MB, START HERE first, listing images present, AI disclosure present, net ≥ price floor, no Type 3 fonts and no placeholder text in any uploaded PDF, KDP page count, trim, wrap width and HTML tags, and the course emails (35 + 7, no referral-reward line, guarantee wording).

## Before anything (founder, one time; §2a)

Gate A in writing (counsel's yes, bank, insurance, money cap, safeguards, accounts, policies published after attorney review). Then one account sitting: Etsy (shop not opened), KDP, Gumroad, email platform, Pinterest business account. Profiles use `marketing/social-kit/` images and `marketing/social-kit/BIOS.md` text. No founder name or photo anywhere; the KDP author is "Play Before Pixels" until counsel answers Q9.

## The order of uploads

| # | When | Where | Packet | Price |
|---|---|---|---|---|
| 1 | Oct 5–11 (account sitting) | KDP: save as **draft**, order 1 printed proof to the PO Box | `kdp/01-100-screen-free-plays/` | $16.99 (UK/CA/AU: see the price decision in the packet) |
| 2 | Oct 5–15, unlisted until G-day | Gumroad: every G-day product **and every bundle part**, so each "separately" figure is a price really being charged | `gumroad/01` busy book · `02` routine cards 0–5 · `03` 100 Plays PDF · `04` bored cards 1–5 · `05` Family Kit 2–5 · `06` Play & Talk · `09` Gift Bundle | $11.99 · $9.50 · $9.99 · $6.50 · $11 · $7 · $29 |
| 3 | by Oct 15 | Etsy: create the 6 shop sections (Gift Guide: Ages 1–5 is the Oct 15 gift guide) and the banner/icon | `marketing/social-kit/BIOS.md` | — |
| 4 | **G-day, Fri Oct 16** (after "go") | Etsy, 5 listings, in this order | `etsy/01` Toddler Busy Book · `etsy/02` Ages 1–5 Instant Gift Bundle (no "separately" figure yet) · `etsy/03` 181 Visual Routine Cards 0–5 · `etsy/04` 100 Screen-Free Plays PDF · `etsy/05` 76 "I'm Bored" Play Cards 1–5 | $11.99 · $29 · $9.50 · $9.99 · $6.50 |
| 5 | G-day | Gumroad: switch items from row 2 to public; landing page `/free/` live | — | — |
| 6 | G-day onward | Pinterest: 12 boards, then pins 3 a day as each product's link exists | `marketing/pins/` | — |
| 7 | Week 2, Oct 19–25 (Countdown **by Oct 25**) | Etsy, 4 listings | `etsy/06` Play-First Family Kit 2–5 · `etsy/07` 52 Play & Talk Cards · `etsy/08` 60 Routine Cards Starter · `etsy/09` Winter Countdown | $11 · $7 · $5.00 · $6.50 |
| 8 | Week 2 | Gumroad | `gumroad/07` Starter · `08` Winter Countdown · `10` Birth-to-5 Library (**must be live by Oct 25** for the Black Friday "free bonus" rule, §2c week 5) | $5.00 · $6.50 · $45 |
| 9 | After week 2 | Etsy Gift Bundle: add the one "separately" line only if all four counted parts are now live on Etsy | `etsy/02` | — |
| 10 | Proof arrives (about Oct 16–23) | KDP: founder checks the proof and page 1 → Publish (live about Oct 23–30) | `kdp/01` | — |
| 11 | Dec 5 | Etsy + Gumroad: deactivate the Winter Countdown; stop/archive its 5 pins | `etsy/09`, `gumroad/08` | — |
| 12 | Dec 15 (sale opens; launch Dec 26; start date Jan 4) | Gumroad: the course, its $49 bundle and the free starter, with the drip emails | `gumroad/11-course-30-days/` | $27 · $49 |

**Not uploaded:** `etsy/10-bundle-library-0-5` is **BLOCKED on Etsy**: even with the G0 editions its four format ZIPs are 24.8–26.6 MB against Etsy's 20 MB per file, and Etsy's 5 files cannot hold it. The Library sells on Gumroad only; week 2 on Etsy is 4 listings. Etsy buyers are offered the $29 Gift Bundle instead.

Limits kept: Etsy ≤5 new listings a week (5 + 4), KDP ≤2 titles a week (1). No Etsy Ads, Offsite Ads off, no sale events, no coupons or offer codes for 90 days, no "was" prices. Personal/Family license only.

## Per-upload routine (every packet has its own checklist)

1. `ops/PAUSE` gone and an APPROVED line for this item in `ops/APPROVALS.md`.
2. `python3 ops/UPLOAD-PACKETS/build_packets.py` → 0 FAIL.
3. `python3 ops/UPLOAD-PACKETS/stage.py <etsy|gumroad> <nn>` → OK. Staging goes to `$PBP_STAGING` or `~/pbp-upload-staging`, never into git.
4. Follow the packet's checklist. Paste, don't retype.
5. Record the live URL/ID in `ops/PUBLISHED.json`, start `price_history` in the record, and replace the product's `{{ETSY_LISTING_URL:<slug>}}` in `marketing/pins/`.

## Changes this step made outside this folder

- `products/bundle-gift-1-5/build/zip-config.json` and `products/bundle-library-0-5/build/zip-config.json` now point at the **G0 editions** (Family Kit 2–5, bored cards 1–5, routine cards 0–5), which is what the bundle listings already describe. `zip-manifest.json` and `listing.json` were regenerated with the bundles' own `manifest.py` and `listing.py`. Result: the Gift Bundle's Etsy ZIPs now fit (12.7–15.9 MB), so its Etsy listing is READY; the Library stays blocked on Etsy.

## Differences from the product records (for the product workflow to fold back)

Listed in each packet under "Differs from the listing record":
- `guide-100-plays`: Etsy title "Baby and **Preschool** Ideas" → "Baby and **Toddler** Ideas"; Etsy tag "preschool at home" → "play ideas toddler"; KDP keyword "preschool activities at home" → "activities for toddlers at home" (§7 bans preschool words while school buyers are HELD). The Etsy description and first bullet drop the paperback wording, because that listing sells the PDF only.

## Open decisions (WARN in CHECKS.md)

- **D9 (pending):** the Family Kit's Etsy title and keywords say "Play First Then Screens". D9 concerns "first then board"; this is the kit's own phrase, but it contains "first then". Recommendation: if the founder answers REPLACE, retitle to "Play-First Family Kit ... Screens Have a Spot" before week 2.
- **KDP subtitle** says "Preschoolers" (it matches the cover). It is an age word, not a school-buyer word; keep unless the founder wants the cover changed.
- **KDP UK/CA/AU prices:** the growth plan's £7.99 / CA$12.99 / AU$14.99 would net below this book's $5.10 KDP floor; the packet recommends £13.99 / CA$22.99 / AU$26.99 (UNVERIFIED print costs and exchange rates).
- **Library name:** "Birth-to-5 Printable Library" contains "library" (a §7 word while library buyers are HELD). It is only on Gumroad, where no tags are used; rename only if the founder wants.
