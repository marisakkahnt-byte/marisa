// marisakahnt.com: curtain intro, hand-drawn street scene, and all the little interactions

(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var GROUND = 560;

  document.getElementById('year').textContent = new Date().getFullYear();

  function rand(min, max) { return min + Math.random() * (max - min); }
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

  /* ---------- Scene pieces (SVG strings, viewBox 1440 x 700) ---------- */

  function cloud(x, y, scale, duration, delay) {
    var bumps = [[0, 0, 30], [32, -16, 36], [70, -6, 30], [98, 6, 22], [-26, 8, 22]];
    var outline = '', fill = '';
    bumps.forEach(function (b) {
      outline += '<circle cx="' + b[0] + '" cy="' + b[1] + '" r="' + (b[2] + 2) + '" fill="#3b2a36"/>';
      fill += '<circle cx="' + b[0] + '" cy="' + b[1] + '" r="' + b[2] + '" fill="#fff"/>';
    });
    return '<g class="cloud" style="animation-duration:' + duration + 's;animation-delay:' + delay + 's">' +
      '<g transform="translate(' + x + ' ' + y + ') scale(' + scale + ')">' + outline + fill + '</g></g>';
  }

  function sun() {
    var rays = '';
    for (var i = 0; i < 12; i++) {
      var a = i * Math.PI / 6;
      rays += '<line x1="' + (1330 + Math.cos(a) * 52) + '" y1="' + (90 + Math.sin(a) * 52) + '" x2="' +
        (1330 + Math.cos(a) * 72) + '" y2="' + (90 + Math.sin(a) * 72) + '"/>';
    }
    return '<g class="sunrays thin" style="stroke-width:4">' + rays + '</g>' +
      '<circle cx="1330" cy="90" r="40" fill="#ffe39a" class="ink"/>' +
      '<circle cx="1316" cy="84" r="4" fill="#3b2a36"/><circle cx="1344" cy="84" r="4" fill="#3b2a36"/>' +
      '<path d="M1318 100 q12 12 24 0" class="thin"/>' +
      '<circle cx="1306" cy="98" r="6" fill="#f7a8c4" opacity=".7"/><circle cx="1354" cy="98" r="6" fill="#f7a8c4" opacity=".7"/>';
  }

  function skyline() {
    var s = '';
    [[0, 330, 120], [110, 290, 90], [420, 300, 70], [960, 260, 80], [1150, 320, 90], [1340, 300, 100]].forEach(function (b) {
      s += '<rect x="' + b[0] + '" y="' + b[1] + '" width="' + b[2] + '" height="' + (GROUND - b[1]) + '" fill="#e3d7f5"/>';
    });
    return s;
  }

  function building(o) {
    var h = GROUND - o.top;
    var s = '<rect x="' + o.x + '" y="' + o.top + '" width="' + o.w + '" height="' + h + '" fill="' + o.fill + '" class="ink"/>';
    if (o.roof === 'peak') {
      s += '<path d="M' + (o.x - 12) + ' ' + o.top + ' L' + (o.x + o.w / 2) + ' ' + (o.top - 70) + ' L' + (o.x + o.w + 12) + ' ' + o.top + ' Z" fill="#e5527f" class="ink"/>' +
        '<circle cx="' + (o.x + o.w / 2) + '" cy="' + (o.top - 26) + '" r="14" fill="#cfe6fb" class="ink"/>';
    } else if (o.roof === 'dome') {
      s += '<path d="M' + (o.x + 20) + ' ' + o.top + ' A' + (o.w / 2 - 20) + ' ' + (o.w / 2 - 20) + ' 0 0 1 ' + (o.x + o.w - 20) + ' ' + o.top + ' Z" fill="#ef6fa0" class="ink"/>' +
        '<line x1="' + (o.x + o.w / 2) + '" y1="' + (o.top - o.w / 2 + 20) + '" x2="' + (o.x + o.w / 2) + '" y2="' + (o.top - o.w / 2) + '" class="thin" style="stroke-width:4"/>' +
        '<circle cx="' + (o.x + o.w / 2) + '" cy="' + (o.top - o.w / 2 - 6) + '" r="7" fill="#ffe39a" class="ink" style="stroke-width:3"/>';
    } else if (o.roof === 'tower') {
      var tx = o.x + o.w - 80;
      s += '<line x1="' + (tx + 6) + '" y1="' + o.top + '" x2="' + (tx + 6) + '" y2="' + (o.top - 26) + '" class="thin"/>' +
        '<line x1="' + (tx + 44) + '" y1="' + o.top + '" x2="' + (tx + 44) + '" y2="' + (o.top - 26) + '" class="thin"/>' +
        '<rect x="' + tx + '" y="' + (o.top - 70) + '" width="50" height="46" rx="6" fill="#e8a87c" class="ink"/>' +
        '<path d="M' + (tx - 6) + ' ' + (o.top - 70) + ' L' + (tx + 25) + ' ' + (o.top - 98) + ' L' + (tx + 56) + ' ' + (o.top - 70) + ' Z" fill="#b8305d" class="ink"/>';
    }
    s += '<rect x="' + (o.x - 8) + '" y="' + (o.top - 4) + '" width="' + (o.w + 16) + '" height="14" rx="5" fill="#fff8f0" class="ink" style="stroke-width:3"/>';

    var margin = 22, gap = 18, ww = (o.w - margin * 2 - gap * (o.cols - 1)) / o.cols;
    for (var r = 0; r < o.rows; r++) {
      if (r === o.signRow) continue;
      for (var c = 0; c < o.cols; c++) {
        var wx = o.x + margin + c * (ww + gap), wy = o.top + 34 + r * 62;
        var roll = Math.random();
        var cls = 'win ink' + (roll < 0.25 ? ' lit' : roll < 0.4 ? ' flicker' : '');
        var delay = roll < 0.4 ? ' style="stroke-width:3;animation-delay:' + rand(0, 6).toFixed(1) + 's"' : ' style="stroke-width:3"';
        s += '<rect x="' + wx + '" y="' + wy + '" width="' + ww + '" height="40" rx="6" fill="#cfe6fb" class="' + cls + '"' + delay + '/>' +
          '<line x1="' + (wx + ww / 2) + '" y1="' + wy + '" x2="' + (wx + ww / 2) + '" y2="' + (wy + 40) + '" class="thin" style="pointer-events:none"/>';
      }
    }
    if (o.door) {
      var dx = o.x + o.w / 2 - 22;
      s += '<path d="M' + dx + ' ' + GROUND + ' V' + (GROUND - 56) + ' a22 22 0 0 1 44 0 V' + GROUND + ' Z" fill="' + o.door + '" class="ink" style="stroke-width:3"/>';
    }
    // each building is a little storefront for one part of the site
    if (o.sign) {
      var sy = o.top + 34 + o.signRow * 62 - 4;
      s += '<g class="bld-sign"><rect x="' + (o.x + 14) + '" y="' + sy + '" width="' + (o.w - 28) + '" height="48" rx="24" fill="#fff8f0" class="ink" style="stroke-width:3"/>' +
        '<text x="' + (o.x + o.w / 2) + '" y="' + (sy + 33) + '" text-anchor="middle" class="bld-text" style="fill:' + o.signInk + '">' + o.sign + '</text></g>';
    }
    if (o.href) {
      s = '<a href="' + o.href + '" class="bld-link" aria-label="' + o.label + '">' + s + '</a>';
    }
    return s;
  }

  function wisteria() {
    var colours = ['#b79ce0', '#c9b6ec', '#9f84d6', '#d8c8f2'];
    var s = '<path d="M462 240 Q 520 252 580 240 T 700 242 T 820 240 T 978 242" class="thin" style="stroke:#5f9a52;stroke-width:5"/>';
    for (var x = 478; x <= 962; x += 22) {
      var len = Math.round(rand(2, 5));
      var bunch = '';
      for (var i = 0; i < len; i++) {
        bunch += '<circle cx="' + (x + rand(-4, 4)).toFixed(1) + '" cy="' + (246 + i * 8) + '" r="' + (9 - i * 0.8).toFixed(1) + '" fill="' + pick(colours) + '"/>';
      }
      bunch += '<ellipse cx="' + (x + 8) + '" cy="244" rx="9" ry="5" fill="#8cc47a" transform="rotate(-25 ' + (x + 8) + ' 244)"/>';
      s += '<g class="wisteria" style="animation-delay:-' + rand(0, 3.5).toFixed(2) + 's">' + bunch + '</g>';
    }
    // a few long trails down the sides of the shop
    [474, 966].forEach(function (x) {
      var trail = '';
      for (var y = 250; y < 440; y += 12) {
        trail += '<circle cx="' + (x + rand(-6, 6)).toFixed(1) + '" cy="' + y + '" r="' + rand(6, 9).toFixed(1) + '" fill="' + pick(colours) + '"/>';
      }
      s += '<g class="wisteria" style="animation-delay:-' + rand(0, 3).toFixed(2) + 's">' + trail + '</g>';
    });
    return s;
  }

  function topiary(x) {
    return '<line x1="' + x + '" y1="515" x2="' + x + '" y2="470" class="thin" style="stroke-width:5"/>' +
      '<circle cx="' + x + '" cy="455" r="32" fill="#8cc47a" class="ink"/>' +
      '<circle cx="' + (x - 12) + '" cy="446" r="4" fill="#fff"/><circle cx="' + (x + 10) + '" cy="462" r="4" fill="#fff"/><circle cx="' + (x + 6) + '" cy="438" r="4" fill="#fff"/>' +
      '<path d="M' + (x - 22) + ' 512 H' + (x + 22) + ' L' + (x + 16) + ' 545 H' + (x - 16) + ' Z" fill="#e8a87c" class="ink"/>';
  }

  function awning(x, w) {
    var stripes = '', scallops = '';
    for (var i = 0; i < w; i += 20) {
      stripes += '<rect x="' + (x + i) + '" y="352" width="10" height="30" fill="#ef6fa0"/>';
    }
    for (var j = 0; j < w; j += 20) {
      scallops += '<path d="M' + (x + j) + ' 382 a10 10 0 0 0 20 0" fill="' + (j % 40 === 0 ? '#ef6fa0' : '#fff') + '" class="ink" style="stroke-width:3"/>';
    }
    return '<rect x="' + x + '" y="352" width="' + w + '" height="30" fill="#fff"/>' + stripes +
      '<rect x="' + x + '" y="352" width="' + w + '" height="30" fill="none" class="ink" style="stroke-width:3"/>' + scallops;
  }

  function shop() {
    var s = '<rect x="470" y="232" width="500" height="' + (GROUND - 232) + '" fill="#f7b5cc" class="ink"/>' +
      '<rect x="455" y="214" width="530" height="26" rx="8" fill="#fff0f5" class="ink"/>' +
      '<rect x="535" y="266" width="370" height="70" rx="35" fill="#fff8f0" class="ink"/>' +
      '<text x="720" y="316" text-anchor="middle" class="sign-text">marisa kahnt</text>';

    // shop windows with little displays
    s += awning(488, 160) + awning(792, 160);
    s += '<rect x="498" y="392" width="140" height="118" rx="8" fill="#cfe6fb" class="ink"/>' +
      '<rect x="530" y="462" width="76" height="34" rx="4" fill="#fff" class="ink" style="stroke-width:3"/>' +
      '<rect x="540" y="438" width="56" height="26" rx="4" fill="#f7a8c4" class="ink" style="stroke-width:3"/>' +
      '<circle cx="568" cy="430" r="8" fill="#e5527f" class="ink" style="stroke-width:3"/>' +
      '<line x1="498" y1="512" x2="638" y2="512" class="thin" style="stroke-width:6"/>';
    s += '<rect x="802" y="392" width="140" height="118" rx="8" fill="#cfe6fb" class="ink"/>' +
      '<rect x="826" y="414" width="92" height="66" rx="10" fill="#ef6fa0" class="ink" style="stroke-width:3"/>' +
      '<rect x="836" y="424" width="72" height="46" rx="8" fill="#fff8f0" class="ink" style="stroke-width:3"/>' +
      '<text x="872" y="453" text-anchor="middle" class="small-text">♡ hi ♡</text>' +
      '<line x1="802" y1="512" x2="942" y2="512" class="thin" style="stroke-width:6"/>';

    // arched door with fanlight; it swings open on hover
    s += '<path d="M655 545 V395 A65 65 0 0 1 785 395 V545 Z" fill="#fff0f5" class="ink"/>' +
      '<path d="M668 395 A52 52 0 0 1 772 395 Z" fill="#c9b6ec" class="ink" style="stroke-width:3"/>';
    for (var a = 1; a < 6; a++) {
      var ang = Math.PI + a * Math.PI / 6;
      s += '<line x1="720" y1="395" x2="' + (720 + Math.cos(ang) * 52).toFixed(1) + '" y2="' + (395 + Math.sin(ang) * 52).toFixed(1) + '" class="thin"/>';
    }
    s += '<g class="door-group" id="door">' +
      '<rect x="668" y="398" width="104" height="147" fill="#ffd9a8" class="ink" style="stroke-width:3"/>' +
      '<text x="720" y="480" text-anchor="middle" class="small-text" style="font-size:22px">come in!</text>' +
      '<g class="door">' +
        '<rect x="668" y="398" width="104" height="147" fill="#ef6fa0" class="ink" style="stroke-width:3"/>' +
        '<rect x="680" y="410" width="34" height="50" rx="3" fill="#f7a8c4" class="thin"/><rect x="726" y="410" width="34" height="50" rx="3" fill="#f7a8c4" class="thin"/>' +
        '<rect x="680" y="476" width="34" height="56" rx="3" fill="#f7a8c4" class="thin"/><rect x="726" y="476" width="34" height="56" rx="3" fill="#f7a8c4" class="thin"/>' +
        '<rect x="696" y="462" width="48" height="10" rx="3" fill="#f3c66b" class="thin"/>' +
        '<circle cx="760" cy="470" r="6" fill="#f3c66b" class="ink" style="stroke-width:3"/>' +
      '</g></g>' +
      '<rect x="640" y="545" width="160" height="15" fill="#fff0f5" class="ink" style="stroke-width:3"/>';

    // hearts drifting out of the door
    for (var h = 0; h < 3; h++) {
      s += '<text x="' + (700 + h * 18) + '" y="388" class="heart" fill="#ef6fa0" font-size="26" style="animation-delay:' + (h * 0.85) + 's">♥</text>';
    }
    return s + topiary(612) + topiary(828) + wisteria();
  }

  function street() {
    var dashes = '';
    for (var x = 20; x < 1440; x += 110) dashes += '<rect x="' + x + '" y="645" width="60" height="10" rx="5" fill="#fff"/>';
    return '<rect x="-10" y="' + GROUND + '" width="1460" height="40" fill="#f6e3ea" class="ink"/>' +
      '<rect x="-10" y="600" width="1460" height="110" fill="#a9adb8" class="ink"/>' + dashes;
  }

  function taxi() {
    var checks = '';
    for (var i = 0; i < 12; i++) {
      checks += '<rect x="' + (14 + i * 16) + '" y="' + (630 + (i % 2) * 6) + '" width="8" height="6" fill="#3b2a36"/>' +
        '<rect x="' + (14 + i * 16 + 8) + '" y="' + (630 + ((i + 1) % 2) * 6) + '" width="8" height="6" fill="#3b2a36"/>';
    }
    function wheel(cx) {
      return '<g class="wheel"><circle cx="' + cx + '" cy="668" r="20" fill="#3b2a36"/><circle cx="' + cx + '" cy="668" r="9" fill="#fff8f0"/>' +
        '<line x1="' + (cx - 9) + '" y1="668" x2="' + (cx + 9) + '" y2="668" class="thin" style="stroke-width:2"/></g>';
    }
    return '<g class="taxi"><g class="taxi__body">' +
      '<path d="M60 606 L90 566 H170 L204 606 Z" fill="#ffd84d" class="ink"/>' +
      '<path d="M78 604 L98 576 H128 V604 Z M138 604 V576 H164 L188 604 Z" fill="#cfe6fb" class="ink" style="stroke-width:3"/>' +
      '<rect x="112" y="550" width="40" height="16" rx="4" fill="#fff8f0" class="ink" style="stroke-width:3"/>' +
      '<text x="132" y="563" text-anchor="middle" style="font:700 12px Gaegu, cursive;fill:#3b2a36">taxi</text>' +
      '<path d="M8 650 V622 Q8 606 26 606 H222 Q244 608 244 630 V650 Q244 662 232 662 H20 Q8 662 8 650 Z" fill="#ffd84d" class="ink"/>' +
      checks +
      '<circle cx="236" cy="622" r="6" fill="#fff8f0" class="ink" style="stroke-width:2"/>' +
      '<rect x="4" y="618" width="10" height="10" rx="2" fill="#e5527f" class="ink" style="stroke-width:2"/>' +
      '</g>' + wheel(62) + wheel(190) + '</g>';
  }

  function buildScene() {
    var scene = document.getElementById('scene');
    scene.innerHTML =
      '<defs>' +
        '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcdcf7"/><stop offset="1" stop-color="#fde4ef"/></linearGradient>' +
        '<filter id="wobble" x="-2%" y="-2%" width="104%" height="104%">' +
          '<feTurbulence id="wobbleNoise" type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="1" result="noise"/>' +
          '<feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G"/>' +
        '</filter>' +
      '</defs>' +
      '<rect width="1440" height="700" fill="url(#sky)"/>' +
      '<g filter="url(#wobble)">' +
        sun() +
        cloud(0, 90, 1, 70, -10) + cloud(0, 160, .7, 90, -55) + cloud(0, 60, .8, 80, -35) +
        skyline() +
        building({ x: 10, top: 170, w: 240, fill: '#ffe39a', cols: 3, rows: 5, roof: 'tower', door: '#e8a87c',
          sign: 'the office', signRow: 4, signInk: '#3b2a36', href: '#work', label: 'The office: my professional side' }) +
        building({ x: 262, top: 290, w: 190, fill: '#c9b6ec', cols: 2, rows: 3, roof: 'peak', door: '#ef6fa0',
          sign: 'stitches ✂', signRow: 2, signInk: '#7a5cc2', href: '#stitches', label: 'Marisa Stitches' }) +
        building({ x: 990, top: 240, w: 200, fill: '#b8e6cf', cols: 2, rows: 4, roof: 'dome', door: '#bcd8f2',
          sign: 'i do ♡', signRow: 3, signInk: '#e5527f', href: '#ido', label: 'I Do by Marisa' }) +
        building({ x: 1205, top: 280, w: 230, fill: '#ffc9a8', cols: 3, rows: 3, roof: 'flat', door: '#c9b6ec',
          sign: 'say hi ✉', signRow: 2, signInk: '#3b2a36', href: '#contact', label: 'Say hi: contact me' }) +
        shop() +
        street() +
        taxi() +
      '</g>';

    // windows light up when you click them
    scene.querySelectorAll('.win').forEach(function (w) {
      w.addEventListener('click', function (e) { e.preventDefault(); w.classList.toggle('lit'); });
    });

    // knock on the door to come in
    var door = document.getElementById('door');
    door.addEventListener('click', function () {
      door.classList.add('open');
      setTimeout(function () {
        document.getElementById('about').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        door.classList.remove('open');
      }, 700);
    });

    // "boiling" hand-drawn lines: nudge the wobble noise a few times a second while the street is on screen
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
      }, 180);
    }
  }

  buildScene();

  /* ---------- Curtain intro ---------- */
  var opened = false;
  function openCurtains() {
    if (opened) return;
    opened = true;
    document.body.classList.add('show');
    document.body.classList.remove('locked');
  }

  var seen = false;
  try { seen = !!sessionStorage.getItem('mk-curtains'); sessionStorage.setItem('mk-curtains', '1'); } catch (e) {}
  if (reduceMotion || seen) {
    openCurtains();
  } else {
    document.body.classList.add('locked');
    window.scrollTo(0, 0);
    setTimeout(openCurtains, 5000);
  }
  document.getElementById('showtime').addEventListener('click', openCurtains);
  document.querySelectorAll('.curtain').forEach(function (c) { c.addEventListener('click', openCurtains); });

  // stagger the bouncing letters of the title
  document.querySelectorAll('.hello__title span').forEach(function (s, i) {
    s.style.animationDelay = (1.2 + i * 0.07) + 's, ' + (2.4 + i * 0.12) + 's';
  });

  /* ---------- Nav ---------- */
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ---------- About: click the pixel bubble for fun facts ---------- */
  var facts = [
    'me! click me to learn a little more about me! ♡',
    'fun fact: my favourite colour is pink (shocker) ♡',
    'i can doodle a taxi in under two minutes ☆',
    'currently obsessed with: wisteria & tiny doors ✿',
    'ok that\'s all for now, go say hi! ♡'
  ];
  var factIndex = 0;
  var funFact = document.getElementById('funFact');
  funFact.addEventListener('click', function () {
    factIndex = (factIndex + 1) % facts.length;
    funFact.textContent = facts[factIndex];
  });

  /* ---------- Services: tap a window to open the shutters ---------- */
  document.querySelectorAll('.window').forEach(function (w) {
    w.addEventListener('click', function () { w.classList.toggle('open'); });
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
    }, { threshold: 0.15 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.1 + 's';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Cursor sparkles ---------- */
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    var last = 0;
    var bits = ['♡', '✦', '✿', '☆'];
    var tints = ['#ef6fa0', '#c9b6ec', '#f3c13b', '#7fb8e6'];
    window.addEventListener('pointermove', function (e) {
      var now = Date.now();
      if (now - last < 70) return;
      last = now;
      var s = document.createElement('span');
      s.className = 'sparkle';
      s.textContent = pick(bits);
      s.style.left = e.clientX + rand(-6, 6) + 'px';
      s.style.top = e.clientY + rand(-6, 6) + 'px';
      s.style.color = pick(tints);
      document.body.appendChild(s);
      setTimeout(function () { s.remove(); }, 900);
    });
  }
})();
