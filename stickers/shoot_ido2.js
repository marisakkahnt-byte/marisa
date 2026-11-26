const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:2});
await p.goto('file://'+__dirname+'/ido_v2.html');await p.waitForTimeout(2500);
const out=__dirname+'/out/I-Do_v2';fs.mkdirSync(out,{recursive:true});
await (await p.$('#ido2')).screenshot({path:__dirname+'/out/IDo_Sticker-Sheet_v2.png'});
await p.addStyleTag({content:'.lbl{display:none}.sheet{background:transparent!important}body{background:transparent}'});
for(const el of await p.$$('.st')){const n=await el.getAttribute('data-n');await el.scrollIntoViewIfNeeded();const bb=await el.boundingBox();
await p.screenshot({path:out+'/'+n+'.png',omitBackground:true,clip:{x:bb.x-30,y:bb.y-30,width:bb.width+60,height:bb.height+60}});}
await b.close();})();
