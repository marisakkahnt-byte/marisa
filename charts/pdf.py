"""Needlepoint chart PDFs (HTML -> PDF via Playwright). Letter size, 4 pages: cover, how-to, chart, key."""
import json, base64
C = json.load(open('charts.json'))
SYM = ['·', '●', '▲', '■', '◆', '★', '✚']
NAMES = {'busy': 'busy', 'stitch-please': 'stitch, please.', 'gem-heart': 'the gem heart'}
CSS = '''@page{size:letter;margin:0}body{margin:0;font-family:'DM Sans'}.pg{width:8.5in;height:11in;box-sizing:border-box;padding:.6in;position:relative;page-break-after:always;background:#F2EEE7}
h1{font:400 54px/1 'DM Serif Display';margin:0;color:#1F1D24}.k{font:700 11px 'DM Sans';letter-spacing:.3em;color:#0E4A38}.hand{font:400 30px 'Nanum Pen Script';color:#0E4A38}
p,li{font:400 13.5px/1.55 'DM Sans';color:#2b2830}.foot{position:absolute;left:.6in;right:.6in;bottom:.4in;display:flex;justify-content:space-between;font:700 9px 'DM Sans';letter-spacing:.2em;color:#8a8590}
table.key{border-collapse:collapse;margin-top:14px}table.key td{padding:7px 14px;border-bottom:1px solid #ddd5c6;font:400 13px 'DM Sans'}.sw{width:30px;height:20px;border-radius:3px;border:1px solid rgba(0,0,0,.2)}'''
def svg_chart(c, cell, x0=0, x1=None, y0=0, y1=None):
    w, h, g, pal = c['w'], c['h'], c['grid'], c['pal']
    x1 = x1 or w; y1 = y1 or h; cw, ch = x1-x0, y1-y0; M = 26
    W, H = cw*cell, ch*cell; out = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W+M+4}" height="{H+M+4}" viewBox="{-M} {-M} {W+M+4} {H+M+4}" font-family="DM Sans">']
    bg = max(range(len(pal)), key=lambda i: sum(r.count(i) for r in g))
    for y in range(y0, y1):
        for x in range(x0, x1):
            i = g[y][x]; col = pal[i][1]; X, Y = (x-x0)*cell, (y-y0)*cell
            out.append(f'<rect x="{X}" y="{Y}" width="{cell}" height="{cell}" fill="{col}" fill-opacity="{0.18 if i==bg else 0.7}"/>')
            if i != bg: out.append(f'<text x="{X+cell/2}" y="{Y+cell*.74}" font-size="{cell*.66}" text-anchor="middle" fill="#1F1D24">{SYM[i]}</text>')
    for x in range(x0, x1+1):
        X=(x-x0)*cell; out.append(f'<line x1="{X}" y1="0" x2="{X}" y2="{H}" stroke="#1F1D24" stroke-width="{1.3 if x%10==0 else .3}"/>')
        if x%10==0 and x<x1: out.append(f'<text x="{X+2}" y="-8" font-size="10" fill="#0E4A38">{x+1}</text>')
    for y in range(y0, y1+1):
        Y=(y-y0)*cell; out.append(f'<line x1="0" y1="{Y}" x2="{W}" y2="{Y}" stroke="#1F1D24" stroke-width="{1.3 if y%10==0 else .3}"/>')
        if y%10==0 and y<y1: out.append(f'<text x="-6" y="{Y+10}" font-size="10" text-anchor="end" fill="#0E4A38">{y+1}</text>')
    return ''.join(out) + '</svg>', bg
def stitched(c, cell=8):
    w, h, g, pal = c['w'], c['h'], c['grid'], c['pal']; o=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{w*cell}" height="{h*cell}">']
    for y in range(h):
        for x in range(w):
            col = pal[g[y][x]][1]
            o.append(f'<rect x="{x*cell}" y="{y*cell}" width="{cell}" height="{cell}" fill="{col}"/><path d="M{x*cell+1} {y*cell+cell-1} L{x*cell+cell-1} {y*cell+1}" stroke="rgba(255,255,255,.22)" stroke-width="{cell*.35}"/>')
    return ''.join(o)+'</svg>'
