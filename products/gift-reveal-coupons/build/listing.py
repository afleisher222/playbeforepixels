#!/usr/bin/env python3
"""Writes products/gift-reveal-coupons/listing.json.   python3 build/listing.py"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "..", "bundle-gift-1-5", "build", "shared"))
import listing_common as LC  # noqa: E402

PRICE = 5.00
NOBUY = 12
n, m = LC.nets(PRICE)
# Gumroad Discover would net about $2.81 at $5, under the $3.00 floor: this product is kept out of Discover.
n["site_gumroad_discover_sale"] = None
m["site_gumroad_discover_sale"] = None
SLUG = "gift-reveal-coupons"

d = {
    "slug": SLUG,
    "title": "16 Play Coupons and Gift-Reveal Cards, Ages 1–5",
    "subtitle": "Printable coupons a grown-up gives a child, each a small play to do together, with fold and reveal cards",
    "version": "Version 1.0 · September 2026",
    "etsy_title": "16 Printable Play Coupons for Kids 1-5, Gift Reveal Card, Booklet for Toddlers, Screen-Free Present Idea, Letter and A4 PDF",
    "format": ("Digital download: 5 plain PDFs, no zip. English text. START HERE (1 page) + Color and Low-ink editions, each in "
               "US Letter and A4 (11 pages per file). 11 pages = cover + grown-up guide + fold card + 2 reveal cards + 2 coupon "
               "pages (16 coupons) + blank coupons and coupon-book cover + 2 coupon-key pages + good to know + more from Play "
               "Before Pixels. 44 type-in fields per file. Etsy files carry no web address or QR code."),
    "trim": ("US Letter 8.5 × 11 in and A4 210 × 297 mm (separate files), 0.5 in margins. Coupons 8 per page on a 2 × 4 "
             "straight-line grid, each about 3.75 × 2.2 in. Fold card about 7.5 × 4.7 in folded; reveal cards about 7.5 × 4.6 in. "
             "Print at 100% (actual size)."),
    "pages": 11,
    "ages": "1–5 (every coupon shows a starting age in months: 5 from 12 months, 3 from 18, 4 from 24, 3 from 30, 1 from 36)",
    "activities": f"16 play coupons plus 7 blank coupons. {NOBUY} of the 16 need nothing to buy.",
    "prep_time": "About 10 minutes to print, cut on straight lines and staple. No-cut option: give the whole coupon page folded like a letter.",
    "price_usd": PRICE,
    "price_notes": ("Everyday price $5.00 on Etsy and on our own checkout. The brief asked for $4, but commerce/PRICING.md section 1 "
                    "and COMPLIANCE-GATE line 16 set $5 as the lowest price for any single printable (fees eat the margin under "
                    "$5), so it is listed at the $5.00 floor until the founder changes that rule [founder decision]. Included free "
                    "inside the $29 Ages 1–5 Instant Gift Bundle and the $45 Birth-to-5 Printable Library; it is a free add-on "
                    "there and is never counted in either bundle's 'bought separately' sum. Honest pricing (BRAND.md): one "
                    "everyday price, no 'was' or compare-at price. Value line: 16 plays, about 31¢ each."),
    "price_floor": 3.0,
    "price_floor_basis": LC.FLOOR_BASIS,
    "net_per_unit_by_channel": n,
    "margin_pct_by_channel": m,
    "net_notes": LC.NET_NOTES + " Gumroad Discover is switched off for this product: at $5 a Discover sale would net about $2.81, under the $3.00 floor. At the $4 in the brief, every channel would net under the floor: Etsy about $2.97, an Offsite Ads sale about $2.37, own checkout about $2.48.",
    "short_description": "16 printable play coupons for ages 1–5, each a small play to do together, plus a fold card, reveal cards and blank coupons. PDF.",
    "long_description": (
        "16 printable play coupons for ages 1–5, plus a fold card and two reveal cards. It is a PDF in US Letter and A4, "
        "with color and low-ink files.\n\n"
        "Each coupon is a promise to play together: a blanket fort, a kitchen dance party, a walk where your child leads, "
        f"a sock puppet show, one extra story. {NOBUY} of the 16 need nothing to buy.\n\n"
        "Every coupon shows a starting age in months, one line of how and one thing to say while you play. The coupon key "
        "adds an easier way, a harder way, a 2-minute version and a safety line for each one.\n\n"
        "Make it a surprise with the fold card or a reveal card. Add the coupon-book cover and 7 blank coupons for your "
        "family's own favorite plays. Type the For and From lines in a free PDF reader, or write them by hand.\n\n"
        "Coupons never expire. They are never traded for screen time or sweets, and they are never a reward for good behavior.\n\n"
        "Every play follows our published safety rules. Digital file in English; nothing is shipped. Personal license for "
        "one household, plus the child you give the coupons to."),
    "bullets": [
        "16 play coupons for ages 1–5 on 2 pages, plus 7 blank coupons and a coupon-book cover. Each 11-page file also has a guide, a coupon key and a safety page.",
        "Every coupon shows a starting age, one line of how, a talk line, and “With a grown-up”. The key adds easier, harder, 2-minute and safety lines.",
        "A fold card and two “Surprise! Inside is…” reveal cards to give with any gift of play. Type the For and From lines or write them by hand.",
        "Five plain PDFs: START HERE, color and low-ink, each in US Letter and A4. About 10 minutes to print, cut on straight lines and staple.",
        f"{NOBUY} of 16 coupons need nothing to buy. Every play follows our published safety rules.",
    ],
    "keywords": ["play coupons", "kids coupon book", "gift reveal card", "toddler gift idea", "coupon book kids",
                 "screen free gift", "printable coupons"],
    "etsy_tags": ["play coupons", "kids coupon book", "gift reveal card", "toddler gift idea", "coupon book kids",
                  "screen free gift", "printable coupons", "experience gift", "grandparent gift", "toddler printable",
                  "family activity", "gift for toddler", "quality time gift"],
    "seo_title": "16 Play Coupons and Gift-Reveal Cards | Play Before Pixels",
    "seo_description": "16 printable play coupons for ages 1–5, each a small play to do together, with a fold card, reveal cards and blank coupons. Letter and A4.",
    "editable": ("Color and low-ink PDFs: For and From lines on the fold card and reveal cards, 4 lines on each reveal card, the "
                 "coupon-book cover and the 7 blank coupons (play, note, To, From). Text only; pictures and colors can't be changed."),
    "language": "English. The guide tells families to talk in the language they know best; a sign, a point or a device tap counts.",
    "license_tiers": [{"tier": "personal", "price_usd": PRICE,
                       "covers": "One household, plus the child you give the coupons to. A gift passes the license to the family that receives it."}],
    "faq": [
        {"q": "What’s inside?", "a": "16 play coupons, 7 blank coupons, a coupon-book cover, a fold card, two reveal cards, a grown-up guide, a coupon key with easier, harder, 2-minute and safety lines, and a quick-answers page."},
        {"q": "What age is it for?", "a": "Ages 1–5. Every coupon shows a starting age in months; the coupon key has an easier version of each."},
        {"q": "How does delivery work?", "a": "Instant download: nothing ships. On Etsy your files stay on your Purchases page. On a phone, use a web browser, not the shopping app."},
        {"q": "Can I type the names in?", "a": "Yes, in a free PDF reader: the For and From lines, the reveal-card lines and the blank coupons. Or print and write by hand."},
        {"q": "Is it in the gift bundle?", "a": "Yes. The Ages 1–5 Instant Gift Bundle and the Birth-to-5 Printable Library include it free."},
        {"q": "Is it safe for toddlers?", "a": "Every play follows our published safety rules and has its own safety line in the coupon key, and every coupon says “With a grown-up.” Skip anything that doesn’t suit your child."},
        {"q": "Is this professional advice?", "a": "No. These are everyday play ideas for families. Questions about your child’s growth or health? Your child’s doctor is a good place to start."},
        {"q": "Refunds?", "a": "Digital downloads follow the shop’s published refund policy. If a file won’t open or print, we fix it or send it again."},
    ],
    "alt_text": ("Cover of the printable “Play Coupons and gift-reveal cards”: a navy title on a soft tomato-pink panel, three "
                 "fanned play coupons with a tent, a music note and building blocks, and a row of play icons below."),
    "listing_images": [
        "preview/listing-images/listing-01.png: hero with the number first and fanned pages (thumbnail)",
        "preview/listing-images/listing-02.png: what's inside, 6 labelled pages",
        "preview/listing-images/listing-03.png: a coupon page with what every coupon shows",
        "preview/listing-images/listing-04.png: fold card and reveal cards",
        "preview/listing-images/listing-05.png: color vs low-ink and the 5 files",
    ],
    "channels": [
        "Etsy digital download: upload the 5 PDFs in etsy-upload/ (no web address or QR code inside, COMPLIANCE-GATE 16); 5 listing images",
        "Play Before Pixels website shop (instant digital delivery, Gumroad at launch): START-HERE.pdf + the 4 store-edition PDFs",
        "Inside both bundles as a free add-on (products/bundle-gift-1-5 and products/bundle-library-0-5 ZIP manifests)",
    ],
    "amazon_route": ("none-with-reason: a cut-out coupon set and fold card do not work as a bound paperback (pages would have to be "
                     "cut out of the book), and at $5 it sits under the KDP $9.99 paperback floor (commerce/PRICING.md section 2). "
                     "Its plays can appear in a future KDP activity edition instead."),
    "ai_disclosure": LC.ai_disclosure(extra_kdp=False),
    "next_products": ["bundle-gift-1-5", "toddler-busy-book", "play-talk-cards"],
    "bonus_url": f"playbeforepixels.com/bonus/{SLUG}",
    "bonus_offer": ("Store edition only: the free “Five 5-Minute Plays” printable and the monthly “3 plays for your child’s age” "
                    "email (adults only; email and, optionally, the child's birth month and year; double opt-in). QR code on the "
                    "last page of the store PDFs. Etsy files carry no link."),
    "shareable_piece": "The fold card “A gift of play” and the coupon-book cover, made to be photographed with the gift; both carry the brand mark on the back or cover.",
    "owner": LC.OWNER,
    "files": {
        "store": ["START-HERE.pdf", f"{SLUG}.pdf", f"{SLUG}-A4.pdf", f"{SLUG}-low-ink.pdf", f"{SLUG}-low-ink-A4.pdf"],
        "etsy_upload": ["etsy-upload/1-START-HERE.pdf", "etsy-upload/2-Color-US-Letter.pdf", "etsy-upload/3-Color-A4.pdf",
                        "etsy-upload/4-Low-Ink-US-Letter.pdf", "etsy-upload/5-Low-Ink-A4.pdf"],
        "source": "source.html (store edition, color, US Letter). build/content.js = every coupon; build/build.js = layout; shared pieces in products/bundle-gift-1-5/build/shared/; bash build/make.sh rebuilds and checks everything",
        "previews": "preview/p01–p11.png (color), preview/low-ink/, preview/start-here-store/, preview/start-here-etsy/",
        "cover": "cover.png (1236 × 1600)",
        "mockup": "mockup.png (1600 × 1200)",
    },
    "compliance_notes": (
        "Rule 1: no health, developmental or outcome claims; the safety page says everyday play ideas, not medical or "
        "developmental advice. Rule 2: nothing named. Rule 4 child safety, coupon by coupon: every coupon says 'With a grown-up' "
        "and has its own safety line in the key; stove and oven are grown-up only (Pancake Helper, Bake Together, check "
        "allergies, no raw dough); balls and blocks too big to fit through a toilet-paper tube for under-3s; bubbles blown by a "
        "grown-up for under-3s; picnic food soft, small and seated with the choking-food list; dress-up has no scarves, ties, "
        "belts or cords; box car has staples and loose tape removed; the guide no longer suggests a ribbon. Customer-voice rule "
        "13: coupons are never traded for screen time or sweets and never a reward for behavior (stated in the guide and "
        "listing; the build fails if coupon text names a screen). 12 of 16 need nothing to buy (75%). Straight-line cuts, 8 "
        "pieces per page, 'Grown-up keeps the pieces'. Secular: no holiday or faith wording (build check). Etsy files checked for "
        "no URL. No Type 3 fonts; no placeholder text; owner and version line on every page."),
    "human_todo": [
        "Decide the price: $5.00 (the PRICING.md floor, as listed) or change PRICING.md section 1 to allow a $4 add-on; the listing checker fails any single printable under $5",
        "Rewrite the coupons in your own words in build/content.js, run `bash products/gift-reveal-coupons/build/make.sh`, and commit each draft",
        "Proof the cover, the fold card and one coupon page on card stock (15 minutes)",
        "Search the phrase “Play Coupons” in the Etsy category for a conflicting brand before listing (GROWTH-ENGINE §7 plain-names rule)",
    ],
}

LC.write(os.path.join(HERE, "..", "listing.json"), d)
