#!/usr/bin/env python3
"""Writes the upload packets (Etsy, Gumroad, KDP) from the products' own records, then checks them.

    python3 ops/UPLOAD-PACKETS/build_packets.py          # write every packet + run the checks
    python3 ops/UPLOAD-PACKETS/build_packets.py --check  # checks only (exit 1 on any FAIL)

Sources of truth: products/<slug>/listing*.json, products/bundle-*/zip-manifest.json, the course's emails/gumroad/,
legal/SHIPPING-RETURNS-REFUNDS.md (refund wording), ops/QUEUE.md LAUNCH FIRST (order and prices),
business/GROWTH-ENGINE.md (§2c packet contents, §7 banned words, §5a prices). When a packet has to differ from a
listing record (a banned search word, an Etsy-only description), the difference is written into the packet under
"Differs from the listing record" and reported by the checks, so the product workflow can fold it back.

Nothing here uploads, publishes or copies product files: `stage.py` assembles the files for one upload at the time
of upload (ops/PAUSE stays until the founder says go).
"""
import json, os, re, sys, hashlib, textwrap, zipfile, tempfile

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
OUT = os.path.join(ROOT, "ops", "UPLOAD-PACKETS")
PROD = os.path.join(ROOT, "products")
ETSY_MAX_MB, ETSY_MAX_FILES = 20.0, 5          # Etsy digital-file limits as recorded in CUSTOMER-VOICE (live limits UNVERIFIED)
GDAY = "Fri Oct 16, 2026 (target; only after Gate A and the founder's 'go')"

def rd(rel):
    return json.load(open(os.path.join(PROD, rel), encoding="utf-8"))

def mb(path):
    return os.path.getsize(path) / 1e6

# ---------------------------------------------------------------- common wording
AI_LINE = "How this was made: the text, illustrations and page layout were created with AI tools for Play Before Pixels."
REFUND_DIGITAL = ("Digital files can't be returned once downloaded, so digital products are generally non-refundable once the "
                  "download has been accessed. We always fix or refund a file that is corrupted, incomplete, materially different "
                  "from its description, or charged twice. EU and UK buyers keep any cancellation right their law gives them. "
                  "Full policy: playbeforepixels.com/shipping-returns/")
REFUND_ETSY = ("Digital downloads can't be returned once downloaded. If a file won't open or print, or doesn't match this "
               "description, message us through Etsy and we'll fix it or refund it.")
REFUND_COURSE = ("14-day guarantee: if the program isn't right for your family, email us within 14 days of purchase for a full "
                 "refund, as long as you have completed no more than 30% of the lessons. After that, course fees are "
                 "non-refundable, but you keep every lesson email and the workbook files. If a file won't open or print, or you "
                 "were charged twice, we fix it or refund it. Full terms: playbeforepixels.com/shipping-returns/")
DOWNLOAD_ETSY = ("HOW TO DOWNLOAD\nAfter you pay, open Etsy in a web browser (not the app), go to You > Purchases and "
                 "download the files. Start with START HERE. Print at 100% / Actual size.")
LICENSE = "Personal license for one household. Please don't resell or share the files."
SAFETY = "Every play follows our published safety rules, with a grown-up there for every play."

# GROWTH-ENGINE §7 banned words for titles, tags and keywords (plus D9's pending words, reported as WARN)
BANNED = ["autism", "autistic", "asd", "adhd", "special needs", "sen", "neurodivergent", "pecs", "therapy", "slp", "ot",
          "speech delay", "late talker", "catch up", "developmental delay", "milestone", "milestones", "brain development",
          "boost", "school readiness", "reset", "detox", "rewire", "classroom", "teacher", "preschool", "daycare", "pta",
          "library"]
WARN_WORDS = ["first then", "visual schedule", "preschoolers", "preschooler"]

def words(s):
    return " " + re.sub(r"\s+", " ", re.sub(r"[^a-z0-9' ]+", " ", s.lower().replace("’", "'"))) + " "

def banned_hits(s, extra=()):
    w = words(s)
    return [b for b in list(BANNED) + list(extra) if " " + b + " " in w]

# ---------------------------------------------------------------- the launch plan (ops/QUEUE.md LAUNCH FIRST)
SECTIONS = {
    "gift": "Gift Guide: Ages 1–5",
    "books": "Busy Books & Play Books",
    "routine": "Routine Cards",
    "cards": "Play Cards",
    "kits": "Family Kits",
    "seasonal": "Seasonal",
}
# Etsy category: best-known path, UNVERIFIED (Etsy's taxonomy could not be checked). The checklist says how to pick.
CAT_PRINTABLE = "Paper & Party Supplies > Paper > (search the category box for 'printable' / 'activity') — UNVERIFIED path"
ETSY = [
    # n, week, slug dir, listing file, etsy files dir, section, category hint, price, per-listing notes
    dict(n=1, week="G-day week", slug="toddler-busy-book", rec="toddler-busy-book/listing.json", files="toddler-busy-book/etsy-upload",
         section="books", cat="Toys & Games > Toys > Learning & School (or the closest 'busy book' / activity-book category) — UNVERIFIED",
         occasion="none", holiday="none"),
    dict(n=2, week="G-day week", slug="bundle-gift-1-5", rec="bundle-gift-1-5/listing.json", files="ZIP:bundle-gift-1-5",
         section="gift", cat="Toys & Games > Toys > Learning & School (closest match for a printable activity bundle) — UNVERIFIED",
         occasion="Birthday", holiday="none (secular)"),
    dict(n=3, week="G-day week", slug="visual-routine-cards-0-5", rec="visual-routine-cards/listing-g0.json", files="visual-routine-cards/etsy-upload/ages-0-5",
         section="routine", cat="Paper & Party Supplies > Paper > Calendars & Planners (or 'Chore charts') — UNVERIFIED", occasion="none", holiday="none"),
    dict(n=4, week="G-day week", slug="guide-100-plays", rec="guide-100-plays/listing.json", files="guide-100-plays/etsy-upload",
         section="books", cat="Books, Movies & Music > Books > (closest 'parenting' or 'activity book' category for a digital book) — UNVERIFIED",
         occasion="none", holiday="none", price_field="price_pdf_usd"),
    dict(n=5, week="G-day week", slug="bored-play-cards-ages-1-5", rec="bored-play-cards/listing-g0.json", files="bored-play-cards/etsy-upload-ages-1-5",
         section="cards", cat="Toys & Games > Games & Puzzles > Card Games (or Learning & School) — UNVERIFIED", occasion="none", holiday="none"),
    dict(n=6, week="Week 2", slug="play-first-family-kit-ages-2-5", rec="play-first-family-kit/listing-g0.json", files="play-first-family-kit/etsy-upload-ages-2-5",
         section="kits", cat="Paper & Party Supplies > Paper > Calendars & Planners (or 'Chore charts') — UNVERIFIED", occasion="none", holiday="none"),
    dict(n=7, week="Week 2", slug="play-talk-cards", rec="play-talk-cards/listing.json", files="play-talk-cards/etsy-upload",
         section="cards", cat="Toys & Games > Games & Puzzles > Card Games (or Learning & School) — UNVERIFIED", occasion="none", holiday="none"),
    dict(n=8, week="Week 2", slug="visual-routine-cards-starter", rec="visual-routine-cards/listing-starter.json", files="visual-routine-cards/etsy-upload/starter",
         section="routine", cat="Paper & Party Supplies > Paper > Calendars & Planners (or 'Chore charts') — UNVERIFIED", occasion="none", holiday="none"),
    dict(n=9, week="Week 2 (list by Oct 25; deactivate Dec 5)", slug="winter-countdown", rec="winter-countdown/listing.json", files="winter-countdown/etsy-upload",
         section="seasonal", cat="Toys & Games > Toys > Learning & School (or 'Advent calendars' is NOT used: the countdown is secular) — UNVERIFIED",
         occasion="none", holiday="none (secular winter; never 'Christmas' or 'advent')"),
    dict(n=10, week="Week 2", slug="bundle-library-0-5", rec="bundle-library-0-5/listing.json", files="ZIP:bundle-library-0-5",
         section="gift", cat="—", occasion="—", holiday="—"),
]

