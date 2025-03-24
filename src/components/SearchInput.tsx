
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Search for verses, concepts, or topics...",
  className,
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };
  
  const handleClear = () => {
    setQuery("");
  };
  
  return (
    <div 
      className={cn(
        "relative w-full max-w-2xl mx-auto transition-all duration-300 ease-in-out",
        isFocused ? "scale-[1.02]" : "scale-100",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
            isFocused ? "text-primary" : "text-muted-foreground"
          )} />
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={cn(
              "w-full py-3 pl-12 pr-10 rounded-full border transition-all duration-200 ease-in-out outline-none",
              "bg-card text-card-foreground placeholder:text-muted-foreground/70",
              isFocused ? "border-ring shadow-sm" : "border-border"
            )}
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
