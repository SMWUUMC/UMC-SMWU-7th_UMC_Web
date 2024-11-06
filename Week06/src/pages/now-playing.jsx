import React from 'react';
import styled from 'styled-components';
import Card from '../components/card';
import useCustomFetch from '../hooks/useCustomFetch';

const MoviesContainer = styled.div`
  padding: 20px;
  margin-left: 150px;
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

const Message = styled.p`
  font-size: 18px;
  color: white;
`;

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const NowPlayingPage = () => {
  const { data: movies, isLoading, isError } = useCustomFetch('/movie/now_playing?language=ko-KR&page=1');

  if (isLoading) return <Message>로딩 중...</Message>;
  if (isError) return <Message>오류가 발생했습니다.</Message>;

  return (
    <MoviesContainer>
      <Title>현재 상영중인 영화</Title>
      <MovieGrid>
        {movies?.results?.map((movie) => (
          <Card
            key={movie.id}
            movieId={movie.id} // movieId props 전달
            title={movie.title}
            releaseDate={movie.release_date}
            posterPath={`${IMAGE_BASE_URL}${movie.poster_path}`}
          />
        ))}
      </MovieGrid>
    </MoviesContainer>
  );
};

export default NowPlayingPage;