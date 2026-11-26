"""Realistic faceted gem SVGs.

Brilliant cut (round/oval/pear/heart/marquise): 8-fold crown (table, 8 star, 8 kite, 16 upper-girdle
facets) warped onto any outline, plus pavilion reflections seen through the table.
Step cut (emerald): concentric stepped rings with mirror-hall reflections.
Shading is a simple light model (key light from the upper left) + seeded variation, with
glints and a little dispersion 'fire'."""
import math, random

RAMPS = {
    'diamond':  ['#4f5863', '#aeb9c6', '#e6edf5', '#ffffff'],
    'ruby':     ['#32020c', '#9c0c28', '#f0405e', '#ffd0d8'],
    'emerald':  ['#022a18', '#0c6b3c', '#34c27e', '#c6ffe0'],
    'sapphire': ['#06143c', '#1b47a8', '#5a95ff', '#d9e7ff'],
    'amethyst': ['#240a48', '#6c36b4', '#ad80f5', '#eee2ff'],
    'pink':     ['#5e1236', '#d04a8c', '#ff9cc8', '#ffe6f2'],
    'citrine':  ['#4e2402', '#c97208', '#ffb83a', '#fff0c2'],
    'aqua':     ['#06354a', '#1f8fb8', '#6fd6f5', '#e2f9ff'],
}
FIRE = ['#ff5a36', '#ffd23d', '#38d0ff', '#a46bff', '#4dff9a']

def _hex(c): return tuple(int(c[i:i + 2], 16) for i in (1, 3, 5))
def _mix(a, b, t): return '#%02x%02x%02x' % tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))
def ramp(name, v):
    r = [_hex(c) for c in RAMPS[name]]
    v = max(0.0, min(1.0, v)) * 3
    i = min(2, int(v))
    return _mix(r[i], r[i + 1], v - i)

# ---------- outlines as polar functions r(theta), y down, theta=0 -> right ----------
def _polar_from_points(pts):
    cx = sum(p[0] for p in pts) / len(pts); cy = sum(p[1] for p in pts) / len(pts)
    pol = sorted((math.atan2(y - cy, x - cx) % (2 * math.pi), math.hypot(x - cx, y - cy)) for x, y in pts)
    mx = max(r for _, r in pol)
    pol = [(a, r / mx) for a, r in pol]
    def f(th):
        th %= 2 * math.pi
        for i in range(len(pol)):
            a0, r0 = pol[i - 1]; a1, r1 = pol[i]
            if i == 0: a0 -= 2 * math.pi
            if a0 <= th <= a1 or (i == 0 and th >= pol[-1][0]):
                if i == 0 and th >= pol[-1][0]: th2 = th - 2 * math.pi
                else: th2 = th
                t = 0 if a1 == a0 else (th2 - a0) / (a1 - a0)
                return r0 + (r1 - r0) * t
        return pol[0][1]
    return f, (cx, cy)

