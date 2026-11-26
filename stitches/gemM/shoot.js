const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:1800,height:1200}});
await p.goto('file://'+__dirname+'/board.html');await p.waitForSelector('body[data-ready]',{timeout:20000});await p.waitForTimeout(2000);
await (await p.$('#b')).screenshot({path:__dirname+'/Gem-M_options.jpg',type:'jpeg',quality:90,timeout:120000});
await b.close();})();
