// Cartridge outlines for the caliber charts, in inches. Close to the SAAMI drawings, drawn for scale, not for reloading.
// rim: rim diameter · rimH: rim thickness · groove: extractor-groove diameter (rimless and rebated only)
// base → sh: body diameter at the head and at the shoulder, which starts at shL · neck: neck diameter, from nL to len
// Straight-walled cases leave out sh/shL/neck/nL and taper from base to mouth. belt: belted magnum belt length.
// bullet: bullet diameter · oal: overall length · nose: 'round' | 'flat' | 'spitzer'
export const CARTRIDGES = {
  '.17 Mach 2': { rim: .275, rimH: .043, base: .226, sh: .224, shL: .53, neck: .1925, nL: .60, len: .714, bullet: .172, oal: 1.0, nose: 'spitzer', rimmed: true },
  '.17 HMR': { rim: .286, rimH: .050, base: .2405, sh: .238, shL: .84, neck: .1995, nL: .93, len: 1.058, bullet: .172, oal: 1.349, nose: 'spitzer', rimmed: true },
  '.22 LR': { rim: .278, rimH: .043, base: .2255, mouth: .2255, len: .613, bullet: .2255, oal: 1.0, nose: 'round', rimmed: true },
  '.22 WMR': { rim: .294, rimH: .050, base: .2425, mouth: .2420, len: 1.052, bullet: .224, oal: 1.35, nose: 'round', rimmed: true },
  '5.7x28': { rim: .311, rimH: .040, groove: .268, base: .311, sh: .309, shL: .86, neck: .2515, nL: .96, len: 1.138, bullet: .224, oal: 1.594, nose: 'spitzer' },
  '.380 ACP': { rim: .374, rimH: .045, groove: .320, base: .373, mouth: .373, len: .680, bullet: .355, oal: .984, nose: 'round' },
  '9mm': { rim: .394, rimH: .050, groove: .346, base: .391, mouth: .380, len: .754, bullet: .355, oal: 1.169, nose: 'round' },
  '.40 S&W': { rim: .424, rimH: .055, groove: .350, base: .424, mouth: .423, len: .850, bullet: .400, oal: 1.135, nose: 'flat' },
  '10mm': { rim: .425, rimH: .055, groove: .350, base: .425, mouth: .423, len: .992, bullet: .400, oal: 1.260, nose: 'flat' },
  '.45 ACP': { rim: .480, rimH: .049, groove: .396, base: .476, mouth: .473, len: .898, bullet: .452, oal: 1.275, nose: 'round' },
  '5.56 / .223': { rim: .378, rimH: .045, groove: .294, base: .3769, sh: .354, shL: 1.438, neck: .253, nL: 1.564, len: 1.760, bullet: .224, oal: 2.260, nose: 'spitzer' },
  '.300 BLK': { rim: .378, rimH: .045, groove: .294, base: .3769, sh: .3609, shL: 1.152, neck: .334, nL: 1.20, len: 1.368, bullet: .308, oal: 2.06, nose: 'spitzer' },
  '.243 Win': { rim: .473, rimH: .054, groove: .396, base: .470, sh: .454, shL: 1.560, neck: .276, nL: 1.750, len: 2.045, bullet: .243, oal: 2.710, nose: 'spitzer' },
  '6.5 CM': { rim: .473, rimH: .054, groove: .396, base: .470, sh: .462, shL: 1.540, neck: .297, nL: 1.640, len: 1.920, bullet: .264, oal: 2.825, nose: 'spitzer' },
  '.308 Win': { rim: .473, rimH: .054, groove: .396, base: .470, sh: .454, shL: 1.560, neck: .3433, nL: 1.700, len: 2.015, bullet: .308, oal: 2.800, nose: 'spitzer' },
  '.270 Win': { rim: .473, rimH: .054, groove: .396, base: .470, sh: .441, shL: 1.975, neck: .308, nL: 2.140, len: 2.540, bullet: .277, oal: 3.340, nose: 'spitzer' },
  '.30-06': { rim: .473, rimH: .054, groove: .396, base: .470, sh: .441, shL: 1.948, neck: .340, nL: 2.100, len: 2.494, bullet: .308, oal: 3.340, nose: 'spitzer' },
  '7mm PRC': { rim: .532, rimH: .054, groove: .445, base: .5315, sh: .5175, shL: 1.840, neck: .315, nL: 1.990, len: 2.280, bullet: .284, oal: 3.340, nose: 'spitzer' },
  '.300 Win Mag': { rim: .532, rimH: .054, groove: .445, belt: .220, base: .513, sh: .491, shL: 2.200, neck: .339, nL: 2.380, len: 2.620, bullet: .308, oal: 3.340, nose: 'spitzer' },
  '.350 Legend': { rim: .378, rimH: .045, groove: .300, base: .390, mouth: .379, len: 1.710, bullet: .357, oal: 2.250, nose: 'flat' },
  '.450 BM': { rim: .473, rimH: .054, groove: .396, base: .500, mouth: .480, len: 1.700, bullet: .452, oal: 2.260, nose: 'spitzer' },
  '.458 SOCOM': { rim: .473, rimH: .054, groove: .396, base: .4825, sh: .4825, shL: 1.430, neck: .4815, nL: 1.475, len: 1.575, bullet: .458, oal: 2.260, nose: 'flat' },
  '.45-70': { rim: .608, rimH: .070, base: .505, mouth: .480, len: 2.105, bullet: .458, oal: 2.550, nose: 'flat', rimmed: true },
};
