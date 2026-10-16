import { page, esc, ICON, arrowLink, banner, crumbs } from '../layout.mjs';
import { markArt, testingArt, materialsArt } from '../art.mjs';

export const POSTS = [
  {
    slug: 'why-protonic', date: '15 Oct 2026', tag: 'Company', art: markArt,
    title: 'Why we named it Protonic',
    dek: 'A suppressor company named after a subatomic particle. Here\'s the reasoning, and why it isn\'t a gimmick.',
    body: `
      <p>We wanted a name we could defend in a trademark office and live with for twenty years. Most suppressor names are either about sound (and taken) or about violence (and tiring). We went looking somewhere else.</p>
      <h2>First</h2>
      <p>The proton was named by Ernest Rutherford in 1920, from the Greek <em>prōtos</em>, "first." It sits in the nucleus of every atom, and the number of protons decides what the atom is. 22 makes titanium. 26 makes iron. 28 makes nickel.</p>
      <h2>Held together</h2>
      <p>Protons in a nucleus all carry positive charge, so they push each other apart hard. The strong force, the strongest of the four forces in nature, holds them together anyway. Experiments put the proton's lifetime above 10<sup>34</sup> years, and nobody has ever seen one decay.</p>
      <p>A suppressor's job is the same shape: contain a violent release of energy in a small space, shot after shot, without failing. That's what we build, so that's what we named it.</p>
      <h2>The rule we gave ourselves</h2>
      <p>The physics is our story. It is never a product claim. Nothing we make uses "proton technology," and we'll never say it does. Cans are sold on measured numbers: decibels with the test method, weight, length, material and thread.</p>
      <blockquote>Physics explains the name. Specs sell the product.</blockquote>`,
  },
  {
    slug: 'numbers-not-adjectives', date: '15 Oct 2026', tag: 'Testing', art: testingArt,
    title: 'Numbers, not adjectives',
    dek: 'Suppressor marketing is full of "whisper quiet." We\'re going to publish dB with the method behind it, or nothing at all.',
    body: `
      <p>"Hearing safe." "Whisper quiet." "Hollywood quiet." None of these mean anything you can check. A number only means something when you know how it was measured.</p>
      <h2>What we'll publish</h2>
      <ul>
        <li>Peak sound level in dB, measured to MIL-STD-1474E.</li>
        <li>Where the meter was: at the muzzle (1 m to the left) and at the shooter's ear.</li>
        <li>The ammunition, the host firearm and the barrel length.</li>
        <li>Temperature and conditions on the day.</li>
      </ul>
      <p>Change any one of those and the number changes, sometimes by a lot. That's why we'll print all of them together, every time.</p>
      <h2>What we won't</h2>
      <p>We don't publish a number we haven't measured, and we don't publish one without the method behind it.</p>`,
  },
  {
    slug: 'choosing-a-can', date: '15 Oct 2026', tag: 'Products', art: materialsArt,
    title: 'Plinker, Sidearm, Adapt, Safari',
    dek: 'Four cans, each named for the job it does. Here\'s how to tell which one you need.',
    body: `
      <p>Every can we make is named for the job it does, so the first thing the name tells you is what it's for. Between the four of them, they're designed to cover most of the guns in a typical safe.</p>
      <h2>Proton Plinker</h2>
      <p>For every .22 and .17 rimfire. Plinking is where most people start shooting, and a rimfire can is usually the first suppressor people buy. It has an aluminum tube to keep it light and stainless baffles that stand up to cleaning, and it comes apart, because rimfire is filthy.</p>
      <h2>Proton Sidearm</h2>
      <p>For 9mm pistols and carbines. A pistol needs a piston in the can's booster to keep cycling, and a carbine needs a fixed spacer instead. Both come in the box.</p>
      <h2>Proton Adapt</h2>
      <p>The rifle can. A .30 bore covers everything from a 5.56 AR-15 to a .300 Win Mag elk rifle. 17-4 stainless all the way through, including the blast baffle where the gas hits hardest.</p>
      <h2>Proton Safari</h2>
      <p>A .46 bore for the big calibers: .45 ACP and 10mm pistols, and big-bore rifles like the .450 Bushmaster and .45-70. Run it long or short, and swap the front cap to tune it for the caliber.</p>
      <h2>Why "Proton"?</h2>
      <p>Every can carries the family name, the way the company carries the particle's. The second word is the job.</p>`,
  },
];

export function journalIndex() {
  const list = POSTS.map(p => `<a class="post" href="/journal/${p.slug}/"><div class="art">${p.art()}</div><div class="body"><p class="eyebrow">${esc(p.date)} · ${esc(p.tag)}</p><h3>${esc(p.title)}</h3><p>${esc(p.dek)}</p>${arrowLink('Read')}</div></a>`).join('');
  const body = banner('Journal', 'Notes from the <em>drawing</em> board', 'Protonic Precision') + crumbs([['Home', '/'], ['Journal', '/journal/']]) +
    `<section class="sec sec--paper" style="padding-top:24px"><div class="wrap"><div class="posts">${list}</div></div></section>`;
  return { path: '/journal/', html: page({ title: 'Journal', path: '/journal/', active: 'lab', description: 'Notes from Protonic Precision on naming, testing and materials.', body }) };
}

export function journalPosts() {
  return POSTS.map((p, i) => {
    const next = POSTS[(i + 1) % POSTS.length];
    const body = `<section class="banner"><div class="wrap" style="grid-template-columns:minmax(0,1fr)"><div><p class="eyebrow" style="margin-bottom:12px">${esc(p.date)} · ${esc(p.tag)}</p><h1 style="font-size:clamp(36px,5vw,68px);text-transform:none">${esc(p.title)}</h1></div></div></section>` +
      crumbs([['Home', '/'], ['Journal', '/journal/'], [p.title, `/journal/${p.slug}/`]]) +
      `<section class="sec sec--paper" style="padding-top:24px"><div class="wrap article">
        <aside class="toc"><p class="eyebrow">Also read</p><a href="/journal/${next.slug}/">${esc(next.title)}</a><a href="/journal/">All entries</a></aside>
        <article class="rich"><div style="aspect-ratio:5/2;overflow:hidden;background:#0c0e11">${p.art()}</div><p class="lede" style="font-size:20px;color:var(--ink)">${esc(p.dek)}</p>${p.body}
        <p style="margin-top:24px"><a class="btn btn--ink" href="/journal/${next.slug}/">Next: ${esc(next.title)} ${ICON.arrow}</a></p></article>
      </div></section>`;
    return { path: `/journal/${p.slug}/`, html: page({ title: p.title, path: `/journal/${p.slug}/`, active: 'lab', description: p.dek, body }) };
  });
}
