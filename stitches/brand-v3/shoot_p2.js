const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:1200}});
await p.goto('file://'+path.join(__dirname,'page2.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
await p.locator('#board').screenshot({path:path.join(__dirname,'Marisa-Stitches_Brand-Board_v3_page2-diva.png')});
await b.close();})();
