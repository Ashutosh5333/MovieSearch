"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { MovieModalProps } from "../types/Types";
import Image from "next/image";

const MovieModal: FC<MovieModalProps> = ({ movie, loading, onClose }) => {
  const [imgSrc, setImgSrc] = useState<string>(
    movie?.Poster && movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpeg"
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Reset imgSrc whenever movie changes
  useEffect(() => {
    setImgSrc(
      movie?.Poster && movie.Poster !== "N/A"
        ? movie.Poster
        : "/placeholder.jpeg"
    );
  }, [movie]);

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
          className="absolute cursor-pointer top-4 z-30 right-4 text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition"
        >
          ✕
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader />
          </div>
        ) : movie ? (
          <>
            {/* Poster using Next.js Image with fallback */}
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6 bg-[#333]">
              <Image
                src={imgSrc}
                alt={movie.Title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                onError={() => setImgSrc("/placeholder.jpeg")}
                priority
              />
            </div>

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
        ) : null}
      </motion.div>
    </motion.div>
  );
};

export default MovieModal;
