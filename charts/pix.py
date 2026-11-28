"""Pixelize each design to its stitch grid with a fixed palette (nearest color)."""
from PIL import Image
import json
PAL={'busy':[('Cream','#F3EBDC'),('Ink','#1F1D24'),('Pink','#E8608F')],
 'stitch-please':[('Emerald','#0E4A38'),('Cream','#F3EBDC'),('Pink','#E8608F')],
 'gem-heart':[('Cream','#F3EBDC'),('Pink','#E8608F'),('Deep Rose','#B8406A'),('Light Pink','#F6A9C3'),('Blush','#FBD3E1'),('Raspberry','#D04C7C'),('White','#FFFFFF')]}
SIZE={'busy':(110,62),'stitch-please':(150,62),'gem-heart':(60,55)}
def rgb(h):return tuple(int(h[i:i+2],16) for i in (1,3,5))
out={}
for k,pal in PAL.items():
    im=Image.open(f'{k}_hi.png').convert('RGB'); w,h=SIZE[k]
    cols=[rgb(c) for _,c in pal]; grid=[]
    for y in range(h):
        row=[]
        for x in range(w):
            # majority vote in the 10x10 cell
            cnt=[0]*len(cols)
            for yy in range(y*10+1,y*10+9,2):
                for xx in range(x*10+1,x*10+9,2):
                    px=im.getpixel((xx,yy)); i=min(range(len(cols)),key=lambda j:sum((a-b)**2 for a,b in zip(px,cols[j]))); cnt[i]+=1
            row.append(max(range(len(cols)),key=lambda j:cnt[j]))
        grid.append(row)
    out[k]={'w':w,'h':h,'pal':pal,'grid':grid}
    prev=Image.new('RGB',(w,h)); prev.putdata([cols[c] for r in grid for c in r]); prev.resize((w*8,h*8),Image.NEAREST).save(f'{k}_pixel.png')
json.dump(out,open('charts.json','w'))
print({k:(v['w'],v['h']) for k,v in out.items()})
