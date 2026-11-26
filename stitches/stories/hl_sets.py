"""Stitches highlight story sets (1080x1920): needlepoint, gems, diva, packaging. Cool-girl collage style."""
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
VELVET = 'radial-gradient(circle at 50% 44%,#2b2830 0%,#1a181e 40%,#0e0d11 85%)'
seed = [200]

def fr(name, title, sub='', img=None, img_w=760, bg='#F2EEE7', dark=False, extra='', clear=(90, 320, 990, 1700), n=24):
    seed[0] += 1
    col = '#FBF9F6' if dark else '#141214'
    subc = '#F6D4E0' if dark else '#0E4A38'
    im = f'<img src="{img}" style="width:{img_w}px;max-height:900px;object-fit:contain;border-radius:22px;box-shadow:0 0 0 12px #fff,0 18px 34px rgba(0,0,0,.28);transform:rotate(-2deg);margin-top:40px">' if img else ''
    return (f'<div class="s" data-n="{name}" style="background:{bg}">{scatter(W, H, clear, n, seed[0], sizes=(60, 130))}'
            f'<div class="mid"><div class="hand" style="color:{col}">{title}</div>{im}{extra}'
            f'<div class="sub" style="color:{subc}">{sub}</div></div></div>')

ST = '../../stickers/'
DV = '../diva/'
F = []
# needlepoint
F += [fr('needlepoint_1', 'needlepoint,<br>explained ✦', 'tap through →', DV + 'NP_certified-diva.jpg', 640),
      fr('needlepoint_2', 'tiny slanted<br>stitches', 'one little stitch over every square of canvas. the whole thing gets covered, background too.', DV + 'NP_too-cute-to-rush.jpg', 640),
      fr('needlepoint_3', 'needlepoint vs.<br>embroidery', 'needlepoint fills a canvas, stitch by stitch. embroidery decorates fabric. i do both (and machine embroidery).', None,
         extra='<div class="vs"><div><b>needlepoint</b><span>stiff mesh canvas<br>covers every square</span></div><div><b>embroidery</b><span>any fabric<br>stitches on top</span></div></div>'),
      fr('needlepoint_4', 'guess what’s on<br>my canvas ✦', 'add a quiz sticker: “certified diva” · “rare find” · “she’s a gem”', DV + 'NP_shes-a-gem.jpg', 600)]
# gems
F += [fr('gems_1', 'real gems<br>only ✦', 'it’s kind of our thing', None, dark=True, bg=VELVET, n=40),
      fr('gems_2', 'the birthstone<br>edit', 'thread colors by month. screenshot yours.', '../sparkle/out/ST_sparkle_bs2.jpg', 680),
      fr('gems_3', 'which gem<br>are you?', 'add a poll: emerald · ruby · sapphire · diamond', None, dark=True, bg=VELVET, n=10,
         extra='<div class="gm">' + B('round', 'diamond', 170, seed=301) + E('emerald', 170, seed=302) + B('round', 'ruby', 170, seed=303) + B('oval', 'sapphire', 170, seed=304) + '</div>')]
# diva
F += [fr('diva_1', 'diva mode ✦', 'certified, obviously', DV + 'ROS_diva_sticker.png', 520, bg='#F6D4E0'),
      fr('diva_2', 'certified<br>diva', 'needlepoint edition', DV + 'NP_certified-diva.jpg', 600),
      fr('diva_3', 'busy hands,<br>quiet mind', 'diva behavior: monogramming at 11pm', DV + 'NP_busy-hands.jpg', 600, bg='#F6D4E0')]
# packaging
F += [fr('packaging_1', 'a peek at the<br>packaging ✦', 'cheetah mailers, zebra bags, emerald everything', None,
         extra='<div class="pk"><span style="background:url(\'../site-v3/cheetah-tile.svg\') 0 0/160px,#C49A64"></span><span style="background:url(\'../../stickers/zebra-card.svg\') center/cover,#FBF9F6"></span><span style="background:#0E4A38"></span></div>'),
      fr('packaging_2', 'sealed with<br>a sticker', 'real gems only, obviously', ST + 'phrases/sticker_real-gems-only.png', 620, bg='#F6D4E0'),
      fr('packaging_3', 'and a little card<br>to keep', 'hang it on the fridge ✦', ST + 'cool/cool-01_youre-a-gem.png', 520)]

html = ['''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=DM+Serif+Display&family=DM+Sans:wght@600;800&display=swap" rel="stylesheet">
<style>body{margin:0;display:flex;flex-wrap:wrap;gap:30px;padding:30px;width:8000px;background:#999}
.s{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:'DM Sans'}
.mid{position:absolute;left:110px;right:110px;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.hand{font:400 160px/.9 'Nanum Pen Script';transform:rotate(-2deg)}
.sub{margin-top:50px;font:600 36px/1.35 'DM Sans';max-width:800px}
.vs{display:flex;gap:30px;margin-top:60px}.vs div{background:#fff;border-radius:30px;padding:40px 34px;width:360px;box-shadow:0 12px 26px rgba(0,0,0,.15)}
.vs b{display:block;font:400 54px 'DM Serif Display';color:#0E4A38}.vs span{display:block;margin-top:14px;font:600 30px/1.35 'DM Sans';color:#1F1D24}
.gm{display:grid;grid-template-columns:200px 200px;gap:30px;margin-top:60px;justify-items:center}
.pk{display:flex;gap:26px;margin-top:60px}.pk span{width:230px;height:320px;border-radius:18px;box-shadow:0 0 0 10px #fff,0 14px 26px rgba(0,0,0,.25)}
</style></head><body>'''] + F + ['</body></html>']
open('/home/user/marisa/stitches/stories/hl_sets.html', 'w').write(''.join(html))
print(len(F))
