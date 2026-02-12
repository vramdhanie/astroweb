import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { ExternalLink } from 'lucide-react';

export default function SideNavigation() {
  const articles = getAllArticles();

  return (
    <nav className="pr-8 col-span-1 md:order-first">
      {/* Main Navigation */}
      <ul className="space-y-1">
        <li>
          <Link
            href="/"
            className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)]"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/articles"
            className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)]"
          >
            Articles
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)]"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="/books"
            className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)]"
          >
            Books
          </Link>
        </li>
        <li>
          <Link
            href="/podcasts"
            className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)]"
          >
            Podcasts
          </Link>
        </li>
        <li>
          <Link
            href="/uses"
            className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)]"
          >
            Uses
          </Link>
        </li>
        <li>
          <Link
            href="/temperature"
            className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)]"
          >
            Temperature
          </Link>
        </li>
      </ul>

      {/* Recent Articles */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 px-3">Recent Articles</h3>
        <ul className="space-y-1">
          {articles.slice(0, 5).map((article) => (
            <li key={article._slug}>
              <Link
                href={`/articles/${article._slug}`}
                className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm block py-2 px-3 rounded-md hover:bg-[var(--accent)] line-clamp-2"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Reading Lists */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 px-3">Reading Lists</h3>
        <ul className="space-y-1">
          <li>
            <Link
              href="/books/2026"
              className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)]"
            >
              2026
            </Link>
          </li>
          <li>
            <Link
              href="/books/2025"
              className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)]"
            >
              2025
            </Link>
          </li>
          <li>
            <Link
              href="/books/2024"
              className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)]"
            >
              2024
            </Link>
          </li>
          <li>
            <Link
              href="/books/2023"
              className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)]"
            >
              2023
            </Link>
          </li>
          <li>
            <Link
              href="/books/waiting"
              className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)]"
            >
              Waiting
            </Link>
          </li>
        </ul>
      </div>

      {/* Apps */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 px-3">Apps</h3>
        <ul className="space-y-1">
          <li>
            <a
              href="https://words.vincentramdhanie.com"
              className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)] flex items-center justify-between group"
              target="_blank"
              rel="noopener noreferrer"
            >
              Word Assist
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
          <li>
            <a
              href="https://boxed.vincentramdhanie.com"
              className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)] flex items-center justify-between group"
              target="_blank"
              rel="noopener noreferrer"
            >
              Boxed
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
          <li>
            <a
              href="https://fire.vincentramdhanie.com"
              className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)] flex items-center justify-between group"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fire
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
          <li>
            <a
              href="https://flood.vincentramdhanie.com"
              className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors block py-2 px-3 rounded-md hover:bg-[var(--accent)] flex items-center justify-between group"
              target="_blank"
              rel="noopener noreferrer"
            >
              Flood
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
