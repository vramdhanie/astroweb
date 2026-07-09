interface TitleProps {
  title: string;
  subtitle: string;
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <h2 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
      {title}
      {subtitle && (
        <span className="ml-2 font-normal text-[var(--muted-foreground)]">{subtitle}</span>
      )}
    </h2>
  );
}
