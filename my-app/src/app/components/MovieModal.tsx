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
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      {/* Modal */}
      <motion.div
        className="relative z-10 bg-[#232323] text-white rounded-2xl shadow-2xl w-full sm:w-[95%] md:w-[700px] max-h-[90vh] overflow-y-auto p-0"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
      >
        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 w-10 h-10 bg-red-600 text-white rounded-full text-2xl flex items-center justify-center shadow-lg hover:bg-red-700 transition z-20"
        >
          ✕
        </button>
        {/* Poster backdrop */}
        <div
          className="w-full h-72 sm:h-80 md:h-96 rounded-t-2xl bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"
            })`,
          }}
        />
        {loading ? (
          <div className="flex justify-center items-center py-24 bg-[#232323]">
            <Loader />
          </div>
        ) : (
          <div className="p-7">
            <h1 className="text-2xl font-black mb-3">{movie.Title}</h1>
            <p className="text-gray-200 mb-4">{movie.Plot}</p>
            <div className="text-sm space-y-2 text-gray-300">
              <div>
                <b>Actors:</b> {movie.Actors}
              </div>
              <div>
                <b>Rating:</b> {movie.imdbRating}
              </div>
              <div>
                <b>Released:</b> {movie.Released}
              </div>
              <div>
                <b>Genre:</b> {movie.Genre}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MovieModal;
