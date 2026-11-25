const {chromium}=require('playwright');const path=require('path');const fs=require('fs');const {execFileSync}=require('child_process');
(async()=>{const b=await chromium.launch();
for(const [o,w,h,name] of [['w',1920,1080,'IDo-by-Marisa_Brand-Film_16x9'],['v',1080,1920,'IDo-by-Marisa_Brand-Film_9x16']].filter(x=>!process.argv[2]||x[0]==process.argv[2])){
 const dir=path.join(__dirname,'raw_'+o);fs.rmSync(dir,{recursive:true,force:true});
 const ctx=await b.newContext({viewport:{width:w,height:h},recordVideo:{dir,size:{width:w,height:h}}});const p=await ctx.newPage();
 await p.goto('file://'+path.join(__dirname,'film.html')+'?o='+o);await p.evaluate(()=>document.fonts.ready);
 await p.waitForTimeout((16.4+1.5)*1000);await ctx.close();
 const webm=path.join(dir,fs.readdirSync(dir)[0]);fs.mkdirSync(path.join(__dirname,'out'),{recursive:true});
 const mp4=path.join(__dirname,'out',name+'.mp4');
 execFileSync('ffmpeg',['-v','error','-y','-ss','0.7','-t','16.4','-i',webm,'-vf','fps=30','-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-preset','slow','-movflags','+faststart','-an',mp4]);
 execFileSync('ffmpeg',['-v','error','-y','-i',mp4,'-c:v','libvpx-vp9','-b:v','0','-crf','36','-deadline','realtime','-cpu-used','8','-an',mp4.replace('.mp4','.webm')]);
 execFileSync('ffmpeg',['-v','error','-y','-ss','15.5','-i',mp4,'-frames:v','1',mp4.replace('.mp4','_poster.jpg')]);
 fs.rmSync(dir,{recursive:true,force:true});console.log(name,'ok');}
await b.close();})();
