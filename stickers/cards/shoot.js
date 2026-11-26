const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:4100,height:2000}});
await p.goto('file://'+__dirname+'/cards.html');await p.waitForTimeout(2500);
for(const el of await p.$$('.c')){const n=await el.getAttribute('data-n');await el.screenshot({path:__dirname+'/'+n+'.png'});}
await b.close();})();
