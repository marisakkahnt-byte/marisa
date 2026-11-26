// I Do hat lineup: mockups + embroidery files (300 dpi, transparent).
const { chromium } = require('playwright'); const D = __dirname;
const FONTS = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Courier+Prime:wght@700&family=Pinyon+Script&family=Raleway:wght@600&display=swap">`;
const ESP='#2A241F', GOLD='#B08D57', WINE='#7E2E2C';
let uid=0;
function cap({crown,shade,brim,brimEdge,cord=false,text,font,tc,tx=0,ty=150,fs=31,rot=0,drop=false,dropc}){const u=++uid;
 const cordp=cord?`<pattern id="cd${u}" width="7" height="10" patternUnits="userSpaceOnUse"><rect width="7" height="10" fill="transparent"/><rect width="3" height="10" fill="rgba(255,255,255,.07)"/></pattern>`:'';
 return `<div style="position:relative;width:440px;height:330px"><svg width="440" height="330" viewBox="0 0 440 330"><defs>${cordp}<radialGradient id="h${u}" cx=".42" cy=".35" r=".78"><stop offset="0" stop-color="${crown}"/><stop offset="1" stop-color="${shade}"/></radialGradient><linearGradient id="b${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${brimEdge||shade}"/><stop offset=".55" stop-color="${brim}"/><stop offset="1" stop-color="${brimEdge||shade}"/></linearGradient></defs>
 <ellipse cx="220" cy="310" rx="170" ry="11" fill="rgba(0,0,0,.13)"/>
 <path d="M58 232 C52 120 120 40 220 40 C320 40 388 120 382 232 C330 222 110 222 58 232 Z" fill="url(#h${u})"/>
 ${cord?`<path d="M58 232 C52 120 120 40 220 40 C320 40 388 120 382 232 C330 222 110 222 58 232 Z" fill="url(#cd${u})"/>`:''}
 <path d="M220 40 L220 226 M140 60 C122 110 118 170 124 226 M300 60 C318 110 322 170 316 226" stroke="rgba(0,0,0,.28)" stroke-width="1.6" fill="none"/>
 <circle cx="220" cy="42" r="8" fill="${brimEdge||shade}"/>
 <path d="M58 232 C110 222 330 222 382 232 C396 262 330 300 220 300 C110 300 44 262 58 232 Z" fill="url(#b${u})"/>
 ${cord?`<path d="M58 232 C110 222 330 222 382 232 C396 262 330 300 220 300 C110 300 44 262 58 232 Z" fill="url(#cd${u})"/>`:''}
 <path d="M82 246 C140 238 300 238 358 246 M76 262 C150 280 290 280 364 262" stroke="rgba(255,255,255,.16)" stroke-width="1.4" stroke-dasharray="4 5" fill="none"/></svg>
 <div style="position:absolute;top:${ty}px;left:${tx}px;right:${-tx}px;text-align:center;font:${font.replace('$S',fs+'px')};color:${tc};transform:rotate(${rot}deg);text-shadow:0 1px 0 rgba(0,0,0,.35);white-space:nowrap">${text}${drop?`<svg width="${fs*.5}" height="${fs*.7}" viewBox="0 0 10 14" style="margin-left:8px;vertical-align:-2px"><path d="M5 0 C7 4 10 7 10 9.5 A5 4.5 0 0 1 0 9.5 C0 7 3 4 5 0Z" fill="${dropc}"/></svg>`:''}</div></div>`;}
function back({color,shade,text,font,tc,fs=22}){return `<div style="position:relative;width:250px;height:190px"><svg width="250" height="190" viewBox="0 0 250 190"><path d="M20 150 C14 70 60 18 125 18 C190 18 236 70 230 150 Z" fill="${color}"/><path d="M95 150 C95 118 155 118 155 150 Z" fill="#F4ECDD" opacity=".9"/><rect x="78" y="146" width="94" height="12" rx="4" fill="${shade}"/><rect x="160" y="144" width="14" height="16" rx="2" fill="${GOLD}"/></svg>
 <div style="position:absolute;top:78px;left:0;right:0;text-align:center;font:${font.replace('$S',fs+'px')};color:${tc};white-space:nowrap">${text}</div></div>`;}
