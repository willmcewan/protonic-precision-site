// Tells Bing (and so ChatGPT search, Copilot, DuckDuckGo) and Yandex that the site changed, via IndexNow.
// Reads the live sitemap, so run it after a deploy: `node tools/indexnow.mjs`. The key file is src/static/<KEY>.txt.
import { SITE } from '../src/data/site.mjs';

const KEY = 'ae7fd684b2c045044842b997950c8d6d';
const host = new URL(SITE.url).host;
const sitemap = await (await fetch(`${SITE.url}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]).concat(`${SITE.url}/llms.txt`);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE.url}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (!res.ok && res.status !== 202) { console.log(await res.text()); process.exitCode = 1; }
