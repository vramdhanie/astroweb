import { Star } from 'lucide-react';

interface RatingProps {
  score: number;
}

export default function Rating({ score }: RatingProps) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--background)] px-2.5 py-1.5"
      style={{ boxShadow: 'var(--shadow-sm)' }}
      title={`Rated ${score} out of 10`}
    >
      <Star size={14} className="text-[var(--primary)]" />
      <span className="text-sm font-medium tabular-nums text-[var(--foreground)]">
        {score}
        <span className="text-[var(--muted-foreground)]">/10</span>
      </span>
    </div>
  );
}
