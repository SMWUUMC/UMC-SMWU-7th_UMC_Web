import { axiosInstance } from "../axios/axios-instance";

// const { data, isLoading, isError } = useCustomFetch('url');
// 데이터와 로딩/에러 상태를 반환하는 커스텀훅!

interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface Movie {
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
    [key: string]: any;
}

export const useCustomFetch = (): {getMovies: (url: string) => Promise<MovieResponse | undefined>} => {
    const getMovies = async (url: string): Promise<MovieResponse | undefined> => {
        try {
            const response = await axiosInstance.get<MovieResponse>(url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        } 
    }

    return { getMovies };
}