import os,sys
D=os.path.dirname(os.path.abspath(__file__));R=os.path.join(D,'..')
sys.path.insert(0,os.path.join(R,'sparkle'));sys.path.insert(0,os.path.join(R,'brand-v3'))
from gems import gem
from patterns import cheetah,zebra,dots,zebra_big
L='logo/'
def spark(x,y,s,c='#fff',o=1):  # Y2K 4-point sparkle
  return f'<svg style="position:absolute;left:{x}px;top:{y}px;width:{s}px;height:{s}px;opacity:{o};filter:drop-shadow(0 0 6px rgba(255,255,255,.8))" viewBox="0 0 100 100"><path d="M50 0 C54 38 62 46 100 50 C62 54 54 62 50 100 C46 62 38 54 0 50 C38 46 46 38 50 0Z" fill="{c}"/></svg>'
holo="background:conic-gradient(from 200deg,#F6D4E0,#E8E2F7,#D6F0EA,#FBF3D8,#F6D4E0)"
def card(logo,size=620,bg='#FBF9F6',ring='#B8914A'):
  return (f'<div style="position:absolute;left:{540-size//2}px;top:{540-size//2}px;width:{size}px;height:{size}px;border-radius:50%;{holo};padding:10px;box-shadow:0 18px 50px rgba(0,0,0,.35)">'
          f'<div style="width:100%;height:100%;border-radius:50%;background:{bg};border:3px solid {ring};display:flex;align-items:center;justify-content:center"><img src="{logo}" style="width:74%"></div></div>')
P={}
P['stitches_A_emerald']=(f'<div class="p" style="background:radial-gradient(circle at 50% 40%,#16604A,#0E4A38 60%,#08301F)"><img src="{L}MarisaStitches_Logo_cream_transparent.png" style="position:absolute;left:215px;top:370px;width:650px">'
  +gem('heart','rose',120,230,210,-14)+gem('star','dia',130,740,200,10)+gem('emerald','em',96,760,760,8)+gem('pear','cit',84,250,770,-20)
  +spark(300,200,70)+spark(760,330,46)+spark(300,740,48)+spark(660,820,56,'#F6D4E0')+'</div>')
P['stitches_B_zebra']=(f'<div class="p" style="{zebra_big("#FBF9F6","#1F1D24")}">'+card(L+'MarisaStitches_Logo_ink_transparent.png')
  +gem('heart','rose',130,230,200,-14)+gem('star','dia',140,730,190,10)+gem('emerald','em',100,740,760,8)+spark(300,800,60)+spark(860,500,44)+'</div>')
P['stitches_C_cheetah']=(f'<div class="p" style="{cheetah("#C49A64","#3A2618","#1F1D24",9,220)+";background-size:330px 330px"}">'+card(L+'MarisaStitches_Logo_ink_transparent.png',bg='#FBF9F6',ring='#0E4A38')
  +gem('round','rose',120,220,210,-10)+gem('star','dia',140,730,190,12)+gem('pear','sap',96,760,760,-16)+spark(300,790,60)+spark(860,500,44)+'</div>')
P['stitches_D_polka']=(f'<div class="p" style="{dots("#0E4A38","#F4EFE7",14,90)}">'+card(L+'MarisaStitches_Logo_emerald_transparent.png',bg='#FBF9F6')
  +gem('heart','ruby',120,230,210,-14)+gem('star','dia',140,730,190,10)+spark(300,790,56)+spark(800,780,46,'#F6D4E0')+'</div>')
IDO='/tmp/claude-0/-home-user-marisa/69bacfe2-577c-5854-ad0a-98dd41e298f1/scratchpad/brand/'
P['ido_A_logo_cream']=f'<div class="p" style="background:#FBF7F0"><img src="{IDO}logo-charcoal-crop.png" style="position:absolute;left:250px;top:300px;width:580px"></div>'
P['ido_B_logo_espresso']=f'<div class="p" style="background:#2A241F"><img src="{IDO}logo-blush-crop.png" style="position:absolute;left:250px;top:300px;width:580px"></div>'
P['ido_C_quill_blush']=f'<div class="p" style="background:#2A241F"><img src="{IDO}quill-blush-crop.png" style="position:absolute;left:300px;top:250px;width:480px"></div>'
CSS='body{margin:0}.p{width:1080px;height:1080px;position:relative;overflow:hidden}'
open(os.path.join(D,'p.html'),'w').write('<!doctype html><html><head><meta charset="utf-8"><style>'+CSS+'</style></head><body>'+''.join(f'<div id="{k}">{v}</div>' for k,v in P.items())+'</body></html>')
print(' '.join(P))
