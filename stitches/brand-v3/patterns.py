"""Pattern backgrounds: cheetah, zebra, polka dot (Lisa-Frank-ish brights, no rainbow: 2-3 colors each)."""
import random,math,base64
def _uri(svg): return "url('data:image/svg+xml;base64,"+base64.b64encode(svg.encode()).decode()+"')"
def cheetah(bg,spot,ring,seed=3,tile=220):
  R=random.Random(seed);s=''
  for _ in range(20):
    x,y=R.uniform(0,tile),R.uniform(0,tile);r=R.uniform(10,17)
    pts=[];n=10
    for i in range(n):
      a=2*math.pi*i/n+R.uniform(-.12,.12);rr=r*R.uniform(.85,1.1);pts.append(f'{x+rr*math.cos(a):.1f},{y+rr*math.sin(a):.1f}')
    # ring = broken outline, spot = center
    for dx in (-tile,0,tile):
      for dy in (-tile,0,tile):
        s+=f'<g transform="translate({dx},{dy})"><polygon points="{" ".join(pts)}" fill="none" stroke="{ring}" stroke-width="6" stroke-linejoin="round" stroke-dasharray="{R.randint(14,22)} {R.randint(5,9)}"/>'
        s+=f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r*.5:.1f}" fill="{spot}"/></g>'
  svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{tile}" height="{tile}"><rect width="100%" height="100%" fill="{bg}"/>{s}</svg>'
  return f'background:{bg} {_uri(svg)};background-size:{tile}px {tile}px'
def zebra(bg,stripe,seed=5,tile=260):
  R=random.Random(seed);s=''
  for i in range(7):
    y0=i*tile/7+R.uniform(-6,6);w=R.uniform(10,20)
    d=f'M-10 {y0:.1f} '
    for k in range(1,9):
      x=k*tile/8;d+=f'Q{x-tile/16:.1f} {y0+R.uniform(-16,16):.1f} {x:.1f} {y0+R.uniform(-8,8):.1f} '
    s+=f'<path d="{d}" stroke="{stripe}" stroke-width="{w:.1f}" fill="none" stroke-linecap="round"/>'
  svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{tile}" height="{tile}"><rect width="100%" height="100%" fill="{bg}"/><g transform="rotate(-18 {tile/2} {tile/2}) scale(1.3) translate(-30 -30)">{s}</g></svg>'
  return f'background:{bg} {_uri(svg)};background-size:{tile}px {tile}px'
def dots(bg,dot,size=14,gap=56):
  return f'background-color:{bg};background-image:radial-gradient({dot} {size}px,transparent {size+1}px),radial-gradient({dot} {size}px,transparent {size+1}px);background-size:{gap}px {gap}px;background-position:0 0,{gap//2}px {gap//2}px'
