#!/usr/bin/env node
// One-time (idempotent) migration of the hand-written opinions/ratings from the
// old podcast page into src/data/podcasts.json. After this runs once, the weekly
// ingest preserves these fields automatically.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DATA_FILE = path.join(ROOT, 'src/data/podcasts.json')
const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))

// Opinions/ratings for shows still in the play data — matched by title substring.
const PLAYED = [
  { m: 'startalk', rating: 8, category: 'Science', opinion: "An excellent podcast from Neil deGrasse Tyson, ranging from the origin of life to dark matter, plus pop culture and science's impact on society. A bit commercial-radio in that it never digs as deep as I'd like, but it's funny and introduces many luminaries in the field." },
  { m: 'daniel and jorge', rating: 10, category: 'Science', opinion: "Daniel and Jorge cover the biggest ideas in physics — time, the origin of the universe, the search for dark matter — and how scientists think. I've listened consistently for over a year; the humour and explanations are great." },
  { m: 'infinite monkey', rating: 10, category: 'Science', opinion: 'Very funny and insightful. Brian Cox and Robin Ince plus a panel of experts on a wide range of science topics — always entertaining and informative.' },
  { m: 'science quickly', rating: 9, category: 'Science', opinion: 'Short snippets on the latest science news from Scientific American.' },
  { m: 'friday night comedy', rating: 10, category: 'Comedy', opinion: 'Alternates between The Now Show, The News Quiz and Dead Ringers — top-notch comedy from a wide variety of British comedians.' },
  { m: 'comedy of the week', rating: 10, category: 'Comedy', opinion: 'Brilliant UK comedy: a weekly variety show of stand-up and sketch.' },
  { m: 'conan', rating: 10, category: 'Comedy', opinion: "Wacky but brilliant, and laugh-out-loud funny — even the ads. Conan's humour is both self-deprecating and insightful." },
  { m: 'smartless', rating: 10, category: 'Comedy', opinion: "Three hosts spring a surprise guest on each other each week for an in-depth, funny conversation. Definitely worth it, though I'm picky about which episodes I pick." },
  { m: 'hard fork', rating: 9, category: 'Tech', opinion: 'Discussions of the latest in tech. Great presenters, great pace.' },
  { m: 'world news service', rating: 10, category: "Bahá'í", opinion: "Reports on major developments in the worldwide Bahá'í community, with interviews from people working in the field." },
]

for (const s of PLAYED) {
  const p = data.podcasts.find((x) => x.title.toLowerCase().includes(s.m))
  if (!p) {
    console.log(`  ! no match for "${s.m}"`)
    continue
  }
  p.rating = s.rating
  p.opinion = p.opinion || s.opinion
  p.categoryOverride = p.categoryOverride || s.category
  p.category = s.category
}

// Shows no longer in the play data — re-added as retired entries (bottom of page).
const img = (f) => `/images/podcasts/${f}`
const RETIRED = [
  { id: 'manual-why-this-universe', title: 'Why This Universe?', presenters: ['Dan Hooper', 'Shalma Wegsman'], cover: img('why_this_universe.png'), category: 'Science', availableEpisodes: 85, rating: 10, opinion: 'Dan and Shalma break down some of the biggest ideas in physics — the universe, black holes, quantum mechanics. Always informative and entertaining.' },
  { id: 'manual-state-of-the-universe', title: 'The State of The Universe', presenters: ['Brendan Drachler'], cover: img('state_of_the_universe.webp'), category: 'Science', availableEpisodes: 81, rating: 10, opinion: "Brendan talks to scientists about their research, the origin of life and dark matter, and how scientists think. Great podcast — I listened to every available episode." },
  { id: 'manual-science-in-action', title: 'Science In Action', presenters: ['Roland Pease'], cover: img('science_in_action.webp'), category: 'Science', availableEpisodes: 1373, rating: 10, opinion: "BBC's science podcast — the week's science news with interviews from the scientists involved." },
  { id: 'manual-physics-world-weekly', title: 'Physics World Weekly', presenters: ['Hamish Johnston', 'Margaret Harris', 'Tami Freeman', 'James Dacey'], cover: img('physics_world.jpeg'), category: 'Science', availableEpisodes: 281, rating: 10, opinion: 'Insight into the latest physics news and the business of physics — a good way to keep abreast of developments.' },
  { id: 'manual-working-it-out', title: 'Working It Out', presenters: ['Mike Birbiglia'], cover: img('mike_birbiglia.webp'), category: 'Comedy', availableEpisodes: 130, rating: 10, opinion: "Mike Birbiglia — a favourite of mine — invites a comedian each week to dig into joke-writing, delivering great jokes along the way. I've stopped listening; it was good, but I couldn't spare the time." },
  { id: 'manual-soft-skills-engineering', title: 'Soft Skills Engineering', presenters: ['Jamison Dance', 'Dave Smith'], cover: img('soft_skills_engineering.webp'), category: 'Tech', availableEpisodes: 387, rating: 10, opinion: 'It takes more than great code to be a software engineer.' },
  { id: 'manual-the-changelog', title: 'The Changelog', presenters: ['Adam Stacoviak', 'Jerod Santo'], cover: img('the_changelog.webp'), category: 'Tech', availableEpisodes: 678, rating: 5, opinion: 'Technical interviews and news about the software world. Paused — not bad, just too many to keep up with.' },
  { id: 'manual-ship-it', title: 'Ship It!', presenters: ['Gerhard Lazu'], cover: img('ship_it.webp'), category: 'Tech', availableEpisodes: 91, rating: 5, opinion: 'All about shipping software to production, with interviews from devops and infrastructure folks. Paused for now.' },
  { id: 'manual-machine-learning-guide', title: 'Machine Learning Guide', presenters: ['OCDevel'], cover: img('machine_learning_guide.jpg'), category: 'Tech', availableEpisodes: 20, rating: 5, opinion: 'ML fundamentals and expert interviews. In the end, not worth it.' },
  { id: 'manual-syntax', title: 'Syntax Web Development', presenters: ['Wes Bos', 'Scott Tolinski'], cover: img('syntax.webp'), category: 'Tech', availableEpisodes: 704, rating: 5, opinion: 'Front-end technologies with expert interviews. Paused — not bad, just too many to keep up with.' },
]

const have = new Set(data.podcasts.map((p) => String(p.id)))
const haveTitles = new Set(data.podcasts.map((p) => p.title.toLowerCase()))
let added = 0
for (const r of RETIRED) {
  if (have.has(r.id) || haveTitles.has(r.title.toLowerCase())) continue
  data.podcasts.push({
    id: r.id,
    title: r.title,
    presenters: r.presenters,
    cover: r.cover,
    artworkUrl: null,
    feedUrl: null,
    homepage: null,
    category: r.category,
    availableEpisodes: r.availableEpisodes,
    status: 'retired',
    lastPlayed: null,
    firstPlayed: null,
    stats: { episodesPlayed: 0, hoursListened: 0, since: null },
    lastWeek: { episodes: 0, hours: 0 },
    recent: [],
    rating: r.rating,
    opinion: r.opinion,
    statusOverride: 'retired',
    categoryOverride: r.category,
  })
  added++
}

fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n')
console.log(`✓ Seeded opinions on played shows + added ${added} retired shows. Total: ${data.podcasts.length}`)
