# Gumroad packet 02: 177 Visual Routine Cards for Ages 0–5: Morning, Meals, Play and Bedtime Charts

**Live from:** G-day · **Price:** $9.50 (the same everyday price as Etsy; no 'was' price, no offer codes for 90 days) · **Record:** `products/visual-routine-cards/listing-g0.json`

| Field | Paste |
|---|---|
| Product type | Digital product |
| Name | 177 Visual Routine Cards for Ages 0–5: Morning, Meals, Play and Bedtime Charts |
| Price | $9.50 (pay-what-you-want off; 'allow customers to pay more' off) |
| URL | gumroad.com/l/`routine-cards` (or the shop's custom domain later) |
| Summary (the line under the title) | 177 printable routine picture cards and 6 charts for ages 0–5. Fillable PDF, Color and Low-ink, US Letter + A4. Helps little ones see what comes next. |
| Thumbnail (square) | `products/visual-routine-cards/preview/listing-images/ages-0-5/01-cover.png` |
| Cover | `products/visual-routine-cards/mockup.png` |
| Call to action | I want this! |
| Gumroad Discover | On |
| Offer codes / discounts | None |
| Tax (VAT/GST) | Gumroad handles it as merchant of record (UNVERIFIED setting name) |
| Analytics pixels / tracking | Off (no ad pixels anywhere, GROWTH-ENGINE §7) |
| Email opt-in at checkout | A separate, unticked box (Gumroad's own 'follow' / newsletter box if it offers one; UNVERIFIED) |

## Description (paste)
```
177 printable routine picture cards for ages 0–5, with 6 charts, in US Letter and A4 PDFs. Big, friendly pictures show little ones what comes next at mornings, meals, bath and bedtime. Your child can point to them, carry them and move them to "All done."

The cards cover morning, meals, play, outside, reading together, bath, bedtime, helping jobs, and out and about. There are plan words like More, Stop, My turn and Break, and a feelings check-in. A "Play first / Screens later" pair uses a plain, generic tablet. "What we do next" and "5 more minutes" cards help with the switch.

Choose from 6 chart layouts: two strips, a First–Then board, morning and bedtime charts and a Today board. Every chart comes ready-made and blank, with a Monday or Sunday start.

Make it yours: type labels, titles and names in free Adobe Acrobat Reader, in any language with accents. Or use the word-free, blank and photo-frame cards. Busy cards come twice. Rainbow, Soft and Navy looks are in the Color file. Simple line art is in the Low-ink file.

A 2-page grown-up guide covers setup in 2 minutes (start with just 2 pages tonight), easy talk tips and use by age. Every card follows our published safety rules.

Instant digital download. No physical item ships.

Personal license for one household. Please don't resell or share the files.

How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.
```

## Files (Content tab), in this order
| # | File | Size | Source |
|---|---|---|---|
| 1 | `START-HERE-0-5.pdf` | 0.06 MB | `products/visual-routine-cards/START-HERE-0-5.pdf` |
| 2 | `visual-routine-cards-0-5.pdf` | 10.41 MB | `products/visual-routine-cards/visual-routine-cards-0-5.pdf` |
| 3 | `visual-routine-cards-0-5-a4.pdf` | 10.39 MB | `products/visual-routine-cards/visual-routine-cards-0-5-a4.pdf` |
| 4 | `visual-routine-cards-0-5-low-ink.pdf` | 7.11 MB | `products/visual-routine-cards/visual-routine-cards-0-5-low-ink.pdf` |
| 5 | `visual-routine-cards-0-5-low-ink-a4.pdf` | 7.12 MB | `products/visual-routine-cards/visual-routine-cards-0-5-low-ink-a4.pdf` |

Stage them with `python3 ops/UPLOAD-PACKETS/stage.py gumroad 02`.

## Receipt / thank-you text (paste into the product's receipt or 'content' note)
```
Thank you for choosing 177 Visual Routine Cards for Ages 0–5: Morning, Meals, Play and Bedtime Charts!

Start with START HERE: it tells you which file to print first and takes about 2 minutes.
Download on a computer, or on a phone in a web browser. Your files stay in your Gumroad Library, so you can download them again any time.
Print at 100% / Actual size. Low-ink files save ink; A4 files are for printers outside the US.

Something won't open or print? Reply to this email and we'll fix it or refund it.

Next for your child's age: Play-First Family Kit (ages 2–5) · “I’m Bored” Play Cards (76 cards, ages 1–5) (playbeforepixels.com/shop/).

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
2. `python3 ops/UPLOAD-PACKETS/stage.py gumroad 02` ends with OK.
3. New product > Digital product > paste name and price > Next.
4. Paste the summary and description; add thumbnail and cover; upload the staged files in order.
5. Paste the receipt text and refund text; Discover as in the table; no offer codes; publish.
6. Buy it once with a 100% test code that is deleted right after, or view it as a customer (Gumroad preview), and open every file.
7. Record the URL in ops/PUBLISHED.json and start `price_history` in the record.
