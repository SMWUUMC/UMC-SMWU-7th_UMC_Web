import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 유저 정보 불러오기 함수
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error("토큰이 없습니다.");

      // 유저 정보 API 호출
      const response = await axios.get('http://localhost:3000/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 유저 정보 설정
      setUser(response.data);
    } catch (error) {
      console.error('유저 정보 불러오기 실패:', error);
      handleLogout();
    }
  };

  // 회원가입 함수
  const handleRegister = async (email, password, passwordCheck) => {
    const navigate = useNavigate(); // 함수 내부에서 useNavigate 호출

    try {
      // 회원가입 API 호출
      await axios.post('http://localhost:3000/auth/register', {
        email,
        password,
        passwordCheck
      });
      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  // 로그인 함수
  const handleLogin = async (email, password) => {
    const navigate = useNavigate(); // 함수 내부에서 useNavigate 호출

    try {
      // 로그인 API 호출
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      });

      // AccessToken과 RefreshToken 추출 및 저장
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // 유저 정보 가져오기
      await fetchUserInfo();
      navigate('/main'); // 로그인 성공 시 메인 페이지로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  // 로그아웃 함수
  const handleLogout = () => {
    const navigate = useNavigate(); // 함수 내부에서 useNavigate 호출
    
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  // 페이지 로드 시 유저 정보 불러오기
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUserInfo();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleRegister, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);