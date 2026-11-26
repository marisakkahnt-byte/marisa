const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:4000,height:1200}});
await p.goto('file://'+__dirname+'/export.html');await p.waitForTimeout(600);
for(const el of await p.$$('.g')){const n=await el.getAttribute('data-n');await el.screenshot({path:__dirname+'/png/'+n+'.png',omitBackground:true});}
await b.close();})();
