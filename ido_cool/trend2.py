"""I Do trendy formats round 2 (1080x1350): dating-profile prompts, green/red flags, ceremony bingo, unpopular opinions."""
import os
D = os.path.dirname(os.path.abspath(__file__))
CSS = """
:root{--cream:#FBF7F0;--ink:#2A241F;--gold:#B08D57;--gold2:#D9C08F;--blush:#F1DCD6;--wine:#7E2E2C}
*{box-sizing:border-box}body{margin:0;background:#777}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;margin-bottom:10px;font-family:'Cormorant Garamond',serif;color:var(--ink)}
.cap{font:600 22px 'Raleway';letter-spacing:.32em;text-transform:uppercase}
.logo{position:absolute;right:56px;bottom:40px;font:400 44px 'Pinyon Script';opacity:.85}
/* profile */
.pf{background:var(--blush);padding:56px 70px}
.pf .logo{bottom:14px}
.pf .name{font:600 64px 'Raleway';letter-spacing:-.01em;margin:0}
.pf .ph{height:380px;border-radius:30px;margin:26px 0 22px;background:repeating-linear-gradient(120deg,#d9c3bb 0 30px,#e4cfc8 30px 60px);display:flex;align-items:center;justify-content:center;font:600 24px 'Raleway';letter-spacing:.2em;color:#8a6f66}
.chips{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:22px}
.chips span{background:#fff;border-radius:999px;padding:12px 22px;font:500 24px 'Raleway'}
.card{background:#fff;border-radius:30px;padding:28px 36px;margin-bottom:18px;position:relative}
.card b{display:block;font:600 22px 'Raleway';margin-bottom:8px}
.card p{margin:0;font:400 44px/1.12 'Cormorant Garamond'}
.card i{position:absolute;right:26px;bottom:20px;width:56px;height:56px;border-radius:50%;border:2px solid var(--wine);color:var(--wine);display:grid;place-items:center;font:normal 30px 'Raleway'}
/* flags */
.fl{background:var(--cream);padding:80px 70px}
.fl h1{margin:0 0 40px;font:italic 400 112px/.9 'Cormorant Garamond';letter-spacing:-.03em}
.fl .two{display:grid;grid-template-columns:1fr 1fr;gap:34px}
.fl h2{margin:0 0 16px;font:600 24px 'Raleway';letter-spacing:.24em}
.fl p{margin:0 0 22px;padding:26px 28px;border-radius:22px;font:400 41px/1.12 'Cormorant Garamond'}
.g p{background:#E6EADF}.g h2{color:#4F6B43}
.r p{background:#F3DDD9}.r h2{color:var(--wine)}
/* bingo */
.bg{background:var(--wine);color:var(--cream);padding:70px 60px}
.bg h1{margin:0;text-align:center;font:italic 400 110px/.9 'Cormorant Garamond'}
.bg .sub{text-align:center;color:var(--gold2);margin:16px 0 34px}
.board{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.board div{background:var(--cream);color:var(--ink);height:178px;border-radius:14px;display:flex;align-items:center;justify-content:center;text-align:center;padding:10px;font:500 28px/1.06 'Cormorant Garamond'}
.board div.fr{background:var(--gold2);font:400 52px 'Pinyon Script'}
.bg .logo{color:var(--gold2)}
/* opinions */
.op{background:var(--ink);color:var(--cream);padding:90px 80px}
.op h1{margin:0 0 50px;font:italic 400 108px/.92 'Cormorant Garamond';color:var(--cream)}
.op h1 span{color:var(--gold2)}
.op p{margin:0 0 46px;font:400 52px/1.15 'Cormorant Garamond';padding-left:66px;position:relative}
.op p::before{content:'🔥';position:absolute;left:0;top:2px;font-size:36px}
.op .logo{color:var(--gold2)}
"""
S = []
S.append('<section class="s pf" id="profile"><p class="name">Marisa, your officiant</p>'
 '<div class="ph" style="background:url(photos/me/officiant_01.jpg) center 22%/cover"></div>'
 '<div class="chips"><span>📍 Metro Detroit</span><span>💍 Ordained minister</span><span>🎤 Officiant</span><span>✍️ Ceremony writer</span></div>'
 '<div class="card"><b>My simple pleasures</b><p>a 20-minute ceremony, a script in 14-point font, the pause right after the kiss</p><i>♡</i></div>'
 '<div class="card"><b>I’ll fall for you if</b><p>you tell me about a random Tuesday</p><i>♡</i></div>'
 '<div class="card"><b>Together, we could</b><p>write your ceremony. then i marry you, or coach the friend who does.</p><i>♡</i></div><div class="logo">I Do by Marisa</div></section>')
G = ['asks how you met before anything else', 'times the ceremony to the minute', 'practices out loud (twice)', 'brings a printed script', 'knows how to pronounce every name']
R = ['your names swapped into a template', 'reads off their phone', 'makes it about themselves', '“dearly beloved” three times', 'wings it']
S.append('<section class="s fl" id="flags"><div class="cap" style="color:var(--gold);margin:0 0 16px">officiant edition</div><h1>green flags,<br>red flags</h1><div class="two">'
 '<div class="g"><h2>GREEN FLAGS</h2>' + ''.join(f'<p>{x}</p>' for x in G) + '</div>'
 '<div class="r"><h2>RED FLAGS</h2>' + ''.join(f'<p>{x}</p>' for x in R) + '</div></div><div class="logo">I Do by Marisa</div></section>')
B = ['someone cries before the processional', 'the ring bearer goes rogue', 'dad cries first', 'a phone goes off', 'wind vs. the veil',
     'flower girl stops mid-aisle', 'groom’s voice cracks', 'someone says “dearly beloved”', 'a guest whispers “aww” too loud', 'the officiant gets a laugh',
     'a dog in the wedding', 'mom’s tissue is already out', None, 'someone forgot the rings were in their pocket', 'perfect golden hour light',
     'the kiss gets a standing ovation', 'a toddler narrates', 'vows that mention a tuesday', 'the couple whispers a secret joke', 'grandma steals the show',
     'happy tears from the officiant', 'someone trips (gracefully)', 'the “i do” cracks the room up', 'the recessional dance', 'everyone cries. everyone.']
S.append('<section class="s bg" id="bingo"><h1>ceremony bingo</h1><div class="cap sub">screenshot it · bring it to your next wedding</div><div class="board">'
 + ''.join('<div class="fr">I do</div>' if b is None else f'<div>{b}</div>' for b in B) + '</div><div class="logo" style="bottom:28px">I Do by Marisa</div></section>')
O = ['your ceremony should be shorter than your cocktail hour', 'vows are allowed to be funny', 'you don’t need a unity anything', 'the processional song matters more than the centerpieces', 'your officiant should know your story, not just your names']
S.append('<section class="s op" id="opinions"><div class="cap" style="color:var(--gold2);margin:0 0 18px">officiant edition</div><h1>unpopular<br><span>opinions</span></h1>'
 + ''.join(f'<p>{x}</p>' for x in O) + '<div class="logo">I Do by Marisa</div></section>')
fonts = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Pinyon+Script&family=Raleway:wght@500;600&display=swap" rel="stylesheet">'
open(os.path.join(D, 'trend2.html'), 'w').write('<!doctype html><html><head><meta charset="utf-8">' + fonts + '<style>' + CSS + '</style></head><body>' + ''.join(S) + '</body></html>')
