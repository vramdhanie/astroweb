import fs from 'fs'
import path from 'path'

export interface RecentEpisode {
  name: string
  season: number | null
  episode: number | null
  released: string | null
  played: string | null
  durationMin: number | null
}

export interface PodcastStats {
  episodesPlayed: number
  hoursListened: number
  since: string | null
}

export interface PodcastEntry {
  id: number | string
  title: string
  presenters: string[]
  cover: string | null
  artworkUrl: string | null
  feedUrl: string | null
  homepage: string | null
  category: string | null
  availableEpisodes: number | null
  status: 'current' | 'retired'
  lastPlayed: string | null
  firstPlayed: string | null
  stats: PodcastStats
  lastWeek: { episodes: number; hours: number }
  recent: RecentEpisode[]
  rating: number | null
  opinion: string
  statusOverride: string | null
  categoryOverride: string | null
}

export interface WeeklyPoint {
  week: string
  episodes: number
  hours: number
}

export interface PodcastData {
  generatedAt: string
  backup: string
  summary: {
    episodesPlayed: number
    hoursListened: number
    since: string | null
    activePodcasts: number
    totalPodcasts: number
    weekly: WeeklyPoint[]
  }
  podcasts: PodcastEntry[]
}

export function getPodcastData(): PodcastData {
  const filePath = path.join(process.cwd(), 'src/data/podcasts.json')
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

export function getCurrentPodcasts(): PodcastEntry[] {
  return getPodcastData().podcasts.filter((p) => p.status === 'current')
}

export function getRetiredPodcasts(): PodcastEntry[] {
  return getPodcastData().podcasts.filter((p) => p.status === 'retired')
}
