// Site-wide content: contact, navigation, footer, FAQ.
export const SITE = {
  name: 'Protonic Precision',
  url: 'https://protonicprecision.com',
  email: 'will@protonicprecision.com',
  instagram: { handle: '@protonicprecision', url: 'https://www.instagram.com/protonicprecision/' },
  tagline: 'Stable under pressure.',
  description: 'Protonic Precision builds suppressors from first principles: four cans named for the job they do, from .22 rimfire to .45-70. Firearms to follow.',
  legalAsOf: '15 Oct 2026',
};

export const mailto = (subject, body = '') =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${body ? '&body=' + encodeURIComponent(body) : ''}`;

// Mega menu columns per top-level item. Product links are filled in from the catalog by the layout.
export const NAV = [
  { slug: 'suppressors', label: 'Suppressors', cols: [
    { h: 'By job', links: [['Rimfire · Proton Plinker', '/suppressors/proton-plinker/'], ['9mm · Proton Sidearm', '/suppressors/proton-sidearm/'], ['Rifle · Proton Safari', '/suppressors/proton-safari/'], ['Big bore · Proton Adapt', '/suppressors/proton-adapt/']] },
    { h: 'By caliber', links: [['.22 rimfire', '/suppressors/?caliber=.22%20LR'], ['9mm', '/suppressors/?caliber=9mm'], ['.308 Win', '/suppressors/?caliber=.308%20Win'], ['.45 ACP', '/suppressors/?caliber=.45%20ACP']] },
    { h: 'Know before you buy', links: [['How to buy a suppressor', '/buying-a-suppressor/'], ['Thread pitch chart', '/resources/thread-pitches/'], ['How we test sound', '/lab/testing/']] },
  ], feature: 'proton-plinker' },
  { slug: 'firearms', label: 'Firearms', cols: [
    { h: 'Rifles', links: [['LINAC 16', '/firearms/linac-16/'], ['All firearms', '/firearms/']] },
    { h: 'Why later', links: [['Suppressor-first design', '/lab/engineering/']] },
  ], feature: 'linac-16' },
  { slug: 'mounts', label: 'Mounts', cols: [
    { h: 'Rifles', links: [['Gluon DT', '/mounts/gluon-dt/']] },
    { h: 'Pistols & carbines', links: [['Pion', '/mounts/pion/'], ['Pion Fixed', '/mounts/pion-fixed/']] },
    ], feature: 'gluon-dt' },
  { slug: 'apparel', label: 'Apparel & Swag', cols: [
    { h: 'Swag', links: [['Challenge coin', '/apparel/challenge-coin/'], ['PVC patch', '/apparel/pvc-patch/'], ['Sticker pack', '/apparel/sticker-pack/']] },
    { h: 'Apparel', links: [['Lineup Tee', '/apparel/lineup-tee/']] },
  ], feature: 'challenge-coin' },
  { slug: 'lab', label: 'The Lab', cols: [
    { h: 'Engineering', links: [['First principles', '/lab/engineering/'], ['Materials', '/lab/materials/'], ['Testing', '/lab/testing/']] },
    { h: 'Company', links: [['About us', '/about/'], ['Journal', '/journal/'], ['Contact', '/contact/']] },
  ] },
];

export const FOOTER = [
  { h: 'Owners & buyers', links: [['FAQ', '/faq/'], ['How to buy a suppressor', '/buying-a-suppressor/'], ['Thread pitch chart', '/resources/thread-pitches/'], ['Find a dealer', '/dealers/'], ['Warranty', '/faq/#warranty']] },
  { h: 'Company', links: [['About', '/about/'], ['The Lab', '/lab/'], ['Journal', '/journal/'], ['Dealer program', '/dealers/#program'], ['Contact', '/contact/']] },
  { h: 'Products', links: [['Suppressors', '/suppressors/'], ['Firearms', '/firearms/'], ['Mounts', '/mounts/'], ['Apparel & Swag', '/apparel/'], ['Search', '/search/']] },
];

const ATF_UPDATE = 'https://www.atf.gov/firearms/update-to-nfa-transfer-guidance';
const SS_LEGAL = 'https://www.silencershop.com/where-are-silencers-legal';
const SS_HUNT = 'https://www.silencershop.com/where-silencers-are-legal-for-hunting';

// [id, question, answer html, onHome]
export const FAQ = [
  ['what', 'What is Protonic Precision?',
    `<p>Two brothers building suppressors from first principles. Cans come first: four of them, from .22 rimfire to .45-70, each named for the job it does. A rifle line, LINAC, follows once the cans are proven.</p>`, true],
  ['when', 'When can I buy one?',
    `<p>Not yet. Every product here is in development. We aren't taking orders, preorders or deposits, and we won't until a can has passed testing and is ready to ship. <a href="/contact/#updates">Get on the launch list</a> and we'll tell you first.</p>`, true],
  ['name', 'Why "Protonic"?',
    `<p>The proton is named from the Greek <em>prōtos</em>, "first." Protons are held together by the strongest force in nature, and no one has ever seen one decay. That's the job description of a suppressor: contain violent energy in a small space, shot after shot, without failing. <a href="/about/">The full story</a>.</p>`, true],
  ['names', 'Which can do I need?',
    `<p>Each can is named for the job it does. <a href="/suppressors/proton-plinker/">Proton Plinker</a> is for .22 and .17 rimfire. <a href="/suppressors/proton-sidearm/">Proton Sidearm</a> is for 9mm pistols and carbines. <a href="/suppressors/proton-safari/">Proton Safari</a> is the rifle can, from an AR-15 to a .300 Win Mag. <a href="/suppressors/proton-adapt/">Proton Adapt</a> takes the big ones: .45 ACP, 10mm and big-bore rifles like the .45-70.</p>`, true],
  ['paperwork', 'Do I still need a tax stamp or Form 4?',
    `<p>It depends on your state, and it changed recently. As of ${SITE.legalAsOf}:</p>
     <ul><li>The federal NFA tax on suppressors has been <strong>$0</strong> since 1 January 2026.</li>
     <li>Since <strong>9 October 2026</strong>, after <em>Silencer Shop Foundation v. ATF</em>, ATF says it is not enforcing NFA registration, Form 4 approval or tax-stamp rules for suppressors. ATF also says that position can change.</li>
     <li>Federal law still requires buying from a licensed dealer in your state, with a background check (Form 4473).</li>
     <li>About fifteen states still require a Form 4 under state law.</li></ul>
     <p>Read <a href="${ATF_UPDATE}" rel="noopener">ATF's current guidance</a> and our <a href="/buying-a-suppressor/">buying guide</a>, and ask your dealer what applies where you live.</p>`, true],
  ['ship', 'Can you ship a suppressor to my house?',
    `<p>No. Federal law doesn't allow it. Suppressors ship to a licensed dealer in your state, and you pick yours up there after the background check. Mounts, apparel and swag can ship to you directly.</p>`, true],
  ['legal', 'Are suppressors legal in my state?',
    `<p>In most states, yes. Civilians can't own them in California, Delaware, Hawaii, Illinois, Massachusetts, New Jersey, New York, Rhode Island or Washington, D.C. Hunting with one is also restricted in Connecticut. Laws change, so check a current source such as <a href="${SS_LEGAL}" rel="noopener">this state-by-state list</a>, and <a href="${SS_HUNT}" rel="noopener">this one for hunting</a>, before you buy.</p>`, true],
  ['age', 'How old do I have to be?',
    `<p>21 to buy a suppressor from a dealer under federal law. State law can add rules about possession. This site is for adults 21 and over.</p>`, false],
  ['quiet', 'How quiet will they be?',
    `<p>We won't say until we've measured. Every can's page will list its sound level in dB, with the test method (MIL-STD-1474E), the ammunition, the host rifle and the barrel length. No suppressor is silent, and we'll never call one that. <a href="/lab/testing/">How we test</a>.</p>`, false],
  ['warranty', 'What\'s the warranty?',
    `<p>We'll publish the full warranty terms before the first can ships, and they'll be on this page. We won't sell anything without them.</p>`, false],
  ['dealers', 'I\'m a dealer. Can I carry Protonic?',
    `<p>We're building a dealer list now. If you hold an FFL with SOT status, <a href="/dealers/#program">tell us about your shop</a>.</p>`, false],
  ['parts', 'Can I buy replacement baffles or parts?',
    `<p>Mounts and accessories, yes, once they launch. Internal suppressor parts like baffles are regulated as suppressors themselves, so service on the inside of a can goes through us or a licensed dealer.</p>`, false],
];
