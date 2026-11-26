"""Turn a script-text mask into a single line of rhinestones (SVG)."""
import sys, random, numpy as np
from PIL import Image

def thin(img):
    """Zhang-Suen thinning on a boolean array."""
    I = img.copy().astype(np.uint8)
    while True:
        changed = False
        for step in (0, 1):
            P = np.pad(I, 1)
            p2, p3, p4 = P[:-2, 1:-1], P[:-2, 2:], P[1:-1, 2:]
            p5, p6, p7 = P[2:, 2:], P[2:, 1:-1], P[2:, :-2]
            p8, p9 = P[1:-1, :-2], P[:-2, :-2]
            nb = [p2, p3, p4, p5, p6, p7, p8, p9]
            B = sum(n.astype(int) for n in nb)
            seq = nb + [p2]
            A = sum(((seq[i] == 0) & (seq[i + 1] == 1)).astype(int) for i in range(8))
            if step == 0:
                c = (p2 * p4 * p6 == 0) & (p4 * p6 * p8 == 0)
            else:
                c = (p2 * p4 * p8 == 0) & (p2 * p6 * p8 == 0)
            m = (I == 1) & (B >= 2) & (B <= 6) & (A == 1) & c
            if m.any():
                I[m] = 0; changed = True
        if not changed:
            return I.astype(bool)

STONES = [  # (light, mid, dark) — brand gem tones + crystal, no rainbow brights
    ('#FFFFFF', '#DCE4EE', '#8C98A8'), ('#FFFFFF', '#DCE4EE', '#8C98A8'),
    ('#FFD6E6', '#F28DB4', '#9E2E5F'), ('#FFD6E6', '#F6B5CC', '#B4587E'),
    ('#9FF0C6', '#13A05A', '#05502A'), ('#B6E8D2', '#2E8F6A', '#0E4A38'),
    ('#FFF0C8', '#D9B56A', '#8A6424'), ('#BFD8FF', '#5A8FE0', '#1D3F8A'),
    ('#EAD9FF', '#B48AE8', '#5B3496'),
]

def build(mask_path, out_path, spacing=13, seed=3):
    R = random.Random(seed)
    m = np.array(Image.open(mask_path).convert('L')) < 128
    sk = thin(m)
    ys, xs = np.nonzero(sk)
    pts = list(zip(xs.tolist(), ys.tolist()))
    R.shuffle(pts)
    placed = []
    grid = {}
    def ok(x, y, r):
        gx, gy = int(x // 20), int(y // 20)
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for (px, py, pr) in grid.get((gx + dx, gy + dy), []):
                    if (px - x) ** 2 + (py - y) ** 2 < (pr + r + 0.2) ** 2:
                        return False
        return True
    # a few bigger accent stones first, then fill
    for big in (True, False):
        for (x, y) in pts:
            r = R.choice([5.6, 6.2]) if big and R.random() < .025 else R.choice([3.6, 4.0, 4.4, 4.8]) if not big else None
            if r is None or not ok(x, y, r):
                continue
            placed.append((x, y, r))
            grid.setdefault((int(x // 20), int(y // 20)), []).append((x, y, r))
    H, W = m.shape
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}"><defs>']
    for i, (l, md, d) in enumerate(STONES):
        out.append(f'<radialGradient id="s{i}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="{l}"/><stop offset=".5" stop-color="{md}"/><stop offset="1" stop-color="{d}"/></radialGradient>')
    out.append('<radialGradient id="pearl" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#F3ECE4"/><stop offset="1" stop-color="#BDB2A6"/></radialGradient>')
    out.append('<filter id="sh"><feDropShadow dx="0" dy="1.2" stdDeviation="1" flood-opacity=".28"/></filter></defs><g filter="url(#sh)">')
    for (x, y, r) in placed:
        if R.random() < .08:
            out.append(f'<circle cx="{x}" cy="{y}" r="{r:.1f}" fill="url(#pearl)"/>')
            out.append(f'<circle cx="{x - r * .3:.1f}" cy="{y - r * .35:.1f}" r="{r * .28:.1f}" fill="#fff" opacity=".9"/>')
            continue
        s = R.randrange(len(STONES)); d = STONES[s][2]
        out.append(f'<circle cx="{x}" cy="{y}" r="{r:.1f}" fill="url(#s{s})" stroke="{d}" stroke-opacity=".5" stroke-width=".6"/>')
        # table facet + glint
        k = r * .5
        out.append(f'<polygon points="{x},{y - k} {x + k},{y} {x},{y + k} {x - k},{y}" fill="#fff" opacity=".28"/>')
        out.append(f'<circle cx="{x - r * .35:.1f}" cy="{y - r * .38:.1f}" r="{r * .22:.1f}" fill="#fff" opacity=".95"/>')
    out.append('</g></svg>')
    open(out_path, 'w').write(''.join(out))
    print(out_path, len(placed), 'stones')

if __name__ == '__main__':
    build(sys.argv[1], sys.argv[2])
