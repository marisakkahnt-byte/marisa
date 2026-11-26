"""Preview as IG shows highlights: circles in a row, with labels."""
from PIL import Image, ImageDraw, ImageFont
import glob, sys
rows = [sorted(glob.glob('IDo_*.jpg')), sorted(glob.glob('Stitches_*.jpg'))]
order = {'IDo': ['about', 'ceremonies', 'vows', 'kind-words', 'rain', 'faq'],
         'Stitches': ['about', 'the-work', 'needlepoint', 'gems', 'diva', 'packaging']}
D = 200; W = 6 * 260 + 40
im = Image.new('RGB', (W, 2 * 330 + 20), '#ffffff'); dr = ImageDraw.Draw(im)
try: f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 22)
except Exception: f = None
for ri, brand in enumerate(['IDo', 'Stitches']):
    for ci, n in enumerate(order[brand]):
        src = Image.open(f'{brand}_{n}.jpg').convert('RGB')
        s = src.crop((0, 420, 1080, 1500)).resize((D, D))
        m = Image.new('L', (D, D), 0); ImageDraw.Draw(m).ellipse((0, 0, D, D), fill=255)
        x, y = 40 + ci * 260, 30 + ri * 330
        dr.ellipse((x - 6, y - 6, x + D + 6, y + D + 6), outline='#cccccc', width=3)
        im.paste(s, (x, y), m)
        dr.text((x + D / 2, y + D + 34), n.replace('-', ' '), fill='#222', font=f, anchor='mm')
im.save(sys.argv[1], quality=90)
