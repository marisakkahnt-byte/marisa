// Page animations: envelope intro, falling petals, scroll reveals, card tilt

(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.getElementById('intro');
  var seal = document.getElementById('openEnvelope');
  var opened = false;

  document.getElementById('year').textContent = new Date().getFullYear();

  // Envelope intro — opens on click, or automatically after a few seconds
  function openEnvelope() {
    if (opened) return;
    opened = true;
    intro.classList.add('opening');
    setTimeout(function () {
      intro.classList.add('done');
      document.body.classList.remove('locked');
      document.body.classList.add('ready');
      if (!reduceMotion) startPetals();
    }, reduceMotion ? 0 : 2200);
  }

  try {
    if (reduceMotion || sessionStorage.getItem('etano-intro-seen')) {
      intro.classList.add('done');
      document.body.classList.add('ready');
      opened = true;
    } else {
      document.body.classList.add('locked');
      sessionStorage.setItem('etano-intro-seen', '1');
    }
  } catch (e) {
    document.body.classList.add('locked');
  }

  seal.addEventListener('click', openEnvelope);
  intro.addEventListener('click', openEnvelope);
  setTimeout(openEnvelope, 4500);

  // Falling petals — a short flurry after the envelope opens, then a gentle trickle
  var petals = document.getElementById('petals');
  function addPetal() {
    var p = document.createElement('span');
    p.className = 'petal';
    var duration = 6 + Math.random() * 6;
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = duration + 's';
    p.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
    p.style.setProperty('--spin', (Math.random() * 720 - 360) + 'deg');
    p.style.transform = 'scale(' + (0.6 + Math.random() * 0.7) + ')';
    petals.appendChild(p);
    setTimeout(function () { p.remove(); }, duration * 1000);
  }
  function startPetals() {
    for (var i = 0; i < 24; i++) setTimeout(addPetal, i * 120);
    setInterval(function () { if (!document.hidden) addPetal(); }, 4000);
  }

  // Nav background once the page scrolls
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Reveal elements as they scroll into view
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

  // Template cards: 3D tilt on mouse, tap to play the scroll preview on touch
  document.querySelectorAll('.card').forEach(function (card) {
    var browser = card.querySelector('.browser');
    if (!reduceMotion) {
      card.addEventListener('mousemove', function (e) {
        var r = browser.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        browser.style.transform = 'perspective(900px) rotateY(' + x * 10 + 'deg) rotateX(' + -y * 10 + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', function () { browser.style.transform = ''; });
    }
    card.addEventListener('click', function () { card.classList.toggle('playing'); });
  });
})();
