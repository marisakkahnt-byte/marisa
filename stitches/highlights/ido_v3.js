// I Do by Marisa highlight covers v3: cream, thin gold line icon + italic serif word (no botanicals)
const { chromium } = require('playwright');
const path = require('path'); const fs = require('fs');
const OUT = path.join(__dirname, 'i-do-v3'); fs.mkdirSync(OUT, { recursive: true });
const G = '#B08D57';
const ICON = {
  rings: `<circle cx="80" cy="110" r="46"/><circle cx="140" cy="110" r="46"/><path d="M128 52l12-16 12 16-12 10z"/>`,
  script: `<path d="M60 30h80l30 30v130H60z"/><path d="M140 30v30h30"/><path d="M82 90h66M82 115h66M82 140h44"/>`,
  mic: `<rect x="82" y="28" width="56" height="96" rx="28"/><path d="M62 104a48 48 0 0 0 96 0M110 152v34M84 186h52"/>`,
  bag: `<path d="M50 70h120l-10 120H60z"/><path d="M82 70V58a28 28 0 0 1 56 0v12"/><path d="M110 150l-16-15a10 10 0 0 1 16-12 10 10 0 0 1 16 12z"/>`,
  quote: `<path d="M40 40h140v100H96l-36 30v-30H40z"/><path d="M110 110l-18-17a11 11 0 0 1 18-13 11 11 0 0 1 18 13z"/>`
};
const L = [['01_Start-Here', 'start here', 'rings'], ['02_Scripts', 'scripts', 'script'], ['03_Coaching', 'coaching', 'mic'], ['04_Shop', 'shop', 'bag'], ['05_Kind-Words', 'kind words', 'quote']];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [f, word, ic] of L) {
    await p.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&display=swap" rel="stylesheet"><style>body{margin:0}</style></head><body>
<div style="width:1080px;height:1920px;background:#FBF7F0;display:flex;flex-direction:column;align-items:center;justify-content:center">
<svg viewBox="0 0 220 220" width="440" fill="none" stroke="${G}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">${ICON[ic]}</svg>
<div style="font:italic 500 ${word.length > 9 ? 136 : 150}px/1 'Cormorant Garamond',serif;color:#2A241F;margin-top:40px;letter-spacing:.005em">${word}</div></div></body></html>`);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(250);
    await p.screenshot({ path: path.join(OUT, `IDo-Highlight-v3_${f}.jpg`), type: 'jpeg', quality: 92 });
  }
  await b.close();
})();
