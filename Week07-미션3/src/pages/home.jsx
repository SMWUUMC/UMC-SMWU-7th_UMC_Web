import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Card from '../components/card';

const API_KEY = 'c162b6d4cd35f86d09a271a0500f6bf9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MoviesContainer = styled.div`
  padding: 20px;
  margin-left: 150px;
  margin-top: 50px;
  color: white;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
          params: {
            api_key: API_KEY,
            language: 'ko-KR',
            page: 1,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      }
    };

    fetchNowPlayingMovies();
  }, []);

  return (
    <MoviesContainer>
      <MovieGrid>
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            releaseDate={movie.release_date}
            posterPath={`${IMAGE_BASE_URL}${movie.poster_path}`} // TMDB 이미지 URL 사용
          />
        ))}
      </MovieGrid>
    </MoviesContainer>
  );
};

export default HomePage;