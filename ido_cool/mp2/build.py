"""Mary & Pip-inspired round 2 (1080x1350): ceremony mantras, 'the 3 things every ceremony needs', Weddingland weekly template."""
import os
D = os.path.dirname(os.path.abspath(__file__))
GRAIN = '<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .55 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>'
CSS = """*{box-sizing:border-box}body{margin:0;background:#777}p{margin:0}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;margin-bottom:10px}
.grain{position:absolute;inset:0;mix-blend-mode:overlay;opacity:.5;pointer-events:none}
.mark{position:absolute;right:50px;bottom:44px;font:400 50px 'Pinyon Script';color:#FBF7F0;opacity:.9}
.n{position:absolute;right:40px;top:40px;background:rgba(0,0,0,.3);color:#fff;font:600 24px 'Raleway';padding:8px 18px;border-radius:999px}
.mantra{position:absolute;left:70px;right:70px;top:0;bottom:0;display:flex;align-items:center;justify-content:center;text-align:center;font:italic 400 118px/1.08 'Cormorant Garamond';color:#FBF7F0;letter-spacing:-.01em;text-shadow:0 2px 14px rgba(0,0,0,.2)}
.mantra.dk{color:#2A241F;text-shadow:none}
.ret{background:radial-gradient(ellipse at 50% 35%,#B08D57,#5a4a3e 55%,#2A241F 95%);color:#FBF7F0}
.ret .h{position:absolute;left:60px;right:60px;top:520px;text-align:center;font:italic 400 108px/1 'Cormorant Garamond';letter-spacing:-.02em;color:#FBF7F0;text-shadow:0 3px 20px rgba(0,0,0,.35)}
.ret .p{position:absolute;left:110px;right:110px;top:760px;text-align:center;font:400 40px/1.35 'Raleway';color:#F1DCD6}
.wl{background:#2A241F;color:#FBF7F0}
.wl .pill{position:absolute;left:50%;top:60px;transform:translateX(-50%);border:2px solid #FBF7F0;border-radius:50%;padding:16px 70px;font:600 26px 'Cormorant Garamond';letter-spacing:.12em}
.wl .a{position:absolute;left:60px;top:200px;font:500 112px/1 'Cormorant Garamond';letter-spacing:-.03em}
.wl .b{position:absolute;left:40px;top:330px;font:400 190px/1 'Pinyon Script';color:#D9C08F}
.wl .box{position:absolute;left:70px;right:60px;top:640px;bottom:140px;border-left:2px solid #FBF7F0;border-top:2px solid #FBF7F0;padding:40px 40px}
.wl .box p{margin:0;font:400 68px/1.02 'Cormorant Garamond';width:560px}
.wl .ph{position:absolute;right:30px;bottom:30px;width:420px;height:420px;border-radius:50%;background:repeating-linear-gradient(120deg,#4a3f36 0 24px,#3a322b 24px 48px);display:flex;align-items:center;justify-content:center;font:600 20px 'Raleway';letter-spacing:.2em;color:#c9a7a0;text-align:center}
.it{background:#2A241F;color:#FBF7F0}
.it .img{position:absolute;left:0;top:0;width:500px;height:760px;border-radius:0 0 30px 0;background:repeating-linear-gradient(120deg,#e9dfd2 0 30px,#e2d6c7 30px 60px);display:flex;align-items:center;justify-content:center;font:600 22px 'Raleway';letter-spacing:.2em;color:#9a8a7a;text-align:center}
.it .tag{position:absolute;left:20px;top:40px;writing-mode:vertical-rl;transform:rotate(180deg);font:700 44px 'Raleway';color:#fff;letter-spacing:.06em}
.it .num{position:absolute;left:540px;top:40px;font:italic 400 110px 'Cormorant Garamond'}
.it .hl{position:absolute;left:540px;right:40px;top:190px;font:500 64px/1.12 'Raleway';text-transform:uppercase}
.it .card{position:absolute;left:540px;right:30px;top:470px;height:290px;background:#FBF7F0;color:#2A241F;border-radius:30px;padding:28px;font:400 30px/1.35 'Raleway'}
.it .lesson{position:absolute;left:50px;right:50px;top:820px;font:400 38px/1.42 'Raleway'}
.it .src{position:absolute;left:50px;bottom:50px;font:400 24px 'Raleway';opacity:.75}"""
S = []
BG = ['radial-gradient(ellipse at 50% 35%,#9a4a45,#7E2E2C 55%,#3a1716)', 'radial-gradient(ellipse at 40% 30%,#FBF7F0,#F1DCD6 60%,#d9b3aa)',
      'radial-gradient(ellipse at 60% 40%,#5a4a3e,#2A241F 70%)', 'radial-gradient(ellipse at 50% 40%,#e8d8b8,#D9C08F 55%,#B08D57)',
      'radial-gradient(ellipse at 30% 40%,#F1DCD6,#c98f86 60%,#7E2E2C)', 'radial-gradient(ellipse at 50% 40%,#FBF7F0,#efe4d4 75%,#e2d2bd)']
