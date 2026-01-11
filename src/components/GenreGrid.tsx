import { Link } from 'react-router-dom';
import { genres } from '@/data/mockMovies';

const GenreGrid = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
          Browse by <span className="gold-gradient-text">Genre</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/genre/${genre.id}`}
              className="group relative aspect-video rounded-lg overflow-hidden movie-card"
            >
              <img
                src={genre.thumbnail}
                alt={genre.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground text-center">
                  {genre.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenreGrid;
