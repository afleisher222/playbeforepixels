#!/usr/bin/env python3
"""
margin_audit.py - checks that every sellable record meets its price floor on every channel.

Rules (commerce/PRICING.md s.1-2; ops/COMPLIANCE-GATE.md 16 and 18):
  - print-on-demand channel (merch, KDP/IngramSpark books, POD books): net >= 30% of that channel's price
  - digital channel: net >= $3.00
  - every net >= the record's own declared floor (price_floor, or price_floor_by_channel / _by_format / _by_variant)
  - a single printable is never under $5; a KDP paperback is $9.99+ unless print cost prevents it
Digital nets are also recomputed from the repo's fee model (UNVERIFIED rates) to catch stale figures.
A null net is PENDING (no quote yet, or a later channel): it is listed, never counted as a pass.

Read-only for products/. Usage (repo root):
  python3 ops/TESTS/margin_audit.py                       # table to stdout; exit 1 on any FAIL
  python3 ops/TESTS/margin_audit.py --report ops/TESTS/margin-audit.md
"""
import argparse, datetime, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import check_listings as C  # noqa: E402  (same loader, so the two tests always see the same records)

POD_MARGIN, DIGITAL_FLOOR, REFUND = 0.30, 3.00, 0.05
POD_TOKENS = ('kdp', 'ingram', 'hardcover', 'softcover', 'paperback', '_pod', 'bundle_share', 'presale')
# Channel prices that are not the record's price_usd (read from each record's price_notes / floor basis).
CHANNEL_PRICE = {
    ('picture-laps-not-apps', 'softcover'): 24.99,
    ('course-screen-reset', 'bundle'): 49.00,
    ('course-screen-reset', 'kdp'): 14.99,
}


def channel_price(d, slug, key):
    for (s, tok), p in CHANNEL_PRICE.items():
        if s == slug and tok in key:
            return p
    if 'pdf' in key and d.get('price_pdf_usd'):
        return float(d['price_pdf_usd'])
    for v, p in (d.get('variant_prices_usd') or {}).items():
        if key.endswith('_' + v):
            return float(p)
    return float(d['price_usd'])


def declared_floor(d, key):
    for k, v in (d.get('price_floor_by_channel') or {}).items():
        if k == key:
            return float(v)
    for k, v in (d.get('price_floor_by_format') or {}).items():
        if k in key:
            return float(v)
    for k, v in (d.get('price_floor_by_variant') or {}).items():
        if key.endswith('_' + k):
            return float(v)
    return float(d['price_floor']) if d.get('price_floor') is not None else None


def recompute_digital(key, p):
    """Repo fee model (UNVERIFIED): Etsy 0.20 + 6.5% + 3% + 0.25; Gumroad 10% + 0.50 + 2.9% + 0.30;
    Discover 30% + 2.9% + 0.30; TpT basic 55% payout - 0.30; all less a 5% refund allowance."""
    k = key.replace('_pdf', '').replace('_single', '')
    if k.startswith('etsy'):
        n = p - 0.45 - 0.095 * p - REFUND * p
        return n - 0.15 * p if 'offsite' in k else n
    if 'gumroad' in k and 'bundle' not in k:
        if 'discover' in k:
            return p - 0.30 * p - 0.029 * p - 0.30 - REFUND * p
        return p - 0.10 * p - 0.50 - 0.029 * p - 0.30 - REFUND * p
    if k.startswith('tpt'):
        return 0.55 * p - 0.30 - REFUND * p
    return None