const NAT={crown:'#F6EFE1',shade:'#D3C6AD'};
const HATS=[
 {n:'01',name:'Ordained online.',spec:'Natural canvas crown · espresso brim · espresso thread',
  front:cap({...NAT,brim:'#3a312a',brimEdge:'#1a1612',text:'Ordained online.',font:"600 $S 'Cormorant Garamond'",tc:'#2A241F'}),back:''},
 {n:'02',name:'Tell me how you met.',spec:'Natural canvas crown · blush brim · wine thread, off-center',
  front:cap({...NAT,brim:'#EBC9BD',brimEdge:'#C99F92',text:'Tell me how you met.',font:"italic 700 $S 'Cormorant Garamond'",tc:WINE,tx:-58,ty:176,fs:25}),back:''},
 {n:'03',name:'Rain is good luck.',spec:'Two-tone corduroy · stone crown · espresso brim',
  front:cap({crown:'#DDD1BB',shade:'#A8997F',brim:'#3a312a',brimEdge:'#1a1612',cord:true,text:'Rain is good luck.',font:"600 $S 'Cormorant Garamond'",tc:ESP,drop:true,dropc:'#5b7f99',fs:29}),back:''},
 {n:'04',name:'Ordained.',spec:'Natural canvas crown · wine brim · wine thread',
  front:cap({...NAT,brim:'#7E2E2C',brimEdge:'#4f1b1a',text:'Ordained.',font:"italic 700 $S 'Cormorant Garamond'",tc:WINE,fs:46,ty:138}),back:''},
];
const files=[
 ['HAT01_Ordained-Online_FRONT_cream-thread_3.5x1in',1050,300,"600 120px 'Cormorant Garamond'",'#F4ECDD','Ordained online.'],
 ['HAT01_BACK_Est-at-the-altar_cream-thread_2.5x0.6in',750,180,"italic 600 96px 'Cormorant Garamond'",'#F4ECDD','Est. at the altar'],
 ['HAT02_Tell-Me-How-You-Met_FRONT_wine-thread_3.5x0.75in',1050,225,"italic 700 104px 'Cormorant Garamond'",WINE,'Tell me how you met.'],
 ['HAT02_BACK_And-then-what-happened_wine-thread_2.75x0.5in',825,150,"italic 700 80px 'Cormorant Garamond'",WINE,'(And then what happened?)'],
 ['HAT03_Rain-Is-Good-Luck_FRONT_espresso-thread_3.75x0.9in',1125,270,"600 112px 'Cormorant Garamond'",ESP,'Rain is good luck.<svg width="56" height="78" viewBox="0 0 10 14" style="margin-left:22px;vertical-align:-6px"><path d="M5 0 C7 4 10 7 10 9.5 A5 4.5 0 0 1 0 9.5 C0 7 3 4 5 0Z" fill="#5b7f99"/></svg>'],
 ['HAT03_BACK_Bring-an-umbrella-anyway_espresso-thread_2.75x0.5in',825,150,"italic 600 78px 'Cormorant Garamond'",ESP,'Bring an umbrella anyway.'],
 ['HAT04_Ordained_FRONT_gold-thread_3x1.1in',900,330,"italic 700 210px 'Cormorant Garamond'",'#D9B97F','Ordained.'],
 ['HAT04_BACK_Pause-for-applause_gold-thread_2.75x0.4in',825,120,"700 70px 'Courier Prime'",'#D9B97F','[Pause for applause.]'],
];
const sheet=`<!doctype html><html><head>${FONTS}<style>body{margin:0;width:1800px;background:#F8F3EA;font-family:Raleway}
.top{text-align:center;padding:54px 0 30px}.k{font:600 15px Raleway;letter-spacing:.32em;color:${GOLD}}.h{font:400 88px/1 'Pinyon Script';color:${WINE};margin-top:12px}.s{font:italic 600 25px 'Cormorant Garamond';color:#5b5047;margin-top:10px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:26px;padding:0 60px 60px}.c{background:#EFE7DA;height:470px;display:flex;flex-direction:column}.c:nth-child(2),.c:nth-child(3){background:#E9E0D0}
.row{flex:1;display:flex;align-items:center;justify-content:center;gap:16px}.lab{text-align:center;padding-bottom:28px;font:600 13px Raleway;letter-spacing:.24em;color:#6f6459;text-transform:uppercase}
.lab b{display:block;font:italic 600 26px 'Cormorant Garamond';letter-spacing:0;text-transform:none;color:${ESP};margin-bottom:8px}.n{font:600 12px Raleway;letter-spacing:.3em;color:${GOLD};text-align:center;padding-top:22px}
.bk{display:flex;flex-direction:column;align-items:center;gap:6px}.bk span{font:600 11px Raleway;letter-spacing:.28em;color:#8a7d70}</style></head><body>
<div class="top"><div class="k">I DO BY MARISA · THE FINE PRINT</div><div class="h">The Hat Edit · two-tone</div><div class="s">Natural canvas crown, colored brim. Same quiet type.</div></div><div class="grid">
${HATS.map(h=>`<div class="c"><div class="n">HAT ${h.n}</div><div class="row">${h.front}</div><div class="lab"><b>${h.name}</b>${h.spec}</div></div>`).join('')}
</div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const [n,w,h,font,c,t] of (process.env.SKIP?[]:files)){await p.setViewportSize({width:w,height:h});await p.setContent(`<!doctype html><html><head>${FONTS}</head><body style="margin:0;background:transparent"><div style="width:${w}px;height:${h}px;display:grid;place-items:center;font:${font};color:${c};white-space:nowrap">${t}</div></body></html>`);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);await p.screenshot({path:`${D}/hats/${n}.png`,omitBackground:true});}
const m=await b.newPage({viewport:{width:1800,height:1200}});await m.setContent(sheet);await m.evaluate(()=>document.fonts.ready);await m.waitForTimeout(800);await m.screenshot({path:`${D}/IDo_Hat-Edit_TWO-TONE_mockups.png`,fullPage:true});await b.close();})();
