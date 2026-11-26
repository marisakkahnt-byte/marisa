"""Whimsy keepsake cards: rhinestone script + gem/pearl scatter frame."""
import sys, random
sys.path.insert(0, '/home/user/marisa/stitches/sparkle')
from gems import gem

R = random.Random(11)
SH = ['round', 'oval', 'pear', 'heart', 'emerald', 'star', 'marq']
CO = ['rose', 'em', 'dia', 'sap', 'ame', 'cit', 'rose', 'em', 'dia']

def pearl(size, x, y):
    return (f'<div style="position:absolute;left:{x}px;top:{y}px;width:{size}px;height:{size}px;border-radius:50%;'
            f'background:radial-gradient(circle at 35% 30%,#fff 0 18%,#F5EEE6 45%,#C9BEB2 100%);'
            f'box-shadow:0 {size//10}px {size//6}px rgba(0,0,0,.2)"></div>')

def twinkle(size, x, y):
    return f'<div style="position:absolute;left:{x}px;top:{y}px;font-size:{size}px;line-height:1;color:#fff;text-shadow:0 0 10px #fff,0 0 2px #B8914A,0 2px 0 #B8914A">✦</div>'

def frame(W, H, inset, n=46):
    """Scatter gems/pearls in the border band around an inner panel."""
    out, boxes = [], []
    tries = 0
    while len(out) < n and tries < 5000:
        tries += 1
        s = R.choice([70, 85, 100, 120, 140, 170])
        x, y = R.uniform(-20, W - s + 20), R.uniform(-20, H - s + 20)
        cx, cy = x + s / 2, y + s / 2
        m = s * .3  # gems may overlap the panel edge a little, never the middle
        if x + s - m > 210 and x + m < W - 210 and y + s - m > 300 and y + m < H - 300:
            continue
        if any(abs(cx - bx) < (s + bs) / 2 * .9 and abs(cy - by) < (s + bs) / 2 * .9 for bx, by, bs in boxes):
            continue
        boxes.append((cx, cy, s))
        k = R.random()
        if k < .16:
            out.append(pearl(int(s * .55), int(x + s * .2), int(y + s * .2)))
        elif k < .24:
            out.append(twinkle(int(s * .7), int(x), int(y)))
        else:
            out.append(gem(R.choice(SH), R.choice(CO), s, int(x), int(y), R.randint(-25, 25)))
    return ''.join(out)

W, H = 1200, 1800
html = f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@600&display=swap" rel="stylesheet">
<style>body{{margin:0;display:flex;gap:40px;padding:40px;background:#ccc;width:2600px}}
.c{{position:relative;width:{W}px;height:{H}px;overflow:hidden;font-family:'DM Sans'}}
.caps{{font:600 26px 'DM Sans';letter-spacing:.34em;text-transform:uppercase}}
.linen{{background:repeating-linear-gradient(0deg,rgba(255,255,255,.18) 0 2px,transparent 2px 5px),repeating-linear-gradient(90deg,rgba(0,0,0,.035) 0 1px,transparent 1px 4px)}}</style></head><body>

<div class="c" data-n="card-07_rhinestone-shes-a-gem" style="background:#F4EFE7">
 {twinkle(70,170,230)}{twinkle(46,960,330)}{twinkle(54,900,1330)}{twinkle(40,230,1260)}
 <img src="rs_gem.svg" style="position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);width:1000px">
 <div class="caps" style="position:absolute;top:1480px;width:100%;text-align:center;color:#0E4A38">(and so are you)</div>
 <img src="../logo-ink.png" style="position:absolute;bottom:80px;left:50%;transform:translateX(-50%);width:200px">
</div>

<div class="c" data-n="card-08_gem-frame-stay-sparkly" style="background:#EEEAE4">
 <div class="linen" style="position:absolute;left:210px;top:300px;right:210px;bottom:300px;background-color:#F6D4E0;border-radius:6px"></div>
 <img src="rs_sparkly.svg" style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:680px">
 <img src="../logo-ink.png" style="position:absolute;left:50%;top:1290px;transform:translateX(-50%);width:170px">
 {frame(W, H, 360)}
</div>
</body></html>'''
open('/home/user/marisa/stickers/whimsy/whimsy.html', 'w').write(html)
print('ok')
