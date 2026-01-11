import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getRandomMovies, type Movie } from '@/data/mockMovies';

const HeroCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMovies(getRandomMovies(6));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [movies.length]);

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <section className="relative w-full h-[60vh] min-h-[400px] max-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentMovie.thumbnail}
          alt={currentMovie.title}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl animate-fade-in">
          {currentMovie.teluguAvailable && (
            <span className="inline-block px-3 py-1 bg-success text-white text-sm font-bold rounded mb-4">
              Available in Telugu
            </span>
          )}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {currentMovie.title}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            <span className="text-lg">{currentMovie.year}</span>
            <span>•</span>
            <span className="text-lg">{currentMovie.originalLanguage}</span>
            <span>•</span>
            <div className="flex items-center gap-1 text-primary">
              <Star className="h-5 w-5 fill-primary" />
              <span className="font-semibold text-lg">{currentMovie.adminRating}/10</span>
            </div>
          </div>
          <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
            {currentMovie.description}
          </p>
          <div className="flex gap-3">
            <Link to={`/movie/${currentMovie.id}`}>
              <Button variant="gold" size="xl">
                Know More
              </Button>
            </Link>
            <Button variant="goldOutline" size="xl">
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/50 hover:bg-background/80 rounded-full transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/50 hover:bg-background/80 rounded-full transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-6 bg-primary' : 'bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
