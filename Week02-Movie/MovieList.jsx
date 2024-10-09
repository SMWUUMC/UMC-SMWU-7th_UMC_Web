// src/MovieList.jsx
import React, { useEffect, useState } from 'react';
import { MOVIES } from './mocks/movies';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
  
    useEffect(() => {
      const fetchMovies = () => {
        setMovieList(MOVIES);
      };

      fetchMovies();
    }, []);
  
    return (
        <div className="movie-list">
          {movieList.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`${BASE_IMAGE_URL}${movie.poster_path}`} // URL 조합
                alt={movie.title}
                className="movie-poster"
                style={{ width: '200px', height: '300px' }}
              />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }; 
    
  export default MovieList;