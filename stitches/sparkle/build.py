"""Stitches cool-girl sparkle posts (1080x1350), jewel-box brand with gems."""
import os
D=os.path.dirname(os.path.abspath(__file__))
src=open(os.path.join(D,'..','pinned','build.py')).read().split('# Stitches pin 1')[0]
ns={'__file__':os.path.join(D,'..','pinned','build.py')};exec(src,ns)
import sys as _s;_s.path.insert(0,D)
from gems import gem
CSS="""*{box-sizing:border-box}body{margin:0;background:#777}p{margin:0}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;margin-bottom:10px;background:#F4EFE7;color:#2B2B2B;font-family:'DM Sans'}
.ink{background:#1F1D24;color:#F4EFE7}
.k{font:700 24px 'DM Sans';letter-spacing:.34em;text-transform:uppercase;color:#8C857A;margin:0 0 24px}
.ink .k{color:#BDB3C9}
h1{font:400 140px/.9 'DM Serif Display';letter-spacing:-.045em;margin:0 0 40px}
h1 i{font-style:italic;color:#C2457A}
.ink h1 i{color:#E8A9C6}
.sub{font:400 40px/1.3 'DM Sans';color:#5B554C}.ink .sub{color:#CFC7D9}
.ft{position:absolute;left:0;right:0;bottom:50px;text-align:center;font:700 22px 'DM Sans';letter-spacing:.3em;color:#8C857A}
.pad{padding:120px 90px}
.spark{position:absolute;color:#E9B949;font-size:46px}
.bs{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:10px}
.bs div{background:#fff;border-radius:28px;height:225px;position:relative;padding:20px 24px;display:flex;flex-direction:column;justify-content:flex-end;box-shadow:0 10px 26px rgba(43,43,43,.06)}
.bs b{font:400 40px/1 'DM Serif Display'}.bs small{font:500 21px 'DM Sans';color:#8C857A;margin-top:6px}
.bs svg{position:absolute!important;left:auto!important;right:18px!important;top:16px!important}
.math p{font:400 58px/1.25 'DM Serif Display';margin:0 0 26px}
.math .eq{border-top:3px solid #2B2B2B;padding-top:26px;margin-top:20px;font:italic 400 92px/1 'DM Serif Display';color:#C2457A}
.rules p{font:400 50px/1.2 'DM Serif Display';padding:34px 0;border-bottom:1px solid #D9D3C7;display:flex;gap:30px}
.rules span{font:700 26px 'DM Sans';color:#C2457A;letter-spacing:.2em;padding-top:12px;min-width:60px}
.tot{display:grid;grid-template-columns:1fr 110px 1fr;row-gap:30px;align-items:center;margin-top:40px;font:400 48px/1.05 'DM Serif Display'}
.tot .o{text-align:center;font:700 22px 'DM Sans';letter-spacing:.2em;color:#C2457A}
.tot .r{text-align:right}
.math p.k,.rules p.k{font:700 24px 'DM Sans';letter-spacing:.34em;padding:0;border:0;display:block;margin:0 0 24px}
.q{font:italic 400 120px/.98 'DM Serif Display';letter-spacing:-.03em}
"""
F='<div class="ft">@marisastitches</div>'
SP=lambda x,y,s=46:f'<span class="spark" style="left:{x}px;top:{y}px;font-size:{s}px">✦</span>'
S=[]
S.append(f'<section class="s ink pad" id="bs1">{gem("round","dia",170,800,140)+gem("heart","rose",120,860,1040,12)+gem("emerald","em",110,110,1080,-8)}{SP(720,110)}{SP(300,1180,34)}'
 '<p class="k" style="margin-top:220px">a little sparkle</p><h1>your monogram,<br>in your <i>birthstone</i></h1><p class="sub">swipe to find your month →<br>then screenshot it. (you know you will.)</p>'+F+'</section>')
M=[('jan','garnet','ruby'),('feb','amethyst','ame'),('mar','aquamarine','aqua'),('apr','diamond','dia'),('may','emerald','em'),('jun','pearl','dia'),
   ('jul','ruby','ruby'),('aug','peridot','em'),('sep','sapphire','sap'),('oct','opal','rose'),('nov','citrine','cit'),('dec','blue topaz','aqua')]
T={'garnet':'deep wine','amethyst':'violet','aquamarine':'sea glass','diamond':'silver','emerald':'emerald','pearl':'ivory','ruby':'cherry','peridot':'lime','sapphire':'navy','opal':'blush','citrine':'gold','blue topaz':'sky'}
tiles=''.join(f'<div>{gem("round",c,64,0,0)}<b>{m}</b><small>{g} · {T[g]} thread</small></div>' for m,g,c in M)
S.append(f'<section class="s pad" id="bs2" style="padding-top:90px"><p class="k">thread color, by month</p><h1 style="font-size:96px;margin-bottom:30px">the birthstone edit</h1><div class="bs">{tiles}</div>'+F+'</section>')
S.append(f'<section class="s pad math" id="gm">{gem("heart","rose",120,860,140,10)+gem("round","cit",80,130,1120)}{SP(800,120)}'
 '<p class="k" style="margin-top:200px">girl math, monogram edition</p><p>one monogram: $15</p><p>times you’ll use that towel this year: 365</p><p class="eq">basically<br>4¢ a day</p><p class="sub" style="margin-top:40px">so it’s free. we did the math. ✦</p>'+F+'</section>')
R=['tone-on-tone is always the chic choice','one placement beats five','small letters look more expensive','script for soft, serif for old money','gold thread is a personality']
rows=''.join(f'<p><span>0{i}</span>{r}</p>' for i,r in enumerate(R,1))
S.append(f'<section class="s pad rules" id="rules">{gem("emerald","em",90,930,50,8)}{SP(880,40,30)}<p class="k">the rules</p><h1 style="font-size:110px">how to monogram<br><i>like an it girl</i></h1>{rows}'+F+'</section>')
O=[('script','serif'),('gold thread','tone-on-tone'),('pearl','diamond'),('towel','tote'),('one letter','all three')]
rows=''.join(f'<div>{a}</div><div class="o">or</div><div class="r">{b}</div>' for a,b in O)
S.append(f'<section class="s pad" id="tot">{gem("pear","ruby",80,930,60,12)+gem("round","ame",90,110,1130)}{SP(150,120,36)}<p class="k" style="text-align:center">this or that</p><h1 style="text-align:center;font-size:120px">sparkle <i>edition</i></h1><div class="tot">{rows}</div><p class="sub" style="text-align:center;margin-top:60px">drop your answers below ✦</p>'+F+'</section>')
S.append(f'<section class="s ink pad" id="quote" style="display:flex;flex-direction:column;justify-content:center">{gem("heart","rose",150,780,150,10)+gem("round","dia",120,140,1040)+gem("emerald","sap",90,860,1080,-8)}{SP(720,130)}{SP(260,1010,34)}{SP(880,980,28)}'
 '<p class="k">a reminder</p><p class="q">life’s too<br>short for<br><i>plain towels.</i></p>'+F+'</section>')
fonts='<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">'
open(os.path.join(D,'sp.html'),'w').write('<!doctype html><html><head><meta charset="utf-8">'+fonts+'<style>'+CSS+'</style></head><body>'+''.join(S)+'</body></html>')
