import { getBookYearBySlug, getAllBookYearSlugs, ReadingStatus } from '@/lib/books';
import Biblio from '@/components/Biblio';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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
    const baseClasses = "self-start p-4 rounded-lg transition-all duration-200 hover:scale-110";
    
    if (status === 'READ') {
      return (
        <div className={`${baseClasses} bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30`} title="Completed">
          <span className="text-2xl block mb-1">✅</span>
          <span className="text-foreground font-bold text-sm">{progress}</span>
        </div>
      );
    } else if (status === 'READING') {
      return (
        <div className={`${baseClasses} bg-blue-800 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/30`} title="Currently Reading">
          <span className="text-2xl block mb-1">📖</span>
          <span className="text-foreground font-bold text-sm">{progress}</span>
        </div>
      );
    } else if (status === 'WAIT') {
      return (
        <div className={`${baseClasses} bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30`} title="Waiting to Read">
          <span className="text-2xl block mb-1">📚</span>
          <span className="text-foreground font-bold text-sm">{progress}</span>
        </div>
      );
    } else {
      // Empty status or unknown status
      return (
        <div className={`${baseClasses} bg-gray-50 dark:bg-gray-950/20 border border-gray-200 dark:border-gray-800/30`} title="No Status Set">
          <span className="text-2xl block mb-1">❓</span>
          <span className="text-foreground font-bold text-sm">{progress}</span>
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
          <h1 className="text-3xl font-bold tracking-tight text-left mb-2 font-mono">{bookYear.title}</h1>
          <p className="text-muted-foreground text-lg">{bookYear.description}</p>
        </div>
      </div>
      
      {/* Reading Status Legend */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Reading Status Legend</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 p-2 bg-blue-800 text-white rounded font-medium dark:bg-blue-900/80 dark:text-blue-200">
            <span className="text-lg">📖</span>
            <span>Currently Reading</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-green-800 text-white rounded font-medium dark:bg-green-900/80 dark:text-green-200">
            <span className="text-lg">✅</span>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-amber-800 text-white rounded font-medium dark:bg-amber-900/80 dark:text-amber-200">
            <span className="text-lg">📚</span>
            <span>Waiting to Read</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-800 text-white rounded font-medium dark:bg-gray-900/80 dark:text-gray-200">
            <span className="text-lg">❓</span>
            <span>No Status Set</span>
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
