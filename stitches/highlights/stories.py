"""Highlight story slides (1080x1920) for Marisa Stitches + I Do by Marisa -> stories.html (rendered by stories.js)."""
import os, html
D = os.path.dirname(os.path.abspath(__file__))
GR = {'rose': ['#FFD3E4', '#E86A9A', '#9E2E5F'], 'sap': ['#BFD8FF', '#2F6FD6', '#173C86'], 'em': ['#B6F0CC', '#1FA35B', '#0B5A31'],
      'dia': ['#FFFFFF', '#DCE2EA', '#9AA4B2'], 'ame': ['#E5D9FF', '#8E6CD8', '#4A3187'], 'ruby': ['#FFB3BF', '#C8203E', '#6E0E21'], 'cit': ['#FFF2C4', '#E9B949', '#93661A']}
SH = {'heart': ['0 0 100 92', 'M50 90 6 42C-6 26 4 4 26 4c11 0 19 6 24 15C55 10 63 4 74 4c22 0 32 22 20 38z', '<path d="M50 90 30 30 50 19 70 30zM6 42l24-12L26 4M94 42 70 30 74 4M30 30H6M70 30h24" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.6"/><ellipse cx="28" cy="20" rx="9" ry="5" fill="#fff" fill-opacity=".7" transform="rotate(-30 28 20)"/>'],
      'round': ['0 0 100 80', 'M22 4h56l20 22-48 52L2 26z', '<path d="M2 26h96M22 4l12 22 16 52M78 4 66 26 50 78M34 26 50 4l16 22" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6"/><path d="M34 26 50 4 66 26z" fill="#fff" fill-opacity=".3"/>'],
      'emerald': ['0 0 100 70', 'M16 2h68l14 14v38L84 68H16L2 54V16z', '<path d="M28 14h44l8 8v26l-8 8H28l-8-8V22z" fill="#fff" fill-opacity=".15" stroke="#fff" stroke-opacity=".5" stroke-width="1.4"/><path d="M30 18h20l-8 10H26z" fill="#fff" fill-opacity=".45"/>'],
      'pear': ['0 0 70 100', 'M35 2C52 24 68 46 68 64a33 33 0 0 1-66 0C2 46 18 24 35 2z', '<path d="M35 2v62M35 64 6 52M35 64l29-12M35 64 14 88M35 64l21 24" stroke="#fff" stroke-opacity=".45" stroke-width="1.4"/><ellipse cx="22" cy="44" rx="6" ry="12" fill="#fff" fill-opacity=".45" transform="rotate(20 22 44)"/>'],
      'marq': ['0 0 60 100', 'M30 2c22 24 26 72 0 96C4 74 8 26 30 2z', '<path d="M30 2v96M30 50 8 30M30 50l22-20M30 50 8 70M30 50l22 20" stroke="#fff" stroke-opacity=".45" stroke-width="1.4"/>']}
STAR = '<path d="M0-10C1-3 3-1 10 0 3 1 1 3 0 10-1 3-3 1-10 0-3-1-1-3 0-10z" fill="#fff"/>'
n = [0]
def gem(shape, g, w, x, y, rot=0):
    vb, d, lines = SH[shape]; a, b, c = GR[g]; n[0] += 1; i = n[0]
    return (f'<svg viewBox="{vb}" width="{w}" style="position:absolute;left:{x}px;top:{y}px;transform:rotate({rot}deg);filter:drop-shadow(0 14px 18px rgba(40,30,20,.22));overflow:visible">'
            f'<defs><linearGradient id="g{i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{a}"/><stop offset=".45" stop-color="{b}"/><stop offset="1" stop-color="{c}"/></linearGradient></defs>'
            f'<path d="{d}" fill="url(#g{i})"/>{lines}<g transform="translate(30 22) scale(.8)" style="filter:drop-shadow(0 0 4px #fff)">{STAR}</g></svg>')

