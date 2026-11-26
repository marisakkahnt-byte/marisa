"""'how a stitch gets made' story set (5 x 1080x1920) for @marisastitches → highlight 'the work'.
Cool-girl collage style, her real photos (shown in a frame, no faces involved)."""
import ast, sys, random, math
sys.path.insert(0, '/home/user/marisa/stitches/realgems')
from realgem import brilliant as B, emerald_cut as E
src = open('/home/user/marisa/stickers/cool/cool.py').read()
mod = ast.parse(src)
keep = [n for n in mod.body if (isinstance(n, ast.FunctionDef) and n.name in ('gem_html', 'pearl', 'button', 'star', 'twinkle', 'scatter'))
        or (isinstance(n, ast.Assign) and any(getattr(t, 'id', '') in ('SHAPES', 'GEMS', '_seed') for t in n.targets))]
ns = {'random': random, 'math': math, 'B': B, 'E': E}
exec(compile(ast.Module(body=keep, type_ignores=[]), 'cool', 'exec'), ns)
scatter = ns['scatter']

W, H = 1080, 1920
P = '../work/'
SLIDES = [
    ('1', None, 'how a stitch<br>gets made', 'a little peek behind the hoop ✦', None),
    ('2', 'setup.jpg', 'step 1:<br>pick the letters', 'font, size, thread color. this part is a whole vibe.', '50% 40%'),
    ('3', 'hc.jpg', 'step 2:<br>hoop it', 'the fabric gets hooped tight so nothing shifts.', '50% 50%'),
    ('4', 'ag.jpg', 'step 3:<br>the stitch-out', 'the machine does its thing. i watch like it’s a season finale.', '50% 45%'),
    ('5', 'waffle.jpg', 'step 4:<br>made to be kept', 'trim, press, done. tomorrow’s heirloom ✦', '50% 45%'),
]
html = ['''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@600;800&display=swap" rel="stylesheet">
<style>body{margin:0;display:flex;flex-wrap:wrap;gap:30px;padding:30px;width:6000px;background:#999}
.s{position:relative;width:1080px;height:1920px;overflow:hidden;background:#F2EEE7;font-family:'DM Sans'}
.hand{font-family:'Nanum Pen Script';color:#141214;line-height:.88}
.ph{position:absolute;left:110px;right:110px;top:640px;height:1000px;border-radius:26px;overflow:hidden;box-shadow:0 0 0 14px #fff,0 18px 34px rgba(0,0,0,.25);transform:rotate(-2deg)}
.ph img{width:100%;height:100%;object-fit:cover}
.n{position:absolute;top:130px;left:0;right:0;text-align:center}
.sub{position:absolute;left:120px;right:120px;bottom:150px;text-align:center;font:600 34px/1.35 'DM Sans';color:#1F1D24}
</style></head><body>''']
for k, img, title, sub, pos in SLIDES:
    if img is None:
        html.append(f'''<div class="s" data-n="ST_story-process_{k}">{scatter(W, H, (120, 560, 960, 1340), 70, 40)}
<div class="n" style="top:700px"><div class="hand" style="font-size:190px;transform:rotate(-3deg)">{title}</div>
<div style="font:600 36px 'DM Sans';margin-top:40px;color:#0E4A38">{sub}</div></div>
<div style="position:absolute;bottom:120px;left:50%;transform:translateX(-50%);background:#141214;color:#FBF9F6;padding:22px 44px;border-radius:999px;font:800 26px 'DM Sans';letter-spacing:.25em">TAP →</div></div>''')
    else:
        html.append(f'''<div class="s" data-n="ST_story-process_{k}">{scatter(W, H, (80, 100, 1000, 1800), 26, 40 + int(k), sizes=(60, 130))}
<div class="n"><div class="hand" style="font-size:150px;transform:rotate(-2deg)">{title}</div></div>
<div class="ph"><img src="{P}{img}" style="object-position:{pos}"></div>
<div class="sub">{sub}</div>
<div style="position:absolute;top:56px;right:60px;font:800 22px 'DM Sans';letter-spacing:.3em;color:#0E4A38">{k}/5</div></div>''')
html.append('</body></html>')
open('/home/user/marisa/stitches/stories/process.html', 'w').write(''.join(html))
print('ok')
