// Renders product images from the 3D models with headless Chrome, then writes WebP into src/assets/img/products.
// Run locally (needs Chrome + ImageMagick): node tools/render-images.mjs [slug...]
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import { execFile } from 'child_process';
import { PRODUCTS } from '../src/data/products.mjs';
import { bold, med, WORD, SUB, SUB_S, P_D, PLUS, plusD, glyphTable } from './brand/marks.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src/assets/img/products');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'pp-render-'));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PP_DATA = { glyphs: { bold: glyphTable(bold, 'PROTNICES'), med: glyphTable(med, 'PROTNICES') }, mark: { p: P_D, plus: plusD() }, markPlus: PLUS, lockup: { word: WORD.d, sub: SUB.d, subScale: SUB_S } };
const VIEWER = fs.readFileSync(path.join(ROOT, 'src/assets/js/viewer.js'), 'utf8');
const only = process.argv.slice(2);
const run = (cmd, args) => new Promise((res, rej) => execFile(cmd, args, { timeout: 120000 }, (e) => e ? rej(e) : res()));

function views(p) {
  const r = p.render, side = -Math.PI / 2;
  if (r.type === 'can') {
    const d = Math.max((0.41 * r.L + 0.35) / 0.34, (0.29 * r.L + r.r + 0.3) / 0.34) * 1.16;
    return [
      ['card', 1200, 1200, { ...r, pose: { roll: 0.62, yawRoot: -0.22, tilt: 0.1, dist: d, yaw0: side + 0.15 } }],
      ['wide', 1600, 1200, { ...r, fill: 1.08, pose: { yaw0: side + 0.12 } }],
      ['side', 1600, 1200, { ...r, fill: 1.08, pose: { yaw0: Math.PI / 2 + 0.12 } }],
      ['hero', 1600, 1000, { ...r, fill: 0.98, pose: { yawRoot: -0.62, tilt: 0.24, roll: 0.16, yaw0: side + 0.25 } }],
    ];
  }
  if (r.type === 'mount') return [
    ['card', 1200, 1200, { ...r, fill: 1.25, pose: { roll: 0.5, yawRoot: -0.5, tilt: 0.2, yaw0: 0.3 } }],
    ['wide', 1600, 1200, { ...r, fill: 1.15, pose: { yawRoot: -0.5, tilt: 0.2, yaw0: 0.3 } }],
    ['hero', 1600, 1000, { ...r, fill: 1.1, pose: { yawRoot: -0.7, tilt: 0.28, roll: 0.12, yaw0: 0.3 } }],
  ];
  return [
    ['card', 1200, 1200, { ...r, fill: 0.86 }],
    ['wide', 1600, 1200, { ...r, fill: 1.0 }],
    ['hero', 1600, 1000, { ...r, fill: 1.05, pose: { tilt: -0.18, yaw0: -0.55 } }],
  ];
}

async function shot(slug, name, w, h, cfg) {
  const html = path.join(TMP, `${slug}-${name}.html`), png = path.join(TMP, `${slug}-${name}.png`);
  fs.writeFileSync(html, `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>html,body{margin:0;background:transparent}canvas{display:block;width:100vw;height:100vh}</style></head><body><canvas id="c"></canvas>
<script>window.PP_DATA=${JSON.stringify(PP_DATA)};</script><script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script><script>${VIEWER}</script>
<script>Promise.all([document.fonts.load('800 40px Archivo'),document.fonts.load('500 20px "IBM Plex Mono"')]).then(function(){
var v=ProtonicViewer(document.getElementById('c'),{still:true,preserve:true,pixelRatio:1});v.resize(innerWidth,innerHeight);v.setModel(${JSON.stringify(cfg)});v.resize(innerWidth,innerHeight);});</script></body></html>`);
  await run(CHROME, ['--headless=new', '--hide-scrollbars', '--default-background-color=00000000', '--enable-unsafe-swiftshader', '--use-angle=swiftshader',
    '--virtual-time-budget=20000', `--window-size=${w},${h}`, `--screenshot=${png}`, 'file://' + html]);
  await run('magick', [png, '-quality', '86', '-define', 'webp:alpha-quality=90', path.join(OUT, `${slug}-${name}.webp`)]);
  return path.join(OUT, `${slug}-${name}.webp`);
}

const jobs = [];
for (const p of PRODUCTS) if (p.render && (!only.length || only.includes(p.slug))) {
  // Cans render once per colorway: <slug>-<colorway>-<view>.webp
  for (const c of p.colors || [null]) for (const [n, w, h, cfg] of views(p)) jobs.push([c ? `${p.slug}-${c.key}` : p.slug, n, w, h, c ? { ...cfg, finish: c.finish } : cfg]);
}
let i = 0;
async function worker() { while (i < jobs.length) { const j = jobs[i++]; const f = await shot(...j); console.log('rendered', path.basename(f)); } }
await Promise.all([worker(), worker(), worker(), worker()]);
fs.rmSync(TMP, { recursive: true, force: true });
