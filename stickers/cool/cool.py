"""Cool-girl versions of the Stitches phrase cards + stickers, Pinterest-collage style:
dense real-gem / pearl / sewing-button / chrome-star scatter, handwritten type,
a prize-ribbon rosette, and letter beads."""
import sys, random, math, ast
sys.path.insert(0, '/home/user/marisa/stitches/realgems')
from realgem import brilliant as B, emerald_cut as E

# borrow rosette() from the diva posts builder without running that script
src = open('/home/user/marisa/stitches/diva/posts.py').read()
mod = ast.parse(src)
fn = next(n for n in mod.body if isinstance(n, ast.FunctionDef) and n.name == 'rosette')
ns = {'math': math, 'random': random}
exec(compile(ast.Module(body=[fn], type_ignores=[]), 'rosette', 'exec'), ns)
rosette = ns['rosette']

SHAPES = ['round', 'oval', 'pear', 'heart', 'marquise', 'emerald']
GEMS = ['pink', 'emerald', 'sapphire', 'diamond', 'ruby', 'amethyst', 'citrine', 'aqua', 'diamond', 'pink', 'emerald']
_seed = [100]

def gem_html(size, x, y, rot, R):
    _seed[0] += 1
    sh = R.choice(SHAPES); gm = R.choice(GEMS)
    svg = E(gm, size, seed=_seed[0]) if sh == 'emerald' else B(sh, gm, size, seed=_seed[0])
    return f'<div style="position:absolute;left:{x:.0f}px;top:{y:.0f}px;transform:rotate({rot}deg)">{svg}</div>'

def pearl(size, x, y):
    return (f'<div style="position:absolute;left:{x:.0f}px;top:{y:.0f}px;width:{size}px;height:{size}px;border-radius:50%;'
            f'background:radial-gradient(circle at 35% 30%,#fff 0 16%,#F6EFE8 42%,#CFC4B8 100%);box-shadow:0 {size//9}px {size//5}px rgba(0,0,0,.28)"></div>')

def button(size, x, y, R):
    col = R.choice(['#F6D4E0', '#FBF9F6', '#0E4A38', '#E8CC86', '#F2B8CF'])
    ging = R.random() < .45
    bg = (f'repeating-linear-gradient(0deg,rgba(255,255,255,.55) 0 {size//8}px,transparent {size//8}px {size//4}px),'
          f'repeating-linear-gradient(90deg,rgba(255,255,255,.55) 0 {size//8}px,transparent {size//8}px {size//4}px),{col}') if ging else f'radial-gradient(circle at 35% 30%,#fff8 0 20%,transparent 60%),{col}'
    h = size * .12; o = size * .17
    holes = ''.join(f'<span style="position:absolute;left:{size/2+dx-h/2:.0f}px;top:{size/2+dy-h/2:.0f}px;width:{h:.0f}px;height:{h:.0f}px;border-radius:50%;background:rgba(0,0,0,.35)"></span>'
                    for dx, dy in ((-o, -o), (o, -o), (-o, o), (o, o)))
    return (f'<div style="position:absolute;left:{x:.0f}px;top:{y:.0f}px;width:{size}px;height:{size}px;border-radius:50%;background:{bg};'
            f'box-shadow:inset 0 0 0 {max(2,size//14)}px rgba(0,0,0,.12),0 {size//10}px {size//6}px rgba(0,0,0,.25)">{holes}</div>')

def star(size, x, y, rot, R):
    gold = R.random() < .5
    c1, c2, c3 = ('#FFF3C4', '#E2B84C', '#8A6412') if gold else ('#FFFFFF', '#C9D2DC', '#6E7A88')
    _seed[0] += 1; i = _seed[0]
    pts = ' '.join(f'{50+46*(1 if k%2==0 else .45)*math.cos(-math.pi/2+math.pi*k/5):.1f},{50+46*(1 if k%2==0 else .45)*math.sin(-math.pi/2+math.pi*k/5):.1f}' for k in range(10))
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 100 100" style="position:absolute;left:{x:.0f}px;top:{y:.0f}px;transform:rotate({rot}deg);filter:drop-shadow(0 4px 5px rgba(0,0,0,.3))">'
            f'<defs><linearGradient id="st{i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c1}"/><stop offset=".5" stop-color="{c2}"/><stop offset="1" stop-color="{c3}"/></linearGradient></defs>'
            f'<polygon points="{pts}" fill="url(#st{i})"/>' +
            ''.join(f'<polygon points="50,50 {pts.split()[k]} {pts.split()[(k+1)%10]}" fill="{"#fff" if k%2 else "#000"}" opacity="{.35 if k%2 else .12}"/>' for k in range(10)) + '</svg>')

