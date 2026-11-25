const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1200},deviceScaleFactor:2});
await p.goto('file://'+path.join(__dirname,'sig.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1000);
await p.locator('#sig').screenshot({path:path.join(__dirname,'IDo_email_signature.png')});
await p.setViewportSize({width:1440,height:1200});
const q=await b.newPage({viewport:{width:1440,height:1200},deviceScaleFactor:1});await q.goto('file://'+path.join(__dirname,'sig.html'));await q.evaluate(()=>document.fonts.ready);await q.waitForTimeout(1000);
await q.locator('#about').screenshot({path:path.join(__dirname,'IDo_website_about_preview.jpg'),type:'jpeg',quality:90});
await b.close();})();
