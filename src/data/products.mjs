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
// Dimensions, weights and barrel minimums follow the engineering drawings (Products/CAD, Rev B). Weights are design values.
const DESIGN_WT = 'Design weight, until we publish a measured one';


export const PRODUCTS = [
  {
    slug: 'proton-plinker', priceNote: 'Threads straight onto 1/2-28', price: 249, cat: 'suppressors', color: 'black', name: 'Proton Plinker', status: STATUS.out, featured: true,
    kicker: '.22 rimfire suppressor', caliber: '.22 LR – .17 HMR', length: '5.12 in', material: 'Aluminum + stainless', mount: '1/2-28',
    short: 'A light, tough can for every .22 and .17 rimfire, priced to be the first suppressor you buy.',
    long: [
      'Plinking is the cans-off-a-fencepost shooting most people learn on. This is the can for it, and for most people it\'ll be the first suppressor they own.',
      'Rimfire is the dirtiest thing you can put through a suppressor. Lead, wax and carbon pile up fast, so it comes apart for cleaning. An aluminum tube keeps the weight down, and 17-4 stainless baffles stand up to scraping clean, which is where cheap rimfire cans wear out.',
    ],
    specs: [
      ['Caliber', '.22 LR, .22 WMR, .17 HMR, .17 Mach 2', 'Rimfire only. .22 WMR from a 10 in barrel or longer; .17 HMR and .17 Mach 2 from 16 in'],
      ['Material', '7075 aluminum tube, 17-4 stainless caps and baffles'],
      ['Mount', '1/2-28 direct thread'],
      ['Diameter', '1.00 in'],
      ['Length', '5.12 in'],
      ['Weight', '5.8 oz', DESIGN_WT],
      COLOR_SPEC,
      ['Service', 'Takes apart for cleaning', 'Both caps unscrew and the baffles push out the back'],
      ['In the box', 'Can, thread protector, cap wrench, push sleeve for cleaning, manual'],
    ],
    features: [
      ['Every rimfire', 'Ruger 10/22 and Mark IV, Buck Mark, M&P 15-22, Taurus TX22, Sig P322, CZ 457, and any other 1/2-28 rimfire.'],
      ['Made to be cleaned', 'Rimfire fouling never stops. Both caps unscrew, and the baffles push out the back with the sleeve in the box.'],
      ['Numbers, not adjectives', 'Sound numbers come with the test method, the ammo and the host, or not at all.'],
    ],
    filters: { caliber: ['.22 LR', '.22 WMR', '.17 HMR'], material: 'Aluminum + stainless', mount: ['1/2-28'] },
    chart: { headline: 'Every .22 and .17', limit: '.22 CAL', max: .2255, calibers: ['.17 Mach 2', '.17 HMR', '.22 LR', '.22 WMR'] },
    render: { type: 'can', r: 0.5, L: 5.12, rear: { len: 0.25, flats: 0.875 }, front: { len: 0.12 }, bore: 0.1325, socket: { r: 0.255, depth: 0.52 }, spanner: { d: 0.125, bc: 0.72 },
      model: 'Proton Plinker', big: 'PLINKER', mark: '.22 RIMFIRE ONLY' },
  },
  {
    slug: 'proton-sidearm', priceNote: 'Piston and fixed spacer included', price: 399, cat: 'suppressors', color: 'black', name: 'Proton Sidearm', status: STATUS.out, featured: true,
    kicker: '9mm pistol and carbine suppressor', caliber: '9mm', length: '6.45 in', material: 'Stainless + aluminum', mount: 'Pion',
    short: 'For the handgun on your hip and the carbine in the safe. The piston and the fixed spacer come in the box.',
    long: [
      'Proton Sidearm is the 9mm can. On a pistol it runs with a Pion piston in its booster, so the slide still cycles. On a carbine or a fixed-barrel gun, swap in the Pion Fixed spacer.',
      'Most brands sell the piston and the spacer as extras. Both come in the box here, so one can covers every 9mm handgun and carbine you own.',
    ],
    specs: [
      ['Caliber', '9mm and 9mm +P, .380 ACP, .22 LR', 'Booster on tilting-barrel pistols, fixed spacer on carbines and fixed barrels. .22 LR on the fixed spacer. Not rated for 5.7x28'],
      ['Material', '7075 aluminum tube, 17-4 stainless caps and baffles'],
      ['Mount', 'Pion piston or Pion Fixed spacer', '1-3/8x24 rear thread'],
      ['Diameter', '1.375 in', '1.50 in at the rear cap'],
      ['Length', '6.45 in', 'Without the booster or spacer'],
      ['Weight', '11.4 oz', 'Design weight, without the booster'],
      COLOR_SPEC,
      ['Service', 'Takes apart for cleaning', 'The front cap unscrews and the baffles come out the front'],
      ['In the box', 'Can, Pion booster with 1/2-28 piston, 1/2-28 fixed spacer, manual'],
    ],
    features: [
      ['Pistols', 'With a Pion piston: Glock, Sig P320 and P365, M&P, CZ, Walther, HK, Springfield.'],
      ['Carbines', 'With the fixed spacer: Ruger PC Carbine, CZ Scorpion, Sig MPX, AR9.'],
      ['Nothing extra to buy', 'The piston and the spacer ship with the can.'],
    ],
    filters: { caliber: ['9mm', '.380 ACP'], material: 'Stainless + aluminum', mount: ['Pion'] },
    chart: { headline: '9mm and smaller', limit: '9MM', max: .356, calibers: ['.22 LR', '.380 ACP', '9mm'] },
    render: { type: 'can', r: 0.6875, L: 6.45, rear: { r: 0.75, len: 0.85 }, front: { len: 0.15 }, bore: 0.205, socket: { r: 0.6875, depth: 0.62, web: 0.25 }, spanner: { d: 0.125, bc: 0.9 },
      model: 'Proton Sidearm', big: 'SIDEARM', mark: '9MM MAX - NOT .40/.45/5.7' },
  },
  {
    slug: 'proton-adapt', priceNote: 'Gluon DT mount included', price: 499, cat: 'suppressors', color: 'desert-sand', name: 'Proton Adapt', status: STATUS.out, featured: true,
    kicker: 'Rifle suppressor, 5.56 to .300 Win Mag', caliber: '5.56 – .300 WM', length: '7.23 in', material: 'Stainless steel', mount: 'Gluon DT',
    short: 'One can that adapts to every rifle you own, from your AR to your elk rifle.',
    long: [
      'Proton Adapt is the one rifle can. A .30 bore covers everything from an AR-15 to a .300 Win Mag elk rifle, on semi-autos and bolt guns alike.',
      'It\'s 17-4 stainless all the way through and welded shut, including the blast baffle that takes the first and hardest hit of every shot. Tough, and cheap enough to keep the price down. It mounts with a Gluon direct-thread mount, and one comes in the box.',
    ],
    specs: [
      ['Caliber', '5.56/.223 through .300 Win Mag', 'Shortest barrels: .300 BLK 8 in, 5.56 10.3 in, 6mm ARC, 6.5 Creedmoor and .308 16 in, .243 and .30-06 18 in, .270, 7mm PRC and .300 Win Mag 20 in. Not for full-auto'],
      ['Material', '17-4 stainless steel, welded shut'],
      ['Blast baffle', '17-4 stainless steel', 'Sealed inside the can. Wear is covered under warranty'],
      ['Mount', 'Gluon DT', '1-3/8x24 rear thread'],
      ['Diameter', '1.50 in', '1.56 in at the rear cap'],
      ['Length', '7.23 in', '7.55 in on the Gluon DT mount'],
      ['Weight', '23.4 oz', 'Design weight. 27.2 oz with the Gluon DT mount'],
      COLOR_SPEC,
      ['Service', 'Sealed: nothing to take apart', 'Centerfire only. Rimfire lead can\'t be cleaned out of a sealed can'],
      ['In the box', 'Can, one Gluon DT mount (5/8-24 or 1/2-28), mount wrench, manual'],
    ],
    features: [
      ['One can, every rifle', '5.56, .300 BLK, 6.5 Creedmoor, .308, .30-06, 7mm PRC and .300 Win Mag.'],
      ['Hunting rifles', 'Tikka, Sako, Bergara, Ruger American, Savage 110, Rem 700, CZ 600 with a 5/8-24 Gluon.'],
      ['Steel all the way through', '17-4 stainless from the blast baffle to the end cap, welded into one sealed can. Blast-baffle wear is covered under warranty.'],
    ],
    filters: { caliber: ['5.56 NATO', '.300 BLK', '6.5 Creedmoor', '.308 Win', '.300 Win Mag'], material: 'Stainless steel', mount: ['Gluon DT'] },
    chart: { headline: 'Up to .30 caliber', limit: '.30 CAL', max: .308, calibers: ['5.56 / .223', '6mm ARC', '.243 Win', '6.5 CM', '.270 Win', '7mm PRC', '.300 BLK', '.308 Win', '.30-06', '.300 Win Mag'] },
    render: { type: 'can', r: 0.75, L: 7.23, rear: { r: 0.78, len: 0.93 }, front: { len: 0.2 }, welded: true, bore: 0.175, socket: { r: 0.6875, depth: 0.62, web: 0.26 }, spanner: null,
      stack: { z0: 1.18, lens: [1.9, 0.75, 0.75, 0.75, 0.75, 0.75] }, model: 'Proton Adapt', big: 'ADAPT', mark: '.30 CAL MAX - .300 WIN MAG MAX' },
  },
  {
    slug: 'proton-safari', priceNote: 'Gluon DT mount and 9mm cap included', price: 529, cat: 'suppressors', color: 'grey', name: 'Proton Safari', status: STATUS.out, featured: true,
    kicker: 'Multi-caliber suppressor, pistol to big bore', caliber: '9mm – .45-70', length: '7.45 in', material: 'Stainless steel', mount: 'Gluon DT · Pion',
    short: 'The big-bore can. .45 ACP on Saturday, .45-70 on Sunday, and everything in between.',
    long: [
      'Proton Safari is a .46 bore, so it takes the big pistol calibers and the big-bore rifle ones: .45 ACP, 10mm, .450 Bushmaster, .45-70 and .308.',
      'It\'s modular. Run it long on a rifle. Unscrew the front section and it\'s a shorter can for pistols, and a 9mm front cap comes in the box to close the bore down for 9mm. Rifles mount with a Gluon; pistols run a Pion piston in a booster.',
    ],
    specs: [
      ['Caliber', '9mm through .45-70', 'Long setup for rifles: 16 in barrels (5.56 14.5 in, .300 BLK 8 in). Short setup for pistols, on a booster. No magnums, and not for full-auto'],
      ['Material', '17-4 stainless steel'],
      ['Blast baffle', '17-4 stainless steel', 'Replaced under warranty when worn'],
      ['Mount', 'Gluon DT, or a booster with a Pion piston', '1-3/8x24 rear thread'],
      ['Diameter', '1.50 in'],
      ['Length', '7.45 in long, 6.05 in short'],
      ['Weight', '23.9 oz long, 19.3 oz short', 'Design weights, without a mount'],
      COLOR_SPEC,
      ['Service', 'Takes apart for cleaning', 'The front comes off and the baffles come out the front'],
      ['In the box', 'Can, Gluon DT 5/8-24 mount, .46 and 9mm front caps, manual'],
    ],
    features: [
      ['Pistols', 'The short setup on a booster: .45 ACP, .40 and 10mm with the .46 cap, 9mm with the 9mm cap.'],
      ['Big-bore rifles', 'Henry and Marlin lever guns, .450 Bushmaster and .350 Legend with a Gluon mount.'],
      ['Long or short', 'Long for rifles, short for pistols. The 9mm cap is for 9mm only.'],
    ],
    filters: { caliber: ['9mm', '10mm', '.45 ACP', '.300 BLK', '.308 Win', '.450 Bushmaster', '.45-70'], material: 'Stainless steel', mount: ['Gluon DT', 'Pion'] },
    chart: { headline: 'Pistols to big bores', limit: '.46 CAL', max: .458, calibers: ['5.56 / .223', '.300 BLK', '.308 Win', '9mm', '.350 Legend', '.40 S&W', '10mm', '.45 ACP', '.450 BM', '.458 SOCOM', '.45-70'] },
    render: { type: 'can', r: 0.75, L: 7.45, rear: { len: 0.9 }, front: { len: 0.3 }, seams: [5.75], bore: 0.255, socket: { r: 0.6875, depth: 0.62, web: 0.3 }, spanner: { d: 0.125, bc: 1.1 },
      model: 'Proton Safari', big: 'SAFARI', mark: '.46 CAL MAX - NO MAGNUMS' },
  },
  {
    slug: 'gluon-dt', price: 49, cat: 'mounts', name: 'Gluon DT', status: STATUS.out, featured: true,
    kicker: 'Direct-thread rifle mount', caliber: 'Rifles', length: '0.90 in', material: 'Stainless steel', mount: '1-3/8x24 rear',
    short: 'Threads onto the barrel, and Proton Adapt or Proton Safari threads onto it.',
    long: [
      'Gluons hold a proton\'s parts together. The Gluon mount holds the can to the rifle.',
      'It\'s the simplest stack there is: barrel threads, mount, can. One comes in the box with Proton Adapt and Proton Safari. Buy more and the can moves between rifles.',
    ],
    specs: [
      ['Barrel threads', '1/2-28, 5/8-24, M14x1 LH, 11/16-24'],
      ['Can thread', '1-3/8x24 (HUB pattern)'],
      ['Fits', 'Proton Adapt, Proton Safari'],
      ['Length', '0.90 in', 'Adds 0.32 in behind the can'],
      ['Diameter', '1.50 in'],
      ['Weight', '3.8 oz', 'Design weight, 5/8-24'],
      ['Material', '17-4 stainless steel'],
      ['Finish', 'Black nitride'],
    ],
    features: [
      ['Fewest parts', 'Nothing between the barrel and the can but the mount.'],
      ['One per rifle', 'Put a Gluon on each rifle and move the can between them.'],
      ['Common thread', 'The 1-3/8x24 rear thread is the pattern many brands use.'],
    ],
    filters: { caliber: [], material: 'Stainless steel', mount: ['1/2-28', '5/8-24', 'M14x1 LH', '11/16-24'] },
    render: { type: 'mount', kind: 'direct', finish: 'nitride', L: 0.9, r: 0.75 },
  },
  {
    slug: 'pion', price: 45, cat: 'mounts', name: 'Pion', status: STATUS.out, featured: true,
    kicker: 'Booster piston', caliber: 'Pistols', length: '1.35 in', material: 'Stainless steel', mount: '1/2-28 · M13.5x1 LH · .578-28 · 9/16-24',
    short: 'The piston that lets a tilting-barrel pistol cycle with Proton Sidearm or Proton Safari on it.',
    long: [
      'Most pistol barrels tilt to unlock, and a can\'s weight on the muzzle stops them doing it. The booster on the back of the can briefly takes that weight off, and the Pion is the piston that threads it to your barrel.',
      'One comes in the box with Proton Sidearm in 1/2-28. Buy the one that matches your barrel\'s thread.',
    ],
    specs: [
      ['Barrel threads', '1/2-28, M13.5x1 LH, .578-28, 9/16-24'],
      ['Fits', 'Proton Sidearm, Proton Safari'],
      ['Length', '1.35 in'],
      ['Material', '17-4 stainless steel'],
      ['Finish', 'Black nitride'],
    ],
    features: [
      ['Pistols cycle', 'The booster lets a tilting-barrel pistol run with a can on.'],
      ['Every common 9mm, .40 and .45 thread', 'Four threads.'],
      ['Ships with Proton Sidearm', 'You only buy one if your barrel isn\'t 1/2-28.'],
    ],
    filters: { caliber: [], material: 'Stainless steel', mount: ['1/2-28', 'M13.5x1 LH', '.578-28', '9/16-24'] },
    render: { type: 'mount', kind: 'piston', finish: 'nitride', L: 1.35, r: 0.5 },
  },
  {
    slug: 'pion-fixed', price: 25, cat: 'mounts', name: 'Pion Fixed', status: STATUS.out,
    kicker: 'Fixed spacer for carbines', caliber: 'Carbines', length: '0.73 in', material: 'Stainless steel', mount: '1/2-28 · M13.5x1 LH',
    short: 'Takes the booster\'s place on carbines and fixed-barrel guns, where a piston isn\'t needed.',
    long: [
      'Carbines and fixed-barrel pistols don\'t tilt, so they don\'t need the booster. The Pion Fixed spacer threads into the can in the booster\'s place, and straight onto the barrel.',
      'One comes in the box with Proton Sidearm in 1/2-28.',
    ],
    specs: [
      ['Barrel threads', '1/2-28, M13.5x1 LH'],
      ['Can thread', '1-3/8x24 (HUB pattern)'],
      ['Fits', 'Proton Sidearm, Proton Safari'],
      ['Length', '0.73 in'],
      ['Diameter', '1.48 in'],
      ['Weight', '4.4 oz', 'Design weight, 1/2-28'],
      ['Material', '17-4 stainless steel'],
      ['Finish', 'Black nitride'],
    ],
    features: [
      ['Carbines', 'Ruger PC Carbine, CZ Scorpion, Sig MPX, AR9.'],
      ['Fixed-barrel guns', 'Rimfire pistols and other guns that don\'t tilt to unlock.'],
      ['Ships with Proton Sidearm', 'You only buy one if your barrel isn\'t 1/2-28.'],
    ],
    filters: { caliber: [], material: 'Stainless steel', mount: ['1/2-28', 'M13.5x1 LH'] },
    render: { type: 'mount', kind: 'spacer', finish: 'nitride', L: 0.73, r: 0.74 },
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
