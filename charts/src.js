// Render each chart design small (1 px = 1 stitch) for pixelizing.
const {chromium}=require('playwright');
const F='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Nanum+Pen+Script&display=swap">';
const heart=(x,y,s,c)=>`<path transform="translate(${x} ${y}) scale(${s})" d="M0 8 C0 -4 16 -4 16 8 C16 -4 32 -4 32 8 C32 22 16 30 16 38 C16 30 0 22 0 8Z" fill="${c}"/>`;
const D={
 busy:[110,62,`<svg preserveAspectRatio="none" viewBox="0 0 900 500" width="1100" height="620" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="500" fill="#F3EBDC"/>${heart(380,40,3.6,'#E8608F')}<text x="450" y="420" text-anchor="middle" font-family="DM Serif Display" font-size="250" fill="#1F1D24" stroke="#1F1D24" stroke-width="7">busy</text></svg>`],
 'stitch-please':[150,62,`<svg preserveAspectRatio="none" viewBox="0 0 1100 460" width="1500" height="620" xmlns="http://www.w3.org/2000/svg"><rect width="1100" height="460" fill="#0E4A38"/><text x="550" y="290" text-anchor="middle" font-family="DM Serif Display" font-size="150" fill="#F3EBDC" stroke="#F3EBDC" stroke-width="5">stitch, please.</text><path d="M240 350 Q550 410 860 350" stroke="#E8608F" stroke-width="22" fill="none"/></svg>`],
 'gem-heart':[60,55,`<svg preserveAspectRatio="none" viewBox="0 0 500 460" width="600" height="550" xmlns="http://www.w3.org/2000/svg"><rect width="500" height="460" fill="#F3EBDC"/>
 <g transform="translate(250 230)"><path d="M0 170 L-200 -20 L-150 -140 L-60 -160 L0 -100 L60 -160 L150 -140 L200 -20Z" fill="#E8608F"/>
 <path d="M0 170 L-200 -20 L-90 -40Z" fill="#B8406A"/><path d="M0 170 L200 -20 L90 -40Z" fill="#F6A9C3"/><path d="M-90 -40 L0 -100 L90 -40 L0 40Z" fill="#FBD3E1"/>
 <path d="M-150 -140 L-60 -160 L-90 -40Z" fill="#F6A9C3"/><path d="M150 -140 L60 -160 L90 -40Z" fill="#B8406A"/><path d="M-200 -20 L-150 -140 L-90 -40Z" fill="#D04C7C"/><path d="M200 -20 L150 -140 L90 -40Z" fill="#E8608F"/>
 <path d="M-40 -110 L-10 -95 L-30 -70Z" fill="#FFFFFF"/></g></svg>`],
};
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const [k,[w,h,svg]] of Object.entries(D)){const W=w*10,H=h*10;await p.setViewportSize({width:W,height:H});await p.setContent(`<html><head>${F}</head><body style="margin:0"><div style="line-height:0">${svg.replace("<svg ","<svg style=\"display:block\" ")}</div></body></html>`);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);await p.screenshot({path:`${k}_hi.png`});}
await b.close();})();
