import { getWaitingBooks, ReadingStatus } from '@/lib/books';
import Biblio from '@/components/Biblio';
import Link from 'next/link';
import { Clock, HelpCircle } from 'lucide-react';

export default function WaitingBooksPage() {
  const waitingBooks = getWaitingBooks();

  // Sort books by title
  const sortedBooks = waitingBooks.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const getStatusIcon = (status: ReadingStatus, progress: string) => {
    const baseClasses = "self-start p-3 rounded-lg transition-all duration-200 flex flex-col items-center gap-1 bg-slate-50 dark:bg-slate-800";

    if (status === 'WAIT') {
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

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-left mb-2 text-[var(--foreground)]">Waiting to Read</h1>
        <p className="text-[var(--muted-foreground)]">
          Books I plan to read but haven&apos;t started yet.
        </p>
      </div>

      {/* Reading Status Legend */}
      <div className="mb-6 p-4 bg-[var(--muted)]/30 rounded-lg border border-[var(--border)]">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Reading Status</h3>
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-orange-700 rounded-md font-semibold dark:bg-slate-800 dark:text-orange-400 border-2 border-orange-600 dark:border-orange-500">
            <Clock size={16} />
            <span>Waiting to Read</span>
          </div>
        </div>
      </div>

      {sortedBooks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No waiting books found.</p>
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
