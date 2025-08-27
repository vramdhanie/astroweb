import { getBookYearBySlug, getAllBookYearSlugs } from '../../../lib/books';
import Biblio from '../../../components/Biblio';
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

  // Sort books by reading status (READ first, then WAIT)
  const sortedBooks = bookYear.books.sort((a, b) => {
    if (a.readingStatus === 'READ' && b.readingStatus !== 'READ') return -1;
    if (a.readingStatus !== 'READ' && b.readingStatus === 'READ') return 1;
    return 0;
  });

  const getStatusIcon = (status: string, progress: string) => {
    if (status === 'READ') {
      return (
        <div className="self-start p-4">
          <span className="text-2xl">✅</span>
          <span className="text-foreground font-bold block">{progress}</span>
        </div>
      );
    } else {
      return (
        <div className="self-start p-4">
          <span className="text-2xl">⏳</span>
          <span className="text-foreground font-bold block">{progress}</span>
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
