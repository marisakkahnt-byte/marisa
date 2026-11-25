"""Stitches reopening kit: teaser + launch carousel (1080x1350) and countdown stories (1080x1920). Dateless on purpose."""
import os
D = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(D, '..', 'pinned', 'build.py')).read().split('# Stitches pin 1')[0]
ns = {'__file__': os.path.join(D, '..', 'pinned', 'build.py')}; exec(src, ns)
st, K, H, P, gem, S = ns['st'], ns['K'], ns['H'], ns['P'], ns['gem'], ns['S']

st('reopen1_teaser', '1', K('psst') + H('something’s<br>coming', 150) + P('the hoop is warming up 💎<br>turn on post notifications'),
   gem('heart', 'rose', 150, 110, 140, -10) + gem('round', 'dia', 120, 850, 180) + gem('emerald', 'em', 130, 120, 1090, 8) + gem('heart', 'sap', 110, 860, 1110, 12) + gem('pear', 'ruby', 70, 520, 110))
L = 'reopen2_orders-open'
st(L, '1', K('it’s official') + H('orders<br>are open', 160) + P('custom machine embroidery,<br>stitched in clinton twp, mi →'),
   gem('heart', 'rose', 150, 110, 140, -10) + gem('round', 'dia', 120, 850, 180) + gem('emerald', 'em', 130, 120, 1090, 8) + gem('heart', 'sap', 110, 860, 1110, 12) + gem('round', 'cit', 80, 520, 100))
st(L, '2', K('how it works') + '<ol class="ol"><li><b>fill out the order form</b><span>wording, fonts, inspo, your date</span></li><li><b>quote within 48 hours</b><span>plus any questions</span></li><li><b>get me your item</b><span>drop it off or ship it</span></li><li><b>approve your proof</b><span>before anything is stitched</span></li><li><b>stitched &amp; sent</b><span>1–2 weeks once I have your item</span></li></ol>',
   gem('heart', 'sap', 90, 880, 120, 10))
st(L, '3', K('pricing') + '<div class="price"><div><b>$15</b><span>names, text &amp; monograms · per placement</span></div><div><b>$20</b><span>designs &amp; detailed fills · per placement</span></div></div>' + P('$7 shipping · free porch pickup<br>in clinton twp · rush +$5 / +$10'),
   gem('round', 'ame', 100, 880, 1180))
st(L, '4', K('no item? no problem') + H('$5 blanks', 150) + P('canvas pouches, bibs and bath towels,<br>ready to personalize.') + P('everything else: you bring the item,<br>i bring the thread.'),
   gem('emerald', 'em', 120, 860, 150, 8) + gem('heart', 'rose', 110, 120, 1120, -10))
st(L, '5', K('ready?') + H('your name,<br>stitched', 140) + P('order form at <b>marisastitches.com</b><br>link in bio') + P('cash app · venmo · cash · check'),
   gem('heart', 'rose', 130, 120, 160, -8) + gem('round', 'dia', 110, 850, 1110) + gem('pear', 'ruby', 70, 880, 200, 12))
POSTS = list(S); S.clear()
for n, (big, small) in enumerate([('3', 'days'), ('2', 'days'), ('1', 'day')], 1):
    st('reopen3_countdown', str(n), K('orders reopen in') + H(big, 520) + P(small + ' 💎'),
       gem('heart', 'rose', 160, 110, 260, -10) + gem('round', 'dia', 130, 840, 300) + gem('emerald', 'em', 140, 120, 1560, 8) + gem('heart', 'sap', 120, 850, 1580, 12))
st('reopen3_countdown', '4', K('today’s the day') + H('orders<br>are open', 180) + P('tap the link ↓'),
   gem('heart', 'rose', 160, 110, 260, -10) + gem('round', 'dia', 130, 840, 300) + gem('emerald', 'em', 140, 120, 1560, 8) + gem('heart', 'sap', 120, 850, 1580, 12) + gem('round', 'cit', 90, 500, 200))
STORIES = list(S)
css0 = open(os.path.join(D, '..', 'highlights', 'stories.html')).read().split('<style>')[1].split('</style>')[0]
fonts = '<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">'
def write(name, items, css):
    out = ['<!doctype html><html><head><meta charset="utf-8">' + fonts + '<style>' + css + '</style></head><body>']
    for i, (s_, n, h) in enumerate(items):
        out.append(h.replace('<section class="s', f'<section id="p{i}" data-f="{s_}" data-n="{n}" class="s', 1))
    open(os.path.join(D, name), 'w').write('\n'.join(out + ['</body></html>']))
write('posts.html', POSTS, css0.replace('height:1920px', 'height:1350px') + '.st .ol li{margin-bottom:40px}.st .ol b{font-size:52px}.ft{bottom:70px}')
write('stories.html', STORIES, css0)
print(len(POSTS), len(STORIES))