# Packet-level fixes where a listing record breaks the §7 banned-word list. Reported in every run.
OVERRIDES = {
    # Empty since September 28, 2026: the 100 Plays title, tag and KDP keyword ("preschool" -> "toddler") and its
    # PDF-only Etsy description and bullets now live in products/guide-100-plays/listing.json
    # (etsy_title, etsy_tags, keywords, etsy_long_description, etsy_bullets).
}

def _count(rel):  # the leading count in a record's title, so names never drift from the product (e.g. "181 Visual ...")
    m = re.match(r"\s*(\d+)", rd(rel)["title"])
    return m.group(1) if m else ""

_RC, _BC, _SC = _count("visual-routine-cards/listing-g0.json"), _count("bored-play-cards/listing-g0.json"), _count("visual-routine-cards/listing-starter.json")
NAMES = {  # for "next for your child's age" lines (live products only)
    "toddler-busy-book": "Toddler Busy Book (74 activities, ages 1–5)",
    "bored-play-cards": f"“I’m Bored” Play Cards ({_BC} cards, ages 1–5)", "bored-play-cards-ages-1-5": f"“I’m Bored” Play Cards ({_BC} cards, ages 1–5)",
    "play-talk-cards": "52 Play & Talk Cards (ages 0–5)", "guide-100-plays": "100 Screen-Free Plays (ages 0–5)",
    "visual-routine-cards": f"{_RC} Visual Routine Cards (ages 0–5)", "visual-routine-cards-0-5": f"{_RC} Visual Routine Cards (ages 0–5)",
    "play-first-family-kit": "Play-First Family Kit (ages 2–5)", "play-first-family-kit-ages-2-5": "Play-First Family Kit (ages 2–5)",
    "bundle-gift-1-5": "Ages 1–5 Instant Gift Bundle", "bundle-library-0-5": "Birth-to-5 Printable Library",
    "winter-countdown": "24 Days of Play: Winter Countdown (ages 2–5)", "visual-routine-cards-starter": f"Visual Routine Cards Starter Set ({_SC} cards, ages 0–5)",
    "gift-reveal-coupons": None, "board-up-go-more": None, "bundle-30-days": None,
}

# ---------------------------------------------------------------- helpers
def listing_images(rec, prod_dir):
    out = []
    alts = rec.get("listing_images_alt") or []
    for i, it in enumerate(rec.get("listing_images") or []):
        if isinstance(it, dict):
            f, alt = it["file"], it.get("alt", "")
        else:
            f = re.split(r"\s+[—:]\s+|:\s", it)[0].strip()
            alt = alts[i] if i < len(alts) else ""
        if f.startswith("mockup.png"):
            continue  # website image, not an Etsy listing photo
        out.append((f, alt, os.path.exists(os.path.join(PROD, prod_dir, f))))
    return out

def etsy_files(spec):
    if spec["files"].startswith("ZIP:"):
        man = rd(spec["files"][4:] + "/zip-manifest.json")
        rows = []
        for s in man["etsy_download"]:
            if "file" in s:
                rows.append(dict(name=s.get("upload_as", os.path.basename(s["file"])), src=s["file"], mb=round(mb(os.path.join(ROOT, s["file"])), 2), kind="pdf"))
            else:
                rows.append(dict(name=s["zip"], src="built by stage.py from zip-manifest.json slot %d" % s["slot"], mb=s.get("mb_zipped"), kind="zip",
                                 fits=s.get("fits_etsy_20mb"), members=[m["src"] for m in s["members"]]))
        return rows, man.get("etsy_status", "")
    d = os.path.join(PROD, spec["files"])
    fs = sorted(f for f in os.listdir(d) if f.lower().endswith(".pdf"))
    return [dict(name=f, src=os.path.relpath(os.path.join(d, f), ROOT), mb=round(mb(os.path.join(d, f)), 2), kind="pdf") for f in fs], "READY"

def apply_overrides(slug, field, value):
    o = OVERRIDES.get(slug, {})
    if field in o:
        a, b = o[field]
        if isinstance(value, list):
            return [b if v == a else v for v in value]
        return value.replace(a, b)
    return value

def etsy_description(slug, rec, price):
    ld = rec.get("etsy_long_description") or rec["long_description"]
    for a, b in OVERRIDES.get(slug, {}).get("etsy_description", []):
        assert a in ld, f"{slug}: override text not found: {a[:50]}"
        ld = ld.replace(a, b)
    parts = [ld.strip()]
    if rec.get("prep_time"):
        parts.append("PREP: " + rec["prep_time"])
    if rec.get("etsy_bullets") or rec.get("bullets"):
        bl = list(rec.get("etsy_bullets") or rec["bullets"])
        for a, b in OVERRIDES.get(slug, {}).get("etsy_bullets", []):
            assert any(a in x for x in bl), f"{slug}: bullet override not found"
            bl = [x.replace(a, b) for x in bl]
        parts.append("WHAT'S INSIDE\n" + "\n".join("• " + b for b in bl))
    if slug.startswith("bundle-"):
        parts.append("YOUR FILES\nSTART HERE (PDF) plus 4 ZIP files, one per format: Color US Letter, Color A4, Low-ink US Letter, Low-ink A4. "
                     "Download only the format you need. On a computer, double-click a ZIP to open it; on a phone, save it to your Files app and tap it.")
    parts.append(DOWNLOAD_ETSY)
    lic = ("Personal license for one household. Giving it as a gift? The license passes to the family who receives it."
           if slug.startswith("bundle-") else LICENSE)
    parts.append("GOOD TO KNOW\n• " + lic + "\n• " + SAFETY + "\n• Digital download: nothing ships. Printed words are in English.\n• " + REFUND_ETSY)
    ai = (rec.get("ai_disclosure") or {}).get("etsy_description_line") or AI_LINE
    parts.append(ai)
    return "\n\n".join(parts)

def fmt_price(p):
    return f"${p:,.2f}"

# ---------------------------------------------------------------- checks collector
RESULTS = []
def check(where, ok, msg, level="FAIL"):
    RESULTS.append((where, "PASS" if ok else level, msg))

URL_RE = re.compile(r"(?i)(https?://|www\.|playbeforepixels\.com|\.com\b|gumroad|bit\.ly|scan the|qr code)")

