// marisakahnt.com: a colourful storybook street with curtains, birds, a dog walk and house-number nav

(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var GROUND = 660;

  document.getElementById('year').textContent = new Date().getFullYear();

  function rand(min, max) { return min + Math.random() * (max - min); }
  function f(n) { return (+n).toFixed(1); }

  /* ---------- Street drawing (viewBox 1440 x 760) ---------- */

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

  // Brand colours, taken from marisastitches.com and idobymarisa.com
  var STITCHES = { wall: '#f1e6cc', trim: '#2f4a3a', roof: '#2f4a3a', accent: '#c9a24a', navy: '#1f2a44', spot: '#bdb7ad' };
  var IDO = { wall: '#f3ece2', trim: '#2c2825', roof: '#b7a097', accent: '#a3847b', bell: '#c2a67c' };
  var CLOCK = [140, 214];

  function plaque(cx, y, w, text, color, cls) {
    return '<g class="plaque"><rect x="' + (cx - w / 2) + '" y="' + y + '" width="' + w + '" height="34" rx="17" fill="#fffdf9" class="ink"/>' +
      '<rect x="' + (cx - w / 2 + 4) + '" y="' + (y + 4) + '" width="' + (w - 8) + '" height="26" rx="13" fill="none" stroke="' + color + '" stroke-width="1"/>' +
      '<text x="' + cx + '" y="' + (y + 23) + '" text-anchor="middle" class="' + (cls || 'plaque-text') + '" style="fill:' + color + '">' + text + '</text></g>';
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
    s += displayWindow(38, 594, 76, 54, '#3f5f87',
        '<rect x="50" y="618" width="14" height="22" fill="#d9587b" class="hair"/><rect x="64" y="614" width="12" height="26" fill="#3f5f87" class="hair"/><rect x="76" y="620" width="12" height="20" fill="#c9a24a" class="hair"/><path d="M90 640 l8 -24 l7 2 l-7 22 z" fill="#9cc3e6" class="hair"/>') +
      displayWindow(166, 594, 76, 54, '#3f5f87',
        '<rect x="180" y="604" width="44" height="32" fill="#ffe27a" class="hair" transform="rotate(-4 202 620)"/><path d="M186 614 h30 M186 620 h26 M186 626 h22" stroke="#1f1a1c" stroke-width="1" transform="rotate(-4 202 620)"/>') +
      archDoor(140, 42, 580, '#3f5f87');
    return '<a href="#office" class="bld-link" aria-label="No. 2, the office: my professional side">' + s + '</a>';
  }

  // No. 3: Marisa Stitches, with an embroidery-hoop window and spools in the shop window
  function stitches() {
    var x = 268, w = 190, top = 320, s = '';
    s += '<rect x="' + x + '" y="' + top + '" width="' + w + '" height="' + (GROUND - top) + '" fill="' + STITCHES.wall + '" class="ink"/>' +
      '<path d="M' + (x - 12) + ' ' + top + ' L363 206 L' + (x + w + 12) + ' ' + top + ' Z" fill="' + STITCHES.roof + '" class="ink"/>' +
      '<circle cx="363" cy="276" r="25" fill="#fffdf9" class="ink"/>' +
      '<circle cx="363" cy="276" r="19" fill="none" stroke="' + STITCHES.accent + '" stroke-width="3"/>' +
      '<rect x="384" y="252" width="8" height="10" rx="2" fill="#c39a50" class="hair"/>';
    var xs = '';
    for (var gx = -9; gx <= 9; gx += 6) for (var gy = -9; gy <= 9; gy += 6) {
      if (Math.abs(gx) + Math.abs(gy) > 13) continue;
      xs += 'M' + (360 + gx) + ' ' + (273 + gy) + ' l5 5 m0 -5 l-5 5 ';
    }
    s += '<path d="' + xs + '" stroke="' + STITCHES.trim + '" stroke-width="1.6" stroke-linecap="round"/>' + cornice(x, w, top, STITCHES.accent);
    // leopard spots, like the Marisa Stitches brand
    var spots = [[284, 336], [446, 352], [300, 410], [442, 418], [362, 392], [286, 486], [448, 486], [362, 470], [292, 548], [446, 552], [362, 540]];
    spots.forEach(function (p) {
      s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="' + f(rand(5, 8)) + '" ry="' + f(rand(3.5, 5.5)) + '" fill="' + STITCHES.spot + '" transform="rotate(' + f(rand(-30, 30)) + ' ' + p[0] + ' ' + p[1] + ')"/>';
    });
    [342, 428].forEach(function (y, i) { [318, 408].forEach(function (cx) { s += win(cx, y, 38, 56, { flowers: i === 0 }); }); });
    s += plaque(363, 508, 170, 'marisa stitches', STITCHES.trim, 'plaque-text plaque-text--stitches');
    // shop window with spools of thread
    s += awningRow(280, 92, 556, STITCHES.trim) +
      '<rect x="284" y="572" width="84" height="74" rx="4" fill="#fffaf3" class="ink"/>';
    [STITCHES.trim, STITCHES.accent, STITCHES.navy, '#f2a7bb'].forEach(function (c, i) {
      var sx = 294 + i * 18;
      s += '<rect x="' + sx + '" y="612" width="14" height="4" fill="#fffdf9" class="hair"/><rect x="' + (sx + 2) + '" y="616" width="10" height="20" fill="' + c + '" class="hair"/><rect x="' + sx + '" y="636" width="14" height="4" fill="#fffdf9" class="hair"/>';
    });
    s += '<path d="M292 600 q20 -18 40 0 t36 -4" fill="none" stroke="' + STITCHES.navy + '" stroke-width="1.6" stroke-dasharray="3 3"/>';
    s += archDoor(412, 40, 584, STITCHES.navy);
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

  // a grand gilded shop window with a little display inside
  function displayWindow(x, y, w, h, awning, inside) {
    return awningRow(x - 4, w + 8, y - 22, awning) +
      '<rect x="' + (x - 3) + '" y="' + (y - 3) + '" width="' + (w + 6) + '" height="' + (h + 6) + '" rx="3" fill="#c9a24a" class="ink"/>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#fff6e6" class="line"/>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + f(h * 0.45) + '" fill="#fffdf6" opacity=".8"/>' +
      '<rect x="' + x + '" y="' + f(y + h - 10) + '" width="' + w + '" height="10" fill="#efe1d0" class="hair"/>' +
      inside +
      '<path d="M' + (x + 6) + ' ' + (y + 6) + ' l10 -0 M' + (x + 6) + ' ' + (y + 6) + ' l0 10" stroke="#fff" stroke-width="2" opacity=".9"/>' +
      '<rect x="' + (x - 6) + '" y="' + (y + h + 3) + '" width="' + (w + 12) + '" height="6" rx="2" fill="#fffdf9" class="line"/>';
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
      '<g class="bellswing"><path d="M1090 178 v4 M1080 202 q0 -18 10 -18 q10 0 10 18 z" fill="' + IDO.bell + '" class="line"/><circle cx="1090" cy="204" r="2.4" fill="' + IDO.bell + '" class="hair"/></g>' +
      '<path d="M1062 150 L1090 98 L1118 150 Z" fill="' + IDO.roof + '" class="ink"/>' +
      '<path d="M1090 98 V84 M1090 82 c-3 -5 -10 -2 -6 3 l6 6 l6 -6 c4 -5 -3 -8 -6 -3 z" fill="' + IDO.accent + '" class="line"/>';
    s += '<rect x="' + x + '" y="' + top + '" width="' + w + '" height="' + (GROUND - top) + '" fill="' + IDO.wall + '" class="ink"/>' +
      '<path d="M' + (x - 12) + ' ' + top + ' L' + cx + ' 204 L' + (x + w + 12) + ' ' + top + ' Z" fill="' + IDO.roof + '" class="ink"/>' +
      cornice(x, w, top, '#fffdf9');
    // rose window
    var petals = '';
    for (var p = 0; p < 8; p++) {
      var a = p * Math.PI / 4;
      petals += '<circle cx="' + f(cx + Math.cos(a) * 12) + '" cy="' + f(262 + Math.sin(a) * 12) + '" r="7" fill="' + (p % 2 ? '#fbf6ee' : '#e6d6cc') + '" class="hair"/>';
    }
    s += '<circle cx="' + cx + '" cy="262" r="24" fill="#fffdf9" class="ink"/>' + petals + '<circle cx="' + cx + '" cy="262" r="5" fill="' + IDO.accent + '" class="hair"/>';
    [1036, 1144].forEach(function (wx) { s += win(wx, 326, 36, 96); });
    s += plaque(cx, 444, 176, 'I Do by Marisa', IDO.trim, 'plaque-script');
    // garland and double doors
    var garland = '';
    for (var g = 0; g <= 10; g++) garland += '<circle cx="' + (1052 + g * 7.6) + '" cy="' + f(536 + Math.sin(g / 10 * Math.PI) * 12) + '" r="3.6" fill="' + (g % 2 ? '#fffdf9' : '#d9c6bc') + '" class="hair"/>';
    s += archDoor(cx, 62, 548, '#4a433f') + '<path d="M' + cx + ' 580 V' + (GROUND - 4) + '" stroke="#c2a67c" stroke-width="1.6"/>' + garland +
      displayWindow(998, 598, 52, 50, IDO.roof,
        '<rect x="1012" y="626" width="24" height="12" fill="#fffdf9" class="hair"/><rect x="1016" y="616" width="16" height="10" fill="#fffdf9" class="hair"/><rect x="1019" y="608" width="10" height="8" fill="#fffdf9" class="hair"/><circle cx="1024" cy="606" r="2.4" fill="' + IDO.accent + '"/>') +
      displayWindow(1130, 598, 52, 50, IDO.roof,
        '<path d="M1142 638 v-16 a14 14 0 0 1 28 0 v16 z" fill="#ffffff" opacity=".5" class="hair"/><circle cx="1152" cy="630" r="5" fill="none" stroke="#c2a67c" stroke-width="1.8"/><circle cx="1160" cy="630" r="5" fill="none" stroke="#c2a67c" stroke-width="1.8"/><rect x="1140" y="638" width="32" height="3" fill="#2c2825"/>');
    return '<a href="#ido" class="bld-link" aria-label="No. 4, I Do by Marisa">' + s + '</a>';
  }

  // say hi: a peach house with a postbox out front
  function desk() {
    var x = 1208, w = 222, top = 292, s = '';
    var posts = '';
    for (var px = x + 6; px <= x + w - 6; px += 12) posts += 'M' + px + ' ' + (top - 18) + ' V' + (top - 4) + ' ';
    s += '<path d="M' + (x - 4) + ' ' + (top - 20) + ' H' + (x + w + 4) + ' ' + posts + '" class="line"/>' +
      '<rect x="' + x + '" y="' + top + '" width="' + w + '" height="' + (GROUND - top) + '" fill="#ffd3bd" class="ink"/>' + cornice(x, w, top);
    [314, 400].forEach(function (y, i) { [1256, 1319, 1382].forEach(function (cx) { s += win(cx, y, 34, 56, { flowers: i === 1 }); }); });
    s += plaque(1319, 486, 160, 'say hi ✉', '#b4573a') +
      displayWindow(1222, 596, 68, 52, '#d9587b',
        '<rect x="1234" y="616" width="28" height="18" fill="#fffdf9" class="hair" transform="rotate(-8 1248 625)"/><path d="M1234 616 l14 10 l14 -10" fill="none" class="hair" transform="rotate(-8 1248 625)"/><rect x="1252" y="620" width="28" height="18" fill="#f2a7bb" class="hair" transform="rotate(6 1266 629)"/>') +
      displayWindow(1348, 596, 62, 52, '#d9587b',
        '<path d="M1379 636 c-14 -10 -14 -22 -5 -22 c3 0 5 2 5 5 c0 -3 2 -5 5 -5 c9 0 9 12 -5 22 z" fill="#d9587b" class="hair"/>') +
      archDoor(1319, 42, 580, '#8fb8a6') +
      '<rect x="1420" y="602" width="26" height="58" rx="4" fill="#d9587b" class="ink"/>' +
      '<path d="M1420 612 q13 -18 26 0" fill="#d9587b" class="ink"/>' +
      '<path d="M1425 620 h16" class="line"/>';
    return '<a href="#desk" class="bld-link" aria-label="Say hi: contact me">' + s + '</a>';
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
  function flyingBird(y, scale, dur, delay, colour) {
    var pink = colour === true ? '#f2a7bb' : colour || '#fffdf9';
    return '<g class="flyer" style="animation-duration:' + dur + 's;animation-delay:' + delay + 's"><g transform="translate(0 ' + y + ') scale(' + scale + ')"><g class="bob" style="animation-delay:' + f(rand(-1, 0)) + 's">' +
      '<ellipse cx="0" cy="0" rx="9" ry="4.5" fill="' + pink + '" stroke="#1f1a1c" stroke-width="1.6"/>' +
      '<circle cx="9" cy="-2" r="3.6" fill="' + pink + '" stroke="#1f1a1c" stroke-width="1.6"/>' +
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
  /* ---------- Marisa walking her English bulldog (cartoon style) ---------- */
  function walkerParts() {
    var y = GROUND + 30, HAIR = '#7a4a2e', HAIR_DARK = '#5e3820', SKIN = '#fff0e8', COAT = '#f6a5bd', INK = '#1f1a1c';
    var line = ' stroke="' + INK + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"';

    var shoe = function (x) { return '<ellipse cx="' + (x + 2) + '" cy="' + (y - 2.5) + '" rx="6" ry="3.4" fill="#d9587b"' + line + '/>'; };
    var girl =
      '<g class="leg"><path d="M-5 ' + (y - 30) + ' V' + (y - 5) + '" stroke="' + INK + '" stroke-width="4.2" stroke-linecap="round"/>' + shoe(-5) + '</g>' +
      '<g class="leg leg--b"><path d="M5 ' + (y - 30) + ' V' + (y - 5) + '" stroke="' + INK + '" stroke-width="4.2" stroke-linecap="round"/>' + shoe(5) + '</g>' +
      '<g class="stride">' +
        // long, swishy brown hair behind
        '<g class="hairswish"><path d="M-17 ' + (y - 96) + ' Q-22 ' + (y - 70) + ' -16 ' + (y - 58) + ' Q-10 ' + (y - 52) + ' -6 ' + (y - 60) + ' L8 ' + (y - 60) + ' Q14 ' + (y - 52) + ' 20 ' + (y - 58) + ' Q24 ' + (y - 72) + ' 18 ' + (y - 96) + ' Z" fill="' + HAIR + '"' + line + '/></g>' +
        // coat
        '<path d="M-9 ' + (y - 70) + ' H9 Q22 ' + (y - 44) + ' 21 ' + (y - 30) + ' Q0 ' + (y - 24) + ' -21 ' + (y - 30) + ' Q-22 ' + (y - 44) + ' -9 ' + (y - 70) + ' Z" fill="' + COAT + '"' + line + '/>' +
        '<path d="M-7 ' + (y - 70) + ' q3.5 6 7 0 q3.5 6 7 0" fill="#fffdf9"' + line + '/>' +
        '<circle cx="0" cy="' + (y - 54) + '" r="1.8" fill="#c9a24a"/><circle cx="0" cy="' + (y - 44) + '" r="1.8" fill="#c9a24a"/>' +
        '<g class="arm"><path d="M-8 ' + (y - 64) + ' q-8 8 -7 18" fill="none" stroke="' + COAT + '" stroke-width="5" stroke-linecap="round"/><path d="M-8 ' + (y - 64) + ' q-8 8 -7 18" fill="none"' + line + ' stroke-width="1.2"/><circle cx="-15" cy="' + (y - 45) + '" r="3.4" fill="' + SKIN + '"' + line + ' stroke-width="1.4"/></g>' +
        '<path d="M8 ' + (y - 64) + ' q10 4 16 14" fill="none" stroke="' + COAT + '" stroke-width="5" stroke-linecap="round"/>' +
        '<circle cx="25" cy="' + (y - 49) + '" r="3.4" fill="' + SKIN + '"' + line + ' stroke-width="1.4"/>' +
        // big round head
        '<circle cx="1" cy="' + (y - 90) + '" r="19" fill="' + SKIN + '"' + line + '/>' +
        // side-parted bangs
        '<path d="M-18 ' + (y - 88) + ' Q-19 ' + (y - 112) + ' 2 ' + (y - 110) + ' Q20 ' + (y - 109) + ' 20 ' + (y - 88) + ' Q14 ' + (y - 100) + ' 4 ' + (y - 101) + ' Q-4 ' + (y - 96) + ' -10 ' + (y - 97) + ' Q-15 ' + (y - 94) + ' -18 ' + (y - 88) + ' Z" fill="' + HAIR + '"' + line + '/>' +
        '<path d="M4 ' + (y - 109) + ' q-2 5 0 8" fill="none" stroke="' + HAIR_DARK + '" stroke-width="1.4" stroke-linecap="round"/>' +
        // pink bow
        '<path d="M-13 ' + (y - 104) + ' l-8 -6 l1 10 z M-13 ' + (y - 104) + ' l7 -8 l2 10 z" fill="#d9587b"' + line + ' stroke-width="1.4"/><circle cx="-13" cy="' + (y - 104) + '" r="2.2" fill="#f6a5bd"' + line + ' stroke-width="1.2"/>' +
        // big sparkly blue eyes that blink
        '<g class="blink">' +
          '<ellipse cx="-4" cy="' + (y - 88) + '" rx="3.6" ry="4.6" fill="#2a3550"/><ellipse cx="-4" cy="' + (y - 86.6) + '" rx="2.4" ry="2.6" fill="#5b8fd0"/><circle cx="-2.8" cy="' + (y - 90) + '" r="1.4" fill="#fff"/>' +
          '<ellipse cx="9" cy="' + (y - 88) + '" rx="3.6" ry="4.6" fill="#2a3550"/><ellipse cx="9" cy="' + (y - 86.6) + '" rx="2.4" ry="2.6" fill="#5b8fd0"/><circle cx="10.2" cy="' + (y - 90) + '" r="1.4" fill="#fff"/>' +
        '</g>' +
        '<ellipse cx="-9" cy="' + (y - 81) + '" rx="3.6" ry="2.4" fill="#f6a5bd" opacity=".8"/><ellipse cx="14" cy="' + (y - 81) + '" rx="3.6" ry="2.4" fill="#f6a5bd" opacity=".8"/>' +
        '<path d="M1 ' + (y - 80) + ' q2.6 3 5.2 0" fill="none"' + line + ' stroke-width="1.5"/>' +
      '</g>';

    var leash = '<path d="M27 ' + (y - 49) + ' Q56 ' + (y - 22) + ' 84 ' + (y - 21) + '" fill="none" stroke="#d9587b" stroke-width="2"/>';

    // a chunky, smiley English bulldog puppy
    var FUR = '#f7e9d6', PATCH = '#e4b98b';
    var paw = function (x, cls) {
      return '<g class="pup-leg' + cls + '"><path d="M' + x + ' ' + (y - 12) + ' v8" stroke="' + INK + '" stroke-width="7.5" stroke-linecap="round"/><path d="M' + x + ' ' + (y - 12) + ' v8" stroke="' + FUR + '" stroke-width="4.5" stroke-linecap="round"/></g>';
    };
    var dog =
      paw(58, '') + paw(65, ' pup-leg--b') + paw(80, ' pup-leg--b') + paw(87, '') +
      '<g class="stride">' +
        '<g class="tail"><path d="M50 ' + (y - 22) + ' q-6 -2 -5 -7" fill="none" stroke="' + INK + '" stroke-width="4.5" stroke-linecap="round"/><path d="M50 ' + (y - 22) + ' q-6 -2 -5 -7" fill="none" stroke="' + FUR + '" stroke-width="2" stroke-linecap="round"/></g>' +
        '<ellipse cx="70" cy="' + (y - 19) + '" rx="21" ry="13" fill="' + FUR + '"' + line + '/>' +
        '<path d="M56 ' + (y - 26) + ' q8 -6 16 -2 q-2 8 -10 7 q-7 -1 -6 -5 z" fill="' + PATCH + '"/>' +
        // big round head
        '<path d="M80 ' + (y - 28) + ' Q79 ' + (y - 50) + ' 97 ' + (y - 50) + ' Q115 ' + (y - 50) + ' 114 ' + (y - 28) + ' Q114 ' + (y - 13) + ' 97 ' + (y - 13) + ' Q80 ' + (y - 13) + ' 80 ' + (y - 28) + ' Z" fill="' + FUR + '"' + line + '/>' +
        '<path d="M82 ' + (y - 40) + ' q3 -10 12 -8 q-2 7 -12 8 z" fill="' + PATCH + '"/>' +
        '<path d="M83 ' + (y - 46) + ' q-8 -2 -7 6 q4 1 8 -2 z M111 ' + (y - 46) + ' q8 -2 7 6 q-4 1 -8 -2 z" fill="' + PATCH + '"' + line + ' stroke-width="1.5"/>' +
        '<path d="M93 ' + (y - 44) + ' q4 -1.5 8 0" fill="none"' + line + ' stroke-width="1.2"/>' +
        // shiny eyes
        '<g class="blink blink--pup"><circle cx="90" cy="' + (y - 34) + '" r="3.6" fill="' + INK + '"/><circle cx="91.2" cy="' + (y - 35.4) + '" r="1.3" fill="#fff"/>' +
        '<circle cx="104" cy="' + (y - 34) + '" r="3.6" fill="' + INK + '"/><circle cx="105.2" cy="' + (y - 35.4) + '" r="1.3" fill="#fff"/></g>' +
        // smushed muzzle, nose and a happy underbite
        '<ellipse cx="97" cy="' + (y - 24) + '" rx="11" ry="7" fill="#fffdf9"' + line + ' stroke-width="1.5"/>' +
        '<ellipse cx="97" cy="' + (y - 28) + '" rx="4.6" ry="3.2" fill="' + INK + '"/><ellipse cx="96" cy="' + (y - 29) + '" rx="1.4" ry=".8" fill="#fff" opacity=".8"/>' +
        '<path d="M90 ' + (y - 23) + ' q7 6 14 0" fill="none"' + line + ' stroke-width="1.5"/>' +
        '<path d="M93 ' + (y - 21.6) + ' v-2 M101 ' + (y - 21.6) + ' v-2" stroke="#fff" stroke-width="1.6"/>' +
        '<g class="tongue"><path d="M95 ' + (y - 20) + ' q2 6 4 0 z" fill="#ef7f9c"' + line + ' stroke-width="1"/></g>' +
        '<ellipse cx="86" cy="' + (y - 26) + '" rx="2.6" ry="1.8" fill="#f6a5bd" opacity=".8"/><ellipse cx="108" cy="' + (y - 26) + '" rx="2.6" ry="1.8" fill="#f6a5bd" opacity=".8"/>' +
        // pink collar, bow and a little gold heart tag
        '<path d="M82 ' + (y - 18) + ' q12 6 26 0" fill="none" stroke="#d9587b" stroke-width="3.4" stroke-linecap="round"/>' +
        '<path d="M86 ' + (y - 17) + ' l-5 -4 l0 8 z M86 ' + (y - 17) + ' l5 -4 l0 8 z" fill="#d9587b"' + line + ' stroke-width="1.1"/>' +
        '<path d="M100 ' + (y - 13) + ' c-2 -3 -5 -1 -3 1 l3 3 l3 -3 c2 -2 -1 -4 -3 -1 z" fill="#c9a24a"' + line + ' stroke-width=".8"/>' +
      '</g>' +
      '<text x="104" y="' + (y - 54) + '" class="heart" fill="#d9587b" font-size="12">♥</text>' +
      '<text x="96" y="' + (y - 52) + '" class="heart" fill="#f6a5bd" font-size="9" style="animation-delay:1.4s">♥</text>';
    return leash + dog + girl;
  }

  /* ---------- Same girl, different hats: a little Marisa for each section ---------- */
  function persona(kind) {
    var INK = '#1f1a1c', SKIN = '#fff0e8', HAIR = '#7a4a2e', HAIR_D = '#5e3820';
    var L = ' stroke="' + INK + '" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"';
    var face =
      '<circle cx="0" cy="44" r="19" fill="' + SKIN + '"' + L + '/>' +
      '<g class="blink"><ellipse cx="-6" cy="45" rx="3.4" ry="4.4" fill="#2a3550"/><ellipse cx="-6" cy="46.4" rx="2.3" ry="2.5" fill="#5b8fd0"/><circle cx="-4.8" cy="43.2" r="1.3" fill="#fff"/>' +
      '<ellipse cx="7" cy="45" rx="3.4" ry="4.4" fill="#2a3550"/><ellipse cx="7" cy="46.4" rx="2.3" ry="2.5" fill="#5b8fd0"/><circle cx="8.2" cy="43.2" r="1.3" fill="#fff"/></g>' +
      '<ellipse cx="-11" cy="52" rx="3.4" ry="2.2" fill="#f6a5bd" opacity=".8"/><ellipse cx="12" cy="52" rx="3.4" ry="2.2" fill="#f6a5bd" opacity=".8"/>' +
      '<path d="M-1 55 q2.6 3 5.2 0" fill="none"' + L + ' stroke-width="1.4"/>';
    var bangs = '<path d="M-19 44 Q-20 20 1 22 Q20 23 20 44 Q14 32 4 31 Q-4 36 -10 35 Q-15 38 -19 44 Z" fill="' + HAIR + '"' + L + '/>' +
      '<path d="M4 23 q-2 5 0 8" fill="none" stroke="' + HAIR_D + '" stroke-width="1.3" stroke-linecap="round"/>';
    var longHair = '<g class="hairswish"><path d="M-18 38 Q-25 70 -17 86 Q-10 92 -6 82 L8 82 Q14 92 21 86 Q27 70 19 38 Z" fill="' + HAIR + '"' + L + '/></g>';
    var arm = function (d, colour, w) {
      return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + (w + 3.4) + '" stroke-linecap="round"/>' +
        '<path d="' + d + '" fill="none" stroke="' + colour + '" stroke-width="' + w + '" stroke-linecap="round"/>';
    };
    var hand = function (x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="3.6" fill="' + SKIN + '"' + L + ' stroke-width="1.4"/>'; };
    var s = '';

    if (kind === 'office') {
      // the strategist: pink blazer, charcoal skirt, laptop and a coffee
      s += longHair +
        '<path d="M-5 112 V134 M5 112 V134" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M-10 135 h8 l1 -4 h-8 z M2 135 h8 l1 -4 h-8 z" fill="' + INK + '"/>' +
        '<path d="M-13 96 H13 L15 114 H-15 Z" fill="#3a3f4f"' + L + '/>' +
        '<path d="M-15 64 H15 Q19 82 17 100 H-17 Q-19 82 -15 64 Z" fill="#f2a7bb"' + L + '/>' +
        '<path d="M-6 64 L0 79 L6 64 Z" fill="#fffdf9"' + L + ' stroke-width="1.4"/>' +
        '<path d="M-6 64 L-2 84 M6 64 L2 84" fill="none"' + L + ' stroke-width="1.4"/><circle cx="0" cy="90" r="1.6" fill="#c9a24a"/>' +
        // laptop tucked under her arm
        '<g transform="rotate(-12 24 84)"><rect x="12" y="76" width="26" height="18" rx="2.5" fill="#e3e5ea"' + L + ' stroke-width="1.5"/>' +
        '<path d="M25 82 c-2 -3 -6 -1 -3.5 1.6 l3.5 3.4 l3.5 -3.4 c2.5 -2.6 -1.5 -4.6 -3.5 -1.6 z" fill="#f2a7bb"/></g>' +
        arm('M13 68 Q22 78 20 92', '#f2a7bb', 5.5) + hand(20, 94) +
        // coffee
        arm('M-13 68 Q-20 80 -21 90', '#f2a7bb', 5.5) +
        '<path d="M-27 86 h12 l-1.5 14 h-9 z" fill="#d9587b"' + L + ' stroke-width="1.4"/><rect x="-28" y="83" width="14" height="4" rx="1.5" fill="#fffdf9"' + L + ' stroke-width="1.2"/>' +
        hand(-21, 92) +
        '<path class="steam" d="M-23 78 q-3 -4 0 -8 q3 -4 0 -8" fill="none" stroke="#c9b7b0" stroke-width="1.4" stroke-linecap="round"/>' +
        '<path class="steam steam--b" d="M-18 79 q-3 -4 0 -8 q3 -4 0 -8" fill="none" stroke="#c9b7b0" stroke-width="1.4" stroke-linecap="round"/>' +
        face + bangs;
    } else if (kind === 'stitches') {
      // the maker: sweat set, messy bun, hoop in hand, lamp and a sleepy bulldog
      s += '<g class="lamp-glow"><circle cx="46" cy="72" r="18" fill="#fff1b8" opacity=".75"/></g>' +
        '<path d="M46 136 V72" stroke="' + INK + '" stroke-width="2.2"/><ellipse cx="46" cy="137" rx="9" ry="2.6" fill="#c9a24a"' + L + ' stroke-width="1.4"/>' +
        '<path d="M35 72 L57 72 L52 56 L40 56 Z" fill="#2f4a3a"' + L + ' stroke-width="1.5"/>' +
        // sleepy bulldog
        '<ellipse cx="-44" cy="131" rx="16" ry="8" fill="#f7e9d6"' + L + ' stroke-width="1.5"/><path d="M-52 127 q5 -4 10 -1 q-1 5 -6 5 q-4 0 -4 -4 z" fill="#e4b98b"/>' +
        // big square bulldog head with floppy ears, jowls and a little underbite
        '<path d="M-39 127 Q-39 118 -29 118 Q-19 118 -19 127 Q-19 135 -29 135 Q-39 135 -39 127 Z" fill="#f7e9d6"' + L + ' stroke-width="1.5"/>' +
        '<path d="M-37 120 q-6 -1 -5 5 q3 0 5 -2 z M-21 120 q6 -1 5 5 q-3 0 -5 -2 z" fill="#e4b98b"' + L + ' stroke-width="1"/>' +
        '<path d="M-34 124 q1.6 1.6 3.2 0 M-27 124 q1.6 1.6 3.2 0" fill="none"' + L + ' stroke-width="1.1"/>' +
        '<ellipse cx="-29" cy="130.5" rx="6.5" ry="3.6" fill="#fffdf9"' + L + ' stroke-width="1"/><ellipse cx="-29" cy="128.4" rx="2.4" ry="1.6" fill="' + INK + '"/>' +
        '<path d="M-32 132.5 h6" stroke="' + INK + '" stroke-width=".9"/><path d="M-31 132.5 v-1.2 M-27 132.5 v-1.2" stroke="#fff" stroke-width=".9"/>' +
        '<text class="zz" x="-24" y="114" font-size="9" fill="#9b8f94" font-family="Georgia, serif">z</text>' +
        '<text class="zz zz--b" x="-19" y="108" font-size="11" fill="#9b8f94" font-family="Georgia, serif">z</text>' +
        // her: messy bun + short back hair
        '<circle cx="5" cy="22" r="9" fill="' + HAIR + '"' + L + '/><rect x="-1" y="25" width="12" height="4" rx="2" fill="#f2a7bb"' + L + ' stroke-width="1.1"/>' +
        '<path d="M-19 42 Q-22 60 -14 66 L15 66 Q22 60 19 42 Z" fill="' + HAIR + '"' + L + '/>' +
        // joggers + fuzzy slippers
        '<path d="M-13 98 H13 L12 130 H2 L0 106 L-2 130 H-12 Z" fill="#f6c4d2"' + L + '/>' +
        '<ellipse cx="-7" cy="134" rx="8" ry="4" fill="#fffdf9"' + L + ' stroke-width="1.4"/><ellipse cx="7" cy="134" rx="8" ry="4" fill="#fffdf9"' + L + ' stroke-width="1.4"/>' +
        '<circle cx="-11" cy="132" r="2" fill="#f2a7bb"/><circle cx="11" cy="132" r="2" fill="#f2a7bb"/>' +
        // hoodie
        '<path d="M-16 64 H16 Q21 84 17 102 H-17 Q-21 84 -16 64 Z" fill="#f6c4d2"' + L + '/>' +
        '<path d="M-10 63 Q0 72 10 63" fill="#eeb1c3"' + L + ' stroke-width="1.4"/><path d="M-3 69 v9 M3 69 v9" stroke="#fffdf9" stroke-width="1.4" stroke-linecap="round"/>' +
        arm('M-14 68 Q-17 80 -10 86', '#f6c4d2', 6) + arm('M14 68 Q17 80 10 86', '#f6c4d2', 6) +
        // embroidery hoop with a stitched heart
        '<circle cx="0" cy="86" r="12" fill="#fffaf0" stroke="#c9a24a" stroke-width="3"/><circle cx="0" cy="86" r="12" fill="none"' + L + ' stroke-width="1"/>' +
        '<path d="M0 90 c-6 -4 -6 -9 -2.6 -9 c1.4 0 2.6 1 2.6 2.4 c0 -1.4 1.2 -2.4 2.6 -2.4 c3.4 0 3.4 5 -2.6 9 z" fill="none" stroke="#d9587b" stroke-width="1.3" stroke-dasharray="1.6 1.2"/>' +
        hand(-11, 87) + hand(11, 87) +
        face + '<path d="M-19 44 Q-20 22 1 23 Q20 24 20 44 Q12 34 2 33 Q-8 34 -19 44 Z" fill="' + HAIR + '"' + L + '/>';
    } else {
      // the storyteller: little black dress, pearls, a microphone and the ceremony script
      s += longHair +
        '<path d="M-5 118 V134 M5 118 V134" stroke="' + SKIN + '" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M-5 118 V134 M5 118 V134" stroke="' + INK + '" stroke-width="5.8" stroke-linecap="round" opacity=".18"/>' +
        '<path d="M-10 135 h8 l1 -4 h-8 z M2 135 h8 l1 -4 h-8 z" fill="' + INK + '"/>' +
        '<path d="M-10 66 H10 L11 88 Q24 108 21 120 Q0 125 -21 120 Q-24 108 -11 88 Z" fill="' + INK + '"' + L + '/>' +
        '<path d="M-6 92 Q-14 106 -14 118" fill="none" stroke="#5a5256" stroke-width="1.4" opacity=".7"/>' +
        '<path d="M-10 66 Q-5 72 0 68 Q5 72 10 66" fill="' + SKIN + '"' + L + ' stroke-width="1.3"/>' +
        '<path d="M-7 63 Q0 70 7 63" fill="none" stroke="#fffdf9" stroke-width="2.4" stroke-dasharray="0.1 3" stroke-linecap="round"/>' +
        // script book in one hand
        arm('M10 68 Q18 76 17 88', SKIN, 4.5) +
        '<rect x="11" y="84" width="16" height="20" rx="1.6" fill="#2a2426"' + L + ' stroke-width="1.4"/><path d="M19 91 c-1.6 -2.4 -4.6 -0.8 -2.8 1.3 l2.8 2.7 l2.8 -2.7 c1.8 -2.1 -1.2 -3.7 -2.8 -1.3 z" fill="#c9a24a"/>' +
        hand(17, 90) +
        // microphone in the other
        arm('M-10 68 Q-22 72 -14 62', SKIN, 4.5) +
        '<rect x="-17" y="58" width="5" height="13" rx="2" fill="#3a3335"' + L + ' stroke-width="1.2" transform="rotate(-20 -14 62)"/>' +
        '<circle cx="-12" cy="55" r="4.4" fill="#9b9599"' + L + ' stroke-width="1.3"/><path d="M-14.5 54 h5 M-14 56.5 h4" stroke="#5a5256" stroke-width=".8"/>' +
        hand(-14, 63) +
        face + bangs +
        '<path d="M-15 30 l3 -2 l1 3 z" fill="#c9a24a"/>' +
        '<text class="twinkle" x="30" y="40" font-size="10" fill="#c9a24a">✦</text><text class="twinkle" x="-38" y="96" font-size="8" fill="#c2a67c" style="animation-delay:1.3s">✦</text>';
    }
    return '<g class="idle">' + s + '</g>';
  }

  function walker() {
    return '<g class="walker">' + walkerParts() + '</g>';
  }

  /* ---------- Storybook magic: singing birds, butterflies, twinkles ---------- */
  var PERCHES = [[363, 206], [560, 214], [1090, 84], [220, 182], [1380, 272]];

  function notes() {
    var s = '', glyphs = ['♪', '♫', '♪', '♬'];
    PERCHES.forEach(function (p, i) {
      for (var k = 0; k < 2; k++) {
        s += '<text x="' + (p[0] + 8 + k * 8) + '" y="' + (p[1] - 22) + '" class="note" fill="' + (k ? '#d9587b' : '#6f9c80') + '" font-size="' + (16 + k * 4) + '" style="animation-delay:' + f(i * 1.3 + k * 0.9) + 's">' + glyphs[(i + k) % 4] + '</text>';
      }
    });
    return s;
  }

  function butterfly(x, y, colour, dur, delay) {
    return '<g transform="translate(' + x + ' ' + y + ')"><g class="flit" style="animation-duration:' + dur + 's;animation-delay:' + delay + 's">' +
      '<g class="wing"><path d="M0 0 C-14 -16 -20 -2 -8 4 C-16 10 -6 16 0 4 Z" fill="' + colour + '" stroke="#1f1a1c" stroke-width="1.2" stroke-linejoin="round"/></g>' +
      '<g class="wing wing--r"><path d="M0 0 C14 -16 20 -2 8 4 C16 10 6 16 0 4 Z" fill="' + colour + '" stroke="#1f1a1c" stroke-width="1.2" stroke-linejoin="round"/></g>' +
      '<path d="M0 -4 V8 M0 -4 l-3 -5 M0 -4 l3 -5" stroke="#1f1a1c" stroke-width="1.2" fill="none" stroke-linecap="round"/></g></g>';
  }

  function twinkles() {
    var s = '';
    for (var i = 0; i < 16; i++) {
      s += '<text x="' + f(rand(40, 1400)) + '" y="' + f(rand(30, 190)) + '" class="twinkle" fill="' + (i % 3 ? '#c39a50' : '#f2a7bb') + '" font-size="' + f(rand(10, 20)) + '" style="animation-delay:' + f(rand(0, 4)) + 's;animation-duration:' + f(rand(2.4, 4)) + 's">✦</text>';
    }
    return s;
  }

  function buildScene() {
    var scene = document.getElementById('scene');
    var birds = flyingBird(110, 1, 26, -4, '#9cc3e6') + flyingBird(70, .8, 32, -18, true) + flyingBird(150, .7, 29, -11, '#9cc3e6') +
      flyingBird(96, .65, 36, -27, true) + flyingBird(180, .55, 40, -8, false);
    var flutter = butterfly(520, 330, '#c9b6ec', 9, 0) + butterfly(930, 360, '#f2a7bb', 11, -3) + butterfly(330, 470, '#ffe39a', 10, -6) + butterfly(1150, 420, '#9cc3e6', 12, -2);
    scene.innerHTML =
      '<defs><filter id="wobble" filterUnits="userSpaceOnUse" x="-700" y="-60" width="2840" height="1600">' +
        '<feTurbulence id="wobbleNoise" type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="1" result="noise"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="noise" scale="2.6" xChannelSelector="R" yChannelSelector="G"/>' +
      '</filter></defs>' +
      '<g filter="url(#wobble)">' +
        twinkles() +
        cloud(0, 60, 1.6, 120, -30) + cloud(0, 150, 1.1, 150, -95) + cloud(0, 230, 1.3, 135, -60) +
        tree(-60, GROUND, 80) + tree(1520, GROUND, 84) +
        street() +
        perchedBird(363, 206, false, 0) + perchedBird(560, 214, true, 2.2) + perchedBird(1090, 84, false, 3.6) + perchedBird(220, 182, true, 1.3) + perchedBird(1380, 272, false, 4.4) +
        ground() +
        walker() +
        notes() + flutter +
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
    // phones: the whole street becomes a swipeable panorama, starting on the pink shop
    var centred = false;
    function fit() {
      var r = wrap.getBoundingClientRect();
      if (window.innerWidth <= 760) {
        wrap.classList.add('pan');
        scene.setAttribute('preserveAspectRatio', 'xMidYMax meet');
        scene.style.width = Math.round(r.height * 1440 / 760) + 'px';
        if (!centred) { wrap.scrollLeft = (scene.getBoundingClientRect().width - r.width) / 2; centred = true; }
      } else {
        wrap.classList.remove('pan');
        scene.style.width = '';
        scene.setAttribute('preserveAspectRatio', r.width / r.height < 1.25 ? 'xMidYMax slice' : 'xMidYMax meet');
      }
    }
    fit();
    window.addEventListener('resize', fit);
    var swipeHint = document.getElementById('swipeHint');
    // only a real finger (or trackpad) swipe hides the hint, not our own centring or peek
    ['touchstart', 'wheel'].forEach(function (evt) {
      wrap.addEventListener(evt, function () { document.body.classList.add('swiped'); }, { passive: true });
    });
    // a little "peek" so people know the street moves, then back to the shop
    window.peekStreet = function () {
      if (!wrap.classList.contains('pan') || reduceMotion || document.body.classList.contains('swiped')) return;
      var start = wrap.scrollLeft;
      wrap.scrollTo({ left: start + 140, behavior: 'smooth' });
      setTimeout(function () { wrap.scrollTo({ left: start, behavior: 'smooth' }); }, 900);
    };

    // gently "boiling" pen lines while the façade is on screen
    if (!reduceMotion && !window.matchMedia('(hover: none)').matches) {
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

  // a little Marisa in each section, dressed for the job
  document.querySelectorAll('[data-persona]').forEach(function (svg) {
    svg.innerHTML = '<path d="M-70 138 H70" stroke="#1f1a1c" stroke-width="1.4" opacity=".35"/>' + persona(svg.getAttribute('data-persona'));
  });

  // the welcome letter's portrait: Marisa and her bulldog walking on the spot
  var portrait = document.getElementById('portraitScene');
  if (portrait) {
    portrait.innerHTML =
      '<rect x="-60" y="560" width="260" height="130" fill="#fbe1e8"/>' +
      '<circle cx="110" cy="586" r="12" fill="#fff3c4" class="lamp"/>' +
      '<rect x="-60" y="' + (GROUND + 30) + '" width="260" height="40" fill="#f4e8e0"/>' +
      '<path d="M-60 ' + (GROUND + 30) + ' H200" class="line"/>' +
      walkerParts();
  }

  /* ---------- Curtains + key tag ---------- */
  var opened = false;
  function checkIn() {
    if (opened) return;
    opened = true;
    document.body.classList.add('show');
    document.body.classList.remove('locked');
    if (!reduceMotion) sparkleBurst(window.innerWidth / 2, window.innerHeight * 0.4, 36);
    setTimeout(function () { if (window.peekStreet) window.peekStreet(); }, 2600);
  }

  // a puff of fairy dust, used when the curtains open
  function sparkleBurst(x, y, count, spread) {
    spread = spread || 1;
    var tints = ['#f2a7bb', '#c39a50', '#c9b6ec', '#9cc3e6', '#d9587b'];
    for (var i = 0; i < count; i++) {
      var s = document.createElement('span');
      var a = Math.random() * Math.PI * 2, d = (80 + Math.random() * 260) * spread;
      s.className = 'dust dust--burst';
      s.textContent = Math.random() < 0.7 ? '✦' : '♡';
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      s.style.color = tints[i % tints.length];
      s.style.setProperty('--dx', Math.cos(a) * d + 'px');
      s.style.setProperty('--dy', Math.sin(a) * d + 'px');
      s.style.animationDelay = Math.random() * 0.4 + 's';
      document.body.appendChild(s);
      setTimeout(function (el) { el.remove(); }.bind(null, s), 2200);
    }
  }

  // the welcome line writes itself in, letter by letter
  var once = document.getElementById('onceUpon');
  var onceText = once.textContent;
  once.setAttribute('aria-label', onceText);
  once.textContent = '';
  onceText.split('').forEach(function (ch, i) {
    var sp = document.createElement('span');
    sp.className = 'ink-letter';
    sp.setAttribute('aria-hidden', 'true');
    sp.textContent = ch;
    sp.style.transitionDelay = (0.9 + i * 0.07) + 's';
    once.appendChild(sp);
  });

  // touch screens: a little sprinkle of fairy dust wherever you tap
  if (!reduceMotion) {
    var lastTap = 0;
    window.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'touch' || Date.now() - lastTap < 250) return;
      lastTap = Date.now();
      sparkleBurst(e.clientX, e.clientY, 9, 0.25);
    }, { passive: true });
  }

  // fairy dust follows the mouse
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    var lastDust = 0;
    window.addEventListener('pointermove', function (e) {
      var now = Date.now();
      if (now - lastDust < 60) return;
      lastDust = now;
      var s = document.createElement('span');
      s.className = 'dust';
      s.textContent = Math.random() < 0.8 ? '✦' : '♡';
      s.style.left = e.clientX + rand(-6, 6) + 'px';
      s.style.top = e.clientY + rand(-6, 6) + 'px';
      s.style.color = ['#f2a7bb', '#c39a50', '#c9b6ec', '#9cc3e6'][Math.floor(Math.random() * 4)];
      document.body.appendChild(s);
      setTimeout(function () { s.remove(); }, 1000);
    });
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

  /* ---------- Window displays: curtains part as they scroll into view, tap to toggle ---------- */
  var displays = document.querySelectorAll('.display');
  displays.forEach(function (d) {
    d.addEventListener('click', function () { d.classList.toggle('open'); });
  });
  if ('IntersectionObserver' in window) {
    var displayIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
        setTimeout(function () { e.target.classList.add('open'); }, 400 + i * 350);
        displayIO.unobserve(e.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -30% 0px' });
    displays.forEach(function (d) { displayIO.observe(d); });
  } else {
    displays.forEach(function (d) { d.classList.add('open'); });
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

  /* ---------- Say hi: "Which Marisa are you looking for?" quiz ---------- */
  var QUIZ = {
    strategist: { title: 'the strategist', line: "Pull up a chair. Let's talk process, people and the problems worth eliminating. I'll bring the coffee.", cta: "Let's talk shop" },
    maker: { title: 'the maker', line: "Monograms, baby gifts, cocktail napkins... if it holds still long enough, I'll stitch it.", cta: 'Start a custom order ↗', persona: 'stitches' },
    storyteller: { title: 'the storyteller', line: "Congratulations!! Let's tell your love story, word for word.", cta: 'Officiate my wedding ↗', persona: 'ido' }
  };
  QUIZ.strategist.persona = 'office';
  var quizQ = document.getElementById('quizQ'), quizResult = document.getElementById('quizResult');
  if (quizQ) {
    var cta = document.getElementById('quizCta');
    quizQ.querySelectorAll('.quiz__a').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var key = btn.dataset.result, r = QUIZ[key];
        var link = document.querySelector('[data-quiz-link="' + key + '"]');
        document.getElementById('quizPersona').innerHTML = '<path d="M-70 138 H70" stroke="#1f1a1c" stroke-width="1.4" opacity=".35"/>' + persona(r.persona);
        document.getElementById('quizTitle').textContent = r.title + '!!';
        document.getElementById('quizLine').textContent = r.line;
        cta.textContent = r.cta;
        cta.href = link.getAttribute('href');
        if (link.target) { cta.target = '_blank'; cta.rel = 'noopener'; } else { cta.removeAttribute('target'); cta.removeAttribute('rel'); }
        quizResult.className = 'quiz__result quiz__result--' + key;
        quizQ.hidden = true;
        quizResult.hidden = false;
        if (!reduceMotion) {
          var box = btn.getBoundingClientRect();
          sparkleBurst(box.left + box.width / 2, box.top + box.height / 2, 24, 0.6);
        }
        cta.focus({ preventScroll: true });
      });
    });
    document.getElementById('quizAgain').addEventListener('click', function () {
      quizResult.hidden = true;
      quizQ.hidden = false;
      quizQ.querySelector('.quiz__a').focus();
    });
  }

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
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 0.12 + 's';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();
