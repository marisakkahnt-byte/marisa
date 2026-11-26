const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:6000,height:4200}});
await p.goto('file://'+__dirname+'/process.html');await p.waitForTimeout(2500);
for(const el of await p.$$('.s')){const n=await el.getAttribute('data-n');await el.screenshot({path:__dirname+'/'+n+'.jpg',type:'jpeg',quality:90,timeout:120000});}
await b.close();})();
