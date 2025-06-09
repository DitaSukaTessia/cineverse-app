import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Home,
  Film,
  Star,
  Calendar,
  Tv,
  List,
  Users,
  Newspaper,
  Info,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  UserCircle,
  Filter,
  ThumbsUp,
  MessageSquare,
  Clock,
  Eye,
  Heart,
  Edit3,
  Trash2,
  PlayCircle,
  ExternalLink,
  Moon,
  Sun,
} from "lucide-react";

// placeholder for TMDB API key - replace with your actual key
const TMDB_API_KEY = "830b11abf7053cf39d25c9cd2402654b"; // IMPORTANT: Replace this with your actual TMDB API key
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

// mock data (replace with API calls)
const mockMovies = [
  {
    id: 1,
    title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    vote_average: 8.8,
    release_date: "2010-07-16",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" },
    ],
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    vote_average: 9.0,
    release_date: "2008-07-18",
    overview:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genres: [
      { id: 18, name: "Drama" },
      { id: 28, name: "Action" },
      { id: 80, name: "Crime" },
    ],
  },
  {
    id: 3,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    vote_average: 8.6,
    release_date: "2014-11-05",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genres: [
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
      { id: 878, name: "Science Fiction" },
    ],
  },
  {
    id: 4,
    title: "Parasite",
    poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    vote_average: 8.5,
    release_date: "2019-05-30",
    overview:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    genres: [
      { id: 35, name: "Comedy" },
      { id: 53, name: "Thriller" },
      { id: 18, name: "Drama" },
    ],
  },
  {
    id: 5,
    title: "Avengers: Endgame",
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    vote_average: 8.3,
    release_date: "2019-04-26",
    overview:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    genres: [
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" },
      { id: 28, name: "Action" },
    ],
  },
  {
    id: 6,
    title: "Joker",
    poster_path: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    vote_average: 8.2,
    release_date: "2019-10-02",
    overview:
      "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
    genres: [
      { id: 80, name: "Crime" },
      { id: 53, name: "Thriller" },
      { id: 18, name: "Drama" },
    ],
  },
];

const mockGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const mockReviews = [
  {
    id: 1,
    movieId: 1,
    user: "CinemaFan101",
    avatar: "https://placehold.co/50x50/7B68EE/FFFFFF?text=CF",
    rating: 9,
    text: "Inception is a mind-bending masterpiece! Nolan at his best.",
    likes: 150,
    comments: 12,
    date: "2024-05-20",
  },
  {
    id: 2,
    movieId: 2,
    user: "MovieBuffKate",
    avatar: "https://placehold.co/50x50/FF69B4/FFFFFF?text=MK",
    rating: 10,
    text: "The Dark Knight redefined superhero movies. Heath Ledger's Joker is iconic.",
    likes: 250,
    comments: 30,
    date: "2024-05-18",
  },
  {
    id: 3,
    movieId: 3,
    user: "SciFiGeek",
    avatar: "https://placehold.co/50x50/1DE9B6/FFFFFF?text=SG",
    rating: 8,
    text: "Interstellar is visually stunning and emotionally resonant, though a bit complex.",
    likes: 120,
    comments: 5,
    date: "2024-05-22",
  },
];

const mockNewsArticles = [
  {
    id: 1,
    title: 'Upcoming Sci-Fi Blockbuster "Nova" Teaser Released',
    date: "2024-05-24",
    category: "Trailers",
    image: "https://placehold.co/600x400/282828/EAEAEA?text=Nova+Teaser",
    excerpt:
      'The first glimpse of the highly anticipated sci-fi epic "Nova" has arrived, promising breathtaking visuals and a compelling story...',
    content: "Full article content for Nova Teaser...",
  },
  {
    id: 2,
    title: "Interview with Director Jane Doe on Her New Indie Film",
    date: "2024-05-22",
    category: "Actor Updates",
    image: "https://placehold.co/600x400/282828/EAEAEA?text=Jane+Doe+Interview",
    excerpt:
      'We sat down with acclaimed director Jane Doe to discuss her latest indie darling, "Whispers in the Wind," and her unique approach to filmmaking...',
    content: "Full article content for Jane Doe interview...",
  },
  {
    id: 3,
    title: 'Rumors Swirl Around "Legacy Heroes" Sequel Casting',
    date: "2024-05-20",
    category: "Movie News",
    image:
      "https://placehold.co/600x400/282828/EAEAEA?text=Legacy+Heroes+Casting",
    excerpt:
      'Sources close to the production of "Legacy Heroes 2" suggest that several major stars are in talks to join the ensemble cast...',
    content: "Full article content for Legacy Heroes casting rumors...",
  },
];

const iconicQuotes = [
  "Frankly, my dear, I don't give a damn. - Gone With The Wind",
  "Here's looking at you, kid. - Casablanca",
  "May the Force be with you. - Star Wars",
  "I'll be back. - The Terminator",
  "You can't handle the truth! - A Few Good Men",
];