S = []  # (folder, filename, html)
# ---------------- MARISA STITCHES ----------------
def st(folder, fn, body, gems='', sticker=False):
    stk = '<div class="stk">↓ add a link sticker here ↓</div>' if sticker else ''
    S.append(('stitches/' + folder, fn, f'<section class="s st">{gems}<div class="in">{body}</div>{stk}<div class="ft">@marisastitches</div></section>'))
K = lambda t: f'<p class="k">{t}</p>'
H = lambda t, sz=150: f'<h1 style="font-size:{sz}px">{t}</h1>'
P = lambda t: f'<p class="p">{t}</p>'

st('01_start-here', '1', K('start here') + H('hi, i’m<br>marisa') + P('a serial hobbyist who<br>took it too far.'),
   gem('heart', 'rose', 150, 120, 260, -10) + gem('round', 'dia', 130, 820, 380) + gem('emerald', 'em', 150, 140, 1420, 8) + gem('heart', 'sap', 120, 820, 1500, 12))
st('01_start-here', '2', K('what i stitch') + H('if it holds still,<br>i’ll stitch it', 112) +
   '<ul class="ul"><li>names &amp; monograms</li><li>baby gifts</li><li>towels, napkins &amp; pouches</li><li>hats, sweatshirts &amp; totes</li></ul>',
   gem('pear', 'ruby', 90, 860, 260, 12) + gem('round', 'ame', 120, 110, 1520))
st('01_start-here', '3', K('the studio') + H('one brother machine,<br>no going back', 104) + P('custom embroidery in clinton twp, mi.<br>shipping anywhere in the us.') + P('<b>marisastitches.com</b>'),
   gem('heart', 'rose', 130, 830, 300, 10) + gem('marq', 'cit', 60, 160, 340, -20), sticker=True)

st('02_how-to-order', '1', K('how to order') + H('all custom.<br>you bring the item,<br>i stitch it.', 112),
   gem('round', 'dia', 150, 110, 300) + gem('heart', 'rose', 120, 830, 1460, 10))
st('02_how-to-order', '2', K('how it works') +
   '<ol class="ol"><li><b>fill out the order form</b><span>wording, fonts, inspo, your date</span></li><li><b>i reply within 48 hours</b><span>with a quote + any questions</span></li>'
   '<li><b>get me your item</b><span>drop it off or ship it to me</span></li><li><b>approve your proof</b><span>a mockup before anything is stitched</span></li><li><b>stitched &amp; sent</b><span>paid in full before pickup or shipping</span></li></ol>',
   gem('emerald', 'em', 110, 860, 220, 8))
st('02_how-to-order', '3', K('pricing') +
   '<div class="price"><div><b>$15</b><span>names, text &amp; monograms<br>per placement</span></div><div><b>$20</b><span>designs &amp; detailed fills<br>per placement</span></div></div>' +
   P('$7 flat shipping · free porch pickup in clinton twp<br>pouches, bibs &amp; bath towels in stock for $5'),
   gem('heart', 'sap', 120, 110, 240, -10) + gem('round', 'ame', 110, 850, 1520))
st('02_how-to-order', '4', K('shop status') + H('taking a little<br>break ♡', 130) + P('follow along here, and i’ll post<br>the second the shop reopens.') + P('when it does, the order form at<br><b>marisastitches.com</b> is the only way to order.'),
   gem('heart', 'rose', 140, 820, 280, 12) + gem('round', 'dia', 110, 140, 1480))

st('03_the-work', '1', K('the work') + H('fresh off<br>the hoop') + P('every piece is one of a kind.'),
   gem('emerald', 'em', 160, 120, 300, -8) + gem('heart', 'rose', 120, 830, 360, 10) + gem('round', 'dia', 120, 160, 1480) + gem('pear', 'ruby', 90, 860, 1460, 14))

quotes = ['i love u for life 😭😭😭😭<br>this is so beautiful<br>thank you!!!', 'it’s so darn cute!<br>you really outdid yourself…<br>i can’t thank you enough,<br>and neither can baxter!!',
          'this is the sweetest<br>thing EVER!!!!!!<br>this made my whole week 🥹💗']
