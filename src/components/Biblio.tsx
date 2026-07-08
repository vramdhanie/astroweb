import Image from 'next/image';

interface BiblioProps {
  children?: React.ReactNode;
  author: string;
  title: string;
  year: string;
  cover: string;
  status?: React.ReactNode;
}

export default function Biblio({ children, author, title, year, cover, status }: BiblioProps) {
  // Determine the correct image source
  const getImageSrc = () => {
    if (cover.startsWith('http')) {
      return cover; // External URL
    } else if (cover === 'cover.png') {
      return '/images/books/cover.png'; // Local cover.png
    } else {
      return `/images/books/${cover}`; // Other local images
    }
  };

  const imageSrc = getImageSrc();

  return (
    <div className="flex gap-5 py-5 w-full">
      <div className="w-20 shrink-0">
        <Image
          src={imageSrc}
          alt={`${title} cover`}
          width={80}
          height={112}
          className="w-20 h-28 object-contain"
          unoptimized={cover.startsWith('http')} // Use unoptimized for external images
        />
      </div>
      <div className="flex-1 text-left">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-semibold text-foreground">{title}</span>
          {status}
        </div>
        <div className="font-normal text-foreground/80">{author}</div>
        <div className="text-sm text-muted-foreground">{year}</div>
        {children && (
          <div className="text-muted-foreground mt-2 leading-relaxed max-w-prose">{children}</div>
        )}
      </div>
    </div>
  );
}
