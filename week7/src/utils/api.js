// // src/utils/api.js
// import axios from 'axios';

// const apiClient = axios.create({
//     baseURL: 'http://localhost:3000',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// export const loginApi = async (email, password) => {
//     const response = await apiClient.post('/auth/login', { email, password });
//     return response.data;

// };

// export const registerApi = async (email, password, passwordCheck) => {
//     const response = await apiClient.post('/auth/register', {
//         email,
//         password,
//         passwordCheck,
//     });
//     return response.data;
// };
