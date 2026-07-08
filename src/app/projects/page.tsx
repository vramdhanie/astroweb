import { getAllProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';
import { Github } from 'lucide-react';

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-left mb-8 text-[var(--foreground)]">Projects</h1>

      <div className="mb-8">
        <p className="text-[var(--muted-foreground)] max-w-prose">
          Open source projects and experiments. Each one is a learning experience.
        </p>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No projects found.</p>
          <p className="text-muted-foreground text-sm mt-2">
            Check back soon for new projects!
          </p>
        </div>
      )}

      {/* GitHub Link */}
      <div className="mt-12 text-center">
        <p className="text-[var(--muted-foreground)] mb-4">
          Want to see more?
        </p>
        <Link
          href="https://github.com/vramdhanie"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90 transition-opacity duration-200"
        >
          <Github size={20} />
          View on GitHub
        </Link>
      </div>
    </>
  );
}
