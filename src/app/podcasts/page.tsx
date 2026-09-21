import Image from 'next/image'
import Rating from '@/components/Rating'
import { getPodcastData, type PodcastEntry, type WeeklyPoint } from '@/lib/podcasts'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function fmtDate(iso: string | null, withDay = false): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return withDay ? `${MONTHS[m - 1]} ${d}, ${y}` : `${MONTHS[m - 1]} ${y}`
}

function epLabel(e: PodcastEntry['recent'][number]): string {
  const parts: string[] = []
  if (e.season && e.season > 0) parts.push(`S${e.season}`)
  if (e.episode && e.episode > 0) parts.push(`#${e.episode}`)
  return parts.join(' ')
}

function WeeklyTrend({ weekly }: { weekly: WeeklyPoint[] }) {
  const max = Math.max(1, ...weekly.map((w) => w.hours))
  return (
    <div className="flex items-end gap-1" style={{ height: 40 }} aria-hidden>
      {weekly.map((w) => (
        <div
          key={w.week}
          title={`${w.week}: ${w.episodes} eps · ${w.hours}h`}
          className="flex-1 rounded-t"
          style={{ height: `${Math.max(6, (w.hours / max) * 100)}%`, background: 'var(--primary)', opacity: 0.75 }}
        />
      ))}
    </div>
  )
}

function PodcastCard({ p }: { p: PodcastEntry }) {
  const retired = p.status === 'retired'
  return (
    <li className="flex items-start gap-4 py-5" style={{ borderTop: '1px solid var(--border)', opacity: retired ? 0.75 : 1 }}>
      <div className="flex-shrink-0">
        <Image
          src={p.cover || '/images/podcasts/placeholder.png'}
          alt={`${p.title} cover`}
          width={72}
          height={72}
          className="rounded-lg shadow-sm"
          style={{ width: 72, height: 72, objectFit: 'cover' }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-[var(--foreground)]">{p.title}</h3>
          {p.rating != null && <Rating score={p.rating} />}
          {retired && (
            <span className="rounded-full bg-[var(--muted)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]">
              No longer listening
            </span>
          )}
        </div>

        {p.presenters.length > 0 && (
          <div className="text-sm text-[var(--muted-foreground)]">{p.presenters.join(', ')}</div>
        )}

        {/* Total listening summary */}
        {p.stats.episodesPlayed > 0 ? (
          <div className="mt-1 text-sm text-[var(--muted-foreground)]">
            <span className="font-medium text-[var(--foreground)]">{p.stats.episodesPlayed}</span> episodes ·{' '}
            <span className="font-medium text-[var(--foreground)]">{p.stats.hoursListened}h</span>
            {p.stats.since && <> since {fmtDate(p.stats.since)}</>}
            {p.availableEpisodes ? <> · {p.availableEpisodes} available</> : null}
            {!retired && p.lastWeek.episodes > 0 && (
              <> · <span className="text-[var(--foreground)]">{p.lastWeek.episodes} this week</span></>
            )}
          </div>
        ) : p.availableEpisodes ? (
          <div className="mt-1 text-sm text-[var(--muted-foreground)]">{p.availableEpisodes} episodes available</div>
        ) : null}

        {/* Recent episodes */}
        {!retired && p.recent.length > 0 && (
          <ul className="mt-2 space-y-1">
            {p.recent.map((e, i) => (
              <li key={i} className="text-sm text-[var(--muted-foreground)]">
                <span className="text-[var(--foreground)]">
                  {epLabel(e) && <span className="tabular-nums">{epLabel(e)} </span>}
                  {e.name}
                </span>
                {e.released && <span> · {fmtDate(e.released, true)}</span>}
                {e.durationMin ? <span> · {e.durationMin}m</span> : null}
              </li>
            ))}
          </ul>
        )}

        {/* Opinion */}
        {p.opinion && <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">{p.opinion}</p>}
      </div>
    </li>
  )
}

export default function PodcastsPage() {
  const { summary, podcasts, queue } = getPodcastData()
  const current = podcasts.filter((p) => p.status === 'current')
  const retired = podcasts.filter((p) => p.status === 'retired')

  return (
    <>
      <h1 className="mb-6 text-left text-3xl font-bold tracking-tight text-[var(--foreground)]">Podcasts</h1>

      {/* Summary */}
      <div className="mb-8 rounded-xl p-4" style={{ background: 'var(--card, var(--background))', border: '1px solid var(--border)' }}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="text-sm text-[var(--muted-foreground)]">
            <div>
              <span className="text-lg font-semibold text-[var(--foreground)]">This week:</span>{' '}
              <span className="font-medium text-[var(--foreground)]">{summary.thisWeek.episodes}</span> episodes ·{' '}
              <span className="font-medium text-[var(--foreground)]">{summary.thisWeek.hours}h</span>
            </div>
            <div className="mt-1">
              <span className="font-medium text-[var(--foreground)]">{summary.hoursListened.toLocaleString()}h</span> across{' '}
              <span className="font-medium text-[var(--foreground)]">{summary.episodesPlayed.toLocaleString()}</span> episodes
              {summary.since && <> since {fmtDate(summary.since)}</>} ·{' '}
              <span className="font-medium text-[var(--foreground)]">{summary.activePodcasts}</span> shows in rotation
            </div>
          </div>
          <div className="min-w-[160px] flex-1" style={{ maxWidth: 260 }}>
            <WeeklyTrend weekly={summary.weekly} />
            <div className="mt-1 text-xs text-[var(--muted-foreground)]">Last {summary.weekly.length} weeks</div>
          </div>
        </div>
      </div>

      {/* Planned listening — the play queue from the last ingest */}
      {queue && queue.upNext.length > 0 && (
        <div className="mb-8 rounded-xl p-4" style={{ background: 'var(--card, var(--background))', border: '1px solid var(--border)' }}>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
            Planned listening
          </h2>
          <ul className="mt-2 space-y-1.5">
            {queue.upNext.map((e, i) => (
              <li key={i} className="text-sm text-[var(--foreground)]">
                {e.episode}
                <span className="text-[var(--muted-foreground)]"> — {e.podcast} · {e.durationMin} min</span>
              </li>
            ))}
          </ul>
          {queue.count > queue.upNext.length && (
            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
              …and {queue.count - queue.upNext.length} more in the queue
            </p>
          )}
        </div>
      )}

      {/* Current */}
      <ul>
        {current.map((p) => (
          <PodcastCard key={p.id} p={p} />
        ))}
      </ul>

      {/* Retired */}
      {retired.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
            No longer in rotation
          </h2>
          <ul>
            {retired.map((p) => (
              <PodcastCard key={p.id} p={p} />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
