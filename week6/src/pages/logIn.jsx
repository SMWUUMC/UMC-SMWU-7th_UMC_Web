// ../src/pages/logIn.jsx
import React from 'react'; // eslint-disable-line no-unused-vars
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const schema = yup.object().shape({
        email: yup
            .string()
            .email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!')
            .required('이메일을 반드시 입력해주세요.'),
        password: yup
            .string()
            .min(8, '비밀번호는 8~16자 사이로 입력하세요!')
            .max(16, '비밀번호는 8~16자 사이로 입력하세요!')
            .required('비밀번호는 8자 이상이어야 합니다.'),
    });

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        try {
            // 로그인 요청
            const response = await axios.post('http://localhost:3000/auth/login', {
                email: data.email,
                password: data.password,
            });

            const { accessToken, refreshToken } = response.data;
            
            // 로그인 처리
            login({ accessToken, refreshToken });

            // 토큰 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            alert('로그인 성공!');
            navigate('/'); // 메인 페이지로 이동
        } catch (error) {
            console.error('로그인 오류:', error);
            alert(error.response?.data?.message || '로그인에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <Text>로그인</Text>
            <Input
                type="email"
                placeholder="이메일을 입력해주세요!"
                {...register('email')}
                onBlur={() => trigger('email')}
            />
            <P>{errors.email?.message}</P>
            <Input
                type="password"
                placeholder="비밀번호를 입력해주세요!"
                {...register('password')}
                onBlur={() => trigger('password')}
            />
            <P>{errors.password?.message}</P>
            <LoginButton type="submit" disabled={!isValid}>
                로그인
            </LoginButton>
        </LoginForm>
    );
};

export default LoginPage;

// 스타일 정의
const LoginForm = styled.form`
    margin: 160px 0 0 500px;
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const Text = styled.p`
    color: white;
    margin: 10px auto;
    font-size: 25px;
    font-weight: 700;
`;

const Input = styled.input`
    margin: 13px 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;

    &:focus {
        outline: none;
        border-color: #f82f63;
    }
`;

const LoginButton = styled.button`
    margin: 13px 0;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#f82f63')};
    color: ${({ disabled }) => (disabled ? '#666' : 'white')};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#ccc' : 'grey')};
    }
`;

const P = styled.p`
    margin: 3px 0;
    color: red;
    font-size: 12px;
`;
