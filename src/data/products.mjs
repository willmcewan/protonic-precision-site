// The catalog. Every page, card, menu, filter and search result is built from this file.
export const STATUS = { dev: 'In development', design: 'In design', soon: 'Coming soon', out: 'Sold out' };
export const TBD = 'Coming soon';

export const CATEGORIES = [
  { slug: 'suppressors', name: 'Suppressors', eyebrow: 'Rimfire · Pistol · Rifle · Big bore', tag: 'Suppressors named for the <em>job</em> they do',
    blurb: 'Four cans, each named for what it\'s for: Plinker, Sidearm, Adapt and Safari.' },
  { slug: 'mounts', name: 'Mounts', eyebrow: 'Rifle mounts · Pistons', tag: 'What holds the can <em>to</em> the gun',
    blurb: 'Gluon mounts hold a can on a rifle. Pion pistons and spacers hold it on a pistol or carbine.' },
  { slug: 'apparel', name: 'Apparel & Swag', eyebrow: 'Coins · Patches · Tees', tag: 'Gear for people who <em>already</em> get it',
    blurb: 'Challenge coins, patches, stickers and shirts. Made in small runs.' },
];

// Every can comes in these three. `finish` is the 3D viewer's finish key; images are rendered per colorway.
export const COLORWAYS = [
  { key: 'black', name: 'Black', finish: 'black', hex: '#1d1f22', status: STATUS.out },
  { key: 'desert-sand', name: 'Desert Sand', finish: 'sand', hex: '#c8b089', status: STATUS.soon },
  { key: 'grey', name: 'Grey', finish: 'tungsten', hex: '#868a8e', status: STATUS.soon },
];
export const colorway = key => COLORWAYS.find(c => c.key === key);
const COLOR_SPEC = ['Colorways', 'Black, Desert Sand, Grey', 'Black sold out in every size · Desert Sand and Grey coming soon'];


