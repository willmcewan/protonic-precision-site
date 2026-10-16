/* Protonic 3D viewer: suppressors, mounts and the challenge coin, built from the brand's own geometry.
   Needs three.js r128 (window.THREE) and window.PP_DATA {glyphs, mark, markPlus, lockup}.
   Used live on product pages and headless by tools/render-images.mjs. */
(function () {
  var FINISH = {
    black: { color: 0x15171A, rough: 0.62, metal: 0.1 },
    fde: { color: 0x7A6648, rough: 0.66, metal: 0.08 },
    sand: { color: 0x8F7756, rough: 0.68, metal: 0.06, bare: '#6F7378' },
    tungsten: { color: 0x55595D, rough: 0.6, metal: 0.15 },
    nitride: { color: 0x1A1B1D, rough: 0.42, metal: 0.55 },
    stainless: { color: 0xB9BCBF, rough: 0.34, metal: 1 }
  };

  window.ProtonicViewer = function (canvas, opts) {
    opts = opts || {};
    var T = window.THREE, D = window.PP_DATA;
    var renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, preserveDrawingBuffer: !!opts.preserve });
    renderer.setPixelRatio(opts.pixelRatio || Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = opts.exposure || 1.0;
    renderer.setClearColor(0x000000, 0);
    var aniso = renderer.capabilities.getMaxAnisotropy();
    var scene = new T.Scene();
    var camera = new T.PerspectiveCamera(24, 1.6, 0.1, 100);
    function lin(hex) { return new T.Color(hex).convertSRGBToLinear(); }

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
    var rimL = new T.DirectionalLight(0xffffff, 0.7); rimL.position.set(6, 2, -4); scene.add(rimL);

    var M = {
      ti: new T.MeshPhysicalMaterial({ color: lin(0xD2D4D6), roughness: 0.3, metalness: 1 }),
      red: new T.MeshPhysicalMaterial({ color: lin(0xC41822), roughness: 0.42, metalness: 0.1, clearcoat: 0.25, clearcoatRoughness: 0.25 }),
      dark: new T.MeshStandardMaterial({ color: lin(0x050506), roughness: 0.9, metalness: 0.1 })
    };
    function finishMat(f) {
      var s = FINISH[f] || FINISH.black;
      return new T.MeshPhysicalMaterial({ color: lin(s.color), roughness: s.rough, metalness: s.metal });
    }
    function hex(n) { return '#' + ('000000' + n.toString(16)).slice(-6); }

    // Laser engraving burns the coating to bare metal: color, roughness and metalness all change.
    function engraved(w, h, f, draw) {
      var s = FINISH[f] || FINISH.black;
      var a = document.createElement('canvas'); a.width = w; a.height = h;
      var b = document.createElement('canvas'); b.width = w; b.height = h;
      var ga = a.getContext('2d'), gb = b.getContext('2d');
      ga.fillStyle = hex(s.color); ga.fillRect(0, 0, w, h);
      gb.fillStyle = 'rgb(0,' + Math.round(s.rough * 255) + ',' + Math.round(s.metal * 255) + ')'; gb.fillRect(0, 0, w, h);
      var bare = f === 'stainless' ? ['#7d8185', 'rgb(0,150,150)'] : [s.bare || '#B4B7BA', 'rgb(0,115,140)'];
      draw(ga, bare[0]); draw(gb, bare[1]);
      var map = new T.CanvasTexture(a); map.encoding = T.sRGBEncoding; map.anisotropy = aniso;
      var rm = new T.CanvasTexture(b); rm.anisotropy = aniso;
      return new T.MeshPhysicalMaterial({ map: map, roughnessMap: rm, metalnessMap: rm, roughness: 1, metalness: 1 });
    }
    function glyphPaths(face) { var t = {}; for (var c in D.glyphs[face]) t[c] = { w: D.glyphs[face][c].w, p: new Path2D(D.glyphs[face][c].d) }; return t; }
    var BOLD = glyphPaths('bold'), MED = glyphPaths('med');
    var P_PATH = new Path2D(D.mark.p), PLUS_PATH = new Path2D(D.mark.plus);
    var WORD_PATH = new Path2D(D.lockup.word), SUB_PATH = new Path2D(D.lockup.sub);

    function lathe(group, pts, mats, seg) {
      for (var i = 0; i < pts.length - 1; i++) {
        var mat = mats[i]; if (!mat) continue;
        var g = new T.LatheGeometry([new T.Vector2(pts[i][0], pts[i][1]), new T.Vector2(pts[i + 1][0], pts[i + 1][1])], seg || 160);
        group.add(new T.Mesh(g, mat));
      }
    }

    // ---------- challenge coin ----------
    function buildCoin() {
      var root = new T.Group(), body = new T.Group();
      var R = 1.5, rimIn = 1.33, top = 0.07, rimTop = 0.11, bot = -0.11;
      lathe(body, [[0, bot], [R - 0.04, bot], [R, bot + 0.04], [R, rimTop - 0.03], [R - 0.03, rimTop], [rimIn + 0.025, rimTop], [rimIn, top]],
        [M.ti, M.ti, M.ti, M.ti, M.ti, M.ti]);
      body.rotation.x = Math.PI / 2; root.add(body);
      var N = 2048, px = N / (2 * rimIn);
      var field = engraved(N, N, 'black', function (g, fill) {
        g.save(); g.fillStyle = fill; g.translate(N / 2, N / 2);
        var cap = 0.17 * px, sc = cap / 100, gap = 26;
        function arc(text, face, rBase, center, dir) {
          var total = 0; for (var i = 0; i < text.length; i++) total += face[text[i]].w + (i ? gap : 0);
          var rMid = rBase + cap / 2, ang = center - dir * (total * sc / rMid) / 2, run = 0;
          for (var j = 0; j < text.length; j++) {
            var gl = face[text[j]], a = ang + dir * ((run + gl.w / 2) * sc) / rMid;
            g.save(); g.rotate(a); g.translate(dir > 0 ? rBase : rBase + cap, 0); g.rotate(dir > 0 ? Math.PI / 2 : -Math.PI / 2);
            g.scale(sc, sc); g.translate(-gl.w / 2, -100); g.fill(gl.p, 'evenodd'); g.restore();
            run += gl.w + gap;
          }
        }
        arc('PROTONIC', BOLD, 1.0 * px, -Math.PI / 2, 1);
        arc('PRECISION', MED, 1.0 * px, Math.PI / 2, -1);
        [0, Math.PI].forEach(function (a) { g.save(); g.rotate(a); g.translate(1.09 * px, 0); var s = 0.06 * px / 88; g.scale(s, s); g.translate(-156, 6); g.fill(PLUS_PATH, 'evenodd'); g.restore(); });
        g.beginPath(); g.arc(0, 0, 0.93 * px, 0, Math.PI * 2); g.lineWidth = 0.008 * px; g.strokeStyle = fill; g.stroke();
        g.restore();
      });
      var disc = new T.Mesh(new T.CircleGeometry(rimIn, 160), field); disc.position.z = top; root.add(disc);
      addMark(root, 0.0062, top, M.ti);
      return root;
    }
    function addMark(root, s, z, mat) {
      var cx = 100, cy = 50;
      function P(x, y) { return [(x - cx) * s, -(y - cy) * s]; }
      var shp = new T.Shape(), q;
      q = P(0, 150); shp.moveTo(q[0], q[1]); q = P(0, 0); shp.lineTo(q[0], q[1]); q = P(20, 0); shp.lineTo(q[0], q[1]); q = P(20, 10); shp.lineTo(q[0], q[1]);
      var c0 = P(50, 50), a0 = Math.atan2(40, -30);
      shp.absarc(c0[0], c0[1], 50 * s, a0, -a0, true);
      q = P(20, 150); shp.lineTo(q[0], q[1]); shp.closePath();
      var hole = new T.Path(); hole.absarc(c0[0], c0[1], 30 * s, 0, Math.PI * 2, true); shp.holes.push(hole);
      var ex = { depth: 0.05, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.006, bevelSegments: 3, curveSegments: 64 };
      var pm = new T.Mesh(new T.ExtrudeGeometry(shp, ex), mat); pm.position.z = z; root.add(pm);
      var pl = D.markPlus, h = pl.size / 2, qq = pl.t / 2, gg = pl.gap / 2;
      [[pl.cx - qq, pl.cy - h, pl.cx + qq, pl.cy - gg], [pl.cx - qq, pl.cy + gg, pl.cx + qq, pl.cy + h],
       [pl.cx - h, pl.cy - qq, pl.cx - gg, pl.cy + qq], [pl.cx + gg, pl.cy - qq, pl.cx + h, pl.cy + qq]].forEach(function (r) {
        var a = P(r[0], r[1]), b = P(r[2], r[3]), sh = new T.Shape();
        sh.moveTo(a[0], a[1]); sh.lineTo(b[0], a[1]); sh.lineTo(b[0], b[1]); sh.lineTo(a[0], b[1]); sh.closePath();
        var m = new T.Mesh(new T.ExtrudeGeometry(sh, ex), M.red); m.position.z = z; root.add(m);
      });
    }

    // ---------- suppressor ----------
    // cfg: { r: radius in, L: overall length in, finish, model, cal }
    function buildCan(cfg) {
      var root = new T.Group(), spin = new T.Group();
      var r = cfg.r || 0.5, L = cfg.L || 5.4, y0 = -L / 2, y1 = L / 2;
      var capR = Math.min(0.5, L * 0.08), tA = y0 + capR + 0.06, tB = y1 - capR - 0.06;
      var bore = cfg.bore || (r > 0.6 ? 0.17 : 0.13), thr = cfg.thread || (r > 0.6 ? 0.32 : 0.255), ch = r * 0.1;
      var cera = finishMat(cfg.finish);
      var pts = [[0, y0 + 0.4], [thr, y0 + 0.4], [thr, y0], [r - ch, y0], [r, y0 + ch], [r, tA - 0.06],
        [r - 0.015, tA - 0.045], [r - 0.015, tA - 0.015], [r, tA], [r, tB], [r - 0.015, tB + 0.015], [r - 0.015, tB + 0.045], [r, tB + 0.06],
        [r, y1 - ch], [r - ch, y1], [bore + 0.02, y1], [bore, y1 - 0.02], [bore, y1 - 1.1], [0, y1 - 1.1]];
      var mats = [M.dark, M.dark, cera, M.ti, cera, M.dark, M.dark, M.dark, null, M.dark, M.dark, M.dark, cera, M.ti, cera, M.ti, M.dark, M.dark];
      lathe(spin, pts, mats, 192);
      var len = tB - tA, W = 2048, H = Math.round(W * len / (2 * Math.PI * r)), ppi = H / len, circ = W / (2 * Math.PI * r);
      var tube = engraved(W, H, cfg.finish, function (g, fill) {
        g.fillStyle = fill;
        var lockLen = Math.min(2.7, len * 0.6), s = lockLen * ppi / 1208;
        g.save(); g.translate(0.25 * W, H * 0.5); g.rotate(-Math.PI / 2); g.scale(s, s); g.translate(-604, -50);
        g.fill(P_PATH, 'evenodd'); g.fill(PLUS_PATH, 'evenodd'); g.translate(260, 0); g.fill(WORD_PATH, 'evenodd');
        g.translate(0, 150 - 100 * D.lockup.subScale); g.scale(D.lockup.subScale, D.lockup.subScale); g.fill(SUB_PATH, 'evenodd');
        g.restore();
        g.save(); g.translate(0.75 * W, H * 0.5); g.rotate(-Math.PI / 2);
        var mono = '"IBM Plex Mono", ui-monospace, Menlo, monospace', disp = '"Archivo", Arial, sans-serif';
        var big = 0.36 * Math.min(1, len / 4.4) * ppi, small = 0.085 * Math.min(1.2, len / 4.4) * ppi;
        g.textBaseline = 'alphabetic'; g.textAlign = 'left';
        g.font = '800 expanded ' + Math.round(big) + 'px ' + disp; try { g.fontStretch = 'expanded'; } catch (e) {}
        var word = cfg.big || cfg.model || 'Ti-22';
        var mw = g.measureText(word).width;
        try { g.fontStretch = 'normal'; } catch (e) {}
        g.font = '500 ' + Math.round(small) + 'px ' + mono;
        var lines = ['PROTONIC PRECISION  CITY, ST', 'MODEL ' + (cfg.model || 'Ti-22').toUpperCase() + '   CAL ' + (cfg.cal || '.22 LR'), 'SN PT000001'];
        var lw = Math.max.apply(null, lines.map(function (t) { return g.measureText(t).width; }));
        var room = 0.9 * H - 0.18 * ppi - lw;
        if (mw > room && room > 0) { big = big * room / mw; mw = room; }
        var total = mw + 0.18 * ppi + lw, x0 = -total / 2;
        g.font = '800 expanded ' + Math.round(big) + 'px ' + disp; try { g.fontStretch = 'expanded'; } catch (e) {}
        g.fillText(word, x0, big * 0.36);
        try { g.fontStretch = 'normal'; } catch (e) {}
        g.fillRect(x0 + mw + 0.08 * ppi, -big * 0.7, Math.max(2, 0.012 * ppi), big * 1.15);
        g.font = '500 ' + Math.round(small) + 'px ' + mono;
        lines.forEach(function (t, i) { g.fillText(t, x0 + mw + 0.18 * ppi, -big * 0.52 + small * 0.9 + i * small * 1.5); });
        g.restore();
      });
      var cyl = new T.Mesh(new T.CylinderGeometry(r, r, len, 256, 1, true), tube);
      cyl.position.y = (tA + tB) / 2; spin.add(cyl);
      [0, Math.PI].forEach(function (a) {
        var h = new T.Mesh(new T.CircleGeometry(r * 0.07, 32), M.dark);
        h.rotation.x = -Math.PI / 2; h.position.set(Math.cos(a) * r * 0.62, y1 + 0.001, Math.sin(a) * r * 0.62); spin.add(h);
      });
      var lay = new T.Group(); lay.rotation.z = -Math.PI / 2; lay.add(spin); root.add(lay);
      root.userData.spin = spin;
      return root;
    }

    // ---------- Gluon mounts ----------
    function buildMount(cfg) {
      var root = new T.Group(), spin = new T.Group(), fin = finishMat(cfg.finish || 'nitride');
      var pts, mats;
      if (cfg.kind === 'direct') {
        pts = [[0, -0.55], [0.24, -0.55], [0.24, -0.15], [0.3, -0.15], [0.3, -0.05], [0.42, -0.05], [0.45, -0.02], [0.45, 0.42], [0.42, 0.45], [0.3, 0.45], [0.3, 0.75], [0.27, 0.78], [0.12, 0.78], [0.12, 0], [0, 0]];
        mats = [M.dark, fin, fin, fin, fin, M.ti, fin, M.ti, fin, fin, M.ti, fin, M.dark, M.dark];
        for (var i = 0; i < 9; i++) { var t = new T.Mesh(new T.TorusGeometry(0.3, 0.012, 8, 96), fin); t.rotation.x = Math.PI / 2; t.position.y = 0.48 + i * 0.03; spin.add(t); }
      } else if (cfg.kind === 'piston') {
        pts = [[0, -0.75], [0.2, -0.75], [0.2, -0.2], [0.27, -0.2], [0.27, 0.35], [0.36, 0.35], [0.38, 0.38], [0.38, 0.62], [0.35, 0.65], [0.12, 0.65], [0.12, 0.3], [0, 0.3]];
        mats = [M.dark, fin, fin, M.ti, fin, fin, M.ti, fin, M.dark, M.dark, M.dark];
        for (var p = 0; p < 12; p++) { var tp = new T.Mesh(new T.TorusGeometry(0.2, 0.01, 8, 96), fin); tp.rotation.x = Math.PI / 2; tp.position.y = -0.7 + p * 0.04; spin.add(tp); }
        for (var q = 0; q < 8; q++) { var sp = new T.Mesh(new T.BoxGeometry(0.05, 0.22, 0.05), M.dark), aq = q * Math.PI / 4; sp.position.set(Math.cos(aq) * 0.37, 0.5, Math.sin(aq) * 0.37); sp.rotation.y = -aq; spin.add(sp); }
      } else if (cfg.kind === 'spacer') {
        pts = [[0, -0.3], [0.2, -0.3], [0.2, 0], [0.36, 0], [0.38, 0.03], [0.38, 0.4], [0.35, 0.43], [0.12, 0.43], [0.12, 0.05], [0, 0.05]];
        mats = [M.dark, fin, fin, fin, M.ti, fin, M.dark, M.dark, M.dark];
        for (var u = 0; u < 6; u++) { var tu = new T.Mesh(new T.TorusGeometry(0.2, 0.01, 8, 96), fin); tu.rotation.x = Math.PI / 2; tu.position.y = -0.27 + u * 0.045; spin.add(tu); }
      } else {
        pts = [[0, -1.0], [0.22, -1.0], [0.22, -0.7], [0.36, -0.7], [0.39, -0.67], [0.39, -0.35], [0.36, -0.33], [0.36, -0.28], [0.39, -0.26], [0.39, 0.05],
          [0.44, 0.1], [0.44, 0.6], [0.36, 1.05], [0.33, 1.08], [0.14, 1.08], [0.14, 0.6], [0, 0.6]];
        mats = [M.dark, fin, fin, M.ti, fin, M.ti, M.dark, M.ti, fin, M.ti, fin, fin, M.ti, fin, M.dark, M.dark];
        for (var k = 0; k < 3; k++) { var g2 = new T.Mesh(new T.TorusGeometry(0.44, 0.016, 8, 128), M.dark); g2.rotation.x = Math.PI / 2; g2.position.y = 0.2 + k * 0.13; spin.add(g2); }
        for (var j = 0; j < 6; j++) {
          var slot = new T.Mesh(new T.BoxGeometry(0.1, 0.3, 0.07), M.dark), a = j * Math.PI / 3;
          slot.position.set(Math.cos(a) * 0.368, 0.82, Math.sin(a) * 0.368); slot.rotation.y = -a; slot.rotation.z = 0; spin.add(slot);
        }
      }
      lathe(spin, pts, mats, 160);
      var lay = new T.Group(); lay.rotation.z = -Math.PI / 2; lay.add(spin); root.add(lay);
      root.userData.spin = spin;
      return root;
    }

    var model = null, kind = null;
    var yaw = 0, pitch = 0, vel = 0, dragging = false, lastX = 0, lastY = 0;
    var pose = { tilt: 0.16, yawRoot: -0.38, roll: 0.06, dist: 11.5, yaw0: -Math.PI / 2, y: 0 };
    function setModel(cfg) {
      if (model) { scene.remove(model); }
      kind = cfg.type;
      model = kind === 'coin' ? buildCoin() : kind === 'mount' ? buildMount(cfg) : buildCan(cfg);
      scene.add(model);
      var sw = kind === 'coin' ? 3.2 : kind === 'mount' ? 2.3 : (cfg.L || 5.4) + 0.5;
      var sh = kind === 'coin' ? 3.3 : kind === 'mount' ? 1.3 : 2 * (cfg.r || 0.5) + 0.7, tn = Math.tan(12 * Math.PI / 180);
      var dist = Math.max((sw / 2) / (tn * 1.6), (sh / 2) / tn) * (cfg.fill || 1.12);
      pose = Object.assign({ tilt: kind === 'coin' ? -0.12 : 0.16, yawRoot: kind === 'coin' ? 0 : -0.38, roll: 0.06,
        dist: dist, yaw0: kind === 'coin' ? -0.5 : -Math.PI / 2, y: 0 }, cfg.pose || {});
      yaw = pose.yaw0; pitch = 0;
      camera.position.set(0, 0.2 + pose.y, pose.dist); camera.lookAt(0, pose.y, 0);
      render();
    }
    function apply() {
      if (!model) return;
      if (kind === 'coin') { model.rotation.set(pose.tilt + pitch, yaw, 0); }
      else { model.rotation.set(pose.tilt + pitch, pose.yawRoot, pose.roll); model.userData.spin.rotation.y = yaw; }
    }
    function render() { apply(); renderer.render(scene, camera); }
    function resize(w, h) {
      renderer.setSize(w, h, false); camera.aspect = w / h;
      // keep the whole object in frame on tall viewports
      camera.zoom = Math.min(1, camera.aspect / 1.6); camera.updateProjectionMatrix(); render();
    }
    var running = false, auto = opts.autoRotate !== false;
    function loop() { if (!running) return; if (!dragging) { yaw += auto ? 0.0042 + vel : vel; vel *= 0.94; } render(); requestAnimationFrame(loop); }
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
    return { setModel: setModel, resize: resize, start: start, stop: stop, render: render,
      setYaw: function (y) { yaw = y; render(); }, setPitch: function (p) { pitch = p; render(); } };
  };
})();
