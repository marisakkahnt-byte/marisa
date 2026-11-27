const {chromium}=require('playwright');const fs=require('fs');const D=__dirname;
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const [n,w,h,html] of JSON.parse(fs.readFileSync(D+'/files_v3.json'))){await p.setViewportSize({width:w,height:h});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);await p.screenshot({path:D+'/files_v3/'+n+'.png',omitBackground:true});}
const m=await b.newPage({viewport:{width:1800,height:1000}});await m.goto('file://'+D+'/sheet_v3.html');await m.evaluate(()=>document.fonts.ready);await m.waitForTimeout(900);await m.screenshot({path:D+'/Stitches_Merch_v3-phrases_mockups.png',fullPage:true});await b.close();})();
