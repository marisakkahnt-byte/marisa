"""Realistic faceted gem SVGs (inspo: real cut gems + crystal stars on white)."""
import math
COL={'rose':('#FF7AAE','#E0186E','#7A0A3A'),'dia':('#FFFFFF','#DCE4EE','#8C98A8'),'em':('#7CF0B0','#13A05A','#05502A'),
     'sap':('#9CC8FF','#2F6FD6','#10307A'),'ruby':('#FF7A7A','#C8102E','#5C0612'),'ame':('#E2CBFF','#9B5DE5','#4A1E86'),
     'cit':('#FFE69A','#F2A81D','#8A5304'),'aqua':('#D2F2FF','#5DB4DE','#1D5E80')}
def outline(shape,n=24):
  P=[]
  for i in range(n):
    t=2*math.pi*i/n
    if shape=='round': x,y=math.cos(t),math.sin(t)
    elif shape=='marq' or shape=='oval': x,y=.72*math.cos(t),math.sin(t)
    elif shape=='pear':
      x=.85*math.sin(t)*((1-math.cos(t))/2)**.45; y=-math.cos(t)
    elif shape=='heart':
      a=t; x=16*math.sin(a)**3/17; y=-(13*math.cos(a)-5*math.cos(2*a)-2*math.cos(3*a)-math.cos(4*a))/17
    elif shape=='emerald':
      pts=[(-.55,-1),(.55,-1),(.8,-.75),(.8,.75),(.55,1),(-.55,1),(-.8,.75),(-.8,-.75)];return pts
    elif shape=='star':
      r=1 if i%2==0 else .45; a=-math.pi/2+math.pi*i/5; x,y=r*math.cos(a),r*math.sin(a)
      P.append((x,y))
      if i==9: return P
      continue
    P.append((x,y))
  return P
def gem_old(shape,color,size,x,y,rot=0):
  n=10 if shape=='star' else 14
  P=outline(shape,n); lt,md,dk=COL.get(color,COL['dia'])
  if shape=='star': lt,md,dk=COL['dia']
  cx=sum(p[0] for p in P)/len(P); cy=sum(p[1] for p in P)/len(P)
  S=lambda p,k:(cx+(p[0]-cx)*k,cy+(p[1]-cy)*k)
  f=lambda p:f'{p[0]*50+50:.1f},{p[1]*50+50:.1f}'
  gid=f'g{abs(hash((shape,color,size,x,y)))%10**8}'
  out=[f'<defs><radialGradient id="{gid}" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="{lt}"/><stop offset=".55" stop-color="{md}"/><stop offset="1" stop-color="{dk}"/></radialGradient></defs>']
  out.append(f'<polygon points="{" ".join(f(p) for p in P)}" fill="url(#{gid})"/>')
  T=[S(p,.52) for p in P]
  import random
  R=random.Random(hash((shape,color,size)))
  C=(cx,cy)
  for i in range(len(P)):
    a,b=P[i],P[(i+1)%len(P)];ta,tb=T[i],T[(i+1)%len(P)]
    m=((a[0]+b[0])/2,(a[1]+b[1])/2)
    # pavilion kite facets: two triangles per edge with strong contrast
    v1=R.choice([.55,.4,.12,.0]);v2=R.choice([.35,.0,.05]);d1=R.choice([.0,.25,.4]);
    out.append(f'<polygon points="{f(a)} {f(m)} {f(ta)}" fill="#fff" fill-opacity="{v1:.2f}"/>')
    out.append(f'<polygon points="{f(m)} {f(b)} {f(tb)}" fill="#000" fill-opacity="{d1:.2f}"/>')
    out.append(f'<polygon points="{f(ta)} {f(m)} {f(tb)}" fill="#fff" fill-opacity="{v2:.2f}"/>')
    if shape=='star':
      out.append(f'<polygon points="{f(C)} {f(a)} {f(m)}" fill="#fff" fill-opacity="{[.6,.15][i%2]}"/>')
      out.append(f'<polygon points="{f(C)} {f(m)} {f(b)}" fill="#8C98A8" fill-opacity="{[.35,.55][i%2]}"/>')
  if shape!='star':
    out.append(f'<polygon points="{" ".join(f(p) for p in T)}" fill="{md}" fill-opacity=".55" stroke="#fff" stroke-opacity=".7" stroke-width=".8"/>')
    for i in range(len(T)):
      out.append(f'<polygon points="{f((cx,cy))} {f(T[i])} {f(T[(i+1)%len(T)])}" fill="{["#fff","#000"][i%2]}" fill-opacity="{[.22,.12,.35,.05][i%4]}"/>')
  for i in range(0,len(T),2) if shape!='star' else []:
    out.append(f'<line x1="{T[i][0]*50+50:.1f}" y1="{T[i][1]*50+50:.1f}" x2="{P[i][0]*50+50:.1f}" y2="{P[i][1]*50+50:.1f}" stroke="#fff" stroke-opacity=".35" stroke-width=".5"/>')
  out.append(f'<polygon points="{" ".join(f(p) for p in P)}" fill="none" stroke="{dk}" stroke-opacity=".5" stroke-width="1"/>')
  out.append('<ellipse cx="36" cy="30" rx="9" ry="4" fill="#fff" fill-opacity=".75" transform="rotate(-30 36 30)"/>')
  out.append('<path d="M70 22 l2 7 7 2 -7 2 -2 7 -2 -7 -7 -2 7 -2z" fill="#fff" fill-opacity=".95"/>')
  return (f'<svg viewBox="-4 -4 108 108" width="{size}" height="{size}" style="position:absolute;left:{x}px;top:{y}px;transform:rotate({rot}deg);'
          f'filter:drop-shadow(0 {max(2,size//14)}px {max(3,size//10)}px rgba(0,0,0,.22));overflow:visible">'+''.join(out)+'</svg>')


# ---- Real-gem style (brand standard from Nov 2026). Crystal stars keep the old renderer. ----
import sys as _sys
_sys.path.insert(0, '/home/user/marisa/stitches/realgems')
from realgem import brilliant as _brilliant, emerald_cut as _emerald_cut
_CMAP = {'rose': 'pink', 'dia': 'diamond', 'em': 'emerald', 'sap': 'sapphire', 'ruby': 'ruby',
         'ame': 'amethyst', 'cit': 'citrine', 'aqua': 'aqua'}
_SMAP = {'round': 'round', 'oval': 'oval', 'pear': 'pear', 'heart': 'heart', 'marq': 'marquise'}
_n = [0]
def gem(shape, color, size, x, y, rot=0):
    if shape == 'star':
        return gem_old(shape, color, size, x, y, rot)
    _n[0] += 1
    g = _CMAP.get(color, 'diamond')
    svg = _emerald_cut(g, size, seed=_n[0]) if shape == 'emerald' else _brilliant(_SMAP.get(shape, 'round'), g, size, seed=_n[0])
    return (f'<div style="position:absolute;left:{x}px;top:{y}px;width:{size}px;height:{size}px;transform:rotate({rot}deg)">' + svg + '</div>')
