#!/usr/bin/env python3
"""
check_listings.py - listing QA for Play Before Pixels.

Tests every listing record under products/ the way a marketplace reviewer and a
compliance officer would: per-channel field limits, BRAND.md / COMPLIANCE-GATE.md
content rules, honest pricing, AI disclosure, price floor, readability and the
first 160 characters.

The script is READ-ONLY for products/, brand/, content/ and site-concepts/.
It writes only the files you name with --report / --json.

Usage (from the repo root):
  python3 ops/TESTS/check_listings.py                      # summary; exit 1 if any FAIL
  python3 ops/TESTS/check_listings.py --report ops/TESTS/listing-qa.md
  python3 ops/TESTS/check_listings.py --json /tmp/qa.json  # machine-readable results
  python3 ops/TESTS/check_listings.py --baseline /tmp/qa-prev.json   # exit 1 only on NEW failures
  python3 ops/TESTS/check_listings.py --only bored-play-cards -v

Exit codes: 0 = no FAIL (or no new FAIL with --baseline); 1 = FAIL found; 2 = script error.

Every platform number below is UNVERIFIED (from memory, no live check this session).
Re-check each one on the platform's own help page and update PLATFORM_LIMITS.
"""
from __future__ import annotations

import argparse
import datetime as _dt
import glob
import json
import os
import re
import sys
from dataclasses import dataclass, field, asdict

# --------------------------------------------------------------------------------------
# 1. Limits (single source of truth; the report prints this table at the top)
# --------------------------------------------------------------------------------------
# (key, channel, field, limit, source, status)
PLATFORM_LIMITS = [
    ("etsy_title_max", "Etsy", "Listing title length", 140, "Etsy listing form / Open API v3 `title`", "UNVERIFIED"),
    ("etsy_title_special_once", "Etsy", "Title: each of % : & + at most once", 1, "Etsy Open API v3 `title` rules", "UNVERIFIED"),
    ("etsy_title_repeat", "Etsy", "Title: no content word repeated (stuffing)", 1, "Etsy seller-handbook title guidance", "UNVERIFIED"),
    ("etsy_tags_count", "Etsy", "Tags per listing (we require exactly 13)", 13, "Etsy listing form", "UNVERIFIED"),
    ("etsy_tag_max", "Etsy", "Characters per tag", 20, "Etsy listing form", "UNVERIFIED"),
    ("kdp_title_subtitle_max", "Amazon KDP", "Title + subtitle combined", 200, "KDP title field help", "UNVERIFIED"),
    ("kdp_keyword_boxes", "Amazon KDP", "Keyword boxes", 7, "KDP keywords help", "UNVERIFIED"),
    ("kdp_keyword_max", "Amazon KDP", "Characters per keyword box", 50, "KDP keywords help", "UNVERIFIED"),
    ("kdp_description_max", "Amazon KDP", "Description length (HTML counts)", 4000, "KDP description help", "UNVERIFIED"),
    ("shopify_seo_title_max", "Shopify (own site)", "SEO page title", 70, "Shopify admin search-engine listing", "UNVERIFIED"),
    ("shopify_meta_max", "Shopify (own site)", "Meta description (display target; admin may allow 320)", 160, "Shopify admin / Google snippet length", "UNVERIFIED"),
    ("tpt_title_max", "Teachers Pay Teachers", "Resource title", 80, "TpT product-upload form", "UNVERIFIED"),
    ("mod_title_max", "Amazon Merch on Demand", "Product title", 60, "Merch on Demand upload form", "UNVERIFIED"),
    ("mod_bullet_max", "Amazon Merch on Demand", "Each of 2 feature bullets", 256, "Merch on Demand upload form", "UNVERIFIED"),
    ("mod_description_max", "Amazon Merch on Demand", "Product description", 2000, "Merch on Demand upload form", "UNVERIFIED"),
]
L = {k: v for k, _, _, v, _, _ in PLATFORM_LIMITS}

# Internal (binding) rules read from the repo: verified against the files named.
INTERNAL_LIMITS = [
    ("brand_short_max", "BRAND.md schema", "short_description", 160, "brand/BRAND.md 'Deliverables per product'"),
    ("brand_seo_title_max", "BRAND.md schema", "seo_title", 60, "brand/BRAND.md"),
    ("brand_seo_desc_max", "BRAND.md schema", "seo_description", 155, "brand/BRAND.md"),
    ("brand_long_words_min", "BRAND.md schema", "long_description words (min)", 120, "brand/BRAND.md"),
    ("brand_long_words_max", "BRAND.md schema", "long_description words (max)", 250, "brand/BRAND.md"),
    ("brand_bullets", "BRAND.md schema", "bullets", 5, "brand/BRAND.md"),
    ("brand_keywords", "BRAND.md schema", "keywords", 7, "brand/BRAND.md"),
    ("digital_floor", "Pricing", "Net per digital sale (floor, USD)", 3.00, "commerce/PRICING.md s.2; COMPLIANCE-GATE 18"),
    ("single_printable_min", "Pricing", "Lowest price for a single printable (USD)", 5.00, "commerce/PRICING.md s.1"),
    ("kdp_paperback_min", "Pricing", "KDP paperback list price (USD, unless print cost prevents)", 9.99, "commerce/PRICING.md s.2; COMPLIANCE-GATE 16b"),
    ("pod_margin_min", "Pricing", "POD margin floor", 0.30, "commerce/PRICING.md s.2"),
    ("fk_grade_max", "Readability", "Flesch-Kincaid grade of long_description (FAIL above 7.5; 7.1-7.5 = WARN because the syllable heuristic runs 0.5-1 grade high)", 7.0, "task target"),
    ("lead_chars", "Search snippet", "First N chars must say what + age + format", 160, "task rule"),
]
IL = {k: v for k, _, _, v, _ in INTERNAL_LIMITS}

# Fee model used ONLY for the estimated nets proposed in the report (all UNVERIFIED).
FEES = {
    "etsy": {"listing": 0.20, "transaction_pct": 0.065, "processing_pct": 0.03, "processing_fixed": 0.25, "offsite_ads_pct": 0.15},
    "site": {"processing_pct": 0.029, "processing_fixed": 0.30},       # Shopify Payments, Basic plan, US card
    "mor": {"pct": 0.05, "fixed": 0.50},                                # merchant of record (course)
    "tpt": {"payout_pct": 0.55, "fixed": 0.30},                         # TpT basic seller
    "refund_allowance_pct": 0.05,                                       # G2-11: 3-5% refund allowance
}

OWNER_LINE = "© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC."
OWNER_RX = re.compile(r"©\s*20\d\d\s+AlphaPlay LLC\.\s+Play Before Pixels is a trade name of AlphaPlay LLC\.?")
APPROVED_REPLY_WORDING = "a person reviews everything else within"

PASS, FAIL, WARN, NA = "PASS", "FAIL", "WARN", "N/A"

CHECKS = [
    ("etsy_title", "Etsy title: ≤140, no repeated words, % : & + once"),
    ("etsy_tags", "Etsy tags: exactly 13, each ≤20"),
    ("kdp_title", "KDP title + subtitle ≤200"),
    ("kdp_keywords", "KDP keywords: 7 boxes, each ≤50"),
    ("kdp_description", "KDP description ≤4000"),
    ("shopify_seo", "Shopify SEO title ≤70, meta ≤160"),
    ("tpt_title", "TpT title ≤80"),
    ("mod_fields", "Merch on Demand title ≤60, bullets ≤256, description ≤2000"),
    ("brand_schema", "BRAND.md listing.json schema and limits"),
    ("health_claims", "No health / developmental-outcome / safety / fear claims"),
    ("named_entities", "No named school, district, company, show, creator, device or EdTech"),
    ("autism_terms", "No autism / diagnosis terms or targeting"),
    ("honest_pricing", "Honest pricing (16 CFR 233.1) + PRICING.md rules"),
    ("ai_disclosure", "ai_disclosure filled for every channel; no 'human-made' claim"),
    ("price_floor", "price_floor + net_per_unit_by_channel present and met"),
    ("owner_line", "AlphaPlay LLC owner line"),
    ("no_home_address", "No home address, phone number or personal email"),
    ("no_reply_promise", "No reply-time promise"),
    ("no_coaching", "No coaching / calls / podcast / live service"),
    ("marketplace_links", "Etsy/TpT copy: no URL, QR or other-store pointer (gate 16)"),
    ("readability", "Readability: FK grade ≤7"),
    ("lead_160", "First 160 chars say what it is, the age range and the format"),
]
CHECK_NAMES = dict(CHECKS)
SHORT = {  # short column labels for the summary matrix
    "etsy_title": "Etsy title", "etsy_tags": "Etsy tags", "kdp_title": "KDP title", "kdp_keywords": "KDP kw",
    "kdp_description": "KDP desc", "shopify_seo": "Shopify SEO", "tpt_title": "TpT", "mod_fields": "MoD",
    "brand_schema": "Schema", "health_claims": "Health", "named_entities": "Names", "autism_terms": "Autism",
    "honest_pricing": "Pricing", "ai_disclosure": "AI discl.", "price_floor": "Floor/net", "owner_line": "Owner",
    "no_home_address": "Address", "no_reply_promise": "Reply time", "no_coaching": "Coaching",
    "marketplace_links": "Mkt links", "readability": "FK≤7", "lead_160": "First 160",
}

