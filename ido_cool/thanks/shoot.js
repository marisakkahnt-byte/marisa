const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();
for(const id of ['ido','idostory','st','ststory']){const tall=id.includes('story');const p=await b.newPage({viewport:{width:1080,height:tall?1920:1350}});
await p.goto('file://'+path.join(__dirname,'t.html'));await p.evaluate(i=>{document.querySelectorAll('section').forEach(s=>{if(s.id!==i)s.remove()})},id);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
await p.locator('#'+id).screenshot({path:path.join(__dirname,'TG_'+id+'.jpg'),type:'jpeg',quality:90});await p.close();}
await b.close();})();
