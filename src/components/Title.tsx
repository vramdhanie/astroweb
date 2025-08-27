interface TitleProps {
  title: string;
  subtitle: string;
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <h3 className="text-lg text-muted-foreground">{subtitle}</h3>
    </div>
  );
}
