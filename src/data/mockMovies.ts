export interface Movie {
  id: string;
  title: string;
  year: number;
  originalLanguage: string;
  availableLanguages: string[];
  teluguAvailable: boolean;
  genre: string[];
  imdbRating: number;
  adminRating: number;
  description: string;
  thumbnail: string;
  cast: string[];
  whereToWatch: {
    otts: string[];
    other: string[];
  };
  userRatings: {
    user: string;
    stars: number;
    comment: string;
  }[];
}

export const genres = [
  { id: 'action', name: 'Action', thumbnail: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80' },
  { id: 'fantasy', name: 'Fantasy', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80' },
  { id: 'thriller', name: 'Thriller', thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80' },
  { id: 'comedy', name: 'Comedy', thumbnail: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&q=80' },
  { id: 'rom-com', name: 'Rom-Com', thumbnail: 'https://images.unsplash.com/photo-1522098543979-ffc7f79a56c4?w=400&q=80' },
  { id: 'drama', name: 'Drama', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80' },
  { id: 'horror', name: 'Horror', thumbnail: 'https://images.unsplash.com/photo-1509248961725-aec71e3f015f?w=400&q=80' },
  { id: 'sci-fi', name: 'Sci-Fi', thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80' },
];

export const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Malayalam', 'Korean', 'Japanese'];

export const movies: Movie[] = [
  {
    id: '1',
    title: 'RRR',
    year: 2022,
    originalLanguage: 'Telugu',
    availableLanguages: ['Telugu', 'Hindi', 'Tamil', 'Malayalam', 'English'],
    teluguAvailable: true,
    genre: ['action', 'drama'],
    imdbRating: 7.8,
    adminRating: 9,
    description: 'A fictional tale of two legendary Indian revolutionaries and their journey away from home before they started fighting for their country.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80',
    cast: ['N.T. Rama Rao Jr.', 'Ram Charan', 'Ajay Devgn', 'Alia Bhatt'],
    whereToWatch: { otts: ['Netflix', 'Zee5'], other: ['MovieRulz'] },
    userRatings: [
      { user: 'MovieBuff123', stars: 5, comment: 'Incredible action sequences!' },
      { user: 'CinemaLover', stars: 4, comment: 'Great visual storytelling' },
    ],
  },
  {
    id: '2',
    title: 'Inception',
    year: 2010,
    originalLanguage: 'English',
    availableLanguages: ['English', 'Hindi', 'Telugu'],
    teluguAvailable: true,
    genre: ['sci-fi', 'thriller', 'action'],
    imdbRating: 8.8,
    adminRating: 10,
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page', 'Tom Hardy'],
    whereToWatch: { otts: ['Prime Video', 'Netflix'], other: ['MovieRulz'] },
    userRatings: [
      { user: 'DreamWalker', stars: 5, comment: 'Mind-bending masterpiece!' },
      { user: 'SciFiFan', stars: 5, comment: 'Nolan at his best' },
    ],
  },
  {
    id: '3',
    title: 'Baahubali: The Beginning',
    year: 2015,
    originalLanguage: 'Telugu',
    availableLanguages: ['Telugu', 'Hindi', 'Tamil', 'Malayalam'],
    teluguAvailable: true,
    genre: ['action', 'fantasy', 'drama'],
    imdbRating: 8.0,
    adminRating: 9,
    description: 'In ancient India, an adventurous and daring man becomes involved in a decades-old feud between two warring peoples.',
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80',
    cast: ['Prabhas', 'Rana Daggubati', 'Anushka Shetty', 'Tamannaah'],
    whereToWatch: { otts: ['Hotstar', 'Netflix'], other: ['MovieRulz'] },
    userRatings: [
      { user: 'EpicFanatic', stars: 5, comment: 'Visual spectacle!' },
    ],
  },
  {
    id: '4',
    title: 'Parasite',
    year: 2019,
    originalLanguage: 'Korean',
    availableLanguages: ['Korean', 'English'],
    teluguAvailable: false,
    genre: ['thriller', 'drama', 'comedy'],
    imdbRating: 8.5,
    adminRating: 10,
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik'],
    whereToWatch: { otts: ['Prime Video'], other: [] },
    userRatings: [
      { user: 'OscarWatcher', stars: 5, comment: 'Deserved every award!' },
      { user: 'ThrillerLover', stars: 5, comment: 'Brilliant social commentary' },
    ],
  },
  {
    id: '5',
    title: 'The Dark Knight',
    year: 2008,
    originalLanguage: 'English',
    availableLanguages: ['English', 'Hindi', 'Telugu', 'Tamil'],
    teluguAvailable: true,
    genre: ['action', 'thriller', 'drama'],
    imdbRating: 9.0,
    adminRating: 10,
    description: 'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept his responsibility to fight injustice.',
    thumbnail: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
    whereToWatch: { otts: ['Netflix', 'Prime Video'], other: ['MovieRulz'] },
    userRatings: [
      { user: 'BatFan', stars: 5, comment: 'Heath Ledger was phenomenal!' },
    ],
  },
  {
    id: '6',
    title: 'Pushpa: The Rise',
    year: 2021,
    originalLanguage: 'Telugu',
    availableLanguages: ['Telugu', 'Hindi', 'Tamil', 'Malayalam'],
    teluguAvailable: true,
    genre: ['action', 'thriller'],
    imdbRating: 7.6,
    adminRating: 8,
    description: 'A laborer rises in the ranks of a red sandalwood smuggling syndicate, and his notoriety grows.',
    thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80',
    cast: ['Allu Arjun', 'Fahadh Faasil', 'Rashmika Mandanna'],
    whereToWatch: { otts: ['Prime Video'], other: ['MovieRulz'] },
    userRatings: [
      { user: 'ActionJunkie', stars: 4, comment: 'Allu Arjun steals the show!' },
    ],
  },
  {
    id: '7',
    title: 'Your Name',
    year: 2016,
    originalLanguage: 'Japanese',
    availableLanguages: ['Japanese', 'English'],
    teluguAvailable: false,
    genre: ['fantasy', 'rom-com', 'drama'],
    imdbRating: 8.4,
    adminRating: 9,
    description: 'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing keeping them apart?',
    thumbnail: 'https://images.unsplash.com/photo-1522098543979-ffc7f79a56c4?w=400&q=80',
    cast: ['Ryunosuke Kamiki', 'Mone Kamishiraishi'],
    whereToWatch: { otts: ['Netflix', 'Prime Video'], other: [] },
    userRatings: [
      { user: 'AnimeLover', stars: 5, comment: 'Breathtakingly beautiful!' },
    ],
  },
  {
    id: '8',
    title: 'Jersey',
    year: 2022,
    originalLanguage: 'Telugu',
    availableLanguages: ['Telugu', 'Hindi'],
    teluguAvailable: true,
    genre: ['drama', 'rom-com'],
    imdbRating: 8.0,
    adminRating: 8,
    description: 'A failed cricketer decides to return to cricket in his late 30s for his son who dreams of a jersey.',
    thumbnail: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&q=80',
    cast: ['Nani', 'Shraddha Srinath'],
    whereToWatch: { otts: ['Netflix'], other: ['MovieRulz'] },
    userRatings: [
      { user: 'CricketFan', stars: 5, comment: 'Emotional and inspiring!' },
    ],
  },
  {
    id: '9',
    title: 'Get Out',
    year: 2017,
    originalLanguage: 'English',
    availableLanguages: ['English', 'Hindi'],
    teluguAvailable: false,
    genre: ['horror', 'thriller'],
    imdbRating: 7.7,
    adminRating: 9,
    description: 'A young African-American visits his white girlfriends parents for the weekend, where his simmering uneasiness leads to a horrifying discovery.',
    thumbnail: 'https://images.unsplash.com/photo-1509248961725-aec71e3f015f?w=400&q=80',
    cast: ['Daniel Kaluuya', 'Allison Williams', 'Bradley Whitford'],
    whereToWatch: { otts: ['Netflix', 'Prime Video'], other: [] },
    userRatings: [
      { user: 'HorrorFan', stars: 5, comment: 'Genius social horror!' },
    ],
  },
  {
    id: '10',
    title: 'Interstellar',
    year: 2014,
    originalLanguage: 'English',
    availableLanguages: ['English', 'Hindi', 'Telugu', 'Tamil'],
    teluguAvailable: true,
    genre: ['sci-fi', 'drama'],
    imdbRating: 8.6,
    adminRating: 10,
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival.',
    thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    whereToWatch: { otts: ['Prime Video', 'Paramount+'], other: ['MovieRulz'] },
    userRatings: [
      { user: 'SpaceLover', stars: 5, comment: 'Emotional and epic!' },
    ],
  },
  {
    id: '11',
    title: 'Hangover',
    year: 2009,
    originalLanguage: 'English',
    availableLanguages: ['English', 'Hindi'],
    teluguAvailable: false,
    genre: ['comedy'],
    imdbRating: 7.7,
    adminRating: 8,
    description: 'Three buddies wake up after a bachelor party in Las Vegas with no memory of the previous night and the bachelor missing.',
    thumbnail: 'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=400&q=80',
    cast: ['Bradley Cooper', 'Ed Helms', 'Zach Galifianakis'],
    whereToWatch: { otts: ['Netflix', 'Prime Video'], other: [] },
    userRatings: [
      { user: 'ComedyKing', stars: 4, comment: 'Hilarious!' },
    ],
  },
  {
    id: '12',
    title: 'Ala Vaikunthapurramuloo',
    year: 2020,
    originalLanguage: 'Telugu',
    availableLanguages: ['Telugu', 'Hindi', 'Tamil'],
    teluguAvailable: true,
    genre: ['action', 'comedy', 'drama'],
    imdbRating: 7.3,
    adminRating: 8,
    description: 'A young man raised by his fathers driver discovers he was switched at birth and sets out to find his real family.',
    thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80',
    cast: ['Allu Arjun', 'Pooja Hegde', 'Tabu'],
    whereToWatch: { otts: ['Netflix'], other: ['MovieRulz'] },
    userRatings: [
      { user: 'MassFan', stars: 5, comment: 'Butta Bomma!' },
    ],
  },
];

export const getMoviesByGenre = (genreId: string) => {
  return movies.filter(movie => movie.genre.includes(genreId));
};

export const getMovieById = (id: string) => {
  return movies.find(movie => movie.id === id);
};

export const getRandomMovies = (count: number) => {
  const shuffled = [...movies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const searchMovies = (query: string, filters?: { language?: string; genre?: string }) => {
  return movies.filter(movie => {
    const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase());
    const matchesLanguage = !filters?.language || movie.availableLanguages.includes(filters.language);
    const matchesGenre = !filters?.genre || movie.genre.includes(filters.genre);
    return matchesQuery && matchesLanguage && matchesGenre;
  });
};
