import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";
import MovieCard from "./Card/MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWEzYmVkZjBiYTllN2I4MzE4NTg0NDVhMzFhZGI4NCIsIm5iZiI6MTczMDU0MTk5OC45NDk2MzMsInN1YiI6IjY3MjVmN2UyMWY2MWE0YThlODI1OGVmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KnEIWTmV0FkRAW_wKfI2k_JZE03sODilWY5pIF6bwOs`,
          },
        }
      );
      console.log(movies);
      setMovies(movies);
    };
    getMovies();
  }, []);

  return (
    <MovieListGrid>
      {movies.data?.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </MovieListGrid>
  );
};

export default MovieList;

const MovieListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* 화면에 맞게 카드 배치 */
  gap: 13px; /* 카드 간 간격 */
  width: 100%; /* 부모 컨테이너가 화면에 맞게 크기 조정 */
  padding: 16px;
`;
