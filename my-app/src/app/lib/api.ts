
export const fetchMovies = async (query: string, page: number, type?: string, year?: string) => {
    const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}${type ? `&type=${type}` : ''}${year ? `&y=${year}` : ''}`;
    const res = await fetch(url);
    return res.json();
  };
  
  export const fetchMovieDetails = async (id: string) => {
    const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`;
    const res = await fetch(url);
    return res.json();
  };
  