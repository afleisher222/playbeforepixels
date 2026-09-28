# Rebuild: picture-laps-not-apps (Laps Not Apps, personalized), 2026-09-28

**Status:** `ready-pending-accounts`. It is not in the G0 launch list. It still needs:
- the store accounts
- a printer account and a unit-cost quote
- the founder's WORDS.md rewrite (42 sections are still marked draft; the empty author note is simply left out of the book)

**Rebuilt with the adopted logo.** The build notes were followed (`node build.js`, `--template` and every render) to rebuild:
- the sample book and the interior-only file
- the hardcover and softcover sample wraps and `template-variables.pdf`
- `cover.png`, `picker.png`, `mockup.png` and the previews

Per-order files are built by `personalize.js`/`render-order.js` from the same `build.js`, so they pick up the logo automatically.

**Licenses.** The book never offered one. In the FAQ, "Can I buy a copy for a whole class or group?" now says class, school and group orders are not available yet. The quote-form offer was removed.

**Bracketed notes removed from the FAQ.**
- Shipping time `[VERIFY…]`
- Packing slip `[VERIFY…]`
- Reprint policy `[VERIFY…]`

The "note from the author" promise was also removed, because that page is empty and left out of the book. In `channels`, the `[VERIFY]` tags became UNVERIFIED notes.

**Fonts.** No Type 3 fonts. `check_fonts.js`: 0 problems.

**listing.json: net per unit filled (UNVERIFIED estimates).**

| Channel | Net | Margin |
|---|---|---|
| Own-site hardcover | $17.93 | 51% |
| Own-site softcover | $14.72 | 59% |
| Etsy hardcover | $15.47 | 44% |
| Etsy softcover | $12.92 | 52% |

- Assumed printer cost: $14.00 hardcover, $8.00 softcover. Shipping is charged separately.
- The Offsite-Ads rows are null because Offsite Ads stay OFF (D3). An Offsite Ads sale would net $10.22 on the hardcover, under the $10.50 floor, so the notes say to raise the hardcover to $39.99 if Offsite Ads ever become mandatory.
- `status` and `status_notes` added. Price $34.99 / $24.99, `price_floor` 10.50 and `ai_disclosure` unchanged.

**Tests.** `check_listings.py` 0 FAIL / 0 WARN; PyMuPDF scan clean; `unchanged_renders.py --restore` run.
