'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ArticleListItem } from '@/types/article';

interface ArticleCardProps {
  article: ArticleListItem;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const imagePath = `/images/articles/${article.image}`;
  
  return (
    <article className="group relative bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
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
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              article.level === 'beginner' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : article.level === 'intermediate'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {article.level}
            </span>
            <span className="text-sm text-muted-foreground">
              {article.readingTime} min read
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {article.abstract}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">By {article.author}</span>
              <span className="text-muted-foreground">•</span>
              <time className="text-sm text-muted-foreground" dateTime={article.date}>
                {format(new Date(article.date), 'MMM dd, yyyy')}
              </time>
            </div>
          </div>
          
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
              {article.tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                  +{article.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
