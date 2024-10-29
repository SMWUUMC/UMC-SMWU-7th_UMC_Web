import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

// 카테고리별 API 키 설정
const API_KEYS = {
  now_playing: 'now-playing',
  popular: 'popular',
  top_rated: 'top-rated',
  upcoming: 'up-coming',
};

// 카테고리를 받아서 axios 인스턴스 생성 함수
const createAxiosInstance = (categories) => {
  return axios.create({
    baseURL: BASE_URL,
    params: {
      api_key: API_KEYS[categories],
      language: 'ko-KR',
    },
  });
};

export default createAxiosInstance;