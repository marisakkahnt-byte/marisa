"""Stitches merch v2: whimsy / meme vibe. Asphalt stencil + confetti, subtitle captions."""
import sys, json, random, base64
sys.path.insert(0, '/home/user/marisa/stitches/realgems')
from realgem import brilliant as B, emerald_cut as E
FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Stardos+Stencil:wght@700&family=Courier+Prime:wght@400;700&family=DM+Serif+Display&family=DM+Sans:wght@700&family=Nanum+Pen+Script&display=swap">'
INK, EM, OAT = '#1F1D24', '#0E4A38', '#F2EEE7'
ASPH = ("url('data:image/svg+xml;base64," + base64.b64encode(b'''<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="4" seed="7"/><feColorMatrix values="0 0 0 0 .62  0 0 0 0 .6  0 0 0 0 .57  0 0 0 2.6 -1.05"/></filter><rect width="400" height="400" fill="#2b2926"/><rect width="400" height="400" filter="url(#n)"/></svg>''').decode() + "')")
PAINT = ("url('data:image/svg+xml;base64," + base64.b64encode(b'''<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="p"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" seed="3"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.45"/></filter><rect width="300" height="300" fill="#fff" filter="url(#p)"/></svg>''').decode() + "')")
FOIL = ['#e8508a', '#f4c542', '#3aa7e0', '#9b5de5', '#ff6b6b', '#2ec4b6', '#c0c7d1', '#f78fb3']
GEMS = [('round', 'ruby'), ('heart', 'pink'), ('oval', 'sapphire'), ('round', 'citrine'), ('pear', 'amethyst'), ('round', 'diamond'), ('marquise', 'aqua')]

def confetti(W, H, n, seed, clear=None, gems=10, gs=(40, 80), keep=.2, scale=60):
    r = random.Random(seed); out = []
    for i in range(n):
        x, y = r.uniform(0, W), r.uniform(0, H)
        if clear and clear[0] < x < clear[2] and clear[1] < y < clear[3] and r.random() > keep: continue
        c = r.choice(FOIL); w = r.uniform(.7, 2.0) * W / scale; h = w * r.uniform(.4, .9)
        out.append(f'<div style="position:absolute;left:{x:.0f}px;top:{y:.0f}px;width:{w:.0f}px;height:{h:.0f}px;background:linear-gradient({r.randint(0,180)}deg,{c},#fff 45%,{c});transform:rotate({r.randint(0,360)}deg) skew({r.randint(-25,25)}deg);opacity:.92;box-shadow:0 1px 1px rgba(0,0,0,.35)"></div>')
    for i in range(gems):
        x, y = r.uniform(0, W), r.uniform(0, H)
        if clear and clear[0] < x < clear[2] and clear[1] < y < clear[3]: continue
        sh, g = r.choice(GEMS); s = int(r.uniform(*gs))
        gem = E('emerald', s, seed=seed + i) if r.random() < .15 else B(sh, g, s, seed=seed + i)
        out.append(f'<div style="position:absolute;left:{x:.0f}px;top:{y:.0f}px;transform:rotate({r.randint(-40,40)}deg)">{gem}</div>')
    return ''.join(out)

def asphalt(W, H, text, seed=5):
    fs = int(W * .135)
    return (f'<div style="position:relative;width:{W}px;height:{H}px;overflow:hidden;background:{ASPH} 0 0/{int(W/3)}px;border-radius:{int(W*.02)}px">'
            f'<div style="position:absolute;left:{W*.06:.0f}px;top:0;bottom:0;width:{W*.035:.0f}px;background:#e9e5dc;-webkit-mask:{PAINT} 0 0/{int(W/4)}px;transform:skewX(-6deg)"></div>'
            f'{confetti(W, H, 240, seed, clear=(W*.12, H*.33, W*.97, H*.68), gems=14, gs=(W*.045, W*.085))}'
            f'<div style="position:absolute;left:0;right:0;top:50%;transform:translateY(-50%) rotate(-4deg);text-align:center;font:700 {fs}px/1.02 \'Stardos Stencil\';color:#f4f1ea;letter-spacing:.02em;-webkit-mask:{PAINT} 0 0/{int(W/3)}px">{text}</div></div>')

def subtitle(text, fs, color='#fff'):
    return f'<div style="font:400 {fs}px/1.25 \'Courier Prime\';color:{color};text-align:center;white-space:nowrap">{text}</div>'

files = [
    ('TEE_real-gems-only_asphalt-stencil_DTG-print_10x10in', 3000, 3000, asphalt(3000, 3000, 'REAL GEMS<br>ONLY')),
    ('HAT_sorry-i-was-stitching_FRONT_white-thread_3.75x0.6in', 1125, 180, f'<div style="display:grid;place-items:center;width:1125px;height:180px">{subtitle("sorry, i was stitching.", 76)}</div>'),
    ('TOTE_needle-going-through-canvas_print_white-ink_12x4in', 3600, 1200, f'<div style="display:grid;place-items:center;width:3600px;height:1200px">{subtitle("[needle going<br>through canvas]", 300)}</div>'),
]
json.dump([[n, w, h, f'<!doctype html><html><head>{FONTS}</head><body style="margin:0;background:transparent">{x}</body></html>'] for n, w, h, x in files], open('files_v2.json', 'w'))

