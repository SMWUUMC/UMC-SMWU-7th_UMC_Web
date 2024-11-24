// hooks/useMovieDetails.js
import { useState, useEffect } from 'react';
import axiosInstance from '../apis/axios-instance';

const useMovieDetails = (movieId) => {
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieContents = async () => {
            try {
                setLoading(true);

                // 영화 상세 정보 가져오기
                const movieResponse = await axiosInstance.get(`/movie/${movieId}`, {
                    params: { language: 'ko-KR' },
                });
                setMovie(movieResponse.data);

                // 영화 출연진 정보 가져오기
                const creditsResponse = await axiosInstance.get(`/movie/${movieId}/credits`, {
                    params: { language: 'ko-KR' },
                });
                setCredits(creditsResponse.data.cast);
            } catch (error) {
                console.error("영화 상세 정보를 가져오는 데 실패했습니다.", error);
                setError("영화 상세 정보를 가져오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieContents();
    }, [movieId]);

    return { movie, credits, loading, error };
};

export default useMovieDetails;
