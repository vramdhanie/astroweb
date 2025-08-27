import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="border-b border-border pb-4">
      <div className="container mx-auto grow-0">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <Image 
                src="/images/logo.png" 
                alt="logo" 
                width={48}
                height={48}
                className="w-12 h-12 rounded-sm" 
              />
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="font-mono text-lg font-bold text-foreground">Vincent Ramdhanie</div>
              <div className="text-sm text-muted-foreground font-light tracking-wide">Senior Software Engineer</div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
