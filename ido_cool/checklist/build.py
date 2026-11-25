"""Monthly checklist series (1080x1350): typewriter cover + checklist card. Moody brand background, no third-party photos."""
import os
D = os.path.dirname(os.path.abspath(__file__))
GRAIN = '<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .6 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>'
CSS = """*{box-sizing:border-box}body{margin:0;background:#777}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;margin-bottom:10px;background:radial-gradient(ellipse at 35% 30%,#9a4a45,#5a2624 45%,#2A241F 85%)}
.s.b{background:radial-gradient(ellipse at 65% 40%,#c9a7a0,#7E2E2C 50%,#2A241F 90%)}
.grain{position:absolute;inset:0;mix-blend-mode:overlay;opacity:.6}
.blur{position:absolute;inset:0;backdrop-filter:blur(2px)}
.title{margin:0;position:absolute;left:50px;right:40px;top:480px;font:400 128px/1 'Courier Prime',monospace;color:#FBF7F0;letter-spacing:-.02em}
.tsub{margin:0;position:absolute;right:50px;top:760px;font:400 40px 'Courier Prime',monospace;color:#F1DCD6}
.mark{position:absolute;left:50px;bottom:50px;font:400 54px 'Pinyon Script';color:#FBF7F0}
.n{position:absolute;right:40px;top:40px;background:rgba(0,0,0,.35);color:#fff;font:600 26px 'Raleway';padding:8px 20px;border-radius:999px}
.card{position:absolute;left:36px;right:36px;top:190px;background:rgba(251,247,240,.96);padding:50px 44px 40px}
.card h2{margin:0 auto 30px;width:fit-content;font:400 116px/1 'Cormorant Garamond';letter-spacing:.04em;color:#7E2E2C;border-bottom:3px solid #7E2E2C;padding:0 20px 8px}
.row{display:flex;align-items:center;gap:22px;margin:0 0 30px;font:400 37px/1.2 'Courier Prime',monospace;color:#2A241F}
.bx{flex:none;width:46px;height:46px;border:2.5px solid #2A241F;display:grid;place-items:center;font:700 40px 'Raleway';line-height:1}
.handle{position:absolute;left:0;right:0;bottom:70px;text-align:center;font:400 34px 'Courier Prime',monospace;color:#F1DCD6}"""
LISTS = {
 'engaged': ('Just-Engaged', 'Checklist', 'for the first month of “we’re engaged!”', ['tell your people', 'add the ring to your insurance', 'set a rough budget', 'pick a season, not a date', 'decide who’s marrying you', 'book your officiant 3–6 months out', 'take one week off from planning'], 'write about a tuesday (later)'),
 'officiant': ('Officiant', 'Checklist', 'for the friend who said yes', ['get ordained (check your state’s rules)', 'ask the county clerk about the license', 'get a script written from their story', 'print it big, in a binder', 'practice out loud. twice.', 'learn how to say every name', 'step aside for the kiss'], 'sign + return the license on time'),
 'vows': ('Vow', 'Checklist', 'for writing yours this month', ['agree on a length (1–2 minutes)', 'agree on a tone together', 'write about a random tuesday', 'one promise that’s funny', 'one promise that’s serious', 'read it out loud + time it', 'print it. never your phone.'], 'cry (optional)'),
}
S = []
for k, (t1, t2, sub, items, last) in LISTS.items():
    S.append(f'<section class="s" id="{k}1"><div class="n">1/2</div>{GRAIN}<p class="title">{t1}<br>{t2}</p><p class="tsub">{sub}</p><div class="mark">I Do by Marisa</div></section>')
    rows = ''.join(f'<div class="row"><span class="bx">✓</span>{x}</div>' for x in items) + f'<div class="row"><span class="bx"></span>{last}</div>'
    S.append(f'<section class="s b" id="{k}2"><div class="n">2/2</div>{GRAIN}<div class="card"><h2>CHECKLIST</h2>{rows}</div><p class="handle">@idobymarisa</p><div class="mark" style="left:auto;right:50px;bottom:50px;font-size:44px">I Do by Marisa</div></section>')
fonts = '<link href="https://fonts.googleapis.com/css2?family=Courier+Prime&family=Cormorant+Garamond&family=Pinyon+Script&family=Raleway:wght@600;700&display=swap" rel="stylesheet">'
open(os.path.join(D, 'cl.html'), 'w').write('<!doctype html><html><head><meta charset="utf-8">' + fonts + '<style>' + CSS + '</style></head><body>' + ''.join(S) + '</body></html>')
