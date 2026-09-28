# Gumroad packet 01: 74 Toddler Busy Book Activities for Ages 1–5

**Live from:** G-day · **Price:** $11.99 (the same everyday price as Etsy; no 'was' price, no offer codes for 90 days) · **Record:** `products/toddler-busy-book/listing.json`

| Field | Paste |
|---|---|
| Product type | Digital product |
| Name | 74 Toddler Busy Book Activities for Ages 1–5 |
| Price | $11.99 (pay-what-you-want off; 'allow customers to pay more' off) |
| URL | gumroad.com/l/`busy-book` (or the shop's custom domain later) |
| Summary (the line under the title) | 74 screen-free printable busy book activities for ages 1–5, sorted by age, with a talk line on every page. 49 no-cut pages; every piece 2 in or bigger. |
| Thumbnail (square) | `products/toddler-busy-book/preview/listing-images/listing-01.png` |
| Cover | `products/toddler-busy-book/mockup.png` |
| Call to action | I want this! |
| Gumroad Discover | On |
| Offer codes / discounts | None |
| Tax (VAT/GST) | Gumroad handles it as merchant of record (UNVERIFIED setting name) |
| Analytics pixels / tracking | Off (no ad pixels anywhere, GROWTH-ENGINE §7) |
| Email opt-in at checkout | A separate, unticked box (Gumroad's own 'follow' / newsletter box if it offers one; UNVERIFIED) |

## Description (paste)
```
74 printable busy book activities for ages 1–5, in three age bands (1–2, 2–3 and 3–5 years). You get Color and Low-ink PDFs in US Letter and A4. Each page gives you something to talk about, not just busy hands.

There are first words with big pictures, animal sounds, matching, and color and shape sorting. Kids match shadows and play pretend: pizza shop, café, post office and dress for the weather. They count, make patterns, tell first-next-last stories, rhyme and try eight mazes, easy to tricky.

Every page has a “talk while you play” line and a safety note. It also has an easier and a harder idea and a 2-minute version. Prep is 0 minutes for the 49 no-cut activities and 5–10 minutes for pages with pieces. Piece sheets use straight cuts, 12 pieces or fewer per sheet. Every piece is 2 in (5.1 cm) or bigger, larger than a toilet-paper tube. Every play follows our published safety rules.

Also inside: binder covers in four colors, spine and pouch labels, and a guide to put it together. Use a binder, laminated pages or velcro (ages 3–5 only). Add laminating tips, a weekly planner, make-your-own pages, a certificate and an answer key.

You can type into the covers, labels, planners, blank pages and certificate in a free PDF reader. That's about 16 cents a play. Printed words are in English. Digital download for your own home; nothing ships.

Personal license for one household. Please don't resell or share the files.

How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.
```

## Files (Content tab), in this order
| # | File | Size | Source |
|---|---|---|---|
| 1 | `toddler-busy-book-START-HERE.pdf` | 0.2 MB | `products/toddler-busy-book/toddler-busy-book-START-HERE.pdf` |
| 2 | `toddler-busy-book.pdf` | 4.75 MB | `products/toddler-busy-book/toddler-busy-book.pdf` |
| 3 | `toddler-busy-book-A4.pdf` | 4.74 MB | `products/toddler-busy-book/toddler-busy-book-A4.pdf` |
| 4 | `toddler-busy-book-low-ink-Letter.pdf` | 6.91 MB | `products/toddler-busy-book/toddler-busy-book-low-ink-Letter.pdf` |
| 5 | `toddler-busy-book-low-ink-A4.pdf` | 6.89 MB | `products/toddler-busy-book/toddler-busy-book-low-ink-A4.pdf` |
| 6 | `toddler-busy-book-PNG-templates.zip` | 0.45 MB | `products/toddler-busy-book/toddler-busy-book-PNG-templates.zip` |

Stage them with `python3 ops/UPLOAD-PACKETS/stage.py gumroad 01`.

## Receipt / thank-you text (paste into the product's receipt or 'content' note)
```
Thank you for choosing 74 Toddler Busy Book Activities for Ages 1–5!

Start with START HERE: it tells you which file to print first and takes about 2 minutes.
Download on a computer, or on a phone in a web browser. Your files stay in your Gumroad Library, so you can download them again any time.
Print at 100% / Actual size. Low-ink files save ink; A4 files are for printers outside the US.

Something won't open or print? Reply to this email and we'll fix it or refund it.

Next for your child's age: 100 Screen-Free Plays (ages 0–5) · “I’m Bored” Play Cards (76 cards, ages 1–5) (playbeforepixels.com/shop/).

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
2. `python3 ops/UPLOAD-PACKETS/stage.py gumroad 01` ends with OK.
3. New product > Digital product > paste name and price > Next.
4. Paste the summary and description; add thumbnail and cover; upload the staged files in order.
5. Paste the receipt text and refund text; Discover as in the table; no offer codes; publish.
6. Buy it once with a 100% test code that is deleted right after, or view it as a customer (Gumroad preview), and open every file.
7. Record the URL in ops/PUBLISHED.json and start `price_history` in the record.
