import fs from 'fs';
import path from 'path';

import { format, parseISO } from 'date-fns';
import Link from 'next/link';

import Image from 'next/image';

import ProjectCard from '@/components/ProjectCard';
import { Divider } from '@/components/ui/Divider';
import { getAllArticles } from '@/lib/articles';
import { getAllProjects, getHighlightedProjects } from '@/lib/projects';

/** The book furthest along among those marked READING — the one actually
 * on the nightstand — read straight from the book database at build time. */
function getCurrentlyReading(): { title: string; author: string } | null {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'src/data/books.json'), 'utf8');
    const books: { title: string; author: string; readingStatus: string; progressPercentage?: string }[] =
      JSON.parse(raw);
    const reading = books
      .filter((b) => b.readingStatus === 'READING')
      .sort(
        (a, b) =>
          parseInt(b.progressPercentage ?? '0') - parseInt(a.progressPercentage ?? '0'),
      );
    return reading[0] ? { title: reading[0].title, author: reading[0].author } : null;
  } catch {
    return null;
  }
}

/** The podcast played most recently, from the listening-stats database. */
function getListeningTo(): { title: string } | null {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'src/data/podcasts.json'), 'utf8');
    const data: { podcasts: { title: string; lastPlayed?: string | null }[] } = JSON.parse(raw);
    const played = data.podcasts
      .filter((p) => p.lastPlayed)
      .sort((a, b) => (b.lastPlayed ?? '').localeCompare(a.lastPlayed ?? ''));
    return played[0] ? { title: played[0].title } : null;
  } catch {
    return null;
  }
}

/** Hand-picked recent apps for the homepage strip. */
const LATEST_APPS = [
  {
    href: 'https://lander.vincentramdhanie.com',
    label: 'Lander',
    blurb: 'Lunar Lander homage — Mars or Moon gravity, one tank of fuel',
    icon: '/images/projects/lander.svg',
  },
  {
    href: 'https://flood.vincentramdhanie.com',
    label: 'Flood',
    blurb: 'Colour-flooding puzzle with move budgets and a shared daily board',
    icon: '/images/projects/flood.svg',
  },
  {
    href: 'https://football.vincentramdhanie.com',
    label: 'Football',
    blurb: 'Fixtures, standings, and what I can actually watch this week',
    icon: '/images/projects/football.svg',
  },
];

export default function Home() {
  const highlightedProjects = getHighlightedProjects();
  const latestArticles = getAllArticles().slice(0, 3);
  const currentlyReading = getCurrentlyReading();
  const listeningTo = getListeningTo();
  const latestProject = getAllProjects()[0];

  return (
    <>
      {/* Thesis, not greeting — the name is already in the header */}
      <h1 className="text-3xl font-bold tracking-tight text-left mb-8">
        Software in service of humanity.
      </h1>

      {/* Introduction */}
      <div className="prose prose-slate max-w-prose prose-p:text-[var(--foreground)] prose-a:text-[var(--primary)]">
        <p>
          I&apos;m a software engineer and a{' '}
          <a href="https://bahai.org" className="underline hover:no-underline">
            Bahá&apos;í
          </a>
          , and the second fact shapes the first. Bahá&apos;ís work alongside their
          neighbours to build resilient communities capable of meeting the challenges of the current age ; 
          I try to write software in the same spirit — tools that respect the intelligence and dignity of the
          people who use them.
        </p>
        <p>
          By day I build an intelligence platform for sales teams at{' '}
          <a href="https://sybill.ai" className="underline hover:no-underline">
            Sybill
          </a>
          ; before that,{' '}
          <a href="https://lindy.ai" className="underline hover:no-underline">
            Lindy
          </a>{' '}
          and{' '}
          <a href="https://teamflowhq.com" className="underline hover:no-underline">
            Teamflow
          </a>
          . My interest in AI is far older -  my master&apos;s thesis
          explored parallel algorithms on GPU architecture - and these days it goes
          into practical things: language models turned into working tools, and a
          constellation of small applications I build and run for my family and
          myself.
        </p>
      </div>

      {/* Now — live facts, regenerated on every build */}
      <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--muted-foreground)]">
        <span className="font-semibold uppercase tracking-widest text-xs">Now</span>
        <span aria-hidden>—</span>
        <span>
          engineering at{' '}
          <a href="https://sybill.ai" className="text-[var(--primary)] hover:underline">
            Sybill
          </a>
          
        </span>
        {currentlyReading && (
          <>
            <span aria-hidden>·</span>
            <span>
              reading{' '}
              <Link href="/books" className="text-[var(--primary)] hover:underline">
                {currentlyReading.title}
              </Link>{' '}
              by {currentlyReading.author}
            </span>
          </>
        )}
        {listeningTo && (
          <>
            <span aria-hidden>·</span>
            <span>
              listening to{' '}
              <Link href="/podcasts" className="text-[var(--primary)] hover:underline">
                {listeningTo.title}
              </Link>
            </span>
          </>
        )}
        {latestProject && (
          <>
            <span aria-hidden>·</span>
            <span>
              lately building{' '}
              <Link
                href={`/projects/${latestProject.slug}`}
                className="text-[var(--primary)] hover:underline"
              >
                {latestProject.title}
              </Link>
            </span>
          </>
        )}
      </div>

      {/* Writing */}
      {latestArticles.length > 0 && (
        <>
          <Divider />
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">Writing</h2>
              <Link
                href="/articles"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors text-sm"
              >
                All articles →
              </Link>
            </div>
            <div className="space-y-6">
              {latestArticles.map((article) => (
                <article key={article._slug}>
                  <Link
                    href={`/articles/${article._slug}`}
                    className="group block"
                  >
                    <h3 className="text-lg font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2 max-w-prose">
                      {article.abstract}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {format(parseISO(article.date), 'd MMMM yyyy')}
                    </p>
                  </Link>
                </article>
              ))}
            </div>

            {/* Latest apps */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
                Latest apps
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {LATEST_APPS.map((app) => (
                  <a
                    key={app.href}
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-[var(--border)] p-3 transition-colors hover:border-[var(--primary)]/50 hover:bg-[var(--accent)]"
                  >
                    <span className="flex items-center gap-2">
                      <Image
                        src={app.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="w-5 h-5 rounded"
                      />
                      <span className="font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {app.label}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-xs leading-relaxed text-[var(--muted-foreground)]">
                      {app.blurb}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Projects */}
      {highlightedProjects.length > 0 && (
        <>
          <Divider />
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">Projects</h2>
              <Link
                href="/projects"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors text-sm"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlightedProjects.slice(0, 4).map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  showTechStack={false}
                  showStats={false}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Quote Section */}
      <Divider />
      <div className="prose prose-slate max-w-prose prose-p:text-[var(--foreground)]">
        <p>
          Any hope of contributing to a brighter future for mankind, rest on the fundamental acceptance of the nobility of man.
        </p>
        <blockquote className="border-l-4 border-[var(--primary)] pl-4 my-6 italic text-[var(--foreground)]">
          <span className="font-semibold">O SON OF SPIRIT!</span>
          <span className="block mt-2">
            Noble have I created thee, yet thou hast abased thyself. Rise then unto that for which thou wast created.
          </span>
          <footer className="text-right text-sm text-[var(--muted-foreground)] mt-4 not-italic">
            — Baha&apos;u&apos;llah
          </footer>
        </blockquote>
      </div>
    </>
  );
}