// Helper function for API calls (you'll need to implement error handling and loading states)
const fetchFromTMDB = async (endpoint, params = {}) => {
  if (TMDB_API_KEY === "YOUR_TMDB_API_KEY") {
    console.warn(
      "TMDB API Key is not set. Using mock data. Please replace 'YOUR_TMDB_API_KEY' in the code."
    );
    // Simulate API delay and return mock data based on endpoint
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (endpoint.includes("/movie/popular"))
      return { results: mockMovies.slice(0, 5), page: 1, total_pages: 1 }; // Added page and total_pages for consistency
    if (endpoint.includes("/movie/top_rated"))
      return {
        results: mockMovies.sort((a, b) => b.vote_average - a.vote_average),
        page: 1,
        total_pages: 1,
      };
    if (endpoint.includes("/movie/now_playing"))
      return {
        results: mockMovies
          .filter((m) => new Date(m.release_date) < new Date())
          .slice(0, 4),
        page: 1,
        total_pages: 1,
      };
    if (endpoint.includes("/movie/upcoming"))
      return {
        results: mockMovies
          .filter((m) => new Date(m.release_date) > new Date())
          .slice(0, 4),
        page: 1,
        total_pages: 1,
      };
    if (endpoint.includes("/genre/movie/list")) return { genres: mockGenres };
    if (endpoint.startsWith("/movie/")) {
      // For specific movie
      const movieId = parseInt(endpoint.split("/")[2]);
      const movie = mockMovies.find((m) => m.id === movieId);
      // Simulate the structure TMDB API returns for a single movie with append_to_response
      if (movie)
        return {
          ...movie,
          credits: {
            cast: mockMovies.slice(0, 5).map((m, i) => ({
              cast_id: m.id,
              id: m.id,
              name: `Actor ${i + 1}`,
              character: `Character ${i + 1}`,
              profile_path: m.poster_path,
            })),
          },
          videos: {
            results: [{ type: "Trailer", site: "YouTube", key: "dQw4w9WgXcQ" }],
          },
          recommendations: { results: mockMovies.slice(1, 4) },
        };
      return null;
    }
    if (endpoint.startsWith("/search/movie")) {
      const query = params.query.toLowerCase();
      return {
        results: mockMovies.filter((m) =>
          m.title.toLowerCase().includes(query)
        ),
        page: 1,
        total_pages: 1,
      };
    }
    return { results: [], page: 1, total_pages: 1 }; // Default mock response with page info
  }

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", TMDB_API_KEY);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        "API request failed:",
        response.status,
        await response.text()
      );
      return null; // Or throw an error
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching from TMDB:", error);
    return null; // Or throw an error
  }
};

// --- UI Components ---

