import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null);

    const handleLogin = (accessToken, refreshToken) => {
        localStorage.setItem('access-token', accessToken);
        localStorage.setItem('refresh-token', refreshToken);
        console.log('저장된 액세스토큰' + localStorage.getItem('access-token'));
        fetchUserInfo(accessToken);
    }

    const handleLogout = () => {
        console.log('로그아웃 실행됨');
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        setUserInfo(null);
    }

    const fetchUserInfo = async (token) => {
        try {
            const response = await axios.get('http://localhost:3000/user/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); 
            setUserInfo(response.data);
            console.log('유저인포', userInfo);
        } catch (error) {
            console.log(error);
            alert('유저 정보를 불러오는데 실패했습니다:' + error.response.data.message);
            handleLogout();
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('access-token');
        console.log('토큰', token);
        if (token) {
            fetchUserInfo(token);
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{
            userInfo,
            handleLogin,
            handleLogout,
        }}>
            {children}
        </AuthContext.Provider>
    );

}

// const onSubmit = async (data) => {
//     try {
//         const response = await axios.post('http://localhost:3000/auth/login', {
//             email: data.email,
//             password: data.password,
//         }).then((res) => {
//             console.log(res.data.accessToken);
//             localStorage.setItem('access-token', res.data.accessToken);
//             localStorage.setItem('refresh-token', res.data.user.id);
//         });
//         console.log(response);
//     } catch (error) {
//         console.log(error);
//         alert('로그인에 실패했습니다.');
//     }
// }


