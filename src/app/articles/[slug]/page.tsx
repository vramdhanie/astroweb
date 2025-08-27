import { getArticleBySlug, getAllArticleSlugs } from '@/lib/articles';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { format } from 'date-fns';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mdxComponents } from '@/components/mdx';

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for each article
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} - Vincent Ramdhanie`,
    description: article.abstract,
    openGraph: {
      title: article.title,
      description: article.abstract,
      images: [`/images/articles/${article.image}`],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const imagePath = `/images/articles/${article.image}`;

  return (
    <>
      {/* Article Header */}
      <header className="mb-8">
        <div className="mb-6">
          <Link 
            href="/articles" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-200 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Articles
          </Link>
          
          <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              article.level === 'beginner' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : article.level === 'intermediate'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {article.level}
            </span>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>By {article.author}</span>
              <span>•</span>
              <time dateTime={article.date}>
                {format(new Date(article.date), 'MMMM dd, yyyy')}
              </time>
            </div>
          </div>
          
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Featured Image */}
        <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
          <Image
            src={imagePath}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Abstract */}
        <div className="bg-muted p-6 rounded-lg">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {article.abstract}
          </p>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        <MDXRemote source={article.content} components={mdxComponents} />
      </div>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">
            <p>Written by {article.author}</p>
            <p>Published on {format(new Date(article.date), 'MMMM dd, yyyy')}</p>
          </div>
          
          <Link 
            href="/articles" 
            className="text-primary hover:text-primary/80 transition-colors duration-200"
          >
            View all articles →
          </Link>
        </div>
      </footer>
    </>
  );
}
