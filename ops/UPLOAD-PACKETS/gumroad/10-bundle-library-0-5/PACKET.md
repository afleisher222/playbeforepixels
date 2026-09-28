# Gumroad packet 10: Birth-to-5 Printable Library: 6 Printable Play Sets + Play Coupons

**Live from:** Week 2 (must be live by Oct 25 for the Black Friday bonus rule) · **Price:** $45.00 (the same everyday price as Etsy; no 'was' price, no offer codes for 90 days) · **Record:** `products/bundle-library-0-5/listing.json`

| Field | Paste |
|---|---|
| Product type | Digital product |
| Name | Birth-to-5 Printable Library: 6 Printable Play Sets + Play Coupons |
| Price | $45.00 (pay-what-you-want off; 'allow customers to pay more' off) |
| URL | gumroad.com/l/`library` (or the shop's custom domain later) |
| Summary (the line under the title) | Six printable play sets for ages 0–5, every stage from birth to 5 in one download, plus 16 play coupons. Color and low-ink, Letter and A4. |
| Thumbnail (square) | `products/bundle-library-0-5/preview/listing-images/listing-01.png` |
| Cover | `products/bundle-library-0-5/mockup.png` |
| Call to action | I want this! |
| Gumroad Discover | On |
| Offer codes / discounts | None |
| Tax (VAT/GST) | Gumroad handles it as merchant of record (UNVERIFIED setting name) |
| Analytics pixels / tracking | Off (no ad pixels anywhere, GROWTH-ENGINE §7) |
| Email opt-in at checkout | A separate, unticked box (Gumroad's own 'follow' / newsletter box if it offers one; UNVERIFIED) |

## 'Separately' figure
Show only as "$45.00, or $55.98 bought separately" and only while every counted part is live on Gumroad at its everyday price: Toddler Busy Book: $11.99 (toddler-busy-book); Play-First Family Kit: $11.00 (play-first-family-kit); I'm Bored Play Cards: $6.50 (bored-play-cards); Play and Talk Cards: $7.00 (play-talk-cards); Visual Routine Cards: $9.50 (visual-routine-cards); 100 Screen-Free Plays: $9.99 (guide-100-plays). Never a crossed-out or compare-at price.

## Description (paste)
```
Six printable play sets for ages 0–5, every stage from birth to 5, plus a book of play coupons, all included in one instant download from our own shop. Color and low-ink, US Letter and A4.

Inside: 100 Screen-Free Plays sorted by stage, 52 Play & Talk Cards (one for every week of the year), Visual Routine Cards with the ages 0–5 cards, the Toddler Busy Book with 74 activities, 76 “I’m Bored” play cards for ages 1–5, and the Play-First Family Kit with its ages 2–5 pages. The Play Coupons set, also included, adds 16 coupons for plays to do together.

Start with the set for your child’s age today; the rest waits until you need it. Every set has its own START HERE page, grown-up guide and safety page. Most plays use things you already have.

It is ready to give: a fold card and two “Surprise! Inside is…” reveal cards list every set, and the license passes to the family who receives it.

Every play follows our published safety rules. Digital files in English; nothing is shipped. Personal license for one household.

Giving it as a gift? The license passes to the family who receives it.

How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.
```

## Files (Content tab), in this order
| # | File | Size | Source |
|---|---|---|---|
| 1 | `START-HERE.pdf` | 0.06 MB | `products/bundle-library-0-5/START-HERE.pdf` |
| 2 | `Library-Pages.zip` | 1.95 MB | `built by stage.py from zip-manifest.json (store_download slot 2)` |
| 3 | `Toddler-Busy-Book.zip` | 24.23 MB | `built by stage.py from zip-manifest.json (store_download slot 3)` |
| 4 | `Play-First-Family-Kit.zip` | 13.64 MB | `built by stage.py from zip-manifest.json (store_download slot 4)` |
| 5 | `Bored-Play-Cards.zip` | 15.66 MB | `built by stage.py from zip-manifest.json (store_download slot 5)` |
| 6 | `Play-and-Talk-Cards.zip` | 6.19 MB | `built by stage.py from zip-manifest.json (store_download slot 6)` |
| 7 | `Visual-Routine-Cards.zip` | 35.09 MB | `built by stage.py from zip-manifest.json (store_download slot 7)` |
| 8 | `100-Screen-Free-Plays.zip` | 12.95 MB | `built by stage.py from zip-manifest.json (store_download slot 8)` |
| 9 | `Play-Coupons.zip` | 3.8 MB | `built by stage.py from zip-manifest.json (store_download slot 9)` |

Stage them with `python3 ops/UPLOAD-PACKETS/stage.py gumroad 10`.

## Receipt / thank-you text (paste into the product's receipt or 'content' note)
```
Thank you for choosing Birth-to-5 Printable Library: 6 Printable Play Sets + Play Coupons!

Start with START HERE: it tells you which file to print first and takes about 2 minutes.
Download on a computer, or on a phone in a web browser. Your files stay in your Gumroad Library, so you can download them again any time.
Print at 100% / Actual size. Low-ink files save ink; A4 files are for printers outside the US.

Something won't open or print? Reply to this email and we'll fix it or refund it.

Next for your child's age: 24 Days of Play: Winter Countdown (ages 2–5) · Ages 1–5 Instant Gift Bundle (playbeforepixels.com/shop/).

Know a family who'd like some play ideas? Our free printable is at playbeforepixels.com/free/

Parent education, not medical advice. Every play follows our published safety rules.
Play Before Pixels is a trade name of AlphaPlay LLC.
```

## Refund policy text (Settings > refund policy, and the product's FAQ)
```
Digital files can't be returned once downloaded, so digital products are generally non-refundable once the download has been accessed. We always fix or refund a file that is corrupted, incomplete, materially different from its description, or charged twice. EU and UK buyers keep any cancellation right their law gives them. Full policy: playbeforepixels.com/shipping-returns/
```
This matches legal/SHIPPING-RETURNS-REFUNDS.md Part B §3, which is still a DRAFT for attorney review (Gate A item 7). If the policy changes, change this text.

## 3-minute checklist
1. `ops/PAUSE` gone and an APPROVED line exists; otherwise stop.
2. `python3 ops/UPLOAD-PACKETS/stage.py gumroad 10` ends with OK.
3. New product > Digital product > paste name and price > Next.
4. Paste the summary and description; add thumbnail and cover; upload the staged files in order.
5. Paste the receipt text and refund text; Discover as in the table; no offer codes; publish.
6. Buy it once with a 100% test code that is deleted right after, or view it as a customer (Gumroad preview), and open every file.
7. Record the URL in ops/PUBLISHED.json and start `price_history` in the record.
