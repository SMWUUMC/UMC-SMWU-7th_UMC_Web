import React, { createContext, useContext, useState, useEffect } from 'react';// eslint-disable-line no-unused-vars
import axios from 'axios';

// AuthContext 생성
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        email: localStorage.getItem('email') || '',
    });

    useEffect(() => {
        const checkTokenValidity = async () => {
            if (auth.accessToken) {
                const isValid = await validateAccessToken(auth.accessToken);
                if (!isValid) {
                    logout();
                }
            }
        };
        checkTokenValidity();
    }, [auth.accessToken]);

    const validateAccessToken = async (accessToken) => {
        try {
            const response = await axios.get('http://localhost:3000/user/me', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.status === 200;
        } catch (error) {
            console.error('토큰 검증 실패:', error);
            return false;
        }
    };

    const login = async ({ email, password }) => {
        try {
            // 서버로 로그인 요청
            const response = await axios.post('http://localhost:3000/auth/login', { email, password });
    
            // 서버에서 토큰을 반환하지 않을 경우 예외 처리
            const { accessToken, refreshToken } = response.data;
            if (!accessToken || !refreshToken) {
                throw new Error('토큰이 반환되지 않았습니다.');
            }
    
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('email', email);
    
            // 상태 업데이트
            setAuth({ accessToken, refreshToken, email });
        } catch (error) {
            // 에러 메시지를 명확히 표시
            console.error('로그인 실패:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || '로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다.');
        }
    };
    
    

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('email');
        setAuth({
            accessToken: null,
            refreshToken: null,
            email: '',
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


// src/context/AuthContext.jsx
// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({
//         email: null,
//         accessToken: null,
//         refreshToken: null,
//     });

//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
