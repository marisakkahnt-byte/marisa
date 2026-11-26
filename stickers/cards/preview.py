from PIL import Image
import glob, sys
fs = sorted(glob.glob('card-*.png')); fs = fs[1:] + fs[:1]
W, H = 300, 450
sheet = Image.new('RGB', (W*4+50, H*2+30), '#efe9df')
for i, f in enumerate(fs):
    sheet.paste(Image.open(f).convert('RGB').resize((W, H)), (10+(i % 4)*(W+10), 10+(i//4)*(H+10)))
sheet.save(sys.argv[1], quality=88)
