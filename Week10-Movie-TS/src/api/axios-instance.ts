import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MOVIE_API_URL as string, // 환경변수로 설정한 기본 URL
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN as string}`, // 토큰 포함
  },
});

export default axiosInstance;