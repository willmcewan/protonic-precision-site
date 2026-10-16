// Illustrations drawn in the brand's drafting style. Standalone SVG strings (used as files and inline).
import { lockups, COLORWAYS } from '../tools/brand/marks.mjs';
import { ARCHIVO_800X, PLEX_MONO_500 } from './art-fonts.mjs';

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
export const patch = () => svg('0 0 300 200', `
  <rect x="2" y="2" width="296" height="196" rx="28" fill="#15181c" stroke="#76797c" stroke-width="4"/>
  <rect x="12" y="12" width="276" height="176" rx="20" fill="none" stroke="#76797c" stroke-width="1.4" stroke-dasharray="5 4"/>
  ${paths(L.stacked, { m: '#c5c7c8', s: '#a2a5a8', x: '#d3212d' }, 65, 52 + 75 * 170 / 948, 170 / 948)}`);

// Flat-lay tee, front and back. Shown through <img>, so it carries its own font subsets.
export const tee = () => {
  const ink = { m: '#c5c7c8', s: '#a2a5a8', x: '#d3212d' };
  const fontFace = `<style>@font-face{font-family:PPx;src:url(data:font/woff2;base64,${ARCHIVO_800X}) format('woff2')}@font-face{font-family:PPm;src:url(data:font/woff2;base64,${PLEX_MONO_500}) format('woff2')}</style>`;
  const body = 'M200 16L88 46C64 56 30 112 6 176L78 206C86 188 94 172 104 158C102 260 104 380 106 480Q260 488 414 480C416 380 418 260 416 158C426 172 434 188 442 206L514 176C490 112 456 56 432 46L320 16';
  const neck = back => back ? 'C296 34 224 34 200 16Z' : 'C300 66 220 66 200 16Z';
  const rows = [['.22', 'PLINKER'], ['9MM', 'SIDEARM'], ['.30', 'ADAPT'], ['.46', 'SAFARI']];
  const backPrint = paths(L.horizontal, ink, 165, 103, 190 / 1208) +
    `<path d="M160 150H360M160 296H360" stroke="#5a5e63" stroke-width="1.5"/><path d="M160 192H360M160 226H360M160 260H360" stroke="#33383e" stroke-width="1"/>` +
    rows.map(([cal, name], i) => `<text x="160" y="${180 + i * 34}" font-family="PPm" font-size="12" letter-spacing="1" fill="#8d9094">${cal}</text><text x="206" y="${181 + i * 34}" font-family="PPx" font-size="17.5" fill="#dadcdd">${name}</text>`).join('') +
    `<text x="260" y="322" text-anchor="middle" font-family="PPm" font-size="10.5" letter-spacing="2.4" fill="#8d9094">STABLE UNDER PRESSURE<tspan fill="#d3212d">.</tspan></text>`;
  const shirt = (x, back) => `<g transform="translate(${x} 150) scale(1.05)">
    <path d="${body}${neck(back)}" fill="#000" opacity=".2" filter="url(#tee-sh)" transform="translate(5 9)"/>
    <path d="${body}${neck(back)}" fill="url(#tee-g)"/>
    <path d="M320 16${neck(back).replace('Z', '')}" fill="none" stroke="#24282d" stroke-width="12" stroke-linejoin="round" transform="translate(0 2)"/>
    <g fill="none" stroke="#2e3238" stroke-width="1.4" stroke-dasharray="5 4"><path d="M110 466Q260 474 410 466M14 165L84 194M506 165L436 194"/></g>
    <g fill="none" stroke="#23262b" stroke-width="2.5" stroke-linecap="round" opacity=".55"><path d="M106 166C128 182 138 206 134 236M414 166C392 182 382 206 386 236"/></g>
    ${back ? backPrint : paths(L.mark, ink, 318, 100, .2)}
    <text x="260" y="548" text-anchor="middle" font-family="PPm" font-size="13" letter-spacing="3" fill="#76797c">${back ? 'BACK' : 'FRONT'}</text></g>`;
  return svg('0 0 1200 900', `<defs>${fontFace}
    <linearGradient id="tee-g" x1="0" x2="1"><stop offset="0" stop-color="#0e1013"/><stop offset=".24" stop-color="#191c20"/><stop offset=".5" stop-color="#1e2126"/><stop offset=".76" stop-color="#191c20"/><stop offset="1" stop-color="#0e1013"/></linearGradient>
    <filter id="tee-sh" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="9"/></filter></defs>` + shirt(50, false) + shirt(604, true));
};

