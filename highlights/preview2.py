from PIL import Image, ImageDraw, ImageFont
import sys
names = ['about', 'ceremonies', 'vows', 'kind-words', 'rain', 'faq']
D = 220; W = 6 * 280 + 40
im = Image.new('RGB', (W, 330), '#ffffff'); dr = ImageDraw.Draw(im)
f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 22)
for ci, n in enumerate(names):
    s = Image.open(f'IDo2_{n}.jpg').convert('RGB').crop((0, 420, 1080, 1500)).resize((D, D))
    m = Image.new('L', (D, D), 0); ImageDraw.Draw(m).ellipse((0, 0, D, D), fill=255)
    x, y = 40 + ci * 280, 30
    dr.ellipse((x - 6, y - 6, x + D + 6, y + D + 6), outline='#cccccc', width=3)
    im.paste(s, (x, y), m)
    dr.text((x + D / 2, y + D + 36), n.replace('-', ' '), fill='#222', font=f, anchor='mm')
im.save(sys.argv[1], quality=90)
