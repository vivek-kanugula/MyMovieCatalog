import { useParams, Link } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { genres, languages, getMoviesByGenre } from '@/data/mockMovies';

const GenrePage = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Scroll to top when genre changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [genreId]);

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev => 
      prev.includes(lang) 
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    );
  };

  const genre = genres.find((g) => g.id === genreId);
  const movies = useMemo(() => getMoviesByGenre(genreId || ''), [genreId]);

  const filteredMovies = useMemo(() => {
    if (selectedLanguages.length === 0) return movies;
    return movies.filter((m) => 
      selectedLanguages.some(lang => m.availableLanguages.includes(lang))
    );
  }, [movies, selectedLanguages]);

  const moviesByYear = useMemo(() => {
    const grouped: Record<number, typeof movies> = {};
    filteredMovies.forEach((movie) => {
      if (!grouped[movie.year]) grouped[movie.year] = [];
      grouped[movie.year].push(movie);
    });
    return Object.entries(grouped)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, movies]) => ({ year: Number(year), movies }));
  }, [filteredMovies]);

  const otherGenres = genres.filter((g) => g.id !== genreId);

  if (!genre) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Genre not found</h1>
          <Link to="/">
            <Button variant="gold">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <img
          src={genre.thumbnail}
          alt={genre.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              {genre.name} <span className="gold-gradient-text">Movies</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Language Filter */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <Button
              variant={selectedLanguages.length === 0 ? 'gold' : 'cinema'}
              size="sm"
              onClick={() => setSelectedLanguages([])}
            >
              All Languages
            </Button>
            {languages.map((lang) => (
              <Button
                key={lang}
                variant={selectedLanguages.includes(lang) ? 'gold' : 'cinema'}
                size="sm"
                onClick={() => toggleLanguage(lang)}
              >
                {lang}
                {selectedLanguages.includes(lang) && ' ✓'}
              </Button>
            ))}
          </div>
          {selectedLanguages.length > 0 && (
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <span>Selected:</span>
              {selectedLanguages.map(lang => (
                <span key={lang} className="text-primary">{lang}</span>
              ))}
              <button 
                onClick={() => setSelectedLanguages([])}
                className="text-xs text-muted-foreground hover:text-foreground ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Movies by Year */}
      <main className="container mx-auto px-4 py-8">
        {moviesByYear.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No movies found for this filter.</p>
          </div>
        ) : (
          moviesByYear.map(({ year, movies }) => (
            <section key={year} className="mb-12 animate-fade-in">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="text-primary">{year}</span>
                <span className="h-px flex-1 bg-border" />
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          ))
        )}

        {/* Explore Other Genres */}
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Explore Other <span className="gold-gradient-text">Genres</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherGenres.map((g) => (
              <Link key={g.id} to={`/genre/${g.id}`}>
                <Button variant="cinema" size="lg" className="genre-badge">
                  {g.name}
                </Button>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-display text-lg">
            <span className="gold-gradient-text">MyMovieCatalog</span> © 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GenrePage;