def twinkle(size, x, y):
    return f'<div style="position:absolute;left:{x:.0f}px;top:{y:.0f}px;font-size:{size}px;line-height:1;color:#fff;text-shadow:0 0 12px #fff,0 0 3px #B8914A,0 2px 0 #C9A55C">✦</div>'

def scatter(W, H, clear, n, seed, sizes=(70, 170), full=False):
    """clear = (x0,y0,x1,y1) keep-out zone (None for a full pile)."""
    R = random.Random(seed); out = []; boxes = []; tries = 0
    while len(out) < n and tries < 9000:
        tries += 1
        s = R.randint(*sizes)
        x, y = R.uniform(-s * .35, W - s * .65), R.uniform(-s * .35, H - s * .65)
        cx, cy = x + s / 2, y + s / 2
        if clear and clear[0] < cx < clear[2] and clear[1] < cy < clear[3]:
            continue
        lim = .62 if full else .8
        if any(math.hypot(cx - bx, cy - by) < (s + bs) / 2 * lim for bx, by, bs in boxes):
            continue
        boxes.append((cx, cy, s)); k = R.random()
        if k < .14: out.append(pearl(int(s * .55), x + s * .2, y + s * .2))
        elif k < .26: out.append(button(int(s * .7), x + s * .15, y + s * .15, R))
        elif k < .36: out.append(star(int(s * .8), x, y, R.randint(-30, 30), R))
        elif k < .42: out.append(twinkle(int(s * .55), x, y))
        else: out.append(gem_html(s, x, y, R.randint(-35, 35), R))
    return ''.join(out)

def beads(word_rows, bead=120):
    rows = []
    R = random.Random(5)
    for w in word_rows:
        bs = ''.join(
            f'<span style="display:inline-flex;align-items:center;justify-content:center;width:{bead}px;height:{bead}px;margin:0 4px;border-radius:50%;'
            f'background:radial-gradient(circle at 34% 28%,#fff 0 20%,#F4F1EC 55%,#CFC8BE 100%);box-shadow:0 8px 12px rgba(0,0,0,.28),inset 0 -6px 10px rgba(0,0,0,.08);'
            f'font:800 {bead*.55:.0f}px \'DM Sans\';color:#111;transform:rotate({R.randint(-6,6)}deg)">{c}</span>' if c != ' ' else f'<span style="display:inline-block;width:{bead*.5:.0f}px"></span>'
            for c in w)
        rows.append(f'<div style="white-space:nowrap;margin:8px 0">{bs}</div>')
    return ''.join(rows)

W, H = 1200, 1800
html = ['''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@600;800&display=swap" rel="stylesheet">
<style>body{margin:0;display:flex;flex-wrap:wrap;gap:40px;padding:40px;background:#aaa;width:5300px;align-items:flex-start}
.c{position:relative;width:1200px;height:1800px;overflow:hidden;font-family:'DM Sans'}
.mid{position:absolute;left:0;right:0;display:flex;flex-direction:column;align-items:center;text-align:center}
.hand{font-family:'Nanum Pen Script';color:#141214;line-height:.9}
.st{position:relative}
</style></head><body>''']

# 1. you're a gem — cream, dense collage frame, handwritten center (like the whimsy pin)
html.append(f'''<div class="c" data-n="cool-01_youre-a-gem" style="background:#F2EEE7">
{scatter(W, H, (250, 560, 950, 1240), 70, 7)}
<div class="mid" style="top:640px"><div class="hand" style="font-size:270px;transform:rotate(-3deg)">you’re<br>a gem</div>
<img src="../logo-ink.png" style="width:170px;margin-top:40px"></div></div>''')

# 2. certified gem — prize ribbon on blush with a gem scatter
html.append(f'''<div class="c" data-n="cool-02_certified-gem" style="background:#F6D4E0">
{scatter(W, H, (170, 230, 1030, 1560), 40, 11, sizes=(60, 140))}
<div style="position:absolute;left:50%;top:47%;transform:translate(-50%,-50%) rotate(-4deg)">{rosette('cg', '#0E4A38', '#2E8F6A', '#07291F', '#FBF9F6', '#0E4A38', 'certified', 'gem', '✦ FIRST PLACE ✦', size=820)}</div>
<img src="../logo-ink.png" style="position:absolute;bottom:70px;left:50%;transform:translateX(-50%);width:160px"></div>''')

