import Link from "next/link";
import { getHighlightedProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import { Divider } from '@/components/ui/Divider';

export default function Home() {
  const highlightedProjects = getHighlightedProjects();

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-left mb-12">Hi, I&apos;m Vincent.</h1>

      {/* Introduction */}
      <div className="prose prose-slate max-w-prose prose-p:text-[var(--foreground)] prose-a:text-[var(--primary)]">
        <p>
          My interest in AI started at university, where my master&apos;s thesis explored
          parallel algorithms on GPU architecture — well before the current wave made
          the field crowded. Today I build practical applications with language models,
          turning research into tools people actually use.
        </p>
        <p>
          What holds my attention isn&apos;t novelty. Technology matters most when it
          serves people and helps build a more just and unified world. I try to hold my
          own work to that standard: to make things that respect the intelligence and
          dignity of the people who use them.
        </p>
      </div>

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
