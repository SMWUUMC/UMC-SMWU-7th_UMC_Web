import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-left: 10%;
  background-color: #000;
`;

const SignUpTitle = styled.h2`
  font-size: 24px;
  color: white;
  margin-bottom: 20px;
  text-align: center;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 400px;
`;

const SignUpInput = styled.input`
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

const SignUpButton = styled.button`
  width: 108%;
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


const SignUpPage = () => {
  const schema = yup.object().shape({
    email: yup.string().email('유효한 이메일 형식이 아닙니다.').required('이메일을 반드시 입력해주세요.'),
    password: yup.string().min(4, '비밀번호는 4자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required('비밀번호를 입력해주세요.'),
    passwordCheck: yup.string().oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.').required('비밀번호 확인을 입력해주세요.'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/auth/register', {
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordCheck,
      });
      alert("회원가입이 완료되었습니다.");
      navigate('/login');
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <SignUpContainer>
      <SignUpTitle>회원가입</SignUpTitle>
      <SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <SignUpInput type="email" placeholder="이메일을 입력해주세요!" {...register("email")} />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <SignUpInput type="password" placeholder="비밀번호를 입력해주세요!" {...register("password")} />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        <SignUpInput type="password" placeholder="비밀번호를 다시 입력해주세요!" {...register("passwordCheck")} />
        {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>}

        <SignUpButton type="submit">회원가입</SignUpButton>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUpPage;