"""Rock-paper-scissors 'this vs that' carousel (1080x1350). Preview stand-in hands; swap for Marisa's own clip."""
import os
D = os.path.dirname(os.path.abspath(__file__))
P = [("let your friend google<br>“how to officiate”", "get a ceremony written<br>from your real story"),
     ("a 45-minute ceremony", "a 20-minute ceremony<br>everyone remembers"),
     ("“dearly beloved, we are<br>gathered here today…”", "open with how<br>you actually met"),
     ("copy your vows<br>from pinterest", "write about<br>a random tuesday"),
     ("read your vows off<br>your phone at 4%", "print them big<br>in a binder"),
     ("let your bestie<br>wing it the night before", "one coaching<br>session with me"),
     ("pick the officiant who<br>speaks the best", "pick the one who<br>knows your story"),
     ("hope it goes fine", "i marry you, or i write<br>the words for the friend who does")]
CSS = """*{box-sizing:border-box}body{margin:0;background:#777}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;margin-bottom:10px;background:#E9DFD2;font-family:'Raleway'}
.t{position:absolute;font:600 50px/1.22 'Raleway';color:#5a4a40;text-align:center;width:560px}
.t.a{left:30px;top:330px;opacity:.75}.t.b{right:30px;top:870px;color:#2A241F;font-weight:700}
.arm{position:absolute;height:150px;width:240px;background:#7E2E2C;top:560px;border-radius:12px}
.hand{position:absolute;font-size:200px;top:520px;line-height:1}
.n{position:absolute;right:40px;top:40px;background:rgba(42,36,31,.55);color:#fff;font:600 28px 'Raleway';padding:8px 20px;border-radius:999px}
.mark{position:absolute;left:44px;bottom:40px;font:400 46px 'Pinyon Script';color:#2A241F;opacity:.85}
.ph{position:absolute;left:0;right:0;top:470px;text-align:center;font:600 18px 'Raleway';letter-spacing:.3em;color:#a8998b}"""
S = []
for i, (a, b) in enumerate(P, 1):
    S.append(f'<section class="s" id="s{i}"><div class="n">{i}/8</div><p class="t a">{a}</p>'
             f'<div class="arm" style="left:-40px"></div><div class="hand" style="left:170px;transform:scaleX(-1) rotate(-90deg)">✌️</div>'
             f'<div class="arm" style="right:-40px;top:640px"></div><div class="hand" style="right:170px;top:600px;transform:rotate(-90deg)">✊</div>'
             f'<p class="t b">{b}</p><div class="mark">I Do by Marisa</div></section>')
fonts = '<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@600;700&family=Pinyon+Script&display=swap" rel="stylesheet">'
open(os.path.join(D, 'rps.html'), 'w').write('<!doctype html><html><head><meta charset="utf-8">' + fonts + '<style>' + CSS + '</style></head><body>' + ''.join(S) + '</body></html>')
