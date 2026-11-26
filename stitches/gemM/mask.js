// Big black-on-white "M" masks in two fonts.
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1400,height:1400}});
for(const [name,font,size] of [['script',"400 230px 'Great Vibes'",230],['serif',"400 820px 'DM Serif Display'",820]]){
  await p.setContent(`<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=DM+Serif+Display&display=swap" rel="stylesheet">
  <body style="margin:0;background:#fff"><div id="t" style="display:inline-block;padding:40px 60px;font:${font};line-height:1;color:#000">M</div></body>`);
  await p.waitForTimeout(1500);
  await (await p.$('#t')).screenshot({path:__dirname+'/mask_'+name+'.png'});
}
await b.close();})();
