// Preload with `node -r ./_brand/capinject.js shoot.js`.
// Applies I Do by Marisa capitalization (sentence starts, "I", proper nouns) to every page
// right before each screenshot, without touching the source HTML.
const pw = require('playwright');
const FIX = `(() => {
  const PROPER = ['january','february','march','april','june','july','august','september','october','november','december',
    'monday','tuesday','wednesday','thursday','friday','saturday','sunday','thanksgiving','christmas','detroit','michigan',
    'instagram','google','muji','longchamp','english','harry','chuck','taylors','marisa','nora','sam','lisa','marie','anthony',
    'kenz','pez','gerard','alyssa','amber','ryan','avance','alex','kristen','john','catherine','david','heather','brandon','hannah','nick','gabrielle','darian'];
  const SKIP = new Set(['SCRIPT','STYLE','svg','SVG','TITLE','NOSCRIPT']);
  const isBlock = el => { const d = getComputedStyle(el).display; return !(d === 'inline' || d === 'inline-block' && el.children.length === 0 && false); };
  const blockOf = n => { let e = n.parentElement; while (e && getComputedStyle(e).display.startsWith('inline')) e = e.parentElement; return e; };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = []; let t; while ((t = walker.nextNode())) { if (t.parentElement && !SKIP.has(t.parentElement.tagName) && t.nodeValue.trim()) nodes.push(t); }
  const state = new Map();
  for (const n of nodes) {
    const blk = blockOf(n); let atStart = state.has(blk) ? state.get(blk) : true;
    let s = n.nodeValue;
    s = s.split(/(\\s+)/).map(tok => {
      if (/@|\\.com|https?:|#/.test(tok)) return tok;
      tok = tok.replace(/(^|[^A-Za-z])i(?=$|[\\s'’.,!?:;)\\-—])/g, (m, p) => p + 'I');
      const bare = tok.toLowerCase().replace(/[^a-z]/g, '');
      if (PROPER.includes(bare)) tok = tok.replace(/^([^A-Za-z]*)([a-z])/, (m, a, c) => a + c.toUpperCase());
      return tok;
    }).join('');
    let out = '';
    for (let k = 0; k < s.length; k++) {
      const ch = s[k];
      if (atStart && /[a-z]/.test(ch)) { const word = s.slice(k).split(/\\s/)[0]; if (/\\.(com|net|org|co)\\b|@/.test(word)) { out += ch; atStart = false; continue; } const prev = out.slice(-1); if (prev === '@' || prev === '#' || prev === '.') { out += ch; atStart = false; continue; } out += ch.toUpperCase(); atStart = false; continue; }
      if (/[A-Za-z0-9]/.test(ch)) atStart = false;
      out += ch;
      if (/[.!?]/.test(ch) && (k + 1 >= s.length || /[\\s"”’)]/.test(s[k + 1]))) atStart = true;
    }
    n.nodeValue = out; state.set(blk, atStart);
  }
})()`;
const origLaunch = pw.chromium.launch.bind(pw.chromium);
pw.chromium.launch = async (...a) => {
  const b = await origLaunch(...a);
  const origNew = b.newPage.bind(b);
  b.newPage = async (...o) => {
    const p = await origNew(...o);
    for (const m of ['screenshot']) {
      const orig = p[m].bind(p);
      p[m] = async (...x) => { try { await p.evaluate(FIX); } catch (e) {} return orig(...x); };
    }
    const origLoc = p.locator.bind(p);
    p.locator = (...x) => { const l = origLoc(...x); const os = l.screenshot.bind(l); l.screenshot = async (...y) => { try { await p.evaluate(FIX); } catch (e) {} return os(...y); }; return l; };
    const orig$$ = p.$$.bind(p);
    p.$$ = async (...x) => { const els = await orig$$(...x); for (const el of els) { const os = el.screenshot.bind(el); el.screenshot = async (...y) => { try { await p.evaluate(FIX); } catch (e) {} return os(...y); }; } return els; };
    const orig$ = p.$.bind(p);
    p.$ = async (...x) => { const el = await orig$(...x); if (el) { const os = el.screenshot.bind(el); el.screenshot = async (...y) => { try { await p.evaluate(FIX); } catch (e) {} return os(...y); }; } return el; };
    return p;
  };
  return b;
};
