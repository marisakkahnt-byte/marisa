const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:8000,height:6000}});
await p.goto('file://'+__dirname+'/ido_hl.html');await p.waitForTimeout(2000);
fs.mkdirSync(__dirname+'/ido_stories',{recursive:true});
for(const el of await p.$$('.s')){const n=await el.getAttribute('data-n');await el.screenshot({path:__dirname+'/ido_stories/IDo_story_'+n+'.jpg',type:'jpeg',quality:90});}
await b.close();})();
