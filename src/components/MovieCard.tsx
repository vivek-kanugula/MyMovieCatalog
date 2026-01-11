import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/data/mockMovies';

interface MovieCardProps {
  movie: Movie;
  showKnowMore?: boolean;
}

const MovieCard = ({ movie, showKnowMore = true }: MovieCardProps) => {
  return (
    <div className="movie-card group relative w-full aspect-[2/3] bg-card">
      {/* Telugu Badge */}
      {movie.teluguAvailable && (
        <div className="telugu-badge z-10">
          తెలుగు
        </div>
      )}

      {/* Thumbnail */}
      <img
        src={movie.thumbnail}
        alt={movie.title}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="movie-card-overlay" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="font-display text-lg font-bold text-foreground mb-1 line-clamp-2">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.originalLanguage}</span>
        </div>
        <div className="flex items-center gap-1 text-primary mb-3">
          <Star className="h-4 w-4 fill-primary" />
          <span className="font-semibold">{movie.adminRating}/10</span>
        </div>
        {showKnowMore && (
          <Link to={`/movie/${movie.id}`}>
            <Button variant="gold" size="sm" className="w-full">
              Know More
            </Button>
          </Link>
        )}
      </div>

      {/* Always visible info on mobile */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent md:hidden">
        <h3 className="font-display text-sm font-bold text-foreground line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{movie.year}</span>
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span>{movie.adminRating}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
