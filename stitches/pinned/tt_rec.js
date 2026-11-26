// Record each text TikTok to MP4: node tt_rec.js tips tuesday toast vowline hobbyist
const { chromium } = require('playwright');
const path = require('path'); const fs = require('fs'); const { execFileSync } = require('child_process');
const NAMES = { tips: 'TikTok_IDo_Officiant-Notes', tuesday: 'TikTok_IDo_Write-About-A-Tuesday', toast: 'TikTok_IDo_Toast-Donts', vowline: 'TikTok_IDo_Vow-Line', hobbyist: 'TikTok_Stitches_Serial-Hobbyist', engaged: 'TikTok_IDo_Just-Engaged', friend: 'TikTok_IDo_Friend-Officiant-Needs', whyme: 'TikTok_IDo_When-I-Officiate', reopen: 'TikTok_Stitches_Orders-Open' };
(async () => {
  const b = await chromium.launch();
  for (const v of process.argv.slice(2)) {
    const dir = path.join(__dirname, 'raw_' + v); fs.rmSync(dir, { recursive: true, force: true });
    const ctx = await b.newContext({ viewport: { width: 1080, height: 1920 }, recordVideo: { dir, size: { width: 1080, height: 1920 } } });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto('file://' + path.join(__dirname, 'tt_engine.html') + '?v=' + v);
    const total = await p.evaluate(() => window.TOTAL);
    await p.waitForTimeout((total + 1.2) * 1000);
    await ctx.close();
    const webm = path.join(dir, fs.readdirSync(dir)[0]); const out = path.join(__dirname, NAMES[v] + '.mp4');
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', '0.5', '-t', String(total + 0.3), '-i', webm, '-vf', 'fps=30', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '21', '-movflags', '+faststart', out]);
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(v, total.toFixed(1) + 's', errs.length ? errs : 'ok');
  }
  await b.close();
})();
