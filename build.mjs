// Builds protonicprecision.com into dist/. Zero dependencies: `node build.mjs`.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE } from './src/data/site.mjs';
import { PRODUCTS, url } from './src/data/products.mjs';
import { productImg } from './src/layout.mjs';
import { bold, med, WORD, SUB, SUB_S, P_D, PLUS, plusD, glyphTable } from './tools/brand/marks.mjs';
import * as art from './src/art.mjs';
import { tee } from './src/art-tee.mjs';
import { home } from './src/pages/home.mjs';
import { categoryPages, productPages } from './src/pages/catalog.mjs';
import { about, labPages, faqPage, buyingGuide, threadChart, dealers, contact, legal, searchPage, notFound } from './src/pages/content.mjs';
import { journalIndex, journalPosts } from './src/pages/journal.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
fs.cpSync(path.join(ROOT, 'src/assets'), path.join(DIST, 'assets'), { recursive: true });
fs.cpSync(path.join(ROOT, 'src/static'), DIST, { recursive: true });

// Drawn product images
const imgDir = path.join(DIST, 'assets/img/products');
fs.mkdirSync(imgDir, { recursive: true });
const DRAWN = { 'linac-16': art.linac, 'pvc-patch': art.patch, 'lineup-tee': tee, 'sticker-pack': art.stickers };
for (const [slug, fn] of Object.entries(DRAWN)) fs.writeFileSync(path.join(imgDir, `${slug}.svg`), fn());

// Data for the 3D viewer
const PP_DATA = { glyphs: { bold: glyphTable(bold, 'PROTNICES'), med: glyphTable(med, 'PROTNICES') }, mark: { p: P_D, plus: plusD() }, markPlus: PLUS, lockup: { word: WORD.d, sub: SUB.d, subScale: SUB_S } };
fs.writeFileSync(path.join(DIST, 'assets/js/pp-data.js'), `window.PP_DATA=${JSON.stringify(PP_DATA)};\n`);

// Pages
const pages = [home(), ...categoryPages(), ...productPages(), about(), ...labPages(), faqPage(), buyingGuide(), threadChart(), dealers(), contact(), ...legal(), searchPage(), journalIndex(), ...journalPosts(), notFound()];
for (const p of pages) {
  const file = p.file ? path.join(DIST, p.file) : path.join(DIST, p.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, p.html);
}

// Old product URLs (renamed 16 Oct 2026) forward to the new pages
const REDIRECTS = { '/suppressors/proton-big-game/': '/suppressors/proton-safari/', '/suppressors/proton-crossover/': '/suppressors/proton-adapt/' };
for (const [from, to] of Object.entries(REDIRECTS)) {
  fs.mkdirSync(path.join(DIST, from), { recursive: true });
  fs.writeFileSync(path.join(DIST, from, 'index.html'), `<!doctype html><meta charset="utf-8"><title>Moved</title><link rel="canonical" href="${SITE.url}${to}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${to}"><p>This page moved to <a href="${to}">${SITE.url}${to}</a>.</p>`);
}

// Search index: products from the catalog, everything else from page text
const strip = h => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
const index = PRODUCTS.map(p => ({ type: 'product', title: p.name, kicker: `${p.kicker} · ${p.status}`, url: url(p), img: productImg(p, 'card'),
  text: [p.short, ...p.long, p.caliber, p.material, p.mount, p.elName || '', ...p.specs.map(s => s.join(' '))].join(' ') }));
const productPaths = new Set(PRODUCTS.map(url));
for (const p of pages) {
  if (p.file || productPaths.has(p.path) || p.path === '/search/') continue;
  const title = (p.html.match(/<title>([^<]*)<\/title>/) || [])[1].replace(/ \| Protonic Precision.*/, '').replace(/^Protonic Precision.*/, 'Home').replace(/&amp;/g, '&');
  const main = (p.html.match(/<main id="main">([\s\S]*?)<\/main>/) || [])[1] || '';
  const type = /buying|thread|faq/.test(p.path) ? 'guide' : p.path.startsWith('/journal/') ? 'journal' : 'page';
  index.push({ type, title, kicker: type === 'guide' ? 'Guide' : type === 'journal' ? 'Journal' : 'Page', url: p.path, img: '', text: strip(main).slice(0, 2500) });
}
fs.writeFileSync(path.join(DIST, 'search.json'), JSON.stringify(index));

// Sitemap + robots
const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter(p => !p.file && p.path !== '/search/').map(p => `  <url><loc>${SITE.url}${p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n');
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);

// Check: every internal link and asset points at something that exists
const missing = new Set();
for (const p of pages) {
  for (const m of p.html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    let target = m[1];
    if (target.startsWith('//')) continue;
    const f = path.join(DIST, target);
    const ok = fs.existsSync(f) && (fs.statSync(f).isFile() || fs.existsSync(path.join(f, 'index.html')));
    if (!ok) missing.add(`${target}  (from ${p.path})`);
  }
}
console.log(`Built ${pages.length} pages, ${index.length} search entries into dist/`);
if (missing.size) { console.log(`Missing targets (${missing.size}):\n  ` + [...missing].slice(0, 40).join('\n  ')); process.exitCode = missing.size ? 1 : 0; }
