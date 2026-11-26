"""Swap the text 'I Do by Marisa' mark for Marisa's real logo (charcoal on light, blush on dark)."""
import sys, os
ROOT = 'file://' + os.path.dirname(os.path.abspath(__file__)) + '/'
INJ = ('<script>window.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".mark,.logo").forEach(m=>{'
 'if(!/I Do by Marisa/i.test(m.textContent))return;let el=m.parentElement,bg;'
 'while(el){const c=getComputedStyle(el).backgroundColor;if(c&&c!=="rgba(0, 0, 0, 0)"&&c!=="transparent"){bg=c;break}el=el.parentElement}'
 'const [r,g,b]=(bg||"rgb(251,247,240)").match(/[0-9.]+/g).map(Number);const dark=(0.299*r+0.587*g+0.114*b)<150;'
 'm.textContent="";const i=document.createElement("img");i.src="' + ROOT + '"+(dark?"logo-blush-crop.png":"logo-charcoal-crop.png");'
 'i.style.cssText="height:104px;width:auto;display:block";m.appendChild(i);m.style.fontSize="0";m.style.lineHeight="0";m.style.textShadow="none";m.style.opacity="1"})})</script>')
for f in sys.argv[1:]:
    s = open(f).read()
    if 'brandmark' in s: continue
    s = s.replace('</head>', '<!--brandmark-->' + INJ + '</head>', 1) if '</head>' in s else INJ + s
    open(f, 'w').write(s)
