"""Officiant-bag carousel, Mary & Pip-ish vibe in I Do branding."""
import os
D=os.path.dirname(os.path.abspath(__file__))
CSS="""*{box-sizing:border-box}body{margin:0;background:#777}p{margin:0}
:root{--cream:#FBF7F0;--ink:#2A241F;--gold:#B08D57;--gold2:#D9C08F;--blush:#F1DCD6;--wine:#7E2E2C}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;margin-bottom:10px;background:var(--cream);color:var(--ink);font-family:'Cormorant Garamond'}
.cap{font:600 22px 'Raleway';letter-spacing:.32em;text-transform:uppercase}
.mark{position:absolute;right:54px;bottom:40px;font:400 46px 'Pinyon Script';color:var(--wine)}
.n{position:absolute;right:44px;top:44px;font:600 20px 'Raleway';letter-spacing:.2em;color:var(--gold)}
/* cover */
.cv .ph{position:absolute;left:90px;right:90px;top:90px;height:820px;display:flex;justify-content:center}.cv .ph img{max-height:100%;max-width:100%;border-radius:14px;transform:rotate(-2deg);box-shadow:0 18px 40px rgba(42,36,31,.18)}
.cv .tape{position:absolute;top:70px;left:50%;width:180px;height:44px;background:rgba(217,192,143,.6);transform:translateX(-50%) rotate(3deg)}
.cv .h{position:absolute;left:80px;right:80px;top:960px;font:italic 400 110px/.95 'Cormorant Garamond';letter-spacing:-.02em}
.cv .k{position:absolute;left:84px;top:1180px;color:var(--gold)}
/* list */
.ls{padding:110px 90px}
.ls .t{font:italic 400 96px/.95 'Cormorant Garamond';letter-spacing:-.02em;margin-bottom:14px}
.ls .k{color:var(--gold);margin-bottom:60px}
.row{display:flex;gap:30px;align-items:flex-start;padding:26px 0;border-bottom:1.5px solid #e7ddd0}
.box{flex:none;width:44px;height:44px;border:2px solid var(--ink);border-radius:6px;margin-top:8px;position:relative}
.box.on::after{content:'✓';position:absolute;left:6px;top:-14px;font:600 48px 'Raleway';color:var(--wine)}
.row b{display:block;font:500 50px/1.05 'Cormorant Garamond'}
.row i{display:block;font:400 28px/1.35 'Raleway';color:#6d5d55;margin-top:6px;font-style:normal}
/* big */
.bg2{background:var(--wine);color:var(--cream)}
.bg2 .k{position:absolute;left:90px;top:120px;color:var(--gold2)}
.bg2 .q{position:absolute;left:90px;right:90px;top:250px;font:italic 400 124px/.94 'Cormorant Garamond';letter-spacing:-.03em}
.bg2 .q s{text-decoration-thickness:6px;text-decoration-color:var(--gold2)}
.bg2 .foot{position:absolute;left:90px;right:90px;top:1020px;font:400 34px/1.45 'Raleway';color:#efdcd8}
.bg2 .mark{color:var(--gold2)}
/* end */
.en{background:var(--blush);text-align:center}
.en .q{position:absolute;left:100px;right:100px;top:360px;font:italic 400 104px/1 'Cormorant Garamond'}
.en .k{position:absolute;left:0;right:0;top:760px;color:var(--wine)}
"""
M='<div class="mark">I Do by Marisa</div>'
S=[]
S.append(f'<section class="s cv" id="bag1"><div class="ph"><img src="bookcert.jpg"></div><div class="tape"></div><p class="h">what’s in my bag,<br>officiant edition</p><p class="cap k">swipe · you’re gonna judge the pens</p>{M}</section>')
items=[(1,'the script','printed, 14-pt, in the black book. never on my phone. i’m not a monster.'),
       (1,'muji gel pens (plural)','the license deserves the good pen. one always gets borrowed. it never comes back.'),
       (1,'the certificate','the prettiest piece of paper you’ll sign all day.'),
       (1,'tissues','for the groom. it’s always the groom.'),
       (0,'chill','left it at home. you won’t catch me crying first. (i will.)')]
rows=''.join(f'<div class="row"><div class="box{" on" if c else ""}"></div><div><b>{t}</b><i>{d}</i></div></div>' for c,t,d in items)
S.append(f'<section class="s ls" id="bag2"><p class="n">02</p><p class="t">the packing list</p><p class="cap k">every ceremony, no exceptions</p>{rows}{M}</section>')
S.append(f'<section class="s bg2" id="bag3"><p class="n" style="color:#D9C08F">03</p><p class="cap k">a hill i will die on</p><p class="q">friends don’t let friends sign a marriage license with a hotel pen.</p><p class="foot">muji gel pens only. smooth, no smudge, looks great in your photos. you’re welcome.</p>{M}</section>')
S.append(f'<section class="s en" id="bag4"><p class="n">04</p><p class="q">you bring the vows.<br>i’ll bring<br>the good pen.</p><p class="cap k">booking 2027 · link in bio</p>{M}</section>')
fonts='<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Pinyon+Script&family=Raleway:wght@400;500;600&display=swap" rel="stylesheet">'
open(os.path.join(D,'bag.html'),'w').write('<!doctype html><html><head><meta charset="utf-8">'+fonts+'<style>'+CSS+'</style></head><body>'+''.join(S)+'</body></html>')