const MovieCard = ({ movie, onClick, size = "normal" }) => {
  const cardSizeClasses = {
    small: "w-32 md:w-40",
    normal: "w-48 md:w-64",
    large: "w-64 md:w-80",
  };
  const textSizeClasses = {
    small: "text-xs md:text-sm",
    normal: "text-sm md:text-base",
    large: "text-base md:text-lg",
  };

  return (
    <div
      className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer group ${cardSizeClasses[size]}`}
      onClick={() => onClick(movie)}>
      <img
        src={
          movie.poster_path
            ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
            : "https://placehold.co/500x750/282828/EAEAEA?text=No+Image"
        }
        alt={movie.title}
        className="w-full h-auto object-cover aspect-[2/3]" // Added aspect ratio
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/500x750/282828/EAEAEA?text=Image+Error";
        }}
      />
      <div className="p-3 md:p-4">
        <h3
          className={`font-semibold truncate group-hover:text-teal-400 ${textSizeClasses[size]}`}>
          {movie.title}
        </h3>
        <div
          className={`flex justify-between items-center mt-1 ${
            textSizeClasses[size] === "text-xs md:text-sm"
              ? "text-xs"
              : "text-sm"
          } text-gray-400`}>
          <span>
            {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
          </span>
          <span className="flex items-center">
            <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 mr-1" />{" "}
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

const Header = ({ setCurrentPage, onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setCurrentPage("Explore"); // Navigate to explore page on search
      setIsMobileMenuOpen(false); // Close mobile menu on search
    }
  };

  const navItems = [
    { name: "Home", icon: <Home className="w-4 h-4 mr-2" />, page: "Home" },
    {
      name: "Explore",
      icon: <Search className="w-4 h-4 mr-2" />,
      page: "Explore",
    },
    {
      name: "Top Rated",
      icon: <Star className="w-4 h-4 mr-2" />,
      page: "Top Rated",
    },
    {
      name: "Now Playing",
      icon: <Film className="w-4 h-4 mr-2" />,
      page: "Now Playing",
    },
    {
      name: "Upcoming",
      icon: <Calendar className="w-4 h-4 mr-2" />,
      page: "Upcoming",
    },
    { name: "Genres", icon: <Tv className="w-4 h-4 mr-2" />, page: "Genres" },
    {
      name: "Reviews",
      icon: <Users className="w-4 h-4 mr-2" />,
      page: "Reviews",
    },
    {
      name: "News",
      icon: <Newspaper className="w-4 h-4 mr-2" />,
      page: "News",
    },
  ];

  return (
    <header className="bg-gray-900 text-gray-200 sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div
          className="text-2xl md:text-3xl font-bold cursor-pointer flex items-center group"
          onClick={() => setCurrentPage("Home")}>
          <PlayCircle className="w-8 h-8 mr-2 text-teal-400 group-hover:animate-spin-slow" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            CineVerse
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-3 xl:space-x-4 items-center">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentPage(item.page)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-teal-400 transition-colors flex items-center">
              {item.icon} {item.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center bg-gray-800 rounded-full px-3 py-1.5 group focus-within:ring-2 focus-within:ring-teal-500">
            <input
              type="search"
              placeholder="Search movies..."
              className="bg-transparent text-sm text-gray-300 focus:outline-none w-32 lg:w-48 transition-all duration-300 focus:w-40 lg:focus:w-60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="text-gray-400 group-hover:text-teal-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <button
            onClick={() => setCurrentPage("My List")}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            title="My List / Profile">
            <UserCircle className="w-6 h-6 text-gray-400 hover:text-teal-400" />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 absolute w-full shadow-lg">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-gray-700 rounded-md px-3 py-2 mb-2">
              <input
                type="search"
                placeholder="Search movies..."
                className="bg-transparent text-sm text-gray-300 focus:outline-none w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="text-gray-400 hover:text-teal-400 ml-2">
                <Search className="w-5 h-5" />
              </button>
            </form>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setCurrentPage(item.page);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-teal-400 transition-colors flex items-center">
                {item.icon} {item.name}
              </button>
            ))}
            <button
              onClick={() => {
                setCurrentPage("About");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-teal-400 transition-colors flex items-center">
              <Info className="w-4 h-4 mr-2" /> About
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h5 className="text-lg font-semibold text-gray-200 mb-3">
              CineVerse
            </h5>
            <p className="text-sm">
              Your ultimate destination for movie reviews, recommendations, and
              cinematic news.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-gray-200 mb-3">
              Quick Links
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setCurrentPage("Home")}
                  className="hover:text-teal-400">
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("Explore")}
                  className="hover:text-teal-400">
                  Explore Movies
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("News")}
                  className="hover:text-teal-400">
                  Movie News
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("About")}
                  className="hover:text-teal-400">
                  About Us
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-gray-200 mb-3">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="hover:text-teal-400">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="hover:text-teal-400">Privacy Policy</button>
              </li>
              <li>
                <p className="text-xs">Movie data provided by TMDB.</p>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} TachiMitsu & CineVerse.io. All rights
          reserved.
        </p>
        <p className="text-xs mt-1">
          Designed with a futuristic touch for true cinephiles.
        </p>
      </div>
    </footer>
  );
};

const Carousel = ({ movies, onMovieClick, title }) => {
  if (!movies || movies.length === 0)
    return (
      <p className="text-center text-gray-500">
        {title}: No movies to display.
      </p>
    );

  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-100 px-4">
        {title}
      </h2>
      <div className="relative">
        <div className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 px-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0">
              <MovieCard movie={movie} onClick={onMovieClick} size="normal" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HeroBanner = ({ movie, onMovieClick }) => {
  if (!movie) return null;
  return (
    <div
      className="relative h-[60vh] md:h-[75vh] bg-cover bg-center mb-12 group"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(18,18,18,0.2) 0%, rgba(18,18,18,0.9) 80%, rgba(18,18,18,1) 100%), url(${
          movie.backdrop_path
            ? TMDB_BACKDROP_BASE_URL + movie.backdrop_path
            : "https://placehold.co/1280x720/121212/EAEAEA?text=Background+isi+sendiri"
        })`,
      }}>
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg transition-all duration-300 group-hover:text-teal-300">
          {movie.title}
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-4 md:mb-6 max-w-xl xl:max-w-2xl line-clamp-2 md:line-clamp-3 drop-shadow-md">
          {movie.overview}
        </p>
        <div className="flex space-x-3 md:space-x-4">
          <button
            onClick={() => onMovieClick(movie)}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base transition-colors flex items-center">
            <Info className="w-4 h-4 md:w-5 md:h-5 mr-2" /> View Details
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base transition-colors flex items-center">
            <PlayCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Page Components ---

