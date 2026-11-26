const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:5600,height:2400}});
await p.goto('file://'+__dirname+'/phrases.html');await p.waitForTimeout(2000);
for(const el of await p.$$('.c')){const n=await el.getAttribute('data-n');await el.screenshot({path:__dirname+'/'+n+'.png'});}
await p.addStyleTag({content:'body{background:transparent!important}'});
for(const el of await p.$$('.st')){const n=await el.getAttribute('data-n');const bb=await el.boundingBox();
 await p.screenshot({path:__dirname+'/'+n+'.png',omitBackground:true,clip:{x:bb.x-50,y:bb.y-50,width:bb.width+100,height:bb.height+100}});}
await b.close();})();
