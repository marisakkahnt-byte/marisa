"""I Do repeatable series (1080x1350), on-brand: The Altar Edit (news + the lesson), Write About a Tuesday (weekly vow prompt), Monday Mantra (single)."""
import os
D = os.path.dirname(os.path.abspath(__file__))
GRAIN = '<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .5 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>'
CSS = """*{box-sizing:border-box}body{margin:0;background:#777}p{margin:0}
:root{--cream:#FBF7F0;--ink:#2A241F;--gold:#B08D57;--gold2:#D9C08F;--blush:#F1DCD6;--wine:#7E2E2C}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;margin-bottom:10px;font-family:'Cormorant Garamond'}
.grain{position:absolute;inset:0;mix-blend-mode:overlay;opacity:.45;pointer-events:none}
.cap{font:600 22px 'Raleway';letter-spacing:.32em;text-transform:uppercase}
.mark{position:absolute;right:54px;bottom:44px;font:400 46px 'Pinyon Script'}
.n{position:absolute;right:40px;top:40px;background:rgba(0,0,0,.28);color:#fff;font:600 22px 'Raleway';padding:8px 18px;border-radius:999px}
/* altar edit */
.ae{background:var(--ink);color:var(--cream)}
.ae .pill{position:absolute;left:50%;top:70px;transform:translateX(-50%);border:1.5px solid var(--gold2);border-radius:50%;padding:14px 60px;color:var(--gold2);white-space:nowrap}
.ae .the{position:absolute;left:0;right:0;top:250px;text-align:center;font:italic 400 90px 'Cormorant Garamond';color:var(--gold2)}
.ae .big{position:absolute;left:0;right:0;top:330px;text-align:center;font:400 250px/1 'Pinyon Script'}
.ae .sub{position:absolute;left:120px;right:120px;top:720px;text-align:center;font:italic 400 54px/1.2 'Cormorant Garamond'}
.ae .iss{position:absolute;left:0;right:0;top:960px;text-align:center;color:var(--gold2)}
.ae .rule{position:absolute;left:50%;top:930px;width:140px;height:1px;background:var(--gold2);transform:translateX(-50%)}
.it{background:var(--cream);color:var(--ink);padding:90px 80px}
.it .tag{color:var(--gold);margin-bottom:20px}
.it .num{font:italic 400 120px/1 'Cormorant Garamond';color:var(--wine)}
.it .hl{font:500 84px/1.02 'Cormorant Garamond';letter-spacing:-.02em;margin:10px 0 40px}
.it .card{background:var(--blush);border-radius:28px;padding:34px 40px;font:400 34px/1.45 'Raleway';margin-bottom:44px}
.it .les{font:400 44px/1.3 'Cormorant Garamond'}
.it .les b{font:600 22px 'Raleway';letter-spacing:.28em;text-transform:uppercase;color:var(--wine);display:block;margin-bottom:12px}
.it .src{position:absolute;left:80px;bottom:56px;font:500 20px 'Raleway';color:#8a7a6e;letter-spacing:.06em}
/* tuesday */
.tu{background:var(--blush);color:var(--ink)}
.tu .top{position:absolute;left:0;right:0;top:110px;text-align:center}
.tu .t1{font:400 120px/1 'Pinyon Script';color:var(--wine)}
.tu .no{margin-top:22px;color:var(--gold)}
.tu .card{position:absolute;left:80px;right:80px;top:470px;height:520px;background:var(--cream);border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px}
.tu .card small{color:var(--gold);margin-bottom:26px}
.tu .card p{font:italic 400 76px/1.08 'Cormorant Garamond'}
.tu .how{position:absolute;left:0;right:0;top:1060px;text-align:center;font:400 34px 'Raleway';color:#6d5d55}
.tu .mark{color:var(--wine)}
"""
S = []
S.append(f'<section class="s ae" id="ae1">{GRAIN}<div class="pill cap">I Do by Marisa</div><p class="the">the</p><p class="big">Altar Edit</p>'
         '<p class="sub">what’s happening in weddings,<br>and what it means for your ceremony</p><div class="rule"></div><p class="cap iss">issue no. 01 · from the front of the room</p><div class="mark" style="color:#D9C08F">I Do by Marisa</div></section>')
ITEMS = [('the money', '01', '$36K is the<br>new normal', 'Zola’s 2026 First Look Report (11,500+ couples) puts the average wedding at $36,000 with 145 guests, holding steady for a second year.',
          'If you’re trimming, trim the extras. The ceremony is the part that actually makes it a wedding, and the part everyone replays.', 'Source: Zola, 2026 First Look Report'),
         ('the timeline', '02', 'Weddings are<br>turning into weekends', 'The Knot reports 71% of wedding celebrations now span two to three days, with multiple events.',
          'More events means more speeches. Keep your ceremony the one quiet, focused 20 minutes where everyone is in the same room, paying attention.', 'Source: The Knot, Real Weddings Study')]
for i, (tag, n, hl, card, les, src) in enumerate(ITEMS, 2):
    S.append(f'<section class="s it" id="ae{i}"><div class="n">{i}/4</div><p class="cap tag">{tag}</p><p class="num">{n}</p><p class="hl">{hl}</p><div class="card">{card}</div>'
             f'<p class="les"><b>The lesson</b>{les}</p><p class="src">{src}</p><div class="mark" style="color:#7E2E2C">I Do by Marisa</div></section>')
S.append(f'<section class="s ae" id="ae4">{GRAIN}<div class="pill cap">I Do by Marisa</div><p class="the" style="top:330px">your turn</p>'
         '<p class="sub" style="top:470px;font-size:70px">which one is<br>you right now?<br>tell me below ↓</p><div class="rule" style="top:880px"></div><p class="cap iss" style="top:910px">new issue every other sunday</p><div class="mark" style="color:#D9C08F">I Do by Marisa</div></section>')
P = ['the way they make<br>your coffee<br>(or tea, or bad decisions)', 'a time they showed up<br>without being asked', 'the song they hum when<br>they think no one’s listening', 'the most boring day<br>you’d happily repeat<br>with them']
for i, p in enumerate(P, 1):
    S.append(f'<section class="s tu" id="tue{i}"><div class="top"><p class="t1">Write about a Tuesday</p><p class="cap no">vow prompt no. {i:02d}</p></div>'
             f'<div class="card"><small class="cap">this week, write about</small><p>{p}</p></div><p class="how">screenshot it · write 3 sentences · save them for your vows</p><div class="mark">I Do by Marisa</div></section>')
fonts = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Pinyon+Script&family=Raleway:wght@400;500;600&display=swap" rel="stylesheet">'
open(os.path.join(D, 'series.html'), 'w').write('<!doctype html><html><head><meta charset="utf-8">' + fonts + '<style>' + CSS + '</style></head><body>' + ''.join(S) + '</body></html>')
