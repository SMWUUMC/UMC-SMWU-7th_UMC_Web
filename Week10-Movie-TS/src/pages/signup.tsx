import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { AxiosError } from 'axios';

// 폼 데이터 타입 정의
interface SignUpFormInputs {
  email: string;
  password: string;
  passwordCheck: string;
}

// 유효성 검사 스키마
const schema = yup.object().shape({
  email: yup.string().email('유효한 이메일 형식이 아닙니다.').required('이메일을 반드시 입력해주세요.'),
  password: yup
    .string()
    .min(4, '비밀번호는 4자 이상이어야 합니다.')
    .max(16, '비밀번호는 16자 이하여야 합니다.')
    .required('비밀번호를 입력해주세요.'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력해주세요.'),
}).required();

// 스타일 정의
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

// 회원가입 페이지 컴포넌트
const SignUpPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    handleRegister.mutate(data, {
      onSuccess: () => {
        navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
      },
      onError: (error: unknown) => {
        // 오류 처리: AxiosError 여부 확인
        if (error instanceof AxiosError && error.response?.data?.message) {
          console.error(error.response.data.message); // 에러 메시지 출력
        } else {
          console.error('error');
        }
      },
    });
  };

  return (
    <SignUpContainer>
      <SignUpTitle>회원가입</SignUpTitle>
      <SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <SignUpInput
          type="email"
          placeholder="이메일을 입력해주세요."
          {...register("email")}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <SignUpInput
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...register("password")}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        <SignUpInput
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          {...register("passwordCheck")}
        />
        {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>}

        <SignUpButton type="submit" disabled={handleRegister.isLoading}>
          회원가입
        </SignUpButton>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUpPage;