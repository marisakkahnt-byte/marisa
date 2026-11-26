const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:3500,height:2900}});
await p.goto('file://'+__dirname+'/posts.html');await p.waitForTimeout(2500);
for(const el of await p.$$('.p')){const n=await el.getAttribute('data-n');await el.screenshot({path:__dirname+'/'+n+'.jpg',type:'jpeg',quality:92,timeout:120000});}
// transparent rosette stickers
await p.addStyleTag({content:'.p{background:transparent!important}.p>div:not(.r),.mark{display:none}body{background:transparent}'});
for(const el of await p.$$('.p[data-n^="ROS_"] .r')){const n=await el.evaluate(e=>e.parentElement.dataset.n);await el.screenshot({path:__dirname+'/'+n+'_sticker.png',omitBackground:true});}
await b.close();})();
