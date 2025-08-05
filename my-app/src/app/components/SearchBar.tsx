
'use client';
import { FC } from 'react';
import { SearchBarProps } from '../types/Types';


const SearchBar: FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <div className="w-full max-w-lg mx-auto mt-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies or series..."
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
  );
};

export default SearchBar;
