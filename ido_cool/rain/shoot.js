const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+path.join(__dirname,'rain.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);
fs.mkdirSync(path.join(__dirname,'out'),{recursive:true});
for(const id of await p.$$eval('section',a=>a.map(s=>s.id))) await p.locator('#'+id).screenshot({path:path.join(__dirname,'out','IDo_'+id+'.jpg'),type:'jpeg',quality:90});
await b.close();})();
