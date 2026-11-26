const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:8000,height:6000}});
await p.goto('file://'+__dirname+'/hl_sets.html');await p.waitForTimeout(2500);
fs.mkdirSync(__dirname+'/hl',{recursive:true});
for(const el of await p.$$('.s')){const n=await el.getAttribute('data-n');await el.screenshot({path:__dirname+'/hl/ST_story_'+n+'.jpg',type:'jpeg',quality:90,timeout:120000});}
await b.close();})();
