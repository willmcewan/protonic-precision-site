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

    // A round part with two wrench flats (or a double-D), extruded along the can's axis from y.
    function flatted(R, af, len, hole, mat, y) {
      var bv = Math.min(0.012, len * 0.1), Rr = R - bv, a0 = Math.acos((af / 2 - bv) / Rr), sh = new T.Shape();
      sh.moveTo(Rr * Math.cos(a0), Rr * Math.sin(a0));
      sh.absarc(0, 0, Rr, a0, Math.PI - a0, false);
      sh.lineTo(Rr * Math.cos(Math.PI + a0), Rr * Math.sin(Math.PI + a0));
      sh.absarc(0, 0, Rr, Math.PI + a0, 2 * Math.PI - a0, false);
      sh.closePath();
      if (hole) { var h = new T.Path(); h.absarc(0, 0, hole + bv, 0, Math.PI * 2, true); sh.holes.push(h); }
      var m = new T.Mesh(new T.ExtrudeGeometry(sh, { depth: len - 2 * bv, bevelEnabled: true, bevelThickness: bv, bevelSize: bv, bevelSegments: 2, curveSegments: 96 }), mat);
      m.rotation.x = -Math.PI / 2; m.position.y = y + bv;
      return m;
    }

    // ---------- suppressor ----------
    // Outside dimensions come from the engineering drawings (inches):
    //   r tube radius, L overall length · rear {r, len, flats}: rear cap radius, length, wrench flats across
    //   front {len}: front cap length · seams [z]: extra joints along the body, measured from the rear
    //   bore: exit bore radius · socket {r, depth, web}: the rear thread opening · spanner {d, bc} or null: front cap holes
    //   welded: weld lines instead of joints · mark: the caliber limit engraved on the tube
    //   stack {z0, lens}: where the baffles sit, for the exploded view. Baffle shapes are illustrative.
    function buildCan(cfg) {
      var root = new T.Group(), spin = new T.Group();
      var r = cfg.r || 0.5, L = cfg.L || 5.4, y0 = -L / 2, y1 = L / 2;
      var rear = cfg.rear || {}, front = cfg.front || {}, sock = cfg.socket || {};
      var capLen = Math.min(0.5, L * 0.08), rr = rear.r || r, yA = y0 + (rear.len || capLen), yB = y1 - (front.len || capLen);
      var bore = cfg.bore || (r > 0.6 ? 0.17 : 0.13), sr = sock.r || (r > 0.6 ? 0.32 : 0.255), sd = sock.depth || 0.4;
      var g = cfg.welded ? 0.005 : 0.015, stepped = rr > r + 0.001;
      var chR = Math.min(rr * 0.1, (rr - sr) * 0.4), chF = r * 0.1;
      var cera = finishMat(cfg.finish);
      var tA = stepped ? yA : yA + 2 * g, tB = yB - 2 * g;
      function groove(y) { return [[r, y - 2 * g], [r - g, y - g], [r - g, y + g], [r, y + 2 * g]]; }

      // Rear: the thread opening, then the rear cap out to the tube.
      var pts = sock.web ? [[0, y0 + sd + 0.3], [sock.web, y0 + sd + 0.3], [sock.web, y0 + sd], [sr, y0 + sd], [sr, y0]] : [[0, y0 + sd], [sr, y0 + sd], [sr, y0]];
      var mats = sock.web ? [M.dark, M.dark, M.dark, M.dark] : [M.dark, M.dark];
      if (rear.flats) {
        spin.add(flatted(rr, rear.flats, yA - 2 * g - y0, sr, cera, y0));
        pts.pop(); pts.push([sr, yA - 2 * g]);
        lathe(spin, pts, mats, 96);
        pts = [[r, yA - 2 * g]]; mats = [];
      } else {
        pts.push([rr - chR, y0], [rr, y0 + chR]); mats.push(cera, M.ti);
        if (stepped) { var cs = Math.min(0.02, (rr - r) * 0.5); pts.push([rr, yA - cs], [rr - cs, yA], [r, yA]); mats.push(cera, M.ti, cera); }
        else { pts.push([r, yA - 2 * g]); mats.push(cera); }
      }
      if (!stepped) { pts = pts.concat(groove(yA).slice(1)); mats.push(M.dark, M.dark, M.dark); }
      lathe(spin, pts, mats, 192);

      // Body: the engraved tube first, then any further sections.
      var cuts = (cfg.seams || []).map(function (z) { return y0 + z; }), tEnd = cuts.length ? cuts[0] - 2 * g : tB;
      cuts.forEach(function (y, i) {
        var end = i + 1 < cuts.length ? cuts[i + 1] - 2 * g : tB;
        lathe(spin, groove(y).concat([[r, end]]), [M.dark, M.dark, M.dark, cera], 192);
      });

      // Front cap.
      var capG = cfg.explode ? new T.Group() : spin, inside = cfg.explode ? yB + 0.02 : y1 - 1.1;
      if (cfg.explode) spin.add(capG);
      lathe(capG, groove(yB).concat([[r, y1 - chF], [r - chF, y1], [bore + 0.02, y1], [bore, y1 - 0.02], [bore, inside]], cfg.explode ? [[r, yB - 2 * g]] : [[0, inside]]),
        [M.dark, M.dark, M.dark, cera, M.ti, cera, M.ti, M.dark, cfg.explode ? M.ti : M.dark], 192);
      if (cfg.spanner !== null) {
        var sp = cfg.spanner || { d: r * 0.14, bc: r * 1.24 };
        [0, Math.PI].forEach(function (a) {
          var h = new T.Mesh(new T.CircleGeometry(sp.d / 2, 32), M.dark);
          h.rotation.x = -Math.PI / 2; h.position.set(Math.cos(a) * sp.bc / 2, y1 + 0.001, Math.sin(a) * sp.bc / 2); capG.add(h);
        });
      }

      var len = tEnd - tA, W = 2048, H = Math.round(W * len / (2 * Math.PI * r)), ppi = H / len;
      var tube = engraved(W, H, cfg.finish, function (g2, fill) {
        g2.fillStyle = fill;
        var lockLen = Math.min(2.7, len * 0.6), s = lockLen * ppi / 1208;
        g2.save(); g2.translate(0.25 * W, H * 0.5); g2.rotate(-Math.PI / 2); g2.scale(s, s); g2.translate(-604, -50);
        g2.fill(P_PATH, 'evenodd'); g2.fill(PLUS_PATH, 'evenodd'); g2.translate(260, 0); g2.fill(WORD_PATH, 'evenodd');
        g2.translate(0, 150 - 100 * D.lockup.subScale); g2.scale(D.lockup.subScale, D.lockup.subScale); g2.fill(SUB_PATH, 'evenodd');
        g2.restore();
        g2.save(); g2.translate(0.75 * W, H * 0.5); g2.rotate(-Math.PI / 2);
        var mono = '"IBM Plex Mono", ui-monospace, Menlo, monospace', disp = '"Archivo", Arial, sans-serif';
        var big = 0.36 * Math.min(1, len / 4.4) * ppi, small = 0.085 * Math.min(1.2, len / 4.4) * ppi;
        g2.textBaseline = 'alphabetic'; g2.textAlign = 'left';
        g2.font = '800 expanded ' + Math.round(big) + 'px ' + disp; try { g2.fontStretch = 'expanded'; } catch (e) {}
        var word = cfg.big || cfg.model || 'Ti-22';
        var mw = g2.measureText(word).width;
        try { g2.fontStretch = 'normal'; } catch (e) {}
        g2.font = '500 ' + Math.round(small) + 'px ' + mono;
        var model = 'MODEL ' + (cfg.model || 'Ti-22').toUpperCase();
        var lines = cfg.mark ? ['PROTONIC PRECISION  CITY, ST', model, cfg.mark, 'SN PT000001'] : ['PROTONIC PRECISION  CITY, ST', model + '   CAL ' + (cfg.cal || '.22 LR'), 'SN PT000001'];
        var lw = Math.max.apply(null, lines.map(function (t) { return g2.measureText(t).width; }));
        var room = 0.9 * H - 0.18 * ppi - lw;
        if (mw > room && room > 0) { big = big * room / mw; mw = room; }
        var total = mw + 0.18 * ppi + lw, x0 = -total / 2, lh = small * 1.5, top = -lines.length * lh / 2 + small * 0.85;
        g2.font = '800 expanded ' + Math.round(big) + 'px ' + disp; try { g2.fontStretch = 'expanded'; } catch (e) {}
        g2.fillText(word, x0, big * 0.36);
        try { g2.fontStretch = 'normal'; } catch (e) {}
        var bar = Math.max(big * 1.15, lines.length * lh);
        g2.fillRect(x0 + mw + 0.08 * ppi, -bar / 2, Math.max(2, 0.012 * ppi), bar);
        g2.font = '500 ' + Math.round(small) + 'px ' + mono;
        lines.forEach(function (t, i) { g2.fillText(t, x0 + mw + 0.18 * ppi, top + i * lh); });
        g2.restore();
      });
      var cyl = new T.Mesh(new T.CylinderGeometry(r, r, len, 256, 1, true), tube);
      cyl.position.y = (tA + tEnd) / 2; spin.add(cyl);

      if (cfg.explode) {
        // The open tube, and inside it the stack: a long blast baffle first, then the rest. Illustrative shapes.
        var inner = new T.Mesh(new T.CylinderGeometry(r - 0.05, r - 0.05, tB - tA, 96, 1, true), new T.MeshStandardMaterial({ color: lin(0x0a0b0c), roughness: 0.8, side: T.BackSide }));
        inner.position.y = (tA + tB) / 2; spin.add(inner);
        lathe(spin, [[r, tB], [r - 0.05, tB]], [M.ti], 192);
        var lens = cfg.stack ? cfg.stack.lens.slice() : [], yc = cfg.stack ? y0 + cfg.stack.z0 : tA + 0.06;
        if (!lens.length) { var nb = cfg.baffles || 6; for (var q0 = 0; q0 < nb; q0++) lens.push((tB - tA - 0.12) / nb); }
        var rIn = r - 0.085, wall = 0.035, rb = bore + 0.03, steel = finishMat('stainless'), parts = [], n = lens.length;
        steel.side = T.DoubleSide;
        lens.forEach(function (bl) {
          var bg = new T.Group(), h2 = bl / 2, tip = h2 - (rIn - wall - rb);
          // A cone baffle with a spacer skirt: the cone points back at the gas.
          lathe(bg, [[rIn, -h2], [rIn, h2], [rIn - wall, h2], [rb, tip], [rb, tip - 0.07], [rIn - wall, h2 - 0.1], [rIn - wall, -h2], [rIn, -h2]],
            [steel, steel, steel, steel, steel, steel, steel], 128);
          bg.position.y = yc + h2; spin.add(bg); parts.push({ g: bg, y: yc + h2, len: bl }); yc += bl;
        });
        // Exploded, the stack keeps its order: tube, blast baffle ... front baffle, cap.
        var G = 0.45, pos = yB + G;
        parts.forEach(function (q) { q.d = pos + q.len / 2 - q.y; pos += q.len + G; });
        var dCap = pos - yB;
        var ease = function (x) { x = Math.max(0, Math.min(1, x)); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
        root.userData.span = L + dCap;
        root.userData.explode = function (p) {
          capG.position.y = dCap * ease(p / 0.55);
          parts.forEach(function (q, j) { var k = n - 1 - j; q.g.position.y = q.y + q.d * ease((p - 0.1 - k * 0.07) / 0.5); });
          spin.position.y = -dCap * ease(p) / 2;
        };
      }
      var lay = new T.Group(); lay.rotation.z = -Math.PI / 2; lay.add(spin); root.add(lay);
      root.userData.spin = spin;
      return root;
    }

    // ---------- Gluon and Pion mounts ----------
    // Outlines from the engineering drawings, rear (barrel) end first. Every one ends in the 1-3/8x24 thread or its seat.
    function rings(spin, rad, ya, yb, pitch, mat) {
      for (var y = ya + pitch; y < yb - pitch / 2; y += pitch) { var t = new T.Mesh(new T.TorusGeometry(rad, pitch * 0.3, 8, 128), mat); t.rotation.x = Math.PI / 2; t.position.y = y; spin.add(t); }
    }
    function buildMount(cfg) {
      var root = new T.Group(), spin = new T.Group(), fin = finishMat(cfg.finish || 'nitride');
      var pts, mats, HUB = 0.6875, c = 0.015;
      if (cfg.kind === 'direct') {
        // Gluon DT, 0.90 long: wrench body, the flange the can seats on, then the thread that goes into the can.
        spin.add(flatted(0.5, 0.875, 0.22, 0.3125, fin, -0.45));
        pts = [[0.5, -0.23], [0.75 - c, -0.23], [0.75, -0.23 + c], [0.75, -0.13 - c], [0.75 - c, -0.13], [HUB, -0.13], [HUB, 0.45 - c], [HUB - c, 0.45], [0.5, 0.45], [0.5, 0.3], [0.3125, 0.3], [0.3125, -0.23]];
        mats = [fin, M.ti, fin, M.ti, fin, fin, M.ti, fin, M.dark, M.dark, M.dark];
        rings(spin, HUB, -0.13, 0.45 - c, 1 / 24, fin);
      } else if (cfg.kind === 'piston') {
        // Pion piston, 1.35 long: a keyed shank that slides in the booster, and the flange the spring holds forward.
        spin.add(flatted(0.375, 0.66, 1.15, 0.255, fin, -0.675));
        pts = [[0.375, 0.475], [0.4975 - c, 0.475], [0.4975, 0.475 + c], [0.4975, 0.675 - c], [0.4975 - c, 0.675], [0.205, 0.675], [0.205, 0.475]];
        mats = [fin, M.ti, fin, M.ti, fin, M.dark];
      } else if (cfg.kind === 'spacer') {
        // Pion Fixed, 0.73 long: a flange with wrench flats, and the thread that goes into the can in place of the booster.
        spin.add(flatted(0.74, 1.25, 0.15, 0.255, fin, -0.365));
        pts = [[HUB, -0.215], [HUB, 0.365 - c], [HUB - c, 0.365], [0.225, 0.365], [0.225, 0.155], [0.25, 0.155], [0.25, -0.215]];
        mats = [fin, M.ti, fin, M.dark, M.dark, M.dark];
        rings(spin, HUB, -0.215, 0.365 - c, 1 / 24, fin);
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
      var rMax = Math.max(cfg.r || 0.5, (cfg.rear && cfg.rear.r) || 0);
      var sw = kind === 'coin' ? 3.2 : kind === 'mount' ? Math.max(2.3, (cfg.L || 1.3) + 1.0) : (model.userData.span || cfg.L || 5.4) + 0.5;
      var sh = kind === 'coin' ? 3.3 : kind === 'mount' ? Math.max(1.3, 2 * (cfg.r || 0.45) + 0.4) : 2 * rMax + 0.7, tn = Math.tan(12 * Math.PI / 180);
      var dist = Math.max((sw / 2) / (tn * (cfg.aspect || 1.6)), (sh / 2) / tn) * (cfg.fill || 1.12);
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
      camera.zoom = opts.fixedZoom ? 1 : Math.min(1, camera.aspect / 1.6); camera.updateProjectionMatrix(); render();
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
      setYaw: function (y) { yaw = y; render(); }, setPitch: function (p) { pitch = p; render(); },
      setExplode: function (p) { if (model && model.userData.explode) { model.userData.explode(p); render(); } } };
  };
})();
