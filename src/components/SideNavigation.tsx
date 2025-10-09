import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';

export default function SideNavigation() {
  const articles = getAllArticles();
  
  return (
    <nav className="pl-2 text-right col-span-1 md:order-last md:border-l md:border-border md:pl-6">
      <ul className="space-y-2">
        <li>
          <Link
            href="/"
            className="text-primary hover:underline hover:text-primary/80 font-medium transition-colors block py-1"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/articles"
            className="text-primary hover:underline hover:text-primary/80 font-medium transition-colors block py-1"
          >
            Articles
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className="text-primary hover:underline hover:text-primary/80 font-medium transition-colors block py-1"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="/books"
            className="text-primary hover:underline hover:text-primary/80 font-medium transition-colors block py-1"
          >
            Books
          </Link>
        </li>
        <li>
          <Link
            href="/podcasts"
            className="text-primary hover:underline hover:text-primary/80 font-medium transition-colors block py-1"
          >
            Podcasts
          </Link>
        </li>
        <li>
          <Link
            href="/uses"
            className="text-primary hover:underline hover:text-primary/80 font-medium transition-colors block py-1"
          >
            Uses
          </Link>
        </li>
        <li>
          <Link
            href="/temperature"
            className="text-primary hover:underline hover:text-primary/80 font-medium transition-colors block py-1"
          >
            Temperature
          </Link>
        </li>
      </ul>
      
      <div className="w-full text-right text-muted-foreground text-sm my-6">― • ―</div>
      
      <h3 className="text-lg font-bold text-right font-mono text-foreground mb-3">Recent Articles</h3>
      <ul className="space-y-2">
        {articles.slice(0, 5).map((article) => (
          <li key={article._slug} className="py-1">
            <Link
              href={`/articles/${article._slug}`}
              className="text-primary hover:underline hover:text-primary/80 transition-colors text-sm block"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="w-full text-right text-muted-foreground text-sm my-6">― • ―</div>
      
      <h3 className="text-lg font-bold text-right font-mono text-foreground mb-3">Reading Lists</h3>
      <ul className="space-y-2">
        <li className="py-1">
          <Link
            href="/books/2025"
            className="text-primary hover:underline hover:text-primary/80 transition-colors block"
          >
            2025
          </Link>
        </li>
        <li className="py-1">
          <Link
            href="/books/2024"
            className="text-primary hover:underline hover:text-primary/80 transition-colors block"
          >
            2024
          </Link>
        </li>
        <li className="py-1">
          <Link
            href="/books/2023"
            className="text-primary hover:underline hover:text-primary/80 transition-colors block"
          >
            2023
          </Link>
        </li>
      </ul>
      
      <div className="w-full text-right text-muted-foreground text-sm my-6">― • ―</div>
      
      <h3 className="text-lg font-bold text-right font-mono text-foreground mb-3">Apps</h3>
      <ul className="space-y-2">
        <li className="py-1">
          <a
            href="https://words.vincentramdhanie.com"
            className="text-primary hover:underline hover:text-primary/80 transition-colors block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Word Assist <span className="text-xs text-muted-foreground">↗</span>
          </a>
        </li>
        <li className="py-1">
          <a
            href="https://boxed.vincentramdhanie.com"
            className="text-primary hover:underline hover:text-primary/80 transition-colors block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Boxed <span className="text-xs text-muted-foreground">↗</span>
          </a>
        </li>
        <li className="py-1">
          <a
            href="https://fire.vincentramdhanie.com"
            className="text-primary hover:underline hover:text-primary/80 transition-colors block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fire <span className="text-xs text-muted-foreground">↗</span>
          </a>
        </li>
        <li className="py-1">
          <a
            href="https://flood.vincentramdhanie.com"
            className="text-primary hover:underline hover:text-primary/80 transition-colors block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flood <span className="text-xs text-muted-foreground">↗</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
