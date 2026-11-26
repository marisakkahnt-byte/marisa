// Instagram highlight covers (1080x1920, design centered for the circle crop)
// Stitches: oat + one sparkling gem + lowercase serif word. I Do: cream/blush/espresso + Pinyon script + gold ring.
const { chromium } = require('playwright');
const path = require('path'); const fs = require('fs');
const OUT = __dirname;
const GRAD = {
  rose: ['#FFD3E4', '#E86A9A', '#9E2E5F'], sap: ['#BFD8FF', '#2F6FD6', '#173C86'], em: ['#B6F0CC', '#1FA35B', '#0B5A31'],
  dia: ['#FFFFFF', '#DCE2EA', '#9AA4B2'], ame: ['#E5D9FF', '#8E6CD8', '#4A3187'], ruby: ['#FFB3BF', '#C8203E', '#6E0E21']
};
const SH = {
  heart: ['0 0 100 92', 'M50 90 6 42C-6 26 4 4 26 4c11 0 19 6 24 15C55 10 63 4 74 4c22 0 32 22 20 38z', '<path d="M50 90 30 30 50 19 70 30zM6 42l24-12L26 4M94 42 70 30 74 4M30 30H6M70 30h24" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.6"/><ellipse cx="28" cy="20" rx="9" ry="5" fill="#fff" fill-opacity=".7" transform="rotate(-30 28 20)"/>'],
  round: ['0 0 100 80', 'M22 4h56l20 22-48 52L2 26z', '<path d="M2 26h96M22 4l12 22 16 52M78 4 66 26 50 78M34 26 50 4l16 22" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6"/><path d="M34 26 50 4 66 26z" fill="#fff" fill-opacity=".3"/>'],
  emerald: ['0 0 100 70', 'M16 2h68l14 14v38L84 68H16L2 54V16z', '<path d="M28 14h44l8 8v26l-8 8H28l-8-8V22z" fill="#fff" fill-opacity=".15" stroke="#fff" stroke-opacity=".5" stroke-width="1.4"/><path d="M30 18h20l-8 10H26z" fill="#fff" fill-opacity=".45"/>'],
  pear: ['0 0 70 100', 'M35 2C52 24 68 46 68 64a33 33 0 0 1-66 0C2 46 18 24 35 2z', '<path d="M35 2v62M35 64 6 52M35 64l29-12M35 64 14 88M35 64l21 24" stroke="#fff" stroke-opacity=".45" stroke-width="1.4"/><ellipse cx="22" cy="44" rx="6" ry="12" fill="#fff" fill-opacity=".45" transform="rotate(20 22 44)"/>']
};
const STAR = '<path d="M0-10C1-3 3-1 10 0 3 1 1 3 0 10-1 3-3 1-10 0-3-1-1-3 0-10z" fill="#fff"/>';
function gem(shape, g, w) {
  const [vb, d, lines] = SH[shape]; const [a, b, c] = GRAD[g];
  return `<svg viewBox="${vb}" width="${w}" style="filter:drop-shadow(0 18px 22px rgba(40,30,20,.25));overflow:visible"><defs><linearGradient id="x${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".45" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs><path d="${d}" fill="url(#x${g})"/>${lines}<g transform="translate(30 22) scale(.9)" style="filter:drop-shadow(0 0 4px #fff)">${STAR}</g></svg>`;
}
const STITCHES = [
  ['01_start-here', 'start here', 'heart', 'rose', 420], ['02_how-to-order', 'how to order', 'round', 'dia', 430],
  ['03_the-work', 'the work', 'emerald', 'em', 420], ['04_kind-words', 'kind words', 'heart', 'sap', 420]
];
const IDO = [
  ['01_Start-Here', 'Start Here', '#2A241F', '#FBF7F0', '#D9C08F'], ['02_Scripts', 'Scripts', '#F1DCD6', '#2A241F', '#B08D57'],
  ['03_Coaching', 'Coaching', '#FBF7F0', '#2A241F', '#B08D57'], ['04_Shop', 'Shop', '#2A241F', '#FBF7F0', '#D9C08F'],
  ['05_Kind-Words', 'Kind Words', '#F1DCD6', '#2A241F', '#B08D57']
];
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const head = '<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Pinyon+Script&display=swap" rel="stylesheet"><style>body{margin:0}.s{width:1080px;height:1920px;display:grid;place-items:center}</style>';
  fs.mkdirSync(path.join(OUT, 'stitches'), { recursive: true }); fs.mkdirSync(path.join(OUT, 'i-do'), { recursive: true });
  for (const [f, word, shape, g, w] of STITCHES) {
    await p.setContent(`<html><head>${head}</head><body><div class="s" style="background:#F4EFE7"><div style="display:flex;flex-direction:column;align-items:center">
      ${gem(shape, g, w)}<div style="font:400 ${word.length > 9 ? 150 : 170}px/1 'DM Serif Display';letter-spacing:-.04em;color:#2B2B2B;margin-top:60px">${word}</div></div></div></body></html>`);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(250);
    await p.screenshot({ path: path.join(OUT, 'stitches', `Stitches-Highlight_${f}.jpg`), type: 'jpeg', quality: 92 });
  }
  for (const [f, word, bg, fg, gold] of IDO) {
    const size = word.length > 8 ? 205 : word.length > 7 ? 235 : 270;
    await p.setContent(`<html><head>${head}</head><body><div class="s" style="background:${bg}"><div style="width:960px;height:960px;border-radius:50%;border:4px solid ${gold};display:grid;place-items:center">
      <div style="font:400 ${size}px/1 'Pinyon Script';color:${fg};padding-top:20px">${word}</div></div></div></body></html>`);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(250);
    await p.screenshot({ path: path.join(OUT, 'i-do', `IDo-Highlight_${f}.jpg`), type: 'jpeg', quality: 92 });
  }
  await b.close();
})();
