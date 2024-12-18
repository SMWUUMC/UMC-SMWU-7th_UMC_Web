import axios, { AxiosInstance } from 'axios';

// API 클라이언트 설정
const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 로그인 요청 타입
interface LoginRequest {
    email: string;
    password: string;
}

// 회원가입 요청 타입
interface RegisterRequest extends LoginRequest {
    passwordCheck: string;
}

// API 응답 타입
interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

// 로그인 API 함수
export const loginApi = async (
    email: string,
    password: string
    ): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
        email,
        password,
    });
    return response.data;
};

// 회원가입 API 함수
export const registerApi = async (
    email: string,
    password: string,
    passwordCheck: string
    ): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', {
        email,
        password,
        passwordCheck,
    });
    return response.data;
};
