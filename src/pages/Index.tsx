import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import GenreGrid from '@/components/GenreGrid';
import MovieScrollSection from '@/components/MovieScrollSection';
import { getRandomMovies, type Movie } from '@/data/mockMovies';

const Index = () => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setFeaturedMovies(getRandomMovies(8));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroCarousel />
        <MovieScrollSection
          title="Trending"
          highlight="Now"
          movies={featuredMovies}
        />
        <GenreGrid />
      </main>
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-display text-lg">
            <span className="gold-gradient-text">MyMovieCatalog</span> © 2024
          </p>
          <p className="text-sm mt-2">Your ultimate movie discovery platform</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
