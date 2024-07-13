import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const { id } = useParams();
  const API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY;
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        setMovie(movieResponse.data);

        const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
        setCast(castResponse.data.cast.slice(0, 10)); // Get top 10 cast members
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="relative">
        <img 
          src={`${BASE_IMAGE_URL}${movie.backdrop_path}`} 
          alt={movie.title} 
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-xl">{movie.tagline}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p>{movie.overview}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Top Billed Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cast.map((actor) => (
              <div key={actor.id} className="text-center">
                <img 
                  src={`${BASE_IMAGE_URL}${actor.profile_path}`} 
                  alt={actor.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <p className="font-semibold">{actor.name}</p>
                <p className="text-sm text-gray-600">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;