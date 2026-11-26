const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const b=await chromium.launch();
for(const [f,h] of [['posts.html',1350],['stories.html',1920]]){const p=await b.newPage({viewport:{width:1080,height:h}});
await p.goto('file://'+path.join(__dirname,f));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
for(const [id,g,n] of await p.$$eval('section',a=>a.map(s=>[s.id,s.dataset.f,s.dataset.n]))){const d=path.join(__dirname,'out');fs.mkdirSync(d,{recursive:true});
 await p.locator('#'+id).screenshot({path:path.join(d,'Stitches_'+g+'_'+n+'.jpg'),type:'jpeg',quality:90});}}
await b.close();})();
