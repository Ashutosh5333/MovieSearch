"use client";
import { FC } from "react";
import { FiltersProps } from "../types/Types";

const Filters: FC<FiltersProps> = ({ setType, setYear }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
      <select
        onChange={(e) => setType(e.target.value)}
        className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
      >
        <option value="">All Types</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
      </select>

      <input
        type="number"
        placeholder="Year"
        onChange={(e) => setYear(e.target.value)}
        className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none w-28"
      />
    </div>
  );
};

export default Filters;
