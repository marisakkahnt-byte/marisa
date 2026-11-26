"""'you're a gem' + 'don't lose your sparkle' keepsake cards and stickers, with real gems."""
import sys
sys.path.insert(0, '/home/user/marisa/stitches/realgems')
from realgem import brilliant as B, emerald_cut as E

def g(svg, x, y, rot=0):
    return f'<div style="position:absolute;left:{x}px;top:{y}px;transform:rotate({rot}deg)">{svg}</div>'
TW = lambda x, y, s: f'<span class="tw" style="left:{x}px;top:{y}px;font-size:{s}px">✦</span>'
VELVET = 'radial-gradient(circle at 50% 44%,#2b2830 0%,#1a181e 40%,#0e0d11 85%)'

html = ['''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@600&display=swap" rel="stylesheet">
<style>body{margin:0;display:flex;flex-wrap:wrap;gap:40px;padding:40px;background:#bbb;width:4200px;align-items:flex-start}
.c{position:relative;width:1200px;height:1800px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:'DM Sans'}
.dm{font-family:'DM Serif Display';letter-spacing:-.025em;line-height:.96}
.caps{font:600 26px 'DM Sans';letter-spacing:.34em;text-transform:uppercase}
.tw{position:absolute;color:#fff;text-shadow:0 0 18px #fff,0 0 4px #B8914A;line-height:1}
.mark{position:absolute;bottom:80px;left:50%;transform:translateX(-50%);width:220px}
.st{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border:14px solid #fff;box-shadow:0 10px 24px rgba(0,0,0,.2);overflow:visible}
</style></head><body>''']

# --- card: you're a gem (black velvet, real gems) ---
html.append(f'''<div class="c" data-n="card-09_youre-a-gem" style="background:{VELVET}">
{g(B('heart','pink',230,seed=41),150,180,-12)}{g(E('emerald',170,seed=42),880,230,10)}{g(B('round','diamond',150,seed=43),930,1180)}
{g(B('oval','sapphire',150,seed=44),140,1220,-15)}{g(B('pear','ruby',120,seed=45),560,1380,20)}{g(B('marquise','amethyst',110,seed=46),560,150,80)}
{TW(420,330,60)}{TW(780,1120,44)}{TW(230,980,34)}{TW(1010,660,30)}
<div class="dm" style="color:#FBF9F6;font-size:250px">you’re<br><i style="color:#F6D4E0">a gem</i></div>
<div class="caps" style="color:#C49A64;margin-top:54px">and don’t you forget it</div>
<img class="mark" src="../MarisaStitches_Logo_cream_transparent.png"></div>''')

# --- card: don't lose your sparkle (blush, big diamond) ---
html.append(f'''<div class="c" data-n="card-10_dont-lose-your-sparkle" style="background:#F6D4E0">
<div style="position:absolute;inset:60px;border:3px solid #B8914A;border-radius:40px"></div>
{g(B('round','diamond',380,seed=51),410,190)}
{TW(330,200,80)}{TW(850,520,50)}{TW(300,560,34)}
<div class="dm" style="color:#0E4A38;font-size:190px;margin-top:420px">don’t lose<br>your <i>sparkle</i></div>
<div class="caps" style="color:#1F1D24;margin-top:50px">✦ not even a little ✦</div>
<img class="mark" src="../logo-ink.png" style="bottom:120px"></div>''')

# --- stickers ---
html.append(f'''<div style="display:flex;gap:160px;align-items:center;padding:60px">
<div class="st" data-n="sticker_youre-a-gem" style="width:320px;height:320px;border-radius:50%;background:{VELVET}">
 {g(B('heart','pink',90,seed=61),30,30,-14)}{g(E('emerald',62,seed=62),220,200,12)}{TW(230,60,30)}
 <div class="dm" style="color:#FBF9F6;font-size:64px">you’re<br><i style="color:#F6D4E0">a gem</i></div></div>
<div class="st" data-n="sticker_dont-lose-your-sparkle" style="width:470px;height:190px;border-radius:999px;background:#F6D4E0">
 {g(B('round','diamond',96,seed=63),-30,-30)}{TW(400,20,30)}
 <div class="dm" style="color:#0E4A38;font-size:52px">don’t lose<br>your <i>sparkle</i></div></div>
<div class="st" data-n="sticker_you-sparkle" style="width:320px;height:320px;border-radius:50%;background:conic-gradient(from 40deg,#f6d4e0,#e6efff,#dcf5ea,#fff2d2,#f6d4e0)">
 {g(B("round","diamond",110,seed=64),90,34)}
 <div class="dm" style="color:#0E4A38;font-size:58px;margin-top:110px">you <i>sparkle</i></div></div>
</div>''')
html.insert(-1, f'''<div style="display:flex;gap:160px;align-items:center;padding:60px">
<div class="st" data-n="sticker_real-gems-only" style="width:440px;height:240px;border-radius:999px;background:{VELVET}">
 {g(B('round','diamond',80,seed=71),-20,-26)}{g(E('emerald',58,seed=72),380,150,12)}{g(B('heart','pink',56,seed=73),370,-14,-10)}{TW(60,170,26)}
 <div class="dm" style="color:#FBF9F6;font-size:66px">real gems <i style="color:#F6D4E0">only</i></div>
 <div class="caps" style="color:#C49A64;font-size:13px;margin-top:10px">✦ marisa stitches ✦</div></div>
</div>''')
html.append('</body></html>')
open('/home/user/marisa/stickers/phrases/phrases.html', 'w').write(''.join(html))
print('ok')
