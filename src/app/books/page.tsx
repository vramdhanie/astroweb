import Link from 'next/link';
import Image from 'next/image';
import { getAllBookYears, getBooksForYear } from '@/lib/books';
import { BookOpen, CheckCircle2, Clock } from 'lucide-react';

export default function BooksPage() {
  const years = getAllBookYears();

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-left mb-8 text-[var(--foreground)]">Reading Lists</h1>

      <div className="mb-8">
        <p className="text-[var(--muted-foreground)] max-w-3xl">
          Reading lists organized by year. Books I&apos;ve read, currently reading, or planning to read.
        </p>
      </div>

      {/* Waiting Books Link */}
      <div className="mb-8">
        <Link 
          href="/books/waiting"
          className="group block bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
              Waiting to Read
            </h3>
            <p className="text-[var(--muted-foreground)] text-sm mb-4">
              Books I plan to read but haven&apos;t started yet
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-orange-700 rounded-full font-semibold dark:bg-slate-800 dark:text-orange-400 border-2 border-orange-600 dark:border-orange-500">
                <Clock size={14} />
                <span>Waiting List</span>
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Years Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {years.map((year) => {
          const books = getBooksForYear(year.year);
          const bookCount = books.length;
          const readCount = books.filter(book => book.readingStatus === 'READ').length;
          const readingCount = books.filter(book => book.readingStatus === 'READING').length;
          const waitCount = books.filter(book => book.readingStatus === 'WAIT').length;
          
          return (
            <Link 
              key={year._slug} 
              href={`/books/${year._slug}`}
              className="group block bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={`/images/books/${year.cover}`}
                  alt={`${year.year} Reading List`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Book count badge with better contrast */}
                <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm text-slate-900 dark:text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg border border-white/20 dark:border-slate-700/20">
                  {bookCount} book{bookCount !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {year.year} Reading List
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {year.description}
                </p>
                
                {/* Reading Statistics */}
                <div className="flex flex-wrap gap-2 text-xs">
                  {readingCount > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-blue-700 rounded-full font-semibold dark:bg-slate-800 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-500">
                      <BookOpen size={14} />
                      {readingCount} reading
                    </span>
                  )}
                  {readCount > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-green-700 rounded-full font-semibold dark:bg-slate-800 dark:text-green-400 border-2 border-green-600 dark:border-green-500">
                      <CheckCircle2 size={14} />
                      {readCount} read
                    </span>
                  )}
                  {waitCount > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-orange-700 rounded-full font-semibold dark:bg-slate-800 dark:text-orange-400 border-2 border-orange-600 dark:border-orange-500">
                      <Clock size={14} />
                      {waitCount} waiting
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {years.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No reading lists found.</p>
        </div>
      )}
    </>
  );
}
