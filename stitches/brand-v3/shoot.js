const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:1200},deviceScaleFactor:1});
await p.goto('file://'+path.join(__dirname,'board.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);
await p.locator('#board').screenshot({path:path.join(__dirname,'Marisa-Stitches_Brand-Board_v3.png')});
await p.locator('#logoT').screenshot({path:path.join(__dirname,'MarisaStitches_Logo_v3_transparent.png'),omitBackground:true});
await p.locator('#logoD').screenshot({path:path.join(__dirname,'MarisaStitches_Logo_v3_ink.png')});
await b.close();})();
