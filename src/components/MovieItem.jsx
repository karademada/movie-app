import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({ movie }) => {
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <img 
          src={`${BASE_IMAGE_URL}${movie.poster_path}`} 
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 truncate">{movie.title}</h2>
          <p className="text-sm text-gray-600 mb-2">Release Date: {movie.release_date}</p>
          <p className="text-sm font-bold text-blue-600 mb-2">Rating: {movie.vote_average}/10</p>
          <p className="text-sm text-gray-700 line-clamp-3">{movie.overview}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;