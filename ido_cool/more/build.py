"""I Do extras: '2026, in lines' carousel, book-photo series covers, officiant-bag Reel cover, Lisa & Anthony text slide."""
import os
D = os.path.dirname(os.path.abspath(__file__))
CSS = """*{box-sizing:border-box}body{margin:0;background:#777}p{margin:0}
:root{--cream:#FBF7F0;--ink:#2A241F;--gold:#B08D57;--gold2:#D9C08F;--blush:#F1DCD6;--wine:#7E2E2C}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;margin-bottom:10px;font-family:'Cormorant Garamond';color:var(--ink)}
.tall{height:1920px}
.cap{font:600 22px 'Raleway';letter-spacing:.32em;text-transform:uppercase}
.mark{position:absolute;right:54px;bottom:44px;font:400 46px 'Pinyon Script'}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.fade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(42,36,31,0) 35%,rgba(42,36,31,.82) 100%)}
.n{position:absolute;right:40px;top:40px;background:rgba(0,0,0,.28);color:#fff;font:600 22px 'Raleway';padding:8px 18px;border-radius:999px}
/* lines */
.dk{background:var(--ink);color:var(--cream);text-align:center}
.dk .y{position:absolute;left:0;right:0;top:300px;font:400 230px/1 'Pinyon Script';color:var(--gold2)}
.dk .t{position:absolute;left:0;right:0;top:560px;font:italic 400 92px 'Cormorant Garamond'}
.dk .sub{position:absolute;left:140px;right:140px;top:760px;font:400 34px/1.5 'Raleway';color:#d8cfc4}
.ln{background:var(--cream)}
.ln .ph{position:absolute;left:70px;right:70px;top:70px;height:700px;border-radius:24px;background-size:cover;background-position:center}
.ln .q{position:absolute;left:90px;right:90px;top:830px;font:italic 400 60px/1.15 'Cormorant Garamond'}
.ln .who{position:absolute;left:90px;top:1180px;color:var(--gold)}
.ln .mark{color:var(--wine)}
/* covers */
.cv .ttl{position:absolute;left:70px;right:70px;bottom:150px;color:var(--cream)}
.cv .ttl .k{color:var(--gold2);margin-bottom:18px}
.cv .ttl .h{font:400 150px/1 'Pinyon Script'}
.cv .ttl .d{font:italic 400 50px/1.2 'Cormorant Garamond';margin-top:16px}
.cv .mark{color:var(--cream)}
.pn .bg{bottom:430px}.tall.pn .bg{bottom:620px}
.pn .panel{position:absolute;left:0;right:0;bottom:0;height:430px;background:var(--cream);padding:60px 70px;color:var(--ink)}
.tall.pn .panel{height:620px;padding-top:110px}
.pn .panel .k{color:var(--gold);margin-bottom:14px}.pn .panel .h{font:400 120px/1 'Pinyon Script';color:var(--wine)}
.pn .panel .d{font:italic 400 44px/1.2 'Cormorant Garamond';margin-top:14px}.pn .mark{color:var(--wine)}
/* lisa */
.la{background:var(--blush);text-align:center}
.la .nm{position:absolute;left:0;right:0;top:160px;font:400 100px/1 'Pinyon Script';color:var(--wine)}
.la .k{position:absolute;left:0;right:0;top:320px;color:var(--gold)}
.la .card{position:absolute;left:90px;right:90px;top:430px;bottom:300px;background:var(--cream);border-radius:24px;display:flex;flex-direction:column;justify-content:center;padding:70px}
.la .card p{font:italic 400 66px/1.15 'Cormorant Garamond'}
.la .card small{margin-top:36px;color:var(--gold)}
.la .foot{position:absolute;left:0;right:0;top:1100px;font:400 32px 'Raleway';color:#6d5d55}
.la .mark{color:var(--wine)}
"""
M = '<div class="mark">I Do by Marisa</div>'
S = []
S.append('<section class="s dk" id="lines0"><p class="y">2026</p><p class="t">in a few lines</p>'
         '<p class="sub">a handful of my favorite lines from this year’s ceremonies, shared with the couples’ blessing 🤍</p><div class="mark" style="color:#D9C08F">I Do by Marisa</div></section>')
L = [('kj.jpg', 'their vows promised love through “the road trips and the ordinary Tuesdays.”', 'Kristen &amp; John'),
     ('ar.jpg" data-top="1', 'a forgotten shuttle, a missed ferry, and a Tigers playoff game. never the plan. always better.', 'Amber &amp; Ryan'),
     ('aa.jpg', 'her parents and both sets of her grandparents were married this same weekend. now it’s theirs too.', 'Avance &amp; Alex'),
     ('cd.jpg', 'in their world, a pinky promise is binding. (exceptions for gifts and surprises only.)', 'Catherine &amp; David')]
for i, (img, q, who) in enumerate(L, 1):
    S.append(f'<section class="s ln" id="lines{i}"><div class="n">{i+1}/6</div><div class="ph" style="background-image:url(img/{img.split(chr(34))[0]});background-position:{'center top' if 'data-top' in img else 'center'}"></div><p class="q">{q}</p><p class="cap who">{who}</p>{M}</section>')
S.append('<section class="s dk" id="lines5"><p class="t" style="top:330px">your story</p><p class="y" style="top:450px;font-size:200px">is next</p>'
         '<p class="sub" style="top:820px">booking 2027 weddings in Metro Detroit, and ceremony scripts anywhere. i marry you, or i write the words for the friend who does.</p><div class="mark" style="color:#D9C08F">I Do by Marisa</div></section>')
S.append(f'<section class="s cv" id="aecover"><div class="bg" style="background-image:url(img/book1.jpg)"></div><div class="fade"></div><div class="ttl"><p class="cap k">issue no. 01</p><p class="h">the Altar Edit</p><p class="d">what’s happening in weddings,<br>and what it means for your ceremony</p></div>{M}</section>')
S.append(f'<section class="s pn" id="tuecover"><div class="bg" style="background-image:url(img/book2.jpg);background-position:center 70%"></div><div class="panel"><p class="cap k">a new vow prompt every tuesday</p><p class="h" style="font-size:92px">Write about a Tuesday</p><p class="d">screenshot it · write 3 sentences · save them for your vows</p></div>{M}</section>')
S.append(f'<section class="s pn tall" id="bagcover"><div class="bg" style="background-image:url(img/bookcert.jpg)"></div><div class="panel"><p class="cap k">officiant edition</p><p class="h">what’s in my bag</p><p class="d">everything i bring to your ceremony</p></div><div class="mark" style="bottom:240px">I Do by Marisa</div></section>')
S.append(f'<section class="s la" id="lisa"><p class="nm">Lisa Marie &amp; Anthony</p><p class="cap k">a gazebo · a september afternoon</p>'
         '<div class="card"><p>no aisle, no music, no big production. they walked up holding hands, both in Chuck Taylors.</p><small class="cap">“it took us fifty years to find each other.” · Anthony</small></div>'
         f'<p class="foot">every word of this ceremony came from their story</p>{M}</section>')
fonts = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Pinyon+Script&family=Raleway:wght@400;500;600&display=swap" rel="stylesheet">'
open(os.path.join(D, 'more.html'), 'w').write('<!doctype html><html><head><meta charset="utf-8">' + fonts + '<style>' + CSS + '</style></head><body>' + ''.join(S) + '</body></html>')
