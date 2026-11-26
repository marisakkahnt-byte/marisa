const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();
for(const id of ['c1','c2','c3','c4','c5','c6','endcard']){const p=await b.newPage({viewport:{width:1080,height:id=='endcard'?1920:1350}});
await p.goto('file://'+path.join(__dirname,'c.html'));await p.evaluate(i=>document.querySelectorAll('section').forEach(s=>{if(s.id!==i)s.remove()}),id);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(700);
await p.locator('#'+id).screenshot({path:path.join(__dirname,'ST_work_'+id+'.jpg'),type:'jpeg',quality:90});await p.close();}
const p=await b.newPage({viewport:{width:1080,height:1920}});await p.setContent('<html><head><link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@1&display=swap" rel="stylesheet"></head><body style="margin:0;background:transparent"><div style="width:1080px;height:1920px;position:relative"><p style="position:absolute;left:70px;right:70px;top:220px;margin:0;text-align:center;font:italic 400 84px/1.05 \'DM Serif Display\';color:#fff;text-shadow:0 3px 18px rgba(0,0,0,.6)">satisfying stitch-outs,<br>a little compilation</p></div></body></html>');
await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);await p.screenshot({path:path.join(__dirname,'title.png'),omitBackground:true});
await b.close();})();
