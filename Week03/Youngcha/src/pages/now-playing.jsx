import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import './items.css';
const NowPlaying = () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
        const movies = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTNkYWIyMDkxMzI2Y2Y3NTkwNTAwYjQyODNkNjZkNyIsIm5iZiI6MTcyNjE0MTU3Ny42MDM2ODcsInN1YiI6IjY0MzVmY2Y2NjUxZmNmMDBkM2RhYzNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFPsPRHPidq2OnJ3U-3wHJYhnGajDFqUsM8XJ_a_0bw`,
            }
        })
        setMovies(movies);
    }
    getMovies()
}, []);

  return (
    <div>
      <h1>현재 상영중인</h1>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap:'wrap'}}>
        {movies.data?.results.map((movie) => (
          <div key={movie.id} className='movie-item'>
            <img className='movie-poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h5>{movie.title}</h5>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
  </div>
  );
};

export default NowPlaying;