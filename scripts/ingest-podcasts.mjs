#!/usr/bin/env node
// Podcast Addict weekly ingestion.
//
// Reads the newest backup in src/raw/*.backup, parses the SQLite DB, computes
// per-podcast + global listening stats, refreshes artwork into
// public/images/podcasts/, and MERGES into src/data/podcasts.json — preserving
// the hand-authored fields (opinion, rating, statusOverride, categoryOverride).
//
// No npm deps: uses the system `unzip` + `sqlite3` CLIs. Run it locally (the
// normal `next build` only reads the committed JSON).

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const RAW_DIR = path.join(ROOT, 'src/raw')
const DATA_FILE = path.join(ROOT, 'src/data/podcasts.json')
const IMG_DIR = path.join(ROOT, 'public/images/podcasts')

const DAY = 86_400_000
const CURRENT_WINDOW_DAYS = 60 // played within this many days => "current"
const RECENT_WINDOW_DAYS = 7 // "this week" — the recent list matches the weekly count
const WEEKLY_WEEKS = 12 // weeks in the global trend

// --- helpers ---------------------------------------------------------------
const iso = (ms) => (ms ? new Date(ms).toISOString().slice(0, 10) : null)
const round1 = (n) => Math.round(n * 10) / 10
const hours = (ms) => round1(ms / 3_600_000)
function weekStart(ms) {
  const d = new Date(ms)
  const day = (d.getUTCDay() + 6) % 7 // Monday=0
  d.setUTCDate(d.getUTCDate() - day)
  return d.toISOString().slice(0, 10)
}
function splitPresenters(author) {
  if (!author) return []
  return author
    .split(/\s*(?:,|;|&|\/|\band\b|\bwith\b)\s*/i)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4)
}

function sql(dbPath, query) {
  const out = execFileSync('sqlite3', ['-json', dbPath, query], { maxBuffer: 256 * 1024 * 1024 })
  const text = out.toString().trim()
  return text ? JSON.parse(text) : []
}

// --- locate + extract backup ----------------------------------------------
const backups = fs
  .readdirSync(RAW_DIR)
  .filter((f) => f.endsWith('.backup'))
  .map((f) => ({ f, m: fs.statSync(path.join(RAW_DIR, f)).mtimeMs }))
  .sort((a, b) => b.m - a.m)

if (backups.length === 0) {
  console.error(`No .backup file found in ${RAW_DIR}. Drop your Podcast Addict backup there.`)
  process.exit(1)
}
const backupName = backups[0].f
const backupPath = path.join(RAW_DIR, backupName)
console.log(`→ Using backup: ${backupName}`)

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pa-'))
execFileSync('unzip', ['-o', '-q', backupPath, 'podcastAddict.db', '-d', tmp])
const dbPath = path.join(tmp, 'podcastAddict.db')

// --- query -----------------------------------------------------------------
const meta = sql(
  dbPath,
  `SELECT p._id id, p.name title, p.author author, p.feed_url feedUrl, p.homepage homepage,
          p.category category, p.episodesNb availableEpisodes, b.url artworkUrl
   FROM podcasts p LEFT JOIN bitmaps b ON b._id = p.thumbnail_id`,
)
const metaById = new Map(meta.map((m) => [m.id, m]))

const plays = sql(
  dbPath,
  `SELECT podcast_id pid, name, seasonNb season, episodeNb episode,
          publication_date released, playbackDate played, duration_ms durationMs,
          position_to_resume posMs, seen_status seen
   FROM episodes WHERE playbackDate > 0 ORDER BY playbackDate DESC`,
)

const now = plays.reduce((mx, p) => Math.max(mx, p.played), 0) // most recent play = "now"
const currentCutoff = now - CURRENT_WINDOW_DAYS * DAY
const weekCutoff = now - RECENT_WINDOW_DAYS * DAY

// --- aggregate per podcast -------------------------------------------------
const byPod = new Map()
for (const p of plays) {
  if (!byPod.has(p.pid)) byPod.set(p.pid, [])
  byPod.get(p.pid).push(p)
}

const podcasts = []
for (const [pid, eps] of byPod) {
  const m = metaById.get(pid) ?? {}
  const listenedMs = eps.reduce((t, e) => t + (e.seen ? e.durationMs : e.posMs), 0)
  const lastPlayed = eps[0].played // eps are desc by played
  const firstPlayed = eps.reduce((mn, e) => Math.min(mn, e.played), Infinity)
  const weekEps = eps.filter((e) => e.played >= weekCutoff)
  // Recent list = this week's plays; if none this week, the single latest play
  // (so a current show that paused for a few days still shows context).
  const recentSrc = weekEps.length ? weekEps.slice(0, 6) : eps.slice(0, 1)
  const recent = recentSrc.map((e) => ({
    name: e.name,
    season: e.season || null,
    episode: e.episode || null,
    released: iso(e.released),
    played: iso(e.played),
    durationMin: e.durationMs ? Math.round(e.durationMs / 60000) : null,
  }))
  podcasts.push({
    id: pid,
    title: m.title ?? `Podcast ${pid}`,
    presenters: splitPresenters(m.author),
    cover: null, // set after artwork download
    artworkUrl: m.artworkUrl ?? null,
    feedUrl: m.feedUrl ?? null,
    homepage: m.homepage ?? null,
    category: m.category ?? null,
    availableEpisodes: m.availableEpisodes ?? null,
    status: lastPlayed >= currentCutoff ? 'current' : 'retired',
    lastPlayed: iso(lastPlayed),
    firstPlayed: iso(firstPlayed),
    stats: { episodesPlayed: eps.length, hoursListened: hours(listenedMs), since: iso(firstPlayed) },
    lastWeek: { episodes: weekEps.length, hours: hours(weekEps.reduce((t, e) => t + (e.seen ? e.durationMs : e.posMs), 0)) },
    recent,
    // hand-authored (preserved on merge):
    rating: null,
    opinion: '',
    statusOverride: null,
    categoryOverride: null,
  })
}

