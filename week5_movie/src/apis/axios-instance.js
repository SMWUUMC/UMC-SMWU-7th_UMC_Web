import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, 
    headers: { 
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Authorization 헤더 설정
    },
});

export { axiosInstance };