const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1800,height:1300},deviceScaleFactor:2});
await p.goto('file://'+__dirname+'/lockup.html');await p.waitForTimeout(1800);
await (await p.$('#b')).screenshot({path:__dirname+'/GemM_lockups.jpg',type:'jpeg',quality:90});
await p.addStyleTag({content:'.t{background:transparent!important}#b{background:transparent!important}'});
for(const el of await p.$$('.lockup')){const n=await el.getAttribute('data-n');await el.screenshot({path:__dirname+'/'+n+'.png',omitBackground:true});}
await b.close();})();
