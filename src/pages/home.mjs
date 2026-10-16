import { page, esc, ICON, arrowLink, secHead, productCard, productImg, logo } from '../layout.mjs';
import { PRODUCTS, bySlug, url, money } from '../data/products.mjs';
import { FAQ, SITE, mailto } from '../data/site.mjs';
import { bafflesArt, testingArt, materialsArt, markArt } from '../art.mjs';
import { POSTS } from './journal.mjs';

const SLIDES = [
  { p: 'proton-plinker', eyebrow: 'Suppressors · .22 rimfire', title: 'Proton Plinker', big: '.22', text: 'The can for cans off a fencepost. For every .22 and .17 rimfire, and priced to be your first suppressor.', cta: 'View Proton Plinker' },
  { p: 'proton-sidearm', eyebrow: 'Suppressors · 9mm', title: 'Proton Sidearm', big: '9', text: 'For the handgun on your hip and the carbine in the safe. The piston and the fixed spacer come in the box.', cta: 'View Proton Sidearm' },
  { p: 'proton-adapt', eyebrow: 'Suppressors · Rifle', title: 'Proton Adapt', big: '.30', text: 'One can that adapts to every rifle you own, from your AR to your elk rifle. 5.56 to .300 Win Mag.', cta: 'View Proton Adapt' },
  { p: 'proton-safari', eyebrow: 'Suppressors · Multi-caliber', title: 'Proton Safari', big: '.46', text: 'The big-bore can. .45 ACP on Saturday, .45-70 on Sunday, and everything in between.', cta: 'View Proton Safari' },
  { p: 'challenge-coin', eyebrow: 'Protonic Precision', title: 'Stable under pressure<span class="plus-red">.</span>', big: 'p⁺', text: 'Protons hold together under enormous force, and none has ever been seen to fail. That\'s the job of a suppressor.', cta: 'Read the story', href: '/about/' },
  { p: 'gluon-dt', eyebrow: 'Mounts · Gluon system', title: 'Gluon DT', big: 'g', text: 'Gluons hold a proton together. This holds the can to the rifle: barrel threads, mount, can.', cta: 'View Gluon DT' },
];

export function home() {
  const slides = SLIDES.map((s, i) => {
    const p = bySlug[s.p];
    return `<article class="slide${i === 0 ? ' on' : ''}" aria-roledescription="slide" aria-label="${i + 1} of ${SLIDES.length}"${i ? ' aria-hidden="true"' : ''}>
      <div class="slide-bg"></div><span class="slide-big" aria-hidden="true">${s.big}</span>
      <div class="slide-art"><img src="${productImg(p, 'hero')}" alt="" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} width="1600" height="1000"></div>
      <div class="wrap" style="height:100%"><div class="slide-copy"><p class="eyebrow">${esc(s.eyebrow)}</p><h2 class="h-xl" style="margin-top:14px">${s.title}</h2><span class="tick"></span>
        <p class="lede">${esc(s.text)}</p>${s.href ? '' : `<p class="price price--slide">${money(p.price)}</p>`}<div><a class="btn btn--ti" href="${s.href || url(p)}"${i ? ' tabindex="-1"' : ''}>${esc(s.cta)} ${ICON.arrow}</a></div></div></div>
    </article>`;
  }).join('');

  const hero = `<section class="hero" aria-roledescription="carousel" aria-label="Featured" data-slider>
    <div class="slides">${slides}</div>
    <div class="hero-ctrl"><div class="wrap">
      <div class="bars" role="tablist" aria-label="Slides">${SLIDES.map((s, i) => `<button type="button" role="tab" aria-label="Slide ${i + 1}: ${esc(s.title.replace(/<[^>]+>/g, ''))}" aria-selected="${i === 0}"${i === 0 ? ' class="on"' : ''}><span></span></button>`).join('')}</div>
      <div class="pager"><button type="button" data-prev aria-label="Previous slide">${ICON.left}</button><output aria-live="polite"><b>01</b>/ ${String(SLIDES.length).padStart(2, '0')}</output><button type="button" data-next aria-label="Next slide">${ICON.right}</button></div>
    </div></div>
  </section>`;

  const cat = (cls, href, eyebrow, title, text, art, cta = 'See the line') =>
    `<a class="cat ${cls}" href="${href}"><div class="art">${art}</div><p class="eyebrow">${eyebrow}</p><h3>${title}</h3><p>${text}</p>${arrowLink(cta)}</a>`;
  const cats = `<section class="sec sec--paper" aria-labelledby="h-lineup"><div class="wrap">
    ${secHead('Product lineup', 'Pick the job', { center: true, id: 'h-lineup' })}
    <div class="cats">
      ${cat('', '/suppressors/', 'Rimfire · Pistol · Rifle · Big bore', 'Suppressors', 'Four cans named for the job they do: Proton Plinker, Sidearm, Adapt and Safari.', `<img src="${productImg(bySlug['proton-adapt'], 'card')}" alt="" loading="lazy">`)}
      ${cat('', '/firearms/', 'Rifles · Coming soon', 'Firearms', 'LINAC: a rifle designed around the can from the first drawing. Coming soon.', `<img class="inv" src="/assets/img/products/linac-16.svg" alt="" loading="lazy" style="filter:invert(.9)">`, 'See what\'s coming')}
      ${cat('sm', '/mounts/', 'Rifle mounts · Pistons', 'Mounts', 'Gluon mounts hold a can on a rifle. Pion pistons hold it on a pistol.', `<img src="${productImg(bySlug['gluon-dt'], 'card')}" alt="" loading="lazy">`)}
      ${cat('sm', '/lab/', 'Engineering · Testing · Materials', 'The Lab', 'How we design, what we build from, and how we prove it.', bafflesArt(), 'Go inside')}
      ${cat('sm', '/apparel/', 'Coins · Patches · Tees', 'Apparel & Swag', 'Challenge coins, patches and shirts in small runs.', `<img src="${productImg(bySlug['challenge-coin'], 'card')}" alt="" loading="lazy">`)}
    </div></div></section>`;

  const order = [...PRODUCTS].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  const latest = `<section class="sec sec--paper rule-top" aria-labelledby="h-latest"><div class="wrap">
    ${secHead('New & notable', 'Latest products', { id: 'h-latest', extra: `<div class="car-btns"><button class="round" type="button" data-car-prev aria-label="Previous products">${ICON.left}</button><button class="round" type="button" data-car-next aria-label="Next products">${ICON.right}</button></div>` })}
    <div class="carousel" data-carousel><div class="track">${order.map(productCard).join('')}</div></div>
  </div></section>`;

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
        <p>That's the whole job of a suppressor: hold violent energy in a small space, shot after shot, without breaking. Cans come first. A rifle line designed around them comes next.</p>
        <div><a class="btn btn--line" href="/about/">Our story ${ICON.arrow}</a></div>
      </div>
    </div>
    <div class="boxes">
      <div><p class="eyebrow">What we make</p><p>Four suppressors from .22 rimfire to .45-70, the Gluon and Pion mounts that hold them on, and, coming soon, rifles built suppressor-first. Each part of the system is designed to work with the rest.</p></div>
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
  return { path: '/', html: page({ path: '/', head: `<script type="application/ld+json">${JSON.stringify(org)}</script>`, body: hero + cats + latest + labs + journal + about + faq + cta }) };
}
