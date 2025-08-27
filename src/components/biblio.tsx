'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BiblioProps {
  children?: React.ReactNode;
  author: string;
  title: string;
  year: string;
  cover: string;
}

const Biblio = ({ children, author, title, year, cover }: BiblioProps) => {
  const [imageError, setImageError] = useState(false);

  
  const handleImageError = () => {
    setImageError(true);
  };

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
    <div className="p-4 mx-2 flex justify-between w-full">
      <div className="text-left mt-2">
        <div className="font-semibold text-foreground">{title}</div>
        <div className="font-normal text-foreground/80">{author}</div>
        <div className="font-normal text-muted-foreground">{year}</div>
        {children && <div className="text-muted-foreground text-sm">{children}</div>}
      </div>
      <div className="w-24 mr-2 shrink-0">
        {!imageError ? (
          <Image 
            src={imageSrc}
            alt="book cover"
            width={96}
            height={128}
            className="w-24 h-32 object-contain"
            onError={handleImageError}
            unoptimized={cover.startsWith('http')} // Use unoptimized for external images
          />
        ) : (
          <div className="w-24 h-32 bg-muted flex items-center justify-center text-muted-foreground text-xs text-center">
            Cover<br/>Unavailable
          </div>
        )}
      </div>
    </div>
  );
};

export default Biblio;
