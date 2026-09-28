# Adds fillable AcroForm fields (free Adobe Acrobat Reader), bookmarks and metadata to a rendered PDF.
#   python3 finish.py <in.pdf> <out.pdf> --fields f.json --toc toc.json --title T
import json, argparse
import pymupdf as fitz
ap = argparse.ArgumentParser(); ap.add_argument('inp'); ap.add_argument('out')
ap.add_argument('--fields'); ap.add_argument('--toc'); ap.add_argument('--title', default='')
a = ap.parse_args()
doc = fitz.open(a.inp)
INK = (0x1D / 255, 0x29 / 255, 0x40 / 255)
n = 0
if a.fields:
    for f in json.load(open(a.fields)):
        page = doc[f['page']]
        r = fitz.Rect(f['x0'], f['y0'], f['x1'], f['y1'])
        w = fitz.Widget(); w.field_name = f['name']; w.border_width = 0; w.text_color = INK
        if f['type'] == 'check':
            w.rect = fitz.Rect(r.x0 + 1.5, r.y0 + 1.5, r.x1 - 1.5, r.y1 - 1.5)
            w.field_type = fitz.PDF_WIDGET_TYPE_CHECKBOX; w.field_value = False
        else:
            w.rect = r; w.field_type = fitz.PDF_WIDGET_TYPE_TEXT
            w.text_font = 'Helv'; w.text_fontsize = f['size'] or 0; w.field_value = ''
            if f['multi']: w.field_flags |= fitz.PDF_TX_FIELD_IS_MULTILINE
        wa = page.add_widget(w)
        if f['type'] != 'check' and f['align']:
            doc.xref_set_key(wa.xref, 'Q', str(f['align'])); wa.update()
        n += 1
if a.toc:
    doc.set_toc([[1, t, p] for t, p in json.load(open(a.toc))])
doc.set_metadata({'title': a.title, 'author': 'Play Before Pixels (AlphaPlay LLC)',
                  'subject': 'First Phone Agreement Kit, ages 9-12: readiness checklist, practice missions, fillable first phone agreement, phone-free zones and times, zone signs, fridge-door tech plan, 30 phone-free afternoons challenge',
                  'keywords': 'first phone agreement, kids phone agreement, phone-free afternoons, tech plan, printable, fillable, ages 9-12',
                  'creator': 'Play Before Pixels', 'producer': 'Play Before Pixels'})
doc.save(a.out, garbage=3, deflate=True)
print(f'{a.out.split("/")[-1]}: {doc.page_count} pages, {n} fields')
