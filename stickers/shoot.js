const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:2});
await p.goto('file://'+__dirname+'/sheet.html');await p.waitForTimeout(2500);
fs.mkdirSync(__dirname+'/out/I-Do',{recursive:true});fs.mkdirSync(__dirname+'/out/Stitches',{recursive:true});
await (await p.$('#ido')).screenshot({path:__dirname+'/out/IDo_Sticker-Sheet.png'});
await (await p.$('#st')).screenshot({path:__dirname+'/out/Stitches_Sticker-Sheet.png'});
await p.addStyleTag({content:'.lbl{display:none}.sheet{background:transparent!important}body{background:transparent}'});
for(const el of await p.$$('.st')){const n=await el.getAttribute('data-n');await el.scrollIntoViewIfNeeded();const bb=await el.boundingBox();
await p.screenshot({path:__dirname+'/out/'+(n.startsWith('ido')?'I-Do':'Stitches')+'/'+n+'.png',omitBackground:true,clip:{x:bb.x-30,y:bb.y-30,width:bb.width+60,height:bb.height+60}});}
await b.close();})();
