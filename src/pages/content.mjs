import { page, esc, ICON, arrowLink, banner, crumbs, secHead, logo } from '../layout.mjs';
import { SITE, FAQ, mailto } from '../data/site.mjs';
import { bafflesArt, testingArt, materialsArt, markArt } from '../art.mjs';
import { photo, ILLUSTRATIVE } from '../data/photos.mjs';

const fig = (name, alt, w, h, cap = '', cls = 'photo-band') => `<figure class="${cls}"><img src="${photo(name)}" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy">${cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}</figure>`;

const ATF_UPDATE = 'https://www.atf.gov/firearms/update-to-nfa-transfer-guidance';
const ATF_TIMES = 'https://www.atf.gov/resource-center/current-processing-times';
const SS_LEGAL = 'https://www.silencershop.com/where-are-silencers-legal';
const SS_HUNT = 'https://www.silencershop.com/where-silencers-are-legal-for-hunting';

const P = (o) => ({ path: o.path, html: page(o) });
const article = (toc, inner) => `<section class="sec sec--paper" style="padding-top:24px"><div class="wrap article">
  <aside class="toc"><p class="eyebrow">On this page</p>${toc.map(([id, t]) => `<a href="#${id}">${esc(t)}</a>`).join('')}</aside>
  <article class="rich">${inner}</article></div></section>`;

export function about() {
  const body = banner('About', 'Two brothers. <em>One</em> bond.', 'Protonic Precision') + crumbs([['Home', '/'], ['About', '/about/']]) + `
  <section class="sec sec--paper" style="padding-top:24px"><div class="wrap about">
    <div>${secHead('Our story', 'Stable under pressure<span class="plus-red">.</span>')}</div>
    <div class="prose" style="color:var(--ink-2)">
      <p>The proton takes its name from the Greek <em>prōtos</em>, "first." It sits at the center of every atom, and the number of protons decides what that atom is: 22 makes titanium, 28 makes nickel. Packed into the nucleus, protons push apart with enormous force, yet the strongest force in nature holds them in place, and no one has ever seen a proton fail.</p>
      <p>That's the job of a suppressor: hold violent energy in a small space, shot after shot, without breaking. Protonic Precision builds suppressors from first principles, to the tolerances physics demands.</p>
      <p>We're two brothers, and like a proton, most of our strength comes from what holds us together.</p>
    </div>
  </div>
  <div class="wrap">${fig('bench', 'Measuring a can with calipers on the workbench', 1800, 583)}</div></section>
  <section class="sec sec--dark"><div class="wrap">
    ${secHead('What we believe', 'How we work')}
    <div class="feat">
      <div><h3 class="h-s">Physics is the story</h3><p>Protons explain our name. They are never a product claim. Nothing we make uses "proton technology."</p></div>
      <div><h3 class="h-s">Specs sell the product</h3><p>dB with the test method, length, material and thread. If we haven't measured it, we don't print it.</p></div>
      <div><h3 class="h-s">Cans first, rifles next</h3><p>The suppressors come first. The LINAC rifle is built around them, and it's coming soon.</p></div>
    </div>
    <div class="stats" style="margin-top:clamp(36px,5vw,60px)">
      <div class="stat"><b>p<sup>+</sup></b><span>The mark · charge +1</span></div>
      <div class="stat"><b>1920</b><span>Year the proton was named</span></div>
      <div class="stat"><b>10<sup>34</sup>+</b><span>Years · proton lifetime</span></div>
      <div class="stat"><b>2</b><span>Brothers</span></div>
    </div>
  </div></section>
  <section class="sec sec--paper"><div class="wrap about">
    <div>${secHead('The mark', 'p<sup style="font-size:.5em;color:var(--red)">+</sup>, drawn on a grid')}</div>
    <div class="prose" style="color:var(--ink-2)">
      <p>Physicists write the proton as p⁺. Our mark is that symbol: a perfect ring, the shape of a can seen end-on, and a plus with an open center, so it reads as a reticle as well as a charge.</p>
      <p>Our colors are an atom. Red is the proton (+), grey the neutron (0), black the electron (−). The red belongs to the plus and almost nothing else.</p>
      <div><a class="btn btn--ink" href="/journal/why-protonic/">Why we named it Protonic ${ICON.arrow}</a></div>
    </div>
  </div>
  <div class="wrap"><div class="atoms">${[['atom-red', 'Proton · +'], ['atom-grey', 'Neutron · 0'], ['atom-black', 'Electron · −']].map(([f, c]) => fig(f, `Proton Adapt on ${c.split(' ')[0].toLowerCase()} color`, 1800, 1800, c, 'atom')).join('')}</div></div></section>`;
  return P({ title: 'About', path: '/about/', active: 'lab', body, description: 'Protonic Precision is two brothers making suppressors from first principles. The story behind the name and the mark.' });
}

