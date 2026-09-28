#!/usr/bin/env python3
"""Write the channel tag into a PDF's metadata (COMPLIANCE-GATE 16; GAPS-ROUND-2 G2-09: "channel=site|kdp|etsy|tpt
written into each file").

    python3 ops/UPLOAD-PACKETS/channel_tag.py etsy  file1.pdf [file2.pdf ...]   # stamp
    python3 ops/UPLOAD-PACKETS/channel_tag.py --check etsy file.pdf            # exit 1 unless the tag matches

The tag goes at the front of the PDF Keywords field as "channel=<name>" (any older channel= entry is replaced).
The file is saved incrementally, so tags (accessibility structure), form fields and bookmarks are kept.
stage.py stamps every staged PDF (and every PDF inside a staged ZIP) with the channel it is being uploaded to;
the KDP build stamps its print files with channel=kdp.
"""
import re
import sys

CHANNELS = ("site", "kdp", "etsy", "tpt")
TAG = re.compile(r"\s*channel=\w+\s*[;,]?\s*")


def read(path):
    import pymupdf as fitz
    d = fitz.open(path)
    m = re.search(r"channel=(\w+)", d.metadata.get("keywords") or "")
    return m.group(1) if m else None


def stamp(path, channel):
    import pymupdf as fitz
    if channel not in CHANNELS:
        raise ValueError(f"unknown channel {channel!r}")
    d = fitz.open(path)
    meta = dict(d.metadata)
    rest = TAG.sub(" ", meta.get("keywords") or "").strip(" ;,")
    meta["keywords"] = f"channel={channel}" + (f"; {rest}" if rest else "")
    d.set_metadata({k: v for k, v in meta.items() if k in (
        "title", "author", "subject", "keywords", "creator", "producer", "creationDate", "modDate", "trapped")})
    if d.can_save_incrementally():
        d.saveIncr()
    else:
        tmp = path + ".tmp"
        d.save(tmp, garbage=0, deflate=True)
        d.close()
        import os
        os.replace(tmp, path)
    return read(path) == channel


if __name__ == "__main__":
    a = sys.argv[1:]
    check = a[:1] == ["--check"]
    if check:
        a = a[1:]
    if len(a) < 2 or a[0] not in CHANNELS:
        sys.exit(__doc__)
    bad = []
    for p in a[1:]:
        ok = (read(p) == a[0]) if check else stamp(p, a[0])
        if not ok:
            bad.append(p)
    for p in bad:
        print(f"channel tag is not {a[0]}: {p}")
    sys.exit(1 if bad else 0)
