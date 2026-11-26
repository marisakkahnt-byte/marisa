const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:1000},deviceScaleFactor:2});
await p.goto('file://'+__dirname+'/M_B_cutgem.html');await p.waitForTimeout(800);
await (await p.$('#m')).screenshot({path:__dirname+'/M_B_cutgem.png',omitBackground:true});await b.close();})();
