const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1700,height:1200}});
await p.goto('file://'+__dirname+'/board.html');await p.waitForTimeout(2500);
await (await p.$('#wrap')).screenshot({path:__dirname+'/Bulletin-Board_mockup.jpg',type:'jpeg',quality:90});
await b.close();})();
