import Link from 'next/link';
import Image from 'next/image';
import { getAllBookYears, getBooksForYear } from '@/lib/books';

export default function BooksPage() {
  const years = getAllBookYears();
  
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-left mb-8 font-mono border-b pb-2 border-slate-200">Reading Lists</h1>
      
      <div className="mb-8">
        <p className="text-muted-foreground text-lg max-w-3xl">
          Explore my reading lists organized by year. Each year contains books I&apos;ve read, 
          am currently reading, or plan to read. The data is automatically populated from my reading database.
        </p>
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
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-800 text-white rounded-full font-medium dark:bg-blue-900/80 dark:text-blue-200">
                      <span>📖</span>
                      {readingCount} reading
                    </span>
                  )}
                  {readCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-800 text-white rounded-full font-medium dark:bg-green-900/80 dark:text-green-200">
                      <span>✅</span>
                      {readCount} read
                    </span>
                  )}
                  {waitCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-800 text-white rounded-full font-medium dark:bg-amber-900/80 dark:text-amber-200">
                      <span>📚</span>
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