export const stickers = () => svg('0 0 900 600', `
  <g transform="rotate(-8 230 300)"><circle cx="230" cy="300" r="150" fill="#fff"/><circle cx="230" cy="300" r="138" fill="#111418"/>${paths(L.mark, COLORWAYS.dark, 160, 245, .7)}</g>
  <g transform="rotate(5 640 190)"><rect x="440" y="120" width="400" height="140" rx="26" fill="#fff"/><rect x="452" y="132" width="376" height="116" rx="18" fill="#111418"/>${paths(L.horizontal, COLORWAYS.dark, 478, 172, 324 / 1208)}</g>
  <g transform="rotate(-4 640 430)"><rect x="560" y="340" width="190" height="190" rx="18" fill="#fff"/><rect x="572" y="352" width="166" height="166" rx="10" fill="#111418"/><g text-anchor="middle" fill="#c5c7c8" ${MONO} font-size="17" letter-spacing="2"><text x="655" y="425">STABLE</text><text x="655" y="450">UNDER</text><text x="655" y="475">PRESSURE<tspan fill="#d3212d">.</tspan></text></g></g>`);

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
    <g ${MONO} font-size="15" fill="#a2a5a8" letter-spacing="1.5"><text x="128" y="250">BLAST BAFFLE · 17-4</text><text x="420" y="250">BAFFLE STACK</text><text x="60" y="88">BORE</text><text x="530" y="80">EACH STAGE PASSES LESS ON</text></g>`);
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
  ${tile(70, 70, 150, 'Fe', 26, 'Iron')}${tile(240, 70, 150, 'Cr', 24, 'Chromium')}${tile(410, 70, 150, 'Ni', 28, 'Nickel')}${tile(580, 70, 150, 'Al', 13, 'Aluminum')}
  <text x="400" y="272" text-anchor="middle" ${MONO} font-size="15" fill="#a2a5a8" letter-spacing="1.5">WHAT THE CANS ARE MADE OF</text>`);

export const markArt = () => svg('0 0 800 320', `<rect width="800" height="320" fill="#0c0e11"/>
  <g stroke="#1b2026">${Array.from({ length: 34 }, (_, i) => `<path d="M${i * 24} 0V320"/>`).join('')}${Array.from({ length: 14 }, (_, i) => `<path d="M0 ${i * 24}H800"/>`).join('')}</g>
  ${paths(L.mark, COLORWAYS.dark, 300, 90, 1)}
  <text x="560" y="230" ${MONO} font-size="15" fill="#a2a5a8" letter-spacing="1.5">prōtos · FIRST</text>`);

