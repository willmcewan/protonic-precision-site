// Parametric glyphs for the PROTONIC wordmark. Cap height H, stroke S,
// outer corner radius R, inner radius r = R - S (concentric corners).
const f = n => +n.toFixed(3);
export function makeFace({ H = 100, S = 20, R = 26 } = {}) {
  const r = Math.max(R - S, 0);
  const A = (rad, sweep, x, y) => rad > 0 ? `A${f(rad)} ${f(rad)} 0 0 ${sweep} ${f(x)} ${f(y)}` : `L${f(x)} ${f(y)}`;
  const rr = (x, y, w, h, q) => q > 0
    ? `M${f(x + q)} ${f(y)}H${f(x + w - q)}${A(q,1,x+w,y+q)}V${f(y + h - q)}${A(q,1,x+w-q,y+h)}H${f(x + q)}${A(q,1,x,y+h-q)}V${f(y + q)}${A(q,1,x+q,y)}Z`
    : `M${f(x)} ${f(y)}H${f(x + w)}V${f(y + h)}H${f(x)}Z`;
  const B = H / 2 + S / 2;               // bowl bottom for P and R
  const m1 = (H - S) / 2, m2 = (H + S) / 2; // middle bar for E and S
  const g = {};
  g.O = { w: 124, d: x => rr(x, 0, 124, H, R) + rr(x + S, S, 124 - 2 * S, H - 2 * S, r) };
  g.C = { w: 116, d: x => { const w = 116, cT = R + 4, cB = H - cT; return (
    `M${x+w} ${cT}V${R}${A(R,0,x+w-R,0)}H${x+R}${A(R,0,x,R)}V${H-R}${A(R,0,x+R,H)}H${x+w-R}${A(R,0,x+w,H-R)}V${cB}` +
    `H${x+w-S}V${H-S-r}${A(r,1,x+w-S-r,H-S)}H${x+S+r}${A(r,1,x+S,H-S-r)}V${S+r}${A(r,1,x+S+r,S)}H${x+w-S-r}${A(r,1,x+w-S,S+r)}V${cT}Z`); } };
  const bowl = (x, wb) => `M${f(x+S)} ${f(S)}H${f(x+wb-S-r)}${A(r,1,x+wb-S,S+r)}V${f(B-S-r)}${A(r,1,x+wb-S-r,B-S)}H${f(x+S)}Z`;
  g.P = { w: 108, d: x => { const w = 108; return `M${x} ${H}V0H${x+w-R}${A(R,1,x+w,R)}V${B-R}${A(R,1,x+w-R,B)}H${x+S}V${H}Z` + bowl(x, w); } };
  g.R = { w: 112, d: x => { const w = 112, wb = 106, dx = w - (wb - R), dy = H - B, Lw = S * Math.hypot(dx, dy) / dy;
    return `M${x} ${H}V0H${x+wb-R}${A(R,1,x+wb,R)}V${B-R}${A(R,1,x+wb-R,B)}L${x+w} ${H}H${f(x+w-Lw)}L${f(x+wb-R-Lw)} ${B}H${x+S}V${H}Z` + bowl(x, wb); } };
  g.T = { w: 108, d: x => { const w = 108; return `M${x} 0H${x+w}V${S}H${x+(w+S)/2}V${H}H${x+(w-S)/2}V${S}H${x}Z`; } };
  g.I = { w: S, d: x => `M${x} 0H${x+S}V${H}H${x}Z` };
  g.N = { w: 116, d: x => { const w = 116, T = S * 0.94; let k = 0;
    for (let i = 0; i < 60; i++) { const dX = w - 2*S - k, dY = H - k; const t = (k*dY + k*dX) / Math.hypot(dX, dY); k += (T - t) * 0.5; }
    return `M${x} ${H}V0H${f(x+S+k)}L${x+w-S} ${f(H-k)}V0H${x+w}V${H}H${f(x+w-S-k)}L${x+S} ${f(k)}V${H}Z`; } };
  g.E = { w: 100, d: x => { const w = 100, e = 10; return `M${x} 0H${x+w}V${S}H${x+S}V${m1}H${x+w-e}V${m2}H${x+S}V${H-S}H${x+w}V${H}H${x}Z`; } };
  g.S = { w: 112, d: x => { const w = 112; return (
    `M${x+w} 0H${x+R}${A(R,0,x,R)}V${m2-R}${A(R,0,x+R,m2)}H${x+w-R}${A(r,1,x+w-S,m1+R)}V${H-R}${A(r,1,x+w-R,H-S)}H${x}V${H}` +
    `H${x+w-R}${A(R,0,x+w,H-R)}V${m1+R}${A(R,0,x+w-R,m1)}H${x+R}${A(r,1,x+S,m1-r)}V${R}${A(r,1,x+R,S)}H${x+w}Z`); } };
  g.H = H; g.S_ = S;
  return g;
}
// Set a word. kern maps a letter pair to extra space (negative tightens).
export function setWord(face, text, { gap = 20, kern = {} } = {}) {
  let x = 0, d = '';
  for (let i = 0; i < text.length; i++) {
    const c = text[i], gl = face[c];
    if (i > 0) x += gap + (kern[text[i - 1] + c] || 0);
    d += gl.d(x);
    x += gl.w;
  }
  return { d, w: x, h: face.H };
}
