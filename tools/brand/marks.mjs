import { makeFace, setWord } from './glyphs.mjs';
export const bold = makeFace({ S: 20, R: 26 });
export const med = makeFace({ S: 16, R: 23 });
export const KERN = { PR: -2, OT: -10, TO: -10, NI: 2 };
export const SUB_S = 0.32, SUB_GAP = 95;           // PRECISION: 32-unit caps, ~1 cap of tracking
export const P_D = 'M0 150V0H20V10A50 50 0 1 1 20 90V150H0Z M80 50A30 30 0 1 0 20 50A30 30 0 1 0 80 50Z';
export const PLUS = { cx: 156, cy: -6, size: 88, t: 14, gap: 22 };
export function plusD({ cx, cy, size, t, gap } = PLUS, solid = false) {
  const h = size / 2, q = t / 2, g = gap / 2, f = n => +n.toFixed(3);
  if (solid) return `M${f(cx-q)} ${f(cy-h)}H${f(cx+q)}V${f(cy-q)}H${f(cx+h)}V${f(cy+q)}H${f(cx+q)}V${f(cy+h)}H${f(cx-q)}V${f(cy+q)}H${f(cx-h)}V${f(cy-q)}H${f(cx-q)}Z`;
  const r = (x0, y0, x1, y1) => `M${f(x0)} ${f(y0)}H${f(x1)}V${f(y1)}H${f(x0)}Z`;
  return r(cx-q, cy-h, cx+q, cy-g) + r(cx-q, cy+g, cx+q, cy+h) + r(cx-h, cy-q, cx-g, cy+q) + r(cx+g, cy-q, cx+h, cy+q);
}
// Bake translate+scale into absolute path data (M L H V A Z only).
export function xform(d, tx, ty, s) {
  const f = n => +n.toFixed(3);
  const toks = d.match(/[MLHVAZ]|-?\d*\.?\d+(?:e-?\d+)?/gi);
  let out = '', i = 0, cmd = '';
  const num = () => parseFloat(toks[i++]);
  while (i < toks.length) {
    if (/[A-Za-z]/.test(toks[i])) { cmd = toks[i++]; out += cmd; if (cmd === 'Z' || cmd === 'z') continue; }
    switch (cmd) {
      case 'M': case 'L': { const x = num(), y = num(); out += `${f(x*s+tx)} ${f(y*s+ty)} `; break; }
      case 'H': out += `${f(num()*s+tx)} `; break;
      case 'V': out += `${f(num()*s+ty)} `; break;
      case 'A': { const rx = num(), ry = num(), rot = num(), la = num(), sw = num(), x = num(), y = num();
        out += `${f(rx*s)} ${f(ry*s)} ${rot} ${la} ${sw} ${f(x*s+tx)} ${f(y*s+ty)} `; break; }
      default: throw new Error('unsupported ' + cmd);
    }
  }
  return out.replace(/ (?=[A-Z])/g, '').trim();
}
const word = setWord(bold, 'PROTONIC', { kern: KERN });
const subW = setWord(med, 'PRECISION', { gap: SUB_GAP });
export const WORD = word, SUB = subW;
// Each lockup = { vb:[x,y,w,h], parts:[{role:'m'|'s'|'x', d}] }  m=main, s=sub, x=plus (red)
export function lockups({ solidPlus = false } = {}) {
  const mark = (tx, ty, s) => [
    { role: 'm', d: xform(P_D, tx, ty, s) },
    { role: 'x', d: xform(plusD(PLUS, solidPlus), tx, ty, s) },
  ];
  const wordParts = (tx, ty, subAlign = 'left') => {
    const subWidth = SUB.w * SUB_S;
    const sx = subAlign === 'center' ? tx + (WORD.w - subWidth) / 2 : tx;
    return [
      { role: 'm', d: xform(WORD.d, tx, ty, 1) },
      { role: 's', d: xform(SUB.d, sx, ty + 150 - 100 * SUB_S, SUB_S) },
    ];
  };
  const L = {};
  L.horizontal = { vb: [0, -50, 260 + WORD.w, 200], parts: [...mark(0, 0, 1), ...wordParts(260, 0)] };
  const ms = 1.5, mx = WORD.w / 2 - 100 * ms;
  L.stacked = { vb: [0, -75, WORD.w, 75 + 225 + 70 + 150], parts: [...mark(mx, 0, ms), ...wordParts(0, 225 + 70, 'center')] };
  L.wordmark = { vb: [0, 0, WORD.w, 150], parts: wordParts(0, 0) };
  L.mark = { vb: [0, -50, 200, 200], parts: mark(0, 0, 1) };
  return L;
}
export const COLORWAYS = {
  dark:  { m: '#EDEEEE', s: '#A2A5A8', x: '#D3212D', label: 'for dark backgrounds' },
  light: { m: '#111418', s: '#5C6064', x: '#D3212D', label: 'for light backgrounds' },
  black: { m: '#111418', s: '#111418', x: '#111418', label: 'one color, black' },
  white: { m: '#FFFFFF', s: '#FFFFFF', x: '#FFFFFF', label: 'one color, white' },
};
export function svgFile(L, cw, title, pad = 0) {
  const [x, y, w, h] = L.vb;
  const vb = [x - pad, y - pad, w + 2 * pad, h + 2 * pad].map(n => +n.toFixed(3)).join(' ');
  const paths = L.parts.map(p => `<path fill="${cw[p.role]}" fill-rule="evenodd" d="${p.d}"/>`).join('\n  ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">\n  <title>${title}</title>\n  ${paths}\n</svg>\n`;
}
// Per-letter outlines at the origin, for drawing on curves (coin rim) in 3D.
export function glyphTable(face, letters) {
  const t = {}; for (const c of letters) t[c] = { w: face[c].w, d: face[c].d(0) }; return t;
}
