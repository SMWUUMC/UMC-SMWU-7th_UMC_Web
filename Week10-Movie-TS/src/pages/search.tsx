import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../api/axios-instance';
import Card from '../components/card';

// 영화 데이터 타입 정의
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

const SearchContainer = styled.div`
  padding: 20px;
  margin-left: 150px;
  color: white;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
  margin-top: 50px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff357e;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;

  &:hover {
    background-color: #ff1a60;
  }
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

  &:nth-child(2) {
    width: 80px;
  }
`;

const SearchPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!searchQuery) {
      navigate('/search');
    }
  }, [navigate, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      fetchMovies(searchQuery);
    }
  }, [searchQuery]);

  const fetchMovies = async (query: string) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axiosInstance.get<{ results: Movie[] }>(
        `/search/movie?query=${query}&language=ko-KR`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error('검색 오류:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === '') {
      setMovies([]);
    }
  };

  const handleCardClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  // Debounce 구현
  useEffect(() => {
    if (!query) return;

    const debounceTimer = setTimeout(() => {
      fetchMovies(query);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="영화 제목을 입력해주세요..."
          value={query}
          onChange={handleInputChange}
        />
        <SearchButton type="submit">검색</SearchButton>
      </SearchForm>

      {query && (
        isLoading ? (
          <SkeletonContainer>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index}>
                <SkeletonBox />
                <SkeletonText />
                <SkeletonText />
              </div>
            ))}
          </SkeletonContainer>
        ) : isError ? (
          <Message>검색 오류가 발생했습니다.</Message>
        ) : movies.length === 0 ? (
          <Message>해당 검색어에 대한 영화 데이터가 없습니다.</Message>
        ) : (
          <MovieGrid>
            {movies.map((movie) => (
              <Card
                key={movie.id}
                title={movie.title}
                releaseDate={movie.release_date}
                posterPath={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : '/placeholder.png'
                }
                movieId={movie.id}
                onClick={() => handleCardClick(movie.id)}
              />
            ))}
          </MovieGrid>
        )
      )}
    </SearchContainer>
  );
};

export default SearchPage;