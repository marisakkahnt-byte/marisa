"""Needlepoint (tent stitch) phrase graphics, 1080x1350.
Every cell of the stitched area is one slanted tent stitch, background included,
with a bare canvas margin around it, like a real needlepoint canvas."""
import sys, json, random
from PIL import Image, ImageDraw, ImageFilter

CELL = 15
COLS, ROWS = 1080 // CELL, 1350 // CELL   # 72 x 90
MARGIN = 4                                # bare canvas cells around the stitched area

def jitter(col, R, amt=10):
    return tuple(max(0, min(255, v + R.randint(-amt, amt))) for v in col)

def tent(d, c, r, col, R):
    x0, y0 = c * CELL, r * CELL
    base = jitter(col, R, 8)
    dark = tuple(int(v * .78) for v in base)
    lite = tuple(min(255, int(v * 1.12) + 14) for v in base)
    # yarn body: a fat slanted stroke from bottom-left to top-right
    d.line((x0 + 1, y0 + CELL - 1, x0 + CELL - 1, y0 + 1), fill=dark, width=int(CELL * .95))
    d.line((x0 + 2, y0 + CELL - 3, x0 + CELL - 3, y0 + 2), fill=base, width=int(CELL * .7))
    d.line((x0 + 4, y0 + CELL - 6, x0 + CELL - 6, y0 + 4), fill=lite, width=2)

def build(mask_path, out, bg, thread, border, seed=5):
    R = random.Random(seed)
    m = Image.open(mask_path).convert('L')
    iw, ih = COLS - 2 * MARGIN - 16, ROWS - 2 * MARGIN - 20
    sc = min(iw / m.width, ih / m.height)
    w, h = max(1, int(m.width * sc)), max(1, int(m.height * sc))
    g = m.resize((w, h), Image.BOX).load()
    ox, oy = (COLS - w) // 2, (ROWS - h) // 2
    canvas = (246, 243, 236)
    img = Image.new('RGB', (1080, 1350), canvas)
    d = ImageDraw.Draw(img)
    # bare canvas mesh
    for i in range(COLS + 1):
        d.line((i * CELL, 0, i * CELL, 1350), fill=(222, 216, 204), width=2)
    for j in range(ROWS + 1):
        d.line((0, j * CELL, 1080, j * CELL), fill=(222, 216, 204), width=2)
    B = MARGIN + 3   # diamond border band center, in cells
    def border_cell(c, r):
        # chain of small diamonds along a band 3 cells inside the stitched edge
        for edge in (B, COLS - 1 - B):
            if abs(c - edge) <= 1 and B - 1 <= r <= ROWS - 1 - B + 1:
                k = (r - B) % 4; k = min(k, 4 - k)
                if abs(c - edge) + k == 1: return True
        for edge in (B, ROWS - 1 - B):
            if abs(r - edge) <= 1 and B - 1 <= c <= COLS - 1 - B + 1:
                k = (c - B) % 4; k = min(k, 4 - k)
                if abs(r - edge) + k == 1: return True
        return False
    for r in range(MARGIN, ROWS - MARGIN):
        for c in range(MARGIN, COLS - MARGIN):
            x, y = c - ox, r - oy
            if 0 <= x < w and 0 <= y < h and g[x, y] < 140:
                col = thread
            elif border_cell(c, r):
                col = border
            else:
                col = bg
            tent(d, c, r, col, R)
    img = img.filter(ImageFilter.SMOOTH)
    img.save(out, quality=92)
    print(out)

if __name__ == '__main__':
    for job in json.loads(sys.argv[1]):
        build(job[0], job[1], tuple(job[2]), tuple(job[3]), tuple(job[4]))
