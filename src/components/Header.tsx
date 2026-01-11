import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, SlidersHorizontal, Film, Home } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  onSearch?: (query: string, filters: { languages?: string[]; genres?: string[] }) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchMovies>>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results = searchMovies(query, { languages: selectedLanguages, genres: selectedGenres });
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
    onSearch?.(query, { languages: selectedLanguages, genres: selectedGenres });
  };

  const handleLanguageToggle = (lang: string) => {
    const newLanguages = selectedLanguages.includes(lang)
      ? selectedLanguages.filter(l => l !== lang)
      : [...selectedLanguages, lang];
    setSelectedLanguages(newLanguages);
    if (searchQuery) {
      const results = searchMovies(searchQuery, { languages: newLanguages, genres: selectedGenres });
      setSearchResults(results);
    }
  };

  const handleGenreToggle = (genreId: string) => {
    const newGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(g => g !== genreId)
      : [...selectedGenres, genreId];
    setSelectedGenres(newGenres);
    if (searchQuery) {
      const results = searchMovies(searchQuery, { languages: selectedLanguages, genres: newGenres });
      setSearchResults(results);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setSelectedLanguages([]);
    setSelectedGenres([]);
    setSearchResults([]);
    setShowResults(false);
    onSearch?.('', {});
  };

  const handleMovieClick = (movieId: string) => {
    setShowResults(false);
    setSearchQuery('');
    navigate(`/movie/${movieId}`);
  };

  const activeFiltersCount = selectedLanguages.length + selectedGenres.length;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo with Home Navigation */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <Film className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-display text-xl font-bold gold-gradient-text hidden sm:block">
              MyMovieCatalog
            </span>
          </Link>

          {/* Home Button (visible on mobile where logo text is hidden) */}
          <Link to="/" className="sm:hidden">
            <Button variant="cinema" size="icon" className="shrink-0">
              <Home className="h-4 w-4" />
            </Button>
          </Link>

          {/* Search Container */}
          <div className="search-container flex-1 max-w-2xl relative">
            <div className="flex items-center gap-2">
              {/* Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="cinema" size="icon" className="shrink-0 relative">
                    <SlidersHorizontal className="h-4 w-4" />
                    {activeFiltersCount > 0 && (
                      <Badge 
                        variant="default" 
                        className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
                      >
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-card border-border max-h-[70vh] overflow-y-auto">
                  <DropdownMenuLabel className="text-foreground flex items-center justify-between">
                    Filter by Language
                    {selectedLanguages.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {selectedLanguages.length} selected
                      </Badge>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  {languages.map((lang) => (
                    <DropdownMenuCheckboxItem
                      key={lang}
                      checked={selectedLanguages.includes(lang)}
                      onCheckedChange={() => handleLanguageToggle(lang)}
                      className="text-foreground"
                    >
                      {lang}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuLabel className="text-foreground flex items-center justify-between">
                    Filter by Genre
                    {selectedGenres.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {selectedGenres.length} selected
                      </Badge>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  {genres.map((genre) => (
                    <DropdownMenuCheckboxItem
                      key={genre.id}
                      checked={selectedGenres.includes(genre.id)}
                      onCheckedChange={() => handleGenreToggle(genre.id)}
                      className="text-foreground"
                    >
                      {genre.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                  
                  {/* Clear Filters Button */}
                  {activeFiltersCount > 0 && (
                    <>
                      <DropdownMenuSeparator className="bg-border" />
                      <div className="p-2">
                        <Button 
                          variant="goldOutline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            setSelectedLanguages([]);
                            setSelectedGenres([]);
                            if (searchQuery) {
                              const results = searchMovies(searchQuery, { languages: [], genres: [] });
                              setSearchResults(results);
                            }
                          }}
                        >
                          Clear All Filters
                        </Button>
                      </div>
                    </>
                  )}
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
                {(searchQuery || activeFiltersCount > 0) && (
                  <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedLanguages.map(lang => (
                  <Badge 
                    key={lang} 
                    variant="secondary" 
                    className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleLanguageToggle(lang)}
                  >
                    {lang} ×
                  </Badge>
                ))}
                {selectedGenres.map(genreId => {
                  const genre = genres.find(g => g.id === genreId);
                  return (
                    <Badge 
                      key={genreId} 
                      variant="outline" 
                      className="text-xs cursor-pointer border-primary text-primary hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                      onClick={() => handleGenreToggle(genreId)}
                    >
                      {genre?.name} ×
                    </Badge>
                  );
                })}
              </div>
            )}

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-sm text-muted-foreground">
                    Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                  </p>
                </div>
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
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{movie.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {movie.year} • {movie.originalLanguage}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {movie.genre.slice(0, 2).map(g => (
                          <Badge key={g} variant="secondary" className="text-xs">
                            {genres.find(genre => genre.id === g)?.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
                {searchResults.length > 5 && (
                  <div className="px-3 py-2 border-t border-border text-center">
                    <p className="text-sm text-muted-foreground">
                      +{searchResults.length - 5} more results
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* No Results Message */}
            {showResults && searchQuery && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-4 z-50">
                <p className="text-center text-muted-foreground">
                  No movies found matching your search
                  {activeFiltersCount > 0 && ' with selected filters'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