export function labPages() {
  const hub = banner('The Lab', 'How we <em>design</em>, build and prove it', 'Engineering · Testing · Materials') + crumbs([['Home', '/'], ['The Lab', '/lab/']]) + `
  <section class="sec sec--deep" style="padding-top:28px"><div class="wrap"><div class="labs">
    ${[['/lab/engineering/', 'Engineering', 'First<br>principles', 'A suppressor is a chain of stages, each passing less energy to the next.', bafflesArt()],
       ['/lab/testing/', 'Testing', 'Measured,<br>then published', 'Sound numbers come with the method behind them, or not at all.', testingArt()],
       ['/lab/materials/', 'Materials', 'Every atom<br>accounted for', 'Stainless where the gas hits hard, aluminum where it doesn\'t. The cheapest metal that does each job.', materialsArt()]]
      .map(([h, e, t, x, a]) => `<a class="lab" href="${h}"><div class="art">${a}</div><div class="body"><p class="eyebrow">${e}</p><h3>${t}</h3><span class="tick"></span><p>${x}</p><span class="btn btn--line">Read ${ICON.arrow}</span></div></a>`).join('')}
  </div></div></section>`;

  const art = a => `<div style="aspect-ratio:5/2;overflow:hidden;background:#0c0e11">${a}</div>`;
  const eng = article([['chain', 'The chain'], ['blast', 'The blast chamber'], ['system', 'The system']], `${art(bafflesArt())}
    <p class="lede" style="font-size:20px;color:var(--ink)">A suppressor doesn't "absorb" sound. It slows down and cools the gas behind the bullet, so the gas leaves the muzzle with less energy.</p>
    <h2 id="chain">The chain</h2>
    <p>When a cartridge fires, high-pressure gas follows the bullet out of the barrel. Without a suppressor it expands all at once, and that sudden expansion is most of the noise. A suppressor gives the gas room and a path. Each baffle turns and slows part of it and passes less on to the next chamber.</p>
    <p>We think of a can as that chain of stages, not as a tube with parts inside. The design question at every stage is the same: how much energy does it take, and what does it hand on?</p>
    ${fig('exploded', 'Exploded view of a rifle suppressor: tube, cone baffles and rear mount', 1800, 1005, ILLUSTRATIVE)}
    <h2 id="blast">The blast chamber</h2>
    <p>The first chamber sees the hottest, fastest gas on every shot and erodes first. That's why the blast baffle in Proton Adapt and Proton Safari is 17-4 stainless, and why a worn one is replaced under warranty.</p>
    <h2 id="system">The system</h2>
    <p>A can is only as good as what holds it on. Gluon mounts hold the cans on rifles and Pion pistons hold them on pistols, all on one 1-3/8x24 rear thread. The LINAC rifle line, coming soon, is designed with the can in place from the first drawing, rather than having one bolted on afterwards.</p>
    <p><a class="btn btn--ink" href="/lab/materials/">Next: Materials ${ICON.arrow}</a></p>`);

  const test = article([['method', 'The method'], ['publish', 'What we publish'], ['never', 'What we never say']], `${art(testingArt())}
    <p class="lede" style="font-size:20px;color:var(--ink)">A sound number only means something when you know how it was measured. We publish the number and the method together, or neither.</p>
    <h2 id="method">The method</h2>
    <p>We measure to MIL-STD-1474E, the U.S. military standard most of the suppressor industry uses for impulse noise. Meters go 1 m to the left of the muzzle and at the shooter's ear, because those are the two numbers that matter to you and to the people around you.</p>
    ${fig('bore', 'Looking straight down the bore of Proton Adapt', 1450, 1800, 'The bore of Proton Adapt, end-on.', 'photo-inline')}
    <h2 id="publish">What we publish</h2>
    <ul><li>Peak dB at the muzzle and at the ear</li><li>Ammunition, host firearm and barrel length</li><li>Temperature and conditions</li><li>The can's measured weight, with mount</li></ul>
    <p>For reference, OSHA's limit for impulse noise is 140 dB peak. You'll be able to see exactly where each of our cans lands against it.</p>
    <h2 id="never">What we never say</h2>
    <p>"Silent." "Whisper quiet." "Hollywood quiet." No suppressor is silent, and adjectives can't be checked.</p>
    <p><a class="btn btn--ink" href="/lab/engineering/">Next: Engineering ${ICON.arrow}</a></p>`);

  const mat = article([['rule', 'The rule'], ['fe', 'Stainless'], ['al', 'Aluminum'], ['not', 'What we leave out']], `${art(materialsArt())}
    <p class="lede" style="font-size:20px;color:var(--ink)">Each can is named for its job, and the job decides the metal. Our rule is simple: the cheapest metal that does the job well.</p>
    <h2 id="rule">The rule</h2><p>Rimfire and pistol gas is mild, so those cans can be light. Rifle gas is hot, fast and abrasive, so those cans have to be tough. Paying for more metal than the job needs only puts the price up.</p>
    ${fig('threads', 'The 1-3/8x24 rear thread of Proton Safari', 1450, 1800, 'Every can shares one 1-3/8x24 rear thread.', 'photo-inline')}
    <h2 id="fe">17-4 stainless steel</h2><p>Mostly iron, with 17% chromium and 4% nickel, which is where the name comes from. Tough under heat and abuse, and cheap to make. It's the baffles in <a href="/suppressors/proton-plinker/">Proton Plinker</a> and <a href="/suppressors/proton-sidearm/">Proton Sidearm</a>, and the whole of <a href="/suppressors/proton-adapt/">Proton Adapt</a> and <a href="/suppressors/proton-safari/">Proton Safari</a>, blast baffle included. A worn blast baffle is replaced under warranty.</p>
    <h2 id="al">7075 aluminum</h2><p>Light, and plenty strong for a tube where the pressure is far lower than a rifle's. It keeps <a href="/suppressors/proton-plinker/">Proton Plinker</a> light on a rimfire, and keeps <a href="/suppressors/proton-sidearm/">Proton Sidearm</a> from making a handgun nose-heavy.</p>
    <h2 id="not">What we leave out</h2><p>Titanium, Inconel and Stellite all have their place, and all of them cost more. None of our four cans needs them to do its job, so none of them uses them.</p>
    <p><a class="btn btn--ink" href="/lab/testing/">Next: Testing ${ICON.arrow}</a></p>`);

  const head = (t, tag, eb) => banner(t, tag, eb);
  return [
    P({ title: 'The Lab', path: '/lab/', active: 'lab', body: hub, description: 'How Protonic Precision designs, tests and chooses materials for its suppressors.' }),
    P({ title: 'Engineering', path: '/lab/engineering/', active: 'lab', description: 'How a suppressor works, and how we design ours from first principles.', body: head('Engineering', 'Design the <em>chain</em>, not the tube', 'The Lab') + crumbs([['Home', '/'], ['The Lab', '/lab/'], ['Engineering', '/lab/engineering/']]) + eng }),
    P({ title: 'Testing', path: '/lab/testing/', active: 'lab', description: 'How Protonic Precision measures and publishes suppressor sound levels: MIL-STD-1474E, with the method.', body: head('Testing', 'Numbers, <em>not</em> adjectives', 'The Lab') + crumbs([['Home', '/'], ['The Lab', '/lab/'], ['Testing', '/lab/testing/']]) + test }),
    P({ title: 'Materials', path: '/lab/materials/', active: 'lab', description: '17-4 stainless steel and 7075 aluminum: what each does in a suppressor, and why we use the cheapest metal that does the job.', body: head('Materials', 'Every atom <em>accounted</em> for', 'The Lab') + crumbs([['Home', '/'], ['The Lab', '/lab/'], ['Materials', '/lab/materials/']]) + mat }),
  ];
}

