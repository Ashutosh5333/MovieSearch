export interface FiltersProps {
  setType: (type: string) => void;
  setYear: (year: string) => void;
}

export interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

export interface MovieCardProps {
  movie: {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
  };
  onClick: (e: React.MouseEvent) => void;
}

export interface MovieModalProps {
  movie: any;
  loading: boolean;
  onClose: () => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
