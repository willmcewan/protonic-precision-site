// The catalog. Every page, card, menu, filter and search result is built from this file.
// Nothing is for sale yet: status says where each product stands, and any number not yet measured says so.
export const STATUS = { dev: 'In development', design: 'In design', soon: 'Coming soon' };
export const TBD = 'Published after testing';

export const CATEGORIES = [
  { slug: 'suppressors', name: 'Suppressors', eyebrow: 'Rimfire · Pistol · Rifle · Big bore', tag: 'Suppressors named for the <em>job</em> they do',
    blurb: 'Four cans, each named for what it\'s for: Plinker, Sidearm, Big Game and Crossover.' },
  { slug: 'firearms', name: 'Firearms', eyebrow: 'Rifles · Later', tag: 'A rifle designed <em>around</em> the can',
    blurb: 'Suppressors contain energy. Rifles aim it. The LINAC line comes after the cans are proven.' },
  { slug: 'mounts', name: 'Mounts', eyebrow: 'Rifle mounts · Pistons', tag: 'What holds the can <em>to</em> the gun',
    blurb: 'Gluon mounts hold a can on a rifle. Pion pistons and spacers hold it on a pistol or carbine.' },
  { slug: 'apparel', name: 'Apparel & Swag', eyebrow: 'Coins · Patches · Tees', tag: 'Gear for people who <em>already</em> get it',
    blurb: 'Challenge coins, patches, stickers and shirts. Made in small runs.' },
];

const SOUND = ['Sound', TBD, 'MIL-STD-1474E method, published with ammo and host'];

