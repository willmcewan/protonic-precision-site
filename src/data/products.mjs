// The catalog. Every page, card, menu, filter and search result is built from this file.
// Nothing is for sale yet: status says where each product stands, and any number not yet measured says so.
export const STATUS = { dev: 'In development', design: 'In design', soon: 'Coming soon' };
export const TBD = 'Published after testing';

export const CATEGORIES = [
  { slug: 'suppressors', name: 'Suppressors', eyebrow: 'Titanium · Stainless · Inconel', tag: 'Suppressors named for the <em>element</em> they are made of',
    blurb: 'Each can is named for its main metal and that metal\'s proton count. Light where it can be, hard where it has to be.' },
  { slug: 'firearms', name: 'Firearms', eyebrow: 'Rifles · Later', tag: 'A rifle designed <em>around</em> the can',
    blurb: 'Suppressors contain energy. Rifles aim it. The LINAC line comes after the cans are proven.' },
  { slug: 'mounts', name: 'Mounts', eyebrow: 'QD · Direct thread', tag: 'What holds the can <em>to</em> the gun',
    blurb: 'The Gluon mount system. Gluons hold a proton together; these hold the can on.' },
  { slug: 'apparel', name: 'Apparel & Swag', eyebrow: 'Coins · Patches · Tees', tag: 'Gear for people who <em>already</em> get it',
    blurb: 'Challenge coins, patches, stickers and shirts. Made in small runs.' },
];

