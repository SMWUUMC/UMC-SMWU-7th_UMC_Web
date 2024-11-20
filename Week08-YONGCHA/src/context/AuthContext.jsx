import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // accessToken 만료 여부 확인 함수
  const isTokenExpired = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  // 유저 정보 불러오기 함수
  const fetchUserInfo = async () => {
      let accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('토큰이 없습니다.');

      // 토큰 재발급
      if (!accessToken || isTokenExpired(accessToken)) {
        const tokenResponse = await axios.post(
          'http://localhost:3000/auth/token/access',
          null,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        accessToken = tokenResponse.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
      }

  // 유저 정보 API 호출
  const response = await axios.get('http://localhost:3000/user/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};

  // useQuery로 유저 정보 가져오기
  const { data: userData, isError } = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    onSuccess: (data) => setUser(data),
    onError: () => handleLogout(),
    enabled: !!localStorage.getItem('accessToken'), // accessToken이 있을 때만 실행
    retry: false, // 실패 시 재시도하지 않음
  });

  // 회원가입 함수 리팩토링 - useMutation 사용
  const handleRegister = useMutation({
    mutationFn: async ({ email, password, passwordCheck }) => {
      const response = await axios.post('http://localhost:3000/auth/register', {
        email,
        password,
        passwordCheck,
      });
      return response.data;
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    },
    onError: (error) => {
      const message = error.response ? error.response.data.message : error.message;
      alert(`${message}`);
      },
  });

  // 로그인 함수 리팩토링: useMutation 사용
  const handleLogin = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      return response.data;
    },
      onSuccess: async (data) => {
        const { accessToken, refreshToken } = data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        await fetchUserInfo();
        alert('로그인이 완료되었습니다.');
        navigate('/'); // 로그인 성공 시 메인 페이지로 이동
      },
      onError: (error) => {
        const message = error.response ? error.response.data.message : error.message;
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
    <AuthContext.Provider value={{ user: userData, handleRegister, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);