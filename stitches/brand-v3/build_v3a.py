import os,sys
D=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,os.path.join(D,'..','sparkle'))
from gems import gem
sys.path.insert(0,D)
from patterns import cheetah,zebra,dots
def g(shape,color,size,x,y,rot=0): return gem(shape,color,size,x,y,rot)
# dotted i: dotless i with a gem dot
def I(color,sz):
  return f'<span class="i">ı{g("round",color,sz,0,0)}</span>'
def word(sz,colA='rose',colB='ame'):
  return f'<span class="wm" style="font-size:{sz}px;text-align:center;display:inline-block">mar{I(colA,int(sz*.2))}sa<br>st{I(colB,int(sz*.2))}tches</span>'
CSS="""*{box-sizing:border-box}body{margin:0;background:#F7F3EE;font-family:'DM Sans';color:#2B2B2B}p{margin:0}
.wrap{width:1600px;padding:60px 64px}
.top{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:1px solid #DDD3C6;padding-bottom:26px;margin-bottom:34px}
.k{font:700 13px 'DM Sans';letter-spacing:.32em;text-transform:uppercase;color:#8C857A}
h1{font:400 56px/1 'DM Serif Display';margin:10px 0 0;letter-spacing:-.02em}h1 i{color:#C2457A}
.card{background:#fff;border:1px solid #ECE4D8;border-radius:22px;padding:30px}
.row{display:grid;gap:24px;margin-bottom:24px}
.wm{font-family:'DM Serif Display';letter-spacing:-.045em;line-height:.9;white-space:nowrap}
.i{position:relative;display:inline-block}
.i svg{position:absolute!important;left:50%!important;top:.08em!important;transform:translate(-50%,0)!important}
.tile{border-radius:18px;height:290px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden}
.cap{position:absolute;bottom:16px;left:0;right:0;text-align:center;font:700 11px 'DM Sans';letter-spacing:.26em;text-transform:uppercase;color:#8C857A}
.sw{height:110px;border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;justify-content:flex-end;font:500 13px 'DM Sans'}
.sw b{font:700 15px 'DM Sans'}
.stripe{background:repeating-linear-gradient(90deg,#F6D4E0 0 34px,#FBE9EF 34px 68px)}
.lstripe{background:repeating-linear-gradient(90deg,#E4D8F3 0 34px,#F2ECFA 34px 68px)}
.rules li{margin:0 0 10px;font:400 17px/1.45 'DM Sans'}.rules b{font-weight:700}
"""
H=[]
H.append('<div class="top"><div><p class="k">Brand board · v3 · chic, with more sparkle + prints</p><h1>marisa stitches, <i>she’s a gem</i></h1></div><p style="font:400 20px DM Sans;color:#8C857A">clean base. real gems. pastel pops. a little cheetah.</p></div>')
# logos
L1=f'<div class="tile" style="background:#F4EFE7">{word(96)}<p class="cap">A · primary wordmark · gem-dotted i’s</p></div>'
L2=(f'<div class="tile" style="background:#fff;border:1px solid #ECE4D8"><div style="position:relative;width:170px;height:170px;border-radius:50%;background:#F6D4E0;display:flex;align-items:center;justify-content:center">'
    f'<span class="wm" style="font-size:118px;color:#2B2B2B">M</span>{g("star","dia",54,118,-6,12)}{g("heart","rose",40,-4,112,-14)}</div>'
    f'<p style="margin-top:22px;font:700 14px DM Sans;letter-spacing:.34em">MARISA STITCHES</p><p class="cap">B · M badge · profile pic + labels</p></div>')
L3=(f'<div class="tile" style="background:#1F1D24;color:#F4EFE7">{g("pear","ruby",44,70,40,-20)}{g("star","dia",50,560,50,10)}{g("emerald","em",40,540,190,8)}{g("heart","ame",36,90,200,-8)}'
    f'<span class="wm" style="font-size:72px">she’s a gem</span><p style="font:700 13px DM Sans;letter-spacing:.34em;color:#BDB3C9;margin-top:16px">MARISA STITCHES</p><p class="cap" style="color:#8C849A">C · tagline lockup · posts, stickers, tags</p></div>')
