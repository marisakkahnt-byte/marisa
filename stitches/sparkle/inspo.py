"""Stitches inspo round: 'bedazzle everything' pink gem confetti + dark star-collage with falling gems."""
import os,random
D=os.path.dirname(os.path.abspath(__file__))
src=open(os.path.join(D,'..','pinned','build.py')).read().split('# Stitches pin 1')[0]
ns={'__file__':os.path.join(D,'..','pinned','build.py')};exec(src,ns)
import sys as _s;_s.path.insert(0,D)
from gems import gem
random.seed(7)
SH=['heart','round','emerald','pear','marq','star','round','heart'];CO=['rose','dia','em','sap','ruby','ame','cit','aqua']
def confetti(n,box,smin,smax,avoid=None):
  out=''
  for _ in range(n):
    for t in range(40):
      x=random.randint(box[0],box[2]);y=random.randint(box[1],box[3])
      if not avoid or not (avoid[0]<x<avoid[2] and avoid[1]<y<avoid[3]): break
    out+=gem(random.choice(SH),random.choice(CO),random.randint(smin,smax),x,y,random.randint(-30,30))
  return out
def stars(n,box,col='#F4EFE7'):
  s=''
  for _ in range(n):
    x=random.randint(box[0],box[2]);y=random.randint(box[1],box[3]);z=random.randint(14,46)
    if 60<x<860 and 120<y<520: continue
    s+=f'<span style="position:absolute;left:{x}px;top:{y}px;font-size:{z}px;color:{col};opacity:{random.uniform(.5,1):.2f}">★</span>'
  return s
CSS="""*{box-sizing:border-box}body{margin:0;background:#777}p{margin:0}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;margin-bottom:10px;font-family:'DM Sans'}
.pink{background:radial-gradient(circle at 50% 45%,#F7D3DF,#EFA9C0 70%)}
.pink .t{position:absolute;left:0;right:0;top:590px;white-space:nowrap;text-align:center;font:italic 400 110px/1 'DM Serif Display';color:#9E2E5F;letter-spacing:-.03em}
.pink .u{position:absolute;left:0;right:0;top:730px;text-align:center;font:700 22px 'DM Sans';letter-spacing:.34em;text-transform:uppercase;color:#7A2350}
.night{background:#141218;color:#F4EFE7}
.night .t{position:absolute;left:90px;right:90px;top:150px;font:400 112px/.95 'DM Serif Display';letter-spacing:-.03em}
.night .t i{color:#E8A9C6}
.night .u{position:absolute;left:94px;top:420px;font:500 32px/1.4 'DM Sans';color:#BDB3C9}
.ft{position:absolute;z-index:5;left:0;right:0;bottom:46px;text-shadow:0 0 12px #F2B8CB,0 0 12px #F2B8CB;text-align:center;font:700 22px 'DM Sans';letter-spacing:.3em;color:#7A2350}
.night .ft{color:#8C849A;text-shadow:none;background:#141218;padding:8px 0}
.trail{position:absolute;inset:0}
"""
S=[]
S.append('<section class="s pink" id="bedazzle">'+confetti(95,(0,0,1040,1300),18,70,(0,520,1080,800))+'<p class="t">monogram everything</p><p class="u">✦ a little sparkle on all of it ✦</p><div class="ft">@marisastitches</div></section>')
trail=''
for i in range(26):
  t=i/25;x=int(260+t*660+random.randint(-90,90));y=int(560+t*700+random.randint(-60,60))
  trail+=gem(random.choice(SH),random.choice(CO),random.randint(40,96),x,y,random.randint(-35,35))
S.append('<section class="s night" id="treasure">'+stars(80,(0,0,1060,1330))+stars(60,(420,700,1060,1330),'#fff')+trail
 +'<p class="t">every name is<br>a little <i>treasure</i></p><p class="u">stitched one by one,<br>like something you’d keep forever.</p><div class="ft">@marisastitches</div></section>')
fonts='<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">'
open(os.path.join(D,'inspo.html'),'w').write('<!doctype html><html><head><meta charset="utf-8">'+fonts+'<style>'+CSS+'</style></head><body>'+''.join(S)+'</body></html>')
