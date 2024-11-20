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

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { email, password });
            const data = response.data;

            if (response.status === 200) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('email', email);
                setAuth({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    email: email,
                });
            }
        } catch (error) {
            console.error('로그인 실패:', error);
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
