const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1080}});
await p.goto('file://'+path.join(__dirname,'p.html'));await p.waitForTimeout(900);
for(const id of fs.readFileSync(path.join(__dirname,'ids.txt'),'utf8').trim().split(' '))await p.locator('#'+id+' .p').screenshot({path:path.join(__dirname,id+'.jpg'),type:'jpeg',quality:92});
await b.close();})();
