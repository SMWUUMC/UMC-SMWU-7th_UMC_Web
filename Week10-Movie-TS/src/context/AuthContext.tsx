import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 유저 타입 정의
interface User {
  id: number;
  email: string;
}

// 회원가입 입력 타입
interface RegisterInput {
  email: string;
  password: string;
  passwordCheck: string;
}

// 로그인 입력 타입
interface LoginInput {
  email: string;
  password: string;
}

// Context 타입 정의
interface AuthContextType {
  user: User | null;
  handleRegister: any;
  handleLogin: any;
  handleLogout: () => void;
}

// Context 초기값 설정
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // accessToken 만료 여부 확인 함수
  const isTokenExpired = (token: string): boolean => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  // 유저 정보 불러오기 함수
  const fetchUserInfo = async (): Promise<User> => {
    let accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('토큰이 없습니다.');

    // 토큰 재발급
    if (!accessToken || isTokenExpired(accessToken)) {
      const tokenResponse = await axios.post<{ accessToken: string }>(
        'http://localhost:3000/auth/token/access',
        null,
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      );
      accessToken = tokenResponse.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
    }

    // 유저 정보 API 호출
    const response = await axios.get<User>('http://localhost:3000/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  };

  // useQuery로 유저 정보 가져오기
  const { data: userData } = useQuery<User, AxiosError, User>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    enabled: !!localStorage.getItem('accessToken'), // accessToken이 있을 때만 실행
    onSettled: (data: User | undefined,  error: AxiosError | null) => {
      if (data) {
        setUser(data);
      } else {
        handleLogout();
      }
    },
  });

  // 회원가입 함수 리팩토링 - useMutation 사용
  const handleRegister = useMutation<void, AxiosError<{ message: string }>, RegisterInput>({
    mutationFn: async (data: RegisterInput) => {
      const response = await axios.post('http://localhost:3000/auth/register', data);
      return response.data;
    },

    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    },
    onError: (error) => {
      const message = error.response?.data.message || error.message;
      alert(`${message}`);
    },
  });

  // 로그인 함수 리팩토링 - useMutation 사용
  const handleLogin = useMutation<
    { accessToken: string; refreshToken: string },
    AxiosError<{ message: string }>,
    LoginInput
  >({
    mutationFn: async (data: LoginInput) => {
    const response = await axios.post<{ accessToken: string; refreshToken: string }>(
      'http://localhost:3000/auth/login',
      data
    );
    return response.data;
  },
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      await fetchUserInfo();
      alert('로그인이 완료되었습니다.');
      navigate('/');
    },
    onError: (error) => {
      const message = error.response?.data.message || error.message;
      alert(`${message}`);
    },
  });

  // 로그아웃 함수
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user: userData ?? null, handleRegister, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error;
  }
  return context;
};
