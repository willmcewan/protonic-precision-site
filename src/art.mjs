// Illustrations drawn in the brand's drafting style. Standalone SVG strings (used as files and inline).
import { lockups, COLORWAYS } from '../tools/brand/marks.mjs';

const L = lockups();
const paths = (Lk, cw, tx = 0, ty = 0, s = 1) =>
  `<g transform="translate(${tx} ${ty}) scale(${s})">${Lk.parts.map(p => `<path fill="${cw[p.role]}" fill-rule="evenodd" d="${p.d}"/>`).join('')}</g>`;
const svg = (vb, body, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"${extra}>${body}</svg>`;
const MONO = `font-family="IBM Plex Mono, ui-monospace, Menlo, monospace"`;
const DISP = `font-family="Archivo, Arial, sans-serif" font-stretch="125%"`;

export function tile(x, y, s, sym, z, name, { stroke = '#c5c7c8', fill = 'none', ink = '#edeeee', sub = '#a2a5a8' } = {}) {
  return `<g transform="translate(${x} ${y})"><rect width="${s}" height="${s}" fill="${fill}" stroke="${stroke}" stroke-width="${s / 90}"/>
    <text x="${s * .09}" y="${s * .2}" ${MONO} font-size="${s * .13}" fill="${sub}">${z}</text>
    <text x="${s * .5}" y="${s * .64}" text-anchor="middle" ${DISP} font-weight="800" font-size="${s * .38}" fill="${ink}">${sym}</text>
    <text x="${s * .5}" y="${s * .86}" text-anchor="middle" ${MONO} font-size="${s * .1}" fill="${sub}" letter-spacing="1">${name.toUpperCase()}</text></g>`;
}

// ---------- product images ----------
export const linac = () => svg('0 0 1200 900', `
  <g fill="none" stroke="#2a2e33" stroke-width="3" stroke-linejoin="round">
    <path d="M150 430h250l30-26h170v26h240v40H600v22H470l-20 40h-60l20-40h-60l-10 92-70 18-18-72H150z" fill="#d4d6d7"/>
    <path d="M840 438h230v24H840z" fill="#c3c6c8"/>
    <path d="M430 404h170" />
    <rect x="1070" y="432" width="70" height="36" fill="#1c1f23"/>
    <path d="M150 430v62M150 492l-40 30v-120l40 28" fill="#c3c6c8"/>
  </g>
  <g stroke="#4b4f54" stroke-width="2" fill="none"><path d="M600 560v60M1070 560v60M600 600h470"/><path d="M590 610l20-20M1060 610l20-20"/></g>
  <text x="835" y="642" text-anchor="middle" ${MONO} font-size="26" fill="#4b4f54">BARREL 16.0 IN</text>
  <text x="1105" y="420" text-anchor="middle" ${MONO} font-size="20" fill="#4b4f54">CAN</text>
  <text x="600" y="270" text-anchor="middle" ${DISP} font-weight="840" font-size="120" fill="#111418">LINAC 16</text>
  <text x="600" y="320" text-anchor="middle" ${MONO} font-size="24" fill="#4b4f54" letter-spacing="3">IN DESIGN · SUPPRESSOR-FIRST RIFLE</text>`);

export const patch = () => svg('0 0 300 200', `
  <rect x="2" y="2" width="296" height="196" rx="28" fill="#15181c" stroke="#76797c" stroke-width="4"/>
  <rect x="12" y="12" width="276" height="176" rx="20" fill="none" stroke="#76797c" stroke-width="1.4" stroke-dasharray="5 4"/>
  ${paths(L.stacked, { m: '#c5c7c8', s: '#a2a5a8', x: '#d3212d' }, 65, 52 + 75 * 170 / 948, 170 / 948)}`);

export const tee = () => {
  const shirt = (x, back) => `<g transform="translate(${x} 60)">
    <path d="M150 0c20 26 80 26 100 0l120 44-36 96-54-20v300H120V120l-54 20-36-96z" fill="#15181c" stroke="#2a3037" stroke-width="3"/>
    <path d="M150 0c20 26 80 26 100 0" fill="none" stroke="#2a3037" stroke-width="6"/>
    ${back
      ? tile(130, 120, 64, 'Ti', 22, 'Titanium', { stroke: '#c5c7c8', ink: '#c5c7c8', sub: '#a2a5a8' }) + tile(200, 120, 64, 'Fe', 26, 'Iron', { stroke: '#c5c7c8', ink: '#c5c7c8', sub: '#a2a5a8' }) + tile(165, 190, 64, 'Ni', 28, 'Nickel', { stroke: '#c5c7c8', ink: '#c5c7c8', sub: '#a2a5a8' }) + paths(L.mark, { m: '#c5c7c8', x: '#d3212d' }, 182, 285, .15)
      : paths(L.mark, { m: '#c5c7c8', x: '#d3212d' }, 230, 92, .2)}
    <text x="200" y="455" text-anchor="middle" ${MONO} font-size="16" fill="#4b4f54" letter-spacing="2">${back ? 'BACK' : 'FRONT'}</text></g>`;
  return svg('0 0 900 560', shirt(20, false) + shirt(460, true));
};

export const stickers = () => svg('0 0 900 600', `
  <g transform="rotate(-8 230 300)"><circle cx="230" cy="300" r="150" fill="#fff"/><circle cx="230" cy="300" r="138" fill="#111418"/>${paths(L.mark, COLORWAYS.dark, 160, 245, .7)}</g>
  <g transform="rotate(5 640 190)"><rect x="440" y="120" width="400" height="140" rx="26" fill="#fff"/><rect x="452" y="132" width="376" height="116" rx="18" fill="#111418"/>${paths(L.horizontal, COLORWAYS.dark, 478, 172, 324 / 1208)}</g>
  <g transform="rotate(-4 640 430)"><rect x="560" y="340" width="190" height="190" rx="18" fill="#fff"/><rect x="572" y="352" width="166" height="166" rx="10" fill="#111418"/>${tile(584, 364, 142, 'Ti', 22, 'Titanium', { stroke: '#c5c7c8' })}</g>`);

// ---------- lab / journal art (dark) ----------
export const bafflesArt = () => {
  let cones = '';
  for (let i = 0; i < 6; i++) { const x = 300 + i * 60; cones += `<path d="M${x} 112 L${x + 34} 160 L${x} 208" fill="none" stroke="#c5c7c8" stroke-width="3"/>`; }
  let arrows = '';
  [1, .8, .62, .46, .33, .22, .14].forEach((k, i) => { const x = 210 + i * 60, w = 38 * k; arrows += `<path d="M${x} 160h${w}" stroke="#d3212d" stroke-width="${2 + 6 * k}" stroke-linecap="square" opacity="${.35 + .65 * k}"/>`; });
  return svg('0 0 800 320', `<rect width="800" height="320" fill="#0c0e11"/>
    <g stroke="#2a3037"><path d="M0 40h800M0 280h800"/></g>
    <rect x="120" y="96" width="580" height="128" fill="#15181c" stroke="#a2a5a8" stroke-width="3"/>
    <path d="M120 160H60" stroke="#76797c" stroke-width="3" stroke-dasharray="8 6"/>
    <rect x="128" y="104" width="150" height="112" fill="none" stroke="#76797c" stroke-width="2" stroke-dasharray="6 5"/>
    ${cones}${arrows}
    <path d="M110 160h590" stroke="#2a3037" stroke-width="1" stroke-dasharray="14 6 2 6"/>
    <g ${MONO} font-size="15" fill="#a2a5a8" letter-spacing="1.5"><text x="128" y="250">BLAST CHAMBER · Co-27</text><text x="420" y="250">BAFFLE STACK</text><text x="60" y="88">BORE</text><text x="530" y="80">EACH STAGE PASSES LESS ON</text></g>`);
};

export const testingArt = () => {
  let d = 'M60 236', x = 60;
  for (let i = 0; i < 140; i++) { x += 4.6; const t = i / 140; const env = i < 6 ? i / 6 : Math.exp(-(i - 6) / 22); const y = 236 - env * 170 * (Math.sin(i * 1.7) * .5 + .55) * (1 - t * .2); d += `L${x.toFixed(1)} ${y.toFixed(1)}`; }
  return svg('0 0 800 320', `<rect width="800" height="320" fill="#0c0e11"/>
    <g stroke="#1f242a">${Array.from({ length: 9 }, (_, i) => `<path d="M${60 + i * 80} 40V250"/>`).join('')}${Array.from({ length: 6 }, (_, i) => `<path d="M60 ${50 + i * 40}H700"/>`).join('')}</g>
    <path d="M60 236H700M60 40V236" stroke="#76797c" stroke-width="2" fill="none"/>
    <path d="M60 74H700" stroke="#d3212d" stroke-width="2" stroke-dasharray="10 6"/>
    <path d="${d}" fill="none" stroke="#c5c7c8" stroke-width="2.5" stroke-linejoin="round"/>
    <g ${MONO} font-size="15" fill="#a2a5a8" letter-spacing="1"><text x="500" y="66">140 dB · OSHA IMPULSE LIMIT</text><text x="60" y="276">TIME →</text><text x="20" y="44">dB</text><text x="520" y="276">MIL-STD-1474E · 1 M LEFT OF MUZZLE</text></g>`);
};

export const materialsArt = () => svg('0 0 800 320', `<rect width="800" height="320" fill="#0c0e11"/>
  ${tile(70, 70, 150, 'Ti', 22, 'Titanium')}${tile(240, 70, 150, 'Fe', 26, 'Iron')}${tile(410, 70, 150, 'Co', 27, 'Cobalt')}${tile(580, 70, 150, 'Ni', 28, 'Nickel')}
  <text x="400" y="272" text-anchor="middle" ${MONO} font-size="15" fill="#a2a5a8" letter-spacing="1.5">THE NUMBER IS THE PROTON COUNT. THE PROTON COUNT IS THE METAL.</text>`);

export const markArt = () => svg('0 0 800 320', `<rect width="800" height="320" fill="#0c0e11"/>
  <g stroke="#1b2026">${Array.from({ length: 34 }, (_, i) => `<path d="M${i * 24} 0V320"/>`).join('')}${Array.from({ length: 14 }, (_, i) => `<path d="M0 ${i * 24}H800"/>`).join('')}</g>
  ${paths(L.mark, COLORWAYS.dark, 300, 90, 1)}
  <text x="560" y="230" ${MONO} font-size="15" fill="#a2a5a8" letter-spacing="1.5">prōtos · FIRST</text>`);
