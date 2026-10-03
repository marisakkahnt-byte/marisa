// marisakahnt.com: The Marisa, a pen-and-ink hotel with curtains, birds, a dog walk and an elevator nav

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

  function scallopRoof(x0, x1, yTop, yBot, inset) {
    var s = '<path d="M' + x0 + ' ' + yBot + ' L' + (x0 + inset) + ' ' + yTop + ' H' + (x1 - inset) + ' L' + x1 + ' ' + yBot + ' Z" fill="#d7dde4" class="ink"/>';
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

  function hotel() {
    var s = '';
    // turrets
    [[300, 380], [1060, 1140]].forEach(function (t) {
      var cx = (t[0] + t[1]) / 2;
      s += '<rect x="' + t[0] + '" y="230" width="80" height="' + (GROUND - 230) + '" fill="#fbe9ea" class="ink"/>' +
        cone(cx, 230, 120, 50) + flag(cx, 74, '#f2a7bb') +
        '<path d="M' + (t[0] - 6) + ' 230 h92" class="ink"/>';
      [258, 352, 446].forEach(function (y) { s += win(cx, y, 30, 58); });
      s += win(cx, 560, 34, 70);
    });

    // main block + mansard roof with dormers
    s += scallopRoof(372, 1068, 168, 262, 36);
    [432, 520, 920, 1008].forEach(function (x) {
      s += '<path d="M' + (x - 22) + ' 236 V206 L' + x + ' 186 L' + (x + 22) + ' 206 V236 Z" fill="#fbe9ea" class="ink"/>' + win(x, 206, 22, 28);
    });
    s += '<rect x="380" y="262" width="680" height="' + (GROUND - 262) + '" fill="#fbe9ea" class="ink"/>';
    [262, 372, 470, 562].forEach(function (y) { s += '<path d="M376 ' + y + ' H1064 M376 ' + (y + 6) + ' H1064" class="hair"/>'; });

    // wing windows: three floors + ground floor shops with awnings
    [420, 490, 560, 880, 950, 1020].forEach(function (x) {
      s += win(x, 290, 40, 66) + win(x, 388, 40, 64, { flowers: true }) + win(x, 482, 40, 64) + win(x, 590, 42, 70, { awning: true });
    });

    // centre pavilion with clock and grand flag
    s += scallopRoof(604, 836, 104, 206, 34) +
      '<rect x="616" y="206" width="208" height="' + (GROUND - 206) + '" fill="#fdf1ef" class="ink"/>' +
      '<path d="M608 206 H832" class="ink"/>' +
      flag(720, 18, '#d9587b') +
      '<circle cx="720" cy="152" r="26" fill="#fffdf9" class="ink"/>' +
      '<circle cx="720" cy="152" r="21" fill="none" class="hair"/>' +
      '<line id="hourHand" x1="720" y1="152" x2="720" y2="139" class="line" style="stroke-width:2.6"/>' +
      '<line id="minuteHand" x1="720" y1="152" x2="720" y2="134" class="line"/>' +
      '<circle cx="720" cy="152" r="2.4" fill="#d9587b"/>';
    [670, 720, 770].forEach(function (x) { s += win(x, 232, 36, 64) + win(x, 336, 36, 70); });
    // balcony
    var rails = '';
    for (var bx = 640; bx <= 800; bx += 10) rails += 'M' + bx + ' 418 V436 ';
    s += '<path d="M632 412 H808 M632 418 H808 M632 436 H808 ' + rails + '" class="hair"/>';
    for (var px = 644; px <= 796; px += 19) s += '<circle cx="' + px + '" cy="410" r="4" fill="' + (px % 2 ? '#d9587b' : '#f2a7bb') + '" class="hair"/>';
    s += '<path d="M630 412 h180" class="line"/>';

    // grand entrance: arch, revolving door, canopy (links to the lobby)
    var revolve = '';
    for (var k = 0; k < 3; k++) revolve += '<rect class="revolve" x="' + (696 + k * 16) + '" y="574" width="14" height="80" fill="#fffaf3" stroke="#1f1a1c" stroke-width="1.2" style="animation-delay:-' + k + 's"/>';
    s += '<a href="#lobby" class="entrance" aria-label="Step into the lobby">' +
      '<path d="M664 ' + GROUND + ' V520 A56 56 0 0 1 776 520 V' + GROUND + ' Z" fill="#3a2f34" class="ink"/>' +
      '<path d="M676 ' + GROUND + ' V524 A44 44 0 0 1 764 524 V' + GROUND + '" fill="#f7e2c6" class="hair"/>' + revolve +
      '<path d="M690 574 H752 M690 654 H752" class="line"/>' +
      '<path class="canopy" d="M628 512 L650 490 H790 L812 512 Z" fill="#f2a7bb" style="transition:fill .3s" stroke="#1f1a1c" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<rect x="628" y="512" width="184" height="26" fill="#d9587b" class="ink"/>' +
      '<text x="720" y="531" text-anchor="middle" class="canopy-text">THE MARISA</text>';
    for (var sc = 0; sc < 8; sc++) s += '<path d="M' + (628 + sc * 23) + ' 538 a11.5 11.5 0 0 0 23 0" fill="' + (sc % 2 ? '#fff' : '#f2a7bb') + '" class="hair"/>';
    s += '<path d="M636 540 V' + GROUND + ' M804 540 V' + GROUND + '" class="line"/></a>' +
      '<rect x="652" y="' + (GROUND - 8) + '" width="136" height="8" fill="#fffaf3" class="hair"/>';
    return s + topiary(612) + topiary(828) + lampPost(590) + lampPost(850);
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
        '<g opacity=".55">' +
          '<rect x="-200" y="360" width="140" height="300" fill="#f3dfe2" class="hair"/><rect x="-40" y="420" width="110" height="240" fill="#f3dfe2" class="hair"/>' +
          '<rect x="1340" y="380" width="120" height="280" fill="#f3dfe2" class="hair"/><rect x="1480" y="430" width="140" height="230" fill="#f3dfe2" class="hair"/>' +
        '</g>' +
        tree(120, GROUND, 82) + tree(230, GROUND, 64) + tree(1230, GROUND, 70) + tree(1345, GROUND, 86) + tree(-40, GROUND, 74) + tree(1500, GROUND, 70) +
        hotel() +
        perchedBird(480, 168, false, 0) + perchedBird(960, 168, true, 2.2) + perchedBird(342, 120, false, 3.6) +
        ground() +
        walker() +
        birds +
      '</g>';

    // windows warm up when you click them
    scene.querySelectorAll('.pane').forEach(function (p) {
      p.addEventListener('click', function () { p.classList.toggle('lit'); });
    });

    // the clock on the pavilion tells the real time
    function setClock() {
      var now = new Date(), m = now.getMinutes(), h = now.getHours() % 12 + m / 60;
      document.getElementById('minuteHand').setAttribute('transform', 'rotate(' + m * 6 + ' 720 152)');
      document.getElementById('hourHand').setAttribute('transform', 'rotate(' + h * 30 + ' 720 152)');
    }
    setClock();
    setInterval(setClock, 30000);

    // keep the whole hotel in view on wide screens, crop to the centre on narrow ones
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

  /* ---------- Elevator: light up the floor you're on ---------- */
  var floorLinks = document.querySelectorAll('.floors a');
  var needle = document.getElementById('needle');
  var floors = ['lobby', 'office', 'stitches', 'ido', 'desk'];
  function setFloor(i) {
    floorLinks.forEach(function (a) { a.classList.toggle('active', +a.dataset.floor === i); });
    var angle = i < 0 ? -90 : -64 + i * 32;
    needle.style.setProperty('--needle', angle + 'deg');
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
