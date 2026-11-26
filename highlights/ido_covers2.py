"""I Do highlight covers v2: hand-drawn calligraphic line icons that match the quill
(pen-nib thick/thin strokes + the quill's trailing underline flourish)."""
SWOOSH = 'M14 84 C10 92 16 97 24 94 C30 92 27 98 33 97 C50 95 72 92 92 89'
ICONS = {
  'about': None,  # the real quill
  'ceremonies': [
    'M47 58 C47 46 38 39 30 39 C20 39 13 47 13 57 C13 67 21 75 31 75 C40 75 47 68 47 59',
    'M53 58 C53 47 61 39 70 39 C80 39 87 47 87 57 C87 67 79 75 69 75 C59 75 51 67 52 57',
    'M64 39 L69 31 L74 39 L69 43 Z', 'M64 31 L74 31'],
  'vows': [
    'M30 18 L60 18 L70 28 L70 78 L30 78 Z', 'M60 18 L60 28 L70 28',
    'M37 38 c3 -5 6 5 9 0 s6 5 9 0 s5 4 8 0', 'M37 50 c3 -5 6 5 9 0 s6 5 9 0 s5 4 8 0', 'M37 62 c3 -5 6 5 9 0 s5 4 8 0'],
  'kind words': [
    'M18 36 L82 36 L82 76 L18 76 Z', 'M18 36 L50 60 L82 36',
    'M50 72 C44 67 38 63 41 57 C43 53 48 54 50 58 C52 54 57 53 59 57 C62 63 56 67 50 72 Z'],
  'rain': [
    'M16 50 C20 24 80 24 84 50 C78 44 72 44 67 50 C62 44 56 44 50 50 C44 44 38 44 33 50 C28 44 22 44 16 50',
    'M50 30 L50 72 C50 80 40 80 40 73', 'M50 30 L50 24',
    'M24 60 c-2 4 -2 7 0 8 c2 -1 2 -4 0 -8', 'M78 58 c-2 4 -2 7 0 8 c2 -1 2 -4 0 -8', 'M66 70 c-2 4 -2 7 0 8 c2 -1 2 -4 0 -8'],
  'faq': [
    'M36 34 C36 18 66 16 66 33 C66 46 50 46 50 60', 'M48 70 c0 -3 4 -3 4 0 c0 3 -4 3 -4 0'],
}
BG = ['#2A241F', '#F1DCD6', '#2A241F', '#F1DCD6', '#2A241F', '#F1DCD6']
FG = ['#F1DCD6', '#2A241F', '#F1DCD6', '#2A241F', '#F1DCD6', '#2A241F']

def nib_svg(paths, col, size=680, uid='p'):
    """Fake a slanted pen nib: draw each path several times along a 45-degree offset."""
    g = ''.join(f'<path d="{d}"/>' for d in paths + [SWOOSH])
    copies = ''.join(f'<use href="#{uid}" transform="translate({k*0.26:.2f},{-k*0.26:.2f})"/>' for k in range(6))
    return (f'<svg viewBox="4 6 94 96" width="{size}" height="{size}"><defs><g id="{uid}" fill="none" stroke="{col}" stroke-width=".38" '
            f'stroke-linecap="round" stroke-linejoin="round">{g}</g></defs><g>{copies}</g></svg>')

html = ['''<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;display:flex;flex-wrap:wrap;gap:20px;width:7000px;background:#888}
.c{position:relative;width:1080px;height:1920px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.ring{position:absolute;left:50%;top:50%;width:820px;height:820px;margin:-410px;border-radius:50%;border:3px solid #B08D57;opacity:.5}</style></head><body>''']
for i, (n, paths) in enumerate(ICONS.items()):
    if paths is None:
        q = 'quill-blush-crop.png' if BG[i] == '#2A241F' else 'quill-espresso.png'
        icon = f'<img src="../stickers/{q}" style="width:500px;margin-left:30px">'
    else:
        icon = nib_svg(paths, FG[i], uid=f'p{i}')
    html.append(f'<div class="c" data-n="IDo2_{n.replace(" ","-")}" style="background:{BG[i]}"><div class="ring"></div><div style="position:relative">{icon}</div></div>')
html.append('</body></html>')
open('/home/user/marisa/highlights/ido_covers2.html', 'w').write(''.join(html))
print('ok')
