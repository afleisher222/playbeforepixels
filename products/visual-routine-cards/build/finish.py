# Post-process PDFs: add fillable AcroForm fields, bookmarks and metadata.
# python3 finish.py <in.pdf> <out.pdf> [--fields f.json] [--toc toc.json] [--title T]
import sys, json, argparse
import pymupdf as fitz
ap = argparse.ArgumentParser()
ap.add_argument('inp'); ap.add_argument('out')
ap.add_argument('--fields'); ap.add_argument('--toc'); ap.add_argument('--title', default='')
a = ap.parse_args()
doc = fitz.open(a.inp)
def rgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i+2], 16) / 255 for i in (0, 2, 4))
if a.fields:
    fields = json.load(open(a.fields))
    for f in fields:
        page = doc[f['page']]
        r = fitz.Rect(f['x0'], f['y0'], f['x1'], f['y1'])
        w = fitz.Widget()
        w.field_name = f['name']
        if f['type'] == 'check':
            inset = r.width * 0.2
            w.rect = fitz.Rect(r.x0 + inset, r.y0 + inset, r.x1 - inset, r.y1 - inset)
            w.field_type = fitz.PDF_WIDGET_TYPE_CHECKBOX
            w.border_width = 0
            w.text_color = rgb('#1D2940')
            w.field_value = False
        else:
            w.rect = r
            w.field_type = fitz.PDF_WIDGET_TYPE_TEXT
            w.text_font = 'HeBo'
            w.text_fontsize = f['size'] or 0
            w.text_color = rgb(f['color'])
            w.border_width = 0
            w.field_value = f['def']
            w.text_maxlen = 0
        wa = page.add_widget(w)
        if f['type'] != 'check':
            doc.xref_set_key(wa.xref, 'Q', str(f['align']))
            wa.update()
    print(len(fields), 'fields added')
if a.toc:
    toc = json.load(open(a.toc))
    doc.set_toc([[1, t, p] for t, p in toc])
doc.set_metadata({'title': a.title, 'author': 'Play Before Pixels (AlphaPlay LLC)', 'subject': 'Printable visual routine cards and charts for ages 0-5 and 5-12',
                  'keywords': 'visual routine cards, routine chart, morning routine, bedtime routine, first then board', 'creator': 'Play Before Pixels', 'producer': 'Play Before Pixels'})
doc.save(a.out, garbage=3, deflate=True)
print('saved', a.out, doc.page_count, 'pages')
