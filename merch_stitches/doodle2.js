// Stitches doodle clusters v2: needlepoint + embroidery motifs (original). Embroidery files + mockups.
const {chromium}=require('playwright');const D=__dirname;
const FONTS='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=DM+Serif+Display&family=DM+Sans:wght@700&display=swap">';
const pat=(id,c,ang)=>`<pattern id="${id}" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(${ang})"><rect width="5" height="5" fill="${c}"/><rect width="1.4" height="5" fill="rgba(255,255,255,.28)"/><rect x="3" width=".8" height="5" fill="rgba(0,0,0,.14)"/></pattern>`;
const defs=u=>`<defs>${pat('pk'+u,'#e8608f',35)}${pat('pl'+u,'#f6a9c3',-30)}${pat('wd'+u,'#d9b98c',80)}${pat('gd'+u,'#d8b24a',60)}${pat('sv'+u,'#d9dde2',20)}${pat('rd'+u,'#d23a4c',45)}${pat('em'+u,'#1f7a5c',30)}${pat('bl'+u,'#5b8fc9',-40)}${pat('cr'+u,'#f3ead8',10)}${pat('lg'+u,'#6fae6a',30)}</defs>`;
// parts
const heartP=(x,y,s,f,st)=>`<path transform="translate(${x} ${y}) scale(${s})" d="M0 8 C0 -4 16 -4 16 8 C16 -4 32 -4 32 8 C32 22 16 30 16 38 C16 30 0 22 0 8Z" fill="${f}" stroke="${st}" stroke-width="${2/s}"/>`;
const hoop=(x,y,u,r=58)=>`<g transform="translate(${x} ${y})"><circle r="${r}" fill="url(#cr${u})"/>${heartP(-22,-20,1.4,`url(#pk${u})`,'#b8406a')}
<path d="M-38 26 Q-20 36 0 30 T38 24" stroke="#1f7a5c" stroke-width="2.6" stroke-dasharray="5 3" fill="none"/>
<circle r="${r}" fill="none" stroke="url(#wd${u})" stroke-width="9"/><circle r="${r+7}" fill="none" stroke="#a8875a" stroke-width="2"/><rect x="-7" y="${-r-18}" width="14" height="14" rx="3" fill="url(#sv${u})" stroke="#8c939b"/></g>`;
const canvasNP=(x,y,u,n=9,c=11)=>{let g='';for(let i=0;i<=n;i++){g+=`<path d="M${i*c} 0 V${n*c} M0 ${i*c} H${n*c}" stroke="#cdbf9f" stroke-width="1"/>`;}
 const H=[[1,2],[2,1],[3,2],[4,3],[5,2],[6,1],[7,2],[1,3],[2,3],[3,3],[4,4],[5,3],[6,3],[7,3],[2,4],[3,4],[4,5],[5,4],[6,4],[3,5],[4,6],[5,5],[2,2],[6,2],[4,7]];let st='';
 for(const [a,b] of H)st+=`<path d="M${a*c+2} ${(b+1)*c-2} L${(a+1)*c-2} ${b*c+2}" stroke="#e8608f" stroke-width="5" stroke-linecap="round"/>`;
 return `<g transform="translate(${x} ${y}) rotate(-8)"><rect x="-6" y="-6" width="${n*c+12}" height="${n*c+12}" fill="#efe3c8" stroke="#b9a782" stroke-width="2"/>${g}${st}<rect x="-6" y="-6" width="${n*c+12}" height="8" fill="#c9b78e"/></g>`;};
const yarn=(x,y,u,f='pl')=>`<g transform="translate(${x} ${y})"><circle r="26" fill="url(#${f}${u})" stroke="#b8406a" stroke-width="2"/><path d="M-22 -10 Q0 -30 22 -8 M-24 4 Q0 -14 24 6 M-18 16 Q2 2 20 18 M-10 -24 Q-26 0 -8 24" stroke="rgba(255,255,255,.55)" stroke-width="2" fill="none"/></g>`;
const needle=(x,y,a,u,len=64)=>`<g transform="translate(${x} ${y}) rotate(${a})"><rect x="-3" y="${-len}" width="6" height="${len}" rx="3" fill="url(#sv${u})" stroke="#8c939b" stroke-width="1.5"/><ellipse cx="0" cy="${-len+9}" rx="1.6" ry="5" fill="#fff"/><path d="M-3 0 L0 10 L3 0Z" fill="#9aa1a8"/></g>`;
const thread=(d,c='#e8608f')=>`<path d="${d}" stroke="${c}" stroke-width="3.2" fill="none" stroke-dasharray="7 4" stroke-linecap="round"/>`;
const skein=(x,y,a,f,u)=>`<g transform="translate(${x} ${y}) rotate(${a})"><rect x="-13" y="-34" width="26" height="68" rx="11" fill="url(#${f}${u})" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/><rect x="-15" y="-16" width="30" height="9" fill="#f6f1e6" stroke="#bdb2a0"/><rect x="-15" y="9" width="30" height="9" fill="#f6f1e6" stroke="#bdb2a0"/><rect x="-15" y="9" width="30" height="3" fill="#d23a4c"/></g>`;
const spool=(x,y,u,f='pk')=>`<g transform="translate(${x} ${y}) rotate(-8) scale(.8)"><rect width="70" height="14" rx="4" fill="url(#wd${u})" stroke="#9c7b52" stroke-width="2"/><rect x="8" y="14" width="54" height="56" fill="url(#${f}${u})" stroke="rgba(0,0,0,.3)" stroke-width="2"/><rect y="70" width="70" height="14" rx="4" fill="url(#wd${u})" stroke="#9c7b52" stroke-width="2"/></g>`;
const pincushion=(x,y,u)=>`<g transform="translate(${x} ${y})">${needle(-14,-30,-25,u,40)}${needle(16,-28,30,u,38)}<circle cx="-20" cy="-62" r="6" fill="#5b8fc9"/><circle cx="34" cy="-58" r="6" fill="#d8b24a"/>
<ellipse rx="46" ry="34" fill="url(#rd${u})" stroke="#9e2233" stroke-width="2"/><path d="M0 -34 V34 M-30 -26 Q-14 0 -30 26 M30 -26 Q14 0 30 26" stroke="#9e2233" stroke-width="2" fill="none"/>
<path d="M-14 -36 L0 -28 L14 -36 L8 -24 L0 -30 L-8 -24Z" fill="url(#lg${u})" stroke="#3d7a3a"/><g transform="translate(52 40)"><path d="M-30 -30 Q-10 -10 0 -6" stroke="#3d7a3a" stroke-width="2" fill="none"/><path d="M-7 -6 Q0 -12 7 -6 Q8 8 0 14 Q-8 8 -7 -6Z" fill="url(#rd${u})" stroke="#9e2233" stroke-width="1.5"/></g></g>`;
const thimble=(x,y,u)=>{let d='';for(let r=0;r<4;r++)for(let k=-3;k<=3;k++)d+=`<circle cx="${k*6+(r%2)*3}" cy="${-22+r*9}" r="1.6" fill="#8c939b"/>`;return `<g transform="translate(${x} ${y}) rotate(10)"><path d="M-22 22 L-18 -18 Q0 -38 18 -18 L22 22Z" fill="url(#sv${u})" stroke="#8c939b" stroke-width="2"/>${d}<rect x="-24" y="18" width="48" height="8" rx="3" fill="url(#gd${u})"/></g>`;};
const machine=(x,y,u)=>`<g transform="translate(${x} ${y})">
<path d="M0 0 H120 Q132 0 132 12 V40 H110 V22 H28 V86 H0Z" fill="url(#cr${u})" stroke="#bdb2a0" stroke-width="2"/>
<rect x="-10" y="86" width="160" height="22" rx="5" fill="url(#cr${u})" stroke="#bdb2a0" stroke-width="2"/>
<rect x="8" y="8" width="44" height="10" rx="3" fill="url(#pk${u})"/><circle cx="118" cy="16" r="6" fill="url(#gd${u})"/>
<rect x="114" y="40" width="10" height="16" fill="url(#sv${u})" stroke="#8c939b"/><path d="M119 56 V70" stroke="#8c939b" stroke-width="2"/>
<ellipse cx="119" cy="84" rx="34" ry="10" fill="url(#cr${u})" stroke="url(#wd${u})" stroke-width="5"/>
<text x="111" y="89" font-family="DM Serif Display" font-size="15" fill="#e8608f">M</text></g>`;
const bobbin=(x,y,u)=>`<g transform="translate(${x} ${y})"><circle r="17" fill="url(#sv${u})" stroke="#8c939b" stroke-width="2"/><circle r="11" fill="url(#pk${u})"/><circle r="3" fill="#8c939b"/></g>`;
const emer=(x,y,u,s=1)=>`<g transform="translate(${x} ${y}) rotate(12) scale(${s})"><path d="M-10 -14 L10 -14 L16 -6 L16 8 L10 16 L-10 16 L-16 8 L-16 -6Z" fill="url(#em${u})" stroke="#0f4a37" stroke-width="2"/><path d="M-6 -8 L6 -8 L8 0 L6 8 L-6 8 L-8 0Z" fill="none" stroke="#7fd1b0" stroke-width="1.4"/></g>`;
const word=(x,y,t,fs,rot=-4)=>`<text x="${x}" y="${y}" font-family="Nanum Pen Script" font-size="${fs}" fill="#f4efe6" stroke="#cfc6b6" stroke-width=".6" transform="rotate(${rot} ${x} ${y})">${t}</text>`;
const svg=(u,body)=>`<svg viewBox="0 0 360 230" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">${defs(u)}${body}</svg>`;
const ART={
 needlepoint:u=>svg(u,`${canvasNP(30,40,u)}${yarn(190,70,u)}${thread('M190 96 C200 140 250 120 268 160')}${needle(282,178,-40,u)}${emer(318,70,u,.8)}
  ${word(150,40,'i',52,0)}${heartP(172,10,1.05,`url(#rd${u})`,'#9e2233')}${word(46,218,'needlepoint',56)}`),
 club:u=>svg(u,`${hoop(92,104,u)}${skein(196,96,-12,'pk',u)}${skein(230,100,4,'em',u)}${skein(264,96,16,'gd',u)}${thread('M154 150 C190 170 240 150 292 146')}${needle(310,150,-70,u)}
  ${word(186,40,'embroidery',46,-3)}${word(196,222,'club',58,-4)}`),
 hoarder:u=>svg(u,`${skein(40,98,-14,'pk',u)}${skein(74,92,-2,'em',u)}${skein(108,96,10,'bl',u)}${skein(142,102,20,'gd',u)}${spool(176,60,u,'pl')}${yarn(292,96,u)}${emer(250,40,u,.8)}
  ${word(24,190,'certified',44,-3)}${word(120,226,'thread hoarder',46,-3)}`),
 machine:u=>svg(u,`${machine(36,52,u)}${bobbin(232,80,u)}${spool(262,100,u,'em')}${thread('M232 98 C236 140 200 150 180 170')}${emer(318,56,u,.8)}
  ${word(196,44,'i',52,0)}${heartP(218,10,1.05,`url(#rd${u})`,'#9e2233')}${word(24,218,'machine embroidery',46,-3)}`),
 busy:u=>svg(u,`${pincushion(96,112,u)}${thimble(206,96,u)}${spool(244,52,u,'bl')}${thread('M270 120 C300 150 280 180 316 190','#5b8fc9')}${emer(318,56,u,.8)}
  ${word(150,206,'busy hands',52,-4)}`),
};
const dark=s=>s.replace(/#f4efe6/g,'#1F1D24').replace(/#cfc6b6/g,'#1F1D24');
let K=0;
const shirt=(body,shade,rib,art)=>{const u=++K;return `<div style="position:relative;width:500px;height:520px"><svg width="500" height="520" viewBox="0 0 500 520"><defs><linearGradient id="s${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${body}"/><stop offset="1" stop-color="${shade}"/></linearGradient></defs>
<ellipse cx="250" cy="502" rx="185" ry="11" fill="rgba(0,0,0,.12)"/><path d="M176 52 L210 40 L290 40 L324 52 L410 86 C442 100 456 140 464 190 L496 430 L442 442 L408 240 L406 470 L94 470 L92 240 L58 442 L4 430 L36 190 C44 140 58 100 90 86 Z" fill="url(#s${u})"/>
<path d="M176 52 C178 18 322 18 324 52 L318 70 C290 58 210 58 182 70 Z" fill="${rib}"/><path d="M94 452 L406 452" stroke="${rib}" stroke-width="20"/><path d="M8 412 L62 422 M492 412 L438 422" stroke="${rib}" stroke-width="20"/></svg>
<div style="position:absolute;left:165px;top:145px;width:160px;height:102px">${art}</div></div>`};
const items=[['needlepoint','i ♥ needlepoint','emerald · cream + pink thread',['#1d6a52','#0b3a2c','#155a45'],false],
 ['club','embroidery club','oat · ink + color thread',['#EFE6D6','#CFC2AB','#DCCFB8'],true],
 ['hoarder','certified thread hoarder','dusty blue · cream + color thread',['#3f6f8f','#24465e','#335c77'],false],
 ['busy','busy hands','blush · ink + color thread',['#F3D3DC','#D9AAB8','#E7BFCB'],true],
 ['machine','i ♥ machine embroidery','espresso · cream + color thread',['#4a3d36','#241c18','#3a2f29'],false]];
const card=(lab,inner,bg)=>`<div class="c" style="background:${bg}"><div class="st">${inner}</div><div class="lab">${lab}</div></div>`;
let n=100;
const sheet=`<!doctype html><html><head>${FONTS}<style>body{margin:0;width:1800px;background:#F2EEE7}.top{text-align:center;padding:52px 0 26px}
.k{font:700 14px 'DM Sans';letter-spacing:.34em;color:#0E4A38}.h{font:400 84px/1 'DM Serif Display';color:#1F1D24;margin-top:10px}.s{font:400 40px 'Nanum Pen Script';color:#0E4A38;margin-top:6px}
.g{display:grid;grid-template-columns:1fr 1fr;gap:26px;padding:0 60px 30px}.c{height:620px;display:flex;flex-direction:column;border-radius:6px}.st{flex:1;display:flex;align-items:center;justify-content:center;gap:20px}
.z{width:330px;height:211px;background:#2f5f7f;border-radius:10px;padding:14px}.z.l{background:#EFE6D6}
.lab{text-align:center;padding-bottom:26px;font:700 13px 'DM Sans';letter-spacing:.22em;color:#5a5560;text-transform:uppercase}.lab b{display:block;font:400 30px 'DM Serif Display';letter-spacing:0;text-transform:none;color:#1F1D24;margin-bottom:8px}</style></head><body>
<div class="top"><div class="k">MARISA STITCHES · MERCH</div><div class="h">the doodle sweatshirts</div><div class="s">needlepoint + embroidery, stitched small on the chest</div></div><div class="g">
${items.map(([k,t,sub,c,dk],i)=>{const a=ART[k](++n);const z=ART[k](++n);return card(`<b>${t}</b>${sub}`,`<div style="width:410px;height:427px"><div style="transform:scale(.82);transform-origin:0 0">${shirt(c[0],c[1],c[2],dk?dark(a):a)}</div></div><div class="z${dk?' l':''}">${dk?dark(z):z}</div>`,i%3?'#F6E3EA':'#E9E3D8')}).join('')}
</div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1800,height:1200}});await p.setContent(sheet);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(900);await p.screenshot({path:D+'/Stitches_doodle-sweatshirts_mockups.png',fullPage:true});
for(const [k] of items)for(const [v,f] of [['light-thread',x=>x],['dark-thread',dark]]){await p.setViewportSize({width:1050,height:671});await p.setContent(`<html><head>${FONTS}</head><body style="margin:0;background:transparent"><div style="width:1050px;height:671px">${f(ART[k](++n))}</div></body></html>`);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);await p.screenshot({path:D+`/doodle/EMBROIDERY_${k}_${v}_3.5x2.25in.png`,omitBackground:true});}
await b.close();})();
