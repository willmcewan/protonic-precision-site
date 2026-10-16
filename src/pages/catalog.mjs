import { page, esc, ICON, arrowLink, banner, crumbs, chip, productCard, productImg, secHead, swatchDots } from '../layout.mjs';
import { CATEGORIES, PRODUCTS, inCat, url, TBD } from '../data/products.mjs';
import { mailto } from '../data/site.mjs';

const FILTERS = [
  ['status', 'Status', p => [p.status]],
  ['caliber', 'Caliber', p => p.filters.caliber],
  ['material', 'Material', p => p.filters.material ? [p.filters.material] : []],
  ['mount', 'Mount', p => p.filters.mount],
];

function listingCard(p) {
  const data = FILTERS.map(([k, , f]) => `data-${k}="${esc(f(p).join('|'))}"`).join(' ');
  const rows = p.cat === 'apparel'
    ? [['Type', p.kicker], ['Material', p.material || '—'], ['Status', p.status]]
    : [['Caliber', p.caliber], ['Length', p.length], ['Material', p.material], ['Mount', p.mount]];
  return `<a class="lcard" href="${url(p)}" ${data} data-name="${esc(p.name)}" data-z="${p.z || 999}">
    <div class="well">${chip(p.status)}${p.el && p.z ? `<span class="el">${p.el}<small>${p.z}</small></span>` : ''}<img src="${productImg(p, 'card')}" alt="${esc(p.name)}" loading="lazy" width="600" height="450"></div>
    <div class="body"><p class="eyebrow">${esc(p.kicker)}</p><h3>${esc(p.name)}</h3>
      <dl class="specs">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
      <div class="foot">${p.colors ? swatchDots(p) : `<span class="mat">${esc(p.el && p.z ? `${p.elName} · ${p.z} protons` : p.status)}</span>`}${arrowLink('View')}</div></div></a>`;
}

export function categoryPages() {
  return CATEGORIES.map(c => {
    const items = inCat(c.slug);
    const groups = FILTERS.map(([k, label, f]) => {
      const counts = {};
      items.forEach(p => f(p).forEach(v => { if (v) counts[v] = (counts[v] || 0) + 1; }));
      const vals = Object.keys(counts);
      if (vals.length < 2 && k !== 'status') return '';
      if (!vals.length) return '';
      return `<details open><summary>${label} ${ICON.down}</summary><div class="opts">${vals.map(v => `<label><input type="checkbox" name="${k}" value="${esc(v)}"> ${esc(v)} <span>${counts[v]}</span></label>`).join('')}</div></details>`;
    }).join('');
    const intro = {
      suppressors: `Every Protonic can is named for the job it does: Plinker for rimfire, Sidearm for 9mm, Safari for rifles and Adapt for the big bores. Black is sold out in every size; Desert Sand and Grey are coming soon.`,
      firearms: `The LINAC line is a rifle designed suppressor-first. Coming soon.`,
      mounts: `Gluon mounts hold Proton Safari and Proton Adapt to a rifle. Pion pistons and spacers hold Proton Sidearm and Proton Adapt to a pistol or carbine. Every can uses the same 1-3/8x24 rear thread.`,
      apparel: `Coins, patches, stickers and shirts in small runs. These ship straight to you.`,
    }[c.slug];
    const body = banner(c.name, c.tag, c.eyebrow) + crumbs([['Home', '/'], [c.name, `/${c.slug}/`]]) + `
    <section class="sec sec--paper" style="padding-top:16px"><div class="wrap">
      <p class="lede" style="margin-bottom:28px">${intro}</p>
      <div class="listing" data-listing>
        <aside class="filters" aria-label="Filter products"><h2>Filter</h2>${groups}<button class="clear" type="button" data-clear>Clear filters</button></aside>
        <div>
          <div class="toolbar"><p><b data-count>${items.length}</b> of ${items.length} products</p>
            <label>Sort <select data-sort><option value="pos">Featured</option><option value="name">Name</option></select></label></div>
          <div class="grid" data-grid>${items.map(listingCard).join('')}</div>
          <p class="empty" data-empty hidden>Nothing matches those filters. <button class="clear" type="button" data-clear>Clear filters</button></p>
        </div>
      </div>
    </div></section>
    ${c.slug === 'suppressors' ? buyingStrip() : ''}`;
    return { path: `/${c.slug}/`, html: page({ title: c.name, path: `/${c.slug}/`, active: c.slug, description: `${c.name} from Protonic Precision. ${c.blurb}`, body }) };
  });
}

