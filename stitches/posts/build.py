"""Stitches feed carousels Dec-Feb (1080x1350). Hobby/education posts: nothing for sale while the shop is closed."""
import os
D = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(D, '..', 'pinned', 'build.py')).read()
head = src.split('# Stitches pin 1')[0]
ns = {'__file__': os.path.join(D, '..', 'pinned', 'build.py')}; exec(head, ns)
st, K, H, P, gem, S = ns['st'], ns['K'], ns['H'], ns['P'], ns['gem'], ns['S']
FUN = ''

A = 'stitches_dec11_stitch-guide'
st(A, '1', K('a quick guide') + H('needlepoint vs.<br>cross stitch vs.<br>embroidery', 108) + P('they are not the same thing<br>(i will die on this hill) →'),
   gem('heart', 'rose', 120, 120, 150, -10) + gem('round', 'dia', 110, 850, 1120))
st(A, '2', K('needlepoint') + H('stitched on<br>stiff canvas', 120) + P('every hole gets filled, so the whole<br>canvas turns into thread. usually<br>wool or silk, often hand-painted.') + FUN,
   gem('emerald', 'em', 120, 860, 150, 8))
st(A, '3', K('cross stitch') + H('little x’s<br>on a grid', 130) + P('counted fabric (aida), tiny x’s,<br>a chart you follow square by square.<br>pixel art, but make it thread.'),
   gem('round', 'sap', 110, 120, 1120))
st(A, '4', K('embroidery') + H('anything goes,<br>any fabric', 120) + P('by hand: freestyle stitches on fabric<br>in a hoop.') + P('by machine: a design digitized and<br>stitched out on hats, towels, totes.<br><b>(this is the one i take orders for,<br>when the shop is open)</b>'),
   gem('heart', 'ame', 110, 860, 140, 10))

B = 'stitches_dec18_hobby-resume'
st(B, '1', K('my hobby résumé') + H('a serial<br>hobbyist’s<br>work history', 124) + P('references available on request →'),
   gem('pear', 'ruby', 90, 880, 150, 12) + gem('heart', 'rose', 120, 110, 1110, -8))
st(B, '2', '<ol class="ol"><li><b>needlepoint</b><span>where it started. canvases everywhere.</span></li><li><b>hand embroidery</b><span>hoops, floss, a lot of podcasts.</span></li><li><b>quilting</b><span>math, but cozy.</span></li><li><b>machine embroidery</b><span>one brother machine. no going back.</span></li></ol>',
   gem('round', 'dia', 100, 860, 130))
st(B, '3', K('current position') + H('all of them,<br>at once', 130) + P('needlepoint, hoops, quilts,<br>and one very busy brother machine.') + FUN.replace('just for fun ♡ not for sale', 'hobby posts are tagged like this'),
   gem('heart', 'sap', 110, 120, 1120, 10) + gem('emerald', 'em', 100, 860, 160, -8))

C = 'stitches_jan08_needlepoint-tips'
st(C, '1', K('needlepoint for beginners') + H('5 things i<br>wish i knew', 140) + P('save this for your first canvas →'),
   gem('heart', 'rose', 120, 860, 150, 10) + gem('round', 'cit', 100, 120, 1130))
st(C, '2', '<ol class="ol"><li><b>start with a painted canvas</b><span>the design is right there, you just fill it in.</span></li><li><b>use stretcher bars</b><span>keeps the canvas tight and square.</span></li><li><b>blunt tapestry needle</b><span>it slides through holes, not thread.</span></li></ol>',
   gem('emerald', 'em', 100, 860, 120, 8))
st(C, '3', '<ol class="ol" start="4" style="counter-reset:c 3"><li><b>keep your thread short</b><span>about 18 inches, so it doesn’t fray.</span></li><li><b>basketweave for big areas</b><span>it warps the canvas less than<br>row-by-row stitching.</span></li></ol>' + P('bonus: turning it into an ornament or<br>pillow (“finishing”) is its own step.'),
   gem('heart', 'ame', 100, 120, 1140, -10))
st(C, '4', K('your turn') + H('what’s on<br>your canvas?', 130) + P('drop your wip in the comments,<br>i want to see ♡') + FUN,
   gem('heart', 'rose', 130, 110, 160, -8) + gem('round', 'dia', 110, 850, 1110))

E = 'stitches_jan22_this-or-that'
st(E, '1', K('crafty this or that') + '<ul class="ul" style="font-size:60px;line-height:2"><li>hoop <b>or</b> frame</li><li>wool <b>or</b> cotton floss</li><li>one big project <b>or</b> five wips</li><li>podcast <b>or</b> comfort show</li><li>pattern <b>or</b> wing it</li></ul>' + P('tell me yours in the comments ↓'),
   gem('heart', 'rose', 120, 120, 130, -10) + gem('emerald', 'em', 110, 850, 1130, 8) + gem('round', 'sap', 90, 880, 150))

H_ = os.path.join(D, '..', 'highlights', 'stories.html')
css = open(H_).read().split('<style>')[1].split('</style>')[0]
css = css.replace('height:1920px', 'height:1350px') + '.st .ol li{margin-bottom:40px}.st .ol b{font-size:52px}.ft{bottom:70px}.st .ul b{font-family:"DM Serif Display";font-weight:400;color:#E86A9A}'
fonts = '<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">'
out = ['<!doctype html><html><head><meta charset="utf-8">' + fonts + '<style>' + css + '</style></head><body>']
for i, (s_, n, h) in enumerate(S):
    out.append(h.replace('<section class="s', f'<section id="p{i}" data-f="{s_}" data-n="{n}" class="s', 1))
out.append('</body></html>')
open(os.path.join(D, 'pinned.html'), 'w').write('\n'.join(out)); print(len(S))