def outline_fn(shape):
    N = 720
    if shape == 'round':
        return (lambda th: 1.0), (0, 0)
    if shape == 'oval':
        a, b = .74, 1.0
        return (lambda th: 1 / math.sqrt((math.cos(th) / a) ** 2 + (math.sin(th) / b) ** 2)), (0, 0)
    pts = []
    if shape == 'pear':
        for i in range(N):
            t = 2 * math.pi * i / N
            pts.append((.78 * math.sin(t) * ((1 - math.cos(t)) / 2) ** .42, -math.cos(t)))
    elif shape == 'heart':
        for i in range(N):
            t = 2 * math.pi * i / N
            pts.append((16 * math.sin(t) ** 3 / 17, -(13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)) / 17))
    elif shape == 'marquise':
        R = 1.3; half = .46; d = R - half; pm = math.acos(d / R); H = R * math.sin(pm)
        for i in range(N // 2):
            p = -pm + 2 * pm * i / (N // 2)
            pts.append((R * math.cos(p) - d, R * math.sin(p) / H))
        for i in range(N // 2):
            p = -pm + 2 * pm * i / (N // 2)
            pts.append((-(R * math.cos(p) - d), -R * math.sin(p) / H))
    return _polar_from_points(pts)

def _gfacet(out, defs, gid, idx, pts_str, gem, v, ang, edge=.3):
    v = .5 + (v - .5) * 1.45                      # push contrast, real stones are very contrasty
    a, b = ramp(gem, v + .22), ramp(gem, v - .22)
    deg = math.degrees(ang)
    defs.append(f'<linearGradient id="{gid}f{idx}" gradientTransform="rotate({deg:.0f} .5 .5)"><stop offset="0" stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient>')
    out.append(f'<polygon points="{pts_str}" fill="url(#{gid}f{idx})" stroke="#fff" stroke-opacity="{edge}" stroke-width=".25"/>')

def _glow(out, gid, clip_pts):
    out.append(f'<g clip-path="url(#{gid}c)" filter="url(#{gid}b)">'
               '<ellipse cx="-16" cy="-20" rx="20" ry="9" fill="#fff" opacity=".38" transform="rotate(-35 -16 -20)"/>'
               '<ellipse cx="18" cy="24" rx="22" ry="11" fill="#000" opacity=".35" transform="rotate(-35 18 24)"/>'
               '<ellipse cx="6" cy="-4" rx="8" ry="4" fill="#fff" opacity=".22"/></g>')

def brilliant(shape, gem, size, seed=1, light=-2.2):
    R = random.Random(seed)
    f, _ = outline_fn(shape)
    S = 46.0  # svg units radius; viewBox -50..50
    P = lambda rn, th: (S * f(th) * rn * math.cos(th), S * f(th) * rn * math.sin(th))
    pt = lambda p: f'{p[0]:.2f},{p[1]:.2f}'
    off = -math.pi / 2  # put a table vertex pattern aligned to the top
    tv = [off + math.pi / 8 + k * math.pi / 4 for k in range(8)]          # table vertices
    sm = [off + k * math.pi / 4 for k in range(8)]                        # star points (mid between table verts)
    RT, RS = .52, .76
    facets = []  # (points, tilt, angle)
    for k in range(8):
        a0, a1 = tv[k], tv[(k + 1) % 8] + (2 * math.pi if k == 7 else 0)
        mid = (a0 + a1) / 2
        facets.append(([P(RT, a0), P(RT, a1), P(RS, mid)], .35, mid))                       # star
    for k in range(8):
        a = tv[k]; l = a - math.pi / 8; r = a + math.pi / 8
        facets.append(([P(RT, a), P(RS, l), P(1, a), P(RS, r)], .6, a))                    # kite / bezel
    for k in range(8):
        m = sm[k]; a_l = m - math.pi / 8; a_r = m + math.pi / 8
        facets.append(([P(RS, m), P(1, a_l), P(1, m)], .85, m - math.pi / 16))             # upper girdle L
        facets.append(([P(RS, m), P(1, m), P(1, a_r)], .85, m + math.pi / 16))             # upper girdle R
    out = []; gdefs = []
    gid = f'g{seed}{gem[:2]}'
    out.append(f'<defs><radialGradient id="{gid}t" cx="42%" cy="38%" r="70%"><stop offset="0" stop-color="{ramp(gem,.62)}"/><stop offset="1" stop-color="{ramp(gem,.18)}"/></radialGradient>'
               f'<radialGradient id="{gid}h" cx="30%" cy="22%" r="60%"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'
               f'<filter id="{gid}b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter><clipPath id="{gid}c"><polygon points="{" ".join(pt(P(1, 2 * math.pi * i / 240)) for i in range(240))}"/></clipPath></defs>')
    # base body
    out.append(f'<polygon points="{" ".join(pt(P(1, 2 * math.pi * i / 240)) for i in range(240))}" fill="{ramp(gem,.2)}"/>')
    # table
    tbl = [P(RT, a) for a in tv]
    out.append(f'<polygon points="{" ".join(pt(p) for p in tbl)}" fill="url(#{gid}t)"/>')
    # pavilion reflections through the table: 16 alternating wedges + inner arrows
    for k in range(16):
        a0 = off + k * math.pi / 8; a1 = a0 + math.pi / 8
        v = R.uniform(.05, .95) if k % 2 else R.uniform(.0, .4)
        out.append(f'<polygon points="0,0 {pt(P(RT*.98, a0))} {pt(P(RT*.98, a1))}" fill="{ramp(gem, v)}" opacity=".55"/>')
    for k in range(8):
        a = tv[k]
        out.append(f'<polygon points="0,0 {pt(P(.26, a - .25))} {pt(P(.5, a))} {pt(P(.26, a + .25))}" fill="{ramp(gem, R.uniform(.0,.35))}" opacity=".45"/>')
    # crown facets
    for pts_, tilt, ang in facets:
        v = .5 + tilt * .55 * math.cos(ang - light) + R.uniform(-.22, .22)
        if R.random() < .12: v = R.uniform(.85, 1.0)      # random bright flashes, like real light return
        if R.random() < .10: v = R.uniform(.0, .15)       # and dark extinction patches
        _gfacet(out, gdefs, gid, len(gdefs), " ".join(pt(p) for p in pts_), gem, v, ang + 1.2)
    # facet edge highlights
    for k in range(8):
        out.append(f'<line x1="{pt(P(RT, tv[k])).split(",")[0]}" y1="{pt(P(RT, tv[k])).split(",")[1]}" x2="{pt(P(1, tv[k])).split(",")[0]}" y2="{pt(P(1, tv[k])).split(",")[1]}" stroke="#fff" stroke-opacity=".25" stroke-width=".3"/>')
    out.append(f'<polygon points="{" ".join(pt(p) for p in tbl)}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width=".35"/>')
    _glow(out, gid, None)
    out.insert(1, '<defs>' + ''.join(gdefs) + '</defs>')
    # fire + glints
    fire_n = 14 if gem == 'diamond' else 5
    for _ in range(fire_n):
        th = R.uniform(0, 2 * math.pi); rn = R.uniform(.3, .95); x, y = P(rn, th); s = R.uniform(.8, 2.2)
        out.append(f'<polygon points="{x:.1f},{y-s:.1f} {x+s*.7:.1f},{y+s*.5:.1f} {x-s*.7:.1f},{y+s*.5:.1f}" fill="{R.choice(FIRE)}" opacity="{R.uniform(.45,.85):.2f}"/>')
    out.append(f'<polygon points="{" ".join(pt(P(1, 2 * math.pi * i / 240)) for i in range(240))}" fill="url(#{gid}h)" clip-path="url(#{gid}c)"/>')
    for (gx, gy, gs) in [(-.42, -.5, 7), (.38, -.18, 4.5), (-.1, .45, 3.2)]:
        x, y = gx * S, gy * S
        out.append(f'<path d="M{x} {y-gs} Q{x} {y} {x+gs} {y} Q{x} {y} {x} {y+gs} Q{x} {y} {x-gs} {y} Q{x} {y} {x} {y-gs}Z" fill="#fff" opacity=".95"/>')
    # girdle
    out.append(f'<polygon points="{" ".join(pt(P(1, 2 * math.pi * i / 240)) for i in range(240))}" fill="none" stroke="{ramp(gem,.05)}" stroke-width=".9"/>')
    out.append(f'<polygon points="{" ".join(pt(P(.985, 2 * math.pi * i / 240)) for i in range(240))}" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".35"/>')
    return _wrap(out, size)

def emerald_cut(gem, size, seed=1, light=-2.2):
    R = random.Random(seed); gdefs = []
    W, H, C = 33, 46, 11   # half width/height, corner cut
    def octo(s):
        w, h, c = W * s, H * s, C * s
        return [(-w + c, -h), (w - c, -h), (w, -h + c), (w, h - c), (w - c, h), (-w + c, h), (-w, h - c), (-w, -h + c)]
    normals = [-math.pi / 2, -math.pi / 4, 0, math.pi / 4, math.pi / 2, 3 * math.pi / 4, math.pi, -3 * math.pi / 4]
    rings = [1, .86, .72, .58]
    pt = lambda p: f'{p[0]:.2f},{p[1]:.2f}'
    gid = f'e{seed}{gem[:2]}'
    out = [f'<defs><linearGradient id="{gid}t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{ramp(gem,.7)}"/><stop offset=".5" stop-color="{ramp(gem,.3)}"/><stop offset="1" stop-color="{ramp(gem,.55)}"/></linearGradient>'
           f'<radialGradient id="{gid}h" cx="28%" cy="20%" r="65%"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'
           f'<filter id="{gid}b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter><clipPath id="{gid}c"><polygon points="{" ".join(pt(p) for p in octo(1))}"/></clipPath></defs>']
    out.append(f'<polygon points="{" ".join(pt(p) for p in octo(1))}" fill="{ramp(gem,.2)}"/>')
    for ri in range(len(rings) - 1):
        o, i = octo(rings[ri]), octo(rings[ri + 1])
        tilt = .9 - ri * .25
        for k in range(8):
            v = .5 + tilt * .5 * math.cos(normals[k] - light) + R.uniform(-.18, .18)
            if R.random() < .1: v = R.uniform(.85, 1)
            quad = [o[k], o[(k + 1) % 8], i[(k + 1) % 8], i[k]]
            _gfacet(out, gdefs, gid, len(gdefs), " ".join(pt(p) for p in quad), gem, v, normals[k] + 1.57)
    t = octo(rings[-1])
    out.append(f'<polygon points="{" ".join(pt(p) for p in t)}" fill="url(#{gid}t)"/>')
    # hall-of-mirrors steps reflected in the table
    for s in (.46, .34, .22):
        out.append(f'<polygon points="{" ".join(pt(p) for p in octo(s))}" fill="none" stroke="{ramp(gem,.9)}" stroke-opacity=".35" stroke-width=".5"/>')
    for k in (0, 2, 4, 6):
        out.append(f'<line x1="{t[k][0]:.1f}" y1="{t[k][1]:.1f}" x2="0" y2="0" stroke="{ramp(gem,.05)}" stroke-opacity=".35" stroke-width=".5"/>')
    for k in range(4):
        a = R.uniform(-1, 1)
        out.append(f'<polygon points="0,0 {pt(t[2*k])} {pt(t[2*k+1])}" fill="{ramp(gem, R.uniform(0,.9))}" opacity=".3"/>')
    _glow(out, gid, None)
    out.insert(1, '<defs>' + ''.join(gdefs) + '</defs>')
    out.append(f'<polygon points="{" ".join(pt(p) for p in octo(1))}" fill="url(#{gid}h)"/>')
    for (x, y, gs) in [(-18, -28, 6.5), (14, -10, 4)]:
        out.append(f'<path d="M{x} {y-gs} Q{x} {y} {x+gs} {y} Q{x} {y} {x} {y+gs} Q{x} {y} {x-gs} {y} Q{x} {y} {x} {y-gs}Z" fill="#fff" opacity=".95"/>')
    out.append(f'<polygon points="{" ".join(pt(p) for p in octo(1))}" fill="none" stroke="{ramp(gem,.05)}" stroke-width=".9"/>')
    return _wrap(out, size)

def _wrap(parts, size):
    return (f'<svg viewBox="-52 -52 104 104" width="{size}" height="{size}" style="overflow:visible;'
            f'filter:drop-shadow(0 {size*.035:.0f}px {size*.05:.0f}px rgba(0,0,0,.55))">' + ''.join(parts) + '</svg>')
