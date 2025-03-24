
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface VerseCardProps {
  id: string;
  source: string;
  sanskrit: string;
  translation: string;
  className?: string;
}

const VerseCard: React.FC<VerseCardProps> = ({
  id,
  source,
  sanskrit,
  translation,
  className,
}) => {
  return (
    <Link 
      to={`/verse/${id}`}
      className={cn(
        "block group",
        className
      )}
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-md">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
              {source}
            </span>
          </div>
          
          <div className="space-y-2">
            <p className="sanskrit text-base leading-relaxed opacity-90 line-clamp-2 group-hover:text-primary/90 transition-colors">
              {sanskrit}
            </p>
            
            <p className="text-sm text-muted-foreground line-clamp-3">
              {translation}
            </p>
          </div>
          
          <div className="pt-2">
            <span className="text-sm font-medium text-primary/80 group-hover:text-primary inline-flex items-center transition-colors">
              Read more
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VerseCard;
