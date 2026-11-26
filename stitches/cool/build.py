"""Stitches 'cool girl' formats (1080x1350), jewel-box style. Hobby posts, nothing for sale."""
import os
D = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(D, '..', 'pinned', 'build.py')).read().split('# Stitches pin 1')[0]
ns = {'__file__': os.path.join(D, '..', 'pinned', 'build.py')}; exec(src, ns)
gem = ns['gem']
FUN = ''
CSS = """
*{box-sizing:border-box}body{margin:0;background:#777}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;margin-bottom:10px;background:#F4EFE7;color:#2B2B2B;font-family:'DM Sans'}
.k{font:700 24px 'DM Sans';letter-spacing:.34em;text-transform:uppercase;color:#8C857A;margin:0 0 24px}
h1{font:400 150px/.88 'DM Serif Display';letter-spacing:-.045em;margin:0 0 50px}
.ft{position:absolute;left:0;right:0;bottom:56px;text-align:center;font:700 22px 'DM Sans';letter-spacing:.3em;color:#8C857A}
.fun{position:absolute;left:80px;bottom:110px;padding:12px 26px;border:2px solid #E86A9A;border-radius:999px;font:700 20px 'DM Sans';letter-spacing:.16em;text-transform:uppercase;color:#C2457A}
.pad{padding:100px 80px}
/* in/out */
.cols{display:grid;grid-template-columns:1fr 1fr;column-gap:50px}
.cols h2{margin:0 0 6px;font:700 24px 'DM Sans';letter-spacing:.3em;border-bottom:3px solid #2B2B2B;padding-bottom:14px}
.cols h2.o{color:#A8A196;border-color:#A8A196}
.cols p{margin:0;padding:28px 0;border-bottom:1px solid #D9D3C7;font:400 42px/1.1 'DM Serif Display';letter-spacing:-.02em}
.cols p.o{color:#A8A196;text-decoration:line-through;text-decoration-color:#E86A9A;text-decoration-thickness:3px}
/* notes */
.nt{background:#FBF9F6}
.nt .top{display:flex;justify-content:space-between;color:#E9B949;font:700 30px 'DM Sans';margin-bottom:60px}
.nt h3{margin:0 0 14px;font:700 86px/1.05 'DM Sans';letter-spacing:-.02em}
.nt .d{color:#A8A196;font:400 28px 'DM Sans';margin-bottom:60px}
.nt p{margin:0 0 50px;font:400 54px/1.25 'DM Sans'}
.nt p::before{content:'💎 '}
/* starter pack */
.grid{display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:10px}
.tile{background:#fff;border-radius:34px;height:245px;position:relative;padding:26px 30px;display:flex;align-items:flex-end;font:400 44px/1.05 'DM Serif Display';letter-spacing:-.02em;box-shadow:0 10px 30px rgba(43,43,43,.06)}
.tile span{position:absolute;top:24px;right:26px;font-size:64px}
/* thread */
.th{background:#FBF9F6;padding:90px 70px}
.th .hd{text-align:center;margin-bottom:60px;font:700 38px 'DM Sans'}
.th .hd small{display:block;font:400 22px 'DM Sans';color:#A8A196;letter-spacing:.2em;text-transform:uppercase;margin-top:6px}
.b{max-width:760px;padding:26px 40px;border-radius:48px;font:400 46px/1.2 'DM Sans';margin:0 0 22px;width:fit-content}
.b.l{background:#E9E4DA}.b.r{background:#2F6FD6;color:#fff;margin-left:auto}
.ts{text-align:center;color:#A8A196;font:700 20px 'DM Sans';letter-spacing:.2em;margin:30px 0}
/* film */
.film{background:#151317}.film .frame{position:absolute;left:0;right:0;top:215px;height:920px;background:radial-gradient(ellipse at 50% 40%,#3b2f45,#221b28 60%,#151317)}
.film .tc{position:absolute;left:0;right:0;top:95px;text-align:center;font:700 22px 'DM Sans';letter-spacing:.4em;color:#8C857A}
.film .sub{position:absolute;left:60px;right:60px;bottom:340px;text-align:center;font:500 52px/1.3 'DM Sans';color:#F6EED3;text-shadow:0 2px 6px #000}
.film .ft{color:#8C857A}
"""
S = []
def sec(i, cls, body, gems=''):
    S.append(f'<section class="s {cls}" id="{i}">{gems}{body}<div class="ft">@marisastitches</div></section>')
IN = ['one more wip', 'color-coded thread', 'hand-stitched gifts', 'monogram everything', 'podcast + hoop night', 'sparkly thread']
OUT = ['finishing things', 'a “reasonable” stash', 'store-bought gifts', 'plain tote bags', 'doomscrolling', 'beige thread only']
sec('inout', 'pad', '<p class="k">craft girl edition</p><h1>in / out<br>2027</h1><div class="cols"><h2>IN</h2><h2 class="o">OUT</h2>'
    + ''.join(f'<p>{a}</p><p class="o">{b}</p>' for a, b in zip(IN, OUT)) + '</div>',
    gem('heart', 'rose', 130, 830, 90, 10) + gem('round', 'dia', 100, 690, 230))
sec('notes', 'nt pad', '<div class="top"><span>‹ Notes</span><span>Done</span></div><h3>rules i stitch by</h3><div class="d">a serial hobbyist’s handbook</div>'
    '<p>always test on scrap first</p><p>the back should be neat (mostly)</p><p>buy the sparkly thread</p><p>one more row, then bed (lie)</p><p>a wip is not a failure, it’s a pause</p><p>if it holds still, monogram it</p>')
sec('starter', 'pad', '<p class="k">the</p><h1 style="font-size:120px">serial hobbyist<br>starter pack</h1><div class="grid">'
    + ''.join(f'<div class="tile"><span>{e}</span>{t}</div>' for e, t in [('🪡', 'a hoop in every bag'), ('🧵', 'a thread stash with its own zip code'), ('🎧', 'a 400-episode podcast queue'), ('📦', '9 wips, 0 regrets'), ('🖼️', 'needlepoint canvases “for later”'), ('💎', 'one machine that changed everything')]) + '</div>',
    gem('heart', 'sap', 110, 880, 110, 12))
sec('thread', 'th', '<div class="hd">bestie 💎<small>imessage</small></div><p class="b l">wait you do needlepoint AND embroidery AND quilting??</p>'
    '<p class="b r">and machine embroidery</p><p class="b l">how many hobbies is too many</p><p class="b r">i don’t understand the question</p>'
    '<p class="ts">READ 11:52 PM</p><p class="b l">ok but can you teach me</p><p class="b r">pick up a hoop. welcome to the rest of your life</p>' + '<div style="text-align:center;margin-top:24px">' + FUN.replace('class="fun"', 'class="fun" style="position:static;display:inline-block"') + '</div>')
S.append('<section class="s film" id="justagirl"><div class="frame"></div><p class="tc">scene 01 · the craft store</p>'
         '<p class="sub">“I’m just a girl, standing in front of the<br>thread aisle, asking it not to make me<br>buy more thread.”</p>' + gem('round', 'dia', 90, 900, 250) + gem('heart', 'rose', 80, 110, 1020, -10) + gem('round', 'ame', 60, 960, 1050) + '<div class="ft">@marisastitches</div></section>')
fonts = '<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">'
open(os.path.join(D, 'cool.html'), 'w').write('<!doctype html><html><head><meta charset="utf-8">' + fonts + '<style>' + CSS + '</style></head><body>' + ''.join(S) + '</body></html>')
