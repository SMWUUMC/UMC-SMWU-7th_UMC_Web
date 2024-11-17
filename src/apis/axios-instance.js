import axios from "axios";

console.log(process.env.REACT_APP_TMDB_TOKEN); // undefined가 아니어야 함
console.log(process.env.REACT_APP_MOVIE_API_URL); // undefined가 아니어야 함

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
  },
  baseURL: process.env.REACT_APP_MOVIE_API_URL,
});

export { axiosInstance };
