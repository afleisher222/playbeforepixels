#!/usr/bin/env python3
"""Stamp 300 dpi (pHYs chunk) into the print PNGs so print partners read 15 x 18 in,
12 x 12 in and 3 x 3 in instead of assuming 72 dpi. Pixels are not changed."""
import glob, os, struct, zlib

HERE = os.path.dirname(os.path.abspath(__file__))
PROD = os.path.dirname(HERE)
PPM = round(300 / 0.0254)  # 11811 pixels per metre


def stamp(path):
    b = open(path, 'rb').read()
    assert b[:8] == b'\x89PNG\r\n\x1a\n'
    out, i = [b[:8]], 8
    done = False
    while i < len(b):
        n = struct.unpack('>I', b[i:i + 4])[0]
        typ = b[i + 4:i + 8]
        chunk = b[i:i + 12 + n]
        i += 12 + n
        if typ == b'pHYs':
            continue
        out.append(chunk)
        if typ == b'IHDR' and not done:
            data = struct.pack('>IIB', PPM, PPM, 1)
            out.append(struct.pack('>I', len(data)) + b'pHYs' + data +
                       struct.pack('>I', zlib.crc32(b'pHYs' + data) & 0xffffffff))
            done = True
    open(path, 'wb').write(b''.join(out))


files = glob.glob(os.path.join(PROD, 'print', '*.png')) + glob.glob(os.path.join(PROD, 'labels', '*.png'))
for f in files:
    stamp(f)
print('300 dpi stamped on', len(files), 'PNGs')
