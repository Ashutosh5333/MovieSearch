"use client";
import { FC } from 'react';
import { SearchBarProps } from '../types/Types';
import { Search } from 'lucide-react';

const SearchBar: FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <div className="w-full max-w-lg mx-auto mt-4 relative">
      {/* Icon */}
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find movies, series, and more…"
        className="w-full pl-10 pr-4 py-2 text-base rounded-lg shadow-sm 
                   text-white bg-[#232323] border border-[#393939] placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600
                   transition"
      />
    </div>
  );
};

export default SearchBar;
