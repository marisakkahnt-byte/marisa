const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.goto('file://'+path.join(__dirname,'pinned.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
for(const [id,f,n] of await p.$$eval('section',a=>a.map(s=>[s.id,s.dataset.f,s.dataset.n]))){const d=path.join(__dirname,'out',f);fs.mkdirSync(d,{recursive:true});
 const t=await p.$eval('#'+id,s=>s.querySelector('.in').scrollHeight);if(t>1150)console.log('TALL',f,n,t);
 await p.locator('#'+id).screenshot({path:path.join(d,f+'_'+n+'.jpg'),type:'jpeg',quality:90});}
await b.close();})();
