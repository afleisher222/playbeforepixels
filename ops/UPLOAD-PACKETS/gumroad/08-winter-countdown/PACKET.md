# Gumroad packet 08: 24 Days of Play: Winter Countdown, Ages 2–5

**Live from:** Week 2 (unpublish Dec 5) · **Price:** $6.50 (the same everyday price as Etsy; no 'was' price, no offer codes for 90 days) · **Record:** `products/winter-countdown/listing.json`

| Field | Paste |
|---|---|
| Product type | Digital product |
| Name | 24 Days of Play: Winter Countdown, Ages 2–5 |
| Price | $6.50 (pay-what-you-want off; 'allow customers to pay more' off) |
| URL | gumroad.com/l/`winter-countdown` (or the shop's custom domain later) |
| Summary (the line under the title) | 24 winter plays for ages 2–5, one a day, from things you already have. Talk line and safety line on every card. PDF, Letter and A4. |
| Thumbnail (square) | `products/winter-countdown/preview/listing-images/listing-01.png` |
| Cover | `products/winter-countdown/mockup.png` |
| Call to action | I want this! |
| Gumroad Discover | On |
| Offer codes / discounts | None |
| Tax (VAT/GST) | Gumroad handles it as merchant of record (UNVERIFIED setting name) |
| Analytics pixels / tracking | Off (no ad pixels anywhere, GROWTH-ENGINE §7) |
| Email opt-in at checkout | A separate, unticked box (Gumroad's own 'follow' / newsletter box if it offers one; UNVERIFIED) |

## Description (paste)
```
24 winter plays for ages 2–5, one a day. It is a printable PDF in US Letter and A4, with color and low-ink files.

Winter days can be long and dark. Each card gives the day one small, warm play: paper snowball toss, a blanket bear cave, an ice rescue, a flashlight shadow show, a cozy book nest. 22 of the 24 use only things most homes have.

Every card shows a starting age in months, prep, mess and a rough play time. It has short steps, one thing to say while you play, an easier way, a harder way, a 2-minute version for tired days and its own safety line.

Hang the countdown board and color a circle after each play. Or skip the cutting and read each day from the list page. Start any day, skip days, or play a favorite twice.

It is a winter countdown for any family: snow, cold and long nights. It is not tied to any holiday or faith.

You get a 2-page grown-up guide, safety rules, a what-you-need list, a blank board, 24 number tags and a fridge certificate. Type in the blank board and certificate with a free PDF reader.

Every play follows our published safety rules. Digital file in English; nothing is shipped. Personal license for one household.

Please don't resell or share the files.

How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.
```

## Files (Content tab), in this order
| # | File | Size | Source |
|---|---|---|---|
| 1 | `START-HERE.pdf` | 0.07 MB | `products/winter-countdown/START-HERE.pdf` |
| 2 | `winter-countdown.pdf` | 1.63 MB | `products/winter-countdown/winter-countdown.pdf` |
| 3 | `winter-countdown-A4.pdf` | 1.63 MB | `products/winter-countdown/winter-countdown-A4.pdf` |
| 4 | `winter-countdown-low-ink.pdf` | 2.59 MB | `products/winter-countdown/winter-countdown-low-ink.pdf` |
| 5 | `winter-countdown-low-ink-A4.pdf` | 2.59 MB | `products/winter-countdown/winter-countdown-low-ink-A4.pdf` |

Stage them with `python3 ops/UPLOAD-PACKETS/stage.py gumroad 08`.

## Receipt / thank-you text (paste into the product's receipt or 'content' note)
```
Thank you for choosing 24 Days of Play: Winter Countdown, Ages 2–5!

Start with START HERE: it tells you which file to print first and takes about 2 minutes.
Download on a computer, or on a phone in a web browser. Your files stay in your Gumroad Library, so you can download them again any time.
Print at 100% / Actual size. Low-ink files save ink; A4 files are for printers outside the US.

Something won't open or print? Reply to this email and we'll fix it or refund it.

Next for your child's age: Toddler Busy Book (74 activities, ages 1–5) · Ages 1–5 Instant Gift Bundle (playbeforepixels.com/shop/).

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
2. `python3 ops/UPLOAD-PACKETS/stage.py gumroad 08` ends with OK.
3. New product > Digital product > paste name and price > Next.
4. Paste the summary and description; add thumbnail and cover; upload the staged files in order.
5. Paste the receipt text and refund text; Discover as in the table; no offer codes; publish.
6. Buy it once with a 100% test code that is deleted right after, or view it as a customer (Gumroad preview), and open every file.
7. Record the URL in ops/PUBLISHED.json and start `price_history` in the record.