export function faqPage() {
  const items = FAQ.map(([id, q, a], i) => `<details class="qa" id="${id}"><summary><span class="n">${String(i + 1).padStart(2, '0')}</span>${esc(q)}<span class="pm" aria-hidden="true"></span></summary><div class="a">${a}</div></details>`).join('');
  const body = banner('FAQ', 'Buying, owning and <em>running</em> a can', 'Got questions') + crumbs([['Home', '/'], ['FAQ', '/faq/']]) + `
  <section class="sec sec--paper" style="padding-top:24px"><div class="wrap faq">
    <div class="faq-side"><p class="lede">Laws around suppressors changed in 2026. Answers here are current as of ${SITE.legalAsOf}. When something changes, we'll update this page.</p>
      <div><a class="btn btn--ink" href="/buying-a-suppressor/">Buying guide ${ICON.arrow}</a></div>
      <p class="lede" style="font-size:15px">Didn't find it? <a href="/contact/">Ask us</a>.</p></div>
    <div>${items}</div>
  </div></section>`;
  return P({ title: 'FAQ', path: '/faq/', active: '', body, description: 'Answers about Protonic Precision suppressors, buying a suppressor in 2026, shipping, state laws and more.',
    head: `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([, q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() } })) })}</script>` });
}

export function buyingGuide() {
  const form4States = 'Alaska, Colorado, Connecticut, Georgia, Michigan, Mississippi, Montana, Nevada, North Carolina, North Dakota, Ohio, Oregon, Pennsylvania, Washington and Wisconsin';
  const inner = `
    <p class="meta">Current as of ${SITE.legalAsOf}</p>
    <p class="lede" style="font-size:20px;color:var(--ink)">Buying a suppressor got simpler in 2026, but how simple depends on your state. This guide covers where things stand today.</p>
    <div style="border:1px solid var(--paper-3);background:#f2f3f3;padding:18px 20px"><strong>Not legal advice.</strong> This is general information. ATF has said its current position can change, and state law varies a lot. Your dealer is the best source for what applies to you.</div>
    <h2 id="changed">What changed in 2026</h2>
    <ul>
      <li><strong>1 January 2026:</strong> the federal NFA tax on suppressors dropped from $200 to <strong>$0</strong>.</li>
      <li><strong>9 October 2026:</strong> after <em>Silencer Shop Foundation v. ATF</em>, ATF said it is not enforcing NFA registration, approval or tax-stamp requirements for suppressors. Suppressors are still listed in the National Firearms Act; ATF is choosing not to enforce those parts, and has said that can be reversed. <a href="${ATF_UPDATE}" rel="noopener">Read ATF's guidance</a>.</li>
      <li><strong>Still true everywhere:</strong> federal law requires buying from a licensed dealer in your state of residence, with a background check on ATF Form 4473.</li>
    </ul>
    <h2 id="steps">Step by step</h2>
    <h3>1. Check your state</h3>
    <p>Civilian ownership is banned in California, Delaware, Hawaii, Illinois, Massachusetts, New Jersey, New York, Rhode Island and Washington, D.C. Hunting with a suppressor is legal in 41 states. See current lists for <a href="${SS_LEGAL}" rel="noopener">ownership</a> and <a href="${SS_HUNT}" rel="noopener">hunting</a>.</p>
    <h3>2. Pick a can and a dealer</h3>
    <p>Suppressors ship only to a licensed dealer, an FFL that has paid the special occupational tax (SOT), in your state. They can't be shipped to your home.</p>
    <h3>3. Do the paperwork your state requires</h3>
    <p>Everyone completes a Form 4473 and a background check at the dealer. In ${form4States}, state law still requires an approved ATF Form 4. Dealers elsewhere may also choose to use one.</p>
    <p>If you file a Form 4, it goes through ATF eForms with fingerprints, a photo, and a copy to your local chief law enforcement officer. ATF reported average eForm 4 approval times in August 2026 of about <strong>6 days</strong> for individuals and <strong>20 days</strong> for trusts (<a href="${ATF_TIMES}" rel="noopener">current times</a>).</p>
    <h3>4. Pick it up</h3>
    <p>Once your paperwork clears, collect the can from your dealer.</p>
    <h2 id="trust">Individual or trust?</h2>
    <p>Buying as an individual is quickest. A gun trust lets more than one person legally possess the same NFA items, which matters for families. If you're in a Form 4 state, every responsible person on a trust submits fingerprints and photos. A trust attorney can tell you whether it's worth it for you.</p>
    <h2 id="age">Age</h2>
    <p>You must be 21 to buy a suppressor from a dealer under federal law. State law may add rules about possession.</p>
    <h2 id="travel">Traveling with a can</h2>
    <p>ATF Form 5320.20 has never been required to take a suppressor across state lines. The laws of the state you're traveling to still apply, so don't take a can into a state that bans them.</p>
    <h2 id="sources">Sources</h2>
    <ul><li><a href="${ATF_UPDATE}" rel="noopener">ATF: Update to NFA transfer guidance</a></li><li><a href="${ATF_TIMES}" rel="noopener">ATF: Current processing times</a></li><li><a href="https://www.law.cornell.edu/uscode/text/26/5811" rel="noopener">26 U.S.C. § 5811 (transfer tax)</a></li><li><a href="${SS_LEGAL}" rel="noopener">State-by-state ownership list</a></li></ul>`;
  const body = banner('How to buy a suppressor', 'Where things <em>stand</em> in 2026', 'Buying guide') + crumbs([['Home', '/'], ['Buying a suppressor', '/buying-a-suppressor/']]) +
    article([['changed', 'What changed in 2026'], ['steps', 'Step by step'], ['trust', 'Individual or trust'], ['age', 'Age'], ['travel', 'Traveling'], ['sources', 'Sources']], inner);
  return P({ title: 'How to buy a suppressor in 2026', path: '/buying-a-suppressor/', active: 'suppressors', body, description: 'How to buy a suppressor as of October 2026: the $0 tax, ATF non-enforcement of NFA registration, which states still require Form 4, and step-by-step.' });
}