M = ['more meaning it.<br>less performing.', 'say it like<br>you’d text it.', 'short is<br>not small.', 'your story<br>over a template.', 'breathe.<br>then say i do.', 'it doesn’t have<br>to be perfect.<br>it has to be true.']
for i, (b, m) in enumerate(zip(BG, M), 1):
    dk = ' dk' if i in (2, 4, 6) else ''
    S.append(f'<section class="s" id="mantra{i}" style="background:{b}"><div class="n">{i}/6</div>{GRAIN}<p class="mantra{dk}">{m}</p><div class="mark"{" style=color:#2A241F" if dk else ""}>I Do by Marisa</div></section>')
T = [('the 3 things<br>every ceremony needs', 'swipe →'), ('1. a real story', 'how you met, the tuesday, the inside joke. not a template with your names swapped in.'),
     ('2. a moment<br>to breathe', 'one pause before the vows. it feels long. it isn’t. everyone remembers it.'),
     ('3. someone who<br>knows you', 'me, or your best friend with a script i wrote and the coaching to deliver it.')]
for i, (h, p) in enumerate(T, 1):
    S.append(f'<section class="s ret" id="three{i}"><div class="n">{i}/4</div>{GRAIN}<p class="h">{h}</p><p class="p">{p}</p><div class="mark">I Do by Marisa</div></section>')
S.append(f'<section class="s wl" id="wl1">{GRAIN}<div class="pill">I DO BY MARISA</div><p class="a">What’s happening in</p><p class="b">Weddingland</p>'
         '<div class="box"><p>what couples are talking about this week and why you should care</p></div><div class="ph">YOUR PHOTO<br>OR A COLLAGE<br>OF YOUR OWN SHOTS</div></section>')
S.append(f'<section class="s it" id="wl2">{GRAIN}<div class="img">YOUR PHOTO</div><div class="tag">TRENDS</div><div class="num">01</div>'
         '<div class="hl">[HEADLINE OF<br>THE WEEK]</div><div class="card">[2–3 sentences on what happened, with the real numbers from a real source.]</div>'
         '<p class="lesson"><b>The lesson:</b> [what this means for your ceremony, in one or two plain sentences. This is where your officiant brain shines.]</p>'
         '<p class="src">Source: [publication]</p><div class="mark" style="font-size:40px">I Do by Marisa</div></section>')
fonts = '<link href="https://fonts.googleapis.com/css2?family=Patrick+Hand+SC&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Pinyon+Script&family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet">'
open(os.path.join(D, 'mp2.html'), 'w').write('<!doctype html><html><head><meta charset="utf-8">' + fonts + '<style>' + CSS + '</style></head><body>' + ''.join(S) + '</body></html>')
