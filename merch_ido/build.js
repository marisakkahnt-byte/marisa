// I Do by Marisa merch, "The Fine Print": print files (300 dpi, transparent) + mockup sheet.
const { chromium } = require('playwright'); const D = __dirname;
const FONTS = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Courier+Prime:wght@400;700&family=Pinyon+Script&family=Raleway:wght@500;600&display=swap">`;
const ESP='#2A241F', CREAM='#F4ECDD', GOLD='#B08D57', WINE='#7E2E2C';
const T = {
  hat: (c)=>`<div style="font:600 150px/1 'Cormorant Garamond';color:${c};letter-spacing:.01em">Ordained online.</div>`,
  crew: (c)=>`<div style="font:italic 600 170px/1 'Cormorant Garamond';color:${c}">Ordained.</div>`,
  tote: (c)=>`<div style="text-align:center;color:${c}"><div style="font:italic 500 330px/1.02 'Cormorant Garamond'">Rain is<br>good luck.</div></div>`,
  journal: (c)=>`<div style="text-align:center;color:${c}"><div style="font:italic 500 128px/1.08 'Cormorant Garamond'">Tell me<br>how you met.</div><div style="width:110px;height:4px;background:${c};margin:46px auto 0"></div></div>`,
  mug: (c)=>`<div style="font:400 150px/1 'Courier Prime';color:${c}">[Pause for applause.]</div>`,
  mugback: (c)=>`<div style="font:400 120px/1 'Courier Prime';color:${c}">[Applause.]</div>`,
};
const files = [
  ['HAT_Ordained-Online_cream-thread_4x1.75in',1200,525,T.hat('#F4ECDD')],
  ['HAT_Ordained-Online_espresso-thread_4x1.75in',1200,525,T.hat(ESP)],
  ['CREWNECK_Ordained_left-chest-embroidery_3.5x1.25in',1050,375,T.crew(ESP)],
  ['TOTE_Rain-Is-Good-Luck_print_12x12in',3600,3600,`<div style="position:absolute;top:620px;left:0;right:0;display:flex;justify-content:center">${T.tote(ESP)}</div>`],
  ['JOURNAL_Tell-Me-How-You-Met_engrave_4x3in',1200,900,T.journal('#000')],
  ['MUG_Pause-for-Applause_11oz-wrap_9x3.5in',2700,1050,`<div style="display:grid;grid-template-columns:1fr 1fr;height:100%"><div style="display:grid;place-items:center">${T.mug(ESP).replace('150px','118px')}</div><div style="display:grid;place-items:center">${T.mugback(ESP).replace('120px','96px')}</div></div>`],
];
const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`;
const card=(label,inner,bg='#EFE7DA')=>`<div class="card" style="background:${bg}"><div class="stage">${inner}</div><div class="lab">${label}</div></div>`;
const hat=`<svg width="440" height="330" viewBox="0 0 440 330"><defs><radialGradient id="hg" cx=".42" cy=".35" r=".75"><stop offset="0" stop-color="#4b4038"/><stop offset=".55" stop-color="#2d2621"/><stop offset="1" stop-color="#16120e"/></radialGradient><linearGradient id="bb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1713"/><stop offset=".5" stop-color="#2f2722"/><stop offset="1" stop-color="#211b17"/></linearGradient></defs>
<ellipse cx="220" cy="310" rx="170" ry="11" fill="rgba(0,0,0,.13)"/>
<path d="M58 232 C52 120 120 40 220 40 C320 40 388 120 382 232 C330 222 110 222 58 232 Z" fill="url(#hg)"/>
<path d="M220 40 L220 226 M140 60 C122 110 118 170 124 226 M300 60 C318 110 322 170 316 226" stroke="#14100d" stroke-width="1.6" fill="none" opacity=".55"/>
<circle cx="220" cy="42" r="8" fill="#332b25"/>
<path d="M58 232 C110 222 330 222 382 232 C396 262 330 300 220 300 C110 300 44 262 58 232 Z" fill="url(#bb)"/>
<path d="M82 246 C140 238 300 238 358 246" stroke="#4d433b" stroke-width="1.4" stroke-dasharray="4 5" fill="none"/>
<path d="M76 262 C150 280 290 280 364 262" stroke="#4d433b" stroke-width="1.4" stroke-dasharray="4 5" fill="none"/></svg>
<div style="position:absolute;top:150px;left:0;right:0;text-align:center;font:600 31px 'Cormorant Garamond';color:#EDE3D1;text-shadow:0 1px 0 rgba(0,0,0,.6)">Ordained online.</div>`;
const crew=`<svg width="480" height="430" viewBox="0 0 480 430"><defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7F1E6"/><stop offset="1" stop-color="#E0D4C0"/></linearGradient></defs>
<ellipse cx="240" cy="414" rx="175" ry="10" fill="rgba(0,0,0,.10)"/>
<path d="M170 34 C200 58 280 58 310 34 L392 66 C420 78 432 110 440 160 L470 368 L418 378 L386 200 L384 398 L96 398 L94 200 L62 378 L10 368 L40 160 C48 110 60 78 88 66 Z" fill="url(#cg)" stroke="#d1c2a8" stroke-width="1.5"/>
<path d="M170 34 C200 68 280 68 310 34" stroke="#cdbea3" stroke-width="11" fill="none"/>
<path d="M96 380 L384 380" stroke="#d4c6ad" stroke-width="16"/><path d="M14 352 L66 362 M466 352 L414 362" stroke="#d4c6ad" stroke-width="16"/>
<path d="M94 200 L96 380 M386 200 L384 380" stroke="#d6c9b2" stroke-width="1.2"/></svg>
<div style="position:absolute;top:112px;left:282px;font:italic 600 20px 'Cormorant Garamond';color:${ESP}">Ordained.</div>`;
const tote=`<div style="position:relative;width:330px;height:420px"><div style="position:absolute;left:78px;top:0;width:58px;height:150px;border:15px solid #d9cbb1;border-bottom:none;border-radius:40px 40px 0 0"></div><div style="position:absolute;right:78px;top:0;width:58px;height:150px;border:15px solid #d9cbb1;border-bottom:none;border-radius:40px 40px 0 0"></div>
<div class="tex" style="position:absolute;left:0;right:0;top:120px;bottom:0;background:linear-gradient(160deg,#EFE5D3,#E0D2BA);box-shadow:0 22px 34px rgba(60,40,20,.18);display:flex;justify-content:center;padding-top:62px;box-sizing:border-box"><div style="font:italic 500 50px/1.02 'Cormorant Garamond';color:${ESP};text-align:center">Rain is<br>good luck.</div></div></div>`;
const journal=`<div class="tex" style="position:relative;width:290px;height:380px;background:linear-gradient(135deg,#6b4a35,#4a3022);border-radius:6px 16px 16px 6px;box-shadow:14px 18px 30px rgba(40,25,15,.3),inset -6px 0 10px rgba(0,0,0,.2);">
<div style="position:absolute;left:22px;top:0;bottom:0;width:3px;background:rgba(0,0,0,.25)"></div><div style="position:absolute;right:30px;top:-4px;bottom:-4px;width:14px;background:#3a241a;border-radius:3px"></div>
<div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;font:italic 500 37px/1.1 'Cormorant Garamond';color:#2b1a12;text-shadow:0 1px 0 rgba(255,220,180,.18)">Tell me<br>how you met.<div style="width:34px;height:1.5px;background:#2b1a12;margin:16px auto 0"></div></div></div>`;
const mug=(txt,fs,flip)=>`<div style="position:relative;width:220px;height:250px;${flip?'transform:scaleX(-1)':''}"><div style="position:absolute;right:-62px;top:58px;width:80px;height:120px;border:20px solid #f1ede6;border-left:none;border-radius:0 60px 60px 0;box-sizing:border-box"></div>
<div style="position:absolute;inset:0;background:linear-gradient(90deg,#e7e2d9,#ffffff 30%,#fbfaf7 65%,#dcd6cb);border-radius:10px 10px 26px 26px;box-shadow:0 18px 26px rgba(0,0,0,.14)"></div>
<div style="position:absolute;inset:0;display:grid;place-items:center;font:400 ${fs}px 'Courier Prime';color:${ESP};text-align:center;line-height:1.25;${flip?'transform:scaleX(-1)':''}">${txt}</div></div>`;
const sheet=`<!doctype html><html><head>${FONTS}<style>
body{margin:0;width:1800px;background:#F8F3EA;font-family:Raleway}.top{text-align:center;padding:56px 0 34px}
.k{font:600 15px Raleway;letter-spacing:.32em;color:${GOLD}}.h{font:400 92px/1 'Pinyon Script';color:${WINE};margin-top:14px}.s{font:italic 500 26px 'Cormorant Garamond';color:#5b5047;margin-top:12px}
.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:26px;padding:0 60px 60px}.card{grid-column:span 2;height:520px;position:relative;display:flex;flex-direction:column}
.card.w{grid-column:span 3}.stage{flex:1;display:grid;place-items:center;position:relative}.stage>*{position:relative}
.lab{text-align:center;padding-bottom:30px;font:600 13px Raleway;letter-spacing:.26em;color:#6f6459;text-transform:uppercase}
.tex::after{content:'';position:absolute;inset:0;border-radius:inherit;background:${noise};pointer-events:none}
.lab b{display:block;font:italic 500 25px 'Cormorant Garamond';letter-spacing:0;text-transform:none;color:${ESP};margin-bottom:8px}
</style></head><body><div class="top"><div class="k">I DO BY MARISA · MERCH</div><div class="h">The Fine Print</div><div class="s">Words only the person at the front of the room would know.</div></div>
<div class="grid">
${card('<b>Ordained online.</b>Dad hat · embroidered · cream on espresso',`<div style="position:relative">${hat}</div>`)}
${card('<b>Ordained.</b>Crewneck · small chest embroidery',`<div style="position:relative">${crew}</div>`,'#E9E0D0')}
${card('<b>Rain is good luck.</b>Canvas tote · natural',tote)}
${card('<b>Tell me how you met.</b>Journal · engraved',journal,'#E9E0D0').replace('class="card"','class="card w"')}
${card('<b>[Pause for applause.]</b>11 oz mug · front + back',`<div style="display:flex;gap:110px">${mug('[Pause for<br>applause.]',25,true)}${mug('[Applause.]',24)}</div>`).replace('class="card"','class="card w"')}
</div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const [n,w,h,html] of files){await p.setViewportSize({width:w,height:h});await p.setContent(`<!doctype html><html><head>${FONTS}</head><body style="margin:0;background:transparent"><div style="width:${w}px;height:${h}px;position:relative;display:grid;place-items:center">${html}</div></body></html>`);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);await p.screenshot({path:`${D}/files/${n}.png`,omitBackground:true});}
const m=await b.newPage({viewport:{width:1800,height:1300},deviceScaleFactor:1});await m.setContent(sheet);await m.evaluate(()=>document.fonts.ready);await m.waitForTimeout(800);
await m.screenshot({path:`${D}/IDo_Merch_The-Fine-Print_mockups.png`,fullPage:true});await b.close();})();
