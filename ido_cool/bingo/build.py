"""Wedding Toast Bingo printable (I Do by Marisa). 4 different cards, 2 per page, Letter."""
import random, base64
SQ = ["Says “For those who don’t know me…”", "Mentions how they met", "An inside joke nobody else gets", "Someone in the crowd tears up",
 "Reads the whole thing off a phone", "Says “I’ll keep this short”", "Goes longer than 5 minutes", "A story from college",
 "Thanks the parents", "Mentions the dog (or cat)", "An embarrassing childhood story", "Raises a glass too early",
 "Mic feedback", "Quotes a song lyric", "Gets interrupted by applause", "Mentions the proposal",
 "Says “I love you guys”", "Dictionary definition of love", "A shout-out to the bartender", "One of the couple tears up",
 "Says “Without further ado”", "Reads a poem", "A sports reference", "Toasts “To the happy couple!”", "Laughs at their own joke",
 "Holds up a prop", "Speaks to the couple’s future kids", "Mentions the first date", "Thanks everyone for coming", "Someone yells “Cheers!” too soon"]
LOGO = 'data:image/png;base64,' + base64.b64encode(open('logo.png', 'rb').read()).decode()
def card(seed):
    r = random.Random(seed); cells = r.sample(SQ, 24); cells.insert(12, '<b style="font:400 30px/1 Pinyon Script;color:#7E2E2C">Cheers!</b><br><span style="font-size:10px;letter-spacing:.2em">FREE SPACE</span>')
    return ('<div class="card"><div class="t">Wedding</div><div class="tt">TOAST BINGO</div><div class="g">' + ''.join(f'<div class="c{" f" if i==12 else ""}">{c}</div>' for i, c in enumerate(cells)) +
            '</div><div class="how">Mark a square every time it happens during the toasts. Five in a row? Raise your glass and yell “Bingo!” (quietly, if Grandma is mid-speech).</div>'
            f'<img class="lg" src="{LOGO}"></div>')
CSS = '''@page{size:letter;margin:0}body{margin:0;background:#FBF7F0}.pg{width:8.5in;height:11in;display:flex;flex-direction:column;justify-content:space-around;align-items:center;page-break-after:always}
.card{position:relative;width:7.4in;height:5.15in;border:1.5px solid #B08D57;border-radius:12px;padding:.18in .3in;box-sizing:border-box;text-align:center;background:#FBF7F0}
.t{font:400 40px/1 'Pinyon Script';color:#2A241F}.tt{font:600 11px 'Raleway';letter-spacing:.4em;color:#B08D57;margin-top:2px}
.g{display:grid;grid-template-columns:repeat(5,1fr);grid-auto-rows:.66in;gap:0;margin:.1in auto 0;width:6.1in;border-top:1px solid #D9C08F;border-left:1px solid #D9C08F}
.c{border-right:1px solid #D9C08F;border-bottom:1px solid #D9C08F;display:grid;place-items:center;padding:4px;font:500 11.5px/1.2 'Cormorant Garamond';color:#2A241F}
.c.f{background:#EFD9D7}.how{font:italic 500 12px/1.35 'Cormorant Garamond';color:#4a423b;margin:.08in auto 0;width:5.6in}
.lg{position:absolute;right:.16in;bottom:.12in;width:.55in;opacity:.85}'''
html = ('<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Raleway:wght@600&display=swap" rel="stylesheet">'
        f'<style>{CSS}</style></head><body>' + ''.join(f'<div class="pg">{card(s*2+1)}{card(s*2+2)}</div>' for s in range(2)) + '</body></html>')
open('bingo.html', 'w').write(html)
