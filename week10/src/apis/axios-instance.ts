// src/axios/axios-instance.ts
import axios, { AxiosInstance } from 'axios';

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, // 환경 변수에서 API 토큰 가져오기
    },
    baseURL: import.meta.env.VITE_MOVIE_API_URL, // 기본 API URL
});

export default axiosInstance;
