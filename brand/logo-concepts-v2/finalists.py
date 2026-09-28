"""Founder comparison board: brand/logo-concepts-v2/finalists.png (1600 x 1200).

    python3 finalists.py                       # judges' totals shown as a dash
    python3 finalists.py a=31 b=27 c=36 d=33   # with the judges' totals

Each concept as it was judged: its primary logo, its favicon in a browser tab at true 16 px (light and dark) and
enlarged, its one-line idea and the judges' total. Uses brand/logo/src/raster.js to render."""
import html, json, os, shutil, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
RASTER = os.path.join(HERE, '..', 'logo', 'src', 'raster.js')
WINNER = 'c'
CONCEPTS = [  # key, folder, name, one-line idea
    ('a', 'a-wordmark', 'A · The name is the logo',
     'Our name in plain lowercase letters: the dot on the i is a ball held up in the air, and the full stop is one small square pixel.'),
    ('b', 'b-play-object', 'B · Floor Time',
     'A grown-up and a little one on the floor, face to face, with a ball between them.'),
    ('c', 'c-badge', 'C · The Maker’s Seal',
     'A maker’s stamp, like the one on the bottom of a good wooden toy: our name around the edge and a spinning top in the middle.'),
    ('d', 'd-before-ball', 'D · The ball in “before”',
     'Our name written out in full, with a real ball as the o in “before”.'),
]


def main():
    totals = dict(a.split('=', 1) for a in sys.argv[1:] if '=' in a)
    tmp = os.path.join(HERE, '.finalists-tmp'); os.makedirs(tmp, exist_ok=True)
    jobs, cards = [], ''
    for key, folder, name, idea in CONCEPTS:
        fav = os.path.join('..', folder, 'favicon.svg')
        for theme, bg in (('light', '#FFFFFF'), ('dark', '#202124')):
            jobs.append(dict(svg=fav, png=f'{key}-{theme}.png', w=16, h=16, bg=bg, scheme=theme))
        win = key == WINNER
        total = html.escape(totals.get(key, '—'))
        cards += f'''<div class="card{' win' if win else ''}">
  <div class="head"><b>{html.escape(name)}</b>{'<span class="tag">Winner</span>' if win else ''}<span class="tot">Judges’ total: {total}</span></div>
  <p>{html.escape(idea)}</p>
  <div class="logo"><img class="pl" src="../{folder}/primary-logo.svg"><img class="sy" src="../{folder}/symbol.svg"></div>
  <div class="tabs">
    <div class="strip light"><div class="tab"><img src="{key}-light.png" width="16" height="16"><i></i></div></div>
    <div class="strip dark"><div class="tab"><img src="{key}-dark.png" width="16" height="16"><i></i></div></div>
    <img class="px" src="{key}-light.png" width="96" height="96"><img class="px" src="{key}-dark.png" width="96" height="96">
  </div></div>'''
    page = f'''<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../fonts/fonts.css">
<style>*{{box-sizing:border-box;margin:0}} body{{width:1600px;height:1200px;background:#F3F6FB;font-family:"Nunito Sans",sans-serif;color:#1D2940;padding:36px 44px}}
h1{{font-family:"Bricolage Grotesque";font-size:26px;font-weight:800}} .sub{{font-size:15px;color:#4A5468;margin:4px 0 20px}}
.grid{{display:grid;grid-template-columns:1fr 1fr;gap:24px}}
.card{{background:#fff;border-radius:16px;height:510px;padding:24px 28px;display:flex;flex-direction:column;border:3px solid transparent}}
.card.win{{border-color:#1D2940}}
.head{{display:flex;align-items:center;gap:12px;font-size:19px}} .tot{{margin-left:auto;font-size:15px;color:#4A5468;font-weight:700}}
.tag{{background:#1D2940;color:#fff;font-size:13px;font-weight:800;padding:3px 10px;border-radius:20px}}
.card p{{font-size:15px;line-height:1.4;color:#4A5468;margin-top:6px;min-height:42px}}
.logo{{flex:1;display:flex;align-items:center;justify-content:space-evenly;gap:24px;padding:10px 0}} .logo .pl{{max-width:470px;max-height:200px}} .logo .sy{{height:150px;max-width:150px}}
.tabs{{display:flex;align-items:center;gap:16px;border-top:1px solid #E3E7EF;padding-top:16px}}
.strip{{padding:8px 8px 0;border-radius:6px}} .strip.light{{background:#DEE1E6}} .strip.dark{{background:#202124}}
.tab{{width:140px;height:34px;border-radius:8px 8px 0 0;display:flex;align-items:center;gap:9px;padding:0 11px}}
.light .tab{{background:#fff}} .dark .tab{{background:#35363A}}
.tab i{{display:block;height:6px;width:80px;border-radius:3px;background:#C4C8CE}} .dark .tab i{{background:#5F6368}}
.px{{image-rendering:pixelated;border:1px solid #E3E7EF}}</style></head>
<body><h1>Play Before Pixels · logo finalists</h1>
<p class="sub">Each concept as judged: its primary logo and, on the right, its symbol. Bottom of each card: its browser-tab icon at true 16 px in a light and a dark tab, then the same 16 px enlarged.</p>
<div class="grid">{cards}</div></body></html>'''
    with open(os.path.join(tmp, 'board.html'), 'w') as fh:
        fh.write(page)
    jobs.append(dict(html='board.html', png='../finalists.png', w=1600, h=1200))
    with open(os.path.join(tmp, 'jobs.json'), 'w') as fh:
        json.dump(jobs, fh)
    subprocess.run(['node', RASTER, os.path.join(tmp, 'jobs.json')], check=True)
    shutil.rmtree(tmp)
    print('wrote finalists.png')


if __name__ == '__main__':
    main()