H.append(f'<div class="card" style="margin-bottom:24px"><p class="k" style="margin-bottom:18px">01 · logo (pick one, or use A + B together)</p><div class="row" style="grid-template-columns:1.25fr 1fr 1fr;margin:0">{L1}{L2}{L3}</div></div>')
# palette
P=[('Oat','#F4EFE7','backgrounds'),('Linen','#FBF9F6','pages'),('Ink','#1F1D24','dark posts, text'),('Blush','#F6D4E0','pastel pop'),('Lilac','#E4D8F3','pastel pop'),('Hot pink','#E8509A','print pop'),('Greige','#D9D3C7','lines, cards')]
sw=''.join(f'<div class="sw" style="background:{c};{"color:#F4EFE7" if n=="Ink" else ""};border:1px solid #ECE4D8"><b>{n}</b>{c} · {u}</div>' for n,c,u in P)
G=[('round','rose','Rose'),('pear','sap','Sapphire'),('emerald','em','Emerald'),('heart','ruby','Ruby'),('oval','ame','Amethyst'),('pear','cit','Citrine'),('round','aqua','Aqua'),('star','dia','Crystal')]
gems=''.join(f'<div style="position:relative;height:110px;text-align:center"><div style="position:relative;width:80px;height:80px;margin:0 auto">{g(s,c,80,0,0)}</div><p style="font:500 13px DM Sans;margin-top:6px">{n}</p></div>' for s,c,n in G)
H.append(f'<div class="row" style="grid-template-columns:1.4fr 1fr"><div class="card"><p class="k" style="margin-bottom:16px">02 · palette: clean base + two pastel pops</p><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:10px">{sw}</div>'
 f'<p class="k" style="margin:26px 0 14px">gems: real cut stones + crystal stars</p><div style="display:grid;grid-template-columns:repeat(8,1fr);gap:8px">{gems}</div></div>'
 f'<div class="card"><p class="k" style="margin-bottom:16px">03 · stripes + sky</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
 f'<div class="tile stripe" style="height:150px"><p class="cap" style="color:#9E2E5F">blush stripe</p></div><div class="tile lstripe" style="height:150px"><p class="cap" style="color:#5C3E8A">lilac stripe</p></div>'
 f'<div class="tile" style="height:150px;background:#1F1D24">{g("star","dia",30,40,30)}{g("star","dia",20,180,90)}{g("round","rose",26,120,40)}<p class="cap" style="color:#8C849A">night sky</p></div>'
 f'<div class="tile" style="height:150px;background:#C9A882">{g("heart","rose",22,30,30)}{g("round","sap",16,150,40)}{g("star","dia",22,90,90)}{g("emerald","em",16,200,100)}<p class="cap" style="color:#5B4630">bedazzled kraft</p></div></div></div></div>')
PR=[('cheetah · blush',cheetah('#F6D4E0','#E8509A','#1F1D24',3),'#1F1D24'),('cheetah · hot pink',cheetah('#E8509A','#F6D4E0','#1F1D24',4),'#fff'),
    ('zebra · lilac',zebra('#E4D8F3','#1F1D24',5),'#1F1D24'),('zebra · hot pink',zebra('#E8509A','#FBF9F6',6),'#fff'),
    ('polka · hot pink',dots('#E8509A','#FBF9F6',10,52),'#fff'),('polka · ink',dots('#1F1D24','#F6D4E0',9,48),'#F6D4E0'),
    ('polka · lilac',dots('#E4D8F3','#FBF9F6',12,56),'#5C3E8A'),('cheetah · oat',cheetah('#F4EFE7','#C9A882','#1F1D24',7),'#1F1D24')]