export const PRODUCTS = [
  {
    slug: 'proton-plinker', priceNote: 'Threads straight onto 1/2-28', price: 249, cat: 'suppressors', color: 'black', name: 'Proton Plinker', status: STATUS.out, featured: true,
    kicker: '.22 rimfire suppressor', caliber: '.22 LR – .17 HMR', length: '5.3 in', material: 'Aluminum + stainless', mount: '1/2-28',
    short: 'A light, tough can for every .22 and .17 rimfire, priced to be the first suppressor you buy.',
    long: [
      'Plinking is the cans-off-a-fencepost shooting most people learn on. This is the can for it, and for most people it\'ll be the first suppressor they own.',
      'Rimfire is the dirtiest thing you can put through a suppressor. Lead, wax and carbon pile up fast, so it comes apart for cleaning. An aluminum tube keeps the weight down, and 17-4 stainless baffles stand up to scraping clean, which is where cheap rimfire cans wear out.',
    ],
    specs: [
      ['Caliber', '.22 LR, .22 WMR, .17 HMR, .17 Mach 2', '.22 WMR from a 10 in barrel or longer'],
      ['Material', '7075 aluminum tube, 17-4 stainless baffles'],
      ['Mount', '1/2-28 direct thread'],
      ['Diameter', '1.00 in'],
      ['Length', '5.3 in'],
      COLOR_SPEC,
      ['Service', 'Takes apart for cleaning'],
      ['In the box', 'Can, thread protector, cleaning wrench, manual'],
    ],
    features: [
      ['Every rimfire', 'Ruger 10/22 and Mark IV, Buck Mark, M&P 15-22, Taurus TX22, Sig P322, CZ 457, and any other 1/2-28 rimfire.'],
      ['Made to be cleaned', 'Rimfire fouling never stops. The can is designed to come apart for cleaning.'],
      ['Numbers, not adjectives', 'Sound numbers come with the test method, the ammo and the host, or not at all.'],
    ],
    filters: { caliber: ['.22 LR', '.22 WMR', '.17 HMR'], material: 'Aluminum + stainless', mount: ['1/2-28'] },
    chart: { headline: 'Every .22 and .17', limit: '.22 CAL', max: .2255, calibers: ['.17 Mach 2', '.17 HMR', '.22 LR', '.22 WMR'] },
    render: { type: 'can', r: 0.5, L: 5.3, model: 'Proton Plinker', big: 'PLINKER', cal: '.22 LR' },
  },
  {
    slug: 'proton-sidearm', priceNote: 'Piston and fixed spacer included', price: 399, cat: 'suppressors', color: 'black', name: 'Proton Sidearm', status: STATUS.out, featured: true,
    kicker: '9mm pistol and carbine suppressor', caliber: '9mm', length: '7 in', material: 'Stainless + aluminum', mount: 'Pion',
    short: 'For the handgun on your hip and the carbine in the safe. The piston and the fixed spacer come in the box.',
    long: [
      'Proton Sidearm is the 9mm can. On a pistol it runs with a Pion piston in its booster, so the slide still cycles. On a carbine or a fixed-barrel gun, swap in the Pion Fixed spacer.',
      'Most brands sell the piston and the spacer as extras. Both come in the box here, so one can covers every 9mm handgun and carbine you own.',
    ],
    specs: [
      ['Caliber', '9mm, .380 ACP, .22 LR'],
      ['Material', '17-4 stainless baffles, 7075 aluminum tube'],
      ['Mount', 'Pion piston or Pion Fixed spacer', '1-3/8x24 rear thread'],
      ['Diameter', '1.375 in'],
      ['Length', '7 in'],
      COLOR_SPEC,
      ['Service', 'Takes apart for cleaning'],
      ['In the box', 'Can, Pion booster with 1/2-28 piston, 1/2-28 fixed spacer, manual'],
    ],
    features: [
      ['Pistols', 'With a Pion piston: Glock, Sig P320 and P365, M&P, CZ, Walther, HK, Springfield.'],
      ['Carbines', 'With the fixed spacer: Ruger PC Carbine, CZ Scorpion, Sig MPX, AR9.'],
      ['Nothing extra to buy', 'The piston and the spacer ship with the can.'],
    ],
    filters: { caliber: ['9mm', '.380 ACP'], material: 'Stainless + aluminum', mount: ['Pion'] },
    chart: { headline: '9mm and smaller', limit: '9MM', max: .356, calibers: ['.22 LR', '.380 ACP', '9mm'] },
    render: { type: 'can', r: 0.6875, L: 7, model: 'Proton Sidearm', big: 'SIDEARM', cal: '9MM' },
  },
  {
    slug: 'proton-adapt', priceNote: 'Gluon DT mount included', price: 499, cat: 'suppressors', color: 'desert-sand', name: 'Proton Adapt', status: STATUS.out, featured: true,
    kicker: 'Rifle suppressor, 5.56 to .300 Win Mag', caliber: '5.56 – .300 WM', length: '7 in', material: 'Stainless steel', mount: 'Gluon DT',
    short: 'One can that adapts to every rifle you own, from your AR to your elk rifle.',
    long: [
      'Proton Adapt is the one rifle can. A .30 bore covers everything from an AR-15 to a .300 Win Mag elk rifle, on semi-autos and bolt guns alike.',
      'It\'s 17-4 stainless all the way through, including the blast baffle that takes the first and hardest hit of every shot. Tough, and cheap enough to keep the price down. It mounts with a Gluon direct-thread mount, and one comes in the box.',
    ],
    specs: [
      ['Caliber', '5.56/.223 through .300 Win Mag'],
      ['Material', '17-4 stainless steel'],
      ['Blast baffle', '17-4 stainless steel', 'Replaced under warranty when worn'],
      ['Mount', 'Gluon DT', '1-3/8x24 rear thread'],
      ['Diameter', '1.5 in'],
      ['Length', '7 in'],
      COLOR_SPEC,
      ['In the box', 'Can, one Gluon DT mount (5/8-24 or 1/2-28), mount wrench, manual'],
    ],
    features: [
      ['One can, every rifle', '5.56, .300 BLK, 6.5 Creedmoor, .308, .30-06, 7mm PRC and .300 Win Mag.'],
      ['Hunting rifles', 'Tikka, Sako, Bergara, Ruger American, Savage 110, Rem 700, CZ 600 with a 5/8-24 Gluon.'],
      ['Steel all the way through', '17-4 stainless from the blast baffle to the end cap. A worn blast baffle is replaced under warranty.'],
    ],
    filters: { caliber: ['5.56 NATO', '.300 BLK', '6.5 Creedmoor', '.308 Win', '.300 Win Mag'], material: 'Stainless steel', mount: ['Gluon DT'] },
    chart: { headline: 'Up to .30 caliber', limit: '.30 CAL', max: .308, calibers: ['5.56 / .223', '.243 Win', '6.5 CM', '.270 Win', '7mm PRC', '.300 BLK', '.308 Win', '.30-06', '.300 Win Mag'] },
    render: { type: 'can', r: 0.75, L: 7, model: 'Proton Adapt', big: 'ADAPT', cal: '5.56-.300WM' },
  },
  {
    slug: 'proton-safari', priceNote: 'Gluon DT mount and 9mm cap included', price: 529, cat: 'suppressors', color: 'grey', name: 'Proton Safari', status: STATUS.out, featured: true,
    kicker: 'Multi-caliber suppressor, pistol to big bore', caliber: '9mm – .45-70', length: '7.5 in', material: 'Stainless steel', mount: 'Gluon DT · Pion',
    short: 'The big-bore can. .45 ACP on Saturday, .45-70 on Sunday, and everything in between.',
    long: [
      'Proton Safari is a .46 bore, so it takes the big pistol calibers and the big-bore rifle ones: .45 ACP, 10mm, .450 Bushmaster, .45-70 and .308.',
      'It\'s modular. Run it long for the most suppression or short for a handier gun, and swap the front cap to tune it for the caliber. A 9mm cap comes in the box. Rifles mount with a Gluon; pistols with a Pion piston.',
    ],
    specs: [
      ['Caliber', '9mm through .45-70'],
      ['Material', '17-4 stainless steel'],
      ['Blast baffle', '17-4 stainless steel', 'Replaced under warranty when worn'],
      ['Mount', 'Gluon DT or Pion piston', '1-3/8x24 rear thread'],
      ['Diameter', '1.5 in'],
      ['Length', '7.5 in long, 5.8 in short'],
      COLOR_SPEC,
      ['In the box', 'Can, Gluon DT 5/8-24 mount, .46 and 9mm front caps, manual'],
    ],
    features: [
      ['Pistols', '.45 ACP, .40 and 10mm, and 9mm with a Pion piston.'],
      ['Big-bore rifles', 'Henry and Marlin lever guns, .450 Bushmaster and .400 Legend with a Gluon mount.'],
      ['Long or short', 'Modular, with front caps to tune it for the caliber.'],
    ],
    filters: { caliber: ['9mm', '10mm', '.45 ACP', '.300 BLK', '.308 Win', '.450 Bushmaster', '.45-70'], material: 'Stainless steel', mount: ['Gluon DT', 'Pion'] },
    chart: { headline: 'Pistols to big bores', limit: '.46 CAL', max: .458, calibers: ['5.56 / .223', '.300 BLK', '.308 Win', '9mm', '.350 Legend', '.40 S&W', '10mm', '.45 ACP', '.450 BM', '.458 SOCOM', '.45-70'] },
    render: { type: 'can', r: 0.75, L: 7.5, model: 'Proton Safari', big: 'SAFARI', cal: '.46' },
  },
  {
    slug: 'gluon-dt', price: 49, cat: 'mounts', name: 'Gluon DT', status: STATUS.out, featured: true,
    kicker: 'Direct-thread rifle mount', caliber: 'Rifles', length: '1.3 in', material: 'Stainless steel', mount: '1-3/8x24 rear',
    short: 'Threads onto the barrel, and Proton Adapt or Proton Safari threads onto it.',
    long: [
      'Gluons hold a proton\'s parts together. The Gluon mount holds the can to the rifle.',
      'It\'s the simplest stack there is: barrel threads, mount, can. One comes in the box with Proton Adapt and Proton Safari. Buy more and the can moves between rifles.',
    ],
    specs: [
      ['Barrel threads', '1/2-28, 5/8-24, M14x1 LH, 11/16-24'],
      ['Can thread', '1-3/8x24 (HUB pattern)'],
      ['Fits', 'Proton Adapt, Proton Safari'],
      ['Material', 'Stainless steel'],
      ['Finish', 'Black nitride'],
    ],
    features: [
      ['Fewest parts', 'Nothing between the barrel and the can but the mount.'],
      ['One per rifle', 'Put a Gluon on each rifle and move the can between them.'],
      ['Common thread', 'The 1-3/8x24 rear thread is the pattern many brands use.'],
    ],
    filters: { caliber: [], material: 'Stainless steel', mount: ['1/2-28', '5/8-24', 'M14x1 LH', '11/16-24'] },
    render: { type: 'mount', kind: 'direct', finish: 'nitride' },
  },
  {
    slug: 'pion', price: 45, cat: 'mounts', name: 'Pion', status: STATUS.out, featured: true,
    kicker: 'Booster piston', caliber: 'Pistols', length: '', material: 'Stainless steel', mount: '1/2-28 · M13.5x1 LH · .578-28 · 9/16-24',
    short: 'The piston that lets a tilting-barrel pistol cycle with Proton Sidearm or Proton Safari on it.',
    long: [
      'Most pistol barrels tilt to unlock, and a can\'s weight on the muzzle stops them doing it. The booster in the can briefly takes that weight off, and the Pion is the piston that threads it to your barrel.',
      'One comes in the box with Proton Sidearm in 1/2-28. Buy the one that matches your barrel\'s thread.',
    ],
    specs: [
      ['Barrel threads', '1/2-28, M13.5x1 LH, .578-28, 9/16-24'],
      ['Fits', 'Proton Sidearm, Proton Safari'],
      ['Material', 'Stainless steel'],
    ],
    features: [
      ['Pistols cycle', 'The booster lets a tilting-barrel pistol run with a can on.'],
      ['Every common 9mm, .40 and .45 thread', 'Four threads.'],
      ['Ships with Proton Sidearm', 'You only buy one if your barrel isn\'t 1/2-28.'],
    ],
    filters: { caliber: [], material: 'Stainless steel', mount: ['1/2-28', 'M13.5x1 LH', '.578-28', '9/16-24'] },
    render: { type: 'mount', kind: 'piston', finish: 'nitride' },
  },
  {
    slug: 'pion-fixed', price: 25, cat: 'mounts', name: 'Pion Fixed', status: STATUS.out,
    kicker: 'Fixed spacer for carbines', caliber: 'Carbines', length: '', material: 'Stainless steel', mount: '1/2-28 · M13.5x1 LH',
    short: 'Locks the booster for carbines and fixed-barrel guns, where a piston isn\'t needed.',
    long: [
      'Carbines and fixed-barrel pistols don\'t tilt, so they don\'t need the booster. The Pion Fixed spacer locks it solid and threads the can straight on.',
      'One comes in the box with Proton Sidearm in 1/2-28.',
    ],
    specs: [
      ['Barrel threads', '1/2-28, M13.5x1 LH'],
      ['Fits', 'Proton Sidearm, Proton Safari'],
      ['Material', 'Stainless steel'],
    ],
    features: [
      ['Carbines', 'Ruger PC Carbine, CZ Scorpion, Sig MPX, AR9.'],
      ['Fixed-barrel guns', 'Rimfire pistols and other guns that don\'t tilt to unlock.'],
      ['Ships with Proton Sidearm', 'You only buy one if your barrel isn\'t 1/2-28.'],
    ],
    filters: { caliber: [], material: 'Stainless steel', mount: ['1/2-28', 'M13.5x1 LH'] },
    render: { type: 'mount', kind: 'spacer', finish: 'nitride' },
  },
  {
    slug: 'challenge-coin', price: 15, cat: 'apparel', name: 'p⁺ Challenge Coin', el: null, z: null, status: STATUS.soon, featured: true,
    kicker: 'Machined coin', caliber: '', length: '1.75 in', material: 'Metal, red enamel', mount: '',
    short: 'Raised p⁺ with a red plus, with PROTONIC PRECISION around the rim.',
    long: ['The first thing we\'ll make in quantity, and the thing we hand to the people who help us get here.'],
    specs: [['Diameter', '1.75 in'], ['Finish', 'Bright metal, black field, red plus'], ['Edge', 'Plain']],
    features: [['Raised mark', 'The p⁺ stands proud of a black field.'], ['Red plus', 'The only red on it.'], ['Small run', 'First batch goes to the people who helped.']],
    filters: { caliber: [], material: '', mount: [] },
    render: { type: 'coin' },
  },
  {
    slug: 'pvc-patch', price: 10, cat: 'apparel', name: 'p⁺ PVC Patch', el: null, z: null, status: STATUS.soon,
    kicker: '3 × 2 in, hook backed', caliber: '', length: '3 × 2 in', material: 'PVC', mount: '',
    short: 'Black PVC, Neutron Grey border, red plus. Hook backing for bags, hats and plate carriers.',
    long: ['The stacked lockup on a 3 × 2 in PVC patch with a hook-backed fastener.'],
    specs: [['Size', '3 × 2 in'], ['Material', 'PVC'], ['Backing', 'Hook fastener']],
    features: [['Hook backed', 'Fits standard loop panels.'], ['Brand colors', 'Black, grey and one red plus.'], ['Small run', 'Made in small batches.']],
    filters: { caliber: [], material: '', mount: [] },
    image: 'patch',
  },
  {
    slug: 'lineup-tee', price: 30, cat: 'apparel', name: 'Lineup Tee', el: null, z: null, status: STATUS.soon,
    kicker: 'Heavyweight cotton', caliber: '', length: '', material: 'Cotton', mount: '',
    short: 'The four cans down the back, the p⁺ mark on the chest.',
    long: ['Plinker, Sidearm, Adapt and Safari down the back. Black shirt, titanium-grey print, one red plus.'],
    specs: [['Color', 'Black'], ['Print', 'Titanium grey, red plus'], ['Fit', 'Regular']],
    features: [['Back print', 'Plinker · Sidearm · Adapt · Safari.'], ['Chest mark', 'Small p⁺ left chest.'], ['Small run', 'Made in small batches.']],
    filters: { caliber: [], material: '', mount: [] },
    image: 'tee',
  },
  {
    slug: 'sticker-pack', price: 8, cat: 'apparel', name: 'Sticker Pack', el: null, z: null, status: STATUS.soon,
    kicker: 'Die-cut vinyl', caliber: '', length: '', material: 'Vinyl', mount: '',
    short: 'Three die-cut stickers: the p⁺ mark, the wordmark and a Stable Under Pressure tag.',
    long: ['Weatherproof vinyl, die-cut to shape.'],
    specs: [['Count', '3'], ['Material', 'Vinyl'], ['Finish', 'Matte']],
    features: [['Die cut', 'Cut to the shape of each mark.'], ['Weatherproof', 'Outdoor vinyl.'], ['Small run', 'Made in small batches.']],
    filters: { caliber: [], material: '', mount: [] },
    image: 'stickers',
  },
];

// Cans carry the colorways; the default one is what cards, menus and the first gallery view show.
for (const p of PRODUCTS) if (p.color) { p.colors = COLORWAYS; p.render.finish = colorway(p.color).finish; }

export const bySlug = Object.fromEntries(PRODUCTS.map(p => [p.slug, p]));
export const inCat = cat => PRODUCTS.filter(p => p.cat === cat);
export const url = p => `/${p.cat}/${p.slug}/`;
// Shelf price (MAP for cans and mounts). Shown on every card, menu, page and search result.
export const money = n => '$' + n.toLocaleString('en-US');
