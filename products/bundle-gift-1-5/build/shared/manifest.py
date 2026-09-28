#!/usr/bin/env python3
"""ZIP manifest for a bundle: which existing files go into which download, measured from disk.

    python3 manifest.py <bundle-config.json> <out zip-manifest.json>

The bundle never copies its parts' PDFs. The upload-packet step (ops/UPLOAD-PACKETS) reads this manifest and
builds the ZIPs from the files named here, at the moment of upload, so every ZIP holds the parts' current
versions.

Two downloads:
  store - own checkout (Gumroad at launch): START HERE as a plain PDF, then one ZIP per part, each holding
          that part's store-edition files (they carry the web address and QR code).
  etsy  - Etsy allows 5 files of 20 MB each (marketing/CUSTOMER-VOICE.md, sourced; live limit UNVERIFIED
          on 2026-09-28): 1-START-HERE.pdf plain, then 4 ZIPs by format (Color Letter, Color A4, Low-ink Letter,
          Low-ink A4), each holding every part's Etsy-edition file in that format (no web address, COMPLIANCE-GATE 16).
Checks: every named file exists; Etsy slots are 20 MB or less; no store-edition file in an Etsy slot.
Each Etsy ZIP is really built in a temporary folder (deflate level 9) and its true size recorded
("mb_zipped"); the fit check uses that size. Store ZIPs record the sum of their members.
Exit 1 if a file is missing. An over-size Etsy slot is reported as BLOCKED (not an error): the Etsy listing
waits until it fits.
"""
import json
import os
import sys
import tempfile
import zipfile

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", ".."))
ETSY_MAX_MB = 20.0
FORMATS = [("color_letter", "2-Color-US-Letter", "Color, US Letter"), ("color_a4", "3-Color-A4", "Color, A4"),
           ("lowink_letter", "4-Low-Ink-US-Letter", "Low-ink, US Letter"), ("lowink_a4", "5-Low-Ink-A4", "Low-ink, A4")]


def mb(path):
    return os.path.getsize(os.path.join(ROOT, path)) / 1e6


def member(path, arc, missing):
    full = os.path.join(ROOT, path)
    if not os.path.exists(full):
        missing.append(path)
        return {"src": path, "zip_path": arc, "mb": None}
    return {"src": path, "zip_path": arc, "mb": round(mb(path), 2)}


def measure(members):
    if any(m["mb"] is None for m in members):
        return None
    with tempfile.TemporaryDirectory() as d:
        out = os.path.join(d, "t.zip")
        with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
            for m in members:
                z.write(os.path.join(ROOT, m["src"]), m["zip_path"])
        return round(os.path.getsize(out) / 1e6, 2)


