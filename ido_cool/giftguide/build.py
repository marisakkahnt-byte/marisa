"""I Do by Marisa holiday gift guide: IG carousel 1080x1350 (proper capitalization)."""
import base64
def b64(p, t='jpeg'): return f'data:image/{t};base64,' + base64.b64encode(open(p, 'rb').read()).decode()
SH = '/home/user/marisa/idobymarisa-site/images/shop/'
LOGO_D = b64('/home/user/marisa/ido_cool/_brand/logo-charcoal-crop.png', 'png'); LOGO_L = b64('/home/user/marisa/ido_cool/_brand/logo-blush-crop.png', 'png')
CSS = '''body{margin:0;background:#999;display:flex;flex-wrap:wrap;gap:20px;padding:20px}.s{position:relative;width:1080px;height:1350px;overflow:hidden;background:#FBF7F0;color:#2A241F;font-family:'Cormorant Garamond'}
.k{font:600 22px 'Raleway';letter-spacing:.38em;color:#B08D57;text-transform:uppercase}.sc{font:400 120px/1 'Pinyon Script'}.h{font:500 64px/1.08 'Cormorant Garamond'}.p{font:500 34px/1.4 'Cormorant Garamond';color:#4a423b}
.lg{position:absolute;right:56px;bottom:50px;width:120px}.num{position:absolute;left:70px;top:64px}.frame{position:absolute;inset:34px;border:1.5px solid #D9C08F;border-radius:18px;pointer-events:none}
.prod{display:flex;gap:34px;margin-top:44px}.prod div{flex:1;background:#fff;border-radius:16px;padding:16px;box-shadow:0 16px 30px rgba(42,36,31,.1)}.prod img{width:100%;border-radius:10px;display:block}
.prod b{display:block;font:600 34px 'Cormorant Garamond';margin-top:14px;color:#2A241F}.prod span{display:block;font:600 18px 'Raleway';letter-spacing:.2em;color:#B08D57;margin-top:4px;text-transform:uppercase}'''
def slide(n, who, head, body, items, dark=False):
    bg = 'background:#2A241F;color:#FBF7F0' if dark else ''
    prods = ''.join(f'<div><img src="{b64(SH+f)}"><b>{t}</b><span>{p}</span></div>' for f, t, p in items)
    return (f'<div class="s" style="{bg}"><div class="frame"></div><div style="position:absolute;left:90px;right:90px;top:50%;transform:translateY(-52%)">'
            f'<div class="k">{n} · {who}</div><div class="h" style="margin-top:22px">{head}</div><div class="p" style="margin-top:18px;{"color:#E8D3C8" if dark else ""}">{body}</div>'
            f'<div class="prod">{prods}</div></div><img class="lg" src="{LOGO_L if dark else LOGO_D}"></div>')
S = []
S.append(f'''<div class="s" style="background:#2A241F;color:#FBF7F0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center"><div class="frame"></div>
<div class="k">I Do by Marisa</div><div class="sc" style="font-size:150px;margin-top:30px;color:#EFD9D7">The Gift Guide</div>
<div class="h" style="font-size:52px;margin-top:30px;max-width:820px">For everyone with a part to play, from the friend who said yes to officiating to the one giving the toast.</div>
<div class="p" style="color:#D9C08F;margin-top:40px">Swipe for ideas →</div><img class="lg" src="{LOGO_L}"></div>''')
S.append(slide('01', 'For the friend officiating', 'They said yes. Now help them sound like they’ve done this a hundred times.',
               'Give them a script written from the couple’s real story, plus a coaching session by phone or Google Meet. Or the kit, if they want to write it themselves.',
               [('kit.jpg', 'The Story-First Officiant Kit', 'In the shop'), ('bundle.jpg', 'The Ceremony Bundle', 'In the shop')]))
S.append(slide('02', 'For the newly engaged', 'For the couple who just said yes and already has a lot to say.',
               'A guided vow workbook and an online Vow Builder that turns their story into a first draft. Writing vows, minus the blank page.',
               [('promise.jpg', 'Promise Pages', 'In the shop'), ('vowtool.jpg', 'The Vow Builder', 'In the shop')]))
S.append(slide('03', 'For the one giving the toast', 'The maid of honor. The best man. The sibling who got volunteered.',
               'The Toast Builder walks them through it and keeps them under four minutes. Pair it with free Toast Bingo for the guests.',
               [('toasttool.jpg', 'The Toast Builder', 'In the shop'), ('vault.jpg', 'The Vow Vault', 'In the shop')]))
S.append(slide('04', 'For the wedding party', 'The ask, and the thank-you, done beautifully.',
               'Inclusive proposal cards for every role, then thank-you cards for everyone who showed up. Printable, with fun envelope liners.',
               [('party.jpg', 'The Wedding Party Collection', 'In the shop'), ('thankyou.jpg', 'The Thank-You Collection', 'In the shop')], dark=True))
S.append(f'''<div class="s" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center"><div class="frame"></div>
<div class="k">Find them all</div><div class="sc" style="margin-top:24px">The Shop</div><div class="h" style="font-size:56px;margin-top:24px">idobymarisa.com/the-shop</div>
<div class="p" style="margin-top:26px;max-width:760px">And a few free gifts on me, like Toast Bingo, the Vow Starter and the officiant binder cover.</div>
<div class="p" style="margin-top:40px;color:#B08D57">Want the words written for you? Send me your story. Link in bio.</div><img class="lg" src="{LOGO_D}"></div>''')
open('guide.html', 'w').write('<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Raleway:wght@600&display=swap" rel="stylesheet"><style>' + CSS + '</style></head><body>' + ''.join(S) + '</body></html>')
