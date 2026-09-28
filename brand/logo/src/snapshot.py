"""Dated process sheets for the founder's authorship record. Never overwrites an existing sheet.

    python3 snapshot.py                 # brand/logo/process/YYYY-MM-DD_HHMM_snapshot.png: the kit as it is now
                                        # (seal, small seal, lockup, favicon at 16 and 32 px, the last EDIT_LOG line)
    python3 snapshot.py --rejected      # brand/logo/process/YYYY-MM-DD_rejected-options.png: every option that
                                        # was considered and not chosen, beside the current kit

Run it after each edit you make, so every version you tried is on record with its date (add the sheet to the
same commit as the edit, and note it in legal/protection/creation-records-log.md)."""
import datetime, html, json, os, shutil, subprocess, sys
import build as B

LOGO = B.OUT
BRAND = os.path.dirname(LOGO)
V2 = os.path.join(BRAND, 'logo-concepts-v2')
PROC = os.path.join(LOGO, 'process')

REJECTED = [  # (label, logo file, favicon file, what happened)
    ('Logo v1 "The Return"', 'logo-archive/v1-the-return/mark.svg', 'logo-archive/v1-the-return/favicon.svg',
     'Rejected by the founder, Sept 28, 2026: it read as the letter r.'),
    ('Concept A: the name is the logo', 'logo-concepts-v2/a-wordmark/primary-logo.svg', 'logo-concepts-v2/a-wordmark/favicon.svg',
     'Not chosen by the review panel, Sept 28, 2026.'),
    ('Concept B: Floor Time', 'logo-concepts-v2/b-play-object/primary-logo.svg', 'logo-concepts-v2/b-play-object/favicon.svg',
     'Not chosen: reads as a letter and as a UI icon. Kept for illustrations only.'),
    ('Concept D: the ball in "before"', 'logo-concepts-v2/d-before-ball/primary-logo.svg', 'logo-concepts-v2/d-before-ball/favicon.svg',
     'Not chosen by the review panel, Sept 28, 2026.'),
    ('Concept C as judged', 'logo-concepts-v2/c-badge/symbol.svg', 'logo-concepts-v2/c-badge/favicon.svg',
     'Chosen, then corrected: rounded peg left a grey half-pixel smudge at 16 px; pin, gem and cone readings.'),
]


def render(rows, title, out):
    tmp = os.path.join(PROC, '.tmp'); os.makedirs(tmp, exist_ok=True)
    jobs = []
    for i, (_, logo, fav, _) in enumerate(rows):
        for px in (16, 32):
            jobs.append(dict(svg=os.path.relpath(os.path.join(BRAND, fav), tmp), png=f'f{i}-{px}.png', w=px, h=px,
                             bg='#FFFFFF', scheme='light'))
    cells = ''
    for i, (label, logo, fav, note) in enumerate(rows):
        src = os.path.relpath(os.path.join(BRAND, logo), tmp)
        cells += f'''<div class="row"><div class="t"><b>{html.escape(label)}</b><span>{html.escape(note)}</span></div>
  <div class="logo"><img src="{src}"></div>
  <div class="fav"><img class="px" src="f{i}-16.png" width="96" height="96"><img src="f{i}-16.png" width="16" height="16">
  <img src="f{i}-32.png" width="32" height="32"></div></div>'''
    h = 150 + 150 * len(rows)
    page = f'''<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="{os.path.relpath(os.path.join(BRAND, 'fonts', 'fonts.css'), tmp)}">
<style>*{{box-sizing:border-box;margin:0}} body{{width:1600px;height:{h}px;background:#fff;font-family:"Nunito Sans",sans-serif;color:#1D2940;padding:36px 48px}}
h1{{font-family:"Bricolage Grotesque";font-size:26px;font-weight:800}} p.d{{font-size:15px;color:#4A5468;margin:4px 0 18px}}
.row{{display:grid;grid-template-columns:520px 1fr 260px;align-items:center;height:150px;border-top:1px solid #E3E7EF;gap:24px}}
.t b{{display:block;font-size:17px}} .t span{{display:block;font-size:14px;color:#4A5468;margin-top:4px;line-height:1.35}}
.logo img{{max-height:118px;max-width:640px;display:block}} .fav{{display:flex;gap:18px;align-items:center}} .px{{image-rendering:pixelated;border:1px solid #E3E7EF}}</style></head>
<body><h1>{html.escape(title)}</h1><p class="d">Logo process record · {datetime.date.today():%B %-d, %Y} · favicon at 16 px enlarged, then true size 16 and 32 px</p>{cells}</body></html>'''
    with open(os.path.join(tmp, 'sheet.html'), 'w') as fh:
        fh.write(page)
    jobs.append(dict(html='sheet.html', png=os.path.relpath(out, tmp), w=1600, h=h))
    with open(os.path.join(tmp, 'jobs.json'), 'w') as fh:
        json.dump(jobs, fh)
    subprocess.run(['node', os.path.join(B.HERE, 'raster.js'), os.path.join(tmp, 'jobs.json')], check=True)
    shutil.rmtree(tmp)
    print('wrote', os.path.relpath(out, BRAND))


def main():
    os.makedirs(PROC, exist_ok=True)
    today = datetime.date.today().isoformat()
    last = B.EDIT_LOG[-1]
    current = ('Kit v2 as built now', 'logo/mark.svg', 'logo/favicon.svg',
               f'Last edit {last[0]} ({last[1]}). ' + ('Adopted.' if B.ADOPTED else 'Draft, not adopted.'))
    if sys.argv[1:] == ['--rejected']:
        out = os.path.join(PROC, f'{today}_rejected-options.png')
        rows = REJECTED + [current]
        title = 'Options considered and not chosen'
    else:
        out = os.path.join(PROC, f'{today}_{datetime.datetime.now():%H%M}_snapshot.png')
        rows = [current, ('Small seal and lockup', 'logo/lockup-horizontal.svg', 'logo/favicon.svg', '')]
        title = 'Snapshot of the kit'
    if os.path.exists(out):
        sys.exit(f'{os.path.relpath(out, BRAND)} already exists: a dated record is never overwritten.')
    render(rows, title, out)


if __name__ == '__main__':
    main()
