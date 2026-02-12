'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ArticleListItem } from '@/types/article';
import { Badge } from '@/components/ui/Badge';
import { Clock } from 'lucide-react';

interface ArticleCardProps {
  article: ArticleListItem;
}

const getLevelVariant = (level: string): "success" | "warning" | "info" => {
  if (level === 'beginner') return 'success';
  if (level === 'intermediate') return 'warning';
  return 'info';
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const imagePath = `/images/articles/${article.image}`;

  return (
    <article className="group relative bg-[var(--background)] border border-[var(--border)] rounded-lg overflow-hidden hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <Link href={`/articles/${article._slug}`} className="block">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={imagePath}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={getLevelVariant(article.level)}>
              {article.level}
            </Badge>
            <span className="text-sm text-[var(--muted-foreground)] flex items-center gap-1">
              <Clock size={14} />
              {article.readingTime} min
            </span>
          </div>

          <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors duration-200 line-clamp-2">
            {article.title}
          </h3>

          <p className="text-[var(--muted-foreground)] mb-4 line-clamp-3">
            {article.abstract}
          </p>

          <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-4">
            <span>By {article.author}</span>
            <span>•</span>
            <time dateTime={article.date}>
              {format(new Date(article.date), 'MMM dd, yyyy')}
            </time>
          </div>

          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
              {article.tags.length > 3 && (
                <Badge variant="default">
                  +{article.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
