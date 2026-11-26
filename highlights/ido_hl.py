"""I Do by Marisa highlight story sets (1080x1920), matching the black quill-style covers.
Sets: about, ceremonies, vows, kind-words, rain, faq, shop. Real logo at the bottom (blush on dark, charcoal on light)."""
import ast
src = open('/home/user/marisa/highlights/ido_covers3.py').read()
mod = ast.parse(src)
keep = [n for n in mod.body if (isinstance(n, ast.FunctionDef) and n.name == 'nib_svg') or
        (isinstance(n, ast.Assign) and any(getattr(t, 'id', '') in ('SWOOSH', 'ICONS') for t in n.targets))]
ns = {}
exec(compile(ast.Module(body=keep, type_ignores=[]), 'c', 'exec'), ns)
nib, ICONS = ns['nib_svg'], ns['ICONS']

DARK, BLUSH, CREAM = '#16130F', '#F1DCD6', '#FBF7F0'
INK, GOLD, WINE = '#2A241F', '#B08D57', '#7E2E2C'
_uid = [0]

def frame(set_, n, theme, icon, kicker, title, body='', foot='', link=False):
    bg = {'dark': DARK, 'blush': BLUSH, 'cream': CREAM}[theme]
    fg = BLUSH if theme == 'dark' else INK
    k = GOLD
    logo = '../ido_cool/_brand/logo-blush-crop.png' if theme == 'dark' else '../ido_cool/_brand/logo-charcoal-crop.png'
    _uid[0] += 1
    ic = ''
    if icon:
        if icon == 'quill':
            ic = f'<img src="../stickers/{"quill-blush-crop.png" if theme=="dark" else "quill-espresso.png"}" style="width:170px;margin-left:20px">'
        else:
            ic = nib(ICONS[icon], fg, size=260, uid=f'h{_uid[0]}')
    lk = f'<div class="lk" style="color:{k}">↓ add a link sticker here ↓</div>' if link else ''
    return (f'<section class="s" data-n="{set_}_{n}" style="background:{bg};color:{fg}"><div class="fr" style="border-color:{GOLD}"></div>'
            f'<div class="in"><div class="ic">{ic}</div><p class="k" style="color:{k}">{kicker}</p><h1>{title}</h1>'
            f'<div class="b">{body}</div>{foot}</div>{lk}<img class="lg" src="{logo}"></section>')


def photo(set_, n, img, names, line='', credit='', theme='dark'):
    bg = DARK if theme == 'dark' else CREAM
    fg = BLUSH if theme == 'dark' else INK
    logo = '../ido_cool/_brand/logo-blush-crop.png' if theme == 'dark' else '../ido_cool/_brand/logo-charcoal-crop.png'
    cr = f'<p class="cr" style="color:{GOLD}">{credit}</p>' if credit else ''
    return (f'<section class="s" data-n="{set_}_{n}" style="background:{bg};color:{fg}"><div class="fr" style="border-color:{GOLD}"></div>'
            f'<div class="ph"><img src="couple_photos/{img}"></div>'
            f'<div class="cap"><h2>{names}</h2><p class="ln">{line}</p>{cr}</div><img class="lg" src="{logo}"></section>')

LI = lambda items: '<ul>' + ''.join(f'<li>{i}</li>' for i in items) + '</ul>'
S = []
# about
S += [frame('about', 1, 'dark', 'quill', 'start here', 'Hi, I’m Marisa', '<p>Ordained minister, officiant and ceremony writer in Metro Detroit.</p><p>Storyteller first. Story is the signature.</p>'),
      frame('about', 2, 'cream', None, 'how I can help', 'Your story, out loud', LI(['Officiating your ceremony', 'Ceremony scripts for when a friend officiates', 'Officiant coaching by phone or Google Meet', 'Vow writing help'])),
      frame('about', 3, 'blush', None, 'a little about me', 'Rainy days, iced matcha & a good love story', '<p>Modern, not stuffy. Traditions are history, and you get to make them yours.</p>'),
      frame('about', 4, 'dark', None, 'let’s talk', 'Tell me your story', '<p>I officiate around Metro Detroit. Scripts and coaching happen anywhere in the U.S.</p><p class="u">idobymarisa.com</p>', link=True)]
