const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:2700,height:1900}});
await p.goto('file://'+__dirname+'/whimsy.html');await p.waitForTimeout(2500);
for(const el of await p.$$('.c')){const n=await el.getAttribute('data-n');await el.screenshot({path:__dirname+'/'+n+'.png',timeout:120000});}
await b.close();})();
