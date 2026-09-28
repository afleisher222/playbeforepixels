# Pricing policy — most profit, honestly (binding; the daily studio applies it to every product)

Sources: marketing/DEMAND-CHECK.md (what buyers pay), commerce/storefront-setup-guide.md (fees), brand/BRAND.md ("Honest pricing"). Figures marked [VERIFY] are re-checked in the fresh-session verification pass.

## 1. Price to value, inside the proven range
- Set each everyday price at the upper-middle of the competitor range the demand check found, then justify it with visible value (more cards, age bands, low-ink + color files, editable charts, a Start Here page, a bonus). Premium design is why we don't race to the bottom.
- Never compete on being cheapest. Never list a single printable under **$5** (fees eat the margin; DEMAND-CHECK rule 3).

## 2. Know the net on every channel (listing.json must show it)
Every listing.json carries `price_usd`, and for each channel `net_after_fees` and `margin_pct`. The build fails the gate if any channel nets under **$3.00 per digital sale** or under **30% margin on a print-on-demand sale**.
- **Etsy** digital: listing fee + transaction fee + payment processing (+ offsite-ads fee when an ad drives the sale) [VERIFY current rates]. Low-priced items lose most; bundle instead.
- **Teachers Pay Teachers** (when cleared): basic sellers keep a smaller share and pay a per-sale fee [VERIFY]; price singles at $5+ and push bundles.
- **Amazon KDP paperbacks:** royalty rate steps up at a list price of $9.99 [VERIFY]; price paperbacks at **$9.99 or more** unless print cost makes that impossible, and check print cost before setting any price.
- **IngramSpark:** set the wholesale discount deliberately (lower discount = more per copy, higher = more bookstore/library orders); start at the level the business plan's retail path needs.
- **Merchant of record (worldwide digital):** percentage + per-sale fee [VERIFY]; round prices so the net is clean.
- **Print-on-demand merch:** price = base cost + shipping cost + platform fee + target margin; never below 30% margin.

## 3. Make more per customer (where most profit comes from)
- **Bundles** at 10–25% below the sum of their parts (a real saving, shown honestly).
- **Series and stage sets** priced so owning the set is the obvious choice.
- **Site and group licenses** priced by the size of the group (single classroom / site / multi-site) — the highest-margin products.
- **Subscription** (monthly play kit) priced below the one-off total, with easy online cancellation.
- **Order bumps and "next for your child's age"** on every product page and receipt.

## 4. Test, don't guess
- One price test at a time per product, within the DEMAND-CHECK range, for at least 2–4 weeks or enough sales to judge; keep the winner. Log tests in ops/RUNLOG.md.
- Raise prices when a product sells steadily with strong reviews; fold into a bundle when it doesn't (kill rule).

## 5. Honest by law
- No fake "was" prices, no permanent sales, no countdown timers that reset (16 CFR 233.1). Real, time-limited promotions only (launch week, Black Friday/Cyber Monday, seasonal).
- Show taxes, shipping and license terms clearly before checkout; subscription terms and cancellation are plain.
