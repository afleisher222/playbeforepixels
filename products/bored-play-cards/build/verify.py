#!/usr/bin/env python3
"""Written QA for the shipped PDFs (customer-voice rule 21 / CUSTOMER-VOICE rule 47). Run from the product folder.
Checks every shipped PDF for: size <= 15 MB, page size, version footer and copyright on every page,
no URL / short link / QR target text in Etsy files, no banned words, fillable fields only in color files,
and fills one field of each kind to prove the form works."""
import sys, os, re, glob
import fitz  # PyMuPDF

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
os.chdir(ROOT)
STORE = ['START-HERE.pdf', 'bored-play-cards.pdf', 'bored-play-cards-A4.pdf', 'bored-play-cards-low-ink.pdf', 'bored-play-cards-low-ink-A4.pdf']
STORE += [f.replace('START-HERE', 'START-HERE-ages-1-5').replace('bored-play-cards', 'bored-play-cards-ages-1-5') for f in STORE]  # Ages 1-5 edition (G0)
ETSY = sorted(glob.glob('etsy-upload/*'))
ETSY0 = sorted(glob.glob('etsy-upload-ages-1-5/*'))
BANNED = r'\b(therapy|therapist|autis\w*|adhd|clinically|cure[sd]?|heal(s|ing)?|reverse[sd]?|speech|slp|diagnos\w*|delay|late talker|catch up|rewir\w*|damage|addict\w*|toxic|zombie|safety-checked|certified|safe for all ages|canva|adobe|acrobat)\b'
fail = []

def check(path, etsy):
    d = fitz.open(path)
    mb = os.path.getsize(path) / 1048576
    if mb > 15: fail.append(f'{path}: {mb:.1f} MB')
    start = 'START' in path
    a4 = 'A4' in path
    w, h = (595.3, 841.9) if a4 else (612, 792)
    widgets = 0
    for i, p in enumerate(d):
        r = p.rect
        if abs(r.width - w) > 2 or abs(r.height - h) > 2: fail.append(f'{path} p{i+1}: page size {r.width:.0f}x{r.height:.0f}')
        t = p.get_text()
        flat = re.sub(r'\s+', ' ', t)
        if 'version 1.0' not in flat.lower(): fail.append(f'{path} p{i+1}: no version footer')
        if 'alphaplay llc' not in flat.lower(): fail.append(f'{path} p{i+1}: no copyright line')
        if etsy and re.search(r'playbeforepixels\.com|https?://|www\.|/bonus|/help', flat, re.I): fail.append(f'{path} p{i+1}: URL text in Etsy edition')
        if etsy and p.get_links(): fail.append(f'{path} p{i+1}: link annotation in Etsy edition')
        for m in re.finditer(BANNED, flat, re.I):
            fail.append(f'{path} p{i+1}: banned word "{m.group(0)}" :: …{flat[max(0,m.start()-40):m.end()+40]}…')
        widgets += len(list(p.widgets()))
    low = 'low-ink' in path.lower() or 'Low-Ink' in path
    if not start and not low and widgets < (150 if 'ages-1-5' in path else 300): fail.append(f'{path}: only {widgets} fillable fields')
    if (start or low) and widgets: fail.append(f'{path}: {widgets} fields in a non-fillable file')
    print(f'{path:44s} {d.page_count:3d} pages {mb:5.1f} MB {widgets:4d} fields')
    return d

for f in STORE: check(f, False)
for folder, files in (('etsy-upload', ETSY), ('etsy-upload-ages-1-5', ETSY0)):
    if len(files) != 5: fail.append(f'{folder} has {len(files)} files, expected 5')
    for f in files: check(f, True)
for z in glob.glob('**/*.zip', recursive=True):
    if 'node_modules' not in z: fail.append(f'zip found: {z}')

# form test: type into a blank card title, a multi-line field and tick an energy circle, then read them back
d = fitz.open('bored-play-cards.pdf')
done = set()
for p in d:
    for wdg in p.widgets():
        kind = 'tick' if wdg.field_type == fitz.PDF_WIDGET_TYPE_CHECKBOX else ('ml' if wdg.field_flags & 4096 else 'line')
        if kind in done: continue
        if kind == 'tick': wdg.field_value = wdg.on_state()
        else: wdg.field_value = 'Blanket fort picnic' if kind == 'line' else 'Two chairs, a sheet, three books'
        wdg.update(); done.add(kind)
    if len(done) == 3: break
tmp = '/tmp/_bored_formtest.pdf'
d.save(tmp)
vals = [w.field_value for p in fitz.open(tmp) for w in p.widgets() if w.field_value not in ('', 'Off', None, False)]
if len(vals) < 3: fail.append(f'form test: only {len(vals)} values read back')
else: print('form test ok:', vals[:3])

print('\nFAIL' if fail else '\nALL CHECKS PASSED')
for x in fail[:60]: print(' -', x)
sys.exit(1 if fail else 0)
