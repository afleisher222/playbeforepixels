# Etsy packet 08: 60 Visual Routine Cards for Toddlers: Starter Set with 3 Charts

**Upload slot:** Week 2 · **Status:** READY (waits for ops/PAUSE to be lifted and the shop to exist)  
**Record:** `products/visual-routine-cards/listing-starter.json` · **Price:** $5.00 (one everyday price; no 'was', compare-at or sale price; same price on Gumroad) · **SKU:** `visual-routine-cards-starter`

## Title (paste as is)
```
60 Visual Routine Cards for Toddlers, Editable Morning and Bedtime Picture Chart, Daily Schedule PDF, Play Before Pixels
```
120 characters.

## 13 tags (one per box)
```
toddler routine
visual routine cards
picture chart
morning routine
bedtime routine
toddler schedule
baby routine cards
routine chart
daily schedule kids
toddler printable
kids daily routine
potty routine
kids routine cards
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
| Category | Paper & Party Supplies > Paper > Calendars & Planners (or 'Chore charts') — UNVERIFIED. Type the product type in Etsy's category search and pick the closest children's activity / printable / planner category. Never a health, therapy or special-needs category. |
| Occasion | none |
| Holiday | none |
| Price | $5.00 |
| Quantity | 999 (Etsy's digital default; UNVERIFIED) |
| SKU | visual-routine-cards-starter |
| Personalization | Off |
| Shop section | Routine Cards |
| Renewal | Automatic |
| Processing / shipping | Instant download (no shipping profile) |
| Materials / production partner | None (made by the shop) |
| Etsy Ads for this listing | Off (GROWTH-ENGINE §7 item 1) |
| Offsite Ads (shop-level) | Off (decision D3) |
| Sale / discount / coupon | None (no percent-off in 2026; 90-day rule, §7 item 3) |

## Listing images, in this order (first = thumbnail)
| # | File | Alt text |
|---|---|---|
| 1 | `products/visual-routine-cards/preview/listing-images/starter/01-starter-cover.png` | 60 Visual Routine Cards Starter Set, ages 0–5: a sky-blue panel with the logo, the title, a vertical strip chart holding four cards, and big Sleep and Breakfast cards. |
| 2 | `products/visual-routine-cards/preview/listing-images/starter/02-starter-whats-inside.png` | All 60 Starter Set cards in a small grid, above three tiles: 60 cards, 3 charts and fillable fields. |
| 3 | `products/visual-routine-cards/preview/listing-images/starter/03-starter-grown-up-guide.png` | Two grown-up guide pages, slightly tilted: a Starter Set setup page with a four-card bedtime, and a page of talk tips. |
| 4 | `products/visual-routine-cards/preview/listing-images/starter/04-starter-in-use.png` | A morning chart filled with nine cards, next to an All done pocket holding Bath time and Pajamas cards, with a talk tip. |
| 5 | `products/visual-routine-cards/preview/listing-images/starter/05-how-to-download.png` | How to download: open Etsy in a web browser, go to Purchases, open the PDF in Adobe Acrobat Reader. The 5 files are listed, with a 2.2 inch card-size square. |

## Digital files to upload (in this order)
| Slot | Upload as | Size | Source |
|---|---|---|---|
| 1 | `1-START-HERE.pdf` | 0.06 MB | `products/visual-routine-cards/etsy-upload/starter/1-START-HERE.pdf` |
| 2 | `2-Color-US-Letter.pdf` | 2.05 MB | `products/visual-routine-cards/etsy-upload/starter/2-Color-US-Letter.pdf` |
| 3 | `3-Color-A4.pdf` | 2.05 MB | `products/visual-routine-cards/etsy-upload/starter/3-Color-A4.pdf` |
| 4 | `4-Low-Ink-US-Letter.pdf` | 2.7 MB | `products/visual-routine-cards/etsy-upload/starter/4-Low-Ink-US-Letter.pdf` |
| 5 | `5-Low-Ink-A4.pdf` | 2.7 MB | `products/visual-routine-cards/etsy-upload/starter/5-Low-Ink-A4.pdf` |

Stage everything for this listing (files + images, renamed in order) with `python3 ops/UPLOAD-PACKETS/stage.py etsy 08`.

## AI disclosure answers
- Etsy attribution: **Designed by Play Before Pixels**; AI tools used: **Yes** (etsy_ai_flag = True).
- What AI did: Claude (an AI model made by Anthropic), working in Claude Code, wrote the draft text (activities, talk lines, guide pages, safety notes and this listing), made the illustrations as flat vector art in code from the brand's own symbol library, and built the page layouts and PDF files with scripts.
- What people did: The founder, for AlphaPlay LLC, directs the product line and set the brand, safety and honesty rules (brand/BRAND.md) that every draft follows, and she gives the final go-ahead before anything is listed. As of 2026-09-28 no person has rewritten the text or redrawn the art, and the customer panel in panel.md was simulated, not real people. Still to be done by a person before release: rewrite the text in her own words, proof the cover and page 1, and check a printed copy (human_todo).
- Description line (already at the end of description.txt): "How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels."
- Never tick or write 'handmade', 'hand-drawn' or 'human-written'. Form wording is UNVERIFIED: answer truthfully in whatever words the form uses.

## 5-minute upload checklist
1. Confirm `ops/PAUSE` is gone and an APPROVED line exists for this listing (ops/APPROVALS.md). If not, stop.
2. Run `python3 ops/UPLOAD-PACKETS/stage.py etsy 08`; it prints the staging folder and must end with 'OK'.
3. Etsy Shop Manager > Listings > + Add a listing.
4. Photos: drag in the staged `images/` in numbered order; image 1 is the thumbnail. Paste each alt text if the form offers it.
5. Title: paste. Category: search and pick (see table). About this listing: I did / A finished product / 2020–2026.
6. Type: Digital. Upload the staged `files/` in numbered order (START HERE first).
7. AI disclosure: say AI tools were used and 'Designed by' the shop, as above.
8. Description: paste description.txt. Tags: paste the 13 tags. Section: Routine Cards.
9. Price $5.00, quantity 999, SKU `visual-routine-cards-starter`, personalization off, renewal automatic. No sale, no coupon.
10. Preview: the thumbnail reads well small, no image shows a web address, the description has no link. Publish.
11. Record the live listing URL and ID in ops/PUBLISHED.json and add `"price_history": [{"price": 5, "from": "<today>", "channel": "etsy"}]` to the record.
12. Replace `{{ETSY_LISTING_URL:visual-routine-cards-starter}}` in marketing/pins/pins.csv so this product's pins can go live.
