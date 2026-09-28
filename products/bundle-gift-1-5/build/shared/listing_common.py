"""Shared listing.json pieces for the five September 2026 builds (bundles, winter countdown, gift-reveal
cards and coupons, lead magnet).

Fee model: the same one every existing listing uses (see products/bored-play-cards/listing.json
"net_notes" and commerce/PRICING.md section 2). Every fee is UNVERIFIED: web search was unavailable on
2026-09-28. Re-check on each platform's own fee page before listing.
"""
import json
import os

ETSY = dict(listing=0.20, transaction=0.065, proc_pct=0.03, proc_fixed=0.25, offsite=0.15)
GUMROAD = dict(pct=0.10, fixed=0.50, card_pct=0.029, card_fixed=0.30, discover_pct=0.30)
REFUND = 0.05

NET_NOTES = (
    "Estimated net per unit in USD, after fees and a 5% refund allowance (GAPS-ROUND-2 G2-11), rounded to the cent. "
    "Every fee is UNVERIFIED: no live check was possible on 2026-09-28 (web search unavailable). Same fee model as every "
    "other listing (commerce/PRICING.md section 2): Etsy digital $0.20 listing + 6.5% transaction + 3% + $0.25 payment "
    "processing, and an Offsite Ads sale adds 15%; Gumroad as merchant of record 10% + $0.50, plus 2.9% + $0.30 card "
    "processing counted to be safe; a Gumroad Discover sale costs about 30% instead of 10% + $0.50. Check each fee on the "
    "platform's own fee page before listing and replace these numbers."
)


def r2(x):
    return round(x + 1e-9, 2)


def nets(price):
    e = price - ETSY["listing"] - price * (ETSY["transaction"] + ETSY["proc_pct"]) - ETSY["proc_fixed"] - price * REFUND
    eo = e - price * ETSY["offsite"]
    card = price * GUMROAD["card_pct"] + GUMROAD["card_fixed"]
    g = price - (price * GUMROAD["pct"] + GUMROAD["fixed"]) - card - price * REFUND
    gd = price - price * GUMROAD["discover_pct"] - card - price * REFUND
    n = {"etsy": r2(e), "etsy_offsite_ad_sale": r2(eo), "site_gumroad": r2(g), "site_gumroad_discover_sale": r2(gd)}
    m = {k: round(100 * v / price) for k, v in n.items()}
    return n, m


def ai_disclosure(extra_kdp=True):
    d = {
        "as_of": "2026-09-28",
        "ai_helped_with": ("Claude (an AI model made by Anthropic), working in Claude Code, wrote the draft text (plays, talk lines, "
                           "guide pages, safety notes and this listing), drew the illustrations as flat vector art in code from the "
                           "brand's shared symbol and icon library, and built the page layouts and PDF files with scripts."),
        "humans_did": ("The founder, for AlphaPlay LLC, directs the product line and set the brand, safety and honesty rules "
                       "(brand/BRAND.md) that every draft follows, and gives the final go-ahead before anything is listed. As of "
                       "2026-09-28 no person has rewritten the text or redrawn the art."),
        "etsy_attribution": "Designed by Play Before Pixels",
        "etsy_ai_flag": True,
        "site": "Product page line: 'Illustrations and text are made with AI assistance.' Say 'edited by the founder' only after she has.",
        "social_ai_label": "Apply each platform's AI label to posts that use these images.",
    }
    if extra_kdp:
        d.update({"kdp_ai_text": "AI-generated", "kdp_ai_images": "AI-generated", "kdp_ai_translation": "none"})
    return d


OWNER = "© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC."
FLOOR_BASIS = ("$3.00 net per digital sale (commerce/PRICING.md section 2; COMPLIANCE-GATE 18). Every channel's net must stay at "
               "or above it, and no repricing or promotion may go below it.")


def write(path, d):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print("wrote", os.path.relpath(path))
