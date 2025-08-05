"use client";
import { FC } from "react";
import { motion } from "framer-motion";
import { MovieCardProps } from "../types/Types";

const MovieCard: FC<MovieCardProps> = ({ movie, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.08 }}
    className="relative group cursor-pointer rounded-lg overflow-hidden shadow-xl bg-[#212121] min-h-80"
    onClick={onClick}
  >
    {/* Poster */}
    <img
      src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
      alt={movie.Title}
      className="w-full h-96 object-cover block group-hover:scale-105 transition-transform duration-300"
    />
    {/* Overlay On Hover */}
    <div
      className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100
        transition-opacity duration-300 flex flex-col justify-end p-4"
    >
      <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
        {movie.Title}
      </h3>
      <div className="text-xs text-gray-300">
        <span className="uppercase">{movie.Type}</span> • {movie.Year}
      </div>
    </div>
  </motion.div>
);

export default MovieCard;
