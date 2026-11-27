"""Marisa Stitches merch (3 pieces): print files + mockup sheet HTML."""
import sys, json
sys.path.insert(0, '/home/user/marisa/stitches/realgems')
from realgem import brilliant as B, emerald_cut as E
FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@500;700&family=Nanum+Pen+Script&display=swap">'
INK, EM, OAT, CAM, BLUSH = '#1F1D24', '#0E4A38', '#F2EEE7', '#C49A64', '#F6D4E0'
cheetah = open('/home/user/marisa/stitches/site-v3/cheetah-tile.svg').read()
import base64
CH = 'data:image/svg+xml;base64,' + base64.b64encode(cheetah.encode()).decode()

def gemrow(s, seed=1):
    return (f'<div style="display:flex;align-items:center;justify-content:center;gap:{s*.18}px">'
            f'{E("emerald", int(s*.78), seed=seed)}{B("heart","pink", s, seed=seed+1)}{B("round","ruby", int(s*.78), seed=seed+2)}</div>')

def tee_art(scale=1):
    s = 1 * scale
    return (f'<div style="text-align:center">{gemrow(int(130*s), 11)}'
            f'<div style="font:400 {int(150*s)}px/1 \'DM Serif Display\';color:{INK};margin-top:{int(38*s)}px;letter-spacing:-.01em;white-space:nowrap">certified gem</div>'
            f'<div style="font:700 {int(22*s)}px \'DM Sans\';letter-spacing:.42em;color:{EM};margin-top:{int(28*s)}px">MARISA STITCHES</div></div>')

def hat_text(c, fs):
    return f'<div style="font:400 {fs}px/1 \'DM Serif Display\';color:{c};white-space:nowrap">real gems only</div>'

def tote_art(scale=1):
    s = scale
    return (f'<div style="position:relative;width:{int(1600*s)}px;height:{int(1600*s)}px;background:url({CH}) 0 0/{int(330*s)}px">'
            f'<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-3deg);background:{OAT};border-radius:{int(40*s)}px;padding:{int(70*s)}px {int(110*s)}px;box-shadow:0 0 0 {int(14*s)}px #fff;text-align:center">'
            f'<div style="margin-bottom:{int(16*s)}px">{B("heart","pink",int(150*s),seed=41)}</div>'
            f'<div style="font:400 {int(150*s)}px/1 \'DM Serif Display\';color:{INK};white-space:nowrap">she’s a gem</div>'
            f'</div></div>')

files = [
    ('TEE_certified-gem_DTG-print_10x8in', 3000, 2400, f'<div style="display:grid;place-items:center;width:3000px;height:2400px">{tee_art(3)}</div>'),
    ('HAT_real-gems-only_FRONT_cream-thread_3.5x0.75in', 1050, 225, f'<div style="display:grid;place-items:center;width:1050px;height:225px">{hat_text("#F2EEE7",118)}</div>'),
    ('HAT_real-gems-only_FRONT_emerald-thread_3.5x0.75in', 1050, 225, f'<div style="display:grid;place-items:center;width:1050px;height:225px">{hat_text(EM,118)}</div>'),
    ('TOTE_shes-a-gem_all-over-print_16x16in', 4800, 4800, tote_art(3)),
]
json.dump([[n, w, h, f'<!doctype html><html><head>{FONTS}</head><body style="margin:0;background:transparent">{html}</body></html>'] for n, w, h, html in files], open('files.json', 'w'))

