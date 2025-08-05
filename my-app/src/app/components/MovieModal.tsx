"use client";

import { FC, useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { MovieModalProps } from "../types/Types";

const MovieModal: FC<MovieModalProps> = ({ movie, loading, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!movie && !loading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal content */}
      <motion.div
        className="relative bg-[#232323] text-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition"
        >
          ✕
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader />
          </div>
        ) : (
          movie && (
            <>
              {/* Poster */}
              <div
                className="w-full h-64 md:h-80 rounded-lg bg-center bg-no-repeat bg-contain mb-6"
                style={{
                  backgroundImage:
                    movie.Poster && movie.Poster !== "N/A"
                      ? `url(${movie.Poster})`
                      : "url('/placeholder.jpg')",
                }}
              />

              {/* Title */}
              <h2 className="text-3xl font-bold mb-4">{movie.Title}</h2>

              {/* Plot */}
              <p className="mb-4 text-gray-300">{movie.Plot}</p>

              {/* Additional details */}
              <div className="space-y-2 text-sm text-gray-400">
                <p>
                  <strong>Actors:</strong> {movie.Actors}
                </p>
                <p>
                  <strong>Rating:</strong> {movie.imdbRating}
                </p>
                <p>
                  <strong>Released:</strong> {movie.Released}
                </p>
                <p>
                  <strong>Genre:</strong> {movie.Genre}
                </p>
              </div>
            </>
          )
        )}
      </motion.div>
    </motion.div>
  );
};

export default MovieModal;
