const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.goto('file://'+path.join(__dirname,'me_posts.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
for(const id of ['hello','loved']) await p.locator('#'+id).screenshot({path:path.join(__dirname,'out','IDo_me_'+id+'.jpg'),type:'jpeg',quality:90});
await b.close();})();
