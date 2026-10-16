// Page frame shared by every page: head, pre-launch bar, header with mega menu and search, footer, age gate.
import { lockups } from '../tools/brand/marks.mjs';
import { SITE, NAV, FOOTER, mailto } from './data/site.mjs';
import { bySlug, url as purl } from './data/products.mjs';

export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const ICON = {
  arrow: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  left: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.5 2.5 5 8l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  right: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.5 2.5 11 8l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  down: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 5.5 8 11l5.5-5.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  search: '<svg class="ico" viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m13 13 5 5" stroke="currentColor" stroke-width="1.7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" stroke-width="1.7"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" stroke="currentColor" stroke-width="1.7"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 12h16M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>',
};
export const arrowLink = (label, cls = '') => `<span class="link-arrow ${cls}">${esc(label)} ${ICON.arrow}</span>`;

// Logo symbols, colored per surface through CSS variables --m (main), --s (sub), --x (plus).
const L = lockups(), Ls = lockups({ solidPlus: true });
const sym = (id, Lk) => `<symbol id="s-${id}" viewBox="${Lk.vb.join(' ')}">` +
  Lk.parts.map(p => `<path style="fill:var(--${p.role})" fill-rule="evenodd" d="${p.d}"/>`).join('') + `</symbol>`;
export const LOGO_SYMBOLS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>` +
  sym('horizontal', L.horizontal) + sym('stacked', L.stacked) + sym('mark', L.mark) + sym('mark-small', Ls.mark) + `</defs></svg>`;
export const logo = (kind = 'horizontal', style = '--m:#edeeee;--s:#a2a5a8;--x:#d3212d', label = 'Protonic Precision') => {
  const vb = L[kind === 'mark-small' ? 'mark' : kind].vb;
  return `<svg viewBox="${vb.join(' ')}" style="${style}" role="img" aria-label="${esc(label)}"><use href="#s-${kind}" x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}"/></svg>`;
};

export function productImg(p, variant = 'card') {
  if (p.image) return `/assets/img/products/${p.slug}.svg`;
  return `/assets/img/products/${p.slug}-${variant}.webp`;
}

function megaMenu(item) {
  const cols = item.cols.map(c => `<div><h4>${esc(c.h)}</h4><ul>${c.links.map(([t, h]) => `<li><a href="${h}">${esc(t)}</a></li>`).join('')}</ul></div>`).join('');
  const f = item.feature && bySlug[item.feature];
  const feature = f ? `<a class="mega-feature" href="${purl(f)}"><img src="${productImg(f, 'card')}" alt="" loading="lazy"><div>
      <span class="chip chip--dev"><i></i>${esc(f.status)}</span><p class="h-s">${esc(f.name)}</p><p>${esc(f.short)}</p></div></a>` : '<div></div>';
  return `<div class="mega" id="mega-${item.slug}"><div class="wrap">${cols}${'<div></div>'.repeat(Math.max(0, 3 - item.cols.length))}${feature}</div></div>`;
}

function header(active) {
  const nav = NAV.map(item => `<div class="nav-item" data-mega>
      <button class="nav-link" type="button" aria-expanded="false" aria-controls="mega-${item.slug}"${active === item.slug ? ' aria-current="page"' : ''}>${esc(item.label)} ${ICON.down}</button>
      ${megaMenu(item)}</div>`).join('');
  const drawer = NAV.map(item => `<details><summary>${esc(item.label)} ${ICON.down}</summary><ul>
      <li><a href="/${item.slug}/">All ${esc(item.label.toLowerCase())}</a></li>${item.cols.flatMap(c => c.links).map(([t, h]) => `<li><a href="${h}">${esc(t)}</a></li>`).join('')}</ul></details>`).join('');
  return `
<a class="skip" href="#main">Skip to content</a>
<div class="notice"><div class="wrap"><span><b>+</b> Pre-launch. Every product here is in development.</span><a href="/contact/#updates">Get launch updates</a></div></div>
<header class="hdr" id="top">
  <div class="wrap hdr-top">
    <button class="icon-btn menu-btn" type="button" aria-label="Open menu" aria-controls="drawer" aria-expanded="false" data-open-drawer>${ICON.menu}</button>
    <a class="logo" href="/" aria-label="Protonic Precision home">${logo('horizontal')}</a>
    <form class="search" role="search" action="/search/" data-search>
      <label class="vh" for="q">Search</label>
      <input id="q" name="q" type="search" placeholder="Search suppressors, mounts, guides…" autocomplete="off" aria-autocomplete="list" aria-controls="q-results">
      ${ICON.search}
      <div class="search-results" id="q-results" role="listbox" hidden></div>
    </form>
    <div class="hdr-act">
      <a class="icon-btn hide-sm" href="/dealers/" aria-label="Find a dealer">${ICON.pin}<span class="tip">Find a dealer</span></a>
      <a class="icon-btn" href="/contact/#updates" aria-label="Get launch updates">${ICON.mail}<span class="tip">Launch updates</span></a>
    </div>
  </div>
  <nav class="nav" aria-label="Main"><div class="wrap">${nav}</div></nav>
</header>
<div class="drawer" id="drawer" hidden>
  <div class="drawer-top">${logo('horizontal').replace('<svg', '<svg class="lg"')}<button class="icon-btn" type="button" aria-label="Close menu" data-close-drawer>${ICON.close}</button></div>
  <form class="search" role="search" action="/search/"><label class="vh" for="q2">Search</label><input id="q2" name="q" type="search" placeholder="Search…">${ICON.search}</form>
  ${drawer}
  <a class="dlink" href="/dealers/">Find a dealer ${ICON.right}</a>
  <a class="dlink" href="/faq/">FAQ ${ICON.right}</a>
  <a class="dlink" href="/contact/">Contact ${ICON.right}</a>
</div>`;
}

