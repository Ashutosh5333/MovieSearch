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
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>

      {/* Responsive Modal */}
      <motion.div
        className="relative bg-white rounded-xl shadow-2xl w-full sm:w-[90%] md:w-[600px] lg:w-[700px] max-h-[90vh] overflow-y-auto p-4 md:p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button - outside the image area */}
        <button
          onClick={onClose}
          className="absolute top-1 right-2 w-8 h-8 flex items-center
   justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          ✕
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader />
          </div>
        ) : (
          <div className="py-6">
            {/* Image Section */}

            <div
              className="w-full h-64 sm:h-72 md:h-80 bg-black bg-center bg-no-repeat bg-contain rounded-md mb-4"
              style={{
                backgroundImage: `url(${
                  movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"
                })`,
              }}
            ></div>

            {/* Movie Details */}
            <h1 className="text-xl md:text-2xl font-bold">{movie.Title}</h1>
            <p className="mt-2 text-gray-700 text-sm md:text-base">
              {movie.Plot}
            </p>

            <div className="mt-4 space-y-1 text-sm md:text-base">
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
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MovieModal;