# 3. rare find — letter beads on a full pile of gems, pearls, buttons
html.append(f'''<div class="c" data-n="cool-03_rare-find" style="background:#EDE6DC">
{scatter(W, H, None, 150, 23, sizes=(60, 150), full=True)}
<div class="mid" style="top:640px">{beads(['RARE', 'FIND'], bead=150)}</div>
<div style="position:absolute;bottom:56px;left:50%;transform:translateX(-50%);background:#FBF9F6;padding:18px 40px;border-radius:999px;box-shadow:0 8px 16px rgba(0,0,0,.25)"><img src="../logo-ink.png" style="width:150px;display:block"></div></div>''')

# 4. real gems only — black, glossy bubble + gem pile corner
html.append(f'''<div class="c" data-n="cool-04_real-gems-only" style="background:radial-gradient(circle at 50% 45%,#2b2830,#121014 75%)">
{scatter(W, H, (120, 520, 1080, 1260), 46, 31, sizes=(60, 150))}
<div class="mid" style="top:640px"><div class="hand" style="font-size:120px;color:#F6D4E0;transform:rotate(-4deg)">only</div>
<div style="font:400 210px/0.9 'DM Serif Display';color:#FBF9F6;letter-spacing:-.03em">real<br>gems</div>
<div style="font:800 24px 'DM Sans';letter-spacing:.4em;color:#C49A64;margin-top:30px">✦ MARISA STITCHES ✦</div></div></div>''')

# stickers (die-cut clusters)
def diecut(name, inner, w, h):
    return (f'<div class="st" data-n="{name}" style="width:{w}px;height:{h}px;filter:drop-shadow(7px 0 0 #fff) drop-shadow(-7px 0 0 #fff) drop-shadow(0 7px 0 #fff) drop-shadow(0 -7px 0 #fff) drop-shadow(0 10px 12px rgba(0,0,0,.25))">{inner}</div>')
R = random.Random(3)
html.append('<div style="display:flex;gap:140px;align-items:center;padding:80px;flex-wrap:wrap;width:3400px">')
html.append(diecut('sticker-cool_youre-a-gem', gem_html(170, 0, 30, -15, random.Random(1)) + pearl(46, 150, 10) + star(70, 360, 0, 12, R) +
                   '<div class="hand" style="position:absolute;left:140px;top:60px;font-size:130px;white-space:nowrap;transform:rotate(-4deg)">you’re a gem</div>' + button(56, 640, 120, R), 720, 230))
html.append(diecut('sticker-cool_certified-gem', f'<div style="position:absolute;left:0;top:0">{rosette("cg2", "#0E4A38", "#2E8F6A", "#07291F", "#FBF9F6", "#0E4A38", "certified", "gem", "✦ FIRST PLACE ✦", size=300)}</div>', 300, 370))
html.append(diecut('sticker-cool_rare-find', f'<div style="position:absolute;left:20px;top:58px;width:900px;height:4px;border-radius:2px;background:#d9d2c8"></div><div style="position:absolute;left:60px;top:8px">{beads(["RARE FIND"], bead=86)}</div>' + pearl(50, 0, 36) + pearl(50, 890, 36) + gem_html(96, 410, 92, 10, random.Random(4)), 940, 200))
html.append(diecut('sticker-cool_real-gems-only', '<div style="position:absolute;left:30px;top:30px;width:420px;height:180px;border-radius:999px;background:#141214"></div>'
                   '<div style="position:absolute;left:30px;top:56px;width:420px;text-align:center;font:400 64px \'DM Serif Display\';color:#FBF9F6;letter-spacing:-.02em">real gems <span class="hand" style="color:#F6D4E0;font-size:80px">only</span></div>'
                   + gem_html(90, -10, -6, -10, random.Random(9)) + gem_html(70, 410, 140, 15, random.Random(10)) + star(50, 400, 6, 10, R), 480, 240))
html.append('</div></body></html>')
open('/home/user/marisa/stickers/cool/cool.html', 'w').write(''.join(html))
print('ok')
