# Gumroad packet 03: 100 Screen-Free Plays for Ages 0–5

**Live from:** G-day · **Price:** $9.99 (the same everyday price as Etsy; no 'was' price, no offer codes for 90 days) · **Record:** `products/guide-100-plays/listing.json`

| Field | Paste |
|---|---|
| Product type | Digital product |
| Name | 100 Screen-Free Plays for Ages 0–5 |
| Price | $9.99 (pay-what-you-want off; 'allow customers to pay more' off) |
| URL | gumroad.com/l/`100-plays` (or the shop's custom domain later) |
| Summary (the line under the title) | 100 easy screen-free plays for ages 0–5, as a paperback or printable PDF. Each has prep and mess icons, easier and harder ideas, a talk line and a safety note. |
| Thumbnail (square) | `products/guide-100-plays/preview/listing-images/01-hero.png` |
| Cover | `products/guide-100-plays/mockup.png` |
| Call to action | I want this! |
| Gumroad Discover | On |
| Offer codes / discounts | None |
| Tax (VAT/GST) | Gumroad handles it as merchant of record (UNVERIFIED setting name) |
| Analytics pixels / tracking | Off (no ad pixels anywhere, GROWTH-ENGINE §7) |
| Email opt-in at checkout | A separate, unticked box (Gumroad's own 'follow' / newsletter box if it offers one; UNVERIFIED) |

## Description (paste)
```
100 Screen-Free Plays is a play book for ages 0–5, in paperback or as a printable PDF. A cup, a box, a sock, or nothing at all: each play uses what you have, from first smiles to "and then what happened?"

The plays are sorted into four color-coded age bands: 0–1, 1–2, 2–3 and 3–5. Each chapter opens with an "at a glance" page and a play-basket list. Every play shows the age it starts from, in months.

Every play has the same easy parts: what you need, prep, mess and play-time icons, and simple steps. Each has a way to make it easier, a way to make it harder, a "talk while you play" line and a safety note. 89 of the 100 plays need nothing to buy, and the pantry list shows what to gather.

You'll also find a Safety first page and a Quick finder for bath time, rainy days, kitchen time, car rides and wind-down. There are 12 tired-grown-up plays you can do from the couch and a sample screen-free day. And there are guilt-free ideas for when screens are on anyway. Every play follows our published safety rules.

The PDF comes in Color and Low-ink files, US Letter and A4, with planners you can type into in free Adobe Acrobat Reader: about 10¢ a play. The paperback has a black-and-white interior, with free full-color play pages through the link inside.

Parent education, not medical advice.

Personal license for one household. Please don't resell or share the files.

How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels.
```

## Files (Content tab), in this order
| # | File | Size | Source |
|---|---|---|---|
| 1 | `START-HERE.pdf` | 0.06 MB | `products/guide-100-plays/START-HERE.pdf` |
| 2 | `guide-100-plays-letter.pdf` | 2.56 MB | `products/guide-100-plays/guide-100-plays-letter.pdf` |
| 3 | `guide-100-plays-a4.pdf` | 2.51 MB | `products/guide-100-plays/guide-100-plays-a4.pdf` |
| 4 | `guide-100-plays-low-ink-letter.pdf` | 3.93 MB | `products/guide-100-plays/guide-100-plays-low-ink-letter.pdf` |
| 5 | `guide-100-plays-low-ink-a4.pdf` | 3.89 MB | `products/guide-100-plays/guide-100-plays-low-ink-a4.pdf` |

Stage them with `python3 ops/UPLOAD-PACKETS/stage.py gumroad 03`.

## Receipt / thank-you text (paste into the product's receipt or 'content' note)
```
Thank you for choosing 100 Screen-Free Plays for Ages 0–5!

Start with START HERE: it tells you which file to print first and takes about 2 minutes.
Download on a computer, or on a phone in a web browser. Your files stay in your Gumroad Library, so you can download them again any time.
Print at 100% / Actual size. Low-ink files save ink; A4 files are for printers outside the US.

Something won't open or print? Reply to this email and we'll fix it or refund it.

Next for your child's age: “I’m Bored” Play Cards (76 cards, ages 1–5) · 177 Visual Routine Cards (ages 0–5) (playbeforepixels.com/shop/).

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
2. `python3 ops/UPLOAD-PACKETS/stage.py gumroad 03` ends with OK.
3. New product > Digital product > paste name and price > Next.
4. Paste the summary and description; add thumbnail and cover; upload the staged files in order.
5. Paste the receipt text and refund text; Discover as in the table; no offer codes; publish.
6. Buy it once with a 100% test code that is deleted right after, or view it as a customer (Gumroad preview), and open every file.
7. Record the URL in ops/PUBLISHED.json and start `price_history` in the record.