def audit():
    listings, skipped, missing = C.load(ROOT)
    rows = []
    for l in listings:
        d = l.data
        if not d or d.get('price_usd') is None:
            continue
        nets = dict(d.get('net_per_unit_by_channel') or {})
        for size, by in (d.get('net_by_size_estimate') or {}).items():   # tee size variants
            for ch, v in by.items():
                nets[f'{ch}_{size}'] = v
        is_merch = 'merch' in l.kinds
        for key, net in nets.items():
            size = next((s for s in (d.get('variant_prices_usd') or {}) if key.endswith('_' + s)), None)
            p = channel_price(d, l.slug, key)
            pod = is_merch or any(t in key for t in POD_TOKENS)
            rule = round(POD_MARGIN * p, 2) if pod else DIGITAL_FLOOR
            dec = declared_floor(d, key)
            if size and is_merch and dec is not None and dec < rule:
                dec = rule   # a tee size's floor is 30% of that size's price
            need = max(x for x in (rule, dec) if x is not None)
            re_ = None if pod else recompute_digital(key, p)
            notes = []
            if net is None:
                status = 'PENDING'
                notes.append('no net yet (quote pending or later channel)' +
                             ('; when filled it must keep 30% of its own list price' if pod else '; must reach $3.00 when filled'))
            else:
                net = float(net)
                status = 'PASS' if net >= need - 1e-9 else 'FAIL'
                if status == 'FAIL':
                    notes.append(f'under the ${need:.2f} floor')
                if re_ is not None and abs(re_ - net) > 0.05:
                    notes.append(f'recomputed ${re_:.2f}')
            if net is not None and dec is not None and dec < rule - 0.005:
                notes.append(f'declared floor ${dec:.2f} is under the rule floor ${rule:.2f}')
                status = 'FAIL' if status == 'PASS' else status
            rows.append({'slug': l.slug, 'status_rec': d.get('status', ''), 'path': l.path, 'channel': key,
                         'type': 'POD' if pod else 'digital', 'price': p, 'net': net, 'floor': need,
                         'margin': (None if net is None else round(100 * net / p)), 'result': status, 'notes': '; '.join(notes)})
        # PRICING.md s.1 and s.2 list-price rules
        pr = float(d['price_usd'])
        if 'digital' in l.kinds and 'bundle' not in l.slug and pr < 5 - 1e-9:
            rows.append({'slug': l.slug, 'status_rec': d.get('status', ''), 'path': l.path, 'channel': '(list price)', 'type': 'digital',
                         'price': pr, 'net': None, 'floor': 5.0, 'margin': None, 'result': 'FAIL', 'notes': 'single printable under $5'})
        if any('kdp' in k for k in nets) and 'kdp' in str(d.get('format', '')).lower():
            kp = channel_price(d, l.slug, next(k for k in nets if 'kdp' in k))
            if kp < 9.99 - 1e-9:
                rows.append({'slug': l.slug, 'status_rec': d.get('status', ''), 'path': l.path, 'channel': '(KDP list price)', 'type': 'POD',
                             'price': kp, 'net': None, 'floor': 9.99, 'margin': None, 'result': 'WARN', 'notes': 'KDP paperback under $9.99'})
    return rows, skipped, missing


def table(rows):
    out = ['| Product (record) | Status | Channel | Type | Price | Net / unit | Floor | Margin | Result | Notes |',
           '|---|---|---|---|---|---|---|---|---|---|']
    for r in rows:
        out.append(f"| {r['slug']} | {r['status_rec']} | {r['channel']} | {r['type']} | ${r['price']:.2f} | "
                   f"{'—' if r['net'] is None else '$%.2f' % r['net']} | ${r['floor']:.2f} | "
                   f"{'—' if r['margin'] is None else str(r['margin']) + '%'} | **{r['result']}** | {r['notes']} |")
    return '\n'.join(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--report')
    a = ap.parse_args()
    rows, skipped, missing = audit()
    n = {s: sum(1 for r in rows if r['result'] == s) for s in ('PASS', 'FAIL', 'PENDING', 'WARN')}
    recs = len({(r['slug'], r['path']) for r in rows})
    summary = (f"{recs} sellable records, {len(rows)} channel rows: {n['PASS']} PASS, {n['FAIL']} FAIL, "
               f"{n['PENDING']} PENDING (no net yet), {n['WARN']} WARN.")
    print(summary)
    for r in rows:
        if r['result'] != 'PASS':
            print(f"  {r['result']:8} {r['slug']:32} {r['channel']:34} {r['notes']}")
    if a.report:
        head = open(a.report).read().split('<!-- TABLE -->')[0] if os.path.exists(a.report) else ''
        body = (f"<!-- TABLE -->\n## Table (generated by `python3 ops/TESTS/margin_audit.py --report ops/TESTS/margin-audit.md`, "
                f"{datetime.date.today().isoformat()})\n\n{summary}\n\n{table(rows)}\n\n"
                f"Skipped (archived): {', '.join(skipped) or 'none'}. Folders with no listing file: {', '.join(missing) or 'none'}.\n")
        open(a.report, 'w').write(head + body)
    sys.exit(1 if n['FAIL'] else 0)


if __name__ == '__main__':
    main()
