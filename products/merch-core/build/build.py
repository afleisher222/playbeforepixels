#!/usr/bin/env python3
"""Play Before Pixels core merch: build every print file.

python3 build/build.py        (run from products/merch-core/)

Writes
  print/tee-logo_light.svg|png   4500 x 5400, transparent (white, natural, mustard tees)
  print/tee-logo_dark.svg|png    4500 x 5400, transparent (navy tee)
  print/tote-logo_light.svg|png  3600 x 3600, transparent (natural tote)
  print/tote-logo_dark.svg|png   3600 x 3600, transparent (black or navy tote)
  labels/neck-label_<SIZE>_<light|dark>.svg|png   900 x 900 (3 x 3 in at 300 dpi)
  slogan-slot/slogan-tee-TEMPLATE.svg            layout guide only, never uploaded
  build/raster-jobs.json  (then: node ../../brand/logo/src/raster.js build/raster-jobs.json)

The logo is placed from the supplied brand/logo files, unaltered (BRAND.md: use only
the supplied files; never retype, recolour or add effects). All other text is outlined
from the brand fonts so the files print the same everywhere.
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
PROD = os.path.dirname(HERE)
ROOT = os.path.abspath(os.path.join(PROD, '..', '..'))
sys.path.insert(0, HERE)
from textpath import text_path  # noqa: E402

INK, PAPER, TOMATO, SUN = '#1D2940', '#FFFFFF', '#EE5A36', '#F5B820'
COPY = '© 2026 AlphaPlay LLC. Play Before Pixels is a trade name of AlphaPlay LLC.'
VERSION = 'Version 1.0 · September 2026'

# ---------------------------------------------------------------------------
# Founder edits (human authorship): garment details that come from the blank you
# choose at your print partner. Leave None until you have the partner's spec sheet;
# the labels then print a tomato "FILL IN" box so they cannot be uploaded by mistake.
BLANK = {
    'fiber': None,    # e.g. '100% cotton' (heather colours often differ: check each colour)
    'origin': None,   # e.g. 'Made in Nicaragua'  (country from the blank's spec sheet)
}
SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']

# Slogan tees: EMPTY on purpose. A slogan may be added here only after it is cleared in
# brand/ORIGINALITY.md (see build rule in slogan_files()). Write slogans in your own
# words (human authorship). Example entry:
#   {'id': 'slogan-1', 'lines': ['First line', 'second line']}
SLOGANS = []
BANNED = ['pencils before pixels', "childhood can't wait", 'paper first', 'screen-free week',
          'screen free week', 'autism', 'therapy', 'play beyond the screen']
# ---------------------------------------------------------------------------


def logo(name):
    s = open(os.path.join(ROOT, 'brand/logo', name)).read()
    vb = [float(v) for v in re.search(r'viewBox="([^"]+)"', s).group(1).split()]
    inner = re.search(r'</title>(.*)</svg>', s, re.S).group(1)
    return vb, inner


def place(name, x, y, width):
    """Place a brand logo file so its viewBox (which already carries half a ball of
    clear space) is `width` px wide with its top-left at x, y. Returns (svg, height)."""
    (vx, vy, vw, vh), inner = logo(name)
    k = width / vw
    g = f'<g transform="translate({x:.2f} {y:.2f}) scale({k:.6f}) translate({-vx} {-vy})">{inner}</g>'
    return g, vh * k


def svg_doc(w, h, body, title, desc=''):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
            f'<title>{title}</title><desc>{desc} {COPY} {VERSION}.</desc>{body}</svg>\n')


def write(rel, text):
    p = os.path.join(PROD, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(text)
    return p


jobs = []


def job(rel_svg, w, h):
    jobs.append({'svg': os.path.join(PROD, rel_svg), 'png': os.path.join(PROD, rel_svg[:-4] + '.png'), 'w': w, 'h': h})


# ---- 1. Logo tee: horizontal lockup (the default lockup), 10 in of ink across the chest
TEE_W, TEE_H = 4500, 5400          # 15 x 18 in at 300 dpi
TEE_LOGO_VB_W = 3170               # viewBox width in px -> ink about 2997 px = 10.0 in
TEE_TOP = 300                      # 1 in from the top of the print area (ink starts ~1.3 in)
for tone, f in (('light', 'lockup-horizontal.svg'), ('dark', 'lockup-horizontal-reverse.svg')):
    g, h = place(f, (TEE_W - TEE_LOGO_VB_W) / 2, TEE_TOP, TEE_LOGO_VB_W)
    rel = f'print/tee-logo_{tone}.svg'
    write(rel, svg_doc(TEE_W, TEE_H, g, 'Play Before Pixels logo tee, front print, ' + tone + ' garments',
                       'Adult unisex tee. 4500 x 5400 px = 15 x 18 in at 300 dpi; ink about 10 in wide, '
                       'centred, 1.3 in below the top of the print area.'))
    job(rel, TEE_W, TEE_H)

# ---- 2. Tote: stacked lockup (the kit's lockup for tote bags), about 9 in of ink
TOTE = 3600                        # 12 x 12 in at 300 dpi
TOTE_VB_W = 2900
for tone, f in (('light', 'lockup-stacked.svg'), ('dark', 'lockup-stacked-reverse.svg')):
    (vx, vy, vw, vh), _ = logo(f)
    hh = vh * TOTE_VB_W / vw
    g, _h = place(f, (TOTE - TOTE_VB_W) / 2, (TOTE - hh) / 2 - 120, TOTE_VB_W)
    rel = f'print/tote-logo_{tone}.svg'
    write(rel, svg_doc(TOTE, TOTE, g, 'Play Before Pixels tote, ' + tone + ' bags',
                       'Tote print, 3600 x 3600 px = 12 x 12 in at 300 dpi; ink about 9 in wide.'))
    job(rel, TOTE, TOTE)


# ---- 3. Inside-neck label (brand name as the trademark, size, care, legal fields)
def neck_label(size, tone):
    W = 900
    fg = INK if tone == 'light' else PAPER
    muted = '#4A5468' if tone == 'light' else '#D5DBE6'
    f = 'lockup-horizontal.svg' if tone == 'light' else 'lockup-horizontal-reverse.svg'
    parts = []
    g, h = place(f, (W - 640) / 2, 56, 640)
    parts.append(g)

    def t(txt, font, sz, y, fill=fg, tr=0):
        d, _ = text_path(txt, font, sz, W / 2, y, anchor='middle', tracking=tr)
        parts.append(f'<path d="{d}" fill="{fill}"/>')

    t(size, 'bric800', 200 if len(size) < 3 else 170, 425)
    t('ADULT UNISEX', 'nunito800', 36, 492, tr=0.16)
    parts.append(f'<circle cx="{W/2}" cy="527" r="9" fill="{TOMATO}"/>')
    t('PLAY BEFORE PIXELS™', 'nunito800', 32, 585, tr=0.12)
    t('AlphaPlay LLC', 'nunito700', 30, 628, fill=muted)
    t('Machine wash cold, inside out', 'nunito700', 30, 690, fill=muted)
    t('Tumble dry low · Do not iron the print', 'nunito700', 30, 730, fill=muted)
    if BLANK['fiber'] and BLANK['origin']:
        t(f"{BLANK['fiber']} · {BLANK['origin']}", 'nunito800', 31, 800)
    else:
        parts.append(f'<rect x="95" y="760" width="710" height="76" rx="12" fill="none" stroke="{TOMATO}" '
                     f'stroke-width="5" stroke-dasharray="18 12"/>')
        t('FILL IN: fiber % · country of origin', 'nunito800', 28, 808, fill=TOMATO)
    rel = f'labels/neck-label_{size}_{tone}.svg'
    write(rel, svg_doc(W, W, ''.join(parts), f'Play Before Pixels inside-neck label, size {size}, {tone} garments',
                       'Inside-neck print, 900 x 900 px = 3 x 3 in at 300 dpi [VERIFY against the print partner\'s label template].'))
    job(rel, W, W)


for s in SIZES:
    for tone in ('light', 'dark'):
        neck_label(s, tone)


# ---- 4. Slogan tees: a layout guide, and a guarded generator for cleared slogans only
def slogan_template():
    W, H = TEE_W, TEE_H
    guide = '#3D86D8'
    p = [f'<rect x="0" y="0" width="{W}" height="{H}" fill="#FFFFFF"/>',
         f'<rect x="4" y="4" width="{W-8}" height="{H-8}" fill="none" stroke="#C9D2E0" stroke-width="8"/>',
         f'<rect x="600" y="390" width="3300" height="1500" rx="30" fill="#E3EEFA" stroke="{guide}" stroke-width="10" stroke-dasharray="40 26"/>']

    def t(txt, font, sz, y, fill=guide, tr=0, x=W / 2):
        d, _ = text_path(txt, font, sz, x, y, anchor='middle', tracking=tr)
        p.append(f'<path d="{d}" fill="{fill}"/>')

    t('SLOGAN AREA · 11 x 5 in', 'nunito800', 90, 760, tr=0.1)
    t("Your own words, set in the brand's display face", 'nunito700', 80, 930, fill=INK)
    t('Allowed only after the slogan is cleared', 'nunito700', 80, 1260, fill=INK)
    t('in brand/ORIGINALITY.md', 'nunito800', 80, 1370, fill=TOMATO)
    t('Not cleared, never use: "Pencils before pixels" · "Childhood can\'t', 'nunito700', 64, 1620, fill='#6B7488')
    t('wait. Screens can." · "Paper first" · any event name', 'nunito700', 64, 1710, fill='#6B7488')
    g, h = place('lockup-horizontal.svg', (W - 1100) / 2, 2080, 1100)
    p.append(f'<rect x="{(W-1100)/2}" y="2080" width="1100" height="{h:.0f}" fill="none" stroke="{guide}" stroke-width="8" stroke-dasharray="30 20"/>')
    p.append(g)
    t('Brand sign-off: horizontal lockup, 3.5 in wide (never smaller than 40 mm)', 'nunito700', 64, 2080 + h + 110)
    t('TEMPLATE · DO NOT UPLOAD', 'nunito800', 110, 4700, fill=TOMATO, tr=0.12)
    write('slogan-slot/slogan-tee-TEMPLATE.svg',
          svg_doc(W, H, ''.join(p), 'Slogan tee layout guide (not a print file)', 'Founder slot for a cleared slogan.'))
    job('slogan-slot/slogan-tee-TEMPLATE.svg', 1500, 1800)


def slogan_files():
    if not SLOGANS:
        return
    orig = os.path.join(ROOT, 'brand/ORIGINALITY.md')
    if not os.path.exists(orig):
        sys.exit('STOP: brand/ORIGINALITY.md does not exist, so no slogan is cleared. No slogan tee was built.')
    cleared = open(orig).read().lower()
    for s in SLOGANS:
        text = ' '.join(s['lines'])
        low = text.lower()
        if any(b in low for b in BANNED):
            sys.exit(f'STOP: "{text}" uses a banned or uncleared phrase.')
        line = next((ln for ln in cleared.splitlines() if low in ln), None)
        if not line or 'cleared' not in line:
            sys.exit(f'STOP: "{text}" is not marked cleared in brand/ORIGINALITY.md.')
        for tone in ('light', 'dark'):
            fg = INK if tone == 'light' else PAPER
            parts, y, size = [], 700, 520
            widest = max(text_path(l, 'bric800', size, 0, 0)[1] for l in s['lines'])
            size = min(size, size * 3300 / widest)
            for l in s['lines']:
                d, _ = text_path(l, 'bric800', size, TEE_W / 2, y, anchor='middle')
                parts.append(f'<path d="{d}" fill="{fg}"/>')
                y += size * 1.02
            g, _h = place('lockup-horizontal.svg' if tone == 'light' else 'lockup-horizontal-reverse.svg',
                          (TEE_W - 1100) / 2, y + 120, 1100)
            parts.append(g)
            rel = f"print/tee-{s['id']}_{tone}.svg"
            write(rel, svg_doc(TEE_W, TEE_H, ''.join(parts), f'Play Before Pixels slogan tee: {text}', ''))
            job(rel, TEE_W, TEE_H)


slogan_template()
slogan_files()

json.dump(jobs, open(os.path.join(HERE, 'raster-jobs.json'), 'w'), indent=1)
print(len(jobs), 'files written; now run: node ../../brand/logo/src/raster.js build/raster-jobs.json')