pt=''.join(f'<div class="tile" style="height:170px;{css}"><span style="background:rgba(255,255,255,.85);color:#2B2B2B;border-radius:999px;padding:6px 14px;font:700 11px DM Sans;letter-spacing:.24em;text-transform:uppercase;position:absolute;bottom:12px">{n}</span></div>' for n,css,c in PR)
demo=(f'<div class="tile" style="height:360px;{cheetah("#F6D4E0","#E8509A","#1F1D24",9)}"><div style="background:#FBF9F6;border-radius:20px;padding:34px 40px;text-align:center;box-shadow:0 14px 30px rgba(0,0,0,.18);position:relative">'
      f'{g("star","dia",54,-26,-26,-10)}{g("heart","rose",46,250,170,12)}<p style="font:400 64px/.95 DM Serif Display;letter-spacing:-.03em">she’s a <i style="color:#E8509A">gem</i></p><p style="font:700 12px DM Sans;letter-spacing:.32em;margin-top:12px">MARISA STITCHES</p></div></div>')
H.append(f'<div class="card" style="margin-bottom:24px"><p class="k" style="margin-bottom:6px">04 · prints: cheetah, zebra, polka dot</p><p style="font:400 16px DM Sans;color:#8C857A;margin-bottom:16px">90s-sticker-book energy, but chic: max 2–3 colors per print (pink, lilac, ink, cream). never rainbow.</p>'
 f'<div style="display:grid;grid-template-columns:1.1fr 1.9fr;gap:16px"><div>{demo}<p class="k" style="text-align:center;margin-top:10px">how it looks on a post</p></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">{pt}</div></div></div>')
# fonts + voice
H.append(f'<div class="row" style="grid-template-columns:1fr 1fr"><div class="card"><p class="k" style="margin-bottom:12px">05 · fonts (same two, so it all still matches)</p>'
 f'<p style="font:400 78px/1 DM Serif Display;letter-spacing:-.03em">DM Serif <i style="color:#C2457A">Display</i></p><p style="font:400 16px DM Sans;color:#8C857A;margin:8px 0 22px">lowercase, big, tight. italic in rose for the one word that matters.</p>'
 f'<p style="font:500 34px DM Sans">DM Sans</p><p style="font:400 16px DM Sans;color:#8C857A;margin-top:6px">captions, labels, small print. quiet so the gems can sparkle.</p></div>'
 f'<div class="card"><p class="k" style="margin-bottom:16px">06 · voice + taglines</p><p style="font:400 40px/1.15 DM Serif Display">she’s a gem.<br>monogram everything.<br>life’s too short for <i style="color:#C2457A">plain towels.</i></p>'
 f'<p style="font:400 16px/1.5 DM Sans;color:#5B554C;margin-top:18px">chic, a little funny, big hobby-girl energy. lowercase. never salesy, never a date until you pick one.</p></div></div>')
H.append('<div class="card" style="background:#1F1D24;color:#F4EFE7;border:0"><p class="k" style="color:#BDB3C9;margin-bottom:14px">07 · rules</p><ul class="rules" style="margin:0;padding-left:20px">'
 '<li><b>Clean base first.</b> Oat, linen, ink do most of the work. Blush and lilac are pops, roughly 1 in 4 posts.</li>'
 '<li><b>More sparkle, still chic.</b> Real-looking cut gems and crystal stars. Up to ~6 on a graphic, confetti allowed on special posts. Never cartoon gems.</li>'
 '<li><b>Prints, not rainbow.</b> Cheetah, zebra and polka dot in 2–3 colors max (hot pink, blush, lilac, ink, cream). Use a print on about 1 in 5 posts, usually behind a clean cream card.</li><li><b>Grid rhythm.</b> Alternate light / dark or pastel / your photo so no row is all one color.</li>'
 '<li><b>Your photos win.</b> Real stitching photos, shown whole. Gems go around them, never on top of the work.</li>'
 '<li><b>For stitching:</b> logo works in one thread color; the gem dots become two French knots or tiny satin dots.</li></ul></div>')
fonts='<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">'
open(os.path.join(D,'board.html'),'w').write('<!doctype html><html><head><meta charset="utf-8">'+fonts+'<style>'+CSS+'</style></head><body><div class="wrap" id="board">'+''.join(H)+'</div>'
 +'<div style="position:relative;width:1200px;height:500px;background:transparent;display:flex;align-items:center;justify-content:center" id="logoT">'+word(150)+'</div>'
 +'<div style="position:relative;width:1200px;height:500px;background:#1F1D24;color:#F4EFE7;display:flex;align-items:center;justify-content:center" id="logoD">'+word(150)+'</div></body></html>')