function buyingStrip() {
  return `<section class="sec sec--dark"><div class="wrap">
    ${secHead('Before you buy', 'How buying a can works', { extra: `<a class="link-arrow" href="/buying-a-suppressor/">Full buying guide ${ICON.arrow}</a>` })}
    <div class="steps">
      <div class="step"><h3 class="h-s">Check your state</h3><p>Suppressors are legal to own in most states. Eight states and D.C. ban them for civilians.</p></div>
      <div class="step"><h3 class="h-s">Pick a dealer</h3><p>Suppressors ship only to a licensed dealer (FFL/SOT) in your state. Never to your door.</p></div>
      <div class="step"><h3 class="h-s">Do the paperwork</h3><p>A background check always. Whether you also file a Form 4 depends on your state right now.</p></div>
      <div class="step"><h3 class="h-s">Pick it up</h3><p>Collect your can at the dealer. Mount it, and shoot it.</p></div>
    </div></div></section>`;
}

export function productPages() {
  return PRODUCTS.map(p => {
    const isCan = p.cat === 'suppressors', has3d = !!p.render;
    const cat = { suppressors: 'Suppressors', firearms: 'Firearms', mounts: 'Mounts', apparel: 'Apparel & Swag' }[p.cat];
    const viewsFor = color => p.image ? [['card', productImg(p), 'Main']] : [['wide', productImg(p, 'wide', color), 'Side A'], ...(p.chart ? [['sizes', `/assets/img/products/${p.slug}-sizes.webp`, 'Caliber chart']] : []), ...(isCan ? [['side', productImg(p, 'side', color), 'Side B']] : []), ['card', productImg(p, 'card', color), 'Angle']];
    const views = viewsFor(p.color);
    const thumbs = views.map(([k, src, label], i) => `<button type="button" aria-pressed="${i === 0}" data-view="${src}" aria-label="View: ${label}"><img src="${src}" alt="" loading="lazy"></button>`).join('') +
      (has3d ? `<button type="button" aria-pressed="false" data-3d aria-label="Rotate in 3D">360° view</button>` : '');
    const keys = p.cat === 'apparel' ? [['Type', p.kicker], ['Material', p.material], ['Status', p.status]] : [['Caliber', p.caliber], [p.cat === 'firearms' ? 'Barrel' : 'Length', p.length], ['Material', p.material]];
    const specRows = p.specs.map(([k, v, n]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}${n ? `<small>${esc(n)}</small>` : ''}</td></tr>`).join('');
    const hasTarget = p.specs.some(s => s[2] && /target|goal/i.test(s[2])) || p.specs.some(s => s[1] === TBD);
    const related = PRODUCTS.filter(q => q.slug !== p.slug && (q.cat === p.cat || (isCan && q.cat === 'mounts') || (p.cat === 'mounts' && q.cat === 'suppressors'))).slice(0, 4);
    const notifyFor = c => c
      ? mailto(`Notify me: ${p.name} in ${c.name}`, `Please let me know when the ${p.name} in ${c.name} is ${c.status === 'Sold out' ? 'back in stock' : 'available'}.\n\nMy state: `)
      : mailto(`Notify me: ${p.name}`, `Please let me know when the ${p.name} is available.\n\nMy state: `);
    const cur = p.colors && p.colors.find(c => c.key === p.color);
    const notify = notifyFor(cur);
    const notifyLabel = c => c && c.status === 'Sold out' ? 'Notify me when it\'s back' : 'Get notified';
    const picker = p.colors ? `<div class="colorways" data-colorways>
          <p class="cw-label">Colorway <b data-cw-name>${esc(cur.name)}</b><span data-cw-status>${esc(cur.status)}</span></p>
          <div class="swatches" role="radiogroup" aria-label="Colorway">${p.colors.map(c => `<button type="button" role="radio" class="sw${c.status === 'Sold out' ? ' out' : ''}" aria-checked="${c === cur}" style="--sw:${c.hex}"
            data-cw="${c.key}" data-name="${esc(c.name)}" data-status="${esc(c.status)}" data-finish="${c.finish}" data-cw-href="${esc(notifyFor(c))}" data-cw-cta="${esc(notifyLabel(c))}"
            data-views="${esc(viewsFor(c.key).map(v => v[1]).join('|'))}"><i></i><span>${esc(c.name)}<small>${esc(c.status)}</small></span></button>`).join('')}</div>
        </div>` : '';
    const body = crumbs([['Home', '/'], [cat, `/${p.cat}/`], [p.name, url(p)]]) + `
    <section class="sec--paper on-paper"><div class="wrap pdp">
      <div class="gallery" data-gallery data-slug="${p.slug}">
        <div class="stage" data-stage><img src="${views[0][1]}" alt="${esc(p.name)}" width="1600" height="1200" fetchpriority="high">${p.el && p.z ? `<span class="el">${p.el}<small>${p.z} protons</small></span>` : ''}<span class="hint" data-hint hidden>Drag to turn</span></div>
        <div class="thumbs">${thumbs}</div>
      </div>
      <div class="buy">
        <div style="display:flex;gap:8px;flex-wrap:wrap">${chip(p.status)}</div>
        <p class="eyebrow">${esc(p.kicker)}</p>
        <h1>${esc(p.name)}</h1>
        ${p.cat !== 'apparel' ? `<p class="sub">${esc(p.caliber)}<span>|</span>${esc(p.length)}</p>` : ''}
        <p class="desc">${esc(p.short)}</p>
        ${picker}
        <div class="keyspecs">${keys.map(([k, v]) => `<div><b>${esc(v || '—')}</b><span>${esc(k)}</span></div>`).join('')}</div>
        <div class="actions">
          <a class="btn btn--ink btn--block" href="${notify}" data-notify><span data-notify-label>${notifyLabel(cur)}</span> ${ICON.arrow}</a>
          ${isCan || p.cat === 'firearms' ? `<a class="btn btn--line btn--block" href="/dealers/">Find a dealer</a>` : ''}
        </div>
        <p class="note">${p.colors ? 'Black is sold out in every size. Desert Sand and Grey are coming soon' : p.status}.${isCan ? ' Ships to any licensed dealer in your state.' : ''}</p>
      </div>
    </div></section>
    <section class="sec sec--paper" style="padding-top:0"><div class="wrap">
      <nav class="tabs" aria-label="On this page"><a href="#overview">Overview</a><a href="#specs">Specs</a>${isCan ? '<a href="#buying">Buying</a>' : ''}<a href="#related">Related</a></nav>
      <div class="detail" id="overview">
        <div><p class="eyebrow">Overview</p><h2 class="h-m" style="margin:8px 0 18px">${esc(p.kicker)}</h2><div class="prose">${p.long.map(t => `<p>${esc(t)}</p>`).join('')}</div></div>
        <div class="feat" style="grid-template-columns:minmax(0,1fr)">${p.features.map(([h, t]) => `<div><h3 class="h-s">${esc(h)}</h3><p>${esc(t)}</p></div>`).join('')}</div>
      </div>
      <div class="detail" id="specs" style="margin-top:clamp(48px,6vw,80px)">
        <div><p class="eyebrow">Specifications</p><h2 class="h-m" style="margin:8px 0 18px">${esc(p.name)} specs</h2><p class="lede">${isCan ? 'Sound numbers are published with the test method, the ammo and the host, or not at all.' : 'Specs can change without notice.'}</p></div>
        <table class="spec-table"><tbody>${specRows}</tbody></table>
      </div>
    </div></section>
    ${isCan ? `<div id="buying">${buyingStrip()}</div>` : ''}
    <section class="sec sec--paper rule-top" id="related"><div class="wrap">
      ${secHead('Works with', 'Related products', { extra: `<div class="car-btns"><button class="round" type="button" data-car-prev aria-label="Previous products">${ICON.left}</button><button class="round" type="button" data-car-next aria-label="Next products">${ICON.right}</button></div>` })}
      <div class="carousel" data-carousel><div class="track">${related.map(productCard).join('')}</div></div>
    </div></section>`;
    const scripts = has3d ? `<script>window.PP_MODEL=${JSON.stringify(p.render)};</script>` : '';
    return { path: url(p), html: page({ title: `${p.name} ${p.kicker}`, path: url(p), active: p.cat, description: `${p.name}: ${p.short}`, body, scripts }) };
  });
}
