s=open('build.py').read()
def rep(a,b):
  global s
  assert a in s,a[:60]; s=s.replace(a,b)
a=s.index("P=[('Oat'");b=s.index("]",a)+1
s=s[:a]+"P=[('Oat','#F4EFE7','backgrounds'),('Linen','#FBF9F6','pages'),('Ink','#1F1D24','text, dark posts'),('Emerald','#0E4A38','heirloom green'),('Camel','#C49A64','cheetah, warmth'),('Gold','#B8914A','thread, foil'),('Blush','#F6D4E0','soft pop')]"+s[b:]
rep('{"color:#F4EFE7" if n=="Ink" else ""}','{"color:#F4EFE7" if n in ("Ink","Emerald") else ""}')
rep("02 · palette: clean base + two pastel pops","02 · palette: heirloom base + one soft pop")
a=s.index("PR=[");b=s.index("]\n",a)+1
s=s[:a]+"""PR=[('cheetah · classic',cheetah('#C49A64','#3A2618','#1F1D24',3),''),('cheetah · cream',cheetah('#F4EFE7','#C49A64','#1F1D24',4),''),
    ('zebra · black + white',zebra('#FBF9F6','#1F1D24',5),''),('zebra · cream + ink',zebra('#F4EFE7','#2B2B2B',6),''),
    ('polka · emerald',dots('#0E4A38','#F4EFE7',8,46),''),('polka · ink',dots('#1F1D24','#F4EFE7',8,46),''),
    ('polka · blush',dots('#F6D4E0','#FBF9F6',10,52),''),('cheetah · emerald',cheetah('#0E4A38','#C49A64','#081F18',7),'')]"""+s[b:]
rep('cheetah("#F6D4E0","#E8509A","#1F1D24",9)','cheetah("#C49A64","#3A2618","#1F1D24",9)')
rep('she’s a <i style="color:#E8509A">gem</i>','she’s a <i style="color:#0E4A38">gem</i>')
rep("90s-sticker-book energy, but chic: max 2–3 colors per print (pink, lilac, ink, cream). never rainbow.","matches your real packaging: classic cheetah mailers, zebra bags, emerald mailers. 2–3 colors per print, never rainbow.")
rep("<li><b>Prints, not rainbow.</b> Cheetah, zebra and polka dot in 2–3 colors max (hot pink, blush, lilac, ink, cream). Use a print on about 1 in 5 posts, usually behind a clean cream card.</li>",
 "<li><b>Heirloom, but cool.</b> Old-world monograms, gold thread, emerald and cream, mixed with classic cheetah and zebra. Grandma’s linens meet a downtown girl.</li><li><b>Prints, not rainbow.</b> Classic cheetah, black-and-white zebra, emerald or ink polka dot. 2–3 colors max, about 1 in 5 posts, usually behind a clean cream card.</li><li><b>Pink is a whisper.</b> Blush is the only pastel now, a soft pop.</li>")
rep('<div class="tile stripe" style="height:150px"><p class="cap" style="color:#9E2E5F">blush stripe</p></div><div class="tile lstripe" style="height:150px"><p class="cap" style="color:#5C3E8A">lilac stripe</p></div>',
 '<div class="tile" style="height:150px;background:#0E4A38"><span style="font:italic 400 64px Cormorant Garamond;color:#D9C08F">Ms</span><p class="cap" style="color:#C9D8CF">emerald + gold</p></div><div class="tile" style="height:150px;background:repeating-linear-gradient(90deg,#F4EFE7 0 30px,#EDE3D3 30px 60px)"><p class="cap" style="color:#7A6148">ticking stripe</p></div>')
rep("03 · stripes + sky","03 · heirloom textures")
rep("H.append(f'<div class=\"card\" style=\"margin-bottom:24px\"><p class=\"k\" style=\"margin-bottom:18px\">01 · logo",open('crest_snip.txt').read()+"H.append(f'<div class=\"card\" style=\"margin-bottom:24px\"><p class=\"k\" style=\"margin-bottom:18px\">01 · logo")
rep('grid-template-columns:1.25fr 1fr 1fr;margin:0">{L1}{L2}{L3}','grid-template-columns:1.15fr 1fr 1fr 1fr;margin:0">{L1}{L2}{L4}{L3}')
rep("01 · logo (pick one, or use A + B together)","01 · logo (pick one, or pair a wordmark with a badge)")
rep('background:#F6D4E0;display:flex;align-items:center;justify-content:center"','background:#F4EFE7;border:2px solid #B8914A;display:flex;align-items:center;justify-content:center"')
rep("{word(96)}","{word(74)}")
rep('font-size:72px">she’s a gem','font-size:58px">she’s a gem')
rep("# fonts + voice",open('pk_snip.txt').read()+"# fonts + voice")
rep("05 · fonts","06 · fonts");rep("06 · voice","07 · voice");rep("07 · rules","08 · rules")
rep("04 · prints: cheetah, zebra, polka dot","04 · prints: classic cheetah, zebra, polka dot")
rep('she’s a gem.<br>monogram everything.<br>life’s too short for <i style="color:#C2457A">plain towels.</i>','she’s a gem.<br>made to be <i style="color:#0E4A38">kept.</i><br>tomorrow’s heirloom, stitched today.')
rep("chic, a little funny, big hobby-girl energy.","heirloom-chic, a little funny, cool-girl energy.")
rep("Brand board · v3 · chic, with more sparkle + prints","Brand board · v3 · heirloom, but make it cool")
rep("clean base. real gems. pastel pops. a little cheetah.","emerald. gold thread. classic cheetah. real gems.")
rep("h1 i{color:#C2457A}","h1 i{color:#0E4A38}")
rep('DM Serif <i style="color:#C2457A">Display</i>','DM Serif <i style="color:#0E4A38">Display</i>')
rep("italic in rose for","italic in emerald for")
rep("family=DM+Serif+Display:ital@0;1&","family=Cormorant+Garamond:ital,wght@0,500;1,400&family=DM+Serif+Display:ital@0;1&")
rep('<p style="font:500 34px DM Sans">DM Sans</p>','<p style="font:italic 400 40px Cormorant Garamond">Cormorant, for the monogram crest only</p><p style="font:500 34px DM Sans;margin-top:14px">DM Sans</p>')
open('build.py','w').write(s)
