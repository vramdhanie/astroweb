import Image from 'next/image';

interface PodcastProps {
  title: string;
  presenters: string[];
  yearStarted: string;
  cover: string;
  cadence: string;
  numberOfEpisodes: number;
  isActive: boolean;
  children: React.ReactNode;
}

export default function Podcast({
  title,
  presenters,
  yearStarted,
  cover,
  cadence,
  numberOfEpisodes,
  isActive,
  children
}: PodcastProps) {
  const imagePath = `/images/podcasts/${cover}`;
  
  return (
    <div className="flex items-start space-x-4 py-4">
      <div className="flex-shrink-0">
        <Image
          src={imagePath}
          alt={`${title} podcast cover`}
          width={80}
          height={80}
          className="rounded-lg shadow-sm"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {!isActive && (
            <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
              Inactive
            </span>
          )}
        </div>
        
        <div className="text-sm text-muted-foreground mb-2">
          <span className="font-medium">Presenters:</span> {presenters.join(', ')}
        </div>
        
        <div className="text-sm text-muted-foreground mb-3">
          <span className="font-medium">Started:</span> {yearStarted} • 
          <span className="font-medium ml-2">Cadence:</span> {cadence} • 
          <span className="font-medium ml-2">Episodes:</span> {numberOfEpisodes}
        </div>
        
        <div className="text-foreground text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
