const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const b=await chromium.launch();const dir=path.join(__dirname,'raw');fs.rmSync(dir,{recursive:true,force:true});
const ctx=await b.newContext({viewport:{width:1080,height:1920},recordVideo:{dir,size:{width:1080,height:1920}}});
const p=await ctx.newPage();await p.goto('file://'+path.join(__dirname,'tiktok_ido.html'));await p.waitForTimeout(16500);await ctx.close();await b.close();})();
