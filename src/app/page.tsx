import Link from "next/link";
import { getHighlightedProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import { Divider } from '@/components/ui/Divider';

export default function Home() {
  const highlightedProjects = getHighlightedProjects();

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-left mb-12">Vincent Ramdhanie</h1>

      {/* Introduction */}
      <div className="prose prose-slate max-w-none prose-p:text-[var(--foreground)] prose-a:text-[var(--primary)]">
        <p>
          I&apos;m a <a href="https://bahai.org" className="underline hover:no-underline">Baha&apos;i</a>. Baha&apos;is work in communities worldwide to build a better society.
        </p>
        <p>
          I&apos;m a senior software engineer at <a href="https://sybill.ai" className="underline hover:no-underline">Sybill</a>, building AI tools for sales teams. Previously at <a href="https://lindy.ai" className="underline hover:no-underline">Lindy</a> and <a href="https://teamflowhq.com" className="underline hover:no-underline">Teamflow</a>.
        </p>
      </div>

      <Divider />

      {/* AI Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">Artificial Intelligence</h2>
        <div className="prose prose-slate max-w-none prose-p:text-[var(--foreground)] prose-a:text-[var(--primary)]">
          <p>
            I&apos;ve been interested in AI since university. My master&apos;s thesis explored parallel algorithms on GPU architecture. These days I work on practical AI applications with language models.
          </p>
          <p>
            The field evolves quickly. The challenges are interesting, and there&apos;s always more to learn.
          </p>
        </div>
      </section>

      {/* Projects Section */}
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

      {/* Writing & Learning */}
      <Divider />
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">Writing & Reading</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/articles" className="text-[var(--primary)] hover:text-[var(--primary)]/80 underline">
            Articles
          </Link>
          <span className="text-[var(--muted-foreground)]">•</span>
          <Link href="/books/2026" className="text-[var(--primary)] hover:text-[var(--primary)]/80 underline">
            2026
          </Link>
          <span className="text-[var(--muted-foreground)]">•</span>
          <Link href="/books/2025" className="text-[var(--primary)] hover:text-[var(--primary)]/80 underline">
            2025
          </Link>
          <span className="text-[var(--muted-foreground)]">•</span>
          <Link href="/books/2024" className="text-[var(--primary)] hover:text-[var(--primary)]/80 underline">
            2024
          </Link>
          <span className="text-[var(--muted-foreground)]">•</span>
          <Link href="/books/2023" className="text-[var(--primary)] hover:text-[var(--primary)]/80 underline">
            2023
          </Link>
          <span className="text-[var(--muted-foreground)]">•</span>
          <Link href="/books/waiting" className="text-[var(--primary)] hover:text-[var(--primary)]/80 underline">
            Waiting
          </Link>
        </div>
      </section>

      {/* Quote Section */}
      <Divider />
      <div className="prose prose-slate max-w-none prose-p:text-[var(--foreground)]">
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
