import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query'; // useQuery 가져오기
import axiosInstance from '../api/axios-instance'; // axiosInstance 가져오기
import Card from '../components/card';

const MoviesContainer = styled.div`
  padding: 20px;
  margin-left: 155px;
  color: white;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 47px;
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

const SkeletonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-left: 180px;
  margin-top: 80px;
`;

const SkeletonBox = styled.div`
  width: 150px;
  height: 225px;
  background-color: #444;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const SkeletonText = styled.div`
  width: 100px;
  height: 15px;
  background-color: #666;
  border-radius: 5px;
  margin: 5px 0;
`;

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const NowPlayingPage = () => {
  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ['now-playing-movies'],
    queryFn: () => axiosInstance.get('/movie/now_playing?language=ko-KR&page=1').then((res) => res.data),
    staleTime: 60000, // 데이터 캐시 유지 시간 설정
  });

  if (isLoading) {
    return (
      <SkeletonContainer>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>
            <SkeletonBox />
            <SkeletonText />
            <SkeletonText style={{ width: '80px' }} />
          </div>
        ))}
      </SkeletonContainer>
    );
  }

  if (isError) {
    return <Message>오류가 발생했습니다.</Message>;
  }

  return (
    <MoviesContainer>
      <Title>현재 상영중인 영화</Title>
      <MovieGrid>
        {movies?.results?.map((movie) => (
          <Card
            key={movie.id}
            movieId={movie.id}
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