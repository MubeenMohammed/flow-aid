import { useRef } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
};

export const SearchBar = ({ onSearch, placeholder = "Search games...", className }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div className={cn("relative", className)}>
      <div className="relative group w-full max-w-2xl mx-auto">
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" 
            size={18} 
          />
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full h-12 pl-10 pr-12 rounded-xl border border-input bg-background shadow-sm transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-ring focus:border-input
              group-hover:border-foreground/20 group-hover:shadow-md"
          />
          {inputRef.current?.value && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-background"
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = '';
                  onSearch('');
                }
                inputRef.current?.focus();
              }}
            >
              <X size={16} className="text-muted-foreground hover:text-foreground" />
            </Button>
          )}
        </div>

        <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
    </div>
  );
}; 