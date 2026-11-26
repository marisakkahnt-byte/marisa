// Small chunky text masks for needlepoint (rendered tiny so each pixel = one stitch).
const {chromium}=require('playwright');
const jobs=JSON.parse(process.argv[2]);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:800,height:800}});
for(const [name,text] of jobs){
  await p.setContent(`<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap" rel="stylesheet">
  <body style="margin:0;background:#fff"><div id="t" style="display:inline-block;padding:2px 3px;font:600 120px/0.98 Fredoka;color:#000;white-space:pre;text-align:center;-webkit-font-smoothing:none">${text}</div></body>`);
  await p.waitForTimeout(1200);
  await (await p.$('#t')).screenshot({path:__dirname+'/np_'+name+'.png'});
}
await b.close();})();
