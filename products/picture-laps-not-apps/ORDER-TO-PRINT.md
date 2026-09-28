# Laps Not Apps (personalized): order-to-print workflow

**Status: designed and tested locally. Nothing is connected yet.** Every item marked [VERIFY] must be checked on the live service before the first real sale. The goal is no manual step: an order comes in, a name-stamped PDF is made, a printer prints and ships it, and tracking goes back to the customer. The founder never touches a book.

## 1. The flow

```
Shopify order (line-item fields)  ─┐
                                    ├─> every 15 min: scheduled job (GitHub Actions in this repo)
Etsy order (variations + text box) ─┘        1. fetch paid, unshipped Laps Not Apps orders placed at least 2 hours ago
                                                 (the spelling-fix window promised in section 6)
                                              2. turn each into order.json with "channel": "shopify" or "etsy"
                                                 (personalize.js checks it; etsy = Etsy edition, no URL or QR)
                                              3. node build.js --order order.json --out orders/<id> --cover-w --cover-h --spine
                                              4. node render-order.js orders/<id>   → interior.pdf + cover.pdf, fit check
                                              5. upload both PDFs to private storage → 7-day signed URLs
                                              6. create the print job at the printer (Lulu Print API)
                                              7. printer ships → tracking number → mark shipped in Shopify/Etsy
                                                  (the store sends the customer its own shipping email)
            any problem at steps 2–6 → review queue (weekly check), order is NOT printed
```

Exit codes the job reads: `build.js` 2 = bad order data, 3 = founder's words not finished (human-authorship gate), 4 = built but needs review; `render-order.js` 5 = name or message did not fit. Only exit 0 from both goes to the printer.

## 2. Which printer

| | Lulu Print API (recommended first) | Gelato API (backup / EU-UK printing) |
|---|---|---|
| Per-order files | Yes: each print job takes its own interior and cover PDF by URL [VERIFY] | Yes: each order item takes its own file URL [VERIFY] |
| 8.5 × 8.5 in square | Casewrap hardcover and paperback both listed [VERIFY] | Photo books are metric sizes (e.g. 21 × 21 cm / about 8.25 in); 8.5 in likely not offered [VERIFY]. Would need a re-sized layout. |
| 32 pages | Casewrap and perfect-bound minimums [VERIFY] | Page-count steps for photo books [VERIFY] |
| Cover size | Its API returns exact cover dimensions for a product and page count (the cover-dimensions endpoint) [VERIFY], so `--cover-w/--cover-h/--spine` come straight from the printer | From its product catalog [VERIFY] |
| Sandbox for testing | Yes (separate sandbox site and keys) [VERIFY] | Test orders can be cancelled [VERIFY] |

Do **not** use Lulu's plug-and-play Shopify app for this book: it prints the same fixed file for every order [VERIFY], so it cannot stamp a name. The job above talks to the Lulu API directly.

Product codes to confirm in Lulu's product builder or pricing calculator [VERIFY each]: 8.5 × 8.5 in, full color, premium, **casewrap** (hardcover) and **perfect bound** (softcover), 80# coated white paper, gloss or matte cover. Put the two codes in the job's config, never in this file.

## 3. Store setup (one time, by the founder)

**Etsy edition (automatic).** Every order the job fetches from Etsy is written with `"channel": "etsy"`. `build.js` then leaves out playbeforepixels.com and the bonus QR code (copyright page, last page, back cover) and prints "You will find more Play Before Pixels books and printables in the same shop" instead (BRAND.md customer-voice rule 2). Test it with `orders/examples/order-long-name.json`, which is an Etsy order.

**Shopify (own site, easiest to automate).** Add fields to the product page as line-item properties: `Child's first name` (required, max 14), `From` (optional, max 32), `Pronouns` (she/her, he/him, they/them), `Grandma` (optional drop-down, exactly the list in `personalization.json`; default Grandma), `Look` (1–4, show `picker.png`), `Gift message` (optional, max 180), `Occasion or date` (optional, max 32). Format = a variant (Softcover $24.99 / Hardcover $34.99). Add a required checkbox: "I checked the spelling. The name prints exactly as typed." [VERIFY that the theme supports these fields without a paid app.]

