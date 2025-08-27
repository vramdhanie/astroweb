import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Vincent Ramdhanie`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Back to projects link */}
      <div className="mb-6">
        <Link 
          href="/projects"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-200 group"
        >
          <span className="mr-2 text-lg group-hover:-translate-x-1 transition-transform duration-200">←</span>
          <span className="underline underline-offset-2">Back to all projects</span>
        </Link>
      </div>

      {/* Project Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-left mb-2 font-mono">{project.title}</h1>
            <p className="text-muted-foreground text-lg mb-4">{project.description}</p>
            
            {/* Project Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <span>📅 {format(new Date(project.date), 'MMMM yyyy')}</span>
              {project.language && <span>💻 {project.language}</span>}
              {project.stars && <span>⭐ {project.stars} stars</span>}
              {project.forks && <span>🔀 {project.forks} forks</span>}
            </div>

            {/* Tech Stack */}
            {project.techStack.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Project Actions */}
          <div className="flex-shrink-0 flex flex-col gap-3">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors duration-200"
            >
              <span className="mr-2">🐙</span>
              View on GitHub
            </Link>
            
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                <span className="mr-2">🌐</span>
                Live Demo
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        <MDXRemote source={project.readme} />
      </div>

      {/* Footer Links */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex justify-between items-center">
          <Link
            href="/projects"
            className="text-primary hover:text-primary/80 transition-colors duration-200"
          >
            ← View all projects
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              GitHub Repository
            </Link>
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Live Demo
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
