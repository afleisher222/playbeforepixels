# Gumroad packet 04: 76 “I’m Bored” Play Cards for Ages 1–5

**Live from:** G-day · **Price:** $6.50 (the same everyday price as Etsy; no 'was' price, no offer codes for 90 days) · **Record:** `products/bored-play-cards/listing-g0.json`

| Field | Paste |
|---|---|
| Product type | Digital product |
| Name | 76 “I’m Bored” Play Cards for Ages 1–5 |
| Price | $6.50 (pay-what-you-want off; 'allow customers to pay more' off) |
| URL | gumroad.com/l/`bored-cards` (or the shop's custom domain later) |
| Summary (the line under the title) | 76 printable play cards for ages 1–5, sorted by age and energy. Each has what you need, a talk line and a safety line. PDF in Letter and A4. |
| Thumbnail (square) | `products/bored-play-cards/preview/listing-images/ages-1-5/listing-01.png` |
| Cover | `products/bored-play-cards/mockup.png` |
| Call to action | I want this! |
| Gumroad Discover | On |
| Offer codes / discounts | None |
| Tax (VAT/GST) | Gumroad handles it as merchant of record (UNVERIFIED setting name) |
| Analytics pixels / tracking | Off (no ad pixels anywhere, GROWTH-ENGINE §7) |
| Email opt-in at checkout | A separate, unticked box (Gumroad's own 'follow' / newsletter box if it offers one; UNVERIFIED) |

## Description (paste)
```
76 printable play cards for ages 1–5, in two age bands: 1–3 and 3–5. It is a PDF download in US Letter and A4.

When your child says “I’m bored,” pull a card and play. Most cards use things you already have: pots, socks, boxes and paper. 70 of the 76 cards need nothing to buy.

Each card has an age band and a starting age. It shows the energy level: calm, medium or wiggly. It lists what you need, prep time, mess and a rough play time. It gives short steps, one thing to say while you play, and a safety line. Every card says “With a grown-up.”

A two-page grown-up guide shows how to start in two minutes. It has three talk tips and a pantry list. The card index gives an easier way, a harder way and a 2-minute tired-grown-up way for every card.

You also get 14 blank cards, card backs, 20 box dividers, 12 jar labels, a Play Menu, weekly planners and a fridge certificate.

You get five PDFs: START HERE, color and low-ink, each in Letter and A4. In the color files you can type in the blank cards, labels, dividers, planners and certificate. You can type text and tick circles. You can’t change fonts, colors or pictures.

Every play follows our published safety rules. Digital file in English; nothing is shipped. Personal license for one household.

Please don't resell or share the files.

How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.
```

## Files (Content tab), in this order
| # | File | Size | Source |
|---|---|---|---|
| 1 | `START-HERE-ages-1-5.pdf` | 0.07 MB | `products/bored-play-cards/START-HERE-ages-1-5.pdf` |
| 2 | `bored-play-cards-ages-1-5.pdf` | 3.86 MB | `products/bored-play-cards/bored-play-cards-ages-1-5.pdf` |
| 3 | `bored-play-cards-ages-1-5-A4.pdf` | 3.87 MB | `products/bored-play-cards/bored-play-cards-ages-1-5-A4.pdf` |
| 4 | `bored-play-cards-ages-1-5-low-ink.pdf` | 3.93 MB | `products/bored-play-cards/bored-play-cards-ages-1-5-low-ink.pdf` |
| 5 | `bored-play-cards-ages-1-5-low-ink-A4.pdf` | 3.93 MB | `products/bored-play-cards/bored-play-cards-ages-1-5-low-ink-A4.pdf` |

Stage them with `python3 ops/UPLOAD-PACKETS/stage.py gumroad 04`.

## Receipt / thank-you text (paste into the product's receipt or 'content' note)
```
Thank you for choosing 76 “I’m Bored” Play Cards for Ages 1–5!

Start with START HERE: it tells you which file to print first and takes about 2 minutes.
Download on a computer, or on a phone in a web browser. Your files stay in your Gumroad Library, so you can download them again any time.
Print at 100% / Actual size. Low-ink files save ink; A4 files are for printers outside the US.

Something won't open or print? Reply to this email and we'll fix it or refund it.

Next for your child's age: 52 Play & Talk Cards (ages 0–5) · Toddler Busy Book (74 activities, ages 1–5) (playbeforepixels.com/shop/).

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
2. `python3 ops/UPLOAD-PACKETS/stage.py gumroad 04` ends with OK.
3. New product > Digital product > paste name and price > Next.
4. Paste the summary and description; add thumbnail and cover; upload the staged files in order.
5. Paste the receipt text and refund text; Discover as in the table; no offer codes; publish.
6. Buy it once with a 100% test code that is deleted right after, or view it as a customer (Gumroad preview), and open every file.
7. Record the URL in ops/PUBLISHED.json and start `price_history` in the record.
