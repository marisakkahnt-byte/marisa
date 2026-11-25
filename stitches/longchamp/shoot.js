const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.goto('file://'+path.join(__dirname,'p.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(900);
await p.locator('#lc').screenshot({path:path.join(__dirname,'ST_longchamp.jpg'),type:'jpeg',quality:90});await b.close();})();
