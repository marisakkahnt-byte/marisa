"""Pinned-post carousels (1080x1350): Stitches start-here + how-to-order, I Do start-here."""
import os, sys
D = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(D, '..', 'highlights'))
import importlib.util
spec = importlib.util.spec_from_file_location('stories', os.path.join(D, '..', 'highlights', 'stories.py'))
_src = open(spec.origin).read().split('# ---------------- MARISA STITCHES ----------------')[0]
ns = {'__file__': spec.origin}; exec(_src, ns)
gem = ns['gem']

S = []
def st(set_, n, body, gems=''):
    S.append((set_, n, f'<section class="s st">{gems}<div class="in">{body}</div><div class="ft">@marisastitches</div></section>'))
def ido(set_, n, theme, body):
    S.append((set_, n, f'<section class="s ido {theme}"><div class="frame"></div><div class="in">{body}</div><div class="ft ido">@idobymarisa</div></section>'))
K = lambda t: f'<p class="k">{t}</p>'
H = lambda t, sz=130: f'<h1 style="font-size:{sz}px">{t}</h1>'
P = lambda t: f'<p class="p">{t}</p>'

# Stitches pin 1: start here
A = 'stitches_pin1_start-here'
st(A, '1', K('start here') + H('cool girls have<br>cool hobbies', 116) + P('swipe to meet the girl<br>behind the hoop →'),
   gem('heart', 'rose', 130, 110, 150, -10) + gem('round', 'dia', 120, 840, 200) + gem('emerald', 'em', 140, 120, 1080, 8) + gem('heart', 'sap', 110, 850, 1120, 12))
st(A, '2', K('hi, i’m marisa') + H('a serial hobbyist<br>who took it too far', 100) + P('needlepoint → hand embroidery →<br>one brother machine → no going back.'),
   gem('pear', 'ruby', 80, 880, 160, 12) + gem('round', 'ame', 100, 120, 1140))
st(A, '3', K('what i stitch') + H('if it holds still,<br>i’ll stitch it', 104) + '<ul class="ul"><li>names &amp; monograms</li><li>baby gifts</li><li>towels, napkins &amp; pouches</li><li>hats, sweatshirts &amp; totes</li></ul>',
   gem('marq', 'cit', 50, 120, 170, -20) + gem('heart', 'rose', 100, 860, 1130, 10))
st(A, '4', K('follow along') + H('charm,<br>threaded in.', 120) + P('custom embroidery · clinton twp, mi<br>shipping anywhere in the us') + P('<b>marisastitches.com</b>'),
   gem('heart', 'rose', 130, 120, 160, -8) + gem('round', 'dia', 110, 850, 1110))
# Stitches pin 2: how to order
B = 'stitches_pin2_how-to-order'
st(B, '1', K('how to order') + H('your name,<br>stitched', 140) + P('it’s easier than you think →'),
   gem('round', 'dia', 140, 120, 170) + gem('heart', 'rose', 120, 840, 1100, 10) + gem('emerald', 'em', 110, 860, 220, 8))
st(B, '2', K('how it works') + '<ol class="ol"><li><b>fill out the order form</b><span>wording, fonts, inspo, your date</span></li><li><b>quote within 48 hours</b><span>plus any questions</span></li><li><b>get me your item</b><span>drop it off or ship it</span></li><li><b>approve your proof</b><span>before anything is stitched</span></li><li><b>stitched &amp; sent</b><span>1–2 weeks once I have your item</span></li></ol>',
   gem('heart', 'sap', 90, 880, 120, 10))
st(B, '3', K('pricing') + '<div class="price"><div><b>$15</b><span>names, text &amp; monograms · per placement</span></div><div><b>$20</b><span>designs &amp; detailed fills · per placement</span></div></div>' + P('$7 shipping · free porch pickup in clinton twp'),
   gem('round', 'ame', 100, 860, 1140))
st(B, '4', K('the fine print, but cute') + '<ul class="ul" style="font-size:44px;line-height:1.7"><li>every order gets a mockup first</li><li>all sales final (I fix my own mistakes)</li><li>no logos or characters you don’t own</li><li>order form at marisastitches.com</li></ul>',
   gem('heart', 'rose', 110, 120, 140, -10))
# I Do pin: start here
C = 'ido_pin_start-here'
IK = lambda t: f'<p class="ik">{t}</p>'
IS = lambda t, sz=130: f'<p class="script" style="font-size:{sz}px">{t}</p>'
IP = lambda t, sz=48: f'<p class="ip" style="font-size:{sz}px">{t}</p>'
R = '<div class="rule"></div>'
ido(C, '1', 'dark', IK('start here') + IS('I marry you.<br>Or I write the words<br>for the friend who does.', 96) + IP('Swipe to see how →', 44))
ido(C, '2', 'cream', IK('01 · I officiate') + IS('The Signature Ceremony', 104) + R + IP('Your ceremony, written from your real story and delivered by me. Weddings, elopements and vow renewals around Metro Detroit.'))
ido(C, '3', 'blush', IK('02 · your friend officiates') + IS('The words', 140) + R + IP('A custom script for the friend or family member marrying you, timed and ready to read.'))
ido(C, '4', 'cream', IK('03 · officiant coaching') + IS('The confidence', 130) + R + IP('One-on-one by phone or Google Meet, so the person you picked feels ready, not just willing.'))
ido(C, '5', 'blush', IK('04 · write it yourself') + IS('The tools', 140) + R + IP('The Vow Builder, the Toast Builder, the Officiant Kit and free printables.'))
ido(C, '6', 'dark', IK('hi, I’m Marisa') + IS('Let’s tell your story', 116) + IP('Ordained minister · officiant · ceremony writer') + IP('<b>idobymarisa.com</b> · link in bio', 44))

css = open(os.path.join(D, '..', 'highlights', 'stories.html')).read().split('<style>')[1].split('</style>')[0]
css = css.replace('height:1920px', 'height:1350px') + '.st .ol li{margin-bottom:40px}.st .ol b{font-size:52px}.ft{bottom:70px}.ido .frame{inset:40px}'
fonts = '<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;700&family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Raleway:wght@600&display=swap" rel="stylesheet">'
out = ['<!doctype html><html><head><meta charset="utf-8">' + fonts + '<style>' + css + '</style></head><body>']
for i, (s, n, h) in enumerate(S):
    out.append(h.replace('<section class="s', f'<section id="p{i}" data-f="{s}" data-n="{n}" class="s', 1))
out.append('</body></html>')
open(os.path.join(D, 'pinned.html'), 'w').write('\n'.join(out)); print(len(S))
