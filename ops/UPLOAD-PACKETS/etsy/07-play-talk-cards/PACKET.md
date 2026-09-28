# Etsy packet 07: 52 Play & Talk Cards for Ages 0–5

**Upload slot:** Week 2 · **Status:** READY (waits for ops/PAUSE to be lifted and the shop to exist)  
**Record:** `products/play-talk-cards/listing.json` · **Price:** $7.00 (one everyday price; no 'was', compare-at or sale price; same price on Gumroad) · **SKU:** `play-talk-cards`

## Title (paste as is)
```
52 Play and Talk Cards for Ages 0-5, Printable Toddler and Baby Activities, Screen-Free Ideas with Tips, Play Before Pixels
```
123 characters.

## 13 tags (one per box)
```
toddler activities
play cards printable
baby play ideas
toddler play cards
kids play ideas
screen free play
activity cards kids
talk while you play
toddler printable
baby activity cards
toddler play ideas
rainy day activities
parenting printable
```

## Description
Paste the whole of `description.txt` (in this folder). It carries no web address, QR code or outside-store mention (COMPLIANCE-GATE 16), ends with the AI line, and states the license, refund and download steps.

## Listing details and attributes
| Field | Answer |
|---|---|
| Listing type | Digital files (instant download) |
| About this listing: Who made it? | I did (see AI disclosure below; the form wording is UNVERIFIED) |
| What is it? | A finished product |
| When was it made? | 2020–2026 (or 'Made to order' is NOT used: the file already exists) |
| Category | Toys & Games > Games & Puzzles > Card Games (or Learning & School) — UNVERIFIED. Type the product type in Etsy's category search and pick the closest children's activity / printable / planner category. Never a health, therapy or special-needs category. |
| Occasion | none |
| Holiday | none |
| Price | $7.00 |
| Quantity | 999 (Etsy's digital default; UNVERIFIED) |
| SKU | play-talk-cards |
| Personalization | Off |
| Shop section | Play Cards |
| Renewal | Automatic |
| Processing / shipping | Instant download (no shipping profile) |
| Materials / production partner | None (made by the shop) |
| Etsy Ads for this listing | Off (GROWTH-ENGINE §7 item 1) |
| Offsite Ads (shop-level) | Off (decision D3) |
| Sale / discount / coupon | None (no percent-off in 2026; 90-day rule, §7 item 3) |

## Listing images, in this order (first = thumbnail)
| # | File | Alt text |
|---|---|---|
| 1 | `products/play-talk-cards/preview/listing-images/01-hero.png` | (use the first line of the description) |
| 2 | `products/play-talk-cards/preview/listing-images/02-every-card.png` | (use the first line of the description) |
| 3 | `products/play-talk-cards/preview/listing-images/03-age-coded.png` | (use the first line of the description) |
| 4 | `products/play-talk-cards/preview/listing-images/04-print-at-home.png` | (use the first line of the description) |
| 5 | `products/play-talk-cards/preview/listing-images/05-talk-moves.png` | (use the first line of the description) |
| 6 | `products/play-talk-cards/preview/listing-images/06-whats-included.png` | (use the first line of the description) |
| 7 | `products/play-talk-cards/preview/listing-images/07-safety.png` | (use the first line of the description) |
| 8 | `products/play-talk-cards/preview/listing-images/08-grow-with-it.png` | (use the first line of the description) |

## Digital files to upload (in this order)
| Slot | Upload as | Size | Source |
|---|---|---|---|
| 1 | `1-START-HERE.pdf` | 0.04 MB | `products/play-talk-cards/etsy-upload/1-START-HERE.pdf` |
| 2 | `2-Color-US-Letter.pdf` | 1.49 MB | `products/play-talk-cards/etsy-upload/2-Color-US-Letter.pdf` |
| 3 | `3-Color-A4.pdf` | 1.5 MB | `products/play-talk-cards/etsy-upload/3-Color-A4.pdf` |
| 4 | `4-Low-Ink-US-Letter.pdf` | 1.56 MB | `products/play-talk-cards/etsy-upload/4-Low-Ink-US-Letter.pdf` |
| 5 | `5-Low-Ink-A4.pdf` | 1.57 MB | `products/play-talk-cards/etsy-upload/5-Low-Ink-A4.pdf` |

Stage everything for this listing (files + images, renamed in order) with `python3 ops/UPLOAD-PACKETS/stage.py etsy 07`.

## AI disclosure answers
- Etsy attribution: **Designed by Play Before Pixels**; AI tools used: **Yes** (etsy_ai_flag = True).
- What AI did: Claude (an AI model made by Anthropic), working in Claude Code, wrote the draft text (activities, talk lines, guide pages, safety notes and this listing), made the illustrations as flat vector art in code from the brand's own symbol library, and built the page layouts and PDF files with scripts.
- What people did: The founder, for AlphaPlay LLC, directs the product line and set the brand, safety and honesty rules (brand/BRAND.md) that every draft follows, and she gives the final go-ahead before anything is listed. As of 2026-09-28 no person has rewritten the text or redrawn the art, and the customer panel in panel.md was simulated, not real people. Still to be done by a person before release: rewrite the text in her own words, proof the cover and page 1, and check a printed copy (human_todo).
- Description line (already at the end of description.txt): "How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels."
- Never tick or write 'handmade', 'hand-drawn' or 'human-written'. Form wording is UNVERIFIED: answer truthfully in whatever words the form uses.

## 5-minute upload checklist
1. Confirm `ops/PAUSE` is gone and an APPROVED line exists for this listing (ops/APPROVALS.md). If not, stop.
2. Run `python3 ops/UPLOAD-PACKETS/stage.py etsy 07`; it prints the staging folder and must end with 'OK'.
3. Etsy Shop Manager > Listings > + Add a listing.
4. Photos: drag in the staged `images/` in numbered order; image 1 is the thumbnail. Paste each alt text if the form offers it.
5. Title: paste. Category: search and pick (see table). About this listing: I did / A finished product / 2020–2026.
6. Type: Digital. Upload the staged `files/` in numbered order (START HERE first).
7. AI disclosure: say AI tools were used and 'Designed by' the shop, as above.
8. Description: paste description.txt. Tags: paste the 13 tags. Section: Play Cards.
9. Price $7.00, quantity 999, SKU `play-talk-cards`, personalization off, renewal automatic. No sale, no coupon.
10. Preview: the thumbnail reads well small, no image shows a web address, the description has no link. Publish.
11. Record the live listing URL and ID in ops/PUBLISHED.json and add `"price_history": [{"price": 7, "from": "<today>", "channel": "etsy"}]` to the record.
12. Replace `{{ETSY_LISTING_URL:play-talk-cards}}` in marketing/pins/pins.csv so this product's pins can go live.
