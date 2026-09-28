"""Hand-built geometry for concept 5 (Shadow Talker).

A shape is a polygon whose corners are filleted with circular arcs.
Output is an SVG path made only of straight lines and circular arcs.
"""
import math


def _unit(v):
    l = math.hypot(*v)
    return (v[0] / l, v[1] / l)


def rounded_polygon(pts, fmt="{:.2f}"):
    """pts: list of (x, y, r). Returns SVG path d (lines + arcs), closed."""
    n = len(pts)
    segs = []  # (start_point, end_point, radius, sweep)
    for i in range(n):
        x, y, r = pts[i]
        px, py, _ = pts[i - 1]
        nx, ny, _ = pts[(i + 1) % n]
        if r <= 0:
            segs.append(((x, y), (x, y), 0, 0))
            continue
        a = _unit((px - x, py - y))
        b = _unit((nx - x, ny - y))
        cosang = max(-1.0, min(1.0, a[0] * b[0] + a[1] * b[1]))
        ang = math.acos(cosang)
        t = r / math.tan(ang / 2)
        p1 = (x + a[0] * t, y + a[1] * t)
        p2 = (x + b[0] * t, y + b[1] * t)
        # turn direction: cross of incoming dir and outgoing dir
        din = (-a[0], -a[1])
        cross = din[0] * b[1] - din[1] * b[0]
        sweep = 1 if cross > 0 else 0
        segs.append((p1, p2, r, sweep))
    f = lambda v: fmt.format(v).rstrip("0").rstrip(".") if "." in fmt.format(v) else fmt.format(v)
    d = []
    first = segs[0][1] if segs[0][2] else segs[0][0]
    d.append(f"M{f(first[0])} {f(first[1])}")
    for i in range(1, n + 1):
        p1, p2, r, sweep = segs[i % n]
        d.append(f"L{f(p1[0])} {f(p1[1])}")
        if r:
            d.append(f"A{f(r)} {f(r)} 0 0 {sweep} {f(p2[0])} {f(p2[1])}")
    d.append("Z")
    return "".join(d)


def circle(cx, cy, r, fmt="{:.2f}", ccw=True):
    """Circle as two arcs. ccw=True gives the opposite winding to a clockwise outer
    shape so it punches a hole under the default nonzero rule as well."""
    s = 0 if ccw else 1
    f = lambda v: fmt.format(v).rstrip("0").rstrip(".")
    return (f"M{f(cx + r)} {f(cy)}A{f(r)} {f(r)} 0 1 {s} {f(cx - r)} {f(cy)}"
            f"A{f(r)} {f(r)} 0 1 {s} {f(cx + r)} {f(cy)}Z")
