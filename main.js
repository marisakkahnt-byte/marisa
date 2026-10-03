// marisakahnt.com: a colourful storybook street with curtains, birds, a dog walk and house-number nav

(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var GROUND = 660;

  document.getElementById('year').textContent = new Date().getFullYear();

  function rand(min, max) { return min + Math.random() * (max - min); }
  function f(n) { return (+n).toFixed(1); }

  /* ---------- Hotel drawing (viewBox 1440 x 760) ---------- */

  // arched window with mullions; some get little pink curtains
  function win(cx, top, w, h, opts) {
    opts = opts || {};
    var r = w / 2, x0 = cx - r, x1 = cx + r, bottom = top + h;
    var cls = 'pane' + (Math.random() < 0.18 ? ' glow' : '');
    var s = '<path d="M' + f(x0) + ' ' + bottom + ' V' + f(top + r) + ' A' + f(r) + ' ' + f(r) + ' 0 0 1 ' + f(x1) + ' ' + f(top + r) + ' V' + bottom + ' Z" class="' + cls + ' ink" style="animation-delay:' + f(rand(0, 7)) + 's"/>' +
      '<path d="M' + cx + ' ' + (top + 2) + ' V' + bottom + ' M' + f(x0) + ' ' + f(top + r + (h - r) * 0.45) + ' H' + f(x1) + '" class="hair" pointer-events="none"/>';
    if (Math.random() < 0.45) {
      s += '<path d="M' + f(x0 + 2) + ' ' + f(top + r) + ' q' + f(r * 0.5) + ' ' + f(h * 0.25) + ' ' + f(r * 0.15) + ' ' + f(h * 0.55) + ' L' + f(x0 + 2) + ' ' + f(top + r + h * 0.55) + ' Z' +
        ' M' + f(x1 - 2) + ' ' + f(top + r) + ' q' + f(-r * 0.5) + ' ' + f(h * 0.25) + ' ' + f(-r * 0.15) + ' ' + f(h * 0.55) + ' L' + f(x1 - 2) + ' ' + f(top + r + h * 0.55) + ' Z" fill="#f2a7bb" class="hair" pointer-events="none"/>';
    }
    s += '<line x1="' + f(x0 - 5) + '" y1="' + (bottom + 2) + '" x2="' + f(x1 + 5) + '" y2="' + (bottom + 2) + '" class="line"/>';
    if (opts.flowers) {
      s += '<rect x="' + f(x0 - 3) + '" y="' + (bottom + 4) + '" width="' + f(w + 6) + '" height="9" fill="#c9d6bd" class="hair"/>';
      for (var i = 0; i < 5; i++) s += '<circle cx="' + f(x0 + 1 + i * (w / 4)) + '" cy="' + (bottom + 2) + '" r="3.4" fill="' + (i % 2 ? '#d9587b' : '#f2a7bb') + '" class="hair"/>';
    }
    if (opts.awning) {
      var aw = '';
      for (var j = 0; j < 4; j++) aw += '<path d="M' + f(x0 - 6 + j * (w + 12) / 4) + ' ' + (top - 2) + ' a' + f((w + 12) / 8) + ' ' + f((w + 12) / 8) + ' 0 0 0 ' + f((w + 12) / 4) + ' 0" fill="' + (j % 2 ? '#fff' : '#f2a7bb') + '" class="hair"/>';
      s += '<path d="M' + f(x0 - 6) + ' ' + (top - 2) + ' L' + f(x0 + 2) + ' ' + (top - 18) + ' H' + f(x1 - 2) + ' L' + f(x1 + 6) + ' ' + (top - 2) + ' Z" fill="#f2a7bb" class="line"/>' + aw;
    }
    return s;
  }

  function scallopRoof(x0, x1, yTop, yBot, inset, fill) {
    var s = '<path d="M' + x0 + ' ' + yBot + ' L' + (x0 + inset) + ' ' + yTop + ' H' + (x1 - inset) + ' L' + x1 + ' ' + yBot + ' Z" fill="' + (fill || '#d7dde4') + '" class="ink"/>';
    for (var y = yTop + 14; y < yBot - 4; y += 13) {
      var t = (y - yTop) / (yBot - yTop), left = x0 + inset * (1 - t) + 4, right = x1 - inset * (1 - t) - 4, d = 'M' + f(left) + ' ' + y;
      for (var x = left; x + 12 <= right; x += 12) d += ' a6 6 0 0 0 12 0';
      s += '<path d="' + d + '" class="hair" opacity=".55"/>';
    }
    return s;
  }

  function cone(cx, base, apex, half) {
    return '<path d="M' + (cx - half) + ' ' + base + ' Q' + cx + ' ' + (base - 20) + ' ' + cx + ' ' + apex + ' Q' + cx + ' ' + (base - 20) + ' ' + (cx + half) + ' ' + base + ' Z" fill="#d7dde4" class="ink"/>';
  }

  function flag(x, top, color) {
    return '<line x1="' + x + '" y1="' + (top + 46) + '" x2="' + x + '" y2="' + top + '" class="line"/>' +
      '<circle cx="' + x + '" cy="' + (top - 3) + '" r="3" fill="#c39a50" class="hair"/>' +
      '<path class="flag" d="M' + x + ' ' + (top + 2) + ' q16 -6 34 2 q-6 8 0 16 q-18 -6 -34 0 Z" fill="' + color + '" stroke="#1f1a1c" stroke-width="1.6" stroke-linejoin="round"/>';
  }

  function tree(cx, base, size) {
    var s = '<path d="M' + cx + ' ' + base + ' V' + (base - size * 0.9) + ' M' + cx + ' ' + (base - size * 0.6) + ' l-' + f(size * 0.18) + ' -' + f(size * 0.2) + '" class="line"/>';
    var puffs = [[0, -1.25, .55], [-.45, -.95, .42], [.45, -.95, .42], [-.25, -1.55, .38], [.28, -1.5, .36]];
    var outline = '', fill = '';
    puffs.forEach(function (p) {
      outline += '<circle cx="' + f(cx + p[0] * size) + '" cy="' + f(base + p[1] * size) + '" r="' + f(p[2] * size + 1.5) + '" fill="#1f1a1c"/>';
      fill += '<circle cx="' + f(cx + p[0] * size) + '" cy="' + f(base + p[1] * size) + '" r="' + f(p[2] * size) + '" fill="#dfe7d3"/>';
    });
    var dots = '';
    for (var i = 0; i < 6; i++) dots += '<circle cx="' + f(cx + rand(-.6, .6) * size) + '" cy="' + f(base + rand(-1.7, -.8) * size) + '" r="2.6" fill="#f2a7bb"/>';
    return s + outline + fill + dots;
  }

  function lampPost(x) {
    return '<path d="M' + x + ' ' + GROUND + ' V' + (GROUND - 96) + '" class="ink"/>' +
      '<path d="M' + (x - 9) + ' ' + GROUND + ' h18" class="ink"/>' +
      '<circle cx="' + x + '" cy="' + (GROUND - 108) + '" r="20" fill="#fff3c4" opacity=".5" class="lamp"/>' +
      '<circle cx="' + x + '" cy="' + (GROUND - 108) + '" r="11" fill="#fff6dc" class="ink"/>' +
      '<path d="M' + (x - 6) + ' ' + (GROUND - 120) + ' h12" class="line"/>';
  }

  function topiary(x) {
    return '<path d="M' + (x - 14) + ' ' + GROUND + ' L' + (x - 11) + ' ' + (GROUND - 22) + ' H' + (x + 11) + ' L' + (x + 14) + ' ' + GROUND + ' Z" fill="#fffaf3" class="ink"/>' +
      '<path d="M' + x + ' ' + (GROUND - 22) + ' V' + (GROUND - 30) + '" class="line"/>' +
      '<path d="M' + (x - 18) + ' ' + (GROUND - 30) + ' Q' + x + ' ' + (GROUND - 40) + ' ' + x + ' ' + (GROUND - 96) + ' Q' + x + ' ' + (GROUND - 40) + ' ' + (x + 18) + ' ' + (GROUND - 30) + ' Z" fill="#c9d6bd" class="ink"/>';
  }

  function cloud(x, y, scale, dur, delay) {
    return '<g class="cloud" style="animation-duration:' + dur + 's;animation-delay:' + delay + 's"><path transform="translate(' + x + ' ' + y + ') scale(' + scale + ')" ' +
      'd="M0 20 q-2 -16 16 -16 q6 -14 24 -8 q14 -10 26 4 q16 0 14 16 Z" fill="#fffdf9" class="line"/></g>';
  }

  // Brand colours for the two neighbouring businesses. Swap these for the real brand palettes.
  var STITCHES = { wall: '#cfe4d6', trim: '#6f9c80', roof: '#a9cdb6', accent: '#f2a7bb' };
  var IDO = { wall: '#f8eedc', trim: '#c39a50', roof: '#e8b9c6', accent: '#d9587b' };
  var CLOCK = [140, 214];

  function plaque(cx, y, w, text, color) {
    return '<g class="plaque"><rect x="' + (cx - w / 2) + '" y="' + y + '" width="' + w + '" height="34" rx="17" fill="#fffdf9" class="ink"/>' +
      '<rect x="' + (cx - w / 2 + 4) + '" y="' + (y + 4) + '" width="' + (w - 8) + '" height="26" rx="13" fill="none" stroke="' + color + '" stroke-width="1"/>' +
      '<text x="' + cx + '" y="' + (y + 23) + '" text-anchor="middle" class="plaque-text" style="fill:' + color + '">' + text + '</text></g>';
  }

  function archDoor(cx, w, top, fill) {
    var r = w / 2;
    return '<path d="M' + (cx - r) + ' ' + GROUND + ' V' + (top + r) + ' A' + r + ' ' + r + ' 0 0 1 ' + (cx + r) + ' ' + (top + r) + ' V' + GROUND + ' Z" fill="' + fill + '" class="ink"/>' +
      '<path d="M' + (cx - r + 7) + ' ' + (GROUND - 6) + ' V' + (top + r + 4) + ' A' + (r - 7) + ' ' + (r - 7) + ' 0 0 1 ' + (cx + r - 7) + ' ' + (top + r + 4) + ' V' + (GROUND - 6) + ' Z" fill="none" class="hair"/>' +
      '<circle cx="' + (cx + r - 11) + '" cy="' + (top + (GROUND - top) * 0.6) + '" r="3" fill="#c39a50" class="hair"/>';
  }

  function cornice(x, w, y, fill) {
    return '<rect x="' + (x - 8) + '" y="' + (y - 6) + '" width="' + (w + 16) + '" height="12" rx="4" fill="' + (fill || '#fffdf9') + '" class="ink"/>';
  }

  // No. 2: the office, a powder-blue townhouse with a clock in the dormer
  function office() {
    var x = 30, w = 220, top = 250, s = '';
    s += scallopRoof(18, 262, 180, top, 26, '#dde3ee');
    [80, 200].forEach(function (dx) { s += '<path d="M' + (dx - 18) + ' 236 V210 L' + dx + ' 192 L' + (dx + 18) + ' 210 V236 Z" fill="#bfd6ea" class="ink"/>' + win(dx, 210, 18, 24); });
    s += '<path d="M116 240 V200 A24 24 0 0 1 164 200 V240 Z" fill="#bfd6ea" class="ink"/>' +
      '<circle cx="140" cy="214" r="17" fill="#fffdf9" class="ink"/>' +
      '<line id="hourHand" x1="140" y1="214" x2="140" y2="205" class="line" style="stroke-width:2.4"/>' +
      '<line id="minuteHand" x1="140" y1="214" x2="140" y2="201" class="line"/>' +
      '<circle cx="140" cy="214" r="2" fill="#d9587b"/>';
    s += flag(46, 132, '#d9587b');
    s += '<rect x="' + x + '" y="' + top + '" width="' + w + '" height="' + (GROUND - top) + '" fill="#bfd6ea" class="ink"/>' + cornice(x, w, top);
    [272, 362, 452].forEach(function (y, i) { [75, 140, 205].forEach(function (cx) { s += win(cx, y, 34, 56, { flowers: i === 1 }); }); });
    s += plaque(140, 528, 150, 'the office', '#3f5f87');
    s += win(72, 592, 40, 60, { awning: true }) + win(208, 592, 40, 60, { awning: true }) + archDoor(140, 42, 580, '#3f5f87');
    return '<a href="#office" class="bld-link" aria-label="No. 2, the office: my professional side">' + s + '</a>';
  }

  // No. 3: Marisa Stitches, with an embroidery-hoop window and spools in the shop window
  function stitches() {
    var x = 268, w = 190, top = 320, s = '';
    s += '<rect x="' + x + '" y="' + top + '" width="' + w + '" height="' + (GROUND - top) + '" fill="' + STITCHES.wall + '" class="ink"/>' +
      '<path d="M' + (x - 12) + ' ' + top + ' L363 206 L' + (x + w + 12) + ' ' + top + ' Z" fill="' + STITCHES.roof + '" class="ink"/>' +
      '<circle cx="363" cy="276" r="25" fill="#fffdf9" class="ink"/>' +
      '<circle cx="363" cy="276" r="19" fill="none" stroke="#c39a50" stroke-width="3"/>' +
      '<rect x="384" y="252" width="8" height="10" rx="2" fill="#c39a50" class="hair"/>';
    var xs = '';
    for (var gx = -9; gx <= 9; gx += 6) for (var gy = -9; gy <= 9; gy += 6) {
      if (Math.abs(gx) + Math.abs(gy) > 13) continue;
      xs += 'M' + (360 + gx) + ' ' + (273 + gy) + ' l5 5 m0 -5 l-5 5 ';
    }
    s += '<path d="' + xs + '" stroke="' + STITCHES.accent + '" stroke-width="1.6" stroke-linecap="round"/>' + cornice(x, w, top, '#fffdf9');
    [342, 428].forEach(function (y, i) { [318, 408].forEach(function (cx) { s += win(cx, y, 38, 56, { flowers: i === 0 }); }); });
    s += plaque(363, 508, 170, 'marisa stitches', STITCHES.trim);
    // shop window with spools of thread
    s += awningRow(280, 92, 556, STITCHES.accent) +
      '<rect x="284" y="572" width="84" height="74" rx="4" fill="#fffaf3" class="ink"/>';
    ['#f2a7bb', '#6f9c80', '#c39a50', '#bfd6ea'].forEach(function (c, i) {
      var sx = 294 + i * 18;
      s += '<rect x="' + sx + '" y="612" width="14" height="4" fill="#fffdf9" class="hair"/><rect x="' + (sx + 2) + '" y="616" width="10" height="20" fill="' + c + '" class="hair"/><rect x="' + sx + '" y="636" width="14" height="4" fill="#fffdf9" class="hair"/>';
    });
    s += '<path d="M292 600 q20 -18 40 0 t36 -4" fill="none" stroke="' + STITCHES.accent + '" stroke-width="1.6" stroke-dasharray="3 3"/>';
    s += archDoor(412, 40, 584, STITCHES.trim);
    return '<a href="#stitches" class="bld-link" aria-label="No. 3, Marisa Stitches">' + s + '</a>';
  }

  // scalloped striped awning
  function awningRow(x, w, y, color) {
    var n = Math.max(3, Math.round(w / 22)), step = w / n, sc = '';
    for (var i = 0; i < n; i++) sc += '<path d="M' + f(x + i * step) + ' ' + (y + 14) + ' a' + f(step / 2) + ' ' + f(step / 2) + ' 0 0 0 ' + f(step) + ' 0" fill="' + (i % 2 ? '#fff' : color) + '" class="hair"/>';
    var stripes = '';
    for (var j = 0; j < n; j++) stripes += '<rect x="' + f(x + j * step) + '" y="' + y + '" width="' + f(step / 2) + '" height="14" fill="' + color + '"/>';
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="14" fill="#fff"/>' + stripes +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="14" fill="none" class="line"/>' + sc;
  }

  // No. 1: the pink wisteria shop in the middle of the street
  function shop() {
    var s = '<rect x="476" y="232" width="488" height="' + (GROUND - 232) + '" fill="#f7c2d1" class="ink"/>' +
      '<rect x="460" y="214" width="520" height="24" rx="8" fill="#fffdf9" class="ink"/>' +
      '<path d="M470 214 Q720 150 970 214" fill="#fbe1e8" class="ink"/>' +
      '<rect x="540" y="262" width="360" height="72" rx="36" fill="#fffdf9" class="ink"/>' +
      '<rect x="547" y="269" width="346" height="58" rx="29" fill="none" stroke="#c39a50" stroke-width="1.2"/>' +
      '<text x="720" y="310" text-anchor="middle" class="shop-sign">Marisa Kahnt</text>';
    [520, 640, 800, 920].forEach(function (cx) { s += win(cx, 352, 40, 62, { flowers: true }); });
    // shop windows
    s += awningRow(494, 150, 446, '#d9587b') + awningRow(796, 150, 446, '#d9587b') +
      '<rect x="500" y="464" width="138" height="120" rx="6" fill="#fffaf3" class="ink"/>' +
      '<path d="M500 524 H638 M569 464 V584" class="hair"/>' +
      '<rect x="534" y="548" width="68" height="30" rx="3" fill="#fffdf9" class="line"/><rect x="544" y="528" width="48" height="22" rx="3" fill="#f2a7bb" class="line"/><circle cx="568" cy="522" r="6" fill="#d9587b" class="line"/>' +
      '<rect x="802" y="464" width="138" height="120" rx="6" fill="#fffaf3" class="ink"/>' +
      '<path d="M802 524 H940 M871 464 V584" class="hair"/>' +
      '<path d="M836 576 h70 l-6 -30 h-58 z" fill="#c9d6bd" class="line"/><circle cx="852" cy="540" r="9" fill="#f2a7bb" class="line"/><circle cx="871" cy="534" r="10" fill="#d9587b" class="line"/><circle cx="890" cy="540" r="9" fill="#f2a7bb" class="line"/>' +
      '<path d="M500 590 H638 M802 590 H940" class="ink"/>';
    // arched door with fanlight; links to the lobby
    s += '<a href="#lobby" class="bld-link door-link" aria-label="No. 1, come inside to the lobby">' +
      '<path d="M662 ' + GROUND + ' V470 A58 58 0 0 1 778 470 V' + GROUND + ' Z" fill="#fffdf9" class="ink"/>' +
      '<path d="M674 470 A46 46 0 0 1 766 470 Z" fill="#e3d4f0" class="line"/>';
    for (var a = 1; a < 6; a++) {
      var ang = Math.PI + a * Math.PI / 6;
      s += '<line x1="720" y1="470" x2="' + f(720 + Math.cos(ang) * 46) + '" y2="' + f(470 + Math.sin(ang) * 46) + '" class="hair"/>';
    }
    s += '<rect x="676" y="474" width="88" height="' + (GROUND - 482) + '" fill="#d9587b" class="ink"/>' +
      '<path d="M720 474 V' + (GROUND - 8) + '" class="line"/>' +
      '<rect x="684" y="484" width="28" height="60" rx="3" fill="none" class="hair"/><rect x="728" y="484" width="28" height="60" rx="3" fill="none" class="hair"/>' +
      '<rect x="684" y="556" width="28" height="86" rx="3" fill="none" class="hair"/><rect x="728" y="556" width="28" height="86" rx="3" fill="none" class="hair"/>' +
      '<circle cx="712" cy="548" r="3" fill="#c39a50"/><circle cx="728" cy="548" r="3" fill="#c39a50"/></a>' +
      '<rect x="650" y="' + (GROUND - 8) + '" width="140" height="8" fill="#fffdf9" class="hair"/>';
    for (var h = 0; h < 3; h++) s += '<text x="' + (702 + h * 16) + '" y="460" class="heart" fill="#d9587b" font-size="20" style="animation-delay:' + (h * 0.9) + 's">♥</text>';
    return s + topiary(646) + topiary(794) + wisteria();
  }

  function wisteria() {
    var colours = ['#b79ce0', '#c9b6ec', '#9f84d6', '#ddd0f3'];
    var s = '<path d="M466 236 Q 530 248 590 236 T 710 238 T 830 236 T 974 238" class="line" style="stroke:#6f9c62;stroke-width:3"/>';
    for (var x = 484; x <= 956; x += 22) {
      if (x > 532 && x < 908) { if (Math.random() < 0.5) continue; }
      var len = Math.round(rand(2, 4)), bunch = '';
      for (var i = 0; i < len; i++) bunch += '<circle cx="' + f(x + rand(-3, 3)) + '" cy="' + (242 + i * 7) + '" r="' + f(7 - i * 0.9) + '" fill="' + colours[Math.floor(Math.random() * 4)] + '"/>';
      bunch += '<ellipse cx="' + (x + 7) + '" cy="240" rx="7" ry="4" fill="#9cc48a" transform="rotate(-25 ' + (x + 7) + ' 240)"/>';
      s += '<g class="wisteria" style="animation-delay:-' + f(rand(0, 3.5)) + 's">' + bunch + '</g>';
    }
    [480, 960].forEach(function (x) {
      var trail = '';
      for (var y = 246; y < 470; y += 11) trail += '<circle cx="' + f(x + rand(-5, 5)) + '" cy="' + y + '" r="' + f(rand(5, 7.5)) + '" fill="' + colours[Math.floor(Math.random() * 4)] + '"/>';
      s += '<g class="wisteria" style="animation-delay:-' + f(rand(0, 3)) + 's">' + trail + '</g>';
    });
    return s;
  }

  // No. 4: I Do by Marisa, a little wedding chapel with a swinging bell
  function ido() {
    var x = 990, w = 200, top = 300, cx = 1090, s = '';
    s += '<rect x="1068" y="150" width="44" height="90" fill="' + IDO.wall + '" class="ink"/>' +
      '<path d="M1076 210 V180 A14 14 0 0 1 1104 180 V210 Z" fill="#3a2f34" class="line"/>' +
      '<g class="bellswing"><path d="M1090 178 v4 M1080 202 q0 -18 10 -18 q10 0 10 18 z" fill="' + IDO.trim + '" class="line"/><circle cx="1090" cy="204" r="2.4" fill="' + IDO.trim + '" class="hair"/></g>' +
      '<path d="M1062 150 L1090 98 L1118 150 Z" fill="' + IDO.roof + '" class="ink"/>' +
      '<path d="M1090 98 V84 M1090 82 c-3 -5 -10 -2 -6 3 l6 6 l6 -6 c4 -5 -3 -8 -6 -3 z" fill="' + IDO.accent + '" class="line"/>';
    s += '<rect x="' + x + '" y="' + top + '" width="' + w + '" height="' + (GROUND - top) + '" fill="' + IDO.wall + '" class="ink"/>' +
      '<path d="M' + (x - 12) + ' ' + top + ' L' + cx + ' 204 L' + (x + w + 12) + ' ' + top + ' Z" fill="' + IDO.roof + '" class="ink"/>' +
      cornice(x, w, top, '#fffdf9');
    // rose window
    var petals = '';
    for (var p = 0; p < 8; p++) {
      var a = p * Math.PI / 4;
      petals += '<circle cx="' + f(cx + Math.cos(a) * 12) + '" cy="' + f(262 + Math.sin(a) * 12) + '" r="7" fill="' + (p % 2 ? '#fde7ed' : '#f2a7bb') + '" class="hair"/>';
    }
    s += '<circle cx="' + cx + '" cy="262" r="24" fill="#fffdf9" class="ink"/>' + petals + '<circle cx="' + cx + '" cy="262" r="5" fill="' + IDO.trim + '" class="hair"/>';
    [1036, 1144].forEach(function (wx) { s += win(wx, 326, 36, 96); });
    s += plaque(cx, 444, 170, 'i do by marisa', IDO.accent);
    // garland and double doors
    var garland = '';
    for (var g = 0; g <= 10; g++) garland += '<circle cx="' + (1052 + g * 7.6) + '" cy="' + f(536 + Math.sin(g / 10 * Math.PI) * 12) + '" r="3.6" fill="' + (g % 2 ? '#fffdf9' : '#f2a7bb') + '" class="hair"/>';
    s += archDoor(cx, 62, 548, '#f3dcc0') + '<path d="M' + cx + ' 580 V' + (GROUND - 4) + '" class="line"/>' + garland +
      win(1024, 594, 30, 56) + win(1156, 594, 30, 56);
    return '<a href="#ido" class="bld-link" aria-label="No. 4, I Do by Marisa">' + s + '</a>';
  }

  // the front desk: a peach house with a postbox out front
  function desk() {
    var x = 1208, w = 222, top = 292, s = '';
    var posts = '';
    for (var px = x + 6; px <= x + w - 6; px += 12) posts += 'M' + px + ' ' + (top - 18) + ' V' + (top - 4) + ' ';
    s += '<path d="M' + (x - 4) + ' ' + (top - 20) + ' H' + (x + w + 4) + ' ' + posts + '" class="line"/>' +
      '<rect x="' + x + '" y="' + top + '" width="' + w + '" height="' + (GROUND - top) + '" fill="#ffd3bd" class="ink"/>' + cornice(x, w, top);
    [314, 400].forEach(function (y, i) { [1256, 1319, 1382].forEach(function (cx) { s += win(cx, y, 34, 56, { flowers: i === 1 }); }); });
    s += plaque(1319, 486, 160, 'front desk ✉', '#b4573a') +
      win(1256, 590, 40, 62, { awning: true }) + win(1382, 590, 40, 62, { awning: true }) + archDoor(1319, 42, 580, '#8fb8a6') +
      '<rect x="1420" y="602" width="26" height="58" rx="4" fill="#d9587b" class="ink"/>' +
      '<path d="M1420 612 q13 -18 26 0" fill="#d9587b" class="ink"/>' +
      '<path d="M1425 620 h16" class="line"/>';
    return '<a href="#desk" class="bld-link" aria-label="The front desk: say hello">' + s + '</a>';
  }

  function street() {
    return office() + stitches() + shop() + ido() + desk() +
      lampPost(262) + lampPost(470) + lampPost(978) + lampPost(1200);
  }

  function ground() {
    var cobbles = '';
    for (var y = 712; y < 760; y += 14) {
      var d = '';
      for (var x = -600 + ((y / 14) % 2) * 9; x < 2040; x += 18) d += 'M' + x + ' ' + y + ' q9 -7 18 0 ';
      cobbles += '<path d="' + d + '" class="hair" opacity=".25"/>';
    }
    return '<rect x="-600" y="' + GROUND + '" width="2640" height="44" fill="#f4e8e0"/>' +
      '<path d="M-600 ' + GROUND + ' H2040 M-600 704 H2040" class="ink"/>' +
      '<rect x="-600" y="706" width="2640" height="800" fill="#efe1d8"/>' + cobbles;
  }

  /* ---------- Birds ---------- */
  function flyingBird(y, scale, dur, delay, pink) {
    return '<g class="flyer" style="animation-duration:' + dur + 's;animation-delay:' + delay + 's"><g transform="translate(0 ' + y + ') scale(' + scale + ')"><g class="bob" style="animation-delay:' + f(rand(-1, 0)) + 's">' +
      '<ellipse cx="0" cy="0" rx="9" ry="4.5" fill="' + (pink ? '#f2a7bb' : '#fffdf9') + '" stroke="#1f1a1c" stroke-width="1.6"/>' +
      '<circle cx="9" cy="-2" r="3.6" fill="' + (pink ? '#f2a7bb' : '#fffdf9') + '" stroke="#1f1a1c" stroke-width="1.6"/>' +
      '<path d="M12 -2 l5 1.5 l-5 1.5" fill="#c39a50" stroke="#1f1a1c" stroke-width="1"/>' +
      '<path d="M-9 0 l-7 -4 l2 4 l-2 4 z" fill="#fffdf9" stroke="#1f1a1c" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<g class="flap" style="animation-delay:' + f(rand(-.3, 0)) + 's"><path d="M-2 -2 Q-8 -18 6 -22 Q4 -10 4 -2 Z" fill="#fffdf9" stroke="#1f1a1c" stroke-width="1.6" stroke-linejoin="round"/></g>' +
      '</g></g></g>';
  }

  function perchedBird(x, y, flip, delay) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + (flip ? -1 : 1) + ' 1)"><g class="percher" style="animation-delay:' + delay + 's">' +
      '<path d="M-12 -6 c0 -8 6 -13 14 -13 c4 -6 12 -6 14 0 l5 2 l-5 2 c0 10 -8 15 -18 15 h-14 l6 -4 c-1 -1 -2 -1 -2 -2 z" fill="#f2a7bb" stroke="#1f1a1c" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<circle cx="10" cy="-17" r="1.4" fill="#1f1a1c"/>' +
      '<path d="M-6 -6 c4 3 9 3 12 0" fill="none" stroke="#1f1a1c" stroke-width="1.3" stroke-linecap="round"/>' +
      '<path d="M-2 0 v4 M4 0 v4" stroke="#1f1a1c" stroke-width="1.4"/></g></g>';
  }

  /* ---------- A lady in a pink coat walking her dog ---------- */
  function walker() {
    var y = GROUND + 30;
    var person =
      '<g class="leg" ><path d="M-5 ' + (y - 46) + ' V' + (y - 3) + '" stroke="#1f1a1c" stroke-width="3.4" stroke-linecap="round"/><ellipse cx="-2" cy="' + (y - 2) + '" rx="6" ry="3" fill="#1f1a1c"/></g>' +
      '<g class="leg leg--b"><path d="M5 ' + (y - 46) + ' V' + (y - 3) + '" stroke="#1f1a1c" stroke-width="3.4" stroke-linecap="round"/><ellipse cx="8" cy="' + (y - 2) + '" rx="6" ry="3" fill="#1f1a1c"/></g>' +
      '<g class="stride">' +
        '<path d="M-10 ' + (y - 100) + ' H10 L24 ' + (y - 44) + ' Q0 ' + (y - 38) + ' -24 ' + (y - 44) + ' Z" fill="#f2a7bb" class="ink"/>' +
        '<path d="M-10 ' + (y - 100) + ' L0 ' + (y - 88) + ' L10 ' + (y - 100) + '" fill="#fffdf9" class="line"/>' +
        '<circle cx="0" cy="' + (y - 78) + '" r="1.8" fill="#1f1a1c"/><circle cx="0" cy="' + (y - 66) + '" r="1.8" fill="#1f1a1c"/>' +
        '<path d="M8 ' + (y - 94) + ' Q22 ' + (y - 78) + ' 30 ' + (y - 66) + '" class="ink" fill="none"/>' +
        '<path d="M-8 ' + (y - 94) + ' Q-16 ' + (y - 76) + ' -12 ' + (y - 62) + '" class="ink" fill="none"/>' +
        '<circle cx="0" cy="' + (y - 113) + '" r="11" fill="#fff1e8" class="ink"/>' +
        '<path d="M-12 ' + (y - 108) + ' Q-14 ' + (y - 128) + ' 0 ' + (y - 126) + ' Q14 ' + (y - 128) + ' 12 ' + (y - 108) + ' Q10 ' + (y - 118) + ' 0 ' + (y - 117) + ' Q-8 ' + (y - 118) + ' -12 ' + (y - 108) + ' Z" fill="#1f1a1c"/>' +
        '<path d="M6 ' + (y - 126) + ' l8 -7 l1 9 z M6 ' + (y - 126) + ' l10 3 l-7 5 z" fill="#d9587b" stroke="#1f1a1c" stroke-width="1.2" stroke-linejoin="round"/>' +
        '<circle cx="5" cy="' + (y - 113) + '" r="1.4" fill="#1f1a1c"/>' +
        '<circle cx="7" cy="' + (y - 108) + '" r="2.4" fill="#f2a7bb" opacity=".8"/>' +
      '</g>';
    var leash = '<path d="M30 ' + (y - 66) + ' Q56 ' + (y - 30) + ' 82 ' + (y - 30) + '" fill="none" stroke="#d9587b" stroke-width="1.8"/>';
    var dog =
      '<g class="pup-leg"><path d="M68 ' + (y - 16) + ' v15" stroke="#1f1a1c" stroke-width="3" stroke-linecap="round"/></g>' +
      '<g class="pup-leg pup-leg--b"><path d="M74 ' + (y - 16) + ' v15" stroke="#1f1a1c" stroke-width="3" stroke-linecap="round"/></g>' +
      '<g class="pup-leg pup-leg--b"><path d="M86 ' + (y - 16) + ' v15" stroke="#1f1a1c" stroke-width="3" stroke-linecap="round"/></g>' +
      '<g class="pup-leg"><path d="M92 ' + (y - 16) + ' v15" stroke="#1f1a1c" stroke-width="3" stroke-linecap="round"/></g>' +
      '<g class="stride">' +
        '<g class="tail"><path d="M62 ' + (y - 24) + ' q-10 -4 -8 -14" fill="none" stroke="#1f1a1c" stroke-width="2.6" stroke-linecap="round"/></g>' +
        '<ellipse cx="80" cy="' + (y - 22) + '" rx="19" ry="10" fill="#fffdf9" class="ink"/>' +
        '<ellipse cx="72" cy="' + (y - 24) + '" rx="6" ry="5" fill="#1f1a1c"/>' +
        '<circle cx="100" cy="' + (y - 32) + '" r="10" fill="#fffdf9" class="ink"/>' +
        '<path d="M94 ' + (y - 40) + ' q-6 2 -4 12 q6 -2 6 -10 z" fill="#1f1a1c"/>' +
        '<ellipse cx="109" cy="' + (y - 30) + '" rx="4" ry="3" fill="#fffdf9" class="line"/><circle cx="112" cy="' + (y - 31) + '" r="1.6" fill="#1f1a1c"/>' +
        '<circle cx="102" cy="' + (y - 35) + '" r="1.5" fill="#1f1a1c"/>' +
        '<path d="M90 ' + (y - 26) + ' l-5 -5 l1 9 z M90 ' + (y - 26) + ' l6 -5 l-1 9 z" fill="#d9587b" stroke="#1f1a1c" stroke-width="1" stroke-linejoin="round"/>' +
      '</g>';
    return '<g class="walker">' + leash + dog + person + '</g>';
  }

  function buildScene() {
    var scene = document.getElementById('scene');
    var birds = flyingBird(110, 1, 26, -4, false) + flyingBird(70, .8, 32, -18, true) + flyingBird(150, .7, 29, -11, false) + flyingBird(96, .65, 36, -27, true);
    scene.innerHTML =
      '<defs><filter id="wobble" filterUnits="userSpaceOnUse" x="-700" y="-60" width="2840" height="1600">' +
        '<feTurbulence id="wobbleNoise" type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="1" result="noise"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="noise" scale="2.6" xChannelSelector="R" yChannelSelector="G"/>' +
      '</filter></defs>' +
      '<g filter="url(#wobble)">' +
        cloud(0, 60, 1.6, 120, -30) + cloud(0, 150, 1.1, 150, -95) + cloud(0, 230, 1.3, 135, -60) +
        tree(-60, GROUND, 80) + tree(1520, GROUND, 84) +
        street() +
        perchedBird(363, 206, false, 0) + perchedBird(560, 214, true, 2.2) + perchedBird(1090, 84, false, 3.6) + perchedBird(220, 182, true, 1.3) + perchedBird(1380, 272, false, 4.4) +
        ground() +
        walker() +
        birds +
      '</g>';

    // windows warm up when you click them
    scene.querySelectorAll('.pane').forEach(function (p) {
      p.addEventListener('click', function (e) { e.preventDefault(); p.classList.toggle('lit'); });
    });

    // the clock on the office dormer tells the real time
    function setClock() {
      var now = new Date(), m = now.getMinutes(), h = now.getHours() % 12 + m / 60;
      document.getElementById('minuteHand').setAttribute('transform', 'rotate(' + m * 6 + ' ' + CLOCK.join(' ') + ')');
      document.getElementById('hourHand').setAttribute('transform', 'rotate(' + h * 30 + ' ' + CLOCK.join(' ') + ')');
    }
    setClock();
    setInterval(setClock, 30000);

    // keep the whole street in view on wide screens, crop to the centre on narrow ones
    var wrap = document.getElementById('sceneWrap');
    function fit() {
      var r = wrap.getBoundingClientRect();
      scene.setAttribute('preserveAspectRatio', r.width / r.height < 1.25 ? 'xMidYMax slice' : 'xMidYMax meet');
    }
    fit();
    window.addEventListener('resize', fit);

    // gently "boiling" pen lines while the façade is on screen
    if (!reduceMotion) {
      var noise = document.getElementById('wobbleNoise');
      var seed = 1, visible = true;
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(scene);
      }
      setInterval(function () {
        if (!visible || document.hidden) return;
        seed = seed % 3 + 1;
        noise.setAttribute('seed', seed);
      }, 200);
    }
  }

  buildScene();

  /* ---------- Curtains + key tag ---------- */
  var opened = false;
  function checkIn() {
    if (opened) return;
    opened = true;
    document.body.classList.add('show');
    document.body.classList.remove('locked');
  }
  var seen = false;
  try { seen = !!sessionStorage.getItem('mk-checked-in'); sessionStorage.setItem('mk-checked-in', '1'); } catch (e) {}
  if (reduceMotion || seen) {
    checkIn();
  } else {
    document.body.classList.add('locked');
    window.scrollTo(0, 0);
    setTimeout(checkIn, 5500);
  }
  document.getElementById('checkIn').addEventListener('click', checkIn);
  document.querySelectorAll('.curtain').forEach(function (c) { c.addEventListener('click', checkIn); });

  /* ---------- Nav: light up the house you're at ---------- */
  var floorLinks = document.querySelectorAll('.floors a');
  var floors = ['lobby', 'office', 'stitches', 'ido', 'desk'];
  function setFloor(i) {
    floorLinks.forEach(function (a) { a.classList.toggle('active', +a.dataset.floor === i); });
  }
  setFloor(-1);
  if ('IntersectionObserver' in window) {
    var floorIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setFloor(floors.indexOf(e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    floors.forEach(function (id) { floorIO.observe(document.getElementById(id)); });
    new IntersectionObserver(function (e) { if (e[0].isIntersecting) setFloor(-1); }, { rootMargin: '-45% 0px -50% 0px' })
      .observe(document.getElementById('top'));
  }

  /* ---------- Suites: tap a door to peek in (touch screens) ---------- */
  if (window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.suite').forEach(function (s) {
      var door = s.querySelector('.door');
      door.addEventListener('click', function (e) {
        if (!s.classList.contains('peek')) { e.preventDefault(); s.classList.add('peek'); }
      });
    });
  }

  /* ---------- Front desk bell ---------- */
  var bell = document.getElementById('bellBtn');
  bell.addEventListener('click', function () {
    bell.classList.remove('ding');
    void bell.offsetWidth;
    bell.classList.add('ding');
  });

  /* ---------- Scroll reveals ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 0.12 + 's';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();
