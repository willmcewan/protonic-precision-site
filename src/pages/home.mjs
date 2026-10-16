import { page, esc, ICON, arrowLink, secHead, productCard, productImg, logo } from '../layout.mjs';
import { PRODUCTS, bySlug, url, money } from '../data/products.mjs';
import { FAQ, SITE, mailto } from '../data/site.mjs';
import { bafflesArt, testingArt, materialsArt, markArt } from '../art.mjs';
import { POSTS } from './journal.mjs';
import { FIELD, photo } from '../data/photos.mjs';

// The hero can: Proton Adapt in black, exploded by assets/js/hero.js.
const HERO = { ...bySlug['proton-adapt'].render, finish: 'black', explode: true, yaw0: -Math.PI / 2 };

export function home() {
  const hero = `<section class="hx" data-explode='${JSON.stringify(HERO)}' aria-labelledby="h-hero">
    <div class="slide-bg"></div>
    <div class="wrap hx-wrap"><div class="hx-copy">
      <div><p class="eyebrow">Suppressors · .22 rimfire to .45-70</p>
      <h1 class="h-xl" id="h-hero" style="margin-top:14px">Built from first principles<span class="plus-red">.</span></h1></div>
      <div><p class="lede">Four cans named for the job they do, and every part designed to work with the rest.</p>
      <div class="hx-btns"><a class="btn btn--ti" href="/suppressors/">Shop suppressors ${ICON.arrow}</a><a class="btn btn--line" href="/lab/engineering/">How a can works</a></div></div>
    </div></div>
    <div class="hx-stage">
      <img class="hx-poster" src="${productImg(bySlug['proton-adapt'], 'wide', 'black')}" alt="" fetchpriority="high" width="1600" height="1200">
      <canvas class="hx-canvas" aria-hidden="true"></canvas>
    </div>
    <p class="hx-cap"><a href="${url(bySlug['proton-adapt'])}">Proton Adapt</a> · Exploded view · Internals illustrative</p>
  </section>`;

  const cat = (cls, href, eyebrow, title, text, art, cta = 'See the line') =>
    `<a class="cat ${cls}" href="${href}"><div class="art">${art}</div><p class="eyebrow">${eyebrow}</p><h3>${title}</h3><p>${text}</p>${arrowLink(cta)}</a>`;
  const cats = `<section class="sec sec--paper" aria-labelledby="h-lineup"><div class="wrap">
    ${secHead('Product lineup', 'Pick the job', { center: true, id: 'h-lineup' })}
    <div class="cats">
      ${cat('wide', '/suppressors/', 'Rimfire · Pistol · Rifle · Big bore', 'Suppressors', 'Four cans named for the job they do: Proton Plinker, Sidearm, Adapt and Safari.', `<img src="${productImg(bySlug['proton-adapt'], 'card')}" alt="" loading="lazy">`)}
      ${cat('sm', '/mounts/', 'Rifle mounts · Pistons', 'Mounts', 'Gluon mounts hold a can on a rifle. Pion pistons hold it on a pistol.', `<img src="${productImg(bySlug['gluon-dt'], 'card')}" alt="" loading="lazy">`)}
      ${cat('sm', '/lab/', 'Engineering · Testing · Materials', 'The Lab', 'How we design, what we build from, and how we prove it.', bafflesArt(), 'Go inside')}
      ${cat('sm', '/apparel/', 'Coins · Patches · Tees', 'Apparel & Swag', 'Challenge coins, patches and shirts in small runs.', `<img src="${productImg(bySlug['challenge-coin'], 'card')}" alt="" loading="lazy">`)}
    </div></div></section>`;

  const order = [...PRODUCTS].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  const latest = `<section class="sec sec--paper rule-top" aria-labelledby="h-latest"><div class="wrap">
    ${secHead('New & notable', 'Latest products', { id: 'h-latest', extra: `<div class="car-btns"><button class="round" type="button" data-car-prev aria-label="Previous products">${ICON.left}</button><button class="round" type="button" data-car-next aria-label="Next products">${ICON.right}</button></div>` })}
    <div class="carousel" data-carousel><div class="track">${order.map(productCard).join('')}</div></div>
  </div></section>`;

  const field = `<section class="sec sec--deep" aria-labelledby="h-field"><div class="wrap">
    ${secHead('Out there', 'In the field', { id: 'h-field', extra: `<a class="link-arrow" href="/suppressors/">All suppressors ${ICON.arrow}</a>` })}
    <div class="field">${FIELD.map(([f, slug, eyebrow, line], i) => `<a class="shot${[' shot--big', ' shot--wide'][i] || ''}" href="${url(bySlug[slug])}"><img src="${photo(f)}" alt="${esc(eyebrow)}" loading="lazy"><span class="cap"><b>${esc(eyebrow)}</b>${esc(line)}</span></a>`).join('')}</div>
  </div></div></section>`;

  const lab = (href, eyebrow, title, text, art, cta) => `<a class="lab" href="${href}"><div class="art">${art}</div><div class="body"><p class="eyebrow">${eyebrow}</p><h3>${title}</h3><span class="tick"></span><p>${text}</p><span class="btn btn--line">${cta}</span></div></a>`;
  const labs = `<section class="sec sec--deep" aria-labelledby="h-lab"><div class="wrap">
    ${secHead('Build · Test · Prove', 'Inside the Lab', { id: 'h-lab' })}
    <div class="labs">
      ${lab('/lab/engineering/', 'Engineering', 'First<br>principles', 'A suppressor is a chain: each baffle takes part of the blast and hands less to the next. We design the chain, not the tube.', bafflesArt(), 'How we design')}
      ${lab('/lab/testing/', 'Testing', 'Measured,<br>then published', 'Sound numbers go online with the method, the ammo, the rifle and the barrel length, or they don\'t go online.', testingArt(), 'How we test')}
      ${lab('/lab/materials/', 'Materials', 'Every atom<br>accounted for', 'Stainless where the gas hits hard, aluminum where it doesn\'t. The cheapest metal that does each job.', materialsArt(), 'What we build from')}
    </div></div></section>`;

  const journal = `<section class="sec sec--paper" aria-labelledby="h-journal"><div class="wrap">
    ${secHead('Follow along', 'From the journal', { id: 'h-journal', extra: `<a class="link-arrow" href="/journal/">All entries ${ICON.arrow}</a>` })}
    <div class="posts">${POSTS.map(p => `<a class="post" href="/journal/${p.slug}/"><div class="art">${p.art()}</div><div class="body"><p class="eyebrow">${esc(p.date)} · ${esc(p.tag)}</p><h3>${esc(p.title)}</h3><p>${esc(p.dek)}</p>${arrowLink('Read')}</div></a>`).join('')}</div>
  </div></section>`;

  const about = `<section class="sec sec--dark" aria-labelledby="h-about"><div class="wrap">
    <div class="about">
      <div>${secHead('About Protonic Precision', 'Stable under pressure<span class="plus-red">.</span>', { id: 'h-about' })}</div>
      <div class="prose">
        <p>Protonic Precision is two brothers making suppressors from first principles. The name comes from the proton, from the Greek <em>prōtos</em>, "first." Protons push apart with enormous force, the strongest force in nature holds them together anyway, and no one has ever seen one fail.</p>
        <p>That's the whole job of a suppressor: hold violent energy in a small space, shot after shot, without breaking.</p>
        <div><a class="btn btn--line" href="/about/">Our story ${ICON.arrow}</a></div>
      </div>
    </div>
    <div class="boxes">
      <div><p class="eyebrow">What we make</p><p>Four suppressors from .22 rimfire to .45-70, and the Gluon and Pion mounts that hold them on. Each part of the system is designed to work with the rest.</p></div>
      <div><p class="eyebrow">How we work</p><p>Physics is the story; specs sell the product. We publish measured numbers with the method behind them, and we don't publish anything we haven't measured.</p></div>
      <div><p class="eyebrow">Who we are</p><p>Two brothers. Like a proton, most of what holds us together is the bond, not the parts.</p></div>
    </div>
    <div class="stats">
      <div class="stat"><b>p<sup>+</sup></b><span>The mark · charge +1</span></div>
      <div class="stat"><b>4</b><span>Cans in the line</span></div>
      <div class="stat"><b>10<sup>34</sup>+</b><span>Years · proton lifetime</span></div>
      <div class="stat"><b>2</b><span>Brothers</span></div>
    </div>
  </div></section>`;

  const faqs = FAQ.filter(f => f[3]).map(([id, q, a], i) => `<details class="qa" id="${id}"><summary><span class="n">${String(i + 1).padStart(2, '0')}</span>${esc(q)}<span class="pm" aria-hidden="true"></span></summary><div class="a">${a}</div></details>`).join('');
  const faq = `<section class="sec sec--paper" aria-labelledby="h-faq"><div class="wrap faq">
    <div class="faq-side">${secHead('Got questions', 'Frequently asked', { id: 'h-faq' })}<p class="lede">Buying, owning and running a suppressor, and what we make.</p><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn--ink" href="/faq/">All questions ${ICON.arrow}</a><a class="btn btn--line" href="/contact/">Contact us</a></div></div>
    <div>${faqs}</div>
  </div></section>`;

  const cta = `<section class="sec sec--dark rule-top"><div class="wrap cta">
    ${logo('mark').replace('<svg', '<svg style="width:72px;--m:#edeeee;--x:#d3212d"')}
    <p class="eyebrow" style="margin-top:18px">Find a dealer</p>
    <h2 class="h-l">Black is sold out</h2>
    <p class="lede">Every size is sold out in Black, and Desert Sand and Grey are coming soon. Get a restock alert, and we'll ship your can to any licensed dealer in your state.</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><a class="btn btn--ti" href="/contact/#updates">Get restock alerts ${ICON.arrow}</a><a class="btn btn--line" href="/dealers/#program">Dealer program</a></div>
  </div></section>`;

  // Ties the site to its Instagram for search engines.
  const org = { '@context': 'https://schema.org', '@type': 'Organization', name: SITE.name, url: SITE.url, logo: SITE.url + '/apple-touch-icon.png', email: SITE.email, sameAs: [SITE.instagram.url] };
  return { path: '/', html: page({ path: '/', head: `<script type="application/ld+json">${JSON.stringify(org)}</script>`, body: hero + cats + latest + field + labs + journal + about + faq + cta, scripts: '<script src="/assets/js/hero.js" defer></script>' }) };
}
