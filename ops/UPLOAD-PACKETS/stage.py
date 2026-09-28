#!/usr/bin/env python3
"""Assemble one upload into a staging folder OUTSIDE the repository, at the time of upload.

    python3 ops/UPLOAD-PACKETS/stage.py etsy 02            # → $PBP_STAGING/etsy-02-bundle-gift-1-5/{files,images}
    python3 ops/UPLOAD-PACKETS/stage.py gumroad 09
    python3 ops/UPLOAD-PACKETS/stage.py gumroad 11          # course: downloads + the $49 bundle's part ZIPs
    python3 ops/UPLOAD-PACKETS/stage.py --all               # every packet (a dry run of the whole launch)
Staging root: $PBP_STAGING, else ~/pbp-upload-staging. Nothing is written inside the repository (product PDFs are
never copied into git; bundle ZIPs are built fresh from zip-manifest.json so they always hold the current files).
Checks on every run: files exist, Etsy ≤5 files of ≤20 MB, no web address / QR text / links inside any Etsy PDF
(including inside ZIPs), SHA-256 of every staged file written to MANIFEST.txt. Ends with "OK" or exits 1.
Every staged PDF, including each PDF inside a staged ZIP, is stamped with the channel it goes to (channel=etsy for
Etsy, channel=site for our own checkout on Gumroad) by channel_tag.py, and the stamp is checked (COMPLIANCE-GATE 16).
"""
import glob, hashlib, json, os, re, shutil, sys, tempfile, zipfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import channel_tag  # noqa: E402

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
PK = os.path.join(ROOT, "ops", "UPLOAD-PACKETS")
STAGE = os.environ.get("PBP_STAGING") or os.path.expanduser("~/pbp-upload-staging")
URL = re.compile(r"(?i)playbeforepixels\.com|https?://|www\.|/bonus/|scan (the|this|to)")

