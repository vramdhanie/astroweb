import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-left mb-8 text-[var(--foreground)]">Articles</h1>
      <div className="mb-8">
        <p className="text-[var(--muted-foreground)] max-w-prose">
          Technical writing on React, Firebase, AI, and software engineering.
        </p>
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