for k, q in enumerate(quotes):
    st('04_kind-words', str(k + 1), K('kind words') + f'<p class="q">“{q}”</p>' + P('— a very happy customer ♡'),
       gem(['heart', 'round', 'heart'][k], ['sap', 'dia', 'rose'][k], 140, [120, 820, 130][k], [300, 320, 1460][k], [-10, 0, 8][k]))

# ---------------- I DO BY MARISA ----------------
def ido(folder, fn, theme, body, sticker=False):
    stk = '<div class="stk ido">↓ add a link sticker here ↓</div>' if sticker else ''
    S.append(('i-do/' + folder, fn, f'<section class="s ido {theme}"><div class="frame"></div><div class="in">{body}</div>{stk}<div class="ft ido">@idobymarisa</div></section>'))
IK = lambda t: f'<p class="ik">{t}</p>'
IS = lambda t, sz=150: f'<p class="script" style="font-size:{sz}px">{t}</p>'
IP = lambda t, sz=52: f'<p class="ip" style="font-size:{sz}px">{t}</p>'
R = '<div class="rule"></div>'

ido('01_Start-Here', '1', 'dark', IK('start here') + IS('Hi, I’m Marisa') + IP('Ordained minister, ceremony writer and officiant coach in Metro Detroit.'))
ido('01_Start-Here', '2', 'cream', IK('how I can help') + IS('Your story, out loud', 120) + R +
    '<ul class="iul"><li>Ceremony scripts for when a friend officiates</li><li>Officiant coaching by phone or Google Meet</li><li>Vow writing help</li><li>Officiating on select dates</li></ul>')
ido('01_Start-Here', '3', 'blush', IK('let’s talk') + IS('Tell me your story', 130) + IP('Scripts and coaching happen anywhere in the U.S.') + IP('<b>idobymarisa.com</b>', 48), sticker=True)

ido('02_Scripts', '1', 'dark', IK('script-only ceremonies') + IS('Your friend officiates.<br>I write the words.', 112))
ido('02_Scripts', '2', 'cream', IK('how it works') +
    '<ol class="iol"><li><b>You tell me your story</b><span>A questionnaire for each of you, or voice notes.</span></li><li><b>I write your ceremony</b><span>From scratch. Timed, paced and ready to read.</span></li>'
    '<li><b>You review it</b><span>Or keep it a surprise. Your call.</span></li><li><b>Your officiant reads it</b><span>And everyone asks how they wrote it.</span></li></ol>')
ido('02_Scripts', '3', 'blush', IK('in every script') + IS('Every pause, planned', 120) + R +
    '<ul class="iul"><li>Your real story, never a template</li><li>Timing for every section</li><li>[Pause] and [Beat] cues for your officiant</li><li>Who moves when, and where to stand</li><li>A print-ready PDF for the binder</li></ul>')
ido('02_Scripts', '4', 'dark', IK('booking 2027') + IS('Let’s write yours', 130) + IP('Book at least 3 weeks before the wedding.') + IP('Inquire at <b>idobymarisa.com</b>', 48), sticker=True)

ido('03_Coaching', '1', 'blush', IK('officiant coaching') + IS('For the friend<br>who said yes', 130))
ido('03_Coaching', '2', 'cream', IK('what we cover') + IS('Ready, not just willing', 110) + R +
    '<ul class="iul"><li>Pacing, pauses and nerves</li><li>Where to stand and when to step aside</li><li>Mic and logistics</li><li>Your practice plan</li></ul>' + IP('One-on-one by phone or Google Meet, wherever the wedding is.', 46))
ido('03_Coaching', '3', 'dark', IK('give it as a gift') + IS('Gift your officiant a coach', 112) + IP('A printable gift certificate to tuck in a card.') + IP('<b>idobymarisa.com</b>', 48), sticker=True)

