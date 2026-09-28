# Email: sign-up, welcome series and the monthly "3 plays" issue

_Play Before Pixels, a trade name of AlphaPlay LLC. Written September 28, 2026. Nothing here is sent: `ops/PAUSE` stays, no email account exists yet, and each sequence goes live only under an APPROVED line in `ops/APPROVALS.md` (ops/ROUTINE.md "Never")._

## Files
| File | What it is |
|---|---|
| `signup-and-double-opt-in.md` | Sign-up form, thank-you page, confirmation email, confirmed page |
| `welcome/01-welcome.md` … `05-your-monthly-plays.md` | 5-email welcome series (days 0, 2, 4, 7, 10 after confirming) |
| `monthly/3-plays-template.md` | The monthly "3 plays for your child's age" issue: one block per age band, plus a filled example |

The free printable the series delivers is `products/lead-magnet/` (Five 5-Minute Plays; record in `products/lead-magnet/magnet.json`).

## Rules every email here follows
- **Adults only, minimal data.** Email address, plus an optional birth month and year for the child. Never a child's name, photo or full birthday. Double opt-in before anything is sent.
- **Plain, warm, faceless.** No founder name, photo or story. Signed "Play Before Pixels". No talking-head video, no "day in my life".
- **One product mention per email at most.** Emails 1 and 5 mention none. Never a countdown timer, fake scarcity, "was" price or pressure line.
- **No health or outcome claims** and no diagnosis or condition wording, in body text or subject lines (BRAND hard rules 1 and 3; search-targeting rules; GROWTH-ENGINE §7 banned-word list). Never "milestones", "should", "behind", "delay", "catch up", "boost", "brain".
- **No-guilt test** (CUSTOMER-VOICE rule 12): add talk and play; never take away. Screens are never a reward or a punishment.
- **Footer on every email** (CAN-SPAM; COMPLIANCE-GATE 11): business name, `[BUSINESS MAILING ADDRESS]` (the USPS PO Box from `legal/ENTITY.md`, never a home address), why they are getting it, and a one-click unsubscribe.
- **Sources.** Sign-ups from research-hub pages (`src=hub`) get the free printable and the monthly plays, but no product mentions (BRAND search-targeting rules; founder decision D10). The email platform removes the product line for that tag.
- **Referral line: not included.** BRAND.md asks for a give-$5/get-$5 line in every email, but there is no referral program yet (GROWTH-ENGINE §4 and D4: no referral app before Shopify) and the course emails are held until that line is removed. Add it only when a real program exists [founder decision].

## Merge tags (rename to the chosen platform's syntax)
`{{confirm_link}}`, `{{printable_link}}`, `{{preferences_link}}`, `{{unsubscribe_link}}`, `{{product_link:<slug>}}`, `{{if age_band = "0-1"}} … {{endif}}` (age band computed by the platform from birth month and year; no band = the "all ages" block).

## Timing
Day 0 is the confirmation click. Welcome: day 0, 2, 4, 7, 10. The monthly issue starts the first send date after day 14, on the same day each month. A buyer who is also on the list gets the after-purchase emails instead of any welcome email that mentions the same product.

## Before switching anything on (founder)
1. Choose the email platform; switch on double opt-in, one-click unsubscribe and the hub-tag rule; switch off open tracking where the platform allows it [UNVERIFIED].
2. Rent the PO Box and replace `[BUSINESS MAILING ADDRESS]` in the platform's footer (never in this repository).
3. Read the five emails and the template, rewrite anything in your own words, and add an APPROVED line to `ops/APPROVALS.md`.
