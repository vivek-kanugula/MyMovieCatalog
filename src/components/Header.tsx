import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, SlidersHorizontal, Film } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { genres, languages, searchMovies } from '@/data/mockMovies';

interface HeaderProps {
  onSearch?: (query: string, filters: { language?: string; genre?: string }) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>();
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>();
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchMovies>>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results = searchMovies(query, { language: selectedLanguage, genre: selectedGenre });
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
    onSearch?.(query, { language: selectedLanguage, genre: selectedGenre });
  };

  const handleClear = () => {
    setSearchQuery('');
    setSelectedLanguage(undefined);
    setSelectedGenre(undefined);
    setSearchResults([]);
    setShowResults(false);
    onSearch?.('', {});
  };

  const handleMovieClick = (movieId: string) => {
    setShowResults(false);
    setSearchQuery('');
    navigate(`/movie/${movieId}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Film className="h-8 w-8 text-primary" />
            <span className="font-display text-xl font-bold gold-gradient-text hidden sm:block">
              MyMovieCatalog
            </span>
          </Link>

          {/* Search Container */}
          <div className="search-container flex-1 max-w-2xl relative">
            <div className="flex items-center gap-2">
              {/* Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="cinema" size="icon" className="shrink-0">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-card border-border">
                  <DropdownMenuLabel className="text-foreground">Filter by Language</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  {languages.map((lang) => (
                    <DropdownMenuCheckboxItem
                      key={lang}
                      checked={selectedLanguage === lang}
                      onCheckedChange={(checked) => {
                        setSelectedLanguage(checked ? lang : undefined);
                        if (searchQuery) handleSearch(searchQuery);
                      }}
                      className="text-foreground"
                    >
                      {lang}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuLabel className="text-foreground">Filter by Genre</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  {genres.map((genre) => (
                    <DropdownMenuCheckboxItem
                      key={genre.id}
                      checked={selectedGenre === genre.id}
                      onCheckedChange={(checked) => {
                        setSelectedGenre(checked ? genre.id : undefined);
                        if (searchQuery) handleSearch(searchQuery);
                      }}
                      className="text-foreground"
                    >
                      {genre.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery && setShowResults(true)}
                  className="pl-10 pr-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
                {searchQuery && (
                  <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                {searchResults.slice(0, 5).map((movie) => (
                  <button
                    key={movie.id}
                    onClick={() => handleMovieClick(movie.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-secondary transition-colors text-left"
                  >
                    <img
                      src={movie.thumbnail}
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-foreground">{movie.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {movie.year} • {movie.originalLanguage}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
