import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
  password: yup.string().min(4, '비밀번호는 4자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required('비밀번호를 입력해주세요.'),
});

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-left: 10%;
  background-color: #000;
`;

const LoginTitle = styled.h2`
  font-size: 24px;
  color: white;
  margin-bottom: 20px;
  text-align: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 300px;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 0;
  padding-left: 5px;
  text-align: left;
  width: 100%;
`;

const LoginButton = styled.button`
  width: 110%;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #ff357e;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff1a60;
  }
`;

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  
  const [isTouched, setIsTouched] = useState({ email: false, password: false });

  const handleFocus = (field) => {
    setIsTouched((prev) => ({ ...prev, [field]: true }));
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: data.email,
        password: data.password,
      });
      const { accessToken, refreshToken } = response.data;
      // 토큰 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      alert("로그인에 성공했습니다.");
      navigate('/');
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>로그인</LoginTitle>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <LoginInput
          type="email"
          placeholder="이메일을 입력해주세요!"
          {...register("email")}
          onFocus={() => handleFocus("email")}
        />
        {isTouched.email && errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <LoginInput
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...register("password")}
          onFocus={() => handleFocus("password")}
        />
        {isTouched.password && errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        <LoginButton type="submit">로그인</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;