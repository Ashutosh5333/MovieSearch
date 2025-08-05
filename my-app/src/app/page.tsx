"use client";
import { useState, useEffect } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { fetchMovies, fetchMovieDetails } from "./lib/api";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import Loader from "./components/Loader";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import MovieModal from "./components/MovieModal";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      fetchMovies(debouncedQuery, page, type, year).then((data) => {
        setMovies(data.Search || []);
        setTotalResults(Number(data.totalResults || 0));
        setLoading(false);
      });
    }
  }, [debouncedQuery, page, type, year]);

  const handleOpenModal = async (id: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    setModalLoading(true);
    const details = await fetchMovieDetails(id);
    setSelectedMovie(details);
    setModalLoading(false);
  };
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-red-600">🎬 MovieVault</h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">
          Unlock your next favorite movie or series
        </p>
      </div>

      {/* Search and Filters */}
      <SearchBar query={query} setQuery={setQuery} />
      <Filters setType={setType} setYear={setYear} />

      {/* Movies or States */}
      {loading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-6"
          >
            {movies.map((movie: any) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onClick={(e) => handleOpenModal(movie.imdbID, e)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : debouncedQuery ? (
        <div className="flex flex-col items-center justify-center mt-10 text-center">
          <img
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTptDoJ56CFW2-wkX9uNLM2kthnUpMKvIsWHg&s`}
            alt="No results"
            className="w-48 mb-4 opacity-80"
          />
          <p className="text-lg text-gray-600 font-medium">No movies found</p>
          <p className="text-gray-400 text-sm mt-1">
            Try different keywords or remove filters
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-12 text-center">
          <img
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTptDoJ56CFW2-wkX9uNLM2kthnUpMKvIsWHg&s`}
            alt="Discover Movies"
            className="w-56 mb-6 opacity-90"
          />
          <h2 className="text-2xl font-semibold">Welcome to MovieVault</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Search and explore movies or series, or check out trending films.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalResults > 10 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / 10)}
          onPageChange={setPage}
        />
      )}

      {/* Movie Details Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            loading={modalLoading}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