ido('04_Shop', '1', 'cream', IK('the shop') + IS('Write it yourself', 130) + R +
    '<ul class="iul"><li>The Vow Builder</li><li>The Toast Builder</li><li>The Story-First Officiant Kit</li><li>Promise Pages + The Vow Vault</li><li>Wedding party + thank-you cards</li></ul>')
ido('04_Shop', '2', 'blush', IK('little freebies') + IS('A few gifts, on me', 120) + IP('Vow Starter · Who Does What? · The Promise Prompt · Ring Bear Coloring Page · Officiant Binder Cover'))
ido('04_Shop', '3', 'dark', IK('shop now') + IS('Link’s right here', 130) + IP('<b>idobymarisa.com/the-shop</b>', 48), sticker=True)

ido('05_Kind-Words', '1', 'dark', IK('kind words') + '<p class="iq">“There is absolutely<br>no one better.”</p>' + IP('— Nick &amp; Hannah', 46))
ido('05_Kind-Words', '2', 'blush', IK('kind words') + '<p class="iq">“She made everyone laugh,<br>and you felt in on the<br>couple’s inside jokes!”</p>' + IP('— Catherine O’Gorman', 46))

# ---------------- STITCHES: HOBBY HIGHLIGHTS ----------------
def cover(fn, word, shape, g, w):
    S.append(('crafts/covers', fn, f'<section class="s st"><div class="in" style="display:flex;flex-direction:column;align-items:center"><div style="position:relative;width:{w}px;height:{int(w*float(SH[shape][0].split()[3])/float(SH[shape][0].split()[2]))}px">{gem(shape, g, w, 0, 0)}</div>'
              f'<div style="font:400 {150 if len(word) > 9 else 170}px/1 \'DM Serif Display\';letter-spacing:-.04em;margin-top:60px">{word}</div></div></section>'))
CRAFTS = [('05_needlepoint', 'needlepoint', 'pear', 'ruby', 250, 'where it all started', 'little canvases, one tiny stitch at a time.', [('heart', 'rose', 120, 130, 300, -10), ('round', 'dia', 110, 830, 1480, 0)]),
          ('06_hand-stitched', 'by hand', 'heart', 'ame', 400, 'hand embroidery', 'no machine. just a hoop,<br>a needle and a playlist.', [('marq', 'cit', 60, 860, 320, 20), ('emerald', 'em', 130, 130, 1460, -8)]),
          ('07_quilting', 'quilting', 'emerald', 'em', 420, 'the newest hobby', 'learning to quilt.<br>the hobbies will not stop.', [('heart', 'sap', 120, 830, 300, 10), ('pear', 'ruby', 80, 150, 1480, -12)]),
          ('08_wips', 'wips', 'marq', 'cit', 170, 'works in progress', 'half-finished, fully loved.<br>come see what’s on the hoop.', [('round', 'ame', 120, 130, 320, 0), ('heart', 'rose', 110, 840, 1470, 8)])]
for fn, word, shape, g, w, kick, line, extra in CRAFTS:
    cover(fn, word, shape, g, w)
    title = {'wips': 'on the hoop', 'by hand': 'by hand'}.get(word, word)
    st('../crafts/stories/' + fn, '1', K(kick) + H(title) + P(line), ''.join(gem(*e) for e in extra))

