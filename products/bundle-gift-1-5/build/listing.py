#!/usr/bin/env python3
"""Writes products/bundle-gift-1-5/listing.json. Reads ../zip-manifest.json (run shared/manifest.py first) so the
'bought separately' sum always comes from the parts' own listing prices, never typed by hand."""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "shared"))
import listing_common as LC  # noqa: E402

SLUG = "bundle-gift-1-5"
MAN = json.load(open(os.path.join(HERE, "..", "zip-manifest.json"), encoding="utf-8"))
PRICE = float(MAN["price_usd"])
SEP = MAN["separately"]
n, m = LC.nets(PRICE)
ETSY_READY = MAN["etsy_status"].startswith("READY")

d = {
    "slug": SLUG,
    "title": "Ages 1–5 Instant Gift Bundle: 4 Printable Play Sets + Play Coupons",
    "subtitle": "A toddler busy book, family kit pages, “I’m Bored” cards and 52 Play & Talk Cards in one download, with a gift-reveal card",
    "version": "Version 1.0 · September 2026",
    "etsy_title": "Toddler Gift Bundle Ages 1-5, Printable Busy Book, Play Cards, Family Kit, Coupons, Screen-Free Instant Download Present, Letter and A4",
    "format": ("Digital download bundle. Own checkout: START HERE (plain PDF) + 6 ZIPs (gift pages and one ZIP per set). Etsy: 5 files, "
               "START HERE + 4 ZIPs by format (Color Letter, Color A4, Low-ink Letter, Low-ink A4). Every set comes in color and low-ink, "
               "US Letter and A4. The bundle's own gift pages are 5 plain PDF pages (cover, what's inside, fold card, reveal cards, what's "
               "next). ZIPs are built at upload time from zip-manifest.json; the parts' PDFs are never copied."),
    "trim": "US Letter 8.5 × 11 in and A4 210 × 297 mm (separate files in every set), 0.5 in margins. Print at 100% (actual size).",
    "pages": 5,
    "pages_note": "5 gift pages in this bundle's own PDF; each set keeps its own page count (see bundle.parts).",
    "ages": "1–5 (busy book 1–5 in three bands; family kit ages 2–5 pages; bored cards 1–3 and 3–5 bands; Play & Talk cards 0–5; coupons 1–5)",
    "activities": "74 busy-book activities + 76 bored cards for ages 1–5 + 52 Play & Talk cards + the family kit's ages 2–5 tools + 16 play coupons.",
    "prep_time": "About 2 minutes to open START HERE. Each set shows its own prep; most plays take 0–5 minutes to set up.",
    "price_usd": PRICE,
    "price_notes": (f"Everyday price ${PRICE:g} (ops/QUEUE.md G-day week; business/GROWTH-ENGINE.md §5b). The counted parts sell for "
                    f"${SEP['sum_usd']:.2f} at their listed everyday prices, so the bundle is {SEP['saving_pct']}% less (inside the 10–25% "
                    "band in commerce/PRICING.md section 3). The sum is computed by build/shared/manifest.py from each part's listing.json, "
                    "never typed. The included coupon set is not counted. Display: only '$29, or $36.49 bought separately', and only on a channel "
                    "where every counted part is live at that price right now; otherwise list the contents with no savings figure. Never a "
                    "crossed-out, 'was' or compare-at price. Referral credits never stack with this bundle (COMPLIANCE-GATE 18)."),
    "bundle": {
        "separately_usd": SEP["sum_usd"],
        "saving_pct": SEP["saving_pct"],
        "parts_counted": SEP["parts_counted"],
        "not_counted": SEP["not_counted"],
        "price_display_rule": SEP["display_rule"],
        "manifest": "zip-manifest.json (built by build/shared/manifest.py from build/zip-config.json)",
    },
    "price_floor": 3.0,
    "price_floor_basis": LC.FLOOR_BASIS,
    "net_per_unit_by_channel": n,
    "margin_pct_by_channel": m,
    "net_notes": LC.NET_NOTES,
    "short_description": "Four printable play sets for ages 1–5 in one download: busy book, family kit pages, bored cards, Play & Talk cards, plus play coupons.",
    "long_description": (
        "Four printable play sets for ages 1–5, plus a book of play coupons, all included in one instant download. Color and low-ink, "
        "US Letter and A4.\n\n"
        "Inside: the Toddler Busy Book with 74 activities, the Play-First Family Kit with its ages 2–5 pages, 76 “I’m Bored” play "
        "cards for ages 1–5, and 52 Play & Talk Cards, one for every week of the year. The Play Coupons set, also included, adds 16 coupons "
        "for plays to do together.\n\n"
        "It is ready to give. The gift pages include a fold card to write your message in and two “Surprise! Inside is…” reveal "
        "cards that list every set. Or forward the download: the license passes to the family who receives it.\n\n"
        "Every set has its own START HERE page, grown-up guide and safety page, so no one needs to read everything at once. Most "
        "plays use things you already have.\n\n"
        "Every play follows our published safety rules. Digital files in English; nothing is shipped. Personal license for one household."),
    "bullets": [
        "Four printable play sets for ages 1–5 in one download: Toddler Busy Book, Play-First Family Kit pages, “I’m Bored” cards and 52 Play & Talk Cards.",
        "Also included: 16 play coupons, blank coupons and a coupon-book cover.",
        "Ready to give: a fold card and two “Surprise! Inside is…” reveal cards. The license passes to the family who receives it.",
        "Every set in color and low-ink, US Letter and A4, each with its own START HERE, grown-up guide and safety page.",
        "Instant download: nothing ships. Every play follows our published safety rules.",
    ],
    "keywords": ["toddler gift bundle", "printable gift", "busy book printable", "toddler activities", "screen free gift",
                 "play cards", "instant gift"],
    "etsy_tags": ["toddler gift bundle", "printable gift", "busy book printable", "toddler activities", "screen free gift",
                  "play cards", "instant gift", "last minute gift", "grandparent gift", "toddler printable", "gift for toddler",
                  "family activity", "play coupons"],
    "seo_title": "Ages 1–5 Instant Gift Bundle | Play Before Pixels",
    "seo_description": "Four printable play sets for ages 1–5 in one download, plus 16 play coupons and a gift-reveal card. Color and low-ink, Letter and A4.",
    "editable": "Gift pages: For and From lines on the fold card and reveal cards. Each set's own editable fields are listed on its own listing.",
    "language": "English. Every set tells families to talk in the language they know best; a sign, a point or a device tap counts.",
    "license_tiers": [{"tier": "personal", "price_usd": PRICE,
                       "covers": "One household, including grandparents and sitters who care for your child. A gift passes the license to the family that receives it."}],
    "faq": [
        {"q": "What’s inside?", "a": "The Toddler Busy Book (74 activities), the Play-First Family Kit (includes its ages 2–5 pages), “I’m Bored” Play Cards (76 for ages 1–5), 52 Play & Talk Cards, and a Play Coupons set, plus gift pages with a fold card and reveal cards."},
        {"q": "How does delivery work?", "a": "Instant download: nothing ships. You get a START HERE page and ZIP files. On a computer, double-click a ZIP to open it; on a phone, tap it in your files app. On a phone, download in a web browser, not the shopping app."},
        {"q": "Can I give it as a gift?", "a": "Yes. Print the fold card or a reveal card, or forward the download. The personal license passes to the family who receives it."},
        {"q": "Which files do I print?", "a": "Pick Letter or A4, color or low-ink. Each set’s START HERE says which pages to print first."},
        {"q": "Can I buy the sets on their own?", "a": "Yes, each set is also sold on its own. The bundle costs less than buying the four counted sets separately."},
        {"q": "Is it safe for toddlers?", "a": "Every play follows our published safety rules and has its own safety line. You know your child best: skip anything that doesn’t suit them."},
        {"q": "Is this professional advice?", "a": "No. These are everyday play ideas for families. Questions about your child’s growth or health? Your child’s doctor is a good place to start."},
        {"q": "Refunds?", "a": "Digital downloads follow the shop’s published refund policy. If a file won’t open or print, we fix it or send it again."},
    ],
    "alt_text": ("Cover of the printable “Ages 1–5 Instant Gift Bundle”: a navy and tomato-red title on a pale blue panel, a grown-up "
                 "and child beside a wrapped gift, and four tiles for the busy book, family kit, bored cards and Play & Talk cards."),
    "listing_images": [
        "preview/listing-images/listing-01.png: hero with bundle cover and gift pages (thumbnail)",
        "preview/listing-images/listing-02.png: what's inside, the four sets and the included coupons",
        "preview/listing-images/listing-03.png: fold card and reveal cards",
        "preview/listing-images/listing-04.png: the 5 Etsy files (START HERE + 4 ZIPs by format)",
        "preview/listing-images/listing-05.png: the gift pages",
    ],
    # alt text for each listing image, in the same order (read by ops/UPLOAD-PACKETS/build_packets.py)
    "listing_images_alt": [
        ("Headline “4 Play Sets + play coupons included” above three printable gift pages: the Ages 1–5 Instant Gift Bundle cover "
         "with tiles for the Toddler Busy Book, Play-First Family Kit, “I’m Bored” Play Cards and 52 Play & Talk Cards, the "
         "what’s-inside page and the fold card. Labels: Instant download, Ages 1–5."),
        ("What’s inside: the page listing four play sets and a book of play coupons, beside five labels: Toddler Busy Book, "
         "74 activities for ages 1–5; Play-First Family Kit, includes the ages 2–5 pages; “I’m Bored” Play Cards, 76 cards for "
         "ages 1–5; 52 Play & Talk Cards, a card a week for ages 0–5; also inside, Play Coupons, 16 coupons and gift-reveal cards."),
        ("Ready to give: the printable “A gift of play” fold card with For and From lines, and “Surprise! Inside is…” reveal "
         "cards behind it. Notes: print the fold card and write your message inside; the reveal cards list every set; or forward "
         "the download, and the license passes to the family; also inside, 16 play coupons."),
        ("What you download: the bundle cover in Color and in Low-ink side by side, and the five files: 1, START HERE; 2, Color "
         "US Letter ZIP; 3, Color A4 ZIP; 4, Low-ink US Letter ZIP; 5, Low-ink A4 ZIP. A digital download: nothing ships."),
        ("Gift pages: six labelled page previews, START HERE, bundle cover, what’s inside, fold card, reveal cards and what’s "
         "next, under the heading “Start here, then open any set”."),
    ],
    "channels": [
        "Play Before Pixels website shop (own checkout, Gumroad at launch): START-HERE.pdf + the 6 store ZIPs in zip-manifest.json; each counted part must also be live there at its everyday price before any 'separately' figure shows",
        ("Etsy digital download: " + ("ready: 1-START-HERE.pdf + 4 ZIPs from zip-manifest.json" if ETSY_READY else
         "later (held): " + MAN["etsy_status"])),
    ],
    "etsy_status": MAN["etsy_status"],
    "status": "ready-pending-accounts",
    "status_notes": "G-day item (ops/QUEUE.md LAUNCH FIRST): Etsy and Gumroad packets are built; waits only for Gate A, the accounts and the founder's go (ops/PAUSE).",
    "amazon_route": ("none-with-reason: a bundle of separate printables is not one book. Its parts each have their own Amazon route "
                     "(the busy book, the cards and the family kit list KDP activity editions in their own listing.json)."),
    "ai_disclosure": LC.ai_disclosure(extra_kdp=False),
    "next_products": ["bundle-library-0-5", "winter-countdown", "visual-routine-cards-0-5"],
    "bonus_url": f"playbeforepixels.com/bonus/{SLUG}",
    "bonus_offer": ("Store edition only: the free “Five 5-Minute Plays” printable and the monthly “3 plays for your child’s age” email "
                    "(adults only; email and, optionally, birth month and year; double opt-in). QR code on the last gift page. Etsy files carry no link."),
    "shareable_piece": "The “A gift of play” fold card and the reveal cards, made to be photographed with the gift; the brand mark is on the card's back.",
    "owner": LC.OWNER,
    "files": {
        "store": ["START-HERE.pdf", f"{SLUG}.pdf", f"{SLUG}-A4.pdf", f"{SLUG}-low-ink.pdf", f"{SLUG}-low-ink-A4.pdf", "+ the parts' files, zipped per zip-manifest.json"],
        "etsy_upload": ["etsy-upload/1-START-HERE.pdf", "etsy-upload/gift-pages/ (4 PDFs that go inside the 4 Etsy ZIPs)", "+ the parts' Etsy files, zipped per zip-manifest.json"],
        "zip_manifest": "zip-manifest.json",
        "source": "source.html (store edition, color, US Letter). build/build.js = this bundle's words; build/shared/bundle.js = layout; bash build/make.sh rebuilds and checks everything",
        "previews": "preview/p01–p05.png, preview/low-ink/, preview/start-here-store/, preview/start-here-etsy/",
        "cover": "cover.png (1236 × 1600)",
        "mockup": "mockup.png (1600 × 1200)",
    },
    "compliance_notes": (
        "Honest pricing: the 'separately' sum is computed from the parts' own listing prices by build/shared/manifest.py and "
        "shown only as '$29, or $36.49 bought separately' on a channel where every counted part is live at that price (16 CFR "
        "233.1 reading UNVERIFIED). The included coupon set is not counted. No prices appear inside any PDF. Rule 1: no health or "
        "outcome claims. Rule 2: nothing named. Rule 4: every set carries its own safety page and per-play safety lines; the "
        "gift pages add no new plays. Etsy files carry no URL (checked by build/shared/finish.py on every Etsy PDF; the ZIPs "
        "contain only the parts' etsy-upload files, checked by manifest.py). Product images use only this bundle's own Etsy-edition "
        "pages because the parts' cover images carry the web address. Owner and version line on every page; no Type 3 fonts; no "
        "placeholder text. Editions: the Family Kit and bored cards ship in their full editions until the G0 age editions exist; "
        "copy says 'includes the ages 2–5 pages' and '76 cards for ages 1–5', which is true either way."),
    "human_todo": [
        "Build the G0 age editions (Family Kit 2–5 pages; bored cards 1–3 + 3–5) or ask the product workflow to, then point build/zip-config.json at them and run build/make.sh; this is what lets the Etsy low-ink ZIPs fit under 20 MB",
        "Rewrite the gift-page text in your own words in build/build.js and commit each draft",
        "Search the phrase “Instant Gift Bundle” for conflicts before listing (GROWTH-ENGINE §7 plain-names rule)",
        "Before showing any 'bought separately' figure, confirm each counted part is live at its everyday price on that same channel",
    ],
}

LC.write(os.path.join(HERE, "..", "listing.json"), d)
