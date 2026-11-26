const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
await p.route(/behold|emailjs/,r=>r.abort());
await p.addInitScript(()=>{try{sessionStorage.setItem('ms-intro-seen','1')}catch(e){}});await p.goto('file://'+path.join(__dirname,process.argv[2]||'index.html'));await p.waitForTimeout(1500);
await p.evaluate(()=>{document.querySelectorAll('*').forEach(e=>{const s=getComputedStyle(e);if(s.opacity==='0')e.style.opacity=1;});document.querySelectorAll('.reveal,[data-reveal]').forEach(e=>e.classList.add('visible','in','is-visible'))});
await p.screenshot({path:path.join(__dirname,process.argv[3]||'now.png'),fullPage:true});
const p2=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});await p2.route(/behold|emailjs/,r=>r.abort());
await p2.goto('file://'+path.join(__dirname,process.argv[2]||'index.html'));await p2.waitForTimeout(1200);await p2.screenshot({path:path.join(__dirname,'m_'+(process.argv[3]||'now.png'))});
await b.close();})();