function footer() {
  const cols = FOOTER.map(c => `<div><h4>${esc(c.h)}</h4><ul>${c.links.map(([t, h]) => `<li><a href="${h}">${esc(t)}</a></li>`).join('')}</ul></div>`).join('');
  return `
<footer class="ftr">
  <div class="wrap ftr-grid">
    <div class="join">
      <div class="ftr-mark">${logo('horizontal')}</div>
      <h4>Launch updates</h4>
      <p>One email when a can is ready, and one when dealers have stock. Nothing else.</p>
      <form data-join><label class="vh" for="join-email">Email address</label><input id="join-email" type="email" name="email" placeholder="Email" required><button type="submit" aria-label="Join the launch list">${ICON.arrow}</button></form>
      <small>Opens your email app with the request filled in.</small>
    </div>
    ${cols}
  </div>
  <div class="ftr-base"><div class="wrap">
    <span>© <span data-year>2026</span> Protonic Precision · Stable under pressure</span>
    <nav aria-label="Legal"><a href="/privacy/">Privacy</a><a href="/terms/">Terms of use</a><a href="${mailto('Website question')}">${esc(SITE.email)}</a></nav>
  </div></div>
</footer>`;
}

const GATE = `
<div class="gate" id="gate" hidden role="dialog" aria-modal="true" aria-labelledby="gate-h">
  <div class="gate-box">
    ${logo('mark', '--m:#111418;--x:#d3212d').replace('<svg', '<svg class="mk"')}
    <h2 id="gate-h" class="h-s" style="font-size:22px;text-transform:uppercase">Are you 21 or older?</h2>
    <p>This site is about suppressors and firearms. You must be 21 or older to enter.</p>
    <div class="btns"><button class="btn btn--ink" type="button" data-gate-yes>Yes, enter</button><button class="btn btn--line" type="button" data-gate-no>No</button></div>
    <p class="gate-no" data-gate-msg hidden>Come back when you're 21.</p>
    <small>We remember your answer on this device. No cookies, no tracking.</small>
  </div>
</div>`;

export function page({ title, description = SITE.description, path = '/', active = '', body, scripts = '', head = '', image = '/og.jpg', noindex = false }) {
  const full = title ? `${title} | ${SITE.name}` : `${SITE.name} | Suppressors built from first principles`;
  const canonical = SITE.url + path;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title || SITE.name)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#111418">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/css/site.css?v=${BUILD_ID}">
${head}
</head>
<body>
${LOGO_SYMBOLS}
${header(active)}
<main id="main">
${body}
</main>
${footer()}
${GATE}
<script src="/assets/js/site.js?v=${BUILD_ID}" defer></script>
${scripts}
</body>
</html>
`;
}
export const BUILD_ID = Date.now().toString(36);

// ---------- shared blocks ----------
export function crumbs(items) {
  return `<nav class="crumbs wrap" aria-label="Breadcrumb">${items.map(([t, h], i) => i < items.length - 1 ? `<a href="${h}">${esc(t)}</a><span>/</span>` : `<span aria-current="page" style="margin:0;color:inherit">${esc(t)}</span>`).join('')}</nav>`;
}
export function banner(title, tag, eyebrow = '') {
  return `<section class="banner"><div class="wrap"><div>${eyebrow ? `<p class="eyebrow" style="margin-bottom:12px">${eyebrow}</p>` : ''}<h1>${title}</h1></div><p class="tag">${tag}</p></div></section>`;
}
export function secHead(eyebrow, title, { center = false, extra = '', id = '' } = {}) {
  return `<div class="sec-head${center ? ' center' : ''}"><p class="eyebrow">${eyebrow}</p>${extra ? `<div class="row"><h2 class="h-l"${id ? ` id="${id}"` : ''}>${title}</h2>${extra}</div>` : `<h2 class="h-l"${id ? ` id="${id}"` : ''}>${title}</h2>`}<span class="tick"></span></div>`;
}
export function chip(status) {
  return `<span class="chip${/develop|design/i.test(status) ? ' chip--dev' : ''}"><i></i>${esc(status)}</span>`;
}
export function productCard(p) {
  return `<a class="pcard" href="${purl(p)}"><div class="well">${chip(p.status)}<img src="${productImg(p, 'card')}" alt="${esc(p.name)}" loading="lazy" width="600" height="600"></div>
    <div class="body"><p class="eyebrow">${esc(p.kicker)}</p><h3>${esc(p.name)}</h3><p>${esc(p.short)}</p>${arrowLink('View product')}</div></a>`;
}
