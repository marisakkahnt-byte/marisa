"""Instagram highlight covers (1080x1920) for both brands. The icon sits in the center circle IG crops to."""
G = '#B08D57'   # I Do gold
IDO_ICONS = {
  'about':      '<img src="../stickers/quill-cream.png" style="width:300px">',
  'ceremonies': '<svg viewBox="0 0 100 100" width="340"><g fill="none" stroke="{c}" stroke-width="3.2"><circle cx="40" cy="58" r="20"/><circle cx="60" cy="58" r="20"/><path d="M55 34 l5 -9 5 9 -5 5z"/></g></svg>',
  'vows':       '<svg viewBox="0 0 100 100" width="320"><g fill="none" stroke="{c}" stroke-width="3.2"><rect x="24" y="18" width="44" height="60" rx="2"/><path d="M32 34h28M32 44h28M32 54h18"/><path d="M84 10 q-22 12 -26 44 l5 -2 q4 -26 21 -42z"/></g></svg>',
  'kind words': '<svg viewBox="0 0 100 100" width="330"><g fill="none" stroke="{c}" stroke-width="3.2"><path d="M14 24h64a6 6 0 0 1 6 6v30a6 6 0 0 1-6 6H40l-16 14V66H14a6 6 0 0 1-6-6V30a6 6 0 0 1 6-6z"/><path d="M46 56c-6-5-14-10-10-17 3-4 8-3 10 1 2-4 7-5 10-1 4 7-4 12-10 17z"/></g></svg>',
  'rain':       '<svg viewBox="0 0 100 100" width="330"><g fill="none" stroke="{c}" stroke-width="3.2" stroke-linecap="round"><path d="M14 50 Q50 6 86 50 Q78 43 68 50 Q59 43 50 50 Q41 43 32 50 Q23 43 14 50Z"/><path d="M50 50 V80 q0 8 -8 8 q-7 0 -7 -7"/><path d="M22 64v6M78 60v6M30 80v4"/></g></svg>',
  'faq':        '<div style="font:400 300px/1 \'Pinyon Script\';color:{c};margin-top:-20px">?</div>',
}
IDO_BG = ['#2A241F', '#F1DCD6', '#2A241F', '#F1DCD6', '#2A241F', '#F1DCD6']
IDO_FG = ['#F1DCD6', '#2A241F', '#D9C08F', '#7E2E2C', '#F1DCD6', '#2A241F']

ST_ICONS = {
  'about':     '<img src="../brand/logo-ink.png" style="width:420px">',
  'the work':  '<svg viewBox="0 0 100 100" width="340"><g fill="none" stroke="{c}" stroke-width="3.2"><circle cx="50" cy="54" r="30"/><circle cx="50" cy="54" r="24"/><rect x="44" y="16" width="12" height="9" rx="2"/></g><text x="50" y="64" text-anchor="middle" font-family="DM Serif Display" font-size="28" fill="{c}">M</text></svg>',
  'needlepoint': '<svg viewBox="-4 -4 100 88" width="330"><g stroke="{c}" stroke-width="7" stroke-linecap="round">' + ''.join(f'<line x1="{i*10+2}" y1="{j*10+9}" x2="{i*10+9}" y2="{j*10+2}"/>' for (i,j) in [(i,j) for j in range(8) for i in range(9) if ((i-2)**2+(j-1.6)**2<=4.2 or (i-6)**2+(j-1.6)**2<=4.2 or (j>=2 and abs(i-4)<=6.2-j*0.85))]) + '</g></svg>',
  'gems':      '<div style="position:relative;width:380px;height:320px"><img src="../stickers/gem-emerald.png" style="position:absolute;width:190px;left:20px;top:70px;rotate:-12deg;filter:drop-shadow(0 8px 8px rgba(0,0,0,.3))"><img src="../stickers/gem-ruby.png" style="position:absolute;width:160px;left:180px;top:20px;filter:drop-shadow(0 8px 8px rgba(0,0,0,.3))"><img src="../stickers/gem-crystal.png" style="position:absolute;width:120px;left:200px;top:170px;filter:drop-shadow(0 8px 8px rgba(0,0,0,.3))"></div>',
  'diva':      '<div style="font:400 150px/1 \'Bagel Fat One\';color:{c};letter-spacing:-.01em">diva</div>',
  'packaging': '<svg viewBox="0 0 100 100" width="330"><g fill="none" stroke="{c}" stroke-width="3.2" stroke-linejoin="round"><rect x="14" y="30" width="72" height="48" rx="3"/><path d="M14 32 L50 58 L86 32"/><path d="M50 12 l2.5 7 7 2.5 -7 2.5 -2.5 7 -2.5 -7 -7 -2.5 7 -2.5z" fill="{c}"/></g></svg>',
}
ST_BG = ["#0E4A38", "zebra", "#F6D4E0", "#1F1D24", "cheetah", "#0E4A38"]
ST_FG = ['#FBF9F6', '#1F1D24', '#0E4A38', '#F6D4E0', '#1F1D24', '#F6D4E0']

def bgcss(b):
    if b == 'zebra': return "url('../stickers/zebra-card.svg') center/cover,#FBF9F6"
    if b == 'cheetah': return "url('../stitches/site-v3/cheetah-tile.svg') 0 0/360px auto,#C49A64"
    return b

def cover(name, icon, bg, fg, brand, ring):
    plate = ''
    if bg in ('zebra', 'cheetah'):   # print backgrounds get a solid center disc so the icon stays clean
        plate = f'<div style="position:absolute;left:50%;top:50%;width:560px;height:560px;margin:-280px;border-radius:50%;background:#FBF9F6;box-shadow:0 0 0 8px {ring}"></div>'
    ringdiv = f'<div style="position:absolute;left:50%;top:50%;width:820px;height:820px;margin:-410px;border-radius:50%;border:4px solid {ring};opacity:.55"></div>'
    return (f'<div class="c" data-n="{brand}_{name.replace(" ","-")}" style="background:{bgcss(bg)}">{ringdiv}{plate}'
            f'<div style="position:relative;z-index:2;display:flex;align-items:center;justify-content:center;transform:scale(1.55)">{icon.replace("{c}", fg)}</div></div>')

html = ['''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=DM+Serif+Display&family=Bagel+Fat+One&display=swap" rel="stylesheet">
<style>body{margin:0;display:flex;flex-wrap:wrap;gap:20px;width:7000px;background:#888}
.c{position:relative;width:1080px;height:1920px;display:flex;align-items:center;justify-content:center;overflow:hidden}</style></head><body>''']
for i, (n, ic) in enumerate(IDO_ICONS.items()):
    html.append(cover(n, ic, IDO_BG[i], IDO_FG[i], 'IDo', G))
for i, (n, ic) in enumerate(ST_ICONS.items()):
    fg = ST_FG[i]
    if n == 'about' and ST_BG[i] != 'zebra' and ST_BG[i] in ('#0E4A38', '#1F1D24'):
        ic = ic.replace('logo-ink.png', '../stickers/MarisaStitches_Logo_cream_transparent.png').replace('../brand/../stickers/', '../stickers/')
    html.append(cover(n, ic, ST_BG[i], fg, 'Stitches', '#B8914A'))
html.append('</body></html>')
open('/home/user/marisa/highlights/covers.html', 'w').write(''.join(html))
print('ok')
