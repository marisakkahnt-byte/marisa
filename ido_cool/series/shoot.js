const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.goto('file://'+path.join(__dirname,'series.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
fs.mkdirSync(path.join(__dirname,'out'),{recursive:true});
for(const id of await p.$$eval('section',a=>a.map(s=>s.id))) await p.locator('#'+id).screenshot({path:path.join(__dirname,'out','IDo_series_'+id+'.jpg'),type:'jpeg',quality:90});
await b.close();})();
