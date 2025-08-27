import { getAllArticles, getAllTags, getAllLevels } from '../../lib/articles';
import ArticleCard from '../../components/ArticleCard';

export default function ArticlesPage() {
  const articles = getAllArticles();
  const tags = getAllTags();
  const levels = getAllLevels();

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-left mb-8 font-mono border-b pb-2 border-slate-200">Articles</h1>
      <div className="mb-8">
        <p className="text-muted-foreground text-lg max-w-3xl">
          Explore technical articles covering React, Firebase, AI, and software engineering topics. 
          Each article is categorized by difficulty level and tagged for easy discovery.
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
