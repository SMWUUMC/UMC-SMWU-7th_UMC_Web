import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';

function NowPlaying() {
  const { movies, loading, error } = useCustomFetch('now_playing');
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div>
      <h1>현재 상영중인 영화</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => handleMovieClick(movie.id)} style={{ cursor: 'pointer' }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '100%' }}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NowPlaying;