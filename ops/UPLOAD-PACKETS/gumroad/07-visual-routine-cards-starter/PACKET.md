# Gumroad packet 07: 60 Visual Routine Cards for Toddlers: Starter Set with 3 Charts

**Live from:** Week 2 · **Price:** $5.00 (the same everyday price as Etsy; no 'was' price, no offer codes for 90 days) · **Record:** `products/visual-routine-cards/listing-starter.json`

| Field | Paste |
|---|---|
| Product type | Digital product |
| Name | 60 Visual Routine Cards for Toddlers: Starter Set with 3 Charts |
| Price | $5.00 (pay-what-you-want off; 'allow customers to pay more' off) |
| URL | gumroad.com/l/`routine-starter` (or the shop's custom domain later) |
| Summary (the line under the title) | 60 printable routine picture cards for ages 0–5, plus a strip, a two-step picture board and a morning chart. Fillable PDF, US Letter + A4. |
| Thumbnail (square) | `products/visual-routine-cards/preview/listing-images/starter/01-starter-cover.png` |
| Cover | `products/visual-routine-cards/mockup.png` |
| Call to action | I want this! |
| Gumroad Discover | Off (a Discover sale would net under the $3.00 floor; UNVERIFIED fees) |
| Offer codes / discounts | None |
| Tax (VAT/GST) | Gumroad handles it as merchant of record (UNVERIFIED setting name) |
| Analytics pixels / tracking | Off (no ad pixels anywhere, GROWTH-ENGINE §7) |
| Email opt-in at checkout | A separate, unticked box (Gumroad's own 'follow' / newsletter box if it offers one; UNVERIFIED) |

## Description (paste)
```
60 printable routine picture cards for ages 0–5, with three charts, in US Letter and A4 PDFs. It's a simple place to start. The cards cover a little one's day: waking up, potty, getting dressed, meals and play. Others show outside time, reading together, bath, bedtime, helping jobs and a feelings check-in. There are plan words too, like First, Then and Wait. A "Play first / Screens later" pair uses a plain, generic tablet, with no brands and no apps.

Use one card at a time with a baby, or two on the first–then board with a toddler. A preschooler can use a morning chart of up to nine steps. Your child points to each picture and moves it to "All done."

You get the cards in the color-coded Rainbow look and in a Low-ink file with line art to color. There are second copies of the busiest cards, plus blank, word-free and photo-frame cards. The three charts come ready-made and blank. Type labels and titles in free Adobe Acrobat Reader. A 2-page grown-up guide covers setup in 2 minutes and easy talk tips. Every card follows our published safety rules.

Want more? The Ages 0–5 Edition has 181 cards. It adds 6 chart layouts and 4 colorways.

Instant digital download. No physical item ships.

Personal license for one household. Please don't resell or share the files.

How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.
```

## Files (Content tab), in this order
| # | File | Size | Source |
|---|---|---|---|
| 1 | `START-HERE-starter.pdf` | 0.06 MB | `products/visual-routine-cards/START-HERE-starter.pdf` |
| 2 | `visual-routine-cards-starter-letter.pdf` | 2.06 MB | `products/visual-routine-cards/visual-routine-cards-starter-letter.pdf` |
| 3 | `visual-routine-cards-starter-a4.pdf` | 2.05 MB | `products/visual-routine-cards/visual-routine-cards-starter-a4.pdf` |
| 4 | `visual-routine-cards-starter-low-ink-letter.pdf` | 2.69 MB | `products/visual-routine-cards/visual-routine-cards-starter-low-ink-letter.pdf` |
| 5 | `visual-routine-cards-starter-low-ink-a4.pdf` | 2.7 MB | `products/visual-routine-cards/visual-routine-cards-starter-low-ink-a4.pdf` |

Stage them with `python3 ops/UPLOAD-PACKETS/stage.py gumroad 07`.

## Receipt / thank-you text (paste into the product's receipt or 'content' note)
```
Thank you for choosing 60 Visual Routine Cards for Toddlers: Starter Set with 3 Charts!

Start with START HERE: it tells you which file to print first and takes about 2 minutes.
Download on a computer, or on a phone in a web browser. Your files stay in your Gumroad Library, so you can download them again any time.
Print at 100% / Actual size. Low-ink files save ink; A4 files are for printers outside the US.

Something won't open or print? Reply to this email and we'll fix it or refund it.

Next for your child's age: 177 Visual Routine Cards (ages 0–5) · Play-First Family Kit (ages 2–5) (playbeforepixels.com/shop/).

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
2. `python3 ops/UPLOAD-PACKETS/stage.py gumroad 07` ends with OK.
3. New product > Digital product > paste name and price > Next.
4. Paste the summary and description; add thumbnail and cover; upload the staged files in order.
5. Paste the receipt text and refund text; Discover as in the table; no offer codes; publish.
6. Buy it once with a 100% test code that is deleted right after, or view it as a customer (Gumroad preview), and open every file.
7. Record the URL in ops/PUBLISHED.json and start `price_history` in the record.
