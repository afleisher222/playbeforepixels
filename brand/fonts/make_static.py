#!/usr/bin/env python3
"""make_static.py - print-safe static instances of the brand's variable fonts.

Why: every brand/fonts/*.woff2 is a variable font (it has an fvar table). Chromium's Skia PDF
backend writes any variable font as a Type 3 font, and printers such as IngramSpark and offset
preflights commonly reject Type 3 (UNVERIFIED). A static instance (no fvar) embeds as a normal
TrueType (Type 0 / CIDFontType2) subset. See ops/TESTS/print-preflight.md G1 and
ops/TESTS/fonts-static.md.

What it does:
  1. Reads fonts-variable.css (the original Google Fonts @font-face list for the variable files:
     one block per unicode-range subset).
  2. For every face in FACES, instantiates EVERY subset file of that family/style at that weight
     with fontTools.varLib.instancer (all axes pinned, overlaps removed), sets clean names
     (e.g. "NunitoSans-SemiBoldItalic"), and saves brand/fonts/static/<name>.woff2.
  3. Writes fonts.css: the same family names, style, stretch and unicode-range lines, one fixed
     font-weight per block, pointing at the static files. No product CSS needs to change.
  4. Writes static/instances.json: source file, axis location and output for every instance.

Optical size (opsz): Chromium applies `font-optical-sizing: auto`, i.e. opsz = font-size in CSS px
(clamped to the axis range). A static file has ONE opsz, and CSS cannot choose a face by font
size, so each opsz family is pinned to OPSZ below. The pin is the axis maximum (= the fonts'
default instance): at that end of the axis every glyph is narrowest, so static text is never
wider than the variable render was, and nothing can newly overflow a box or the safe zone. Text
set at or above the pin (Nunito Sans >= 12px, Bricolage Grotesque >= 96px) is identical; smaller
text is narrower and tighter than before. The numbers are in ops/TESTS/fonts-static.md.

Faces: every family/style/weight that brand/fonts/survey_usage.js found drawn anywhere in
products/, brand/, content/ and site-concepts/ (2026-09-28), plus Caveat 500, which fonts.css
declared on its own. To add a weight: add it to FACES, run this script, then re-run
`node brand/fonts/survey_usage.js` (exit 0 = every weight a page asks for has a static face).

Usage (repo root):  python3 brand/fonts/make_static.py
"""
import hashlib
import json
import os
import re
import sys

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

HERE = os.path.dirname(os.path.abspath(__file__))
SRC_CSS = os.path.join(HERE, 'fonts-variable.css')
OUT_CSS = os.path.join(HERE, 'fonts.css')
OUT_DIR = os.path.join(HERE, 'static')

# opsz pin per family (axis maximum; see docstring).
OPSZ = {'Bricolage Grotesque': 96, 'Nunito Sans': 12}

# (family, style) -> weights actually used (survey_usage.js, effective weight after clamping to the
# old variable ranges: Bricolage 400-800, Nunito Sans 300-900, Fredoka 400-700).
FACES = {
    ('Bricolage Grotesque', 'normal'): [700, 800],
    ('Nunito Sans', 'italic'): [400, 500, 600, 700, 800],
    ('Nunito Sans', 'normal'): [400, 500, 600, 700, 800, 900],
    ('Fredoka', 'normal'): [400, 500, 600, 700],
    ('Caveat', 'normal'): [500, 700],
}