const HomePage = ({ onMovieClick, setCurrentPage }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomePageData = async () => {
      setLoading(true);
      const popular = await fetchFromTMDB("/movie/popular", { page: 1 });
      const topRated = await fetchFromTMDB("/movie/top_rated", { page: 1 });
      const nowPlaying = await fetchFromTMDB("/movie/now_playing", { page: 1 });

      if (popular && popular.results) setPopularMovies(popular.results); // Check for results
      if (topRated && topRated.results) setTopRatedMovies(topRated.results);
      if (nowPlaying && nowPlaying.results)
        setNowPlayingMovies(nowPlaying.results);
      setLoading(false);
    };
    fetchHomePageData();
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex(
        (prevIndex) => (prevIndex + 1) % iconicQuotes.length
      );
    }, 7000); // Change quote every 7 seconds
    return () => clearInterval(quoteInterval);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="animate-fadeIn">
      <HeroBanner movie={popularMovies[0]} onMovieClick={onMovieClick} />

      <div className="container mx-auto px-4">
        <Carousel
          movies={popularMovies.slice(1, 11)}
          onMovieClick={onMovieClick}
          title="Popular Movies"
        />
        <Carousel
          movies={topRatedMovies.slice(0, 10)}
          onMovieClick={onMovieClick}
          title="Top Rated Gems"
        />
        <Carousel
          movies={nowPlayingMovies.slice(0, 10)}
          onMovieClick={onMovieClick}
          title="Now Playing in Theaters"
        />

        {/* Iconic Movie Quotes Section */}
        <section className="my-12 py-10 bg-gray-800 rounded-lg shadow-xl">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-100 mb-6">
              Iconic Movie Quotes
            </h2>
            <div className="min-h-[60px] flex items-center justify-center">
              {" "}
              {/* Fixed height for quote area */}
              <p className="text-lg md:text-xl text-teal-300 italic transition-opacity duration-1000">
                "{iconicQuotes[currentQuoteIndex]}"
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const MovieGridPage = ({
  title,
  fetchEndpoint,
  onMovieClick,
  initialFilters = {},
}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState(initialFilters);

  const loadMovies = useCallback(
    async (pageNum, currentFilters) => {
      setLoading(true);
      const params = { page: pageNum, ...currentFilters };
      const data =
        typeof fetchEndpoint === "function"
          ? await fetchEndpoint(params)
          : await fetchFromTMDB(fetchEndpoint, params);

      if (data && data.results) {
        setMovies((prev) =>
          pageNum === 1 ? data.results : [...prev, ...data.results]
        );
        setHasMore(data.page < data.total_pages);
      } else {
        setHasMore(false);
        if (pageNum === 1) setMovies([]); // Clear movies if first page fails or has no results
      }
      setLoading(false);
    },
    [fetchEndpoint]
  );

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true); // Assume there's more when filters/endpoint change
    loadMovies(1, filters);
  }, [fetchEndpoint, filters, loadMovies]); // Added loadMovies

  const loadMoreMovies = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMovies(nextPage, filters);
    }
  };

  // Update filters when initialFilters prop changes (e.g., navigating from Genres)
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-8">
        {title}
      </h1>

      {(title === "Explore Movies" ||
        title.startsWith("Search Results for") ||
        (initialFilters.with_genres && title.endsWith("Movies"))) && (
        <FilterSection currentFilters={filters} onFilterChange={setFilters} />
      )}

      {movies.length === 0 && !loading && (
        <p className="text-center text-gray-500 text-xl">
          No movies found matching your criteria.
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
            size="normal"
          />
        ))}
      </div>

      {loading && page === 1 && <PageLoader />}
      {loading && page > 1 && (
        <div className="text-center py-8">
          <Spinner />
        </div>
      )}

      {!loading && hasMore && movies.length > 0 && (
        <div className="text-center mt-12">
          <button
            onClick={loadMoreMovies}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

const FilterSection = ({ currentFilters, onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(
    currentFilters.with_genres || ""
  );
  const [releaseYear, setReleaseYear] = useState(
    currentFilters.primary_release_year || ""
  );
  const [minRating, setMinRating] = useState(
    currentFilters["vote_average.gte"] || ""
  );

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await fetchFromTMDB("/genre/movie/list");
      if (data && data.genres) setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  // Effect to update local state when currentFilters prop changes
  useEffect(() => {
    setSelectedGenre(currentFilters.with_genres || "");
    setReleaseYear(currentFilters.primary_release_year || "");
    setMinRating(currentFilters["vote_average.gte"] || "");
  }, [currentFilters]);

  const handleApplyFilters = () => {
    const newFilters = {};
    if (selectedGenre) newFilters.with_genres = selectedGenre;
    if (releaseYear) newFilters.primary_release_year = releaseYear;
    if (minRating) newFilters["vote_average.gte"] = parseFloat(minRating); // Ensure number
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    setSelectedGenre("");
    setReleaseYear("");
    setMinRating("");
    onFilterChange({});
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 70 }, (_, i) => currentYear - i);

  return (
    <div className="bg-gray-800 p-4 md:p-6 rounded-lg mb-8 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-end">
        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-300 mb-1">
            Genre
          </label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2 text-sm">
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="releaseYear"
            className="block text-sm font-medium text-gray-300 mb-1">
            Release Year
          </label>
          <select
            id="releaseYear"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2 text-sm">
            <option value="">Any Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="minRating"
            className="block text-sm font-medium text-gray-300 mb-1">
            Min. Rating (0-10)
          </label>
          <input
            type="number"
            id="minRating"
            min="0"
            max="10"
            step="0.1"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2 text-sm"
            placeholder="e.g., 7.5"
          />
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 pt-2 md:pt-0 lg:items-end lg:justify-self-end">
          <button
            onClick={handleApplyFilters}
            className="w-full sm:w-auto md:w-full lg:w-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2.5 rounded-md text-sm transition-colors flex items-center justify-center">
            <Filter className="w-4 h-4 mr-2" /> Apply
          </button>
          <button
            onClick={handleResetFilters}
            className="w-full sm:w-auto md:w-full lg:w-auto bg-gray-600 hover:bg-gray-500 text-white font-semibold px-4 py-2.5 rounded-md text-sm transition-colors flex items-center justify-center">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const GenresPage = ({ onGenreClick, setCurrentPage }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      const data = await fetchFromTMDB("/genre/movie/list");
      if (data && data.genres) setGenres(data.genres);
      setLoading(false);
    };
    fetchGenres();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-8">
        Movie Genres
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreClick(genre)}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-teal-700 hover:shadow-teal-500/30 transition-all duration-300 transform hover:scale-105 text-center">
            <h2 className="text-lg md:text-xl font-semibold text-gray-100">
              {genre.name}
            </h2>
          </button>
        ))}
      </div>
    </div>
  );
};

