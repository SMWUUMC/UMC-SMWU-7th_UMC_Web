import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MOVIE_API_URL, // 환경변수로 설정한 기본 URL
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, // 토큰 포함
  }
});

export default axiosInstance;