"""Stitches story/highlight covers: one realistic gem each, on black velvet."""
from realgem import brilliant, emerald_cut

COVERS = [
    ('about',       lambda s: brilliant('heart', 'pink', s, seed=3)),
    ('the-work',    lambda s: emerald_cut('emerald', s, seed=5)),
    ('needlepoint', lambda s: brilliant('oval', 'sapphire', s, seed=7)),
    ('gems',        lambda s: brilliant('round', 'diamond', s, seed=11)),
    ('diva',        lambda s: brilliant('pear', 'ruby', s, seed=13)),
    ('packaging',   lambda s: brilliant('marquise', 'amethyst', s, seed=17)),
    ('kind-words', lambda s: brilliant('round', 'citrine', s, seed=19)),
    ('shop',        lambda s: emerald_cut('aqua', s, seed=23)),
]
html = ['''<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;display:flex;flex-wrap:wrap;gap:20px;width:9000px;background:#777}
.c{position:relative;width:1080px;height:1920px;display:flex;align-items:center;justify-content:center;overflow:hidden;
 background:radial-gradient(circle at 50% 46%,#2b2830 0%,#1a181e 38%,#0e0d11 80%)}
.ring{position:absolute;left:50%;top:50%;width:820px;height:820px;margin:-410px;border-radius:50%;border:3px solid #B8914A;opacity:.45}
.tw{position:absolute;color:#fff;text-shadow:0 0 14px #fff,0 0 4px #B8914A}</style></head><body>''']
for n, fn in COVERS:
    html.append(f'<div class="c" data-n="ST2_{n}"><div class="ring"></div><div style="position:relative">{fn(560)}</div>'
                f'<span class="tw" style="left:250px;top:640px;font-size:46px">✦</span><span class="tw" style="right:250px;bottom:660px;font-size:30px">✦</span></div>')
html.append('</body></html>')
open('/home/user/marisa/stitches/realgems/covers.html', 'w').write(''.join(html))
print('ok')
