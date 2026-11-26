const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:5400,height:3000}});
await p.goto('file://'+__dirname+'/cool.html');await p.waitForTimeout(2500);
for(const el of await p.$$('.c')){const n=await el.getAttribute('data-n');await el.screenshot({path:__dirname+'/'+n+'.png',timeout:120000});}
await p.addStyleTag({content:'body{background:transparent!important}'});
for(const el of await p.$$('.st')){const n=await el.getAttribute('data-n');const bb=await el.boundingBox();
 await p.screenshot({path:__dirname+'/'+n+'.png',omitBackground:true,clip:{x:bb.x-60,y:bb.y-60,width:bb.width+120,height:bb.height+120},timeout:120000});}
await b.close();})();
