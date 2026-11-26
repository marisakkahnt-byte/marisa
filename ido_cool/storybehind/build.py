"""I Do series: The Story Behind (wedding traditions, explained in Marisa's voice)."""
import os
D=os.path.dirname(os.path.abspath(__file__))
CSS="""*{box-sizing:border-box}body{margin:0;background:#777}p{margin:0}
:root{--cream:#FBF7F0;--ink:#2A241F;--gold:#B08D57;--gold2:#D9C08F;--blush:#F1DCD6;--wine:#7E2E2C}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;margin-bottom:10px;font-family:'Cormorant Garamond';color:var(--ink);background:var(--cream)}
.cap{font:600 22px 'Raleway';letter-spacing:.32em;text-transform:uppercase}
.mark{position:absolute;right:54px;bottom:40px;font:400 46px 'Pinyon Script';color:var(--wine)}
.n{position:absolute;right:44px;top:44px;font:600 20px 'Raleway';letter-spacing:.2em;color:var(--gold)}
.cv{background:var(--ink);color:var(--cream)}.cv .mark,.cv .n{color:var(--gold2)}
.cv .ph{position:absolute;left:0;right:0;top:80px;height:640px;display:flex;justify-content:center}.cv .ph img{max-height:100%;max-width:900px;border-radius:300px 300px 14px 14px}
.cv .tsb{position:absolute;left:0;right:0;top:770px;text-align:center;font:400 84px/1 'Pinyon Script';color:var(--gold2)}
.cv h1{position:absolute;left:80px;right:80px;top:880px;margin:0;text-align:center;font:italic 400 92px/.98 'Cormorant Garamond';letter-spacing:-.02em}
.cv .iss{position:absolute;left:0;right:0;top:1150px;text-align:center;color:var(--gold2)}
.st{padding:130px 100px}
.st .k{color:var(--gold);margin-bottom:40px}
.st .body{font:400 50px/1.32 'Cormorant Garamond'}
.st .body em{color:var(--wine)}
.mk{background:var(--blush);padding:110px 90px}
.mk .t{font:italic 400 96px/.95 'Cormorant Garamond';margin-bottom:14px}
.mk .k{color:var(--wine);margin-bottom:40px}
.row{display:flex;gap:26px;padding:20px 0;border-bottom:1.5px solid #e3c9c1;font:400 40px/1.2 'Cormorant Garamond'}
.row span{font:400 40px/1 'Pinyon Script';color:var(--wine);width:40px;flex:none}
.note{margin-top:50px;font:italic 400 44px/1.25 'Cormorant Garamond'}
.note b{display:block;font:600 20px 'Raleway';letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;font-style:normal}
"""
M='<div class="mark">I Do by Marisa</div>'
I=[('blue','blue.jpg','something old,<br>something new',
 'it comes from an old english rhyme: <em>something old, something new, something borrowed, something blue, and a sixpence in her shoe.</em><br><br>old for where you come from. new for where you’re going. borrowed for the people who love you. blue for faithfulness. the sixpence? a little luck for the road.',
 ['old: grandma’s ring, sewn into your hem','new: the shoes you’ll actually dance in','borrowed: your mom’s earrings','blue: a ribbon on your bouquet, or the ink in your vows'],
 'it lets the people you love tuck a piece of themselves into your day.'),
('knot','knot.jpg','tying<br>the knot',
 'long before rings, couples had their hands tied together with ribbon or cord. it’s called <em>handfasting</em>, and it’s where “tying the knot” comes from.<br><br>a promise you could see. and hold.',
 ['a ribbon in your wedding colors','let your grandparents tie it','keep the cord and frame it later','pair it with your vows, not instead of them'],
 'it takes about a minute, and you get to keep it forever.'),
('ring','ring.jpg','the ring<br>finger',
 'the ancient romans believed a vein ran straight from the fourth finger of the left hand to the heart. they called it the <em>vena amoris</em>, the vein of love.<br><br>science says no. romance says yes.',
 ['engrave something only you two get','a date, a place, an inside joke','your handwriting, scanned and etched','a word from your vows'],
 'the inside of a ring is the smallest place to tell a story. use it.'),
('left','left.jpg','who stands<br>where',
 'the old story: the groom stood on the right so his sword hand stayed free to defend his bride.<br><br>no swords these days (hopefully). so this one’s yours to rewrite. <em>tradition is a suggestion, not a rule.</em>',
 ['stand wherever your best angle is','face your favorite view','switch it. nobody’s checking.','tell me your sides. i’ll plan the cues.'],
 'your ceremony, your sides. i’ll make it look like it was always the plan.'),
('warm','warm.jpg','the ring<br>warming',
 'before the rings are exchanged, they get passed through the crowd. every guest holds them for a second and adds a silent wish, a hope, or a little advice.<br><br>alyssa &amp; gerard did one this fall. by the time their rings reached the front, <em>they were carrying the whole room.</em>',
 ['tie them to a ribbon or a little pouch','small crowd? pass them hand to hand','big crowd? just the front rows, or cocktail hour','i’ll explain it so nobody’s confused'],
 'my favorite modern touch. everyone gets to be part of the promise.')]
S=[]
for n,(id,img,title,story,mk,note) in enumerate(I,1):
    S.append(f'<section class="s cv" id="{id}1"><div class="ph"><img src="{img}"></div><p class="tsb">the story behind</p><h1>{title}</h1><p class="cap iss">no. {n:02d} · swipe</p>{M}</section>')
    S.append(f'<section class="s st" id="{id}2"><p class="n">02</p><p class="cap k">the story</p><p class="body">{story}</p>{M}</section>')
    rows=''.join(f'<div class="row"><span>✦</span>{x}</div>' for x in mk)
    S.append(f'<section class="s mk" id="{id}3"><p class="n">03</p><p class="t">make it yours</p><p class="cap k">ideas for your day</p>{rows}<p class="note"><b>from your officiant</b>{note}</p>{M}</section>')
fonts='<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Pinyon+Script&family=Raleway:wght@400;500;600&display=swap" rel="stylesheet">'
open(os.path.join(D,'sb.html'),'w').write('<!doctype html><html><head><meta charset="utf-8">'+fonts+'<style>'+CSS+'</style></head><body>'+''.join(S)+'</body></html>')
