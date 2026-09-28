# Payment requirements (founder's instruction, September 28, 2026)

Accept every common way to pay, everywhere we sell. Every payout lands in the AlphaPlay LLC business bank account (see finance/).

## Own site (Shopify hub, or a merchant of record for digital products)
- Cards: Visa, Mastercard, American Express, Discover, plus JCB, Diners Club, UnionPay and local cards where the processor supports them.
- Wallets: Apple Pay, Google Pay, Shop Pay; PayPal (connected as an additional payment method); Venmo via PayPal where available in the US.
- Buy now, pay later: Shop Pay Installments and/or Klarna/Afterpay where available (check eligibility for digital goods; many BNPL providers exclude them).
- International: local currencies and local payment methods through Shopify Markets (e.g., iDEAL, Bancontact, SEPA, Klarna in Europe) as each region in ops/INTERNATIONAL.md goes live.
- Schools and organizations: purchase orders and invoices (net-30 by approval), payment by card, ACH or check; W-9 on request (see operations/SOPs/school-orders.md).
- Digital products sold through a merchant of record (Lemon Squeezy / Paddle / Payhip) accept cards, PayPal and Apple Pay and handle VAT/GST.

## Marketplaces
Amazon, Etsy, Teachers Pay Teachers, TikTok Shop, Meta shops and Faire take payment in their own checkouts and pay out to the business account on their schedules.

## Founder's one-time setup (cannot be automated: identity and bank verification)
1. Activate Shopify Payments in AlphaPlay LLC's name with the business bank account.
2. In Settings → Payments: turn on Apple Pay, Google Pay, Shop Pay, Shop Pay Installments; add PayPal (log in to a PayPal Business account in the LLC's name); review "Additional payment methods" for Klarna/Afterpay and local methods.
3. In Markets: enable each region only when its ops/INTERNATIONAL.md legal checklist is complete.
4. Turn on two-step verification for Shopify, PayPal and the bank.

## Site display
Show accepted-payment icons only for methods that are actually enabled (the build reads commerce/links.js and a payments list; no icon for anything not live).
