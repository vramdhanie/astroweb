import { getAllProjects, getAllProjectTags } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';
import { Github } from 'lucide-react';

export default function ProjectsPage() {
  const projects = getAllProjects();
  const allTags = getAllProjectTags();

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-left mb-8 text-[var(--foreground)]">Projects</h1>

      <div className="mb-8">
        <p className="text-[var(--muted-foreground)] max-w-3xl">
          Open source projects and experiments. Each one is a learning experience.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-background border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{projects.length}</div>
          <div className="text-sm text-muted-foreground">Total Projects</div>
        </div>
        <div className="bg-background border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {projects.filter(p => p.highlight).length}
          </div>
          <div className="text-sm text-muted-foreground">Featured</div>
        </div>
        <div className="bg-background border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {projects.reduce((sum, p) => sum + (p.stars || 0), 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Stars</div>
        </div>
        <div className="bg-background border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {projects.reduce((sum, p) => sum + (p.forks || 0), 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Forks</div>
        </div>
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Filter by Technology</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`/projects?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

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
