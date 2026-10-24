import Image from 'next/image';
import Link from 'next/link';
import { ProjectListItem } from '@/types/project';
import { Badge } from '@/components/ui/Badge';
import { Star, GitFork, Code, Globe, Github } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectListItem;
  showTechStack?: boolean;
  showStats?: boolean;
}

export default function ProjectCard({ project, showTechStack = true, showStats = true }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-[var(--background)] border border-[var(--border)] rounded-lg overflow-hidden hover:-translate-y-1 transition-all duration-300"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {project.icon && (
                <Image
                  src={project.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-md flex-shrink-0"
                />
              )}
              <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-200">
                {project.title}
              </h3>
            </div>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
              {project.abstract}
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        {showTechStack && project.techStack.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech, index) => (
                <Badge key={index} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        {showStats && (
          <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
            <div className="flex items-center space-x-4">
              {!!project.stars && (
                <span className="flex items-center gap-1">
                  <Star size={14} />
                  {project.stars}
                </span>
              )}
              {!!project.forks && (
                <span className="flex items-center gap-1">
                  <GitFork size={14} />
                  {project.forks}
                </span>
              )}
              {project.language && (
                <span className="flex items-center gap-1">
                  <Code size={14} />
                  {project.language}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <span className="text-[var(--primary)] flex items-center gap-1">
                  <Globe size={14} />
                  Live
                </span>
              )}
              <span className="text-[var(--primary)] flex items-center gap-1">
                <Github size={14} />
                Repo
              </span>
            </div>
          </div>
        )}

      </div>
    </Link>
  );
}
