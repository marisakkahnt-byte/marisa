"""Monday Mantra on Marisa's stock photos (Dupe Photo, free to use). 1080x1350, brand type."""
import os
D = os.path.dirname(os.path.abspath(__file__)); PH = 'file://' + os.path.join(D, '..', 'stock')
M = [('moon', 'breathe.<br>then say i do.', 'center 55%'), ('candles', 'more meaning it.<br>less performing.', 'center 50%'),
     ('swans', 'your story<br>over a template.', 'center 60%'), ('pond', 'short is<br>not small.', 'center 50%'),
     ('pines', 'say it like<br>you’d text it.', 'center 50%'), ('dresses', 'it doesn’t have to be perfect.<br>it has to be true.', 'center 40%')]
CSS = """*{box-sizing:border-box}body{margin:0;background:#777}p{margin:0}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;margin-bottom:10px;background:#2A241F}
.ph{position:absolute;inset:0;background-size:cover;filter:sepia(.18) saturate(.85) brightness(.82) contrast(1.03)}
.sh{position:absolute;inset:0;background:linear-gradient(rgba(20,14,10,.62),rgba(20,14,10,.25) 45%,transparent 65%,rgba(20,14,10,.35))}
.k{position:absolute;left:0;right:0;top:110px;text-align:center;font:600 22px 'Raleway';letter-spacing:.42em;text-transform:uppercase;color:#D9C08F}
.m{position:absolute;left:70px;right:70px;top:210px;text-align:center;font:italic 400 104px/1.05 'Cormorant Garamond';color:#FBF7F0;text-shadow:0 2px 24px rgba(0,0,0,.45)}
.mark{position:absolute;right:50px;bottom:44px;font:400 48px 'Pinyon Script';color:#FBF7F0;text-shadow:0 2px 12px rgba(0,0,0,.4)}
.n{position:absolute;left:50px;bottom:56px;font:600 20px 'Raleway';letter-spacing:.3em;color:#FBF7F0;opacity:.85}"""
S = []
for i, (img, txt, pos) in enumerate(M, 1):
    fs = ' style="font-size:84px"' if len(txt) > 40 else ''
    S.append(f'<section class="s" id="m{i}"><div class="ph" style="background-image:url(\'{PH}/{img}.jpg\');background-position:{pos}"></div><div class="sh"></div>'
             f'<p class="k">monday mantra</p><p class="m"{fs}>{txt}</p><p class="n">{i}/6</p><div class="mark">I Do by Marisa</div></section>')
fonts = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital@1&family=Pinyon+Script&family=Raleway:wght@600&display=swap" rel="stylesheet">'
open(os.path.join(D, 'm.html'), 'w').write('<!doctype html><html><head><meta charset="utf-8">' + fonts + '<style>' + CSS + '</style></head><body>' + ''.join(S) + '</body></html>')
