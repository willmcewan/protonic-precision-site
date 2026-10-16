// Lineup Tee product image: a lit, wrinkled flat-lay of the front and back, drawn as one SVG.
// The back print is a to-scale drawing of the launch cans, read from the catalog so it follows any rename.
// Shown through <img>, so it carries its own font subsets.
import { lockups } from '../tools/brand/marks.mjs';
import { ARCHIVO_800X, PLEX_MONO_500 } from './art-fonts.mjs';
import { PRODUCTS } from './data/products.mjs';

const L = lockups();
const INK = '#d4d6d7', DIM = '#8a8e92', RED = '#d3212d';
const paths = (Lk, cw, tx, ty, s) =>
  `<g transform="translate(${tx} ${ty}) scale(${s})">${Lk.parts.map(p => `<path fill="${cw[p.role]}" fill-rule="evenodd" d="${p.d}"/>`).join('')}</g>`;
const n = v => +v.toFixed(2);

// Shirt outline in a 520 x 490 box; the front neck sits lower than the back.
const BODY = 'M200 16L88 46C64 56 30 112 6 176L78 206C86 188 94 172 104 158C102 260 104 380 106 480C180 488 340 488 414 480C416 380 418 260 416 158C426 172 434 188 442 206L514 176C490 112 456 56 432 46L320 16';
const NECK = { front: 'C300 66 220 66 200 16Z', back: 'C296 34 224 34 200 16Z' };

// One can in side view: outline, end caps, hidden baffles, red centreline and a length dimension.
function can(x, yc, len, dia, scale) {
  const w = len * scale, h = dia * scale, top = yc - h / 2, cap = 0.32 * scale;
  const count = Math.max(3, Math.round((len - 0.9) / 0.55)), step = (w - 2 * cap) / (count + 1), dx = Math.min(step * 0.7, h * 0.32);
  let baffles = '';
  for (let i = 1; i <= count; i++) { const bx = x + cap + i * step - dx / 2; baffles += `M${n(bx)} ${n(top + h * 0.2)}L${n(bx + dx)} ${n(yc)}L${n(bx)} ${n(top + h * 0.8)}`; }
  const dimY = top + h + 9, end = x + w;
  const stub = 0.2 * scale, sh = h * 0.56;
  return `<rect x="${n(x - stub)}" y="${n(yc - sh / 2)}" width="${n(stub + 2)}" height="${n(sh)}" rx="1" fill="none" stroke="${INK}" stroke-width="1.1"/>
    <rect x="${x}" y="${n(top)}" width="${n(w)}" height="${n(h)}" rx="${n(h * 0.2)}" fill="#1d2024" stroke="${INK}" stroke-width="1.5"/>
    <path d="M${n(x + cap)} ${n(top)}V${n(top + h)}M${n(end - cap)} ${n(top)}V${n(top + h)}" stroke="${INK}" stroke-width="1"/>
    <path d="${baffles}" fill="none" stroke="${DIM}" stroke-width="0.9" stroke-dasharray="3 2"/>
    <path d="M${n(x - stub - 8)} ${n(yc)}H${n(end + 9)}" stroke="${RED}" stroke-width="0.8" stroke-dasharray="9 2 2 2"/>
    <path d="M${x} ${n(dimY - 4)}V${n(dimY + 4)}M${n(end)} ${n(dimY - 4)}V${n(dimY + 4)}M${x} ${n(dimY)}H${n(end)}M${x - 2} ${n(dimY + 2)}L${x + 2} ${n(dimY - 2)}M${n(end - 2)} ${n(dimY + 2)}L${n(end + 2)} ${n(dimY - 2)}" stroke="${DIM}" stroke-width="0.8"/>
    <text x="${n(end + 7)}" y="${n(dimY + 2.6)}" font-family="PPm" font-size="7.2" letter-spacing=".6" fill="${DIM}">${len} IN</text>`;
}

