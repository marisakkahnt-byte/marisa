"""Three gem 'M' options: rhinestone script, cut-gem serif, pavé serif."""
import sys, random, math
import numpy as np
from PIL import Image
sys.path.insert(0, '/home/user/marisa/stickers/whimsy')
sys.path.insert(0, '/home/user/marisa/stitches/sparkle')
from rhinestone import thin, build as rhinestone_build
from gems import gem

D = '/home/user/marisa/stitches/gemM/'

def poisson(pts, rfun, R, gap=1.0):
    placed, grid = [], {}
    for (x, y) in pts:
        r = rfun()
        gx, gy = int(x // 40), int(y // 40)
        ok = True
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for (px, py, pr) in grid.get((gx + dx, gy + dy), []):
                    if (px - x) ** 2 + (py - y) ** 2 < (pr + r + gap) ** 2:
                        ok = False; break
                if not ok: break
            if not ok: break
        if ok:
            placed.append((x, y, r)); grid.setdefault((gx, gy), []).append((x, y, r))
    return placed

# A — rhinestone script M (reuses the card pipeline)
rhinestone_build(D + 'mask_script.png', D + 'M_A_rhinestone-script.svg', seed=8)

# B — serif M traced with real cut gems along the strokes
R = random.Random(4)
m = np.array(Image.open(D + 'mask_serif.png').convert('L')) < 128
H, W = m.shape
sk = thin(m)
ys, xs = np.nonzero(sk)
pts = list(zip(xs.tolist(), ys.tolist())); R.shuffle(pts)
placed = poisson(pts, lambda: R.choice([30, 34]), R, gap=-4)
fill = poisson([p for p in pts], lambda: R.choice([14, 17]), R, gap=-3)
import itertools
def free(x,y,r):
    return all((px-x)**2+(py-y)**2 >= (pr+r-6)**2 for px,py,pr in placed)
placed += [f for f in fill if free(*f)]
shapes = ['round', 'oval', 'round', 'pear', 'emerald', 'marq', 'heart']
colors = ['em', 'dia', 'rose', 'em', 'dia', 'sap', 'cit', 'ame']
html = [f'<!doctype html><html><body style="margin:0;background:transparent"><div id="m" style="position:relative;width:{W}px;height:{H}px">']
for (x, y, r) in placed:
    s = int(r * 2.3)
    html.append(gem(R.choice(shapes), R.choice(colors), s, int(x - s / 2), int(y - s / 2), R.randint(-40, 40)))
html.append('</div></body></html>')
open(D + 'M_B_cutgem.html', 'w').write(''.join(html))

# gold mask image (letter in brushed gold, transparent elsewhere)
gold = np.zeros((H, W, 4), np.uint8)
gold[m] = (176, 138, 70, 255)
Image.fromarray(gold, 'RGBA').save(D + 'mask_serif_gold.png')
# C — pavé serif M: the whole letter filled with tiny crystals, emerald accents
R = random.Random(9)
yy, xx = np.nonzero(m)
pts = list(zip(xx[::3].tolist(), yy[::3].tolist())); R.shuffle(pts)
placed = poisson(pts, lambda: R.choice([7, 8, 9, 10]), R, gap=0.6)
out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}"><defs>'
       '<radialGradient id="d" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#DCE4EE"/><stop offset="1" stop-color="#7E8A9A"/></radialGradient>'
       '<radialGradient id="e" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#9FF0C6"/><stop offset=".5" stop-color="#13A05A"/><stop offset="1" stop-color="#05502A"/></radialGradient>'
       '<radialGradient id="g" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#FFF4D0"/><stop offset=".55" stop-color="#D9B56A"/><stop offset="1" stop-color="#8A6424"/></radialGradient>'
       '<filter id="s"><feDropShadow dx="0" dy="1" stdDeviation=".8" flood-opacity=".3"/></filter></defs>'
       # gold setting underneath so gaps read as metal, like real pavé
       'GOLDIMG<g filter="url(#s)">']
for (x, y, r) in placed:
    f = 'e' if R.random() < .14 else 'd'
    out.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="url(#{f})"/><path d="M{x} {y-r*.55} L{x+r*.55} {y} L{x} {y+r*.55} L{x-r*.55} {y}Z" fill="#fff" opacity=".35"/><circle cx="{x-r*.35:.1f}" cy="{y-r*.4:.1f}" r="{r*.22:.1f}" fill="#fff"/>')
out.append('</g></svg>')

import base64, io
buf = io.BytesIO(); Image.open(D + 'mask_serif_gold.png').save(buf, 'PNG')
gi = f'<image href="data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}" width="{W}" height="{H}"/>'
open(D + 'M_C_pave.svg', 'w').write(''.join(out).replace('GOLDIMG', gi))
print('ok', W, H)