// ---------- caliber chart (product gallery) ----------
// Every caliber a can is rated for, drawn to one scale and stood side by side, with a bullet-diameter gauge underneath.
// Rendered to WebP by tools/render-charts.mjs so the web fonts load; the same SVG works inline.
export function sizeChart(p, CARTS) {
  const W = 1600, H = 1200, X0 = 110, X1 = 1490, BASE = 830, TOP = 330;
  const list = p.chart.calibers.map(n => ({ n, ...CARTS[n] })).sort((a, b) => Math.round(a.bullet * 50) - Math.round(b.bullet * 50) || a.oal - b.oal);
  const n = list.length, slot = (X1 - X0) / n, stagger = n > 6;
  const wide = c => Math.max(c.rim, c.base);
  const s = Math.min((BASE - TOP) / Math.max(...list.map(c => c.oal)), slot * 0.62 / Math.max(...list.map(wide)));
  const f = v => v.toFixed(1);

  const cartridge = (c, cx) => {
    const P = (r, h) => [cx + r * s, BASE - h * s], pts = [];
    const add = (r, h) => pts.push([r, h]);
    add(c.rim / 2 - .012, 0); add(c.rim / 2, .012); add(c.rim / 2, c.rimH);
    let h = c.rimH;
    if (c.groove) { add(c.groove / 2, h + .012); add(c.groove / 2, h + .045); h += .075; add(c.belt ? c.rim / 2 : c.base / 2, h); }
    else add(c.base / 2, h);
    if (c.belt) { add(c.rim / 2, c.belt); add(c.base / 2, c.belt + .015); }
    if (c.sh) { add(c.sh / 2, c.shL); add(c.neck / 2, c.nL); add(c.neck / 2, c.len); }
    else add(c.mouth / 2, c.len);
    const half = pts.map(([r, hh]) => P(r, hh)), mirror = pts.slice().reverse().map(([r, hh]) => P(-r, hh));
    const caseD = 'M' + [...half, ...mirror].map(([x, y]) => `${f(x)} ${f(y)}`).join('L') + 'Z';
    // Bullet: a shank, then an ogive to the meplat
    const r = c.bullet / 2, y1 = c.len - .04, exp = c.oal - y1;
    const shank = y1 + exp * (c.nose === 'flat' ? .32 : c.nose === 'round' ? .18 : .12);
    const m = r * (c.nose === 'flat' ? .58 : c.nose === 'round' ? .22 : .07);
    const ctl = c.nose === 'round' ? c.oal : shank + (c.oal - shank) * (c.nose === 'flat' ? .7 : .78);
    const [ax, ay] = P(r, y1), [bx, by] = P(r, shank), [qx, qy] = P(r, ctl), [tx, ty] = P(m, c.oal);
    const [ux, uy] = P(-m, c.oal), [vx, vy] = P(-r, ctl), [wx, wy] = P(-r, shank), [zx, zy] = P(-r, y1);
    const bulletD = `M${f(ax)} ${f(ay)}L${f(bx)} ${f(by)}Q${f(qx)} ${f(qy)} ${f(tx)} ${f(ty)}L${f(ux)} ${f(uy)}Q${f(vx)} ${f(vy)} ${f(wx)} ${f(wy)}L${f(zx)} ${f(zy)}Z`;
    const shadowW = wide(c) * s * .9;
    return `<ellipse cx="${f(cx)}" cy="${BASE + 4}" rx="${f(shadowW)}" ry="7" fill="#111418" opacity=".16" filter="url(#sc-blur)"/>
      <path d="${bulletD}" fill="url(#sc-bullet)" stroke="#2a2e33" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="${caseD}" fill="url(#sc-case)" stroke="#2a2e33" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M${f(cx - c.base / 2 * s * .55)} ${f(BASE - (c.rimH + .12) * s)}V${f(BASE - Math.min(c.sh ? c.shL : c.len, c.len - .05) * s + 6)}" stroke="#fff" stroke-width="${f(Math.max(2, c.base * s * .08))}" stroke-linecap="round" opacity=".5"/>`;
  };

  const labelSize = Math.min(30, (stagger ? slot * 2 : slot) / (Math.max(...list.map(c => c.n.length)) * .64));
  let body = '', labels = '';
  list.forEach((c, i) => {
    const cx = X0 + slot * (i + .5), low = stagger && i % 2 === 1, ly = BASE + 62 + (low ? 78 : 0);
    body += cartridge(c, cx);
    if (low) labels += `<path d="M${f(cx)} ${BASE + 18}V${ly - labelSize - 6}" stroke="#9a9ea2" stroke-width="1.2"/>`;
    labels += `<text x="${f(cx)}" y="${ly}" text-anchor="middle" ${DISP} font-weight="800" font-size="${f(labelSize)}" fill="#111418">${c.n.replace(/&/g, '&amp;')}</text>
      <text x="${f(cx)}" y="${ly + 28}" text-anchor="middle" ${MONO} font-size="19" fill="#4b4f54" letter-spacing="1">${c.bullet.toFixed(3).replace(/^0/, '')} IN</text>`;
  });

  // Bullet-diameter gauge
  const GY = 1112, lo = .15, hi = p.chart.max + .05, gx = d => X0 + (d - lo) / (hi - lo) * (X1 - X0);
  const uniq = [];
  list.map(c => c.bullet).sort((a, b) => a - b).forEach(d => { if (!uniq.length || d - uniq[uniq.length - 1] > .012) uniq.push(d); });
  const gauge = `<text x="${X0}" y="${GY - 34}" ${MONO} font-size="17" fill="#4b4f54" letter-spacing="2.5">BULLET DIAMETER</text>
    <path d="M${X0} ${GY}H${X1}" stroke="#9a9ea2" stroke-width="2"/>
    <path d="M${X0} ${GY}H${f(gx(p.chart.max))}" stroke="#111418" stroke-width="5"/>
    ${uniq.map(d => `<circle cx="${f(gx(d))}" cy="${GY}" r="8" fill="#e6e7e7" stroke="#111418" stroke-width="3"/><text x="${f(gx(d))}" y="${GY + 40}" text-anchor="middle" ${MONO} font-size="17" fill="#4b4f54">${d.toFixed(3).replace(/^0/, '')}</text>`).join('')}
    <path d="M${f(gx(p.chart.max))} ${GY - 26}V${GY + 14}" stroke="#111418" stroke-width="4"/>
    <text x="${f(gx(p.chart.max) + 12)}" y="${GY - 34}" ${MONO} font-size="17" fill="#111418" letter-spacing="2" font-weight="500" text-anchor="${gx(p.chart.max) > X1 - 260 ? 'end' : 'start'}" ${gx(p.chart.max) > X1 - 260 ? `dx="-24"` : ''}>MAX ${p.chart.limit}</text>`;

  // Scale bar: one inch at this chart's scale
  const sb = `<g transform="translate(${X1} 122)"><path d="M${f(-s)} 0H0M${f(-s)} -10V10M0 -10V10" stroke="#111418" stroke-width="2.5" fill="none"/>
    <text x="${f(-s / 2)}" y="-22" text-anchor="middle" ${MONO} font-size="18" fill="#111418" letter-spacing="2">1 IN</text>
    <text x="0" y="46" text-anchor="end" ${MONO} font-size="17" fill="#4b4f54" letter-spacing="2.5">DRAWN TO SCALE</text></g>`;

  const grid = Array.from({ length: Math.floor((X1 - X0) / 40) + 1 }, (_, i) => `M${X0 + i * 40} ${TOP - 30}V${BASE}`).join('') +
    Array.from({ length: Math.floor((BASE - TOP + 30) / 40) + 1 }, (_, i) => `M${X0} ${BASE - i * 40}H${X1}`).join('');

  return svg(`0 0 ${W} ${H}`, `<defs>
    <linearGradient id="sc-case" x1="0" x2="1"><stop offset="0" stop-color="#8b8f93"/><stop offset=".28" stop-color="#eef0f0"/><stop offset=".55" stop-color="#c9ccce"/><stop offset="1" stop-color="#787c81"/></linearGradient>
    <linearGradient id="sc-bullet" x1="0" x2="1"><stop offset="0" stop-color="#43474c"/><stop offset=".3" stop-color="#b5b8bb"/><stop offset=".6" stop-color="#6c7075"/><stop offset="1" stop-color="#34383d"/></linearGradient>
    <filter id="sc-blur" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="5"/></filter></defs>
    <path d="${grid}" stroke="#111418" stroke-width="1" opacity=".05" fill="none"/>
    <path d="M${X0} ${BASE}H${X1}" stroke="#111418" stroke-width="2.5"/>
    <text x="${X0}" y="128" ${MONO} font-size="20" fill="#4b4f54" letter-spacing="3">${p.name.toUpperCase()} · CALIBER CHART</text>
    <text x="${X0}" y="212" ${DISP} font-weight="800" font-size="78" fill="#111418" letter-spacing="-1">${p.chart.headline}</text>
    <text x="${X0}" y="262" ${MONO} font-size="20" fill="#4b4f54" letter-spacing="2">${n} CALIBERS · RATED FOR ${p.chart.limit} AND UNDER</text>
    ${sb}${body}${labels}${gauge}`);
}
