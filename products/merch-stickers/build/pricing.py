#!/usr/bin/env python3
"""Nets and floors for a print-on-demand item (commerce/PRICING.md s.2: never under 30% margin).

python3 build/pricing.py      (run from the product folder; writes the price fields into listing.json)

Same fee model as products/merch-core and ops/TESTS/check_listings.py. EVERY rate and cost
here is UNVERIFIED (from memory; no partner quote exists yet). Replace COSTS with the chosen
partner's quote and re-run; if a channel drops under its floor, raise the everyday price
(never a 'was' price) or drop that channel.
Shipping treatment: the buyer pays the partner's shipping rate at cost (no free-shipping
price bake-in), so shipping cancels out except for the fees charged on it.
"""
import json, os, sys

PROD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CFG = json.load(open(os.path.join(PROD, 'build', 'pricing-input.json')))

FEES = {  # UNVERIFIED
    'etsy':    {'fixed': 0.20 + 0.25, 'pct_total': 0.065 + 0.03},   # listing + processing fixed; transaction + processing on item + shipping
    'gumroad': {'fixed': 0.50 + 0.30, 'pct_total': 0.10 + 0.029},   # 10% + $0.50 plus card processing, as the repo's digital listings model it
    'site':    {'fixed': 0.30, 'pct_total': 0.029},                 # own site on Shopify Payments (after ~25 own-site orders a month)
}
REFUND = 0.05          # refund / remake allowance on the item price
MARGIN = 0.30          # commerce/PRICING.md s.2
OFFSITE_ADS = {'optional_15pct': 0.15, 'mandatory_12pct': 0.12}   # Etsy Offsite Ads (UNVERIFIED; mandatory above ~$10k/yr shop sales)


def net(price, cost, ship, ch, extra_pct=0.0):
    f = FEES[ch]
    fees = f['fixed'] + (f['pct_total'] + extra_pct) * (price + ship)
    return round(price - cost - fees - REFUND * price, 2)


def max_cost(price, ship, ch):
    """Highest partner cost that still keeps the 30% floor on this channel."""
    f = FEES[ch]
    return round(price - f['fixed'] - f['pct_total'] * (price + ship) - REFUND * price - MARGIN * price, 2)


def min_free_ship_price(cost, ship, ch):
    """Everyday price needed if shipping were built into the price (free shipping)."""
    f = FEES[ch]
    return round((cost + ship + f['fixed']) / (1 - f['pct_total'] - REFUND - MARGIN), 2)


out = {'variants': {}}
for v in CFG['variants']:
    p, c, s = v['price'], v['cost'], v['ship']
    floor = round(MARGIN * p, 2)
    nets = {ch: net(p, c, s, ch) for ch in FEES}
    row = {
        'price_usd': p, 'partner_cost_usd': c, 'partner_shipping_usd': s, 'price_floor': floor,
        'net': nets, 'margin_pct': {ch: round(100 * n / p) for ch, n in nets.items()},
        'max_partner_cost_usd': {ch: max_cost(p, s, ch) for ch in FEES},
        'etsy_offsite_ads_net': {k: net(p, c, s, 'etsy', r) for k, r in OFFSITE_ADS.items()},
        'free_shipping_min_price_etsy': min_free_ship_price(c, s, 'etsy'),
    }
    row['meets_floor'] = all(n >= floor for n in nets.values())
    out['variants'][v['name']] = row
    print(f"{v['name']:>8}: ${p} floor ${floor:.2f} | " + ' | '.join(f"{ch} ${n:.2f} ({row['margin_pct'][ch]}%)" for ch, n in nets.items())
          + f" | offsite 15% ${row['etsy_offsite_ads_net']['optional_15pct']:.2f} | {'OK' if row['meets_floor'] else 'UNDER FLOOR'}")

main = out['variants'][CFG['variants'][0]['name']]
out['price_floor'] = max(r['price_floor'] for r in out['variants'].values())
json.dump(out, open(os.path.join(PROD, 'build', 'pricing.json'), 'w'), indent=1)

lp = os.path.join(PROD, 'listing.json')
if os.path.exists(lp):
    d = json.load(open(lp))
    first = CFG['variants'][0]['name']
    d['price_usd'] = CFG['variants'][0]['price']
    if len(CFG['variants']) > 1:
        d['variant_prices_usd'] = {v['name']: v['price'] for v in CFG['variants']}
    d['price_floor'] = out['price_floor']
    d['price_floor_by_variant'] = {k: r['price_floor'] for k, r in out['variants'].items()}
    d['net_per_unit_by_channel'] = {f'{ch}_{k}' if len(out['variants']) > 1 else ch: r['net'][ch]
                                    for k, r in out['variants'].items() for ch in FEES}
    d['margin_pct_by_channel'] = {f'{ch}_{k}' if len(out['variants']) > 1 else ch: r['margin_pct'][ch]
                                  for k, r in out['variants'].items() for ch in FEES}
    d['max_partner_cost_usd_by_channel'] = {f'{ch}_{k}' if len(out['variants']) > 1 else ch: r['max_partner_cost_usd'][ch]
                                            for k, r in out['variants'].items() for ch in FEES}
    d['pod_cost_estimate_usd'] = {k: {'item': r['partner_cost_usd'], 'shipping_first_item_us': r['partner_shipping_usd'],
                                      'status': 'UNVERIFIED typical partner cost; replace with the chosen partner quote'}
                                  for k, r in out['variants'].items()}
    json.dump(d, open(lp, 'w'), indent=2, ensure_ascii=False)
    open(lp, 'a').write('\n')
    print('listing.json price fields updated')
if not all(r['meets_floor'] for r in out['variants'].values()):
    sys.exit('UNDER FLOOR: raise the everyday price or drop the channel.')