# mockups
tee = f'''<div style="position:relative;width:440px;height:470px"><svg width="440" height="470" viewBox="0 0 440 470"><defs><linearGradient id="t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FBF8F2"/><stop offset="1" stop-color="#E6DDCD"/></linearGradient></defs>
<ellipse cx="220" cy="456" rx="150" ry="9" fill="rgba(0,0,0,.1)"/>
<path d="M150 30 C175 52 265 52 290 30 L360 52 C384 60 404 90 420 128 L370 150 L346 120 L340 440 L100 440 L94 120 L70 150 L20 128 C36 90 56 60 80 52 Z" fill="url(#t)" stroke="#d7cbb6" stroke-width="1.5"/>
<path d="M150 30 C175 60 265 60 290 30" stroke="#d6c9b2" stroke-width="8" fill="none"/></svg>
<div style="position:absolute;left:0;right:0;top:128px;display:flex;justify-content:center;transform:scale(.4);transform-origin:top center">{tee_art(1)}</div></div>'''
hatm = f'''<div style="position:relative;width:440px;height:330px"><svg width="440" height="330" viewBox="0 0 440 330"><defs><radialGradient id="hg" cx=".42" cy=".35" r=".78"><stop offset="0" stop-color="#1d6a52"/><stop offset="1" stop-color="#06291f"/></radialGradient><linearGradient id="bb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#06291f"/><stop offset=".55" stop-color="#0E4A38"/><stop offset="1" stop-color="#06291f"/></linearGradient></defs>
<ellipse cx="220" cy="310" rx="170" ry="11" fill="rgba(0,0,0,.13)"/>
<path d="M58 232 C52 120 120 40 220 40 C320 40 388 120 382 232 C330 222 110 222 58 232 Z" fill="url(#hg)"/>
<path d="M220 40 L220 226 M140 60 C122 110 118 170 124 226 M300 60 C318 110 322 170 316 226" stroke="rgba(0,0,0,.3)" stroke-width="1.6" fill="none"/><circle cx="220" cy="42" r="8" fill="#06291f"/>
<path d="M58 232 C110 222 330 222 382 232 C396 262 330 300 220 300 C110 300 44 262 58 232 Z" fill="url(#bb)"/>
<path d="M82 246 C140 238 300 238 358 246 M76 262 C150 280 290 280 364 262" stroke="rgba(255,255,255,.16)" stroke-width="1.4" stroke-dasharray="4 5" fill="none"/></svg>
<div style="position:absolute;top:148px;left:0;right:0;display:flex;justify-content:center">{hat_text("#F2EEE7",34)}</div></div>'''
totem = f'''<div style="position:relative;width:340px;height:440px"><div style="position:absolute;left:80px;top:0;width:58px;height:150px;border:15px solid #3a2a1c;border-bottom:none;border-radius:40px 40px 0 0"></div><div style="position:absolute;right:80px;top:0;width:58px;height:150px;border:15px solid #3a2a1c;border-bottom:none;border-radius:40px 40px 0 0"></div>
<div style="position:absolute;left:0;right:0;top:120px;bottom:0;overflow:hidden;box-shadow:0 22px 34px rgba(60,40,20,.25)"><div style="transform:scale(.2125);transform-origin:top left">{tote_art(1)}</div></div></div>'''
def card(lab, inner, bg):
    return f'<div class="c" style="background:{bg}"><div class="st">{inner}</div><div class="lab">{lab}</div></div>'
sheet = f'''<!doctype html><html><head>{FONTS}<style>body{{margin:0;width:1800px;background:{OAT}}}
.top{{text-align:center;padding:54px 0 28px}}.k{{font:700 14px 'DM Sans';letter-spacing:.34em;color:{EM}}}.h{{font:400 92px/1 'DM Serif Display';color:{INK};margin-top:10px}}.s{{font:400 40px 'Nanum Pen Script';color:{EM};margin-top:6px}}
.g{{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;padding:0 60px 60px}}.c{{height:640px;display:flex;flex-direction:column;border-radius:6px}}.st{{flex:1;display:grid;place-items:center}}
.lab{{text-align:center;padding-bottom:30px;font:700 13px 'DM Sans';letter-spacing:.22em;color:#5a5560;text-transform:uppercase}}.lab b{{display:block;font:400 32px 'DM Serif Display';letter-spacing:0;text-transform:none;color:{INK};margin-bottom:8px}}</style></head><body>
<div class="top"><div class="k">MARISA STITCHES · MERCH</div><div class="h">real gems only</div><div class="s">just three little things ✦</div></div><div class="g">
{card('<b>certified gem</b>cream baby tee · printed · real gems', tee, '#E9E3D8')}
{card('<b>real gems only</b>emerald dad hat · cream thread', hatm, '#F6E3EA')}
{card("<b>she’s a gem</b>cheetah tote · all-over print", totem, '#E9E3D8')}
</div></body></html>'''
open('sheet.html', 'w').write(sheet)
print('ok')
