# Gumroad packet 06: 52 Play & Talk Cards for Ages 0–5

**Live from:** G-day (a bundle part: live on Gumroad from G-day) · **Price:** $7.00 (the same everyday price as Etsy; no 'was' price, no offer codes for 90 days) · **Record:** `products/play-talk-cards/listing.json`

| Field | Paste |
|---|---|
| Product type | Digital product |
| Name | 52 Play & Talk Cards for Ages 0–5 |
| Price | $7.00 (pay-what-you-want off; 'allow customers to pay more' off) |
| URL | gumroad.com/l/`play-talk-cards` (or the shop's custom domain later) |
| Summary (the line under the title) | 52 printable play cards for ages 0–5: one play, one talk tip and a safety note on every card. Age-coded, no-cut pages, Letter + A4. |
| Thumbnail (square) | `products/play-talk-cards/preview/listing-images/01-hero.png` |
| Cover | `products/play-talk-cards/mockup.png` |
| Call to action | I want this! |
| Gumroad Discover | On |
| Offer codes / discounts | None |
| Tax (VAT/GST) | Gumroad handles it as merchant of record (UNVERIFIED setting name) |
| Analytics pixels / tracking | Off (no ad pixels anywhere, GROWTH-ENGINE §7) |
| Email opt-in at checkout | A separate, unticked box (Gumroad's own 'follow' / newsletter box if it offers one; UNVERIFIED) |

## Description (paste)
```
52 printable play cards for ages 0–5, in US Letter and A4 PDFs. Each card has one simple play and one talk tip in plain words, like “pause and wait,” “say what you see” or “offer a choice.”

Every play uses everyday things: a dish towel, a pot and spoon, a cardboard box, rolled-up socks. 46 of the 52 need nothing to buy. Each one shows its start age in months, prep time, mess level and usual play time. It also has a 2-minute version for tired days and a make-it-easier / make-it-harder pair.

The cards are sorted into four age colors, each with its own shape and word label: 0–12 months, 1–2, 2–3 and 3–5 years. There are 13 plays in each. Ages are a guide, never a deadline.

Prep takes about 20 minutes to print and cut, once. Most plays then take 0–2 minutes to set up. No time to cut? Play today from the no-cut pages. You also get a grown-up guide, type-in blank cards and a 52-week fridge checklist. Color and low-ink files, US Letter and A4.

Every play follows our published safety rules, and a grown-up plays along every time. These are ideas for everyday play and conversation, not medical or professional advice. Digital download: nothing ships. That’s about 13 cents a play.

Personal license for one household. Please don't resell or share the files.

How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.
```

## Files (Content tab), in this order
| # | File | Size | Source |
|---|---|---|---|
| 1 | `START-HERE.pdf` | 0.04 MB | `products/play-talk-cards/START-HERE.pdf` |
| 2 | `play-talk-cards.pdf` | 1.5 MB | `products/play-talk-cards/play-talk-cards.pdf` |
| 3 | `play-talk-cards-A4.pdf` | 1.51 MB | `products/play-talk-cards/play-talk-cards-A4.pdf` |
| 4 | `play-talk-cards-low-ink.pdf` | 1.57 MB | `products/play-talk-cards/play-talk-cards-low-ink.pdf` |
| 5 | `play-talk-cards-low-ink-A4.pdf` | 1.57 MB | `products/play-talk-cards/play-talk-cards-low-ink-A4.pdf` |

Stage them with `python3 ops/UPLOAD-PACKETS/stage.py gumroad 06`.

## Receipt / thank-you text (paste into the product's receipt or 'content' note)
```
Thank you for choosing 52 Play & Talk Cards for Ages 0–5!

Start with START HERE: it tells you which file to print first and takes about 2 minutes.
Download on a computer, or on a phone in a web browser. Your files stay in your Gumroad Library, so you can download them again any time.
Print at 100% / Actual size. Low-ink files save ink; A4 files are for printers outside the US.

Something won't open or print? Reply to this email and we'll fix it or refund it.

Next for your child's age: “I’m Bored” Play Cards (76 cards, ages 1–5) · Toddler Busy Book (74 activities, ages 1–5) (playbeforepixels.com/shop/).

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
2. `python3 ops/UPLOAD-PACKETS/stage.py gumroad 06` ends with OK.
3. New product > Digital product > paste name and price > Next.
4. Paste the summary and description; add thumbnail and cover; upload the staged files in order.
5. Paste the receipt text and refund text; Discover as in the table; no offer codes; publish.
6. Buy it once with a 100% test code that is deleted right after, or view it as a customer (Gumroad preview), and open every file.
7. Record the URL in ops/PUBLISHED.json and start `price_history` in the record.
