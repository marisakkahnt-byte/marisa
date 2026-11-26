const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:1200},deviceScaleFactor:2});
await p.goto('file://'+__dirname+'/diva.html');await p.waitForTimeout(2500);
await (await p.$('#board')).screenshot({path:__dirname+'/Diva-Mode_direction.png',timeout:120000});
await b.close();})();