# --------------------------------------------------------------------------------------
# 2. Hand-written replacement lines.
#    Key: (slug, check_id, field, exact offending text). Used only while the offending text
#    is still exactly the same, so a stale proposal can never be shown for edited copy.
# --------------------------------------------------------------------------------------
MANUAL_PROPOSALS: dict[tuple[str, str, str, str], str] = {
    ('board-up-go-more', 'lead_160', 'long_description[:160]', 'Up! Go! More! is a bright, uncluttered first-words book for babies and toddlers, built for laps and back-and-forth. Each of its 22 pages shows one everyday word'):
        'Up! Go! More! is a 32-page talk-along picture book for ages 0–3, in paperback. It has 22 first words, one per page, each with a sound, sign or move to copy.',
    ('board-up-go-more', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 3.60  (30% POD margin on the $11.99 paperback, commerce/PRICING.md)',
    ('board-up-go-more', 'price_floor', 'net_per_unit_by_channel', '(missing)'):
        '"net_per_unit_by_channel": {"kdp": 3.95, "ingramspark": null}  (KDP from price_notes: 60% of $11.99 minus about $3.24 premium-color print [VERIFY in KDP calculator]; IngramSpark after its print cost and wholesale discount. Keep KDP Expanded Distribution off: at 40% it would net about $1.56, under the floor.)',
    ('bored-play-cards', 'etsy_title', 'etsy_title', "150 I'm Bored Jar Cards, Screen-Free Activity Cards for Kids 1-12 by Age, Printable Boredom Buster, Summer + Rainy Day, Editable PDF"):
        "150 I'm Bored Jar Cards for Kids 1-12, Screen-Free Activity Ideas by Age, Printable Boredom Buster, Summer and Rainy Day, Editable PDF",
    ('bored-play-cards', 'readability', 'long_description', 'You also get 36 bonus cards (18 summer, 18 rainy-day), 30 blank “your idea” cards, card backs in six colors, 18 box dividers, jar labels in four colorways (including calm, medium and wiggly jars), a velcro-ready Play Menu choice board, a weekly play planner with Monday and Sunday starts, a Play Jar Star certificate, a card index and a quick-answers page.'):
        'You also get 36 bonus cards: 18 for summer and 18 for rainy days. There are 30 blank cards for your own ideas and card backs in six colors. Add 18 box dividers, jar labels, a Play Menu board and a weekly planner. A certificate, a card index and a quick-answers page finish the set.',
    ('bored-play-cards', 'readability', 'long_description', 'The download includes US Letter and A4 files, a fillable editable PDF for typing your own cards, a double-sided cards file, and a PNG template set for design apps.'):
        'You get US Letter and A4 files. A fillable PDF lets you type your own cards. There is also a double-sided cards file and a PNG set for design apps.',
    ('bored-play-cards', 'lead_160', 'long_description[:160]', '“I’m bored!” is where play begins. These 150 printable play cards turn that moment into something to do together, using things you already have: pots, socks, bo'):
        '150 printable play cards for ages 1–12, sorted by age and energy, in a PDF you print at home. “I’m bored!” is where play begins.',
    ('course-screen-reset', 'health_claims', 'long_description', 'Fewer screen battles, more play and talk.'):
        'More play and talk, with screens in a steady spot.',
    ('course-screen-reset', 'honest_pricing', 'bundle.compare_parts_usd', 'bundle.compare_parts_usd = 54.49 vs bundle price 49.0'):
        'Rename to "separately_usd": 54.49 and add "price_display_rule": "Show as \'$49, or $54.49 bought separately\'. Never a crossed-out or \'was\' price. Re-check the sum whenever a part\'s price changes."',
    ('course-screen-reset', 'readability', 'long_description', "Every morning for 30 days you get one short email: a lesson you can read in about three minutes, one easy play made from things you already have, and plain words for one tricky moment, like the show that won't end, 'I'm bored', the hour before dinner, waiting rooms, car rides or 'everyone else gets to'."):
        "For 30 days, one short email comes each morning. It has a lesson you can read in about three minutes and one easy play. It also gives you plain words for one tricky moment, like a show that won't end, 'I'm bored' or a long car ride.",
    ('course-screen-reset', 'readability', 'long_description', 'Your 89-page workbook comes in Color and Low-ink, in US Letter and A4, with type-in pages that work in free Adobe Acrobat Reader: planning pages, pre-filled and blank trackers, weekly check-ins, a scripts bank, a family plan and a certificate for Day 30.'):
        'Your 89-page workbook comes in Color and Low-ink, in US Letter and A4. You can type in it with free Adobe Acrobat Reader. Inside are plans, trackers, weekly check-ins, a bank of scripts, a family plan and a Day 30 certificate.',
    ('course-screen-reset', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 3.00',
    ('course-screen-reset', 'price_floor', 'net_per_unit_by_channel', '(missing)'):
        '"net_per_unit_by_channel": {"site_mor": 23.80, "kdp_paperback": 6.10}  (MoR estimate at 5% + $0.50 and a 5% refund allowance, UNVERIFIED; KDP from price_notes: 60% of $14.99 minus $2.30–$2.90 print [VERIFY]). Bundle: also record the bundle net after the 10% discount.',
    ('first-phone-plan', 'etsy_title', 'etsy_title', 'First Phone Agreement Kids 9-12, 30 Day Phone-Free Afternoons Challenge, Editable Phone Rules, Readiness Checklist, Printable PDF'):
        'First Phone Agreement for Kids 9-12, Editable Tween Tech Rules, Readiness Checklist, 30 Day Unplugged Afternoons Challenge, Printable PDF',
    ('first-phone-plan', 'lead_160', 'long_description[:160]', 'A first phone is a big step toward independence. This printable kit helps you take it together, calmly, with plenty of play along the way. Start with “Are we re'):
        'A printable first phone kit for kids aged 9–12, in fillable PDFs. Write a warm agreement together. Then use the readiness checklist and 30 phone-free afternoons.',
    ('guide-100-plays', 'etsy_title', 'etsy_title', '100 Screen-Free Plays for Ages 0-5, Printable Toddler Activity Book PDF, Baby and Preschool Play Ideas by Age, US Letter + A4'):
        '100 Screen-Free Plays for Ages 0-5, Printable Toddler Activity Book PDF, Baby and Preschool Ideas Sorted by Stage, US Letter + A4',
    ('guide-100-plays', 'etsy_tags', 'etsy_tags', '(missing)'):
        '"etsy_tags": ["screen free play", "toddler activities", "baby play ideas", "preschool at home", "toddler activity pdf", "one year old play", "play ideas by age", "rainy day activities", "indoor toddler play", "parent child play", "baby activity book", "low prep activities", "toddler printable"]',
    ('guide-100-plays', 'brand_schema', '(record)', 'amazon_route'):
        '"amazon_route": "kdp-paperback"',
    ('guide-100-plays', 'honest_pricing', 'price_notes', 'PDF: list at $14.99 and run the usual Etsy sale at about 33% off so it sells at $9.99 (DEMAND-CHECK section 4, rule 2); on our own site sell at $9.99 flat.'):
        'PDF: $9.99 everyday price on Etsy and on our own site, shown plainly. No list price and no standing sale. Use only a real, time-limited promotion (for example launch week), with its start and end dates recorded in listing.json.',
    ('guide-100-plays', 'readability', 'long_description', "You'll also find a Safety first page, a Quick finder for bath time, rainy days, kitchen time, car rides and wind-down, a sample screen-free day, low-energy plays for tired grown-ups, and friendly, guilt-free ideas for when screens are on anyway."):
        "You'll also find a Safety first page and a Quick finder for bath time, rainy days, kitchen time and car rides. There is a sample screen-free day and low-energy plays for tired grown-ups. And there are guilt-free ideas for when screens are on anyway.",
    ('guide-100-plays', 'readability', 'long_description', 'Every play has the same easy parts: what you need, prep and mess icons, where it works best, simple steps, a "Grow it" idea for next time, a "talk while you play" line and a safety note.'):
        'Every play has the same easy parts. You see what you need, prep and mess icons, and simple steps. Each play also has a "Grow it" idea, a "talk while you play" line and a safety note.',
    ('guide-100-plays', 'lead_160', 'long_description[:160]', 'A cup, a box, a sock, or nothing at all. 100 Screen-Free Plays gives you a quick play for every age and every moment of an ordinary day, from first smiles to "a'):
        '100 Screen-Free Plays is a play book for ages 0–5, in paperback or as a printable PDF. A cup, a box, a sock, or nothing at all: each play uses what you have.',
    ('guide-100-plays', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 3.00  (digital; the KDP paperback must also keep 30% margin, about $5.10 on $16.99)',
    ('guide-100-plays', 'price_floor', 'net_per_unit_by_channel', '(missing)'):
        '"net_per_unit_by_channel": {"kdp": 7.89, "etsy_pdf": 8.09, "etsy_pdf_offsite_ad_sale": 6.59, "site_pdf": 8.90}  (KDP from price_notes [VERIFY]; PDF figures are estimates at $9.99 with UNVERIFIED fees and a 5% refund allowance)',
    ('merch-core-logo-tee', 'etsy_title', 'etsy_title', 'Play Before Pixels Logo Tee, Adult Unisex T-Shirt in 4 Colors, Minimalist Parent Shirt, Gift for Mom or Dad, Print on Demand'):
        'Play Before Pixels Logo T-Shirt, Adult Unisex Tee in 4 Colors, Minimalist Parent Gift for Mom or Dad, Print on Demand',
    ('merch-core-logo-tee', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 8.10  (30% POD margin on $27; price_notes already says raise the price if a tee keeps under about $8)',
    ('merch-core-logo-tee', 'price_floor', 'net_per_unit_by_channel', '(missing)'):
        '"net_per_unit_by_channel": {"site": null, "etsy": null, "merch_on_demand": null}  (fill with price minus the print partner\'s blank + print + inside label + shipping, minus platform fees; Merch on Demand pays a set royalty per sale [VERIFY])',
    ('merch-core-tote', 'lead_160', 'long_description[:160]', 'Carry the books, the snacks and the crayons in a tote that says where your priorities are. The Play Before Pixels logo tote carries our stacked logo: the P of P'):
        'The Play Before Pixels logo tote is a canvas bag for grown-ups, printed to order and sold only inside our gift bundles. Carry the books, the snacks and the crayons.',
    ('merch-core-tote', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 6.60  (30% POD margin on the $22 add-on value)',
    ('merch-core-tote', 'price_floor', 'net_per_unit_by_channel', '(missing)'):
        '"net_per_unit_by_channel": {"site_bundle": null}  (fill with the tote\'s share of the bundle price minus partner cost and payment fees)',
    ('picture-laps-not-apps', 'no_reply_promise', 'faq[6].a', 'Your name prints exactly as typed, so check the spelling; you can email a correction within 2 hours of ordering.'):
        "Your name prints exactly as typed, so check the spelling on the preview before you pay. Books go to print automatically, so we can't promise changes after checkout.  (Also drop the '2-hour window for spelling fixes' from faq[4].a unless a self-serve edit link exists: a 2-hour window needs someone reading email within 2 hours, and the business runs a weekly batch.)",
    ('picture-laps-not-apps', 'readability', 'long_description', 'Their name is woven into six of the rhymes: Dad calls them up to the armchair, Grandma saves them a seat, a big brother gives them a turn to sing “QUACK!”, and a sleepy “Goodnight” comes at the end of the day.'):
        'Their name is in six of the rhymes. Dad calls them up to the armchair, and Grandma saves them a seat. A big brother gives them a turn to sing “QUACK!” At the end of the day comes a sleepy “Goodnight.”',
    ('picture-laps-not-apps', 'readability', 'long_description', 'At the back you will find 5 simple lap games with safety notes, a “Books before screens” family reading pledge to sign together, and a keepsake page for your child’s favorite laps.'):
        'At the back are 5 simple lap games with safety notes. There is a “Books before screens” pledge to sign together and a keepsake page for your child’s favorite laps.',
    ('picture-laps-not-apps', 'lead_160', 'long_description[:160]', 'Laps Not Apps is a warm, rhyming read-aloud about the best seats in town, made for one child. Their name is woven into six of the rhymes: Dad calls them up to t'):
        'Laps Not Apps is a personalized picture book for ages 0–5, printed to order in hardcover or softcover. It is a warm, rhyming read-aloud made for one child.',
    ('picture-laps-not-apps', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 10.50  (30% margin on the $34.99 hardcover; $7.50 on the $24.99 softcover)',
    ('picture-laps-not-apps', 'price_floor', 'net_per_unit_by_channel', '(missing)'):
        '"net_per_unit_by_channel": {"site_hardcover": null, "site_softcover": null, "etsy_hardcover": null, "etsy_softcover": null}  (price minus the printer\'s unit + shipping cost minus Shopify or Etsy fees; fill from the printer quote before listing)',
    ('picture-more-talk-less-tap', 'etsy_tags', 'etsy_tags', '(missing)'):
        '"etsy_tags": ["circle time game", "turn taking game", "preschool talk game", "morning meeting", "pre-k printable", "kindergarten game", "conversation cards", "listening game", "oral language", "classroom game pdf", "speaking activities", "prek circle time", "screen free class"]',
    ('picture-more-talk-less-tap', 'health_claims', 'faq[8].a', "The kit treats a talking device as a child's voice, not screen time."):
        "The kit counts a talking device as a child's voice, not screen time.",
    ('picture-more-talk-less-tap', 'readability', 'long_description', 'A one-page, word-for-word teacher script walks you through your first round, and six more variations follow, each with a starting age, a 2-minute no-setup version, and a make-it-easier and make-it-harder option.'):
        'A one-page teacher script walks you through your first round, word for word. Six more versions follow. Each has a starting age, a 2-minute no-setup version, and ways to make it easier or harder.',
    ('picture-more-talk-less-tap', 'readability', 'long_description', 'You get US Letter and A4 PDFs in full color and ink-saver, a 20-slide deck to project, a START HERE page, and a bonus 32-page read-aloud story, More Talk, Less Tap.'):
        'You get US Letter and A4 PDFs in full color and ink-saver. There is a 20-slide deck to project and a START HERE page. A bonus 32-page story, More Talk, Less Tap, is ready to read aloud.',
    ('picture-more-talk-less-tap', 'lead_160', 'long_description[:160]', 'Seven circle-time talk games, built around one class tower. In Talk Tower, each time a child asks a question, says something back, adds one more idea or shows t'):
        'Talk Tower is a printable circle-time game kit for ages 3–7 (preschool to grade 2), with PDFs and slides. Every question, comment and idea adds a block to the class tower.',
    ('picture-more-talk-less-tap', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 3.00',
    ('picture-more-talk-less-tap', 'price_floor', 'net_per_unit_by_channel', '(missing)'):
        '"net_per_unit_by_channel": {"site_single": 6.14, "site_site_license": 11.97, "etsy_single": 5.53, "tpt_single": 3.20}  (estimates with UNVERIFIED fees and a 5% refund allowance; TpT at $6.99 is only $0.20 over the floor, so a TpT price test below $6.99 would break it)',
    ('picture-tablet-slept', 'lead_160', 'long_description[:160]', 'Shhh… the tablet is sleeping. So what shall we do? On Saturday morning, Ada zooms downstairs to find the family tablet snoring a teeny-tiny zzz-bip under a purp'):
        'The Day the Tablet Slept is a funny 32-page picture book for ages 3–7, in paperback. Shhh… the tablet is sleeping. So what shall we do?',
    ('picture-tablet-slept', 'honest_pricing', 'bundle.compare_at_usd', 'bundle.compare_at_usd = 28.98 vs bundle price 24.99'):
        'Rename "compare_at_usd" to "separately_usd" (28.98). The display rule is already right; the field name is the risk, because a store sync may map compare_at_* to Shopify\'s compare-at price, which shows a strikethrough.',
    ('picture-tablet-slept', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 3.60  (30% POD margin on the $11.99 paperback)',
    ('picture-tablet-slept', 'price_floor', 'net_per_unit_by_channel', '(missing)'):
        '"net_per_unit_by_channel": {"kdp": 3.95, "ingramspark_hardcover": null, "site_pod": null}  (KDP from price_notes [VERIFY]; keep Expanded Distribution off at $11.99; hardcover after the IngramSpark calculator)',
    ('play-first-family-kit', 'etsy_title', 'etsy_title', 'Play First Then Screens Family Kit, 10 Printable Tools, Editable Kids Checklist, Chore Chart, Together Tokens, Family Rules, 30 Day Tracker'):
        'Play First Then Screens Family Kit, 10 Printable Tools, Editable Kids Checklist, Chore Chart, Together Tokens, House Rules, 30 Day Tracker',
    ('play-first-family-kit', 'kdp_title', 'title + subtitle', 'Play-First Family Kit: 10 Printable Tools for Ages 2–12: Play First, Then Screens: checklists, together tokens, helping jobs, a chore chart, a family play & screen plan and a 30-day tracker. Fillable PDF, US Letter + A4.'):
        '"amazon_title": "Play First, Then Screens: A 52-Week Family Checklist Journal for Ages 2–12 (Black-and-White Interior)"  (the edition described in amazon_route_notes)',
    ('play-first-family-kit', 'readability', 'long_description', 'For the whole family, there are 24 together tokens (12 ready-made, 12 make-your-own), six screen-spot cards (5 more minutes, screens go to sleep, what we do next), a family rules poster, a warm three-page Family Play & Screen Plan, a 30-day play tracker with 30 no-buy play ideas, and a certificate to celebrate.'):
        'The whole family gets 24 together tokens and six screen-spot cards. There is a rules poster and a warm three-page family plan. A 30-day tracker holds 30 play ideas that need nothing to buy. A certificate marks the end.',
    ('play-first-family-kit', 'readability', 'long_description', 'The Play First, Then Screens checklist comes as a picture version for ages 2–5, a word version for ages 5–12, and a fillable blank, each in 4 colorways with Monday or Sunday starts.'):
        'The Play First, Then Screens checklist comes in three versions: pictures for ages 2–5, words for ages 5–12, and a fillable blank. Each has 4 colorways and a Monday or Sunday start.',
    ('play-first-family-kit', 'lead_160', 'long_description[:160]', "Give your day a simple, kind shape: jobs first, then play and time together, then screens at their usual spot. Nothing is taken away; there's just more play to "):
        'The Play-First Family Kit has 10 printable tools for ages 2–12, in a PDF you can type in: checklists, tokens, a chore chart and a family plan. Jobs first, then play, then screens.',
    ('play-talk-cards', 'etsy_title', 'etsy_title', '52 Play & Talk Cards for Ages 0-5, Printable Toddler Activity Cards, Baby Play Ideas, Screen-Free Play with Talk Tips, Play Before Pixels'):
        '52 Play and Talk Cards for Ages 0-5, Printable Toddler and Baby Activities, Screen-Free Ideas with Tips, Play Before Pixels',
    ('play-talk-cards', 'named_entities', 'etsy_tags[10]', 'busy toddler ideas'):
        'toddler play ideas',
    ('play-talk-cards', 'lead_160', 'long_description[:160]', '52 simple plays for babies, toddlers and preschoolers, each on its own card with one talk tip in plain words, like “pause and wait,” “say what you see” or “offe'):
        '52 printable play cards for ages 0–5, in US Letter and A4 PDFs. Each card has one simple play and one talk tip in plain words, like “pause and wait.”',
    ('play-talk-cards', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 3.00',
    ('family-talk-along-cards', 'etsy_title', 'etsy_title', '52 Family Talk-Along Cards, Ages 5-12, Printable Conversation Cards for Dinner, Car, Bath and Bedtime, Kids Questions, Play Before Pixels'):
        '52 Family Talk-Along Cards, Ages 5-12, Printable Conversation Starters for Dinner, Car, Bath and Bedtime, Kids Questions, Play Before Pixels',
    ('family-talk-along-cards', 'kdp_title', 'title + subtitle', '52 Family Talk-Along Cards for Ages 5–12: Conversation cards for dinner, the car, bath time and bedtime, with a one-line grown-up tip on each'):
        '"amazon_title": "Family Talk-Along Journal, Ages 5–12: 52 Questions for Dinner, the Car, Bath Time and Bedtime (Black-and-White Interior)"',
    ('family-talk-along-cards', 'lead_160', 'long_description[:160]', '52 conversation cards for ages 5–12, sorted by the moments when families actually talk: passing the peas, waiting at a red light, rinsing shampoo, turning off t'):
        '52 printable talk cards for ages 5–12, in US Letter and A4 PDFs. They are sorted by the times when families talk: dinner, the car, bath and bed.',
    ('family-talk-along-cards', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 3.00',
    ('toddler-busy-book', 'etsy_title', 'etsy_title', '74 Toddler Busy Book Printable Activities, Ages 1-5 Busy Binder, Screen-Free Matching, Colors, Shapes, Pretend Play, Mazes, US Letter + A4'):
        '74 Toddler Busy Book Printable Activities, Ages 1-5 Learning Binder, Screen-Free Matching, Colors, Shapes, Pretend Play, Mazes, Letter + A4',
    ('toddler-busy-book', 'kdp_title', 'title + subtitle', '74 Toddler Busy Book Activities for Ages 1–5: Matching, sorting, colors, shapes, pretend play, first words and mazes, sorted by age, with a “talk while you play” line on every page'):
        '"amazon_title": "Toddler Busy Book for Ages 1–5: 49 No-Cut Activities to Point, Name and Play, with a Talk Line on Every Page"',
    ('toddler-busy-book', 'readability', 'long_description', 'These 74 printable activities are sorted into three age bands (1–2, 2–3 and 3–5 years): first words with art from our talk-along board book, animal sounds, matching, color and shape sorting, shadow match, pretend play (pizza shop, café, post office, dress for the weather), counting, patterns, first-next-last stories, rhymes and eight mazes from easy to tricky.'):
        'These 74 printable activities come in three age bands: 1–2, 2–3 and 3–5 years. There are first words, animal sounds, matching, and color and shape sorting. Kids can play pizza shop or post office, count, find patterns and try eight mazes.',
    ('toddler-busy-book', 'readability', 'long_description', 'You also get binder covers in four colors, spine and pouch labels, an assembly guide (binder, laminated or velcro for ages 3–5), laminating tips, a weekly planner with Monday and Sunday starts, make-your-own pages, a certificate and an answer key.'):
        'You also get binder covers in four colors, plus spine and pouch labels. An assembly guide shows three ways to put it together. A weekly planner, make-your-own pages, a certificate and an answer key are inside too.',
    ('toddler-busy-book', 'lead_160', 'long_description[:160]', 'A busy book that gives you something to talk about, not just something to keep little hands busy. These 74 printable activities are sorted into three age bands '):
        '74 printable busy book pages for ages 1–5, in three age bands, as US Letter and A4 PDFs. Every page gives you something to talk about.',
    ('toddler-busy-book', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 3.00',
    ('visual-routine-cards-starter', 'etsy_title', 'title', '60 Visual Routine Cards for Toddlers, Morning & Bedtime Routine Chart, First Then Board, Daily Schedule Printable PDF'):
        "60 Visual Routine Cards for Toddlers, Morning and Bedtime Picture Chart, Daily Schedule Printable PDF  (also drops the 'First Then Board' search term flagged below)",
    ('visual-routine-cards-starter', 'autism_terms', 'title', '60 Visual Routine Cards for Toddlers, Morning & Bedtime Routine Chart, First Then Board, Daily Schedule Printable PDF'):
        '60 Visual Routine Cards for Toddlers, Morning and Bedtime Picture Chart, Daily Schedule Printable PDF',
    ('visual-routine-cards-starter', 'autism_terms', 'etsy_tags[10]', 'visual schedule'):
        'kids daily routine',
    ('visual-routine-cards-starter', 'autism_terms', 'etsy_tags[2]', 'first then board'):
        "toddler picture chart  (or keep 'first then board' if the founder decides it is a general toddler term; record the decision in compliance_notes)",
    ('visual-routine-cards-starter', 'autism_terms', 'keywords[2]', 'first then board'):
        'toddler picture schedule  (founder decides, as above)',
    ('visual-routine-cards-starter', 'honest_pricing', 'price_notes', 'Keep it undiscounted or run the same sale as the Complete Set; the listing and the PDF both point buyers to the $9.50 Complete Set.'):
        'Everyday price $5.00, shown plainly, with no sale borrowed from the Complete Set. The listing and the PDF both point buyers to the Complete Set.',
    ('visual-routine-cards-starter', 'honest_pricing', 'price_usd', '4.5'):
        '"price_usd": 5.00  (estimated Etsy net about $3.83, or $3.08 on an Offsite Ads sale, both over the $3.00 floor; at $4.50 an ad-attributed sale nets about $2.72). Or make the Starter the free email printable instead.',
    ('visual-routine-cards-starter', 'readability', 'long_description', "These 60 printable picture cards cover the moments that fill a little one's day: waking up, potty, getting dressed, meals, play, outside time, reading together, bath, bedtime, helping jobs, a feelings check-in and plan words like First, Then and Wait."):
        "These 60 printable picture cards cover a little one's day. There are cards for waking up, potty, getting dressed, meals and play. Others show outside time, reading, bath, bedtime, helping jobs and feelings, plus plan words like First, Then and Wait.",
    ('visual-routine-cards-starter', 'readability', 'long_description', 'The Complete Set has 228 cards for ages 0–12, 6 chart layouts, 4 colorways, editable files and Canva-ready PNGs.'):
        'The Complete Set has 228 cards for ages 0–12. It adds 6 charts, 4 color looks, files you can edit and PNGs for Canva.',
    ('visual-routine-cards-starter', 'lead_160', 'long_description[:160]', "A simple place to start. These 60 printable picture cards cover the moments that fill a little one's day: waking up, potty, getting dressed, meals, play, outsid"):
        '60 printable picture routine cards for ages 0–5, with three charts, in US Letter and A4 PDFs. A simple place to start.',
    ('visual-routine-cards-starter', 'brand_schema', '(record)', 'amazon_route'):
        '"amazon_route": "none-with-reason: cut-and-velcro picture cards do not work as a bound KDP book"',
    ('visual-routine-cards-starter', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 3.00',
    ('visual-routine-cards', 'health_claims', 'long_description', 'Mornings, meals, bath and bedtime go more smoothly when little ones can see what comes next.'):
        'Big, friendly picture cards show little ones what comes next at mornings, meals, bath and bedtime.',
    ('visual-routine-cards', 'autism_terms', 'title', '200+ Visual Routine Cards for Kids, Editable Morning & Bedtime Chart, Toddler Daily Schedule, First Then Board, Printable PDF'):
        '200+ Visual Routine Cards for Kids, Editable Morning and Bedtime Chart, Toddler Daily Schedule, Picture Board, Printable PDF',
    ('visual-routine-cards', 'autism_terms', 'etsy_tags[6]', 'visual schedule'):
        'big kid checklist',
    ('visual-routine-cards', 'autism_terms', 'etsy_tags[5]', 'first then board'):
        'picture cards kids  (or keep, if the founder decides it is a general toddler term)',
    ('visual-routine-cards', 'autism_terms', 'keywords[5]', 'first then board'):
        'picture routine cards  (founder decides, as above)',
    ('visual-routine-cards', 'honest_pricing', 'price_notes', 'List at $9.50 and run a standing 30–40% sale (sells at about $5.70–$6.65; launch sale about $6.50) per marketing/DEMAND-CHECK.md sections 1, 3 and 4.'):
        'Set one everyday price where buyers actually pay (about $6.50–$6.99 per DEMAND-CHECK), shown plainly. No list price and no standing 30–40% sale. A launch-week price is allowed only with start and end dates recorded in listing.json.',
    ('visual-routine-cards', 'readability', 'long_description', 'Inside are 228 picture cards: 170 for ages 0–5 (morning, meals, play, outside, reading together, bath, bedtime, helping jobs, out and about, plan words and a feelings check-in) and 58 big-kid cards for ages 5–12 (mornings, after school, evenings and family jobs).'):
        'There are 228 picture cards inside. 170 are for ages 0–5, from mornings and meals to bath, bed and feelings. 58 big-kid cards for ages 5–12 cover mornings, after school, evenings and jobs.',
    ('visual-routine-cards', 'readability', 'long_description', 'Choose from 6 chart layouts: vertical and horizontal strips, a first–then board, morning and bedtime charts, and a Today board with Monday or Sunday start.'):
        'Choose from 6 chart layouts. There are two strips, a first–then board, morning and bedtime charts, and a Today board with a Monday or Sunday start.',
    ('visual-routine-cards', 'lead_160', 'long_description[:160]', "Mornings, meals, bath and bedtime go more smoothly when little ones can see what comes next. This printable set turns your family's everyday rhythm into big, fr"):
        '228 printable routine picture cards for ages 0–12, with 6 charts, in US Letter and A4 PDFs. Big, friendly pictures show little ones what comes next.',
    ('visual-routine-cards', 'brand_schema', '(record)', 'amazon_route'):
        '"amazon_route": "none-with-reason: cut-and-velcro picture cards do not work as a bound KDP book"',
    ('visual-routine-cards', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 3.00',
    ('bored-play-cards', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 3.00',
    ('first-phone-plan', 'price_floor', 'price_floor', '(missing)'):
        '"price_floor": 3.00',
    ('visual-routine-cards-starter', 'autism_terms', 'seo_description', '60 printable routine cards for toddlers and preschoolers plus a first–then board and morning chart. Letter and A4. Helps little ones see what comes next.'):
        "60 printable routine cards for toddlers and preschoolers plus a two-step picture board and morning chart. Letter and A4. Helps little ones see what comes next.  (only if the founder drops 'first–then board')",
    ('visual-routine-cards-starter', 'autism_terms', 'short_description', '60 printable picture cards for ages 0–5, plus a strip, a first–then board and a morning chart. Letter + A4. Helps little ones see what comes next.'):
        "60 printable picture cards for ages 0–5, plus a strip, a two-step picture board and a morning chart. Letter + A4. Helps little ones see what comes next.  (only if the founder drops 'first–then board')",
}

# --------------------------------------------------------------------------------------
# 3. Data model
# --------------------------------------------------------------------------------------
@dataclass
class Finding:
    field: str
    text: str
    note: str = ""
    proposal: str = ""
    level: str = FAIL  # FAIL or WARN or INFO


@dataclass
class Result:
    cid: str
    status: str
    summary: str
    findings: list = field(default_factory=list)


@dataclass
class Listing:
    path: str          # repo-relative
    slug: str
    data: dict
    index: int | None  # position in a list-shaped file
    channels: dict = field(default_factory=dict)   # name -> "now" | "later"
    negated: set = field(default_factory=set)
    kinds: set = field(default_factory=set)
    results: list = field(default_factory=list)
    load_error: str = ""


# --------------------------------------------------------------------------------------
# 4. Helpers
# --------------------------------------------------------------------------------------
def repo_root() -> str:
    here = os.path.dirname(os.path.abspath(__file__))
    return os.path.normpath(os.path.join(here, "..", ".."))


def norm_ws(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()


SENT_SPLIT = re.compile(r"(?<=[.!?…])[\"”’')]*\s+|\n+")


ABBREV_END = re.compile(r"\b(Mr|Ms|Mrs|Dr|St|vs|e\.g|i\.e|U\.S|approx|No)\.$")


def sentence_spans(text: str):
    spans, start = [], 0
    for m in SENT_SPLIT.finditer(text):
        end = m.start()
        if "\n" not in m.group(0) and ABBREV_END.search(text[max(start, end - 8):end]):
            continue  # "Ms. Rosa", "e.g. a box": not a sentence end
        if text[start:end].strip():
            spans.append((start, end))
        start = m.end()
    if text[start:].strip():
        spans.append((start, len(text)))
    return spans


def sentence_at(text: str, pos: int) -> str:
    for a, b in sentence_spans(text):
        if a <= pos < b + 1:
            return text[a:b].strip()
    return text.strip()


NEG_RX = re.compile(r"\b(no|not|never|without|nothing|isn['’]t|aren['’]t|don['’]t|doesn['’]t|won['’]t|nor)\b[^.;:!?]{0,45}$", re.I)


def is_negated(text: str, pos: int) -> bool:
    window = text[max(0, pos - 60):pos]
    # stay inside the sentence
    window = re.split(r"[.!?\n]", window)[-1]
    return bool(NEG_RX.search(window))


def as_list(v):
    if v is None:
        return []
    return v if isinstance(v, list) else [v]


def num(v):
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


def trim_words(s: str, limit: int) -> str:
    s = s.strip()
    if len(s) <= limit:
        return s
    cut = s[:limit + 1]
    for sep in [", ", " | ", " - ", ": ", " "]:
        i = cut.rfind(sep)
        if i > limit * 0.5:
            return cut[:i].rstrip(" ,:;-|")
    return s[:limit].rstrip()


def md_escape_cell(s: str) -> str:
    return str(s).replace("|", "\\|").replace("\n", " ")


def redact(s: str) -> str:
    """Mask everything but the first character of each token (used for addresses/phones/emails)."""
    return re.sub(r"[A-Za-z0-9]", "*", s[:1] + re.sub(r"(?<=\w)\w", "*", s[1:])) if s else s


# --------------------------------------------------------------------------------------
# 5. Field extraction
# --------------------------------------------------------------------------------------
PUBLIC_TOP = [
    "title", "subtitle", "etsy_title", "amazon_title", "marketplace_title", "tpt_title", "series",
    "short_description", "long_description", "bullets", "keywords", "etsy_tags", "seo_title",
    "seo_description", "alt_text", "alt_text_picker", "faq", "editable", "activities", "prep_time",
    "bonus_offer", "sizes", "colors",
]
PUBLIC_NESTED = [("bundle", "name"), ("bundle", "pitch")]
SEARCH_FIELDS = ["title", "subtitle", "etsy_title", "amazon_title", "marketplace_title", "tpt_title",
                 "keywords", "etsy_tags", "seo_title", "seo_description", "short_description"]
MARKETPLACE_FIELDS = ["title", "subtitle", "etsy_title", "tpt_title", "marketplace_title", "short_description",
                      "long_description", "bullets", "etsy_tags", "alt_text", "editable", "activities", "prep_time"]


def _emit(path, v):
    if isinstance(v, str):
        yield path, v
    elif isinstance(v, (int, float)) and not isinstance(v, bool):
        yield path, str(v)
    elif isinstance(v, list):
        for i, x in enumerate(v):
            yield from _emit(f"{path}[{i}]", x)
    elif isinstance(v, dict):
        for k, x in v.items():
            yield from _emit(f"{path}.{k}", x)


def public_texts(d: dict, keys=None):
    for k in (keys or PUBLIC_TOP):
        if k in d:
            yield from _emit(k, d[k])
    if keys is None:
        for a, b in PUBLIC_NESTED:
            if isinstance(d.get(a), dict) and b in d[a]:
                yield from _emit(f"{a}.{b}", d[a][b])


def all_texts(d: dict):
    yield from _emit("", d)


def internal_texts(d: dict):
    pub = set(PUBLIC_TOP)
    for k, v in d.items():
        if k not in pub:
            yield from _emit(k, v)


# --------------------------------------------------------------------------------------
# 6. Channels and product kinds
# --------------------------------------------------------------------------------------
def detect_channels(d: dict):
    chans, negated = {}, set()

    def names(line: str):
        low = line.lower()
        out = set()
        if "etsy" in low:
            out.add("etsy")
        if "teachers pay teachers" in low or re.search(r"\btpt\b", low):
            out.add("tpt")
        if "merch on demand" in low:
            out.add("mod")
        elif "kdp" in low:
            out.add("kdp")
        elif re.search(r"\bamazon\b", low):
            out.add("amazon_seller" if re.search(r"\bfba\b|seller-fulfilled", low) else "kdp")
        if "ingramspark" in low or "ingram " in low:
            out.add("ingramspark")
        if re.search(r"website|playbeforepixels\.com|own[- ]site|own[- ]store|\bsite\b|shopify|same checkout|merchant of record", low):
            out.add("site")
        if "faire" in low:
            out.add("faire")
        if re.search(r"bulk|purchase[- ]order|invoiced", low):
            out.add("direct_b2b")
        return out

    for line in as_list(d.get("channels")):
        if not isinstance(line, str):
            continue
        low = line.strip().lower()
        if re.match(r"(not|no)\b", low):
            negated |= names(line)
            continue
        if re.match(r"held\b", low):
            continue
        state = "later" if (re.match(r"(later|optional later|optional)\b", low) or re.search(r"\bedition later\b|\blater \(|\(later\)", low)) else "now"
        for n in names(line):
            if n in negated:
                continue
            if chans.get(n) != "now":
                chans[n] = state
    route = str(d.get("amazon_route") or "").lower()
    if route.startswith("kdp") and "kdp" not in chans:
        chans["kdp"] = "later"
    if chans.get("kdp") == "now" and re.search(r"not built yet", route):
        chans["kdp"] = "later"
    if route.startswith("merch-on-demand") and "mod" not in chans:
        chans["mod"] = "now"
    chans["social"] = "now"  # every product is promoted with faceless social posts (BRAND.md)
    return chans, negated


def detect_kinds(d: dict):
    fmt = (str(d.get("format", "")) + " " + str(d.get("title", ""))).lower()
    kinds = set()
    if re.search(r"digital download|instant[- ]download|printable pdf|pdf kit|plain pdfs|\bpdfs? of\b|written program|printable (activity|kit|set)", fmt):
        kinds.add("digital")
    if re.search(r"paperback|hardcover|picture book|board book|softcover|casewrap", fmt):
        kinds.add("book")
    if re.search(r"\btee\b|t-shirt|\btote\b|dtg|canvas", fmt):
        kinds.add("merch")
    return kinds


# --------------------------------------------------------------------------------------
# 7. Pattern lists
# --------------------------------------------------------------------------------------
def rx(p, flags=re.I):
    return re.compile(p, flags)


HEALTH_RULES = [
    (rx(r"\bprevent(s|ed|ing|ion)?\b"), "prevention claim", FAIL),
    (rx(r"\btreat(ment|ments)\b|\btreat(s|ed|ing)?\s+(?:\w+\s+){0,2}(autism|delays?|speech|symptoms|conditions?|adhd|anxiety|children|kids|toddlers|your child)\b"),
     "treatment claim", FAIL),
    (rx(r"(?<!\ba )(?<!special )(?<!little )(?<!sweet )\btreats?\b(?!\s+(?:\w+\s+){0,2}(autism|delays?|speech|symptoms|conditions?|adhd|anxiety|children|kids|toddlers|your child)\b)"),
     "'treat' used in another sense: reword so the listing never carries a treatment keyword", WARN),
    (rx(r"\bcur(e|es|ed|ing)\b"), "cure claim", FAIL),
    (rx(r"\brevers(e|es|ed|ing)\b(?!\s+side)"), "reverse claim", FAIL),
    (rx(r"\bheal(s|ed|ing)?\b"), "healing claim", FAIL),
    (rx(r"\btherap(y|ies|ist|ists|eutic)\b"), "therapy wording", FAIL),
    (rx(r"\bclinical(ly)?\b"), "clinical wording", FAIL),
    (rx(r"\b(proven|research-proven|science-backed|evidence-based)\b"), "proof claim", FAIL),
    (rx(r"\bsymptoms?\b"), "symptom wording", FAIL),
    (rx(r"\bdiagnos(is|es|e|ed|tic)\b"), "diagnosis wording", FAIL),
    (rx(r"\bdisorders?\b"), "disorder wording", FAIL),
    (rx(r"\b(developmental|speech|language|motor)\s+delays?\b"), "delay wording (CUSTOMER-VOICE 18)", FAIL),
    (rx(r"\blate[- ]talkers?\b"), "'late talker' (CUSTOMER-VOICE 18)", FAIL),
    (rx(r"\bcatch(es|ing)?\s+up\b"), "'catch up' (CUSTOMER-VOICE 18)", FAIL),
    (rx(r"\bspeech took off\b|\bbefore[- /]and[- /]after\b|\bbefore/after\b"), "before/after claim", FAIL),
    (rx(r"\b(improv|boost|build|develop|increas|enhanc|accelerat|strengthen|promot|support)\w*\s+(?:\w+\s+){0,2}"
        r"(speech|language skills?|vocabulary|brain|iq|cognitive|cognition|development|communication skills|social skills|"
        r"attention span|focus|behaviou?r|school readiness|motor skills|self-regulation|emotional regulation)\b"),
     "developmental-outcome claim", FAIL),
    (rx(r"\bbrain[- ](development|building|boost\w*|power|health)\b"), "brain claim", FAIL),
    (rx(r"\bfix(es|ing)?\s+(?:\w+\s+){0,2}(speech|talking|language|behaviou?r|tantrums|meltdowns|screen time|screen habits|your (child|kid|toddler)|the problem|attention|focus|sleep)\b"),
     "'fix' claim", FAIL),
    (rx(r"\breduc\w*\s+(?:\w+\s+){0,2}(autism|symptoms|tantrums|meltdowns|delays?|screen addiction)\b"), "reduction claim", FAIL),
    (rx(r"\b(speech[- ]language pathologist|SLP|speech therapist|occupational therapist|pediatrician[- ]approved|doctor[- ]approved|expert[- ]approved)\b"),
     "credential claim", FAIL),
    (rx(r"\b(rewir\w*|brain damage|lasting damage|permanent damage|addict\w*|toxic|zombies?|brain rot)\b"), "fear word (CUSTOMER-VOICE 12)", FAIL),
    (rx(r"\b(safety[- ]checked|certified|safe for all ages|child[- ]safe|non[- ]toxic|cpsia[- ]certified|choke[- ]proof)\b"),
     "safety claim (CUSTOMER-VOICE 9)", FAIL),
    (rx(r"\bscreen[- ]time causes\b|\bcauses?\s+(autism|delays?)\b"), "causation claim", FAIL),
    (rx(r"\b(go|goes|run|runs)\s+(more\s+)?smoothly\b|\bfewer\s+(screen\s+)?(battles|tantrums|meltdowns|fights)\b|"
        r"\bno more (battles|tantrums|meltdowns|fights)\b|\bcalmer (kids|children|mornings|bedtimes)\b"),
     "soft behavior-outcome promise", WARN),
]

NAMED_RULES = [
    (rx(r"\b(Montgomery|MCPS|MCEA|MSEA|NEA|DHHS|Rockville|Bethesda|Silver Spring|Gaithersburg|Germantown|Maryland)\b|Infants and Toddlers Program", 0),
     "excluded organization / local angle", FAIL),
    (rx(r"\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:County\s+)?Public\s+Schools\b|\bSchool\s+District\b|\b[A-Z]{2,}ISD\b|"
        r"\bUnified\s+School\b|\b[A-Z][a-z]+\s+(?:Elementary|Middle|High)\s+School\b", 0),
     "named school or district", FAIL),
    (rx(r"\b(iPad|iPhone|iPod|Android|Kindle|Fire tablet|Chromebook|Alexa|Siri|Nintendo|PlayStation|Xbox|Roblox|Minecraft|"
        r"Fortnite|TikTok|YouTube|Instagram|Snapchat|Facebook|WhatsApp|Netflix|Disney\+?|Hulu|PBS Kids|ABCmouse|Khan Academy|"
        r"Duolingo|Seesaw|ClassDojo|Google Classroom|Prodigy|IXL|Starfall|Osmo|Lovevery|Tonies|Toniebox|Yoto|Samsung|Google|"
        r"Microsoft|Apple|Meta|Zoom|FaceTime|Qustodio|Gabb|Wonderbly|Librio|Melissa\s*&\s*Doug|Hape)\b", 0),
     "named company / device / app / EdTech", FAIL),
    (rx(r"\b(Bluey|Cocomelon|CoComelon|Ms\.? Rachel|Blippi|Daniel Tiger|Sesame Street|Elmo|Peppa Pig|Paw Patrol|Mister Rogers|"
        r"Mr\.? Rogers|Baby Shark|Pinkfong|Super Simple Songs|Little Baby Bum|Dr\.? Seuss|Eric Carle|Hungry Caterpillar|"
        r"Goodnight Moon|Gruffalo|Jonathan Haidt|Anxious Generation|Digital Delusion|Wait Until 8th|Smartphone Free Childhood|"
        r"Big Little Feelings|Busy Toddler|Good Inside|Dr\.? Becky|Janet Lansbury)\b", 0),
     "named show / character / creator / book", FAIL),
    (rx(r"\b(Hanen|It Takes Two to Talk|More Than Words)\b"), "trademarked program name (BRAND hard rule 6)", FAIL),
    (rx(r"\b(Montessori|Waldorf|Reggio|Head Start)\b", 0), "method or program name (generic, but check)", WARN),
]
# Neutral tool and channel names are allowed (BRAND.md itself requires "free Acrobat Reader" and
# "the Amazon/other-store versions" in FAQs). They are reported as INFO only.
ALLOWED_NAMES = rx(r"\b(Etsy|Amazon|KDP|IngramSpark|Lulu|Bookshop\.org|Adobe|Acrobat( Reader)?|Canva|Shopify|Printful|Printify|Gelato|Teachers Pay Teachers|TpT|Faire)\b", 0)

AUTISM_RX = rx(r"\b(autis\w*|autismo|autisme|autismus|ASD|on the spectrum|neurodivergen\w*|neurodiverse|ADHD|special[- ]needs|SPED|IEP|"
               r"sensory processing|SPD|non-?verbal|stimming|AAC|ABA|PECS|social stor(y|ies))\b")
AUTISM_ADJACENT_RX = rx(r"\b(visual schedules?|first[- –]then (board|chart|cards?)|calm[- ]down corner|meltdowns?|sensory|speech therapy|"
                        r"OT activities|social skills|behavior chart|token board|special ed\w*)\b")

COACH_RULES = [
    rx(r"\bcoach(es|ing)?\b"), rx(r"\bconsult(s|ation|ations|ing)?\b"), rx(r"\b1:1\b|\bone[- ]on[- ]one\b|\b1[- ]on[- ]1\b"),
    rx(r"\b(phone|video|zoom|strategy|discovery|group|live|support|check-in|coaching)\s+calls?\b"),
    rx(r"\bbook a call\b|\bschedule a call\b|\bcall us\b|\bgive us a call\b"),
    rx(r"\b(videos?|meetings?|coaching|sessions?|consults?|chats?)\b[^.]{0,20}\bcalls?\b|\bcalls?\b[^.]{0,20}\b(videos?|meetings?|coaching|sessions?)\b"),
    rx(r"\bpodcasts?\b"), rx(r"\bwebinars?\b"),
    rx(r"\blive[- ](stream|streams|session|sessions|class|classes|workshop|workshops|event|events|q&a|coaching|support|chat)\b"),
    rx(r"\blivestream\w*\b"), rx(r"\boffice hours\b"), rx(r"\binterviews?\b"),
    rx(r"\bin[- ]person (session|workshop|class|event|visit)s?\b"), rx(r"\bvideo (lesson|lessons|course|call|calls|chat)s?\b"),
    rx(r"\bDM (me|us)\b|\btext (me|us)\b|\bpersonal support\b|\bask the founder\b"),
]

REPLY_RULES = [
    (rx(r"\b(repl(y|ies|ied)|respon(d|ds|se|ses)|answer(s|ed)?|get back to you|hear back)\b[^.]{0,50}?\bwithin\s+"
        r"(\d+|one|two|three|a|an)\s*(business\s+|working\s+)?(hours?|hrs|days?|minutes|mins)\b"), "reply-time promise", FAIL),
    (rx(r"\bwithin\s+(\d+|one|two|24|48)\s*(business\s+)?(hours?|days?)\b[^.]{0,40}\b(repl|respon|answer)"), "reply-time promise", FAIL),
    (rx(r"\b24/7\b|\bsame[- ]day (reply|replies|response|responses|answer)\b|\b(fast|quick|prompt|speedy) (replies|reply|response|responses|support)\b|"
        r"\bwe(['’]ll| will) (reply|respond|get back)\b"), "reply-speed promise", FAIL),
    (rx(r"\b(email|send|message)\b[^.]{0,40}\bwithin\s+(\d+|one|two)\s*(hours?|minutes)\b"),
     "action window that needs a person to read email fast (weekly batch)", WARN),
]

ANCHOR_TEXT_RULES = [
    rx(r"\b(was|reg\.?|regularly|originally|compare at|retail value|valued at|worth)\s*:?\s*\$\s?\d[\d.,]*\d"),
    rx(r"\b\d{1,2}\s?%\s?off\b"), rx(r"\bsave\s+\$?\d"), rx(r"\b(on sale|sale price|limited time|only \d+ left|hurry|selling fast|last chance|ends (soon|tonight|today))\b"),
]
PLAN_ANCHOR_RX = rx(r"\b(usual|standing|permanent|always[- ]on)\b[^.]{0,40}\bsale\b|\blist(ed)? at \$\d[\d.]*\b[^.]{0,80}\b(sale|off)\b|"
                    r"\brun the same sale\b|\bsale at about \d+\s?% off\b")

STREET_RX = re.compile(r"\b\d{1,6}\s+(?:[NSEW]\.?\s+)?(?:[A-Z0-9][\w.'-]*\s+){1,4}(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Court|Ct|"
                       r"Boulevard|Blvd|Way|Pike|Place|Pl|Terrace|Ter|Circle|Cir|Parkway|Pkwy|Highway|Hwy|Trail|Trl)\b\.?")
APT_RX = re.compile(r"\b(Apt|Apartment|Unit)\s*#?\s*\d+\b")
ZIP_RX = re.compile(r"\b(?:AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|"
                    r"OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\s+\d{5}(?:-\d{4})?\b")
PUBLIC_NUMBERS = {"18002221222"}  # Poison Control (US) - public safety line, allowed on safety pages
PHONE_RX = re.compile(r"(?<![\d.])(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}(?![\d])")
EMAIL_RX = re.compile(r"\b[\w.+-]+@(gmail|yahoo|hotmail|outlook|icloud|aol|proton(mail)?)\.(com|me)\b", re.I)

MARKET_LINK_RX = rx(r"playbeforepixels\.com|play before pixels\.com|https?://|\bwww\.|\bQR\b|\bour (web)?site\b|\bon our website\b|"
                    r"\bAmazon\b|\bKDP\b|\bbonus (page|link)\b|\bshort link\b|\bcompanion bonus link\b")

HUMAN_MADE_RX = rx(r"\b(hand[- ]drawn|hand[- ]illustrated|handmade|hand[- ]painted|original artwork by|illustrated by|drawn by)\b")

PRODUCT_RX = rx(r"\b(books?|board book|picture book|paperback|hardcover|read-aloud|cards?|deck|printables?|kit|guide|workbook|course|program(me)?|"
                r"charts?|tee|t-shirt|shirt|tote|planner|tracker|journal|games?|activity book|busy book|poster|checklist|set|bundle|activities|plays)\b")
AGE_RX = rx(r"\bages?\b[^.]{0,30}?\d{1,2}\s*(?:–|-|to)\s*\d{1,2}|\baged\s+\d{1,2}\s*(?:–|-|to)\s*\d{1,2}|"
            r"\b\d{1,2}\s*(?:–|-|to)\s*\d{1,2}\s*(?:years?|yrs|year-olds|months|mos?)\b|\b(for kids|for children|kids)\s+\d{1,2}\s*(?:–|-|to)\s*\d{1,2}\b|"
            r"\bages?\s+\d{1,2}\s*\+")
ADULT_RX = rx(r"\b(adults?|grown-ups?|grown-up sizes|unisex)\b")
FORMAT_RX = rx(r"\b(printable|pdf|digital download|instant download|download|paperback|hardcover|softcover|board book|"
               r"picture book|e-?mails?|written program|print[- ]on[- ]demand|printed (when|to) (you )?order|tee|t-shirt|tote|"
               r"us letter|a4|fillable|poker[- ]size)\b")

STOP = set("a an and the for of with to in on by or & + your our at from is it this that as be are 1 2 3 4 5 6 7 8 9 0".split())


# --------------------------------------------------------------------------------------
# 8. Readability (Flesch-Kincaid grade; heuristic syllables, about ±0.5 grade)
# --------------------------------------------------------------------------------------
WORD_RX = re.compile(r"[A-Za-z]+(?:['’][A-Za-z]+)*(?:-[A-Za-z]+)*|\d+(?:[.,]\d+)?")


def syllables(word: str) -> int:
    if word[0].isdigit():
        d = len(re.sub(r"\D", "", word))
        return 1 if d <= 1 else (2 if d == 2 else 3)
    total = 0
    for part in word.split("-"):
        w = re.sub(r"[^a-z]", "", part.lower())
        if not w:
            continue
        if len(w) <= 3:
            total += 1
            continue
        w = re.sub(r"(?:[^laeiouy]es|[^laeiouy]ed|[^laeiouy]e)$", "", w)
        w = re.sub(r"^y", "", w)
        total += max(1, len(re.findall(r"[aeiouy]{1,2}", w)))
    return max(1, total)


def fk_stats(text: str):
    sents = [text[a:b] for a, b in sentence_spans(text)]
    words, syl = 0, 0
    per = []
    for s in sents:
        ws = WORD_RX.findall(s)
        if not ws:
            continue
        sy = sum(syllables(w) for w in ws)
        words += len(ws)
        syl += sy
        grade = 0.39 * len(ws) + 11.8 * (sy / len(ws)) - 15.59
        per.append((grade, len(ws), s.strip()))
    n = len(per)
    if not words or not n:
        return None, per
    grade = 0.39 * (words / n) + 11.8 * (syl / words) - 15.59
    return round(grade, 1), per


# --------------------------------------------------------------------------------------
# 9. The checks
# --------------------------------------------------------------------------------------
def res(cid, status, summary, findings=None):
    return Result(cid, status, summary, findings or [])


def worst(findings, default=PASS):
    levels = [f.level for f in findings]
    if FAIL in levels:
        return FAIL
    if WARN in levels:
        return WARN
    return default


def on(lst: Listing, *names) -> bool:
    return any(n in lst.channels for n in names)


def etsy_title_of(d):
    for k in ("etsy_title", "marketplace_title", "title"):
        if d.get(k):
            return k, d[k]
    return None, ""


def c_etsy_title(lst: Listing):
    if not on(lst, "etsy"):
        return res("etsy_title", NA, "not listed on Etsy")
    d = lst.data
    k, t = etsy_title_of(d)
    fs = []
    if not t:
        return res("etsy_title", FAIL, "no title", [Finding("etsy_title", "(missing)", "Etsy needs a title.")])
    note_src = "" if k == "etsy_title" else f" (no etsy_title; tested `{k}`)"
    if len(t) > L["etsy_title_max"]:
        fs.append(Finding(k, t, f"{len(t)} chars > {L['etsy_title_max']}", trim_words(t, L["etsy_title_max"])))
    for ch in "%:&+":
        if t.count(ch) > 1:
            fs.append(Finding(k, t, f"'{ch}' used {t.count(ch)} times; Etsy allows it once"))
    # the brand name is allowed in the title (BRAND.md: "brand name in every listing title/shop name"), so it is not stuffing
    t_nobrand = re.sub(r"\bPlay Before Pixels\b", " ", t, flags=re.I)
    toks = [w.lower().strip("'’") for w in re.findall(r"[A-Za-z][A-Za-z'’-]*", t_nobrand)]
    stems = {}
    for w in toks:
        for part in w.split("-"):
            if part in STOP or len(part) < 3:
                continue
            s = re.sub(r"(['’]s|s)$", "", part) if len(part) > 3 else part
            stems.setdefault(s, []).append(part)
    reps = {s: v for s, v in stems.items() if len(v) > 1}
    if reps:
        rep_txt = ", ".join(f"{'/'.join(sorted(set(v)))} ×{len(v)}" for s, v in reps.items())
        fs.append(Finding(k, t, f"repeated words (title stuffing): {rep_txt}"))
    nwords = len(t.split())
    summ = f"{len(t)} chars, {nwords} words{note_src}"
    return res("etsy_title", worst(fs), summ, fs)


def c_etsy_tags(lst: Listing):
    if not on(lst, "etsy"):
        return res("etsy_tags", NA, "not listed on Etsy")
    tags = lst.data.get("etsy_tags")
    fs = []
    if not tags:
        kw = [k for k in as_list(lst.data.get("keywords")) if isinstance(k, str)]
        prop = ", ".join(trim_words(k, 20) for k in kw[:13])
        fs.append(Finding("etsy_tags", "(missing)", "Etsy listing has no etsy_tags; `keywords` holds 7 long Amazon-style phrases",
                          f"Add 13 tags of ≤20 chars. Starting point from keywords: {prop}"))
        return res("etsy_tags", FAIL, "no etsy_tags", fs)
    if len(tags) != L["etsy_tags_count"]:
        fs.append(Finding("etsy_tags", json.dumps(tags, ensure_ascii=False), f"{len(tags)} tags; need exactly {L['etsy_tags_count']}"))
    seen = set()
    for i, tg in enumerate(tags):
        if len(tg) > L["etsy_tag_max"]:
            fs.append(Finding(f"etsy_tags[{i}]", tg, f"{len(tg)} chars > {L['etsy_tag_max']}", trim_words(tg, L["etsy_tag_max"])))
        if tg.lower() in seen:
            fs.append(Finding(f"etsy_tags[{i}]", tg, "duplicate tag"))
        seen.add(tg.lower())
        if not re.fullmatch(r"[A-Za-z0-9 '’&-]+", tg):
            fs.append(Finding(f"etsy_tags[{i}]", tg, "characters Etsy may reject in tags (UNVERIFIED allowed set)", level=WARN))
    return res("etsy_tags", worst(fs), f"{len(tags)} tags, longest {max(len(t) for t in tags)} chars", fs)


def kdp_title_of(d):
    if d.get("amazon_title"):
        return "amazon_title", d["amazon_title"], ""
    t, s = d.get("title", ""), d.get("subtitle", "")
    return "title + subtitle", f"{t}: {s}" if s else t, "no amazon_title; tested title + ': ' + subtitle"


def c_kdp_title(lst: Listing):
    if not on(lst, "kdp"):
        return res("kdp_title", NA, "no KDP edition")
    k, t, note = kdp_title_of(lst.data)
    fs = []
    if len(t) > L["kdp_title_subtitle_max"]:
        fs.append(Finding(k, t, f"{len(t)} chars > {L['kdp_title_subtitle_max']}" + (f"; {note}" if note else ""),
                          trim_words(t, L["kdp_title_subtitle_max"])))
    elif note and "kdp-activity" in str(lst.data.get("amazon_route", "")):
        fs.append(Finding(k, t, "planned KDP activity edition has no amazon_title; the printable's title/subtitle was tested as a stand-in", level=WARN))
    return res("kdp_title", worst(fs), f"{len(t)} chars ({k})", fs)


def c_kdp_keywords(lst: Listing):
    if not on(lst, "kdp"):
        return res("kdp_keywords", NA, "no KDP edition")
    kw = [k for k in as_list(lst.data.get("keywords")) if isinstance(k, str)]
    fs = []
    if len(kw) > L["kdp_keyword_boxes"]:
        fs.append(Finding("keywords", json.dumps(kw, ensure_ascii=False), f"{len(kw)} keywords; KDP has {L['kdp_keyword_boxes']} boxes"))
    elif len(kw) < L["kdp_keyword_boxes"]:
        fs.append(Finding("keywords", json.dumps(kw, ensure_ascii=False), f"only {len(kw)} of {L['kdp_keyword_boxes']} boxes used", level=WARN))
    for i, k in enumerate(kw):
        if len(k) > L["kdp_keyword_max"]:
            fs.append(Finding(f"keywords[{i}]", k, f"{len(k)} chars > {L['kdp_keyword_max']}", trim_words(k, L["kdp_keyword_max"])))
        if re.search(r"\b(best ?sellers?|#1|new release|kindle unlimited|on sale|free shipping)\b", k, re.I):
            fs.append(Finding(f"keywords[{i}]", k, "KDP bans sales/ranking claims in keywords (UNVERIFIED)"))
        for m in re.finditer(r"\bfree\b", k, re.I):
            before = k[:m.start()]
            if not re.search(r"(-|\w\s)$", before):
                fs.append(Finding(f"keywords[{i}]", k, "'free' as a price word in a KDP keyword (UNVERIFIED rule)", level=WARN))
        if re.search(r"[\"“”]", k):
            fs.append(Finding(f"keywords[{i}]", k, "quotation marks in a KDP keyword", level=WARN))
    return res("kdp_keywords", worst(fs), f"{len(kw)} boxes, longest {max((len(k) for k in kw), default=0)} chars", fs)


def c_kdp_description(lst: Listing):
    if not on(lst, "kdp"):
        return res("kdp_description", NA, "no KDP edition")
    ld = lst.data.get("long_description", "")
    fs = []
    if not ld:
        fs.append(Finding("long_description", "(missing)", "no description"))
    elif len(ld) > L["kdp_description_max"]:
        fs.append(Finding("long_description", ld[:200] + "…", f"{len(ld)} chars > {L['kdp_description_max']}"))
    return res("kdp_description", worst(fs), f"{len(ld)} chars", fs)


def c_shopify_seo(lst: Listing):
    if not on(lst, "site"):
        return res("shopify_seo", NA, "not sold on the own site")
    d, fs = lst.data, []
    st, sd = d.get("seo_title", ""), d.get("seo_description", "")
    if not st:
        fs.append(Finding("seo_title", "(missing)", "no SEO title"))
    elif len(st) > L["shopify_seo_title_max"]:
        fs.append(Finding("seo_title", st, f"{len(st)} chars > {L['shopify_seo_title_max']}", trim_words(st, L["shopify_seo_title_max"])))
    if not sd:
        fs.append(Finding("seo_description", "(missing)", "no meta description"))
    elif len(sd) > L["shopify_meta_max"]:
        fs.append(Finding("seo_description", sd, f"{len(sd)} chars > {L['shopify_meta_max']}", trim_words(sd, L["shopify_meta_max"])))
    return res("shopify_seo", worst(fs), f"title {len(st)} / meta {len(sd)} chars", fs)


def c_tpt_title(lst: Listing):
    if not on(lst, "tpt"):
        return res("tpt_title", NA, "not on TpT" + (" (explicitly excluded)" if "tpt" in lst.negated else ""))
    t = lst.data.get("tpt_title") or lst.data.get("title", "")
    fs = []
    if len(t) > L["tpt_title_max"]:
        fs.append(Finding("tpt_title" if lst.data.get("tpt_title") else "title", t, f"{len(t)} chars > {L['tpt_title_max']}", trim_words(t, L["tpt_title_max"])))
    return res("tpt_title", worst(fs), f"{len(t)} chars", fs)


def c_mod(lst: Listing):
    if not on(lst, "mod"):
        return res("mod_fields", NA, "not on Merch on Demand")
    d, fs = lst.data, []
    t = d.get("amazon_title") or d.get("title", "")
    if len(t) > L["mod_title_max"]:
        fs.append(Finding("title", t, f"{len(t)} chars > {L['mod_title_max']}", trim_words(t, L["mod_title_max"])))
    for i, b in enumerate(as_list(d.get("bullets"))[:2]):
        if len(b) > L["mod_bullet_max"]:
            fs.append(Finding(f"bullets[{i}]", b, f"{len(b)} chars > {L['mod_bullet_max']}"))
    ld = d.get("long_description", "")
    if len(ld) > L["mod_description_max"]:
        fs.append(Finding("long_description", ld[:160] + "…", f"{len(ld)} chars > {L['mod_description_max']}"))
    return res("mod_fields", worst(fs), f"title {len(t)}, description {len(ld)} chars; MoD uses only 2 bullets", fs)


BRAND_REQUIRED = ["slug", "title", "subtitle", "format", "trim", "pages", "ages", "price_usd", "price_notes", "short_description",
                  "long_description", "bullets", "keywords", "seo_title", "seo_description", "alt_text", "channels",
                  "compliance_notes", "human_todo", "next_products", "bonus_url", "amazon_route"]


def c_brand_schema(lst: Listing):
    d, fs = lst.data, []
    missing = [k for k in BRAND_REQUIRED if k not in d or d.get(k) in (None, "", [])]
    if missing:
        fs.append(Finding("(record)", ", ".join(missing), "required by BRAND.md (deliverables, repeat-purchase and Amazon-edition rules)",
                          "Add: " + ", ".join(missing)))
    sd = d.get("short_description", "")
    if len(sd) > IL["brand_short_max"]:
        fs.append(Finding("short_description", sd, f"{len(sd)} chars > {IL['brand_short_max']}", trim_words(sd, IL["brand_short_max"])))
    ld = d.get("long_description", "")
    wc = len(WORD_RX.findall(ld))
    if ld and not (IL["brand_long_words_min"] <= wc <= IL["brand_long_words_max"]):
        fs.append(Finding("long_description", f"({wc} words)", f"BRAND.md asks for {IL['brand_long_words_min']}–{IL['brand_long_words_max']} words",
                          "Cut repeated inventory lists (the bullets already carry them)." if wc > IL["brand_long_words_max"] else "Add a what's-inside paragraph.",
                          level=WARN))
    nb = len(as_list(d.get("bullets")))
    if nb and nb != IL["brand_bullets"]:
        fs.append(Finding("bullets", f"({nb} bullets)", f"BRAND.md asks for {IL['brand_bullets']}"))
    nk = len(as_list(d.get("keywords")))
    if nk and nk != IL["brand_keywords"]:
        fs.append(Finding("keywords", f"({nk} keywords)", f"BRAND.md asks for {IL['brand_keywords']}"))
    st = d.get("seo_title", "")
    if len(st) > IL["brand_seo_title_max"]:
        fs.append(Finding("seo_title", st, f"{len(st)} chars > BRAND.md {IL['brand_seo_title_max']}", trim_words(st, IL["brand_seo_title_max"]), level=WARN))
    sde = d.get("seo_description", "")
    if len(sde) > IL["brand_seo_desc_max"]:
        fs.append(Finding("seo_description", sde, f"{len(sde)} chars > BRAND.md {IL['brand_seo_desc_max']}", trim_words(sde, IL["brand_seo_desc_max"]), level=WARN))
    npd = as_list(d.get("next_products"))
    if npd and not (2 <= len(npd) <= 3):
        fs.append(Finding("next_products", json.dumps(npd), "BRAND.md asks for 2–3 slugs", level=WARN))
    return res("brand_schema", worst(fs), f"{len(missing)} required field(s) missing; long_description {wc} words", fs)


def _scan(texts, rules, negation=True, skip=None):
    hits = []
    for path, text in texts:
        for pat, label, sev in rules:
            for m in pat.finditer(text):
                if skip and skip(path, text, m):
                    continue
                neg = negation and is_negated(text, m.start())
                sent = sentence_at(text, m.start()) if len(text) > 90 else text
                hits.append((path, m.group(0), sent, label, sev, neg))
    return hits


def c_health(lst: Listing):
    hits = _scan(public_texts(lst.data), HEALTH_RULES)
    fs = []
    for path, m, sent, label, sev, neg in hits:
        if neg and sev == FAIL:
            fs.append(Finding(path, sent, f"'{m}': {label}, negated (still a banned word in public copy)", level=WARN))
        else:
            fs.append(Finding(path, sent, f"'{m}': {label}", level=sev))
    return res("health_claims", worst(fs), f"{len(fs)} hit(s) in public fields", _dedupe(fs))


def c_named(lst: Listing):
    fs = []
    for path, m, sent, label, sev, neg in _scan(public_texts(lst.data), NAMED_RULES, negation=False):
        fs.append(Finding(path, sent, f"'{m}': {label}", level=sev))
    # excluded organisations are sensitive even in internal notes
    for path, m, sent, label, sev, neg in _scan(internal_texts(lst.data), NAMED_RULES[:1], negation=False):
        fs.append(Finding(path, sent, f"'{m}': {label} (internal field)",
                          "Drop the place name from internal notes (for example 'the old commercial mailbox is retired'), "
                          "so a whole-file CI word check stays clean and no local angle leaks into a published field.", level=WARN))
    # lowercase tags/keywords can still carry a creator or brand name
    ci = re.compile(NAMED_RULES[3][0].pattern + r"|\b(lovevery|montessori|ms rachel|busy toddler|big little feelings|good inside|cocomelon|bluey)\b", re.I)
    for path, t in public_texts(lst.data, ["keywords", "etsy_tags"]):
        for m in ci.finditer(t):
            if not NAMED_RULES[3][0].search(t):
                fs.append(Finding(path, t, f"'{m.group(0)}' reads as a creator, show or brand name in a search field", level=WARN))
    tools = sorted({m.group(0) for _, t in public_texts(lst.data) for m in ALLOWED_NAMES.finditer(t)})
    summ = f"{len([f for f in fs if f.level == FAIL])} fail hit(s)" + (f"; neutral tool/channel names (allowed): {', '.join(tools)}" if tools else "")
    return res("named_entities", worst(fs), summ, _dedupe(fs))


def c_autism(lst: Listing):
    fs = []
    for path, t in public_texts(lst.data):
        for m in AUTISM_RX.finditer(t):
            fs.append(Finding(path, sentence_at(t, m.start()) if len(t) > 90 else t, f"'{m.group(0)}' in public copy (BRAND 'Autism searches')"))
    for path, t in public_texts(lst.data, SEARCH_FIELDS):
        for m in AUTISM_ADJACENT_RX.finditer(t):
            fs.append(Finding(path, t, f"'{m.group(0)}' is an autism/therapy-adjacent search term in a search field; "
                                       "founder decides if it targets diagnosis searches", level=WARN))
    internal = [(p, m.group(0)) for p, t in internal_texts(lst.data) for m in AUTISM_RX.finditer(t)]
    if internal:
        fs.append(Finding(internal[0][0], ", ".join(sorted({m for _, m in internal})),
                          f"{len(internal)} mention(s) in internal notes; a whole-file CI banned-word check (G2-04) would trip",
                          "Say 'diagnosis or condition wording' in compliance notes instead of naming the condition.", level=WARN))
    return res("autism_terms", worst(fs), f"{len([f for f in fs if f.level == FAIL])} public hit(s)", _dedupe(fs))


def _dated_promo(d: dict) -> bool:
    for k in ("promotions", "price_history", "promo", "sale", "list_price_dates", "former_price_dates"):
        v = d.get(k)
        if v and re.search(r"\d{4}-\d{2}-\d{2}", json.dumps(v)):
            return True
    return False


def _anchor_fields(d, path=""):
    for k, v in d.items():
        p = f"{path}.{k}" if path else k
        if isinstance(v, dict):
            yield from _anchor_fields(v, p)
        elif re.search(r"(list_price|compare_at|compare_parts|was_price|regular_price|original_price|msrp|anchor)", k) and num(v) is not None:
            yield p, num(v)


def c_pricing(lst: Listing):
    d, fs = lst.data, []
    price = num(d.get("price_usd"))
    dated = _dated_promo(d)
    for p, v in _anchor_fields(d):
        base = num(d["bundle"].get("price_usd")) if p.startswith("bundle.") and isinstance(d.get("bundle"), dict) else price
        if base is None or v <= base:
            continue
        if p.startswith("bundle."):
            rule = str(d["bundle"].get("price_display_rule", ""))
            fs.append(Finding(p, f"{p} = {v} vs bundle price {base}",
                              "sum-of-parts comparison: allowed only as '$X, or $Y bought separately' and only while each part really sells at that price"
                              + ("; display rule present" if rule else "; no display rule")
                              + ". A field named compare_at* may be mapped to Shopify's compare-at price, which shows a strikethrough.",
                              "Rename to `separately_usd` and keep the plain-words display rule.", level=WARN))
        elif not dated:
            fs.append(Finding(p, f"{p} = {v} (price_usd {price})",
                              "former/list price above the selling price with no dated record of a real offer at that price (16 CFR 233.1; gate 18)",
                              f"Set {p} to null and sell at ${price:.2f} plainly; or add \"promotions\": [{{\"price\": {price}, \"start\": \"YYYY-MM-DD\", \"end\": \"YYYY-MM-DD\", \"reason\": \"launch week\"}}] only for a real, time-limited sale."))
    pn = str(d.get("price_notes", ""))
    for m in PLAN_ANCHOR_RX.finditer(pn):
        if is_negated(pn, m.start()):
            continue
        fs.append(Finding("price_notes", sentence_at(pn, m.start()),
                          "pricing plan uses a standing/usual sale off a list price: a permanent anchor (16 CFR 233.1; BRAND 'Honest pricing'; G2-11)",
                          level=FAIL if not dated else WARN))
    for path, t in public_texts(d):
        for pat in ANCHOR_TEXT_RULES:
            for m in pat.finditer(t):
                if re.search(r"money-back|guarantee", sentence_at(t, m.start()), re.I):
                    continue
                fs.append(Finding(path, sentence_at(t, m.start()) if len(t) > 90 else t,
                                  f"'{m.group(0)}': price anchor or urgency wording in public copy", level=FAIL if not dated else WARN))
    kinds = lst.kinds
    if "digital" in kinds and "book" not in kinds and "merch" not in kinds and price is not None and price < IL["single_printable_min"]:
        fs.append(Finding("price_usd", f"{price}", f"single printable under ${IL['single_printable_min']:.2f} (commerce/PRICING.md s.1; DEMAND-CHECK rule 3)",
                          f"Price at ${IL['single_printable_min']:.2f} or more, or sell it only inside a bundle / as a free lead magnet."))
    if on(lst, "kdp") and "book" in kinds and price is not None and price < IL["kdp_paperback_min"]:
        fs.append(Finding("price_usd", f"{price}", f"KDP paperback under ${IL['kdp_paperback_min']} (PRICING.md s.2)", level=WARN))
    summ = f"price ${price:.2f}" if price is not None else "no price_usd"
    return res("honest_pricing", worst(fs), summ, _dedupe(fs))


AI_KEYS = {
    "etsy": ([["etsy"], ["etsy_attribution", "etsy_ai_flag"]], FAIL),
    "kdp": ([["kdp"], ["kdp_ai_text", "kdp_ai_images", "kdp_ai_translation"]], FAIL),
    "social": ([["social"], ["social_ai_label"]], FAIL),
    "tpt": ([["tpt"], ["tpt_ai"]], FAIL),
    "mod": ([["merch_on_demand"], ["amazon_merch"], ["mod"], ["amazon"]], FAIL),
    "ingramspark": ([["ingramspark"]], WARN),
    "site": ([["site"], ["how_we_make_things"]], WARN),
}


def _filled(v):
    return v is not None and (isinstance(v, bool) or str(v).strip() != "")


def c_ai(lst: Listing):
    d, fs = lst.data, []
    ai = d.get("ai_disclosure")
    chans = [c for c in lst.channels if c in AI_KEYS]
    if not isinstance(ai, dict) or not any(_filled(v) for v in ai.values()):
        tmpl = _ai_template(lst)
        fs.append(Finding("ai_disclosure", "(missing)" if ai is None else json.dumps(ai), "blank for every channel (gate 17; G2-08)", tmpl))
    else:
        for c in chans:
            options, sev = AI_KEYS[c]
            if not any(all(_filled(ai.get(k)) for k in opt) for opt in options):
                later = lst.channels[c] == "later"
                fs.append(Finding("ai_disclosure", json.dumps(ai, ensure_ascii=False)[:160] + "…",
                                  f"no entry for channel '{c}' ({lst.channels[c]})" + (" - planned channel, so WARN until it goes live" if later and sev == FAIL else ""),
                                  _ai_template(lst, only=c), level=WARN if later else sev))
        if "kdp" in chans and _filled(ai.get("kdp")) and not all(_filled(ai.get(k)) for k in ("kdp_ai_text", "kdp_ai_images", "kdp_ai_translation")):
            if not re.search(r"translat", str(ai.get("kdp")), re.I):
                fs.append(Finding("ai_disclosure.kdp", str(ai.get("kdp")), "KDP asks separately about AI text, images and translation; translation is not answered (G2-08 names kdp_ai_text / kdp_ai_images / kdp_ai_translation)",
                                  '"kdp_ai_text": "AI-generated, then edited by the founder", "kdp_ai_images": "AI-generated", "kdp_ai_translation": "none"', level=WARN))
        if "etsy" in chans and _filled(ai.get("etsy")) and not ("etsy_attribution" in ai and "etsy_ai_flag" in ai):
            fs.append(Finding("ai_disclosure.etsy", str(ai.get("etsy"))[:200], "free text instead of the machine-checkable etsy_attribution + etsy_ai_flag fields (G2-08)",
                              '"etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true', level=WARN))
    for path, t in public_texts(d):
        for m in HUMAN_MADE_RX.finditer(t):
            fs.append(Finding(path, sentence_at(t, m.start()), f"'{m.group(0)}': describes AI-assisted art as human-made (gate 8)"))
    return res("ai_disclosure", worst(fs), "channels: " + ", ".join(f"{c}({s})" for c, s in lst.channels.items() if c in AI_KEYS), _dedupe(fs))


def _ai_template(lst: Listing, only=None):
    parts = []
    c = lst.channels
    if (only in (None, "etsy")) and "etsy" in c:
        parts.append('"etsy_attribution": "Designed by Play Before Pixels", "etsy_ai_flag": true')
    if (only in (None, "kdp")) and "kdp" in c:
        parts.append('"kdp_ai_text": "AI-generated", "kdp_ai_images": "AI-generated", "kdp_ai_translation": "none"')
    if (only in (None, "tpt")) and "tpt" in c:
        parts.append('"tpt": "AI-assisted design and illustrations; answer TpT\'s AI question truthfully"')
    if (only in (None, "mod")) and "mod" in c:
        parts.append('"merch_on_demand": "logo artwork: answer Amazon\'s AI question truthfully"')
    if (only in (None, "ingramspark")) and "ingramspark" in c:
        parts.append('"ingramspark": "AI-generated images and draft text disclosed on the title setup"')
    if (only in (None, "site")) and "site" in c:
        parts.append('"site": "product page line: \'Illustrations and text are made with AI assistance.\' (say \'edited by the founder\' only after she has)"')
    if only in (None, "social"):
        parts.append('"social_ai_label": "apply each platform\'s AI label to posts that use these images"')
    note = "  (Answers must match what really happened: set etsy_ai_flag from Etsy's current form [UNVERIFIED wording]; " \
           "add 'edited by the founder' to any answer only after she has rewritten that part.)"
    return '"ai_disclosure": {' + ", ".join(parts) + "}" + note


def est_nets(lst: Listing):
    """Estimated net per unit for digital channels (UNVERIFIED fee model). Returns dict or {}."""
    d = lst.data
    if "digital" not in lst.kinds:
        return {}
    p = num(d.get("price_pdf_usd")) or num(d.get("price_usd"))
    if p is None:
        return {}
    r = FEES["refund_allowance_pct"]
    out = {}
    if "etsy" in lst.channels:
        e = FEES["etsy"]
        base = p - e["listing"] - e["transaction_pct"] * p - e["processing_pct"] * p - e["processing_fixed"] - r * p
        out["etsy"] = round(base, 2)
        out["etsy_offsite_ad_sale"] = round(base - e["offsite_ads_pct"] * p, 2)
    if "site" in lst.channels:
        if re.search(r"merchant of record", json.dumps(d.get("channels", ""))):
            m = FEES["mor"]
            out["site_mor"] = round(p - m["pct"] * p - m["fixed"] - r * p, 2)
        else:
            s = FEES["site"]
            out["site"] = round(p - s["processing_pct"] * p - s["processing_fixed"] - r * p, 2)
    if "tpt" in lst.channels:
        t = FEES["tpt"]
        out["tpt"] = round(t["payout_pct"] * p - t["fixed"] - r * p, 2)
    return out


def c_price_floor(lst: Listing):
    d, fs = lst.data, []
    floor_key = "price_floor" if "price_floor" in d else ("price_floor_usd" if "price_floor_usd" in d else None)
    floor = num(d.get(floor_key)) if floor_key else None
    nets = d.get("net_per_unit_by_channel")
    est = est_nets(lst)
    est_txt = ", ".join(f"{k} ≈ ${v:.2f}" for k, v in est.items())
    if floor is None:
        fs.append(Finding("price_floor", "(missing)", "no price_floor (gate 18; G2-11)",
                          f'"price_floor": {IL["digital_floor"]:.2f}' if "digital" in lst.kinds else '"price_floor": <net that keeps 30% POD margin / $3.00 digital>'))
    elif floor_key != "price_floor":
        fs.append(Finding(floor_key, f"{floor_key} = {floor}", "field is named price_floor_usd; G2-11 and ROUTINE.md name it price_floor, so a CI check keyed on price_floor will miss it",
                          f'"price_floor": {floor}', level=WARN))
    if not isinstance(nets, dict) or not nets:
        prop = ('"net_per_unit_by_channel": {' + ", ".join(f'"{k}": {v}' for k, v in est.items()) + "}  (estimates, UNVERIFIED fees; replace with calculator figures)") if est \
            else '"net_per_unit_by_channel": {"kdp": <royalty minus print cost from KDP calculator>, ...}'
        fs.append(Finding("net_per_unit_by_channel", "(missing)", "no per-channel net (gate 18; G2-11)" + (f"; estimate: {est_txt}" if est_txt else ""), prop))
    elif floor is not None:
        for ch, v in nets.items():
            if num(v) is not None and num(v) < floor:
                fs.append(Finding(f"net_per_unit_by_channel.{ch}", f"{v}", f"below price_floor {floor}"))
    if est and floor is not None:
        for k, v in est.items():
            if v < floor:
                fs.append(Finding("(estimate)", f"{k} ≈ ${v:.2f}", f"estimated net below the ${floor:.2f} floor (UNVERIFIED fee model)",
                                  _min_price_hint(k, floor), level=WARN))
    elif est:
        for k, v in est.items():
            if v < IL["digital_floor"]:
                fs.append(Finding("(estimate)", f"{k} ≈ ${v:.2f}", f"estimated net below the ${IL['digital_floor']:.2f} digital floor (UNVERIFIED fee model)",
                                  _min_price_hint(k, IL["digital_floor"]), level=WARN))
    return res("price_floor", worst(fs), (f"floor {floor}" if floor is not None else "no floor") + (f"; est. {est_txt}" if est_txt else ""), fs)


def _min_price_hint(channel: str, floor: float) -> str:
    e, r = FEES["etsy"], FEES["refund_allowance_pct"]
    if channel.startswith("etsy"):
        pct = e["transaction_pct"] + e["processing_pct"] + r + (e["offsite_ads_pct"] if "offsite" in channel else 0)
        p = (floor + e["listing"] + e["processing_fixed"]) / (1 - pct)
        return (f"Lowest price that still clears ${floor:.2f} on this kind of sale: about ${p:.2f} (UNVERIFIED fees)."
                + (" Or opt out of Etsy Offsite Ads if the shop is still allowed to [VERIFY]." if "offsite" in channel else ""))
    if channel == "tpt":
        t = FEES["tpt"]
        return f"Lowest TpT price that clears ${floor:.2f}: about ${(floor + t['fixed']) / (t['payout_pct'] - r):.2f} (UNVERIFIED payout)."
    return ""


def c_owner(lst: Listing):
    blob = "\n".join(t for _, t in all_texts(lst.data))
    fs = []
    where = [p for p, t in all_texts(lst.data) if OWNER_RX.search(t)]
    if re.search(r"Play Before Pixels,? LLC|©\s*20\d\d\s+Play Before Pixels", blob):
        fs.append(Finding("(record)", "Play Before Pixels LLC / © Play Before Pixels", "wrong legal owner; the owner is AlphaPlay LLC"))
    if where:
        return res("owner_line", worst(fs), f"found in {where[0].lstrip('.')}", fs)
    if "AlphaPlay LLC" in blob:
        fs.append(Finding("(record)", "(only a partial 'AlphaPlay LLC' mention)", "the exact owner line is not recorded",
                          f'"owner_line": "{OWNER_LINE}"', level=WARN))
    else:
        fs.append(Finding("(record)", "(missing)", "no AlphaPlay LLC owner line anywhere in the record", f'"owner_line": "{OWNER_LINE}"'))
    return res("owner_line", worst(fs), "not found", fs)


def c_address(lst: Listing):
    fs = []
    for path, t in all_texts(lst.data):
        for pat, label in ((STREET_RX, "street address"), (APT_RX, "apartment/unit number"), (ZIP_RX, "state + ZIP"),
                           (PHONE_RX, "phone number"), (EMAIL_RX, "personal email address")):
            for m in pat.finditer(t):
                if label == "phone number" and re.sub(r"\D", "", m.group(0)).lstrip("1") in {n.lstrip("1") for n in PUBLIC_NUMBERS}:
                    continue
                fs.append(Finding(path.lstrip("."), redact(m.group(0)), f"{label} (redacted in this report)",
                                  "Remove it. Public copy uses only the PO Box from legal/ENTITY.md, and only where the law requires an address."))
    return res("no_home_address", worst(fs), f"{len(fs)} hit(s) in all fields", fs)


def c_reply(lst: Listing):
    fs = []
    for path, m, sent, label, sev, neg in _scan(public_texts(lst.data), REPLY_RULES, negation=False):
        if APPROVED_REPLY_WORDING in sent.lower():
            continue
        fs.append(Finding(path, sent, f"'{m}': {label}", level=sev))
    return res("no_reply_promise", worst(fs), f"{len(fs)} hit(s)", _dedupe(fs))


def c_coaching(lst: Listing):
    fs, info = [], []
    for path, t in public_texts(lst.data):
        for pat in COACH_RULES:
            for m in pat.finditer(t):
                sent = sentence_at(t, m.start()) if len(t) > 90 else t
                if is_negated(t, m.start()):
                    info.append(sent)
                else:
                    fs.append(Finding(path, sent, f"'{m.group(0)}': live/coaching wording (BRAND self-running rule; gate 21)"))
    summ = f"{len(fs)} hit(s)" + (f"; {len(set(info))} negated mention(s) OK (e.g. \"{info[0][:70]}\")" if info else "")
    return res("no_coaching", worst(fs), summ, _dedupe(fs))


def c_market_links(lst: Listing):
    mk = [c for c in ("etsy", "tpt") if c in lst.channels]
    if not mk:
        return res("marketplace_links", NA, "no Etsy/TpT channel")
    fs = []
    for path, t in public_texts(lst.data, MARKETPLACE_FIELDS):
        for m in MARKET_LINK_RX.finditer(t):
            fs.append(Finding(path, sentence_at(t, m.start()) if len(t) > 90 else t,
                              f"'{m.group(0)}' in copy that goes to {'/'.join(mk)} (gate 16; G2-09)",
                              "Etsy/TpT edition: 'Find more in this shop.' Keep the site link and bonus/QR wording in a site-only field."))
    return res("marketplace_links", worst(fs), f"{len(fs)} hit(s) in shared marketplace fields", _dedupe(fs))


def c_readability(lst: Listing):
    d = lst.data
    ld = d.get("long_description", "")
    if not ld:
        return res("readability", FAIL, "no long_description", [Finding("long_description", "(missing)", "nothing to score")])
    g, per = fk_stats(ld)
    combo = "\n".join([d.get("short_description", ""), ld] + [b for b in as_list(d.get("bullets")) if isinstance(b, str)]
                      + [x.get("a", "") for x in as_list(d.get("faq")) if isinstance(x, dict)])
    g2, _ = fk_stats(combo)
    fs = []
    status = PASS
    if g is not None and g > IL["fk_grade_max"]:
        status = WARN if g <= IL["fk_grade_max"] + 0.5 else FAIL
        longs = [x for x in per if x[1] >= 15] or per
        hardest = sorted(longs, key=lambda x: (-x[0], -x[1]))[:2]
        for gr, n, s in hardest:
            fs.append(Finding("long_description", s, f"sentence grade {gr:.1f}, {n} words (whole description grade {g}"
                              + ("; borderline, the heuristic runs about 0.5-1 grade high)" if status == WARN else ")"),
                              "Split into sentences of 15 words or fewer; swap long words for short ones.", level=status))
    return res("readability", status, f"long_description FK {g}; all parent-facing text FK {g2}", fs)


def c_lead(lst: Listing):
    d = lst.data
    ld = norm_ws(d.get("long_description", ""))
    lead = ld[:IL["lead_chars"]]
    adult = bool(re.search(r"^\s*adult", str(d.get("ages", "")), re.I))
    have = {
        "what": bool(PRODUCT_RX.search(lead)),
        "age": bool(AGE_RX.search(lead)) or (adult and bool(ADULT_RX.search(lead))),
        "format": bool(FORMAT_RX.search(lead)),
    }
    miss = [k for k, v in have.items() if not v]
    fs = []
    if miss:
        fs.append(Finding("long_description[:160]", lead, "missing: " + ", ".join(miss), _auto_lead(lst)))
    sd = norm_ws(d.get("short_description", ""))
    sd_ok = bool(PRODUCT_RX.search(sd)) and (bool(AGE_RX.search(sd)) or (adult and bool(ADULT_RX.search(sd)))) and bool(FORMAT_RX.search(sd))
    return res("lead_160", FAIL if fs else PASS,
               ("has " + ", ".join(k for k, v in have.items() if v) if not miss else "missing " + ", ".join(miss))
               + f"; short_description {'has all three' if sd_ok else 'lacks one or more'}", fs)


def _auto_lead(lst: Listing):
    d = lst.data
    ages = re.search(r"\d{1,2}\s*[–-]\s*\d{1,2}", str(d.get("ages", "")))
    fmt = str(d.get("format", "")).lower()
    f = ("printable PDF" if "digital" in lst.kinds and "book" not in lst.kinds else
         "paperback" if "paperback" in fmt else "hardcover or softcover" if "hardcover" in fmt else
         "print-on-demand tee" if "tee" in fmt else "product")
    a = f"for ages {ages.group(0)}" if ages else "for grown-ups"
    return f"Open with one plain sentence before the hook: \"{d.get('title', '')}: a {f} {a}.\""


def _dedupe(fs):
    seen, out = set(), []
    for f in fs:
        k = (f.field, f.text, f.note)
        if k not in seen:
            seen.add(k)
            out.append(f)
    return out


ALL_CHECKS = [c_etsy_title, c_etsy_tags, c_kdp_title, c_kdp_keywords, c_kdp_description, c_shopify_seo, c_tpt_title, c_mod,
              c_brand_schema, c_health, c_named, c_autism, c_pricing, c_ai, c_price_floor, c_owner, c_address, c_reply,
              c_coaching, c_market_links, c_readability, c_lead]


# --------------------------------------------------------------------------------------
# 10. Loading
# --------------------------------------------------------------------------------------
def load(root: str, include_archived=False, only=None):
    listings, skipped, missing = [], [], []
    prod = os.path.join(root, "products")
    paths = sorted(set(glob.glob(os.path.join(prod, "*", "listing*.json")) + glob.glob(os.path.join(prod, "*", "*", "listing*.json"))
                       + glob.glob(os.path.join(prod, "*", "*", "*listing*.json"))))
    paths = [p for p in paths if "node_modules" not in p and f"{os.sep}build{os.sep}" not in p]
    for p in paths:
        rel = os.path.relpath(p, root)
        if "ARCHIVED" in os.path.basename(p) and not include_archived:
            skipped.append(rel)
            continue
        try:
            with open(p, encoding="utf-8") as fh:
                data = json.load(fh)
        except Exception as e:  # file mid-edit by another workflow, or broken JSON
            lst = Listing(rel, os.path.basename(os.path.dirname(p)), {}, None, load_error=str(e))
            listings.append(lst)
            continue
        items = data if isinstance(data, list) else [data]
        for i, it in enumerate(items):
            if not isinstance(it, dict):
                continue
            slug = it.get("slug") or os.path.basename(os.path.dirname(p))
            lst = Listing(rel, slug, it, i if isinstance(data, list) else None)
            lst.channels, lst.negated = detect_channels(it)
            lst.kinds = detect_kinds(it)
            listings.append(lst)
    for dname in sorted(os.listdir(prod)):
        dp = os.path.join(prod, dname)
        if os.path.isdir(dp) and not glob.glob(os.path.join(dp, "listing*.json")):
            missing.append(os.path.relpath(dp, root))
    if only:
        listings = [l for l in listings if l.slug == only or only in l.path]
    return listings, skipped, missing


CHANNEL_OF_CHECK = {"etsy_title": ("etsy",), "etsy_tags": ("etsy",), "kdp_title": ("kdp",), "kdp_keywords": ("kdp",),
                    "kdp_description": ("kdp",), "shopify_seo": ("site",), "tpt_title": ("tpt",), "mod_fields": ("mod",),
                    "marketplace_links": ("etsy", "tpt")}


def _downgrade_later(lst: Listing, r: Result):
    """A field-limit failure on a channel that is only planned for later is a WARN, not a publishing block."""
    chans = [c for c in CHANNEL_OF_CHECK.get(r.cid, ()) if c in lst.channels]
    if chans and all(lst.channels[c] == "later" for c in chans) and r.status == FAIL:
        for f in r.findings:
            if f.level == FAIL:
                f.level = WARN
                f.note += " (channel planned for later, so WARN)"
        r.status = WARN


def run(listings):
    for lst in listings:
        if lst.load_error:
            lst.results = [res("brand_schema", FAIL, f"JSON did not load: {lst.load_error}",
                               [Finding("(file)", lst.load_error, "fix the JSON (or re-run after the other workflow finishes writing)")])]
            continue
        lst.results = []
        for fn in ALL_CHECKS:
            try:
                r = fn(lst)
            except Exception as e:  # never let one bad field hide the other checks
                r = res(fn.__name__, FAIL, f"checker error: {e!r}")
            _downgrade_later(lst, r)
            for f in r.findings:
                key = (lst.slug, r.cid, f.field, f.text)
                if key in MANUAL_PROPOSALS:
                    f.proposal = MANUAL_PROPOSALS[key]
            lst.results.append(r)


# --------------------------------------------------------------------------------------
# 11. Output
# --------------------------------------------------------------------------------------
SYM = {PASS: "PASS", FAIL: "FAIL", WARN: "WARN", NA: "–"}


def result_map(lst):
    return {r.cid: r for r in lst.results}


def to_json(listings, skipped, missing):
    return {
        "generated": _dt.datetime.now().isoformat(timespec="seconds"),
        "limits": [dict(key=k, channel=c, field=f, limit=v, source=s, status=st) for k, c, f, v, s, st in PLATFORM_LIMITS],
        "listings": [{
            "file": l.path, "slug": l.slug, "index": l.index, "status": l.data.get("status", ""),
            "channels": l.channels, "negated_channels": sorted(l.negated), "kinds": sorted(l.kinds),
            "results": [dict(cid=r.cid, status=r.status, summary=r.summary, findings=[asdict(f) for f in r.findings]) for r in l.results],
        } for l in listings],
        "skipped": skipped, "missing": missing,
    }


def fail_keys(js):
    return {(l["slug"], r["cid"]) for l in js["listings"] for r in l["results"] if r["status"] == FAIL}


def print_summary(listings, skipped, missing, verbose=False, new=None):
    ids = [c for c, _ in CHECKS]
    w = max([len(l.slug) for l in listings] + [10])
    print("Listing QA  (" + ", ".join(f"{i+1}={SHORT[c]}" for i, c in enumerate(ids)) + ")")
    print(" " * (w + 2) + " ".join(f"{i+1:>2}" for i in range(len(ids))) + "   F  W")
    for l in listings:
        rm = result_map(l)
        cells = []
        for c in ids:
            s = rm[c].status if c in rm else "  "
            cells.append({"PASS": " .", "FAIL": " F", "WARN": " w", "N/A": " -"}.get(s, " ?"))
        nf = sum(1 for r in l.results if r.status == FAIL)
        nw = sum(1 for r in l.results if r.status == WARN)
        print(f"{l.slug:<{w}}  " + " ".join(x.strip().rjust(2) for x in cells) + f"  {nf:>2} {nw:>2}")
        if verbose:
            for r in l.results:
                if r.status in (FAIL, WARN):
                    print(f"    [{r.status}] {CHECK_NAMES.get(r.cid, r.cid)}: {r.summary}")
                    for f in r.findings:
                        print(f"        - {f.level} {f.field}: {f.note} :: {f.text[:140]}")
    if missing:
        print("No listing file: " + ", ".join(missing))
    if skipped:
        print("Skipped (archived): " + ", ".join(skipped))
    if new is not None:
        print(f"NEW failures vs baseline: {len(new)}")
        for s, c in sorted(new):
            print(f"  {s}: {c}")


def q(s: str) -> str:
    """Blockquote a (possibly multi-line) string for Markdown."""
    return "\n".join("> " + line if line.strip() else ">" for line in str(s).splitlines() or [""])


def write_report(path, listings, skipped, missing, root):
    ids = [c for c, _ in CHECKS]
    now = _dt.date.today().isoformat()
    out = []
    A = out.append
    A("# Listing QA: marketplace reviewer + compliance officer pass")
    A("")
    A(f"Generated {now} by `ops/TESTS/check_listings.py`. Re-run: `python3 ops/TESTS/check_listings.py --report ops/TESTS/listing-qa.md`.")
    A("The script only reads product files. Proposed replacement lines are suggestions for the product owner to apply; nothing here was edited in `products/`.")
    A("")
    A("Legend: **PASS** · **FAIL** (blocks publishing that item, per ROUTINE.md) · **WARN** (a person decides) · **–** (does not apply to this listing's channels).")
    A("")
    A("## 1. Limits and rules used")
    A("")
    A("Platform numbers come from memory; web search was not available in this session, so **every platform limit is UNVERIFIED** and listed again under *Needs a live check*.")
    A("")
    A("| Channel | Field | Limit used | Where it should be confirmed | Status |")
    A("|---|---|---|---|---|")
    for k, c, f, v, s, st in PLATFORM_LIMITS:
        A(f"| {c} | {f} | {v} | {s} | **{st}** |")
    A("| Etsy / site / TpT / merchant of record | Fees used for the estimated nets (listing $0.20; 6.5% transaction; 3% + $0.25 processing; 15% Offsite Ads; Shopify 2.9% + $0.30; MoR 5% + $0.50; TpT basic 55% − $0.30; 5% refund allowance) | – | each platform's fee page | **UNVERIFIED** |")
    for k, c, f, v, s in INTERNAL_LIMITS:
        A(f"| {c} | {f} | {v} | {s} | {'task rule' if s.startswith('task') else 'repo rule (binding)'} |")
    A("")
    A("Content rules come from `brand/BRAND.md` (hard rules 1–7, *Autism searches*, *Honest pricing*, *Self-running*, *Customer-voice* 9, 12, 18) and "
      "`ops/COMPLIANCE-GATE.md` lines 1, 2, 4, 8, 10, 11, 15–18, 21. Public fields scanned: " + ", ".join(f"`{k}`" for k in PUBLIC_TOP) +
      ", `bundle.name`, `bundle.pitch`. The address and owner-line checks scan every field. The autism check also counts internal notes (WARN).")
    A("")
    # summary matrix
    A("## 2. Summary")
    A("")
    total_f = sum(1 for l in listings for r in l.results if r.status == FAIL)
    blocked = [l for l in listings if any(r.status == FAIL for r in l.results)]
    A(f"{len(listings)} listing records in {len({l.path for l in listings})} files. **{len(blocked)} of {len(listings)} have at least one FAIL** ({total_f} failing checks in total).")
    if missing:
        A(f"Product folders with no listing file (cannot be published through the gate): {', '.join('`'+m+'`' for m in missing)}.")
    if skipped:
        A(f"Skipped as archived: {', '.join('`'+s+'`' for s in skipped)}.")
    A("")
    A("| Listing | " + " | ".join(SHORT[c] for c in ids) + " | FAIL | WARN |")
    A("|---|" + "---|" * (len(ids) + 2))
    for l in listings:
        rm = result_map(l)
        cells = [SYM.get(rm[c].status, "?") if c in rm else "?" for c in ids]
        nf = sum(1 for r in l.results if r.status == FAIL)
        nw = sum(1 for r in l.results if r.status == WARN)
        A(f"| [`{l.slug}`](#{_anchor(l)}) | " + " | ".join(cells) + f" | {nf} | {nw} |")
    A("")
    # most common failures
    counts = {}
    for l in listings:
        for r in l.results:
            if r.status == FAIL:
                counts[r.cid] = counts.get(r.cid, 0) + 1
    clean = [c for c in ids if all(result_map(l).get(c) is None or result_map(l)[c].status in (PASS, NA) for l in listings)]
    if clean:
        A("**Clean on every listing:** " + "; ".join(CHECK_NAMES[c] for c in clean) + ".")
        A("")
    if counts:
        A("**Failures by check (most common first):** " + "; ".join(f"{CHECK_NAMES[c]}: {n}" for c, n in sorted(counts.items(), key=lambda x: -x[1])) + ".")
        A("")
    # per product
    A("## 3. Per listing")
    A("")
    for l in listings:
        d = l.data
        A(f"### {l.slug}")
        A(f'<a id="{_anchor(l)}"></a>')
        A("")
        meta = [f"File: `{l.path}`" + (f" (item {l.index})" if l.index is not None else "")]
        if d.get("status"):
            meta.append(f"Status: `{d.get('status')}`")
        if num(d.get("price_usd")) is not None:
            meta.append(f"Price: ${num(d.get('price_usd')):.2f}")
        meta.append("Channels tested: " + (", ".join(f"{c} ({s})" for c, s in l.channels.items()) or "none"))
        if l.negated:
            meta.append("Excluded by the listing: " + ", ".join(sorted(l.negated)))
        A(" · ".join(meta))
        A("")
        A("| Check | Result | What was found |")
        A("|---|---|---|")
        for r in l.results:
            A(f"| {md_escape_cell(CHECK_NAMES.get(r.cid, r.cid))} | **{SYM.get(r.status, r.status)}** | {md_escape_cell(r.summary)} |")
        A("")
        bad = [r for r in l.results if r.status in (FAIL, WARN)]
        if bad:
            A("**Failures and warnings, with the exact text and a proposed replacement**")
            A("")
            for r in bad:
                for f in r.findings:
                    if f.level not in (FAIL, WARN):
                        continue
                    A(f"- **{f.level} · {CHECK_NAMES.get(r.cid, r.cid)}** · field `{f.field}` · {f.note}")
                    A("")
                    A("  Offending text:")
                    A("")
                    A("  " + q(f.text).replace("\n", "\n  "))
                    A("")
                    if f.proposal:
                        A("  Proposed replacement:")
                        A("")
                        A("  " + q(f.proposal).replace("\n", "\n  "))
                        A("")
        A("")
    # cross-listing
    A("## 4. Cross-listing checks")
    A("")
    rows = _cross(listings)
    if rows:
        for r in rows:
            A(f"- {r}")
    else:
        A("- No duplicate titles or heavy tag overlap.")
    A("")
    A("## 5. Needs a live check")
    A("")
    A("Every item below came from memory and was used as a test threshold or in an estimate. Confirm each on the platform's own page, then edit `PLATFORM_LIMITS` / `FEES` at the top of the script and re-run.")
    A("")
    for k, c, f, v, s, st in PLATFORM_LIMITS:
        A(f"- [ ] **{c}: {f} = {v}** ({s}). UNVERIFIED.")
    for line in NEEDS_LIVE_CHECK_EXTRA:
        A(f"- [ ] {line}")
    A("")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(out))


NEEDS_LIVE_CHECK_EXTRA = [
    "**Etsy fees** used for the net estimates: $0.20 listing, 6.5% transaction, 3% + $0.25 payment processing (US), 15% Offsite Ads on ad-attributed sales. UNVERIFIED.",
    "**Shopify Payments** 2.9% + $0.30 (Basic plan, US card) and whether a digital-delivery app adds a fee. UNVERIFIED.",
    "**Merchant of record** 5% + $0.50 for the course. UNVERIFIED (depends on the provider chosen).",
    "**TpT basic seller** payout 55% and $0.30 transaction fee. UNVERIFIED.",
    "**Shopify meta description**: whether the admin counter is 160 or 320 characters (the 160 used here is Google's usual display length). UNVERIFIED.",
    "**Etsy tag characters**: which punctuation Etsy accepts in tags (the check allows letters, numbers, spaces, apostrophes, & and -). UNVERIFIED.",
    "**KDP keyword rules**: the ban on sales/ranking words ('bestseller', 'free', 'new', 'Kindle Unlimited') and quotation marks. UNVERIFIED.",
    "**Etsy AI disclosure form**: current wording of the creation questions and whether there is a separate AI flag (the family kit's own note also says [VERIFY]). UNVERIFIED.",
    "**KDP AI questions**: that KDP still asks separately about AI text, images and translation (G2-08 says it does; not re-checked here). UNVERIFIED.",
    "**Etsy snippet**: that Etsy/Google show roughly the first 160 characters of the description as the search snippet (the reason for the first-160 rule). UNVERIFIED.",
    "**Duplicate listings**: whether Etsy treats a starter tier and a complete set with 6+ shared tags as near-duplicates. UNVERIFIED.",
    "**KDP royalty tiers** used in the book proposals: 60% at a list price of $9.99+ (lower below it), 40% for Expanded Distribution. The figures quoted come from each listing's own price_notes [VERIFY]. UNVERIFIED.",
    "**KDP premium-color print cost** ($1.00 + $0.07 per page, about $3.24 for 32 pages) quoted from price_notes. UNVERIFIED.",
    "**Etsy Offsite Ads opt-out**: whether a shop under the sales threshold can still opt out (the proposals offer this as an alternative to a higher price). UNVERIFIED.",
    "**Poison Control number** is treated as an allowed public safety line (it appears in guide-100-plays notes); confirm the number printed in the product is current. UNVERIFIED.",
]


def _anchor(l: Listing):
    return "l-" + re.sub(r"[^a-z0-9]+", "-", (l.slug + ("-" + str(l.index) if l.index is not None else "")).lower())


def _cross(listings):
    rows = []
    by_title = {}
    for l in listings:
        for k in ("etsy_title", "seo_title", "title"):
            t = l.data.get(k)
            if t:
                by_title.setdefault((k, t.strip().lower()), []).append(l.slug)
    for (k, t), slugs in by_title.items():
        if len(set(slugs)) > 1:
            rows.append(f"Same `{k}` on {', '.join(sorted(set(slugs)))}: \"{t}\" (G2-08 duplicate listings).")
    tagged = [(l.slug, {t.lower() for t in as_list(l.data.get("etsy_tags"))}) for l in listings if l.data.get("etsy_tags")]
    for i in range(len(tagged)):
        for j in range(i + 1, len(tagged)):
            a, ta = tagged[i]
            b, tb = tagged[j]
            shared = ta & tb
            if len(shared) >= 6:
                rows.append(f"`{a}` and `{b}` share {len(shared)} of 13 Etsy tags ({', '.join(sorted(shared))}); they will compete for the same searches. "
                            "Give the cheaper tier different long-tail tags. WARN.")
    return rows


# --------------------------------------------------------------------------------------
# 12. Main
# --------------------------------------------------------------------------------------
def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", default=repo_root())
    ap.add_argument("--report", help="write the Markdown report here")
    ap.add_argument("--json", help="write machine-readable results here")
    ap.add_argument("--baseline", help="previous --json output; exit 1 only on NEW failures")
    ap.add_argument("--only", help="slug or path fragment")
    ap.add_argument("--include-archived", action="store_true")
    ap.add_argument("-v", "--verbose", action="store_true")
    a = ap.parse_args(argv)
    try:
        listings, skipped, missing = load(a.root, a.include_archived, a.only)
        run(listings)
        js = to_json(listings, skipped, missing)
        new = None
        if a.baseline and os.path.exists(a.baseline):
            with open(a.baseline, encoding="utf-8") as fh:
                new = fail_keys(js) - fail_keys(json.load(fh))
        print_summary(listings, skipped, missing, a.verbose, new)
        if a.json:
            with open(a.json, "w", encoding="utf-8") as fh:
                json.dump(js, fh, ensure_ascii=False, indent=1)
        if a.report:
            write_report(a.report, listings, skipped, missing, a.root)
            print(f"Report written: {a.report}")
    except Exception as e:
        print(f"check_listings.py error: {e!r}", file=sys.stderr)
        return 2
    if new is not None:
        return 1 if new else 0
    return 1 if any(r.status == FAIL for l in listings for r in l.results) else 0


if __name__ == "__main__":
    sys.exit(main())
