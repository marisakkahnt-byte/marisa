const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+path.join(__dirname,'stories.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
const ids=await p.$$eval('section',a=>a.map(s=>[s.id,s.dataset.f,s.dataset.n]));
for(const [id,f,n] of ids){const dir=path.join(__dirname,'stories',f);fs.mkdirSync(dir,{recursive:true});
 const over=await p.$eval('#'+id,s=>{const i=s.querySelector('.in');return i.scrollHeight>1500});if(over)console.log('TALL',f,n);
 await p.locator('#'+id).screenshot({path:path.join(dir,n+'.jpg'),type:'jpeg',quality:90});}
await b.close();})();