CSS = """
*{box-sizing:border-box}body{margin:0;background:#777}
.s{width:1080px;height:1920px;position:relative;overflow:hidden;margin-bottom:10px;display:flex;align-items:center;justify-content:center;text-align:center}
.in{position:relative;z-index:2;padding:0 110px;max-width:1080px}
.st{background:#F4EFE7;color:#2B2B2B;font-family:'DM Sans',sans-serif}
.st .k{font:700 30px 'DM Sans';letter-spacing:.34em;text-transform:uppercase;color:#8C857A;margin:0 0 40px}
.st h1{font-family:'DM Serif Display',serif;font-weight:400;line-height:.9;letter-spacing:-.04em;margin:0 0 50px}
.st .p{font:400 48px/1.45 'DM Sans';margin:0 0 30px;color:#4A4640}
.st .ul{list-style:none;padding:0;margin:0;font:400 54px/1.9 'DM Sans'}
.st .ol{list-style:none;padding:0;margin:0;text-align:left;counter-reset:c}
.st .ol li{counter-increment:c;position:relative;padding-left:110px;margin-bottom:56px}
.st .ol li::before{content:counter(c);position:absolute;left:0;top:-6px;width:76px;height:76px;border-radius:50%;background:#fff;border:2px solid #E86A9A;display:grid;place-items:center;font:400 44px 'DM Serif Display';color:#E86A9A}
.st .ol b{display:block;font:400 58px/1.1 'DM Serif Display';letter-spacing:-.02em}
.st .ol span{font:400 40px/1.4 'DM Sans';color:#6E6A63}
.st .price{display:grid;gap:40px;margin-bottom:60px}
.st .price div{background:#fff;border-radius:40px;padding:44px}
.st .price b{display:block;font:400 150px/1 'DM Serif Display';color:#E86A9A}
.st .price span{font:400 42px/1.4 'DM Sans'}
.st .q{font:400 96px/1.08 'DM Serif Display';letter-spacing:-.03em;margin:0 0 50px}
.stk{position:absolute;left:0;right:0;bottom:300px;font:700 26px 'DM Sans';letter-spacing:.2em;text-transform:uppercase;color:#B9B2A6;z-index:2}
.ft{position:absolute;left:0;right:0;bottom:120px;font:700 28px 'DM Sans';letter-spacing:.3em;color:#8C857A}
.ido.dark{background:#2A241F radial-gradient(circle at 50% 40%,#43362C,#2A241F 70%);color:#FBF7F0}
.ido.cream{background:#FBF7F0;color:#2A241F}.ido.blush{background:#F1DCD6;color:#2A241F}
.ido .frame{position:absolute;inset:50px;border:2px solid rgba(176,141,87,.6);pointer-events:none}
.ik{font:600 30px 'Raleway';letter-spacing:.34em;text-transform:uppercase;color:#B08D57;margin:0 0 40px}
.dark .ik{color:#D9C08F}
.script{font-family:'Pinyon Script',cursive;line-height:1.05;margin:0 0 40px}
.ip{font-family:'Cormorant Garamond',serif;line-height:1.45;margin:0 0 30px}
.dark .ip{color:#E9DCC8}
.rule{width:120px;height:3px;background:#B08D57;margin:10px auto 60px}
.iul{list-style:none;padding:0;margin:0 0 30px;font:400 56px/1.75 'Cormorant Garamond'}
.iol{list-style:none;padding:0;margin:0;text-align:left;counter-reset:c}
.iol li{counter-increment:c;position:relative;padding-left:110px;margin-bottom:60px}
.iol li::before{content:counter(c);position:absolute;left:0;top:-4px;width:80px;height:80px;border-radius:50%;border:2px solid #B08D57;display:grid;place-items:center;font:500 46px 'Cormorant Garamond';color:#B08D57}
.iol b{display:block;font:500 62px/1.1 'Cormorant Garamond'}
.iol span{font:italic 400 44px/1.4 'Cormorant Garamond';opacity:.8}
.iq{font:italic 400 92px/1.15 'Cormorant Garamond';margin:0 0 50px}
.stk.ido{color:#B08D57;font-family:'Raleway'}
.ft.ido{font-family:'Raleway';font-weight:600;color:#B08D57}
"""
fonts = '<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;700&family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Raleway:wght@600&display=swap" rel="stylesheet">'
out = ['<!doctype html><html><head><meta charset="utf-8">' + fonts + '<style>' + CSS + '</style></head><body>']
for i, (folder, fn, h) in enumerate(S):
    out.append(h.replace('<section class="s', f'<section id="s{i}" data-f="{folder}" data-n="{fn}" class="s', 1))
out.append('</body></html>')
open(os.path.join(D, 'stories.html'), 'w').write('\n'.join(out))
print(len(S))