function backPrint() {
  const cans = PRODUCTS.filter(p => p.cat === 'suppressors' && p.render);
  const x = 150, right = 370, scale = 26, rowH = 72, top = 124;
  const rows = cans.map((p, i) => {
    const y0 = top + i * rowH, r = p.render;
    return `<text x="${x}" y="${y0 + 12}" font-family="PPx" font-size="13" fill="${INK}">${r.big}</text>
      <text x="${right}" y="${y0 + 12}" text-anchor="end" font-family="PPm" font-size="7.5" letter-spacing=".8" fill="${DIM}">CAL ${r.cal}</text>
      ${can(x, y0 + 38, r.L, 2 * r.r, scale)}`;
  }).join('');
  const foot = top + cans.length * rowH + 4;
  return paths(L.horizontal, { m: INK, s: DIM, x: RED }, x, 84, 150 / 1208) +
    `<text x="${right}" y="86" text-anchor="end" font-family="PPm" font-size="7.5" letter-spacing=".8" fill="${DIM}">DWG PP-01</text>
    <text x="${right}" y="98" text-anchor="end" font-family="PPm" font-size="7.5" letter-spacing=".8" fill="${DIM}">THE LINEUP</text>
    <path d="M${x} 112H${right}" stroke="${INK}" stroke-width="1.2"/>${rows}
    <path d="M${x} ${foot}H${right}" stroke="${INK}" stroke-width="1.2"/>
    <text x="${x}" y="${foot + 14}" font-family="PPm" font-size="7.5" letter-spacing=".8" fill="${DIM}">STABLE UNDER PRESSURE<tspan fill="${RED}">.</tspan></text>
    <text x="${right}" y="${foot + 14}" text-anchor="end" font-family="PPm" font-size="7.5" letter-spacing=".8" fill="${DIM}">DRAWN TO SCALE</text>`;
}

function shirt(side, transform, seed) {
  const back = side === 'back', outline = BODY + NECK[side];
  const collar = `M320 16${NECK[side].replace('Z', '')}`;
  return `<g transform="${transform}">
    <path d="${outline}" fill="#000" opacity=".28" filter="url(#tee-shadow)" transform="translate(6 12)"/>
    <g filter="url(#tee-cloth-${seed})">
      <path d="${outline}" fill="url(#tee-light)"/>
      <path d="${collar}" fill="none" stroke="#25292e" stroke-width="13" stroke-linejoin="round" transform="translate(0 2)"/>
      <path d="${collar}" fill="none" stroke="#14171a" stroke-width="1.2" transform="translate(0 8.5)"/>
      <g fill="none" stroke="#2f3439" stroke-width="1.2" stroke-dasharray="4 3"><path d="M110 466C180 474 340 474 410 466M14 165L84 194M506 165L436 194"/></g>
      ${back ? backPrint() : paths(L.mark, { m: INK, x: RED }, 318, 100, .19)}
    </g></g>`;
}

const cloth = (id, seed) => `<filter id="${id}" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.0045 0.0085" numOctaves="2" seed="${seed}" result="folds"/>
    <feGaussianBlur in="folds" stdDeviation="9" result="soft"/>
    <feDisplacementMap in="SourceGraphic" in2="soft" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="laid"/>
    <feDiffuseLighting in="soft" surfaceScale="13" lighting-color="#fff" result="lit"><feDistantLight azimuth="225" elevation="58"/></feDiffuseLighting>
    <feComposite in="laid" in2="lit" operator="arithmetic" k1="1.22" result="shaded"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="${seed + 3}" result="weave"/>
    <feColorMatrix in="weave" type="saturate" values="0" result="grain"/>
    <feComposite in="shaded" in2="grain" operator="arithmetic" k2="1" k3="0.06" k4="-0.03" result="textured"/>
    <feComposite in="textured" in2="laid" operator="in"/>
  </filter>`;

export const tee = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900"><defs>
  <style>@font-face{font-family:PPx;src:url(data:font/woff2;base64,${ARCHIVO_800X}) format('woff2')}@font-face{font-family:PPm;src:url(data:font/woff2;base64,${PLEX_MONO_500}) format('woff2')}</style>
  <linearGradient id="tee-light" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a2e33"/><stop offset=".55" stop-color="#1d2024"/><stop offset="1" stop-color="#121417"/></linearGradient>
  <filter id="tee-shadow" x="-10%" y="-10%" width="120%" height="125%"><feGaussianBlur stdDeviation="11"/></filter>
  ${cloth('tee-cloth-1', 11)}${cloth('tee-cloth-2', 29)}
</defs>
${shirt('front', 'translate(30 175) rotate(-5 260 245) scale(1.0)', 1)}
${shirt('back', 'translate(548 118) rotate(2 260 245) scale(1.17)', 2)}
</svg>`;
