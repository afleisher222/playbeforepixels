#!/usr/bin/env python3
"""Finish and check rendered PDFs for the five builds that share this kit.

    python3 finish.py jobs.json

Each job: {"in", "out", "fields" (optional .json from render.js), "title", "subject", "keywords",
           "edition": "store" | "etsy" | "email", "version": "Version 1.0 · September 2026", "toc": [[title, page], ...]}

Finishing: real AcroForm fields (free PDF readers), bookmarks, document metadata, compact save.
Checks on every finished file (exit 1 if any fails):
  - no Type 3 fonts (print-safe static fonts, brand/fonts/fonts.css);
  - no placeholder text: FOUNDER, PLACEHOLDER, [VERIFY], TODO, lorem, [BUSINESS MAILING ADDRESS];
  - Etsy edition: no web address, "www", "http" or ".com" anywhere in the text (COMPLIANCE-GATE 16);
  - the version line and the AlphaPlay LLC owner line on every page that carries a footer;
  - 15 MB or less (CUSTOMER-VOICE rule 2).
"""
import json
import os
import re
import sys

import pymupdf as fitz

INK = (0x1D / 255, 0x29 / 255, 0x40 / 255)
PLACEHOLDERS = re.compile(r"FOUNDER|PLACEHOLDER|\[VERIFY\]|\bTODO\b|lorem|BUSINESS MAILING ADDRESS", re.I)
URLISH = re.compile(r"playbeforepixels|https?://|www\.|\.com\b", re.I)
OWNER = "AlphaPlay LLC"
MAX_MB = 15.0


def add_fields(doc, fields):
    n = 0
    for f in fields:
        page = doc[f["page"]]
        r = fitz.Rect(f["x0"], f["y0"], f["x1"], f["y1"])
        w = fitz.Widget()
        w.field_name = f["name"]
        w.border_width = 0
        w.text_color = INK
        if f["type"] == "check":
            w.rect = fitz.Rect(r.x0 + 1.5, r.y0 + 1.5, r.x1 - 1.5, r.y1 - 1.5)
            w.field_type = fitz.PDF_WIDGET_TYPE_CHECKBOX
            w.field_value = False
        else:
            w.rect = r
            w.field_type = fitz.PDF_WIDGET_TYPE_TEXT
            w.text_font = "Helv"
            w.text_fontsize = f.get("size") or 0
            w.field_value = ""
            if f.get("multi"):
                w.field_flags |= fitz.PDF_TX_FIELD_IS_MULTILINE
        wa = page.add_widget(w)
        if f["type"] != "check" and f.get("align"):
            doc.xref_set_key(wa.xref, "Q", str(f["align"]))
            wa.update()
        n += 1
    return n


def check(path, edition, version, footer_pages=None):
    issues = []
    doc = fitz.open(path)
    fonts = set()
    for pno in range(doc.page_count):
        for f in doc.get_page_fonts(pno):
            fonts.add((f[2], f[3]))  # (type, basefont)
    t3 = sorted(b for t, b in fonts if t == "Type3")
    if t3:
        issues.append(f"Type 3 fonts: {', '.join(t3)}")
    for i, page in enumerate(doc):
        text = page.get_text()
        m = PLACEHOLDERS.search(text)
        if m:
            issues.append(f"p{i + 1}: placeholder text '{m.group(0)}'")
        if edition == "etsy":
            m = URLISH.search(text)
            if m:
                issues.append(f"p{i + 1}: web address in an Etsy file ('{m.group(0)}')")
        if footer_pages is None or i in footer_pages:
            flat = re.sub(r"\s+", " ", text)
            if version and version not in flat:
                issues.append(f"p{i + 1}: no version line")
            if OWNER not in flat:
                issues.append(f"p{i + 1}: no owner line")
    mb = os.path.getsize(path) / 1e6
    if mb > MAX_MB:
        issues.append(f"{mb:.1f} MB is over {MAX_MB} MB")
    fonts_named = sorted({re.sub(r"^[A-Z]{6}\+", "", b) for t, b in fonts})
    return issues, doc.page_count, mb, fonts_named


def main(jobs_path):
    jobs = json.load(open(jobs_path, encoding="utf-8"))
    bad = 0
    for j in jobs:
        doc = fitz.open(j["in"])
        nf = 0
        if j.get("fields") and os.path.exists(j["fields"]):
            nf = add_fields(doc, json.load(open(j["fields"])))
        if j.get("toc"):
            doc.set_toc([[1, t, p] for t, p in j["toc"]])
        doc.set_metadata({
            "title": j.get("title", ""), "author": "Play Before Pixels (AlphaPlay LLC)",
            "subject": j.get("subject", ""), "keywords": j.get("keywords", ""),
            "creator": "Play Before Pixels", "producer": "Play Before Pixels",
        })
        os.makedirs(os.path.dirname(j["out"]), exist_ok=True)
        tmp = j["out"] + ".tmp"
        doc.save(tmp, garbage=3, deflate=True)
        doc.close()
        os.replace(tmp, j["out"])
        issues, pages, mb, fonts = check(j["out"], j.get("edition", "store"), j.get("version"),
                                         set(j["footer_pages"]) if j.get("footer_pages") is not None else None)
        status = "ok  " if not issues else "FAIL"
        bad += bool(issues)
        print(f"{status} {os.path.relpath(j['out'])}: {pages} pages, {mb:.2f} MB, {nf} fields; fonts: {', '.join(fonts)}")
        for s in issues:
            print(f"       {s}")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1]))
