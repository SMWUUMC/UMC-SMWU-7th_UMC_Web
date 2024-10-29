// src/hooks/useFetchMovies.js
import { useState, useEffect } from 'react';
import createAxiosInstance from '../api/axios-instance';

function useFetchMovies(categories) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const axiosInstance = createAxiosInstance(categories); // 카테고리별 axios 인스턴스 생성
        const response = await axiosInstance.get(`/movie/${categories}`, {
          params: {
            page: 1,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        setError("영화 데이터를 가져오는 데 실패했습니다.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  return { movies, loading, error };
}

export default useFetchMovies;