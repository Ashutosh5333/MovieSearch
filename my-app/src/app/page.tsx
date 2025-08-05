"use client";
import { useState, useEffect, useMemo } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { fetchMovies, fetchMovieDetails } from "./lib/api";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import Loader from "./components/Loader";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import MovieModal from "./components/MovieModal";
import { motion, AnimatePresence } from "framer-motion";
import { Movie, MovieDetail, OMDbSearchResponse } from "./types/Types";

export default function Home() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedQuery) {
        setMovies([]);
        setTotalResults(0);
        return;
      }
      setLoading(true);
      try {
        const data: OMDbSearchResponse = await fetchMovies(
          debouncedQuery,
          page,
          type,
          year
        );
        if (data.Response === "True" && data.Search) {
          setMovies(data.Search);
          setTotalResults(Number(data.totalResults || 0));
        } else {
          setMovies([]);
          setTotalResults(0);
        }
      } catch {
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, page, type, year]);

  // Reset page on search/filter change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, type, year]);

  const handleOpenModal = async (id: string, e: React.MouseEvent) => {
    setSelectedMovie(null);
    setModalLoading(true);
    try {
      const details = await fetchMovieDetails(id);
      setSelectedMovie(details);
    } catch {
      setSelectedMovie(null);
    } finally {
      setModalLoading(false);
    }
  };
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  // Removing movies with duplicate imdbID

  const uniqueMovies = useMemo(() => {
    const seen = new Set<string>();
    return movies.filter((movie) => {
      if (movie.imdbID && !seen.has(movie.imdbID)) {
        seen.add(movie.imdbID);
        return true;
      }
      return false;
    });
  }, [movies]);

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
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-7 mt-8"
          >
            {uniqueMovies.map((movie) => (
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
        <div className="flex justify-center  py-4">
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
