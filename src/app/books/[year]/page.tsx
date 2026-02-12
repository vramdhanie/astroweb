import { getBookYearBySlug, getAllBookYearSlugs, ReadingStatus } from '@/lib/books';
import Biblio from '@/components/Biblio';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, CheckCircle2, Clock, HelpCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{
    year: string;
  }>;
}

// Generate static params for all book years
export async function generateStaticParams() {
  const slugs = getAllBookYearSlugs();
  return slugs.map((slug) => ({
    year: slug,
  }));
}

// Generate metadata for each book year
export async function generateMetadata({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const bookYear = getBookYearBySlug(year);
  
  if (!bookYear) {
    return {
      title: 'Reading List Not Found',
    };
  }

  return {
    title: `${bookYear.title} - Vincent Ramdhanie`,
    description: bookYear.description,
  };
}

export default async function BookYearPage({ params }: PageProps) {
  const { year } = await params;
  const bookYear = getBookYearBySlug(year);

  if (!bookYear) {
    notFound();
  }

  // Sort books by reading status (READING first, then READ, then WAIT, then others)
  const sortedBooks = bookYear.books.sort((a, b) => {
    // Define priority order: READING > READ > WAIT > others
    const getPriority = (status: ReadingStatus) => {
      if (status === 'READING') return 3;
      if (status === 'READ') return 2;
      if (status === 'WAIT') return 1;
      return 0;
    };
    
    const priorityA = getPriority(a.readingStatus);
    const priorityB = getPriority(b.readingStatus);
    
    return priorityB - priorityA; // Higher priority first
  });

  const getStatusIcon = (status: ReadingStatus, progress: string) => {
    const baseClasses = "self-start p-3 rounded-lg transition-all duration-200 flex flex-col items-center gap-1 bg-slate-50 dark:bg-slate-800";

    if (status === 'READ') {
      return (
        <div className={`${baseClasses} border-2 border-green-600 dark:border-green-500`} title="Completed">
          <CheckCircle2 size={24} className="text-green-700 dark:text-green-400" />
          <span className="text-green-700 dark:text-green-400 font-bold text-xs">{progress}</span>
        </div>
      );
    } else if (status === 'READING') {
      return (
        <div className={`${baseClasses} border-2 border-blue-600 dark:border-blue-500`} title="Currently Reading">
          <BookOpen size={24} className="text-blue-700 dark:text-blue-400" />
          <span className="text-blue-700 dark:text-blue-400 font-bold text-xs">{progress}</span>
        </div>
      );
    } else if (status === 'WAIT') {
      return (
        <div className={`${baseClasses} border-2 border-orange-600 dark:border-orange-500`} title="Waiting to Read">
          <Clock size={24} className="text-orange-700 dark:text-orange-400" />
          <span className="text-orange-700 dark:text-orange-400 font-bold text-xs">{progress}</span>
        </div>
      );
    } else {
      // Empty status or unknown status
      return (
        <div className={`${baseClasses} border-2 border-gray-400 dark:border-gray-600`} title="No Status Set">
          <HelpCircle size={24} className="text-gray-700 dark:text-gray-400" />
          <span className="text-gray-700 dark:text-gray-400 font-bold text-xs">{progress}</span>
        </div>
      );
    }
  };

  return (
    <>
      {/* Back to all years link */}
      <div className="mb-6">
        <Link 
          href="/books"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-200 group"
        >
          <span className="mr-2 text-lg group-hover:-translate-x-1 transition-transform duration-200">←</span>
          <span className="underline underline-offset-2">Back to all reading years</span>
        </Link>
      </div>

      {/* Year header with cover image */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="flex-shrink-0">
          <Image
            src={`/images/books/${bookYear.cover}`}
            alt={`${bookYear.year} Reading List`}
            width={120}
            height={120}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-left mb-2 text-[var(--foreground)]">{bookYear.title}</h1>
          <p className="text-[var(--muted-foreground)]">{bookYear.description}</p>
        </div>
      </div>
      
      {/* Reading Status Legend */}
      <div className="mb-6 p-4 bg-[var(--muted)]/30 rounded-lg border border-[var(--border)]">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Reading Status</h3>
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-blue-700 rounded-md font-semibold dark:bg-slate-800 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-500">
            <BookOpen size={16} />
            <span>Currently Reading</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-green-700 rounded-md font-semibold dark:bg-slate-800 dark:text-green-400 border-2 border-green-600 dark:border-green-500">
            <CheckCircle2 size={16} />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-orange-700 rounded-md font-semibold dark:bg-slate-800 dark:text-orange-400 border-2 border-orange-600 dark:border-orange-500">
            <Clock size={16} />
            <span>Waiting to Read</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-gray-700 rounded-md font-semibold dark:bg-slate-800 dark:text-gray-400 border-2 border-gray-400 dark:border-gray-600">
            <HelpCircle size={16} />
            <span>No Status</span>
          </div>
        </div>
      </div>

      {sortedBooks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No books found for {bookYear.year}</p>
        </div>
      ) : (
        <div className="py-2 w-full max-w-3xl prose prose-slate max-w-none prose-ul:text-foreground prose-li:text-foreground">
          <ul className="list-none">
            {sortedBooks.map((book) => (
              <li key={book.isbn} className="flex items-center border-b border-border" data-id={book.isbn}>
                {getStatusIcon(book.readingStatus, book.progressPercentage)}
                <Biblio
                  title={book.title}
                  author={book.author}
                  year={book.year}
                  cover={book.cover}
                >
                  {book.description}
                </Biblio>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
