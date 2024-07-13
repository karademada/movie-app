import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import MovieItem from '../components/MovieItem';
import InputFilter from '../components/InputFilter';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY;

  const observer = useRef();
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = searchQuery
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
      
      const response = await axios.get(endpoint);
      setMovies(prevMovies => page === 1 ? response.data.results : [...prevMovies, ...response.data.results]);
      setHasMore(response.data.page < response.data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setLoading(false);
  }, [searchQuery, page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleFilterChange = (query) => {
    setSearchQuery(query);
    setPage(1);
    setMovies([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
      </h1>
      <InputFilter onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <div key={movie.id} ref={movies.length === index + 1 ? lastMovieElementRef : null}>
            <MovieItem movie={movie} />
          </div>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading more movies...</p>}
      {!hasMore && <p className="text-center mt-4">No more movies to load</p>}
    </div>
  );
};

export default MovieList;