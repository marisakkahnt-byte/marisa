// "i ♥ stitching" embroidered doodle cluster (original) + sweatshirt mockups.
const {chromium}=require('playwright');const D=__dirname;
const FONTS='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=DM+Serif+Display&family=DM+Sans:wght@700&display=swap">';
// satin-stitch texture patterns
const pat=(id,c,ang)=>`<pattern id="${id}" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(${ang})"><rect width="5" height="5" fill="${c}"/><rect width="1.4" height="5" fill="rgba(255,255,255,.28)"/><rect x="3" width=".8" height="5" fill="rgba(0,0,0,.14)"/></pattern>`;
const ART=(u)=>`<svg viewBox="0 0 360 230" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs>
${pat('pk'+u,'#e8608f',35)}${pat('pd'+u,'#f6a9c3',-30)}${pat('wd'+u,'#e9d3b0',80)}${pat('gd'+u,'#d8b24a',60)}${pat('sv'+u,'#d9dde2',20)}${pat('rd'+u,'#d23a4c',45)}${pat('em'+u,'#1f7a5c',30)}</defs>
<!-- thread spool -->
<g transform="translate(28 78) rotate(-10) scale(.9)"><rect x="0" y="0" width="70" height="14" rx="4" fill="url(#wd${u})" stroke="#9c7b52" stroke-width="2"/><rect x="8" y="14" width="54" height="56" fill="url(#pk${u})" stroke="#b8406a" stroke-width="2"/><path d="M10 26 L60 22 M10 40 L60 36 M10 54 L60 50" stroke="#f9c1d3" stroke-width="2"/><rect x="0" y="70" width="70" height="14" rx="4" fill="url(#wd${u})" stroke="#9c7b52" stroke-width="2"/></g>
<!-- thread trailing to needle -->
<path d="M92 118 C130 150 170 100 210 130 C240 152 262 150 286 178" stroke="#e8608f" stroke-width="3.2" fill="none" stroke-dasharray="7 4" stroke-linecap="round"/>
<g transform="translate(300 200) rotate(-48)"><rect x="-3" y="-62" width="6" height="64" rx="3" fill="url(#sv${u})" stroke="#8c939b" stroke-width="1.5"/><ellipse cx="0" cy="-54" rx="1.6" ry="5" fill="#fff"/><path d="M-3 2 L0 12 L3 2Z" fill="#9aa1a8"/></g>
<!-- gold scissors -->
<g transform="translate(262 18) rotate(18) scale(.82)"><path d="M0 0 L46 70" stroke="url(#sv${u})" stroke-width="7" stroke-linecap="round"/><path d="M40 0 L-6 70" stroke="url(#sv${u})" stroke-width="7" stroke-linecap="round"/><circle cx="-12" cy="82" r="13" fill="none" stroke="url(#gd${u})" stroke-width="8"/><circle cx="52" cy="82" r="13" fill="none" stroke="url(#gd${u})" stroke-width="8"/><circle cx="20" cy="34" r="3.5" fill="#8a6a22"/></g>
<!-- little emerald -->
<g transform="translate(200 66) rotate(12)"><path d="M-10 -14 L10 -14 L16 -6 L16 8 L10 16 L-10 16 L-16 8 L-16 -6Z" fill="url(#em${u})" stroke="#0f4a37" stroke-width="2"/><path d="M-6 -8 L6 -8 L8 0 L6 8 L-6 8 L-8 0Z" fill="none" stroke="#7fd1b0" stroke-width="1.4"/></g>
<!-- i ♥ stitching -->
<text x="96" y="50" font-family="Nanum Pen Script" font-size="54" fill="#f4efe6" stroke="#cfc6b6" stroke-width=".6">i</text>
<path d="M120 30 C120 14 142 14 142 30 C142 14 164 14 164 30 C164 48 142 58 142 68 C142 58 120 48 120 30Z" fill="url(#rd${u})" stroke="#9e2233" stroke-width="2"/>
<text x="40" y="222" font-family="Nanum Pen Script" font-size="60" fill="#f4efe6" stroke="#cfc6b6" stroke-width=".6" transform="rotate(-5 140 210)">stitching</text></svg>`;
const ARTDARK=(u)=>ART(u).replace(/#f4efe6/g,'#1F1D24').replace(/#cfc6b6/g,'#1F1D24');
const shirt=(body,shade,rib,art,u)=>`<div style="position:relative;width:500px;height:520px"><svg width="500" height="520" viewBox="0 0 500 520"><defs><linearGradient id="s${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${body}"/><stop offset="1" stop-color="${shade}"/></linearGradient></defs>
<ellipse cx="250" cy="502" rx="185" ry="11" fill="rgba(0,0,0,.12)"/>
<path d="M176 52 L210 40 L290 40 L324 52 L410 86 C442 100 456 140 464 190 L496 430 L442 442 L408 240 L406 470 L94 470 L92 240 L58 442 L4 430 L36 190 C44 140 58 100 90 86 Z" fill="url(#s${u})"/>
<path d="M176 52 C178 18 322 18 324 52 L318 70 C290 58 210 58 182 70 Z" fill="${rib}"/>
<path d="M94 452 L406 452" stroke="${rib}" stroke-width="20"/><path d="M8 412 L62 422 M492 412 L438 422" stroke="${rib}" stroke-width="20"/>
<path d="M92 240 L94 444 M408 240 L406 444" stroke="rgba(0,0,0,.12)" stroke-width="1.5"/></svg>
<div style="position:absolute;left:170px;top:150px;width:150px;height:96px">${art}</div></div>`;
const card=(lab,inner,bg)=>`<div class="c" style="background:${bg}"><div class="st">${inner}</div><div class="lab">${lab}</div></div>`;
const sheet=`<!doctype html><html><head>${FONTS}<style>body{margin:0;width:1800px;background:#F2EEE7}.top{text-align:center;padding:52px 0 26px}
.k{font:700 14px 'DM Sans';letter-spacing:.34em;color:#0E4A38}.h{font:400 88px/1 'DM Serif Display';color:#1F1D24;margin-top:10px}.s{font:400 40px 'Nanum Pen Script';color:#0E4A38;margin-top:6px}
.g{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;padding:0 60px 30px}.c{height:640px;display:flex;flex-direction:column;border-radius:6px}.st{flex:1;display:grid;place-items:center}
.lab{text-align:center;padding-bottom:28px;font:700 13px 'DM Sans';letter-spacing:.22em;color:#5a5560;text-transform:uppercase}.lab b{display:block;font:400 30px 'DM Serif Display';letter-spacing:0;text-transform:none;color:#1F1D24;margin-bottom:8px}
.zoom{margin:0 60px 60px;background:#2f5f7f;height:420px;border-radius:6px;display:flex;align-items:center;justify-content:center;gap:60px}.zoom .t{font:400 46px 'Nanum Pen Script';color:#f4efe6;max-width:420px;line-height:1.1}</style></head><body>
<div class="top"><div class="k">MARISA STITCHES · MERCH</div><div class="h">i ♥ stitching</div><div class="s">a tiny embroidered doodle, small on the chest</div></div>
<div class="g">
${card('<b>dusty blue</b>cream + pink thread',shirt('#3f6f8f','#24465e','#335c77',ART(1),1),'#E9E3D8')}
${card('<b>emerald</b>cream + pink thread',shirt('#1d6a52','#0b3a2c','#155a45',ART(2),2),'#F6E3EA')}
${card('<b>oat</b>ink + pink thread',shirt('#EFE6D6','#CFC2AB','#DCCFB8',ARTDARK(3),3),'#E9E3D8')}
</div><div class="zoom"><div style="width:540px;height:345px">${ART(9)}</div><div class="t">up close: spool, needle,<br>gold scissors + one<br>little emerald ✦</div></div></body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1800,height:1200}});await p.setContent(sheet);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);await p.screenshot({path:D+'/Stitches_i-heart-stitching_mockups.png',fullPage:true});
for(const [n,a] of [['light-thread',ART(21)],['dark-thread',ARTDARK(22)]]){await p.setViewportSize({width:1050,height:671});await p.setContent(`<html><head>${FONTS}</head><body style="margin:0;background:transparent"><div style="width:1050px;height:671px">${a}</div></body></html>`);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);await p.screenshot({path:D+`/doodle/EMBROIDERY_i-heart-stitching_${n}_3.5x2.25in.png`,omitBackground:true});}
await b.close();})();
