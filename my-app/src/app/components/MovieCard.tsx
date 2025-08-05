"use client";
import { FC } from "react";
import { motion } from "framer-motion";
import { MovieCardProps } from "../types/Types";

const MovieCard: FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200 }}
      onClick={onClick}
    >
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-2 cursor-pointer">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
          alt={movie.Title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h3 className="mt-2 text-lg font-semibold truncate">{movie.Title}</h3>
        <p className="text-sm text-gray-600 capitalize">{movie.Type}</p>
        <p className="text-sm text-gray-500">{movie.Year}</p>
      </div>
    </motion.div>
  );
};

export default MovieCard;