for k, c in C.items():
    w, h = c['w'], c['h']; name = NAMES[k]
    import math
    nx = math.ceil(w/60); ny = math.ceil(h/66); TW = math.ceil(w/nx); TH = math.ceil(h/ny)
    tiles = [(x0, min(x0+TW, w), y0, min(y0+TH, h)) for y0 in range(0, h, TH) for x0 in range(0, w, TW)]
    cell = min(13.2, 690/TW, 850/TH)
    bg = svg_chart(c, cell, 0, 1, 0, 1)[1]
    chartpages = ''.join(f'<div class="pg" style="display:flex;flex-direction:column;align-items:center"><div class="k">THE CHART · PART {n+1} OF {len(tiles)}</div><p style="margin:4px 0 10px">columns {a+1}–{b} · rows {cc+1}–{d}</p>{svg_chart(c, cell, a, b, cc, d)[0]}<p style="margin-top:10px">Bold lines every 10 stitches. Pale squares = background color.</p>{{FOOT}}</div>' for n,(a,b,cc,d) in enumerate(tiles))
    counts = [sum(r.count(i) for r in c['grid']) for i in range(len(c['pal']))]
    rows = ''.join(f'<tr><td>{SYM[i] if i!=bg else "(pale)"}</td><td><div class="sw" style="background:{col}"></div></td><td>{nm}{" — background" if i==bg else ""}</td><td>{counts[i]:,} stitches</td></tr>' for i,(nm,col) in enumerate(c['pal']))
    sz = lambda mesh: f'{w/mesh:.1f}" × {h/mesh:.1f}"'
    foot = f'<div class="foot"><span>MARISA STITCHES · {name.upper()}</span><span>PERSONAL USE ONLY · PLEASE DON\'T SHARE OR RESELL</span></div>'
    prev = stitched(c, max(2, int(6.6*96/w)))
    html = f'''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;700&family=Nanum+Pen+Script&display=swap" rel="stylesheet"><style>{CSS}</style></head><body>
<div class="pg" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center"><div class="k">MARISA STITCHES · NEEDLEPOINT CHART</div><h1 style="font-size:72px;margin-top:14px">{name}</h1><div class="hand" style="margin:6px 0 34px">a chart for your next canvas ✦</div>
<div style="padding:18px;background:#fff;border-radius:10px;box-shadow:0 14px 30px rgba(0,0,0,.12)">{prev}</div>
<p style="margin-top:30px">{w} × {h} stitches · {sz(13)} on 13 mesh · {sz(18)} on 18 mesh</p>{foot}</div>
<div class="pg"><div class="k">BEFORE YOU START</div><h1 style="margin:10px 0 18px">how to use this chart</h1>
<ul><li>Each square on the chart = <b>one tent stitch</b> on your canvas. This is a needlepoint chart: work every square, background included, in tent stitch (continental or basketweave).</li>
<li><b>Canvas:</b> 13-mesh mono or interlock canvas is easiest ({sz(13)} design). For a smaller, finer piece use 18 mesh ({sz(18)}). Leave at least 2" of bare canvas on every side for finishing.</li>
<li><b>Thread:</b> match the colors in the key with any brand you love (wool, cotton, silk or blends). On 13 mesh use thread that covers the canvas well; on 18 mesh go thinner.</li>
<li><b>Start</b> by finding the center (the bold lines mark every 10 stitches) and work the design first, then fill the background.</li>
<li><b>Finish</b> it as a pillow, a pouch insert, an ornament, a framed piece or a key fob, whatever you like.</li></ul>
<p style="margin-top:22px">Questions? DM @marisastitches. Tag me when you finish so I can see it. ✦</p>{foot}</div>
{chartpages.replace('{FOOT}', foot)}
<div class="pg"><div class="k">COLOR KEY</div><h1 style="margin:10px 0">thread colors</h1><table class="key">{rows}</table>
<p style="margin-top:26px">Stitch counts help you buy enough thread. Buy a little extra of the background color.</p>
<p style="margin-top:40px;font-size:11px;color:#6a6570">© 2026 Marisa Stitches. This chart is for personal use. Please don't share, copy or resell the chart or sell finished pieces made from it without permission.</p>{foot}</div>
</body></html>'''
    open(f'chart_{k}.html', 'w').write(html)
print('ok')
