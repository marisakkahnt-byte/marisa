import os
D=os.path.dirname(os.path.abspath(__file__))
CSS="""*{box-sizing:border-box}body{margin:0;background:#777}p{margin:0}
:root{--cream:#FBF7F0;--ink:#2A241F;--gold:#B08D57;--gold2:#D9C08F;--blush:#F1DCD6;--wine:#7E2E2C}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;margin-bottom:10px;font-family:'Cormorant Garamond';color:var(--ink);background:var(--cream)}
.cap{font:600 22px 'Raleway';letter-spacing:.32em;text-transform:uppercase}
.mark{position:absolute;right:54px;bottom:40px;font:400 46px 'Pinyon Script';color:var(--wine)}
.n{position:absolute;right:44px;top:44px;font:600 20px 'Raleway';letter-spacing:.2em;color:var(--gold)}
.dk{background:var(--ink);color:var(--cream)}.dk .mark,.dk .n{color:var(--gold2)}
.drops{position:absolute;inset:0;background-image:radial-gradient(ellipse 2px 18px at 50% 50%,rgba(217,192,143,.35),transparent 70%);background-size:90px 140px;opacity:.6}
.c1 .k{position:absolute;left:90px;top:150px;color:var(--gold2)}
.c1 h1{position:absolute;left:84px;right:80px;top:230px;margin:0;font:italic 400 150px/.92 'Cormorant Garamond';letter-spacing:-.03em}
.c1 .g{position:absolute;left:90px;top:760px;font:400 200px/1 'Pinyon Script';color:var(--gold2)}
.c1 .sub{position:absolute;left:92px;top:1040px;font:400 32px/1.4 Raleway;color:#d8cfc4}
.c2 .ph{position:absolute;left:0;right:0;top:70px;height:800px;display:flex;justify-content:center}.c2 .ph img{max-height:100%;border-radius:16px}
.c2 .q{position:absolute;left:100px;right:100px;top:900px;font:italic 400 58px/1.15 'Cormorant Garamond';text-align:center}
.c2 .who{position:absolute;left:0;right:0;top:1150px;text-align:center;color:var(--gold)}
.ls{padding:110px 90px}
.ls .t{font:italic 400 100px/.95 'Cormorant Garamond';letter-spacing:-.02em;margin-bottom:16px}
.ls .k{color:var(--gold);margin-bottom:50px}
.row{display:flex;gap:28px;padding:20px 0;border-bottom:1.5px solid #e7ddd0}
.row .d{flex:none;font:400 52px/1 'Pinyon Script';color:var(--wine);width:60px}
.row b{display:block;font:500 46px/1.05 'Cormorant Garamond'}
.row i{display:block;font:400 26px/1.35 Raleway;color:#6d5d55;margin-top:6px;font-style:normal}
.bl{background:var(--blush)}
"""
M='<div class="mark">I Do by Marisa</div>'
S=[]
S.append(f'<section class="s dk c1" id="rain1"><div class="drops"></div><p class="cap k">a hot take from your officiant</p><h1>rain on your wedding day?</h1><p class="g">good.</p><p class="sub">swipe. i’ll explain.</p>{M}</section>')
S.append(f'<section class="s c2" id="rain2"><p class="n">02</p><div class="ph"><img src="me.jpg"></div><p class="q">i love rain. people call it gloomy.<br>i think it’s beautiful and calming.</p><p class="cap who">marisa, on a wet boardwalk</p>{M}</section>')
R=[('it’s good luck','the saying goes: a wet knot is harder to untie. you’re literally tying the knot.'),
   ('the light is softer','overcast skies are a photographer’s dream. no squinting, no harsh shadows.'),
   ('everyone leans in','guests huddle close under umbrellas. it gets cozy fast.'),
   ('clear umbrellas = iconic photos','seriously. buy a dozen and thank me later.'),
   ('it becomes the story','nobody retells “it was 72 and sunny.” they retell the rain.')]
rows=''.join(f'<div class="row"><div class="d">{i}</div><div><b>{t}</b><i>{d}</i></div></div>' for i,(t,d) in enumerate(R,1))
S.append(f'<section class="s ls" id="rain3"><p class="n">03</p><p class="t">why rain is a gift</p><p class="cap k">from someone who’s stood in it</p>{rows}{M}</section>')
P=[('ask your venue for the rain plan now','not the week of. now.'),
   ('pick your covered spot like it’s plan A','because it might be.'),
   ('i keep the script dry','it lives in my portfolio. your vows are safe with me.')]
rows2=''.join(f'<div class="row"><div class="d">✓</div><div><b>{t}</b><i>{d}</i></div></div>' for t,d in P)
S.append(f'<section class="s ls bl" id="rain4"><p class="n">04</p><p class="t">the calm-girl rain plan</p><p class="cap k">so the forecast can’t touch you</p>{rows2}<p style="margin-top:60px;font:italic 400 46px/1.2 \'Cormorant Garamond\'">rain or shine, your story gets told.</p>{M}</section>')
fonts='<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Pinyon+Script&family=Raleway:wght@400;500;600&display=swap" rel="stylesheet">'
open(os.path.join(D,'rain.html'),'w').write('<!doctype html><html><head><meta charset="utf-8">'+fonts+'<style>'+CSS+'</style></head><body>'+''.join(S)+'</body></html>')
