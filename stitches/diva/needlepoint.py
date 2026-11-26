"""Cross-stitch / needlepoint phrase graphics (1080x1350) from a text mask."""
import sys, json
from PIL import Image, ImageDraw, ImageFilter

CELL = 15
COLS, ROWS = 1080 // CELL, 1350 // CELL   # 72 x 90

def stitch(d, cx, cy, col, dark):
    h = CELL * .42
    for (x1, y1, x2, y2), c in (((cx - h, cy - h, cx + h, cy + h), dark), ((cx - h, cy + h, cx + h, cy - h), col)):
        d.line((x1, y1, x2, y2), fill=c, width=6)
    d.line((cx - h * .6, cy + h * .6, cx + h * .2, cy - h * .2), fill=tuple(min(255, v + 45) for v in col), width=2)

def build(mask_path, out, bg, thread, border, seed_dark=.85):
    m = Image.open(mask_path).convert('L')
    # fit mask into the inner area (cols 7..47, rows 10..57)
    iw, ih = COLS - 22, ROWS - 26
    sc = min(iw / m.width, ih / m.height)
    w, h = max(1, int(m.width * sc)), max(1, int(m.height * sc))
    g = m.resize((w, h), Image.BOX)
    ox, oy = (COLS - w) // 2, (ROWS - h) // 2
    img = Image.new('RGB', (1080, 1350), bg)
    d = ImageDraw.Draw(img)
    # canvas weave: holes between cells
    hole = tuple(max(0, v - 28) for v in bg)
    for r in range(ROWS + 1):
        for c in range(COLS + 1):
            d.ellipse((c * CELL - 2, r * CELL - 2, c * CELL + 2, r * CELL + 2), fill=hole)
    dk = lambda col: tuple(int(v * seed_dark) for v in col)
    # text stitches
    px = g.load()
    for y in range(h):
        for x in range(w):
            if px[x, y] < 140:
                stitch(d, (ox + x) * CELL + CELL / 2, (oy + y) * CELL + CELL / 2, thread, dk(thread))
    # diamond border band: diamonds of radius 2, every 6 cells, band centered 6 cells in
    def put(c, r, col):
        stitch(d, c * CELL + CELL / 2, r * CELL + CELL / 2, col, dk(col))
    B = 6
    for r in range(ROWS):
        for c in range(COLS):
            on_band = (abs(c - B) <= 2 or abs(c - (COLS - 1 - B)) <= 2) and B - 2 <= r <= ROWS - 1 - B + 2 \
                or (abs(r - B) <= 2 or abs(r - (ROWS - 1 - B)) <= 2) and B - 2 <= c <= COLS - 1 - B + 2
            if not on_band:
                continue
            # local coords along band
            vert = abs(c - B) <= 2 or abs(c - (COLS - 1 - B)) <= 2
            along = r if vert else c
            across = (c - B if abs(c - B) <= 2 else c - (COLS - 1 - B)) if vert else (r - B if abs(r - B) <= 2 else r - (ROWS - 1 - B))
            k = (along - B) % 6
            k = min(k, 6 - k)
            if abs(across) + k == 2 or (abs(across) + k == 0):
                put(c, r, border)
    img = img.filter(ImageFilter.SMOOTH)
    img.save(out, quality=92)
    print(out)

if __name__ == '__main__':
    for job in json.loads(sys.argv[1]):
        build(job[0], job[1], tuple(job[2]), tuple(job[3]), tuple(job[4]))
