import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import type { Movie } from '@/data/mockMovies';

interface MovieScrollSectionProps {
  title: string;
  movies: Movie[];
  highlight?: string;
}

const MovieScrollSection = ({ title, movies, highlight }: MovieScrollSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
          {title}{' '}
          {highlight && <span className="gold-gradient-text">{highlight}</span>}
        </h2>
        <div className="relative group">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 hover:bg-background rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4"
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 hover:bg-background rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-x-4"
          >
            <ChevronRight className="h-6 w-6 text-foreground" />
          </button>

          {/* Movies Scroll */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          >
            {movies.map((movie) => (
              <div key={movie.id} className="shrink-0 w-40 md:w-48">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieScrollSection;