# ceremonies
S += [frame('ceremonies', 1, 'dark', 'ceremonies', 'ceremonies', 'Written from your story', '<p>Never a template. Every word is yours.</p>'),
      frame('ceremonies', 2, 'cream', None, 'how it works', 'From your story to “I do”', '<ol><li><b>You tell me your story</b><span>a questionnaire for each of you, or voice notes</span></li><li><b>I write your ceremony</b><span>from scratch, timed and paced</span></li><li><b>You review it</b><span>or keep it a surprise. Your call.</span></li><li><b>I stand up there and tell it</b><span>or your friend does</span></li></ol>'),
      frame('ceremonies', 3, 'blush', None, 'friend officiating?', 'Your friend officiates. I write the words.', LI(['A script that sounds like you two', '[Pause] and [Beat] cues', 'Who moves when, and where to stand', 'A print-ready PDF for the binder'])),
      frame('ceremonies', 4, 'dark', None, 'for the friend who said yes', 'Ready, not just willing', '<p>One-on-one officiant coaching: pacing, nerves, the mic and the big moments.</p><p>By phone or Google Meet, wherever the wedding is.</p>', link=True)]
# vows
S += [frame('vows', 1, 'dark', 'vows', 'vows', 'Your words, just a little braver', '<p>Vow help for when you know what you feel but not how to say it.</p>'),
      frame('vows', 2, 'cream', None, 'vow tip', 'Write about a Tuesday', '<p>Skip the big feelings. Write about a normal Tuesday: how they make your coffee, the song they hum doing the dishes.</p>'),
      frame('vows', 3, 'blush', None, 'vow tip', 'Read it out loud. Twice.', '<p>If you trip over a line, so will your nerves. Shorter sentences, more breaths.</p>'),
      frame('vows', 4, 'dark', None, 'stuck?', 'Let’s find your words', '<p>Send me a DM, or ask in the question box below.</p>')]
# kind words (from idobymarisa.com)
S += [frame('kind-words', 1, 'dark', 'kind words', 'kind words', 'Straight from my couples', '<p>Tap through ♡</p>'),
      frame('kind-words', 2, 'blush', None, 'kind words', '“She gave our love a language.”', '<p class="att">— Gabrielle &amp; Darian</p>'),
      frame('kind-words', 3, 'cream', None, 'kind words', '“Every word felt like it was written just for us.”', '<p class="att">— Heather &amp; Brandon</p>'),
      frame('kind-words', 4, 'dark', None, 'kind words', '“There is absolutely no one better.”', '<p class="att">— Nick &amp; Hannah</p>'),
      frame('kind-words', 5, 'blush', None, 'kind words', '“My grandmother said she did better than any bishop she’s ever seen.”', '<p class="att">— Nick</p>'),
      frame('kind-words', 6, 'cream', None, 'kind words', '“She made everyone laugh, and you felt in on the couple’s inside jokes!”', '<p class="att">— Catherine</p>'),
      frame('kind-words', 7, 'dark', None, 'married by me?', 'Leave a little review', '<p>It means the world, and it helps the next couple find me.</p><p class="u">link below ↓</p>', link=True)]
# couples (approved to share)
S += [frame('couples', 1, 'dark', 'couples', 'my couples', 'Love stories I got to tell', '<p>Tap through ♡</p>'),
      photo('couples', 2, 'dip-kiss.jpg', 'Kenz &amp; Pez', 'a fall evening, and the dip of the year', '📸 @gabriellecynthiaphoto'),
      photo('couples', 3, 'ceremony-wide.jpg', 'Kenz &amp; Pez', 'Petite Acres', '📸 @gabriellecynthiaphoto', theme='cream'),
      photo('couples', 4, 'IMG_2174_first-dance.jpg', 'Gerard &amp; Alyssa', 'first dance, Castle Hall'),
      photo('couples', 5, 'IMG_5195_connors-kiss.jpg', 'The Connors', 'their ceremony had a ring warming ♡', theme='cream'),
      photo('couples', 6, 'AmberRyan_05.jpg', 'Amber &amp; Ryan', 'Detroit Yacht Club'),
      photo('couples', 7, 'AmberRyan_02.jpg', 'Amber &amp; Ryan', 'the aisle, before the guests', theme='cream'),
      photo('couples', 8, 'AvanceAlex_02.jpg', 'Avance &amp; Alex', 'Cushing Field House'),
      photo('couples', 9, 'KristenJohn_dock.jpg', 'Kristen &amp; John', 'a lakeside elopement', theme='cream'),
      photo('couples', 10, 'KristenJohn_cabana.jpg', 'Kristen &amp; John', 'small, sweet and all heart'),
      frame('couples', 11, 'blush', None, 'your turn', 'Let’s tell your story', '<p class="u">idobymarisa.com</p>', link=True)]
