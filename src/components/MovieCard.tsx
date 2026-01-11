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
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="movie-card group relative w-full aspect-[2/3] bg-card rounded-lg overflow-hidden">
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

        {/* Always visible overlay and content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
          <h3 className="font-display text-sm md:text-base font-bold text-foreground mb-1 line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-2">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.originalLanguage}</span>
          </div>
          <div className="flex items-center gap-1 text-primary mb-2">
            <Star className="h-3 w-3 md:h-4 md:w-4 fill-primary" />
            <span className="font-semibold text-sm md:text-base">{movie.adminRating}/10</span>
          </div>
          {showKnowMore && (
            <Button variant="gold" size="sm" className="w-full text-xs md:text-sm">
              Know More
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
