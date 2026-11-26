"""Prize-ribbon rosettes + maker-mood posts (1080x1350) for Marisa Stitches."""
import math, random

def rosette(id_, main, light, dark, center_bg, center_ink, line1, line2, small, size=760):
    R = random.Random(id_)
    n = 40
    out = [f'<svg viewBox="-260 -260 520 640" width="{size}" height="{size*640/520:.0f}" style="overflow:visible">',
           f'<defs><radialGradient id="c{id_}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".3" stop-color="{center_bg}"/><stop offset="1" stop-color="{center_bg}"/></radialGradient>'
           f'<linearGradient id="t{id_}" x1="0" x2="1"><stop offset="0" stop-color="{dark}"/><stop offset=".45" stop-color="{light}"/><stop offset=".6" stop-color="{main}"/><stop offset="1" stop-color="{dark}"/></linearGradient>'
           f'<filter id="s{id_}"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-opacity=".25"/></filter></defs><g filter="url(#s{id_})">']
    # tails
    for sgn, rot in ((-1, 14), (1, -14)):
        out.append(f'<g transform="rotate({rot} 0 120)"><path d="M{-52 + sgn*40} 120 L{52 + sgn*40} 120 L{52 + sgn*40} 370 L{sgn*40} 330 L{-52 + sgn*40} 370 Z" fill="url(#t{id_})"/>'
                   f'<path d="M{-30 + sgn*40} 130 L{-30 + sgn*40} 350" stroke="#fff" stroke-opacity=".25" stroke-width="10"/></g>')
    # outer pleats
    for ring, (r0, r1, k) in enumerate(((120, 225, 1.0), (105, 175, .82))):
        for i in range(n):
            a0 = 2 * math.pi * i / n; a1 = 2 * math.pi * (i + 1) / n; am = (a0 + a1) / 2
            p = lambda r, a: f'{r*math.cos(a):.1f},{r*math.sin(a):.1f}'
            col = [light, main, dark][i % 3] if ring == 0 else [main, light][i % 2]
            out.append(f'<polygon points="{p(r0,a0)} {p(r1,a0+.01)} {p(r1*1.04,am)} {p(r1,a1-.01)} {p(r0,a1)}" fill="{col}"/>')
            out.append(f'<line x1="{r0*math.cos(am):.1f}" y1="{r0*math.sin(am):.1f}" x2="{r1*math.cos(am):.1f}" y2="{r1*math.sin(am):.1f}" stroke="#fff" stroke-opacity=".22" stroke-width="2"/>')
    # center
    out.append(f'<circle r="112" fill="{dark}"/><circle r="104" fill="url(#c{id_})"/><circle r="94" fill="none" stroke="{center_ink}" stroke-opacity=".35" stroke-width="1.5" stroke-dasharray="3 5"/>')
    out.append(f'<text y="{-30 if small else -8}" text-anchor="middle" font-family="DM Sans" font-weight="600" font-size="13" letter-spacing="4" fill="{center_ink}">{small}</text>' if small else '')
    out.append(f'<text y="{20 if small else 14}" text-anchor="middle" font-family="DM Serif Display" font-size="{46 if len(line1) < 9 else 38}" fill="{center_ink}">{line1}</text>')
    if line2:
        out.append(f'<text y="{62 if small else 58}" text-anchor="middle" font-family="DM Serif Display" font-style="italic" font-size="{40 if len(line2) < 9 else 32}" fill="{center_ink}">{line2}</text>')
    # gold stars on the ruffle
    for i in range(5):
        a = R.uniform(0, 2 * math.pi); r = R.uniform(150, 210)
        out.append(f'<text x="{r*math.cos(a):.0f}" y="{r*math.sin(a):.0f}" font-size="{R.randint(22,34)}" fill="#E8CC86" stroke="#9c7a35" stroke-width=".8" text-anchor="middle">★</text>')
    out.append('</g></svg>')
    return ''.join(out)

ROS = [
    ('gem', '#0E4A38', '#2E8F6A', '#07291F', '#F6D4E0', '#0E4A38', "she’s", 'a gem', 'BEST IN SHOW'),
    ('diva', '#E59BB7', '#F6D4E0', '#B4587E', '#FBF9F6', '#0E4A38', 'certified', 'diva', 'FIRST PLACE'),
    ('rain', '#B8914A', '#E2C27E', '#7A5A22', '#1F1D24', '#F6D4E0', 'rainy day,', 'best day', '✦ AWARDED TO ✦'),
]
STAR = lambda x, y, s: f'<div style="position:absolute;left:{x}px;top:{y}px;font-size:{s}px;color:#C9A55C">★</div>'

MOOD = [
    ('mood-1_one-more', '../work/setup.jpg', 'me at 11pm:', '“okay just one more monogram”', '50% 60%'),
    ('mood-2_finale', '../work/ag.jpg', 'me watching the machine stitch', 'like it’s a season finale', '50% 45%'),
    ('mood-3_first-try', '../work/waffle.jpg', 'when it comes out perfect', 'on the first try (diva behavior)', '50% 45%'),
]

html = ['''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@500;600&display=swap" rel="stylesheet">
<style>body{margin:0;display:flex;flex-wrap:wrap;gap:30px;padding:30px;background:#999;width:3400px}
.p{position:relative;width:1080px;height:1350px;overflow:hidden;font-family:'DM Sans'}
.mark{position:absolute;bottom:50px;left:50%;transform:translateX(-50%);width:150px}
.r{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%)}
</style></head><body>''']
for i, (id_, *args) in enumerate(ROS):
    bg = ['#F4EFE7', '#0E4A38', '#F6D4E0'][i]
    stars = ''.join(STAR(x, y, s) for x, y, s in [(110, 140, 40), (900, 220, 30), (160, 1040, 34), (880, 980, 44), (520, 90, 26), (70, 600, 24), (980, 620, 28)])
    mark = '../../stickers/MarisaStitches_Logo_cream_transparent.png' if i == 1 else '../../brand/logo-ink.png'
    html.append(f'<div class="p" data-n="ROS_{id_}" style="background:{bg}">{stars}<div class="r">{rosette(id_, *args)}</div><img class="mark" src="{mark}"></div>')
for n, img, l1, l2, pos in MOOD:
    html.append(f'''<div class="p" data-n="{n}" style="background:#F4EFE7">
<div style="position:absolute;left:0;right:0;top:0;height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 70px">
<div style="font:600 40px 'DM Sans';color:#0E4A38;letter-spacing:-.01em">{l1}</div>
<div style="font:400 72px/1.02 'DM Serif Display';color:#1F1D24;letter-spacing:-.02em;margin-top:10px"><i>{l2}</i></div></div>
<div style="position:absolute;left:50px;right:50px;top:360px;bottom:120px;border-radius:28px;overflow:hidden;box-shadow:0 0 0 10px #fff,0 14px 30px rgba(0,0,0,.18)">
<img src="{img}" style="width:100%;height:100%;object-fit:cover;object-position:{pos}"></div>
<img src="../../stickers/gem-emerald.png" style="position:absolute;width:70px;right:30px;top:320px;rotate:12deg;filter:drop-shadow(0 4px 4px rgba(0,0,0,.3))">
<div style="position:absolute;left:44px;top:318px;font-size:44px;color:#fff;text-shadow:0 0 10px #fff,0 0 3px #B8914A">✦</div>
<img src="../../brand/logo-ink.png" style="position:absolute;bottom:26px;left:50%;transform:translateX(-50%);width:120px"></div>''')
html.append('</body></html>')
open('/home/user/marisa/stitches/diva/posts.html', 'w').write(''.join(html))
print('ok')
