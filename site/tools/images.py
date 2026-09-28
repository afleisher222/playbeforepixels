#!/usr/bin/env python3
"""
images.py - make the site's WebP pictures from the real product renders.

Reads site/assets/img/jobs.json (written by site/build.js), makes every missing output from
products/*/ (PNG covers, mockups and preview pages, or a PDF page rendered with PyMuPDF),
records each file's real size in site/assets/img/manifest.json and deletes outputs no job needs.
Only reads products/ and brand/; writes only site/assets/img/.

Usage (from the repo root):  python3 site/tools/images.py
build.js runs it automatically when a picture is missing. Needs Pillow (with WebP) and PyMuPDF.
"""
import io
import json
import os
import sys

from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "site", "assets", "img")
WASH = (243, 246, 251)
INK = (29, 41, 64)


def load(job):
    src = os.path.join(ROOT, job["src"])
    if job.get("page"):
        import pymupdf
        doc = pymupdf.open(src)
        page = doc[job["page"] - 1]
        zoom = max(1.0, (job["w"] if job["kind"] != "og" else 1200) / page.rect.width)
        pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
        return Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
    im = Image.open(src)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
        bg.alpha_composite(im)
        im = bg
    return im.convert("RGB")


def make(job):
    im = load(job)
    dst = os.path.join(OUT, job["out"])
    if job["kind"] == "og":
        # 1200 x 630 card: the product picture centred on the wash ground, never cropped.
        card = Image.new("RGB", (1200, 630), WASH)
        pic = im.copy()
        pic.thumbnail((1120, 570), Image.LANCZOS)
        card.paste(pic, ((1200 - pic.width) // 2, (630 - pic.height) // 2))
        card.save(dst, "JPEG", quality=84, optimize=True, progressive=True)
        return card.size
    w = min(job["w"], im.width)
    if w < im.width:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(dst, "WEBP", quality=82, method=6)
    return im.size


def main():
    jobs_file = os.path.join(OUT, "jobs.json")
    if not os.path.exists(jobs_file):
        print("images.py: no jobs.json yet; run node site/build.js first")
        return 0
    jobs = json.load(open(jobs_file))
    mf = os.path.join(OUT, "manifest.json")
    manifest = json.load(open(mf)) if os.path.exists(mf) else {"files": {}}
    files = manifest.get("files", {})
    made = 0
    for job in jobs:
        dst = os.path.join(OUT, job["out"])
        if job["out"] in files and os.path.exists(dst):
            continue
        files[job["out"]] = list(make(job))
        made += 1
    want = {j["out"] for j in jobs}
    pruned = 0
    for name in list(files):
        if name not in want:
            files.pop(name)
    for name in os.listdir(OUT):
        if name.endswith((".webp", ".jpg")) and name not in want:
            os.remove(os.path.join(OUT, name))
            pruned += 1
    manifest = {"_README": "Written by site/tools/images.py. Real pixel sizes of every site picture.", "files": dict(sorted(files.items()))}
    with open(mf, "w") as f:
        json.dump(manifest, f, indent=1)
        f.write("\n")
    total = sum(os.path.getsize(os.path.join(OUT, n)) for n in want if os.path.exists(os.path.join(OUT, n)))
    print(f"images.py: made {made}, removed {pruned}, {len(want)} files, {total / 1e6:.1f} MB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
