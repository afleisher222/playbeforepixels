#!/usr/bin/env python3
"""
unchanged_renders.py - keep re-renders that changed nothing out of git.

Chromium stamps every PDF with a new CreationDate, ModDate and /ID, and re-encodes some PNGs,
so a rebuild that changes nothing still shows every PDF (and some PNGs) as modified. Committing
them adds megabytes to every clone for no change (ops/CLOUD-RUNBOOK.md "Keep the repository small").

This lists the modified, already-tracked .pdf/.png files whose pixels match HEAD (allowing only
the anti-aliasing noise described at TOL_LEVELS below).
With --restore it puts those files back to the committed version, so only real changes get
committed. New (untracked) files and files whose pixels changed are never touched.

Usage (from the repo root, before `git add`):
  python3 ops/TESTS/unchanged_renders.py                    # list only
  python3 ops/TESTS/unchanged_renders.py --restore          # restore pixel-identical files
  python3 ops/TESTS/unchanged_renders.py products/my-slug   # limit to a folder
Exit codes: 0 = done, 2 = script error.
"""
import argparse, io, os, subprocess, sys


def git(*a, binary=False):
    r = subprocess.run(["git", *a], capture_output=True)
    if r.returncode:
        raise RuntimeError(r.stderr.decode(errors="replace").strip())
    return r.stdout if binary else r.stdout.decode()


# Chromium's anti-aliasing can shift a few edge pixels by a few levels when the machine is busy
# (measured in the cloud rehearsal: 2-12 pixels of 665,856, at most 10 levels). A real edit, even a
# single period, changes ink pixels by ~200 levels. So "same" means: every channel within
# TOL_LEVELS, on at most TOL_SHARE of the pixels.
TOL_LEVELS, TOL_SHARE = 16, 0.001


def same_pixels(a, b):
    """a, b: numpy uint8 arrays of the same image mode."""
    import numpy as np
    if a.shape != b.shape:
        return False
    d = np.abs(a.astype(np.int16) - b.astype(np.int16))
    if not d.any():
        return True
    px = d.reshape(-1, d.shape[-1]).max(axis=1)
    return int(px.max()) <= TOL_LEVELS and np.count_nonzero(px) <= TOL_SHARE * px.size


def same_png(old, path):
    import numpy as np
    from PIL import Image
    a = np.asarray(Image.open(io.BytesIO(old)).convert("RGBA"))
    b = np.asarray(Image.open(path).convert("RGBA"))
    return same_pixels(a, b)


def same_pdf(old, path, dpi):
    import numpy as np
    import pymupdf
    da, db = pymupdf.open(stream=old, filetype="pdf"), pymupdf.open(path)
    if da.page_count != db.page_count:
        return False
    for pa, pb in zip(da, db):
        if pa.rect != pb.rect:
            return False
        xa, xb = pa.get_pixmap(dpi=dpi), pb.get_pixmap(dpi=dpi)
        if xa.samples != xb.samples and not same_pixels(
                np.frombuffer(xa.samples, np.uint8).reshape(xa.h, xa.w, xa.n),
                np.frombuffer(xb.samples, np.uint8).reshape(xb.h, xb.w, xb.n)):
            return False
    return True


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("paths", nargs="*", default=["."])
    ap.add_argument("--restore", action="store_true", help="restore pixel-identical files to HEAD")
    ap.add_argument("--dpi", type=int, default=96, help="PDF comparison resolution (default 96)")
    a = ap.parse_args()
    os.chdir(git("rev-parse", "--show-toplevel").strip())
    changed = [l[3:] for l in git("status", "--porcelain", "--", *a.paths).splitlines()
               if l[:2].strip() == "M" and l[3:].lower().endswith((".pdf", ".png"))]
    same, differ = [], []
    for p in changed:
        old = git("show", f"HEAD:{p}", binary=True)
        ok = same_pdf(old, p, a.dpi) if p.lower().endswith(".pdf") else same_png(old, p)
        (same if ok else differ).append(p)
    for p in same:
        print(f"unchanged pixels: {p}")
    for p in differ:
        print(f"real change:      {p}")
    if a.restore and same:
        git("checkout", "--", *same)
        print(f"restored {len(same)} file(s) to HEAD; {len(differ)} real change(s) left to commit")
    else:
        print(f"{len(same)} pixel-identical, {len(differ)} real change(s)" + ("" if a.restore else "; run with --restore to drop the identical ones"))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as e:
        print(f"unchanged_renders.py error: {e}", file=sys.stderr)
        sys.exit(2)
