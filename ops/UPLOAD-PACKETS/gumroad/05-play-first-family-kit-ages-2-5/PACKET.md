# Gumroad packet 05: Play-First Family Kit, Ages 2–5: 9 Printable Tools

**Live from:** G-day (a bundle part: live on Gumroad from G-day) · **Price:** $11.00 (the same everyday price as Etsy; no 'was' price, no offer codes for 90 days) · **Record:** `products/play-first-family-kit/listing-g0.json`

| Field | Paste |
|---|---|
| Product type | Digital product |
| Name | Play-First Family Kit, Ages 2–5: 9 Printable Tools |
| Price | $11.00 (pay-what-you-want off; 'allow customers to pay more' off) |
| URL | gumroad.com/l/`family-kit` (or the shop's custom domain later) |
| Summary (the line under the title) | 9 printable tools for ages 2–5: picture checklists, together tokens, helping jobs, a family plan and a 30-day tracker. Fillable PDF, Letter + A4. |
| Thumbnail (square) | `products/play-first-family-kit/preview/listing-images/ages-2-5/01-cover.png` |
| Cover | `products/play-first-family-kit/mockup.png` |
| Call to action | I want this! |
| Gumroad Discover | On |
| Offer codes / discounts | None |
| Tax (VAT/GST) | Gumroad handles it as merchant of record (UNVERIFIED setting name) |
| Analytics pixels / tracking | Off (no ad pixels anywhere, GROWTH-ENGINE §7) |
| Email opt-in at checkout | A separate, unticked box (Gumroad's own 'follow' / newsletter box if it offers one; UNVERIFIED) |

## Description (paste)
```
The Play-First Family Kit for ages 2–5 has 9 printable tools, in a PDF you can type in: picture checklists, tokens, helping jobs and a family plan. It gives your day a kind shape: jobs first, then play and time together, then screens at their usual spot. Nothing is taken away; there's just more play.

The Play First, Then Screens checklist comes with big pictures for ages 2–5 and as a fillable blank. Each has 4 colorways and a Monday or Sunday start. Little ones also get a helping-jobs chart and a first-then-later Play-First Board.

The whole family gets 24 together tokens (12 ready-made, 12 blank) and six screen-spot cards, such as "5 more minutes" and "what we do next." There is a rules poster and a three-page Family Play & Screen Plan. A 30-day tracker holds 30 plays that need nothing to buy. Each has a starting age, easier and harder ways and a 2-minute version. A certificate marks the end.

Tokens are for play and time together, never screen minutes. The screen spot stays the same every day. A two-page grown-up guide covers a 2-minute setup, three talk lines and how it works from 2 to 5, plus printing, laminating and velcro tips. Every play follows our published safety rules.

You get color and low-ink files in US Letter and A4, with type-in fields for free Adobe Acrobat Reader. Instant download; nothing ships.

Personal license for one household. Please don't resell or share the files.

How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.
```

## Files (Content tab), in this order
| # | File | Size | Source |
|---|---|---|---|
| 1 | `START-HERE-ages-2-5.pdf` | 0.06 MB | `products/play-first-family-kit/START-HERE-ages-2-5.pdf` |
| 2 | `play-first-family-kit-ages-2-5.pdf` | 3.65 MB | `products/play-first-family-kit/play-first-family-kit-ages-2-5.pdf` |
| 3 | `play-first-family-kit-ages-2-5-a4.pdf` | 3.67 MB | `products/play-first-family-kit/play-first-family-kit-ages-2-5-a4.pdf` |
| 4 | `play-first-family-kit-ages-2-5-low-ink.pdf` | 3.12 MB | `products/play-first-family-kit/play-first-family-kit-ages-2-5-low-ink.pdf` |
| 5 | `play-first-family-kit-ages-2-5-low-ink-a4.pdf` | 3.14 MB | `products/play-first-family-kit/play-first-family-kit-ages-2-5-low-ink-a4.pdf` |

Stage them with `python3 ops/UPLOAD-PACKETS/stage.py gumroad 05`.

## Receipt / thank-you text (paste into the product's receipt or 'content' note)
```
Thank you for choosing Play-First Family Kit, Ages 2–5: 9 Printable Tools!

Start with START HERE: it tells you which file to print first and takes about 2 minutes.
Download on a computer, or on a phone in a web browser. Your files stay in your Gumroad Library, so you can download them again any time.
Print at 100% / Actual size. Low-ink files save ink; A4 files are for printers outside the US.

Something won't open or print? Reply to this email and we'll fix it or refund it.

Next for your child's age: 177 Visual Routine Cards (ages 0–5) · “I’m Bored” Play Cards (76 cards, ages 1–5) (playbeforepixels.com/shop/).

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
2. `python3 ops/UPLOAD-PACKETS/stage.py gumroad 05` ends with OK.
3. New product > Digital product > paste name and price > Next.
4. Paste the summary and description; add thumbnail and cover; upload the staged files in order.
5. Paste the receipt text and refund text; Discover as in the table; no offer codes; publish.
6. Buy it once with a 100% test code that is deleted right after, or view it as a customer (Gumroad preview), and open every file.
7. Record the URL in ops/PUBLISHED.json and start `price_history` in the record.