// --- global summary --------------------------------------------------------
const weekBuckets = new Map()
for (const p of plays) {
  const w = weekStart(p.played)
  if (!weekBuckets.has(w)) weekBuckets.set(w, { week: w, episodes: 0, ms: 0 })
  const b = weekBuckets.get(w)
  b.episodes += 1
  b.ms += p.seen ? p.durationMs : p.posMs
}
const weekly = [...weekBuckets.values()]
  .sort((a, b) => b.week.localeCompare(a.week))
  .slice(0, WEEKLY_WEEKS)
  .map((b) => ({ week: b.week, episodes: b.episodes, hours: hours(b.ms) }))
  .reverse()

const weekPlays = plays.filter((p) => p.played >= weekCutoff)
const summary = {
  episodesPlayed: plays.length,
  hoursListened: hours(plays.reduce((t, e) => t + (e.seen ? e.durationMs : e.posMs), 0)),
  since: iso(plays.reduce((mn, e) => Math.min(mn, e.played), Infinity)),
  activePodcasts: podcasts.filter((p) => p.status === 'current').length,
  totalPodcasts: podcasts.length,
  thisWeek: {
    episodes: weekPlays.length,
    hours: hours(weekPlays.reduce((t, e) => t + (e.seen ? e.durationMs : e.posMs), 0)),
  },
  weekly,
}

// --- merge with existing (preserve hand-authored fields) -------------------
let existing = { podcasts: [] }
if (fs.existsSync(DATA_FILE)) existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
const prevById = new Map((existing.podcasts ?? []).map((p) => [p.id, p]))
const prevByTitle = new Map((existing.podcasts ?? []).map((p) => [p.title?.toLowerCase(), p]))

const newlyAdded = []
for (const p of podcasts) {
  const prev = prevById.get(p.id) ?? prevByTitle.get(p.title.toLowerCase())
  if (prev) {
    p.rating = prev.rating ?? null
    p.opinion = prev.opinion ?? ''
    p.statusOverride = prev.statusOverride ?? null
    p.categoryOverride = prev.categoryOverride ?? null
    if (prev.cover) p.cover = prev.cover // keep prior image if download fails
  } else {
    newlyAdded.push(p.title)
  }
  if (p.statusOverride) p.status = p.statusOverride
  if (p.categoryOverride) p.category = p.categoryOverride
}

// Carry forward podcasts in the existing file but absent from this backup
// (shows you no longer listen to) — keep them with their data + opinion, retired.
const haveIds = new Set(podcasts.map((p) => p.id))
const haveTitles = new Set(podcasts.map((p) => p.title.toLowerCase()))
for (const prev of existing.podcasts ?? []) {
  if (haveIds.has(prev.id) || haveTitles.has(prev.title?.toLowerCase())) continue
  podcasts.push({ ...prev, status: prev.statusOverride ?? 'retired' })
}

// --- refresh artwork -------------------------------------------------------
fs.mkdirSync(IMG_DIR, { recursive: true })
let imgOk = 0
for (const p of podcasts) {
  if (!p.artworkUrl) continue
  const file = `pa-${p.id}.jpg`
  try {
    const res = await fetch(p.artworkUrl)
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(path.join(IMG_DIR, file), buf)
      p.cover = `/images/podcasts/${file}`
      imgOk++
    }
  } catch {
    /* keep prior cover */
  }
}

// --- sort: current first (by last played), then retired (by hours) ---------
const rank = (p) => (p.status === 'current' ? 0 : 1)
podcasts.sort(
  (a, b) =>
    rank(a) - rank(b) ||
    (a.status === 'current'
      ? (b.lastPlayed ?? '').localeCompare(a.lastPlayed ?? '')
      : b.stats.hoursListened - a.stats.hoursListened),
)

// --- write -----------------------------------------------------------------
const output = {
  generatedAt: new Date().toISOString(),
  backup: backupName,
  summary,
  podcasts,
}
fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
fs.writeFileSync(DATA_FILE, JSON.stringify(output, null, 2) + '\n')
fs.rmSync(tmp, { recursive: true, force: true })

console.log(
  `✓ Wrote ${podcasts.length} podcasts (${summary.activePodcasts} current) · ` +
    `${summary.episodesPlayed} eps · ${summary.hoursListened}h since ${summary.since} · artwork ${imgOk}`,
)
if (newlyAdded.length) console.log(`  + new (need an opinion): ${newlyAdded.join(', ')}`)
