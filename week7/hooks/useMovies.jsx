import { useInfiniteQuery } from 'react-query';
import axiosInstance from '../apis/axios-instance';

// 영화 데이터 가져오기 함수
const fetchMovies = async (category, pageParam = 1) => {
    const response = await axiosInstance.get(`/movie/${category}`, {
        params: {
            language: 'ko-KR',
            api_key: import.meta.env.VITE_TMDB_TOKEN,
            page: pageParam, // 페이지 번호
        },
    });
    return response.data; // 전체 데이터를 반환 (pagination 포함)
};

// useMovies 훅
const useMovies = (category) => {
    return useInfiniteQuery(
        [category], // queryKey
        ({ pageParam = 1 }) => fetchMovies(category, pageParam), // 페이지네이션
        {
            getNextPageParam: (lastPage) => lastPage.page + 1, // 다음 페이지로 이동
            getPreviousPageParam: (firstPage) => firstPage.page - 1, // 이전 페이지로 이동
        }
    );
};

export default useMovies;