# ---------------------------------------------------------------- Etsy packets
def write_etsy():
    index = []
    for spec in ETSY:
        rec = rd(spec["rec"])
        slug = spec["slug"]
        prod_dir = spec["rec"].split("/")[0]
        folder = os.path.join(OUT, "etsy", f"{spec['n']:02d}-{slug}")
        os.makedirs(folder, exist_ok=True)
        price = rec.get(spec.get("price_field", "price_usd"))
        title = apply_overrides(slug, "etsy_title", rec["etsy_title"])
        tags = apply_overrides(slug, "etsy_tags", list(rec["etsy_tags"]))
        files, status = etsy_files(spec)
        imgs = listing_images(rec, prod_dir)
        blocked = not status.startswith("READY")
        desc = etsy_description(slug, rec, price)
        ai = rec.get("ai_disclosure") or {}
        where = f"etsy/{spec['n']:02d}-{slug}"

        # checks
        check(where, len(title) <= 140, f"title {len(title)} chars (≤140)")
        if slug == "guide-100-plays":
            check(where, "paperback" not in desc.lower(), "Etsy description sells the PDF only (no paperback wording; record field etsy_long_description)")
        check(where, len(tags) == 13, f"{len(tags)} tags (13)")
        check(where, all(len(t) <= 20 for t in tags), "every tag ≤20 chars " + str([t for t in tags if len(t) > 20]))
        hits = banned_hits(" | ".join([title] + tags))
        check(where, not hits, f"banned words in title/tags: {hits}" + (" (the product name; this listing is blocked on Etsy, so nothing is uploaded)" if blocked else "") if hits else "title and tags pass the §7 banned-word list", level="WARN" if blocked else "FAIL")
        warn = banned_hits(" | ".join([title] + tags), WARN_WORDS)
        warn = [w for w in warn if w in WARN_WORDS]
        if slug.startswith("play-first-family-kit"):
            warn = warn or (["first then"] if "first then" in words(title) else [])
        check(where, not warn, f"words tied to D9 (pending founder answer) in title/tags: {warn}", level="WARN")
        m = URL_RE.search(desc)
        check(where, not m, "Etsy description has no web address, QR or outside-store mention" + (f" (found '{m.group(0)}')" if m else ""))
        check(where, not re.search(r"(?i)\bwas \$|% off|compare at|regular price", desc), "no 'was' price or % off in the description")
        if not blocked:
            check(where, len(files) <= ETSY_MAX_FILES, f"{len(files)} digital files (≤{ETSY_MAX_FILES})")
            big = [f for f in files if f["mb"] is None or f["mb"] > ETSY_MAX_MB]
            check(where, not big, "every file ≤20 MB" + (f": {big}" if big else ""))
            check(where, files and files[0]["name"].upper().replace(" ", "-").startswith("1-START-HERE"), "file 1 is START HERE")
        miss = [i[0] for i in imgs if not i[2]]
        check(where, not miss and len(imgs) >= 5, f"{len(imgs)} listing images exist" + (f"; missing {miss}" if miss else ""))
        check(where, bool(ai) and ai.get("etsy_ai_flag") is True, "AI disclosure present with the Etsy AI flag")
        floor = rec.get("price_floor", 3)
        net = (rec.get("net_per_unit_by_channel") or {}).get("etsy") or (rec.get("net_per_unit_by_channel") or {}).get("etsy_pdf")
        check(where, net is None or net >= floor, f"Etsy net {net} ≥ floor {floor}")

        diffs = []
        for fld in ("etsy_title", "etsy_tags"):
            if fld in OVERRIDES.get(slug, {}):
                a, b = OVERRIDES[slug][fld]
                diffs.append(f"{fld}: '{a}' → '{b}' ({OVERRIDES[slug]['why']})")
        if OVERRIDES.get(slug, {}).get("etsy_description"):
            diffs.append("description and first bullet: the paperback wording is removed (this Etsy listing sells the PDF only)")

        separately = ""
        if rec.get("bundle"):
            separately = (f"Do NOT show a 'separately' figure until every counted part is live on Etsy at its everyday price "
                          f"(rule: {rec['bundle'].get('price_display_rule', '')}). On {GDAY} the Family Kit and the Play & Talk "
                          f"Cards are not on Etsy yet, so the listing goes up with no savings figure. After week 2, if every part is "
                          f"live on Etsy, one line may be added: \"${price:g}, or ${rec['bundle']['separately_usd']:.2f} bought separately.\"")

        pj = dict(order=spec["n"], week=spec["week"], slug=slug, record=f"products/{spec['rec']}", status="BLOCKED" if blocked else "READY",
                  etsy_status=status, title=title, tags=tags, price_usd=price, quantity=999, sku=slug, section=SECTIONS[spec["section"]],
                  category_hint=spec["cat"], description=desc, images=[dict(order=i + 1, file=f"products/{prod_dir}/{f}", alt=a) for i, (f, a, _) in enumerate(imgs)],
                  digital_files=files, ai_disclosure=ai, differs_from_record=diffs)
        json.dump(pj, open(os.path.join(folder, "packet.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
        open(os.path.join(folder, "description.txt"), "w", encoding="utf-8").write(desc + "\n")

        L = []
        L.append(f"# Etsy packet {spec['n']:02d}: {rec['title']}")
        L.append("")
        L.append(f"**Upload slot:** {spec['week']} · **Status:** {'BLOCKED on Etsy (see below); sell on Gumroad only' if blocked else 'READY (waits for ops/PAUSE to be lifted and the shop to exist)'}  ")
        L.append(f"**Record:** `products/{spec['rec']}` · **Price:** {fmt_price(price)} (one everyday price; no 'was', compare-at or sale price; same price on Gumroad) · **SKU:** `{slug}`")
        L.append("")
        if blocked:
            L.append("## Why this listing is blocked on Etsy")
            L.append(status)
            L.append("")
            L.append("Recommendation: keep the Library on Gumroad only (it is part of the Gumroad packets) and leave this Etsy slot empty in week 2, "
                     "so week 2 is 4 Etsy listings. Revisit only if the parts' PDFs are made much smaller (a product-workflow task).")
            L.append("")
        L.append("## Title (paste as is)")
        L.append("```\n" + title + "\n```")
        L.append(f"{len(title)} characters.")
        L.append("")
        L.append("## 13 tags (one per box)")
        L.append("```\n" + "\n".join(tags) + "\n```")
        L.append("")
        L.append("## Description")
        L.append("Paste the whole of `description.txt` (in this folder). It carries no web address, QR code or outside-store mention "
                 "(COMPLIANCE-GATE 16), ends with the AI line, and states the license, refund and download steps.")
        L.append("")
        if separately:
            L.append("## Bundle 'separately' figure")
            L.append(separately)
            L.append("")
        L.append("## Listing details and attributes")
        L.append("| Field | Answer |")
        L.append("|---|---|")
        for k, v in [("Listing type", "Digital files (instant download)"),
                     ("About this listing: Who made it?", "I did (see AI disclosure below; the form wording is UNVERIFIED)"),
                     ("What is it?", "A finished product"),
                     ("When was it made?", "2020–2026 (or 'Made to order' is NOT used: the file already exists)"),
                     ("Category", spec["cat"] + ". Type the product type in Etsy's category search and pick the closest children's activity / printable / planner category. Never a health, therapy or special-needs category."),
                     ("Occasion", spec["occasion"]), ("Holiday", spec["holiday"]),
                     ("Price", fmt_price(price)), ("Quantity", "999 (Etsy's digital default; UNVERIFIED)"),
                     ("SKU", slug), ("Personalization", "Off"), ("Shop section", SECTIONS[spec["section"]]),
                     ("Renewal", "Automatic"), ("Processing / shipping", "Instant download (no shipping profile)"),
                     ("Materials / production partner", "None (made by the shop)"),
                     ("Etsy Ads for this listing", "Off (GROWTH-ENGINE §7 item 1)"),
                     ("Offsite Ads (shop-level)", "Off (decision D3)"),
                     ("Sale / discount / coupon", "None (no percent-off in 2026; 90-day rule, §7 item 3)")]:
            L.append(f"| {k} | {v} |")
        L.append("")
        L.append("## Listing images, in this order (first = thumbnail)")
        L.append("| # | File | Alt text |")
        L.append("|---|---|---|")
        for i, (f, a, ok) in enumerate(imgs):
            L.append(f"| {i + 1} | `products/{prod_dir}/{f}`{'' if ok else ' **MISSING**'} | {a or '(use the first line of the description)'} |")
        L.append("")
        L.append("## Digital files to upload (in this order)")
        L.append("| Slot | Upload as | Size | Source |")
        L.append("|---|---|---|---|")
        for i, f in enumerate(files):
            flag = "" if f.get("fits", True) else " **OVER 20 MB**"
            L.append(f"| {i + 1} | `{f['name']}` | {f['mb']} MB{flag} | `{f['src']}` |")
        L.append("")
        if spec["files"].startswith("ZIP:"):
            L.append("The ZIPs are never stored in the repo. Build them at upload time: "
                     f"`python3 ops/UPLOAD-PACKETS/stage.py etsy {spec['n']:02d}` (writes a staging folder outside git and re-checks sizes and URLs).")
        else:
            L.append(f"Stage everything for this listing (files + images, renamed in order) with `python3 ops/UPLOAD-PACKETS/stage.py etsy {spec['n']:02d}`.")
        L.append("")
        L.append("## AI disclosure answers")
        L.append(f"- Etsy attribution: **{ai.get('etsy_attribution', 'Designed by Play Before Pixels')}**; AI tools used: **Yes** (etsy_ai_flag = {ai.get('etsy_ai_flag')}).")
        L.append(f"- What AI did: {ai.get('ai_helped_with', '')}")
        L.append(f"- What people did: {ai.get('humans_did', '')}")
        L.append(f"- Description line (already at the end of description.txt): \"{(ai.get('etsy_description_line') or AI_LINE)}\"")
        L.append("- Never tick or write 'handmade', 'hand-drawn' or 'human-written'. Form wording is UNVERIFIED: answer truthfully in whatever words the form uses.")
        L.append("")
        if diffs:
            L.append("## Differs from the listing record (fold back into the record)")
            for d in diffs:
                L.append("- " + d)
            L.append("")
        L.append("## 5-minute upload checklist")
        steps = [
            "Confirm `ops/PAUSE` is gone and an APPROVED line exists for this listing (ops/APPROVALS.md). If not, stop.",
            f"Run `python3 ops/UPLOAD-PACKETS/stage.py etsy {spec['n']:02d}`; it prints the staging folder and must end with 'OK'.",
            "Etsy Shop Manager > Listings > + Add a listing.",
            "Photos: drag in the staged `images/` in numbered order; image 1 is the thumbnail. Paste each alt text if the form offers it.",
            "Title: paste. Category: search and pick (see table). About this listing: I did / A finished product / 2020–2026.",
            "Type: Digital. Upload the staged `files/` in numbered order (START HERE first).",
            "AI disclosure: say AI tools were used and 'Designed by' the shop, as above.",
            "Description: paste description.txt. Tags: paste the 13 tags. Section: " + SECTIONS[spec["section"]] + ".",
            f"Price {fmt_price(price)}, quantity 999, SKU `{slug}`, personalization off, renewal automatic. No sale, no coupon.",
            "Preview: the thumbnail reads well small, no image shows a web address, the description has no link. Publish.",
            "Record the live listing URL and ID in ops/PUBLISHED.json and add `\"price_history\": [{\"price\": %s, \"from\": \"<today>\", \"channel\": \"etsy\"}]` to the record." % price,
            "Replace `{{ETSY_LISTING_URL:" + slug + "}}` in marketing/pins/pins.csv so this product's pins can go live.",
        ]
        if blocked:
            L.append("Do not upload. See 'Why this listing is blocked'.")
        else:
            for i, s in enumerate(steps, 1):
                L.append(f"{i}. {s}")
        open(os.path.join(folder, "PACKET.md"), "w", encoding="utf-8").write("\n".join(L) + "\n")
        index.append((spec, rec, price, blocked))
    return index

# ---------------------------------------------------------------- Gumroad packets
GUM = [
    # n, slug, record, name, permalink, files (store edition), thumb, cover, receipt next, discover, when
    dict(n=1, slug="toddler-busy-book", rec="toddler-busy-book/listing.json", link="busy-book",
         files=["toddler-busy-book/toddler-busy-book-START-HERE.pdf", "toddler-busy-book/toddler-busy-book.pdf", "toddler-busy-book/toddler-busy-book-A4.pdf",
                "toddler-busy-book/toddler-busy-book-low-ink-Letter.pdf", "toddler-busy-book/toddler-busy-book-low-ink-A4.pdf", "toddler-busy-book/toddler-busy-book-PNG-templates.zip"],
         thumb="toddler-busy-book/preview/listing-images/listing-01.png", cover="toddler-busy-book/mockup.png", nxt=["guide-100-plays", "bored-play-cards-ages-1-5"], when="G-day"),
    dict(n=2, slug="visual-routine-cards-0-5", rec="visual-routine-cards/listing-g0.json", link="routine-cards",
         files=["visual-routine-cards/START-HERE-0-5.pdf", "visual-routine-cards/visual-routine-cards-0-5.pdf", "visual-routine-cards/visual-routine-cards-0-5-a4.pdf",
                "visual-routine-cards/visual-routine-cards-0-5-low-ink.pdf", "visual-routine-cards/visual-routine-cards-0-5-low-ink-a4.pdf"],
         thumb="visual-routine-cards/preview/listing-images/ages-0-5/01-cover.png", cover="visual-routine-cards/mockup.png", nxt=["play-first-family-kit-ages-2-5", "bored-play-cards-ages-1-5"], when="G-day"),
    dict(n=3, slug="guide-100-plays", rec="guide-100-plays/listing.json", link="100-plays", price_field="price_pdf_usd",
         files=["guide-100-plays/START-HERE.pdf", "guide-100-plays/guide-100-plays-letter.pdf", "guide-100-plays/guide-100-plays-a4.pdf",
                "guide-100-plays/guide-100-plays-low-ink-letter.pdf", "guide-100-plays/guide-100-plays-low-ink-a4.pdf"],
         thumb="guide-100-plays/preview/listing-images/01-hero.png", cover="guide-100-plays/mockup.png", nxt=["bored-play-cards-ages-1-5", "visual-routine-cards-0-5"], when="G-day"),
    dict(n=4, slug="bored-play-cards-ages-1-5", rec="bored-play-cards/listing-g0.json", link="bored-cards",
         files=["bored-play-cards/START-HERE-ages-1-5.pdf", "bored-play-cards/bored-play-cards-ages-1-5.pdf", "bored-play-cards/bored-play-cards-ages-1-5-A4.pdf",
                "bored-play-cards/bored-play-cards-ages-1-5-low-ink.pdf", "bored-play-cards/bored-play-cards-ages-1-5-low-ink-A4.pdf"],
         thumb="bored-play-cards/preview/listing-images/ages-1-5/listing-01.png", cover="bored-play-cards/mockup.png", nxt=["play-talk-cards", "toddler-busy-book"], when="G-day"),
    dict(n=5, slug="play-first-family-kit-ages-2-5", rec="play-first-family-kit/listing-g0.json", link="family-kit",
         files=["play-first-family-kit/START-HERE-ages-2-5.pdf", "play-first-family-kit/play-first-family-kit-ages-2-5.pdf", "play-first-family-kit/play-first-family-kit-ages-2-5-a4.pdf",
                "play-first-family-kit/play-first-family-kit-ages-2-5-low-ink.pdf", "play-first-family-kit/play-first-family-kit-ages-2-5-low-ink-a4.pdf"],
         thumb="play-first-family-kit/preview/listing-images/ages-2-5/01-cover.png", cover="play-first-family-kit/mockup.png", nxt=["visual-routine-cards-0-5", "bored-play-cards-ages-1-5"], when="G-day (a bundle part: live on Gumroad from G-day)"),
    dict(n=6, slug="play-talk-cards", rec="play-talk-cards/listing.json", link="play-talk-cards",
         files=["play-talk-cards/START-HERE.pdf", "play-talk-cards/play-talk-cards.pdf", "play-talk-cards/play-talk-cards-A4.pdf",
                "play-talk-cards/play-talk-cards-low-ink.pdf", "play-talk-cards/play-talk-cards-low-ink-A4.pdf"],
         thumb="play-talk-cards/preview/listing-images/01-hero.png", cover="play-talk-cards/mockup.png", nxt=["bored-play-cards-ages-1-5", "toddler-busy-book"], when="G-day (a bundle part: live on Gumroad from G-day)"),
    dict(n=7, slug="visual-routine-cards-starter", rec="visual-routine-cards/listing-starter.json", link="routine-starter", discover=False,
         files=["visual-routine-cards/START-HERE-starter.pdf", "visual-routine-cards/visual-routine-cards-starter-letter.pdf", "visual-routine-cards/visual-routine-cards-starter-a4.pdf",
                "visual-routine-cards/visual-routine-cards-starter-low-ink-letter.pdf", "visual-routine-cards/visual-routine-cards-starter-low-ink-a4.pdf"],
         thumb="visual-routine-cards/preview/listing-images/starter/01-starter-cover.png", cover="visual-routine-cards/mockup.png", nxt=["visual-routine-cards-0-5", "play-first-family-kit-ages-2-5"], when="Week 2"),
    dict(n=8, slug="winter-countdown", rec="winter-countdown/listing.json", link="winter-countdown",
         files=["winter-countdown/START-HERE.pdf", "winter-countdown/winter-countdown.pdf", "winter-countdown/winter-countdown-A4.pdf",
                "winter-countdown/winter-countdown-low-ink.pdf", "winter-countdown/winter-countdown-low-ink-A4.pdf"],
         thumb="winter-countdown/preview/listing-images/listing-01.png", cover="winter-countdown/mockup.png", nxt=["toddler-busy-book", "bundle-gift-1-5"], when="Week 2 (unpublish Dec 5)"),
    dict(n=9, slug="bundle-gift-1-5", rec="bundle-gift-1-5/listing.json", link="gift-bundle", zipped="bundle-gift-1-5",
         thumb="bundle-gift-1-5/preview/listing-images/listing-01.png", cover="bundle-gift-1-5/mockup.png", nxt=["bundle-library-0-5", "winter-countdown"], when="G-day"),
    dict(n=10, slug="bundle-library-0-5", rec="bundle-library-0-5/listing.json", link="library", zipped="bundle-library-0-5",
         thumb="bundle-library-0-5/preview/listing-images/listing-01.png", cover="bundle-library-0-5/mockup.png", nxt=["winter-countdown", "bundle-gift-1-5"], when="Week 2 (must be live by Oct 25 for the Black Friday bonus rule)"),
]

def gumroad_receipt(name, nxt, course=False):
    nx = [NAMES.get(n) for n in nxt if NAMES.get(n)]
    lines = [
        f"Thank you for choosing {name}!",
        "",
        "Start with START HERE: it tells you which file to print first and takes about 2 minutes.",
        "Download on a computer, or on a phone in a web browser. Your files stay in your Gumroad Library, so you can download them again any time.",
        "Print at 100% / Actual size. Low-ink files save ink; A4 files are for printers outside the US.",
        "",
        "Something won't open or print? Reply to this email and we'll fix it or refund it.",
    ]
    if nx:
        lines += ["", "Next for your child's age: " + " · ".join(nx) + " (playbeforepixels.com/shop/)."]
    lines += ["", "Know a family who'd like some play ideas? Our free printable is at playbeforepixels.com/free/",
              "", "Parent education, not medical advice. Every play follows our published safety rules.",
              "Play Before Pixels is a trade name of AlphaPlay LLC."]
    return "\n".join(lines)

def write_gumroad():
    rows = []
    for g in GUM:
        rec = rd(g["rec"])
        price = rec.get(g.get("price_field", "price_usd"))
        folder = os.path.join(OUT, "gumroad", f"{g['n']:02d}-{g['slug']}")
        os.makedirs(folder, exist_ok=True)
        where = f"gumroad/{g['n']:02d}-{g['slug']}"
        if g.get("zipped"):
            man = rd(g["zipped"] + "/zip-manifest.json")
            files = []
            for s in man["store_download"]:
                if "file" in s:
                    files.append((os.path.basename(s["file"]), s["file"], round(mb(os.path.join(ROOT, s["file"])), 2)))
                else:
                    tot = sum(m["mb"] or 0 for m in s["members"])
                    files.append((s["zip"], "built by stage.py from zip-manifest.json (store_download slot %d)" % s["slot"], round(tot, 2)))
            sep = man["separately"]
        else:
            files = [(os.path.basename(f), "products/" + f, round(mb(os.path.join(PROD, f)), 2)) for f in g["files"]]
            sep = None
        for f in g.get("files", []):
            check(where, os.path.exists(os.path.join(PROD, f)), f"file exists: {f}")
        for f in (g["thumb"], g["cover"]):
            check(where, os.path.exists(os.path.join(PROD, f)), f"image exists: {f}")
        net = (rec.get("net_per_unit_by_channel") or {})
        gnet = net.get("site_gumroad") or net.get("site_pdf_gumroad")
        floor = rec.get("price_floor", 3)
        check(where, gnet is None or gnet >= floor, f"Gumroad net {gnet} ≥ floor {floor}")
        dnet = net.get("site_gumroad_discover_sale") or net.get("site_pdf_gumroad_discover_sale")
        discover = g.get("discover", dnet is None or dnet >= floor)
        if g.get("discover") is False:
            discover = False
        summary = rec["short_description"]
        desc = rec["long_description"].strip()
        lic = ("Personal license for one household. Giving it as a gift? The license passes to the family who receives it."
               if g["slug"].startswith("bundle-") else LICENSE)
        if g["slug"].startswith("bundle-"):
            lic = "Giving it as a gift? The license passes to the family who receives it."
        elif "Personal license for one household" in desc:
            lic = "Please don't resell or share the files."
        extra = [lic] + ([] if "published safety rules" in desc else [SAFETY])
        desc += "\n\n" + " ".join(extra) + "\n\n" + AI_LINE
        receipt = gumroad_receipt(rec["title"], g["nxt"])
        pj = dict(order=g["n"], slug=g["slug"], name=rec["title"], price_usd=price, permalink=g["link"], summary=summary, description=desc,
                  files=[dict(name=a, source=b, mb=c) for a, b, c in files], thumbnail=f"products/{g['thumb']}", cover=f"products/{g['cover']}",
                  receipt=receipt, refund_policy=REFUND_DIGITAL, discover=discover, live_from=g["when"])
        json.dump(pj, open(os.path.join(folder, "packet.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
        L = [f"# Gumroad packet {g['n']:02d}: {rec['title']}", "",
             f"**Live from:** {g['when']} · **Price:** {fmt_price(price)} (the same everyday price as Etsy; no 'was' price, no offer codes for 90 days) · **Record:** `products/{g['rec']}`", ""]
        L += ["| Field | Paste |", "|---|---|",
              f"| Product type | Digital product |",
              f"| Name | {rec['title']} |",
              f"| Price | {fmt_price(price)} (pay-what-you-want off; 'allow customers to pay more' off) |",
              f"| URL | gumroad.com/l/`{g['link']}` (or the shop's custom domain later) |",
              f"| Summary (the line under the title) | {summary} |",
              f"| Thumbnail (square) | `products/{g['thumb']}` |",
              f"| Cover | `products/{g['cover']}` |",
              f"| Call to action | I want this! |",
              f"| Gumroad Discover | {'On' if discover else 'Off'}{'' if discover else ' (a Discover sale would net under the $3.00 floor; UNVERIFIED fees)'} |",
              f"| Offer codes / discounts | None |",
              f"| Tax (VAT/GST) | Gumroad handles it as merchant of record (UNVERIFIED setting name) |",
              f"| Analytics pixels / tracking | Off (no ad pixels anywhere, GROWTH-ENGINE §7) |",
              f"| Email opt-in at checkout | A separate, unticked box (Gumroad's own 'follow' / newsletter box if it offers one; UNVERIFIED) |", ""]
        if sep:
            L += ["## 'Separately' figure", f"Show only as \"{fmt_price(price)}, or {fmt_price(sep['sum_usd'])} bought separately\" and only while every counted part is live on Gumroad at its everyday price: " + "; ".join(sep["parts_counted"]) + ". Never a crossed-out or compare-at price.", ""]
        L += ["## Description (paste)", "```", desc, "```", "",
              "## Files (Content tab), in this order", "| # | File | Size | Source |", "|---|---|---|---|"]
        for i, (a, b, c) in enumerate(files, 1):
            L.append(f"| {i} | `{a}` | {c} MB | `{b}` |")
        L += ["", f"Stage them with `python3 ops/UPLOAD-PACKETS/stage.py gumroad {g['n']:02d}`.", "",
              "## Receipt / thank-you text (paste into the product's receipt or 'content' note)", "```", receipt, "```", "",
              "## Refund policy text (Settings > refund policy, and the product's FAQ)", "```", REFUND_DIGITAL, "```",
              "This matches legal/SHIPPING-RETURNS-REFUNDS.md Part B §3, which is still a DRAFT for attorney review (Gate A item 7). If the policy changes, change this text.", "",
              "## 3-minute checklist",
              "1. `ops/PAUSE` gone and an APPROVED line exists; otherwise stop.",
              f"2. `python3 ops/UPLOAD-PACKETS/stage.py gumroad {g['n']:02d}` ends with OK.",
              "3. New product > Digital product > paste name and price > Next.",
              "4. Paste the summary and description; add thumbnail and cover; upload the staged files in order.",
              "5. Paste the receipt text and refund text; Discover as in the table; no offer codes; publish.",
              "6. Buy it once with a 100% test code that is deleted right after, or view it as a customer (Gumroad preview), and open every file.",
              "7. Record the URL in ops/PUBLISHED.json and start `price_history` in the record."]
        open(os.path.join(folder, "PACKET.md"), "w", encoding="utf-8").write("\n".join(L) + "\n")
        rows.append((g, rec, price))
    write_course()
    return rows

def write_course():
    rec = rd("course-screen-reset/listing.json")
    c = os.path.join(PROD, "course-screen-reset")
    folder = os.path.join(OUT, "gumroad", "11-course-30-days")
    os.makedirs(folder, exist_ok=True)
    where = "gumroad/11-course-30-days"
    wf = json.load(open(os.path.join(c, "emails", "gumroad", "workflow.json"), encoding="utf-8"))
    fwf = json.load(open(os.path.join(c, "funnel", "gumroad", "workflow.json"), encoding="utf-8"))
    dl = sorted(os.listdir(os.path.join(c, "downloads")))
    check(where, len(wf["emails"]) == 35, f"{len(wf['emails'])} paid emails (35)")
    check(where, len(fwf["emails"]) == 7, f"{len(fwf['emails'])} free-funnel emails (7)")
    allmd = ""
    for e in wf["emails"]:
        allmd += open(os.path.join(c, "emails", "gumroad", e["file"]), encoding="utf-8").read()
    for e in fwf["emails"]:
        allmd += open(os.path.join(c, "funnel", "gumroad", e["file"]), encoding="utf-8").read()
    check(where, "you each get" not in allmd.lower() and "{{referral_link}}" not in allmd, "no referral-reward line in any course email")
    check(where, not re.search(r"FOUNDER|PLACEHOLDER|\[VERIFY\]|TODO|lorem", allmd), "no founder or placeholder notes in the emails")
    check(where, "14 days of purchase" in allmd and "30% of the lessons" in allmd, "guarantee wording matches the policy (14 days, 30%)")
    tags = sorted(set(re.findall(r"\{\{[a-z_]+\}\}", allmd)))
    check(where, tags == ["{{business_mailing_address}}"], f"only merge tag left is the PO Box address: {tags}", level="WARN")

    def compile_emails(wfj, base, head):
        out = [head, ""]
        for e in wfj["emails"]:
            body = open(os.path.join(base, e["file"]), encoding="utf-8").read()
            m = re.match(r"---\n(.*?)\n---\n", body, re.S)
            fm = m.group(1) if m else ""
            pre = re.search(r'preheader:\s*"(.*)"', fm)
            body = body[m.end():] if m else body
            out += [f"## Email {e['order']}: day +{e['delay_days']}", "",
                    f"- **Delay:** {e['delay_days']} day(s) after purchase", f"- **Subject:** {e['subject']}",
                    f"- **Preheader:** {pre.group(1) if pre else ''}", f"- **Source:** `{os.path.relpath(os.path.join(base, e['file']), ROOT)}`", "",
                    "~~~markdown", body.strip(), "~~~", ""]
        return "\n".join(out)
    open(os.path.join(folder, "DRIP-EMAILS-PAID.md"), "w", encoding="utf-8").write(compile_emails(
        wf, os.path.join(c, "emails", "gumroad"),
        "# 30 Days of Back-and-Forth: the 35 paid emails, in order, ready to paste into a Gumroad workflow\n\n"
        "Generated from `products/course-screen-reset/emails/gumroad/` (never edit here; edit `build/content.js` and rebuild). "
        "Before pasting, replace `{{business_mailing_address}}` with the public USPS PO Box from legal/ENTITY.md (the only merge tag)."))
    open(os.path.join(folder, "DRIP-EMAILS-FREE-STARTER.md"), "w", encoding="utf-8").write(compile_emails(
        fwf, os.path.join(c, "funnel", "gumroad"),
        "# Free '7 Days of Play First' starter: the 7 emails, in order (a $0 Gumroad product's workflow)\n\n"
        "Generated from `products/course-screen-reset/funnel/gumroad/`. Replace `{{business_mailing_address}}` first."))
    refund_ok = "14 days" in REFUND_COURSE
    b = rec["bundle"]
    L = ["# Gumroad packet 11: 30 Days of Back-and-Forth (the course) and its $49 bundle", "",
         "**Sale opens:** Dec 15, 2026 (/30-days, never /reset) · **Launch:** Dec 26 · **Self-paced start date shown at checkout:** Jan 4, 2027 · "
         f"**Price:** {fmt_price(rec['price_usd'])}; bundle {fmt_price(b['price_usd'])} · **Record:** `products/course-screen-reset/listing.json`", "",
         "Needs nothing from the founder (business/DECISIONS.md, 2026-09-28): every lesson, email, workbook page and FAQ is finished. "
         "The only value to fill in is the public PO Box address, which is account setup, not writing.", "",
         "## Product 1: the course", "| Field | Paste |", "|---|---|",
         f"| Name | {rec['title']} |", f"| Price | {fmt_price(rec['price_usd'])} |", "| URL | gumroad.com/l/`30-days` (the site's /30-days page links here) |",
         f"| Summary | {rec['short_description']} |",
         "| Thumbnail | `products/course-screen-reset/preview/listing-images/01-hero.png` |", "| Cover | `products/course-screen-reset/mockup.png` |",
         "| Discover | On (a Discover sale nets $16.47 against a $3.00 floor; UNVERIFIED fees) |", "| Offer codes | None |", "",
         "### Description (paste)", "```", rec["long_description"].strip() + "\n\n" + LICENSE + "\n\n" + AI_LINE, "```", "",
         "### Files (in this order)", "| # | File | Source |", "|---|---|---|"]
    for i, f in enumerate(dl, 1):
        L.append(f"| {i} | `{f}` | `products/course-screen-reset/downloads/{f}` |")
    L += ["", "### Drip emails (Gumroad Workflow: trigger = purchase of this product)",
          "- All 35 emails, with delay, subject and preheader, are in **`DRIP-EMAILS-PAID.md`** (this folder), in order. Paste each into one workflow email.",
          "- Emails with the same delay go out together. Gumroad sends by days after purchase, not a fixed hour, which is why the copy says 'each day'.",
          "- Make an identical workflow for the bundle product (Product 2).", "",
          "### Receipt text", "```", gumroad_receipt(rec["title"], ["play-first-family-kit-ages-2-5", "guide-100-plays"]).replace(
              "Start with START HERE: it tells you which file to print first and takes about 2 minutes.",
              "Your first email (Day 0) arrives now; Day 1 arrives tomorrow. Start with START HERE in the files below."), "```", "",
          "### Refund text (course)", "```", REFUND_COURSE, "```",
          "This is legal/SHIPPING-RETURNS-REFUNDS.md Part B §4 word for word in meaning. Founder decision still PENDING in ops/APPROVALS.md: keep 14 days or change to 30. If it changes, the policy changes first, then `REFUND` in build/content.js, then rebuild, then this packet.", "",
          f"## Product 2: {b['name']} ({fmt_price(b['price_usd'])})",
          f"- Contents: " + "; ".join(b["contents"]) + ".",
          f"- 'Separately' line only as: \"{fmt_price(b['price_usd'])}, or {fmt_price(b['separately_usd'])} bought separately\", and only while every part is live on Gumroad at its everyday price ($27 + $11 + $9.99 + $6.50).",
          "- Files: the 5 course downloads, then the store files of the Family Kit 2–5, 100 Screen-Free Plays PDF and the bored cards 1–5 (see Gumroad packets 03, 04 and 05). Zip each part (`stage.py gumroad 11` builds `Play-First-Family-Kit.zip`, `100-Screen-Free-Plays.zip`, `Bored-Play-Cards.zip`).",
          "- Same workflow emails as Product 1. Same refund text (the guarantee covers the program; the printables follow the digital policy).", "",
          "## Free starter (year-round funnel)",
          "- A $0 Gumroad product '7 Days of Play First' with the two PDFs in `products/course-screen-reset/funnel/starter/`, and a workflow from **`DRIP-EMAILS-FREE-STARTER.md`**.",
          "- It collects an email only. Nothing asks for a child's name. Double opt-in is the email platform's job if one is used (Option B in emails/LOADING.md).", "",
          "## Checklist (15 minutes, one time, on or after Dec 15)",
          "1. `ops/PAUSE` gone; APPROVED lines exist for the product and for each sequence (ROUTINE 'Never').",
          "2. Replace `{{business_mailing_address}}` in a copy of the email text (do not commit the address until it is public).",
          "3. Create Product 1, paste fields, upload files, publish as unlisted; create the workflow from DRIP-EMAILS-PAID.md.",
          "4. Create Product 2 and copy the workflow; publish unlisted.",
          "5. Send the whole sequence to a test inbox (a 100% test code, deleted afterwards) and click every link: /30-days, /30-days/start, /30-days/feedback, /shipping-returns/, /help.",
          "6. Switch both products to public on Dec 15. Record URLs in ops/PUBLISHED.json."]
    open(os.path.join(folder, "PACKET.md"), "w", encoding="utf-8").write("\n".join(L) + "\n")

# ---------------------------------------------------------------- KDP packet
KDP_HTML_TAGS = {"b", "i", "u", "br", "p", "h4", "h5", "h6", "ol", "ul", "li", "em", "strong"}  # KDP's allowed list as best known (UNVERIFIED)

def write_kdp():
    rec = rd("guide-100-plays/listing.json")
    k = rec["kdp"]
    folder = os.path.join(OUT, "kdp", "01-100-screen-free-plays")
    os.makedirs(folder, exist_ok=True)
    where = "kdp/01-100-screen-free-plays"
    title = "100 Screen-Free Plays for Ages 0–5"
    subtitle = rec["subtitle"]
    kw = apply_overrides("guide-100-plays", "kdp_keywords", list(rec["keywords"]))
    check(where, len(kw) == 7, f"{len(kw)} keyword boxes (7)")
    hits = banned_hits(" | ".join(kw))
    check(where, not hits, f"keywords pass §7: {hits}" if hits else "keywords pass the §7 banned-word list")
    check(where, not re.search(r"(?i)\bfree\b|bestseller|\bnew\b", " ".join(kw).lower().replace("screen free", "")), "no 'free' (other than the product phrase 'screen free'), 'bestseller' or 'new' in keywords")
    sh = banned_hits(title + " " + subtitle, WARN_WORDS)
    check(where, not [h for h in sh if h not in WARN_WORDS], "title/subtitle pass §7")
    check(where, not [h for h in sh if h in WARN_WORDS], f"subtitle contains {[h for h in sh if h in WARN_WORDS]} (matches the cover; founder/lead decision)", level="WARN")
    interior = os.path.join(PROD, "guide-100-plays", "guide-100-plays-kdp-interior.pdf")
    cover = os.path.join(PROD, "guide-100-plays", "guide-100-plays-cover-wrap.pdf")
    try:
        import fitz
        di, dc = fitz.open(interior), fitz.open(cover)
        pages = len(di)
        w, h = di[0].rect.width / 72, di[0].rect.height / 72
        cw, ch = dc[0].rect.width / 72, dc[0].rect.height / 72
        check(where, pages == k["pages"] == 86, f"interior has {pages} pages (record {k['pages']})")
        check(where, abs(w - 8.125) < 0.01 and abs(h - 10.25) < 0.01, f"interior page {w:.3f} x {h:.3f} in (8.125 x 10.25 with bleed)")
        want = 0.125 * 2 + 8 * 2 + pages * 0.002252
        check(where, abs(cw - want) < 0.01 and abs(ch - 10.25) < 0.01, f"cover wrap {cw:.4f} x {ch:.2f} in (expected {want:.4f}; spine rule UNVERIFIED)")
        type3 = [f for p in di for f in p.get_fonts() if f[2] == "Type3"] + [f for p in dc for f in p.get_fonts() if f[2] == "Type3"]
        check(where, not type3, "no Type 3 fonts in the KDP files")
    except Exception as e:
        check(where, False, f"could not open KDP PDFs: {e}")
    # description (HTML, allowed tags only)
    ld = rec["long_description"]
    ld = ld.replace("100 Screen-Free Plays is a play book for ages 0–5, in paperback or as a printable PDF.",
                    "100 Screen-Free Plays is a play book for ages 0–5.")
    ld = ld.replace("The PDF comes in Color and Low-ink files, US Letter and A4, with planners you can type into in free Adobe Acrobat Reader: about 10¢ a play. ", "")
    ld = ld.replace("The paperback has a black-and-white interior, with free full-color play pages through the link inside.",
                    "The paperback has a black-and-white interior. The title page has an “A gift for / With love from” line to fill in.")
    paras = [p.strip() for p in ld.split("\n\n") if p.strip()]
    html = "".join(f"<p>{p}</p>" for p in paras[:-1])
    html += "<p><b>Inside:</b></p><ul>" + "".join(f"<li>{b}</li>" for b in [
        "100 plays in four age bands: 0–1, 1–2, 2–3 and 3–5 years",
        "A starting age in months, prep, mess and play-time icons on every play",
        "A make-it-easier and a make-it-harder idea, a talk line and a safety note on every play",
        "89 plays that need nothing to buy, plus a pantry list",
        "12 two-minute plays for tired grown-ups, a Quick finder and a sample screen-free day"]) + "</ul>"
    html += f"<p><i>{paras[-1]}</i></p>"
    tags = set(re.findall(r"</?([a-z0-9]+)", html))
    check(where, tags <= KDP_HTML_TAGS, f"description uses allowed HTML only: {sorted(tags)}")
    check(where, len(re.sub('<[^>]+>', '', html)) <= 4000, f"description {len(re.sub('<[^>]+>', '', html))} characters (≤4000)")
    check(where, not URL_RE.search(re.sub('<[^>]+>', '', html)), "description has no web address")
    hits = banned_hits(re.sub('<[^>]+>', ' ', html))
    check(where, not hits, f"description banned words: {hits}" if hits else "description passes §7")
    open(os.path.join(folder, "description.html"), "w", encoding="utf-8").write(html + "\n")
    ai = rec["ai_disclosure"]
    floor = rec["price_floor_by_channel"]["kdp_paperback"]
    L = ["# KDP packet: 100 Screen-Free Plays for Ages 0–5 (paperback)", "",
         f"**Upload:** draft + proof order in the founder's account sitting (Oct 5–11); publish only after the printed proof passes (BRAND customer-voice rule 21). KDP ≤2 titles a week. · **Record:** `products/guide-100-plays/listing.json`", "",
         "## Files", "| What | File | Check |", "|---|---|---|",
         f"| Interior (black-and-white, bleed) | `products/guide-100-plays/guide-100-plays-kdp-interior.pdf` | 86 pages, 8.125 x 10.25 in, no Type 3 fonts |",
         f"| Cover (full wrap, one PDF) | `products/guide-100-plays/guide-100-plays-cover-wrap.pdf` | {k['cover_wrap_in']} in; spine {k['spine_in']} in; no spine text; blank barcode block lower right of the back |", "",
         "## Page 1: Paperback details", "| Field | Enter |", "|---|---|",
         "| Language | English |",
         f"| Book title | {title} |",
         f"| Subtitle | {subtitle} |",
         "| Series | none |", "| Edition number | leave blank (first edition) |",
         f"| Author | {k['author']} (the brand as the author name; counsel question Q9 open — if counsel says no, use a pen name, never the founder's legal name) |",
         "| Contributors | none |",
         "| Description | paste `description.html` (this folder) into the description box (KDP accepts a small HTML set: b, i, u, br, p, h4–h6, ol, ul, li; UNVERIFIED) |",
         "| Publishing rights | I own the copyright and I hold the necessary publishing rights |",
         "| Primary audience: sexually explicit content | No |",
         "| Primary audience: reading age | **Leave both boxes empty.** This is an adult-directed book for parents (the reading-age field is for children's books; filling it with 0–5 would make it a children's product; see the CPSIA hold in ops/QUEUE.md) |",
         "| Marketplace | Amazon.com (primary) |", ""]
    L += ["## 7 keyword boxes (one per box)", "```"] + kw + ["```",
          "Rules followed: no other authors, titles, brands, shows or creators; no 'free', 'bestseller' or 'new'; nothing from the §7 banned list (UNVERIFIED KDP wording)."]
    if "kdp_keywords" in OVERRIDES.get("guide-100-plays", {}):
        a, b = OVERRIDES["guide-100-plays"]["kdp_keywords"]
        L.append(f"_Differs from the record:_ '{a}' → '{b}' ({OVERRIDES['guide-100-plays']['why']})")
    L += ["", "## 3 categories (parenting only; never special needs, health, education or teaching)",
          "1. Parenting & Relationships › Family Activities",
          "2. Parenting & Relationships › Parenting › General (or the closest general parenting category)",
          "3. Parenting & Relationships › Parenting › Early Childhood, if the picker lists it; otherwise a second general parenting category (never crafts, education, health or special needs)",
          "_Category names are from memory (UNVERIFIED): KDP's category picker changes; choose the closest parenting categories._", "",
          "## Page 2: Paperback content", "| Field | Enter |", "|---|---|",
          "| Print ISBN | **Get a free KDP ISBN** (business/DECISIONS.md 2026-09-28). Imprint: 'Independently published' is set by KDP. The interior prints no ISBN; KDP places the barcode |",
          "| Publication date | leave blank (set on publish) |",
          "| Print options | Black & white interior · White paper · Trim 8 x 10 in (20.32 x 25.4 cm) · Bleed: Yes · Cover finish: Matte (recommended for a calm look; Glossy is fine) |",
          "| Manuscript | upload the interior PDF |", "| Cover | 'Upload a cover you already have' → the cover-wrap PDF |",
          "| AI-generated content | **Yes.** Text: AI-generated (Claude). Images: AI-generated (vector art made in code by Claude). Translation: none. (ai_disclosure; answer truthfully even if the founder edits later — only passages she writes herself are hers) |",
          "| Book preview | open the previewer; fix anything flagged (gutter, bleed, text in the safe zone). Measured nearest text 0.42 in from trim |", "",
          "## Page 3: Rights and pricing", "| Field | Enter |", "|---|---|",
          "| Territories | All territories (worldwide rights) |", "| Primary marketplace | Amazon.com |",
          "| Royalty plan | 60% (list price ≥ $9.99) |",
          f"| Amazon.com | **$16.99** (GROWTH-ENGINE §5a; record net about ${rec['net_per_unit_by_channel']['kdp_paperback']} after print cost, UNVERIFIED) |",
          "| Amazon.co.uk / .ca / .com.au | **See the price decision below before entering.** |",
          "| Other marketplaces (.de, .fr, .es, .it, .nl, .pl, .se, .co.jp) | 'Based on Amazon.com price' (KDP converts) |",
          "| Expanded Distribution | **Off** (it reaches libraries, which are HELD) |",
          "| Proof | Request printed proof copies before publishing (see below) |", "",
          "### Price decision: UK, Canada, Australia",
          f"GROWTH-ENGINE §2c sets hand-set prices of £7.99, CA$12.99 and AU$14.99 (from MARKETING-PLAYBOOK seg. 5, which was written for $9.99 paperbacks). For this 86-page 8 x 10 book those prices would net roughly £3, CA$5 and AU$5.5 after print cost, about US$3.60–4.10, **below this book's KDP price floor of ${floor}** (record `price_floor_by_channel`; COMPLIANCE-GATE 18). All figures UNVERIFIED (print costs and exchange rates could not be checked).",
          "**Recommended (enter these unless the founder decides otherwise):** £13.99, CA$22.99, AU$26.99, close to the $16.99 US price. Before saving, KDP's royalty column must show at least the equivalent of $5.10 in each marketplace; if a price shows less, raise it to the first .99 that clears it.", "",
          "## Proof-order steps (Oct 5–11)",
          "1. Save the title as a draft through page 3 (do not press Publish).",
          "2. Bookshelf › the title's '…' menu › Request printed proofs › quantity 1 › ship to the business PO Box (never a home address).",
          "3. Proofs print with a 'Not for resale' band; allow printing plus shipping time (UNVERIFIED, about 1–2 weeks in the US).",
          "4. On arrival check: cover colours and the seal logo, spine alignment (no text on the spine), gutter margins, gray tones of the icons, page order, the 2 in square sizes, and that nothing sits within 0.375 in of the trim. Founder proofs the cover and page 1 (rule 21, 15–30 min).",
          "5. Pass → Publish (KDP review up to about 72 hours, UNVERIFIED). Fail → fix in `products/guide-100-plays/build/`, rebuild with `sh products/guide-100-plays/build/make.sh`, re-upload, order a new proof.",
          "6. After it goes live: record ASIN/ISBN and URL in ops/PUBLISHED.json and `price_history` in the record. Never cut the paperback price for sale events (§5a).", "",
          "## AI-content answers (full text)",
          f"- Text: {ai['kdp_ai_text']}", f"- Images: {ai['kdp_ai_images']}", f"- Translation: {ai['kdp_ai_translation']}",
          f"- What AI did: {ai['ai_helped_with']}", ""]
    open(os.path.join(folder, "PACKET.md"), "w", encoding="utf-8").write("\n".join(L) + "\n")

# ---------------------------------------------------------------- PDF scan of everything a packet uploads
def scan_uploads():
    """Type 3 fonts and placeholder strings in every customer-facing PDF a packet uploads; no URLs/QR in Etsy files."""
    import fitz
    PH = re.compile(r"FOUNDER|PLACEHOLDER|\[VERIFY\]|TODO|lorem", re.I)
    ET_URL = re.compile(r"(?i)playbeforepixels\.com|https?://|www\.|/bonus/|scan (the|this|to)")
    seen = set()
    def scan(path, etsy, where):
        key = (path, etsy)
        if key in seen:
            return
        seen.add(key)
        d = fitz.open(path)
        t3, ph, url, links = 0, [], [], 0
        for p in d:
            t3 += sum(1 for f in p.get_fonts() if f[2] == "Type3")
            txt = p.get_text()
            ph += PH.findall(txt)
            if etsy:
                url += ET_URL.findall(txt)
                links += sum(1 for l in p.get_links() if l.get("uri"))
        rel = os.path.relpath(path, ROOT)
        check(where, t3 == 0, f"no Type 3 fonts: {rel}" if t3 == 0 else f"{t3} Type 3 fonts: {rel}")
        check(where, not ph, f"no placeholder text: {rel}" if not ph else f"placeholder text {set(ph)}: {rel}")
        if etsy:
            check(where, not url and links == 0, f"Etsy file has no URL/QR text or links: {rel}" if not url and not links else f"URL text {set(url)} / {links} links: {rel}")
    for spec in ETSY:
        files, status = etsy_files(spec)
        where = f"etsy/{spec['n']:02d}-{spec['slug']}"
        for f in files:
            if f["kind"] == "pdf":
                scan(os.path.join(ROOT, f["src"]), True, where)
            else:
                for m in f["members"]:
                    scan(os.path.join(ROOT, m), True, where)
    for g in GUM:
        where = f"gumroad/{g['n']:02d}-{g['slug']}"
        if g.get("zipped"):
            man = rd(g["zipped"] + "/zip-manifest.json")
            paths = [s["file"] for s in man["store_download"] if "file" in s] + [m["src"] for s in man["store_download"] if "members" in s for m in s["members"]]
            for p in paths:
                scan(os.path.join(ROOT, p), False, where)
        else:
            for f in g["files"]:
                if f.endswith(".pdf"):
                    scan(os.path.join(PROD, f), False, where)
    for f in sorted(os.listdir(os.path.join(PROD, "course-screen-reset", "downloads"))):
        scan(os.path.join(PROD, "course-screen-reset", "downloads", f), False, "gumroad/11-course-30-days")
    for f in ["guide-100-plays-kdp-interior.pdf", "guide-100-plays-cover-wrap.pdf"]:
        scan(os.path.join(PROD, "guide-100-plays", f), False, "kdp/01-100-screen-free-plays")

def main():
    only_check = "--check" in sys.argv
    write_etsy(); write_gumroad(); write_kdp()
    scan_uploads()
    fails = [r for r in RESULTS if r[1] == "FAIL"]
    warns = [r for r in RESULTS if r[1] == "WARN"]
    lines = ["# Packet checks (generated by build_packets.py; do not edit)", "",
             f"{len(RESULTS)} checks: {len(RESULTS) - len(fails) - len(warns)} PASS, {len(warns)} WARN, {len(fails)} FAIL.", ""]
    for lvl in ("FAIL", "WARN"):
        rs = [r for r in RESULTS if r[1] == lvl]
        if rs:
            lines += [f"## {lvl}"] + [f"- `{w}`: {m}" for w, _, m in rs] + [""]
    lines += ["## PASS (summary by packet)"]
    by = {}
    for w, l, m in RESULTS:
        if l == "PASS":
            by[w] = by.get(w, 0) + 1
    lines += [f"- `{w}`: {n} checks passed" for w, n in sorted(by.items())]
    open(os.path.join(OUT, "CHECKS.md"), "w", encoding="utf-8").write("\n".join(lines) + "\n")
    for w, l, m in fails + warns:
        print(f"{l}  {w}: {m}")
    print(f"{len(RESULTS)} checks, {len(fails)} FAIL, {len(warns)} WARN")
    sys.exit(1 if fails else 0)

if __name__ == "__main__":
    main()
