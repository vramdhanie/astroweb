import Link from 'next/link';
import { ProjectListItem } from '@/types/project';

interface ProjectCardProps {
  project: ProjectListItem;
  showTechStack?: boolean;
  showStats?: boolean;
}

export default function ProjectCard({ project, showTechStack = true, showStats = true }: ProjectCardProps) {
  return (
    <Link 
      href={`/projects/${project.slug}`}
      className="group block bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.abstract}
            </p>
          </div>
          {project.highlight && (
            <div className="flex-shrink-0 ml-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                ⭐ Featured
              </span>
            </div>
          )}
        </div>

        {/* Tech Stack */}
        {showTechStack && project.techStack.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        {showStats && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              {project.stars && (
                <span className="flex items-center">
                  <span className="mr-1">⭐</span>
                  {project.stars}
                </span>
              )}
              {project.forks && (
                <span className="flex items-center">
                  <span className="mr-1">🔀</span>
                  {project.forks}
                </span>
              )}
              {project.language && (
                <span className="flex items-center">
                  <span className="mr-1">💻</span>
                  {project.language}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {project.liveUrl && (
                <span className="text-primary">🌐 Live</span>
              )}
              <span className="text-primary">📁 GitHub</span>
            </div>
          </div>
        )}

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary/80"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  +{project.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