tee = f'''<div style="position:relative;width:440px;height:470px"><svg width="440" height="470" viewBox="0 0 440 470"><defs><linearGradient id="t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FBF8F2"/><stop offset="1" stop-color="#E6DDCD"/></linearGradient></defs>
<ellipse cx="220" cy="456" rx="150" ry="9" fill="rgba(0,0,0,.1)"/><path d="M150 30 C175 52 265 52 290 30 L360 52 C384 60 404 90 420 128 L370 150 L346 120 L340 440 L100 440 L94 120 L70 150 L20 128 C36 90 56 60 80 52 Z" fill="url(#t)" stroke="#d7cbb6" stroke-width="1.5"/><path d="M150 30 C175 60 265 60 290 30" stroke="#d6c9b2" stroke-width="8" fill="none"/></svg>
<div style="position:absolute;left:120px;top:100px;width:200px;height:200px;overflow:hidden"><div style="transform:scale(.3333);transform-origin:0 0">{asphalt(600, 600, "REAL GEMS<br>ONLY", 5)}</div></div></div>'''
hat = f'''<div style="position:relative;width:440px;height:330px"><svg width="440" height="330" viewBox="0 0 440 330"><defs><radialGradient id="hg" cx=".42" cy=".35" r=".78"><stop offset="0" stop-color="#3a3740"/><stop offset="1" stop-color="#101014"/></radialGradient><linearGradient id="bb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101014"/><stop offset=".55" stop-color="#25232b"/><stop offset="1" stop-color="#101014"/></linearGradient></defs>
<ellipse cx="220" cy="310" rx="170" ry="11" fill="rgba(0,0,0,.13)"/><path d="M58 232 C52 120 120 40 220 40 C320 40 388 120 382 232 C330 222 110 222 58 232 Z" fill="url(#hg)"/>
<path d="M220 40 L220 226 M140 60 C122 110 118 170 124 226 M300 60 C318 110 322 170 316 226" stroke="rgba(0,0,0,.4)" stroke-width="1.6" fill="none"/><circle cx="220" cy="42" r="8" fill="#101014"/>
<path d="M58 232 C110 222 330 222 382 232 C396 262 330 300 220 300 C110 300 44 262 58 232 Z" fill="url(#bb)"/><path d="M82 246 C140 238 300 238 358 246 M76 262 C150 280 290 280 364 262" stroke="rgba(255,255,255,.14)" stroke-width="1.4" stroke-dasharray="4 5" fill="none"/></svg>
<div style="position:absolute;top:160px;left:0;right:0;display:flex;justify-content:center">{subtitle("sorry, i was stitching.", 22)}</div></div>'''
tote = f'''<div style="position:relative;width:340px;height:440px"><div style="position:absolute;left:80px;top:0;width:58px;height:150px;border:15px solid #1b1a1f;border-bottom:none;border-radius:40px 40px 0 0"></div><div style="position:absolute;right:80px;top:0;width:58px;height:150px;border:15px solid #1b1a1f;border-bottom:none;border-radius:40px 40px 0 0"></div>
<div style="position:absolute;left:0;right:0;top:120px;bottom:0;background:linear-gradient(160deg,#2a2830,#141318);box-shadow:0 22px 34px rgba(20,10,10,.3);display:grid;place-items:center">{subtitle("[needle going<br>through canvas]", 25)}</div></div>'''
def card(lab, inner, bg):
    return f'<div class="c" style="background:{bg}"><div class="st">{inner}</div><div class="lab">{lab}</div></div>'
sheet = f'''<!doctype html><html><head>{FONTS}<style>body{{margin:0;width:1800px;background:#1b1a1f;position:relative;overflow:hidden}}
.top{{position:relative;text-align:center;padding:54px 0 28px;z-index:2}}.k{{font:700 14px 'DM Sans';letter-spacing:.34em;color:#F6D4E0}}.h{{font:700 96px/1 'Stardos Stencil';color:#ece8df;margin-top:12px;letter-spacing:.02em}}.s{{font:400 26px 'Courier Prime';color:#cfcbd6;margin-top:16px}}
.g{{position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,1fr);gap:26px;padding:0 60px 60px}}.c{{height:640px;display:flex;flex-direction:column;border-radius:6px}}.st{{flex:1;display:grid;place-items:center}}
.lab{{text-align:center;padding-bottom:30px;font:700 13px 'DM Sans';letter-spacing:.22em;color:#5a5560;text-transform:uppercase}}.lab b{{display:block;font:400 30px 'Courier Prime';letter-spacing:0;text-transform:none;color:{INK};margin-bottom:8px}}
.conf{{position:absolute;inset:0;z-index:1}}</style></head><body><div class="conf">{confetti(1800, 260, 120, 99, clear=(110,30,1700,250), gems=8, gs=(24,40), keep=0, scale=120)}</div>
<div class="top"><div class="k">MARISA STITCHES · MERCH</div><div class="h">WHIMSY, BUT MAKE IT MERCH</div><div class="s">[three little things]</div></div><div class="g">
{card('<b>real gems only</b>cream tee · street-stencil print + gem confetti', tee, '#E9E3D8')}
{card('<b>sorry, i was stitching.</b>black dad hat · white thread, subtitle type', hat, '#F6E3EA')}
{card('<b>[needle going through canvas]</b>black tote · white print, subtitle type', tote, '#E9E3D8')}
</div></body></html>'''
open('sheet_v2.html', 'w').write(sheet)
