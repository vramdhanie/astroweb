import { getWaitingBooks, ReadingStatus } from '@/lib/books';
import Biblio from '@/components/Biblio';
import Link from 'next/link';

export default function WaitingBooksPage() {
  const waitingBooks = getWaitingBooks();

  // Sort books by title
  const sortedBooks = waitingBooks.sort((a, b) => 
    a.title.localeCompare(b.title)
  );

  const getStatusIcon = (status: ReadingStatus, progress: string) => {
    const baseClasses = "self-start p-4 rounded-lg transition-all duration-200 hover:scale-110";
    
    if (status === 'WAIT') {
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

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-left mb-2 font-mono">Waiting to Read</h1>
        <p className="text-muted-foreground text-lg">
          Books I plan to read but haven&apos;t started yet.
        </p>
      </div>
      
      {/* Reading Status Legend */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Reading Status Legend</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 p-2 bg-amber-800 text-white rounded font-medium dark:bg-amber-900/80 dark:text-amber-200">
            <span className="text-lg">📚</span>
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