def sha(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()

def etsy_clean(pdf_path):
    import fitz
    d = fitz.open(pdf_path)
    for p in d:
        if URL.search(p.get_text()) or any(l.get("uri") for l in p.get_links()):
            return False
    return True

def build_zip(members, out, channel):
    """ZIP the members; every PDF inside is a stamped copy carrying `channel` (the sources are never changed)."""
    with tempfile.TemporaryDirectory() as tmp, zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for i, (src, arc) in enumerate(members):
            path = os.path.join(ROOT, src)
            if path.lower().endswith(".pdf"):
                cp = os.path.join(tmp, f"{i}.pdf")
                shutil.copy2(path, cp)
                channel_tag.stamp(cp, channel)
                path = cp
            z.write(path, arc)

def copy_pdf(src, dst, channel):
    """Copy one file into the staging folder; a PDF is stamped with its channel."""
    shutil.copy2(src, dst)
    if dst.lower().endswith(".pdf"):
        channel_tag.stamp(dst, channel)

def channel_ok(p, channel):
    """True when the staged PDF, or every PDF inside the staged ZIP, carries `channel`."""
    if p.lower().endswith(".pdf"):
        return channel_tag.read(p) == channel
    if p.lower().endswith(".zip"):
        with tempfile.TemporaryDirectory() as tmp, zipfile.ZipFile(p) as z:
            for n in z.namelist():
                if n.lower().endswith(".pdf"):
                    z.extract(n, tmp)
                    if channel_tag.read(os.path.join(tmp, n)) != channel:
                        return False
    return True

def stage(kind, num):
    folder = sorted(glob.glob(os.path.join(PK, kind, f"{num}-*")))
    if not folder:
        sys.exit(f"no packet {kind} {num}")
    folder = folder[0]
    name = os.path.basename(folder)
    out = os.path.join(STAGE, f"{kind}-{name}")
    if os.path.commonpath([os.path.abspath(out), ROOT]) == ROOT:
        sys.exit("staging folder must be outside the repository")
    shutil.rmtree(out, ignore_errors=True)
    os.makedirs(os.path.join(out, "files"))
    problems = []
    staged = []
    if name.startswith("11-course"):
        c = "products/course-screen-reset/downloads"
        for f in sorted(os.listdir(os.path.join(ROOT, c))):
            copy_pdf(os.path.join(ROOT, c, f), os.path.join(out, "files", f), "site"); staged.append(os.path.join(out, "files", f))
        b = os.path.join(out, "bundle-49-extra-files"); os.makedirs(b)
        for zname, sub in [("Play-First-Family-Kit.zip", "05-play-first-family-kit-ages-2-5"), ("100-Screen-Free-Plays.zip", "03-guide-100-plays"), ("Bored-Play-Cards.zip", "04-bored-play-cards-ages-1-5")]:
            pj = json.load(open(os.path.join(PK, "gumroad", sub, "packet.json"), encoding="utf-8"))
            mem = [(f["source"], zname[:-4] + "/" + f["name"]) for f in pj["files"]]
            build_zip(mem, os.path.join(b, zname), "site"); staged.append(os.path.join(b, zname))
        for f in ("DRIP-EMAILS-PAID.md", "DRIP-EMAILS-FREE-STARTER.md"):
            shutil.copy2(os.path.join(folder, f), os.path.join(out, f))
    else:
        pj = json.load(open(os.path.join(folder, "packet.json"), encoding="utf-8"))
        if kind == "etsy" and pj["status"] != "READY":
            sys.exit(f"{name}: BLOCKED on Etsy ({pj['etsy_status'][:120]}...). Nothing staged.")
        files = pj["digital_files"] if kind == "etsy" else pj["files"]
        if kind == "etsy":
            man = None
            if any(f["kind"] == "zip" for f in files):
                slug = pj["slug"]
                man = json.load(open(os.path.join(ROOT, "products", slug, "zip-manifest.json"), encoding="utf-8"))
            for i, f in enumerate(files):
                dst = os.path.join(out, "files", f["name"])
                if f["kind"] == "pdf":
                    copy_pdf(os.path.join(ROOT, f["src"]), dst, "etsy")
                else:
                    slot = next(s for s in man["etsy_download"] if s.get("zip") == f["name"])
                    build_zip([(m["src"], m["zip_path"]) for m in slot["members"]], dst, "etsy")
                staged.append(dst)
            os.makedirs(os.path.join(out, "images"))
            for im in pj["images"]:
                src = os.path.join(ROOT, im["file"])
                dst = os.path.join(out, "images", f"{im['order']:02d}-{os.path.basename(src)}")
                shutil.copy2(src, dst)
            if len(files) > 5:
                problems.append(f"{len(files)} files (Etsy allows 5)")
            for p in staged:
                if os.path.getsize(p) / 1e6 > 20:
                    problems.append(f"{os.path.basename(p)} is {os.path.getsize(p) / 1e6:.2f} MB (over 20 MB)")
                if p.endswith(".pdf") and not etsy_clean(p):
                    problems.append(f"{os.path.basename(p)} contains a web address, QR text or a link")
                if p.endswith(".zip"):
                    tmp = os.path.join(out, "_check"); os.makedirs(tmp, exist_ok=True)
                    with zipfile.ZipFile(p) as z:
                        for n in z.namelist():
                            z.extract(n, tmp)
                            if n.endswith(".pdf") and not etsy_clean(os.path.join(tmp, n)):
                                problems.append(f"{os.path.basename(p)}/{n} contains a web address, QR text or a link")
                    shutil.rmtree(tmp)
        else:
            slug = pj["slug"]
            man_path = os.path.join(ROOT, "products", slug, "zip-manifest.json")
            man = json.load(open(man_path, encoding="utf-8")) if slug.startswith("bundle-") else None
            for f in files:
                dst = os.path.join(out, "files", f["name"])
                if f["source"].startswith("built by stage.py"):
                    slot = next(s for s in man["store_download"] if s.get("zip") == f["name"])
                    build_zip([(m["src"], m["zip_path"]) for m in slot["members"]], dst, "site")
                else:
                    copy_pdf(os.path.join(ROOT, f["source"]), dst, "site")
                staged.append(dst)
            os.makedirs(os.path.join(out, "images"))
            for k in ("thumbnail", "cover"):
                shutil.copy2(os.path.join(ROOT, pj[k]), os.path.join(out, "images", f"{k}-{os.path.basename(pj[k])}"))
        for f in ("PACKET.md", "description.txt"):
            if os.path.exists(os.path.join(folder, f)):
                shutil.copy2(os.path.join(folder, f), os.path.join(out, f))
    want = "etsy" if kind == "etsy" else "site"
    for p in staged:
        if not channel_ok(p, want):
            problems.append(f"{os.path.basename(p)}: a PDF is missing its channel={want} tag")
    with open(os.path.join(out, "MANIFEST.txt"), "w") as m:
        for p in staged:
            m.write(f"{sha(p)}  {os.path.getsize(p) / 1e6:8.2f} MB  {os.path.relpath(p, out)}\n")
    if problems:
        print(f"{kind} {num}: PROBLEMS\n  " + "\n  ".join(problems))
        return False
    print(f"{kind} {num}: {len(staged)} files staged in {out}  OK")
    return True

if __name__ == "__main__":
    if sys.argv[1:] == ["--all"]:
        ok = True
        for kind in ("etsy", "gumroad"):
            for d in sorted(glob.glob(os.path.join(PK, kind, "[0-9][0-9]-*"))):
                num = os.path.basename(d)[:2]
                pj = os.path.join(d, "packet.json")
                if kind == "etsy" and json.load(open(pj, encoding="utf-8"))["status"] != "READY":
                    print(f"etsy {num}: BLOCKED on Etsy, skipped"); continue
                ok = stage(kind, num) and ok
        sys.exit(0 if ok else 1)
    if len(sys.argv) != 3 or sys.argv[1] not in ("etsy", "gumroad"):
        sys.exit(__doc__)
    sys.exit(0 if stage(sys.argv[1], sys.argv[2].zfill(2)) else 1)
