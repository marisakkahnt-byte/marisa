const { chromium } = require('playwright');const path=require('path');const fs=require('fs');const {execFileSync}=require('child_process');
const NAMES={girlmath:'TikTok_IDo_Girl-Math',ick:'TikTok_IDo_The-Ick',delulu:'TikTok_IDo_Delulu',pov:'TikTok_IDo_POV-Bestie-Officiant'};
(async()=>{const b=await chromium.launch();
for(const v of process.argv.slice(2)){const dir=path.join(__dirname,'raw_'+v);fs.rmSync(dir,{recursive:true,force:true});
 const ctx=await b.newContext({viewport:{width:1080,height:1920},recordVideo:{dir,size:{width:1080,height:1920}}});const p=await ctx.newPage();
 await p.goto('file://'+path.join(__dirname,'genz.html')+'?v='+v);await p.evaluate(()=>document.fonts.ready);
 const total=await p.evaluate(()=>window.TOTAL);await p.waitForTimeout((total+1.2)*1000);await ctx.close();
 const webm=path.join(dir,fs.readdirSync(dir)[0]);const out=path.join(__dirname,'out',NAMES[v]+'.mp4');
 execFileSync('ffmpeg',['-v','error','-y','-ss','0.6','-t',String(total+0.2),'-i',webm,'-vf','fps=30','-c:v','libx264','-pix_fmt','yuv420p','-crf','21','-movflags','+faststart',out]);
 fs.rmSync(dir,{recursive:true,force:true});console.log(v,total.toFixed(1)+'s');}
await b.close();})();
