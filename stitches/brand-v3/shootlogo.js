const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1400,height:800},deviceScaleFactor:2});
await p.goto('file://'+path.join(__dirname,'logo.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(900);
for(const id of fs.readFileSync(path.join(__dirname,'ids.txt'),'utf8').trim().split(' '))
 await p.locator('#'+id).screenshot({path:path.join(__dirname,'logo','MarisaStitches_Logo_'+id+'.png'),omitBackground:id.includes('transparent')});
await b.close();})();
