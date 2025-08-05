export interface FiltersProps {
  setType: (type: string) => void;
  setYear: (year: string) => void;
}

export interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}


export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieCardProps {
  movie: Movie;
  onClick: (e: React.MouseEvent) => void;
}
// Detailed movie info for modal
export interface MovieDetail extends Movie {
  Plot: string;
  Actors: string;
  imdbRating: string;
  Released: string;
  Genre: string;
  Director?: string;
  Writer?: string;
  Language?: string;
  Awards?: string;
}

export interface MovieModalProps {
  movie: MovieDetail | null;
  loading: boolean;
  onClose: () => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface OMDbSearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}