const ReviewsPage = ({ onMovieClick }) => {
  // In a real app, these would be fetched from a backend
  const reviews = mockReviews;

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-8">
        Community Reviews
      </h1>
      {reviews.length === 0 && (
        <p className="text-gray-400">No reviews yet. Be the first!</p>
      )}
      <div className="space-y-6">
        {reviews.map((review) => {
          const movie = mockMovies.find((m) => m.id === review.movieId); // Find movie for context
          return (
            <div
              key={review.id}
              className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <img
                  src={review.avatar}
                  alt={review.user}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
                    <span className="font-semibold text-teal-400 text-sm md:text-base">
                      {review.user}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  {movie && (
                    <div className="mb-2">
                      <span className="text-xs text-gray-400">Reviewed: </span>
                      <button
                        onClick={() => onMovieClick(movie)}
                        className="text-sm font-medium text-gray-200 hover:text-teal-300 hover:underline">
                        {movie.title}
                      </button>
                    </div>
                  )}
                  <div className="flex items-center mb-2">
                    {[...Array(10)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 md:w-5 md:h-5 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-300">
                      ({review.rating}/10)
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {review.text}
                  </p>
                  <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                    <button className="flex items-center hover:text-teal-400">
                      <ThumbsUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />{" "}
                      {review.likes} Likes
                    </button>
                    <button className="flex items-center hover:text-teal-400">
                      <MessageSquare className="w-3 h-3 md:w-4 md:h-4 mr-1" />{" "}
                      {review.comments} Comments
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const NewsPage = ({ onArticleClick }) => {
  const articles = mockNewsArticles; // Use mock data

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-8">
        Movie News & Articles
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer group transform hover:scale-105 transition-transform duration-300"
            onClick={() => onArticleClick(article)}>
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/282828/EAEAEA?text=Image+Error";
              }}
            />
            <div className="p-4 md:p-6">
              <span className="text-xs font-semibold text-teal-400 uppercase">
                {article.category}
              </span>
              <h2 className="text-lg md:text-xl font-semibold text-gray-100 mt-1 mb-2 group-hover:text-teal-300 truncate">
                {article.title}
              </h2>
              <p className="text-sm text-gray-400 mb-3 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="text-xs text-gray-500 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />{" "}
                {new Date(article.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ArticleDetailPage = ({ article, setCurrentPage }) => {
  if (!article)
    return (
      <div className="container mx-auto px-4 py-8 text-center text-xl text-gray-400">
        Article not found.{" "}
        <button
          onClick={() => setCurrentPage("News")}
          className="text-teal-400 hover:underline">
          Go to News
        </button>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-fadeIn">
      <button
        onClick={() => setCurrentPage("News")}
        className="mb-6 text-teal-400 hover:text-teal-300 flex items-center text-sm">
        ← Back to News
      </button>
      <span className="text-sm font-semibold text-teal-500 uppercase">
        {article.category}
      </span>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mt-2 mb-3">
        {article.title}
      </h1>
      <div className="text-xs text-gray-500 mb-6 flex items-center">
        <Calendar className="w-4 h-4 mr-1.5" /> Published on{" "}
        {new Date(article.date).toLocaleDateString()}
      </div>
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/800x500/282828/EAEAEA?text=Image+Error";
        }}
      />
      <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
        {/* In a real app, this would be HTML content or parsed Markdown */}
        <p>{article.content || article.excerpt}</p>
        {/* Add more paragraphs or structured content here if available */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
      {/* Placeholder for comments section */}
      <div className="mt-12 pt-8 border-t border-gray-700">
        <h3 className="text-2xl font-semibold text-gray-100 mb-4">Comments</h3>
        <p className="text-gray-500">Comments are coming soon!</p>
      </div>
    </div>
  );
};

const MyListPage = () => {
  // This page would require user authentication and data from a backend
  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
        My List
      </h1>
      <p className="text-gray-400 mb-8">
        This is your personalized space. Log in to see your favorite movies,
        watchlist, and review history.
      </p>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <UserCircle className="w-24 h-24 text-teal-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-100 mb-2">
          Login Required
        </h2>
        <p className="text-gray-400 mb-6">
          Please log in or sign up to access your personalized lists and
          reviews.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Log In
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Sign Up
          </button>
        </div>
      </div>

      {/* Placeholder sections for logged-in state */}
      <div className="mt-12 opacity-50">
        <h3 className="text-xl font-semibold text-gray-300 mb-4">
          Watchlist (Example)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockMovies.slice(0, 3).map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => {}}
              size="small"
            />
          ))}
        </div>
        <h3 className="text-xl font-semibold text-gray-300 mt-8 mb-4">
          Favorites (Example)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockMovies.slice(3, 5).map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => {}}
              size="small"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-fadeIn">
      <h1 className="text-4xl font-bold text-gray-100 mb-6 text-center">
        About CineVerse.io
      </h1>
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl space-y-6 text-gray-300 leading-relaxed">
        <p className="text-lg">
          Welcome to{" "}
          <span className="font-semibold text-teal-400">CineVerse.io</span>,
          your ultimate digital haven for everything cinema! We are a passionate
          team of film enthusiasts dedicated to creating a modern, stylish, and
          comprehensive platform for movie lovers worldwide.
        </p>
        <p>
          Our mission is to provide a clean, futuristic, and user-friendly
          interface where you can discover new films, revisit old favorites,
          share your thoughts, and connect with a community of like-minded
          cinephiles. Whether you're looking for the latest blockbusters, hidden
          indie gems, or timeless classics, CineVerse.io aims to be your go-to
          source.
        </p>
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-3">
            Our Vision
          </h2>
          <p>
            Inspired by giants like IMDb and Letterboxd, we strive to blend
            extensive movie data with a vibrant community feel. We believe in
            the power of film to entertain, inspire, and provoke thought, and we
            want to foster a space where those experiences can be shared and
            celebrated.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 mb-3">
            The Team (Example)
          </h2>
          <p>
            CineVerse.io was brought to life by a small but dedicated team of
            developers and designers who share an insatiable love for movies. We
            pour our hearts into making this platform the best it can be.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
            <li>Alex Chen - Lead Developer & Architect</li>
            <li>Maria Rodriguez - UI/UX Designer</li>
            <li>Sam "The MovieOracle" Green - Content & Community Manager</li>
          </ul>
        </div>
        <p className="text-center pt-4 border-t border-gray-700">
          Thank you for being a part of the CineVerse. We're excited to have you
          on this cinematic journey!
        </p>
      </div>
    </div>
  );
};

const MovieDetailPage = ({
  movie,
  onBack,
  onRate,
  onAddToWatchlist,
  onAddToFavorites,
}) => {
  const [fullMovieData, setFullMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0); // 0-10
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (movie && movie.id) {
      const fetchMovieDetails = async () => {
        setLoading(true);
        const detailedData = await fetchFromTMDB(`/movie/${movie.id}`, {
          append_to_response: "credits,videos,recommendations",
        });
        setFullMovieData(detailedData || movie);
        setLoading(false);
      };
      fetchMovieDetails();
    } else {
      setLoading(false);
    }
  }, [movie]);

  if (loading) return <PageLoader />;
  if (!fullMovieData)
    return (
      <div className="container mx-auto px-4 py-8 text-center text-xl text-gray-400">
        Movie details not found.{" "}
        <button
          onClick={() => onBack()}
          className="text-teal-400 hover:underline">
          Go Back
        </button>
      </div>
    );

  const currentMovie = fullMovieData;
  const trailer = currentMovie.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  const handleRating = (rating) => {
    setUserRating(rating);
    // Call onRate if it's provided and is a function
    if (typeof onRate === "function") {
      onRate(currentMovie.id, rating);
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log(
      `Review for ${currentMovie.title}: ${userRating} stars, Text: ${reviewText}`
    );
    // API call to submit review
    setReviewText("");
    setUserRating(0);
    // Simple alert, replace with modal or notification system
    alert("Review submitted (mock)!");
  };

  return (
    <div className="animate-fadeIn">
      {/* Backdrop */}
      <div
        className="relative h-[40vh] md:h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(18,18,18,0) 0%, rgba(18,18,18,0.9) 80%, rgba(18,18,18,1) 100%), url(${
            currentMovie.backdrop_path
              ? TMDB_BACKDROP_BASE_URL + currentMovie.backdrop_path
              : "https://placehold.co/1280x720/121212/EAEAEA?text=Woi+Monyet+keren+ga?"
          })`,
        }}>
        <button
          onClick={() => onBack()}
          className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-full hover:bg-teal-500 transition-colors z-10">
          ← Back
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-24 md:-mt-32 relative z-10">
        <div className="md:flex md:space-x-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 text-center md:text-left">
            <img
              src={
                currentMovie.poster_path
                  ? `${TMDB_IMAGE_BASE_URL}${currentMovie.poster_path}`
                  : "https://placehold.co/500x750/282828/EAEAEA?text=No+Image"
              }
              alt={currentMovie.title}
              className="rounded-lg shadow-2xl w-2/3 sm:w-1/2 md:w-full mx-auto aspect-[2/3]" // Added aspect ratio
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/500x750/282828/EAEAEA?text=Image+Error";
              }}
            />
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`} // Corrected YouTube link
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg w-full md:w-auto text-center transition-colors">
                <PlayCircle className="inline-block w-5 h-5 mr-2" /> Watch
                Trailer
              </a>
            )}
          </div>

          {/* Details */}
          <div className="w-full md:w-2/3 lg:w-3/4 mt-6 md:mt-0 text-gray-200">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              {currentMovie.title}{" "}
              <span className="text-2xl md:text-3xl text-gray-400">
                (
                {currentMovie.release_date
                  ? currentMovie.release_date.substring(0, 4)
                  : "N/A"}
                )
              </span>
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-sm text-gray-400">
              {" "}
              {/* Added flex-wrap and gap */}
              <span>
                {currentMovie.runtime
                  ? `${Math.floor(currentMovie.runtime / 60)}h ${
                      currentMovie.runtime % 60
                    }m`
                  : "N/A"}
              </span>
              <span>|</span>
              <span className="truncate max-w-xs">
                {currentMovie.genres?.map((g) => g.name).join(", ") || "N/A"}
              </span>{" "}
              {/* Added truncate */}
              <span>|</span>
              <span className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />{" "}
                {currentMovie.vote_average
                  ? currentMovie.vote_average.toFixed(1)
                  : "N/A"}{" "}
                ({currentMovie.vote_count || 0} votes)
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {" "}
              {/* Added flex-wrap and gap */}
              <button
                onClick={() => onAddToWatchlist(currentMovie)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center transition-colors">
                <Eye className="w-4 h-4 mr-2" /> Add to Watchlist
              </button>
              <button
                onClick={() => onAddToFavorites(currentMovie)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center transition-colors">
                <Heart className="w-4 h-4 mr-2" /> Add to Favorites
              </button>
            </div>

            <h2 className="text-xl font-semibold mb-2 text-teal-400">
              Overview
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {currentMovie.overview || "No overview available."}
            </p>

            {/* Cast - simplified */}
            {currentMovie.credits?.cast &&
              currentMovie.credits.cast.length > 0 && (
                <div className="mt-6">
                  {" "}
                  {/* Added mt-6 for spacing */}
                  <h2 className="text-xl font-semibold mb-3 text-teal-400">
                    Top Billed Cast
                  </h2>
                  <div className="flex overflow-x-auto space-x-3 pb-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                    {currentMovie.credits.cast.slice(0, 10).map((actor) => (
                      <div
                        key={actor.cast_id || actor.id}
                        className="bg-gray-800 p-2 rounded-lg text-center w-28 flex-shrink-0">
                        {" "}
                        {/* Added actor.id as fallback key */}
                        <img
                          src={
                            actor.profile_path
                              ? `${TMDB_IMAGE_BASE_URL}${actor.profile_path}`
                              : "https://placehold.co/150x225/282828/EAEAEA?text=No+Pic"
                          }
                          alt={actor.name}
                          className="w-full h-32 object-cover rounded mb-1 aspect-[2/3]" // Added aspect ratio
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/150x225/282828/EAEAEA?text=Error";
                          }}
                        />
                        <p className="text-xs font-medium text-gray-200 truncate">
                          {actor.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {actor.character}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* User Review Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6">
            Rate & Review This Movie
          </h2>
          <form
            onSubmit={handleSubmitReview}
            className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">
                Your Rating (1-10):
              </label>
              <div className="flex space-x-1 flex-wrap">
                {" "}
                {/* Added flex-wrap */}
                {[...Array(10)].map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleRating(i + 1)}
                    className={`p-1 rounded transition-colors ${
                      i < userRating
                        ? "text-yellow-400"
                        : "text-gray-500 hover:text-yellow-300"
                    }`}
                    aria-label={`Rate ${i + 1} star`} // Added aria-label
                  >
                    <Star
                      className={`w-6 h-6 ${
                        i < userRating ? "fill-yellow-400" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="reviewText" className="block text-gray-300 mb-2">
                Your Review:
              </label>
              <textarea
                id="reviewText"
                rows="4"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 text-gray-200 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-3"
                placeholder={`What did you think of ${currentMovie.title}?`}></textarea>
            </div>
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50" // Added disabled style
              disabled={userRating === 0 || !reviewText.trim()}>
              Submit Review
            </button>
          </form>
        </div>

        {/* Display existing reviews (mock for now) */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            Community Reviews for {currentMovie.title}
          </h3>
          {mockReviews.filter((r) => r.movieId === currentMovie.id).length >
          0 ? (
            mockReviews
              .filter((r) => r.movieId === currentMovie.id)
              .map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-800 p-4 rounded-lg shadow mb-4">
                  <div className="flex items-center mb-1">
                    <img
                      src={review.avatar}
                      alt={review.user}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="font-semibold text-teal-400 text-sm">
                      {review.user}
                    </span>
                    <span className="ml-auto text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    {[...Array(10)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300">{review.text}</p>
                </div>
              ))
          ) : (
            <p className="text-gray-500">
              No reviews yet for this movie. Be the first!
            </p>
          )}
        </div>

        {/* Recommended Movies */}
        {currentMovie.recommendations?.results &&
          currentMovie.recommendations.results.length > 0 && (
            <div className="mt-12">
              {/* Pass onBack (which is handleMovieClick) to navigate to the recommended movie's detail page */}
              <Carousel
                movies={currentMovie.recommendations.results.slice(0, 10)}
                onMovieClick={onBack}
                title="Recommendations"
              />
            </div>
          )}
      </div>
    </div>
  );
};

// Utility Components
const PageLoader = () => (
  <div className="flex justify-center items-center h-[calc(100vh-150px)]">
    {" "}
    {/* Adjust height as needed */}
    <Spinner />
  </div>
);

const Spinner = () => (
  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
);

// --- Main App Component ---
function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // For Explore page search

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setCurrentPage("MovieDetail");
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery(""); // Clear search when a genre is clicked
    setCurrentPage("Explore");
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setCurrentPage("ArticleDetail");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage("Explore");
  };

  // Placeholder functions for watchlist and favorites
  const handleAddToWatchlist = (movie) => {
    console.log("Added to watchlist (mock):", movie.title);
    // Here you would typically update state or make an API call
    alert(`${movie.title} added to watchlist (mock feature).`);
  };

  const handleAddToFavorites = (movie) => {
    console.log("Added to favorites (mock):", movie.title);
    // Here you would typically update state or make an API call
    alert(`${movie.title} added to favorites (mock feature).`);
  };

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [currentPage, selectedMovie]); // Also scroll to top when selectedMovie changes for detail page

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return (
          <HomePage
            onMovieClick={handleMovieClick}
            setCurrentPage={setCurrentPage}
          />
        );
      case "Explore":
        const exploreProps = {
          onMovieClick: handleMovieClick,
        };
        if (searchQuery) {
          exploreProps.fetchEndpoint = (params) =>
            fetchFromTMDB("/search/movie", { ...params, query: searchQuery });
          exploreProps.title = `Search Results for "${searchQuery}"`;
          exploreProps.initialFilters = {}; // Reset filters for new search
        } else if (selectedGenre) {
          exploreProps.title = `${selectedGenre.name} Movies`;
          exploreProps.fetchEndpoint = "/discover/movie";
          exploreProps.initialFilters = { with_genres: selectedGenre.id };
        } else {
          exploreProps.title = "Explore Movies";
          exploreProps.fetchEndpoint = "/discover/movie";
          exploreProps.initialFilters = {};
        }
        return <MovieGridPage {...exploreProps} />;
      case "Top Rated":
        return (
          <MovieGridPage
            title="Top Rated Movies"
            fetchEndpoint="/movie/top_rated"
            onMovieClick={handleMovieClick}
          />
        );
      case "Now Playing":
        return (
          <MovieGridPage
            title="Now Playing in Theaters"
            fetchEndpoint="/movie/now_playing"
            onMovieClick={handleMovieClick}
          />
        );
      case "Upcoming":
        return (
          <MovieGridPage
            title="Upcoming Releases"
            fetchEndpoint="/movie/upcoming"
            onMovieClick={handleMovieClick}
          />
        );
      case "Genres":
        return (
          <GenresPage
            onGenreClick={handleGenreClick}
            setCurrentPage={setCurrentPage}
          />
        );
      case "Reviews":
        return <ReviewsPage onMovieClick={handleMovieClick} />;
      case "My List":
        return <MyListPage />;
      case "News":
        return <NewsPage onArticleClick={handleArticleClick} />;
      case "About":
        return <AboutPage />;
      case "MovieDetail":
        return (
          <MovieDetailPage
            movie={selectedMovie}
            onBack={handleMovieClick} // Changed to handleMovieClick to allow navigation from recommendations
            onAddToWatchlist={handleAddToWatchlist} // Pass the new handler
            onAddToFavorites={handleAddToFavorites} // Pass the new handler
            // onRate prop can be added here if rating submission logic is in App
          />
        );
      case "ArticleDetail":
        return (
          <ArticleDetailPage
            article={selectedArticle}
            setCurrentPage={setCurrentPage}
          />
        );
      default:
        return (
          <HomePage
            onMovieClick={handleMovieClick}
            setCurrentPage={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col font-inter">
      <Header setCurrentPage={setCurrentPage} onSearch={handleSearch} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
