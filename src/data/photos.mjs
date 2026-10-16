// Product and lifestyle photography. Files live in src/assets/img/photos (tools/import-photos.sh makes them).
// They are generated images of the target product, so anything showing internals is captioned as illustrative.
export const photo = name => `/assets/img/photos/${name}.webp`;

// Extra gallery views on each can's page, after the renders. [file, label]
export const GALLERY = {
  'proton-plinker': [['plinker-tailgate', 'On the tailgate'], ['plinker-float', 'Studio'], ['plinker-water', 'Finish detail']],
  'proton-sidearm': [['sidearm-dock', 'At night'], ['sidearm-bench', 'On the bench'], ['sidearm-kit', 'Kit (illustrative)']],
  'proton-adapt': [['adapt-ridge', 'Elk country'], ['adapt-surf', 'Off the beach'], ['adapt-slate', 'Studio']],
  'proton-safari': [['safari-boat', 'Night run'], ['safari-desert', 'Long range'], ['safari-lengths', 'Long and short']],
};

// The home page "In the field" mosaic: [file, product slug, eyebrow, line]
export const FIELD = [
  ['safari-boat', 'proton-safari', 'Proton Safari · Night run', 'Big-bore and multi-caliber, from .45 ACP to .45-70.'],
  ['adapt-ridge', 'proton-adapt', 'Proton Adapt · Elk country', 'One can for every rifle, 5.56 to .300 Win Mag.'],
  ['plinker-tailgate', 'proton-plinker', 'Proton Plinker · Tailgate', 'Every .22 and .17 rimfire.'],
  ['sidearm-dock', 'proton-sidearm', 'Proton Sidearm · After dark', 'For 9mm pistols and carbines.'],
];

export const ILLUSTRATIVE = 'Illustrative. Final internals TBD.';