def main(cfg_path, out_path):
    cfg = json.load(open(cfg_path, encoding="utf-8"))
    missing = []
    parts = cfg["parts"]

    # prices: read from each part's listing.json so the "separately" figure is never typed by hand
    sep = 0.0
    for p in parts:
        lj = json.load(open(os.path.join(ROOT, "products", p["listing_slug_dir"], p.get("listing_file", "listing.json")), encoding="utf-8"))
        rec = lj if not isinstance(lj, list) else next(x for x in lj if x.get("slug") == p["slug"])
        p["listing_price_usd"] = rec.get(p.get("price_field", "price_usd"))
        p["listing_title"] = rec.get("title")
        if p.get("counts_in_separately", True):
            sep += float(p["listing_price_usd"])
    sep = round(sep, 2)
    price = cfg["price_usd"]

    # store download
    store = [{"slot": 1, "file": cfg["own"]["store_start"], "kind": "pdf", "mb": round(mb(cfg["own"]["store_start"]), 2)}]
    own_members = [member(cfg["own"]["store"][k], f"{cfg['own']['folder']}/{os.path.basename(cfg['own']['store'][k])}", missing) for k, _, _ in FORMATS]
    store.append({"slot": 2, "zip": f"{cfg['own']['zip_name']}.zip", "members": own_members})
    for i, p in enumerate(parts):
        mem = [member(p["store"][k], f"{p['folder']}/{os.path.basename(p['store'][k])}", missing) for k, _, _ in FORMATS]
        if p["store"].get("start"):
            mem.insert(0, member(p["store"]["start"], f"{p['folder']}/{os.path.basename(p['store']['start'])}", missing))
        store.append({"slot": i + 3, "zip": f"{p['zip_name']}.zip", "members": mem})
    for s in store:
        if "members" in s:
            s["mb_estimate"] = round(sum(m["mb"] or 0 for m in s["members"]), 2)

    # etsy download
    etsy = [{"slot": 1, "file": cfg["own"]["etsy_start"], "upload_as": "1-START-HERE.pdf", "kind": "pdf", "mb": round(mb(cfg["own"]["etsy_start"]), 2)}]
    for k, slot_name, label in FORMATS:
        mem = [member(cfg["own"]["etsy"][k], f"{cfg['own']['title']} - {label}.pdf", missing)]
        for p in parts:
            mem.append(member(p["etsy"][k], f"{p['title']} - {label}.pdf", missing))
            if p["etsy"].get("start"):
                mem.append(member(p["etsy"]["start"], f"{p['title']} - START HERE.pdf", missing))
        tot = round(sum(m["mb"] or 0 for m in mem), 2)
        zipped = measure(mem)
        etsy.append({"slot": len(etsy) + 1, "zip": f"{slot_name}.zip", "label": label, "members": mem, "mb_members": tot,
                     "mb_zipped": zipped, "fits_etsy_20mb": zipped is not None and zipped <= ETSY_MAX_MB})
    for s in etsy[1:]:
        for m in s["members"]:
            if m["src"] and "etsy-upload" not in m["src"] and "/etsy" not in m["src"]:
                missing.append(f"NOT AN ETSY EDITION: {m['src']}")
    over = [s for s in etsy[1:] if not s["fits_etsy_20mb"]]

    out = {
        "bundle": cfg["slug"], "title": cfg["title"], "version": cfg["version"], "generated": "by products/bundle-gift-1-5/build/shared/manifest.py",
        "how_the_packet_step_uses_this": ("Build each ZIP from 'members' (src -> zip_path) at upload time; never store copies in the repo. "
                                          "Store: upload slot 1 as a plain PDF and slots 2+ as ZIPs. Etsy: upload the 5 slots in order, "
                                          "only when every Etsy slot says fits_etsy_20mb true."),
        "price_usd": price,
        "separately": {
            "sum_usd": sep, "saving_pct": round(100 * (1 - price / sep), 1) if sep else None,
            "parts_counted": [f"{p['title']}: ${p['listing_price_usd']:.2f} ({p['slug']})" for p in parts if p.get("counts_in_separately", True)],
            "not_counted": cfg.get("not_counted", []),
            "display_rule": ("Show only as '$%s, or $%.2f bought separately' and only on a channel where every counted part is live at that price "
                             "right now (16 CFR 233.1, UNVERIFIED reading; business/GROWTH-ENGINE.md §5b). Never a crossed-out, 'was' or compare-at "
                             "price. Until every part is live on that channel, list the contents with no savings figure. Re-run this script "
                             "whenever a part's price changes.") % (f"{price:g}", sep),
        },
        "parts": [{k: p[k] for k in ("slug", "title", "wanted_edition", "edition_now", "listing_price_usd") if k in p} for p in parts],
        "store_download": store,
        "etsy_download": etsy,
        "etsy_status": ("READY: all 5 Etsy slots fit." if not over else
                        "BLOCKED on Etsy: " + "; ".join(f"{s['zip']} zips to {s['mb_zipped']} MB (limit {ETSY_MAX_MB:g} MB)" for s in over)
                        + ". " + cfg.get("etsy_fix", "")),
        "missing_or_wrong": missing,
    }
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"{cfg['slug']}: separately ${sep:.2f} -> ${price:g} ({out['separately']['saving_pct']}% less); "
          f"store {len(store)} downloads; Etsy: {out['etsy_status'][:160]}")
    for s in etsy[1:]:
        print(f"   etsy {s['zip']:<26} members {s['mb_members']:6.2f} MB, zipped {s['mb_zipped']} MB {'ok' if s['fits_etsy_20mb'] else 'OVER'}")
    for m in missing:
        print("   MISSING", m)
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1], sys.argv[2]))
