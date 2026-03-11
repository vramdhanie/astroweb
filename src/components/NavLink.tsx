'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export default function NavLink({
  href,
  children,
  exact = false,
  className = '',
  activeClassName = '',
  inactiveClassName = '',
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(href + '/');

  return (
    <Link href={href} className={`${className} ${isActive ? activeClassName : inactiveClassName}`}>
      {children}
    </Link>
  );
}
