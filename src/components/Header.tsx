import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  return (
    <header className="py-6">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={48}
              height={48}
              className="w-12 h-12 rounded-md"
            />
            <div>
              <div className="text-lg font-semibold text-[var(--foreground)]">Vincent Ramdhanie</div>
              <div className="text-sm text-[var(--muted-foreground)]">Senior Software Engineer</div>
            </div>
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