**Etsy.** Variations: Format and Look (Etsy allows two variation types [VERIFY]). Personalization box with this exact instruction, so it can be read by the script:
```
Name: Maya
From: Aunt Lily
Pronouns: she
Grandma: (optional: Grandma, Nana, Abuela, Gigi … see the list)
Message: (optional)
```
Anything the script cannot read goes to the review queue. The review drafts a written message for the founder to approve and send in Etsy messages; Etsy's API cannot send buyer messages [VERIFY]. List the printer as a production partner in the listing [VERIFY Etsy's current production-partner rules for print-on-demand books].

## 4. Keys and storage (secrets, never in git)
`SHOPIFY_ADMIN_TOKEN`, `ETSY_API_KEY` + OAuth token, `LULU_CLIENT_KEY` / `LULU_CLIENT_SECRET` (sandbox first), storage keys for a **private** bucket (for example Cloudflare R2) that issues signed download links. Store them as GitHub Actions secrets.

## 5. Checks before the first real order (the [VERIFY] list)
1. Lulu sandbox: create a print job with `orders/examples/order-sample.json` built files; confirm it validates the interior (32 pages, 8.75 × 8.75 in with bleed) and the cover (dimensions from the API).
2. Order **three physical proofs**: sample (Look 1, hardcover), long name (`order-long-name.json`, Look 2, softcover) and Look 4 hardcover. Check skin tones, the navy night pages, name color on dark pages, the gutter on every spread, and the spine text.
3. Confirm the printer's reprint policy for misprints and its shipping times, and put both in the FAQ.
4. Confirm unit cost + shipping. **Rule from DEMAND-CHECK: printing cost at or below 35–40% of the retail price.** If the hardcover costs more than about $14 to print, raise it to $39.99 (the market range is $29.99–43) or use standard instead of premium color. Decide before listing.
5. Etsy: confirm the personalization box character limit, how the API returns it, and that polling paid-but-unshipped receipts works (Etsy has no order webhooks [VERIFY]).
6. Shopify: confirm line-item properties arrive in the Admin API order data.
7. Confirm that CPSIA's ordinary-book exemption applies (paper, ink, binding only) and, before UK/EU sales, the GPSR responsible-person details.
8. Test the review queue: a name in another script, an emoji, a 15-letter name, a flagged word, and a Grandma name not on the list (or the same as the child’s name) must each stop before the printer. `orders/examples/order-abuela.json` (Sofía Ñúñez, Abuela) must build and fit.
9. Check an Etsy-channel proof: no URL and no QR code anywhere in the book or on the cover.
10. Every interior carries `Version 1.0 · September 2026` on the copyright page (build.js `VERSION`). Bump it with any change to words or art, and tell past buyers.

## 6. Customer promises (for the FAQ and order emails)
- Personalized books are made to order and cannot be returned for change of mind; misprints and damage are reprinted free (the printer's policy [VERIFY]).
- Printing plus shipping time from the printer [VERIFY], shown on the product page before checkout.
- The name prints exactly as typed (straight quotes become curly ones). The job waits 2 hours after payment before building an order, so a buyer can email a spelling fix within 2 hours; after that the book is already with the printer. Say this on the product page and in the order confirmation.
- Privacy: the child's name is used only to print the book. It is never added to the email list or marketing. Order files are deleted 30 days after delivery [VERIFY the retention period with counsel].

## 7. Try it locally
```
node build.js --order orders/examples/order-long-name.json --out orders/test-long --allow-drafts
node render-order.js orders/test-long --pages
```
`--allow-drafts` is for testing only. Without it the build stops until the founder has finished WORDS.md.