export const PRODUCTS = [
  {
    slug: 'proton-plinker', cat: 'suppressors', name: 'Proton Plinker', status: STATUS.dev, featured: true,
    kicker: '.22 rimfire suppressor', caliber: '.22 LR – .17 HMR', length: '5.3 in', material: 'Titanium', mount: '1/2-28',
    short: 'A titanium can for every .22 and .17 rimfire, light enough to forget it\'s on the gun.',
    long: [
      'Plinking is the cans-off-a-fencepost shooting most people learn on. This is the can for it, and for most people it\'ll be the first suppressor they own.',
      'Rimfire is the dirtiest thing you can put through a suppressor. Lead, wax and carbon pile up fast, so it\'s being designed to come apart for cleaning. A titanium tube keeps the weight down, so a light rifle or pistol doesn\'t turn nose-heavy.',
    ],
    specs: [
      ['Caliber', '.22 LR, .22 WMR, .17 HMR, .17 Mach 2', 'Target rating'],
      ['Material', 'Titanium tube'],
      ['Mount', '1/2-28 direct thread'],
      ['Diameter', '1.00 in', 'Target'],
      ['Length', '5.3 in', 'Target'],
      ['Weight', TBD],
      SOUND,
      ['Service', 'Takes apart for cleaning', 'Design goal'],
      ['In the box', 'Can, thread protector, cleaning wrench, manual'],
    ],
    features: [
      ['Every rimfire', 'Ruger 10/22 and Mark IV, Buck Mark, M&P 15-22, Taurus TX22, Sig P322, CZ 457, and any other 1/2-28 rimfire.'],
      ['Made to be cleaned', 'Rimfire fouling never stops. The can is designed to come apart for cleaning.'],
      ['Numbers, not adjectives', 'Weight and dB go on this page when production samples are tested.'],
    ],
    filters: { caliber: ['.22 LR', '.22 WMR', '.17 HMR'], material: 'Titanium', mount: ['1/2-28'] },
    render: { type: 'can', r: 0.5, L: 5.3, finish: 'black', model: 'Proton Plinker', big: 'PLINKER', cal: '.22 LR' },
  },
  {
    slug: 'proton-sidearm', cat: 'suppressors', name: 'Proton Sidearm', status: STATUS.dev, featured: true,
    kicker: '9mm pistol and carbine suppressor', caliber: '9mm', length: '7 in', material: 'Stainless + aluminum', mount: 'Pion',
    short: 'For the handgun on your hip and the carbine in the safe. The piston and the fixed spacer come in the box.',
    long: [
      'Proton Sidearm is the 9mm can. On a pistol it runs with a Pion piston in its booster, so the slide still cycles. On a carbine or a fixed-barrel gun, swap in the Pion Fixed spacer.',
      'Most brands sell the piston and the spacer as extras. Both come in the box here, so one can covers every 9mm handgun and carbine you own.',
    ],
    specs: [
      ['Caliber', '9mm, .380 ACP, 5.7x28, .22 LR', 'Target rating'],
      ['Material', '17-4 stainless baffles, 7075 aluminum tube'],
      ['Mount', 'Pion piston or Pion Fixed spacer', '1-3/8x24 rear thread'],
      ['Diameter', '1.375 in', 'Target'],
      ['Length', '7 in', 'Target'],
      ['Weight', TBD],
      SOUND,
      ['Service', 'Takes apart for cleaning', 'Design goal'],
      ['In the box', 'Can, Pion booster with 1/2-28 piston, 1/2-28 fixed spacer, manual'],
    ],
    features: [
      ['Pistols', 'With a Pion piston: Glock, Sig P320 and P365, M&P, CZ, Walther, HK, Springfield.'],
      ['Carbines', 'With the fixed spacer: Ruger PC Carbine, CZ Scorpion, Sig MPX, AR9.'],
      ['Nothing extra to buy', 'The piston and the spacer ship with the can.'],
    ],
    filters: { caliber: ['9mm', '.380 ACP', '5.7x28'], material: 'Stainless + aluminum', mount: ['Pion'] },
    render: { type: 'can', r: 0.6875, L: 7, finish: 'black', model: 'Proton Sidearm', big: 'SIDEARM', cal: '9MM' },
  },
  {
    slug: 'proton-big-game', cat: 'suppressors', name: 'Proton Big Game', status: STATUS.dev, featured: true,
    kicker: 'Rifle suppressor, 5.56 to .300 Win Mag', caliber: '5.56 – .300 WM', length: '7 in', material: 'Stainless steel', mount: 'Gluon DT',
    short: 'Built for deer camp and elk country, and it fits your AR too.',
    long: [
      'Proton Big Game is the one rifle can. A .30 bore covers everything from an AR-15 to a .300 Win Mag elk rifle, on semi-autos and bolt guns alike.',
      'It\'s 17-4 stainless with a Stellite blast baffle, the cobalt alloy that takes the first and hardest hit of every shot. It mounts with a Gluon direct-thread mount, and one comes in the box.',
    ],
    specs: [
      ['Caliber', '5.56/.223 through .300 Win Mag', 'Target rating'],
      ['Material', '17-4 stainless steel'],
      ['Blast baffle', 'Stellite (cobalt alloy)'],
      ['Mount', 'Gluon DT', '1-3/8x24 rear thread'],
      ['Diameter', '1.5 in', 'Target'],
      ['Length', '7 in', 'Target'],
      ['Weight', TBD],
      SOUND,
      ['In the box', 'Can, one Gluon DT mount (5/8-24 or 1/2-28), mount wrench, manual'],
    ],
    features: [
      ['One can, every rifle', '5.56, .300 BLK, 6.5 Creedmoor, .308, .30-06, 7mm PRC and .300 Win Mag.'],
      ['Hunting rifles', 'Tikka, Sako, Bergara, Ruger American, Savage 110, Rem 700, CZ 600 with a 5/8-24 Gluon.'],
      ['Stellite where it counts', 'A cobalt-alloy blast baffle where erosion is worst.'],
    ],
    filters: { caliber: ['5.56 NATO', '.300 BLK', '6.5 Creedmoor', '.308 Win', '.300 Win Mag'], material: 'Stainless steel', mount: ['Gluon DT'] },
    render: { type: 'can', r: 0.75, L: 7, finish: 'fde', model: 'Proton Big Game', big: 'BIG GAME', cal: '5.56-.300WM' },
  },
  {
    slug: 'proton-crossover', cat: 'suppressors', name: 'Proton Crossover', status: STATUS.dev, featured: true,
    kicker: 'Multi-caliber suppressor, pistol to big bore', caliber: '9mm – .45-70', length: '7.5 in', material: 'Stainless steel', mount: 'Gluon DT · Pion',
    short: '.45 ACP on Saturday, .45-70 on Sunday. One can that crosses over from pistols to big-bore rifles.',
    long: [
      'Proton Crossover is a .46 bore, so it takes the big pistol calibers and the big-bore rifle ones: .45 ACP, 10mm, .450 Bushmaster, .45-70 and .308.',
      'It\'s modular. Run it long for the most suppression or short for a handier gun, and swap the front cap to tune it for the caliber. A 9mm cap comes in the box. Rifles mount with a Gluon; pistols with a Pion piston.',
    ],
    specs: [
      ['Caliber', '9mm through .45-70', 'Target rating'],
      ['Material', '17-4 stainless steel'],
      ['Blast baffle', 'Stellite (cobalt alloy)'],
      ['Mount', 'Gluon DT or Pion piston', '1-3/8x24 rear thread'],
      ['Diameter', '1.5 in', 'Target'],
      ['Length', '7.5 in long, 5.8 in short', 'Target'],
      ['Weight', TBD],
      SOUND,
      ['In the box', 'Can, Gluon DT 5/8-24 mount, .46 and 9mm front caps, manual'],
    ],
    features: [
      ['Pistols', '.45 ACP, .40 and 10mm, and 9mm with a Pion piston.'],
      ['Big-bore rifles', 'Henry and Marlin lever guns, .450 Bushmaster and .400 Legend with a Gluon mount.'],
      ['Long or short', 'Modular, with front caps to tune it for the caliber.'],
    ],
    filters: { caliber: ['9mm', '10mm', '.45 ACP', '.300 BLK', '.308 Win', '.450 Bushmaster', '.45-70'], material: 'Stainless steel', mount: ['Gluon DT', 'Pion'] },
    render: { type: 'can', r: 0.75, L: 7.5, finish: 'tungsten', model: 'Proton Crossover', big: 'CROSSOVER', cal: '.46' },
  },
  {
    slug: 'gluon-dt', cat: 'mounts', name: 'Gluon DT', status: STATUS.dev, featured: true,
    kicker: 'Direct-thread rifle mount', caliber: 'Rifles', length: '1.3 in', material: 'Stainless steel', mount: '1-3/8x24 rear',
    short: 'Threads onto the barrel, and Proton Big Game or Proton Crossover threads onto it.',
    long: [
      'Gluons hold a proton\'s parts together. The Gluon mount holds the can to the rifle.',
      'It\'s the simplest stack there is: barrel threads, mount, can. One comes in the box with Proton Big Game and Proton Crossover. Buy more and the can moves between rifles.',
    ],
    specs: [
      ['Barrel threads', '1/2-28, 5/8-24, M14x1 LH, 11/16-24', 'Planned at launch'],
      ['Can thread', '1-3/8x24 (HUB pattern)'],
      ['Fits', 'Proton Big Game, Proton Crossover'],
      ['Material', 'Stainless steel'],
      ['Finish', 'Black nitride'],
      ['Weight', TBD],
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
    slug: 'pion', cat: 'mounts', name: 'Pion', status: STATUS.dev, featured: true,
    kicker: 'Booster piston', caliber: 'Pistols', length: '', material: 'Stainless steel', mount: '1/2-28 · M13.5x1 LH · .578-28 · 9/16-24',
    short: 'The piston that lets a tilting-barrel pistol cycle with Proton Sidearm or Proton Crossover on it.',
    long: [
      'Most pistol barrels tilt to unlock, and a can\'s weight on the muzzle stops them doing it. The booster in the can briefly takes that weight off, and the Pion is the piston that threads it to your barrel.',
      'One comes in the box with Proton Sidearm in 1/2-28. Buy the one that matches your barrel\'s thread.',
    ],
    specs: [
      ['Barrel threads', '1/2-28, M13.5x1 LH, .578-28, 9/16-24', 'Planned at launch'],
      ['Fits', 'Proton Sidearm, Proton Crossover'],
      ['Material', 'Stainless steel'],
      ['Weight', TBD],
    ],
    features: [
      ['Pistols cycle', 'The booster lets a tilting-barrel pistol run with a can on.'],
      ['Every common 9mm, .40 and .45 thread', 'Four threads at launch.'],
      ['Ships with Proton Sidearm', 'You only buy one if your barrel isn\'t 1/2-28.'],
    ],
    filters: { caliber: [], material: 'Stainless steel', mount: ['1/2-28', 'M13.5x1 LH', '.578-28', '9/16-24'] },
    render: { type: 'mount', kind: 'piston', finish: 'nitride' },
  },
  {
    slug: 'pion-fixed', cat: 'mounts', name: 'Pion Fixed', status: STATUS.dev,
    kicker: 'Fixed spacer for carbines', caliber: 'Carbines', length: '', material: 'Stainless steel', mount: '1/2-28 · M13.5x1 LH',
    short: 'Locks the booster for carbines and fixed-barrel guns, where a piston isn\'t needed.',
    long: [
      'Carbines and fixed-barrel pistols don\'t tilt, so they don\'t need the booster. The Pion Fixed spacer locks it solid and threads the can straight on.',
      'One comes in the box with Proton Sidearm in 1/2-28.',
    ],
    specs: [
      ['Barrel threads', '1/2-28, M13.5x1 LH', 'Planned at launch'],
      ['Fits', 'Proton Sidearm, Proton Crossover'],
      ['Material', 'Stainless steel'],
      ['Weight', TBD],
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
    slug: 'linac-16', cat: 'firearms', name: 'LINAC 16', el: null, z: null, status: STATUS.design,
    kicker: 'Suppressor-first rifle', caliber: 'TBD', length: '16 in barrel', material: 'TBD', mount: 'Gluon',
    short: 'A rifle designed around the can from the first drawing. Comes after the suppressors.',
    long: [
      'A rifle barrel is a short linear accelerator, so the rifle line is called LINAC, and the number is the barrel length.',
      'Most rifles get a suppressor bolted on later, and run dirty and over-gassed because of it. LINAC starts from the other end: gas, weight and balance are designed for the can from day one.',
      'It\'s in design. We\'ll show it when there\'s something real to show.',
    ],
    specs: [
      ['Barrel', '16 in'],
      ['Caliber', 'In design'],
      ['Gas system', 'Designed for suppressed use'],
      ['Mount', 'Gluon'],
    ],
    features: [
      ['Can first', 'Gas and balance are set for suppressed fire from the start.'],
      ['One system', 'Rifle, mount and can designed together.'],
      ['When it\'s ready', 'No preorders, no deposits, no vaporware dates.'],
    ],
    filters: { caliber: [], material: '', mount: [] },
    image: 'linac',
  },
  {
    slug: 'challenge-coin', cat: 'apparel', name: 'p⁺ Challenge Coin', el: null, z: null, status: STATUS.soon, featured: true,
    kicker: 'Machined coin', caliber: '', length: '1.75 in', material: 'Metal, red enamel', mount: '',
    short: 'Raised p⁺ with a red plus, with PROTONIC PRECISION around the rim.',
    long: ['The first thing we\'ll make in quantity, and the thing we hand to the people who help us get here.'],
    specs: [['Diameter', '1.75 in', 'Target'], ['Finish', 'Bright metal, black field, red plus'], ['Edge', 'Plain']],
    features: [['Raised mark', 'The p⁺ stands proud of a black field.'], ['Red plus', 'The only red on it.'], ['Small run', 'First batch goes to the people who helped.']],
    filters: { caliber: [], material: '', mount: [] },
    render: { type: 'coin' },
  },
  {
    slug: 'pvc-patch', cat: 'apparel', name: 'p⁺ PVC Patch', el: null, z: null, status: STATUS.soon,
    kicker: '3 × 2 in, hook backed', caliber: '', length: '3 × 2 in', material: 'PVC', mount: '',
    short: 'Black PVC, Neutron Grey border, red plus. Hook backing for bags, hats and plate carriers.',
    long: ['The stacked lockup on a 3 × 2 in PVC patch with a hook-backed fastener.'],
    specs: [['Size', '3 × 2 in'], ['Material', 'PVC'], ['Backing', 'Hook fastener']],
    features: [['Hook backed', 'Fits standard loop panels.'], ['Brand colors', 'Black, grey and one red plus.'], ['Small run', 'Made in small batches.']],
    filters: { caliber: [], material: '', mount: [] },
    image: 'patch',
  },
  {
    slug: 'lineup-tee', cat: 'apparel', name: 'Lineup Tee', el: null, z: null, status: STATUS.soon,
    kicker: 'Heavyweight cotton', caliber: '', length: '', material: 'Cotton', mount: '',
    short: 'The four cans down the back, the p⁺ mark on the chest.',
    long: ['Plinker, Sidearm, Big Game and Crossover down the back. Black shirt, titanium-grey print, one red plus.'],
    specs: [['Color', 'Black'], ['Print', 'Titanium grey, red plus'], ['Fit', 'Regular']],
    features: [['Back print', 'Plinker · Sidearm · Big Game · Crossover.'], ['Chest mark', 'Small p⁺ left chest.'], ['Small run', 'Made in small batches.']],
    filters: { caliber: [], material: '', mount: [] },
    image: 'tee',
  },
  {
    slug: 'sticker-pack', cat: 'apparel', name: 'Sticker Pack', el: null, z: null, status: STATUS.soon,
    kicker: 'Die-cut vinyl', caliber: '', length: '', material: 'Vinyl', mount: '',
    short: 'Three die-cut stickers: the p⁺ mark, the wordmark and a Stable Under Pressure tag.',
    long: ['Weatherproof vinyl, die-cut to shape.'],
    specs: [['Count', '3'], ['Material', 'Vinyl'], ['Finish', 'Matte']],
    features: [['Die cut', 'Cut to the shape of each mark.'], ['Weatherproof', 'Outdoor vinyl.'], ['Small run', 'Made in small batches.']],
    filters: { caliber: [], material: '', mount: [] },
    image: 'stickers',
  },
];

export const bySlug = Object.fromEntries(PRODUCTS.map(p => [p.slug, p]));
export const inCat = cat => PRODUCTS.filter(p => p.cat === cat);
export const url = p => `/${p.cat}/${p.slug}/`;
