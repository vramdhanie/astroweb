import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import NavLink from '@/components/NavLink';

const APPS = [
  { href: 'https://words.vincentramdhanie.com', label: 'Word Assist', icon: '/images/projects/word-assist.svg' },
  { href: 'https://boxed.vincentramdhanie.com', label: 'Boxed', icon: '/images/projects/react-boxed.svg' },
  { href: 'https://fire.vincentramdhanie.com', label: 'Fire', icon: '/images/projects/fire.svg' },
  { href: 'https://flood.vincentramdhanie.com', label: 'Flood', icon: '/images/projects/flood.svg' },
  { href: 'https://football.vincentramdhanie.com', label: 'Football', icon: '/images/projects/football.svg' },
  { href: 'https://news.vincentramdhanie.com', label: 'News', icon: '/images/projects/news.svg' },
  { href: 'https://space.vincentramdhanie.com', label: 'Space', icon: '/images/projects/space.svg' },
  { href: 'https://lander.vincentramdhanie.com', label: 'Lander', icon: '/images/projects/lander.svg' },
];

export default function SideNavigation() {
  return (
    <nav className="md:pr-8 col-span-1 md:order-first">
      {/* Main Navigation — a compact wrapping row on mobile, a column on md+ */}
      <ul className="flex flex-wrap gap-1 md:block md:space-y-1">
        {[
          { href: '/', label: 'Home', exact: true },
          { href: '/articles', label: 'Articles' },
          { href: '/projects', label: 'Projects' },
          { href: '/books', label: 'Books' },
          { href: '/podcasts', label: 'Podcasts' },
          { href: '/uses', label: 'Uses' },
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

      {/* Apps — hidden on mobile */}
      <div className="hidden md:block mt-8">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 px-3">Apps</h3>
        <ul className="space-y-1">
          {APPS.map(({ href, label, icon }) => (
            <li key={href}>
              <a
                href={href}
                className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors py-2 px-3 rounded-md hover:bg-[var(--accent)] flex items-center justify-between group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center gap-2.5">
                  <Image src={icon} alt="" width={20} height={20} className="w-5 h-5 rounded" />
                  {label}
                </span>
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </li>
          ))}
          <li>
            <NavLink
              href="/temperature"
              exact
              className="transition-colors block py-2 px-3 rounded-md"
              activeClassName="text-[var(--primary)] bg-[var(--accent)]"
              inactiveClassName="text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--accent)]"
            >
              Temperature
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
