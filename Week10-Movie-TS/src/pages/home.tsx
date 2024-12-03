import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const API_KEY = 'c162b6d4cd35f86d09a271a0500f6bf9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// 영화 타입 정의
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

// 스타일 정의
const MoviesContainer = styled.div`
  padding: 20px;
  margin-left: 150px;
  margin-top: 10px;
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

const MovieCard = styled.div`
  width: 150px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #222;
  text-align: center;
  cursor: pointer;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 225px;
  object-fit: cover;
  background-color: #333;

  ${MovieCard}:hover & {
    opacity: 0.5;
  }
`;

const MovieTitle = styled.div`
  font-size: 14px;
  color: white;
  padding: 10px;
`;

const ReleaseDate = styled.div`
  font-size: 12px;
  color: #bbb;
  margin-bottom: 10px;
`;

// HomePage 컴포넌트
const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

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

  const handleCardClick = (movieId: number): void => {
    console.log(`Movie ID: ${movieId}`); // 여기서 클릭 이벤트를 처리합니다.
  };

  return (
    <MoviesContainer>
      <Title>현재 상영 영화</Title>
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} onClick={() => handleCardClick(movie.id)}>
            <MovieImage
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
            <MovieTitle>{movie.title}</MovieTitle>
            <ReleaseDate>{movie.release_date}</ReleaseDate>
          </MovieCard>
        ))}
      </MovieGrid>
    </MoviesContainer>
  );
};

export default HomePage;