export const PRODUCTS = [
  {
    slug: 'ti-22', cat: 'suppressors', name: 'Ti-22', el: 'Ti', z: 22, elName: 'Titanium', status: STATUS.dev, featured: true,
    kicker: 'Titanium rimfire suppressor', caliber: '.22 LR', length: '5.4 in', material: 'Titanium', mount: '1/2-28',
    short: 'A titanium can for .22 rimfire, light enough to forget it\'s on the gun.',
    long: [
      'Ti-22 is the first can and the reason for the naming system. Titanium has 22 protons, and this is the .22.',
      'Rimfire is the dirtiest thing you can put through a suppressor. Lead, wax and carbon pile up fast, so the core is being designed to come out for cleaning. Titanium keeps the weight down, so a light rifle or pistol doesn\'t turn nose-heavy.',
    ],
    specs: [
      ['Caliber', '.22 LR rimfire'],
      ['Material', 'Titanium'],
      ['Mount', '1/2-28 direct thread'],
      ['Diameter', '1.00 in', 'Target'],
      ['Length', '5.4 in', 'Target'],
      ['Weight', TBD],
      ['Sound', TBD, 'MIL-STD-1474E method, published with ammo and host'],
      ['Finish', 'Graphite Black Cerakote'],
      ['Service', 'User-cleanable core', 'Design goal'],
    ],
    features: [
      ['Light on purpose', 'Titanium where the weight matters, so the can disappears on a light host.'],
      ['Made to be cleaned', 'Rimfire fouling never stops. The core is designed to come apart for cleaning.'],
      ['Numbers, not adjectives', 'Weight and dB go on this page when production samples are tested.'],
    ],
    filters: { caliber: ['.22 LR'], material: 'Titanium', mount: ['1/2-28'] },
    render: { type: 'can', r: 0.5, L: 5.4, finish: 'black', model: 'Ti-22', cal: '.22 LR' },
  },
  {
    slug: 'fe-26', cat: 'suppressors', name: 'Fe-26', el: 'Fe', z: 26, elName: 'Iron', status: STATUS.dev, featured: true,
    kicker: 'Stainless steel rifle suppressor', caliber: '5.56 – .30 cal', length: '6.6 in', material: 'Stainless steel', mount: 'Gluon QD',
    short: 'A stainless rifle can for 5.56 through .30 cal. The one you leave on the rifle.',
    long: [
      'Iron has 26 protons, and stainless steel is mostly iron. Fe-26 is the workhorse: heavier than titanium, cheaper to build, and very hard to hurt.',
      'It\'s planned around the Gluon QD mount, so one can moves between rifles in seconds, with a direct-thread option for people who want fewer parts.',
    ],
    specs: [
      ['Caliber', '5.56 NATO through .30 cal', 'Target rating'],
      ['Material', 'Stainless steel'],
      ['Mount', 'Gluon QD or direct thread'],
      ['Diameter', '1.50 in', 'Target'],
      ['Length', '6.6 in', 'Target'],
      ['Weight', TBD],
      ['Sound', TBD, 'MIL-STD-1474E method, published with ammo and host'],
      ['Finish', 'Desert (Flat Dark Earth Cerakote)'],
    ],
    features: [
      ['Hard to hurt', 'Stainless steel shrugs off heat and abuse that would wear out lighter cans.'],
      ['One can, many rifles', 'Gluon QD mounts on each rifle; the can moves between them.'],
      ['Priced to use', 'Steel costs less to machine than titanium. The savings go to you.'],
    ],
    filters: { caliber: ['5.56 NATO', '.300 BLK', '.308 Win'], material: 'Stainless steel', mount: ['Gluon QD', '5/8-24', '1/2-28'] },
    render: { type: 'can', r: 0.75, L: 6.6, finish: 'fde', model: 'Fe-26', cal: '5.56-.30' },
  },
  {
    slug: 'ni-28', cat: 'suppressors', name: 'Ni-28', el: 'Ni', z: 28, elName: 'Nickel', status: STATUS.dev, featured: true,
    kicker: 'Inconel high-heat suppressor', caliber: '5.56 NATO', length: '6.0 in', material: 'Inconel', mount: 'Gluon QD',
    short: 'Inconel for the hottest guns: short barrels, long strings, select fire.',
    long: [
      'Nickel has 28 protons, and Inconel is a nickel superalloy that keeps its strength when it\'s glowing. Ni-28 is for hosts that would cook a lesser can: short-barreled rifles, long strings of fire, and select-fire guns in the hands of people licensed to run them.',
      'The first baffle takes the worst of every shot, so in Ni-28 it\'s a cobalt-alloy blast baffle we call Co-27. Cobalt has 27 protons.',
    ],
    specs: [
      ['Caliber', '5.56 NATO', 'Target rating'],
      ['Material', 'Inconel'],
      ['Blast baffle', 'Co-27 cobalt alloy'],
      ['Mount', 'Gluon QD'],
      ['Diameter', '1.50 in', 'Target'],
      ['Length', '6.0 in', 'Target'],
      ['Full-auto rated', 'Design goal', 'Rating published after testing'],
      ['Weight', TBD],
      ['Sound', TBD, 'MIL-STD-1474E method, published with ammo and host'],
      ['Finish', 'Tungsten Cerakote'],
    ],
    features: [
      ['Strong when hot', 'Inconel keeps its strength at temperatures that weaken steel.'],
      ['Co-27 blast baffle', 'A cobalt-alloy first baffle where erosion is worst.'],
      ['For short barrels', 'Built for the hosts that are hardest on a can.'],
    ],
    filters: { caliber: ['5.56 NATO'], material: 'Inconel', mount: ['Gluon QD'] },
    render: { type: 'can', r: 0.75, L: 6.0, finish: 'tungsten', model: 'Ni-28', cal: '5.56 NATO' },
  },
  {
    slug: 'gluon-qd', cat: 'mounts', name: 'Gluon QD Mount', el: 'g', z: null, status: STATUS.dev, featured: true,
    kicker: 'Quick-detach muzzle device', caliber: '5.56 – .30 cal', length: '2.0 in', material: 'Stainless steel', mount: '1/2-28 · 5/8-24',
    short: 'A taper-lock muzzle device that holds Fe-26 and Ni-28. On in seconds, off in seconds.',
    long: [
      'Gluons hold a proton\'s parts together. The Gluon mount holds the can to the rifle.',
      'It threads onto the barrel like any muzzle device and works as a brake when the can is off. With the can on, a taper seats it dead center and a lock keeps it there.',
    ],
    specs: [
      ['Threads', '1/2-28 and 5/8-24', 'Planned. More pitches to follow'],
      ['Fits', 'Fe-26, Ni-28'],
      ['Material', 'Stainless steel'],
      ['Finish', 'Black nitride'],
      ['Length', '2.0 in', 'Target'],
      ['Weight', TBD],
    ],
    features: [
      ['Taper seat', 'Centers the can on the bore every time it goes on.'],
      ['Positive lock', 'The can does not walk off under fire.'],
      ['Brake when bare', 'Ports work as a brake when you shoot without the can.'],
    ],
    filters: { caliber: ['5.56 NATO', '.300 BLK', '.308 Win'], material: 'Stainless steel', mount: ['1/2-28', '5/8-24'] },
    render: { type: 'mount', kind: 'qd', finish: 'nitride' },
  },
  {
    slug: 'gluon-direct', cat: 'mounts', name: 'Gluon Direct Thread', el: 'g', z: null, status: STATUS.dev,
    kicker: 'Direct-thread mount', caliber: '5.56 – .30 cal', length: '1.3 in', material: 'Stainless steel', mount: '1/2-28 · 5/8-24',
    short: 'Threads the can straight to the barrel. No muzzle device, fewest parts.',
    long: [
      'Some people want the simplest possible stack: barrel threads, then can. Gluon Direct Thread swaps into the rear of Fe-26 or Ni-28 so the can screws straight on.',
    ],
    specs: [
      ['Threads', '1/2-28 and 5/8-24', 'Planned'],
      ['Fits', 'Fe-26, Ni-28'],
      ['Material', 'Stainless steel'],
      ['Finish', 'Black nitride'],
      ['Weight', TBD],
    ],
    features: [
      ['Fewest parts', 'Nothing between the barrel and the can.'],
      ['Shortest stack', 'No muzzle device adds no length.'],
      ['Swappable', 'Change the can between QD and direct thread at home.'],
    ],
    filters: { caliber: ['5.56 NATO', '.300 BLK', '.308 Win'], material: 'Stainless steel', mount: ['1/2-28', '5/8-24'] },
    render: { type: 'mount', kind: 'direct', finish: 'nitride' },
  },
  {
    slug: 'linac-16', cat: 'firearms', name: 'LINAC 16', el: null, z: null, status: STATUS.design,
    kicker: 'Suppressor-first rifle', caliber: 'TBD', length: '16 in barrel', material: 'TBD', mount: 'Gluon QD',
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
      ['Mount', 'Gluon QD'],
    ],
    features: [
      ['Can first', 'Gas and balance are set for suppressed fire from the start.'],
      ['One system', 'Rifle, mount and can designed together.'],
      ['When it\'s ready', 'No preorders, no deposits, no vaporware dates.'],
    ],
    filters: { caliber: [], material: '', mount: ['Gluon QD'] },
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
    slug: 'element-tee', cat: 'apparel', name: 'Element Tee', el: null, z: null, status: STATUS.soon,
    kicker: 'Heavyweight cotton', caliber: '', length: '', material: 'Cotton', mount: '',
    short: 'Ti 22, Fe 26 and Ni 28 as element tiles on the back, the p⁺ mark on the chest.',
    long: ['The lineup as a periodic table. Black shirt, titanium-grey print, one red plus.'],
    specs: [['Color', 'Black'], ['Print', 'Titanium grey, red plus'], ['Fit', 'Regular']],
    features: [['Back print', 'Ti 22 · Fe 26 · Ni 28 tiles.'], ['Chest mark', 'Small p⁺ left chest.'], ['Small run', 'Made in small batches.']],
    filters: { caliber: [], material: '', mount: [] },
    image: 'tee',
  },
  {
    slug: 'sticker-pack', cat: 'apparel', name: 'Sticker Pack', el: null, z: null, status: STATUS.soon,
    kicker: 'Die-cut vinyl', caliber: '', length: '', material: 'Vinyl', mount: '',
    short: 'Three die-cut stickers: the p⁺ mark, the wordmark and an element tile.',
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
