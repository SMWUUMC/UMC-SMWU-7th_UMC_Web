import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TopRated() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
        const movies = await axios.get(`https://api.themoviedb.org/3/movie/top-rated?language=ko-KR&page=1`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2E3N2Y0N2MyMGEyNzliNjUwMDk5NDUwNjc0ZTE5NyIsIm5iZiI6MTcyODYyNjg2Ni43MDA3ODUsInN1YiI6IjY3MDRjZDdkNGIwYzViOWQ3MTY5YzRiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dSJqlKGb6Dd5BDcVd0VwLOmoqGAo5V1rdJl2yFa75w8`
            }
        })
        setMovies(movies);
    }
    getMovies();
  }, []);

  return (
    <div>
      <h1>높은 평가를 받은 영화</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${props.movie.poster_path}`}
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

export default TopRated;