export function threadChart() {
  const rows = [
    ['1/2-28', 'Right', '.22 rimfire, 5.56/.223 AR-15s, most US 9mm pistol barrels', 'Proton Plinker; Gluon DT, Pion, Pion Fixed'],
    ['5/8-24', 'Right', '.30 cal rifles: .308 Win, .300 BLK, 6.5 Creedmoor', 'Gluon DT'],
    ['M13.5×1 LH', 'Left', 'Many European 9mm pistols', 'Pion, Pion Fixed'],
    ['M14×1 LH', 'Left', 'AK-pattern rifles in 7.62×39', 'Gluon DT'],
    ['11/16-24', 'Right', 'Big-bore lever guns and .45-70 rifles', 'Gluon DT'],
    ['M24×1.5', 'Right', 'AK-74-pattern rifles in 5.45×39', '—'],
    ['.578-28', 'Right', 'Many .45 ACP pistol barrels', 'Pion'],
    ['9/16-24 LH', 'Left', 'Many .40 S&W pistol barrels', 'Pion'],
  ];
  const inner = `<p class="lede" style="font-size:20px;color:var(--ink)">The thread on your barrel decides which mount you need. These are the common ones in the US.</p>
    <div style="border:1px solid var(--paper-3);background:#f2f3f3;padding:18px 20px"><strong>Always confirm your barrel's thread</strong> with the barrel maker or a thread gauge before mounting anything. A can mounted on the wrong thread, or off-center, can be hit by the bullet.</div>
    <h2 id="chart">Common thread pitches</h2>
    <div class="tscroll"><table><thead><tr><th>Thread</th><th>Hand</th><th>Common on</th><th>Protonic</th></tr></thead><tbody>${rows.map(r => `<tr><td><strong>${r[0]}</strong></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</tbody></table></div>
    <h2 id="read">How to read a thread</h2>
    <p>Inch threads are written as diameter, then threads per inch: <strong>1/2-28</strong> is a half-inch thread with 28 threads per inch. Metric threads are written as diameter in millimetres, then pitch: <strong>M14×1</strong> is 14 mm with 1 mm between threads. <strong>LH</strong> means left-hand: it tightens counter-clockwise.</p>`;
  const body = banner('Thread pitches', 'Know your <em>barrel</em> before you mount', 'Resources') + crumbs([['Home', '/'], ['Thread pitch chart', '/resources/thread-pitches/']]) + article([['chart', 'Chart'], ['read', 'Reading a thread']], inner);
  return P({ title: 'Muzzle thread pitch chart', path: '/resources/thread-pitches/', active: 'mounts', body, description: 'Common muzzle thread pitches (1/2-28, 5/8-24, M14x1 LH and more) and what firearms use them.' });
}

export function dealers() {
  const body = banner('Find a dealer', 'Ships to <em>any</em> local dealer', 'Where to buy') + crumbs([['Home', '/'], ['Find a dealer', '/dealers/']]) + `
  <section class="sec sec--paper" style="padding-top:24px"><div class="wrap">
    <div class="about">
      <div>${secHead('Your dealer', 'Use the shop you already know')}${fig('dealer-counter', 'Proton Sidearm and Proton Plinker in a dealer display case', 1450, 1800, '', 'photo-tall')}</div>
      <div class="prose" style="color:var(--ink-2)"><p>We can ship to any local dealer. Pick a licensed suppressor dealer (FFL/SOT) in your state, give us the shop's name, and we'll send your can there for you to pick up. It doesn't have to be a shop that stocks Protonic.</p>
        <p>Black is sold out in every size right now, and Desert Sand and Grey are coming soon. <a href="/contact/#updates">Get a restock alert</a> and we'll tell you when your can is back.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn--ink" href="/contact/#updates">Tell me when dealers have stock ${ICON.arrow}</a></div></div>
    </div>
  </div></section>
  <section class="sec sec--dark" id="program"><div class="wrap">
    ${secHead('For FFL/SOT dealers', 'Dealer program')}
    <div class="cards2">
      <div class="box"><p class="eyebrow">Who it's for</p><p>Shops with an FFL and SOT status that sell suppressors. Range shops and hunting outfitters welcome.</p></div>
      <div class="box"><p class="eyebrow">What you get</p><p>Demo cans, dealer pricing, and a listing on this page.</p></div>
      <div class="box"><p class="eyebrow">How to join</p><p>Email us your shop name, state, FFL/SOT status and the cans you sell most of.</p><a class="btn btn--ti" href="${mailto('Dealer program: [shop name]', 'Shop name:\nCity / state:\nFFL / SOT:\nCans you sell most of:\n')}">Email the dealer team ${ICON.arrow}</a></div>
    </div>
  </div></section>`;
  return P({ title: 'Find a dealer', path: '/dealers/', active: '', body, description: 'Protonic Precision can ship to any licensed FFL/SOT dealer in your state. Dealer program details.' });
}

export function contact() {
  const box = (id, eb, text, subject, cta) => `<div class="box"${id ? ` id="${id}"` : ''}><p class="eyebrow">${eb}</p><p>${text}</p><a class="btn btn--ink" href="${mailto(subject)}">${cta} ${ICON.arrow}</a></div>`;
  const body = banner('Contact', 'Real people. <em>Two</em> of them.', 'Get in touch') + crumbs([['Home', '/'], ['Contact', '/contact/']]) + `
  <section class="sec sec--paper" style="padding-top:24px"><div class="wrap">
    <div class="cards2">
      ${box('updates', 'Restock alerts', 'One email when Black is back in stock, and one when new colors drop. Nothing else, and we never share your address.', 'Add me to the Protonic restock list', 'Join the list')}
      ${box('', 'General', 'Questions about the cans, the company or anything on this site.', 'Question for Protonic Precision', 'Email us')}
      ${box('', 'Dealers', 'FFL/SOT shops that want to carry Protonic.', 'Dealer program: [shop name]', 'Dealer inquiry')}
      ${box('', 'Press & partners', 'Writers, ranges, and creators who want to test cans when they exist.', 'Press / partnership: Protonic Precision', 'Get in touch')}
    </div>
    <div class="cards2" style="margin-top:14px">
      <div class="box"><p class="eyebrow">Email</p><p class="addr" data-copy-src>${esc(SITE.email)}</p><button class="copy" type="button" data-copy="${esc(SITE.email)}">Copy address</button></div>
      <div class="box"><p class="eyebrow">Instagram</p><p>New colors, range days and the paperwork, as it happens.</p><a class="btn btn--ink" href="${SITE.instagram.url}" rel="me noopener">${esc(SITE.instagram.handle)} ${ICON.arrow}</a></div>
    </div>
  </div></section>`;
  return P({ title: 'Contact', path: '/contact/', active: '', body, description: 'Contact Protonic Precision: restock alerts, dealer inquiries, press and general questions.' });
}

export function legal() {
  const privacy = article([['collect', 'What we collect'], ['third', 'Third parties'], ['email', 'Email'], ['contact', 'Contact']], `
    <p class="meta">Last updated ${SITE.legalAsOf}</p>
    <p class="lede" style="font-size:20px;color:var(--ink)">This site doesn't use cookies, analytics, ad trackers or tracking pixels.</p>
    <h2 id="collect">What we collect</h2>
    <p>Nothing through the site itself. Your answer to the age question is saved in your own browser's local storage, so we don't ask again; it never leaves your device. You can clear it from your browser settings.</p>
    <h2 id="third">Third parties</h2>
    <ul><li><strong>Hosting:</strong> our host keeps standard server logs (such as IP address and pages requested) to run and secure the site.</li><li><strong>Fonts:</strong> fonts load from Google Fonts, which receives your IP address when it serves them.</li><li><strong>3D views:</strong> product pages load the three.js library from cdnjs (Cloudflare) when you open a 360° view.</li></ul>
    <h2 id="email">Email</h2>
    <p>If you email us, we use your address to reply and, if you asked, to send restock alerts. We don't sell or share it. Ask us to delete it any time.</p>
    <h2 id="contact">Contact</h2><p><a href="${mailto('Privacy request')}">${esc(SITE.email)}</a></p>`);
  const terms = article([['info', 'Information only'], ['products', 'Products'], ['law', 'Legal information'], ['marks', 'Trademarks']], `
    <p class="meta">Last updated ${SITE.legalAsOf}</p>
    <h2 id="info">Information only</h2>
    <p>Nothing on this site is an offer to sell. We don't take orders online. Suppressors are sold through licensed dealers.</p>
    <h2 id="products">Products</h2>
    <p>Designs, specifications, names and colors can change without notice.</p>
    <h2 id="law">Legal information</h2>
    <p>Our buying guide and FAQ are general information, not legal advice. Firearm and suppressor laws vary by state and change. You're responsible for following the laws that apply to you. You must be 21 or older to use this site.</p>
    <h2 id="marks">Trademarks</h2>
    <p>Protonic, Protonic Precision, the p⁺ mark and our product names are trademarks of Protonic Precision. Third-party names belong to their owners.</p>`);
  return [
    P({ title: 'Privacy', path: '/privacy/', body: banner('Privacy', 'No cookies. No <em>trackers</em>.', 'Legal') + crumbs([['Home', '/'], ['Privacy', '/privacy/']]) + privacy, description: 'Protonic Precision privacy policy: no cookies, analytics or trackers.' }),
    P({ title: 'Terms of use', path: '/terms/', body: banner('Terms of use', 'Plain <em>terms</em>', 'Legal') + crumbs([['Home', '/'], ['Terms', '/terms/']]) + terms, description: 'Terms of use for protonicprecision.com.' }),
  ];
}

export function searchPage() {
  const body = banner('Search', 'Find a <em>can</em>, a mount or an answer', '') + `
  <section class="sec sec--paper" style="padding-top:28px"><div class="wrap">
    <form class="search" role="search" action="/search/" style="max-width:640px" data-search-page>
      <label class="vh" for="q-page">Search</label>
      <input id="q-page" name="q" type="search" placeholder="Search…" style="background:#f2f3f3;color:var(--ink);border-color:var(--paper-3);height:48px">${ICON.search}
    </form>
    <p class="lede" style="margin-top:18px" data-search-summary>Type to search products, guides and answers.</p>
    <div class="grid" style="margin-top:20px" data-search-out></div>
  </div></section>`;
  return P({ title: 'Search', path: '/search/', body, noindex: true });
}

export function notFound() {
  const body = `<section class="sec sec--dark lost"><div class="wrap">
    ${logo('mark').replace('<svg', '<svg style="width:96px;margin:0 auto 24px;--m:#edeeee;--x:#d3212d"')}
    <p class="eyebrow">Error 404</p><h1 class="h-xl" style="margin-top:12px">Not found</h1><span class="tick" style="margin-inline:auto"></span>
    <p class="lede" style="margin:0 auto 26px">This page decayed. No one has ever seen a proton do that, but URLs do it all the time.</p>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn btn--ti" href="/">Home ${ICON.arrow}</a><a class="btn btn--line" href="/search/">Search</a></div>
  </div></section>`;
  return { path: '/404.html', file: '404.html', html: page({ title: 'Not found', path: '/404', body, noindex: true }) };
}
