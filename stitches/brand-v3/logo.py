import os,sys
D=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,os.path.join(D,'..','sparkle'))
from gems import gem
def I(c,sz): return f'<span class="i">ı{gem("round",c,sz,0,0)}</span>'
def word(sz,col,a='rose',b='em'): return f'<span class="wm" style="font-size:{sz}px;color:{col}">mar{I(a,int(sz*.2))}sa<br>st{I(b,int(sz*.2))}tches</span>'
V=[('ink_transparent','transparent','#1F1D24'),('cream_transparent','transparent','#F4EFE7'),('emerald_transparent','transparent','#0E4A38'),('gold_transparent','transparent','#B8914A'),
   ('on-oat','#F4EFE7','#1F1D24'),('on-emerald','#0E4A38','#F4EFE7'),('on-ink','#1F1D24','#F4EFE7')]
H=''.join(f'<div id="{n}" style="width:1400px;height:800px;background:{bg};display:flex;align-items:center;justify-content:center">{word(220,c)}</div>' for n,bg,c in V)
CSS=".wm{font-family:'DM Serif Display';letter-spacing:-.045em;line-height:.9;text-align:center;display:inline-block}.i{position:relative;display:inline-block}.i svg{position:absolute!important;left:50%!important;top:.08em!important;transform:translate(-50%,0)!important}body{margin:0;background:transparent}"
open(os.path.join(D,'logo.html'),'w').write('<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" rel="stylesheet"><style>'+CSS+'</style></head><body>'+H+'</body></html>')
print(' '.join(v[0] for v in V))
