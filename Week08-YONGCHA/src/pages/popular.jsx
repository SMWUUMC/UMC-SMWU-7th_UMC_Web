import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios-instance';
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
`;

const PageNumber = styled.span`
  margin-top: 10px;
  font-size: 16px;
  color: white;
`;

const PageButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #ff357e;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
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

const fetchPopularMovies = (page = 1) =>
  axiosInstance.get(`/movie/popular?language=ko-KR&page=${page}`).then((res) => res.data);

const PopularPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1;

  const [page, setPage] = useState(initialPage);

  const {
    data: movies,
    isLoading,
    isError,
    error,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['popular-movies', page],
    queryFn: () => fetchPopularMovies(page),
    keepPreviousData: true,
  });

  useEffect(() => {
    navigate(`?page=${page}`, { replace: true }); // 상세페이지에서 나왔을 때 해당 페이지 그대로 유지
    window.scrollTo({ top: window.scrollY, behavior: 'auto' });
  }, [page, navigate]); // 다음 버튼 누를 때마다 스크롤의 위치 top

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (!isPreviousData && movies && page < movies.total_pages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

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
      <Title>인기있는 영화</Title>
      <MovieGrid>
        {movies.results.map((movie) => (
          <Card
            key={movie.id}
            movieId={movie.id}
            title={movie.title}
            releaseDate={movie.release_date}
            posterPath={`${IMAGE_BASE_URL}${movie.poster_path}`}
          />
        ))}
      </MovieGrid>
      <PaginationContainer>
        <PageButton onClick={handlePrevious} disabled={page <= 1}>
          이전
        </PageButton>
        <PageNumber>{page} 페이지</PageNumber>
        <PageButton
          onClick={handleNext}
          disabled={page >= movies.total_pages}
        >
          다음
        </PageButton>
        {isFetching && <span> Loading...</span>}
      </PaginationContainer>
    </MoviesContainer>
  );
};
  
export default PopularPage;