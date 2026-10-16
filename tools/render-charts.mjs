// Renders each can's caliber chart (src/art.mjs sizeChart) to src/assets/img/products/<slug>-sizes.webp.
// Run locally (needs Chrome + ImageMagick): node tools/render-charts.mjs [slug...]
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';
import { PRODUCTS } from '../src/data/products.mjs';
import { CARTRIDGES } from '../src/data/cartridges.mjs';
import { sizeChart } from '../src/art.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src/assets/img/products');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'pp-charts-'));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const only = process.argv.slice(2);
const run = (cmd, args) => new Promise((res, rej) => execFile(cmd, args, { timeout: 120000 }, e => e ? rej(e) : res()));

for (const p of PRODUCTS.filter(p => p.chart && (!only.length || only.includes(p.slug)))) {
  for (const n of p.chart.calibers) if (!CARTRIDGES[n]) throw new Error(`${p.slug}: no cartridge outline for ${n}`);
  const html = path.join(TMP, `${p.slug}.html`), png = path.join(TMP, `${p.slug}.png`);
  fs.writeFileSync(html, `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>html,body{margin:0;background:transparent}svg{display:block;width:100vw;height:100vh}</style></head><body>${sizeChart(p, CARTRIDGES)}</body></html>`);
  await run(CHROME, ['--headless=new', '--hide-scrollbars', '--default-background-color=00000000', '--virtual-time-budget=10000',
    '--window-size=1600,1200', `--screenshot=${png}`, 'file://' + html]);
  await run('magick', [png, '-quality', '88', '-define', 'webp:alpha-quality=95', path.join(OUT, `${p.slug}-sizes.webp`)]);
  console.log('rendered', `${p.slug}-sizes.webp`);
}
fs.rmSync(TMP, { recursive: true, force: true });
