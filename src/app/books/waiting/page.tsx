import { getWaitingBooks } from '@/lib/books';
import Biblio from '@/components/Biblio';
import Link from 'next/link';

export default function WaitingBooksPage() {
  const waitingBooks = getWaitingBooks();

  // Sort books by title
  const sortedBooks = waitingBooks.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

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

      {sortedBooks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No waiting books found.</p>
        </div>
      ) : (
        <div className="py-2 w-full max-w-3xl">
          <ul className="list-none">
            {sortedBooks.map((book) => (
              <li key={book.isbn} className="border-b border-border last:border-0" data-id={book.isbn}>
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
