/* Home hero: Proton Adapt in black taking itself apart and going back together.
   Loads three.js after the page is up; until then (and without WebGL) the still render shows. */
(function () {
  var hero = document.querySelector('[data-explode]');
  if (!hero) return;
  var canvas = hero.querySelector('canvas'), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function load(src) { return new Promise(function (res, rej) { var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
  var fonts = document.fonts ? Promise.all([document.fonts.load('800 40px Archivo'), document.fonts.load('500 20px "IBM Plex Mono"')]) : Promise.resolve();
  var CFG = JSON.parse(hero.getAttribute('data-explode'));

  // One loop: hold together, come apart, hold apart, go back together.
  var HOLD0 = 1400, OUT = 2600, HOLD1 = 3200, IN = 2000, LOOP = HOLD0 + OUT + HOLD1 + IN;
  function phase(t) {
    t %= LOOP;
    if (t < HOLD0) return 0;
    if ((t -= HOLD0) < OUT) return t / OUT;
    if ((t -= OUT) < HOLD1) return 1;
    return 1 - (t - HOLD1) / IN;
  }

  Promise.all([load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'), load('/assets/js/pp-data.js'), fonts])
    .then(function () { return load('/assets/js/viewer.js'); })
    .then(function () {
      var v = window.ProtonicViewer(canvas, { still: true, fixedZoom: true, exposure: 1.05 });
      var narrow, w, h;
      function fit() {
        w = canvas.clientWidth; h = canvas.clientHeight; if (!w || !h) return;
        narrow = w < 700;
        v.setModel(Object.assign({}, CFG, { aspect: w / h, fill: narrow ? 1.04 : 1.1,
          pose: narrow ? { tilt: 0.1, yawRoot: -0.08, roll: Math.atan2(h, w) * 0.9, yaw0: CFG.yaw0 } : { tilt: 0.12, yawRoot: -0.06, roll: 0, yaw0: CFG.yaw0 } }));
        v.resize(w, h);
      }
      fit();
      var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(fit, 150); });
      hero.classList.add('is-live');
      var hold = /[?&]explode=([\d.]+)/.exec(location.search);  // ?explode=0.5 freezes a frame, for tuning
      if (reduce || hold) { v.setExplode(hold ? +hold[1] : 1); return; }

      // A little parallax from the pointer, eased.
      var tx = 0, ty = 0, px = 0, py = 0;
      hero.addEventListener('pointermove', function (e) { var b = hero.getBoundingClientRect(); tx = (e.clientX - b.left) / b.width - 0.5; ty = (e.clientY - b.top) / b.height - 0.5; });
      hero.addEventListener('pointerleave', function () { tx = ty = 0; });

      var on = true, t0 = performance.now();
      new IntersectionObserver(function (es) { on = es[0].isIntersecting; if (on) requestAnimationFrame(tick); }).observe(hero);
      function tick(now) {
        if (!on) return;
        px += (tx - px) * 0.05; py += (ty - py) * 0.05;
        v.setPitch(py * 0.12); v.setYaw(CFG.yaw0 + px * 0.18);
        v.setExplode(phase(now - t0));
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    })
    .catch(function () { /* the still render stays */ });
})();
