// Renders script phrases as black-on-white masks for the rhinestone builder.
const {chromium}=require('playwright');
const phrases=JSON.parse(process.argv[2]);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:2400,height:1200}});
for(const [name,text,size] of phrases){
  await p.setContent(`<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
  <body style="margin:0;background:#fff"><div id="t" style="display:inline-block;padding:30px 40px;font:400 ${size}px 'Great Vibes';color:#000;white-space:pre;line-height:.92;text-align:center">${text}</div></body>`);
  await p.waitForTimeout(1500);
  await (await p.$('#t')).screenshot({path:__dirname+'/mask_'+name+'.png'});
}
await b.close();})();
