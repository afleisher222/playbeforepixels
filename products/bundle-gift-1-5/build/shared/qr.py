#!/usr/bin/env python3
"""Print a QR code for a URL as one SVG <path> (module units, quiet zone included).

    python3 qr.py "https://playbeforepixels.com/bonus/winter-countdown?src=bonus-winter-countdown"

Output: '<viewBox size>|<path d>' so kit.js can wrap it in its own <svg>. Error correction M.
"""
import sys
import qrcode


def main(url: str) -> None:
    q = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=2)
    q.add_data(url)
    q.make(fit=True)
    m = q.get_matrix()  # includes the border
    n = len(m)
    runs = []
    for y, row in enumerate(m):
        x = 0
        while x < n:
            if row[x]:
                x0 = x
                while x < n and row[x]:
                    x += 1
                runs.append(f"M{x0} {y}h{x - x0}v1h{x0 - x}z")
            else:
                x += 1
    print(f"{n}|{''.join(runs)}")


if __name__ == "__main__":
    main(sys.argv[1])