WEIGHT_NAMES = {100: 'Thin', 200: 'ExtraLight', 300: 'Light', 400: 'Regular', 500: 'Medium',
                600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold', 900: 'Black'}


def parse_css(path):
    """Return the @font-face blocks of the variable stylesheet, in file order."""
    css = open(path, encoding='utf8').read()
    blocks = []
    for m in re.finditer(r'/\*\s*([\w-]+)\s*\*/\s*@font-face\s*{([^}]*)}', css):
        subset, body = m.group(1), m.group(2)
        get = lambda k: (re.search(k + r'\s*:\s*([^;]+);', body) or [None, None])[1]
        blocks.append({
            'subset': subset,
            'family': get('font-family').strip().strip('\'"'),
            'style': get('font-style').strip(),
            'stretch': (get('font-stretch') or '').strip(),
            'display': (get('font-display') or 'swap').strip(),
            'src': re.search(r'url\(["\']?([^"\')]+)', body).group(1),
            'range': get('unicode-range').strip(),
        })
    return blocks


def style_names(family, weight, italic):
    wn = WEIGHT_NAMES[weight]
    typo_sub = ('Italic' if wn == 'Regular' else wn + ' Italic') if italic else wn   # "SemiBold Italic"
    ribbi = weight in (400, 700)
    fam1 = family if ribbi else f'{family} {wn}'                                     # name ID 1
    sub2 = ('Bold' if weight == 700 else 'Regular') if ribbi else 'Regular'
    if italic:
        sub2 = 'Italic' if sub2 == 'Regular' else 'Bold Italic'                       # name ID 2
    ps = family.replace(' ', '') + '-' + typo_sub.replace(' ', '')                    # name ID 6
    return fam1, sub2, f'{family} {typo_sub}', ps, typo_sub


def set_names(font, family, weight, italic, loc):
    fam1, sub2, full, ps, typo_sub = style_names(family, weight, italic)
    name = font['name']
    version = name.getDebugName(5) or 'Version 1.000'
    for nid in (1, 2, 3, 4, 6, 16, 17, 21, 22, 25):
        name.removeNames(nameID=nid)
    loc_s = ' '.join(f'{k}={v:g}' for k, v in sorted(loc.items()))
    for nid, s in ((1, fam1), (2, sub2), (3, f'{version.split(";")[0]};PBP-static;{ps};{loc_s}'),
                   (4, full), (6, ps), (16, family), (17, typo_sub)):
        name.setName(s, nid, 3, 1, 0x409)
    # Drop Macintosh-platform copies of the IDs just set, so no stale "Light"/"ExtraLight" remains.
    name.names = [r for r in name.names if not (r.platformID == 1 and r.nameID in (1, 2, 3, 4, 6, 16, 17))]
    os2 = font['OS/2']
    os2.usWeightClass = weight
    fs = os2.fsSelection & ~(1 | 32 | 64)
    bold = weight == 700
    fs |= (1 if italic else 0) | (32 if bold else 0) | (64 if not (italic or bold) else 0)
    os2.fsSelection = fs
    font['head'].macStyle = (1 if bold else 0) | (2 if italic else 0)
    return ps


def slug(family):
    return family.lower().replace(' ', '-')


def sha(path):
    return hashlib.sha256(open(path, 'rb').read()).hexdigest()[:16]


def main():
    blocks = parse_css(SRC_CSS)
    os.makedirs(OUT_DIR, exist_ok=True)
    # One source file per (family, style, subset); Caveat lists its files twice (500 and 700).
    sources = {}
    for b in blocks:
        sources.setdefault((b['family'], b['style']), {}).setdefault(b['subset'], b)
    manifest, css_out, made = [], [], set()
    css_out.append(
        "/* Brand fonts: STATIC instances, so PDFs embed TrueType instead of Type 3.\n"
        "   Generated by brand/fonts/make_static.py from the variable files listed in\n"
        "   fonts-variable.css (kept for reference; copy it over this file to go back).\n"
        "   Optical size is pinned: Nunito Sans opsz 12, Bricolage Grotesque opsz 96.\n"
        "   Faces: the weights the repo draws (brand/fonts/survey_usage.js). A weight not listed\n"
        "   here falls back to the nearest listed weight; add it in make_static.py instead.\n"
        "   Details and test results: ops/TESTS/fonts-static.md. */\n")
    for (family, style), weights in FACES.items():
        subs = sources[(family, style)]
        for w in weights:
            for subset, b in subs.items():
                src = os.path.join(HERE, b['src'])
                vf = TTFont(src)
                axes = {a.axisTag: a for a in vf['fvar'].axes}
                loc = {}
                for tag, a in axes.items():
                    if tag == 'wght':
                        if not a.minValue <= w <= a.maxValue:
                            sys.exit(f'{family} {w} outside wght axis {a.minValue}-{a.maxValue}')
                        loc[tag] = w
                    elif tag == 'opsz':
                        loc[tag] = OPSZ[family]
                    else:
                        loc[tag] = a.defaultValue
                inst = instancer.instantiateVariableFont(vf, loc, overlap=instancer.OverlapMode.REMOVE)
                for t in ('STAT',):
                    if t in inst:
                        del inst[t]
                ps = set_names(inst, family, w, style == 'italic', loc)
                opsz_tag = f"-opsz{OPSZ[family]}" if 'opsz' in axes else ''
                fn = f"{slug(family)}-{w}{'-italic' if style == 'italic' else ''}{opsz_tag}-{subset}.woff2"
                out = os.path.join(OUT_DIR, fn)
                inst.flavor = 'woff2'
                inst.save(out)
                made.add(fn)
                chk = TTFont(out)
                assert 'fvar' not in chk and 'gvar' not in chk, fn
                manifest.append({'file': 'static/' + fn, 'family': family, 'style': style, 'weight': w,
                                 'location': loc, 'postscript_name': ps, 'subset': subset,
                                 'unicode_range': b['range'], 'source': b['src'], 'source_sha256_16': sha(src),
                                 'glyphs': len(chk.getGlyphOrder()), 'bytes': os.path.getsize(out)})
                lines = [f"/* {subset} */", "@font-face {", f"  font-family: '{family}';",
                         f"  font-style: {style};", f"  font-weight: {w};"]
                if b['stretch']:
                    lines.append(f"  font-stretch: {b['stretch']};")
                lines += [f"  font-display: {b['display']};", f"  src: url(\"static/{fn}\") format('woff2');",
                          f"  unicode-range: {b['range']};", "}"]
                css_out.append('\n'.join(lines))
                print(f"{fn:52s} {ps:32s} {' '.join(f'{k}={v:g}' for k, v in loc.items()):18s} {os.path.getsize(out):7d} B")
    # Remove stale instances from an earlier FACES list.
    for f in os.listdir(OUT_DIR):
        if f.endswith('.woff2') and f not in made:
            os.remove(os.path.join(OUT_DIR, f))
            print('removed stale', f)
    open(OUT_CSS, 'w', encoding='utf8').write('\n'.join(css_out) + '\n')
    json.dump({'generator': 'brand/fonts/make_static.py', 'opsz_pins': OPSZ,
               'faces': {f'{k[0]}|{k[1]}': v for k, v in FACES.items()}, 'instances': manifest},
              open(os.path.join(OUT_DIR, 'instances.json'), 'w'), indent=1)
    print(f"{len(manifest)} instances, {sum(m['bytes'] for m in manifest) // 1024} KB; wrote fonts.css and static/instances.json")


if __name__ == '__main__':
    main()
