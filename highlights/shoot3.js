const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:7000,height:4000}});
await p.goto('file://'+__dirname+'/ido_covers3.html');await p.waitForTimeout(1200);
for(const el of await p.$$('.c')){const n=await el.getAttribute('data-n');await el.screenshot({path:__dirname+'/'+n+'.jpg',type:'jpeg',quality:92});}
await b.close();})();
