interface QuoteProps {
  author: string;
  children: React.ReactNode;
}

export default function Quote({ author, children }: QuoteProps) {
  return (
    <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-foreground">
      {children}
      <footer className="text-right text-sm text-muted-foreground mt-2">
        — {author}
      </footer>
    </blockquote>
  );
}
