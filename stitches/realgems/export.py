"""Export the real-gem set as transparent PNGs (same filenames the brand already uses)."""
from realgem import brilliant, emerald_cut
SET = {
    'gem-ruby':      lambda s: brilliant('round', 'ruby', s, seed=31),
    'gem-sapphire':  lambda s: brilliant('oval', 'sapphire', s, seed=7),
    'gem-emerald':   lambda s: emerald_cut('emerald', s, seed=5),
    'gem-amethyst':  lambda s: brilliant('marquise', 'amethyst', s, seed=17),
    'gem-citrine':   lambda s: brilliant('round', 'citrine', s, seed=19),
    'gem-crystal':   lambda s: brilliant('round', 'diamond', s, seed=11),
    'gem-pink-heart': lambda s: brilliant('heart', 'pink', s, seed=3),
    'gem-ruby-pear': lambda s: brilliant('pear', 'ruby', s, seed=13),
    'gem-aqua':      lambda s: emerald_cut('aqua', s, seed=23),
    'gem-pink-oval': lambda s: brilliant('oval', 'pink', s, seed=29),
}
html = ['<!doctype html><html><body style="margin:0;background:transparent;display:flex;flex-wrap:wrap;gap:40px;padding:40px;width:4000px">']
for n, fn in SET.items():
    html.append(f'<div class="g" data-n="{n}" style="width:300px;height:300px;padding:20px;display:flex;align-items:center;justify-content:center">{fn(260)}</div>')
html.append('</body></html>')
open('/home/user/marisa/stitches/realgems/export.html', 'w').write(''.join(html))
print('ok')