# rain
S += [frame('rain', 1, 'dark', 'rain', 'rain on your wedding day?', 'Good.', '<p>They say a wet knot is harder to untie. So, good luck.</p>'),
      frame('rain', 2, 'blush', None, 'a little about me', 'I love the rain', '<p>Some people think it’s gloomy. I think it’s beautiful and calming. Umbrella photos? Iconic.</p>'),
      frame('rain', 3, 'cream', None, 'rain plan', 'Rain-proof your ceremony', LI(['Clear umbrellas for the wedding party', 'A covered backup spot, decided early', 'A towel tucked in the officiant bag']))]
# faq
S += [frame('faq', 1, 'dark', 'faq', 'faq', 'Good questions', '<p>Tap through for the ones I get the most.</p>'),
      frame('faq', 2, 'cream', None, 'are you ordained?', 'Yes!', '<p>I’m an ordained minister, and I officiate around Metro Detroit.</p>'),
      frame('faq', 3, 'blush', None, 'how far ahead?', 'Book early', '<p>For a script, reach out at least 3 weeks before the wedding. For me to officiate, the sooner the better.</p>'),
      frame('faq', 4, 'cream', None, 'outside Michigan?', 'Scripts + coaching go anywhere', '<p>Scripts and officiant coaching happen anywhere in the U.S. I officiate in person around Metro Detroit.</p>'),
      frame('faq', 5, 'dark', None, 'do we have to be traditional?', 'Nope', '<p>Traditions are history. We keep the ones you love and make them yours.</p>', link=True)]
# shop
S += [frame('shop', 1, 'dark', 'shop', 'the shop', 'Write it yourself', LI(['The Vow Builder', 'The Toast Builder', 'The Story-First Officiant Kit', 'Promise Pages + The Vow Vault', 'Wedding party + thank-you cards'])),
      frame('shop', 2, 'blush', None, 'little freebies', 'A few gifts, on me', '<p>Vow Starter · Who Does What? · The Promise Prompt · Officiant Binder Cover</p>'),
      frame('shop', 3, 'dark', None, 'shop now', 'Link’s right here', '<p class="u">idobymarisa.com/the-shop</p>', link=True)]

html = ['''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Raleway:wght@500;600&display=swap" rel="stylesheet">
<style>body{margin:0;display:flex;flex-wrap:wrap;gap:20px;width:8000px;background:#888}
.s{position:relative;width:1080px;height:1920px;overflow:hidden}
.fr{position:absolute;inset:56px;border:2px solid;opacity:.55;border-radius:6px}
.in{position:absolute;left:130px;right:130px;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.ic{margin-bottom:30px;min-height:10px}
.k{margin:0 0 26px;font:600 26px Raleway;letter-spacing:.36em;text-transform:uppercase}
h1{margin:0;font:400 104px/1.08 'Pinyon Script';font-weight:400}
.b{margin-top:44px;font:500 44px/1.38 'Cormorant Garamond'}
.b p{margin:0 0 22px}.b .u{font:600 30px Raleway;letter-spacing:.12em}.b .att{font:italic 500 40px 'Cormorant Garamond';opacity:.85}
ul,ol{list-style:none;margin:0;padding:0}li{margin:0 0 18px}
ol{counter-reset:c;text-align:left}ol li{counter-increment:c;position:relative;padding-left:90px;margin-bottom:34px}
ol li::before{content:counter(c);position:absolute;left:0;top:2px;width:58px;height:58px;border:1.5px solid #B08D57;border-radius:50%;font:500 32px/58px 'Cormorant Garamond';text-align:center;color:#B08D57}
ol b{display:block;font:500 46px 'Cormorant Garamond'}ol span{display:block;font:italic 500 34px 'Cormorant Garamond';opacity:.75}
.lk{position:absolute;bottom:330px;left:0;right:0;text-align:center;font:600 22px Raleway;letter-spacing:.3em;text-transform:uppercase;opacity:.85}
.ph{position:absolute;left:110px;right:110px;top:150px;height:1180px;display:flex;align-items:center;justify-content:center}
.ph img{max-width:100%;max-height:100%;object-fit:contain;box-shadow:0 0 0 10px rgba(255,255,255,.9),0 16px 30px rgba(0,0,0,.35)}
.cap{position:absolute;left:100px;right:100px;top:1380px;text-align:center}
.cap h2{margin:0;font:400 96px/1 'Pinyon Script'}.cap .ln{margin:14px 0 0;font:italic 500 40px 'Cormorant Garamond'}
.cap .cr{margin:16px 0 0;font:600 24px Raleway;letter-spacing:.12em}
.lg{position:absolute;bottom:110px;left:50%;transform:translateX(-50%);width:150px}
</style></head><body>'''] + S + ['</body></html>']
open('/home/user/marisa/highlights/ido_hl.html', 'w').write(''.join(html))
print(len(S), 'frames')
