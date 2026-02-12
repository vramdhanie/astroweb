import { getAllArticles, getAllTags, getAllLevels } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';

export default function ArticlesPage() {
  const articles = getAllArticles();
  const tags = getAllTags();
  const levels = getAllLevels();

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-left mb-8 text-[var(--foreground)]">Articles</h1>
      <div className="mb-8">
        <p className="text-[var(--muted-foreground)] max-w-3xl">
          Technical writing on React, Firebase, AI, and software engineering.
        </p>
      </div>

      {/* Filter Stats */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-muted rounded-lg">
        <div className="text-sm">
          <span className="font-medium text-foreground">{articles.length}</span>
          <span className="text-muted-foreground"> articles</span>
        </div>
        <div className="text-sm">
          <span className="font-medium text-foreground">{tags.length}</span>
          <span className="text-muted-foreground"> topics</span>
        </div>
        <div className="text-sm">
          <span className="font-medium text-foreground">{levels.length}</span>
          <span className="text-muted-foreground"> difficulty levels</span>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 not-prose">
        {articles.map((article) => (
          <ArticleCard key={article._slug} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No articles found.</p>
        </div>
      )}
    </>
  );
}
