/* Protonic Precision 3D viewer: a machined challenge coin and a Ti-22 can.
   Needs three.js r128 (window.THREE) and window.PP_DATA {glyphs, mark}. */
window.ProtonicViewer = function (canvas, opts) {
  opts = opts || {};
  var T = window.THREE, D = window.PP_DATA;
  var renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, preserveDrawingBuffer: !!opts.preserve });
  renderer.setPixelRatio(opts.pixelRatio || Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = T.sRGBEncoding;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x000000, 0);
  var aniso = renderer.capabilities.getMaxAnisotropy();
  var scene = new T.Scene();
  var camera = new T.PerspectiveCamera(24, 1.6, 0.1, 100);
  function lin(hex) { return new T.Color(hex).convertSRGBToLinear(); }

  // Studio environment: dark room with strip softboxes, so metal has something to reflect.
  (function () {
    var env = new T.Scene();
    env.add(new T.Mesh(new T.BoxGeometry(30, 30, 30), new T.MeshBasicMaterial({ color: 0x1b1d20, side: T.BackSide })));
    function box(w, h, pos, k, col) {
      var m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(col || 0xffffff).multiplyScalar(k), side: T.DoubleSide }));
      m.position.set(pos[0], pos[1], pos[2]); m.lookAt(0, 0, 0); env.add(m);
    }
    box(20, 4, [0, 12, 3], 9);
    box(6, 16, [-12, 2, 6], 5);
    box(3, 14, [12, 1, -1], 4);
    box(16, 4, [0, -8, 11], 0.9);
    box(10, 8, [3, 4, 13], 0.9);
    box(8, 8, [7, 7, -12], 2.4, 0xffe4cc);
    var pm = new T.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(env, 0.025).texture;
    pm.dispose();
  })();

  var key = new T.DirectionalLight(0xffffff, 1.1); key.position.set(-4, 6, 8); scene.add(key);
  var rim = new T.DirectionalLight(0xffffff, 0.7); rim.position.set(6, 2, -4); scene.add(rim);
  var M = {
    ti: new T.MeshPhysicalMaterial({ color: lin(0xD2D4D6), roughness: 0.3, metalness: 1 }),
    cera: new T.MeshPhysicalMaterial({ color: lin(0x15171A), roughness: 0.62, metalness: 0.1 }),
    red: new T.MeshPhysicalMaterial({ color: lin(0xC41822), roughness: 0.42, metalness: 0.1, clearcoat: 0.25, clearcoatRoughness: 0.25 }),
    dark: new T.MeshStandardMaterial({ color: lin(0x050506), roughness: 0.9, metalness: 0.1 })
  };

  // Laser engraving: the coating is burned off to bare titanium, so color, roughness and metalness all change.
  function engraved(w, h, draw) {
    var a = document.createElement('canvas'); a.width = w; a.height = h;
    var b = document.createElement('canvas'); b.width = w; b.height = h;
    var ga = a.getContext('2d'), gb = b.getContext('2d');
    ga.fillStyle = '#15171A'; ga.fillRect(0, 0, w, h);
    gb.fillStyle = 'rgb(0,158,26)'; gb.fillRect(0, 0, w, h);        // G = roughness .55, B = metalness .1
    draw(ga, '#B4B7BA'); draw(gb, 'rgb(0,115,140)');                 // engraved: frosted bare metal, rough .45, metal .55
    var map = new T.CanvasTexture(a); map.encoding = T.sRGBEncoding; map.anisotropy = aniso;
    var rm = new T.CanvasTexture(b); rm.anisotropy = aniso;
    return new T.MeshPhysicalMaterial({ map: map, roughnessMap: rm, metalnessMap: rm, roughness: 1, metalness: 1 });
  }
  function glyphPaths(face) {
    var t = {}; for (var c in D.glyphs[face]) t[c] = { w: D.glyphs[face][c].w, p: new Path2D(D.glyphs[face][c].d) }; return t;
  }
  var BOLD = glyphPaths('bold'), MED = glyphPaths('med');
  var P_PATH = new Path2D(D.mark.p), PLUS_PATH = new Path2D(D.mark.plus);
  var WORD_PATH = new Path2D(D.lockup.word), SUB_PATH = new Path2D(D.lockup.sub);

  // Profile of revolution, split into faces so every edge stays crisp.
  function lathe(group, pts, mats, seg) {
    for (var i = 0; i < pts.length - 1; i++) {
      var mat = mats[i]; if (!mat) continue;
      var g = new T.LatheGeometry([new T.Vector2(pts[i][0], pts[i][1]), new T.Vector2(pts[i + 1][0], pts[i + 1][1])], seg || 160);
      group.add(new T.Mesh(g, mat));
    }
  }

  // ---------- Challenge coin ----------
  function buildCoin() {
    var root = new T.Group(), body = new T.Group();
    var R = 1.5, rimIn = 1.33, top = 0.07, rimTop = 0.11, bot = -0.11;
    lathe(body, [[0, bot], [R - 0.04, bot], [R, bot + 0.04], [R, rimTop - 0.03], [R - 0.03, rimTop], [rimIn + 0.025, rimTop], [rimIn, top]],
      [M.ti, M.ti, M.ti, M.ti, M.ti, M.ti]);
    body.rotation.x = Math.PI / 2;                       // lathe Y -> world Z (coin faces the camera)
    root.add(body);
    var N = 2048, px = N / (2 * rimIn);
    var field = engraved(N, N, function (g, fill) {
      g.save(); g.fillStyle = fill; g.translate(N / 2, N / 2);
      var cap = 0.17 * px, sc = cap / 100, gap = 26;
      function arc(text, face, rBase, center, dir) {
        var total = 0; for (var i = 0; i < text.length; i++) total += face[text[i]].w + (i ? gap : 0);
        var rMid = rBase + cap / 2, ang = center - dir * (total * sc / rMid) / 2, run = 0;
        for (var j = 0; j < text.length; j++) {
          var gl = face[text[j]], a = ang + dir * ((run + gl.w / 2) * sc) / rMid;
          g.save(); g.rotate(a); g.translate(dir > 0 ? rBase : rBase + cap, 0); g.rotate(dir > 0 ? Math.PI / 2 : -Math.PI / 2);
          g.scale(sc, sc); g.translate(-gl.w / 2, dir > 0 ? -100 : -100); g.fill(gl.p, 'evenodd'); g.restore();
          run += gl.w + gap;
        }
      }
      // top legend reads clockwise with letter tops outward; bottom legend reads left to right with tops inward
      arc('PROTONIC', BOLD, 1.0 * px, -Math.PI / 2, 1);
      arc('PRECISION', MED, 1.0 * px, Math.PI / 2, -1);
      [0, Math.PI].forEach(function (a) {
        g.save(); g.rotate(a); g.translate(1.09 * px, 0); var s = 0.06 * px / 88; g.scale(s, s); g.translate(-156, 6); g.fill(PLUS_PATH, 'evenodd'); g.restore();
      });
      g.beginPath(); g.arc(0, 0, 0.93 * px, 0, Math.PI * 2); g.lineWidth = 0.008 * px; g.strokeStyle = fill; g.stroke();
      g.restore();
    });
    var disc = new T.Mesh(new T.CircleGeometry(rimIn, 160), field);
    disc.position.z = top; root.add(disc);
    // raised mark: titanium p, red-anodized plus
    var s = 0.0062, cx = 100, cy = 50;
    function P(x, y) { return [(x - cx) * s, -(y - cy) * s]; }
    var shp = new T.Shape(), q;
    q = P(0, 150); shp.moveTo(q[0], q[1]); q = P(0, 0); shp.lineTo(q[0], q[1]); q = P(20, 0); shp.lineTo(q[0], q[1]); q = P(20, 10); shp.lineTo(q[0], q[1]);
    var c0 = P(50, 50), a0 = Math.atan2(40, -30);
    shp.absarc(c0[0], c0[1], 50 * s, a0, -a0, true);
    q = P(20, 150); shp.lineTo(q[0], q[1]); shp.closePath();
    var hole = new T.Path(); hole.absarc(c0[0], c0[1], 30 * s, 0, Math.PI * 2, true); shp.holes.push(hole);
    var ex = { depth: 0.05, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.006, bevelSegments: 3, curveSegments: 64 };
    var pm = new T.Mesh(new T.ExtrudeGeometry(shp, ex), M.ti); pm.position.z = top; root.add(pm);
    var pl = D.markPlus, h = pl.size / 2, qq = pl.t / 2, gg = pl.gap / 2;
    [[pl.cx - qq, pl.cy - h, pl.cx + qq, pl.cy - gg], [pl.cx - qq, pl.cy + gg, pl.cx + qq, pl.cy + h],
     [pl.cx - h, pl.cy - qq, pl.cx - gg, pl.cy + qq], [pl.cx + gg, pl.cy - qq, pl.cx + h, pl.cy + qq]].forEach(function (r) {
      var a = P(r[0], r[1]), b = P(r[2], r[3]), sh = new T.Shape();
      sh.moveTo(a[0], a[1]); sh.lineTo(b[0], a[1]); sh.lineTo(b[0], b[1]); sh.lineTo(a[0], b[1]); sh.closePath();
      var m = new T.Mesh(new T.ExtrudeGeometry(sh, ex), M.red); m.position.z = top; root.add(m);
    });
    return root;
  }

  // ---------- Ti-22 can (styling study, inches) ----------
  function buildCan() {
    var root = new T.Group(), spin = new T.Group();
    var r = 0.5, tA = -2.19, tB = 2.20;
    var pts = [[0, -2.40], [0.255, -2.40], [0.255, -2.70], [0.44, -2.70], [0.50, -2.64], [0.50, -2.25],
      [0.485, -2.235], [0.485, -2.205], [0.50, tA], [0.50, tB], [0.485, 2.215], [0.485, 2.245], [0.50, 2.26],
      [0.50, 2.62], [0.45, 2.70], [0.15, 2.70], [0.13, 2.68], [0.13, 1.6], [0, 1.6]];
    var mats = [M.dark, M.dark, M.cera, M.ti, M.cera, M.dark, M.dark, M.dark, null, M.dark, M.dark, M.dark, M.cera, M.ti, M.cera, M.ti, M.dark, M.dark];
    lathe(spin, pts, mats, 192);
    var len = tB - tA, W = 2048, H = Math.round(W * len / (2 * Math.PI * r)), ppi = H / len;
    var tube = engraved(W, H, function (g, fill) {
      g.fillStyle = fill;
      // Side A (u = .25): horizontal lockup, reading rear to muzzle
      var s = 2.7 * ppi / 1208;
      g.save(); g.translate(0.25 * W, H * 0.5); g.rotate(-Math.PI / 2); g.scale(s, s); g.translate(-604, -50);
      g.fill(P_PATH, 'evenodd'); g.fill(PLUS_PATH, 'evenodd'); g.translate(260, 0); g.fill(WORD_PATH, 'evenodd');
      g.translate(0, 150 - 100 * D.lockup.subScale); g.scale(D.lockup.subScale, D.lockup.subScale); g.fill(SUB_PATH, 'evenodd');
      g.restore();
      // Side B (u = .75): model and the required marking block
      g.save(); g.translate(0.75 * W, H * 0.5); g.rotate(-Math.PI / 2);
      var mono = '"IBM Plex Mono", ui-monospace, Menlo, monospace', disp = '"Archivo", Arial, sans-serif';
      g.textBaseline = 'alphabetic'; g.textAlign = 'left';
      var x0 = -1.35 * ppi;
      g.font = '800 expanded ' + Math.round(0.36 * ppi) + 'px ' + disp;   // setting font resets fontStretch, so set it after
      try { g.fontStretch = 'expanded'; } catch (e) {}
      g.fillText('Ti-22', x0, -0.02 * ppi);
      try { g.fontStretch = 'normal'; } catch (e) {}
      g.font = '500 ' + Math.round(0.085 * ppi) + 'px ' + mono;
      var lines = ['PROTONIC PRECISION  CITY, ST', 'MODEL Ti-22   CAL .22 LR', 'SN PT000001'];
      lines.forEach(function (t, i) { g.fillText(t, x0 + 1.33 * ppi, -0.26 * ppi + i * 0.13 * ppi); });
      g.fillRect(x0 + 1.12 * ppi + 0.08 * ppi, -0.36 * ppi, 0.012 * ppi, 0.4 * ppi);
      g.restore();
    });
    var cyl = new T.Mesh(new T.CylinderGeometry(r, r, len, 256, 1, true), tube);
    cyl.position.y = (tA + tB) / 2; spin.add(cyl);
    [0, Math.PI].forEach(function (a) {
      var h = new T.Mesh(new T.CircleGeometry(0.035, 32), M.dark);
      h.rotation.x = -Math.PI / 2; h.position.set(Math.cos(a) * 0.31, 2.701, Math.sin(a) * 0.31); spin.add(h);
    });
    var lay = new T.Group(); lay.rotation.z = -Math.PI / 2; lay.add(spin); root.add(lay);
    root.userData.spin = spin;
    return root;
  }

  var models = { coin: null, can: null }, mode = null;
  var yaw = 0, pitch = 0, vel = 0, dragging = false, lastX = 0, lastY = 0;
  var cfg = {
    coin: { dist: 9.2, tilt: -0.12, yaw0: -0.5 },
    can: { dist: 11.5, tilt: 0.16, yaw0: -Math.PI / 2 }
  };
  function setMode(m) {
    if (!models[m]) { models[m] = m === 'coin' ? buildCoin() : buildCan(); scene.add(models[m]); }
    for (var k in models) if (models[k]) models[k].visible = (k === m);
    mode = m; yaw = cfg[m].yaw0; pitch = 0;
    camera.position.set(0, 0.2, cfg[m].dist); camera.lookAt(0, 0, 0);
    render();
  }
  function pose() {
    var o = models[mode]; if (!o) return;
    if (mode === 'coin') { o.rotation.set(cfg.coin.tilt + pitch, yaw, 0); }
    else { o.rotation.set(cfg.can.tilt + pitch, -0.38, 0.06); o.userData.spin.rotation.y = yaw; }
  }
  function render() { pose(); renderer.render(scene, camera); }
  function resize(w, h) { renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); render(); }

  var running = false, auto = opts.autoRotate !== false;
  function loop() {
    if (!running) return;
    if (!dragging) { yaw += auto ? 0.0042 + vel : vel; vel *= 0.94; }
    render(); requestAnimationFrame(loop);
  }
  function start() { if (!running && !opts.still) { running = true; requestAnimationFrame(loop); } }
  function stop() { running = false; }
  if (!opts.still) {
    canvas.addEventListener('pointerdown', function (e) { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture(e.pointerId); vel = 0; });
    canvas.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
      yaw += dx * 0.01; vel = dx * 0.002; pitch = Math.max(-0.5, Math.min(0.5, pitch + dy * 0.006));
      if (!running) render();
    });
    ['pointerup', 'pointercancel'].forEach(function (t) { canvas.addEventListener(t, function () { dragging = false; }); });
  }
  return { setMode: setMode, resize: resize, start: start, stop: stop, render: render,
    setYaw: function (y) { yaw = y; render(); }, setPitch: function (p) { pitch = p; render(); } };
};
