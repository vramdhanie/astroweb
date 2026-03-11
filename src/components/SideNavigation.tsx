import { getAllArticles } from '@/lib/articles';
import { ExternalLink } from 'lucide-react';
import NavLink from '@/components/NavLink';

export default function SideNavigation() {
  const articles = getAllArticles();

  return (
    <nav className="pr-8 col-span-1 md:order-first">
      {/* Main Navigation */}
      <ul className="space-y-1">
        {[
          { href: '/', label: 'Home', exact: true },
          { href: '/articles', label: 'Articles' },
          { href: '/projects', label: 'Projects' },
          { href: '/books', label: 'Books' },
          { href: '/podcasts', label: 'Podcasts' },
          { href: '/uses', label: 'Uses' },
          { href: '/temperature', label: 'Temperature' },
        ].map(({ href, label, exact }) => (
          <li key={href}>
            <NavLink
              href={href}
              exact={exact}
              className="transition-colors block py-2 px-3 rounded-md"
              activeClassName="text-[var(--primary)] font-semibold bg-[var(--accent)]"
              inactiveClassName="text-[var(--foreground)] font-medium hover:text-[var(--primary)] hover:bg-[var(--accent)]"
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Recent Articles */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 px-3">Recent Articles</h3>
        <ul className="space-y-1">
          {articles.slice(0, 5).map((article) => (
            <li key={article._slug}>
              <NavLink
                href={`/articles/${article._slug}`}
                exact
                className="transition-colors text-sm block py-2 px-3 rounded-md line-clamp-2"
                activeClassName="text-[var(--primary)] bg-[var(--accent)]"
                inactiveClassName="text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--accent)]"
              >
                {article.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Reading Lists */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 px-3">Reading Lists</h3>
        <ul className="space-y-1">
          {[
            { href: '/books/2026', label: '2026' },
            { href: '/books/2025', label: '2025' },
            { href: '/books/2024', label: '2024' },
            { href: '/books/2023', label: '2023' },
            { href: '/books/waiting', label: 'Waiting' },
          ].map(({ href, label }) => (
            <li key={href}>
              <NavLink
                href={href}
                exact
                className="transition-colors block py-2 px-3 rounded-md"
                activeClassName="text-[var(--primary)] bg-[var(--accent)]"
                inactiveClassName="text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--accent)]"
              >
                {label}
              </NavLink>
            </li>
          ))}
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
