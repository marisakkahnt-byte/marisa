const {chromium}=require('playwright');const fs=require('fs');const D=__dirname;
const b64=f=>'data:image/png;base64,'+fs.readFileSync(D+'/qzip/'+f).toString('base64');
const FONTS=`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Pinyon+Script&family=Raleway:wght@600&display=swap">`;
let u=0;
function zip({body,shade,trim,zipc,logo,quill}){u++;return `<div style="position:relative;width:520px;height:520px">
<svg width="520" height="520" viewBox="0 0 520 520"><defs><linearGradient id="g${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${body}"/><stop offset="1" stop-color="${shade}"/></linearGradient></defs>
<ellipse cx="260" cy="500" rx="190" ry="11" fill="rgba(0,0,0,.12)"/>
<path d="M188 60 L222 50 L298 50 L332 60 L420 96 C452 110 466 150 474 200 L506 440 L452 452 L418 250 L416 480 L104 480 L102 250 L68 452 L14 440 L46 200 C54 150 68 110 100 96 Z" fill="url(#g${u})"/>
<path d="M188 60 C200 30 320 30 332 60 L326 96 C300 84 220 84 194 96 Z" fill="${trim}"/>
<path d="M260 52 L260 196" stroke="${zipc}" stroke-width="5"/><rect x="254" y="190" width="12" height="20" rx="3" fill="${zipc}"/>
<path d="M226 96 L226 196 L294 196 L294 96" stroke="rgba(0,0,0,.18)" stroke-width="1.5" fill="none"/>
<path d="M104 462 L416 462" stroke="${trim}" stroke-width="20"/><path d="M18 422 L72 432 M502 422 L448 432" stroke="${trim}" stroke-width="20"/>
<path d="M102 250 L104 452 M418 250 L416 452" stroke="rgba(0,0,0,.12)" stroke-width="1.5"/></svg>
<img src="${b64(logo)}" style="position:absolute;left:318px;top:120px;width:64px">
<img src="${b64(quill)}" style="position:absolute;left:452px;top:388px;width:22px;transform:rotate(-8deg)"></div>`}
const card=(label,inner,bg)=>`<div class="c" style="background:${bg}"><div class="st">${inner}</div><div class="lab">${label}</div></div>`;
const html=`<!doctype html><html><head>${FONTS}<style>body{margin:0;width:1800px;background:#F8F3EA}.top{text-align:center;padding:52px 0 26px}
.k{font:600 15px Raleway;letter-spacing:.32em;color:#B08D57}.h{font:400 86px/1 'Pinyon Script';color:#7E2E2C;margin-top:12px}.s{font:italic 600 25px 'Cormorant Garamond';color:#5b5047;margin-top:10px}
.g{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;padding:0 60px 30px}.c{height:640px;display:flex;flex-direction:column}.st{flex:1;display:grid;place-items:center}
.lab{text-align:center;padding-bottom:28px;font:600 13px Raleway;letter-spacing:.24em;color:#6f6459;text-transform:uppercase}.lab b{display:block;font:italic 600 27px 'Cormorant Garamond';letter-spacing:0;text-transform:none;color:#2A241F;margin-bottom:8px}
.det{display:flex;gap:26px;padding:0 60px 60px}.d{flex:1;background:#EFE7DA;height:330px;display:flex;align-items:center;justify-content:center;gap:40px;font:600 13px Raleway;letter-spacing:.24em;color:#6f6459}
.sw{width:240px;height:240px;border-radius:6px;display:grid;place-items:center}</style></head><body>
<div class="top"><div class="k">I DO BY MARISA</div><div class="h">The Quarter-Zip</div><div class="s">Your logo, small on the chest. A tiny quill on the cuff.</div></div>
<div class="g">
${card('<b>Espresso</b>Cream logo · cream quill',zip({body:'#3d342d',shade:'#1d1814',trim:'#2a231e',zipc:'#C9B48E',logo:'logo-notagline_cream.png',quill:'quill_cream.png'}),'#EFE7DA')}
${card('<b>Oat</b>Espresso logo · espresso quill',zip({body:'#EFE6D6',shade:'#CFC2AB',trim:'#DCCFB8',zipc:'#B08D57',logo:'logo-notagline_espresso.png',quill:'quill_espresso.png'}),'#E7DED0')}
${card('<b>Wine</b>Gold logo · gold quill',zip({body:'#8b3533',shade:'#4f1b1a',trim:'#6a2524',zipc:'#D9B97F',logo:'logo-notagline_gold.png',quill:'quill_gold.png'}),'#EFE7DA')}
</div><div class="det">
<div class="d"><div class="sw" style="background:#2f2822"><img src="${b64('logo-notagline_cream.png')}" style="width:170px"></div><div>LEFT CHEST · ABOUT 3.5 IN WIDE<br><br>LOGO WITHOUT THE TAGLINE<br>(TOO SMALL TO STITCH CLEANLY)</div></div>
<div class="d"><div class="sw" style="background:#2f2822"><img src="${b64('quill_cream.png')}" style="width:110px"></div><div>LEFT CUFF · ABOUT 1.5 IN<br><br>THE QUILL ALONE<br>(THE DETAIL PEOPLE NOTICE)</div></div>
</div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1800,height:1200}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(700);await p.screenshot({path:D+'/IDo_Quarter-Zip_mockups.png',fullPage:true});await b.close();})();
