import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Play, ArrowLeft, Users, Calendar, Globe, Tag } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getMovieById, genres } from '@/data/mockMovies';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const movie = getMovieById(movieId || '');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Movie not found</h1>
          <Link to="/">
            <Button variant="gold">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const movieGenres = movie.genre.map((g) => genres.find((genre) => genre.id === g)?.name || g);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 h-[500px]">
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
        </div>

        <div className="relative container mx-auto px-4 pt-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row gap-8 pt-8">
            {/* Poster */}
            <div className="shrink-0 w-64 mx-auto md:mx-0">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                {movie.teluguAvailable && (
                  <div className="telugu-badge z-10">తెలుగు</div>
                )}
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 pb-8">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-primary">
                  <Star className="h-6 w-6 fill-primary" />
                  <span className="text-2xl font-bold">{movie.imdbRating}</span>
                  <span className="text-muted-foreground">IMDB</span>
                </div>
                <div className="flex items-center gap-2 text-gold-glow">
                  <Star className="h-6 w-6 fill-gold-glow" />
                  <span className="text-2xl font-bold">{movie.adminRating}/10</span>
                  <span className="text-muted-foreground">Admin</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movieGenres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="text-sm">
                    {genre}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>{movie.originalLanguage}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span>{movie.genre.length} Genres</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{movie.cast.length} Cast</span>
                </div>
              </div>

              <p className="text-foreground text-lg leading-relaxed mb-8">
                {movie.description}
              </p>

              {/* Rate Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="gold" size="xl">
                    Rate This Movie
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl text-foreground">
                      Rate {movie.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Your Name</label>
                      <Input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Your Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setUserRating(star)}
                            className="p-1"
                          >
                            <Star
                              className={`h-8 w-8 transition-colors ${
                                star <= (hoverRating || userRating)
                                  ? 'fill-primary text-primary'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Comment</label>
                      <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="bg-secondary border-border"
                      />
                    </div>
                    <Button variant="gold" className="w-full">
                      Submit Rating
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Cast */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Cast</h2>
            <div className="flex flex-wrap gap-2">
              {movie.cast.map((actor) => (
                <Badge key={actor} variant="outline" className="text-foreground border-border">
                  {actor}
                </Badge>
              ))}
            </div>
          </div>

          {/* Available Languages */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Available Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {movie.availableLanguages.map((lang) => (
                <Badge
                  key={lang}
                  variant={lang === 'Telugu' ? 'default' : 'secondary'}
                  className={lang === 'Telugu' ? 'bg-success' : ''}
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Where to Watch */}
          <div className="bg-card rounded-lg p-6 border border-border md:col-span-2">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Where to Watch
            </h2>
            <div className="flex flex-wrap gap-3">
              {movie.whereToWatch.otts.map((ott) => (
                <Button key={ott} variant="goldOutline" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  {ott}
                </Button>
              ))}
              {movie.whereToWatch.other.map((source) => (
                <Button key={source} variant="cinema" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  {source}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Ratings */}
      <section className="container mx-auto px-4 py-12 border-t border-border">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          User <span className="gold-gradient-text">Reviews</span>
        </h2>
        <div className="space-y-4">
          {movie.userRatings
            .sort((a, b) => b.stars - a.stars)
            .map((rating, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 border border-border animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground">{rating.user}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= rating.stars
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{rating.comment}</p>
              </div>
            ))}
        </div>
      </section>

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

export default MovieDetailPage;
