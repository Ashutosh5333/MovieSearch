"use client";
import { FC } from "react";
import { FiltersProps } from "../types/Types";

const Filters: FC<FiltersProps> = ({ setType, setYear }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
      <select
        onChange={(e) => setType(e.target.value)}
        className="px-4 py-2 text-base rounded-lg shadow-sm
                   bg-[#232323] text-white placeholder-gray-400 border border-[#393939]
                   focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600
                   transition appearance-none"
      >
        <option value="">All Types</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
      </select>
      <input
        type="number"
        placeholder="Year"
        min="1900"
        max={new Date().getFullYear()}
        onChange={(e) => setYear(e.target.value)}
        className="px-4 py-2 text-base rounded-lg shadow-sm
                   bg-[#232323] text-white placeholder-gray-400 border border-[#393939]
                   w-28 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600
                   transition appearance-none"
      />
    </div>
  );
};

export default Filters;
