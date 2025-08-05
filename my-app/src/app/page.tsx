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
    <div className="min-h-screen bg-[#181818] text-white px-4">
      <div className="py-10 text-center">
        <h1 className="text-5xl font-black text-red-600 drop-shadow tracking-tight">
          🎬 MovieVault
        </h1>
        <p className="text-gray-300 mt-2 text-lg tracking-wider">
          Unlock your next favorite movie or series
        </p>
      </div>
      <div className="max-w-3xl mx-auto mb-6 flex gap-3 flex-col md:flex-row items-center justify-center">
        <SearchBar query={query} setQuery={setQuery} />
        <Filters setType={setType} setYear={setYear} />
      </div>
      {loading ? (
        <div className="flex justify-center my-20">
          <Loader />
        </div>
      ) : movies.length ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-7 mt-8"
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
        <div className="flex flex-col items-center mt-20 opacity-70">
          <span className="text-7xl mb-4">🎞️</span>
          <p className="text-lg text-gray-300 font-semibold">No movies found</p>
          <p className="text-gray-400 mt-1 text-sm">
            Try different keywords or remove filters
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-24 text-center opacity-90">
          <span className="text-8xl mb-6">🍿</span>
          <h2 className="text-2xl font-bold">Welcome to MovieVault</h2>
          <p className="text-gray-400 mt-2 text-base">
            Search and explore movies or series, or check out what's trending!
          </p>
        </div>
      )}
      {totalResults > 10 && (
        <div className="flex justify-center my-10 py-4">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalResults / 10)}
            onPageChange={setPage}
          />
        </div>
      )}
      {/* Modal */}
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
